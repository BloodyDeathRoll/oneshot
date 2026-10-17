# Global Surf Lodge Kabalana, v2: concepts

creative-director 0.4.0 · run `2026-10-globalsurf-03` · slug `global-surf-adventures-v2` · 2026-10-16 · pilot of proposal 003 (scroll set-piece in the unique concept)

Inputs read this session: the full runtime prompt (playbook 0.6.5, run yaml, base.md 0.4.0, references.md calibration, schema, business types, rubric), `agents/designer/references.md` (#1–#29 and the calibration), `agents/designer/custom.md`, `agents/designer/scroll/playbook.md` in full, `agents/designer/gold/` (README + Global Surf notes + the-sign contact sheet), `dossier.json` (business, offers, location, rooms, reviews, videos, images, gaps), `audit.json.recommended`, `copy/en.json` (incl. `mockup_extras`), the run-02 `concepts.md`, notes of the four run-02 mockups and `make-clips.sh`, `docs/bookinglayer.md`, Rosa's live `index.json` and `south-point.json`.

Looked at: all 198 photographs (seven labelled contact sheets of the pictures themselves), the sheets of vid-001…010, full 1 fps sheets of vid-003 and vid-010, an 8 fps sheet of vid-009 0–3.6 s, the end sequences of vid-003 and vid-010, and img-062 / img-026 / img-060 at full size. Shot boundaries were measured with ffmpeg `scdet`; colours were quantised from the pixels (median-cut, 10 colours per image) and every white-on-colour contrast was computed.

**Not available:** the old-site screenshots (`dossier.existing_site.screenshots` → `assets/old-site-*.png`) are in neither asset store (`~/.oneshot/assets/global-surf-adventures-v2/` nor `…/global-surf-adventures/`). "Why it beats the current site" below is argued from `existing_site.notes` and `measurements`, not from the pictures. See Report.

## 0. The bar this round, and what v2 must not repeat

Global Surf already has a gold standard: the three run-02 mockups, `the-sign`, `try-your-week` and `postcard`, plus the `picked` composite. Shahar said of them *"This is how you design a website!"* (`gold/global-surf-notes.md`). Under the gold rule (`gold/README.md`), v2 takes their **method and level** and never their **form**. So v2 uses none of their hero clips (vid-009e, vid-009p, vid-002w, vid-010g, the picked three-scene loop), none of their faces (DM Sans, Caveat, Caveat Brush, Satisfy, Lora, Marck Script, Newsreader, Mansalva, Bricolage Grotesque, Yellowtail, Damion, Dancing Script), none of their palettes (sign coral `#BF5758`/`#D1402A`/`#C8463C`, sign navy `#27293E`, `#EEF2F5`, aqua `#A2E6FB`, teal `#00718F`) and none of their booking presentations (one scrolling page with a sticky summary, full-screen pill step flow, split screen with pinned media, one step per screen).

What stays from Shahar's calibration, in every concept (not repeated per concept):

- **Hero:** the business's own footage, one direction, real speed, 6–20 s, poster first. Only the header sits on it, plus one short title centred horizontally and vertically (40–60 px desktop, 32–40 px phone, never a giant word) and one short button, "Book package now" (`ctas.hero_c1`, Shahar's own example). No rating, no tagline stack, no overlay effect, no title animation. A soft local text-shadow is the only legibility aid.
- **Header:** logo left, four links, transparent over the video, no rule under it. After the hero it becomes a plain white bar with "Book now". On phones a bottom bar appears after the hero: "From $1,466 pp | 7 nights" plus "Book now".
- **Colour:** white page, one light tint, one ink, at most one place colour, and **one booking colour, always carrying white text** at ≥ 4.5:1 (references #6).
- **Type:** two families: a readable text face for everything, booking included, and a script for section titles only. Each pair is new.
- **Surface:** no rules, hairlines, borders or underlines. Actions are buttons. Details are compact, separated by " | ".
- **Sections:** each is its own moment. Slideshows have dots. Rooms are sold with 5–6 photographs each, from the copy's `mockup_extras.rooms[].gallery`. Inclusions are an icon list with no photographs. Every concept has an Instagram section and a real footer with WhatsApp / Call / Email buttons. There are no captions under photographs.
- **Booking inside the site:** level → what's included → room → dates and guests (Saturday check-in, 7/14/21/28 nights, women/men/couples steppers, floating labels) → total → hand-off to `…/en/product/<slug>?start=&end=&female=&male=&couple=` (`docs/bookinglayer.md`). Everything renders from a build-time snapshot. No engine request is made on load; live checks start only after the visitor interacts (playbook §4 booking-engine rule). With JS off it is a GET form. `audit.json.recommended.booking_flow`: 1 tap from the hero to the flow, ≤ 8 taps to the engine. Each concept below states its count.
- **Surf footage illustrates a level. It is never captioned or placed as "our wave".** No surf clip's location is verified (`gaps`).

---

## 1. What this business actually is

An Israeli surf-travel agency that runs exactly one place itself: twelve rooms of low white bungalows on the coast road at Kabalana. Its drone photograph (img-062) shows the lodge squeezed between the beach and the railway line, and at its heart a long blue pool with a coconut palm growing out of the middle of the water (img-026, img-060). It sells **a week, not a night**: three surf levels at one identical engine price, $1,466 per person for 7 nights from a Saturday, with breakfasts, dinners, gear, five 2-hour sessions and five theory lessons (`offers[0..2]`, copy `lessons`). The owner's own description of a day is a rhythm: *"Surf, breakfast, surf again … The evening ends with dinner, together with the other guests"* (copy `about`). Their own film vid-010 is exactly that day, from the boards carried to the beach in the morning to the golden-hour stand-up and the dinner table. The current site shows none of it: it opens on another country's reel or a tractor, prints no price, has an empty Rooms tab, and drops the package when you press Book (`existing_site.notes`).

## 2. What the material can and cannot carry

### Video, the business's own (`dossier.videos[]`, all `business-owned`)

| id | source | shows (verified on the frames) | use in v2 |
|---|---|---|---|
| **vid-010** | 46.1 s, 1920×1080, 25 fps, faint globe badge top-left | a full lodge day: coast drone 0–0.96, surfers from above 0.96–2.76, pool 2.76–5.76, tuk-tuk 5.76–8.28, **boards carried to the beach under a tree 8.28–10.72**, **pop-up practice on soft-tops 10.72–13.56**, **two women walking toward camera with mint soft-tops, morning sun 13.56–15.92**, **group walking into the water 15.92–17.04**, golden-hour session 19.72–35.04, cheering guide 28.16–31.08, dusk drone over the lodge 38.16–40, dinner + title 40–46 | **C1 hero** (four morning shots); Level 1 clip |
| **vid-003** | 49.3 s, 1920×1080, 25 fps, badge top-left | tuk-tuk interior 0–2.48, **tuk-tuk on the coast road with boards on the roof, sun 2.48–5.24**, turquoise bay drone 5.24–7.72, rocks 7.72–10.68, reef surfing 10.68–17.92, guide talk 17.92–19.32, waxing boards 19.32–21.56, woman on a reef wave 21.56–24.88, **turquoise reef from the air 24.88–27.12**, **top-down pool with the palm, swimmers 27.12–29.72**, pool talk, theory, yoga, dusk drone + title 38.4–49.3 | **C2 hero** (three shots); Level 2 clip |
| **vid-009** | 60.0 s, 1920×1080, 25 fps, **no watermark** | title card 0–1.3, whip transition to 1.7, **drone rising over the white roofs until the sea appears 1.75–3.20**, **the lodge in the palms from the air, sunny 3.20–5.28**, pool deck 5.28–8.04 (v1's hero, not reused), tuk-tuk, Buddha, fishing boats, **turquoise reef coast from the air ≈11.40–13.36**, sunny reef surfing, sunset | **C3 hero** (three aerial shots) |
| vid-002 | 39.3 s, 1920×1080, badge | coast drones, lodge roofs from above, pink board in the pool, deep right-hand barrels 8.8–12.5 and 24–29, golden-hour carve, sunset | Level 3 clip (barrels, badge cropped) |
| vid-004 | 47.2 s, 1920×1080 | grey overcast: top-down over the lodge, sign, lounge, rooms, yoga, dinner, night pool | not used: the light is grey |
| vid-001, 006, 007, 008 | | agency reel / Hebrew captions on every frame / text on every frame / a different beach | not used |
| vid-009e, 002e, 003e, hero-c, book-l1…l3 | run-02 edits | | not used as heroes (gold rule); `shows` is null on three of them (Report) |

Three best hero moments, chosen so that no two concepts share a frame:
- **C1:** vid-010 8.28–10.72 → 10.72–12.24 → 13.56–15.92 → 15.92–17.04 (≈ 7.4 s).
- **C2:** vid-003 2.48–5.24 → 24.88–27.12 → 27.12–29.72 (≈ 7.6 s).
- **C3:** vid-009 1.75–3.20 → 3.20–5.28 → ≈11.40–13.36, then vid-010 0.96–2.76 (≈ 7.3 s).

The badge on vid-010, vid-003 and vid-002 is removed with the run-02 recipe's centre crop (`crop=1728:972:192:108`, 0.9× of 1920, never upscaled past 1728 px). Every cut is hard, forward and at real speed. Renditions follow `tools/fetch-video.mjs` (≤ 4 MB desktop, ≤ 2 MB phone, no audio, faststart), made by a committed recipe with a `# media:` header (designer's job).

**Continuous shots are short.** The longest clean single shots are 2–3.8 s, and the long drone of vid-003 (38.4 s+) is dusky and carries a title. That rules out a **scrubbed-film** set-piece (playbook pattern 3 wants a 10 s master). The set-piece below is built from photographs.

### Photographs, the business's own

198 images, all `business-owned`: 95 tagged `lodge`, 77 `unidentified` (mostly surf and coast), 25 `not_lodge` (Indian/Maldives/other camps: img-174…198 and similar, **never used**). 133 non-`not_lodge` images have a long edge ≥ 1920 px; 84 of those are lodge photographs. **Largest usable width: 2000 px** (6000 px originals exist upstream for img-001…034). Nothing needs upscaling for a full-bleed band.

The ten strongest:

| # | asset | px | subject | role in v2 |
|---|---|---|---|---|
| 1 | img-026 | 2000×1123 | drone straight down onto the pool: the palm growing out of the water, swimmers, two soft-tops, a striped daybed deck | C3 set-piece plate 2; C2 feature |
| 2 | img-005 | 2000×1333 | the pool at water level, open lounge and bar behind | C3 set-piece plate 3; C1 feature |
| 3 | img-062 | 2000×1123 | drone straight down: beach, sea wall, coast road, the lodge's white roofs and pool, railway line | C3 set-piece plate 1 |
| 4 | img-060 | 2000×1122 | drone from the garden: the pool's L-shape, beanbag decks, red loungers, palm, board rack | C2 midday |
| 5 | img-016 | 2000×1333 | a guest flipping wet hair out of the pool, spray arc | C2 midday |
| 6 | img-001 | 2000×1333 | a guest on a floating daybed, white bungalow | C1 midday |
| 7 | img-111 | 2000×1333 | surfer on a longboard at sunset | sunset section (all) |
| 8 | img-118 | 2000×1333 | woman carrying a board overhead by the railway, jungle | C1 morning |
| 9 | img-138 | 2000×1200 | surfer in a red rash vest on a turquoise wave, palms | C2 afternoon surf |
| 10 | img-099 | 2000×1333 | surfer deep in a clear turquoise barrel | C3 afternoon surf |

The day, photograph by photograph (all ≥ 1920 unless noted): **morning** img-104 (group walking to the surf), img-114 (theory on the sand), img-118, img-160 (1400 px, not full-bleed); **breakfast** img-011 (mango and pancake bowl), img-021, img-022, img-033 (eggs), img-057, img-058; **midday** img-001, img-005, img-016, img-017, img-026, img-036, img-060, img-075, img-077; **afternoon surf** img-112, img-117, img-133, img-138, img-099; **sunset** img-111, img-140, img-143, img-129 (1938×2000), img-105; **dinner** img-065 (the shared table, from above), img-023 (the toast), img-093 (dusk pool, 1536 px: drawn ≤ 1536 wide only).

Rooms: the passed copy's three galleries (dorm img-063/078/095/042/050/064; twin img-080/084/083/069/079; deluxe double img-081/082/041/043/044/071), 3:2 crops, with portraits img-028/029/045/048 kept out of the 3:2 slideshows.

The lodge's own lettering: the img-072 sign (brand, and v1's whole palette, not reused); img-168 chalk "How does a wave break?"; img-025 "Gone surfing!" and img-086 "Do not disturb" in a classic serif; img-059 "#EATGLOBAL".

### Atmosphere

No `stock/` folder, and none is needed.

### Words (`copy/en.json`, passed 4c)

Everything these concepts need already exists: hero titles `title_c1/c2/c3`, `ctas.*`, `section_titles.*`, level one-liners, inclusions with icon names, room lines/descriptions/details/supplements, booking microcopy, `featureLine` "Footwear is discouraged. Chilling out is inescapable.", `closing`, nine verbatim testimonials, intro / about / offer / getting-here blocks. **No new copy is required.** The about block "Surf, breakfast, surf again" is the archetype's own sentence.

### Numbers

$1,466 pp for 7 nights, identical for Levels 1–3 (engine, 28 Sep 2026). Stays of 7/14/21/28 nights from a Saturday, up to 6 guests. Room supplements: build-time snapshot of 29 Sep 2026 (dorm included, twin +$140 / +$80 pp, deluxe double +$418 pp). Deposit 40 %. Booking.com 8.6/10, 80 reviews, staff 9.5, facilities 9.2, cleanliness 9.2, captured 2026-09-28. Twelve rooms. Kathaluwa West Beach 40 m, Kabalana Beach 350 m, Kathaluwa station 400 m, Koggala Airport 3.9 km. Check-in 14:00–20:00, check-out by 11:00.

### Gaps worth designing around

- **No daily schedule times.** The archetype below follows the day's *light*, never clock times: a "06:30 surf" would be invented.
- No season (pitch point).
- No verified footage or photograph of the lodge's own waves, The Rock or South Point (img-096 is filed as "Kabalana" by filename only).
- The only WhatsApp number is the Israeli HQ mobile.
- Freestylers has no engine dates; its card says "Ask about dates" on WhatsApp.
- No Instagram post was harvested, so the Instagram section shows the lodge's own photographs as tiles linking to `@globalsurf_kabalana`.

---

## 3. The page archetype: **one day at the lodge, first light to dinner**

The home page runs in the order of the owner's own day, *"Surf, breakfast, surf again … the evening ends with dinner, together"*, and its photography follows the light of that day. The first screen is morning (boards carried to the water, a tuk-tuk on the road, or the lodge seen from the air at sunrise brightness). The levels are the morning surf. Breakfast carries what's included. Midday is the pool and the rooms. The afternoon is the waves and the forecast. Sunset is the guests' words. Dinner is the closing.

The device is the **light**, not labels: there are no clock times, no "01/02" numbering and no tracked all-caps eyebrows. A visitor scrolling notices the photographs warming from white morning sun to gold to dusk, and the page still answers level → price → included → trust → action in the audit's order in its second section.

It belongs to this business and to no other: vid-010 is literally this day, the copy already says it, and the photo library covers every hour of it (§2). It replaces v1's "surf-week brochure" archetype.

### 3.1 The day's order (each concept builds it differently)

1. **First light:** hero.
2. **Morning surf:** choose your level. This is the booking section: level clip/photo, name, one-liner, "From $1,466 pp | 7 nights", trust line "8.6 on Booking.com | 80 reviews | 28 Sep 2026", action. Freestylers card with WhatsApp.
3. **Breakfast:** what's included (icon list) beside the breakfast photographs (img-011 and the bowls). Not-included line: airport pickup.
4. **Midday:** the pool and the lodge (amenities as compact " | " lines or icon chips), with `featureLine` on a pool photograph. **C3: the set-piece lives here.**
5. **Siesta:** our rooms, three types, 5–6 photographs each.
6. **Afternoon surf:** the waves: `spot` text + Rosa headline left, Rosa widget right, no line between them.
7. **Sunset:** what guests say: rating line, category line, quotes. Set on golden-hour photography (img-111 / img-140 / img-143).
8. **Dinner:** closing: img-065 or img-023 or img-093 + `closing` + "Book package now" + "WhatsApp us".
9. **Follow the lodge:** Instagram tiles + follow button.
10. **Footer:** light ground, logo, Talk to us (WhatsApp / Call / Email buttons), Getting here (address, the distances, check-in/out, "Open in Maps"), Follow icons, legal row.

### 3.2 Forecast (all three concepts)

**Yes, section 6.** Dossier spot "South point" (owner's words, `location.spot`) maps to Rosa `south-point` "South Point", town Kathaluwa, 5.98044 N 80.33978 E. Checked today against Rosa's live `index.json` and `spots/south-point.json`; it is about 260 m from the lodge's Google pin (5.98105, 80.34206). "The Rock" has no Rosa spot and is not shown. Rosa's nearby `kabalana` spot (5.97747, 80.34842) is **a different break** and is never used as this one. The headline (height now, time, swell, wind) is drawn in the concept's text face. The widget uses its **light** theme, is lazy-loaded with a reserved 420×500 box, and falls back to the plain link "See today's forecast for South Point on Rosa". Credit: "Forecast for South Point by Rosa". The map is a button, not a second embed, so the page has one third-party embed.

---

## 4. Three concepts

### Concept 1 · calm: **"Walk to the water"**

**The idea in one sentence.** A bright, quiet morning page where the guests themselves carry the soft-tops down to the sea, and everything after follows their day at walking pace.

**The one thing.** The mint soft-tops of the beginner sessions (vid-010 13.56–15.92, the pop-up practice and the boards under the tree). They are the only loud thing: the hero, and one more moment at Level 1.

**Structure.**
1. **Hero:** see first screen.
2. **Morning surf (levels):** white. Script title "Choose your level". Three **portrait 3:4 still photographs** in one row (not autoplaying clips, which is what calm means here): Level 1 = vid-010 frame at 14.6 s (soft-tops), Level 2 = img-133 (woman riding a turquoise wave), Level 3 = img-099 (barrel). Under each: name, one-liner, "From $1,466 pp | 7 nights", button "Choose Level n". A small round "Play" button on each still plays that level's clip in place, muted (Level 1 vid-010 19.72–24.16, Level 2 vid-003 21.56–24.88, Level 3 vid-002 8.86–12.50, each 4:5 centre crop). Below the row: the Freestylers card (white on tint, img-001 thumbnail at 3:2, "Ask about dates" WhatsApp button) and the trust line centred. Phone: the row becomes a swipe row with peek and dots (#14).
3. **Breakfast (included):** tint. Two columns: left the 10-line icon list with a three-pill level switch that changes only line 4 (guided vs coached); right a 3:2 dot slideshow of img-011, img-021, img-033, img-057. Airport-pickup line under the list.
4. **Midday:** img-005 full-bleed at 16:9 desktop / 4:5 phone, `featureLine` centred in white over the flat water. Under it, on white: script title "The lodge", the "Twelve rooms, one big family" second paragraph as text, and the amenities as one compact " | " paragraph.
5. **Siesta (rooms):** white. Script title "Our rooms" plus intro. Each room is one full-container (1200 px) 16:9 dot slideshow, and under it a three-column text row: name + `line` | description | details, price note, "Choose this room". Rooms stack vertically with generous space between them; they do not alternate left/right (that was v1).
6. **Afternoon surf (waves):** tint, forecast block (§3.2), plus img-112 as a 21:9 band above it.
7. **Sunset (guests):** img-111 full-bleed 21:9 (4:5 phone) with one quote at a time centred on it in white, a dot slideshow, and the rating line and category line under the band on white.
8. **Dinner (closing):** white, split: img-065 (the shared table from above) at 4:5 left, `closing` in script + sentence right, "Book package now" + "WhatsApp us".
9. **Instagram:** six square tiles in a centred 3×2 grid with 8 px gaps (img-024, img-090, img-055, img-087, img-118, img-016), follow button above.
10. **Footer:** white, four columns, the contact buttons with icons.

**The first screen.** The vid-010 morning edit full-bleed, 100svh, badge cropped, poster = the 14.6 s frame (two women with mint soft-tops in the sun). Header over it. Centred: **"Next set is yours"** (`title_c2`, the owner's own line) in Figtree 600, 52 px desktop / 36 px phone, white. 28 px below it, one button **"Book package now"** → `/book/`. Nothing else.

**Why it beats the current site.** The current lodge page opens on a tractor and an agency reel over a dark bar with a Messenger bubble, at 14.8 MB (`existing_site.measurements`). Here the first thing a visitor sees is guests their own age carrying boards into the sea in morning sun, with one clear button. One scroll down are three levels with a price on each, where the current site has no price anywhere.

**Colour** (quantised from the pixels).
- Ground `#FFFFFF`: the bungalow wall in sun, img-050.
- Tint `#EEF1F4`: the white wall and sky behind the lounge, img-077 (`#E9ECF2`, lifted one step).
- Ink `#021D21`: the pool's shadow under the timber deck, img-001 (17.5:1 on white).
- Place colour (script titles, icons) `#015D7D`: the pool at water level, img-005 (7.3:1 on white, 6.5:1 on the tint).
- Booking `#B02A3E`: the red board in the rack, img-087 (`#872730`, brightened toward its sunlit side). White text **6.47:1**.
- Would look wrong beside sand or cream: the crimson turns brown. Also beside v1's coral, which is why the board's red and not the sign's is used.

**Type.** **Figtree** (400/500/600) for everything people read, booking forms included. It is an open, friendly geometric sans whose round shapes sit with the soft-tops' rounded noses, and it stays legible at 17 px in phone sunlight. **Kalam** 700 for section titles only, 44–64 px: a felt-marker hand like the lodge's own chalk surf-theory board (img-168, img-115). It is clearly handwritten but sturdier and more readable than a brush script. Two families, Latin subset, ≈ 85 KB. Not used by any gold page; not on the default-look list.

**Motion.** The hero video. Level clips play only when "Play" is pressed (one at a time; pressing again pauses). Slideshows slide 0.35 s. Nothing else moves: no parallax, no reveals. Reduced motion / Save-Data: posters only, and the Play buttons are hidden. JS off: stills, all slides stacked in a scrollable row, the GET booking form. No WebGL, no canvas (calm).

**The booking pattern: "the open page".** `/book/` is one calm page in which the four steps are an **accordion**: one step open at a time. A finished step collapses to a single summary line ("Level 2 – Rollers | Change", "Twin room | Change"), and the next one opens. The total sits at the bottom of the page and in the phone bar. The floating-label fields, Saturday chips, nights segmented control and guest steppers come from §0. No media band on the booking page: calm means the page is just the decision, under the same header and footer. Taps: hero → `/book/` (1) → level (2) → room (3) → Saturday (4) → +guest (5) → "Continue booking" (6) ≤ 8. References #1 (in-site panel, hand-off at submit), #2 (keep the first step tiny), #4, #5 (booking script on first interaction), #6, #7.

**Photographs.** As in the structure: img-005 (full-bleed, 2000), img-111 (full-bleed, 2000), img-112 (21:9 band, 2000), img-065 (4:5, 2000), room galleries at ≤ 1200 px displayed, Instagram tiles at 400 px.

**Forecast.** Yes, §3.2, light theme.

**Scroll set-piece.** — (calm never carries one).

**Budget.** First load (phone): HTML+CSS ≈ 45 KB, fonts ≈ 85 KB, poster AVIF ≈ 40 KB, JS ≈ 8 KB → ≈ 0.2 MB. Hero after first paint: m1280 ≤ 2 MB / d1728 ≤ 4 MB. Level clips only on Play. Booking JS ≈ 25 KB on first interaction.

**What would make this concept fail.** If the stills-first levels and the stacked rooms read as timid next to the gold pages, the calm turns into "a template". The level stills and room slideshows must be big (≥ 380 px wide per level on desktop, rooms at full container width).

---

### Concept 2 · interactive: **"The ride"**

**The idea in one sentence.** The page rides along with the guests: tuk-tuk with boards on the roof, reef from the air, into the pool. Each section is something to tap through, like a day you are deciding on.

**The one thing.** The tuk-tuk with surfboards strapped on its roof (vid-003 2.48–5.24; img-037, portrait, for a detail). It is how the package gets you to the surf ("Walk or ride to the surf, depending on the spot", copy `inclusions`). It is loud in the hero and once more as the image behind the booking hand-off.

**Structure.**
1. **Hero:** see first screen.
2. **Morning surf (levels): the level reel.** White. Script title. A horizontal snap row of three large 4:5 clip cards (desktop 3 visible with the centre one larger, phone one with peek; arrows, dots, swipe, arrow keys). Only the **centred** card plays (the same clips as C1), and the others show posters. Each card has the level name, one-liner and price over a soft local shade at its foot, then a button under the card. Freestylers is the fourth card, a still (img-001), with "Ask about dates". The trust line sits under the row.
3. **Breakfast (included): compare.** Tint. One icon list, plus a toggle "Compare levels" that splits it into three narrow columns and highlights the one line that differs (Level 3 "coached"). Beside it, img-011 at 4:5.
4. **Midday: the pool, two ways.** img-026 (drone top-down, the palm in the water) full-bleed at 16:9 (phone 4:5 crop centred on the palm), then a **before/after-style drag divider** that wipes from img-026 to img-060 (same pool from the garden). It is a native `<input type=range>` under the image, keyboard-operable, with the two photographs stacked when JS is off. `featureLine` sits in white on the top-down water. Then "The lodge" amenities as icon chips in three columns.
5. **Siesta (rooms): room mosaics.** White. Three room cards in a row (stacked on phone). Each card is a 2×2 mosaic of four 3:2 crops plus name, line, details, price and "Choose this room". Tapping the mosaic opens a **full-screen gallery** (all 5–6 photos, dots, swipe, Esc, focus trapped and returned) with the room text and button docked under it.
6. **Afternoon surf (waves):** img-138 21:9 band; forecast block, tint.
7. **Sunset (guests):** white. Rating line + categories. Quote cards in a draggable row (3 visible desktop, 1 phone, dots). Behind the row's left edge sits img-140 (sunset spray silhouette) at 4:5 as the one photograph.
8. **Dinner (closing):** img-023 (the toast) full-bleed 21:9, darkened only at its centre for the `closing` line in white, plus two buttons.
9. **Instagram:** a snap-scrolling row of eight square tiles with peek and dots.
10. **Footer:** tint ground, three columns, contact buttons first.

**The first screen.** The vid-003 ride edit: tuk-tuk with boards on the coast road → turquoise reef from the air → top-down pool with the palm. 7.6 s, badge cropped, full-bleed 100svh, poster = the tuk-tuk frame at ≈ 3.6 s. Centred: **"Surf weeks in Sri Lanka"** (`title_c1`) in Plus Jakarta Sans 600, 54 px / 36 px, white; one button **"Book package now"**. Nothing else.

**Why it beats the current site.** The current hero is an agency reel of other countries; here the first seconds are the lodge's own tuk-tuk, reef and pool, under one title and one button, with no chat bubble. And where the current level pages lose the package on "Book", this page lets you flick through the three levels' own footage with the price on each, then step straight into a booking that carries your level to the engine.

**Colour.**
- Ground `#FFFFFF`: sunlit wall, img-050.
- Tint `#EDF1F4`: the pale sky over the pool, img-016 (`#CFD7E0`, lifted).
- Ink `#06200E`: the jungle shade behind the bungalow, img-012 (17.2:1).
- Place colour (script titles, icons, active dots) `#00799E`: the wave face, img-133 (`#0198C9`, darkened to 4.97:1 on white).
- Booking `#BF4A0E`: the golden-hour sky, img-143 (`#F6A76E`), taken down to a clean tangerine. White text **5.0:1**. Its hue (≈ 22°) is yellower than v1's coral (≈ 8°), and it is never set on a warm ground.
- Would look wrong beside olive or khaki, or a dark section; the tangerine needs the white page.

**Type.** **Plus Jakarta Sans** (400/600) for all text, booking included: crisp, slightly condensed apertures that hold up in the dense reel and mosaic labels. **Sacramento** for section titles, ≥ 48 px only: a thin monoline script, the opposite of v1's heavy brushes, as light as the tuk-tuk ride the page is about. It is tested on every title word ("Choose your level", "What's included", "Our rooms", "What guests say", "The waves", "Follow the lodge"). If any capital reads wrong at 48 px, it falls back to 56 px, never to a second script. ≈ 95 KB.

**Motion.** Hero video; the level reel plays only its centred card (IntersectionObserver + snap end); the compare toggle (height 0.3 s); the pool wipe (follows the range input, no autoplay); the room gallery opens with 0.3 s scale 0.97 → 1 + fade (playbook §5.8: never from 0); quote row drags. Reduced motion: posters, instant toggles, gallery without scale. JS off: the reel is a native horizontal scroll of posters with links; both pool photographs stacked; galleries become the 2×2 mosaics plus a link list. No WebGL.

**The booking pattern: "tap, tap, tap".** `/book/` is a real page of **big tile questions, one per screen**, with a "Not sure" tile where it helps (White Desert, references #2): *Which level?* (three level tiles with posters, plus "Not sure — ask us" → WhatsApp prefill), *Which room?* (three room tiles with one photo each and the supplement; "See photos" opens the C2 gallery), *When?* (Saturday chips by month, nights 7/14/21/28 as tiles), *Who?* (women / men / couples steppers). A **ticket** card follows the visitor down the side on desktop (bottom sheet on phone) and fills line by line: level | dates | guests | room | total. The last screen is the ticket full size on img-037 (the tuk-tuk, portrait, cropped 4:5) with "Continue booking" and the hand-off line. Taps: hero (1) → level tile (2) → room tile (3) → Saturday (4) → nights already 7 → +guest (5) → "Continue booking" (6). No step slides sideways (v1 did). Each question cross-fades 0.2 s, and focus moves to its heading. JS off: all four questions stacked as one GET form. References #2, #3, #4, #5, #6, #7, #14.

**Photographs.** img-026 and img-060 (full-bleed, 2000), img-138 and img-023 (21:9, 2000), img-140 (4:5), img-011 (4:5), room galleries ≤ 1200 px displayed, img-037 (booking, 1333 wide portrait, drawn ≤ 600 px).

**Forecast.** Yes, §3.2, light theme, text in Plus Jakarta Sans.

**Scroll set-piece.** — (interactive never carries one).

**Budget.** First load ≈ 0.22 MB (fonts ≈ 95 KB, poster ≈ 45 KB, JS ≈ 15 KB). Hero after paint as C1. Reel: one clip at a time (m720 phone / m1280 desktop). Pool wipe images lazy (2 × ≈ 180 KB WebP at 1600). Booking JS ≈ 30 KB on first interaction.

**What would make this concept fail.** Too many toys: if the reel, wipe, compare toggle, mosaic gallery and ticket each feel like a widget, the day disappears. Every interaction must sit inside a section that is beautiful still, and Sacramento must stay large.

---

### Concept 3 · unique: **"From the air"**

**The idea in one sentence.** The lodge seen the way its own drone sees it: an aerial first screen, then, at midday, one scroll that drops from above the coast road straight into the pool with the palm growing out of it, and lands you at the water's edge.

**The one thing.** The palm that grows out of the middle of the pool (img-026 from straight above; img-060, img-062). No other lodge in the region has it, and from the air it reads in a second. It is the only loud element: the set-piece is built to arrive at it.

**Structure.**
1. **Hero:** see first screen.
2. **Morning surf (levels): asymmetric editorial grid.** White. Script title. Level 1's clip large at 4:5 on the left (7 of 12 columns). Levels 2 and 3 stacked on the right (5 columns, 4:3 each). Each has name, one-liner, price and button beside or under it, and the clip in view plays (one at a time). Freestylers as a wide white card on the tint below; trust line. Phone: three full-width 4:5 blocks.
3. **Breakfast (included):** tint. The icon list in three columns over img-011, placed as a 4:5 photograph overlapping the section's top edge by 80 px (the two-photo overlap of references #10, with one photo). Level 3's coached line marked with the place colour.
4. **Midday: the drop (scroll set-piece, below).** It ends on img-005 at the water's edge with `featureLine`, then "The lodge" amenities in a compact " | " paragraph and img-036 / img-075 / img-077 as a 3:2 dot slideshow.
5. **Siesta (rooms): one room viewer.** White. The three room names as large Literata words in a row (the active one in ink, the others at 55 % ink). Clicking a name swaps the gallery below: 16:10, full container, arrows + dots + swipe. Text block beside it on desktop (name, line, description, details, price, "Choose this room"). Unlike v1's pills, the names *are* the control.
6. **Afternoon surf (waves):** img-099 full-bleed 21:9 (4:5 phone), then the forecast block on tint.
7. **Sunset (guests):** img-129 (tree-pose silhouettes at sunset, 1938×2000, drawn ≤ 1200 px) at 4:5 left; right on white: rating line, categories, one quote at a time in Literata italic 26 px, dots.
8. **Dinner (closing):** img-093 (dusk pool, lights on; 1536 px, drawn ≤ 1536 wide, centred, not full-bleed beyond 1536) with `closing` and the two buttons centred under it on white, not over it.
9. **Instagram:** six tiles edge to edge, follow button above.
10. **Footer:** tint, logo large, contact buttons, address + "Open in Maps", social icons.

**The first screen.** The vid-009 aerial edit: the drone rises over the white roofs until the sea appears → the lodge in its palms from above → the turquoise reef coast → surfers from above (vid-010 0.96–2.76, badge cropped). ≈ 7.3 s, hard cuts, real speed, no watermark on the vid-009 shots. Poster = vid-009 at ≈ 4.2 s (the lodge's white roofs in the palms, sea behind). Centred: **"Your surf week starts here"** (`title_c3`) in Literata 500, 50 px / 36 px, white; one button **"Book package now"**. Nothing else.

**Why it beats the current site.** The current lodge page shows a tractor, then a 360° widget and 14.8 MB of trackers. This one shows the lodge from the air in sun, the sea right behind it, one title, one button. Halfway down, the page physically takes you from the road into the pool, which explains the place (beach, road, twelve roofs, one long pool) better than any paragraph on the current site.

**Colour.**
- Ground `#FFFFFF`: sunlit wall, img-050.
- Tint `#E3F0F4`: the pool's pale water at 10 % on white, img-005 (`#0087A3`).
- Ink `#072B35`: the deep shadow in the pool, img-005 (`#072B35`, 8 % of the frame), 14.9:1 on white, 12.8:1 on the tint. Script titles are ink too.
- Booking `#0B6A8E`: the pool's mid-blue at water level, img-005 (between `#015D7D` and `#0087A3`). White text **6.06:1**. No other colour: the photographs supply the greens and golds.
- **Why blue, not orange, here:** the set-piece lands in this exact water, so the booking button is the colour of the place you have just arrived in. And v1 owns the coral. It never sits on the tint as text; it is always a filled button with white text. WhatsApp keeps its green icon on a white button, so the two never meet.
- Would look wrong beside navy or a second blue; the ink must stay green-black.

**Type.** **Literata** (400/500, italic 400) for all text, the hero title and booking included. It is a screen-drawn text serif in the spirit of the lodge's own serif lettering on the door hanger and the "Do not disturb" sign (img-025, img-086), readable at 18 px. **Parisienne** for section titles only, ≥ 46 px: a connected, upright-leaning script that is elegant without being a wedding hand, tested on every title word. Two families, ≈ 110 KB.

**Motion.** Hero video; the level clip in view plays; the set-piece; the room names swap the gallery with a 0.35 s slide; quote dots. Nothing else: no reveals, no parallax outside the set-piece.

**Scroll set-piece: yes. Pattern 9, image zoom-through, as a three-plate drone descent ("the drop").** Built only from the lodge's own photographs, all ≥ 1920 px:
- **Plate 1: img-062** (2000×1123, drone straight down: beach, sea wall, coast road, the lodge's roofs and pool, railway).
- **Plate 2: img-026** (2000×1123, straight down onto the pool and its palm).
- **Plate 3: img-005** (2000×1333, the pool at water level).

What a visitor sees: the section pins at `top top` for **250 vh**, `scrub: 0.5`, ease `none`. 0–35 %: img-062 fills the viewport and scales 1 → 2.2 toward the pool. 30–40 %: img-026 cross-fades in, positioned and scaled so its pool and palm sit exactly over img-062's (the descent reads as continuous), then settles to scale 1 and holds on the palm. 55–80 %: img-026 scales 1 → 1.8 into the blue water until blue fills the frame. 78–88 %: img-005 cross-fades in at 1.12 and settles to 1. The visitor is now at the water's edge. 88–100 %: `featureLine` appears centred in white on the water (white on `#015D7D` is 7.3:1; measured on the brightest frame per playbook §6.5). The image is hidden at timeline end so nothing slabs over the next section (playbook pattern 9 exit note). Three small dots at the right edge show which plate you are on: the progress indicator a pin over two viewports needs. No caption labels the photographs. Upscaling: every **resting** frame is at or below native pixels. On a 1440 px desktop the deepest mid-motion zoom is ≈ 1.6× native and lasts only while scrolling. On phones the plates are drawn in a 4:5 box (100vw × 125vw), not full height, so a 1123 px-tall source never has to fill an 844 px-tall screen at DPR 1.5.

Stack: GSAP core + ScrollTrigger only (≈ 45 KB gz). **No Lenis**: the page has booking forms and a drawer, and the playbook says not to smooth-scroll forms (§0). Native scroll, so its one-clock rule does not arise. **No three.js, no canvas, no WebGL:** the plates are DOM `<img>`s animated with `transform` and `opacity` only (compositor-only, rule 8). Images: three WebP plates at 1600 w desktop (≈ 200–260 KB each) and 1000 w phone (≈ 90–120 KB each), fetched when the section is 800 px away, never on first load. ScrollTrigger is created after `document.fonts.ready` and the plates' load, then `refresh()`.

Tiers (playbook §6.3):
- **Reduced motion (tier 0):** no pin, no zoom. The section is img-005 at 16:9 with `featureLine` on it, and img-026 and img-062 are shown above it as a two-up of 3:2 stills (no labels).
- **JS off:** the same static composition from HTML/CSS.
- **No WebGL:** irrelevant (none used); the full set-piece runs.
- **Weak phone** (`hardwareConcurrency ≤ 2` or `deviceMemory ≤ 2`, or a failed plate load): the poster tier, i.e. img-005 + `featureLine`, static.
- **Keyboard:** the pin never traps. Tab moves past it, and all text is in the DOM.

**The booking pattern: "the side desk".** "Book package now" (and every "Choose …" button) opens a **drawer from the right** on desktop (60 % width, the page dimmed but visible behind, Tandjung Sari / Kube, references #1 and #5) and a full-screen sheet on phones. It pushes `/book/` to history, so the URL is real, back closes it, and the link can be shared. Inside, the same four steps scroll vertically under Parisienne titles, with the chosen level's clip as a 16:9 band at the top that shrinks to a thumbnail once you scroll. Total and "Continue booking" are docked at the drawer's foot. Esc closes it, focus is trapped and returned. JS off: `/book/` is a full page with the same form. Taps: hero (1) → level card in drawer (2) → room (3) → Saturday (4) → +guest (5) → "Continue booking" (6).

**Photographs.** Set-piece plates img-062 / img-026 / img-005. img-099 full-bleed (2000), img-129 (4:5, ≤ 1200), img-093 (≤ 1536), img-011 (4:5), lodge slideshow img-036/075/077, room galleries ≤ 1200 px displayed.

**Forecast.** Yes, §3.2, light theme, text in Literata.

**Budget.** First load ≈ 0.25 MB (fonts ≈ 110 KB, poster ≈ 45 KB, page JS ≈ 10 KB). After paint: hero video (≤ 2 / ≤ 4 MB), GSAP + ScrollTrigger ≈ 45 KB, loaded when the drop section is 800 px away. Set-piece plates ≈ 0.7 MB desktop / 0.33 MB phone, lazy. Total JS ≈ 85 KB with booking, well inside 300 KB (one library stack, as proposal 003 C requires).

**What would make this concept fail.** If img-062's pool is too small for the hand-off to img-026 to read as one continuous descent, the drop becomes a slideshow with zoom. The designer must align the two pools exactly and look at the mid-scroll frames at 390 and 1440 before anything else.

---

## 5. Divergence table

Run `2026-10-globalsurf-03` has one business. Its three rows are below. Because the gold rule forbids reusing the form of a gold page, the run-02 Global Surf pages are listed under them for reference (another run, the same business).

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern | scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| Global Surf v2 | 1 · calm "Walk to the water" | one day at the lodge, first light to dinner | vid-010 morning edit (boards to the beach, pop-up, soft-tops, into the water), "Next set is yours" in Figtree + crimson "Book package now" | centred container, portrait stills row, full-width stacked room slideshows | `#FFFFFF` + `#EEF1F4` (img-077) | hero only; clips on Play; dot slides | `/book/` accordion page, collapsing step summaries | — |
| Global Surf v2 | 2 · interactive "The ride" | same | vid-003 ride edit (tuk-tuk with boards → reef from the air → pool with palm), "Surf weeks in Sri Lanka" in Plus Jakarta Sans + tangerine button | snap reel of clip cards, wipe image, room mosaics + full-screen galleries | `#FFFFFF` + `#EDF1F4` (img-016) | centred-card playback, range wipe, compare toggle, gallery open | tile questions one per screen with a filling ticket card | — |
| Global Surf v2 | 3 · unique "From the air" | same | vid-009 aerial edit (rise over the roofs to the sea, lodge in palms, reef, surfers from above), "Your surf week starts here" in Literata + pool-blue button | asymmetric 7/5 editorial level grid, names-as-control room viewer | `#FFFFFF` + `#E3F0F4` (img-005) | in-view clips + one pinned zoom-through | right-hand drawer / full-screen sheet with a real `/book/` URL | **image zoom-through (pattern 9), 3 plates img-062 → img-026 → img-005, 250 vh** |
| *Global Surf v1 (run 02, gold)* | postcard | surf-week brochure | vid-009e / vid-009p pool deck, DM Sans → Lora + Marck Script | three level cards, alternating room rows | `#FFFFFF`/`#FCFAF6` + sand | hero, in-view clips | one scrolling page + sticky summary | — |
| *Global Surf v1 (run 02, gold)* | try-your-week | surf-week brochure | vid-002w barrels, Newsreader + Mansalva | stage with pills | `#FFFFFF` + `#E3E4E9` | stage crossfade, sliding steps | full-screen pill step flow | — |
| *Global Surf v1 (run 02, gold)* | the-sign | surf-week brochure | vid-009e pool → reef, Bricolage + Damion | widening level panels, full-bleed galleries | `#FFFFFF` + `#EEF2F5` | panels, split-screen crossfade | split screen, pinned media | — |

No two rows share archetype + first-screen device. The set-piece pattern appears once in the run.

**Against the other businesses in this run:** there are none.

**Against Global Surf v1 (gold), what a visitor would notice:** v2's three heroes are guests walking soft-tops into the sea, a tuk-tuk on the coast road, and the lodge from the air, never the pool deck or the barrels. The page follows the light of one day instead of a brochure's spreads. The faces, the colours (crimson board, golden-hour tangerine, pool blue instead of the sign's coral and navy) and all three booking presentations are new. And one version drops you from the sky into the pool.

---

## 6. For the copywriter

Nothing new is required: every line these concepts use is in the passed `copy/en.json` (`title_c1/c2/c3`, `ctas.hero_c1`, `section_titles.*`, `levels[].one_liner`, `inclusions`, `rooms[]`, `booking.*`, `featureLine`, `closing`, `instagram`). One optional line, only if the designer wants it on C2's "Not sure" tile: "Not sure? Ask us" (an existing CTA family; the existing `ctas.whatsapp` "Questions? Ask us" also fits).

---

## Hand-off checklist

1. Every photograph looked at (198, seven contact sheets). Best usable width **2000 px**. ✔
2. references.md read in full; cited #1, #2, #3, #4, #5, #6, #7, #10, #14 (and playbook patterns 9, §5.8, §6.3, §6.5). ✔
3. Divergence table: the only business in the run, plus the v1 gold rows for the gold rule. ✔
4. First screens: the business's own video, what + where through the title ("Surf weeks in Sri Lanka" carries the place; C1/C3 titles carry it in the header's lodge name). Primary action on screen. **No proof point on the first screen**, by Shahar's calibration ("No rating in the hero"), which overrides playbook §3 item 1. The rating sits in the levels section one scroll down. ✔ with that exception, as in run 02
5. Facts trace to dossier/copy keys: `offers`, `lessons`, `rooms` (mockup_extras), `reviews.booking`, `stayInfo`, `location.spot`, `contact`, `images[].place`; Rosa mapping checked live. ✔
6. Every colour has hex + asset id + what it is; white-on-booking contrasts 6.47 / 5.0 / 6.06. ✔
7. Default-look list: none used. White grounds, no cream; no listed serif/sans; no teal/sage/terracotta accent (C2's place colour `#00799E` is a saturated wave blue used for titles and icons, not the accent); no all-caps labels; no numbering; " | " separators by Shahar's request. ✔
8. Each concept names its one thing (soft-tops; tuk-tuk with boards; the palm in the pool). ✔
9. Every video listed; vid-010, vid-003, vid-009, vid-002 used, none of v1's edits reused as heroes. ✔
10. Each concept says why it beats the current site, argued from `existing_site` notes because the screenshots are missing. ✔ (with that caveat)
