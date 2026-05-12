import type { Author } from "../types";
import { MetaBadge } from "./MetaBadge";

interface AuthorsBadgeProps {
	authors: Author[];
	variant?: "light" | "dark";
}

/**
 * Бейдж со списком авторов
 */
export const AuthorsBadge = ({ authors, variant = "light" }: AuthorsBadgeProps) => {
	if (!authors || authors.length === 0) return null;

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
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
			}
		>
			{authors.map((author, index) => (
				<span key={author.id} className="whitespace-nowrap">
					{author.firstName} {author.lastName}
					{index < authors.length - 1 && ","}
				</span>
			))}
		</MetaBadge>
	);
};
