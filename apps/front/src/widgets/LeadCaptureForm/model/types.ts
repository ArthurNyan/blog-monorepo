import type { SiteLocale } from "@/shared/i18n/config";

export interface LeadCaptureFormProps {
	formName: string;
	pagePath: string;
	pageTitle?: string;
	siteLocale: SiteLocale;
	submitLabel?: string;
	successMessage?: string;
	consentLabel?: string;
}
