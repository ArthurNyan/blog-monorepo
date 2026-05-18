import type { APIRoute } from "astro";
import {
	fetchArticleBySlug,
	fetchPageBySlug,
	fetchProjectBySlug,
} from "@/shared/api/pages";
import { fetchHomePage } from "@/shared/api/site";
import { fetchVacancyBySlug } from "@/shared/api/vacancies";
import {
	buildPublicCollectionPath,
	buildPublicPath,
	buildPreviewPath,
	clearPreviewCookie,
	enablePreviewCookie,
	getPreviewCmsRequestOptions,
	isValidPreviewSecret,
} from "@/shared/preview/session";
import { isSiteLocale, toCmsLocale } from "@/shared/i18n/config";

export const prerender = false;

const redirect = (location: string, status = 307) =>
	new Response(null, {
		status,
		headers: {
			Location: location,
		},
	});

export const GET: APIRoute = async ({ url, cookies }) => {
	const secret = url.searchParams.get("secret");
	const localeParam = url.searchParams.get("locale") ?? undefined;
	const type = url.searchParams.get("type");
	const slug = url.searchParams.get("slug")?.trim();
	const status = url.searchParams.get("status");

	if (!isValidPreviewSecret(secret)) {
		return new Response("Invalid preview secret.", { status: 401 });
	}

	if (!isSiteLocale(localeParam)) {
		return new Response("Unsupported locale.", { status: 400 });
	}

	const locale = localeParam;
	const cmsLocale = toCmsLocale(locale);
	const previewRequestOptions = getPreviewCmsRequestOptions();
	const useDraftPreview = status !== "published";

	if (type === "home") {
		if (!useDraftPreview) {
			clearPreviewCookie(cookies, url.protocol);
			return redirect(buildPublicPath(locale));
		}

		const page = await fetchHomePage(locale, previewRequestOptions);

		if (!page) {
			return new Response("Preview home page not found.", { status: 404 });
		}

		enablePreviewCookie(cookies, url.protocol);
		return redirect(buildPreviewPath(locale));
	}

	if (type === "page" && slug) {
		if (!useDraftPreview) {
			clearPreviewCookie(cookies, url.protocol);
			return redirect(buildPublicPath(locale, slug));
		}

		const page = await fetchPageBySlug(
			slug,
			cmsLocale,
			previewRequestOptions
		);

		if (!page) {
			return new Response("Preview page not found.", { status: 404 });
		}

		enablePreviewCookie(cookies, url.protocol);
		return redirect(buildPreviewPath(locale, slug));
	}

	if (type === "article" && slug) {
		if (!useDraftPreview) {
			clearPreviewCookie(cookies, url.protocol);
			return redirect(buildPublicCollectionPath("article", slug));
		}

		const article = await fetchArticleBySlug(
			slug,
			cmsLocale,
			previewRequestOptions
		);

		if (!article) {
			return new Response("Preview article not found.", { status: 404 });
		}

		enablePreviewCookie(cookies, url.protocol);
		return redirect(buildPreviewPath(locale, slug, "article"));
	}

	if (type === "project" && slug) {
		if (!useDraftPreview) {
			clearPreviewCookie(cookies, url.protocol);
			return redirect(buildPublicCollectionPath("project", slug));
		}

		const project = await fetchProjectBySlug(
			slug,
			cmsLocale,
			previewRequestOptions
		);

		if (!project) {
			return new Response("Preview project not found.", { status: 404 });
		}

		enablePreviewCookie(cookies, url.protocol);
		return redirect(buildPreviewPath(locale, slug, "project"));
	}

	if (type === "vacancy" && slug) {
		if (!useDraftPreview) {
			clearPreviewCookie(cookies, url.protocol);
			return redirect(buildPublicCollectionPath("vacancy", slug));
		}

		const vacancy = await fetchVacancyBySlug(slug, {
			...previewRequestOptions,
			locale: cmsLocale,
			includeInactive: true,
		});

		if (!vacancy) {
			return new Response("Preview vacancy not found.", { status: 404 });
		}

		enablePreviewCookie(cookies, url.protocol);
		return redirect(buildPreviewPath(locale, slug, "vacancy"));
	}

	return new Response("Unsupported preview target.", { status: 400 });
};
