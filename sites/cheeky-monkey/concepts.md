# Cheeky Monkey Surf Camp, Midigama: concepts

Station 4d · creative-director 0.6.0 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-10-26.
Inputs: `dossier/cheeky-monkey/dossier.json` + `audit.json`, `sites/cheeky-monkey/copy/en.json` (passed 4c, round 1), all 163 photographs (looked at on seven contact sheets plus two close-up sheets) and the sheets of all nine videos, `assets/old-site-mobile.png` and `old-site-desktop.png`, `agents/designer/references.md` (read in full), `agents/designer/custom.md`, `gold/` notes, `agents/designer/scroll/playbook.md` §2.3. No `stock/` folder exists for this business, and none is needed (see §2).

---

## 1. What this business actually is

A surf shop on the Galle–Matara main road with rooms upstairs, a bar on the roof, and the sea across the road. It is not a camp in the beach-resort sense. A Booking.com guest even wrote "It is actually not a surfcamp. It has a surfshop downstairs" (`reviews.critical_themes`). What it really has is 400 rental boards in every resin colour (`rentals`), its own Cheeky Monkey boards shaped in Bali, a shaper who does repairs, and a hand-painted sign by the road that lists "LESSON, REPAIR, CAMP, SCOOTERS, TAXI, EVERY THING" (img-122). It opened in late 2009 as three rooms, a tiny shop and a restaurant, and had ten rooms by 2021 (`business.since`, `room_count`). It is named after Baba, who taught himself to surf at twelve (`business.owner`). Its own Instagram posts are about boards arriving, not about the rooms (vid-008, vid-009, 7 and 18 Oct 2026).

## 2. What the material can and cannot carry

### Video, the business's own (`dossier.videos[]`)

| id | licence | what it is | length · size | usable? |
|---|---|---|---|---|
| vid-001 | unknown (third-party YouTube, 2018) | promo film: drone over the reef and village, surfers, rooms, rooftop | 89.6 s · 1920×1080 | **No.** The best footage of the place, but the licence is unknown and captions are burnt in. **Pitch point:** ask Baba for the rights or the raw files. |
| vid-002 | unknown (TRAVSOME, 2019) | night party at the bar | 77.0 s · 1920×1080 | No: licence. |
| vid-003 | unknown (2016) | portrait film of Baba at the old shop, subtitled | 124.7 s · 1920×1080 | No: licence, subtitles. |
| vid-004 | unknown (2016 affiliate) | slideshow with a cartoon banner | 63.1 s · 1280×720 | No. |
| vid-005 | unknown (DJ LUCKY, 2022) | reggaeton night, phone | 73.7 s · 1920×1080 | No. |
| vid-006 | unknown (2022) | Friday party | 131.0 s · 640×352 | No. |
| vid-007 | unknown (Sinhala vlog, 2019) | walk into the shop, logo on every frame | 869.9 s · 1280×720 | No. |
| vid-008 | **business-owned** (reel, 18 Oct 2026) | one board after another stood on a mat in front of a wall of boards | 8.2 s · 1080×1920 | **No.** "PICK YOUR PLAYER" is burnt into every frame. Its *idea* (one board standing alone on the mat) is used in concept 3, but not its pixels. |
| **vid-009** | **business-owned** (reel, 7 Oct 2026) | handheld walk along the racks of new hard boards in bright resin tints; a hand pulls boards forward; no faces | 13.33 s · **1080×1920 vertical** | **Yes. The only usable clip.** The caption runs only in the first ~2.8 s, and the dossier's cut (3.0–13.0 s) is clean. Renditions: `d1920` (really 1080×1920) WebM 1.79 MB / MP4 3.74 MB, `m720` MP4 1.86 MB, poster JPEG at 4.0 s. There is no m1280 tier and no AVIF poster (ffmpeg AVIF failed). |

**The three best moments in vid-009** (sheet interval 0.555 s):
1. **3.3–4.4 s:** a white Rockwell and a magenta speckled board stand side by side on the rack bar, with the shop lights above. This is the poster frame (4.0 s).
2. **4.4–6.7 s:** a close pan along the rails (coral, yellow with black splatter, lime, red-and-white swirl), and at ~6.1 s a hand pulls the orange board forward.
3. **10.0–13.3 s:** the view down the aisle between the racks, then the whole rainbow of rails in a row with a hand running along them.

**What vid-009 cannot do:** it is vertical, indoors, handheld, and has no water in it. It is 1080 px wide, so it **cannot be a full-bleed 16:9 hero on a desktop** (a 1440 px-wide crop would upscale it 1.33× and keep only 607 of its 1920 rows). It is a native full-bleed on a phone (9:16). On desktop it must be shown at its own shape. All three concepts respect that. **Two of them open on it** (2 and 3). Concept 1 opens on a photograph: it is the calm variant, and the business's single strongest frame is a still (img-147).

### Photographs, the business's own

163 in all: 156 business-owned (Booking.com property uploads, the owner's site and Facebook) and 7 of unknown licence (img-153, 156–161, all on the owner's site but credited to no one; **none of them is used**). 108 are ≥ 1920 px on the long edge. What they show:
- **Rooms** (img-002–070): clean phone photographs at 1440×1920 / 1200×1600 with polished concrete walls and navy linen. Each room has its own painted mural: "Dance like a mermaid", "RIDE THE WAVE" glasses, a yellow "SURF TRIP" bus (Superior Double), a fishbone "SURF" (Double), ochre walls (Small Twin).
- **The shop:** racks, the fin wall and boards (img-083, 087, 090, 093, 095, 096, 101, 108–111, 114–118, 146, 163).
- **The street front:** the building on the main road with a red tuk-tuk, signs and the night front (img-001, 082, 086, 088, 094, 097, 098, 121–123, 147, 162).
- **The roof:** bar, pool table, yoga, sunsets (img-073, 077–081, 091, 099, 136–140).
- **People:** Baba (img-141, 142), guests with boards (img-085, 089, 102, 117, 120, 131, 151), nights (img-105, 107, 132, 144, 145).
- **Water:** few. img-100, img-103, img-134 and img-155 are the only business-owned sea pictures.

**The ten strongest, with sizes:**

| # | asset | px | what | role it can play |
|---|---|---|---|---|
| 1 | **img-147** | **2000×1868** | board noses frame the main road, with the RESTAURANT / MUSIC / BAR signs, the Cheeky Monkey signpost and a tuk-tuk under palms | **the best photograph in the dossier**; a full-bleed hero at any width |
| 2 | img-122 | 1733×2000 | the hand-painted list "SURF SHOP BABA'S · LESSON · REPAIR · CAMP · SCOOTERS · TAXI · EVERY THING", a cream tuk-tuk, the stacked signs | full-bleed portrait band; the page's voice |
| 3 | img-134 | 1500×2000 | a surfer with a pink board at a pink sunset, giving a shaka | full-bleed portrait; the warmest picture |
| 4 | img-103 | 2000×1333 | a surfer in a Cheeky Monkey vest holding a yellow fish, facing the shorebreak | full-bleed (the current site's hero) |
| 5 | img-146 | 1500×2000 | rack of fish and mid-lengths, one with orange flowers | shop |
| 6 | img-109 | 1800×1200 | the long rack of rental boards under the white ceiling | shop, wide |
| 7 | img-108 | 1800×1200 | the fin wall: red, yellow, green and blue fins on a blue shelf | shop detail; a palette source |
| 8 | img-096 | 1500×2000 | a lilac and a mint fish on the stand, more racks behind | shop; palette source |
| 9 | img-137 | 1864×2000 | rooftop yoga at sunset with the sea behind | the roof |
| 10 | img-100 | 1500×2000 | a surfer walks into turquoise water with his board | the water |

Runners-up: img-013 (1920×1280, the roof wall and the sea), img-071 (1920×1280, garden, palms and sea from above), img-078 (1280×1920, the rooftop bar in golden light), img-099 (1500×2000, the thatched terrace at dusk), img-141 (1500×2000, Baba in a striped shirt among the boards), img-105 (2000×1333, a busy night), img-085 (1920×1238, guests' beach selfie), img-082 (1200×1600, today's front with the red tuk-tuk).

**Largest usable width of the best photograph: 2000 px (img-147).** Full-bleed is not just allowed but preferred.

Careful: img-121, img-094 and img-098 show the **older** shop front ("BABA'S SURF SHOP & SURF SCHOOL" in different signage, before the 2025 renovation). They may be used as history (concept 1's about section), never as "this is the building today". img-082, img-088 and img-162 are today's front.

### Atmosphere

No `stock/` folder, and none is needed: the business has big photographs of its own. None is fetched.

### Words (`copy/en.json`)

- **Short lines worth setting large:** "Catch waves, not worries" (intro heading, the owner's own line); `featureLine` "Come as a stranger, leave as a friend." (the owner's About page); the headings "Three rooms in 2009", "Baba's Surf Shop", "Up on the roof", "A week of surf".
- **Long blocks:** "A week of surf" (six paragraphs, the package logic). It wants a structure (tabs or a table of four), not a column of prose.
- **`tagline`** (87 characters) is too long for a hero subtitle under Shahar's calibration (references, Hero: "any subtitle is very short"). See §6.
- **`closing`:** "See the rooms and live dates on Booking.com. For lessons and surf weeks, call us first." This line is the honest booking split, and every concept ends on it.

### Numbers

- **Ratings:** Google 4.5/5 from 467; Booking.com 8.3/10 from 45 (Staff 9.0, Value 8.9, Location 8.8); captured 2026-10-26.
- **Counts:** 400 boards; 3 rooms in 2009 → 10 by 2021; 5 room types (8–12 m², sleeping 2–3).
- **Prices** (all published in 2021, flagged in the copy): lesson USD 20 / 90 min; group lesson max 6; four week-packages USD 250–400 per person; airport USD 65 / 130.
- **Distances:** 350 m to Midigama Beach; train 800 m; Koggala Airport 10 km.
- **Stay:** check-in 14:00–19:00, check-out 06:00–11:00.
- **Following:** Instagram 15.3K.

### Gaps (and which ones to design around)

- **No WhatsApp.** The booking path is Booking.com for rooms, and phone/email for lessons and weeks. Pitch point.
- **Prices are from 2021** and the copy says so. Each price block carries the "published in 2021, call to confirm" note in small type. Design it in: a dated price tag, not hidden fine print.
- **Opening status is unclear** (Facebook: closed for low season, team in Arugam Bay; Booking.com live). No concept states that it is open or closed. The schema has no announcement line (§7 gap).
- **The break has no name** in the dossier (`location.spot`: "close to the main point breaks"). So there is **no forecast** in any concept: Rosa's spot cannot be mapped to a named break.
- **No shop hours** (Instagram, Google and Facebook conflict). The shop section carries no hours line. Pitch point.
- **No instructor names.** Baba is the only named person.
- **No water footage of its own.** The only clip is indoors. This is the biggest pitch point: "your best-looking video is someone else's 2018 drone film; let us shoot the reef".

## 3. The page archetype for this business: **walk in off the main road**

The page is the visit: you pull up on the road in front of the shop, step in to the counter, walk past the wall of boards, climb to the rooms and the roof, meet Baba, and step back out to the road with directions. It belongs to this business and no other in the run: Cheeky Monkey is a **roadside shop with beds above it**. Its photographs are of signboards, racks and a road, not a pool or a beach lawn, and its own Instagram is about boards. (impeccable mode: **Persuade**. The visitor's success is tapping through to Booking.com or calling about a surf week, after trusting that the place is real and theirs.)

**The order, shared by all three concepts** (playbook §3; the audit's `offer_framing` governs 2–3):
1. **The road:** the first screen.
2. **The counter:** what you can book. Surf weeks first (four packages, what all four include, per-week prices dated 2021), then single lessons, then a line to the rooms. The booking section, in the audit's order.
3. **Upstairs:** the five rooms, each with its own gallery (references calibration: "rooms must be sold, several images per room"), each with "Check dates on Booking.com", plus `stayInfo`.
4. **The wall of boards:** Baba's Surf Shop: 400 boards, own brand, repairs, brands, scooters.
5. **The roof:** "Up on the roof": 180° sea view, yoga, the bar with the pool table; amenities as one compact " | " paragraph.
6. **Baba:** "Three rooms in 2009".
7. **Guests' words:** ratings with count, source and date; verbatim quotes.
8. **Back on the road:** getting here, good to know, contact, `closing` + the booking action.
9. **Instagram** and the **footer.**

`recommended.above_fold` (`what_where, included, price, level, trust, primary_action`) is the order of section 2's head and of the phone bar's expanded state. It is not crammed into the first screen. **Taps to book: 1** in every concept: the hero button is a plain `<a href>` to `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html`, so it works with JS off. The phone bar carries the same link everywhere. Secondary actions are `tel:+94719248686` and `mailto:cheekymonkeymidi@gmail.com` as designed buttons with icons, never text links (calibration).

**Forecast: no**, in all three. The dossier names no break, so there is no dossier-spot → Rosa-spot mapping. "Midigama" would be the nearest-other-spot error the rule forbids.

> **Amendment, 2026-11-09 (designer, 4g fix round after verification 1; records a human decision, does not change the concepts).** The picked page (unique, "Pick your board") carries the Rosa forecast after all, by **Alon's choice of 2026-11-04** (operator, in session). The mapping: **`rosaSpotId: rams`** (Rosa's `spot.name` "Rams", town Midigama), chosen because it is **the nearest spot Rosa covers**: Rosa's `data/index.json` puts Rams at 5.962565, 80.393597, which is **360 m** (haversine) from the dossier's `location.lat_lng` (5.9617986, 80.3967609; 369 m from the shop's own Google listing). The next Rosa spots are Coconut (`weligama-west`) at 578 m, Lazy Left at 679 m and Lazy Right at 980 m (checked 2026-11-09). The dossier still names no break, so **Rams is never called the business's break**: the page says "Rams is the nearest spot Rosa covers, about 360 m from the shop" and "Forecast for Rams by Rosa", nothing more. This departs from schema v0.3's "the nearest other spot is never used as this one" and from the paragraph above; it stands **pending Shahar's decision on proposal 2026-10-midigama-01/003 item 1**. If that item is rejected, `forecast.enabled` goes back to false and the block disappears (the template renders nothing without it).

---

## 4. Three concepts

### Concept 1 · calm: **"The signboard"**

**The idea in one sentence.** A bright, plain page that opens on the street outside the shop, framed by board noses, and reads like Baba's hand-painted sign: one honest line for each thing they do.

**The one thing.** The main-road front: signs stacked on a white wall, a tuk-tuk, board noses in the doorway (img-147, then img-122 once further down). Nothing else on the page is that loud.

**Structure.**
1. **Hero:** see the first screen.
2. **The counter:** white. Script title "A week of surf". Under it, a **four-tab segmented row** (Full Surf Lesson | Moderate | Yoga and Surf | Board Rental). The open tab shows the package's own line from the copy, then a three-column price row for private room | shared double | shared triple with the price large ("USD 400" in Albert Sans 600) and "per person, 7 nights | published 2021" small. Below the tabs, once for all four: "Every week includes" as an icon list (no images, calibration: inclusions need no pictures): 7 nights, 7 breakfasts, 5 dinners, 2–3 yoga classes, party night, BBQ night, gym. The board and the ride to the spot carry a "lesson packages" chip, and the lake tour shows "USD 5 extra". Then "Lessons for your level": three compact cards in one row (Surf lesson 90 min USD 20 per person | Group lesson max 6 | Private lesson, SUP, Surf spot tour as one card), each with a "Call to book" button (tel). The dated note sits under them in the place colour. Phone: tabs become a swipe row with peek (#14), cards stack.
3. **Upstairs (rooms):** tint ground. Script title "The rooms". Five rooms **stacked**, each a full-container 3:2 dot slideshow (5–6 photos) with a text row under it: name | beds, sleeps, m², note | "Check dates on Booking.com" (accent). Galleries: Superior Double img-030, 014, 021, 016, 033, 026; Double img-058, 041, 045, 050, 053; Small Double img-002, 004, 009, 013 (the view from the roof); Classic Triple img-035, 034, 036, 037; Small Twin img-064, 063, 065, 070. Under the five: `stayInfo` in one " | " line.
4. **The wall of boards:** white, split 7/5. Left: **img-122 at 4:5, full column height**, the hand-painted list. Right: script title "Baba's Surf Shop", the copy block, `rentals[]` as three lines with icons, `brands[]` as one " | " line, and a **portrait 9:16 card of vid-009** (the 3.0–13.0 s cut) at 320 px wide, muted, looping only while in view, with a Pause control. Below the split: a 3-up row of square crops: img-108 (fins), img-146 (rack), img-096 (lilac and mint).
5. **The roof:** img-137 full-bleed 21:9 desktop / 4:5 phone, with `featureLine` "Come as a stranger, leave as a friend." centred in white (≥ 4.5:1 over the darkened sky band: the photo's lower sunset sky is dark enough; the designer checks the pixels). Under it on white: script "Up on the roof", the copy block, then the amenities as one " | " paragraph.
6. **Baba:** tint, split 5/7: img-141 at 4:5 left, script "Three rooms in 2009" + the copy right, and img-121 (the old shop front) as a small 3:2 print below the text, matted like a print (#9) and alt-texted as the earlier shop front.
7. **Guests:** white. One quote at a time, centred, in a dot slideshow (calibration), 11 quotes. Above them, two rating blocks side by side: "4.5/5 Google | 467 reviews | 26 Oct 2026" and "8.3/10 Booking.com | 45 reviews | 26 Oct 2026", each linking to its listing.
8. **Getting here + good to know:** tint, two columns without rules: the address (Google's words), the distances as a " | " list, the map as a designed button "Open in Google Maps", and on the right "Good to know". No embed.
9. **Closing:** img-147 again? **No:** the hero photograph is not repeated. img-103 at 21:9 (the surfer and the yellow fish), with `closing` centred under it on white in the script, then "Check dates on Booking.com" + "Call" + "Email" as three aligned buttons.
10. **Instagram:** six 1:1 tiles (img-146, img-134, img-108, img-099, img-085, img-105) linking to @cheekymonkeysrilanka, with a "Follow on Instagram" button.
11. **Footer:** white, four columns: the name and address; contact buttons with icons; "Rooms on Booking.com"; social icons. No underlines.

**The first screen.** **img-147 full-bleed**, 100svh. Desktop crop 16:9 from the full 2000 px (the board noses stay at the left and right edges, the road vanishes at the centre). Phone crop 4:5 from the centre (#26): the road, the signs and the tuk-tuk, with a nose at each edge. A light grade: lift the shadows 5%, no tint (the photo is already filtered warm-cool). Header over it: wordmark "Cheeky Monkey" left, "Surf weeks | Rooms | Shop" + a small accent button right (phone: wordmark + phone icon). Centred horizontally and vertically: **"Catch waves, not worries"** in Yellowtail, 64 px desktop / 40 px phone, white, with a soft 24 px text shadow at 25% (the sky behind it is bright: the designer checks ≥ 4.5:1 at that spot; if it fails, the title moves to the lower-centre over the darker road). 24 px below it: one button, **"Check dates on Booking.com"**, white on red. What + where comes from the header name and a 15 px white "Midigama, Sri Lanka" line directly under the button (the town from `contact.address`). **No rating here.** It sits with the guests (calibration, "never a tagline + rating + button stack"), and the 467 Google reviews rate a listing whose current season status the dossier cannot confirm.

**Why it beats the current site.** The current home page opens on PHP warnings, a centred title over a stock-looking surfer (img-103), and a black "rooms are being renovated and are not bookable" banner. On a phone it runs 470 px wide in a 390 px screen, with no booking link anywhere (`existing_site.notes`). Here the first screen is Midigama's own main road through the shop door, with one red button that lands on live Booking.com dates, and prices for the four surf weeks one scroll below.

**Colour** (sampled; `ffmpeg` area-averaged crops, then point samples on the pigment).
- Ground `#FFFFFF`: the shop's white wall in daylight, img-122 (`#D8DDDF` sampled in shade, lifted to white).
- Tint `#EEF1F2`: the same wall, img-122, one step down from white.
- Ink `#274959`: the sign-painter's blue-black of "SURF SHOP BABA'S", img-122. 9.62:1 on white, 8.47:1 on the tint.
- Place colour (icons, small fills, the dated-price note's dot) `#A7DAE7`: the sky over the main road, img-147. Never text.
- **Booking `#DE2229`: the red fin, img-108** (point sample `#DE2229`). White text **4.81:1**. Used only on booking actions, and as the hover state of the call/email buttons' icons.
- It would look wrong beside cream or sand (the red turns to brick, and the sign's ink to petrol) and beside a dark page.

**Type.** **Albert Sans** (400/600) for everything people read: a plain grotesk with open apertures, upright like the painted list on img-122 and legible at 17 px in phone sunlight. **Yellowtail** for section titles only (36–64 px): a 1950s brush script of the kind on surfboard decals and shop signs, the hand of the "Cheeky Monkey" signpost lettering, and readable at title size (calibration: "readable text face + handwritten script for section titles"). Two families, Latin subset, ~75 KB. Neither is on the default-look list or in any gold page.

**Motion.** Micro only, no canvas (calm). Buttons press to 0.97 over 120 ms, ease-out; the package tabs slide a white pill under the active tab (220 ms); the room slideshows slide 350 ms with dots that stretch to a short bar for the active slide; the vid-009 card plays only in view. No parallax, no heading reveals. `prefers-reduced-motion`: the card shows its poster with a Play button, slides cut instead of sliding. JS off: tabs render as four stacked packages, slideshows as horizontal scroll-snap rows, and every booking link still works.

**The booking pattern.** Morgan's Rock's model (#4, #7, #15): one action per offer and a persistent bar. The hero button and every room have their own "Check dates on Booking.com". Surf weeks and lessons carry "Call to book" + "Email" (they are not on Booking.com, and the copy says to call first). Phone: a full-width bottom bar after the hero leaves view, with the accent "Check dates on Booking.com" (70%) + a phone button (30%). It never covers content on load (#20). One accent (#6). Taps: hero → Booking.com = **1**.

**Photographs.** img-147 (hero, 2000 → 1920/1280/828 AVIF), img-122 (4:5 split, 1733), img-137 (full-bleed band, 1864), img-103 (closing band, 2000), img-141 (4:5), img-121 (small print, ≤ 600 px shown), room galleries (≤ 1200 px shown, 3:2 crops of 1440×1920 and 1200×1600 portraits: the crop keeps the bed and the mural), shop squares at 600 px, Instagram tiles at 400 px. Nothing is shown wider than its source.

**Forecast.** No (§3).

**Scroll set-piece.** — (calm never carries one).

**Budget.** First load (phone): HTML+CSS ~45 KB, fonts ~75 KB, hero AVIF (828 w) ~140 KB, JS ~10 KB → **~0.27 MB**. Largest above-the-fold image ≤ 300 KB at 1920 w. The vid-009 card loads `m720` (1.86 MB) only when scrolled into view, never under Save-Data. Zero third-party requests.

**What would make this concept fail.** The stacked rooms and the tidy tab row could read as a careful template next to the gold pages. The hero crop and img-122's band must be big enough that the street, not the tables, is what the visitor remembers.

---

### Concept 2 · interactive: **"The wall of boards"**

**The idea in one sentence.** The page opens on the shop's own reel of new boards and keeps the rack's colours in your hand all the way down: you drag the wall, pick a week, flip through rooms, and every choice ends in one red-pink button.

**The one thing.** The rack of new resin boards (vid-009, img-146, img-096, img-109): magenta, coral, lime, lilac and mint rails side by side. It is the only loud element. Every other surface is white.

**Structure.**
1. **Hero:** see the first screen.
2. **The counter, as one interactive panel ("Plan your stay"):** white. Script title "Plan your stay". A **segmented control** with four segments: Surf weeks | Lessons | Rooms | Boards. The active segment's pill slides (shared-layout move, 260 ms). The panel below changes in place, at a fixed height so nothing jumps:
   - *Surf weeks:* the four packages as four tall cards on a swipe row (#14), each with its first-paragraph line, a three-way room chip (Private | Shared double | Shared triple) that changes the large price on the card ("USD 300 per person, 7 nights"), and the dated note. Under the row, the shared inclusions as an icon list. Each card's button is "Call about this week" (`tel:`) + an email icon (`mailto:` with the subject prefilled: "Cheeky Monkey: Yoga and Surf week, shared double").
   - *Lessons:* the five `lessons[]` rows as compact chips; the 90-min lesson shows USD 20 per person; "Call to book".
   - *Rooms:* see section 3 (this segment scrolls to it).
   - *Boards:* see section 4 (scrolls to it).
   The audit's `above_fold` order is the order of the panel's head: what + where line, included, price, level, trust (the Booking.com 8.3/10 from 45, captured 26 Oct 2026, **placed here beside the Booking action, where it is relevant**), action.
3. **Upstairs:** tint. Script title "The rooms". A **room viewer**: the five room names as a list on the left (desktop) or a chip row (phone). The selected room's 5–6 photo gallery fills a 4:3 stage on the right with dot navigation and swipe. Under the stage: beds | sleeps | m² | note, and "Check dates on Booking.com". Changing rooms crossfades the stage (300 ms). Same galleries as concept 1, but here the mural photo leads each one (img-030 bus, img-058 fishbone, img-014 mermaid as Superior's second, img-064 ochre twin, img-035 triple, img-002 small double).
4. **The wall of boards:** white. Script title "Baba's Surf Shop" + the copy block, then a **draggable board strip**: full-bleed, 70vh tall, a horizontal run of shop photographs at one height (portrait crops at 3:4: img-146, img-096, img-087, img-116, img-131, img-114, img-163, img-117), dragged or swiped with momentum and rubber-banding at the ends (apple-design). It is not scroll-pinned (no set-piece in concept 2). Between photos, three text tiles: "400 boards to rent", "Our own boards, shaped in Bali", "The shaper fixes dings fast" (rentals/copy). Then `brands[]` as one line, and img-108 (the fin wall) as a 21:9 band.
5. **The roof:** split 6/6: img-078 (golden rooftop bar) at 4:5 left, script "Up on the roof" + copy + amenities as one " | " paragraph right. Under it, img-137 / img-136 / img-140 as a three-photo dot slideshow (yoga).
6. **Baba:** img-141 in a 1:1 crop with "Three rooms in 2009" beside it, compact.
7. **Guests:** img-085 (the beach selfie) 16:9 full-bleed with one quote at a time centred in white on a darkened lower band, dot navigation; below it on white: "4.5/5 Google | 467 reviews | 26 Oct 2026".
8. **Getting here:** split: left the address, distances and "Good to know"; right **one lazy Google Maps embed** (the page's single third-party embed, playbook §4), loaded only near the viewport, its space reserved at 4:3, with a plain "Open in Google Maps" button as the JS-off and failure fallback.
9. **Closing:** white. `closing` in the script, centred, with the three buttons.
10. **Instagram** (six tiles: img-096, img-134, img-146, img-137, img-089, img-107) and the **footer** (tint, four columns, icon buttons).

**The first screen.**
- **Phone (the main case):** **vid-009 full-bleed, 100svh, native 9:16**, the dossier's 3.0–13.0 s cut, poster at 4.0 s (white Rockwell + magenta board). Header over it: wordmark + phone icon. Centred: **"Cheeky Monkey Surf Camp"** (`businessName`) in Knewave, 38 px, white with a soft shadow, and under it "Midigama, Sri Lanka" at 15 px. Then **"Check dates on Booking.com"**, white on magenta. No grade on the footage beyond +4% contrast. The shop light is already bright.
- **Desktop:** the same clip as a **triptych**: three portrait columns of vid-009 side by side, filling the 16:9 viewport edge to edge, each column ≈ 480×853 CSS px (downscaled from 1080 px, never upscaled). The three columns play the same file from three points (≈ 3.3 s, 6.1 s and 10.0 s, the three best moments above), so the screen reads as one long wall of boards. The title and button sit centred over the middle column. One download, three decodes; on a weak device (`deviceMemory` ≤ 4 or `hardwareConcurrency` ≤ 4) only the middle column plays and the outer two show their stills.
- **No rating** on the first screen (calibration). The Booking.com rating sits beside the booking actions in section 2, the Google rating with the guests.

**Why it beats the current site.** The current site has no video at all and a hero whose left half is empty on desktop (`existing_site.notes`). Here the first thing a visitor sees is the shop's own new boards moving in the shop's own light, which is what people stop at Cheeky Monkey for. One tap takes them to live room dates, and every surf week shows its price inside one panel, one scroll down.

**Colour.**
- Ground `#FFFFFF`: the shop ceiling and walls behind the racks, vid-009 at 4.0 s (white with shop lights).
- Tint `#EAF3F5`: the mint fish board, img-096 (point sample `#8EB9C6`, lifted near white).
- Ink `#251A1F`: the chocolate-brown board at the front of the rack, vid-009 at 1.4 s (point samples `#251A1F`/`#2E1F24`). 16.9:1 on white.
- Place colour (script titles, the segmented pill's outline, icons) `#6E4A86`: the lilac fish, img-096 (point sample `#A47EB2`, deepened for text). 7.03:1 on white, 6.24:1 on the tint.
- **Booking `#B11A49`: the magenta speckled board, vid-009 at 4.0 s** (sampled `#B11A49`). White text **6.75:1**.
- It would look wrong beside red (it goes purple-pink and fights) and beside a warm cream (it turns to raspberry on biscuit). That is why concept 1's red fin and concept 3's blue are kept out of this palette.

**Type.** **Schibsted Grotesk** (400/500/700) for reading and every booking control: a newspaper grotesk with sturdy figures, so "USD 300" and "per person, 7 nights" read like a price tag on a rack. **Knewave** for section titles only (36–56 px): a fat brush script, the stroke of the shop's painted lettering and of the board graphics in the reel. Two families, ~80 KB.

**Motion. Main item: the triptych cut of vid-009** (desktop) / the full-bleed cut (phone). Micro-animations through the page: the segmented pill slides between segments (260 ms, ease-out-quint); price numbers **roll** to the new value when a room chip changes (a vertical digit roll, 220 ms); the board strip drags with momentum and rubber-bands at its ends; the room stage crossfades; buttons press to 0.97 and the accent button lifts 2 px with its shadow on hover (`pointer: fine` only); slideshow dots stretch to a bar. No heading reveals, no parallax. `prefers-reduced-motion` / Save-Data: posters only (the triptych shows three stills), the digit roll becomes a cut, the drag strip keeps native scroll-snap without momentum easing. JS off: segments render as four stacked blocks with anchors, the strip is a native horizontal scroller, every link works. No WebGL.

**The booking pattern.** An **inline panel**, not a navigation (#1 in spirit, the panel is on the page; #2 tile-taps instead of typing; #7 price + unit on each card). Rooms hand off to Booking.com in one tap from the hero, the bar or any room. **Optional dates:** inside the Rooms segment, a "Pick dates (optional)" row with two native date inputs (floating labels, calibration) adds `checkin`, `checkout` and `group_adults` to the Booking.com URL. That is a convenience only: the designer must confirm by tap-through that Booking.com honours the parameters, and if it does not, the row is dropped, never faked. Surf weeks and lessons go to `tel:` / prefilled `mailto:`. Phone bar: magenta "Check dates on Booking.com" + a phone button + an email button. Booking JS (~12 KB) loads on first interaction (#5). Taps: hero → Booking.com = **1**.

**Photographs.** vid-009 (hero), img-146, img-096, img-087, img-116, img-131, img-114, img-163, img-117 (strip, 3:4 crops shown ≤ 700 px tall), img-108 (21:9 band at 1800), img-078 (4:5), img-137/136/140 (slideshow ≤ 1200), img-141 (1:1), img-085 (16:9 band at 1920), room galleries as in concept 1.

**Forecast.** No (§3). The one embed is the map (section 8): lazy, reserved, with a fallback button. Its cost is outside first load (~350 KB when loaded, measured against the budget with it loaded).

**Scroll set-piece.** — (concept 2 never carries one; the strip is drag, not scroll-pinned).

**Budget.** First load (phone): HTML+CSS ~50 KB, fonts ~80 KB, poster (1080×1920 JPEG re-encoded by the designer to AVIF at 828 w) ~110 KB, JS ~25 KB → **~0.27 MB**. After first paint: phone `d1920` WebM 1.79 MB (sharper than `m720`, and under the 2 MB phone cap), MP4 fallback `m720` 1.86 MB for browsers without AV1. Desktop: the same 1.79 MB WebM (or the 3.74 MB MP4), once.

**What would make this concept fail.** The reel is handheld and indoors. If the triptych's three columns look like a glitch rather than a wall, or the phone loop feels shaky full-screen, the hero reads as a shop advert instead of a stay. The designer must test the three start offsets and drop to one centred column if they clash.

---

### Concept 3 · unique: **"Pick your board"**

**The idea in one sentence.** The shop's own idiom, one board stood alone on the mat ("pick your player", vid-008), becomes the page's window: the first screen is a single surfboard-shaped cut-out with the reel of new boards playing inside it, and as you scroll the board opens up into the whole shop.

**The one thing.** **One surfboard, standing.** Its outline (a round-nosed mid-length, 1:3.2) is the hero's window, the booking button's rounded nose-shape, and at most one more panel (the Instagram follow tile). Nowhere else (#28).

**Structure.**
1. **Hero + set-piece:** see the first screen and "Scroll set-piece".
2. **The counter:** white, after the zoom. Script title "A week of surf". The **four packages as four tall portrait cards in a row** (desktop) / swipe row (phone), each card topped by a board-shaped crop of one shop photograph (the card's only shape use is this crop: Full Surf Lesson = img-134 pink board, Moderate = img-103 yellow fish, Yoga and Surf = img-137, Board Rental = img-096). On the card: name, price range ("USD 300–400 per person, 7 nights | published 2021"), one line, "Call about this week". Under the row, the shared inclusions as an icon list and the lessons as one compact " | " line with "USD 20 per person, 90 min".
3. **Upstairs:** tint. Script title "The rooms". The five rooms as **full-width 16:9 dot slideshows, two per row on desktop** (the larger Superior and Classic Triple first), each with its text and "Check dates on Booking.com" under it. Same galleries as concept 1, with the mural photo first.
4. **The wall of boards:** white. Script "Baba's Surf Shop" + the copy. Then a **masonry** of the shop's photographs, each at its own height (constraint 5): img-109, img-146, img-108, img-116, img-112 (the shaper at work, 1035×1280, shown ≤ 520 wide), img-131, img-117, img-087. `rentals[]` and `brands[]` beside it in a narrow text column with air (#10).
5. **The roof:** **img-134** full-bleed 4:5 phone / 16:9 desktop crop (1500 px wide: the desktop band is shown at **max 1500 px wide, centred on a pink-white ground**, not stretched). `featureLine` sits on the ground under it, not over it. Then "Up on the roof" + copy + amenities, beside img-137 at 4:5.
6. **Baba:** img-141 at 4:5 with "Three rooms in 2009", plus img-142 small.
7. **Guests:** white. Quotes as a dot slideshow on the left 7 columns; the two rating blocks with dates on the right 5.
8. **Back on the road:** img-082 (today's front, red tuk-tuk) at 4:5 beside "Getting here", "Good to know" and the contact buttons. No embed.
9. **Closing:** `closing` in the script, centred, with the three buttons. Above it, a small board-shaped still of vid-009's 12.8 s frame (the rainbow rail) bookends the hero.
10. **Instagram** (5 tiles + the board-shaped follow tile) and the **footer.**

**The first screen.** White ground (`#FFFFFF`). Centred: **one board-shaped window, 84svh tall** (desktop ≈ 270×860 CSS px; phone ≈ 210×670), holding **vid-009's cut** (3.0–13.0 s) via a WebGL plane masked by a signed-distance board outline. The poster frame (4.0 s, the white Rockwell beside the magenta board) sits in the same mask as an `<img>` under it. The board stands on a soft contact shadow, like the boards on the mat in vid-008. Above the board, centred: **"Come as a stranger, leave as a friend."** (`featureLine`) in Permanent Marker, 30 px desktop / 22 px phone, in the ink colour on white. Below the board, centred: **"Check dates on Booking.com"**, white on blue. Header: wordmark left, the phone icon right. **No rating** (calibration). The pixel rule holds: the video's 1080 px width is shown at ≤ 270 CSS px (≤ 810 device px at 3×), so it is downscaled everywhere.

**Why it beats the current site.** The current site greets visitors with server warnings and a "not bookable" banner over a generic surfer. This opens on one of their own new boards, framed like a product on a mat, with the shop moving inside it, a friendly line in a marker hand, and one button to live dates. On a phone it is one clean screen, where the current one scrolls sideways.

**Colour.**
- Ground `#FFFFFF`: the white walls of the shop, img-109.
- Tint `#FDF1F2`: the pink sunset sky, img-134 (sampled `#FDCCD1`, lifted to near white). A pink-white, not cream.
- Ink `#143746`: the navy stripe of Baba's shirt, img-141 (point sample `#143746`). 12.6:1 on white, 11.4:1 on the tint.
- Place colour (script titles' underline-free accents, icons) `#D3AAAE`: the pink board, img-134. Fills only.
- **Booking `#0B72C4`: the blue fin, img-108** (point sample `#1DA2FD`, deepened toward its shaded side). White text **4.98:1**.
- It would look wrong beside teal or petrol (the blue goes institutional) and on cream (the pink tint turns flesh).

**Type.** **Rethink Sans** (400/600) for reading: a rounded-terminal grotesk whose soft ends repeat the board's round nose, clear at small sizes. **Permanent Marker** for section titles only (28–52 px): a felt-marker hand, the same family of lettering as Baba's hand-painted roadside list (img-122), and the cheekiest of the three concepts' voices, true to the name. It is rough but readable at title size. Two families, ~70 KB.

**Motion. Main item: the board window: WebGL on the footage.** The reel plays on a plane inside the board mask; a soft specular highlight (the gloss of fresh resin) slides along the board's rail as the pointer moves (desktop, `pointer: fine`) or as the device tilts (phone, only after a tap grants motion permission; otherwise static). No overlay covers the footage: the highlight is a 6% white gradient along the edge only. Micro-animations through the page: the booking button's rounded-nose end grows 4 px on hover/press; package-card board crops tilt 2° toward the pointer (spring, `pointer: fine` only); masonry photos ease from 0.98 to 1 on enter (transform only, not headings); slideshow dots stretch; quotes slide. **No heading reveals.** WebGL unavailable: the same board shape as a CSS `clip-path: path()` on the `<video>`, without the gloss. JS off: the poster in the board shape (an inline SVG mask), the button works. `prefers-reduced-motion` / Save-Data: the poster in the board shape, no video, no gloss, no set-piece; the page scrolls straight to section 2.

**The booking pattern.** **A right-hand drawer (desktop, 440 px) / full-screen sheet (phone)** behind the phone bar's second button "Plan a stay" (#1 Tandjung Sari / Kube in-page models, #2, #5). Step 1 is four big tiles: A room | A surf week | A lesson | A board. A room → the five rooms as tiles with a photo → optional dates (floating labels) → "Check dates on Booking.com" (with the date parameters only if verified, as in concept 2). The other three → the matching price, the dated note, and "Call" / "Email" with the subject prefilled. It has a real `/plan/` URL so it works without JS. The drawer traps and returns focus, and Esc closes it. **The hero button bypasses the drawer:** it is the direct Booking.com link, so taps to book stay **1**. Phone bar: blue "Check dates on Booking.com" + "Plan a stay".

**Photographs.** vid-009 (board window + closing still), img-134 (≤ 1500 band), img-137, img-103, img-096 (board-shaped crops ≤ 400 px), img-109, img-146, img-108, img-116, img-112, img-131, img-117, img-087 (masonry ≤ 700), img-141/142, img-082, room galleries (≤ 1200).

**Forecast.** No (§3).

**Scroll set-piece: yes. Image zoom-through (pattern 9), as a board-shaped mask opening.** Built from vid-009 (the business's own usable video; the material qualifies: own video, plus far more than eight own photographs ≥ 1920 px). Pinned **180 vh desktop / 110 vh phone**, scrub `true`. The board mask scales out from its 1:3.2 outline to cover the full viewport while the reel keeps playing. At ~60% the title and button fade out (so no text sits on changing pixels, scroll playbook rule 9). At 100% the full-viewport footage (desktop shows it at most 1080 px wide, centred, with the white ground at the sides, **never upscaled**) cross-fades to section 2's white ground, and the image is hidden (`autoAlpha: 0`) so it leaves no slab. The phone bar stays visible through the pin, so booking is never more than one tap away and prices are one tap away (header "Surf weeks"). Reduced motion: no pin; the poster in the board shape, then section 2. No WebGL: the clip-path scales the same way (CSS + ScrollTrigger). Weak phone: the poster is the window and the mask still opens over the still image. Cost: GSAP + ScrollTrigger ~45 KB + the shader ~6 KB, loaded after first paint.

**Budget.** First load (phone): HTML+CSS ~50 KB, fonts ~70 KB, poster crop (the board window's width only, 640 w AVIF) ~60 KB, JS before paint ~10 KB → **~0.19 MB**. After paint: JS ~70 KB (GSAP, ScrollTrigger, ~6 KB raw WebGL, no three.js), the video at 1.79 MB WebM / 1.86 MB `m720` MP4 on phones.

**What would make this concept fail.** If a narrow board on a lot of white reads as small or coy on a 1440 px screen (Shahar wants big media), the first screen loses to the current site's full-bleed surfer. The board must be tall (≥ 84svh), sharp, with the reel's colours vivid, and the zoom must arrive within the first scroll.

---

## 5. Divergence table

Run `2026-10-midigama-01` has only one business concepted so far, so the table holds this business's three rows. Concepts in other runs in the repo (Global Surf, KA, Layday, Lavish, Mutag Meitiv) are not part of this run's divergence (base.md 0.3.0). For the gold rule, the gold first-screen forms (Global Surf: a landscape full-bleed lodge clip with a centred title and coral button; KA: grass blades over type; Layday: a drawn first screen; Lavish: a drawn cut corner) and their faces (Figtree/Kalam, Plus Jakarta Sans, Literata, DM Sans/Lora/Marck Script, Newsreader/Mansalva, Bricolage/Damion, Outfit, Urbanist, Jost) are reused by none of the rows below.

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern | scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| Cheeky Monkey | 1 · calm "The signboard" | walk in off the main road | img-147 full-bleed photograph (board noses framing the main road), "Catch waves, not worries" in Yellowtail + red-fin button | centred container; package tabs; stacked full-width room slideshows; 7/5 shop split with img-122 | `#FFFFFF` + `#EEF1F2` (img-122 wall) | micro only: tab pill, dots, in-view portrait clip | per-offer buttons + persistent phone bar (Morgan's Rock) | — |
| Cheeky Monkey | 2 · interactive "The wall of boards" | same | vid-009 full-bleed 9:16 on phone / three-column triptych of the same reel on desktop, `businessName` in Knewave + magenta button | one segmented "Plan your stay" panel; list + stage room viewer; full-bleed drag strip | `#FFFFFF` + `#EAF3F5` (img-096 mint) | triptych cut, sliding pill, rolling digits, momentum drag, crossfades | inline panel with tiles, optional date params, tel/mailto | — |
| Cheeky Monkey | 3 · unique "Pick your board" | same | vid-009 inside one centred board-shaped WebGL window on white, `featureLine` in Permanent Marker + blue-fin button | portrait package cards with board crops; 2-up room slideshows; masonry shop | `#FFFFFF` + `#FDF1F2` (img-134 sky) | resin-gloss shader, card tilt, board-mask zoom | right drawer / full sheet with a `/plan/` URL; hero bypasses it | **image zoom-through (pattern 9): board mask opens to the shop, vid-009, 180 vh / 110 vh** |

No two rows share archetype + first-screen device: a photograph, a full-bleed/triptych reel, and a masked reel on white. There is one set-piece pattern in the run.

There is no other business in this run yet. When the next one is concepted, its director must diverge from these three rows. In short: this business's first screens are a roadside street photo, a vertical reel of a board rack, and one board standing on white, and none of them shows a beach, a pool or a lawn.

## 6. For the copywriter, the deployer and Shahar (gaps the concepts hit)

- **Schema gap: a short hero subtitle.** There is no field for "what + where" under seven words. `tagline` (87 characters) is too long for Shahar's hero calibration, so each concept uses the header name plus the town from `contact.address`. Proposal: an optional `heroLine` (≤ 50 chars), or a shorter `tagline` from the copywriter ("Surf shop and rooms in Midigama").
- **Schema gap: room galleries.** `rooms[].photo` holds one photo, but the calibration asks for 5–6 per room. All three concepts need `rooms[].photos[]` (≤ 8). Until it exists, the deployer maps galleries from `photos[]` by order (the designer's mockup can hard-wire them; the CMS cannot).
- **Schema gap: an announcement line.** Playbook §9 lists "a 'closed / away until' notice, a short announcement line" as owner-editable, but the schema has only `hoursNote`. This business needs it the most (Midigama closed for low season / Arugam Bay).
- **Instagram tiles:** `instagramTiles[]` (v0.11) wants per-post URLs; the dossier has none. The tiles link to the profile.
- **Booking.com date parameters:** whether `checkin` / `checkout` / `group_adults` are honoured must be tap-tested before concepts 2 and 3 show the optional date row.

## Hand-off checklist

1. Every photograph looked at: seven contact sheets of img-001–163 plus two close-up sheets of 16 candidates; the old-site screenshots; all nine video sheets. Best photograph: img-147 at **2000 px** wide. ✔
2. `agents/designer/references.md` read in full this run. Cited: #1, #2, #4, #5, #6, #7, #9, #10, #14, #15, #20, #26, #28 and the Calibration section. ✔
3. Divergence table: the only business in this run; three rows, no repeat of archetype + first-screen device; one set-piece pattern. ✔
4. First screens: the business's own media (img-147 / vid-009 / vid-009), what + where (header name + "Midigama, Sri Lanka"), the primary action `engine` with the copy's label "Check dates on Booking.com", 1 tap. Rating with the reviews in all three, by the calibration. ✔
5. Facts trace to dossier/copy keys: `rentals`, `brands`, `room_types`/`rooms`, `packages`/`priceList`, `lessons`, `reviews.google`/`booking`, `location.distance_to_beach`/`nearby`, `stay_info`, `business.since`/`owner`/`room_count`, `contact`, `booking.engine_url`. No break name, hours or instructor is used. ✔
6. Every colour has a hex, an asset id and what it shows. White text on the three booking colours: 4.81 / 6.75 / 4.98. ✔
7. Default-look list: none used. White grounds (no cream); no listed display or body face; no petrol/teal/sage/terracotta accent (concept 3's ink `#143746` is Baba's navy stripe used as ink, not as an accent); no all-caps labels, no numbering, no arrows; " | " separators by Shahar's calibration. ✔
8. One thing per concept: the main-road front; the wall of boards; one standing board. ✔
9. Every video listed. vid-009 is the only usable clip; it opens concepts 2 and 3; concept 1 says why it does not (calm, and a vertical 1080 px clip cannot be a desktop full-bleed). ✔
10. Each concept says why it beats the current site, from both screenshots and `existing_site.notes`. ✔
