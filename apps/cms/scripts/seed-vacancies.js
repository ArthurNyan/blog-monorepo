/* eslint-disable no-console */
const { createStrapi } = require("@strapi/strapi");
const path = require("node:path");

const APP_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(APP_DIR, "dist");
const PREFERRED_LOCALES = ["en", "ru-RU"];
const DEFAULT_LOCALE = "ru-RU";

const localizedValue = (ru, en) => ({
	[DEFAULT_LOCALE]: ru,
	en,
});

const getLocalizedValue = (value, locale) => {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		return value;
	}

	return value[locale] ?? value[DEFAULT_LOCALE] ?? Object.values(value)[0];
};

const industriesSeed = [
	{
		slug: "it",
		name: localizedValue("Информационные технологии", "Information Technology"),
	},
	{ slug: "fintech", name: localizedValue("Финтех", "FinTech") },
	{ slug: "retail", name: localizedValue("Ритейл", "Retail") },
	{ slug: "healthcare", name: localizedValue("Медицина", "Healthcare") },
	{ slug: "logistics", name: localizedValue("Логистика", "Logistics") },
	{ slug: "education", name: localizedValue("Образование", "Education") },
];

const rolesSeed = [
	{
		slug: "software-engineer",
		name: localizedValue("Инженер разработки", "Software Engineer"),
	},
	{ slug: "qa-engineer", name: localizedValue("QA инженер", "QA Engineer") },
	{
		slug: "product-manager",
		name: localizedValue("Продакт-менеджер", "Product Manager"),
	},
	{
		slug: "data-analyst",
		name: localizedValue("Аналитик данных", "Data Analyst"),
	},
	{
		slug: "sales-manager",
		name: localizedValue("Менеджер по продажам", "Sales Manager"),
	},
	{
		slug: "hr-specialist",
		name: localizedValue("HR специалист", "HR Specialist"),
	},
	{
		slug: "operations-manager",
		name: localizedValue("Операционный менеджер", "Operations Manager"),
	},
	{
		slug: "marketing-manager",
		name: localizedValue("Маркетинг-менеджер", "Marketing Manager"),
	},
];

const vacanciesSeed = [
	{
		slug: "backend-nodejs-engineer",
		title: "Backend Node.js Engineer",
		industrySlug: "it",
		roleSlug: "software-engineer",
		location: localizedValue("Москва", "Moscow"),
		workFormat: "hybrid",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 220000,
		salaryTo: 320000,
		currency: "RUB",
		description: localizedValue(
			"Разработка backend-сервисов для B2B платформы.\n\n- Node.js + TypeScript\n- PostgreSQL, Redis\n- Работа в продуктовой команде",
			"Develop backend services for a B2B platform.\n\n- Node.js + TypeScript\n- PostgreSQL, Redis\n- Work in a product team"
		),
	},
	{
		slug: "frontend-react-engineer",
		title: "Frontend React Engineer",
		industrySlug: "it",
		roleSlug: "software-engineer",
		location: localizedValue("Санкт-Петербург", "Saint Petersburg"),
		workFormat: "remote",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 200000,
		salaryTo: 290000,
		currency: "RUB",
		description: localizedValue(
			"Развитие клиентских приложений и дизайн-системы.\n\n- React + TypeScript\n- UX-фокус\n- Взаимодействие с продуктом и аналитикой",
			"Build client applications and the design system.\n\n- React + TypeScript\n- UX focus\n- Collaboration with product and analytics"
		),
	},
	{
		slug: "qa-automation-engineer",
		title: "QA Automation Engineer",
		industrySlug: "fintech",
		roleSlug: "qa-engineer",
		location: localizedValue("Москва", "Moscow"),
		workFormat: "office",
		employmentType: "full_time",
		level: "senior",
		salaryFrom: 240000,
		salaryTo: 340000,
		currency: "RUB",
		description: localizedValue(
			"Автоматизация тестирования платежных и antifraud-сценариев.\n\n- E2E/API автотесты\n- CI/CD и quality gates\n- Влияние на релизный процесс",
			"Automate testing for payment and antifraud scenarios.\n\n- E2E and API automated tests\n- CI/CD and quality gates\n- Impact on the release process"
		),
	},
	{
		slug: "product-manager-logistics",
		title: "Product Manager (Logistics Platform)",
		industrySlug: "logistics",
		roleSlug: "product-manager",
		location: localizedValue("Казань", "Kazan"),
		workFormat: "hybrid",
		employmentType: "full_time",
		level: "senior",
		salaryFrom: 250000,
		salaryTo: 360000,
		currency: "RUB",
		description: localizedValue(
			"Развитие платформы управления перевозками и SLA.\n\n- Discovery и delivery\n- Метрики продукта\n- Координация кросс-функциональной команды",
			"Develop a platform for transportation management and SLA control.\n\n- Discovery and delivery\n- Product metrics\n- Cross-functional team coordination"
		),
	},
	{
		slug: "data-analyst-retail",
		title: "Data Analyst (Retail Analytics)",
		industrySlug: "retail",
		roleSlug: "data-analyst",
		location: localizedValue("Екатеринбург", "Yekaterinburg"),
		workFormat: "remote",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 170000,
		salaryTo: 250000,
		currency: "RUB",
		description: localizedValue(
			"Аналитика ассортимента, продаж и маркетинговых кампаний.\n\n- SQL, BI\n- A/B анализ\n- Дашборды для бизнеса",
			"Analyze assortment, sales, and marketing campaigns.\n\n- SQL and BI\n- A/B analysis\n- Dashboards for business stakeholders"
		),
	},
	{
		slug: "sales-manager-b2b-saas",
		title: "B2B Sales Manager (SaaS)",
		industrySlug: "it",
		roleSlug: "sales-manager",
		location: localizedValue("Москва", "Moscow"),
		workFormat: "office",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 130000,
		salaryTo: 260000,
		currency: "RUB",
		description: localizedValue(
			"Продажи корпоративного SaaS-решения.\n\n- Полный цикл сделки\n- Переговоры с ЛПР\n- Работа с CRM и воронкой",
			"Sell a corporate SaaS solution.\n\n- Full sales cycle\n- Negotiations with decision-makers\n- CRM and pipeline management"
		),
	},
	{
		slug: "hr-specialist-tech",
		title: "HR Specialist (Tech Hiring)",
		industrySlug: "it",
		roleSlug: "hr-specialist",
		location: localizedValue("Новосибирск", "Novosibirsk"),
		workFormat: "hybrid",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 110000,
		salaryTo: 170000,
		currency: "RUB",
		description: localizedValue(
			"Подбор и адаптация специалистов в технические команды.\n\n- Полный цикл рекрутинга\n- Employer brand\n- Work with hiring managers",
			"Hire and onboard specialists for engineering teams.\n\n- Full-cycle recruiting\n- Employer brand\n- Work with hiring managers"
		),
	},
	{
		slug: "operations-manager-medtech",
		title: "Operations Manager (MedTech)",
		industrySlug: "healthcare",
		roleSlug: "operations-manager",
		location: localizedValue("Москва", "Moscow"),
		workFormat: "office",
		employmentType: "full_time",
		level: "lead",
		salaryFrom: 210000,
		salaryTo: 300000,
		currency: "RUB",
		description: localizedValue(
			"Оптимизация операционных процессов медицинского сервиса.\n\n- Процессы и регламенты\n- Работа с метриками эффективности\n- Координация отделов",
			"Optimize operational processes of a healthcare service.\n\n- Process design and playbooks\n- Performance metrics\n- Cross-team coordination"
		),
	},
	{
		slug: "marketing-manager-edtech",
		title: "Marketing Manager (EdTech)",
		industrySlug: "education",
		roleSlug: "marketing-manager",
		location: localizedValue("Санкт-Петербург", "Saint Petersburg"),
		workFormat: "remote",
		employmentType: "contract",
		level: "middle",
		salaryFrom: 140000,
		salaryTo: 220000,
		currency: "RUB",
		description: localizedValue(
			"Развитие performance и контент-маркетинга образовательного продукта.\n\n- Growth-эксперименты\n- Воронка привлечения\n- Контент-стратегия",
			"Grow performance and content marketing for an education product.\n\n- Growth experiments\n- Acquisition funnel\n- Content strategy"
		),
	},
	{
		slug: "junior-data-analyst-fintech",
		title: "Junior Data Analyst (FinTech)",
		industrySlug: "fintech",
		roleSlug: "data-analyst",
		location: localizedValue("Москва", "Moscow"),
		workFormat: "hybrid",
		employmentType: "internship",
		level: "junior",
		salaryFrom: 80000,
		salaryTo: 120000,
		currency: "RUB",
		description: localizedValue(
			"Стажировка в аналитической команде финтех-продукта.\n\n- Работа с SQL\n- Поддержка BI-отчетов\n- Наставничество от senior аналитиков",
			"Internship in the analytics team of a FinTech product.\n\n- Work with SQL\n- Support BI reporting\n- Mentorship from senior analysts"
		),
	},
	{
		slug: "support-operations-manager-retail",
		title: "Support Operations Manager",
		industrySlug: "retail",
		roleSlug: "operations-manager",
		location: localizedValue("Краснодар", "Krasnodar"),
		workFormat: "office",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 120000,
		salaryTo: 190000,
		currency: "RUB",
		description: localizedValue(
			"Управление клиентской поддержкой и процессами обслуживания.\n\n- SLA и контроль качества\n- Набор и развитие команды\n- Внедрение улучшений",
			"Manage customer support and service operations.\n\n- SLA and quality control\n- Team hiring and development\n- Continuous improvement rollout"
		),
	},
	{
		slug: "senior-frontend-platform-engineer",
		title: "Senior Frontend Platform Engineer",
		industrySlug: "it",
		roleSlug: "software-engineer",
		location: localizedValue("Москва", "Moscow"),
		workFormat: "remote",
		employmentType: "full_time",
		level: "senior",
		salaryFrom: 280000,
		salaryTo: 390000,
		currency: "RUB",
		description: localizedValue(
			"Развитие платформы фронтенд-разработки и внутренних UI-инструментов.\n\n- React + TypeScript\n- Монорепо и качество кода\n- Влияние на инженерные стандарты",
			"Evolve the frontend platform and internal UI tooling.\n\n- React + TypeScript\n- Monorepo and code quality\n- Influence engineering standards"
		),
	},
	{
		slug: "product-manager-healthcare-data",
		title: "Product Manager (Healthcare Data)",
		industrySlug: "healthcare",
		roleSlug: "product-manager",
		location: localizedValue("Санкт-Петербург", "Saint Petersburg"),
		workFormat: "hybrid",
		employmentType: "contract",
		level: "middle",
		salaryFrom: 210000,
		salaryTo: 300000,
		currency: "RUB",
		description: localizedValue(
			"Запуск и развитие data-продуктов для медицинских сервисов.\n\n- CustDev и roadmap\n- Приоритизация гипотез\n- Интеграции с внешними системами",
			"Launch and grow data products for healthcare services.\n\n- Customer development and roadmap\n- Hypothesis prioritization\n- Integrations with external systems"
		),
	},
	{
		slug: "junior-qa-intern-edtech",
		title: "Junior QA Intern (EdTech)",
		industrySlug: "education",
		roleSlug: "qa-engineer",
		location: localizedValue("Казань", "Kazan"),
		workFormat: "office",
		employmentType: "internship",
		level: "intern",
		salaryFrom: 60000,
		salaryTo: 90000,
		currency: "RUB",
		description: localizedValue(
			"Стажировка в команде QA образовательной платформы.\n\n- Ручное тестирование веб-фич\n- Базовые API-проверки\n- Наставничество и план развития",
			"Internship in the QA team of an education platform.\n\n- Manual testing of web features\n- Basic API checks\n- Mentorship and growth plan"
		),
	},
	{
		slug: "test-vacancy",
		title: "QA Engineer (Sandbox Vacancy)",
		industrySlug: "it",
		roleSlug: "qa-engineer",
		location: localizedValue("Москва", "Moscow"),
		workFormat: "office",
		employmentType: "full_time",
		level: "middle",
		salaryFrom: 150000,
		salaryTo: 230000,
		currency: "RUB",
		description: localizedValue(
			"Тестовая вакансия для проверки фильтров, карточек и формы отклика.",
			"Test vacancy for validating filters, cards, and the application form."
		),
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
						name: getLocalizedValue(item.name, locale),
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
						name: getLocalizedValue(item.name, locale),
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
						title: getLocalizedValue(vacancy.title, locale),
						slug: vacancy.slug,
						industry: industryId,
						role: roleId,
						location: getLocalizedValue(vacancy.location, locale),
						workFormat: vacancy.workFormat,
						employmentType: vacancy.employmentType,
						level: vacancy.level,
						salaryFrom: vacancy.salaryFrom,
						salaryTo: vacancy.salaryTo,
						currency: vacancy.currency,
						description: getLocalizedValue(vacancy.description, locale),
						isActive: true,
					}
				);
			}
		}

		console.log(
			`Seed complete: ${industriesSeed.length} industries, ${rolesSeed.length} roles, ${vacanciesSeed.length} vacancies in locales ${localesToSeed.join(", ")}`
		);
	} finally {
		await strapi.destroy();
	}
};

run().catch((error) => {
	console.error("Seed failed:", error);
	process.exit(1);
});
