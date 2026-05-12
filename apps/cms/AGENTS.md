# Strapi Documentation

Strapi is a free and open-source headless CMS that delivers content anywhere you need. It provides full control over your data, supports self-hosting on any platform (AWS, Netlify, Heroku, VPS, or dedicated servers), works with SQL databases (PostgreSQL, MySQL, MariaDB, SQLite), and offers extensive customization through APIs, routes, and plugins. The platform uses a document-based architecture where content entries are uniquely identified by a `documentId` (a 24-character alphanumeric string) rather than traditional numeric IDs.

This documentation covers Strapi 5, the current stable version, which introduces significant changes including the Document Service API (replacing the Entity Service API from v4), a flattened REST API response format, and enhanced support for Draft & Publish and Internationalization features. The CMS provides both REST and GraphQL APIs for content delivery, along with a powerful backend customization system using controllers, services, routes, and lifecycle hooks.

## REST API - Get Documents

The REST API allows accessing content-types through automatically generated API endpoints. Documents are fetched by their `documentId` and responses include `data` with document attributes and `meta` with pagination information. By default, relations, media fields, components, and dynamic zones are not populated.

```bash
# Get all restaurants
curl -X GET "http://localhost:1337/api/restaurants"

# Response:
# {
#   "data": [
#     {
#       "id": 2,
#       "documentId": "hgv1vny5cebq2l3czil1rpb3",
#       "Name": "BMK Paris Bamako",
#       "Description": null,
#       "createdAt": "2024-03-06T13:42:05.098Z",
#       "updatedAt": "2024-03-06T13:42:05.098Z",
#       "publishedAt": "2024-03-06T13:42:05.103Z",
#       "locale": "en"
#     }
#   ],
#   "meta": {
#     "pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 2 }
#   }
# }

# Get a single restaurant by documentId
curl -X GET "http://localhost:1337/api/restaurants/znrlzntu9ei5onjvwfaalu2v"
```

## REST API - Create Document

Creates a new document and returns its value. The request body must contain a `data` object with the content fields. A `documentId` is automatically generated for new documents.

```bash
# Create a new restaurant
curl -X POST "http://localhost:1337/api/restaurants" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{
    "data": {
      "Name": "Restaurant D",
      "Description": [
        {
          "type": "paragraph",
          "children": [{ "type": "text", "text": "A very short description goes here." }]
        }
      ]
    }
  }'

# Response:
# {
#   "data": {
#     "documentId": "bw64dnu97i56nq85106yt4du",
#     "Name": "Restaurant D",
#     "Description": [...],
#     "createdAt": "2024-03-05T16:44:47.689Z",
#     "updatedAt": "2024-03-05T16:44:47.689Z",
#     "publishedAt": "2024-03-05T16:44:47.687Z",
#     "locale": "en"
#   },
#   "meta": {}
# }
```

## REST API - Update Document

Updates a document by `documentId` and returns the updated value. Send a `null` value to clear fields. Published versions are read-only; updates modify the draft version.

```bash
# Update a restaurant
curl -X PUT "http://localhost:1337/api/restaurants/hgv1vny5cebq2l3czil1rpb3" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{
    "data": {
      "Name": "BMK Paris Bamako",
      "Description": [
        {
          "type": "paragraph",
          "children": [{ "type": "text", "text": "Updated description." }]
        }
      ]
    }
  }'
```

## REST API - Delete Document

Deletes a document by `documentId`. Returns a 204 HTTP status code on success with no response body.

```bash
# Delete a restaurant
curl -X DELETE "http://localhost:1337/api/restaurants/bw64dnu97i56nq85106yt4du" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## REST API - Population and Field Selection

Use the `populate` parameter to include relations, media fields, components, and dynamic zones. Use `fields` to return only specific attributes. By default, nothing is populated.

```bash
# Select specific fields only
curl -X GET "http://localhost:1337/api/restaurants?fields[0]=name&fields[1]=description"

# Populate all relations 1 level deep
curl -X GET "http://localhost:1337/api/restaurants?populate=*"

# Populate specific relations
curl -X GET "http://localhost:1337/api/articles?populate[0]=categories&populate[1]=author"

# Nested population with field selection
curl -X GET "http://localhost:1337/api/articles?fields[0]=title&fields[1]=slug&populate[headerImage][fields][0]=name&populate[headerImage][fields][1]=url"

# Population with filtering
curl -X GET "http://localhost:1337/api/articles?populate[categories][filters][name][\$eq]=Cars"
```

## REST API - Filtering and Sorting

Queries can accept `filters`, `sort`, and `pagination` parameters. Filters support operators like `$eq`, `$contains`, `$lt`, `$gt`, `$in`, `$or`, `$and`, and more.

```bash
# Filter by exact match
curl -X GET "http://localhost:1337/api/restaurants?filters[Name][\$eq]=Biscotte"

# Filter with contains (case-insensitive)
curl -X GET "http://localhost:1337/api/restaurants?filters[Name][\$containsi]=pizza"

# Multiple filters with AND logic
curl -X GET "http://localhost:1337/api/restaurants?filters[Name][\$containsi]=pizza&filters[rating][\$gte]=4"

# Sort by field (ascending by default, use :desc for descending)
curl -X GET "http://localhost:1337/api/restaurants?sort=Name:asc"

# Multiple sort fields
curl -X GET "http://localhost:1337/api/restaurants?sort[0]=Name:asc&sort[1]=createdAt:desc"

# Pagination
curl -X GET "http://localhost:1337/api/restaurants?pagination[page]=1&pagination[pageSize]=10"
```

## GraphQL API - Queries

The GraphQL API requires installing the `@strapi/plugin-graphql` package. It provides queries named after content-type singular and plural API IDs. Flat queries return data directly; Relay-style `_connection` queries include pagination metadata.

```graphql
# Install plugin first: npm install @strapi/plugin-graphql

# Fetch a single restaurant by documentId
query {
  restaurant(documentId: "a1b2c3d4e5d6f7g8h9i0jkl") {
    name
    description
  }
}

# Fetch all restaurants with pagination (Relay-style)
query {
  restaurants_connection(pagination: { page: 1, pageSize: 10 }) {
    nodes {
      documentId
      name
      description
      categories {
        documentId
        name
      }
    }
    pageInfo {
      page
      pageSize
      pageCount
      total
    }
  }
}

# Filtering restaurants
query {
  restaurants(filters: { name: { containsi: "pizza" } }) {
    documentId
    name
  }
}

# Fetch draft versions (requires Draft & Publish enabled)
query {
  restaurants(status: DRAFT) {
    documentId
    name
    publishedAt
  }
}
```

## GraphQL API - Mutations

Mutations create, update, and delete documents. Each content-type has `create<Type>`, `update<Type>`, and `delete<Type>` mutations automatically generated.

```graphql
# Create a new restaurant
mutation CreateRestaurant {
  createRestaurant(data: {
    name: "Pizzeria Arrivederci"
  }) {
    documentId
    name
  }
}

# Update an existing restaurant
mutation UpdateRestaurant {
  updateRestaurant(
    documentId: "bf97tfdumkcc8ptahkng4puo"
    data: { name: "Pizzeria Amore" }
  ) {
    documentId
    name
  }
}

# Delete a restaurant
mutation DeleteRestaurant {
  deleteRestaurant(documentId: "a1b2c3d4e5d6f7g8h9i0jkl") {
    documentId
  }
}

# Create with relations
mutation CreateCategory {
  createCategory(data: {
    Name: "Italian Food"
    restaurants: ["a1b2c3d4e5d6f7g8h9i0jkl", "bf97tfdumkcc8ptahkng4puo"]
  }) {
    documentId
    Name
    restaurants {
      documentId
      name
    }
  }
}
```

## Document Service API - Backend Operations

The Document Service API is the recommended way to interact with content from the backend server or plugins. It provides methods for CRUD operations, publishing, and counting documents.

```javascript
// ./src/api/restaurant/controllers/restaurant.js
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::restaurant.restaurant', ({ strapi }) => ({
  // Find a document by documentId
  async findOne(ctx) {
    const { id: documentId } = ctx.params;

    const document = await strapi.documents('api::restaurant.restaurant').findOne({
      documentId,
      populate: ['categories', 'images']
    });

    return document;
  },

  // Find many documents with filters
  async findMany(ctx) {
    const documents = await strapi.documents('api::restaurant.restaurant').findMany({
      filters: { name: { $startsWith: 'Pizzeria' } },
      sort: [{ name: 'asc' }],
      pagination: { page: 1, pageSize: 10 },
      status: 'published', // or 'draft'
      locale: 'en'
    });

    return documents;
  },

  // Create a document
  async create(ctx) {
    const document = await strapi.documents('api::restaurant.restaurant').create({
      data: {
        name: 'New Restaurant',
        description: 'A great place to eat'
      },
      status: 'published' // Auto-publish on create
    });

    return document;
  },

  // Update a document
  async update(ctx) {
    const { id: documentId } = ctx.params;

    const document = await strapi.documents('api::restaurant.restaurant').update({
      documentId,
      data: { name: 'Updated Name' }
    });

    return document;
  },

  // Delete a document
  async delete(ctx) {
    const { id: documentId } = ctx.params;

    await strapi.documents('api::restaurant.restaurant').delete({ documentId });

    return { success: true };
  },

  // Publish a document
  async publish(ctx) {
    const { id: documentId } = ctx.params;

    const result = await strapi.documents('api::restaurant.restaurant').publish({
      documentId
    });

    return result;
  },

  // Count documents
  async count(ctx) {
    const count = await strapi.documents('api::restaurant.restaurant').count({
      filters: { name: { $containsi: 'pizza' } },
      status: 'published'
    });

    return { count };
  }
}));
```

## Controllers - Custom Actions

Controllers handle business logic for routes. Use `createCoreController` to extend core controllers with custom actions. Always sanitize inputs and outputs to prevent data leakage.

```javascript
// ./src/api/restaurant/controllers/restaurant.js
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::restaurant.restaurant', ({ strapi }) => ({
  // Custom action
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

  // Wrap core action (keeps core logic)
  async find(ctx) {
    ctx.query = { ...ctx.query, locale: 'en' };
    const { data, meta } = await super.find(ctx);
    meta.date = Date.now();
    return { data, meta };
  },

  // Replace core action with proper sanitization
  async find(ctx) {
    // Validate query parameters (optional but recommended)
    await this.validateQuery(ctx);

    // Sanitize query to remove unauthorized params
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);

    // Use service to fetch data
    const { results, pagination } = await strapi.service('api::restaurant.restaurant').find(sanitizedQueryParams);

    // Sanitize output to remove private fields
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination });
  },

  // Custom action with manual sanitization
  async findCustom(ctx) {
    const contentType = strapi.contentType('api::restaurant.restaurant');

    await strapi.contentAPI.validate.query(ctx.query, contentType, { auth: ctx.state.auth });
    const sanitizedQueryParams = await strapi.contentAPI.sanitize.query(ctx.query, contentType, { auth: ctx.state.auth });

    const documents = await strapi.documents(contentType.uid).findMany(sanitizedQueryParams);

    return await strapi.contentAPI.sanitize.output(documents, contentType, { auth: ctx.state.auth });
  }
}));
```

## Services - Reusable Business Logic

Services contain reusable functions to keep controllers concise. Use `createCoreService` to extend core services with custom methods.

```javascript
// ./src/api/restaurant/services/restaurant.js
const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::restaurant.restaurant', ({ strapi }) => ({
  // Custom service method
  async exampleService(...args) {
    let response = { okay: true };
    if (response.okay === false) {
      return { response, error: true };
    }
    return response;
  },

  // Wrap core service
  async find(...args) {
    const { results, pagination } = await super.find(...args);
    results.forEach(result => {
      result.counter = 1;
    });
    return { results, pagination };
  },

  // Replace core service
  async findOne(documentId, params = {}) {
    return strapi.documents('api::restaurant.restaurant').findOne({
      documentId,
      ...super.getFetchParams(params)
    });
  },

  // Custom email service example
  async sendNewsletter(from, to, subject, text) {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: 'user@gmail.com', pass: 'password' }
    });
    return transporter.sendMail({ from, to, subject, text });
  }
}));

// Usage from controller:
// strapi.service('api::restaurant.restaurant').sendNewsletter(from, to, subject, text);
```

## Routes - Custom Endpoints

Routes map URLs to controller actions. Core routes are auto-generated; custom routes add new endpoints or modify existing behavior.

```javascript
// ./src/api/restaurant/routes/restaurant.js - Configure core router
const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  prefix: '',
  only: ['find', 'findOne'], // Only enable these routes
  except: [], // Or exclude specific routes
  config: {
    find: {
      auth: false, // Make public (no authentication)
      policies: [],
      middlewares: []
    },
    findOne: {
      policies: ['is-owner'], // Apply custom policy
      middlewares: ['api::restaurant.custom-middleware']
    }
  }
});

// ./src/api/restaurant/routes/01-custom-restaurant.js - Custom routes
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/restaurants/specials',
      handler: 'api::restaurant.restaurant.exampleAction',
      config: {
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/restaurants/:id/review',
      handler: 'api::restaurant.restaurant.review',
      config: {
        policies: ['is-authenticated'],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/restaurants/:category([a-z]+)', // Regex parameter
      handler: 'api::restaurant.restaurant.findByCategory'
    }
  ]
};
```

## Lifecycle Hooks

Lifecycle hooks trigger on database operations (create, update, delete, find). Define them in `lifecycles.js` or register programmatically in `bootstrap`.

```javascript
// ./src/api/restaurant/content-types/restaurant/lifecycles.js
module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    // Apply 20% discount
    event.params.data.price = event.params.data.price * 0.8;
  },

  afterCreate(event) {
    const { result, params } = event;
    // Send notification, update cache, etc.
    console.log('Restaurant created:', result.documentId);
  },

  beforeUpdate(event) {
    event.params.data.updatedAt = new Date();
  },

  afterUpdate(event) {
    // Invalidate cache
  },

  beforeDelete(event) {
    // Archive before deletion
  },

  afterDelete(event) {
    // Cleanup related resources
  }
};

// ./src/index.js - Programmatic registration
module.exports = {
  async bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['api::restaurant.restaurant'],

      beforeCreate(event) {
        event.state = 'doStuffAfterwards';
      },

      afterCreate(event) {
        if (event.state === 'doStuffAfterwards') {
          // Perform additional logic
        }
      }
    });

    // Generic subscriber for all models
    strapi.db.lifecycles.subscribe((event) => {
      if (event.action === 'beforeCreate') {
        console.log('Creating:', event.model);
      }
    });
  }
};
```

## Content-Type Schema Definition

Content-types are defined in `schema.json` files with settings, info, attributes, and options. Create them via the Content-Type Builder or CLI.

```json
// ./src/api/restaurant/content-types/restaurant/schema.json
{
  "kind": "collectionType",
  "collectionName": "restaurants",
  "info": {
    "displayName": "Restaurant",
    "singularName": "restaurant",
    "pluralName": "restaurants",
    "description": "Restaurant content type"
  },
  "options": {
    "draftAndPublish": true,
    "privateAttributes": ["createdBy", "updatedBy"]
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true,
      "minLength": 3,
      "maxLength": 100
    },
    "description": {
      "type": "richtext"
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "rating": {
      "type": "decimal",
      "min": 0,
      "max": 5
    },
    "isOpen": {
      "type": "boolean",
      "default": true
    },
    "openingDate": {
      "type": "date"
    },
    "categories": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::category.category",
      "inversedBy": "restaurants"
    },
    "cover": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "gallery": {
      "type": "media",
      "multiple": true,
      "allowedTypes": ["images", "videos"]
    },
    "openingHours": {
      "type": "component",
      "repeatable": true,
      "component": "restaurant.opening-hours"
    },
    "content": {
      "type": "dynamiczone",
      "components": ["content.text-block", "content.image-gallery", "content.cta"]
    }
  }
}
```

## Configuration Files

Strapi configuration lives in the `/config` folder. Key files include database, server, admin panel, middlewares, and plugins configuration.

```javascript
// ./config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false)
    }
  }
});

// ./config/server.js
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  app: {
    keys: env.array('APP_KEYS')
  },
  cron: {
    enabled: true
  }
});

// ./config/admin.js
module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET')
  },
  apiToken: {
    salt: env('API_TOKEN_SALT')
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT')
    }
  }
});

// ./config/middlewares.js
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public'
];

// ./config/plugins.js
module.exports = ({ env }) => ({
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      defaultLimit: 25,
      maxLimit: 100
    }
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET')
        }
      }
    }
  }
});
```

Strapi provides a comprehensive headless CMS solution with flexible content modeling through the Content-Type Builder, powerful APIs (REST and GraphQL) for content delivery, and extensive backend customization options. The document-based architecture with `documentId` ensures stable content identification across versions and locales, while Draft & Publish and Internationalization features enable sophisticated content workflows.

For frontend integration, developers typically fetch content via the REST API using tools like `fetch` or `axios`, or via GraphQL with Apollo Client or similar libraries. The `populate` and `fields` parameters are essential for controlling response payload size and including related content. Backend customization through controllers, services, routes, and lifecycle hooks enables complex business logic implementation while maintaining clean separation of concerns.
