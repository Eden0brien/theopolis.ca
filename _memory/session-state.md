# Session state / handoff

_Last updated: 2026-08-18 by perki (Claude session). Read this first when resuming._

## 🎉 The site is LIVE

**www.theopolis.ca went live 2026-08-17.** The migration off Wix is complete — the domain
serves this repo via GitHub Pages, not Wix. Verified from outside: all 11 pages return 200,
HTTPS certificate valid (expires 2026-11-15), and every legacy Wix URL redirects correctly.

## Who works where

- **Eden O'Brien (`edenobrien`)** — site owner. Works **directly on `main`** and publishes
  herself. She has already done both. Admin on the GitHub repo.
- **perki** — operator. Works on `work/perki`.
- See `CLAUDE.md` for the full rule, including the no-history-rewrite line that applies to
  everyone.

## Publishing

Set up and working:

```bash
cd website && npm run deploy
```

`website/dist/` is a git worktree on `gh-pages`; Astro builds into it; `scripts/publish.sh`
runs safety checks (non-empty homepage, `.nojekyll`, correct branch, CNAME survived) then
commits and pushes. `--no-cname` publishes a preview without claiming the domain.
`public/CNAME` (`www.theopolis.ca`) must never be deleted.

## ✅ Resolved since the last handoff

- **Full migration + Eden's redesign** are live: Artist Fraternity, Events, Support, Gaudí
  Lecture, Contact, Archive, plus typography/layout standardization and event posters.
- **Contact form works.** Eden wired up a real Formspree endpoint (`mjybbboa`), replacing the
  placeholder. Live and verified.
- **Deploy infrastructure finished** — `scripts/publish.sh` was the missing piece.
- **Unlicensed iStock image removed** (`artists/baptism-fresco.jpg`) before going public — its
  licence was never verified and files under `public/` publish whether referenced or not.
- **Favicons + Theopolis wordmark** added by Eden; the placeholder "T" is gone.
- **GitHub outage 2026-08-17** delayed the first deploy ~1h40m (Actions/API major outage). The
  stuck job never recovered; a fresh build via `POST /repos/:owner/:repo/pages/builds` fixed it.
  Worth remembering: a queued Pages job that outlives an outage usually needs re-triggering.

## ⚠ Open items

1. **Page weight.** Images are full-resolution Wix originals — `/archive` alone loads 25
   images, several 5–6 MB, one 16 MB (100 MB+ for that page). Slow on mobile. An optimization
   pass (cap 2400px, JPEG q82, convert photographic PNGs) takes it to ~59 MB total and was
   tested successfully, but **perki deliberately reverted it** so the resized copies never
   entered git history. Redo only if page speed becomes a real complaint — and note it adds a
   second copy of every image to history unless done as a history rewrite.
2. **Artwork rights.** The gallery serves artists' work at print resolution (up to
   4961×6945) — downloadable by anyone. Worth raising with Eden; the artists own these pieces.
3. **Two artwork buy-links still missing** (#4 You Did It To Me — truncated PayPal; #5 The
   Suffering Christ — was a Stripe `test_` link). Both show "Enquire" instead. Need the real
   links from the artist.
4. **Oskirko #15/#16** — image-vs-title may be swapped. Verify (notes in the two `.md` files).
5. **Repo is ~210 MB** (mostly image history). Cloning is slow. Pruning means rewriting shared
   history on a public repo — needs explicit agreement from everyone, Eden included.

## How to resume

```bash
cd /Users/perki/code/misc/theopolis.ca
git fetch && git status
cd website && npm run dev   # preview at localhost:4321
```
