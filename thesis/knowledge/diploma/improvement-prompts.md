# Improvement Backlog And Agent Prompts

Дата фиксации: `2026-05-31`.

Документ собирает текущие наиболее важные доработки по итогам повторного анализа проекта и ВКР. Для каждого пункта зафиксированы:

- приоритет;
- проблема;
- почему это важно для диплома;
- что именно нужно изменить;
- критерий завершения;
- готовый промпт для отдельного агента.

## Общая рамка для всех агентных промптов

Во всех агентных задачах стоит сохранять сильную инженерную подачу материала.

- Не описывать проект, раздел или результат как “слабый”.
- Любой текст для диплома писать в publish-ready логике: как финальный вариант для читателя, который видит документ впервые.
- Не выносить в основной текст историю правок, старые версии формулировок, сравнение с прежними редакциями и внутренний процесс переписывания.
- Формулировать проблемные места как ограничения текущего объема, точки усиления, несинхронности, незавершенные контуры или возможности для развития.
- Сначала фиксировать, что в проекте уже сделано и почему это ценно, а затем аккуратно усиливать недоработанную часть.
- Не приукрашивать факты и не скрывать реальные ограничения, но и не обесценивать уже достигнутый результат.
- Сохранять академичный и уверенный тон: работа должна звучать как сильный инженерный проект с понятными границами, а не как набор неудачных решений.

## Порядок выполнения

Рекомендуемый порядок:

1. `P0-1` Актуализировать аналитическую главу.
2. `P0-2` Синхронизировать `SEO`-раздел второй главы.
3. `P1-1` Усилить доказательство `Dokploy`-контура.
4. `P1-2` Закрыть или формально ограничить мультиязычность карьерного модуля.
5. `P1-3` Вычистить хвосты `Vercel` и устаревший demo-контент.
6. `P1-4` Пересобрать evidence baseline.
7. `P2-1` Выровнять `Nx`-targets и фактический test contour.
8. `P2-2` Добавить подраздел про эксплуатационные риски.
9. `P2-3` Снять LaTeX warnings и привести сборку к чистому `make check`.

---

## `P0-1` Пересобрать аналитическую главу под publish-ready структуру

### Проблема

Активная логика главы 1 все еще тянет самостоятельный раздел про `исходное состояние проекта`, а сам текст этого блока содержит устаревшие утверждения о состоянии системы. В результате аналитическая глава одновременно противоречит коду и создает лишний сигнал, будто работа построена как доработка внешнего baseline.

### Почему это важно

Это опасный разрыв и по содержанию, и по подаче. Если оставить старую структуру, глава 1 будет конфликтовать с кодом, с главой 2 и с publish-ready логикой всей ВКР.

### Что нужно изменить

- Удалить из главы 1 самостоятельный раздел `Анализ исходного состояния проекта и его ограничений`.
- Поднять `Формирование требований к системе` на место `1.4`.
- Если проектный контекст все же нужен, подать его в одном-двух предложениях как контекст авторской разработки или архитектурные предпосылки решения.
- Убрать утверждения, которые уже не соответствуют коду.
- Сохранить аналитический характер главы: не превращать ее в дубль проектной главы.

### Основные файлы

- [thesis/content/02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex)
- [apps/front/astro.config.mjs](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/astro.config.mjs)
- [apps/cms/src/index.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/index.ts)
- [thesis/knowledge/diploma/final-scope.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-scope.md)
- [thesis/knowledge/diploma/chapter-2-evidence.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/chapter-2-evidence.md)

### Критерий завершения

- В аналитической главе больше нет отдельного раздела про “исходное состояние проекта”.
- Раздел требований является новым `1.4`.
- В аналитической главе больше нет ложных утверждений о том, что уже реализовано.
- Глава 1 не конфликтует с главой 2 и кодом.

### Промпт для агента

```text
Нужно пересобрать аналитическую главу диплома под publish-ready структуру и текущее состояние репозитория.

Контекст:
- Репозиторий: /Users/arthur/Documents/projects/Диплом/app-monorepo
- Основной проблемный файл: thesis/content/02-chapter-1.tex
- Сейчас в главе 1 есть самостоятельный раздел про “исходное состояние проекта”, а внутри него остались устаревшие утверждения: будто у frontend нет adapter, нет preview/sitemap/deployment контура, нет полноценной CMS-first модели. Это уже не соответствует коду и не соответствует новой логике структуры.

Что нужно сделать:
1. Изучить текущее состояние кода и связанные knowledge-файлы.
2. Удалить самостоятельный раздел `Анализ исходного состояния проекта и его ограничений`.
3. Сделать `Формирование требований к системе` новым разделом `1.4`.
4. Если проектный контекст нужен для связности, встроить его как короткое описание авторской разработки или архитектурных предпосылок решения, а не как отдельный baseline-блок.
5. Удалить или переписать устаревшие утверждения.
6. Сохранить академичный стиль ВКР.

На что опираться:
- thesis/content/02-chapter-1.tex
- apps/front/astro.config.mjs
- apps/cms/src/index.ts
- thesis/knowledge/diploma/final-scope.md
- thesis/knowledge/diploma/chapter-2-evidence.md

Ограничения:
- Не возвращать в текст отдельный раздел про “исходное состояние проекта”.
- Не трогать другие главы без необходимости.
- Не добавлять выдуманные результаты.
- Не ослаблять формулировки без причины: если что-то уже реализовано, это нужно признать.

Результат:
- обновленный 02-chapter-1.tex;
- короткая сводка, что именно было переписано;
- список удаленных/исправленных устаревших утверждений.

Тон и подача:
- Писать в сильной инженерной академической рамке.
- Если нужен проектный контекст, не называть его “чужим” или “внешним” проектом; подавать его как контекст авторской разработки.
```

---

## `P0-2` Синхронизировать `SEO`-раздел второй главы с кодом

### Проблема

Во второй главе текст все еще утверждает, что полноценный CMS-managed `SEO` распространяется только на `home-page` и `page`, хотя в коде `shared.seo` уже добавлен и для `article`, `project`, `vacancy`, а маршруты реально используют эти данные.

### Почему это важно

Это уже не просто “что еще можно улучшить”, а фактическая ошибка описания текущего результата. Она ослабляет диплом в момент, когда `SEO`-контур как раз стал одной из сильных частей проекта.

### Что нужно изменить

- Переписать подраздел про охват `SEO`-контура.
- Ясно разделить:
  - editor-managed `SEO` для `home-page`, `page`, `article`, `project`, `vacancy`;
  - route-owned metadata для list pages, если это все еще так.
- Проверить, что conclusion и auxiliary knowledge тоже не противоречат новой формулировке.

### Основные файлы

- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [apps/cms/src/api/article/content-types/article/schema.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/api/article/content-types/article/schema.json)
- [apps/cms/src/api/project/content-types/project/schema.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/api/project/content-types/project/schema.json)
- [apps/cms/src/api/vacancy/content-types/vacancy/schema.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/api/vacancy/content-types/vacancy/schema.json)
- [apps/front/src/pages/[locale]/articles/[slug].astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/[locale]/articles/[slug].astro)
- [apps/front/src/pages/[locale]/projects/[slug].astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/[locale]/projects/[slug].astro)
- [apps/front/src/pages/vacancies/[slug]/index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/vacancies/[slug]/index.astro)

### Критерий завершения

- В тексте нет утверждения, что `SEO` ограничен только `home-page` и `page`, если это уже неверно.
- Подраздел точно отражает текущий реальный охват `SEO`.
- Формулировки в conclusion и related docs не противоречат новой версии.

### Промпт для агента

```text
Нужно синхронизировать SEO-раздел второй главы диплома с реальным состоянием проекта.

Контекст:
- Репозиторий: /Users/arthur/Documents/projects/Диплом/app-monorepo
- Проблема: thesis/content/03-chapter-2.tex все еще описывает CMS-managed SEO как контур только для home-page и page, хотя в коде shared.seo уже есть для article/project/vacancy и frontend это использует.

Что нужно сделать:
1. Проверить текущие CMS schema и frontend routes для article/project/vacancy.
2. Переписать SEO-подраздел во второй главе так, чтобы он точно отражал текущий охват:
   - что editor-managed из CMS;
   - что формируется route-side;
   - какие ограничения действительно остались.
3. Проверить, не противоречат ли этой правке conclusion или knowledge-файлы, и при необходимости поправить их.

Файлы для работы:
- thesis/content/03-chapter-2.tex
- thesis/content/04-conclusion.tex
- apps/cms/src/api/article/content-types/article/schema.json
- apps/cms/src/api/project/content-types/project/schema.json
- apps/cms/src/api/vacancy/content-types/vacancy/schema.json
- apps/front/src/pages/[locale]/articles/[slug].astro
- apps/front/src/pages/[locale]/projects/[slug].astro
- apps/front/src/pages/vacancies/[slug]/index.astro

Ограничения:
- Не придумывать несуществующие list-page SEO схемы, если их нет.
- Не превращать раздел в технический changelog.
- Сохранять дипломный стиль.

Результат:
- исправленный SEO-блок в главе 2;
- краткая сводка, что теперь считается полным SEO-контуром, а что остается ограничением.

Тон и подача:
- Не писать, что прежний SEO-контур был “слабым”.
- Подавать изменения как расширение и созревание уже заложенной архитектуры.
- Ограничения формулировать как текущую границу охвата, а не как провал решения.
```

---

## `P1-1` Усилить доказательство `Dokploy`-контура

### Проблема

В работе хорошо описан managed webhook и versioned deployment contour, но внешний сегмент `Dokploy` пока доказан слабее, чем внутренняя CMS-часть. Текст честный, но доказательная база пока преимущественно локальная.

### Почему это важно

После отказа от `Vercel` это одна из ключевых инженерных опор диплома. Если `Dokploy` фигурирует как production-платформа, желательно показать хотя бы один реальный внешний артефакт или очень четко упакованный deployment runbook.

### Что нужно изменить

- Усилить knowledge-документ и дипломный текст по `Dokploy`.
- По возможности добавить:
  - скриншоты;
  - deploy logs;
  - конфигурационный runbook;
  - описание live demo сценария;
  - список env contract именно для `Dokploy`.
- Четко разделить:
  - что доказано локально;
  - что подтверждается внешним production-like контуром;
  - что остается ограничением.

### Основные файлы

- [thesis/knowledge/diploma/publication-deployment-contour.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/publication-deployment-contour.md)
- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/content/04-conclusion.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/04-conclusion.tex)
- [apps/front/Dockerfile](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/Dockerfile)
- [apps/cms/Dockerfile](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/Dockerfile)
- [apps/cms/compose.yml](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/compose.yml)

### Критерий завершения

- Для `Dokploy` есть отдельный понятный evidence/runbook блок.
- В дипломе ясно объяснено, что именно доказано, а что нет.
- Переход с `Vercel` на `Dokploy` больше не оставляет неоднозначностей.

### Промпт для агента

```text
Нужно усилить доказательную и описательную часть deployment-контура на Dokploy.

Контекст:
- Репозиторий: /Users/arthur/Documents/projects/Диплом/app-monorepo
- Vercel больше не используется; финальная deployment-модель строится вокруг Dokploy.
- Сейчас managed webhook и Docker contour описаны хорошо, но внешний Dokploy-сегмент доказан слабее, чем локальный baseline.

Что нужно сделать:
1. Проанализировать все текущие deployment-related файлы и knowledge-документы.
2. Усилить publication/deployment documentation под Dokploy:
   - что именно развертывается;
   - какие env обязательны;
   - как работает publish -> webhook -> Dokploy rebuild/redeploy;
   - какие артефакты можно показать на защите;
   - что доказано локально, а что остается внешним сегментом.
3. При необходимости обновить:
   - thesis/knowledge/diploma/publication-deployment-contour.md
   - thesis/content/03-chapter-2.tex
   - thesis/content/04-conclusion.tex
4. Если в репозитории уже есть пригодные скриншоты/артефакты, встроить их в описание. Если нет, подготовить список того, что нужно добрать вручную.

Файлы:
- thesis/knowledge/diploma/publication-deployment-contour.md
- thesis/content/03-chapter-2.tex
- thesis/content/04-conclusion.tex
- apps/front/Dockerfile
- apps/cms/Dockerfile
- apps/cms/compose.yml

Ограничения:
- Не писать, что end-to-end Dokploy rebuild/redeploy доказан, если этого реально нет.
- Не возвращать Vercel как fallback.

Результат:
- усиленная документация по Dokploy;
- при необходимости обновленные фрагменты диплома;
- короткий список артефактов для защиты, которые можно показать руками.

Тон и подача:
- Писать так, чтобы Dokploy-контур звучал как зрелое инженерное решение с честно обозначенной границей доказанности.
- Не говорить о “слабости” deployment-модели; описывать недостающие части как внешний инфраструктурный сегмент или как зону дополнительного подтверждения.
- Сохранять уверенную, но фактическую подачу.
```

---

## `P1-2` Закрыть или формально ограничить мультиязычность карьерного модуля

### Проблема

Маркетинговые страницы, статьи и проекты уже живут в locale-prefixed контуре, а карьерный модуль публично остается отдельным маршрутом `/vacancies/*`. Это самый заметный функциональный разрыв в единой multilingual-истории проекта.

### Почему это важно

Этот вопрос легко задается на защите: почему часть системы fully bilingual, а карьерный контур нет? Нужно либо довести его до той же модели, либо очень четко оформить как осознанное ограничение scope.

### Что нужно изменить

Нужно выбрать один из двух путей:

1. Реализационный путь:
   - довести вакансии до locale-prefixed публичной модели;
   - обновить маршруты, `sitemap`, `preview`, тексты, вывод.
2. Академический путь:
   - оставить как есть;
   - усилить текст ограничения в главе 2, заключении и final scope;
   - объяснить, почему карьерный модуль сознательно оставлен отдельным контуром.

### Основные файлы

- [apps/front/src/pages/vacancies/index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/vacancies/index.astro)
- [apps/front/src/pages/vacancies/[slug]/index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/vacancies/[slug]/index.astro)
- [apps/front/src/pages/preview/[locale]/vacancies/[slug].astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/preview/[locale]/vacancies/[slug].astro)
- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/content/04-conclusion.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/04-conclusion.tex)

### Критерий завершения

Либо вакансии становятся частью единой multilingual-модели, либо в тексте больше нет двусмысленности и разрыв подан как допустимое ограничение.

### Промпт для агента

```text
Нужно разобраться с мультиязычностью карьерного модуля и довести это до защищаемого состояния.

Контекст:
- Репозиторий: /Users/arthur/Documents/projects/Диплом/app-monorepo
- Сейчас marketing/storefront-core, pages, articles и projects уже живут в locale-prefixed контуре.
- Вакансии публично остаются отдельным маршрутом /vacancies/*.
- Для диплома это либо надо довести до единой модели, либо очень четко оформить как ограничение scope.

Задача:
1. Проанализировать текущий карьерный контур и определить, насколько реалистично довести его до locale-prefixed модели без ломки проекта.
2. Выбрать один путь:
   - либо реализовать bilingual public contour для vacancies;
   - либо оставить текущую архитектуру, но усилить и синхронизировать текстовые ограничения диплома.
3. Если выбран реализационный путь:
   - обновить маршруты, SEO/canonical, preview, sitemap-coverage и релевантный текст диплома.
4. Если выбран академический путь:
   - обновить главу 2, conclusion и final scope так, чтобы ограничение было сформулировано честно и убедительно.

Файлы:
- apps/front/src/pages/vacancies/index.astro
- apps/front/src/pages/vacancies/[slug]/index.astro
- apps/front/src/pages/preview/[locale]/vacancies/[slug].astro
- thesis/content/03-chapter-2.tex
- thesis/content/04-conclusion.tex
- thesis/knowledge/diploma/final-scope.md

Ограничения:
- Не делать частичную переделку без обновления текста диплома.
- Не вводить фиктивную bilingual-модель только на бумаге.

Результат:
- либо реализованный locale-aware карьерный контур и обновленный текст;
- либо четко оформленное scope-ограничение с синхронизированным описанием в дипломе.

Тон и подача:
- Не представлять текущую модель вакансий как “слабое место”.
- Если контур не расширяется, описывать это как осознанную границу scope и отдельный прикладной модуль.
- Если контур расширяется, подавать это как развитие уже существующей архитектуры, а не как исправление неудачного решения.
```

---

## `P1-3` Вычистить хвосты `Vercel` и устаревший demo-контент

### Проблема

В проекте остались отдельные следы старой `Vercel`-истории и нерелевантного showcase/demo-контента. Они не определяют архитектуру, но могут случайно всплыть и испортить впечатление цельности.

### Почему это важно

После решения уйти на `Dokploy` в репозитории не должно быть визуально заметного конфликта “у нас Dokploy, но в материалах, seed-контенте и кейсах все еще Vercel”.

### Что нужно изменить

- Найти и зачистить устаревшие упоминания `Vercel`, если они не нужны для примеров.
- Пересмотреть demo/showcase-контент, который не работает на тему диплома.
- Сохранить только те упоминания, которые действительно относятся к сторонним источникам или документации, но не к текущей архитектуре проекта.

### Основные файлы

- [apps/front/docs/CASE_STUDY.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/docs/CASE_STUDY.md)
- [apps/front/src/widgets/LogoPanel/const/const.tsx](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/LogoPanel/const/const.tsx)
- [apps/cms/scripts/seed-pages.js](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/scripts/seed-pages.js)

### Критерий завершения

- В репозитории не остается misleading `Vercel`-контекста, который может быть принят за часть финальной архитектуры.
- Showcase/demo-контент не конфликтует с темой диплома.

### Промпт для агента

```text
Нужно вычистить из репозитория хвосты старой Vercel-истории и нерелевантный demo-контент.

Контекст:
- Репозиторий: /Users/arthur/Documents/projects/Диплом/app-monorepo
- Финальная deployment-модель проекта — Dokploy, а не Vercel.
- В коде и docs остались отдельные упоминания Vercel и showcase-контент, которые могут создавать ощущение незавершенного архитектурного поворота.

Что нужно сделать:
1. Найти все релевантные упоминания Vercel и оценить, какие из них реально мешают.
2. Удалить или переписать те, которые:
   - выглядят как часть текущей архитектуры;
   - засоряют дипломный контекст;
   - не несут реальной пользы.
3. Сохранить только те упоминания, которые являются внешними ссылками/источниками и не искажают текущий baseline.
4. Если нужно, обновить seed/demo-контент так, чтобы он лучше соответствовал финальной теме проекта.

Файлы-кандидаты:
- apps/front/docs/CASE_STUDY.md
- apps/front/src/widgets/LogoPanel/const/const.tsx
- apps/cms/scripts/seed-pages.js

Ограничения:
- Не трогать автоматически сгенерированные большие справочные файлы, если они не участвуют в дипломе.
- Не вычищать внешние source references без необходимости.

Результат:
- очищенный репозиторий без misleading Vercel narrative;
- короткий список, что было убрано и почему.

Тон и подача:
- Не драматизировать наличие старых хвостов.
- Подавать задачу как наведение архитектурной и narrative-consistency после финального выбора Dokploy.
- Сохранять уважение к уже проделанной работе и не описывать прошлые решения как ошибочные сами по себе.
```

---

## `P1-4` Пересобрать evidence baseline под текущее состояние проекта

### Проблема

Ключевой evidence pack сейчас опирается на baseline от `2026-05-29`, тогда как код и дипломные тексты менялись после этого. Если финальный state изменился, baseline надо обновить.

### Почему это важно

У тебя уже есть сильный тестовый контур. Слабым он становится только в тот момент, когда цифры и скриншоты относятся к позавчерашней версии проекта, а не к текущей.

### Что нужно изменить

- Повторно прогнать все основные проверки.
- Обновить:
  - testing evidence;
  - количественные показатели;
  - при необходимости таблицы второй главы;
  - ссылки на latest screenshots/logs.

### Основные файлы

- [thesis/knowledge/diploma/testing-evidence-pack.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-evidence-pack.md)
- [thesis/knowledge/diploma/testing-runbook.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-runbook.md)
- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [package.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/package.json)

### Критерий завершения

- Evidence pack обновлен под актуальный baseline.
- Цифры в главе 2 соответствуют последнему прогону.
- Если появились новые ограничения или новые сильные результаты, они отражены в тексте.

### Промпт для агента

```text
Нужно обновить testing/evidence baseline под текущее состояние проекта.

Контекст:
- Репозиторий: /Users/arthur/Documents/projects/Диплом/app-monorepo
- Сейчас главный evidence pack датирован 2026-05-29, но проект с тех пор дорабатывался.
- Нужно актуализировать все важные численные и сценарные подтверждения.

Что нужно сделать:
1. Изучить текущий testing contour и связанные документы.
2. Запустить доступные проверки и собрать актуальные результаты:
   - smoke;
   - build-related evidence;
   - browser audit, если он входит в текущий contour;
   - прочие локально воспроизводимые evidence-команды.
3. Обновить testing-evidence-pack.md и при необходимости фрагменты диплома, где зафиксированы количественные показатели или формулировки baseline.
4. Если результаты изменились, привести их к единому состоянию во всех релевантных текстах.

Основные файлы:
- thesis/knowledge/diploma/testing-evidence-pack.md
- thesis/knowledge/diploma/testing-runbook.md
- thesis/content/03-chapter-2.tex
- package.json

Ограничения:
- Не подменять реальные результаты ожидаемыми.
- Если часть проверки недоступна, честно зафиксировать это как ограничение.

Результат:
- обновленный evidence pack;
- обновленные числа/формулировки в дипломе;
- короткая сводка команд и итогов прогонов.

Тон и подача:
- Писать так, чтобы evidence-контур выглядел как сильная сторона проекта.
- Обновление baseline трактовать как нормальную синхронизацию доказательной базы с актуальной версией системы.
- Не использовать формулировки, которые обесценивают уже собранные результаты.
```

---

## `P2-1` Выровнять `Nx`-targets и фактический test contour

### Проблема

В репозитории уже есть реальный testing contour через `smoke:front`, `evidence:testing`, `audit:browser`, но `apps/front/project.json` и `apps/cms/project.json` все еще выглядят так, будто тестов и линтинга нет вообще.

### Почему это важно

Это не ломает диплом, но создает плохой инженерный сигнал. Если смотреть на `Nx` как на orchestration layer, сейчас он не отражает фактическую дисциплину проекта.

### Что нужно изменить

- Привести `project.json` в соответствие с уже существующими scripts.
- Не обязательно строить идеальный CI, достаточно убрать явную несостыковку “tests not configured”.
- При необходимости зафиксировать ограничения, если для CMS полноценный `test` target пока действительно отсутствует.

### Основные файлы

- [apps/front/project.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/project.json)
- [apps/cms/project.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/project.json)
- [apps/front/package.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/package.json)
- [apps/cms/package.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/package.json)
- [package.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/package.json)

### Критерий завершения

- `Nx` targets больше не противоречат фактическим скриптам.
- Репозиторий выглядит как система с реальным orchestrated contour, а не как набор ручных команд.

### Промпт для агента

```text
Нужно выровнять Nx project targets с фактическими scripts и текущим testing contour.

Контекст:
- Репозиторий: /Users/arthur/Documents/projects/Диплом/app-monorepo
- В проекте уже есть smoke/evidence/browser audit scripts, но Nx targets в apps/front/project.json и apps/cms/project.json все еще выводят "No tests configured...".

Что нужно сделать:
1. Проанализировать текущие root/app scripts и существующий orchestration contour.
2. Обновить Nx targets так, чтобы они:
   - не противоречили реальному состоянию;
   - использовали уже существующие scripts, где это уместно;
   - не создавали ложного впечатления отсутствия тестового контура.
3. Если для части задач пока нет полноценного test target, оформить это аккуратно и инженерно честно.

Файлы:
- apps/front/project.json
- apps/cms/project.json
- apps/front/package.json
- apps/cms/package.json
- package.json

Ограничения:
- Не придумывать несуществующие тесты.
- Не ломать существующие команды.

Результат:
- обновленные project.json файлы;
- короткая сводка новой логики targets.

Тон и подача:
- Подавать задачу как доведение orchestration-контура до логической завершенности.
- Не писать, что проект “без тестов” или “слабый по качеству”, если testing contour уже существует.
- Делать акцент на согласованности инструментов и инженерной аккуратности.
```

---

## `P2-2` Добавить подраздел про эксплуатационные риски и отказоустойчивость контура

### Проблема

В коде и knowledge-файлах уже есть env contract, предупреждения и границы deployment-контура, но в основном тексте ВКР можно сильнее сформулировать, какие эксплуатационные риски учитываются и как система ведет себя при некорректной конфигурации.

### Почему это важно

Это поднимает диплом с уровня “набор фич” до уровня “инженерная система с оговоренными условиями эксплуатации”.

### Что нужно изменить

- Добавить короткий подраздел или абзац про риски и ограничения:
  - отсутствие `PREVIEW_SECRET`;
  - отсутствие `FRONTEND_REBUILD_HOOK_URL`;
  - недоступность CMS;
  - граница локального и внешнего deployment evidence.
- Опирайся на уже существующий код, не выдумывай сложную reliability-модель.

### Основные файлы

- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [apps/cms/src/index.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/index.ts)
- [apps/cms/src/utils/publication-webhook.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/utils/publication-webhook.ts)
- [thesis/knowledge/diploma/publication-deployment-contour.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/publication-deployment-contour.md)

### Критерий завершения

- В дипломе есть внятный, короткий блок про эксплуатационные границы и риски.
- Он усиливает работу, но не превращает текст в SRE-документацию.

### Промпт для агента

```text
Нужно усилить диплом коротким инженерным блоком про эксплуатационные риски и границы deployment/publication контура.

Контекст:
- Репозиторий: /Users/arthur/Documents/projects/Диплом/app-monorepo
- В коде уже есть env checks и предупреждения по preview/deployment.
- В тексте диплома это пока можно подать сильнее как часть эксплуатационной модели.

Что нужно сделать:
1. Изучить current deployment/publication code paths и knowledge docs.
2. Добавить в диплом короткий подраздел или компактный абзац про:
   - какие env являются критичными;
   - что происходит при их отсутствии;
   - где проходит граница между локально доказанным и внешним production-сегментом;
   - какие риски сознательно не закрываются в рамках ВКР.
3. Сохранить академический стиль и не перегружать текст operational detail-ами.

Файлы:
- thesis/content/03-chapter-2.tex
- apps/cms/src/index.ts
- apps/cms/src/utils/publication-webhook.ts
- thesis/knowledge/diploma/publication-deployment-contour.md

Ограничения:
- Не писать о механизмах, которых нет в коде.
- Не превращать это в отдельную большую главу.

Результат:
- усиленный фрагмент проектной главы;
- при необходимости обновленный knowledge-документ с теми же формулировками.

Тон и подача:
- Описывать риски и границы как часть зрелого инженерного проектирования.
- Не превращать наличие ограничений в негативную характеристику проекта.
- Подчеркивать, что система имеет осознанные эксплуатационные предпосылки и явно заданный scope.
```

---

## `P2-3` Снять LaTeX warnings и довести сборку до чистого `make check`

### Проблема

Диплом собирается, но `make -C thesis check` сейчас падает из-за `Overfull/Underfull` warnings в `main.log`, прежде всего вокруг второй главы и таблиц.

### Почему это важно

Это уже не про содержание, а про финальную дисциплину сдачи. Если есть время, лучше довести сборку до clean state.

### Что нужно изменить

- Разобрать предупреждения из `main.log`.
- Подправить проблемные абзацы, формулировки, переносы, таблицы и, если нужно, ширины колонок.
- Проверить, что `make -C thesis check` проходит без ошибок.

### Основные файлы

- [thesis/main.log](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/main.log)
- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/content/04-conclusion.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/04-conclusion.tex)
- [thesis/Makefile](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/Makefile)

### Критерий завершения

- `make -C thesis check` проходит.
- Не добавлены грубые typographic hacks, ухудшающие читаемость.

### Промпт для агента

```text
Нужно довести LaTeX-сборку диплома до чистого состояния по make check.

Контекст:
- Репозиторий: /Users/arthur/Documents/projects/Диплом/app-monorepo
- Сейчас thesis/main.pdf собирается, но команда make -C thesis check падает на Overfull/Underfull warnings из main.log.
- Основные проблемные места визуально связаны со второй главой и таблицами.

Что нужно сделать:
1. Изучить thesis/main.log и определить, какие warning-места реально надо поправить.
2. Аккуратно исправить проблемные фрагменты в tex-файлах:
   - переписать слишком длинные формулировки;
   - при необходимости подстроить таблицы;
   - минимизировать typographic hacks.
3. Повторять проверку, пока make -C thesis check не пройдет или пока не останутся только genuinely hard cases, которые стоит отдельно объяснить.

Файлы:
- thesis/main.log
- thesis/content/03-chapter-2.tex
- thesis/content/04-conclusion.tex
- thesis/Makefile

Ограничения:
- Не ухудшать стиль текста ради формальной тишины.
- Не ломать структуру документа.

Результат:
- исправленные tex-файлы;
- итог команды make -C thesis check;
- краткая сводка, какие warnings были устранены.

Тон и подача:
- Рассматривать LaTeX warnings как финальную полировку, а не как показатель слабости диплома.
- Сохранять сильную подачу результата: содержательная часть уже собрана, задача состоит в формальном доведении.
- Не жертвовать качеством текста ради механического подавления предупреждений.
```

---

## Короткий вывод

Если времени мало, в первую очередь нужно закрыть `P0-1`, `P0-2`, `P1-1` и `P1-4`. Это даст максимальный эффект именно для качества ВКР.

Если хочется довести работу до максимально аккуратного состояния, затем имеет смысл закрыть `P1-2`, `P1-3`, `P2-1`, `P2-2` и `P2-3`.
