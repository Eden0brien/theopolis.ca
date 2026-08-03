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
    '/home': '/',
    '/about-us': '/about',
    '/2026-exhibition': '/exhibition',
    // The exhibition catalogue now lives on its own Archive page.
    '/exhibition-gallery': '/archive',
    '/exhibition/gallery': '/archive',
    '/events-2': '/events',
    '/artist-fraternity': '/artists',
    // Journal ("The Tempest") is not published yet — send legacy blog links home.
    '/blog': '/',
    '/english-privacy-policy': '/privacy',
    '/accessibility-statement': '/accessibility',
  },
});
