import {
	Card,
	CardImage,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/shared/components/ui/card";
import type { ArticlePreview } from "@/shared/api/pages";
import {
	buildLocalizedCollectionPath,
	defaultSiteLocale,
	type SiteLocale,
} from "@/shared/i18n/config";

interface ArticleCardProps {
	article: ArticlePreview;
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

export const ArticleCard = ({
	article,
	locale = defaultSiteLocale,
}: ArticleCardProps) => {
	const coverUrl = resolveCoverUrl(
		article.cover?.formats?.small?.url || article.cover?.url
	);

	return (
		<a
			href={buildLocalizedCollectionPath(locale, "articles", article.slug)}
			className="block group h-full"
		>
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
			</Card>
		</a>
	);
};
