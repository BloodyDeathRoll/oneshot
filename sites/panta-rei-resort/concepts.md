# Panta Rei Resort, Kabalana: concepts

Station 4d · creative-director 0.6.1 · run `2026-11-lk-surf-01` (mode `test`, operator alon) · 2026-11-06.

Inputs read this run: `dossier/panta-rei-resort/dossier.json` (+ `sources.md`), `audit.json` + `audit.md` and the walk screenshots in `funnel/walk/`, `sites/panta-rei-resort/copy/en.json` (passed 4c in round 2, `copy/review.md`), all 47 images on four contact sheets plus full views of img-001, 010, 012, 030, 036, 046, and the four videos' contact sheets and posters. Also: `agents/designer/references.md` in full, `agents/designer/custom.md`, `agents/designer/scroll/playbook.md` §2.3 and §4, the gold README and `global-surf-notes.md`. The Global Surf gold pages were rendered at 1440 px (`sites/global-surf-adventures/mockups/{the-sign,try-your-week,postcard}/dist/`); their photographs are not on this machine, so only their structure, type and section rhythm were seen, not their imagery. No other business is concepted in this run.

Colours were sampled with `ffmpeg` area-averaged crops of the original files (`crop=w:h:x:y,scale=1:1:flags=area`); every crop was looked at before its hex was kept (crops that landed on shadow or foliage were thrown away). Contrast is WCAG.

---

## 1. What this business actually is

Sixteen white bungalows with red tile roofs stand in a ring around one long turquoise pool, in a clearing cut out of jungle 600 m back from Kabalana Beach (`room_count`, `images[img-001]`, `videos[vid-001]`, `location.distance_to_beach`). From the air it reads like a small village with a swimming pool for a square. The one two-storey building, white with a coral roof, holds an open-air lounge under hanging rattan lamps, the restaurant, and upstairs the bar and an open fitness floor (`img-030`, `vid-003`, `facilities[1–2]`).

It is run like a small, sociable hotel: daily Vinyasa yoga at 8:30 except Friday, a menu that goes from smoothie bowls and egg hoppers to a whole grilled fish, a "Surf Therapy Massage — full recovery after active surfing", and a guest booklet in pastel blocks that recommends cafés and bars "(obviously LOL)" (`offers`, `menu`, `local_guide`). The rooms are new, white and rattan, from a 22 m² double with a balcony over the pool to a 40 m² suite with its own plunge pool (`room_types`).

What it does not have is a page that says any of this. Its own film and photographs are professional (a 70 s and a 130 s film, 25 originals up to 7000 px), and the site shows them as tiles with one word each (audit F2, F4).

## 2. What the material can and cannot carry

### Video, the business's own (`dossier.videos[]`)

| id | what | length · size | best moments | use |
|---|---|---|---|---|
| vid-001 | resort film (home page): lounge, pool, swimmer, top-down drone, rooms, yoga shala, drone rising from the ring of roofs to the coast | 70.7 s · 1920×1080 | 55–70 s (ring → sea, cut made, poster at 57 s), 14–24 s (pool, swimmer, top-down), 44–50 s (yoga shala) | **hero, rank 1** |
| vid-004 | the full 129 s film on its YouTube channel; opens on drone along a palm beach with surf breaking | 129 s · 1920×1080 | 0.5–14.5 s (surf beach, cut made, poster 6 s), 34–40 s (top-down pool), 110–118 s (aerial bungalows) | **hero, rank 2** — the only surf footage. The beach is not named on screen: it is never captioned with a place |
| vid-002 | About-page clip: restaurant building, top-down pool, rise to sea at dusk | 17.1 s · 1920×1080 | 3–17 s (cut made, poster 5 s) | hero rank 3 / closing film |
| vid-003 | vertical clip of a mat class on the upper floor | 25.4 s · 1080×1920 | 4–12 s | small loop in the fitness section (interactive only) |

Usable video exists, so concepts 1 and 3 open on it and concept 2 opens on the second cut; all three open on video.

### Photographs, the business's own

42 unique business-owned images. The ten strongest, with widths as stored (originals in brackets):

| asset | what | width |
|---|---|---|
| img-001 | aerial: pool, bungalows, main building, jungle | 2000 (2048) |
| img-006 | guest wading into the long pool, red roofs and palms beyond | 1844 |
| img-030 | open-air lounge under rattan lamps, orange rattan chairs | 1350 |
| img-012 | room, sliding doors open to the lawn and pool, surfboard outside | 2000 |
| img-046 | the suite's private plunge pool and lounge chairs in the jungle | 1350 |
| img-043 | suite bed facing the plunge pool | 1350 |
| img-002 | palm-fan headboard, rattan pendant, potted palm | 2000 (6427) |
| img-035 | lawn by the pool: two guests with surfboards, a woman and a dog | 1350 |
| img-003 | breakfast served at a teak table | 2000 |
| img-004 | yoga class, triangle pose, in the shala (portrait) | 1334 (3850) |

**Largest usable width of the best photograph: 2000 px (img-001, img-012, img-002, img-003).** Nothing needs to be upscaled; every full-bleed still is ≥ 1350 px and the hero is video anyway. Engine room photos are 1350 px wide: fine for room galleries at ≤ 1350 CSS px, never full-bleed on desktop.

Not usable as the business: img-026 (stock Buddha on a headland), img-027 (stock string lights), img-022 (tinted mist, place unknown). img-023 is the logo (white on transparent). img-024/025 are portrait menu covers.

### Atmosphere

None needed. No `stock/` folder. The business's own footage shows its setting from the air.

### Words (`copy/en.json`)

The owner's welcome (block [0]) is the one long paragraph worth setting large. The pool [1], fitness [3], massage [4] and getting-here [7] blocks are short and factual. The restaurant block [2] is the longest and carries the dishes. `featureLine` "No paradise like home." is the owner's own headline. The tagline is a what/where line.

### Numbers

Booking.com 9.2/10 from 468 · Google 4.7/5 from 213 (captured 2026-11-06) · 16 bungalows · 22 / 30 / 50 / 40 m² · check-in 14:00, out 11:00 · yoga 8:30, Friday off · classes 2,500 / 3,000 / 3,500 LKR · massages 20,000 / 17,000 LKR · day pass 3,500 LKR · restaurant 8:30–12:00 / 13:00–17:00 / 18:00–21:30.

### Gaps worth designing around

- **No room prices** (engine needs dates): the booking drawer's job is to get dates fast and land on the right room page. Never a "from" price.
- **No beach distance we can print**: "a short walk" in copy; the aerial pull-out to the coast shows it instead.
- **No break named**, so **no Rosa forecast** in any concept (the rule needs a named break).
- **No people named**: guests' words carry the warmth.

## 3. The page archetype: **the guest booklet**

Panta Rei already has a voice on paper: the welcome booklet it leaves in every room, in pastel blocks, with a hand-drawn sprig on the cover and a list of cafés "(obviously LOL)" (`local_guide`, guest guide PDF). The site becomes the booklet you would want to read **before** you arrive: Welcome → your room → the pool → breakfast and the restaurant → the fitness club → after the surf → getting around → groups. Each section is one page of that booklet, designed as its own moment, and the film and photographs carry each page. It belongs to this business because it is literally this business's format, written in its owner's register; no other business has handed us its own booklet.

The archetype governs order, voice and section rhythm. It is never a reason to make the page look like paper: grounds are light and clean, and media leads.

**The one thing:** the **ring of red roofs around the long pool**, seen from above (img-001, vid-001 at 55–60 s). Every concept is built on it, and it is the only loud element on its page.

**Booking (all three):** primary action = **engine** (`audit.recommended.primary_action`), label "Check dates" in the hero and "Check dates and book direct" in the booking section; WhatsApp and phone secondary. A drawer (references #1, Tandjung Sari / Kube model): choose the room (four chips with photo) → arrival / departure / guests (floating labels) → "See prices on our booking page", a plain link to that room's engine page (`bookingLinks[1–4]`), so it works with JS off. The bar order inside the drawer and the persistent mobile bar follows `audit.recommended.above_fold`: what/where (room name, size) → price ("prices with your dates") → included (breakfast, A/C) → trust (9.2 · 468 on Booking.com) → action. **Clicks:** hero CTA opens the drawer (1) → room link (2) = within `clicks_to_book` 2; the persistent "Check dates" bar and per-room "Book this room" links reach the engine in 1. The designer verifies whether the engine accepts dates in the URL before passing them (not verified at 3b); if it does not, the drawer hands off to the room page and says "pick your dates there".

### Forecast: **no**, in all three

The dossier names no break (`location.spot.gap`). The page says "the waves of Kabalana, a short walk away" and nothing more.

### Scroll set-piece

Concept 3 only: **scroll-scrubbed video with captions** (scroll playbook §2.3 pattern 3), from vid-001 49–70 s (the drone over the ring rising to the sea). Business-owned video, so allowed.

### Embeds

None on load. A Google Maps link (not an embed) in "Getting here". Zero third-party requests in all three.

## 4. Three concepts

### Concept 1 · calm: **"Welcome to Panta Rei"**

**The idea:** the booklet read straight through, quietly, with the film on its cover and every section given room to breathe.

**First screen:** vid-001 cut 55–70 s (ring of roofs → coast) full-bleed, poster = 57 s frame (top-down ring, pool centre). Header: logo (img-023, white) left, "Rooms · Restaurant · Fitness · Getting here" right (desktop), menu button on phone. One short title, centred: **"Panta Rei, Kabalana"**, and under it one coral button **"Check dates"**. No rating here: the rating belongs beside the guests' words, where it is read as proof rather than slogan (playbook §3 item 1). On a phone the same, title at ~32 px, button full-width at the bottom of the hero (references #4).

**Structure:**
1. Hero (above).
2. **Welcome** — the owner's welcome [0] set large in the text face across 8 of 12 columns, `featureLine` "No paradise like home." in the script beside it; img-030 (lounge) full-bleed below, 16:9 crop.
3. **Your room** — four rooms, each a 60/40 split: a slideshow (dot navigation, 4–6 photos: Double img-028/031/029/007/013, Triple img-034/036/037/010/011, Family img-038/040/012/014/015, Suite img-043/046/047/044/002/016), and beside it label, size, beds, sleeps, note, and a coral "Book this room" button to its engine page. Offer block [5] opens the section. Compact details joined by " | ".
4. **The pool** — img-006 full-bleed (guest in the pool), block [1] in a narrow column over a white panel beside it on desktop, below on phone.
5. **Breakfast and the restaurant** — block [2] and `hoursNote`; real masonry of img-003, img-005, img-018, img-019 (each keeps its own height; no padded boxes).
6. **Panta Fitness Club** — block [3]; a week strip Mon–Sun as seven chips, Friday shown "day off"; price rows (2,500 / 3,000 / 3,500 LKR) compact; img-004 portrait beside.
7. **After the surf** — block [4] with the four massage rows; img-035 (guests with boards on the lawn) as the section's picture.
8. **Guests** — Booking.com 9.2 · 468 and Google 4.7 · 213 with capture date, then a slideshow of the six quotes (dots).
9. **Getting here** — block [7], address, "Open in Google Maps" button, check-in 14:00 / out 11:00, stayInfo note.
10. **Groups and retreats** — block [6] with a WhatsApp button "Ask about a group".
11. **Closing** — vid-002 poster full-bleed (still, no video), `closing` line centred, coral "Check dates" button, WhatsApp button.
12. Footer: logo, address, phone and WhatsApp as buttons, email, Instagram / Facebook / YouTube icons, "Book direct" button.

**Why it beats what they have** (compared with `assets/old-site-mobile.png` and `funnel/walk/01-home-fold.png`): the old first screen is a logo and a salmon button over a sunlit veranda, and the home page below it is four tiles with one word each; here the first screen is their own aerial film and says where they are, and one scroll down there are four rooms, each with its own photographs and size, which today only the engine shows.

**Colour** (sampled):
- ground `#F7F9FB` — the white bed linen, img-047 (sampled `#CED5E3` in shade, lifted to paper white keeping its cool cast); a cool white, not cream.
- ink `#2E3424` — the jungle canopy, img-001 (`#393F2C`, darkened 20 % for body text: 12.9:1 on the ground).
- pool `#2FBCB8` — the pool water at noon, img-001; used only as a 10 % tint panel (`#E6F6F5`) behind the Welcome and Guests sections, never for text.
- roof `#B56440` — the bungalow tiles, img-001; small details only (week-strip "today" dot, slideshow dots).
- **booking accent `#C4503F`** — the main building's coral roof, img-001 (`#DA6657`, deepened so white text reads at 4.6:1). Only on booking actions.
- Would look wrong beside: anything muddy, beige or sand; a navy or petrol accent (the place has no blue but its water).

**Type:** **Figtree** for everything people read (round, open counters like the booklet's lettering; works at 15–17 px on phones) + **Gochi Hand** for section titles only (an informal hand like the booklet's "obviously LOL", never for body or buttons). Not on the default-look list.

**Motion:** micro only. Buttons lift 2 px and darken on press (150 ms); slideshow slides 400 ms ease-out with dot fill; drawer slides up 300 ms. Kube's ±4 rem image parallax on the full-bleed photos (references #17), off at ≤ 767 px. No heading reveals, no canvas. Reduced motion: poster only, no parallax, drawer appears without sliding. JS off: poster, all text, every booking link works.

**Photographs:** see Structure. All engine photos at ≤ 1350 CSS px; img-006 and img-030 full-bleed at 1844 / 1350 px only up to their native width with `object-fit: cover`.

**What would make it fail:** it is the quietest of the three and could read as a good template; the Welcome section's large owner text has to be set beautifully or the page has no voice.

### Concept 2 · interactive: **"Morning swim"**

**The idea:** the booklet as a set of light, colour-blocked pages you move through by touch, opening on the only surf in their footage and selling the rooms through an interactive room chooser.

**The one thing:** the ring of roofs, as the opening image of "Your room" (img-001 full-bleed), followed by the **room chooser**: four large photo cards, one per room type, each opening a drawer with its gallery, size, beds, note and "Book this room". (Marking room types on the aerial would need a fact the dossier does not hold: which building is which room. So the aerial is a picture, not a map.)

**First screen:** vid-004 cut 0.5–14.5 s (drone along a palm beach with surf breaking), full-bleed, poster 6 s; no place caption on it. Title centred: **"A short walk from the waves"** (rests on `spot`; check with the copyeditor that it adds no fact), coral "Check dates". Rating: no, with the guests.

**Structure:**
1. Hero (above).
2. **Welcome** — block [0] on a pale lilac page panel (`#F3EEF5`, from the booklet's lilac, see Colour), the owner's line in the script; vid-002 cut plays muted in a rounded 4:5 frame beside it (poster first).
3. **Your room** — the ring full-bleed (img-001), then four photo cards in a horizontal row with next-card peek on phone (references #14); tap = room drawer (gallery slideshow with dots, details, "Book this room"). Offer block [5] above the row.
4. **The pool** — img-006 and img-046 (the suite's plunge pool) as two overlapping prints (references #10, two-photo overlap), block [1].
5. **Breakfast and the restaurant** — on a pale peach page (`#FCF1E8`); the menu as chips you tap (Breakfast / Lunch & dinner / Sweets) that swap a short list of dish names (no prices: the menu prices are not in the copy) and a photo (img-003 / img-005 / img-024); `hoursNote` beside.
6. **Panta Fitness Club** — vid-003 (vertical mat class) in a phone-shaped rounded frame, the week strip as tappable days (tap Friday: "day off"), the three class prices as chips.
7. **After the surf** — block [4] with img-035; massage prices as compact rows.
8. **Guests** — ratings, then a draggable card stack of the six quotes (dots).
9. **Getting around** — on a pale sage page (`#EEF4EC`); block [7] as a short vertical journey: Koggala Airport 5 km → Kathaluwa station 1.9 km → Ahangama station 2.1 km → the door (tuk tuks wait here); Maps button.
10. **Groups** — block [6], WhatsApp button.
11. **Closing** — vid-001 poster still, `closing`, "Check dates" + WhatsApp.
12. Footer as in 1, own layout (three columns, socials as round icon buttons).

**Main item:** the hero cut of vid-004 (the surf beach), the only footage in the dossier that sells "surfing the waves of Kabalana" without naming a wave. **Micro-animations:** room cards tilt 2° toward the pointer on desktop and lift on tap; drawer springs up (spring, 350 ms, no overshoot); menu chips slide their underline-free highlight between chips; week-day chips flip to show the class; quote cards drag with momentum and snap.

**Why it beats what they have:** today the rooms are four identical paragraphs and a "BOOK NOW" each; here a visitor flicks through four rooms with their own galleries and sizes in one row, and the hero is the sea rather than a ceiling.

**Colour:** ground `#FAFBF8` (img-046 lit wall, sampled `#ADAF95` in shade, lifted); ink `#2E3424` (img-001 canopy, as concept 1); page panels lilac `#F3EEF5`, peach `#FCF1E8`, sage `#EEF4EC` — these three come from the business's own guest booklet (the PDF's lilac, peach and sage blocks, `dossier.json` guest guide source), not from a photograph: **flagged** as the one exception to "sampled from an asset", because the booklet is the archetype; each is a 6–8 % tint so text stays ink on near-white. Booking accent **`#C4503F`** (img-001 main roof, as above). Pool `#2FBCB8` only inside imagery.

**Type:** **Nunito Sans** for reading + **Fredoka** (rounded, heavy) for section titles: the booklet's own titles are set in a rounded heavy sans, so this is their typography, not a borrowed script. Different pair from concept 1.

**Motion and fallbacks:** all DOM, no canvas. Reduced motion: no tilt, no spring, chips swap instantly, poster only. JS off: room cards are links to the engine room pages, menu shows all three lists, quotes stack as a list.

**Booking pattern:** the drawer (as §3) opened from the hero, the persistent bar and each room drawer; WhatsApp floating button bottom-right on phone (references #4).

**What would make it fail:** the pastel pages could tip into a "cute" brochure; they must stay as light tints, and the photographs must stay the loudest thing on every screen.

### Concept 3 · unique: **"From the pool to the sea"**

**The idea:** one continuous camera move: you scroll, and the drone in their film rises from the ring of roofs over the jungle to the coastline while the booklet's first pages appear beside it.

**The one thing:** the ring of roofs, scrubbed.

**First screen:** the top-down frame of the ring (vid-001 at 55 s), full-bleed, sharp; the first second of the clip plays on load (poster first, 55–57 s, then holds). Title centred: **"Panta Rei"**, under it the tagline's short form is not used (tagline is for the Welcome). Coral "Check dates". No rating.

**Structure:**
1. Hero (above), which becomes the pinned stage.
2. **Set-piece: scroll-scrubbed video with captions** (scroll playbook §2.3 pattern 3, §4.2 image sequence): vid-001 49–70 s as a 150-frame sequence (WebP/AVIF, desktop 1600 px, mobile 900 px), pinned 400 vh. Three captions, each from the copy, fade over ~18 % of the pin: (a) "Sixteen bungalows, each with its own charm and style" (owner [0] ¶2), (b) "The bungalows sit in a ring around a long pool" ([1] ¶1), (c) "The waves of Kabalana, a short walk from the resort" (`spot`). The camera ends on the coastline; the pin releases into Welcome.
3. **Welcome** — owner's [0] ¶1 set very large (text face, 40–56 px), `featureLine` in the display face.
4. **Your room** — sticky split (pattern 6): the room photos pinned left, crossfading as each room's text block crosses centre on the right (four blocks, 100 vh each on desktop; plain stacked cards on phone).
5. **The pool + After the surf** — img-006 full-bleed with block [1]; the Surf Therapy Massage as a short panel over img-035 crop.
6. **Restaurant** — block [2], img-003 and img-018 as two prints side by side, `hoursNote`.
7. **Panta Fitness Club** — block [3], week strip, img-004.
8. **Guests** — ratings + quote slideshow.
9. **Getting here** — block [7], Maps button; **Groups** — block [6].
10. **Closing** — vid-002 3–17 s plays muted full-bleed (poster first), `closing` centred, coral "Check dates".
11. Footer.

**Main item:** the scrubbed drone rise. **Micro-animations:** caption lines rise in masks (pattern 8, 0.8 s) — on captions only, never section headings (Shahar: no heading reveals); room photos crossfade 0.6 s; the persistent "Check dates" pill shrinks to a round button while the pin runs and grows back after.

**Cost:** 150 frames ≈ 1.6 MB desktop / 0.9 MB mobile, loaded after first paint, in batches, starting when the stage is within one viewport; first load stays ≤ 1.5 MB (poster + text + fonts). **Reduced motion / weak phone / JS off:** no scrubbing; the poster, then the three captions as plain text over three stills from the sequence (55 s, 62 s, 69 s); everything else is static.

**Why it beats what they have:** their film is today a background behind a logo; here the film *is* the explanation of where the rooms are and how far the sea is, and every caption is something the old site never says.

**Colour:** ground `#F6F8F8` (img-043 white bedding, `#8D8C8F` in shade, lifted; very slightly green from the jungle light); ink `#25301F` (img-001 lawn `#626B44`, deepened: 13.6:1); jade `#88B6AC` — the suite's plunge pool, img-046 — as the one quiet colour (caption backing at 20 %, slideshow dots); roof `#914736` (img-036 tiles) for small marks; **booking accent `#B8473A`** — img-001 main roof `#DA6657` deepened further (white 5.25:1), darker than concepts 1–2 so the three read apart.

**Type:** **Bricolage Grotesque** for display (titles and the large owner sentence; its slightly irregular, hand-cut shapes echo the booklet without being a script) + **Hanken Grotesk** for reading. Two families, both away from the default list.

**What would make it fail:** a scrubbed film that stutters on a mid-range phone; the sequence must be cut to 150 frames and the mobile fallback must be the three stills, not a frozen half-loaded frame.

## 5. Divergence table

This run has one business; the table covers this business's three concepts and checks them against each other.

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern | scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| panta-rei-resort | calm · Welcome to Panta Rei | the guest booklet | vid-001 ring → sea, centred title + coral CTA | 12-col, 60/40 room splits, masonry | cool white `#F7F9FB` + pool tint | micro + ±4 rem parallax | drawer → room engine page; per-room buttons | — |
| panta-rei-resort | interactive · Morning swim | the guest booklet | vid-004 surf beach, centred title + coral CTA | 12-col, card rows with peek, colour-block pages | white `#FAFBF8` + lilac/peach/sage page tints | tilt, spring drawer, chips, draggable cards | drawer from cards + floating WhatsApp | — |
| panta-rei-resort | unique · From the pool to the sea | the guest booklet | ring top-down still, pinned, becomes a scrubbed film | full-bleed stage + sticky split | `#F6F8F8` + jade | scroll-scrubbed sequence, mask captions | pill bar that shrinks during the pin | scrubbed video with captions (pattern 3) |

No two rows repeat archetype + first-screen device (same archetype by rule; three different first-screen devices: a played aerial, a played beach clip, a pinned scrubbed still). Each has its own type pair and booking accent shade.

Different from the other businesses Alon has seen this week (other runs, for his eye only, not a rule): Coconut Surf Inn's picked page was "a day by the clock" around a rooftop; Panta Rei is organised as its own booklet and sold from the air.

## 6. Gaps the concepts hit (for the copywriter, the deployer and Alon)

- Concept 2's hero title "A short walk from the waves" is new copy built from `spot`; the copyeditor checks it before the build (or the designer uses "Panta Rei, Kabalana").
- Concept 3's captions reuse copy lines verbatim; no new words.
- Concept 2's menu chips may only use the dish names block [2] already carries (smoothie bowls, granola, banana oat pancakes, shakshuka, the Sri Lankan plate, fish bowl, curry of the day, whole grilled fish); more needs a 4a extension.
- The engine's date parameters are unverified (§3 booking).
- The pastel tints in concept 2 come from the booklet PDF, not a photograph (flagged in its Colour).

The one thing to photograph on location: the ring from the bar's upper floor at sunset, the pool lit, the roofs red, people at the bar — the business has it from the air at noon, never from inside at dusk.

## Hand-off checklist

1. Every photograph looked at (four contact sheets + full views); best width 2000 px stated. ✔
2. `agents/designer/references.md` read in full; cited #1, #4, #10, #14, #17 (and #6 via the accent rule). ✔
3. Divergence table: no other business in this run. ✔
4. §2 lists every video and the ten strongest photographs with widths. ✔
5. Each concept says why it beats the current site, compared with `old-site-mobile.png` / `funnel/walk/01-home-fold.png`. ✔
6. Each first screen: media + what/where + the primary action; rating placement stated. ✔
7. Facts trace to dossier keys. ✔
8. Colours carry hex + asset id + what; concept 2's three page tints are the flagged exception (from the booklet PDF). ✔ (flagged)
9. No default-look item used. ✔
10. Each concept names its one thing; nothing louder. ✔
11. Interactive and unique name a main item from the business's own media (vid-004 cut; scrubbed vid-001); calm names its hero media and micro-animations. ✔
12. Gold opened this run (structure only; media not on this machine). ✔ (partial, noted)
