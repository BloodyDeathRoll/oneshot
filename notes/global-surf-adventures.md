# Global Surf Adventures (run 2026-09-globalsurf-02)

Last updated 2026-10-04 by shahar. Written from the ledger, activity log and git log, not from memory.

## State
`picked` (ledger, 2026-09-30, gate passed by Shahar). The pick is a **composite** of the three
mockups; his verbatim instructions are in that ledger line's note.

## The picked mockup
- `sites/global-surf-adventures/mockups/picked/` — home (`dist/index.html`) and a standalone booking
  flow, one step per screen (`dist/book/`). Source in `picked/src/`; rebuild with `build.py` / `book.py`.
- **Approved by Shahar 2026-10-04:** Dancing Script titles + Lora (hero title Lora), and the #1
  "The sign" palette (activity log, commit 0770cdb).
- 4f on the composite: round 1 visual 7.5 fail → designer fix round (commit 2c7a17e) → round 2
  **all three pass**: critic 72.8/80, visual 8, experience 8 (`reports/2026-09-globalsurf-02/*-composite-r2.md`).
- Preview config: `global-surf-adventures-mockup.os1.workers.dev` (commit ef1e901).

## Must fix in 4g (Shahar, 2026-10-04: fix in the build, not another mockup round)
- **Dates step drops `start`:** a chosen Saturday that the live calendar later strikes out (e.g. after
  adding guests) stays selected; the total shows "Not free" with Continue still active, and the
  hand-off goes out as `?couple=1&end=…` with no `start` (experience-composite-r2 fix 1). Clear the
  date and say why, put the guest pickers above the dates, never send `end` without `start`.
- Other open items from the r2 reports: home "Choose this room" assumes Level 1; room silently
  switches when live availability drops it; JS-off accepts check-out before check-in; phone quote
  controls jump; "7 / nights" wraps at 390; room photos load 800 px on desktop; level-1 phone crop;
  room title casing; record the hero loop + booking clips in `dossier.videos[]`; self-host fonts.

## Funnel target (Shahar, 2026-10-04)
Own booking pages: 1 tap hero → booking page, at most 8 taps to the Bookinglayer hand-off.
`tools/funnel.mjs` 0.2.0 reports this as `hero_action` (measured on the composite: engine, 1 tap);
rubric 0.3.1 / critic 0.4.2 / `schemas/audit.md` 0.1.3 use it when `audit.json.recommended.booking_flow`
is set. **That field is not yet written in `dossier/global-surf-adventures/audit.json`** (the session's
write was blocked by the permission classifier; Shahar to add it by hand).

## Media
`media/global-surf-adventures.tsv`. Dossier photos restore from the web; clips from
`mockups/make-clips.sh`, `picked/src/make-hero.sh`, `picked/src/make-book-clips.sh`. The mockups'
`dist/img/` files have no recipe yet: ask Shahar for `node tools/media.mjs pack global-surf-adventures`.

## Next
Station 4g: Astro build ported from the picked composite (designer 4g + `schemas/site-content.md`),
with the must-fix list above. PR #10 holds the review rounds.
