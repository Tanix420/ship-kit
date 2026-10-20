#!/usr/bin/env bash
# verify.sh — the gate. An agent (or human) is not "done" until this exits 0.
# Depends on: bash, find, node >= 18. No npm required.
set -euo pipefail
cd "$(dirname "$0")"

fail() { echo "VERIFY FAILED: $1" >&2; exit 1; }

command -v node >/dev/null 2>&1 || fail "Node.js not found (need >=18)"
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
[ "$NODE_MAJOR" -ge 18 ] || fail "Node.js >=18 required, found $(node --version)"

echo "[1/3] Syntax check (node --check on all repo JS)..."
while IFS= read -r -d '' f; do
  node --check "$f" || fail "syntax error in $f"
done < <(find . -path ./dist -prune -o -name '*.js' -not -path './node_modules/*' -print0)

echo "[2/3] Tests (node:test)..."
node --test test/ || fail "tests failed"

echo "[3/3] Build (public/ -> dist/)..."
node scripts/build.js || fail "build failed"

[ -f dist/index.html ] || fail "dist/index.html missing after build"

echo ""
echo "ALL CHECKS PASSED — verified $(date -u '+%Y-%m-%dT%H:%M:%SZ') on $(node --version)"
