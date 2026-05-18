# План Доработок Для Главы 2

Дата актуализации: `2026-05-18`.

## Назначение

Документ фиксирует:

- что уже закрыто по обязательному контуру главы 2;
- что еще остается реализовать или формализовать;
- в каком порядке это делать;
- какие промпты можно использовать в отдельных тредах без потери контекста.

Документ опирается на:

- [thesis-brief.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/thesis-brief.md)
- [decision-log.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/decision-log.md)
- [chapter-2-evidence.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/chapter-2-evidence.md)

## 1. Текущее состояние

### Уже реализовано

- `pages` как отдельная CMS-сущность на стороне `Strapi`.
- `Dynamic Zone` и набор block renderers для витрины первой очереди.
- вынос ключевых текстов шапки, футера и главной страницы в `Strapi`.
- locale-prefixed публичный контур `/:locale/` и `/:locale/:slug/` для `home-page` и `pages`.
- `SEO/Open Graph` для `home-page` и `pages` через отдельную `seo` component-схему.
- `sitemap` на стороне `Astro`.
- защищенный `preview mode` для:
  - `home-page`;
  - `pages`;
  - `articles`;
  - `projects`;
  - `vacancies`.
- `Vercel` adapter на frontend.
- middleware на стороне CMS, которое принудительно ограничивает публичные `GET /api/*`
  опубликованными данными, если нет корректного preview-secret.

### Реализовано частично

- `ru/en` уже работает для витрины первой очереди, но еще не распространен на все
  публичные разделы.
- `SEO` и `preview` уже есть для content sections, но полноценная CMS-управляемая SEO-модель
  отдельными полями пока в явном виде завершена только для `home-page` и `pages`.
- deployment-контур frontend частично подготовлен через `@astrojs/vercel`, но не доведен до
  полноценно оформленного production bundle с `webhook -> rebuild`.

### Еще не закрыто как завершенный результат

- `webhook -> rebuild`;
- versioned deployment-конфигурация CMS в `Docker`;
- зафиксированная в коде и в дипломе матрица `roles/permissions`;
- полноценный `ru/en` для всех ключевых публичных разделов, если именно так будет заявлен итог;
- формализованный тестовый контур вместо заглушек `lint/test`.

## 2. Остаток Обязательных Задач Для Главы 2

Ниже задачи отсортированы по приоритету для защиты и для силы проектной главы.

### Задача 1. Настроить `webhook -> rebuild`

Почему это важно:

- это замыкает публикационный контур `Strapi -> publish -> rebuild -> Astro/Vercel`;
- без этого нельзя честно писать, что публикация автоматически обновляет витрину.

Что нужно сделать:

- выбрать и зафиксировать способ вызова deploy hook;
- добавить environment contract для rebuild-сценария;
- реализовать вызов hook после публикации;
- проверить сценарий на реальном изменении страницы.

Критерий готовности:

- после публикации `home-page` или `page` rebuild вызывается без ручного запуска frontend.

### Задача 2. Добавить versioned `Docker`-контур для CMS

Почему это важно:

- запуск CMS в `Docker` входит в обязательный практический результат диплома;
- сейчас этот выбор есть в knowledge, но не оформлен как versioned deployment-артефакт.

Что нужно сделать:

- создать `Dockerfile` для `apps/cms`;
- при необходимости добавить `compose`-конфигурацию;
- зафиксировать обязательные env-переменные;
- проверить локальный production-like запуск.

Критерий готовности:

- CMS запускается из репозитория как воспроизводимый `Docker`-сценарий.

### Задача 3. Зафиксировать `roles/permissions`

Почему это важно:

- `users-permissions` установлен, но само проектное разграничение ролей пока не оформлено
  как инженерное решение;
- без этого раздел безопасности и редакторских сценариев во 2 главе остается слабее.

Что нужно сделать:

- определить минимальные роли: `administrator`, `editor`, `content-manager`, при необходимости `hr`;
- зафиксировать, кто может:
  - редактировать `pages/home-page/global`;
  - публиковать контент;
  - просматривать отклики;
  - работать с preview;
- оформить это в knowledge и, если возможно, в reproducible-конфигурации или в приложении.

Критерий готовности:

- матрица прав формализована и может быть показана в главе 2 без догадок.

### Задача 4. Принять решение по глубине `ru/en`

Почему это важно:

- сейчас `ru/en` уже есть для storefront-first контура, но не для всех публичных разделов;
- во 2 главе нельзя одновременно заявлять "полный двуязычный сайт" и оставлять
  `articles/projects/vacancies` вне locale-prefixed схемы.

Вариант A:

- довести `articles` и `projects` до locale-prefixed public routes;
- затем решить, нужно ли туда же переносить `vacancies`.

Вариант B:

- оставить текущий scope и прямо ограничить формулировку диплома:
  `ru/en` завершен для главной витрины и CMS-страниц первой очереди, а остальные разделы
  остаются в частично локализованном состоянии.

Рекомендация:

- для силы главы 2 лучше довести хотя бы `articles` и `projects`.

### Задача 5. Решить, нужен ли полный CMS-управляемый SEO-контур для content sections

Почему это важно:

- сейчас базовые meta/OG для `articles/projects/vacancies` уже строятся, но не через ту же
  отдельную SEO-модель, что у `home-page/pages`;
- это влияет на формулировку результата, а не только на код.

Вариант A:

- добавить `seo` component в `article/project/vacancy`;
- сделать единый editing flow для всех ключевых сущностей.

Вариант B:

- оставить текущую модель;
- в тексте главы честно разделить:
  полноценный CMS-managed SEO для `home-page/pages` и упрощенный meta-layer для остальных разделов.

### Задача 6. Формализовать тестовый контур

Почему это важно:

- сейчас `lint` и `test` в `apps/front` и `apps/cms` остаются заглушками;
- для диплома нужен хотя бы воспроизводимый набор проверок, даже если он частично ручной.

Что нужно сделать:

- собрать матрицу ручных сценариев;
- определить минимальный автоматизированный контур, если успеваете;
- зафиксировать результаты для главы 2.

Критерий готовности:

- есть таблица проверок и доказуемые результаты по публикации, локализации, preview, SEO, sitemap.

## 3. Рекомендуемый Порядок Работ

1. `webhook -> rebuild`
2. `Docker` для CMS
3. `roles/permissions`
4. решение по `ru/en` scope
5. решение по глубине `SEO` для `articles/projects/vacancies`
6. тестовая матрица и финальная фиксация в thesis

Причина такого порядка:

- первые три пункта закрывают самые слабые места проектной главы;
- последние три пункта определяют, насколько широко можно формулировать итоговый результат.

## 4. Что Уже Можно Писать В Главе 2 Как Реализованное

- `Strapi` используется как CMS-ядро.
- `Astro` используется как публичная витрина.
- `pages` реализованы как отдельная сущность.
- маркетинговые страницы собираются через `Dynamic Zone`.
- `global`, `home-page` и `page` образуют CMS-first storefront-контур.
- шапка, футер и основная витрина управляются через CMS.
- `preview mode` реализован через server-side контур и secret-based доступ.
- `SEO/Open Graph` и `sitemap` реализованы для storefront первой очереди.

## 5. Что Пока Нельзя Писать Как Полностью Завершенное

- автоматическое `webhook -> rebuild`, если оно еще не подключено и не проверено;
- production deployment CMS в `Docker`, если в репозитории нет versioned deployment-файлов;
- полная матрица `roles/permissions`, если она существует только как идея;
- полный `ru/en` для всего публичного сайта, если locale-prefixed контур покрывает не все разделы;
- полноценный автоматизированный тестовый контур.

## 6. Промпты Для Отдельных Тредов

### Промпт 1. `webhook -> rebuild`

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Сначала прочитай:
- thesis/knowledge/diploma/thesis-brief.md
- thesis/knowledge/diploma/decision-log.md
- thesis/knowledge/diploma/chapter-2-evidence.md
- apps/front/astro.config.mjs
- apps/cms/src/index.ts
- apps/cms/config/*

Текущее состояние:
- pages, Dynamic Zone, SEO/Open Graph, sitemap и preview уже реализованы;
- preview уже покрывает home-page, pages, articles, projects и vacancies;
- frontend уже использует Vercel adapter;
- в дипломе публикационный контур должен быть: Strapi -> publish -> webhook -> rebuild frontend.

Задача:
1. Проверить, что в коде еще отсутствует оформленный webhook -> rebuild.
2. Предложить минимальный рабочий вариант для Vercel deploy hook.
3. Реализовать его в репозитории.
4. Обновить knowledge, чтобы это можно было честно описывать в главе 2.

Ограничения:
- не выдавать план за реализованный функционал;
- если rebuild нельзя проверить локально полностью, явно зафиксировать, что именно проверено, а что нет.
```

### Промпт 2. `Docker` для CMS

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Сначала прочитай:
- thesis/knowledge/diploma/thesis-brief.md
- thesis/knowledge/diploma/decision-log.md
- thesis/knowledge/diploma/chapter-2-evidence.md
- apps/cms/package.json
- apps/cms/config/*

Текущее состояние:
- CMS построена на Strapi 5;
- есть env-contract для PUBLIC_URL, IS_PROXIED, PREVIEW_SECRET;
- Docker как основной вариант deployment для CMS уже выбран в thesis knowledge, но versioned deployment files еще не оформлены.

Задача:
1. Подготовить минимальный production-like Docker-контур для apps/cms.
2. Добавить Dockerfile и, если нужно, compose-конфигурацию.
3. Зафиксировать env-переменные и способ запуска.
4. Обновить knowledge под это решение.

Ограничения:
- Strapi Cloud не использовать как основной deployment-вариант;
- не усложнять контур лишней инфраструктурой, если это не нужно для диплома.
```

### Промпт 3. `roles/permissions`

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Сначала прочитай:
- thesis/knowledge/diploma/thesis-brief.md
- thesis/knowledge/diploma/decision-log.md
- thesis/knowledge/diploma/chapter-2-evidence.md
- apps/cms/package.json
- apps/cms/src/api/*/routes/*.ts

Текущее состояние:
- users-permissions plugin установлен;
- pages, preview и storefront-контур уже есть;
- но матрица ролей и прав еще не оформлена как завершенное проектное решение.

Задача:
1. Сформировать минимальную матрицу ролей для диплома.
2. Определить, какие права нужны для pages, home-page, global, articles, projects, vacancies, vacancy-applications.
3. По возможности зафиксировать это в коде или в reproducible-документе.
4. Обновить knowledge, чтобы это можно было использовать в главе 2 и приложениях.

Ограничения:
- не придумывать сложный workflow согласования;
- ориентироваться на production-базовый уровень безопасности.
```

### Промпт 4. `ru/en` scope

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Сначала прочитай:
- thesis/knowledge/diploma/thesis-brief.md
- thesis/knowledge/diploma/decision-log.md
- thesis/knowledge/diploma/chapter-2-evidence.md
- apps/front/src/pages/[locale]/index.astro
- apps/front/src/pages/[locale]/[slug].astro
- apps/front/src/pages/articles/*
- apps/front/src/pages/projects/*
- apps/front/src/pages/vacancies/*

Текущее состояние:
- locale-prefixed public routes уже работают для home-page и pages;
- preview уже расширен на articles, projects и vacancies;
- но production public routes для articles/projects/vacancies пока не встроены в тот же ru/en контур.

Задача:
1. Оценить, что разумнее для диплома: довести ru/en для articles/projects или оставить текущий scope и явно ограничить формулировку результата.
2. Если доводим, реализовать это поэтапно.
3. Обновить knowledge и thesis-формулировки под итоговый scope.

Ограничения:
- не раздувать объем, если полный ru/en для всех разделов не обязателен для защиты;
- если scope ограничивается, это должно быть зафиксировано явно.
```

### Промпт 5. Тестовый контур и формализация результатов

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Сначала прочитай:
- thesis/knowledge/diploma/checkpoints.md
- thesis/knowledge/diploma/chapter-2-evidence.md
- apps/front/project.json
- apps/cms/project.json
- thesis/content/03-chapter-2.tex

Текущее состояние:
- core storefront-контур уже есть;
- lint/test targets пока заглушки;
- для диплома нужен воспроизводимый раздел тестирования с ручными и, по возможности, автоматизированными проверками.

Задача:
1. Сформировать матрицу обязательных проверок.
2. Отделить уже проверяемые сценарии от тех, что еще требуют реализации.
3. По возможности добавить минимальный автоматизированный контур.
4. Подготовить основу для раздела тестирования во 2 главе.

Ограничения:
- не выдавать ручную проверку за полноценный автотест;
- явно разделять: реализовано, проверено вручную, автоматизировано, требует доработки.
```
