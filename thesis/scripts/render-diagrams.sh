#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THESIS_DIR="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
SRC_ROOT="${THESIS_DIR}/diagrams/src"
CONFIG_ROOT="${THESIS_DIR}/diagrams/config"
ASSETS_ROOT="${THESIS_DIR}/assets/diagrams"

MERMAID_SRC_DIR="${SRC_ROOT}/mermaid"
PLANTUML_SRC_DIR="${SRC_ROOT}/plantuml"

MERMAID_SVG_DIR="${ASSETS_ROOT}/mermaid/svg"
MERMAID_PDF_DIR="${ASSETS_ROOT}/mermaid/pdf"
PLANTUML_SVG_DIR="${ASSETS_ROOT}/plantuml/svg"
PLANTUML_PDF_DIR="${ASSETS_ROOT}/plantuml/pdf"

MERMAID_CONFIG="${CONFIG_ROOT}/mermaid.json"
PLANTUML_CONFIG="${CONFIG_ROOT}/plantuml.puml"

mkdir -p \
  "${MERMAID_SVG_DIR}" "${MERMAID_PDF_DIR}" \
  "${PLANTUML_SVG_DIR}" "${PLANTUML_PDF_DIR}"

need_command() {
  local cmd="$1"
  if ! command -v "${cmd}" >/dev/null 2>&1; then
    echo "Не найден обязательный инструмент: ${cmd}" >&2
    exit 1
  fi
}

detect_browser() {
  local candidates=()

  if [[ -n "${PUPPETEER_EXECUTABLE_PATH:-}" && -x "${PUPPETEER_EXECUTABLE_PATH}" ]]; then
    printf '%s\n' "${PUPPETEER_EXECUTABLE_PATH}"
    return 0
  fi

  candidates+=(
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    "/Applications/Chromium.app/Contents/MacOS/Chromium"
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
  )

  if command -v google-chrome >/dev/null 2>&1; then
    candidates+=("$(command -v google-chrome)")
  fi
  if command -v chromium >/dev/null 2>&1; then
    candidates+=("$(command -v chromium)")
  fi
  if command -v chromium-browser >/dev/null 2>&1; then
    candidates+=("$(command -v chromium-browser)")
  fi

  local browser
  for browser in "${candidates[@]}"; do
    if [[ -x "${browser}" ]]; then
      printf '%s\n' "${browser}"
      return 0
    fi
  done

  return 1
}

render_svg_to_pdf() {
  local input_svg="$1"
  local output_pdf="$2"
  rsvg-convert -f pdf -o "${output_pdf}" "${input_svg}"
}

render_mermaid_file() {
  local input_file="$1"
  local base_name output_svg output_pdf browser

  base_name="$(basename "${input_file%.*}")"
  output_svg="${MERMAID_SVG_DIR}/${base_name}.svg"
  output_pdf="${MERMAID_PDF_DIR}/${base_name}.pdf"

  if ! browser="$(detect_browser)"; then
    echo "Не найден браузер для Mermaid CLI. Установите Chrome/Chromium или задайте PUPPETEER_EXECUTABLE_PATH." >&2
    exit 1
  fi

  echo "Mermaid: ${input_file} -> ${output_svg}"
  export PUPPETEER_EXECUTABLE_PATH="${browser}"

  if command -v mmdc >/dev/null 2>&1; then
    mmdc -i "${input_file}" -o "${output_svg}" --configFile "${MERMAID_CONFIG}" -b transparent
  else
    pnpm dlx @mermaid-js/mermaid-cli -i "${input_file}" -o "${output_svg}" --configFile "${MERMAID_CONFIG}" -b transparent
  fi

  render_svg_to_pdf "${output_svg}" "${output_pdf}"
}

render_plantuml_file() {
  local input_file="$1"
  local base_name output_svg output_pdf tmp_dir
  local generated_files=()

  base_name="$(basename "${input_file%.*}")"
  output_svg="${PLANTUML_SVG_DIR}/${base_name}.svg"
  output_pdf="${PLANTUML_PDF_DIR}/${base_name}.pdf"
  tmp_dir="$(mktemp -d)"

  echo "PlantUML: ${input_file} -> ${output_svg}"
  plantuml -tsvg -failfast2 -nometadata -config "${PLANTUML_CONFIG}" -output "${tmp_dir}" "${input_file}"

  while IFS= read -r file; do
    generated_files+=("${file}")
  done < <(find "${tmp_dir}" -maxdepth 1 -type f -name '*.svg' | sort)

  if [[ "${#generated_files[@]}" -ne 1 ]]; then
    rm -rf "${tmp_dir}"
    echo "Ожидалась ровно одна SVG-диаграмма из ${input_file}, получено: ${#generated_files[@]}" >&2
    exit 1
  fi

  cp "${generated_files[0]}" "${output_svg}"
  render_svg_to_pdf "${output_svg}" "${output_pdf}"
  rm -rf "${tmp_dir}"
}

need_command rsvg-convert
need_command plantuml
need_command pnpm

shopt -s nullglob
mermaid_files=("${MERMAID_SRC_DIR}"/*.mmd)
plantuml_files=("${PLANTUML_SRC_DIR}"/*.puml)

if [[ "${#mermaid_files[@]}" -eq 0 && "${#plantuml_files[@]}" -eq 0 ]]; then
  echo "Исходники диаграмм не найдены. Ожидаются файлы в ${MERMAID_SRC_DIR} и ${PLANTUML_SRC_DIR}."
  exit 0
fi

for file in "${mermaid_files[@]}"; do
  render_mermaid_file "${file}"
done

for file in "${plantuml_files[@]}"; do
  render_plantuml_file "${file}"
done

echo "Генерация диаграмм завершена."
