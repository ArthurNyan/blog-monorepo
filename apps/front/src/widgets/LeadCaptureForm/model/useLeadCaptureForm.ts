import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { submitLeadSubmission } from "@/shared/api/lead-submissions";
import {
	isHoneypotFilled,
	normalizeOptionalText,
} from "@/shared/lib/form-security";
import { getLeadFormCopy } from "./copy";
import {
	createLeadCaptureFormSchema,
	leadCaptureFormDefaultValues,
	type LeadCaptureFormValues,
} from "./schema";
import type { LeadCaptureFormProps } from "./types";

type UseLeadCaptureFormParams = LeadCaptureFormProps;

export const useLeadCaptureForm = ({
	formName,
	pagePath,
	pageTitle,
	siteLocale,
	successMessage,
}: UseLeadCaptureFormParams) => {
	const copy = getLeadFormCopy(siteLocale);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

	const form = useForm<LeadCaptureFormValues>({
		resolver: zodResolver(createLeadCaptureFormSchema(siteLocale)),
		mode: "onBlur",
		reValidateMode: "onChange",
		defaultValues: leadCaptureFormDefaultValues,
	});

	const successFeedback =
		successMessage?.trim() || copy.defaultSuccessMessage;

	const onSubmit = form.handleSubmit(async (values) => {
		setSubmitError(null);
		setSubmitSuccess(null);

		if (isHoneypotFilled(values.honeypot)) {
			setSubmitSuccess(successFeedback);
			form.reset(leadCaptureFormDefaultValues);
			return;
		}

		try {
			await submitLeadSubmission({
				fullName: values.fullName.trim(),
				email: values.email.trim(),
				phone: normalizeOptionalText(values.phone),
				companyName: normalizeOptionalText(values.companyName),
				message: values.message.trim(),
				consent: values.consent,
				honeypot: values.honeypot || "",
				formName: formName.trim(),
				pagePath,
				pageTitle: normalizeOptionalText(pageTitle),
				locale: siteLocale,
			});

			setSubmitSuccess(successFeedback);
			form.reset(leadCaptureFormDefaultValues);
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
