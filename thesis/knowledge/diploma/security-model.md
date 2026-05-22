# Security Model

Дата актуализации: `2026-05-22`.

## Назначение

Документ фиксирует формальную модель ролей, прав и границ доступа для дипломной CMS-first
платформы на базе `Strapi` и `Astro`.

Это не абстрактный security audit, а source of truth для трех задач:

- реализации и воспроизведения прав в проекте;
- написания раздела ВКР про безопасность и editor workflow;
- объяснения на защите, кто и что может делать в системе.

## 1. Принципы модели

1. Публичная витрина не пишет напрямую в `Strapi` из браузера.
2. Draft-данные не выдаются обычным `GET /api/*`; для них нужен `x-preview-secret`.
3. Маркетинговый и карьерный контуры разделены по ролям и сущностям.
4. Публикация отделена от редактирования: `editor` не публикует, а `marketer/content-manager`
   и `hr` публикуют только свои контуры.
5. Управление ролями, пользователями, токенами и системными настройками остается только у
   `administrator`.

## 2. Участники модели

| Участник | Тип | Назначение |
|---|---|---|
| `administrator` | admin panel role | полный административный доступ к `Strapi` |
| `marketer/content-manager` | admin panel role | управление маркетинговым контентом и просмотр лидов |
| `editor` | admin panel role | подготовка маркетинговых черновиков без права публикации |
| `hr` | admin panel role | управление вакансиями и обработка откликов |
| `public` | content API role | read-only доступ витрины и preview-маршрутов к публичному контенту |
| `authenticated` | content API role | в финальном scope не используется и оставлен без прав |
| `front-server` через `CMS_API_TOKEN` | технический доступ | server-side запись `lead-submission` и `vacancy-application` |
| `preview-client` через `PREVIEW_SECRET` | технический доступ | server-side чтение draft-контента для `/preview/*` |

## 3. Минимальный набор ролей

Минимальный обязательный набор человеческих ролей:

- `administrator`
- `marketer/content-manager`
- `editor`
- `hr`

Внутри `Strapi` это реализовано так:

| Роль в ВКР | Техническая реализация в CMS |
|---|---|
| `administrator` | стандартный `Super Admin` |
| `marketer/content-manager` | admin role `strapi-editor`, переименован в `Marketer / Content Manager` |
| `editor` | admin role `strapi-author`, переименован в `Editor` |
| `hr` | custom admin role `diploma-hr`, имя `HR` |

## 4. Матрица прав admin panel

Обозначения:

- `R` — читать / открывать записи в admin panel
- `C` — создавать
- `U` — редактировать
- `P` — публиковать / снимать с публикации
- `D` — удалять
- `-` — доступа нет

### 4.1. Контентные сущности

| Сущность | administrator | marketer/content-manager | editor | hr |
|---|---|---:|---:|---:|
| `global` | `R/C/U/P` | `R/C/U/P` | `R/C/U` | `-` |
| `home-page` | `R/C/U/P` | `R/C/U/P` | `R/C/U` | `-` |
| `page` | `R/C/U/P` | `R/C/U/P` | `R/C/U` | `-` |
| `article` | `R/C/U/P` | `R/C/U/P` | `R/C/U` | `-` |
| `author` | `R/C/U/P` | `R/C/U/P` | `R/C/U` | `-` |
| `project` | `R/C/U/P` | `R/C/U/P` | `R/C/U` | `-` |
| `vacancy` | `R/C/U/P` | `-` | `-` | `R/C/U/P` |
| `industry` | `R/C/U/P` | `-` | `-` | `R/C/U/P` |
| `job-role` | `R/C/U/P` | `-` | `-` | `R/C/U/P` |
| `lead-submission` | `R/U/D` | `R` | `-` | `-` |
| `vacancy-application` | `R/U/D` | `-` | `-` | `R/U` |

### 4.2. Системные возможности

| Возможность | administrator | marketer/content-manager | editor | hr |
|---|---|---:|---:|---:|
| Пользователи admin panel | полный доступ | `-` | `-` | `-` |
| Роли admin panel | полный доступ | `-` | `-` | `-` |
| `users-permissions` settings | полный доступ | `-` | `-` | `-` |
| Webhooks / rebuild settings | полный доступ | `-` | `-` | `-` |
| API tokens / transfer tokens | полный доступ | `-` | `-` | `-` |
| Internationalization locales | полный доступ | read-only | read-only | read-only |
| Media library | полный доступ | upload/update/read | upload/update/read | upload/update/read |

### 4.3. Интерпретация workflow

- `editor` готовит маркетинговые черновики и использует preview, но не может публиковать.
- `marketer/content-manager` завершает маркетинговый материал и публикует его.
- `hr` ведет карьерный модуль и меняет `hrStatus` у откликов.
- `administrator` нужен только для системного администрирования и внештатных операций.

## 5. Матрица публичного Content API

### 5.1. Роль `public`

`public` получает только read-only доступ к тем эндпоинтам, которые нужны витрине и preview:

| Endpoint family | Разрешенные действия |
|---|---|
| `global` | `find` |
| `home-page` | `find` |
| `page` | `find`, `findOne` |
| `article` | `find`, `findOne` |
| `author` | `find`, `findOne` |
| `project` | `find`, `findOne` |
| `vacancy` | `find`, `findOne` |
| `industry` | `find`, `findOne` |
| `job-role` | `find`, `findOne` |

Все прочие content API permissions у `public` удалены.

### 5.2. Роль `authenticated`

В рамках финального дипломного scope она не используется и синхронизируется в состояние
`без permissions`.

Это означает:

- система не заявляет публичный кабинет пользователя;
- форма лидов и форма отклика не завязаны на frontend login;
- наличие `users-permissions` в проекте используется как RBAC-механизм content API, а не
  как реализованный продуктовый модуль регистрации пользователей.

## 6. Route-level ограничения

Помимо role matrix, в коде зафиксированы минимальные публичные действия самих роутов:

| Роут | Ограничение |
|---|---|
| `article` | только `find`, `findOne` |
| `author` | только `find`, `findOne` |
| `global` | только `find` |
| `home-page` | только `find` |
| `page` | только `find`, `findOne` |
| `project` | только `find`, `findOne` |
| `vacancy` | только `find`, `findOne` |
| `industry` | только `find`, `findOne` |
| `job-role` | только `find`, `findOne` |
| `lead-submission` | только `create` |
| `vacancy-application` | только `create` |

Следствие:

- браузер не получает content API write-surface для маркетинговых и карьерных сущностей;
- даже при ошибке настройки `public` role нет маршрутов `POST/PUT/DELETE` для публичного
  контента;
- формы отправляются только в прикладные entry points `lead-submission` и
  `vacancy-application`.

## 7. Draft / Preview модель

Draft-доступ устроен двухступенчато:

1. `public` role имеет только read-доступ к content API.
2. middleware
   [enforce-published.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/middlewares/enforce-published.ts)
   принудительно добавляет `status=published` ко всем публичным `GET /api/*`, если нет
   корректного `x-preview-secret`.

Из этого следуют строгие правила:

- обычный public request всегда видит только опубликованное состояние;
- preview request читает тот же content API, но с заголовком `x-preview-secret`;
- draft-доступ не открывается через отдельную публичную роль и не требует раскрывать
  `status=draft` на внешний REST API.

## 8. Технические приватные каналы

### 8.1. `CMS_API_TOKEN`

`Astro` server routes:

- [lead-submissions.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/api/lead-submissions.ts)
- [vacancy-applications.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/api/vacancy-applications.ts)

используют `CMS_API_TOKEN` для server-side записи в `Strapi`.

Токен не versioned-экспортируется как секрет, поэтому для воспроизведения нужен manual step:

1. В `Strapi` создать API token типа `Custom`.
2. Разрешить только запись форменного контура:
   - `lead-submission.create`
   - `vacancy-application.create`
3. Сохранить значение в `apps/front` environment как `CMS_API_TOKEN`.

### 8.2. `PREVIEW_SECRET`

`PREVIEW_SECRET` используется одновременно:

- в `Strapi admin preview` конфигурации;
- во frontend server route `/api/preview`;
- в middleware, который различает public read и draft read.

Секрет должен совпадать в `apps/cms` и `apps/front`.

## 9. Реализация в репозитории

Versioned source of truth:

- [security-model.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/utils/security-model.ts)
- [index.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/index.ts)

Что делает код:

- при `Strapi bootstrap` синхронизирует admin roles `Marketer / Content Manager`,
  `Editor`, `HR`;
- синхронизирует content API roles `public` и `authenticated`;
- оставляет `Super Admin` как отдельный системный уровень без урезания прав.

## 10. Что все еще остается manual

Versioned-код фиксирует roles и content API permissions, но вручную остаются:

- создание самих admin users;
- назначение пользователей на роли;
- выпуск значения `CMS_API_TOKEN`;
- заполнение `PREVIEW_SECRET` и связанных env-переменных.

Это допустимо для дипломного результата, потому что:

- матрица прав versioned и воспроизводима;
- секреты не должны храниться в репозитории;
- ручные шаги ограничены эксплуатационной настройкой, а не проектированием security model.
