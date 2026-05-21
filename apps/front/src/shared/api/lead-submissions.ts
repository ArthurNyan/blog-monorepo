import type { LeadSubmissionRequestPayload } from "@/widgets/LeadCaptureForm/model/schema";

const parseLeadSubmissionError = async (response: Response) => {
	try {
		const json = await response.json();
		return (
			json?.message ||
			json?.error?.message ||
			"Не удалось отправить заявку. Попробуйте позже."
		);
	} catch {
		return "Не удалось отправить заявку. Попробуйте позже.";
	}
};

export const submitLeadSubmission = async (
	payload: LeadSubmissionRequestPayload
) => {
	const response = await fetch("/api/lead-submissions", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error(await parseLeadSubmissionError(response));
	}
};
