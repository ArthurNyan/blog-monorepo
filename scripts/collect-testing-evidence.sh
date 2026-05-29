#!/usr/bin/env bash

set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

BASE_URL="${BASE_URL:-http://localhost:4321}"
CMS_URL="${CMS_URL:-http://localhost:1337}"
PREVIEW_URL="${PREVIEW_URL:-http://127.0.0.1:4322}"
DB_PATH="${DB_PATH:-$ROOT_DIR/apps/cms/.tmp/data.db}"
SITEMAP_INDEX="${SITEMAP_INDEX:-$ROOT_DIR/apps/front/dist/client/sitemap-index.xml}"
SITEMAP_FILE="${SITEMAP_FILE:-$ROOT_DIR/apps/front/dist/client/sitemap-0.xml}"
SMOKE_PAGE_SLUG="${SMOKE_PAGE_SLUG:-cms-first-platform}"
SMOKE_ARTICLE_SLUG="${SMOKE_ARTICLE_SLUG:-neea-llc}"
SMOKE_PROJECT_SLUG="${SMOKE_PROJECT_SLUG:-project}"
SMOKE_VACANCY_SLUG="${SMOKE_VACANCY_SLUG:-test-vacancy}"

hard_failures=0
warnings=0

print_section() {
  printf '\n== %s ==\n' "$1"
}

note_ok() {
  printf '[ok] %s\n' "$1"
}

note_warn() {
  warnings=$((warnings + 1))
  printf '[warn] %s\n' "$1"
}

note_fail() {
  hard_failures=$((hard_failures + 1))
  printf '[fail] %s\n' "$1"
}

http_check() {
  local label="$1"
  local url="$2"
  local expected="$3"
  local result status

  if ! result="$(curl -sS -o /dev/null -w '%{http_code}\t%{url_effective}' "$url" 2>/dev/null)"; then
    note_fail "$label -> request failed: $url"
    return
  fi

  status="${result%%$'\t'*}"
  if [[ "$status" == "$expected" ]]; then
    note_ok "$label -> HTTP $status ($url)"
  else
    note_fail "$label -> expected HTTP $expected, got $status ($url)"
  fi
}

http_check_warn() {
  local label="$1"
  local url="$2"
  local expected="$3"
  local result status

  if ! result="$(curl -sS -o /dev/null -w '%{http_code}\t%{url_effective}' "$url" 2>/dev/null)"; then
    note_warn "$label -> request failed: $url"
    return
  fi

  status="${result%%$'\t'*}"
  if [[ "$status" == "$expected" ]]; then
    note_ok "$label -> HTTP $status ($url)"
  else
    note_warn "$label -> expected HTTP $expected, got $status ($url)"
  fi
}

sqlite_query() {
  local label="$1"
  local query="$2"

  if [[ ! -f "$DB_PATH" ]]; then
    note_fail "SQLite database not found: $DB_PATH"
    return
  fi

  print_section "$label"
  if ! sqlite3 "$DB_PATH" "$query"; then
    note_fail "$label query failed"
  fi
}

print_section "Context"
printf 'workspace=%s\n' "$ROOT_DIR"
printf 'base_url=%s\n' "$BASE_URL"
printf 'cms_url=%s\n' "$CMS_URL"
printf 'preview_url=%s\n' "$PREVIEW_URL"
printf 'db_path=%s\n' "$DB_PATH"

print_section "Representative HTTP Checks"
http_check "CMS root redirect" "$CMS_URL/" "302"
http_check "CMS admin" "$CMS_URL/admin" "200"
http_check "Front root redirect page" "$BASE_URL/" "200"
http_check "RU home" "$BASE_URL/ru/" "200"
http_check "EN home" "$BASE_URL/en/" "200"
http_check "RU CMS page" "$BASE_URL/ru/$SMOKE_PAGE_SLUG/" "200"
http_check "RU article detail" "$BASE_URL/ru/articles/$SMOKE_ARTICLE_SLUG/" "200"
http_check "EN article detail" "$BASE_URL/en/articles/$SMOKE_ARTICLE_SLUG/" "200"
http_check "RU project detail" "$BASE_URL/ru/projects/$SMOKE_PROJECT_SLUG/" "200"
http_check "EN project detail" "$BASE_URL/en/projects/$SMOKE_PROJECT_SLUG/" "200"
http_check "Vacancy detail" "$BASE_URL/vacancies/$SMOKE_VACANCY_SLUG/" "200"
http_check_warn "Static preview root" "$PREVIEW_URL/" "200"
http_check "Preview invalid secret" "$BASE_URL/api/preview?secret=bad&locale=ru&type=page&slug=$SMOKE_PAGE_SLUG&status=draft" "401"

print_section "Sitemap Checks"
if [[ -f "$SITEMAP_INDEX" ]]; then
  note_ok "sitemap-index.xml present"
else
  note_fail "Missing sitemap-index.xml: $SITEMAP_INDEX"
fi

if [[ -f "$SITEMAP_FILE" ]]; then
  note_ok "sitemap-0.xml present"
  url_count="$(grep -o '<loc>' "$SITEMAP_FILE" | wc -l | tr -d ' ')"
  printf 'url_count=%s\n' "$url_count"

  grep -q "<loc>${BASE_URL}/ru/</loc>" "$SITEMAP_FILE" \
    && note_ok "RU home present in sitemap" \
    || note_fail "RU home missing from sitemap"
  grep -q "<loc>${BASE_URL}/en/</loc>" "$SITEMAP_FILE" \
    && note_ok "EN home present in sitemap" \
    || note_fail "EN home missing from sitemap"
  grep -q "<loc>${BASE_URL}/ru/articles/${SMOKE_ARTICLE_SLUG}/</loc>" "$SITEMAP_FILE" \
    && note_ok "RU article detail present in sitemap" \
    || note_fail "RU article detail missing from sitemap"
  grep -q "<loc>${BASE_URL}/en/articles/${SMOKE_ARTICLE_SLUG}/</loc>" "$SITEMAP_FILE" \
    && note_ok "EN article detail present in sitemap" \
    || note_fail "EN article detail missing from sitemap"
  grep -q "<loc>${BASE_URL}/ru/projects/${SMOKE_PROJECT_SLUG}/</loc>" "$SITEMAP_FILE" \
    && note_ok "RU project detail present in sitemap" \
    || note_fail "RU project detail missing from sitemap"
  grep -q "<loc>${BASE_URL}/en/projects/${SMOKE_PROJECT_SLUG}/</loc>" "$SITEMAP_FILE" \
    && note_ok "EN project detail present in sitemap" \
    || note_fail "EN project detail missing from sitemap"
  grep -q "<loc>${BASE_URL}/vacancies/${SMOKE_VACANCY_SLUG}/</loc>" "$SITEMAP_FILE" \
    && note_ok "Vacancy detail present in sitemap" \
    || note_fail "Vacancy detail missing from sitemap"

  if grep -q "<loc>${BASE_URL}/articles/</loc>" "$SITEMAP_FILE"; then
    note_fail "Legacy /articles route still present in sitemap"
  else
    note_ok "Legacy /articles route absent from sitemap"
  fi

  if grep -q "<loc>${BASE_URL}/projects/</loc>" "$SITEMAP_FILE"; then
    note_fail "Legacy /projects route still present in sitemap"
  else
    note_ok "Legacy /projects route absent from sitemap"
  fi

  grep -Eq "<loc>${BASE_URL}/en/articles/[^<]+</loc>" "$SITEMAP_FILE" \
    && note_ok "EN article detail entries present in sitemap" \
    || note_fail "EN article detail entries absent from sitemap"

  grep -Eq "<loc>${BASE_URL}/en/projects/[^<]+</loc>" "$SITEMAP_FILE" \
    && note_ok "EN project detail entries present in sitemap" \
    || note_fail "EN project detail entries absent from sitemap"
else
  note_fail "Missing sitemap-0.xml: $SITEMAP_FILE"
fi

sqlite_query "SQLite: strapi_webhooks" \
  "select name,url,events,enabled from strapi_webhooks order by id desc;"
sqlite_query "SQLite: lead_submissions" \
  "select id,full_name,email,source,form_name from lead_submissions order by id desc limit 5;"
sqlite_query "SQLite: vacancy_applications" \
  "select id,full_name,email,source,hr_status from vacancy_applications order by id desc limit 5;"

print_section "Summary"
printf 'hard_failures=%s\n' "$hard_failures"
printf 'warnings=%s\n' "$warnings"

if [[ "$hard_failures" -gt 0 ]]; then
  exit 1
fi
