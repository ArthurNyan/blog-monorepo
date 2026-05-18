import type { CtaBlock as CtaBlockType } from "@/shared/api/pages";
import { Button } from "@/shared/components/ui/button";

interface CtaBlockProps {
	block: CtaBlockType;
}

export const CtaBlock = ({ block }: CtaBlockProps) => {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-border/70 bg-muted/40 px-8 py-12 text-center shadow-sm md:px-14 md:py-16">
					<h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
						{block.title}
					</h2>
					{block.description && (
						<p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
							{block.description}
						</p>
					)}
					<div className="flex flex-wrap items-center justify-center gap-4">
						{block.primaryButtonLabel && block.primaryButtonUrl && (
							<a href={block.primaryButtonUrl}>
								<Button size="lg">{block.primaryButtonLabel}</Button>
							</a>
						)}
						{block.secondaryButtonLabel && block.secondaryButtonUrl && (
							<a href={block.secondaryButtonUrl}>
								<Button size="lg" variant="outline">
									{block.secondaryButtonLabel}
								</Button>
							</a>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
