import { marked } from "marked";

// Настройка marked
marked.setOptions({
	breaks: true,
	gfm: true,
});

/**
 * Парсит markdown в HTML на сервере
 */
export async function parseMarkdown(content: string): Promise<string> {
	return await marked.parse(content);
}
