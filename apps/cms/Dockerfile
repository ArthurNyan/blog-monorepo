# syntax=docker/dockerfile:1.7

FROM node:24.12.0-bookworm-slim AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN npm install -g pnpm@10.11.0

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json ./
COPY apps/cms/package.json apps/cms/package.json

RUN pnpm install --filter blog-backend... --frozen-lockfile

FROM deps AS build

ARG APP_VERSION=0.1.0
ENV APP_VERSION=$APP_VERSION

COPY apps/cms ./apps/cms

RUN pnpm --dir apps/cms build

FROM base AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json ./
COPY apps/cms/package.json apps/cms/package.json

RUN pnpm install --filter blog-backend... --prod --frozen-lockfile

COPY --from=build /app/apps/cms ./apps/cms

WORKDIR /app/apps/cms

EXPOSE 1337

CMD ["pnpm", "start"]
