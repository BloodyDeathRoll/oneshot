# Coconut Surf Inn, Gurubebila: concepts

Station 4d · creative-director 0.6.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-05.

Inputs:
- `dossier/coconut-surf-inn-guest-house-and-restaurant/dossier.json`, `audit.json` + `audit.md`, and the funnel walk screenshots in `funnel/walk/` (Google listing, Booking.com and Airbnb folds).
- `sites/coconut-surf-inn-guest-house-and-restaurant/copy/en.json`, which passed 4c in round 1 (`review.md`, 0 unsourced).
- All 134 photographs. I looked at them on seven contact sheets, plus two close-up sheets of the twelve candidates (img-009, 102, 103, 104, 105, 106, 099, 007, 006, 002, 100, 015) and full-size views of img-009, img-002, img-106 and img-007.
- The three videos, from their dossier entries.

Also read or opened this run:
- `agents/designer/references.md` in full, and `agents/designer/custom.md`.
- `agents/designer/scroll/playbook.md` §0 and §2.3.
- The gold README and notes. The gold pages themselves were rendered in Chromium at 1440 and 390: Global Surf `postcard`, `the-sign` and `try-your-week` (`sites/global-surf-adventures/mockups/*/dist/`), plus `the-lavish-haven.html`, `ka-surf-hostel.html` and `layday-surf.html`.
- The other two businesses in this run: `sites/cheeky-monkey/concepts.md` and `sites/lotus-surf-house/concepts.md`, with their picks and their shipped Rosa blocks.

There is no `stock/` folder and none is needed (§2).

Colours were sampled with `ffmpeg` area-averaged crops (`crop=w:h:x:y,scale=1:1:flags=area`, original pixels). Each crop was checked on sight, and contrast was computed with the WCAG formula.

---

## 1. What this business actually is

Chinthaka Eranga's family house sits off the Galle–Matara road, on a lane at Gurubebila. Its own sign says "Gurubebila", its Airbnb text says "Midigama", and every platform says "Weligama" (`location.place_name_used`). Between the house and the sea is a large open green where locals and travellers watch the surf, play cricket and sit out the sunsets. In front of it is **Coconuts**, "a consistent A-frame reef break, located in front of the guesthouse", in the host's own words (`break`, `location.spot`).

The house was rebuilt around 2022–2023 (`business.renovation`) in grey polished concrete with red timber window frames. In its middle is a skylit light-well where palms grow out of a shallow channel of water (img-006/007/011). Upstairs is a long open-sided restaurant with purple benches and saffron and crimson cushions, which has its own Google listing (4.6, 39 reviews). Above that is a thatched roof terrace with a swing seat and hammocks that looks over the green to the reef (img-102/103, img-009).

It sells two kinds of night under one roof. Two budget rooms have fans and cold water. Four rooms have A/C and hot water. That split is the main source of its bad reviews (`room_types_note`, audit F5).

So the house is best understood **by the clock**: you arrive at 13:00, the afternoon is on the roof, the evening is on the green, the restaurant closes at 22:00, the restaurant opens at 7:30 with the break in view, and you leave at 11:00.

## 2. What the material can and cannot carry

### Video, the business's own (`dossier.videos[]`)

| id | what | length | usable? |
|---|---|---|---|
| vid-001 | An affiliate listicle with a "scan to book" QR code on every frame. The shots are generic stock or AI, mislabelled "Mirissa" | 195.3 s | **No.** Third party, licence unknown, not this place |
| vid-002 | A slideshow of 2017 date-stamped snapshots of the white pre-renovation building | 290 s | **No.** Licence unknown, and it shows a building that no longer exists |
| vid-003 | Drone footage of the Coconut Point reef, the beach and the lineup at sunset. It belongs to **another business** (a white two-storey guesthouse) | 144.2 s | **No.** Another business's film. It shows the wave beautifully, but showing it would present someone else's footage as Coconut Surf Inn's |

**There is no usable video, so no concept opens on video.** Each concept repeats this below. No hero-loop timestamps are given. This is unlike Cheeky Monkey, where Alon waived a licence for a preview: here no clip even shows this house, so there is nothing to waive. That fits Alon's signal on Cheeky Monkey ("real footage, no cartoon"): the answer here is real photographs, not a substitute for footage.

### Photographs, the business's own

There are 134, all `business-owned`: 105 property uploads on Booking.com and 29 host uploads on Airbnb. **70 are ≥ 1920 px on the long edge.** The Booking originals are served at max 1920, so **the largest usable width is 1920 px** (img-009, img-102–107, img-099, img-008 and others). Full-bleed is not only allowed, it is preferred.

The strongest ten:

| # | asset | px | what it is | role it can hold |
|---|---|---|---|---|
| 1 | **img-009** | 1920×1440 | From the roof: palms, the open green, the beach shacks with a blue tarp roof, people on the path, and the sea with whitewater over the reef. Big pale sky | **The** first-screen photograph. Full-bleed 16:9 desktop (1920×1080 native), 4:5 phone (1152×1440, which leaves 768 px of sideways travel) |
| 2 | **img-102** | 1920×1440 | The thatched roof terrace from under the thatch: the fringe hangs across the top, timber pillars, the swing frame, the sea and palms beyond | Full-bleed with a strong near/mid/far depth. Interactive hero |
| 3 | **img-103** | 1920×1440 | The same terrace with a grey hammock slung between pillars and the sea behind | Full-bleed band or set-piece frame |
| 4 | **img-105** | 1920×1440 | The upper-floor restaurant: cushioned benches, low dark tables, and the sea through the pillars | The restaurant's lead, 3:2 or 16:9 |
| 5 | **img-106** | 1920×1440 | The restaurant's purple bench seating with saffron and crimson cushions under the slatted roof | Colour source, gallery |
| 6 | **img-099** | 1920×1440 | The house at night: the restaurant floor lit with string lights, glowing through the palms | The night picture. A full-bleed band only (never a dark page) |
| 7 | **img-007** | 1600×1066 | The light-well: palms in a jade water channel between red-framed windows | Container-width 3:2 (≤ 1600) |
| 8 | **img-006** | 1066×1600 | The same light-well, portrait, with the skylight above | Portrait print ≤ native |
| 9 | **img-008** | 1920×1434 | Three coconut palms against a pink-and-orange sunset on the beach (2015 upload) | Full-bleed band. The logo's palm-and-sun made real |
| 10 | **img-002** | 1600×1034 | The round "Coconut Surf Inn — Gurubebila" sign: a palm in front of an orange sun, on the grey wall in leaf shade | Small print. The brand's own lettering and colour |

Runners-up:
- img-100 and img-101 (the swing seat over the sea, 1920).
- img-104 (benches under the thatch, 1920) and img-107 (the long restaurant, 1920).
- img-015 (a guest reading in the roof lounge, 1440×1920; the only relaxed person in the set).
- img-095 (guests and locals around turtle hatchlings on the beach, 1920×1434).
- img-011 (the courtyard corridor, 1600).
- img-016 (side lawn with boards racked against the wall, 1440×1920).
- img-005 and img-020 (a surfboard by a red-framed door).

**Rooms, by type** (`images[].room_types`), from strong to weak:
- Deluxe Double with Balcony (img-068–081, 1440×1920 portraits). The best rooms: rattan chairs, red cushions, A/C, balcony into banana palms.
- Superior Double (img-034/035/037 at 1920, plus img-001, 017, 030, 064).
- Deluxe 2 Adults + 1 Child (img-036, 038, 040, 039).
- Deluxe Family (img-031, 045, 022, 027, 066). Wide-angle and red-walled.
- **The two budget rooms are the weakest photographs in the set**: dim, often night-time shots of older net-canopy rooms (img-046–052, img-055–062). They must still appear plainly (audit F5) as **4:5 centre crops at ≤ native size** (references #26), never as a lead image.
- Bathrooms appear in every gallery as its last slide. A guest complained that none were shown (`gaps` "room-type clarity"). img-064 shows the electric water heater, which tells the hot-water story without a word.

**Do not use:**
- The 2017 date-stamped Airbnb snaps (img-021, 052, 086, 087, 088, 111, 135, 136). The stamp is burnt in.
- The over-edited sunsets (img-126, 127, 131, 132).
- Anything under 1200 px at a size above native (img-115 at 672 px, img-120 at 378 px).

### Atmosphere

None. The business has 70 big photographs of its own, and the wave is visible in them (img-009, img-102). Borrowed pictures of Coconut Point would risk the same mistake as vid-003: someone else's place shown as theirs.

### Words (`copy/en.json`)

- **Short headings worth setting large:** "By the beach", "On the roof", "The restaurant upstairs", "Inside the house", "The Eranga family home", "Six kinds of room", "Getting here".
- **`spot`** (135 characters) is the page's best surf line, and the host wrote it. **`season`** (108 characters) must sit beside it, so a reader links "Coconuts" and "Coconut Point" (review N3).
- **`tagline`** (91 characters) is too long for a hero subtitle (calibration: "very short"). The hero uses its own fragment, "Gurubebila, between Midigama and Weligama" (41 characters, words from the tagline). See §6.
- **`closing`** (88 characters): "Booking.com has the live dates and prices. If you'd rather ask something first, call us." It is the honest booking split, and every concept ends on it.
- **Testimonials:** twelve, 156–467 characters. Erin's ("a magical rooftop with unbeatable views of coconut beach"), Janno's ("the best breakfast we've had in recent years") and Chloe's (breaks, shacks, turtles) are the strongest. Meagan's and Mette's contain `\r\n`, which must render as a line break (N7).

### Numbers

- Booking.com **8.5/10, 142 reviews**. Google **4.8/5, 88 reviews** (the inn's own listing, `place_id ChIJI29C…`). Airbnb **4.44/5, 54 reviews**. All captured 2026-11-04.
- The restaurant's own Google rating is 4.6 from 39 (it lives in the copy body, not in `ratings[]`).
- Times: check-in from **13:00**, check-out until **11:00**, restaurant **7:30–22:00** daily.
- Six room types: 9, 12, 14, 15, 19 and 28 m², sleeping 1, 2, 2, 2, 3 and 4.
- Distances: Koggala Airport 11 km; Kumbalgama station about a 13-minute walk; Midigama station 1.4 km; Weligama centre 3.3 km; Plantations a 100 m walk up the beach.
- Hosting on Airbnb for 13 years.

**Never shown:**
- The "Coconut Beach" Google place's 4.8 from 120 reviews. It rates the beach, not the inn. The inn's own Google rating is also 4.8, but from **88** reviews and the inn's own listing: the designer must link that place id and print 88, never 120.
- No pool, gym or spa, and the light-well channel is never called a pool.
- No level claim next to the break: nothing about learning or beginners (review N4).
- No nightly price.
- No payment method.

### Gaps (and which ones to design around)

- **No photographs of anyone surfing, of the hosts, or of food.** This is the gap to design around. The surf is in img-009's whitewater, in the host's `spot` line and in the Rosa forecast. The hosts and the breakfast are in the guests' words.
- **No WhatsApp, no email.** The only direct channel is `tel:+94778921396`. Pitch point.
- **No website, no Instagram, no Facebook.** There is no Instagram section (calibration asks for one; it is omitted, not faked). Pitch point.
- **No season from the business.** The third-party guide's November–April appears only with attribution (`season`).
- **Breakfast is rate-dependent** (N9). The page never says "breakfast included" as a blanket line.
- **Three Google places for one business, three town names.** The page says "Gurubebila, between Midigama and Weligama" and names the Google listing exactly as the copy does ("Getting here" ¶3).

## 3. The page archetype for this business: **one stay, 13:00 to 11:00**

The page is a stay told by the clock:
- **13:00**, you check in and find your room (fan or A/C, said plainly), through the courtyard of palms and water.
- **The afternoon** is on the thatched roof.
- **At sunset** you are out on the green with everyone else.
- **Until 22:00**, the restaurant upstairs.
- **From 7:30**, the restaurant again, and the break in front of the door. This is where today's surf is.
- **11:00**, check-out, with the guests' words and the way here.

Only the four times the dossier holds are printed: 13:00 (`stay_info.check_in`), 22:00 and 7:30 (`restaurant_hours`), and 11:00 (`stay_info.check_out`). "The afternoon" and "Sunset" are interface labels with no clock time. No hour is invented.

It belongs to this business and to no other in the run:
- **Cheeky Monkey** is a *walk in off the main road*: horizontal, through a shop.
- **Lotus** is *the house, floor by floor*: vertical, through a garden house.
- **Coconut Surf Inn** is ordered by **time**, because what it sells changes with the hour. The roof and the green are about light and the hour. The restaurant has its own hours and a separate public life. The break is something you check in the morning.

Its photographs carry the clock: img-009 by day, img-102/103 under the afternoon thatch, img-008 at sunset, img-099 at night, img-105 by morning light.

impeccable mode: **Persuade**. The visitor succeeds when they tap through to Booking.com already knowing which kind of room they are booking (fan or A/C), or when they call first.

**The order, shared by all three concepts** (playbook §3; the audit's `offer_framing` governs 2–3):

1. **The first screen.**
2. **13:00, check-in: the booking section head.** In `recommended.above_fold` order:
   - what + where (`tagline`);
   - spot ("Coconuts is in front of the guesthouse", from `spot`);
   - included (what every stay has: the restaurant upstairs, the roof terrace, the board rack, from copy [4] ¶2 and `hoursNote`);
   - price ("Live dates and prices on Booking.com", the copy's `closing`);
   - trust (8.5/10 Booking.com, 142 reviews · 4.8/5 Google, 88 reviews · each "4 Nov 2026");
   - the primary action + Call.
3. **The rooms: "Six kinds of room".** Two groups, told apart in plain words: **fan rooms** (Budget Single, Budget Double: "Fan and mosquito net; no air conditioning and no hot water") and **A/C rooms** (Superior, Deluxe with Balcony, Deluxe 2 Adults + 1 Child, Deluxe Family: "Air conditioning, fan and hot water"). Each room has its gallery, beds, sleeps, m² and its own button. `stayInfo` sits as one " | " line under them.
4. **Inside the house:** the light-well and the verandas ("Inside the house").
5. **The afternoon: "On the roof".**
6. **Sunset: "By the beach"**, the green (copy [0] ¶2).
7. **Until 22:00: "The restaurant upstairs"**, with `hoursNote`, and **"The Eranga family home"** beside it (the hosts are met at the table, and the guests' words about the staff follow).
8. **From 7:30: the break.** `spot` + `season` set together, then the **Rosa forecast** for Coconuts (below), then the amenities as one " | " paragraph.
9. **11:00, check-out: guests' words.** Ratings with count, source and date (Booking.com, Google, Airbnb), and the twelve quotes.
10. **Getting here** (copy [6], address in Google's words, map as a designed button), then **closing** and the **footer**.

`recommended.above_fold` is the order of section 2's head and of the expanded phone bar. It is not crammed into the first screen.

**Taps to book: 1** in every concept. The hero button is a plain `<a href="https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html">`, so it works with JS off. Its label is the copy's `bookingLinks[0].label`, **"Check dates on Booking.com"**. The audit's `primary_label` ("See rooms and live dates on Booking.com", 39 characters) is the same action, but too long for a hero button under Shahar's calibration ("Book package now" is right). The audit's longer wording is used for the booking section's own button.

The persistent phone bar carries the same link plus a phone icon button (`tel:+94778921396`). No WhatsApp or email is shown, because neither is published.

### Forecast: **yes, in all three**, in section 8 ("From 7:30: the break")

The three conditions hold:
1. The business is `beach_lodging` and its dossier names its break. The host calls it "Coconuts … located in front of the guesthouse" (`break.evidence[0]`, Airbnb). The property's Booking Q&A says "coconut surf break ( 60m)" (`break.evidence[1]`).
2. Rosa has that spot.
3. The section is after the offers and never on the first screen.

**The dossier-spot → Rosa-spot mapping (checked live on 2026-11-05 against Rosa's `data/index.json`, the spot JSON and the human page):**

| | |
|---|---|
| Dossier spot | **Coconuts** (`break.name`; `location.spot`). The host's own name for the A-frame reef break in front of the house |
| **Rosa spot id** | **`weligama-west`** |
| Rosa spot name | **"Coconut"**, town Midigama, Sri Lanka, 5.9601, 80.4017. That is 141 m from the inn's Google pin (5.9606427, 80.4028521) and 165 m from Booking's pin |
| Spot JSON | `https://rosa-data-opal.vercel.app/data/spots/weligama-west.json`, 200; `spot.id = "weligama-west"`, `spot.name = "Coconut"`, `town = "Midigama"` |
| Human page (credit and fallback) | `https://rosa.surf/spot/weligama-west`, 200, titled "Coconut surf forecast - Midigama, Sri Lanka \| Rosa" |
| Widget | `https://rosa.surf/widget/?spot=weligama-west&theme=light&units=metric`, 200 |
| Schema seed | `forecast.enabled: true`, `forecast.rosaSpotId: "weligama-west"`, `forecast.spotName: "Coconuts"` (the host's name, matching `spot` on the page; Rosa's page says "Coconut", which a reader links at once) |

**Two traps, both checked. Neither id may be used:**
- **`coconut` does not exist on Rosa.** The spot JSON returns 404 and `rosa.surf/spot/coconut` returns 404. The harvester's note ("Rosa spot id 'coconut'") came from the spot's *name*, not its id.
- **`coconut-beach` is "Coconut Beach (Arugam)"**, in Pottuvil on the east coast, about 250 km away (6.8842, 81.8431). Its JSON loads with status 200 and would show another coast's surf under this inn's name. This is the nearest-other-spot error the rule exists to stop, in its worst form: the same name.

**Plantations** (the second break, 100 m up the beach) has no Rosa spot; the index has no "Plantation" in Sri Lanka. The block never says Plantations. Nothing else nearby (Kapparatota 691 m, Rams 1,046 m) is ever shown as this break.

Rosa's file on 2026-11-05 carries `generated_at` 2026-11-04T14:26Z. If that is still the newest copy at build time, the 24-hour rule shows the plain link "See today's forecast for Coconuts on Rosa", never stale numbers as current. At 4e the headline values are inlined from a fixture of this spot's JSON (the designer's `tools.md`), not from Kabalana's.

The **widget's theme is light** in all three concepts, because every ground is white or a cool near-white. Each concept draws the headline half in its own type and colour. **No level wording** ("for intermediates", "beginner-friendly") goes anywhere near the block (N4).

### Scroll set-piece

**Concept 3 only.** The material qualifies: 70 of the business's own photographs are ≥ 1920 px, so well over the eight required, though there is no video. The pattern is **sticky split (pattern 6)**, which no other business in the run uses (Cheeky Monkey: zoom-through, pattern 9; Lotus: none).

### Embeds

Rosa's widget only, in every concept. The map is a designed "Open in Google Maps" button to `contact.mapUrl`, never an iframe.

---

## 4. Three concepts

### Concept 1 · calm: **"The view from the roof"**

**The idea in one sentence.** A bright, quiet page that opens on the view from the roof over the green to Coconuts, and then tells the stay plainly by the clock, from check-in at 13:00 to check-out at 11:00.

**The one thing.** The view from the roof (img-009): palms over the open green, the beach shacks under a blue tarp, and the whitewater on the reef in front of the house. A guest would know it in a second (Erin: "a magical rooftop with unbeatable views of coconut beach"). It is used once, on the first screen, and nothing else on the page is as large.

**Structure.**

1. **Hero:** see the first screen.
2. **13:00, check-in.** White ground, one centred column 680 px wide.
   - Script title **"13:00, check-in"**.
   - `tagline` in the text face at 20 px.
   - One " | " details line: "Coconuts in front of the guesthouse | Restaurant upstairs, 7:30–22:00 | Roof terrace | Rack for your boards".
   - Two rating blocks side by side, each linking to its listing: "8.5/10 Booking.com | 142 reviews | 4 Nov 2026" and "4.8/5 Google | 88 reviews | 4 Nov 2026".
   - The accent button "See rooms and live dates on Booking.com" and a secondary **Call** button (ink outline, phone icon).
3. **The rooms: "Six kinds of room".** Tint ground.
   - The copy's offer body.
   - Then **two groups**, each opened by one plain line in the text face at 22 px, not a script title: **"Fan rooms: no air conditioning and no hot water"** and **"Rooms with air conditioning and hot water"**. These are interface labels; the facts are each room's `rooms[].note`.
   - Each room is a row: a **4:5 dot slideshow** (480 px wide, ≤ native) beside a text column (6/6), with the label, "beds | sleeps | m²", the full note, and "Check dates on Booking.com".
   - The A/C group comes **first**, because those are the rooms the photographs sell. The fan group follows, never hidden and never smaller in type.
   - Galleries:
     - Deluxe with Balcony: img-076, 073, 079, 068, 077, 074.
     - Superior: img-035, 034, 037, 030, 017, 064.
     - Deluxe 2 Adults + 1 Child: img-040, 036, 038, 053.
     - Deluxe Family: img-031, 045, 022, 027, 089.
     - Budget Double: img-047, 046, 048, 049.
     - Budget Single: img-056, 057, 059, 061.
   - Under the six: "Check-in from 13:00 | Check-out until 11:00", then `stayInfo.note`.
4. **Inside the house.** White, a 7/5 split.
   - Left: **img-007 at 3:2, container width ≤ 1600 CSS px**.
   - Right: script **"Inside the house"** and the copy.
   - Below the split, a 3-up row of 4:5 crops: img-006 (the light-well), img-030 (the veranda hammock and board), img-003 (the outdoor shower).
5. **The afternoon: "On the roof".** **img-103 full-bleed, 21:9 desktop / 4:5 phone**, with no text on it. Under it on white: the script title, the copy, and img-015 (the guest reading) as a 4:5 print, 360 px, beside img-101 (the swing over the sea) at 3:2. These are two photographs of different ratios, each at its own height in a two-column masonry (constraint 5).
6. **Sunset: "By the beach".** Tint ground.
   - The copy's two paragraphs in a narrow column with air (#10).
   - Beside them, **img-008 at 4:5**.
   - Under them, img-095 (turtle hatchlings with guests and locals) at 3:2, 640 px. The alt text says what it is; there is no caption.
7. **Until 22:00: "The restaurant upstairs".** White.
   - **A 3:2 dot slideshow at container width:** img-105, 106, 107, 104.
   - Beside it, the copy and the `hoursNote` line in the ink at 18 px.
   - Then **"The Eranga family home"** + the copy in a short column, with Meagan's quote about the kitchen staff set at 22 px under it.
8. **From 7:30: the break.** Tint ground.
   - Script title **"From 7:30, the break"**.
   - `spot` set large (28 px, text face), and `season` directly under it at 16 px with its attribution intact.
   - Then the **Rosa block** as a two-column row without dividing lines (calibration): left, the headline (the wave height now in the text face at 56 px, the time it is for, swell period and direction, wind speed and on/cross/offshore, all in the ink); right, Rosa's widget, light theme, at its fixed height. The credit line is "Forecast for Coconuts by Rosa".
   - Under the row, the amenities as one " | " paragraph with their notes.
9. **11:00, check-out: guests.** White.
   - Three rating blocks (Booking.com, Google, Airbnb), each with count and date.
   - One quote at a time, centred, in a dot slideshow, all twelve.
10. **Getting here.** Tint, two columns without rules.
    - Left: the copy's three paragraphs and the address in Google's words.
    - Right: "Open in Google Maps" and "Call" as designed buttons.
11. **Closing.** White. `closing` centred in the script at 40 px, then the accent button and Call.
12. **Footer.** Tint, three columns: name and address; contact buttons with icons; "Rooms on Booking.com" and "Airbnb" as buttons. No underlines, and no Instagram (there is none).

**The first screen.**

- **img-009 full-bleed, 100svh.**
  - Desktop: a 16:9 crop of the 1920×1440 original (1920×1080 native), taken from y 220 to 1300. The horizon sits on the lower third, and the palms and the green fill the bottom.
  - Phone: a 4:5 crop (1152×1440) **that pans once**: it starts on the left palms and the green and travels slowly right to the shacks and the whitewater (see Motion). It rests on the centre-right, where the reef is.
- The grade is a light lift of the shadows under the palms (+5%), with no tint.
- **Header over it:** wordmark "Coconut Surf Inn" left; "Rooms | The roof | The break" + a small accent button right (phone: wordmark + phone icon).
- **Centred horizontally and vertically, in the big pale sky:** **"Coconut Surf Inn"** in Satisfy at 60 px desktop / 42 px phone, in white with a soft 24 px shadow at 20%. Under it, "Gurubebila, between Midigama and Weligama" in the text face at 17 px. Then the accent button **"Check dates on Booking.com"**.
- The sky there is light (`#CADAE6` on the right). White text over it may not reach 4.5:1, so the designer checks the pixels. If it fails, a soft radial shade of 22% ink sits behind the three lines only, sized to them, or the title is set in the ink on the sky instead. Neither is an overlay on the whole photo.
- **Rating: with the booking head and the guests, not in the hero** (calibration: never tagline + rating + button over the media). The view is this page's first promise; the numbers come one scroll later, in the audit's order.

**Why it beats what we already have.** There is no website. The comparison is what a visitor reaches today, plus the gold bar (Global Surf `postcard` / `the-sign`).

What a visitor reaches today:
- The Google listing fold (`funnel/walk/01-google-listing-fold.png`): a map, "Coconut Surf Inn Guest House and Restaurant", and a dim entrance-hall photo.
- The Booking.com fold (`05-booking-com-fold.png`): "Beachfront", the entrance hall in a 1/45 carousel, "Choose dates to see prices" on yellow.
- The Airbnb fold (`06-airbnb-fold.png`): a dark bedroom, 1/29.

None of them shows the sea. This first screen is the sea, the green and the reef from the house's own roof, with one title and one button. Against the gold bar, it meets the same discipline (one short title, one short subtitle, one button, the business's best media, unobstructed). Where Global Surf has its own lodge footage, this has a 1920 px photograph that pans once like a turning head.

**Colour** (sampled; crops `w:h:x:y` in original px).

| role | hex | asset | what it is |
|---|---|---|---|
| ground | `#FFFFFF` | img-009 | white paper |
| tint ground | `#EEF2F7` | img-009 | the pale sky over the right-hand palms, `#CADAE6` (`200:150:1400:250`), lifted near white. A cool sky-white, not cream |
| ink | `#273326` | img-009 | the deep shade under the bushes behind the beach (`40:20:1000:1035`). 13.2:1 on white, 11.8:1 on the tint |
| place colour | `#6B93CC` | img-009 | the blue sky over the left palms (`200:150:100:100`). Used only for the slideshow's active dot and the line icons. Never text (3.2:1) |
| **booking accent** | **`#48660B`** | **img-009** | **the banana leaf in sun at the bottom of the view** (`16:16:532:1290`). White text 6.6:1. Used only for booking actions |

A green booking colour is the coconut-and-banana country this house names itself after. In this run it is free: Lotus ships brick red, and Cheeky Monkey ships blue. It is a living leaf green, not a muted sage or olive (default-look list): the designer keeps the sampled saturation and never greys it. It would look wrong beside a cream ground (it turns khaki) and beside the sunset oranges of img-008, which is why img-008 sits on the tint and never touches a button.

**Type.** **Onest** (400/600) for everything people read and every control. It is a clean contemporary grotesk with open apertures and tabular figures, so "8.5/10", "13:00" and "28 m²" align in the rooms and the forecast headline. **Satisfy** for section titles only (36–60 px). It is a relaxed brush script with an easy slope, the hand-lettered register of the inn's own sign (img-002, "Coconut Surf inn" in a casual pen hand), and it is readable at title size; each title word ("13:00, check-in", "On the roof", "From 7:30, the break") is checked at size. Two families, Latin subset, about 70 KB. Neither is on the default-look list, in gold, or in any other concept in this run.

**Motion.** Micro only, no canvas (calm).

- **Hero media:** on phones and narrow screens the img-009 crop pans once, from the left third to the centre-right (≈ 520 px of the original, 14 s, ease-in-out, transform only), and then stays still. It never loops. On desktop the 16:9 crop has no room to pan, so it settles once from scale 1.02 to 1 over 1.4 s. There is no title reveal.
- Buttons press to 0.97 over 120 ms.
- Slideshows slide 350 ms, and the dot stretches to a short bar in the sky blue.
- The phone bar slides up (240 ms) once the hero leaves view.
- The quotes cross-fade at 300 ms.
- The forecast headline's numbers fade in once their JSON arrives (200 ms), with their boxes reserved.

`prefers-reduced-motion`: no pan, no settle; the slides cut. JS off: the slideshows become scroll-snap rows, the bar is static at the foot, the forecast shows its plain link, and every booking link works.

**The booking pattern.** Morgan's Rock's one action per offer and its persistent bar (#4, #7, #15), plus Kube's full-width button at the bottom of the hero on phones (#4).

- Every room has its own "Check dates on Booking.com". Booking.com cannot preselect a room type from a URL, so all go to the listing.
- The phone bar: accent "Check dates on Booking.com" (75%) + a phone icon button (25%).
- One accent colour (#6). Nothing covers content on load (#20). Taps: hero → Booking.com = **1**.

**Photographs.** img-009 (hero, once); the room galleries above (4:5, ≤ native); img-007, 006, 030, 003 (inside); img-103 (21:9 band), img-015, img-101 (roof); img-008, img-095 (sunset); img-105, 106, 107, 104 (restaurant). Nothing is shown wider than its source, and nothing is captioned.

First load (phone): HTML+CSS ≈ 45 KB, fonts ≈ 70 KB, hero AVIF (a 1152×1440 crop shown at 828 w on a phone) ≈ 160 KB, JS ≈ 8 KB, so **≈ 0.3 MB**. The Rosa widget and JSON load only near section 8.

**Forecast:** yes, in section 8, light widget, headline in Onest and the ink (§3). **Scroll set-piece:** no (calm never carries one).

**What would make this concept fail.** img-009 is a phone photograph with wires and a tin roof in the foreground. If the 16:9 crop keeps them, the hero reads as a snapshot. The crop must cut above the shack roof on desktop, and the phone pan must end on the reef, not on the tuk-tuks.

---

### Concept 2 · interactive: **"Under the thatch"**

**The idea in one sentence.** The page opens under the roof terrace's thatch, looking out to sea, and the picture has real depth. The fringe, pillars and swing frame shift against the horizon as you move, as if you had just stepped onto the roof. Further down, one tap tells you which rooms have a fan and which have A/C.

**The one thing.** The thatched roof terrace (img-102, img-103): the hanging fringe of the thatch across the top of the frame, the timber pillars, and the sea between them. Nothing else on the page moves the way it does.

**Structure.**

1. **Hero:** see the first screen.
2. **13:00, check-in: the at-a-glance row.** White.
   - A **4-up row of compact facts with small line icons**, in the audit's order: "Coconuts in front of the guesthouse" | "Restaurant upstairs, 7:30–22:00" | "Live dates and prices on Booking.com" | "8.5/10 Booking.com, 142 · 4.8/5 Google, 88 · 4 Nov 2026".
   - The accent button and Call below.
   - Phone: a 2×2 grid.
3. **"How do you like to sleep?" (the booking section).** Tint ground.
   - Script title, then **three big tile buttons** (#2):
     - **"A fan and cold water"**: the two budget rooms.
     - **"Air conditioning and hot water"**: the four A/C rooms.
     - **"Three or four of us"**: Deluxe 2 Adults + 1 Child and Deluxe Family, from `rooms[].sleeps`.
   - The stage below changes in place, at a fixed height so nothing jumps. It shows the matching rooms as a **list + stage room viewer**: room names as chips (phone) or a list (desktop, left 4 columns); the selected room's gallery on a 4:3 stage with dots (right 8 columns); and under the stage, "beds | sleeps | m²", the full `rooms[].note` with **"Fan" / "A/C" / "Hot water" chips**, and "Check dates on Booking.com".
   - The first tile is open by default ("Air conditioning and hot water").
   - JS off: the three groups stack with anchors.
4. **Inside the house.** White.
   - **img-007** at 3:2, 7 columns, beside the copy.
   - Under it, a **swipe row with next-card peek** (#14) of the verandas, all 4:5: img-030, img-017, img-024, img-020, img-005, img-016 (boards against the wall).
5. **The afternoon: "On the roof".** White.
   - **img-104** (benches under the thatch, sea view) at 16:9 container width, with the copy beside it on desktop (5/7).
   - Then a 3-photo dot slideshow: img-100, img-101, img-015.
6. **Sunset: "By the beach".** **img-008 full-bleed band**, 16:9 desktop / 4:5 phone, with no text on it. Under it on the tint, the copy and img-095 as a 3:2 print.
7. **Until 22:00: "The restaurant upstairs".** White.
   - A 7/5 split: img-106 (the purple benches and saffron cushions) at 4:5 left.
   - Right: the copy, the `hoursNote` line, and Janno's "best breakfast" quote at 22 px.
   - Under it, **img-099** (the house lit at night) at **21:9 container width**: a picture, not a panel; no text on it.
   - Then "The Eranga family home" + the copy.
8. **From 7:30: the break.** Tint ground.
   - Script **"From 7:30, the break"**.
   - Then a **two-column row**: left, `spot` (26 px) + `season` (16 px), and the Rosa headline below them (the height now at 52 px in the place purple, plus time, swell and wind in the text face); right, Rosa's widget, light theme.
   - Credit: "Forecast for Coconuts by Rosa".
   - The amenities follow as one " | " paragraph.
9. **11:00, check-out: guests.** White.
   - Three big rating figures (digits roll once on first view, 400 ms).
   - Then a **swipe row with peek** of the twelve quotes: cards 320 px wide with first name, country, month and source.
10. **Getting here.** Tint: the copy, a " | " distances line, "Open in Google Maps" + "Call" buttons.
11. **Closing** (white: `closing` in the script, the accent button and Call) and the **footer**.

**The first screen.**

- **img-102 full-bleed, 100svh.**
  - Desktop: a 16:9 crop of the 1920×1440 original (1920×1080 native) that keeps the full thatch fringe across the top, the left pillar, and the swing frame right of centre against the sea.
  - Phone: a 4:5 crop (1152×1440) centred on the gap between the pillar and the swing, with the fringe across the top and the sea on the upper third.
- **The main item: a WebGL depth parallax on the photograph itself.**
  - One full-screen quad, the photo as one texture, and a **hand-painted depth map** (five grey levels: the thatch fringe and the pillars nearest; then the parapet, plants and swing frame; then the terrace floor; then the palms; then the sea and sky farthest). The depth map is painted from the photo as a committed recipe with a `# media:` header, not generated.
  - Pointer movement (desktop) or device tilt (phone, only after a tap grants motion permission) moves the virtual eye by at most ±10 px at the near layer and 0 at the horizon.
  - Without input, it drifts once on load (±4 px over 6 s, ease-in-out) and then rests.
  - Nothing is added to the picture: no particles, no reflections, no overlay (calibration: the Global Surf "waterline"). Only the existing layers move against each other.
- **Header over it:** wordmark left; "Rooms | The roof | The break" + a small accent button right.
- **Centred horizontally and vertically:** **"Coconut Surf Inn"** in Shadows Into Light Two at 58 px desktop / 40 px phone, in white, then "Gurubebila, between Midigama and Weligama" at 17 px, then the accent button **"Check dates on Booking.com"**. The text sits over the shaded terrace floor and the under-thatch shadow, which is dark enough for ≥ 4.5:1; the designer checks the pixels.
- **Rating: in section 2, beside the booking action**, where it decides something. It is not in the hero (calibration).

**Why it beats what we already have.** The listings open on an empty entrance hall (Booking.com, Google) or a dark bedroom (Airbnb). The gold bar here is Global Surf `try-your-week`, whose hero is the lodge's own moving footage. Coconut Surf Inn has no footage. This first screen gives it the thing that page has, **a place you are standing in**, made from its own 1920 px photograph. One scroll later, the three tiles answer in one tap the question the listings get wrong (which rooms have A/C, audit F5).

**Colour.**

| role | hex | asset | what it is |
|---|---|---|---|
| ground | `#FFFFFF` | img-102 | white paper |
| tint ground | `#F0F3F6` | img-102 | the hazy sky over the sea, seen under the thatch, `#A4B7C3` (`200:80:1450:420`), lifted near white |
| ink | `#302618` | img-102 | the underside of the thatch (`30:10:600:140`). 14.8:1 on white, 13.3:1 on the tint |
| place colour | `#433E50` | img-106 | the restaurant's purple bench cushions (`300:120:1300:1220`). Script titles and the forecast's big number, 10.3:1 on white |
| **booking accent** | **`#A1591B`** | **img-106** | **the saffron cushion on the restaurant bench** (point sample `20:20:680:790`). White text 5.3:1 (4.8:1 on the tint). Used only for booking actions |

Saffron and aubergine are the restaurant's own cushions. The saffron is a clean, saturated orange on a **cool** white, never on cream or sand, so it does not go muddy (house rule 4). White text sits on it, never black or blue (calibration). It would look wrong beside Lotus's brick red and beside the green of concept 1, which is why each concept keeps its own. Next to a terracotta or sand ground it would read 2010s; the grounds here are sky-white.

**Type.** **Nunito Sans** (400/700) for reading and every control. Its soft, rounded terminals sit with the cushions and the thatch, it is open and very readable at 16 px, and its figures are clear in "7:30–22:00". **Shadows Into Light Two** for section titles only (34–58 px). It is an airy, loose handwriting whose long, slightly ragged strokes have the hang of a thatch fringe, and it is readable at title size; each title word is checked. Two families, about 75 KB.

**Motion.** **Main item: the depth-parallax shader on img-102.** Raw WebGL, one quad, two textures (the photo plus a 256×192 depth map), about 7 KB of JS. It starts after first paint, with the photo `<img>` as the LCP under it, and pauses off-screen and when the tab is hidden.

Micro-animations through the page:
- The three sleep tiles lift 2 px with their shadow on hover (`pointer: fine`), and the chosen tile fills with the accent (180 ms).
- The stage cross-fades with an 8 px rise (220 ms). The room chips slide a pill (260 ms, ease-out-quint).
- The verandas and quotes rows drag with momentum and rubber-band at their ends.
- The rating digits roll once.
- The forecast's height number counts up from 0 once its JSON arrives (300 ms; with reduced motion it simply appears).
- Buttons press to 0.97. The accent button lifts 2 px on hover.
- No heading reveals, no parallax on scroll.

`prefers-reduced-motion` / Save-Data / no WebGL / weak device (first frames > 20 ms): the still photograph, unchanged. JS off: the room groups stacked, the rows as native scroll-snap, every link live.

**The booking pattern.** **Tile-tap inside the page** (White Desert, #2; with #7: each room carries its facts and its own action). The visitor chooses how they sleep, then a room, and sees its plain facts and "Check dates on Booking.com".
- The hero and the phone bar bypass it: taps = **1**.
- The phone bar shows the accent "Check dates on Booking.com" + a phone icon button, and it expands (tap ˄) into the audit-ordered summary of section 2.
- The booking UI JS (≈ 10 KB) loads on first interaction (#5).

**Photographs.** img-102 (hero + depth map); room galleries as in concept 1; img-007, 030, 017, 024, 020, 005, 016 (inside); img-104, 100, 101, 015 (roof); img-008 (band), img-095 (sunset); img-106, img-099 (restaurant).

First load (phone): hero AVIF ≈ 170 KB + depth map ≈ 8 KB + shader 7 KB + fonts 75 KB + HTML/CSS 50 KB, so **≈ 0.33 MB**.

**Forecast:** yes, in section 8, light widget; the headline's big number is in the place purple (§3). **Scroll set-piece:** no (concepts 1 and 2 never carry one).

**What would make this concept fail.** A depth map painted around a thatch fringe can tear: fringe fibres smear against the sky when the eye moves. If it shows at ±10 px, the amplitude drops to ±5. If it still shows, the still ships. The test is that a viewer thinks the photo was taken in 3D, not that it wobbles.

---

### Concept 3 · unique: **"Round the clock"**

**The idea in one sentence.** The page opens with the house's view dissolving upward into the white page, as if the page were the sky over Coconuts. Its middle is the stay itself: you scroll, and one pinned window turns from the afternoon on the roof to the sunset on the green, the house lit at night, the restaurant at 7:30 and the break. The sun from the inn's sign marks the hour as it goes.

**The one thing.** **The sun on the sign** (img-002): the round orange disc with the coconut palm in front of it, the inn's own mark. It appears in exactly three places (#28):
1. The booking accent's colour.
2. The set-piece's hour marker, a small filled disc that travels down the clock column.
3. The round Call button.

Nothing else on the page is round and orange.

**Structure.**

1. **Hero:** see the first screen.
2. **13:00, check-in.** White.
   - Set as **a short paragraph of facts** in the text face at 22 px with the figures in the ink, in the audit's order. It uses the copy's own sentences: the `tagline`, the first sentence of `spot`, the `hoursNote`, and the `closing`'s first sentence.
   - Then three dated rating blocks in one row, the accent button, and Call.
3. **The rooms: "Six kinds of room".** Tint ground.
   - Desktop: the six rooms as **3:2 dot slideshows, two per row**, A/C rooms first. Each slideshow has its text and "Check dates on Booking.com" under it, and **a "Fan" or "A/C | Hot water" chip printed on the photo's lower-left corner**: interface text, not a caption.
   - The fan rooms' weak photographs are 4:5 crops at ≤ native inside the same frames, letterboxed on the tint, never stretched.
   - Phone: one column.
4. **Inside the house.** White. A **true masonry** of the house at its own ratios, all ≤ native: img-006, img-007, img-011, img-030, img-019, img-016. "Inside the house" and the copy sit in a narrow text column with air beside it (#10).
5. **The stay, round the clock: the scroll set-piece** (sticky split, pattern 6). See "Scroll set-piece" for the frames and the mechanics. This one section carries the page's afternoon, sunset, night and morning:
   - **The afternoon: "On the roof"** (copy, plus Erin's rooftop quote),
   - **Sunset: "By the beach"** (copy),
   - **Until 22:00: "The restaurant upstairs"** (copy + `hoursNote`),
   - **From 7:30**: "The Eranga family home" (copy) + Janno's breakfast quote,
   - **The break**: `spot` + `season`.
   The **Rosa block** follows directly after the pin (section 6), so the pin's last frame hands straight to today's surf.
6. **Today on Coconuts: the forecast.** White, a two-column row with no rules: the headline left (the height now in the text face at 64 px, in the ink, with time, swell and wind under it), Rosa's widget right, light theme. Credit "Forecast for Coconuts by Rosa". The amenities follow as one " | " paragraph.
7. **11:00, check-out: guests.** Tint. One large quote at a time in the text face at 26 px, with dots, and the three ratings above.
8. **Getting here.** White. img-002 (the sign) as a **matted print**, 4:3, 420 px (#9), left. Right: "Getting here", the copy, the address, and the map + Call buttons.
9. **Closing** (`closing` in the script, the accent button, the round Call button) and the **footer**.

**The first screen.**

- **img-009 fills the viewport, but its sky becomes the page.** The upper ≈ 40% of the photograph fades into the white ground through a soft vertical mask. The sky in img-009 is already pale toward the right (`#CADAE6`), so the dissolve is short. The palm crowns stand up into white, and the green, the shacks and the whitewater are untouched, full-bleed below.
  - Desktop: a 16:9 crop from y 260; the mask covers y 0–40%.
  - Phone: a 9:16 crop centred on the reef and the tall palms, the mask over the top 45%.
  - The photograph itself is not altered: no colour, no sky replacement, only a fade to the page's white.
- **In that white, centred,** in the ink: **"Coconut Surf Inn"** in Caveat at 64 px desktop / 44 px phone, then "Gurubebila, between Midigama and Weligama" at 17 px, then the vermilion button **"Check dates on Booking.com"**. The text sits on white, so contrast is certain, with no shade and no shadow.
- Header on white: wordmark left; "Rooms | The stay | The break" right with a small accent button.
- **Rating: with the guests.** This first screen's promise is the view and the light; the numbers come in section 2 in the audit's order.

**Why it beats what we already have.** Against the listings (an entrance hall, a dark bedroom, a map), it opens on the sea and the reef from the house. Against the gold bar, it takes the method of `the-lavish-haven.html` (the place's own picture held on a white page with type on white; #27, #28) but none of its form: Lavish draws a cut-corner pool, while this uses an untouched photograph whose sky simply becomes the page. It also has a set-piece in the middle that tells, in five of the business's own 1920 px photographs, what no listing says: what a day here is like.

**Colour.**

| role | hex | asset | what it is |
|---|---|---|---|
| ground | `#FFFFFF` | img-009 | the white the sky dissolves into |
| tint ground | `#F1F1F3` | img-002 | the grey concrete wall the sign hangs on, `#AAA8B7` in light (`40:10:680:630`), lifted near white |
| ink | `#252323` | img-002 | the black palm silhouette on the sign (`8:8:686:420`). About 15.6:1 on white. Text ink on a white page, not a near-black page |
| place colour | `#4D6F7A` | img-009 | the sea near the shore (`100:30:300:1000`). Used only for the set-piece's clock line and the forecast's icons. 5.4:1, so it may carry the times |
| **booking accent** | **`#BE4532`** | **img-002** | **the orange sun on the inn's sign.** Sampled `#CD4E38` (`40:40:790:470`); white text on it is 4.4:1, so the button is the same hue at lower lightness, `#BE4532` (5.1:1). Used only for booking actions, the hour marker and the round Call button |

The sign's sun is the brand's own colour, which is the reason for it. It is a clean vermilion on a cool white, not a muted terracotta on cream (default-look list). **One closeness to report:** Lotus Surf House, already shipped in this run, uses a brick red `#B8431C` for booking. The two hues are 7° apart. This concept keeps it because it is the client's own mark. There is no contrast-safe way to push the two apart while keeping the sign's own orange: ink on the sampled `#CD4E38` is only 3.5:1, and calibration forbids dark text on orange anyway. If Shahar or Alon pick this concept and judge the two too alike across the run, the fallback is concept 1's banana-leaf green as the booking colour, with the sun disc kept for the hour marker and the Call button only. That is a call for the human at 4f, not a reason to drop the brand colour now.

**Type.** **Red Hat Text** (400/500) for reading and every control: compact, warm and clear, with good figures for "13:00", "7:30–22:00" and the forecast numbers. **Caveat** for section titles only (36–64 px). The inn's sign spells "Coconut Surf inn" in a casual, rounded pen hand with an upright, slightly bouncing baseline, and Caveat is that hand, readable at title size; each title word is checked. Two families, about 80 KB. Neither is on the default-look list, in gold, or elsewhere in this run.

**Motion.** **Main item: the scroll set-piece, rendered in WebGL.** Each frame change is a **horizon wipe**: the next photograph is revealed along a soft band that travels from the horizon outward, aligned on each photograph's horizon through its `focalY` (schema v0.10, set by the owner's click, never hard-coded). This is about 9 KB of raw WebGL. With no WebGL, the same frames cross-fade in CSS.

Micro-animations through the page:
- The hour marker (the sign's sun disc) eases down the clock line as each time is reached, with a spring and no overshoot over 3%.
- The booking button's fill grows from its left edge on press (160 ms).
- Slideshow dots stretch; masonry photos lift 4 px on hover (`pointer: fine`).
- The quote cross-fades.
- The hero's dissolve does not move.
- No heading reveals.

Fallbacks:
- **`prefers-reduced-motion`:** no pin. The five moments render as five stacked blocks, each with its photograph above its text and the time as its title.
- **No WebGL:** CSS cross-fades inside the pin.
- **JS off:** the stacked blocks, as with reduced motion, and every link works.
- **Weak phone:** the pin shortens to 60 svh per frame with plain cross-fades.

**The booking pattern.** **An in-page overlay (Kube, #1 third model)**, opened by the phone bar's second button **"Find your room"** and by a "Find your room" button in section 3. The page and its photograph stay visible behind a centred card (desktop 520 px; phone, a full-width sheet from the bottom).

- **Step 1** is four tiles (#2): **"1", "2", "3", "4"**: how many are coming (from `rooms[].sleeps`), plus a fifth, "Not sure".
- **Step 2** lists only the rooms that sleep that many, each with its Fan or A/C | Hot water chip and "Check dates on Booking.com". "Not sure" shows `closing` and the round **Call** button.
- It has a real `/rooms/` URL so it works without JS.
- It traps and returns focus, and Esc closes it.
- **The hero button bypasses it: 1 tap** to Booking.com.
- The phone bar: vermilion "Check dates on Booking.com" + "Find your room".
- The overlay JS loads on first interaction (#5).

This differs from the run's other overlays: Cheeky's right drawer and Lotus's slide-down panel.

**Photographs.** img-009 (hero, masked); room galleries as in concept 1; img-006, 007, 011, 030, 019, 016 (masonry); the set-piece frames img-103, 008, 099, 105, 009; img-002 (print). Nothing above native, and nothing captioned.

First load (phone): hero AVIF (9:16 crop, 828 w) ≈ 150 KB + fonts 80 KB + HTML/CSS 50 KB + JS before paint 8 KB, so **≈ 0.29 MB**. After paint: GSAP + ScrollTrigger ≈ 45 KB, Lenis ≈ 4 KB, the shader ≈ 9 KB. The set-piece frames load as the pin approaches (5 × ≈ 180 KB AVIF at 1280 w), never on first load.

**Forecast:** yes, its own section directly after the set-piece (§3), light widget, headline in Red Hat Text and the ink.

**Scroll set-piece: yes. Sticky split (pattern 6), "Round the clock".**
- **Material:** five of the business's own photographs, each 1920 px wide.
  - img-103: the afternoon under the thatch.
  - img-008: the sunset palms.
  - img-099: the house lit at night.
  - img-105: the restaurant by morning light.
  - img-009: the view to the break. It closes the sequence back on the hero's view, now in full colour with its sky intact.
- **Desktop:** the media is pinned in the right 7 columns, full height. The text column (5 columns, white) scrolls through five blocks, each opened by its time or moment in Caveat ("The afternoon", "Sunset", "Until 22:00", "From 7:30", "The break") with the clock line and the moving sun disc at its left edge.
- **Length:** 90 vh per block, about **450 vh** pinned. That is within the playbook's ≤ 15 vh-equivalents per page, and the page's only pin.
- **Phone:** the media is pinned in the top 52 svh and the text blocks scroll beneath it, 80 svh each.
- **Booking during the pin:** the phone bar stays visible, so booking is never more than one tap away, and rooms are one tap away (header "Rooms").
- **No text over changing pixels:** the text is always on white (scroll playbook rule 9).
- **Exit:** at the end the pinned frame is hidden (`autoAlpha: 0`) as the forecast section arrives, so it leaves no slab.
- **Reduced motion, no WebGL, weak phone:** as under Motion. The poster for a weak phone is each frame's own still.

**What would make this concept fail.** The sky dissolve can look like a fogged photograph instead of a page that becomes the sky, if the mask ends on a dark patch or cuts a palm crown. The mask must end in the pale part of the sky, under the palm tops, and the critics must read the first screen as the photograph and not as an effect. If not, the hero falls back to concept 1's full-bleed crop, and the set-piece carries the concept.

---

## 5. Divergence table

The run has three businesses concepted: Cheeky Monkey (`sites/cheeky-monkey/concepts.md`, picked **3 · unique**, then reworked to a drone-loop hero from vid-001 under Alon's preview waiver), Lotus Surf House (`sites/lotus-surf-house/concepts.md`, picked **1 · calm "The gate"**), and Coconut Surf Inn. Concepts from other runs are not part of this run's divergence (base.md 0.3.0).

None of the Coconut rows reuses a gold first-screen form, palette or face:
- Global Surf: a lodge clip with a centred serif or script title and a coral button.
- KA: cut-paper leaves over type.
- Layday: a drawn berth.
- Lavish: a drawn cut-corner pool window.

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern | scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| Cheeky Monkey | 1 · calm "The signboard" | walk in off the main road | img-147 full-bleed photograph (board noses framing the main road), "Catch waves, not worries" in Yellowtail + red-fin button | centred container; package tabs; stacked full-width room slideshows; 7/5 shop split with img-122 | `#FFFFFF` + `#EEF1F2` (img-122 wall) | micro only: tab pill, dots, in-view portrait clip | per-offer buttons + persistent phone bar (Morgan's Rock) | — |
| Cheeky Monkey | 2 · interactive "The wall of boards" | same | vid-009 full-bleed 9:16 on phone / three-column triptych of the same reel on desktop, `businessName` in Knewave + magenta button | one segmented "Plan your stay" panel; list + stage room viewer; full-bleed drag strip | `#FFFFFF` + `#EAF3F5` (img-096 mint) | triptych cut, sliding pill, rolling digits, momentum drag, crossfades | inline panel with tiles, optional date params, tel/mailto | — |
| Cheeky Monkey | 3 · unique "Pick your board" (**picked**; hero later reworked to a vid-001 drone loop) | same | vid-009 inside one centred board-shaped WebGL window on white, `featureLine` in Permanent Marker + blue-fin button | portrait package cards with board crops; 2-up room slideshows; masonry shop | `#FFFFFF` + `#FDF1F2` (img-134 sky) | resin-gloss shader, card tilt, board-mask zoom | right drawer / full sheet with a `/plan/` URL; hero bypasses it | image zoom-through (pattern 9) |
| Lotus Surf House | 1 · calm "The gate" (**picked**) | the house, floor by floor | desktop 6/6 split: img-019 (carved gate, portrait) full-height right half, name in Parisienne + red-oxide button on white left; phone: img-019 full-bleed portrait | centred 640 px column; stacked 6/6 room rows with 4:5 slideshows; 5/7 porch split; 3-up roof row | `#FFFFFF` + `#F0EDEE` (img-019 path stone) | micro only: one photo settle, dots, bar slide-up, cross-fades | per-room buttons + Kube bottom-of-hero bar → sticky phone bar with tel icon | — |
| Lotus Surf House | 2 · interactive "Dappled" | same | img-020 garden full-bleed with a WebGL shader moving the photo's own sunlight; Patrick Hand title + table-blue button | 4-up fact row; Garden / Upstairs / Roof floor switch with room tiles; 7/5 garden split; quote swipe row | `#FFFFFF` + `#E1E1E4` (img-020 sky) | light-drift shader, sliding floor pill, tile springs, rolling digits, momentum drag | tile-tap floor → room inside the page | — |
| Lotus Surf House | 3 · unique "Under the net" | same | white page: a WebGL cloth mosquito net over a portrait print of the balcony view (img-025); Allura title, violet button | stepped three-row "house section" on 12 columns; 2-up slideshow pair; masonry; offset roof pair | `#FFFFFF` + `#E1F2FD` (img-025 sky) | cloth sim, hem-sag button, damped slide-down panel | slide-down panel from the top (Tandjung Sari) with tiles incl. "Not sure" | — |
| **Coconut Surf Inn** | 1 · calm "The view from the roof" | **one stay, 13:00 to 11:00** | **img-009 (the view from the roof over the green to the reef) full-bleed landscape; on phones a one-time pan along the beach; name in Satisfy centred in the sky + banana-leaf green button** | centred 680 px column; rooms in two plain groups (A/C, fan) as 6/6 rows with 4:5 slideshows; 7/5 courtyard split; full-bleed roof band; 2-column masonry | `#FFFFFF` + `#EEF2F7` (img-009 sky) | micro only: one phone pan, dots, bar slide-up, cross-fades, forecast fade-in | per-room buttons + Kube bottom-of-hero bar → sticky phone bar with tel icon | — |
| **Coconut Surf Inn** | 2 · interactive "Under the thatch" | same | **img-102 (under the thatched roof, looking out to sea) full-bleed with a WebGL depth parallax from a hand-painted depth map; Shadows Into Light Two title + saffron button** | 4-up fact row; "How do you like to sleep?" tiles (fan / A/C / 3–4 people) → list + stage viewer; veranda swipe row; full-bleed sunset band | `#FFFFFF` + `#F0F3F6` (img-102 sea haze) | depth parallax on pointer/tilt, tile lift, pill slide, rolling digits, count-up forecast, momentum drag | tile-tap by how you sleep, inside the page | — |
| **Coconut Surf Inn** | 3 · unique "Round the clock" | same | **img-009 whose sky dissolves into the white page; Caveat title, line and vermilion (sign's sun) button set on the white "sky"** | prose fact paragraph; 2-up room slideshows with Fan / A/C chips; true masonry of the house; 450 vh sticky split; forecast row | `#FFFFFF` + `#F1F1F3` (img-002 wall) | WebGL horizon wipe between frames, the sign's sun disc as hour marker, press-fill button | Kube in-page overlay: tiles 1 / 2 / 3 / 4 / Not sure → rooms that sleep that many; `/rooms/` URL; hero bypasses it | **sticky split (pattern 6): five own 1920 px frames, afternoon → break** |

**No two rows share archetype + first-screen device.** The archetypes differ: a road, a house by floors, a stay by the clock. Setting that aside, the nine first screens are nine different devices. Coconut's calm and Cheeky's calm are both a full-bleed landscape photograph with a centred script title. That is the calibrated Shahar form for strong material, and it is allowed by hard constraint 2. They do not look interchangeable once you squint: a street through board noses under a red button, against a sky-and-sea view under a green one, with a pan on phones.

**Set-pieces:** Cheeky has image zoom-through (pattern 9) and Coconut has sticky split (pattern 6). Nothing is shared.

**Booking accents across the run:**
- Cheeky: red fin, magenta, blue fin.
- Lotus: brick red-oxide, table blue, violet.
- Coconut: banana-leaf green, saffron, the sign's vermilion.

The vermilion's 7° closeness to Lotus's shipped brick is reported under concept 3.

**Type pairs:** no face is shared across the run.

**What a visitor would notice is different:**
- **From Cheeky Monkey:** Cheeky is loud surf colour, painted-sign lettering, boards and a road, and you walk *along* a shop. Coconut Surf Inn opens on open sky, sea and a green from a roof, and you move *through a day*. No surfboard leads anything, and its colours are leaf green, saffron cushions and a sign's sun.
- **From Lotus Surf House:** Lotus is inward and shaded (a carved gate, a garden, a net over a bed) and climbs *up* a house floor by floor. Coconut is outward and bright, looking over the green to the reef. It is ordered by the hour, not the floor, and it is the only site in the run that names its own break and carries that break's forecast as its own.

## 6. For the copywriter, the deployer and Shahar (gaps the concepts hit)

- **Schema gap: a short hero subtitle.** This is the third business in the run to hit it. `tagline` (91 characters) is too long for the hero calibration, so every concept uses the name + "Gurubebila, between Midigama and Weligama", a fragment of the tagline's own words. Proposal, as for Cheeky Monkey and Lotus: an optional `heroLine` (≤ 50 characters).
- **Schema gap: room galleries.** `rooms[].photo` holds one photo, but all three concepts sell each room with 4–6 photos, the last one its bathroom (calibration; the room-type clarity gap). This is the third business to need `rooms[].photos[]` (≤ 8).
- **Schema gap: room groups.** The fan vs A/C split is this page's most important booking fact (audit F5). Today it lives only in the free text of `rooms[].note`, and a template must not parse prose. Lotus proposed `rooms[].group` for floors; the same field (owner-named, ≤ 40 characters, e.g. "Fan rooms" / "Air-conditioned") serves here. Concepts 2 and 3 also need machine-readable **features** for the chips ("Fan", "A/C", "Hot water"). Proposal: an optional `rooms[].features` select-many (`fan` | `ac` | `hot_water` | `balcony`). Until either exists, the mockup hard-wires the grouping and the deployer maps it from the notes.
- **Content point: the restaurant's hours as data.** The clock archetype prints 7:30 and 22:00, which today live only in `hoursNote` prose. The schema already has `openingHours[]`. The deployer should seed it with one row (mon–sun, 07:30–22:00) for the restaurant, and keep `hoursNote` for the sentence, so the template reads the times rather than parsing a string. Owner to confirm, because the restaurant's Google listing is unclaimed (N8).
- **Schema gap: a second listing's rating.** The restaurant's own Google rating (4.6 from 39) is in a copy body. `ratings[]` has one row per platform, so a second Google listing cannot be a row. Acceptable as copy for now; noted.
- **Rosa mapping correction for the record.** The dossier's `break.rosa` says spot "'Coconut'", and Alon's brief says id `coconut`. Rosa's actual id for that spot is **`weligama-west`**. `coconut` is a 404, and `coconut-beach` is Arugam Bay. The seed must use `weligama-west` (§3).
- **No Instagram, no video, no photographs of surfing, the hosts or breakfast.** These are pitch points. The Instagram section the calibration asks for is omitted, not faked.
- **Copy check for the designer:** the times printed (13:00, 7:30, 22:00, 11:00) are all dossier values. "The afternoon", "Sunset", "How do you like to sleep?", "Find your room", "Fan rooms: no air conditioning and no hot water" and the chips are template labels, and each label states only what the room notes say. Nothing implies a pool (the light-well is "a channel of water"), a level, a payment method or blanket breakfast.

**The one thing I would most want photographed on location:** **Coconuts from the roof at 7:30, with surfers on the peak.** It is the same frame as img-009, but with the wave working and people on it, ideally as a 10–15 s clip. It is the video this business does not have, and the single fact the whole page turns on (the break in front of the door) that no photograph of its own shows. Second: breakfast on the restaurant floor with Chinthaka and his family.

## Hand-off checklist

1. Every photograph looked at: seven contact sheets of all 134, close-ups of twelve candidates, and full-size img-009, 002, 106, 007. The largest usable width of the best photograph is **1920 px** (img-009 and 69 others ≥ 1920 on the long edge). ✔
2. `agents/designer/references.md` read in full this run. Cited: #1, #2, #4, #5, #6, #7, #9, #10, #14, #15, #20, #26, #27, #28 and the Calibration section. ✔
3. Divergence table: all six other rows in this run (Cheeky Monkey, Lotus), with their picks noted. No repeat of archetype + first-screen device, and no shared set-piece pattern. ✔
4. Videos: all three listed, none usable (third party, licence unknown; vid-003 is another business's film). This is stated in §2 and applies to every concept. The ten strongest photographs are listed with widths, and the concepts use them. ✔
5. Each concept says why it beats what we have and names the comparison: no own site, so the Google, Booking.com and Airbnb folds in `funnel/walk/` and the gold bar (Global Surf `postcard` / `the-sign` / `try-your-week`, `the-lavish-haven.html`). ✔
6. First screens: own ≥ 1920 px media (img-009 / img-102 / img-009), what + where (name + "Gurubebila, between Midigama and Weligama"), the primary action `engine` with the copy's label "Check dates on Booking.com", and 1 tap. The rating sits with the booking head and the guests, with reasons. ✔
7. Facts trace to `en.json` / dossier keys: `break`, `location.spot`, `spot_reference` (via `season`), `room_types` / `rooms[]`, `stay_info`, `restaurant_hours` / `hoursNote`, `ratings[]` (`reviews`), `testimonials[]`, `contact`, `booking.engine_url`, `business.people` / `description`, `images[].room_types`. No price, level, pool, payment or blanket-breakfast claim. The Rosa mapping was verified live. ✔
8. Every colour has a hex, an asset id, a crop and what it shows. The darkened accent (concept 3) is named as darkened, with the sampled value. White text on the accents: 6.6 / 5.3 / 5.1. ✔
9. Default-look list: none used. Cool white and near-white grounds; no listed display or body face; no petrol, teal, sage or terracotta accent (the green is a saturated leaf green, the vermilion is the client's own sign). No all-caps labels, no "01/02" numbering (the times are real clock times from the dossier, in order), no arrows; " | " follows Shahar's calibration. ✔
10. One thing per concept: the view from the roof; the thatch; the sign's sun. Nothing else on each page is louder. ✔
11. Main items: calm uses img-009 with a one-time pan and micro-animations (no canvas); interactive uses the WebGL depth parallax on img-102; unique uses the WebGL horizon-wipe set-piece on five of its own frames. Micro-animations are named for each. No first screen is a plain cookie-cutter section. ✔
12. `agents/designer/gold/` opened this run: the pages were rendered in Chromium at 1440 and 390, not only the notes read. ✔
