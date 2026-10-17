# 001 — Scroll set-piece: loading state, embed limit, no page jumps

**Agents:** designer 0.5.0 → 0.5.1, critic 0.4.2 → 0.4.3 (base.md only). **Tool:** `tools/audit-mockup.mjs`.
**Status:** approved by Shahar in session, 2026-10-17. Applied with this file.

## Why

The 4f critics on Global Surf v2 (run 2026-10-globalsurf-03) found three gaps in the 0.5.0 set-piece rules:

1. Nothing said what a visitor sees if they reach the set-piece before its libraries have loaded.
2. The set-piece's CDN libraries were not counted in the two-embed limit.
3. Nothing measured layout shift while scrolling, so a jump in or around a pinned section went unseen.

Shahar's decisions: keep the set-piece in a loading state until everything it needs has loaded; expand the limits to include the animation code; add checks that the page never jumps.

## Changes

- **designer base.md, 4e set-piece:** the section's full height (pin spacing included) is reserved in CSS from first paint and shows the poster with a visible loading state. The motion starts only once its libraries, models and frames have loaded.
- **designer base.md, embeds:** the set-piece's libraries are allowed on top of the two embeds, under the same rules (after first paint, reserved space, poster fallback, every budget line met with everything loaded).
- **tools/audit-mockup.mjs:** new `scroll` block. On the throttled phone, it scrolls the page in steps from DOMContentLoaded (`early`), and again after everything has loaded (`settled`). For each pass it records the summed layout shift and the shifting elements.
- **designer base.md, hand-off check 5:** `scroll.early.cls` and `scroll.settled.cls` are both under 0.01, so `audit-mockup` now also runs at 4e.
- **critic base.md:** reads the same two numbers; at or above 0.01 the mockup goes back.

## Evidence

The new check on the three v2 mockups that passed 4f round 2:

| mockup | early | settled | what moved |
|---|---|---|---|
| calm | 0.1047 | 0 | `section#included` |
| interactive | 0.0006 | 0 | — |
| unique | 0.0931 | 0 | `article.lv` (prices), `section#lodge.drop` (the set-piece) |
