# Publication And Deployment Contour

## Назначение документа

Этот документ фиксирует publish-ready описание публикационного и deployment-контура для
итоговой версии ВКР. Его задача --- связать в одном месте:

- versioned deployment-артефакты репозитория;
- локально доказанный baseline;
- внешний инфраструктурный сегмент `Dokploy`;
- границу того, что можно утверждать в тексте диплома без завышения доказанности.

## 1. Итоговый `Dokploy`-контур

Для текущего baseline production-модель трактуется так:

1. Редактор публикует или снимает с публикации сущность в `Strapi`.
2. `Strapi` формирует событие `entry.publish` или `entry.unpublish`.
3. Во время `bootstrap` CMS синхронизирует managed webhook в `strapi_webhooks` и тем
   самым в `Settings -> Webhooks`.
4. Встроенный `Strapi webhook runner` отправляет `POST` на
   `FRONTEND_REBUILD_HOOK_URL`.
5. Этот URL адресует нативный rebuild hook frontend-приложения в `Dokploy`.
6. `Dokploy` выполняет повторную сборку и redeploy отдельного frontend
   `Docker`-приложения.
7. После redeploy `Astro` снова отдает предсобранные публичные маршруты, использующие
   актуальные данные из CMS.

В инженерном смысле итоговый контур строится вокруг двух deployment-единиц:

- frontend `Astro` как отдельное `Docker`-приложение;
- CMS `Strapi` как отдельное `Docker`-приложение.

Зависимость CMS от `PostgreSQL` также зафиксирована, но выражена отдельно от frontend:
локально и в repo topology она представлена сервисом `cms-db` в
[apps/cms/compose.yml](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/compose.yml).
В `Dokploy` эта же зависимость может закрываться отдельным DB-сервисом платформы или
внешней базой данных, но для приложения сохраняется один и тот же `DATABASE_*`
контракт.

Важно: source of truth для application bundles и `env`-контракта хранится в
репозитории, тогда как платформенные привязки `Dokploy` --- публичные домены, реальные
секреты и фактическая конфигурация rebuild hook --- остаются внешним инфраструктурным
сегментом.

## 2. Что именно разворачивается

### 2.1. Frontend deployment unit

Frontend разворачивается из
[apps/front/Dockerfile](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/Dockerfile).
Этот bundle фиксирует:

- build-stage с `pnpm --dir apps/front build`;
- `Astro` с `node()` adapter в standalone-режиме;
- runtime-процесс `pnpm start`;
- стандартный runtime-порт `4321`;
- предсобранные публичные маршруты, `sitemap` и server-side `preview` routes.

Следовательно, в `Dokploy` разворачивается не исходный frontend-код как набор статических
файлов, а самостоятельное `Node.js`-приложение с production output `Astro`.

### 2.2. CMS deployment unit

CMS разворачивается из
[apps/cms/Dockerfile](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/Dockerfile).
Этот bundle фиксирует:

- production build `Strapi`;
- runtime на порту `1337`;
- versioned application image для CMS;
- `bootstrap`, который синхронизирует security model и managed publication webhook.

Это означает, что deployment CMS охватывает не только подъем admin/API runtime, но и
автоматическое восстановление publication-контура при старте приложения в новой среде.

### 2.3. CMS database/runtime dependency

Для CMS в repo topology дополнительно зафиксирован переносимый runtime-бандл:

- сервис `cms` с приложением `Strapi`;
- сервис `cms-db` с `PostgreSQL`;
- persistent volume для `public/uploads`;
- persistent volume для данных `PostgreSQL`.

Эта схема не подменяет `Dokploy` собственной оркестрацией, а формализует минимально
необходимую инфраструктурную топологию CMS в versioned виде.

## 3. Как работает `publish -> webhook -> Dokploy rebuild/redeploy`

Публикационный сценарий устроен так:

1. Редактор переводит локализуемую `draft/publish`-сущность в состояние `published` или
   снимает ее с публикации.
2. `Strapi` генерирует `entry.publish` или `entry.unpublish`.
3. В
   [apps/cms/src/utils/publication-webhook.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/utils/publication-webhook.ts)
   из `env` собирается конфигурация managed webhook:
   имя, URL, заголовки, список событий и состояние `enabled`.
4. Во время `bootstrap` CMS вызывает `syncManagedPublicationWebhook()` и приводит запись в
   `strapi_webhooks` к versioned состоянию:
   create, update, disable или noop.
5. Если `FRONTEND_REBUILD_HOOK_URL` не задан, CMS явно логирует предупреждение и не
   оставляет незавершенный rebuild-контур в полуактивном состоянии: webhook остается
   disabled.
6. Если URL задан, `Strapi` отправляет `POST` на `FRONTEND_REBUILD_HOOK_URL`, а при
   наличии `FRONTEND_REBUILD_HOOK_TOKEN` добавляет header `x-rebuild-token`.
7. В production этот endpoint является нативным rebuild hook `Dokploy`.
8. `Dokploy` пересобирает и redeploy-ит frontend-приложение, собранное из
   [apps/front/Dockerfile](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/Dockerfile).
9. После redeploy frontend повторно читает опубликованные данные из CMS и отдает
   обновленный набор публичных маршрутов.

Ключевая инженерная граница здесь состоит в том, что публикация управляет только
frontend rebuild path. CMS не пытается выполнять локальные обходы, не содержит
собственного runtime-rebuild сервиса и не подменяет собой оркестратор deployment.

## 4. Какие события участвуют в rebuild-контуре

Managed webhook подписан только на:

- `entry.publish`
- `entry.unpublish`

Для текущего scope этого достаточно:

- именно эти события меняют видимость публичного контента для предсобранной витрины;
- прикладные сущности `lead-submission` и `vacancy-application` не участвуют в
  `draft/publish` жизненном цикле;
- изменение черновика без публикации не должно инициировать production rebuild.

## 5. `Env`-контракт для `Dokploy`

### 5.1. Обязательные переменные frontend-приложения

| Переменная | Где используется | Назначение |
|---|---|---|
| `SITE_URL` | `apps/front`, `apps/cms` | canonical URL, `sitemap`, публичный base URL сайта и preview link base |
| `PUBLIC_SITE_URL` | `apps/front` | fallback/alias для публичного URL витрины |
| `CMS_URL` | `apps/front` | внутренний адрес CMS для server-side запросов frontend |
| `PUBLIC_CMS_URL` | `apps/front` | публичный адрес CMS для asset links и client-side ссылок |
| `CMS_API_TOKEN` | `apps/front` | server-side доступ frontend к приватным операциям CMS |
| `PREVIEW_SECRET` | `apps/front`, `apps/cms` | общий секрет для draft preview |

Практическая оговорка: `HOST` и `PORT` у frontend имеют безопасные runtime defaults
`0.0.0.0:4321` и обычно не являются критическим `Dokploy`-специфичным `env`, если
платформа не требует явного override.

### 5.2. Обязательные переменные CMS-приложения

| Переменная | Где используется | Назначение |
|---|---|---|
| `PUBLIC_URL` | `apps/cms` | внешний base URL CMS, OpenAPI servers и абсолютные CMS links |
| `SITE_URL` | `apps/cms`, `apps/front` | base URL фронтенда для preview и публичных ссылок |
| `IS_PROXIED` | `apps/cms` | корректная работа CMS за reverse proxy |
| `PREVIEW_SECRET` | `apps/cms`, `apps/front` | общий секрет preview-контура |
| `FRONTEND_REBUILD_HOOK_URL` | `apps/cms` | URL нативного rebuild hook frontend-приложения в `Dokploy` |
| `FRONTEND_REBUILD_HOOK_TOKEN` | `apps/cms` | optional token, передаваемый как `x-rebuild-token` |
| `FRONTEND_REBUILD_WEBHOOK_NAME` | `apps/cms` | детерминированное имя managed webhook в admin UI |
| `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY` | `apps/cms` | обязательный secret block `Strapi` |
| `DATABASE_CLIENT` | `apps/cms` | выбор backend БД (`postgres` для production topology) |
| `DATABASE_URL` или `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE_SCHEMA`, `DATABASE_SSL` | `apps/cms` | connection contract CMS к production БД |

### 5.3. Переменные локального и переносимого DB-bundle

| Переменная | Где используется | Назначение |
|---|---|---|
| `CMS_IMAGE_TAG` | `apps/cms/compose.yml` | versioned tag образа CMS |
| `POSTGRES_DB` | `apps/cms/compose.yml` | имя БД контейнера `cms-db` |
| `POSTGRES_USER` | `apps/cms/compose.yml` | пользователь `PostgreSQL` |
| `POSTGRES_PASSWORD` | `apps/cms/compose.yml` | пароль `PostgreSQL` |
| `POSTGRES_PORT` | `apps/cms/compose.yml` | host port локального DB runtime |

Этот блок обязателен именно для versioned
[apps/cms/compose.yml](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/compose.yml).
Если `Dokploy` использует отдельный DB-сервис или внешнюю БД, в platform runtime
критичен прежде всего `DATABASE_*` контракт приложения CMS.

## 6. Что доказано локально

В текущей среде воспроизводимо подтверждено:

- production build frontend через `pnpm --dir apps/front build`, включая генерацию
  предсобранных маршрутов и `sitemap`;
- production build CMS через `pnpm --dir apps/cms build`;
- `TypeScript`-компиляция CMS;
- синхронизация managed webhook через `publication-webhook.ts` на моках `store/runner`;
- реальный запуск `Strapi` на временной `sqlite`-базе с созданием записи в
  `strapi_webhooks`;
- прямое чтение `sqlite` с подтверждением полей webhook:
  `name`, `url`, `headers`, `events`, `enabled`;
- синтаксическая и `env`-уровневая валидация
  [apps/cms/compose.yml](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/compose.yml)
  через `docker compose ... config`;
- наличие отдельного `cms-db` runtime-сервиса и volume-контуров для БД и `uploads`;
- наличие versioned deployment-файлов:
  [apps/front/Dockerfile](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/Dockerfile),
  [apps/cms/Dockerfile](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/Dockerfile),
  [apps/cms/compose.yml](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/compose.yml),
  [apps/cms/.env.docker.example](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/.env.docker.example).

Этого достаточно, чтобы в дипломе фактически утверждать:

- финальная deployment-модель ориентирована на `Dokploy`;
- frontend и CMS описаны как раздельные `Docker`-приложения;
- managed publication webhook является частью репозитория и `bootstrap`-процесса;
- rebuild-контур со стороны CMS доказан локально лучше, чем просто наличием кода;
- frontend deployment bundle и CMS deployment bundle существуют как versioned артефакты.

## 7. Внешний инфраструктурный сегмент и границы валидации

Во внешний сегмент `Dokploy`, который не хранится в репозитории как versioned state,
входят:

- настройки frontend-приложения в `Dokploy` на стороне платформы;
- настройки CMS-приложения в `Dokploy` на стороне платформы;
- фактический нативный rebuild hook `Dokploy`;
- build/redeploy history и public deployment status.

Эти части входят в итоговую архитектуру и не становятся versioned state репозитория.
При этом внешний публикационный путь уже подтвержден отдельной stand validation
`2026-06-01`. Корректно считать доказанными:

- полный внешний `Dokploy rebuild/redeploy` после вызова production hook;
- сквозной путь `Strapi -> webhook -> Dokploy -> rebuilt public site` как подтвержденный
  `end-to-end` сценарий на стенде проекта;
- причинную связь между редакторским действием `publish/unpublish` и обновлением
  публичной `Astro`-витрины без ручной frontend-сборки.

При этом граница доказанности остается инженерно корректной:

- repo доказывает application bundles и `env`-контракт;
- локальный baseline доказывает регистрацию webhook и готовность приложений к сборке;
- внешний `Dokploy`-сегмент подтверждается отдельно через платформенные артефакты и
  stand validation, а не выдается за локально воспроизведенный кодовый тест.

## 8. Артефакты для защиты

### 8.1. Что уже можно показать из репозитория

- [apps/front/Dockerfile](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/Dockerfile)
  и [apps/cms/Dockerfile](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/Dockerfile):
  два раздельных deployment unit-а.
- [apps/cms/compose.yml](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/compose.yml)
  и [apps/cms/.env.docker.example](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/.env.docker.example):
  CMS topology и переносимый `env`-контракт.
- [thesis/knowledge/diploma/testing-evidence-pack.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-evidence-pack.md):
  DB evidence по `strapi_webhooks`, включая активный `Frontend rebuild hook`.
- [thesis/knowledge/diploma/acceptance-matrix.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/acceptance-matrix.md):
  строки `PUBF-01`, `PUBF-02`, `PUBF-03` с разделением локального и внешнего evidence.
- [thesis/assets/dokploy/project-home.png](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/assets/dokploy/project-home.png):
  production-окружение `Dokploy` с раздельными сервисами `astro`, `strapi` и `pg`.
- [thesis/assets/dokploy/astro-domain.png](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/assets/dokploy/astro-domain.png):
  платформенное доказательство доменной привязки и `HTTPS` для frontend-приложения.
- [thesis/assets/dokploy/astro-deployment.png](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/assets/dokploy/astro-deployment.png):
  журнал deployment-сборки frontend-приложения `astro` в `Dokploy`.
- [thesis/assets/dokploy/strapi-deployment.png](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/assets/dokploy/strapi-deployment.png):
  журнал deployment-сборки `Strapi` в `Dokploy`, подтверждающий внешний runtime-сегмент CMS.
- [thesis/assets/strapi-images/strapi-webhook.png](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/assets/strapi-images/strapi-webhook.png):
  визуальное подтверждение того, что `Frontend rebuild hook` реально присутствует в `Strapi`
  и подписан на `publish/unpublish`.
- [thesis/assets/strapi-images/page.png](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/assets/strapi-images/page.png):
  редакторский экран `Strapi`, из которого стартует publish/preview жизненный цикл.
- [thesis/assets/strapi-images/page-preview-desktop.png](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/assets/strapi-images/page-preview-desktop.png):
  доказательство того, что draft preview отделен от production publication.
- [thesis/assets/front/home-en-with-url.png](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/assets/front/home-en-with-url.png):
  representative published storefront route.
- [thesis/knowledge/diploma/evidence-artifacts/browser-baseline-audit.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/evidence-artifacts/browser-baseline-audit.json):
  browser-level baseline публичных маршрутов после build/runtime.

### 8.2. Чего сейчас нет в репозитории и что стоит добрать вручную

После добавления новых скриншотов и внешней stand validation в репозитории уже есть
базовая платформенная доказательная база по `Dokploy`. Для защиты вручную еще стоит
добрать только то, что может усилить наглядность причинно-связанной последовательности:

1. Скрин или короткую запись последовательности `publish/unpublish` в `Strapi` ->
   новая запись deployment history в `Dokploy`, чтобы показать именно факт срабатывания
   rebuild после редакторского действия.
2. Скрин public route после изменения контента, если нужно на защите показать итоговое
   отражение rebuild на опубликованной витрине.
3. Если планируется публичная PDF или открытая публикация материалов, маскированную
   версию [astro-deployments.png](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/assets/dokploy/astro-deployments.png),
   поскольку на исходном скрине виден нативный rebuild URL `Dokploy`.

## 9. Что можно и чего нельзя утверждать в тексте ВКР

Корректно утверждать:

- финальная deployment-модель проекта строится вокруг `Dokploy`;
- frontend и CMS оформлены как отдельные `Docker`-приложения;
- CMS управляет frontend rebuild path через managed webhook;
- `Dokploy` выступает внешним оркестратором rebuild/redeploy, а не случайным ручным шагом;
- локально доказаны frontend/CMS build artifacts, webhook registration и `compose`-validation.

Некорректно утверждать без дополнительных внешних артефактов:

- что конфигурация `Dokploy` на стороне платформы полностью зафиксирована versioned средствами
  самого репозитория;
- что любой конкретный rebuild/redeploy в `Dokploy` уже доказан, если не показан
  соответствующим логом или скрином платформы.

## 10. Что остается допустимым ограничением

Даже в финальной версии работы допустимо:

- оставлять публикацию rebuild-based без real-time invalidation;
- опираться на нативный rebuild hook `Dokploy`, а не на собственный runtime-rebuild сервис;
- сохранять тестовый contour преимущественно приемочным и manual-friendly;
- не расширять locale-prefixed public routes дальше текущей route-границы карьерного модуля;
- не вводить отдельную `CMS`-управляемую `SEO`-схему для всех section list pages;
- не добавлять `CRM`, `email automation`, `rate limit` и более тяжелый editorial workflow.
