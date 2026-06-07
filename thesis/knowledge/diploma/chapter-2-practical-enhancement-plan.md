# План Усиления Практической Главы

Дата фиксации: `2026-06-07`.

## Статус Документа

Этот документ является active working plan для дальнейшего усиления
[thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex).

Он не заменяет:

- [thesis/knowledge/diploma/final-thesis-outline.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-thesis-outline.md)
- [thesis/knowledge/diploma/final-scope.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-scope.md)
- [thesis/knowledge/diploma/chapter-2-evidence.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/chapter-2-evidence.md)
- [thesis/knowledge/diploma/acceptance-matrix.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/acceptance-matrix.md)
- [thesis/knowledge/diploma/testing-evidence-pack.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-evidence-pack.md)

Вместо этого он задает рабочий порядок, контекст и автономные агентные промпты для
доведения практической главы до более сильной publish-ready версии.

## Назначение

План нужен не для переписывания главы 2 с нуля, а для ее инженерного доведения до более
цельного и доказательного состояния.

Целевой эффект:

- практическая глава яснее связывает требования из главы 1 с реализованными контурами
  системы;
- архитектура, модель данных, page builder, frontend, preview, `SEO`, публикация,
  deployment, безопасность и testing подаются как единая система, а не как набор
  изолированных фрагментов;
- для каждого важного контура становится проще увидеть три уровня:
  `зачем он нужен`, `как он реализован`, `чем он подтвержден`;
- границы scope и доказанности формулируются аккуратно и честно, без ослабления уже
  достигнутого результата;
- глава 2 легче защищается на предзащите и защите, потому что в ней меньше скрытых
  противоречий между кодом, knowledge-документами, выводами и демонстрационными
  артефактами.

Документ рассчитан на передачу в отдельные agent-треды без контекста текущего обсуждения.
Поэтому ниже зафиксированы и рабочая рамка, и обязательный контекст, и подробные промпты
для каждого этапа.

## Зафиксированное Текущее Состояние Главы 2

На дату фиксации по структуре и содержанию уже можно считать, что практическая глава
сложилась как зрелый каркас, а не как черновой набросок.

Подтвержденные сильные стороны текущей версии:

- в [03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
  уже есть полноценная структура от общей архитектуры до testing и выводов;
- текст в целом опирается на код, схемы данных, маршруты, конфигурацию и evidence-пакет,
  а не на абстрактные намерения;
- уже раскрыты ключевые для темы ВКР контуры:
  `CMS-first` архитектура,
  `Dynamic Zone`,
  locale-aware storefront,
  `preview`,
  `SEO/Open Graph`,
  `webhook -> rebuild`,
  `Dokploy`,
  security boundaries,
  acceptance/testing contour;
- chapter 2 уже можно читать как описание реальной системы, а не как план разработки.

Главная зона усиления на этом этапе состоит не в добавлении “еще одной функции”, а в
следующих инженерных задачах:

- повысить трассируемость между требованиями, реализацией и проверкой;
- сделать переходы между разделами менее перечислительными и более причинно связанными;
- выровнять уровень доказанности по operational-контурам;
- удержать единый тон при описании ограничений, особенно для `vacancies`,
  route-owned `SEO` list pages, внешнего platform-state в `Dokploy` и testing evidence;
- синхронизировать формулировки главы 2 с conclusion, defense-theses и presentation
  артефактами.

Иными словами, это план не “спасти проблемную главу”, а довести уже сильную практическую
главу до логически более завершенной и устойчивой версии.

## Зафиксированная Цель Усиления

После доработки практическая глава должна:

1. Оставаться publish-ready и опираться только на подтвержденные факты.
2. Ясно показывать логику `требование -> реализация -> проверка -> практический эффект`.
3. Разводить:
   - что реализовано в коде и конфигурации;
   - что подтверждено локально;
   - что подтверждено внешним стендом или platform-contour;
   - что остается осознанной границей итогового scope.
4. Сохранять `CMS-first` фокус темы, а не распадаться на набор частных технических
   деталей.
5. Не содержать формулировок, которые звучат как история доработки, временная сессия или
   внутренний changelog.

## Базовый Контекст Для Любого Агента

Перед любой работой по усилению практической главы агент должен обязательно прочитать:

- [thesis/content/02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex)
- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/content/04-conclusion.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/04-conclusion.tex)
- [thesis/defense-theses.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/defense-theses.tex)
- [thesis/presentation/diploma-presentation.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/presentation/diploma-presentation.md)
- [thesis/knowledge/diploma/thesis-brief.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/thesis-brief.md)
- [thesis/knowledge/diploma/thesis-structure.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/thesis-structure.md)
- [thesis/knowledge/diploma/final-thesis-outline.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-thesis-outline.md)
- [thesis/knowledge/diploma/final-scope.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-scope.md)
- [thesis/knowledge/diploma/decision-log.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/decision-log.md)
- [thesis/knowledge/diploma/agent-rules.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/agent-rules.md)
- [thesis/knowledge/diploma/chapter-2-evidence.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/chapter-2-evidence.md)
- [thesis/knowledge/diploma/acceptance-matrix.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/acceptance-matrix.md)
- [thesis/knowledge/diploma/testing-evidence-pack.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-evidence-pack.md)
- [thesis/knowledge/diploma/testing-runbook.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-runbook.md)
- [thesis/knowledge/diploma/testing-manual-checklist.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-manual-checklist.md)
- [thesis/knowledge/diploma/publication-deployment-contour.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/publication-deployment-contour.md)
- [thesis/knowledge/diploma/security-model.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/security-model.md)
- [thesis/knowledge/diploma/editor-workflow.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/editor-workflow.md)
- [thesis/knowledge/diploma/improvement-prompts.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/improvement-prompts.md)

При необходимости подтверждения конкретного тезиса по реализации агент должен сверяться и
с текущим кодом в:

- `apps/cms`
- `apps/front`
- `package.json`
- `apps/front/package.json`
- `apps/cms/package.json`

Если между `.tex`, knowledge и кодом найден drift, агент не должен подменять решение
догадкой. Сначала нужно явно определить, какой из источников отстал, и только потом
синхронизировать формулировки.

## Инженерные Принципы Для Усиления Главы 2

- Не писать главу 2 как журнал эволюции проекта.
- Не возвращать формулировки вида `baseline`, `в данной сессии`, `текущая версия`,
  `планируется`, если речь не идет о специально обозначенной границе scope.
- Не выдавать за реализованное то, что подтверждается только возможностями фреймворка.
- Для каждого крупного контура по возможности удерживать триаду:
  `архитектурная роль -> конкретная реализация -> evidence/ограничение`.
- Не перегружать текст перечислением route-файлов, env-переменных и внутренних функций
  там, где важнее показать инженерный смысл решения.
- Не выдумывать новые метрики, платформенные состояния или внешние production-факты.
- Ограничения формулировать как границу охвата или внешнюю платформенную зависимость, а не
  как провал проекта.
- Если раздел уже зрелый по содержанию, усиливать его через ясность, связность и
  доказательность, а не через искусственное увеличение объема.

## Рекомендуемый Контур Усиления

### Минимальный Контур

- синхронизировать главу 2 с active source-of-truth knowledge;
- выровнять переходы между разделами и подачу границ scope;
- усилить testing/results интерпретацию.

### Целевой Контур

- выполнить весь минимальный контур;
- дополнительно усилить архитектурную трассировку от требований главы 1 к реализации;
- привести operational sections к единому уровню доказательности;
- синхронизировать conclusion, defense-theses и presentation с итоговой версией главы 2.

### Максимальный Контур

- выполнить целевой контур;
- при необходимости перераспределить часть слишком плотных перечислений в приложения,
  таблицы или knowledge-артефакты;
- подготовить более сильный defense-ready narrative для иллюстраций, таблиц и demo
  сценария.

Для publish-ready версии диплома рекомендуется именно `целевой контур`.

## Рекомендуемый Порядок Работ

1. Синхронизировать source-of-truth для практической главы.
2. Усилить архитектурную и реализационную логику первой половины главы 2.
3. Усилить operational-контуры: мультиязычность, preview, `SEO`, публикация, deployment,
   security.
4. Усилить testing, evidence и практическую интерпретацию результата.
5. Выполнить редакционную синхронизацию связанных артефактов и проверку сборки.

Такой порядок позволяет сначала стабилизировать factual base, затем доработать основной
текст, а уже после этого синхронизировать выводы, защитные тезисы и презентационные
артефакты.

## Этапы Работы И Автономные Промпты

### Этап 1. Синхронизировать source-of-truth для практической главы

#### Цель

До содержательного переписывания нужно убедиться, что knowledge-документы, evidence-пакет
и финальный scope согласованы между собой и могут служить опорой для главы 2 без скрытых
противоречий.

#### Что должно появиться после этапа

- обновленный и согласованный factual base для практической главы;
- устраненные противоречия между code-backed фактами, testing/evidence и финальным scope;
- понимание, какие фрагменты главы 2 нужно будет усиливать текстово, а какие уже
  подтверждены достаточно хорошо.

#### Основные файлы

- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/knowledge/diploma/chapter-2-evidence.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/chapter-2-evidence.md)
- [thesis/knowledge/diploma/final-scope.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-scope.md)
- [thesis/knowledge/diploma/acceptance-matrix.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/acceptance-matrix.md)
- [thesis/knowledge/diploma/testing-evidence-pack.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-evidence-pack.md)
- [thesis/knowledge/diploma/publication-deployment-contour.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/publication-deployment-contour.md)
- [thesis/knowledge/diploma/security-model.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/security-model.md)

#### Что именно нужно сделать

- пройтись по основным утверждениям главы 2 и проверить, что они поддержаны либо кодом,
  либо evidence-документами;
- если глава 2 уже ушла дальше knowledge-документов, сначала обновить knowledge, а не
  тащить основной текст назад;
- явно развести:
  - что является частью final scope;
  - что подтверждено локальными проверками;
  - что подтверждено внешним стендом или deployment-контуром;
  - что остается допустимым ограничением;
- проверить, нет ли в active knowledge устаревших формулировок про `SEO`, `Dokploy`,
  тестовый контур, `Nx` targets или мультиязычность карьерного модуля.

#### Критерий завершения

- knowledge и evidence больше не противоречат ключевым тезисам главы 2;
- по каждому крупному operational-контуру есть понятный source of truth;
- следующему агенту не нужно восстанавливать фактическую картину по разрозненным файлам.

#### Промпт для агента

```text
Работаем в репозитории:
/Users/arthur/Documents/projects/Диплом/app-monorepo

Задача: синхронизировать source-of-truth и evidence-базу для практической главы диплома
перед дальнейшим усилением основного текста.

Сначала обязательно прочитай:
- thesis/knowledge/diploma/chapter-2-practical-enhancement-plan.md
- thesis/content/03-chapter-2.tex
- thesis/knowledge/diploma/chapter-2-evidence.md
- thesis/knowledge/diploma/final-scope.md
- thesis/knowledge/diploma/acceptance-matrix.md
- thesis/knowledge/diploma/testing-evidence-pack.md
- thesis/knowledge/diploma/testing-runbook.md
- thesis/knowledge/diploma/publication-deployment-contour.md
- thesis/knowledge/diploma/security-model.md
- thesis/knowledge/diploma/agent-rules.md
- thesis/knowledge/diploma/decision-log.md
- код в apps/cms и apps/front по мере необходимости

Что нужно сделать:
1. Проверить, нет ли drift между главой 2, knowledge-документами и текущим кодом.
2. Обновить knowledge/evidence-документы там, где они уже отстают от фактического
   состояния проекта и текста.
3. По каждому крупному контуру явно развести:
   - реализацию;
   - способ подтверждения;
   - границу scope или доказанности.
4. Не переписывать на этом этапе главу 2 масштабно; цель этапа — сделать стабильную
   опорную базу для дальнейших правок текста.

Ограничения:
- Не придумывать новые факты и внешние артефакты.
- Не ослаблять chapter 2, если knowledge просто устарел.
- Не превращать правки в changelog.

Результат:
- обновленные source-of-truth/evidence-документы;
- короткая сводка, какие расхождения были устранены;
- список зон главы 2, которые теперь можно усиливать текстово без factual drift.

Тон и подача:
- Подавать работу как стабилизацию доказательной базы зрелой практической главы.
- Не писать, что глава “несогласована” или “слабая”; формулировать через выравнивание
  и синхронизацию инженерного контура.
```

### Этап 2. Усилить архитектурную и реализационную логику первой половины главы 2

#### Цель

Сделать начальные разделы практической главы более цельными: от общей архитектуры через
CMS-модель и `Dynamic Zone` к frontend-витрине. Задача этапа — усилить не набор фактов, а
их причинно-следственную связку.

#### Что должно появиться после этапа

- более сильный ввод в главу 2, который подчеркивает переход от требований к реализации;
- более ясные переходы между разделами `архитектура -> модель данных -> page builder ->
  frontend`;
- меньше ощущения каталога сущностей и маршрутов, больше ощущения описания системы.

#### Основные файлы

- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/content/02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex)
- [thesis/knowledge/diploma/final-thesis-outline.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-thesis-outline.md)
- [thesis/knowledge/diploma/final-scope.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-scope.md)
- [thesis/knowledge/diploma/chapter-2-evidence.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/chapter-2-evidence.md)

#### Что именно нужно сделать

- усилить вводный абзац главы 2, чтобы он явно переводил требования главы 1 в плоскость
  архитектурной реализации;
- проверить, где разделы `Общая архитектура системы`, `Проектирование модели данных CMS`,
  `Конструктор страниц` и `Реализация frontend-части` читаются слишком перечислительно;
- переписать при необходимости связки между подразделами так, чтобы каждый следующий
  контур логически вытекал из предыдущего;
- удержать `CMS-first` линию:
  `Strapi` как ядро контента,
  `pages + Dynamic Zone` как редакторская модель,
  `Astro` как витрина и слой публикации;
- не расписывать лишние кодовые подробности, если важнее объяснить инженерный эффект
  решения.

#### Критерий завершения

- первая половина главы 2 читаетcя как единая проектная логика, а не как набор отдельных
  инвентаризаций;
- из текста ясно, почему модель данных приводит именно к page-builder и locale-aware
  frontend-публикации;
- структура главы не ломается и не появляется дублирование главы 1.

#### Промпт для агента

```text
Работаем в репозитории:
/Users/arthur/Documents/projects/Диплом/app-monorepo

Задача: усилить архитектурную и реализационную логику первой половины практической главы
диплома без изменения ее общей структуры.

Сначала обязательно прочитай:
- thesis/knowledge/diploma/chapter-2-practical-enhancement-plan.md
- thesis/content/02-chapter-1.tex
- thesis/content/03-chapter-2.tex
- thesis/knowledge/diploma/final-thesis-outline.md
- thesis/knowledge/diploma/final-scope.md
- thesis/knowledge/diploma/chapter-2-evidence.md
- thesis/knowledge/diploma/agent-rules.md

Что нужно сделать:
1. Усилить вводную связку главы 2 так, чтобы она показывала переход от требований главы 1
   к реализованной системе.
2. Проверить разделы:
   - общая архитектура;
   - модель данных CMS;
   - Dynamic Zone;
   - frontend-часть.
3. Там, где текст звучит как каталог сущностей, маршрутов или файлов, переписать его в
   более инженерно связную форму:
   - роль контура в системе;
   - как он реализован;
   - какой практический эффект дает.
4. Сохранить `CMS-first` фокус и не превращать главу в low-level разбор исходников.

Ограничения:
- Не придумывать новые функции и новые разделы.
- Не дублировать теоретическую аргументацию главы 1.
- Не убирать важные факты ради “красоты”, если они нужны для доказательности.

Результат:
- обновленный `thesis/content/03-chapter-2.tex`;
- короткая сводка, какие переходы и какие разделы стали логически сильнее;
- пояснение, как теперь выстроена линия `архитектура -> данные -> page builder ->
  frontend`.

Тон и подача:
- Писать как про зрелую инженерную систему, которую нужно сделать более целостной в
  академическом изложении.
- Не говорить о “переписывании с нуля”; это refinement и логическое завершение контура.
```

### Этап 3. Усилить operational-контуры и границы системы

#### Цель

Привести sections про мультиязычность, `preview`, `SEO`, публикацию, deployment и
security к одному уровню зрелости: чтобы в каждом разделе было ясно, что именно реализовано,
почему это важно для темы диплома и где проходит текущая граница охвата.

#### Что должно появиться после этапа

- более ровная подача operational-контура;
- явное и спокойное описание границ для `vacancies`, route-owned list-page `SEO`,
  platform-state `Dokploy`, secrets и внешнего окружения;
- меньше риска, что на защите любой из этих разделов будет прочитан как недоказанный или
  внутренне противоречивый.

#### Основные файлы

- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/knowledge/diploma/final-scope.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-scope.md)
- [thesis/knowledge/diploma/publication-deployment-contour.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/publication-deployment-contour.md)
- [thesis/knowledge/diploma/security-model.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/security-model.md)
- [thesis/knowledge/diploma/editor-workflow.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/editor-workflow.md)
- [thesis/knowledge/diploma/chapter-2-evidence.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/chapter-2-evidence.md)

#### Что именно нужно сделать

- проверить, что sections про operational behavior подаются в единой логике:
  `функция контура -> механизм -> доказательство -> граница`;
- отдельно перепроверить формулировки вокруг:
  - мультиязычности карьерного модуля;
  - `SEO`-охвата detail pages и list pages;
  - `preview` и ограничения публичного API published-only слоем;
  - `webhook -> rebuild` и внешней роли `Dokploy`;
  - ролей, прав и публичных форм;
- если нужно, усилить связки между editor workflow, security model и deployment contour,
  чтобы operational picture читалась как единая эксплуатационная схема;
- не переобещать то, что зависит от внешнего окружения или ручной настройки секретов.

#### Критерий завершения

- все operational sections используют сопоставимую степень точности и честности;
- ограничения не противоречат final scope;
- глава 2 уверенно описывает эксплуатационный контур системы без внутренних перекосов по
  доказанности.

#### Промпт для агента

```text
Работаем в репозитории:
/Users/arthur/Documents/projects/Диплом/app-monorepo

Задача: усилить operational sections практической главы и выровнять описание границ
системы.

Сначала обязательно прочитай:
- thesis/knowledge/diploma/chapter-2-practical-enhancement-plan.md
- thesis/content/03-chapter-2.tex
- thesis/knowledge/diploma/final-scope.md
- thesis/knowledge/diploma/publication-deployment-contour.md
- thesis/knowledge/diploma/security-model.md
- thesis/knowledge/diploma/editor-workflow.md
- thesis/knowledge/diploma/chapter-2-evidence.md
- thesis/knowledge/diploma/agent-rules.md

Что нужно сделать:
1. Проверить и при необходимости усилить разделы про:
   - мультиязычность;
   - preview;
   - SEO/Open Graph/sitemap;
   - publication/deployment;
   - безопасность публичных сценариев;
   - роли и права.
2. Для каждого такого раздела удержать ясную схему:
   - зачем этот контур нужен;
   - как он реализован;
   - чем он подтвержден;
   - где проходит его текущая граница.
3. Особенно аккуратно выровнять формулировки по:
   - `vacancies` как отдельному прикладному production-контуру;
   - list-page SEO как route-owned поверхности;
   - `Dokploy` как внешнему platform-state при versioned Docker/env контуре в репозитории;
   - ручной настройке секретов и env как допустимой эксплуатационной границе.

Ограничения:
- Не обещать “полную мультиязычность всего сайта”, если это не соответствует final scope.
- Не описывать внешнюю платформу так, будто весь ее state versioned в репозитории.
- Не ослаблять уже реализованные security/publication контуры.

Результат:
- обновленный operational-блок в `thesis/content/03-chapter-2.tex`;
- короткая сводка, какие границы стали описаны точнее;
- пояснение, как теперь выровнены доказанность и scope across these sections.

Тон и подача:
- Подавать эти контуры как зрелую эксплуатационную часть решения с аккуратно
  обозначенными границами.
- Не использовать язык “недоделанности”; говорить о границе охвата, внешнем сегменте или
  принятом инженерном ограничении.
```

### Этап 4. Усилить testing, evidence и практическую интерпретацию результата

#### Цель

Сделать testing-раздел главы 2 более сильным академически: чтобы он не только перечислял
прогоны и метрики, но и ясно показывал, какие требования и контуры системы были
подтверждены, какими процедурами и как именно интерпретировать полученные результаты.

#### Что должно появиться после этапа

- более стройная логика testing-раздела;
- лучшее различение между acceptance-проверкой, browser audit, build evidence,
  database-side evidence и демонстрационной ручной приемкой;
- более уверенная и академически корректная интерпретация количественных показателей и
  практического значения результата.

#### Основные файлы

- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/content/02-chapter-1.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/02-chapter-1.tex)
- [thesis/knowledge/diploma/acceptance-matrix.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/acceptance-matrix.md)
- [thesis/knowledge/diploma/testing-evidence-pack.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-evidence-pack.md)
- [thesis/knowledge/diploma/testing-runbook.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-runbook.md)
- [thesis/knowledge/diploma/testing-manual-checklist.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/testing-manual-checklist.md)
- [thesis/knowledge/diploma/final-scope.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/final-scope.md)

#### Что именно нужно сделать

- проверить, насколько явно testing-section связывается с требованиями из главы 1 и с
  final scope;
- усилить структуру проверки через разные классы evidence:
  smoke,
  mutation,
  browser audit,
  build/sitemap,
  database evidence,
  manual defense demo;
- перепроверить даты, количественные показатели и wording вокруг измеримых результатов;
- четко развести:
  - что реально измерено;
  - что подтверждается результатом smoke/audit;
  - что является архитектурным выводом, а не числовой метрикой;
- при необходимости усилить subsection про практическое значение результатов, чтобы он
  связывал testing с итоговой ценностью CMS-first решения.

#### Критерий завершения

- testing-section читаетcя как воспроизводимый acceptance/evidence contour, а не как
  набор разрозненных прогонов;
- количественные показатели интерпретируются аккуратно;
- из раздела ясно, какие ключевые требования и сценарии реально подтверждены.

#### Промпт для агента

```text
Работаем в репозитории:
/Users/arthur/Documents/projects/Диплом/app-monorepo

Задача: усилить testing-раздел практической главы и сделать его более строгим по
трассировке требований, evidence и интерпретации результатов.

Сначала обязательно прочитай:
- thesis/knowledge/diploma/chapter-2-practical-enhancement-plan.md
- thesis/content/02-chapter-1.tex
- thesis/content/03-chapter-2.tex
- thesis/knowledge/diploma/final-scope.md
- thesis/knowledge/diploma/acceptance-matrix.md
- thesis/knowledge/diploma/testing-evidence-pack.md
- thesis/knowledge/diploma/testing-runbook.md
- thesis/knowledge/diploma/testing-manual-checklist.md
- thesis/knowledge/diploma/agent-rules.md

Что нужно сделать:
1. Перепроверить testing-section главы 2 на предмет логики:
   требование/контур -> способ проверки -> результат -> корректная интерпретация.
2. Если нужно, усилить различение между:
   - smoke acceptance contour;
   - mutation checks;
   - browser audit;
   - build/sitemap evidence;
   - database-side evidence;
   - ручной демонстрационной приемкой для защиты.
3. Проверить даты, числа, названия команд и формулировки количественных результатов.
4. Переписать при необходимости subsection про практическое значение результатов так,
   чтобы он показывал зрелость решения, но не приукрашивал факты.

Ограничения:
- Не придумывать новые измерения.
- Не называть архитектурные выводы “метриками”, если они не измерялись.
- Не ослаблять уже существующий testing contour формулировками про “отсутствие тестов”.

Результат:
- обновленный testing-раздел в `thesis/content/03-chapter-2.tex`;
- короткая сводка, какие evidence-классы теперь различаются явнее;
- пояснение, какие требования главы 1 теперь лучше трассируются в testing-section.

Тон и подача:
- Писать как про воспроизводимый инженерный acceptance contour.
- Ограничения формулировать через границу интерпретации, а не через обесценивание
  полученного результата.
```

### Этап 5. Синхронизировать связанные артефакты и проверить publish-ready качество

#### Цель

После усиления главы 2 нужно убедиться, что conclusion, defense-theses, presentation и
финальная сборка не расходятся с ее новой логикой и не тянут обратно старые или менее
точные формулировки.

#### Что должно появиться после этапа

- выровненные итоговые формулировки по результатам и ограничениям;
- единый publish-ready тон в основном тексте, защитных тезисах и презентации;
- подтвержденная сборка диплома и отсутствие новых структурных или ссылочных проблем.

#### Основные файлы

- [thesis/content/03-chapter-2.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/03-chapter-2.tex)
- [thesis/content/04-conclusion.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/content/04-conclusion.tex)
- [thesis/defense-theses.tex](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/defense-theses.tex)
- [thesis/presentation/diploma-presentation.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/presentation/diploma-presentation.md)
- [thesis/README.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/README.md)
- [thesis/knowledge/diploma/agent-rules.md](/Users/arthur/Documents/projects/Диплом/app-monorepo/thesis/knowledge/diploma/agent-rules.md)

#### Что именно нужно сделать

- проверить, не расходятся ли выводы chapter 2 с conclusion и defense-theses;
- выровнять presentation wording по operational, testing и practical-result sections;
- прогнать сборку диплома и checks последовательно, не запуская `make build` и
  `make check` параллельно в одной директории;
- если остаются неблокирующие warnings, зафиксировать их как residual typographic tail, а
  не маскировать под успешное отсутствие замечаний;
- при выявлении новой важной договоренности сначала отразить ее в knowledge, а потом в
  `.tex`/presentation-артефактах.

#### Критерий завершения

- chapter 2, conclusion, defense-theses и presentation говорят об одном и том же результате
  без тональных и фактических разрывов;
- сборка проходит;
- residual warnings, если они остались, понятны и честно обозначены.

#### Промпт для агента

```text
Работаем в репозитории:
/Users/arthur/Documents/projects/Диплом/app-monorepo

Задача: после доработки практической главы синхронизировать все связанные артефакты и
проверить publish-ready качество финального контура.

Сначала обязательно прочитай:
- thesis/knowledge/diploma/chapter-2-practical-enhancement-plan.md
- thesis/content/03-chapter-2.tex
- thesis/content/04-conclusion.tex
- thesis/defense-theses.tex
- thesis/presentation/diploma-presentation.md
- thesis/knowledge/diploma/agent-rules.md
- thesis/knowledge/diploma/decision-log.md

Что нужно сделать:
1. Проверить, не расходятся ли формулировки chapter 2 с conclusion, defense-theses и
   presentation.
2. При необходимости синхронизировать связанные артефакты по:
   - operational-контурам;
   - testing/results;
   - ограничениям и границам scope;
   - финальному practical outcome.
3. Проверить сборку диплома:
   - выполнять `make build` и `make check` только последовательно;
   - не запускать их параллельно в одной папке.
4. Если сборка проходит с неблокирующими warning’ами, честно зафиксировать их остаточный
   статус.

Ограничения:
- Не переписывать заново защитные тезисы и презентацию, если достаточно локальной
  синхронизации.
- Не скрывать предупреждения сборки, если они реально остались.

Результат:
- синхронизированные финальные артефакты;
- краткая сводка, что именно было выровнено;
- результат `make build` и `make check` с указанием residual warnings, если они есть.

Тон и подача:
- Подавать задачу как финальную инженерную стыковку уже зрелого текста и его защитного
  контура.
- Избегать языка временности и внутреннего процесса.
```

## Практический Вывод

Если выполнять улучшение практической главы по этому плану, то правильная стратегия
состоит не в механическом наращивании объема, а в последовательном доведении уже
сложившегося контура:

1. сначала стабилизировать factual base;
2. затем усилить системную логику основной главы;
3. потом выровнять operational и testing sections;
4. и только после этого синхронизировать conclusion, defense и presentation.

Именно такой порядок дает наилучший шанс получить не просто “больше текста”, а более
сильную, цельную и защищаемую практическую главу.
