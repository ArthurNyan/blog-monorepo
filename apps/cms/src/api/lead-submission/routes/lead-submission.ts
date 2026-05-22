/**
 * lead-submission router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  // Strapi's generated ContentType union lags behind new schema files until a full rebuild.
  'api::lead-submission.lead-submission' as any,
  {
    only: ['create'],
  }
);
