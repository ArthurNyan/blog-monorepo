# CMS-Managed SEO Content Contour

Дата актуализации: `2026-05-22`.

## Назначение

Документ фиксирует отдельный инженерный результат: расширение `CMS-managed SEO/Open Graph`
с `home-page/page` на ключевые content entities `article`, `project`, `vacancy`.

Он нужен как source of truth для:

- главы 2 ВКР;
- agent handoff между итерациями;
- разведения `editor-managed model` и `fallback behavior`.

## 1. Реализованная модель

В проекте используется единый компонент `shared.seo` со следующими полями:

- `metaTitle`;
- `metaDescription`;
- `canonicalURL`;
- `ogTitle`;
- `ogDescription`;
- `ogImage`;
- `noIndex`.

Этот компонент подключен к:

- `home-page`;
- `page`;
- `article`;
- `project`;
- `vacancy`.

Для `article`, `project` и `vacancy` компонент намеренно оставлен опциональным:

- это сохраняет возможность публиковать сущность без ручного заполнения всех SEO-полей;
- это позволяет отделить редакторскую модель от fallback-слоя;
- это снижает риск блокировки уже существующих записей при расширении схем.

## 2. Где модель реально применяется

`CMS-managed SEO/Open Graph` теперь используется одинаково на:

- public detail route `/:locale/articles/:slug/`;
- public detail route `/:locale/projects/:slug/`;
- public detail route `/:locale/vacancies/:slug/`;
- preview detail route `/preview/:locale/articles/:slug/`;
- preview detail route `/preview/:locale/projects/:slug/`;
- preview detail route `/preview/:locale/vacancies/:slug/`.

`home-page` и `page` продолжают использовать тот же компонент и тот же frontend metadata flow.

Централизованный рендер остается на стороне
[apps/front/src/layouts/main.astro](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/layouts/main.astro),
а вычисление итоговых метаданных выполняется через
[apps/front/src/shared/seo/metadata.ts](/Users/arthur/Documents/projects/Диплом/app-monorepo/apps/front/src/shared/seo/metadata.ts).

## 3. Fallback Behavior

Новый контур не отменяет fallback-слой. Он зафиксирован явно:

- если `metaTitle` не заполнен, frontend использует сущностное поле `name/title`;
- если `metaDescription` не заполнен, frontend использует `description` или route-level description;
- если `canonicalURL` не задан, frontend строит canonical из публичного pathname;
- если `ogTitle` или `ogDescription` не заданы, они наследуются от итоговых `title/description`;
- для `article` и `project`, если `ogImage` не задан, frontend использует `cover` как fallback `og:image`;
- preview routes всегда получают `noindex`, даже если редактор не включал его вручную;
- section list pages `/:locale/articles/`, `/:locale/projects/`, `/:locale/vacancies/` остаются
  route-owned SEO-поверхностью и не получают отдельную CMS-управляемую SEO-схему.

## 4. Граница результата для диплома

Этот результат можно описывать как отдельный инженерный контур:

- в `Strapi` расширена модель данных ключевых content entities;
- редактор получил единый editing flow для `SEO/Open Graph` на detail-страницах;
- public и preview routes используют единый metadata pipeline;
- fallback rules задокументированы и не смешиваются с реализованной моделью.

Нельзя формулировать результат шире, чем он реализован:

- list pages не стали полностью CMS-managed SEO surface;
- list pages `articles/projects/vacancies` остаются route-owned поверхностью;
- legacy `/vacancies/*` используется только как compatibility redirect, а `vacancy`
  detail page использует editor-managed SEO внутри locale-prefixed URL-контура.
