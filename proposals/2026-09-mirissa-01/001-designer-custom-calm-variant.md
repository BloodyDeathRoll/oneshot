# Proposal 001 — designer/custom.md: calm variant skips the canvas/WebGL animation

**Target file:** `agents/designer/custom.md` (Shahar's layer — Claude never edits it; this is a proposal only).
**Origin:** Shahar's decision, 2026-09-18 ("We can skip the animation for mockup 1. If it is selected, we will add it afterwards."). Recorded in PLAN.md §9.
**Why it needs to be in custom.md:** `custom.md` paragraph 1 asks for canvas/WebGL everywhere and paragraph 2 asks for a calm, conformist first mockup; the designer cannot tell whether paragraph 1 applies to mockup 1. `base.md` does not restate taste, so the answer must live in `custom.md`.

## Proposed addition (append as a third paragraph)

> The first (calm) mockup is built without the canvas/WebGL layer: static imagery, editorial grid, the booking drawer, nothing else moving beyond hover and scroll. If the calm mockup is the one picked, the canvas/WebGL layer is added during the full build, where it must stay inside the playbook §4 performance budget.

## Evidence

- Reference analysis (`agents/designer/references.md`): none of the six sites uses canvas/WebGL; five of six ship 3.5–14.4 MB on first mobile load — the calm variant is where the budget is easiest to prove.
- Playbook §4 budget: ≤ 1.5 MB first load, ≤ 300 KB JS.

## Status

Awaiting Shahar: approve / edit / reject. On approval, paste the paragraph into `custom.md`; no version bump needed (custom.md is unversioned).
