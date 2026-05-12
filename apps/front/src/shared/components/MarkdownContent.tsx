import { marked } from "marked";

interface MarkdownContentProps {
	content: string;
	className?: string;
}

export const MarkdownContent = ({
	content,
	className = "",
}: MarkdownContentProps) => {
	const parseMarkdown =  () => {
		marked.setOptions({
			breaks: true,
			gfm: true,
		});

		const parsed = marked.parse(content);
		
		return parsed;
	};

	return (
		<div
			className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
			dangerouslySetInnerHTML={{ __html: parseMarkdown() }}
		/>
	);
};
