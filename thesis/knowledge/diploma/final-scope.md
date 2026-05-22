# Final Scope

Дата фиксации: `2026-05-22`.

## Назначение

Этот документ является единым рабочим контрактом для следующих этапов дипломного проекта.

Его задача:

- зафиксировать финальную трактовку результата без расширения темы;
- развести `уже реализовано`, `обязательно реализовать` и `останется ограничением`;
- убрать неоднозначность по `ru/en`, `SEO`, ролям, проверкам и допустимым ограничениям.

Если другие knowledge-документы формулируют scope шире, чем этот файл, приоритет имеет
именно данный документ.

## 1. Базовый факт по репозиторию

На дату фиксации по коду подтверждаются следующие опорные факты:

- `Strapi 5` и `Astro 6` уже образуют рабочий `CMS-first` контур `Strapi -> API -> Astro`.
- В `Strapi` уже есть предметные сущности `global`, `home-page`, `page`, `article`,
  `author`, `project`, `vacancy`, `industry`, `job-role`, `vacancy-application`,
  `lead-submission`.
- `Dynamic Zone` и библиотека block-компонентов уже реализованы для `home-page` и `page`.
- Публичный locale-prefixed контур уже реализован для `/:locale/`, `/:locale/:slug/`,
  `/:locale/articles/:slug/` и `/:locale/projects/:slug/`.
- Защищенный `preview mode` уже реализован для `home-page`, `page`, `article`, `project`,
  `vacancy`.
- `CMS-managed SEO/Open Graph` уже реализован для `home-page`, `page` и detail entities
  `article`, `project`, `vacancy`, при отдельном route-owned fallback-слое для list pages.
- `@astrojs/sitemap` и `@astrojs/vercel` уже подключены.
- В репозитории уже зафиксированы versioned `Docker`-файлы для CMS и оформленный
  `webhook -> rebuild` contour; незакрытым обязательным блоком остается прежде всего
  формальная матрица `roles/permissions` и reproducible verification pack.
- `lint` и `test` цели в `apps/front` и `apps/cms` пока остаются заглушками.

## 2. Final Scope

### 2.1. Граница `ru/en`

#### Входит в `ru/en` как обязательная часть итогового результата

На уровне CMS-модели:

- `global`;
- `home-page`;
- `page`;
- `article`;
- `author`;
- `project`;
- `vacancy`;
- `industry`;
- `job-role`.

На уровне обязательного публичного route-контура:

- `/:locale/` для главной витрины на основе `home-page`;
- `/:locale/:slug/` для CMS-страниц `page`;
- `/:locale/articles/` и `/:locale/articles/:slug/` для `article`;
- `/:locale/projects/` и `/:locale/projects/:slug/` для `project`;
- locale-aware `Header`, `Footer`, `lang`, `canonical` и `SEO` для этого storefront-core
  и для `articles/projects`;
- locale-aware `preview` для `home-page`, `page`, `article`, `project`, `vacancy`.

#### Уже реализовано

- `Strapi i18n` уже включен для всех перечисленных CMS-сущностей.
- Публичные маршруты `/:locale/`, `/:locale/:slug/`, `/:locale/articles/...` и
  `/:locale/projects/...` уже работают.
- Главная витрина, `pages`, навигация и футер уже завязаны на локаль.
- `articles` и `projects` уже используют locale-aware route helpers и локализованные
  public list/detail pages.
- `preview` уже принимает локаль для всех ключевых сущностей.

#### Обязательно реализовать

- не расширять дипломную формулировку до тезиса о "полностью локализованном всем публичном
  сайте", включая карьерный модуль;
- в следующих этапах последовательно описывать `ru/en` как storefront-core для `global`,
  `home-page`, `page` плюс locale-prefixed content collections `article/project`;
- в тестовой матрице отдельно подтвердить работу `ru/en` для storefront-core,
  `articles` и `projects`.

#### Останется допустимым ограничением

- `vacancies` могут остаться вне locale-prefixed production routes;
- для карьерного модуля допускается наличие локализованных записей в `Strapi` и localized
  preview без обязательного переноса публичных URL на `/:locale/...`;
- `vacancy-application` и `lead-submission` не входят в `ru/en` как локализуемые прикладные
  записи и остаются нелокализованными.

### 2.2. Граница `SEO`-контура

#### Получают CMS-managed `SEO/Open Graph`

- `home-page`;
- `page`.
- detail pages `article`;
- detail pages `project`;
- detail pages `vacancy`.

Под полноценным контуром в рамках ВКР понимаются:

- редактируемые из `Strapi` поля `metaTitle`, `metaDescription`, `canonicalURL`,
  `ogTitle`, `ogDescription`, `ogImage`, `noIndex`;
- централизованный рендер `title`, `description`, `canonical`, `og:*`, `twitter:*`,
  `robots` на стороне frontend;
- автоматическое `noindex` для preview-режима;
- генерация `sitemap` из публичного storefront-контура.

Для `article`, `project` и `vacancy` эта схема относится именно к detail entries и не
распространяется автоматически на section list pages.

#### Уже реализовано

- `shared.seo` уже подключен к `home-page`, `page`, `article`, `project`, `vacancy`.
- `MainLayout` уже рендерит canonical, `og:*`, `twitter:*` и `robots`.
- public и preview detail routes для `article/project/vacancy` уже используют тот же
  metadata builder, что и storefront-core.
- Preview-страницы уже получают `noindex`.
- `sitemap` на стороне `Astro` уже подключен.

#### Обязательно реализовать

- не расширять текст диплома до утверждения, что list pages `articles/projects/vacancies`
  получили отдельный CMS-managed `SEO` editing flow;
- в проверках явно валидировать `SEO` для `home-page`, `page` и хотя бы одного detail entry
  из `article/project/vacancy`;
- в итоговом тексте разводить реализованную модель и fallback behavior.

#### Останется допустимым ограничением

- section list pages `/:locale/articles/`, `/:locale/projects/`, `/vacancies/` могут
  оставаться route-owned SEO-поверхностью без отдельного `seo` component;
- для `article`, `project`, `vacancy` допустим fallback из собственных полей сущности,
  если `seo` component не заполнен полностью;
- `sitemap` не обязан отражать нелокализованные content sections как двуязычные маршруты.

### 2.3. Обязательные роли

Минимальный обязательный набор ролей для финальной версии диплома:

| Роль | Обязательная зона ответственности |
|---|---|
| `administrator` | полный доступ к CMS, пользователям, ролям, настройкам, публикации и всем сущностям |
| `marketer/content-manager` | управление `global`, `home-page`, `page`, `article`, `project`, просмотр `lead-submission`, preview и публикация маркетингового контента |
| `editor` | создание и редактирование маркетингового контента без управления ролями, без обязательного права публикации и без доступа к маркетинговым лидам |
| `hr` | управление `vacancy`, `industry`, `job-role`, просмотр и обработка `vacancy-application`, preview карьерного контура |

#### Уже реализовано

- в проекте установлен `@strapi/plugin-users-permissions`;
- в knowledge уже зафиксирована необходимость role-based разграничения.

#### Обязательно реализовать

- формальную матрицу `roles/permissions` без двусмысленности;
- разграничение маркетингового и карьерного контура;
- явное закрепление `lead-submission` за маркетинговым контуром;
- явное правило, кто имеет право публикации и кто имеет право просмотра откликов;
- описание ролей в knowledge и в тексте ВКР как части editor workflow.

#### Останется допустимым ограничением

- роли могут остаться формализованными на уровне knowledge-матрицы и reproducible manual setup,
  а не обязательно экспортируемыми как полностью автоматизированный seed ролей;
- сложный workflow согласования материалов между несколькими редакционными этапами не входит
  в итоговый объем.

### 2.4. Обязательные проверки и метрики

#### Обязательные проверки

- успешная сборка `apps/front` и `apps/cms`;
- создание, preview и публикация страницы `page` без правки frontend-кода;
- проверка `ru/en` для `global`, `home-page`, хотя бы одной `page`, хотя бы одной
  `article` и хотя бы одного `project`;
- проверка preview для `home-page`, `page`, `article`, `project`, `vacancy`;
- проверка `SEO/Open Graph` и canonical для `home-page`, `page` и хотя бы одной detail
  content entity;
- проверка наличия `noindex` на preview-страницах;
- проверка генерации `sitemap`;
- проверка сценария `webhook -> rebuild`;
- проверка отправки `lead-submission` и `vacancy-application` с server-side валидацией,
  `consent` и `honeypot`.

#### Обязательные метрики и пороги

- `accessibility`: зафиксировать результат для `/ru/` и для одной CMS-страницы `page`;
  целевой порог для дипломной фиксации: не ниже `90` по Lighthouse.
- `SEO`: зафиксировать результат для `/ru/` и для одной CMS-страницы `page`;
  целевой порог для дипломной фиксации: не ниже `90` по Lighthouse.
- `performance`: результат должен быть зафиксирован как доказательная метрика, но без
  жесткого дипломного порога pass/fail.
- `publication`: rebuild после публикации должен быть подтвержден как отдельный факт, а не
  описан декларативно.

#### Уже реализовано

- build targets существуют для обоих приложений;
- `preview`, `sitemap`, формы и базовые security checks по коду уже есть;
- route-level архитектура позволяет снимать `SEO` и `accessibility` метрики со storefront-core.

#### Обязательно реализовать

- воспроизводимую тестовую матрицу и результаты проверок;
- доказательство сценария `webhook -> rebuild`;
- фиксацию измерений `accessibility`, `SEO` и `performance` в thesis-knowledge / приложениях.

#### Останется допустимым ограничением

- допускается преимущественно ручной, но воспроизводимый тестовый контур;
- полный набор unit/e2e тестов не является обязательным условием итоговой версии ВКР.

## 3. Сводка по статусам

### Уже реализовано

- `pages`, `Dynamic Zone` и page builder для `home-page/page`;
- storefront-core `ru/en` для `global`, `home-page`, `page`;
- locale-prefixed public routes `ru/en` для `articles` и `projects`;
- `preview mode` для `home-page`, `page`, `article`, `project`, `vacancy`;
- CMS-managed `SEO/Open Graph` для `home-page`, `page` и detail entities
  `article/project/vacancy`;
- `sitemap` на стороне `Astro`;
- versioned `webhook -> rebuild` contour;
- versioned `Docker`-контур для `apps/cms`;
- маркетинговая lead form и форма отклика на вакансию с `consent` и `honeypot`;
- `Vercel` adapter и environment contract для `SITE_URL`, `PUBLIC_URL`, `IS_PROXIED`,
  `PREVIEW_SECRET`.

### Обязательно реализовать

- формальную матрицу `roles/permissions`;
- воспроизводимую матрицу проверок и набор итоговых метрик.

### Останется допустимым ограничением даже в финальной версии

- locale-prefixed production routes ограничены storefront-core плюс `articles/projects`,
  а карьерный модуль `vacancies` остается отдельным ограничением;
- отдельный CMS-managed `SEO` для section list pages не обязателен и может оставаться
  route-owned;
- тестовый контур может остаться в основном ручным;
- публикация может оставаться rebuild-based без real-time обновлений;
- формы могут оставаться без `rate limit`, CRM-интеграции и email automation;
- в объем не входят `e-commerce`, личные кабинеты, сложные согласовательные workflow и
  real-time совместное редактирование.
