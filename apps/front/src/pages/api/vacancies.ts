import type { APIRoute } from "astro";
import { defaultCmsLocale } from "@/shared/api/cms";
import { fetchCmsVacancies } from "@/shared/api/vacancies-cms";
import type {
	EmploymentType,
	VacancyLevel,
	WorkFormat,
} from "@/shared/api/vacancies";

export const prerender = false;

const parsePositiveInteger = (
	value: string | null,
	fallback: number,
	max = 100
) => {
	const parsedValue = Number(value);

	if (!Number.isFinite(parsedValue)) {
		return fallback;
	}

	return Math.min(max, Math.max(1, Math.trunc(parsedValue)));
};

export const GET: APIRoute = async ({ url }) => {
	try {
		const result = await fetchCmsVacancies({
			q: url.searchParams.get("q") || undefined,
			industry: url.searchParams.get("industry") || undefined,
			role: url.searchParams.get("role") || undefined,
			location: url.searchParams.get("location") || undefined,
			workFormat:
				(url.searchParams.get("workFormat") as WorkFormat | null) || undefined,
			employmentType:
				(url.searchParams.get("employmentType") as EmploymentType | null) ||
				undefined,
			level: (url.searchParams.get("level") as VacancyLevel | null) || undefined,
			page: parsePositiveInteger(url.searchParams.get("page"), 1),
			pageSize: parsePositiveInteger(url.searchParams.get("pageSize"), 9),
			sort: url.searchParams.get("sort") || "publishedAt:desc",
			locale: url.searchParams.get("locale") || defaultCmsLocale,
		});

		return Response.json(result);
	} catch (error) {
		return Response.json(
			{
				message:
					error instanceof Error
						? error.message
						: "Не удалось загрузить вакансии.",
			},
			{ status: 502 }
		);
	}
};
