/* eslint-disable no-console */
const { createStrapi } = require("@strapi/strapi");
const path = require("node:path");

const APP_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(APP_DIR, "dist");
const PREFERRED_LOCALES = ["en", "ru-RU"];

const articleSeed = {
	"ru-RU": {
		name: "Neea LLC",
		slug: "neea-llc",
		description:
			"Разбор CMS-first витрины для корпоративного сайта с локалями ru/en, preview и редакторским контуром публикации.",
		date: "2026-05-20",
		content:
			"Проект показывает, как единый Strapi-слой управляет маркетинговыми страницами, статьями и SEO-полями без разъезда между редакторской и frontend-структурой.\n\n- locale-prefixed маршруты `/ru/` и `/en/`\n- server-side preview для draft-контента\n- versioned seed для воспроизводимого testing baseline",
		seo: {
			metaTitle: "Neea LLC: CMS-first витрина",
			metaDescription:
				"Representative article detail route для baseline тестирования и демонстрации локализованного контентного контура.",
			ogTitle: "Neea LLC: CMS-first витрина",
			ogDescription:
				"Статья подтверждает, что detail-контент для articles теперь воспроизводится и для ru, и для en.",
			noIndex: false,
		},
	},
	en: {
		name: "Neea LLC",
		slug: "neea-llc",
		description:
			"A representative CMS-first storefront article used to validate ru/en detail coverage, preview, and SEO delivery.",
		date: "2026-05-20",
		content:
			"This article exists to keep the diploma testing baseline reproducible across both locales.\n\n- locale-prefixed public detail routes\n- server-side preview for drafts\n- versioned content seed used by build, smoke, and sitemap checks",
		seo: {
			metaTitle: "Neea LLC: CMS-first storefront",
			metaDescription:
				"Representative article detail route for the bilingual testing baseline.",
			ogTitle: "Neea LLC: CMS-first storefront",
			ogDescription:
				"The article confirms that article detail coverage now exists for both ru and en locales.",
			noIndex: false,
		},
	},
};

const projectSeed = {
	"ru-RU": {
		name: "Корпоративный лендинг с headless CMS",
		slug: "project",
		description:
			"Representative project detail, закрепляющий locale-aware маршрут `/ru/projects/project/` и versioned build baseline.",
		date: "2026-05-21",
		content:
			"Проектная карточка нужна для того, чтобы `projects` имели воспроизводимый detail-базис не только в русской, но и в английской локали.\n\n- sitemap включает locale-prefixed detail routes\n- preview flow проверяется на том же slug\n- SEO-данные приходят из CMS, а не из хардкода route-файла",
		seo: {
			metaTitle: "Корпоративный лендинг с headless CMS",
			metaDescription:
				"Representative project detail route для локализованного testing baseline.",
			ogTitle: "Корпоративный лендинг с headless CMS",
			ogDescription:
				"Проект подтверждает locale-aware публичный и preview-контур для `projects`.",
			noIndex: false,
		},
	},
	en: {
		name: "Corporate storefront with headless CMS",
		slug: "project",
		description:
			"Representative project detail used to confirm locale-aware `/en/projects/project/` coverage in the baseline build.",
		date: "2026-05-21",
		content:
			"This project entry keeps the bilingual `projects` contour reproducible.\n\n- the sitemap includes locale-prefixed detail routes\n- the same slug is used for runtime, preview, and build evidence\n- CMS-managed SEO stays attached to the project record",
		seo: {
			metaTitle: "Corporate storefront with headless CMS",
			metaDescription:
				"Representative project detail route for the bilingual testing baseline.",
			ogTitle: "Corporate storefront with headless CMS",
			ogDescription:
				"The project confirms locale-aware public and preview coverage for `projects`.",
			noIndex: false,
		},
	},
};

const getMediaFileId = async (strapi, candidates) => {
	for (const name of candidates) {
		const file = await strapi.db.query("plugin::upload.file").findOne({
			where: { name },
		});

		if (file?.id) {
			return file.id;
		}
	}

	return null;
};

const requireMediaFileId = async (strapi, candidates, label) => {
	const fileId = await getMediaFileId(strapi, candidates);

	if (fileId) {
		return fileId;
	}

	throw new Error(
		`Could not find uploaded media for ${label}. Expected one of: ${candidates.join(", ")}`
	);
};

const ensurePublishedDocument = async (strapi, uid, locale, slug, data) => {
	const service = strapi.documents(uid);
	const existing = await service.findMany({
		filters: { slug: { $eq: slug } },
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

	return service.findOne({
		documentId,
		locale,
		status: "published",
	});
};

const run = async () => {
	const strapi = createStrapi({
		appDir: APP_DIR,
		distDir: DIST_DIR,
	});

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

		const articleCoverId = await requireMediaFileId(
			strapi,
			["Xnip2026-02-01_17-33-16.jpg", "favicon.svg", "cms-first-demo-logo.svg"],
			"article cover"
		);
		const projectCoverId = await requireMediaFileId(
			strapi,
			[
				"Xnip2026-01-12_18-51-06.jpg",
				"Xnip2026-02-01_21-58-59.jpg",
				"favicon.svg",
				"cms-first-demo-logo.svg",
			],
			"project cover"
		);
		const projectLogoId = await requireMediaFileId(
			strapi,
			["cms-first-demo-logo.svg", "favicon.svg"],
			"project logo"
		);

		for (const locale of localesToSeed) {
			console.log(`Seeding content locale: ${locale}`);

			await ensurePublishedDocument(
				strapi,
				"api::article.article",
				locale,
				articleSeed[locale].slug,
				{
					...articleSeed[locale],
					cover: articleCoverId,
				}
			);

			await ensurePublishedDocument(
				strapi,
				"api::project.project",
				locale,
				projectSeed[locale].slug,
				{
					...projectSeed[locale],
					cover: projectCoverId,
					logo: projectLogoId,
				}
			);
		}

		console.log(
			`Content seed complete for locales: ${localesToSeed.join(", ")}`
		);
	} finally {
		await strapi.destroy();
	}
};

run().catch((error) => {
	console.error("Content seed failed:", error);
	process.exit(1);
});
