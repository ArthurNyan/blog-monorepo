# Open-Access CMS Model-Driven Notes

Дата актуализации: `2026-05-24`.

Документ фиксирует краткие безопасные тезисы по open-access источникам, которые уже доступны локально и могут использоваться в содержательной части ВКР.

## `priefer2021cms-mdd-domain`

- Статус: `full-text-snapshot`
- Локальный файл:
  [priefer2021-applying-mdd-cms-domain.html](../../../research/reference-theses/downloads/articles/priefer2021-applying-mdd-cms-domain.html)
- Где использовать:
  Глава 1 для современного состояния `MDD` в домене `CMS`, Глава 2 для аргументации разделения моделей и platform-specific реализации.
- Безопасные тезисы:
  - разработка расширений для `CMS` требует специфических технических знаний и часто связана со сложной кодовой структурой;
  - авторы рассматривают не только создание новых расширений, но и миграцию существующих модулей на новую major-версию платформы;
  - в работе представлена инфраструктура `JooMDD` как пример `DSL + generators + reverse engineering` в домене `CMS`;
  - по описанию статьи, эмпирическая часть показывает заметный рост производительности и качества при использовании `MDD` в отдельных сценариях.
- Практический смысл для темы диплома:
  источник полезен, чтобы обосновать ценность явной контентной модели, генерализуемых схем и аккуратного разделения между editorial model и frontend/platform logic.

## `gkantouna2019cms-oriented-modeling`

- Статус: `full-text-local`
- Локальный файл:
  [gkantouna2019-cms-oriented-modeling-languages.pdf](../../../research/reference-theses/downloads/articles/gkantouna2019-cms-oriented-modeling-languages.pdf)
- Где использовать:
  Глава 1 для теоретической постановки задачи по `CMS-oriented modeling`.
- Безопасные тезисы:
  - авторы считают, что классические `MDWE`-подходы плохо покрывают специфику `CMS-based` web applications;
  - в качестве причины называется отсутствие modeling languages, специально ориентированных на development context `CMS`-платформ;
  - предлагается общий framework определения `CMS-oriented modeling languages` через анализ платформы, построение domain model и формальное описание modeling language.
- Практический смысл для темы диплома:
  источник хорошо поддерживает тезис, что при проектировании системы на базе `Strapi` важно думать не только о страницах, но и о типах контента, reusable blocks и правилах их композиции.

## `filipe2016xis-cms`

- Статус: `full-text-local`
- Локальный файл:
  [filipe2016-xis-cms.pdf](../../../research/reference-theses/downloads/articles/filipe2016-xis-cms.pdf)
- Где использовать:
  Глава 1 для model-driven архитектуры поверх `CMS`, Глава 2 для аргументации модульной структуры.
- Безопасные тезисы:
  - `CMS` предоставляет готовую основу для управления структурой, контентом и представлением web applications, но не дает удобной high-level модели данных;
  - разработка custom modules требует CMS-specific технических навыков, что усложняет переносимость и расширяемость решений;
  - подход `XIS-CMS` нацелен на более platform-independent проектирование модулей поверх `CMS`.
- Практический смысл для темы диплома:
  источник полезен для обоснования reusable-модулей и separation between content model, module logic and presentation layer.

## Как использовать вместе

- `priefer2021cms-mdd-domain` — лучший современный источник по практической ценности `MDD` в `CMS`.
- `gkantouna2019cms-oriented-modeling` — лучший источник для постановки теоретической проблемы.
- `filipe2016xis-cms` — лучший источник для разговора о platform-independent modules и структурировании расширяемой `CMS`-архитектуры.

Вместе они закрывают ту часть теоретического слоя, где exact `IEEE`- или `Elsevier`-источник не всегда удается получить в полном тексте локально.
