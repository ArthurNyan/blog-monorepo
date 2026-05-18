import { LayoutTemplate, Search, Sparkles } from "lucide-react";
import type { FeatureHighlightBlock as FeatureHighlightBlockType } from "@/shared/api/pages";
import { resolveCmsMediaUrl } from "@/shared/api/cms";
import { FeatureTabs } from "@/widgets/FeatureTabs";

interface FeatureHighlightBlockProps {
	block: FeatureHighlightBlockType;
}

const iconMap = [Sparkles, LayoutTemplate, Search];

export const FeatureHighlightBlock = ({ block }: FeatureHighlightBlockProps) => {
	if (!block.items?.length) return null;

	const mediaUrl =
		resolveCmsMediaUrl(
			block.media?.formats?.large?.url ||
				block.media?.formats?.medium?.url ||
				block.media?.url
		) || "https://shadcnblocks.com/images/block/placeholder-dark-1.svg";

	const tabs = block.items.map((item, index) => {
		const Icon = iconMap[index % iconMap.length];

		return {
			value: `feature-${index + 1}`,
			icon: <Icon className="h-auto w-4 shrink-0" />,
			label: item.title,
			content: {
				badge: block.eyebrow || "Feature",
				title: item.title,
				description: item.description || block.description || "",
				buttonText: block.ctaLabel || "Learn more",
				imageSrc: mediaUrl,
				imageAlt: block.title,
			},
		};
	});

	return (
		<section className="py-20">
			<FeatureTabs
				badge={block.eyebrow || "Feature highlight"}
				heading={block.title}
				description={block.description || ""}
				tabs={tabs}
			/>
		</section>
	);
};
