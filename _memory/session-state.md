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
Working on **`work/perki`**. Remote: `github.com:Eden0brien/theopolis.ca`.
As of 2026-06-18 both `main` and `work/perki` are pushed and in sync at the same commit
(`e9108c6`) — the user explicitly asked to publish the work to `main` (a clean fast-forward,
no history rewrite). Keep working on `work/perki`; confirm before any further writes to `main`.

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
- **Images downloaded (2026-06-18):** all 48 full-res originals from the Wix CDN →
  `website/public/images/{home,about,exhibition,gallery,events,artists,logos}/`. Friendly
  slugs; gallery files numbered `01..23` to match the snapshot order. ~149 MB total. The 23
  artworks are sharp (e.g. 4961×6945). Not yet wired into any page — content/routes still TODO.
- **Deploy worktree set up (2026-06-18):** `website/dist/` is a git worktree on an **empty
  `gh-pages`** branch; Astro now builds straight into it (`outDir: './dist'`). Because
  `astro build` empties dist/ (deleting the `.git` marker + `.nojekyll`), the build is wrapped:
  `npm prebuild` → `scripts/setup-deploy.sh` (idempotently ensures/relinks the worktree),
  `npm postbuild` → `scripts/post-build.sh` (restores `.git` + `.nojekyll`, checks CNAME).
  `npm run build` self-heals even from a fully deleted dist/. Run `npm run setup:deploy` to
  (re)create it by hand.

## ⏭ Next steps (in order)
1. **Finalize the scrape with Chrome MCP** (the `.mcp.json` here configures `chrome-devtools`;
   it was NOT connected last session). Resolve the open items below, and visually compare the
   rebuild to the live site.
2. ~~**Download full-res images**~~ ✅ DONE — see "Images downloaded" above.
3. **Migrate remaining pages** to content collections + routes (now wire in the images above):
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
6. **Deploy infra:** ⚠ PARTIALLY DONE — the `gh-pages` worktree at `website/dist/` + the
   build-into-dist wiring exist (see "Deploy worktree set up" above). Still TODO: write
   `website/scripts/publish.sh` (npm `deploy` already points at it but the file doesn't exist
   yet). With the new model it's simpler than the reference's — no `_build`/rsync step; just
   `npm run build` then `cd dist && git add -A && git commit && git push origin gh-pages`.
   Keep the double-confirm + CNAME safety checks.
7. **Build, verify, then publish** (double-confirm).

## ⚠ Watch out (spotted 2026-06-18, not yet fixed)
- **Tailwind may not be wired into the build.** `astro.config.mjs` imports `tailwindcss` from
  `@tailwindcss/vite` but never uses it (no `vite: { plugins: [tailwindcss()] }`). The editor
  flags it as unused. The current design leans on CSS-variable tokens in `theme.css`/`palette.css`
  so the build still passes, but any Tailwind utility classes in components would be silently
  inert. Verify before relying on Tailwind utilities.

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
