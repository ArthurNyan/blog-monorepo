export const siteUrl =
	import.meta.env.SITE_URL ??
	import.meta.env.PUBLIC_SITE_URL ??
	"http://localhost:4321";

export const buildSiteUrl = (path = "/") => new URL(path, siteUrl).toString();
