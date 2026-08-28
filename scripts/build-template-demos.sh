#!/usr/bin/env bash
# Builds static demo exports for templates and wires them into
# frontend/public/demo/<name> so the Design gallery's "Lihat" button
# can serve the real template build.
#
# Usage:
#   scripts/build-template-demos.sh          # local dev: symlink (no duplicate files)
#   scripts/build-template-demos.sh --copy    # CI/deploy: real copy (uploadable, no symlink)
#
# Add a new template to DEMOS below once its next.config.js supports
# BUILD_STATIC_DEMO / NEXT_PUBLIC_DEMO_BASE_PATH and it has a
# "build:demo" npm script (see templates/automotive/template-1).

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="symlink"
if [[ "${1:-}" == "--copy" ]]; then
  MODE="copy"
fi

# name -> path relative to templates/
DEMOS=(
  "automotive:automotive/template-1"
  "beauty-wellness:beauty-wellness/template-1"
  "restaurant-cafe:restaurant-cafe/template-1"
  "restaurant-cafe-2:restaurant-cafe/template-2"
  "organization:organization/template-1"
  "community-pro:organization/template-2"
)

DEMO_ROOT="$REPO_ROOT/frontend/public/demo"
mkdir -p "$DEMO_ROOT"

for entry in "${DEMOS[@]}"; do
  name="${entry%%:*}"
  rel_path="${entry#*:}"
  template_dir="$REPO_ROOT/templates/$rel_path"
  out_dir="$template_dir/out"
  target="$DEMO_ROOT/$name"

  echo "==> Building demo: $name ($rel_path)"
  (cd "$template_dir" && npm install --no-audit --no-fund && npm run build:demo)

  rm -rf "$target"

  if [[ "$MODE" == "copy" ]]; then
    mkdir -p "$target"
    cp -R "$out_dir/." "$target/"
    echo "==> Copied $out_dir -> $target"
  else
    ln -s "../../../templates/$rel_path/out" "$target"
    echo "==> Linked $target -> templates/$rel_path/out"
  fi
done

echo "==> Done."
