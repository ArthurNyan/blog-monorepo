/**
 * Типы для структуры навигации Header
 * Эти типы соответствуют структуре данных из Strapi
 */

/**
 * Элемент навигационной ссылки (подпункт меню)
 */
export interface NavigationLinkItem {
	/** Заголовок ссылки */
	title: string;
	/** URL ссылки */
	href: string;
	/** Опциональное описание ссылки */
	description?: string;
}

/**
 * Главный элемент навигации
 */
export interface NavigationItem {
	/** Название пункта меню */
	label: string;
	/** Прямая ссылка (используется если нет submenu) */
	href?: string;
	/** Выпадающее меню */
	submenu?: {
		/** Опциональный выделенный элемент (featured) */
		featured?: NavigationLinkItem;
		/** Список подпунктов меню */
		items: NavigationLinkItem[];
	};
}

/**
 * Пропсы для Header компонента
 */
export interface HeaderProps {
	navigationItems?: NavigationItem[];
}
