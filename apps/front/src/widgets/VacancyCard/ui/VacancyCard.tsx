import { Badge } from "@/shared/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import type { Vacancy } from "@/shared/api/vacancies";
import {
	buildLocalizedCollectionPath,
	type SiteLocale,
} from "@/shared/i18n/config";
import {
	formatVacancySalary,
	getVacancyUiCopy,
} from "@/shared/i18n/vacancies";

interface VacancyCardProps {
	vacancy: Vacancy;
	locale?: SiteLocale;
}

export const VacancyCard = ({
	vacancy,
	locale = "ru",
}: VacancyCardProps) => {
	const copy = getVacancyUiCopy(locale);

	return (
		<a
			href={buildLocalizedCollectionPath(locale, "vacancies", vacancy.slug)}
			className="block group h-full"
		>
			<Card className="h-full flex flex-col border-border/70 hover:border-primary/60 bg-card/80 backdrop-blur-sm">
				<CardHeader className="space-y-3">
					<div className="flex flex-wrap gap-2">
						{vacancy.industry?.name && (
							<Badge variant="secondary" className="text-[11px] uppercase tracking-wide">
								{vacancy.industry.name}
							</Badge>
						)}
						{vacancy.role?.name && (
							<Badge variant="outline" className="text-[11px] uppercase tracking-wide">
								{vacancy.role.name}
							</Badge>
						)}
					</div>
					<CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
						{vacancy.title}
					</CardTitle>
					<CardDescription className="text-sm line-clamp-2">
						{vacancy.location}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-1 pt-0">
					<div className="text-lg font-semibold">
						{formatVacancySalary(vacancy, locale)}
					</div>
					<div className="mt-4 flex flex-wrap gap-2 text-xs">
						<Badge variant="outline">
							{copy.workFormats[vacancy.workFormat as keyof typeof copy.workFormats] ||
								vacancy.workFormat}
						</Badge>
						<Badge variant="outline">
							{copy.employmentTypes[
								vacancy.employmentType as keyof typeof copy.employmentTypes
							] ||
								vacancy.employmentType}
						</Badge>
						<Badge variant="outline">
							{copy.levels[vacancy.level as keyof typeof copy.levels] ||
								vacancy.level}
						</Badge>
					</div>
				</CardContent>
				<CardFooter>
					<span className="text-sm text-primary font-medium group-hover:translate-x-0.5 transition-transform">
						{copy.cardOpenLabel} →
					</span>
				</CardFooter>
			</Card>
		</a>
	);
};
