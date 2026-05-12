interface HeroDescriptionProps {
	description: string;
	variant?: "light" | "dark";
}

/**
 * Описание в hero секции
 */
export const HeroDescription = ({ description, variant = "light" }: HeroDescriptionProps) => {
	const textClass = variant === "light" 
		? "text-white/90 drop-shadow-md" 
		: "text-gray-600 dark:text-gray-300";

	return (
		<p className={`text-base sm:text-lg md:text-xl mb-4 sm:mb-6 leading-relaxed max-w-3xl ${textClass}`}>
			{description}
		</p>
	);
};
