# Layday Surf Ahangama (v2): concepts

Station 4d, **creative-director 0.5.1**, 2026-10-20, run `2026-10-lk-surf-01`. This business is a
fork of `layday-surf-ahangama` (run `2026-09-ahangama-02`) at `copy_passed`, with the same dossier,
copy and media. Written after reading every layer of `tools/prompt.mjs creative-director`,
`agents/designer/references.md` in full, `agents/designer/custom.md`, the gold notes (Layday, Global
Surf), the round-3 `concepts.md` of this business and the ledger history of its picks. All 22
photographs were opened and measured with PIL. Every colour below was sampled with PIL (the median
of a pixel box, listed in §6).

## 0. Why this round exists, and what it must beat

- **Purpose (Shahar, 2026-10-20):** to test the design skills added in PR #31, and to compare the
  results with the earlier mockups.
- **Round 2, "the printed spec card"** (picked 2026-09-20, interactive). Shahar's verdict: "good
  color separation, bad color tones". He liked the movement and found it "a little outdated".
- **Round 3, "the berth"** (picked 2026-09-22, unique "Inside", now a gold page). Shahar's verdict:
  "the only variant with an idea on the first screen, in the business's own colour". It showed no
  photograph on the first screen, its booking accent was violet, and its devices were 1–2 px ink
  lines, a ladder rule and square ruled boxes.
- **What has changed since round 3.** `agents/designer/custom.md` now asks for photography to lead
  the page. It also asks for clean white grounds, a readable text face plus one expressive display
  face (a script is welcome), and room galleries with dot navigation. It bans decorative lines,
  rules and borders. Tasteskill's house rules ban violet, hairlines and ruled boxes. "Inside" would
  fail all of these today. This round therefore keeps two things from round 3: the yellow plaster
  as the business's own colour, and one idea per first screen. It **retires the berth archetype**.
  There is no drawn box, no ladder line, no ink rule and no violet.
- **"Clearly better" means**, for every concept: the business's own photographs lead the first
  screen at the largest size they honestly hold (round 3 showed none there). The room is sold with
  a gallery. The booking panel lets the visitor choose dates before handing off to a listing. The
  page uses whites and one booking colour, with white text on that colour.

### Skills used, and what each changed

| Skill | What it decided here |
|---|---|
| `/design-taste-frontend` (`draw.mjs --sector hospitality --have photography --options 3`, then one full sheet per direction under `.taste-skill/layday-v2-*`) | It dealt three directions: **uneven-photographs**, **pinned-poster** and **place-carries-it**. Its house rules removed violet (round 3's booking colour), thin rules, eyebrows and captions. Its "one live thing" rule became the stay chooser in the booking panel. Final directions: concept 1 **specimen-catalogue**, concept 2 **pinned-poster**, concept 3 **name-as-a-monument**. Redraws and swaps, each with its reason:<br>(1) **place-carries-it → name-as-a-monument** (concept 3). The direction needs a full-bleed photograph of the place, and none exists honestly: the best own photograph is 1024 px, `assets.mjs "Kabalana beach"` found nothing usable, and "Ahangama beach" found only CC BY-SA files, which the rubric excludes.<br>(2) **pinned-poster type**: Barlow Condensed → Libre Franklin, because Shahar judged Barlow Condensed "not great" (references.md calibration).<br>(3) **uneven-photographs**, concept 1. First its hero ("two prints in darkness", a dark ground) and type (Switzer, KA v2's dealt face; then Newsreader, on impeccable's default list) were redrawn. Then the whole direction was dropped once Lavish v2's finished calm "Prints" turned out to use it on a white wall. Two direction redraws gave place-carries-it and name-as-a-monument (both unusable for concept 1), so **specimen-catalogue** was dealt directly with `--direction` (§3 candidate 3, the material board).<br>(4) The motions "scaling wordmark" (concept 3) and "shutter image" (concept 1) are both dealt to KA v2. Motion cannot be redrawn, so both are replaced by hand and named in their concepts. |
| `/impeccable` (`context`, `reference/new-work.md`) | **Mode: Persuade**: the visitor must decide and act, by opening a listing with their dates. It set the §3 method: the product's mechanism, the rut, seven candidate worlds from at least three material families, colour strategy before colour, and faces chosen off its default list. It also set the **raises** written into each concept. Its `concept-seed` roll **did not run**: it refuses without a PRODUCT.md, and writing one is outside this station's lane (see Gaps). |
| `/design-motion-principles` | Weighting for a marketing / hospitality page: **Jakub primary** (production polish, 200–500 ms), **Jhey secondary** (one playful moment per page at most), **Emil** for the booking controls, which visitors use often, need to feel fast, and stay under 300 ms. Frequency gate: the hero and section moves are rare, and the booking panel is occasional. |
| `/animation-vocabulary` | It gave each concept's signature its exact name: *Crossfade* and *Marquee* (concept 1), *Scroll-driven animation* on a sticky stage plus an *Origin-aware animation* for the panel (concept 2), and a *Continuity transition* / *Layout animation* plus a *Text morph* (concept 3). |

## 1. What this business actually is

The whole hostel is **one air-conditioned dormitory** (`room_types[]`; Catherine: "just one dorm
room … so it is very quiet"). It is newly built (Beth, Akshay, Alina). Every bed is its own
**yellow-plastered berth**, with a curtain, a black wall lamp and a square niche, over locking
drawers and reached by a black steel ladder (`img-002`, `img-008`, `img-018`). Nobody can say how
many beds there are: Booking says 6, a guest says 4 bunks (`contradictions[0]`). It sits behind **a
large black gate nobody can find**. The way in is through the gate, across a wooden platform, to a
door right of the house (`location.finding_it`), and a sign was only promised. It has **no website,
no WhatsApp, no email and no socials**: three OTA listings and a phone (`existing_site`,
`contact.*`). Every rating it holds is perfect on a small sample: Hostelworld **10/10 from 10
reviews**, Booking.com **10/10 from 6**, Google **5.0/5 from 15**, all re-read on 2026-09-25
(`reviews.*`). And guests stay longer than they meant to: "I was only supposed to stay a night and
… ended up here a week" (Taiya); "I extended my stay way longer than expected" (Beth).

## 2. What the material can and cannot carry

**Video:** none. There is no `videos[]` key in the dossier, and the business has no channel to take
video from. This is a pitch point: one short clip of the room and the walk to the beach would change
this page more than any design can.

**Photographs, the business's own:** 22 files, all `business-owned` (Booking.com listing photos).
Measured: 12 are **576 × 768** portrait and 10 are **1024 × 768** landscape. **The largest usable
width is 1024 px, and nothing clears 1200 px, so nothing is drawn full-bleed from one photograph in
any concept.** Two honest ways to fill a wide screen are used instead:
(a) **a band of upright prints set edge to edge.** Three 4:5 crops at ≤ 576 CSS px each fill
1440 px with no upscaling, and four do at 1920 px.
(b) **one large print at or under native size** beside type.
Landscapes are shown at ≤ 1024 CSS px, and portraits at ≤ 576. All prints in one run share a ratio
(references.md #26), with 4:5 or 2:3 crops from near the centre.

The ten strongest, looked at:

| Id | Size | What it shows | Role |
|---|---|---|---|
| `img-018` | 1024 × 768 | inside a lower berth: yellow plaster ceiling and back wall, square niche, white pillow, black lamp, curtain drawn back | the berth from inside |
| `img-012` | 1024 × 768 | the dorm through the open timber-and-glass door: yellow berths on both sides, a teak door at the end, concrete floor, the bench with violet, ochre, green and grey cushions, the abstract painting | the room, whole |
| `img-002` | 576 × 768 | a lower berth up close: plaster, curtain tied back, lamp, niche, white bedding, black locking drawers, black ladder | **the one thing, photographed** |
| `img-017` | 1024 × 768 | the bench, cushions and painting (a water cooler takes the right fifth) | the sitting place |
| `img-005` | 576 × 768 | down the room between the berths to the teak door, with a ceiling fan | the room, long |
| `img-011` | 576 × 768 | the room toward the glass doors and garden, with the painting and the bench | the room, open |
| `img-008` | 576 × 768 | a berth's end with its ladder, a palm in a white pot, a timber stool | berth detail |
| `img-013` | 576 × 768 | cane locker fronts beside poured-concrete shelving | material |
| `img-003` | 576 × 768 | a white basin on concrete over cane cabinet doors, with a round cane mirror | material |
| `img-001` | 576 × 768 | the porch: tall timber-framed glass doors, a bench, cane lamps, a magenta doormat | arriving |

Also usable: the garden paths `img-007` and `img-010` (green, a boardwalk), the steps and decking
`img-004`, the canopy with a slice of sea `img-016`, and the beach frames `img-019`, `img-020` and
`img-021` (1024 px). The beach frames show people in the line-up, a walker on wet sand, and a blue
board carried along the shore. **The dossier does not say where the beach frames were taken**, so
the alt text describes them and never names "Kabalana".
**Not used:** `img-009` is a private double room, which the dossier does not sell. `img-022` is
dominated by a third-party resort. `img-015` is weak. `img-006` and `img-014` are near-duplicates
of `img-003` and `img-012`.
**No photograph shows the gate or the platform.** `img-004` and `img-010` show decking, but nothing
ties them to the directions. So the directions never sit next to those two photographs, which could
be read as "this is the platform".

**Atmosphere:** there is no `stock/` folder. A search through tasteskill's `assets.mjs` found no
usable Kabalana image under an allowed licence (the Ahangama results are all CC BY-SA, which the
rubric excludes). None is needed: the business owns its beach frames.

**Words (passed copy):** short headings worth setting large: *"A two-minute walk from Kabalana"*,
*"Just one dorm"*, *"Finding the door"* and *"Newly built, and kept that way"*. The tagline is *"Surf,
chill and feel at home in Ahangama"*. The longest blocks are `about` and `offer`. Beth's is the
long quote. Taiya's "only supposed to stay a night … ended up here a week" is a Booking.com quote
in the dossier, **truncated by "Read more"**. The copy's `about` block paraphrases it with the
verbatim fragment "ended up here a week".

**Numbers:** 10/10 (10), 10/10 (6) and 5.0/5 (15); seven Hostelworld categories at 10.0, which date
from the harvest; check-in 14:00–19:00 and check-out by 14:00; 19 amenities; phone +94 77 855 3343;
plus code `X9H3+93 Ahangama`; pin 5.9784609, 80.3526536.

**Gaps:**
- No rates.
- No WhatsApp or email.
- No season.
- No Instagram, so custom.md's "Instagram feed" section cannot exist. That is a pitch point.
- No bed count.
- No photograph of the gate.
- **No `audit.json`** for this business (see Gaps at the end).

The gap worth designing around is still the gate: the directions get their own section in every
concept.

## 3. The page archetype: **the way in**

**Mode (impeccable): Persuade.** A stranger on a phone must believe that this one quiet room is
worth booking. They should leave with dates in hand and a listing open.

**The mechanism, in one sentence:** you are not booking a hostel, you are booking a bed in its only
room, at the end of a short walk that nobody can find without help.

**The rut, kept out:** the category page (a full-bleed hero, room cards, an amenity icon grid,
reviews, a footer) and its predictable opposite. Round 3 already took the opposite, a drawn first
screen with no photograph.

**Seven candidate worlds**, from the traveller's world, ordered by resonance and drawn from five
material families:

1. **The way in** (a route). From the beach two minutes away, past the gate and the platform,
   through the glass door, into the one room, to your bed. It looks like the photographs themselves,
   in walking order.
2. **The sign the owner promised** (a printed artefact). A hand-painted gate sign that does not
   exist yet. It looks like a sign-painter's script in ink on lime plaster.
3. **The material board** (materials). Yellow lime plaster, cane weave, poured concrete, teak and
   black steel. It looks like an architect's sample board, flat fields of each.
4. **One night became a week** (time). The extended stay. It looks like a calendar strip that keeps
   growing.
5. **The berth** (an object). Retired in round 3 and spent here.
6. **The OTA listing** (a tool). This is the rut, and is spent at most once.
7. **The line-up at Kabalana** (a place). The beach frames are only 1024 px, and Lavish and Global
   Surf share the beach.

**Chosen: 1, the way in.** The page is ordered the way a guest arrives. First, what is two minutes
behind you (the beach). Then the turn at the black gate, where the page has words and no picture,
because there is no photograph of the gate. Then the glass door, the one room, your berth, the
things in it, the people who stayed, and the practicalities. The booking is the last step, "your
bed", and it is reachable from every screen.

It belongs to Layday and to no other business in the run. Lavish's way in ends at a pool in a
courtyard, and KA's ends in a garden. Only here does the walk end in one room with one row of
yellow berths, and only here is the way in itself the problem guests write about. The archetype
organises the media; it never replaces it.

**Raises taken from the candidates that lost** (impeccable: a losing candidate donates one
discipline, never its clothes):
- *From 2, the sign:* the section titles of concept 2 are set as a sign-painter's script. Concept 2
  is the sign the gate does not have yet.
- *From 3, the material board:* colour commits at page scale. Every field on every concept is a
  flat field sampled from one material. There are no tints, no gradients and no lines.
- *From 4, one night became a week:* the **one live thing** in every concept is the stay chooser.
  The visitor picks arrival and nights, and the three listing buttons carry those dates. Taiya's
  and Beth's words sit beside the nights control.

**Shared by all three concepts:**

- **Booking: what the channels are.**
  - The dossier's path is `engine`: Booking.com, Hostelworld and Agoda, plus a phone. There is no
    WhatsApp or email, so no prefilled message is invented (playbook §5).
  - The primary action is **"Check dates"**, class engine. This is an assumption, because there is
    no `audit.json`; it matches the copy's `bookingLinks[].label`.
  - The panel holds: arrival (a native date input), nights (a stepper, 1–14), and the three listing
    buttons labelled as in the copy. It also holds the offer block's sentence "Rates change with the
    dates. The booking links show what is available.", and `tel:+94778553343` as a button.
  - **Dates in the hand-off:** a listing button may append arrival / departure / one guest **only in
    a parameter form the designer verifies on that live listing during 4e**, opening the listing at
    its date-filled step. A listing whose parameters are not verified gets the dossier URL exactly as
    it is (references.md #22 is about stale or broken parameters; these come fresh from the
    visitor).
  - Every button is a real `<a href>` to the dossier URL underneath, so everything works with
    JavaScript off (#3). No engine is called on load or ever, because the links are plain links.
  - Taps to book: **2** (Check dates → a listing), assumed as the `clicks_to_book` target. On a phone
    a bar stays at the foot with "Check dates" (the accent) and "Call" (#4). Nothing covers the page
    on load (#20).
- **Ratings:** each is shown with its platform, count and "read 25 September 2026", never averaged.
  **Use the dossier's values (Hostelworld 10/10), not the copy's 9.8** (see Conflicts).
- **Room gallery:** custom.md asks for rooms sold with galleries. The one room gets a slideshow with
  dot navigation of `img-012`, `img-005`, `img-011`, `img-002`, `img-018`, `img-008` and `img-017`,
  one ratio per run, with swipe on a phone and arrow keys on a desktop.
- **Never, in any concept:**
  - a bed count;
  - "Kabalana" on a beach photograph;
  - captions under photographs;
  - eyebrows or all-caps labels;
  - 01/02/03 numbering;
  - middle-dot strings;
  - arrows on links;
  - hairlines, borders or ruled boxes;
  - violet, cream, terracotta or teal.
- **The address** is the copy's `Warnagiri Welhengoda, Ahangama 80650, Sri Lanka` (Google's, place
  names capitalised; playbook §6).

## 4. Three concepts

### 1 · calm: **"Samples"** (tasteskill direction: *The specimen catalogue*, hero *Statement beside specimen mosaic*)

**The idea:** the room is presented the way an architect presents a new house: a sample board. Flat
tiles of its own materials (yellow lime plaster, cane, poured concrete) sit beside close photographs
of the things made from them. The walk in reads as a quiet catalogue of one newly built room.

**Why this direction:** this concept was first dealt *uneven-photographs*. Lavish v2's finished calm
concept ("Prints": uneven prints on a white wall, h1 and button bottom-left, slow crossfade) uses
the same direction, and the two would look interchangeable, so Layday changed (hard constraint 2).
Two redraws of the direction gave *place-carries-it* (impossible: there is no full-bleed photograph)
and *name-as-a-monument* (concept 3 already has it). *The specimen catalogue* was then dealt
directly, because it is candidate 3 of §3 (the material board), and Beth's "newly built and so well
designed" is the business's strongest claim about itself. Competitor test: KA is a garden of
separate buildings and Lavish a hotel of nine room types. Neither is one room built from four
materials you can name.

**Idea sentence:** on this page, *the room's own materials (lime plaster, cane, concrete, black
steel)* become *specimen tiles on a sample board*.

- **The one thing:** the yellow plaster, as the largest tile, holding the berth (`img-002`). It is
  the only saturated field on the first screen.
- **First screen (1440 × 900):** the viewport is split 50/50 by tone alone. The left half is white
  and the right half one step darker, `#E9E9EA`. They meet at a clean edge with no line.
  - **Left half:** "Layday Surf Ahangama" top-left at 20 px on a 32 px margin. Under it, h1 **"A
    two-minute walk from Kabalana"** in Pilcrow Rounded 700 at about 4.4 vw on two lines, sentence
    case, tracking −0.04 em, filling the upper 40 %. At the bottom-left: the tagline at 18 px, then
    one line "10/10 on Hostelworld, 10 reviews, read 25 September 2026", then the red "Check dates"
    button beside it. The rating sits in the hero because this quiet page has no other proof above
    the fold, and it is one small line, not a stack over media.
  - **Right half:** a mosaic of seven tiles on a 4-column × 3-row grid with 12 px gaps, five cells
    left empty so the tiles stagger, and the rightmost column cropped by the viewport edge. The
    tiles are:
    - **`img-002`** (the berth) as the double tile, 2 × 2, about 340 × 453 CSS px from 576 native,
      on yellow plaster `#E2B827`;
    - **`img-013`** (cane lockers), 3:4 crop, on cane `#B58D5B`;
    - **`img-003`** (basin and round cane mirror) on concrete `#C4CBD1`;
    - **`img-018`** cropped 3:4 to the niche and lamp (576 × 768 of 1024 × 768) on yellow;
    - **three flat material tiles** with no photograph: lime plaster, cane, concrete. These are the
      sample-board swatches, and they carry the colour of the page.

    Each photograph sits full in its tile at native size or under. They are not cut-outs, and the
    multiply blend is dropped: these are real photographs, not product shots.
- **On a phone:** the statement at 9 vw on two lines inside 20 px margins, then the tagline, the
  rating and the button. Below that, the darker field runs full width with a two-column mosaic of
  five tiles (berth double, cane, basin, plaster swatch, concrete swatch), the right column started
  48 px lower and the last row cropped by the screen. The foot bar is fixed with "Check dates" and
  "Call".
- **Structure, in walking order:**
  1. **The room, in one sentence:** blueprint "Statement with inline thumbnails". The copy's offer
     sentence "The dormitory is air-conditioned, with lockers and luggage storage." is set as a
     centred statement at about 44 px. Two inline frames, one cap-height tall, crop the photographs
     the words name: *dormitory* → `img-012`, *lockers* → `img-013`.
  2. **Finding the door:** plain text on white, the copy's four sentences in one 52ch column.
     Beside it: the plus code `X9H3+93 Ahangama` set large as a fact, an "Open in Google Maps"
     button (dossier `map_url`), and Catherine's quote. **No photograph** (§2).
  3. **Just one dorm:** the room gallery. A slideshow with dots of the seven room photographs in
     16:10 at up to 1024 CSS px, with the two `about` paragraphs and the room row beside it.
  4. **Newly built, and kept that way:** blueprint "Object on a disc", with the disc replaced by the
     room's own round object, **the cane mirror** (`img-003`). A flat disc 60 vh across in one
     material colour holds a circular crop of the chosen item. Bottom-left is a list of five names:
     The berth (`img-002`), The lockers (`img-013`), The basin (`img-003`), The bench (`img-017`),
     The porch (`img-001`). Choosing a name crossfades the crop (300 ms) and steps the disc to that
     item's sampled colour. One copy sentence sits at the disc's edge. The section heading is the
     copy's "Newly built, and kept that way".
  5. **Guests:** the three ratings set large, with count and date. Beth's quote beside a 3:4 crop
     of `img-017` (blueprint "Portrait and offset quotation", **which replaces the dealt "Quotes on
     paper slips"**: rotated slips with zig-zag `clip-path` tears are an impeccable detector tell and
     not calm). Jennine and Catherine follow below in smaller type.
  6. **What there is:** blueprint "Two-column menu, photo bullets", used for the amenities. A 52 px
     photo bullet appears only where a photograph honestly shows the item: lockers `img-013`,
     seating area `img-017`, air conditioning (the unit in `img-005`), garden `img-007`. The other
     rows are plain text.
  7. **The wave:** the `spot` sentence, then `img-019` and `img-021` side by side at native size.
  8. **Book a bed:** blueprint "Photo strip, three-cell bar", on a concrete `#C4CBD1` field. A strip
     of ten small room photographs drifts slowly across the top (the page's one moving picture).
     Below it, the heading "Check dates", then **the three-cell bar is the stay chooser**: arrival ·
     nights · "Show the listings", each a filled cell with floating labels (calibration: modern
     floating labels). The listing buttons and "Call" appear under it. This doubles as the panel the
     header's "Check dates" scrolls to.
  9. **Footer:** blueprint "The mark, built large". "Layday" built from flat blocks, each letter
     knocked out of a rectangle in one material colour (plaster, cane, concrete, plaster, cane,
     concrete), on white. Below it: the address, the phone as a button, the three listings as
     buttons and the check-in times.
- **Colour** (tasteskill palette "Blush, sage, slate": its proportions are kept, a neutral ground
  with three or four flat fields rotating and one deep accent; its colours are replaced by the
  room's materials):

  | Role | Hex | Sampled from |
  |---|---|---|
  | ground | `#FFFFFF` | the bed sheet in `img-002` (brightest 2 % `#E9E9EA`, taken to paper white) |
  | surface (right half, cells) | `#E9E9EA` | the same sheet as photographed, `img-002` |
  | field 1, lime plaster | `#E2B827` | the berth's back wall, `img-002` |
  | field 2, cane | `#B58D5B` | the cane locker fronts, `img-013` |
  | field 3, concrete | `#C4CBD1` | the poured-concrete floor, `img-005` |
  | ink | `#0B0F10` | the black steel ladder, `img-008` |
  | **booking accent**, buttons only, white text | `#D91628` | the red block of the abstract painting, `img-017` (white on it 5.1:1; 3.1:1 against concrete) |

  Red is never placed on the yellow field (2.7:1 there). The booking bar sits on concrete. This
  palette would look wrong beside cream (the plaster turns to ochre), beside any blue (Lavish), and
  beside leaf green (KA).
- **Type: Pilcrow Rounded only** (the dealt one-family system). Bold for the statement and the
  section titles, 400 for reading. Its fully rounded stroke ends repeat the soft, hand-floated
  edges of lime plaster and the moulded rim of the basin, which a sharp grotesk would not. Sentence
  case throughout (the sheet's all-lowercase is dropped, because place names stay capitalised).
  The face is not on hard constraint 15's list or impeccable's, and no other business in the run
  uses it.
- **Motion** (Jakub weighting, calm):
  - **Signature:** a slow **Crossfade** in the double tile. `img-002` → `img-008` → `img-018`, 1.6
    s each way, held 5–6 s, paused when the tab is hidden. The dealt "Shutter image" was not used,
    because KA v2's unique concept opens on a shutter.
  - **Entrances:** a **Scroll reveal** with a **Stagger** in each section (heading → text → picture,
    70 ms, rising 20 px, once).
  - **The disc:** a **Crossfade** of 300 ms on choosing an item.
  - **The photo strip:** a slow **Marquee** that pauses on hover or focus.
  - **Feedback:** **Press feedback** on buttons (scale 0.97, 120 ms).
  - JS ≈ 6 KB. No canvas (PLAN.md §9).
  - **Reduced motion:** the first photograph only, no marquee, no reveals.
  - **JS off:** the disc shows its five items as a stacked list of circular crops; the bar's cells
    become the three plain listing links.
- **Booking pattern:** the header's "Check dates" scrolls to the booking section and focuses
  "arrival". On a phone it opens the same three cells as a full-screen sheet (Rancho, references.md
  #1). Plain links are underneath (#3), there is one accent (#6), and the foot bar is #4.
- **Photographs:** four tiles on the first screen (≈ 200 KB AVIF in all). First load ≈ 380 KB with
  one font family (≈ 40 KB).
- **Forecast: No.** The calm page keeps zero embeds. The wave section is the spot sentence and two
  photographs.
- **Why it beats the current web presence:** there is no site (`existing_site.url` null), so the
  comparison is the OTA listings, where these photographs are thumbnails in a grey grid. Here the
  first screen reads like a design studio's presentation of a new house: the yellow berth large on
  its own plaster colour, the cane and concrete beside it, the place and a 10/10 in one look, and
  "Check dates" one tap away. It also beats round 3 "Berth" (calm), which showed one 288 px print.
- **Fails if:** the swatches read as an empty colour-picker. Each swatch must sit next to the
  photograph of the material it is cut from, and there are never more than three.

### 2 · interactive: **"One room"** (tasteskill direction: *The pinned poster*, hero *Pinned title over portraits*)

**The idea:** one title holds still, "Just one dorm", while views of that one room pass beneath it.
Each view brings its own flat ground colour, sampled from the photograph.

**Why this direction:** the pinned poster suits a subject that is a series. Layday's series is the
strangest fact about it: twelve photographs of a single room. The fixed title says what the series
is ("Just one dorm"), and the changing photograph shows its members. Competitor test: Lavish has
nine room types and KA has a garden of rooms. The sentence only works here.

**Idea sentence:** on this page, *the twelve photographs of the only room* become *portraits passing
under one pinned title*.

- **The one thing:** the one room. Every panel is a view of it, and the yellow berth appears in
  three of the four.
- **First screen (1440 × 900):**
  - a pale ground in lit plaster `#EED38F`;
  - **the pinned title, h1 "Just one dorm"**, in Libre Franklin 700 at about 8.5 vw, **left-set
    across columns 1–7 on two lines** ("Just one / dorm"), ink. Its cap line is 120 px from the
    top. It **never overlaps the portrait** (Shahar: no giant word over the media);
  - **off-centre, in columns 8–12**, `img-002` cropped 2:3 at 512 × 768 CSS px (576 native), its
    top 90 px from the top edge, running to the bottom edge. This is deliberately not a centred
    frame: KA v2's "Stories" centres its frame with the h1 split around it;
  - top-left, above the title: "Layday Surf Ahangama" at 15 px. Top-right: "Menu";
  - bottom-left, columns 1–4, under the title: the tagline and the intro heading as one 18 px
    column ("Surf, chill and feel at home in Ahangama. A two-minute walk from Kabalana."), 30ch;
    then the raspberry "Check dates" button directly under it;
  - no rating here: it goes with the guests, because this first screen's job is the room.
- **On a phone:** the title is pinned at the top at 15 vw on two lines. The portrait sits at 78 %
  width against the right margin at 2:3 (304 × 456, native 576), starting under the title. The
  sentence follows. The button is fixed at the foot with "Call".
- **The pinned run (2.5 screens, `position: sticky`, never hijacked):** the title stays at left,
  and four views follow in the right-hand frame. Each is 2:3 in the same place, and each turns the
  stage ground to its own sampled colour:

  | Order | Photograph | Ground | Sampled from |
  |---|---|---|---|
  | 1 | `img-002` (berth) | `#EED38F` | lit berth end, `img-008` |
  | 2 | `img-005` (down the room) | `#C4CBD1` | the poured-concrete floor, `img-005` |
  | 3 | `img-003` (basin, cane) | `#D4B299` | the round cane mirror, `img-003` |
  | 4 | `img-018` as a 2:3 crop (512 × 768) | `#FFFFFF` | the bed linen, `img-002` |

  One line of copy changes with each panel, at 16 px under the portrait's left corner:
  1. the room note "The only room: one air-conditioned dormitory";
  2. "There is housekeeping every day.";
  3. "The showers are hot.";
  4. "Rates change with the dates."

  Every line is the passed copy, verbatim. Nothing passes over the title, and the run releases on
  white.
- **Structure after the release:**
  1. **The room gallery:** a slideshow with dots, all seven room photographs in 16:10 at up to
     1024 CSS px. The two `about` paragraphs and the room row sit beside it.
  2. **Finding the door:** the copy's sentences in a narrow column. Beside them, a **lazy
     OpenStreetMap embed** with a pin at the dossier's `lat_lng`, in a reserved box (the page's
     second embed, after Rosa). Its fallback is the "Open in Google Maps" button with the plus code.
     Catherine's quote sits under it.
  3. **Guests:** tasteskill "Quotes in the gutters", **not pinned** (the page has one pinned stage).
     The three ratings with count and date come first. Then Beth, Jennine and Catherine, each
     beside a small print (`img-017`, `img-013`, `img-001`), alternating sides. Akshay and Taiya are
     short lines.
  4. **The wave:** the `spot` sentence, then the forecast block, then `img-019` and `img-021`.
  5. **Practicalities:** times, notes, and the amenities in plain lines.
  6. **Contact** (blueprint "Visit card on a photograph", taken down to native size): `img-012` at
     1024 px with an opaque white card at its corner holding the address, the check-in times, the
     phone button and "Check dates" across the card's foot.
  7. **Footer:** the menu, the three listings as buttons, and the address.
- **Section titles** ("The room", "Finding the door", "Guests", "The wave", "Practicalities"):
  **Yellowtail**, a sign-painter's script, at about 48 px in ink. This is the raise from candidate 2:
  Catherine writes that the owner "promises a sign will be put up ASAP", and until it is up, the
  site is the sign. Everything people read is Libre Franklin 400 (body at 17–18 px) and 500 for
  controls.
- **Colour:** grounds from the table above, plus:

  | Role | Hex | Sampled from |
  |---|---|---|
  | ink | `#0B0F10` | the black steel ladder, `img-008` |
  | **booking accent**, buttons only, white text | `#860F47` | the magenta doormat at the porch door, `img-001` (white on it 9.7:1; it holds on every ground: 6.6 on plaster, 5.9 on concrete, 4.9 on cane) |

  This palette would look wrong beside KA's leaf green and Lavish's pool blue. It would also look
  wrong beside saturated yellow as a ground: the berth yellow `#E2B827` appears only inside
  photographs on this page.
- **Type:** Libre Franklin (tasteskill redraw), with Yellowtail in place of the sheet's Source Serif
  4. The sheet's newspaper text serif is swapped for the sign script because custom.md asks for an
  expressive display face for section titles. The translation is named. Libre Franklin is a plain
  American gothic, and at 700 its title reads like the stencilled lettering on a gate. Neither face
  is on the default-look list or impeccable's list, and neither is used elsewhere in the run.
- **Motion** (Jakub primary, one Jhey moment):
  - **Signature:** a **Scroll-driven animation** on a sticky stage. As each panel's spacer crosses
    the middle of the screen, the portrait **Crossfades** (350 ms) and the stage ground steps to the
    panel's colour (400 ms, ease-in-out). Transform and opacity only; the ground is a full-size
    layer per panel that fades.
  - **Booking panel:** an **Origin-aware animation**: Kube's in-page overlay grows out of the
    "Check dates" button that opened it (300 ms ease-out, Emil's speed rule; 0.3 s as in #17). It
    closes back into the button. Esc closes it and focus returns.
  - **The live thing:** the nights stepper, with a **Text morph** on the count. Beside it, Taiya's
    fragment "ended up here a week" is in plain type, with no animation.
  - **Microinteractions** (Shahar asked for them in round 2):
    - **Press feedback** on buttons;
    - a **Direction-aware transition** on the gallery (a slide in the direction of travel, 320 ms);
    - each dot fills as its slide arrives;
    - the listing buttons in the panel **Stagger** in at 40 ms;
    - Kube parallax (±4 rem) on the guests' prints, off at ≤ 767 px (#17).
  - JS ≈ 18 KB, started after first paint; the panel's code boots on first interaction (#5). No
    canvas, no WebGL.
  - **Reduced motion:** no pin. The four panels stack as four portraits on their own grounds, the
    gallery jumps without sliding, and the panel opens instantly.
  - **JS off:** the same stacked panels, the panel as `<details>`, the gallery as a scroll-snap row,
    and plain listing links.
- **Booking pattern:** Kube's in-page overlay (#1), origin-aware, with the stay chooser. It hands
  off only on a listing tap, with a plain link underneath (#3) and one accent (#6). The foot bar on a
  phone is #4.
- **Photographs:** `img-002` at 512 px on the first screen (≈ 80 KB AVIF). The other panel
  portraits are lazy. First load ≈ 350 KB plus ≈ 18 KB JS.
- **Forecast: Yes**, in the wave section, after the `spot` sentence and below every offer.
  - **Mapping:** dossier `location.spot` "Kabalana beach break" → Rosa spot id **`kabalana`**, name
    **"Kabalana"**. It was confirmed in Rosa's `data/index.json` on 2026-09-22 (round 3), and the
    fixture is `agents/designer/fixtures/rosa-kabalana.json`, spot `kabalana`, 5.97747 N
    80.34842 E. The Rock reef has no Rosa spot and is never represented by this block.
  - **Left half, drawn by the site** in Libre Franklin on white: wave height now, the time it is
    for, swell period and direction, and wind with on/cross/offshore. One headline, no days.
  - **Right half:** Rosa's widget, `theme=light`, in a reserved 420 × 500 box, with its `src` set
    near the viewport.
  - **Fallback:** "See today's forecast for Kabalana on Rosa".
  - **Credit:** "Forecast for Kabalana by Rosa".
  - **Cost:** two lazy embeds (Rosa + map), zero requests on load.
- **Why it beats the current web presence:** on Hostelworld this room is a carousel of thumbnails
  among dozens of hostels. Here a visitor's first screen says, in one line, the thing no other
  hostel can say, "Just one dorm", over a big, sharp photograph of the yellow berth. Scrolling walks
  them through the room before they are asked anything. It also beats round 3 "Curtain", whose
  print sat behind ink lines.
- **Fails if:** the four grounds read as a colour gimmick, or the script reads as a 1950s diner.
  Each ground must be the photograph's own material, and Yellowtail is used for section titles only,
  never for a button, never for the h1, and never in capitals.

### 3 · unique: **"Name in plaster"** (tasteskill direction: *The name as a monument* (redrawn from *The place carries it*), hero *Name under a photograph*)

**The idea:** the name stands as a monument in the berths' own yellow plaster, under a band of the
room's photographs set edge to edge. When the visitor taps "Check dates", that yellow field opens in
place into the stay panel. The booking lives inside the business's own colour.

**Why this direction:** the dealt "place carries it" needs a full-bleed photograph of the place, and
none exists at any honest size or licence (§0). The redraw gave the name as a monument. Its
blueprint's photograph across the top 58 % is built here as a **band of upright prints at native
size**, which fills the width without upscaling. That band is the full-blown first screen this
material can honestly carry, and it is what round 3's "Inside" never had: the room itself, large,
on the first screen.

**Idea sentence:** on this page, *the berths' yellow lime plaster* becomes *the field the monument
name stands in, which opens into the booking*.

- **The one thing:** the yellow plaster `#E2B827`, carried at page scale exactly once (impeccable's
  *Committed* strategy: one saturated colour on 30–60 % of the first screen). The band of
  photographs is the room; the field is its wall.
- **First screen (1440 × 900):**
  - **Top 58 % (≈ 522 px):** three 4:5 prints set edge to edge with no gaps, each 480 × 522 CSS px
    cropped from 576 × 768 (native, not upscaled): `img-002` (berth), `img-013` (cane and concrete),
    `img-011` (the room toward the garden). At ≥ 1728 px a fourth print joins (`img-008`), so no
    print ever exceeds 576 CSS px.
  - Three links sit over the top-right print with a neutral scrim behind that row only.
  - **Bottom 42 %:** a flat field of berth yellow `#E2B827`. Across it, **h1 "Layday"** in Boska 400
    at about 19 vw (one line, tracking −0.05 em, ink), its baseline 28 px above the bottom edge.
  - Between the band and the name, 24 px under the photographs, one 17 px row: at the left margin,
    "Surf hostel in Ahangama, a two-minute walk from Kabalana." Its words must be the copy's (the
    designer builds it from `tagline` + the intro heading). At the right margin, the raspberry
    "Check dates" button.
  - No rating on this screen: the monument is the whole statement, and the ratings get their own
    section.
  - The name is **not over any photograph** (the calibration: no giant word over media). It stands
    in the plaster under them.
- **On a phone:** one 4:5 print at full width (390 × 488, native 576) for the top 50 svh. Then
  the yellow field with "Layday" at 23 vw on one line, the sentence and the button above it on the
  left margin, and the foot bar fixed.
- **The live thing: the field opens.** "Check dates" expands the yellow field downward in place
  (**Layout animation / Continuity transition**: the same yellow rectangle grows, so the visitor
  never leaves the colour). It reveals:
  - arrival, and the nights stepper with a **Text morph** on its count;
  - Taiya's fragment beside it: "only supposed to stay a night … ended up here a week";
  - the three listing buttons, `#860F47` with white text (5.1:1 on the yellow);
  - the rates sentence;
  - "Call".
  The name stays visible above the panel. On a phone it is a bottom sheet in the same yellow, rising
  from the foot bar. Esc and a close button collapse it back.
- **Structure, in walking order:**
  1. **The two minutes:** blueprint "Narrow column, empty field", taken down to one column. The
     intro block in a 340 px column at the name's left edge. Beside it, `img-020` at native size,
     closing the void as tasteskill's frame rule asks.
  2. **Finding the door:** blueprint "Side facts, wide paragraph". The left column holds the plus
     code, "Check-in 14:00–19:00" and the map button. The wide paragraph is the copy's directions
     at about 24 px in Boska. Catherine's words follow. No photograph.
  3. **Just one dorm:** blueprint "Square plate, spare text". A 1:1 plate from `img-012` (768 ×
     768, native) on the left. The right holds the room gallery's dots as the tabs, so the plate
     *is* the slideshow. The `about` text and the room row sit there too.
  4. **Guests:** blueprint "Lead quote, corner quotes", on the yellow field again. This is the only
     other time the yellow appears at page scale, closing the loop with the first screen. Beth's line
     "I extended my stay way longer than expected" is set as the lead at a statement size (≤ 36 px,
     three lines). Jennine and Catherine sit in the corners. The three ratings with count and date
     sit under the lead.
  5. **The wave:** the `spot` sentence, the forecast, and `img-019` / `img-021`.
  6. **Practicalities:** blueprint "Line-up at one type size". Check-in, check-out, the notes and
     the amenities as one table at one size, with no bold and no lines.
  7. **Contact:** blueprint "The email as display type", adapted to the only channel there is. The
     **phone number +94 77 855 3343 set as display type** across the width, as a `tel:` link. The
     address and the three listings sit in the corners.
  8. **Footer:** blueprint "Name first, places under it". "Layday" again at full width, cropped
     at the bottom edge (not the top, which the inspector fails), on white, with the listings under
     it.
- **Colour:**

  | Role | Hex | Sampled from |
  |---|---|---|
  | ground | `#FFFFFF` | the bed sheet, `img-002` (brightest 2 % `#E9E9EA`, taken to white) |
  | **the field**, first screen + guests only | `#E2B827` | the plastered back wall of a lower berth, `img-002` |
  | ink | `#0B0F10` | the black steel ladder, `img-008` (10.2:1 on the yellow) |
  | **booking accent**, buttons only, white text | `#860F47` | the magenta doormat, `img-001` (9.7:1 under white text, 5.1:1 against the yellow) |

  This palette would look wrong with cream anywhere (it turns the yellow into round 2's ochre), with
  red (fast food), and with blue (Lavish).
- **Type: Boska only** (tasteskill's one-family system). Roman for the monument and the body at
  18 px, and the lively italic for the guests' lead quote and the section titles. That gives the
  expressive display voice custom.md asks for without a second family. Boska's pointed,
  high-contrast serifs read as carved at 19 vw, which suits a monument in plaster. At body size it
  stays readable. Checked: Boska is not on hard constraint 15's list or impeccable's list, it is
  under a yellow field and white rather than cream, and no other business in the run uses it.
- **Motion** (Jakub primary, Jhey for the one moment):
  - **Signature:** the field opening, a **Continuity transition**, 420 ms with an asymmetric
    ease-out. The panel's controls **Stagger** in at 50 ms after the field has grown. It is
    interruptible: a second tap during the open reverses it.
  - **The moving picture,** replacing the dealt "scaling wordmark", which KA v2 is also dealt: a
    **Scroll-driven animation** on the photograph band. As the first screen scrolls away, the band
    slides left by up to half a print, so the room seems to pass the window. It is not pinned and
    holds nothing: a translate on the band only, off at ≤ 767 px.
  - **Entrances:** a **Scroll reveal** with a **Stagger** per section.
  - **Feedback:** **Press feedback** on buttons. The phone number's characters lift 2 px in a
    **Stagger** on hover or focus: the one playful touch, rare in use.
  - JS ≈ 12 KB. No canvas or WebGL: the full-blown moment comes from scale, colour and the field
    that opens, not from rendering.
  - **Reduced motion:** the band stays still, and the field opens instantly.
  - **JS off:** the field is a `<details>` that opens the same panel without dates. The listing
    buttons are plain links.
- **Booking pattern:** an in-place expanding panel. This is the slide-down model (#1, Tandjung Sari)
  taken into the hero's own field rather than over the page. It has a plain link underneath (#3), a
  first-interaction boot (#5) and one accent (#6). The phone bar is #4.
- **Photographs:** three band prints on the first screen (≈ 3 × 60 KB AVIF). First load ≈ 400 KB.
  `img-012` as a 1:1 plate at 768.
- **Forecast: Yes.** The same mapping as concept 2 (dossier "Kabalana beach break" → Rosa
  `kabalana`, "Kabalana"), in the wave section after the spot sentence. The headline is in Boska on
  white, and the widget is `theme=light`, 420 × 500 reserved, lazy, with the same fallback and
  credit. It is the only embed, because the map stays a button.
- **Scroll set-piece: No.** There is no video and no photograph ≥ 1920 px, let alone eight. The band
  translate is a small scroll-linked move with no pin and no hold, so it is not a set-piece pattern.
- **Why it beats the current web presence:** on the OTAs the name is a line of blue link text and
  the yellow berths are thumbnails. Here the first screen is the room, edge to edge, standing on a
  wall of its own yellow with the name cut into it, and the dates are one tap away inside that
  yellow. It also beats round 3's "Inside", whose first screen was a drawing with no photograph.
- **Fails if:** the band looks like a template's three-up grid. The prints must touch, with no
  gaps, no rounding and no shadow, and must be cropped tight so the three read as one wide look
  into the room. Or if the name in Boska reads as a fashion brand. The sentence beside it must say
  "Surf hostel in Ahangama" at once.

## 5. Divergence table

The other two businesses' v2 `concepts.md` were **not there when this file was first drafted, and
both were there before it was finished**. Their rows below are copied from their own tables:
`sites/ka-surf-hostel-and-restaurant-v2/concepts.md` and `sites/the-lavish-haven-v2/concepts.md`.
Both list Layday's rows from round 3, because this file did not exist when they wrote theirs. After
reading them, Layday changed twice (rule: change yours, not theirs):
- concept 1 left *uneven-photographs*, because Lavish v2's calm "Prints" uses it on a white wall;
- concept 2's portrait moved off-centre, because KA v2's "Stories" centres its frame between a
  split h1.

| Business | Variant | Archetype | First-screen device | Grid | Colour ground | Motion idiom | Booking pattern | Scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| **Layday v2** | calm · Samples | the way in | statement on white beside a sample-board mosaic: the berth photograph on its own yellow plaster tile, cane and concrete swatches, the right half one tone darker | 50/50 tone split, then 12-col | white `#FFFFFF` + sheet `#E9E9EA` | slow crossfade in the berth tile; photo-strip marquee | in-page three-cell stay bar (header scrolls to it) / full-screen sheet on a phone | — |
| **Layday v2** | interactive · One room | the way in | pinned two-line title "Just one dorm" at left; a 2:3 room portrait in the right-hand frame; the ground changes to each photograph's material | left title + right frame, sticky stage, then 12-col | lit plaster `#EED38F` → concrete → cane → white | scroll-driven portrait and ground swap; origin-aware overlay | overlay grown from the button, stay chooser | — |
| **Layday v2** | unique · Name in plaster | the way in | a band of three upright prints edge to edge over a berth-yellow field holding "Layday" at 19 vw | full-width band + field, then single column | white + berth yellow `#E2B827` | the field opens in place (continuity); the band drifts on scroll | expanding in-place panel in the hero field | — |
| KA v2 | calm · Patio | the camera roll | half-screen mint field holding one 384 px print of the cottages; title + button centred in the other half | 45/55 split, sticky field | cool white `#F1F2FB` + mint | sticky-print curtain, 0 JS | native popover sheet | — |
| KA v2 | interactive · Stories | the camera roll | the h1 split to both margins around a centred 360 × 480 story frame | centred reel, one pinned heading | cool white + pineapple fields | story frame, drag rails | in-page overlay sheet | — |
| KA v2 | unique · The roll | the camera roll | the whole viewport a staggered six-column contact sheet of KA's frames, one cell holding name, h1 and button | six-column sheet | cool white, cyan once | shutter on load, idle crossfades, shared-element viewer | right slide-out / bottom sheet | — |
| Lavish v2 | calm · Prints | the view from the room | two prints at uneven sizes on a white wall; h1 + button bottom-left | 12-col, uneven prints | cool white `#F4F5F8` | slow crossfade in the small print; parallax drift | direct link + docked bottom bar | — |
| Lavish v2 | interactive · Pick your view | the view from the room | split stage: a balcony view fixed at right, the hotel scrolling at left; view chooser | 55/45 split, one sticky half | pale aqua `#E3F0F1` | crossfade of the fixed view + FLIP room list | direct link + slide-down dates panel | — |
| Lavish v2 | unique · Do not disturb | the view from the room | a two-sided door hang tag beside a native-size night-pool print | object + print, 12-col | neutral white `#F5F6F4` | spring swing, 3D flip, curtain footer | the tag is the booking card | — |

No archetype + first-screen combination repeats: "the way in" appears only in Layday's rows. No row
in the run carries a set-piece, so none is shared.

**Near-misses, stated rather than hidden:**
- **A sticky stage at left versus right.** Layday's "One room" holds a pinned title at left with the
  photograph changing at right. Lavish's "Pick your view" holds a fixed photograph at right while
  the hotel scrolls at left. On Layday, the words hold and the room and its ground change. On
  Lavish, the view holds and the words move. Layday's ground also changes colour per panel, which
  Lavish's pale aqua never does.
- **A pinned heading** exists in both KA "Stories" and Layday "One room". KA's h1 is split around a
  centred story frame that plays like a phone. Layday's title stands in one left block beside an
  off-centre portrait, on a ground that changes colour.
- **Split first screens:** KA "Patio" (mint field with one small print) and Layday "Samples" (white
  beside a mosaic of seven tiles in three material colours). KA shows one picture in a field, and
  Layday a sample board.
- **Crossfades** recur in all three businesses as a secondary motion. Each business's signature
  differs: KA's story frame and shutter, Lavish's swing tag and fixed view, and Layday's field that
  opens and its grounds that change.
- **White grounds** appear in all three businesses, because `agents/designer/custom.md` asks for
  clean whites. They are held apart by the carried colour (Layday's yellow plaster and raspberry or
  red; KA's mint, pineapple and cyan; Lavish's aqua and night-pool blue) and by type (Pilcrow
  Rounded, Libre Franklin + Yellowtail and Boska here; neither other file uses them).

**The Lavish Haven:** a visitor sees the view from inside a hotel room, with water and a pool from
above. At Layday the first thing seen is the inside of one yellow room and its materials, with no
water until the wave section.

**KA Surf Hostel:** a visitor sees a phone's camera roll of a garden hostel, with frames and
stories in mint and pineapple. At Layday there is no green and no phone metaphor. The page is one
room in yellow plaster, cane and concrete.

## 6. Where every fact and colour comes from

| In this file | Dossier key |
|---|---|
| one dorm; one room type | `room_types[]`, `reviews.quotes[]` (Catherine) |
| no bed count | `contradictions[0]` |
| newly built; housekeeping daily | `reviews.quotes[]` (Beth, Akshay, Alina), `facilities[]` |
| stayed longer than planned | `reviews.quotes[]` (Taiya, truncated; Beth) |
| two-minute walk to Kabalana Beach | `location.distance_to_beach`, Beth |
| black gate, wooden platform, door right of the house; sign promised | `location.finding_it`, Catherine, `gaps[]` |
| 10/10 (10), 10/10 (6), 5.0/5 (15), read 2026-09-25; categories 10.0 (harvest date) | `reviews.hostelworld`, `.booking`, `.google` (+ `refreshed[]`) |
| check-in 14:00–19:00, check-out by 14:00 | `stayInfo` |
| phone +94778553343; no WhatsApp, email, site or socials | `contact.*`, `existing_site` |
| three listings, path `engine` | `booking.path`, `booking.engine_url`, `booking.other_engines` |
| no rates | `gaps[]` (`offers`) |
| plus code, pin, map link | `location.plus_code`, `location.lat_lng`, `location.map_url` |
| Kabalana beach break; The Rock reef | `location.spot` |
| address (as in the passed copy) | `location.address` (playbook §6 capitalisation) |
| photograph sizes and contents | `images[]`, PIL on each file, looked at |
| no video | no `videos[]` key |
| Rosa `kabalana` | Rosa `data/index.json` (round 3, 2026-09-22) and `agents/designer/fixtures/rosa-kabalana.json`; not a dossier fact |

Colour sample boxes (left, top, right, bottom, in image pixels; median per channel):
- berth yellow `img-002` 310,250,420,440 → `#E2B827`
- lit berth `img-008` 290,300,330,700 → `#EED38F`
- ladder ink `img-008` 343,250,352,700 → `#0B0F10`
- sheet white `img-002` 60,540,260,640, brightest 2 % → `#E9E9EA`
- concrete floor `img-005` 300,620,380,700 → `#C4CBD1`
- cane locker fronts `img-013` 60,200,140,330 → `#B58D5B`
- cane mirror `img-003` 180,160,200,240 → `#D4B299`
- painting red `img-017` 440,150,480,190 → `#D91628`
- doormat magenta `img-001` 360,555,385,572 → `#860F47`

Refused samples:
- cushion violet `#3C1D51` (`img-012`): banned by tasteskill;
- painting cobalt `#014B8B` and board blue `#157AC1`: too close to Lavish;
- cushion green `#96A65A`: too close to KA;
- teak door `#75421B` (`img-005`): teak on pale plaster is the banned "cream with rust" look;
- sea `#849794`: a muted teal (hard constraint 15).

## Gaps, conflicts and pitch points

- **Conflict, ratings (copy vs dossier).** `copy/en.json` `ratings[]` has Hostelworld **9.8**/10,
  but the dossier was re-read on 2026-09-25 to **10**/10 (count 10). The copy's ratings rows also
  carry no `capturedAt`. Ratings are deployer-seeded evidence (schema), so the designer should seed
  them from the dossier and show "read 25 September 2026". The copy's `about` sentence "10 out of
  10 in every category" matches the categories, which date from the harvest. This is not mine to
  edit; it is flagged for the orchestrator.
- **Gap, no `audit.json`.** `dossier/layday-surf-ahangama-v2/` has none, and the original never had
  one (the ledger fork note says "audit files copied", but there were none to copy). Hard
  constraint 8 depends on it. I assumed: primary action "Check dates", class engine, 2 taps to book,
  above-fold order = Check dates, Call. The auditor (3b) should confirm before the critic measures.
- **Skill gap, impeccable needs a PRODUCT.md.** `impeccable context` reports
  PRODUCT_INIT_REQUIRED, and `concept-seed` refuses to roll without it. Writing PRODUCT.md is
  outside 4d's lane (and would be one file for a multi-business repo). Its new-work method was
  followed by hand in §3, with no dice roll. If impeccable's roll is wanted at 4d, the pipeline
  needs a per-business PRODUCT.md (for example generated from the dossier) or a documented
  exemption. That is a proposal for Shahar.
- **Skill conflicts, settled in favour of this repo's rules:**
  - tasteskill's dealt palettes "Burgundy and bubblegum" and "Warm black, gold" are dark grounds,
    which constraint 4 forbids. Their proportions were kept and their colours taken from the room.
  - tasteskill's "captions under images" were dropped (constraint 6).
  - tasteskill prefers one family, while custom.md asks for text + display. Concept 3 meets both
    with Boska roman + italic; concept 2 uses two families.
  - tasteskill's "Coast" stock photographs (picsum) are not used anywhere: atmosphere may not stand
    in, and these are not even of Sri Lanka.
- **Other businesses, not mine to act on:** KA's `stock/index.json` (and its v2 copy) lists files
  under **CC BY-SA** (`stock-010` to `stock-013`). The rubric names share-alike as an excluded
  licence, so the KA concepts should not use them.
- **Pitch points:**
  - no video;
  - no Instagram (custom.md's Instagram section cannot exist);
  - no WhatsApp, so no prefilled message;
  - no rates;
  - no photograph of the gate;
  - the name: "Layday" is never explained, and the site does not guess what it means.
- **What I would most want photographed on location:** the walk in, as one continuous clip of 8–12
  s from the road. The black gate opening, the wooden platform, and the door right of the house
  swinging open onto the yellow berths. It would be the hero video every concept here is waiting
  for, and the directions guests keep asking for.
