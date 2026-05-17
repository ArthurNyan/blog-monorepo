/* eslint-disable no-console */
const { createStrapi } = require("@strapi/strapi");
const path = require("node:path");

const APP_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(APP_DIR, "dist");
const PREFERRED_LOCALES = ["en", "ru-RU"];

const industriesSeed = [
	{ slug: "it", name: "Информационные технологии" },
	{ slug: "fintech", name: "Финтех" },
	{ slug: "retail", name: "Ритейл" },
	{ slug: "healthcare", name: "Медицина" },
	{ slug: "logistics", name: "Логистика" },
	{ slug: "education", name: "Образование" },
];

const rolesSeed = [
	{ slug: "software-engineer", name: "Инженер разработки" },
	{ slug: "qa-engineer", name: "QA инженер" },
	{ slug: "product-manager", name: "Продакт-менеджер" },
	{ slug: "data-analyst", name: "Аналитик данных" },
	{ slug: "sales-manager", name: "Менеджер по продажам" },
	{ slug: "hr-specialist", name: "HR специалист" },
	{ slug: "operations-manager", name: "Операционный менеджер" },
	{ slug: "marketing-manager", name: "Маркетинг-менеджер" },
];

const vacanciesSeed = [
	{
		slug: "backend-nodejs-engineer",
		title: "Backend Node.js Engineer",
		industrySlug: "it",
		roleSlug: "software-engineer",
		location: "Москва",
		workFormat: "hybrid",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 220000,
		salaryTo: 320000,
		currency: "RUB",
		description:
			"Разработка backend-сервисов для B2B платформы.\n\n- Node.js + TypeScript\n- PostgreSQL, Redis\n- Работа в продуктовой команде",
	},
	{
		slug: "frontend-react-engineer",
		title: "Frontend React Engineer",
		industrySlug: "it",
		roleSlug: "software-engineer",
		location: "Санкт-Петербург",
		workFormat: "remote",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 200000,
		salaryTo: 290000,
		currency: "RUB",
		description:
			"Развитие клиентских приложений и дизайн-системы.\n\n- React + TypeScript\n- UX-фокус\n- Взаимодействие с продуктом и аналитикой",
	},
	{
		slug: "qa-automation-engineer",
		title: "QA Automation Engineer",
		industrySlug: "fintech",
		roleSlug: "qa-engineer",
		location: "Москва",
		workFormat: "office",
		employmentType: "full_time",
		level: "senior",
		salaryFrom: 240000,
		salaryTo: 340000,
		currency: "RUB",
		description:
			"Автоматизация тестирования платежных и antifraud-сценариев.\n\n- E2E/API автотесты\n- CI/CD и quality gates\n- Влияние на релизный процесс",
	},
	{
		slug: "product-manager-logistics",
		title: "Product Manager (Logistics Platform)",
		industrySlug: "logistics",
		roleSlug: "product-manager",
		location: "Казань",
		workFormat: "hybrid",
		employmentType: "full_time",
		level: "senior",
		salaryFrom: 250000,
		salaryTo: 360000,
		currency: "RUB",
		description:
			"Развитие платформы управления перевозками и SLA.\n\n- Discovery и delivery\n- Метрики продукта\n- Координация кросс-функциональной команды",
	},
	{
		slug: "data-analyst-retail",
		title: "Data Analyst (Retail Analytics)",
		industrySlug: "retail",
		roleSlug: "data-analyst",
		location: "Екатеринбург",
		workFormat: "remote",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 170000,
		salaryTo: 250000,
		currency: "RUB",
		description:
			"Аналитика ассортимента, продаж и маркетинговых кампаний.\n\n- SQL, BI\n- A/B анализ\n- Дашборды для бизнеса",
	},
	{
		slug: "sales-manager-b2b-saas",
		title: "B2B Sales Manager (SaaS)",
		industrySlug: "it",
		roleSlug: "sales-manager",
		location: "Москва",
		workFormat: "office",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 130000,
		salaryTo: 260000,
		currency: "RUB",
		description:
			"Продажи корпоративного SaaS-решения.\n\n- Полный цикл сделки\n- Переговоры с ЛПР\n- Работа с CRM и воронкой",
	},
	{
		slug: "hr-specialist-tech",
		title: "HR Specialist (Tech Hiring)",
		industrySlug: "it",
		roleSlug: "hr-specialist",
		location: "Новосибирск",
		workFormat: "hybrid",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 110000,
		salaryTo: 170000,
		currency: "RUB",
		description:
			"Подбор и адаптация специалистов в технические команды.\n\n- Полный цикл рекрутинга\n- Employer brand\n- Work with hiring managers",
	},
	{
		slug: "operations-manager-medtech",
		title: "Operations Manager (MedTech)",
		industrySlug: "healthcare",
		roleSlug: "operations-manager",
		location: "Москва",
		workFormat: "office",
		employmentType: "full_time",
		level: "lead",
		salaryFrom: 210000,
		salaryTo: 300000,
		currency: "RUB",
		description:
			"Оптимизация операционных процессов медицинского сервиса.\n\n- Процессы и регламенты\n- Работа с метриками эффективности\n- Координация отделов",
	},
	{
		slug: "marketing-manager-edtech",
		title: "Marketing Manager (EdTech)",
		industrySlug: "education",
		roleSlug: "marketing-manager",
		location: "Санкт-Петербург",
		workFormat: "remote",
		employmentType: "contract",
		level: "middle",
		salaryFrom: 140000,
		salaryTo: 220000,
		currency: "RUB",
		description:
			"Развитие performance и контент-маркетинга образовательного продукта.\n\n- Growth-эксперименты\n- Воронка привлечения\n- Контент-стратегия",
	},
	{
		slug: "junior-data-analyst-fintech",
		title: "Junior Data Analyst (FinTech)",
		industrySlug: "fintech",
		roleSlug: "data-analyst",
		location: "Москва",
		workFormat: "hybrid",
		employmentType: "internship",
		level: "junior",
		salaryFrom: 80000,
		salaryTo: 120000,
		currency: "RUB",
		description:
			"Стажировка в аналитической команде финтех-продукта.\n\n- Работа с SQL\n- Поддержка BI-отчетов\n- Наставничество от senior аналитиков",
	},
	{
		slug: "support-operations-manager-retail",
		title: "Support Operations Manager",
		industrySlug: "retail",
		roleSlug: "operations-manager",
		location: "Краснодар",
		workFormat: "office",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 120000,
		salaryTo: 190000,
		currency: "RUB",
		description:
			"Управление клиентской поддержкой и процессами обслуживания.\n\n- SLA и контроль качества\n- Набор и развитие команды\n- Внедрение улучшений",
	},
	{
		slug: "senior-frontend-platform-engineer",
		title: "Senior Frontend Platform Engineer",
		industrySlug: "it",
		roleSlug: "software-engineer",
		location: "Москва",
		workFormat: "remote",
		employmentType: "full_time",
		level: "senior",
		salaryFrom: 280000,
		salaryTo: 390000,
		currency: "RUB",
		description:
			"Развитие платформы фронтенд-разработки и внутренних UI-инструментов.\n\n- React + TypeScript\n- Монорепо и качество кода\n- Влияние на инженерные стандарты",
	},
	{
		slug: "product-manager-healthcare-data",
		title: "Product Manager (Healthcare Data)",
		industrySlug: "healthcare",
		roleSlug: "product-manager",
		location: "Санкт-Петербург",
		workFormat: "hybrid",
		employmentType: "contract",
		level: "middle",
		salaryFrom: 210000,
		salaryTo: 300000,
		currency: "RUB",
		description:
			"Запуск и развитие data-продуктов для медицинских сервисов.\n\n- CustDev и roadmap\n- Приоритизация гипотез\n- Интеграции с внешними системами",
	},
	{
		slug: "junior-qa-intern-edtech",
		title: "Junior QA Intern (EdTech)",
		industrySlug: "education",
		roleSlug: "qa-engineer",
		location: "Казань",
		workFormat: "office",
		employmentType: "internship",
		level: "intern",
		salaryFrom: 60000,
		salaryTo: 90000,
		currency: "RUB",
		description:
			"Стажировка в команде QA образовательной платформы.\n\n- Ручное тестирование веб-фич\n- Базовые API-проверки\n- Наставничество и план развития",
	},
	{
		slug: "test-vacancy",
		title: "QA Engineer (Sandbox Vacancy)",
		industrySlug: "it",
		roleSlug: "qa-engineer",
		location: "Москва",
		workFormat: "office",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 150000,
		salaryTo: 230000,
		currency: "RUB",
		description:
			"Тестовая вакансия для проверки фильтров, карточек и формы отклика.",
	},
];

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

	const published = await service.findOne({
		documentId,
		locale,
		status: "published",
	});

	return published;
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

		for (const locale of localesToSeed) {
			console.log(`Seeding locale: ${locale}`);
			console.log("Seeding industries...");
			const industriesBySlug = new Map();
			for (const item of industriesSeed) {
				const industry = await ensurePublishedDocument(
					strapi,
					"api::industry.industry",
					locale,
					item.slug,
					{
						name: item.name,
						slug: item.slug,
					}
				);
				industriesBySlug.set(item.slug, industry.documentId);
			}

			console.log("Seeding roles...");
			const rolesBySlug = new Map();
			for (const item of rolesSeed) {
				const role = await ensurePublishedDocument(
					strapi,
					"api::job-role.job-role",
					locale,
					item.slug,
					{
						name: item.name,
						slug: item.slug,
					}
				);
				rolesBySlug.set(item.slug, role.documentId);
			}

			console.log("Seeding vacancies...");
			for (const vacancy of vacanciesSeed) {
				const industryId = industriesBySlug.get(vacancy.industrySlug);
				const roleId = rolesBySlug.get(vacancy.roleSlug);

				if (!industryId || !roleId) {
					throw new Error(`Missing relation for vacancy: ${vacancy.slug}`);
				}

				await ensurePublishedDocument(
					strapi,
					"api::vacancy.vacancy",
					locale,
					vacancy.slug,
					{
						title: vacancy.title,
						slug: vacancy.slug,
						industry: industryId,
						role: roleId,
						location: vacancy.location,
						workFormat: vacancy.workFormat,
						employmentType: vacancy.employmentType,
						level: vacancy.level,
						salaryFrom: vacancy.salaryFrom,
						salaryTo: vacancy.salaryTo,
						currency: vacancy.currency,
						description: vacancy.description,
						isActive: true,
					}
				);
			}
		}

		console.log(
			`Seed complete: ${industriesSeed.length} industries, ${rolesSeed.length} roles, ${vacanciesSeed.length} vacancies in locales ${PREFERRED_LOCALES.join(", ")}`
		);
	} finally {
		await strapi.destroy();
	}
};

run().catch((error) => {
	console.error("Seed failed:", error);
	process.exit(1);
});
