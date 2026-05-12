import { NavigationMenuLink } from '@/shared/components/ui/navigation-menu';
import type { NavigationLinkItem } from '../model';

interface NavMenuItemProps {
	item: NavigationLinkItem;
}

export const NavMenuItem = ({ item }: NavMenuItemProps) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
					href={item.href}
				>
					<div className="text-sm font-medium leading-none">{item.title}</div>
					{item.description && (
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
							{item.description}
						</p>
					)}
				</a>
			</NavigationMenuLink>
		</li>
	);
};
