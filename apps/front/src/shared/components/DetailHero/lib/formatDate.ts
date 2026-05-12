/**
 * Форматирует дату в русский формат
 */
export const formatDate = (dateString?: string): string => {
	if (!dateString) return "";
	return new Date(dateString).toLocaleDateString("ru-RU", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
