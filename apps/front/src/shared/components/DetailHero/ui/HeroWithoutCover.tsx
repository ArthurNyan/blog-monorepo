import type { DetailHeroProps } from "../types";
import { HeroLogo } from "./HeroLogo";
import { HeroTitle } from "./HeroTitle";
import { HeroDescription } from "./HeroDescription";
import { DateBadge } from "./DateBadge";
import { AuthorsBadge } from "./AuthorsBadge";

/**
 * Hero секция без обложки
 */
export const HeroWithoutCover = ({
	title,
	description,
	date,
	logo,
	authors,
}: DetailHeroProps) => {
	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
			<div className="max-w-4xl mx-auto">
				{/* Logo and Title */}
				<div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
					{logo?.url && <HeroLogo logo={logo} title={title} variant="dark" />}
					<HeroTitle title={title} variant="dark" />
				</div>

				{/* Description */}
				{description && (
					<HeroDescription description={description} variant="dark" />
				)}

				{/* Meta Information */}
				<div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
					{date && <DateBadge date={date} variant="dark" />}
					{authors && <AuthorsBadge authors={authors} variant="dark" />}
				</div>
			</div>
		</div>
	);
};
