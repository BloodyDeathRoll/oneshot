# 001 — custom.md proposal: a hero with a main item (video cut, scroll-driven video or WebGL), micro-animations everywhere

**Status:** proposed · **custom.md proposal** (Shahar writes `agents/designer/custom.md`; Claude never edits it)
**Run:** 2026-10-lk-surf-01 · **Raised:** 2026-10-20

## Why

After the design-skills round (PR #33) Shahar: "our first run created more interesting designs and animations … I want more micro animations and WebGL as the main items." The designer's `base.md` 0.7.0 and the creative director's 0.6.0 now ask for a WebGL main item in interactive and unique, and micro-animations on every interactive element in all three.

`agents/designer/custom.md` still says:

> Motion: the video carries the movement. Small, useful microinteractions; no reveal animations on headings, no effects laid over the footage.

Two parts of that line can be read against the new direction: "the video carries the movement" (WebGL is now the main item), and "no effects laid over the footage" (a shader on the hero footage is one way to build the WebGL item). When the two conflict, `custom.md` wins, so the designer would drop the WebGL item on any business with video.

## Proposed line (replaces the Motion line)

> Motion: the hero is interesting, clean and slick with one clear call to action, never a cookie-cutter section. Its main item comes from the place's own media: a great cut of the video, a scroll-driven video, or WebGL (water, light, depth); calm has no canvas. Micro-animations on everything you touch: buttons, chips, galleries, drawers, booking. No reveal animations on headings. Effects on footage only when they make the footage better, never to hide it.

## Decision

Shahar: approve, edit or reject. On approval Shahar pastes the line into `agents/designer/custom.md`.
