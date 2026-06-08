import type {
	EmploymentType,
	Vacancy,
	VacancyLevel,
	WorkFormat,
} from "@/shared/api/vacancies";
import type { SiteLocale } from "@/shared/i18n/config";

type VacancyUiCopy = {
	listTitle: string;
	listDescription: string;
	heroEyebrow: string;
	heroTitle: string;
	heroDescription: string;
	backToListLabel: string;
	notFoundMessage: string;
	notFoundTitle: string;
	notFoundDescription: string;
	detailFallbackTitle: string;
	detailFallbackDescription: string;
	detailDescriptionHeading: string;
	workFormatLabel: string;
	employmentTypeLabel: string;
	levelLabel: string;
	salaryLabel: string;
	salaryNegotiable: string;
	salaryFromPrefix: string;
	salaryToPrefix: string;
	cardOpenLabel: string;
	workFormats: Record<WorkFormat, string>;
	employmentTypes: Record<EmploymentType, string>;
	levels: Record<VacancyLevel, string>;
	explorer: {
		mobileFiltersLabel: string;
		filtersTitle: string;
		resetLabel: string;
		foundLabel: string;
		searchLabel: string;
		searchPlaceholder: string;
		industryLabel: string;
		allIndustriesLabel: string;
		roleLabel: string;
		allRolesLabel: string;
		locationLabel: string;
		locationPlaceholder: string;
		workFormatLabel: string;
		employmentTypeLabel: string;
		levelLabel: string;
		anyWorkFormatLabel: string;
		anyEmploymentTypeLabel: string;
		anyLevelLabel: string;
		loadingError: string;
		emptyTitle: string;
		emptyDescription: string;
		previousPageLabel: string;
		nextPageLabel: string;
		pageLabel: (page: number, pageCount: number) => string;
		activeFilterLabels: {
			q: string;
			industry: string;
			role: string;
			location: string;
			workFormat: string;
			employmentType: string;
			level: string;
		};
	};
};

const copy: Record<SiteLocale, VacancyUiCopy> = {
	ru: {
		listTitle: "Вакансии",
		listDescription:
			"Каталог вакансий с фильтрацией по отрасли, роли, формату работы и уровню.",
		heroEyebrow: "Карьера",
		heroTitle: "Вакансии в IT и других сферах бизнеса",
		heroDescription:
			"Подбирайте подходящие роли по отрасли, формату работы и уровню. Отклик отправляется напрямую в HR-команду через единый процесс.",
		backToListLabel: "Все вакансии",
		notFoundMessage: "Вакансия не найдена.",
		notFoundTitle: "Вакансия не найдена",
		notFoundDescription:
			"Проверьте ссылку или вернитесь к списку вакансий.",
		detailFallbackTitle: "Вакансия",
		detailFallbackDescription: "Карьерная страница вакансии.",
		detailDescriptionHeading: "Описание вакансии",
		workFormatLabel: "Формат",
		employmentTypeLabel: "Занятость",
		levelLabel: "Уровень",
		salaryLabel: "Зарплата",
		salaryNegotiable: "По договоренности",
		salaryFromPrefix: "от",
		salaryToPrefix: "до",
		cardOpenLabel: "Открыть вакансию",
		workFormats: {
			remote: "Удаленно",
			hybrid: "Гибрид",
			office: "Офис",
		},
		employmentTypes: {
			full_time: "Полная занятость",
			contract: "Контракт",
			internship: "Стажировка",
		},
		levels: {
			intern: "Intern",
			junior: "Junior",
			middle: "Middle",
			senior: "Senior",
			lead: "Lead",
		},
		explorer: {
			mobileFiltersLabel: "Фильтры вакансий",
			filtersTitle: "Фильтры",
			resetLabel: "Сбросить",
			foundLabel: "Найдено вакансий",
			searchLabel: "Поиск",
			searchPlaceholder: "Название вакансии или ключевое слово",
			industryLabel: "Отрасль",
			allIndustriesLabel: "Все отрасли",
			roleLabel: "Роль",
			allRolesLabel: "Все роли",
			locationLabel: "Локация",
			locationPlaceholder: "Москва, Санкт-Петербург...",
			workFormatLabel: "Формат работы",
			employmentTypeLabel: "Тип занятости",
			levelLabel: "Уровень",
			anyWorkFormatLabel: "Любой формат",
			anyEmploymentTypeLabel: "Любой тип",
			anyLevelLabel: "Любой уровень",
			loadingError: "Не удалось загрузить вакансии. Попробуйте позже.",
			emptyTitle: "Вакансии не найдены",
			emptyDescription: "Попробуйте изменить фильтры или вернитесь позже.",
			previousPageLabel: "Назад",
			nextPageLabel: "Далее",
			pageLabel: (page, pageCount) => `Страница ${page} из ${pageCount}`,
			activeFilterLabels: {
				q: "Поиск",
				industry: "Отрасль",
				role: "Роль",
				location: "Локация",
				workFormat: "Формат",
				employmentType: "Занятость",
				level: "Уровень",
			},
		},
	},
	en: {
		listTitle: "Vacancies",
		listDescription:
			"Browse open roles by industry, work mode, employment type, and seniority.",
		heroEyebrow: "Careers",
		heroTitle: "Open roles across technology and modern business teams",
		heroDescription:
			"Filter opportunities by industry, work mode, and seniority. Applications go directly to the hiring team through a single review flow.",
		backToListLabel: "All vacancies",
		notFoundMessage: "Vacancy not found.",
		notFoundTitle: "Vacancy not found",
		notFoundDescription:
			"Check the URL or return to the vacancies list.",
		detailFallbackTitle: "Vacancy",
		detailFallbackDescription: "Career page for the selected role.",
		detailDescriptionHeading: "Job description",
		workFormatLabel: "Work mode",
		employmentTypeLabel: "Employment",
		levelLabel: "Level",
		salaryLabel: "Compensation",
		salaryNegotiable: "Negotiable",
		salaryFromPrefix: "from",
		salaryToPrefix: "up to",
		cardOpenLabel: "Open vacancy",
		workFormats: {
			remote: "Remote",
			hybrid: "Hybrid",
			office: "Office",
		},
		employmentTypes: {
			full_time: "Full-time",
			contract: "Contract",
			internship: "Internship",
		},
		levels: {
			intern: "Intern",
			junior: "Junior",
			middle: "Middle",
			senior: "Senior",
			lead: "Lead",
		},
		explorer: {
			mobileFiltersLabel: "Vacancy filters",
			filtersTitle: "Filters",
			resetLabel: "Clear",
			foundLabel: "Vacancies found",
			searchLabel: "Search",
			searchPlaceholder: "Vacancy title or keyword",
			industryLabel: "Industry",
			allIndustriesLabel: "All industries",
			roleLabel: "Role",
			allRolesLabel: "All roles",
			locationLabel: "Location",
			locationPlaceholder: "London, Berlin...",
			workFormatLabel: "Work mode",
			employmentTypeLabel: "Employment type",
			levelLabel: "Level",
			anyWorkFormatLabel: "Any work mode",
			anyEmploymentTypeLabel: "Any type",
			anyLevelLabel: "Any level",
			loadingError: "Unable to load vacancies. Please try again later.",
			emptyTitle: "No vacancies found",
			emptyDescription: "Try adjusting the filters or check back later.",
			previousPageLabel: "Previous",
			nextPageLabel: "Next",
			pageLabel: (page, pageCount) => `Page ${page} of ${pageCount}`,
			activeFilterLabels: {
				q: "Search",
				industry: "Industry",
				role: "Role",
				location: "Location",
				workFormat: "Work mode",
				employmentType: "Employment",
				level: "Level",
			},
		},
	},
};

const numberLocaleMap: Record<SiteLocale, string> = {
	ru: "ru-RU",
	en: "en-US",
};

export const getVacancyUiCopy = (locale: SiteLocale = "ru") => copy[locale];

export const formatVacancySalary = (
	vacancy: Vacancy,
	locale: SiteLocale = "ru"
) => {
	const copy = getVacancyUiCopy(locale);

	if (!vacancy.salaryFrom && !vacancy.salaryTo) {
		return copy.salaryNegotiable;
	}

	const currency = vacancy.currency || "RUB";
	const formatter = new Intl.NumberFormat(numberLocaleMap[locale]);
	const from = vacancy.salaryFrom ? formatter.format(vacancy.salaryFrom) : null;
	const to = vacancy.salaryTo ? formatter.format(vacancy.salaryTo) : null;

	if (from && to) return `${from} - ${to} ${currency}`;
	if (from) return `${copy.salaryFromPrefix} ${from} ${currency}`;
	return `${copy.salaryToPrefix} ${to} ${currency}`;
};

