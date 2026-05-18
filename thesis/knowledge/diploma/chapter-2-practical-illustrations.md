# Практические иллюстрации для главы 2

## Статус

По состоянию на текущий репозиторий в `thesis/assets` нет готовых практических
скриншотов, которые можно напрямую подключить в главу 2. В наличии есть только:

- внешние изображения общего характера из `thesis/assets/images/fig-*`;
- сгенерированные диаграммы `PlantUML` в `thesis/assets/diagrams/plantuml`.

Следовательно, практические иллюстрации для главы 2 нужно готовить отдельно.

## Принцип отбора

В главу 2 следует включать только те изображения, которые подтверждают
реализованные свойства системы и усиливают аргументацию там, где диаграммы
остаются слишком абстрактными.

Не следует добавлять:

- общий dashboard `Strapi` без открытой сущности;
- декоративные скриншоты главной страницы без привязки к тезису;
- изображения про `Docker`, `webhook -> rebuild` и другой функционал, который
  не зафиксирован в репозитории как завершенный контур;
- IDE-скриншоты файловой структуры вместо пользовательских или редакторских
  экранов.

## Рекомендуемый минимальный набор

### 1. Редактор `page` или `home-page` в Strapi с `Dynamic Zone`

**Что нужно показать**

- открытую запись `Page` или `Home Page` в `Strapi`;
- поля `title` и `slug`;
- секцию `blocks` с несколькими элементами `Dynamic Zone`;
- секцию `SEO`.

**Что это доказывает в главе 2**

Иллюстрация подтверждает, что page builder реально существует в текущей
системе, а структура страницы собирается в CMS, а не описывается вручную во
frontend-коде.

**Где ставить в главе**

- `Раздел 3. Конструктор страниц на основе Dynamic Zone`
- `Подраздел: Сущность page и набор блоков`

**Почему нужен именно скриншот**

Диаграмма модели данных фиксирует структуру сущности, но не показывает
реальный редакторский интерфейс. Скриншот здесь нужен как прямое доказательство
того, что контент-менеджер действительно работает с блоковой моделью страницы.

**На какие текущие файлы опирается**

- [apps/cms/src/api/page/content-types/page/schema.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/api/page/content-types/page/schema.json:27)
- [apps/cms/src/api/home-page/content-types/home-page/schema.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/api/home-page/content-types/home-page/schema.json:27)
- [apps/cms/src/components/shared/seo.json](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/src/components/shared/seo.json)

**Рекомендуемое имя файла**

- `thesis/assets/illustrations/ch2-strapi-page-builder.png`

### 2. Публичная CMS-страница на frontend в локализованном маршруте `/:locale/:slug/`

**Что нужно показать**

- открытую frontend-страницу, построенную из CMS;
- адресную строку с маршрутом вида `/ru/<slug>/` или `/en/<slug>/`;
- заголовок страницы и несколько блоков, пришедших из `Dynamic Zone`.

**Что это доказывает в главе 2**

Иллюстрация подтверждает, что CMS-контент реально доставляется в публичный
контур `Astro`, а локаль участвует в адресации страницы.

**Где ставить в главе**

- `Раздел 4. Реализация frontend-части на Astro`
- `Подраздел: Локализованные маршруты главной и CMS-страниц`

**Почему нужен именно скриншот**

Архитектурная диаграмма показывает связи подсистем, но не демонстрирует факт
наличия публичного локализованного маршрута. Скриншот с адресной строкой и
видимым контентом делает это доказательство прямым и наглядным.

**На какие текущие файлы опирается**

- [apps/front/src/pages/[locale]/[slug].astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/[locale]/[slug].astro:13)
- [apps/front/src/shared/api/pages.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/api/pages.ts:418)
- [apps/front/src/shared/components/page-builder/DynamicZoneRenderer.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/components/page-builder/DynamicZoneRenderer.astro)

**Рекомендуемое имя файла**

- `thesis/assets/illustrations/ch2-localized-cms-page.png`

### 3. Рабочий `preview` для draft-версии страницы

**Что нужно показать**

- открытый preview-маршрут вида `/preview/<locale>/<slug>/` или `/preview/<locale>/`;
- draft-версию той же страницы, для которой есть публичный вариант;
- желательно такое изменение в контенте, которое позволяет визуально отличить
  draft от published.

**Что это доказывает в главе 2**

Иллюстрация подтверждает, что в системе реализован не только публичный
публикационный контур, но и связанный сценарий защищенного server-side
preview для черновиков.

**Где ставить в главе**

- `Раздел 6. Preview и защищенный доступ к черновикам`
- `Подраздел: Server-side preview на стороне frontend`

**Почему нужен и скриншот, и диаграмма**

Диаграмма последовательности объясняет механику маршрутизации, cookie и
секретного заголовка. Скриншот, в свою очередь, подтверждает, что этот поток
реально приводит редактора на отдельный preview-экран с draft-контентом.

**На какие текущие файлы опирается**

- [apps/cms/config/admin.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/cms/config/admin.ts:73)
- [apps/front/src/pages/api/preview.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/api/preview.ts:30)
- [apps/front/src/pages/preview/[locale]/[slug].astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/preview/[locale]/[slug].astro:1)
- [apps/front/src/shared/preview/session.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/preview/session.ts:6)

**Рекомендуемое имя файла**

- `thesis/assets/illustrations/ch2-preview-page.png`

## Опциональная четвертая иллюстрация

### 4. Карточка вакансии с формой отклика

**Что нужно показать**

- детальную страницу вакансии;
- основные атрибуты вакансии;
- встроенную форму отклика.

**Что это доказывает в главе 2**

Иллюстрация показывает, что проект покрывает не только публикацию контента, но
и прикладной сценарий взаимодействия пользователя с системой через форму,
которая отправляет данные в `vacancy-application`.

**Где ставить в главе**

Один из двух вариантов:

- `Раздел 4. Реализация frontend-части на Astro`
- `Подраздел: Статьи, проекты и карьерный модуль`

или

- `Раздел 8. Безопасность публичных сценариев`
- `Подраздел: Валидация отклика на вакансию`

**Почему это опционально**

Это сильная прикладная иллюстрация, но она не обязательна для доказательства
самого `CMS-first` контура. Ее стоит включать только если нужен дополнительный
акцент на карьерном модуле как пользовательском сценарии.

**На какие текущие файлы опирается**

- [apps/front/src/pages/vacancies/[slug]/index.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/pages/vacancies/[slug]/index.astro:63)
- [apps/front/src/widgets/VacancyApplicationForm/ui/VacancyApplicationForm.tsx](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/widgets/VacancyApplicationForm/ui/VacancyApplicationForm.tsx:1)
- [apps/front/src/shared/api/vacancies.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/api/vacancies.ts:307)

**Рекомендуемое имя файла**

- `thesis/assets/illustrations/ch2-vacancy-application-form.png`

## Итоговое решение

Минимально достаточный набор практических иллюстраций для главы 2:

1. `Strapi page builder` с `Dynamic Zone`;
2. публичная локализованная CMS-страница на frontend;
3. рабочий `preview` для draft-версии.

Четвертую иллюстрацию с вакансией и формой отклика следует добавлять только в
том случае, если в финальной версии главы нужен отдельный прикладной акцент на
карьерном модуле.

## Точный список скриншотов, которые нужно снять

1. `ch2-strapi-page-builder.png`
   Открыть редактирование `Page` или `Home Page` в `Strapi` и показать
   `title`, `slug`, `Dynamic Zone` и `SEO`.
2. `ch2-localized-cms-page.png`
   Открыть публичную CMS-страницу в браузере по маршруту `/:locale/:slug/` и
   оставить в кадре адресную строку и несколько блоков страницы.
3. `ch2-preview-page.png`
   Открыть `preview` для draft-версии той же страницы и оставить в кадре
   preview-URL и измененный контент.
4. `ch2-vacancy-application-form.png`
   Снять карточку вакансии с видимой формой отклика, если будет принято решение
   усиливать прикладной сценарий карьерного модуля.
