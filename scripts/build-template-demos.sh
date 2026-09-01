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
# BUILD_STATIC_DEMO / NEXT_PUBLIC_DEMO_BASE_PATH.

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
  "beauty-wellness-2:beauty-wellness/template-2"
  "e-commerce:e-commerce/template-1"
  "restaurant-cafe:restaurant-cafe/template-1"
  "restaurant-cafe-2:restaurant-cafe/template-2"
  "organization:organization/template-1"
  "community-pro:organization/template-2"
  "property:property/template-1"
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
  (
    cd "$template_dir"
    npm install --no-audit --no-fund
    BUILD_STATIC_DEMO=true NEXT_PUBLIC_DEMO_BASE_PATH="/demo/$name" ./node_modules/.bin/next build
  )

  DEMO_NAME="$name" OUT_DIR="$out_dir" node <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const outDir = process.env.OUT_DIR;
const demoPrefix = `/demo/${process.env.DEMO_NAME}`;
const extensions = new Set([".html", ".js", ".css"]);
const publicDirs = ["/images/", "/fonts/", "/assets/", "/img/"];

function rewrite(content) {
  let updated = content;

  for (const publicDir of publicDirs) {
    updated = updated.split(publicDir).reduce((result, part, index) => {
      if (index === 0) {
        return part;
      }

      const currentToken = result.match(/[^"'`\\\s)]*$/)?.[0] ?? "";
      const alreadyPrefixed = /\/demo\/[^"'`\\\s)]*$/.test(currentToken);
      const isExternalUrl = /^(https?:)?\/\//.test(currentToken);
      return `${result}${alreadyPrefixed || isExternalUrl ? "" : demoPrefix}${publicDir}${part}`;
    }, "");
  }

  return updated;
}

function visit(currentDir) {
  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const currentPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      visit(currentPath);
      continue;
    }

    if (!extensions.has(path.extname(entry.name))) {
      continue;
    }

    const original = fs.readFileSync(currentPath, "utf8");
    const updated = rewrite(original);

    if (updated !== original) {
      fs.writeFileSync(currentPath, updated);
    }
  }
}

visit(outDir);
NODE

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
