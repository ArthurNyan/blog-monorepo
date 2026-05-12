import { cn } from '@/shared/lib/utils';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/shared/components/ui/navigation-menu';
import type { NavigationItem } from '../model';
import { FeaturedItem } from './FeaturedItem';
import { NavMenuItem } from './NavMenuItem';

interface DesktopNavProps {
	items: NavigationItem[];
}

export const DesktopNav = ({ items }: DesktopNavProps) => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{items.map((item, index) => (
					<NavigationMenuItem key={index}>
						{item.submenu ? (
							<>
								<NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul
										className={cn(
											'grid gap-3 p-4',
											item.submenu.featured
												? 'md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'
												: 'w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]',
										)}
									>
										{item.submenu.featured && <FeaturedItem item={item.submenu.featured} />}
										{item.submenu.items.map((subItem, subIndex) => (
											<NavMenuItem key={subIndex} item={subItem} />
										))}
									</ul>
								</NavigationMenuContent>
							</>
						) : (
							<NavigationMenuLink className={navigationMenuTriggerStyle()} href={item.href}>
								{item.label}
							</NavigationMenuLink>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
