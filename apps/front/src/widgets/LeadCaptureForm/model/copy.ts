import type { SiteLocale } from "@/shared/i18n/config";

export type LeadFormCopy = {
	title: string;
	description: string;
	fullNameLabel: string;
	fullNamePlaceholder: string;
	emailLabel: string;
	emailPlaceholder: string;
	phoneLabel: string;
	phonePlaceholder: string;
	companyLabel: string;
	companyPlaceholder: string;
	messageLabel: string;
	messagePlaceholder: string;
	messageHint: string;
	consentLabel: string;
	submitLabel: string;
	submittingLabel: string;
	defaultSuccessMessage: string;
	invalidPayloadMessage: string;
	defaultSubmitErrorMessage: string;
	fullNameRequired: string;
	fullNameTooShort: string;
	fullNameTooLong: string;
	emailRequired: string;
	emailInvalid: string;
	phoneInvalid: string;
	phoneTooLong: string;
	companyTooShort: string;
	companyTooLong: string;
	messageRequired: string;
	messageTooShort: string;
	messageTooLong: string;
	consentRequired: string;
};

const copy: Record<SiteLocale, LeadFormCopy> = {
	ru: {
		title: "Оставьте заявку",
		description: "Опишите задачу, и мы свяжемся с вами для следующего шага.",
		fullNameLabel: "Имя и фамилия *",
		fullNamePlaceholder: "Иван Петров",
		emailLabel: "Email *",
		emailPlaceholder: "name@example.com",
		phoneLabel: "Телефон",
		phonePlaceholder: "+7 900 000-00-00",
		companyLabel: "Компания",
		companyPlaceholder: "Acme LLC",
		messageLabel: "Расскажите о задаче *",
		messagePlaceholder: "Какая услуга или сценарий вас интересует?",
		messageHint: "От 10 до 2500 символов",
		consentLabel:
			"Согласен(а) на обработку персональных данных для обратной связи *",
		submitLabel: "Отправить заявку",
		submittingLabel: "Отправляем...",
		defaultSuccessMessage:
			"Заявка отправлена. Мы свяжемся с вами после первичной проверки.",
		invalidPayloadMessage: "Проверьте поля формы и попробуйте снова.",
		defaultSubmitErrorMessage:
			"Не удалось отправить заявку. Попробуйте позже.",
		fullNameRequired: "Укажите имя и фамилию",
		fullNameTooShort: "Слишком короткое имя",
		fullNameTooLong: "Максимум 120 символов",
		emailRequired: "Укажите email",
		emailInvalid: "Неверный формат email",
		phoneInvalid: "Укажите корректный телефон",
		phoneTooLong: "Максимум 40 символов",
		companyTooShort: "Уточните название компании",
		companyTooLong: "Максимум 120 символов",
		messageRequired: "Опишите задачу",
		messageTooShort: "Добавьте больше деталей",
		messageTooLong: "Максимум 2500 символов",
		consentRequired: "Нужно согласие на обработку персональных данных",
	},
	en: {
		title: "Leave a request",
		description: "Describe your task and we will get back to you with the next step.",
		fullNameLabel: "Full name *",
		fullNamePlaceholder: "Jane Smith",
		emailLabel: "Email *",
		emailPlaceholder: "name@example.com",
		phoneLabel: "Phone",
		phonePlaceholder: "+1 555 123 45 67",
		companyLabel: "Company",
		companyPlaceholder: "Acme LLC",
		messageLabel: "Tell us about your task *",
		messagePlaceholder: "What service or scenario are you interested in?",
		messageHint: "From 10 to 2500 characters",
		consentLabel:
			"I agree to the processing of personal data for follow-up communication *",
		submitLabel: "Send request",
		submittingLabel: "Sending...",
		defaultSuccessMessage:
			"Your request has been sent. We will get back to you after the initial review.",
		invalidPayloadMessage: "Check the form fields and try again.",
		defaultSubmitErrorMessage: "Unable to send the request. Please try again later.",
		fullNameRequired: "Enter your full name",
		fullNameTooShort: "The name is too short",
		fullNameTooLong: "Maximum 120 characters",
		emailRequired: "Enter your email",
		emailInvalid: "Invalid email format",
		phoneInvalid: "Enter a valid phone number",
		phoneTooLong: "Maximum 40 characters",
		companyTooShort: "Specify the company name",
		companyTooLong: "Maximum 120 characters",
		messageRequired: "Describe your task",
		messageTooShort: "Add a bit more detail",
		messageTooLong: "Maximum 2500 characters",
		consentRequired: "Consent to personal data processing is required",
	},
};

export const getLeadFormCopy = (locale: SiteLocale = "ru") => copy[locale];
