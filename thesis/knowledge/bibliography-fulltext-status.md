# Bibliography Fulltext Status

Дата актуализации: `2026-05-24`.

## Назначение

Документ фиксирует не оформление библиографии, а статус фактической доступности содержания источников.

Это нужно, чтобы различать:

- источники, которые уже можно содержательно использовать;
- источники, по которым пока есть только abstract или metadata;
- источники, которые формально есть в `references.bib`, но их полный текст еще не получен локально.

Основная карта литературы остается в
[bibliography-map.md](./bibliography-map.md).

## Статусы

- `full-text-local` — полный текст скачан в проект, можно читать и содержательно использовать.
- `full-text-snapshot` — полный текст доступен как локальный HTML snapshot или аналогичный open web source.
- `abstract-snapshot` — локально сохранен официальный abstract/landing snapshot с metadata и summary, но не полный текст.
- `abstract-only` — есть abstract, highlights или достаточно подробная repository card, но не полный текст.
- `open-access-blocked` — есть признаки легального open access, но текущая среда не отдала файл напрямую.
- `metadata-only` — есть только `BibTeX` / `CSL JSON` / DOI-landing.

## Текущий статус по ядру библиографии

### Академические статьи и conference papers

| Key | Статус | Что есть локально | Комментарий |
|---|---|---|---|
| `laleci2010semantic-backend` | `abstract-snapshot` | [HTML](../../research/reference-theses/metadata/articles/laleci2010semantic-backend.html), [CSL JSON](../../research/reference-theses/metadata/articles/laleci2010semantic-backend.csl.json), [BibTeX](../../research/reference-theses/metadata/articles/laleci2010semantic-backend.bib) | Локально сохранен официальный repository snapshot с подробным abstract и metadata, но полнотекстовый PDF локально не получен. |
| `bandirmali2018mtcmf` | `abstract-snapshot` | [HTML](../../research/reference-theses/metadata/articles/bandirmali2018mtcmf.html), [CSL JSON](../../research/reference-theses/metadata/articles/bandirmali2018mtcmf.csl.json), [BibTeX](../../research/reference-theses/metadata/articles/bandirmali2018mtcmf.bib) | Через ScienceDirect локально сохранены abstract/highlights page и metadata, но полный текст не получен. |
| `oleary2008multilingual-kms` | `full-text-local` | [PDF](../../research/reference-theses/downloads/articles/oleary2008multilingual-kms.pdf) | Найден легальный open-access PDF на сервере USC. Можно использовать содержательно после чтения. |
| `gracia2012multilingual-web-data` | `full-text-local` | [PDF](../../research/reference-theses/downloads/articles/gracia2012multilingual-web-data.pdf) | Найден легальный open-access PDF в репозиторном контуре `noah.nrw` / Bielefeld. |
| `cigoj2019wcms-vulnerability` | `open-access-blocked` | [CSL JSON](../../research/reference-theses/metadata/articles/cigoj2019wcms-vulnerability.csl.json), [BibTeX](../../research/reference-theses/metadata/articles/cigoj2019wcms-vulnerability.bib), [IEEE landing](https://ieeexplore.ieee.org/document/8922605) | OpenAlex показывает `gold OA` и прямой PDF URL IEEE, но из текущей среды загрузка блокируется ответом `418`. Источник вероятно легально открыт, но не скачан локально. |
| `trias2012cms-model-driven` | `metadata-only` | [CSL JSON](../../research/reference-theses/metadata/articles/trias2012cms-model-driven.csl.json), [BibTeX](../../research/reference-theses/metadata/articles/trias2012cms-model-driven.bib) | Для точной публикации `RCIS 2012` полный текст локально не найден. В web-поиске есть related/open papers того же направления, но они не должны подменять этот источник. |

### Дополнительные open-access статьи для усиления теоретического слоя

| Key | Статус | Что есть локально | Комментарий |
|---|---|---|---|
| `priefer2021cms-mdd-domain` | `full-text-snapshot` | [HTML](../../research/reference-theses/downloads/articles/priefer2021-applying-mdd-cms-domain.html) | Полный open-access HTML-текст статьи Springer сохранен локально. Это один из самых сильных современных источников по `MDD` в домене `CMS`. |
| `gkantouna2019cms-oriented-modeling` | `full-text-local` | [PDF](../../research/reference-theses/downloads/articles/gkantouna2019-cms-oriented-modeling-languages.pdf) | Open-access conference paper по `CMS-oriented modeling languages`. Хорошо закрывает теоретическую дыру, если exact `IEEE`-публикация недоступна. |
| `filipe2016xis-cms` | `full-text-local` | [PDF](../../research/reference-theses/downloads/articles/filipe2016-xis-cms.pdf) | Open-access conference paper по platform-independent `CMS` modules и model-driven approach. Полезен как содержательное усиление архитектурной части. |

### Thesis и open-access research works

| Key | Статус | Локальный файл |
|---|---|---|
| `santahuhta2022headless-cms` | `full-text-local` | [PDF](../../research/reference-theses/downloads/lut-evaluating-headless-cms.pdf) |
| `tanner2020swiss-hema` | `full-text-local` | [PDF](../../research/reference-theses/downloads/theseus-swiss-hema-headless-cms-react.pdf) |
| `matjuhhin2026api-driven-cms` | `full-text-local` | [PDF](../../research/reference-theses/downloads/theseus-api-driven-cms.pdf) |
| `holcik2025headless-cloud` | `full-text-local` | [PDF](../../research/reference-theses/downloads/vut-headless-cms-in-cloud.pdf) |
| `solovev2023multilingual-web-app` | `full-text-local` | [PDF](../../research/reference-theses/downloads/tpu-multilingual-news-web-application.pdf) |

### Русскоязычный supporting layer

| Key | Статус | Что есть локально | Комментарий |
|---|---|---|---|
| `voroniuk2020retail-cms-needs` | `full-text-local` | [PDF](../../research/reference-theses/downloads/itmo-voroniuk-retail-cms-needs.pdf) | Полезен для постановки бизнес-требований к `CMS` в маркетинговом и retail-контексте. |
| `mashina2022centralized-cms-knowledge` | `full-text-local` | [PDF](../../research/reference-theses/downloads/itmo-mashina-centralized-cms-knowledge.pdf) | Полезен для тезиса о централизованном контентном ядре и knowledge-management слое. |
| `shumikhina2019online-media-portfolio` | `full-text-local` | [PDF](../../research/reference-theses/downloads/tpu-online-media-portfolio.pdf) | Прикладной русскоязычный аналог контентной платформы с редакционным контуром. |
| `kuznetsov2017cms-sto` | `metadata-only` | [HTML](../../research/reference-theses/metadata/spbpu-cms-sto-info.html) | Есть стабильная карточка СПбПУ, но не локальный full PDF. |
| `mikhailova2016content-navigation` | `metadata-only` | [HTML](../../research/reference-theses/metadata/spbpu-navigation-content-info.html) | Полезен для IA/navigation, но локально сохранена только карточка. |
| `torgunakova2023marketing-website` | `full-text-local` | [PDF](../../research/reference-theses/downloads/articles/ru-torgunakova2023-marketing-website.pdf) | Сильный русскоязычный источник по роли сайта в маркетинговых коммуникациях, юзабилити и конверсии. |
| `belyaev2009website-navigation` | `full-text-local` | [PDF](../../research/reference-theses/downloads/articles/ru-belyaev2009-website-navigation.pdf) | Полезен для навигации и информационной архитектуры веб-сайта. |
| `yesikov2013cms-comparative-analysis` | `full-text-local` | [PDF](../../research/reference-theses/downloads/articles/ru-yesikov2013-cms-comparative-analysis.pdf) | Русскоязычный supporting source по сравнению классических `CMS`. |
| `gorlo2010secure-cms` | `full-text-local` | [PDF](../../research/reference-theses/downloads/articles/ru-gorlo2010-secure-cms.pdf) | Полезен для базового блока про security, access control и риски типовых движков. |

### Официальные документы и стандарты

| Key | Статус | Локальный файл |
|---|---|---|
| `strapi-cms-docs` | `full-text-snapshot` | [HTML](../../research/reference-theses/metadata/web/strapi-cms-docs.html) |
| `astro-on-demand` | `full-text-snapshot` | [HTML](../../research/reference-theses/metadata/web/astro-on-demand.html) |
| `astro-strapi-guide` | `full-text-snapshot` | [HTML](../../research/reference-theses/metadata/web/astro-strapi-guide.html) |
| `nx-monorepos` | `full-text-snapshot` | [HTML](../../research/reference-theses/metadata/web/nx-monorepos.html) |
| `astro-i18n-routing` | `full-text-snapshot` | [HTML](../../research/reference-theses/metadata/web/astro-i18n-routing.html) |
| `vercel-astro-docs` | `full-text-snapshot` | [HTML](../../research/reference-theses/metadata/web/vercel-astro-docs.html) |
| `docker-overview` | `full-text-snapshot` | [HTML](../../research/reference-theses/metadata/web/docker-overview.html) |
| `google-international-sites` | `full-text-snapshot` | [HTML](../../research/reference-theses/metadata/web/google-international-sites.html) |
| `sitemaps-protocol` | `full-text-snapshot` | [HTML](../../research/reference-theses/metadata/web/sitemaps-protocol.html) |
| `wcag22` | `full-text-snapshot` | [HTML](../../research/reference-theses/metadata/web/wcag22.html) |

## Что удалось добавить в проект на этом проходе

Добавлены два полнотекстовых журнальных PDF:

- [oleary2008multilingual-kms.pdf](../../research/reference-theses/downloads/articles/oleary2008multilingual-kms.pdf)
- [gracia2012multilingual-web-data.pdf](../../research/reference-theses/downloads/articles/gracia2012multilingual-web-data.pdf)

На текущем проходе дополнительно добавлены:

- [gkantouna2019-cms-oriented-modeling-languages.pdf](../../research/reference-theses/downloads/articles/gkantouna2019-cms-oriented-modeling-languages.pdf)
- [filipe2016-xis-cms.pdf](../../research/reference-theses/downloads/articles/filipe2016-xis-cms.pdf)
- [priefer2021-applying-mdd-cms-domain.html](../../research/reference-theses/downloads/articles/priefer2021-applying-mdd-cms-domain.html)
- [ru-torgunakova2023-marketing-website.pdf](../../research/reference-theses/downloads/articles/ru-torgunakova2023-marketing-website.pdf)
- [ru-belyaev2009-website-navigation.pdf](../../research/reference-theses/downloads/articles/ru-belyaev2009-website-navigation.pdf)
- [ru-yesikov2013-cms-comparative-analysis.pdf](../../research/reference-theses/downloads/articles/ru-yesikov2013-cms-comparative-analysis.pdf)
- [ru-gorlo2010-secure-cms.pdf](../../research/reference-theses/downloads/articles/ru-gorlo2010-secure-cms.pdf)

И официальные abstract snapshots:

- [laleci2010semantic-backend.html](../../research/reference-theses/metadata/articles/laleci2010semantic-backend.html)
- [bandirmali2018mtcmf.html](../../research/reference-theses/metadata/articles/bandirmali2018mtcmf.html)

Для остальных журнальных публикаций дополнительно сохранены:

- `BibTeX` записи;
- `CSL JSON` карточки;
- DOI или publisher landing pages.

## Как безопасно использовать эти источники в тексте ВКР

### Уже можно использовать содержательно

- `oleary2008multilingual-kms`
- `gracia2012multilingual-web-data`
- `priefer2021cms-mdd-domain`
- `gkantouna2019cms-oriented-modeling`
- `filipe2016xis-cms`
- все thesis из open-access блока
- официальные web snapshots по стеку и стандартам

### Пока лучше использовать ограниченно

- `laleci2010semantic-backend`
- `bandirmali2018mtcmf`

По ним безопасно ссылаться на:

- тему работы;
- ключевую постановку проблемы;
- abstract-level тезисы;
- metadata и publisher-level идентификацию.

Но не стоит пересказывать детали эксперимента, архитектуры или выводов, пока полный текст не прочитан.

### Пока не стоит делать сильные содержательные утверждения

- `cigoj2019wcms-vulnerability`
- `trias2012cms-model-driven`

Их лучше использовать либо после получения full text, либо заменить на доступные open-access аналоги с близким смыслом, если нужен именно содержательный разбор.

Для блока про `model-driven CMS` такими безопасными заменами уже являются:

- `priefer2021cms-mdd-domain`
- `gkantouna2019cms-oriented-modeling`
- `filipe2016xis-cms`

## Следующий разумный шаг

Если цель именно содержательно использовать литературу, то дальше нужен не только архив файлов, но и краткие notes по каждому источнику:

- что утверждает автор;
- какие тезисы безопасно брать в диплом;
- какие страницы важны;
- где источник лучше цитировать: Глава 1 или Глава 2.

Под такой слой уже подготовлена папка:
[thesis/knowledge/bibliography-notes](./bibliography-notes/).
