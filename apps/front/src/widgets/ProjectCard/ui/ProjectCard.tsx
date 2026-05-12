import { Badge } from "@/shared/components/ui/badge";
import {
	Card,
	CardImage,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/shared/components/ui/card";
import type { Project } from "@/shared/api/generated/types.gen";

interface ProjectCardProps {
	project: Project;
	baseUrl?: string;
}

const cmsBaseUrl = import.meta.env.PUBLIC_CMS_URL ?? "http://localhost:1337";

export const ProjectCard = ({ project, baseUrl = cmsBaseUrl }: ProjectCardProps) => {
	const coverUrl = project.cover?.url ? `${baseUrl}${project.cover.url}` : "/placeholder-image.svg";

	return (
		<a href={`/projects/${project.slug}`} className="block group h-full">
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
