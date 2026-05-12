import { formatDate } from "../lib/formatDate";
import { MetaBadge } from "./MetaBadge";

interface DateBadgeProps {
	date: string;
	variant?: "light" | "dark";
}

/**
 * Бейдж с датой публикации
 */
export const DateBadge = ({ date, variant = "light" }: DateBadgeProps) => {
	return (
		<MetaBadge
			variant={variant}
			icon={
				<svg
					className="h-4 w-4 sm:h-5 sm:w-5 shrink-0"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			}
		>
			<time dateTime={date} className="whitespace-nowrap">
				{formatDate(date)}
			</time>
		</MetaBadge>
	);
};
