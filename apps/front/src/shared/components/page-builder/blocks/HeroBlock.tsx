import { Suspense, lazy } from "react";
import { motion } from "motion/react";
import { Button } from "@/shared/components/ui/button";
import type { HeroBlock as HeroBlockType } from "@/shared/api/pages";
import { resolveCmsMediaUrl } from "@/shared/api/cms";

const PixelBlast = lazy(() =>
	import("@/shared/components/background/PixelBlast").then((module) => ({
		default: module.PixelBlast,
	}))
);

interface HeroBlockProps {
	block: HeroBlockType;
}

export const HeroBlock = ({ block }: HeroBlockProps) => {
	const mediaUrl = resolveCmsMediaUrl(
		block.media?.formats?.large?.url ||
			block.media?.formats?.medium?.url ||
			block.media?.url
	);

	return (
		<section className="relative isolate overflow-hidden py-24 md:py-32">
			<div className="absolute inset-0">
				<Suspense>
					<PixelBlast
						variant="square"
						pixelSize={4}
						color="#42b860"
						patternScale={3.25}
						patternDensity={0.7}
						pixelSizeJitter={0}
						enableRipples
						rippleSpeed={0.4}
						rippleThickness={0.12}
						rippleIntensityScale={1.5}
						liquid={false}
						liquidStrength={0.12}
						liquidRadius={1.2}
						liquidWobbleSpeed={5}
						speed={0.5}
						edgeFade={0.25}
						transparent
					/>
				</Suspense>
				<div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
			</div>

			<div className="container relative z-10 mx-auto px-4">
				<div className="mx-auto flex max-w-6xl flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-center">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="flex flex-col gap-6"
					>
						{block.eyebrow && (
							<div className="w-fit rounded-full border border-border/70 bg-background/70 px-4 py-1 text-sm text-muted-foreground backdrop-blur">
								{block.eyebrow}
							</div>
						)}

						<h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl">
							{block.title}
						</h1>

						{block.description && (
							<p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
								{block.description}
							</p>
						)}

						<div className="flex flex-wrap gap-4">
							{block.primaryButtonLabel && block.primaryButtonUrl && (
								<a href={block.primaryButtonUrl}>
									<Button size="lg" className="text-base">
										{block.primaryButtonLabel}
									</Button>
								</a>
							)}
							{block.secondaryButtonLabel && block.secondaryButtonUrl && (
								<a href={block.secondaryButtonUrl}>
									<Button size="lg" variant="secondary" className="text-base">
										{block.secondaryButtonLabel}
									</Button>
								</a>
							)}
						</div>
					</motion.div>

					{mediaUrl && (
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-2xl shadow-black/10 backdrop-blur"
						>
							<img
								src={mediaUrl}
								alt={block.media?.alternativeText || block.title}
								className="aspect-[4/3] h-full w-full object-cover"
							/>
						</motion.div>
					)}
				</div>
			</div>
		</section>
	);
};
