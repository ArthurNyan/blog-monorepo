/**
 * lead-submission controller
 */

import { factories } from '@strapi/strapi';

// Strapi's generated ContentType union lags behind new schema files until a full rebuild.
export default factories.createCoreController(
	'api::lead-submission.lead-submission' as any
);
