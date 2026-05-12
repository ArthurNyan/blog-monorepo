export default () => ({
  documentation: {
    enabled: true,
    config: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'Blog API Documentation',
        description: 'API documentation for blog backend',
        license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        },
      },
      'x-strapi-config': {
        plugins: ['upload', 'users-permissions'],
        path: '/documentation',
      },
      servers: [
        {
          url: 'http://localhost:1337/api',
          description: 'Development server',
        },
      ],
    },
  },
});
