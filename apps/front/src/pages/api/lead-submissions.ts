import type { APIRoute } from "astro";
import { parseCmsErrorMessage } from "@/shared/api/cms";
import { toSiteLocale } from "@/shared/i18n/config";
import { isHoneypotFilled } from "@/shared/lib/form-security";
import { getLeadFormCopy } from "@/widgets/LeadCaptureForm/model/copy";
import { createLeadSubmissionRequestSchema } from "@/widgets/LeadCaptureForm/model/schema";

export const prerender = false;

const getCmsBaseUrl = () =>
	import.meta.env.CMS_URL ??
	import.meta.env.PUBLIC_CMS_URL ??
	"http://localhost:1337";

const getCmsApiToken = () => {
	const token = import.meta.env.CMS_API_TOKEN?.trim();

	if (!token) {
		throw new Error(
			"CMS_API_TOKEN is not configured. Lead submissions require a server-side Strapi API token."
		);
	}

	return token;
};

export const POST: APIRoute = async ({ request }) => {
	let rawPayload: unknown;

	try {
		rawPayload = await request.json();
	} catch {
		return Response.json(
			{
				message: getLeadFormCopy("ru").invalidPayloadMessage,
			},
			{ status: 400 }
		);
	}

	const locale = toSiteLocale(
		typeof rawPayload === "object" &&
			rawPayload !== null &&
			"locale" in rawPayload &&
			typeof rawPayload.locale === "string"
			? rawPayload.locale
			: undefined
	);
	const copy = getLeadFormCopy(locale);
	const parsedPayload = createLeadSubmissionRequestSchema(locale).safeParse(rawPayload);

	if (!parsedPayload.success) {
		return Response.json(
			{
				message: copy.invalidPayloadMessage,
				fieldErrors: parsedPayload.error.flatten().fieldErrors,
			},
			{ status: 400 }
		);
	}

	const payload = parsedPayload.data;

	if (isHoneypotFilled(payload.honeypot)) {
		return new Response(null, { status: 204 });
	}

	try {
		const cmsResponse = await fetch(
			new URL("/api/lead-submissions", getCmsBaseUrl()).toString(),
			{
				method: "POST",
				headers: {
					authorization: `Bearer ${getCmsApiToken()}`,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					data: {
						fullName: payload.fullName.trim(),
						email: payload.email.trim(),
						phone: payload.phone || undefined,
						companyName: payload.companyName || undefined,
						message: payload.message.trim(),
						consent: payload.consent,
						submittedAt: new Date().toISOString(),
						source: "astro-page-builder",
						formName: payload.formName.trim(),
						pagePath: payload.pagePath.trim(),
						pageTitle: payload.pageTitle?.trim() || undefined,
						locale: payload.locale,
					},
				}),
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
						: copy.defaultSubmitErrorMessage,
			},
			{ status: 500 }
		);
	}
};
