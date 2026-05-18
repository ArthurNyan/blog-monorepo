import {
	buildCmsUrl,
	parseCmsErrorMessage,
	resolveCmsMediaUrl,
} from "@/shared/api/cms";
import type { CmsMedia, PageBlock, PageSeo } from "@/shared/api/pages";
import {
	buildLocalizedPath,
	defaultSiteLocale,
	toCmsLocale,
	type SiteLocale,
} from "@/shared/i18n/config";

type StrapiEntity<T> = {
	id?: string | number;
	documentId?: string;
	locale?: string;
	publishedAt?: string;
	createdAt?: string;
	updatedAt?: string;
} & T;

type StrapiSingleResponse<T> = {
	data?: StrapiEntity<T> | null;
	meta?: Record<string, unknown>;
};

type CmsLinkRaw = {
	label?: string;
	href?: string;
	description?: string;
};

type CmsNavigationItemRaw = {
	label?: string;
	href?: string;
	featured?: CmsLinkRaw | null;
	items?: CmsLinkRaw[];
};

type CmsFooterColumnRaw = {
	heading?: string;
	links?: CmsLinkRaw[];
};

type GlobalRaw = {
	companyName?: string;
	description?: string;
	logo?: CmsMedia | null;
	navigationItems?: CmsNavigationItemRaw[];
	headerPrimaryCta?: CmsLinkRaw | null;
	headerSecondaryCta?: CmsLinkRaw | null;
	footerColumns?: CmsFooterColumnRaw[];
	footerCopyright?: string;
};

type HomePageRaw = {
	Title?: string;
	description?: string;
	blocks?: PageBlock[];
	seo?: PageSeo | null;
};

export type SiteLink = {
	title: string;
	href: string;
	description?: string;
};

export type SiteNavigationItem = {
	label: string;
	href?: string;
	submenu?: {
		featured?: SiteLink;
		items: SiteLink[];
	};
};

export type SiteFooterColumn = {
	heading: string;
	links: SiteLink[];
};

export type SiteGlobalContent = {
	locale?: string;
	companyName: string;
	description: string;
	logoUrl?: string;
	navigationItems: SiteNavigationItem[];
	headerPrimaryCta?: SiteLink;
	headerSecondaryCta?: SiteLink;
	footerColumns: SiteFooterColumn[];
	footerCopyright?: string;
	homeHref: string;
};

export type SiteHomePage = {
	id?: string | number;
	documentId?: string;
	locale?: string;
	title: string;
	description?: string;
	blocks: PageBlock[];
	seo?: PageSeo | null;
};

const fetchCmsSingle = async <T>(url: URL): Promise<StrapiEntity<T> | null> => {
	const response = await fetch(url.toString());
	if (!response.ok) {
		throw new Error(await parseCmsErrorMessage(response));
	}

	const json = (await response.json()) as StrapiSingleResponse<T>;
	return json.data ?? null;
};

const mapLink = (link?: CmsLinkRaw | null): SiteLink | undefined => {
	const title = link?.label?.trim();
	const href = link?.href?.trim();

	if (!title || !href) {
		return undefined;
	}

	return {
		title,
		href,
		description: link?.description?.trim() || undefined,
	};
};

const appendPageBuilderPopulateParams = (url: URL) => {
	url.searchParams.set("populate[seo][populate][ogImage]", "true");
	url.searchParams.set("populate[blocks][on][blocks.hero][populate][media]", "true");
	url.searchParams.set("populate[blocks][on][blocks.feature-cards][populate][items]", "true");
	url.searchParams.set("populate[blocks][on][blocks.feature-highlight][populate][media]", "true");
	url.searchParams.set("populate[blocks][on][blocks.feature-highlight][populate][items]", "true");
	url.searchParams.set(
		"populate[blocks][on][blocks.logo-cloud][populate][items][populate][logo]",
		"true"
	);
	url.searchParams.set(
		"populate[blocks][on][blocks.testimonials][populate][items][populate][avatar]",
		"true"
	);
	url.searchParams.set("populate[blocks][on][blocks.stats][populate][items]", "true");
	url.searchParams.set("populate[blocks][on][blocks.faq][populate][items]", "true");
	url.searchParams.set(
		"populate[blocks][on][blocks.process-timeline][populate][items]",
		"true"
	);
	url.searchParams.set("populate[blocks][on][blocks.checklist][populate][items]", "true");
	url.searchParams.set(
		"populate[blocks][on][blocks.content-columns][populate][columns]",
		"true"
	);
	url.searchParams.set(
		"populate[blocks][on][blocks.numbered-points][populate][items]",
		"true"
	);
};

export const fetchGlobalContent = async (
	locale: SiteLocale = defaultSiteLocale
): Promise<SiteGlobalContent> => {
	const url = buildCmsUrl("/global");
	url.searchParams.set("locale", toCmsLocale(locale));
	url.searchParams.set("populate[logo]", "true");
	url.searchParams.set("populate[navigationItems][populate][featured]", "true");
	url.searchParams.set("populate[navigationItems][populate][items]", "true");
	url.searchParams.set("populate[headerPrimaryCta]", "true");
	url.searchParams.set("populate[headerSecondaryCta]", "true");
	url.searchParams.set("populate[footerColumns][populate][links]", "true");

	const global = await fetchCmsSingle<GlobalRaw>(url);
	const logoUrl = resolveCmsMediaUrl(
		global?.logo?.formats?.small?.url ||
			global?.logo?.formats?.thumbnail?.url ||
			global?.logo?.url
	);

	return {
		locale: global?.locale,
		companyName: global?.companyName?.trim() || "Company",
		description: global?.description?.trim() || "",
		logoUrl,
		navigationItems:
			global?.navigationItems
				?.map((item) => {
					const label = item.label?.trim();
					if (!label) {
						return undefined;
					}

					const submenuItems =
						item.items
							?.map((subItem) => mapLink(subItem))
							.filter((subItem): subItem is SiteLink => Boolean(subItem)) || [];
					const featured = mapLink(item.featured);
					const href = item.href?.trim();

					return {
						label,
						href: href || undefined,
						submenu:
							featured || submenuItems.length > 0
								? {
										featured,
										items: submenuItems,
									}
								: undefined,
					};
				})
				.filter(
					(item): item is SiteNavigationItem =>
						Boolean(item && (item.href || item.submenu))
				) || [],
		headerPrimaryCta: mapLink(global?.headerPrimaryCta),
		headerSecondaryCta: mapLink(global?.headerSecondaryCta),
		footerColumns:
			global?.footerColumns
				?.map((column) => {
					const heading = column.heading?.trim();
					const links =
						column.links
							?.map((link) => mapLink(link))
							.filter((link): link is SiteLink => Boolean(link)) || [];

					if (!heading || links.length === 0) {
						return undefined;
					}

					return {
						heading,
						links,
					};
				})
				.filter((column): column is SiteFooterColumn => Boolean(column)) || [],
		footerCopyright: global?.footerCopyright?.trim() || undefined,
		homeHref: buildLocalizedPath(locale),
	};
};

export const fetchHomePage = async (
	locale: SiteLocale = defaultSiteLocale
): Promise<SiteHomePage | null> => {
	const url = buildCmsUrl("/home-page");
	url.searchParams.set("locale", toCmsLocale(locale));
	appendPageBuilderPopulateParams(url);

	const page = await fetchCmsSingle<HomePageRaw>(url);

	if (!page) {
		return null;
	}

	return {
		id: page.id,
		documentId: page.documentId,
		locale: page.locale,
		title: page.Title?.trim() || page.seo?.metaTitle || "Home",
		description: page.description?.trim(),
		blocks: Array.isArray(page.blocks) ? page.blocks : [],
		seo: page.seo || null,
	};
};
