interface HeroTitleProps {
	title: string;
	variant?: "light" | "dark";
}

/**
 * Заголовок hero секции
 */
export const HeroTitle = ({ title, variant = "light" }: HeroTitleProps) => {
	const textClass = variant === "light" 
		? "text-white drop-shadow-lg" 
		: "text-gray-900 dark:text-white";

	return (
		<h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${textClass}`}>
			{title}
		</h1>
	);
};
