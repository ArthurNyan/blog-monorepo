/**
 * industry router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::industry.industry', {
  only: ['find', 'findOne'],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});
