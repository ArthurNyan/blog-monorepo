import { z } from "zod";
import type { SiteLocale } from "@/shared/i18n/config";
import { createRequiredConsentSchema } from "@/shared/lib/form-security";
import { getLeadFormCopy } from "./copy";

const phonePattern = /^[0-9+()\-\s]{6,40}$/;

const createOptionalShortTextField = (
	minLength: number,
	maxLength: number,
	minMessage: string,
	maxMessage: string
) =>
	z
		.string()
		.trim()
		.refine((value) => value.length === 0 || value.length >= minLength, {
			message: minMessage,
		})
		.max(maxLength, maxMessage);

export const createLeadCaptureFormSchema = (locale: SiteLocale = "ru") => {
	const copy = getLeadFormCopy(locale);

	return z.object({
		fullName: z
			.string()
			.trim()
			.min(1, copy.fullNameRequired)
			.min(2, copy.fullNameTooShort)
			.max(120, copy.fullNameTooLong),
		email: z
			.string()
			.trim()
			.min(1, copy.emailRequired)
			.email(copy.emailInvalid),
		phone: z
			.string()
			.trim()
			.refine(
				(value) => value.length === 0 || phonePattern.test(value),
				copy.phoneInvalid
			)
			.max(40, copy.phoneTooLong),
		companyName: createOptionalShortTextField(
			2,
			120,
			copy.companyTooShort,
			copy.companyTooLong
		),
		message: z
			.string()
			.trim()
			.min(1, copy.messageRequired)
			.min(10, copy.messageTooShort)
			.max(2500, copy.messageTooLong),
		consent: createRequiredConsentSchema(copy.consentRequired),
		honeypot: z.string().optional(),
	});
};

export const createLeadSubmissionRequestSchema = (locale: SiteLocale = "ru") =>
	createLeadCaptureFormSchema(locale).extend({
		pagePath: z.string().trim().min(1).max(200),
		pageTitle: z.string().trim().max(160).optional(),
		formName: z.string().trim().min(1).max(80),
		locale: z.string().trim().max(10),
	});

export type LeadCaptureFormValues = z.infer<
	ReturnType<typeof createLeadCaptureFormSchema>
>;

export type LeadSubmissionRequestPayload = z.infer<
	ReturnType<typeof createLeadSubmissionRequestSchema>
>;

export const leadCaptureFormDefaultValues: Omit<
	LeadCaptureFormValues,
	"consent"
> & {
	consent: false;
} = {
	fullName: "",
	email: "",
	phone: "",
	companyName: "",
	message: "",
	consent: false,
	honeypot: "",
};
