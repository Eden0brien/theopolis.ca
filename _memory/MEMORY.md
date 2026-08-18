# Memory index

One line per memory. Read the linked file for detail.

- [session-state.md](session-state.md) — **read first.** Current state of the migration + the next task list + open items.
- [Migration plan](../_plans/01-migration.md) — full plan, decisions log, page-by-page status.
- [Wix snapshot](../_migrations/wix-snapshot.md) — content of all 10 old Wix pages + image/link inventory (source of truth).

## Quick facts
- **Project:** theopolis.ca (Catholic-arts foundation, Toronto). Astro 5 + Tailwind v4, English only, GitHub Pages. **Live since 2026-08-17** — the Wix migration is done.
- **Astro project lives in** `website/`. Run npm from there.
- **Design system:** forked locally ("theopolis-style"), CSS-variable tokens `--thp-*`. Palette "Sanctuary" (parchment / ink / burgundy / gold). Fonts: Cormorant Garamond + EB Garamond.
- **Operator workflow:** non-coders. **Eden (`edenobrien`) works on `main` and publishes**; everyone else uses `work/<whoami>`. Double-confirm before publishing; never rewrite `main` history. See [../CLAUDE.md](../CLAUDE.md).
- **Publish:** `cd website && npm run deploy`.
- **Domain:** www.theopolis.ca (in `website/public/CNAME` — never delete).
