# KA Surf Hostel (v2) — concepts

Station 4d, **creative-director 0.5.1**, 2026-10-20, run `2026-10-lk-surf-01` (design-skills round).
Fork of `ka-surf-hostel-and-restaurant` (run `2026-09-ahangama-02`): same dossier, copy and media.
Written after: the full runtime prompt (`tools/prompt.mjs creative-director`), `agents/designer/references.md`
read in full, `agents/designer/custom.md`, the gold notes (KA, Global Surf), the round-3 concepts and the
ledger history of all three earlier rounds, the picked round-3 page (`mockups/unique`, rendered at 1440 and
390 and looked at, screenshots deleted), and all 24 photographs opened as pictures. Every colour below was
sampled from the image files with PIL (median of a pixel box; boxes in §6).

## 0. What the earlier rounds settle, and what this round must beat

- **Round 1, the kitchen noticeboard** (rejected: "no mockup looks good"; too text-heavy, dated). **Round 2,
  the chart** (`mockups-rejected-02/`, not picked; borrowed sea photographs, orange buttons "cheap and
  outdated"). Both archetypes stay retired: no pinned cards, mats, tilts, charts, horizon lines.
- **Round 3, the garden** — `Canopy` was picked and is now gold (`agents/designer/gold/ka-surf-hostel.html`).
  Gold rule: its first-screen device (drawn cut-paper leaves with a clearing), section order, palette
  (`#F0F1F2` / `#75A12B` / watermelon `#F05654`) and face (Outfit) may not be reused. Looking at it again
  against Shahar's later calibration (2026-09-29) and the current `agents/designer/custom.md`, it fails
  today's bar in five ways this round fixes on purpose: **no photograph of KA on the first screen**; a
  giant three-line headline; ink text on the booking colour; underlined text links and a rule under the
  header; rooms as a list beside one small photograph, no Instagram, no designed footer.
- So the new round keeps the garden only as material, not as the idea, and answers the question Canopy
  dodged: **how does a business whose best photograph is 576 px wide open on its own photographs?**

## 1. What this business actually is

A few small cottages and an old columned house in a garden of banana trees and palms, off the main road,
450 yd / a five-minute walk from Kabalana Beach (`location.distance_to_beach`), managed by a local family
(`business.run_by`). Guests score the staff 9.9 on Booking.com and on Hostelworld; one guest wrote that they
nursed her through dengue with Ayurvedic medicine. Another wrote that he *"ended up staying 9 days instead of
2"* (Maximilian, `reviews.quotes[0]`, truncated by Booking.com after that line). It has **no website**: every
picture it owns is a phone picture living on a platform — 12 upright Booking.com frames and 12 Instagram
posts. The whole visual identity of this business is, literally, a guest's camera roll.

## 2. What the material can and cannot carry

**Video, the business's own: none in the dossier** (`videos: null`). But one exists: `img-013` is the cover
of an Instagram **reel** posted by @kasurfhostel on 28 January 2026
(`https://www.instagram.com/kasurfhostel/reel/DUDRxbRD153/`, a rice-and-curry table from above). The
harvester (0.1.0) took only its cover. It is business-owned footage that `tools/fetch-video.mjs` should fetch
(gap, §7). Until it is harvested, **no concept may use it**, and none opens on video: the honest reason is
that the dossier holds no video file.

**Photographs, the business's own — 24 files, 361–1024 px.** Largest usable width of the best photograph:
**576 px** (the 576 × 768 upright Booking.com frames). **Nothing may be full-bleed** (hard floor 1200 px).
Every print in every concept is shown at **≤ 432 CSS px wide on desktop (≤ 384 preferred) and ≤ 300 CSS px on
a phone**, so a 1.5× screen gets about one image pixel per device pixel. One crop ratio per run of pictures:
3:4 upright (references.md #26); the 640 × 640 Instagram frames are centre-cropped to 480 × 640.

The ten strongest, all looked at:

| asset | px | what it shows |
|---|---|---|
| `img-006` | 576 × 768 | two cottages under coconut palms and banana trees, grass, blue sky — the place |
| `img-003` | 576 × 768 | a hand holding a fruit plate (papaya, watermelon, passion fruit, pineapple, banana) against blurred garden — sharpest, most saturated |
| `img-005` | 576 × 768 | the open-air bathroom: glass roof on a steel frame, black shower wall, round basin, plants, palms overhead |
| `img-001` | 576 × 768 | a private room: whitewashed plank walls, double bed with blue runner and pillows, door open to green |
| `img-004` | 576 × 768 | the dorm: grey-green timber bunks, white linen with blue runners, corrugated ceiling, fan |
| `img-002` | 576 × 768 | the long table at night under the columned veranda, about ten guests, terracotta floor |
| `img-007` | 576 × 768 | a cottage with its door open on a bed, two pale-mint chairs on the patio, banana leaf |
| `img-008` | 576 × 768 | a bathroom: round basin, window full of banana leaves, black shower wall |
| `img-020` | 640 × 640 | a man with cyan and white soft-top boards on the beach (upright) |
| `img-016` | 640 × 640 | low sun on the sea through palm fronds |

Also usable: `img-018`, `-019`, `-021`–`-024` (beach and board frames from Instagram, **stored rotated** —
turned upright before cropping; `-021` and `-022` show the board rack and people carrying boards),
`img-012` and `img-009` (the house wall with its ring lamp, and the cottages, at night; 1024 × 576, dark —
once, small), `img-013` (361 × 640, the reel cover; ≤ 180 CSS px or not at all).
**Not usable:** `img-015` (someone else's Threads post about Madeira), `img-010` (the "Sea Food Restaurant"
roundel — no restaurant is supported, `contradictions[3]`), `img-014` and `img-017` (groups at other
premises, people unidentified), `img-011` (buffalo in a field, nothing ties it to the hostel). Beach frames
are never labelled Kabalana: the dossier does not say where they were taken.

Count of usable own pictures: **19**. That is enough for the contact-sheet idea in concept 3 (tasteskill
warns below ~20; §4.3 says how it stays full).

**Atmosphere (`stock/`):** looked at again; none is used. The sunsets are warm and dark, the stilt fishermen
and `stock-011` are CC BY-SA (excluded by the rubric's licence rule and removed from round 3 for being
re-saved), the chart is a retired archetype. Every concept works on KA's own pictures alone.

**Words** (`copy/en.json`, passed): tagline *"Surf, chill and feel at home in Ahangama"*; headings *"Five
minutes from Kabalana Beach"*, *"What guests say about the staff"*, *"Breakfast, every day"*, *"Dorms and
private rooms"*, *"What is here"*, *"Getting here"*; Mia's dengue quote (the strongest sentence anyone wrote
about any business in this run); five testimonials.

**Numbers:** 9.8/10 Hostelworld (66), Booking.com and Google (see §7: the copy is stale against the dossier),
staff 9.9 / 9.9, check-in 13:00–23:00, check-out by 13:00, six bed and room rows, 17 amenities, 450 yd to
the beach, Koggala Airport 3.3 mi, Ahangama station 1.3 mi.

**Gaps worth designing around:** no rates (the copy's own sentence carries it: *"the booking links below show
what is actually available"*); **no WhatsApp, no email** — booking is three OTA listings and a phone
number; no season. None is interesting enough to build a page on.

## 3. The page archetype — **the camera roll**

**Impeccable mode: Persuade.** The visitor's success is a decision and an action (open a listing with the
right room in mind); the page earns that with real proof (KA's own pictures, 9.8 from 66, the guests' words).
Persuade gets full commitment, not Operate-style restraint.

**How the world was chosen (impeccable `reference/new-work.md`, run by hand — `impeccable concept-seed`
refused without a PRODUCT.md, which this station may not write):** the rut is the category page (full-bleed
hero + name + booking strip — impossible here anyway at 576 px) and its predictable opposite (a type-only or
drawn first screen — which is what Canopy was). The literal reading of the brief, "the garden", was spent
last round. Seven worlds the traveller knows by heart, by resonance: (1) **the phone camera roll / Instagram
grid** — upright frames packed edge to edge, the exact native format of everything KA owns; (2) **Instagram
stories** — one upright frame at a time, tap-through, progress segments; (3) the hand-painted lettering on
tuk-tuks and shop boards along the Galle road; (4) the breakfast plate; (5) the Sri Lanka Railways ticket
(retired as "artefact" by rounds 1 and 2 and by Layday's earlier card); (6) the OTA listing page itself (the
rented identity — the thing we sell against); (7) the hostel whiteboard (the retired noticeboard). The
camera roll wins on both of impeccable's axes: the audience identifies with it instantly (they are holding a
phone), and it is honest product clarity — it is the only world in which **576 px photographs are at their
natural size**. Worlds 2 and 4 are folded into the concepts below (the story frame; the papaya accent).

**Why it belongs to KA and to no other business in the run:** KA is the only one of the three with no site
of its own and nothing but phone pictures (`existing_site.notes`, `gaps[images]`), and the one whose guest
wrote that two nights became nine. The page is the stay as a guest's phone remembers it: many upright
frames, small and sharp, in order — and among them, the name, the score and the button. Competitor test:
put Layday or Lavish in the sentence and it fails — Lavish has 79 photographs at hotel quality and a pool to
open on; Layday is one room. Neither *is* a camera roll.

**The one shape:** the upright 3:4 frame. Every picture on every concept is one. Corners: one radius for
the whole site, **8 px**, on frames, cards and buttons (custom.md allows tasteful rounding; tasteskill's
"square or fully round" is overruled by custom.md, §8).

**Shared by all three concepts (one business):**

- **What + where + action on the first screen, nothing more:** the h1 *"Five minutes from Kabalana Beach"*,
  the tagline as the one short subtitle, one button **"Check dates"**, and one proof line **"9.8/10 on
  Hostelworld | 66 reviews"** with its capture date. The rating sits in the hero: Shahar, 2026-10-17, "it
  works for KA Surf" (references.md calibration), and it is the strongest fact KA has.
- **Booking — what the channels are** (no `audit.json` exists for this business, §7; derived from playbook
  §5 and the copy): primary action **"Check dates"** opens an in-page sheet (references.md #1, #2, never a
  navigation on first tap) holding the room types grouped as *Dorms* and *Private rooms*, the copy's rates
  sentence, three buttons — Hostelworld, Booking.com, Agoda, each with its platform mark in one ink colour,
  URLs exactly as in `bookingLinks[]`, no date parameters invented (#22) — and a **Call +94 77 374 6053**
  button (`tel:`). The underlying element of "Check dates" is a plain link to the Hostelworld listing
  (`bookingLinks[0]`), so it works with JS off (#3). **Taps to book: 2** (Check dates → a platform). On a
  phone a bottom bar stays: "Check dates" in the accent, a call icon button beside it (#4). Nothing covers
  the page on load (#20). Booking code loads on first interaction (#5).
- **Accent rule:** one accent per concept, **white text on it**, on booking controls only (#6, custom.md,
  calibration "never black or blue text on orange").
- **Rooms are sold, not listed** (calibration): every concept has a room gallery with dot navigation
  (custom.md), *Dorms* from `img-004`, *Private rooms* from `img-001` and `img-007`, bathrooms `img-005` and
  `img-008`. Grouped by what is visibly in each picture; no photograph is tied to a specific room type the
  dossier does not tie it to, and no captions under photographs (hard constraint 6; alt text carries it).
- **Instagram** (custom.md, calibration): a section of the 11 usable Instagram frames, each linking to its
  post (`assets/index.json` `source_url`), with a "Follow @kasurfhostel" button. The build never calls
  Instagram.
- **Footer** designed as a close: the name, the three booking buttons, the call button, an Instagram icon
  button, the address *"207/A Welahangoda, Ahangama 80650, Sri Lanka"*, check-in/out — buttons and icons,
  never underlined links (calibration).
- **Forbidden in all three:** captions under photos, rules under the header, underlined action links,
  eyebrows, 01/02/03, middle-dot metadata strings (details use " | ", calibration), reveal animations on
  headings, anything over the first screen's photographs, a photograph wider than §2 allows.

## 4. Three concepts

### 4.1 · calm — **"Patio"**  ·  tasteskill direction **`split-stage`** (The split stage, seed 2113481921)

**Why this direction:** dealt in the second draw; its idea — "half the screen never moves, like sitting in
the room while reading the menu" — is what a calm hostel page should feel like, and its "object centred on a
flat field" variant is the one honest way to hold a 576 px photograph in half a screen. Its default (a
photograph *filling* the half) is refused: at 1440 that is a 648 × 860 CSS box, a 1.5× upscale at 1×.

**The idea:** half the page is the mint of KA's patio chairs, and in it stands one photograph of KA at a
time; the other half is a calm, well-set hostel page.

**The one thing:** the pale-mint paint of the patio chairs (`img-007`), the colour every cottage door opens
onto. One flat field of it, half the screen, the only loud element.

**Structure, in order:**
1. **First screen** (below).
2. **Rooms — "Dorms and private rooms"** (copy offer block): the reading column holds the lead paragraph,
   then a **slideshow with dots** of `img-004`, `img-001`, `img-007`, `img-005`, `img-008` at 384 × 512,
   then the six rows as **two-ended rows** (dealt list blueprint: label left, beds right, no lines between),
   then Wolfgang's words. The fixed half shows `img-004`.
3. **The family — "What guests say about the staff"**: dealt *founder's letter* blueprint, used for the
   guests instead of a founder (KA has no founder text): the about copy in a narrow column with air, Mia's
   quote at 24 px as the section's one large text, Clara's beneath. Fixed half: `img-002` (the long table).
4. **Breakfast — "Breakfast, every day"**: the one section that **breaks the split** (tasteskill's monotony
   warning): full-width mint field, dealt *square plate, spare text* — `img-003` cropped square at 384 × 384
   on the left half, the heading, the one-line copy and Elena's words on the right; `img-013` at 160 px
   beside the plate.
5. **What is here**: dealt *capabilities as a menu* — the 17 amenities as a white sheet on the mint field,
   grouped *In your room | Around the house | Services*, name left, note right (no scallops, no dot leaders,
   no lines). Fixed half: `img-005` (the open-air bathroom).
6. **Kabalana**: the `spot` sentence at 24 px, Saketh's words, `img-020` and `img-016` as two 3:4 prints.
   Fixed half: `img-006`.
7. **Instagram**: dealt *one frame, contents change* — one 300 px 3:4 frame crossfading the Instagram
   frames (CSS keyframes, 600 ms fade, 2.4 s hold), tap advances, the post links and "Follow @kasurfhostel".
8. **Getting here**: dealt *address in display rows* — address, "Check-in 13:00–23:00 | Check-out by 13:00",
   "+94 77 374 6053", each a row at 44–64 px on alternating mint tones; "Open in Google Maps" button. Copy's
   getting-here block beside.
9. **Footer** (shared spec), on mint.

**The first screen (1440 × 900):** a plain header (no rule): "KA Surf Hostel" at the left, three plain links
(Rooms, Breakfast, Getting here) and the papaya "Check dates" button at the right. **Left 45 %:** the mint
field, top to bottom, and centred in it `img-006` (the cottages under palms) at **384 × 512 CSS**, 8 px
corners. **Right 55 %:** on the cool white ground, vertically and horizontally centred on that half's axis:
the h1 in Albert Sans 500 at 52 px on two lines, the tagline at 20 px, the "Check dates" button, the proof
line at 15 px. Nothing else. **On a phone (390 × 844):** header row; the mint field takes the top 50 % with
`img-006` at 228 × 304 centred; then h1 at 34 px (two lines), tagline, full-width button, proof line; the
bottom bar fixed. Proof point in the hero, for the reason in §3.

**Why it beats the current presence at first glance** (no website; `existing_site.url: null`, so the
comparison is the Hostelworld listing a visitor would otherwise see, and the gold Canopy page): the visitor
sees KA's own cottages, sharp and framed, in KA's own colour, with the score and one button — instead of an
OTA page wrapped in another company's chrome and competitors' listings, or a page of drawn leaves with no
picture of the place at all.

**Colour:**

| role | hex | sampled from |
|---|---|---|
| ground | `#F1F2FB` | the sky over the cottage roof, `img-007` |
| **field — the one colour carried large** | `#CCE3D6` | the mint patio chair, `img-007` |
| ink | `#060504` | the night sky behind the long table, `img-002` |
| secondary ink (notes, values) | `#5A5A69` | the black shower wall in daylight, `img-005` (6.1:1 on ground, 5.0:1 on mint) |
| **booking accent** | `#CC4A1E` | the papaya in the hand's shadow, `img-003` — white on it 4.6:1 |

Ink on mint 15:1. Wrong beside: cream or sand (it turns the mint grey and dated), the OTAs' brand blues
(so platforms appear as one-ink marks only), Canopy's banana green (two greens fight). Not default-look: the
field is mint, not sage or teal, and it is the paint on KA's chairs; the accent is a clean saturated
papaya, not a muddy 90s orange (hard constraint 7) — it was sampled where the fruit is deepest, not chosen.

**Type:** **Albert Sans** (dealt text face; 400 body at 18 px, 500 for the h1 and buttons) + **Kalam** for
section titles only (Regular, 40–56 px). Imbue, the dealt display face, is redrawn by hand: custom.md asks
for an expressive display face for section titles with a handwritten script welcome, and Imbue set floor
to ceiling is the "giant word" Shahar rejected (calibration). Kalam is a South-Asian informal handwriting
face (Indian Type Foundry, OFL) — the hand of a family-run place, not a brush script (#24 warns brush
scripts date); its rounded joins sit with Albert Sans's open forms. Two families, ≈ 90 KB subset.
Not Outfit (gold), not Lora/Dancing/Marck/Damion/Satisfy (Global Surf gold), not on the default-look list.

**Motion — signature: a sticky-print curtain.** Each section carries its own `position: sticky` print in
the mint half; as a section arrives its print slides up over the previous one (scroll does the work: a
*scroll-driven* replacement, no script — tasteskill's split-stage "the fixed image quietly changes", built
without a crossfade timer). The dealt "Scaling wordmark" is redrawn out: there is no giant wordmark here.
Feedback: buttons take a *press* (scale 0.97, 100 ms ease-out). Slideshows are CSS scroll-snap with anchor
dots. **Zero bytes of JavaScript:** the booking sheet is a native `popover` (`popovertarget`, no script);
browsers without it follow the plain link to Hostelworld. **Reduced motion:**
the Instagram frame holds its first picture; nothing else moves anyway. **JS off:** identical. **WebGL:**
not used (calm, PLAN.md §9).

**Booking pattern:** Tandjung Sari's panel (#1) as a native popover sheet, rising from the foot on a phone;
shared booking spec (§3).

**Photographs:** first screen `img-006` only (≈ 45 KB AVIF at 576 w); fixed half `img-004`, `-002`, `-005`,
`-006`; galleries as listed; ≤ 432 CSS px everywhere. First load ≈ 200 KB (HTML, CSS, two font files, one
print).

**Forecast:** **No.** Calm promises no script; the forecast block needs one.
**Further embed:** none (a "Open in Google Maps" button instead).
**Scroll set-piece:** — (calm never carries one).

**Fails if:** the page becomes five screens of the same split with only the text changing — breakfast must
break the split full width, and each reading-column section must hold a different thing (a gallery, a
letter, a menu sheet, display rows).

### 4.2 · interactive — **"Stories"**  ·  tasteskill direction **`pinned-poster`** (The pinned poster, seed 1963801229)

**Why this direction:** dealt in the third draw; "a single frame
stays centred while its contents change … every scroll step is a new cover" is exactly how a traveller
looks at a place on a phone — one upright frame at a time. It carries world (2), Instagram stories, and its
hero blueprint ("sentence split by a frame") puts KA's photograph in the exact centre of the first screen.

**The idea:** the first screen is a story — KA's photographs, one upright frame at a time, standing between
the two halves of the sentence that says where it is.

**The one thing:** the upright frame of a phone picture, holding KA's own photographs in sequence. The blue
runner on every KA bed carries the colour — in sun for the fields, in shade for the button.

**Structure, in order:**
1. **First screen** (below).
2. **Chapters:** a row of five round chapter buttons under the hero (*Rooms | Breakfast | The garden | The
   beach | Evenings*), each a 72 px circle holding a centre crop of its first picture — the circles of KA's
   plate, basin and ring lamp. Tapping one loads that chapter's pictures into the hero frame (a *continuity
   transition*: the circle grows into the frame).
3. **Rooms — "Dorms and private rooms"**: dealt *pinned heading, passing rows* on a full-width **runner-blue
   field**: the heading in Gochi Hand pinned at the left; on the right three blocks pass — *Dorms* (`img-004`,
   the three dorm rows), *Private rooms* (slideshow with dots `img-001` / `img-007`, the three private
   rows), *The bathrooms* (`img-005` / `img-008`, the copy's bathroom sentence) — each a 3:4 print at 288 px
   beside its list. Second and last pin on the page.
4. **The family — "What guests say about the staff"**: dealt *pinned title, portraits pass*, re-dealt as
   **quotes pass** (KA has no portraits of the family that the dossier ties to them): the about copy, then
   the copy's testimonials about the people (Mia, Clara, Wolfgang) set at 24 px in white cards (8 px
   corners, a soft shadow allowed by custom.md) beside `img-002` held still.
   *Not pinned* (two pins per page is the limit): the quotes are a horizontal *drag* rail with snap and the
   next card peeking (#14, #18).
5. **Breakfast — "Breakfast, every day"**: `img-003` at 384 × 512 on the runner-blue field, the line, Elena's
   words, `img-013` small.
6. **What is here**: the amenities in three short columns with small line icons (calibration: "a list with
   icons at most"), the info copy beside.
7. **The beach — Kabalana**: the `spot` sentence; the **Rosa forecast** (below); a drag rail of the upright
   beach frames (`img-020`, `-018`, `-019`, `-021`, `-023`, turned upright, 240 px); Saketh's words.
8. **Instagram**: a 4-column grid of the Instagram frames (3:4 crops, 8 px gaps) linking to their posts,
   "Follow @kasurfhostel" button.
9. **Getting here**: two columns, no lines — left the copy, the check-in/out times as large figures and the
   address; right the map embed (below).
10. **Footer** (shared spec), on the runner-blue field.

**The first screen (1440 × 900):** plain header — "KA Surf Hostel" left, the runner-blue "Check dates"
button right. On the vertical centre line: **"Five minutes"** flush to the left margin and **"from Kabalana
Beach"** flush to the right margin, Public Sans 600 at 44 px (one `h1`, split by layout, read in order). Dead
centre between them, **the frame: 360 × 480 CSS, 8 px corners**, playing the *Rooms* story (`img-006`,
`img-001`, `img-004`, `img-005`, `img-003`): five progress segments across its top edge (the dot navigation
Shahar asked for, in story form), 4 s per picture, tap the right or left half to move, swipe on touch. The
reel's neighbours show as 48 px slivers above and below the frame, so it reads as a reel. Under the frame,
centred: the tagline at 17 px, the runner-blue **"Check dates"** button, the proof line. (The header's
button is the persistent booking control, as in every concept; the hero holds no other action.)
**On a phone:** "Five minutes" at 9 vw flush left, the frame at 300 × 400 centred, "from Kabalana Beach"
flush right, then tagline, a full-width "Check dates", proof line; slivers of the reel 24 px. Rating in the
hero as §3 says.

**Why it beats the current presence:** on Hostelworld the visitor scrolls a grey thumbnail strip inside an
OTA template; here the first thing they see is KA's own pictures, played to them the way their phone plays
a friend's stay, with where it is and one button. Against Canopy: the place itself is on the first screen.

**Colour:**

| role | hex | sampled from |
|---|---|---|
| ground | `#F1F2FB` | the sky over the cottage roof, `img-007` |
| **field — carried large** | `#99BCDF` | the blue bed runner in sunlight, `img-004` |
| ink | `#060504` | the night sky, `img-002` (10.3:1 on the field) |
| secondary ink | `#5A5A69` | the black shower wall in daylight, `img-005` |
| **booking accent** | `#306588` | the blue runner on the dorm beds, `img-004` — the same runner in shade; white on it 6.3:1, 3.1:1 against the field |

One hue in two lights: the field and the button are the same textile, so the page reads as KA's beds.
(A pineapple yellow `#DEB85F`, `img-003`, was the first choice and was dropped when Layday v2's concepts
arrived with a yellow-plaster ground `#EED38F` → two yellows in one run.) Wrong beside: cream (the blue
goes cold and grey), the OTAs' brand blues (platforms stay one-ink marks), Lavish v2's pale aqua ground
(KA's blue is a field, never the ground, and two tones deeper). Not default-look: a denim blue sampled from
the bed linen, not petrol or teal.

**Type:** **Public Sans** (dealt text face; 400 body 17–18 px, 600 for the h1 and buttons) + **Gochi Hand**
for section titles only (40–56 px). The dealt display face, Big Shoulders (condensed civic signage,
uppercase 800), is redrawn: custom.md's script and the calibration's "readable, tasteful" exclude a blunt
condensed gothic for a family guesthouse. Gochi Hand is a round marker hand — the words a traveller writes
over their own story — readable at title size, not a brush script (#24). (Yellowtail, the first choice, is
Layday v2's section-title face, so it was dropped here.) Not on any gold page, the default-look list or a
sibling's concepts.

**Motion — signature: the story frame** (*Pinned story* from the sheet, made a *live thing*). Moves, in the
designer's vocabulary (`/animation-vocabulary`): the progress segment fills **linearly** (the one place
linear is right); pictures change by a 300 ms **crossfade**; **drag** with **momentum** and **rubber-banding**
at the ends of the reel; chapter circle → frame is a **continuity transition** (the circle scales into the
frame, 350 ms ease-out). The rooms section is a **pinned** heading with rows passing (sticky, no scroll
hijack). Weighting (`/design-motion-principles`, marketing page): **Jakub** primary (polish, 200–500 ms),
**Jhey** for the story frame only, **Emil** for the booking sheet (it opens in 250 ms ease-out, no bounce —
no spring with bounce on a utility action). No staggered reveals on headings (custom.md overrules
tasteskill step 9 here). Cost: ≈ 18 KB of hand-written JS after first paint, booking code on first
interaction. **Reduced motion:** no autoplay, the first picture holds, taps and swipes still step, no
continuity scale. **JS off:** the frame shows `img-006` with the other four as a native scroll-snap row
beside it; every word in the DOM. **WebGL:** not used.

**Booking pattern:** Kube's in-page overlay (#1) as a sheet from the foot on a phone and from the header on
desktop; shared spec.

**Photographs:** first screen five prints at 360 px (≈ 45 KB each AVIF, first loaded eagerly, the other four
after first paint) — first load ≈ 300 KB; rails at 240–288 px; Instagram grid at 300 px.

**Forecast:** **Yes**, in the beach section, after the `spot` sentence, never higher. Mapping: dossier
`location.spot` "Kabalana beach break …" / `location.distance_to_beach` "Kabalana Beach" → Rosa spot id
**`kabalana`**, name **"Kabalana"** (`agents/designer/fixtures/rosa-kabalana.json`: `spot.id` `kabalana`,
`town` Kabalana). The Rock is named by the dossier too; the block is labelled Kabalana only. Left half drawn
in Public Sans on the ground: wave height now, time, swell period and direction, wind with
on/cross/offshore. Right half: Rosa's widget, **light theme**, as shipped. Two columns, one gutter, no
dividing line (calibration). Lazy, reserved, plain-link fallback, credit "Forecast for Kabalana by Rosa".
**Further embed:** the keyless Google map in "Getting here" (Shahar restored it on the round-3 site,
2026-09-23), lazy, reserved 4:3 box, "Open in Google Maps" button as fallback. Two embeds, both off the
first-load budget.
**Scroll set-piece:** — (interactive never carries one).

**Fails if:** the frame reads as a small phone mock-up floating on a big white screen — it must be the
centre of a composed screen (the two halves of the sentence touching its edges' axis, the reel slivers
visible), and it must never be drawn as a device (no phone bezel, no Instagram chrome).

### 4.3 · unique — **"The roll"**  ·  tasteskill direction **`contact-sheet`** (The contact sheet, seed 1003324209)

**Why this direction, and how it was reached:** the three hospitality draws dealt `place-carries-it`,
`name-as-monument`, `dark-room`, `split-stage`, `uneven-photographs`, `page-is-the-object` and
`pinned-poster`. `place-carries-it` needs a full-bleed photograph ≥ 1920 px (KA has 576); `dark-room` breaks
hard constraint 4 (light grounds, surf vertical); `name-as-monument` is the giant word Shahar rejected;
`page-is-the-object` is the printed-artefact family twice retired (noticeboard, and Layday's spec card);
`uneven-photographs` places one 16:10 photograph across columns 6–12 (≈ 830 CSS px — a 1.4× upscale) and is
already taken by both Layday and Lavish this run. So the sheet was dealt **by id** (`--direction
contact-sheet`, sector hospitality): it is the one composition in the library whose first screen is
**many small frames filling the whole viewport**, which is precisely how a 576 px business can have a
full-screen first screen made only of its own photographs. Recorded as a deviation from a random deal.

**The idea:** the first screen *is* KA's camera roll — every picture it owns, edge to edge, small and sharp —
and one cell of the roll is not a picture but the name, the sentence and the button.

**The one thing:** the mass of KA's own upright pictures — the garden, the rooms, the plate, the boards —
seen all at once. Nothing else is loud; the one coloured field (board cyan) waits until the beach.

**Structure, in order:**
1. **First screen** (below).
2. **Rooms — "Dorms and private rooms"**: dealt *two-ended rows* for the six beds beside a **slideshow with
   dots** at 432 × 576 (`img-004`, `-001`, `-007`, `-005`, `-008`); the copy's rates sentence. (The dealt
   showcase *one image across tiles* is redrawn: cutting a 576 px picture across a full-width board is a
   2.5× upscale.)
3. **The family — "What guests say about the staff"**: dealt *side facts, wide paragraph*: in the side
   column three facts — *Staff 9.9 on Booking.com | Staff 9.9 on Hostelworld | Reception 24 hours* — and
   from the 34 % line the about copy at 24 px; Mia's quote beneath, at the same size, with `img-002`.
4. **Breakfast — "Breakfast, every day"**: `img-003` and `img-013` as a pair of frames from the roll
   (the frames "lift out" of the sheet: same 8 px corners, same gaps), the line, Elena's words.
5. **What is here**: dealt *one-size name columns* — the 17 amenities in three columns at one size, group
   names in ink, items in secondary ink; the info copy above.
6. **The beach — Kabalana**: the page's one colour field, **board cyan, full width**: the `spot` sentence in
   ink, the Rosa forecast (below) in two columns on the cyan, three upright beach frames (`img-020`, `-018`,
   `-023`), Saketh's words.
7. **Instagram**: dealt *small frames, wide space* — a single sideways row of the 11 Instagram frames, cut
   3:4 (not the blueprint's 2:3), 11 vw wide, 5 vw apart, drag/trackpad with snap, ending inside the grid (tasteskill's own
   warning about clipped rows), each a link to its post; "Follow @kasurfhostel".
8. **Getting here**: copy block, check-in/out, address, and the map embed (below) as a 4:3 frame the same
   corner and gap as the roll.
9. **Footer**: dealt *a footer of tiles* — the last rows of the roll: a name tile, a papaya booking tile
   with the three platform buttons, a call tile, an address tile, an Instagram tile, a credits tile. Filled
   tiles in ground tones, 8 px gaps, every cell used.

**The first screen (1440 × 900):** no header bar (blueprint) — the wordmark lives in the text cell; on
scroll a slim header with "Check dates" appears. **Six columns of frames, 8 px gaps and margins**, each
column a stack of upright 3:4 frames ≈ 226 × 301 CSS, **columns offset 0 / −90 / −40 / −130 / −20 / −70 px**
so rows never line up and the top and bottom frames are cut by the viewport. **No caption strips** (the
blueprint's coloured strips under frames are removed: hard constraint 6). **The text cell:** columns 3–4,
from 28 % of the height, a 460 × 410 cell in the ground colour `#F1F2FB`, same corners and gaps as the
frames — in it, centred: "KA Surf Hostel" (Switzer 500, 20 px), the h1 *"Five minutes from Kabalana Beach"*
(Switzer 500, 40 px, two lines), the tagline at 17 px, the papaya **"Check dates"** button, the proof line.
The cell sits in the horizontal centre of the screen. The roll around it, top-left to bottom-right, follows
the stay: garden `img-006`, room `img-001`, plate `img-003`, bathroom `img-005`, dorm `img-004`, cottage
`img-007`, long table `img-002`, boards `img-020`, sun `img-016`, bathroom `img-008`, beach frames, night
`img-012` (cropped 3:4). **Every frame is at native size or smaller** (226 CSS from 576 source = 2.5 image
px per CSS px: sharp even at 2×). **On a phone:** the cell first, full width, about 40 % of the screen
(wordmark 7 vw, h1 at 30 px, full-width button), then the roll resumes as two columns of 3:4 frames (8 px
gaps, the right column 60 px higher) for exactly one more screen; the bottom bar fixed. Rating in the cell,
§3.

**Why it beats the current presence:** a visitor sees in one look more of KA — garden, rooms, breakfast,
bathroom, boards — than the Hostelworld page shows before its fifth scroll, every picture sharp, and the
name and button in the middle of it. Against Canopy: the first screen is entirely the real place instead of
drawn leaves, and it is the boldest of the three without a single drawn or borrowed image.

**Colour:**

| role | hex | sampled from |
|---|---|---|
| ground and the text cell | `#F1F2FB` | the sky over the cottage roof, `img-007` |
| ink | `#060504` | the night sky, `img-002` |
| secondary ink | `#5A5A69` | the black shower wall in daylight, `img-005` |
| **field — once, the beach section** | `#13ACD1` | the cyan soft-top boards, `img-020` (ink on it 7.6:1) |
| **booking accent** | `#CC4A1E` | the papaya in the hand's shadow, `img-003` — white on it 4.6:1 |

The first screen's colour is the photographs; the cell is the ground. Wrong beside: any tinted cell (it
would compete with the pictures), cream (the photographs' cool whites go grey). Papaya never sits on the
cyan (1.7:1): **the beach section has no booking control**; the persistent bar and header carry it there. The cyan was turned down in round 3 because of
the Lavish gold page's pool blue `#12B5EC`; here it is one section only, never the first screen and never
the ground, and §5 checks it against the Lavish v2 concepts.

**Type:** **Switzer** (dealt, one roman weight 400 and 500 for names, Fontshare free licence, self-hosted) +
**Nanum Pen Script** for section titles only (44–64 px). Tasteskill's sheet says one face; custom.md asks for
an expressive display face for section titles, and custom.md decides. Nanum Pen Script is a thin felt-pen
hand — the pen people write with on their own phone pictures, which is the archetype; it is legible at
title size and unlike every script on a gold page.

**Motion — signature: the roll is alive.** Two moves, named for the designer: (1) on load, a **shutter**
(the dealt *image shutter*, a `clip-path` **reveal**) opens the frames column by column from their bottom
edge, 700 ms ease-out, 70 ms **stagger** between columns — the text cell does not animate (no title
reveal, calibration); (2) afterwards, an **idle animation**: every 3.5 s one frame (never one touching the
cell, never two at once) **crossfades** over 900 ms to another picture from the pool, so the roll changes the
way a synced camera roll does — the moving picture this business has no video for. Tapping a frame opens it
with a **shared element transition** into a viewer (the frame grows from its place to 432 × 576, the
chapter's other pictures as a dot slideshow, the chapter's copy beside, Esc/close returns it to its cell).
Weighting: **Jhey** for the roll (it is the delight), **Jakub** for the viewer (polish), **Emil** for the
booking sheet. Cost: ≈ 14 KB of hand-written JS, after first paint; the swap pool lazy-loads after the
first screen is idle. **Reduced motion:** no shutter, no idle swaps; tapping still opens the viewer without
the growth. **JS off:** the static roll, every frame a link to its section, every word in the DOM. **WebGL:**
not used — the roll is all photographs.

**Booking pattern:** a right-edge slide-out on desktop, a bottom sheet on a phone (#1), opened by the cell's
button, the header, the bar, or the footer's booking tile; shared spec.

**Photographs and cost:** first screen ≈ 20 frames at 226 CSS (AVIF at 452 w ≈ 20–25 KB each) ≈ 480 KB plus
HTML/CSS/fonts ≈ 600 KB — inside the 1.5 MB first-load budget; the largest single image ≈ 25 KB; LCP is the
text cell. Swap pool (8 more frames) after idle.

**Forecast:** **Yes**, same mapping as concept 2 (dossier "Kabalana beach break" → Rosa `kabalana`,
"Kabalana"), in the beach section on the cyan field: the headline in Switzer ink on the left, Rosa's widget
on the right in its **light theme** (its own white card reads as a card on cyan), one gutter, no line.
Lazy, reserved, fallback link, credit.
**Further embed:** the keyless Google map in "Getting here", lazy, reserved, fallback button.
**Scroll set-piece:** **No.** The rule allows one only with the business's own usable video or ≥ 8 own
photographs ≥ 1920 px; KA has no video in the dossier and none of its photographs reaches 1920 px. The
shutter and the idle roll are not scroll-driven.

**Fails if:** the roll reads as an Instagram dump with a box on it. It holds only if every frame has the same
ratio, corner and treatment, the rotated Instagram frames are turned upright, the weak frames are left out
rather than used to fill (19 is the pool; a column may repeat a picture only far from its first use), the
cell has generous padding, and the idle swaps are slow and rare.

## 5. Divergence table

The other two businesses of this run were concepted at the same time. Both files existed before this one
was finished and were read: **`the-lavish-haven-v2/concepts.md`** and **`layday-surf-ahangama-v2/concepts.md`**;
their rows below are copied from their own tables.

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern | scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| **KA (v2)** | calm · Patio | the camera roll | half-screen mint field holding one 384 px print of the cottages; title + button centred in the other half | 45/55 split, sticky field | cool white `#F1F2FB` + mint field | sticky-print curtain, 0 JS | native popover sheet | — |
| **KA (v2)** | interactive · Stories | the camera roll | the h1 split to both margins around a centred 360 × 480 story frame playing KA's pictures | centred reel, one pinned heading | cool white + runner-blue fields | story frame (tap/swipe/progress), drag rails | in-page overlay sheet | — |
| **KA (v2)** | unique · The roll | the camera roll | the whole viewport a staggered six-column sheet of KA's own frames, one cell holding name, h1 and button | six-column contact sheet | cool white, cyan once | shutter on load, idle crossfades, shared-element viewer | right slide-out / bottom sheet | — |
| Layday v2 | calm · Prints | the way in | three prints of uneven size hung from one rail on white; small serif h1 under the small print | 12-col, uneven offsets | white `#FFFFFF` | slow crossfade on the tall print | inline bar / full-screen sheet | — |
| Layday v2 | interactive · One room | the way in | pinned title "Just one dorm" above one 2:3 portrait; ground changes per photograph | centred sticky stage, then 12-col | lit plaster `#EED38F` → concrete → cane → white | scroll-driven panel swap with ground steps | overlay grown from the button | — |
| Layday v2 | unique · Name in plaster | the way in | band of three upright prints edge to edge over a yellow plaster field holding "Layday" at 19 vw | full-width band + field | white + berth yellow `#E2B827` | field opens in place; band drifts on scroll | expanding panel in the hero field | — |
| Lavish Haven v2 | calm · Prints | the view from the room | two prints at uneven sizes on a white wall (pool from above, the bamboo blind); h1 + button bottom-left | 12-col, uneven prints | cool white `#F4F5F8` | slow crossfade in the small print; parallax drift | direct link + docked bottom bar | — |
| Lavish Haven v2 | interactive · Pick your view | the view from the room | split stage: the view from a balcony fixed at right, the hotel scrolling at left; view chooser | 55/45 split, one sticky half | pale aqua `#E3F0F1` | crossfade of the fixed view + FLIP room list | direct link + slide-down dates panel | — |
| Lavish Haven v2 | unique · Do not disturb | the view from the room | a two-sided door hang tag beside a native-size night-pool print | object + print, 12-col | neutral white `#F5F6F4` | spring swing, 3D flip, curtain footer | the tag is the booking card | — |

No archetype + first-screen device repeats. No row in the run carries a set-piece, so none is shared.

**One near-miss, stated:** KA *Patio* and Lavish *Pick your view* both use tasteskill's `split-stage`. They
stay apart on the first screen: Lavish's fixed half (right) is a **photograph filling it** — the view from a
balcony — on pale aqua; KA's fixed half (left) is a **flat mint field with one small framed print** standing
in it, the title centred in the white half. Squinting, one is a big picture, the other a coloured field with
a postcard; their archetypes (the view from a room / the camera roll), palettes, faces and section orders
differ. If Shahar finds them too close at the pick, Patio's fallback is the split-stage hero proper: the
print inset on the white ground beside the title, the mint carried as section fields instead.
**A second near-miss, stated:** KA *Stories* and Layday *One room* both put one upright photograph in
the centre of the first screen and change it. Layday holds a **pinned title above** a 2:3 portrait and
changes it **by scroll**, the whole ground changing colour with each picture; KA splits its h1 to **both
margins**, the frame between them is a 3:4 **story** stepped by tap, swipe and a progress bar, with reel
slivers above and below, on a ground that never changes. Different archetype (the way in / the camera roll),
different trigger, different ground behaviour. If they read as one idea at the pick, KA changes (base.md
§5): the fallback is the frame at the left margin with the sentence stacked to its right.
**Colour:** Layday's grounds and fields are yellow plaster; KA keeps no yellow anywhere (its pineapple was
dropped for that reason, §4.2).

**Layday Surf Ahangama** — a visitor sees one dorm, its yellow plaster and a few large-ish prints, the way
in to one room; at KA they see many small sharp photographs of a garden, rooms, a plate and boards, and the
page is about how much of the place there is.
**The Lavish Haven** — a visitor sees one or two composed hotel pictures, a view from a room or a door tag,
in a quiet editorial page; at KA they see many small phone pictures at once, in mint, bed-runner blue or a whole
wall of them, and the page is a stay remembered on a phone, not a hotel's view.

## 6. Where every fact and colour comes from

| in this file | dossier key |
|---|---|
| 450 yd / five-minute walk to Kabalana Beach | `location.distance_to_beach` |
| local family | `business.run_by` |
| staff 9.9 / 9.9; 9.8 (66) | `reviews.booking.categories.Staff`, `reviews.hostelworld.categories.Staff`, `reviews.hostelworld` |
| dengue; "9 days instead of 2" | `reviews.quotes[]` (Mia; Maximilian, truncated) |
| no website, phone pictures only | `existing_site`, `gaps[images]` |
| reel of 28 January 2026 | `assets/index.json` img-013 `source_url` |
| Instagram post links | `assets/index.json` img-014…024 `source_url` |
| six bed and room rows | `room_types[]` |
| check-in 13:00–23:00, check-out by 13:00 | `hours_note` (contradiction recorded) |
| phone, no WhatsApp, no email | `contact.phone`, `contact.whatsapp.gap`, `contact.email.gap` |
| three listings | `booking.engine_url`, `booking.other_engines` |
| Kabalana beach break, The Rock | `location.spot` |
| airport, station | `location.nearby` |
| address | `copy/en.json contact.address` (Google + 80650, Shahar 2026-09-23) |
| photograph sizes | `images[].width/height`, confirmed by opening each file |

Sample boxes (left, top, right, bottom, image px): sky `img-007` 100,10,300,60 · mint chair `img-007`
285,500,320,540 · night sky `img-002` 120,200,250,260 · shower wall `img-005` 250,200,290,320 · papaya
`img-003` 240,584,256,600 · pineapple (dropped) `img-003` 340,370,440,440 · bed runner in shade `img-004` 250,560,290,590 · in sun `img-004` 432,612,446,626 ·
board cyan `img-020` 440,260,520,420.

## 7. Gaps, conflicts and things the material cannot support

- **No `dossier/ka-surf-hostel-and-restaurant-v2/audit.json`** (nor in the original) — the ledger's fork line
  says audit files were copied; for KA none exists. Hard constraint 8's `primary_action`, label,
  `above_fold` and `clicks_to_book` are therefore **derived** here (Hostelworld listing, "Check dates", 2
  taps), not taken from an auditor. The critic has nothing to diff against until station 3b runs.
- **Business-owned video not harvested:** the Instagram reel `DUDRxbRD153` (cover `img-013`). Harvesting it
  with `tools/fetch-video.mjs` is the single change that would let a KA page open on footage; until then,
  the reason no concept opens on video is that the dossier holds none.
- **Copy is stale against the dossier:** `copy/en.json ratings[1]` says Booking.com 9.5 (38); the dossier
  was refreshed on 2026-09-25 to **9.4 (39)**; no `ratings[].capturedAt` in the copy (schema v0.4 requires
  it). The copy's `slug` field still reads `ka-surf-hostel-and-restaurant`. A copy pass (4a–4c), not this
  station.
- Maximilian's "9 days instead of 2" is in the dossier but not in the copy's testimonials; the archetype
  uses it as reasoning only. If Shahar wants it on the page, it goes through the copywriter (it is truncated
  after that sentence; the quote can be used only up to where Booking.com cut it).
- **Schema:** `instagramTiles[]` and `socialLinks[]` exist only in the v0.11 *brand* modules section; all
  three concepts need them for a `beach_lodging` site — confirm they are shared modules. `contact.whatsapp`
  is optional since v0.7 (no longer a gap).
- **custom.md "pick dates, then hand off"** cannot be met honestly: KA sells only through OTA listings and
  the dossier documents no date parameter for any of them (references.md #22). The sheets carry room
  choice + platform + call; a date picker would be a form that posts nowhere.
- **custom.md "lead with full-bleed"** cannot be met: best photograph 576 px. Each concept's first screen is
  KA's own photographs at native size instead (hard constraint 3), and concept 3 makes the whole screen of
  them.
- **Skill conflicts, decided by custom.md and the hard constraints:** tasteskill bans shadows at rest and the
  9–16 px radius and asks for staggered entrances on every heading; custom.md allows soft corners and gentle
  shadows and forbids heading reveals — custom.md wins. Tasteskill's dealt type (Imbue, Big Shoulders, a
  single Switzer) is redrawn by hand to readable text + script (custom.md, calibration). The contact-sheet
  blueprint's caption strips are removed (hard constraint 6). Impeccable's `concept-seed` needs a PRODUCT.md
  this station may not write; its method was followed by hand (§3). Impeccable lists Outfit (round 3's face)
  among the training-data defaults — one more reason it is not reused.

**If we could photograph one thing on location:** the garden from the veranda steps at eight in the morning,
breakfast laid on the long table, cottages behind — wide, at 2400 px or more, plus ten seconds of it on
video. It would give KA the full-bleed first screen every other business in the run already has.
