# Sea You Surfers Nest, Midigama: concepts

Station 4d · creative-director 0.6.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-22.

Inputs: `dossier/sea-you-surfers-nest/dossier.json`, `sources.md`, `audit.json` + `audit.md` (and the walk screenshots in `assets/walk/`), and `sites/sea-you-surfers-nest/copy/en.json`, which passed 4c in round 2 (`review.md`). All 82 photographs were looked at, first on five contact sheets of img-001 to img-082, then at 600 px for the 25 landscapes and the hero candidates, and the sign (img-001) at full size. I also read, this run: `agents/designer/references.md` in full, `agents/designer/custom.md`, the gold README and notes, and `agents/designer/scroll/playbook.md` §2.3. The gold pages were rendered in Chromium at 1440 and 390 with `tools/shoot.mjs`: Global Surf `the-sign`, `try-your-week` and `postcard`, and `the-lavish-haven.html`. The Global Surf media are not in git, so its photo and video slots render empty. Layout, type and booking were still visible. The other businesses in this run are `sites/cheeky-monkey/concepts.md`, `sites/lotus-surf-house/concepts.md` and `sites/coconut-surf-inn-guest-house-and-restaurant/concepts.md`, and Sanjee Surf School's `concepts.md` on branch `alon/sanjee-surf-school`. Colonial Surfing Villa is `void`, and Surf Swell Hostel has no concepts yet. There is no `stock/` folder, and none is wanted (§2).

Colours were sampled with `ffmpeg` from the stored pixels. Each one is either an area average (`crop=w:h:x:y,scale=1:1:flags=area`), the median of the pixels inside a hue band in a crop, or the mean of the lightest or darkest share of a crop. The method and the crop are given with every value so anyone can repeat it. Contrast uses the WCAG formula.

---

## 1. What this business actually is

It is a new, white, two-storey guesthouse on Weliwaththa Rd, behind a round sign that reads "Sea You / THE SURFERS NEST / MIDIGAMA" and carries the only phone number anyone has published (img-001, `contact.phone`). Its photographs went up on Booking.com in September 2025 (`business.since`). It has seven double rooms that sleep fourteen, and only one has air conditioning (`room_count`, `description_rooms_note`). **Every room has the same mint-green four-poster, the same teal velvet throw, the same timber towel ladder and the same green cabinet** (`room_types_note`). It reads less like a hotel and more like a house painted by one hand in one colour.

The host, Ashly, lives in the house and shares the kitchen with his guests. One guest wrote that it feels like staying with a host family (`business.owner`, Mareike). The house has the things a surfer notices: three boards on a wall rack on the veranda, and a shower built into a wooden surfboard on the garden wall (img-004, img-034, img-036).

**What it does not have is a single picture of the sea.** The listing's own name promises "Hello to waves in a minute walk", but none of its 82 photographs shows the beach, a wave or the house from the street (`images_note`, `gaps[]`). It has no website, no WhatsApp and no Instagram, and its Google listing is unclaimed (`existing_site`, audit F1–F3). So the honest page sells the house by **its things**, which the photographer shot one by one, and lets the guests' words carry the walk to the water.

---

## 2. What the material can and cannot carry

### Video, the business's own (`dossier.videos[]`)

**There is none.** The business has no website, YouTube, Instagram or Facebook, and Booking.com, Agoda and both Airbnb listings hold stills only. A YouTube search returned only other channels' generic Midigama clips (`videos_note`). So:

- **No concept opens on video, and none is designed around footage.** Each concept says below how it moves with stills.
- There are no timestamps and no hero loop.
- No video is a pitch point. The first thing to film is in §6.

### Photographs, the business's own

There are 82, all `business-owned`: property and host uploads to the business's own listings. They are one consistent professional set from 2025-09-28/29, with four exceptions. img-046 (1200×669) and img-047 (720×1008) are lower-resolution phone pictures. img-076 and img-077 are HDR phone-style balcony shots. **55 of the 82 are portrait.** No photograph shows a person, so there are no consent questions (`images_note`).

**The largest usable width of the best photograph is 2000 px**, which is the stored long edge (2000×1333: img-002, 003, 004, 012, 015, 017 and others). The Booking.com originals are 3000–5568 px, but those are not on disk. Twenty-six landscapes are ≥ 1920 px wide, so a full-bleed first screen is not just allowed but expected, and the scroll set-piece rule (≥ 8 own photographs ≥ 1920 px) is met three times over.

What the set shows, on sight:
- About 30 bedroom pictures. Mint four-posters, lime or white or grey sheets, the teal velvet throw, timber towel ladders and green cabinets. Some canopies are flat, and some are **gabled like a little roof** (img-015).
- 15 bathrooms, plain white with instant-shower heaters. They are weak, and are used only inside room galleries.
- Objects shot close up: carved masks (img-035, img-069), a brass oil lamp (img-070), a chequerboard stool (img-037), a towel swan (img-029), a tea set on a mint table (img-007, img-039) and a carved settee (img-041).
- The outdoor spaces: the upstairs balconies over the palms (img-003, img-045, img-076, img-077), the courtyard bench (img-071, img-006) and the veranda lounge with the surfboards (img-004, img-034, and img-072 at night).
- The surfboard shower (img-036).
- The sign (img-001).

**The ten strongest:**

| # | asset | px | what it is | role it can hold |
|---|---|---|---|---|
| 1 | **img-002** | 2000×1333 | Deluxe Double Room: a mint four-poster in white linen, the grey panelled door open onto the veranda's green table | Full-bleed. The lead of the Deluxe gallery. A set-piece side |
| 2 | **img-015** | 2000×1333 | A gabled mint four-poster, lime sheets and the teal throw, grey doors either side | Full-bleed. **Concept 3's first screen** |
| 3 | **img-004** | 2000×1333 | The veranda lounge: a rattan armchair, a low table under an amber pendant lamp, plants, carved doors behind, and three surfboards stood against the wall | Full-bleed. **Concept 1's first screen** |
| 4 | **img-003** | 2000×1333 | Upstairs balcony: a mint table with a pothos and two mint chairs, palm fronds filling the frame beyond the parapet | Full-bleed. **Concept 2's first screen** |
| 5 | **img-017** | 2000×1333 | Lime bed, teal throw, a towel roll, and the open door through to the balcony chairs | Full-bleed or gallery. A set-piece side |
| 6 | **img-051** | 1920×1280 | A room seen through a carved-fanlight doorway: the four-poster inside, masks and a shuttered window beside it | Full-width band |
| 7 | **img-036** | 1333×2000 | The outdoor shower: a wooden surfboard fixed to a grey wall, a tap and a shower head, palms above | Portrait. Phone full-bleed, or a print on desktop |
| 8 | **img-034** | 1333×2000 | Three surfboards on a wall rack among plants (a fire extinguisher at the edge) | Portrait. **Concept 1's phone first screen** |
| 9 | **img-024** | 1333×2000 | A carved fanlight over a doorway into a room with a towel ladder and a green cabinet | Portrait panel |
| 10 | **img-007** | 2000×1333 | A mint table laid with a teapot, cups and a pink rose, mint chairs, a wet red-oxide floor | Landscape panel |

Also useful: img-012, 022, 053, 057, 059, 080 and 082 (bedrooms, all ≥ 1920 px), img-071 (courtyard bench, 1920×1081), img-072 (the rack at night, 1920×1081), img-045 and img-041 (carved chairs, 2000×1333), img-027 (the carved grey double door, 1333×2000), img-035 and img-069 (masks), img-016 (bed with the door open to the balcony chairs, 1333×2000) and img-001 (the sign, 1333×2000).

**Never full-width:** img-046 (1200×669) and img-047 (720×1008), which are small prints at most. img-076 and img-077 are HDR phone shots, used only in a masonry, never as a lead. The bathrooms never lead a gallery.

**Flags.** img-001 shows the phone number, which is the business's own sign. img-046 shows a CCTV camera, which is disclosed (`facilities`) but is no picture to lead with. Fire extinguishers show at the edge of img-006, 034, 046 and 072, so crops should keep them out where the frame allows.

### Atmosphere

**None, on purpose.** There is no `stock/` folder. A Commons photograph of Midigama beach beside the house's own pictures would be read as the house's own view, and the house shows no view of the sea. That is exactly the gap a borrowed picture would paper over. The sea is carried in words only: the listing's "Hello to waves in a minute walk" (`spot`) and the guests' "steps away from the sea" (Kenza).

### Words (`copy/en.json`)

- **Short, and worth setting large:** the six headings, "Around the courtyard", "Ashly", "Seven rooms", "Breakfast", "Carved doors and a surfboard shower" and "Finding the house". Also the `spot` line, "Hello to waves in a minute walk," says the house's own listing (59 characters).
- **The sentence the archetype is built on:** "The bed is a mint-green four-poster double with a teal velvet throw on it, and there's a timber towel ladder and a green cabinet with a mirror." The copy already describes the house as an inventory.
- **The honest line that must stay visible:** "Only one has air conditioning, so ask when you book if you want the one that has it."
- **`closing`** is 126 characters and names all three ways in: Booking.com, the whole house on Airbnb, and a call to Ashly. It is the script for every booking panel below.
- **Testimonials:** five, from 57 to 389 characters. The best are Niamh's (responsive host, private balcony, airport transfer) and Kenza's ("steps away from the sea and restaurants"). Marina's is the long one about Ashly. Kenza's quote has a line break, which must render as a line break (review N4).
- **Ashly's own quote** is the most generated-sounding line on the page (review N2). It is set at body size and never pulled out large.
- **`tagline`** is 59 characters, too long for a hero subtitle (calibration: "very short"). See §6.

### Numbers

- Google **4.9/5, 11 reviews**. Booking.com **8.0/10, 8 reviews**. Airbnb **5.0/5, 10 reviews**. All three were captured 2026-11-21 (`ratings[]`).
- Seven rooms, sleeping 14. One with A/C.
- Deluxe Double Room 13 m², Standard Double Room 12 m².
- Check-out 06:00–10:00.
- Midigama station 950 m and Weligama Beach 3.4 km, both by Booking.com's count.
- No price is published anywhere: price means "live dates on Booking.com".

### Gaps (and which ones to design around)

- **No sea, beach, break or street photograph.** This is the gap to **design around**. Every concept opens on the house's own strongest frame, and the sea appears only as the guests' and the listing's words.
- **No photograph of Ashly or of breakfast.** These become type-led moments: his name, his reply time on Airbnb, the guests' words about him. No food picture is implied.
- **No video:** see above.
- **No WhatsApp, email or Instagram.** The secondary action is `tel:+94715880052`, and **only once a human confirms the number** (`gaps[0]`, audit funnel step 4). Until then every Call button below is left out and the bar carries the primary action alone. There is no Instagram section (the calibration asks for one), and that is a pitch point.
- **Which room has the A/C, and which rooms have their own bathroom, is unknown** (review owner items). No concept labels a room "the A/C room" or puts a bathroom on the Standard room.
- **No check-in time** (Booking.com and Airbnb disagree, F9). Only check-out is shown.
- **No surf break and no season named by the business.** No break name appears, and there is no forecast (§3).

---

## 3. The page archetype for this business: **the inventory: the house, thing by thing**

The page is the house **told by its things**, not walked by its floors. Each section opens on one object that was photographed close and stands for that part of the stay: the four-poster for the rooms, the cushioned bench for the courtyard, the carved door and the surfboard shower for the house's character, the sign for finding it. The visitor learns the house the way a guest would describe it to a friend: "there's a mint four-poster in every room, a shower in a surfboard, boards on the veranda."

It belongs to this business and to no other in the run:

1. **The photographer already made the inventory.** Close-ups of masks, a lamp, a stool, a towel swan, a tea set, a board shower: no other dossier in the run is shot object by object, and this one has almost nothing else (no people, no sea, no street).
2. **The copy already reads as one.** "A mint-green four-poster double with a teal velvet throw … a timber towel ladder and a green cabinet with a mirror", and "Carved doors and a surfboard shower".
3. **It is the opposite axis to the run's other archetypes.** Cheeky Monkey is a *visit* along a road. Lotus is the house in *section*, floor by floor. Coconut is a stay told by the *clock*. Sanjee is told by *distance* from the shore. Sea You is told by **what is in it**: the camera stays close, and the page moves from object to object, not from place to place or hour to hour.

impeccable mode: **Persuade.** The visitor succeeds when they tap through to Booking.com (or the whole-house Airbnb listing, or the call) already knowing that the rooms are alike, that only one has A/C, and that the sea is a minute away by the listing's own word.

**The order, shared by all three concepts** (playbook §3; the audit's `offer_framing` governs 2–3):

1. **The first screen:** the concept's one thing, full-bleed.
2. **At a glance:** the booking section head, in `recommended.above_fold` order. It runs:
   - what + where (`tagline`);
   - spot (the `spot` line);
   - included, one " | " line from `amenities[]` (Free WiFi in public areas | Kitchen | Fan and mosquito net | Free private parking on site);
   - price ("Live dates on Booking.com": no nightly rate);
   - trust (the three ratings, each with its count, platform and "21 Nov 2026");
   - the primary action, and Call when it is confirmed.
3. **The four-poster: the rooms.** "Seven rooms", then the two `rooms[]` rows (Deluxe 13 m², Standard 12 m²), each sold with a gallery from the photos Booking.com tags to it (`room_types[].note`). An "In every room" icon list follows: four-poster double, teal velvet throw, towel ladder, green cabinet and mirror, fan and mosquito net. The A/C sentence is never smaller than body text.
4. **The bench: around the courtyard.** The intro block, the courtyard and the balconies.
5. **The carved door and the surfboard shower.** The copy block of that name, with img-027 or img-035 and img-036.
6. **Breakfast.** Type-led, one sentence. No photograph, because none exists.
7. **Ashly, and the guests.** The "Ashly" block, the three ratings again in full, and the five testimonials in a dot slideshow.
8. **The sign: finding the house.** img-001, "Finding the house", the address (Google's, with 80650), "Open in Google Maps" as a designed button to `contact.mapUrl`, check-out 06:00–10:00 and `stayInfo.note` as one " | " line.
9. **Closing** (`closing`) with all three booking links as buttons (and Call when confirmed), then the **footer**.

`recommended.above_fold` is the order of section 2 and of the expanded phone bar. It is not crammed into the first screen. **Taps to book: 1** in every concept. The hero button is a plain `<a href="https://www.booking.com/hotel/lk/sea-you-surfers-nest.en-gb.html">`, so it works with JS off and goes straight to the live dates without opening any panel. Agoda is never linked, because it copies Booking.com (audit). No WhatsApp or email is shown, because neither is published.

**Hero button label.** The copy's label, "See rooms and live dates on Booking.com", is 39 characters. The calibration rejected a 38-character hero CTA as "far too long". So the hero shows the template label **"See live dates"**, with an `aria-label` that carries the copy's full label. The full label is used on the section-2 button and in the expanded bar. This is an interface label, which the template owns. §6 asks for a proper short CTA field.

**Rating on the first screen: no**, in all three concepts. The house is rated on three platforms with small counts (11, 8 and 10), and the strongest number (Airbnb 5.0) is not the one the primary action goes to (Booking.com 8.0). A single rating in the hero would either cherry-pick or send people to the weaker score. Three ratings stacked over a photo is exactly the "tagline + rating + button stack" the calibration forbids. The ratings sit together in section 2, with their dates, and again with the guests' words in section 7.

**Forecast: no**, in all three. The business names no break (`location.spot` is a gap; guests say only "good location for surfing"). The dossier has no dossier-spot → Rosa-spot mapping, and offering "Midigama" or the nearest Rosa spot as this house's wave would be the nearest-other-spot error. If the operator later picks a Rosa spot, as Alon did for Lotus on 2026-11-04, the block belongs in section 8 and the mapping must be written into this file first.

**Embeds: none.** The map is a designed "Open in Google Maps" button. Nothing third-party loads, ever.

**Scroll set-piece:** concept 3 only (pattern 2, the pinned rotation). The material qualifies with 26 own landscapes ≥ 1920 px. Concepts 1 and 2 have none, as the rule requires.

---

## 4. Three concepts

### Concept 1 · calm: **"The board rack"**

**The idea in one sentence.** A bright, plain page that opens on the veranda where the surfboards stand. Then it lists the house thing by thing, in quiet sections with big room galleries.

**The one thing.** **The surfboards on the veranda wall:** three boards on a rack beside the lounge, the first thing a surfer sees and the only thing in the photographs that says "surfers' nest" (img-004, and img-034 in close-up). Nothing else on the page is as loud. The boards appear once at full size, on the first screen. After that they appear only as a small print beside "Carved doors and a surfboard shower".

**Structure.**

1. **Hero:** see the first screen.
2. **At a glance:** white, one centred 680 px column.
   - The `tagline` in the text face at 22 px.
   - The `spot` line beneath it, in the script at 34 px. It is the one title-sized line in this section.
   - One " | " line of what's included.
   - "Live dates on Booking.com" as plain text, then three compact rating blocks in a row (score, platform, count, "21 Nov 2026"), each linking to its listing.
   - The accent button with the full copy label, and a "Call Ashly" button with a phone icon in an ink outline, shown only when the number is confirmed.
3. **Seven rooms:** tint ground. A 5/7 split: the "Seven rooms" block on the left (the heading in the script), and the "In every room" list with five line icons on the right. Then **two stacked room rows**, each a 7/5 split with a 3:2 dot slideshow of 6 photos on the left and the room's name, beds, sleeps, `note` and its own accent button on the right.
   - Deluxe Double Room: img-002, 015, 012, 022, 033, 032.
   - Standard Double Room: img-009, 026, 005, 025, 010, 011 (the portraits as 3:2 centre crops).
   - The slideshows have dot navigation, never hover-swaps (calibration).
4. **Around the courtyard:** white. A full-width band of img-071 (the courtyard bench, palms beyond), cropped to 21:9 = 1920×823 from y 140. Below it, a 5/7 split: the intro block on the left, and on the right a 2-up of img-003 and img-045 (both 4:5 centre crops, 1066×1333 from 2000×1333).
5. **Carved doors and a surfboard shower:** tint. A three-up row of portrait prints at the same 2:3 ratio (img-027 carved door, img-035 masks, img-036 board shower), with the copy block underneath in a 680 px column. The prints are matted with a 12 px white mat and soft shadow (references #9).
6. **Breakfast:** white, type-led. The heading in the script, and the one sentence at 24 px, centred. No photograph.
7. **Ashly, and the guests:** tint. The "Ashly" block on the left. On the right, a dot slideshow of the five testimonials, each quote with the author, platform and month in a " | " line. The three ratings sit above the slideshow, larger here than in section 2.
8. **Finding the house:** white. A 5/7 split with img-001 (the sign) as a 2:3 print on the left. On the right: "Finding the house", the address, "Open in Google Maps" as a button, and one " | " line with check-out 06:00–10:00 and `stayInfo.note`.
9. **Closing:** a full-width band of img-002 at 21:9 with the `closing` sentence centred over its white wall, under a soft veil. Below it are three buttons in a row: Booking.com (accent), Airbnb room and Airbnb whole house (ink outline), and Call when confirmed. **Footer:** the name in the script, the address, the three listing buttons as icons, the map button and the copyright. No lines anywhere.

**The first screen.**
- **Desktop:** img-004, full-bleed at 100 svh, cropped to 16:9 (2000×1125, y 104–1229) so the pendant lamp and the board noses both stay in. No grade beyond a 3 % lift in the shadows.
- **Phone:** img-034 (the three boards on the rack, among plants), cropped 1000×2000 from x 220 so the extinguisher at the left edge falls out of frame.
- **Over it:** only the header (the name in the script at left, the accent "See live dates" at right). In the centre, horizontally and vertically, is `businessName` in Grand Hotel at 56 px desktop / 40 px phone in ink, with "Midigama, Sri Lanka" under it at 17 px in the text face. Under that is one accent button, "See live dates".
- **Legibility:** a soft white radial veil sits behind the title block only (ellipse 60 % × 40 %, white at 55 % in the middle, 0 at the edge). The photograph is bright (lightest 12 % `#F0F0ED`), so ink-on-veil reads at more than 12:1.
- **No rating** (§3).
- **Phone:** the Kube bottom-of-hero bar (references #4) turns into the persistent bar once the hero leaves.

**Why it beats what we already have.** I compared it with the Booking.com listing walked on a phone (`assets/walk/03-booking-com-fold.png`; there is no own site): a blue header, a bold name with a slogan, "8.0 Very good", then the sign photo, then "Choose dates to see prices". I also compared it with the gold bar (`gold/README.md` top row, Global Surf `postcard` and `the-sign`) and with Lotus's picked page in this run.
- At first glance this page opens on the house itself, a sunlit veranda with surfboards against the wall, instead of a road sign, with the name, the place and one button and nothing else. That is the Global Surf first-screen discipline, applied to a still.
- It then sells the rooms as Shahar asked: two rooms, six photographs each, the honest A/C line, and one button per room. Booking.com shows the same pictures as a 1/45 carousel under a grey header.

**Colour** (sampled; see the method above).

| role | hex | asset | what it is (crop, method) |
|---|---|---|---|
| ground | `#FFFFFF` | | |
| tint | `#F0F0ED` | img-004 | the white back wall of the veranda lounge (lightest 12 % of the whole frame) |
| ink | `#141008` | img-004 | the shadow under the low teak table (darkest 4 % of the whole frame). 19.0:1 on white, 16.6:1 on the tint |
| place 1 | `#BE8C53` | img-004 | the wooden board on the rack (`300:900:1300:150`, hue 20–45°, mean). Line icons and the slideshow's active dot only |
| place 2 | `#74C29A` | img-015 | the mint four-poster frame (`2000:500:0:300`, hue 130–175°, median). The "In every room" icons |
| **booking accent** | **`#3C5965`** | **img-001** | **the slate ink of "Sea You" on the house's own sign** (`420:140:470:950`, hue 180–230°, median). White text 7.5:1, 6.6:1 on the tint. Booking actions only |

*Default-look check:* the accent is a blue-grey slate, close to the "muted petrol" the list warns about. It is used because it is the business's own lettering on its own sign, the only brand colour the house has. On a white page it reads as the sign, not as a template. It would look wrong beside cream or sand, which would turn it to "petrol on parchment". It would also look wrong beside the gold Global Surf coral, which would make the page look like two brands.

**Type.**
- **Karla** (400/600) for everything people read and every control. It is a plain grotesk with a slightly hand-cut feel, clear figures in "13 m²", "06:00–10:00" and "4.9/5", and readable at 16 px on a phone.
- **Grand Hotel** for the name and section titles only (34–56 px). The house's sign sets "Sea You" in a heavy, upright-leaning connected script (img-001), and Grand Hotel is the closest free relative of that lettering. It was tested on every title word: Courtyard, Breakfast, Ashly and Finding all read.
- Two families. Neither is used in the run or in gold, and neither is on the default-look list.

**Motion.** Micro only, no canvas.
- **Hero:** the photograph is still. On desktop it takes the Kube parallax (references #17: 4 rem taller than its frame, scrubbed 0 → −4 rem) as the hero leaves. Off on phones and under reduced motion.
- Slideshow: a 280 ms cross-fade, and the active dot slides to its place.
- Buttons press to 0.97 on tap, and spring back in 160 ms.
- The phone bar slides up (240 ms ease-out) when the hero's own button leaves the viewport.
- The rating blocks link out with no animation.
- **Reduced motion:** cross-fades become instant and the parallax is off. **JS off:** every slideshow is a horizontal scroll-snap row with the same photos, and every button is a link. **No WebGL:** not used.
- Cost: under 6 KB of JS.

**The booking pattern.** **Per-room buttons + persistent phone bar** (Morgan's Rock, references #4 and #7). Every room row has its own accent button to the Booking.com listing. On phones, the bar shows "See rooms and live dates on Booking.com" and a phone icon when the number is confirmed. Tapping a chevron expands the bar upward into the section-2 summary in the audit's order: spot → included → price → trust → the action. The closing offers the two Airbnb listings as ink-outline buttons, "Book a room on Airbnb" and "Book the whole house on Airbnb", word for word from `bookingLinks[]`. Taps to book: 1.

**Photographs.**

| asset | crop | size on page | role |
|---|---|---|---|
| img-004 | 16:9, 2000×1125, y 104 | full-bleed desktop | hero |
| img-034 | 1:2, 1000×2000, x 220 | full-bleed phone | hero |
| img-002, 015, 012, 022, 033, 032 | 3:2 (portraits centre-cropped to 1333×889) | 7 of 12 columns | Deluxe gallery |
| img-009, 026, 005, 025, 010, 011 | 3:2 as above | 7 of 12 columns | Standard gallery |
| img-071 | 21:9, 1920×823, y 140 | full width | courtyard band |
| img-003, img-045 | 4:5, 1066×1333, centre | 2 × 3 columns | balconies |
| img-027, 035, 036 | 2:3, native | ≤ 420 css px each | carved and shower prints |
| img-001 | 2:3, native | ≤ 480 css px | the sign |
| img-002 | 21:9, 2000×857, y 300 | full width | closing |

First load: about 290 KB for the hero in AVIF at 1920 w (the phone crop is about 150 KB at 1000 w), fonts about 70 KB (two subset WOFF2), JS under 6 KB. Everything below the fold is lazy.

**Forecast:** no (§3). **Scroll set-piece:** none (calm).

**What would make this concept fail.** Three surfboards in a lounge could read as a *surf shop's* hero beside Cheeky Monkey's boards, or as a hostel's common room rather than a B&B. The room galleries must arrive within one scroll, so nobody wonders whether there are beds.

---

### Concept 2 · interactive: **"In the palms"**

**The idea in one sentence.** The page opens on the upstairs balcony table with the palms moving behind it, made from the still photograph in WebGL. Then you choose how you are coming (two of you, a group, or just a question), and the page hands you the right one of the house's three ways in.

**The one thing.** **The mint table on the upstairs balcony, in the palm fronds** (img-003): the colour of the whole house set outdoors, with the only greenery that fills a frame. The palms are the only thing that moves, and nothing else on the page is that loud.

**Structure.**

1. **Hero:** see the first screen.
2. **At a glance:** white. A 4-up fact row on desktop (2×2 on phone):
   - the `spot` line;
   - "7 rooms | sleeps 14";
   - "Free WiFi in public areas | Kitchen";
   - "Live dates on Booking.com".

   Each fact is a large figure or phrase over a small line, set in the text face. Under the row are the three rating chips (score, platform, count, date), then the booking panel's three tiles (below).
3. **Seven rooms:** tint. **List + stage room viewer.**
   - **Left:** the "Seven rooms" block, then a pill switch, "Deluxe Double | Standard Double". The pill slides between the two.
   - **Right, the stage:** that room's 4:5 photographs as a dot slideshow, with the room's `beds`, `sleeps` and `note` under it in one " | " line, and its accent button.
   - **Under both:** the "In every room" icon list in one row.
   - On a phone the stage comes first and the pill sits sticky under the header while the section is in view.
4. **Around the courtyard:** white. A **momentum-drag shelf** of nine object close-ups, all 4:5 crops with the next one peeking (references #14). In order: img-071 bench, img-006 courtyard corner (cropped to the bench, the extinguishers outside the frame), img-007 tea set, img-039 tea table, img-041 carved settee, img-045 balcony chairs, img-037 stool, img-038 pothos and img-077 long balcony. The intro block sits above the shelf in a 680 px column. There are no captions: each photo's alt text names it.
5. **Carved doors and a surfboard shower:** tint. A 7/5 split. On the left, img-036 (the board shower) as a 2:3 print at native size, at most 560 css px. On the right, the copy block, with img-069 (masks) as a small 4:5 print under it.
6. **Breakfast:** white. Type-led, one centred sentence, with the heading in the script.
7. **Ashly, and the guests:** tint. "Ashly" on the left. On the right, a **quote swipe row** with the next card peeking (Kenza first, then Niamh, Marina, Molly Jayne and Raul) and dot navigation. Ratings sit above it.
8. **Finding the house:** white. img-001 as a 4:5 print, the copy block, address, map button and the stay line.
9. **Closing:** the same three tiles as section 2, under the `closing` sentence on a full-width img-003 band (21:9, the palms still here). **Footer:** as in concept 1, in this concept's faces.

**The first screen.**
- **Desktop:** img-003, full-bleed at 100 svh, cropped to 16:9 (2000×1125, y 0–1125, keeping the palms over the top edge and the table's front legs).
- **Phone:** a 4:5 crop at 100 % width (1066×1333, x 467) that keeps the table in the centre with the fronds above it. The hero runs 80 svh on phones, so the bar and the start of section 2 show.
- **The main item:** a **WebGL cinemagraph of the photograph's own palms.** One full-screen quad samples img-003. A hand-painted mask (the fronds white; the table, chairs, pot and parapet black; 1000×667, about 20 KB WebP) gates a slow displacement. Inside the mask, UV offset = noise(uv × 3 + t × 0.12) × 0.004, with a second, faster octave at 25 % for flutter. The table, chairs and parapet never move a pixel.
- **The gust:** the pointer's horizontal speed (or the phone's tilt) adds a gust in that direction, which decays like a spring over 1.2 s.
- **Over it:** the header and nothing else. Centred horizontally and vertically is `businessName` in Kalam 700 at 52 px / 38 px in ink, with "Midigama, Sri Lanka" under it at 17 px. Under that is one accent button, "See live dates".
- **Legibility:** the title sits in the pale palm band. A soft white veil sits behind the title block only, and ink on the veil reads at more than 12:1.
- **No rating** (§3).

**Why it beats what we already have.** I compared it with the Booking.com phone listing (`assets/walk/03-booking-com-fold.png`) and with the gold bar (Global Surf `postcard`; `the-lavish-haven.html`).
- Booking.com opens on a road sign under an overcast sky and asks for dates. This page opens on the house's own balcony with the palms *moving* behind it. That is the closest a house with no video can get to the "hero video" of the gold pages, and it uses only the house's own pixels.
- Then, instead of a calendar, it asks the visitor the one question that decides which of three listings they need, and answers it inside the page.

**Colour.**

| role | hex | asset | what it is (crop, method) |
|---|---|---|---|
| ground | `#FFFFFF` | | |
| tint | `#E9F2E7` | img-003 | the sunlit top of the mint balcony table (`700:120:650:680`, lightest 20 %) |
| ink | `#1D2814` | img-074 | the shadow side of the dark green plastic chair at the terrace table (`400:500:1300:500`, darkest 30 %). 15.4:1 on white, 13.4:1 on the tint |
| place 1 | `#73C592` | img-003 | the mint table and chairs (whole frame, hue 130–175°, median). Tile outlines when selected, and the pill |
| place 2 | `#DFD9C0` | img-003 | the palm fronds in haze (`800:300:900:60`, area average). The momentum shelf's ground behind the peeking card |
| **booking accent** | **`#334825`** | **img-074** | **the bottle-green plastic chair at the mint table on the red-oxide terrace** (`400:500:1300:500`, hue 90–170°, median). White text 10.0:1, 8.8:1 on the tint. Booking actions only |

*Default-look check:* none. There is no teal and no petrol, and the ground is white with a mint tint, not cream. A deep bottle green on a mint-white page is tonal. It is chosen because a warm accent would have to come from the red-oxide floor (Lotus's picked accent in this run) or the sign's sun (Coconut's). It would look wrong beside saturated orange or coral, which would turn the page into a fruit stall.

**Type.**
- **Plus Jakarta Sans** (400/600) for reading and every control. It has open forms and tabular figures for the fact row and the ratings, and it stays clean at 15 px inside tiles.
- **Kalam** (400/700) for the name and section titles only (34–52 px). It is an upright, legible handwriting, like a note left on the balcony table. It suits the copy's plain, contraction-heavy voice, and it was tested on every heading word.
- Not used in the run or in gold.

**Motion.**
- **Main item:** the palm cinemagraph described above.
  - It is one fragment shader in raw WebGL (about 5 KB), no library.
  - The canvas fades in over the identical `<img>` after first paint, so LCP is the photograph.
  - It pauses when the hero is off screen or the tab is hidden, and it caps DPR at 1.5.
- **Micro-animations:**
  - The room pill slides (220 ms, spring).
  - Tiles lift 2 px and their mint outline draws in on select.
  - The shelf has inertial drag with snap and edge resistance (desktop drag, native scroll-snap on touch).
  - Quote cards and slideshows cross-fade (280 ms).
  - The bar slides up.
  - Buttons press to 0.97.
- **Reduced motion or Save-Data:** the still photograph, no canvas, instant switches. **No WebGL:** the still photograph. **JS off:** the photograph. The tiles are anchors to the three listing links, which are visible as plain buttons in the panel, the pill becomes two stacked room blocks, and the shelf is a scroll-snap row.
- Cost: about 25 KB of JS in total, plus the 20 KB mask.

**The booking pattern.** **An inline panel with tile-tap answers** (Rancho's inline panel and White Desert's tiles, references #1 and #2). It asks one question, "Who's coming?", with three tiles:

- **"Two of you"** shows the Booking.com button with the copy's full label and "Book a room on Airbnb" (ink outline). Under them is the copy's "Only one has air conditioning, so ask when you book if you want the one that has it."
- **"A group"** shows "Book the whole house on Airbnb" (accent) and "7 rooms | sleeps 14", from the owner's count.
- **"A question first"** shows "Call Ashly" (`tel:`) when the number is confirmed. Until then it shows the Airbnb room listing, with the copy's line that he usually replies there within a few hours.

The panel is the `closing` sentence made into a control. All three links are real `<a>`s in the HTML, so the panel works with JS off as three plain buttons. The hero and the bar skip the panel: they go straight to Booking.com. Taps to book: 1. The booking UI code is booted on first interaction (references #5).

**Photographs.**

| asset | crop | size on page | role |
|---|---|---|---|
| img-003 | 16:9, 2000×1125, y 0 | full-bleed desktop | hero (WebGL) |
| img-003 | 4:5, 1066×1333, x 467 | full-width phone | hero (WebGL) |
| img-002, 015, 012, 022, 013, 033 | 4:5 (landscapes 1066×1333 from centre) | stage, 6 of 12 columns | Deluxe |
| img-005, 026, 009, 025, 010, 044 | 4:5 | stage | Standard |
| img-071, 006, 007, 039, 041, 045, 037, 038, 077 | 4:5, ≤ native | 320 css px cards | the shelf |
| img-036 | 2:3, native | ≤ 560 css px | board shower |
| img-069 | 4:5, 1136×1420, y 290 | ≤ 300 css px | masks |
| img-001 | 4:5, 1333×1666, y 160 | ≤ 420 css px | the sign |
| img-003 | 21:9, 2000×857, y 0 | full width | closing |

First load: about 280 KB for the hero in AVIF, the mask 20 KB, fonts about 75 KB, JS about 25 KB.

**Forecast:** no (§3). **Scroll set-piece:** none (interactive).

**What would make this concept fail.** A cinemagraph is only as good as its mask. If the fronds tear at the parapet, or the table wobbles, it reads as a glitch and the critics will call it a decorative overlay. The mask has to be painted by eye and checked at 1440 and 390 before anything else is built.

---

### Concept 3 · unique: **"Every side of the four-poster"**

**The idea in one sentence.** The first scroll pulls back out of the photograph of one bed, and the mint four-poster itself, drawn in WebGL, turns a full circle while the house's own bedroom photographs show it from every side.

**The one thing.** **The mint-green four-poster.** It is in every room, it is the colour of the house, and some of them are gabled like a little roof, a nest over the bed (img-015). It is the only loud object on the page. Its gable is the page's **one shape** (references #28), used on the top edge of the booking door panel on phones and on the closing panel, and nowhere else.

**Structure.**

1. **Hero:** see the first screen.
2. **At a glance:** white, an offset 12-column layout.
   - The `tagline` sits at 3–8.
   - The `spot` line in the display face sits large at 5–12.
   - Under them, the included line and "Live dates on Booking.com" sit side by side.
   - The three ratings are set as one " | " line.
   - Then the accent button and Call.
3. **The set-piece: the four-poster turning** (pinned rotation, below). Its four captions are the "Seven rooms" block, sentence by sentence.
4. **Two rooms:** tint. A **2-up of room slideshows** side by side on desktop (stacked on phones). Each has a 4:5 slideshow of 6, the room name in the display face, beds, sleeps and `note`, and its own button. The "In every room" list sits under the pair as five icons, the four-poster drawn as a tiny gable frame.
5. **Around the courtyard:** white. A **true masonry** in three columns, where each photo keeps its own ratio and height (hard constraint 5): img-071, 003, 045, 041, 004, 007, 076, 038 and 042. The intro block sits in the first column's head.
6. **Carved doors and a surfboard shower:** tint. An **offset pair**: img-027 (carved door) at 2–6 and img-036 (board shower) at 8–12, 120 px lower, both 2:3 native prints. The copy block runs between them on desktop and under them on phones.
7. **Breakfast:** white, type-led, centred.
8. **Ashly, and the guests:** a 5/7 split. Ashly on the left. On the right, a **stack of quote cards**: the front card is a quote, and swiping or clicking sends it to the back with a 6° turn. There are dots, and keyboard arrows work. The ratings sit above.
9. **Finding the house:** img-001 as a 2:3 print, the copy, address, map button and stay line.
10. **Closing:** a white panel whose top edge is the gable (the one shape). Inside it is the `closing` sentence and the three listing buttons, plus Call when confirmed. **Footer.**

**The first screen.**
- **Desktop:** img-015, full-bleed at 100 svh, cropped to 16:9 (2000×1125, y 0–1125). The gabled canopy sits at the top third and the white wall between the posts is in the middle.
- **Phone:** img-005 (a four-poster with the teal throw, portrait), cropped 1000×2000 from x 333.
- **Over it:** the header only. Centred horizontally and vertically, on the white wall between the posts, is `businessName` in Leckerli One at 54 px / 38 px in ink, with "Midigama, Sri Lanka" under it at 17 px. Under that is one accent button, "See live dates".
- At the bottom centre is one 13 px line, "Scroll, and the bed turns", the Lavish method of naming the move without animating the title.
- **No rating** (§3).
- **The main item** begins with the first scroll pixel, not before. The first screen is a clean photograph, as the calibration asks.

**The main item and the scroll set-piece: pattern 2, the pinned product rotation** (`agents/designer/scroll/playbook.md` §2.3). It is new to the run: Cheeky uses pattern 9 and Coconut pattern 6.

- **The scene.** The hero photograph is a textured plane in a WebGL scene from the start (an `<img>` underneath for LCP and fallback). The four-poster is drawn as real geometry: four square posts, side rails and head rails, and a gabled canopy, in mint `#74C29A` with a soft matte material and one warm key light. It is built from primitives (about 40 boxes), proportioned by eye from img-015, with no 3D asset to download.
- **Pull-back (scroll 0 → 100 vh):** the camera pulls back from the hero plane. The photograph shrinks into the space between the posts, and the drawn frame comes into view around it on a white ground. At the end of the pull-back the page around the bed is white and the photograph is the bed's "inside".
- **Turn (pinned, 300 vh):** `rotation.y = progress × 2π`, with `snap: "labels"` at the quarter turns. At each label the photograph inside the frame cross-fades (0.6 s) to the bedroom photo taken from roughly that side:
  - 0°: img-015 (front, gabled).
  - 90°: img-002 (from the foot, the door open to the veranda).
  - 180°: img-017 (from the foot, through to the balcony).
  - 270°: img-059 (the long side, grey doors).
  - The photos are chosen in the CMS as the first four photos of the room galleries, and each aligns on its owner-set `focalX` / `focalY` (schema v0.10), never on coordinates written for one picture.
- **Captions** sit at the labels, in the text face at 22 px, in a DOM column beside the canvas (left on desktop, under it on phones). They are the copy's own sentences, in order: "All seven rooms are doubles, and between them they sleep fourteen.", then "Only one has air conditioning, so ask when you book if you want the one that has it.", then "The rooms are furnished much alike.", then "The bed is a mint-green four-poster double with a teal velvet throw on it, and there's a timber towel ladder and a green cabinet with a mirror."
- **Exit:** the frame settles back to 0° and fades, and the room section's slideshows take over.
- **Built from:** img-015, 002, 017 and 059 in the turn, all ≥ 1920 px. With the room galleries (img-012, 022, 053, 057, 080, 082), the qualifying set is ten own photographs ≥ 1920 px.
- **Reduced motion:** no pull-back and no pin. The hero is a still, and section 3 is a static 2×2 grid of the four photographs (4:5) with the four sentences beside it. **No WebGL (tier 1) or a weak phone (tier 0):** the same static grid. The hero is the `<img>`. **JS off:** the static grid.
- **Cost:** OGL (about 30 KB gzipped) and the scene (about 6 KB), booted after first paint. The three turn textures are 1280 w AVIF, about 110 KB each, fetched when the pin is within one viewport, outside the first load. Tier 3 on desktop, tier 2 on phones (DPR ≤ 1.5, no post).

**Why it beats what we already have.** I compared it with the Booking.com phone listing (`assets/walk/03-booking-com-fold.png`) and the gold bar (Global Surf `the-sign`; `the-lavish-haven.html`, whose window-opening-on-scroll is the method, not the form).
- At first glance it is a clean, bright photograph of the bed the guest will sleep in, with the name and one button. On the first scroll the bed turns into an object you can look at from every side.
- No OTA page can do that, and it answers in two seconds the question Booking.com's 45-photo carousel leaves open: "are all the rooms like this?" Yes, and the page shows it.

**Colour.**

| role | hex | asset | what it is (crop, method) |
|---|---|---|---|
| ground | `#FFFFFF` | | |
| tint | `#ECEBE5` | img-002 | the white linen and the wall behind the Deluxe four-poster (lightest 10 % of the frame) |
| ink | `#132B29` | img-015 | the deepest folds of the teal velvet throw (darkest 5 % of the frame). 14.9:1 on white, 12.5:1 on the tint |
| place 1 | `#74C29A` | img-015 | the mint four-poster frame (`2000:500:0:300`, hue 130–175°, median). **The drawn frame**, the gable icons and nothing else |
| place 2 | `#798D34` | img-080 | the lime-green pillows (`700:300:0:400`, hue 60–100°, median). The quote stack's dot and the set-piece's caption marker only |
| **booking accent** | **`#1B5654`** | **img-017** | **the teal velvet throw on the bed** (`600:120:900:1180`, hue 160–200°, median). White text 8.4:1, 7.0:1 on the tint. Booking actions only |

*Default-look check:* a teal accent is on the list. It is used because the throw is on every bed in more than thirty of the house's photographs and is the second colour of the one thing itself. It is a deep, saturated velvet teal on a white ground, never a muted petrol on cream, and the display face is a fat script, not a high-contrast serif. It would look wrong beside sage or terracotta, the "spa" palette the list warns about.

**Type.**
- **Instrument Sans** (400/600) for reading, captions and every control. It is compact and even, with clear figures, and it sits quietly beside a loud display face.
- **Leckerli One** for the name, the section titles and the `spot` line (34–64 px). It is a fat, bouncy script whose strokes look brushed in enamel, like the house's painted mint timbers. It is the loudest face in the run's set, as the unique variant should be, and it was tested on every title word.
- Not used in the run or in gold. Instrument *Serif* is the banned display face; this is the unrelated sans, used only as text.

**Motion.**
- **Main item:** the pull-back and the turn described above, with eased scrub (0.5), damp lambda 6, and the playbook's one easing family (`power3`).
- **Micro-animations:**
  - The booking panel opens **like a door**, a side sheet hinged on its right edge that swings in (rotateY 80° → 0°, 420 ms). It is a full-height sheet with a gabled top edge on phones.
  - The quote stack turns.
  - Slideshows cross-fade.
  - Buttons press to 0.97, and the bar slides up.
- **Reduced motion, no WebGL, JS off:** as described in the set-piece. The door panel becomes an instant open, or with JS off a `/stay/` page with the same three buttons.

**The booking pattern.** **A side sheet that swings open like a door** (Kube's in-page overlay model, references #1, with the first step kept tiny, #2). "Book" in the header and the section-2 secondary button open it. It holds:
- three large tiles, Booking.com (accent, full copy label), "Book a room on Airbnb" and "Book the whole house on Airbnb";
- the A/C sentence under them;
- Call when confirmed;
- a close control, with Esc and focus trap and return.

It has a real URL (`/stay/`) so it works with JS off. **The hero button and the phone bar bypass it** and go straight to Booking.com, so the taps to book stay at 1. The panel's code is loaded on first interaction (references #5).

**Photographs.**

| asset | crop | size on page | role |
|---|---|---|---|
| img-015 | 16:9, 2000×1125, y 0 | full-bleed desktop | hero, then the set-piece's first side |
| img-005 | 1:2, 1000×2000, x 333 | full-bleed phone | hero |
| img-002, 017, 059 | 4:5 at the focal point, 1280 w AVIF | inside the frame | set-piece sides |
| img-012, 022, 053, 057, 080, 082 (+ 033) | 4:5 | 2-up slideshows | Deluxe and Standard galleries (Booking.com room tags decide which) |
| img-071, 003, 045, 041, 004, 007, 076, 038, 042 | own ratios, ≤ native | masonry, 3 columns | courtyard |
| img-027, img-036 | 2:3, native | 5 of 12 columns each | carved door and board shower |
| img-001 | 2:3, native | ≤ 480 css px | the sign |

First load: about 280 KB for the hero in AVIF, fonts about 80 KB, and the critical JS is only the 2 KB that swaps in the canvas. The set-piece's 36 KB of JS and its textures load after first paint.

**Forecast:** no (§3).

**What would make this concept fail.** A drawn bed beside a photographed one can look like a toy, a CAD wireframe or a furniture configurator. The frame has to be built with the same proportions, matte paint and light as the photographs, or the whole idea reads as a gimmick and as an overlay on the house's own pictures.

---

## 5. Divergence table

The run has five businesses concepted so far. Cheeky Monkey was picked as 3 · unique (its hero was later reworked to a drone loop) and Lotus as 1 · calm. Coconut and Sanjee have since been packaged; their picks are not restated here. Other runs are not part of this table (base.md 0.3.0). The twelve other rows are copied from Sanjee's table (branch `alon/sanjee-surf-school`), which copied the first nine from Coconut's.

None of the Sea You rows reuses a gold first-screen form, palette or face:
- Global Surf: a lodge clip, a centred title and a coral button.
- KA: cut-paper leaves over type.
- Layday: a drawn berth.
- Lavish: a cut-corner pool window.

Concepts 1 and 2 use the calibrated "photograph + centred short title + one button" form for strong stills, with their own photographs, faces and accents.

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern | scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| Cheeky Monkey | 1 · calm "The signboard" | walk in off the main road | img-147 full-bleed photograph (board noses framing the main road), "Catch waves, not worries" in Yellowtail + red-fin button | centred container; package tabs; stacked full-width room slideshows; 7/5 shop split with img-122 | `#FFFFFF` + `#EEF1F2` (img-122 wall) | micro only: tab pill, dots, in-view portrait clip | per-offer buttons + persistent phone bar (Morgan's Rock) | — |
| Cheeky Monkey | 2 · interactive "The wall of boards" | same | vid-009 full-bleed 9:16 on phone / three-column triptych of the same reel on desktop, `businessName` in Knewave + magenta button | one segmented "Plan your stay" panel; list + stage room viewer; full-bleed drag strip | `#FFFFFF` + `#EAF3F5` (img-096 mint) | triptych cut, sliding pill, rolling digits, momentum drag, crossfades | inline panel with tiles, optional date params, tel/mailto | — |
| Cheeky Monkey | 3 · unique "Pick your board" (picked; hero later reworked to a vid-001 drone loop) | same | vid-009 inside one centred board-shaped WebGL window on white, `featureLine` in Permanent Marker + blue-fin button | portrait package cards with board crops; 2-up room slideshows; masonry shop | `#FFFFFF` + `#FDF1F2` (img-134 sky) | resin-gloss shader, card tilt, board-mask zoom | right drawer / full sheet with a `/plan/` URL; hero bypasses it | image zoom-through (pattern 9) |
| Lotus Surf House | 1 · calm "The gate" (picked) | the house, floor by floor | desktop 6/6 split: img-019 (carved gate, portrait) full-height right half, name in Parisienne + red-oxide button on white left; phone: img-019 full-bleed portrait | centred 640 px column; stacked 6/6 room rows with 4:5 slideshows; 5/7 porch split; 3-up roof row | `#FFFFFF` + `#F0EDEE` (img-019 path stone) | micro only: one photo settle, dots, bar slide-up, cross-fades | per-room buttons + Kube bottom-of-hero bar → sticky phone bar with tel icon | — |
| Lotus Surf House | 2 · interactive "Dappled" | same | img-020 garden full-bleed with a WebGL shader moving the photo's own sunlight; Patrick Hand title + table-blue button | 4-up fact row; Garden / Upstairs / Roof floor switch with room tiles; 7/5 garden split; quote swipe row | `#FFFFFF` + `#E1E1E4` (img-020 sky) | light-drift shader, sliding floor pill, tile springs, rolling digits, momentum drag | tile-tap floor → room inside the page | — |
| Lotus Surf House | 3 · unique "Under the net" | same | white page: a WebGL cloth mosquito net over a portrait print of the balcony view (img-025); Allura title, violet button | stepped three-row "house section" on 12 columns; 2-up slideshow pair; masonry; offset roof pair | `#FFFFFF` + `#E1F2FD` (img-025 sky) | cloth sim, hem-sag button, damped slide-down panel | slide-down panel from the top (Tandjung Sari) with tiles incl. "Not sure" | — |
| Coconut Surf Inn | 1 · calm "The view from the roof" | one stay, 13:00 to 11:00 | img-009 (the view from the roof over the green to the reef) full-bleed landscape; on phones a one-time pan along the beach; name in Satisfy centred in the sky + banana-leaf green button | centred 680 px column; rooms in two plain groups (A/C, fan) as 6/6 rows with 4:5 slideshows; 7/5 courtyard split; full-bleed roof band; 2-column masonry | `#FFFFFF` + `#EEF2F7` (img-009 sky) | micro only: one phone pan, dots, bar slide-up, cross-fades, forecast fade-in | per-room buttons + Kube bottom-of-hero bar → sticky phone bar with tel icon | — |
| Coconut Surf Inn | 2 · interactive "Under the thatch" | same | img-102 (under the thatched roof, looking out to sea) full-bleed with a WebGL depth parallax from a hand-painted depth map; Shadows Into Light Two title + saffron button | 4-up fact row; "How do you like to sleep?" tiles (fan / A/C / 3–4 people) → list + stage viewer; veranda swipe row; full-bleed sunset band | `#FFFFFF` + `#F0F3F6` (img-102 sea haze) | depth parallax on pointer/tilt, tile lift, pill slide, rolling digits, count-up forecast, momentum drag | tile-tap by how you sleep, inside the page | — |
| Coconut Surf Inn | 3 · unique "Round the clock" | same | img-009 whose sky dissolves into the white page; Caveat title, line and vermilion (sign's sun) button set on the white "sky" | prose fact paragraph; 2-up room slideshows with Fan / A/C chips; true masonry of the house; 450 vh sticky split; forecast row | `#FFFFFF` + `#F1F1F3` (img-002 wall) | WebGL horizon wipe between frames, the sign's sun disc as hour marker, press-fill button | Kube in-page overlay: tiles 1 / 2 / 3 / 4 / Not sure → rooms that sleep that many; `/rooms/` URL; hero bypasses it | sticky split (pattern 6): five own 1920 px frames, afternoon → break |
| Sanjee Surf School | 1 · calm "The sand" | the paddle out | img-002 (2000 px) full-bleed, bottom edge cut to a hand-traced wash line that runs up once on load; title in the text face in navy ink centred in the sky + soft-top red button | centred 720 px reading column; 7/5 level split; three stacked lesson rows; full-bleed aqua band; 5/7 boards; 6/6 closing | `#FFFFFF` + `#D2EAF7` (img-002 pale shallows) | micro only: one wash-line run-up, dots, print settle, bar slide-up | per-offer buttons + persistent phone bar with tel icon (Morgan's Rock) | — |
| Sanjee Surf School | 2 · interactive "Where you start" | same | img-009 (1600 px) full-bleed, a WebGL swell moving the photograph's own water with the paddler masked out; title low on the calm water + cobalt button | 5 level tiles; 3-up lesson cards; live message panel; to-scale board chart; 7/5 Sanjee; sticky 5/7 tours | `#FFFFFF` + `#D6DAE0` (img-006 white water) | swell shader, tile pill, spring dot, message cross-fade, rolling digits, Kube parallax | tile-tap builds a visible message inline; every card also links direct | — |
| Sanjee Surf School | 3 · unique "The set" | same | white page: five own prints (img-002 880 css px, img-007 520 css px in front) flexing on a WebGL swell that passes every 12 s; Shrikhand title, rail-pink button, rating beside it | offset 12 columns with overlaps; full-width cloud-blue block with stepped prices; duration swipe strip; quote masonry; 3-column waves | `#FFFFFF` + `#94D4FF` (img-002 sky) | paper-flex vertex swell, press-fill button, damped bottom sheet | bottom sheet with tiles and message bubble; hero and bar bypass it | — |
| **Sea You Surfers Nest** | 1 · calm "The board rack" | **the inventory: the house, thing by thing** | **img-004 (the veranda lounge with three surfboards against the wall) full-bleed 16:9; phone img-034 (the rack) 1:2; name in Grand Hotel in ink centred on a soft veil + slate-sign button** | centred 680 px column; 5/7 rooms intro + icon list; two stacked 7/5 room rows with 3:2 slideshows; full-width 21:9 courtyard band; three matted 2:3 prints; 5/7 sign split | `#FFFFFF` + `#F0F0ED` (img-004 veranda wall) | micro only: desktop Kube parallax on the hero, dots, cross-fades, press, bar slide-up | per-room buttons + persistent phone bar expanding to the audit summary (Morgan's Rock) | — |
| **Sea You Surfers Nest** | 2 · interactive "In the palms" | same | **img-003 (mint table on the upstairs balcony) full-bleed, a WebGL cinemagraph moving only the photograph's own palm fronds through a painted mask, pointer/tilt gusts; Kalam title + bottle-green button** | 4-up fact row; list + stage room viewer with a sticky pill; momentum-drag shelf of nine object close-ups; 7/5 shower split; quote swipe row | `#FFFFFF` + `#E9F2E7` (img-003 sunlit table top) | palm cinemagraph, pill slide, tile lift, inertial shelf, cross-fades | inline "Who's coming?" tiles (two / group / a question) → the matching one of three channels; hero and bar go direct | — |
| **Sea You Surfers Nest** | 3 · unique "Every side of the four-poster" | same | **img-015 (gabled mint four-poster) full-bleed and clean; the first scroll pulls back out of the photo into a WebGL-drawn mint four-poster; Leckerli One title + velvet-teal button** | offset 12 columns; pinned 300 vh turn with DOM captions; 2-up room slideshows; true 3-column masonry; offset print pair; turning quote stack; gabled closing panel | `#FFFFFF` + `#ECEBE5` (img-002 linen) | pull-back + pinned rotation, door-swing sheet, quote-stack turn, press | side sheet that swings open like a door, `/stay/` URL; hero and bar bypass it | **pinned product rotation (pattern 2):** img-015, 002, 017, 059 at the quarter turns |

**No two rows share archetype + first-screen device.** The archetype is new to the run, and all fifteen first screens are different devices.

**The closest rows, honestly:**
- **Concept 1 and Cheeky Monkey (all three)** both put surfboards on the first screen. They do not look interchangeable once you squint. Cheeky is a loud, saturated shop of boards (a road through board noses, a reel, a board-shaped window) with painted-sign scripts and magenta, red and blue buttons. Sea You's is one quiet white veranda with a rattan chair, a lamp and three boards to the side, with a slate button. It is still the pair to put side by side at the gate.
- **Concept 2** is the run's fourth full-bleed still with a shader: Lotus 2 moves sunlight, Coconut 2 is a depth parallax, Sanjee 2 moves the sea. The effect is different (wind in masked fronds, while the furniture stays still), and the subject is a balcony, not a garden, a thatch or the water. The device family is crowded, which is reported here.
- **Concept 3 and Lotus 3 / Cheeky 3** are all WebGL uniques, but theirs are effects on white around a photo (a net, a board-shaped window). Sea You 3 opens as a plain full-bleed photograph and turns into a drawn 3D object only on scroll.
- **Lotus 1** also has carved woodwork (its gate). That is why no Sea You first screen uses the carved doors (img-051, img-024), although they are among the best photographs. They appear only from section 5 down.

**Set-pieces:** Cheeky uses pattern 9 (zoom-through) and Coconut pattern 6 (sticky split). Sea You 3 uses pattern 2 (pinned rotation). No pattern is shared.

**Booking accents across the run:**
- Cheeky: red fin, magenta, blue fin.
- Lotus: `#B8431C`, `#0165A3`, `#5E4699`.
- Coconut: `#48660B`, `#A1591B`, `#BE4532`.
- Sanjee: `#DE1446`, `#05368A`, `#C72C60`.
- **Sea You: `#3C5965` (slate), `#334825` (bottle green), `#1B5654` (velvet teal).**

Sea You's three are all cool and dark, because the house is painted in one family of greens. Its two warm colours, the red-oxide floor and the sign's orange sun, are already Lotus's and Coconut's accents. The three are apart in hue (about 197°, 97° and 178°). The nearest pair is Sea You 1 slate and Sea You 3 teal, which are within the same business, and only one ships. Nearest across the run: Sea You 2's bottle green and Coconut 1's banana-leaf `#48660B` are both greens. Sea You's is much darker and bluer, and Coconut's picked page does not depend on it.

**Type pairs:** Karla + Grand Hotel, Plus Jakarta Sans + Kalam, Instrument Sans + Leckerli One. No face is shared with the run or with gold (gold uses Figtree, Bricolage Grotesque, Outfit, Urbanist, Jost, Lora, Damion, Dancing Script, Marck Script and Satisfy).

**What a visitor would notice is different:**
- **From Cheeky Monkey:** Cheeky is a loud surf shop on a main road, with packages, a shop and painted lettering everywhere. Sea You is a quiet, white, mint-green B&B you get to know object by object, and its boards are three leaning on a veranda wall, not a wall of stock.
- **From Lotus Surf House:** Lotus takes you through a carved garden gate and up a house floor by floor, from fan rooms to King Rooms to the roof. Sea You has seven rooms that are all alike, says so, and shows the one bed from every side instead of the floors.
- **From Coconut Surf Inn:** Coconut is a stay told by the clock, from a roof that looks over the reef, with a live forecast. Sea You never shows the sea, carries no forecast, and tells the stay by its things rather than its hours.
- **From Sanjee Surf School:** Sanjee faces the water and sells two hours with one instructor. Sea You faces inward, sells a bed, and is booked through three listings, not a message.

---

## 6. For the copywriter, the deployer and Alon (gaps the concepts hit)

- **Schema gap: a short hero subtitle.** The `tagline` (59 characters) is too long for the hero. All three concepts use the business name + "Midigama, Sri Lanka" (the town and country from `contact.address`). This repeats the optional `heroLine` (≤ 50 characters) that Cheeky Monkey and Lotus already asked for.
- **Schema gap: a short CTA label.** The audit's and copy's label, "See rooms and live dates on Booking.com" (39 characters), is the length the calibration rejected for a hero button. The concepts use the template label "See live dates" on the hero and in the collapsed bar, with the full label in `aria-label` and on the section buttons. Proposal: an optional `bookingLinks[].shortLabel` (≤ 20 characters).
- **Schema gap: room galleries.** `rooms[].photo` holds one photo, but every concept sells each room with 6. This is the same `rooms[].photos[]` (≤ 8) that Cheeky, Lotus and Coconut asked for.
- **Concept 3's set-piece** picks its four turn photographs as the first four of the room galleries, which depends on that gap. Until then the mockup wires img-015, 002, 017 and 059, and the deployer seeds `focalX` / `focalY` for each.
- **Concept 2's cinemagraph mask** is tied to img-003. If the owner replaces the hero photo, the shader must switch off and show the new still. It must never run on a photo it was not painted for. This needs a template rule, not a schema field.
- **The phone (+94715880052) is read from the sign and not confirmed** (`gaps[0]`). Every Call button in this file is conditional. If it is not confirmed, concept 2's "A question first" tile points to the Airbnb room listing.
- **Owner items the page shows as gaps, never as guesses:** which room has the A/C, which rooms have their own bathroom, the check-in time, whether breakfast is in the rate, where the carved grey double door is, and the break and season.
- **No Instagram, no video, and no photograph of the sea, the street, Ashly or breakfast.** These are pitch points. The calibration's Instagram section is omitted, not faked.
- **Kenza's quote** contains a line break. It renders as a line break in every quote device (review N4).
- **Copy check for the designer:** every on-page sentence above is a copy field or an interface label. "In every room", "Who's coming?", "Two of you", "A group", "A question first", "Scroll, and the bed turns" and "See live dates" are template labels. The "In every room" list restates only the "Seven rooms" block's objects, and the critic should check it does not duplicate a fact in a second place with new wording.

**The one thing I would most want photographed on location:** **the minute's walk from the courtyard to the waves, in one unbroken clip.** Out past the board rack, through the gate under the sign, and down to the beach that the listing's own name promises and no photograph shows. It is the video this house does not have, and the only proof of its best claim. Second: Ashly at the balcony table at breakfast.

---

## Hand-off checklist

1. **Every photograph looked at.** I used five contact sheets of img-001–082, a 600 px sheet of all 25 landscapes, a hero-candidate sheet (img-051, 024, 015, 003, 005, 036, 016, 030) and the sign at full resolution. **The largest usable width of the best photograph is 2000 px** (img-002, 003, 004, 015, 017 and others). Twenty-six are ≥ 1920 px. ✔
2. **`agents/designer/references.md` read in full this run.** Cited: #1, #2, #4, #5, #7, #9, #14, #17, #20 (no overlays: nothing covers the first screen), #26, #27 (the drawn-object precedent), #28 and the Calibration section. ✔
3. **Divergence table.** It includes every business concepted in this run: Cheeky Monkey, Lotus, Coconut and Sanjee, all three rows each. No archetype + first-screen device repeats, and no set-piece pattern is shared. ✔
4. **Videos:** none exist (§2), and that is stated for each concept. The ten strongest photographs are listed with widths and used. ✔
5. **Each concept says why it beats what we have and names the comparison:** the Booking.com phone listing (`assets/walk/03-booking-com-fold.png`; there is no own site) and the gold bar (Global Surf `postcard` / `the-sign`, `the-lavish-haven.html`). ✔
6. **First screens:** each carries own media ≥ 1920 px on desktop (img-004, img-003, img-015) with the phone crops named, what + where (name + "Midigama, Sri Lanka"), and the primary action `engine` to Booking.com in 1 tap. The rating sits with section 2 and the guests in all three, for the reason given in §3. ✔
7. **Facts trace to `en.json` / dossier keys:** `rooms[]`, `room_count`, `room_types_note`, `stayInfo`, `amenities[]`, `ratings[]`, `testimonials[]`, `spot`, `contact`, `bookingLinks[]`, `business.owner`, `images_note` and `gaps[]`. There is no price, break, season, check-in time or A/C room assignment. ✔
8. **Every colour has a hex, an asset id, a crop or method, and what it shows.** White-text contrast on the accents is 7.5, 10.0 and 8.4. ✔
9. **Default-look list:** the slate (concept 1) and velvet teal (concept 3) accents sit close to "muted petrol / teal", and each has its reason written from the house's own sign and throw. There is no cream ground, no listed display or body face, no all-caps labels, no numbering, and no arrows on links. " | " follows the calibration. ✔
10. **One thing per concept:** the board rack, the balcony table in the palms, the four-poster. Nothing else on each page is louder. ✔
11. **Main items:** calm uses img-004 with micro-animations and no canvas. Interactive uses the WebGL palm cinemagraph on img-003. Unique uses the WebGL pull-back and pinned four-poster rotation from img-015. Micro-animations are named for each. No first screen is a plain cookie-cutter section. ✔
12. **`agents/designer/gold/` opened this run:** the pages were rendered in Chromium at 1440 and 390, not only the notes read. ✔
