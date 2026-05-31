# Доказательная база для главы 2

## Назначение

Документ фиксирует подтвержденные по коду факты о текущем состоянии проекта, чтобы
проектная глава ВКР опиралась на реальную реализацию, а не на абстрактный план.

Дата актуализации: `2026-05-22`.

## Методика фиксации фактов

В документ включаются только сведения, подтверждаемые:

- структурой репозитория;
- конфигурацией `Nx`, `Strapi` и `Astro`;
- схемами контентных типов;
- маршрутами и кодом frontend-страниц;
- API-слоем и формами пользовательских сценариев.

Если возможность следует только из используемого фреймворка, но не подтверждена текущим
кодом проекта, она не считается реализованной частью системы.

Отдельный воспроизводимый testing baseline и матрица приемки вынесены в:

- [acceptance-matrix.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/acceptance-matrix.md)
- [testing-evidence-pack.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-evidence-pack.md)

## 1. Текущее состояние `apps/cms`

### 1.1. Платформа и конфигурация

Подтвержденные факты:

- `apps/cms` оформлен как отдельное приложение `Nx` с целями `dev`, `build`, `start`,
  `lint` и `test` в [apps/cms/project.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/project.json).
- В [apps/cms/package.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/package.json)
  используется `Strapi 5.33.3`, `@strapi/plugin-documentation`,
  `@strapi/plugin-users-permissions` и `better-sqlite3`.
- В [apps/cms/config/database.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/config/database.ts)
  предусмотрены `sqlite`, `postgres` и `mysql`, при этом по умолчанию выбран `sqlite`
  с файлом `.tmp/data.db`.
- В [apps/cms/config/server.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/config/server.ts)
  backend запускается на `0.0.0.0:1337`, поддерживает `PUBLIC_URL` и флаг `IS_PROXIED`.
- В [apps/cms/config/plugins.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/config/plugins.ts)
  включена генерация OpenAPI-документации с базовым URL `${PUBLIC_URL}/api`
  с fallback на `http://localhost:1337/api`.
- В [apps/cms/config/admin.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/config/admin.ts)
  включена конфигурация `preview`: при наличии `PREVIEW_SECRET` CMS формирует preview-ссылки
  на frontend через `/api/preview`, ограничивает допустимый origin значением `SITE_URL`
  и поддерживает цели `home`, `page`, `article`, `project`, `vacancy`.
- В [apps/cms/config/middlewares.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/config/middlewares.ts)
  подключен собственный middleware
  [enforce-published.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/middlewares/enforce-published.ts),
  который для публичных `GET /api/*` принудительно выставляет `status=published`,
  если запрос не содержит корректный `x-preview-secret`.
- В [apps/cms/src/index.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/index.ts)
  `bootstrap` предупреждает об отсутствии `PUBLIC_URL` и `PREVIEW_SECRET`, а также
  синхронизирует versioned security model.
- В
  [apps/cms/src/utils/security-model.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/utils/security-model.ts)
  зафиксирован source of truth для admin roles `Marketer / Content Manager`, `Editor`,
  `HR` и для content API roles `public` и `authenticated`.

Вывод для главы 2:

- backend уже реализован как самостоятельное CMS-ядро на `Strapi`;
- в репозитории есть база для REST API и OpenAPI-контракта;
- в коде зафиксирована базовая конфигурация для схемы `CMS в Docker за proxy`
  и защищенного draft-preview;
- backend уже дополнен versioned publication/deployment contour, включая rebuild hook и
  Docker bundle.

### 1.2. Существующие сущности CMS

Подтвержденные контентные типы:

| Сущность | Тип | Подтверждение | Краткое назначение |
|---|---|---|---|
| `article` | `collectionType` | `src/api/article/content-types/article/schema.json` | публикации со `slug`, обложкой, авторами и rich text-контентом |
| `author` | `collectionType` | `src/api/author/content-types/author/schema.json` | авторы статей |
| `project` | `collectionType` | `src/api/project/content-types/project/schema.json` | кейсы/проекты со `slug`, обложкой, логотипом и rich text-контентом |
| `vacancy` | `collectionType` | `src/api/vacancy/content-types/vacancy/schema.json` | вакансии с таксономиями, фильтрами и описанием |
| `vacancy-application` | `collectionType` | `src/api/vacancy-application/content-types/vacancy-application/schema.json` | отклики на вакансии |
| `lead-submission` | `collectionType` | `src/api/lead-submission/content-types/lead-submission/schema.json` | маркетинговые лиды из публичной формы витрины |
| `industry` | `collectionType` | `src/api/industry/content-types/industry/schema.json` | отрасли для вакансий |
| `job-role` | `collectionType` | `src/api/job-role/content-types/job-role/schema.json` | роли/категории вакансий |
| `global` | `singleType` | `src/api/global/content-types/global/schema.json` | глобальные данные сайта |
| `home-page` | `singleType` | `src/api/home-page/content-types/home-page/schema.json` | данные для главной страницы |
| `page` | `collectionType` | `src/api/page/content-types/page/schema.json` | локализуемые CMS-страницы с `slug`, `seo` и `Dynamic Zone` |

Подтвержденные свойства модели:

- `article`, `author`, `project`, `vacancy`, `industry`, `job-role`, `global`,
  `home-page` используют `draftAndPublish`.
- `article`, `author`, `project`, `vacancy`, `industry`, `job-role`, `global`,
  `home-page` используют `i18n`.
- `vacancy-application` и `lead-submission` не используют `draftAndPublish` и не
  локализуются, что логично для прикладных сущностей отправки пользовательских форм.

Подтвержденные связи:

- `article` <-> `author`: `manyToMany`.
- `vacancy` -> `industry`: `manyToOne`.
- `vacancy` -> `job-role`: `manyToOne`.
- `vacancy-application` -> `vacancy`: `manyToOne`.

Вывод для главы 2:

- в CMS уже существует содержательная модель для статей, проектов, вакансий, откликов и
  маркетинговых лидов;
- в CMS уже реализованы `pages`, переиспользуемые `components` и `Dynamic Zone`, включая
  отдельный блок `lead-form` для `home-page` и `pages`;
- `global` хранит структуру навигации, CTA и футера, а `home-page` использует тот же page-builder-контур, что и `pages`.

### 1.3. Реализованные API и сервисные сценарии

Подтвержденные факты:

- Для `article`, `author`, `global`, `home-page`, `project`, `vacancy`,
  `vacancy-application`, `lead-submission` используются стандартные `createCoreRouter`,
  `createCoreController`, `createCoreService`, но content API routes урезаны до
  минимально нужных действий:
  - `global` и `home-page`: только `find`;
  - `page`, `article`, `author`, `project`, `vacancy`, `industry`, `job-role`:
    только `find` и `findOne`;
  - `lead-submission` и `vacancy-application`: только `create`.
- В [apps/cms/src/api/doc-api/routes/doc-api.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/api/doc-api/routes/doc-api.ts)
  реализован кастомный маршрут `GET /api/documentation/:version/:slug`.
- В [apps/cms/src/api/doc-api/controllers/doc-api.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/api/doc-api/controllers/doc-api.ts)
  реализовано чтение JSON OpenAPI-документации из файловой системы `Strapi`.
- В [apps/cms/scripts/seed-vacancies.js](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/scripts/seed-vacancies.js)
  существует seed-сценарий для `industry`, `job-role` и `vacancy`, рассчитанный на локали
  `en` и `ru-RU`.

Что это реально дает проекту уже сейчас:

- CMS может выступать источником данных для публичной витрины;
- frontend может генерировать типизированный клиент из OpenAPI;
- модуль вакансий опирается на уже описанные в CMS таксономии и структуру откликов;
- в CMS зафиксирован отдельный прикладной контур сбора маркетинговых лидов без смешения
  с карьерными откликами;
- границы editor roles и public content API теперь синхронизируются из versioned source of
  truth, а не только из ручного состояния локальной БД.

Ограничения:

- секреты `PREVIEW_SECRET` и `CMS_API_TOKEN` по-прежнему не versioned и должны
  настраиваться вручную в окружении;
- runtime-подтверждение запуска Docker-контейнеров зависит от внешней доступности registry.

## 2. Текущее состояние `apps/front`

### 2.1. Платформа и сборка

Подтвержденные факты:

- `apps/front` оформлен как отдельное приложение `Nx` с целями `dev`, `build`, `preview`,
  `generate:api`, `lint`, `test` в [apps/front/project.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/project.json).
- В [apps/front/package.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/package.json)
  используется `Astro 6.4.2`, `@astrojs/react`, `@astrojs/node`,
  `@astrojs/sitemap`, `Tailwind 4`, `react-hook-form`, `zod`.
- В [apps/front/astro.config.mjs](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/astro.config.mjs)
  frontend подключает `Node.js` adapter и `sitemap`, берет абсолютный `site` URL из
  `SITE_URL` / `PUBLIC_SITE_URL`, работает в standalone-режиме и дополнительно исключает
  legacy redirect routes `/articles/*` и `/projects/*` из карты сайта.
- Во frontend включена генерация типизированного API-клиента через
  [apps/front/openapi-ts.config.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/openapi-ts.config.ts),
  который берет схему из `CMS_URL/api/documentation/1.0.0/full_documentation`.

Вывод для главы 2:

- витрина реализована как отдельный frontend-слой;
- публичная витрина остается основанной на предварительной сборке, но дополнена
  server-side preview-маршрутами через `prerender = false`;
- интеграция со `Strapi` уже частично типизирована через OpenAPI;
- generated client не покрывает весь frontend: для `global`, `home-page`, `pages` и
  карьерного модуля в проекте сохранен отдельный data-layer с явным управлением
  `locale`, `populate` и `draft/published` режимами.

### 2.2. Существующие публичные маршруты

Подтвержденные маршруты:

| Маршрут | Файл | Источник данных | Статус |
|---|---|---|---|
| `/` | `src/pages/index.astro` | редирект на `/ru/` | реализован как вход в локализованную витрину |
| `/[locale]` | `src/pages/[locale]/index.astro` | `fetchHomePage()` и `DynamicZoneRenderer` | реализован для главной витрины `ru/en` |
| `/[locale]/[slug]` | `src/pages/[locale]/[slug].astro` | `fetchPageSlugs()`, `fetchPageBySlug()` и `DynamicZoneRenderer` | реализован для локализованных CMS-страниц `pages` |
| `/preview/[locale]` | `src/pages/preview/[locale]/index.astro` | `fetchHomePage(..., draft)` | реализован как server-side preview главной |
| `/preview/[locale]/[slug]` | `src/pages/preview/[locale]/[slug].astro` | `fetchPageBySlug(..., draft)` | реализован как server-side preview CMS-страниц |
| `/preview/[locale]/articles/[slug]` | `src/pages/preview/[locale]/articles/[slug].astro` | `fetchArticleBySlug(..., draft)` | реализован как server-side preview статей |
| `/preview/[locale]/projects/[slug]` | `src/pages/preview/[locale]/projects/[slug].astro` | `fetchProjectBySlug(..., draft)` | реализован как server-side preview проектов |
| `/preview/[locale]/vacancies/[slug]` | `src/pages/preview/[locale]/vacancies/[slug].astro` | `fetchVacancyBySlug(..., draft)` | реализован как server-side preview вакансий |
| `/api/preview` | `src/pages/api/preview.ts` | проверка `PREVIEW_SECRET`, установка preview cookie | реализован |
| `/api/exit-preview` | `src/pages/api/exit-preview.ts` | очистка preview cookie и возврат на public URL | реализован |
| `/api/lead-submissions` | `src/pages/api/lead-submissions.ts` | server-side валидация и запись маркетингового лида в `Strapi` | реализован |
| `/[locale]/articles` | `src/pages/[locale]/articles/index.astro` | `fetchArticlePreviews()` | реализован для `ru/en` |
| `/[locale]/articles/[slug]` | `src/pages/[locale]/articles/[slug].astro` | `fetchArticleSlugs()`, `fetchArticleBySlug()` | реализован для `ru/en` |
| `/[locale]/projects` | `src/pages/[locale]/projects/index.astro` | `fetchProjectPreviews()` | реализован для `ru/en` |
| `/[locale]/projects/[slug]` | `src/pages/[locale]/projects/[slug].astro` | `fetchProjectSlugs()`, `fetchProjectBySlug()` | реализован для `ru/en` |
| `/articles` | `src/pages/articles/index.astro` | redirect на `/ru/articles/` | реализован как legacy compatibility route |
| `/articles/[slug]` | `src/pages/articles/[slug]/index.astro` | redirect на `/ru/articles/[slug]/` | реализован как legacy compatibility route |
| `/projects` | `src/pages/projects/index.astro` | redirect на `/ru/projects/` | реализован как legacy compatibility route |
| `/projects/[slug]` | `src/pages/projects/[slug]/index.astro` | redirect на `/ru/projects/[slug]/` | реализован как legacy compatibility route |
| `/vacancies` | `src/pages/vacancies/index.astro` | клиентский `VacancyExplorer` | реализован |
| `/vacancies/[slug]` | `src/pages/vacancies/[slug]/index.astro` | `fetchVacancies()`, `fetchVacancyBySlug()` | реализован |

Маршрутная матрица локалей:

| Сущность | Site locale | CMS locale | Production route | Preview route | Статус |
|---|---|---|---|---|---|
| `home-page` | `ru/en` | `ru-RU/en` | `/:locale/` | `/preview/:locale/` | входит в общий `ru/en` contour |
| `page` | `ru/en` | `ru-RU/en` | `/:locale/:slug/` | `/preview/:locale/:slug/` | входит в общий `ru/en` contour |
| `article` | `ru/en` | `ru-RU/en` | `/:locale/articles/:slug/` | `/preview/:locale/articles/:slug/` | входит в общий `ru/en` contour |
| `project` | `ru/en` | `ru-RU/en` | `/:locale/projects/:slug/` | `/preview/:locale/projects/:slug/` | входит в общий `ru/en` contour |
| `vacancy` | `ru/en` в CMS/preview | `ru-RU/en` | `/vacancies/:slug/` | `/preview/:locale/vacancies/:slug/` | осознанное ограничение production UI |

Что это реально подтверждает:

- frontend уже публикует локализованную главную витрину через `home-page` из `Strapi`;
- frontend уже умеет генерировать локализованные CMS-страницы `pages` по маршруту `/:locale/:slug/`;
- frontend уже публикует `articles` и `projects` в том же locale-prefixed production contour;
- frontend уже умеет открывать draft-preview для `home-page`, `pages`, `articles`,
  `projects` и `vacancies` через server-side маршруты `/preview/...`;
- preview-контур теперь связан с CMS admin-конфигурацией и может формировать preview-ссылки
  на frontend на основании `documentId`, локали и статуса публикации;
- `home-page` и `pages` теперь могут включать собственный маркетинговый блок формы без
  внешнего embed;
- frontend уже публикует статьи, проекты и вакансии;
- детальные страницы статей и проектов рендерятся статически через locale-aware `getStaticPaths`;
- каталог вакансий и страница вакансии уже существуют как отдельный прикладной модуль.

Ограничения:

- locale-prefixed маршрутный контур теперь покрывает `home-page`, `pages`, `articles` и
  `projects`;
- карьерный модуль `vacancies` пока остается вне общего locale-prefixed production contour;
- locale-prefixed preview уже покрывает витрину и ключевые content sections, включая
  `vacancies`, но публичный карьерный UI все еще остается отдельным ограничением.

### 2.3. Реально используемые сценарии frontend

#### Статьи и проекты

Подтвержденные факты:

- списки и детальные страницы статей и проектов получают данные через собственный
  locale-aware data-layer [apps/front/src/shared/api/pages.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/api/pages.ts);
- статические пути для статей и проектов строятся отдельно для `ru` и `en`;
- карточки и preview-блоки используют общий route helper для `/:locale/articles/...` и
  `/:locale/projects/...`;
- rich text-контент выводится через `MarkdownContent`.

Что это означает:

- для `articles` и `projects` уже существует связка `Strapi i18n -> shared fetch layer ->
  locale-aware Astro routes`;
- CMS реально используется как источник контента для двух двуязычных публичных разделов.

Ограничение:

- rich text выводится через `marked` и `dangerouslySetInnerHTML` без отдельного слоя
  sanitization; в текущей архитектуре это допустимо только при доверии к редакторскому
  контуру CMS.

#### Вакансии и отклики

Подтвержденные факты:

- В [apps/front/src/shared/api/vacancies.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/api/vacancies.ts)
  реализованы:
  - загрузка списка вакансий;
  - фильтрация по отрасли, роли, локации, формату работы, типу занятости и уровню;
  - пагинация;
  - загрузка детальной вакансии по `slug`;
  - отправка отклика в `POST /api/vacancy-applications`.
- В [apps/front/src/widgets/VacancyExplorer/ui/VacancyExplorer.tsx](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/VacancyExplorer/ui/VacancyExplorer.tsx)
  реализованы:
  - интерактивные фильтры;
  - синхронизация фильтров и страницы с query string;
  - загрузка таксономий `industry` и `job-role`;
  - пагинация и состояние загрузки/ошибки.
- В [apps/front/src/widgets/VacancyApplicationForm/model/schema.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/VacancyApplicationForm/model/schema.ts)
  реализована валидация формы через `zod`.
- В [apps/front/src/widgets/VacancyApplicationForm/model/useVacancyApplicationRHF.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/VacancyApplicationForm/model/useVacancyApplicationRHF.ts)
  реализован `honeypot` и отправка формы через `react-hook-form`.
- В [apps/front/src/widgets/VacancyApplicationForm/ui/VacancyApplicationForm.tsx](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/VacancyApplicationForm/ui/VacancyApplicationForm.tsx)
  реализованы загрузка файла резюме, consent checkbox и пользовательские сообщения об
  успехе/ошибке.

Что это означает:

- модуль вакансий является самой прикладной и завершенной частью текущего проекта;
- уже реализован полный пользовательский сценарий `просмотр вакансии -> заполнение формы ->
  отправка отклика`.

Ограничения:

- в коде не подтвержден `rate limit`;
- не зафиксирована серверная бизнес-логика модерации откликов сверх стандартной записи в
  `Strapi`;
- текущий сценарий вакансий использует рукописный API-слой, а не generated client, то есть
  в проекте пока сосуществуют два подхода к интеграции с CMS.

#### Маркетинговые лиды

Подтвержденные факты:

- В [apps/cms/src/components/blocks/lead-form.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/components/blocks/lead-form.json)
  зафиксирован отдельный block `lead-form` с редакторскими полями для `formName`,
  заголовка, описания, текста consent и пользовательских сообщений.
- В [apps/cms/src/api/page/content-types/page/schema.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/api/page/content-types/page/schema.json)
  и [apps/cms/src/api/home-page/content-types/home-page/schema.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/api/home-page/content-types/home-page/schema.json)
  block `lead-form` подключен к `Dynamic Zone` для `page` и `home-page`.
- В [apps/front/src/shared/components/page-builder/blocks/LeadFormBlock.tsx](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/components/page-builder/blocks/LeadFormBlock.tsx)
  и [apps/front/src/widgets/LeadCaptureForm/ui/LeadCaptureForm.tsx](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/LeadCaptureForm/ui/LeadCaptureForm.tsx)
  реализован frontend-блок собственной маркетинговой формы.
- В [apps/front/src/widgets/LeadCaptureForm/model/schema.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/LeadCaptureForm/model/schema.ts)
  реализована локализуемая валидация через `zod` с ограничениями полей, consent и
  `honeypot`.
- В [apps/front/src/pages/api/lead-submissions.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/api/lead-submissions.ts)
  реализован Astro API route, который повторно валидирует payload, проверяет `honeypot`
  и создает запись `lead-submission` в `Strapi` через server-side `CMS_API_TOKEN`.
- В [apps/front/src/shared/components/page-builder/DynamicZoneRenderer.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/components/page-builder/DynamicZoneRenderer.astro)
  и [apps/front/src/shared/components/page-builder/PageBlock.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/components/page-builder/PageBlock.astro)
  block подключен к общему renderer’у `home-page` и `pages`.

Что это означает:

- в проекте появился отдельный прикладной сценарий маркетингового лида, не смешанный с
  `vacancy-application`;
- форма встроена в CMS-first page builder и может размещаться как на главной витрине,
  так и на произвольных CMS-страницах;
- запись лида проходит через server-side прослойку frontend, а не через прямой browser
  POST в `Strapi`.

Ограничения:

- в коде пока не подтвержден `rate limit` для маршрута `/api/lead-submissions`;
- не реализованы CRM-интеграции, email automation и дальнейший workflow обработки лида;
- для server-side записи требуется явный environment contract `CMS_API_TOKEN`.

### 2.4. Части frontend вне полного CMS/i18n-контура

Подтвержденные факты:

- В [apps/front/src/layouts/main.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/layouts/main.astro)
  layout загружает `global` из `Strapi`, передает CMS-данные в `Header` и `Footer`,
  а также централизованно рендерит `title`, `description`, `canonical`, `Open Graph`,
  `twitter:*` и `robots`.
- В [apps/front/src/shared/api/site.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/api/site.ts)
  реализован отдельный data-layer для `global` и `home-page`, включая маппинг локалей,
  CTA, навигации, футера и `Dynamic Zone`, а также поддержку `published/draft` запросов.
- В [apps/front/src/pages/[locale]/index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/[locale]/index.astro)
  главная страница строится по данным `home-page` из `Strapi` и использует CMS-управляемые
  `SEO/Open Graph` метаданные.
- В [apps/front/src/pages/[locale]/[slug].astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/[locale]/[slug].astro)
  `pages` переведены на локализованный маршрут `/:locale/:slug/` и используют те же
  CMS-управляемые метаданные.
- В [apps/front/src/pages/preview/[locale]/index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/preview/[locale]/index.astro),
  [apps/front/src/pages/preview/[locale]/[slug].astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/preview/[locale]/[slug].astro),
  [apps/front/src/pages/preview/[locale]/articles/[slug].astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/preview/[locale]/articles/[slug].astro),
  [apps/front/src/pages/preview/[locale]/projects/[slug].astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/preview/[locale]/projects/[slug].astro)
  и [apps/front/src/pages/preview/[locale]/vacancies/[slug].astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/preview/[locale]/vacancies/[slug].astro)
  реализован защищенный preview для draft-версий с `noindex` и canonical на публичный URL.
- В [apps/front/src/shared/preview/session.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/preview/session.ts)
  зафиксирована cookie-based preview session и secret-header для запросов к CMS.
- В [apps/cms/config/admin.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/config/admin.ts)
  preview интегрирован на стороне `Strapi Admin`: CMS определяет целевой тип сущности,
  при необходимости извлекает `slug` по `documentId` и передает на frontend параметры
  `secret`, `locale`, `type`, `slug`, `status`.
- В [apps/front/src/widgets/Header/model/const.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/Header/model/const.ts)
  и [apps/front/src/widgets/Footer/model/const.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/Footer/model/const.ts)
  локальные константы сохранены как fallback, но больше не являются основным источником данных для витрины первой очереди.
- В [apps/front/src/shared/i18n/content-collections.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/i18n/content-collections.ts)
  зафиксирована локализованная copy для list/detail контуров `articles` и `projects`.
- Legacy-маршруты [apps/front/src/pages/articles/index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/articles/index.astro),
  [apps/front/src/pages/articles/[slug]/index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/articles/[slug]/index.astro),
  [apps/front/src/pages/projects/index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/projects/index.astro)
  и [apps/front/src/pages/projects/[slug]/index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/projects/[slug]/index.astro)
  переведены в redirect compatibility layer на `/ru/...`.
- Карьерный модуль `vacancies` по-прежнему содержит локальные UI-тексты и не переведен на
  locale-prefixed production routes.

Что это означает:

- ключевые тексты навигации, футера и основной витрины уже вынесены в `Strapi`;
- `global`, `home-page` и `pages` образуют рабочий CMS-first контур публичной витрины первой очереди;
- для `home-page`, `pages` и detail entities `article/project/vacancy` уже реализован
  управляемый `SEO/Open Graph` контур из CMS;
- для `home-page`, `pages`, `articles`, `projects` и `vacancies` уже реализован защищенный
  preview-сценарий `draft -> server-side preview`;
- preview-сценарий уже связан с `Strapi Admin` через генерацию целевых preview-ссылок на
  frontend по `documentId`, локали и статусу публикации;
- неполнота проекта теперь связана не с отсутствием CMS-интеграции как таковой, а с
  осознанной границей карьерного модуля и незавершенными эксплуатационными сценариями.

## 3. Уже реализованные части системы

На основании текущего кода можно безопасно считать уже реализованными:

- monorepo `Nx + pnpm` с двумя приложениями `apps/cms` и `apps/front`;
- CMS на `Strapi 5` с сущностями `article`, `project`, `vacancy`,
  `vacancy-application`, `lead-submission`, `author`, `industry`, `job-role`, `global`,
  `home-page`, `page`;
- компоненты `Strapi` для page builder, навигации, CTA и футера;
- block `lead-form` в `Dynamic Zone` для `home-page` и `pages`;
- OpenAPI-документацию backend и генерацию типизированного frontend-клиента;
- локализованную главную витрину `/:locale/`, строящуюся по `home-page` из `Strapi`;
- локализованные CMS-страницы `/:locale/:slug/`, строящиеся по `pages` и `Dynamic Zone`;
- locale-prefixed публичные разделы `/:locale/articles/` и `/:locale/projects/`;
- вынос ключевых текстов header/footer/main showcase из frontend в `global` и `home-page`;
- CMS-управляемые `SEO/Open Graph` метаданные для `home-page`, `pages` и detail entities
  `article/project/vacancy`;
- защищенный preview mode для `home-page`, `pages`, `articles`, `projects` и `vacancies`;
- автоматическую генерацию `sitemap` для публичных prerendered маршрутов;
- публичные разделы статей и проектов с детальными страницами;
- модуль вакансий с фильтрацией, пагинацией, карточками и детальной страницей;
- форму отклика на вакансию с валидацией, `honeypot`, consent и загрузкой резюме;
- маркетинговую lead form с валидацией, `honeypot`, consent и Astro API route;
- гибридный публикационный контур frontend: prerendered public routes + server-side preview.
- versioned admin-managed webhook `publish/unpublish -> rebuild`;
- versioned Docker contour CMS с `Dockerfile`, `compose.yml` и production-like env contract.

## 4. Ограничения текущего состояния проекта

Для следующего этапа важно различать два класса ограничений:

- незакрытые обязательные элементы финального результата;
- допустимые ограничения, которые по
  [final-scope.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-scope.md)
  не считаются провалом итоговой версии.

### 4.1. Что уже закрыто как обязательная часть final scope

- production-oriented сценарий `publish/unpublish -> webhook -> rebuild` на стороне CMS;
- versioned-конфигурация CMS в `Docker`;
- формализованный env-contract для preview, rebuild hook и Docker contour.

Подробный source of truth по этому участку вынесен в
[publication-deployment-contour.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/publication-deployment-contour.md).

Локально доказано:

- `TypeScript`-компиляция CMS;
- production build CMS;
- создание managed webhook в `strapi_webhooks` при старте CMS;
- валидность `compose.yml` при наличии корректного `.env.docker`.

Локально не доказано end-to-end:

- конечный внешний `Dokploy` rebuild/redeploy после production hook;
- полный `docker build` как завершенный результат текущей сессии, потому что проверка
  уперлась во внешний сетевой сбой загрузки `pnpm` через `corepack`, а не в ошибку
  versioned Docker bundle.

### 4.2. Что пока не реализовано, но обязательно для финального результата

- воспроизводимая тестовая матрица вместо заглушек `lint/test`, включая фиксацию метрик
  `SEO`, `accessibility` и `performance`.

### 4.3. Что уже является осознанным допустимым ограничением final scope

- публичный locale-prefixed контур ограничен маршрутами `/:locale/`, `/:locale/:slug/`,
  `/:locale/articles/...` и `/:locale/projects/...`;
- списковые и детальные production-маршруты `vacancies` могут оставаться вне той же
  route-схемы `ru/en`;
- отдельный CMS-managed `SEO` для section list pages `articles/projects/vacancies`
  не реализован и осознанно остается route-owned fallback-слоем;
- для `articles/projects/vacancies` допустим более простой meta-layer, строящийся в основном
  из самих контентных полей;
- тестовый контур может оставаться преимущественно ручным;
- публикация может оставаться rebuild-based без real-time обновлений;
- формы могут оставаться без `rate limit`, CRM-интеграции и email automation.

### 4.4. Дополнительные технические ограничения текущей версии

- отсутствует единый подход к frontend-интеграции с CMS: `pages/articles/projects`
  используют собственный shared fetch-layer, вакансии используют отдельный рукописный API-слой;
- полная prerender-сборка публичной витрины по-прежнему зависит от доступности `Strapi`
  во время build;
- часть production-path зависит от внешней инфраструктуры `Dokploy` и сетевой доступности
  registry во время Docker build;
- secrets и фактические учетные записи пользователей остаются эксплуатационной настройкой,
  а не versioned артефактом репозитория;
- значительная часть project chapter уже может писаться как описание завершенной
  реализации, кроме блока финальных метрик.

## 5. Минимальный практический набор обязательных доработок

На основании текущего кода и уже замороженного final scope обязательный остаток работ
сводится к следующему:

| Обязательная доработка | Почему это критично именно для главы 2 | Что уже есть в коде | Что нужно довести |
|---|---|---|---|
| Тестовая матрица и метрики | без нее диплом теряет доказательность результата | storefront-core, preview, sitemap и формы уже можно проверять по коду | оформить воспроизводимые проверки, зафиксировать `SEO`, `accessibility`, `performance` и rebuild |

Почему именно этот набор минимален:

- он покрывает все реально незакрытые обязательные элементы финального результата;
- он не раздувает тему за пределы уже замороженного scope;
- каждый пункт напрямую конвертируется в сильный подраздел главы 2: публикация, deployment,
  безопасность и проверяемость.

## 6. Что можно безопасно писать в черновике главы 2 уже сейчас

На основе текущей доказательной базы уже можно писать:

- структуру monorepo и роли `apps/cms` и `apps/front`;
- текущую архитектуру взаимодействия `Strapi -> API -> Astro`, включая частично
  типизированный OpenAPI-контур и отдельные frontend-fetchers для page builder и
  карьерного модуля;
- существующую модель данных для `articles`, `projects`, `vacancies`,
  `vacancy-applications`, `lead-submissions`, `industry`, `job-role`, `global`,
  `home-page`, `page`;
- использование `components` и `Dynamic Zone` для `pages` и `home-page`, включая
  собственный `lead-form` block;
- locale-prefixed маршруты `/:locale/`, `/:locale/:slug/`, `/:locale/articles/...`,
  `/:locale/projects/...`;
- вынос ключевых текстов навигации, футера и основной витрины в `Strapi`;
- централизованный рендер `lang`, `description`, `canonical`, `Open Graph`, `twitter:*`, `noindex`;
- защищенный preview mode для `home-page`, `pages`, `articles`, `projects` и `vacancies`;
- автоматическую генерацию `sitemap` на основе публичных prerendered маршрутов;
- публикационный contour `publish/unpublish -> admin-managed webhook -> rebuild` как реализованный кодовый механизм;
- deployment-архитектуру `frontend и CMS как отдельных Docker`-приложений в `Dokploy` с versioned env contract;
- versioned security model для `administrator`, `marketer/content-manager`, `editor`,
  `hr`, а также read-only public API contour и preview boundary;
- публичные маршруты статей, проектов и вакансий как уже существующие content sections,
  с отдельной route-границей для карьерного модуля.
- пользовательские сценарии вакансий/откликов и маркетинговых лидов;
- ограничения текущего состояния проекта и перечень обязательных доработок.

Пока рано писать как реализованный результат:

- полную end-to-end воспроизводимость внешнего `Dokploy` rebuild/redeploy внутри локальной среды;
- финальные измеренные метрики `SEO`, `accessibility` и `performance`.
