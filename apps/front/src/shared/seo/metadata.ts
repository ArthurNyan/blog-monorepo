import { resolveCmsMediaUrl, type CmsStatus } from "@/shared/api/cms";
import type { CmsMedia, PageSeo } from "@/shared/api/pages";
import { buildSiteUrl } from "@/shared/site/config";

type ResolvedSeoMetadata = PageSeo & {
	ogImageUrl?: string;
};

type BuildSeoMetadataOptions = {
	seo?: ResolvedSeoMetadata | null;
	title?: string;
	description?: string;
	pathname: string;
	noIndex?: boolean;
	status?: CmsStatus;
	fallbackOgImage?: CmsMedia | null;
};

export const buildSeoMetadata = ({
	seo,
	title,
	description,
	pathname,
	noIndex = false,
	status,
	fallbackOgImage,
}: BuildSeoMetadataOptions) => {
	const resolvedTitle = seo?.metaTitle || title || "Untitled page";
	const resolvedDescription = seo?.metaDescription || description || "";
	const resolvedOgImageUrl = resolveCmsMediaUrl(
		seo?.ogImage?.formats?.medium?.url ||
			seo?.ogImage?.url ||
			fallbackOgImage?.formats?.medium?.url ||
			fallbackOgImage?.url ||
			seo?.ogImageUrl
	);

	return {
		...(seo || {}),
		metaTitle: resolvedTitle,
		metaDescription: resolvedDescription,
		canonicalURL: seo?.canonicalURL || buildSiteUrl(pathname),
		ogTitle: seo?.ogTitle || resolvedTitle,
		ogDescription: seo?.ogDescription || resolvedDescription,
		ogImageUrl: resolvedOgImageUrl,
		noIndex: Boolean(noIndex || seo?.noIndex || status === "draft"),
	};
};
