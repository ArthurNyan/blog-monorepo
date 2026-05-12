import type { LogoImage } from "../types";

interface HeroLogoProps {
	logo: LogoImage;
	title: string;
	variant?: "light" | "dark";
}

/**
 * Логотип проекта
 */
export const HeroLogo = ({ logo, title, variant = "light" }: HeroLogoProps) => {
	const bgClass = variant === "light" 
		? "bg-white dark:bg-gray-900 p-1" 
		: "";

	return (
		<img
			src={logo.url}
			alt={logo.alternativeText || title}
			className={`h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-lg object-cover shrink-0 ${bgClass}`}
		/>
	);
};
