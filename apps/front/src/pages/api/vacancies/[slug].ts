import type { APIRoute } from "astro";
import { defaultCmsLocale, type CmsStatus } from "@/shared/api/cms";
import { fetchCmsVacancyBySlug } from "@/shared/api/vacancies-cms";

export const prerender = false;

const isCmsStatus = (value: string | null): value is CmsStatus =>
	value === "published" || value === "draft";

export const GET: APIRoute = async ({ params, url }) => {
	const slug = params.slug;

	if (!slug) {
		return Response.json(
			{ message: "Vacancy slug is required." },
			{ status: 400 }
		);
	}

	try {
		const status = url.searchParams.get("status");
		const vacancy = await fetchCmsVacancyBySlug(slug, {
			locale: url.searchParams.get("locale") || defaultCmsLocale,
			includeInactive: url.searchParams.get("includeInactive") === "true",
			status: isCmsStatus(status) ? status : undefined,
		});

		if (!vacancy) {
			return Response.json(null, { status: 404 });
		}

		return Response.json(vacancy);
	} catch (error) {
		return Response.json(
			{
				message:
					error instanceof Error
						? error.message
						: "Не удалось загрузить вакансию.",
			},
			{ status: 502 }
		);
	}
};
