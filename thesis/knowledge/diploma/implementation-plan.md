# План Доработок Для Главы 2

Дата актуализации: `2026-05-22`.

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
- [final-scope.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-scope.md)

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

- `ru/en` уже работает для storefront-core и локализуемых CMS-моделей, но это нужно
  дальше последовательно удерживать в thesis как финальную границу, а не расширять до всего сайта.
- `SEO` и `preview` уже есть для content sections, но полноценная CMS-управляемая SEO-модель
  по финальному scope остается обязательной только для `home-page` и `pages`.
- deployment-контур frontend частично подготовлен через `@astrojs/vercel`, но не доведен до
  полноценно оформленного production bundle с `webhook -> rebuild`.

### Еще не закрыто как завершенный результат

- `webhook -> rebuild`;
- versioned deployment-конфигурация CMS в `Docker`;
- зафиксированная в коде и в дипломе матрица `roles/permissions`;
- формализованный тестовый контур вместо заглушек `lint/test`.

## 2. Остаток Обязательных Задач Для Главы 2

Ниже задачи отсортированы по приоритету для защиты и для силы проектной главы.

Важная оговорка:

- решения по глубине `ru/en` и по глубине CMS-managed `SEO` больше не открыты для
  переопределения в каждом новом треде;
- они зафиксированы в
  [final-scope.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-scope.md);
- значит, дальше нужно не "решать заново", а последовательно доводить оставшиеся обязательные
  инженерные элементы под уже замороженный scope.

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

- определить минимальные роли: `administrator`, `marketer/content-manager`, `editor`, `hr`;
- зафиксировать, кто может:
  - редактировать `pages/home-page/global`;
  - публиковать контент;
  - просматривать `lead-submission`;
  - просматривать отклики;
  - работать с preview;
- оформить это в knowledge и, если возможно, в reproducible-конфигурации или в приложении.

Критерий готовности:

- матрица прав формализована и может быть показана в главе 2 без догадок.

### Задача 4. Формализовать тестовый контур

Почему это важно:

- сейчас `lint` и `test` в `apps/front` и `apps/cms` остаются заглушками;
- для диплома нужен хотя бы воспроизводимый набор проверок, даже если он частично ручной.

Что нужно сделать:

- собрать матрицу ручных сценариев;
- определить минимальный автоматизированный контур, если успеваете;
- зафиксировать результаты для главы 2.

Критерий готовности:

- есть таблица проверок и доказуемые результаты по публикации, локализации storefront-core,
  preview, `SEO`, `sitemap`, `accessibility` и `performance`.

## 3. Рекомендуемый Порядок Работ

1. `webhook -> rebuild`
2. `Docker` для CMS
3. `roles/permissions`
4. тестовая матрица и финальная фиксация в thesis

Причина такого порядка:

- первые три пункта закрывают самые слабые места проектной главы;
- последний пункт нужен, чтобы превратить уже выбранный финальный scope в доказуемый результат.

## 4. Что Уже Можно Писать В Главе 2 Как Реализованное

- `Strapi` используется как CMS-ядро.
- `Astro` используется как публичная витрина.
- `pages` реализованы как отдельная сущность.
- маркетинговые страницы собираются через `Dynamic Zone`.
- `global`, `home-page` и `page` образуют CMS-first storefront-контур.
- шапка, футер и основная витрина управляются через CMS.
- `preview mode` реализован через server-side контур и secret-based доступ.
- `SEO/Open Graph` и `sitemap` реализованы для storefront первой очереди.
- финальная граница `ru/en` и `SEO` уже зафиксирована отдельным scope-контрактом.

## 5. Что Пока Нельзя Писать Как Полностью Завершенное

- автоматическое `webhook -> rebuild`, если оно еще не подключено и не проверено;
- production deployment CMS в `Docker`, если в репозитории нет versioned deployment-файлов;
- полная матрица `roles/permissions`, если она существует только как идея;
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

### Промпт 4. Проверка согласованности `ru/en` и `SEO` с final scope

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Сначала прочитай:
- thesis/knowledge/diploma/thesis-brief.md
- thesis/knowledge/diploma/decision-log.md
- thesis/knowledge/diploma/final-scope.md
- thesis/knowledge/diploma/chapter-2-evidence.md
- apps/front/src/pages/[locale]/index.astro
- apps/front/src/pages/[locale]/[slug].astro
- apps/front/src/pages/articles/*
- apps/front/src/pages/projects/*
- apps/front/src/pages/vacancies/*

Текущее состояние:
- locale-prefixed public routes уже работают для home-page и pages;
- preview уже расширен на articles, projects и vacancies;
- production public routes для articles/projects/vacancies пока не встроены в тот же ru/en контур;
- final scope уже заморожен и не требует расширять этот контур ради защиты.

Задача:
1. Проверить, что knowledge и thesis-формулировки не противоречат frozen final scope.
2. Явно зафиксировать в нужных документах, что storefront-core `ru/en` и полный CMS-managed `SEO`
   относятся к `global`, `home-page`, `page`.
3. Если найдены противоречащие формулировки, исправить их без расширения функционального объема.

Ограничения:
- не открывать заново вопрос о расширении scope на все публичные разделы;
- не подменять осознанное финальное ограничение формулировкой "еще не доделано", если это
  не входит в обязательный результат защиты.
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
