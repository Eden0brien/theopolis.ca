# Design proposal — "Chiaroscuro" refresh

**Status:** proposed, awaiting the owner's decision.
**Lives on branch:** `redesign/chiaroscuro-refresh` (the code is NOT on `main`).
**Date:** 2026-06-18. **Proposed by:** Claude, at perki's request.

---

## For whoever shows this to Eden

This is a complete visual refresh of the site, built as an *alternative* to the current
live design. The current design is committed on `main` and is untouched. This proposal
sits on its own branch so Eden can compare the two and decide — nothing here is live.

**To preview it live:**
```
git switch redesign/chiaroscuro-refresh
cd website && npm run dev      # http://localhost:4321
```
Screenshots of the proposal are in this folder (`01-home.png` … `04-exhibition.png`).

**If Eden likes it:** merge `redesign/chiaroscuro-refresh` into her working branch (then it
can be published like any other change). **If not:** just delete the branch; `main` is
unaffected.

---

## Why this proposal exists

An honest audit of the current (already decent) site found it reads as a *competent, safe
template*: every section repeats the same centred eyebrow → flourish → content rhythm, the
burgundy/gold palette is used timidly (parchment dominates evenly), typographic hierarchy is
gentle, image chrome is uniformly soft, and there's almost no motion or atmosphere. For a
foundation whose flagship exhibition is literally *The Drama of the Soul*, it should feel like
a **gallery catalogue**, not a nonprofit homepage.

## The idea: Chiaroscuro (light meets shadow)

Caravaggio's device — dramatic contrast of light and dark — applied to the whole site:

- **Reading on parchment, drama in shadow.** Sections alternate between warm light and deep,
  candle-lit **nocturne** bands (aubergine-ink with a soft gold glow).
- **Gold as *light*, never fill** — hairlines, frames, glow, small accents.
- **Art is *hung*, not boxed** — a gold-hairline frame with corner ticks; the whole purchase
  gallery becomes a dark gallery wall with works lit from above.
- **Typography carries weight** — big typeset italic epigraphs (Dante, Dostoevsky), illuminated
  drop-caps on long-form openings, more scale contrast.
- **Atmosphere & restraint** — a faint paper grain over everything; one well-judged scroll
  reveal per section (staggered, and progressively enhanced so content is never hidden if JS
  fails); subtle image hover zooms.

Same brand, same palette tokens, same fonts (Cormorant Garamond + EB Garamond) — just executed
with a real point of view. The change is in *rhythm, contrast, framing, and atmosphere*, not in
swapping the identity.

## What changed, mechanically
- New palette tokens: `--thp-nocturne`, `--thp-nocturne-raised`, `--thp-gold-light`, on-dark text.
- New shared building blocks in `global.css`: `.section-dark` (candlelight glow), `.art-frame`,
  `.epigraph`, `.dropcap`, `.btn-gold`, paper-grain overlay, `[data-reveal]` scroll animation.
- Applied across every page; one nocturne band per page anchors the contrast.
- No content changes — same copy, same images, same links as the current site.
