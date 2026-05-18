import type { FooterColumn, CompanyInfo } from './types';

/**
 * Дефолтная информация о компании
 */
export const DEFAULT_COMPANY_INFO: CompanyInfo = {
	logoDark: '/logo_dark.png',
	logoLight: '/logo_light.png',
	description:
		'Build better UIs faster with Ruixen – the AI-enhanced component library for modern teams.',
	name: 'Ruixen',
};

/**
 * Дефолтные колонки футера
 */
export const DEFAULT_FOOTER_COLUMNS: FooterColumn[] = [
	{
		heading: 'Company',
		links: [
			{ title: 'Components', href: '#' },
			{ title: 'Pricing', href: '#' },
			{ title: 'Use Cases', href: '#' },
			{ title: 'Language Support', href: '#' },
		],
	},
	{
		heading: 'Solutions',
		links: [
			{ title: 'Developers', href: '#' },
			{ title: 'Design Teams', href: '#' },
			{ title: 'Startups', href: '#' },
			{ title: 'Enterprises', href: '#' },
		],
	},
	{
		heading: 'Resources',
		links: [
			{ title: 'Documentation', href: '#' },
			{ title: 'Component Guides', href: '#' },
			{ title: 'Support Center', href: '#' },
		],
	},
	{
		heading: 'Company',
		links: [
			{ title: 'Our Story', href: '#' },
			{ title: 'Privacy Policy', href: '#' },
			{ title: 'Terms of Service', href: '#' },
		],
	},
];

export const DEFAULT_FOOTER_COPYRIGHT = 'Built for UI excellence.';
