import type { SiteLocale } from "@/shared/i18n/config";

type CollectionPageCopy = {
	listTitle: string;
	listDescription: string;
	emptyTitle: string;
	emptyDescription: string;
	detailFallbackTitle: string;
	notFoundMessage: string;
};

type ContentCollectionsCopy = {
	articles: CollectionPageCopy;
	projects: CollectionPageCopy;
};

const copy: Record<SiteLocale, ContentCollectionsCopy> = {
	ru: {
		articles: {
			listTitle: "Статьи",
			listDescription:
				"Все публикации о технологиях, разработке и лучших практиках.",
			emptyTitle: "Статьи пока не опубликованы",
			emptyDescription:
				"Следите за обновлениями, скоро здесь появятся интересные материалы.",
			detailFallbackTitle: "Статья",
			notFoundMessage: "Статья не найдена.",
		},
		projects: {
			listTitle: "Проекты",
			listDescription:
				"Портфолио выполненных проектов и прикладных разработок.",
			emptyTitle: "Проекты пока не опубликованы",
			emptyDescription:
				"Следите за обновлениями, скоро здесь появятся новые проекты.",
			detailFallbackTitle: "Проект",
			notFoundMessage: "Проект не найден.",
		},
	},
	en: {
		articles: {
			listTitle: "Articles",
			listDescription:
				"All publications about technology, engineering, and delivery practices.",
			emptyTitle: "No articles have been published yet",
			emptyDescription:
				"Check back later, new materials will appear here soon.",
			detailFallbackTitle: "Article",
			notFoundMessage: "Article not found.",
		},
		projects: {
			listTitle: "Projects",
			listDescription:
				"A portfolio of delivered projects and practical engineering work.",
			emptyTitle: "No projects have been published yet",
			emptyDescription:
				"Check back later, new projects will appear here soon.",
			detailFallbackTitle: "Project",
			notFoundMessage: "Project not found.",
		},
	},
};

export const getContentCollectionsCopy = (
	locale: SiteLocale = "ru"
) => copy[locale];
