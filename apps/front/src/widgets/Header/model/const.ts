import {
	buildLocalizedCollectionPath,
	buildLocalizedPath,
	type SiteLocale,
} from "@/shared/i18n/config";
import type { NavigationItem } from './types';

/**
 * Дефолтные данные навигации для примера
 * В продакшене будут заменены данными из Strapi
 */
export const getDefaultNavigation = (
	locale: SiteLocale = "ru"
): NavigationItem[] => [
	{
		label: locale === "ru" ? "Статьи" : "Articles",
		href: buildLocalizedCollectionPath(locale, "articles"),
	},
	{
		label: locale === "ru" ? "Проекты" : "Projects",
		href: buildLocalizedCollectionPath(locale, "projects"),
	},
	{
		label: locale === "ru" ? "Вакансии" : "Vacancies",
		href: buildLocalizedCollectionPath(locale, "vacancies"),
	},
];

export const DEFAULT_NAVIGATION: NavigationItem[] = getDefaultNavigation();

export const getDefaultBrand = (locale: SiteLocale = "ru") => ({
	title: 'Ruixen',
	href: buildLocalizedPath(locale),
});

export const DEFAULT_BRAND = {
	title: 'Ruixen',
	href: buildLocalizedPath("ru"),
};

export const DEFAULT_PRIMARY_ACTION = {
	title: 'Get Started',
	href: '#',
};

export const DEFAULT_SECONDARY_ACTION = {
	title: 'Sign In',
	href: '#',
};
