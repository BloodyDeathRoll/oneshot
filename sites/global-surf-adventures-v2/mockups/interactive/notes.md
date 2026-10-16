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

**Round 2.1 (after 4f round 1: critic 70.4/80 d1–7, visual 7, experience 7).** Worked the three reports' interactive fix lists. Changed: the phone hero now opens on the bright reef aerial (a phone shows only the middle ~500 px of the 3:4 cut, and the ~880 px tuk-tuk never fits it; its dark cab was the muddy first screen both visual critics flagged), then the pool, then the tuk-tuk framed on driver, windscreen and boards; the desktop loop is rotated to open on the whole tuk-tuk with its boards (4.62 s) so poster = first frame; a light contrast/saturation grade lifts the grey cast; posters re-encoded at q80; logo and nav get a soft local shadow (the only legibility aid). Level 1 clip replaced: sunlit pop-up practice on mint soft-tops plus a guide pushing a beginner into a wave (was the backlit, washed-out golden-hour shot). Pool wipe opens at 85/15 so the top-down palm dominates. The 18 boxed amenity chips became a borderless two-column icon list (one column on phones). Rooms: one per row, alternating sides, a large 3:2 lead photo plus a three-thumb strip, each opening the gallery at that photo. Closing: the line and buttons moved into a white card that overlaps the photo's lower edge, off the faces in img-023, and the phone title can no longer be cropped. Rosa: a designed fallback card (icon, script "South Point", the plain-link button) that stays until the frame really loads (never on `file:`, which Rosa's `frame-ancestors` refuses, and never when the request fails); the headline comes from a checked-in snapshot `src/rosa-south-point.json` with a 24 h gate and a lazy live redraw. Fonts self-hosted. Accessibility: skip link on both pages, phone menu is a modal sheet (focus held in menu button + sheet, rest `inert`, Esc returns focus), reel focus ring, level dots 44 px, review dots on phones are indicators (arrows/swipe are the controls), source/credit/rating links 44 px tall, logo 44 px, toggle buttons 44 px, icon-only WhatsApp link on `book/` named. No-JS: header scrolls away with the hero instead of overlapping white sections. Booking: footer shows "Per person $1,466" until a guest is chosen, totals in whole dollars, a status line under the steppers says what is missing, and Next from dates without a date or guest stays and focuses the missing control. Sheet showed: phone forecast line read "knee-highat" and "| Wind" wrapped to a new line; the room text column floats mid-height on desktop (accepted, it reads as a caption-free spread). Versus the old site (its first screen: dark bar, another country's reel, chat bubble): clearly better on both widths now, the phone included.

**Round 2.2.** Fixed the merged "knee-high at" and the phone forecast rows (stacked, no leading " | "). Logo 128×44 on phones. Sheets: hero reads in sun at 390 (reef, surfers, title, button), the level reel shows a peek of the next card at 390, rooms read as rooms being sold, closing card clean. Versus the old site's lodge page (palm-sky still, breadcrumb, Kuula blur, no price): clearly better, first screen and whole page.

**Round 2.3 (checks).** Tested over http (`tools/_serve.mjs` + Playwright): first Tab = skip link; with the menu open 10 Tabs cycle menu ↔ sheet only, Esc returns to the menu button; reel takes a visible ring; gallery opens at the tapped thumbnail (index 2) and returns focus; Rosa widget loads over http and the card hides; with rosa.surf blocked the card stays; no-JS header is `absolute`; overflow-x 0 at 390. Booking walk at 390 (engine intercepted): hero → Level 2 → Twin → Sat 24 Oct → (Next blocked, hint "Add at least one guest…") → +1 man → Next → Continue booking = 7 taps; hand-off `…/en/product/level-2-rollers?start=2026-10-24&male=1&end=2026-10-31`; ticket $1,466 + $140 = $1,606. `check-design`: 0 problems, 0 warnings. `check-places`: pass.

## images

All business-owned (dossier `license: business-owned`), cropped/resized by `src/make-media.sh`.

| file(s) | asset | use |
|---|---|---|
| video/ride-*, img/ride-poster-* | vid-003 (2.52–5.20, 24.92–27.12, 27.16–29.68 s), badge cropped, light grade; desktop loop opens at 4.62 s, phone loop opens on the reef | hero |
| fonts/* | Plus Jakarta Sans, Sacramento (Google Fonts latin subsets, OFL) | self-hosted type |
| video/level-1, img/level-1 | vid-010 12.28–13.52 + 32.92–35.00 s, 4:5 centre | Level 1 card, booking tile |
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
- Rosa: no designer fixture for `south-point` (only `rosa-kabalana.json`), so this mockup checks in its own snapshot, `src/rosa-south-point.json` (Rosa's live file, generated 2026-10-16 14:26 UTC; 0.4–0.6 m knee-high at 20:30, swell 0.85 m 6.9 s from 186°, wind 4.3 km/h onshore). The build inlines it; the page hides it once it is over 24 h old and, when the block nears the viewport over http(s), makes one request to the live file and shows the hour that is now if that file is under 24 h old. JS off: headline hidden, plain link shown.
- Prices for 14/21/28 nights are not in the snapshot: the ticket says "Shown on the booking page" until the live quote answers.
- Saturdays: the 1-female snapshot from `docs/bookinglayer.md`, past dates dropped; live availability replaces it after interaction.
- JS off: booking is a GET form with `start`, `duration` (days: 8/15/22/29, which the engine reads), guest counts, and one Continue button per level; with JS the form sends `end` instead of `duration`, as the doc requires.

## conflicts

- None blocking. Every round-1 fix for interactive is done (look-log round 2.1).
- Phone hero opens on the reef aerial, not the tuk-tuk the concept names as the hero's first shot: on a 390 px screen the whole tuk-tuk cannot be in frame and its close crop was judged muddy by both visual critics. The tuk-tuk stays in the phone loop (third shot), opens the desktop loop, and closes the booking page.
- Fonts are self-hosted already at 4e (base.md allows Google Fonts here); this removes the only third-party request on load.
- Review dots on phones are indicators, not buttons: nine 44 px buttons do not fit 390 px beside the arrows; the arrows and swipe are the controls.
- Concept says the levels row starts with "three visible, centre larger": on desktop the reel opens centred on Level 2 (so all three show); on phones it opens on Level 1.
- `copy/en.json` has no line for the wipe or the "Not sure" tile's sub-line. Wipe has only an accessible label (template-owned). The "Not sure? Ask us" tile uses the creative director's optional line only.
- Two-script calibration: Sacramento is used at ≥ 54 px only (section titles); every title word looked at.
- Other businesses in this run: none. Against the sibling variants of this business (per `concepts.md`): calm opens on guests walking soft-tops into the sea in Figtree + crimson, unique on the lodge from the air in Literata + pool blue with the scroll drop; this one is the tuk-tuk ride in Plus Jakarta Sans + Sacramento with a tangerine button, a snapping clip reel, a drag-wipe pool, room mosaics and a tile-question booking page with a ticket.
