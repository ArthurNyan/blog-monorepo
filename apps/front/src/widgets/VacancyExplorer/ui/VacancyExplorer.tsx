import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { EmptyState } from "@/shared/components/EmptyState";
import {
	fetchIndustries,
	fetchJobRoles,
	fetchVacancies,
	type TaxonomyItem,
	type Vacancy,
} from "@/shared/api/vacancies";
import { VacancyCard } from "@/widgets/VacancyCard";

type Filters = {
	q: string;
	industry: string;
	role: string;
	location: string;
	workFormat: string;
	employmentType: string;
	level: string;
};

type PaginationState = {
	page: number;
	pageCount: number;
	total: number;
};

const defaultFilters: Filters = {
	q: "",
	industry: "",
	role: "",
	location: "",
	workFormat: "",
	employmentType: "",
	level: "",
};

type VacancyExplorerProps = {
	initialFilters?: Partial<Filters>;
	initialPage?: number;
};

const WORK_FORMAT_OPTIONS = [
	{ value: "", label: "Любой формат" },
	{ value: "remote", label: "Удаленно" },
	{ value: "hybrid", label: "Гибрид" },
	{ value: "office", label: "Офис" },
];

const EMPLOYMENT_TYPE_OPTIONS = [
	{ value: "", label: "Любой тип" },
	{ value: "full_time", label: "Полная занятость" },
	{ value: "part_time", label: "Частичная занятость" },
	{ value: "contract", label: "Контракт" },
	{ value: "internship", label: "Стажировка" },
];

const LEVEL_OPTIONS = [
	{ value: "", label: "Любой уровень" },
	{ value: "intern", label: "Intern" },
	{ value: "junior", label: "Junior" },
	{ value: "middle", label: "Middle" },
	{ value: "senior", label: "Senior" },
	{ value: "lead", label: "Lead" },
];

const FILTER_LABELS: Record<keyof Filters, string> = {
	q: "Поиск",
	industry: "Отрасль",
	role: "Роль",
	location: "Локация",
	workFormat: "Формат",
	employmentType: "Занятость",
	level: "Уровень",
};

const normalizeFilters = (filters?: Partial<Filters>): Filters => ({
	q: filters?.q || "",
	industry: filters?.industry || "",
	role: filters?.role || "",
	location: filters?.location || "",
	workFormat: filters?.workFormat || "",
	employmentType: filters?.employmentType || "",
	level: filters?.level || "",
});

const parseFiltersFromUrl = (): { filters: Filters; page: number } => {
	if (typeof window === "undefined") {
		return { filters: defaultFilters, page: 1 };
	}

	const params = new URLSearchParams(window.location.search);
	return {
		filters: normalizeFilters({
			q: params.get("q") || "",
			industry: params.get("industry") || "",
			role: params.get("role") || "",
			location: params.get("location") || "",
			workFormat: params.get("workFormat") || "",
			employmentType: params.get("employmentType") || "",
			level: params.get("level") || "",
		}),
		page: Math.max(1, Number(params.get("page") || 1)),
	};
};

const FilterControls = ({
	filters,
	industries,
	roles,
	onChange,
}: {
	filters: Filters;
	industries: TaxonomyItem[];
	roles: TaxonomyItem[];
	onChange: (key: keyof Filters, value: string) => void;
}) => {
	return (
		<div className="space-y-4">
			<label className="block space-y-2 text-sm">
				<span className="text-muted-foreground">Поиск</span>
				<input
					value={filters.q}
					onChange={(event) => onChange("q", event.target.value)}
					placeholder="Название вакансии или ключевое слово"
					className="w-full rounded-md border border-input bg-background px-3 py-2"
				/>
			</label>

			<label className="block space-y-2 text-sm">
				<span className="text-muted-foreground">Отрасль</span>
				<select
					value={filters.industry}
					onChange={(event) => onChange("industry", event.target.value)}
					className="w-full rounded-md border border-input bg-background px-3 py-2"
				>
					<option value="">Все отрасли</option>
					{industries.map((industry) => (
						<option key={industry.slug} value={industry.slug}>
							{industry.name}
						</option>
					))}
				</select>
			</label>

			<label className="block space-y-2 text-sm">
				<span className="text-muted-foreground">Роль</span>
				<select
					value={filters.role}
					onChange={(event) => onChange("role", event.target.value)}
					className="w-full rounded-md border border-input bg-background px-3 py-2"
				>
					<option value="">Все роли</option>
					{roles.map((role) => (
						<option key={role.slug} value={role.slug}>
							{role.name}
						</option>
					))}
				</select>
			</label>

			<label className="block space-y-2 text-sm">
				<span className="text-muted-foreground">Локация</span>
				<input
					value={filters.location}
					onChange={(event) => onChange("location", event.target.value)}
					placeholder="Москва, Санкт-Петербург..."
					className="w-full rounded-md border border-input bg-background px-3 py-2"
				/>
			</label>

			<label className="block space-y-2 text-sm">
				<span className="text-muted-foreground">Формат работы</span>
				<select
					value={filters.workFormat}
					onChange={(event) => onChange("workFormat", event.target.value)}
					className="w-full rounded-md border border-input bg-background px-3 py-2"
				>
					{WORK_FORMAT_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</label>

			<label className="block space-y-2 text-sm">
				<span className="text-muted-foreground">Тип занятости</span>
				<select
					value={filters.employmentType}
					onChange={(event) => onChange("employmentType", event.target.value)}
					className="w-full rounded-md border border-input bg-background px-3 py-2"
				>
					{EMPLOYMENT_TYPE_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</label>

			<label className="block space-y-2 text-sm">
				<span className="text-muted-foreground">Уровень</span>
				<select
					value={filters.level}
					onChange={(event) => onChange("level", event.target.value)}
					className="w-full rounded-md border border-input bg-background px-3 py-2"
				>
					{LEVEL_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};

export const VacancyExplorer = ({
	initialFilters,
	initialPage = 1,
}: VacancyExplorerProps) => {
	const [{ filters, page }, setQueryState] = useState(() => ({
		filters: normalizeFilters(initialFilters),
		page: Math.max(1, initialPage),
	}));
	const [vacancies, setVacancies] = useState<Vacancy[]>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		page: Math.max(1, initialPage),
		pageCount: 1,
		total: 0,
	});
	const [industries, setIndustries] = useState<TaxonomyItem[]>([]);
	const [roles, setRoles] = useState<TaxonomyItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const activeFilters = useMemo(
		() =>
			Object.entries(filters).filter(
				([, value]) => typeof value === "string" && value.trim().length > 0
			),
		[filters]
	);

	useEffect(() => {
		const onPopState = () => {
			setQueryState(parseFiltersFromUrl());
		};
		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, []);

	useEffect(() => {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(filters)) {
			if (value.trim()) {
				params.set(key, value.trim());
			}
		}
		if (page > 1) {
			params.set("page", String(page));
		}

		const queryString = params.toString();
		const nextUrl = queryString
			? `${window.location.pathname}?${queryString}`
			: window.location.pathname;
		window.history.replaceState(null, "", nextUrl);
	}, [filters, page]);

	useEffect(() => {
		let isCancelled = false;

		const loadVacancies = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const result = await fetchVacancies({
					...filters,
					page,
					pageSize: 9,
					sort: "publishedAt:desc",
				});
				if (isCancelled) return;

				setVacancies(result.items);
				setPagination({
					page: result.pagination.page,
					pageCount: result.pagination.pageCount,
					total: result.pagination.total,
				});
			} catch (requestError) {
				if (isCancelled) return;
				const message =
					requestError instanceof Error
						? requestError.message
						: "Ошибка загрузки вакансий";
				setError(message);
			} finally {
				if (!isCancelled) {
					setIsLoading(false);
				}
			}
		};

		loadVacancies();

		return () => {
			isCancelled = true;
		};
	}, [filters, page]);

	useEffect(() => {
		let isCancelled = false;
		const loadTaxonomy = async () => {
			try {
				const [industriesList, rolesList] = await Promise.all([
					fetchIndustries(),
					fetchJobRoles(),
				]);
				if (isCancelled) return;
				setIndustries(industriesList);
				setRoles(rolesList);
			} catch {
				// keep UI usable even when taxonomy endpoints are temporarily unavailable
			}
		};
		loadTaxonomy();

		return () => {
			isCancelled = true;
		};
	}, []);

	const onFilterChange = (key: keyof Filters, value: string) => {
		setQueryState((prev) => ({
			...prev,
			page: 1,
			filters: {
				...prev.filters,
				[key]: value,
			},
		}));
	};

	const clearFilters = () => {
		setQueryState({
			page: 1,
			filters: defaultFilters,
		});
	};

	return (
		<div className="space-y-6">
			<details className="md:hidden rounded-xl border border-border bg-card/60 p-4">
				<summary className="cursor-pointer font-medium">Фильтры вакансий</summary>
				<div className="mt-4">
					<FilterControls
						filters={filters}
						industries={industries}
						roles={roles}
						onChange={onFilterChange}
					/>
				</div>
			</details>

			<div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
				<aside className="hidden md:block rounded-2xl border border-border bg-card/60 p-5 h-max sticky top-24">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold">Фильтры</h2>
						{activeFilters.length > 0 && (
							<button className="text-sm text-primary cursor-pointer" onClick={clearFilters}>
								Сбросить
							</button>
						)}
					</div>
					<FilterControls
						filters={filters}
						industries={industries}
						roles={roles}
						onChange={onFilterChange}
					/>
				</aside>

				<section>
					<div className="rounded-2xl border border-border bg-card/40 p-4 md:p-5">
						<div className="flex flex-wrap items-center gap-2 mb-3">
							{activeFilters.map(([key, value]) => (
								<button
									key={key}
									onClick={() => onFilterChange(key as keyof Filters, "")}
									className="cursor-pointer"
								>
									<Badge variant="outline">
										{`${FILTER_LABELS[key as keyof Filters]}: ${value} ×`}
									</Badge>
								</button>
							))}
						</div>
						<div className="text-sm text-muted-foreground">
							Найдено вакансий: <span className="font-semibold text-foreground">{pagination.total}</span>
						</div>
					</div>

					{isLoading ? (
						<div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
							{Array.from({ length: 6 }).map((_, index) => (
								<div
									key={index}
									className="h-56 rounded-xl border border-border bg-card/40 animate-pulse"
								/>
							))}
						</div>
					) : error ? (
						<div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive">
							{error}
						</div>
					) : vacancies.length === 0 ? (
						<div className="mt-6">
							<EmptyState
								title="Вакансии не найдены"
								description="Попробуйте изменить фильтры или вернитесь позже."
							/>
						</div>
					) : (
						<>
							<div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
								{vacancies.map((vacancy) => (
									<VacancyCard key={vacancy.documentId || vacancy.slug} vacancy={vacancy} />
								))}
							</div>
							<div className="mt-6 flex items-center justify-center gap-3">
								<Button
									variant="outline"
									disabled={page <= 1}
									onClick={() => setQueryState((prev) => ({ ...prev, page: prev.page - 1 }))}
								>
									Назад
								</Button>
								<span className="text-sm text-muted-foreground">
									Страница {page} из {Math.max(1, pagination.pageCount)}
								</span>
								<Button
									variant="outline"
									disabled={page >= pagination.pageCount}
									onClick={() => setQueryState((prev) => ({ ...prev, page: prev.page + 1 }))}
								>
									Далее
								</Button>
							</div>
						</>
					)}
				</section>
			</div>
		</div>
	);
};
