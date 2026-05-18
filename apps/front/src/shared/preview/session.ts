import { createHash } from "node:crypto";
import type { AstroCookies } from "astro";
import type { CmsRequestOptions } from "@/shared/api/cms";
import { buildLocalizedPath, type SiteLocale } from "@/shared/i18n/config";

export const previewCookieName = "__cms_preview";
export type PreviewEntryType = "page" | "article" | "project" | "vacancy";

const previewCookieMaxAge = 60 * 30;
const previewCollectionSegments: Record<
	Exclude<PreviewEntryType, "page">,
	string
> = {
	article: "articles",
	project: "projects",
	vacancy: "vacancies",
};

const getPreviewSecret = () => {
	const previewSecret = import.meta.env.PREVIEW_SECRET;

	if (!previewSecret) {
		throw new Error(
			"PREVIEW_SECRET is not configured. Preview mode requires the same secret on frontend and CMS."
		);
	}

	return previewSecret;
};

const createPreviewCookieValue = () =>
	createHash("sha256").update(getPreviewSecret()).digest("hex");

export const hasValidPreviewCookie = (cookies: AstroCookies) =>
	cookies.get(previewCookieName)?.value === createPreviewCookieValue();

export const enablePreviewCookie = (cookies: AstroCookies, protocol: string) => {
	cookies.set(previewCookieName, createPreviewCookieValue(), {
		httpOnly: true,
		sameSite: "lax",
		secure: protocol === "https:",
		path: "/",
		maxAge: previewCookieMaxAge,
	});
};

export const clearPreviewCookie = (cookies: AstroCookies, protocol: string) => {
	cookies.set(previewCookieName, "", {
		httpOnly: true,
		sameSite: "lax",
		secure: protocol === "https:",
		path: "/",
		maxAge: 0,
	});
};

export const isValidPreviewSecret = (secret?: string | null) =>
	Boolean(secret && secret === getPreviewSecret());

export const getPreviewCmsRequestOptions = (): CmsRequestOptions => ({
	status: "draft",
	headers: {
		"x-preview-secret": getPreviewSecret(),
	},
});

export const buildPreviewPath = (
	locale: SiteLocale,
	slug?: string,
	type: PreviewEntryType = "page"
) => {
	const normalizedSlug = slug?.replace(/^\/+|\/+$/g, "");

	if (type === "page") {
		if (!normalizedSlug) {
			return `/preview/${locale}/`;
		}

		return `/preview/${locale}/${normalizedSlug}/`;
	}

	const segment = previewCollectionSegments[type];

	if (!normalizedSlug) {
		return `/preview/${locale}/${segment}/`;
	}

	return `/preview/${locale}/${segment}/${normalizedSlug}/`;
};

export const buildPublicPath = (locale: SiteLocale, slug?: string) =>
	buildLocalizedPath(locale, slug || "");

export const buildPublicCollectionPath = (
	type: Exclude<PreviewEntryType, "page">,
	slug?: string
) => {
	const normalizedSlug = slug?.replace(/^\/+|\/+$/g, "");
	const segment = previewCollectionSegments[type];

	if (!normalizedSlug) {
		return `/${segment}/`;
	}

	return `/${segment}/${normalizedSlug}/`;
};
