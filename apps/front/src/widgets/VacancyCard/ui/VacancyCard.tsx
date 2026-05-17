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

interface VacancyCardProps {
	vacancy: Vacancy;
}

const WORK_FORMAT_LABELS: Record<string, string> = {
	remote: "Удаленно",
	hybrid: "Гибрид",
	office: "Офис",
};

const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
	full_time: "Полная занятость",
	part_time: "Частичная занятость",
	contract: "Контракт",
	internship: "Стажировка",
};

const LEVEL_LABELS: Record<string, string> = {
	intern: "Intern",
	junior: "Junior",
	middle: "Middle",
	senior: "Senior",
	lead: "Lead",
};

const formatSalary = (vacancy: Vacancy) => {
	if (!vacancy.salaryFrom && !vacancy.salaryTo) {
		return "По договоренности";
	}

	const currency = vacancy.currency || "RUB";
	const formatter = new Intl.NumberFormat("ru-RU");
	const from = vacancy.salaryFrom ? formatter.format(vacancy.salaryFrom) : null;
	const to = vacancy.salaryTo ? formatter.format(vacancy.salaryTo) : null;

	if (from && to) return `${from} - ${to} ${currency}`;
	if (from) return `от ${from} ${currency}`;
	return `до ${to} ${currency}`;
};

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
	return (
		<a href={`/vacancies/${vacancy.slug}`} className="block group h-full">
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
					<div className="text-lg font-semibold">{formatSalary(vacancy)}</div>
					<div className="mt-4 flex flex-wrap gap-2 text-xs">
						<Badge variant="outline">{WORK_FORMAT_LABELS[vacancy.workFormat] || vacancy.workFormat}</Badge>
						<Badge variant="outline">
							{EMPLOYMENT_TYPE_LABELS[vacancy.employmentType] || vacancy.employmentType}
						</Badge>
						<Badge variant="outline">{LEVEL_LABELS[vacancy.level] || vacancy.level}</Badge>
					</div>
				</CardContent>
				<CardFooter>
					<span className="text-sm text-primary font-medium group-hover:translate-x-0.5 transition-transform">
						Открыть вакансию →
					</span>
				</CardFooter>
			</Card>
		</a>
	);
};
