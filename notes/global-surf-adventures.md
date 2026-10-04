# Global Surf Adventures (run 2026-09-globalsurf-02)

Last updated 2026-10-05 by shahar (designer 4g session). Written from the ledger, activity log and git log.

## State
`built` (ledger, 2026-10-04T22:36Z, designer 0.4.2). Next stations: 4h SEO, 4i AI SEO, then 5 critique.

## The build
- `sites/global-surf-adventures/final/` — Astro port of the picked composite (home + standalone `book/`).
  Rebuild: `bash scripts/make-media.sh && npm run build` (needs `tools/link-assets.sh global-surf-adventures`,
  ffmpeg with libx264/libsvtav1/libwebp). Details, checks and conflicts: `final/notes.md`.
- Content is a seed in Payload's shape (`src/tenant/content.json`); no tenant exists yet (deployer, station 6).
- Schema gaps (room galleries and texts, level one-liners, inclusions, logo, socials, booking snapshot) live in
  `src/gaps/gaps.json` — a schema proposal is needed before the owner can edit them.
- Shahar's 4g must-fix list (2026-10-04) is done, each item probed (table in `final/notes.md`).
- `dossier.videos[]` gained `vid-hero-c` and `vid-book-l1..l3` (append only).

## For Shahar
- Phone hero: v0.9 allows one upload, so phones get a build-made portrait crop (546×972) instead of the
  mockup's hand-panned 9:16 edit. Same subjects, slightly tighter, no reef pan (`final/notes.md` conflict 1).
- JS-off hand-off now sends `duration` (days) instead of a check-out list; checked read-only on the live engine.
- Not done (not on the list): 360×640 room CTA under the bar, desktop Dates nights below the fold, hero video
  playing off-screen, closing-split white space, reef-frame title contrast.

## Media
`media/global-surf-adventures.tsv`; the final site's files come from `final/scripts/make-media.sh`.
The mockups' `dist/img/` files still have no recipe (ask for `node tools/media.mjs pack global-surf-adventures`).
