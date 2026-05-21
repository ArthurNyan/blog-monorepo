import type { APIRoute } from "astro";
import { parseCmsErrorMessage } from "@/shared/api/cms";
import {
	buildServerCmsUrl,
	createServerCmsHeaders,
} from "@/shared/api/strapi-server";
import {
	isHoneypotFilled,
	normalizeOptionalText,
} from "@/shared/lib/form-security";
import { vacancyApplicationFormSchema } from "@/widgets/VacancyApplicationForm/model/schema";

export const prerender = false;

const invalidPayloadMessage =
	"Не удалось проверить данные формы. Проверьте поля и попробуйте снова.";

export const POST: APIRoute = async ({ request }) => {
	let formData: FormData;

	try {
		formData = await request.formData();
	} catch {
		return Response.json(
			{ message: invalidPayloadMessage },
			{ status: 400 }
		);
	}

	const rawValues = {
		fullName: String(formData.get("data[fullName]") || ""),
		email: String(formData.get("data[email]") || ""),
		phone: String(formData.get("data[phone]") || ""),
		city: String(formData.get("data[city]") || ""),
		coverLetter: String(formData.get("data[coverLetter]") || ""),
		consent: String(formData.get("data[consent]") || "").toLowerCase() === "true",
		resumeFile: formData.get("files.resumeFile"),
		honeypot: String(formData.get("honeypot") || ""),
	};

	const parsedPayload = vacancyApplicationFormSchema.safeParse(rawValues);

	if (!parsedPayload.success) {
		return Response.json(
			{
				message: invalidPayloadMessage,
				fieldErrors: parsedPayload.error.flatten().fieldErrors,
			},
			{ status: 400 }
		);
	}

	if (isHoneypotFilled(parsedPayload.data.honeypot)) {
		return new Response(null, { status: 204 });
	}

	const vacancyId = String(formData.get("data[vacancy]") || "").trim();

	if (!vacancyId) {
		return Response.json(
			{ message: "Vacancy id is required." },
			{ status: 400 }
		);
	}

	try {
		const cmsFormData = new FormData();
		cmsFormData.append("data[vacancy]", vacancyId);
		cmsFormData.append("data[fullName]", parsedPayload.data.fullName.trim());
		cmsFormData.append("data[email]", parsedPayload.data.email.trim());
		cmsFormData.append("data[phone]", parsedPayload.data.phone.trim());
		cmsFormData.append(
			"data[city]",
			normalizeOptionalText(parsedPayload.data.city)
		);
		cmsFormData.append(
			"data[coverLetter]",
			normalizeOptionalText(parsedPayload.data.coverLetter)
		);
		cmsFormData.append("data[consent]", String(parsedPayload.data.consent));
		cmsFormData.append("data[source]", "astro-vacancy-form");
		cmsFormData.append("data[submittedAt]", new Date().toISOString());
		cmsFormData.append("files.resumeFile", parsedPayload.data.resumeFile);

		const cmsResponse = await fetch(
			buildServerCmsUrl("/vacancy-applications").toString(),
			{
				method: "POST",
				headers: createServerCmsHeaders(),
				body: cmsFormData,
			}
		);

		if (!cmsResponse.ok) {
			return Response.json(
				{
					message: await parseCmsErrorMessage(cmsResponse),
				},
				{ status: 502 }
			);
		}

		return Response.json({ ok: true }, { status: 201 });
	} catch (error) {
		return Response.json(
			{
				message:
					error instanceof Error
						? error.message
						: "Не удалось отправить отклик. Попробуйте позже.",
			},
			{ status: 500 }
		);
	}
};
