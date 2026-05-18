import type { LogoCloudBlock as LogoCloudBlockType } from "@/shared/api/pages";
import { resolveCmsMediaUrl } from "@/shared/api/cms";
import { LogoCloud } from "@/shared/components/ui/logo-cloud";
import { logos as fallbackLogos } from "@/widgets/LogoPanel/const/const";

interface LogoCloudBlockProps {
	block: LogoCloudBlockType;
}

export const LogoCloudBlock = ({ block }: LogoCloudBlockProps) => {
	const logos =
		block.items
			?.map((item) => ({
				src: resolveCmsMediaUrl(
					item.logo?.formats?.small?.url ||
						item.logo?.formats?.thumbnail?.url ||
						item.logo?.url
				),
				alt: item.name,
			}))
			.filter((item): item is { src: string; alt: string } => Boolean(item.src)) || [];

	const finalLogos = logos.length > 0 ? logos : fallbackLogos;

	if (!finalLogos.length) return null;

	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-5xl text-center">
					{block.heading && (
						<h2 className="text-3xl font-semibold md:text-4xl">{block.heading}</h2>
					)}
					{block.description && (
						<p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
							{block.description}
						</p>
					)}
				</div>
				<LogoCloud logos={finalLogos} className="mt-10" />
			</div>
		</section>
	);
};
