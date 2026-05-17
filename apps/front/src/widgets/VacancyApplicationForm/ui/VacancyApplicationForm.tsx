import { type FormEvent, useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { submitVacancyApplication } from "@/shared/api/vacancies";

interface VacancyApplicationFormProps {
	vacancyId: string | number;
	vacancyTitle: string;
}

type FormState = {
	fullName: string;
	email: string;
	phone: string;
	city: string;
	coverLetter: string;
	consent: boolean;
	honeypot: string;
	resumeFile: File | null;
};

const initialState: FormState = {
	fullName: "",
	email: "",
	phone: "",
	city: "",
	coverLetter: "",
	consent: false,
	honeypot: "",
	resumeFile: null,
};

export const VacancyApplicationForm = ({
	vacancyId,
	vacancyTitle,
}: VacancyApplicationFormProps) => {
	const [state, setState] = useState<FormState>(initialState);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const validationMessage = useMemo(() => {
		if (!state.fullName.trim()) return "Укажите имя и фамилию";
		if (!state.email.trim()) return "Укажите email";
		if (!state.phone.trim()) return "Укажите телефон";
		if (!state.resumeFile) return "Прикрепите резюме";
		if (!state.consent) return "Нужно согласие на обработку персональных данных";
		return null;
	}, [state]);

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setSuccess(null);

		if (validationMessage || !state.resumeFile) {
			setError(validationMessage || "Проверьте заполнение формы");
			return;
		}
		if (state.honeypot.trim()) {
			setSuccess("Отклик отправлен. Спасибо! Мы свяжемся с вами после рассмотрения.");
			setState(initialState);
			return;
		}

		try {
			setIsSubmitting(true);
			await submitVacancyApplication({
				vacancyId,
				fullName: state.fullName.trim(),
				email: state.email.trim(),
				phone: state.phone.trim(),
				city: state.city.trim(),
				coverLetter: state.coverLetter.trim(),
				consent: state.consent,
				resumeFile: state.resumeFile,
				honeypot: state.honeypot,
			});

			setSuccess("Отклик отправлен. Спасибо! Мы свяжемся с вами после рассмотрения.");
			setState(initialState);
		} catch (submitError) {
			const message =
				submitError instanceof Error
					? submitError.message
					: "Не удалось отправить отклик. Попробуйте позже.";
			setError(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="space-y-5">
			<div className="space-y-1">
				<h3 className="text-2xl font-semibold">Отклик на «{vacancyTitle}»</h3>
				<p className="text-sm text-muted-foreground">
					Заполните форму, и мы вернемся с ответом как можно скорее.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<label className="space-y-2 text-sm">
					<span>Имя и фамилия *</span>
					<input
						value={state.fullName}
						onChange={(event) =>
							setState((prev) => ({ ...prev, fullName: event.target.value }))
						}
						className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder="Иван Петров"
						required
					/>
				</label>
				<label className="space-y-2 text-sm">
					<span>Email *</span>
					<input
						type="email"
						value={state.email}
						onChange={(event) =>
							setState((prev) => ({ ...prev, email: event.target.value }))
						}
						className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder="name@example.com"
						required
					/>
				</label>
				<label className="space-y-2 text-sm">
					<span>Телефон *</span>
					<input
						type="tel"
						value={state.phone}
						onChange={(event) =>
							setState((prev) => ({ ...prev, phone: event.target.value }))
						}
						className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder="+7 900 000-00-00"
						required
					/>
				</label>
				<label className="space-y-2 text-sm">
					<span>Город</span>
					<input
						value={state.city}
						onChange={(event) =>
							setState((prev) => ({ ...prev, city: event.target.value }))
						}
						className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						placeholder="Москва"
					/>
				</label>
			</div>

			<label className="space-y-2 text-sm block">
				<span>Сопроводительное письмо</span>
				<textarea
					value={state.coverLetter}
					onChange={(event) =>
						setState((prev) => ({ ...prev, coverLetter: event.target.value }))
					}
					className="w-full min-h-28 rounded-md border border-input bg-background px-3 py-2 text-sm"
					placeholder="Почему вам интересна эта позиция?"
				/>
			</label>

			<label className="space-y-2 text-sm block">
				<span>Резюме (PDF/DOC) *</span>
				<input
					type="file"
					accept=".pdf,.doc,.docx,.rtf,.txt"
					onChange={(event) =>
						setState((prev) => ({
							...prev,
							resumeFile: event.target.files?.[0] || null,
						}))
					}
					className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-primary file:cursor-pointer hover:file:bg-primary/20"
					required
				/>
			</label>

			<input
				type="text"
				tabIndex={-1}
				autoComplete="off"
				value={state.honeypot}
				onChange={(event) =>
					setState((prev) => ({ ...prev, honeypot: event.target.value }))
				}
				className="hidden"
				aria-hidden="true"
			/>

			<label className="flex items-start gap-2 text-sm">
				<input
					type="checkbox"
					checked={state.consent}
					onChange={(event) =>
						setState((prev) => ({ ...prev, consent: event.target.checked }))
					}
					className="mt-1"
					required
				/>
				<span>
					Согласен(а) на обработку персональных данных для рассмотрения отклика *
				</span>
			</label>

			{error && <p className="text-sm text-destructive">{error}</p>}
			{success && <p className="text-sm text-green-500">{success}</p>}

			<Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
				{isSubmitting ? "Отправляем..." : "Отправить отклик"}
			</Button>
		</form>
	);
};
