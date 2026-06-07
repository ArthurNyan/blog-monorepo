# Diploma Workspace

Эта директория фиксирует рабочий каркас диплома: тему, цели, структуру, принятые решения, чекпоинты реализации и правила для агента.

## Состав

- `thesis-brief.md` — краткий паспорт диплома: тема, цель, задачи, объект, предмет, критерии успеха.
- `thesis-structure.md` — рекомендуемая структура ВКР и наполнение разделов.
- `final-thesis-outline.md` — финальная подробная структура диплома, цели и тезисы по каждому блоку.
- `checkpoints.md` — проектные и текстовые чекпоинты по выполнению диплома.
- `decision-log.md` — зафиксированные решения по теме, архитектуре и границам работы.
- `agent-rules.md` — правила для агента по работе с LaTeX, проектом и содержанием диплома.
- `chapter-2-evidence.md` — доказательная база по текущему состоянию `apps/cms` и `apps/front` для проектной главы.
- `reference-theses-analysis.md` — сравнительный анализ похожих дипломов и выводы для собственной ВКР.
- `chapter-1-restructure-plan.md` — исторический plan/rationale по переделке аналитической главы без блока про “исходное состояние проекта”; не основной active guidance source.
- `chapter-1-analytical-enhancement-plan.md` — active plan по усилению аналитической главы через более формальную аналитическую оптику, критерии выбора и трассировку требований.
- `chapter-2-practical-enhancement-plan.md` — active plan по усилению практической главы через синхронизацию factual base, усиление operational/testing contour и готовые автономные промпты для агентов.
- `iteration-roadmaps.md` — несколько дорожных карт для итерационной реализации максимального варианта и готовые промпты для агентов.
- `improvement-prompts.md` — актуальный backlog доработок по проекту и диплому с приоритетами и готовыми промптами для агентов.

## Как использовать

1. Сначала сверяться с `thesis-brief.md` и `decision-log.md`, чтобы не потерять рамки работы.
2. Как основной writing-ориентир использовать `final-thesis-outline.md`.
3. Для подбора литературы и проверки локального архива использовать `../bibliography-map.md`.
4. Для проверки доступности full text и допустимой глубины пересказа использовать `../bibliography-fulltext-status.md`.
5. При подготовке глав и аргументации сверяться с `reference-theses-analysis.md`.
6. При доработке проекта и сборе материалов отмечать прогресс по `checkpoints.md`.
7. Для любой агентной работы над дипломом или фронтендом соблюдать `agent-rules.md`.
8. Для активной структуры главы 1 и новых prompts опираться на `thesis-structure.md`,
   `final-thesis-outline.md`, `agent-rules.md`, `decision-log.md` и
   `chapter-1-analytical-enhancement-plan.md`, а `chapter-1-restructure-plan.md` читать
   как history note перехода.
9. Для крупных agent-задач по усилению главы 2 использовать
   `chapter-2-practical-enhancement-plan.md` как основную рабочую рамку, а
   `chapter-2-evidence.md`, `final-scope.md`, `acceptance-matrix.md` и
   `testing-evidence-pack.md` как factual/evidence base.
