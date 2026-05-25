#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THESIS_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PDF_DIR="$THESIS_DIR/assets/diagrams/plantuml/pdf"
OUT_DIR="$THESIS_DIR/presentation/assets-generated"

mkdir -p "$OUT_DIR"

convert_pdf() {
  local src="$1"
  local out_name="$2"
  local out_path="$OUT_DIR/$out_name"

  if [[ -f "$out_path" && "$out_path" -nt "$src" ]]; then
    return 0
  fi

  pdftoppm -r 220 -png -singlefile "$src" "${out_path%.png}" >/dev/null
}

convert_pdf "$PDF_DIR/cms-first-architecture.pdf" "cms-first-architecture.png"
convert_pdf "$PDF_DIR/cms-data-model.pdf" "cms-data-model.png"
convert_pdf "$PDF_DIR/cms-content-lifecycle.pdf" "cms-content-lifecycle.png"

echo "Prepared presentation assets in $OUT_DIR"
