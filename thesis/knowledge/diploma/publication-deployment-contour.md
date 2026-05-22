# Publication And Deployment Contour

## Назначение документа

Этот документ фиксирует единый publish-ready контур публикации и deployment для диплома.
Он нужен, чтобы следующие этапы не возвращались к переопределению темы и не смешивали:

- уже реализованный код;
- доказанные локально сценарии;
- внешние части production-path, которые не были полностью воспроизведены в текущей среде;
- допустимые ограничения final scope.

## 1. Итоговый contour

Для текущего дипломного baseline публикационный и deployment-контур трактуется так:

1. Редактор публикует или снимает с публикации публичную сущность в `Strapi`.
2. `Strapi` после commit генерирует событие `entry.publish` или `entry.unpublish`.
3. Во время `bootstrap` CMS синхронизирует versioned webhook-запись в таблице
   `strapi_webhooks` и тем самым в разделе `Settings -> Webhooks`.
4. Встроенный `Strapi webhook runner` отправляет `POST` на `FRONTEND_REBUILD_HOOK_URL`
   при событиях `entry.publish` и `entry.unpublish`.
5. В production этот URL должен указывать на внешний rebuild/deploy hook frontend-среды
   на `Vercel`.
6. `Astro` заново собирает prerendered-публичные маршруты, использующие данные из CMS.

Для диплома этот contour считается самостоятельным инженерным результатом, потому что
замыкает цепочку `publish -> webhook -> rebuild` без ручного запуска frontend-сборки.

## 2. Какие события участвуют в rebuild contour

В admin-managed варианте rebuild webhook подписан на:

- `entry.publish`
- `entry.unpublish`

Для текущего baseline этого достаточно, потому что webhook runner реагирует только на
события `draft/publish`, а прикладные сущности `lead-submission` и `vacancy-application`
не участвуют в таком жизненном цикле.

## 3. Что реализовано в коде

### 3.1. Publication hook

Реализовано:

- в [apps/cms/src/index.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/index.ts)
  выполняется `bootstrap`-синхронизация managed webhook;
- в
  [apps/cms/src/utils/publication-webhook.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/utils/publication-webhook.ts)
  вынесены:
  - environment contract для managed rebuild webhook;
  - детерминированное имя webhook;
  - формирование версии webhook-записи;
  - `create/update/disable` синхронизация через `webhookStore` и `webhookRunner`.

Versioned webhook-запись содержит:

- имя webhook;
- URL rebuild hook;
- optional header `x-rebuild-token`;
- события `entry.publish` и `entry.unpublish`;
- флаг `enabled`.

### 3.2. Frontend side of the contour

На стороне frontend уже существовали и используются как часть итогового contour:

- `Astro`-конфигурация с `vercel()` adapter в
  [apps/front/astro.config.mjs](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/astro.config.mjs);
- `site` на основе `SITE_URL`;
- `@astrojs/sitemap`;
- prerendered публичные маршруты;
- server-side preview routes для draft-контента.

Отдельный repo-hosted rebuild endpoint во frontend не добавлялся. Production-сценарий
строится вокруг внешнего deploy hook `Vercel`, а webhook в `Strapi` лишь управляемо
вызывает этот внешний endpoint.

### 3.3. Docker contour for CMS

Реализовано:

- versioned
  [apps/cms/Dockerfile](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/Dockerfile);
- versioned
  [apps/cms/compose.yml](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/compose.yml)
  с сервисами `cms` и `cms-db`;
- versioned
  [apps/cms/.env.docker.example](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/.env.docker.example);
- scripts `docker:build`, `docker:up`, `docker:down` в
  [apps/cms/package.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/package.json);
- root
  [.dockerignore](/Users/arthur/Documents/projects/Диплом/app-monorepo/.dockerignore)
  для Docker build context.

Архитектурно CMS deployment bundle фиксирует:

- отдельный контейнер `Strapi`;
- отдельный `PostgreSQL` контейнер;
- host port mapping `POSTGRES_PORT -> 5432` для локального доступа к БД;
- persistent volume для `public/uploads`;
- production-style secrets и DB env;
- versioned image tag `CMS_IMAGE_TAG`.

## 4. Env contract

### 4.1. Обязательные переменные публичного frontend/CMS contour

| Переменная | Где используется | Назначение |
|---|---|---|
| `SITE_URL` | `apps/front`, `apps/cms` | canonical URL, `sitemap`, preview link base |
| `PUBLIC_URL` | `apps/cms` | внешний базовый URL CMS |
| `IS_PROXIED` | `apps/cms` | корректная работа CMS за reverse proxy |
| `PREVIEW_SECRET` | `apps/front`, `apps/cms` | защищенный preview для draft-контента |
| `CMS_URL` | `apps/front` | private access frontend к CMS |
| `CMS_API_TOKEN` | `apps/front` | server-side чтение/запись через Astro API routes |
| `PUBLIC_CMS_URL` | `apps/front` | публичный URL CMS для frontend assets/links |

### 4.2. Обязательные переменные rebuild contour

| Переменная | Где используется | Назначение |
|---|---|---|
| `FRONTEND_REBUILD_HOOK_URL` | `apps/cms` | внешний deploy/rebuild hook frontend |
| `FRONTEND_REBUILD_HOOK_TOKEN` | `apps/cms` | optional header для webhook-записи в `Strapi` |
| `FRONTEND_REBUILD_WEBHOOK_NAME` | `apps/cms` | детерминированное имя managed webhook в admin UI |

### 4.3. Обязательные переменные Docker contour

| Переменная | Где используется | Назначение |
|---|---|---|
| `CMS_IMAGE_TAG` | `compose.yml` | versioned tag образа CMS |
| `DATABASE_CLIENT` | `apps/cms` | `sqlite` или `postgres` |
| `DATABASE_HOST` | `apps/cms` | host базы данных |
| `DATABASE_PORT` | `apps/cms` | порт базы данных |
| `DATABASE_NAME` | `apps/cms` | имя базы |
| `DATABASE_USERNAME` | `apps/cms` | пользователь БД |
| `DATABASE_PASSWORD` | `apps/cms` | пароль БД |
| `DATABASE_SCHEMA` | `apps/cms` | схема PostgreSQL |
| `DATABASE_SSL` | `apps/cms` | SSL policy БД |
| `POSTGRES_DB` | `compose.yml` | имя базы контейнера `PostgreSQL` |
| `POSTGRES_USER` | `compose.yml` | пользователь контейнера `PostgreSQL` |
| `POSTGRES_PASSWORD` | `compose.yml` | пароль контейнера `PostgreSQL` |
| `POSTGRES_PORT` | `compose.yml` | host port контейнера `PostgreSQL` |
| `APP_KEYS` | `apps/cms` | application keys Strapi |
| `API_TOKEN_SALT` | `apps/cms` | salt API tokens |
| `ADMIN_JWT_SECRET` | `apps/cms` | JWT secret admin |
| `TRANSFER_TOKEN_SALT` | `apps/cms` | transfer token salt |
| `JWT_SECRET` | `apps/cms` | JWT secret |
| `ENCRYPTION_KEY` | `apps/cms` | encryption key |

## 5. Что доказано локально

В текущей среде воспроизводимо подтверждено:

- `TypeScript`-компиляция CMS через `pnpm --dir apps/cms exec tsc -p tsconfig.json`;
- production build CMS через `pnpm --dir apps/cms build`;
- синхронизация managed webhook через `publication-webhook.ts` на моках store/runner;
- реальный запуск `Strapi` на временной sqlite-базе с созданием записи в `strapi_webhooks`;
- прямое чтение временной sqlite-базы с подтверждением полей webhook: `name`, `url`,
  `headers`, `events`, `enabled`;
- синтаксическая и env-level валидация Docker bundle через
  `docker compose --env-file apps/cms/.env.docker -f apps/cms/compose.yml config`.
- наличие отдельного `PostgreSQL` runtime-сервиса `cms-db` в versioned `compose` bundle.

Этого достаточно, чтобы в дипломе честно писать:

- versioned publication hook реализован;
- webhook отражается в `Settings -> Webhooks` после старта CMS с настроенным env;
- versioned Docker contour существует;
- bootstrap-синхронизация admin-managed webhook доказана локально;
- CMS сборка доказана локально.

## 6. Что не доказано полностью в текущей среде

Не следует описывать как полностью воспроизведенный факт:

- конечный внешний `Vercel` rebuild/deploy после вызова production hook;
- полный `docker build` образа CMS как завершенный локальный результат текущей сессии.

Причины:

- `Vercel deploy hook` является внешним инфраструктурным участком цепочки;
- при проверке `docker build` Dockerfile дошел до стадии установки зависимостей, но
  завершение оборвалось внешним сетевым сбоем при загрузке `pnpm` через `corepack`
  (`ECONNRESET` к `registry.npmjs.org`), а не на синтаксической ошибке versioned bundle.
- при попытке отдельно поднять `cms-db` runtime-проверка оборвалась на внешнем pull
  `postgres:16-bookworm` из Docker Hub (`EOF` при обращении к registry), а не на ошибке
  `compose.yml`.

Следствие для текста ВКР:

- можно писать, что rebuild-hook на стороне CMS реализован и локально доказан;
- можно писать, что Docker contour versioned и config-validated;
- нельзя писать, что полный production path `Strapi -> Vercel rebuild -> deployed site`
  был воспроизведен end-to-end внутри репозитория.

## 7. Что обязательно осталось сделать

После закрытия publication/deployment contour обязательный остаток финального scope
сводится к двум блокам:

- формальная матрица `roles/permissions`;
- воспроизводимая тестовая матрица и метрики `SEO`, `accessibility`, `performance`,
  включая фиксацию факта rebuild как проверяемого сценария.

## 8. Что останется допустимым ограничением

Даже в финальной версии допустимо:

- оставлять публикацию rebuild-based без real-time invalidation;
- опираться на внешний `Vercel` deploy hook вместо самостоятельного runtime-rebuild сервиса;
- сохранять тестовый contour преимущественно ручным;
- не расширять locale-prefixed public routes на `articles/projects/vacancies`;
- не вводить отдельный полноценный CMS-managed `SEO` schema для всех сущностей;
- не добавлять `CRM`, `email automation`, `rate limit` и более тяжелый editorial workflow.
