import type { StatsBlock as StatsBlockType } from "@/shared/api/pages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface StatsBlockProps {
	block: StatsBlockType;
}

export const StatsBlock = ({ block }: StatsBlockProps) => {
	if (!block.items?.length) return null;

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-3xl text-center">
					{block.heading && (
						<h2 className="text-3xl font-semibold md:text-5xl">{block.heading}</h2>
					)}
					{block.description && (
						<p className="mt-4 text-muted-foreground md:text-lg">{block.description}</p>
					)}
				</div>

				<div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
					{block.items.map((item, index) => (
						<Card key={`${item.label}-${index}`} className="h-full border-border/70">
							<CardHeader>
								<CardDescription>{item.label}</CardDescription>
								<CardTitle className="text-4xl md:text-5xl">{item.value}</CardTitle>
							</CardHeader>
							{item.description && (
								<CardContent>
									<p className="text-sm text-muted-foreground">{item.description}</p>
								</CardContent>
							)}
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};
