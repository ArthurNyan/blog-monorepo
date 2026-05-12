import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { NavigationItem } from '../model';
import { MobileNavItem } from './MobileNavItem';

interface MobileNavProps {
	items: NavigationItem[];
}

export const MobileNav = ({ items }: MobileNavProps) => {
	const [openItems, setOpenItems] = useState<Set<number>>(new Set());

	const toggleItem = (index: number) => {
		setOpenItems((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(index)) {
				newSet.delete(index);
			} else {
				newSet.add(index);
			}
			return newSet;
		});
	};

	return (
		<div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
			{items.map((item, index) => (
				<React.Fragment key={index}>
					{item.submenu ? (
						<div>
							<button
								onClick={() => toggleItem(index)}
								className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
							>
								<span className="text-sm font-semibold">{item.label}</span>
								<ChevronDown
									className={`h-4 w-4 shrink-0 transition-transform duration-200 ${openItems.has(index) ? 'rotate-180' : ''
										}`}
								/>
							</button>
							<div
								className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems.has(index) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
									}`}
							>
								<div className="flex flex-col gap-1 pl-2 pt-1 pb-2">
									{item.submenu.featured && (
										<MobileNavItem item={item.submenu.featured} />
									)}
									{item.submenu.items.map((subItem, subIndex) => (
										<MobileNavItem item={subItem} key={subIndex} />
									))}
								</div>
							</div>
						</div>
					) : (
						<MobileNavItem item={{ href: item.href || '#', title: item.label }} />
					)}
				</React.Fragment>
			))}
		</div>
	);
};
