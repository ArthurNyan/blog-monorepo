/**
 * lead-submission router
 */

import { factories } from '@strapi/strapi';

// Strapi's generated ContentType union lags behind new schema files until a full rebuild.
export default factories.createCoreRouter(
	'api::lead-submission.lead-submission' as any
);
