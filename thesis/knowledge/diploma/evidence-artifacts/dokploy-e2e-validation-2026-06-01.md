# Dokploy End-to-End Validation

Дата фиксации: `2026-06-01`.

## Контекст

Проверка выполнена на внешнем стенде проекта, где развернуты:

- `Strapi` как CMS;
- `Astro` как публичная витрина;
- `Dokploy` как внешний deployment/rebuild orchestrator.

## Проверенный сценарий

Подтвержден полный сквозной путь:

`Strapi publish/unpublish -> managed webhook -> Dokploy rebuild/redeploy -> обновление публичной Astro-витрины`.

## Что считается подтвержденным

- событие `publish/unpublish` в `Strapi` действительно инициирует внешний webhook;
- `Dokploy` принимает вызов и запускает rebuild/redeploy frontend-контура;
- результат rebuild отражается на опубликованной `Astro`-витрине без ручного запуска
  frontend-сборки.

## Значение для диплома

- сценарий `PUBF-03` в acceptance matrix переводится в `Pass`;
- публикационный и deployment-контур можно описывать как подтвержденный не только
  локально, но и внешним `end-to-end` прогоном на стенде;
- при этом сама platform-конфигурация `Dokploy` остается внешним инфраструктурным state и
  не становится versioned-артефактом репозитория.
