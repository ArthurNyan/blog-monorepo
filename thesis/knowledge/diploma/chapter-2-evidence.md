# Доказательная база для главы 2

## Назначение

Документ фиксирует подтвержденные по коду факты о текущем состоянии проекта, чтобы
проектная глава ВКР опиралась на реальную реализацию, а не на абстрактный план.

Дата актуализации: `2026-05-18`.

## Методика фиксации фактов

В документ включаются только сведения, подтверждаемые:

- структурой репозитория;
- конфигурацией `Nx`, `Strapi` и `Astro`;
- схемами контентных типов;
- маршрутами и кодом frontend-страниц;
- API-слоем и формами пользовательских сценариев.

Если возможность следует только из используемого фреймворка, но не подтверждена текущим
кодом проекта, она не считается реализованной частью системы.

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
- В [apps/cms/config/middlewares.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/config/middlewares.ts)
  подключен собственный middleware
  [enforce-published.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/middlewares/enforce-published.ts),
  который для публичных `GET /api/*` принудительно выставляет `status=published`,
  если запрос не содержит корректный `x-preview-secret`.
- В [apps/cms/src/index.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/index.ts)
  `bootstrap` предупреждает об отсутствии `PUBLIC_URL` и `PREVIEW_SECRET`.

Вывод для главы 2:

- backend уже реализован как самостоятельное CMS-ядро на `Strapi`;
- в репозитории есть база для REST API и OpenAPI-контракта;
- в коде зафиксирована базовая конфигурация для схемы `CMS в Docker за proxy`
  и защищенного draft-preview;
- production-конфигурация `Docker` на текущем этапе все еще не зафиксирована как
  versioned deployment bundle.

### 1.2. Существующие сущности CMS

Подтвержденные контентные типы:

| Сущность | Тип | Подтверждение | Краткое назначение |
|---|---|---|---|
| `article` | `collectionType` | `src/api/article/content-types/article/schema.json` | публикации со `slug`, обложкой, авторами и rich text-контентом |
| `author` | `collectionType` | `src/api/author/content-types/author/schema.json` | авторы статей |
| `project` | `collectionType` | `src/api/project/content-types/project/schema.json` | кейсы/проекты со `slug`, обложкой, логотипом и rich text-контентом |
| `vacancy` | `collectionType` | `src/api/vacancy/content-types/vacancy/schema.json` | вакансии с таксономиями, фильтрами и описанием |
| `vacancy-application` | `collectionType` | `src/api/vacancy-application/content-types/vacancy-application/schema.json` | отклики на вакансии |
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
- `vacancy-application` не использует `draftAndPublish` и не локализуется, что логично для
  прикладной сущности отклика.

Подтвержденные связи:

- `article` <-> `author`: `manyToMany`.
- `vacancy` -> `industry`: `manyToOne`.
- `vacancy` -> `job-role`: `manyToOne`.
- `vacancy-application` -> `vacancy`: `manyToOne`.

Вывод для главы 2:

- в CMS уже существует содержательная модель для статей, проектов, вакансий и откликов;
- в CMS уже реализованы `pages`, переиспользуемые `components` и `Dynamic Zone`;
- `global` хранит структуру навигации, CTA и футера, а `home-page` использует тот же page-builder-контур, что и `pages`.

### 1.3. Реализованные API и сервисные сценарии

Подтвержденные факты:

- Для `article`, `author`, `global`, `home-page`, `project`, `vacancy`,
  `vacancy-application` используются стандартные `createCoreRouter`,
  `createCoreController`, `createCoreService`.
- Для `industry` и `job-role` в коде явно разрешены публичные `find` и `findOne`
  без авторизации.
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
- модуль вакансий опирается на уже описанные в CMS таксономии и структуру откликов.

Ограничения:

- в коде не зафиксированы экспортируемые настройки `roles/permissions` для всех публичных
  маршрутов; часть разрешений может зависеть от состояния БД и настроек админки;
- нет versioned-конфигурации `Docker` для production-запуска CMS.

## 2. Текущее состояние `apps/front`

### 2.1. Платформа и сборка

Подтвержденные факты:

- `apps/front` оформлен как отдельное приложение `Nx` с целями `dev`, `build`, `preview`,
  `generate:api`, `lint`, `test` в [apps/front/project.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/project.json).
- В [apps/front/package.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/package.json)
  используется `Astro 6.3.1`, `@astrojs/react`, `@astrojs/vercel`,
  `@astrojs/sitemap`, `Tailwind 4`, `react-hook-form`, `zod`.
- В [apps/front/astro.config.mjs](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/astro.config.mjs)
  frontend подключает `Vercel` adapter и `sitemap`,
  а абсолютный `site` URL берется из `SITE_URL`.
- Во frontend включена генерация типизированного API-клиента через
  [apps/front/openapi-ts.config.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/openapi-ts.config.ts),
  который берет схему из `CMS_URL/api/documentation/1.0.0/full_documentation`.

Вывод для главы 2:

- витрина реализована как отдельный frontend-слой;
- публичная витрина остается основанной на предварительной сборке, но дополнена
  server-side preview-маршрутами через `prerender = false`;
- интеграция со `Strapi` уже частично типизирована через OpenAPI.

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
| `/articles` | `src/pages/articles/index.astro` | `getArticles()` из generated API | реализован |
| `/articles/[slug]` | `src/pages/articles/[slug]/index.astro` | `getArticles()`, `getArticlesId()` | реализован |
| `/projects` | `src/pages/projects/index.astro` | `getProjects()` из generated API | реализован |
| `/projects/[slug]` | `src/pages/projects/[slug]/index.astro` | `getProjects()`, `getProjectsId()` | реализован |
| `/vacancies` | `src/pages/vacancies/index.astro` | клиентский `VacancyExplorer` | реализован |
| `/vacancies/[slug]` | `src/pages/vacancies/[slug]/index.astro` | `fetchVacancies()`, `fetchVacancyBySlug()` | реализован |

Что это реально подтверждает:

- frontend уже публикует локализованную главную витрину через `home-page` из `Strapi`;
- frontend уже умеет генерировать локализованные CMS-страницы `pages` по маршруту `/:locale/:slug/`;
- frontend уже умеет открывать draft-preview для `home-page`, `pages`, `articles`,
  `projects` и `vacancies` через server-side маршруты `/preview/...`;
- frontend уже публикует статьи, проекты и вакансии;
- детальные страницы статей и проектов рендерятся статически через `getStaticPaths`;
- каталог вакансий и страница вакансии уже существуют как отдельный прикладной модуль.

Ограничения:

- locale-prefixed маршрутный контур пока покрывает только главную витрину и CMS-страницы `pages`;
- разделы `articles`, `projects` и `vacancies` пока остаются вне полной публичной маршрутной локализации;
- locale-prefixed preview уже покрывает витрину первой очереди и ключевые content sections,
  однако публичные production-маршруты `articles/projects/vacancies` все еще остаются вне
  полного locale-prefixed контура.

### 2.3. Реально используемые сценарии frontend

#### Статьи и проекты

Подтвержденные факты:

- списки статей и проектов получают данные через generated SDK;
- детальные страницы строятся по `slug`, а затем загружают сущность по `documentId`;
- rich text-контент выводится через `MarkdownContent`.

Что это означает:

- для `articles` и `projects` уже существует связка `Strapi -> OpenAPI -> generated client -> Astro`;
- CMS реально используется как источник контента для двух публичных разделов.

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
- В [apps/front/src/widgets/Header/model/const.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/Header/model/const.ts)
  и [apps/front/src/widgets/Footer/model/const.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/Footer/model/const.ts)
  локальные константы сохранены как fallback, но больше не являются основным источником данных для витрины первой очереди.
- Списки и детальные страницы `articles`, `projects`, `vacancies` по-прежнему содержат
  локальные UI-тексты и не переведены на locale-prefixed public routes.

Что это означает:

- ключевые тексты навигации, футера и основной витрины уже вынесены в `Strapi`;
- `global`, `home-page` и `pages` образуют рабочий CMS-first контур публичной витрины первой очереди;
- для `home-page` и `pages` уже реализован управляемый `SEO/Open Graph` контур из CMS;
- для `home-page`, `pages`, `articles`, `projects` и `vacancies` уже реализован защищенный
  preview-сценарий `draft -> server-side preview`;
- неполнота проекта теперь связана не с отсутствием CMS-интеграции как таковой, а с ее
  неполным охватом остальных публичных разделов и эксплуатационных сценариев.

## 3. Уже реализованные части системы

На основании текущего кода можно безопасно считать уже реализованными:

- monorepo `Nx + pnpm` с двумя приложениями `apps/cms` и `apps/front`;
- CMS на `Strapi 5` с сущностями `article`, `project`, `vacancy`,
  `vacancy-application`, `author`, `industry`, `job-role`, `global`, `home-page`, `page`;
- компоненты `Strapi` для page builder, навигации, CTA и футера;
- OpenAPI-документацию backend и генерацию типизированного frontend-клиента;
- локализованную главную витрину `/:locale/`, строящуюся по `home-page` из `Strapi`;
- локализованные CMS-страницы `/:locale/:slug/`, строящиеся по `pages` и `Dynamic Zone`;
- вынос ключевых текстов header/footer/main showcase из frontend в `global` и `home-page`;
- CMS-управляемые `SEO/Open Graph` метаданные для `home-page` и `pages`;
- защищенный preview mode для `home-page`, `pages`, `articles`, `projects` и `vacancies`;
- автоматическую генерацию `sitemap` для публичных prerendered маршрутов;
- публичные разделы статей и проектов с детальными страницами;
- модуль вакансий с фильтрацией, пагинацией, карточками и детальной страницей;
- форму отклика на вакансию с валидацией, `honeypot`, consent и загрузкой резюме;
- гибридный публикационный контур frontend: prerendered public routes + server-side preview.

## 4. Ограничения текущего состояния проекта

На основании текущего кода нельзя считать уже реализованными следующие обязательные для
диплома элементы:

- полную публичную локализацию всех разделов сайта, а не только витрины первой очереди;
- production-сценарий `webhook -> rebuild`;
- versioned-конфигурацию CMS в `Docker`;
- зафиксированные в коде роли и права редакторов;
- автоматизированные тесты и полноценные `lint`/`test`-цели для обоих приложений.

Дополнительные ограничения текущей версии:

- отсутствует единый подход к frontend-интеграции с CMS: статьи и проекты используют
  generated SDK, вакансии используют рукописный API-слой;
- публичный locale-prefixed контур пока ограничен маршрутами `/:locale/` и `/:locale/:slug/`;
- списковые и детальные маршруты `articles`, `projects` и `vacancies` пока не встроены в ту же
  схему `ru/en`;
- CMS-управляемые SEO по отдельной `seo`-схеме пока распространяются только на
  `home-page` и `pages`; для `articles/projects/vacancies` preview уже есть, но метаконтур
  остается более простым и в основном строится из самих контентных полей;
- полная prerender-сборка публичной витрины по-прежнему зависит от доступности `Strapi`
  во время build;
- значительная часть проектной главы пока не может быть написана как описание завершенной
  реализации, но уже может быть написана как описание существующей архитектурной базы и
  конкретных точек доработки.

## 5. Минимальный практический набор доработок для усиления главы 2

На основании текущего кода и уже выполненной первой очереди следующий минимальный
контур доработок должен быть следующим.

| Доработка первой очереди | Почему это критично именно для главы 2 | Что уже есть в коде | Что нужно довести |
|---|---|---|---|
| Расширение `ru/en` за пределы витрины первой очереди | без этого мультиязычность пока демонстрируется только на главной и `pages`, а не на всех ключевых публичных разделах | уже работают `/:locale/`, `/:locale/:slug/`, корректный `lang` и locale-aware fetchers для `global`/`home-page`/`pages` | перевести в ту же схему `articles`, `projects` и при необходимости `vacancies`, а также унифицировать ссылки и fallback-локали |
| Расширение CMS-управляемого SEO на `articles/projects/vacancies` | сейчас завершенный редактируемый мета-контур доказан только для `home-page` и `pages` | есть централизованный `MainLayout`, SEO-builder и absolute URL contract | добавить `seo` component в схемы остальных публичных сущностей и подключить его в их маршрутах |
| `webhook -> rebuild` | именно этот шаг связывает CMS и статическую витрину в цельный публикационный контур | публичная витрина уже prerendered, есть `SITE_URL`, `sitemap` и preview | настроить вызов deploy hook после публикации и проверить, что обновление контента не требует ручного вмешательства в frontend |
| Публикационные и эксплуатационные настройки | для итоговой ВКР нужен не только редакторский контур, но и воспроизводимая эксплуатация | environment contracts `SITE_URL`, `PUBLIC_URL`, `IS_PROXIED`, `PREVIEW_SECRET` уже зафиксированы кодом | зафиксировать `roles/permissions`, frontend deployment на `Vercel`, CMS deployment в `Docker` и deploy hooks |

Почему именно этот набор минимален:

- он переводит проект из состояния "витрина первой очереди локализована и CMS-first" в состояние
  "discoverability и редакторский контур для витрины первой очереди реально закрыты кодом";
- каждый пункт можно непосредственно показать в архитектуре, модели данных, сценарии
  публикации и разделе тестирования главы 2;
- без этих доработок вторая глава уже может описывать работающий `CMS-first` контур, но не
  сможет честно заявлять полноту мультиязычности, публикационного пайплайна и production-эксплуатации.

Что остается обязательным, но относится ко второй очереди относительно текущей задачи:

- формальная матрица `roles/permissions`;
- production-конфигурация frontend на `Vercel`;
- production-конфигурация CMS в `Docker`;
- расширение набора блоков сверх базового минимального набора;
- более широкий автоматизированный контур тестирования.

## 6. Что можно безопасно писать в черновике главы 2 уже сейчас

На основе текущей доказательной базы уже можно писать:

- структуру monorepo и роли `apps/cms` и `apps/front`;
- текущую архитектуру взаимодействия `Strapi -> OpenAPI -> Astro`;
- существующую модель данных для `articles`, `projects`, `vacancies`,
  `vacancy-applications`, `industry`, `job-role`, `global`, `home-page`, `page`;
- использование `components` и `Dynamic Zone` для `pages` и `home-page`;
- locale-prefixed маршруты `/:locale/` и `/:locale/:slug/`;
- вынос ключевых текстов навигации, футера и основной витрины в `Strapi`;
- централизованный рендер `lang`, `description`, `canonical`, `Open Graph`, `twitter:*`, `noindex`;
- защищенный preview mode для `home-page`, `pages`, `articles`, `projects` и `vacancies`;
- автоматическую генерацию `sitemap` на основе публичных prerendered маршрутов;
- публичные маршруты статей, проектов и вакансий как уже существующие content sections;
- пользовательский сценарий вакансий и откликов;
- ограничения текущего состояния проекта и перечень обязательных доработок.

Пока рано писать как реализованный результат:

- полный `ru/en` по всем публичным разделам;
- production deployment pipeline;
- редакторские роли и публикационные ограничения как завершенный функционал.
