const cmsBaseUrl = import.meta.env.PUBLIC_CMS_URL ?? "http://localhost:1337";
const apiBaseUrl = `${cmsBaseUrl}/api`;

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

type StrapiSingleResponse<T> = {
	data?: StrapiEntity<T>;
};

type VacancyRaw = {
	title?: string;
	slug?: string;
	location?: string;
	workFormat?: string;
	employmentType?: string;
	level?: string;
	salaryFrom?: number;
	salaryTo?: number;
	currency?: string;
	description?: string;
	publishedAt?: string;
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

export type TaxonomyItem = {
	name: string;
	slug: string;
};

export type Vacancy = {
	id?: string | number;
	documentId?: string;
	title: string;
	slug: string;
	location: string;
	workFormat: string;
	employmentType: string;
	level: string;
	salaryFrom?: number;
	salaryTo?: number;
	currency?: string;
	description?: string;
	publishedAt?: string;
	industry?: TaxonomyItem | null;
	role?: TaxonomyItem | null;
};

export type VacancySearchParams = {
	q?: string;
	industry?: string;
	role?: string;
	location?: string;
	workFormat?: string;
	employmentType?: string;
	level?: string;
	page?: number;
	pageSize?: number;
	sort?: string;
	locale?: string;
};

export type VacancyListResult = {
	items: Vacancy[];
	pagination: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
};

export type VacancyApplicationPayload = {
	vacancyId: string | number;
	fullName: string;
	email: string;
	phone: string;
	city?: string;
	coverLetter?: string;
	consent: boolean;
	resumeFile: File;
	honeypot?: string;
};

const mapTaxonomy = (item?: TaxonomyRaw | null): TaxonomyItem | null => {
	if (!item?.name || !item?.slug) {
		return null;
	}

	return {
		name: item.name,
		slug: item.slug,
	};
};

const mapVacancy = (item: StrapiEntity<VacancyRaw>): Vacancy => {
	return {
		id: item.id,
		documentId: item.documentId,
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
		industry: mapTaxonomy(item.industry),
		role: mapTaxonomy(item.role),
	};
};

const buildUrl = (path: string, params?: Record<string, string>) => {
	const url = new URL(`${apiBaseUrl}${path}`);
	if (!params) return url;

	for (const [key, value] of Object.entries(params)) {
		if (value) {
			url.searchParams.set(key, value);
		}
	}

	return url;
};

const parseErrorMessage = async (response: Response) => {
	try {
		const json = await response.json();
		return (
			json?.error?.message ||
			json?.message ||
			"Не удалось выполнить запрос. Попробуйте снова."
		);
	} catch {
		return "Не удалось выполнить запрос. Попробуйте снова.";
	}
};

export const fetchVacancies = async (
	params: VacancySearchParams = {}
): Promise<VacancyListResult> => {
	const url = buildUrl("/vacancies");
	url.searchParams.set("sort", params.sort || "publishedAt:desc");
	url.searchParams.set("populate", "*");
	url.searchParams.set("pagination[page]", String(params.page || 1));
	url.searchParams.set("pagination[pageSize]", String(params.pageSize || 9));
	url.searchParams.set("locale", params.locale || "en");

	const queryParams: Record<string, string> = {};
	if (params.q?.trim()) {
		queryParams.q = params.q.trim();
	}
	if (params.industry) {
		queryParams.industry = params.industry;
	}
	if (params.role) {
		queryParams.role = params.role;
	}
	if (params.location) {
		queryParams.location = params.location;
	}
	if (params.workFormat) {
		queryParams.workFormat = params.workFormat;
	}
	if (params.employmentType) {
		queryParams.employmentType = params.employmentType;
	}
	if (params.level) {
		queryParams.level = params.level;
	}

	for (const [key, value] of Object.entries(queryParams)) {
		url.searchParams.set(key, value);
	}

	const response = await fetch(url.toString());
	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
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

export const fetchVacancyBySlug = async (slug: string): Promise<Vacancy | null> => {
	const response = await fetch(
		buildUrl(`/vacancies/${slug}`, {
			populate: "*",
			locale: "en",
		}).toString()
	);

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
	}

	const json = (await response.json()) as StrapiSingleResponse<VacancyRaw>;
	return json.data ? mapVacancy(json.data) : null;
};

export const fetchIndustries = async (): Promise<TaxonomyItem[]> => {
	const response = await fetch(
		buildUrl("/industries", {
			sort: "name:asc",
			"pagination[pageSize]": "100",
			locale: "en",
		}).toString()
	);

	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
	}

	const json = (await response.json()) as StrapiListResponse<TaxonomyRaw>;
	return (json.data || [])
		.map((item) => mapTaxonomy(item))
		.filter((item): item is TaxonomyItem => Boolean(item));
};

export const fetchJobRoles = async (): Promise<TaxonomyItem[]> => {
	const response = await fetch(
		buildUrl("/job-roles", {
			sort: "name:asc",
			"pagination[pageSize]": "100",
			locale: "en",
		}).toString()
	);

	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
	}

	const json = (await response.json()) as StrapiListResponse<TaxonomyRaw>;
	return (json.data || [])
		.map((item) => mapTaxonomy(item))
		.filter((item): item is TaxonomyItem => Boolean(item));
};

export const submitVacancyApplication = async (
	payload: VacancyApplicationPayload
): Promise<void> => {
	const formData = new FormData();
	formData.append(
		"data",
		JSON.stringify({
			vacancy: payload.vacancyId,
			fullName: payload.fullName,
			email: payload.email,
			phone: payload.phone,
			city: payload.city || "",
			coverLetter: payload.coverLetter || "",
			consent: payload.consent,
			website: payload.honeypot || "",
		})
	);
	formData.append("files.resumeFile", payload.resumeFile);

	const response = await fetch(`${apiBaseUrl}/vacancy-applications`, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
	}
};
