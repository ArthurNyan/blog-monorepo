# Acceptance Matrix

Дата актуализации: `2026-06-01`.

## Назначение

Документ фиксирует формализованную матрицу приемки для дипломного контура. Он нужен,
чтобы проверка не сводилась к общим словам вроде “страницы открываются”, а распадалась
на конкретные сценарии, тип проверки, ожидаемый результат и текущий статус доказательства.

## Правила чтения матрицы

- `Automated` означает повторяемую проверку командой или скриптом.
- `Manual` означает ручную, но формализованную проверку по шагам.
- `Code/Build evidence` означает факт, подтвержденный кодом, build output или БД,
  но не прогнанный как полноценный пользовательский runtime-path.
- `Pass` означает подтвержденный факт на актуальном baseline матрицы.
- Статусы матрицы привязаны к baseline `2026-06-01`; результаты `2026-05-22`
  сохраняются только как историческое build/perf/browser-tooling evidence там,
  где сценарий не перепроверялся отдельно позже.
- `Partial` означает, что часть сценария подтверждена, но остаются ограничения среды,
  данных или внешней инфраструктуры.
- `Fail` означает наблюдаемый разрыв между целевым claim и текущим baseline.
- `Unverified` означает, что сценарий описан и должен проверяться, но в этой сессии
  не доведен до фактического результата.

## Visitor Scenarios

| ID | Сценарий | Проверка | Тип | Статус | Evidence / замечание |
|---|---|---|---|---|---|
| `PUB-01` | Redirect `/` -> `/ru/` | HTTP redirect с сохранением locale entry point | Automated | `Pass` | Проверено live runtime на `http://localhost:4321/`. |
| `PUB-02` | Главная `ru` | `200`, корректный `<title>`, `canonical`, `og:title`, `html[lang=ru]`, один `h1` | Automated | `Pass` | Проверено live runtime и включено в smoke contour. |
| `PUB-03` | Главная `en` | `200`, корректный `<title>`, `canonical`, `og:title`, `html[lang=en]`, один `h1` | Automated | `Pass` | Проверено live runtime и включено в smoke contour. |
| `PUB-04` | CMS page `ru` | `/ru/cms-first-platform/` открывается и рендерит SEO-контур | Automated | `Pass` | Проверено live runtime, preview draft route и повторно подтверждено read-only smoke `2026-05-31`. |
| `PUB-05` | CMS page `en` | `/en/cms-first-platform/` открывается и рендерит SEO-контур | Automated | `Pass` | Проверено live runtime, build output и повторно подтверждено read-only smoke `2026-05-31`. |
| `PUB-06` | Articles list `ru` | `/ru/articles/` возвращает `200` и рендерит list page | Automated | `Pass` | Проверено live runtime и static build. |
| `PUB-07` | Article detail `ru` | `/ru/articles/neea-llc/` возвращает `200`, canonical/OG присутствуют | Automated | `Pass` | Проверено live runtime и static build. |
| `PUB-08` | Projects list `ru` | `/ru/projects/` возвращает `200` и рендерит list page | Automated | `Pass` | Проверено live runtime и static build. |
| `PUB-09` | Project detail `ru` | `/ru/projects/project/` возвращает `200`, canonical/OG присутствуют | Automated | `Pass` | Проверено live runtime и static build. |
| `PUB-10` | Vacancies list | `/vacancies/` возвращает `200`, список фильтруемых вакансий доступен | Automated | `Pass` | Проверено live runtime и static build. |
| `PUB-11` | Vacancy detail | `/vacancies/test-vacancy/` возвращает `200`, форма отклика подключена | Automated | `Pass` | Проверено live runtime, static build и form submit. |
| `PUB-12` | Legacy redirects `articles/projects` | `/articles/...` и `/projects/...` редиректят на locale-prefixed `ru` | Automated | `Pass` | Проверено live runtime и включено в smoke contour. |

## Editor And Preview Scenarios

| ID | Сценарий | Проверка | Тип | Статус | Evidence / замечание |
|---|---|---|---|---|---|
| `PRV-01` | Invalid preview secret | `/api/preview` с неверным secret возвращает `401` | Automated | `Pass` | Проверено live runtime. |
| `PRV-02` | Published preview target | `/api/preview?...status=published` редиректит на public URL и очищает cookie | Automated | `Pass` | Проверено live runtime на `page`. |
| `PRV-03` | Draft preview target | `/api/preview?...status=draft` выставляет `__cms_preview` cookie и ведет на `/preview/...` | Automated | `Pass` | Проверено live runtime на `page`. |
| `PRV-04` | Preview noindex | Draft preview HTML содержит `meta name=\"robots\" content=\"noindex, nofollow\"` | Automated | `Pass` | Проверено на `/preview/ru/cms-first-platform/`. |
| `PRV-05` | Draft data existence | В CMS реально существуют draft-версии `page/article/project/vacancy` | Code/Build evidence | `Pass` | Подтверждено запросами к `Strapi` с `x-preview-secret` и `status=draft`. |
| `PRV-06` | Preview для `article/project/vacancy` | Published redirect, draft cookie и `noindex` подтверждены для всех detail types | Automated | `Pass` | Обновленный smoke contour `2026-05-31` проверяет `/api/preview` и `/preview/...` для `article`, `project`, `vacancy` и подтверждает draft/public path behavior. |

## Forms And Validation

| ID | Сценарий | Проверка | Тип | Статус | Evidence / замечание |
|---|---|---|---|---|---|
| `FRM-01` | Lead form invalid payload | `/api/lead-submissions` возвращает `400` и field errors на неполных данных | Automated | `Pass` | Проверено live runtime. |
| `FRM-02` | Lead form valid submit | Валидный JSON дает `201` и новую строку в `lead_submissions` | Automated + DB evidence | `Pass` | Подтверждено HTTP `201` и ростом таблицы `lead_submissions` в SQLite. |
| `FRM-03` | Vacancy form CSRF guard | Cross-site form POST без same-origin контекста блокируется | Automated | `Pass` | Получен отказ `Cross-site POST form submissions are forbidden`. |
| `FRM-04` | Vacancy form invalid file | `.txt` resume отклоняется с `400` | Automated | `Pass` | Проверено live runtime. |
| `FRM-05` | Vacancy form valid submit | Валидный multipart с `.pdf` дает `201` и новую строку в `vacancy_applications` | Automated + DB evidence | `Pass` | Подтверждено HTTP `201` и ростом таблицы `vacancy_applications` в SQLite. |

## SEO, Sitemap, Locale, Publication

| ID | Сценарий | Проверка | Тип | Статус | Evidence / замечание |
|---|---|---|---|---|---|
| `SEO-01` | Canonical / OG on key routes | На representative routes присутствуют `canonical`, `og:title`, `og:url` | Automated | `Pass` | Проверено live runtime для `home/page/article/project/vacancy`. |
| `SEO-02` | Preview noindex | Preview route не индексируется | Automated | `Pass` | Проверено live runtime. |
| `SEO-03` | Editor-managed detail SEO | `home-page`, `page`, `article`, `project`, `vacancy` используют CMS SEO/fallback layer | Code/Build evidence + runtime sample | `Pass` | Подтверждено кодом layout/metadata и representative pages. |
| `SEO-04` | Public page indexability | Публичные `home-page` и `page` не должны нести `robots=noindex` | Automated | `Pass` | Versioned `seed-storefront.js` / `seed-pages.js` нормализованы, затем `pnpm smoke:front` на baseline `2026-05-31` подтвердил отсутствие public `noindex` на `/ru/`, `/en/`, `/ru/cms-first-platform/`, `/en/cms-first-platform/`. |
| `SM-01` | Sitemap generation in build | `apps/front/dist/client/sitemap-index.xml` и `sitemap-0.xml` генерируются после build | Automated | `Pass` | Повторно подтверждено build output `2026-05-31`. |
| `SM-02` | Sitemap contains storefront routes | В sitemap входят `/ru/`, `/en/`, `ru` detail routes и `/vacancies/...` | Automated | `Pass` | Проверено по `dist/client/sitemap-0.xml`. |
| `SM-03` | Sitemap excludes legacy routes | Legacy `/articles` и `/projects` без locale отсутствуют в sitemap | Automated | `Pass` | Проверено по `dist/client/sitemap-0.xml` и `astro.config.mjs`. |
| `LOC-01` | Storefront-core `ru/en` | `home-page` и `page` доступны и собираются в обеих локалях | Automated | `Pass` | Проверено live runtime и build output. |
| `LOC-02` | `articles/projects` locale-prefixed routes | `/:locale/articles/` и `/:locale/projects/` buildятся для `ru/en` | Automated | `Pass` | Проверено build output. |
| `LOC-03` | `articles/projects` EN detail coverage | Наличие английских detail entries для representative `article/project` | Automated + Code/Build evidence | `Pass` | Versioned `seed-content.js` теперь публикует representative `en` article/project detail entries; runtime, build, sitemap и SQLite `2026-05-31` подтверждают `/en/articles/neea-llc/` и `/en/projects/project/`. |
| `LOC-04` | Vacancies public locale boundary | Публичные вакансии живут вне `/:locale/...`, preview при этом locale-aware | Automated + Code/Build evidence | `Pass` | Подтверждено route helpers, runtime и build output. |
| `PUBF-01` | Managed rebuild webhook exists | Активный `Frontend rebuild hook` есть в `strapi_webhooks` | Automated + DB evidence | `Pass` | Подтверждено прямым запросом к SQLite. |
| `PUBF-02` | Webhook events | Webhook подписан на `entry.publish` и `entry.unpublish` | Automated + DB evidence | `Pass` | Подтверждено прямым запросом к SQLite. |
| `PUBF-03` | External rebuild trigger | Реальный внешний `Dokploy` rebuild/redeploy после publish/unpublish | Manual / external | `Pass` | Подтверждено на внешнем стенде проекта `2026-06-01`: publish/unpublish в `Strapi` инициирует webhook, `Dokploy` запускает rebuild/redeploy, а обновление отражается на публичной `Astro`-витрине без ручной сборки frontend. |

## Accessibility And Performance Baseline

| ID | Сценарий | Проверка | Тип | Статус | Evidence / замечание |
|---|---|---|---|---|---|
| `A11Y-01` | Structural accessibility baseline | Проверка `html[lang]`, наличия `h1`, `title`, `description`, `canonical`, `robots` на preview | Automated | `Pass` | Включено в smoke contour и дополнительно подтверждено live HTML. |
| `A11Y-02` | Form semantics baseline | Проверка server-side validation, consent/honeypot paths и same-origin guard | Automated | `Pass` | Подтверждено runtime API routes. |
| `A11Y-03` | Browser-level accessibility audit | Playwright-проверка representative routes на `html[lang]`, `h1`, наличие форм, отсутствие unlabeled form controls, `page errors` и same-origin runtime/resource failures | Automated | `Pass` | `pnpm audit:browser` сохранил artifact `browser-baseline-audit.json` и дал `failures=0` для `ru/en home`, `ru CMS page`, `vacancy detail`. Cross-origin placeholder asset вне локального contour не учитывается как hard failure. |
| `PERF-01` | Frontend build baseline | Frontend build проходит, static routes генерируются без runtime errors | Automated | `Pass` | `pnpm --dir apps/front build` успешно выполнен `2026-05-31`; prerendered `index.html` routes: `37`. |
| `PERF-02` | Static asset baseline | Размер build output и крупнейшие chunks зафиксированы | Automated | `Pass` | `dist/client`: `2.4M`; крупнейшие chunks: `three` `457347 B`, `vendor` `361099 B`, `motion-dom` `94801 B`. |
| `PERF-03` | Browser navigation timing baseline | Playwright browser audit собирает navigation/FCP metrics на representative routes | Automated | `Pass` | `pnpm audit:browser` записал `domContentLoaded`, `loadEventEnd`, `responseStart`, `firstContentfulPaint` и `resourceCount` для `ru/en home`, `ru CMS page`, `vacancy detail`; failures `0`. Это локальный browser baseline, а не production Web Vitals. |
| `SMK-01` | Minimal automated smoke contour | `pnpm --dir apps/front smoke:acceptance` и `SMOKE_ALLOW_MUTATIONS=true ...` воспроизводят baseline acceptance checks | Automated | `Pass` | Smoke script разделяет `runtime_invariants`, `preview_runtime`, `build_evidence`, `dataset_limitations` и `mutation_checks`; актуальный baseline `2026-05-31` дает `0` failures / `1` warning в read-only режиме и `0` failures / `0` warnings в mutation режиме. Единственный read-only warning: skipped mutation checks без `SMOKE_ALLOW_MUTATIONS=true`. |

## Вывод для диплома

По состоянию на `2026-06-01` у проекта есть воспроизводимая матрица приемки, где:

- ключевые публичные сценарии подтверждены runtime и build evidence;
- preview, формы и managed rebuild webhook подтверждены лучше, чем просто “по коду”;
- `ru/en` detail coverage для representative `articles/projects` теперь подтверждена
  versioned `seed-content.js`, runtime, build и sitemap;
- public indexability `home-page/page` подтверждена после нормализации versioned seed;
- accessibility и performance усилены локальным Playwright browser audit;
- внешний `Dokploy rebuild/redeploy` после publish/unpublish подтвержден отдельной
  stand validation `2026-06-01`.
