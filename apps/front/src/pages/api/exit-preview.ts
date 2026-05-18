import type { APIRoute } from "astro";
import {
	buildPublicPath,
	clearPreviewCookie,
} from "@/shared/preview/session";
import { defaultSiteLocale, isSiteLocale } from "@/shared/i18n/config";

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies }) => {
	const localeParam = url.searchParams.get("locale") ?? undefined;
	const slug = url.searchParams.get("slug")?.trim();
	const targetLocale = isSiteLocale(localeParam)
		? localeParam
		: defaultSiteLocale;

	clearPreviewCookie(cookies, url.protocol);

	return new Response(null, {
		status: 307,
		headers: {
			Location: buildPublicPath(targetLocale, slug),
		},
	});
};
