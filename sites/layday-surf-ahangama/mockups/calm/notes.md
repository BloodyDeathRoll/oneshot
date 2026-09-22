# layday-surf-ahangama / calm — "Berth" · station 4e · designer 0.3.3 · run 2026-09-ahangama-02

Brief: `concepts.md` round 3, concept 1 (calm, "Berth"). One file, `dist/index.html`, zero JavaScript,
Urbanist from Google Fonts (4e only), photographs in `dist/img/`.

## look-log

**Round 1 — first screen** (`shots/round-1`). Wrong as design: at 1440 the drawer came loose from the
berth with a 200 px hole between them (the print had no `height:auto`, so it stretched its grid row
to 720 px), the ladder's rungs reached across the print instead of into the gap, and the headline sat
small in the lower-left of a yellow field that was mostly empty, like any hero block. On a phone the
print came between the berth and the drawer, pushing the booking action below the fold, and the
fixed bar was missing. Change: fix the row, move the ladder to the berth's edge, set the headline
larger, reorder on the phone. A stranger would guess generated: it read as "coloured hero box plus
thumbnail".

**Round 2 — first screen** (`shots/round-2`). The berth now carries the headline at full size over
three lines and the drawer sits right under it; the intro paragraphs went under the print in columns
10–12 so what + where, booking, proof and the intro are all on the first screen. Still wrong: the
three rungs were spaced at random percentages, so the ladder read as a divider with tick marks, not
a ladder; the phone's booking bar still did not show (its `display:none` came after the media query).
Change: rungs at an even ladder pitch in the lower part, climbing to the berth; fix the bar order;
phone headline up to 3 rem. Less generated than round 1; the ladder is still the weak point.

**Round 3 — first screen** (`shots/round-3`). Rungs now evenly spaced beside the drawer and the
berth's lower edge, and on a phone the bar is at the foot ("Check dates" violet, "Call" ink), with
the drawer straight after the berth. Still wrong: the plain "Check dates on Hostelworld" link under
the button is fussy at 13 px, and the phone berth has an empty yellow band above the headline (52 vh
as briefed; kept because the headline "lies in" the berth). A stranger would take it for a designed
page, because of the ladder and the one flat yellow shape.

**Round 4 — whole page** (`shots/round-4`). Built the rest in concept order: the room, finding the
door, newly built, guests, the wave, practicalities, footer drawer. Wrong: the footer drawer had a
yellow header — a second berth on the page, against "always one berth"; Beth's long quote beside
`img-012` was bottom-aligned at 1.8 rem and pushed the photograph down; "Newly built" left "way"
alone on a line; `stayInfo.note` repeated the practicalities paragraph word for word inside the
same column. Change: footer drawer on the ground with an ink outline only; quote top-aligned at
1.5 rem; wider heading; the note moved under the three times as a small line.

**Round 5 — whole page, plus 1525 and 1920** (`shots/round-5`, `w1525-NN.png`, `w1920-NN.png`).
Only one yellow shape now; the footer is a plain outlined drawer. At 1525 and 1920 every section sits
in the centred 1200 px column and each row of prints is centred in it; no horizontal scroll. Wrong:
"Newly built" at 3.4 rem was the weakest heading on a page of 5–6 rem headings, so the section read
as an afterthought; the room heading was allowed to reach column 11, where the first screen's ladder
tail runs at 1920 × 1080. Change: heading to 4.2 rem, room heading held to the berth's nine columns.

**Round 6 — whole page, last** (`shots/round-6`, plus `w1525-NN.png`, `w1920-NN.png`,
`drawer-open-nojs-1440.png`, `drawer-open-nojs-390.png`). Visible change against round 5: "Newly built,
and kept that way" is larger and on one line at 1440 (the room heading's wrap did not change at 1440
because it already broke before column 10). Looked for overflow, overlap and unreadable text at 390,
1440, 1525 and 1920: none found. The drawer opened with JavaScript off and reduced motion on, at
1440 and 390: it drops under the berth and lists the three listings; screenshots saved. The ladder
tail crosses the top of the drawer border on a phone; left as is, it reads as the ladder standing on
the floor.

## images

All from `dossier/layday-surf-ahangama/assets/`, license `business-owned` ("property-uploaded photo on
the business's own Booking.com listing; Shahar approved OTA listing photos as usable 2026-09-19").
Resized with PIL, never enlarged; 4:5 prints centre-cropped (576×768 → 576×720, 1024×768 → 614×768).
Nothing is drawn wider than 640 CSS px; nothing full-bleed. Alt text written by looking.

| File | Asset | Where, size on page |
|---|---|---|
| `img/img-002-45.jpg` | img-002 | first screen, upright print, ≤ 288 px |
| `img/img-012.jpg` | img-012 | the room, landscape, 640 px (its one appearance) |
| `img/img-013-45.jpg`, `img-003-45.jpg`, `img-017-45.jpg` | img-013, img-003, img-017 | newly built, 320 px each, centred row |
| `img/img-019-45.jpg`, `img-021-45.jpg`, `img-020-45.jpg` | img-019, img-021, img-020 | the wave, 320 px each, centred row; alt says what is seen, never "Kabalana" |

Not used, as `concepts.md` §2 says: img-009 (a private double room; not a bookable room type),
img-022 (a third-party resort building dominates), img-015 (weak), img-006 (near-copy of img-003),
img-014 (near-copy of img-012). No `stock/`.

## gaps

- **No WhatsApp, no email** (`contact.whatsapp.gap`, `contact.email.gap`): no prefilled message
  exists. The booking path is the dossier's `engine`: three listing links (URLs verified equal to
  `booking.engine_url` and `booking.other_engines` character for character) plus `tel:+94778553343`.
- **No rates** (`gaps[]` offers): no price anywhere; the offer block's second paragraph ("Rates move
  with the season and the dates…") sits inside both drawers, as `concepts.md` §2 asks.
- **No bed count** (`contradictions[0]`): no number and nothing countable is drawn; one berth only.
  Catherine's "4 bunk beds" appears only inside her verbatim quote.
- **No season** (`season: null`): no season line.
- **No coordinates** (`location.lat_lng.gap`): no drawn map; the address is a link to the dossier's
  `map_url`.
- **No photograph of the gate or platform**: "Finding the door" has no picture, by design.
- **Reply time** not published: none shown.

## conflicts

1. **Intro paragraphs have no place in the brief.** `concepts.md` places the intro heading as the
   first-screen headline but never places the intro body. It is not dropped: both paragraphs sit
   under the first-screen print (columns 10–12) on desktop and after the drawer on a phone.
2. **`rooms[0].note` not shown.** "the whole hostel is this one room; bed count is not published
   consistently" is an internal note, not a sentence for guests. Showing it would tell visitors that
   the business publishes inconsistent facts. Left off the page; the label ("Bed in the dormitory") and
   `beds` ("One air-conditioned dormitory") are shown. Cost of the alternative: a line on the page
   that reads like an audit note. Needs a copyeditor decision.
3. **`stayInfo.note` repeats the practicalities paragraph.** "Credit cards are not accepted.
   Non-smoking. Taxes included." says what the `Practicalities` body already says; only "Reception has
   limited hours." is new. Shown in full, verbatim, as one small line under the three times; the
   duplication is left for the copyeditor (schema rule "a fact lives in exactly one field").
4. **"Hostelworld's seven categories as one plain sentence" in the guests section.** The only sentence
   holding the categories is inside the `about` block ("Every category on Hostelworld sits at 10 out
   of 10 — …"), shown in the room section. Not repeated in the guests section, because writing a
   second sentence would be copy of my own.
5. **"Guests" and "the wave" have no headings.** en.json has no heading for them, and I may not
   write one. The ratings numerals and the spot sentence open those sections; they carry an
   `aria-label` for screen readers (not visible text).
6. **Interface labels.** Per the schema ("interface labels belong to the template") these short
   labels are template text, not copy: "Check dates", "or call", "Call", "Check in from", "until",
   "Check out by", and the rating lines built from `ratings[]` ("9.8/10 on Hostelworld, 10 reviews",
   platform names, "reviews"), review dates formatted from `YYYY-MM` ("April 2026"). The labels
   "Check dates" and "or call" are named in `concepts.md`. No sentence is mine.
7. **The map link text.** `concepts.md` asks for "the map link" without link text; the link text is
   the address from en.json, so no word is added.
8. **Top-line "Check dates" and the phone bar go to the footer drawer (`#book`)**, where the three
   listings are open, not to the first-screen `<details>`: with zero JavaScript a link cannot open a
   `<details>` element. On the first screen the violet summary opens the drawer in place.

## default-look warnings (check-design)

None reported: Urbanist on h1, h2 and body; ground `#E8E9F0` = hsl(233 21% 93%), not cream; 0
all-caps labels; 0 of 6 headings labelled.

## reduced motion, JS off, no WebGL

The page has no motion, no canvas and no script, so all three see the same page. The drawer is a
`<details>` element; opened with JavaScript disabled and `prefers-reduced-motion: reduce` at 1440 and
390 (`shots/round-6/drawer-open-nojs-*.png`).

## hand-off check 6 — against the other businesses and gold

Opened: KA calm `round-7`, KA interactive `round-8`, KA unique `round-16`, and the Lavish gold page
(`agents/designer/gold/shots/rosa-round-2`).

- **KA** (all three): huge headline across the full width, green field or green slats or leaves,
  small photographs standing apart, coral booking button. **Here** a visitor sees one square-cut
  yellow box holding the headline, a black ladder on its edge, one photograph of a real berth beside
  it, a violet button in an outlined drawer under the box, and no green anywhere.
- **Lavish gold**: a pool-shaped window of moving blue water, Jost, yellow button with a cut corner,
  moving from noon to night. **Here** nothing moves, there is no water until the wave section near the
  end, the yellow is the field and never the button, corners are square, the face is Urbanist.
- **Shared, stated rather than hidden**: the first-screen proof block has the same shape as KA's
  ("Check dates" button, "or call +94…", "9.8/10 on Hostelworld, N reviews" with the other two ratings
  smaller underneath) and the same "name left / Check dates right" top line. Both come from the shared
  booking decisions in each business's brief; the layout, colour and device around them differ.
- From gold: no first-screen device, section order, palette or typeface reused.

## weight (not measured with audit-mockup; that is 4g's)

`index.html` 20.5 KB; first-screen photograph `img-002-45.jpg` 58 KB; all eight photographs 460 KB
on disk; one font family (Urbanist 200/300/400/500) from Google Fonts; 0 bytes of JavaScript.
