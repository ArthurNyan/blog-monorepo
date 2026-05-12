import type { CoverImage } from "../types";

interface HeroCoverProps {
	cover: CoverImage;
	title: string;
}

/**
 * Фоновое изображение обложки с градиентом
 */
export const HeroCover = ({ cover, title }: HeroCoverProps) => {
	return (
		<div className="absolute inset-0 h-[400px] sm:h-[450px] md:h-[500px]">
			<img
				src={cover.url}
				alt={cover.alternativeText || title}
				className="h-full w-full object-cover"
			/>
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/60" />
		</div>
	);
};
