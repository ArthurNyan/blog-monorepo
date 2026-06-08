import { z } from "zod";
import type { SiteLocale } from "@/shared/i18n/config";
import { createRequiredConsentSchema } from "@/shared/lib/form-security";
import { getVacancyApplicationFormCopy } from "./copy";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedExtensions = [".pdf", ".doc", ".docx"];

export const createVacancyApplicationFormSchema = (
	locale: SiteLocale = "ru"
) => {
	const copy = getVacancyApplicationFormCopy(locale);

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
		phone: z.string().trim().min(1, copy.phoneRequired),
		city: z
			.string()
			.refine((value) => value.trim().length === 0 || value.trim().length >= 2, {
				message: copy.cityTooShort,
			}),
		coverLetter: z.string().max(3000, copy.coverLetterTooLong),
		consent: createRequiredConsentSchema(copy.consentRequired),
		resumeFile: z
			.instanceof(File, { message: copy.resumeRequired })
			.refine(
				(file) =>
					allowedExtensions.some((ext) =>
						file.name.toLowerCase().endsWith(ext)
					),
				copy.resumeExtensionInvalid
			)
			.refine((file) => file.size <= MAX_FILE_SIZE, copy.resumeTooLarge),
		honeypot: z.string().optional(),
	});
};

export type VacancyApplicationFormValues = z.infer<
	ReturnType<typeof createVacancyApplicationFormSchema>
>;

export const vacancyApplicationDefaultValues: Omit<
	VacancyApplicationFormValues,
	"consent" | "resumeFile"
> & {
	consent: false;
	resumeFile: undefined;
} = {
	fullName: "",
	email: "",
	phone: "",
	city: "",
	coverLetter: "",
	consent: false,
	resumeFile: undefined,
	honeypot: "",
};
