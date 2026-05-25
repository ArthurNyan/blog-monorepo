#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <input-pdf> <output-pdf>" >&2
  exit 1
fi

input_pdf="$1"
output_pdf="$2"

for cmd in pdftotext pdfseparate pdfunite awk mktemp; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Required command not found: $cmd" >&2
    exit 1
  fi
done

if [[ ! -f "$input_pdf" ]]; then
  echo "Input PDF not found: $input_pdf" >&2
  exit 1
fi

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

text_file="$tmp_dir/main.txt"
pdftotext "$input_pdf" "$text_file"

bib_start="$(
  awk -v RS='\f' '/Список литературы/{page=NR} END{if (page) print page}' "$text_file"
)"

appendix_start="$(
  awk -v RS='\f' '/ПРИЛОЖЕНИЯ/{page=NR} END{if (page) print page}' "$text_file"
)"

if [[ -z "${bib_start:-}" ]]; then
  echo "Could not find bibliography start marker in PDF text" >&2
  exit 1
fi

if [[ -z "${appendix_start:-}" ]]; then
  echo "Could not find appendix start marker in PDF text" >&2
  exit 1
fi

if (( appendix_start <= bib_start )); then
  echo "Invalid page order: bibliography must start before appendices" >&2
  exit 1
fi

bib_end=$((appendix_start - 1))

pdfseparate "$input_pdf" "$tmp_dir/page-%03d.pdf" >/dev/null

pages=()
for ((page = bib_start; page <= bib_end; page++)); do
  page_file="$(printf '%s/page-%03d.pdf' "$tmp_dir" "$page")"
  if [[ ! -f "$page_file" ]]; then
    echo "Expected page file not found: $page_file" >&2
    exit 1
  fi
  pages+=("$page_file")
done

pdfunite "${pages[@]}" "$output_pdf"

echo "Exported bibliography pages ${bib_start}-${bib_end} to $output_pdf"
