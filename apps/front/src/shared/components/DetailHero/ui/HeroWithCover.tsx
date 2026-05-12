import type { DetailHeroProps } from "../types";
import { HeroCover } from "./HeroCover";
import { HeroLogo } from "./HeroLogo";
import { HeroTitle } from "./HeroTitle";
import { HeroDescription } from "./HeroDescription";
import { DateBadge } from "./DateBadge";
import { AuthorsBadge } from "./AuthorsBadge";

/**
 * Hero секция с обложкой
 */
export const HeroWithCover = ({
	title,
	description,
	date,
	cover,
	logo,
	authors,
}: DetailHeroProps) => {
	if (!cover?.url) return null;

	return (
		<div className="relative w-full">
			{/* Background Image */}
			<HeroCover cover={cover} title={title} />

			{/* Content */}
			<div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 md:pt-48 pb-8 sm:pb-12">
				<div className="max-w-4xl mx-auto">
					{/* Logo and Title */}
					<div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
						{logo?.url && <HeroLogo logo={logo} title={title} variant="light" />}
						<HeroTitle title={title} variant="light" />
					</div>

					{/* Description */}
					{description && (
						<HeroDescription description={description} variant="light" />
					)}

					{/* Meta Information */}
					<div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
						{date && <DateBadge date={date} variant="light" />}
						{authors && <AuthorsBadge authors={authors} variant="light" />}
					</div>
				</div>
			</div>
		</div>
	);
};
