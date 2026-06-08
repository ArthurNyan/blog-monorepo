# Testing Manual Checklist

Дата актуализации: `2026-05-31`.

Этот checklist нужен для короткой ручной приемки и live-demo на защите. Он не дублирует
полностью automated smoke и не заменяет DB/build evidence.

## Scope

Покрываются только сценарии, которые быстро и наглядно показывают:

- public storefront в `ru/en`;
- CMS-driven page;
- preview flow;
- vacancy detail и обе публичные формы.

## Preconditions

- `CMS` доступен на `http://localhost:1337`
- frontend runtime доступен на `http://localhost:4321`
- в CMS существует draft для representative page `cms-first-platform`
- при необходимости открыт `Strapi` admin и известна кнопка preview

## Checklist

### 1. Redirect `/ -> /ru/`

Тип: `Browser runtime`

Шаг:

- открыть `http://localhost:4321/`

Expected result:

- браузер переводит пользователя на `http://localhost:4321/ru/`
- открывается русская storefront entry page

### 2. Public storefront `ru`

Тип: `Browser runtime`

Шаг:

- на `http://localhost:4321/ru/` быстро показать hero, основные CTA и локализованный контент

Expected result:

- страница открывается без ошибок
- интерфейс и тексты отображаются на русском языке
- маршрут выглядит как публичный storefront entry point, а не preview/admin route

### 3. Public storefront `en`

Тип: `Browser runtime`

Шаг:

- открыть `http://localhost:4321/en/`

Expected result:

- страница открывается без ошибок
- интерфейс и тексты отображаются на английском языке
- демонстрируется тот же storefront-core в другой локали

### 4. Representative CMS page

Тип: `Browser runtime`

Шаг:

- открыть `http://localhost:4321/ru/cms-first-platform/`

Expected result:

- страница открывается без ошибок
- видно, что это отдельная CMS-driven page, а не только home page
- на странице присутствуют контентные блоки и lead form CTA

### 5. Preview flow

Тип: `Browser runtime`

Шаг:

- в `Strapi` открыть representative page draft
- нажать preview action
- показать открывшийся маршрут `/preview/...`

Expected result:

- draft открывается через preview flow, а не через обычный public route
- адрес содержит `/preview/`
- preview-путь показывает редакторский draft отдельно от опубликованной страницы

### 6. Vacancy detail

Тип: `Browser runtime`

Шаг:

- открыть `http://localhost:4321/ru/vacancies/test-vacancy/`

Expected result:

- vacancy detail page открывается без ошибок
- видны описание вакансии и форма отклика
- публичный маршрут вакансии живет вне `/:locale/...`

### 7. Lead form

Тип: `Browser runtime`

Шаг:

- на representative CMS page прокрутить до lead form
- попытаться отправить форму с незаполненными обязательными полями

Expected result:

- форма не отправляется как валидная
- пользователь получает понятную реакцию на незаполненные обязательные поля
- в live-demo не требуется успешная мутация данных: успешный submit уже подтвержден automated + DB evidence

### 8. Vacancy form

Тип: `Browser runtime`

Шаг:

- на `vacancy detail` показать форму отклика
- попытаться отправить форму с невалидным файлом или без обязательных полей

Expected result:

- форма не проходит как валидная
- пользователь получает понятную реакцию на невалидный ввод
- успешный submit в live-demo не обязателен: он уже подтвержден automated + DB evidence

## What Not To Show In Core Demo

- длинный обход `articles`, `projects`, `vacancies` и всех CMS-сущностей подряд
- успешные mutation-сценарии, если на защите нет необходимости писать тестовые данные
- внешний `Dokploy rebuild/redeploy`
- browser-level audit tooling

## Recommended Order

1. `/ -> /ru/`
2. `/ru/`
3. `/en/`
4. `/ru/cms-first-platform/`
5. preview flow
6. `/ru/vacancies/test-vacancy/`
7. lead form invalid input
8. vacancy form invalid input

## Relation To Other Artifacts

- automated baseline: [testing-runbook.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-runbook.md)
- evidence baseline: [testing-evidence-pack.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-evidence-pack.md)
- scenario matrix: [acceptance-matrix.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/acceptance-matrix.md)
- live presentation outline: [demo-plan.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/docs/demo-plan.md)
