# 001 — custom.md proposal: a hero with a main item (video cut, scroll-driven video or WebGL), micro-animations everywhere

**Status:** approved by Shahar 2026-10-20 ("DO NOT BLOCK webgl"); Shahar pastes the line into custom.md · **custom.md proposal** (Shahar writes `agents/designer/custom.md`; Claude never edits it)
**Run:** 2026-10-lk-surf-01 · **Raised:** 2026-10-20

## Why

After the design-skills round (PR #33) Shahar: "our first run created more interesting designs and animations … I want more micro animations and WebGL as the main items." The designer's `base.md` 0.7.0 and the creative director's 0.6.0 now ask for a hero that is interesting, clean and slick with one clear CTA, never cookie-cutter, built in interactive and unique around a main item from the business's own media: a WebGL piece, a scroll-driven video, or a great video cut. Every variant gets micro-animations on every interactive element.

`agents/designer/custom.md` still says:

> Motion: the video carries the movement. Small, useful microinteractions; no reveal animations on headings, no effects laid over the footage.

A video cut or a scroll-driven video fits that line. Only one option conflicts: a WebGL piece built on the footage (a shader over the video) is an "effect laid over the footage". `custom.md` wins on a conflict, so on a business with video the designer could not choose that option. The line also says nothing about the hero needing a clear CTA and not being cookie-cutter.

## Proposed line (replaces the Motion line)

> Motion: the hero is interesting, clean and slick with one clear call to action, never a cookie-cutter section. Its main item comes from the place's own media: a great cut of the video, a scroll-driven video, or WebGL (water, light, depth); calm has no canvas. Micro-animations on everything you touch: buttons, chips, galleries, drawers, booking. No reveal animations on headings. Effects on footage only when they make the footage better, never to hide it.

## Decision

Shahar: approve, edit or reject. On approval Shahar pastes the line into `agents/designer/custom.md`.
