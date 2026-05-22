import {
	defaultCmsLocale,
	parseCmsErrorMessage,
	type CmsRequestOptions,
} from "@/shared/api/cms";
import {
	buildServerCmsUrl,
	createServerCmsHeaders,
} from "@/shared/api/strapi-server";
import type { PageSeo } from "@/shared/api/pages";
import type {
	EmploymentType,
	TaxonomyItem,
	Vacancy,
	VacancyBySlugOptions,
	VacancyLevel,
	VacancyListResult,
	VacancySearchParams,
	WorkFormat,
} from "@/shared/api/vacancies";

type StrapiEntity<T> = {
	id?: string | number;
	documentId?: string;
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

type VacancyRaw = {
	title?: string;
	slug?: string;
	locale?: string;
	location?: string;
	workFormat?: WorkFormat;
	employmentType?: EmploymentType;
	level?: VacancyLevel;
	salaryFrom?: number;
	salaryTo?: number;
	currency?: string;
	description?: string;
	publishedAt?: string;
	seo?: PageSeo | null;
	industry?: {
		name?: string;
		slug?: string;
	};
	role?: {
		name?: string;
		slug?: string;
	};
};

type TaxonomyRaw = {
	name?: string;
	slug?: string;
};

const defaultPublishedStatus = "published";

const mapTaxonomy = (item?: TaxonomyRaw | null): TaxonomyItem | null => {
	if (!item?.name || !item?.slug) {
		return null;
	}

	return {
		name: item.name,
		slug: item.slug,
	};
};

const mapVacancy = (item: StrapiEntity<VacancyRaw>): Vacancy => ({
	id: item.id,
	documentId: item.documentId,
	locale: item.locale,
	title: item.title || "",
	slug: item.slug || "",
	location: item.location || "",
	workFormat: item.workFormat || "",
	employmentType: item.employmentType || "",
	level: item.level || "",
	salaryFrom: item.salaryFrom,
	salaryTo: item.salaryTo,
	currency: item.currency,
	description: item.description,
	publishedAt: item.publishedAt,
	seo: item.seo || null,
	industry: mapTaxonomy(item.industry),
	role: mapTaxonomy(item.role),
});

const applyRequestOptions = (url: URL, options?: CmsRequestOptions) => {
	url.searchParams.set("status", options?.status || defaultPublishedStatus);
	return url;
};

export const fetchCmsVacancies = async (
	params: VacancySearchParams = {},
	options?: CmsRequestOptions
): Promise<VacancyListResult> => {
	const url = applyRequestOptions(buildServerCmsUrl("/vacancies"), options);
	url.searchParams.set("sort", params.sort || "publishedAt:desc");
	url.searchParams.set("populate[0]", "industry");
	url.searchParams.set("populate[1]", "role");
	url.searchParams.set("pagination[page]", String(params.page || 1));
	url.searchParams.set("pagination[pageSize]", String(params.pageSize || 9));
	url.searchParams.set("locale", params.locale || defaultCmsLocale);
	url.searchParams.set("filters[isActive][$eq]", "true");

	const searchQuery = params.q?.trim();
	let andIndex = 0;
	if (searchQuery) {
		url.searchParams.set(
			`filters[$and][${andIndex}][$or][0][title][$containsi]`,
			searchQuery
		);
		url.searchParams.set(
			`filters[$and][${andIndex}][$or][1][description][$containsi]`,
			searchQuery
		);
		andIndex += 1;
	}
	if (params.industry) {
		url.searchParams.set("filters[industry][slug][$eq]", params.industry);
	}
	if (params.role) {
		url.searchParams.set("filters[role][slug][$eq]", params.role);
	}
	if (params.location) {
		url.searchParams.set("filters[location][$containsi]", params.location.trim());
	}
	if (params.workFormat) {
		url.searchParams.set("filters[workFormat][$eq]", params.workFormat);
	}
	if (params.employmentType) {
		url.searchParams.set("filters[employmentType][$eq]", params.employmentType);
	}
	if (params.level) {
		url.searchParams.set("filters[level][$eq]", params.level);
	}

	const response = await fetch(url.toString(), {
		headers: createServerCmsHeaders(options?.headers),
	});

	if (!response.ok) {
		throw new Error(await parseCmsErrorMessage(response));
	}

	const json = (await response.json()) as StrapiListResponse<VacancyRaw>;

	return {
		items: (json.data || []).map(mapVacancy),
		pagination: {
			page: json.meta?.pagination?.page || 1,
			pageSize: json.meta?.pagination?.pageSize || 9,
			pageCount: json.meta?.pagination?.pageCount || 1,
			total: json.meta?.pagination?.total || 0,
		},
	};
};

export const fetchCmsVacancyBySlug = async (
	slug: string,
	options: VacancyBySlugOptions = {}
): Promise<Vacancy | null> => {
	const url = applyRequestOptions(buildServerCmsUrl("/vacancies"), options);
	url.searchParams.set("populate[0]", "industry");
	url.searchParams.set("populate[1]", "role");
	url.searchParams.set("locale", options.locale || defaultCmsLocale);
	url.searchParams.set("filters[slug][$eq]", slug);
	url.searchParams.set("pagination[page]", "1");
	url.searchParams.set("pagination[pageSize]", "1");
	url.searchParams.set("populate[seo][populate][ogImage]", "true");

	if (!options.includeInactive) {
		url.searchParams.set("filters[isActive][$eq]", "true");
	}

	const response = await fetch(url.toString(), {
		headers: createServerCmsHeaders(options.headers),
	});

	if (!response.ok) {
		throw new Error(await parseCmsErrorMessage(response));
	}

	const json = (await response.json()) as StrapiListResponse<VacancyRaw>;
	const vacancy = json.data?.[0];

	return vacancy ? mapVacancy(vacancy) : null;
};

export const fetchCmsIndustries = async (
	locale = defaultCmsLocale,
	options?: CmsRequestOptions
): Promise<TaxonomyItem[]> => {
	const url = applyRequestOptions(buildServerCmsUrl("/industries"), options);
	url.searchParams.set("sort", "name:asc");
	url.searchParams.set("pagination[pageSize]", "100");
	url.searchParams.set("locale", locale);

	const response = await fetch(url.toString(), {
		headers: createServerCmsHeaders(options?.headers),
	});

	if (!response.ok) {
		throw new Error(await parseCmsErrorMessage(response));
	}

	const json = (await response.json()) as StrapiListResponse<TaxonomyRaw>;
	return (json.data || [])
		.map((item) => mapTaxonomy(item))
		.filter((item): item is TaxonomyItem => Boolean(item));
};

export const fetchCmsJobRoles = async (
	locale = defaultCmsLocale,
	options?: CmsRequestOptions
): Promise<TaxonomyItem[]> => {
	const url = applyRequestOptions(buildServerCmsUrl("/job-roles"), options);
	url.searchParams.set("sort", "name:asc");
	url.searchParams.set("pagination[pageSize]", "100");
	url.searchParams.set("locale", locale);

	const response = await fetch(url.toString(), {
		headers: createServerCmsHeaders(options?.headers),
	});

	if (!response.ok) {
		throw new Error(await parseCmsErrorMessage(response));
	}

	const json = (await response.json()) as StrapiListResponse<TaxonomyRaw>;
	return (json.data || [])
		.map((item) => mapTaxonomy(item))
		.filter((item): item is TaxonomyItem => Boolean(item));
};
