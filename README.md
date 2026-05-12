# Blog Monorepo (Nx + pnpm)

Монорепо содержит:
- `apps/cms` — Strapi CMS (`blog-backend`)
- `apps/front` — Astro frontend (`blog-astro-front3`)

## Requirements
- Node.js `>=20 <=24`
- pnpm `10.x`

## Environment
Скопируй `.env.example` в `.env` (или задай переменные в shell):
- `CMS_URL` — URL Strapi (по умолчанию `http://localhost:1337`)
- `PUBLIC_API_URL` — API URL для фронта
- `OPENAPI_INPUT_URL` — URL OpenAPI документации Strapi
- `PUBLIC_CMS_URL` — публичный базовый URL CMS для фронта

## Commands
- `pnpm dev` — запустить CMS и Front вместе
- `pnpm build` — собрать оба приложения
- `pnpm start:cms` — запуск production CMS
- `pnpm preview:front` — preview фронта
- `pnpm generate:api` — генерация API-клиента фронта из OpenAPI
- `pnpm affected:build` / `pnpm affected:lint` / `pnpm affected:test`

## Notes
- Для Nx в текущем окружении зафиксирован режим без daemon/isolated plugins через env в скриптах.
- `affected:*` ожидает git-history и корректную `defaultBase` (сейчас `main`).
