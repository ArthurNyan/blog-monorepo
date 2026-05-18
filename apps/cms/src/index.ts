import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (!process.env.PREVIEW_SECRET) {
      strapi.log.warn(
        'PREVIEW_SECRET is not set. Draft preview routes will not work until the secret is configured in both CMS and frontend environments.'
      );
    }

    if (!process.env.SITE_URL) {
      strapi.log.warn(
        'SITE_URL is not set. Preview button links will fall back to http://localhost:4321.'
      );
    }

    if (!process.env.PUBLIC_URL) {
      strapi.log.warn(
        'PUBLIC_URL is not set. Generated documentation and absolute CMS links will fall back to localhost values.'
      );
    }
  },
};
