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
  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = BUILD_TIME;
        return item;
      },
    }),
    pagefind(),
  ],
  outDir: './_build',
  // ── Legacy Wix URLs ──────────────────────────────────────────────
  // Map former public Wix URLs to their new home so search-index entries and
  // external links don't hit 404s. On GitHub Pages these are served as static
  // meta-refresh redirects + canonical (true 301s aren't possible without a server).
  // Fill in as pages are migrated from the _migrations/ snapshot.
  redirects: {
    '/home': '/',
  },
});
