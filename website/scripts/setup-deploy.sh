#!/usr/bin/env bash
#
# Ensure ./dist is a git worktree checked out on the (empty) `gh-pages` branch.
#
# This is what makes the deploy setup "always there": it is idempotent and runs
# automatically before every build (npm `prebuild`). Run it by hand any time with
#   npm run setup:deploy
#
# It self-heals the common case where `astro build` empties dist/ and deletes the
# worktree marker (dist/.git) — git still tracks the worktree, so we just relink.

set -euo pipefail

cd "$(dirname "$0")/.."                      # -> website/
ROOT="$(git rev-parse --show-toplevel)"
ADMIN="$ROOT/.git/worktrees/dist"            # git's bookkeeping dir for the worktree

relink() { printf 'gitdir: %s\n' "$ADMIN" > dist/.git; }

# 1. Already a healthy gh-pages worktree → nothing to do.
if [[ -f dist/.git && -d "$ADMIN" \
      && "$(git -C dist branch --show-current 2>/dev/null)" == "gh-pages" ]]; then
  exit 0
fi

# 2. git still tracks the worktree but the marker is gone (e.g. wiped by a build)
#    → just rewrite dist/.git to point back at the bookkeeping dir.
if [[ -d "$ADMIN" ]]; then
  mkdir -p dist
  relink
  echo "→ Re-linked dist/ to the gh-pages worktree."
  exit 0
fi

# 3. Fresh setup: create the worktree. Reuse the gh-pages branch if it already
#    exists locally or on the remote; otherwise create it as an empty orphan.
rm -rf dist
if git show-ref --verify --quiet refs/heads/gh-pages; then
  git worktree add dist gh-pages
elif git ls-remote --exit-code --heads origin gh-pages >/dev/null 2>&1; then
  git fetch origin gh-pages:gh-pages
  git worktree add dist gh-pages
else
  git worktree add --orphan -b gh-pages dist
fi
echo "→ Created dist/ worktree on the gh-pages branch."
