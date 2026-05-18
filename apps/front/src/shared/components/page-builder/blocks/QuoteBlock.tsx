import type { QuoteBlock as QuoteBlockType } from "@/shared/api/pages";

interface QuoteBlockProps {
	block: QuoteBlockType;
}

export const QuoteBlock = ({ block }: QuoteBlockProps) => {
	return (
		<section className="py-16 md:py-20">
			<div className="container mx-auto px-4">
				<figure className="mx-auto max-w-4xl rounded-3xl border border-border/70 bg-muted/35 px-8 py-10 md:px-12 md:py-14">
					<blockquote className="text-2xl font-medium leading-relaxed tracking-tight md:text-4xl">
						“{block.quote}”
					</blockquote>
					{(block.authorName || block.authorRole || block.sourceLabel) && (
						<figcaption className="mt-8 flex flex-col gap-1 text-sm text-muted-foreground md:text-base">
							{block.authorName && <span className="font-medium text-foreground">{block.authorName}</span>}
							{block.authorRole && <span>{block.authorRole}</span>}
							{block.sourceLabel && (
								<span className="uppercase tracking-[0.22em] text-xs">{block.sourceLabel}</span>
							)}
						</figcaption>
					)}
				</figure>
			</div>
		</section>
	);
};
