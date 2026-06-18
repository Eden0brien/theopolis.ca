# Session state / handoff

_Last updated: 2026-06-18 by perki (Claude session). Read this first when resuming._

## Goal
Migrate **theopolis.ca** off Wix to a static **Astro** site with the same "flavor" (tech stack,
structure, operator workflow) as the HDS reference at
`/Users/perki/code/hds/_macro2/website`, but with **theopolis branding** and **English only**.
Site will be operated by non-coders and published to **GitHub Pages**.

## Decisions locked in (from the user)
1. **Design system:** *fork* it locally into "theopolis-style" (don't depend on the `hds-style`
   npm package). Done — `website/src/styles/theme.css` + `palette.css`.
2. **Languages:** **English only** (no i18n, root-level routes).
3. **Scope:** **full migration** of every page.
4. **Structure:** keep the reference's wrapper structure + operator `CLAUDE.md` directives.
5. **Images:** download **full-resolution** originals from the Wix CDN, well credited.

## Branch
Working on **`work/perki`** (per the operator directive). `main` is untouched. Nothing committed
yet — all work is uncommitted in the working tree. Remote: `github.com:Eden0brien/theopolis.ca`.

## ✅ Done
- Scraped all 10 live Wix pages → **`_migrations/wix-snapshot.md`** (source of truth).
- Scaffolded the Astro project in **`website/`** — `npm install` + `npm run build` both pass.
  - `astro.config.mjs` (sitemap + pagefind, `_build` output, Wix legacy redirects stub)
  - Forked design system: `src/styles/theme.css`, `palette.css`, `global.css`
    - Palette "Sanctuary": bg `#FBF8F1`, ink `#211C18`, primary burgundy `#6E2B34`,
      gold `#B08C4F`. Fonts: Cormorant Garamond (display) + EB Garamond (body).
  - `src/layouts/BaseLayout.astro` (SEO/OG/JSON-LD, skip-link, back-to-top)
  - `src/components/Header.astro` (sticky blur nav + donate pill + mobile menu)
  - `src/components/Footer.astro`
  - `src/content.config.ts` — collections: `pages`, `artworks`, `artists`, `journal`
  - `src/pages/index.astro` — homepage (hero → What We Do → Why It Matters → Join)
  - `public/`: `CNAME` (www.theopolis.ca), `robots.txt`, placeholder `favicon.svg`
- Wrapper meta: this file, `CLAUDE.md`, `_plans/01-migration.md`, `_memory/MEMORY.md`.

## ⏭ Next steps (in order)
1. **Finalize the scrape with Chrome MCP** (the `.mcp.json` here configures `chrome-devtools`;
   it was NOT connected last session). Resolve the open items below, and visually compare the
   rebuild to the live site.
2. **Download full-res images** from the Wix CDN into `website/public/images/` (strip transform
   params → keep up to `~mv2.<ext>`). The 23 exhibition artworks especially must be sharp.
3. **Migrate remaining pages** to content collections + routes:
   - `/about`, `/exhibition`, `/exhibition/gallery` (23 artworks), `/support`, `/events`,
     `/artists`, `/journal` (empty placeholder), `/privacy` (REWRITE), `/accessibility` (REWRITE).
   - Wire the old Wix slugs into `astro.config.mjs` `redirects` (e.g. `/about-us`→`/about`,
     `/2026-exhibition`→`/exhibition`, `/events-2`→`/events`, `/artist-fraternity`→`/artists`,
     `/exhibition-gallery`→`/exhibition/gallery`, `/english-privacy-policy`→`/privacy`,
     `/accessibility-statement`→`/accessibility`, `/blog`→`/journal`).
4. **Contact forms:** Wix forms won't work on a static site. Decide a backend (Formspree /
   Netlify Forms / plain `mailto:`). Ask the user. Appears on Home, About, Support.
5. **Real logo + favicon:** current favicon is a placeholder "T". Get the real Theopolis logo
   (look for it in the Wix media — there are several `Theopolis logo` images in the snapshot).
6. **Deploy infra:** create `website/scripts/publish.sh` + the `gh-pages` worktree at
   `website/dist/` the first time publish is requested (mirror the reference's publish.sh).
7. **Build, verify, then publish** (double-confirm).

## ⚠ Open items to verify on the live site (need Chrome MCP)
1. **"More" nav dropdown** — JS-rendered, never expanded. By elimination it holds The Tempest
   (`/blog`) + likely Privacy/Accessibility. Confirm.
2. **"You Did It To Me"** artwork — PayPal buy-link was truncated in the scrape. Recapture.
3. **Oskirko artworks** (#15 Canticle of David / #16 A Northern Canadian Nativity) — the two
   `.webp` image filenames may be swapped. Verify which image goes with which title.
4. **"The Suffering Christ"** — its Stripe link is a `test_` link
   (`https://buy.stripe.com/test_...`). A test link won't take real payment — confirm the real one.

## How to resume
```bash
cd /Users/perki/code/misc/theopolis.ca
git status                 # see uncommitted scaffold
cd website && npm run dev  # preview at localhost:4321
```
Then say "continue" — start at Next step #1 (finalize scrape via Chrome MCP).
