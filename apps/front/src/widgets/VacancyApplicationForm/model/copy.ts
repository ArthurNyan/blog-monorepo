import type { SiteLocale } from "@/shared/i18n/config";

export type VacancyApplicationFormCopy = {
	title: (vacancyTitle: string) => string;
	description: string;
	fullNameLabel: string;
	fullNamePlaceholder: string;
	emailLabel: string;
	emailPlaceholder: string;
	phoneLabel: string;
	phonePlaceholder: string;
	cityLabel: string;
	cityPlaceholder: string;
	coverLetterLabel: string;
	coverLetterPlaceholder: string;
	coverLetterHint: string;
	resumeLabel: string;
	consentLabel: string;
	submitLabel: string;
	submittingLabel: string;
	successMessage: string;
	invalidPayloadMessage: string;
	defaultSubmitErrorMessage: string;
	vacancyIdRequiredMessage: string;
	fullNameRequired: string;
	fullNameTooShort: string;
	fullNameTooLong: string;
	emailRequired: string;
	emailInvalid: string;
	phoneRequired: string;
	cityTooShort: string;
	coverLetterTooLong: string;
	consentRequired: string;
	resumeRequired: string;
	resumeExtensionInvalid: string;
	resumeTooLarge: string;
};

const copy: Record<SiteLocale, VacancyApplicationFormCopy> = {
	ru: {
		title: (vacancyTitle) => `Отклик на «${vacancyTitle}»`,
		description:
			"Заполните форму, и мы вернемся с ответом как можно скорее.",
		fullNameLabel: "Имя и фамилия *",
		fullNamePlaceholder: "Иван Петров",
		emailLabel: "Email *",
		emailPlaceholder: "name@example.com",
		phoneLabel: "Телефон *",
		phonePlaceholder: "+7 900 000-00-00",
		cityLabel: "Город",
		cityPlaceholder: "Москва",
		coverLetterLabel: "Сопроводительное письмо",
		coverLetterPlaceholder: "Почему вам интересна эта позиция?",
		coverLetterHint: "До 3000 символов",
		resumeLabel: "Резюме (PDF/DOC/DOCX, до 10MB) *",
		consentLabel:
			"Согласен(а) на обработку персональных данных для рассмотрения отклика *",
		submitLabel: "Отправить отклик",
		submittingLabel: "Отправляем...",
		successMessage:
			"Отклик отправлен. Спасибо! Мы свяжемся с вами после рассмотрения.",
		invalidPayloadMessage:
			"Не удалось проверить данные формы. Проверьте поля и попробуйте снова.",
		defaultSubmitErrorMessage:
			"Не удалось отправить отклик. Попробуйте позже.",
		vacancyIdRequiredMessage: "Не удалось определить вакансию для отклика.",
		fullNameRequired: "Укажите имя и фамилию",
		fullNameTooShort: "Слишком короткое имя",
		fullNameTooLong: "Максимум 120 символов",
		emailRequired: "Укажите email",
		emailInvalid: "Неверный формат email",
		phoneRequired: "Укажите телефон",
		cityTooShort: "Уточните название города",
		coverLetterTooLong: "Максимум 3000 символов",
		consentRequired: "Нужно согласие на обработку персональных данных",
		resumeRequired: "Прикрепите резюме",
		resumeExtensionInvalid: "Допустимы только файлы PDF, DOC, DOCX",
		resumeTooLarge: "Файл не должен превышать 10MB",
	},
	en: {
		title: (vacancyTitle) => `Apply for "${vacancyTitle}"`,
		description:
			"Fill out the form and we will get back to you as soon as possible.",
		fullNameLabel: "Full name *",
		fullNamePlaceholder: "Jane Smith",
		emailLabel: "Email *",
		emailPlaceholder: "name@example.com",
		phoneLabel: "Phone *",
		phonePlaceholder: "+1 555 123 45 67",
		cityLabel: "City",
		cityPlaceholder: "London",
		coverLetterLabel: "Cover letter",
		coverLetterPlaceholder: "Why are you interested in this role?",
		coverLetterHint: "Up to 3000 characters",
		resumeLabel: "Resume (PDF/DOC/DOCX, up to 10MB) *",
		consentLabel:
			"I agree to the processing of personal data for the review of my application *",
		submitLabel: "Send application",
		submittingLabel: "Sending...",
		successMessage:
			"Your application has been sent. Thank you. We will contact you after review.",
		invalidPayloadMessage:
			"We could not validate the form data. Check the fields and try again.",
		defaultSubmitErrorMessage:
			"Unable to send the application. Please try again later.",
		vacancyIdRequiredMessage: "Unable to determine the vacancy for this application.",
		fullNameRequired: "Enter your full name",
		fullNameTooShort: "The name is too short",
		fullNameTooLong: "Maximum 120 characters",
		emailRequired: "Enter your email",
		emailInvalid: "Invalid email format",
		phoneRequired: "Enter your phone number",
		cityTooShort: "Specify the city name",
		coverLetterTooLong: "Maximum 3000 characters",
		consentRequired: "Consent to personal data processing is required",
		resumeRequired: "Attach your resume",
		resumeExtensionInvalid: "Only PDF, DOC, and DOCX files are allowed",
		resumeTooLarge: "The file must not exceed 10MB",
	},
};

export const getVacancyApplicationFormCopy = (
	locale: SiteLocale = "ru"
) => copy[locale];

