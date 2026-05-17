const cmsBaseUrl = import.meta.env.PUBLIC_CMS_URL ?? "http://localhost:1337";
const apiBaseUrl = `${cmsBaseUrl}/api`;
const defaultLocale = "ru-RU";

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
	location?: string;
	workFormat?: WorkFormat;
	employmentType?: EmploymentType;
	level?: VacancyLevel;
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
	workFormat: WorkFormat | "";
	employmentType: EmploymentType | "";
	level: VacancyLevel | "";
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
	workFormat?: WorkFormat;
	employmentType?: EmploymentType;
	level?: VacancyLevel;
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

export type WorkFormat = "remote" | "office" | "hybrid";
export type EmploymentType = "full_time" | "contract" | "internship";
export type VacancyLevel = "intern" | "junior" | "middle" | "senior" | "lead";

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
	url.searchParams.set("populate[0]", "industry");
	url.searchParams.set("populate[1]", "role");
	url.searchParams.set("pagination[page]", String(params.page || 1));
	url.searchParams.set("pagination[pageSize]", String(params.pageSize || 9));
	url.searchParams.set("locale", params.locale || defaultLocale);
	url.searchParams.set("filters[isActive][$eq]", "true");

	const searchQuery = params.q?.trim();
	if (searchQuery) {
		url.searchParams.set("filters[$or][0][title][$containsi]", searchQuery);
		url.searchParams.set("filters[$or][1][description][$containsi]", searchQuery);
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
	const url = buildUrl("/vacancies");
	url.searchParams.set("populate[0]", "industry");
	url.searchParams.set("populate[1]", "role");
	url.searchParams.set("locale", defaultLocale);
	url.searchParams.set("filters[slug][$eq]", slug);
	url.searchParams.set("filters[isActive][$eq]", "true");
	url.searchParams.set("pagination[page]", "1");
	url.searchParams.set("pagination[pageSize]", "1");
	const response = await fetch(url.toString());

	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
	}

	const json = (await response.json()) as StrapiListResponse<VacancyRaw>;
	const vacancy = json.data?.[0];
	return vacancy ? mapVacancy(vacancy) : null;
};

export const fetchIndustries = async (): Promise<TaxonomyItem[]> => {
	const response = await fetch(
		buildUrl("/industries", {
			sort: "name:asc",
			"pagination[pageSize]": "100",
			locale: defaultLocale,
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
			locale: defaultLocale,
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
	if (payload.honeypot?.trim()) {
		return;
	}

	const formData = new FormData();
	formData.append("data[vacancy]", String(payload.vacancyId));
	formData.append("data[fullName]", payload.fullName);
	formData.append("data[email]", payload.email);
	formData.append("data[phone]", payload.phone);
	formData.append("data[city]", payload.city || "");
	formData.append("data[coverLetter]", payload.coverLetter || "");
	formData.append("data[consent]", String(payload.consent));
	formData.append("data[source]", "frontend");
	formData.append("data[submittedAt]", new Date().toISOString());
	formData.append("files.resumeFile", payload.resumeFile);

	const response = await fetch(`${apiBaseUrl}/vacancy-applications`, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
	}
};
