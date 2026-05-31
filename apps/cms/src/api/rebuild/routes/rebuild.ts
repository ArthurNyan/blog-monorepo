export default {
  routes: [
    {
      method: 'POST',
      path: '/rebuild',
      handler: 'rebuild.trigger',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
