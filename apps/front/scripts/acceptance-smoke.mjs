import { existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { randomUUID } from "node:crypto";

const projectRoot = resolve(import.meta.dirname, "..");
const repoRoot = resolve(projectRoot, "..", "..");
const distClientDir = resolve(projectRoot, "dist", "client");

const loadEnvFile = (filePath) => {
	if (!existsSync(filePath)) {
		return {};
	}

	return readFileSync(filePath, "utf8")
		.split(/\r?\n/)
		.reduce((acc, line) => {
			const trimmed = line.trim();

			if (!trimmed || trimmed.startsWith("#")) {
				return acc;
			}

			const separatorIndex = trimmed.indexOf("=");

			if (separatorIndex === -1) {
				return acc;
			}

			const key = trimmed.slice(0, separatorIndex).trim();
			const value = trimmed.slice(separatorIndex + 1).trim();

			if (key && !(key in acc)) {
				acc[key] = value;
			}

			return acc;
		}, {});
};

const fileEnv = {
	...loadEnvFile(resolve(repoRoot, ".env")),
	...loadEnvFile(resolve(projectRoot, ".env")),
};

const getConfig = (name, fallback) =>
	process.env[name] ?? fileEnv[name] ?? fallback;

const config = {
	baseUrl: getConfig("SMOKE_BASE_URL", "http://localhost:4321"),
	previewSecret: getConfig("PREVIEW_SECRET", ""),
	pageSlug: getConfig("SMOKE_PAGE_SLUG", "cms-first-platform"),
	articleSlug: getConfig("SMOKE_ARTICLE_SLUG", "neea-llc"),
	projectSlug: getConfig("SMOKE_PROJECT_SLUG", "project"),
	vacancySlug: getConfig("SMOKE_VACANCY_SLUG", "test-vacancy"),
	vacancyId: getConfig("SMOKE_VACANCY_ID", "t1ai3j7lw651ggwfjcmn47az"),
	allowMutations: ["1", "true", "yes"].includes(
		String(getConfig("SMOKE_ALLOW_MUTATIONS", "false")).toLowerCase()
	),
};

const results = [];
let failures = 0;
let warnings = 0;

const addResult = (status, name, details) => {
	results.push({ status, name, details });

	if (status === "fail") {
		failures += 1;
	}

	if (status === "warn") {
		warnings += 1;
	}
};

const pass = (name, details) => addResult("pass", name, details);
const fail = (name, details) => addResult("fail", name, details);
const warn = (name, details) => addResult("warn", name, details);

const fetchText = async (path, init = {}) => {
	const response = await fetch(new URL(path, config.baseUrl), {
		redirect: "manual",
		...init,
	});
	const text = await response.text();

	return { response, text };
};

const extractTitle = (html) =>
	html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? null;

const extractCanonical = (html) =>
	html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? null;

const extractRobots = (html) =>
	html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i)?.[1] ?? null;

const extractOgTitle = (html) =>
	html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)?.[1] ??
	null;

const extractLang = (html) =>
	html.match(/<html[^>]+lang="([^"]+)"/i)?.[1] ?? null;

const countMatches = (value, pattern) => [...value.matchAll(pattern)].length;

const hasRedirectMarkup = (html, target) =>
	html.includes(`http-equiv="refresh" content="0;url=${target}"`) ||
	html.includes(`window.location.replace("${target}")`) ||
	html.includes(`href="${target}"`);

const expectStatus = async (name, path, expectedStatus, assert) => {
	try {
		const { response, text } = await fetchText(path);

		if (response.status !== expectedStatus) {
			fail(name, `Expected HTTP ${expectedStatus} for ${path}, got ${response.status}.`);
			return;
		}

		const details = assert ? assert({ response, text }) : null;
		pass(name, details ?? `${path} -> HTTP ${response.status}`);
	} catch (error) {
		fail(name, error instanceof Error ? error.message : String(error));
	}
};

const expectRedirectBehaviour = async (name, path, expectedTarget) => {
	try {
		const { response, text } = await fetchText(path);
		const location = response.headers.get("location");

		if (response.status >= 300 && response.status < 400) {
			if (location !== expectedTarget) {
				throw new Error(`Unexpected redirect target: ${location}`);
			}

			pass(name, `${path} -> ${location} (HTTP ${response.status})`);
			return;
		}

		if (response.status === 200 && hasRedirectMarkup(text, expectedTarget)) {
			pass(name, `${path} -> ${expectedTarget} (HTML redirect page)`);
			return;
		}

		throw new Error(
			`Expected redirect behaviour to ${expectedTarget}, got HTTP ${response.status}.`
		);
	} catch (error) {
		fail(name, error instanceof Error ? error.message : String(error));
	}
};

await expectRedirectBehaviour("Redirect / -> /ru/", "/", "/ru/");
await expectRedirectBehaviour(
	"Legacy redirect /articles/... -> /ru/articles/...",
	`/articles/${config.articleSlug}/`,
	`/ru/articles/${config.articleSlug}/`
);
await expectRedirectBehaviour(
	"Legacy redirect /projects/... -> /ru/projects/...",
	`/projects/${config.projectSlug}/`,
	`/ru/projects/${config.projectSlug}/`
);

const pageChecks = [
	{
		name: "RU home page",
		path: "/ru/",
		expectedTitle: "CMS-first корпоративная витрина",
		expectedLang: "ru",
		expectedCanonical: `${config.baseUrl}/ru/`,
		expectIndexable: true,
	},
	{
		name: "EN home page",
		path: "/en/",
		expectedTitle: "CMS-first corporate storefront",
		expectedLang: "en",
		expectedCanonical: `${config.baseUrl}/en/`,
		expectIndexable: true,
	},
	{
		name: "RU CMS page",
		path: `/ru/${config.pageSlug}/`,
		expectedTitle: "CMS-first маркетинговая платформа",
		expectedLang: "ru",
		expectedCanonical: `${config.baseUrl}/ru/${config.pageSlug}/`,
		expectIndexable: true,
	},
	{
		name: "EN CMS page",
		path: `/en/${config.pageSlug}/`,
		expectedTitle: "CMS-first marketing platform",
		expectedLang: "en",
		expectedCanonical: `${config.baseUrl}/en/${config.pageSlug}/`,
		expectIndexable: true,
	},
	{
		name: "RU articles list",
		path: "/ru/articles/",
		expectedLang: "ru",
		expectedCanonical: `${config.baseUrl}/ru/articles/`,
	},
	{
		name: "RU article detail",
		path: `/ru/articles/${config.articleSlug}/`,
		expectedLang: "ru",
		expectedCanonical: `${config.baseUrl}/ru/articles/${config.articleSlug}/`,
	},
	{
		name: "RU projects list",
		path: "/ru/projects/",
		expectedLang: "ru",
		expectedCanonical: `${config.baseUrl}/ru/projects/`,
	},
	{
		name: "RU project detail",
		path: `/ru/projects/${config.projectSlug}/`,
		expectedLang: "ru",
		expectedCanonical: `${config.baseUrl}/ru/projects/${config.projectSlug}/`,
	},
	{
		name: "Vacancies list",
		path: "/vacancies/",
		expectedLang: "ru",
		expectedCanonical: `${config.baseUrl}/vacancies/`,
	},
	{
		name: "Vacancy detail",
		path: `/vacancies/${config.vacancySlug}/`,
		expectedLang: "ru",
		expectedCanonical: `${config.baseUrl}/vacancies/${config.vacancySlug}/`,
	},
];

for (const page of pageChecks) {
	await expectStatus(page.name, page.path, 200, ({ text }) => {
		const title = extractTitle(text);
		const canonical = extractCanonical(text);
		const ogTitle = extractOgTitle(text);
		const lang = extractLang(text);
		const robots = extractRobots(text);
		const h1Count = countMatches(text, /<h1\b/gi);

		if (page.expectedTitle && title !== page.expectedTitle) {
			throw new Error(`Unexpected title: ${title}`);
		}

		if (page.expectedCanonical && canonical !== page.expectedCanonical) {
			throw new Error(`Unexpected canonical: ${canonical}`);
		}

		if (page.expectedLang && lang !== page.expectedLang) {
			throw new Error(`Unexpected html[lang]: ${lang}`);
		}

		if (!ogTitle) {
			throw new Error("Missing og:title meta tag.");
		}

		if (h1Count < 1) {
			throw new Error(`Expected at least one <h1>, got ${h1Count}.`);
		}

		if (page.expectIndexable && robots === "noindex, nofollow") {
			throw new Error("Public route is unexpectedly marked as noindex.");
		}

		return JSON.stringify({
			title,
			canonical,
			ogTitle,
			lang,
			robots,
			h1Count,
		});
	});
}

await expectStatus(
	"Preview invalid secret -> 401",
	`/api/preview?secret=invalid&locale=ru&type=page&slug=${config.pageSlug}&status=draft`,
	401
);

if (!config.previewSecret) {
	warn("Preview draft verification", "PREVIEW_SECRET is not configured for smoke script.");
} else {
	await expectStatus(
		"Preview published redirect -> public route",
		`/api/preview?secret=${encodeURIComponent(config.previewSecret)}&locale=ru&type=page&slug=${config.pageSlug}&status=published`,
		307,
		({ response }) => {
			const location = response.headers.get("location");
			const expected = `/ru/${config.pageSlug}/`;

			if (location !== expected) {
				throw new Error(`Unexpected redirect target: ${location}`);
			}

			return location;
		}
	);

	try {
		const previewResponse = await fetch(
			new URL(
				`/api/preview?secret=${encodeURIComponent(config.previewSecret)}&locale=ru&type=page&slug=${config.pageSlug}&status=draft`,
				config.baseUrl
			),
			{ redirect: "manual" }
		);

		if (previewResponse.status !== 307) {
			throw new Error(`Expected HTTP 307, got ${previewResponse.status}.`);
		}

		const previewLocation = previewResponse.headers.get("location");
		const previewCookie = previewResponse.headers.get("set-cookie");

		if (previewLocation !== `/preview/ru/${config.pageSlug}/`) {
			throw new Error(`Unexpected preview redirect target: ${previewLocation}`);
		}

		if (!previewCookie?.includes("__cms_preview=")) {
			throw new Error("Preview cookie was not set.");
		}

		const cookieHeader = previewCookie.split(";")[0];
		const { response, text } = await fetchText(previewLocation, {
			headers: {
				cookie: cookieHeader,
			},
		});

		if (response.status !== 200) {
			throw new Error(`Preview page returned HTTP ${response.status}.`);
		}

		const robots = extractRobots(text);

		if (robots !== "noindex, nofollow") {
			throw new Error(`Unexpected robots meta: ${robots}`);
		}

		pass(
			"Preview draft route with cookie",
			JSON.stringify({
				previewLocation,
				robots,
			})
		);
	} catch (error) {
		fail(
			"Preview draft route with cookie",
			error instanceof Error ? error.message : String(error)
		);
	}
}

if (!existsSync(resolve(distClientDir, "sitemap-index.xml"))) {
	warn("Build sitemap verification", "Build output is missing. Run `pnpm --dir apps/front build` first.");
} else {
	try {
		const sitemapIndex = readFileSync(
			resolve(distClientDir, "sitemap-index.xml"),
			"utf8"
		);
		const sitemap = readFileSync(resolve(distClientDir, "sitemap-0.xml"), "utf8");
		const requiredEntries = [
			`${config.baseUrl}/ru/`,
			`${config.baseUrl}/en/`,
			`${config.baseUrl}/ru/articles/${config.articleSlug}/`,
			`${config.baseUrl}/ru/projects/${config.projectSlug}/`,
			`${config.baseUrl}/vacancies/${config.vacancySlug}/`,
		];
		const forbiddenEntries = [
			`${config.baseUrl}/articles/`,
			`${config.baseUrl}/projects/`,
		];

		if (!sitemapIndex.includes(`${config.baseUrl}/sitemap-0.xml`)) {
			throw new Error("sitemap-index.xml does not reference sitemap-0.xml.");
		}

		for (const entry of requiredEntries) {
			if (!sitemap.includes(`<loc>${entry}</loc>`)) {
				throw new Error(`Missing sitemap entry: ${entry}`);
			}
		}

		for (const entry of forbiddenEntries) {
			if (sitemap.includes(`<loc>${entry}</loc>`)) {
				throw new Error(`Legacy sitemap entry must be filtered out: ${entry}`);
			}
		}

		const missingEnDetails = [];

		if (!/http:\/\/localhost:4321\/en\/articles\/[^<]+<\/loc>/.test(sitemap)) {
			missingEnDetails.push("articles");
		}

		if (!/http:\/\/localhost:4321\/en\/projects\/[^<]+<\/loc>/.test(sitemap)) {
			missingEnDetails.push("projects");
		}

		if (missingEnDetails.length > 0) {
			throw new Error(
				`No EN detail entries were generated in sitemap for: ${missingEnDetails.join(", ")}.`
			);
		}

		pass(
			"Build sitemap coverage",
			JSON.stringify({
				requiredEntries,
				forbiddenEntries,
			})
		);
	} catch (error) {
		fail(
			"Build sitemap coverage",
			error instanceof Error ? error.message : String(error)
		);
	}
}

if (!config.allowMutations) {
	warn(
		"Mutation smoke",
		"Skipped form submit checks. Re-run with SMOKE_ALLOW_MUTATIONS=true to exercise lead and vacancy submissions."
	);
} else {
	try {
		const invalidLead = await fetch(new URL("/api/lead-submissions", config.baseUrl), {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ locale: "ru" }),
		});

		if (invalidLead.status !== 400) {
			throw new Error(`Expected invalid lead submit HTTP 400, got ${invalidLead.status}.`);
		}

		pass("Lead submission validation", "Invalid payload rejected with HTTP 400.");
	} catch (error) {
		fail(
			"Lead submission validation",
			error instanceof Error ? error.message : String(error)
		);
	}

	try {
		const leadPayload = {
			locale: "ru",
			fullName: "Codex Acceptance Smoke",
			email: `codex-${randomUUID()}@example.com`,
			phone: "+79990000000",
			companyName: "Codex QA",
			message: "Automated acceptance smoke lead submission.",
			consent: true,
			pagePath: `/ru/${config.pageSlug}/`,
			pageTitle: "CMS-first маркетинговая платформа",
			formName: "acceptance-smoke",
		};
		const validLead = await fetch(new URL("/api/lead-submissions", config.baseUrl), {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(leadPayload),
		});

		if (validLead.status !== 201) {
			throw new Error(`Expected valid lead submit HTTP 201, got ${validLead.status}.`);
		}

		pass("Lead submission create", "Valid payload accepted with HTTP 201.");
	} catch (error) {
		fail(
			"Lead submission create",
			error instanceof Error ? error.message : String(error)
		);
	}

	try {
		const invalidVacancyForm = new FormData();
		invalidVacancyForm.set("data[vacancy]", config.vacancyId);
		invalidVacancyForm.set("data[fullName]", "Codex Vacancy Smoke");
		invalidVacancyForm.set("data[email]", "codex-vacancy@example.com");
		invalidVacancyForm.set("data[phone]", "+79990000001");
		invalidVacancyForm.set("data[city]", "Moscow");
		invalidVacancyForm.set("data[coverLetter]", "Invalid file smoke check");
		invalidVacancyForm.set("data[consent]", "true");
		invalidVacancyForm.set("honeypot", "");
		invalidVacancyForm.set(
			"files.resumeFile",
			new File([Buffer.from("resume")], "resume.txt", {
				type: "text/plain",
			})
		);

		const invalidVacancy = await fetch(
			new URL("/api/vacancy-applications", config.baseUrl),
			{
				method: "POST",
				headers: {
					Origin: config.baseUrl,
					Referer: `${config.baseUrl}/vacancies/${config.vacancySlug}/`,
				},
				body: invalidVacancyForm,
			}
		);

		if (invalidVacancy.status !== 400) {
			throw new Error(
				`Expected invalid vacancy submit HTTP 400, got ${invalidVacancy.status}.`
			);
		}

		pass("Vacancy application validation", "Invalid resume extension rejected with HTTP 400.");
	} catch (error) {
		fail(
			"Vacancy application validation",
			error instanceof Error ? error.message : String(error)
		);
	}

	try {
		const validVacancyForm = new FormData();
		validVacancyForm.set("data[vacancy]", config.vacancyId);
		validVacancyForm.set("data[fullName]", "Codex Vacancy Smoke");
		validVacancyForm.set(
			"data[email]",
			`codex-vacancy-${randomUUID()}@example.com`
		);
		validVacancyForm.set("data[phone]", "+79990000001");
		validVacancyForm.set("data[city]", "Moscow");
		validVacancyForm.set("data[coverLetter]", "Valid vacancy application smoke check.");
		validVacancyForm.set("data[consent]", "true");
		validVacancyForm.set("honeypot", "");
		validVacancyForm.set(
			"files.resumeFile",
			new File([Buffer.from("%PDF-1.4\nsmoke\n")], "resume.pdf", {
				type: "application/pdf",
			})
		);

		const validVacancy = await fetch(
			new URL("/api/vacancy-applications", config.baseUrl),
			{
				method: "POST",
				headers: {
					Origin: config.baseUrl,
					Referer: `${config.baseUrl}/vacancies/${config.vacancySlug}/`,
				},
				body: validVacancyForm,
			}
		);

		if (validVacancy.status !== 201) {
			throw new Error(
				`Expected valid vacancy submit HTTP 201, got ${validVacancy.status}.`
			);
		}

		pass("Vacancy application create", "Valid payload accepted with HTTP 201.");
	} catch (error) {
		fail(
			"Vacancy application create",
			error instanceof Error ? error.message : String(error)
		);
	}
}

const summary = {
	baseUrl: config.baseUrl,
	buildOutput: existsSync(distClientDir) ? distClientDir : null,
	failures,
	warnings,
	total: results.length,
	results,
};

console.log(JSON.stringify(summary, null, 2));

if (failures > 0) {
	process.exitCode = 1;
}
