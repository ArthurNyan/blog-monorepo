/**
 * job-role router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::job-role.job-role' as any, {
  only: ['find', 'findOne'],
});
