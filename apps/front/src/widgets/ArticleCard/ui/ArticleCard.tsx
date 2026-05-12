import {
	Card,
	CardImage,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/shared/components/ui/card";
import type { Article } from "@/shared/api/generated/types.gen";

interface ArticleCardProps {
	article: Article;
	baseUrl?: string;
}

const cmsBaseUrl = import.meta.env.PUBLIC_CMS_URL ?? "http://localhost:1337";

export const ArticleCard = ({ article, baseUrl = cmsBaseUrl }: ArticleCardProps) => {
	// TODO: fix this
	// @ts-ignore 
	const coverUrl = article.cover.formats ? `${baseUrl}${article.cover.formats?.small?.url}` : "/placeholder-image.svg";
	// const formattedDate = article.date ? new Date(article.date).toLocaleDateString("ru-RU", {
	// 	year: "numeric",
	// 	month: "long",
	// 	day: "numeric",
	// }) : null;

	return (
		<a href={`/articles/${article.slug}`} className="block group h-full">
			<Card className="h-full flex flex-col hover:border-primary/70 transition-all duration-300">
				<CardImage
					src={coverUrl}
					alt={article.cover?.alternativeText || article.name}
					className="border-b"
				/>
				<CardHeader className="flex-1">
					<CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
						{article.name}
					</CardTitle>
					<CardDescription className="line-clamp-3 mt-2">
						{article.description}
					</CardDescription>
				</CardHeader>
				{/* {(formattedDate || (article.authors && article.authors.length > 0)) && (
					<CardFooter className="flex-wrap gap-2 border-t pt-4">
						{formattedDate && (
							<Badge variant="outline" className="text-xs">
								{formattedDate}
							</Badge>
						)}
						{article.authors && article.authors.length > 0 && (
							<Badge variant="secondary" className="text-xs">
								{article.authors.length} {article.authors.length === 1 ? "автор" : "автора"}
							</Badge>
						)}
					</CardFooter>
				)} */}
			</Card>
		</a>
	);
};
