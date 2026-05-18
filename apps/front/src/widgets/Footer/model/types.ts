/**
 * Типы для структуры Footer
 */

/**
 * Элемент ссылки в футере
 */
export interface FooterLinkItem {
	/** Текст ссылки */
	title: string;
	/** URL ссылки */
	href: string;
}

/**
 * Колонка футера с группой ссылок
 */
export interface FooterColumn {
	/** Заголовок колонки */
	heading: string;
	/** Список ссылок */
	links: FooterLinkItem[];
}

/**
 * Информация о компании для футера
 */
export interface CompanyInfo {
	/** Путь к логотипу (светлая тема) */
	logoDark: string;
	/** Путь к логотипу (темная тема) */
	logoLight: string;
	/** Описание компании */
	description: string;
	/** Название компании */
	name: string;
}

/**
 * Пропсы для Footer компонента
 */
export interface FooterProps {
	/** Колонки с ссылками */
	columns?: FooterColumn[];
	/** Информация о компании */
	companyInfo?: CompanyInfo;
	/** Копирайт или короткая подпись внизу */
	copyrightText?: string;
}

/**
 * Пропсы для Container компонента
 */
export interface ContainerProps {
	className?: string;
	children: React.ReactNode;
	delay?: number;
	reverse?: boolean;
	simple?: boolean;
}
