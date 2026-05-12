### Start Astro Development Server with npm

Source: https://docs.astro.build/en/reference/cli-reference

Use this command to start the development server and get a live preview of your site. Ensure npm is installed and configured.

```bash
# start the development server
npx astro dev

```

--------------------------------

### Create an Astro App instance

Source: https://docs.astro.build/en/reference/modules/astro-app

Use `createApp()` to get an `App` instance for building a server entrypoint. This example shows a basic setup for a fetch event listener.

```javascript
import { createApp } from "astro/app/entrypoint";
import http from "http";


const app = createApp();


addEventListener("fetch", event => {
  event.respondWith(
    app.render(event.request)
  );
});
```

--------------------------------

### Start Astro Development Server with pnpm

Source: https://docs.astro.build/en/reference/cli-reference

Use this command to start the development server and get a live preview of your site. Ensure pnpm is installed and configured.

```bash
# start the development server
pnpm astro dev

```

--------------------------------

### Install project dependencies

Source: https://docs.astro.build/en/install-and-setup

Run these commands if dependencies were not installed during the initial CLI setup.

```bash
npm install
```

```bash
pnpm install
```

```bash
yarn install
```

--------------------------------

### Installation

Source: https://docs.astro.build/en/guides/integrations-guide/vue

Automate the setup of the @astrojs/vue integration using the `astro add` command or perform a manual installation.

```APIDOC
## Installation

### Using astro add

To install `@astrojs/vue`, run the following from your project directory and follow the prompts:

```bash
npx astro add vue
```

```bash
pnpm astro add vue
```

```bash
yarn astro add vue
```

### Manual Install

First, install the `@astrojs/vue` package:

```bash
npm install @astrojs/vue
```

```bash
pnpm add @astrojs/vue
```

```bash
yarn add @astrojs/vue
```

If you encounter issues with Vue not being found, install Vue:

```bash
npm install vue
```

```bash
pnpm add vue
```

```bash
yarn add vue
```

Then, apply the integration to your `astro.config.*` file:

```javascript
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  // ...
  integrations: [vue()],
});
```
```

--------------------------------

### Astro info output example

Source: https://docs.astro.build/en/reference/cli-reference

Example output showing environment details such as Astro version, Node version, and installed integrations.

```text
Astro                    v5.14.1
Vite                     v6.3.6
Node                     v22.17.1
System                   macOS (arm64)
Package Manager          npm
Output                   static
Adapter                  none
Integrations             @astrojs/starlight (v0.35.3)
```

--------------------------------

### Install Day.js helper package

Source: https://docs.astro.build/en/recipes/modified-time

Install the Day.js library to handle time formatting.

```bash
npm install dayjs
```

```bash
pnpm add dayjs
```

```bash
yarn add dayjs
```

--------------------------------

### Basic Integration Setup

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

This is a boilerplate for an Astro integration, showing the structure for defining hooks like `astro:config:setup` and `astro:server:setup`.

```javascript
export default () => ({
  name: "my-integration",
  hooks: {
    "astro:config:setup": ({ addDevToolbarApp }) => {}, 
    "astro:server:setup": ({ toolbar }) => {}, 
  },
});
```

--------------------------------

### Install Astro project dependencies with Bun

Source: https://docs.astro.build/en/recipes/bun

Install project dependencies using Bun's package manager. This command should be run after creating the project or if dependencies were skipped during setup.

```bash
bun install
```

--------------------------------

### Install Dependencies on Server

Source: https://docs.astro.build/en/guides/deploy/deno

Install project dependencies on the target server.

```bash
npm install
```

```bash
pnpm install
```

```bash
yarn
```

--------------------------------

### Start the development server

Source: https://docs.astro.build/en/guides/cms/apostrophecms

Launches the local site with the required APOS_EXTERNAL_FRONT_KEY environment variable.

```bash
APOS_EXTERNAL_FRONT_KEY='MyRandomString' npm run dev
```

--------------------------------

### Start Application with Deno

Source: https://docs.astro.build/en/guides/deploy/deno

Launch the application using the Deno runtime.

```bash
deno run -A jsr:@std/http/file-server dist
```

```bash
deno run -A ./dist/server/entry.mjs
```

--------------------------------

### Migrate Server Entrypoint Start Function

Source: https://docs.astro.build/en/guides/upgrade-to/v6

Replace the start function pattern with direct event listener registration using createApp.

```javascript

import { App } from 'astro/app';


export function start(manifest) {
  const app = new App(manifest);


  addEventListener('fetch', event => {
    // ...
  });
}
import { createApp } from 'astro/app/entrypoint';


const app = createApp();


addEventListener('fetch', event => {
  // ...
});

```

--------------------------------

### Initialize project from a template

Source: https://docs.astro.build/en/install-and-setup

Use the --template flag to scaffold a project from an official example or a GitHub repository.

```bash
# create a new project with an official example
npm create astro@latest -- --template <example-name>


# create a new project based on a GitHub repository’s main branch
npm create astro@latest -- --template <github-username>/<github-repo>
```

```bash
# create a new project with an official example
pnpm create astro@latest --template <example-name>


# create a new project based on a GitHub repository’s main branch
pnpm create astro@latest --template <github-username>/<github-repo>
```

```bash
# create a new project with an official example
yarn create astro --template <example-name>


# create a new project based on a GitHub repository’s main branch
yarn create astro --template <github-username>/<github-repo>
```

--------------------------------

### Add @astrojs/svelte Integration (npm)

Source: https://docs.astro.build/en/guides/integrations-guide/svelte

Use the 'astro add' command to automate the setup of the @astrojs/svelte integration. This is the recommended method for installation.

```bash
npx astro add svelte
```

--------------------------------

### Install missing peer dependencies

Source: https://docs.astro.build/en/guides/integrations

Manually install required peer dependencies if the automatic setup fails to resolve them.

```bash
npm install [package-name]
```

```bash
pnpm add [package-name]
```

```bash
yarn add [package-name]
```

--------------------------------

### Initialize project with integrations

Source: https://docs.astro.build/en/install-and-setup

Use the --add flag to install official or community integrations during project creation.

```bash
# create a new project with React and Partytown
npm create astro@latest -- --add react --add partytown
```

```bash
# create a new project with React and Partytown
pnpm create astro@latest --add react --add partytown
```

```bash
# create a new project with React and Partytown
yarn create astro --add react --add partytown
```

--------------------------------

### Start the preview server programmatically

Source: https://docs.astro.build/en/reference/programmatic-reference

Starts a local server to serve build output using the preview function.

```typescript

import { preview } from "astro";


const previewServer = await preview({
  root: "./my-project",
});


// Stop the server if needed
await previewServer.stop();

```

--------------------------------

### preview() - Serve Built Site Locally

Source: https://docs.astro.build/en/reference/programmatic-reference

Starts a local server to serve the built site output, similar to `astro preview`.

```APIDOC
## POST /api/preview

### Description
Starts a local server to serve your build output.

### Method
POST

### Endpoint
/api/preview

### Parameters
#### Request Body
- **inlineConfig** (AstroInlineConfig) - Required - Configuration object for the preview server.

### Request Example
```json
{
  "inlineConfig": {
    "root": "./my-project"
  }
}
```

### Response
#### Success Response (200)
- **PreviewServer** (object) - An object representing the preview server. (Note: Specific properties for PreviewServer are not detailed in the source text, but it is expected to have a `stop` method similar to `DevServer`.)

#### Response Example
```json
{
  "stop": "[Function: stop]"
}
```
```

--------------------------------

### Install Nano Stores with Yarn

Source: https://docs.astro.build/en/recipes/sharing-state

Use this command to install Nano Stores if you are using Yarn.

```bash
yarn add nanostores
```

--------------------------------

### Convert Markdown frontmatter to MDX

Source: https://docs.astro.build/en/guides/upgrade-to/v1

Example of moving setup imports from frontmatter to the body when migrating to MDX.

```markdown
---
layout: '../../layouts/BaseLayout.astro'
setup: |
  import ReactCounter from '../../components/ReactCounter.jsx'
title: 'Migrating to MDX'
date: 2022-07-26
tags: ["markdown", "mdx", "astro"]
---
import ReactCounter from '../../components/ReactCounter.jsx'
```

--------------------------------

### Install Kontent.ai delivery SDK

Source: https://docs.astro.build/en/guides/cms/kontent-ai

Install the required SDK using your preferred package manager.

```bash
npm install @kontent-ai/delivery-sdk
```

```bash
pnpm add @kontent-ai/delivery-sdk
```

```bash
yarn add @kontent-ai/delivery-sdk
```

--------------------------------

### Install Nano Stores with Solid support

Source: https://docs.astro.build/en/recipes/sharing-state-islands

Install the nanostores library along with its Solid helper package to enable Nano Stores functionality within Solid components.

```bash
npm install nanostores @nanostores/solid
```

--------------------------------

### Enable `astro add` Installation

Source: https://docs.astro.build/en/reference/adapter-reference

Instructions on how to configure your adapter's `package.json` to enable installation via the `astro add` command.

```APIDOC
## Allow installation via `astro add`

### Description
To allow your adapter to be installed using the `astro add` command, you need to add `astro-adapter` to the `keywords` field in your `package.json` file.

### Example `package.json`

```json
{
  "name": "example",
  "keywords": ["astro-adapter"]
}
```

### Usage
Once published to npm, users can install your adapter by running `astro add <your-adapter-name>`. This will install your package and any peer dependencies, and prompt users to update their project configuration.
```

--------------------------------

### `astro:build:setup` hook

Source: https://docs.astro.build/en/reference/integrations-reference

A hook that runs immediately before the build starts, after the Vite configuration is complete. It provides access to modify the Vite config, inspect pages, and update the configuration.

```APIDOC
## `astro:build:setup` hook

### Description
Runs immediately before the build, after the Vite config is constructed. This is the final chance to modify the Vite config or inspect page data.

### When
After the `astro:build:start` hook, runs immediately before the build.

### Options
- **`vite`** (`vite.InlineConfig`): Access to the Vite configuration used in the build.
- **`pages`** (`Map<string, PageBuildData>`): A map of pages and their build data.
- **`updateConfig`** (`(newConfig: vite.InlineConfig) => void`): A callback to update the Vite options.
- **`logger`** (`AstroIntegrationLogger`): An instance of the Astro logger.

### Type
`(options: { vite: vite.InlineConfig; pages: Map<string, PageBuildData>; updateConfig: (newConfig: vite.InlineConfig) => void; logger: AstroIntegrationLogger; }) => void | Promise<void>;`

### Usage Example (vite option)
```javascript
export default {
  name: 'my-integration',
  hooks: {
    'astro:build:setup': ({ vite }) => {
      const { publicDir, root } = vite;
    },
  }
}
```

### Usage Example (pages option)
```javascript
export default {
  name: 'my-integration',
  hooks: {
    'astro:build:setup': ({ pages }) => {
      pages.forEach((data) => {
        if (data.route.pattern.test("/blog")) {
          console.log(data.route.type);
        }
      });
    },
  }
}
```

### Usage Example (updateConfig option)
```javascript
import awesomeCssPlugin from 'awesome-css-vite-plugin';

export default {
  name: 'my-integration',
  hooks: {
    'astro:build:setup': ({ updateConfig }) => {
      updateConfig({
        plugins: [awesomeCssPlugin()],
      })
    }
  }
}
```
```

--------------------------------

### Add @astrojs/svelte Integration (pnpm)

Source: https://docs.astro.build/en/guides/integrations-guide/svelte

Use the 'astro add' command with pnpm to automate the setup of the @astrojs/svelte integration. This is the recommended method for installation.

```bash
pnpm astro add svelte
```

--------------------------------

### Manual Installation

Source: https://docs.astro.build/en/guides/integrations-guide/vue

Install the package and its peer dependency manually using your preferred package manager.

```bash
npm install @astrojs/vue
```

```bash
pnpm add @astrojs/vue
```

```bash
yarn add @astrojs/vue
```

```bash
npm install vue
```

```bash
pnpm add vue
```

```bash
yarn add vue
```

--------------------------------

### `astro:server:setup` Hook

Source: https://docs.astro.build/en/reference/integrations-reference

This hook is called just after the Vite development server is created but before it starts listening for connections. It allows modifications to the Vite server options and middleware, and enables content layer refreshing.

```APIDOC
## `astro:server:setup` Hook

### Description
Runs just after the Vite server is created in development mode, but before the `listen()` event is fired. Useful for modifying Vite server options, adding middleware, or enabling content layer refreshing.

### Signature
```typescript
'astro:server:setup'?: (options: {
  server: vite.ViteDevServer;
  logger: AstroIntegrationLogger;
  toolbar: ReturnType<typeof getToolbarServerCommunicationHelpers>;
  refreshContent: (options: {
    loaders?: Array<string>;
    context?: Record<string, any>;
  }) => Promise<void>;
}) => void | Promise<void>;
```

### Options
- **`server`** (ViteDevServer) - A mutable instance of the Vite development server.
- **`logger`** (AstroIntegrationLogger) - An instance of the Astro logger.
- **`toolbar`** (ReturnType<typeof getToolbarServerCommunicationHelpers>) - An object providing callback functions to interact with the dev toolbar.
  - **`toolbar.on(event: string, callback: (data: T) => void) => void`**: Listens for events from dev toolbar apps.
  - **`toolbar.onAppInitialized(appId: string, callback: (data: Record<string, never>) => void) => void`**: Executes a callback when a dev toolbar app is initialized.
  - **`toolbar.onAppToggled(appId: string, callback: (data: { state: boolean; }) => void) => void`**: Executes a callback when a dev toolbar app's state changes.
- **`refreshContent`** ((options: { loaders?: Array<string>; context?: Record<string, any>; }) => Promise<void>) - A function to refresh the content layer with optional loaders and context.
```

--------------------------------

### Install Deno Astro Adapter

Source: https://docs.astro.build/en/guides/deploy/deno

Install the required adapter using your preferred package manager.

```bash
npm install @deno/astro-adapter
```

```bash
pnpm install @deno/astro-adapter
```

```bash
yarn add @deno/astro-adapter
```

--------------------------------

### Create an Astro project from a template using Bun

Source: https://docs.astro.build/en/recipes/bun

Initialize a new Astro project using a specified official example or a GitHub repository template. Replace `<example-name>` with the template's name or `<github-username>/<github-repo>` for a custom template.

```bash
# create a new project with an official example
bun create astro@latest --template <example-name>
# create a new project based on a GitHub repository’s main branch
bun create astro@latest --template <github-username>/<github-repo>
```

--------------------------------

### Start Astro Development Server with npm

Source: https://docs.astro.build/en/develop-and-build

Use this command to start the Astro development server. It allows you to see live updates as you edit your code.

```bash
npm run dev
```

--------------------------------

### Start development with remote connection

Source: https://docs.astro.build/en/guides/astro-db

Run the development server connected to a live production database.

```bash
astro dev --remote
```

--------------------------------

### Install Nano Stores with npm

Source: https://docs.astro.build/en/recipes/sharing-state

Use this command to install Nano Stores if you are using npm.

```bash
npm install nanostores
```

--------------------------------

### Install Stylus

Source: https://docs.astro.build/en/guides/styling

Install the Stylus preprocessor using npm for use in Astro projects.

```bash
npm install stylus
```

--------------------------------

### Install Nano Stores with Preact support

Source: https://docs.astro.build/en/recipes/sharing-state-islands

Install the nanostores library along with its Preact helper package to enable Nano Stores functionality within Preact components.

```bash
npm install nanostores @nanostores/preact
```

--------------------------------

### Add @astrojs/svelte Integration (Yarn)

Source: https://docs.astro.build/en/guides/integrations-guide/svelte

Use the 'astro add' command with Yarn to automate the setup of the @astrojs/svelte integration. This is the recommended method for installation.

```bash
yarn astro add svelte
```

--------------------------------

### Install Deno Deploy CLI

Source: https://docs.astro.build/en/guides/deploy/deno

Command to install the Deno Deploy CLI globally.

```bash
deno install -gArf jsr:@deno/deployctl
```

--------------------------------

### Configure Preview Entrypoint

Source: https://docs.astro.build/en/reference/adapter-reference

Specify the module responsible for starting the built server during `astro preview` using `previewEntrypoint`. This should be a string path or URL to the module.

```javascript
export default function createIntegration() {
  return {
    name: '@example/my-adapter',
    hooks: {
      'astro:config:done': ({ config, setAdapter }) => {
        setAdapter({
          name: '@example/my-adapter',
          entrypointResolution: 'auto',
          serverEntrypoint: '@example/my-adapter/server.js',
          previewEntrypoint: '@example/my-adapter/preview.js',
        });
      },
    },
  };
}
```

--------------------------------

### Add Middleware to Vite Dev Server in astro:server:setup

Source: https://docs.astro.build/en/reference/integrations-reference

The `astro:server:setup` hook allows you to modify the Vite development server. This example shows how to inject custom middleware using `server.middlewares.use()`.

```javascript
export default {
  name: 'partytown',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use(
        function middleware(req, res, next) {
          // handle requests
        }
      );
    }
  }
}
```

--------------------------------

### Install Nano Stores with pnpm

Source: https://docs.astro.build/en/recipes/sharing-state

Use this command to install Nano Stores if you are using pnpm.

```bash
pnpm add nanostores
```

--------------------------------

### Manual Package Installation

Source: https://docs.astro.build/en/guides/integrations-guide/alpinejs

Install the integration package manually using your preferred package manager.

```bash
npm install @astrojs/alpinejs
```

```bash
pnpm add @astrojs/alpinejs
```

```bash
yarn add @astrojs/alpinejs
```

--------------------------------

### Install Surge CLI

Source: https://docs.astro.build/en/guides/deploy/surge

Install the Surge command-line interface globally to enable deployment commands.

```bash
npm install -g surge
```

--------------------------------

### Install Juno CLI with pnpm

Source: https://docs.astro.build/en/guides/deploy/juno

Installs the Juno command-line interface globally using pnpm, providing an alternative method for CLI installation.

```bash
pnpm add -g @junobuild/cli
```

--------------------------------

### Add Dev Toolbar App in astro:config:setup Hook

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

Integrations can add apps to the dev toolbar within the `astro:config:setup` hook. This example shows the basic structure for adding a new app.

```javascript
/**
 * @type {() => import('astro').AstroIntegration}
 */
export default () => ({
  name: "my-integration",
  hooks: {
    "astro:config:setup": ({ addDevToolbarApp }) => {
      addDevToolbarApp({
        id: "my-app",
        name: "My App",
        icon: "<svg>...</svg>",
        entrypoint: "./my-app.js",
      });
    },
  },
});
```

--------------------------------

### Dockerfile for Astro Static Site with NGINX

Source: https://docs.astro.build/en/recipes/docker

Build your Astro site and serve it using NGINX on port 8080. This example includes steps for installing dependencies and building the site.

```dockerfile
FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine AS runtime
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
```

--------------------------------

### Initialize a new Astro blog project

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-gridsome

Commands to scaffold a new Astro project using the blog starter template with different package managers.

```bash
npm create astro@latest -- --template blog
```

```bash
pnpm create astro@latest --template blog
```

```bash
yarn create astro --template blog
```

--------------------------------

### Install Netlify CLI with pnpm

Source: https://docs.astro.build/en/guides/deploy

Install the Netlify command-line interface globally using pnpm. This is an alternative package manager for installing CLIs.

```bash
pnpm add --global netlify-cli
```

--------------------------------

### Install Astro Integrations

Source: https://docs.astro.build/en/guides/upgrade-to/v1

Commands to install the necessary framework packages for the new integration system.

```bash
# Install your new integrations and frameworks:
# (Read the full walkthrough: https://docs.astro.build/en/guides/integrations-guide)
npm install @astrojs/lit lit
npm install @astrojs/react react react-dom
```

--------------------------------

### Modify Vite Config in Astro Build Setup

Source: https://docs.astro.build/en/reference/integrations-reference

Access and modify the Vite configuration during the `astro:build:setup` hook. This is the final chance to alter the Vite config before the build starts.

```javascript
'astro:build:setup'?: (options: {
  vite: vite.InlineConfig;
  pages: Map<string, PageBuildData>;
  updateConfig: (newConfig: vite.InlineConfig) => void;
  logger: AstroIntegrationLogger;
}) => void | Promise<void>;
```

--------------------------------

### Add Bun runtime types to an Astro project

Source: https://docs.astro.build/en/recipes/bun

Install the `@types/bun` package as a dev dependency to get type definitions for the Bun runtime in your Astro project.

```bash
bun add -d @types/bun
```

--------------------------------

### Configure integration in `astro.config.js`

Source: https://docs.astro.build/en/reference/integrations-reference

After publishing your integration, users can add it to their `astro.config.*` file. This example shows how to import and include the `example` integration.

```javascript
import { defineConfig } from 'astro/config';
import example from 'example';


export default defineConfig({
  integrations: [example()],
})
```

--------------------------------

### Install Astro with pnpm

Source: https://docs.astro.build/en/install-and-setup

Installs Astro as a local project dependency using pnpm. Ensure you are not installing it globally.

```bash
pnpm add astro
```

--------------------------------

### Install ButterCMS SDK with npm

Source: https://docs.astro.build/en/guides/cms/buttercms

Install the ButterCMS SDK using npm.

```bash
npm install buttercms
```

--------------------------------

### Install Netlify Adapter Manually with npm

Source: https://docs.astro.build/en/guides/integrations-guide/netlify

Manually install the `@astrojs/netlify` package as a project dependency using npm.

```bash
npm install @astrojs/netlify
```

--------------------------------

### Install @astrojs/markdoc Package

Source: https://docs.astro.build/en/guides/integrations-guide/markdoc

Manually install the @astrojs/markdoc package using npm.

```bash
npm install @astrojs/markdoc
```

--------------------------------

### Install Netlify CLI with Yarn

Source: https://docs.astro.build/en/guides/deploy

Install the Netlify command-line interface globally using Yarn. This is another popular package manager for installing CLIs.

```bash
yarn global add netlify-cli
```

--------------------------------

### Basic Action Result Middleware

Source: https://docs.astro.build/en/guides/actions

Implement middleware to manually handle action results, allowing for custom persistence strategies like session storage. This example shows how to get action context and set results programmatically.

```javascript
import { defineMiddleware } from 'astro:middleware';
import { getActionContext } from 'astro:actions';


export const onRequest = defineMiddleware(async (context, next) => {
  const { action, setActionResult, serializeActionResult } = getActionContext(context);
  if (action?.calledFrom === 'form') {
    const result = await action.handler();
    // ... handle the action result
    setActionResult(action.name, serializeActionResult(result));
  }
  return next();
});

```

--------------------------------

### Add multiple integrations simultaneously

Source: https://docs.astro.build/en/guides/integrations

Install and configure several integrations at once using the CLI.

```bash
npx astro add react sitemap partytown
```

```bash
pnpm astro add react sitemap partytown
```

```bash
yarn astro add react sitemap partytown
```

--------------------------------

### Add Tailwind CSS 4 via CLI (pnpm)

Source: https://docs.astro.build/en/guides/styling

Use this command to install the official Vite Tailwind plugin for Astro >=5.2.0. This command handles the necessary setup for Tailwind 4.

```bash
pnpm astro add tailwind
```

--------------------------------

### Install ButterCMS SDK with pnpm

Source: https://docs.astro.build/en/guides/cms/buttercms

Install the ButterCMS SDK using pnpm.

```bash
pnpm add buttercms
```

--------------------------------

### Install ButterCMS SDK with Yarn

Source: https://docs.astro.build/en/guides/cms/buttercms

Install the ButterCMS SDK using Yarn.

```bash
yarn add buttercms
```

--------------------------------

### Add Tailwind CSS 4 via CLI (Yarn)

Source: https://docs.astro.build/en/guides/styling

Use this command to install the official Vite Tailwind plugin for Astro >=5.2.0. This command handles the necessary setup for Tailwind 4.

```bash
yarn astro add tailwind
```

--------------------------------

### Initialize a new Astro project with the toolbar-app template

Source: https://docs.astro.build/en/recipes/making-toolbar-apps

Use these commands to quickly scaffold a new project with the required toolbar app structure.

```bash
npm create astro@latest -- --template toolbar-app
```

```bash
pnpm create astro -- --template toolbar-app
```

```bash
yarn create astro -- --template toolbar-app
```

--------------------------------

### Install Sass

Source: https://docs.astro.build/en/guides/styling

Install the Sass preprocessor using npm for use in Astro projects.

```bash
npm install sass
```

--------------------------------

### Install reading time dependencies

Source: https://docs.astro.build/en/recipes/reading-time

Install the necessary packages to calculate reading time and extract text from Markdown.

```bash
npm install reading-time mdast-util-to-string
```

```bash
pnpm add reading-time mdast-util-to-string
```

```bash
yarn add reading-time mdast-util-to-string
```

--------------------------------

### Install Astro with npm

Source: https://docs.astro.build/en/install-and-setup

Installs Astro as a local project dependency using npm. Ensure you are not installing it globally.

```bash
npm install astro
```

--------------------------------

### Install Less

Source: https://docs.astro.build/en/guides/styling

Install the Less preprocessor using npm for use in Astro projects.

```bash
npm install less
```

--------------------------------

### Add Tailwind CSS 4 via CLI (npm)

Source: https://docs.astro.build/en/guides/styling

Use this command to install the official Vite Tailwind plugin for Astro >=5.2.0. This command handles the necessary setup for Tailwind 4.

```bash
npx astro add tailwind
```

--------------------------------

### Install Prisma Dependencies

Source: https://docs.astro.build/en/guides/backend/prisma-postgres

Installs Prisma ORM and related packages for an Astro project. Ensure an Astro adapter is installed for SSR.

```bash
npm install prisma tsx --save-dev
npm install @prisma/adapter-pg @prisma/client
```

--------------------------------

### Install Netlify Adapter Manually with pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/netlify

Manually install the `@astrojs/netlify` package as a project dependency using pnpm.

```bash
pnpm add @astrojs/netlify
```

--------------------------------

### Run the Astro development server with Bun

Source: https://docs.astro.build/en/recipes/bun

Start the local development server for your Astro project using Bun. This command allows you to preview your site during development.

```bash
bun run dev
```

--------------------------------

### Install Astro with Yarn

Source: https://docs.astro.build/en/install-and-setup

Installs Astro as a local project dependency using Yarn. Ensure you are not installing it globally.

```bash
yarn add astro
```

--------------------------------

### Install @astrojs/sitemap package using npm

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

Manually install the @astrojs/sitemap package using npm.

```bash
npm install @astrojs/sitemap
```

--------------------------------

### Enable Local Development with Azion CLI

Source: https://docs.astro.build/en/guides/deploy/azion

Run this command to start a local development server. It enables live previewing of your Astro site during development.

```bash
azion dev
```

--------------------------------

### Get Static Paths for Translated Content

Source: https://docs.astro.build/en/recipes/i18n

In static rendering mode, use `getStaticPaths` to generate all possible page paths based on your content collection. This example maps each blog entry to a unique URL with language and slug parameters.

```astro
---
import { getCollection, render } from 'astro:content';


export async function getStaticPaths() {
  const pages = await getCollection('blog');


  const paths = pages.map(page => {
    const [lang, ...slug] = page.id.split('/');
    return { params: { lang, slug: slug.join('/') || undefined }, props: page };
  });


  return paths;
}


const { lang, slug } = Astro.params;
const page = Astro.props;
const formattedDate = page.data.date.toLocaleString(lang);
const { Content } = await render(page);
---
<h1>{page.data.title}</h1>
<p>by {page.data.author} • {formattedDate}</p>
<Content/>

```

--------------------------------

### Create Astro Blog Project with npm

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-eleventy

Use this command to start a new Astro project with the official blog theme using npm.

```bash
npm create astro@latest -- --template blog
```

--------------------------------

### Initialize Prisma

Source: https://docs.astro.build/en/guides/backend/prisma-postgres

Initializes Prisma in your project, creating a `prisma/` directory and a `.env` file with the `DATABASE_URL`.

```bash
npx prisma init --db --output ./generated
```

--------------------------------

### Install @astrojs/markdoc Package with pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/markdoc

Manually install the @astrojs/markdoc package using pnpm.

```bash
pnpm add @astrojs/markdoc
```

--------------------------------

### Install PostgreSQL Client for Direct Connection

Source: https://docs.astro.build/en/guides/backend/prisma-postgres

Installs the `pg` package for making direct TCP connections to Prisma Postgres from an Astro project.

```bash
npm install pg
```

--------------------------------

### Install Zerops CLI

Source: https://docs.astro.build/en/guides/deploy/zerops

Installs the Zerops CLI globally via npm.

```bash
npm i -g @zerops/zcli
```

--------------------------------

### Install Netlify CLI

Source: https://docs.astro.build/en/guides/deploy/netlify

Install the Netlify CLI globally to manage Netlify sites and deployments from your command line.

```bash
npm install --global netlify-cli
```

--------------------------------

### Create a Turso database

Source: https://docs.astro.build/en/guides/astro-db

Use the Turso CLI to initialize a new database instance.

```bash
turso db create andromeda
```

--------------------------------

### Install Juno CLI with Yarn

Source: https://docs.astro.build/en/guides/deploy/juno

Installs the Juno command-line interface globally using Yarn, offering another package manager option for CLI installation.

```bash
yarn global add @junobuild/cli
```

--------------------------------

### Install graphql-request dependencies

Source: https://docs.astro.build/en/guides/cms/hashnode

Commands to install the required GraphQL client package using various package managers.

```bash
npm install graphql-request
```

```bash
pnpm add graphql-request
```

```bash
yarn add graphql-request
```

--------------------------------

### Install @astrojs/sitemap package using pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

Manually install the @astrojs/sitemap package using pnpm.

```bash
pnpm add @astrojs/sitemap
```

--------------------------------

### Example Post Content File

Source: https://docs.astro.build/en/guides/cms/keystatic

A sample Markdoc file (`.mdoc`) created by Keystatic, showing frontmatter for title and the main content.

```markdown
---
title: My First Post
---


This is my very first post. I am **super** excited!
```

--------------------------------

### Install LightningCSS

Source: https://docs.astro.build/en/guides/styling

Install the LightningCSS transformer using npm for CSS processing in Astro.

```bash
npm install lightningcss
```

--------------------------------

### Install @astrojs/rss

Source: https://docs.astro.build/en/recipes/rss

Install the @astrojs/rss package using npm, pnpm, or Yarn.

```bash
npm install @astrojs/rss
```

```bash
pnpm add @astrojs/rss
```

```bash
yarn add @astrojs/rss
```

--------------------------------

### Example Astro Page

Source: https://docs.astro.build/en/guides/testing

This is an example of an Astro page (`index.astro`) that can be tested.

```html
---
---
<html lang="en">
  <head>
    <title>Astro is awesome!</title>
    <meta name="description" content="Pull content from anywhere and serve it fast with Astro's next-gen islands architecture." />
  </head>
  <body></body>
</html>

```

--------------------------------

### Install @astrojs/markdoc Package with Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/markdoc

Manually install the @astrojs/markdoc package using Yarn.

```bash
yarn add @astrojs/markdoc
```

--------------------------------

### Install Node.js Adapter

Source: https://docs.astro.build/en/guides/deploy/seenode

Use the Astro CLI to install the Node.js adapter for SSR support.

```bash
npx astro add node
```

```bash
pnpm astro add node
```

```bash
yarn astro add node
```

--------------------------------

### Install TypeScript with pnpm

Source: https://docs.astro.build/en/recipes/making-toolbar-apps

Install TypeScript as a development dependency using pnpm.

```bash
pnpm install --save-dev typescript
```

--------------------------------

### Update Astro Config with Vite Plugin

Source: https://docs.astro.build/en/reference/integrations-reference

Example of using `updateConfig` within the `astro:config:setup` hook to add a Vite plugin. This is useful for integrating tools like CSS preprocessors.

```javascript
import bananaCSS from '@vitejs/official-banana-css-plugin';


export default {
  name: 'banana-css-integration',
  hooks: {
    'astro:config:setup': ({ updateConfig }) => {
      updateConfig({
        vite: {
          plugins: [bananaCSS()],
        }
      })
    }
  }
}

```

--------------------------------

### Install rollup-plugin-visualizer

Source: https://docs.astro.build/en/recipes/analyze-bundle-size

Install the plugin as a development dependency using your preferred package manager.

```bash
npm install rollup-plugin-visualizer --save-dev
```

```bash
pnpm add rollup-plugin-visualizer --save-dev
```

```bash
yarn add rollup-plugin-visualizer --save-dev
```

--------------------------------

### Zerops CLI Installation Comment

Source: https://docs.astro.build/en/guides/deploy/zerops

Reference for downloading the Zerops CLI binary.

```bash

# To download the zcli binary directly,

```

--------------------------------

### Install TypeScript with npm

Source: https://docs.astro.build/en/recipes/making-toolbar-apps

Install TypeScript as a development dependency using npm.

```bash
npm install --save-dev typescript
```

--------------------------------

### Install TypeScript with Yarn

Source: https://docs.astro.build/en/recipes/making-toolbar-apps

Install TypeScript as a development dependency using Yarn.

```bash
yarn add --dev typescript
```

--------------------------------

### Install Node Adapter Manually with npm

Source: https://docs.astro.build/en/guides/integrations-guide/node

Manually install the @astrojs/node package using npm as a project dependency.

```bash
npm install @astrojs/node
```

--------------------------------

### Install Netlify Adapter Manually with Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/netlify

Manually install the `@astrojs/netlify` package as a project dependency using Yarn.

```bash
yarn add @astrojs/netlify
```

--------------------------------

### Initialize Azion Project

Source: https://docs.astro.build/en/guides/deploy/azion

Use this command to initialize and configure your project for Azion deployment. This sets up the necessary project structure.

```bash
azion init
```

--------------------------------

### Install Svelte and TypeScript Peer Dependencies (pnpm)

Source: https://docs.astro.build/en/guides/integrations-guide/svelte

Install Svelte and TypeScript manually using pnpm if you encounter 'Cannot find package' warnings after installing the integration.

```bash
pnpm add svelte typescript
```

--------------------------------

### Install Nano Stores with React support

Source: https://docs.astro.build/en/recipes/sharing-state-islands

Install the nanostores library along with its React helper package to enable Nano Stores functionality within React components.

```bash
npm install nanostores @nanostores/react
```

--------------------------------

### Install Svelte and TypeScript Peer Dependencies (Yarn)

Source: https://docs.astro.build/en/guides/integrations-guide/svelte

Install Svelte and TypeScript manually using Yarn if you encounter 'Cannot find package' warnings after installing the integration.

```bash
yarn add svelte typescript
```

--------------------------------

### Install Svelte and TypeScript Peer Dependencies (npm)

Source: https://docs.astro.build/en/guides/integrations-guide/svelte

Install Svelte and TypeScript manually using npm if you encounter 'Cannot find package' warnings after installing the integration.

```bash
npm install svelte typescript
```

--------------------------------

### Manually Install @astrojs/mdx Package

Source: https://docs.astro.build/en/guides/integrations-guide/mdx

Install the @astrojs/mdx package using npm, pnpm, or Yarn.

```bash
npm install @astrojs/mdx
```

```bash
pnpm add @astrojs/mdx
```

```bash
yarn add @astrojs/mdx
```

--------------------------------

### Trigger Content Refresh with Webhook

Source: https://docs.astro.build/en/reference/integrations-reference

Use `refreshContent` within `astro:server:setup` to trigger a content layer update during `astro dev`. This example shows how to set up a webhook endpoint to receive POST requests and refresh specific collections with context data.

```javascript
{
  name: 'my-integration',
  hooks: {
    'astro:server:setup': async ({ server, refreshContent }) => {
      // Register a dev server webhook endpoint
      server.middlewares.use('/_refresh', async (req, res) => {
        if(req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed');
          return
        }
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const webhookBody = JSON.parse(body);
            await refreshContent({
              context: { webhookBody },
              loaders: ['my-loader']
            });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Content refreshed successfully' }));
          } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to refresh content: ' + error.message }));
          }
        });
      });
    }
  }
}
```

--------------------------------

### Start the Astro development server

Source: https://docs.astro.build/en/tutorial/1-setup/2

Run the development server to preview project files as a website. The server typically runs on http://localhost:4321.

```bash
npm run dev
```

```bash
pnpm run dev
```

```bash
yarn run dev
```

--------------------------------

### Install @astrojs/sitemap package using Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

Manually install the @astrojs/sitemap package using Yarn.

```bash
yarn add @astrojs/sitemap
```

--------------------------------

### Update package.json Scripts

Source: https://docs.astro.build/en/guides/deploy/seenode

Define the start script to execute the built server entry point in production.

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "start": "NODE_ENV=production node ./dist/server/entry.mjs"
  }
}
```

--------------------------------

### Pass Custom Components to MDX Content (Content Collections)

Source: https://docs.astro.build/en/guides/integrations-guide/mdx

For MDX files within content collections, use `render()` from `astro:content` to get the `Content` component. Pass custom components via the `components` prop to the `<Content />` component, for example, to replace all `<h1>` elements with a `CustomHeading` component.

```astro
---
import { getEntry, render } from 'astro:content';
import CustomHeading from '../../components/CustomHeading.astro';
const entry = await getEntry('blog', 'post-1');
const { Content } = await render(entry);
---
<Content components={{ h1: CustomHeading }} />

```

--------------------------------

### Install Storyblok integration

Source: https://docs.astro.build/en/guides/cms/storyblok

Install the @storyblok/astro and vite packages using a package manager.

```bash
npm install @storyblok/astro vite
```

```bash
pnpm add @storyblok/astro vite
```

```bash
yarn add @storyblok/astro vite
```

--------------------------------

### Preview Production Site

Source: https://docs.astro.build/en/guides/deploy/deno

Run the preview command locally using Deno.

```bash
npm run preview
```

```bash
pnpm run preview
```

```bash
yarn run preview
```

--------------------------------

### Automated Installation

Source: https://docs.astro.build/en/guides/integrations-guide/vue

Use the Astro CLI to automatically add the Vue integration to your project.

```bash
npx astro add vue
```

```bash
pnpm astro add vue
```

```bash
yarn astro add vue
```

--------------------------------

### Start Astro Development Server with pnpm

Source: https://docs.astro.build/en/develop-and-build

Use this command to start the Astro development server with pnpm. It allows you to see live updates as you edit your code.

```bash
pnpm run dev
```

--------------------------------

### Install Cypress with pnpm

Source: https://docs.astro.build/en/guides/testing

Install Cypress as a development dependency in your project using pnpm.

```bash
pnpm add --save-dev cypress
```

--------------------------------

### Install Better Auth with npm

Source: https://docs.astro.build/en/guides/authentication

Use this command to install the Better Auth package using npm.

```bash
npm install better-auth
```

--------------------------------

### Astro Example Page

Source: https://docs.astro.build/en/guides/testing

An example Astro page component to be used for testing.

```astro
---
---
<html lang="en">
  <head>
    <title>Astro is awesome!</title>
    <meta name="description" content="Pull content from anywhere and serve it fast with Astro's next-gen islands architecture." />
  </head>
  <body>
  <h1>Hello world from Astro</h1>
  </body>
</html>
```

--------------------------------

### Install Flotiq TypeScript SDK

Source: https://docs.astro.build/en/guides/cms/flotiq

Install the SDK using your preferred package manager.

```bash
npm install flotiq-api-ts
```

```bash
pnpm add flotiq-api-ts
```

```bash
yarn add flotiq-api-ts
```

--------------------------------

### Fetch and Display Posts from Turso

Source: https://docs.astro.build/en/guides/backend/turso

Import the initialized Turso client and execute a SQL query to fetch data. This example retrieves all posts and displays their titles.

```astro
---
import { turso } from '../turso'


const { rows } = await turso.execute('SELECT * FROM posts')
---


<ul>
  {rows.map((post) => (
    <li>{post.title}</li>
  ))}
</ul>
```

--------------------------------

### Install Nano Stores with Vue support

Source: https://docs.astro.build/en/recipes/sharing-state-islands

Install the nanostores library along with its Vue helper package to enable Nano Stores functionality within Vue components.

```bash
npm install nanostores @nanostores/vue
```

--------------------------------

### Install Node Adapter Manually with pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/node

Manually install the @astrojs/node package using pnpm as a project dependency.

```bash
pnpm add @astrojs/node
```

--------------------------------

### Install LibSQL Client with npm

Source: https://docs.astro.build/en/guides/backend/turso

Install the official LibSQL client package using npm. This package is necessary for connecting Astro to your Turso database.

```bash
npm install @libsql/client
```

--------------------------------

### Install Better Auth with Yarn

Source: https://docs.astro.build/en/guides/authentication

Use this command to install the Better Auth package using Yarn.

```bash
yarn add better-auth
```

--------------------------------

### Configure deployment settings

Source: https://docs.astro.build/en/guides/configuring-astro

Example configuration for setting the site URL, base path, and trailing slash behavior in the Astro config file.

```javascript
import { defineConfig } from "astro/config";


export default defineConfig({
  site: "https://www.example.com",
  base: "/docs",
  trailingSlash: "always",
});
```

--------------------------------

### createApp()

Source: https://docs.astro.build/en/reference/modules/astro-app

Creates an App instance for building an adapter's server entrypoint. It supports standard Request and Response objects and can be configured with options like streaming.

```APIDOC
## createApp()

### Description
Returns an `App` instance that includes methods to work with standard Request and Response objects when building an adapter’s server entrypoint.

### Type
`(options?: { streaming: boolean }) => App`

### Added in
`astro@6.0.0`

### Options
#### `options.streaming`
**Type:** `boolean`
**Default:** `true`
Defines whether HTML streaming is enabled. Disabling streaming is generally not recommended as it impacts performance and user experience. It can be disabled by passing `streaming: false` to `createApp()` if required by the host environment.

### Example
```javascript
import { createApp } from "astro/app/entrypoint";
import http from "http";

const app = createApp();

addEventListener("fetch", event => {
  event.respondWith(
    app.render(event.request)
  );
});
```

### Example with streaming disabled
```javascript
import { createApp } from 'astro/app/entrypoint'

const app = createApp({ streaming: false })
```
```

--------------------------------

### Install @astrojs/partytown Package with npm

Source: https://docs.astro.build/en/guides/integrations-guide/partytown

Manually install the @astrojs/partytown package using npm.

```bash
npm install @astrojs/partytown
```

--------------------------------

### Install @clerk/astro with npm

Source: https://docs.astro.build/en/guides/authentication

Use this command to install the Clerk Astro integration via npm.

```bash
npm install @clerk/astro
```

--------------------------------

### Install Cypress with npm

Source: https://docs.astro.build/en/guides/testing

Install Cypress as a development dependency in your project using npm.

```bash
npm install cypress --save-dev
```

--------------------------------

### Install Sharp image service

Source: https://docs.astro.build/en/guides/images

Manually install the Sharp dependency if required by your package manager.

```bash

pnpm add sharp

```

--------------------------------

### Initialize Astro Component template with npm

Source: https://docs.astro.build/en/guides/integrations

Use npm to create a new directory and initialize it with the Astro Component template for quick development.

```bash
# Initialize the Astro Component template in a new directory
npm create astro@latest my-new-component-directory -- --template component
```

--------------------------------

### Install Mux Video

Source: https://docs.astro.build/en/guides/media/mux

Commands to install the @mux/mux-video package using various package managers.

```bash
npm install @mux/mux-video
```

```bash
pnpm add @mux/mux-video
```

```bash
yarn add @mux/mux-video
```

--------------------------------

### Update package.json Start Script for SSR

Source: https://docs.astro.build/en/guides/deploy/zerops

Configure the start script to execute the server entry point generated by the Node adapter.

```json

"scripts": {
  "start": "node ./dist/server/entry.mjs",
}

```

--------------------------------

### Install Vercel Adapter Manually with pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/vercel

Manually install the @astrojs/vercel adapter as a project dependency using pnpm.

```bash
pnpm add @astrojs/vercel
```

--------------------------------

### Install Scalekit Node SDK

Source: https://docs.astro.build/en/guides/backend/scalekit

Install the @scalekit-sdk/node package using npm, pnpm, or Yarn to enable Scalekit integration in your project.

```bash
npm install @scalekit-sdk/node
```

```bash
pnpm add @scalekit-sdk/node
```

```bash
yarn add @scalekit-sdk/node
```

--------------------------------

### Add Deployment Script to package.json

Source: https://docs.astro.build/en/guides/deploy/deno

Example scripts to automate the build and deployment process within package.json.

```json
{
  // ...
  "scripts": {
  "dev": "astro dev",
  "start": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "deno-deploy": "npm run build && cd dist && deployctl deploy jsr:@std/http/file-server"
  }
}
```

```json
{
  // ...
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "deno run --allow-net --allow-read --allow-env ./dist/server/entry.mjs",
    "deno-deploy": "npm run build && deployctl deploy ./dist/server/entry.mjs"
  }
}
```

--------------------------------

### Create a new Astro project with Bun

Source: https://docs.astro.build/en/recipes/bun

Use this command to initialize a new Astro project with Bun as the runtime.

```bash
bun create astro my-astro-project-using-bun
```

--------------------------------

### Install Preact Dependency

Source: https://docs.astro.build/en/guides/integrations-guide/preact

If you encounter 'Cannot find package preact' warnings, install Preact manually.

```bash
npm install preact
```

```bash
pnpm add preact
```

```bash
yarn add preact
```

--------------------------------

### Install @astrojs/partytown Package with pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/partytown

Manually install the @astrojs/partytown package using pnpm.

```bash
pnpm add @astrojs/partytown
```

--------------------------------

### Create Astro Server Entrypoint

Source: https://docs.astro.build/en/reference/adapter-reference

Create a server entrypoint file that conforms to host expectations, such as exporting a `handler()` function for serverless hosts. Import and use `createApp()` to work with `Request` and `Response` objects.

```javascript
import { createApp } from 'astro/app/entrypoint';


const app = createApp();


export async function handler(event, context) {
  // ...
}
```

--------------------------------

### Install @clerk/astro with pnpm

Source: https://docs.astro.build/en/guides/authentication

Use this command to install the Clerk Astro integration via pnpm.

```bash
pnpm add @clerk/astro
```

--------------------------------

### Deploy Site with Netlify CLI

Source: https://docs.astro.build/en/guides/integrations-guide/netlify

Use the Netlify CLI to deploy your Astro site after building. Ensure you have the CLI installed.

```bash
netlify deploy
```

--------------------------------

### Install Mux Uploader

Source: https://docs.astro.build/en/guides/media/mux

Commands to install the @mux/mux-uploader-astro package using various package managers.

```bash
npm install @mux/mux-uploader-astro
```

```bash
pnpm add @mux/mux-uploader-astro
```

```bash
yarn add @mux/mux-uploader-astro
```

--------------------------------

### Implement custom bump animation

Source: https://docs.astro.build/en/guides/view-transitions

Example of setting up a global keyframe animation and the ClientRouter in a root layout file.

```astro
---
import { ClientRouter } from "astro:transitions";
---
<html lang="en">
  <head>
    <ClientRouter />
  </head>
  <body>
    <slot />
  </body>
</html>


<style is:global>
  @keyframes bump {
    0% {
      opacity: 0;
      transform: scale(1) translateX(200px);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
  }
</style>
```

--------------------------------

### Install Contentful Dependencies

Source: https://docs.astro.build/en/guides/cms/contentful

Install the Contentful SDK and rich text renderer using your preferred package manager.

```bash
npm install contentful @contentful/rich-text-html-renderer
```

```bash
pnpm add contentful @contentful/rich-text-html-renderer
```

```bash
yarn add contentful @contentful/rich-text-html-renderer
```

--------------------------------

### Install Zeabur Astro Adapter

Source: https://docs.astro.build/en/guides/deploy/zeabur

Install the required adapter package via npm to enable SSR support.

```bash
npm install @zeabur/astro-adapter
```

--------------------------------

### Install Mux Node SDK

Source: https://docs.astro.build/en/guides/media/mux

Commands to install the @mux/mux-node package using various package managers.

```bash
npm install @mux/mux-node
```

```bash
pnpm add @mux/mux-node
```

```bash
yarn add @mux/mux-node
```

--------------------------------

### Install Cypress with Yarn

Source: https://docs.astro.build/en/guides/testing

Install Cypress as a development dependency in your project using Yarn.

```bash
yarn add cypress --dev
```

--------------------------------

### Install Tailwind Typography Plugin

Source: https://docs.astro.build/en/recipes/tailwind-rendered-markdown

Install the @tailwindcss/typography plugin using npm, pnpm, or yarn.

```bash
npm install -D @tailwindcss/typography
```

```bash
pnpm add -D @tailwindcss/typography
```

```bash
yarn add --dev @tailwindcss/typography
```

--------------------------------

### Install Tina CLI in Astro Project

Source: https://docs.astro.build/en/guides/cms/tina-cms

Run this command to install the Tina CLI and initialize Tina CMS in your Astro project. Press Enter for Cloud ID and choose 'Other' for framework when prompted.

```bash
npx @tinacms/cli@latest init
```

```bash
pnpm dlx @tinacms/cli@latest init
```

```bash
yarn dlx @tinacms/cli@latest init
```

--------------------------------

### Set up Heroku Git Remote and Deploy

Source: https://docs.astro.build/en/guides/deploy/heroku

Initialize a Git repository, commit your project files, create a Heroku app, set the static site buildpack, and push your code to Heroku to deploy your site.

```bash
# version change
$ git init
$ git add .
$ git commit -m "My site ready for deployment."


# creates a new app with a specified name
$ heroku apps:create example


# set buildpack for static sites
$ heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
```

```bash
# publish site
$ git push heroku master


# opens a browser to view the Dashboard version of Heroku CI
$ heroku open
```

--------------------------------

### Create New Astro + Keystatic Project

Source: https://docs.astro.build/en/guides/cms/keystatic

Use the Keystatic CLI to generate a new Astro project with Keystatic pre-configured. Choose the Astro template for a quick start.

```bash
npm create @keystatic@latest
```

```bash
pnpm create @keystatic@latest
```

```bash
yarn create @keystatic
```

--------------------------------

### Install Better Auth with pnpm

Source: https://docs.astro.build/en/guides/authentication

Use this command to install the Better Auth package using pnpm.

```bash
pnpm add better-auth
```

--------------------------------

### Install Vercel Adapter Manually with npm

Source: https://docs.astro.build/en/guides/integrations-guide/vercel

Manually install the @astrojs/vercel adapter as a project dependency using npm.

```bash
npm install @astrojs/vercel
```

--------------------------------

### Install @astrojs/partytown Package with Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/partytown

Manually install the @astrojs/partytown package using Yarn.

```bash
yarn add @astrojs/partytown
```

--------------------------------

### Install @clerk/astro with Yarn

Source: https://docs.astro.build/en/guides/authentication

Use this command to install the Clerk Astro integration via Yarn.

```bash
yarn add @clerk/astro
```

--------------------------------

### Install Node Adapter Manually with Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/node

Manually install the @astrojs/node package using Yarn as a project dependency.

```bash
yarn add @astrojs/node
```

--------------------------------

### Initialize Fleek Site

Source: https://docs.astro.build/en/guides/deploy/fleek

Generate the necessary configuration file for the Fleek project.

```bash
fleek sites init
```

--------------------------------

### `astro:route:setup` hook

Source: https://docs.astro.build/en/reference/integrations-reference

Allows setting route options during the build process, such as enabling on-demand server rendering.

```APIDOC
## `astro:route:setup` hook

### Description
This hook is called in `astro build` before bundling starts, and in `astro dev` while building the module graph and on every change to a file-based route. It allows you to set options for a route at build or request time, such as enabling on-demand server rendering.

### When
In `astro build`, before bundling starts. In `astro dev`, while building the module graph and on every change to a file based route (added/removed/updated).

### Why
To set options for a route at build or request time, such as enabling on-demand server rendering.

### Type
`'astro:route:setup'?: (options: {
  route: RouteOptions;
  logger: AstroIntegrationLogger;
}) => void | Promise<void>;`

### Parameters
#### `options.route`
- **Type:** `{ readonly component: string; prerender?: boolean; }`
- **Description:** An object with a `component` property to identify the route and additional values to configure the generated route, such as `prerender`.
  - **`route.component`** (string): The entrypoint that will be rendered on the route. This can be accessed before routes are built to configure on-demand server rendering.
  - **`route.prerender`** (boolean, optional): Used to configure on-demand server rendering for a route. Defaults to `undefined`, falling back to the `output` option's default (prerendered for `static` mode, on-demand rendered for `server` mode).

#### `options.logger`
- **Type:** `AstroIntegrationLogger`
- **Description:** A logger instance for integration messages.

### Example
```javascript
import { defineConfig } from 'astro/config';


export default defineConfig({
  integrations: [setPrerender()],
});


function setPrerender() {
  return {
    name: 'set-prerender',
    hooks: {
      'astro:route:setup': ({ route }) => {
        if (route.component.endsWith('/blog/[slug].astro')) {
          route.prerender = true;
        }
      },
    },
  };
}
```
```

--------------------------------

### Install Wrangler CLI

Source: https://docs.astro.build/en/guides/deploy/cloudflare

Install the latest version of the Wrangler CLI as a development dependency.

```bash
npm install wrangler@latest --save-dev
```

--------------------------------

### Create a New Astro Project with npm

Source: https://docs.astro.build/en/getting-started

Use this command to start a new Astro project with the latest version via npm.

```bash
npm create astro@latest
```

--------------------------------

### Install Playwright

Source: https://docs.astro.build/en/guides/testing

Commands to initialize Playwright in an Astro project using different package managers.

```bash
npm init playwright@latest
```

```bash
pnpm create playwright
```

```bash
yarn create playwright
```

--------------------------------

### Manually Install @astrojs/preact Package

Source: https://docs.astro.build/en/guides/integrations-guide/preact

Install the `@astrojs/preact` package manually using your preferred package manager.

```bash
npm install @astrojs/preact
```

```bash
pnpm add @astrojs/preact
```

```bash
yarn add @astrojs/preact
```

--------------------------------

### Initialize a Starlight project

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-docusaurus

Commands to scaffold a new Astro project using the official Starlight documentation theme template.

```bash
npm create astro@latest -- --template starlight
```

```bash
pnpm create astro@latest --template starlight
```

```bash
yarn create astro --template starlight
```

--------------------------------

### Implement Component Script Logic

Source: https://docs.astro.build/en/basics/astro-components

Example of using the component script to import components, load data, and access props.

```astro
---
import SomeAstroComponent from '../components/SomeAstroComponent.astro';
import SomeReactComponent from '../components/SomeReactComponent.jsx';
import someData from '../data/pokemon.json';


// Access passed-in component props, like `<X title="Hello, World" />`
const { title } = Astro.props;


// Fetch external data, even from a private API or database
const data = await fetch('SOME_SECRET_API_URL/users').then(r => r.json());
---
<!-- Your template here! -->
```

--------------------------------

### Initialize a new Astro project

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs

Commands to launch the Astro CLI wizard or create a project from a template using various package managers.

```bash
# launch the Astro CLI Wizard
npm create astro@latest


# create a new project with an official example
npm create astro@latest -- --template <example-name>
```

```bash
# launch the Astro CLI Wizard
pnpm create astro@latest


# create a new project with an official example
pnpm create astro@latest --template <example-name>
```

```bash
# launch the Astro CLI Wizard
yarn create astro@latest


# create a new project with an official example
yarn create astro@latest --template <example-name>
```

--------------------------------

### Install LibSQL Client with pnpm

Source: https://docs.astro.build/en/guides/backend/turso

Install the official LibSQL client package using pnpm. This package is necessary for connecting Astro to your Turso database.

```bash
pnpm add @libsql/client
```

--------------------------------

### Configure Node.js start script

Source: https://docs.astro.build/en/guides/deploy/clever-cloud

Update the package.json start script to run the Node server on port 8080.

```json
"scripts": {
  "start": "node ./dist/server/entry.mjs --host 0.0.0.0 --port 8080",
}
```

--------------------------------

### Initialize Astro Component template with pnpm

Source: https://docs.astro.build/en/guides/integrations

Use pnpm to create a new directory and initialize it with the Astro Component template for quick development.

```bash
# Initialize the Astro Component template in a new directory
pnpm create astro@latest my-new-component-directory -- --template component
```

--------------------------------

### Example of import.meta.glob Output

Source: https://docs.astro.build/en/recipes/dynamically-importing-images

This is an example of the object structure returned by `import.meta.glob` for image assets. Each key is a path, and the value is a function that imports the image.

```javascript
const images = {
  './assets/avatar-1.jpg': () => import('./assets/avatar-1.jpg'),
  './assets/avatar-2.png': () => import('./assets/avatar-2.png'),
  './assets/avatar-3.jpeg': () => import('./assets/avatar-3.jpeg')
}
```

--------------------------------

### Start Astro Development Server with Yarn

Source: https://docs.astro.build/en/develop-and-build

Use this command to start the Astro development server with Yarn. It allows you to see live updates as you edit your code.

```bash
yarn run dev
```

--------------------------------

### Middleware Execution Order Output

Source: https://docs.astro.build/en/guides/middleware

Example console output demonstrating the order of operations when chaining middleware.

```text

validation request
auth request
greeting request
greeting response
auth response
validation response

```

--------------------------------

### Create Preview Server Entrypoint

Source: https://docs.astro.build/en/reference/adapter-reference

Implement a preview entrypoint for hybrid or server output adapters. This function takes server parameters and returns a `PreviewServer` instance. Ensure the `previewEntrypoint` is correctly configured in your adapter.

```typescript
import type { CreatePreviewServer } from 'astro';
import { createServer } from './utils/server';


const createPreviewServer: CreatePreviewServer = async (config) => {
  const host = config.host ?? '0.0.0.0';
  const port = config.port ?? 4321;
  const server = createServer(host, port);


  return server;
};


export default createPreviewServer;
```

--------------------------------

### Create Astro Blog Project with pnpm

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-eleventy

Use this command to start a new Astro project with the official blog theme using pnpm.

```bash
pnpm create astro@latest --template blog
```

--------------------------------

### Create New Astro Project with npm

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby

Use this command to launch the Astro CLI wizard or create a new project with an official starter template using npm.

```bash
# launch the Astro CLI Wizard
npm create astro@latest


# create a new project with an official example
npm create astro@latest -- --template <example-name>
```

--------------------------------

### Install an npm package integration

Source: https://docs.astro.build/en/guides/integrations

Install the package via your package manager before adding it to the configuration file.

```bash
npm install @astrojs/sitemap
```

```bash
pnpm add @astrojs/sitemap
```

```bash
yarn add @astrojs/sitemap
```

--------------------------------

### Configure Start Script for Astro SSR

Source: https://docs.astro.build/en/guides/deploy/sevalla

Ensure your `package.json` includes a 'start' script to run the built server for SSR applications. This script is used by Sevalla to launch your application.

```json
"scripts": {
  "start": "node ./dist/server/entry.mjs"
}

```

--------------------------------

### Install Prettier and Astro Plugin (npm)

Source: https://docs.astro.build/en/editor-setup

Use this command to install Prettier and the Astro Prettier plugin as development dependencies using npm.

```bash
npm install --save-dev --save-exact prettier prettier-plugin-astro
```

--------------------------------

### Install Vercel Adapter Manually with Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/vercel

Manually install the @astrojs/vercel adapter as a project dependency using Yarn.

```bash
yarn add @astrojs/vercel
```

--------------------------------

### Install LibSQL Client with Yarn

Source: https://docs.astro.build/en/guides/backend/turso

Install the official LibSQL client package using Yarn. This package is necessary for connecting Astro to your Turso database.

```bash
yarn add @libsql/client
```

--------------------------------

### Manual Alpine.js Dependency Installation

Source: https://docs.astro.build/en/guides/integrations-guide/alpinejs

Install Alpine.js and its types if they are not automatically resolved by your package manager.

```bash
npm install alpinejs @types/alpinejs
```

```bash
pnpm add alpinejs @types/alpinejs
```

```bash
yarn add alpinejs @types/alpinejs
```

--------------------------------

### Manual Install @astrojs/svelte (npm)

Source: https://docs.astro.build/en/guides/integrations-guide/svelte

Manually install the @astrojs/svelte package using npm if the 'astro add' command encounters issues.

```bash
npm install @astrojs/svelte
```

--------------------------------

### Install rehype-external-links plugin

Source: https://docs.astro.build/en/recipes/external-links

Install the required rehype plugin using your preferred package manager.

```shell
npm install rehype-external-links
```

```shell
pnpm add rehype-external-links
```

```shell
yarn add rehype-external-links
```

--------------------------------

### Install @astrojs/solid-js Package (npm)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Manually install the @astrojs/solid-js package using npm. This is an alternative to using the Astro CLI.

```bash
npm install @astrojs/solid-js
```

--------------------------------

### Configure a Build Adapter

Source: https://docs.astro.build/en/reference/configuration-reference

Integrate Astro with deployment platforms like Netlify by specifying a build adapter. This example shows how to configure the Netlify adapter.

```javascript
import netlify from '@astrojs/netlify';
{
  // Example: Build for Netlify serverless deployment
  adapter: netlify()
}
```

--------------------------------

### Create Astro Blog Project with Yarn

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-eleventy

Use this command to start a new Astro project with the official blog theme using Yarn.

```bash
yarn create astro --template blog
```

--------------------------------

### Install ioredis for Redis Session Storage

Source: https://docs.astro.build/en/guides/integrations-guide/vercel

Install the `ioredis` package using npm, pnpm, or Yarn to enable Redis as a session storage driver.

```bash
npm install ioredis
```

```bash
pnpm install ioredis
```

```bash
yarn add ioredis
```

--------------------------------

### Manual Install @astrojs/svelte (Yarn)

Source: https://docs.astro.build/en/guides/integrations-guide/svelte

Manually install the @astrojs/svelte package using Yarn if the 'astro add' command encounters issues.

```bash
yarn add @astrojs/svelte
```

--------------------------------

### CreatePreviewServer

Source: https://docs.astro.build/en/reference/adapter-reference

Describes the function an adapter should export to start a preview server when `astro preview` is run. It takes preview server parameters and returns a PreviewServer instance or a Promise resolving to one.

```APIDOC
## CreatePreviewServer

### Description
Describes the function an adapter should export to start a preview server when `astro preview` is run.

### Type
`(params: PreviewServerParams) => PreviewServer | Promise<PreviewServer>`
```

--------------------------------

### Manual Install @astrojs/svelte (pnpm)

Source: https://docs.astro.build/en/guides/integrations-guide/svelte

Manually install the @astrojs/svelte package using pnpm if the 'astro add' command encounters issues.

```bash
pnpm add @astrojs/svelte
```

--------------------------------

### Install Cloudflare Adapter with npm

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Use the `astro add` command to automatically install and configure the Cloudflare adapter for your Astro project.

```bash
npx astro add cloudflare
```

--------------------------------

### Import all posts with import.meta.glob()

Source: https://docs.astro.build/en/tutorial/5-astro-api/1

Use `import.meta.glob()` to get an array of all Markdown files in the posts directory. Set `eager: true` to import all modules immediately.

```astro
--- 
import BaseLayout from '../layouts/BaseLayout.astro'
const allPosts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));
const pageTitle = "My Astro Learning Blog";
---
```

--------------------------------

### Migrate Server Entrypoint Exports

Source: https://docs.astro.build/en/guides/upgrade-to/v6

Transition from createExports to direct export patterns using createApp.

```javascript

import { App } from 'astro/app';


export function createExports(manifest) {
  const app = new App(manifest);


  const handler = (event, context) => {
    // ...
  };


  return { handler };
}
import { createApp } from 'astro/app/entrypoint';


const app = createApp();


export const handler = (event, context) => {
  // ...
}

```

--------------------------------

### Install Solid DevTools (pnpm)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Install the Solid DevTools package using pnpm. This is required to enable the `devtools: true` option in the SolidJS integration.

```bash
pnpm add solid-devtools
```

--------------------------------

### Install Juno CLI with npm

Source: https://docs.astro.build/en/guides/deploy/juno

Installs the Juno command-line interface globally using npm, enabling you to manage Juno deployments from your terminal.

```bash
npm i -g @junobuild/cli
```

--------------------------------

### Configure Route Prerendering with `astro:route:setup`

Source: https://docs.astro.build/en/reference/integrations-reference

The `astro:route:setup` hook allows modification of route options before bundling. Set `route.prerender` to `true` to enable on-demand server rendering for specific routes, like blog posts.

```javascript
import { defineConfig } from 'astro/config';


export default defineConfig({
  integrations: [setPrerender()],
});


function setPrerender() {
  return {
    name: 'set-prerender',
    hooks: {
      'astro:route:setup': ({ route }) => {
        if (route.component.endsWith('/blog/[slug].astro')) {
          route.prerender = true;
        }
      },
    },
  };
}
```

--------------------------------

### Install Astro DB integration

Source: https://docs.astro.build/en/guides/astro-db

Use the Astro CLI to add the database integration to your project.

```bash
npx astro add db
```

```bash
pnpm astro add db
```

```bash
yarn astro add db
```

--------------------------------

### Install Unstorage for Session Driver Configuration

Source: https://docs.astro.build/en/guides/sessions

Install the `unstorage` package to enable custom session driver configurations, such as connecting to external services like Redis.

```bash
npm install unstorage
```

```bash
pnpm add unstorage
```

```bash
yarn add unstorage
```

--------------------------------

### Install @astrojs/solid-js Package (pnpm)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Manually install the @astrojs/solid-js package using pnpm. This is an alternative to using the Astro CLI.

```bash
pnpm add @astrojs/solid-js
```

--------------------------------

### Install Keystatic Packages

Source: https://docs.astro.build/en/guides/cms/keystatic

Install the core Keystatic package and the Astro integration package. These are necessary for using Keystatic within your Astro project.

```bash
npm install @keystatic/core @keystatic/astro
```

```bash
pnpm add @keystatic/core @keystatic/astro
```

```bash
yarn add @keystatic/core @keystatic/astro
```

--------------------------------

### Build an Astro site with Bun

Source: https://docs.astro.build/en/recipes/bun

Generate a production-ready build of your Astro site using Bun. After building, you can use `bun run preview` to view the built site locally.

```bash
bun run build
```

--------------------------------

### Install a specific version of Astro and React integration with npm

Source: https://docs.astro.build/en/upgrade-astro

Install specific versions of Astro and the React integration using npm.

```bash
npm install astro@4.5.3 @astrojs/react@3.0.10
```

--------------------------------

### Install Vercel CLI and Deploy

Source: https://docs.astro.build/en/guides/deploy/vercel

Install the Vercel CLI globally and then run the 'vercel' command to deploy your Astro project. Vercel will automatically detect Astro and configure the necessary settings.

```bash
npm install -g vercel
vercel
```

```bash
pnpm add -g vercel
vercel
```

```bash
yarn global add vercel
vercel
```

--------------------------------

### Install Zephyr Integration Manually

Source: https://docs.astro.build/en/guides/deploy/zephyr

Install the integration package manually via package manager.

```shell
npm install zephyr-astro-integration
```

```shell
pnpm add zephyr-astro-integration
```

```shell
yarn add zephyr-astro-integration
```

--------------------------------

### Initialize StaticPaths from an app

Source: https://docs.astro.build/en/reference/modules/astro-static-paths

Create a new StaticPaths instance using an app instance within an adapter server entrypoint.

```javascript
import { createApp } from 'astro/app/entrypoint';
import { StaticPaths } from 'astro:static-paths';


const app = createApp();
const staticPaths = new StaticPaths(app);


export const handler = (event, context) => {
  // do something with `staticPaths`
};
```

--------------------------------

### Install Zephyr Integration Automatically

Source: https://docs.astro.build/en/guides/deploy/zephyr

Use the CLI to install the Zephyr integration and update the Astro configuration automatically.

```shell
npx with-zephyr@latest
```

```shell
pnpm dlx with-zephyr@latest
```

```shell
yarn dlx with-zephyr@latest
```

--------------------------------

### Install Solid DevTools (npm)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Install the Solid DevTools package using npm. This is required to enable the `devtools: true` option in the SolidJS integration.

```bash
npm install solid-devtools
```

--------------------------------

### Install Prettier and Astro Plugin (pnpm)

Source: https://docs.astro.build/en/editor-setup

Use this command to install Prettier and the Astro Prettier plugin as development dependencies using pnpm.

```bash
pnpm add --save-dev --save-exact prettier prettier-plugin-astro
```

--------------------------------

### Deploy via CLI

Source: https://docs.astro.build/en/guides/deploy/deno

Commands to deploy the built Astro site to Deno Deploy.

```bash
cd dist && deployctl deploy jsr:@std/http/file-server
```

```bash
deployctl deploy ./dist/server/entry.mjs
```

--------------------------------

### Installing the Astro Prism Package

Source: https://docs.astro.build/en/guides/syntax-highlighting

Install the `@astrojs/prism` package using npm, pnpm, or Yarn to enable Prism.js syntax highlighting in your Astro project.

```bash
npm install @astrojs/prism
```

```bash
pnpm add @astrojs/prism
```

```bash
yarn add @astrojs/prism
```

--------------------------------

### Azion Build Process Output

Source: https://docs.astro.build/en/guides/deploy/azion

This output indicates the build process is starting and may take some time. It shows the build step command being executed.

```bash
Building your Edge Application. This process may take a few minutes
Running build step command:
...
```

--------------------------------

### Install a specific version of Astro and React integration with pnpm

Source: https://docs.astro.build/en/upgrade-astro

Install specific versions of Astro and the React integration using pnpm.

```bash
pnpm add astro@4.5.3 @astrojs/react@3.0.10
```

--------------------------------

### Install @astrojs/solid-js Package (Yarn)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Manually install the @astrojs/solid-js package using Yarn. This is an alternative to using the Astro CLI.

```bash
yarn add @astrojs/solid-js
```

--------------------------------

### Install Tailwind 3 and @astrojs/tailwind (pnpm)

Source: https://docs.astro.build/en/guides/styling

Install Tailwind v3 and the official Astro Tailwind integration for legacy support.

```bash
pnpm add tailwindcss@3 @astrojs/tailwind
```

--------------------------------

### Install Vite for pnpm

Source: https://docs.astro.build/en/guides/environment-variables

Install Vite as a development dependency when using pnpm to enable the loadEnv helper.

```bash
pnpm add -D vite
```

--------------------------------

### Implement getSecret() in Server Entrypoint

Source: https://docs.astro.build/en/reference/adapter-reference

Provide an implementation for `getSecret()` by calling `setGetEnv()` as early as possible in your server entrypoint. This example uses `process.env` to retrieve environment variables.

```javascript
import { createApp } from 'astro/app/entrypoint';
import { setGetEnv } from "astro/env/setup"


setGetEnv((key) => process.env[key])


const app = createApp();


export async function handler(event, context) {
  // ...
}
```

--------------------------------

### astro:config:setup Hook

Source: https://docs.astro.build/en/reference/integrations-reference

The `astro:config:setup` hook is called on initialization, before Vite or Astro configurations are resolved. It allows integrations to extend the project configuration by updating Astro config, applying Vite plugins, adding component renderers, and injecting scripts.

```APIDOC
## `astro:config:setup`

### Description
This hook is executed during the initialization phase of an Astro project, prior to the resolution of Vite or Astro configurations. It provides a powerful mechanism for integrations to modify and extend the project's build settings.

### When
On initialization, before either the Vite or Astro config have resolved.

### Why
To extend the project config. This includes updating the Astro config, applying Vite plugins, adding component renderers, and injecting scripts onto the page.

### Signature
```typescript
'astro:config:setup'?: (options: {
  config: AstroConfig;
  command: 'dev' | 'build' | 'preview' | 'sync';
  isRestart: boolean;
  updateConfig: (newConfig: DeepPartial<AstroConfig>) => AstroConfig;
  addRenderer: (renderer: AstroRenderer) => void;
  addClientDirective: (directive: ClientDirectiveConfig) => void;
  addMiddleware: (middleware: AstroIntegrationMiddleware) => void;
  addDevToolbarApp: (entrypoint: DevToolbarAppEntry) => void;
  addWatchFile: (path: URL | string) => void;
  injectScript: (stage: InjectedScriptStage, content: string) => void;
  injectRoute: (injectedRoute: InjectedRoute) => void;
  createCodegenDir: () => URL;
  logger: AstroIntegrationLogger;
}) => void | Promise<void>;
```

### Options

#### `config`
- **Type:** `AstroConfig`
- **Description:** A read-only copy of the user-supplied Astro config. This is resolved before any other integrations have run. For a config after all integrations have completed, see the `astro:config:done` hook.

#### `command`
- **Type:** `'dev' | 'build' | 'preview' | 'sync'`
- **Description:** Indicates the command being executed.
  - `dev`: Project is executed with `astro dev`
  - `build`: Project is executed with `astro build`
  - `preview`: Project is executed with `astro preview`
  - `sync`: Project is executed with `astro sync`

#### `isRestart`
- **Type:** `boolean`
- **Added in:** `astro@1.5.0`
- **Description:** `false` when the dev server starts, `true` when a reload is triggered. Useful for detecting multiple calls.

#### `updateConfig()`
- **Type:** `(newConfig: DeepPartial<AstroConfig>) => AstroConfig;`
- **Description:** A callback function to update the user-supplied Astro config. Provided config is merged with user and other integration configs. Omit keys to keep existing values.

**Example:**
```javascript
import bananaCSS from '@vitejs/official-banana-css-plugin';

export default {
  name: 'banana-css-integration',
  hooks: {
    'astro:config:setup': ({ updateConfig }) => {
      updateConfig({
        vite: {
          plugins: [bananaCSS()],
        }
      })
    }
  }
}
```

#### `addRenderer()`
- **Type:** `(renderer: AstroRenderer) => void;`
- **Description:** Adds a component framework renderer (e.g., React, Vue, Svelte).
- **Examples:** `svelte`, `react`, `preact`, `vue`, `solid`

#### `addWatchFile()`
- **Type:** `(path: URL | string) => void`
- **Added in:** `astro@1.5.0`
- **Description:** Adds a file to be watched by Vite. If the file changes, the Astro dev server will reload. Useful for configuration files not automatically watched by Vite.

**Example Usage:**
```javascript
// Must be an absolute path!
addWatchFile('/home/user/.../my-config.json');
addWatchFile(new URL('./ec.config.mjs', config.root));
```

#### `addClientDirective()`
- **Type:** `(directive: ClientDirectiveConfig) => void;`
- **Added in:** `astro@2.6.0`
- **Description:** Adds a custom client directive for use in `.astro` files. Directive entrypoints are bundled via esbuild and should be kept small.

**Example Usage:**
```javascript
import { defineConfig } from 'astro/config';
import clickDirective from './astro-click-directive/register.js';

export default defineConfig({
  integrations: [
    clickDirective()
  ],
});
```

```javascript
/**
 * @type {() => import('astro').AstroIntegration}
 */
export default () => ({
  name: "client:click",
  hooks: {
    "astro:config:setup": ({ addClientDirective }) => {
      addClientDirective({
        name: "click",
        entrypoint: "./astro-click-directive/click.js",
      });
    },
  },
});
```

```javascript
/**
 * Hydrate on first click on the window
 * @type {import('astro').ClientDirective}
 */
export default (load, opts, el) => {
  window.addEventListener('click', async () => {
    const hydrate = await load();
    await hydrate();
  }, { once: true });
}
```

**Type Definitions:**
```typescript
import 'astro'
declare module 'astro' {
  interface AstroClientDirectives {
    'client:click'?: boolean
  }
}
```
```

--------------------------------

### Install Solid DevTools (Yarn)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Install the Solid DevTools package using Yarn. This is required to enable the `devtools: true` option in the SolidJS integration.

```bash
yarn add solid-devtools
```

--------------------------------

### Install @astrojs/compiler-rs with npm

Source: https://docs.astro.build/en/reference/experimental-flags/rust-compiler

Install the Rust compiler package using npm. This is a required step after enabling the flag in your configuration.

```bash
npm install @astrojs/compiler-rs

```

--------------------------------

### Configure Image Service with Build and Runtime Options

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Configure the image service for the Cloudflare adapter, specifying separate build-time and runtime options. This example uses 'compile' for build and 'cloudflare-binding' for runtime.

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';


export default defineConfig({
  adapter: cloudflare({
    imageService: { build: 'compile', runtime: 'cloudflare-binding' }
  }),
});
```

--------------------------------

### Initialize BaseLayout in Tag Index

Source: https://docs.astro.build/en/tutorial/5-astro-api/3

Basic setup for the tag index page using the BaseLayout component.

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout></BaseLayout>
```

--------------------------------

### Install Tailwind 3 and @astrojs/tailwind (Yarn)

Source: https://docs.astro.build/en/guides/styling

Install Tailwind v3 and the official Astro Tailwind integration for legacy support.

```bash
yarn add tailwindcss@3 @astrojs/tailwind
```

--------------------------------

### Manually Install @astrojs/react Package

Source: https://docs.astro.build/en/guides/integrations-guide/react

Install the @astrojs/react package manually using your preferred package manager. This is an alternative to the `astro add` command.

```bash
npm install @astrojs/react
```

```bash
pnpm add @astrojs/react
```

```bash
yarn add @astrojs/react
```

--------------------------------

### Update astro:build:setup integration hook

Source: https://docs.astro.build/en/guides/upgrade-to/v6

Transition from using the target parameter to configuring specific environments via vite.environments.

```javascript
{
  hooks: {
    'astro:build:setup': ({ target, vite }) => {
      if (target === 'client') {
        vite.build.minify = false;
      }
    }
    'astro:build:setup': ({ vite }) => {
      vite.environments.client.build.minify = false;
    }
  }
}
```

--------------------------------

### Install a specific version of Astro and React integration with yarn

Source: https://docs.astro.build/en/upgrade-astro

Install specific versions of Astro and the React integration using Yarn.

```bash
yarn add astro@4.5.3 @astrojs/react@3.0.10
```

--------------------------------

### Combine integrations into a preset

Source: https://docs.astro.build/en/reference/integrations-reference

A preset is a collection of multiple integrations returned as an array. This example shows how a preset `examplePreset()` would be configured in `astro.config.*`.

```javascript
integrations: [
  // Example: where examplePreset() returns: [integrationOne, integrationTwo, ...etc]
  examplePreset()
]
```

--------------------------------

### Install Sharp for pnpm users

Source: https://docs.astro.build/en/guides/upgrade-to/v3

When using a strict package manager like `pnpm`, manually install Sharp as it is an Astro dependency.

```bash
pnpm add sharp
```

--------------------------------

### Install Cloudflare Adapter with pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Use the `astro add` command with pnpm to automatically install and configure the Cloudflare adapter for your Astro project.

```bash
pnpm astro add cloudflare
```

--------------------------------

### Build Astro Site with npm

Source: https://docs.astro.build/en/develop-and-build

Run this command to build a production-ready version of your Astro site. It creates a deployable output in the 'dist/' folder and checks for build errors.

```bash
npm run build
```

--------------------------------

### Astro Configuration File

Source: https://docs.astro.build/en/install-and-setup

The main Astro configuration file. This example shows the basic structure for defining configuration options.

```javascript
import { defineConfig } from "astro/config";


// https://astro.build/config
export default defineConfig({});
```

--------------------------------

### Install Neon Serverless Driver

Source: https://docs.astro.build/en/guides/backend/neon

Install the official Neon serverless driver package using npm. This package is required to establish a connection to your Neon database.

```bash
npm install @neondatabase/serverless
```

--------------------------------

### Install @astrojs/compiler-rs with Yarn

Source: https://docs.astro.build/en/reference/experimental-flags/rust-compiler

Install the Rust compiler package using Yarn. This is a required step after enabling the flag in your configuration.

```bash
yarn add @astrojs/compiler-rs

```

--------------------------------

### Configure PostCSS with Plugins

Source: https://docs.astro.build/en/guides/styling

Create a `postcss.config.cjs` file in your project root to configure PostCSS. Import plugins using `require()` after installing them.

```javascript
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano'),
  ],
};
```

--------------------------------

### Install Prettier and Astro Plugin (Yarn)

Source: https://docs.astro.build/en/editor-setup

Use this command to install Prettier and the Astro Prettier plugin as development dependencies using Yarn.

```bash
yarn add --dev --exact prettier prettier-plugin-astro
```

--------------------------------

### Install JSON:API Dependencies with pnpm

Source: https://docs.astro.build/en/guides/cms/drupal

Install the 'jsona' and 'drupal-jsonapi-params' packages using pnpm for your Astro project.

```bash
pnpm add jsona drupal-jsonapi-params
```

--------------------------------

### Install @astrojs/compiler-rs with pnpm

Source: https://docs.astro.build/en/reference/experimental-flags/rust-compiler

Install the Rust compiler package using pnpm. This is a required step after enabling the flag in your configuration.

```bash
pnpm add @astrojs/compiler-rs

```

--------------------------------

### Implement static site generation for blog posts

Source: https://docs.astro.build/en/guides/cms/kontent-ai

Use getStaticPaths to define dynamic routes and provide props for individual blog post pages.

```astro
---
import { deliveryClient } from '../../lib/kontent';
import type { BlogPost } from '../../models';
import { contentTypes } from '../../models/project/contentTypes';


export async function getStaticPaths() {
    const blogPosts = await deliveryClient
        .items<BlogPost>()
        .type(contentTypes.blog_post.codename)
        .toPromise()
---
```

```astro
---
import { deliveryClient } from '../../lib/kontent';
import type { BlogPost } from '../../models';
import { contentTypes } from '../../models/project/contentTypes';


export async function getStaticPaths() {
    const blogPosts = await deliveryClient
        .items<BlogPost>()
        .type(contentTypes.blog_post.codename)
        .toPromise()


    return blogPosts.data.items.map(blogPost => ({
        params: { slug: blogPost.elements.url_slug.value },
        props: { blogPost }
    }))
}
---
```

```astro
---
import { deliveryClient } from '../../lib/kontent';
import type { BlogPost } from '../../models';
import { contentTypes } from '../../models/project/contentTypes';


export async function getStaticPaths() {
    const blogPosts = await deliveryClient
        .items<BlogPost>()
        .type(contentTypes.blog_post.codename)
        .toPromise()


    return blogPosts.data.items.map(blogPost => ({
        params: { slug: blogPost.elements.url_slug.value },
        props: { blogPost }
    }))
}


const blogPost: BlogPost = Astro.props.blogPost
---
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{blogPost.elements.title.value}</title>
    </head>
    <body>
        <article>
            <h1>{blogPost.elements.title.value}</h1>
            <Fragment set:html={blogPost.elements.teaser.value} />
            <Fragment set:html={blogPost.elements.content.value} />
            <time>{new Date(blogPost.elements.date.value ?? "")}</time>
    </body>
</html>
```

--------------------------------

### Install Astro DB Integration Manually with npm

Source: https://docs.astro.build/en/guides/integrations-guide/db

Install the @astrojs/db package manually using npm if you prefer not to use the `astro add` command.

```bash
npm install @astrojs/db
```

--------------------------------

### Create New Astro Project with pnpm

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-create-react-app

Use the 'create astro' command with pnpm to initialize a new, empty Astro project. This command starts the Astro CLI wizard.

```bash
pnpm create astro@latest
```

--------------------------------

### Automated Installation

Source: https://docs.astro.build/en/guides/integrations-guide/alpinejs

Use the Astro CLI to automatically add the Alpine.js integration to your project.

```bash
npx astro add alpinejs
```

```bash
pnpm astro add alpinejs
```

```bash
yarn astro add alpinejs
```

--------------------------------

### Install model generator dependencies

Source: https://docs.astro.build/en/guides/cms/kontent-ai

Install the necessary packages to generate TypeScript models from your Kontent.ai content model.

```bash
npm install @kontent-ai/model-generator ts-node dotenv
```

```bash
pnpm add @kontent-ai/model-generator ts-node dotenv
```

```bash
yarn add @kontent-ai/model-generator ts-node dotenv
```

--------------------------------

### Install Tailwind 3 and @astrojs/tailwind (npm)

Source: https://docs.astro.build/en/guides/styling

Install Tailwind v3 and the official Astro Tailwind integration for legacy support.

```bash
npm install tailwindcss@3 @astrojs/tailwind
```

--------------------------------

### Install Fleek CLI

Source: https://docs.astro.build/en/guides/deploy/fleek

Install the Fleek CLI globally using npm. Requires Node.js version 18.18.2 or higher.

```bash
npm install -g @fleek-platform/cli
```

--------------------------------

### Install JSON:API Dependencies with Yarn

Source: https://docs.astro.build/en/guides/cms/drupal

Install the 'jsona' and 'drupal-jsonapi-params' packages using Yarn for your Astro project.

```bash
yarn add jsona drupal-jsonapi-params
```

--------------------------------

### Install Decap CMS with Yarn

Source: https://docs.astro.build/en/guides/cms/decap-cms

Use this command to install the Decap CMS application package using Yarn.

```bash
yarn add decap-cms-app
```

--------------------------------

### Install dependencies for custom slug plugin

Source: https://docs.astro.build/en/guides/upgrade-to/v6

Install the necessary packages to implement a custom rehype plugin for heading ID generation.

```bash
npm i github-slugger hast-util-heading-rank unist-util-visit hast-util-to-string
```

```bash
pnpm add github-slugger hast-util-heading-rank unist-util-visit hast-util-to-string
```

```bash
yarn add github-slugger hast-util-heading-rank unist-util-visit hast-util-to-string
```

--------------------------------

### Install Decap CMS with npm

Source: https://docs.astro.build/en/guides/cms/decap-cms

Use this command to install the Decap CMS application package using npm.

```bash
npm install decap-cms-app
```

--------------------------------

### Create New Astro Project with pnpm

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby

Use this command to launch the Astro CLI wizard or create a new project with an official starter template using pnpm.

```bash
# launch the Astro CLI Wizard
pnpm create astro@latest


# create a new project with an official example
pnpm create astro@latest --template <example-name>
```

--------------------------------

### Install Astro TypeScript plugin

Source: https://docs.astro.build/en/guides/typescript

Commands to install the Astro TypeScript plugin for editor support when not using the VS Code extension.

```bash
npm install @astrojs/ts-plugin
```

```bash
pnpm add @astrojs/ts-plugin
```

```bash
yarn add @astrojs/ts-plugin
```

--------------------------------

### Install Cosmic JS SDK with npm

Source: https://docs.astro.build/en/guides/cms/cosmic

Add the Cosmic JavaScript SDK to your project using npm. This is the first step to enable data fetching from your Cosmic Bucket.

```bash
npm install @cosmicjs/sdk
```

--------------------------------

### Local Development Server Running

Source: https://docs.astro.build/en/guides/deploy/azion

This message confirms that the local development server has successfully started and is running on the specified port.

```bash
[Azion Bundler] [Server] › ✔  success   Function running on port http://localhost:3000
```

--------------------------------

### Install Cloudflare Adapter with Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Use the `astro add` command with Yarn to automatically install and configure the Cloudflare adapter for your Astro project.

```bash
yarn astro add cloudflare
```

--------------------------------

### astro:build:start Hook

Source: https://docs.astro.build/en/reference/integrations-reference

Runs after `astro:config:done` and before the production build starts. Used for setting up global objects, clients, or extending build configuration.

```APIDOC
## astro:build:start

### Description
Runs after the `astro:config:done` event, but before the production build begins. This hook is suitable for setting up any global objects or clients needed during a production build, and can also be used to extend the build configuration options in the adapter API.

### When
After the `astro:config:done` event, but before the production build begins.

### Why
To set up any global objects or clients needed during a production build. This can also extend the build configuration options in the adapter API.

### Signature
`'astro:build:start'?: (options: { logger: AstroIntegrationLogger; setPrerenderer: (prerenderer: AstroPrerenderer | ((defaultPrerenderer: AstroPrerenderer) => AstroPrerenderer)) => void; }) => void | Promise<void>;`

#### Options
- **logger** (AstroIntegrationLogger) - The logger instance for the integration.
- **setPrerenderer** (function) - A function to set or modify the prerenderer. It accepts the default prerenderer and can return a new one or a function that modifies the default.
```

--------------------------------

### Initialize Astro Component template with Yarn

Source: https://docs.astro.build/en/guides/integrations

Use Yarn to create a new directory and initialize it with the Astro Component template for quick development.

```bash
# Initialize the Astro Component template in a new directory
yarn create astro my-new-component-directory --template component
```

--------------------------------

### Frontmatter Example (to be removed)

Source: https://docs.astro.build/en/tutorial/6-islands/4

This is an example of frontmatter that should be removed when using collection layouts. The 'layout' property is no longer needed.

```astro
---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'My First Blog Post'
pubDate: 2022-07-01
...
---

```

--------------------------------

### Initialize Turso Client in Astro

Source: https://docs.astro.build/en/guides/backend/turso

Create a 'turso.ts' file to initialize the LibSQL client with your database URL and auth token from environment variables.

```typescript
import { createClient } from "@libsql/client/web";


export const turso = createClient({
  url: import.meta.env.TURSO_DATABASE_URL,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
});
```

--------------------------------

### Install AWS Amplify Adapter with npm

Source: https://docs.astro.build/en/guides/deploy/aws

Install the community-maintained AWS Amplify adapter for Astro using npm. This is required for server-rendered deployments.

```bash
npm install astro-aws-amplify
```

--------------------------------

### Install SolidJS Dependency (pnpm)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Install the SolidJS library as a dependency using pnpm. This is required if you encounter 'Cannot find package solid-js' warnings.

```bash
pnpm add solid-js
```

--------------------------------

### Initialize Tailwind CSS Configuration (npx)

Source: https://docs.astro.build/en/guides/styling

Generate a basic `tailwind.config.mjs` file using npx for Tailwind 3.

```bash
npx tailwindcss init
```

--------------------------------

### Install Rollup YAML Plugin with Yarn

Source: https://docs.astro.build/en/recipes/add-yaml-support

Use this command to install the `@rollup/plugin-yaml` package as a development dependency using Yarn.

```bash
yarn add @rollup/plugin-yaml --dev
```

--------------------------------

### Launch Astro project on Fly.io

Source: https://docs.astro.build/en/guides/deploy/flyio

Initializes the deployment process by automatically detecting the Astro project and configuring necessary settings.

```bash
fly launch
```

--------------------------------

### Install Mux Player for Astro (pnpm)

Source: https://docs.astro.build/en/guides/media/mux

Install the Astro version of Mux Player using pnpm. This command adds the necessary package to your project.

```bash
pnpm add @mux/mux-player-astro
```

--------------------------------

### Install Astro DB Integration Manually with pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/db

Install the @astrojs/db package manually using pnpm if you prefer not to use the `astro add` command.

```bash
pnpm add @astrojs/db
```

--------------------------------

### .dockerignore file example

Source: https://docs.astro.build/en/recipes/docker

Specify files and folders to be ignored during Docker build to speed up the process and reduce image size.

```dockerignore
.DS_Store
node_modules
dist
```

--------------------------------

### astro:server:setup Hook

Source: https://docs.astro.build/en/reference/integrations-reference

A hook that runs during the Astro development server setup. It provides access to the server instance and the `refreshContent` function.

```APIDOC
## astro:server:setup

### Description
This hook is executed during the Astro development server setup phase. It provides access to the server instance and utility functions like `refreshContent`.

### Signature
`'astro:server:setup'?: (options: { server: AstroDevServer; refreshContent: typeof refreshContent }) => void | Promise<void>;`
```

--------------------------------

### Importing client-side router utilities

Source: https://docs.astro.build/en/reference/modules/astro-transitions

Import navigation and state management utilities from the astro:transitions/client package.

```javascript
import {
  getFallback,
  navigate,
  supportsViewTransitions,
  swapFunctions,
  transitionEnabledOnThisPage,
  /* The following were deprecated in v6: */
  isTransitionBeforePreparationEvent,
  isTransitionBeforeSwapEvent,
  TRANSITION_AFTER_PREPARATION,
  TRANSITION_AFTER_SWAP,
  TRANSITION_BEFORE_PREPARATION,
  TRANSITION_BEFORE_SWAP,
  TRANSITION_PAGE_LOAD,
} from 'astro:transitions/client';
```

--------------------------------

### Install Rollup YAML Plugin with npm

Source: https://docs.astro.build/en/recipes/add-yaml-support

Use this command to install the `@rollup/plugin-yaml` package as a development dependency using npm.

```bash
npm install @rollup/plugin-yaml --save-dev
```

--------------------------------

### Install SolidJS Dependency (npm)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Install the SolidJS library as a dependency using npm. This is required if you encounter 'Cannot find package solid-js' warnings.

```bash
npm install solid-js
```

--------------------------------

### Install Rollup YAML Plugin with pnpm

Source: https://docs.astro.build/en/recipes/add-yaml-support

Use this command to install the `@rollup/plugin-yaml` package as a development dependency using pnpm.

```bash
pnpm add @rollup/plugin-yaml --save-dev
```

--------------------------------

### Add Node Adapter using npm

Source: https://docs.astro.build/en/guides/integrations-guide/node

Use the `astro add` command with npm to automatically install the Node adapter and configure your project.

```bash
npx astro add node
```

--------------------------------

### Add Netlify Adapter using npm

Source: https://docs.astro.build/en/guides/integrations-guide/netlify

Use the `astro add` command with npm to automatically install the Netlify adapter and configure your Astro project.

```bash
npx astro add netlify
```

--------------------------------

### Iterate and Check Pages in Astro Build Setup

Source: https://docs.astro.build/en/reference/integrations-reference

Access the `pages` map within the `astro:build:setup` hook to iterate through all pages and perform actions based on route criteria.

```javascript
export default {
  name: 'my-integration',
  hooks: {
    'astro:build:setup': ({ pages }) => {
      pages.forEach((data) => {
        if (data.route.pattern.test("/blog")) {
          console.log(data.route.type);
        }
      });
    },
  }
}
```

--------------------------------

### Install Mux Player for Astro (Yarn)

Source: https://docs.astro.build/en/guides/media/mux

Install the Astro version of Mux Player using Yarn. This command adds the necessary package to your project.

```bash
yarn add @mux/mux-player-astro
```

--------------------------------

### GET Request for Image Response

Source: https://docs.astro.build/en/guides/endpoints

Handles GET requests to return an image with specified content type.

```APIDOC
## GET /image

### Description
Handles GET requests to return an image with specified content type.

### Method
GET

### Endpoint
/image

### Parameters
None

### Request Body
None

### Response
#### Success Response (200)
- **image data** (binary) - The image file content.

### Request Example
None

### Response Example
(Binary image data, e.g., PNG)
```
(Binary data for a PNG image)
```
```

--------------------------------

### Turso CLI: Create Database

Source: https://docs.astro.build/en/guides/astro-db

Command to create a new database on Turso.

```bash
turso db create [database-name]
```

--------------------------------

### Import Astro Components with `import.meta.glob()`

Source: https://docs.astro.build/en/guides/imports

Dynamically import all Astro components from a directory using `import.meta.glob()`. Render each component using its `default` property.

```astro
---
// imports all files that end with `.astro` in `./src/components/`
const components = Object.values(import.meta.glob('../components/*.astro', { eager: true }));
---
<!-- Display all of our components -->
{components.map((component) => (
  <div>
    <component.default size={24} />
  </div>
))}

```

--------------------------------

### Install Firebase Packages with npm

Source: https://docs.astro.build/en/guides/backend/firebase

Use this command to install the Firebase SDK for client-side and the Firebase Admin SDK for server-side applications using npm.

```bash
npm install firebase firebase-admin
```

--------------------------------

### Custom Logger Configuration

Source: https://docs.astro.build/en/reference/experimental-flags/logger

Example of configuring a custom logger with an entrypoint and configuration object.

```APIDOC
## Custom loggers
You can create a custom logger by providing the correct configuration to the `logger` setting. It accepts an object with a mandatory `entrypoint`, the module where the logger is exported, and an optional configuration to pass to the logger. The configuration must be serializable.
The logger function must be exported as `default`.
When you define a custom logger, you are in charge of all logs, even the ones emitted by Astro.
The following example defines a custom logger exported by the `@org/custom-logger` package and accepting only one parameter to configure the logging `level`:
```

import { defineConfig } from 'astro/config';


export default defineConfig({
  experimental: {
    logger: {
      entrypoint: "@org/custom-logger",
      config: {
        level: "warn"
      }
    }
  }
});

```
```

--------------------------------

### Install Sentry SDK with npm

Source: https://docs.astro.build/en/guides/backend/sentry

Use this command to add the Sentry SDK to your Astro project using npm.

```bash
npx astro add @sentry/astro
```

--------------------------------

### Handling Multiple HTTP Methods (GET, POST, DELETE, ALL)

Source: https://docs.astro.build/en/guides/endpoints

Demonstrates how to export functions for specific HTTP methods (GET, POST, DELETE) and a fallback ALL function for unmatched methods.

```APIDOC
## API Routes for Multiple HTTP Methods

### Description
Handles various HTTP methods (GET, POST, DELETE) and provides a fallback for any other method using the `ALL` function.

### Method
GET, POST, DELETE, ALL

### Endpoint
Dynamic endpoint based on file location

### Parameters
None explicitly defined in examples, but `request` and `params` can be accessed.

### Request Body
Depends on the HTTP method. POST can accept a JSON body.

### Response
#### Success Response (200)
- **message** (string) - A confirmation message indicating the HTTP method used.

### Request Example
```json
{
  "message": "This was a GET!"
}
```

### Response Example
```json
{
  "message": "This was a POST!"
}
```
```

--------------------------------

### Use Unstorage Redis Driver Directly in Implementation

Source: https://docs.astro.build/en/reference/session-driver-reference

Implement a session driver by directly importing and using an unstorage driver. This example shows how to wrap the unstorage redis driver with custom configuration.

```javascript
import type { SessionDriver } from 'astro'
import redisDriver from "unstorage/drivers/redis";


export default function(config): SessionDriver {
    return redisDriver({
        ...config,
        tls: true
    })
}
```

--------------------------------

### Install SCSS Pre-processor

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-nuxtjs

Install `sass` as a dev dependency to use SCSS or Sass files in your Astro project without modification.

```bash
npm install -D sass
```

--------------------------------

### Configure Netlify Build Settings

Source: https://docs.astro.build/en/guides/deploy/netlify

Create a `netlify.toml` file to configure your build command and publish directory. Netlify automatically uses this file for deployment settings.

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

--------------------------------

### Install Astro DB Integration Manually with Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/db

Install the @astrojs/db package manually using Yarn if you prefer not to use the `astro add` command.

```bash
yarn add @astrojs/db
```

--------------------------------

### Install Cloudinary Node.js SDK with npm

Source: https://docs.astro.build/en/guides/media/cloudinary

Install the Cloudinary Node.js SDK using npm. This is required for server-side operations within an Astro Node.js environment.

```bash
npm install cloudinary

```

--------------------------------

### Install Mux Player for Astro (npm)

Source: https://docs.astro.build/en/guides/media/mux

Install the Astro version of Mux Player using npm. This command adds the necessary package to your project.

```bash
npm install @mux/mux-player-astro
```

--------------------------------

### Install Firebase Packages with pnpm

Source: https://docs.astro.build/en/guides/backend/firebase

Use this command to install the Firebase SDK for client-side and the Firebase Admin SDK for server-side applications using pnpm.

```bash
pnpm add firebase firebase-admin
```

--------------------------------

### Create Astro Project with Minimal Template

Source: https://docs.astro.build/en/guides/integrations

Use npm, pnpm, or Yarn to create a new Astro project with a minimal template for testing and demonstration purposes.

```bash
npm create astro@latest demo -- --template minimal
```

```bash
pnpm create astro@latest demo -- --template minimal
```

```bash
yarn create astro demo --template minimal
```

--------------------------------

### astro:server:start Hook

Source: https://docs.astro.build/en/reference/integrations-reference

Fires just after the development server's `listen()` event. Useful for intercepting network requests or performing actions before the server is fully operational.

```APIDOC
## astro:server:start

### Description
Fires just after the server’s `listen()` event has fired. This hook is intended for intercepting network requests at the specified address. For middleware registration, `astro:server:setup` is recommended.

### When
Just after the server’s `listen()` event has fired.

### Why
To intercept network requests at the specified address.

### Signature
`'astro:server:start'?: (options: { address: AddressInfo; logger: AstroIntegrationLogger; }) => void | Promise<void>;`

#### Options
- **address** (AddressInfo) - The address, family, and port number supplied by the `server.address()` method of the Node.js Net module.
- **logger** (AstroIntegrationLogger) - The logger instance for the integration.
```

--------------------------------

### Install JSON:API Dependencies with npm

Source: https://docs.astro.build/en/guides/cms/drupal

Install the 'jsona' and 'drupal-jsonapi-params' npm packages to simplify handling JSON:API requests and responses in your Astro project.

```bash
npm install jsona drupal-jsonapi-params
```

--------------------------------

### Implement a FontProvider

Source: https://docs.astro.build/en/reference/font-provider-reference

Examples of implementing a FontProvider for a private registry, including support for configuration and family options.

```typescript
import type { FontProvider } from "astro";
import { retrieveFonts, type Fonts } from "./utils.js",


export function registryFontProvider(): FontProvider {
  let data: Fonts = {}


  return {
    name: "registry",
    init: async () => {
      data = await retrieveFonts(token);
    },
    listFonts: () => {
      return Object.keys(data);
    },
    resolveFont: ({ familyName, ...rest }) => {
      const fonts = data[familyName];
      if (fonts) {
        return { fonts };
      }
      return undefined;
    },
  };
}
```

```typescript
import type { FontProvider } from "astro";
import { retrieveFonts, type Fonts } from "./utils.js",


interface Config {
  token: string;
}


export function registryFontProvider(config: Config): FontProvider {
  let data: Fonts = {}


  return {
    name: "registry",
    config,
    init: async () => {
      data = await retrieveFonts(token);
    },
    listFonts: () => {
      return Object.keys(data);
    },
    resolveFont: ({ familyName, ...rest }) => {
      const fonts = data[familyName];
      if (fonts) {
        return { fonts };
      }
      return undefined;
    },
  };
}
```

```typescript
import type { FontProvider } from "astro";
import { retrieveFonts, type Fonts } from "./utils.js",


interface FamilyOptions {
  minimal?: boolean;
}


export function registryFontProvider(): FontProvider<FamilyOptions | undefined> {
  let data: Fonts = {}


  return {
    name: "registry",
    init: async () => {
      data = await retrieveFonts(token);
    },
    listFonts: () => {
      return Object.keys(data);
    },
    // options is typed as FamilyOptions | undefined
    resolveFont: ({ familyName, options, ...rest }) => {
      const fonts = data[familyName];
      if (fonts) {
        return { fonts };
      }
      return undefined;
    },
  };
}
```

--------------------------------

### Initialize Firebase Hosting with npm

Source: https://docs.astro.build/en/guides/deploy/firebase

Initialize Firebase Hosting in your project using npm. This command creates essential configuration files like `firebase.json` and `.firebaserc`.

```bash
npx firebase init hosting
```

--------------------------------

### Install SolidJS Dependency (Yarn)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Install the SolidJS library as a dependency using Yarn. This is required if you encounter 'Cannot find package solid-js' warnings.

```bash
yarn add solid-js
```

--------------------------------

### Deploy Application

Source: https://docs.astro.build/en/guides/deploy/zerops

Triggers a deployment from the root directory containing the zerops.yml file.

```bash
zcli push
```

--------------------------------

### Install AWS Amplify Adapter with pnpm

Source: https://docs.astro.build/en/guides/deploy/aws

Install the AWS Amplify adapter for Astro using pnpm. This enables server-rendered site deployment on AWS.

```bash
pnpm add astro-aws-amplify
```

--------------------------------

### Install Firebase Packages with Yarn

Source: https://docs.astro.build/en/guides/backend/firebase

Use this command to install the Firebase SDK for client-side and the Firebase Admin SDK for server-side applications using Yarn.

```bash
yarn add firebase firebase-admin
```

--------------------------------

### Install Sentry SDK with pnpm

Source: https://docs.astro.build/en/guides/backend/sentry

Use this command to add the Sentry SDK to your Astro project using pnpm.

```bash
pnpm astro add @sentry/astro
```

--------------------------------

### Install Firebase CLI with npm

Source: https://docs.astro.build/en/guides/deploy/firebase

Install the Firebase command-line interface using npm. This tool is necessary for interacting with Firebase services from your terminal.

```bash
npm install firebase-tools
```

--------------------------------

### Preview and Deploy with Wrangler

Source: https://docs.astro.build/en/guides/deploy/cloudflare

Commands to preview the project locally or deploy it to Cloudflare.

```bash
npx astro build && npx wrangler dev
```

```bash
npx astro build && npx wrangler deploy
```

--------------------------------

### GitHub Actions Workflow for Juno Deployment

Source: https://docs.astro.build/en/guides/deploy/juno

This GitHub Actions workflow automates the deployment of your Astro site to Juno. It checks out the repository, sets up Node.js, installs dependencies, and then uses the `juno-action` to deploy the hosting. Ensure your `JUNO_TOKEN` secret is configured in your repository.

```yaml
name: Deploy to Juno


on:
  workflow_dispatch:
  push:
    branches: [main]


jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v6


      - uses: actions/setup-node@v6
        with:
          node-version: 24
          registry-url: "https://registry.npmjs.org"


      - name: Install Dependencies
        run: npm ci


      - name: Deploy to Juno
        uses: junobuild/juno-action@main
        with:
          args: hosting deploy
        env:
          JUNO_TOKEN: ${{ secrets.JUNO_TOKEN }}
```

--------------------------------

### Install Cloudinary Astro SDK with npm

Source: https://docs.astro.build/en/guides/media/cloudinary

Install the Cloudinary Astro SDK using npm. This command adds the necessary package to your project's dependencies.

```bash
npm install astro-cloudinary
```

--------------------------------

### Add Astro Sitemap Integration using npm

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

Use the 'astro add' command with npm to install and set up the sitemap integration.

```bash
npx astro add sitemap
```

--------------------------------

### Install Firebase CLI with Yarn

Source: https://docs.astro.build/en/guides/deploy/firebase

Install the Firebase command-line interface using Yarn. This tool is necessary for interacting with Firebase services from your terminal.

```bash
yarn add firebase-tools
```

--------------------------------

### Install Cosmic JS SDK with pnpm

Source: https://docs.astro.build/en/guides/cms/cosmic

Add the Cosmic JavaScript SDK to your project using pnpm. This command installs the necessary package for interacting with Cosmic.

```bash
pnpm add @cosmicjs/sdk
```

--------------------------------

### Install Firebase CLI with pnpm

Source: https://docs.astro.build/en/guides/deploy/firebase

Install the Firebase command-line interface using pnpm. This tool is necessary for interacting with Firebase services from your terminal.

```bash
pnpm add firebase-tools
```

--------------------------------

### Install Ghost Content API with npm

Source: https://docs.astro.build/en/guides/cms/ghost

Install the official Ghost Content API package and its TypeScript types using npm. This enables your Astro project to communicate with your Ghost CMS.

```bash
npm install @tryghost/content-api
npm install --save @types/tryghost__content-api
```

--------------------------------

### Example Sitemap Output

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

The resulting XML structure when i18n is configured.

```xml

...
  <url>
    <loc>https://example.com/</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/"/>
    <xhtml:link rel="alternate" hreflang="es-ES" href="https://example.com/es/"/>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://example.com/fr/"/>
  </url>
  <url>
    <loc>https://example.com/es/</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/"/>
    <xhtml:link rel="alternate" hreflang="es-ES" href="https://example.com/es/"/>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://example.com/fr/"/>
  </url>
  <url>
    <loc>https://example.com/fr/</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/"/>
    <xhtml:link rel="alternate" hreflang="es-ES" href="https://example.com/es/"/>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://example.com/fr/"/>
  </url>
  <url>
    <loc>https://example.com/es/second-page/</loc>
    <xhtml:link rel="alternate" hreflang="es-ES" href="https://example.com/es/second-page/"/>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://example.com/fr/second-page/"/>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/second-page/"/>
  </url>
...
```

--------------------------------

### Install Cloudinary Node.js SDK with pnpm

Source: https://docs.astro.build/en/guides/media/cloudinary

Install the Cloudinary Node.js SDK using pnpm. This is required for server-side operations within an Astro Node.js environment.

```bash
pnpm add cloudinary

```

--------------------------------

### Install Cloudinary Astro SDK with pnpm

Source: https://docs.astro.build/en/guides/media/cloudinary

Install the Cloudinary Astro SDK using pnpm. This command adds the necessary package to your project's dependencies.

```bash
pnpm add astro-cloudinary
```

--------------------------------

### Build and Deploy with Vercel CLI

Source: https://docs.astro.build/en/guides/integrations-guide/vercel

Locally build your Astro project and then deploy it using the Vercel CLI with prebuilt assets.

```bash
astro build
vercel deploy --prebuilt
```

--------------------------------

### Install Cloudinary Node.js SDK with Yarn

Source: https://docs.astro.build/en/guides/media/cloudinary

Install the Cloudinary Node.js SDK using Yarn. This is required for server-side operations within an Astro Node.js environment.

```bash
yarn add cloudinary

```

--------------------------------

### Install CloudCannon Editable Regions Package

Source: https://docs.astro.build/en/guides/cms/cloudcannon

Install the `@cloudcannon/editable-regions` package using npm, pnpm, or Yarn to enable visual editing for Astro components.

```bash
npm install @cloudcannon/editable-regions
```

```bash
pnpm add @cloudcannon/editable-regions
```

```bash
yarn add @cloudcannon/editable-regions
```

--------------------------------

### Build Astro Site with pnpm

Source: https://docs.astro.build/en/develop-and-build

Run this command to build a production-ready version of your Astro site using pnpm. It creates a deployable output in the 'dist/' folder and checks for build errors.

```bash
pnpm build
```

--------------------------------

### Manually upgrade integrations with npm

Source: https://docs.astro.build/en/guides/integrations

Install the latest versions of specific integrations like React and Partytown.

```bash
# Example: upgrade React and Partytown integrations
npm install @astrojs/react@latest @astrojs/partytown@latest
```

--------------------------------

### Install Cloudinary Astro SDK with Yarn

Source: https://docs.astro.build/en/guides/media/cloudinary

Install the Cloudinary Astro SDK using Yarn. This command adds the necessary package to your project's dependencies.

```bash
yarn add astro-cloudinary
```

--------------------------------

### Install Decap CMS with pnpm

Source: https://docs.astro.build/en/guides/cms/decap-cms

Use this command to install the Decap CMS application package using pnpm.

```bash
pnpm add decap-cms-app
```

--------------------------------

### Keystatic Configuration File

Source: https://docs.astro.build/en/guides/cms/keystatic

Define your content schema and storage type in `keystatic.config.ts`. This example sets up local storage and a 'posts' collection with title and content fields.

```typescript
import { config, fields, collection } from '@keystatic/core';


export default config({
  storage: {
    kind: 'local',
  },

  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({
          label: 'Content',
        }),
      },
    }),
  },
});
```

--------------------------------

### Terminal command prompt example

Source: https://docs.astro.build/en/tutorial/1-setup/2

Represents the expected command prompt format within the VS Code terminal after opening the project.

```bash
user@machine:~/tutorial$
```

--------------------------------

### Base Astro file structure for ecommerce example

Source: https://docs.astro.build/en/recipes/sharing-state-islands

This is the base Astro file structure for the ecommerce cart flyout example. It includes importing necessary components like CartFlyoutToggle, CartFlyout, and AddToCartForm.

```astro
---
import CartFlyoutToggle from '../components/CartFlyoutToggle';
import CartFlyout from '../components/CartFlyout';
import AddToCartForm from '../components/AddToCartForm';
---


<!DOCTYPE html>
<html lang="en">
<head>...</head>
<body>
  <header>
    <nav>
      <a href="/">Astro storefront</a>
      <CartFlyoutToggle client:load />
    </nav>
  </header>
  <main>
    <AddToCartForm client:load>
    <!-- ... -->
    </AddToCartForm>
  </main>
  <CartFlyout client:load />
</body>
</html>

```

--------------------------------

### Deploy Site to Fleek

Source: https://docs.astro.build/en/guides/deploy/fleek

Execute the deployment of the site to the Fleek network.

```bash
fleek sites deploy
```

--------------------------------

### astro:server:start hook signature

Source: https://docs.astro.build/en/reference/integrations-reference

The `astro:server:start` hook is called after the dev server's `listen()` event fires. It provides the server address information and a logger instance.

```typescript
'astro:server:start'?: (options: {
  address: AddressInfo;
  logger: AstroIntegrationLogger;
}) => void | Promise<void>;
```

--------------------------------

### Minimal Logger Implementation

Source: https://docs.astro.build/en/reference/experimental-flags/logger

Example of implementing a minimal logger with a `write()` function.

```APIDOC
The following example implements a minimal logger returning an `AstroLoggerDestination` object with the required `write()` function:
```

import type {
  AstroLoggerLevel,
  AstroLoggerDestination,
  AstroLoggerMessage
} from "astro";
import { matchesLevel } from "astro/logger";


type LoggerOptions = {
  level: AstroLoggerLevel
}


function orgLogger(options: LoggerOptions = {}): AstroLoggerDestination {
  const { level = 'info' } = options;
  return {
    write(message: AstroLoggerMessage) {
      // Use this utility to understand if the message should be printed
      if (matchesLevel(message.level, level)) {
        // log message somewhere and take the level into consideration
      }
    }
  }
}


export default orgLogger;

```
```

--------------------------------

### Create New Astro Project with Yarn

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby

Use this command to launch the Astro CLI wizard or create a new project with an official starter template using Yarn.

```bash
# launch the Astro CLI Wizard
yarn create astro@latest


# create a new project with an official example
yarn create astro@latest --template <example-name>
```

--------------------------------

### Image Component Layout Examples

Source: https://docs.astro.build/en/reference/modules/astro-assets

Demonstrates overriding the default layout with `full-width` for hero images or `none` to disable responsive image behavior.

```javascript
import { Image } from 'astro:assets';
import myImage from '../assets/my_image.png';
---
<Image src={myImage} alt="This will use constrained layout" width={800} height={600} />
<Image src={myImage} alt="This will use full-width layout" layout="full-width" />
<Image src={myImage} alt="This will disable responsive images" layout="none" />
```

--------------------------------

### Install ApostropheCMS integration dependencies

Source: https://docs.astro.build/en/guides/cms/apostrophecms

Install the required packages for the Apostrophe integration using your preferred package manager.

```bash
npm install @apostrophecms/apostrophe-astro vite @astrojs/node
```

```bash
pnpm add @apostrophecms/apostrophe-astro vite @astrojs/node
```

```bash
yarn add @apostrophecms/apostrophe-astro vite @astrojs/node
```

--------------------------------

### Run build command

Source: https://docs.astro.build/en/recipes/analyze-bundle-size

Execute the build command to generate the bundle statistics file.

```bash
npm run build
```

```bash
pnpm build
```

```bash
yarn build
```

--------------------------------

### Registry Font Provider with Configuration

Source: https://docs.astro.build/en/reference/font-provider-reference

This example demonstrates a font provider that accepts configuration options, such as an authentication token.

```APIDOC
## `registryFontProvider(config: Config)`

### Description
Implements a font provider for a private registry with configuration options.

### Method
`registryFontProvider(config: Config): FontProvider`

### Parameters
#### Request Body
- **config** (object) - Required - Configuration object.
  - **token** (string) - Required - Authentication token for the private registry.

### Request Example
```json
{
  "example": "{\"token\": \"...\"}"
}
```

### Response
#### Success Response (200)
- **fonts** (string[]) - An array of available font names.

#### Response Example
```json
{
  "example": "response body"
}
```
```

--------------------------------

### Invalid ID Error Example

Source: https://docs.astro.build/en/reference/errors/content-loader-returns-invalid-id

Example of an invalid entry object where the ID is provided as a number instead of a string.

```json
{
 “id”: 1,
 “title”: “Hello, World!”
 }
```

--------------------------------

### Cypress Test Run Output

Source: https://docs.astro.build/en/guides/testing

Example output showing a successful Cypress test run.

```text
Running:  index.cy.js                                                                     (1 of 1)


✓ titles are correct (107ms)


1 passing (1s)
```

--------------------------------

### Create Solid Auth Client

Source: https://docs.astro.build/en/guides/authentication

Create a SolidJS authentication client by importing `createAuthClient` from 'better-auth/solid'. This client provides `signIn` and `signOut` functions.

```typescript
import { createAuthClient } from 'better-auth/solid';


export const authClient = createAuthClient();


export const {signIn, signOut } = authClient;

```

--------------------------------

### robots.txt Configuration

Source: https://docs.astro.build/en/install-and-setup

A sample robots.txt file to instruct search engine bots. This example allows all bots to scan and index the site.

```text
# Example: Allow all bots to scan and index your site.
# Full syntax: https://developers.google.com/search/docs/advanced/robots/create-robots-txt
User-agent: *
Allow: /
```

--------------------------------

### Initialize NightwatchJS with npm

Source: https://docs.astro.build/en/guides/testing

Initialize NightwatchJS within your Astro project using npm.

```bash
npm init nightwatch@latest
```

--------------------------------

### Install Cloudflare Adapter Manually with npm

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Manually add the `@astrojs/cloudflare` adapter to your project's dependencies using npm.

```bash
npm install @astrojs/cloudflare
```

--------------------------------

### Add Node Adapter using pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/node

Use the `astro add` command with pnpm to automatically install the Node adapter and configure your project.

```bash
pnpm astro add node
```

--------------------------------

### matchesLevel Helper Usage

Source: https://docs.astro.build/en/reference/experimental-flags/logger

Example of using the `matchesLevel` helper function from `astro/logger`.

```APIDOC
The `astro/logger` package exposes a `matchesLevel()` helper to check the log level. This can be useful when building a custom logger.
```

import { matchesLevel } from "astro/logger";


matchesLevel("error", "info");

```
```

--------------------------------

### Hook into astro:before-preparation loader

Source: https://docs.astro.build/en/guides/view-transitions

Use the loader callback to execute asynchronous code before content loading begins.

```html
<script is:inline>
  document.addEventListener("astro:before-preparation", (event) => {
    const originalLoader = event.loader;
    event.loader = async function () {
      const { startSpinner } = await import("./spinner.js");
      const stop = startSpinner();
      await originalLoader();
      stop();
    };
  });
</script>
```

--------------------------------

### Install npm Packages for Astro Integrations

Source: https://docs.astro.build/en/guides/troubleshooting

Install necessary packages like React and ReactDOM when using the @astrojs/react integration. This ensures that Astro can properly utilize the framework.

```bash
# Example: Install integrations and frameworks together
npm install @astrojs/react react react-dom

```

--------------------------------

### Run Standalone Astro Server

Source: https://docs.astro.build/en/guides/integrations-guide/node

Execute the Astro server entrypoint directly using Node.js for a standalone server setup.

```bash
node ./dist/server/entry.mjs

```

--------------------------------

### Initialize Neon Client

Source: https://docs.astro.build/en/guides/backend/neon

Create a Neon client instance in src/lib/neon.ts using the NEON_DATABASE_URL from your environment variables. This client will be used for database interactions.

```typescript
import { neon } from '@neondatabase/serverless';


export const sql = neon(import.meta.env.NEON_DATABASE_URL);
```

--------------------------------

### Using Node.js Buffer Module in Astro

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Example of importing the Node.js Buffer module using the `node:` prefix. This requires the `nodejs_compat` flag to be enabled in Wrangler.

```javascript
export const prerender = false;
import { Buffer } from 'node:buffer';

```

--------------------------------

### Add integrations using the CLI

Source: https://docs.astro.build/en/guides/integrations

Use the astro add command to automatically install dependencies and update your configuration file.

```bash
npx astro add react
```

```bash
pnpm astro add react
```

```bash
yarn astro add react
```

--------------------------------

### Adapt Dynamic Pages for SSR

Source: https://docs.astro.build/en/guides/routing

SSR pages cannot use `getStaticPaths()` and thus cannot receive props directly. This example shows how to adapt the `[...slug]` example for SSR by finding page data based on `Astro.params.slug` and redirecting to a 404 page if the data is not found.

```javascript
---
const pages = [
  {
    slug: undefined,
    title: 'Astro Store',
    text: 'Welcome to the Astro store!',
  },
  {
    slug: 'products',
    title: 'Astro products',
    text: 'We have lots of products for you',
  },
  {
    slug: 'products/astro-handbook',
    title: 'The ultimate Astro handbook',
    text: 'If you want to learn Astro, you must read this book.',
  }
];


const { slug } = Astro.params;
const page = pages.find((page) => page.slug === slug);
if (!page) return Astro.redirect("/404");
const { title, text } = page;
---
<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
    <p>{text}</p>
  </body>
</html>

```

--------------------------------

### PreviewServer

Source: https://docs.astro.build/en/reference/adapter-reference

Describes an instance of a preview server for the adapter, including its host, port, and methods to close and stop the server.

```APIDOC
## PreviewServer

### Description
Describes an instance of a preview server for the adapter.

### Properties
- **host** (`string | undefined`): Defines the host the preview server is listening on.
- **port** (`number`): Defines the port the preview server is listening on.
- **closed** (`() => Promise<void>`): Defines a function that resolves when the preview server has closed.
- **stop** (`() => Promise<void>`): Defines a function to stop the preview server and perform any necessary cleanup.
```

--------------------------------

### build() - Build Site for Deployment

Source: https://docs.astro.build/en/reference/programmatic-reference

Builds the Astro site for deployment, similar to running `astro build`.

```APIDOC
## POST /api/build

### Description
Builds your Astro site for deployment.

### Method
POST

### Endpoint
/api/build

### Parameters
#### Request Body
- **inlineConfig** (AstroInlineConfig) - Required - Configuration object for the build.
- **options** (BuildOptions) - Optional - Options for the build process.
  - **devOutput** (boolean) - Optional - Default: `false`. Output a development-based build.
  - **teardownCompiler** (boolean) - Optional - Default: `true`. Teardown the compiler WASM instance after build.

### Request Example
```json
{
  "inlineConfig": {
    "root": "./my-project"
  },
  "options": {
    "devOutput": true,
    "teardownCompiler": false
  }
}
```

### Response
#### Success Response (200)
- **void** - Indicates the build process completed successfully.

#### Response Example
```json
null
```
```

--------------------------------

### Importing Astro and React Components

Source: https://docs.astro.build/en/guides/integrations

Demonstrates how to import and use both Astro and React components within an Astro file. Ensure the respective component packages are installed.

```astro
import MyAstroComponent from 'example-astro-component/astro';
import MyReactComponent from 'example-astro-component/react';

<MyAstroComponent />
<MyReactComponent />
```

--------------------------------

### Install Cosmic JS SDK with Yarn

Source: https://docs.astro.build/en/guides/cms/cosmic

Add the Cosmic JavaScript SDK to your project using Yarn. This command installs the package required for fetching data from Cosmic.

```bash
yarn add @cosmicjs/sdk
```

--------------------------------

### Install AWS Amplify Adapter with Yarn

Source: https://docs.astro.build/en/guides/deploy/aws

Install the AWS Amplify adapter for Astro using Yarn. This is a prerequisite for deploying server-rendered Astro sites to AWS.

```bash
yarn add astro-aws-amplify
```

--------------------------------

### Build Astro Site

Source: https://docs.astro.build/en/guides/deploy/deno

Build the project for production deployment.

```bash
npm run build
```

```bash
pnpm run build
```

```bash
yarn run build
```

--------------------------------

### Install React Peer Dependencies

Source: https://docs.astro.build/en/guides/integrations-guide/react

If you encounter issues with missing React packages, install `react`, `react-dom`, and their type definitions manually. This ensures compatibility with the @astrojs/react integration.

```bash
npm install react react-dom @types/react @types/react-dom
```

```bash
pnpm add react react-dom @types/react @types/react-dom
```

```bash
yarn add react react-dom @types/react @types/react-dom
```

--------------------------------

### Query Posts from Xata in Astro

Source: https://docs.astro.build/en/guides/backend/xata

Import and instantiate the XataClient in an Astro component to query data. This example fetches the first 50 posts and displays their titles. Ensure your Xata SDK is generated and up-to-date with your schema.

```astro
---
import { XataClient } from '../../xata';


const xata = new XataClient({
  apiKey: import.meta.env.XATA_API_KEY,
  branch: import.meta.env.XATA_BRANCH
});


const { records } = await xata.db.Posts.getPaginated({
  pagination: {
    size: 50
  }
})
---


<ul>
  {records.map((post) => (
    <li>{post.title}</li>
  ))}
</ul>
```

--------------------------------

### astro:build:start hook signature

Source: https://docs.astro.build/en/reference/integrations-reference

The `astro:build:start` hook runs after `astro:config:done` and before the production build begins. It provides a logger and a function to set the prerenderer.

```typescript
'astro:build:start'?: (options: {
  logger: AstroIntegrationLogger;
  setPrerenderer: (prerenderer: AstroPrerenderer | ((defaultPrerenderer: AstroPrerenderer) => AstroPrerenderer)) => void;
}) => void | Promise<void>;
```

--------------------------------

### Registry Font Provider Implementation

Source: https://docs.astro.build/en/reference/font-provider-reference

This example shows a basic implementation of a font provider for a private registry.

```APIDOC
## `registryFontProvider()`

### Description
Implements a font provider for a private registry.

### Method
`registryFontProvider(): FontProvider`

### Parameters
None

### Request Body
None

### Request Example
```json
{
  "example": "request body"
}
```

### Response
#### Success Response (200)
- **fonts** (string[]) - An array of available font names.

#### Response Example
```json
{
  "example": "response body"
}
```
```

--------------------------------

### Initialize Astro Sitecore Project

Source: https://docs.astro.build/en/guides/cms/sitecore

Run this command in your terminal to initialize a new Astro project with Sitecore JSS integration. Follow the on-screen prompts for configuration.

```bash
npx @astro-sitecore-jss/create-astro-sitecore-jss@latest
```

--------------------------------

### Install Sentry SDK with Yarn

Source: https://docs.astro.build/en/guides/backend/sentry

Use this command to add the Sentry SDK to your Astro project using Yarn.

```bash
yarn astro add @sentry/astro
```

--------------------------------

### Install Ghost Content API with pnpm

Source: https://docs.astro.build/en/guides/cms/ghost

Install the official Ghost Content API package and its TypeScript types using pnpm. This enables your Astro project to communicate with your Ghost CMS.

```bash
pnpm add @tryghost/content-api
pnpm add --save-dev @types/tryghost__content-api
```

--------------------------------

### Configure Astro Adapter with Custom Entrypoint

Source: https://docs.astro.build/en/reference/adapter-reference

Configures an Astro adapter to use a custom server entrypoint. This example specifies the `serverEntrypoint` property.

```javascript
export default function createIntegration() {
  return {
    name: '@example/my-adapter',
    hooks: {
      'astro:config:done': ({ setAdapter }) => {
        setAdapter({
          name: '@example/my-adapter',
          entrypointResolution: 'auto',
          serverEntrypoint: '@example/my-adapter/custom-entrypoint.js',
        });
      },
    },
  };
}
```

--------------------------------

### Add Cloudflare Adapter

Source: https://docs.astro.build/en/guides/deploy/cloudflare

Install the Cloudflare adapter for Astro using your preferred package manager.

```bash
npx astro add cloudflare
```

```bash
pnpm astro add cloudflare
```

```bash
yarn astro add cloudflare
```

--------------------------------

### Install Ghost Content API with Yarn

Source: https://docs.astro.build/en/guides/cms/ghost

Install the official Ghost Content API package and its TypeScript types using Yarn. This enables your Astro project to communicate with your Ghost CMS.

```bash
yarn add @tryghost/content-api
yarn add --dev @types/tryghost__content-api
```

--------------------------------

### MDX custom component usage example

Source: https://docs.astro.build/en/guides/integrations-guide/mdx

Example demonstrating how to use custom components in MDX, specifically replacing default HTML elements like `h1` with an Astro component.

```mdx
---
import { Content, components } from '../content.mdx';
import Heading from '../Heading.astro';
---


<Content components={{ ...components, h1: Heading }} />
```

--------------------------------

### Add Netlify Adapter using pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/netlify

Use the `astro add` command with pnpm to automatically install the Netlify adapter and configure your Astro project.

```bash
pnpm astro add netlify
```

--------------------------------

### Build Astro Site with Yarn

Source: https://docs.astro.build/en/develop-and-build

Run this command to build a production-ready version of your Astro site with Yarn. It creates a deployable output in the 'dist/' folder and checks for build errors.

```bash
yarn run build
```

--------------------------------

### Authenticate Azion CLI

Source: https://docs.astro.build/en/guides/deploy/azion

Run this command to authenticate your CLI with your Azion account. Ensure you have the Azion CLI installed.

```bash
azion login
```

--------------------------------

### Configure Node.js build commands in Buddy

Source: https://docs.astro.build/en/guides/deploy/buddy

Use these commands within a Buddy Node.js pipeline action to install dependencies and generate the production build.

```bash
npm install
npm run build
```

--------------------------------

### Import createApp from astro/app/entrypoint

Source: https://docs.astro.build/en/reference/modules/astro-app

Import the `createApp` helper function from the `astro/app/entrypoint` module.

```javascript
import {
  createApp
} from "astro/app/entrypoint";
```

--------------------------------

### Runtime Logger Usage

Source: https://docs.astro.build/en/reference/experimental-flags/logger

Example of using the logger functions available in the runtime context.

```APIDOC
## Runtime
The context object now exposes a `logger` object containing the following functions:
  * `error()`, which emits a message with `error` level.
  * `warn()`, which emits a message with `warn` level.
  * `info()`, which emits a message with `info` level.


```

--- 
Astro.logger.error("This is an error");
Astro.logger.warn("This is a warning");
Astro.logger.info("This is an info");
---

```
```

--------------------------------

### Configure Runtime Arguments (Deprecated)

Source: https://docs.astro.build/en/reference/adapter-reference

Pass JSON-serializable values to the adapter's server entrypoint at runtime using `args`. This property is deprecated; use `entrypointResolution: "auto"` instead.

```javascript
export default function createIntegration() {
  return {
    name: '@example/my-adapter',
    hooks: {
      'astro:config:done': ({ config, setAdapter }) => {
        setAdapter({
          name: '@example/my-adapter',
          entrypointResolution: 'explicit',
          args: {
            assets: config.build.assets
          },
          serverEntrypoint: '@example/my-adapter/server.js'
        });
      },
    },
  };
}
```

--------------------------------

### Package Entrypoint Index.js

Source: https://docs.astro.build/en/guides/integrations

The main entrypoint file for your package, used when the package is imported. This example exports Astro and React components.

```javascript
export { default as MyAstroComponent } from './MyAstroComponent.astro';
export { default as MyReactComponent } from './MyReactComponent.jsx';
```

--------------------------------

### Add Netlify Adapter for Astro

Source: https://docs.astro.build/en/guides/deploy/netlify

Use this command to install the Netlify adapter for Astro, enabling on-demand rendering and configuring your `astro.config.mjs` file.

```bash
npx astro add netlify
```

--------------------------------

### dev() - Run Astro Development Server

Source: https://docs.astro.build/en/reference/programmatic-reference

Starts Astro's development server programmatically, similar to running `astro dev`.

```APIDOC
## POST /api/dev

### Description
Runs Astro's development server programmatically.

### Method
POST

### Endpoint
/api/dev

### Parameters
#### Request Body
- **inlineConfig** (AstroInlineConfig) - Required - Configuration object for the dev server.

### Request Example
```json
{
  "inlineConfig": {
    "root": "./my-project"
  }
}
```

### Response
#### Success Response (200)
- **DevServer** (object) - An object representing the running development server.
  - **address** (AddressInfo) - The address the dev server is listening on.
  - **handle** ((req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => void) - A handle for raw Node HTTP requests.
  - **watcher** (vite.FSWatcher) - The Chokidar file watcher.
  - **stop** (() => Promise<void>) - A function to stop the development server.

#### Response Example
```json
{
  "address": {
    "port": 3000,
    "family": "IPv4",
    "address": "127.0.0.1"
  },
  "watcher": {},
  "stop": "[Function: stop]"
}
```
```

--------------------------------

### Install Missing Sass Dependency

Source: https://docs.astro.build/en/guides/upgrade-to/v1

Run this command if the Sass preprocessor is not found during build.

```text
Preprocessor dependency "sass" not found. Did you install it?
```

--------------------------------

### Import NPM packages

Source: https://docs.astro.build/en/guides/imports

Import installed NPM packages within the Astro frontmatter.

```javascript

---
import { Icon } from 'astro-icon';
---

```

--------------------------------

### Install Supabase Client Dependency

Source: https://docs.astro.build/en/guides/backend/supabase

Install the official Supabase JavaScript client library using npm, pnpm, or Yarn. This library is required to interact with your Supabase project from your Astro application.

```bash
npm install @supabase/supabase-js
```

```bash
pnpm add @supabase/supabase-js
```

```bash
yarn add @supabase/supabase-js
```

--------------------------------

### Fetch Single Post by Slug with Placeholders

Source: https://docs.astro.build/en/guides/backend/turso

Use SQL placeholders with the execute() method to safely pass dynamic values like slugs to your queries. This example fetches a single post based on its slug.

```astro
---
import { turso } from '../turso'


const { slug } = Astro.params


const { rows } = await turso.execute({
  sql: 'SELECT * FROM posts WHERE slug = ?',
  args: [slug!]
})
---


<h1>{rows[0].title}</h1>
```

--------------------------------

### Example JSON Log Output

Source: https://docs.astro.build/en/reference/experimental-flags/logger

Illustrates the structure of a log message when using the JSON logger.

```json
{ "message": "<the message>", "label": "router", "level": "info", "time": "<UNIX timestamp>"  }

```

--------------------------------

### Check local Node.js version

Source: https://docs.astro.build/en/guides/upgrade-to/v2

Verify the installed Node.js version in the local development environment.

```bash
node -v
```

--------------------------------

### Install Astro Integrations

Source: https://docs.astro.build/en/guides/cms/keystatic

Add the React and Markdoc integrations to your Astro project using the `astro add` command. This is required for Keystatic's Admin UI and content processing.

```bash
npx astro add react markdoc
```

```bash
pnpm astro add react markdoc
```

```bash
yarn astro add react markdoc
```

--------------------------------

### Run Deployment Script

Source: https://docs.astro.build/en/guides/deploy/deno

Execute the custom deployment script defined in package.json.

```bash
npm run deno-deploy
```

--------------------------------

### Install Cloudflare Adapter Manually with pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Manually add the `@astrojs/cloudflare` adapter to your project's dependencies using pnpm.

```bash
pnpm add @astrojs/cloudflare
```

--------------------------------

### Configure Astro Integrations

Source: https://docs.astro.build/en/guides/upgrade-to/v1

Example of updating the astro.config.mjs file to use the new integration system alongside legacy renderers.

```javascript
// Then, update your `astro.config.mjs` file:
// (Read the full walkthrough: https://docs.astro.build/en/guides/integrations-guide)
import lit from '@astrojs/lit';
import react from '@astrojs/react';


export default {
  renderers: ['@astrojs/renderer-lit', '@astrojs/renderer-react'],
  integrations: [lit(), react()],
}
```

--------------------------------

### Create a Nanostores Atom

Source: https://docs.astro.build/en/recipes/sharing-state-islands

Initialize a new atom to manage global state. This example creates a boolean atom to control the cart's open/closed state.

```javascript
import { atom } from 'nanostores';


export const isCartOpen = atom(false);
```

--------------------------------

### Initialize package.json with npm

Source: https://docs.astro.build/en/install-and-setup

Initializes a new package.json file using npm. This is used to manage project dependencies.

```bash
npm init --yes
```

--------------------------------

### Add Astro Adapter Keyword

Source: https://docs.astro.build/en/reference/adapter-reference

To allow your adapter to be installed via `astro add`, add `astro-adapter` to the `keywords` field in your `package.json`. This helps users discover and install your adapter.

```json
{
  "name": "example",
  "keywords": ["astro-adapter"]
}
```

--------------------------------

### Test knowledge: Layout component

Source: https://docs.astro.build/en/tutorial/4-layouts/2

Example of an Astro layout component with missing imports and props to be filled in.

```astro
---
import ____________ from '../components/Footer.astro'
const { ___________ } = Astro.props
---
<h1>{frontmatter.title}</h1>
<p>Written by: {frontmatter.______} on {frontmatter.pubDate}</p>
< _______ />
<Footer />
```

```astro
---
import Footer from '../components/Footer.astro'
const { frontmatter } = Astro.props
---
<h1>{frontmatter.title}</h1>
<p>Written by: {frontmatter.author} on {frontmatter.pubDate}</p>
<slot />
<Footer />
```

--------------------------------

### Run the Astro development server programmatically

Source: https://docs.astro.build/en/reference/programmatic-reference

Starts the development server using the dev function and provides a DevServer instance to manage the lifecycle.

```typescript

import { dev } from "astro";


const devServer = await dev({
  root: "./my-project",
});


// Stop the server if needed
await devServer.stop();

```

--------------------------------

### addDevToolbarApp()

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

Registers a new app within the Astro Dev Toolbar during the configuration setup phase.

```APIDOC
## addDevToolbarApp()

### Description
A function available to the `astro:config:setup` hook that adds dev toolbar apps. It requires an object with an ID, name, and entrypoint.

### Parameters
#### Request Body
- **id** (string) - Required - A unique identifier for the app.
- **name** (string) - Required - The human-readable name of the app.
- **entrypoint** (string | URL) - Required - The path to the file that exports the dev toolbar app.
- **icon** (Icon | string) - Optional - The icon used to display the app in the toolbar. Defaults to "?".
```

--------------------------------

### Passing Props from getStaticPaths

Source: https://docs.astro.build/en/reference/api-reference

Demonstrates how `props` from `getStaticPaths` are available in the component. This example passes an 'author' prop.

```astro
---
export function getStaticPaths() {
  return [
    { params: { id: '1' }, props: { author: 'Blu' } },
    { params: { id: '2' }, props: { author: 'Erika' } },
    { params: { id: '3' }, props: { author: 'Matthew' } }
  ];
}


const { id } = Astro.params;
const { author } = Astro.props;
---
```

--------------------------------

### Configure Wrangler Types Script

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Example `package.json` script configuration to automatically run `wrangler types` before other commands, ensuring TypeScript types for bindings are up-to-date.

```json
{
  "scripts": {
    "dev": "wrangler types && astro dev",
    "start": "wrangler types && astro dev",
    "build": "wrangler types && astro check && astro build",
    "preview": "wrangler types && astro preview",
    "astro": "astro"
  }
}
```

--------------------------------

### Add Vercel Adapter with npm

Source: https://docs.astro.build/en/guides/integrations-guide/vercel

Use this command to automatically install the Vercel adapter and update your Astro configuration.

```bash
npx astro add vercel
```

--------------------------------

### Define complex dynamic route patterns

Source: https://docs.astro.build/en/guides/routing

Example of a dynamic route pattern and its resulting parameter object.

```text
/[org]/[repo]/tree/[branch]/[...file]
```

```text
{
  org: "withastro",
  repo: "astro",
  branch: "main",
  file: "docs/public/favicon.svg"
}
```

--------------------------------

### Example of a generated Markdown post

Source: https://docs.astro.build/en/guides/cms/cloudcannon

The resulting Markdown file structure after creating and saving a new entry in CloudCannon.

```markdown
---
title: My New Post
author: Sarah
date: 2025-11-12
---


This is my very first post created in CloudCannon. I am **super** excited!
```

--------------------------------

### Add @astrojs/solid-js Integration (npm)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Use the Astro CLI to add the SolidJS integration to your project. This command automates the setup process.

```bash
npx astro add solid
```

--------------------------------

### Display Request Method and URL in UI

Source: https://docs.astro.build/en/reference/api-reference

Show the HTTP method and URL of the incoming request within your UI. This example also demonstrates how to display request headers.

```html
<p>Received a {Astro.request.method} request to "{Astro.request.url}".</p>
<p>Received request headers:</p>
<p><code>{JSON.stringify(Object.fromEntries(Astro.request.headers))}</code></p>
```

--------------------------------

### Create Playwright Test Files

Source: https://docs.astro.build/en/guides/testing

Example of an Astro page and its corresponding Playwright test file.

```astro
---
---
<html lang="en">
  <head>
    <title>Astro is awesome!</title>
    <meta name="description" content="Pull content from anywhere and serve it fast with Astro's next-gen islands architecture." />
  </head>
  <body></body>
</html>
```

```javascript
import { test, expect } from '@playwright/test';


test('meta is correct', async ({ page }) => {
  await page.goto("http://localhost:4321/");


  await expect(page).toHaveTitle('Astro is awesome!');
});
```

--------------------------------

### Install Astro v3.x with npm

Source: https://docs.astro.build/en/guides/upgrade-to/v3

Use this command to update Astro to the latest v3.x version using npm. Ensure integrations are also updated.

```bash
# Upgrade to Astro v3.x
npm install astro@latest


# Example: upgrade React and Tailwind integrations
npm install @astrojs/react@latest @astrojs/tailwind@latest
```

--------------------------------

### Add Astro Sitemap Integration using pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

Use the 'astro add' command with pnpm to install and set up the sitemap integration.

```bash
pnpm astro add sitemap
```

--------------------------------

### Hydrating Components in Astro

Source: https://docs.astro.build/en/recipes/build-forms-api

Examples of importing and hydrating framework components using the client:load directive.

```astro
---
import FeedbackForm from "../components/FeedbackForm"
---
<FeedbackForm client:load />
```

```astro
---
import FeedbackForm from "../components/FeedbackForm"
---
<FeedbackForm client:load />
```

```astro
---
import FeedbackForm from "../components/FeedbackForm"
---
<FeedbackForm client:load />
```

```astro
---
import FeedbackForm from "../components/FeedbackForm.svelte"
---
<FeedbackForm client:load />
```

```astro
---
import FeedbackForm from "../components/FeedbackForm.vue"
---
<FeedbackForm client:load />
```

--------------------------------

### Registering a Font Provider in Astro Config

Source: https://docs.astro.build/en/reference/font-provider-reference

Examples of how to register a custom font provider in the `astro.config.js` file.

```APIDOC
## Registering a Simple Font Provider

### Description
Registers a basic font provider.

### Method
`defineConfig(config: UserConfig)`

### Endpoint
`astro.config.js`

### Parameters
#### Request Body
- **fonts** (Array<FontConfig>) - Required - Array of font configurations.
  - **provider** (FontProvider) - Required - The font provider instance.
  - **name** (string) - Required - The name of the font.
  - **cssVariable** (string) - Required - The CSS variable to use for the font.

### Request Example
```javascript
import { defineConfig } from "astro/config";
import { registryFontProvider } from "./font-provider";

export default defineConfig({
  fonts: [{
    provider: registryFontProvider(),
    name: "Custom",
    cssVariable: "--font-custom"
  }]
});
```
```

```APIDOC
## Registering a Font Provider with Configuration

### Description
Registers a font provider that requires configuration options.

### Method
`defineConfig(config: UserConfig)`

### Endpoint
`astro.config.js`

### Parameters
#### Request Body
- **fonts** (Array<FontConfig>) - Required - Array of font configurations.
  - **provider** (FontProvider) - Required - The font provider instance with configuration.
  - **name** (string) - Required - The name of the font.
  - **cssVariable** (string) - Required - The CSS variable to use for the font.

### Request Example
```javascript
import { defineConfig } from "astro/config";
import { registryFontProvider } from "./font-provider";

export default defineConfig({
  fonts: [{
    provider: registryFontProvider({
      token: "..."
    }),
    name: "Custom",
    cssVariable: "--font-custom"
  }]
});
```
```

```APIDOC
## Registering a Font Provider with Family Options

### Description
Registers a font provider that supports specific options for font families.

### Method
`defineConfig(config: UserConfig)`

### Endpoint
`astro.config.js`

### Parameters
#### Request Body
- **fonts** (Array<FontConfig>) - Required - Array of font configurations.
  - **provider** (FontProvider) - Required - The font provider instance.
  - **options** (FamilyOptions | undefined) - Optional - Options for the font family.
  - **name** (string) - Required - The name of the font.
  - **cssVariable** (string) - Required - The CSS variable to use for the font.

### Request Example
```javascript
import { defineConfig } from "astro/config";
import { registryFontProvider } from "./font-provider";

export default defineConfig({
  fonts: [{
    provider: registryFontProvider(),
    options: {
      minimal: true
    },
    name: "Custom",
    cssVariable: "--font-custom"
  }]
});
```
```

--------------------------------

### Configure Windsurf AI MCP Server

Source: https://docs.astro.build/en/guides/build-with-ai

Add the Astro Docs MCP server to Windsurf's local proxy configuration. Windsurf requires this local setup as it does not support streaming HTTP.

```json
{
  "mcpServers": {
    "Astro docs": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.docs.astro.build/mcp"]
    }
  }
}
```

--------------------------------

### Basic RSS Feed Setup in Astro

Source: https://docs.astro.build/en/recipes/rss

Set up a basic RSS feed endpoint in Astro by importing and configuring the `rss()` helper. Ensure your project's `site` is configured in `astro.config.js`.

```javascript
import rss from '@astrojs/rss';


export function GET(context) {
  return rss({
    // `<title>` field in output xml
    title: 'Buzz’s Blog',
    // `<description>` field in output xml
    description: 'A humble Astronaut’s guide to the stars',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: [],
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
```

--------------------------------

### Initialize a Toolbar App

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

Use the defineToolbarApp function to initialize the app and listen for toggle events.

```javascript
export default defineToolbarApp({
  init(canvas, app) {
    app.onToggled(({ state }) => {
      const text = document.createTextNode(
        `The app is now ${state ? "enabled" : "disabled"}!`,
      );
      canvas.appendChild(text);
    });
  },
});
```

--------------------------------

### Configure Astro Docs MCP Server (stdio)

Source: https://docs.astro.build/en/guides/build-with-ai

Manual setup for the Astro Docs MCP server using stdio transport. This configuration is useful for tools that execute commands locally.

```json
{
  "mcpServers": {
    "Astro docs": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.docs.astro.build/mcp"]
    }
  }
}
```

--------------------------------

### Add Node Adapter using Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/node

Use the `astro add` command with Yarn to automatically install the Node adapter and configure your project.

```bash
yarn astro add node
```

--------------------------------

### Markdown File with Frontmatter

Source: https://docs.astro.build/en/guides/markdown-content

Example of a Markdown file with YAML frontmatter for metadata like title and author.

```markdown
---
title: 'The greatest post of all time'
author: 'Ben'
---


Here is my _great_ post!

```

--------------------------------

### Render UI Elements in Dev Toolbar App Init

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

The `init()` function within `defineToolbarApp` is used to render UI elements to the app's dedicated `canvas` (ShadowRoot). This example appends a simple text node.

```javascript
export default defineToolbarApp({
  init(canvas) {
    canvas.appendChild(document.createTextNode('Hello World!'))
  }
});
```

--------------------------------

### Alternative Node.js Docker Image

Source: https://docs.astro.build/en/recipes/docker

Example of using a different Node.js image, such as `node:lts-alpine`, for your Docker build.

```dockerfile
FROM node:lts as runtime
FROM node:lts-alpine as runtime
```

--------------------------------

### Configure Experimental Client Prerendering

Source: https://docs.astro.build/en/reference/experimental-flags/client-prerender

Enable client-side prerendering and prefetch settings within the Astro configuration file.

```javascript
import { defineConfig } from 'astro/config';


export default defineConfig({
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  experimental: {
    clientPrerender: true,
  },
});
```

--------------------------------

### Handle Middleware Loading Errors in Astro

Source: https://docs.astro.build/en/reference/errors/middleware-cant-be-loaded

This example demonstrates an error thrown during middleware loading in Astro. Ensure your middleware does not throw unhandled errors during its initialization phase.

```javascript
import {defineMiddleware} from "astro:middleware";
throw new Error("Error thrown while loading the middleware.")
export const onRequest = defineMiddleware(() => {
  return "string"
});

```

--------------------------------

### Add Node.js Adapter for Astro

Source: https://docs.astro.build/en/guides/deploy/sevalla

Install the `@astrojs/node` adapter to enable SSR deployment. This command adds the necessary package to your project.

```bash
npx astro add node

```

--------------------------------

### Cloudflare Images Binding Configuration

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Example JSON structure showing the binding name for Cloudflare Images.

```json
{
  "images": {
    "binding": "MY_IMAGES"
  }
}
```

--------------------------------

### Usage with Alpine Plugins

Source: https://docs.astro.build/en/guides/integrations-guide/alpinejs

Example of using Alpine.js directives and a CDN-loaded plugin within an Astro component.

```html
---
---
<html>
  <head>
    <!-- ... -->
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>
  </head>
  <body>
    <!-- ... -->
    <div x-data="{ expanded: false }">
      <button @click="expanded = ! expanded">Toggle Content</button>


      <p id="foo" x-show="expanded" x-collapse>
        Lorem ipsum
      </p>
    </div>
  </body>
</html>
```

--------------------------------

### Astro Config Setup Hook Signature

Source: https://docs.astro.build/en/reference/integrations-reference

The signature for the `astro:config:setup` hook, which allows integrations to modify the Astro and Vite configuration.

```typescript
'astro:config:setup'?: (options: {
  config: AstroConfig;
  command: 'dev' | 'build' | 'preview' | 'sync';
  isRestart: boolean;
  updateConfig: (newConfig: DeepPartial<AstroConfig>) => AstroConfig;
  addRenderer: (renderer: AstroRenderer) => void;
  addClientDirective: (directive: ClientDirectiveConfig) => void;
  addMiddleware: (middleware: AstroIntegrationMiddleware) => void;
  addDevToolbarApp: (entrypoint: DevToolbarAppEntry) => void;
  addWatchFile: (path: URL | string) => void;
  injectScript: (stage: InjectedScriptStage, content: string) => void;
  injectRoute: (injectedRoute: InjectedRoute) => void;
  createCodegenDir: () => URL;
  logger: AstroIntegrationLogger;
}) => void | Promise<void>;

```

--------------------------------

### Create an Astro Container Instance

Source: https://docs.astro.build/en/reference/container-reference

Use `experimental_AstroContainer.create()` to instantiate a new container. This is the starting point for using the Container API.

```typescript
import { experimental_AstroContainer } from "astro/container";


const container = await experimental_AstroContainer.create();
```

--------------------------------

### Handle App Initialization on Server

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

Register a callback with `toolbar.onAppInitialized()` to execute code once a specific toolbar app has been initialized. This is crucial for reliable client-server communication.

```javascript
'astro:server:setup': ({ toolbar }) => {
  toolbar.onAppInitialized('my-app', () => {
    console.log('The app is now initialized!');
  });
},
```

--------------------------------

### About Page using Astro Layout

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby

An example of another page (`about.astro`) that uses the `Layout.astro` component, demonstrating how different pages can leverage the same layout with varying props.

```astro
---
import Layout from '../layouts/Layout.astro';
const pagePathname = Astro.url.pathname
---
<Layout title="About" pathname={pagePathname}>
    <p>About</p>
</Layout>
```

--------------------------------

### Create New Astro Project with Yarn

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-create-react-app

Use the 'create astro' command with Yarn to initialize a new, empty Astro project. This command starts the Astro CLI wizard.

```bash
yarn create astro@latest
```

--------------------------------

### Markdoc Image Syntax Examples

Source: https://docs.astro.build/en/guides/integrations-guide/markdoc

Demonstrates how native image syntax in Markdoc files is handled after configuring a custom image component. Optimized local images use `<Image />`, while unoptimized remote images use `<img>`.

```markdoc
<!-- Optimized by <Image /> -->
![A picture of a cat](/cat.jpg)


<!-- Unoptimized <img> -->
![A picture of a dog](https://example.com/dog.jpg)
```

--------------------------------

### Add Vercel Adapter with pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/vercel

Use this command to automatically install the Vercel adapter and update your Astro configuration.

```bash
pnpm astro add vercel
```

--------------------------------

### Configure environment variables

Source: https://docs.astro.build/en/guides/cms/kontent-ai

Define your Kontent.ai credentials in a .env file located in the project root.

```text
KONTENT_ENVIRONMENT_ID=YOUR_ENVIRONMENT_ID
KONTENT_PREVIEW_API_KEY=YOUR_PREVIEW_API_KEY
```

--------------------------------

### Configure Playwright Web Server

Source: https://docs.astro.build/en/guides/testing

Use this configuration to have Playwright start your development server during tests. Ensure the `command` matches your project's build and preview script.

```typescript
import { defineConfig } from '@playwright/test';


export default defineConfig({
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321/',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4321/',
  },
});
```

--------------------------------

### Define getStaticPaths for Contentful entries

Source: https://docs.astro.build/en/guides/cms/contentful

Initial setup for fetching Contentful entries within the getStaticPaths function.

```typescript
---
import { contentfulClient } from "../../lib/contentful";
import type { BlogPost } from "../../lib/contentful";


export async function getStaticPaths() {
  const entries = await contentfulClient.getEntries<BlogPost>({
    content_type: "blogPost",
  });
}
---
```

--------------------------------

### Initialize NightwatchJS with pnpm

Source: https://docs.astro.build/en/guides/testing

Initialize NightwatchJS within your Astro project using pnpm.

```bash
pnpm create nightwatch
```

--------------------------------

### Add Partytown Integration with npm

Source: https://docs.astro.build/en/guides/integrations-guide/partytown

Use the `astro add` command with npm to automatically install the Partytown integration.

```bash
npx astro add partytown
```

--------------------------------

### Initialize Firebase Hosting with pnpm

Source: https://docs.astro.build/en/guides/deploy/firebase

Initialize Firebase Hosting in your project using pnpm. This command creates essential configuration files like `firebase.json` and `.firebaserc`.

```bash
pnpm exec firebase init hosting
```

--------------------------------

### Install Astro v3.x with pnpm

Source: https://docs.astro.build/en/guides/upgrade-to/v3

Use this command to update Astro to the latest v3.x version using pnpm. Ensure integrations are also updated.

```bash
# Upgrade to Astro v3.x
pnpm add astro@latest


# Example: upgrade React and Tailwind integrations
pnpm add @astrojs/react@latest @astrojs/tailwind@latest
```

--------------------------------

### Manually upgrade Astro with React and Partytown integrations using npm

Source: https://docs.astro.build/en/upgrade-astro

Manually install the latest versions of Astro, React, and Partytown integrations using npm.

```bash
npm install astro@latest @astrojs/react@latest @astrojs/partytown@latest
```

--------------------------------

### Configure server.open to open a specific path

Source: https://docs.astro.build/en/reference/configuration-reference

Control whether the dev server opens in the browser on startup. Provide a pathname to specify the URL to open.

```javascript
{
  server: { open: "/about" }
}
```

--------------------------------

### Add Astro Sitemap Integration using Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

Use the 'astro add' command with Yarn to install and set up the sitemap integration.

```bash
yarn astro add sitemap
```

--------------------------------

### Initialize Tailwind CSS Configuration (yarn)

Source: https://docs.astro.build/en/guides/styling

Generate a basic `tailwind.config.mjs` file using yarn dlx for Tailwind 3.

```bash
yarn dlx tailwindcss init
```

--------------------------------

### Add Netlify Adapter using Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/netlify

Use the `astro add` command with Yarn to automatically install the Netlify adapter and configure your Astro project.

```bash
yarn astro add netlify
```

--------------------------------

### Define local font sources

Source: https://docs.astro.build/en/reference/font-provider-reference

Examples of specifying font sources using relative paths, URLs, or package imports.

```javascript
src: ["./src/assets/fonts/MyFont.woff2", "./src/assets/fonts/MyFont.woff"]
```

```javascript
src: [new URL("./custom.ttf", import.meta.url)]
```

```javascript
src: ["my-package/SomeFont.ttf"]
```

```javascript
src: [{ url:"./src/assets/fonts/MyFont.woff2", tech: "color-COLRv1" }]
```

--------------------------------

### astro:before-preparation

Source: https://docs.astro.build/en/guides/view-transitions

Fires at the start of the preparation phase after navigation begins but before content is loaded. Useful for showing loading spinners or altering the navigation direction.

```APIDOC
## astro:before-preparation

### Description
Fires at the beginning of the preparation phase, after navigation has started but before content is loaded.

### Usage
- Use to trigger loading indicators.
- Override `event.loader` to perform asynchronous tasks before content swap.
- Modify `event.direction` for custom animations.

### Request Example
```javascript
document.addEventListener("astro:before-preparation", (event) => {
  const originalLoader = event.loader;
  event.loader = async function () {
    const { startSpinner } = await import("./spinner.js");
    const stop = startSpinner();
    await originalLoader();
    stop();
  };
});
```
```

--------------------------------

### Add @astrojs/solid-js Integration (pnpm)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Use the Astro CLI with pnpm to add the SolidJS integration to your project. This command automates the setup process.

```bash
pnpm astro add solid
```

--------------------------------

### Server-Side Communication

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

Within an integration, use the `toolbar` object in the `astro:server:setup` hook to send and receive messages to and from your apps.

```APIDOC
## Server-Side Communication

### Description
In an integration, use the `astro:server:setup` hook to access the `toolbar` object to send and receive messages to and from your apps.

### Method
`toolbar.send(event: string, payload: T) => void`

### Description
Sends data to the client.

### Method
`toolbar.on(event: string, callback: (data: T) => void) => void`

### Description
Registers a callback to be called when the client sends a message with the specified event.

### Method
`toolbar.onAppInitialized(appId: string, callback: () => void) => void`

### Description
Registers a callback to be called when the app is initialized. Use this to ensure the app is fully initialized before sending messages to it.

### Method
`toolbar.onAppToggled(appId: string, callback: (options: {state: boolean}) => void) => void`

### Description
Registers a callback to be called when the user clicks on the app icon in the UI to toggle the app on or off.

### Request Example (send)
```javascript
'astro:server:setup': ({ toolbar }) => {
  toolbar.send('server-message', { message: 'Hello!' });
},
```

### Request Example (on)
```javascript
'astro:server:setup': ({ toolbar }) => {
  toolbar.on('my-app:my-message', (data) => {
    console.log(data.message);
  });
},
```

### Request Example (onAppInitialized)
```javascript
'astro:server:setup': ({ toolbar }) => {
  toolbar.onAppInitialized('my-app', () => {
    console.log('The app is now initialized!');
  });
},
```

### Request Example (onAppToggled)
```javascript
'astro:server:setup': ({ toolbar }) => {
  toolbar.onAppToggled('my-app', ({ state }) => {
    console.log(`The app is now ${state ? 'enabled' : 'disabled'}!`);
  });
},
```
```

--------------------------------

### Replace Build Time Configuration Args

Source: https://docs.astro.build/en/guides/upgrade-to/v6

Use virtual modules to handle build-time configuration instead of passing args to createExports.

```javascript

export function createExports(manifest, { assets }) {
  // ...
}
import { assets } from 'virtual:@example/my-adapter:config';

```

--------------------------------

### Install Cloudflare Adapter Manually with Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Manually add the `@astrojs/cloudflare` adapter to your project's dependencies using Yarn.

```bash
yarn add @astrojs/cloudflare
```

--------------------------------

### Build Docker Image for Astro Site

Source: https://docs.astro.build/en/recipes/docker

Run this command in your project's root directory to build a Docker image for your Astro site. Replace `<your-astro-image-name>` with a desired name for the image.

```bash
docker build -t <your-astro-image-name> .
```

--------------------------------

### Register Custom Client Directive

Source: https://docs.astro.build/en/reference/integrations-reference

Example of registering a custom client directive named 'click' using `addClientDirective`. The entrypoint should be kept small for performance.

```javascript
import { defineConfig } from 'astro/config';
import clickDirective from './astro-click-directive/register.js'


// https://astro.build/config
export default defineConfig({
  integrations: [
    clickDirective()
  ],
});

```

```javascript
/**
 * @type {() => import('astro').AstroIntegration}
 */
export default () => ({
  name: "client:click",
  hooks: {
    "astro:config:setup": ({ addClientDirective }) => {
      addClientDirective({
        name: "click",
        entrypoint: "./astro-click-directive/click.js",
      });
    },
  },
});

```

--------------------------------

### Configure local font family

Source: https://docs.astro.build/en/reference/font-provider-reference

Full configuration example for a local font family within the Astro config file.

```javascript
import { defineConfig, fontProviders } from "astro/config";


export default defineConfig({
  fonts: [{
    provider: fontProviders.local(),
    name: "Custom",
    cssVariable: "--font-custom",
    options: {
      variants: [
        {
          weight: 400,
          style: "normal",
          src: ["./src/assets/fonts/custom-400.woff2"],
          display: "block"
        }
      ]
    }
  }]
});
```

--------------------------------

### RouteData.segments Example

Source: https://docs.astro.build/en/reference/integrations-reference

Illustrates the structure of route segments for a dynamic route like `[blog]/[...slug].astro`. Each segment object contains its content, whether it's dynamic, and if it uses spread syntax.

```javascript
[
  [ { content: 'pages', dynamic: false, spread: false } ],
  [ { content: 'blog', dynamic: true, spread: false } ],
  [ { content: '...slug', dynamic: true, spread: true } ]
]
```

--------------------------------

### Display blog posts in Astro component

Source: https://docs.astro.build/en/guides/cms/cosmic

Import the `getAllPosts` function into an Astro component to fetch blog post data and render it using a `Card` component. This example maps over the fetched posts to create a list of blog post summaries.

```astro
---
import Card from '../components/Card.astro'
import { getAllPosts } from '../lib/cosmic'


const data = await getAllPosts()
---


<section>
  <ul class="grid gap-8 md:grid-cols-2">
    {
      data.map((post) => (
        <Card
          title={post.title}
          href={post.slug}
          body={post.metadata.excerpt}
          tags={post.metadata.tags.map((tag) => tag)}
        />
      ))
    }
  </ul>
</section>
```

--------------------------------

### Run Astro site preview with Bun

Source: https://docs.astro.build/en/recipes/bun

Preview the production build of your Astro site locally. This command is typically run after `bun run build`.

```bash
bun run preview
```

--------------------------------

### Add Vercel Adapter with Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/vercel

Use this command to automatically install the Vercel adapter and update your Astro configuration.

```bash
yarn astro add vercel
```

--------------------------------

### Generate Prisma Migration

Source: https://docs.astro.build/en/guides/backend/prisma-postgres

Creates database tables and generates the Prisma Client. Also creates a `prisma/migrations/` directory.

```bash
npx prisma migrate dev --name init
```

--------------------------------

### Install Astro v3.x with Yarn

Source: https://docs.astro.build/en/guides/upgrade-to/v3

Use this command to update Astro to the latest v3.x version using Yarn. Ensure integrations are also updated.

```bash
# Upgrade to Astro v3.x
yarn add astro@latest


# Example: upgrade React and Tailwind integrations
yarn add @astrojs/react@latest @astrojs/tailwind@latest
```

--------------------------------

### Add Partytown Integration with pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/partytown

Use the `astro add` command with pnpm to automatically install the Partytown integration.

```bash
pnpm astro add partytown
```

--------------------------------

### Configure Development Image Service with Sharp

Source: https://docs.astro.build/en/guides/integrations-guide/vercel

Set `devImageService` to 'sharp' to use the Sharp image service in development when `imageService` is enabled. This is useful if Sharp's dependencies cannot be installed locally. Build output remains unaffected.

```javascript
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';


export default defineConfig({
  // ...
  adapter: vercel({
    imageService: true,
    devImageService: 'sharp',
  }),
});
```

--------------------------------

### Setup Event Listeners with astro:page-load

Source: https://docs.astro.build/en/guides/view-transitions

Use the `astro:page-load` event on the `document` to set up event listeners or run code after every page navigation, ensuring they persist.

```javascript
<script>
  document.addEventListener("astro:page-load", () => {
    // This runs on first page load and after every navigation.
    setupStuff(); // e.g. add event listeners
  });
</script>
```

--------------------------------

### Initializing FetchState in src/app.ts

Source: https://docs.astro.build/en/reference/experimental-flags/advanced-routing

Create a `FetchState` object at the start of your `fetch` method in `src/app.ts` to track per-request data.

```typescript
import { FetchState } from 'astro/fetch';


const state = new FetchState(request);

```

--------------------------------

### Registry Font Provider with Family Options

Source: https://docs.astro.build/en/reference/font-provider-reference

This example shows a font provider that supports specific options for font families.

```APIDOC
## `registryFontProvider(): FontProvider<FamilyOptions | undefined>`

### Description
Implements a font provider that supports options for font families.

### Method
`registryFontProvider(): FontProvider<FamilyOptions | undefined>`

### Parameters
#### Request Body
- **options** (FamilyOptions | undefined) - Optional - Options for the font family.
  - **minimal** (boolean) - Optional - If true, uses a minimal font set.

### Request Example
```json
{
  "example": "{\"minimal\": true}"
}
```

### Response
#### Success Response (200)
- **fonts** (string[]) - An array of available font names.

#### Response Example
```json
{
  "example": "response body"
}
```
```

--------------------------------

### Manually upgrade Astro with React and Partytown integrations using pnpm

Source: https://docs.astro.build/en/upgrade-astro

Manually install the latest versions of Astro, React, and Partytown integrations using pnpm.

```bash
pnpm add astro@latest @astrojs/react@latest @astrojs/partytown@latest
```

--------------------------------

### Accessing Markdown properties via Astro.props

Source: https://docs.astro.build/en/guides/markdown-content

Example structure of the props object available when importing Markdown files.

```javascript
Astro.props = {
  file: "/home/user/projects/.../file.md",
  url: "/en/guides/markdown-content/",
  frontmatter: {
    /** Frontmatter from a blog post */
    title: "Astro 0.18 Release",
    date: "Tuesday, July 27 2021",
    author: "Matthew Phillips",
    description: "Astro 0.18 is our biggest release since Astro launch.",
  },
  getHeadings: () => [
    {"depth": 1, "text": "Astro 0.18 Release", "slug": "astro-018-release"},
    {"depth": 2, "text": "Responsive partial hydration", "slug": "responsive-partial-hydration"}
    /* ... */
  ],
  rawContent: () => "# Astro 0.18 Release\nA little over a month ago, the first public beta [...]",
  compiledContent: () => "<h1>Astro 0.18 Release</h1>\n<p>A little over a month ago, the first public beta [...]</p>",
}
```

--------------------------------

### Define Dev Toolbar App with URL Entrypoint

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

When using the `addDevToolbarApp` function, the `entrypoint` property can also accept a `URL` object, as shown in this example.

```javascript
/**
 * @type {() => import('astro').AstroIntegration}
 */
export default () => ({
  name: "my-integration",
  hooks: {
    "astro:config:setup": ({ addDevToolbarApp }) => {
      addDevToolbarApp({
        id: "my-app",
        name: "My App",
        icon: "<svg>...</svg>",
        entrypoint: new URL("./my-app.js", import.meta.url),
      });
    },
  },
});
```

--------------------------------

### Define the Astro integration for the toolbar app

Source: https://docs.astro.build/en/recipes/making-toolbar-apps

Implement the integration using the astro:config:setup hook to register the toolbar app entrypoint.

```typescript
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';


export default {
  name: 'my-astro-integration',
  hooks: {
    'astro:config:setup': ({ addDevToolbarApp }) => {
      addDevToolbarApp({
        id: "my-toolbar-app",
        name: "My Toolbar App",
        icon: "🚀",
        entrypoint: fileURLToPath(new URL('./app.ts', import.meta.url))
      });
    },
  },
} satisfies AstroIntegration;
```

--------------------------------

### Add @astrojs/mdx Integration

Source: https://docs.astro.build/en/guides/integrations-guide/mdx

Use the astro add command to automatically set up the MDX integration. Alternatively, use manual installation steps.

```bash
npx astro add mdx
```

```bash
pnpm astro add mdx
```

```bash
yarn astro add mdx
```

--------------------------------

### Using an Astro Layout

Source: https://docs.astro.build/en/basics/layouts

Example of how to use a custom Astro layout component ('MySiteLayout') to wrap page content, passing a 'title' prop to the layout.

```astro
---
import MySiteLayout from '../layouts/MySiteLayout.astro';
---
<MySiteLayout title="Home Page">
  <p>My page content, wrapped in a layout!</p>
</MySiteLayout>

```

--------------------------------

### Payload CMS API Response Example

Source: https://docs.astro.build/en/guides/cms/payload

Example JSON response from the Payload CMS API for a 'posts' collection, showing nested document structure and metadata.

```json
{
  "docs":[
      {
        "id":"64098b16483b0f06a7e20ed4",
        "title":"Astro & PayloadCMS Title 🚀",
        "content":"Astro & PayloadCMS Content",
        "slug":"astro-payloadcms-slug",
        "createdAt":"2023-03-09T07:30:30.837Z",
        "updatedAt":"2023-03-09T07:30:30.837Z"
      }
  ],
  "totalDocs":1,
  "limit":10,
  "totalPages":1,
  "page":1,
  "pagingCounter":1,
  "hasPrevPage":false,
  "hasNextPage":false,
  "prevPage":null,
  "nextPage":null
}
```

--------------------------------

### Replace import.meta.glob() with getCollection()

Source: https://docs.astro.build/en/tutorial/6-islands/4

Fetch content from the 'blog' collection using getCollection('blog') instead of import.meta.glob(). This provides a more structured way to access content.

```astro
---
import { getCollection } from "astro:content";
import BaseLayout from "../layouts/BaseLayout.astro";
import BlogPost from "../components/BlogPost.astro";


const pageTitle = "My Astro Learning Blog";
const allPosts = Object.values(import.meta.glob("../pages/posts/*.md", { eager: true }));
const allPosts = await getCollection("blog");
---

```

--------------------------------

### Define Content Collection with Glob Loader

Source: https://docs.astro.build/en/guides/upgrade-to/v6

Use `defineCollection` and the `glob` loader to define content collections. Ensure your schema is defined using zod. This example shows how to configure a blog collection.

```javascript
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';


const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});
```

--------------------------------

### Markdoc Partial for Reusable Content

Source: https://docs.astro.build/en/guides/integrations-guide/markdoc

Example of a Markdoc partial file containing reusable content, such as social links for a footer.

```markdoc
Social links: 


- [Twitter / X](https://twitter.com/astrodotbuild)
- [Discord](https://astro.build/chat)
- [GitHub](https://github.com/withastro/astro)
```

--------------------------------

### Add Astro integrations using Bun

Source: https://docs.astro.build/en/recipes/bun

Use the `astro add` command with Bun to install official Astro integrations, such as React. This command simplifies the process of adding framework support.

```bash
bun astro add react
```

--------------------------------

### Initialize database configuration

Source: https://docs.astro.build/en/guides/astro-db

The default structure for the db/config.ts file.

```typescript
import { defineDb } from 'astro:db';


export default defineDb({
  tables: { },
})
```

--------------------------------

### Index Page with Navigation and Footer

Source: https://docs.astro.build/en/tutorial/3-components/2

An example of an Astro index page that imports and uses `Navigation.astro` and `Footer.astro` components, along with global CSS.

```astro
---
import Navigation from '../components/Navigation.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';


const pageTitle = 'Home Page';
---


<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{pageTitle}</title>
  </head>
  <body>
    <Navigation />
    <h1>{pageTitle}</h1>
    <Footer />
  </body>
</html>

```

--------------------------------

### Define an Astro Layout Component

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby

Example of a standard Astro layout file using the <slot /> element to inject page content.

```astro
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <title>Astro</title>
  </head>
  <body>
    <!-- Wrap the slot element with your existing layout templating -->
    <slot />
  </body>
</html>
```

--------------------------------

### Importing Components with Namespace Imports

Source: https://docs.astro.build/en/guides/integrations

Shows how to import all components from a package using a namespace import and then access them.

```astro
---
import * as Example from 'example-astro-component';
---
<Example.MyAstroComponent />
<Example.MyReactComponent />
```

--------------------------------

### Handle dynamic API routes with GET

Source: https://docs.astro.build/en/guides/endpoints

Access dynamic parameters and return a JSON Response object based on database lookups.

```javascript
import { getProduct } from "../db";


export async function GET({ params }) {
  const id = params.id;
  const product = await getProduct(id);


  if (!product) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }


  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
```

--------------------------------

### Configure environment variables

Source: https://docs.astro.build/en/guides/cms/kontent-ai

Define your Kontent.ai environment and API keys in a .env file.

```text
KONTENT_ENVIRONMENT_ID=YOUR_ENVIRONMENT_ID
KONTENT_PREVIEW_API_KEY=YOUR_PREVIEW_API_KEY
KONTENT_MANAGEMENT_API_KEY=YOUR_MANAGEMENT_API_KEY
```

--------------------------------

### Display Dynamic Page Titles

Source: https://docs.astro.build/en/tutorial/4-layouts/1

Examples of rendering page titles using static HTML, frontmatter variables, or layout component props.

```astro
<h1>Home Page</h1>
```

```astro
<h1>{pageTitle}</h1>
```

```astro
<BaseLayout title="Home Page" />
```

```astro
<BaseLayout title={pageTitle} />
```

--------------------------------

### Initialize Drupal API Fetching Utilities

Source: https://docs.astro.build/en/guides/cms/drupal

Set up the `drupal.ts` file to import necessary libraries like `Jsona` and `DrupalJsonApiParams`. It also retrieves the Drupal base URL from environment variables.

```typescript
import {Jsona} from "jsona";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import type {DrupalNode} from "../types.ts";
import type {TJsonApiBody} from "jsona/lib/JsonaTypes";


// Get the Drupal Base Url.
export const baseUrl: string = import.meta.env.DRUPAL_BASE_URL;
```

--------------------------------

### Log Warning for Experimental Sharp Image Service

Source: https://docs.astro.build/en/reference/adapter-reference

Example log messages indicating experimental support for the Sharp image service and potential incompatibility.

```text
[@example/my-adapter] The feature is experimental and subject to issues or changes.
```

```text
[@example/my-adapter] The currently selected adapter `@example/my-adapter` is not compatible with the service "Sharp". Your project will NOT be able to build.
```

--------------------------------

### Migrate Next.js `_document.jsx` to Astro Layout

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs

This example shows a Next.js `_document.jsx` file and its conversion to a simplified Astro layout. The Astro version replaces React components with standard HTML and uses a `<slot />` for content.

```jsx
import Document, { Html, Head, Main, NextScript } from "next/document";


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

```astro
<html lang="en">
  <head>
      <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <slot/>
  </body>
</html>
```

--------------------------------

### Prism Component for Syntax Highlighting

Source: https://docs.astro.build/en/guides/syntax-highlighting

The Prism component provides language-specific syntax highlighting using Prism.js. Requires installation of `@astrojs/prism`.

```APIDOC
## Prism Component

This component provides language-specific syntax highlighting for code blocks by applying Prism’s CSS classes. Note that you must provide a Prism CSS stylesheet (or bring your own) to style the classes.

### Installation

```bash
# npm
npm install @astrojs/prism

# pnpm
pnpm add @astrojs/prism

# Yarn
yarn add @astrojs/prism
```

### Usage

```astro
---
import { Prism } from '@astrojs/prism';
---

<Prism lang="js" code={`const foo = 'bar';`} />
```

### Supported Languages

In addition to the list of languages supported by Prism, you can also use `lang="astro"` to display Astro code blocks.

### Adding a Prism Stylesheet

If you opt to use Prism, Astro will apply Prism’s CSS classes instead of Shiki’s. You will need to provide your own CSS stylesheet for syntax highlighting to appear.

1. Choose a premade stylesheet from the available [Prism Themes](https://prismjs.com/themes/).
2. Add this stylesheet to your project’s `public/` directory.
3. Load this into your page’s `<head>` in a layout component via a `<link>` tag.
```

--------------------------------

### baseService

Source: https://docs.astro.build/en/reference/modules/astro-assets

The built-in local image service, which can be extended to create custom image services. It provides methods for getting URLs, parsing URLs, and getting HTML attributes.

```APIDOC
## baseService

**Type:** `Omit<LocalImageService, ‘transform’>`

The built-in local image service which can be extended to create a custom image service.
The following example reuses the `baseService` to create a new image service:
```javascript
import { baseService } from "astro/assets";


const newImageService = {
 getURL: baseService.getURL,
 parseURL: baseService.parseURL,
 getHTMLAttributes: baseService.getHTMLAttributes,
 async transform(inputBuffer, transformOptions) {...}
}
```
```

--------------------------------

### Gatsby GraphQL Query Example

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby

This is an example of a GraphQL query used in Gatsby to fetch markdown remark data. It is shown for comparison with Astro's data fetching methods.

```graphql
export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
```

--------------------------------

### Create Astro Adapter with Server Entrypoint

Source: https://docs.astro.build/en/reference/adapter-reference

Defines a custom Astro adapter with a server entrypoint and stable support for static output. Use this to create a new adapter integration.

```javascript
export default function createIntegration() {
  return {
    name: '@example/my-adapter',
    hooks: {
      'astro:config:done': ({ setAdapter }) => {
        setAdapter({
          name: '@example/my-adapter',
          entrypointResolution: 'auto',
          serverEntrypoint: '@example/my-adapter/server.js',
          supportedAstroFeatures: {
            staticOutput: 'stable'
          }
        });
      },
    },
  };
}
```

--------------------------------

### Add @astrojs/react Integration

Source: https://docs.astro.build/en/guides/integrations-guide/react

Use the `astro add` command to automatically set up the @astrojs/react integration. This command handles the necessary package installations and configuration steps.

```bash
npx astro add react
```

```bash
pnpm astro add react
```

```bash
yarn astro add react
```

--------------------------------

### Manually upgrade Astro with React and Partytown integrations using yarn

Source: https://docs.astro.build/en/upgrade-astro

Manually install the latest versions of Astro, React, and Partytown integrations using Yarn.

```bash
yarn add astro@latest @astrojs/react@latest @astrojs/partytown@latest
```

--------------------------------

### GET Request with Dynamic Parameters and Response Handling

Source: https://docs.astro.build/en/guides/endpoints

Handles GET requests for dynamic routes, accessing parameters, fetching data, and returning a JSON response or a 404 error.

```APIDOC
## GET /products/:id

### Description
Handles GET requests for dynamic routes, accessing parameters, fetching data, and returning a JSON response or a 404 error.

### Method
GET

### Endpoint
/products/:id

### Parameters
#### Path Parameters
- **id** (string) - Required - The ID of the product to retrieve.

### Request Body
None

### Response
#### Success Response (200)
- **product** (object) - The product details if found.

#### Error Response (404)
- **null** - Returned if the product is not found.

### Request Example
None

### Response Example
```json
{
  "id": "123",
  "name": "Example Product",
  "price": 19.99
}
```
```

--------------------------------

### Fetch Posts using Statamic GraphQL API in Astro

Source: https://docs.astro.build/en/guides/cms/statamic

This example demonstrates fetching posts from Statamic's GraphQL API and rendering them in Astro. It requires the GraphQL API to be enabled in Statamic and includes a sample GraphQL query.

```javascript
--- 
const graphqlQuery = {
  query: "\n    query Entries($page: Int, $locale: String) {\n      entries(\n        collection: \"posts\"
        sort: \"date asc\"
        limit: 20
        page: $page
        filter: { locale: $locale }\n      ) {\n        current_page
        has_more_pages
        data {
          title
          ... on Entry_Posts_Post {
              content
            }
        }
      }
    }
  ",
  variables: {
    page: page,
    locale: locale,
  },
};


const res = await fetch("https://[YOUR-SITE]/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(graphqlQuery),
})


const { data } = await res.json();
const entries = data?.entries;
--- 
<h1>Astro + Statamic 🚀</h1>
{
  entries.data.map((post) => (
      <h2 set:html={post.title} />
      <p set:html={post.content} />
  ))
}
```

--------------------------------

### Fetch blog posts in Astro frontmatter

Source: https://docs.astro.build/en/guides/cms/kontent-ai

Use the delivery client to retrieve blog post items. The first example uses typed models, while the second uses an untyped approach.

```astro
---
import { deliveryClient } from '../lib/kontent';
import type { BlogPost } from '../models';
import { contentTypes } from '../models/project/contentTypes';


const blogPosts = await deliveryClient
    .items<BlogPost>
    .type(contentTypes.blog_post.codename)
    .toPromise()
---
```

```javascript
const blogPosts = await deliveryClient
    .items()
    .type("blogPost")
    .toPromise()
```

--------------------------------

### Rewrite to a parent path using URL

Source: https://docs.astro.build/en/reference/api-reference

Construct a URL object to specify the path for the rewrite. This example rewrites to the parent directory ('../').

```javascript
return Astro.rewrite(new URL("../", Astro.url))
```

```typescript
import type { APIContext } from 'astro';


export function GET({ rewrite }: APIContext) {
  return rewrite(new URL("../", Astro.url));
}
```

--------------------------------

### Register blog modules in app.js

Source: https://docs.astro.build/en/guides/cms/apostrophecms

Add the newly created modules to your project configuration.

```javascript
require('apostrophe')({
  // other configuration options
  modules: {
    // other project modules
    blog: {},
    'blog-page': {}
  }
});
```

--------------------------------

### Generate Static Paths

Source: https://docs.astro.build/en/guides/cms/flotiq

Implement getStaticPaths to fetch all blog post routes for static site generation.

```astro
---
import type { Blogpost } from "flotiq-api-ts";
import { flotiq } from "../../lib/flotiq";


export async function getStaticPaths() {
  const posts = await flotiq.BlogpostAPI.list();
  return posts.data?.map((post) => ({
    params: { slug: post.slug },
    props: post
  })) || []
}
---
```

--------------------------------

### Add @astrojs/solid-js Integration (Yarn)

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Use the Astro CLI with Yarn to add the SolidJS integration to your project. This command automates the setup process.

```bash
yarn astro add solid
```

--------------------------------

### Build toolbar apps with Preact

Source: https://docs.astro.build/en/recipes/making-toolbar-apps

Integrate UI frameworks like Preact to render components into the canvas. These examples demonstrate rendering without a build step.

```typescript
import { defineToolbarApp } from "astro/toolbar";
import { render, h } from "preact";


const motivationalMessages = [
  "You're doing great!",
  "Keep up the good work!",
  "You're awesome!",
  "You're a star!",
];


export default defineToolbarApp({
    init(canvas) {
      const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      render(h('h1', null, message), canvas);
    },
});
```

```typescript
import { defineToolbarApp } from "astro/toolbar";
import { render } from "preact";
import { html } from 'htm/preact';


const motivationalMessages = [
  "You're doing great!",
  "Keep up the good work!",
  "You're awesome!",
  "You're a star!",
];


export default defineToolbarApp({
    init(canvas) {
      const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      render(html`<h1>${message}</h1>`, canvas);
    },
});
```

--------------------------------

### Initialize Tailwind CSS Configuration (pnpm)

Source: https://docs.astro.build/en/guides/styling

Generate a basic `tailwind.config.mjs` file using pnpm dlx for Tailwind 3.

```bash
pnpm dlx tailwindcss init
```

--------------------------------

### Configure Output File Format

Source: https://docs.astro.build/en/reference/configuration-reference

Set `build.format` to 'file' to generate HTML files directly (e.g., `page.html`) instead of using directory structures (e.g., `page/index.html`). This affects `Astro.url` during build.

```javascript
{
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  }
}
```

--------------------------------

### Update Vite Configuration in Astro Build Setup

Source: https://docs.astro.build/en/reference/integrations-reference

Use the `updateConfig` callback in the `astro:build:setup` hook to merge new Vite configurations, such as adding plugins, into the build process.

```javascript
import awesomeCssPlugin from 'awesome-css-vite-plugin';


export default {
  name: 'my-integration',
  hooks: {
    'astro:build:setup': ({ updateConfig }) => {
      updateConfig({
        plugins: [awesomeCssPlugin()],
      })
    }
  }
}
```

--------------------------------

### Configure Warp AI MCP Server

Source: https://docs.astro.build/en/guides/build-with-ai

Add the Astro Docs MCP server to Warp's AI settings. Optionally enable it to start on launch.

```json
{
  "mcpServers": {
    "Astro docs": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.docs.astro.build/mcp"],
      "env": {},
      "working_directory": null,
      "start_on_launch": true
    }
  }
}
```

--------------------------------

### Display Astro CLI Help with npm

Source: https://docs.astro.build/en/reference/cli-reference

Run this command to see all available Astro CLI commands and global flags. Requires npm.

```bash
npx astro --help

```

--------------------------------

### Basic Mux Player Integration

Source: https://docs.astro.build/en/guides/media/mux

Import and use the MuxPlayer Astro component with a playback ID and metadata for video title. Ensure you have @mux/mux-player-astro installed.

```astro
--- 
import { MuxPlayer } from "@mux/mux-player-astro";
---
<MuxPlayer
  playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  metadata={{ video_title: 'My Astro Video' }}
/>
```

--------------------------------

### Create Astro Project CLI Commands

Source: https://docs.astro.build/en/guides/upgrade-to/v5

Commands for initializing new Astro projects. Note that the --typescript flag is no longer supported in v5.0.

```bash
npm create astro@latest -- --template <example-name> --typescript strict
npm create astro@latest -- --template <example-name>
```

```bash
pnpm create astro@latest --template <example-name> --typescript strict
pnpm create astro@latest --template <example-name>
```

```bash
yarn create astro --template <example-name> --typescript strict
yarn create astro --template <example-name>
```

--------------------------------

### Scaffold Astro Project with Juno using npm

Source: https://docs.astro.build/en/guides/deploy/juno

Creates a new Astro project pre-configured with Juno using npm. This command scaffolds a website with a ready-made Astro template.

```bash
npm create juno@latest -- --template astro-starter
```

--------------------------------

### Configure Middleware Mode to 'edge'

Source: https://docs.astro.build/en/reference/adapter-reference

Set `middlewareMode` to 'edge' to allow middleware code to be deployed independently from the server bundle, for example, as an edge function. This example configures the adapter in `astro:config:done`.

```javascript
export default function createIntegration() {
  return {
    name: '@example/my-adapter',
    hooks: {
      'astro:config:done': ({ setAdapter }) => {
        setAdapter({
          name: '@example/my-adapter',
          entrypointResolution: 'auto',
          serverEntrypoint: '@example/my-adapter/server.js',
          adapterFeatures: {
            middlewareMode: 'edge'
          }
        });
      },
    },
  };
}
```

--------------------------------

### Use Navigation Component

Source: https://docs.astro.build/en/tutorial/3-components/1

Replacing static HTML links with the imported Navigation component.

```astro
<a href="/">Home</a>
<a href="/about/">About</a>
<a href="/blog/">Blog</a>
<Navigation />
```

--------------------------------

### Update HTTP request methods to uppercase

Source: https://docs.astro.build/en/guides/upgrade-to/v3

Rename lowercase HTTP request method function names (e.g., `get`, `post`, `del`) to their uppercase equivalents (e.g., `GET`, `POST`, `DELETE`) in Astro v3.0.

```javascript
export function GET() {
    return new Response(JSON.stringify({ "title": "Bob's blog" }));
}
```

--------------------------------

### Configure Renderers for UI Frameworks

Source: https://docs.astro.build/en/reference/container-reference

When rendering components that use UI frameworks (React, Vue, etc.) or MDX, provide the necessary renderers. This example shows how to load renderers for React and Svelte components using `loadRenderers` and then create a container with them.

```typescript
import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";
import { getContainerRenderer as svelteContainerRenderer } from "@astrojs/svelte";
import { loadRenderers } from "astro:container";


const renderers = await loadRenderers([reactContainerRenderer(), svelteContainerRenderer()]);
const container = await experimental_AstroContainer.create({
    renderers
})
const result = await container.renderToString(ReactWrapper);
```

--------------------------------

### Update App Initialization

Source: https://docs.astro.build/en/guides/upgrade-to/v6

Replace legacy loadManifest and NodeApp instantiation with the modern createApp function.

```javascript

import { loadManifest, loadApp, NodeApp } from 'astro/app/node';


const manifest = await loadManifest(new URL(import.meta.url));
const app1 = new NodeApp(loadManifest);
const app2 = await loadApp(new URL(import.meta.url));
import { createApp } from 'astro/app/entrypoint';


const app = createApp();

```

--------------------------------

### Build Astro Site Locally with pnpm

Source: https://docs.astro.build/en/guides/deploy

Build your Astro site locally using pnpm. This command generates the static output for deployment.

```bash
pnpm run build
```

--------------------------------

### Extend baseService to create a new image service

Source: https://docs.astro.build/en/reference/modules/astro-assets

Demonstrates how to create a new image service by extending the built-in `baseService` and overriding the `transform` method.

```javascript
import { baseService } from "astro/assets";


const newImageService = {
 getURL: baseService.getURL,
 parseURL: baseService.parseURL,
 getHTMLAttributes: baseService.getHTMLAttributes,
 async transform(inputBuffer, transformOptions) {...}
}
```

--------------------------------

### Configure Netlify Adapter for Static Sites with Redirects

Source: https://docs.astro.build/en/guides/integrations-guide/netlify

Use the Netlify adapter for static sites (`output: 'static'`) to translate Astro's `redirects` configuration into Netlify's `_redirects` file format for production routing.

```javascript
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';


export default defineConfig({
  // ...
  adapter: netlify(),
  redirects: {
    '/blog/old-post': '/blog/new-post',
  },
});
```

--------------------------------

### Initialize Supabase Client with PKCE Flow

Source: https://docs.astro.build/en/guides/backend/supabase

Configure the Supabase client to use the PKCE (Proof Key for Code Exchange) authentication flow. This is essential for OAuth integrations.

```typescript
import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: "pkce",
    },
  },
);

```

--------------------------------

### state.provide()

Source: https://docs.astro.build/en/reference/experimental-flags/advanced-routing

Registers a context provider under the given key. The provider’s `create()` function is called lazily on the first `state.resolve()`, and its optional `finalize()` callback runs during `state.finalizeAll()`.

```APIDOC
## state.provide()

### Description
Registers a context provider under the given key.

### Method
`state.provide<T>(key: string, provider: ContextProvider<T>) => void`

### Parameters
#### Request Body
- **key** (string) - Required - The key under which to register the provider.
- **provider** (ContextProvider<T>) - Required - An object with `create` and optional `finalize` functions.

### Request Example
```javascript
state.provide('myService', {
  create: () => new MyService(),
  finalize: (service) => service.close(),
});
```
```

--------------------------------

### Configure Cloudinary Instance in Astro

Source: https://docs.astro.build/en/guides/media/cloudinary

Initialize the Cloudinary Node.js SDK with your account credentials. This setup should be placed within an Astro component's script tag for server-side execution.

```javascript
--- 
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});
---

```

--------------------------------

### GitLab CI/CD Configuration for Astro

Source: https://docs.astro.build/en/guides/deploy/gitlab

Create a `.gitlab-ci.yml` file to automate the build and deployment of your Astro site. This configuration uses a Node.js image, installs dependencies, builds the site, and specifies the `public` directory as the artifact for deployment.

```yaml
pages:
  # The Docker image that will be used to build your app
  image: node:lts

  before_script:
    - npm ci

  script:
    # Specify the steps involved to build your app here
    - npm run build

  artifacts:
    paths:
      # The folder that contains the built files to be published.
      # This must be called "public".
      - public

  only:
    # Trigger a new build and deploy only when there is a push to the
    # branch(es) below
    - main
```

--------------------------------

### Get Help for Astro Dev Command with npm

Source: https://docs.astro.build/en/reference/cli-reference

Use this command to view all available flags for the `astro dev` command. The `--` is necessary for npm to pass flags to the Astro command.

```bash
# get a list of all flags for the `dev` command
npm run dev -- --help

```

--------------------------------

### Page implementation using streaming components

Source: https://docs.astro.build/en/recipes/streaming-improve-page-performance

The main page imports the refactored components, allowing the server to stream HTML before data fetches complete.

```astro
---
import RandomName from '../components/RandomName.astro';
import RandomFact from '../components/RandomFact.astro';
---
<html>
  <head>
    <title>A name and a fact</title>
  </head>
  <body>
    <h2>A name</h2>
    <RandomName />
    <h2>A fact</h2>
    <RandomFact />
  </body>
</html>
```

--------------------------------

### Astro `paginate()` URL updates

Source: https://docs.astro.build/en/guides/upgrade-to/v5

Previously, `paginate()` did not include the `base` config value in returned URLs. This example shows the old way of prepending `base` and the new, simplified way.

```javascript
export async function getStaticPaths({ paginate }) {
  const astronautPages = [{
    astronaut: 'Neil Armstrong',
  }, {
    astronaut: 'Buzz Aldrin',
  }, {
    astronaut: 'Sally Ride',
  }, {
    astronaut: 'John Glenn',
  }];
  return paginate(astronautPages, { pageSize: 1 });
}
const { page } = Astro.props;
// `base: /'docs'` configured in `astro.config.mjs`
const prev = "/docs" + page.url.prev;
const prev = page.url.prev;
```

--------------------------------

### Initialize Flotiq SDK

Source: https://docs.astro.build/en/guides/cms/flotiq

Create a configuration file to export the Flotiq API instance.

```typescript
import { FlotiqApi } from "flotiq-api-ts";


export const flotiq = new FlotiqApi(import.meta.env.FLOTIQ_API_KEY);
```

--------------------------------

### Configure Project Workspaces

Source: https://docs.astro.build/en/guides/integrations

Set up your project root's package.json to manage multiple packages using workspaces. This allows for developing components alongside a working copy of Astro.

```json
{
  "name": "my-project",
  "workspaces": ["demo", "packages/*"]
}
```

--------------------------------

### Create a Nano Stores Atom

Source: https://docs.astro.build/en/recipes/sharing-state

Define a shared state atom using `atom()` from nanostores. This example creates a boolean atom to track dialog visibility.

```javascript
import { atom } from 'nanostores';


export const isOpen = atom(false);
```

--------------------------------

### Test knowledge: Markdown frontmatter

Source: https://docs.astro.build/en/tutorial/4-layouts/2

Example of a Markdown file with missing frontmatter fields to be filled in.

```yaml
---
layout: ../../__________/MyMarkdownLayout.astro
title: "Learning About Markdown in Astro"
author: Astro Learner
____: 2022-08-08
---
I learned so much today! Astro allows me to write in Markdown, but also use variables from the frontmatter. I can even access those values in an Astro layout component.
```

```yaml
---
layout: ../../layouts/MyMarkdownLayout.astro
title: "Learning About Markdown in Astro"
author: Astro Learner
pubDate: 2022-08-08
---
I learned so much today! Astro allows me to write in Markdown, but also use variables from the frontmatter. I can even access those values in an Astro layout component.
```

--------------------------------

### Initialize Mux Node SDK

Source: https://docs.astro.build/en/guides/media/mux

Initialize the Mux client using environment variables in an Astro component script.

```astro
---
import Mux from "@mux/mux-node";


const mux = new Mux ({
  tokenId: import.meta.env.MUX_TOKEN_ID,
  tokenSecret: import.meta.env.MUX_TOKEN_SECRET,
})
---
```

--------------------------------

### Generated Sitemap XML

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

Example of a generated sitemap file listing the URLs of pages on your site.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://example.com/</loc>
  </url>
  <url>
    <loc>https://example.com/second-page/</loc>
  </url>
</urlset>
```

--------------------------------

### Initialize Firebase Hosting with Yarn

Source: https://docs.astro.build/en/guides/deploy/firebase

Initialize Firebase Hosting in your project using Yarn. This command creates essential configuration files like `firebase.json` and `.firebaserc`.

```bash
yarn firebase init hosting
```

--------------------------------

### Type frontmatter with TypeScript generics

Source: https://docs.astro.build/en/guides/imports

Example of providing a custom interface for frontmatter when using import.meta.glob().

```astro
---
import type { MarkdownInstance } from 'astro';
interface Frontmatter {
    title: string;
    description?: string;
}


const posts = Object.values(import.meta.glob<MarkdownInstance<Frontmatter>>('./posts/**/*.md', { eager: true }));
---


<ul>
  {posts.map(post => <li>{post.frontmatter.title}</li>)}
</ul>
```

--------------------------------

### Import configuration utilities

Source: https://docs.astro.build/en/reference/modules/astro-config

Access core configuration utilities like defineConfig from the astro/config module.

```javascript

import {
  defineConfig,
  envField,
  fontProviders,
  getViteConfig,
  mergeConfig,
  passthroughImageService,
  sessionDrivers,
  sharpImageService,
  validateConfig,
} from "astro/config";

```

--------------------------------

### Composing Components in Astro

Source: https://docs.astro.build/en/basics/astro-components

Demonstrates how to use one Astro component within another to build reusable UI elements. This example shows a `ButtonGroup` component composed of multiple `Button` components.

```astro
---
import Button from './Button.astro';
---
<div>
  <Button title="Button 1" />
  <Button title="Button 2" />
  <Button title="Button 3" />
</div>

```

--------------------------------

### Process and Format Blog Post Data

Source: https://docs.astro.build/en/guides/cms/contentful

Map over the fetched blog post items to extract and format fields for display. This example reformats the date to a more readable string.

```astro
---
import { contentfulClient } from "../lib/contentful";
import type { BlogPost } from "../lib/contentful";


const entries = await contentfulClient.getEntries<BlogPost>({
  content_type: "blogPost",
});


const posts = entries.items.map((item) => {
  const { title, date, description, slug } = item.fields;
  return {
    title,
    slug,
    description,
    date: new Date(date).toLocaleDateString()
  };
});
---

```

--------------------------------

### Generate Dynamic Pages at Multiple Levels with getStaticPaths

Source: https://docs.astro.build/en/guides/routing

Use a rest parameter (`[...slug]`) with `getStaticPaths()` to generate pages for slugs of varying depths. This example demonstrates creating pages for a root, a single level, and multiple levels.

```javascript
--- 
export function getStaticPaths() {
  const pages = [
    {
      slug: undefined,
      title: "Astro Store",
      text: "Welcome to the Astro store!",
    },
    {
      slug: "products",
      title: "Astro products",
      text: "We have lots of products for you",
    },
    {
      slug: "products/astro-handbook",
      title: "The ultimate Astro handbook",
      text: "If you want to learn Astro, you must read this book.",
    },
  ];


  return pages.map(({ slug, title, text }) => {
    return {
      params: { slug },
      props: { title, text },
    };
  });
}


const { title, text } = Astro.props;
---
<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
    <p>{text}</p>
  </body>
</html>

```

--------------------------------

### astro:after-preparation Event

Source: https://docs.astro.build/en/reference/modules/astro-transitions

Dispatched after the next page in a navigation using the View Transitions router is loaded, but before any content is swapped.

```APIDOC
## astro:after-preparation Event

### Description
An event dispatched after the next page in a navigation using View Transitions router is loaded.

### Attributes
This event has no attributes.
```

--------------------------------

### Vue Form Submission

Source: https://docs.astro.build/en/recipes/build-forms-api

Uses Vue's Composition API with script setup and template directives.

```vue
<script setup lang="ts">
import { ref } from "vue";


const responseMessage = ref<string>();


async function submit(e: Event) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget as HTMLFormElement);
  const response = await fetch("/api/feedback", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  responseMessage.value = data.message;
}
</script>


<template>
  <form @submit="submit">
    <label>
      Name
      <input type="text" id="name" name="name" required />
    </label>
    <label>
      Email
      <input type="email" id="email" name="email" required />
    </label>
    <label>
      Message
      <textarea id="message" name="message" required />
    </label>
    <button>Send</button>
    <p v-if="responseMessage">{{ responseMessage }}</p>
  </form>
</template>
```

--------------------------------

### Initialize Prisma Client in Astro

Source: https://docs.astro.build/en/guides/backend/prisma-postgres

Initializes and exports a Prisma Client instance for use in an Astro project. Requires `DATABASE_URL` in environment variables.

```typescript
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../prisma/generated/client';


const connectionString = import.meta.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });


export default prisma;
```

--------------------------------

### Configure Snipcart Settings

Source: https://docs.astro.build/en/guides/ecommerce

Initialize Snipcart by defining the public API key and load strategy within the window object.

```html
<body></body>
<script>
  window.SnipcartSettings = {
    publicApiKey: "YOUR_API_KEY",
    loadStrategy: "on-user-interaction",
  };


  (function()...); // available from the Snipcart documentation
</script>
```

```html
<script>
  window.SnipcartSettings = {
    publicApiKey: "YOUR_API_KEY",
    loadStrategy: "manual",
    version: "3.7.1",
    addProductBehavior: "none",
    modalStyle: "side",
  };


  (function()...); // available from the Snipcart documentation
</script>
```

--------------------------------

### RenderOptions.prerenderedErrorPageFetch()

Source: https://docs.astro.build/en/reference/modules/astro-app

Allows providing custom implementations for fetching prerendered error pages, overriding the default fetch behavior. This is useful when fetch is unavailable or server calls are restricted. The example shows reading HTML files from disk.

```APIDOC
## RenderOptions.prerenderedErrorPageFetch()

### Description
A function that allows you to provide custom implementations for fetching prerendered error pages. This is used to override the default `fetch()` behavior, for example, when `fetch()` is unavailable or when you cannot call the server from itself.

### Type
`(url: ErrorPagePath) => Promise<Response>`

### Default
`fetch`

### Added in
`astro@5.6.0`

### Request Example
```javascript
return app.render(request, {
  prerenderedErrorPageFetch: async (url: string): Promise<Response> => {
    if (url.includes("/500")) {
      const content = await fs.promises.readFile("500.html", "utf-8");
      return new Response(content, {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }


    const content = await fs.promises.readFile("404.html", "utf-8");
    return new Response(content, {
      status: 404,
      headers: { "Content-Type": "text/html" },
    });
  }
});
```
```

--------------------------------

### Manage loading indicators with preparation events

Source: https://docs.astro.build/en/guides/view-transitions

Toggle a loading element visibility using the before and after preparation lifecycle events.

```html
<script is:inline>
  document.addEventListener("astro:before-preparation", () => {
    document.querySelector("#loading").classList.add("show");
  });
  document.addEventListener("astro:after-preparation", () => {
    document.querySelector("#loading").classList.remove("show");
  });
</script>
```

--------------------------------

### Import SVGO Optimizer Helper

Source: https://docs.astro.build/en/reference/experimental-flags/svg-optimization

Import the svgoOptimizer helper from 'astro/config'. This is a prerequisite for configuring the optimizer.

```javascript
import { svgoOptimizer } from "astro/config"
```

--------------------------------

### Render Content Entries with `render()` Function

Source: https://docs.astro.build/en/guides/upgrade-to/v6

Collection entries no longer have a `.render()` method. Import and use the `render()` function from `astro:content` instead. This example demonstrates rendering a post and accessing its `Content` component and `headings`.

```javascript
---
import { getEntry, render } from 'astro:content';


const post = await getEntry('pages', 'homepage');


const { Content, headings } = await post.render();
const { Content, headings } = await render(post);
---
<Content />
```

--------------------------------

### Register a FontProvider in Astro Config

Source: https://docs.astro.build/en/reference/font-provider-reference

Examples of registering the custom font provider in the Astro configuration file.

```typescript
import { defineConfig } from "astro/config";
import { registryFontProvider } from "./font-provider";


export default defineConfig({
  fonts: [{
    provider: registryFontProvider(),
    name: "Custom",
    cssVariable: "--font-custom"
  }]
});
```

```typescript
import { defineConfig } from "astro/config";
import { registryFontProvider } from "./font-provider";


export default defineConfig({
  fonts: [{
    provider: registryFontProvider({
      token: "..."
    }),
    name: "Custom",
    cssVariable: "--font-custom"
  }]
});
```

```typescript
import { defineConfig } from "astro/config";
import { registryFontProvider } from "./font-provider";


export default defineConfig({
  fonts: [{
    provider: registryFontProvider(),
    options: {
      minimal: true
    },
    name: "Custom",
    cssVariable: "--font-custom"
  }]
});
```

--------------------------------

### Hydrate Interactive Framework Components

Source: https://docs.astro.build/en/guides/framework-components

Use `client:*` directives to control when framework component JavaScript is sent to the browser and when the component hydrates. This example shows `client:load`, `client:visible`, and `client:only`.

```astro
---
// Example: hydrating framework components in the browser.
import InteractiveButton from '../components/InteractiveButton.jsx';
import InteractiveCounter from '../components/InteractiveCounter.jsx';
import InteractiveModal from '../components/InteractiveModal.svelte';
---
<!-- This component's JS will begin importing when the page loads -->
<InteractiveButton client:load />


<!-- This component's JS will not be sent to the client until
the user scrolls down and the component is visible on the page -->
<InteractiveCounter client:visible />


<!-- This component won't render on the server, but will render on the client when the page loads -->
<InteractiveModal client:only="svelte" />

```

--------------------------------

### Implement dynamic route page for blog posts

Source: https://docs.astro.build/en/guides/cms/preprcms

Use a dynamic Astro route file to fetch and render article content based on the URL slug. Requires the Prepr client and the previously defined GraphQL query.

```astro

---
import Layout from '../layouts/Layout.astro';
import {Prepr} from '../lib/prepr.js';
import GetArticleBySlug from '../queries/get-article-by-slug.js';


const { slug } = Astro.params;
const response = await Prepr(GetArticleBySlug, {slug})
const { data } = await response.json()
const article = data.Article
---


<Layout title={article.title}>
  <main>
    <h1>{article.title}</h1>
    {
      article.content.map((content) => (
        <div>
          {
            content.__typename === "Assets" &&
            <img src={content.items[0].url} width="300" height="250"/>
          }
          {
            content.__typename === 'Text' &&
            <div set:html={content.body}></div>
          }
        </div>
      ))
    }
  </main>
</Layout>

```

--------------------------------

### Usage of custom image props

Source: https://docs.astro.build/en/reference/image-service-reference

Example of using a custom prop in an Image component with type checking.

```astro
<Image blur="yes" src={myPhoto}  />
//     ^^^^^^^^^^
//     Type 'string' is not assignable to type 'number | undefined'.
```

--------------------------------

### Scaffold Astro Project with Juno using pnpm

Source: https://docs.astro.build/en/guides/deploy/juno

Creates a new Astro project pre-configured with Juno using pnpm. This command scaffolds a website with a ready-made Astro template.

```bash
pnpm create juno -- --template astro-starter
```

--------------------------------

### Define a JavaScript code block

Source: https://docs.astro.build/en/guides/syntax-highlighting

Example of a Markdown code block using JavaScript syntax highlighting.

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l);
  return true;
};
```

--------------------------------

### Build Astro Site with Verbose Logs using npm

Source: https://docs.astro.build/en/reference/cli-reference

This command builds the Astro site with verbose logging enabled for debugging, using the `build` script from `package.json`. The `--` is required for npm to pass the flag.

```bash
# build your site with verbose logs using the `build` script in `package.json`
npm run build -- --verbose

```

--------------------------------

### Local Image Service Implementation

Source: https://docs.astro.build/en/reference/image-service-reference

Example of creating a custom local image service in Astro. This service defines how images are transformed and URLs are generated for local development and build processes.

```APIDOC
## Local Image Service

### Description
This code defines a custom `LocalImageService` for Astro. It handles image transformations, URL generation, and parsing of image options.

### Method
N/A (This is a service implementation, not an API endpoint)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
N/A

### Service Methods
- **getURL(options, imageConfig)**: Generates the URL for an image transformation.
- **parseURL(url, imageConfig)**: Parses URL parameters to extract image transformation options.
- **transform(inputBuffer, options, imageConfig)**: Transforms the image buffer based on the provided options.
- **getHTMLAttributes(options, imageConfig)**: Generates HTML attributes for the image tag.

### Properties to Hash
- `propertiesToHash`: An array of properties that should be included in the image hash for caching. Defaults to `['src', 'width', 'height', 'format', 'quality']`.
```

--------------------------------

### Initialize package.json with pnpm

Source: https://docs.astro.build/en/install-and-setup

Initializes a new package.json file using pnpm. This is used to manage project dependencies.

```bash
pnpm init
```

--------------------------------

### Fetch and Render Storyblok Data in Astro Page

Source: https://docs.astro.build/en/guides/cms/storyblok

Fetch Storyblok data using `useStoryblokApi` and render it using the `StoryblokComponent`. This example demonstrates fetching a specific story and passing its content to the component for rendering.

```astro
---
import { useStoryblokApi } from '@storyblok/astro'
import StoryblokComponent from '@storyblok/astro/StoryblokComponent.astro'


const storyblokApi = useStoryblokApi()


const { data } = await storyblokApi.get("cdn/stories/test-post", {
  version: import.meta.env.DEV ? "draft" : "published",
});


const content = data.story.content;
---
<StoryblokComponent blok={content} />

```

--------------------------------

### PreviewServer Methods

Source: https://docs.astro.build/en/reference/programmatic-reference

Lifecycle management methods for the PreviewServer instance.

```APIDOC
## PreviewServer Methods

### PreviewServer.stop()
- **Type**: Promise<void>
- **Description**: Asks the preview server to close, stop accepting requests, and drop idle connections. The returned Promise resolves when the close request has been sent.

### PreviewServer.closed()
- **Type**: Promise<void>
- **Description**: Returns a Promise that will resolve once the server is closed and reject if an error happens on the server.
```

--------------------------------

### Example JSON response structure

Source: https://docs.astro.build/en/guides/cms/strapi

The expected JSON format returned by the Strapi API for an article object.

```json
[
  {
    documentId: 1,
    title: "What's inside a Black Hole",
    description: "Maybe the answer is in this article, or not...",
    content: "Well, we don't know yet...",
    slug: "what-s-inside-a-black-hole",
    createdAt: "2023-05-28T13:19:46.421Z",
    updatedAt: "2023-05-28T13:19:46.421Z",
    publishedAt: "2023-05-28T13:19:45.826Z"
  },
  // ...
]
```

--------------------------------

### Using Astro Client Directives

Source: https://docs.astro.build/en/tutorial/6-islands/1

Demonstrates various Astro client directives for controlling component hydration. Use `client:load` to hydrate immediately and `client:visible` to hydrate when the component enters the viewport.

```astro
---\nimport BaseLayout from '../layouts/BaseLayout.astro';
import AstroBanner from '../components/AstroBanner.astro';
import PreactBanner from '../components/PreactBanner';
import SvelteCounter from '../components/SvelteCounter.svelte';
---\n<BaseLayout>
  <AstroBanner />
  <PreactBanner />
  <PreactBanner client:load />
  <SvelteCounter />
  <SvelteCounter client:visible />
</BaseLayout>

```

--------------------------------

### Correct API Endpoint Implementation

Source: https://docs.astro.build/en/reference/errors/endpoint-did-not-return-aresponse

Ensure the GET function returns a Promise that resolves to a Response object.

```typescript
import type { APIContext } from 'astro';


export async function GET({ request, url, cookies }: APIContext): Promise<Response> {
    return Response.json({
        success: true,
        result: 'Data from Astro Endpoint!'
    })
}
```

--------------------------------

### Create Project Directory

Source: https://docs.astro.build/en/install-and-setup

Use this command to create a new directory for your Astro project and navigate into it.

```bash
mkdir my-astro-project
cd my-astro-project
```

--------------------------------

### Define a server endpoint

Source: https://docs.astro.build/en/recipes/call-endpoints

Create a file in src/pages/api to export a GET handler that returns a JSON response.

```typescript
import type { APIRoute } from 'astro'


export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      greeting: 'Hello',
    }),
  )
}
```

--------------------------------

### Redirect Response

Source: https://docs.astro.build/en/guides/endpoints

Handles GET requests, retrieves a URL based on a parameter, and issues an HTTP redirect.

```APIDOC
## GET /links/:id

### Description
Handles GET requests for dynamic routes, retrieves a URL associated with the provided ID, and issues an HTTP redirect to that URL.

### Method
GET

### Endpoint
/links/:id

### Parameters
#### Path Parameters
- **id** (string) - Required - The ID used to look up the redirect URL.

### Request Body
None

### Response
#### Success Response (307)
- **Redirect** - Issues a temporary redirect (307) to the retrieved URL.

#### Error Response (404)
- **null** - Returned if the link ID is not found.

### Request Example
None

### Response Example
(HTTP 307 Redirect to a specified URL)
```

--------------------------------

### Configure MDX Plugins with New Options

Source: https://docs.astro.build/en/guides/upgrade-to/v2

Replace `extendPlugins: 'defaults'` with `extendMarkdownConfig: false` and enable `smartypants` and `gfm` individually for MDX.

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';


export default defineConfig({
  integrations: [
    mdx({
      extendPlugins: 'defaults',
      extendMarkdownConfig: false,
      smartypants: true,
      gfm: true,
    }),
  ],
});
```

--------------------------------

### Add Sitemap Link to robots.txt

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

Add the URL of the sitemap index to your robots.txt file to guide crawlers.

```plaintext
User-agent: *
Allow: /


Sitemap: https://<YOUR SITE>/sitemap-index.xml
```

--------------------------------

### Importing View Transitions modules

Source: https://docs.astro.build/en/reference/modules/astro-transitions

Import core components and animation utilities from the astro:transitions package.

```javascript
import {
  ClientRouter,
  fade,
  slide,
} from 'astro:transitions';
```

--------------------------------

### Listen to TRANSITION_BEFORE_PREPARATION event

Source: https://docs.astro.build/en/reference/modules/astro-transitions

Use the `TRANSITION_BEFORE_PREPARATION` constant to avoid writing the event name in plain text when defining an event listener for Astro transitions.

```javascript
import { TRANSITION_BEFORE_PREPARATION } from "astro:transitions/client";

document.addEventListener(TRANSITION_BEFORE_PREPARATION, () => {
  /* the listener logic */
});
```

--------------------------------

### Import BlogPost component

Source: https://docs.astro.build/en/tutorial/5-astro-api/1

Import the `BlogPost` component into your main blog page to use it for rendering the list of posts.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import BlogPost from '../components/BlogPost.astro';
const allPosts = Object.values(import.meta.glob('../pages/posts/*.md', { eager: true }));
const pageTitle = "My Astro Learning Blog";
---

```

--------------------------------

### Configure Passthrough Image Service

Source: https://docs.astro.build/en/reference/errors/missing-sharp

Use this configuration to disable image processing if you do not wish to install the Sharp dependency.

```javascript
import { defineConfig, passthroughImageService } from "astro/config";
export default defineConfig({
 image: {
   service: passthroughImageService(),
 },
});
```

--------------------------------

### Add Partytown Integration with Yarn

Source: https://docs.astro.build/en/guides/integrations-guide/partytown

Use the `astro add` command with Yarn to automatically install the Partytown integration.

```bash
yarn astro add partytown
```

--------------------------------

### Configure Markdoc VS Code Extension

Source: https://docs.astro.build/en/guides/integrations-guide/markdoc

Set up the Markdoc VS Code extension by creating a 'markdoc.config.json' file in the project root.

```json
[
  {
    "id": "my-site",
    "path": "src/content",
    "schema": {
      "path": "markdoc.config.mjs",
      "type": "esm",
      "property": "default",
      "watch": true
    }
  }
]
```

--------------------------------

### Configure Redis Session Driver with Unstorage

Source: https://docs.astro.build/en/guides/sessions

Define a custom session driver using Unstorage for Redis. This example exports a default function that returns a Redis driver instance, configured with host and port from environment variables.

```typescript
import type { SessionDriver } from "astro";
import redisDriver from "unstorage/drivers/redis";
import { REDIS_HOST, REDIS_PORT } from "astro:env";


export default function (): SessionDriver {
  return redisDriver({
    host: REDIS_HOST,
    port: REDIS_PORT,
  });
}
```

--------------------------------

### Configure in-memory embedded replica

Source: https://docs.astro.build/en/guides/astro-db

Set up an in-memory database that synchronizes with a remote libSQL server.

```bash
ASTRO_DB_REMOTE_URL=memory:?syncUrl=libsql%3A%2F%2Fyour.server.io
```

--------------------------------

### Define Astro Dev Toolbar App with JSX

Source: https://docs.astro.build/en/recipes/making-toolbar-apps

Example of defining an Astro dev toolbar app using JSX with Preact. The 'init' function renders a random motivational message into the provided canvas.

```typescript
import { defineToolbarApp } from "astro/toolbar";
import { render } from "preact";


const motivationalMessages = [
  "You're doing great!",
  "Keep up the good work!",
  "You're awesome!",
  "You're a star!",
];


export default defineToolbarApp({
    init(canvas) {
      const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      render(<h1>{message}</h1>, canvas);
    },
});

```

--------------------------------

### Configure Font Variation Settings

Source: https://docs.astro.build/en/reference/configuration-reference

Sets font variation settings. Example uses 'xhgt' for a specific variation.

```javascript
variationSettings: "'xhgt' 0.7"
```

--------------------------------

### Initialize Supabase Client

Source: https://docs.astro.build/en/guides/backend/supabase

Create a Supabase client instance in a dedicated file (e.g., src/lib/supabase.ts). This client will be used throughout your Astro project to make requests to Supabase.

```typescript
import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
);
```

--------------------------------

### JSON Logger Configuration with Level

Source: https://docs.astro.build/en/reference/experimental-flags/logger

Example of configuring the JSON logger to print messages of a specific level or higher.

```APIDOC
The following example configures the JSON logger to print only messages that have the `warn` level or higher:
```

import { defineConfig, logHandlers } from 'astro/config';


export default defineConfig({
  experimental: {
    logger: logHandlers.json({ level: "warn" })
  }
});

```
```

--------------------------------

### Define Environment Variables in Wrangler Config

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Example of defining environment variables within the `wrangler.jsonc` configuration file.

```json
{
  "vars": {
    "MY_VARIABLE": "test",
  },
}
```

--------------------------------

### Generate Prisma Client

Source: https://docs.astro.build/en/guides/backend/prisma-postgres

Generates the Prisma Client based on your `schema.prisma` file.

```bash
npx prisma generate
```

--------------------------------

### Configure Juno Project for Astro Deployment

Source: https://docs.astro.build/en/guides/deploy/juno

This configuration file sets up your Astro project for deployment to Juno. Ensure the `PROD_SATELLITE_ID` is replaced with your actual satellite ID and the `source` points to your build output directory. The `predeploy` script runs the Astro build process before deployment.

```javascript
import { defineConfig } from '@junobuild/config';


/** @type {import('@junobuild/config').JunoConfig} */
export default defineConfig({
  satellite: {
    ids: {
      production: '<PROD_SATELLITE_ID>'
    },
    source: 'dist',
    predeploy: ['npm run build']
  }
});
```

--------------------------------

### Modify Astro Page for Test Failure

Source: https://docs.astro.build/en/guides/testing

Example of modifying an Astro page to intentionally cause a test to fail.

```astro
 <body>
   <h1>Hello world from Astro</h1>
   <h1>Hello from Astro</h1>
 </body>
```

--------------------------------

### Vue Component Example

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-nuxtjs

A typical Nuxt.js Vue component with a template, script for data fetching, and scoped styles.

```vue
<template>
  <div>
    <p v-if="message === 'Not found'">
      The repository you're looking up doesn't exist
    </p>
    <div v-else>
      <Header/>
      <p class="banner">Astro has {{stars}} 🧑‍🚀</p>
      <Footer />
    </div>
  </div>
</template>


<script>
import Vue from 'vue'


export default Vue.extend({
  name: 'IndexPage',
  async asyncData() {
    const res = await fetch('https://api.github.com/repos/withastro/astro')
    const json = await res.json();
    return {
      message: json.message,
      stars: json.stargazers_count || 0,
    };
  }
});
</script>


<style scoped>
.banner {
  background-color: #f4f4f4;
  padding: 1em 1.5em;
  text-align: center;
  margin-bottom: 1em;
}
</style>
```

--------------------------------

### Generated Sitemap Index XML

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

Example of a generated sitemap index file, which links to individual sitemap files.

```xml
<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
```

--------------------------------

### `request`

Source: https://docs.astro.build/en/reference/api-reference

`request` is a standard Request object. It can be used to get the `url`, `headers`, `method`, and even the body of the request.

```APIDOC
## `request`

### Description
Provides access to the standard `Request` object for the incoming request.

### Usage
```astro
<p>Received a {Astro.request.method} request to "{Astro.request.url}".</p>
<p>Received request headers:</p>
<p><code>{JSON.stringify(Object.fromEntries(Astro.request.headers))}</code></p>
```

### Response Example
```javascript
import type { APIContext } from 'astro';

export function GET({ request }: APIContext) {
  return new Response(`Hello ${request.url}`);
}
```

### Note
On prerendered pages, `request.url` may not contain search parameters. For on-demand rendered pages, search parameters are included.
```

--------------------------------

### Listen to TRANSITION_AFTER_PREPARATION event

Source: https://docs.astro.build/en/reference/modules/astro-transitions

Use the `TRANSITION_AFTER_PREPARATION` constant to avoid writing the event name in plain text when defining an event listener for Astro transitions.

```javascript
import { TRANSITION_AFTER_PREPARATION } from "astro:transitions/client";

document.addEventListener(TRANSITION_AFTER_PREPARATION, () => {
  /* the listener logic */
});
```

--------------------------------

### Handle Edge Middleware Entrypoint

Source: https://docs.astro.build/en/reference/adapter-reference

Consume the `astro:build:ssr` hook to access the `middlewareEntryPoint`. This URL points to the physical file on the file system and should be used to create the edge middleware.

```javascript
export default function createIntegration() {
  return {
    name: '@example/my-adapter',
    hooks: {
      'astro:config:done': ({ setAdapter }) => {
        setAdapter({
          name: '@example/my-adapter',
          entrypointResolution: 'auto',
          serverEntrypoint: '@example/my-adapter/server.js',
          adapterFeatures: {
            middlewareMode: 'edge'
          }
        });
      },


      'astro:build:ssr': ({ middlewareEntryPoint }) => {
        // remember to check if this property exits, it will be `undefined` if the adapter doesn't opt in to the feature
        if (middlewareEntryPoint) {
          createEdgeMiddleware(middlewareEntryPoint)
        }
      }
    },
  };
}


function createEdgeMiddleware(middlewareEntryPoint) {
  // emit a new physical file using your bundler
}
```

--------------------------------

### Import Virtual Module in Server Entrypoint

Source: https://docs.astro.build/en/reference/adapter-reference

Import the virtual module containing build-time configuration, such as asset paths, into your server entrypoint to access this data during server-side requests.

```javascript
import { createApp } from 'astro/app/entrypoint';
import { assets } from 'virtual:@example/my-adapter:config';


const app = createApp();


export async function handler(event, context) {
  // ...
}
```

--------------------------------

### Login to Railway CLI

Source: https://docs.astro.build/en/guides/deploy/railway

Log in to your Railway account using the CLI. Ensure you have the Railway CLI tool installed first.

```bash
railway login
```

--------------------------------

### Rendering Markdown content with <Content />

Source: https://docs.astro.build/en/guides/markdown-content

Demonstrates importing Markdown files directly or via content collections and rendering their body content.

```astro
---
// Import statement
import {Content as PromoBanner} from '../components/promoBanner.md';


// Collections query
import { getEntry, render } from 'astro:content';


const product = await getEntry('products', 'shirt');
const { Content } = await render(product);
---
<h2>Today's promo</h2>
<PromoBanner />


<p>Sale Ends: {product.data.saleEndDate.toDateString()}</p>
<Content />
```

--------------------------------

### Configure Blog Collection with Glob Loader

Source: https://docs.astro.build/en/guides/content-collections

Configures a 'blog' collection using the `glob()` loader to fetch Markdown files from a specified base directory and pattern. Requires importing `defineCollection` and `glob`.

```typescript
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';


const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
});


export const collections = { blog };

```

--------------------------------

### Import Multiple Markdown Files with `import.meta.glob()`

Source: https://docs.astro.build/en/guides/imports

Use `import.meta.glob()` to import multiple files matching a glob pattern. The `eager: true` option loads all matched modules upfront.

```astro
---
// imports all files that end with `.md` in `./src/pages/post/`
const matches = import.meta.glob('../pages/post/*.md', { eager: true });
const posts = Object.values(matches);
---
<!-- Renders an <article> for the first 5 blog posts -->
<div>
{posts.slice(0, 4).map((post) => (
  <article>
    <h2>{post.frontmatter.title}</h2>
    <p>{post.frontmatter.description}</p>
    <a href={post.url}>Read more</a>
  </article>
))}
</div>
```

--------------------------------

### Scoped CSS specificity transformation

Source: https://docs.astro.build/en/guides/upgrade-to/v1

Examples showing how Astro transforms scoped CSS selectors to preserve specificity using :where().

```css
<style>
  div { color: red; } /* 0-0-1 specificity */
</style>
```

```css
div~~.astro-XXXXXX~~ { color: red; } /* 0-1-1 specificity */
```

```css
div:where(.astro-XXXXXX) { color: red; } /* 0-0-1 specificity */
```

--------------------------------

### Create a JSON endpoint

Source: https://docs.astro.build/en/guides/endpoints

Export a GET function that returns a Response object to generate static files like JSON.

```typescript
// Outputs: /builtwith.json
export function GET({ params, request }) {
  return new Response(
    JSON.stringify({
      name: "Astro",
      url: "https://astro.build/",
    }),
  );
}
```

--------------------------------

### Authenticate Juno CLI

Source: https://docs.astro.build/en/guides/deploy/juno

Logs you into the Juno platform via the CLI, which will open a browser window for authorization. This step is necessary before deploying.

```bash
juno login
```

--------------------------------

### GitHub Actions Workflow for Astro

Source: https://docs.astro.build/en/guides/deploy/github

Create this file at .github/workflows/deploy.yml to automate the build and deployment process.

```yaml
name: Deploy to GitHub Pages


on:
  # Trigger the workflow every time you push to the `main` branch
  # Using a different branch name? Replace `main` with your branch’s name
  push:
    branches: [ main ]
  # Allows you to run this workflow manually from the Actions tab on GitHub.
  workflow_dispatch:


# Allow this job to clone the repo and create a page deployment
permissions:
  contents: read
  pages: write
  id-token: write


jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v6
      - name: Install, build, and upload your site
        uses: withastro/action@v6
        # with:
          # path: . # The root location of your Astro project inside the repository. (optional)
          # node-version: 24 # The specific version of Node that should be used to build your site. Defaults to 22. (optional)
          # package-manager: pnpm@latest # The Node package manager that should be used to install dependencies and build your site. Automatically detected based on your lockfile. (optional)
          # build-cmd: pnpm run build # The command to run to build your site. Runs the package build script/task by default. (optional)
        # env:
          # PUBLIC_POKEAPI: 'https://pokeapi.co/api/v2' # Use single quotation marks for the variable value. (optional)


  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

--------------------------------

### Import Components in Astro

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs

Use relative paths with full file extensions when importing components in Astro.

```astro
---
import Card from "../../components/Card.astro";
---
<Card />
```

--------------------------------

### Generate blog modules via CLI

Source: https://docs.astro.build/en/guides/cms/apostrophecms

Run this command in the root of your ApostropheCMS project to scaffold the necessary modules.

```bash
apos add piece blog --page
```

--------------------------------

### Initialize the delivery client

Source: https://docs.astro.build/en/guides/cms/kontent-ai

Create a reusable delivery client instance in src/lib/kontent.ts using environment variables.

```typescript
import { createDeliveryClient } from "@kontent-ai/delivery-sdk";


export const deliveryClient = createDeliveryClient({
    environmentId: import.meta.env.KONTENT_ENVIRONMENT_ID,
    previewApiKey: import.meta.env.KONTENT_PREVIEW_API_KEY,
});
```

--------------------------------

### Accessing locals.title in an API endpoint

Source: https://docs.astro.build/en/reference/api-reference

API endpoints can also access values from `locals`. This example returns the value of `locals.title` as a response.

```typescript
import type { APIContext } from 'astro';


export function GET({ locals }: APIContext) {
  return new Response(locals.title); // "Default Title"
}
```

--------------------------------

### Deploy Astro Site via Juno CLI

Source: https://docs.astro.build/en/guides/deploy/juno

Deploys your Astro site to Juno using the command-line interface after successful authentication.

```bash
juno hosting deploy
```

--------------------------------

### Configure Astro i18n Locales

Source: https://docs.astro.build/en/reference/modules/astro-i18n

Example configuration for Astro's i18n module, defining locales with multiple codes and paths.

```javascript
export default defineConfig({
  i18n: {
    locales: [
      { codes: ["it-VT", "it"], path: "italiano" },
      "es"
    ]
  }
})
```

--------------------------------

### Wrangler Configuration for Cloudflare KV Bindings

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Example Wrangler configuration file to declare Cloudflare KV bindings for your Astro application.

```json
{
  "name": "my-astro-app",
  // Add your bindings here, e.g.:
  // "kv_namespaces": [{ "binding": "MY_KV", "id": "<namespace_id>" }]
}
```

--------------------------------

### Configuration Utilities

Source: https://docs.astro.build/en/reference/modules/astro-config

Helper functions for managing Vite and Astro configurations.

```APIDOC
## getViteConfig()

### Description
Retrieves the Vite configuration by merging a custom Vite configuration object and an optional Astro configuration object.

### Parameters
- **userViteConfig** (ViteUserConfig) - Required
- **inlineAstroConfig** (AstroInlineConfig) - Optional
```

--------------------------------

### Blocking data fetch in Astro frontmatter

Source: https://docs.astro.build/en/recipes/streaming-improve-page-performance

This example shows a pattern where page rendering is blocked until all fetch calls in the frontmatter resolve.

```astro
---
const personResponse = await fetch('https://randomuser.me/api/');
const personData = await personResponse.json();
const randomPerson = personData.results[0];
const factResponse = await fetch('https://catfact.ninja/fact');
const factData = await factResponse.json();
---
<html>
  <head>
    <title>A name and a fact</title>
  </head>
  <body>
    <h2>A name</h2>
    <p>{randomPerson.name.first}</p>
    <h2>A fact</h2>
    <p>{factData.fact}</p>
  </body>
</html>
```

--------------------------------

### Format Files with Prettier (npm)

Source: https://docs.astro.build/en/editor-setup

Run this command using npm to format all files in the current directory and its subdirectories.

```bash
npx prettier . --write
```

--------------------------------

### Configure session driver using Redis

Source: https://docs.astro.build/en/reference/configuration-reference

Set up session storage using the Redis driver. Ensure the REDIS_URL environment variable is set.

```javascript
import { defineConfig, sessionDrivers } from 'astro/config';


export default defineConfig({
  session: {
    driver: sessionDrivers.redis({
      // The options are driver-dependent and some may be required.
      url: process.env.REDIS_URL
    }),
  }
});
```

--------------------------------

### Remove @astrojs/image integration

Source: https://docs.astro.build/en/guides/upgrade-to/v3

Example of how the @astrojs/image integration was configured in Astro v2.x. This integration is removed in v3.0 and replaced by astro:assets.

```javascript
import { defineConfig } from 'astro/config';
import image from '@astrojs/image';


export default defineConfig({
  integrations: [
    image(),
  ]
})
```

--------------------------------

### Configure Neon Environment Variable

Source: https://docs.astro.build/en/guides/backend/neon

Set the NEON_DATABASE_URL in your .env file to connect to your Neon project. Replace placeholders with your actual database credentials.

```env
NEON_DATABASE_URL="postgresql://<user>:<password>@<endpoint_hostname>.neon.tech:<port>/<dbname>?sslmode=require"
```

--------------------------------

### Configuring rehype plugins for heading IDs

Source: https://docs.astro.build/en/guides/markdown-content

Example of using Astro's rehypeHeadingIds plugin within the Astro configuration file.

```javascript
import { defineConfig } from 'astro/config';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import { otherPluginThatReliesOnHeadingIDs } from 'some/plugin/source';


export default defineConfig({
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      otherPluginThatReliesOnHeadingIDs,
    ],
  },
});
```

--------------------------------

### Configure Site URL

Source: https://docs.astro.build/en/reference/cli-reference

Configures the `site` for your project, overriding the value in `astro.config.mjs`.

```bash
astro --site https://example.com
```

--------------------------------

### Get an Entry from DataStore

Source: https://docs.astro.build/en/reference/content-loader-reference

Retrieve a specific entry from the data store using its unique ID. Returns undefined if the entry does not exist.

```javascript
const existingEntry = store.get("my-entry");
```

--------------------------------

### Turso CLI: Create Database Token

Source: https://docs.astro.build/en/guides/astro-db

Command to create a token for accessing a Turso database.

```bash
turso db tokens create [database-name]
```

--------------------------------

### List User Preferences

Source: https://docs.astro.build/en/reference/cli-reference

Prints the current settings of all configurable user preferences. Supports machine-readable JSON output.

```bash
astro preferences list
```

--------------------------------

### Importing and Using a Wasm Module in Astro

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Demonstrates importing a WebAssembly module and instantiating it for use in a server-side route. Ensure the Wasm file is correctly placed and imported.

```javascript
// Import the WebAssembly module
import mod from '../util/add.wasm';


// Instantiate first in order to use it
const addModule: any = new WebAssembly.Instance(mod);


export async function GET(context) {
  const a = Number.parseInt(context.params.a);
  const b = Number.parseInt(context.params.b);
  return new Response(`${addModule.exports.add(a, b)}`);
}

```

--------------------------------

### Initialize NightwatchJS with Yarn

Source: https://docs.astro.build/en/guides/testing

Initialize NightwatchJS within your Astro project using Yarn.

```bash
yarn create nightwatch
```

--------------------------------

### Render Blog Post with Formatted Data

Source: https://docs.astro.build/en/guides/cms/contentful

Displays the blog post content, title, and date using the prepared `post` object. Assumes `post` object is available from previous data fetching and formatting steps.

```astro
---import Layout from "../../layouts/Layout.astro";
import { contentfulClient } from "../../lib/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { BlogPost } from "../../lib/contentful";


let post;
const { slug } = Astro.params;
try {
  const data = await contentfulClient.getEntries<BlogPost>({
    content_type: "blogPost",
    "fields.slug": slug,
  });
  const { title, date, content } = data.items[0].fields;
  post = {
    title,
    date: new Date(date).toLocaleDateString(),
    content: documentToHtmlString(content),
  };
} catch (error) {
  return Astro.redirect("/404");
}
---
<html lang="en">
  <head>
    <title>{post?.title}</title>
  </head>
  <body>
    <h1>{post?.title}</h1>
    <time>{post?.date}</time>
    <article set:html={post?.content} />
  </body>
</html>

```

--------------------------------

### Run Dev Server with Custom Config

Source: https://docs.astro.build/en/reference/cli-reference

Specifies the path to the config file relative to the project root. Defaults to `astro.config.mjs`.

```bash
astro --config config/astro.config.mjs dev
```

--------------------------------

### Update TypeScript locally

Source: https://docs.astro.build/en/guides/upgrade-to/v3

Install the latest version of TypeScript locally if you are using TypeScript 4.x, as Astro v3.0 only supports TypeScript 5.x.

```bash
npm install typescript@latest --save-dev
```

--------------------------------

### Configure Render Build Settings

Source: https://docs.astro.build/en/guides/deploy/render

Specify these values in the Render dashboard when creating a new static site.

```text
npm run build
```

```text
dist
```

```text
dist/client
```

--------------------------------

### Configure Console Logger

Source: https://docs.astro.build/en/reference/experimental-flags/logger

Set up Astro to use the console logger, specifying the minimum log level to display.

```javascript
import { defineConfig, logHandlers } from 'astro/config';


export default defineConfig({
  experimental: {
    logger: logHandlers.console({ level: 'warn' })
  }
});

```

--------------------------------

### AstroPrerenderer

Source: https://docs.astro.build/en/reference/integrations-reference

Defines a custom prerenderer that adapters can provide to control page prerendering. Includes methods for setup, path generation, rendering, and teardown.

```APIDOC
### `AstroPrerenderer`

**Type:** `string`

**Added in:** `astro@6.0.0`

Describes a custom prerender that adapters can provide to control page prerendering.

#### `AstroPrerenderer.name`

**Type:** `string`

Specifies a unique name for the prerender.

#### `AstroPrerenderer.setup()`

**Type:** `() => Promise<void>`

Defines an optional method that will be called once before the prerendering starts. This is useful for starting a preview server.

#### `AstroPrerenderer.getStaticPaths()`

**Type:** `() => Promise<Array<{ pathname: string; route: RouteData; }>>`

Returns a list of objects describing the prerendered route path and its associated data.

#### `AstroPrerenderer.render()`

**Type:** `(request: Request, options: { routeData: RouteData }) => Promise<Response>`

Defines an optional method describing how to render a page. This will be called by Astro for each path returned by `getStaticPaths()`.

#### `AstroPrerenderer.teardown()`

**Type:** `() => Promise<void>`

Defines an optional method called once all pages are pre-rendered. This is useful for performing cleanup tasks such as stopping a preview server.
```

--------------------------------

### Zerops Build Configuration for Static Astro

Source: https://docs.astro.build/en/guides/deploy/zerops

Define the build and deployment process for static sites using npm, pnpm, or yarn.

```yaml

# see https://docs.zerops.io/zerops-yml/specification for full reference
zerops:
  - setup: app
    build:
      base: nodejs@20
      buildCommands:
        - npm i
        - npm build
      deployFiles:
        - dist/~
    run:
      base: static

```

```yaml

# see https://docs.zerops.io/zerops-yml/specification for full reference
zerops:
  - setup: app
    build:
      base: nodejs@20
      buildCommands:
        - pnpm i
        - pnpm build
      deployFiles:
        - dist/~
    run:
      base: static

```

```yaml

# see https://docs.zerops.io/zerops-yml/specification for full reference
zerops:
  - setup: app
    build:
      base: nodejs@20
      buildCommands:
        - yarn
        - yarn build
      deployFiles:
        - dist/~
    run:
      base: static

```

--------------------------------

### Configure Cypress

Source: https://docs.astro.build/en/guides/testing

Set up the Cypress configuration file to specify support file options.

```javascript
import { defineConfig } from 'cypress'


export default defineConfig({
  e2e: {
    supportFile: false
  }
})
```

--------------------------------

### Configure Font Feature Settings

Source: https://docs.astro.build/en/reference/configuration-reference

Controls typographic font features such as ligatures or small caps. Example uses 'smcp' for small caps.

```javascript
featureSettings: "'smcp' 2"
```

--------------------------------

### Initialize package.json with Yarn

Source: https://docs.astro.build/en/install-and-setup

Initializes a new package.json file using Yarn. This is used to manage project dependencies.

```bash
yarn init --yes
```

--------------------------------

### Accessing locals.title in an Astro component

Source: https://docs.astro.build/en/reference/api-reference

Components can access values set in `locals` by middleware. This example retrieves `Astro.locals.title` and displays it in an H1 tag.

```html
--- 
const title = Astro.locals.title;
---
<h1>{title}</h1>
```

--------------------------------

### PreviewServerParams

Source: https://docs.astro.build/en/reference/adapter-reference

Describes the configuration for the preview server, including output directories, server entrypoint, host, and port.

```APIDOC
## PreviewServerParams

### Description
Describes the configuration for the preview server.

### Properties
- **outDir** (`URL`): The configured output directory for the build.
- **client** (`URL`): The configured client assets directory for the build.
- **server** (`URL`): The configured directory for server JavaScript when building to SSR. (Added in `astro@6.0.0`)
- **serverEntrypoint** (`URL`): The built server entry module generated by Astro.
- **host** (`string | undefined`): Specifies the configured host on which the server preview should listen.
- **port** (`number`): Defines the configured port on which the server preview should listen.
```

--------------------------------

### Accessing Params in Static Routes

Source: https://docs.astro.build/en/reference/api-reference

Retrieves dynamic route parameters using `Astro.params` in a static route. This example accesses an 'id' parameter.

```astro
---
export function getStaticPaths() {
  return [
    { params: { id: '1' } },
    { params: { id: '2' } },
    { params: { id: '3' } }
  ];
}
const { id } = Astro.params;
---
<h1>{id}</h1>
```

--------------------------------

### Initialize Paddle Checkout

Source: https://docs.astro.build/en/guides/ecommerce

Load the Paddle.js library and initialize it with a client-side token to enable checkout functionality.

```html
<script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>
<script type="text/javascript">
  Paddle.Setup({
    token: '7d279f61a3499fed520f7cd8c08' // replace with a client-side token
  });
</script>
```

--------------------------------

### Astro Component Conversion

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-nuxtjs

The equivalent Astro component after converting from the Vue example. It uses frontmatter for data fetching and JSX-like syntax for templating.

```astro
---
import Header from "./header";
import Footer from './footer';
import "./layout.css";


const res = await fetch('https://api.github.com/repos/withastro/astro')
const json = await res.json()
const message = json.message;
const stars = json.stargazers_count || 0;
---


{message === "Not Found" ?
      <p>The repository you're looking up doesn't exist</p> :
      <>
          <Header />
          <p class="banner">Astro has {stars} 🧑‍🚀</p>
          <Footer />
      </>
}


<style>
  .banner {
    background-color: #f4f4f4;
    padding: 1em 1.5em;
    text-align: center;
    margin-bottom: 1em;
  }
</style>
```

--------------------------------

### Get Astro logger with app.getAdapterLogger()

Source: https://docs.astro.build/en/reference/modules/astro-app

Retrieve an instance of the Astro logger using `app.getAdapterLogger()`. This is useful for logging errors or other messages within your adapter.

```javascript
const logger = app.getAdapterLogger();
try {
  /* Some logic that can throw */
} catch {
  logger.error("Your custom error message using Astro logger.");
}
```

--------------------------------

### Retrieve Locale Codes with toCodes()

Source: https://docs.astro.build/en/reference/modules/astro-i18n

Use the toCodes() utility to get an array of configured locale codes. Only the first code for each locale is included.

```javascript
import { i18n } from "astro:config/client";
import { toCodes } from "astro:i18n";


toCodes(i18n!.locales); // ["it-VT", "es"]
```

--------------------------------

### Get Help for Astro Dev Command with Yarn

Source: https://docs.astro.build/en/reference/cli-reference

Use this command to view all available flags for the `astro dev` command. Requires Yarn.

```bash
# get a list of all flags for the `dev` command
yarn dev --help

```

--------------------------------

### Get Help for Astro Dev Command with pnpm

Source: https://docs.astro.build/en/reference/cli-reference

Use this command to view all available flags for the `astro dev` command. Requires pnpm.

```bash
# get a list of all flags for the `dev` command
pnpm dev --help

```

--------------------------------

### Add CNAME file for custom domain

Source: https://docs.astro.build/en/guides/deploy/github

Create a CNAME file in your public directory with your custom domain. This ensures your site deploys to the specified domain.

```text
sub.example.com
```

--------------------------------

### Deploy to Surge

Source: https://docs.astro.build/en/guides/deploy/surge

Upload the contents of the dist directory to Surge.

```bash
surge dist
```

--------------------------------

### Build Astro Site with Verbose Logs using pnpm

Source: https://docs.astro.build/en/reference/cli-reference

This command builds the Astro site with verbose logging enabled for debugging, using the `build` script from `package.json`. Requires pnpm.

```bash
# build your site with verbose logs using the `build` script in `package.json`
pnpm build --verbose

```

--------------------------------

### Image Layout Options

Source: https://docs.astro.build/en/reference/modules/astro-assets

Illustrates how to control the responsive behavior of images using the `layout` property.

```APIDOC
## Image Layout Options

### Description
Control how an image resizes within its container using the `layout` property. Available options include `constrained`, `full-width`, `fixed`, and `none`.

### Component Usage
```astro
<Image src={myImage} alt="This will use constrained layout" width={800} height={600} />
<Image src={myImage} alt="This will use full-width layout" layout="full-width" />
<Image src={myImage} alt="This will disable responsive images" layout="none" />
```

### Supported Layout Values
- `constrained`: Scales down to fit container, maintains aspect ratio, does not scale up beyond specified dimensions.
- `full-width`: Scales to fit the width of the container, maintains aspect ratio.
- `fixed`: Maintains requested dimensions, does not resize. Generates `srcset` for high density displays.
- `none`: Image is not responsive. No `srcset` or `sizes` generated, no styles applied.
```

--------------------------------

### Pass environment variables via CLI

Source: https://docs.astro.build/en/guides/environment-variables

Inject environment variables directly when starting the development server using different package managers.

```bash
PUBLIC_POKEAPI=https://pokeapi.co/api/v2 npm run dev
```

```bash
PUBLIC_POKEAPI=https://pokeapi.co/api/v2 pnpm run dev
```

```bash
PUBLIC_POKEAPI=https://pokeapi.co/api/v2 yarn run dev
```

--------------------------------

### NPM Font Provider

Source: https://docs.astro.build/en/reference/font-provider-reference

Retrieve fonts from NPM packages, either locally installed or from a CDN. This provider automatically detects fonts from `package.json` dependencies.

```APIDOC
## NPM Font Provider

### Description
Retrieve fonts from NPM packages, either locally installed or from a CDN. This provider automatically detects fonts from `package.json` dependencies and can resolve fonts from packages like `@fontsource/*`.

### Provider Options
#### `cdn`
**Type:** `string`
**Default:** `'https://cdn.jsdelivr.net/npm'`
CDN to use for fetching npm packages remotely.

**Example:**
```javascript
provider: fontProviders.npm({ cdn: 'https://esm.sh' })
```

#### `remote`
**Type:** `boolean`
**Default:** `true`
Whether to fall back to fetching from the CDN when local resolution fails. Set to `false` to only resolve from locally installed packages.

**Example:**
```javascript
provider: fontProviders.npm({ remote: false })
```

### Family Options
#### `package`
**Type:** `string`
**Default:** Auto-detected or inferred from family name
The NPM package name.

**Example:**
```javascript
{
  // ...
  provider: fontProviders.npm(),
  options: {
    package: '@fontsource/roboto'
  }
}
```

#### `version`
**Type:** `string`
**Default:** `'latest'`
The version of the package (used for CDN resolution only).

**Example:**
```javascript
{
  // ...
  provider: fontProviders.npm(),
  options: {
    version: '5.0.0'
  }
}
```

#### `file`
**Type:** `string`
**Default:** `'index.css'`
The entry CSS file to parse from the package.

**Example:**
```javascript
{
  // ...
  provider: fontProviders.npm(),
  options: {
    file: 'latin.css'
  }
}
```
```

--------------------------------

### Constructing URLs with Astro.url and Astro.site

Source: https://docs.astro.build/en/reference/api-reference

Shows how to construct canonical and social image URLs using `Astro.url` and the `Astro.site` configuration option. This is helpful for SEO and social sharing.

```astro
---
// Example: Construct a canonical URL using your production domain
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
// Example: Construct a URL for SEO meta tags using your current domain
const socialImageURL = new URL('/images/preview.png', Astro.url);
---
<link rel="canonical" href={canonicalURL} />
<meta property="og:image" content={socialImageURL} />
```

--------------------------------

### Enable Prefetching for All Links

Source: https://docs.astro.build/en/reference/configuration-reference

Enable prefetching for all links on the site by default.

```javascript
prefetch: {
  prefetchAll: true
}
```

--------------------------------

### Astro Data Fetching with getCollection, import.meta.glob, and fetch

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs

Use `getCollection()` or `import.meta.glob()` for local data, and `fetch()` for remote data. Data requests are made in the frontmatter of Astro components using top-level await.

```javascript
import { getCollection } from 'astro:content';


// Get all `src/content/blog/` entries
const allBlogPosts = await getCollection('blog');


// Get all `src/pages/posts/` entries
const allPosts = Object.values(import.meta.glob('../pages/posts/*.md', { eager: true }));


const response = await fetch('https://randomuser.me/api/');
const data = await response.json();
const randomUser = data.results[0];
```

--------------------------------

### Import Prism Component from @astrojs/prism

Source: https://docs.astro.build/en/guides/upgrade-to/v1

Import the Prism component from the `@astrojs/prism` package. This component is bundled with Astro core and does not require a separate installation or integration.

```html
---
import { Prism } from '@astrojs/prism';
---

```

--------------------------------

### Enable experimental web frameworks support with npm

Source: https://docs.astro.build/en/guides/deploy/firebase

Enable experimental web frameworks support for the Firebase CLI using npm. This allows the CLI to better detect and configure frameworks like Astro.

```bash
npx firebase experiments:enable webframeworks
```

--------------------------------

### Set static application environment variables

Source: https://docs.astro.build/en/guides/deploy/clever-cloud

Configure build hooks and webroot for static Astro applications.

```bash
CC_POST_BUILD_HOOK="npm run build"
CC_PRE_BUILD_HOOK="npm install && npm run astro telemetry disable"
CC_WEBROOT="/dist"
```

```bash
CC_POST_BUILD_HOOK="pnpm build"
CC_PRE_BUILD_HOOK="npm install -g pnpm && pnpm install && pnpm run astro telemetry disable"
CC_WEBROOT="/dist"
```

```bash
CC_POST_BUILD_HOOK="yarn build"
CC_PRE_BUILD_HOOK="yarn && yarn run astro telemetry disable"
CC_WEBROOT="/dist"
```

--------------------------------

### Define Astro Image Service Configuration

Source: https://docs.astro.build/en/reference/image-service-reference

Configure the image service entrypoint and service-specific configuration in `astro.config.mjs`. This setup is essential for custom image processing.

```javascript
import {
  defineConfig
} from "astro/config";


export default defineConfig({
  image: {
    service: {
      entrypoint: "your-entrypoint", // 'astro/assets/services/sharp' | string,
      config: {
        // ... service-specific config. Optional.
      }
    }
  },
});
```

--------------------------------

### IntegrationResolvedRoute.pattern

Source: https://docs.astro.build/en/reference/integrations-reference

Allows identification of the route type based on its path. Examples include `/` for `src/pages/index.astro` and `/blog/[...slug]` for `src/pages/blog/[...slug].astro`.

```APIDOC
## `IntegrationResolvedRoute.pattern`

### Description
Allows you to identify the type of route based on its path.

### Type
`RouteData['route']`

### Example
Here are some examples of paths associated with their pattern:
  * `src/pages/index.astro` will be `/`
  * `src/pages/blog/[...slug].astro` will be `/blog/[...slug]`
  * `src/pages/site/[blog]/[...slug].astro` will be `/site/[blog]/[...slug]`
```

--------------------------------

### Configure remote database environment variables

Source: https://docs.astro.build/en/guides/astro-db

Set the remote URL and application token for database connectivity.

```bash
ASTRO_DB_REMOTE_URL=file://local-copy.db?encryptionKey=your-encryption-key&syncInterval=60&syncUrl=libsql%3A%2F%2Fyour.server.io
ASTRO_DB_APP_TOKEN=token-to-your-remote-url
```

--------------------------------

### Deploy Static Files with Azion CLI

Source: https://docs.astro.build/en/guides/deploy/azion

Deploy your built static files to Azion using the CLI. This command uploads your project assets to the Azion platform.

```bash
azion deploy
```

--------------------------------

### Migrate Astro.glob() to import.meta.glob()

Source: https://docs.astro.build/en/guides/upgrade-to/v5

Replace Astro.glob() with import.meta.glob() for querying files. Note that import.meta.glob() does not return a Promise.

```astro
---
const posts = await Astro.glob('./posts/*.md');
const posts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));
---


{posts.map((post) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}
```

--------------------------------

### Markdoc with Indented Tags Example

Source: https://docs.astro.build/en/guides/integrations-guide/markdoc

Demonstrates how Markdoc handles indented tags when `ignoreIndentation` is enabled. This allows for clearer visual structure in complex documents.

```markdoc
# Welcome to Markdoc with indented tags 👋


# Note: Can use either spaces or tabs for indentation


{% custom-tag %}
{% custom-tag %} ### Tags can be indented for better readability

    {% another-custom-tag %}
      This is easier to follow when there is a lot of nesting
    {% /another-custom-tag %}


{% /custom-tag %}
{% /custom-tag %}
```

--------------------------------

### Define Cache Hint Tags for Collection

Source: https://docs.astro.build/en/reference/content-loader-reference

Use `cacheHint.tags` to define string identifiers for fine-grained cache control. This example groups posts by author.

```javascript
return {
  /* ... */
  cacheHint: {
    tags: ["posts", `posts-${filter.author}`],
  },
};
```

--------------------------------

### Fetch All Posts Data

Source: https://docs.astro.build/en/tutorial/5-astro-api/3

Using import.meta.glob to retrieve data from all markdown blog posts.

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));
const pageTitle = "Tag Index";
---
```

--------------------------------

### Enable Dev Toolbar Preference

Source: https://docs.astro.build/en/reference/cli-reference

Enables the development toolbar in the browser.

```bash
astro preferences enable devToolbar
```

--------------------------------

### Astro Page Component Example

Source: https://docs.astro.build/en/install-and-setup

This is a basic Astro page component. The code between '---' is server-side logic, and the HTML below is the template. Includes basic styling.

```astro
---
// Welcome to Astro! Everything between these triple-dash code fences
// is your "component frontmatter". It never runs in the browser.
console.log('This runs in your terminal, not the browser!');
---
<!-- Below is your "component template." It's just HTML, but with
    some magic sprinkled in to help you build great templates. -->
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
<style>
  h1 {
    color: orange;
  }
</style>
```

--------------------------------

### Retrieve Locale Paths with toPaths()

Source: https://docs.astro.build/en/reference/modules/astro-i18n

Use the toPaths() utility to get an array of configured locale paths. This function extracts the 'path' property for each locale.

```javascript
import { i18n } from "astro:config/client";
import { toPaths } from "astro:i18n";


toPaths(i18n!.locales); // ["italiano", "es"]
```

--------------------------------

### Configure Adapter Entrypoint Resolution

Source: https://docs.astro.build/en/guides/upgrade-to/v6

Update setAdapter configuration to use entrypointResolution: 'auto' and remove deprecated exports and args.

```javascript

setAdapter({
  // ...
  entrypointResolution: 'auto',
  exports: ['handler'],
  args: { assets: config.build.assets }
})

```

--------------------------------

### Create a blog show template in Astro

Source: https://docs.astro.build/en/guides/cms/apostrophecms

Displays an individual blog post using the AposArea component to render widgets.

```astro
---
import AposArea from '@apostrophecms/apostrophe-astro/components/AposArea.astro';
import dayjs from 'dayjs';


const { page, piece } = Astro.props.aposData;
const { main } = piece;
---


<section class="bp-content">
  <h1>{ piece.title }</h1>
  <h3>Created by: { piece.authorName }
  <h4>
    Released On { dayjs(piece.publicationDate).format('MMMM D, YYYY') }
  </h4>
  <AposArea area={content} />
</section>
```

--------------------------------

### Build Astro Site with Verbose Logs using Yarn

Source: https://docs.astro.build/en/reference/cli-reference

This command builds the Astro site with verbose logging enabled for debugging, using the `build` script from `package.json`. Requires Yarn.

```bash
# build your site with verbose logs using the `build` script in `package.json`
yarn build --verbose

```

--------------------------------

### Initialize Contentful Client

Source: https://docs.astro.build/en/guides/cms/contentful

Create a reusable Contentful client instance in src/lib/contentful.ts that switches between preview and delivery hosts based on the environment.

```typescript
import * as contentful from "contentful";


export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
```

--------------------------------

### Check Node.js Version

Source: https://docs.astro.build/en/tutorial/1-setup/1

Run this command in your terminal to check if you have a compatible Node.js version installed. Astro requires even-numbered Node.js versions, with a minimum of v22.12.0.

```bash
node -v
```

```text
// Example output
v22.20.0
```

--------------------------------

### Deploy site to Firebase Hosting with npm

Source: https://docs.astro.build/en/guides/deploy/firebase

Build and deploy your Astro site to Firebase Hosting using npm. The `--only hosting` flag ensures only the hosting component is deployed.

```bash
npx firebase deploy --only hosting
```

--------------------------------

### Run Nightwatch Tests with Specific Browser

Source: https://docs.astro.build/en/guides/testing

Run Nightwatch tests against a specific browser environment (e.g., Firefox). Nightwatch can attempt to set up the browser if not installed.

```bash
npx nightwatch test/index.ts -e firefox

```

--------------------------------

### Package Homepage URL

Source: https://docs.astro.build/en/guides/integrations

Specify the URL for your project's homepage, which can link to online demos or documentation.

```json
{
  "homepage": "https://github.com/owner/project#readme"
}
```

--------------------------------

### SSRLoadedRendererValue.renderHydrationScript()

Source: https://docs.astro.build/en/reference/renderer-reference

Returns an HTML string to inject once per page before the first hydrated component handled by this renderer. This is useful for renderers that need page-level hydration setup.

```APIDOC
## SSRLoadedRendererValue.renderHydrationScript()

### Description
Returns an HTML string to inject once per page before the first hydrated component handled by this renderer. This is useful for renderers that need page-level hydration setup.

### Type
`() => string`

### Added in
`astro@4.1.0`
```

--------------------------------

### Enable Experimental Flags in Astro Config

Source: https://docs.astro.build/en/reference/experimental-flags

Add the `experimental` object to your `astro.config.js` file to enable experimental features. This setup is required before using any experimental flags.

```javascript
import { defineConfig } from 'astro/config';


export default defineConfig({
    experimental: {
        // enable experimental flags
        // to try out new features
    },
});

```

--------------------------------

### Implement custom swap using swapFunctions

Source: https://docs.astro.build/en/guides/view-transitions

Utilize utility functions from astro:transitions/client to recreate or modify the built-in swap logic.

```html
<script>
  import { swapFunctions } from "astro:transitions/client";


  // substitutes `window.document` with `doc`
  function mySwap(doc: Document) {
    swapFunctions.deselectScripts(doc);
    swapFunctions.swapRootAttributes(doc);
    swapFunctions.swapHeadElements(doc);
    const restoreFocusFunction = swapFunctions.saveFocus();
    swapFunctions.swapBodyElement(doc.body, document.body);
    restoreFocusFunction();
  }


  document.addEventListener("astro:before-swap", (event) => {
    event.swap = () => mySwap(event.newDocument);
  });
<script>
```

--------------------------------

### Fastify Middleware Integration

Source: https://docs.astro.build/en/guides/integrations-guide/node

Integrate Astro's SSR handler into a Fastify application using `@fastify/middie`. This setup includes static file serving configuration.

```javascript
import Fastify from 'fastify';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'node:url';
import { handler as ssrHandler } from './dist/server/entry.mjs';


const app = Fastify({ logger: true });


await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL('./dist/client', import.meta.url)),
  })
  .register(fastifyMiddie);
app.use(ssrHandler);


app.listen({ port: 8080 });

```

--------------------------------

### Accessing Props in .astro Components

Source: https://docs.astro.build/en/reference/api-reference

Access component attributes passed to an .astro file using `Astro.props`. This example shows how to destructure title and date from props.

```astro
---
const { title, date } = Astro.props;
---
<div>
  <h1>{title}</h1>
  <p>{date}</p>
</div>
```

--------------------------------

### Create a Markdown layout component

Source: https://docs.astro.build/en/basics/layouts

Use the frontmatter prop to access metadata and a slot to render the Markdown content.

```astro
---
// 1. The frontmatter prop gives access to frontmatter and other data
const { frontmatter } = Astro.props;
---
<html>
  <head>
    <!-- Add other Head elements here, like styles and meta tags. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <title>{frontmatter.title}</title>
  </head>
  <body>
    <!-- Add other UI components here, like common headers and footers. -->
    <h1>{frontmatter.title} by {frontmatter.author}</h1>
    <!-- 2. Rendered HTML will be passed into the default slot. -->
    <slot />
    <p>Written on: {frontmatter.date}</p>
  </body>
</html>
```

--------------------------------

### Common Data Type Validators

Source: https://docs.astro.build/en/reference/modules/astro-zod

Examples of using Zod validators to define schemas for various data types, including primitives, arrays, enums, and dates.

```APIDOC
## Common data type validators

With Zod, you can validate any type of data, such as primitives, objects, arrays and more.

The following example shows a cheatsheet of many common Zod data types to create a `user` schema:

```typescript
import { z } from 'astro/zod';


const user = z.object({
  username: z.string(),
  name: z.string().min(2),
  email: z.email(),
  role: z.enum(["admin", "editor"]),
  language: z.enum(["en", "fr", "es"])
    .default("en"),
  hobbies: z.array(z.string()),
  age: z.number(),
  isEmailConfirmed: z.boolean(),
  inscriptionDate: z.date(),
  website: z.url().optional(),
});
```
```

--------------------------------

### Chain middleware with sequence() and next()

Source: https://docs.astro.build/en/guides/middleware

Demonstrates how submitting a path to next() updates the Request in place for subsequent middleware functions in a sequence.

```javascript
// Current URL is https://example.com/blog


// First middleware function
async function first(context, next) {
  console.log(context.url.pathname) // this will log "/blog"
  // Rewrite to a new route, the homepage
  // Return updated `context` which is passed to next function
  return next("/")
}


// Current URL is still https://example.com/blog


// Second middleware function
async function second(context, next) {
  // Receives updated `context`
  console.log(context.url.pathname) // this will log  "/"
  return next()
}


export const onRequest = sequence(first, second);
```

--------------------------------

### Create a file system-based remark plugin

Source: https://docs.astro.build/en/recipes/modified-time

An alternative remark plugin that uses the file system's modification time.

```javascript
import { statSync } from "fs";


export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = statSync(filepath);
    file.data.astro.frontmatter.lastModified = result.mtime.toISOString();
  };
}
```

--------------------------------

### Custom Image API Endpoint

Source: https://docs.astro.build/en/reference/image-service-reference

Example of an Astro API route that serves as a custom image endpoint. This endpoint uses `getConfiguredImageService` to process images at runtime.

```APIDOC
## Custom Image API Endpoint

### Description
This Astro API route (`GET /_image` by default) handles image requests at runtime. It retrieves the configured image service, parses the request URL to get image transformation options, transforms the image, and returns it with the appropriate content type.

### Method
GET

### Endpoint
`/_image` (or a custom endpoint defined in `astro.config.mjs`)

### Parameters
#### Path Parameters
N/A

#### Query Parameters
These are parsed by the image service's `parseURL` method. Common parameters include:
- **href** (string) - The source path of the image.
- **w** (number) - The desired width of the image.
- **h** (number) - The desired height of the image.
- **q** (number) - The desired quality of the image.
- **f** (string) - The desired format of the image (e.g., 'png', 'jpeg').

#### Request Body
N/A

### Request Example
`GET /_image?href=/path/to/image.jpg&w=300&q=80`

### Response
#### Success Response (200)
- **data** (Uint8Array) - The transformed image binary data.
- **format** (string) - The format of the returned image (e.g., 'image/png', 'image/jpeg').

#### Response Example
(Binary image data)
```

--------------------------------

### Define Astro Middleware with Non-Serializable Locals

Source: https://docs.astro.build/en/reference/errors/locals-not-serializable

This example demonstrates the incorrect usage that leads to the `LocalsNotSerializable` error. Avoid storing functions or other non-serializable objects in `context.locals`.

```javascript
import {defineMiddleware} from "astro/middleware";
export const onRequest = defineMiddleware((context, next) => {
  context.locals = {
    foo() {
      alert("Hello world!")
    }
  };
  return next();
});

```

--------------------------------

### StaticPaths Class

Source: https://docs.astro.build/en/reference/modules/astro-static-paths

Initializes a StaticPaths instance to collect prerenderable routes from an Astro app.

```APIDOC
## Class: StaticPaths

### Description
Allows adapters to collect all paths that need to be prerendered from within their target runtime.

### Constructor
`new StaticPaths(app)`

#### Parameters
- **app** (App) - Required - An instance of the Astro app created via `createApp()`.

### Usage Example
```javascript
import { createApp } from 'astro/app/entrypoint';
import { StaticPaths } from 'astro:static-paths';

const app = createApp();
const staticPaths = new StaticPaths(app);
```
```

--------------------------------

### Conditionally Rewrite Based on HTTP Response Status

Source: https://docs.astro.build/en/guides/routing

Use the onRequest middleware to conditionally rewrite a response. This example rewrites to the homepage if the response status is 404.

```javascript
export const onRequest = async (context, next) => {
  const response = await next();
  if (response.status === 404) {
    return context.rewrite("/");
  }
  return response;
}
```

--------------------------------

### Implement dynamic routes with getStaticPaths

Source: https://docs.astro.build/en/guides/routing

Export getStaticPaths to define parameters for dynamic routes in SSG mode.

```astro
---
export function getStaticPaths() {
  return [
    { params: { dog: "clifford" }},
    { params: { dog: "rover" }},
    { params: { dog: "spot" }},
  ];
}


const { dog } = Astro.params;
---
<div>Good dog, {dog}!</div>
```

```astro
---
export function getStaticPaths() {
  return [
    { params: { lang: "en", version: "v1" }},
    { params: { lang: "fr", version: "v2" }},
  ];
}


const { lang, version } = Astro.params;
---
```

--------------------------------

### Toolbar App Initialization

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

Defines the basic structure for a Dev Toolbar app, including initialization logic.

```APIDOC
## POST /api/toolbar/app

### Description
Initializes a new Astro Dev Toolbar application.

### Method
POST

### Endpoint
/api/toolbar/app

### Request Body
- **appConfig** (object) - Required - Configuration object for the toolbar app.
  - **init** (function) - Required - Function to initialize the app.
  - **beforeTogglingOff** (function) - Optional - Function called before the app is toggled off.

### Request Example
```json
{
  "appConfig": {
    "init": "(canvas, app) => { ... }",
    "beforeTogglingOff": "() => { return true; }"
  }
}
```

### Response
#### Success Response (200)
- **status** (string) - Indicates the success of the operation.

#### Response Example
```json
{
  "status": "App initialized successfully"
}
```
```

--------------------------------

### Get session data

Source: https://docs.astro.build/en/reference/api-reference

Retrieve a value from the session using its key. Returns undefined if the key does not exist. Ensure session storage is configured and the route is not prerendered.

```javascript
--- 
const cart = await Astro.session?.get('cart');
---
<button>🛒 {cart?.length}</button>
```

```javascript
import type { APIContext } from 'astro';


export async function GET({ session }: APIContext) {
  const cart = await session.get('cart');
  return Response.json({ cart });
}
```

--------------------------------

### Create and Configure Select Element

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

Creates an `astro-dev-toolbar-select` component and populates it with options. It demonstrates how to set the `selectStyle` property and attach an event listener to handle changes.

```javascript
const mySelect = document.createElement("astro-dev-toolbar-select");
const options = [
  { label: "First option", value: "first" },
  { label: "Second option", value: "second", isDefault: true },
];
const myOptions = options.map((option) => {
  const optionEl = document.createElement("option");
  optionEl.textContent = option.label;
  optionEl.setAttribute("value", option.value);
  optionEl.selected = option.isDefault || false;
  return optionEl;
});


mySelect.selectStyle = "green";
mySelect.append(...myOptions);


mySelect.element.addEventListener("change", (evt) => {
  if (evt.currentTarget instanceof HTMLSelectElement) {
    console.log(`The select value is now ${evt.currentTarget.value}!`);
  }
});
```

--------------------------------

### Configure CSP scriptDirective hashes

Source: https://docs.astro.build/en/reference/configuration-reference

Provide additional SHA hashes for the `script-src` directive. Hashes must start with `sha384-`, `sha512-`, or `sha256-`. These are added to all pages.

```javascript
import { defineConfig } from 'astro/config';


export default defineConfig({
  security: {
    csp: {
      scriptDirective: {
        hashes: [
          "sha384-scriptHash",
          "sha512-scriptHash",
          "sha256-scriptHash"
        ]
      }
    }
  }
});
```

--------------------------------

### Add Watch File to Dev Server

Source: https://docs.astro.build/en/reference/integrations-reference

Demonstrates using `addWatchFile` to make the Astro dev server reload when a specific configuration file changes. Ensure paths are absolute.

```javascript
// Must be an absolute path!
addWatchFile('/home/user/.../my-config.json');
addWatchFile(new URL('./ec.config.mjs', config.root));

```

--------------------------------

### Add Additional Style Hashes to CSP

Source: https://docs.astro.build/en/reference/configuration-reference

Provides a list of additional hashes to be included in the style-src directive. Ensure hashes start with 'sha384-', 'sha512-', or 'sha256-'.

```javascript
import { defineConfig } from 'astro/config';


export default defineConfig({
  security: {
    csp: {
      styleDirective: {
        hashes: [
          "sha384-styleHash",
          "sha512-styleHash",
          "sha256-styleHash"
        ]
      }
    }
  }
});
```

--------------------------------

### Collect static paths with StaticPaths.getAll()

Source: https://docs.astro.build/en/reference/modules/astro-static-paths

Use the getAll method to retrieve all paths that should be prerendered, typically within an adapter handler.

```javascript
import { StaticPaths } from 'astro:static-paths';


export function createHandler(app) {
  return async (request) => {
    const { pathname } = new URL(request.url);


    // Endpoint to collect static paths during build
    if (pathname === '/__astro_static_paths') {
      const staticPaths = new StaticPaths(app);
      const paths = await staticPaths.getAll();
      // Returns array of { pathname: string, route: RouteData }
      return new Response(JSON.stringify({ paths }));
    }


    // ... handle other requests
  };
}
```

--------------------------------

### Add remark-toc and rehype-accessible-emojis Plugins

Source: https://docs.astro.build/en/guides/markdown-content

Configure Astro to use remark-toc for generating a table of contents and rehype-accessible-emojis for accessible emoji labels. Ensure these plugins are installed separately.

```javascript
import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';


export default defineConfig({
  markdown: {
    remarkPlugins: [ [remarkToc, { heading: 'toc', maxDepth: 3 } ] ],
    rehypePlugins: [rehypeAccessibleEmojis],
  },
});
```

--------------------------------

### Add Vercel Adapter for Astro

Source: https://docs.astro.build/en/guides/deploy/vercel

Use this command to install the Vercel adapter and configure your Astro project for on-demand rendering. This command automatically updates your astro.config.mjs file.

```bash
npx astro add vercel
```

```bash
pnpm astro add vercel
```

```bash
yarn astro add vercel
```

--------------------------------

### Configure Amplify for Yarn Build

Source: https://docs.astro.build/en/guides/deploy/aws

Use this configuration for Yarn projects deploying a static Astro site with AWS Amplify. It specifies Yarn installation and build commands.

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - yarn install
    build:
      commands:
        - yarn build
  artifacts:
    baseDirectory: /dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

--------------------------------

### Scaffold Astro Project with Juno using Yarn

Source: https://docs.astro.build/en/guides/deploy/juno

Creates a new Astro project pre-configured with Juno using Yarn. This command scaffolds a website with a ready-made Astro template.

```bash
yarn create juno -- --template astro-starter
```

--------------------------------

### Configure Amplify for pnpm Build

Source: https://docs.astro.build/en/guides/deploy/aws

This configuration is for pnpm projects deploying a static Astro site via AWS Amplify. It includes pnpm installation and store configuration.

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm i -g pnpm
        - pnpm config set store-dir .pnpm-store
        - pnpm i
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: /dist
    files:
      - '**/*'
  cache:
    paths:
      - .pnpm-store/**/*
```

--------------------------------

### Import a local stylesheet

Source: https://docs.astro.build/en/guides/styling

Use ESM import syntax at the top of the component frontmatter to include local CSS or preprocessor files.

```astro
---
// Astro will bundle and optimize this CSS for you automatically
// This also works for preprocessor files like .scss, .styl, etc.
import '../styles/utils.css';
---
<html><!-- Your page here --></html>
```

--------------------------------

### Astro Session Storage with Cloudflare Workers KV

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Example of accessing user session data using Astro.session.get(). This requires Cloudflare adapter configuration for Workers KV.

```javascript
export const prerender = false;
const cart = await Astro.session?.get('cart');

```

--------------------------------

### Define a Custom Astro Loader

Source: https://docs.astro.build/en/reference/content-loader-reference

Example of creating a custom Astro loader that can optionally process webhook data from refreshContextData. Ensure to import necessary types and functions.

```typescript
import type { Loader } from "astro/loaders";
import { processWebhook } from "./lib/webhooks";


export function myLoader(options: { url: string }) {
  return {
    name: "my-loader",
    load: async ({ refreshContextData, store, logger }) => {
      if(refreshContextData?.webhookBody) {
        logger.info("Webhook triggered with body");
        processWebhook(store, refreshContextData.webhookBody);
      }
      // ...
    },
  } satisfies Loader;
}
```

--------------------------------

### PreviewServerParams Configuration

Source: https://docs.astro.build/en/reference/adapter-reference

Details the available parameters for configuring the preview server when developing an Astro adapter.

```APIDOC
## PreviewServerParams

### Description
Parameters for configuring the preview server.

### Properties

- **base** (`string`)
  Specifies the configured base path to deploy to.

- **logger** (`AstroIntegrationLogger`)
  Defines an instance of the Astro logger that can be used to write logs when the preview server is running.

- **headers** (`OutgoingHttpHeaders | undefined`)
  Describes the configured HTTP response headers.

- **allowedHosts** (`string[] | true | undefined`)
  **Added in:** `astro@6.2.0`
  Describes the configured allowed hosts that the preview server should respond to.

- **root** (`URL`)
  Specifies the configured root directory of the project.
```

--------------------------------

### Render content to the toolbar canvas

Source: https://docs.astro.build/en/recipes/making-toolbar-apps

Access the ShadowRoot via the canvas property to append DOM elements. This example displays a random motivational message upon initialization.

```typescript
import { defineToolbarApp } from "astro/toolbar";


const motivationalMessages = [
  "You're doing great!",
  "Keep up the good work!",
  "You're awesome!",
  "You're a star!",
];


export default defineToolbarApp({
    init(canvas) {
      const h1 = document.createElement('h1');
      h1.textContent = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];


      canvas.append(h1);
    },
});
```

--------------------------------

### Configure Babel Options for Preact Integration

Source: https://docs.astro.build/en/guides/integrations-guide/preact

Pass additional Babel configuration options to the Preact Vite plugin to customize transformations. This example shows how to load `.babelrc`.

```javascript
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';


export default defineConfig({
  integrations: [
    preact({
      babel: {
        babelrc: true,
      },
    }),
  ],
});

```

--------------------------------

### render()

Source: https://docs.astro.build/en/reference/modules/astro-content

Compiles a given entry for rendering.

```APIDOC
## render()

### Description
A function to compile a given entry for rendering.

### Parameters
- **entry** (CollectionEntry) - Required - The entry to render.

### Response
- **Content** (Component) - A component used to render the document’s contents.
- **headings** (Array) - A generated list of headings.
- **remarkPluginFrontmatter** (any) - The modified frontmatter object.
```

--------------------------------

### Define a Live Content Collection with a Custom Loader

Source: https://docs.astro.build/en/reference/modules/astro-content

Configure a live content collection using `defineLiveCollection`. Use a custom `loader` (e.g., `storeLoader`) to fetch data at runtime from a remote source.

```javascript
import { defineLiveCollection } from 'astro:content';
import { storeLoader } from '@example/astro-loader';


const products = defineLiveCollection({
  loader: storeLoader({
    apiKey: process.env.STORE_API_KEY,
    endpoint: 'https://api.example.com/v1',
  }),
});


// Expose your defined collection to Astro
// with the `collections` export
export const collections = { products };
```

--------------------------------

### Handle import.meta.env to process.env transformation in Astro

Source: https://docs.astro.build/en/guides/upgrade-to/v6

If relying on the transformation of import.meta.env to process.env, update your project code to apply it manually. This example shows how to access environment variables.

```javascript
const enabled: boolean = import.meta.env.DB_PASSWORD;
const enabled: boolean = process.env.DB_PASSWORD;
```

--------------------------------

### Toggle an integration conditionally

Source: https://docs.astro.build/en/guides/integrations

Falsy integrations are ignored, so you can toggle integrations on & off without worrying about left-behind `undefined` and boolean values. Example: Skip building a sitemap on Windows.

```javascript
integrations: [
  // Example: Skip building a sitemap on Windows
  process.platform !== 'win32' && sitemap()
]
```

--------------------------------

### Pass Children to React/Preact/Solid Components

Source: https://docs.astro.build/en/guides/framework-components

Pass content as children to framework components using the `children` prop. This example shows passing a paragraph to a React sidebar component.

```astro
---
import MyReactSidebar from '../components/MyReactSidebar.jsx';
---
<MyReactSidebar>
  <p>Here is a sidebar with some text and a button.</p>
</MyReactSidebar>

```

--------------------------------

### Import a custom Shiki theme

Source: https://docs.astro.build/en/guides/syntax-highlighting

Load a custom Shiki theme from a local JSON file in the Astro configuration.

```javascript
import { defineConfig } from 'astro/config';
import customTheme from './my-shiki-theme.json';


export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: customTheme,
    },
  },
});
```

--------------------------------

### `response`

Source: https://docs.astro.build/en/reference/api-reference

`response` is a standard `ResponseInit` object. It has the following structure.

```APIDOC
## `response`

### Description
Allows modification of the response status, status text, and headers.

### Properties
- `status` (number) - The numeric status code of the response.
- `statusText` (string) - The status message associated with the status code.
- `headers` (Headers) - A `Headers` instance for setting HTTP headers.

### Usage
```astro
--- 
if (condition) {
  Astro.response.status = 404;
  Astro.response.statusText = 'Not found';
}
---
```

### Setting Headers
```astro
--- 
Astro.response.headers.set('Set-Cookie', 'a=b; Path=/;');
---
```
```

--------------------------------

### Define Astro DB Schema

Source: https://docs.astro.build/en/guides/astro-db

Define your Astro DB schema using defineDb, defineTable, and column. This example sets up a 'Pets' table with 'name' and 'species' columns.

```typescript
import { defineDb, defineTable, column } from 'astro:db';


export const Pets = defineTable({
  columns: {
    name: column.text(),
    species: column.text(),
  },
});


export default defineDb({ tables: { Pets } });
```

--------------------------------

### Configure Tina Schema for Posts

Source: https://docs.astro.build/en/guides/cms/tina-cms

Define your Tina CMS collections and fields in the `.tina/config.ts` file. This example adds a 'title', 'posted' date, and 'body' to the 'Posts' collection.

```typescript
import {
  defineConfig,
} from "tinacms";


// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";


export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "posts",
        label: "Posts",
        path: "src/content/posts",
        format: 'mdx',
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "posted",
            label: "Date Posted",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});

```

--------------------------------

### Configure Zed AI MCP Server

Source: https://docs.astro.build/en/guides/build-with-ai

Add the Astro Docs MCP server to Zed's settings.json for AI capabilities.

```json
{
   "context_servers": {
     "Astro docs": {
       "settings": {},
       "enabled": true,
       "url": "https://mcp.docs.astro.build/mcp"
     }
   }
}
```

--------------------------------

### SSRManifest Properties

Source: https://docs.astro.build/en/reference/integrations-reference

Contains build configuration and project metadata for server adapters.

```APIDOC
### `SSRManifest`
**Type:** `An object containing build configuration and project metadata that the server adapters use at runtime to serve on-demand rendered pages.`
#### `SSRManifest.adapterName`
**Type:** `string`
Defines the name of the server adapter used for on-demand rendering.

#### `SSRManifest.routes`
**Type:** `RouteInfo[]`
A list of information about the routes available in this project. Each entry contains the following properties.
##### `RouteInfo.routeData`
**Type:** `RouteData`
An object describing known information about a route.
```

--------------------------------

### Configure Vite SSR for Monorepo Dependencies in Astro

Source: https://docs.astro.build/en/guides/troubleshooting

In a monorepo, manually add Astro-related dependencies to the 'vite.ssr.noExternal' array in your Astro config. This ensures proper installation and bundling of these dependencies.

```javascript
import { defineConfig } from 'astro/config'
export default defineConfig({
  vite: {
    ssr: {
      noExternal: [
        '@astrojs/vue',
        'astro-component-lib',
      ]
    }
  }
})

```

--------------------------------

### Run Astro commands with different modes

Source: https://docs.astro.build/en/guides/environment-variables

Use the --mode flag to load specific .env files for different environments like staging or testing.

```bash

# Run the dev server connected to a "staging" API
npm run astro dev -- --mode staging


# Build a site that connects to a "production" API with additional debug information
npm run astro build -- --devOutput


# Build a site that connects to a "testing" API
npm run astro build -- --mode testing

```

```bash

# Run the dev server connected to a "staging" API
pnpm astro dev --mode staging


# Build a site that connects to a "production" API with additional debug information
pnpm astro build --devOutput


# Build a site that connects to a "testing" API
pnpm astro build --mode testing

```

```bash

# Run the dev server connected to a "staging" API
yarn astro dev --mode staging


# Build a site that connects to a "production" API with additional debug information
yarn astro build --devOutput


# Build a site that connects to a "testing" API
yarn astro build --mode testing

```

--------------------------------

### Build Astro Project Locally

Source: https://docs.astro.build/en/guides/deploy/azion

Execute your project's build command locally before deploying. This command compiles your Astro project for production.

```bash
azion build
```

--------------------------------

### Access Vite Configuration in Astro Integration

Source: https://docs.astro.build/en/reference/integrations-reference

Retrieve Vite configuration options like `publicDir` and `root` within the `astro:build:setup` hook to inspect or utilize them in your integration.

```javascript
export default {
  name: 'my-integration',
  hooks: {
    'astro:build:setup': ({ vite }) => {
      const { publicDir, root } = vite;
    },
  }
}
```

--------------------------------

### PreviewServer Interface

Source: https://docs.astro.build/en/reference/programmatic-reference

Defines the structure and methods for Astro's preview server.

```APIDOC
## `PreviewServer` Interface

### Interface
```typescript
export interface PreviewServer {
  host?: string;
  port: number;
  closed(): Promise<void>;
  stop(): Promise<void>;
}
```
```

--------------------------------

### Specify Entrypoint in `wrangler.jsonc`

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

Shows how to specify a custom worker entrypoint in the `wrangler.jsonc` file.

```json
{
  "main": "./src/worker.ts"
}
```

--------------------------------

### Astro Client Directive Type Declaration

Source: https://docs.astro.build/en/reference/integrations-reference

Example of augmenting Astro's built-in types to include a custom client directive, enabling type checking for 'client:click'.

```typescript
import 'astro'
declare module 'astro' {
  interface AstroClientDirectives {
    'client:click'?: boolean
  }
}

```

--------------------------------

### Add Rehype Plugins for HTML Processing

Source: https://docs.astro.build/en/reference/configuration-reference

Incorporate rehype plugins to further process the HTML output generated from Markdown. Example demonstrates adding 'rehypeAccessibleEmojis' for accessible emoji rendering.

```javascript
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
{
  markdown: {
    rehypePlugins: [rehypeAccessibleEmojis]
  }
}

```

--------------------------------

### Add Integrations to Astro

Source: https://docs.astro.build/en/reference/configuration-reference

Extend Astro's functionality by adding integrations for frameworks like React or features like MDX. This example adds both React and MDX support.

```javascript
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
{
  // Example: Add React + MDX support to Astro
  integrations: [react(), mdx()]
}
```

--------------------------------

### Use Custom Markdoc Tag in Content

Source: https://docs.astro.build/en/guides/integrations-guide/markdoc

Example of using a custom 'aside' Markdoc tag within Markdoc content. Children are passed to the component's default slot.

```markdoc
# Welcome to Markdoc 👋


{% aside type="tip" %}


Use tags like this fancy "aside" to add some _flair_ to your docs.


{% /aside %}
```

--------------------------------

### Watch for File Changes with LoaderContext.watcher

Source: https://docs.astro.build/en/reference/content-loader-reference

In dev mode, `watcher` provides a filesystem watcher to trigger updates. This example sets up a watcher to reload data from a file path when it changes.

```javascript
return {
  name: 'file-loader',
  load: async ({ config, store, watcher }) => {
    const url = new URL(fileName, config.root);
    const filePath = fileURLToPath(url);
    await syncData(filePath, store);


    watcher?.on('change', async (changedPath) => {
      if (changedPath === filePath) {
        logger.info(`Reloading data from ${fileName}`);
        await syncData(filePath, store);
      }
    });
  },
};
```

--------------------------------

### Import MDX Posts with Astro.glob()

Source: https://docs.astro.build/en/guides/upgrade-to/v1

Use `Astro.glob()` to import multiple MDX files from a directory. The imported posts can then be mapped to render their default export.

```javascript
---// Multiple imports with Astro.glob
const mdxPosts = await Astro.glob('./posts/*.mdx');
---


{mdxPosts.map(Post => <Post.default />)}
```

--------------------------------

### Define Content Collections in Astro

Source: https://docs.astro.build/en/recipes/i18n

Configure content collections in `src/content.config.ts` to manage your site's content. This example defines a 'blog' collection with a schema for title, author, and date.

```typescript
import {
  defineCollection,
} from 'astro:content';
import { z } from 'astro/zod';


const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.date()
  })
});


export const collections = {
  'blog': blogCollection
};

```

--------------------------------

### experimental_AstroContainer.create()

Source: https://docs.astro.build/en/reference/container-reference

Creates a new instance of the Astro container to enable component rendering.

```APIDOC
## create()

### Description
Creates a new instance of the container for rendering Astro components.

### Parameters
#### Request Body
- **options** (AstroContainerOptions) - Optional - Configuration object for the container.
  - **streaming** (boolean) - Optional - Enables rendering components using HTML streaming. Default: false.
  - **renderers** (AddServerRenderer[]) - Optional - A list of loaded client renderers required by the component (e.g., React, Vue, Svelte, MDX). Default: [].

### Request Example
```javascript
import { experimental_AstroContainer } from "astro/container";
const container = await experimental_AstroContainer.create({ streaming: false });
```

### Response
#### Success Response (200)
- **container** (experimental_AstroContainer) - The initialized container instance.
```

--------------------------------

### Handle import.meta.env value coercion in Astro

Source: https://docs.astro.build/en/guides/upgrade-to/v6

If relying on coercion for import.meta.env values, update your project code to apply it manually. This example shows how to handle boolean and string coercion.

```javascript
const enabled: boolean = import.meta.env.ENABLED;
const enabled: boolean = import.meta.env.ENABLED === "true";
```

--------------------------------

### Display Collection List in Astro

Source: https://docs.astro.build/en/guides/cms/keystatic

Query and display a list of posts from the 'posts' collection in Astro. This example maps over the posts to create a list with links to individual post pages.

```astro
---
import { getCollection } from 'astro:content'


const posts = await getCollection('posts')
---
<ul>
  {#each posts as post}
    <li>
      <a href={`/posts/${post.id}`}>{post.data.title}</a>
    </li>
  {#/each}
</ul>
```

--------------------------------

### Initialize getStaticPaths for Drupal articles

Source: https://docs.astro.build/en/guides/cms/drupal

Sets up the basic structure for fetching articles within the getStaticPaths function in an Astro dynamic route file.

```typescript
---
import {Jsona} from "jsona";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import type {TJsonApiBody} from "jsona/lib/JsonaTypes";


import type { DrupalNode } from "../../types";
import {getArticles} from "../../api/drupal";


// Get all published articles.
export async function getStaticPaths() {
  const articles = await getArticles();
}
---
```

--------------------------------

### Import SVG as URL String

Source: https://docs.astro.build/en/guides/upgrade-to/v3

Append `?url` to your SVG import path to get a string representation of the image's URL, useful for development and when a URL string is required.

```astro
---
import Sprite from '../assets/logo.svg?url';
---


<svg>
  <use xlink:href={Sprite + '#cart'} />
</svg>
```

--------------------------------

### Generate static paths for articles

Source: https://docs.astro.build/en/guides/cms/strapi

Implement getStaticPaths to fetch all articles and generate routes based on their slugs.

```astro
---
import fetchApi from '../../lib/strapi';
import type Article from '../../interfaces/article';


export async function getStaticPaths() {
  const articles = await fetchApi<Article[]>({
    endpoint: 'articles',
    wrappedByKey: 'data',
  });


  return articles.map((article) => ({
    params: { slug: article.slug },
    props: article,
  }));
}
type Props = Article;


const article = Astro.props;
---
```

--------------------------------

### Importing Components with Named Imports

Source: https://docs.astro.build/en/guides/integrations

Demonstrates how to import and use Astro and React components from your package using named imports in an Astro file.

```astro
---
import { MyAstroComponent } from 'my-component';
import { MyReactComponent } from 'my-component';
---
<MyAstroComponent />
<MyReactComponent />
```

--------------------------------

### Sign Out User Endpoint in Astro

Source: https://docs.astro.build/en/guides/backend/supabase

Handles GET requests to sign out a user by deleting session cookies. Ensure `export const prerender = false;` if using `output: 'static'`.

```typescript
// With `output: 'static'` configured:
// export const prerender = false;
import type { APIRoute } from "astro";


export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  return redirect("/signin");
};

```

--------------------------------

### Provide Renderer Hint for client:only

Source: https://docs.astro.build/en/reference/errors/no-client-only-hint

When using `client:only`, specify the renderer (e.g., 'react') to ensure Astro uses the correct one. This is necessary because the component does not run on the server.

```html
<SomeReactComponent client:only="react" />
```

--------------------------------

### Register a Renderer in Astro Integration

Source: https://docs.astro.build/en/reference/renderer-reference

Register a custom renderer by calling `addRenderer()` within the `astro:config:setup` hook of an Astro integration. This specifies the server and client entrypoints for the renderer.

```javascript
export default function createIntegration() {
  return {
    name: "@example/my-renderer",
    hooks: {
      "astro:config:setup": ({ addRenderer }) => {
        addRenderer({
          name: "@example/my-renderer",
          clientEntrypoint: "@example/my-renderer/client.js",
          serverEntrypoint: "@example/my-renderer/server.js",
        });
      },
    },
  };
}
```

--------------------------------

### Package Exports Configuration

Source: https://docs.astro.build/en/guides/integrations

Define the entry points for your package, specifying which files are used when the package is imported directly or via specific paths.

```json
{
  "exports": {
    ".": "./index.js",
    "./astro": "./MyAstroComponent.astro",
    "./react": "./MyReactComponent.jsx"
  }
}
```

--------------------------------

### Receive Message on Server from Client

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

Use `toolbar.on()` in the `astro:server:setup` hook to listen for messages sent from your client-side toolbar app. The callback receives the data payload from the client.

```javascript
'astro:server:setup': ({ toolbar }) => {
  toolbar.on('my-app:my-message', (data) => {
    console.log(data.message);
  });
},
```

--------------------------------

### Create React Auth Client

Source: https://docs.astro.build/en/guides/authentication

Create a React authentication client by importing `createAuthClient` from 'better-auth/react'. This client provides `signIn` and `signOut` functions.

```typescript
import { createAuthClient } from 'better-auth/react';


export const authClient = createAuthClient();


export const {signIn, signOut } = authClient;

```

--------------------------------

### Import Astro Components

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby

Astro requires explicit file extensions for imports, such as .astro files.

```astro
---
import Card from `../../components/Card.astro`;
---
<Card />
```

--------------------------------

### Add Remark Plugins for Markdown Processing

Source: https://docs.astro.build/en/reference/configuration-reference

Integrate custom remark plugins to modify how Markdown content is processed during the build. Example shows adding 'remark-toc' for table of contents generation.

```javascript
import remarkToc from 'remark-toc';
{
  markdown: {
    remarkPlugins: [ [remarkToc, { heading: "contents"} ] ]
  }
}

```

--------------------------------

### Create a basic Astro page

Source: https://docs.astro.build/en/basics/astro-pages

Astro pages must produce a full HTML document, though Astro will inject default head content if missing.

```astro
---
---
<html lang="en">
  <head>
    <title>My Homepage</title>
  </head>
  <body>
    <h1>Welcome to my website!</h1>
  </body>
</html>
```

--------------------------------

### Setting default title in middleware using locals

Source: https://docs.astro.build/en/reference/api-reference

Middleware can set default values on the `locals` object. This example ensures `locals.title` is set to 'Default Title' if it's not already defined.

```typescript
import type { MiddlewareHandler } from 'astro';


export const onRequest: MiddlewareHandler = ({ locals }, next) => {
  if (!locals.title) {
    locals.title = "Default Title";
  }
  return next();
}
```

--------------------------------

### Implement Memory Session Driver

Source: https://docs.astro.build/en/reference/session-driver-reference

Implement the runtime logic for a memory session driver using an LRUCache. This example defines the setItem, getItem, and removeItem functions required by the SessionDriver interface.

```typescript
import type { SessionDriver } from 'astro'
import type { Config } from './config'
import { LRUCache } from 'lru-cache'


export default function(config: Config): SessionDriver {
    const cache = new LRUCache({ max: config.max })
    return {
        setItem: async (key, value) => {
            cache.set(key, value)
        },
        getItem: async (key) => {
            return cache.get(key)
        },
        removeItem: async (key) => {
            cache.delete(key)
        },
    }
}
```

--------------------------------

### Register Custom Memory Session Driver in Astro Config

Source: https://docs.astro.build/en/reference/session-driver-reference

Register a custom memory session driver in your Astro configuration file. This example demonstrates importing and using the memoryDriver function.

```javascript
import { defineConfig } from 'astro/config'
import { memoryDriver } from './driver/config'


export default defineConfig({
    session: {
        driver: memoryDriver({
            max: 500
        })
    }
})
```

--------------------------------

### Define Memory Session Driver Config

Source: https://docs.astro.build/en/reference/session-driver-reference

Define the configuration for a custom memory session driver, including its entrypoint and serializable configuration. This example shows how to export a function that returns the SessionDriverConfig.

```typescript
import type { SessionDriverConfig } from 'astro'


export interface Config {
    max?: number;
}


export function memoryDriver(config: Config = {}): SessionDriverConfig {
    return {
        entrypoint: new URL('./runtime.js', import.meta.url),
        config,
    }
}
```

--------------------------------

### Utilize Cache Hints for Live Collection Data

Source: https://docs.astro.build/en/reference/modules/astro-content

Obtain cache hints from getLiveCollection for a 'products' collection and use them with Astro.cache.set() to manage caching strategies. This example shows setting a maxAge.

```typescript
---
import { getLiveCollection } from 'astro:content';
export const prerender = false; // Not needed in 'server' mode


const { cacheHint } = await getLiveCollection('products');


if (cacheHint) {
  Astro.cache.set(cacheHint);
}
Astro.cache.set({ maxAge: 600 });
---
```

--------------------------------

### Configure Shiki Syntax Highlighting Extension

Source: https://docs.astro.build/en/guides/integrations-guide/markdoc

Extend Markdoc configuration with the Shiki syntax highlighting extension. Options for theme, word wrap, and custom languages can be provided.

```typescript
import { defineMarkdocConfig } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';


export default defineMarkdocConfig({
  extends: [
    shiki({
      // Choose from Shiki's built-in themes (or add your own)
      // Default: 'github-dark'
      // https://shiki.style/themes
      theme: 'dracula',
      // Enable word wrap to prevent horizontal scrolling
      // Default: false
      wrap: true,
      // Pass custom languages
      // Note: Shiki has countless langs built-in, including `.astro`!
      // https://shiki.style/languages
      langs: [],
    }),
  ],
});
```

--------------------------------

### Configure custom font fallbacks in Astro

Source: https://docs.astro.build/en/guides/fonts

Define custom font fallbacks in Astro to ensure a consistent appearance when the primary font is unavailable. This example sets 'Cousine' with a 'monospace' fallback.

```javascript
import { defineConfig, fontProviders } from "astro/config";


export default defineConfig({
  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Cousine",
    cssVariable: "--font-cousine",
    fallbacks: ["monospace"]
  }]
});
```

--------------------------------

### Configure Server-Side Rendering Output Directory

Source: https://docs.astro.build/en/reference/configuration-reference

Set the `build.server` directory relative to `outDir` for server JavaScript when building for SSR.

```javascript
{
  build: {
    server: './server'
  }
}
```

--------------------------------

### Register custom font in Tailwind CSS

Source: https://docs.astro.build/en/guides/fonts

Update your Tailwind configuration to register a custom font after it has been configured and added to your page head. This example shows how to use a CSS variable for the font.

```css
@import "tailwindcss";


@theme inline {
  --font-sans: var(--font-roboto);
}
```

--------------------------------

### Include Additional Files with Netlify Adapter

Source: https://docs.astro.build/en/guides/integrations-guide/netlify

Specify additional files to bundle with your function using `includeFiles`. This is useful for data, configuration, or template files not automatically detected. Paths are relative to your project's `root`.

```javascript
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';


export default defineConfig({
  // ...
  adapter: netlify({
    includeFiles: ['./my-data.json'], // relative to `root`
  }),
});
```

--------------------------------

### Generate Content Digests with LoaderContext.generateDigest()

Source: https://docs.astro.build/en/reference/content-loader-reference

Use `generateDigest` to create a non-cryptographic content digest for an object or string. This example generates a digest for parsed data and stores it along with the data and ID.

```typescript
import type { Loader } from "astro/loaders";
import { loadFeed } from "./feed.js";


export function feedLoader({ url }) {
  const feedUrl = new URL(url);
  return {
    name: "feed-loader",
    load: async ({ store, logger, parseData, meta, generateDigest }) => {
      logger.info("Loading posts");
      const feed = loadFeed(feedUrl);
      store.clear();


      for (const item of feed.items) {
        const id = item.guid;
        const data = await parseData({
          id,
          data: item,
        });


        const digest = generateDigest(data);


        store.set({
          id,
          data,
          digest,
        });
      }
    },
  } satisfies Loader;
```

--------------------------------

### Define a Build-Time Collection with Schema and Loader

Source: https://docs.astro.build/en/reference/modules/astro-content

Configure a build-time content collection using `defineCollection`. Specify a `loader` to fetch data (e.g., Markdown files) and a `schema` using Zod for data validation.

```javascript
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';


const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    permalink: z.string().optional(),
  }),
});


// Expose your defined collection to Astro
// with the `collections` export
export const collections = { blog };
```

--------------------------------

### Toggle Cart State in Preact

Source: https://docs.astro.build/en/recipes/sharing-state-islands

Use the `useStore` hook to read the atom's value and the `.set()` method to update it. This example wires up a button to toggle the cart's visibility.

```javascript
import { useStore } from '@nanostores/preact';
import { isCartOpen } from '../cartStore';


export default function CartButton() {
  // read the store value with the `useStore` hook
  const $isCartOpen = useStore(isCartOpen);
  // write to the imported store using `.set`
  return (
    <button onClick={() => isCartOpen.set(!$isCartOpen)}>Cart</button>
  )
}
```

--------------------------------

### middleware()

Source: https://docs.astro.build/en/reference/modules/astro-i18n

Programmatically creates the Astro i18n middleware.

```APIDOC
## middleware()

### Description
A function that allows you to programmatically create the Astro i18n middleware, useful for adding exceptions to default i18n logic.

### Parameters
- **options** (Object) - Required
  - **prefixDefaultLocale** (boolean) - Required
  - **redirectToDefaultLocale** (boolean) - Required

### Response
- **MiddlewareHandler**
```

--------------------------------

### Enable Unsigned Uploads with CldUploadWidget

Source: https://docs.astro.build/en/guides/media/cloudinary

Embed the Cloudinary Upload Widget to enable file uploads in your UI. This example shows how to configure the widget for unsigned uploads by providing an Upload Preset.

```astro
---
import { CldUploadWidget } from 'astro-cloudinary';
---
<CldUploadWidget uploadPreset="<Upload Preset>">
  <button>Upload</button>
</CldUploadWidget>
```

--------------------------------

### Internal Link Example with Base Path

Source: https://docs.astro.build/en/guides/deploy/gitlab

When a `base` value is configured in `astro.config.mjs`, all internal page links must be prefixed with this `base` value to ensure correct routing on GitLab Pages.

```html
<a href="/my-repo/about">About</a>
```

--------------------------------

### Filter files with import.meta.glob()

Source: https://docs.astro.build/en/guides/imports

Workaround for dynamic file paths by importing a larger set of files and filtering them manually.

```astro
---
const { postSlug } = Astro.props;
const pathToMyFeaturedPost = `src/pages/blog/${postSlug}.md`;


const posts = Object.values(import.meta.glob("../pages/blog/*.md", { eager: true }));
const myFeaturedPost = posts.find(post => post.file.includes(pathToMyFeaturedPost));
---


<p>
  Take a look at my favorite post, <a href={myFeaturedPost.url}>{myFeaturedPost.frontmatter.title}</a>!
</p>
```

--------------------------------

### Configure Project Mode

Source: https://docs.astro.build/en/reference/cli-reference

Configures the `mode` inline config for your project. Added in astro@5.0.0.

```bash
astro --mode production
```

--------------------------------

### Fetch Blog Posts from Hygraph

Source: https://docs.astro.build/en/guides/cms/hygraph

Example of fetching blog post titles from Hygraph using a GraphQL query and the fetch API. It defines a Post interface and processes the JSON response.

```typescript
--- 
interface Post {
  title: string;
}


const query = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
      {
        blogPosts {
          title
        }
      }`,
  }),
};


const response = await fetch(import.meta.env.HYGRAPH_ENDPOINT, query);
const json = await response.json();
const posts: Post[] = json.data.blogPosts;
---
```

```html
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro</title>
  </head>
  <body>
    <h1>Astro</h1>
    {
      posts.map((post) => (
        <div>
          <h2>{post.title}</h2>
        </div>
      ))
    }
  </body>
</html>
```

--------------------------------

### `astro db shell --query <sql-string>`

Source: https://docs.astro.build/en/guides/integrations-guide/db

Execute a raw SQL query against your database. Use the `--remote` flag to run against your libSQL-compatible database.

```APIDOC
## `astro db shell --query <sql-string>`

### Description
Execute a raw SQL query against your database.

### Flags
- `--query`: Raw SQL query to execute.
- `--remote`: Run against your libSQL-compatible database. Omit to run against your local database file. Requires the `ASTRO_DB_REMOTE_URL` environment variable to be set, and either `ASTRO_DB_APP_TOKEN` to be set in the environment or a value passed with the `--db-app-token` command-line argument.

### Request Example
```
npx astro db shell --query "SELECT * FROM Comment;" --remote
```
```

--------------------------------

### Query Neon Database for Current Time

Source: https://docs.astro.build/en/guides/backend/neon

Fetch the current time from your Neon Postgres database within an Astro component. This example demonstrates a simple SQL query and rendering the result.

```astro
---
import { sql } from '../lib/neon';


const response =  await  sql`SELECT NOW() as current_time`;
const currentTime = response[0].current_time;
---


<h1>Current Time</h1>
<p>The time is: {currentTime}</p>
```

--------------------------------

### Configure 'server' output mode with static page

Source: https://docs.astro.build/en/guides/on-demand-rendering

When `output: 'server'` is configured, set `export const prerender = true` on individual pages or endpoints to force them to be statically generated. This is useful for pages like privacy policies.

```astro
---
export const prerender = true
---
<html>
<!--
`output: 'server'` is configured, but this page is static!
The rest of my site is rendered on demand!
-->
<html>
```

--------------------------------

### Construct form action URL with queryString

Source: https://docs.astro.build/en/reference/modules/astro-actions

Use the ActionClient.queryString property to get a URL-encoded string representation of an action. This is useful for setting the 'action' attribute of a form when the form component is reused.

```javascript
import { actions } from 'astro:actions';
import FeedbackForm from "../components/FeedbackForm.astro";


const feedbackUrl = new URL('/feedback', Astro.url);
feedbackUrl.search = actions.myAction.queryString;
---
<FeedbackForm sendTo={feedbackUrl.pathname} />
```

--------------------------------

### Configure Client-Side Output Directory

Source: https://docs.astro.build/en/reference/configuration-reference

Specify the `build.client` directory relative to `outDir` for client-side CSS and JavaScript when using server-rendered pages.

```javascript
{
  output: 'server',
  build: {
    client: './client'
  }
}
```

--------------------------------

### Use Uppercase HTTP Method Names

Source: https://docs.astro.build/en/guides/upgrade-to/v4

All HTTP request methods must now be written using uppercase. The deprecated lowercase names (`get`, `post`, `put`, `all`, `del`) are no longer supported.

```javascript
export async function GET() {
  // ...
}
```

--------------------------------

### Environment Variables with Inline CLI

Source: https://docs.astro.build/en/guides/integrations-guide/node

Load environment variables for the standalone Astro server using inline CLI arguments.

```bash
DB_HOST=... DB_PASSWORD=... node ./dist/server/entry.mjs

```

--------------------------------

### Set Custom Prerenderer in Astro Build

Source: https://docs.astro.build/en/reference/integrations-reference

Use the `setPrerenderer` hook during `astro:build:start` to provide a custom prerendering logic. This is useful for extending or replacing the default prerendering behavior.

```javascript
'astro:build:start': ({ setPrerenderer }) => {
  setPrerenderer((defaultPrerenderer) => ({
    name: 'my-prerenderer',
    async setup() {
      // Optional: called once before prerendering starts
    },
    async getStaticPaths() {
      // Returns array of { pathname: string, route: RouteData }
      return defaultPrerenderer.getStaticPaths();
    },
    async render(request, { routeData }) {
      // request: Request, options: { routeData: RouteData }
      // Returns: Response
    },
    async teardown() {
      // Optional: called after all pages are prerendered
    }
  }));
}
```

--------------------------------

### Enable Secret Validation in Astro Config

Source: https://docs.astro.build/en/reference/configuration-reference

Enable validation of secrets on the server during dev server start or build. Useful for CI pipelines to ensure secrets are set correctly before deployment.

```javascript
import { defineConfig, envField } from "astro/config"


export default defineConfig({
  env: {
    schema: {
      // ...
    },
    validateSecrets: true
  }
})
```

--------------------------------

### Open Cypress App

Source: https://docs.astro.build/en/guides/testing

Launch the Cypress App for a visual interface to run and debug tests.

```bash
npx cypress open
```

--------------------------------

### Configure Site URL for Astro Sitemap

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

Set your site's deployed URL using the 'site' option in astro.config.mjs. This URL must start with 'http://' or 'https://'.

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';


export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
  // ...
});
```

--------------------------------

### Create a language picker component

Source: https://docs.astro.build/en/recipes/i18n

Generate navigation links for all supported languages to allow users to switch their viewing preference.

```astro
---
import { languages } from '../i18n/ui';
---
<ul>
  {Object.entries(languages).map(([lang, label]) => (
    <li>
      <a href={`/${lang}/`}>{label}</a>
    </li>
  ))}
</ul>
```

```astro
---
import LanguagePicker from '../components/LanguagePicker.astro';
import { getLangFromUrl } from '../i18n/utils';


const lang = getLangFromUrl(Astro.url);
---
<html lang={lang}>
    <head>
        <meta charset="utf-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width" />
        <title>Astro</title>
    </head>
    <body>
        <slot />
        <footer>
          <LanguagePicker />
        </footer>
    </body>
</html>
```

--------------------------------

### Configure environment variable for ApostropheCMS communication

Source: https://docs.astro.build/en/guides/cms/apostrophecms

Create a .env file in the project root to store the shared authentication key.

```text
APOS_EXTERNAL_FRONT_KEY='RandomStrongString'
```

--------------------------------

### Fetch Catalogue Paths with Crystallize API in Astro

Source: https://docs.astro.build/en/guides/cms/crystallize

Use the Crystallize JavaScript API client to query for catalogue paths. Ensure you have the '@crystallize/js-api-client' package installed. The client requires a tenant identifier.

```astro
--- 
// Fetch your catalogue paths from Crystallize GraphQL API


import BaseLayout from '../../layouts/BaseLayout.astro';
import { createClient } from '@crystallize/js-api-client';


const apiClient = createClient({
  tenantIdentifier: 'furniture'
});


const query = `
  query getCataloguePaths{
    catalogue(language: "en", path: "/shop") {
      name
      children {
        name
        path
      }
    }
  }
`
const { data: { catalogue } } = await apiClient.catalogueApi(query)
---
<BaseLayout>
  <h1>{catalogue.name}</h1>
  <nav>
    <ul>
      {catalogue.children.map(child => (
        <li><a href={child.path}>{child.name}</a></li>
      ))}
    </ul>
  </nav>
</BaseLayout>

```

--------------------------------

### Convert ~/assets Import Alias

Source: https://docs.astro.build/en/guides/upgrade-to/v3

Update the `~/assets` import alias to use relative file paths or configure your own import aliases.

```astro
---
import rocket from '~/assets/rocket.png';
---

```

```astro
---
import rocket from '../../assets/rocket.png';
---

```

--------------------------------

### Send Message from Server to Client

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

Within the `astro:server:setup` hook, use `toolbar.send()` to send messages to your client-side toolbar app. Ensure the event name matches what the client is listening for.

```javascript
'astro:server:setup': ({ toolbar }) => {
  toolbar.send('server-message', { message: 'Hello!' });
},
```

--------------------------------

### Express Middleware Integration

Source: https://docs.astro.build/en/guides/integrations-guide/node

Integrate Astro's SSR handler into an Express application. Ensure the `base` path matches your Astro config. This setup requires manual static file serving.

```javascript
import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';


const app = express();
// Change this based on your astro.config.mjs, `base` option.
// They should match. The default value is "/".
const base = '/';
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);


app.listen(8080);

```

--------------------------------

### Inject Custom Types with injectTypes()

Source: https://docs.astro.build/en/reference/integrations-reference

Use the `injectTypes` option within the `astro:config:done` hook to add custom type definitions to your project. This example injects a virtual module type.

```typescript
const path = injectTypes({
  filename: "types.d.ts",
  content: "declare module 'virtual:integration' {}"
})
console.log(path) // URL
```

--------------------------------

### Rewrite with custom headers using Request

Source: https://docs.astro.build/en/reference/api-reference

Use a Request object with rewrite() for full control over the request sent to the new path. This example sends a request to the parent page with a custom header.

```javascript
return Astro.rewrite(new Request(new URL("../", Astro.url), {
  headers: {
    "x-custom-header": JSON.stringify(Astro.locals.someValue)
  }
}))
```

```typescript
import type { APIContext } from 'astro';


export function GET({ rewrite }: APIContext) {
  return rewrite(new Request(new URL("../", Astro.url), {
    headers: {
      "x-custom-header": JSON.stringify(Astro.locals.someValue)
    }
  }));
}
```

--------------------------------

### Basic Prettier Configuration for Astro

Source: https://docs.astro.build/en/editor-setup

Create a `.prettierrc` file and specify `prettier-plugin-astro` and the `astro` parser for `.astro` files.

```json
{
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

--------------------------------

### Implement getSecret() with Request-Tied Environment Variables

Source: https://docs.astro.build/en/reference/adapter-reference

When environment variables are tied to the request, call `setGetEnv()` before `getSecret()`. This example uses the `env` object from the request to set the environment variable retrieval function.

```javascript
import { createApp } from 'astro/app/entrypoint';
import { setGetEnv } from 'astro/env/setup';


const app = createApp();


export default {
  async fetch(request: Request, env: Record<string, unknown>) {
    setGetEnv((key) => env[key]);


    return await app.render(request);
  }
}
```

--------------------------------

### Define a basic Astro toolbar app

Source: https://docs.astro.build/en/recipes/making-toolbar-apps

Use defineToolbarApp to initialize a toolbar app. The init function provides access to the canvas, app instance, and server.

```typescript
import { defineToolbarApp } from "astro/toolbar";


export default defineToolbarApp({
    init(canvas, app, server) {
      // ...
    },
});
```

--------------------------------

### Import Sitemap Utilities

Source: https://docs.astro.build/en/guides/integrations-guide/sitemap

Import utility enums from the @astrojs/sitemap package.

```javascript
import {
  ChangeFreqEnum,
} from "@astrojs/sitemap";
```

--------------------------------

### Create ActionError in Handler

Source: https://docs.astro.build/en/reference/modules/astro-actions

Use the ActionError constructor to throw custom errors from an action handler. Provide a 'code' for categorization and an optional 'message' for details. This example throws an error when a user is not logged in.

```typescript
import { defineAction, ActionError } from "astro:actions";


export const server = {
  getUserOrThrow: defineAction({
    accept: 'form',
    handler: async (_, { locals }) => {
      if (locals.user?.name !== 'florian') {
        throw new ActionError({
          code: 'UNAUTHORIZED',
          message: 'Not logged in',
        });
      }
      return locals.user;
    },
  }),
}
```

--------------------------------

### Configure Server Entrypoint Filename

Source: https://docs.astro.build/en/reference/configuration-reference

Specify the `build.serverEntry` filename for the server entrypoint when building for SSR. It's recommended to use a `.mjs` extension for module detection.

```javascript
{
  build: {
    serverEntry: 'main.mjs'
  }
}
```

--------------------------------

### External Image Service Definition

Source: https://docs.astro.build/en/reference/image-service-reference

Define an external image service by implementing `validateOptions`, `getURL`, and `getHTMLAttributes`. This example shows how to enforce a maximum width and set default attributes for an external CDN.

```typescript
import type { ExternalImageService, ImageTransform, AstroConfig } from "astro";


const service: ExternalImageService = {
  validateOptions(options: ImageTransform, imageConfig: AstroConfig['image']) {
    const serviceConfig = imageConfig.service.config;


    // Enforce the user set max width.
    if (options.width && options.width > serviceConfig.maxWidth) {
      console.warn(`Image width ${options.width} exceeds max width ${serviceConfig.maxWidth}. Falling back to max width.`);
      options.width = serviceConfig.maxWidth;
    }


    return options;
  },
  getURL(options, imageConfig) {
    return `https://mysupercdn.com/${options.src}?q=${options.quality}&w=${options.width}&h=${options.height}`;
  },
  getHTMLAttributes(options, imageConfig) {
    const { src, format, quality, ...attributes } = options;
    return {
      ...attributes,
      loading: options.loading ?? 'lazy',
      decoding: options.decoding ?? 'async',
    };
  }
};




export default service;
```

--------------------------------

### Display Individual Blog Post

Source: https://docs.astro.build/en/guides/cms/flotiq

Render an individual blog post page using props passed from getStaticPaths.

```astro
---
import type { Blogpost } from "flotiq-api-ts";
import { flotiq } from "../../lib/flotiq";


export async function getStaticPaths() {
  const posts = await flotiq.BlogpostAPI.list();
  return posts.data?.map((post) => ({
    params: { slug: post.slug },
    props: post
  })) || []
}
const post: Blogpost = Astro.props;
---
<html lang="en">
  <title>{post.title}</title>
  <body>
    <h1>{post.title}</h1>
    <div set:html={post.content}/>
  </body>
</html>
```

--------------------------------

### SCSS Styling in Astro

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-nuxtjs

You can use SCSS syntax directly within a `<style lang="scss">` tag in your Astro components. This example demonstrates nested rules and hover effects.

```html
<p>Hello, world</p>
<style lang="scss">
p {
   color: black;


   &:hover {
       color: red;
   }
}
</style>
```

--------------------------------

### Create a blog index template in Astro

Source: https://docs.astro.build/en/guides/cms/apostrophecms

Displays a list of blog posts by mapping over the pieces array provided by aposData.

```astro
---
import dayjs from 'dayjs';


const { page, pieces } = Astro.props.aposData;
---


<section class="bp-content">
  <h1>{ page.title }</h1>


  <h2>Blog Posts</h2>


  {pieces.map(piece => (
    <h4>
      Released On { dayjs(piece.publicationDate).format('MMMM D, YYYY') }
    </h4>
    <h3>
      <a href={ piece._url }>{ piece.title }</a>
    </h3>
    <h4>{ piece.authorName }</h4>
  ))}
</section>
```

--------------------------------

### Build the site programmatically

Source: https://docs.astro.build/en/reference/programmatic-reference

Executes the build process for deployment using the build function.

```typescript

import { build } from "astro";


await build({
  root: "./my-project",
});

```

--------------------------------

### Astro Processes Scripts by Default

Source: https://docs.astro.build/en/guides/client-side-scripts

Astro automatically processes <script> tags without attributes (except src) for TypeScript support, import bundling, and deduplication. This snippet is an example of a script that will be processed.

```html
<script>
  // Processed! Bundled! TypeScript!
  // Importing local scripts and from npm packages works.
</script>
```

--------------------------------

### Add Client-Side Interactivity with Scripts

Source: https://docs.astro.build/en/guides/client-side-scripts

Use <script> tags to add event listeners for client-side interactivity. This example imports the 'canvas-confetti' npm package to create a confetti effect when a button is clicked.

```html
<button data-confetti-button>Celebrate!</button>


<script>
  // Import from npm package.
  import confetti from 'canvas-confetti';


  // Find our component DOM on the page.
  const buttons = document.querySelectorAll('[data-confetti-button]');


  // Add event listeners to fire confetti when a button is clicked.
  buttons.forEach((button) => {
    button.addEventListener('click', () => confetti());
  });
</script>
```

--------------------------------

### Configure ImportMetaEnv for IntelliSense

Source: https://docs.astro.build/en/guides/cms/ghost

Create an env.d.ts file in the src/ directory to provide type definitions for your environment variables, enabling IntelliSense for your CONTENT_API_KEY.

```typescript
interface ImportMetaEnv {
  readonly CONTENT_API_KEY: string;
}
```

--------------------------------

### Get font data for a CSS variable

Source: https://docs.astro.build/en/reference/modules/astro-assets

Retrieve font data associated with a specific CSS variable using the `fontData` object. Each font entry includes available sources, weight, and style.

```javascript
import { fontData } from "astro:assets"


const data = fontData["--font-roboto"]
```

--------------------------------

### Configure ISR On-Demand Invalidation

Source: https://docs.astro.build/en/guides/integrations-guide/vercel

Provide a `bypassToken` to the `isr` configuration for programmatic cache invalidation. A HEAD or GET request to the page URL with the `x-prerender-revalidate` header set to this token will invalidate the cache.

```javascript
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';


export default defineConfig({
    adapter: vercel({
        isr: {
            // A secret random string that you create.
            bypassToken: "005556d774a8",
        }
    })
})
```

--------------------------------

### Prefetch All Links by Default

Source: https://docs.astro.build/en/guides/prefetch

Enable prefetching for all links on your site by default by setting `prefetch.prefetchAll` to `true` in your `astro.config.mjs`. Individual links can opt-out using `data-astro-prefetch="false"`.

```javascript
import { defineConfig } from 'astro/config';


export default defineConfig({
  prefetch: {
    prefetchAll: true
  }
});
```

--------------------------------

### Initialize Astro Project on Railway

Source: https://docs.astro.build/en/guides/deploy/railway

Initialize a new project on Railway from within your Astro project directory. You will be prompted to choose a workspace and project name.

```bash
railway init
```

--------------------------------

### Import and Use CRA App in Astro

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-create-react-app

Import your root React component from your CRA project and render it within an Astro component using the client:load directive. Ensure the React integration is installed.

```javascript
import App from '../cra-project/App.jsx';

<App client:load />
```

--------------------------------

### Building a Custom Loader

Source: https://docs.astro.build/en/reference/content-loader-reference

Guidelines for implementing a custom loader to fetch, parse, and store data in the Astro content layer.

```APIDOC
## Custom Loader Implementation

### Description
Custom loaders allow for flexible data fetching by defining a name, a load() method, and an optional schema.

### Implementation Details
- **load()**: A function that fetches data, clears the existing store, validates entries, and updates the data store.
- **schema**: A Zod schema used to validate content entries via parseData() before storage.
- **createSchema()**: Used for dynamically generating schemas based on configuration or API introspection.
```

--------------------------------

### Generate Cloudinary Open Graph Image URL in Astro

Source: https://docs.astro.build/en/guides/media/cloudinary

Use `getCldOgImageUrl` to generate a URL for an Open Graph image, suitable for social media meta tags. Ensure the `astro-cloudinary` package is installed.

```javascript
--- 
import { getCldOgImageUrl } from 'astro-cloudinary/helpers';
const ogImageUrl = getCldOgImageUrl({ src: '<Public ID>' });
--- 
<meta property="og:image" content={ogImageUrl} />
<meta property="og:image:secure_url" content={ogImageUrl} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="twitter:title" content="<Twitter Title>" />
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:image" content={ogImageUrl} />

```

--------------------------------

### Configure Amplify for Yarn Server Build with Adapter

Source: https://docs.astro.build/en/guides/deploy/aws

This Amplify configuration is for Yarn projects deploying server-rendered Astro sites using the AWS Amplify adapter. It includes Yarn installation and build steps.

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - yarn install
    build:
      commands:
        - yarn build
        - mv node_modules ./.amplify-hosting/compute/default
  artifacts:
    baseDirectory: .amplify-hosting
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

--------------------------------

### Import Project Configuration for Static Astro

Source: https://docs.astro.build/en/guides/deploy/zerops

Use this YAML structure to define a project and a static service for an Astro site.

```yaml

# see https://docs.zerops.io/references/import for full reference
project:
  name: recipe-astro
services:
  - hostname: app
    type: static

```

--------------------------------

### Turso CLI: Show Database URL

Source: https://docs.astro.build/en/guides/astro-db

Command to fetch the URL of a Turso database.

```bash
turso db show [database-name]
```

--------------------------------

### Define Astro DB Integration

Source: https://docs.astro.build/en/guides/astro-db

Use defineDbIntegration to create a custom Astro DB integration. Specify the integration name and define hooks for database setup, including entrypoints for configuration and seed files.

```typescript
import { defineDbIntegration } from '@astrojs/db/utils';


export default function MyIntegration() {
  return defineDbIntegration({
    name: 'my-astro-db-powered-integration',
    hooks: {
      'astro:db:setup': ({ extendDb }) => {
        extendDb({
          configEntrypoint: '@astronaut/my-package/config',
          seedEntrypoint: '@astronaut/my-package/seed',
        });
      },
      // Other integration hooks...
    },
  });
}
```

--------------------------------

### Rewrite to a login page

Source: https://docs.astro.build/en/reference/api-reference

Use the rewrite() method to serve content from a different URL or path without changing the browser's URL. This example shows rewriting to '/login' using a string path.

```javascript
return Astro.rewrite("/login")
```

```typescript
import type { APIContext } from 'astro';


export function GET({ rewrite }: APIContext) {
  return rewrite('/login');
}
```

--------------------------------

### Create BlogPostList.astro component

Source: https://docs.astro.build/en/guides/cms/storyblok

Fetches blog post stories from the Storyblok API and renders a list of previews.

```astro

---
import { storyblokEditable } from '@storyblok/astro'
import { useStoryblokApi } from '@storyblok/astro'


const storyblokApi = useStoryblokApi();


const { data } = await storyblokApi.get('cdn/stories', {
  version: import.meta.env.DEV ? "draft" : "published",
  content_type: 'blogPost',
})


const posts = data.stories.map(story => {
  return {
    title: story.content.title,
    date: new Date(story.published_at).toLocaleDateString("en-US", {dateStyle: "full"}),
    description: story.content.description,
    slug: story.full_slug,
  }
})


const { blok } = Astro.props
---


<ul {...storyblokEditable(blok)}>
  {posts.map(post => (
    <li>
      <time>{post.date}</time>
      <a href={post.slug}>{post.title}</a>
      <p>{post.description}</p>
    </li>
  ))}
</ul>

```

--------------------------------

### Standard Cloudflare Worker Export Handler

Source: https://docs.astro.build/en/guides/integrations-guide/cloudflare

An example of a custom worker entry file using standard Cloudflare Worker syntax, including handling requests and queue messages, and exporting a Durable Object.

```typescript
import { handle } from '@astrojs/cloudflare/handler';
import { DurableObject } from 'cloudflare:workers';


export class MyDurableObject extends DurableObject<Env> {
  // ...
}


export default {
  async fetch(request, env, ctx) {
    await env.MY_QUEUE.send('log');
    return handle(request, env, ctx);
  },
  async queue(batch, _env) {
    let messages = JSON.stringify(batch.messages);
    console.log(`consumed from our queue: ${messages}`);
  },
} satisfies ExportedHandler<Env>;
```

--------------------------------

### Environment Variables with dotenvx

Source: https://docs.astro.build/en/guides/integrations-guide/node

Load environment variables for the standalone Astro server using the `dotenvx` CLI tool.

```bash
npx @dotenvx/dotenvx run -- node ./dist/server/entry.mjs

```

--------------------------------

### Middleware Not Returning Response

Source: https://docs.astro.build/en/reference/errors/middleware-no-data-or-next-called

This middleware example demonstrates the incorrect pattern where neither a Response is returned nor the `next` function is called. Ensure your middleware returns a Response object, either directly or by calling `next()`.

```javascript
import {defineMiddleware} from "astro:middleware";
export const onRequest = defineMiddleware((context, _) => {
  // doesn't return anything or call `next`
  context.locals.someData = false;
});
```

--------------------------------

### Import Order Precedence

Source: https://docs.astro.build/en/guides/styling

Shows that the last imported stylesheet wins when specificity is identical.

```css
div > h1 {
  color: purple;
}
```

```css
div > h1 {
  color: green;
}
```

```astro
---
import "./make-it-green.css"
import "./make-it-purple.css"
---
<style>
  h1 { color: red }
</style>
<div>
  <h1>
    This header will be purple!
  </h1>
</div>
```

--------------------------------

### Render Markdown Content with LoaderContext.renderMarkdown()

Source: https://docs.astro.build/en/reference/content-loader-reference

Use `renderMarkdown` to convert Markdown strings to HTML within loaders. This example fetches data from a CMS, renders the 'content' field as Markdown, and stores the rendered HTML.

```typescript
import type { Loader } from 'astro/loaders';
import { loadFromCMS } from './cms.js';


export function myLoader(settings) {
  return {
    name: 'cms-loader',
    async load({ renderMarkdown, store }) {
      const entries = await loadFromCMS();


      store.clear();


      for (const entry of entries) {
        store.set({
          id: entry.id,
          data: entry,
          // Assume each entry has a 'content' field with markdown content
          rendered: await renderMarkdown(entry.content),
        });
      }
    },
  } satisfies Loader;
```

--------------------------------

### Configuring LRU Cache Session Driver in Astro

Source: https://docs.astro.build/en/guides/sessions

Configure the LRU cache session driver for adapters that don't automatically set one. This example uses the `lruCache` driver with a maximum size of 800.

```javascript
import { defineConfig, sessionDrivers } from 'astro/config'
import vercel from '@astrojs/vercel'


export default defineConfig({
  adapter: vercel()
  session: {
    driver: sessionDrivers.lruCache({
      max: 800,
    }),
  }
})
```

--------------------------------

### Fetch Markdown Files with Astro.glob()

Source: https://docs.astro.build/en/guides/upgrade-to/v2

Use `Astro.glob()` to fetch local Markdown files instead of the deprecated `Astro.fetchContent()`. Alternatively, migrate to the Content Collections feature for managing Markdown and MDX files.

```html
---
const allPosts = await Astro.glob('./posts/*.md');
---

```

--------------------------------

### Integrate AddToCartForm in UI frameworks

Source: https://docs.astro.build/en/recipes/sharing-state-islands

Example of triggering store updates within component event handlers. Note that .get() is used instead of useStore because the value is read during an event rather than rendered to the UI.

```Preact

import { addCartItem, isCartOpen } from '../cartStore';


export default function AddToCartForm({ children }) {
  // we'll hardcode the item info for simplicity!
  const hardcodedItemInfo = {
    id: 'astronaut-figurine',
    name: 'Astronaut Figurine',
    imageSrc: '/images/astronaut-figurine.png',
  }


  function addToCart(e) {
    e.preventDefault();
    isCartOpen.set(true);
    addCartItem(hardcodedItemInfo);
  }


  return (
    <form onSubmit={addToCart}>
      {children}
    </form>
  )
}

```

```React

import { addCartItem, isCartOpen } from '../cartStore';


export default function AddToCartForm({ children }) {
  // we'll hardcode the item info for simplicity!
  const hardcodedItemInfo = {
    id: 'astronaut-figurine',
    name: 'Astronaut Figurine',
    imageSrc: '/images/astronaut-figurine.png',
  }


  function addToCart(e) {
    e.preventDefault();
    isCartOpen.set(true);
    addCartItem(hardcodedItemInfo);
  }


  return (
    <form onSubmit={addToCart}>
      {children}
    </form>
  )
}

```

```Solid

import { addCartItem, isCartOpen } from '../cartStore';


export default function AddToCartForm({ children }) {
  // we'll hardcode the item info for simplicity!
  const hardcodedItemInfo = {
    id: 'astronaut-figurine',
    name: 'Astronaut Figurine',
    imageSrc: '/images/astronaut-figurine.png',
  }


  function addToCart(e) {
    e.preventDefault();
    isCartOpen.set(true);
    addCartItem(hardcodedItemInfo);
  }


  return (
    <form onSubmit={addToCart}>
      {children}
    </form>
  )
}

```

```Svelte

<form on:submit|preventDefault={addToCart}>
  <slot></slot>
</form>


<script>
  import { addCartItem, isCartOpen } from '../cartStore';


  // we'll hardcode the item info for simplicity!
  const hardcodedItemInfo = {
    id: 'astronaut-figurine',
    name: 'Astronaut Figurine',
    imageSrc: '/images/astronaut-figurine.png',
  }


  function addToCart() {
    isCartOpen.set(true);

```

--------------------------------

### Package.json Configuration for a Component

Source: https://docs.astro.build/en/guides/integrations

Define the metadata for your individual package, including its name, description, version, module type, entry points, files to include, and keywords for discoverability.

```json
{
  "name": "my-component",
  "description": "Component description",
  "version": "1.0.0",
  "homepage": "https://github.com/owner/project#readme",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./astro": "./MyAstroComponent.astro",
    "./react": "./MyReactComponent.jsx"
  },
  "files": ["index.js", "MyAstroComponent.astro", "MyReactComponent.jsx"],
  "keywords": ["astro-component", "withastro", "... etc", "... etc"]
}
```

--------------------------------

### Displaying an optimized image with <Image />

Source: https://docs.astro.build/en/guides/images

Import the Image component and the source image to render an optimized <img> tag with automatic dimension inference.

```astro
---
// import the Image component and the image
import { Image } from 'astro:assets';
import myImage from '../assets/my_image.png'; // Image is 1600x900
---


<!-- `alt` is mandatory on the Image component -->
<Image src={myImage} alt="A description of my image." />
```

```html
<!-- Prerendered output -->
<!-- Image is optimized, proper attributes are enforced -->
<img
  src="/_astro/my_image.hash.webp"
  width="1600"
  height="900"
  decoding="async"
  loading="lazy"
  alt="A description of my image."
/>


<!-- Output rendered on demand-->
<!-- src will use an endpoint generated on demand-->
<img
  src="/_image?href=%2F_astro%2Fmy_image.hash.webp&amp;w=1600&amp;h=900&amp;f=webp"
  <!-- ... -->
/>
```

--------------------------------

### Import and Use Node.js 'util' Module

Source: https://docs.astro.build/en/guides/imports

Import the 'util' built-in module from Node.js using the 'node:' prefix to parse a MIME type. This example demonstrates accessing properties of the parsed MIME type.

```javascript
// Example: import the "util" built-in from Node.js
import util from 'node:util';


export interface Props {
  mimeType: string,
}


const mime = new util.MIMEType(Astro.props.mimeType)

```

```html

<span>Type: {mime.type}</span>
<span>SubType: {mime.subtype}</span>

```

--------------------------------

### Define dynamic routes for Hashnode posts

Source: https://docs.astro.build/en/guides/cms/hashnode

Use getStaticPaths to fetch all posts and map them to dynamic URL parameters based on the post slug.

```astro
---
import { getAllPosts, getPost } from '../../lib/client';




export async function getStaticPaths() {
  const data = await getAllPosts();
  const allPosts = data.publication.posts.edges;
  return allPosts.map((post) => {
    return {
      params: { slug: post.node.slug },
    }
  })
}
const { slug } = Astro.params;
const post = await getPost(slug);


---
```

--------------------------------

### ClientRouter Component

Source: https://docs.astro.build/en/reference/modules/astro-transitions

Opt in to view transitions on individual pages by importing and adding the `<ClientRouter />` component to `<head>`.

```APIDOC
## <ClientRouter />

### Description
Opt in to using view transitions on individual pages by importing and adding the `<ClientRouter />` routing component to `<head>` on every desired page.

### Props
#### `fallback`
- **Type:** `Fallback`
- **Default:** `animate`
- **Description:** Defines the fallback strategy to use for browsers that do not support the View Transitions API.

### Request Example
```html
---
import { ClientRouter } from 'astro:transitions';
---
<html lang="en">
  <head>
    <title>My Homepage</title>
    <ClientRouter />
  </head>
  <body>
    <h1>Welcome to my website!</h1>
  </body>
</html>
```
```

--------------------------------

### Set Custom Prerenderer in Astro Adapter

Source: https://docs.astro.build/en/reference/adapter-reference

Use `setPrerenderer()` in the `astro:build:start` hook to control page prerendering. The factory function receives the default prerenderer, allowing you to wrap or extend its behavior.

```javascript
export default function createIntegration() {
  return {
    name: '@example/my-adapter',
    hooks: {
      'astro:build:start': ({ setPrerenderer }) => {
        setPrerenderer((defaultPrerenderer) => ({
          name: 'my-prerenderer',
          async setup() {
            // Start a preview server
          },
          async getStaticPaths() {
            // Returns array of { pathname: string, route: RouteData }
            return defaultPrerenderer.getStaticPaths();
          },
          async render(request, { routeData }) {
            // request: Request, options: { routeData: RouteData }
            // Custom rendering logic, e.g. make HTTP requests to a preview server
            const response = await fetch(`http://localhost:4321${new URL(request.url).pathname}`);
            return response;
          },
          async teardown() {
            // Stop the preview server
          }
        }));
      },
      'astro:config:done': ({ setAdapter }) => {
        setAdapter({
          name: '@example/my-adapter',
          entrypointResolution: 'auto',
          serverEntrypoint: '@example/my-adapter/server.js',
        });
      },
    },
  };
}
```

--------------------------------

### Add `astro-integration` keyword to package.json

Source: https://docs.astro.build/en/reference/integrations-reference

To make your integration discoverable by `astro add`, include `"astro-integration"` in the `keywords` field of your `package.json`. This ensures users can install your integration using `astro add <your-package-name>`.

```json
{
  "name": "example",
  "keywords": ["astro-integration"],
}
```

--------------------------------

### Dynamically Import Images with import.meta.glob

Source: https://docs.astro.build/en/recipes/dynamically-importing-images

Use Vite's `import.meta.glob` function to dynamically import all images from a specified directory. Import the `ImageMetadata` type for type safety.

```astro
import type { ImageMetadata } from 'astro';
import { Image } from 'astro:assets';


interface Props {
   imagePath: string;
   altText: string;
   name: string;
   age: number;
}


const { imagePath, altText, name, age } = Astro.props;
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/*.{jpeg,jpg,png,gif}')
```

--------------------------------

### Filter Project Routes in astro:routes:resolved Hook

Source: https://docs.astro.build/en/reference/integrations-reference

Use the `astro:routes:resolved` hook to access and filter project routes. This example demonstrates how to extract route patterns from routes originating from the project.

```javascript
const integration = () => {
  return {
    name: 'my-integration',
    hooks: {
      'astro:routes:resolved': ({ routes }) => {
        const projectRoutes = routes.filter(r => r.origin === 'project').map(r => r.pattern)


        console.log(projectRoutes)
      },
    }
  }
}
```

--------------------------------

### Use getActionContext for RPC Calls in Middleware

Source: https://docs.astro.build/en/reference/modules/astro-actions

Use getActionContext in middleware to intercept RPC calls. This example shows how to check the action name and potentially implement security checks, like validating a session token.

```typescript
import { defineMiddleware } from 'astro:middleware';
import { getActionContext } from 'astro:actions';


export const onRequest = defineMiddleware(async (context, next) => {
  const { action, setActionResult, serializeActionResult } = getActionContext(context);
  if (action?.calledFrom === 'rpc' && action.name.startsWith('private')) {
    // Check for a valid session token
  }
  // ...
});

```

--------------------------------

### Use Custom Font in Component Styles

Source: https://docs.astro.build/en/guides/fonts

Apply the configured custom font to HTML elements by using the defined CSS variable in your component's style block. This example applies the font to `<h1>` elements.

```astro
---
import Layout from "../layouts/Layout.astro";
---
<Layout>
  <h1>In a galaxy far, far away...</h1>


  <p>Custom fonts make my headings much cooler!</p>


  <style>
  h1 {
    font-family: var(--font-distant-galaxy);
  }
  </style>
</Layout>
```

--------------------------------

### Parse and Store Feed Data with LoaderContext.parseData()

Source: https://docs.astro.build/en/reference/content-loader-reference

Use `parseData` to validate and parse feed items according to a collection schema before storing them. This example loads feed items and stores them using the provided `parseData` function.

```typescript
import type { Loader } from "astro/loaders";
import { loadFeed } from "./feed.js";


export function feedLoader({ url }) {
  const feedUrl = new URL(url);
  return {
    name: "feed-loader",
    load: async ({ store, logger, parseData, meta, generateDigest }) => {
      logger.info("Loading posts");
      const feed = loadFeed(feedUrl);
      store.clear();


      for (const item of feed.items) {
        const id = item.guid;
        const data = await parseData({
          id,
          data: item,
        });
        store.set({
          id,
          data,
        });
      }
    },
  } satisfies Loader;
```

--------------------------------

### Define Structure of a Dev Toolbar App

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

A Dev Toolbar App is defined by default exporting an object from a `.js` or `.ts` file using the `defineToolbarApp()` function. This example shows basic `init` and `beforeTogglingOff` logic.

```javascript
import { defineToolbarApp } from "astro/toolbar";


export default defineToolbarApp({
  init(canvas) {
    const text = document.createTextNode('Hello World!');
    canvas.appendChild(text);
  },
  beforeTogglingOff() {
    const confirmation = window.confirm('Really exit?');
    return confirmation;
  }
});
```

--------------------------------

### Create Svelte Auth Client

Source: https://docs.astro.build/en/guides/authentication

Create a Svelte authentication client by importing `createAuthClient` from 'better-auth/svelte'. This client provides `signIn` and `signOut` functions.

```typescript
import { createAuthClient } from 'better-auth/svelte';


export const authClient = createAuthClient();


export const {signIn, signOut } = authClient;

```

--------------------------------

### Configure GitHub Actions for Deno Deploy

Source: https://docs.astro.build/en/guides/deploy/deno

YAML configuration for GitHub Actions to build and deploy an Astro site. Replace the project name placeholder with your actual Deno Deploy project name.

```yaml
name: Deploy
on: [push]


jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    permissions:
      id-token: write # Needed for auth with Deno Deploy
      contents: read # Needed to clone the repository


    steps:
      - name: Clone repository
        uses: actions/checkout@v6


      # Not using npm? Change `npm ci` to `yarn install` or `pnpm i`
      - name: Install dependencies
        run: npm ci


      # Not using npm? Change `npm run build` to `yarn build` or `pnpm run build`
      - name: Build Astro
        run: npm run build


      - name: Upload to Deno Deploy
        uses: denoland/deployctl@v1
        with:
          project: my-deno-project # TODO: replace with Deno Deploy project name
          entrypoint: jsr:@std/http/file-server
          root: dist
```

```yaml
name: Deploy
on: [push]


jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    permissions:
      id-token: write # Needed for auth with Deno Deploy
      contents: read # Needed to clone the repository


    steps:
      - name: Clone repository
        uses: actions/checkout@v6


      # Not using npm? Change `npm ci` to `yarn install` or `pnpm i`
      - name: Install dependencies
        run: npm ci


      # Not using npm? Change `npm run build` to `yarn build` or `pnpm run build`
      - name: Build Astro
        run: npm run build


      - name: Upload to Deno Deploy
        uses: denoland/deployctl@v1
        with:
          project: my-deno-project # TODO: replace with Deno Deploy project name
          entrypoint: dist/server/entry.mjs
```

--------------------------------

### Add YAML Type Definitions for Editor Support

Source: https://docs.astro.build/en/recipes/add-yaml-support

Create or update a `.d.ts` file in your `src` directory to provide type hints for imported YAML data in your editor. This example declares the type for all `.yml` files as `any`.

```typescript
// Specify the file extension you want to import
declare module "*.yml" {
  const value: any; // Add type definitions here if desired
  export default value;
}
```

--------------------------------

### Manually upgrade integrations with pnpm

Source: https://docs.astro.build/en/guides/integrations

Add the latest versions of specific integrations like React and Partytown to your project.

```bash
# Example: upgrade React and Partytown integrations
pnpm add @astrojs/react@latest @astrojs/partytown@latest
```

--------------------------------

### Display Astro CLI Help with pnpm

Source: https://docs.astro.build/en/reference/cli-reference

Run this command to see all available Astro CLI commands and global flags. Requires pnpm.

```bash
pnpm astro --help

```

--------------------------------

### Configure Xata API Key and Branch

Source: https://docs.astro.build/en/guides/backend/xata

Set your Xata API key and the default branch for your project in the .env file. Ensure XATA_API_KEY is your actual hash key and XATA_BRANCH is set to 'main' or your desired branch.

```env
XATA_API_KEY=hash_key


# Xata branch that will be used
# if there's not a xata branch with
# the same name as your git branch
XATA_BRANCH=main
```

--------------------------------

### Fetch and Display Drupal Articles in Astro

Source: https://docs.astro.build/en/guides/cms/drupal

Use this snippet to fetch published articles from Drupal, including their title and body, and render them in an Astro component. Ensure DRUPAL_BASE_URL is set in your environment variables and that `jsona` and `drupal-jsonapi-params` are installed.

```typescript
import {Jsona} from "jsona";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import type {TJsonApiBody} from "jsona/lib/JsonaTypes";


// Get the Drupal base URL
export const baseUrl: string = import.meta.env.DRUPAL_BASE_URL;


// Generate the JSON:API Query. Get all title and body from published articles.
const params: DrupalJsonApiParams = new DrupalJsonApiParams();
params.addFields("node--article", [
        "title",
        "body",
    ])
    .addFilter("status", "1");
// Generates the query string.
const path: string = params.getQueryString();
const url: string = baseUrl + '/jsonapi/node/article?' + path;


// Get the articles
const request: Response = await fetch(url);
const json: string | TJsonApiBody = await request.json();
// Initiate Jsona.
const dataFormatter: Jsona = new Jsona();
// Deserialise the response.
const articles = dataFormatter.deserialize(json);

```

```html
<body>
 {articles?.length ? articles.map((article: any) => (
    <section>
      <h2>{article.title}</h2>
      <article set:html={article.body.value}></article>
    </section>
 )): <div><h1>No Content found</h1></div> }
</body>

```

--------------------------------

### Reorder Script and Style Tags for Consistent Rendering

Source: https://docs.astro.build/en/guides/upgrade-to/v6

In Astro 6.0, script and style tags render in the order they appear in your code. If your previous setup relied on reversed order, you may need to adjust the order of these tags.

```html
<p>I am a component</p>
<style>
  body {
    background: red;
    background: yellow;
  }
</style>
<style>
  body {
    background: yellow;
    background: red;
  }
</style>
<script>
    console.log("hello")
    console.log("world")
</script>
<script>
    console.log("world!")
    console.log("hello!")
</script>
```

--------------------------------

### Configure Astro Netlify Adapter

Source: https://docs.astro.build/en/guides/integrations-guide/netlify

Add the Netlify adapter to your `astro.config.mjs` file to enable its features.

```javascript
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';


export default defineConfig({
   // ...
   adapter: netlify(),
});
```

--------------------------------

### Import and Render Markdown in Astro Component

Source: https://docs.astro.build/en/guides/markdown-content

Import a single Markdown file and query multiple Markdown files using Vite's import.meta.glob(). Render frontmatter, compiled content, and create links to other posts.

```astro
---
import * as greatPost from './posts/great-post.md';
const posts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));
---


<p>{greatPost.frontmatter.title}</p>
<p>Written by: {greatPost.frontmatter.author}</p>


{greatPost.compiledContent()}


<p>Post Archive:</p>
<ul>
  {posts.map(post => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}
</ul>

```

--------------------------------

### Display Astro CLI Help with Yarn

Source: https://docs.astro.build/en/reference/cli-reference

Run this command to see all available Astro CLI commands and global flags. Requires Yarn.

```bash
yarn astro --help

```

--------------------------------

### Define Reusable Image Schema with SchemaContext

Source: https://docs.astro.build/en/reference/modules/astro-content

Utilize SchemaContext to create reusable schemas, such as one for image data, within your Content Collections. This example demonstrates defining an image schema using the provided image helper.

```typescript
import { defineCollection, type SchemaContext } from "astro:content";
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';


export const imageSchema = ({ image }: SchemaContext) =>
    z.object({
        image: image(),
        description: z.string().optional(),
    });


const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    permalink: z.string().optional(),
    image: imageSchema({ image })
  }),
});
```

--------------------------------

### Configure Entrypoint

Source: https://docs.astro.build/en/guides/integrations-guide/alpinejs

Set a custom entrypoint to extend Alpine with plugins or custom directives.

```javascript
import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';


export default defineConfig({
  // ...
  integrations: [alpinejs({ entrypoint: '/src/entrypoint' })],
});
```

```javascript
import type { Alpine } from 'alpinejs'
import intersect from '@alpinejs/intersect'


export default (Alpine: Alpine) => {
    Alpine.plugin(intersect)
}
```

--------------------------------

### Applying Shiki Transformers with Astro Code Component

Source: https://docs.astro.build/en/guides/syntax-highlighting

Enhance code highlighting with Shiki transformers using the `transformers` prop in the `<Code />` component. This example uses `transformerMetaHighlight` to highlight specific lines based on the `meta` attribute.

```javascript
import { transformerNotationFocus, transformerMetaHighlight } from '@shikijs/transformers'
import { Code } from 'astro:components'
const code = `const foo = 'hello'
const bar = ' world'
console.log(foo + bar) // [!code focus] 
`
---
<Code
  code={code}
  lang="js"
  transformers={[transformerMetaHighlight()]} 
  meta="{1,3}"
/>


<style is:global>
  pre.has-focused .line:not(.focused) {
    filter: blur(1px);
  }
</style>
```

--------------------------------

### Access build output directory in astro:build:generated

Source: https://docs.astro.build/en/reference/integrations-reference

Use `fileURLToPath` to get an absolute path string for the build output directory within the `astro:build:generated` hook. This is useful for writing integration-specific files.

```javascript
import { fileURLToPath } from 'node:url';


export default {
  name: 'my-integration',
  hooks: {
    'astro:build:generated': ({ dir }) => {
      const outFile = fileURLToPath(new URL('./my-integration.json', dir));
    }
  }
}
```

--------------------------------

### Initialize Scalekit Client in Astro

Source: https://docs.astro.build/en/guides/backend/scalekit

Create a Scalekit client instance in src/lib/scalekit.ts using your environment variables. This client will be used to interact with the Scalekit API.

```typescript
import { ScalekitClient } from "@scalekit-sdk/node";


export const scalekit = new ScalekitClient(
  import.meta.env.SCALEKIT_ENVIRONMENT_URL,
  import.meta.env.SCALEKIT_CLIENT_ID,
  import.meta.env.SCALEKIT_CLIENT_SECRET,
);


export const REDIRECT_URI =
  import.meta.env.SCALEKIT_REDIRECT_URI ?? "http://localhost:4321/api/auth/callback";
```

--------------------------------

### Add Custom Dev Toolbar App

Source: https://docs.astro.build/en/reference/integrations-reference

Use `addDevToolbarApp()` within your integration's `astro:config:setup` hook to add a custom application to the Astro development toolbar. Ensure your entrypoint module exports a valid `DevToolbarApp`.

```javascript
import { defineConfig } from 'astro/config';
import devToolbarIntegration from './astro-dev-toolbar-app/integration.js'


// https://astro.build/config
export default defineConfig({
  integrations: [
    devToolbarIntegration()
  ],
});

```

```javascript
/**
 * @type {() => import('astro').AstroIntegration}
 */
export default () => ({
  name: "dev-toolbar-app",
  hooks: {
    "astro:config:setup": ({ addDevToolbarApp }) => {
      addDevToolbarApp({
        entrypoint: "./astro-dev-toolbar-app/plugin.js",
        id: "my-plugin",
        name: "My Plugin"
      });
    },
  },
});

```

```javascript
/**
 * @type {import('astro').DevToolbarApp}
 */
export default {
  id: "my-plugin",
  name: "My Plugin",
  icon: "<svg>...</svg>",
  init() {
    console.log("I'm a dev toolbar app!")
  },
};

```

--------------------------------

### Setting Dynamic 'prerender' Values with Astro Integration

Source: https://docs.astro.build/en/guides/upgrade-to/v5

Use an Astro integration in your 'astro.config.mjs' file to set dynamic 'prerender' values using the 'astro:route:setup' hook. This allows for conditional prerendering based on environment variables.

```javascript
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';


export default defineConfig({
  integrations: [
    {
      name: 'set-prerender',
      hooks: {
        'astro:route:setup': ({ route }) => {
          // Load environment variables from .env files (if needed)
          const { PRERENDER } = loadEnv(process.env.NODE_ENV, process.cwd(), '');
          // Find routes matching the expected filename.
          if (route.component.endsWith('/blog/[slug].astro')) {
            // Set the prerender value on routes as needed.
            route.prerender = PRERENDER;
          }
        },
      },
    }
  ],
});
```

--------------------------------

### Render post content template

Source: https://docs.astro.build/en/guides/cms/hashnode

Create a full page template using the fetched post data, utilizing the Fragment component to render raw HTML content.

```astro
---
import { getAllPosts, getPost } from '../../lib/client';




export async function getStaticPaths() {
  const data = await getAllPosts();
  const allPosts = data.publication.posts.edges;
  return allPosts.map((post) => {
    return {
      params: { slug: post.node.slug },
    }
  })
}
const { slug } = Astro.params;
const post = await getPost(slug);


---
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>{post.title}</title>
    </head>
    <body>
        <img src={post.coverImage.url} alt={post.title} />


        <h1>{post.title}</h1>
        <p>{post.readTimeInMinutes} min read</p>


        <Fragment set:html={post.content.html} />
    </body>
</html>
```

--------------------------------

### Configure Astro Docs MCP Server (HTTP)

Source: https://docs.astro.build/en/guides/build-with-ai

Manual setup for the Astro Docs MCP server using HTTP transport. This configuration can be added to your AI tool's MCP settings if it supports a common JSON format.

```json
{
  "mcpServers": {
    "Astro docs": {
      "type": "http",
      "url": "https://mcp.docs.astro.build/mcp"
    }
  }
}
```

--------------------------------

### Correctly Importing and Using Local Images with Astro

Source: https://docs.astro.build/en/reference/errors/local-image-used-wrongly

When using local images, ensure the `src` prop is the imported image object itself, not its `.src` property or a string filepath. This example demonstrates correct usage with an imported image and a URL.

```javascript
import { Image } from "astro:assets";
import myImage from "../my_image.png";

```

```html
<!-- GOOD: `src` is the full imported image. -->
<Image src={myImage} alt="Cool image" />


<!-- GOOD: `src` is a URL. -->
<Image src="https://example.com/my_image.png" alt="Cool image" />


<!-- BAD: `src` is an image's `src` path instead of the full image object. -->
<Image src={myImage.src} alt="Cool image" />


<!-- BAD: `src` is a string filepath. -->
<Image src="../my_image.png" alt="Cool image" />
```

--------------------------------

### Resolve Image Paths in Markdown with fileURL Option

Source: https://docs.astro.build/en/reference/content-loader-reference

When rendering Markdown with `renderMarkdown`, the `fileURL` option can specify the file path for resolving relative image paths. This example uses the configured root directory to resolve image paths.

```javascript
for (const file of files) {
  const content = await readFile(file.path, 'utf8');
  store.set({
    id: file.id,
    data: file.data,
    rendered: await renderMarkdown(content, {
      fileURL: new URL(file.path, config.root),
    }),
  });
}
```

--------------------------------

### Configure .env file variables

Source: https://docs.astro.build/en/guides/environment-variables

Define environment-specific variables in a .env file within the project root.

```text

# This will only be available when run on the server!
DB_PASSWORD="foobar"


# This will be available everywhere!
PUBLIC_POKEAPI="https://pokeapi.co/api/v2"

```

--------------------------------

### Configure Contentful Environment Variables

Source: https://docs.astro.build/en/guides/cms/contentful

Define your Contentful credentials in a .env file at the root of your project.

```text
CONTENTFUL_SPACE_ID=YOUR_SPACE_ID
CONTENTFUL_DELIVERY_TOKEN=YOUR_DELIVERY_TOKEN
CONTENTFUL_PREVIEW_TOKEN=YOUR_PREVIEW_TOKEN
```

--------------------------------

### Generate RSS Feed Items from Content Collections

Source: https://docs.astro.build/en/recipes/rss

Generate RSS feed items by fetching content from a collection using `getCollection()` and mapping it to the required item format. This example assumes posts are rendered as `/blog/[id]` routes.

```javascript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';


export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Buzz’s Blog',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Compute RSS link from post `id`
      // This example assumes all posts are rendered as `/blog/[id]` routes
      link: `/blog/${post.id}/`,
    })),
  });
}
```

--------------------------------

### Define Storyblok environment variable

Source: https://docs.astro.build/en/guides/cms/storyblok

Add the Storyblok preview token to a .env file in the project root.

```text
STORYBLOK_TOKEN=YOUR_PREVIEW_TOKEN
```

--------------------------------

### Configure build.concurrency for parallel page building

Source: https://docs.astro.build/en/reference/configuration-reference

Set the number of pages to build in parallel. The default is 1, and increasing this value should be done cautiously to avoid performance degradation due to insufficient memory.

```javascript
{
  build: {
    concurrency: 2
  }
}
```

--------------------------------

### Embedding Languages in Astro Code Component

Source: https://docs.astro.build/en/guides/syntax-highlighting

Use the `embeddedLangs` prop with the `<Code />` component to enable syntax highlighting for additional languages within a primary language block. This example embeds TSX highlighting within a Vue block.

```vue
import { Code } from 'astro:components'


const code = `<script setup lang="tsx">
const Text = ({ text }: { text: string }) => <div>{text}</div>;
</script>


<template>
  <Text text="Hello world" />
</template>
`
---
<Code
  lang="vue"
  embeddedLangs={["tsx"]}
  code={code}
/>
```

--------------------------------

### Update Preview Script

Source: https://docs.astro.build/en/guides/deploy/deno

Modify the package.json preview script to use the Deno runtime.

```json
{
  // ...
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
    "preview": "deno run --allow-net --allow-read --allow-env ./dist/server/entry.mjs"
  }
}
```

--------------------------------

### Run astro info

Source: https://docs.astro.build/en/reference/cli-reference

Displays environment information for the current project, useful for debugging and reporting issues.

```bash
astro info
```

--------------------------------

### Get Action Result

Source: https://docs.astro.build/en/reference/api-reference

Use `Astro.getActionResult()` to retrieve the result of an action submission. This function accepts an action function and returns a `data` or `error` object if a submission is received, otherwise `undefined`. This is useful for displaying feedback after an action has been attempted.

```javascript
import { actions } from 'astro:actions';


const result = Astro.getActionResult(actions.logout);

```

```html
<form action={actions.logout}>
  <button type="submit">Log out</button>
</form>
{result?.error && <p>Failed to log out. Please try again.</p>}
```

--------------------------------

### Reference Astro Collection Schema in YAML Data

Source: https://docs.astro.build/en/guides/content-collections

With the Red Hat YAML extension installed, reference an Astro-generated JSON schema in a YAML file using the `# yaml-language-server: $schema=` comment syntax. The path should be relative from the data file to the schema.

```yaml
# yaml-language-server: $schema=../../../.astro/collections/authors.schema.json
name: Armand
skills:
  - Astro
  - Starlight
```

--------------------------------

### Configure Node Adapter with staticHeaders enabled

Source: https://docs.astro.build/en/guides/integrations-guide/node

Enable the `staticHeaders` option in the Node adapter configuration to serve headers from prerendered pages using the `Response` object, useful for features like Content Security Policy.

```javascript
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';


export default defineConfig({
  security: {
    csp: true
  },
  adapter: node({
    mode: 'standalone',
    staticHeaders: true,
  })
});
```

--------------------------------

### `astro:config:done` Hook

Source: https://docs.astro.build/en/reference/integrations-reference

This hook runs after the Astro configuration has been resolved and other integrations have completed their setup. It provides access to the final configuration, a function to set the integration as an adapter, a utility to inject types, the logger, and the build output type.

```APIDOC
## `astro:config:done` Hook

### Description
Runs after the Astro config has resolved and other integrations have run their `astro:config:setup` hooks. Useful for retrieving the final config or setting up adapter functionalities.

### Signature
```typescript
'astro:config:done'?: (options: {
  config: AstroConfig;
  setAdapter: (adapter: AstroAdapter) => void;
  injectTypes: (injectedType: { filename: string; content: string }) => URL;
  logger: AstroIntegrationLogger;
  buildOutput: 'static' | 'server';
}) => void | Promise<void>;
```

### Options
- **`config`** (AstroConfig) - A read-only copy of the user-supplied Astro config, resolved after other integrations have run.
- **`setAdapter`** ((adapter: AstroAdapter) => void) - Makes the integration an adapter.
- **`injectTypes`** ((injectedType: { filename: string; content: string }) => URL) - Injects types into the user's project by adding a new `.d.ts` file. Returns a URL to the normalized path.
- **`logger`** (AstroIntegrationLogger) - An instance of the Astro logger for outputting messages.
- **`buildOutput`** ('static' | 'server') - Indicates the user's project output type, allowing for adaptive integration logic.
```

--------------------------------

### IntegrationResolvedRoute.patternRegex

Source: https://docs.astro.build/en/reference/integrations-reference

Allows access to a regular expression used for matching an input URL against a requested route. For example, given a `[fruit]/about.astro` path, the regex will be `/^\/([^\/]+?)\/about\/?$/`. Using `pattern.test("banana/about")` will return `true`.

```APIDOC
## `IntegrationResolvedRoute.patternRegex`

### Description
Allows you to access a regex used for matching an input URL against a requested route.

### Type
`RouteData['pattern']`

### Example
For example, given a `[fruit]/about.astro` path, the regex will be `/^\/([^\/]+?)\/about\/?$/`. Using `pattern.test("banana/about")` will return `true`.
```

--------------------------------

### Configure SVGO Optimizer with Basic Options

Source: https://docs.astro.build/en/reference/experimental-flags/svg-optimization

Pass an object with SVGO configuration options to customize optimization behavior, such as multipass and floatPrecision.

```javascript
svgoOptimizer({
  multipass: true,
  floatPrecision: 2,
  plugins: [
    'preset-default',
    'removeXMLNS',
    {
      name: "removeXlink",
      params: {
        includeLegacy: true
      }
    }
  ]
});
```

--------------------------------

### Add Item to Shopping Cart in API Endpoint

Source: https://docs.astro.build/en/guides/sessions

Handle POST requests in API endpoints to manage session data, such as adding items to a shopping cart. This example retrieves the cart from the session, adds a new item, and updates the session.

```javascript
export async function POST(context: APIContext) {
  const cart = await context.session?.get('cart') || [];
  const data = await context.request.json<{ item: string }>();
  if(!data?.item) {
    return new Response('Item is required', { status: 400 });
  }
  cart.push(data.item);
  await context.session?.set('cart', cart);
  return Response.json(cart);
}
```

--------------------------------

### Configure Prepr fetch utility

Source: https://docs.astro.build/en/guides/cms/preprcms

Create a reusable function to perform POST requests to the Prepr GraphQL endpoint.

```javascript
export async function Prepr(query, variables) {
    const response = await fetch(import.meta.env.PREPR_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables }),
    })
    return response
}
```

--------------------------------

### Enable Static Headers in Netlify Adapter

Source: https://docs.astro.build/en/guides/integrations-guide/netlify

Use this configuration to enable specifying custom headers for prerendered pages in Netlify's configuration. This is useful for adding headers like Content Security Policy directly to Netlify's configuration.

```javascript
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';


export default defineConfig({
  security: {
    csp: true
  },
  adapter: netlify({
    staticHeaders: true
  })
});

```

--------------------------------

### Configure Google Antigravity MCP Server

Source: https://docs.astro.build/en/guides/build-with-ai

Add the Astro Docs MCP server configuration to Google Antigravity's mcp_config.json file.

```json
{
  "mcpServers": {
    "astro-docs": {
      "serverUrl": "https://mcp.docs.astro.build/mcp"
    }
  }
}
```

--------------------------------

### Update Content Loader Schema Function to createSchema()

Source: https://docs.astro.build/en/guides/upgrade-to/v6

Replace the old schema function signature with the new `createSchema()` property for dynamic schema generation in content loaders. This example shows how to use `zod-to-ts` with `createSchema()` to replicate previous behavior.

```typescript
import type { Loader } from 'astro/loaders'
import { createTypeAlias, zodToTs } from 'zod-to-ts'
import { getSchemaFromApi } from './utils'


function myLoader() {
  return {
    name: 'my-loader',
    load: async (context) => {
      // ...
    },
    schema: async () => await getSchemaFromApi(),
    createSchema: async () => {
      const schema = await getSchemaFromApi()
      const identifier = 'Entry'
      const { node } = zodToTs(schema, identifier)
      const typeAlias = createTypeAlias(node, identifier)


      return {
        schema,
        types: `export ${typeAlias}`
      }
    }
  } satisfies Loader
}
```

--------------------------------

### Apply basic component styles

Source: https://docs.astro.build/en/guides/styling

Use a standard <style> tag within an Astro component to apply CSS.

```html
<style>
  h1 { color: red; }
</style>
```

--------------------------------

### Enable experimental web frameworks support with pnpm

Source: https://docs.astro.build/en/guides/deploy/firebase

Enable experimental web frameworks support for the Firebase CLI using pnpm. This allows the CLI to better detect and configure frameworks like Astro.

```bash
pnpm exec firebase experiments:enable webframeworks
```

--------------------------------

### Conditional Vite plugin behavior based on environment

Source: https://docs.astro.build/en/reference/integrations-reference

Conditionally configure Vite plugins within an integration based on the current environment name (e.g., 'client', 'ssr', 'prerender', 'astro'). This example prevents a server-only module from being imported in the client environment.

```javascript
resolveId(id) {
  if (id === '\0virtual:foo') {
    if (this.environment.name === 'client') {
      throw new Error('This is a server-only module');
    }
    return 'export const foo = "bar"';
  }
}
```

--------------------------------

### Configure Astro for Deno

Source: https://docs.astro.build/en/guides/deploy/deno

Update astro.config.mjs to enable server-side rendering with the Deno adapter.

```javascript
import { defineConfig } from 'astro/config';
import deno from '@deno/astro-adapter';


export default defineConfig({
  output: 'server',
  adapter: deno(),
});
```

--------------------------------

### Astro Component Rendering React Component

Source: https://docs.astro.build/en/guides/integrations-guide/react

When passing children from an Astro component to a React component, they are parsed as plain strings. This example shows how a React component would receive only a single child element, even if multiple are provided in the Astro template.

```astro
---
import ReactComponent from './ReactComponent';
---


<ReactComponent>
  <div>one</div>
  <div>two</div>
</ReactComponent>
```

--------------------------------

### List Custom Content Types (Dinos) in Astro

Source: https://docs.astro.build/en/guides/cms/wordpress

Fetches custom content types (e.g., 'dinos') from a WordPress REST API and displays them with links to individual pages. This example assumes the custom post type is configured and exposed via the API.

```astro
---
import Layout from "../layouts/Layout.astro";


let res = await fetch("https://norian.studio/wp-json/wp/v2/dinos");
let posts = await res.json();
---
<Layout title="Dinos!">
  <section>
    <h1>List of Dinosaurs</h1>
    {
      posts.map((post) => (
        <article>
          <h2>
            <a href={`/dinos/${post.slug}/`} set:html={post.title.rendered} />
          </h2>
          <Fragment set:html={post.content.rendered} />
        </article>
      ))
    }
  </section>
</Layout>
```

--------------------------------

### Reference Files with Extensions

Source: https://docs.astro.build/en/guides/upgrade-to/v1

Files must be imported or referenced using their exact extension as found on disk.

```javascript
import Div from './Div.jsx' // Astro v0.20
import Div from './Div.tsx' // Astro v0.21
```

```html
<link rel="stylesheet" href={Astro.resolve('./Div.css')}>
<link rel="stylesheet" href={Astro.resolve('./Div.scss')}>
```

--------------------------------

### Configure Turso Environment Variables

Source: https://docs.astro.build/en/guides/backend/turso

Add your Turso database URL and auth token to your project's .env file. Ensure these are private variables and do not use the PUBLIC_ prefix.

```dotenv
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=
```

--------------------------------

### Trigger Navigation with a Select Menu in React

Source: https://docs.astro.build/en/guides/view-transitions

Implement client-side navigation in a React component using the `navigate()` function from `astro:transitions/client`. This example shows how to trigger navigation on a select element's change event. Ensure `ClientRouter` is present in your Astro layout.

```jsx
import { navigate } from "astro:transitions/client";


export default function Form() {
  return (
    <select onChange={(e) => navigate(e.target.value)}>
      <option value="/play">Play</option>
      <option value="/blog">Blog</option>
      <option value="/about">About</option>
      <option value="/contact">Contact</option>
    </select>
  );
}
```

```astro
---
import Form from "../components/Form.jsx";
import { ClientRouter } from "astro:transitions";
---
<html>
  <head>
    <ClientRouter />
  </head>
  <body>
    <Form client:load />
  </body>
</html>
```

--------------------------------

### Create an Astro Endpoint to Process Images with a Custom Service

Source: https://docs.astro.build/en/reference/image-service-reference

Implement an Astro API route to dynamically process images using a configured custom image service. This endpoint uses `getConfiguredImageService` to get the service and `imageConfig` to access configuration, then calls `parseURL` and `transform`.

```typescript
import type { APIRoute } from "astro";
import { getConfiguredImageService, imageConfig } from 'astro:assets';


export const GET: APIRoute = async ({ request }) => {
  const imageService = await getConfiguredImageService();


  const imageTransform = imageService.parseURL(new URL(request.url), imageConfig);
  // ... fetch the image from imageTransform.src and store it in inputBuffer
  const { data, format } = await imageService.transform(inputBuffer, imageTransform, imageConfig);
  return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': mime.getType(format) || ''
      }
    }
  );
}

```

--------------------------------

### Extracting Database Errors with getDbError

Source: https://docs.astro.build/en/guides/integrations-guide/db

Use `getDbError` to walk through an error's cause chain and find the underlying libSQL database exception. This is useful when other errors may wrap the database error. The example extracts the database error from a caught exception and returns the error code and message.

```typescript
import { getDbError } from 'astro:db';


export const POST: APIRoute = (ctx) => {
  try {
    await db.insert(Comment).values({
      id: ctx.params.id,
      content: 'Hello, world!'
    });
  } catch (e) {
    const dbError = getDbError(e);
    if (dbError) {
      return new Response(`Database error: ${dbError.code}\n\n${dbError.message}`, { status: 400 });
    }
    return new Response('An unexpected error occurred', { status: 500 });
  }


  return new Response(null, { status: 201 });
};
```

--------------------------------

### Configure PostCSS Plugins

Source: https://docs.astro.build/en/guides/upgrade-to/v1

Define PostCSS configuration files for Autoprefixer or Tailwind CSS.

```javascript
module.exports = {
  plugins: {
    autoprefixer: {},
  },
};
```

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
  },
};
```

--------------------------------

### `astro db push`

Source: https://docs.astro.build/en/guides/integrations-guide/db

Safely push database configuration changes to your project database. This command checks for data loss risks and guides on migration steps. Use `--remote` to apply changes to your remote database. Use `--force-reset` to reset all production data if a breaking schema change is required.

```APIDOC
## `astro db push`

### Description
Safely push database configuration changes to your project database. This will check for any risk of data loss and guide you on any recommended migration steps. Use `--remote` to apply changes to your remote database. If a breaking schema change must be made, use `--force-reset` to reset all production data.

### Flags
- `--db-app-token <token>`: Provide the remote database app token directly instead of `ASTRO_DB_APP_TOKEN`.
- `--dry-run`: Print the generated SQL statements without applying them.
- `--force-reset`: Reset all production data if a breaking schema change is required.
- `--remote`: Push to your remote database instead of the local database file. Requires the `ASTRO_DB_REMOTE_URL` environment variable to be set, and either `ASTRO_DB_APP_TOKEN` to be set in the environment or a value passed with the `--db-app-token` command-line argument.
```

--------------------------------

### Add Markdoc Integration using npm

Source: https://docs.astro.build/en/guides/integrations-guide/markdoc

Use the Astro CLI to add the Markdoc integration to your project with npm.

```bash
npx astro add markdoc
```

--------------------------------

### Deploy site to Firebase Hosting with pnpm

Source: https://docs.astro.build/en/guides/deploy/firebase

Build and deploy your Astro site to Firebase Hosting using pnpm. The `--only hosting` flag ensures only the hosting component is deployed.

```bash
pnpm exec firebase deploy --only hosting
```

--------------------------------

### Import StaticPaths

Source: https://docs.astro.build/en/reference/modules/astro-static-paths

Import the StaticPaths class from the astro:static-paths module.

```javascript
import {
  StaticPaths,
} from 'astro:static-paths';
```

--------------------------------

### Using an Astro Layout Component

Source: https://docs.astro.build/en/basics/astro-components

Demonstrates how to use an Astro layout component by wrapping content within its tags. The content passed between the tags is rendered inside the layout's `<slot />`.

```astro
---
import Wrapper from '../components/Wrapper.astro';
---
<Wrapper title="Fred's Page">
  <h2>All about Fred</h2>
  <p>Here is some stuff about Fred.</p>
</Wrapper>

```

--------------------------------

### Upgrade Astro and official integrations with npm

Source: https://docs.astro.build/en/guides/upgrade-to/v5

Use this command to upgrade Astro and its official integrations together using npm.

```bash
npx @astrojs/upgrade
```

--------------------------------

### Render React App in Astro

Source: https://docs.astro.build/en/guides/migrate-to-astro/from-create-react-app

Import a React root component in the frontmatter and render it with a client directive for interactivity.

```astro
---
import App from '../cra-project/App.jsx';
---
<App client:load />
```

--------------------------------

### Define Dynamic Routes with getStaticPaths()

Source: https://docs.astro.build/en/tutorial/5-astro-api/2

Use getStaticPaths() to return an array of page routes. Each object in the array should have a 'params' property defining the route parameters.

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';


export async function getStaticPaths() {
  return [
    { params: { tag: "astro" } },
    { params: { tag: "successes" } },
    { params: { tag: "community" } },
    { params: { tag: "blogging" } },
    { params: { tag: "setbacks" } },
    { params: { tag: "learning in public" } },
  ];
}


const { tag } = Astro.params;
---
<BaseLayout pageTitle={tag}>
  <p>Posts tagged with {tag}</p>
</BaseLayout>

```

--------------------------------

### Configure Builder.io Environment Variables

Source: https://docs.astro.build/en/guides/cms/builderio

Add these variables to your .env file to store your public API key and model name.

```text
BUILDER_API_PUBLIC_KEY=YOUR_API_KEY
BUILDER_BLOGPOST_MODEL='blogpost'
```

--------------------------------

### Upgrade Astro and official integrations with npm

Source: https://docs.astro.build/en/guides/integrations

Use this command to upgrade both Astro and all official integrations to their latest versions simultaneously.

```bash
# Upgrade Astro and official integrations together to latest
npx @astrojs/upgrade
```

--------------------------------

### client:only

Source: https://docs.astro.build/en/reference/directives-reference

Skips HTML server rendering and renders the component exclusively on the client. Requires specifying the framework used by the component.

```APIDOC
## `client:only`

### Description
`client:only={string}` skips HTML server rendering, and renders only on the client. It acts similarly to `client:load` in that it loads, renders, and hydrates the component immediately on page load. You must pass the component’s correct framework as a value!

### Example
```astro
<SomeReactComponent client:only="react" />
<SomePreactComponent client:only="preact" />
<SomeSvelteComponent client:only="svelte" />
<SomeVueComponent client:only="vue" />
<SomeSolidComponent client:only="solid-js" />
```
```

--------------------------------

### Add Markdoc Integration using pnpm

Source: https://docs.astro.build/en/guides/integrations-guide/markdoc

Use the Astro CLI to add the Markdoc integration to your project with pnpm.

```bash
pnpm astro add markdoc
```

--------------------------------

### Create a blog index page in Astro

Source: https://docs.astro.build/en/guides/cms/payload

Fetches posts from the PayloadCMS API and renders a list of links to individual post pages.

```astro
---
import HomeLayout from "../layouts/HomeLayout.astro";


const res = await fetch("http://localhost:5000/api/posts") // http://localhost:4321/api/posts by default
const posts = await res.json()
---


<HomeLayout title='Astro Blog'>
  <h1>Astro + PayloadCMS 🚀</h1>
  <h2>Blog posts list:</h2>
  <ul>
    {
      posts.docs.map((post) =>(
        <li>
          <a href={`posts/${post.slug}`} set:html={post.title} />
        </li>
      ))
    }
  </ul>
</HomeLayout>
```

--------------------------------

### Fetch async data with Solid createResource

Source: https://docs.astro.build/en/guides/integrations-guide/solid-js

Use createResource to fetch remote data on the server, which is then included in the initial server-rendered HTML.

```javascript
function CharacterName() {
  const [name] = createResource(() =>
    fetch('https://swapi.dev/api/people/1')
      .then((result) => result.json())
      .then((data) => data.name)
  );


  return (
    <>
      <h2>Name:</h2>
      {/* Luke Skywalker */}
      <div>{name()}</div>
    </>
  );
}
```

--------------------------------

### StaticPaths.getAll()

Source: https://docs.astro.build/en/reference/modules/astro-static-paths

Retrieves all paths that should be prerendered.

```APIDOC
## Method: StaticPaths.getAll()

### Description
Retrieves all paths that should be prerendered. Returns a promise that resolves to an array of objects describing the route path and its data.

### Returns
- **Promise<Array<{ pathname: string, route: RouteData }>>** - A promise resolving to the list of static paths.

### Response Example
{
  "paths": [
    { "pathname": "/", "route": { ... } },
    { "pathname": "/about", "route": { ... } }
  ]
}
```

--------------------------------

### Enable database encryption

Source: https://docs.astro.build/en/guides/astro-db

Use the encryptionKey parameter to secure a local database file.

```bash
ASTRO_DB_REMOTE_URL=file:path/to/file.db?encryptionKey=your-encryption-key
```

--------------------------------

### Configure Cosmic API Keys in .env

Source: https://docs.astro.build/en/guides/cms/cosmic

Set up your Cosmic Bucket slug and read key as public environment variables in a .env file. Ensure the file is at the root of your Astro project.

```env
PUBLIC_COSMIC_BUCKET_SLUG=YOUR_BUCKET_SLUG
PUBLIC_COSMIC_READ_KEY=YOUR_READ_KEY
```

--------------------------------

### Relax with Turso

Source: https://docs.astro.build/en/guides/astro-db

A command to explore Turso features.

```bash
turso relax
```

--------------------------------

### PreviewServer Properties

Source: https://docs.astro.build/en/reference/programmatic-reference

Configuration properties for the PreviewServer instance.

```APIDOC
## PreviewServer Properties

### PreviewServer.host
- **Type**: string
- **Description**: The host where the server is listening for connections. Adapters are allowed to leave this field unset; the value is implementation-specific.

### PreviewServer.port
- **Type**: number
- **Description**: The port where the server is listening for connections.
```

--------------------------------

### Generate Turso authentication token

Source: https://docs.astro.build/en/guides/astro-db

Create a token to authorize remote database access.

```bash
turso db tokens create andromeda
```

--------------------------------

### Handle Toolbar Placement Updates

Source: https://docs.astro.build/en/reference/dev-toolbar-app-reference

Use onToolbarPlacementUpdated to react when the Dev Toolbar position changes.

```javascript
app.onToolbarPlacementUpdated((options) => {
  console.log(`The toolbar is now placed at ${options.placement}!`);
});
```

--------------------------------

### Configure server.allowedHosts

Source: https://docs.astro.build/en/reference/configuration-reference

Specify a list of hostnames that Astro is allowed to respond to. Setting to 'true' allows any hostname.

```javascript
{
  server: {
    allowedHosts: ['staging.example.com', 'qa.example.com']
  }
}
```

--------------------------------

### Create Astro Layout Component

Source: https://docs.astro.build/en/guides/cms/umbraco

Define a base layout for the blog using an Astro component.

```astro
---
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>My Blog with Astro and Umbraco</title>
</head>
<body>
    <main>
        <slot />
    </main>
</body>
</html>
```

--------------------------------

### Fetch and Display a Simple Page

Source: https://docs.astro.build/en/guides/cms/buttercms

Retrieve a simple page and display its SEO title, headline, and hero image in an Astro component.

```astro
---
import { butterClient } from "../lib/buttercms";
const response = await butterClient.page.retrieve("*", "simple-page");
const pageData = response.data.data;


interface Fields {
  seo_title: string,
  headline: string,
  hero_image: string,
}


const fields = pageData.fields as Fields;
---
<html>
  <title>{fields.seo_title}</title>
  <body>
    <h1>{fields.headline}</h1>
    <img src={fields.hero_image} />
  </body>
</html>
```

--------------------------------

### Build Docker Container for Astro

Source: https://docs.astro.build/en/guides/deploy/google-cloud

Build a Docker container for your Astro site. Ensure you replace placeholder values with your project's specific details.

```bash
docker build .
```

```bash
docker tag SOURCE_IMAGE HOSTNAME/PROJECT-ID/TARGET-IMAGE:TAG
```

```bash
docker push HOSTNAME/PROJECT-ID/IMAGE:TAG
```

--------------------------------

### Handle Not Found

Source: https://docs.astro.build/en/reference/modules/astro-i18n

Returns a 404 response if the current path is not a root or does not contain a locale.

```javascript
import { defineMiddleware } from "astro:middleware";
import { notFound } from "astro:i18n";


export const onRequest = defineMiddleware((context, next) => {
  const pathNotFound = notFound(context);
  if (pathNotFound) {
    return pathNotFound;
  }
  return next();
})
```