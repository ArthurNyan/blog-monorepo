import { NavigationMenuLink } from '@/shared/components/ui/navigation-menu';
import type { NavigationLinkItem } from '../model';

interface FeaturedItemProps {
	item: NavigationLinkItem;
}

export const FeaturedItem = ({ item }: FeaturedItemProps) => {
	return (
		<li className="row-span-3">
			<NavigationMenuLink asChild>
				<a
					className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
					href={item.href}
				>
					<div className="mb-2 mt-4 text-lg font-medium">{item.title}</div>
					<p className="text-sm leading-tight text-muted-foreground">{item.description}</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
};
