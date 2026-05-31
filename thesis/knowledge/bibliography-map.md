# Bibliography Map

Дата актуализации: `2026-05-24`.

## Назначение

Документ фиксирует рабочую карту библиографии для ВКР по теме
`Разработка системы управления контентом в сфере маркетинга на базе Strapi и Astro`.

Его задача:

- собрать тематическое ядро литературы, а не случайный набор ссылок;
- показать, зачем нужен каждый источник и в какую часть диплома он лучше встраивается;
- отделить обязательные академические публикации от supporting sources и официальной документации;
- зафиксировать, что уже скачано локально, а что сохранено как metadata или web snapshot.

Все ключи библиографии уже заведены в [references.bib](../references.bib).
Важно: в PDF попадают только те записи, на которые есть ссылки в тексте.
На текущий момент тематические ссылки уже встроены в
[content/02-chapter-1.tex](../content/02-chapter-1.tex) и
[content/03-chapter-2.tex](../content/03-chapter-2.tex).

Статус фактической доступности содержания вынесен отдельно в
[bibliography-fulltext-status.md](./bibliography-fulltext-status.md).

## Принципы отбора

1. Основу библиографии должны составлять источники, которые работают на тему `CMS-first` платформы: `headless CMS`, API-driven контент, мультиязычность, публикация, `SEO`, безопасность и deployment.
2. Минимум две статьи от издательств уровня `Springer`, `IEEE`, `Elsevier` должен быть выполнен не формально, а содержательно.
3. Официальные документы (`Strapi`, `Astro`, `Nx`, `Docker`, `W3C`, `Google Search Central`) используются для описания фактических возможностей стека и стандартов, а не вместо научной литературы.
4. `Sci-Hub` и `ResearchGate` допустимы как поисковый или access-инструмент, но не как источник для библиографической записи. В списке литературы должен стоять DOI, официальный landing page издателя или institutional repository.

## Минимум по publisher-level статьям уже закрыт

Для формального и содержательного выполнения требования по статьям уровня `Springer / IEEE / Elsevier` уже достаточно следующего набора:

- `laleci2010semantic-backend` — Elsevier, архитектура backend для `CMS`.
- `bandirmali2018mtcmf` — Elsevier, автоматизация и framework-подход к генерации сайтов.
- `gracia2012multilingual-web-data` — Elsevier, мультиязычный web-контур и данные.
- `cigoj2019wcms-vulnerability` — IEEE Access, безопасность `WCMS`.
- `trias2012cms-model-driven` — IEEE conference paper, model-driven разработка `CMS`-приложений.

Даже двух первых источников уже достаточно для выполнения минимума, но для самой ВКР сильнее выглядит связка `Elsevier + IEEE + multilingual + security`.

## Рекомендуемое соотношение итоговой литературы

Для этой темы разумный рабочий объем:

- `18--25` источников всего;
- `5--7` академических статей или conference papers;
- `4--6` открытых thesis / dissertation / research works по близкой теме;
- `6--8` официальных документов и стандартов;
- `1--3` русскоязычных ВКР или тезисов как supporting layer по структуре и предметной области.

## Ядро тематической библиографии

### 1. Академические статьи и conference papers

| Key | Уровень | Почему использовать | Куда встраивать | Внешняя ссылка | Локальная копия |
|---|---|---|---|---|---|
| `laleci2010semantic-backend` | Elsevier journal article | Дает академическую опору для тезиса о независимой контентной модели и backend-ядре `CMS`. | Глава 1: headless/API-first логика, архитектурные преимущества. | [DOI](https://doi.org/10.1016/j.knosys.2010.05.008) | [HTML abstract snapshot](../../research/reference-theses/metadata/articles/laleci2010semantic-backend.html), [CSL JSON](../../research/reference-theses/metadata/articles/laleci2010semantic-backend.csl.json), [BibTeX](../../research/reference-theses/metadata/articles/laleci2010semantic-backend.bib) |
| `bandirmali2018mtcmf` | Elsevier journal article | Полезна для разговора о framework-подходе, автоматизации и генерации web-сайтов из контентной модели. | Глава 1: ограничения и эволюция традиционных `CMS`. | [DOI](https://doi.org/10.1016/j.csi.2017.12.002) | [HTML abstract snapshot](../../research/reference-theses/metadata/articles/bandirmali2018mtcmf.html), [CSL JSON](../../research/reference-theses/metadata/articles/bandirmali2018mtcmf.csl.json), [BibTeX](../../research/reference-theses/metadata/articles/bandirmali2018mtcmf.bib) |
| `oleary2008multilingual-kms` | Elsevier journal article | Нужна как теоретическая опора для мультиязычного управления контентом и знаниями в одной системе. | Глава 1: требования к multilingual content. | [DOI](https://doi.org/10.1016/j.dss.2007.07.007) | [PDF](../../research/reference-theses/downloads/articles/oleary2008multilingual-kms.pdf), [CSL JSON](../../research/reference-theses/metadata/articles/oleary2008multilingual-kms.csl.json), [BibTeX](../../research/reference-theses/metadata/articles/oleary2008multilingual-kms.bib) |
| `gracia2012multilingual-web-data` | Elsevier journal article | Хорошо поддерживает тезис, что мультиязычность затрагивает не только тексты, но и маршруты, данные, metadata и публикацию. | Глава 1 и 2: `ru/en`, route contour, metadata. | [DOI](https://doi.org/10.1016/j.websem.2011.09.001) | [PDF](../../research/reference-theses/downloads/articles/gracia2012multilingual-web-data.pdf), [CSL JSON](../../research/reference-theses/metadata/articles/gracia2012multilingual-web-data.csl.json), [BibTeX](../../research/reference-theses/metadata/articles/gracia2012multilingual-web-data.bib) |
| `cigoj2019wcms-vulnerability` | IEEE Access | Нужна для раздела про риски `WCMS`, ограничение публичной поверхности и security базового уровня. | Глава 2: preview, published-only API, минимизация attack surface. | [DOI](https://doi.org/10.1109/ACCESS.2019.2957573) | [CSL JSON](../../research/reference-theses/metadata/articles/cigoj2019wcms-vulnerability.csl.json), [BibTeX](../../research/reference-theses/metadata/articles/cigoj2019wcms-vulnerability.bib) |
| `trias2012cms-model-driven` | IEEE conference paper | Поддерживает разговор о model-driven подходе к `CMS`-приложениям и разделении модели/представления. | Глава 1: теоретическая аргументация выбора архитектуры. | [DOI](https://doi.org/10.1109/RCIS.2012.6240465) | [CSL JSON](../../research/reference-theses/metadata/articles/trias2012cms-model-driven.csl.json), [BibTeX](../../research/reference-theses/metadata/articles/trias2012cms-model-driven.bib) |

### 1a. Дополнительные open-access статьи для содержательного слоя

Эти источники особенно полезны там, где exact publisher-level статья есть в библиографии, но ее полный текст недоступен локально или блокируется.

| Key | Уровень | Почему использовать | Куда встраивать | Внешняя ссылка | Локальная копия |
|---|---|---|---|---|---|
| `priefer2021cms-mdd-domain` | Springer open-access journal article | Современная и сильная опора по `MDD` в домене `CMS`: сценарии разработки расширений, миграции и эмпирическая оценка выигрыша по качеству и производительности. | Глава 1: современное состояние `CMS + model-driven`; Глава 2: аргументация разделения моделей и platform-specific реализации. | [Springer](https://link.springer.com/article/10.1007/s10270-021-00872-3) | [HTML full-text snapshot](../../research/reference-theses/downloads/articles/priefer2021-applying-mdd-cms-domain.html) |
| `gkantouna2019cms-oriented-modeling` | SCITEPRESS open-access conference paper | Дает теоретическую рамку `CMS-oriented modeling languages` и прямо объясняет, почему классические `MDWE`-подходы не покрывают специфику `CMS`. | Глава 1: why CMS need a separate modeling layer; Глава 2: объяснение структуры данных и reusable blocks. | [PDF](https://www.scitepress.org/PublishedPapers/2019/83631/83631.pdf) | [PDF](../../research/reference-theses/downloads/articles/gkantouna2019-cms-oriented-modeling-languages.pdf) |
| `filipe2016xis-cms` | SCITEPRESS open-access conference paper | Полезен для разговора о platform-independent modules, separation of content/presentation и разработке расширяемых модулей поверх `CMS`. | Глава 1: архитектурная теория; Глава 2: модель модулей и reusable section logic. | [PDF](https://www.scitepress.org/Papers/2016/57458/57458.pdf) | [PDF](../../research/reference-theses/downloads/articles/filipe2016-xis-cms.pdf) |

### 2. Open-access thesis и research works по теме

| Key | Тип | Почему использовать | Куда встраивать | Внешняя ссылка | Локальная копия |
|---|---|---|---|---|---|
| `santahuhta2022headless-cms` | bachelor thesis | Один из лучших open-access источников по сравнению `headless CMS` и традиционного подхода. | Глава 1: сравнительный анализ подходов. | [LUT repository](https://lutpub.lut.fi/handle/10024/163897) | [PDF](../../research/reference-theses/downloads/lut-evaluating-headless-cms.pdf) |
| `tanner2020swiss-hema` | bachelor thesis | Практический кейс `Strapi + frontend + multilingual website`. Близок к вашей прикладной постановке. | Глава 1 и 2: прикладной аналог, editorial flow. | [Theseus](https://www.theseus.fi/handle/10024/340133) | [PDF](../../research/reference-theses/downloads/theseus-swiss-hema-headless-cms-react.pdf) |
| `matjuhhin2026api-driven-cms` | bachelor thesis | Очень сильный современный источник по структуре `API-driven CMS`: требования, дизайн, реализация, тестирование. | Глава 1: аналитика; Глава 2: архитектурная логика изложения. | [Theseus](https://www.theseus.fi/handle/10024/916906) | [PDF](../../research/reference-theses/downloads/theseus-api-driven-cms.pdf) |
| `holcik2025headless-cloud` | bachelor thesis | Полезен для cloud/deployment-части, portability и production contour `headless CMS`. | Глава 2: deployment, cloud-ready architecture. | [BUT repository](https://www.vut.cz/en/students/final-thesis/detail/166024?zp_id=166024) | [PDF](../../research/reference-theses/downloads/vut-headless-cms-in-cloud.pdf) |
| `solovev2023multilingual-web-app` | bachelor thesis | Полезный русскоязычный пример полноценной ВКР по мультиязычному web-приложению. | Глава 1: multilingual requirements; как структурный референс текста. | [TPU repository](https://earchive.tpu.ru/jspui/handle/11683/76463) | [PDF](../../research/reference-theses/downloads/tpu-multilingual-news-web-application.pdf) |

### 3. Русскоязычный supporting layer

Эти источники не обязаны быть центром итогового списка, но они полезны как supporting layer по предметной области, структуре ВКР, маркетинговому контексту и русскоязычной аргументации.

| Key | Тип | Почему использовать | Куда встраивать | Внешняя ссылка | Локальная копия |
|---|---|---|---|---|---|
| `voroniuk2020retail-cms-needs` | тезисы доклада | Хорош для аргумента про бизнес-потребности `CMS` в маркетинге и retail-контексте: роли, версии, интеграции, публикации, омниканальность. | Введение и Глава 1: прикладная постановка задачи. | [ITMO](https://kmu.itmo.ru/file/download/application/11149) | [PDF](../../research/reference-theses/downloads/itmo-voroniuk-retail-cms-needs.pdf) |
| `mashina2022centralized-cms-knowledge` | тезисы доклада | Полезен для тезиса о централизованном контентном ядре и накоплении знаний, но не стоит делать его центральным источником. | Глава 1: централизованное хранение и управление контентом. | [ITMO](https://kmu.itmo.ru/file/download/application/24737) | [PDF](../../research/reference-theses/downloads/itmo-mashina-centralized-cms-knowledge.pdf) |
| `shumikhina2019online-media-portfolio` | bachelor thesis | Полезен по связке контентной платформы, требований и проектирования сайта с редакционным контуром. | Глава 1: прикладные аналоги; Глава 2: структура требований. | [TPU repository](https://earchive.tpu.ru/jspui/handle/11683/55021) | [PDF](../../research/reference-theses/downloads/tpu-online-media-portfolio.pdf) |
| `kuznetsov2017cms-sto` | bachelor thesis | Классический русскоязычный референс по проектированию собственной `CMS` для сайта. | Глава 1: анализ классических `CMS`; Глава 2: модель CMS-ядра. | [SPbPU](https://elib.spbstu.ru/dl/2/v17-3821.pdf/info) | [HTML card](../../research/reference-theses/metadata/spbpu-cms-sto-info.html) |
| `mikhailova2016content-navigation` | bachelor thesis | Полезен для информационной архитектуры, навигации и структурирования контента в корпоративном сайте. | Глава 1 и 2: IA, меню, структура разделов. | [SPbPU](https://elib.spbstu.ru/dl/2/v16-1111.pdf/info) | [HTML card](../../research/reference-theses/metadata/spbpu-navigation-content-info.html) |
| `torgunakova2023marketing-website` | journal article | Сильный русскоязычный источник именно по роли сайта в комплексе маркетинговых коммуникаций, юзабилити и конверсии. | Введение и Глава 1: маркетинговый контекст и требования к сайту. | [CyberLeninka](https://cyberleninka.ru/article/n/veb-sayt-organizatsii-kak-instrument-realizatsii-kompleksa-marketingovyh-kommunikatsiy) | [PDF](../../research/reference-theses/downloads/articles/ru-torgunakova2023-marketing-website.pdf) |
| `belyaev2009website-navigation` | journal article | Полезен для аргументации информационной архитектуры и роли устойчивой навигации в структуре сайта. | Глава 1 и 2: структура сайта, меню, пользовательские сценарии. | [CyberLeninka](https://cyberleninka.ru/article/n/navigatsiya-kak-klyuchevoy-komponent-vizualnoy-organizatsii-veb-sayta) | [PDF](../../research/reference-theses/downloads/articles/ru-belyaev2009-website-navigation.pdf) |
| `yesikov2013cms-comparative-analysis` | journal article | Полезен как русскоязычный supporting source для блока о классических и коробочных `CMS`, их классификации и критериях выбора. | Глава 1: традиционные `CMS`, ограничения и сравнение. | [CyberLeninka](https://cyberleninka.ru/article/n/sravnitelnyy-analiz-sistem-upravleniya-kontentom-sontent-management-system-cms) | [PDF](../../research/reference-theses/downloads/articles/ru-yesikov2013-cms-comparative-analysis.pdf) |
| `gorlo2010secure-cms` | journal article | Дает русскоязычную опору для разговора о защите `CMS`, аутентификации, разграничении прав и рисках стандартных движков. | Глава 2: базовые требования безопасности и доступа. | [CyberLeninka](https://cyberleninka.ru/article/n/podhody-k-postroeniyu-zaschischennoy-sistemy-upravleniya-kontentom) | [PDF](../../research/reference-theses/downloads/articles/ru-gorlo2010-secure-cms.pdf) |

## Официальные документы и стандарты

### Что это дает

Эти источники нужны не для замены научной литературы, а для аккуратного описания:

- фактических возможностей `Strapi`, `Astro`, `Nx`, `Docker`;
- правил для multilingual routing и `SEO`;
- стандарта доступности и базового web protocol layer.

### Набор

| Key | Почему использовать | Куда встраивать | Внешняя ссылка | Локальная копия |
|---|---|---|---|---|
| `strapi-cms-docs` | Фиксирует реальные возможности `Strapi 5`: content types, roles, draft/publish, preview, i18n. | Глава 1 и 2: описание стека. | [Strapi docs](https://docs.strapi.io/cms/intro) | [HTML snapshot](../../research/reference-theses/metadata/web/strapi-cms-docs.html) |
| `astro-on-demand` | Разводит prerender и on-demand rendering. | Глава 1: выбор `Astro` и статической публикации. | [Astro docs](https://docs.astro.build/en/guides/on-demand-rendering/) | [HTML snapshot](../../research/reference-theses/metadata/web/astro-on-demand.html) |
| `astro-strapi-guide` | Подтверждает практическую связку `Strapi + Astro`, включая rebuild flow. | Глава 1: практическая реализуемость связки. | [Astro docs](https://docs.astro.build/ru/guides/cms/strapi/) | [HTML snapshot](../../research/reference-theses/metadata/web/astro-strapi-guide.html) |
| `nx-monorepos` | Нужен для аргументации монорепозитория. | Глава 1 и 2: структура разработки. | [Nx docs](https://nx.dev/docs/concepts/decisions/why-monorepos) | [HTML snapshot](../../research/reference-theses/metadata/web/nx-monorepos.html) |
| `astro-i18n-routing` | Подтверждает i18n route-модель `Astro`. | Глава 2: locale-prefixed routes. | [Astro docs](https://docs.astro.build/en/guides/internationalization/) | [HTML snapshot](../../research/reference-theses/metadata/web/astro-i18n-routing.html) |
| `docker-overview` | Нужен как базовый официальный источник про контейнеризацию deployment bundle. | Глава 2: `Docker`-контур `CMS`. | [Docker docs](https://docs.docker.com/engine/docker-overview/) | [HTML snapshot](../../research/reference-theses/metadata/web/docker-overview.html) |
| `google-international-sites` | Полезен для корректного разговора про локализованные версии страниц и индексирование. | Глава 2: multilingual `SEO` и canonical logic. | [Google Search Central](https://developers.google.com/search/docs/specialty/international) | [HTML snapshot](../../research/reference-theses/metadata/web/google-international-sites.html) |
| `sitemaps-protocol` | Фиксирует протокол `sitemap`. | Глава 2: генерация карты сайта. | [sitemaps.org](https://www.sitemaps.org/protocol.html) | [HTML snapshot](../../research/reference-theses/metadata/web/sitemaps-protocol.html) |
| `wcag22` | Нормативная основа для accessibility-требований и проверок. | Глава 1: нефункциональные требования; Глава 2: тестирование. | [W3C](https://www.w3.org/TR/WCAG22/) | [HTML snapshot](../../research/reference-theses/metadata/web/wcag22.html) |

## Что уже скачано локально

### Полные PDF

Уже лежат в `research/reference-theses/downloads/`:

- `lut-evaluating-headless-cms.pdf`
- `theseus-swiss-hema-headless-cms-react.pdf`
- `theseus-api-driven-cms.pdf`
- `vut-headless-cms-in-cloud.pdf`
- `tpu-multilingual-news-web-application.pdf`
- `tpu-online-media-portfolio.pdf`
- `itmo-voroniuk-retail-cms-needs.pdf`
- `itmo-mashina-centralized-cms-knowledge.pdf`
- `rgpu-zhukov-employment-system.pdf`
- `rgpu-vekhova-huff-gis-dss.pdf`

Также в `research/reference-theses/downloads/articles/` уже лежат академические full text:

- `oleary2008multilingual-kms.pdf`
- `gracia2012multilingual-web-data.pdf`
- `gkantouna2019-cms-oriented-modeling-languages.pdf`
- `filipe2016-xis-cms.pdf`
- `ru-torgunakova2023-marketing-website.pdf`
- `ru-belyaev2009-website-navigation.pdf`
- `ru-yesikov2013-cms-comparative-analysis.pdf`
- `ru-gorlo2010-secure-cms.pdf`

И один полноценный open-access HTML full text:

- `priefer2021-applying-mdd-cms-domain.html`

### Metadata по publisher-level статьям

Сохранены в `research/reference-theses/metadata/articles/` как:

- `*.csl.json`
- `*.bib`

Для части закрытых публикаций также сохранены официальные abstract/landing snapshots:

- `laleci2010semantic-backend.html`
- `bandirmali2018mtcmf.html`

Это полезно как локальный citation cache даже тогда, когда полный PDF статьи недоступен напрямую.

### Web snapshots

Официальные документы сохранены в `research/reference-theses/metadata/web/` как `.html` snapshots.

## Что не скачано как полный PDF

Exact full text по части статей `Elsevier` и `IEEE` все еще не скачан, если он не был явно открыт у издателя без institutional access или не нашелся в институциональном репозитории.
Поэтому для таких источников сохранены:

- DOI;
- локальный `BibTeX`;
- локальный `CSL JSON`;
- при возможности официальный abstract page.

Это корректнее, чем тащить в рабочий архив неофициальные или сомнительные копии.

## Как использовать этот набор в самом дипломе

### Аналитическая глава

- для сравнения традиционного `CMS` и `headless CMS`: `santahuhta2022headless-cms`, `laleci2010semantic-backend`, `trias2012cms-model-driven`, `bandirmali2018mtcmf`, `priefer2021cms-mdd-domain`, `gkantouna2019cms-oriented-modeling`, `filipe2016xis-cms`;
- для multilingual-контуров: `oleary2008multilingual-kms`, `gracia2012multilingual-web-data`, `solovev2023multilingual-web-app`;
- для русскоязычной прикладной и предметной рамки: `voroniuk2020retail-cms-needs`, `shumikhina2019online-media-portfolio`, `torgunakova2023marketing-website`, `belyaev2009website-navigation`, `yesikov2013cms-comparative-analysis`;
- для обоснования `Strapi`, `Astro`, `Nx`: `strapi-cms-docs`, `astro-on-demand`, `astro-strapi-guide`, `nx-monorepos`.

### Проектная глава

- для `i18n`, routes и `SEO`: `astro-i18n-routing`, `google-international-sites`, `sitemaps-protocol`;
- для deployment: `docker-overview`, `holcik2025headless-cloud`;
- для security: `cigoj2019wcms-vulnerability`, `gorlo2010secure-cms`;
- для accessibility и тестирования: `wcag22`.

## Практический вывод

Для вашей темы самый сильный список литературы выглядит не как «много случайных web-ссылок», а как комбинация из:

1. нескольких академических статей `Elsevier / IEEE`;
2. нескольких сильных open-access thesis по `headless CMS` и multilingual web;
3. официальных документов по фактически используемому стеку.

Именно такой набор лучше всего защищает диплом и по содержанию, и по формальному требованию к качеству источников.
