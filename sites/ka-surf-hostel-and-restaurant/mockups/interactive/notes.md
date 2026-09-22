# KA Surf Hostel — interactive · "Planks" — 4e notes

designer 0.3.2 · run `2026-09-ahangama-02` · 2026-09-21 · brief: `concepts.md` round 3, concept 2.
Page: `dist/index.html` (one file, CSS + JS inline, Outfit from Google Fonts). Photographs: `dist/img/`.

## look-log

**Round 1 — first screen** (`shots/round-1/`). The slats showed fully open in the very first
capture, so the page read as photographs with pinstripes and the fence idea was invisible; the
cause was the browser settling the rail's scroll-snap, which fired the "first scroll" moment. The
meta row (tagline, rating, button, phone) read as a toolbar, the right half above the band was
empty, and there were two "Check dates" buttons on one screen. Changed: only a visitor's own
pointer/wheel/touch/key on the rail can open the slats; the header button stays hidden until the
first screen is scrolled past; 9.8 moved to the right as one large Outfit 200 number with the two
other ratings under it. A stranger would guess "template" from round 1: headline plus photo row.

**Round 2 — first screen** (`shots/round-2/`). The rest state now worked, but it hid too much:
the slats covered about 60 % of each pitch and the photographs read as a green barcode, which is
exactly the concept's "fails if". The pointer zone at the right barely opened any more than its
neighbours. Changed: the slats rest 58 % open (they cover 42 %), and the pointer's pull is flat
across its inner half so the print under the hand goes properly clear. Less generated-looking than
round 1 because of the 9.8, but the band was still too heavy.

**Round 3 — first screen** (`shots/round-3/`). The cottage, the patio door, the room and the dorm
are recognisable through the fence before anything is touched, and the pointer zone clears. But
the slats were only 14 px taller than the prints, so they read as stripes printed on the photos
rather than a fence standing in front of a garden. Changed (shot in round 4): the band grows to
52 % of the viewport and the prints sit on its floor, so the slats stand about 50 px clear of the
prints against the white. A stranger would not guess this came from a generator; the slats are
the one thing on the page and nothing else competes.

**Round 4 — whole page** (`shots/round-4/`). Built everything below the fold. Wrong: Elena's large
quote ran under the rice-and-curry print; "What is here" had a dead gap between its paragraph and
the amenities (the prints' grid rows stretched it); forecast day cells wrapped "0.5–0.7 m" onto
two lines; on the phone the green field's pre-slide transform made the page 646 px wide, so the
fixed booking bar was pushed off-screen in the first six captures; three phone headings kept
their desktop column and broke into four one-word lines.

**Round 5 — whole page** (`shots/round-5/`). Fixed all of the above (quote column narrowed, the
section split into a text column and a print column, `overflow-x: clip` on the section, nowrap day
heights and a sideways day row on the phone, headings reset to full width on the phone). Still
wrong: the room rows' resting hairline (6 % of the row) read as a row of em dashes, not as a line
waiting to extend.

**Round 6 — whole page + states** (`shots/round-6/`, `shots/round-6-states/`). Rows now rest on a
full grey hairline and the ink line runs across on hover/focus. Captured the states separately:
slats after the opening moment, the booking sheet (desktop, from a room row), the sheet on a
phone, reduced motion, JavaScript off. Wrong: on the phone the sheet's tiles cut "Hostelworld" and
"Booking.com" off at the tile edge; with JavaScript off the header's "Check dates" never appeared
(its reveal was scripted). Changed: phone tile type 16 px; the header button is only hidden when
JavaScript is running.

**Round 7 — whole page, final** (`shots/round-7/`). Looked at both sheets for overflow, overlap and
unreadable text: none found at 1440 or 390. The fixed phone bar is present on every capture.

**Round 8 — whole page, stock-011 removed** (`shots/round-8/`). Removed the Ahangama view (stock-011): its
`.view` wrapper with the `<img>` and credit line, the footer's "except the view of the reef: …" clause and its
link (the footer now reads "Photographs by KA Surf Hostel."), and the four CSS rules that only served it;
nothing added in its place and no other change. On both sheets the blue wave section now ends on the three
beach prints under the Rosa block, with the section's own bottom padding, then "Getting here" on white. A
stranger would not see a gap.

## images

All business photographs are `license: business-owned` in `dossier/.../assets/index.json`
("property-uploaded photo on the business's own Booking.com listing" for img-001–008; the
business's own Instagram posts for img-013, -018, -020, -023). Alt text written by looking.

| file | asset | shown | treatment |
|---|---|---|---|
| img-006-576.jpg | img-006 | first-screen rail, 288 × 384 (240 × 320 phone) | native 576 × 768, re-saved |
| img-007-576.jpg | img-007 | first-screen rail; rooms section ≤ 384 wide | native |
| img-001-576.jpg | img-001 | first-screen rail | native |
| img-004-576.jpg | img-004 | first-screen rail; rooms section ≤ 384 wide | native |
| img-005-576.jpg | img-005 | first-screen rail; "What is here" ≤ 336 wide | native |
| img-002-576.jpg | img-002 | family section ≤ 384 wide | native |
| img-003-576.jpg | img-003 | breakfast ≤ 480 wide | native |
| img-008-576.jpg | img-008 | "What is here" ≤ 288 wide | native |
| img-013-361.jpg | img-013 | breakfast, 180 wide | centre crop 9:16 → 3:4 (361 × 481) |
| img-020-480.jpg | img-020 | wave section, ≤ 300 wide | centre crop 1:1 → 3:4 |
| img-023-480.jpg | img-023 | wave section, ≤ 300 wide | rotated upright (stored sideways), centre crop to 3:4 |
| img-018-480.jpg | img-018 | wave section, ≤ 300 wide | rotated upright, 3:4 crop offset left to drop a stranger's arm at the right edge |

No photograph is enlarged; no photograph is drawn ≥ 1200 px wide. The beach frames carry no
place in their alt text (the dossier does not say where they were taken). The later prints get
Kube's ±4 rem parallax inside their 3:4 frame (off ≤ 767 px and for reduced motion).

**Not used, on purpose:** img-010 (the "Sea Food Restaurant" roundel), img-011 (buffalo, not tied
to the hostel), img-014 and img-017 (groups at other premises), img-015 (someone else's Threads
post), img-009 / img-012 / img-016 / img-019 / img-021 / img-022 / img-024 (not in this concept's
list), every stock file (concepts.md §2 allowed only stock-011).

**Removed 2026-09-22:** stock-011 (CC BY-SA 4.0, "Ahangama view — Sasith Lakshan wickramasinghe"). Reason: the page served a downscaled re-saved copy, against PLAN.md §9's re-save rule for share-alike files (critic 4f round 3 hard fail); Shahar's decision, 2026-09-22. Its `<img>`, credit line, footer credit and CSS are gone and `dist/img/stock-011-*.jpg` is deleted. No photograph replaces it.

## gaps

- **No published rates.** No price anywhere; the offer block's own sentence ("Rates change with the
  season and the dates — the booking links below show what is actually free.") sits in the booking
  sheet, and each room row has a "Check dates" link instead of a price.
- **No WhatsApp, no email.** Primary action is "Check dates" → the sheet with the three listings;
  underneath it is a plain link to the Hostelworld listing (the copy's first `bookingLinks[]` row).
  Phone `tel:+94773746053` in the header, the hero, the sheet, the phone bar and the footer.
- **No reply time, no season, no named staff or owner, no languages beyond English.** Nothing shown.
- **No Agoda rating** in the dossier: the Agoda tile carries no score.
- Contradictions stay unpublished: the page says "Free WiFi" and nothing more; car parking is not
  mentioned (only "Bicycle parking", from the copy's amenities). Check-in/out uses the copy's
  `stayInfo` (Hostelworld's window); Booking.com's "24 hours" is not shown.
- Rating capture date: the footer says the ratings are as published in September 2026 (dossier
  `fetched_at` 2026-09-19). That line is mine, not the copywriter's — flagged for the copyeditor.

## conflicts

1. **Top line.** Concept: "top line as concept 1" (name left, "Check dates" right). Gold notes and
   my round 1 both say two booking buttons on one screen is a fault. What I did: the header shows
   the phone number; its "Check dates" appears once the first screen is scrolled past (always
   visible with JavaScript off). Alternative: keep it and have two watermelon buttons on the first
   screen.
2. **Rest state.** The concept says the slats stand "a quarter open". Taken literally (a 22° turn)
   they cover over 90 % and hit the concept's own "fails if". They rest 58 % open instead; the
   photographs are recognisable in the first capture.
3. **After the opening moment** the slats stay edge-on as 1.5–2 px lines in the three greens over the
   rail, as written ("stays open"). Reduced motion draws that same open state once. If this reads as
   pinstripes to the human, the alternative is to let the edge-on slats fade out after opening.
4. **Rosa forecast at 4e** is drawn from the fixture, inlined, with its own timestamp ("Rosa data
   from 21 Sep 2026, 19:55, Sri Lanka time"). The playbook's 24-hour staleness fallback is not
   applied at 4e, because it would turn the mockup into the plain link from tomorrow on; the stamp
   says how old it is. With JavaScript off the block is the plain link "See today's forecast for
   Kabalana on Rosa". 4g must fetch live, lazily, and apply the 24 h rule. Rosa's bucket words are
   shown in sentence case ("Firing", "Good") to avoid all-caps.
5. **Lazy booking code (#5).** The sheet's script is inline and wired at load (≈ 1.5 KB), not loaded
   on first interaction. At 4e it costs nothing measurable; 4g can split it.
6. **Heading drift from concepts.md.** Concepts §2 quotes the family heading as "Run by a family,
   not a front desk"; en.json's current heading "What guests say about the staff" is used, as
   instructed. The section's first paragraph retells Mia's dengue story directly under Mia's own
   quote — a copy repetition for the copyeditor, not changed here.
7. **Room rows.** Each row opens the sheet and names the row at its head; no deep link or date
   parameter is invented (references.md #22).
8. **First-screen weight.** The five rail prints are JPEG at 576 w (≈ 435 KB together), not the
   concept's ≈ 230 KB AVIF estimate. 4g's build produces AVIF/WebP.

## hand-off check 6 — what a visitor would notice is different

- **The Lavish Haven** (calm / interactive / unique shots opened): every Lavish first screen is a
  full-bleed night-pool or courtyard photograph or a type poster on cream/plaster with a petrol or
  blue accent and a serif. At KA a visitor sees a cool white page, one light sans headline, and a
  row of small upright photographs behind a fence of moving green slats; nothing is full-bleed and
  there is no water until the sky panel at the end.
- **Layday Surf** (all three opened): Layday is a bordered, ruled spec card on ochre with heavy
  extended display type and rating cells. KA has no borders, no cells, no ochre. One similarity,
  stated rather than hidden: both first screens lead with a large "9.8" (both businesses genuinely
  score 9.8 on Hostelworld). Layday sets it heavy and boxed in a ruled cell; KA sets it in Outfit
  ExtraLight, unboxed, at the right edge.
- **Gold page (Lavish, `agents/designer/gold/`)**: shares only what custom.md requires of every
  site — cool white ground and a light geometric sans. Not reused: its pool-shaped window of live
  water, its chamfer shape, Jost, pool blue and lamp yellow, its section order, its right drawer.
  KA's shape is the upright 3:4 rectangle, its accent watermelon `#F05654`, its booking pattern an
  overlay sheet dropping from the top (rising from the foot on a phone).

## checks run

- `node tools/check-design.mjs ka-surf-hostel-and-restaurant --no-shots` → interactive `ok`, no
  default-look warnings (fonts Outfit, ground hsl(210 7% 95%), 0 all-caps labels).
- `node tools/check-places.mjs ka-surf-hostel-and-restaurant` → 0 failing mockups.
- Booking hrefs compared with `dossier.json` `booking.engine_url` / `other_engines` and
  `contact.phone`: identical. The sheet opens from every `data-book` link and from a room row,
  focus moves into it, Tab is trapped, Esc closes it and focus returns to the row (headless
  Chromium, 1440 and 390). Links to the OTAs were not followed (no network navigation done).
- Reduced motion and JavaScript off looked at (`shots/round-6-states/`): reduced motion draws the
  slats open once, no parallax, no field slide; JS off shows the flat green field behind the lower
  half of the rail, every word in the DOM, the Rosa plain link, and every booking control as a
  plain Hostelworld link. No WebGL is used by this concept.
