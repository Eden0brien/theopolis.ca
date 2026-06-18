# Memory index

One line per memory. Read the linked file for detail.

- [session-state.md](session-state.md) — **read first.** Current state of the migration + the next task list + open items.
- [Migration plan](../_plans/01-migration.md) — full plan, decisions log, page-by-page status.
- [Wix snapshot](../_migrations/wix-snapshot.md) — content of all 10 old Wix pages + image/link inventory (source of truth).

## Quick facts
- **Project:** rebuild theopolis.ca (Catholic-arts foundation, Toronto) off Wix → Astro 5 + Tailwind v4, English only, GitHub Pages.
- **Astro project lives in** `website/`. Run npm from there.
- **Design system:** forked locally ("theopolis-style"), CSS-variable tokens `--thp-*`. Palette "Sanctuary" (parchment / ink / burgundy / gold). Fonts: Cormorant Garamond + EB Garamond.
- **Operator workflow:** non-coders; work on `work/<whoami>`, never `main`; double-confirm before publishing. See [../CLAUDE.md](../CLAUDE.md).
- **Domain:** www.theopolis.ca (in `website/public/CNAME` — never delete).
