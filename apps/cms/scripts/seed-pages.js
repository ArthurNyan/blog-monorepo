/* eslint-disable no-console */
const { createStrapi } = require("@strapi/strapi");
const path = require("node:path");

const APP_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(APP_DIR, "dist");
const PREFERRED_LOCALES = ["en", "ru-RU"];

const pagesSeed = {
	"ru-RU": {
		title: "CMS-first маркетинговая платформа",
		slug: "cms-first-platform",
		seo: {
			metaTitle: "CMS-first маркетинговая платформа",
			metaDescription:
				"Демонстрационная страница из Strapi Dynamic Zone для дипломного проекта.",
			ogTitle: "CMS-first маркетинговая платформа",
			ogDescription:
				"Страница собирается из блоков Strapi и рендерится на Astro без хардкода структуры.",
			noIndex: true,
		},
		blocks: [
			{
				__component: "blocks.hero",
				eyebrow: "Дипломный демо-сценарий",
				title: "Маркетинговая страница собирается из CMS-блоков",
				description:
					"Структура страницы задается в Strapi через Dynamic Zone, а Astro рендерит блоки без ручной раскладки секций в route-файле.",
				primaryButtonLabel: "Открыть вакансии",
				primaryButtonUrl: "/vacancies",
				secondaryButtonLabel: "Смотреть статьи",
				secondaryButtonUrl: "/articles",
			},
			{
				__component: "blocks.logo-cloud",
				heading: "Интерфейсные и CMS-паттерны, на которые опирается проект",
				description:
					"Для демонстрации блок использует frontend-ассеты, пока media seed не подключен к Strapi.",
				items: [
					{ name: "OpenAI" },
					{ name: "Vercel" },
					{ name: "GitHub" },
				],
			},
			{
				__component: "blocks.feature-cards",
				eyebrow: "Первая очередь",
				heading: "Что уже покрывает CMS-модель",
				description:
					"Минимальный, но академически сильный набор блоков для демонстрации CMS-first подхода в дипломе.",
				items: [
					{
						title: "Страницы по slug",
						description:
							"Редактор создает самостоятельные маркетинговые страницы без участия разработчика.",
						icon: "file-text",
					},
					{
						title: "Dynamic Zone",
						description:
							"Порядок и состав секций задаются контентной моделью, а не Astro-шаблоном.",
						icon: "layout-template",
					},
					{
						title: "SEO и Open Graph",
						description:
							"Метаинформация хранится рядом со страницей и доступна frontend-слою при сборке.",
						icon: "search",
					},
				],
			},
			{
				__component: "blocks.rich-text",
				heading: "Зачем нужен отдельный маршрут pages",
				body:
					"Страница `pages` нужна для того, чтобы **маркетинговый контент** собирался в CMS как самостоятельная сущность, а не оставался набором жестко заданных Astro-страниц.\n\nВ этой реализации **Astro route не задает структуру страницы вручную**. Он получает массив `blocks` из Strapi и последовательно рендерит их через единый `DynamicZoneRenderer`.\n\nПервая очередь уже перевела главную, шапку и футер в CMS-контур, но полная locale-prefixed схема пока не доведена для всех публичных разделов.",
			},
			{
				__component: "blocks.quote",
				quote:
					"Для диплома важно не просто хранить контент в CMS, а доказать, что сама структура маркетинговой страницы стала редакторски управляемой.",
				authorName: "Проектная позиция",
				authorRole: "CMS-first аргументация",
				sourceLabel: "Architecture note",
			},
			{
				__component: "blocks.feature-highlight",
				eyebrow: "UI-адаптация",
				title: "Один block type можно связать с готовыми sourced-компонентами",
				description:
					"Для первой очереди мы не рисуем секции с нуля, а адаптируем уже существующие компоненты и registry-based решения под CMS-схему.",
				items: [
					{
						title: "Feature tabs",
						description:
							"Блок использует существующий tabbed layout и наполняется из CMS items без ручной раскладки в Astro.",
						icon: "layout-template",
					},
					{
						title: "Bento features",
						description:
							"Карточки преимуществ рендерятся на базе уже существующей сетки и card-компонентов.",
						icon: "file-text",
					},
					{
						title: "Registry FAQ",
						description:
							"FAQ подключен из ruixen registry и обернут в CMS-driven renderer.",
						icon: "search",
					},
				],
				ctaLabel: "Изучить проекты",
				ctaUrl: "/projects",
			},
			{
				__component: "blocks.checklist",
				heading: "Что уже делает контур pages полезным",
				description:
					"Это не финальный production-контур, но уже реальная связка CMS-модели и frontend-рендеринга.",
				items: [
					{
						title: "Страница создается как самостоятельная сущность",
						description:
							"Редактор управляет page-level полями и блоками, а не только отдельными текстовыми полями.",
					},
					{
						title: "Маршрут строится по slug",
						description:
							"Astro генерирует отдельный статический route для CMS-страницы без ручного описания структуры.",
					},
					{
						title: "SEO идет рядом со страницей",
						description:
							"Meta title, description и Open Graph загружаются из той же CMS-записи.",
					},
					{
						title: "Блоки уже маппятся на UI",
						description:
							"Renderer использует существующие секции и registry-based компоненты вместо хардкодной раскладки.",
					},
				],
			},
			{
				__component: "blocks.stats",
				heading: "Что уже подтверждено кодом",
				description:
					"Блок статистики нужен не как украшение, а как компактная форма инженерных тезисов.",
				items: [
					{
						value: "11",
						label: "Типов блоков",
						description: "Все блоки первой очереди уже подключены к renderer layer.",
					},
					{
						value: "1",
						label: "CMS-route",
						description: "Один Astro slug-route собирает страницы из Dynamic Zone.",
					},
					{
						value: "3",
						label: "Preview sources",
						description: "Preview list уже умеет показывать articles, projects и vacancies.",
					},
					{
						value: "2",
						label: "Локали",
						description: "Demo page seeded для ru-RU и en.",
					},
				],
			},
			{
				__component: "blocks.content-columns",
				eyebrow: "Две плоскости оценки",
				heading: "Почему этот контур важен и где его границы",
				columns: [
					{
						title: "Что уже можно считать реализованным",
						body:
							"- коллекция `pages` и маршрут по `slug`\n- `Dynamic Zone` с реальными block renderers\n- frontend build, который уже генерирует CMS-driven page\n- seeded demo-page для проверки контента и структуры",
					},
					{
						title: "Что еще не стоит считать завершенным",
						body:
							"- articles, projects и vacancies пока не переведены на locale-prefixed public routes\n- media seed для визуальных блоков пока минимален\n- preview mode и rebuild pipeline остаются следующими шагами\n- sitemap и production deployment еще не доведены",
					},
				],
			},
			{
				__component: "blocks.preview-list",
				heading: "Открытые вакансии",
				description:
					"Блок берет данные из уже существующей сущности vacancies и показывает их как анонсы.",
				source: "vacancies",
				limit: 3,
				ctaLabel: "Все вакансии",
				ctaUrl: "/vacancies",
			},
			{
				__component: "blocks.testimonials",
				heading: "Как выглядит блок доверия в CMS-контуре",
				description:
					"Отзывы здесь нужны как демонстрация переиспользуемой social-proof секции, а не как финальный контент витрины.",
				items: [
					{
						quote:
							"Страница стала редактируемой на уровне структуры, а не только на уровне отдельных текстов.",
						authorName: "Контент-менеджер",
						authorRole: "Редактор контента",
						company: "Marketing Team",
					},
					{
						quote:
							"Dynamic Zone дал понятную модель для диплома: блоки, SEO и маршрут собираются в цельный публикационный сценарий.",
						authorName: "Архитектор решения",
						authorRole: "Frontend / CMS",
						company: "Project Core",
					},
					{
						quote:
							"Теперь хотя бы одна маркетинговая страница действительно проходит весь путь Strapi -> API -> Astro.",
						authorName: "Руководитель ВКР",
						authorRole: "Engineering Reviewer",
						company: "Diploma Review",
					},
				],
			},
			{
				__component: "blocks.faq",
				heading: "Что важно про текущую реализацию",
				description:
					"Рендеринг pages уже работает, но перевод всей витрины на CMS еще не завершен.",
				items: [
					{
						question: "Главная страница уже переведена в CMS?",
						answer:
							"Да. Для первой очереди главная собирается из `home-page`, а layout получает шапку и футер из `global`.",
					},
					{
						question: "Структура страницы задается в Astro?",
						answer:
							"Нет. Astro-роут получает массив blocks из CMS и маппит его на frontend-компоненты.",
					},
					{
						question: "Можно ли расширять библиотеку блоков дальше?",
						answer:
							"Да, но первая очередь ограничена блоками, необходимыми для дипломного сценария и демонстрации CMS-first архитектуры.",
					},
				],
			},
			{
				__component: "blocks.numbered-points",
				heading: "Как расширять систему дальше",
				description:
					"Информационные блоки нужны не сами по себе, а как следующий слой управляемой маркетинговой структуры.",
				items: [
					{
						title: "Расширить locale-prefixed маршруты",
						description:
							"После главной и `pages` тот же ru/en-контур нужно довести до articles и projects.",
					},
					{
						title: "Довести публичный i18n-контур",
						description:
							"Нужно синхронизировать locale-aware ссылки, canonical и sitemap для всех публичных разделов.",
					},
					{
						title: "Добавить preview flow",
						description:
							"Редакторский сценарий должен покрывать просмотр draft-версии до публикации.",
					},
					{
						title: "Подвязать rebuild-пайплайн",
						description:
							"Публикация страницы должна запускать обновление статической витрины без ручного вмешательства.",
					},
				],
			},
			{
				__component: "blocks.process-timeline",
				heading: "Как работает текущий CMS-first контур",
				description:
					"Блок показывает не бизнес-процесс, а инженерную последовательность публикации маркетинговой страницы.",
				items: [
					{
						stepLabel: "01",
						title: "Страница описывается в Strapi",
						description:
							"Редактор задает slug, SEO и набор блоков в коллекции pages.",
					},
					{
						stepLabel: "02",
						title: "Astro получает blocks через API",
						description:
							"Frontend helper загружает страницу по slug и передает blocks в общий renderer.",
					},
					{
						stepLabel: "03",
						title: "Каждый block type маппится на sourced UI",
						description:
							"Renderer подставляет готовые компоненты и существующие секции без ручной раскладки страницы.",
					},
					{
						stepLabel: "04",
						title: "Статическая страница попадает в build output",
						description:
							"В сборке уже появляется locale-aware route `/ru/cms-first-platform/` как реальная CMS-driven страница.",
					},
				],
			},
			{
				__component: "blocks.cta",
				title: "Следующий шаг",
				description:
					"Расширить этот же контур на articles и projects, затем довести preview mode, sitemap и rebuild-публикацию.",
				primaryButtonLabel: "Перейти к проектам",
				primaryButtonUrl: "/projects",
				secondaryButtonLabel: "Читать статьи",
				secondaryButtonUrl: "/articles",
			},
		],
	},
	en: {
		title: "CMS-first marketing platform",
		slug: "cms-first-platform",
		seo: {
			metaTitle: "CMS-first marketing platform",
			metaDescription:
				"Demo Strapi Dynamic Zone page for the diploma project.",
			ogTitle: "CMS-first marketing platform",
			ogDescription:
				"The page is assembled from Strapi blocks and rendered in Astro without hardcoded section structure.",
			noIndex: true,
		},
		blocks: [
			{
				__component: "blocks.hero",
				eyebrow: "Diploma demo scenario",
				title: "A marketing page is assembled from CMS blocks",
				description:
					"Page structure lives in Strapi Dynamic Zone, while Astro renders the blocks without hand-coded section ordering in the route file.",
				primaryButtonLabel: "Open vacancies",
				primaryButtonUrl: "/vacancies",
				secondaryButtonLabel: "Read articles",
				secondaryButtonUrl: "/articles",
			},
			{
				__component: "blocks.logo-cloud",
				heading: "Interface and CMS patterns used by the project",
				description:
					"This block uses frontend fallback assets for the demo until Strapi media seeding is added.",
				items: [
					{ name: "OpenAI" },
					{ name: "Vercel" },
					{ name: "GitHub" },
				],
			},
			{
				__component: "blocks.feature-cards",
				eyebrow: "First queue",
				heading: "What the CMS model already covers",
				description:
					"A minimal but academically strong set of blocks for demonstrating the CMS-first approach in the diploma.",
				items: [
					{
						title: "Slug-based pages",
						description:
							"Editors can create standalone marketing pages without developer involvement.",
						icon: "file-text",
					},
					{
						title: "Dynamic Zone",
						description:
							"Section order and composition are defined by the content model rather than the Astro template.",
						icon: "layout-template",
					},
					{
						title: "SEO and Open Graph",
						description:
							"Meta information lives next to the page and is available to the frontend build layer.",
						icon: "search",
					},
				],
			},
			{
				__component: "blocks.rich-text",
				heading: "Why a dedicated pages route matters",
				body:
					"The `pages` collection is needed so that **marketing content** becomes a first-class CMS entity rather than a set of fixed Astro routes.\n\nIn this implementation, the **Astro route does not define the page structure manually**. It receives the `blocks` array from Strapi and renders it through a single `DynamicZoneRenderer`.\n\nThe first queue already moved the homepage, header, and footer into the CMS contour, but the full locale-prefixed scheme still does not cover every public section.",
			},
			{
				__component: "blocks.quote",
				quote:
					"For the diploma, it is not enough to store content in a CMS. The key point is proving that the marketing page structure itself became editor-controlled.",
				authorName: "Project position",
				authorRole: "CMS-first rationale",
				sourceLabel: "Architecture note",
			},
			{
				__component: "blocks.feature-highlight",
				eyebrow: "UI adaptation",
				title: "One block type can be wired to ready-made sourced components",
				description:
					"In the first queue we do not handcraft sections from scratch. We adapt existing components and registry-based UI to the CMS schema.",
				items: [
					{
						title: "Feature tabs",
						description:
							"The block reuses the existing tabbed layout and feeds it from CMS items without manual Astro section layout.",
						icon: "layout-template",
					},
					{
						title: "Bento features",
						description:
							"Feature cards are rendered through the already existing grid and card components.",
						icon: "file-text",
					},
					{
						title: "Registry FAQ",
						description:
							"The FAQ renderer is backed by a ruixen registry component and wrapped into the CMS-driven layer.",
						icon: "search",
					},
				],
				ctaLabel: "Explore projects",
				ctaUrl: "/projects",
			},
			{
				__component: "blocks.checklist",
				heading: "What already makes the pages flow useful",
				description:
					"This is not the final production contour yet, but it is already a real connection between the CMS model and frontend rendering.",
				items: [
					{
						title: "The page exists as a standalone entity",
						description:
							"Editors manage page-level fields and blocks rather than only isolated text fields.",
					},
					{
						title: "Routing is slug-based",
						description:
							"Astro generates a separate static route for the CMS page without manually defining the structure.",
					},
					{
						title: "SEO travels with the page",
						description:
							"Meta title, description, and Open Graph are loaded from the same CMS record.",
					},
					{
						title: "Blocks already map to UI",
						description:
							"The renderer mounts existing sections and registry-based components instead of a hand-laid page layout.",
					},
				],
			},
			{
				__component: "blocks.stats",
				heading: "What is already confirmed by code",
				description:
					"This stats block is used as a compact presentation of engineering facts, not as decoration.",
				items: [
					{
						value: "11",
						label: "Block types",
						description: "All first-queue blocks are already connected to the renderer layer.",
					},
					{
						value: "1",
						label: "CMS route",
						description: "One Astro slug-route assembles pages from Dynamic Zone.",
					},
					{
						value: "3",
						label: "Preview sources",
						description: "Preview list already supports articles, projects, and vacancies.",
					},
					{
						value: "2",
						label: "Locales",
						description: "The demo page is seeded for ru-RU and en.",
					},
				],
			},
			{
				__component: "blocks.content-columns",
				eyebrow: "Two evaluation planes",
				heading: "Why this contour matters and where it still stops",
				columns: [
					{
						title: "What can already be considered implemented",
						body:
							"- `pages` collection and slug route\n- `Dynamic Zone` with real block renderers\n- frontend build that already emits a CMS-driven page\n- a seeded demo page for content and structure verification",
					},
					{
						title: "What should not be treated as finished yet",
						body:
							"- articles, projects, and vacancies are still outside full locale-prefixed public routes\n- media seed for visual blocks stays minimal\n- preview mode and rebuild pipeline remain the next steps\n- sitemap and production deployment are still pending",
					},
				],
			},
			{
				__component: "blocks.preview-list",
				heading: "Open vacancies",
				description:
					"This block reuses the existing vacancies entity and renders it as a preview section.",
				source: "vacancies",
				limit: 3,
				ctaLabel: "All vacancies",
				ctaUrl: "/vacancies",
			},
			{
				__component: "blocks.testimonials",
				heading: "How a trust block looks inside the CMS flow",
				description:
					"Testimonials here serve as a reusable social-proof section demo rather than the final storefront content.",
				items: [
					{
						quote:
							"The page is now editable at the structure level, not only at the text-field level.",
						authorName: "Content manager",
						authorRole: "Content editor",
						company: "Marketing Team",
					},
					{
						quote:
							"Dynamic Zone gave the diploma a clear architectural story: blocks, SEO, and routing now form a single publishing flow.",
						authorName: "Solution architect",
						authorRole: "Frontend / CMS",
						company: "Project Core",
					},
					{
						quote:
							"At least one marketing page now truly follows the Strapi -> API -> Astro path.",
						authorName: "Diploma reviewer",
						authorRole: "Engineering review",
						company: "Academic Review",
					},
				],
			},
			{
				__component: "blocks.faq",
				heading: "Important notes about the current implementation",
				description:
					"Pages rendering works, but the entire storefront is not fully migrated to CMS yet.",
				items: [
					{
						question: "Is the homepage already CMS-driven?",
						answer:
							"Yes. In the first queue the homepage comes from `home-page`, while the layout receives header and footer data from `global`.",
					},
					{
						question: "Is the page structure defined in Astro?",
						answer:
							"No. The Astro route receives the blocks array from CMS and maps it to frontend components.",
					},
					{
						question: "Can the block library be expanded later?",
						answer:
							"Yes, but the first queue stays limited to the blocks needed for the diploma scenario and the CMS-first architecture demo.",
					},
				],
			},
			{
				__component: "blocks.numbered-points",
				heading: "How to expand the system next",
				description:
					"These informational blocks matter as the next layer of controlled marketing structure, not as decoration.",
				items: [
					{
						title: "Expand locale-prefixed routes",
						description:
							"After the homepage and `pages`, the same ru/en contour should be extended to articles and projects.",
					},
					{
						title: "Finish the public i18n contour",
						description:
							"Locale-aware links, canonicals, and sitemap still need to be aligned across all public sections.",
					},
					{
						title: "Add preview flow",
						description:
							"The editorial scenario should include draft preview before publication.",
					},
					{
						title: "Wire rebuild pipeline",
						description:
							"Publishing should trigger storefront refresh without manual intervention.",
					},
				],
			},
			{
				__component: "blocks.process-timeline",
				heading: "How the current CMS-first flow works",
				description:
					"This block visualizes the engineering publication sequence rather than a business process.",
				items: [
					{
						stepLabel: "01",
						title: "The page is described in Strapi",
						description:
							"The editor defines slug, SEO, and the ordered block set in the pages collection.",
					},
					{
						stepLabel: "02",
						title: "Astro fetches blocks via API",
						description:
							"The frontend helper loads the page by slug and passes the blocks array into the shared renderer.",
					},
					{
						stepLabel: "03",
						title: "Each block type maps to sourced UI",
						description:
							"The renderer mounts ready-made components and existing sections without a manually laid-out page file.",
					},
					{
						stepLabel: "04",
						title: "The static page lands in build output",
						description:
							"The build already produces `/en/cms-first-platform/` as a real locale-aware CMS-driven page.",
					},
				],
			},
			{
				__component: "blocks.cta",
				title: "Next step",
				description:
					"Extend the same contour to articles and projects, then finish preview mode, sitemap, and rebuild publication.",
				primaryButtonLabel: "Go to projects",
				primaryButtonUrl: "/projects",
				secondaryButtonLabel: "Read articles",
				secondaryButtonUrl: "/articles",
			},
		],
	},
};

const ensurePublishedPage = async (strapi, locale, pageData) => {
	const service = strapi.documents("api::page.page");
	const existing = await service.findMany({
		filters: { slug: { $eq: pageData.slug } },
		locale,
		limit: 1,
	});

	let documentId;
	if (existing[0]) {
		documentId = existing[0].documentId;
		await service.update({
			documentId,
			locale,
			data: pageData,
		});
	} else {
		const created = await service.create({
			locale,
			data: pageData,
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

		for (const locale of localesToSeed) {
			const pageData = pagesSeed[locale];
			if (!pageData) continue;

			console.log(`Seeding page locale: ${locale}`);
			await ensurePublishedPage(strapi, locale, pageData);
		}

		console.log(
			`Pages seed complete for locales: ${localesToSeed.join(", ")}`
		);
		process.exit(0);
	} catch (error) {
		console.error("Pages seed failed:", error);
		process.exit(1);
	}
};

run();
