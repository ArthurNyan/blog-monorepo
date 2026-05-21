import type { APIRoute } from "astro";
import { defaultCmsLocale } from "@/shared/api/cms";
import { fetchCmsIndustries } from "@/shared/api/vacancies-cms";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
	try {
		const items = await fetchCmsIndustries(
			url.searchParams.get("locale") || defaultCmsLocale
		);

		return Response.json(items);
	} catch (error) {
		return Response.json(
			{
				message:
					error instanceof Error
						? error.message
						: "Не удалось загрузить отрасли.",
			},
			{ status: 502 }
		);
	}
};
