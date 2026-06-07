# План Усиления Аналитической Главы

Дата фиксации: `2026-06-07`.

## Статус Документа

Этот документ является active working plan для дальнейшего усиления
[thesis/content/02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex)
после уже выполненной structural cleanup-переделки.

В отличие от
[chapter-1-restructure-plan.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/chapter-1-restructure-plan.md),
который теперь играет роль history note по удалению baseline-блока, этот файл задает
следующий рабочий шаг: как сделать аналитическую главу более сильной по аргументации,
формализации и связке с проектной и доказательной частью диплома.

## Назначение

План нужен для того, чтобы усилить аналитическую главу не за счет искусственного
разрастания текста, а за счет более строгой инженерной оптики.

Целевой эффект:

- глава 1 яснее показывает, какие особенности предметной области порождают требования к
  системе;
- сравнение `традиционной CMS` и `headless CMS` становится более формальным и легче
  защищаемым;
- выбор `Strapi`, `Astro` и `Nx + pnpm` подается через критерии выбора, а не только через
  описательные абзацы;
- требования связываются не только с предметной областью, но и с тем, как они будут
  подтверждаться в проектной и testing-части;
- при этом глава не превращается в дубликат главы 2 и не возвращает логику
  “исходного состояния проекта”.

Документ рассчитан на передачу в отдельные agent-треды без контекста текущего обсуждения.
Поэтому ниже зафиксированы и план работ, и обязательный контекст, и подробные промпты для
каждого этапа.

## Зафиксированная Цель Усиления

После доработки аналитическая глава должна:

1. Оставаться publish-ready и авторской по подаче.
2. Сохранять текущую структуру `1.1 -> 1.4 -> выводы`.
3. Лучше показывать причинно-следственную связь:
   `особенности предметной области -> архитектурный подход -> выбор стека -> требования`.
4. Лучше связываться с проектной и доказательной частью через формулы вида
   `требование -> способ реализации -> способ проверки`.
5. Не содержать неподтвержденных эмпирических данных, вымышленных пользователей,
   несуществующих метрик или придуманного внешнего заказчика.

## Базовый Контекст Для Любого Агента

Перед любой работой по усилению главы 1 агент должен обязательно прочитать:

- [thesis/content/02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex)
- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/knowledge/diploma/thesis-brief.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/thesis-brief.md)
- [thesis/knowledge/diploma/thesis-structure.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/thesis-structure.md)
- [thesis/knowledge/diploma/final-thesis-outline.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-thesis-outline.md)
- [thesis/knowledge/diploma/final-scope.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-scope.md)
- [thesis/knowledge/diploma/decision-log.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/decision-log.md)
- [thesis/knowledge/diploma/agent-rules.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/agent-rules.md)
- [thesis/knowledge/diploma/reference-theses-analysis.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/reference-theses-analysis.md)
- [thesis/knowledge/diploma/acceptance-matrix.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/acceptance-matrix.md)
- [thesis/knowledge/diploma/testing-evidence-pack.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-evidence-pack.md)
- [thesis/knowledge/diploma/publication-deployment-contour.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/publication-deployment-contour.md)
- [thesis/knowledge/diploma/security-model.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/security-model.md)
- [thesis/knowledge/diploma/editor-workflow.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/editor-workflow.md)
- [thesis/knowledge/bibliography-map.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/bibliography-map.md)
- [thesis/knowledge/bibliography-fulltext-status.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/bibliography-fulltext-status.md)
- [thesis/references.bib](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/references.bib)

При необходимости сверки с референсной академической подачей дополнительно допустимо
использовать:

- [ИСР 1.3 (1).pdf](/Users/arthur/Downloads/ИСР%201.3%20%281%29.pdf)

## Инженерные Принципы Для Усиления Главы 1

- Не возвращать самостоятельный раздел про “исходное состояние проекта”.
- Не превращать главу 1 в пересказ кода, конфигов или реализации из главы 2.
- Не придумывать интервью, статистику внедрения, пользовательские опросы или полевые
  исследования, если их реально не было.
- Не писать, что глава “слабая”; усиливать ее как уже хорошую основу, которой не хватает
  более формальной аналитической оптики.
- Любые таблицы делать компактными и защищаемыми. Если таблица не помещается в полосу,
  лучше разделить ее на две или преобразовать в лаконичную аналитическую матрицу.
- Любая связка `требование -> проверка` должна опираться на уже существующий evidence
  contour или на явно описываемую проверку в главе 2, а не на вымышленные результаты.
- Если для какого-то тезиса не хватает подтвержденного источника, лучше усилить формулировку
  логически, чем добавлять сомнительную литературу ради объема.

## Рекомендуемый Контур Усиления

### Минимальный Контур

- усилить `1.1` через матрицу `особенность предметной области -> инженерное следствие`;
- усилить `1.4` через матрицу `требование -> источник -> способ проверки`;
- вычистить переходы между подразделами и выводы главы.

### Целевой Контур

- выполнить весь минимальный контур;
- добавить формальное сравнение `традиционная CMS` vs `headless CMS` в `1.2`;
- добавить критерии выбора `Strapi`, `Astro` и `Nx + pnpm` в `1.3`.

### Максимальный Контур

- выполнить целевой контур;
- при необходимости вынести часть трассировки требований в компактное приложение или
  дополнительную knowledge-таблицу, если она делает саму главу перегруженной.

Для publish-ready версии диплома рекомендуется именно `целевой контур`.

## Рекомендуемый Порядок Работ

1. Усилить постановку предметной области и аналитический переход к архитектуре.
2. Формализовать сравнение `традиционная CMS` и `headless CMS`.
3. Усилить критерии выбора `Strapi`, `Astro` и `Nx + pnpm`.
4. Добавить трассировку требований к реализации и проверке.
5. Выполнить редакционную синхронизацию, проверку ссылок и сборку.

Такой порядок позволяет усиливать главу 1 сверху вниз, не размывая ее структуру и не
ломая already-clean publish-ready логику.

## Этапы Работы И Автономные Промпты

### Этап 1. Усилить предметную область и аналитический переход к архитектуре

#### Цель

Сделать начало главы более аналитическим: не только описать маркетинговый сайт как объект
автоматизации, но и формально показать, какие особенности предметной области порождают
архитектурные требования к системе управления контентом.

#### Что должно появиться после этапа

- более сильный вводный абзац главы 1, который подчеркивает аналитическую рамку;
- в разделе `1.1` компактная аналитическая матрица или эквивалентный структурированный
  фрагмент вида `особенность предметной области -> инженерное следствие`;
- более четкий переход от предметной области к выбору подхода управления контентом.

#### Основные файлы

- [thesis/content/02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex)
- [thesis/knowledge/diploma/thesis-structure.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/thesis-structure.md)
- [thesis/knowledge/diploma/final-thesis-outline.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-thesis-outline.md)
- [thesis/knowledge/diploma/editor-workflow.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/editor-workflow.md)
- [thesis/knowledge/diploma/decision-log.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/decision-log.md)

#### Что именно нужно сделать

- проверить, где в текущем тексте `1.1` описания остаются слишком дескриптивными;
- усилить причинно-следственные связи между:
  частыми контентными изменениями,
  независимостью редактора от разработчика,
  мультиязычностью,
  `SEO`-управлением,
  preview-сценарием,
  воспроизводимой публикацией;
- добавить компактную таблицу или матрицу, которая явно показывает инженерные следствия
  этих особенностей;
- завершить `1.1` переходом, из которого естественно следует вопрос выбора модели
  управления контентом.

#### Критерий завершения

- `1.1` читаетcя как постановка инженерной задачи, а не только как описание предметной
  области;
- из текста ясно, почему следующая секция должна сравнивать именно CMS-подходы;
- не появляется нового раздела, не ломается существующая нумерация и не возникает
  дублирования главы 2.

#### Промпт для агента

```text
Работаем в репозитории:
/Users/arthur/Documents/projects/Диплом/app-monorepo

Задача: усилить аналитическую глубину начала первой главы диплома без изменения ее общей
структуры.

Сначала обязательно прочитай:
- thesis/content/02-chapter-1.tex
- thesis/content/03-chapter-2.tex
- thesis/knowledge/diploma/thesis-brief.md
- thesis/knowledge/diploma/thesis-structure.md
- thesis/knowledge/diploma/final-thesis-outline.md
- thesis/knowledge/diploma/final-scope.md
- thesis/knowledge/diploma/decision-log.md
- thesis/knowledge/diploma/agent-rules.md
- thesis/knowledge/diploma/editor-workflow.md
- thesis/knowledge/diploma/reference-theses-analysis.md

Что нужно сделать:
1. Усилить вводный абзац главы 1 так, чтобы он задавал не просто тему, а аналитическую
   рамку: особенности предметной области -> архитектурный выбор -> требования к системе.
2. Переписать при необходимости отдельные абзацы в разделе `1.1`, если они звучат слишком
   описательно и не выводят инженерных последствий.
3. Добавить в `1.1` компактную аналитическую матрицу или таблицу вида
   `особенность предметной области -> инженерное следствие для системы`.
4. Убедиться, что в матрице отражены как минимум:
   - частые изменения контента;
   - необходимость независимого редакторского цикла;
   - мультиязычность;
   - управление SEO и метаданными;
   - preview до публикации;
   - воспроизводимая схема публикации.
5. Завершить раздел `1.1` связкой, из которой естественно следует переход к сравнению
   традиционной CMS и headless CMS.

Ограничения:
- Не возвращать baseline-блок или раздел про “исходное состояние проекта”.
- Не придумывать внешнего заказчика, интервью или эмпирические данные.
- Не уходить в код, deployment-конфиги или детали реализации уровня главы 2.
- Если таблица получается слишком широкой для LaTeX, раздели ее на более компактный
  формат или сделай лаконичную матрицу без потери смысла.

Результат:
- обновленный `thesis/content/02-chapter-1.tex`;
- короткая сводка, какие фрагменты `1.1` были усилены;
- указание, какая именно логическая связка теперь ведет в раздел про CMS-подходы.

Тон и подача:
- Писать как для сильной инженерной ВКР.
- Не писать, что раздел был “слабым”; подавать правку как повышение формальной ясности и
  аналитической строгости уже сформированной главы.
```

### Этап 2. Формализовать сравнение традиционной CMS и headless CMS

#### Цель

Сделать раздел `1.2` более защищаемым: не просто перечислить плюсы и минусы подходов, а
показать их через набор критериев, значимых именно для маркетингового сайта и
`CMS-first` контента.

#### Что должно появиться после этапа

- в `1.2` появится более формальное сопоставление `традиционная CMS` и `headless CMS`;
- будет ясно, почему выбор `headless` сделан не “по моде”, а по критериям задачи;
- текст лучше подготовит читателя к следующему разделу про выбор `Strapi` и `Astro`.

#### Основные файлы

- [thesis/content/02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex)
- [thesis/knowledge/diploma/thesis-structure.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/thesis-structure.md)
- [thesis/knowledge/diploma/final-thesis-outline.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-thesis-outline.md)
- [thesis/knowledge/diploma/reference-theses-analysis.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/reference-theses-analysis.md)
- [thesis/references.bib](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/references.bib)

#### Что именно нужно сделать

- проверить, хватает ли текущему разделу `1.2` формальной опоры;
- добавить компактную сравнительную матрицу или аналогичный структурированный блок по
  критериям, релевантным именно для темы диплома;
- как минимум рассмотреть:
  frontend-независимость,
  локализацию,
  переиспользование контента,
  preview и публикацию,
  `SEO`-модель,
  эксплуатационный контур;
- убедиться, что итог сравнения ведет к рациональному выбору `headless` именно для
  корпоративной маркетинговой витрины;
- при необходимости синхронизировать или уточнить цитирование, но не раздувать список
  литературы ради объема.

#### Критерий завершения

- `1.2` легко защищается устно через набор критериев;
- читателю ясно, какие свойства `headless` имеют прямую ценность для заявленной задачи;
- раздел остается аналитическим, а не рекламным.

#### Промпт для агента

```text
Работаем в репозитории:
/Users/arthur/Documents/projects/Диплом/app-monorepo

Задача: усилить раздел `1.2` первой главы диплома, формализовав сравнение традиционной
CMS и headless CMS под задачу маркетингового сайта.

Сначала обязательно прочитай:
- thesis/content/02-chapter-1.tex
- thesis/knowledge/diploma/thesis-brief.md
- thesis/knowledge/diploma/thesis-structure.md
- thesis/knowledge/diploma/final-thesis-outline.md
- thesis/knowledge/diploma/final-scope.md
- thesis/knowledge/diploma/decision-log.md
- thesis/knowledge/diploma/agent-rules.md
- thesis/knowledge/diploma/reference-theses-analysis.md
- thesis/knowledge/bibliography-map.md
- thesis/knowledge/bibliography-fulltext-status.md
- thesis/references.bib

Что нужно сделать:
1. Проанализировать текущий раздел `1.2` и определить, где сравнение традиционной CMS и
   headless CMS пока остается слишком повествовательным.
2. Добавить компактную сравнительную матрицу или таблицу по критериям, значимым именно
   для предмета диплома.
3. В сравнении обязательно отразить:
   - зависимость frontend-слоя от CMS;
   - пригодность к мультиязычности;
   - повторное использование контента;
   - поддержку preview и управляемой публикации;
   - управляемость SEO и метаданных;
   - удобство для воспроизводимого deployment-контура.
4. Переписать вывод раздела так, чтобы выбор headless CMS выглядел как следствие критериев
   задачи, а не как абстрактное предпочтение современного стека.
5. Если в тексте не хватает опорного источника, сначала проверь существующие материалы и
   `references.bib`; новые источники добавляй только при реальной необходимости и с
   академически надежной базой.

Ограничения:
- Не превращать раздел в обзор всего рынка CMS.
- Не использовать маркетинговый стиль или лозунги про “современность”.
- Не придумывать численные сравнения или benchmark-данные, если их нет.
- Не выносить в раздел детали конкретной реализации `Strapi` и `Astro`; это задача
  следующего подраздела.

Результат:
- обновленный `thesis/content/02-chapter-1.tex`;
- при необходимости минимально обновленный `thesis/references.bib`;
- короткая сводка, по каким критериям теперь формально сравниваются два подхода.

Тон и подача:
- Писать как инженерный анализ применимости архитектурного подхода.
- Подчеркивать, что `headless CMS` выбран как рациональный ответ на требования предметной
  области, а не как дань тренду.
```

### Этап 3. Усилить критерии выбора Strapi, Astro и Nx + pnpm

#### Цель

Сделать раздел `1.3` более убедительным: вместо простого перечисления достоинств
технологий показать, по каким критериям именно этот стек закрывает поставленную задачу.

#### Что должно появиться после этапа

- в `1.3` будет явнее выделена логика `критерий выбора -> почему важен -> чем закрывается`;
- `Strapi`, `Astro` и `Nx + pnpm` будут поданы как части согласованной архитектурной
  модели;
- переход к требованиям станет более естественным и инженерно строгим.

#### Основные файлы

- [thesis/content/02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex)
- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/knowledge/diploma/thesis-structure.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/thesis-structure.md)
- [thesis/knowledge/diploma/final-thesis-outline.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-thesis-outline.md)
- [thesis/knowledge/diploma/decision-log.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/decision-log.md)
- [thesis/references.bib](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/references.bib)

#### Что именно нужно сделать

- проверить, где в текущем `1.3` выбор технологий обоснован скорее описательно, чем
  критериально;
- добавить компактную матрицу или структурированный блок по критериям выбора;
- обязательно отразить:
  наличие готовой `CMS`-инфраструктуры и `RBAC`,
  гибкость модели контента,
  `API`-first подход,
  `preview` и публикационный контур,
  предсказуемость статической витрины,
  `SEO`-ориентированную выдачу,
  удобство совместной разработки `CMS` и frontend в monorepo;
- показать, что `Nx + pnpm` в этой логике не “дополнительный инструмент”, а часть
  orchestration-контура совместной разработки.

#### Критерий завершения

- `1.3` отвечает не только на вопрос `что выбрано`, но и на вопрос `почему именно это
  выбрано для данной задачи`;
- раздел логически стыкуется с главой 2, но не дублирует ее;
- выбор стека звучит как часть целостной архитектурной модели.

#### Промпт для агента

```text
Работаем в репозитории:
/Users/arthur/Documents/projects/Диплом/app-monorepo

Задача: усилить подраздел `1.3` первой главы диплома так, чтобы выбор `Strapi`, `Astro`
и `Nx + pnpm` был обоснован через критерии выбора, а не только через описательные
абзацы.

Сначала обязательно прочитай:
- thesis/content/02-chapter-1.tex
- thesis/content/03-chapter-2.tex
- thesis/knowledge/diploma/thesis-brief.md
- thesis/knowledge/diploma/thesis-structure.md
- thesis/knowledge/diploma/final-thesis-outline.md
- thesis/knowledge/diploma/final-scope.md
- thesis/knowledge/diploma/decision-log.md
- thesis/knowledge/diploma/agent-rules.md
- thesis/knowledge/diploma/reference-theses-analysis.md
- thesis/references.bib

Что нужно сделать:
1. Проанализировать текущий подраздел `1.3` и определить, где логика выбора технологий
   пока звучит слишком описательно.
2. Добавить в `1.3` компактную таблицу или аналитическую матрицу вида
   `критерий выбора -> почему он важен -> как его закрывает выбранный стек`.
3. Обязательно раскрыть:
   - почему для задачи важна готовая CMS-инфраструктура;
   - почему важны структурированные content types, i18n и roles/permissions;
   - почему маркетинговой витрине подходит предсобранный frontend-контур;
   - почему схема `webhook -> rebuild` логически вытекает из выбранной архитектуры;
   - почему monorepo `Nx + pnpm` полезен именно для согласованного развития CMS и
     frontend.
4. Убедиться, что текст не превращается в проектную реализацию уровня главы 2.
5. При необходимости минимально уточнить ссылки на литературу, но не раздувать обзор
   технологий ради объема.

Ограничения:
- Не писать раздел как рекламное описание `Strapi` или `Astro`.
- Не уходить в детали конфигов, Docker, endpoints или конкретных скриптов.
- Не приписывать стеку возможности, которые не используются или не подтверждаются в
  проекте.

Результат:
- обновленный `thesis/content/02-chapter-1.tex`;
- при необходимости минимально обновленный `thesis/references.bib`;
- короткая сводка, по каким критериям теперь обоснован выбор стека.

Тон и подача:
- Писать так, чтобы стек выглядел не как набор любимых инструментов, а как рационально
  выбранная архитектурная связка под заявленную задачу.
```

### Этап 4. Добавить трассировку требований к реализации и проверке

#### Цель

Сделать раздел `1.4` сильнее за счет явной связки между требованиями, их источниками и
тем, как они закрываются и проверяются в проектной части.

#### Что должно появиться после этапа

- раздел требований станет не только списком желаемых свойств, но и мостом к главе 2;
- появится компактная матрица вида
  `требование -> откуда вытекает -> где реализуется / как проверяется`;
- ограничения и нецели будут поданы как осознанные инженерные границы.

#### Основные файлы

- [thesis/content/02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex)
- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/knowledge/diploma/acceptance-matrix.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/acceptance-matrix.md)
- [thesis/knowledge/diploma/testing-evidence-pack.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-evidence-pack.md)
- [thesis/knowledge/diploma/publication-deployment-contour.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/publication-deployment-contour.md)
- [thesis/knowledge/diploma/security-model.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/security-model.md)
- [thesis/knowledge/diploma/editor-workflow.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/editor-workflow.md)

#### Что именно нужно сделать

- проверить, хватает ли текущему `1.4` формальности и связки со второй главой;
- добавить одну компактную общую таблицу или две небольшие матрицы:
  одну для функциональных требований,
  одну для нефункциональных требований;
- для каждого требования или группы требований показать:
  из какой особенности предметной области оно вытекает;
  где оно будет раскрываться во второй главе;
  чем оно подтверждается или должно подтверждаться;
- аккуратно усилить блок `Ограничения и нецели проекта`, чтобы он читался как осознанная
  граница решения, а не как список недоделок;
- при необходимости переписать выводы главы 1 так, чтобы они вели к проектной главе
  через набор формализованных требований.

#### Критерий завершения

- `1.4` работает как интерфейс между анализом и проектированием;
- глава 2 логически ожидается как ответ на уже формализованные требования;
- связка с testing/evidence contour подана инженерно честно, без выдуманных результатов.

#### Промпт для агента

```text
Работаем в репозитории:
/Users/arthur/Documents/projects/Диплом/app-monorepo

Задача: усилить подраздел `1.4` первой главы диплома, связав требования к системе с их
источниками, реализацией и способом проверки.

Сначала обязательно прочитай:
- thesis/content/02-chapter-1.tex
- thesis/content/03-chapter-2.tex
- thesis/knowledge/diploma/thesis-brief.md
- thesis/knowledge/diploma/thesis-structure.md
- thesis/knowledge/diploma/final-thesis-outline.md
- thesis/knowledge/diploma/final-scope.md
- thesis/knowledge/diploma/decision-log.md
- thesis/knowledge/diploma/agent-rules.md
- thesis/knowledge/diploma/acceptance-matrix.md
- thesis/knowledge/diploma/testing-evidence-pack.md
- thesis/knowledge/diploma/publication-deployment-contour.md
- thesis/knowledge/diploma/security-model.md
- thesis/knowledge/diploma/editor-workflow.md

Что нужно сделать:
1. Проанализировать текущий раздел `1.4` и определить, хватает ли ему формальной связки
   с проектной и testing-частью диплома.
2. Добавить в раздел компактную матрицу или набор матриц вида:
   - `требование -> источник требования -> где реализуется / как проверяется`;
   или
   - отдельно для функциональных и нефункциональных требований.
3. Для verification-колонки опираться только на реально существующий evidence contour:
   `acceptance-matrix`, `testing-evidence-pack`, `publication-deployment-contour`,
   `security-model`, `editor-workflow`, а также соответствующие разделы главы 2.
4. Не утверждать, что требование уже подтверждено, если оно в проекте описано только как
   архитектурная цель или граница объема.
5. Усилить блок `Ограничения и нецели проекта`, чтобы он выглядел как осознанное
   проектное ограничение, а не как список случайно недоделанных частей.
6. При необходимости переписать выводы по аналитической главе, чтобы они завершались
   формализованным набором требований и логически открывали проектную главу.

Ограничения:
- Не дублировать вторую главу.
- Не перечислять весь acceptance contour слишком подробно; достаточно связать требования
  с реализацией и проверкой на уровне дипломной логики.
- Не придумывать несуществующие тесты, метрики или подтверждения.
- Если таблица получается слишком широкой, разбей ее на две более компактные.

Результат:
- обновленный `thesis/content/02-chapter-1.tex`;
- короткая сводка, какие требования теперь явно трассируются к реализации и проверке;
- перечень формулировок, которые были смягчены или уточнены ради инженерной честности.

Тон и подача:
- Писать так, чтобы требования выглядели как формализованный вход в проектирование и
  последующую проверку результата.
- Ограничения подавать как осознанные границы решения, а не как обесценивание проекта.
```

### Этап 5. Финальная редакционная синхронизация и проверка сборки

#### Цель

После содержательных правок убедиться, что глава усилилась не только смыслово, но и
редакционно: переходы не дублируются, таблицы не ломают верстку, ссылки и цитаты
корректны, сборка диплома проходит.

#### Что должно появиться после этапа

- финально выровненный текст главы 1;
- при необходимости минимально обновленный `references.bib`;
- подтверждение, что диплом собирается и новые таблицы не ломают LaTeX.

#### Основные файлы

- [thesis/content/02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex)
- [thesis/references.bib](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/references.bib)
- [thesis/knowledge/diploma/agent-rules.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/agent-rules.md)
- [thesis/README.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/README.md)

#### Что именно нужно сделать

- перечитать главу 1 целиком после всех правок;
- убрать повторы между `1.1`, `1.2`, `1.3` и `1.4`;
- проверить, что новые матрицы не превращают текст в канцелярский список;
- убедиться, что все цитаты корректно определены в `references.bib`;
- собрать диплом и устранить только те проблемы, которые внесены текущими изменениями.

#### Критерий завершения

- аналитическая глава читается как цельный, более строгий и защищаемый блок;
- сборка проходит;
- новые таблицы и формулировки не создают structural drift относительно active guidance.

#### Промпт для агента

```text
Работаем в репозитории:
/Users/arthur/Documents/projects/Диплом/app-monorepo

Задача: выполнить финальный редакционный и технический проход по аналитической главе после
ее усиления.

Сначала обязательно прочитай:
- thesis/content/02-chapter-1.tex
- thesis/knowledge/diploma/thesis-structure.md
- thesis/knowledge/diploma/final-thesis-outline.md
- thesis/knowledge/diploma/final-scope.md
- thesis/knowledge/diploma/decision-log.md
- thesis/knowledge/diploma/agent-rules.md
- thesis/references.bib
- thesis/README.md

Что нужно сделать:
1. Перечитать главу 1 целиком и убрать повторы, которые могли появиться после добавления
   таблиц и усиления переходов.
2. Проверить, что глава по-прежнему соблюдает publish-ready логику:
   - нет следов внутреннего процесса правок;
   - нет возвращения baseline-риторики;
   - нет ухода в проектную реализацию уровня главы 2.
3. Проверить цитаты и список литературы; если после правок появились новые `cite`, они
   должны быть корректно описаны в `thesis/references.bib`.
4. Собрать диплом и убедиться, что новые фрагменты не ломают LaTeX.
5. Если появляются overfull/hbox или table-width проблемы именно из-за новых вставок,
   исправить их без ухудшения содержательной части.

Рекомендуемая проверка:
- `cd thesis && make build`
- `cd thesis && make check`

Ограничения:
- Не переписывать заново всю главу, если проблема локальна.
- Не исправлять посторонние участки диплома, если они не затронуты правками главы 1.
- Не добавлять лишний “академический объем” ради самого объема.

Результат:
- финально выровненный `thesis/content/02-chapter-1.tex`;
- при необходимости обновленный `thesis/references.bib`;
- краткая сводка по build/check и список точечных редакционных правок.

Тон и подача:
- Сохранять инженерную аккуратность.
- В финальном результате глава должна звучать увереннее и формальнее, но не тяжелее для
  чтения.
```

## Рекомендуемая Стратегия Запуска

Если работу делает не один агент, а несколько независимых тредов, безопаснее запускать их
не параллельно, а последовательно:

1. `Этап 1`
2. `Этап 2`
3. `Этап 3`
4. `Этап 4`
5. `Этап 5`

Причина проста: все этапы правят один и тот же файл
[02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex),
и параллельный запуск почти гарантированно создаст конфликтующие редакции.

Если нужен более быстрый путь, допустим сокращенный запуск:

1. `Этап 1`
2. `Этап 4`
3. `Этап 5`

Это дает минимальный, но уже заметный прирост аналитической силы главы.

## Что Будет Считаться Хорошим Итогом

Хороший итог этой доработки выглядит так:

- глава 1 становится не длиннее ради длины, а убедительнее по логике;
- читателю проще увидеть, почему именно такая архитектура требуется предметной области;
- переход к главе 2 ощущается как естественное продолжение уже формализованных требований;
- на защите проще отвечать на вопросы вида:
  `почему headless`,
  `почему Strapi и Astro`,
  `откуда взялись требования`,
  `как они подтверждаются`.

Именно это и следует считать основной целью усиления аналитической главы.
