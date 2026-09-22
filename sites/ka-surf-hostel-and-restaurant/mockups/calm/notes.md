# KA Surf Hostel — calm · "Field" — 4e notes

designer 0.3.2 · run 2026-09-ahangama-02 · 2026-09-21 · one file: `dist/index.html`, zero JavaScript.

## look-log

**Round 1 — first screen** (`shots/round-1/`). The heading stopped at about two-thirds of the width, so the
right third of the screen above the prints was empty. The prints (264 px) and the field (30 % tall) were
too small, so the green read as a tinted box behind a photo row, which is the way concepts.md says this
concept fails. The lower left was empty and the ratings were tiny. On the phone the heading came out at two
lines and the first print scrolled flush to the edge. A stranger would guess it was generated: it is the
stock "headline, button, three photos" hero.
Change: set the heading at 10.6vw on two staggered lines ("Five minutes from" left, "Kabalana Beach"
flush right), so it spans the whole width. Tagline and ratings moved into the space left of line two. Prints
up to 300 px, field raised to half their height and started at 31 % of the width. Phone heading at 3.3rem.

**Round 2** (`shots/round-2/`). The staggered heading carries the page and the field now reads as ground.
But "or call +94 77 374 6053" ran into the first print, the ratings line crowded the K of "Kabalana", and
the first print covered the left column. On the phone the first print was still flush to the edge, because
the snap scrolled past the padding. It looks less generated, but the collision gives it away.
Change: narrowed the left column to 21vw, put "or call" under the button, prints 288 px with a 40 px gap,
field from 33 %, `scroll-padding-left` on the phone row.

**Round 3** (`shots/round-3/`). Nothing collides. The page has one loud thing, the green bleeding off the
right and bottom edges, with the three photographs standing half in it. "66 reviews" still broke into
"66 / reviews". On the phone the heading is on three lines and the second print peeks. The type scale and
the off-centre field no longer look like a template. It still sits close to an ordinary hero, which is
what a calm concept is allowed to be.
Change: kept "66 reviews" on one line, then built the rest of the page.

**Round 4 — whole page** (`shots/round-4/`). In the rooms section, the room prints and their field landed
*above* the heading: auto-placement pushed them to a new row because the h2 (cols 1–7) overlapped them (cols
7–12). That left a screen of nothing followed by a gap. On the phone the Agoda tile in the footer was cut
off, because three tiles do not fit at 21 px type. The rest held: breakfast, family, the widest field
under the bathrooms, the sky panel, the three times.
Change: gave the rooms grid explicit rows (heading row 1, list row 2, prints rows 1–2 on the right). Phone
tiles now shrink with smaller type.

**Round 5 — whole page** (`shots/round-5/`). The rooms section now sits right, but the room list ran into
the room field, and the "check dates" links (booking controls) touched the green. concepts.md says a
booking control never sits on the green.
Change: list narrowed to cols 1–5, the room field starts 48 px inside the prints' column.

**Round 6 — whole page, final** (`shots/round-6/`). The list and its links sit on white, and the field
stands only under the two room prints. I checked both sheets for overflow, overlap and unreadable text and
found none. Remaining imperfections, left as they are: on the phone "Check dates on" wraps inside the
narrow booking tiles. The open sheet was also looked at (below).

Also looked at, outside `shots/`: the booking sheet opened from the hero button at 1440 and from the
fixed bar at 390, with `reducedMotion: 'reduce'`. The sheet drops under the top line with the rates
sentence, three tiles and the phone, and the summary reads "Close". Reduced motion only removes the
0.28 s drop and the 0.15 s tile fill. There is no JavaScript and no WebGL, so the no-JS page, the
no-WebGL page and the reduced-motion page are the same static page (concept 1: "Reduced motion, JS off and
no WebGL all see the same page").

**Round 7 — whole page, stock-011 removed** (`shots/round-7/`). Removed the Ahangama view (stock-011), its
credit line beside it, its sentence in the footer credit (the hostel's own photographs sentence stays) and the
two CSS rules that placed it; nothing added in its place and no other change. On both sheets the blue wave
section now ends on the three beach prints with the section's own bottom padding, then "Getting here" follows
on white; at 390 the prints scroll sideways as before and the blue closes just under them. A stranger would not
see a gap: there is no empty column or orphaned credit where the view was.

## images

| file in `dist/img/` | asset | licence note (dossier) | treatment |
|---|---|---|---|
| img-001-576.jpg | img-001 | business-owned, property photo on its Booking.com listing | native 576×768, re-encoded |
| img-002-576.jpg | img-002 | same | native |
| img-003-576.jpg | img-003 | same | native; used twice (first screen, breakfast), as concepts.md says |
| img-004-576.jpg | img-004 | same | native |
| img-005-576.jpg | img-005 | same | native |
| img-006-576.jpg | img-006 | same | native; used twice (first screen, what is here), as concepts.md says |
| img-007-576.jpg | img-007 | same | native |
| img-008-576.jpg | img-008 | same | native |
| img-013-361.jpg | img-013 | business-owned, @kasurfhostel Instagram (reel cover) | centre crop 361×640 → 361×481 (3:4), shown at 180 px |
| img-018-480.jpg | img-018 | business-owned, @kasurfhostel Instagram | turned upright (stored sideways), centre crop 640² → 480×640 |
| img-023-480.jpg | img-023 | same | turned upright, centre crop 480×640 |
| img-020-480.jpg | img-020 | same | centre crop 480×640 |

No photograph is drawn wider than its source. Prints are 288–300 CSS px on desktop (480 px for the
breakfast plate) and 228–280 px on a phone.
No captions: alt text only, written by looking at each photograph (the dossier's descriptions are
machine-written). The beach frames are not labelled Kabalana, because the dossier does not say where they
were taken.

**Excluded under the image policy:** img-010 (the "Sea Food Restaurant" roundel, no restaurant is
supported), img-011 (unidentified field, wrongly described in the dossier), img-014 and img-017 (group
photos at other premises, nobody identified), img-015 (a screenshot of someone else's post about Madeira).
All stock is excluded (concepts.md §2 allowed only stock-011).

**Removed 2026-09-22:** stock-011 (CC BY-SA 4.0, "Ahangama view — Sasith Lakshan wickramasinghe"). Reason: the page served a downscaled re-saved copy, against PLAN.md §9's re-save rule for share-alike files (critic 4f round 3 hard fail); Shahar's decision, 2026-09-22. Its `<img>`, credit line, footer credit and CSS are gone and `dist/img/stock-011-*.jpg` is deleted. No photograph replaces it.

## gaps

- **No WhatsApp, no email** (`contact.whatsapp.gap`, `contact.email.gap`). The booking action is "Check
  dates", which opens the three OTA listings with the phone beside them. There is no WhatsApp prefill, so
  the visitor's choice is not carried into a message. The room rows link to Booking.com, because every
  `room_types[]` entry is sourced there. No deep link or date parameter is invented.
- **No rates.** The page shows the offer block's sentence ("Rates change with the season and the dates — the
  booking links below show what is actually free.") in the booking sheet and the footer. No number appears.
- **No season** (`season: null`). There is no season line.
- **No reply time** (`booking.reply_time_hint` gap). None is shown.
- **Check-in times** come from Hostelworld (13:00–23:00, check-out by 13:00), exactly as in `en.json`
  `stayInfo`. Booking.com says 24 hours, and that contradiction stays in the dossier.
- **Wi-Fi** is shown only as "Free WiFi" (the amenity row). The 2.5/10 Booking.com Wi-Fi score is not
  shown and not contradicted.
- The review attributions carry the source name linked to the listing the quote came from, plus the month
  where `en.json` has a date. Clara and Wolfgang have no date.

## conflicts

1. **First-screen print size vs columns.** concepts.md asks for three prints "each 300 × 400 CSS px, 48 px
   apart" in "columns 6–12". Three prints at 300 px plus two 48 px gaps is 996 px, but columns 6–12 at 1440 are
   about 775 px. I used 288 × 384 with 40 px gaps (944 px), which start at column 5 and keep clear of the
   left column. The alternative, 300 px in columns 6–12, would push the third print off the right edge.
2. **Booking control as a real link.** base.md 4e says "Booking controls are real links to the dossier's
   booking URL", while concept 1 specifies a `<details>` slide-down sheet with zero JavaScript. A `<summary>`
   is not a link. I built the `<details>` because it works with JS off in every current browser and each
   tile inside it is a real link, copied from the dossier. The per-room "check dates" links and the footer
   tiles (`#book`) are plain links on the page itself. The cost of the alternative, a plain Hostelworld link
   as the button, would be dropping the concept's "first tap reveals a panel" (references.md #1). Also:
   `<details>` has no Esc-to-close. That is 4g's keyboard pass.
3. **Two booking controls on the desktop first screen.** concepts.md places "Check dates" in the top line
   and the watermelon button under the heading. I kept both. The top-line one is ink text with a 1 px
   underline, not a second watermelon button, so there is still one accent on the screen. It also stays
   reachable when the top line is sticky further down. On a phone the top-line control is hidden and the
   fixed bar does the job.
4. **Three copies of the sheet.** Without script, one panel cannot be opened from three places, so the
   top line, the hero button and the phone bar each hold their own identical `<details>` sheet. At 4g it
   becomes one component.
5. **Mobile field height.** Concept: the green starts at 56 % of the phone screen. I built 60 %, so the three
   lines of heading, the tagline and the score clear the prints at 390 × 844.
6. **Typography of quotes.** Straight quote marks in `en.json` ("Family", the testimonials) are set as
   typographic curly quotes, and each testimonial is wrapped in quotation marks. The words are unchanged.

concepts.md §2 quotes an old heading for `copyBlocks[1]`. The page uses en.json's current "What guests say
about the staff".

## hand-off check 6 — what a visitor would notice is different

- **The Lavish Haven** (calm, interactive, unique mockups): its screens open on a full-bleed night pool, a
  pinned water canvas, or giant block type over a waterline, on cream, with a serif or a heavy grotesque
  and a docked button strip. Here the first thing seen is a very light two-line sans heading across a cool
  white page, with three small upright photographs standing in a flat green field that runs off the right
  and bottom edges. There is no water until the sky-blue panel near the end.
- **Layday Surf** (all three): one bordered card on an ochre field, ruled into cells, with numbered steps
  and all-caps labels. Here nothing is boxed or ruled into cells except the six room rows' hairlines and
  the booking tiles. Nothing is numbered, there are no labels over headings, and the ground is white, not
  ochre.
- **Gold (`the-lavish-haven.html`)**: that page is a pool-shaped window of live water on white, in Jost,
  with pool blue and lamp yellow, a cut-corner shape and a right drawer. None of that is reused here: no
  motion or canvas, Outfit rather than Jost, leaf green and watermelon, an upright 3:4 rectangle as the only
  shape, and a slide-down `<details>` sheet. Its section order (water, rooms strip, wave, close) is not
  followed either: this page runs rooms → breakfast → family → what is here → wave → getting here → listings.

## check-design default-look warnings

None. `node tools/check-design.mjs ka-surf-hostel-and-restaurant --no-shots` reports `ok` for calm: h1, h2
and body in Outfit, ground hsl(210 7% 95%), 0 all-caps labels, 0 labelled headings.
