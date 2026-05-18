export const cmsBaseUrl = import.meta.env.PUBLIC_CMS_URL ?? "http://localhost:1337";
export const apiBaseUrl = `${cmsBaseUrl}/api`;
export const defaultCmsLocale = "ru-RU";

export type CmsStatus = "published" | "draft";

export type CmsRequestOptions = {
	status?: CmsStatus;
	headers?: HeadersInit;
};

export const resolveCmsMediaUrl = (url?: string | null) => {
	if (!url) return undefined;
	return url.startsWith("http://") || url.startsWith("https://")
		? url
		: `${cmsBaseUrl}${url}`;
};

export const buildCmsUrl = (path: string, params?: Record<string, string>) => {
	const url = new URL(`${apiBaseUrl}${path}`);

	if (!params) return url;

	for (const [key, value] of Object.entries(params)) {
		if (value) {
			url.searchParams.set(key, value);
		}
	}

	return url;
};

export const applyCmsRequestOptions = (
	url: URL,
	options?: CmsRequestOptions
) => {
	if (options?.status) {
		url.searchParams.set("status", options.status);
	}

	return url;
};

export const parseCmsErrorMessage = async (response: Response) => {
	try {
		const json = await response.json();
		return (
			json?.error?.message ||
			json?.message ||
			"Не удалось выполнить запрос к CMS."
		);
	} catch {
		return "Не удалось выполнить запрос к CMS.";
	}
};
