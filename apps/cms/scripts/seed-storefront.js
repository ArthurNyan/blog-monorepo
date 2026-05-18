/* eslint-disable no-console */
const { createStrapi } = require("@strapi/strapi");
const path = require("node:path");

const APP_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(APP_DIR, "dist");
const PREFERRED_LOCALES = ["en", "ru-RU"];

const localizedPath = (locale, slug = "") => {
	const prefix = locale === "ru-RU" ? "ru" : "en";
	return slug ? `/${prefix}/${slug}/` : `/${prefix}/`;
};

const globalSeed = {
	"ru-RU": {
		companyName: "Andruia CMS Studio",
		description:
			"CMS-first витрина для корпоративных сайтов: маркетинговые страницы, статьи, кейсы и редакторский контур публикации в одном Strapi-ядре.",
		footerCopyright:
			"Минимальный двуязычный контур для дипломной демонстрации.",
		navigationItems: [
			{
				label: "Главная",
				href: localizedPath("ru-RU"),
			},
			{
				label: "CMS-страницы",
				featured: {
					label: "CMS-first платформа",
					href: localizedPath("ru-RU", "cms-first-platform"),
					description:
						"Демонстрационная страница, целиком собранная из Strapi Dynamic Zone.",
				},
				items: [
					{
						label: "Главный демо-маршрут",
						href: localizedPath("ru-RU", "cms-first-platform"),
						description: "Основной пример CMS-first страницы для диплома.",
					},
					{
						label: "Альтернативный демо-сценарий",
						href: localizedPath("ru-RU", "cms-first-demo"),
						description: "Вторая локализованная CMS-страница с тем же renderer-контуром.",
					},
				],
			},
			{
				label: "Статьи",
				href: "/articles",
			},
			{
				label: "Проекты",
				href: "/projects",
			},
			{
				label: "Вакансии",
				href: "/vacancies",
			},
		],
		headerPrimaryCta: {
			label: "Открыть демо",
			href: localizedPath("ru-RU", "cms-first-platform"),
			description: "Перейти к демонстрационной CMS-странице.",
		},
		headerSecondaryCta: {
			label: "К статьям",
			href: "/articles",
			description: "Открыть контентный раздел на текущей витрине.",
		},
		footerColumns: [
			{
				heading: "Витрина",
				links: [
					{ label: "Главная", href: localizedPath("ru-RU") },
					{ label: "CMS-first платформа", href: localizedPath("ru-RU", "cms-first-platform") },
					{ label: "Демо-страница", href: localizedPath("ru-RU", "cms-first-demo") },
				],
			},
			{
				heading: "Контент",
				links: [
					{ label: "Статьи", href: "/articles" },
					{ label: "Проекты", href: "/projects" },
					{ label: "Вакансии", href: "/vacancies" },
				],
			},
			{
				heading: "Архитектура",
				links: [
					{ label: "Dynamic Zone", href: localizedPath("ru-RU", "cms-first-platform") },
					{ label: "Локали ru/en", href: localizedPath("ru-RU") },
					{ label: "CMS-first контур", href: localizedPath("ru-RU", "cms-first-demo") },
				],
			},
		],
	},
	en: {
		companyName: "Andruia CMS Studio",
		description:
			"A CMS-first storefront for corporate websites: marketing pages, articles, case studies, and an editorial publishing flow powered by a single Strapi core.",
		footerCopyright:
			"Minimal bilingual contour for the diploma demo.",
		navigationItems: [
			{
				label: "Home",
				href: localizedPath("en"),
			},
			{
				label: "CMS pages",
				featured: {
					label: "CMS-first platform",
					href: localizedPath("en", "cms-first-platform"),
					description:
						"A demo page assembled entirely from Strapi Dynamic Zone blocks.",
				},
				items: [
					{
						label: "Primary demo route",
						href: localizedPath("en", "cms-first-platform"),
						description: "The main CMS-first page used in the diploma scenario.",
					},
					{
						label: "Alternative demo scenario",
						href: localizedPath("en", "cms-first-demo"),
						description: "A second localized CMS page rendered by the same contour.",
					},
				],
			},
			{
				label: "Articles",
				href: "/articles",
			},
			{
				label: "Projects",
				href: "/projects",
			},
			{
				label: "Vacancies",
				href: "/vacancies",
			},
		],
		headerPrimaryCta: {
			label: "Open demo",
			href: localizedPath("en", "cms-first-platform"),
			description: "Jump to the primary CMS-driven page.",
		},
		headerSecondaryCta: {
			label: "Read articles",
			href: "/articles",
			description: "Open the content section on the storefront.",
		},
		footerColumns: [
			{
				heading: "Storefront",
				links: [
					{ label: "Home", href: localizedPath("en") },
					{ label: "CMS-first platform", href: localizedPath("en", "cms-first-platform") },
					{ label: "Demo page", href: localizedPath("en", "cms-first-demo") },
				],
			},
			{
				heading: "Content",
				links: [
					{ label: "Articles", href: "/articles" },
					{ label: "Projects", href: "/projects" },
					{ label: "Vacancies", href: "/vacancies" },
				],
			},
			{
				heading: "Architecture",
				links: [
					{ label: "Dynamic Zone", href: localizedPath("en", "cms-first-platform") },
					{ label: "ru/en locales", href: localizedPath("en") },
					{ label: "CMS-first contour", href: localizedPath("en", "cms-first-demo") },
				],
			},
		],
	},
};

const homePageSeed = {
	"ru-RU": {
		Title: "CMS-first корпоративная витрина",
		description:
			"Главная страница, где ключевые тексты, блоки и SEO управляются через Strapi.",
		seo: {
			metaTitle: "CMS-first корпоративная витрина",
			metaDescription:
				"Главная страница Astro, собранная из Strapi-блоков и локализованная для дипломного контура ru/en.",
			ogTitle: "CMS-first корпоративная витрина",
			ogDescription:
				"Минимальный демонстрируемый контур: global, home-page, pages и locale-prefixed маршруты.",
			noIndex: true,
		},
		blocks: [
			{
				__component: "blocks.hero",
				eyebrow: "Strapi + Astro + ru/en",
				title: "Главная витрина теперь управляется из CMS",
				description:
					"В первой очереди в Strapi вынесены ключевые тексты шапки, футера и главной, а Astro публикует locale-prefixed маршруты `/ru/` и `/en/`.",
				primaryButtonLabel: "Открыть CMS-first страницу",
				primaryButtonUrl: localizedPath("ru-RU", "cms-first-platform"),
				secondaryButtonLabel: "Смотреть вакансии",
				secondaryButtonUrl: "/vacancies",
			},
			{
				__component: "blocks.logo-cloud",
				heading: "Контур собирается вокруг существующего frontend и Strapi",
				description:
					"Для логотипов используются text-first элементы и fallback-ассеты, чтобы сид оставался воспроизводимым.",
				items: [{ name: "Astro" }, { name: "Strapi" }, { name: "Nx" }, { name: "OpenAPI" }],
			},
			{
				__component: "blocks.feature-cards",
				eyebrow: "Что уже вынесено",
				heading: "Минимальный CMS-first контур уже работает",
				description:
					"Главная, навигация и футер больше не зависят только от локальных констант frontend.",
				items: [
					{
						title: "Global texts",
						description: "Навигация, CTA и футер приходят из single type `global`.",
						icon: "globe",
					},
					{
						title: "Home page blocks",
						description: "Главная страница собирается из `home-page.blocks` через общий renderer.",
						icon: "layout-template",
					},
					{
						title: "Locale-prefixed routes",
						description: "Публичная витрина показывает отдельные `/ru/` и `/en/` маршруты.",
						icon: "search",
					},
				],
			},
			{
				__component: "blocks.stats",
				heading: "Что подтверждено кодом",
				description:
					"Это не маркетинговые цифры, а компактная форма инженерных фактов о текущем контуре.",
				items: [
					{ value: "2", label: "Локали", description: "Публично доступны `ru` и `en` для главной и `pages`." },
					{ value: "3", label: "Single / collections", description: "`global`, `home-page` и `page` работают в одном delivery flow." },
					{ value: "1", label: "Layout source", description: "Шапка и футер получают данные из CMS через единый frontend data-layer." },
					{ value: "3", label: "Preview lists", description: "Главная может показывать статьи, проекты и вакансии как CMS-driven анонсы." },
				],
			},
			{
				__component: "blocks.preview-list",
				heading: "Открытые вакансии",
				description: "После восстановления seed этот блок снова показывает живые анонсы из `vacancies`.",
				source: "vacancies",
				limit: 3,
				ctaLabel: "Все вакансии",
				ctaUrl: "/vacancies",
			},
			{
				__component: "blocks.preview-list",
				heading: "Материалы и кейсы",
				description: "Часть контентных разделов уже существует и может выступать источником витринных анонсов.",
				source: "articles",
				limit: 3,
				ctaLabel: "К статьям",
				ctaUrl: "/articles",
			},
			{
				__component: "blocks.cta",
				title: "Следующий слой после восстановления данных",
				description:
					"Расширить ту же locale-схему на articles и projects, затем довести `preview mode`, `sitemap` и `webhook -> rebuild`.",
				primaryButtonLabel: "Открыть демо",
				primaryButtonUrl: localizedPath("ru-RU", "cms-first-demo"),
				secondaryButtonLabel: "Смотреть проекты",
				secondaryButtonUrl: "/projects",
			},
		],
	},
	en: {
		Title: "CMS-first corporate storefront",
		description:
			"A homepage where key texts, blocks, and SEO are managed through Strapi.",
		seo: {
			metaTitle: "CMS-first corporate storefront",
			metaDescription:
				"An Astro homepage assembled from Strapi blocks and localized for the diploma ru/en contour.",
			ogTitle: "CMS-first corporate storefront",
			ogDescription:
				"A minimal demonstrable contour: global, home-page, pages, and locale-prefixed routes.",
			noIndex: true,
		},
		blocks: [
			{
				__component: "blocks.hero",
				eyebrow: "Strapi + Astro + ru/en",
				title: "The homepage is now managed from CMS",
				description:
					"The first queue moves the core header, footer, and homepage texts into Strapi, while Astro publishes locale-prefixed `/ru/` and `/en/` routes.",
				primaryButtonLabel: "Open the CMS-first page",
				primaryButtonUrl: localizedPath("en", "cms-first-platform"),
				secondaryButtonLabel: "View vacancies",
				secondaryButtonUrl: "/vacancies",
			},
			{
				__component: "blocks.logo-cloud",
				heading: "The contour is built around the existing frontend and Strapi",
				description:
					"The logo block stays reproducible by relying on text-first items and frontend fallbacks.",
				items: [{ name: "Astro" }, { name: "Strapi" }, { name: "Nx" }, { name: "OpenAPI" }],
			},
			{
				__component: "blocks.feature-cards",
				eyebrow: "What has already moved",
				heading: "A minimal CMS-first contour is already working",
				description:
					"The homepage, navigation, and footer no longer depend only on frontend constants.",
				items: [
					{
						title: "Global texts",
						description: "Navigation, CTA, and footer are delivered from the `global` single type.",
						icon: "globe",
					},
					{
						title: "Home page blocks",
						description: "The homepage is rendered from `home-page.blocks` through the shared renderer.",
						icon: "layout-template",
					},
					{
						title: "Locale-prefixed routes",
						description: "The storefront now exposes dedicated `/ru/` and `/en/` public routes.",
						icon: "search",
					},
				],
			},
			{
				__component: "blocks.stats",
				heading: "What the code already confirms",
				description:
					"These are engineering facts about the contour, not decorative marketing numbers.",
				items: [
					{ value: "2", label: "Locales", description: "`ru` and `en` are publicly exposed for the homepage and `pages`." },
					{ value: "3", label: "Single / collections", description: "`global`, `home-page`, and `page` operate in one delivery flow." },
					{ value: "1", label: "Layout source", description: "Header and footer receive data from CMS through one frontend data-layer." },
					{ value: "3", label: "Preview lists", description: "The homepage can preview articles, projects, and vacancies as CMS-driven sections." },
				],
			},
			{
				__component: "blocks.preview-list",
				heading: "Open vacancies",
				description: "Once the seed is restored, this block again shows live previews from `vacancies`.",
				source: "vacancies",
				limit: 3,
				ctaLabel: "All vacancies",
				ctaUrl: "/vacancies",
			},
			{
				__component: "blocks.preview-list",
				heading: "Materials and case studies",
				description: "Some content sections already exist and can feed the storefront as preview sources.",
				source: "articles",
				limit: 3,
				ctaLabel: "Read articles",
				ctaUrl: "/articles",
			},
			{
				__component: "blocks.cta",
				title: "The next layer after data recovery",
				description:
					"Extend the same locale scheme to articles and projects, then finish `preview mode`, `sitemap`, and `webhook -> rebuild`.",
				primaryButtonLabel: "Open the demo",
				primaryButtonUrl: localizedPath("en", "cms-first-demo"),
				secondaryButtonLabel: "Explore projects",
				secondaryButtonUrl: "/projects",
			},
		],
	},
};

const getLogoFileId = async (strapi) => {
	const candidates = ["cms-first-demo-logo.svg", "favicon.svg"];

	for (const name of candidates) {
		const file = await strapi.db.query("plugin::upload.file").findOne({
			where: { name },
		});

		if (file?.id) {
			return file.id;
		}
	}

	const fallback = await strapi.db.query("plugin::upload.file").findOne({
		where: { mime: { $contains: "image/" } },
		orderBy: { id: "asc" },
	});

	if (fallback?.id) {
		return fallback.id;
	}

	throw new Error(
		"Could not find an uploaded image for global.logo. Upload at least one image or SVG to Strapi media library first."
	);
};

const ensurePublishedSingleton = async (strapi, uid, locale, data) => {
	const service = strapi.documents(uid);
	const existing = await service.findMany({
		locale,
		limit: 1,
	});

	let documentId;
	if (existing[0]) {
		documentId = existing[0].documentId;
		await service.update({
			documentId,
			locale,
			data,
		});
	} else {
		const created = await service.create({
			locale,
			data,
		});
		documentId = created.documentId;
	}

	try {
		await service.publish({
			documentId,
			locale,
		});
	} catch {
		// already published
	}
};

const run = async () => {
	const strapi = createStrapi({
		appDir: APP_DIR,
		distDir: DIST_DIR,
	});
	global.strapi = strapi;

	try {
		await strapi.load();
		const locales = await strapi.documents("plugin::i18n.locale").findMany({
			limit: 50,
		});
		const availableLocaleCodes = locales.map((locale) => locale.code);
		const localesToSeed = PREFERRED_LOCALES.filter((locale) =>
			availableLocaleCodes.includes(locale)
		);

		if (localesToSeed.length === 0) {
			throw new Error(
				`No supported locales found. Available locales: ${availableLocaleCodes.join(", ")}`
			);
		}

		const logoId = await getLogoFileId(strapi);

		for (const locale of localesToSeed) {
			console.log(`Seeding storefront locale: ${locale}`);
			await ensurePublishedSingleton(strapi, "api::global.global", locale, {
				...globalSeed[locale],
				logo: logoId,
			});
			await ensurePublishedSingleton(
				strapi,
				"api::home-page.home-page",
				locale,
				homePageSeed[locale]
			);
		}

		console.log(
			`Storefront seed complete for locales: ${localesToSeed.join(", ")}`
		);
		process.exit(0);
	} catch (error) {
		console.error("Storefront seed failed:", error);
		process.exit(1);
	}
};
run();
