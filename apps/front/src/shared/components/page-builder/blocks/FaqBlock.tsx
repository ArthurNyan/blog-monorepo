import type { FaqBlock as FaqBlockType } from "@/shared/api/pages";
import AccordionIndexed from "@/components/ruixen/accordion-indexed";

interface FaqBlockProps {
	block: FaqBlockType;
}

export const FaqBlock = ({ block }: FaqBlockProps) => {
	if (!block.items?.length) return null;

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="mx-auto mb-10 max-w-3xl text-center">
					{block.heading && (
						<h2 className="text-3xl font-semibold md:text-5xl">{block.heading}</h2>
					)}
					{block.description && (
						<p className="mt-4 text-muted-foreground md:text-lg">{block.description}</p>
					)}
				</div>
				<AccordionIndexed
					items={block.items.map((item, index) => ({
						id: `faq-${index + 1}`,
						title: item.question,
						content: item.answer,
					}))}
					defaultValue="faq-1"
					className="max-w-3xl"
				/>
			</div>
		</section>
	);
};
