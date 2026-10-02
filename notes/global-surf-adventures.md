# Global Surf Adventures (run 2026-09-globalsurf-02)

Last updated 2026-10-02 by shahar. Written from the ledger and git log, not from memory.

## State
`picked` (ledger, 2026-09-30, gate passed by Shahar). The pick is a **composite** of the three
mockups; his verbatim instructions are in that ledger line's note.

## The picked mockup
- `sites/global-surf-adventures/mockups/picked/` — home (`dist/index.html`) and a standalone booking
  flow, one step per screen (`dist/book/`). Source in `picked/src/` (`build.py`, `site.css`, …).
- Type: Lora + Dancing Script (in `src/site.css`, commits 1c46305 and 6c617df). The 2026-09-30
  handoff says Shahar had not yet approved Dancing Script; nothing in the ledger records an approval.
- Preview config: `global-surf-adventures-mockup.os1.workers.dev` (commit ef1e901).
- The composite has not been through the three reviewers (handoff.md, 2026-09-30).

## Media
`media/global-surf-adventures.tsv`. Dossier photos restore from the web; clips from
`mockups/make-clips.sh` and `picked/src/make-hero.sh`. The mockups' `dist/img/` files have no recipe
yet: ask Shahar for `node tools/media.mjs pack global-surf-adventures`.

## Open
See `handoff.md` (2026-09-30) "Next Step": font + palette approval, reviewers on the composite, then
4g. Check `node tools/team.mjs status global-surf-adventures` for open assignments.
