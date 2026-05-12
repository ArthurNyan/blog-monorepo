import type { DetailHeroProps } from "./types";
import { HeroWithCover } from "./ui/HeroWithCover";
import { HeroWithoutCover } from "./ui/HeroWithoutCover";

/**
 * Универсальная Hero секция для детальных страниц
 * Автоматически выбирает вариант с обложкой или без
 */
export const DetailHero = (props: DetailHeroProps) => {
	return (
		<section className="relative w-full overflow-hidden bg-gray-50 dark:bg-gray-950">
			{props.cover?.url ? (
				<HeroWithCover {...props} />
			) : (
				<HeroWithoutCover {...props} />
			)}
		</section>
	);
};
