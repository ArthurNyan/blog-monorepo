---
marp: true
theme: herzen-marp
paginate: true
size: 16:9
html: true
title: Разработка системы управления контентом в сфере маркетинга на базе Strapi и Astro
author: Нахатакян Артур Романович
description: Презентация к выпускной квалификационной работе
---

<!-- _class: lead -->
![w:110](../assets/title-2025-logo.png)

<div class="eyebrow">Выпускная квалификационная работа</div>

# Разработка системы управления контентом в сфере маркетинга на базе `Strapi` и `Astro`

<div class="muted">09.03.01 Информатика и вычислительная техника · Технологии разработки программного обеспечения</div>

<div class="hero-grid mt-2">
<div class="card">
<strong>Исполнитель</strong><br>
Нахатакян Артур Романович<br>
4 курс, очная форма обучения
</div>
<div class="card">
<strong>Руководитель</strong><br>
кандидат пед. наук, доцент кафедры информационных технологий и электронного обучения<br>
Государев Илья Борисович
</div>
</div>

<div class="hero-footer">РГПУ им. А. И. Герцена · Санкт-Петербург · 2026</div>

---

## Актуальность

<div class="grid-2-wide tight">
<div class="card">

### Почему тема практична

- Корпоративный маркетинговый сайт требует частых изменений страниц, кейсов, статей и вакансий.
- При кодо-центричном подходе контент, `SEO` и локализация оказываются распределены между CMS, шаблонами и ручными правками.
- Типовые редакторские изменения замедляются, потому что зависят от разработчика.
- Для такой предметной области нужен предсказуемый сценарий: черновик, предпросмотр, публикация и обновление витрины.

<div class="chips">
<span class="chip">ru/en</span>
<span class="chip">preview mode</span>
<span class="chip">SEO / sitemap</span>
</div>

</div>
<div>

![w:100%](../assets/front/home-en-with-url.png)

<div class="note">Публичная витрина должна обновляться из CMS, а не через ручную правку шаблонов.</div>

</div>
</div>

---

## Объект, предмет, цель и задачи

<div class="grid-2 tight">
<div class="card">

### Исследовательская рамка

- **Объект:** процессы управления контентом корпоративного маркетингового сайта.
- **Предмет:** архитектурные и программные решения для `CMS-first` платформы на базе `Strapi` и `Astro`.
- **Цель:** разработать систему, позволяющую управлять страницами, статьями, кейсами и вакансиями без участия разработчика.

</div>
<div class="card">

### Ключевые задачи

1. Обосновать выбор `headless CMS` и связки `Strapi + Astro`.
2. Спроектировать требования, архитектуру и модель данных.
3. Реализовать CMS-контур для `pages`, `articles`, `projects`, `vacancies`.
4. Добавить `ru/en`, `preview mode`, `SEO/Open Graph` и `sitemap`.
5. Организовать `roles/permissions`, `webhook -> rebuild`, `Vercel`, `Docker` и проверку результата.

</div>
</div>

---

## Выбор подхода и технологий

<div class="grid-3 tight">
<div class="card">

### `Headless CMS`

- Разделяет хранение контента и рендеринг витрины.
- Централизует editor workflow и API-контракт.
- Подходит для мультиязычного маркетингового сайта с разными публичными разделами.

</div>
<div class="card">

### `Strapi 5`

- Гибкие `content types`, `Dynamic Zone` и media library.
- Встроенные `i18n`, `RBAC` и `webhooks`.
- Подходит как CMS-ядро для `pages`, `articles`, `projects`, `vacancies`.

</div>
<div class="card">

### `Astro 6`

- `Prerender` для предсказуемой отдачи контента.
- Server routes для `preview` и форменных сценариев.
- Интеграция с `sitemap` и deployment на `Vercel`.

</div>
</div>

> Итоговый выбор обоснован задачей: передать управление маркетинговым контентом в CMS и оставить витрину легкой, статически собираемой и контролируемой.

---

## Архитектура системы

![w:84%](assets-generated/cms-first-architecture.png)

<div class="grid-3 tight mt-1">
<div class="soft-card">
<strong>CMS-слой</strong><br>
`Strapi` управляет контентом, ролями и публикацией.
</div>
<div class="soft-card">
<strong>Frontend-слой</strong><br>
`Astro` строит публичные маршруты, preview и server-side формы.
</div>
<div class="soft-card">
<strong>Эксплуатационный слой</strong><br>
`Vercel` и `Docker` замыкают deployment и rebuild-контур.
</div>
</div>

---

## Модель данных CMS

<div class="grid-2-wide">
<div>

![w:100%](assets-generated/cms-data-model.png)

</div>
<div class="card tight">

### Что включает модель

- `global`, `home-page`, `page`;
- `article`, `project`, `vacancy`;
- `author`, `industry`, `job-role`;
- единый компонент `shared.seo`;
- локализуемые поля для `storefront-core`, `articles` и `projects`;
- форменные сущности `lead-submission` и `vacancy-application`.

<div class="note">Сущности ориентированы на предметную область, а не на набор жестко зашитых шаблонов.</div>

</div>
</div>

---

## Редакторский контур

<div class="grid-2">
<div>

### Редактирование страницы в `Strapi`
![w:100%](../assets/strapi-images/page.png)

</div>
<div>

### Предпросмотр итоговой витрины
![w:100%](../assets/strapi-images/page-preview-desktop.png)

</div>
</div>

<div class="card mt-1 tight">

- `page` стала самостоятельной контентной единицей со `slug`, `SEO` и блоками `Dynamic Zone`.
- Редактор собирает страницу из готовых блоков без изменения frontend-кода.
- `preview mode` открывает `draft`-версию через защищенный server-side сценарий без раскрытия черновиков в публичном API.

</div>

---

## Публичная витрина и SEO-контур

<div class="grid-2-wide">
<div class="card tight">

### Реализованные возможности

- locale-prefixed публичные маршруты `/ru/` и `/en/` для storefront-core;
- `CMS-managed SEO/Open Graph` для `home-page`, `page`, `article`, `project`, `vacancy`;
- автоматическая генерация `sitemap` в build pipeline `Astro`;
- формы лидов и откликов проходят через `Astro server routes`, а не пишут напрямую в `Strapi` из браузера.

<div class="chips">
<span class="chip">meta title</span>
<span class="chip">canonical</span>
<span class="chip">og:image</span>
<span class="chip">sitemap</span>
</div>

</div>
<div>

![w:100%](../assets/front/home-en-with-url.png)

<div class="note">Публичная витрина использует единый metadata pipeline и отдает уже собранные маршруты.</div>

</div>
</div>

---

## Публикация, deployment и безопасность

<div class="grid-2-wide">
<div>

![w:100%](assets-generated/cms-content-lifecycle.png)

</div>
<div class="card tight">

### Эксплуатационный контур

- versioned webhook в `Strapi` подписан на `entry.publish` и `entry.unpublish`;
- frontend deployment ориентирован на `Vercel deploy hook`;
- CMS оформлена как `Docker` bundle с отдельным `PostgreSQL` runtime;
- роли: `administrator`, `marketer/content-manager`, `editor`, `HR`;
- `draft`-доступ выдается только через `preview-secret`, а public API ограничен опубликованными данными.

</div>
</div>

---

## Результаты и проверка

| Что проверено | Результат |
|---|---|
| Frontend build и prerender | Собирается `35` публичных HTML-маршрутов без `runtime errors`. |
| Preview contour | Черновики доступны только через `/api/preview` и `x-preview-secret`. |
| SEO и sitemap | Проверены `title`, `canonical`, `og`-поля и генерация `sitemap-index.xml`. |
| Форменные сценарии | `lead-submission` и `vacancy-application` валидируются на `server-side` и пишутся через технический токен. |
| Rebuild contour | Managed webhook зарегистрирован в `Strapi` и привязан к событиям `publish/unpublish`. |
| Security baseline | Public content API `read-only`; публикация отделена от редактирования ролями. |

<div class="note center">Результаты опираются на локальную сборку, smoke-checks, runtime-проверки и прямую верификацию CMS/SQLite baseline.</div>

---

## Практическая значимость и ограничения

<div class="grid-2 tight">
<div class="card">

### Практический эффект

- Редактор может создавать и публиковать страницы, статьи, кейсы и вакансии без изменения frontend-кода.
- Контент, `SEO` и локализация переводятся в единый `CMS-first` контур.
- Публикация становится воспроизводимой благодаря `webhook -> rebuild` и versioned deployment bundle.

</div>
<div class="card">

### Текущие ограничения

- Полный browser-level `WCAG audit` и `Lighthouse baseline` не завершены.
- Внешний `Vercel deploy` не воспроизводился `end-to-end` внутри репозитория.
- Дальнейшее развитие: новые блоки `Dynamic Zone`, расширение workflow и аналитики контента.

</div>
</div>

---

<!-- _class: lead -->
![w:110](../assets/title-2025-logo.png)

## Заключение

# Разработана `CMS-first` система управления контентом для маркетингового сайта

<div class="card mt-2">
`Strapi` используется как центр контентного управления, `Astro` — как публичная витрина с предсказуемой публикацией и build-based delivery.
</div>

<div class="chips">
<span class="chip">Strapi + Astro</span>
<span class="chip">preview</span>
<span class="chip">SEO / sitemap</span>
<span class="chip">webhook -> rebuild</span>
</div>

<div class="hero-footer">Спасибо за внимание</div>
