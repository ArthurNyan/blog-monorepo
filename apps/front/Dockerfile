# syntax=docker/dockerfile:1.7

FROM node:22.12.0-bookworm-slim AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json ./
COPY apps/front/package.json apps/front/package.json

RUN pnpm install --filter blog-astro-front... --frozen-lockfile

FROM deps AS build

ARG CMS_URL=http://localhost:1337
ARG PUBLIC_CMS_URL=http://localhost:1337
ARG SITE_URL=http://localhost:4321
ARG PUBLIC_SITE_URL=http://localhost:4321
ARG PREVIEW_SECRET=

ENV CMS_URL=$CMS_URL
ENV PUBLIC_CMS_URL=$PUBLIC_CMS_URL
ENV SITE_URL=$SITE_URL
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV PREVIEW_SECRET=$PREVIEW_SECRET

COPY apps/front ./apps/front

RUN pnpm --dir apps/front build

FROM base AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json ./
COPY apps/front/package.json apps/front/package.json

RUN pnpm install --filter blog-astro-front... --prod --frozen-lockfile

COPY --from=build /app/apps/front/dist ./apps/front/dist

WORKDIR /app/apps/front

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["pnpm", "start"]
