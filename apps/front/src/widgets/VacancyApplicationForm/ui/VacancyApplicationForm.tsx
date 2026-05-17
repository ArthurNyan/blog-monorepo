import { Button } from "@/shared/components/ui/button";
import type { VacancyApplicationFormProps } from "../model/types";
import type { VacancyApplicationFormValues } from "../model/schema";
import { useVacancyApplicationRHF } from "../model/useVacancyApplicationRHF";

export const VacancyApplicationForm = ({
	vacancyId,
	vacancyTitle,
}: VacancyApplicationFormProps) => {
	const { form, onSubmit, submitError, submitSuccess } = useVacancyApplicationRHF({
		vacancyId,
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
				<h3 className="text-2xl font-semibold leading-tight">Отклик на «{vacancyTitle}»</h3>
				<p className="text-sm text-muted-foreground">
					Заполните форму, и мы вернемся с ответом как можно скорее.
				</p>
			</div>

			<div className="space-y-4">
				<label className="space-y-2 text-sm block">
					<span>Имя и фамилия *</span>
					<input
						{...register("fullName")}
						className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder="Иван Петров"
						required
					/>
					{errors.fullName && (
						<p className="text-xs text-destructive">{errors.fullName.message}</p>
					)}
				</label>

				<label className="space-y-2 text-sm block">
					<span>Email *</span>
					<input
						{...register("email")}
						type="email"
						className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder="name@example.com"
						required
					/>
					{errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
				</label>

				<label className="space-y-2 text-sm block">
					<span>Телефон *</span>
					<input
						{...register("phone")}
						type="tel"
						className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder="+7 900 000-00-00"
						required
					/>
					{errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
				</label>

				<label className="space-y-2 text-sm block">
					<span>Город</span>
					<input
						{...register("city")}
						className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder="Москва"
						autoComplete="address-level2"
					/>
					{errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
				</label>
			</div>

			<label className="space-y-2 text-sm block">
				<span>Сопроводительное письмо</span>
				<textarea
					{...register("coverLetter")}
					className="w-full min-h-36 rounded-md border border-input bg-background px-3 py-2 text-sm"
					placeholder="Почему вам интересна эта позиция?"
				/>
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>До 3000 символов</span>
					<span>{coverLetterValue.length}/3000</span>
				</div>
				{errors.coverLetter && (
					<p className="text-xs text-destructive">{errors.coverLetter.message}</p>
				)}
			</label>

			<label className="space-y-2 text-sm block">
				<span>Резюме (PDF/DOC/DOCX, до 10MB) *</span>
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
					Согласен(а) на обработку персональных данных для рассмотрения отклика *
				</span>
			</label>
			{errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}

			{submitError && <p className="text-sm text-destructive">{submitError}</p>}
			{submitSuccess && <p className="text-sm text-green-500">{submitSuccess}</p>}

			<Button type="submit" disabled={isSubmitting} className="w-full">
				{isSubmitting ? "Отправляем..." : "Отправить отклик"}
			</Button>
		</form>
	);
};
