# 003 — designer base.md: the bar when there is no old site, escalate sub-8 mockups, check alt text on the photo

**Status:** applied (designer 0.7.0 → 0.7.1, dashboard "Fix it", 2026-10-27). No `custom.md` is touched.
**Run:** 2026-10-lk-surf-01

## Evidence

Dashboard: 11 of 19 mockup decisions without a pick (verdict shared with the creative director, see 002); 1 of 6 critic rounds sent back for the designer's own work.
- the-lavish-haven-v2, layday-surf-ahangama-v2, ka-surf-hostel-and-restaurant-v2 (ledger, 2026-10-20): designer 0.6.1 handed over `mocked` after 3 rounds with visual scores of 7 to 8 (Lavish 7·7·7, KA 7·7.5·7.5, Layday calm 7); the Lavish note says all three FAIL dimension 8, so "they reach Shahar's pick only as fails". Shahar voided all three: "Drop the mockups. Dont redo for now".
- the-lavish-haven (run 2026-09-ahangama-02, ledger 2026-09-23 10:33): critic round 1 hard fail, alt "textured stone wall" over a smooth plaster photo.

## What in base.md lets this happen

1. The look-loop bar is "the current site" (`old-site-*.png`). These businesses have none, so the only bar was a booking listing, which every build clears. The critics used the gold pages; the designer was never told to.
2. Nothing says what to do when the rounds are spent and a mockup is still under 8: it was handed on as a pick candidate.
3. Hard constraint 8 takes alt text "from what the dossier says the image shows", so a wrong description is copied, not checked.

## Change applied (agents/designer/base.md, 0.7.1)

- Bar bullet: no website, or an earlier picked page, means compare with that page and `gold/`, and name it.
- New bullet: below 8 after the last round is a blocking conflict reported before the pick, with cause and what would lift it.
- Hard constraint 8: alt text written from the photograph itself; the dossier is a lead.
- Hand-off check 7 follows the new bar.

Related: 002 (creative-director, same verdict).
