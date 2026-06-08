import { Button } from "@/shared/components/ui/button";
import type { VacancyApplicationFormProps } from "../model/types";
import type { VacancyApplicationFormValues } from "../model/schema";
import { useVacancyApplicationRHF } from "../model/useVacancyApplicationRHF";

export const VacancyApplicationForm = ({
	vacancyId,
	vacancyTitle,
	siteLocale,
}: VacancyApplicationFormProps) => {
	const { copy, form, onSubmit, submitError, submitSuccess } = useVacancyApplicationRHF({
		vacancyId,
		siteLocale,
	});
	const {
		register,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = form;

	const coverLetterValue = watch("coverLetter") || "";

		return (
		<form onSubmit={onSubmit} className="space-y-6">
			<div className="space-y-2">
				<h3 className="text-2xl font-semibold leading-tight">{copy.title(vacancyTitle)}</h3>
				<p className="text-sm text-muted-foreground">
					{copy.description}
				</p>
			</div>

			<div className="space-y-4">
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
						required
					/>
					{errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
				</label>

				<label className="space-y-2 text-sm block">
					<span>{copy.cityLabel}</span>
					<input
						{...register("city")}
						className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder={copy.cityPlaceholder}
						autoComplete="address-level2"
					/>
					{errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
				</label>
			</div>

			<label className="space-y-2 text-sm block">
				<span>{copy.coverLetterLabel}</span>
				<textarea
					{...register("coverLetter")}
					className="w-full min-h-36 rounded-md border border-input bg-background px-3 py-2 text-sm"
					placeholder={copy.coverLetterPlaceholder}
				/>
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>{copy.coverLetterHint}</span>
					<span>{coverLetterValue.length}/3000</span>
				</div>
				{errors.coverLetter && (
					<p className="text-xs text-destructive">{errors.coverLetter.message}</p>
				)}
			</label>

			<label className="space-y-2 text-sm block">
				<span>{copy.resumeLabel}</span>
				<input
					type="file"
					accept=".pdf,.doc,.docx"
					onChange={(event) => {
						const file = event.target.files?.[0];
						setValue("resumeFile", file as VacancyApplicationFormValues["resumeFile"], {
							shouldDirty: true,
							shouldValidate: true,
						});
					}}
					className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-primary file:cursor-pointer hover:file:bg-primary/20"
					required
				/>
				{errors.resumeFile && (
					<p className="text-xs text-destructive">{errors.resumeFile.message}</p>
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
				<span>
					{copy.consentLabel}
				</span>
			</label>
			{errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}

			{submitError && <p className="text-sm text-destructive">{submitError}</p>}
			{submitSuccess && <p className="text-sm text-green-500">{submitSuccess}</p>}

			<Button type="submit" disabled={isSubmitting} className="w-full">
				{isSubmitting ? copy.submittingLabel : copy.submitLabel}
			</Button>
		</form>
	);
};
