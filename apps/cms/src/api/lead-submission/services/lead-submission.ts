/**
 * lead-submission service
 */

import { factories } from '@strapi/strapi';

// Strapi's generated ContentType union lags behind new schema files until a full rebuild.
export default factories.createCoreService(
	'api::lead-submission.lead-submission' as any
);
