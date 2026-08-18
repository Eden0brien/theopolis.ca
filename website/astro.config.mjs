import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

// Build timestamp, stamped onto every sitemap entry's <lastmod>. The whole static
// site is regenerated and redeployed together, so the build time is a fair
// <lastmod> for every URL — a crawl-priority signal we'd otherwise lack.
const BUILD_TIME = new Date().toISOString();

export default defineConfig({
  site: 'https://www.theopolis.ca',
  // Honour the PORT env var when present (e.g. a preview proxy assigns one),
  // otherwise fall back to Astro's default 4321.
  server: { port: process.env.PORT ? Number(process.env.PORT) : 4321 },
  // Tailwind v4 is delivered through its Vite plugin; without this registered,
  // the `@import "tailwindcss"` in global.css never compiles and every utility
  // class is inert (the page renders unstyled).
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = BUILD_TIME;
        return item;
      },
    }),
    pagefind(),
  ],
  // Build straight into ./dist — a git worktree checked out on the `gh-pages`
  // branch (see scripts/setup-deploy.sh). Publishing = commit + push from there.
  outDir: './dist',
  // ── Legacy Wix URLs ──────────────────────────────────────────────
  // Map former public Wix URLs to their new home so search-index entries and
  // external links don't hit 404s. On GitHub Pages these are served as static
  // meta-refresh redirects + canonical (true 301s aren't possible without a server).
  // Fill in as pages are migrated from the _migrations/ snapshot.
  redirects: {
    // ── The ten real Wix pages (see _migrations/wix-snapshot.md) ──
    '/home': '/',
    '/about-us': '/about',
    '/2026-exhibition': '/exhibition',
    // The exhibition catalogue now lives on its own Archive page.
    '/exhibition-gallery': '/archive',
    '/exhibition/gallery': '/archive',
    '/events-2': '/events',
    '/artist-fraternity': '/artists',
    // Journal ("The Tempest") is not published yet — send legacy links home.
    '/blog': '/',
    '/english-privacy-policy': '/privacy',
    '/accessibility-statement': '/accessibility',

    // Capitalised variants (/Support, /About-Us…) are NOT listed here: they
    // collide with the lowercase route at build time, because the build writes
    // to a case-insensitive filesystem. The 404 page handles case client-side.

    // ── Guessable URLs people type or that appeared in old material. ──
    // Only mapped where the destination genuinely carries the same content.
    '/journal': '/',              // route removed; matches /blog above
    '/the-tempest': '/',          // the journal's public name
    '/gallery': '/archive',       // the exhibition catalogue
    '/exhibition-2026': '/exhibition',
    '/drama-of-the-soul': '/exhibition',   // the exhibition's title
    '/team': '/about',            // team cards live on About
    '/contact-us': '/contact',
    '/artist': '/artists',
    '/membership': '/artists',    // memberships are described there
    '/donate': '/support',        // Support is the donation page
    '/sponsor': '/support',
    '/tickets': '/gaudi-lecture', // ticket details live on the lecture page
    '/lecture': '/gaudi-lecture',
    '/gaudi': '/gaudi-lecture',

    // Deliberately NOT redirected — no equivalent page exists, so these fall
    // through to the branded 404 rather than to a page that can't help:
    //   /shop, /buy  — the Archive is a record, not a shop; nothing is for sale
    //   /volunteer   — not mentioned anywhere on the site
  },
});
