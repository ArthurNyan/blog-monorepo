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
  backend запускается на `0.0.0.0:1337`.
- В [apps/cms/config/plugins.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/config/plugins.ts)
  включена генерация OpenAPI-документации с базовым URL `http://localhost:1337/api`.
- В [apps/cms/config/middlewares.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/config/middlewares.ts)
  подключен стандартный набор middleware `Strapi`, без собственных middleware проекта.

Вывод для главы 2:

- backend уже реализован как самостоятельное CMS-ядро на `Strapi`;
- в репозитории есть база для REST API и OpenAPI-контракта;
- production-конфигурация `Docker` на текущем этапе в коде не зафиксирована.

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
- модель еще не покрывает обязательную для диплома коллекцию `pages`;
- в коде не обнаружены собственные `components` и `Dynamic Zone`.

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
- в коде нет кастомного preview-маршрута и нет собственной публикационной логики поверх
  стандартного `draft/publish`;
- нет versioned-конфигурации `Docker` для production-запуска CMS.

## 2. Текущее состояние `apps/front`

### 2.1. Платформа и сборка

Подтвержденные факты:

- `apps/front` оформлен как отдельное приложение `Nx` с целями `dev`, `build`, `preview`,
  `generate:api`, `lint`, `test` в [apps/front/project.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/project.json).
- В [apps/front/package.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/package.json)
  используется `Astro 6.3.1`, `@astrojs/react`, `Tailwind 4`, `react-hook-form`, `zod`.
- В [apps/front/astro.config.mjs](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/astro.config.mjs)
  отсутствует server adapter; используется базовый `astro build`.
- Во frontend включена генерация типизированного API-клиента через
  [apps/front/openapi-ts.config.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/openapi-ts.config.ts),
  который берет схему из `CMS_URL/api/documentation/1.0.0/full_documentation`.

Вывод для главы 2:

- витрина реализована как отдельный frontend-слой;
- базовый сценарий соответствует предварительной сборке, а не on-demand rendering;
- интеграция со `Strapi` уже частично типизирована через OpenAPI.

### 2.2. Существующие публичные маршруты

Подтвержденные маршруты:

| Маршрут | Файл | Источник данных | Статус |
|---|---|---|---|
| `/` | `src/pages/index.astro` | локальные widget-компоненты | реализован, но не CMS-first |
| `/articles` | `src/pages/articles/index.astro` | `getArticles()` из generated API | реализован |
| `/articles/[slug]` | `src/pages/articles/[slug]/index.astro` | `getArticles()`, `getArticlesId()` | реализован |
| `/projects` | `src/pages/projects/index.astro` | `getProjects()` из generated API | реализован |
| `/projects/[slug]` | `src/pages/projects/[slug]/index.astro` | `getProjects()`, `getProjectsId()` | реализован |
| `/vacancies` | `src/pages/vacancies/index.astro` | клиентский `VacancyExplorer` | реализован |
| `/vacancies/[slug]` | `src/pages/vacancies/[slug]/index.astro` | `fetchVacancies()`, `fetchVacancyBySlug()` | реализован |

Что это реально подтверждает:

- frontend уже публикует статьи, проекты и вакансии;
- детальные страницы статей и проектов рендерятся статически через `getStaticPaths`;
- каталог вакансий и страница вакансии уже существуют как отдельный прикладной модуль.

Ограничения:

- в проекте отсутствуют frontend-маршруты для коллекции `pages`;
- главная страница не получает структуру из CMS и не использует `home-page` как
  полнофункциональный page builder-источник;
- в коде не обнаружены отдельные preview-маршруты.

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

### 2.4. Непереведенные в CMS части frontend

Подтвержденные факты:

- Главная страница в [apps/front/src/pages/index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/index.astro)
  собирается из локальных секций `HeroSection`, `LogoPanel`, `FeatureTabs`,
  `TestimonialsPanel`, `BentoGridWidget`, `FeatureHighlighter`.
- В [apps/front/src/widgets/Header/model/const.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/Header/model/const.ts)
  используется `DEFAULT_NAVIGATION` с демо-ориентированными пунктами `Getting Started`,
  `Components`, `Blog`, `Cases`.
- В [apps/front/src/widgets/Footer/model/const.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/Footer/model/const.ts)
  используется `DEFAULT_COMPANY_INFO` и `DEFAULT_FOOTER_COLUMNS` с демо-брендом `Ruixen`.
- В [apps/front/src/layouts/main.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/layouts/main.astro)
  задаются только базовые `title`, favicon и `lang="en"`.

Что это означает:

- значимая часть интерфейсных текстов и структуры витрины все еще зашита во frontend;
- CMS-модель `global` и `home-page` пока не доведена до фактического использования в
  публичной витрине;
- текущий frontend содержит следы шаблонного/демо-контента и нуждается в предметной
  адаптации под тему диплома.

## 3. Уже реализованные части системы

На основании текущего кода можно безопасно считать уже реализованными:

- monorepo `Nx + pnpm` с двумя приложениями `apps/cms` и `apps/front`;
- CMS на `Strapi 5` с сущностями `article`, `project`, `vacancy`,
  `vacancy-application`, `author`, `industry`, `job-role`, `global`, `home-page`;
- OpenAPI-документацию backend и генерацию типизированного frontend-клиента;
- публичные разделы статей и проектов с детальными страницами;
- модуль вакансий с фильтрацией, пагинацией, карточками и детальной страницей;
- форму отклика на вакансию с валидацией, `honeypot`, consent и загрузкой резюме;
- базовый сценарий предварительной сборки frontend-витрины через `astro build`.

## 4. Ограничения текущего состояния проекта

На основании текущего кода нельзя считать уже реализованными следующие обязательные для
диплома элементы:

- коллекцию `pages`;
- конструктор страниц на основе `Dynamic Zone`;
- полный перевод главной страницы и общих секций в CMS;
- полноценную публичную локализацию `ru/en`;
- корректную установку `lang` по локали;
- централизованное управление `SEO` и `Open Graph`;
- генерацию `sitemap`;
- frontend `preview mode`;
- production-сценарий `webhook -> rebuild`;
- versioned-конфигурацию frontend на `Vercel`;
- versioned-конфигурацию CMS в `Docker`;
- зафиксированные в коде роли и права редакторов;
- автоматизированные тесты и полноценные `lint`/`test`-цели для обоих приложений.

Дополнительные ограничения текущей версии:

- отсутствует единый подход к frontend-интеграции с CMS: статьи и проекты используют
  generated SDK, вакансии используют рукописный API-слой;
- в публичной витрине остаются демо-элементы навигации и футера;
- значительная часть проектной главы пока не может быть написана как описание завершенной
  реализации, но уже может быть написана как описание существующей архитектурной базы и
  конкретных точек доработки.

## 5. Минимальный практический набор доработок для усиления главы 2

На основании текущего кода и зафиксированных требований диплома минимальный практический
контур доработок должен быть следующим.

| Доработка первой очереди | Почему это критично именно для главы 2 | Что уже есть в коде | Что нужно довести |
|---|---|---|---|
| `pages` как отдельная сущность | без самостоятельной CMS-модели страниц проект остается набором отдельных разделов, а не page builder-ориентированной маркетинговой CMS | есть `global` и `home-page`, но нет `pages`; витрина использует жестко заданный [index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/index.astro) | создать collection type `pages` со `slug`, заголовком, локалью, статусом публикации и связью с блоками страницы |
| Базовый `Dynamic Zone` | именно он переводит страницы из frontend-шаблона в редакторский сценарий и делает тезис про `CMS-first` доказуемым | в `apps/cms` нет собственных `components`; во frontend уже есть локальные секции `HeroSection`, `LogoPanel`, `FeatureTabs`, `TestimonialsPanel`, `BentoGridWidget`, `FeatureHighlighter` | реализовать минимум 4-5 ключевых блоков первой очереди, достаточных для главной и 1-2 внутренних страниц; рациональный стартовый набор: `hero`, `rich text`, `features/cards`, `CTA`, `preview list` |
| Вынос ключевых текстов из frontend в `Strapi` | пока шапка, футер и главная страница содержат демо- и шаблонный контент, трудно утверждать, что витрина реально управляется через CMS | в CMS уже есть `global` и `home-page`; во frontend зашиты [Header/model/const.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/Header/model/const.ts) и [Footer/model/const.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/Footer/model/const.ts) | перевести в `Strapi` навигацию, данные компании, ключевые hero- и summary-тексты витрины, затем подключить их в layout и на главной странице |
| `ru/en` для основной витрины и части CMS-контента | мультиязычность уже заявлена как обязательный результат, но сейчас она видна в данных сильнее, чем в публичной витрине | `i18n` включен для основных сущностей `Strapi`, а [vacancies.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/api/vacancies.ts) использует `ru-RU`; в [main.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/layouts/main.astro) язык жестко задан как `en` | добавить локализованные маршруты и переключение `ru/en` хотя бы для главной страницы, страниц `pages` и части контента `articles/projects`; корректно выставлять `lang`, `slug` и метаданные по локали |
| `SEO` и `Open Graph` | без них проектная глава не закрывает важную часть маркетинговой CMS и не подтверждает управляемость discoverability-слоя | сейчас в [main.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/layouts/main.astro) задается только `title`; отдельной SEO-модели в `Strapi` нет | выделить переиспользуемую SEO-структуру в CMS и централизованный рендер `title`, `description`, canonical, `og:title`, `og:description`, `og:image` |
| `preview mode` | без предпросмотра не завершен редакторский сценарий `черновик -> проверка -> публикация` | основа в виде `draftAndPublish` уже есть для ключевых сущностей | добавить защищенный preview-маршрут и получение неопубликованных данных для `pages` и хотя бы части контентных сущностей |
| `webhook -> rebuild` | именно этот шаг связывает CMS и статическую витрину в цельный публикационный контур | статическая сборка frontend уже есть, но вызов rebuild из CMS в коде не зафиксирован | настроить вызов deploy hook после публикации и проверить, что обновление контента не требует ручного вмешательства в frontend |
| `sitemap` | без автоматической карты сайта тема discoverability раскрыта неполно, а проверка публикационного контура остается слабее | в конфигурации `Astro` нет интеграции `@astrojs/sitemap` и нет `site` | добавить конфигурацию `site`, генерацию `sitemap` и включить в нее ключевые публичные маршруты и локали первой очереди |

Почему именно этот набор минимален:

- он переводит проект из состояния "часть разделов уже читает контент из CMS" в состояние
  "редактор управляет структурой страницы, метаданными и публикацией";
- каждый пункт можно непосредственно показать в архитектуре, модели данных, сценарии
  публикации и разделе тестирования главы 2;
- без этих доработок вторая глава будет опираться главным образом на уже реализованные
  статьи, проекты и вакансии, но недостаточно докажет именно маркетинговую `CMS-first`
  природу системы.

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
  `vacancy-applications`, `industry`, `job-role`, `global`, `home-page`;
- публичные маршруты статей, проектов и вакансий;
- пользовательский сценарий вакансий и откликов;
- ограничения текущего состояния проекта и перечень обязательных доработок.

Пока рано писать как реализованный результат:

- `pages` и page builder;
- `preview mode`;
- `SEO` / `Open Graph` / `sitemap`;
- production deployment pipeline;
- редакторские роли и публикационные ограничения как завершенный функционал.
