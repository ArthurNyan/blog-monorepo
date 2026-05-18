import type { ProcessTimelineBlock as ProcessTimelineBlockType } from "@/shared/api/pages";
import { Timeline } from "@/shared/components/ui/timeline";

interface ProcessTimelineBlockProps {
	block: ProcessTimelineBlockType;
}

export const ProcessTimelineBlock = ({ block }: ProcessTimelineBlockProps) => {
	if (!block.items?.length) return null;

	return (
		<Timeline
			data={block.items.map((item) => ({
				title: item.stepLabel || item.title,
				content: (
					<div>
						<h3 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
							{item.title}
						</h3>
						{item.description && (
							<p className="text-sm leading-7 text-neutral-700 dark:text-neutral-300">
								{item.description}
							</p>
						)}
					</div>
				),
			}))}
		/>
	);
};
