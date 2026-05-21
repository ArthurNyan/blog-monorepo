import { z } from "zod";

export const createRequiredConsentSchema = (message: string) =>
	z.literal(true, {
		errorMap: () => ({
			message,
		}),
	});

export const isHoneypotFilled = (value?: string | null) =>
	Boolean(value?.trim());

export const normalizeOptionalText = (value?: string | null) =>
	value?.trim() || "";
