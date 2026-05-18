import { buildCmsUrl, defaultCmsLocale, parseCmsErrorMessage } from "@/shared/api/cms";
import { fetchVacancies, type Vacancy } from "@/shared/api/vacancies";

type StrapiEntity<T> = {
	id?: string | number;
	documentId?: string;
	locale?: string;
	publishedAt?: string;
	createdAt?: string;
	updatedAt?: string;
} & T;

type StrapiListResponse<T> = {
	data?: Array<StrapiEntity<T>>;
	meta?: {
		pagination?: {
			page?: number;
			pageSize?: number;
			pageCount?: number;
			total?: number;
		};
	};
};

export type CmsMedia = {
	url?: string;
	alternativeText?: string;
	width?: number;
	height?: number;
	formats?: {
		thumbnail?: { url?: string };
		small?: { url?: string };
		medium?: { url?: string };
		large?: { url?: string };
	};
};

export type PageSeo = {
	metaTitle: string;
	metaDescription: string;
	canonicalURL?: string;
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: CmsMedia | null;
	noIndex?: boolean;
};

export type HeroBlock = {
	__component: "blocks.hero";
	eyebrow?: string;
	title: string;
	description?: string;
	media?: CmsMedia | null;
	primaryButtonLabel?: string;
	primaryButtonUrl?: string;
	secondaryButtonLabel?: string;
	secondaryButtonUrl?: string;
};

export type RichTextBlock = {
	__component: "blocks.rich-text";
	heading?: string;
	body: string;
};

export type FeatureCardItem = {
	title: string;
	description?: string;
	icon?: string;
};

export type FeatureCardsBlock = {
	__component: "blocks.feature-cards";
	eyebrow?: string;
	heading: string;
	description?: string;
	items?: FeatureCardItem[];
};

export type CtaBlock = {
	__component: "blocks.cta";
	title: string;
	description?: string;
	primaryButtonLabel?: string;
	primaryButtonUrl?: string;
	secondaryButtonLabel?: string;
	secondaryButtonUrl?: string;
};

export type PreviewListBlock = {
	__component: "blocks.preview-list";
	heading: string;
	description?: string;
	source: "articles" | "projects" | "vacancies";
	limit?: number;
	ctaLabel?: string;
	ctaUrl?: string;
};

export type LogoItem = {
	name: string;
	logo?: CmsMedia | null;
	url?: string;
};

export type LogoCloudBlock = {
	__component: "blocks.logo-cloud";
	heading?: string;
	description?: string;
	items?: LogoItem[];
};

export type TestimonialItem = {
	quote: string;
	authorName: string;
	authorRole?: string;
	company?: string;
	avatar?: CmsMedia | null;
};

export type TestimonialsBlock = {
	__component: "blocks.testimonials";
	heading?: string;
	description?: string;
	items?: TestimonialItem[];
};

export type StatItem = {
	value: string;
	label: string;
	description?: string;
};

export type StatsBlock = {
	__component: "blocks.stats";
	heading?: string;
	description?: string;
	items?: StatItem[];
};

export type FeatureHighlightBlock = {
	__component: "blocks.feature-highlight";
	eyebrow?: string;
	title: string;
	description?: string;
	media?: CmsMedia | null;
	items?: FeatureCardItem[];
	ctaLabel?: string;
	ctaUrl?: string;
};

export type FaqItem = {
	question: string;
	answer: string;
};

export type FaqBlock = {
	__component: "blocks.faq";
	heading?: string;
	description?: string;
	items?: FaqItem[];
};

export type ProcessStep = {
	stepLabel?: string;
	title: string;
	description?: string;
};

export type ProcessTimelineBlock = {
	__component: "blocks.process-timeline";
	heading?: string;
	description?: string;
	items?: ProcessStep[];
};

export type QuoteBlock = {
	__component: "blocks.quote";
	quote: string;
	authorName?: string;
	authorRole?: string;
	sourceLabel?: string;
};

export type ChecklistItem = {
	title: string;
	description?: string;
};

export type ChecklistBlock = {
	__component: "blocks.checklist";
	heading?: string;
	description?: string;
	items?: ChecklistItem[];
};

export type ContentColumn = {
	title: string;
	body: string;
};

export type ContentColumnsBlock = {
	__component: "blocks.content-columns";
	eyebrow?: string;
	heading?: string;
	columns?: ContentColumn[];
};

export type NumberedPoint = {
	title: string;
	description?: string;
};

export type NumberedPointsBlock = {
	__component: "blocks.numbered-points";
	heading?: string;
	description?: string;
	items?: NumberedPoint[];
};

export type PageBlock =
	| HeroBlock
	| RichTextBlock
	| FeatureCardsBlock
	| CtaBlock
	| PreviewListBlock
	| LogoCloudBlock
	| TestimonialsBlock
	| StatsBlock
	| FeatureHighlightBlock
	| FaqBlock
	| ProcessTimelineBlock
	| QuoteBlock
	| ChecklistBlock
	| ContentColumnsBlock
	| NumberedPointsBlock;

export type CmsPage = {
	id?: string | number;
	documentId?: string;
	locale?: string;
	title: string;
	slug: string;
	blocks: PageBlock[];
	seo: PageSeo;
};

export type ArticlePreview = {
	id?: string | number;
	documentId?: string;
	name: string;
	description: string;
	slug: string;
	cover?: CmsMedia | null;
};

export type ProjectPreview = {
	id?: string | number;
	documentId?: string;
	name: string;
	description: string;
	slug: string;
	cover?: CmsMedia | null;
};

type PageRaw = {
	title?: string;
	slug?: string;
	blocks?: PageBlock[];
	seo?: PageSeo;
};

type PreviewEntity = {
	name?: string;
	description?: string;
	slug?: string;
	cover?: CmsMedia | null;
};

const fetchCmsList = async <T>(url: URL): Promise<StrapiEntity<T>[]> => {
	const response = await fetch(url.toString());
	if (!response.ok) {
		throw new Error(await parseCmsErrorMessage(response));
	}

	const json = (await response.json()) as StrapiListResponse<T>;
	return json.data ?? [];
};

export const fetchPageSlugs = async (locale = defaultCmsLocale) => {
	const url = buildCmsUrl("/pages");
	url.searchParams.set("locale", locale);
	url.searchParams.set("fields[0]", "slug");
	url.searchParams.set("pagination[pageSize]", "100");
	url.searchParams.set("sort[0]", "slug:asc");

	const pages = await fetchCmsList<{ slug?: string }>(url);
	return pages.map((page) => page.slug).filter(Boolean) as string[];
};

export const fetchPageBySlug = async (
	slug: string,
	locale = defaultCmsLocale
): Promise<CmsPage | null> => {
	const url = buildCmsUrl("/pages");
	url.searchParams.set("locale", locale);
	url.searchParams.set("filters[slug][$eq]", slug);
	url.searchParams.set("pagination[page]", "1");
	url.searchParams.set("pagination[pageSize]", "1");
	url.searchParams.set("populate[seo][populate][ogImage]", "true");
	url.searchParams.set("populate[blocks][on][blocks.hero][populate][media]", "true");
	url.searchParams.set("populate[blocks][on][blocks.feature-cards][populate][items]", "true");
	url.searchParams.set("populate[blocks][on][blocks.feature-highlight][populate][media]", "true");
	url.searchParams.set("populate[blocks][on][blocks.feature-highlight][populate][items]", "true");
	url.searchParams.set("populate[blocks][on][blocks.logo-cloud][populate][items][populate][logo]", "true");
	url.searchParams.set("populate[blocks][on][blocks.testimonials][populate][items][populate][avatar]", "true");
	url.searchParams.set("populate[blocks][on][blocks.stats][populate][items]", "true");
	url.searchParams.set("populate[blocks][on][blocks.faq][populate][items]", "true");
	url.searchParams.set("populate[blocks][on][blocks.process-timeline][populate][items]", "true");
	url.searchParams.set("populate[blocks][on][blocks.checklist][populate][items]", "true");
	url.searchParams.set("populate[blocks][on][blocks.content-columns][populate][columns]", "true");
	url.searchParams.set("populate[blocks][on][blocks.numbered-points][populate][items]", "true");

	const pages = await fetchCmsList<PageRaw>(url);
	const page = pages[0];

	if (!page?.slug || !page.title || !page.seo) {
		return null;
	}

	return {
		id: page.id,
		documentId: page.documentId,
		locale: page.locale,
		title: page.title,
		slug: page.slug,
		blocks: Array.isArray(page.blocks) ? page.blocks : [],
		seo: page.seo,
	};
};

export const fetchArticlePreviews = async (
	limit = 3,
	locale = defaultCmsLocale
): Promise<ArticlePreview[]> => {
	const url = buildCmsUrl("/articles");
	url.searchParams.set("locale", locale);
	url.searchParams.set("fields[0]", "name");
	url.searchParams.set("fields[1]", "description");
	url.searchParams.set("fields[2]", "slug");
	url.searchParams.set("populate[cover]", "true");
	url.searchParams.set("sort[0]", "publishedAt:desc");
	url.searchParams.set("pagination[page]", "1");
	url.searchParams.set("pagination[pageSize]", String(limit));

	const items = await fetchCmsList<PreviewEntity>(url);
	return items
		.filter((item) => item.name && item.slug)
		.map((item) => ({
			id: item.id,
			documentId: item.documentId,
			name: item.name || "",
			description: item.description || "",
			slug: item.slug || "",
			cover: item.cover,
		}));
};

export const fetchProjectPreviews = async (
	limit = 3,
	locale = defaultCmsLocale
): Promise<ProjectPreview[]> => {
	const url = buildCmsUrl("/projects");
	url.searchParams.set("locale", locale);
	url.searchParams.set("fields[0]", "name");
	url.searchParams.set("fields[1]", "description");
	url.searchParams.set("fields[2]", "slug");
	url.searchParams.set("populate[cover]", "true");
	url.searchParams.set("sort[0]", "publishedAt:desc");
	url.searchParams.set("pagination[page]", "1");
	url.searchParams.set("pagination[pageSize]", String(limit));

	const items = await fetchCmsList<PreviewEntity>(url);
	return items
		.filter((item) => item.name && item.slug)
		.map((item) => ({
			id: item.id,
			documentId: item.documentId,
			name: item.name || "",
			description: item.description || "",
			slug: item.slug || "",
			cover: item.cover,
		}));
};

export const fetchVacancyPreviews = async (
	limit = 3,
	locale = defaultCmsLocale
): Promise<Vacancy[]> => {
	const result = await fetchVacancies({
		locale,
		page: 1,
		pageSize: limit,
	});

	return result.items;
};
