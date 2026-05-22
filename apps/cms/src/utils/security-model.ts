import type { Core } from '@strapi/strapi';

type AdminPermission = {
  action: string;
  conditions?: string[];
  properties?: Record<string, unknown>;
  subject: string | null;
};

type AdminRoleSpec = {
  code: string;
  description: string;
  name: string;
  permissions: AdminPermission[];
};

type ContentApiRoleSpec = {
  actions: string[];
  description: string;
  name: string;
  type: 'authenticated' | 'public';
};

type SyncResult = {
  action: 'created' | 'noop' | 'updated';
  changes: string[];
  target: string;
};

const MARKETING_CONTENT_TYPES = [
  'api::global.global',
  'api::home-page.home-page',
  'api::page.page',
  'api::article.article',
  'api::project.project',
  'api::author.author',
] as const;

const CAREER_CONTENT_TYPES = [
  'api::vacancy.vacancy',
  'api::industry.industry',
  'api::job-role.job-role',
] as const;

const MEDIA_LIBRARY_PERMISSIONS: AdminPermission[] = [
  { action: 'plugin::upload.read', subject: null },
  { action: 'plugin::upload.assets.create', subject: null },
  { action: 'plugin::upload.assets.update', subject: null },
  { action: 'plugin::upload.assets.download', subject: null },
  { action: 'plugin::upload.assets.copy-link', subject: null },
];

const LOCALE_READ_PERMISSION: AdminPermission = {
  action: 'plugin::i18n.locale.read',
  subject: null,
};

const toContentPermissions = (
  subjects: readonly string[],
  actions: readonly string[]
): AdminPermission[] =>
  subjects.flatMap((subject) =>
    actions.map((action) => ({
      action,
      subject,
    }))
  );

const ADMIN_ROLE_SPECS: AdminRoleSpec[] = [
  {
    code: 'strapi-editor',
    name: 'Marketer / Content Manager',
    description:
      'Manages marketing content, previews drafts, publishes storefront updates, and reviews lead submissions.',
    permissions: [
      ...MEDIA_LIBRARY_PERMISSIONS,
      LOCALE_READ_PERMISSION,
      ...toContentPermissions(MARKETING_CONTENT_TYPES, [
        'plugin::content-manager.explorer.read',
        'plugin::content-manager.explorer.create',
        'plugin::content-manager.explorer.update',
        'plugin::content-manager.explorer.publish',
      ]),
      {
        action: 'plugin::content-manager.explorer.read',
        subject: 'api::lead-submission.lead-submission',
      },
    ],
  },
  {
    code: 'strapi-author',
    name: 'Editor',
    description:
      'Creates and updates marketing drafts, but cannot publish them or access incoming submissions.',
    permissions: [
      ...MEDIA_LIBRARY_PERMISSIONS,
      LOCALE_READ_PERMISSION,
      ...toContentPermissions(MARKETING_CONTENT_TYPES, [
        'plugin::content-manager.explorer.read',
        'plugin::content-manager.explorer.create',
        'plugin::content-manager.explorer.update',
      ]),
    ],
  },
  {
    code: 'diploma-hr',
    name: 'HR',
    description:
      'Maintains the vacancy catalog, publishes career content, and processes vacancy applications.',
    permissions: [
      ...MEDIA_LIBRARY_PERMISSIONS,
      LOCALE_READ_PERMISSION,
      ...toContentPermissions(CAREER_CONTENT_TYPES, [
        'plugin::content-manager.explorer.read',
        'plugin::content-manager.explorer.create',
        'plugin::content-manager.explorer.update',
        'plugin::content-manager.explorer.publish',
      ]),
      ...toContentPermissions(['api::vacancy-application.vacancy-application'], [
        'plugin::content-manager.explorer.read',
        'plugin::content-manager.explorer.update',
      ]),
    ],
  },
];

const CONTENT_API_ROLE_SPECS: ContentApiRoleSpec[] = [
  {
    type: 'public',
    name: 'Public',
    description:
      'Read-only role for the storefront and preview routes. Draft access still requires the preview secret header.',
    actions: [
      'api::global.global.find',
      'api::home-page.home-page.find',
      'api::page.page.find',
      'api::page.page.findOne',
      'api::article.article.find',
      'api::article.article.findOne',
      'api::author.author.find',
      'api::author.author.findOne',
      'api::project.project.find',
      'api::project.project.findOne',
      'api::vacancy.vacancy.find',
      'api::vacancy.vacancy.findOne',
      'api::industry.industry.find',
      'api::industry.industry.findOne',
      'api::job-role.job-role.find',
      'api::job-role.job-role.findOne',
    ],
  },
  {
    type: 'authenticated',
    name: 'Authenticated',
    description:
      'Unused in the diploma scope. End-user accounts are outside the supported public workflow.',
    actions: [],
  },
];

const getContentApiPermissionKey = (action: string) => action;

const normalizeAdminPermission = (permission: AdminPermission): AdminPermission => ({
  action: permission.action,
  conditions: permission.conditions ?? [],
  properties: permission.properties ?? {},
  subject: permission.subject,
});

const syncAdminRole = async (
  strapi: Core.Strapi,
  spec: AdminRoleSpec
): Promise<SyncResult> => {
  const roleService = strapi.service('admin::role');
  const existingRole =
    (await strapi.db.query('admin::role').findOne({
      where: { code: spec.code },
      populate: ['permissions'],
    })) ??
    (await strapi.db.query('admin::role').findOne({
      where: { name: spec.name },
      populate: ['permissions'],
    }));

  const changes: string[] = [];

  const role = existingRole
    ? existingRole
    : await roleService.create({
        code: spec.code,
        description: spec.description,
        name: spec.name,
      });

  if (!existingRole) {
    changes.push('created role');
  }

  if (role.name !== spec.name || role.description !== spec.description) {
    await roleService.update(
      { id: role.id },
      {
        description: spec.description,
        name: spec.name,
      }
    );
    changes.push('updated metadata');
  }

  const desiredPermissions = spec.permissions.map(normalizeAdminPermission);
  await roleService.assignPermissions(role.id, desiredPermissions);

  return {
    action: existingRole || changes.length === 0 ? (changes.length > 0 ? 'updated' : 'noop') : 'created',
    changes,
    target: `${spec.name} (${spec.code})`,
  };
};

const syncContentApiRole = async (
  strapi: Core.Strapi,
  spec: ContentApiRoleSpec
): Promise<SyncResult> => {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: spec.type },
    populate: ['permissions'],
  });

  if (!role) {
    throw new Error(`Content API role "${spec.type}" was not found.`);
  }

  const changes: string[] = [];

  if (role.name !== spec.name || role.description !== spec.description) {
    await strapi.db.query('plugin::users-permissions.role').update({
      where: { id: role.id },
      data: {
        description: spec.description,
        name: spec.name,
      },
    });
    changes.push('updated metadata');
  }

  const existingPermissions = Array.isArray(role.permissions) ? role.permissions : [];
  const desiredActions = new Set(spec.actions.map(getContentApiPermissionKey));
  const currentActions = new Set(
    existingPermissions.map((permission) => getContentApiPermissionKey(permission.action))
  );

  const permissionsToDelete = existingPermissions.filter(
    (permission) => !desiredActions.has(getContentApiPermissionKey(permission.action))
  );
  const actionsToCreate = spec.actions.filter((action) => !currentActions.has(action));

  if (permissionsToDelete.length > 0) {
    await Promise.all(
      permissionsToDelete.map((permission) =>
        strapi.db.query('plugin::users-permissions.permission').delete({
          where: { id: permission.id },
        })
      )
    );
    changes.push(`removed ${permissionsToDelete.length} permissions`);
  }

  if (actionsToCreate.length > 0) {
    await Promise.all(
      actionsToCreate.map((action) =>
        strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: role.id,
          },
        })
      )
    );
    changes.push(`added ${actionsToCreate.length} permissions`);
  }

  return {
    action: changes.length > 0 ? 'updated' : 'noop',
    changes,
    target: `${spec.name} (${spec.type})`,
  };
};

export const syncSecurityModel = async (strapi: Core.Strapi) => {
  const adminRoleResults: SyncResult[] = [];

  for (const spec of ADMIN_ROLE_SPECS) {
    adminRoleResults.push(await syncAdminRole(strapi, spec));
  }

  const contentApiRoleResults: SyncResult[] = [];

  for (const spec of CONTENT_API_ROLE_SPECS) {
    contentApiRoleResults.push(await syncContentApiRole(strapi, spec));
  }

  return {
    adminRoleResults,
    contentApiRoleResults,
  };
};

export const SECURITY_MODEL_SUMMARY = {
  adminRoles: ADMIN_ROLE_SPECS.map(({ code, description, name }) => ({
    code,
    description,
    name,
  })),
  contentApiRoles: CONTENT_API_ROLE_SPECS.map(({ actions, description, name, type }) => ({
    actionCount: actions.length,
    description,
    name,
    type,
  })),
};
