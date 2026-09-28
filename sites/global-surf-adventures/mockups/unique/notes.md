# Global Surf Lodge Kabalana — unique · "Across the road" — designer 0.3.4, station 4e

## look-log

### Round 1 — first screen (shots/round-1)
Wrong as design: on desktop the cross-section does not read as a place at all — five even wavy lines, a double rule and a ladder at the right edge look like page margins and a scrollbar, and the lodge band is a plain price table with a dead third of the screen under it. I will make the sea read as foam (lines bunched towards the shore, broken, moving), label the road and the beach in the business's own words so the drawing explains itself, thin the rails, and pin the name to the top and the fare table to the foot of the band so the screen is composed rather than filled from the top. A stranger would guess generated: it is a pricing table with decoration either side.

### Round 2 — first screen (shots/round-2)
Wrong as design: the sea now moves and the bands are labelled, and the name at 88 px light condensed finally gives the screen a voice, but the foam is drawn as short scratchy strokes that read as rain or grass, not water; the rotated "Kathaluwa West" label is clipped off the bottom of the desktop band; and the numeral column is so wide that "Level 1" floats away from its "1". I will redraw the foam as long, calm lines parallel to the shore with only a few long breaks, densest at the road, set the vertical labels with writing-mode so they cannot clip, and pull the level names up against the numerals. A stranger would now read it as drawn on purpose, but the scratchy sea would still give away that it was generated.

### Round 3 — first screen (shots/round-3)
Wrong as design: the labels now sit whole in their bands and the levels hug their numerals, but on desktop the foam has turned into straight vertical dashes — a tall narrow band of lines parallel to a vertical shore reads as rain, whatever the maths says — and on a phone the three full-width blue slabs outweigh the red numerals, which the concept says must stay the loudest thing on the screen. I will draw the foam as continuous wavy contours at the shore that only break up offshore (closer to round 1's line, which read as water, but moving), and shrink the phone plates to right-aligned blocks so the red carries the rows while the whole row stays the tap target. A stranger would take the phone screen for a designed page; the desktop sea still needs one more pass before nobody would guess.

### Round 4 — whole page (shots/round-4, file://)
Built everything below the first screen and redrew the foam as continuous contours at the shore that break up offshore; the desktop sea now reads as water from above, not rain. Wrong as design: the comparison table's level heads sit 12 px left of their columns; Rosa's widget box is empty because Rosa refuses to be framed from `file://` (CSP `frame-ancestors *` excludes the file scheme), so the forecast could not be judged; the "Across the road" resolve works (lines draw, the aerial rises under them, the lines withdraw) and its sentence is on the same screen as the photograph on both widths. A stranger would not guess generated from the first screen or the resolve; the long amenities list is the most template-like part and is kept quiet on purpose.

### Round 5 — whole page over http (shots/round-5)
Served over `http://localhost`, Rosa's widget loads lazily into its reserved 420 × 500 box beside the headline. Fixed the comparison-table head alignment. Wrong: `tools/funnel.mjs` reported the primary action as WhatsApp, not the engine, because the "Ask on WhatsApp" link came before the fare rows in the DOM (funnel.mjs takes the first terminal action). Change: move the WhatsApp/phone pair after the fare table in the DOM, keep it top right on desktop by position and put it under the rating line on a phone, as the concept places it.

### Round 6 — whole page (shots/round-6)
WhatsApp/phone moved; on desktop the name had widened into the freed space and ran under "Ask on WhatsApp", fixed by reserving the right-hand column for the links. Phone first screen, top to bottom: sea 56 px, road 28 px, name, tagline, table head, three rows, dorm + capture-date line, Google rating, WhatsApp/phone, rails — ending at ≈ 810 px of 844, the level bar hidden until the fare table leaves. Looked at for overflow, overlap and unreadable text at 1440 and 390: none found. Also looked at: JS off (static SVG sea, aerial shown plainly with the drawing hidden, level bar always shown, every link works) and reduced motion (static sea, aerial crossfades in once at 50 % visibility, lines left faint). No WebGL is used, so there is no no-WebGL state. Overlay SVG now clipped to the photograph (rail ties poked past its edge in the reduced-motion capture).

## images
All `license: business-owned` in `dossier/global-surf-adventures/assets/index.json`. None upscaled; none full-bleed; the first screen has no photograph on any device.

| file in dist/img | dossier id | license note | treatment |
|---|---|---|---|
| img-119-1280 / -800 (.webp, .jpg) | img-119 | property-uploaded photo on the business's Booking.com listing | aerial, native 1280 px, drawn ≤ 860 CSS px on desktop |
| img-119-v-719 / -v-480 | img-119 | same | the same frame rotated 90° clockwise (sea at the top) for the phone's top-to-bottom cross-section; no crop |
| img-002-45-* | img-002 | globalsurf.com (Kabalana lodge pages) | 4:5 crop x 380–980 of the 2000 × 750 frame, native 600 px |
| img-031-45-*, img-011-45-*, img-036-45-* | img-031, img-011, img-036 | globalsurf.com | 4:5 centre crops |
| img-025-45-*, img-026-45-*, img-007-45-* | img-025, img-026, img-007 | globalsurf.com | 4:5 centre crops |
| img-109-45-* | img-109 | globalsurf.com (level-two page) | 4:5, bottom-aligned (boards and rules board) |
| img-116-45-* | img-116 | Booking.com property upload | 4:5 centre crop, native 682 px |
| img-138-45-* | img-138 | Booking.com property upload | 4:5 crop x 150–870, native 720 px |

Excluded as the concept and dossier require: the 11 harvester-flagged surf frames (img-012, -013, -017, -018, -019, -053, -075, -102, -105, -106, -111), img-020–023 (not the lodge's pool), img-047–052, img-042–045, img-014. No photograph is placed next to a spot name or a level. No stock.

## gaps
- **Room supplement**: no figure; the offer copy says the engine shows it. **Team / instructor names**: none; no people section. **Languages spoken** (`languagesSpoken: en, other`): not shown — "other" is not a language a page can print.
- **No Sri Lankan number** on the business's own site; WhatsApp and phone are the +972 ones the copy and dossier carry, kept secondary to the engine.
- **Rosa fixture is from 21 September 2026** (the checked-in `rosa-kabalana.json`), so the headline is labelled with its own date ("For Monday 21 September, 20:30", "Rosa, updated 21 September 2026, 19:55"), never "now". Rosa's live widget beside it shows today, so the two halves disagree at 4e; at 4g the headline is fetched live with the 24 h stale rule.
- **Kabalana spot mapping** as in concepts.md (dossier "Kabalana main point" → Rosa `kabalana`); no distance printed.
- Interface wording that is not in en.json: "Starts on a Saturday, 7 nights" / "per person" (from `stayInfo.note` + lesson labels, as concepts.md §7 allows), the comparison row labels ("5 surf sessions, 2 hours each" with cells guided/coached; "An excursion" with "cultural or nature"), "Kathaluwa West, 40 metres" and "Matara road" as band labels (words from the Getting here copy), "At the lodge", "Guests", "Ask first", "Room only". The copy's "Getting here" paragraphs are reordered (the 40 m sentence first), not reworded.

## conflicts
- **custom.md drawer vs audit target.** No drawer: every fare row is one tap to the engine, as concepts.md §3 decides (a drawer would add a tap over `audit.json.recommended.clicks_to_book: 1`).
- **Concept says the sea's JS loads after first interaction.** It runs on load (≈ 3 KB inline, 2D canvas, paused off screen), because the moving sea is the page's one idea and would otherwise never be seen before the first tap. The static SVG frame is in the HTML either way. Cost: a few ms of script on first paint; zero bytes of network.
- **"The photograph remains at its native 1280 px" vs "beside it, the Getting here copy".** Both cannot hold at 1440 px. The aerial is drawn at ≤ 860 CSS px (below native) with the copy in a 4-column left column, so the business's sentence and the resolve share one screen, which the concept names as its failure test. On a phone the frame is rotated so the sea is at the top, matching the first screen's top-to-bottom order.
- **Aerial is fetched on first load** on both widths (≈ 132 KB) although it is `loading="lazy"`: Chrome's lazy threshold reaches it. Total first load is still ≈ 263 KB.

## difference from the other businesses in the run set, and from gold
Opened KA Surf Hostel, Layday Surf and The Lavish Haven mockups and the three gold pages. What a visitor would notice: KA opens on a green cut-paper canopy with upright prints; Layday on one yellow perspective box; Lavish (and its gold page) on a pool window of blue water; this page opens on ink lines of sea, road and rails round three red numerals and a price, with no photograph and no colour field at all, and the only picture that follows resolves out of that drawing. Not reused from gold: no pool/water window, no leaf canopy, no yellow box; typeface Barlow/Barlow Condensed (gold: Jost, Outfit, Urbanist); palette cool white + soft-top red + blue plates (gold: pool blue/night blue/yellow, leaf green/watermelon, yellow/ink); section order fare table → comparison → pinned resolve → waves → day → lodge → guests, which none of them use; no drawer.

## checks (4e)
- `node tools/check-design.mjs` on this page: ok, 0 problems, 0 default-look warnings (Barlow Condensed / Barlow, ground hsl(231 47% 97%), 0 all-caps labels).
- `node tools/check-places.mjs global-surf-adventures`: 0 borrowed images, 0 failing.
- `node tools/funnel.mjs dist/index.html --depth 1`: clicks_to_book 1, primary action engine (Level 1 row → `…/product/level-1-fomies`), CTA and terminal above the fold — matches `audit.json.recommended`.
- Booking URLs: the three engine product URLs, the wa.me link and Booking.com link are character-for-character `bookingLinks[]` / `dossier.booking.engine_products`; tap on row 2 at 390 px navigated to `…/product/level-2-rollers`.
- First load, no scroll, served over http: mobile 263 KB (HTML 49 KB uncompressed with all CSS/JS inline, fonts 4 × ≈ 22 KB from Google Fonts, aerial 132 KB); desktop 266 KB. Third-party on load: Google Fonts only (allowed at 4e; 4g self-hosts). Rosa's iframe loads only near its block.
