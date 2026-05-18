import type { Core } from '@strapi/strapi';

declare const strapi: Core.Strapi;

type PreviewStatus = 'draft' | 'published';

type PreviewContext = {
	documentId: string;
	locale?: string;
	status: PreviewStatus;
};

type PreviewTargetType = 'home' | 'page' | 'article' | 'project' | 'vacancy';

const toSiteLocale = (locale?: string | null) => (locale === 'en' ? 'en' : 'ru');

const buildPreviewUrl = (
	siteUrl: string,
	params: Record<string, string | undefined>
) => {
	const url = new URL('/api/preview', siteUrl);

	for (const [key, value] of Object.entries(params)) {
		if (value) {
			url.searchParams.set(key, value);
		}
	}

	return url.toString();
};

const getPreviewTarget = async (
	uid: string,
	documentId: string,
	locale?: string
) => {
	const slugBasedTargetTypes: Record<string, Exclude<PreviewTargetType, 'home'>> = {
		'api::page.page': 'page',
		'api::article.article': 'article',
		'api::project.project': 'project',
		'api::vacancy.vacancy': 'vacancy',
	};

	switch (uid) {
		case 'api::home-page.home-page':
			return { type: 'home' as const };
		default: {
			const targetType = slugBasedTargetTypes[uid];

			if (!targetType) {
				return null;
			}

			const entry = (await (strapi.documents as any)(uid).findOne({
				documentId,
				locale,
				fields: ['slug'],
			})) as { slug?: string } | null;
			const slug = entry && typeof entry.slug === 'string' ? entry.slug.trim() : '';

			if (!slug) {
				return null;
			}

			return {
				type: targetType,
				slug,
			};
		}
	}
};

export default ({ env }) => ({
  preview: {
    enabled: Boolean(env('PREVIEW_SECRET')),
    config: {
      allowedOrigins: [env('SITE_URL', 'http://localhost:4321')],
      async handler(uid: string, { documentId, locale, status }: PreviewContext) {
        const previewSecret = env('PREVIEW_SECRET');

        if (!previewSecret) {
          return null;
        }

        const target = await getPreviewTarget(uid, documentId, locale);

        if (!target) {
          return null;
        }

        return buildPreviewUrl(env('SITE_URL', 'http://localhost:4321'), {
          secret: previewSecret,
          locale: toSiteLocale(locale),
          type: target.type,
          slug: target.slug,
          status,
        });
      },
    },
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
