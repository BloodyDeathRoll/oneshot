# Global Surf v2 · interactive "The ride" · 4e notes

designer 0.5.0 · run `2026-10-globalsurf-03` · brief `concepts.md` Concept 2. Built from `src/` with `python3 src/build.py` (inline CSS/JS, words from `copy/en.json`, alt text from the dossier); media from `src/make-media.sh` (`# media:` headers), then `tools/link-assets.sh` (dist/video lives in `~/.oneshot/assets/global-surf-adventures-v2/mockups/interactive/video`). Pages: `dist/index.html`, `dist/book/index.html`.

Old-site comparison: the dossier has no `old-site-*.png`, so the live globalsurf.com home was shot with `tools/shoot.mjs` into `/tmp/claude-1000/gs-v2-oldsite-interactive` (not in the repo): dark brown header bar, a Maldives aerial reel under "Tailor-Made Surf Trips Like Never Before", "READY TO CATCH MY FIRST WAVE", a black bar under the video, a Messenger bubble on every screen, destination cards for four countries, no price anywhere.

## look-log

**First screen, round 1.** Video plays; at 1440 the title and button sit centred over the reef aerial, clean. Wrong as design: on the phone "Sri / Lanka" broke across lines, the 720 px portrait rendition looked soft at 2x, and the logo was undersized against the nav. Beside the old site's first screen (dark bar, another country's reel, long all-caps CTA, chat bubble) ours already reads cleaner, but not yet clearly better on the phone.

**First screen, round 2.** Changed: non-breaking "Sri Lanka", logo 146 px / 120 px, hero button larger with a soft shadow, phone rendition re-cut at 810×1080 without scaling. The sheet showed the phone hero now sharp but the tuk-tuk crop far too tight (only the cab), and white nav text losing contrast on the bright sky of the tuk-tuk shot. Versus the old site: better at 1440, still only even on the phone.

**First screen, round 3.** Changed: soft local text-shadow / drop-shadow on nav, logo and menu (the only legibility aid, per calibration); poster moved to 2.1 s into the edit, where the whole tuk-tuk with its boards is in frame at 1440; phone crop now pans with the tuk-tuk (x = 245 + 130·t) so the boards and the cab stay centred. Reduced-motion and no-JS shots looked at: the poster is the full first screen at both widths. Versus the old site: clearly better at a glance — the lodge's own tuk-tuk with boards on the coast road, one short title, one button, nothing else on top, no chat bubble, no dark bar. Remaining limit (not a flaw I can fix at 4e): a 9:19 phone screen can only show about half the tuk-tuk's width; it reads as boards on a tuk-tuk roof, which is the point.

**Whole page, round 1.** Sheets at 1440 and 390 showed: room mosaics stretched to tall boxes (img height attribute winning over aspect-ratio), the waves band cutting the surfer's head, `featureLine` sitting on white umbrellas (low contrast) at 1440, a 51 px horizontal overflow at 390 caused by the Rosa fallback button's unwrapped text, the review dots row 3 px too wide at 390, and 40 px default `figure` margins making the quote gaps uneven. All fixed: `height:auto` on every aspect-ratio image, band re-cropped higher (phone crop shifted to the surfer), `featureLine` moved over the open water at left (bottom-centre on the phone), waves grid `minmax(0,1fr)` + wrapping fallback button, tighter dot rows on phones, `margin:0` on quote cards.

**Whole page, round 2 (+ booking page).** Page reads as the concept: tuk-tuk hero → the level reel (centre card plays, others posters) → included with a level switch and a compare table → the pool wipe → lodge chips → room mosaics with full-screen galleries → waves band + Rosa headline and widget (widget verified rendering over http in the check-design shots) → guests over the sunset silhouette → toast closing → Instagram row → tint footer. Fixed this round: the level/compare toggle wrapped badly at 390 (now a 3 + 1 grid), the phone booking bar was blocked and the booking page overflowed to 667 px on the last step because `noscript{display:contents}` rendered its raw text with JS on (removed), booking step pills wrapped to two rows on phones (now one row), the ticket's total used a 2 px rule (replaced with a tint block — no rules). Versus the old site, whole page: ours shows the lodge, a price on every level, the rooms with 5–6 photos each, the forecast, verbatim reviews and a real footer; the old home shows four other countries and no price. Clearly better.

Booking flow tapped through at 390 and 1440 (engine calls blocked in the test): hero → level tile → room tile → Saturday chip → +couple → Next → Continue booking = 7 taps; hand-off URL `https://globalsurfadventures.bookinglayer.com/en/product/level-2-rollers?start=2027-02-13&couple=1&end=2027-02-20`; snapshot total for that pick $3,092.05 (matches `docs/bookinglayer.md`, couple + twin, 7 n).

## images

All business-owned (dossier `license: business-owned`), cropped/resized by `src/make-media.sh`.

| file(s) | asset | use |
|---|---|---|
| video/ride-*, img/ride-poster-* | vid-003 (2.52–5.20, 24.92–27.12, 27.16–29.68 s), badge cropped | hero |
| video/level-1, img/level-1 | vid-010 19.72–24.16 s, 4:5 centre | Level 1 card, booking tile |
| video/level-2, img/level-2 | vid-003 21.56–24.88 s | Level 2 |
| video/level-3, img/level-3 | vid-002 8.86–12.50 s | Level 3 |
| img/freestylers | img-001 | Freestylers card |
| img/breakfast | img-011 | included |
| img/pool-top-* | img-026 | wipe, top layer |
| img/pool-garden-* | img-060 | wipe, second layer |
| img/room-*-600/-1400 | img-063 078 095 042 050 064 · 080 084 083 069 079 · 081 082 041 043 044 071 | room mosaics, galleries, booking tiles |
| img/waves-* | img-138 (`place: unidentified`; not captioned as the lodge's wave) | waves band |
| img/sunset | img-140 (`unidentified`) | guests |
| img/dinner-* | img-023 | closing |
| img/tuktuk | img-037 | booking final step |
| img/ig-* | img-024 090 055 087 118 016 104 168 | Instagram tiles |

Full-bleed sources are all 2000 px wide (img-026, 060, 138, 023, poster from 1920×1080 video cropped to 1728). No stock. No captions under photographs.

## gaps

- No Instagram posts harvested: the row shows the lodge's own photographs as tiles linking to `@globalsurf_kabalana`.
- No season (playbook §2): not shown.
- WhatsApp is the Israeli HQ mobile; "Call us" is the HQ landline `contact.phone` (the copy's value).
- Rosa: no checked-in fixture for `south-point` (only `rosa-kabalana.json`). The headline is inlined from Rosa's live `south-point.json` fetched 2026-10-16 (generated 14:26 UTC; current hour 20:30 local: 0.4–0.6 m knee-high, swell 0.85 m 6.9 s from 186°, wind 4.3 km/h onshore). It is a 4e fixture, stale by the time anyone views it; 4g fetches live with the 24 h fallback.
- Prices for 14/21/28 nights are not in the snapshot: the ticket says "Shown on the booking page" until the live quote answers.
- Saturdays: the 1-female snapshot from `docs/bookinglayer.md`, past dates dropped; live availability replaces it after interaction.
- JS off: booking is a GET form with `start`, `duration` (days: 8/15/22/29, which the engine reads), guest counts, and one Continue button per level; with JS the form sends `end` instead of `duration`, as the doc requires.

## conflicts

- None blocking.
- Concept says the levels row starts with "three visible, centre larger": on desktop the reel opens centred on Level 2 (so all three show); on phones it opens on Level 1.
- `copy/en.json` has no line for the wipe or the "Not sure" tile's sub-line. Wipe has only an accessible label (template-owned). The "Not sure? Ask us" tile uses the creative director's optional line only.
- Two-script calibration: Sacramento is used at ≥ 54 px only (section titles); every title word looked at.
- Other businesses in this run: none. Against the sibling variants of this business (per `concepts.md`): calm opens on guests walking soft-tops into the sea in Figtree + crimson, unique on the lodge from the air in Literata + pool blue with the scroll drop; this one is the tuk-tuk ride in Plus Jakarta Sans + Sacramento with a tangerine button, a snapping clip reel, a drag-wipe pool, room mosaics and a tile-question booking page with a ticket.
