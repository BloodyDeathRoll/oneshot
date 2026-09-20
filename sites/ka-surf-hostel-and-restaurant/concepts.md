# KA Surf Hostel — concepts

Station 4d, creative-director 0.1.0, 2026-09-20. Written after
`agents/designer/references.md` was read in full and all 24 photographs were looked at.

## 1. What this business actually is

A family lives at this hostel and runs it, and every review says so in the same word. One guest
wrote that the staff nursed her through dengue with Ayurvedic medicine on top of what the hospital
was already giving her. Breakfast is included, it is Sri Lankan — rotis, hoppers, pancakes, eggs, a
fruit platter, a vegan option — and **it changes every day**, which guests mention more often than
anything else about the property. It is five minutes' walk from Kabalana. It scores 9.8/10 on
Hostelworld across 66 reviews, which is the highest number any business in this run holds anywhere.

It is also, physically, six dormitory beds and a few rooms around a garden. There is nothing
architectural to photograph and nobody should try.

## 2. What the material can and cannot carry

**Photographs — 24, all business-owned, from Booking.com, Hostelworld and Instagram.**

**The best photograph is 576 × 768 px.** That is the long table at night, `img-002`, fifteen people
eating together — the single most valuable asset this business has, and it is **less than half the
width needed for a full-bleed hero**. Shipped across a 1440 px screen on 2026-09-20 it was, in
Shahar's words, *"super low resolution… makes the site fit for the garbage bin."* He is right.

So the governing constraint of this whole site is: **KA may never show a photograph larger than a
postcard.** Everything else follows from that.

- 576 × 768: `img-001`–`img-008`, `img-011` — rooms, bathrooms, the outdoor shower, the garden.
- 1024 × 576: `img-009`, `img-012` — the garden at night, the building at dusk with its lit sign.
  These two are the only ones with any width at all, and both are dark and low-detail.
- 640 × 640 Instagram squares: `img-013`–`img-024` — the breakfast spread, the fruit platter, the
  family and guests, the sunset, people at a beach table, surfers with boards. **Seven of these are
  stored on their side** inside the square with no EXIF flag, and need an explicit rotation.
- 361 × 640: `img-013`, the breakfast spread — narrower than our smallest srcset step.
- Excluded: `img-015` is a screenshot of someone else's Instagram post, not a photograph of this
  business. `img-010` is the hostel's roundel — a logo, usable as a mark, not as a picture.

**Words:** six copy blocks, and two of them are unusually good — the family block and the breakfast
block. Those are the page.

**Numbers:** three platform scores, 9.8 / 9.5 / 4.8, with counts. Six bed and room types. Check-in
13:00–23:00. Koggala Airport ~5 km, Ahangama station ~2 km. Breakfast: six named items.

**Gaps worth designing around:** no rates; no WhatsApp; no site; and the "and restaurant" in
Google's listing name that no OTA and no menu anywhere supports — so the page talks about breakfast,
never a restaurant. Two live contradictions (parking, check-in) that must stay unresolved on the
page.

## 3. The page archetype — **the kitchen noticeboard**

Everything at KA happens around one table and the wall behind it: the breakfast that is different
every morning, the scooter with the surf rack, the laundry, the minimarket, the family. A hostel
like this really does run off a board — cards pinned up, a list of what is on today, a number to
call.

So the page **is** that board. A dark clay wall. Things pinned to it: cards, small prints, tags,
a list in a hand-sized column. Photographs appear as **pinned prints at postcard size**, matted and
slightly tilted, never bleeding and never above the fold — which is exactly what 576 px photographs
can carry, and is references.md **#9** (Tandjung Sari's matted prints) used for the reason it exists.
The first screen carries no photograph at all: type, the three scores as pinned tags, and the
booking cards. references.md **#8** — type does the heavy lifting.

Nobody else in this run gets a board. The Lavish Haven has a courtyard to organise a page around;
Layday is one room and reads as one object. KA is a wall of notes, because that is what it is.

## 4. Three concepts

### 1 · calm — **"The board"**

The idea: a hostel noticeboard, tidy, legible, with everything a traveller needs pinned in order.

- **Structure:** board head (no photograph) → a row of three pinned booking cards, centred, with the
  caveat under them → **today's breakfast**, as a list of six items in a hand-width column, because
  that is the one thing this hostel is famous for → the family, as a long note pinned next to two
  small prints → a strip of pinned prints (postcard size, mixed tilts) → beds and rooms, as a
  **pinned price-less ledger**: one row per bed type, its own "check" link per row → what is here,
  as a tag cloud of small pinned labels → guests' words as five pinned cards in mixed sizes → the
  wave, with the live Kabalana forecast pinned beside it → getting here, as a note with the address
  and the two travel times → footer.
- **First screen:** dark clay wall. "KA Surf Hostel" set in Newsreader; under it one line —
  *breakfast is included, it is Sri Lankan, and it changes every morning*; three score tags
  (9.8 Hostelworld · 9.5 Booking.com · 4.8 Google); three booking cards, **centred**, with the
  caveat sentence centred under them. On a phone the booking bar is fixed to the bottom.
- **Type:** Newsreader display / Public Sans body and labels.
- **Colour:** clay wall `#2E241C`, warm paper cards `#F6EFE3`, ink, one accent — burnt clay
  `#C4622B` from the hostel's own roundel — on booking only (#6).
- **Motion:** none. **Zero bytes of JavaScript.** The tilts are static CSS.
- **Booking:** three pinned cards, one per platform, Hostelworld first because 9.8 across 66 is the
  strongest thing this business owns; `tel:` beside them.
- **Photographs:** all at postcard size on mats — `img-002`, `img-013`, `img-003`, `img-014`,
  `img-012`, `img-004`, `img-005`, `img-017`, `img-016`. None over 400 px rendered.
- **Fails if:** the tilts and mats read as scrapbook kitsch. They have to be restrained — one or two
  degrees, one mat width, no tape, no pushpin clip art.

### 2 · interactive — **"Today"**

The idea: the same board, but the card at the top of it is *today* — and the day turns as you scroll.

- **Structure:** a single large card pinned at the top, showing the time of day, what is happening
  at KA then, and one postcard print for it. Four states as you scroll: breakfast → the beach →
  sundown → the long table. Under it the board continues as in concept 1, with the print strip
  becoming an even masonry and the bed ledger becoming a snapping rail of cards.
- **First screen:** the today-card — a warm paper card on the clay wall, its print at postcard size
  inside it, the day label, the three score tags, and a booking card. No full-bleed anything.
- **Type:** Newsreader / Public Sans, same as concept 1 — one business, one brand.
- **Colour:** as concept 1.
- **Motion:** the print inside the today-card cross-fades between four of the hostel's own
  photographs, with a **heat shimmer** rising in it — hand-written WebGL, value noise, no library.
  KA has no pool; it has a garden and afternoons at thirty degrees, so the air moves, not water.
  Kube's ±4 rem parallax on the masonry, off at ≤767 px (#17). Without WebGL or with reduced motion
  the print is a still photograph.
- **Booking:** a card that flips open into a drawer holding all three listings and the phone.
- **Photographs:** `img-013`, `img-019`, `img-016`, `img-002` inside the card; the rest as prints.
- **Fails if:** the card is too small to feel like an event, or too big and the photograph inside it
  goes soft. The print is capped at its native width, not the card's.

### 3 · unique — **"Fifteen at the table"**

The idea: the whole wall at once — and the long table runs across it.

- **Structure:** the board seen whole, as an asymmetric pinned collage, with one horizontal rule
  running the width of the page like a table edge and the prints set *on* it at different heights.
  The three scores as a tally in display type. The guests' words as place cards staggered above and
  below the line. Then the ledger, the tags, the wave and the footer.
- **First screen:** two overlapping lines of Newsreader — "One long" / *table* — on the clay wall,
  the tally beneath, a booking card, and the long-table print at postcard size, grained.
- **Type:** Newsreader at display size, italic for the second line / Public Sans.
- **Colour:** as concept 1, with ink cells for the quotes.
- **Motion:** the one print is run like a **home film** — grain that moves and is heavier in the
  shadows, halation off the lamp over the table, a slow weave, a vignette. Hand-written WebGL over a
  576 px photograph at 400 px rendered, where grain is a *kindness*: it gives a soft phone picture a
  reason to be soft. Kinetic type leaning with the pointer. All off under reduced motion.
- **Booking:** a pinned card that opens a right-edge slide-out.
- **Fails if:** the grain reads as a filter rather than as film. Amplitude has to stay under about
  0.06 and be tied to luminance.

## 5. Divergence table

See the table in `sites/the-lavish-haven/concepts.md` §5 — it is maintained across the run. KA's
three rows are the "kitchen noticeboard" rows; no archetype + first-screen combination repeats.

**What a visitor would notice is different.** Against the Lavish Haven: that site opens on a
photograph filling the whole screen and keeps doing it; this one never shows a photograph bigger
than a postcard, and its first screen has none at all. Against Layday: Layday is one bordered object
read in panels on a pale ochre ground; KA is a dark wall with many small things pinned to it.

**If we could photograph one thing on location:** the long table at dinner, properly, wide, at
2400 px. It would change what this site can be.
