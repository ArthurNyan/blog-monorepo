import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { submitVacancyApplication } from "@/shared/api/vacancies";
import {
	vacancyApplicationDefaultValues,
	vacancyApplicationFormSchema,
	type VacancyApplicationFormValues,
} from "./schema";

type UseVacancyApplicationRHFParams = {
	vacancyId: string | number;
};

const successMessage =
	"Отклик отправлен. Спасибо! Мы свяжемся с вами после рассмотрения.";

export const useVacancyApplicationRHF = ({
	vacancyId,
}: UseVacancyApplicationRHFParams) => {
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

	const form = useForm<VacancyApplicationFormValues>({
		resolver: zodResolver(vacancyApplicationFormSchema),
		mode: "onBlur",
		reValidateMode: "onChange",
		defaultValues: vacancyApplicationDefaultValues,
	});

	const onSubmit = form.handleSubmit(async (values) => {
		setSubmitError(null);
		setSubmitSuccess(null);

		if (values.honeypot?.trim()) {
			setSubmitSuccess(successMessage);
			form.reset(vacancyApplicationDefaultValues);
			return;
		}

		try {
			await submitVacancyApplication({
				vacancyId,
				fullName: values.fullName.trim(),
				email: values.email.trim(),
				phone: values.phone.trim(),
				city: values.city.trim(),
				coverLetter: values.coverLetter.trim(),
				consent: values.consent,
				resumeFile: values.resumeFile,
				honeypot: values.honeypot || "",
			});

			setSubmitSuccess(successMessage);
			form.reset(vacancyApplicationDefaultValues);
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: "Не удалось отправить отклик. Попробуйте позже."
			);
		}
	});

	return {
		form,
		onSubmit,
		submitError,
		submitSuccess,
	};
};
