export const getServerCmsBaseUrl = () =>
	import.meta.env.CMS_URL ??
	import.meta.env.PUBLIC_CMS_URL ??
	"http://localhost:1337";

export const buildServerCmsUrl = (path: string) =>
	new URL(`/api/${path.replace(/^\/+/, "")}`, getServerCmsBaseUrl());

export const getServerCmsApiToken = () => {
	const token = import.meta.env.CMS_API_TOKEN?.trim();

	if (!token) {
		throw new Error(
			"CMS_API_TOKEN is not configured. Private vacancy and lead flows require a server-side Strapi API token."
		);
	}

	return token;
};

export const createServerCmsHeaders = (headers?: HeadersInit) => {
	const mergedHeaders = new Headers(headers);
	mergedHeaders.set("authorization", `Bearer ${getServerCmsApiToken()}`);

	return mergedHeaders;
};
