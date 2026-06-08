# Testing Runbook

Дата актуализации: `2026-06-07`.

Этот runbook повторяет текущий testing baseline и дополнительный browser-level audit
без внешнего SaaS.

## Типы результатов

- `Automated`: команда сама дает pass/fail baseline.
- `Manual`: короткая ручная проверка по URL или заголовкам ответа.
- `DB/Build evidence`: доказательство через `dist` или SQLite.

## 1. Prerequisite

- Рабочая директория: `/Users/arthur/Documents/projects/Диплом/app-monorepo`
- Node.js: `>=20 <=24`
- pnpm: `10.x`
- Заполнены `.env`, `apps/front/.env`, `apps/cms/.env`
- Для preview и smoke в `apps/front` и `apps/cms` задан одинаковый `PREVIEW_SECRET`
- Для server-side vacancy/lead flows и mutation smoke задан `CMS_API_TOKEN`

## 2. Runtime Startup

Тип: `Automated prerequisite`

Предпочтительный порядок для стабильного smoke в dev-режиме:

Терминал A:

```bash
pnpm dev:cms
```

Ожидаемо:

- `Strapi started successfully`
- `http://localhost:1337`

Терминал B:

```bash
pnpm dev:front
```

Ожидаемо:

- `astro ready`
- `http://localhost:4321`

Примечание:

- `pnpm dev` существует, но для testing baseline менее предсказуем.
- Если `front` стартовал раньше живого `CMS`, лучше перезапустить `front` перед smoke.

## 3. Re-seed Baseline Dataset

Тип: `Automated prerequisite`

Запускать строго последовательно:

```bash
pnpm --dir apps/cms seed:storefront
pnpm --dir apps/cms seed:pages
pnpm --dir apps/cms seed:vacancies
pnpm --dir apps/cms seed:content
```

Ожидаемо:

- `Storefront seed complete for locales: en, ru-RU`
- `Pages seed complete for locales: en, ru-RU`
- `Seed complete: ... vacancies in locales en, ru-RU`
- `Content seed complete for locales: en, ru-RU`

Примечание:

- Не запускать seed-скрипты параллельно на SQLite: возможен `SQLITE_BUSY` / `database is locked`.

## 4. Build And Preview

Тип: `DB/Build evidence`

```bash
pnpm build:cms
pnpm build:front
PORT=4322 HOST=127.0.0.1 pnpm preview:front
```

Ожидаемо:

- CMS build завершается успешно;
- frontend build завершается успешно;
- static preview доступен на `http://localhost:4322`.

Примечание:

- `http://localhost:4322` обслуживает только `apps/front/dist/client`;
- Astro API routes проверяются только на `http://localhost:4321`.
- Если `pnpm build:front` запускался параллельно с уже поднятым `pnpm dev:front`,
  перед `pnpm audit:browser` лучше перезапустить `front`, чтобы исключить transient
  `Vite` reload noise в browser-level evidence.

## 5. Baseline Endpoint Checks

Тип: `Manual`

```bash
curl -I http://localhost:1337/
curl -I http://localhost:1337/admin
curl -I http://localhost:4321/
curl -I http://localhost:4321/ru/
curl -I http://localhost:4321/ru/cms-first-platform/
curl -I http://localhost:4321/ru/articles/neea-llc/
curl -I http://localhost:4321/en/articles/neea-llc/
curl -I http://localhost:4321/ru/projects/project/
curl -I http://localhost:4321/en/projects/project/
curl -I http://localhost:4321/ru/vacancies/test-vacancy/
curl -I http://localhost:4322/
```

Норма:

- `1337 /` редиректит на `/admin`;
- `1337 /admin` отвечает `200`;
- `4321` и `4322` доступны;
- representative public routes на `4321` отвечают без ошибок.

## 6. Automated Smoke

Тип: `Automated`

Read-only baseline:

```bash
pnpm smoke:front
```

Норма:

- `0 failures`
- `1 warning`

Нормальный warning:

- mutation checks не включались.

Mutation baseline:

```bash
SMOKE_ALLOW_MUTATIONS=true pnpm smoke:front
```

Норма:

- `0 failures`
- `0 warnings`

## 7. Preview Checks

Тип: `Automated` + `Manual`

Неверный secret:

```bash
curl -i 'http://localhost:4321/api/preview?secret=bad&locale=ru&type=page&slug=cms-first-platform&status=draft'
```

Норма:

- `HTTP/1.1 401`

Published preview redirect:

```bash
curl -i "http://localhost:4321/api/preview?secret=${PREVIEW_SECRET}&locale=ru&type=page&slug=cms-first-platform&status=published"
```

Норма:

- `307`
- `Location: /ru/cms-first-platform/`

Draft preview redirect:

```bash
curl -i "http://localhost:4321/api/preview?secret=${PREVIEW_SECRET}&locale=ru&type=page&slug=cms-first-platform&status=draft"
```

Норма:

- `307`
- `Location: /preview/ru/cms-first-platform/`
- `Set-Cookie: __cms_preview=...`

Detail preview contour:

```bash
pnpm smoke:front
```

Норма:

- smoke подтверждает published redirect и draft preview для `page`, `article`, `project`, `vacancy`;
- preview detail routes `/preview/ru/articles/neea-llc/`,
  `/preview/ru/projects/project/`, `/preview/ru/vacancies/test-vacancy/`
  отвечают `200` при валидной preview cookie и несут `robots=noindex`.

## 8. Form And API Checks

Тип: `Automated`

Read-only API / validation:

```bash
curl -i 'http://localhost:4321/api/vacancies?page=1&locale=ru-RU'
curl -i -X POST 'http://localhost:4321/api/lead-submissions' \
  -H 'content-type: application/json' \
  -d '{"locale":"ru"}'
```

Норма:

- `/api/vacancies` отвечает `200` JSON;
- неполный `lead-submissions` payload отвечает `400`.

Mutation form/API contour:

```bash
SMOKE_ALLOW_MUTATIONS=true pnpm smoke:front
```

Норма:

- valid `lead-submissions` получает `201`;
- invalid vacancy resume `.txt` получает `400`;
- valid vacancy application `.pdf` получает `201`.

## 9. Build And SQLite Evidence

Тип: `DB/Build evidence`

Быстрый способ снять evidence одним прогоном:

```bash
pnpm evidence:testing
```

Норма:

- `hard_failures=0`;
- warning по `Static preview root` допустим, если preview server на `4322` не поднят
  отдельно.

Build / sitemap:

```bash
sed -n '1,120p' apps/front/dist/client/sitemap-index.xml
sed -n '1,260p' apps/front/dist/client/sitemap-0.xml
```

Норма:

- есть `sitemap-index.xml` и `sitemap-0.xml`;
- в sitemap есть `/ru/`, `/en/`, `ru/en` detail routes и `/:locale/vacancies/...`;
- legacy `/articles`, `/projects` и `/vacancies` без locale отсутствуют.

SQLite evidence:

```bash
sqlite3 apps/cms/.tmp/data.db "select name,url,headers,events,enabled from strapi_webhooks;"
sqlite3 apps/cms/.tmp/data.db "select id,full_name,email,source,form_name from lead_submissions order by id desc limit 5;"
sqlite3 apps/cms/.tmp/data.db "select id,full_name,email,source,hr_status from vacancy_applications order by id desc limit 5;"
```

Норма:

- в `strapi_webhooks` есть `Frontend rebuild hook` с URL вида
  `http://localhost:1337/api/rebuild`;
- после mutation smoke в `lead_submissions` и `vacancy_applications` появляются новые строки.

## 10. What Counts As Baseline

Считается нормой:

- read-only smoke: `0 failures`, `1 warning`;
- mutation smoke: `0 failures`, `0 warnings`;
- `pnpm evidence:testing`: `hard_failures=0`, warnings только при не поднятом `4322`
  по static preview root;
- preview API проверяется на `4321`, static preview проверяется на `4322`;
- `EN` detail coverage для `articles/projects` входит в обязательный baseline через
  `seed:content`, runtime, build и sitemap.

Не входит в обязательный baseline:

- внешние production-like rebuild checks;
- parallel seed execution на SQLite.

## 11. Browser Audit

Тип: `Automated supplementary evidence`

```bash
pnpm audit:browser
```

Норма:

- `failures=0`;
- сохраняется artifact
  `thesis/knowledge/diploma/evidence-artifacts/browser-baseline-audit.json`;
- для `ru/en` home, `ru` CMS page и `vacancy detail` подтверждаются:
  `html[lang]`, `h1`, наличие форм, отсутствие unlabeled form controls,
  отсутствие `page errors`, same-origin request/resource failures и browser
  navigation timing metrics.
