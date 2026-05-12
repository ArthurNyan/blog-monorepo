export default {
  routes: [
    {
      method: 'GET',
      path: '/documentation/:version/:slug',
      handler: 'doc-api.getDocumentation',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
