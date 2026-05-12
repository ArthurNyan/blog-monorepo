import { buttonVariants } from "@/shared/components/ui/button";
import type { NavigationLinkItem } from "../model";

export const MobileNavItem = ({ item }: { item: NavigationLinkItem }) => {
	return (
		<a
			className={buttonVariants({
				variant: 'ghost',
				className: 'justify-start flex-col items-start h-auto py-3',
			})}
			href={item.href}
		>
			<span className="font-medium">{item.title}</span>
			{item.description && (
				<span className="text-xs text-muted-foreground whitespace-normal">
					{item.description}
				</span>
			)}
		</a>
	);
};