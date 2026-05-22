import {
	Card,
	CardImage,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/shared/components/ui/card";
import type { ProjectPreview } from "@/shared/api/pages";
import {
	buildLocalizedCollectionPath,
	defaultSiteLocale,
	type SiteLocale,
} from "@/shared/i18n/config";

interface ProjectCardProps {
	project: ProjectPreview;
	locale?: SiteLocale;
}

const cmsBaseUrl = import.meta.env.PUBLIC_CMS_URL ?? "http://localhost:1337";

const resolveCoverUrl = (url?: string) => {
	if (!url) {
		return "/placeholder-image.svg";
	}

	return url.startsWith("http://") || url.startsWith("https://")
		? url
		: `${cmsBaseUrl}${url}`;
};

export const ProjectCard = ({
	project,
	locale = defaultSiteLocale,
}: ProjectCardProps) => {
	const coverUrl = resolveCoverUrl(
		project.cover?.formats?.small?.url || project.cover?.url
	);

	return (
		<a
			href={buildLocalizedCollectionPath(locale, "projects", project.slug)}
			className="block group h-full"
		>
			<Card className="h-full flex flex-col hover:border-primary/70 transition-all duration-300">
				<CardImage
					src={coverUrl}
					alt={project.cover?.alternativeText || project.name}
					className="border-b"
				/>
				<CardHeader className="flex-1">
					<CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
						{project.name}
					</CardTitle>
					<CardDescription className="line-clamp-3 mt-2">
						{project.description}
					</CardDescription>
				</CardHeader>
			</Card>
		</a>
	);
};
