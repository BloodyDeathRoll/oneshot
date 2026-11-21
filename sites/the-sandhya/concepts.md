# The Sandhya: concepts

creative-director 0.6.1 · run `2026-11-ahangama-01` · slug `the-sandhya` · 2026-11-06 · operator alon · `mode: test`

Read this session: the full runtime prompt (playbook 0.6.6, run yaml, base.md, references, schema, business types, rubric), `agents/designer/references.md` in full, `agents/designer/custom.md`, `agents/designer/scroll/playbook.md`, `gold/README.md` and the gold notes, `dossier.json`, `audit.md`, `audit.json.recommended`, `copy/en.json`, the design notes in `copy/review.md` and `copy/sources.md`, PLAN.md §9 on images.

Looked at: all 187 photographs on labelled contact sheets, ten of them at full size; `old-site-first-screen-desktop.png`, `old-site-first-screen-mobile.png`, `old-site-desktop.png`. The six gold pages were opened in headless Chromium. **The Global Surf media is not in this worktree,** so those three pages showed layout and type over empty colour, and `gold/shots/global-surf/` does not exist here. Lavish, KA and Layday rendered whole.

Tested in scratch, not delivered: first-screen crops and type at 1440x900 and 390x844, and a crude day-to-dusk grade of img-152. Concept 2's docked card was not rendered: the test only showed that text laid straight on img-032 fails. Concept 1's test button used an earlier red, not the final sampled hex. Colours were read from the pixels (median of a named region, or of its most saturated 8%). Contrast was computed from those values.

## What holds for all three (not repeated below)

- **First screen, in the HTML.** Logo, the `tagline` as `h1`, one real `<a href="https://hotels.cloudbeds.com/reservation/WMvA6V">Check rooms and live dates</a>`. `clicks_to_book` 1. The tagline answers what and where: `h1` text is never replaced by the logo. No intro layer, preloader, fade-in of the hero or text reveal, in any form. The link answers from the first byte. The hero box is painted with a colour sampled from its photograph, so the text is readable before the image arrives. Canvases are `pointer-events: none` and `aria-hidden`.
- **Booking.** Primary action `engine`, secondary `tel` and `email`, no WhatsApp (unconfirmed, audit recommendation 5). No date panel on our page: no dates shown that are not sent (audit recommendation 4). Each room has its own `bookingLinks` row with its `?rid=`. `?rid=` is unverified, so a room link must still land usefully if the engine ignores it.
- **Persistent action.** After the first screen: on phones a bottom bar with the full-width accent button and a round call button; on desktop the same button in the header. There is never a second booking button on the first screen.
- **Booking section** (audit `above_fold` order, near the end of the page): `tagline`, `spot`, the sentence "A continental breakfast for two adults is included in your stay.", the sentence "Nightly rates are on our booking page, for the dates you choose.", both ratings, the primary action, then `closing` with call and email buttons. The phone bar is the short form of this: logo in the header, action in the bar.
- **Ratings.** Printed as `9.7/10 | Trip.com | 56 reviews | read 2026-11-06` and `9.4/10 | Kayak | 159 reviews | read 2026-11-06`, each linked. The design prints each name, as `copy/review.md` asks. The two testimonials are shown whole, typos included, as `Guest User | Trip.com | June 2026` and `Guest User | Trip.com | February 2026`.
- **Words.** Only `copy/en.json`, plus template labels (Rooms, Dining, Call, Email, Map, Instagram). The only printed price is the copy's Exclusive Use row with its note. No nightly room rate anywhere.
- **Surface.** Light grounds, no rules or hairlines, no captions under photographs, buttons for actions, details compact with " | ", dots on slideshows, a real footer (Call, Email, Map, Instagram buttons; address, `hoursNote`). Inclusions are a list with small icons and no photographs. Each photograph run is cropped to one ratio or is real masonry.
- **Forecast: no, in all three.** This is a beachfront hotel, not a surf stay (Alon), and the dossier names no break. **Embeds: none.** The map is the hotel's own drawn map as a print plus a Map button to `contact.mapUrl`, so there are zero third-party requests.
- **Images never used:** img-025 and img-144 to img-150 (no stated location, and surf or stilt fishers are not the theme); img-036 and img-012 (identifiable guest, and the soft old hero); img-057 (white retouching blob on the wall). The island map img-151 is not needed; the coast map img-013 is the print.
- **Sunsets img-022, img-024, img-026, img-029** are on the hotel's home page under "Sunset" and "Our Location", with no stated place, though the harvester did not flag them. They appear only beside "Why Sandhya" about the sky, never beside "Kabalana and around".
- **The pool.** The copy gives no length or age and the sources disagree. No concept states or implies one. Photographs such as img-068 look like a private plunge pool; nothing may suggest a room has its own pool.

---

## 1. What this business actually is

Nine rooms in one long two-storey concrete frame, one room deep, so "all the rooms face the ocean" and a guest says the road behind cannot be heard (`room_count`, `reviews.quotes[0]`, img-152, img-039). You arrive at a blank grey wall with tall slatted timber doors standing open (img-038, the copy's "hidden door in the wide wooden façade"), and straight behind them is a double-height room with a stair hung on a fan of steel rods and a whole wall of glass onto the pool and the sea (img-032, img-138; Michelin's "double-height, glass-fronted" in `press`). Its name means twilight, yet its sharp photographs are nearly all of the middle of the day. It charges the top of its town on aggregators (`rate_snapshots`, never on the page), and its current first screen is a dictionary entry over a soft 1080 px photograph that never says "hotel".

## 2. What the material can and cannot carry

**Video, the business's own: none.** `vid-001` (739 s, 1920x1080) is a third party's vlog, `license: unknown`, `usable: false`, mostly a presenter talking, and it shows an earlier narrow pool. No hero moments, no timestamps, no concept relies on it. Instagram and Facebook reels could not be checked (robots.txt). This is a pitch point (`gaps[].videos`).

**Photographs, the business's own: 187,** professional and consistent. 41 are at least 1920 px wide, 46 have a long edge of at least 1920, 94 are 1200 to 1919 wide, 52 are under 1200. **Largest usable width: 2000 px.** Local files are capped there; the dossier records originals up to 8192x5464 upstream (img-074, img-076). A plain `curl` of an upload URL answered 406 from here, so the originals were not re-fetched.

The ten strongest:

| Asset | Size here (original) | What it is | Note |
|---|---|---|---|
| img-032 | 2000x1333 (6150x4100) | Double-height lounge: rods, stair, glass wall, pool, sea, low sun on the floor | The best photograph. Too busy for text laid on it |
| img-071 | 2000x1334 (8080x5390) | Square-on from a bed: glass doors, one palm, sea | Linen is a natural place for dark text. On the Studio+ King page |
| img-068 | 2000x1334 (8084x5392) | Open glass door: red lamp, chairs, lounger, pool, lawn, palms, sea | Everything the hotel is in one frame |
| img-152 | 1920x1080 | The whole façade square-on from the beach, sand below | Reads as an architect's elevation |
| img-038 | 2000x1333 (4096x2730) | Road side: grey wall, teak doors, tree | The arrival |
| img-039 | 2000x1334 | The block, decks, lawn, palms | Afternoon |
| img-040 | 2000x1334 | Long pool, parasols, palms, sea | Strong subject, but the sky looks heavily retouched at full size |
| img-034 | 1500x2000 | Raked beach, stone bowl, slate sign with the logo | Best proof of place; portrait |
| img-027 | 1200x1200 | Façade at blue hour, curtains lit gold | **The real twilight picture, and only 1200 px** |
| img-023 | 1200x800 | Lobby with the sun low through the glass | At the hard floor; surfboards bottom-left, crop them out |

Also strong: img-035, img-065, img-076 (bath with view), img-031 (pool water), img-153, img-015 and img-154 (dusk and night, 1280), and the detail set img-125, 126, 130, 131, 135, 138, 139, 140. Food: img-118 (2000), img-117 (1920), img-112, 113, 115 (1280). img-033 (1334x2000) is a good portrait but has a halo round the parasol pole.

**What the sizes decide.** The noon and interior pictures can go full-bleed. **No twilight photograph clears 1920 wide,** so twilight is a print in concepts 1 and 2 and a grade of img-152 in concept 3. A 3:2 frame cropped for a phone leaves 616 of 2000 px: about 1.6x, soft on a sharp phone. Where a phone hero crops that hard, the concept says so.

**Identifiable people.** Staff img-141, 142, 143 are unnamed ("confirm with the owner before leading"): supporting prints in concept 1 only, never leading, never named. Guest img-036: not used. The guest in img-033 is seen from behind.

**Atmosphere:** no `stock/` folder exists and none is needed. The business's own photographs carry every moment.

**Words.** Worth setting large: `featureLine`, the intro heading, "We are not international. We are not local. We are simply The Sandhya.", the Wallpaper* sentence, "It is that magical moment between light and dark." Long: Kabalana (1,133 characters), Dining, Casual Luxe, so they need columns or steps, not one block. `tagline` is 81 characters: two lines on desktop, three on a phone.

**Numbers:** 9 rooms; 38, 38, 40 to 43 and about 75 sq m; 3.5 m glass doors; 500 thread count; ratings above; 25 minutes to Galle Fort; 1.4 km to the station; 14:00 and 12:00; US$3,500 from, plus ++; 2017 and 2023.

**Gaps worth saying aloud:** no rate on any room, so the page sends people to live dates and says why. Stay facts carry a disclosed contradiction (`stayInfo.note`), shown plainly. No Instagram posts were read, so **there can be no Instagram feed**, only a button. No season. Owner unnamed.

## 3. The page archetype

**One day, noon to twilight.**

The page is a single day at the hotel. It opens in full daylight and gets later as you scroll: bright rooms, lunch, low sun across the lounge floor, and it ends at the hour the place is named for, with the meaning of the word and the last booking action. It belongs to this business because the name is the idea, and the current site spends its first screen on that word instead of earning it at the end. It is a Persuade page in impeccable's terms: success is a tap into the engine by someone who now believes the price. The ground stays light throughout: **twilight here is a picture and a tint, never a dark page** (hard constraint 4). That is the trap in this name.

Lavish Haven (gold) also runs noon to night on scroll. Only the method is shared. Its pool-shaped window of drawn water, its Jost and its palette are not used, and here the day comes from this hotel's own name.

---

## 4. Three concepts

### Concept 1 · calm · "The Artwork"

**The idea.** Every large moment is the view out through the hotel's own glass, taken square-on like a framed picture, and words sit only where the room leaves space.

**The one thing.** The window from the bed: glass doors, one palm, the sea (img-071). The copy says it: "this captivating view is our artwork." Nothing else on the page is as large or as bright.

**Structure.**
1. First screen, below.
2. **Arrival.** Centred script title "Pause, take a deep breath & exhale. You are home."; below it a split with intro ¶1 and ¶2 on the left and img-038 cropped 4:5 to the doors on the right.
3. **The rooms.** A title and ¶1. Then four moments stacked, alternating sides: a 3:2 slideshow with dots on 8 columns and 4 columns of text holding name, `beds | Sleeps 2`, `note`, and the button with its `bookingLinks` label. Then ¶2 and ¶3 as a two-column list with small icons, and ¶4 and ¶5.
4. **featureLine.** Full-bleed img-068, the line in the script face on the pale wall at the left of the frame, where the room leaves space. On a phone the line sits on the ground above the photograph.
5. **The Dining Room.** Real masonry of img-118, img-112, img-115, img-113 beside the text in two steps.
6. **The house.** Full-bleed img-032 with nothing on it. Then Casual Luxe: the Wallpaper* sentence set large; a swipe row with peek of details all cropped 4:5 (img-131, 125, 139, 140, 130, 135; references #14); staff img-141 to 143 as small matted prints beside "Our service is warm…" (references #9).
7. **Kabalana and around.** On the sea tint. `spot` set large, img-034 tall, the drawn map img-013 as a print with a Map button, the body in two columns.
8. **Guests.** On the marble tint. Two rating blocks, two whole quotes side by side.
9. **Exclusive Use.** img-039 wide, text, the price row with its note, Call and Email buttons. "Looking after the place" sits under it as a short paragraph.
10. **Twilight.** On the ground, img-027 and img-022 as two overlapping prints at or under native size (references #10). "Why Sandhya" in script. Then the booking section. Then the footer.

**The first screen.** img-071 full-bleed, framed so the window sits on the centre line, no grade, no scrim. Header on the pale ceiling and walls: the logo in ink (`logo-white.png` with `filter: brightness(0)`) and three text links. The `h1`, two lines at 26 px, centred horizontally **on the white bed**, ink on linen at 6.3:1, with the crimson button under it. The view stays completely clear. It sits low rather than vertically centred, on purpose: the view is the subject. Tested at both sizes: it holds. **Phone:** the same photograph cropped to the window, three lines at 21 px, button under. 616 source px is about 1.6x, so this crop should be re-cut from the 8080 px original by a committed recipe, or the designer swaps to a sharper frame. **Rating: with the guests,** because a source, a count and a date on the bed would break the only clean thing here. Below-hero placement also fits the calm personality.

**Why it beats what we already have** (`old-site-first-screen-desktop.png`, `old-site-first-screen-mobile.png`). A visitor sees a room, a palm and the sea in sharp focus with the words "boutique hotel on Kabalana Beach", where the old page shows a blurred woman and a dictionary entry for a word. RESERVE is a 70x30 px control behind a white veil; here a large link works from the first byte, and the page weighs a fraction of 17.5 MB.

**Colour.**
| Role | Hex | From |
|---|---|---|
| Ground | `#F2F2F2` | sheer curtain, img-046 |
| Tint | `#DFDEE3` | marble niche, img-119 |
| Tint | `#A1C0B7` | sea through the window, img-071 |
| Ink | `#1D212B` | black parasol, img-040 |
| **Booking only** | `#CD0B40` | the red lamp's shade, img-007; white text 5.6:1 |

The lamp is in the rooms, in the lounge and in the hero's own corner. It would look wrong beside cream, teak orange or any teal.

**Type.** **Schibsted Grotesk** for everything people read, booking included: a plain Norwegian news grotesque, for a house the copy calls "Scandinavian design sensibilities". **Sacramento** for section titles only: a monoline script drawn from 1950s and 60s brochure lettering, for furniture "inspired by mid-century aesthetics". 44 px and up on desktop, 36 on a phone; test every title word and the "&". Neither carries Devanagari, so "संध्य" falls to the phone's system face at text size: acceptable, and checked in a render.

**Motion: no canvas.** Hero media is the still itself, with a single slow 1.00 to 1.04 settle towards the window over 20 s (transform only, once, no loop). Micro-animations: photographs ±4 rem parallax inside their frames, off under 767 px (references #17); slideshow crossfade 0.45 s, active dot widening; button press 0.97 in 120 ms; swipe row with momentum; bottom bar rising in 0.25 s after the hero. Headings do not animate. Reduced motion: no settle, no parallax, plain fades. JS off: everything is there and the slideshows are native scroll strips. Cost: under 8 KB of JS.

**Booking pattern.** The docked model (Morgan's Rock, references #4, #15), without price: direct link on the first screen, header or bottom bar everywhere, a button per room (#7), and the booking section near the end. One tap from every screen. Weight target, first load: hero under 280 KB (under 180 KB phone), fonts under 80 KB, total under 0.5 MB.

**Photographs.** Hero img-071. Rooms: Studio King img-077, 061, 062, 070, 079. Studio Twin img-043, 080, 165, 167, 083 (the last three shown at or under native width). Studio+ King img-042, 066, 067, 074, 076, 073. Director's Suite img-087, 171, 172, 058, 059, 055. Full-bleed img-068 and img-032 at 2000 px. Others as listed in Structure.

**Scroll set-piece:** none (not allowed in calm).

**What would make this concept fail.** A still photograph of a bedroom with a soft phone crop can read as just another nice hotel page unless the crop is sharp and the composition is held exactly square.

### Concept 2 · interactive · "Double Height"

**The idea.** You step into the lounge: the best photograph the hotel owns gains real depth, so the chairs slide against the stair and the sea stays far away as you move.

**The one thing.** The double-height glass room with its stair on steel rods (img-032). The rods' fan repeats nowhere else on the page, and no other picture is shown as large.

**Main item: a WebGL depth piece on img-032.** A hand-painted 256 px depth map (floor and near chairs, sofa, stair, glass, pool, sea) displaces the photograph by at most 1.5% of its width, following the pointer on desktop and page scroll on phones. It is plain WebGL with no library. At rest it is pixel-identical to the poster, so nothing pops. A second, smaller use: img-068 at the featureLine moment, same code, its own depth map. No idle drift.

**Structure.**
1. First screen, below.
2. **Rating strip.** A slim ground band: both rating blocks in one row. Directly under the first screen.
3. **The rooms.** Four tall photograph tiles, 4:5, room name set on the photograph, one tile offset to break the row (references #10), a swipe row with peek on phones (#14). The block's ¶1 above. Each tile is a real anchor to its room; with JS it opens the **room sheet**: a slide-over (desktop right side, phone full screen) with a dotted gallery, name, details, the room's `bookingLinks` button, and Esc and focus return.
4. **Arrival.** A split: img-038 on one side, intro heading and all four paragraphs on the other, ending at the pool sentence.
5. **featureLine.** img-068 with depth, full-bleed, the line on a small ground card at its lower left.
6. **The Dining Room.** A horizontal swipe row of food at one ratio (img-118, 112, 115, 114, 113, 108), the text above in two columns. Ground steps to the warm deck tint.
7. **Casual Luxe.** Text left, a dotted slideshow right (img-035, img-015, img-016, img-122), the closing "We are not international…" set large. "Looking after the place" under it.
8. **Guests.** A pool-coloured panel with two whole quotes.
9. **Kabalana and around.** img-034 and img-153 as two offset photographs, map print, Map button, text in three short steps.
10. **Exclusive Use.** A compact split with img-152, price row, Call and Email.
11. **Twilight.** Ground eases to the pale dusk tint. img-023 (cropped clear of the surfboards) and img-027 at or under native size, "Why Sandhya" in the script. Booking section, footer.

**The first screen.** A solid ground-coloured header (72 px, logo in ink, three links, no rule) because the soffit and rods would swallow a logo. Under it img-032 fills the rest of the screen, with no grade or scrim. Text laid straight on this photograph failed in test, both on the floor and on the wall. So the `h1` and the button sit on **a small opaque ground-coloured card with soft corners, docked bottom-left** over the desk and floor, away from the glass, pool and sea. Phone: photograph 100svh cropped to the right two-thirds of the stair and the glass, card docked full-width to the bottom edge, pool still visible above it; the crop is about 1.6x and should be re-cut from the 6150 px original by a committed recipe. Title 26 px desktop, 22 px phone, inside the card, not horizontally centred on desktop (reported below). **Rating: directly below the first screen,** not on it: a tagline, rating and button stack is what the calibration forbids, and the rating is the very next thing a visitor reaches.

**Why it beats what we already have** (`old-site-first-screen-desktop.png`, `old-site-desktop.png`). A visitor sees the architecture that Wallpaper* wrote about, in sharp light and moving slightly under the hand, where the old page shows a soft figure and keeps its interiors several screens down. The rooms are one scroll away and open in place with a real link inside, where the old RESERVE drops the visitor's chosen room and dates (audit F2, F8).

**Colour.**
| Role | Hex | From |
|---|---|---|
| Ground | `#F2F6F6` | cloud white, img-039 |
| Tint | `#D5CEBE` | pool deck in sun, img-040; panels only, never the page ground |
| Tint | `#5BB2CD` | pool water, img-031; guests panel, ink on it 7:1 |
| Dusk tint | `#F8E2D3` | brightest horizon, img-024 |
| Ink | `#121A22` | blue armchair's shadow, img-130 |
| **Booking only** | `#C0046C` | the magenta coffee cup, img-011; white text 6.0:1 |

The cup is the one saturated object in a house of concrete and teak. It would look wrong beside a muted sage or any orange.

**Type.** **Familjen Grotesk** for everything people read: Swedish, slightly quirky at the joints, carrying the same small mid-century oddness as the furniture. **Nothing You Could Do** for section titles only: a thin pen hand, chosen for the pen line of the hotel's own drawn maps (img-013) and the note-left-for-you warmth of "Ask for your heart's desire". 40 px desktop, 30 px phone. "संध्य" falls to the system face at text size.

**Motion.** Main item above. Micro-animations: room sheet slides in 0.3 s with the tile's photograph easing into place; gallery drag with momentum and dots following; button press with a soft ring from the tap point, on booking buttons only; ground colour easing over 0.6 s as sections change; header hiding on scroll down and returning on scroll up. Reduced motion: no depth, sheet fades, ground steps without easing. WebGL unavailable or weak device: poster only, identical picture. JS off: tiles are anchors to stacked room sections with every button live. Cost: WebGL and sheet code under 15 KB, depth map under 30 KB, both loaded after first paint.

**Booking pattern.** In-page sheet (Kube, Tandjung Sari; references #1, #2, #5), with the date fields taken out: the sheet shows the room and hands off with a real link, and its code loads on first interaction. The first-screen link stays direct. One tap to the engine from the first screen, two from a room tile. Weight target, first load: hero under 280 KB, fonts under 80 KB, total under 0.6 MB.

**Photographs.** Hero img-032, full-bleed at 2000. img-068 at 2000. Room galleries as in concept 1, with img-071 and img-068 in Studio+ King. Others as listed in Structure. img-033 is not needed.

**Scroll set-piece:** none (not allowed in interactive).

**What would make this concept fail.** Depth displacement tears at the edges of the near chairs and rods if the map is careless, and Shahar has already rejected a WebGL effect on media that "read as a mistake": if it looks like a filter, keep the amplitude lower or take it out.

### Concept 3 · unique · "The Hour"

**The idea.** One photograph of the building holds a whole day: noon at the left end, twilight at the right, window bays lighting one after another, and the day finishes as you reach the end of the page.

**The one thing.** The hotel's long, low elevation seen square-on (img-152), carrying the meaning of its name, "that magical moment between light and dark."

**Main item: a WebGL time-slice on img-152.** A shader grades the photograph across its width. Sky goes through a gradient map aimed at real values from the hotel's own twilight pictures (`#142E66` img-027, `#FF9B87` img-029); concrete and palms sink to silhouette; curtained panes glow towards `#F5CE52` (img-027). Hand-cut masks (sky, panes, sand) keep the edges clean. **No sky is replaced and no pixel is invented:** PLAN.md §9 still says no generated imagery, and the real building does look this way at dusk (img-027, img-154). A crude threshold version in scratch already read well, and its edge errors confirm the masks must be cut by hand. The frame is clearly a time-slice, not a claim about one moment. The slice edge follows the pointer by a few percent on desktop and moves with scroll.

**Structure,** on an 8-part grid taken from the façade's bays (one double, img-152):
1. First screen, below.
2. **The rooms as an elevation.** Four photograph panels side by side, **widths in proportion to floor area: 38, 38, 43, about 75**, from the copy's own notes. Tapping one expands it in place (the White Desert trip panels, references section 5) to show a dotted gallery, details and its button. Phone: stacked, heights in the same proportion. ¶1 above, the kit as an icon list below, then ¶4 and ¶5.
3. **Arrival.** img-038 wide, intro heading and text in a narrow column with air.
4. **The Dining Room.** Breakfast first: img-113, img-110, then img-118, 115, img-117 wide. Real masonry, text in two steps.
5. **The house, late afternoon.** img-032 at 2000, full-bleed, low sun across the floor, nothing on it. featureLine set large below. Casual Luxe in two columns, "We are not international…" large, img-138 and img-126 as two small details.
6. **Guests.** Rating blocks large, in the display face; two whole quotes.
7. **Kabalana and around.** img-153 wide and img-034 tall, map print, Map button, text in steps.
8. **Exclusive Use,** with `priceList` row, Call, Email; "Looking after the place" under it.
9. **Set-piece: the same photograph again,** full-bleed, pinned, the slice sweeping across until the whole building is at dusk. No text on it.
10. **Why Sandhya.** On the dusk ground: the display title, the two paragraphs with "संध्य" large inline in the same face, img-027 and img-154 as prints at or under native size.
11. Booking section, footer.

The page ground moves continuously with scroll from noon to dusk tint, always light.

**The first screen.** The time-sliced img-152, full-bleed. **The poster is the slice itself,** baked to a file by a committed recipe, so first paint and LCP already show the idea and the shader takes over without a visible change. White logo and links on the sky. `h1` centred horizontally **on the sand,** two lines at 27 px, ink at 7.5:1 on untouched sand, button under it. The sand is the only place text goes, and the grade must leave it light: no darker than a 0.8 multiply under the title, measured at 4.5:1 on its darkest pixel. The scratch test graded the sand harder than that, so this is a build requirement, not a tested result. **Phone:** a landscape building cannot fill a tall phone sharply (500 source px, 1.3x), so the photograph takes the top 66% of the screen, cropped to the double bay and door at 2x, and the `h1` and full-width button sit below it on the noon ground. **Rating: with the guests and the booking section,** because the first screen has one idea and it is the name.

**Why it beats what we already have** (`old-site-first-screen-desktop.png`, `old-site-desktop.png`). The old page explains the word in small type over a soft picture; here a visitor sees the word happen across the whole hotel, and reads "boutique hotel on Kabalana Beach" on its actual sand. The old page ends on a small blue-hour tile and a dark footer; this one ends with the building reaching that hour and the booking action right after it.

**Colour.**
| Role | Hex | From |
|---|---|---|
| Ground, noon | `#E0E8F6` | brightest cloud, img-152 |
| Ground, midway | `#F2F6F6` | cloud white, img-039 |
| Ground, dusk | `#F8E2D3` | brightest horizon, img-024 |
| Ink | `#322E1F` | shadow under the concrete frame, img-152 |
| In the shader only | `#FF9B87` | horizon band, img-029 |
| In the shader only | `#F5CE52` | lit curtain, img-027 |
| **Booking only** | `#142E66` | blue-hour sky, img-027; white text 13:1 |

The button is a piece of the hour the page is walking towards. It would look wrong beside orange, or beside any warm saturated button colour, which would break the day's logic.

**Type.** **Halant** for section titles and rating numerals; **Mukta** for everything people read. Both carry Latin and Devanagari, so the Sanskrit word on this page is drawn in the same type and not a system fallback. Halant is a warm, slightly wedged serif, used on a blue-white and pink ground, not cream (constraint 15). Subset Devanagari to the glyphs used. Tiro Devanagari Sanskrit was tried and is too heavy at title size.

**Motion.** Main item above. **Micro-animations:** rooms panel expansion 0.45 s on flex-grow with its photograph held in place; the persistent button crossfading its label; ground continuously easing; dots; button press 0.97; rating numerals still (no counters). Reduced motion: the baked slice at the top, no pin, the baked all-dusk still at the end, ground in three fixed steps. WebGL unavailable or a weak phone: the same two stills, swapped by plain CSS at section position. JS off: same, and every panel open. Cost: raw WebGL under 10 KB, masks under 40 KB, GSAP with ScrollTrigger lazy after first paint (GSAP 27 KB gzip per the scroll playbook §6.2). No three.js, no Lenis on a booking page.

**Booking pattern.** **The bar that remembers.** The persistent button reads "Check rooms and live dates" until a room panel is open or a room is in view, then becomes that room's own `bookingLinks` label and `?rid=` link, which answers audit F8. The underlying element is always a real `<a>`. One tap from the first screen, one from a room. Weight target, first load: baked poster under 280 KB (phone under 180 KB), fonts under 100 KB, total under 0.6 MB.

**Photographs.** Hero and set-piece img-152 (1920). img-032, img-038 at 2000. Room galleries as in concept 1, with img-071 and img-068 in Studio+ King. Others as listed in Structure.

**Scroll set-piece: yes,** pattern **pinned object** (`agents/designer/scroll/playbook.md` §2.3 no. 2, adapted): the building is held 200 vh with scrub 0.5 while the slice crosses. It qualifies by 41 own photographs at least 1920 wide and is built from img-152 only. **Reduced motion:** no pin, the all-dusk still. **No WebGL:** the same still. **Weak phone:** tier 1, the poster.

**What would make this concept fail.** If the grade looks like a Photoshop trick rather than the hour itself, the most distinctive page in the set becomes the cheapest; the masks and the concrete's falloff decide it, and the critics should judge the first screen alone before the rest is built.

---

## 5. Divergence table

No other business has been concepted in this run, so these are the only rows. Other runs are not compared (base.md, correction of 2026-09-28); gold was used for level and method.

| Business | Variant | Archetype | First-screen device | Grid | Colour ground | Motion idiom | Booking pattern | Scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| The Sandhya | 1 calm: The Artwork | One day, noon to twilight | Full-bleed framed view (img-071), text on the bed's linen | Centred axis, 8+4 alternating | `#F2F2F2` curtain white | Still with a slow settle; parallax recipe | Docked: direct link, bar, per-room buttons | — |
| The Sandhya | 2 interactive: Double Height | One day, noon to twilight | Full-bleed lounge (img-032) with WebGL depth, text on a docked card | Offset tiles and splits | `#F2F6F6` cloud white, stepped tints | Depth under the pointer; sheets, ring on press | In-page room sheet, then hand-off | — |
| The Sandhya | 3 unique: The Hour | One day, noon to twilight | Full-bleed façade (img-152) as a noon-to-dusk time-slice, text on the sand | 8 façade bays; room widths by floor area | `#E0E8F6` to `#F8E2D3`, continuous | Shader sweep, ground easing | Bar that remembers the room | Pinned object |

**Other businesses in this run:** none yet, so there is nothing a visitor could compare.

Among these three, a visitor sees a bedroom, a lounge and the whole building from outside; crimson, magenta and blue-hour indigo; a script with a grotesque, a pen hand with a grotesque, and a serif with a Devanagari-capable sans.

## 6. For the designer and the critics

- **Calibration points followed:** one title and one button on the first screen, no tagline-rating-button stack, no reveal animation on headings, white text on the booking colour, no rules under the header, no giant word on an image.
- **Two deliberate departures to judge:** the title is low rather than vertically centred in all three, because the subject is at the centre; in concept 2 it is on a card at the lower left, because this photograph takes no text.
- **Hero masks are tied to one photograph.** Schema v0.10 says a set-piece must never rest on coordinates for one picture. For a mockup that is fine. Later, the depth map and masks must be keyed to the photograph's hash, and when an owner replaces the hero the template shows the plain photograph with no effect.
- **Hero on phones:** concept 1 and 2 crop one 3:2 photograph. If the designer uses a separate portrait for phones, the template takes the first portrait row of `photos[]` and needs no new field.
- **New files** (baked poster, masks, depth maps, re-cut crops) need a committed recipe with a `# media:` header.
- **Label length.** "Check rooms and live dates" is longer than the calibration's "Book package now". It is the audit's and the copy's label and is final. It fits one line at 390 px in all three tests.
- **`custom.md` asks for dates inside the site; the audit forbids a date panel.** The audit governs here (hard constraint 8), because the engine's date hand-off is unverified and today's panel drops dates (F2).
- **`custom.md` asks for an Instagram feed.** No post could be read, so concepts carry an Instagram button only, and our own photographs are not presented as posts.

## 7. Schema gaps

- **Room galleries.** `rooms[].photo` holds one photograph and `photos[]` has no link to a room and stops at 24 rows. Selling four rooms with five or six photographs each, plus the other sections, needs more: a `rooms[].gallery[]` or a room tag on `photos[]`, and a higher cap. Mockups can run from the content file meanwhile. No field is invented here.
- **Rating and testimonial sources.** `platform` and `source` are `other`, with no label field, and `testimonials[]` has no URL. The design prints Trip.com and Kayak from `ratings[].url`; both quotes are Trip.com (`copy/sources.md`), which no content field says.
- **Booking section.** The breakfast and nightly-rates sentences have no field of their own, so the template reuses them by paragraph position, which an owner's edit can break.
- **Hero effect assets.** Masks and depth maps have no place in the schema (section 6).
