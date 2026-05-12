import type { ReactNode } from "react";

interface MetaBadgeProps {
	icon: ReactNode;
	children: ReactNode;
	variant?: "light" | "dark";
}

/**
 * Бейдж с мета-информацией
 */
export const MetaBadge = ({ icon, children, variant = "light" }: MetaBadgeProps) => {
	const bgClass = variant === "light" 
		? "bg-black/30 backdrop-blur-sm text-white/80" 
		: "text-gray-600 dark:text-gray-400";

	const containerClass = variant === "light"
		? "px-3 py-1.5 rounded-full"
		: "";

	return (
		<div className={`flex items-center gap-1.5 sm:gap-2 ${bgClass} ${containerClass}`}>
			{icon}
			<div className="flex flex-wrap gap-1 sm:gap-2">
				{children}
			</div>
		</div>
	);
};
