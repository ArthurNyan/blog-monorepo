import { BENTO_ITEMS } from "../model";
import type { BentoItem } from "../model";
import { BentoCard } from "./bento-card";
import { BentoGrid } from "./bento-grid";

interface BentoGridWidgetProps {
    items?: BentoItem[];
    className?: string;
}

function BentoGridWidget({ items = BENTO_ITEMS, className }: BentoGridWidgetProps) {
    return (
        <BentoGrid className={className}>
            {items.map((item, index) => (
                <BentoCard
                    key={item.id || index}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    status={item.status}
                    tags={item.tags}
                    meta={item.meta}
                    cta={item.cta}
                    colSpan={item.colSpan}
                    hasPersistentHover={item.hasPersistentHover}
                />
            ))}
        </BentoGrid>
    );
}

export { BentoGridWidget };
