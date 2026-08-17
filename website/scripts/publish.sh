#!/usr/bin/env bash
#
# Publish the site to GitHub Pages.
#
#   npm run deploy
#
# Builds into dist/ (a git worktree on the `gh-pages` branch), then commits and
# pushes that branch. GitHub Pages serves whatever lands on gh-pages.
#
# PUBLISHING IS DESTRUCTIVE — it overwrites what is currently live. The operator
# workflow (see ../../CLAUDE.md) requires confirming twice before running this.
# The script confirms once more on its own when run from a terminal; in a
# non-interactive context set CONFIRM=yes (or pass --yes) to proceed.
#
# By default the custom domain (public/CNAME) must survive into the build, or we
# refuse — dropping it is how a custom domain silently breaks. To publish a
# preview WITHOUT claiming the domain (e.g. to view the site on its github.io
# address while DNS still points elsewhere), pass --no-cname. That is a
# deliberate choice, never a fallback: public/CNAME itself is left untouched.

set -euo pipefail

cd "$(dirname "$0")/.."                      # -> website/

YES="${CONFIRM:-}"
NO_CNAME="${NO_CNAME:-}"
for arg in "$@"; do
  case "$arg" in
    --yes)      YES=yes ;;
    --no-cname) NO_CNAME=yes ;;
    *) echo "Unknown option: $arg" >&2; exit 2 ;;
  esac
done

# ── 1. Confirm ───────────────────────────────────────────────────────
if [[ "$YES" != "yes" ]]; then
  if [[ -t 0 ]]; then
    echo "You are about to publish the site to the public. This overwrites what is live now."
    read -r -p "Type 'publish' to continue: " reply
    [[ "$reply" == "publish" ]] || { echo "Aborted — nothing was published."; exit 1; }
  else
    echo "Refusing to publish without confirmation. Re-run with CONFIRM=yes." >&2
    exit 1
  fi
fi

# ── 2. Note what we are publishing, and warn on uncommitted source ───
SRC_COMMIT="$(git rev-parse --short HEAD)"
SRC_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ -n "$(git status --porcelain -- . ':!dist')" ]]; then
  echo "⚠ Source has uncommitted changes — publishing the working tree as-is, not $SRC_COMMIT." >&2
fi

# ── 3. Build (prebuild/postbuild keep the dist/ worktree healthy) ────
echo "→ Building…"
npm run build

# ── 4. Safety checks on the built output ─────────────────────────────
[[ -s dist/index.html ]] || { echo "✗ dist/index.html is missing or empty — refusing to publish." >&2; exit 1; }

# The custom domain lives or dies by this file. Without it GitHub Pages drops
# www.theopolis.ca on the very next push.
if [[ "$NO_CNAME" == "yes" ]]; then
  # Deliberate preview publish: strip the domain from the OUTPUT only, so the
  # site answers on its github.io address instead of redirecting to the custom
  # domain. public/CNAME (the source of truth) is never touched.
  rm -f dist/CNAME
  echo "⚠ Publishing WITHOUT the custom domain (--no-cname). public/CNAME is untouched;"
  echo "  re-publish without the flag to claim www.theopolis.ca again."
else
  [[ -s dist/CNAME ]] || { echo "✗ dist/CNAME is missing — refusing to publish (custom domain would break)." >&2; exit 1; }
  if ! diff -q public/CNAME dist/CNAME >/dev/null; then
    echo "✗ dist/CNAME does not match public/CNAME — refusing to publish." >&2
    exit 1
  fi
fi

[[ -f dist/.nojekyll ]] || { echo "✗ dist/.nojekyll is missing — Pages would ignore _astro/." >&2; exit 1; }

BRANCH="$(git -C dist branch --show-current)"
[[ "$BRANCH" == "gh-pages" ]] || { echo "✗ dist/ is on '$BRANCH', not gh-pages — refusing to publish." >&2; exit 1; }

# ── 5. Commit + push the built site ──────────────────────────────────
git -C dist add -A
if git -C dist diff --cached --quiet; then
  echo "✓ Nothing changed — the live site already matches this build."
  exit 0
fi

git -C dist commit -q -m "Publish site from ${SRC_BRANCH} @ ${SRC_COMMIT}"
echo "→ Pushing gh-pages…"
git -C dist push -u origin gh-pages

if [[ "$NO_CNAME" == "yes" ]]; then
  echo "✓ Pushed to gh-pages (no custom domain). Serves from the repo's github.io address"
  echo "  once GitHub Pages is enabled for the gh-pages branch."
else
  echo "✓ Published. Live at https://$(cat public/CNAME) once DNS points at GitHub Pages."
fi
