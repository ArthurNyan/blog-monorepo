import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedExtensions = [".pdf", ".doc", ".docx"];

export const vacancyApplicationFormSchema = z.object({
	fullName: z
		.string()
		.trim()
		.min(1, "Укажите имя и фамилию")
		.min(2, "Слишком короткое имя")
		.max(120, "Максимум 120 символов"),
	email: z.string().trim().min(1, "Укажите email").email("Неверный формат email"),
	phone: z.string().trim().min(1, "Укажите телефон"),
	city: z
		.string()
		.refine((value) => value.trim().length === 0 || value.trim().length >= 2, {
			message: "Уточните название города",
		}),
	coverLetter: z.string().max(3000, "Максимум 3000 символов"),
	consent: z.literal(true, {
		errorMap: () => ({
			message: "Нужно согласие на обработку персональных данных",
		}),
	}),
	resumeFile: z
		.instanceof(File, { message: "Прикрепите резюме" })
		.refine(
			(file) => allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext)),
			"Допустимы только файлы PDF, DOC, DOCX"
		)
		.refine((file) => file.size <= MAX_FILE_SIZE, "Файл не должен превышать 10MB"),
	honeypot: z.string().optional(),
});

export type VacancyApplicationFormValues = z.infer<typeof vacancyApplicationFormSchema>;

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
