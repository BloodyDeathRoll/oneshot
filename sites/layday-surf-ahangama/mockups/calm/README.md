# templates/calm/ — Astro template for the "calm" variant

Renders `schemas/site-content.md` v0.2. Calm is the conformist variant: editorial grid, static imagery,
one booking drawer, nothing moving beyond hover and scroll.

**No canvas/WebGL layer** — Shahar's decision of 2026-09-18, recorded in PLAN.md §9 and pending as
`proposals/2026-09-mirissa-01/001-designer-custom-calm-variant.md`. If calm is the picked variant the
canvas layer is added during the full build, inside the playbook §4 performance budget.

Content arrives as `src/tenant/content.json` (the schema shape, filled from the dossier and the passed copy).
At build time in production this file is written by the fetch step from Payload; for mockups it is copied in.

Photos are referenced from `public/photos/`.
