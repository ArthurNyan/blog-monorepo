#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const repoRoot = path.resolve(__dirname, "..");
const defaultOutputPath = path.join(
	repoRoot,
	"thesis",
	"knowledge",
	"diploma",
	"evidence-artifacts",
	"browser-baseline-audit.json"
);

const resolvePlaywright = () => {
	const candidates = [
		process.env.PLAYWRIGHT_NODE_MODULES,
		process.env.CODEX_NODE_MODULES,
		path.join(repoRoot, "node_modules"),
		path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules"),
	].filter(Boolean);

	for (const candidate of candidates) {
		try {
			const entry = require.resolve("playwright", { paths: [candidate] });
			return require(entry);
		} catch {
			// try next candidate
		}
	}

	throw new Error(
		"Could not resolve `playwright`. Install it locally or ensure the bundled runtime node_modules path is available."
	);
};

const { chromium } = resolvePlaywright();

const getEnv = (name, fallback) => process.env[name] || fallback;

const config = {
	baseUrl: getEnv("BROWSER_AUDIT_BASE_URL", "http://localhost:4321"),
	outputPath: getEnv("BROWSER_AUDIT_OUTPUT", defaultOutputPath),
	routes: [
		{
			name: "RU home",
			path: "/ru/",
			expectedLang: "ru",
		},
		{
			name: "EN home",
			path: "/en/",
			expectedLang: "en",
		},
		{
			name: "RU CMS page",
			path: "/ru/cms-first-platform/",
			expectedLang: "ru",
			expectLeadForm: true,
		},
		{
			name: "Vacancy detail",
			path: "/vacancies/test-vacancy/",
			expectedLang: "ru",
			expectVacancyForm: true,
		},
	],
};

const baseOrigin = new URL(config.baseUrl).origin;

const getDomSnapshot = () => {
	const roundMetric = (value) =>
		typeof value === "number" && Number.isFinite(value)
			? Number(value.toFixed(2))
			: null;

	const getLabelText = (element) => {
		if (!element || !("labels" in element)) {
			return "";
		}

		const labels = Array.from(element.labels || []);
		return labels.map((label) => label.textContent || "").join(" ").trim();
	};

	const getAriaLabelledbyText = (element) => {
		const ids = (element.getAttribute("aria-labelledby") || "")
			.split(/\s+/)
			.map((value) => value.trim())
			.filter(Boolean);

		return ids
			.map((id) => document.getElementById(id)?.textContent || "")
			.join(" ")
			.trim();
	};

	const getAccessibleLabel = (element) =>
		(
			getLabelText(element) ||
			element.getAttribute("aria-label") ||
			getAriaLabelledbyText(element) ||
			(element.type === "submit" ? element.value : "")
		)
			.trim();

	const controls = Array.from(
		document.querySelectorAll("input, textarea, select")
	).filter((element) => {
		const inputType = element.getAttribute("type");

		if (inputType === "hidden") {
			return false;
		}

		if (element.getAttribute("aria-hidden") === "true") {
			return false;
		}

		return true;
	});

	const unlabeledControls = controls
		.map((element) => ({
			tag: element.tagName.toLowerCase(),
			type: element.getAttribute("type") || "",
			name: element.getAttribute("name") || "",
			label: getAccessibleLabel(element),
		}))
		.filter((item) => !item.label && item.name !== "honeypot");

	const buttonNames = Array.from(
		document.querySelectorAll("button, input[type='submit'], input[type='button']")
	).map((element) => ({
		tag: element.tagName.toLowerCase(),
		type: element.getAttribute("type") || "",
		text:
			(element.textContent || "").trim() ||
			element.getAttribute("aria-label") ||
			element.getAttribute("value") ||
			"",
	}));

	const navigationEntry = performance.getEntriesByType("navigation")[0];
	const firstContentfulPaint = performance
		.getEntriesByType("paint")
		.find((entry) => entry.name === "first-contentful-paint");

	return {
		title: document.title,
		lang: document.documentElement.lang || null,
		h1Count: document.querySelectorAll("h1").length,
		formsCount: document.querySelectorAll("form").length,
		unlabeledControls,
		buttonNames,
		performance: {
			domContentLoaded: roundMetric(navigationEntry?.domContentLoadedEventEnd),
			loadEventEnd: roundMetric(navigationEntry?.loadEventEnd),
			responseStart: roundMetric(navigationEntry?.responseStart),
			firstContentfulPaint: roundMetric(firstContentfulPaint?.startTime),
			resourceCount: performance.getEntriesByType("resource").length,
		},
	};
};

const run = async () => {
	const browser = await chromium.launch({ headless: true });
	const results = [];
	let failures = 0;

	try {
		for (const route of config.routes) {
			const context = await browser.newContext();
			const page = await context.newPage();
			const consoleErrors = [];
			const pageErrors = [];
			const requestFailures = [];
			const badResponses = [];

			page.on("console", (message) => {
				if (
					message.type() === "error" &&
					!message.text().startsWith("Failed to load resource:")
				) {
					consoleErrors.push(message.text());
				}
			});

			page.on("pageerror", (error) => {
				pageErrors.push(error.message);
			});

			page.on("requestfailed", (request) => {
				if (request.url().startsWith(config.baseUrl)) {
					requestFailures.push(
						`${request.method()} ${request.url()} :: ${
							request.failure()?.errorText || "request failed"
						}`
					);
				}
			});

			page.on("response", (response) => {
				const url = response.url();

				if (new URL(url).origin !== baseOrigin) {
					return;
				}

				if (response.status() >= 400 && url !== routeResult.url) {
					badResponses.push(
						`${response.request().method()} ${url} :: HTTP ${response.status()}`
					);
				}
			});

			const routeResult = {
				name: route.name,
				url: `${config.baseUrl}${route.path}`,
				status: "pass",
				failures: [],
				consoleErrors,
				pageErrors,
				requestFailures,
				badResponses,
				details: null,
			};

			try {
				const response = await page.goto(routeResult.url, {
					waitUntil: "load",
					timeout: 20000,
				});

				if (!response) {
					routeResult.failures.push("No navigation response received.");
				} else if (response.status() >= 400) {
					routeResult.failures.push(
						`Expected browser route to stay below HTTP 400, got ${response.status()}.`
					);
				}

				await page.waitForTimeout(1500);
				await page.locator("h1").first().waitFor({ timeout: 5000 });

				const details = await page.evaluate(getDomSnapshot);
				routeResult.details = details;

				if (route.expectedLang && details.lang !== route.expectedLang) {
					routeResult.failures.push(
						`Expected html[lang]=${route.expectedLang}, got ${details.lang}.`
					);
				}

				if (details.h1Count < 1) {
					routeResult.failures.push("Expected at least one visible h1.");
				}

				if (route.expectLeadForm && details.formsCount < 1) {
					routeResult.failures.push("Lead form was not rendered in browser runtime.");
				}

				if (route.expectVacancyForm && details.formsCount < 1) {
					routeResult.failures.push("Vacancy form was not rendered in browser runtime.");
				}

				if (details.unlabeledControls.length > 0) {
					routeResult.failures.push(
						`Found unlabeled form controls: ${JSON.stringify(
							details.unlabeledControls
						)}`
					);
				}

				if (consoleErrors.length > 0) {
					routeResult.failures.push(
						`Browser console errors: ${consoleErrors.join(" | ")}`
					);
				}

				if (pageErrors.length > 0) {
					routeResult.failures.push(`Page errors: ${pageErrors.join(" | ")}`);
				}

				if (requestFailures.length > 0) {
					routeResult.failures.push(
						`Failed same-origin requests: ${requestFailures.join(" | ")}`
					);
				}

				if (badResponses.length > 0) {
					routeResult.failures.push(
						`Failed same-origin resource responses: ${badResponses.join(" | ")}`
					);
				}
			} catch (error) {
				routeResult.failures.push(
					error instanceof Error ? error.message : String(error)
				);
			}

			if (routeResult.failures.length > 0) {
				routeResult.status = "fail";
				failures += 1;
			}

			results.push(routeResult);
			await context.close();
		}
	} finally {
		await browser.close();
	}

	const summary = {
		timestamp: new Date().toISOString(),
		baseUrl: config.baseUrl,
		failures,
		total: results.length,
		results,
	};

	fs.mkdirSync(path.dirname(config.outputPath), { recursive: true });
	fs.writeFileSync(config.outputPath, `${JSON.stringify(summary, null, 2)}\n`);
	console.log(JSON.stringify(summary, null, 2));

	if (failures > 0) {
		process.exitCode = 1;
	}
};

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
