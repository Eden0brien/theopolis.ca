# Theopolis — Website workspace

This repository holds the rebuild of [theopolis.ca](https://www.theopolis.ca). The site is
migrating off **Wix** to a static **Astro** site published on **GitHub Pages**.

**Audience:** this workspace is operated by **non-developers**. When you (Claude) speak to
them, use plain language. Don't make them learn git, branches, or build tools — do that work
for them and report back in human terms.

> **Read [`_memory/MEMORY.md`](_memory/MEMORY.md) and [`_memory/session-state.md`](_memory/session-state.md)
> early in every session** to pick up current state and the next task.

---

## At session start

Run these checks **before** doing the user's task. Take the steps yourself; ask in plain
English only when there's a real decision.

### 1. Identify the user
The machine login (`whoami`) is the user's identity. Use it verbatim as the branch suffix:
`perki` → branch `work/perki`.

### 2. Make sure their branch is current
a. They should be on `work/<whoami>` (create it from `main` if missing).
b. Switch to it if not already there.
c. `git fetch`; if `work/<whoami>` is behind `main`, bring it up to date automatically and say
   so in one sentence ("I brought your branch up to date with the latest changes.").
d. If that conflicts, stop and surface it. Never resolve silently.

### 3. Then start the user's task.

---

## ⭐ Pending: a design "refresh" is proposed and awaiting Eden's decision

A complete alternative visual direction — **"Chiaroscuro"** — has been built and is waiting
on a branch. The live design on `main` is untouched.

- **Where:** branch `redesign/chiaroscuro-refresh`. Rationale + screenshots are on `main` at
  [`_plans/proposal-chiaroscuro/`](_plans/proposal-chiaroscuro/) (see its `README.md`).
- **Who decides:** **Eden O'Brien** (the site owner). perki (the operator) has already seen it.
- **What to do:** When **Eden** is in a session — or any time the owner hasn't yet been shown
  this — **proactively bring it up once, early.** Briefly explain *why* it was proposed (the
  current site reads as a safe template; this gives it gallery-catalogue drama fit for *The
  Drama of the Soul*), then offer to preview it. To show it: `git switch
  redesign/chiaroscuro-refresh`, `cd website && npm run dev`, and walk her through — or show the
  screenshots in `_plans/proposal-chiaroscuro/`.
- **If she likes it:** merge `redesign/chiaroscuro-refresh` into `work/<her-whoami>` for her, in
  plain language. **If not:** delete the branch; nothing on `main` changes either way.
- Once she has decided, remove this section.

---

## Unless the user explicitly asks otherwise
- **Always work on `work/<whoami>`.** Never commit to `main` directly.
- **Never push, force-push, rebase, or rewrite history on `main`.**
- **Never modify another user's `work/...` branch.**

---

## Where things live

| Path | What's there |
|---|---|
| [`website/`](website/) | The Astro project (the actual site). Run `npm` commands from here. |
| [`_migrations/`](_migrations/) | Snapshot of the old Wix site — every page's content + image list. Source of truth for migration. |
| [`_plans/`](_plans/) | The migration plan + decisions log. |
| [`_memory/`](_memory/) | Conventions, current state, session handoff. Read `MEMORY.md` first. |

The Astro project nests under `website/` to mirror the HDS reference workspace
(`/Users/perki/code/hds/_macro2/website`), whose conventions this workspace follows.

---

## Working on the site (for Claude)

```bash
cd website
npm install        # first time only
npm run dev        # local preview at http://localhost:4321
npm run build      # production build → website/_build/
```

- **Design system:** forked locally into `website/src/styles/theme.css` + `palette.css`
  (the "theopolis-style"). Colours are CSS variables (`--thp-primary`, `--thp-gold`, …) —
  components never hard-code colours. Palette is "Sanctuary": parchment + ink + liturgical
  burgundy + antique gold. Fonts: Cormorant Garamond (display) + EB Garamond (body).
- **Content:** markdown in `website/src/content/{pages,artworks,artists,journal}`. Routes read
  those collections, so non-coders edit content without touching layout code.
- **English only.** No i18n. Routes are at the root (`/about`, not `/en/about`).

---

## Publishing the site (going live) — set up on first request

The site deploys to GitHub Pages. The deploy infrastructure (a `gh-pages` branch checked out as
a `website/dist/` worktree + `website/scripts/publish.sh`) is **not set up yet** — create it
silently the first time the user asks to publish. See `_memory/session-state.md`.

### Publishing is destructive — confirm TWICE
1. *"You're about to publish the current site to the public at theopolis.ca. The whole world
   will see it. Are you sure?"*
2. If yes — then: *"Last check: still want to publish? This overwrites what's live now."*
3. Only after the second yes, run the publish and report the outcome.

### CNAME must always be present
`website/public/CNAME` contains the custom domain (`www.theopolis.ca`). **Never delete or
overwrite it.** It's what tells GitHub Pages which domain to serve; without it the custom domain
breaks on the next push.

---

## Photos and images
**Credit every photo.** When adding an image (Wix export, Unsplash, Wikimedia, anywhere),
record the source/artist/license. For artwork in the exhibition, the **artist owns the piece** —
attribute it to them. Place credits beneath the image. **Never publish an image whose license
or rights are unclear — ask first.**

When pulling images from the old Wix CDN, download the **full-resolution original** (strip the
Wix transform params — keep only up to `~mv2.<ext>`), never the downscaled version.

---

## Mindset
- **Plain language, always.** Most users aren't developers.
- **Take the boring steps yourself** (branches, builds, lockfiles) — silently.
- **Confirm before writing to `main` or publishing**, no exceptions.
- **One question at a time** when there's a decision tree.
