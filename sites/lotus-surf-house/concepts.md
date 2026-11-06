# Lotus Surf House, Midigama: concepts

Station 4d · creative-director 0.6.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-03.
Inputs: `dossier/lotus-surf-house/dossier.json`, `audit.json` + `audit.md` (and the funnel walk screenshots in `funnel/walk/`), `sites/lotus-surf-house/copy/en.json` (passed 4c round 1, `review.md`). All 44 photographs were looked at on five contact sheets plus two close-up sheets of the candidates. The three video contact sheets were checked too. Also read this run: `agents/designer/references.md` in full, `agents/designer/custom.md`, the gold README and notes. Gold pages opened in Chromium at 1440 and 390: Global Surf `picked`, `postcard`, `the-sign`, `try-your-week`, `the-lavish-haven.html`, `ka-surf-hostel.html` and `layday-surf.html`. The other business in this run is `sites/cheeky-monkey/concepts.md`. No `stock/` folder exists, and none is needed (§2).

Colours were sampled with `ffmpeg` area-averaged crops (`crop=w:h:x:y,scale=1:1:flags=area`), with each crop checked on sight before its value was kept. The crop is given as `w:h:x:y` in original pixels so anyone can repeat it.

---

## 1. What this business actually is

It is a family house on Indhana Road, 50 m from Midigama railway station and about 250 m from Midigama Beach (`location.distance_to_station`, `distance_to_beach`). It runs in two halves. Downstairs is the old guesthouse: five fan rooms that open onto a shady garden with a hammock and a ping-pong table under thatch. It used to be called "Yelum Guest House", and Google still lists it under that name (`business.former_names`). Upstairs are three new King Rooms with A/C, hot water and balconies into the trees, built in 2024–2025 together with a larger roof terrace where a Buddha sits on a carved pedestal (`business.recent_works`, img-021).

Guests do not come for the building. They come for Yelum, his mother's breakfast (coconut roti and dhal) and the walk to Lazy Left and Lazy Right. Booking.com rates the staff 9.9 (`reviews.booking.subscores`). The house's one public problem is that guests booked the old rooms from photos of the new ones (audit F4, `reviews.critical_themes`). So the honest way to sell this house is **floor by floor**.

## 2. What the material can and cannot carry

### Video, the business's own (`dossier.videos[]`)

| id | what | length · size | usable? |
|---|---|---|---|
| vid-001 | "Coastal Stay Journal" listicle. A QR code is burnt into every frame, most shots are AI or stock hotels, and the few Lotus frames are the Booking photos animated | 161.7 s · 1920×1080 | **No.** Third party, licence unknown, mostly not this place |
| vid-002 | "Travel With Sandhya". Title cards, then real footage of the roof lounge, the garden lawn, an aerial over the palms, the balcony and surf selfies | 108 s · 1920×1080 | **No.** It is the only real moving footage of the place, but it sits on a third-party channel with an unknown licence, and it is not known where the surf clips were filmed. **Pitch point:** ask Yelum whether it is his |
| vid-003 | "Travel With Sandhya". Pans over stills between black data cards | 173.8 s · 1920×1080 | **No** |

**No usable video, so no concept opens on video.** Each concept repeats this below. No hero-loop timestamps are given, because cutting any of these clips would mean using footage we have no right to.

### Photographs, the business's own

There are 44 files, all property-uploaded to Booking.com and all `business-owned`. **The largest is 1600 px wide and none reaches 1920 px.** Nineteen are ≥ 1200 px on the long edge. Eleven repeat a view already in the set (`same_view_as`). The set covers bedrooms (the new King rooms dominate), bathrooms, the garden, the gate, the sign and the roof terrace. Nothing shows the beach, the breaks, surfing, breakfast or the people. The 2021 shots of the ground-floor rooms (img-026, 027, 029, 032, 043, 044) are fisheye phone pictures.

The ten strongest:

| # | asset | px | what it is | role it can hold |
|---|---|---|---|---|
| 1 | **img-019** | 1200×1600 | The carved wooden garden gate in a slate wall under a leaf canopy, with the garden glowing through the open doorway | **Phone full-bleed** (1200 px covers 390 px at 3×). Desktop: half-width full-height panel |
| 2 | **img-002** | 1600×1200 | King room: mosquito-net canopy with blush trim, floor-to-ceiling glass open onto a balcony with rattan chairs and jungle | Largest landscape. Full-width ≤ 1600 CSS px at 1×. Room gallery lead |
| 3 | **img-020** | 1600×1200 | The garden under the shade tree: hammock, lawn in dappled sun, ping-pong table beyond | Full-bleed landscape (16:9 crop = 1600×900 native) |
| 4 | **img-025** | 1200×1600 | Through the King room's glass door to the balcony chairs, palms and sky | Portrait print, or phone full-height |
| 5 | **img-021** | 1200×1600 | Roof terrace: the Buddha on a carved pedestal, yoga mats, palms behind | Portrait panel |
| 6 | **img-022** | 1199×1600 | Close-up of the bronze Buddha with offerings, among them a violet blossom | Portrait detail |
| 7 | **img-001** | 1280×960 | Blue-and-yellow ping-pong table in sun, guest wing behind (Booking's own lead photo) | 3:2 panel |
| 8 | **img-018** | 1200×1600 | The entrance sign "Lotus Surf House / MIDIGAMA" in metal script on a slate wall | Small print. It is the source of the type reasoning (§4) |
| 9 | **img-004** | 1199×1600 | Roof terrace table with wooden chairs and trees behind | Portrait panel |
| 10 | **img-010** | 1600×1200 | King room bed under the net, glass doors to the balcony | Gallery |

Also useful: img-005 (1199×1600, ping-pong under thatch), img-035 (1200×1600, upstairs balcony between palms), img-015 / img-034 / img-008 / img-003 (King room and bath, 1600 or 1200), img-032 (1600×1388, the red-cement porch of the garden wing), img-009 (1024×768, garden and guest wing; too small for more than a card).

**Largest usable width: 1600 px** (img-002, img-010, img-020). That clears the 1200 px hard floor for full-width, but not the 1920 px target. So:

- A **landscape full-bleed is possible on desktop only at 1× density**; at 2× it softens. Phones are fine: a 4:5 crop from a 1200-tall original is ≥ 960 px wide.
- A **portrait full-bleed is perfect on phones** (img-019, img-025, img-021 at 1200 px wide) and is never stretched across a desktop. On desktop a portrait image becomes a full-height half or a print.
- **The ground-floor rooms are weak photographs.** They are fisheye images from 2021. They appear as **4:5 centre crops** (references #26), at most 1:1 of native size, and never as a lead image. They must still appear (F4): the page sells what a guest will actually sleep in.

### Atmosphere

There is no `stock/` folder, and none is wanted. The garden, gate, roof and balconies carry the page. Commons photos of Midigama beach would be the only way to show the wave, and showing a beach the house did not photograph next to its own pictures risks the F4 problem again ("it did not look like the photos"). The surf appears in words (the guests' quotes) and as the distance, not as borrowed pictures.

### Words (`copy/en.json`)

- **Short, worth setting large:** the headings "In the garden", "Yelum", "Breakfast", "Old rooms and new", "Up on the roof", "Getting here". These are the floors of the page. Also `closing` (87 characters).
- **The best sentence on the page:** Yelum's own *"The standard rooms may not be the newest, but they are popular with many vacationers due to their charm."* It is the F4 answer in the owner's voice and it belongs beside the garden rooms.
- **Long:** 12 verbatim testimonials, 135–492 characters. Fiona's (breakfast on the porch, coconut roti, the 3 am welcome) and Svenja's (roof yoga, "4 surfspots") are the strongest. Katsiaryna's fan-room warning is in the set too, and it stays.
- **`tagline`** at 58 characters is too long for a hero subtitle (calibration: "very short"). See §6.

### Numbers

Booking.com **9.0/10, 125 reviews**. Google **4.9/5, 78 reviews**. Both were captured 2026-11-03. Beach 250 m and station 50 m (both Booking.com). Breakfast 8–10. Check-out 11:00–12:00, check-in at any hour. Rooms of 20–25 m². Four room types: three on the ground floor, one upstairs.

### Gaps (and which ones to design around)

- **No price:** price means "Check dates on Booking.com". The page never prints a nightly rate.
- **No WhatsApp, no email:** the secondary action is `tel:+94774647541` only.
- **No photos of the beach, the waves, breakfast or Yelum.** This is the gap to **design around**. The two things guests praise most, the hosts and the breakfast, become a **type-led moment** set in Fiona's own words, not an empty photo slot.
- **No break named by the business:** Lazy Left and Lazy Right come from guests. The copy does not use them, and neither do the concepts.
- **No Instagram:** there is no feed section (calibration asks for one). This is a pitch point.
- **No video:** pitch point. Footage of the 250 m walk to the beach is the first thing to shoot.

## 3. The page archetype for this business: **the house, floor by floor**

The page is the house in section, walked bottom to top and back out. You come through the gate, into the garden and the fan rooms on the ground floor, sit on the porch where breakfast happens, climb to the new King Rooms with A/C and balconies, go up to the roof, and leave by the gate for the station and the beach.

It belongs to this business and to no other in the run, for two reasons:

1. **Its offer is literally split by floor.** Fan and garden downstairs, A/C and balcony upstairs. The single most damaging fact about its current listing is that the floors were blurred (audit F4).
2. **Its photographs are of a house, not a road or a shop.** Cheeky Monkey's archetype is a *visit off the main road*: horizontal, past a shop counter, with the road outside. Lotus is *vertical and inward*: gate, garden, stairs, roof.

impeccable mode: **Persuade**. The visitor succeeds when they tap through to Booking.com, or call, already knowing which floor they are booking.

**The order, shared by all three concepts** (playbook §3; the audit's `offer_framing` governs 2–5):

1. **The gate:** the first screen.
2. **The house at a glance:** the booking section head, in `recommended.above_fold` order: what + where (`tagline`) → spot ("Midigama Beach 250 m", the `spot` line) → included ("Breakfast included, 8–10") → price ("Live dates on Booking.com") → trust (9.0/10 Booking.com, 125 reviews · 4.9/5 Google, 78 reviews, each with "3 Nov 2026") → the primary action + Call.
3. **Ground floor: the garden.** "In the garden", then the three garden room types, each with its gallery and "Fan and mosquito net; no air conditioning and no hot water" stated plainly (`rooms[].note`), and Yelum's "Old rooms and new" quote beside them.
4. **The porch: Yelum and breakfast.** "Yelum", "Breakfast" and Fiona's quote. Type-led, with one print of the porch (img-032).
5. **First floor: the King Rooms.** One room type, sold big with a six-photo gallery, "Air conditioning, fan, mosquito net and hot water". `stayInfo` sits as one " | " line under it.
6. **The roof.** "Up on the roof", img-021 / img-022 / img-004. The amenities follow as one " | " paragraph (calibration: compact).
7. **Guests' words:** ratings with count, source and date, and the verbatim quotes in a dot slideshow.
8. **Out the gate: getting here.** The station at 50 m, the copy's distances, the old name (Yelum Guest House), the map as a designed button, and good to know (`stayInfo.note`).
9. **Closing** (`closing` + the action + Call) and the **footer**. There is no Instagram block, because there is no account.

`recommended.above_fold` is the order of section 2 and of the expanded phone bar. It is not crammed into the first screen. **Taps to book: 1** in every concept. The hero button is a plain `<a href="https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html">` with the copy's label "Check dates on Booking.com", so it works with JS off. The persistent phone bar carries the same link plus a phone icon button (`tel:+94774647541`). No WhatsApp or email is shown, because neither is published.

**Forecast: no**, in all three. The business names no break. Lazy Left and Lazy Right are guests' words (`location.spot.origin_note`), and the dossier records no dossier-spot → Rosa-spot mapping. Showing "Midigama" as the spot would be the nearest-other-spot error.

**Scroll set-piece: no**, in all three. There is no usable own video, and no photograph is ≥ 1920 px (zero of the eight needed). This business does not qualify.

**Embeds: none.** The map is a designed "Open in Google Maps" button to `contact.mapUrl`.

---

## 4. Three concepts

### Concept 1 · calm: **"The gate"**

**The idea in one sentence.** A quiet, bright page that opens on the carved garden gate and then walks you through the house one floor at a time, in plain sections and plain words.

**The one thing.** The gate (img-019): weathered carved teak doors standing open in a slate wall, under a leaf canopy, with sunlit garden inside. A guest who has stayed would know it in a second. Nothing else on the page is that loud. The gate photograph is used once, on the first screen.

**Structure.**

1. **Hero:** see the first screen.
2. **The house at a glance:** white. One centred column, 640 px wide.
   - `tagline` in the text face, 22 px.
   - Under it, one " | " details line: "Midigama Beach 250 m (Booking.com) | Breakfast included, 8–10 | Check-in any hour". All facts from the copy.
   - Two rating blocks side by side: "9.0/10 Booking.com | 125 reviews | 3 Nov 2026" and "4.9/5 Google | 78 reviews | 3 Nov 2026", each linking to its listing.
   - The accent button, and a secondary "Call" button with a phone icon (ink outline, never underlined text).
3. **Ground floor:** tint ground.
   - Script title **"In the garden"**, then the copy's intro body.
   - **img-020 at 16:9, container width (≤ 1200 px CSS)**, the shade tree and the hammock.
   - Then the three garden rooms **stacked**. Each is a 4:5 dot slideshow at 480 px wide beside a text column (6/6 split): label | beds, sleeps | the full `rooms[].note` | "Check dates on Booking.com".
     - Standard Double or Twin: img-029, img-032, img-030, img-009.
     - Double or Twin: img-029, img-032, img-009 (Booking ties the same photos to both twin types; the designer does not invent a difference).
     - Deluxe Queen: img-043, img-028, img-044.
   - All crops are 4:5 from the centre (#26), shown at ≤ native size. The fisheye edges are cropped away.
   - Between the first and second room sits the "Old rooms and new" heading and Yelum's quote, set large (32 px) in the text face. It is the honest word on these rooms, in his voice.
4. **The porch:** white, a 5/7 split.
   - Left: img-032 (red-cement porch, rattan chairs) as a **matted print** at 4:5, 420 px (#9).
   - Right: script title **"Yelum"** + the copy, then **"Breakfast"** + the copy, then Fiona's quote in full in the text face at 20 px, with "Fiona, Australia | Booking.com | Dec 2024".
5. **First floor:** tint ground.
   - Script title **"The King Rooms"**, the copy's ¶2 ("The King Rooms upstairs are new…").
   - **One full-container 3:2 dot slideshow of six photos:** img-002, img-010, img-015, img-025, img-034, img-008.
   - Under it, one text row: King Room with Balcony | 1 extra-large double bed, sleeps 2 | "Upstairs, 25 m². Air conditioning, fan, mosquito net and hot water." | "Check dates on Booking.com".
   - Then `stayInfo` as one " | " line: "Check-out 11:00–12:00 | Check-in at any hour | Cash only".
6. **The roof:** white.
   - Script title **"Up on the roof"** + the copy.
   - A 3-up row of 4:5 crops (img-021, img-022, img-004), each 380 px, at ≤ native size. No captions; alt text carries the description.
   - Under the row, the 12 amenities as one " | " paragraph with their notes ("Airport shuttle (additional charge)").
7. **Guests:** tint ground.
   - The two rating blocks again, larger.
   - One quote at a time, centred, in a dot slideshow: all 12, Katsiaryna's fan-room note included.
8. **Out the gate:** white, two columns without rules.
   - Left: script title **"Getting here"**, the copy's three paragraphs, and the address in Google's words.
   - Right: "Open in Google Maps" and "Call" as two designed buttons, and "Good to know" (`stayInfo.note`).
9. **Closing:** tint ground. `closing` centred in the script at 40 px, then the accent button and "Call". Below it, a real footer: name, address, phone button, "Booking.com" button, and the old name line.

**The first screen.**

- **Phone (390×844):** img-019 **full-bleed, 100svh**, a 9:19.5 crop from the centre-left of the 1200×1600 original. The doorway and its sunlit garden sit just below centre, the canopy fills the top and the tree trunk holds the right edge. The grade is a light lift of the leaf shadows (+5%), with no tint.
- **Desktop (1440×900):** a **6/6 split.**
  - Right: img-019 fills the right half **edge to edge, full height** (720×900 CSS from a 1200×1600 original, so ≤ 1.25× at 1× density).
  - Left, on the white ground: the header (wordmark "Lotus Surf House" in the text face, and a small accent button). Vertically centred in the left half: **"Lotus Surf House"** in the script at 64 px, "Midigama, Sri Lanka" under it in the text face at 18 px, and the accent button **"Check dates on Booking.com"**.
- **On the phone**, the same three lines are centred over the photograph in white. They sit over the darkest part of the canopy; a soft radial shade of 25% ink behind the text only, sized to it, keeps ≥ 4.5:1. The designer checks the pixels.
- **Rating: with the guests, not in the hero.** The ratings are strong, but this page's first promise is the place: the gate and the garden. Booking.com and Google already lead with the score, so here the numbers come one scroll later, in section 2, in the audit's order.

**Why it beats what we already have.** There is no website. The comparison is the Booking.com listing a visitor reaches today (`funnel/walk/04-booking-com-fold.png`: a blue bar, a ping-pong photo in a carousel, "Choose dates to see prices" on yellow) and the gold bar, Global Surf `picked` / `postcard`. Against the listing, the first screen is the house itself: its gate, its name and one button, with no other hotels and no sign-in. Against Global Surf, it meets the same discipline (one title, one short subtitle, one button, the business's own best image, unobstructed) with a portrait image the phone shows edge to edge at native sharpness. A desktop visitor gets a composed split instead of an upscaled photograph.

**Colour** (sampled; crops `w:h:x:y` in original px).

| role | hex | asset | what it is |
|---|---|---|---|
| ground | `#FFFFFF` | img-019 | the page paper, white. The photographs' brightest neutral, the sunlit path stone `#F0EDEE` (img-019, `20:20:420:1300`), is used as the tint |
| tint ground | `#F0EDEE` | img-019 | the sunlit step stone at the gate's foot |
| ink | `#293408` | img-019 | the deep shade under the leaf canopy (`40:40:200:150`). 13.2:1 on white |
| place colour | `#7C7066` | img-019 | the weathered teak of the gate doors (`60:200:20:1000`). Used only for the script titles' colour on white (4.9:1) |
| place colour | `#80A239` | img-019 | sunlit leaves (`200:150:300:100`). Used only as the slideshow's active dot |
| **booking accent** | **`#B8431C`** | **img-032** | **the red-cement porch floor of the garden wing.** Sampled `#D45022` (`30:30:1100:1000`); white text on it is only 4.2:1, so the button is the same hue at lower lightness, `#B8431C` (5.4:1). Used only for booking actions |

The red-oxide cement floor is the ground floor's own surface, on the porches where breakfast is served. It is a saturated brick red on a cool white ground, **not** a muted terracotta on cream (default-look list). It would look wrong beside a cream or sand ground, where it would turn muddy (house rule 4), and beside the pastel blush of the net trim, which belongs to concept 3.

**Type.** **Hanken Grotesk** (400/600) for everything people read and every control: a plain, warm grotesk with a single-storey g, readable at 16 px on a phone in sun. **Parisienne** for section titles only (36–64 px). The house's own entrance sign (img-018) spells "Lotus Surf House" in connected metal script over "MIDIGAMA" in spaced capitals. Parisienne is that hand, and the site's titles are written as the sign is. Two families, Latin subset, about 70 KB. Neither is on the default-look list, in gold, or in Cheeky Monkey's concepts. Each title word ("In the garden", "Yelum", "Up on the roof") is checked at title size for readability.

**Motion.** Micro only, no canvas (calm). These are the moves:

- **Hero media:** img-019 settles once on load, from scale 1.03 to 1.0 over 1.2 s, ease-out. Nothing else moves on the first screen, and there is no title reveal.
- Buttons press to 0.97 over 120 ms.
- Slideshows slide 350 ms, and the active dot stretches to a short bar in `#80A239`.
- The phone bar slides up 240 ms once the hero leaves view.
- The quotes cross-fade 300 ms.

`prefers-reduced-motion`: there is no settle, and slides cut. JS off: slideshows become horizontal scroll-snap rows, the phone bar is static at the foot, and every booking link works.

**The booking pattern.** Morgan's Rock's one action per offer (#7) plus **Kube's bottom-of-hero full-width button on mobile** (#4). Every room carries its own "Check dates on Booking.com"; Booking.com cannot preselect a room type from a URL, so it goes to the listing. The phone bar appears after the hero: the accent "Check dates on Booking.com" (75%) and a phone icon button (25%). One accent colour (#6). Nothing covers content on load (#20). Taps: hero → Booking.com = **1**.

**Photographs.** img-019 (hero, once). img-020 (ground floor, 16:9). The garden rooms: img-029, 032, 030, 009, 043, 028, 044 (4:5 crops, ≤ native). img-032 (porch print). The King Rooms: img-002, 010, 015, 025, 034, 008 (3:2). The roof: img-021, 022, 004. None is upscaled beyond 1.25×, and none is captioned. First load: the hero AVIF, about 180 KB at the 1200 px phone crop, plus fonts and CSS. That is about 0.4 MB, inside the 1.5 MB budget.

**Forecast:** no (§3). **Scroll set-piece:** no (§3).

**What would make this concept fail.** The desktop split could read as "a photo and some text", a template; it lives or dies on the gate photograph being given the full height and on the script title being beautifully set.

---

### Concept 2 · interactive: **"Dappled"**

**The idea in one sentence.** The page opens in the garden under the shade tree with its sunlight moving, and then lets the visitor switch the house floor by floor (Garden · Upstairs · Roof), seeing the right rooms and the plain fan/A-C truth for each.

**The one thing.** The shade tree's light on the lawn (img-020): dappled sun, a hammock, the ping-pong table far back. The copy's first words are "The house is in a shady garden". Nothing else on the page moves the way the light does.

**Structure.**

1. **Hero:** see the first screen.
2. **The house at a glance:** white. It holds the same audit-ordered content as concept 1 but is laid out as a **4-up row of compact facts with small line icons**: "Midigama Beach 250 m" | "Breakfast included, 8–10" | "Live dates on Booking.com" | "9.0/10 Booking.com, 125 reviews · 4.9/5 Google, 78" (dated). Under the row sit the accent button and Call. On a phone the row becomes a 2×2 grid.
3. **The floor switch (the booking section):** tint ground.
   - Script title **"Choose your floor"**.
   - A three-segment control, **Garden floor | Upstairs | Roof**, with a sliding pill in the table-leg yellow.
   - The stage under it changes with the floor:
     - **Garden floor:** a 7/5 split. Left, a 4:5 dot slideshow of the ground-floor rooms. Right, three **tile buttons**, one per garden room type (label | beds | "Fan, no A/C, no hot water" as a chip); the open tile shows its full note and "Check dates on Booking.com". Then Yelum's "Old rooms and new" quote.
     - **Upstairs:** the King Room's six-photo 3:2 slideshow, the note with an "A/C | Hot water | Balcony" chip row, and the button.
     - **Roof:** img-021 / img-022 / img-004 and "Up on the roof". No booking tile here: the roof is shared, so it shows the main button only.
   - JS off: the three floors stack as three sub-sections with anchors.
4. **In the garden:** white. **img-001** (blue ping-pong table in sun) at 3:2, 7 columns, beside the copy's intro block. Below them, the amenities as one " | " paragraph.
5. **The porch:** tint ground, type-led. Script **"Breakfast"** with the copy, then **Fiona's quote set at 28 px** across eight columns, and **"Yelum"** + the copy beside it. One matted print of img-032 at 360 px.
6. **Guests:** white. Two big rating figures (rolling digits on first view) and a **swipe row with next-card peek** of the 12 quotes (#14): cards 320 px wide with first name, country, month and source.
7. **Out the gate:** tint ground. "Getting here" with the copy, a " | " distances line, "Open in Google Maps" + "Call" buttons, and good to know.
8. **Closing:** white. `closing` in the script, then the accent button + Call, then the footer.

**The first screen.**

- **img-020 full-bleed, 100svh.**
  - Desktop: a 16:9 crop from the 1600×1200 original (1600×900 native, centred on the hammock and the lawn's light patches).
  - Phone: a 4:5 crop from the centre (960×1200), the tree trunk left and the lawn and the hammock on the right third.
- **The WebGL piece (the main item) runs on the photograph itself.** A fragment shader takes a luminance mask of the photo's own sun patches on the lawn and the wall, then drifts that mask very slowly with low-frequency noise (a 9 s loop, displacement ≤ 6 px, brightness change ≤ 6%). The patches of sun **breathe and shift as if the leaves were moving in a breeze**. Nothing is added on top: no particles, no overlay, no colour. Only the light that is already in the picture moves.
- The header (wordmark left; "Rooms | Getting here" + a small accent button right) sits over it.
- Centred horizontally and vertically: **"Lotus Surf House"** in the script at 60 px desktop / 40 px phone, white, with "Midigama, Sri Lanka" under it at 18 px, then the accent button **"Check dates on Booking.com"**. A soft radial shade of 20% ink sits behind the text only.
- **Rating: with the guests, not in the hero** (calibration: "never a tagline + rating + button stack over the media"). It comes in section 2.

**Why it beats what we already have.** Booking.com's mobile fold (`04-booking-com-fold.png`) shows the ping-pong table in a 1/42 carousel under a search bar and a score badge. The gold bar here is Global Surf `picked`, whose hero is the lodge's own moving footage. This first screen gives Lotus, which has no footage, the same thing that page has: **a place that is alive**, from its own photograph, with one title and one button. One scroll later the floor switch answers the question Booking.com gets wrong (which rooms have A/C) in one tap.

**Colour.**

| role | hex | asset | what it is |
|---|---|---|---|
| ground | `#FFFFFF` | img-020 | white paper; the tint below is the sampled light |
| tint ground | `#E1E1E4` | img-020 | the white sky through the canopy (`20:20:1500:60`) |
| ink | `#664D25` | img-005 | the underside of the ping-pong pavilion's thatch (`200:100:500:150`). 7.9:1 on white, 6.1:1 on the tint |
| place colour | `#517A24` | img-020 | the shade tree's canopy (`200:100:200:100`). Used only for the floor-switch icons |
| place colour | `#E1B910` | img-001 | the ping-pong table's yellow frame (`30:6:215:663`). Used only for the floor-switch's sliding pill, never under text |
| **booking accent** | **`#0165A3`** | **img-001** | **the ping-pong table top in sun** (`60:30:280:570`). White text 6.2:1. Used only for booking actions |

The blue table is the garden's loudest colour and Booking.com's own lead photograph. Here it becomes the button, and nothing else on the page is blue. It would look wrong beside Booking.com's own navy (`#003B95`) in the header of a visitor's next tab; the designer keeps it the table's cyan-leaning blue, not a corporate navy. It would also look wrong on a cream ground. No petrol or teal is anywhere on the page.

**Type.** **Be Vietnam Pro** (400/600) for reading and every control: round, open and generous, with figures that sit well in "250 m" and "9.0/10". **Patrick Hand** for section titles only (34–56 px): an upright, readable handwriting, like a note left on the garden table. It is the garden and guestbook voice of this concept, against concept 1's sign script. Two families, about 75 KB.

**Motion.** **Main item: the dappled-light shader on img-020.** It uses raw WebGL with one full-screen quad and one texture, about 6 KB of JS, started after first paint, with the photo `<img>` as the LCP under it. It pauses off-screen and when the tab is hidden.

Micro-animations through the page:
- The floor pill slides between segments (260 ms, ease-out-quint), and the stage cross-fades with a 40 px rise (220 ms).
- The room tiles expand with a spring (no overshoot over 4%).
- The rating digits roll once on first view (400 ms).
- The quote row drags with momentum and rubber-bands at its ends.
- The dots stretch to bars; the buttons press to 0.97; on `pointer: fine`, the accent button lifts 2 px with its shadow.
- No heading reveals, no parallax.

`prefers-reduced-motion` / Save-Data / no WebGL: the still photograph, unchanged. JS off: the floors stacked, the quotes as a scroll-snap row, every link live.

**The booking pattern.** **Tile-tap inside the page** (White Desert, #2, and #7: each tile carries its facts and its own action). The visitor picks a floor, then a room tile, and sees its plain facts and its own "Check dates on Booking.com". The hero and the persistent phone bar bypass it, so taps = **1**. The phone bar shows the accent "Check dates on Booking.com" + a phone icon button, and it expands (tap ˄) into the audit-ordered summary of section 2. Booking UI JS loads on first interaction (#5).

**Photographs.** img-020 (hero, with shader). img-001 (garden, 3:2). The ground-floor room slideshow: img-029, 032, 030, 043, 028 (4:5). King: img-002, 010, 015, 025, 034, 008. Roof: img-021, 022, 004. img-032 (porch print). First load: the hero AVIF at about 220 KB + 6 KB shader + fonts, about 0.45 MB.

**Forecast:** no (§3). **Scroll set-piece:** no (concepts 1 and 2 never carry one; §3).

**What would make this concept fail.** If the moving light is visible as an effect, as "a shimmer over a photo", it repeats the Global Surf "waterline" mistake Shahar called an overlay. The test is that a viewer thinks it is footage. If it fails that test, the still ships.

---

### Concept 3 · unique: **"Under the net"**

**The idea in one sentence.** Every room in this house sleeps under a mosquito net, so the page opens by drawing the King room's blush-trimmed canopy net on white, in WebGL, hanging over a print of the balcony view, and the visitor's pointer or tilt lifts the net aside to look through.

**The one thing.** The canopy net with its blush trim (img-002, img-010, img-015). Every room type lists "Mosquito net" (`room_units[].facilities`). The net is the shape of a night here, and it frames the page's first screen and its two booking panels. Nowhere else (#28).

**Structure.**

1. **Hero:** see the first screen.
2. **The house at a glance:** white. A centred column, the same audit order as concept 1, set as a **short paragraph of facts** in the text face at 22 px with the figures in the ink: "A guesthouse in Midigama… Midigama Beach is 250 m away (Booking.com). Breakfast is included, 8–10." It is the copy's own sentences, with no new words. Then the two dated rating blocks, the accent button and Call.
3. **The floors, as a house section:** tint ground.
   - On desktop, a **three-row editorial grid**, read top-down like the house: **Roof** (img-021 at 4:5, 4 columns + "Up on the roof"), **Upstairs** (img-002 at 3:2, 8 columns + the King note), **Garden** (img-020 at 3:2, 8 columns + "In the garden").
   - Each row's photograph steps across the 12-column grid like stairs (columns 1–4, then 3–10, then 5–12) (#10, #13).
   - Each row has one small button, "See the room" or "See the garden", that scrolls to its section.
   - Phone: the three stack, Roof first, so the house is read from the top down.
4. **Upstairs: the King Rooms.**
   - Script title **"The King Rooms"** with the copy's ¶2.
   - A **2-up slideshow pair**: 3:2 bedroom views (img-002, 010, 015) and 4:5 balcony and bath views (img-025, 035, 008). Each has its own dots.
   - The room row with "Check dates on Booking.com".
5. **The garden rooms:** white.
   - Script title **"Old rooms and new"** with Yelum's quote at 30 px.
   - Then a **true masonry** of the ground-floor photographs, each keeping its own ratio, all at ≤ native size: img-029, 032, 030, 043, 028, 009.
   - Beside them, the three room types as a list with their notes, each with its button.
6. **The porch:** tint ground. A type-led moment: Fiona's quote across the full container at 30 px, with "Yelum" and "Breakfast" as two short columns under it. img-022 (the Buddha and the offerings) is set small as a matted print, as the one picture of care in the house.
7. **The roof:** white. img-021 at 4:5 left (5 columns) and img-004 at 4:5 right (4 columns), offset vertically by 120 px (two-photo offset, #10). The amenities follow as one " | " paragraph.
8. **Guests:** tint ground. One large quote at a time in the text face, with dots, and the ratings above.
9. **Out the gate:** img-019 (the gate) as a 4:5 print, 420 px, left. Right: "Getting here", the copy, map + Call buttons, and good to know.
10. **Closing:** white. A smaller drawn net hangs over the closing panel (the second use of the shape). `closing` in the script, the accent button and Call, then the footer.

**The first screen.**

- **A white page** (`#FFFFFF`). Centred: **img-025** (through the King room's glass door to the balcony, the rattan chairs, the palms and the sky) as a **portrait print**: 420×560 CSS on desktop from the 1200×1600 original, ≤ native at 2×; on a phone 300×400.
- **Over the print, a drawn mosquito net hangs from a thin square frame**, wider than the print (desktop ≈ 640×720 CSS; phone ≈ 340×600). The net is fine white mesh, ~4% opacity per thread, so the photograph reads clearly through it. It has a **blush trim along its hem** and gathers loosely at both lower corners, the way the nets in img-002 and img-015 are tied.
- **The net is WebGL cloth:** a 40×40 vertex grid pinned at the frame. Pointer movement (or device tilt after a tap grants permission) pushes it gently aside where the visitor looks, and it settles back with damping.
- Above the frame, centred: **"Lotus Surf House"** in the script at 56 px desktop / 40 px phone, in the ink. Under it, "Midigama, Sri Lanka" at 18 px. Below the frame, the accent button **"Check dates on Booking.com"**.
- Header: wordmark left; "Rooms | Getting here" and a small accent button right.
- **Rating: with the guests.** This page's first promise is the night under the net and the trees outside; numbers would break the stillness of it.

**Why it beats what we already have.** No website. The comparison is the Booking.com listing (`04-booking-com-fold.png`) and the gold bar. Gold here means `the-lavish-haven.html`, a drawn shape of the place holding live material on white, which is the precedent this follows in **method only** (#27, #28). The Lavish pool, a cut corner of water, and this net, a soft hanging cloth, share no form, colour or type. Against the listing, a visitor sees in one look what the stay feels like: under a net, with a balcony into the trees. The listing needs 42 carousel swipes to say that.

**Colour.**

| role | hex | asset | what it is |
|---|---|---|---|
| ground | `#FFFFFF` | img-002 | white paper: the net and the sheets |
| tint ground | `#E1F2FD` | img-025 | the sky over the balcony through the glass door (`40:40:700:400`). A cool sky-white |
| ink | `#392A1D` | img-021 | the dark carved pedestal under the roof Buddha (`30:100:600:500`). About 14:1 on white |
| place colour | `#BDA38E` | img-002 | the blush trim along the net's hem (`6:6:430:1078`). Used only on the drawn net's hem (hero and closing), never under text |
| place colour | `#9B7A5C` | img-002 | the blush curtain beside the glass doors, in shade (`30:100:1500:450`). Used only for the slideshow's active dot |
| **booking accent** | **`#5E4699`** | **img-022** | **the violet blossom among the Buddha's offerings.** Sampled `#9984C7` (`6:6:990:1110`); white text on it is 3.2:1, so the button is the same hue at lower lightness, `#5E4699` (7.5:1). Used only for booking actions |

The violet is the one saturated colour the roof gives, a flower in an offering at a house named Lotus. It would look wrong beside concept 1's brick red or concept 2's table blue, which is why each concept keeps its own. It would also look cheap as a gradient; it stays flat.

**Type.** **Gelasio** (400/500) for everything people read and every control: a sturdy text serif, metric-compatible with Georgia so the fallback does not reflow. Its quiet book texture suits a page that reads like a stay rather than a sales sheet. **Allura** for section titles only (36–56 px): a soft, flowing script whose long connected strokes drape like the net's gathered hem. Two families, about 80 KB.

This is not the default look. That is a high-contrast serif *display* face on a *cream* ground; here the serif is the small reading face on a cool white, and the display is a script. Neither face is on the default-look list, in gold, or in Cheeky Monkey's concepts.

**Motion.** **Main item: the WebGL net over the photograph.** A cloth simulation (Verlet, 40×40, about 12 KB of hand-written WebGL) runs on the drawn net only. The photograph underneath stays an untouched `<img>` and is the LCP. The net is drawn after first paint, and it **parts toward the pointer and settles back** with damping. On a phone it sways once on load (1.2 s) and then follows tilt only after a tap grants motion permission; otherwise it stays still.

Micro-animations through the page:
- The accent button's lower edge **sags 2 px like the hem** on press.
- The slide-down booking panel (below) arrives with the same damping as the net.
- Slideshow dots stretch to bars; the masonry photos lift 4 px on hover (`pointer: fine`).
- The quote cross-fades at 300 ms.
- The smaller net over the closing panel moves only while that panel is in view.
- No heading reveals, no parallax.

Fallbacks:
- **`prefers-reduced-motion`:** the net is drawn still, as a static SVG of the same mesh and hem.
- **No WebGL:** the same SVG.
- **JS off:** the SVG, and every link works.
- **Weak phone:** the cloth drops to a 24×24 grid, or to the SVG if the first frames take > 20 ms.

**The booking pattern.** **A slide-down panel from the top** (Tandjung Sari, #1), opened by the phone bar's second button **"Choose a room"** and by the "See the room" buttons. It is not a right drawer (Cheeky Monkey's concept 3 uses one). Its top edge hangs with the net's hem. Step 1 is **three big tiles** (#2):

- **"Garden room: fan, on the ground floor"**: shows the three garden room types and their notes.
- **"King Room: A/C, upstairs"**: shows the King room and its note.
- **"Not sure"**: shows Yelum's "Old rooms and new" quote and a **Call** button, so the visitor can ask him first (the audit's closing intent).

The room choices end on "Check dates on Booking.com" (listing URL). Optional `checkin`/`checkout` date fields with floating labels appear only if a tap-through proves Booking.com honours them. Otherwise they are dropped and the panel stays one step.

The panel has a real `/stay/` URL, so it works without JS. The **hero button bypasses it: 1 tap** to Booking.com. Booking JS loads on first interaction (#5).

**Photographs.** img-025 (hero print, ≤ native). The section rows: img-021, img-002, img-020. King: img-002, 010, 015, 025, 035, 008. Garden masonry: img-029, 032, 030, 043, 028, 009. img-022 (porch print). Roof: img-021, img-004. img-019 (out the gate, print). First load: the print AVIF, about 90 KB, + 12 KB cloth + fonts, about 0.35 MB.

**Forecast:** no (§3). **Scroll set-piece:** no. This business does not qualify (no own video, no photograph ≥ 1920 px), so concept 3 carries none.

**What would make this concept fail.** A drawn net can read as a curtain or a cobweb laid over a small photo, a gimmick around a thumbnail. The test is that the print still reads as the subject at a glance and the net is barely there. If the critics say "the photo is too small", the print grows to 520×693 on desktop (still ≤ native at 1.15×) before anything else changes.

---

## 5. Divergence table

The run has two businesses concepted: Cheeky Monkey (`sites/cheeky-monkey/concepts.md`, creative-director 0.6.0) and Lotus Surf House. Concepts from other runs are not part of this run's divergence (base.md 0.3.0). The gold first-screen forms (Global Surf: full-bleed lodge clip with a centred title and coral button; KA: cut-paper banana leaves over type; Layday: a drawn berth; Lavish: a cut-corner pool window) and the gold faces are reused by none of the Lotus rows. KA's garden is a *drawn* canopy around type. Lotus's garden is its own *photograph*, never drawn leaves.

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern | scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| Cheeky Monkey | 1 · calm "The signboard" | walk in off the main road | img-147 full-bleed photograph (board noses framing the main road), "Catch waves, not worries" in Yellowtail + red-fin button | centred container; package tabs; stacked full-width room slideshows; 7/5 shop split with img-122 | `#FFFFFF` + `#EEF1F2` (img-122 wall) | micro only: tab pill, dots, in-view portrait clip | per-offer buttons + persistent phone bar (Morgan's Rock) | — |
| Cheeky Monkey | 2 · interactive "The wall of boards" | same | vid-009 full-bleed 9:16 on phone / three-column triptych of the same reel on desktop, `businessName` in Knewave + magenta button | one segmented "Plan your stay" panel; list + stage room viewer; full-bleed drag strip | `#FFFFFF` + `#EAF3F5` (img-096 mint) | triptych cut, sliding pill, rolling digits, momentum drag, crossfades | inline panel with tiles, optional date params, tel/mailto | — |
| Cheeky Monkey | 3 · unique "Pick your board" | same | vid-009 inside one centred board-shaped WebGL window on white, `featureLine` in Permanent Marker + blue-fin button | portrait package cards with board crops; 2-up room slideshows; masonry shop | `#FFFFFF` + `#FDF1F2` (img-134 sky) | resin-gloss shader, card tilt, board-mask zoom | right drawer / full sheet with a `/plan/` URL; hero bypasses it | image zoom-through (pattern 9): board mask opens to the shop, vid-009 |
| **Lotus Surf House** | 1 · calm "The gate" | **the house, floor by floor** | **desktop 6/6 split: img-019 (carved gate, portrait) full-height right half, name in Parisienne + "Midigama, Sri Lanka" + red-oxide button on white left; phone: img-019 full-bleed portrait with the three lines centred** | centred 640 px column; stacked 6/6 room rows with 4:5 slideshows; 5/7 porch split with a matted print; 3-up roof row | `#FFFFFF` + `#F0EDEE` (img-019 path stone) | micro only: one photo settle on load, dots, bar slide-up, cross-fades | per-room buttons + Kube bottom-of-hero bar → sticky phone bar with tel icon | — |
| **Lotus Surf House** | 2 · interactive "Dappled" | same | **img-020 (the garden under the shade tree) full-bleed landscape with a WebGL shader that moves the photo's own sunlight; centred Patrick Hand title + table-blue button** | 4-up fact row; Garden / Upstairs / Roof floor switch with room tiles; 7/5 garden split; quote swipe row with peek | `#FFFFFF` + `#E1E1E4` (img-020 sky through canopy) | light-drift shader, sliding floor pill, tile springs, rolling digits, momentum drag | tile-tap floor → room inside the page; phone bar expands to the audit summary | — |
| **Lotus Surf House** | 3 · unique "Under the net" | same | **white page: a WebGL cloth mosquito net with a blush hem hanging over a portrait print of the balcony view (img-025 at ≤ native); Allura title above, violet button below** | stepped three-row "house section" on 12 columns; 2-up slideshow pair; true masonry of the garden rooms; offset roof pair | `#FFFFFF` + `#E1F2FD` (img-025 balcony sky) | cloth sim that parts toward the pointer, hem-sag button, damped slide-down panel | slide-down panel from the top (Tandjung Sari) with three tiles incl. "Not sure" → Call; `/stay/` URL; hero bypasses it | — |

No two rows share archetype + first-screen device. The archetypes differ (a roadside visit vs a house by floors). Even setting that aside, the six first screens are six different devices: a street photo full-bleed, a vertical reel, a board-masked reel, a portrait gate split, a light-moving garden photo, and a drawn net over a print. One set-piece pattern exists in the run (Cheeky Monkey's zoom-through); Lotus has none, so nothing is shared. The booking accents (Cheeky: red fin, magenta, blue fin; Lotus: red-oxide floor, table blue, lotus violet) come from different objects. The Cheeky blue-fin and Lotus table-blue buttons sit on concepts with different first screens and type, and the designer keeps them visibly apart (Lotus's is a cyan-leaning `#0165A3`). The type pairs share no face.

**What a visitor would notice is different from Cheeky Monkey:** Cheeky Monkey opens on a road, a rack of boards or one board, all loud surf colour and painted-sign lettering, and walks you *along* a shop. Lotus opens on a garden gate, a garden in moving shade or a net over a bed, is quiet and green-white with a sign-script or handwriting, and takes you *up* through a house. Nothing in Lotus shows a surfboard, a road or a reel.

## 6. For the copywriter, the deployer and Shahar (gaps the concepts hit)

- **Schema gap: a short hero subtitle.** `tagline` (58 characters) is too long for the hero calibration ("very short"), so every concept uses the business name + "Midigama, Sri Lanka" (the town and country from `contact.address`). This repeats Cheeky Monkey's proposal: an optional `heroLine` (≤ 50 characters), or a shorter tagline such as "A guesthouse in Midigama".
- **Schema gap: room galleries.** `rooms[].photo` holds one photo, but all three concepts sell rooms with 3–6 photos (calibration). This is the second business in the run to need `rooms[].photos[]` (≤ 8).
- **Schema gap: which floor a room is on.** The whole archetype groups rooms by floor. Today the floor exists only inside the free text of `rooms[].note` ("Ground floor…", "Upstairs…"). A template should not parse prose. Proposal: an optional `rooms[].group` (owner-named, ≤ 40 characters, e.g. "Garden floor" / "Upstairs"), which would also serve camps with dorms vs privates. Until it exists, the mockup hard-wires the grouping, and the deployer maps it from the note.
- **No Instagram, no video, no photographs of the beach, the hosts or breakfast.** These are pitch points (the calibration's Instagram section is omitted, not faked).
- **Booking.com date parameters:** concept 3's optional date fields ship only if a tap-through proves `checkin` / `checkout` / `group_adults` are honoured on this listing.
- **Copy check for the designer:** the concepts use only copy fields and the dossier's numbers. The section titles "The King Rooms" (concepts 1 and 3) and "Choose your floor" (concept 2) are interface labels, which the template owns, not copy; "King Rooms" is the copy's own wording.

**The one thing I would most want photographed on location:** **a single unbroken clip from the gate to the water.** Out through the carved doors, past the station, the 250 m to Midigama Beach and the break the guests surf. It is the video this business does not have, and the one fact (the walk to the surf) that every guest praises and no photograph shows. Second: breakfast on the porch, with Yelum.

## Hand-off checklist

1. Every photograph looked at: five contact sheets of img-001–044, two close-up sheets (img-019, 002, 022, 018, 021, 001), the video contact sheets, and the Booking.com funnel screenshots. The largest width of the best photograph is **1600 px** (img-002, img-010, img-020). None is ≥ 1920 px. ✔
2. `agents/designer/references.md` read in full this run. Cited: #1, #2, #4, #5, #6, #7, #9, #10, #13, #14, #20, #26, #27, #28 and the Calibration section. ✔
3. Divergence table: includes Cheeky Monkey's three rows (the only other business in the run). There is no repeat of archetype + first-screen device and no shared set-piece. ✔
4. Videos: all three listed, none usable (third-party, licence unknown). This is stated in §2 and applies to every concept. The ten strongest photographs are listed with widths and used. ✔
5. Each concept says why it beats what we have and names the comparison: the Booking.com listing (`funnel/walk/04-booking-com-fold.png`; there is no own site) and the gold bar (Global Surf `picked` / `postcard`, `the-lavish-haven.html`). ✔
6. First screens: own media (img-019 / img-020 / img-025), what + where (name + "Midigama, Sri Lanka"), the primary action `engine` with the copy's label "Check dates on Booking.com", and 1 tap. The rating is with the guests and in section 2, in all three, with reasons given. ✔
7. Facts trace to `en.json` / dossier keys: `rooms[]`, `room_units[].facilities`, `stayInfo`, `ratings[]`, `testimonials[]`, `location.distance_to_beach` / `distance_to_station` / `nearby`, `business.owner` / `recent_works` / `former_names`, `contact`, `booking.engine_url`. No break name, price or hours beyond the copy. ✔
8. Every colour has a hex, an asset id, a crop and what it shows. The two darkened accents are named as darkened, with the sampled value and the contrast. White text on the accents: 5.4 / 6.2 / 7.5. ✔
9. Default-look list: none used. White and cool-white grounds; no listed display or body face; Gelasio is a reading serif on white, not a display serif on cream (reason given). The red-oxide accent is a saturated brick red on cool white, with its reason given. No petrol, teal or sage; no all-caps labels, no numbering, no arrows; " | " follows Shahar's calibration. ✔
10. One thing per concept: the gate; the moving shade on the lawn; the net. Nothing else on each page is louder. ✔
11. Main items: calm uses img-019 with a one-time settle and micro-animations (no canvas); interactive uses the WebGL light shader on img-020; unique uses WebGL cloth over the img-025 print. Micro-animations are named for each. No first screen is a plain cookie-cutter section. ✔
12. `agents/designer/gold/` opened this run: the pages were rendered in Chromium at 1440 and 390, not only the notes read. ✔
