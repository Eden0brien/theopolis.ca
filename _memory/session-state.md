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

## 🌐 Domain wiring — lives OUTSIDE this repo

Two different systems serve the two hostnames. Nothing in the codebase controls either, so if
the domain breaks, **republishing will not fix it** — the fix is in the DNS/registrar account.

| Hostname | Handled by | How |
|---|---|---|
| `www.theopolis.ca` | **GitHub Pages** | CNAME → `eden0brien.github.io`; `public/CNAME` claims the domain |
| `theopolis.ca` (apex) | **GoDaddy domain forwarding** | A → `3.33.251.168` / `15.197.225.128` (AWS Global Accelerator); issues a real `301` to `https://www.theopolis.ca` |

- **DNS is GoDaddy** — nameservers `ns29`/`ns30.domaincontrol.com`. Eden's account.
- The apex forward is a **leftover from the Wix era that happens to still be correct**: it
  always pointed at the `www` hostname, and only the `www` record needed changing at migration.
  It works (a true 301, over both http and https) — leave it alone, but know where it lives.
- **DNS moved off Wix on 2026-08-17.** Before that, `www` pointed at `pointing.wixdns.net`.
  Verified as of 2026-08-18.

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
- **Branded 404 page + stale-URL mapping** (2026-08-18). `src/pages/404.astro` replaces
  GitHub's bare placeholder; 14 guessable/legacy URLs redirect where content genuinely matches
  (`/donate`→`/support`, `/tickets`→`/gaudi-lecture`, `/gallery`→`/archive`, …). Note these are
  **meta-refresh** redirects, not 301s — static hosting can't issue real ones.
  Capitalised URLs (`/Support`) can't be redirects: the build writes to a case-insensitive
  filesystem so they collide with the lowercase route. The 404 page bounces those client-side,
  matching a known route list so a genuinely missing page can't loop.
- **Chiaroscuro proposal retired** — branch and `_plans/proposal-chiaroscuro/` deleted; the
  design predated Eden's redesign and conflicted with it. Tip was `c97ffbd` if ever wanted.
- **Eden's workflow documented** — she works on `main` and publishes; see `CLAUDE.md`.

## ⚠ Open items

### Needs Eden (nobody else can do these)

1. **Enforce HTTPS.** `http://www.theopolis.ca` is still served over plain HTTP — no redirect
   to the secure version. The certificate is valid and installed; enforcement is simply off.
   **Repo Settings → Pages → tick "Enforce HTTPS".** Requires admin, which only Eden has
   (perki has push only). Highest-value item on this list; one click.
2. **54 of 57 images added in the redesign have no credit** in `_migrations/image-credits.md`,
   which hasn't been updated since 2026-06-18. `CLAUDE.md` requires crediting every photo and
   never publishing an image whose rights are unclear. Most are team headshots or artists' own
   work — but **four need provenance checked**, as they look sourced from the web:
   `gaudi-lecture/jonathan-pageau.jpg` (a photo of a living person),
   `gaudi-lecture/sagrada-familia.jpg`, `artists/renoir-banner.jpg`,
   `artists/madonna-and-child-banner.jpg` (the paintings are public domain, but a specific
   *photograph* of one may not be). Only Eden knows where these came from; once she says,
   writing the credits file is quick.
3. **Nothing on the site is for sale — confirm this is intended.** The Archive describes itself
   as "a lasting record… each piece remains the property of the artist", and **no page renders
   a purchase link**, though 11 artwork files still carry `buyUrl` data. This supersedes the
   earlier note about *two* missing buy-links (#4 You Did It To Me, #5 The Suffering Christ):
   the real situation is that **none** of the 23 artworks can be bought. Reads as deliberate
   now the exhibition has become an archive — but worth confirming, since the data is still
   there and `/shop` + `/buy` were deliberately left unredirected on that assumption.
4. **Oskirko #15/#16 may have swapped images.** `15-canticle-of-david.md` and
   `16-a-northern-canadian-nativity.md` both still carry `# NOTE: VERIFY image vs #…`. This is
   live on `/archive` now, and misattributing an artist's work is worth fixing quickly.
   Someone just needs to look at the two pictures.

### Lower priority

5. **Page weight.** Images are full-resolution Wix originals — `/archive` alone loads 25
   images, several 5–6 MB, one 16 MB (100 MB+ for that page). Slow on mobile. An optimization
   pass (cap 2400px, JPEG q82, convert photographic PNGs) takes it to ~59 MB total and was
   tested successfully, but **perki deliberately reverted it** so the resized copies never
   entered git history. Redo only if page speed becomes a real complaint — and note it adds a
   second copy of every image to history unless done as a history rewrite.
6. **Artwork rights vs resolution.** The archive serves artists' work at print resolution (up
   to 4961×6945), downloadable by anyone. Related to #5; the artists own these pieces.
7. **Repo is ~210 MB** (mostly image history). Cloning is slow. Pruning means rewriting shared
   history on a public repo — needs explicit agreement from everyone, Eden included.
8. **Old Wix subscription** may still be billing. DNS has moved, so it serves nothing. Worth
   cancelling once the new site has proven stable — no rush, and don't burn it early.

## How to resume

```bash
cd /Users/perki/code/misc/theopolis.ca
git fetch && git status
cd website && npm run dev   # preview at localhost:4321
```
