import type { NumberedPointsBlock as NumberedPointsBlockType } from "@/shared/api/pages";

interface NumberedPointsBlockProps {
	block: NumberedPointsBlockType;
}

export const NumberedPointsBlock = ({ block }: NumberedPointsBlockProps) => {
	if (!block.items?.length) return null;

	return (
		<section className="py-16 md:py-20">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-5xl">
					{block.heading && (
						<h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{block.heading}</h2>
					)}
					{block.description && (
						<p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{block.description}</p>
					)}
					<div className="mt-10 grid gap-6 md:grid-cols-2">
						{block.items.map((item, index) => (
							<div
								key={`${item.title}-${index}`}
								className="rounded-2xl border border-border/70 bg-background/60 p-6"
							>
								<div className="flex items-start gap-4">
									<div className="min-w-10 rounded-full border border-border bg-muted px-3 py-2 text-sm font-semibold">
										{String(index + 1).padStart(2, "0")}
									</div>
									<div>
										<h3 className="text-lg font-semibold">{item.title}</h3>
										{item.description && (
											<p className="mt-2 text-sm leading-7 text-muted-foreground">
												{item.description}
											</p>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
