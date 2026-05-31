# Testing Evidence Pack

Дата актуализации: `2026-06-01`.

## Назначение

Документ собирает результаты проверки в форме, пригодной:

- для подраздела главы 2 про тестирование и результаты;
- для приложений к ВКР;
- для устной защиты, где нужно быстро показать не только код, но и воспроизводимый
  контур проверки.

Этот документ сознательно разделяет:

- automated evidence: воспроизводимые команды `smoke`, `preview`, `HTTP`, `sitemap`;
- manual evidence: короткий browser-runtime walkthrough из `testing-manual-checklist.md`;
- code/build/DB evidence: `dist/client`, SQLite и code-level route/config inspection;
- внешние ограничения: только внешние rebuild paths, не подтвержденные локально.

## 1. Test Baseline

Проверка проводилась в локальном монорепозитории:

- frontend live runtime: `http://localhost:4321`;
- CMS live runtime: `http://localhost:1337`;
- build preview target: `http://localhost:4322`;
- frontend build output: `apps/front/dist/client`;
- CMS data store: `apps/cms/.tmp/data.db`.

Повторная Stage 0 валидация `2026-05-31` подтвердила:

- `http://localhost:1337` доступен; root URL отвечает `302` и редиректит на `/admin`,
  `http://localhost:1337/admin` отвечает `200`;
- `http://localhost:4321` доступен как live runtime `Astro`;
- `http://localhost:4322` доступен как static preview из `apps/front/dist/client`;
- `http://localhost:4322` не обслуживает Astro API routes: `/api/preview?...` на этом
  адресе ожидаемо возвращает `404`, а runtime preview-path проверяется только на
  `http://localhost:4321`.

Принятый baseline-командный контур:

- `pnpm dev:cms`
- `pnpm dev:front`
- `pnpm build:cms`
- `pnpm build:front`
- `PORT=4322 HOST=127.0.0.1 pnpm preview:front`
- `pnpm smoke:front`
- `SMOKE_ALLOW_MUTATIONS=true pnpm smoke:front`
- `pnpm evidence:testing`
- `pnpm audit:browser`

Практическая оговорка для dev smoke baseline:

- runtime checks требуют доступных `CMS` и frontend runtime одновременно;
- в dev-режиме лучше сначала поднять `CMS`, затем `front`, либо перезапустить `front`
  после восстановления `CMS`, потому что часть Astro `getStaticPaths()` и server-side fetch
  зависят от живого CMS уже в момент запуска runtime.
- если `pnpm build:front` запускался параллельно с уже поднятым `pnpm dev:front`, перед
  browser audit лучше перезапустить `front`, чтобы исключить transient `Vite` reload noise.

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
- generated static files после `pnpm build:front` и `Strapi` production build после
  `pnpm build:cms`;
- прямые SQL-запросы к SQLite для `lead_submissions`, `vacancy_applications`,
  `strapi_webhooks`;
- `testing-runbook.md`, `testing-manual-checklist.md`, `pnpm smoke:front`,
  `SMOKE_ALLOW_MUTATIONS=true pnpm smoke:front`, `pnpm evidence:testing`,
  `pnpm audit:browser`;
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

- недоступность static preview `http://127.0.0.1:4322`, если preview server не поднят
  отдельно.

Команда не меняет данные CMS и не заменяет `pnpm smoke:front`; это отдельный collector
evidence для обновления knowledge-документов и приложений к ВКР.

Актуальный прогон `2026-05-31` дал:

- `hard_failures=0`;
- `warnings=0`.

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
- `mutation_checks`:
  optional form submit checks через `SMOKE_ALLOW_MUTATIONS=true`.

Smoke script специально сделан без `Playwright`, `Lighthouse` и `axe`, чтобы базовая
проверка была воспроизводима даже при нестабильной сети и без доп. установки браузерных
пакетов.

Фактический результат прогонов:

- `2026-05-31`: после `pnpm --dir apps/cms seed:storefront`,
  `pnpm --dir apps/cms seed:pages`, `pnpm --dir apps/cms seed:vacancies` и
  `pnpm --dir apps/cms seed:content` команда `pnpm smoke:front` завершилась с
  `0` failures и `1` warning;
- `2026-05-31`: `SMOKE_ALLOW_MUTATIONS=true pnpm smoke:front` завершилась с
  `0` failures и `0` warnings и подтвердила обе публичные формы.

На актуальном read-only baseline `2026-05-31` обязательные automated assertions
проходят без failures.

Вывод smoke теперь сам разделяет:

- stable runtime invariants;
- preview-specific runtime checks;
- build evidence;
- optional dataset-specific group, который в актуальном baseline не дал ни одного результата;
- optional mutation checks.

Текущие read-only warnings:

1. Mutation checks форм не включались без `SMOKE_ALLOW_MUTATIONS=true`.

### 2.2. Runtime route checks

Подтверждено:

- `/` редиректит на `/ru/`;
- `/ru/` и `/en/` отдаются как локализованные storefront entry points;
- `/ru/cms-first-platform/` и `/en/cms-first-platform/` доступны;
- `/ru/articles/`, `/ru/articles/neea-llc/`, `/en/articles/neea-llc/`,
  `/ru/projects/`, `/ru/projects/project/`, `/en/projects/project/`,
  `/vacancies/`, `/vacancies/test-vacancy/` доступны;
- legacy `/articles/...` и `/projects/...` редиректят в locale-prefixed `ru`.

### 2.3. Preview contour

Подтверждено:

- `/api/preview` с неверным `secret` возвращает `401`;
- `/api/preview?...status=published` редиректит на public URL и очищает preview cookie;
- `/api/preview?...status=draft` выставляет `__cms_preview` и ведет на `/preview/...`;
- `/preview/ru/cms-first-platform/` отдается с `meta robots=noindex, nofollow`;
- `/preview/ru/articles/neea-llc/`, `/preview/ru/projects/project/`,
  `/preview/ru/vacancies/test-vacancy/` отдаются с валидной preview cookie и несут
  `meta robots=noindex, nofollow`;
- `Strapi` реально содержит draft versions для `page`, `article`, `project`, `vacancy`,
  что подтверждено запросами с `x-preview-secret` и `status=draft`.

### 2.4. Form submit contour

Подтверждено:

- invalid `lead-submissions` payload получает `400` и field errors;
- valid `lead-submissions` payload получает `201`;
- таблица `lead_submissions` увеличилась после mutation smoke; для baseline важен факт
  появления новых строк, а не фиксированное общее количество записей;
- cross-site `vacancy-applications` POST блокируется same-origin guard;
- invalid `.txt` resume отклоняется с `400`;
- valid `.pdf` resume получает `201`;
- таблица `vacancy_applications` увеличилась после mutation smoke; для baseline важен
  факт появления новых строк, а не фиксированное общее количество записей.

Актуальные последние строки из SQLite `2026-05-31`:

```text
lead_submissions:
11 | Codex Acceptance Smoke | codex-426747cd-ef79-43f1-a4f6-e26c7960d0cb@example.com | astro-page-builder | acceptance-smoke
10 | Codex Acceptance Smoke | codex-6379b13e-862f-420c-865c-cfb42939648f@example.com | astro-page-builder | acceptance-smoke
9 | Codex Acceptance Smoke | codex-55502b1c-e194-4b91-bcca-4850614e720c@example.com | astro-page-builder | acceptance-smoke
8 | Playwright Lead Smoke | playwright-lead-1779460493589-zxypxh@example.com | astro-page-builder | home-page-primary-lead
7 | Codex Acceptance Smoke | codex-c95574d2-5902-4516-a455-a46427236778@example.com | astro-page-builder | acceptance-smoke

vacancy_applications:
12 | Codex Vacancy Smoke | codex-vacancy-9b3b3300-d56c-4f7b-98fe-aba02064fb00@example.com | astro-vacancy-form | New
11 | Codex Vacancy Smoke | codex-vacancy-a33a0661-1596-48aa-9bf5-3812d6964c63@example.com | astro-vacancy-form | New
10 | Codex Vacancy Smoke | codex-vacancy-a2d2d30b-c2ed-4625-acb6-ea14fad55a2f@example.com | astro-vacancy-form | New
9 | Playwright Vacancy Invalid | playwright-vacancy-invalid-1779460492936-92u9lh@example.com | astro-vacancy-form | New
8 | Playwright Vacancy Invalid | playwright-vacancy-invalid-1779458677142-ppvqub@example.com | astro-vacancy-form | New
```

### 2.5. Sitemap and build contour

Команда:

```bash
pnpm --dir apps/front build
```

Факт build:

- frontend build повторно завершился успешно `2026-05-31`;
- отдельный `pnpm build:cms` также завершился успешно `2026-05-31`;
- generated routes включают `ru/en` storefront-core, `ru` detail routes
  `articles/projects`, `en` detail routes `articles/projects`, а также public `vacancies`;
- `@astrojs/sitemap` создал `sitemap-index.xml` и `sitemap-0.xml` в `dist/client`.

Подтверждено по `sitemap-0.xml`:

- `sitemap-0.xml` содержит `31` публичный URL;
- присутствуют `/ru/`, `/en/`, `/ru/articles/...`, `/ru/projects/...`, `/vacancies/...`;
- отсутствуют legacy `/articles/` и `/projects/` без locale;
- присутствуют `/en/articles/`, `/en/articles/neea-llc/`, `/en/projects/`,
  `/en/projects/project/`.

### 2.6. Publication / rebuild contour

Подтверждено в SQLite:

```text
Frontend rebuild hook
url=http://localhost:1337/api/rebuild
events=["entry.publish","entry.unpublish"]
enabled=1
```

Это подтверждает:

- managed webhook синхронизирован и активен;
- rebuild contour формально подключен к `Strapi`;
- локально доказан факт регистрации webhook, а не только наличие кода.

Текущая строка `strapi_webhooks`:

```text
Frontend rebuild hook | http://localhost:1337/api/rebuild | ["entry.publish","entry.unpublish"] | 1
```

### 2.7. Browser audit contour

Команда:

```bash
pnpm audit:browser
```

Artifact:

- [browser-baseline-audit.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/evidence-artifacts/browser-baseline-audit.json)

Фактический результат `2026-05-31`:

- `failures=0`;
- проверены `RU home`, `EN home`, `RU CMS page`, `Vacancy detail`;
- на всех representative pages подтверждены `html[lang]`, `h1`, наличие форм,
  отсутствие unlabeled form controls, `page errors` и same-origin
  request/resource failures;
- cross-origin placeholder asset вне локального contour не учитывается как hard failure,
  поскольку не отражает состояние same-origin runtime приложения;
- зафиксированы browser navigation timing metrics:
  - `RU home`: `domContentLoaded=249.2`, `loadEventEnd=254.8`, `FCP=260`;
  - `EN home`: `domContentLoaded=75.7`, `loadEventEnd=78.1`, `FCP=84`;
  - `RU CMS page`: `domContentLoaded=116.9`, `loadEventEnd=2266.1`, `FCP=156`;
  - `Vacancy detail`: `domContentLoaded=68.6`, `loadEventEnd=70.1`, `FCP=72`.

## 3. Manual And Semi-Manual Results

Manual evidence для живой демонстрации вынесен в
[testing-manual-checklist.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-manual-checklist.md).
В актуальном baseline `2026-05-31` он используется как формализованный browser-runtime
контур и не подменяет automated/DB checks.

### 3.1. Accessibility baseline

Accessibility baseline теперь снят не только на HTML/runtime-уровне, но и отдельным
Playwright browser audit.

Подтверждено:

- на representative public routes присутствует корректный `html[lang]`;
- на проверенных representative routes обнаружен как минимум один основной `h1`;
- присутствуют `title`, `meta description`, `canonical`, `og:title`;
- preview routes принудительно получают `noindex, nofollow`;
- формы не пишут напрямую в CMS из браузера и проходят server-side validation layer;
- `vacancy-applications` защищены same-origin guard;
- `lead-submissions` и `vacancy-applications` проверяют `honeypot` / file constraints.
- `pnpm audit:browser` подтверждает наличие форм и отсутствие unlabeled form controls
  на `ru/en home`, `ru CMS page` и `vacancy detail`.

Ограничения accessibility baseline:

- это не полный WCAG certification scan;
- не выполнена keyboard navigation walkthrough;
- не снят screen-reader trace;
- не проверялись contrast issues специализированным audit-tooling.

Следствие для текста ВКР:

- можно честно говорить о browser-level accessibility baseline, структурной доступности
  и server-side safety-механизмах;
- нельзя писать, что выполнен полный WCAG audit или certification review.

### 3.2. Representative manual runtime contour

На защиту и для ручной приемки оставлен только короткий сценарный набор:

- redirect `/ -> /ru/`;
- storefront `ru` и `en`;
- representative CMS page `/ru/cms-first-platform/`;
- preview flow через `/preview/...`;
- vacancy detail `/vacancies/test-vacancy/`;
- invalid input paths для lead form и vacancy form.

Эти пункты уже сохранены как отдельный артефакт и не повышают статусы сверх того,
что реально было продемонстрировано: в live-demo preview остается representative
для `page`, тогда как full detail preview coverage для `article/project/vacancy`
уже закрыта automated smoke; успешные form mutations подтверждаются automated + DB
evidence, а не live-demo.

### 3.3. Performance baseline

Performance baseline снят на build/static и browser timing уровне, без Lighthouse.

Подтверждено:

- frontend build проходит стабильно;
- prerendered static routes генерируются без runtime errors;
- `sitemap` генерируется в build pipeline;
- проект использует предсобранную статическую витрину для ключевых public routes.

Зафиксированные численные baseline-показатели:

- prerendered `index.html` routes: `37`;
- размер `apps/front/dist/client`: `2.4M`;
- крупнейшие артефакты:
  - `three_0.167.1...js` — `457347 B`;
  - `vendor...js` — `361099 B`;
  - `motion-dom...js` — `94801 B`;
- local static timings на `astro preview` (`http://localhost:4322`) для build output:
  - `/ru/` — `size=52336`, `ttfb=0.003352`, `total=0.003383`;
  - `/en/articles/neea-llc/` — `size=27682`, `ttfb=0.002340`, `total=0.002364`;
  - `/vacancies/test-vacancy/` — `size=31826`, `ttfb=0.001025`, `total=0.001047`.
- browser timing из `browser-baseline-audit.json`:
  - `RU home` — `domContentLoaded=249.2`, `loadEventEnd=254.8`, `FCP=260`;
  - `EN home` — `domContentLoaded=75.7`, `loadEventEnd=78.1`, `FCP=84`;
  - `RU CMS page` — `domContentLoaded=116.9`, `loadEventEnd=2266.1`, `FCP=156`;
  - `Vacancy detail` — `domContentLoaded=68.6`, `loadEventEnd=70.1`, `FCP=72`.

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
- можно ссылаться на локальный browser timing baseline;
- нельзя писать о formal Lighthouse score или production web-vitals без дополнительного прогона.

## 4. Failures And Gaps

По состоянию на актуальный baseline `2026-06-01` основные прежние acceptance gaps закрыты:

- public `noindex` на `home-page/page` устранен через нормализацию versioned
  `seed-storefront.js` и `seed-pages.js`;
- `EN` detail coverage для representative `articles/projects` закрыта через
  versioned `seed-content.js`, runtime, build, sitemap и SQLite;
- browser-level accessibility/performance baseline теперь зафиксирован в локальном
  Playwright artifact.

Дополнительно `2026-06-01` на внешнем стенде проекта подтвержден и внешний сценарий:

- `Strapi publish/unpublish -> managed webhook -> Dokploy rebuild/redeploy -> обновление
  публичной Astro-витрины` воспроизведен как реальный `end-to-end` path.

## 5. What Is Ready For Chapter 2

Уже можно опираться на следующие тезисы:

- проект имеет не только реализованный код, но и воспроизводимую acceptance matrix;
- public routes, preview, forms, sitemap и managed rebuild webhook подтверждены фактами;
- testing contour отделяет automated, manual и external части;
- основной локальный acceptance baseline закрыт без скрытых gaps, а внешний rebuild
  contour дополнительно подтвержден stand validation `2026-06-01`.

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
curl -I http://localhost:4321/en/articles/neea-llc/
curl -I http://localhost:4321/ru/projects/project/
curl -I http://localhost:4321/en/projects/project/
curl -I http://localhost:4321/vacancies/test-vacancy/
```

### Preview checks

```bash
curl -i 'http://localhost:4321/api/preview?secret=bad&locale=ru&type=page&slug=cms-first-platform&status=draft'
curl -i "http://localhost:4321/api/preview?secret=${PREVIEW_SECRET}&locale=ru&type=page&slug=cms-first-platform&status=draft"
```

### Build and sitemap

```bash
pnpm --dir apps/front build
sed -n '1,220p' apps/front/dist/client/sitemap-index.xml
sed -n '1,260p' apps/front/dist/client/sitemap-0.xml
```

### Smoke contour

```bash
pnpm smoke:front
SMOKE_ALLOW_MUTATIONS=true pnpm smoke:front
pnpm --dir apps/front smoke:acceptance
pnpm audit:browser
```

### SQLite evidence

```bash
pnpm evidence:testing

sqlite3 apps/cms/.tmp/data.db "select name,url,headers,events,enabled from strapi_webhooks;"
sqlite3 apps/cms/.tmp/data.db "select id,full_name,email,source,form_name from lead_submissions order by id desc;"
sqlite3 apps/cms/.tmp/data.db "select id,full_name,email,source,hr_status from vacancy_applications order by id desc;"
```
