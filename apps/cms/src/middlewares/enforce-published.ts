const PUBLIC_GET_METHOD = "GET";
const API_PREFIX = "/api";
const DOCUMENTATION_PREFIX = "/api/documentation";
const PREVIEW_HEADER = "x-preview-secret";

const hasValidPreviewSecret = (headerValue?: string | string[]) => {
	const expectedSecret = process.env.PREVIEW_SECRET;
	if (!expectedSecret) {
		return false;
	}

	if (Array.isArray(headerValue)) {
		return headerValue.includes(expectedSecret);
	}

	return headerValue === expectedSecret;
};

export default () => {
	return async (ctx, next) => {
		const requestPath = ctx.request.path;
		const requestMethod = ctx.request.method;

		if (
			requestMethod === PUBLIC_GET_METHOD &&
			requestPath.startsWith(API_PREFIX) &&
			!requestPath.startsWith(DOCUMENTATION_PREFIX) &&
			!hasValidPreviewSecret(ctx.request.headers[PREVIEW_HEADER])
		) {
			ctx.query = {
				...ctx.query,
				status: "published",
			};
		}

		await next();
	};
};
