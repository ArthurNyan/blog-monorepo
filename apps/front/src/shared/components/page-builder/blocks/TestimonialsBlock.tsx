import type { TestimonialsBlock as TestimonialsBlockType } from "@/shared/api/pages";
import { resolveCmsMediaUrl } from "@/shared/api/cms";
import { TestimonialsColumn, type Testimonial } from "@/shared/components/blocks/testimonials-columns";

interface TestimonialsBlockProps {
	block: TestimonialsBlockType;
}

const chunkTestimonials = (items: Testimonial[]) => {
	const first = items.filter((_, index) => index % 3 === 0 || index % 3 === 1);
	const second = items.filter((_, index) => index % 3 === 2 || index % 3 === 0);
	const third = items.filter((_, index) => index % 3 === 1 || index % 3 === 2);
	return [first, second, third];
};

export const TestimonialsBlock = ({ block }: TestimonialsBlockProps) => {
	const testimonials =
		block.items?.map((item) => ({
			text: item.quote,
			image:
				resolveCmsMediaUrl(
					item.avatar?.formats?.thumbnail?.url || item.avatar?.url
				) || "https://placehold.co/80x80/png",
			name: item.authorName,
			role: [item.authorRole, item.company].filter(Boolean).join(", "),
		})) || [];

	if (!testimonials.length) return null;

	const [firstColumn, secondColumn, thirdColumn] = chunkTestimonials(testimonials);

	return (
		<section className="bg-background py-20">
			<div className="container z-10 mx-auto px-4">
				<div className="mx-auto flex max-w-[540px] flex-col items-center justify-center">
					{block.heading && (
						<h2 className="text-center text-3xl font-bold tracking-tighter md:text-5xl">
							{block.heading}
						</h2>
					)}
					{block.description && (
						<p className="mt-5 text-center text-muted-foreground">{block.description}</p>
					)}
				</div>

				<div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
					<TestimonialsColumn testimonials={firstColumn} duration={15} />
					<TestimonialsColumn
						testimonials={secondColumn}
						className="hidden md:block"
						duration={19}
					/>
					<TestimonialsColumn
						testimonials={thirdColumn}
						className="hidden lg:block"
						duration={17}
					/>
				</div>
			</div>
		</section>
	);
};
