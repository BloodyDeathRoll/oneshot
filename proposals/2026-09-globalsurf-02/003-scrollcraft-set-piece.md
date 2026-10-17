# 003: Scrollcraft set-piece in the "unique" mockup

**base.md proposal** (creative-director, designer) plus one new reference file. No `custom.md` is
touched. Gate (d): nothing here is applied until Shahar approves it.

## Why

`~/Projects/scrollcraft` holds a tested playbook for scroll-driven 3D and video pages: five briefs
(01–05), each passing three fresh runs at ≥ 80 with no criterion under 60, judged
2026-10-13/15 (`tests/RESULTS.md`). Oneshot's "unique" variant is "full blown" (`custom.md`), but the
designer has no tested method for building a scroll set-piece, so each attempt starts from scratch.
On 2026-10-15 Shahar agreed: the playbook goes in as designer references for the **unique mockup
only**, and the creative director turns it on **per concept** when the business has the material.

Scrollcraft is Next.js + React Three Fiber. Oneshot sites are static Astro, with no second renderer
(PLAN.md §1). So only the method carries over, not the code: GSAP + ScrollTrigger + Lenis +
plain three.js run in Astro without React.

## Changes

### A. New reference: `agents/designer/scroll-playbook.md`

A port of the scrollcraft playbook at commit `aa2d0f0` (plus PR #26 once merged), rewritten for
plain JS and one HTML file / Astro:

- **Kept:** the ten rules; ch. 2 (ScrollTrigger, SplitText, the pattern catalogue, composing a page, common
  mistakes); ch. 3 without the R3F wiring (camera paths, materials, glass, GPU cost); ch. 4 video and
  image sequences; ch. 5 design and motion; ch. 6 frame budget, loading order, device tiers with
  poster fallback, reduced motion, text in the DOM; ch. 7 asset recipes.
- **Dropped:** ch. 1 Next/R3F wiring, ch. 8 (prompting Claude Code), ch. 9 RTL (Oneshot is English
  only, `run.yaml`).
- The header records the source commit, so a later scrollcraft change is a new proposal, never a
  silent drift.
- Wired into `tools/prompt.mjs designer` (and `tools/check-wiring.mjs`) **only when the concept asks
  for it**, so calm and interactive runs don't pay for reading it.

Why a copy and not a path to `~/Projects/scrollcraft`: the prompt must be reachable in every clone
and worktree, for both operators (`check-wiring.mjs` fails an unreachable layer), and the Next.js
specifics have to be translated anyway.

### B. creative-director `base.md` (0.3.0 → 0.4.0), §4 "Three concepts", new field

> - **Scroll set-piece (unique only, optional):** whether concept 3 carries one scroll-driven
>   set-piece from `agents/designer/scroll-playbook.md` (name the pattern: camera journey, scrubbed
>   film, pinned object, zoom-through, …). Allowed only when the material carries it: the business's
>   own usable video (§2), **or** at least eight of its own photographs ≥ 1920 px. Atmosphere
>   (`stock/`) never qualifies. Say which assets it is built from and what a visitor sees with
>   reduced motion, without WebGL and on a weak phone (the poster). "No" is a complete answer, and
>   the right one for a business with a bare listing.

The divergence table gets a column for it, so two businesses in a run don't share a set-piece.

### C. designer `base.md` (0.4.4 → 0.5.0)

At **4e**, only for a unique concept that names a set-piece:

> Build it from `scroll-playbook.md`. GSAP, ScrollTrigger, Lenis and three.js may load from a CDN at
> this station only, like fonts. Device tiers per its §6.3: reduced motion and no WebGL get the
> poster; software renderers and coarse pointers get the light tier. All text stays in the HTML.
> The look loop includes one mid-scroll shot of the set-piece at 390 px and 1440 px.

At **4g**, if that mockup is picked: libraries vendored and self-hosted (hard constraint 10), loaded
after first paint, inside playbook §4's 300 KB JS budget (three.js core is roughly half of it, so the
set-piece gets one library stack, not two). If it can't fit, 4g reports the conflict rather than
cutting the budget.

## What does not change

Calm and interactive variants, `custom.md`, the rubric, the critics, budgets, the schema, hosting.
Calm still has no canvas (2026-09-18).

## Cost and risk

- The creative director's §2 inventory decides it, so a business without the material costs nothing.
- One more thing in the unique mockup's look loop. Scrollcraft runs cost about $11–12 and 25–35 min
  per full site; a single set-piece inside a mockup should be well under that (UNVERIFIED until the pilot).
- Risk: the 300 KB JS budget at 4g. A set-piece that only fits by breaking it is dropped at the pick
  gate, not shipped.
- Not covered: Oneshot's critics don't measure frame time. Scrollcraft's harness does (desktop p95).
  Porting that check is a later proposal, made after the pilot shows whether it is needed.

## Pilot

One business, in a `mode: test` run, chosen for its material (Global Surf's dossier lists 33 videos and 116 of
198 images at ≥ 1920 px). Judge at the mockup-pick gate as usual. Then decide whether to keep, change
or drop this.

## Decisions needed

1. Approve, change or reject A–C.
2. The material threshold in B: own video, **or** ≥ 8 own photographs at ≥ 1920 px. Is that right?
3. Which business pilots it.
