import { resolveCmsMediaUrl, type CmsStatus } from "@/shared/api/cms";
import type { PageSeo } from "@/shared/api/pages";
import { buildSiteUrl } from "@/shared/site/config";

type BuildSeoMetadataOptions = {
	seo?: PageSeo | null;
	title?: string;
	description?: string;
	pathname: string;
	noIndex?: boolean;
	status?: CmsStatus;
};

export const buildSeoMetadata = ({
	seo,
	title,
	description,
	pathname,
	noIndex = false,
	status,
}: BuildSeoMetadataOptions) => {
	const resolvedTitle = seo?.metaTitle || title || "Untitled page";
	const resolvedDescription = seo?.metaDescription || description || "";

	return {
		...(seo || {}),
		metaTitle: resolvedTitle,
		metaDescription: resolvedDescription,
		canonicalURL: seo?.canonicalURL || buildSiteUrl(pathname),
		ogTitle: seo?.ogTitle || resolvedTitle,
		ogDescription: seo?.ogDescription || resolvedDescription,
		ogImageUrl: resolveCmsMediaUrl(
			seo?.ogImage?.formats?.medium?.url || seo?.ogImage?.url
		),
		noIndex: Boolean(noIndex || seo?.noIndex || status === "draft"),
	};
};
