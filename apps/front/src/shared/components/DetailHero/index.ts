export { DetailHero } from "./DetailHero";
export type { DetailHeroProps, Author, CoverImage, LogoImage } from "./types";

// Хелперы для создания пропсов из типов API
import type { Article, Project } from "@/shared/api/generated";
import type { DetailHeroProps } from "./types";

export const createArticleHeroProps = (article: Article): DetailHeroProps => ({
	title: article.name,
	description: article.description,
	date: article.date,
	cover: article.cover,
	authors: article.authors,
});

export const createProjectHeroProps = (project: Project): DetailHeroProps => ({
	title: project.name,
	description: project.description,
	date: project.date,
	cover: project.cover,
	logo: project.logo,
});
