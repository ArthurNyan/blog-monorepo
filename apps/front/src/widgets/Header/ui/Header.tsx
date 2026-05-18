import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { MenuToggleIcon } from '@/shared/components/ui/menu-toggle-icon';
import { useScroll } from '@/shared/hooks/use-scroll';
import { useScrollDirection } from '@/shared/hooks/use-scroll-direction';
import type { HeaderProps } from '../model';
import {
	DEFAULT_BRAND,
	DEFAULT_NAVIGATION,
	DEFAULT_PRIMARY_ACTION,
	DEFAULT_SECONDARY_ACTION,
} from '../model';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export const Header = ({
	navigationItems,
	brand,
	primaryAction,
	secondaryAction,
}: HeaderProps) => {
	const [open, setOpen] = React.useState(false);
	const [isHovered, setIsHovered] = React.useState(false);
	const scrolled = useScroll(10);
	const { isVisible } = useScrollDirection(50);

	const navigation = navigationItems || DEFAULT_NAVIGATION;
	const brandLink = brand || DEFAULT_BRAND;
	const primaryButton = primaryAction || DEFAULT_PRIMARY_ACTION;
	const secondaryButton = secondaryAction || DEFAULT_SECONDARY_ACTION;

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={cn(
				'sticky top-0 z-50 container mx-auto border-b border-transparent md:rounded-md md:border transition-all duration-300 ease-out mt-4',
				{
					'bg-background/95 supports-backdrop-filter:bg-background/30 border-border backdrop-blur-lg md:top-4 md:container md:shadow':
					scrolled && !open,
					'bg-background mt-0 ': open,
					'-translate-y-full': !isVisible && !open && !isHovered,
					// 'translate-y-0': isVisible || open || isHovered,
				},
				// transperent hover area for sticky effect
				'before:absolute before:-top-5 before:-left-5 before:right-5 before:-bottom-5 before:z-[-1] before:content-[""]',
			)}
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
					{
						'md:px-2': scrolled,
					},
				)}
			>
				<a className="text-xl font-bold" href={brandLink.href}>
					{brandLink.title}
				</a>

				<div className="hidden items-center gap-2 md:flex">
					<DesktopNav items={navigation} />
					<Button asChild variant="outline">
						<a href={secondaryButton.href}>{secondaryButton.title}</a>
					</Button>
					<Button asChild>
						<a href={primaryButton.href}>{primaryButton.title}</a>
					</Button>
				</div>

				<Button size="icon" variant="outline" onClick={() => setOpen(!open)} className="md:hidden">
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			{/* Mobile Menu */}
			<div
				className={cn(
					'bg-background fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-4',
					)}
				>
					<MobileNav items={navigation} />
					<div className="flex flex-col gap-2">
						<Button asChild variant="outline" className="w-full">
							<a href={secondaryButton.href}>{secondaryButton.title}</a>
						</Button>
						<Button asChild className="w-full">
							<a href={primaryButton.href}>{primaryButton.title}</a>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};
