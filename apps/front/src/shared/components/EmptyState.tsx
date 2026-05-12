interface EmptyStateProps {
	title?: string;
	description?: string;
}

export const EmptyState = ({
	title = "Ничего не найдено",
	description = "Контент пока не опубликован",
}: EmptyStateProps) => {
	return (
		<div className="flex flex-col items-center justify-center py-16 px-4">
			<div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8 text-primary"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
					/>
				</svg>
			</div>
			<h3 className="text-xl font-semibold mb-2">{title}</h3>
			<p className="text-muted-foreground text-center max-w-md">{description}</p>
		</div>
	);
};
