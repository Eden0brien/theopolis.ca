# Plan 01 — Migrate theopolis.ca off Wix to Astro

## Objective
Rebuild [theopolis.ca](https://www.theopolis.ca) as a static Astro site that mirrors the
"flavor" (stack, structure, operator workflow) of the HDS reference site
(`/Users/perki/code/hds/_macro2/website`) — but with Theopolis branding and English only —
operated by non-coders and published to GitHub Pages.

## Decisions log
| # | Decision | Choice |
|---|---|---|
| 1 | Design system | **Fork** locally into "theopolis-style" (no `hds-style` dependency) |
| 2 | Languages | **English only** (no i18n) |
| 3 | Scope | **Full migration** of every page |
| 4 | Structure | Mirror reference wrapper (`website/` code + `_plans`/`_memory`/`_migrations` meta + operator `CLAUDE.md`) |
| 5 | Images | Full-resolution Wix CDN originals, credited |
| 6 | Hosting | GitHub Pages, custom domain `www.theopolis.ca` |

## Brand / design
- Palette "Sanctuary": background `#FBF8F1`, ink `#211C18`, primary burgundy `#6E2B34`,
  antique gold `#B08C4F`. Tokens are CSS vars `--thp-*`.
- Type: Cormorant Garamond (display/headings) + EB Garamond (body) — gallery / ecclesial feel.

## Page migration status
| Old Wix slug | New route | Collection | Status |
|---|---|---|---|
| `/` | `/` | (page route) | ✅ homepage built |
| `/about-us` | `/about` | pages | ⏳ todo |
| `/2026-exhibition` | `/exhibition` | pages | ⏳ todo |
| `/exhibition-gallery` | `/exhibition/gallery` | artworks (23) | ⏳ todo |
| `/support` | `/support` | pages | ⏳ todo |
| `/events-2` | `/events` | pages | ⏳ todo |
| `/artist-fraternity` | `/artists` | artists | ⏳ todo |
| `/blog` | `/journal` | journal (empty) | ⏳ todo |
| `/english-privacy-policy` | `/privacy` | pages | ⏳ REWRITE (Wix boilerplate) |
| `/accessibility-statement` | `/accessibility` | pages | ⏳ REWRITE (Wix boilerplate) |

## Cross-cutting tasks
- [ ] Finalize scrape with Chrome MCP (open items in `_memory/session-state.md`)
- [ ] Download full-res images → `website/public/images/`, with credits
- [ ] Decide contact-form backend (Formspree / Netlify / mailto) — Wix forms don't work statically
- [ ] Real Theopolis logo + favicon (placeholder in place)
- [ ] Wix legacy-URL redirects in `astro.config.mjs`
- [ ] Deploy infra: `website/scripts/publish.sh` + `gh-pages` worktree (first publish)
- [ ] External checkout links preserved as-is (Zeffy, Eventbrite, PayPal, Stripe, Square, Spotify)

## Notes
- Contact is **form-only** on the live site; no email/phone/social published anywhere.
- Commerce is fragmented across 5 processors with per-artwork links — keep as external links.
- Verify the `test_` Stripe link on "The Suffering Christ" before going live.
