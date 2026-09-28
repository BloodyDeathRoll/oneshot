# Global Surf Lodge Kabalana — calm · "Fare table" — designer 0.3.4, station 4e

Run `2026-09-globalsurf-01`. Concept 1 of `sites/global-surf-adventures/concepts.md` (creative-director 0.2.4).
Copy: `sites/global-surf-adventures/copy/en.json` (passed 4c), unedited.

## look-log

### Round 1 — first screen only (`shots/round-1/`)
Wrong as design: it reads as a SaaS pricing section, not a printed fare table — no column heads, the
middle of every row is empty air, three identical blue buttons make a louder column than the red
numerals, and on the phone the fare breaks onto two lines ("USD / 1,466") and each row grows to
~285 px, so the ratings fall below the fold. Change: give the table real column heads and ruled
columns (level, for whom, fare, action) so the figures line up like a timetable; shrink the plates so
the numerals stay loudest; on the phone put the fare on the level line and the plate under it, target
≈ 120 px a row; tie the rack print to the table's height. A stranger would guess generated: yes, it is
the default pricing-card layout with red numbers.

### Round 2 — first screen (`shots/round-2/`)
Better: a title, column heads and ruled rows now read as a printed fare table, and the whole first
screen — name, three levels, fare, plates, dorm and date line, Google rating, WhatsApp — fits the
390 × 844 phone. Wrong: on the phone the three full-width blue bars are heavier than the red
numerals, so the eye goes to "button, button, button" instead of "1, 2, 3"; on desktop "first-timers
and beginners" wraps so row 1 is taller than rows 2 and 3 (a timetable's rows are one height), and a
120 px empty band is left under the table. Change: plates sized to their words and set under the
audience line on the phone; widen the table to nine columns so every row is one line and one height;
raise the numerals to fill the screen's height. Would a stranger guess generated: less so — the
column heads and the repeated fare are specific to this business — but the masthead is still plain.

### Round 3 — first screen (`shots/round-3/`)
The desktop table now holds the screen: three rows of one height, the red numerals are the loudest
thing, fare and plate line up down the right like a timetable's last columns. Wrong: the rack print
is stretched to the table's height with object-fit, so it is a thin sliver that cuts the "Rules of
surfing" board in half — a crop that looks like a mistake; the WhatsApp line floats alone at the
top right; on the phone "first-timers and beginners" still wraps beside the fare, so row 1 is 50 px
taller, and the left-aligned plates break the right-hand figure column. Change: show the rack at its
own 2:3 as a small print top-aligned with the first rule, with the WhatsApp/phone line set under it at
the foot of the table; on the phone let the audience run the full width under the level/fare line and
right-align each plate under its fare. Stranger test: this is starting to look set by hand — the one
repeated fare down a ruled column is not a template move.

### Round 4 — first screen (`shots/round-4/`)
The rack now sits whole as a small upright print beside the table, and the WhatsApp line closes the
right-hand column level with the rating line, so the screen is one composed block: masthead, a ruled
table of nine columns, a print. On the phone every row is one height (≈ 130 px) and the plates form a
right-hand column under the fares; the whole first screen — name, tagline, three levels, fare, plates,
dorm and date line, Google rating, WhatsApp — ends at ≈ 775 px of 844. Still wrong: the print's top
sits 10 px below the table's first rule instead of on it. Change: align it to the rule, then build the
rest of the page. Stranger test: no — nothing here is a stock hero; it is a fare board.

### Round 5 — whole page, first build (`shots/round-5/`)
Below the table: the pavilion full-bleed, the intro, "Three levels, one week each" with a figure table
(rows of inclusions, columns 1 2 3 in red, the two irregular cells "5 coached" and Level 2's "2" set in
medium so they are the only things that stand out), rooms, a day at the camp, the lodge grid (six at
3:2), amenities, guests, waves and season, getting here with the aerial, beyond, closing fare table,
footer. Wrong: on the phone the figure table runs 156 px off the right edge (the page scrolls
sideways, Level 3 is cut off); the phone level bar never showed in the sheets; and every section opens
with the same 3.2 rem heading and a big lede, so the page reads as twelve identical slabs. Change: fix
the table's width on the phone; debug the bar; quieten the section titles so the ledes and figures
carry the page.

### Round 6 — whole page (`shots/round-6/`, `bar-390-*.png`)
The table fits at 390 (fixed layout, plates wrap to two lines inside their column); no element runs
past the viewport at 390, 1440 or 1525. The bar was there all along (probed: it slides up once the
fare table has scrolled away), but the mobile row rule `.plate{grid-area:p}` also caught the bar's
plates and stacked them — only "Level 3" and "WhatsApp" were visible; and the plates in the figure
table were underlined like text links. Change: scope the row rule, stretch the bar's three plates,
drop the underline. Section rhythm still the round-5 problem.

### Round 7 — whole page (`shots/round-7/`)
Section titles are now small ruled titles (Barlow Condensed 500, 1.35 rem) over the rule, like the
headings on the back pages of a timetable, and the ledes at 2.3 rem carry each section; the red
numerals of the first screen and of the figure table are again the loudest things on the page. The
phone bar shows three equal blue plates and an ink "WhatsApp". Looked at for overflow, overlap and
unreadable text at 1440 and 390: none found. Still weak: "Beyond Kabalana" and the intro leave the
right half empty on desktop — accepted as the air a calm page needs rather than filled. A stranger
would not guess generated: the one fare repeated in a ruled column and the figure table are specific to
this business.

## images
All `license: business-owned` in `dossier.json` `images[]`; none of the harvester's 11 "not the
lodge's wave" frames, none of `img-020`–`img-023` / `img-042`–`img-052` (concept §2 rejects), no stock.
Resized into `dist/img/` (webp + jpg); 3:2 = centre crop.

| file | dossier id | license note | use |
|---|---|---|---|
| img-109-rack-* | img-109 (1067×1600) | business-owned, globalsurf.com | desktop first screen, upright print ≤ 270 CSS px; hidden on phone |
| img-097-pavilion-* | img-097 (2000×1123) | business-owned, globalsurf.com | full-bleed after the first screen (source ≥ 1200 px) |
| img-002-lesson-* | img-002 (2000×750 → 1125×750 crop) | business-owned, globalsurf.com | "A day at the camp" print |
| img-027-table-* | img-027 | business-owned, globalsurf.com | "A day at the camp" print |
| img-025-pool, img-026-dorm, img-033-twin, img-007-lounge | same ids | business-owned, globalsurf.com | lodge grid, 3:2 |
| img-116-palm-bathroom | img-116 (1280) | property upload, Booking.com, approved 2026-09-19 | lodge grid, 3:2 |
| img-138-tub | img-138 (900×900 → 900×600) | property upload, Booking.com, approved 2026-09-19 | lodge grid, 3:2; alt follows the dossier ("a man and a woman in a jacuzzi tub"), not the concept's "ice bath" |
| img-015-wave | img-015 | business-owned, globalsurf.com | beside "The waves and the season"; next to no spot name |
| img-119-aerial | img-119 (1280×719) | property upload, Booking.com | "Getting here", shown at ≤ 1152 CSS px, never wider than native |

No captions under photographs; alt text from the dossier descriptions.

## gaps
- No team names (`gaps[]` staff): no people section.
- Room supplement is live and date-dependent: stated in words (the offer block), no figure.
- Testimonials carry no dates in the copy: shown with author and platform only.
- `languagesSpoken` is `en` + `other`: not shown (no way to name "other").
- No Sri Lankan number on the business's own site: WhatsApp/phone are the +972 ones, kept secondary
  to the engine as the audit says; `phone_lodge` +94 not used.
- Barlow's `tnum` not verified — moot here, the three fares are the same figure.

## conflicts
- **Concept table head "Every Saturday, 7 nights"** → set as "Starts on a Saturday, 7 nights".
  "Every" asserts a weekly departure the dossier does not state (`booking.engine_rules`: "Saturdays
  only", sampled Oct–Apr; `stayInfo.note`: "Packages start on a Saturday"). Cost of the alternative: a
  checkable claim with no dossier entry.
- **Concept: "tick in ink where it applies"** in the includes table → figures instead ("7", "5
  guided", "5 coached", "2", "7 days"), because every inclusion in `lessons[].includes` is a count; a
  tick would hide the one real difference (guided vs coached, 2 filmed sessions). Level 2's excursion
  is printed as the copy words it ("an excursion"), not as "cultural or nature".
- **The intro block** (`copyBlocks` slot `intro`) has no place in the concept's structure; set after
  the full-bleed photograph. The offer block is split across the page as the concept asks (paragraph 1
  in the includes section, 2 in the rooms, 3 on the first screen) and the first sentence of paragraph 2
  also appears on the first screen — a 4g binding question (one copyBlock rendered in three places).
- **"Phone first load has no image at all"** (concept): not true as built. Chrome's lazy-load
  distance fetches the three nearest below-the-fold photographs on load (pavilion 800 w, lesson, table).
  Measured below. Fixable at 4g (e.g. `fetchpriority=low` + IntersectionObserver), not worth JS at 4e.
- **`credentials[]` "ISA-certified surf guides"** has no slot in the concept; set as a line under the
  includes table.
- **Google Fonts on load** is a third-party request; allowed at 4e only (base.md), self-hosted at 4g.

## what a visitor would notice is different
- **KA Surf Hostel (calm "Field", round 7):** KA opens on a huge Outfit headline, three upright phone
  prints standing in a green field and a watermelon "Check dates" button. Here: no headline slogan, no
  green, three thin red numerals heading ruled rows with one fare repeated, blue plates.
- **Layday Surf (calm "Berth", round 6):** Layday opens on a big yellow field holding a two-line
  Urbanist headline, with a violet button under it. Here: no colour field anywhere; the page is ink
  rules and figures. **Near-miss, stated:** both first screens split into a wide left block (cols 1–9)
  and a small upright print at the top right (cols 10–12) — the concept specifies this split; what sits
  in it (a ruled fare table vs a yellow field) is different.
- **The Lavish Haven:** Lavish is built round its pool, shown first and large; here the pool arrives
  only after the prices, as a plain full-bleed photograph.
- **Gold pages:** no first-screen device, section order, palette or typeface reused — Barlow /
  Barlow Condensed (gold: Jost, Outfit, Urbanist), cool white + soft-top red + soft-top blue, no drawn
  first screen, no drawer.

## self-checks (4e)
- `node tools/check-design.mjs sites/global-surf-adventures/mockups/calm/dist/index.html`: ok, 0
  problems, 0 default-look warnings (h1/h2 Barlow Condensed, body Barlow, ground hsl(231 47% 97%),
  0 all-caps labels). Run on the file, not the slug, because the other two variants are being built in
  parallel.
- `node tools/check-places.mjs global-surf-adventures`: 0 borrowed images, 0 failing.
- Booking: every engine/WhatsApp/tel/mailto/Booking.com href found verbatim in `dossier.json`
  (WhatsApp as `wa.me/<digits of contact.whatsapp>` + the copy's prefill). Tapped at 390 × 844
  (touch): fare row 1 → `…/level-1-fomies`, row 3 → `…/level-3-riders`, "Ask on WhatsApp" →
  `wa.me/972523593240?text=…`, bar "Level 2" → `…/level-2-rollers`. The three engine URLs return 200.
- `node tools/funnel.mjs <file> --depth 1`: clicks_to_book 1, primary engine, CTA above the fold,
  terminal action above the fold (audit target: 1, engine).
- First load, no scroll, served over http: phone 390 × 844 @2x **281 KB** (HTML 31 KB, fonts 5 files
  106 KB, 3 lazy photos 143 KB), LCP element the h1; desktop 1440 × 900 **447 KB**, LCP the rack print.
  JS: 0 bytes (no `<script>`).
- Reduced motion / JS off / no WebGL: nothing on the page moves or needs JS; the only scroll-linked
  thing is the phone bar's slide-in (CSS scroll timeline; without support it is always shown and does
  not cover the fare table).
- Checked at 390, 1440 and 1525: no horizontal overflow.
