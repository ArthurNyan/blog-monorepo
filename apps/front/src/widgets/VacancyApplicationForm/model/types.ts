import type { SiteLocale } from "@/shared/i18n/config";

export interface VacancyApplicationFormProps {
	vacancyId: string | number;
	vacancyTitle: string;
	siteLocale: SiteLocale;
}
