import { getDokployRebuildConfig } from './dokploy-rebuild';

const DEFAULT_WEBHOOK_NAME = 'Frontend rebuild hook';
const PUBLICATION_EVENTS = ['entry.publish', 'entry.unpublish'] as const;

type ManagedWebhook = {
  id?: string;
  name: string;
  url: string;
  headers: Record<string, string>;
  events: string[];
  isEnabled: boolean;
};

type ManagedWebhookStore = {
  findWebhooks: () => Promise<ManagedWebhook[]>;
  createWebhook: (data: ManagedWebhook) => Promise<ManagedWebhook>;
  updateWebhook: (id: string, data: ManagedWebhook) => Promise<ManagedWebhook | null>;
};

type ManagedWebhookRunner = {
  add: (webhook: ManagedWebhook) => void;
  update: (webhook: ManagedWebhook) => void;
};

type PublicationWebhookConfig = {
  enabled: boolean;
  headers: Record<string, string>;
  name: string;
  url?: string;
};

type SyncManagedPublicationWebhookOptions = {
  env?: NodeJS.ProcessEnv;
  runner: ManagedWebhookRunner;
  store: ManagedWebhookStore;
};

type SyncManagedPublicationWebhookResult =
  | {
      action: 'created' | 'updated';
      enabled: true;
      webhook: ManagedWebhook;
    }
  | {
      action: 'disabled';
      enabled: false;
      webhook: ManagedWebhook;
    }
  | {
      action: 'noop';
      enabled: boolean;
      webhook: ManagedWebhook | null;
    };

const normalizeHeaders = (headers: Record<string, string>) =>
  Object.entries(headers)
    .sort(([left], [right]) => left.localeCompare(right))
    .reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

const areStringArraysEqual = (left: string[], right: string[]) => {
  if (left.length !== right.length) {
    return false;
  }

  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();

  return sortedLeft.every((value, index) => value === sortedRight[index]);
};

const areHeadersEqual = (
  left: Record<string, string>,
  right: Record<string, string>
) => JSON.stringify(normalizeHeaders(left)) === JSON.stringify(normalizeHeaders(right));

export const getPublicationWebhookConfig = (
  env: NodeJS.ProcessEnv = process.env
): PublicationWebhookConfig => {
  const dokployConfig = getDokployRebuildConfig(env);

  return {
    enabled: Boolean(dokployConfig.managedWebhookUrl && dokployConfig.dokployWebhookUrl),
    headers: dokployConfig.incomingToken ? { 'x-rebuild-token': dokployConfig.incomingToken } : {},
    name: env.FRONTEND_REBUILD_WEBHOOK_NAME?.trim() || DEFAULT_WEBHOOK_NAME,
    url: dokployConfig.managedWebhookUrl,
  };
};

export const buildManagedPublicationWebhook = (
  config: PublicationWebhookConfig
): ManagedWebhook | null => {
  if (!config.enabled || !config.url) {
    return null;
  }

  return {
    name: config.name,
    url: config.url,
    headers: config.headers,
    events: [...PUBLICATION_EVENTS],
    isEnabled: true,
  };
};

const needsWebhookUpdate = (current: ManagedWebhook, next: ManagedWebhook) =>
  current.name !== next.name ||
  current.url !== next.url ||
  current.isEnabled !== next.isEnabled ||
  !areHeadersEqual(current.headers, next.headers) ||
  !areStringArraysEqual(current.events, next.events);

export const syncManagedPublicationWebhook = async ({
  env = process.env,
  runner,
  store,
}: SyncManagedPublicationWebhookOptions): Promise<SyncManagedPublicationWebhookResult> => {
  const config = getPublicationWebhookConfig(env);
  const existingWebhooks = await store.findWebhooks();
  const existingWebhook = existingWebhooks.find((webhook) => webhook.name === config.name) || null;
  const desiredWebhook = buildManagedPublicationWebhook(config);

  if (!desiredWebhook) {
    if (!existingWebhook || !existingWebhook.id || !existingWebhook.isEnabled) {
      return {
        action: 'noop',
        enabled: false,
        webhook: existingWebhook,
      };
    }

    const disabledWebhook = await store.updateWebhook(existingWebhook.id, {
      ...existingWebhook,
      isEnabled: false,
    });

    if (!disabledWebhook) {
      return {
        action: 'noop',
        enabled: false,
        webhook: existingWebhook,
      };
    }

    runner.update(disabledWebhook);

    return {
      action: 'disabled',
      enabled: false,
      webhook: disabledWebhook,
    };
  }

  if (!existingWebhook) {
    const createdWebhook = await store.createWebhook(desiredWebhook);
    runner.add(createdWebhook);

    return {
      action: 'created',
      enabled: true,
      webhook: createdWebhook,
    };
  }

  if (!existingWebhook.id || !needsWebhookUpdate(existingWebhook, desiredWebhook)) {
    return {
      action: 'noop',
      enabled: existingWebhook.isEnabled,
      webhook: existingWebhook,
    };
  }

  const updatedWebhook = await store.updateWebhook(existingWebhook.id, {
    ...desiredWebhook,
    id: existingWebhook.id,
  });

  if (!updatedWebhook) {
    return {
      action: 'noop',
      enabled: existingWebhook.isEnabled,
      webhook: existingWebhook,
    };
  }

  runner.update(updatedWebhook);

  return {
    action: 'updated',
    enabled: true,
    webhook: updatedWebhook,
  };
};
