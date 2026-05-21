import { Button } from "@/shared/components/ui/button";
import { getLeadFormCopy } from "../model/copy";
import type { LeadCaptureFormProps } from "../model/types";
import { useLeadCaptureForm } from "../model/useLeadCaptureForm";

export const LeadCaptureForm = ({
	formName,
	pagePath,
	pageTitle,
	siteLocale,
	submitLabel,
	successMessage,
	consentLabel,
}: LeadCaptureFormProps) => {
	const { copy, form, onSubmit, submitError, submitSuccess } = useLeadCaptureForm({
		formName,
		pagePath,
		pageTitle,
		siteLocale,
		submitLabel,
		successMessage,
		consentLabel,
	});
	const fallbackCopy = getLeadFormCopy(siteLocale);
	const {
		register,
		watch,
		formState: { errors, isSubmitting },
	} = form;

	const messageValue = watch("message") || "";

	return (
		<form onSubmit={onSubmit} className="space-y-5">
			<div className="grid gap-4 sm:grid-cols-2">
				<label className="space-y-2 text-sm block">
					<span>{copy.fullNameLabel}</span>
					<input
						{...register("fullName")}
						className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder={copy.fullNamePlaceholder}
						required
					/>
					{errors.fullName && (
						<p className="text-xs text-destructive">{errors.fullName.message}</p>
					)}
				</label>

				<label className="space-y-2 text-sm block">
					<span>{copy.emailLabel}</span>
					<input
						{...register("email")}
						type="email"
						className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder={copy.emailPlaceholder}
						required
					/>
					{errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
				</label>

				<label className="space-y-2 text-sm block">
					<span>{copy.phoneLabel}</span>
					<input
						{...register("phone")}
						type="tel"
						className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder={copy.phonePlaceholder}
						autoComplete="tel"
					/>
					{errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
				</label>

				<label className="space-y-2 text-sm block">
					<span>{copy.companyLabel}</span>
					<input
						{...register("companyName")}
						className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder={copy.companyPlaceholder}
						autoComplete="organization"
					/>
					{errors.companyName && (
						<p className="text-xs text-destructive">{errors.companyName.message}</p>
					)}
				</label>
			</div>

			<label className="space-y-2 text-sm block">
				<span>{copy.messageLabel}</span>
				<textarea
					{...register("message")}
					className="w-full min-h-40 rounded-md border border-input bg-background px-3 py-2 text-sm"
					placeholder={copy.messagePlaceholder}
					required
				/>
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>{copy.messageHint}</span>
					<span>{messageValue.length}/2500</span>
				</div>
				{errors.message && (
					<p className="text-xs text-destructive">{errors.message.message}</p>
				)}
			</label>

			<input
				{...register("honeypot")}
				type="text"
				tabIndex={-1}
				autoComplete="off"
				className="hidden"
				aria-hidden="true"
			/>

			<label className="flex items-start gap-2 text-sm">
				<input {...register("consent")} type="checkbox" className="mt-1" required />
				<span>{consentLabel?.trim() || copy.consentLabel}</span>
			</label>
			{errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}

			{submitError && <p className="text-sm text-destructive">{submitError}</p>}
			{submitSuccess && <p className="text-sm text-green-600">{submitSuccess}</p>}

			<Button type="submit" disabled={isSubmitting} className="w-full">
				{isSubmitting
					? fallbackCopy.submittingLabel
					: submitLabel?.trim() || copy.submitLabel}
			</Button>
		</form>
	);
};
