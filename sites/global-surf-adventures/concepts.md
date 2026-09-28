# Global Surf Lodge Kabalana — concepts

Station 4d, **creative-director 0.2.4**, 2026-09-28, run `2026-09-globalsurf-01`, business
`global-surf-adventures`. Written after `agents/designer/references.md` and
`agents/designer/custom.md` were read in full, all 161 photographs in
`dossier/global-surf-adventures/assets/` were opened (contact sheets, then the key ones at full size),
measured with PIL, and every colour below was sampled from those files with PIL (median of a pixel
box, boxes in §6). Inputs: `dossier.json`, `audit.json` `recommended`, `copy/en.json` (passed 4c).

## 1. What this business actually is

It is the one place an Israeli surf-travel agency runs itself: a walled compound of white,
flat-roofed cottages round a pool in Kathaluwa, Kabalana, with the Matara road and then the beach on
one side (Kathaluwa West 40 m, Kabalana Beach 350 m) and the railway on the other
(`business.businessType_note`, `location.distance_to_beach`, `location.getting_there`; the aerial
`img-119` shows sea, road, lodge and rails in one frame). **It sells a week, not a night**: Saturday
to Saturday, 7, 14, 21 or 28 nights, in three levels — and all three cost the same, USD 1,466 per
person for seven nights with a dorm bed, tax included, as the engine showed it on 28 September 2026
(`booking.engine_rules`, `offers[]`). The level is the only real choice; the room is a supplement the
engine adds afterwards. And its own website hides exactly that: no price anywhere, every Book button
drops the chosen level on the engine's front page, the first screen talks about the Maldives, and
the lodge page weighs 20 MB (`existing_site.notes`, `booking.site_links_broken`, `gaps[]`).

So the page this business needs is not a mood; it is a **choice with three answers and one price**,
set so plainly that picking a level *is* booking it.

## 2. What the material can and cannot carry

**Photographs, the business's own: 161** (all `license: business-owned`): 114 from globalsurf.com
(`img-001`–`img-114`) and 47 property uploads from the Booking.com listing (`img-115`–`img-161`,
approved for use 2026-09-19).

- **Largest usable width: 2000 px.** 49 frames are 2000 px wide and 87 are at least 1200 px, most of them from a
  professional 2019 shoot of the lodge (filenames `capt_nir`, `_DSC…gslk`, `@wat3rman_visuals`).
  The best photograph for this page is **`img-108`, 2000 × 1333**: the round road sign — white
  upper half, "GLOBALSURF Lodge", a red-painted lower half, a black plate reading KABALANA — hanging
  over the Matara road with a tuk-tuk going past. Full-bleed is allowed here: this is the first
  business in either run whose own photographs clear the 1200 px floor comfortably.
- **Strong, and the lodge's:** `img-025` pool and room block (2000), `img-097`/`img-028` the pool
  pavilion from above (2000), `img-006`/`img-007` pavilion lounge (2000), `img-026` dorm with gallery
  beds (2000), `img-033`/`img-095` twin rooms (2000), `img-027`/`img-036` guests at the long table
  (2000), `img-031` bowl on dark wood (2000), `img-011` guests on a jungle path (2000), `img-103`
  surf theory on the sand (2000), `img-109` the board rack — blue and red soft-tops under a thatch
  roof with a hand-painted "Rules of surfing" board (1067 × 1600), `img-116` a bathroom with a palm
  trunk growing up through it (1280), `img-138` two guests in the ice bath (900), `img-119` the
  aerial straight down on the compound (1280 × 719).
- **The surf is the weak link.** The harvester flagged 11 frames as not identifiable as the lodge's
  wave: `img-012`, `-013`, `-017`, `-018`, `-019`, `-053`, `-075`, `-102`, `-105`, `-106`, `-111`
  (several filenames say Hikkaduwa). Never used as Kabalana, never as a level's picture. Usable
  surf: `img-002` (lesson group under the green headland, filename `level1kablan`, 2000 × 750),
  `img-015` (filename "kabalana", 2000), `img-054` (filename "level-1 surf lesson", 2000), `img-057`
  (1500), `img-113` (filename "level-2 cover", 1024). None shows a named break, so no photograph is
  ever placed next to a spot name.
- **Rejected on sight, in addition to the harvester's flags** (reported, not edited in the dossier):
  - `img-020`–`img-023` (the ISA course gallery): a beachfront pool with a lawn and a wire fence
    straight onto the sand, green umbrellas, no road. `img-119` shows the lodge's pool inside white
    walls with the Matara road between it and the beach. **Not the lodge; not used.**
  - `img-051` (a hillside temple complex over a river) and `img-052` (a painted Shiva mural): retreat
    pages, plainly not the south coast of Sri Lanka. `img-047`–`img-050` retreat groups, place
    unknown. `img-042`–`img-045` 965 × 543 phone shots, EXIF-rotated. Not used.
  - `img-014` is a 240 px thumbnail. `img-001` and `img-016` are the same frame. `img-058`–`img-092`
    are 600–800 px web crops of 2000 px originals already in the set; the originals are used instead.
- **Atmosphere:** there is no `dossier/global-surf-adventures/stock/` and none is needed — every big
  moment can be the business's own photograph.

**Words** (`copy/en.json`): a short, strong tagline that is exactly the audit's what + where; three
`lessons[]` rows whose `includes` lines are the comparison the visitor needs; the offer block's room
paragraph and the capture-date line; "A day at the camp" (four sentences, the one to set large);
"The lodge"; "Getting here" (40 m, 350 m, two and a half hours from Colombo); one short "Beyond
Kabalana"; the closing line "Pick your level to see the dates still open. Questions first? Ask on
WhatsApp."

**Numbers — this page is mostly numbers:** 1, 2, 3 (the levels, which are the business's own names
for them) · 1,466 USD per person · 7 nights · 7, 14, 21, 28 · Saturday · 5 sessions of 2 hours ·
5 theory lessons · 7 breakfasts · 5 dinners · 2 filmed sessions (Level 2) · 7 days of equipment ·
4.7/5 Google, 198 reviews · 8.6/10 Booking.com, 80 reviews, staff 9.5 · check-in 14:00–20:00, out by
11:00 · 40 m · 350 m · 2.5 hours · captured 28 September 2026.

**Gaps worth designing around, not hiding:**

- **The price does not change with the level.** Every other surf-camp page makes the visitor compare
  three prices. Here the table's price column is one number repeated three times, which tells the
  visitor in half a second that the only decision is "what's my level". The design lets that show.
- **The room is a supplement the site cannot state** (live, date-dependent; the copy leaves it to
  the engine). One line under the table says so; no number is invented.
- **Level photographs.** Nothing proves a photograph shows a given level's lesson; filenames only
  suggest it. No concept pairs a photograph with a level. (Schema gap too, §7.)
- **No team, no names** (`gaps[]` staff). Nobody is introduced; no concept has a people section.
- **No Sri Lankan number on the business's own site**; the copy uses the WhatsApp and phone the site
  publishes (+972). The design keeps them secondary to the engine, as the audit says.

## 3. The page archetype — **the timetable**

A surf week here is a scheduled departure: it leaves every Saturday, runs 7, 14, 21 or 28 nights,
and comes in three classes that cost the same fare. That is a **timetable** — the printed fare table
at a station: rows you run a finger along, figures that line up, a rule under every line, and at the
end of your row the one thing you came for. Every concept is built on **the fare table**: three
ruled rows, one per level, each carrying the level, who it is for, the fare, and its own link
straight to that level's page in the engine. The rest of the page is the timetable's back pages:
what each class includes, the conditions (rooms, check-in), the route (getting here), the season.

Why it belongs to this business and no other in either run: it is the only one that sells a
**product with a fixed schedule and a published price**. KA, Layday and the Lavish Haven sell beds
whose rates live on OTAs and move with the date, which is why they became a garden, a berth and a
courtyard. Here the price *is* known and the choice *is* discrete, so for the first time the page can
be led by type and figures rather than by a picture.

It is also the audit's funnel, drawn: what + where on top, then three rows in the order level →
price → action, then the proof. The table is the booking engine's front door with the level already
chosen — the thing the current site's buttons lose (F1).

**The one shape** (references.md #28): **the disc** of the road sign (`img-108`). Used for the first
screen's device in concept 2 and that concept's closing panel, and nowhere else. Nothing else is
rounded — no pills, no rounded cards, no shadows (custom.md).

Shared by all three concepts, because it is one business:

**Colour — sampled, not chosen.**

| Role | Hex | Sampled from |
|---|---|---|
| ground | `#F4F5FB` | the white sheet on the made double bed, in daylight, `img-004` |
| ink (text, 1 px rules, the drawn lines) | `#252935` | the navy-black lettering "GLOBALSURF" on the road sign, `img-108` (darkest tenth of the lettering) |
| **soft-top red — the one colour carried large** | `#B31D32` | the red soft-top board in the rack, lit lower half, `img-109` |
| **soft-top blue — booking controls and nothing else** | `#1B578B` | the blue soft-top beside it, `img-109` |

The board rack is where every Level 1 week begins ("seven days of unlimited equipment use" is in
every package), and its two boards give the page its two colours: the red carries the levels, the
blue carries the booking. The sign gives the ink and the shape.

Measured contrast (WCAG): ink on ground 13.3:1; red on ground 6.2:1, so the red may be text — the
level numerals are red; blue on ground 6.9:1 and **ground-colour text on blue 6.9:1** (button text is
`#F4F5FB` on blue); red against blue **1.1:1**, so **a booking control never touches a red field** —
there is always ground between them; ink on red 2.2:1, so **no ink text ever sits on red**; text on a
red field is ground-coloured (6.2:1).

Turned down on purpose:
- **The sign's own coral** (`#C75D5E`, `img-108`, below the plate): it is the brand's colour, but in
  the photograph it samples at saturation 0.49 — the dusty side custom.md rules out — and it sits
  within reach of KA's watermelon booking accent `#F05654`. The soft-top red is purer (0.71) and
  darker, and is carried as a field and a figure, where KA's red is a small button.
- **The pool** (`#01708F`, `img-025`): pure, but a teal-blue that is both the default-look petrol and
  the Lavish Haven's whole identity.
- **The pavilion cushions** (`#D96F5C` lit, `#A14A42` in shade, `img-037`, `img-007`): terracotta.
- **The dark wood of the food shots** (`img-030`–`img-032`): earthy.

This palette would look wrong beside cream or sand (the red turns into a flag on parchment), beside
Layday's yellow (red + yellow is a fast-food sign), beside KA's leaf green (a Christmas card), and
beside the engine's own blue Continue button `#2E94DC` (sampled from `assets/engine-level1-2027-02-13-couple.png`, the Bookinglayer summary) — which the visitor sees one tap later;
the soft-top blue is deeper so the hand-off reads as a change of place, not a copy.

**Near-miss, stated:** the soft-top blue is within reach of the Lavish gold page's night blue
`#0B4A94`. The roles differ — Lavish uses night blue as ink and a large night section with a yellow
booking button; here blue appears only as small booking plates, never as a field or as text colour.

**Type — one family in two widths: Barlow Condensed (display) + Barlow (body)** (SIL OFL,
self-hosted, Latin subset; ExtraLight 200 and Light 300 condensed for display at 4–12 rem with tight
tracking; Regular 400 and Medium 500 for body 17–18 px and booking controls; estimated 4 files
≈ 80 KB, measure at 4e). The reason is in the material: the sign's "GLOBALSURF" is a tall, condensed,
flat-sided grotesque, and Barlow is drawn from road-sign and licence-plate lettering — the lodge is
found by a sign on a road, and a timetable is a sign you read standing up. Condensed figures let
"1,466" sit in a narrow column at display size, and a timetable needs figures that line up: use
`font-variant-numeric: tabular-nums` (confirm Barlow's `tnum` at 4e; if absent, set the fare in a
fixed-width box). The sign's brush-script "Lodge" is not echoed (references.md #24).
Checked against hard constraint 15: not a serif, not Inter/Roboto/Arial; not used anywhere else in
either run (KA Outfit, Layday Urbanist, Lavish gold Jost; round-2 faces Instrument Serif, Fraunces,
Bricolage Grotesque, Syne, Inter Tight). The condensed silhouette is the opposite of the three round
geometric faces the Ahangama sites wear.

**House rules held in every concept:** no all-caps labels over headings (the sign's tracked
KABALANA plate is *not* reproduced); no captions under photographs, alt text carries them; no
middle-dot strings; no arrows appended to links. The numerals **1, 2, 3 are allowed** because they
are a real sequence and the business's own names for the levels ("Level 1 needs no surfing
experience…"), not decorative numbering.

**Booking — the same funnel in all three, because the audit fixes it** (`audit.json.recommended`):

- **Primary action: the engine, label "See dates and prices".** Each of the three fare rows is a
  single `<a>` to that level's product page, URL exactly as in `bookingLinks[]` rows 1–3
  (`…/product/level-1-fomies`, `…/level-2-rollers`, `…/level-3-riders`), never `/tests/` or
  `/frontoffice/`, and with **no date or guest parameters added** (references.md #22). The row's
  right end shows the blue plate "See dates and prices"; the whole row is the tap target (≥ 88 px
  tall on a phone). It is a plain link, so it works with JavaScript off (#3).
- **Clicks to book: 1.** Choosing the level *is* the tap that leaves the site and lands on that
  level's dates and prices (the engine asks for guests and a start Saturday — its job). No drawer,
  sheet or modal stands in front of the engine: custom.md's slide-out drawer is honoured by keeping
  the complicated part (rooms, supplements, guest assignment) inside the engine, where it already
  lives, instead of adding a tap that would break the audit's target.
- **Above the fold, in the audit's order**, on a 390 × 844 phone in every concept: what + where
  (`businessName` + `tagline`) → level (the row's numeral and "first-timers and beginners" /
  "intermediate" / "advanced") → price (USD 1,466 per person, 7 nights, and the line "Prices as the
  booking engine showed them on 28 September 2026") → primary action (the row's blue plate) → trust
  (Google 4.7 out of 5, 198 reviews, captured 28 September 2026). Each concept below states its
  pixel budget for that.
- **Persistent on a phone** (#4): once the fare table has scrolled away, a bar at the foot of the
  screen holds **three blue plates, "Level 1", "Level 2", "Level 3"**, each a link to its product
  page — so booking stays one tap from every screen — and a small ink "WhatsApp" link at the end.
  Revealed with CSS scroll-driven animation where supported, otherwise always shown; it never covers
  the fare table itself.
- **Secondary:** "Ask on WhatsApp" (`bookingLinks[]` row 4, prefilled message as the copy has it) and
  `tel:+97299733943`, in ink, beside the table and in the footer. "Stay without a package:
  Booking.com" last, in the footer only. No chat widget, nothing on load (#20).
- **One accent** (#6): the soft-top blue appears on those plates and nowhere else.

**Quotes and ratings:** both ratings with count, source and capture date sit in one ruled line —
Google on the first screen, Booking.com beside it on desktop and directly under the fold on a phone.
The six verbatim testimonials are one ruled list further down (quote, author, platform), never
trimmed; Booking's staff 9.5 is already in the copy.

## 4. Three concepts

### 1 · calm — **"Fare table"**

**The idea:** the page opens on the fare table itself — three red numerals and three ruled rows —
and nothing else; the photographs start one scroll later, at full size.

**The one thing:** the board rack's red and blue soft-tops (`img-109`) — present as the colours of
the numerals and the plates, and on desktop as the one print beside the table. Nothing on the page
is louder than the three red numerals.

**Structure:**
1. **First screen — the fare table** (below).
2. **Full-bleed photograph:** `img-097`, the pool pavilion from above, 16:9, 2000 px source. The
   first picture of the place is the place, whole.
3. **What each level includes** — a real comparison table: three columns (Level 1, 2, 3), one ruled
   row per inclusion from `lessons[].includes` and the offer block ("5 guided 2-hour surf sessions",
   "5 surf theory lessons", "7 breakfasts", "5 dinners", "a cultural or nature excursion", "7 days of
   unlimited equipment use"), a tick in ink where it applies; the two differences stand out by being
   the only irregular cells (Level 2's "2 filmed or photographed sessions"; Level 3's sessions are
   "coached"). Each column foot repeats its blue plate — still one tap.
4. **The rooms** — the offer block's room paragraph set as a column, beside a two-row typeset table
   from `rooms[]` (name, sleeps, bathroom) and the check-in/out line from `stayInfo`. No supplement
   figure.
5. **A day at the camp** — the lead sentence set large in Barlow Condensed 300 across 8 columns, the
   rest of the block in body size under it; beside it, two prints cropped to 3:2: `img-002` (the
   lesson group, cropped from 2000 × 750) and `img-027` (the long table).
6. **The lodge** — its copy block, then a 3:2 grid of six, all cropped to the same ratio (house rule
   2): `img-025`, `img-026`, `img-033`, `img-116`, `img-007`, `img-138`. Three columns on desktop,
   two on a phone.
7. **Amenities** — `amenities[]` as a two-column typeset list, note in the lighter weight.
8. **Guests** — the ratings line, then the six quotes as a ruled list.
9. **The waves and the season** — `spot` and `season` set as two sentences at display size, beside
   `img-015` at 3:2. No forecast in this concept.
10. **Getting here** — its copy block, the address (the Google listing's, as the copy has it),
    `contact.mapUrl` as a plain link, and `img-119` below it at its native 1280 px, never wider.
11. **Beyond Kabalana** — one short paragraph, body size.
12. **Closing** — the closing line, then the fare table again, compact (three rows, no notes), then
    WhatsApp, phone, email, the Booking.com room-only link, and the footer.

**The first screen:** on a 390 × 844 phone, top to bottom: "Global Surf Lodge Kabalana" (Barlow
Condensed 300, 2.4 rem) and the tagline under it (Barlow 400) — ≈ 110 px; a 1 px ink rule and the
table's head line "Every Saturday, 7 nights" left, "per person" right — ≈ 32 px; three rows of
≈ 116 px, each: the red numeral (Barlow Condensed 200, 6.5 rem, tabular) at the left edge; "Level 1"
and "first-timers and beginners" beside it; "USD 1,466" right-aligned; the blue plate "See dates
and prices" under the fare — ≈ 350 px; the capture-date and dorm line — ≈ 44 px; the Google rating
line — ≈ 28 px. **≈ 565 px, inside the ≈ 700 px a phone browser leaves**, with the WhatsApp ink link
in the remainder. On a 1440 desktop: the table spans columns 1–8 with the numerals at 11 rem; columns
10–12 hold `img-109` (the rack) as a single upright print at 2:3, its native 1067 px shown at ≤ 440
CSS px, top-aligned with the table's first rule; Booking.com's rating sits beside Google's.

**Colour:** the shared palette. Red only in the numerals; blue only in the plates.

**Type:** as §3.

**Motion:** none. **Zero bytes of JavaScript.** Hover and focus on a row draw a 2 px ink underline
along the whole row (CSS). Reduced motion, JS off and no WebGL change nothing.

**The booking pattern:** per-row links (references.md #7, "price on the card, each with its own book
action"), plus the three-plate bar (#4). Morgan's Rock's order (#15): what/where → offers with actions
→ what's included → rooms → reviews → getting here → closing action → contact.

**Photographs:** `img-097` full-bleed at 16:9 (srcset to 2000 w, AVIF ≈ 180 KB at 1440 w, lazy — it
is below the fold); everything else 3:2 at ≤ 960 CSS px; `img-109` 2:3 at ≤ 440 CSS px, desktop only
above the fold (≈ 45 KB AVIF). **Phone first load has no image at all**: HTML + CSS ≈ 40 KB, fonts
≈ 80 KB. LCP is the name or the first numeral.

**Forecast:** no.

**What would make this concept fail:** it reads as a price list rather than a place — the first
photograph has to arrive the moment the thumb moves, and it has to be `img-097`, not a room.

### 2 · interactive — **"The sign"**

**The idea:** the road sign hangs beside the fare table and answers the pointer — it swings a little
and its plate reads the level you are on — so the one moment of play sits exactly where the
decision is made.

**The one thing:** the round sign over the Matara road (`img-108`): a white disc, red below, a black
plate, on two chains. It is what the tuk-tuk driver looks for; it is the only round thing on the page.

**Structure:**
1. **First screen — fare table with the sign** (below).
2. **A day at the camp — a pinned horizontal run** (references.md #18): the section pins for about
   two screens on desktop while four photographs travel sideways past the copy block, which stays
   put in a narrow column on the left: `img-002` (the lesson group), `img-031` (the bowl), `img-029`
   (the pool with loungers), `img-027` (the long table) — all 3:2, the copy block unchanged and
   unsplit. On a phone it is not pinned: the copy, then a swipe rail with the next frame peeking
   (#14).
3. **What each level includes** — three tabs, "Level 1", "Level 2", "Level 3" (real `role=tablist`,
   arrow keys), swapping one ruled list; the active tab's blue plate under it. The tabs are
   information, never a gate: the fare table above already links out.
4. **The lodge** — copy, the rooms table, then a real masonry (each photograph keeps its own height,
   house rule 5): landscapes `img-025`, `img-026`, `img-033`, `img-116`, `img-138` and uprights
   `img-109`, `img-024`, `img-133`. Kube's ±4 rem parallax inside overflow-hidden frames, desktop
   only, off at ≤ 767 px (#17).
5. **Guests** — the ratings line, then the six quotes on a swipe rail with the next one peeking.
6. **The waves and the season** — `spot` and `season` at display size, then **the Rosa forecast**:
   left, the headline drawn in Barlow (wave height now, its time, swell period and direction, wind
   speed and class) in ink; right, Rosa's own widget, light theme. The block's lower edge is where
   `img-015` sits at 3:2.
7. **Getting here** — copy, address, map link, `img-119` at native size, check-in/out.
8. **Beyond Kabalana** — one paragraph.
9. **Closing** — the second and last use of the disc: a large disc, white above and red below, the
   closing line set on the white half in ink, the three level plates laid on the ground beneath the
   disc (never on the red), then WhatsApp, phone, email, Booking.com, footer.

**The first screen:** a phone, top to bottom: the name and tagline at the left (≈ 110 px) with the
**sign** at the right, a 112 px disc drawn in SVG on two 1 px ink chains from the top edge — its
upper half a circular crop of `photos[0]` (`img-025`, the pool and the rooms), its lower half flat
soft-top red with a plate on it reading the level in ground-colour Barlow Condensed;
then the table head (≈ 32 px), three rows (≈ 350 px), the capture-date and dorm line (≈ 44 px) and the
Google rating line (≈ 28 px) — **≈ 565 px**, as in concept 1, because the sign shares the header's
height instead of adding to it. On desktop the disc is 360 px, in columns 9–12, hanging from the
top of the viewport beside the table in columns 1–8.

**Colour:** the shared palette. The disc's lower half is the only red field on the first screen; the
plates are on the ground to its left, never touching it (red/blue 1.1:1).

**Type:** as §3; the plate in the disc is Barlow Condensed 500, ground on red (6.2:1).

**Motion** — one orchestrated moment and small answers:
- **The sign swings.** Pointer over or focus on a row: the disc rotates up to 4° on a damped spring
  (≈ 0.6 s to rest) as if a gust caught it, and its plate changes to that row's level ("Level 2").
  Leaving the table lets it settle back to Level 1. On a phone there is no hover: the disc tilts with
  scroll velocity and settles, and the plate stays on "Level 1"; tapping a row goes straight to the
  engine. Hand-written, ≈ 3 KB, `transform` only.
- Rows: a 2 px ink rule draws along the row under the pointer (CSS, 180 ms).
- The pinned day run and the parallax as above; the tabs; the quote rail.
- **Cost:** ≈ 10–12 KB JS in total, loaded after first interaction (#5); the disc's photo is one
  240 px AVIF (≈ 18 KB). Rosa: one lazy JSON request (≈ 90 KB) and the iframe, both only when the
  section nears the viewport.
- **Reduced motion:** the sign does not swing or tilt (the plate still changes); the day section is a
  plain vertical stack; no parallax. **JS off:** the disc shows "Level 1", the day section is a
  horizontally scrollable row, the tabs are three stacked lists, every link works. **No WebGL:**
  none is used.

**The booking pattern:** per-row links + three-plate bar, as §3. The sign is decoration that
answers the decision; it is never a control and never needs a tap.

**Photographs:** `img-025` as the disc (240 px); the day run 3:2 at ≤ 960 CSS px, lazy; masonry
native ratios, lazy; `img-015`, `img-119` as in concept 1. First phone load: ≈ 18 KB of image.

**Forecast:** yes — in the waves-and-season section, never above the offers. Mapping:
the dossier's **"Kabalana main point"** (`location.spot_detail`, owner-written, "less than 500m from
the lodge"; the 2024 site calls the spot beside the lodge "The Rock", `location.spot`) → **Rosa
`kabalana`, "Kabalana"** (Rosa `data/index.json`, spot file generated 2026-09-28, pin 5.97747,
80.34842). Rosa's pin is ≈ 0.8 km from the Google pin (computed from `location.lat_lng`), so **the
block prints no distance**; it says "Forecast for Kabalana by Rosa". "South Beach" / "South point"
has no Rosa spot and is not shown. Theme **light**. Fallback: "See today's forecast for Kabalana on
Rosa". **Second embed:** none; the map stays a plain link.

**What would make this concept fail:** if the swing is noticed before the prices are — the disc must
be small on a phone and the numerals must stay the loudest thing on the screen.

### 3 · unique — **"Across the road"**

**The idea:** the first screen is a cross-section of where the lodge sits — the sea, the road, the
lodge, the railway — drawn in ink lines, with the sea moving; the fare table lives in the lodge's
band, and further down the drawing turns into the aerial photograph it was drawn from.

**The one thing:** the lodge's position — **forty metres and one road from the water**, with the
rails behind it (`img-119`; the copy: "Cross the Matara road and you're on the beach at Kathaluwa
West, 40 metres from the lodge").

**Structure:**
1. **First screen — the cross-section** (below).
2. **What each level includes** — the comparison table of concept 1, ruled, full content width.
3. **Across the road — the orchestrated moment.** A section pinned for one and a half screens: the
   drawn cross-section of the first screen comes back at full width — the sea's moving ink lines,
   the road's dashed centre line, the lodge's white walls as a 1 px outline, the rails — and as the
   visitor scrolls, `img-119` fades up underneath it, aligned so the drawn road lies on the real
   road and the drawn rails on the real railway; the lines then withdraw and the photograph remains
   at its native 1280 px. Beside it, the "Getting here" copy, the address, the map link, check-in/out.
4. **The waves and the season** — `spot` and `season`, then the Rosa forecast: headline in Barlow on
   the left, Rosa's widget (light) on the right.
5. **A day at the camp** — the copy as a narrow column of large type, and beside it a vertical run of
   four uprights centre-cropped to 4:5 (#26): `img-002`, `img-031`, `img-011`, `img-036`.
6. **The lodge** — copy, rooms table, six 4:5 crops in a strict 3-column grid: `img-025`, `img-026`,
   `img-116`, `img-109`, `img-007`, `img-138`.
7. **Guests** — ratings, then the six quotes as a ruled list.
8. **Beyond Kabalana** — one paragraph.
9. **Closing** — the page ends at the rails: a ruled rail line, then the closing line and the
   compact fare table, then the footer with WhatsApp, phone, email, Booking.com. No disc in this
   concept.

**The first screen:** on a phone the cross-section runs **top to bottom**, on desktop **left to
right** (the aerial has no "up"):
- **The sea** — a band 48 px deep across the top of the phone (desktop: the left 14 % of the
  viewport): fine 1 px ink lines of foam, drawn on a `<canvas>`, running in and out on a slow
  (≈ 9 s) cycle, on the ground colour. No blue water, no photograph — the sea is drawn in the same
  ink as the text.
- **The road** — two 1 px ink edges and a dashed centre line, 24 px.
- **The lodge** — the content band: name and tagline (≈ 100 px), the table head (≈ 32 px), the three
  rows (≈ 350 px), capture-date and dorm line (≈ 44 px), Google rating line (≈ 28 px).
- **The rails** — two 1 px ink lines with short ties, 16 px, at the foot of the first screen (above
  the level bar once it appears).
- **Total ≈ 640 px** on a phone, inside the viewport. The order what/where → level → price → action →
  trust is untouched; the bands are 1 px lines round it, not boxes that squeeze it.

**Colour:** the shared palette. The sea, road and rails are **ink on ground only**; red stays in the
numerals; blue in the plates.

**Type:** as §3.

**Motion:**
- **The sea:** a hand-written 2D-canvas line field (no library, ≈ 6 KB): 12–18 foam lines whose
  offsets follow a slow sine with a little noise; it pauses when out of view and when the tab is
  hidden. The canvas is `aria-hidden`; the band has the text alternative "The sea at Kathaluwa
  West".
- **The resolve** (section 3): scroll-scrubbed opacity and a 1 px line-draw on an SVG over the
  photograph; `transform`/`opacity` only.
- Rows answer the pointer with the ink underline, as in concept 1.
- **Cost:** ≈ 12 KB JS total, loaded after first interaction (#5) except the sea's first static frame,
  which is inline SVG in the HTML. No WebGL is required; if the designer wants WebGL for the foam, it
  stays under 15 KB and falls back to the canvas.
- **Reduced motion:** the sea is the static SVG frame; the resolve is a plain crossfade at a fixed
  point, no scrub. **JS off:** the static SVG sea, `img-119` shown plainly with the drawing beside
  it, every link works. **No canvas/WebGL:** the static SVG.

**The booking pattern:** per-row links + the three-plate bar, as §3. The level bar appears once the
lodge band has scrolled away and sits just under where the rails were.

**Photographs:** none on the first screen, on any device. `img-119` at ≤ 1280 CSS px (≈ 150 KB AVIF,
lazy); the 4:5 crops at ≤ 480 CSS px; `img-015` not needed (the waves section carries the forecast
instead). First load ≈ 140 KB with fonts.

**Forecast:** yes — the same mapping and wording as concept 2 (dossier "Kabalana main point" → Rosa
`kabalana`, no distance printed), in section 4, light theme. **Second embed:** none.

**What would make this concept fail:** if the drawn bands read as decoration a visitor has to
decode — they must stay 1 px and quiet, and the words "Cross the Matara road and you're on the beach"
must be on the same screen as the resolve, so the drawing is explained by the business's own
sentence.

## 5. Divergence table

| Business | Variant | Archetype | First-screen device | Grid | Colour ground | Motion idiom | Booking pattern |
|---|---|---|---|---|---|---|---|
| **Global Surf Lodge** | calm · Fare table | the timetable | three red level numerals heading three ruled fare rows; type only, no photograph (desktop: one print of the board rack) | ruled full-width rows; 12-col, table 1–8, print 10–12 | cool white `#F4F5FB` | none, 0 JS | each fare row a direct link to its engine page + three-plate level bar (1 tap) |
| **Global Surf Lodge** | interactive · The sign | the timetable | the ruled fare rows with the round road sign hanging beside them, swinging and relabelling to the row under the pointer | ruled rows + one pinned horizontal run | cool white `#F4F5FB` | sign swinging on a spring; pinned day run; ±4 rem parallax | per-row link + level bar (1 tap) |
| **Global Surf Lodge** | unique · Across the road | the timetable | the screen as a cross-section — drawn moving sea, road, lodge band holding the fare rows, rails | cross-section bands, then ruled rows | cool white `#F4F5FB` | ink-line sea on canvas; drawing resolving into the aerial photograph | per-row link + level bar (1 tap) |
| KA Surf Hostel | calm · Field | the garden | full-width light headline; three upright prints standing half-deep in one flat green field | open field, staggered free-standing objects | cool white `#F0F1F2` | none, 0 JS | `<details>` slide-down sheet, 3 tiles + tel |
| KA Surf Hostel | interactive · Planks | the garden | a band of upright green slats that turn under the pointer, five prints behind them | open field | cool white | slats turning to the pointer, then a draggable rail | in-page overlay sheet |
| KA Surf Hostel | unique · Canopy (picked 2026-09-22) | the garden | a cut-paper leaf canopy filling the screen, with a white clearing that holds the headline | open field with one green spine that changes column | cool white | leaves parted by the pointer, closing into a spine on scroll | right-edge slide-out |
| Layday Surf | calm · Berth | the berth | one flat yellow berth with the headline lying in it, ladder on its edge, drawer beneath | 12-col, left-weighted | cool white `#E8E9F0` | none, 0 JS | `<details>` drawer under the berth |
| Layday Surf | interactive · Curtain | the berth | the berth with an ink-line curtain across a print of a real berth, parted by the pointer | 12-col; one pinned photo frame | cool white `#E8E9F0` | curtain drawn on scroll + microinteractions | drawer sliding out of the berth's foot |
| Layday Surf | unique · Inside | the berth | inside the berth: a flat-plane yellow box in perspective filling the screen | full-viewport box, then 12-col | cool white `#E8E9F0` | camera climbs out of the box | docked corner berth → right slide-out |
| Lavish Haven | calm | the courtyard | full-bleed night pool | 12-col editorial | cream | CSS fixed bands | docked strip |
| Lavish Haven | interactive | the courtyard | pinned water canvas | 12-col editorial | cream | water | slide-down drawer |
| Lavish Haven | unique | the courtyard | type on plaster over a fixed waterline | 12-col editorial | plaster | water + projected type | right slide-out |
| Lavish Haven | gold page (approved 2026-09-21, outside 4d) | the courtyard | a pool-shaped window of live water on a white page, opening to full screen | wrapped single column + photo strip | cool white `#F5F8FA` | water, noon to night | right drawer |

Rows for KA and Layday are their round-3 files; Lavish's are from its own `concepts.md` plus the
gold page as recorded in KA's and Layday's tables. **No archetype + first-screen combination
repeats:** "the timetable" appears only in Global Surf's rows, and its three first-screen devices
differ from one another.

Near-misses, stated rather than hidden:

- **A cool white ground on every site in both runs** (custom.md asks it of all). Global Surf is held
  apart by what sits on it: figures and ruled rows instead of a field, a green canopy, a yellow box
  or a pool.
- **Red.** KA's booking accent is watermelon `#F05654`; Global Surf carries soft-top red `#B31D32` —
  darker, bluer, and as numerals and one disc, never as a button. Its booking colour is blue.
- **Blue.** Global Surf's booking blue `#1B578B` is near the Lavish gold page's night blue; there it
  is a large field and ink, here only small plates.
- **A drawn first screen in three unique concepts** (KA Canopy, Layday Inside, Global Surf Across the
  road), all descended from references.md #27. KA's is an organic canopy the visitor pushes aside;
  Layday's a one-colour box the visitor climbs out of; Global Surf's is a 1 px ink line drawing of
  real geography with type standing in it, and the only one that resolves into a photograph.
- **Pinned sections** in Lavish (pool, 3 screens), Layday Curtain (a photo frame) and Global Surf The
  sign (a sideways run of four photographs, #18) — Global Surf's is the only horizontal one.
- **Ruled frames** were Layday's retired round-2 idiom (cells round a card on ochre). Global Surf's
  rules are table rules — horizontal lines under rows of figures — with no card, frame or cell
  boxes.

**What a visitor would notice is different:**

- **KA Surf Hostel** — KA opens on green and small upright photographs standing apart; Global Surf
  opens on three big red numbers and a price, with no green and, on a phone, no photograph at all.
- **Layday Surf** — Layday is one yellow box you read like an object; Global Surf is a table you run
  your finger down, and the first thing you can do is book a specific level in one tap.
- **The Lavish Haven** — Lavish is built round water you look at; Global Surf shows its pool only
  after the prices, and draws its sea as a few ink lines across the road.

## 6. Where every fact and colour comes from

| In this file | Dossier key |
|---|---|
| agency's one self-run place; the lodge is the site | `business.businessType_note`, `business.name` |
| Kathaluwa / Kabalana; 40 m, 350 m; railway (station 400 m) | `location.area_name`, `location.distance_to_beach.others[0]`, `location.getting_there.note` |
| Saturday start; 7/14/21/28 nights; 18+; USD; incl. tax | `booking.engine_rules` |
| USD 1,466 per person, 7 nights, dorm = base, twin extra; 28 Sep 2026 | `offers[0–2]` (`price`, `note`, `samples`) |
| levels (first_time + beginner, intermediate, advanced) | `levels[]`, `offers[].level` |
| inclusions, per level | `offers[].includes_engine`, `copy/en.json` `lessons[].includes` |
| engine product URLs; `/tests/` links lose the level | `booking.engine_products`, `booking.site_links_broken` |
| WhatsApp +972523593240; phone +97299733943; lodge +94770776747 not on the site | `contact.whatsapp`, `contact.phone`, `contact.phone_lodge` |
| 4.7/5 Google (198), 8.6/10 Booking (80), staff 9.5; 28 Sep 2026 | `reviews.google`, `reviews.booking` |
| check-in 14:00–20:00, out by 11:00 | `stayInfo` |
| rooms (dorm 4 beds, twin 2) | `room_types.engine` |
| no price, level lost, Maldives first screen, 13–20 MB | `existing_site.notes`, `existing_site.measurements`, `gaps[]` |
| no team names | `gaps[]` (`staff`) |
| Kabalana main point; The Rock; South Beach / South point | `location.spot_detail`, `location.spot`, `contradictions[4]` |
| lodge pin 5.9810484, 80.3420635 | `location.lat_lng` |
| Rosa `kabalana` (5.97747, 80.34842), generated 2026-09-28 | Rosa `data/index.json` and `data/spots/kabalana.json`, fetched 2026-09-28 — not a dossier fact; the mapping is from `location.spot_detail` |
| 11 frames not the lodge's wave | `images[].location_note` |
| photograph sizes | `images[].width/height`, confirmed with PIL on each file |
| sign, rack, bathroom palm, ice bath, pool, aerial | the images themselves, looked at |

Colour sample boxes (left, top, right, bottom in image pixels; median per channel unless noted):
ground `img-004` 800,920,880,1000 (the sheet) · ink `img-108` 980,330,1620,520, darkest tenth of
pixels (the lettering) · soft-top red `img-109` 340,1200,460,1400 · soft-top blue `img-109`
100,1000,200,1200 · (refused) sign coral `img-108` 1200,960,1450,1040 · pool `img-025` 200,1100,1800,1300
(blue-dominant pixels) · cushions `img-037` 1100,550,1500,700 and `img-007` 300,480,1300,700
(red-dominant pixels).

## 7. Schema gaps and what the material cannot support

- **`lessons[]` has no booking link.** The fare rows need each level paired with its engine URL; today
  that pairing is by position (`lessons[i]` ↔ `bookingLinks[i]`), which breaks the moment the owner
  reorders either list. Proposed: `lessons[].bookingUrl` (https, optional). Until then the template
  pairs by position and the deployer seeds both lists in the same order.
- **`lessons[]` has no photo.** No concept pairs a photograph with a level, partly because nothing
  proves which lesson a photograph shows and partly because there is no field. Concept 2's sign
  therefore shows `photos[0]`, not a per-level picture.
- **`season` is text.** A month strip (Oct–Apr / May–Sep) would be the natural timetable device, but
  it needs structured months; no concept uses one.
- **The start day and durations** live in `stayInfo.note` as prose; the table head "Every Saturday,
  7 nights" is interface wording built from the `lessons[].label` "7 nights" and that note. A
  structured `stayInfo.startDay` would let the template print it without hard-coding "Saturday".
- **Cannot support:** a photograph of the lodge's own wave identified as such; any photograph of a
  named break; a per-level picture; a face and a name for any instructor; the room supplement as a
  number; any pool shot from `img-020`–`img-023` (not this pool).

**If we could photograph one thing on location:** from inside the lodge gate, looking across the
Matara road to the water at Kathaluwa West, with the round sign in the frame — one wide photograph at
2400 px or more. It proves "40 metres" in a single picture, it is the frame concept 3's drawing wants
to resolve into, and it would replace the Maldives on the first screen of the pitch.
