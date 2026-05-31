import type { APIRoute } from "astro";

export const prerender = false;

const getEnv = (name: string) => {
	const value = process.env[name] ?? import.meta.env[name];
	return typeof value === "string" && value.trim() ? value.trim() : undefined;
};

const getRequiredEnv = (name: string) => {
	const value = getEnv(name);

	if (!value) {
		throw new Error(`${name} is not configured.`);
	}

	return value;
};

const normalizeBranchRef = (branch: string) =>
	`refs/heads/${branch.replace(/^refs\/heads\//, "")}`;

const isAuthorized = (request: Request) => {
	const secret = getEnv("REBUILD_WEBHOOK_TOKEN");

	if (!secret) {
		return true;
	}

	return request.headers.get("x-rebuild-token") === secret;
};

export const POST: APIRoute = async ({ request }) => {
	if (!isAuthorized(request)) {
		return Response.json({ message: "Unauthorized" }, { status: 401 });
	}

	try {
		const response = await fetch(getRequiredEnv("DOKPLOY_DEPLOY_WEBHOOK_URL"), {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"x-github-event": "push",
			},
			body: JSON.stringify({
				ref: normalizeBranchRef(getRequiredEnv("DOKPLOY_DEPLOY_BRANCH")),
				repository: {
					full_name:
						getEnv("DOKPLOY_DEPLOY_REPOSITORY") ?? "ArthurNyan/blog-monorepo",
				},
			}),
		});

		return new Response(await response.text(), {
			status: response.status,
			headers: {
				"content-type": response.headers.get("content-type") ?? "application/json",
			},
		});
	} catch (error) {
		return Response.json(
			{
				message:
					error instanceof Error
						? error.message
						: "Failed to trigger Dokploy rebuild.",
			},
			{ status: 500 }
		);
	}
};
