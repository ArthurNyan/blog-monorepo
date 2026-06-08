import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { submitVacancyApplication } from "@/shared/api/vacancies";
import {
	isHoneypotFilled,
	normalizeOptionalText,
} from "@/shared/lib/form-security";
import {
	createVacancyApplicationFormSchema,
	vacancyApplicationDefaultValues,
	type VacancyApplicationFormValues,
} from "./schema";
import { getVacancyApplicationFormCopy } from "./copy";
import type { VacancyApplicationFormProps } from "./types";

type UseVacancyApplicationRHFParams = Pick<
	VacancyApplicationFormProps,
	"vacancyId" | "siteLocale"
>;

export const useVacancyApplicationRHF = ({
	vacancyId,
	siteLocale,
}: UseVacancyApplicationRHFParams) => {
	const copy = getVacancyApplicationFormCopy(siteLocale);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

	const form = useForm<VacancyApplicationFormValues>({
		resolver: zodResolver(createVacancyApplicationFormSchema(siteLocale)),
		mode: "onBlur",
		reValidateMode: "onChange",
		defaultValues: vacancyApplicationDefaultValues,
	});

	const onSubmit = form.handleSubmit(async (values) => {
		setSubmitError(null);
		setSubmitSuccess(null);

		if (isHoneypotFilled(values.honeypot)) {
			setSubmitSuccess(copy.successMessage);
			form.reset(vacancyApplicationDefaultValues);
			return;
		}

		try {
			await submitVacancyApplication({
				vacancyId,
				locale: siteLocale,
				fullName: values.fullName.trim(),
				email: values.email.trim(),
				phone: values.phone.trim(),
				city: normalizeOptionalText(values.city),
				coverLetter: normalizeOptionalText(values.coverLetter),
				consent: values.consent,
				resumeFile: values.resumeFile,
				honeypot: values.honeypot || "",
			});

			setSubmitSuccess(copy.successMessage);
			form.reset(vacancyApplicationDefaultValues);
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: copy.defaultSubmitErrorMessage
			);
		}
	});

	return {
		copy,
		form,
		onSubmit,
		submitError,
		submitSuccess,
	};
};
