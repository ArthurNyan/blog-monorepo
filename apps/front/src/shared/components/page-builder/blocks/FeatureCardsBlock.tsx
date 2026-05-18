import {
	BriefcaseBusiness,
	FileText,
	Globe,
	LayoutTemplate,
	Rocket,
	Search,
	ShieldCheck,
	Sparkles,
	Users,
} from "lucide-react";
import type { FeatureCardsBlock as FeatureCardsBlockType } from "@/shared/api/pages";
import { BentoCard } from "@/widgets/BentoGrid/ui/bento-card";
import { BentoGrid } from "@/widgets/BentoGrid/ui/bento-grid";

const iconMap = {
	briefcase: BriefcaseBusiness,
	"file-text": FileText,
	globe: Globe,
	"layout-template": LayoutTemplate,
	rocket: Rocket,
	search: Search,
	"shield-check": ShieldCheck,
	sparkles: Sparkles,
	users: Users,
} as const;

interface FeatureCardsBlockProps {
	block: FeatureCardsBlockType;
}

const renderIcon = (name?: string) => {
	const Icon = iconMap[name as keyof typeof iconMap] ?? Sparkles;
	return <Icon className="h-4 w-4 text-emerald-500" />;
};

export const FeatureCardsBlock = ({ block }: FeatureCardsBlockProps) => {
	if (!block.items?.length) return null;

	return (
		<section className="py-20">
			<div className="container mx-auto mb-10 px-4 text-center">
				{block.eyebrow && (
					<p className="mb-3 text-sm uppercase tracking-[0.24em] text-muted-foreground">
						{block.eyebrow}
					</p>
				)}
				<h2 className="text-3xl font-semibold md:text-5xl">{block.heading}</h2>
				{block.description && (
					<p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
						{block.description}
					</p>
				)}
			</div>

			<BentoGrid>
				{block.items.map((item, index) => (
					<BentoCard
						key={`${item.title}-${index}`}
						title={item.title}
						description={item.description || ""}
						icon={renderIcon(item.icon)}
						status="CMS"
						tags={item.icon ? [item.icon] : undefined}
						hasPersistentHover={index === 0}
					/>
				))}
			</BentoGrid>
		</section>
	);
};
