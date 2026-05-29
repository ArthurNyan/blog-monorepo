# Testing Evidence Pack

Дата актуализации: `2026-05-29`.

Часть evidence ниже сохранена из более раннего baseline `2026-05-22`, но Stage 0 в этой
сессии повторно подтвердил старт окружения, static preview и read-only smoke contour.

## Назначение

Документ собирает результаты проверки в форме, пригодной:

- для подраздела главы 2 про тестирование и результаты;
- для приложений к ВКР;
- для устной защиты, где нужно быстро показать не только код, но и воспроизводимый
  контур проверки.

Этот документ сознательно разделяет:

- автоматизированные проверки;
- ручные и полу-ручные проверки;
- непроверенные или внешне ограниченные части.

## 1. Test Baseline

Проверка проводилась в локальном монорепозитории:

- frontend live runtime: `http://localhost:4321`;
- CMS live runtime: `http://localhost:1337`;
- build preview target: `http://localhost:4322`;
- frontend build output: `apps/front/dist/client`;
- CMS data store: `apps/cms/.tmp/data.db`.

Повторная Stage 0 валидация `2026-05-29` подтвердила:

- `http://localhost:1337` доступен; root URL отвечает `302` и редиректит на `/admin`,
  `http://localhost:1337/admin` отвечает `200`;
- `http://localhost:4321` доступен как live runtime `Astro`;
- `http://localhost:4322` доступен как static preview из `apps/front/dist/client`;
- `http://localhost:4322` не обслуживает Astro API routes: `/api/preview?...` на этом
  адресе ожидаемо возвращает `404`, а runtime preview-path проверяется только на
  `http://localhost:4321`.

Принятый baseline-командный контур:

- `pnpm dev`
- `pnpm build:front`
- `PORT=4322 HOST=127.0.0.1 pnpm preview:front`
- `pnpm smoke:front`

Практическая оговорка для dev smoke baseline:

- runtime checks требуют доступных `CMS` и frontend runtime одновременно;
- в dev-режиме лучше сначала поднять `CMS`, затем `front`, либо перезапустить `front`
  после восстановления `CMS`, потому что часть Astro `getStaticPaths()` и server-side fetch
  зависят от живого CMS уже в момент запуска runtime.

Минимально значимые `env` для baseline:

- `CMS` boot: `APP_KEYS`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`,
  `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`; для локального baseline достаточно
  `DATABASE_CLIENT=sqlite`, `DATABASE_FILENAME` имеет fallback;
- frontend runtime/build: `CMS_URL` и `PUBLIC_CMS_URL` имеют fallback на
  `http://localhost:1337`, `SITE_URL` и `PUBLIC_SITE_URL` используются для canonical/site
  URL; `CMS_API_TOKEN` обязателен для server-side vacancy/lead flows и важен для полного
  build vacancy routes;
- preview contour: общий `PREVIEW_SECRET` обязателен в `apps/cms` и `apps/front`;
- smoke contour: обязателен `PREVIEW_SECRET`, все `SMOKE_*` служат только override-ами,
  `SMOKE_ALLOW_MUTATIONS=true` отдельно включает мутационные проверки форм.

Использованные источники доказательства:

- live HTTP responses `Astro` и `Strapi`;
- generated static files после `pnpm --dir apps/front build`;
- прямые SQL-запросы к SQLite для `lead_submissions`, `vacancy_applications`,
  `strapi_webhooks`;
- knowledge и code-level route/config inspection.

## 1.1. Evidence collection automation

Повторяющиеся ручные шаги baseline теперь сведены в одну локальную команду:

```bash
pnpm evidence:testing
```

Script:

- [scripts/collect-testing-evidence.sh](/Users/arthur/Documents/projects/Диплом/app-monorepo/scripts/collect-testing-evidence.sh)

Что он собирает:

- representative HTTP checks для `CMS`, frontend runtime, preview-invalid-secret и
  ключевых public routes;
- sitemap presence/coverage checks по `apps/front/dist/client`;
- SQLite evidence по `strapi_webhooks`, `lead_submissions`, `vacancy_applications`.

Что остается нормальным warning, а не hard failure:

- отсутствие `EN` detail entries для `articles/projects` в sitemap;
- недоступность static preview `http://127.0.0.1:4322`, если preview server не поднят
  отдельно.

Команда не меняет данные CMS и не заменяет `pnpm smoke:front`; это отдельный collector
evidence для обновления knowledge-документов и приложений к ВКР.

## 2. Automated Results

### 2.1. Read-only smoke contour

В репозиторий добавлен минимальный smoke script без внешних npm-зависимостей:

- command: `pnpm --dir apps/front smoke:acceptance`
- file:
  [apps/front/scripts/acceptance-smoke.mjs](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/scripts/acceptance-smoke.mjs)

Покрытие smoke script:

- `runtime_invariants`:
  redirect `/` -> `/ru/`, legacy redirects, public routes
  `home/page/article/project/vacancy`, `title`, `canonical`, `og:title`,
  `html[lang]`, `h1`, public indexability;
- `preview_runtime`:
  invalid secret, published redirect, draft cookie и preview `noindex`;
- `build_evidence`:
  наличие build sitemap и coverage обязательных/legacy routes;
- `dataset_limitations`:
  отдельная фиксация `EN` detail coverage для `articles/projects`;
- `mutation_checks`:
  optional form submit checks через `SMOKE_ALLOW_MUTATIONS=true`.

Smoke contour специально сделан без `Playwright`, `Lighthouse` и `axe`, чтобы базовая
проверка была воспроизводима даже при нестабильной сети и без доп. установки браузерных
пакетов.

Фактический результат прогонов:

- `2026-05-29`: после `pnpm --dir apps/cms seed:storefront` и
  `pnpm --dir apps/cms seed:pages` команда `pnpm smoke:front` завершилась с
  `0` failures и `2` warnings;
- `2026-05-22`: `SMOKE_ALLOW_MUTATIONS=true pnpm --dir apps/front smoke:acceptance`
  подтвердил обе формы, но на read-only assertions тогда сохранялся более широкий
  acceptance gap.

На актуальном read-only baseline `2026-05-29` обязательные automated assertions
проходят без failures.

Вывод smoke теперь сам разделяет:

- stable runtime invariants;
- preview-specific runtime checks;
- build evidence;
- dataset-dependent warnings;
- optional mutation checks.

Текущие read-only warnings:

1. В `sitemap` отсутствуют `en` detail entries для `articles` и `projects`; это теперь
   трактуется как dataset-dependent limitation, а не как failure runtime-кода.
2. Mutation checks форм не включались без `SMOKE_ALLOW_MUTATIONS=true`.

### 2.2. Runtime route checks

Подтверждено:

- `/` редиректит на `/ru/`;
- `/ru/` и `/en/` отдаются как локализованные storefront entry points;
- `/ru/cms-first-platform/` и `/en/cms-first-platform/` доступны;
- `/ru/articles/`, `/ru/articles/neea-llc/`, `/ru/projects/`,
  `/ru/projects/project/`, `/vacancies/`, `/vacancies/test-vacancy/` доступны;
- legacy `/articles/...` и `/projects/...` редиректят в locale-prefixed `ru`.

### 2.3. Preview contour

Подтверждено:

- `/api/preview` с неверным `secret` возвращает `401`;
- `/api/preview?...status=published` редиректит на public URL и очищает preview cookie;
- `/api/preview?...status=draft` выставляет `__cms_preview` и ведет на `/preview/...`;
- `/preview/ru/cms-first-platform/` отдается с `meta robots=noindex, nofollow`;
- `Strapi` реально содержит draft versions для `page`, `article`, `project`, `vacancy`,
  что подтверждено запросами с `x-preview-secret` и `status=draft`.

### 2.4. Form submit contour

Подтверждено:

- invalid `lead-submissions` payload получает `400` и field errors;
- valid `lead-submissions` payload получает `201`;
- таблица `lead_submissions` увеличилась с исходного baseline и к концу сессии содержит `4` записи;
- cross-site `vacancy-applications` POST блокируется same-origin guard;
- invalid `.txt` resume отклоняется с `400`;
- valid `.pdf` resume получает `201`;
- таблица `vacancy_applications` увеличилась с исходного baseline и к концу сессии содержит `4` записи.

Фактические записи, подтвержденные в SQLite:

```text
lead_submissions:
4 | Codex Acceptance Smoke | codex-2f16483e-6ec5-4316-b4a0-ad7c6b5548fb@example.com | astro-page-builder | acceptance-smoke
3 | Codex Acceptance Smoke | codex-5295c21d-0656-478e-b4e2-29d69a20c1f7@example.com | astro-page-builder | acceptance-smoke

vacancy_applications:
4 | Codex Vacancy Smoke | codex-vacancy-a54fc86d-b70f-4e55-b6e6-bebda78eef66@example.com | astro-vacancy-form | New
3 | Codex Vacancy Smoke | codex-vacancy-d64afcf5-f51b-4b71-aa59-e1f99a8ca8e8@example.com | astro-vacancy-form | New
```

### 2.5. Sitemap and build contour

Команда:

```bash
pnpm --dir apps/front build
```

Факт build:

- build завершился успешно `2026-05-22`;
- generated routes включают `ru/en` storefront-core, `ru` detail routes
  `articles/projects`, а также public `vacancies`;
- `@astrojs/sitemap` создал `sitemap-index.xml` и `sitemap-0.xml` в `dist/client`.

Подтверждено по `sitemap-0.xml`:

- присутствуют `/ru/`, `/en/`, `/ru/articles/...`, `/ru/projects/...`, `/vacancies/...`;
- отсутствуют legacy `/articles/` и `/projects/` без locale;
- присутствуют `/en/articles/` и `/en/projects/` list pages.
- отсутствуют `en` detail entries `articles/projects`, что совпадает с фактическими
  данными CMS и теперь фиксируется как dataset-dependent smoke warning.

### 2.6. Publication / rebuild contour

Подтверждено в SQLite:

```text
Frontend rebuild hook
url=https://api.vercel.com/v1/integrations/deploy/...
events=["entry.publish","entry.unpublish"]
enabled=1
```

Это подтверждает:

- managed webhook синхронизирован и активен;
- rebuild contour формально подключен к `Strapi`;
- локально доказан факт регистрации webhook, а не только наличие кода.

## 3. Manual And Semi-Manual Results

### 3.1. Accessibility baseline

Полноценный browser-level `axe`/Lighthouse audit в этой сессии не завершен из-за
`ECONNRESET` при установке tooling из `npm registry`, поэтому accessibility baseline
снят на структурном и runtime-уровне.

Подтверждено:

- на representative public routes присутствует корректный `html[lang]`;
- на проверенных representative routes обнаружен как минимум один основной `h1`;
- присутствуют `title`, `meta description`, `canonical`, `og:title`;
- preview routes принудительно получают `noindex, nofollow`;
- формы не пишут напрямую в CMS из браузера и проходят server-side validation layer;
- `vacancy-applications` защищены same-origin guard;
- `lead-submissions` и `vacancy-applications` проверяют `honeypot` / file constraints.

Ограничения accessibility baseline:

- не выполнена keyboard navigation walkthrough;
- не снят screen-reader trace;
- не выполнен автоматизированный WCAG scan;
- не проверялись contrast issues browser tooling-ом.

Следствие для текста ВКР:

- можно честно говорить о базовой структурной доступности и server-side safety-механизмах;
- нельзя писать, что выполнен полный WCAG audit.

### 3.2. Performance baseline

Performance baseline снят на build/static уровне, а не через Lighthouse.

Подтверждено:

- frontend build проходит стабильно;
- prerendered static routes генерируются без runtime errors;
- `sitemap` генерируется в build pipeline;
- проект использует предсобранную статическую витрину для ключевых public routes.

Зафиксированные численные baseline-показатели:

- prerendered `index.html` routes: `35`;
- размер `apps/front/dist/client`: `2.3M`;
- крупнейшие артефакты:
  - `three_0.167.1...js` — `457347 B`;
  - `vendor...js` — `361099 B`;
  - `motion-dom...js` — `94801 B`;
- local static timings на `python3 -m http.server` для build output:
  - `/ru/` — `size=52320`, `ttfb=0.001399`, `total=0.002902`;
  - `/ru/articles/neea-llc/` — `size=48835`, `ttfb=0.000482`, `total=0.000997`;
  - `/vacancies/test-vacancy/` — `size=31774`, `ttfb=0.000401`, `total=0.000695`.

Для приложений полезно дополнительно фиксировать:

```bash
find apps/front/dist/client -name index.html | wc -l
find apps/front/dist/client/_astro -type f -exec stat -f '%z %N' {} + | sort -nr | head
du -sh apps/front/dist/client
curl -s -o /dev/null -w 'code=%{http_code} size=%{size_download} ttfb=%{time_starttransfer} total=%{time_total}\n' http://localhost:4322/ru/
```

Это дает воспроизводимый local baseline по:

- количеству собранных маршрутов;
- размеру статических артефактов;
- относительным локальным временам ответа preview server.

Ограничения performance baseline:

- нет Lighthouse score;
- нет field Web Vitals;
- нет production CDN/profile данных.

Следствие для текста ВКР:

- можно писать о build-based производительности статического storefront-контура;
- нельзя писать о formal Lighthouse score или production web-vitals без дополнительного прогона.

## 4. Failures And Gaps

На baseline normalization `2026-05-29` причины acceptance-ограничений разделяются так:

- public `noindex` на `home-page/page` был вызван versioned CMS seed, а не кодом
  frontend: [metadata.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/seo/metadata.ts)
  лишь объединяет `seo.noIndex`, `previewMode` и `draft`-status, а
  [main.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/layouts/main.astro)
  просто рендерит итоговый `robots` meta tag;
- отсутствие `EN` detail entries для `articles/projects` связано с dataset: в репозитории
  нет versioned `seed-articles` / `seed-projects` scripts, а текущий SQLite baseline
  содержит published detail entries только для `ru-RU`.

### 4.1. English content coverage for `articles/projects`

На baseline `2026-05-29` подтверждена именно граница versioned dataset:

- в репозитории versioned seed покрывает `storefront`, `pages` и `vacancies`, но не
  содержит отдельных `article/project` seed scripts;
- SQLite baseline показывает `0` published `en` articles и `0` published `en` projects;
- published detail entries для representative content сейчас существуют только в `ru-RU`
  (`2` article records и `2` project records).

Что это значит:

- архитектурный `ru/en` route contour и locale-aware slug generation существуют;
- list pages `/en/articles/` и `/en/projects/` собираются;
- detail coverage `articles/projects` на английском языке текущим versioned dataset не подтверждена.

Для защиты это нужно формулировать как:

- мультиязычный route/data contour реализован;
- полнота англоязычного контента зависит от наполнения CMS и на текущем baseline для
  detail entries не завершена;
- отсутствие `EN` detail entries не должно считаться обязательным smoke-pass до появления
  versioned seed для `article/project`.

### 4.2. Browser tooling

Попытка снять browser-level metrics через `pnpm dlx lighthouse` сорвалась на внешней сети:

- `ERR_PNPM_META_FETCH_FAIL`
- многократные `ECONNRESET` к `registry.npmjs.org`

Это не дефект приложения. Это ограничение среды текущей сессии.

### 4.3. Public noindex on storefront entry points

На baseline normalization `2026-05-29` подтверждено, что прежний public `noindex`
был dataset-induced, а не связан с дефектом metadata pipeline:

- versioned `seed-storefront.js` и `seed-pages.js` содержали `seo.noIndex: true` для
  публичных `home-page/page`;
- `buildSeoMetadata` интерпретирует это поле буквально и дополнительно добавляет `noindex`
  только для `previewMode` / `draft`;
- после обновления seed и повторного `pnpm --dir apps/cms seed:storefront` +
  `pnpm --dir apps/cms seed:pages` read-only smoke больше не находит `robots=noindex`
  на `/ru/`, `/en/`, `/ru/cms-first-platform/`, `/en/cms-first-platform/`.

Это означает:

- preview-protection работает и остается intentional;
- публичная indexability `home-page/page` теперь нормализована на versioned seed baseline;
- прежний `home-page noindex` нужно трактовать как исправленную проблему dataset, а не как
  незакрытый дефект SEO-кода.

## 5. What Is Ready For Chapter 2

Уже можно опираться на следующие тезисы:

- проект имеет не только реализованный код, но и воспроизводимую acceptance matrix;
- public routes, preview, forms, sitemap и managed rebuild webhook подтверждены фактами;
- testing contour отделяет automated, manual и unverified части;
- ограничения `ru/en` coverage для `articles/projects` и browser-level metrics явно
  зафиксированы и не маскируются.

## 6. Appendix-Friendly Command Set

### Core runtime checks

```bash
pnpm evidence:testing

curl -I http://localhost:1337/
curl -I http://localhost:1337/admin
curl -I http://localhost:4321/
curl -I http://localhost:4321/ru/
curl -I http://localhost:4321/ru/cms-first-platform/
curl -I http://localhost:4321/ru/articles/neea-llc/
curl -I http://localhost:4321/ru/projects/project/
curl -I http://localhost:4321/vacancies/test-vacancy/
```

### Preview checks

```bash
curl -i 'http://localhost:4321/api/preview?secret=bad&locale=ru&type=page&slug=cms-first-platform&status=draft'
curl -i 'http://localhost:4321/api/preview?secret=...&locale=ru&type=page&slug=cms-first-platform&status=draft'
```

### Build and sitemap

```bash
pnpm --dir apps/front build
sed -n '1,220p' apps/front/dist/client/sitemap-index.xml
sed -n '1,260p' apps/front/dist/client/sitemap-0.xml
```

### Smoke contour

```bash
pnpm --dir apps/front smoke:acceptance
SMOKE_ALLOW_MUTATIONS=true pnpm --dir apps/front smoke:acceptance
pnpm smoke:front
```

### SQLite evidence

```bash
pnpm evidence:testing

sqlite3 apps/cms/.tmp/data.db "select name,url,headers,events,enabled from strapi_webhooks;"
sqlite3 apps/cms/.tmp/data.db "select id,full_name,email,source,form_name from lead_submissions order by id desc;"
sqlite3 apps/cms/.tmp/data.db "select id,full_name,email,source,hr_status from vacancy_applications order by id desc;"
```
