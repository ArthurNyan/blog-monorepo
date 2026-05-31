const DEFAULT_BRANCH = 'master';
const DEFAULT_REPOSITORY = 'ArthurNyan/blog-monorepo';
const REBUILD_ROUTE_PATH = '/api/rebuild';

type DokployRebuildConfig = {
  branch: string;
  dokployWebhookUrl?: string;
  incomingToken?: string;
  managedWebhookUrl?: string;
  repository: string;
};

const getEnv = (name: string, env: NodeJS.ProcessEnv = process.env) => {
  const value = env[name];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
};

const buildManagedWebhookUrl = (publicUrl: string) => {
  const url = new URL(publicUrl);
  const basePath = url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '');

  url.pathname = `${basePath}${REBUILD_ROUTE_PATH}`;
  url.search = '';
  url.hash = '';

  return url.toString();
};

export const normalizeBranchRef = (branch: string) =>
  `refs/heads/${branch.replace(/^refs\/heads\//, '')}`;

export const getDokployRebuildConfig = (
  env: NodeJS.ProcessEnv = process.env
): DokployRebuildConfig => {
  const publicUrl = getEnv('PUBLIC_URL', env);

  return {
    branch: getEnv('DOKPLOY_DEPLOY_BRANCH', env) || DEFAULT_BRANCH,
    dokployWebhookUrl: getEnv('DOKPLOY_DEPLOY_WEBHOOK_URL', env),
    incomingToken: getEnv('FRONTEND_REBUILD_HOOK_TOKEN', env),
    managedWebhookUrl: publicUrl ? buildManagedWebhookUrl(publicUrl) : undefined,
    repository: getEnv('DOKPLOY_DEPLOY_REPOSITORY', env) || DEFAULT_REPOSITORY,
  };
};

export const triggerDokployRebuild = async (env: NodeJS.ProcessEnv = process.env) => {
  const config = getDokployRebuildConfig(env);

  if (!config.dokployWebhookUrl) {
    throw new Error('DOKPLOY_DEPLOY_WEBHOOK_URL is not configured.');
  }

  const response = await fetch(config.dokployWebhookUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-github-event': 'push',
    },
    body: JSON.stringify({
      ref: normalizeBranchRef(config.branch),
      repository: {
        full_name: config.repository,
      },
    }),
  });

  return {
    body: await response.text(),
    contentType: response.headers.get('content-type') || 'application/json',
    ok: response.ok,
    status: response.status,
  };
};
