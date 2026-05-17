# Диаграммы Mermaid и PlantUML

## Цель

В репозитории диаграммы хранятся как текстовые исходники, а не как вручную нарисованные
картинки. Это позволяет:

- версионировать архитектурные схемы вместе с кодом и текстом ВКР;
- редактировать диаграммы без графических редакторов;
- использовать один и тот же исходник для `Markdown` и `LaTeX`.

## Структура каталогов

- `diagrams/src/mermaid/*.mmd` — исходники `Mermaid`.
- `diagrams/src/plantuml/*.puml` — исходники `PlantUML`.
- `diagrams/config/mermaid.json` — единая тема рендера для `Mermaid`.
- `diagrams/config/plantuml.puml` — единые `skinparam` для `PlantUML`.
- `assets/diagrams/mermaid/svg/*.svg` — web-версии диаграмм.
- `assets/diagrams/mermaid/pdf/*.pdf` — версии для вставки в `LaTeX`.
- `assets/diagrams/plantuml/svg/*.svg` — web-версии диаграмм.
- `assets/diagrams/plantuml/pdf/*.pdf` — версии для вставки в `LaTeX`.

## Генерация

```bash
cd thesis
make diagrams
```

Скрипт:

1. рендерит `Mermaid` в `SVG` через `Mermaid CLI`;
2. рендерит `PlantUML` в `SVG` через локальный `plantuml`;
3. конвертирует все `SVG` в `PDF` через `rsvg-convert`.

## Требования к окружению

- `pnpm`
- `plantuml`
- `rsvg-convert`
- установленный `Google Chrome` или `Chromium` для `Mermaid CLI`

Если браузер установлен в нестандартное место, можно явно задать:

```bash
export PUPPETEER_EXECUTABLE_PATH="/path/to/browser"
cd thesis
make diagrams
```

## Правила использования в Markdown

Для документации и заметок используйте `SVG`:

```md
![Deployment pipeline](../assets/diagrams/mermaid/svg/deployment-pipeline.svg)
```

`Mermaid`-блоки внутри `Markdown` допустимы только как черновой preview-вариант. Для
устойчивого отображения в разных средах и для последующей вставки в диплом source of truth
должен оставаться в `diagrams/src`.

## Правила использования в LaTeX

В тексте диплома подключайте только сгенерированный `PDF`:

```tex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=\linewidth]{assets/diagrams/plantuml/pdf/cms-context.pdf}
  \caption{Контекстная схема CMS-first платформы}
  \label{fig:cms-context}
\end{figure}
```

Это устойчивее, чем попытка парсить `Mermaid` или `PlantUML` напрямую в `LaTeX`.

## Ограничения

- один файл исходника должен содержать одну итоговую диаграмму;
- для вставки в `LaTeX` нельзя использовать сырые `.mmd` или `.puml`;
- если диаграмма изменилась, перед `make build` нужно повторно выполнить `make diagrams`.
