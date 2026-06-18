#!/usr/bin/env bash
#
# Runs automatically after `astro build` (npm `postbuild`).
#
# `astro build` empties dist/ before writing, which deletes:
#   - dist/.git    → the worktree marker (git still has the bookkeeping dir)
#   - dist/.nojekyll → tells GitHub Pages to serve _astro/ (underscore) dirs
# Restore both so dist/ is a valid gh-pages worktree ready to commit + push.

set -euo pipefail

cd "$(dirname "$0")/.."                      # -> website/
ROOT="$(git rev-parse --show-toplevel)"
ADMIN="$ROOT/.git/worktrees/dist"

printf 'gitdir: %s\n' "$ADMIN" > dist/.git   # relink the worktree
touch dist/.nojekyll                          # GitHub Pages: don't run Jekyll

# CNAME flows through from public/CNAME via Astro's static copy. Verify it landed —
# without it GitHub Pages would drop the custom domain on the next publish.
if [[ ! -s dist/CNAME ]]; then
  echo "⚠ dist/CNAME is missing after build — check public/CNAME (custom domain at risk)." >&2
fi

echo "✓ Built into dist/ (gh-pages worktree relinked, .nojekyll set)."
