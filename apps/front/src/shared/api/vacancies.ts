import type { CmsRequestOptions } from "@/shared/api/cms";

const defaultLocale = "ru-RU";

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
export type VacancyBySlugOptions = CmsRequestOptions & {
	locale?: string;
	includeInactive?: boolean;
};

const buildLocalApiUrl = (path: string, params?: Record<string, string>) => {
	const url = new URL(path, "http://frontend.local");

	if (!params) {
		return url;
	}

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
	const url = buildLocalApiUrl("/api/vacancies");
	url.searchParams.set("sort", params.sort || "publishedAt:desc");
	url.searchParams.set("page", String(params.page || 1));
	url.searchParams.set("pageSize", String(params.pageSize || 9));
	url.searchParams.set("locale", params.locale || defaultLocale);

	if (params.q?.trim()) {
		url.searchParams.set("q", params.q.trim());
	}
	if (params.industry) {
		url.searchParams.set("industry", params.industry);
	}
	if (params.role) {
		url.searchParams.set("role", params.role);
	}
	if (params.location?.trim()) {
		url.searchParams.set("location", params.location.trim());
	}
	if (params.workFormat) {
		url.searchParams.set("workFormat", params.workFormat);
	}
	if (params.employmentType) {
		url.searchParams.set("employmentType", params.employmentType);
	}
	if (params.level) {
		url.searchParams.set("level", params.level);
	}

	const response = await fetch(`${url.pathname}?${url.searchParams.toString()}`);

	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
	}

	return (await response.json()) as VacancyListResult;
};

export const fetchVacancyBySlug = async (
	slug: string,
	options: VacancyBySlugOptions = {}
): Promise<Vacancy | null> => {
	const url = buildLocalApiUrl(`/api/vacancies/${encodeURIComponent(slug)}`);
	url.searchParams.set("locale", options.locale || defaultLocale);

	if (options.includeInactive) {
		url.searchParams.set("includeInactive", "true");
	}
	if (options.status) {
		url.searchParams.set("status", options.status);
	}

	const response = await fetch(`${url.pathname}?${url.searchParams.toString()}`, {
		headers: options.headers,
	});

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
	}

	return (await response.json()) as Vacancy | null;
};

export const fetchIndustries = async (
	locale = defaultLocale
): Promise<TaxonomyItem[]> => {
	const url = buildLocalApiUrl("/api/industries", { locale });
	const response = await fetch(`${url.pathname}?${url.searchParams.toString()}`);

	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
	}

	return (await response.json()) as TaxonomyItem[];
};

export const fetchJobRoles = async (
	locale = defaultLocale
): Promise<TaxonomyItem[]> => {
	const url = buildLocalApiUrl("/api/job-roles", { locale });
	const response = await fetch(`${url.pathname}?${url.searchParams.toString()}`);

	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
	}

	return (await response.json()) as TaxonomyItem[];
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
	formData.append("honeypot", payload.honeypot || "");
	formData.append("files.resumeFile", payload.resumeFile);

	const response = await fetch("/api/vacancy-applications", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error(await parseErrorMessage(response));
	}
};
