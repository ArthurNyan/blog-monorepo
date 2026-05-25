#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THESIS_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

INPUT_PPTX="${1:-$THESIS_DIR/presentation/diploma-presentation.pptx}"
OUTPUT_PDF="${2:-$THESIS_DIR/presentation/diploma-presentation.pdf}"

if [[ ! -f "$INPUT_PPTX" ]]; then
  echo "PPTX not found: $INPUT_PPTX" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUTPUT_PDF")"
rm -f "$OUTPUT_PDF"
TMP_PDF="/tmp/$(basename "${OUTPUT_PDF%.pdf}")-$$.pdf"
rm -f "$TMP_PDF"

osascript <<APPLESCRIPT
set srcFile to POSIX file "$INPUT_PPTX"
set dstFile to POSIX file "$TMP_PDF"
tell application "Microsoft PowerPoint"
  activate
  open srcFile
  delay 5
  save active presentation
  delay 2
  save active presentation in dstFile as save as PDF
  delay 2
  close active presentation saving no
  quit
end tell
APPLESCRIPT

if [[ ! -f "$TMP_PDF" ]]; then
  echo "PDF export failed: temporary file was not created" >&2
  exit 1
fi

mv "$TMP_PDF" "$OUTPUT_PDF"
echo "Saved $OUTPUT_PDF"
