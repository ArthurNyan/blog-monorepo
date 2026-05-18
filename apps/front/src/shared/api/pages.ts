import {
	applyCmsRequestOptions,
	buildCmsUrl,
	type CmsRequestOptions,
	defaultCmsLocale,
	parseCmsErrorMessage,
	resolveCmsMediaUrl,
} from "@/shared/api/cms";
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

export type CmsAuthor = {
	id?: string | number;
	firstName?: string;
	lastName?: string;
};

export type ArticleDetail = {
	id?: string | number;
	documentId?: string;
	locale?: string;
	name: string;
	description: string;
	slug: string;
	date?: string;
	cover?: CmsMedia | null;
	authors?: CmsAuthor[];
	content?: string;
};

export type ProjectDetail = {
	id?: string | number;
	documentId?: string;
	locale?: string;
	name: string;
	description: string;
	slug: string;
	date?: string;
	cover?: CmsMedia | null;
	logo?: CmsMedia | null;
	content?: string;
};

type PageRaw = {
	title?: string;
	slug?: string;
	blocks?: PageBlock[];
	seo?: PageSeo;
};

type ArticleRaw = {
	name?: string;
	description?: string;
	slug?: string;
	date?: string;
	cover?: CmsMedia | null;
	authors?: CmsAuthor[];
	content?: string;
};

type ProjectRaw = {
	name?: string;
	description?: string;
	slug?: string;
	date?: string;
	cover?: CmsMedia | null;
	logo?: CmsMedia | null;
	content?: string;
};

type PreviewEntity = {
	name?: string;
	description?: string;
	slug?: string;
	cover?: CmsMedia | null;
};

const resolveCmsMedia = (media?: CmsMedia | null): CmsMedia | null => {
	if (!media) {
		return null;
	}

	return {
		...media,
		url: resolveCmsMediaUrl(media.url),
		formats: {
			thumbnail: media.formats?.thumbnail
				? {
						url: resolveCmsMediaUrl(media.formats.thumbnail.url),
					}
				: undefined,
			small: media.formats?.small
				? {
						url: resolveCmsMediaUrl(media.formats.small.url),
					}
				: undefined,
			medium: media.formats?.medium
				? {
						url: resolveCmsMediaUrl(media.formats.medium.url),
					}
				: undefined,
			large: media.formats?.large
				? {
						url: resolveCmsMediaUrl(media.formats.large.url),
					}
				: undefined,
		},
	};
};

const fetchCmsList = async <T>(
	url: URL,
	options?: CmsRequestOptions
): Promise<StrapiEntity<T>[]> => {
	const response = await fetch(url.toString(), {
		headers: options?.headers,
	});
	if (!response.ok) {
		throw new Error(await parseCmsErrorMessage(response));
	}

	const json = (await response.json()) as StrapiListResponse<T>;
	return json.data ?? [];
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

export const fetchPageSlugs = async (
	locale = defaultCmsLocale,
	options?: CmsRequestOptions
) => {
	const url = applyCmsRequestOptions(buildCmsUrl("/pages"), options);
	url.searchParams.set("locale", locale);
	url.searchParams.set("fields[0]", "slug");
	url.searchParams.set("pagination[pageSize]", "100");
	url.searchParams.set("sort[0]", "slug:asc");

	const pages = await fetchCmsList<{ slug?: string }>(url, options);
	return pages.map((page) => page.slug).filter(Boolean) as string[];
};

export const fetchPageBySlug = async (
	slug: string,
	locale = defaultCmsLocale,
	options?: CmsRequestOptions
): Promise<CmsPage | null> => {
	const url = applyCmsRequestOptions(buildCmsUrl("/pages"), options);
	url.searchParams.set("locale", locale);
	url.searchParams.set("filters[slug][$eq]", slug);
	url.searchParams.set("pagination[page]", "1");
	url.searchParams.set("pagination[pageSize]", "1");
	appendPageBuilderPopulateParams(url);

	const pages = await fetchCmsList<PageRaw>(url, options);
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

export const fetchArticleBySlug = async (
	slug: string,
	locale = defaultCmsLocale,
	options?: CmsRequestOptions
): Promise<ArticleDetail | null> => {
	const url = applyCmsRequestOptions(buildCmsUrl("/articles"), options);
	url.searchParams.set("locale", locale);
	url.searchParams.set("filters[slug][$eq]", slug);
	url.searchParams.set("pagination[page]", "1");
	url.searchParams.set("pagination[pageSize]", "1");
	url.searchParams.set("populate[cover]", "true");
	url.searchParams.set("populate[authors]", "true");

	const items = await fetchCmsList<ArticleRaw>(url, options);
	const article = items[0];

	if (!article?.slug || !article.name || !article.description) {
		return null;
	}

	return {
		id: article.id,
		documentId: article.documentId,
		locale: article.locale,
		name: article.name,
		description: article.description,
		slug: article.slug,
		date: article.date,
		cover: resolveCmsMedia(article.cover),
		authors: Array.isArray(article.authors) ? article.authors : [],
		content: article.content,
	};
};

export const fetchProjectBySlug = async (
	slug: string,
	locale = defaultCmsLocale,
	options?: CmsRequestOptions
): Promise<ProjectDetail | null> => {
	const url = applyCmsRequestOptions(buildCmsUrl("/projects"), options);
	url.searchParams.set("locale", locale);
	url.searchParams.set("filters[slug][$eq]", slug);
	url.searchParams.set("pagination[page]", "1");
	url.searchParams.set("pagination[pageSize]", "1");
	url.searchParams.set("populate[cover]", "true");
	url.searchParams.set("populate[logo]", "true");

	const items = await fetchCmsList<ProjectRaw>(url, options);
	const project = items[0];

	if (!project?.slug || !project.name || !project.description) {
		return null;
	}

	return {
		id: project.id,
		documentId: project.documentId,
		locale: project.locale,
		name: project.name,
		description: project.description,
		slug: project.slug,
		date: project.date,
		cover: resolveCmsMedia(project.cover),
		logo: resolveCmsMedia(project.logo),
		content: project.content,
	};
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
