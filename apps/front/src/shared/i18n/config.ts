export const siteLocales = ["ru", "en"] as const;

export type SiteLocale = (typeof siteLocales)[number];
export const localizedCollectionRoutes = ["articles", "projects", "vacancies"] as const;
export type LocalizedCollectionRoute =
	(typeof localizedCollectionRoutes)[number];

export const defaultSiteLocale: SiteLocale = "ru";

const cmsLocaleMap: Record<SiteLocale, string> = {
	ru: "ru-RU",
	en: "en",
};

export const isSiteLocale = (value: string | undefined): value is SiteLocale =>
	Boolean(value && siteLocales.includes(value as SiteLocale));

export const toSiteLocale = (value?: string | null): SiteLocale => {
	if (value === "en") return "en";
	return "ru";
};

export const toCmsLocale = (locale: SiteLocale = defaultSiteLocale) =>
	cmsLocaleMap[locale];

export const toHtmlLang = (value?: string | null) =>
	toSiteLocale(value);

export const buildLocalizedPath = (
	locale: SiteLocale = defaultSiteLocale,
	path = ""
) => {
	const normalizedPath = path.replace(/^\/+|\/+$/g, "");

	if (!normalizedPath) {
		return `/${locale}/`;
	}

	return `/${locale}/${normalizedPath}/`;
};

export const buildLocalizedCollectionPath = (
	locale: SiteLocale = defaultSiteLocale,
	collection: LocalizedCollectionRoute,
	slug = ""
) => {
	const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");
	const path = normalizedSlug
		? `${collection}/${normalizedSlug}`
		: collection;

	return buildLocalizedPath(locale, path);
};
