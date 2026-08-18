# Theopolis — Website workspace

This repository holds [theopolis.ca](https://www.theopolis.ca) — a static **Astro** site
published on **GitHub Pages**. The migration off **Wix** is complete: the site went live on
**2026-08-17** and the domain now serves this repo, not Wix.

**Audience:** this workspace is operated by **non-developers**. When you (Claude) speak to
them, use plain language. Don't make them learn git, branches, or build tools — do that work
for them and report back in human terms.

> **Read [`_memory/MEMORY.md`](_memory/MEMORY.md) and [`_memory/session-state.md`](_memory/session-state.md)
> early in every session** to pick up current state and the next task.
>
> **If Eden is the user, raise the "Needs Eden" items** in `session-state.md` early — they are
> blocked on her specifically (admin access, or knowing where an image came from). Mention
> them once, plainly; don't nag if she sets them aside.

---

## At session start

Run these checks **before** doing the user's task. Take the steps yourself; ask in plain
English only when there's a real decision.

### 1. Identify the user
The machine login (`whoami`) is the user's identity.

- **`edenobrien` → Eden O'Brien, the site owner.** She works **directly on `main`** and may
  publish. See "Eden works on main" below.
- **Anyone else** works on `work/<whoami>` (login used verbatim as the suffix:
  `perki` → `work/perki`).

### 2. Make sure their branch is current
a. Put them on the right branch for who they are — `main` for Eden, `work/<whoami>` otherwise
   (create it from `main` if missing).
b. Switch to it if not already there.
c. `git fetch`; if their branch is behind its remote (or behind `main`), bring it up to date
   automatically and say so in one sentence ("I brought your branch up to date.").
d. If that conflicts, stop and surface it. Never resolve silently.

### 3. Then start the user's task.

---

## Eden works on main

**Eden O'Brien (`edenobrien`) is the site owner.** She works **directly on `main`**, commits
and pushes there, and **may publish the site whenever she wants**. Don't route her through a
`work/...` branch and don't ask her to open a pull request — for her, `main` *is* the workflow.
She still gets the publish confirmation below; that guard is about going live, not about git.

---

## Unless the user explicitly asks otherwise
- **Everyone except Eden works on `work/<whoami>`** and never commits to `main` directly.
- **Never force-push, rebase, or rewrite history on `main`** — for anyone, Eden included.
  Ordinary commits and pushes to `main` are fine for Eden; rewriting shared history is not.
  If history genuinely must be rewritten, stop and get explicit agreement first: the repo is
  public and other people's clones break.
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
npm run build      # production build → website/dist/ (the gh-pages worktree)
```

- **Design system:** forked locally into `website/src/styles/theme.css` + `palette.css`
  (the "theopolis-style"). Colours are CSS variables (`--thp-primary`, `--thp-gold`, …) —
  components never hard-code colours. Palette is "Sanctuary": parchment + ink + liturgical
  burgundy + antique gold. Fonts: Cormorant Garamond (display) + EB Garamond (body).
- **Content:** markdown in `website/src/content/{pages,artworks,artists,journal}`. Routes read
  those collections, so non-coders edit content without touching layout code.
- **English only.** No i18n. Routes are at the root (`/about`, not `/en/about`).

---

## Publishing the site (going live)

**This is set up and working.** `website/dist/` is a git worktree on the `gh-pages` branch,
Astro builds straight into it, and GitHub Pages serves that branch at **www.theopolis.ca**.

```bash
cd website
npm run deploy      # build -> safety checks -> commit + push gh-pages
```

`scripts/publish.sh` refuses to publish if the homepage is empty, `.nojekyll` is missing,
`dist/` isn't on `gh-pages`, or the CNAME didn't survive the build. It prompts for confirmation
when run from a terminal; `CONFIRM=yes` skips that prompt for non-interactive runs, and
`--no-cname` deliberately publishes without claiming the custom domain (preview only).

**Who may publish:** Eden, any time. Anyone else — confirm with her first.

### Publishing is destructive — confirm TWICE
1. *"You're about to publish the current site to the public at theopolis.ca. The whole world
   will see it. Are you sure?"*
2. If yes — then: *"Last check: still want to publish? This overwrites what's live now."*
3. Only after the second yes, run the publish and report the outcome.

Say what is actually true at the time. If something means the change *won't* reach the public
(Pages disabled, DNS pointed elsewhere), say so plainly instead of reciting a warning you know
to be false — a scary confirmation that isn't accurate teaches people to click through them.

### After publishing, verify from the outside
Don't trust the green checkmark. Check the live domain: every page returns 200, HTTPS is valid,
and the legacy Wix URLs still redirect. GitHub can report success while the domain serves a 404.

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
- **Confirm before publishing**, no exceptions — and before writing to `main` for anyone
  other than Eden (for her, `main` is the normal place to work).
- **One question at a time** when there's a decision tree.
