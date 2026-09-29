# Global Surf Lodge Kabalana — concepts, round 2

creative-director 0.3.0 · run `2026-09-globalsurf-02` · slug `global-surf-adventures` · back at 4d after the 2026-09-29 gate · 2026-09-29

Inputs read this round: the full runtime prompt (playbook 0.6.1 incl. the booking-engine rule in §4, base.md, references.md with the 2026-09-29 calibration), proposal `002-custom-md-designer-from-gate-feedback.md` (Shahar's gate feedback overrides `agents/designer/custom.md` where they conflict), `docs/bookinglayer.md`, `dossier.json` (offers, rooms, levels, contact, reviews, videos, images, gaps, contradictions), `audit.json` `recommended`, `copy/en.json`, the rejected round (`mockups-rejected-r1/concepts.md`, calm notes, the calm and unique contact sheets), the four old-site screenshots in full, `agents/designer/references.md` (#1–#29), gold notes (faces in use: Jost, Outfit, Urbanist — not used here). Looked at: vid-009e / vid-002e sheets, the vid-003, vid-010, vid-009e posters, 28 room photographs, 32 lodge/surf/detail photographs, and the lodge's own lettering (img-072 sign, img-168 chalkboard, img-025 door hanger, img-059 kitchen board). Colours below were measured from pixels (median of a sampled box), and every contrast figure was computed.

## 0. What went wrong last round, and the rules every concept below obeys

The three r1 pages were built on a spine of "photo, text, photo" with ruled data blocks, a giant word or a WebGL surface over the video, underlined links, a rating and a 38-character button in the hero, black text on coral, one small photo per room, and a booking that jumped straight to Bookinglayer. Shahar judged all three far below the current site. Studied as what not to do.

What all three concepts now share (Shahar's bar, point by point — not repeated per concept):

- **Hero:** the lodge's own clip vid-009e full-bleed (pool deck in sun → sunny reef surf, 6.8 s loop, no watermark), poster first. On it only: the header, one centred title (≤ 5 words, horizontally and vertically centred, 44–64 px desktop / 32–40 px phone — never a giant word), optionally one very short subtitle, and **one** short coral button. No rating, no tagline stack, no overlay effect, no gradient bands, no title animation. Legibility comes from a soft text-shadow only (0 2px 24px rgba(0,0,0,.35)); the video is not tinted.
- **Header:** logo left, 4 links (Levels, Rooms, The lodge, Contact), transparent over the video, **no border or rule under it**. Its own "Book now" button is hidden while the hero button is on screen and appears (coral) once the hero scrolls away; on a phone a bottom bar takes over (see each concept). After the hero the header is a plain white bar with no line under it.
- **Colour:** white page, one light tint for alternating sections, one ink, one place colour for icons and titles, **one coral reserved for booking, always with white text** at ≥ 4.5:1 (computed below). Never black or blue text on coral.
- **Type:** two families, both named: a readable text face for everything people read, and a handwritten/script face for section titles only (as on globalsurf.com). The same two faces and the same coral run through the booking pages.
- **Surface:** no rules, dividers, hairlines or underlines. Sections are separated by space, a tint change or a photograph. Actions are buttons (rounded 10 px, 52 px tall), never underlined text. Details are compact, one line, separated by " | ".
- **Galleries:** slideshows with dot navigation (plus swipe and arrow keys), never hover-swapped images. Every photo in one slideshow is cropped to one ratio (hard constraint 5). No captions under photographs.
- **Rooms are sold:** each room type gets its own large slideshow of 5–6 photographs, a description and its details. **Inclusions are a list with small line icons, no photographs.**
- **Forms:** floating-label fields (label inside the field, rises on focus/fill, Material/Google-login style), 56 px tall, soft grey fill, no box borders.
- **Contact:** WhatsApp, call and email are buttons with icons (WhatsApp in its own green icon on a white button); a proper footer (logo, contact buttons, address + map button, social icons, small legal row).
- **Instagram:** every concept has a "follow the lodge" section (see §2 Instagram for what it can honestly show).
- **Our own booking pages** in the site's style (§3.2). Hand-off to Bookinglayer's room step with dates and guests pre-filled.

---

## 1. What this business actually is

A surf-travel agency registered in Israel that sells trips to five countries but runs one place itself: Global Surf Lodge Kabalana, twelve rooms of low white bungalows around one long blue pool with white daybeds floating on dark timber decks (`rooms[0]`, `business.businessType_note`, vid-009e, img-001, img-005). It sells a **week, not a night**: three surf levels at one identical engine price, $1,466 per person for 7 nights from a Saturday, with meals, gear, guided (Level 3: coached) sessions, filmed sessions and the ride to the spot (`offers[0..2]`). Its own lettering already has a voice — condensed navy caps "GLOBALSURF", a brush-pen "Lodge" and a coral band on the roadside sign (img-072), a chalk "How does a wave break?" on the surf-theory board (img-168). And its site hides all of it: the lodge page opens on a tractor, no page states a price, the Rooms tab renders empty, and every book button loses the chosen package (`existing_site.notes`, audit F1–F4, old-site-lodge-desktop.png).

## 2. What the material can and cannot carry

### Video, the business's own (`dossier.videos[]`, all `business-owned`)

| id | length · size | shows | use |
|---|---|---|---|
| **vid-009e** | 6.8 s cut · 1920×1080 · d1920 webm 2.66 MB, m1280 webm 1.39 MB, m720 mp4 1.57 MB, poster AVIF 45 KB | pool deck in bright sun with the white daybeds (≈ 0–2.7 s), then a surfer on a sunny turquoise reef wave by a rock island (≈ 2.7–6.8 s); no watermark | **Hero, all three concepts.** Poster = the pool deck (vid-009e-poster). |
| vid-010 | 12 s cut (src 19–31 s) · m1280 webm 1.99 MB, m720 mp4 1.90 MB | golden-hour beginner session: a woman standing up on a soft-top into the sun, silhouettes, cheering; faint badge top-left | **Level 1.** 4:5 centre crop removes the badge. |
| vid-003 | 10 s cut · m1280 webm 1.78 MB, m720 mp4 1.77 MB, poster | a rider in a blue rash vest on a reef wave, a surfer paddling; **round badge top-left on the poster** | **Level 2.** 4:5 centre crop only (badge sits at x < 160 px of 1920). The cut exists on disk but `dossier.videos[vid-003]` records no `cut`/`renditions` — see Report. |
| vid-002e | 5.2 s cut · m1280 webm 1.23 MB, m720 mp4 1.05 MB | two deep right-hand barrels, watermark already cropped | **Level 3.** |
| vid-009 / vid-002 full cuts | 12 s / 10 s | lodge drone, pool, tuk-tuk, reef coast / lodge from above, pink board in the pool | spare; not needed |
| vid-001, 004, 006, 007, 008 | — | other destinations / grey light / text on every frame / another beach | not used (reasons as in r1, unchanged) |

Rule for every concept: surf clips illustrate a level; they are never captioned or positioned as "our wave" (the dossier has not verified the location of any surf footage).

### Photographs, the business's own

198 photographs, all `business-owned` (153 from globalsurf.com, 45 property-uploaded on Booking.com). 152 have a long edge ≥ 1920 px; **the largest usable width is 2000 px** (img-005 and ~115 others; 6000 px originals exist upstream for the img-001…034 set). Nothing needs upscaling. `not_lodge` images (img-174…198) are never used.

The ten strongest (all 2000 px wide unless stated):

| # | asset | px | subject |
|---|---|---|---|
| 1 | img-005 | 2000×1333 | the pool at water level, open lounge and bar behind |
| 2 | img-001 | 2000×1333 | a guest on a floating daybed over the pool, white bungalow |
| 3 | img-099 | 2000×1333 | surfer deep in a clear turquoise barrel (place unidentified) |
| 4 | img-016 | 2000×1333 | a guest flipping wet hair out of the pool, spray arc |
| 5 | img-026 | 2000×1123 | drone top-down: pool, one palm, guests, boards |
| 6 | img-118 | 2000×1333 | woman carrying a board overhead by the railway, jungle |
| 7 | img-015 | 2000×1333 | bright double room, glass doors to the garden |
| 8 | img-064 | 2000×1333 | open-air bathroom with a palm growing through it |
| 9 | img-072 | 2000×1333 | the roadside sign: GLOBALSURF / Lodge / KABALANA on white and coral |
| 10 | img-093 | 1536×1023 | pool and lounge at dusk, lights on (≥ 1200: full-width allowed, drawn ≤ 1536) |

**Rooms — about 26 photographs, proposed grouping by bookable room type (engine titles; the owner must confirm, `docs/bookinglayer.md` §4):**

| room type (engine) | engine description (source) | photographs for its slideshow, all 3:2 landscape |
|---|---|---|
| Mixed dorm room – 4 beds | "Our new gallery room is fitted with 4 comfortable single beds and features a private outdoor bathroom." (`rooms[2]`) | img-063, img-078 (loft with ladder), img-042, img-068 (beds under the timber roof), img-064, img-014 (outdoor bathroom) |
| Shared Twin Room – 2 Beds | "one double bed and one single bed, a lovely private bathroom and all day beach view" (`rooms[3]`) | img-066, img-080, img-081 (double + single, rattan lamps), img-013, img-069, img-079 (bathroom) |
| Deluxe double room | "one queen-size bed and an optional additional single bed" — **engine only, not in the dossier** (gap, see copy list) | img-015, img-082, img-041, img-043, img-084, img-067 (hammock terrace), img-012 (bungalow outside) |

Portrait room photos (img-028, 029, 045, 048) stay out of the 3:2 slideshows.

The lodge and the week: img-001, 005, 016, 026, 060, 061, 073, 075, 077, 093 (pool, lounge); img-104 (group walking to the surf; badge top-left — crop), img-011 (fruit bowl), img-118, img-111 (sunset longboard), img-023 (dinner toast), img-115 / img-114 (surf theory), img-037 (tuk-tuk with boards, portrait), img-168 (chalkboard), img-062 (drone: lodge between road and railway).

**The lodge's own lettering** (drives type and colour in all three concepts): img-072 sign — condensed navy caps, brush-pen "Lodge", dry-brush coral band, black brush box "KABALANA"; img-168 chalk capitals; img-025 "Gone surfing!" in a classic serif; img-059 "#EATGLOBAL" serif caps inside a painted surfboard outline.

### Atmosphere

No `stock/` folder, none needed.

### Instagram

`contact.socials.instagram_lodge` = `@globalsurf_kabalana` (and agency `@globalsurf_`). **No Instagram post was harvested** (logins/rate limits, `gaps`). So in the mockups the section shows the business's own lodge photographs as square tiles, each tile linking to the profile, with a "Follow @globalsurf_kabalana" button — no post chrome, no likes, no claim that the tiles are posts. For the live site the real feed needs a build-time fetch with the owner's token (schema gap, Report). A third-party Instagram embed script is rejected: heavy, and it would take one of the two embed slots.

### Words (`copy/en.json`)

Usable as is: the intro and day copy, the four-paragraph "Pick your level" block (source of each level's one-liner), "One price, three levels", "Twelve rooms, one big family", nine verbatim testimonials, `featureLine` "Footwear is discouraged. Chilling out is inescapable.", `closing`, amenities, stay info, spot. **Missing for this brief:** a ≤ 5-word hero title, a ≤ 3-word CTA, short script section titles, room descriptions (`rooms[]` is empty), per-level one-liners and booking-page microcopy. Listed in §6.

### Numbers

$1,466 per person, 7 nights, identical for Levels 1–3, engine base price read 28 Sep 2026 (owner to confirm). Stays of 7/14/21/28 nights, Saturday check-in, up to 6 guests (females ≤ 6, males ≤ 6, couples ≤ 3). Room supplements observed 29 Sep (`docs/bookinglayer.md`, build-time snapshot, not copy): dorm $0; twin $140.04 for one guest / $80.03 pp for a couple (13–20 Feb 2027); deluxe double $418.46 pp. Airport pickup from $220 pp (engine add-on). Deposit 40 %, balance 45 days before arrival (`booking.deposit_terms`). Booking.com 8.6/10, 80 reviews, staff 9.5, facilities 9.2, cleanliness 9.2, captured 2026-09-28. Twelve rooms. Kathaluwa West Beach 40 m, Kabalana Beach 350 m, Koggala Airport 3.9 km. Check-in 14:00–20:00, check-out by 11:00. Google 4.7 has no count and is not shown.

### Gaps worth designing around

No season (pitch point). No verified footage of the lodge's own wave. The only WhatsApp is the Israeli HQ mobile (`wa.me/972523593240`); the lodge's own number is only on Google. Freestylers has no choosable dates until Apr 2027 → "Ask on WhatsApp" instead of a date picker. Which photo shows which bookable room is unconfirmed. Site vs engine inclusions disagree (`contradictions`): the booking pages use the **engine** list, because that is what is being booked.

---

## 3. The page archetype — **the surf-week brochure with its own booking desk**

A printed resort brochure, done as a web page: the film on the cover, then distinct spreads — levels, the week, the rooms, the lodge, guests, the waves, Instagram — each designed as its own moment and titled in the lodge's handwriting, and at the back a booking desk that looks like the rest of the brochure. It keeps what makes globalsurf.com good (video cover with a centred title and one coral button, script section titles, distinct sections, photo cards, Instagram, a real footer) and replaces what makes it weak (tractor footage, no prices, empty Rooms tab, 14.8 MB, a booking that loses the package).

It replaces r1's "surf-week film" spine, which produced "photo, text, photo" pages with ruled data between them. It is the only business in this run, so it diverges from nothing else here.

### 3.1 Home page sections — the common order (each concept designs them differently)

1. Hero (§0). 2. Welcome. 3. Choose your level (the booking section: `recommended.above_fold` order level → price → included → trust → action). 4. What's included. 5. The week. 6. Rooms. 7. Feature photograph + `featureLine`. 8. Guests. 9. The waves (spot + Rosa). 10. Instagram. 11. Closing band. 12. Footer.

### 3.2 Booking pages — the common mechanics (each concept presents them differently)

Pages: `/book/` (choose a level) and one page per package: `/book/level-1-fomies/`, `/book/level-2-rollers/`, `/book/level-3-riders/`. Freestylers: its card offers "Ask on WhatsApp" until the engine shows dates again.

The flow, in Shahar's order:

1. **Level** — the level's footage (vid-010 / vid-003 / vid-002e), name, one-liner, "From $1,466 pp | 7 nights", trust line "8.6 Booking.com | 80 reviews" (date small).
2. **What's included** — the engine list for that level (`offers[n].includes_engine`, 13 lines), each with a small line icon, two columns on desktop. Level differences stay visible (Level 3: coached sessions, 4 filmed, 3 video analyses).
3. **Rooms** — three room cards, each a 3:2 slideshow with dots (5–6 photos), description, "Sleeps 4 | 4 single beds | Private outdoor bathroom", and a price note from the build-time snapshot ("Included" / "+$140 pp for 7 nights, as of 29 Sep"). The visitor picks a preferred room.
4. **Dates and guests** — floating-label fields: *Check-in (Saturdays)* as a calendar showing only choosable Saturdays; *Nights* as a 7 / 14 / 21 / 28 segmented control; *Women*, *Men*, *Couples* as − / + steppers (the engine's own guest types; max 6 / 6 / 3).
5. **Total** — base × guests + room supplement = total, per person and overall, in USD, rounded, `.00` hidden. Label "Prices as of <build date>" until the live quote returns, then "Live price". Then deposit: "40% now, the rest 45 days before arrival".
6. **Hand-off** — coral **"Continue booking"** = a GET form/link to `https://globalsurfadventures.bookinglayer.com/en/product/<slug>?start=<in>&end=<out>&female=&male=&couple=` (always `end`, never `duration`). Beside it, one line: "Next, on our secure booking page: confirm your room, add airport pickup if you want it, then your details and payment." Secondary: WhatsApp button "Questions? Ask us".

Data (playbook §4 booking-engine rule, `docs/bookinglayer.md` §6): everything above is in the static HTML from a build-time snapshot (products, inclusions, choosable Saturdays, base prices, room supplements). **No request to Bookinglayer on first load.** After the visitor sets guests: one `GET …/availabilities?mode=checkin` to grey out full Saturdays. After a date: one `GET /public/accommodations/availabilities` (free room types, spots left) and one quote `POST` per room shown. Space is reserved; on failure or timeout the snapshot "from" price stays; a room that is not free for those dates is dimmed with "Not free on these dates"; if only one type is free, "You'll be placed in the <room>". JS off: the calendar is a native `<select>` of choosable Saturdays, steppers are number inputs, the total is the snapshot table, the form still submits to the engine.

What we must say honestly on the page: the engine cannot receive the room choice (`docs/bookinglayer.md` §3) — hence "confirm your room" in the hand-off line; nothing is held until the engine's checkout.

Persistent booking bar on phones (every page after the hero): "From $1,466 pp | 7 nights" + coral "Book now"; on a `/book/` page it becomes the running total + "Continue".

Recommended to the owner, not ours to do: theme the engine with the same two faces and coral in its backoffice custom CSS, and put it on `bookings.globalsurf.com` (open decisions in `docs/bookinglayer.md` §6.3), so the hand-off does not feel like leaving.

---

## 4. Three concepts

### Concept 1 · quiet — **"Postcard"**

**The idea in one sentence.** The current site's good bones — centred video title, handwritten section titles, photo cards, Instagram, a big footer — redrawn clean, bright and fast, with a booking desk that is simply the next page of the same postcard.

**The one thing.** The pool with its white daybeds floating on dark timber (vid-009e opens on it; img-001, img-005). The page is otherwise white and quiet; the pool is its only loud moment.

**The first screen (exactly).** vid-009e full-bleed, 100svh, `object-fit: cover`, poster vid-009e-poster (AVIF 45 KB) as the LCP. Header over it: logo left, four white links right, nothing else. Centred on the video: title **"Surf weeks in Sri Lanka"** in DM Sans 500, 56 px desktop / 36 px phone, white; 28 px below it one coral button **"Book package now"** → `/book/`. Nothing else on the screen. Phone: same, button 100 % wide minus 24 px margins, centred under the title (not docked to the bottom edge).

**Home page sections.**
1. Hero.
2. **Welcome** — white, centred column 640 px: script title "Next set is yours", the two intro paragraphs, then one compact line "12 rooms | Saturday check-in | ISA-certified surf guides".
3. **Choose your level** — tint ground. Three cards in a row (desktop), each: the level clip at 4:5 in a 16 px-radius frame (poster first; plays muted when ≥ 60 % in view, one at a time), then level name (DM Sans 600, 24 px), one-liner, "From $1,466 pp | 7 nights", coral "Choose Level 1" → `/book/level-1-fomies/`. Under the row, one slim wide card: img-001 (3:2) left, "Freestylers | B&B only | from 4 nights" and a white WhatsApp button "Ask about dates". Trust line centred under it: "8.6 on Booking.com | 80 reviews | 28 Sep 2026". Phone: the three cards become a swipe row with peek and dots (#14).
4. **What's included** — white. Script title; the engine inclusion list in two columns with small pool-blue line icons (bed, bowl, board, clock, camera, chat, spa, van, water, cup, map); a one-line note for Level 3's coached sessions and extra filming. Right of the list on desktop: img-115 (surf theory) at 3:2.
5. **The week** — tint. Script title "Surf, breakfast, surf again"; the two short paragraphs centred; under them a 3:2 slideshow, 960 px wide, dots: img-104, img-011, img-118, img-111, img-023, img-114.
6. **Rooms** — white. Script title; intro paragraph ("There are just twelve rooms…"). Then the three room types as alternating rows: slideshow 60 % (3:2, dots, 5–7 photos per §2) and text 40 % (room name, description, detail line with " | ", price note, secondary button "Book with this room" → the level chooser with the room remembered). Under the three rows, one compact line: "Every room: air conditioning | ceiling fan | safe box | private shower | board rack".
7. **Feature** — img-005 full-bleed, 16:9 desktop / 4:5 phone, `featureLine` centred in white over the flat bright water.
8. **Guests** — tint. "8.6" large with "Booking.com | 80 reviews | 28 Sep 2026", then "Staff 9.5 | Facilities 9.2 | Cleanliness 9.2" on one line; below, a quote slideshow with dots (one quote at a time, 24 px text, name and source).
9. **The waves** — white, two columns with a 48 px gap and no line: left, script title, `spot` text and the Rosa headline (height now, time, swell, wind) in DM Sans; right, Rosa's widget, **light** theme, 420×500 reserved.
10. **Instagram** — tint. Script title, "Follow @globalsurf_kabalana" button with the Instagram icon, six square tiles in a row (3×2 on phone): img-016, img-024, img-011, img-118, img-075, img-111.
11. **Closing** — img-093 (dusk) full-bleed at 21:9 (4:5 phone), `closing` line centred in white, coral "Book package now" and white WhatsApp button side by side, centred.
12. **Footer** — tint ground, four columns: logo + one line; "Talk to us" (WhatsApp, Call, Email buttons with icons); "Visit" (address, check-in 14:00–20:00 | check-out 11:00, "Open in Google Maps" button); "Follow" (Instagram, YouTube, Facebook icons). Small bottom row: © Global Surf Adventures | Terms. No underlines.

**Booking pages.** A calm, single scrolling page per level. Top: the level clip as a 16:9 band (50vh) with the level name centred on it (same rules as the hero: title only). Below, four stacked sections on white/tint in the §3.2 order, each opening with a small step label ("Step 2 of 4" — a real sequence) and a script title ("What's included", "Your room", "Dates and guests", "Your total"). Desktop: a sticky summary card on the right (white, soft shadow, 12 px radius) showing level | dates | guests | room | total and the coral "Continue booking". Phone: the summary is the bottom bar (total + "Continue"), tap to expand into a sheet. `/book/` itself is the three level cards at a larger size with the Freestylers card and the trust line.

**How rooms and levels are sold.** Levels: three footage cards side by side, price on each (#7), one tap into that level's booking page. Rooms: one big slideshow per room type, alternating left/right, with description and an honest price note — the opposite of the old site's empty Rooms tab.

**Why it beats the current site.** Same cover the owner already chose — their video, a centred title, one coral button — but it is their sunlit pool and reef instead of a tractor with a badge over the headline, and it loads ~0.2 MB instead of 14.8 MB with no Messenger bubble on the text. One scroll down the visitor sees three levels with their footage and price and rooms with real galleries; the current site shows no price at all and an empty Rooms tab.

**Colour** (measured).
- Ground `#FFFFFF` — the sunlit bungalow wall, vid-009e-poster (500–700, 380–440).
- Tint `#EBECEE` — the white roof edge in shade, img-005 (top centre).
- Ink `#27293E` — the navy "GLOBALSURF" letters on the sign, img-072 (14.3:1 on white).
- Place colour (script titles, icons) `#00718F` — the pool at water level, img-005 lower centre (5.6:1 on white, 4.7:1 on the tint).
- Booking `#B84F50` — the sign's coral band `#BF5758` (img-072), darkened 4 % so white text reaches **4.92:1**. White text only.
- Would look wrong beside: the old site's taupe `#E8E3DD` and olive script, or any cream — the coral turns muddy on warm grounds.

**Type.** **DM Sans** (400, 500, 600) for the hero title, body, UI and booking forms — low-contrast, open, very readable at 17 px on a phone in sun; its round geometric caps sit comfortably next to the sign's condensed GLOBALSURF without imitating it. **Caveat** (600) for section titles only, 40–56 px — the surf-theory chalk hand of img-168 ("How does a wave break?"), the most legible handwritten face available, close in spirit to the old site's hand-drawn titles. Two families, subset Latin, ≈ 90 KB.

**Motion.** The hero video. Level clips play muted when in view (one at a time). Slideshows slide 0.35 s on dot/swipe. Buttons darken 6 % on hover. No parallax, no fades on sections, no title reveals. Reduced motion / Save-Data: posters only, no autoplay anywhere. JS off: posters, all text, every slide stacked as a scrollable row, all links and the booking form work. No WebGL.

**Booking pattern.** Kube's bottom-of-screen mobile button and Morgan's Rock persistent bar (#4), price on each level card (#7), one accent (#6), booking UI script loaded on first interaction with a booking control (#5).

**Forecast.** **Yes**, section 9. Dossier spot "South point" (owner's words, `location.spot`) → Rosa `south-point` "South Point", Kathaluwa, 5.98044 N 80.33978 E, ≈ 260 m from the Google pin (5.98105, 80.34206). "The Rock" has no Rosa spot and is not shown. Headline in DM Sans on white; widget light theme; lazy, reserved, plain-link fallback "See today's forecast for South Point on Rosa"; credit "Forecast for South Point by Rosa". No second embed (map is a button).

**Budget.** First load (phone): HTML+CSS ≈ 40 KB, fonts ≈ 90 KB, poster 45 KB, JS ≈ 6 KB (video attach, slideshows, bar) → ≈ 0.2 MB. Hero video after first paint: m1280 webm 1.39 MB / d1920 webm 2.66 MB. Level clips only in view: m720/m1280, 1.0–2.0 MB each. Booking page: + ≈ 25 KB JS on first interaction; Bookinglayer calls only after interaction.

**What would make this concept fail.** Politeness: if the sections are all the same width and rhythm, it reads as a template — the level cards, room slideshows and the feature photograph must be genuinely big.

---

### Concept 2 · richer interaction — **"Try your week"**

**The idea in one sentence.** The page lets you watch your week before you book it: tap a level and its film plays, tap a room and its gallery opens, and the booking desk is a guided step flow that keeps the footage with you.

**The one thing.** The surfing itself, per level: the golden-hour first stand-up (vid-010), the green reef waves (vid-003), the barrels (vid-002e). One stage carries it; nothing else on the page is as loud.

**The first screen (exactly).** vid-009e full-bleed, 100svh, poster first. Header over it (logo, four links). Centred: title **"Next set is yours"** (the owner's own line, already in the copy) in Newsreader Display 400, 64 px desktop / 40 px phone, white; under it a very short subtitle **"Surf weeks in Kabalana, Sri Lanka"** in Newsreader Text 20 px; 28 px below, one coral button **"Choose your level"** → scrolls to the stage. Nothing else.

**Home page sections.**
1. Hero.
2. **Choose your level — the stage** — white. Script title. A segmented control of three pills ("Level 1 Fomies" "Level 2 Rollers" "Level 3 Riders", the active one ink-filled with white text). Under it the stage: the active level's clip, 16:9 at up to 1120 px wide, 16 px radius (phone: 4:5, swipe left/right changes level, dots under it). Under the stage one compact info row: one-liner | "From $1,466 pp | 7 nights | Saturday check-in" | coral "Book Level 1" → that level's booking page, and a white "What's included" button that expands the inclusion list inline (icons, two columns). Level change: clip crossfade 0.4 s, row text swaps. Trust line under the stage. Freestylers as a small card beside the stage's bottom row: "B&B only | from 4 nights" + WhatsApp button.
3. **The week** — tint. Two columns: left, script title "Surf, breakfast, surf again" and the two paragraphs; right, a 3:2 slideshow with dots: img-104, img-011, img-118, img-115, img-111, img-023.
4. **Rooms — the room viewer** — white. Script title and intro paragraph. Pills "Dorm | Twin | Deluxe double". Under them one big gallery for the active room: main image 16:10 up to 1120 px, arrows and dots, swipe; beside it (desktop) or under it (phone) the room name, description, detail line, price note and "Book with this room". Changing room slides the gallery (0.35 s). Every-room line under it.
5. **Feature** — img-016 (the hair-flip spray) full-bleed, `featureLine` centred in white over the pale sky part of the frame.
6. **The lodge** — tint. Script title; amenities as icon chips in three columns (pool, yoga chalet, ice baths, restaurant, bar, co-working, airport shuttle, garden…); beside them a 3:2 slideshow with dots: img-005, img-075, img-077, img-026, img-061.
7. **Guests** — white. Rating line; a quote carousel of three visible cards on desktop (one on phone), cards white on tint with soft shadow, dots under.
8. **The waves** — tint, two columns without a line: Rosa headline in Newsreader left, Rosa widget light right.
9. **Instagram** — white. Script title + "Follow @globalsurf_kabalana" button; a snap-scrolling row of eight square tiles with peek and dots.
10. **Closing** — img-093 band, `closing` centred in white, coral "Book package now" + WhatsApp button.
11. **Footer** — white, same content as Concept 1, laid out in three columns with the contact buttons first.

**Booking pages — the booking desk.** `/book/` opens as a full-screen step flow in the page's own type and colours (not a modal over the home page; a real page, so back/forward and sharing work). Top: a progress row of four pills "Level | Room | Dates & guests | Total" (active pill ink, done pills with a check). The upper 40 % of each step is a media band that belongs to the step: step 1 the chosen level's clip (level pills above it, inclusions list below it); step 2 the room viewer from the home page (pick a room); step 3 img-001 (the daybed) calm behind nothing — the band is just the photo — and below it the floating-label date calendar, nights control and guest steppers; step 4 img-093 with the total card below. Steps slide horizontally 0.3 s; focus moves to each step's heading; each step has its own URL hash. Bottom bar on every step: running total + coral "Next" (last step: "Continue booking" + the hand-off line). JS off: all four steps stacked on one page with the GET form (the same markup, no sliding).

**How rooms and levels are sold.** Levels: one stage, three films, you choose by watching (White Desert tile choice #2, price on the offer #7). Rooms: one generous viewer, one room at a time, with a gallery big enough to sell it.

**Why it beats the current site.** The current site shows four dim level tiles leading to pages whose buttons lose the package; here a visitor watches their level's actual water, sees the price and what's in it, and steps through dates and guests to the engine's room step with everything filled. Same centred serif title and one coral button the owner likes, on their own sunny footage, without a tractor, a badge or a chat bubble.

**Colour** (measured).
- Ground `#FFFFFF` — sunlit wall, vid-009e-poster.
- Tint `#E3E4E9` — the bungalow wall in shade, img-001 (top centre).
- Ink `#0A1920` — the pool's shadow under the timber deck, img-001 (centre) — 17.9:1.
- Place colour (icons, active dots) `#008292` — the pool in sun, img-001 lower centre (4.6:1 on white; icons and dots only, never text on the tint).
- Booking `#C8432F` — the surfer's red-orange top on a turquoise wave, img-138 (`#FF3823`), darkened so white text reaches **4.88:1**.
- Would look wrong beside: the golden-hour grade of vid-010 leaking into page chrome (it stays inside the clip) and any muted teal/petrol.

**Type.** **Newsreader** (variable, optical sizes: Display for the hero title, Text 400/600 at 18 px for everything people read, including forms) — a screen-drawn text serif; it carries the old site's centred serif hero and matches the lodge's own serif lettering ("Gone surfing!" door hanger img-025, "#EATGLOBAL" img-059). **Mansalva** for section titles only — a dry brush-pen hand like the sign's "KABALANA" box and brush edges (img-072) and the old site's dry-brush titles. Two families, ≈ 110 KB subset.

**Motion.** Hero video; the stage crossfade; room gallery slide; booking steps slide; the expanding inclusions list (height 0.3 s). Nothing on headings, nothing over the footage, no parallax. Reduced motion: posters only, instant level and step changes. JS off: the stage shows the three levels stacked (poster + row + link each), the room viewer shows the three rooms stacked, the booking flow is one page.

**Booking pattern.** White Desert's tile-tap choice (#2) and price on the offer (#7), Tandjung Sari's slide-over steps turned into real pages (#1), Kube's lazy booking boot (#5), persistent bar (#4), one accent (#6).

**Forecast.** **Yes**, section 8, same mapping as Concept 1; widget **light**.

**Budget.** First load ≈ 0.25 MB (Newsreader + Mansalva ≈ 110 KB, poster 45 KB, JS ≈ 12 KB). Hero video after paint as Concept 1. The stage loads only the active clip (m720 on phones, m1280 on desktop), only when in view. Booking flow JS ≈ 30 KB on first interaction.

**What would make this concept fail.** If the stage looks like a video player (controls, progress bars, chrome) instead of a picture you choose, or if the step flow feels like a different site — it must keep the header, faces, coral and footage of the home page.

---

### Concept 3 · bolder — **"The sign"**

**The idea in one sentence.** The lodge's roadside sign — navy caps, a brush-script "Lodge", a coral band — grown into a whole site: bigger photographs, full-bleed galleries, light aqua colour-block sections, and a split-screen booking desk where the footage never leaves the screen.

**The one thing.** The sign itself (img-072): its brush script sets every title, its coral is the only button colour, its navy is the ink. The photographs are big, but the voice is the sign's.

**The first screen (exactly).** vid-009e full-bleed, 100svh, poster first. Header over it (logo, four links). Centred: title **"Your surf week starts here"** (5 words — the owner's own lodge headline "Your Surf Trip To Sri-Lanka Starts Here" shortened; copywriter to confirm) in Yellowtail, 64 px desktop / 42 px phone, white — the brush "Lodge" of the sign, at a modest size, not a giant word. One coral button below: **"Book your week"** → `/book/`. Nothing else.

**Home page sections.**
1. Hero.
2. **Three levels, three panels** — aqua ground. Script title. On desktop three tall video panels side by side (70vh, 16 px radius, 4:5 crops of vid-010, vid-003, vid-002e). Posters show; hovering or focusing a panel widens it to 50 % (0.4 s) and plays its clip; the others keep their posters (one clip at a time). Under each panel on the aqua ground: level name (Bricolage Grotesque 700, 28 px), one-liner, "From $1,466 pp | 7 nights", coral "Choose Level n". Phone: panels stack full-width 4:5 with the text under each, the clip in view plays. Freestylers as a wide white card below with the WhatsApp button; trust line.
3. **The week** — white. Two photographs edge to edge at 50/50, full-bleed, 3:2 each: img-118 and img-111; the script title and the two paragraphs centred below them; then a second full-bleed pair: img-011 and img-023.
4. **Rooms — three full-bleed galleries** — white. Script title + intro. For each room type: a full-bleed horizontal gallery 60vh tall of its 3:2 photos side by side (drag/swipe, arrows, dots), then on the aqua ground a text block: room name, description, detail line, price note, "Book with this room". Three rooms, three galleries — the biggest room presentation of the three concepts.
5. **Feature** — img-005 full-bleed, `featureLine` centred white.
6. **What's included** — aqua ground. Script title; the inclusion list in three columns with ink line icons at 28 px; a coral "Book package now" under it.
7. **Guests** — white. One quote at a time in Bricolage 32 px (text face, readable), name and source; dots; rating line above.
8. **The waves** — aqua, two columns without a line: Rosa headline left in Bricolage, Rosa widget **light** right.
9. **Instagram** — full-bleed row of six square tiles edge to edge (3×2 on phone); centred over the section above the row, script title and the follow button on white.
10. **Closing** — img-093 band, `closing` centred white, coral button + WhatsApp.
11. **Footer** — aqua ground, ink text (10.4:1): logo large left, contact buttons, address + map button, social icons, legal row.

**Booking pages — split screen.** Desktop: the left half is pinned, full height, and shows the step's media: the level clip (step 1–2, level and inclusions), the chosen room's gallery with dots (step 3, rooms), img-001 (step 4, dates and guests), img-093 (step 5, total). The right half scrolls through the steps on white, one section per step, with script titles and the floating-label fields; the summary sits at the end of the right column and in a sticky bottom strip. Media changes by crossfade (0.4 s) as each step's section crosses the middle of the viewport. Phone: the media is a 40vh band at the top that shrinks to 20vh as you scroll, the steps below, the bottom bar with total + "Continue". JS off: media band = the level poster, steps stacked, GET form.

**How rooms and levels are sold.** Levels as three living panels you open by pointing at them (#7 price on the offer). Rooms as full-bleed galleries, three of them — sold like a boutique hotel.

**Why it beats the current site.** It keeps the old site's centred title, coral button and script titles, but takes the script and the coral from the lodge's own sign instead of a generic template, and replaces dim level tiles and an empty Rooms tab with living level panels and full-bleed room galleries. And the booking desk keeps the visitor's level footage on screen until the engine's room step, where the old site's buttons dropped the package.

**Colour** (measured).
- Ground `#FFFFFF` — sunlit wall, vid-009e-poster.
- Colour-block ground `#A2E6FB` — the light in the lip of the barrel, img-099 (centre); a light ground (ink on it 10.4:1), used for whole sections, never under the video.
- Ink `#27293E` — the sign's navy letters, img-072.
- Booking `#D1402A` — the surfer's orange-red top, img-138 (`#FF3823`), darkened so white text reaches **4.69:1**; button label 18 px/600.
- Coral on aqua is only ever a button with white text, never text on aqua.
- Would look wrong beside: cream, sand or taupe (the aqua goes green next to them) and any dark section.

**Type.** **Bricolage Grotesque** (variable, 400/600/700, normal width only) for body, UI, forms, level and room names — a grotesque with a hand-cut warmth that sits between the sign's condensed caps and its brush script; readable at 17 px. **Yellowtail** for section titles and the hero title — a connected brush script, the closest open face to the sign's "Lodge". Two families, ≈ 100 KB subset.

**Motion.** Hero video; level panels widen on hover/focus/tap and play; room galleries drag with inertia; booking media crossfades by step. No motion on titles, nothing over the footage. Reduced motion: posters, no widening (panels equal width), no crossfade. JS off: all panels equal and still, galleries as native horizontal scroll, booking stacked.

**Booking pattern.** White Desert's price-on-card panels (#7) and pinned media (#18 idea, but vertical and not scroll-jacked), persistent bar (#4), lazy booking boot (#5), one accent (#6).

**Forecast.** **Yes**, section 8; widget **light**.

**Budget.** First load ≈ 0.25 MB (fonts ≈ 100 KB, poster 45 KB, JS ≈ 14 KB). Hero video after paint as Concept 1. Level panels: posters (AVIF ≈ 20–40 KB each) until a panel is opened or in view; one clip at a time (m1280 desktop / m720 phone). Room galleries lazy, `srcset` 800/1280. Booking page JS ≈ 30 KB on interaction.

**What would make this concept fail.** Aqua on too many sections turns bold into loud, and Yellowtail at small sizes becomes a wedding invitation — titles only, ≥ 40 px, and aqua on no more than four sections.

---

## 5. Divergence table

Only one business is concepted in run `2026-09-globalsurf-02`; the rows below differ from each other (they share the archetype by rule). No two repeat archetype + first-screen device + type + booking presentation.

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern |
|---|---|---|---|---|---|---|---|
| Global Surf Lodge Kabalana | 1 · quiet "Postcard" | surf-week brochure with its own booking desk | vid-009e full-bleed, centred DM Sans title "Surf weeks in Sri Lanka" + "Book package now" | centred 12-col, alternating white/tint sections, three level cards, alternating room rows | `#FFFFFF` + `#EBECEE` (img-005 roof shade) | hero video, in-view level clips, dot slideshows | one scrolling page per level with a sticky summary card; mobile bottom bar |
| Global Surf Lodge Kabalana | 2 · richer "Try your week" | same | vid-009e, centred Newsreader title "Next set is yours" + tiny subtitle + "Choose your level" | one wide stage, pill switchers, room viewer | `#FFFFFF` + `#E3E4E9` (img-001 wall shade) | stage crossfade, room gallery slide, sliding booking steps | full-screen step flow (Level, Room, Dates & guests, Total) with a media band per step |
| Global Surf Lodge Kabalana | 3 · bolder "The sign" | same | vid-009e, centred Yellowtail title "Your surf week starts here" + "Book your week" | full-bleed panels and galleries, aqua colour blocks | `#FFFFFF` + `#A2E6FB` (img-099 barrel lip) | widening level panels, draggable full-bleed galleries, split-screen media crossfade | split screen: pinned media left, steps right |

Other businesses in this run: none, so there is nothing to diverge from inside the run.

---

## 6. For the copywriter — the short lines these concepts need

Facts only from the dossier; lines marked "owner's words" exist already.

**Hero titles (≤ 5 words)**
- C1: "Surf weeks in Sri Lanka" (proposed; from `business.description_packages` "weekly retreats" + place).
- C2: "Next set is yours" (owner's words, copy intro heading) + subtitle ≤ 6 words: "Surf weeks in Kabalana, Sri Lanka".
- C3: "Your surf week starts here" (shortened from the owner's lodge headline "Your Surf Trip To Sri-Lanka Starts Here").
- Alternates welcome: "All levels, steps from the beach" (Shahar's example, supported by `business.description`: "all levels", "a few steps from the ocean").

**CTAs (≤ 3 words)**: "Book package now" (hero C1, closing), "Choose your level" (hero C2), "Book your week" (hero C3), "Book now" (header and mobile bar), "Choose Level 1/2/3", "Book with this room", "Continue booking" (hand-off), "Ask about dates" (Freestylers), "Questions? Ask us" (WhatsApp), "Follow @globalsurf_kabalana", "Open in Google Maps".

**Script section titles (≤ 4 words, most ≤ 3)** — need: Welcome ("Next set is yours" — exists), "Choose your level", "What's included", "Your week" / keep "Surf, breakfast, surf again" (5 words; OK in script if the designer confirms it fits on one line on a phone), "Our rooms" (replacing "Twelve rooms, one big family" as the title; keep that line as the intro's first sentence), "The lodge", "What guests say" (exists), "The waves", "Follow the lodge", "Getting here" (exists). Booking pages: "Your level", "What's included", "Your room", "Dates and guests", "Your total".

**Level one-liners (≤ 10 words each)** from `copyBlocks[2]` / engine descriptions, e.g. Level 1 "Your first time on a board. No experience needed." · Level 2 "You stand up; now catch green waves." · Level 3 "You carve; now sharpen your skills." · Freestylers "B&B only, for independent travellers." (Freestylers board: contradiction B&B vs half board — use the engine's "accommodation and breakfast only".)

**Room copy — missing (`rooms[]` is empty)**, one block per engine room type: label (engine title), one enticing line (≤ 12 words), description (2–3 sentences), beds, sleeps, bathroom. Sources: dorm `rooms[2]`, twin `rooms[3]`, amenities `room_amenities`. **Deluxe double room: its engine description is not in the dossier** ("one queen-size bed and an optional additional single bed", seen in the Bookinglayer research) — the harvester must record it before the copywriter can use it.

**Booking pages** (interface labels, template-owned but the words must be approved): step labels; field labels "Check-in (Saturdays)", "Nights", "Women", "Men", "Couples"; "Prices as of {date}" / "Live price"; "Not free on these dates"; "You'll be placed in the {room}"; the hand-off line "Next, on our secure booking page: confirm your room, add airport pickup if you want it, then your details and payment."; deposit line "40% now, the rest 45 days before arrival" (`booking.deposit_terms`).

**Compact detail lines**: "12 rooms | Saturday check-in | ISA-certified surf guides"; "From $1,466 pp | 7 nights"; "Staff 9.5 | Facilities 9.2 | Cleanliness 9.2"; "Every room: air conditioning | ceiling fan | safe box | private shower | board rack".

---

## Hand-off checklist

1. Photographs: all room, lodge, surf and detail sets looked at this round (four contact sheets + lettering crops); r1 looked at all 198. Best usable width **2000 px**. ✔
2. references.md read in full; cited: #1, #2, #4, #5, #6, #7, #14, #18, #26 (and #3/#24 overridden by Shahar's taste for script titles, stated in the Report). ✔
3. Divergence table covers every business concepted in this run (one). ✔
4. First screens: strongest media (vid-009e), what + where in the title (C2 via its subtitle), primary action. **No proof point on the first screen**, by Shahar's calibration (conflicts with playbook §3 item 1 — Report). ✔ with that exception
5. Facts trace to dossier keys (`offers`, `rooms`, `room_amenities`, `reviews.booking`, `stayInfo`, `booking.deposit_terms`, `location`, `contact.socials`); room supplements come from the build-time snapshot described in `docs/bookinglayer.md`, not from copy. ✔
6. Every colour has hex + asset id + what it is; every white-on-coral contrast computed (4.92 / 4.88 / 4.69). ✔
7. Default-look list: none used (white grounds, no Inter/Roboto, no banned serif, no all-caps labels, no middle-dot strings — details use " | " as Shahar asked). ✔
8. Each concept names its one thing. ✔
9. Every video listed; vid-009e, vid-010, vid-003, vid-002e used. ✔
10. Each concept says why it beats the current site. ✔
