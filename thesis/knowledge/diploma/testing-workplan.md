# Testing Workplan

Статус документа: рабочий план реализации тестирования для ВКР.

## Как использовать

- Каждый этап рассчитан на отдельный тред и отдельный законченный результат.
- Перед стартом нового этапа открыть его prompt целиком и работать только в его границах.
- После завершения этапа отметить чекбоксы и кратко зафиксировать результат прямо в этом файле или в связанном knowledge-документе.
- Если этап упирается в ограничение среды или данных, это нужно фиксировать как факт, а не маскировать под `Pass`.

## Master Checklist

- [x] Этап 0. Поднять и зафиксировать baseline окружение
- [x] Этап 1. Нормализовать baseline данных CMS
- [x] Этап 2. Стабилизировать automated smoke contour
- [x] Этап 3. Оформить воспроизводимый runbook проверок
- [x] Этап 4. Автоматизировать сбор evidence
- [ ] Этап 5. Оформить manual checklist пользовательских сценариев
- [ ] Этап 6. Синхронизировать acceptance matrix и testing evidence pack
- [ ] Этап 7. Переписать подраздел о тестировании в тексте диплома
- [ ] Этап 8. Опционально снять browser-level audit

## Общие правила для всех этапов

- Не выдавать ручную проверку за полноценный автотест.
- Не выдавать code inspection за runtime proof, если сценарий реально не прогонялся.
- Отделять дефекты приложения от ограничений seed-данных и внешней среды.
- Любое утверждение для диплома должно опираться на воспроизводимую команду, документированный manual flow или явный build/DB evidence.

## Правило фиксации результата

После завершения любого этапа результат должен быть зафиксирован в трех местах:

- в чате: коротко описать, что сделано, что подтверждено, что осталось ограничением;
- в проекте: обновить код, scripts, knowledge-документы или другие артефакты этапа;
- в этом файле: отметить чекбоксы этапа и кратко дописать итог выполнения.

Если этап дал новые фактические результаты тестирования, их нужно дополнительно внести в:

- `thesis/knowledge/diploma/testing-evidence-pack.md`;
- `thesis/knowledge/diploma/acceptance-matrix.md`, если изменились статусы сценариев.

---

## Этап 0. Поднять и зафиксировать baseline окружение

### Цель

Подготовить стабильное локальное окружение, на котором дальше можно честно выполнять проверки.

### Готово, если

- локально доступны `CMS`, frontend runtime и frontend build preview;
- зафиксированы обязательные `env`;
- подтверждено, какие команды реально используются как baseline.

### Чеклист этапа

- [x] Проверить `.env` и `.env.example` в корне, `apps/front` и `apps/cms`
- [x] Поднять `CMS`
- [x] Поднять frontend runtime
- [x] Собрать frontend build и поднять preview из `dist/client`
- [x] Проверить доступность `localhost:1337`, `localhost:4321`, `localhost:4322`
- [x] Зафиксировать рабочий набор команд для повторного запуска

### Основные артефакты

- `README.md`
- `apps/front/package.json`
- `apps/cms/package.json`
- `apps/front/project.json`
- `apps/cms/project.json`
- `apps/front/.env.example`
- `apps/cms/.env.example`

### Итог этапа

Фиксация от `2026-05-29`.

- Проверены `.env` и `.env.example`; минимальные требования по `env` для `CMS`, frontend runtime/build, preview и smoke зафиксированы в `testing-evidence-pack.md`.
- Подтвержден локальный baseline: `http://localhost:1337` доступен (`/` редиректит на `/admin`, `/admin` отвечает `200`), frontend runtime отвечает на `http://localhost:4321`, static preview отвечает на `http://localhost:4322`.
- Приняты baseline-команды для повторного старта: `pnpm dev`, `pnpm build:front`, `PORT=4322 HOST=127.0.0.1 pnpm preview:front`, `pnpm smoke:front`.
- Ограничения baseline: `http://localhost:4322` обслуживает только `apps/front/dist/client` и не отдает Astro API routes; read-only smoke на `2026-05-29` все еще фиксирует `3` acceptance gaps: `ru/en` home-page с `noindex` и отсутствие `EN` detail coverage для `articles/projects`.

### Prompt для отдельного треда

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Задача: поднять и зафиксировать baseline окружение для тестирования дипломного проекта.

Сначала прочитай:
- README.md
- apps/front/package.json
- apps/cms/package.json
- apps/front/project.json
- apps/cms/project.json
- apps/front/.env.example
- apps/cms/.env.example

Что нужно сделать:
1. Проверить, какие env обязательны для CMS, frontend runtime, preview и smoke.
2. Поднять локально CMS и frontend.
3. Собрать frontend build и поднять preview из dist/client.
4. Подтвердить доступность:
   - http://localhost:1337
   - http://localhost:4321
   - http://localhost:4322
5. Зафиксировать минимальный набор команд для повторного старта.
6. Если что-то не запускается, не придумывать workaround в тексте диплома, а точно указать причину.
7. В конце обновить артефакты в репозитории и отметить прогресс в `thesis/knowledge/diploma/testing-workplan.md`.

Ограничения:
- не менять тестовый scope;
- не переписывать архитектуру;
- не считать этап завершенным, пока не подтверждена доступность локальных endpoints.

Результат:
- рабочее окружение;
- краткая фиксация baseline-команд и ограничений;
- обновление project artifacts по ходу работы;
- обновление `thesis/knowledge/diploma/testing-workplan.md` с отмеченными чекбоксами и кратким итогом этапа.
```

---

## Этап 1. Нормализовать baseline данных CMS

### Цель

Сделать так, чтобы acceptance-ожидания не конфликтовали с seed-данными и текущим dataset.

### Готово, если

- ясно, какие проверки зависят от seed-данных;
- устранен конфликт между public `indexable` ожиданиями и `seo.noIndex` в seed;
- принято явное решение по `EN` detail coverage для `articles/projects`.

### Чеклист этапа

- [x] Проверить seed для `home-page`, `page`, `global`, `vacancies`
- [x] Найти, какие public SEO-флаги приходят именно из seed-данных
- [x] Решить, должен ли baseline считать `home-page/page` индексируемыми
- [x] Проверить, есть ли versioned seed для `article/project`
- [x] Принять решение по `EN` detail entries: seed или documented limitation
- [x] Синхронизировать baseline-данные с тем, что реально будет утверждаться в дипломе

### Основные артефакты

- `apps/cms/scripts/seed-storefront.js`
- `apps/cms/scripts/seed-pages.js`
- `apps/cms/scripts/seed-vacancies.js`
- `apps/front/scripts/acceptance-smoke.mjs`
- `apps/front/src/shared/seo/metadata.ts`
- `apps/front/src/layouts/main.astro`

### Итог этапа

Фиксация от `2026-05-29`.

- Проверено, что public `noindex` не был дефектом `metadata.ts` / `main.astro`: frontend лишь уважал `seo.noIndex`, пришедший из versioned `seed-storefront.js` и `seed-pages.js`.
- Нормализован versioned dataset для публичных `home-page/page`: `seo.noIndex` снят, а seeded navigation/CTA для `articles/projects` переведены на locale-prefixed ссылки вместо legacy `/articles` и `/projects`.
- Зафиксирована граница dataset для `EN` detail coverage: в репозитории нет versioned `article/project` seed scripts, а текущий SQLite baseline содержит published detail entries только для `ru-RU`; поэтому отсутствие `EN` detail entries теперь отражается как dataset-dependent smoke warning, а не как обязательный pass/fail приложения.
- После повторного `pnpm --dir apps/cms seed:storefront`, `pnpm --dir apps/cms seed:pages` и `pnpm smoke:front` read-only baseline дает `0` failures и `2` warnings (`EN` detail dataset boundary и skipped mutation checks).

### Prompt для отдельного треда

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Задача: нормализовать baseline данных CMS для тестирования.

Сначала прочитай:
- apps/cms/scripts/seed-storefront.js
- apps/cms/scripts/seed-pages.js
- apps/cms/scripts/seed-vacancies.js
- apps/front/src/shared/seo/metadata.ts
- apps/front/src/layouts/main.astro
- thesis/knowledge/diploma/testing-evidence-pack.md
- thesis/knowledge/diploma/acceptance-matrix.md

Что нужно сделать:
1. Проверить, какие acceptance failures вызваны seed-данными, а не кодом приложения.
2. Разобраться с public `noindex` на `home-page/page`.
3. Разобраться, есть ли стабильный baseline для `EN` detail routes `articles/projects`.
4. Либо привести seed-данные к нужному baseline, либо явно зафиксировать ограничение dataset.
5. Не оставлять неоднозначность между тем, что ожидает smoke, и тем, что реально seeded в CMS.
6. В конце обновить измененные файлы проекта и отметить прогресс в `thesis/knowledge/diploma/testing-workplan.md`.

Ограничения:
- не писать, что SEO закрыт, если dataset делает public route неиндексируемым;
- не считать `EN detail coverage` обязательным pass, если она не воспроизводится versioned-данными.

Результат:
- согласованный baseline данных;
- понятное объяснение, какие проверки зависят от dataset;
- изменения в seed/knowledge artifacts, если они потребовались;
- обновление `thesis/knowledge/diploma/testing-workplan.md` с отмеченными чекбоксами и кратким итогом этапа.
```

---

## Этап 2. Стабилизировать automated smoke contour

### Цель

Разделить стабильные автоматические проверки приложения и контентозависимые проверки dataset.

### Готово, если

- smoke script проходит по тем сценариям, которые действительно являются инвариантами приложения;
- dataset-dependent проверки не маскируются под дефекты runtime;
- команды smoke дают понятный и интерпретируемый результат.

### Чеклист этапа

- [x] Перечислить текущие проверки в `acceptance-smoke.mjs`
- [x] Отделить route/runtime invariants от dataset-dependent assertions
- [x] Упростить или переименовать проверки так, чтобы результат читался без догадок
- [x] Проверить `preview`, `redirect`, `sitemap`, form validation paths
- [x] Отдельно пометить optional mutation checks
- [x] Прогнать smoke и зафиксировать новый baseline результата

### Основные артефакты

- `apps/front/scripts/acceptance-smoke.mjs`
- `apps/front/package.json`
- `thesis/knowledge/diploma/testing-evidence-pack.md`

### Итог этапа

Фиксация от `2026-05-29`.

- `acceptance-smoke.mjs` перестроен так, чтобы каждый результат имел явную группу: `runtime_invariants`, `preview_runtime`, `build_evidence`, `dataset_limitations`, `mutation_checks`.
- Dataset-dependent `EN` detail coverage для `articles/projects` больше не смешивается с runtime/build regressions: в smoke это отдельный warning на build evidence.
- Optional form submits явно помечены как `mutation_checks` и не маскируются под read-only failure без `SMOKE_ALLOW_MUTATIONS=true`.
- Актуальный read-only прогон `pnpm smoke:front` при поднятых `CMS` и `front` завершился с `0` failures и `2` warnings; дополнительно зафиксировано, что для dev runtime smoke безопаснее поднимать `CMS` раньше `front`, иначе часть Astro `getStaticPaths()` может дать ложный шум до рестарта frontend.

### Prompt для отдельного треда

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Задача: стабилизировать automated smoke contour для дипломного baseline.

Сначала прочитай:
- apps/front/scripts/acceptance-smoke.mjs
- apps/front/package.json
- thesis/knowledge/diploma/testing-evidence-pack.md
- thesis/knowledge/diploma/acceptance-matrix.md

Что нужно сделать:
1. Разобрать текущий smoke script по группам проверок.
2. Отделить:
   - стабильные runtime/build invariants;
   - dataset-dependent проверки;
   - mutation checks форм.
3. Упростить script так, чтобы его результат можно было честно объяснить в ВКР.
4. Не терять проверки preview, redirects, sitemap, forms и базового SEO/accessibility contour.
5. Прогнать smoke и зафиксировать актуальный результат.
6. В конце обновить project artifacts, при необходимости `testing-evidence-pack.md`, и отметить прогресс в `thesis/knowledge/diploma/testing-workplan.md`.

Ограничения:
- не превращать этап в внедрение Playwright/Cypress;
- не скрывать реальные acceptance gaps;
- не смешивать build evidence и runtime evidence без явной пометки.

Результат:
- обновленный smoke script;
- понятный automated baseline для диплома;
- фиксация результата в проекте и, при изменении фактического baseline, в `testing-evidence-pack.md`;
- обновление `thesis/knowledge/diploma/testing-workplan.md` с отмеченными чекбоксами и кратким итогом этапа.
```

---

## Этап 3. Оформить воспроизводимый runbook проверок

### Цель

Собрать короткий документ с минимальным набором шагов и команд для повторного тестирования.

### Готово, если

- есть один понятный runbook;
- в нем указаны prerequisite, команды, expected outcomes и точки проверки;
- им можно пользоваться без чтения всей истории проекта.

### Чеклист этапа

- [x] Зафиксировать prerequisite по окружению
- [x] Описать запуск `cms`, `front`, `preview`
- [x] Описать запуск build и smoke
- [x] Добавить команды для preview/API/forms/sitemap
- [x] Добавить команды для SQLite evidence
- [x] Указать, какие результаты считаются нормой, а какие ограничением

### Основные артефакты

- `README.md`
- `thesis/knowledge/diploma/testing-evidence-pack.md`
- новый runbook в `thesis/docs` или `thesis/knowledge/diploma`

### Итог этапа

Фиксация от `2026-05-29`.

- В репозитории добавлен компактный runbook [testing-runbook.md](testing-runbook.md) с reproducible baseline для защиты и повторного прогона.
- В runbook отдельно зафиксированы `Automated`, `Manual` и `DB/Build evidence` шаги: prerequisite, последовательный `CMS -> front` startup, sequential re-seed, `build`, `preview`, `smoke`, preview/API/form checks и SQLite commands.
- Для воспроизводимости отдельно отмечены практические ограничения baseline: `seed:storefront` и `seed:pages` нельзя запускать параллельно на SQLite, а `http://localhost:4322` обслуживает только static preview без Astro API routes.
- Повторно подтверждено, что baseline-команды дают ожидаемый результат: read-only `pnpm smoke:front` завершаетcя с `0` failures и `2` warnings, `SMOKE_ALLOW_MUTATIONS=true pnpm smoke:front` завершаетcя с `0` failures и `1` warning.

### Prompt для отдельного треда

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Задача: оформить воспроизводимый runbook тестирования.

Сначала прочитай:
- README.md
- thesis/knowledge/diploma/testing-evidence-pack.md
- thesis/knowledge/diploma/acceptance-matrix.md
- apps/front/package.json
- apps/cms/package.json

Что нужно сделать:
1. Собрать короткий runbook для повторения тестового baseline.
2. Включить:
   - prerequisite;
   - команды запуска;
   - команды build/smoke;
   - preview checks;
   - form/API checks;
   - SQLite evidence commands.
3. Сделать документ компактным и прикладным.
4. Отдельно отметить, что является automated, manual и DB/build evidence.
5. В конце сохранить runbook в репозитории и отметить прогресс в `thesis/knowledge/diploma/testing-workplan.md`.

Ограничения:
- не писать общий обзор проекта вместо инструкции;
- не включать тяжелые необязательные tooling steps как обязательный baseline.

Результат:
- один воспроизводимый runbook, на который можно ссылаться в дипломе и на защите;
- сохраненный runbook в репозитории;
- обновление `thesis/knowledge/diploma/testing-workplan.md` с отмеченными чекбоксами и кратким итогом этапа.
```

---

## Этап 4. Автоматизировать сбор evidence

### Цель

Сделать сбор доказательств менее ручным и менее зависимым от копирования результатов врукопашную.

### Готово, если

- есть повторяемые команды или script для HTTP/SQLite evidence;
- можно быстро снять evidence для `forms`, `preview`, `sitemap`, `webhook`;
- результаты легко переносить в приложения к ВКР.

### Чеклист этапа

- [x] Выделить, какие evidence сейчас снимаются вручную
- [x] Сделать набор повторяемых команд или script
- [x] Покрыть `lead_submissions`
- [x] Покрыть `vacancy_applications`
- [x] Покрыть `strapi_webhooks`
- [x] Покрыть `sitemap` и representative HTTP checks

### Основные артефакты

- `thesis/knowledge/diploma/testing-evidence-pack.md`
- `apps/cms/.tmp/data.db`
- `apps/front/dist/client/sitemap-index.xml`
- `apps/front/dist/client/sitemap-0.xml`
- `scripts/collect-testing-evidence.sh`

### Итог этапа

Фиксация от `2026-05-29`.

- Повторяющиеся ручные evidence-шаги сведены в одну локальную команду `pnpm evidence:testing`, которая запускает [scripts/collect-testing-evidence.sh](/Users/arthur/Documents/projects/Диплом/app-monorepo/scripts/collect-testing-evidence.sh).
- Script покрывает representative HTTP checks, sitemap coverage и SQLite queries по `strapi_webhooks`, `lead_submissions`, `vacancy_applications` без новых npm-зависимостей и без изменений existing smoke contour.
- Результат сохранен в repeatable виде: collector можно переиспользовать для обновления `testing-evidence-pack.md`, приложений к ВКР и демонстрации на защите.
- Актуальный baseline collector на `2026-05-29` проходит с `hard_failures=0`; warning по `EN` detail coverage считается dataset limitation, warning по `Static preview root` допустим, если `4322` не поднят отдельным процессом.

### Prompt для отдельного треда

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Задача: автоматизировать сбор evidence для дипломного тестирования.

Сначала прочитай:
- thesis/knowledge/diploma/testing-evidence-pack.md
- apps/front/scripts/acceptance-smoke.mjs
- apps/cms/package.json
- apps/front/package.json

Что нужно сделать:
1. Определить, какие доказательства сейчас снимаются вручную и повторяются из сессии в сессию.
2. Сделать script или компактный command set для:
   - representative HTTP checks;
   - sitemap checks;
   - SQLite queries по `lead_submissions`, `vacancy_applications`, `strapi_webhooks`.
3. Сохранить решение в repo в таком виде, чтобы его можно было повторить.
4. Не перегружать решение внешними зависимостями без необходимости.
5. В конце обновить связанные project artifacts и отметить прогресс в `thesis/knowledge/diploma/testing-workplan.md`.

Ограничения:
- не строить отдельную сложную reporting system;
- не ломать existing smoke contour;
- не зависеть от внешних SaaS, если можно обойтись локальными средствами.

Результат:
- воспроизводимый набор evidence-команд или script;
- меньше ручной работы при обновлении доказательной базы;
- обновленные project artifacts для повторного запуска;
- обновление `thesis/knowledge/diploma/testing-workplan.md` с отмеченными чекбоксами и кратким итогом этапа.
```

---

## Этап 5. Оформить manual checklist пользовательских сценариев

### Цель

Зафиксировать короткий ручной сценарий проверки, который можно реально показать на защите.

### Готово, если

- есть компактный manual checklist;
- он покрывает ключевые пользовательские и редакторские сценарии;
- по нему можно пройтись за 10-15 минут.

### Чеклист этапа

- [ ] Выбрать representative public routes
- [ ] Выбрать representative preview flow
- [ ] Выбрать representative form flows
- [ ] Описать expected outcomes по каждому шагу
- [ ] Отметить, какие пункты требуют browser runtime, а какие можно проверять по HTTP/HTML
- [ ] Убрать все второстепенные сценарии, не нужные для ВКР

### Основные артефакты

- `thesis/knowledge/diploma/acceptance-matrix.md`
- `thesis/knowledge/diploma/testing-evidence-pack.md`
- новый checklist в `thesis/docs` или `thesis/knowledge/diploma`

### Prompt для отдельного треда

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Задача: оформить manual checklist пользовательских сценариев для диплома и защиты.

Сначала прочитай:
- thesis/knowledge/diploma/acceptance-matrix.md
- thesis/knowledge/diploma/testing-evidence-pack.md
- thesis/docs/demo-plan.md

Что нужно сделать:
1. Составить короткий manual checklist на основе реально важных сценариев.
2. Включить:
   - redirect `/ -> /ru/`;
   - public `ru/en` storefront-core;
   - representative CMS page;
   - preview flow;
   - vacancy detail;
   - lead form и vacancy form.
3. Для каждого шага указать expected result.
4. Оставить только то, что можно быстро и внятно показать на защите.
5. В конце сохранить checklist в репозитории и отметить прогресс в `thesis/knowledge/diploma/testing-workplan.md`.

Ограничения:
- не превращать checklist в длинный тест-план предприятия;
- не включать сценарии, которые не дают новой доказательности для ВКР.

Результат:
- короткий manual checklist для demo и для раздела о ручной приемке;
- сохраненный checklist в репозитории;
- обновление `thesis/knowledge/diploma/testing-workplan.md` с отмеченными чекбоксами и кратким итогом этапа.
```

---

## Этап 6. Синхронизировать acceptance matrix и testing evidence pack

### Цель

Привести главные knowledge-документы в полное соответствие с фактическим baseline.

### Готово, если

- статусы `Pass/Partial/Fail/Unverified` соответствуют реальному прогону;
- описания ограничений не противоречат коду и данным;
- acceptance matrix и evidence pack ссылаются на один и тот же baseline.

### Чеклист этапа

- [ ] Обновить статусы в `acceptance-matrix.md`
- [ ] Обновить дату baseline
- [ ] Обновить описание automated checks
- [ ] Обновить описание manual checks
- [ ] Обновить failure/gap section
- [ ] Проверить, что документы не противоречат друг другу

### Основные артефакты

- `thesis/knowledge/diploma/acceptance-matrix.md`
- `thesis/knowledge/diploma/testing-evidence-pack.md`

### Prompt для отдельного треда

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Задача: синхронизировать acceptance matrix и testing evidence pack с фактическим baseline.

Сначала прочитай:
- thesis/knowledge/diploma/acceptance-matrix.md
- thesis/knowledge/diploma/testing-evidence-pack.md
- актуальные результаты smoke/runbook/manual checks

Что нужно сделать:
1. Сверить текущие документы с реальными результатами последнего baseline.
2. Обновить статусы `Pass/Partial/Fail/Unverified`.
3. Уточнить, что является:
   - automated evidence;
   - manual evidence;
   - code/build/DB evidence;
   - внешним ограничением.
4. Убрать все устаревшие или двусмысленные формулировки.
5. В конце сохранить изменения в репозитории и отметить прогресс в `thesis/knowledge/diploma/testing-workplan.md`.

Ограничения:
- не скрывать acceptance gaps;
- не переносить старые статусы автоматически;
- не писать `Pass`, если результат не подтвержден.

Результат:
- актуальные `acceptance-matrix.md` и `testing-evidence-pack.md`;
- синхронизированные project artifacts без расхождений между документами;
- обновление `thesis/knowledge/diploma/testing-workplan.md` с отмеченными чекбоксами и кратким итогом этапа.
```

---

## Этап 7. Переписать подраздел о тестировании в тексте диплома

### Цель

Превратить инженерные результаты в аккуратный академический подраздел без преувеличений.

### Готово, если

- текст в главе 2 опирается на реальный baseline;
- в нем описан тип тестирования, набор сценариев, результаты и ограничения;
- текст не обещает unit/e2e покрытие, которого нет.

### Чеклист этапа

- [ ] Проверить текущий раздел тестирования в `03-chapter-2.tex`
- [ ] Вынести в текст automated smoke contour
- [ ] Вынести manual сценарии
- [ ] Вынести build/DB evidence
- [ ] Явно описать ограничения
- [ ] Проверить, что формулировки совпадают с `acceptance-matrix` и `testing-evidence-pack`

### Основные артефакты

- `thesis/content/03-chapter-2.tex`
- `thesis/knowledge/diploma/acceptance-matrix.md`
- `thesis/knowledge/diploma/testing-evidence-pack.md`
- `thesis/knowledge/diploma/chapter-2-evidence.md`

### Prompt для отдельного треда

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Задача: переписать подраздел о тестировании в тексте диплома по актуальному baseline.

Сначала прочитай:
- thesis/content/03-chapter-2.tex
- thesis/knowledge/diploma/acceptance-matrix.md
- thesis/knowledge/diploma/testing-evidence-pack.md
- thesis/knowledge/diploma/chapter-2-evidence.md
- thesis/knowledge/diploma/final-scope.md

Что нужно сделать:
1. Обновить раздел о тестировании в проектной главе.
2. Описать:
   - характер тестирования;
   - automated smoke contour;
   - manual scenario checks;
   - build/DB evidence;
   - ограничения baseline.
3. Сделать текст пригодным для ВКР: без жаргона, без преувеличений, без claims про отсутствующие автотесты.
4. Проверить согласованность с acceptance matrix и evidence pack.
5. В конце сохранить изменения в репозитории и отметить прогресс в `thesis/knowledge/diploma/testing-workplan.md`.

Ограничения:
- не писать, что в проекте есть полноценный unit/e2e контур;
- не писать, что выполнен полный WCAG/Lighthouse audit, если он не подтвержден.

Результат:
- обновленный подраздел `Тестирование` в `thesis/content/03-chapter-2.tex`;
- при необходимости обновленные supporting knowledge-документы;
- обновление `thesis/knowledge/diploma/testing-workplan.md` с отмеченными чекбоксами и кратким итогом этапа.
```

---

## Этап 8. Опционально снять browser-level audit

### Цель

Если позволит среда, добавить один дополнительный слой доказательств по `accessibility` или `performance`.

### Готово, если

- есть хотя бы один аккуратно оформленный browser-level report;
- он не подменяет основной baseline, а усиливает его;
- ограничения tooling явно зафиксированы.

### Чеклист этапа

- [ ] Выбрать один инструмент: `axe` или `Lighthouse`
- [ ] Выбрать 2-3 representative routes
- [ ] Выполнить прогон
- [ ] Зафиксировать полученные результаты или ограничение среды
- [ ] Добавить результаты в evidence pack только как supplementary evidence

### Основные артефакты

- `thesis/knowledge/diploma/testing-evidence-pack.md`
- возможный новый report в `thesis/docs` или `thesis/knowledge/diploma/evidence-artifacts`

### Prompt для отдельного треда

```text
Работаем в /Users/arthur/Documents/projects/Диплом/app-monorepo.

Задача: опционально снять browser-level audit для усиления дипломного testing baseline.

Сначала прочитай:
- thesis/knowledge/diploma/testing-evidence-pack.md
- thesis/knowledge/diploma/acceptance-matrix.md

Что нужно сделать:
1. Выбрать только один дополнительный audit layer:
   - accessibility через `axe`;
   - performance через `Lighthouse`.
2. Проверить 2-3 representative pages.
3. Если tooling снова упирается в сеть или среду, не тратить на это весь тред, а зафиксировать ограничение.
4. Если прогон успешен, добавить результат как supplementary evidence, а не как обязательный baseline.
5. В конце сохранить результат в репозитории и отметить прогресс в `thesis/knowledge/diploma/testing-workplan.md`.

Ограничения:
- не раздувать scope до полноценного browser e2e набора;
- не переписывать основную testing strategy под этот этап.

Результат:
- либо короткий supplementary audit report;
- либо честная фиксация, почему этап не был воспроизведен;
- обновление project artifacts, если report создан;
- обновление `thesis/knowledge/diploma/testing-workplan.md` с отмеченными чекбоксами и кратким итогом этапа.
```

---

## Критерий завершения всего плана

План можно считать закрытым, когда выполнены этапы `0-7`, а в проекте есть:

- воспроизводимый baseline окружения;
- согласованные seed-данные и acceptance-ожидания;
- стабильный smoke contour;
- runbook и manual checklist;
- актуальные `acceptance-matrix.md` и `testing-evidence-pack.md`;
- обновленный подраздел о тестировании в тексте диплома.

Этап `8` усиливает результат, но не является обязательным для честной и сильной дипломной защиты.
