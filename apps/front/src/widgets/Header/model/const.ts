import type { NavigationItem } from './types';

/**
 * Дефолтные данные навигации для примера
 * В продакшене будут заменены данными из Strapi
 */
export const DEFAULT_NAVIGATION: NavigationItem[] = [
	{
		label: 'Getting Started',
		submenu: {
			featured: {
				title: 'shadcn/ui',
				href: '/',
				description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
			},
			items: [
				{
					title: 'Introduction',
					href: '/docs',
					description: 'Re-usable components built using Radix UI and Tailwind CSS.',
				},
				{
					title: 'Installation',
					href: '/docs/installation',
					description: 'How to install dependencies and structure your app.',
				},
				{
					title: 'Typography',
					href: '/docs/primitives/typography',
					description: 'Styles for headings, paragraphs, lists...etc',
				},
			],
		},
	},
	{
		label: 'Components',
		submenu: {
			items: [
				{
					title: 'Alert Dialog',
					href: '/docs/primitives/alert-dialog',
					description: 'A modal dialog that interrupts the user with important content.',
				},
				{
					title: 'Hover Card',
					href: '/docs/primitives/hover-card',
					description: 'For sighted users to preview content available behind a link.',
				},
				{
					title: 'Progress',
					href: '/docs/primitives/progress',
					description: 'Displays an indicator showing the completion progress of a task.',
				},
			],
		},
	},
	{
		label: 'Blog',
		href: '/articles',
	},
	{
		label: 'Cases',
		href: '/projects',
	},
];
