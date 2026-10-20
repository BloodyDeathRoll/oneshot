# The Lavish Haven (v2) — concepts

Station 4d, creative-director 0.5.1, run `2026-10-lk-surf-01`, 2026-10-20. A fork of
`the-lavish-haven` (run `2026-09-ahangama-02`): same dossier, audit, passed copy and 79 photographs.
Read before writing: every layer of `tools/prompt.mjs creative-director`, `agents/designer/references.md`
in full, `agents/designer/custom.md`, the gold notes (`gold/the-lavish-haven-notes.md`,
`gold/global-surf-notes.md`), the earlier round (`sites/the-lavish-haven/concepts.md`, the ledger
lines of its pick), `audit.json`, `copy/en.json`, and all 79 photographs on contact sheets.

**Design skills used this round** (tools.md "Design skills"):
- `/design-taste-frontend`: `draw.mjs --sector hospitality --have photography --options 3` dealt
  `dark-room`, `split-stage`, `page-is-the-object`. `dark-room` (a near-black page) breaks hard
  constraint 4 (light grounds, surf vertical), so it was redrawn once (`--redraw direction`) and the
  draw gave `uneven-photographs`. Each concept takes one of the three. Sheets are in
  `.taste-skill/lavish-split/`, `.taste-skill/lavish-object/`, `.taste-skill/lavish-third/` (git-ignored).
- `/impeccable`: mode and the new-work method for choosing the world (§3).
- `/design-motion-principles` and `/animation-vocabulary`: each concept's motion signature is named
  in their terms (marketing page, so Jakub's lens first, Jhey's second, Emil's for nav and forms).

Where a skill and this station's rules disagree, the rules win (tools.md: "Skills inform the concept;
custom.md, playbook.md … and this agent's hard constraints decide it"). Every conflict is listed in §6.

## 1. What this business actually is

A hotel so new that guests call it "brand new" and "a new facility", two minutes' walk from Kabalana
beach, off the main road among cafés and a fruit stand. It sells twelve kinds of room, and **Booking.com
names almost every one by what it looks out on**: "…with Private Patio & Pool View", "…Private
Balcony & Garden View", "…2 Private Balconies, Pool & Garden Views" (`room_types[]`). It has no website,
no WhatsApp and no email: today a visitor can reach it only through Booking.com, which shows its phone
number only after a booking (audit F1). Guests stay on: one moved around many hotels, found this one
and stayed over a month; another extended rather than move on (`reviews.quotes[0]`, `[6]`). You can
check in until midnight and check out at any hour (`stayInfo`), and pay only in cash.

## 2. What the material can and cannot carry

**Video, the business's own:** none. `dossier.videos` does not exist; no site, no Instagram, no
Facebook (`contact.socials`). So **none** of the three concepts opens on video, and the reason is that
there is no clip to open on. Pitch point: the hotel has no footage at all; a 15-second pool and balcony
clip is the first thing to shoot.

**Photographs, the business's own:** 79, all property-uploaded on the hotel's Booking.com listing
(`images[]`, licence `business-owned`). **78 are 1024 × 768; `img-070` is 576 × 768.** The largest
usable width of the best photograph is **1024 px**, under the 1200 px full-bleed floor, so **no concept
puts a photograph full-bleed**, and none is shown above 1.2× its native pixels anywhere (references
#27). That rules out the full-bleed blueprints tasteskill dealt (quotation over a photograph, visit
card on a photograph) as written; they are adapted below to prints at native size.

The ten strongest, all 1024 px wide:

| Asset | What it shows | Use |
|---|---|---|
| `img-002` | the pool lit from within after dark, two storeys of lit rooms on both sides | the strongest frame; used in all three, never full-bleed |
| `img-001` | the same at a lower angle, more of the left wing | night print, C2 contact |
| `img-078` | the pool from an upper floor at noon: cyan water, flagstones, palms, red tile roofs | C1 hero print |
| `img-079` | the same from further back, the ground-floor rooms along the pool | C2 "patio" view |
| `img-077` | a first-floor balcony with the bamboo roll-up blind half down, banana leaves beyond the rail | C1 hero print, C3 |
| `img-073` | a balcony's teak chairs, the pool below through the rail, carved stone panel on the wall | C2 "pool view" |
| `img-069` | balcony chairs, the pool and the garden through the rail, white rafters | C2 "pool & garden" |
| `img-075` | a balcony seen along its length, bamboo blind down, banana palms | C1 crossfade |
| `img-066` | a balcony under white rafters, looking into tree canopy | C2 "garden view" |
| `img-071` | a sunlit balcony, two teak chairs, palms, white rafters | C3 |

Also useful: `img-011` (a fitted kitchen, the only kitchen photo), `img-019`, `img-046`, `img-058`
(a **door hang tag** on a teak door handle; its printed text is not legible and is never transcribed),
`img-007`, `img-024`, `img-029` (the best bedrooms: rattan headboards, polished-plaster walls, white
rafter ceilings), `img-022`, `img-045` (a bedroom door opening onto a balcony). Weak: about forty
near-identical wide-angle beds and about twenty bathrooms (wood-plank tiles, black shower towers);
shown in a grid they make a hotel page look generated. **No photograph is tied to a room type** in
the dossier; no concept captions or places a photograph as a specific room.

**Atmosphere:** `dossier/the-lavish-haven-v2/stock/` does not exist, and none is needed: the
hotel's own photographs carry every picture slot at native size. tasteskill's dealt "Coast" picsum
set is not used (it is nobody's Ahangama).

**Words** (`copy/en.json`, passed 4c): tagline "A new hotel, two minutes from Kabalana" (39 chars,
fits two lines anywhere); six blocks — intro "Among cafés and restaurants", "New, and it shows",
"Staying longer", "Twelve kinds of room" (the longest, three paragraphs), "Pool, restaurant, spa",
"Practicalities"; `spot` (two sentences); `featureLine` "A year-round outdoor pool, at the centre of
the hotel."; `closing` "Rates move with the dates. Booking.com and Agoda show what is available.";
five testimonials (four truncated by Booking's "Read more", one in German). Worth setting large: the
tagline, `featureLine`, Dariusz's complete quote.

**Numbers:** Booking.com **9.3/10 from 34** and Google **5.0/5 from 21**, both read 2026-09-25
(`reviews.booking`, `reviews.google`); Booking categories cleanliness 9.7, comfort 9.7, location 9.6,
facilities 9.5, staff 9.4 (from the 2026-09-19 harvest); twelve room types, five sleeping four and one
five; check-in 14:00–00:00; check-out "Available 24 hours"; Kabalana a 2-minute walk; Koggala Airport
about 5 km. No prices (live OTA inventory, `gaps.offers`).

**Gaps worth designing around:** no rates (the booking control hands off to live dates instead of
showing a number); no WhatsApp, so the primary action is the engine (audit `primary_action: engine`);
no photo-to-room mapping (rooms are sold by their names and by the views their names promise, with
the interiors as one shared gallery); no Instagram, so the Instagram feed `references.md` asks for
cannot exist; no season (`gaps.season`); room count unresolved (17 vs 12), never stated.

**Why it beats the current "site":** there is none. The comparison is the hotel's Booking.com page on
a phone (`dossier/the-lavish-haven/funnel/booking-fold.png`): an app banner, Booking's blue bar, a
cookie dialog over the bottom half and the night-pool photo cut off by it, no phone, no contact. Each
concept below answers that page in §4.

## 3. The page archetype — **the view from the room**

**Impeccable's mode: Persuade.** The visitor decides and acts (taps through to dates); it is not a
room inventory to operate. So the page earns attention with the hotel's own pictures and gets out of
the way at the button.

**Impeccable's new-work step, done in words.** The mechanism in one sentence: *a new hotel whose
rooms are named after what they look out on, two minutes from a surf beach.* The page this category
always ships: a full-bleed hero, a rooms grid with one photo each, a row of amenity icons, reviews,
map. Its predictable opposite: a type-only page. The previous round's world (the courtyard: the pool
at the centre, water rendered in WebGL, seen from outside looking in) is now the rut too. Seven
things the guest knows by heart, ordered by resonance:

1. **The view through the balcony rail** — what you see when you open your door: pool, garden, or
   both. It carries the mechanism, because the room names already sort themselves this way.
2. **The door hang tag** — the card on every door handle (`img-019`, `img-046`, `img-058`): a narrow
   card with a hole, two sides.
3. **The framed print on a plaster wall** — every bedroom has one picture hanging on polished
   plaster (`img-007`, `img-019`, `img-035`).
4. **The bamboo roll-up blind** — half down on the first-floor balconies (`img-068`, `-075`, `-077`).
5. The room key and its tag (not photographed; ruled out).
6. A booking-site seat map of rooms (the tool the guest operates; impeccable says spend at most one
   candidate on it; ruled out, it would also need a floor plan the dossier does not have).
7. The pool tiles (the gold page's world; ruled out).

The archetype joins 1–4: **the page is the hotel seen from inside one of its rooms** — the door
(and its tag), the wall (and its print), the opening (and its blind), the view (pool or garden).
Every concept organises the page as moving from your door to your view, and sells the twelve rooms
by what they look out on, using only the words in Booking's own room names. It belongs to this
business and no other in the run: KA sells beds in a garden hostel and Layday one dorm; neither has
private rooms, balconies or views to choose between.

**Physical scene, which forces the ground:** a traveller on a phone in daylight in Ahangama, or on
the bus from the airport; light grounds (and hard constraint 4 requires it anyway).

**What carries over from the earlier round, and what does not.** Kept: the hotel's own night-pool
photograph as its best asset; the honesty about 1024 px photographs. Dropped: water effects, the
pool as the one thing, cream, Instrument Serif, Fraunces, Bricolage, Inter, petrol/teal booking,
the typeset room table, a type-only first screen, any photograph upscaled to full bleed. Not reused
from the gold page: the pool-shaped window, the cut-corner shape, Jost, lamp yellow, night-blue
field, the noon-to-night scroll.

**The audit as constraint (every concept).** `recommended.primary_action: engine`, label "Check
dates and prices on Booking.com"; the calibration (references.md, Shahar 2026-09-29) asks for a short
CTA, so the button text is the passed copy's `bookingLinks[0].label` **"Check dates on Booking.com"**
(same action, same class, same URL `booking.engine_url`). `secondary_actions: [tel]` → `tel:+94764832988`.
`clicks_to_book: 1` → the first-screen button is a plain link to Booking.com, never a drawer; any
in-page date choosing is optional and sits after it. `above_fold: [what_where, trust, primary_action]`
is the order of the booking section and of the persistent phone bar (what + where line, rating,
button). `closing_intent`: send the reader to live dates and name the listings → every page ends on
`closing` with the Booking.com button and an Agoda button.

## 4. Three concepts

### 1 · calm — **"Prints"**  (tasteskill direction: `uneven-photographs`, seed 1314457432)

**The idea in one sentence:** the hotel's photographs hung like the framed prints in its rooms — each
at its own size on a white wall, never stretched, never in a grid.

**Why this direction:** tasteskill's "photographs at uneven sizes" places pictures as prints, each
at its own size; that is exactly what 1024 px photographs need (shown at or under native size, they
look composed instead of upscaled), and every bedroom here already has one framed picture on a
plaster wall. **Idea sentence (tasteskill step 4):** *On this page, the framed picture on each room's
plaster wall becomes the gallery-wall layout, prints at uneven sizes on one white wall.*
Competitor test: another Ahangama hotel has prints too, so the idea is carried by **what the prints
show** — the view from the room — and by the two-print first screen below.

**The one thing:** the bamboo roll-up blind half down over a first-floor balcony, banana leaves below
it (`img-077`). It is the small print on the first screen and the only element allowed to move.

**Structure:**
1. **First screen** (below).
2. **Where it is** — the intro block ("Among cafés and restaurants") as a statement paragraph at
   36 px, three lines, columns 2–7; to its right a 1:1 print of `img-071` (sunlit balcony) at 360 px in
   columns 9–11, dropped 120 px lower. (tasteskill intro "pinned sentence, photographs pass" adapted:
   pin cut to nothing on calm.)
3. **Twelve kinds of room** — tasteskill's "statement, table pushed right": the heading "Twelve kinds
   of room" at display size across the full width, then the twelve room names in a real table in
   columns 7–12 (name left, beds in the middle, "sleeps 4/5" right where the dossier gives it),
   grouped by what the name says the room looks out on: *pool*, *garden*, *pool and garden*, *no view
   named*. One 4:5 print (`img-073`, the pool through a balcony rail, cropped 614 × 768 shown at 440 ×
   550) in columns 1–4, bottom-aligned with the last row. Under the table, the offer block's three
   paragraphs at 18 px. One button, "Check dates on Booking.com".
4. **Inside the rooms** — a slideshow with dot navigation (calibration: slideshows with dots, rooms
   need several images): six bedrooms cropped 4:5 from the centre (references #26), `img-007`, `-024`,
   `-029`, `-013`, `-032`, `-047`, one at a time at 520 × 650, beside "New, and it shows" (its two
   paragraphs, with the five Booking category scores set as a compact line separated by " | ").
5. **Pool, restaurant, spa** — tasteskill's "photographs gathered round a heading", the page's one
   deliberate rest: the heading and `featureLine` centred, six prints scattered round it at 180–260 px,
   `img-002` the largest at 420 px, then `img-078`, `-069`, `-066`, `-011`, `-079`. Below the cluster,
   the block's two paragraphs and the amenities as a compact two-column list with small line icons
   (custom.md: "a list with icons at most").
6. **Guests** — one full quote set as a letter (Dariusz, the only untruncated English one, at 32 px),
   then the other three English quotes and Benjamin's German quote as smaller letters in two columns,
   each ending "Read on Booking.com" as a button-styled link; the rating block sits here: "9.3 / 10 on
   Booking.com, 34 reviews | 5.0 / 5 on Google, 21 reviews — read 25 September 2026".
7. **Kabalana** — `spot` copy left (columns 1–5) and the Rosa forecast right (headline in Work Sans,
   Rosa widget light theme), no dividing lines (calibration).
8. **Practicalities** — tasteskill's "wide heading, indented questions": the practicalities block
   turned into five `<details>` questions answered only from it (check-in and check-out times, cash
   only, parking needs reserving, airport shuttle, 24-hour desk).
9. **Closing + footer** — `closing` as a statement, two buttons (Booking.com, Agoda) and "Or call
   +94 76 483 2988"; footer per tasteskill "columns above, wordmark below": address (Google listing),
   phone, the three listings as buttons, and "The Lavish Haven" full width at the foot.

**The first screen** (1440 × 900): white wall. Top bar: "The Lavish Haven" wordmark left in Work Sans
500, three links (Rooms, Pool, Kabalana), the booking button right. Two prints with square corners,
no frame: **large `img-078`** (the pool from an upper floor at noon) at 4:3, 760 × 570 px (0.74× native),
columns 6–11, its top at 18 % of the height; **small `img-077`** (the bamboo blind) at 1:1, 240 px
(cropped 768 × 768, shown at 0.31×), columns 2–3, top at 52 %. Bottom-left on the margin: the h1 "The
Lavish Haven" in Pinyon Script at 64 px with the tagline "A new hotel, two minutes from Kabalana" in
Work Sans at 22 px under it, and the button "Check dates on Booking.com" 32 px below. No rating here
(it sits with the guests, §6: on this page the photographs and the tagline make the case, and a
rating line would make the corner a stack). Phone (390): the large print at 78 % width pushed right,
the small square overlapping its lower-left corner, h1 + tagline + button below, and a fixed bottom
bar from the first scroll: "Check dates on Booking.com" + a phone icon button.

**Why it beats the current site (Booking.com page):** on a phone the first thing seen is two clear
photographs of this hotel — the pool and a balcony — instead of an app banner and a cookie dialog
covering the photo, and the booking button is on the first screen instead of below the fold. The
phone number is one tap away on every screen; on Booking.com it appears only after booking.

**Colour** (calm strategy: restrained, one accent):
- Ground `#F4F5F8` — the white wall beside the blind in `img-077` (sampled `#D6D9E2`, raised to page
  lightness, hue kept).
- Ink `#313C4E` — the wet flagstones round the pool in `img-078` (median `#313C4E`). Contrast on the
  ground 10.2:1.
- Place colour `#A88356` — the sunlit bamboo blind in `img-077` (80th percentile); used once, as the
  field behind the "Twelve kinds of room" print column. Never on text.
- **Booking accent `#0677B8`** — the noon pool in `img-078` (median), white text on it, 4.84:1.
  Every booking button and nothing else.
- Would look wrong beside: cream or sand (it would turn the white wall yellow and the pool green),
  and any orange.

**Type:** **Work Sans** (dealt) 400/500 for everything read, 300 at large sizes; **Pinyon Script**
for the h1 and section titles only. Reason: a copperplate script is how a hotel's welcome card or
guest register is written, and Work Sans's open, slightly old-fashioned shapes stay readable at 16 px
on a phone. Two families. Checked against the default look: no Instrument/Fraunces/Playfair/Cormorant/
DM Serif, no Inter/Roboto; not Jost (gold), Outfit (KA), Urbanist (Layday), Damion/Dancing Script/
Satisfy (Global Surf gold). Pinyon is tested on every title word at 40 px on a phone before use; if
"Practicalities" or "Kabalana" does not read, the script falls back to Work Sans 300 for that title.

**Motion** (signature, in the vocabulary): one **slow crossfade** — the small blind print cycles
`img-077` → `img-075` → `img-068` (three blinds, same light), 1.6 s crossfade, 6 s hold, paused when
the tab is hidden; and, in "Pool, restaurant, spa", a **scroll-driven parallax drift** of 4–12 % per
print (CSS `animation-timeline: view()`, off at ≤ 767 px as Kube's #17). Feedback: press scale 0.98 on
buttons, 160 ms ease-out. Nothing on headings (custom.md). No canvas, no WebGL (calm). Reduced motion:
the first blind print holds, no drift. JS off: the page is complete; the crossfade is CSS; the slideshow
shows all six photos as a scrolling row with scroll-snap. Cost: under 4 KB of JS (slideshow dots only).

**Booking pattern:** references #4 and #6: the button on the first screen links straight to
Booking.com (1 tap = `clicks_to_book`); a persistent bottom bar on phones (Kube); booking section =
the room table's button + the closing's two listings + `tel:`. No drawer.

**Photographs and weight:** first screen `img-078` (760 × 570, ~110 KB AVIF) + `img-077` crop (~35 KB)
+ fonts (Work Sans subset ~45 KB, Pinyon ~30 KB) ≈ 260 KB first load. All others lazy, each ≤ 1024 px.

**Forecast:** yes, in the Kabalana section. Dossier spot "Kabalana beach break" (`location.spot`) →
Rosa id `kabalana`, name "Kabalana" (`agents/designer/fixtures/rosa-kabalana.json`), the same beach.
Light theme. Lazy, reserved space, plain-link fallback. No second embed.

**Scroll set-piece:** no — no video and no photograph ≥ 1920 px.

**What would make it fail:** the prints read as small and timid next to a full-bleed competitor; the
large print must be big (0.74× native, about 53 % of a 1440 screen's width) and the white wall must
never look empty (tasteskill's "fullness" check).

### 2 · interactive — **"Pick your view"**  (tasteskill direction: `split-stage`, seed 1603694499)

**The idea in one sentence:** half the screen is the view from a room, and it changes to the view you
choose; the other half is the hotel, in words, scrolling past it.

**Why this direction:** "split stage" is "sitting in the room while reading the menu" — for a hotel
whose rooms are named after their views, the fixed half can literally be the view. **Idea sentence:**
*On this page, the view each room's name promises becomes the fixed half of the screen.* Competitor
test: another hotel has views, but not twelve rooms named "Pool View", "Garden View", "Pool & Garden
Views" by Booking itself; the chooser is built from those words.

**The one thing:** the pool seen through a balcony's rail from a teak chair (`img-073`). It is the
fixed half on arrival.

**The live thing (tasteskill step 4):** a view chooser: **Pool | Garden | Pool and garden | Own kitchen
| Sleeps 4 or more | All twelve**. Choosing one filters the room list to the room names that contain
those words (pool 5, garden 6, both 3, kitchen 3, sleeps ≥ 4 five rooms — counted from `room_types[]`)
and crossfades the fixed half to a photograph of that kind of view: pool → `img-073`, garden →
`img-066`, pool and garden → `img-069`, own kitchen → `img-011`, sleeps 4 → `img-029` (a room with two
beds), all → `img-079`. **The photograph illustrates the kind of view, never a named room**: no
caption, alt text describes only what is in the frame, and the list beside it never puts a room name
on the photo. Works with a thumb; JS off it is six `<details>` groups of room names and the fixed
half stays on `img-073`.

**Structure** (left column scrolls, 55 %; right column fixed, 45 %):
1. **First screen** (below).
2. **Among cafés and restaurants** — intro block, 46ch; then the rating line (see first screen).
3. **Pick your view** — the chooser and the filtered room list: each room as a row, name in Hanken
   Grotesk 500 at 19 px, beds under it at 16 px, "sleeps 4" where given; under the list, the offer
   paragraph and one button "Check dates on Booking.com". The fixed half changes with the chips.
4. **Inside the rooms** — tasteskill's "one frame, contents change", inside the reading column: one 4:5
   frame (420 px) crossfading six bedrooms (`img-007`, `-024`, `-029`, `-013`, `-047`, `-055`), dots
   under it, tap to advance; "New, and it shows" beside it.
5. **Pool, restaurant, spa** — the fixed half crossfades to `img-002` (the night pool) as this section
   enters; the column holds `featureLine`, the block, and amenities as a compact icon list.
6. **Staying longer** — tasteskill's "one long letter": the "Staying longer" block, then Dariusz's full
   quote and the four others as short letters with "Read on Booking.com" buttons.
7. **Kabalana** — fixed half to `img-078`; the column holds `spot` and the Rosa forecast (headline left,
   widget right inside the column's width; light theme).
8. **Practicalities** — tasteskill's "answers as reading text": each practical fact as a run-in
   paragraph (question in 500, answer in 400), no accordion.
9. **Closing** — the fixed half releases; full-width white band with `closing`, Booking.com and Agoda
   buttons, phone; a proper footer (address, phone, listings, wordmark).

**The first screen** (1440 × 900): right 45 %: `img-073` cropped 4:5 from 768 px high, displayed
filling 100svh (at 900 px tall that is 1.17× native; above 920 px viewport height the frame stops
growing and the column's aqua shows above and below, so it never passes 1.2×). Left 55 %, pale aqua:
the wordmark top-left, links (Views, Rooms, Kabalana), the h1 "The Lavish Haven" in Bodoni Moda 500
at 64 px, the tagline in Hanken Grotesk at 20 px, the button "Check dates on Booking.com", and under it
**the rating in the hero**: "9.3 / 10 on Booking.com, 34 reviews | 5.0 / 5 on Google, 21 reviews" with
"read 25 September 2026" at 14 px. Reason: on this page the photograph is beside the text, not under
it, so a one-line rating in the reading column is not a stack over media; and a hotel with no website
needs the proof where the doubt is (audit F3's fix puts it above the fold). Nothing over the photo.
Phone: the view first, 60svh, sticky behind the h1 block and then released (tasteskill); h1, tagline,
button and rating below; the chips scroll sideways; a bottom bar with the button and a phone icon.

**Why it beats the current site:** on Booking.com the visitor sees a cookie dialog where the photo
should be and a list of twelve long room names with no way to tell them apart; here the first screen
is a balcony over the pool, and one tap shows only the rooms with that view.

**Colour** (committed: the aqua carries the reading half):
- Reading-column ground `#E3F0F1` — the pool seen through the rail in `img-069` (median `#2C818F`),
  raised to page lightness, hue kept. Footer and closing on `#F4F7F7` (the same, lighter).
- Ink `#1F3A12` — the shadowed banana leaves below the rail in `img-077` (15th percentile `#033500`,
  lifted toward the leaf median `#32541C`). 10.8:1 on the aqua.
- Place colour: the photographs supply the rest; no other fills.
- **Booking accent `#B05A17`** — the lamp-lit window glow of the night rooms in `img-001` (median
  `#DC9C60`), deepened so white text reads (4.86:1). Booking only: the button, the bottom bar, the
  active chip's underline is NOT accent (the active chip is ink on white).
- Would look wrong beside: a second blue (it would compete with the pool in the fixed half) and any
  yellow (the gold page's).

**Type:** **Bodoni Moda** 500 (dealt) for the h1 and section titles only; **Hanken Grotesk** 400/500
for everything read. Jost, dealt as the text face, is replaced: it is the gold page's face and the gold
README forbids reusing a gold typeface. Reason: Bodoni's hairline verticals repeat the balcony's
balusters and the slats of the blinds; Hanken Grotesk sets Booking's long room names ("Deluxe Family
Studio with 2 Private Balconies, Pool & Garden Views") in two lines at 19 px. A high-contrast serif on
a cream ground is the default look; here the ground is pale aqua, and the serif is used only for
titles. Bodoni Moda is not on either banned list.

**Motion** (signature, two moves): (1) **crossfade on the fixed half**, triggered by the chips and by
sections entering (IntersectionObserver), 600 ms ease-in-out, the outgoing photo also scaling 1.02 → 1
(Jakub's "materialising" without blur); (2) **layout animation** of the room list when a chip is chosen
(FLIP; rows leaving fade 150 ms, staying rows slide to their new place with a spring, bounce 0,
~300 ms; Emil: it is frequent, so short). Feedback on chips and buttons: press scale 0.97. No heading
reveals. Reduced motion: instant swaps, no scale, no FLIP. JS off: `img-073` stays, the list shows all
twelve grouped. WebGL: none. Cost: ~10 KB JS.

**Booking pattern:** first-screen button straight to Booking.com (1 tap). After the room list, an
optional **slide-down panel** (references #1, Tandjung Sari) opened by "Choose dates first": arrival,
departure, guests (floating labels, calibration) and one button that opens Booking.com with those
dates — **to be verified by the designer**: Booking.com's public property URL accepts `checkin`,
`checkout`, `group_adults`; this is Booking's URL behaviour, not a dossier fact, and the plain link
works without it. Agoda is a plain link. `tel:` beside both.

**Photographs and weight:** first screen `img-073` 4:5 (~120 KB AVIF) + fonts (Bodoni Moda subset
~40 KB, Hanken ~35 KB) ≈ 220 KB; the five other view photos load on first chip tap or when their
section nears.

**Forecast:** yes, in Kabalana, same mapping as C1 (`kabalana`), light theme. No second embed.

**Scroll set-piece:** no (unique only, and the material does not qualify).

**What would make it fail:** the fixed half looking soft at large desktop sizes (1024 px source);
the 1.2× cap and the aqua surround must be built in, not hoped for.

### 3 · unique — **"Do not disturb"**  (tasteskill direction: `page-is-the-object`, seed 1160445519, type redrawn)

**The idea in one sentence:** the page is the card that hangs on the hotel's door handles — a tall
two-sided hang tag that swings on its hook, carries the booking on its front and the dates on its back.

**Why this direction:** "the page is the object" asks for the artefact that already exists in the
subject's world; this hotel's photographs show one on its doors (`img-019`, `img-046`, `img-058`). It is
the most literal object a guest handles in the room, and two-sidedness gives the live thing for free.
**Idea sentence:** *On this page, the hang tag on the room's door handle becomes the booking card.*
Competitor test: every hotel has a hang tag, so the concept never draws a generic "Do not disturb"
sign (and never transcribes the illegible one in the photos); the tag is cut to the proportions in
`img-046` (tall, round hole near the top, rounded slot to the edge) and holds this hotel's own words.
"Do not disturb" is the concept's working name only; it appears nowhere on the page.

**The one thing:** the hang tag itself. It is the only loud element; the photographs beside it are
prints at native size.

**The live thing:** the tag **flips** (front: name, tagline, "Check dates on Booking.com"; back:
"Choose your dates" — arrival, departure, guests, and the same button carrying them, plus Agoda and the
phone). A swing on its hook when you hover or scroll fast. JS off: no flip; the back's fields appear as a
plain section below the hero and the front button still works.

**Structure:**
1. **First screen** (below).
2. **Among cafés and restaurants** — tasteskill's "title, note, facts row": heading left; the intro
   paragraph right; a row of four facts across the width at 40 px — "2 min to Kabalana", "check in
   until 00:00", "check out any hour", "9.3 / 10, 34 reviews" — each with a one-line source under it
   at 14 px ("Booking.com, read 25 Sep 2026" under the rating).
3. **Twelve kinds of room** — tasteskill's "cards that fold into spines" (pinned, two screens at most):
   a deck of twelve tag-shaped cards (the hang-tag silhouette, smaller), one per room type, in three
   tones of the place (§Colour); each card: name, beds, sleeps; as you scroll, cards slide in and earlier
   ones fold to spines at the left showing the first words ("Deluxe King…", "Family Suite…"). Phone:
   no pin, cards stacked. The offer paragraphs and a button under the deck.
4. **Inside the rooms** — "photo tiles with label strips" cut down to a **slideshow with dots** of six
   bedrooms (4:5, 520 px), because the label strips would need per-room facts the photos do not have.
5. **Pool, restaurant, spa** — `img-002` as a print at 1024 × 768 (native, centred, 72 % of a 1440
   screen), `featureLine` as a statement under it, then the block and the amenity list with icons.
6. **Guests** — "one long letter": Dariusz's quote large, then the rest; "Staying longer" beside it.
7. **Practicalities** — "questions beside a tall photograph": the practical facts as `<details>`
   left, a tall 3:4 print of `img-071` (sunlit balcony, 576 × 768 crop at native) right with `img-077`
   square overlapping its corner.
8. **Kabalana** — `spot` as two lines and a plain button "Open Kabalana on Google Maps"
   (`location.map_url`). No forecast on this concept (below).
9. **Footer = the back of the tag** — tasteskill's "the back of the card": the closing line, the
   address, phone, Booking.com and Agoda buttons, on a tag-shaped panel; revealed by a **curtain
   footer** (the page slides up to uncover it).

**The first screen** (1440 × 900): neutral white ground. Left, columns 1–6: **`img-002`** (the night
pool) as a print at 840 × 630 (0.82× native), top at 120 px. Right, columns 8–11: **the hang tag**,
360 × 760 px, white card with a gentle shadow (it floats; custom.md allows it), hung from a small ink
hook at the top of the viewport by its round hole. On the tag: the h1 "The Lavish Haven" in EB
Garamond italic at 56 px on two lines, the tagline in EB Garamond 400 at 20 px, and the teak button
"Check dates on Booking.com" (white text). Under the button, small: "Choose dates first" (flips the
tag). No rating on the tag (it sits in the facts row immediately below the fold, item 2, so the tag
stays title + one CTA as the calibration asks). Phone: the tag full width minus 24 px, 70svh tall,
hung from the top, with `img-002` as a 4:3 print below it peeking at the bottom edge; bottom bar
after the first scroll.

**Why it beats the current site:** where Booking.com shows a cookie dialog over the hotel, this page
opens on the hotel's best photograph beside a card that is clearly *this* hotel's — its name, where it
is, one button — and the dates can be chosen on the card itself before handing off.

**Colour** (full palette, three named roles + accent):
- Ground `#F5F6F4` — the sunlit white rafters over the balcony in `img-071`, raised to page lightness
  (neutral, deliberately not cream: no yellow cast).
- Tag `#FFFFFF` — card stock; separated from the ground by its shadow and by sitting over the print's
  edge.
- Ink `#2B3747` — the flagstones in shade in `img-078` (30th percentile). 10.3:1 on the ground.
- Room-card tones (section 3 only): `#E3F0F1` pool through the rail (`img-069`, raised), `#E6EBDD`
  garden canopy (`img-078`, `#546738` raised), `#EFE6DA` the bamboo blind (`img-077`, `#A88356`
  raised) — three light tints of the view words, so a card's tone says pool, garden or neither.
- **Booking accent `#442411`** — the teak door the tag hangs on (`img-012`, median). White text 13.9:1.
  Booking buttons only.
- Would look wrong beside: black (the teak would read as black), and any saturated second colour.

**Type:** **EB Garamond** only (one family, redrawn): roman 400/500 for reading, **italic for the h1 and
section titles**. The first deal was Bebas Neue / EB Garamond; Bebas was redrawn because the 2026-09-29
calibration judged condensed display faces (Barlow Condensed) "not great" and custom.md wants a
tasteful readable pair. Reason in this business's terms: a hang tag is a small printed card and is set
like one — a book face, sentence case, no condensed shouting. **Risk, stated:** custom.md and the
Global Surf bar ask for a readable text face plus an expressive display (a script welcome); here the
expressive voice is Garamond's italic at 56–72 px. If the critics read that as one flat voice, the fix
is a script for section titles only (not Pinyon, which is C1's), not a third family.

**Motion** (signature, the loud one of the three): (1) **the swing** — on load the tag settles once on
its hook: `rotate` about a **transform origin** at the hole, a damped **spring** (bounce ~0.25, settles
in ~1.2 s; Jhey's lens, delight is the point on the unique variant), then **idle** still; scroll velocity
or hover nudges it ±2° with the same spring (**follow-through**). (2) **The flip** — a **3D flip**
(`rotateY` 180°, perspective 1200 px, 500 ms ease-in-out) to the dates side and back. (3) The **curtain
footer reveal** (dealt). Plus the pinned spine deck in section 3. Reduced motion: no swing, the flip is
a 200 ms crossfade, the deck stacks, the footer is in flow. JS off: no flip (back shown in flow), deck
stacked. No WebGL (the swing is a CSS/JS transform). Cost: ~12 KB JS.

**Booking pattern:** the tag is the booking control: front button = straight link to Booking.com
(1 tap). Back = arrival, departure, guests with floating labels, handing off to Booking.com with dates
(same URL-parameter caveat as C2, to be verified) — a hybrid of references #1 (panel, hand-off on
submit) and #2 (tiny first step). Persistent phone bar. Agoda and `tel:` on the back and the footer.

**Photographs and weight:** first screen `img-002` at 840 × 630 (~130 KB AVIF) + EB Garamond (roman
+ italic subset ~70 KB) ≈ 230 KB. Others lazy.

**Forecast:** no. This concept stays indoors and at the door; the Kabalana section is two lines and a
map link, so its page has zero third-party embeds. (The run's other two concepts carry it.)

**Scroll set-piece:** no — not allowed by the material (no video, no photograph ≥ 1920 px). The
pinned spine deck is a section blueprint held for two screens, not a set-piece.

**What would make it fail:** the tag reading as a gimmick or a coupon; it must be large, quiet and
plainly the hotel's card, and the swing must stop before the visitor reaches for the button.

## 5. Divergence table

The other two businesses in this run (`ka-surf-hostel-and-restaurant-v2`, `layday-surf-ahangama-v2`)
had **no `concepts.md` yet** when this file was finished (checked at the start and at the end of this
session). Their rows below are taken from the latest earlier round of each business (round 3,
`sites/ka-surf-hostel-and-restaurant/concepts.md`, `sites/layday-surf-ahangama/concepts.md`); the
v2 agents must check their rows against these Lavish rows, not the other way round.

| Business | Variant | Archetype | First-screen device | Grid | Colour ground | Motion idiom | Booking pattern | Scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| **Lavish Haven v2** | calm · Prints | the view from the room | two prints at uneven sizes on a white wall (pool from above, the bamboo blind); h1 + button bottom-left | 12-col, uneven prints, wide margins | cool white `#F4F5F8` | slow crossfade in the small print; parallax drift in one section | direct link + docked bottom bar | — |
| **Lavish Haven v2** | interactive · Pick your view | the view from the room | split stage: the view from a balcony fixed at right, the hotel scrolling at left; view chooser | 55/45 split, one sticky half | pale aqua `#E3F0F1` | crossfade of the fixed view + FLIP room list | direct link + slide-down dates panel | — |
| **Lavish Haven v2** | unique · Do not disturb | the view from the room | a two-sided door hang tag hung beside a native-size night-pool print | object + print, 12-col | neutral white `#F5F6F4` | spring swing on a hook, 3D flip, curtain footer | the tag is the booking card (front link, back dates) | — |
| KA Surf Hostel (round 3) | calm · Field | the garden | full-width light headline; three upright prints standing half-deep in one flat green field | open field, staggered objects | cool white `#F0F1F2` | none | `<details>` slide-down sheet | — |
| KA Surf Hostel (round 3) | interactive · Planks | the garden | upright green slats that turn under the pointer, five prints behind | open field | cool white | slats turning, draggable rail | in-page overlay sheet | — |
| KA Surf Hostel (round 3) | unique · Canopy | the garden | cut-paper leaf canopy filling the screen, white clearing with the headline | open field + green spine | cool white | leaves parted by the pointer | right-edge slide-out | — |
| Layday Surf (round 3) | calm · Berth | the berth | one flat yellow berth with the headline in it, ladder, one print | 12-col, left-weighted | cool white `#E8E9F0` | none | `<details>` drawer under the berth | — |
| Layday Surf (round 3) | interactive · Curtain | the berth | the berth with an ink-line curtain across a print, parted by the pointer | 12-col + one pinned frame | cool white | curtain drawn on scroll | drawer from the berth's foot | — |
| Layday Surf (round 3) | unique · Inside | the berth | inside the berth: a yellow box in perspective, headline on its back wall | full-viewport box, then 12-col | cool white | camera climbs out of the box | docked corner berth → slide-out | — |

No two rows repeat archetype + first-screen device. No set-piece pattern is used by any business.

**Near-misses, stated rather than hidden:**
- **Prints on a white ground** appear in Lavish *Prints* and in KA *Field* (three prints standing in a
  green field). Lavish's two prints are at very different sizes and float on white with no field; KA's
  are equal, upright and half-sunk in green. If KA v2 keeps that device, Lavish calm is the one that
  stays and KA's agent must move.
- **Inside a room** is close to Layday's "berth" (inside a bunk). Layday's is a drawn yellow box you
  climb out of; Lavish never draws the room, it shows its photographs and the view out of it.
- **A curtain** — Layday *Curtain* draws one across a print; Lavish *Do not disturb* uses tasteskill's
  "curtain footer" (the page sliding off the footer), a different move in a different place.
- **Cool white grounds** everywhere, because custom.md asks it. Lavish's three are held apart by ink
  (slate, leaf green, flagstone), accent (pool blue, lamp amber, teak) and face (Work Sans + Pinyon,
  Bodoni Moda + Hanken Grotesk, EB Garamond).

**What a visitor would notice is different:**
- **KA Surf Hostel:** KA is green and outdoors, with prints standing in a garden; Lavish shows the
  inside of a hotel looking out — balconies, blinds, a pool below — and asks which view you want.
- **Layday Surf Ahangama:** Layday is one yellow berth and one dorm; Lavish is twelve private rooms
  sold by what their windows face, with a card that hangs on the door.

## 6. Conflicts, gaps and what the skills changed

**Conflicts (rules won over skills):**
- tasteskill house style vs `agents/designer/custom.md`: tasteskill wants square or pill buttons, no
  soft radius, no shadows, staggered entrances on headings, captions in some blueprints, and a
  monumental-wordmark or one-line footer. custom.md allows rounded corners and gentle shadows, forbids
  reveal animations on headings and captions under photos (hard constraint 6), and asks for a proper
  footer. custom.md wins in all three concepts.
- tasteskill full-bleed blueprints (testimonial over a photograph, visit card on a photograph) vs the
  1024 px photographs: adapted to prints at ≤ 1.2× native.
- tasteskill's dealt palettes (forest and lime; cobalt on sand; navy on white with tangerine) and its
  picsum "Coast" photographs are not used: colours are sampled from the hotel (allowed by tasteskill
  step 3 when the subject has its own colours), photographs are the hotel's own.
- `dark-room` redrawn (light grounds rule); Jost replaced in `split-stage` (gold typeface); Bebas Neue
  redrawn in `page-is-the-object` (calibration on condensed display faces).
- impeccable's `concept-seed` roll and its decision page were **not run**: they are an interactive
  round with the user before code, and at 4d nobody answers; the human pick at 4f plays that role.
  `impeccable context` was not run either (no PRODUCT.md for per-business work; planning only).

**Gaps (for the designer and the pitch):**
- **Rating mismatch:** `copy/en.json` `ratings[0].score` is **9.2**; the dossier's
  `reviews.booking.rating` is **9.3** (re-read 2026-09-25). Ratings are deployer-seeded from the
  dossier, so the mockups show 9.3 with "read 25 September 2026"; the copy file is stale. Also
  `copy/en.json` still says `"slug": "the-lavish-haven"`.
- **Schema:** `rooms[].photo` is one photo per room and the dossier ties no photo to any room, so
  "rooms sold with galleries" (custom.md, calibration) cannot be met per room; all three concepts show
  one shared interiors slideshow. The view chooser (C2) groups rooms by words in their names, which
  needs no new field.
- **No video, no Instagram, no WhatsApp, no email, no season:** pitch points; the Instagram feed the
  calibration asks for cannot exist.
- **Booking.com date parameters** (C2, C3) are Booking's URL behaviour, not a dossier fact; the
  designer verifies them, and the plain link is the fallback.

**What each skill actually changed:**
- **tasteskill:** gave each concept its composition — uneven prints (C1), the split stage with a fixed
  view (C2), the page as an object (C3) — and the section blueprints named in each structure; its
  "one live thing" rule produced the view chooser (C2) and the flipping tag (C3); its fullness and
  two-line headline rules are in the designer's brief through it.
- **impeccable:** Persuade mode; the seven-candidate list from the guest's world, which moved the
  archetype off the pool and the courtyard (the earlier round's rut) to the view from inside a room;
  the ban list that kept Outfit, DM Sans, Lora and Crimson out alongside base.md's.
- **design-motion-principles / animation-vocabulary:** one signature per concept in exact terms
  (slow crossfade + parallax drift; crossfade + FLIP layout animation; spring swing about a transform
  origin + 3D flip + curtain footer), weighted Jakub-first for the calm and interactive pages and
  Jhey for the unique one, with reduced-motion and JS-off for each.

**The one thing most worth photographing on location:** a 10-second clip, and a 1920 px still, from a
first-floor balcony chair at late afternoon — the bamboo blind half down, the pool below through the
rail. It would let all three concepts open on the hotel's own footage, which no concept can do today.
