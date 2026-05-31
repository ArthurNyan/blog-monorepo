import { getDokployRebuildConfig, triggerDokployRebuild } from '../../../utils/dokploy-rebuild';

const parseResponseBody = (body: string, contentType: string) => {
  if (!body.trim()) {
    return null;
  }

  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(body);
    } catch {
      return { message: body };
    }
  }

  return body;
};

export default {
  async trigger(ctx) {
    const { incomingToken } = getDokployRebuildConfig();
    const requestToken = ctx.request.headers['x-rebuild-token'];

    if (incomingToken && requestToken !== incomingToken) {
      return ctx.unauthorized('Missing or invalid rebuild token.');
    }

    try {
      const result = await triggerDokployRebuild();

      ctx.status = result.status;
      ctx.set('content-type', result.contentType);
      ctx.body = parseResponseBody(result.body, result.contentType);
    } catch (error) {
      strapi.log.error('Failed to trigger Dokploy rebuild:', error);

      return ctx.internalServerError({
        message:
          error instanceof Error ? error.message : 'Failed to trigger Dokploy rebuild.',
      });
    }
  },
};
