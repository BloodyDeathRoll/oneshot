# Lotus Surf House: visual-critic report

Run `2026-10-midigama-01` · station 4f (quick, the three mockups) · **round 1** · visual-critic 0.2.0 · 2026-11-03.
Pages: `sites/lotus-surf-house/mockups/{calm,interactive,unique}/dist/`, also served live at :8913 / :8914 / :8915. Concepts: `sites/lotus-surf-house/concepts.md` (creative-director 0.6.1).

Shot sets (shared; screenshots are scratch and get deleted after the round, so every line says in words what its file shows):
- The mockups: `sites/lotus-surf-house/mockups/<variant>/shots/` desktop-NN / mobile-NN at 1440 / 390, scrolled. I re-shot all three because the dist files (21:19) were newer than the existing set (21:15). Calm: 14 + 15 captures. Interactive: 9 + 11. Unique: 14 + 16.
- The current presence. **The business has no website.** The comparison is what a visitor reaches today: `dossier/lotus-surf-house/funnel/walk/04-booking-com-fold.png` (the Booking.com mobile listing) and `01-google-listing-fold.png` (Google Maps).
- Gold, shot into my scratch folder this round: `the-lavish-haven.html` (`gold-lavish/`) and Global Surf `postcard` (`gold-postcard/`). The postcard set rendered with **broken images**, because the media is not on disk in this worktree. For it I used its layout from the sheet and `gold/global-surf-notes.md` for the hero method, not its pictures.
- My own Playwright walk (scratch): `live/int-*.png` (interactive with `?light=force`, frames 3 s apart) and `live/uni-*.png` (unique with `?net=force`, before and after a pointer sweep across the net). Both used SwiftShader WebGL.
- Tasteskill inspector: calm 9 FAIL / 6 WARN, interactive 9 FAIL / 7 WARN, unique 5 FAIL / 6 WARN.

Independence: I did not open the critic's or experience-critic's output for this business (`reports/2026-10-midigama-01/experience/lotus-surf-house/` exists; I left it unread).

Material context, which I accept from `concepts.md` §2 and do not hold against any variant: there is no usable video (all three clips are third-party with an unknown licence), and no photograph reaches 1920 px (the largest is 1600). So the video / ≥ 1920 px hard fail does not apply. The ground-floor rooms exist only as fisheye phone photos from 2021.

---

## Current presence: three-second test

- **Booking.com, 390 (04-booking-com-fold):** a navy bar and a yellow-framed search box. "Lotus Surf House" sits in heavy black type with a 9.0 badge. Then the best colour photograph the business has: img-001, the blue-and-yellow ping-pong table in full sun with the white guest wing behind, in a 1/42 carousel. Four amenity chips, then a yellow "Choose dates to see prices" block. Busy and generic, but **bright, sunny and clear**.
- **Google Maps, 390 (01-google-listing-fold):** a map, then "4.9 ★ (78) · 3-star hotel" and blue Directions / Call buttons. The photo strip shows the white colonnaded guest wing and a King room under its net.

The bar for "better" is therefore an OTA template. Beating it on mood and focus is easy. Beating it on **brightness and appetite of the picture** is not automatic, as interactive shows.

---

## 1 · calm "The gate"

**Three-second test**
- **1440 (desktop-00):** a white left half with "Lotus Surf House" in Parisienne at about 64 px, very well set, then "Midigama, Sri Lanka" and a brick-red pill. The right half is the carved gate (img-019) edge to edge, sharp, green and inviting. Calm, tasteful, clear. **But** the left half is 720 px of white holding three lines, so it reads as a "split hero" template. I would scroll, politely.
- **390 (mobile-00):** the gate full-bleed is lovely: canopy at the top, the sunlit garden through the doorway. The script title breaks onto two lines, "Lotus Surf / House", and its first line sits on the busy leaves and door frame, legible but working hard. The white "Lotus Surf House" wordmark at the top left sits on bright leaves with almost no contrast. I would scroll.

**Checklist**
- **Media:** the strongest portrait (img-019) leads and is used well at both widths. After that the page shrinks. desktop-03 shows the Standard twin as a 480×600 4:5 fisheye phone photo: overexposed white walls, soft, slightly blown. Beside it is about 500 px of empty tint ground holding a title and two lines, and the inspector flags the King Rooms section as an "empty middle" of 4464 px. desktop-02 has the garden img-020 at container width, which is fine. desktop-08 has the King room slideshow at full container width, which is the best room moment on the page.
- **Composition and grid:** the section-by-section rhythm is centred column → 6/6 room row → 6/6 room row → 5/7 porch → full slideshow → 3-up roof → centred quotes → 2-col getting-here → closing. It is orderly, but every section is the same light band at the same scale. Only the hero has scale contrast. Lavish Haven (gold-lavish desktop-00…03) moves from a giant cut-corner pool to a dark full-bleed and back. Calm never changes gear.
- **Typography:** the Parisienne + Hanken Grotesk pair is the best of the three and close to the "readable text + handwritten titles" bar. "In the garden", "Yelum", "Breakfast" and "Up on the roof" all read (desktop-02, 06, 09). Problems: the inspector counts 17 font sizes. The "Old rooms and new" statement runs 4 lines at 32 px (desktop-04). On mobile-01 the rating cards break their meta into three ragged lines ("Booking.com | 125 / reviews | 3 Nov / 2026").
- **Colour:** white, cool stone tint, dark olive ink and a brick-red accent. It belongs to the house, white on red passes, and the booking colour is unmistakable. It is also pale: there is no deep or dark moment anywhere on the page.
- **Hierarchy and rhythm:** the eye always knows where the button is. Pace is uniform from section 2 to the footer, with the same grey/white alternation (desktop sheet, rows 2–5).
- **Polish:** clean edges, consistent pill buttons, real footer buttons (desktop-12/13). The porch print (desktop-06/07) uses a matted, drop-shadowed photo frame that looks dated next to the rest. The mobile wordmark has a contrast failure on the hero (mobile-00) and again over the gravel at the hero's foot (mobile-01).
- **Distinctiveness:** the gate photo and the sign script make it feel like this house. Remove the hero and the page is a tidy hotel template.
- **Hero and motion:** clean, slick and one clear CTA, which meets the calibration (title + short line + one button, no rating stack). Motion is micro only (a one-time settle, dots, bar), which is correct for calm.

**Score: 6 / 10.** Competent and tasteful, template level below the fold. It is closest to Global Surf `postcard` in method (sign-script titles, one CTA, dot slideshows, a real footer), but well below it in media scale and in variety of sections.
**Better than the current presence?** **Yes:** first screen (desktop-00 / mobile-00 vs 04-booking-com-fold), its own gate and name instead of OTA chrome. Whole page: yes on clarity (floor-by-floor honesty), only modestly on beauty.
**Hard fail:** dimension 8 below 8.

**Fix list (biggest effect first)**
1. Give the King Rooms the page's second big moment: img-002 (1600×1200, the net and the balcony into the jungle) at full container width, cropped 16:9 at native size, with the title and room row set over or under it tight. Then the 6-photo slideshow. Remove the 4464 px empty-middle run around it (desktop-08/09).
2. Stop pairing each fisheye garden room with half a screen of empty ground (desktop-03…05). Put the three garden rooms in **one** section: a single 4:5 slideshow (all ground-floor photos) on the left and the three room types as a compact list with their notes and buttons on the right. That is a third of the height, with no blank halves.
3. Add one dark, full-bleed moment of change in pace. Use img-020 (the shade tree) at 1600 px full-bleed for "In the garden", or a deep-olive `#293408` band for the porch / Fiona quote with white type, so the page has a second gear like Lavish Haven's dark pool band.
4. Fix the hero type on the phone: keep "Lotus Surf House" on one line (about 44 px), shift it down onto the darker doorway area or add the planned 25 % radial shade behind it, and give the white wordmark a shade or swap it to ink once the header leaves the image (mobile-00, mobile-01).
5. Tidy the details: rating-card meta on two clean lines ("125 reviews" / "3 Nov 2026") on the phone, the porch print without the dated drop-shadow mat, the "Old rooms and new" statement cut to 3 lines or set at 26 px, and the type scale brought down to about 6 sizes.

**Keep:** the gate hero at both widths, the Parisienne / Hanken pair, the brick-red accent, the per-room "Check dates" buttons, the full-width King slideshow, the closing script line and the footer buttons.

---

## 2 · interactive "Dappled"

**Three-second test**
- **1440 (desktop-00; live/int-a, int-b with `?light=force`):** a full-bleed garden: a tree, a hammock on the left, a block wall, the ping-pong table at the right, and the foreground half bare dirt with fallen leaves. "Lotus Surf House" is set in white **Patrick Hand**, which reads as Comic-Sans-adjacent marker type, over busy leaves, with a blue pill under it. The picture looks like a phone snapshot of a back yard. The 1600 px source is stretched to 1440 and is visibly soft in the leaves. **I would not feel anything. I might scroll for the rooms.**
- **390 (mobile-00):** the tree's canopy fills the top two-thirds, then the title, the button, and the hammock and dirt. It is a bit greener and better than desktop, but the type still looks like a note on a fridge.

**Checklist**
- **Media, and the main item:** the WebGL shader runs (`?light=force`: the canvas goes from opacity 0 to 1 at about 1.5 s). Between two frames 3 s apart, PSNR is 33.8 dB: a faint whole-frame shift you cannot see by eye at normal viewing (int-a vs int-b look identical). The concept's own test ("a viewer thinks it is footage") is not met. A viewer thinks it is a still. So the variant has **no perceivable main item**. The hero photo itself (img-020) is weaker than Booking's lead (img-001, sunlit table and guest wing): shaded, grey wall, bare dirt across the bottom third.
- **Upscaled room photo:** desktop-02 shows the fisheye Standard twin blown up to about 660×830 CSS px. It is visibly soft and overexposed: the page's worst photo at the page's largest room size.
- **Composition and grid:** desktop-01 has a 4-up row of icon cards (beach, breakfast, live dates, ratings), the classic template icon-card row. The floor switch (desktop-01/02) is a good idea for this business, but its stage is a big photo plus stacked accordion cards plus a large handwritten quote. The inspector flags empty-middle runs of 2492 px ("Choose your floor", "Guests say"). The page is the shortest of the three (6595 px desktop) and feels thin.
- **Typography:** Patrick Hand titles ("Choose your floor", "Breakfast", "Guests say", desktop-01/04/05) are the weakest choice in the set. They are childish rather than a garden-guestbook voice, and fail the calibration's "tasteful and readable … the original's handwritten script is the bar". Using it for a 4-line quote (desktop-02, Yelum's words) makes it worse. Body is 15.5 px (inspector).
- **Colour:** the table-blue accent is clean, and white on it passes. On a white page with blue chips it reads as generic SaaS blue, close to Booking.com's own palette. The garden tint is a flat grey.
- **Hierarchy and rhythm:** clear CTA everywhere, and a three-button phone bar (book, call, expand) on every mobile frame. The sections are uniform and the cards repeat.
- **Polish:** desktop-00 has the header's "Getting here" in white on bright sky, low contrast. The quote cards (desktop-06) are dense small type in rounded boxes. The porch print reuses the drop-shadow mat. The footer (desktop-08) is good.
- **Distinctiveness:** apart from the floor switch, this could be any guesthouse template.
- **Hero and motion:** the hero follows the calibration form (title, line, one button), but it is not interesting or slick, and the main item is invisible. Micro-animations exist (pill, accordions, rolling digits, drag row), but the inspector still reports a "still page" (10 moving elements).

**Score: 5 / 10.** Below template polish because of the type choice and the photo use. It is not close to any gold page. It is furthest from Global Surf `picked` / `postcard`, whose hero is real, sharp moving footage.
**Better than the current presence?** **No, not clearly.** First screen (desktop-00 / mobile-00 vs 04-booking-com-fold): Booking leads with a brighter, more inviting picture of the house. This hero leads with a shaded yard and dirt. Whole page: the floor switch is clearer than Booking on what each floor offers, but visually it is no better than the OTA.
**Hard fails:** dimension 8 below 8; not clearly better than the current presence.

**Fix list (biggest effect first)**
1. Replace Patrick Hand everywhere. Use a refined script for titles only (never for quotes or long lines) or a characterful serif display. The quote in desktop-02 goes back to the text face.
2. Re-crop or replace the hero. Crop img-020 to the canopy, hammock and lit lawn, cutting the dirt foreground and the right-hand wall (on desktop, frame the top 70 %, not the centre). Or lead with img-001 (the sunlit table, the house's most joyful colour) and make the shader work on it.
3. Make the main item visible. The light drift has to be readable at a glance: about 3× the current amplitude on the sun patches, a clear 6–9 s breeze cycle, and real leaf-shadow motion on the lawn and wall. Test it the way the concept says: if a viewer sees a still, it is not the main item. The fallback is a slow Ken Burns push on the canopy, which is at least visible.
4. Never show the fisheye garden rooms above about 480 px wide or at more than native size (desktop-02). Shrink the floor-switch photo to a 4:5 at ≤ 480 px and let the King room (upstairs tab) carry the big image.
5. Replace the 4-up icon-card row (desktop-01) with one designed " | " details line and the two rating figures set large, and close the empty-middle runs in "Choose your floor" and "Guests say".

**Keep:** the floor switch as the booking structure (Garden / Upstairs / Roof with the fan/A-C chip), the expandable phone bar, the footer, the blue accent if the type around it gets warmer.

---

## 3 · unique "Under the net"

**Three-second test**
- **1440 (desktop-00; live/uni-a, uni-b with `?net=force`):** a white page. "Lotus Surf House" in Allura, beautifully drawn, with a portrait print of the King room's balcony view (img-025) at about 360×480 CSS px inside a large off-white gridded cloth with a blush hem, then a violet pill. It is the only first screen in the set with an idea. **But** the cloth reads as **graph paper or a quilted pouch**, not as a fine mosquito net: the mesh is a square grid, opaque at the sides, and visibly laid over the photo. The print is small in a sea of white. I would scroll out of curiosity.
- **390 (mobile-00):** much better. The print fills most of the width at about 650×860 device px, sharp and bright (palms, rattan chairs, sky), with the gridded net around it and a big violet button. It is the nicest phone first screen of the three.

**Checklist**
- **Media, and the main item:** WebGL cloth confirmed (two `net-gl` canvases go from opacity 0 to 1 at about 1.5 s). A pointer sweep across the print moved only the cloth's left edge a few px (uni-a vs uni-b, PSNR 35.2 dB). The "parts toward the pointer" effect is barely perceptible. The concept's own failure mode, "a gimmick around a thumbnail", is half met on desktop: the photo is 360 px wide on a 1440 screen. The concept's own remedy (520×693) is not applied.
- **The net over the photo:** the grid mesh is visible across img-025 (desktop-00, mobile-00: faint squares over the sky and the floor). It reads as screen-door texture on the picture, not as a soft veil.
- **Composition and grid:** the stepped "From the roof down" house section (desktop-02/03, mobile-02/03: roof 4:5 left, King 3:2 offset right, garden 3:2 stepped) is the best editorial layout in the set and genuinely tells the floor story. The garden masonry (desktop-06) is honest. The fisheye rooms appear at small sizes, which is right, though it gets crowded with six thumbnails beside three room blocks. The roof pair is offset (desktop-08/09). The inspector found no empty-middle on desktop.
- **Typography:** Allura + Gelasio is elegant and calm. The Gelasio body is a little small and grey at 1440 (desktop-02 "There's a roof terrace…"), and the inspector counts 16 sizes. The Fiona quote at 30 px over 6 lines (desktop-07) is a strong type-led moment.
- **Colour:** white, a sky-blue tint (`#E1F2FD`) and violet. The violet accent is distinctive and white on it passes. The pale-blue bands make the page feel cool and slightly clinical for a tropical garden house. There is no dark or saturated moment.
- **Hierarchy and rhythm:** better pacing than calm. The house section, the 2-up King slideshows, masonry, a type-led porch, the offset roof, quotes, the gate print and the closing net give real variety (desktop sheet). The phone bar is three buttons ("Check dates", "Choose a room", call) on every mobile frame. It is a little crowded, but clear.
- **Polish:** the closing net panel (desktop-12/13, mobile-14) is a drawn grid pouch over a pale-blue box. As the second use of the shape it looks like a placeholder banner. The drop-shadow mat returns on the Buddha print (desktop-08). The footer buttons are good.
- **Distinctiveness:** highest of the three. The net and the house-section stair grid belong to this place.
- **Hero and motion:** the hero has an idea and one clear CTA. The motion is too faint to count as a main item, and the inspector reports a "still page" (14 moving elements).

**Score: 6 / 10.** It has the best idea and the best mobile first screen, but the net renders as a grid pouch and the desktop print is a thumbnail. It is closest to `the-lavish-haven.html` in method (a drawn shape holding the business's material on white). It is below it because Lavish's shape is huge, saturated and confident (gold-lavish desktop-00/01: the pool fills two thirds of the screen), while this one is small, pale and hesitant.
**Better than the current presence?** **Yes:** first screen (mobile-00 vs 04-booking-com-fold), a bright, composed view of the best room instead of an OTA carousel. Whole page: yes, the house section explains the floors better and looks designed.
**Hard fail:** dimension 8 below 8.

**Fix list (biggest effect first)**
1. Make the net read as a net. Use a fine, near-transparent hexagonal or diamond tulle mesh (threads at 1 px, ≤ 6 % opacity), no opaque square grid, no grey shading at the sides, and gathered folds that catch light. Keep the mesh off the photo except as a whisper at the edges (desktop-00, mobile-00).
2. Grow the desktop print to the concept's own remedy and beyond: img-025 at about 540×720 CSS (≤ native at 1×), with the net frame scaled to about 820×860. The hero then fills the screen instead of floating in white.
3. Make the cloth respond visibly. The pointer should part it by 30–60 px around the cursor with a damped settle, and the phone should get a clear one-time sway on load. Now it moves a few px at one edge (uni-a vs uni-b).
4. Add one deep, warm moment to break the cool pale-blue/white rhythm. For example, the porch / Fiona quote on the ink `#392A1D` with white Gelasio, or img-020 full-bleed for the garden. Warm up the tint bands (the sky-blue reads clinical).
5. Redesign the closing net panel (desktop-12/13, mobile-14) so it is not a gridded pouch over a blue box. Either drop it, or use the same refined net over a real photograph (img-002, the bed under the net). Remove the drop-shadow mat on the Buddha print.

**Keep:** the idea, the Allura / Gelasio pair, the violet accent, the stepped "From the roof down" house section, the 2-up King slideshows, the type-led Fiona quote, the gate print in "Getting here", and the mobile first screen's proportions.

---

## Ranking at 4f (visual quality only)

1. **unique "Under the net" (6/10):** the only first screen with an idea, and the best editorial structure (the stepped house section). The net must stop looking like graph paper and the desktop print must double in size.
2. **calm "The gate" (6/10):** the cleanest, most tasteful hero (the carved gate, sign-script title, red button), but below the fold it is a tidy template of small fisheye photos and empty halves.
3. **interactive "Dappled" (5/10):** a comic handwriting face over a shaded dirt-and-wall snapshot, with a shader no one can see. It is not clearly better than the Booking.com listing it replaces.

**All three fail dimension 8 (< 8) and go back to the designer before any human sees them.**

**What the designer prompt got wrong (for the learn step):** with a thin photo set (max 1600 px, fisheye rooms, no video), all three designs met the material at its weakest. They gave small or upscaled photos large empty layouts, and put "subtle" motion where the main item has to be seen. The prompt should say: when the material is thin, compress layouts (no half-screen of empty ground beside a 480 px photo), never enlarge a sub-1200 px or fisheye image, add one dark or saturated full-bleed change of pace per page, and verify a main item by eye (two frames 3 s apart must differ visibly), not by its implementation existing.

---

## Round 1 — full (station 5)

Run `2026-10-midigama-01` · station 5 (full, the final site) · **round 1** · visual-critic 0.2.0 · 2026-11-04.
Page: `sites/lotus-surf-house/final/dist/` served at http://localhost:8960/ (the user's `astro preview`, dist built 15:29). A port of calm "The gate", revised after the human pick: Alon's photos in the top areas, the King Room first (img-002, img-025, img-021), revision approved by Alon 2026-11-04. I judge how well it is executed, not that choice.

Shot set (scratch): `reports/2026-10-midigama-01/visual-lotus-r1/` — desktop-00…10 (1440, page 8558 px) and mobile-00…12 (390, page 9818 px), with sheets, from `tools/shoot.mjs http://localhost:8960/`. The final's own `shots/` set (11:21) was older than the dist, so I shot it again. My Playwright walk: `walk-m-scroll450.png` / `walk-m-scroll700.png` (the phone header while the hero scrolls under it), `walk-d-porch.png` (the porch section at 1440), and a measured list of every rendered image against its natural size.
Current presence: the business has no website. The comparison is `dossier/lotus-surf-house/funnel/walk/04-booking-com-fold.png` (the Booking.com mobile listing: navy bar, yellow search box, heavy black name with the 9.0 badge, then img-001, the sunlit ping-pong table, in a 1/42 carousel, then amenity chips and a yellow date box) and `01-google-listing-fold.png`.
Independence: I did not open the critic's or experience-critic's report for this round.

**Three-second test**
- **1440 (desktop-00):** the same split hero as at 4f. The left is white, with "Lotus Surf House" in Parisienne at about 64 px (beautifully set), one line of description, a brick-red "Check dates on Booking.com" pill and a quiet Call link. The right half is the carved gate, img-019, sharp and green. It is calm, clear and has one obvious action. It still reads as a split-hero layout, and the line under the title leaves a widow: "…south coast of Sri / Lanka." I would scroll. On the next screen (desktop-01) the reward arrives: the King room, img-002, full-bleed at 1440×792, with "The King Rooms" set in white script over the floor. That is the page's best moment, and it is a real one.
- **390 (mobile-00):** the gate fills the screen. "Lotus Surf House" now sits on **one line**, in white script low on the doorway's darker area. Under it are the white line, a full-width red button and an outlined Call button. It is legible, warm and inviting. The white header wordmark at the top left sits on bright leaves, but it is readable. mobile-01 shows the King band full-bleed with the title over the bed. I would keep scrolling.

**Checklist**
- **Media:** this round the strongest material leads in the order Alon asked for. The gate is the hero (desktop-00 / mobile-00). The King room img-002 is full-bleed (desktop-01, mobile-01). img-025 (the balcony view) is a 484×605 4:5 print beside the King facts (desktop-02, mobile-02), then a 4-up strip of King details (desktop-03). The roof Buddha img-021 is 580×725 with two smaller roof prints (desktop-03/04). The garden img-020 runs at full container width (desktop-05). The fisheye ground-floor rooms are held at 440×550 in one slideshow (desktop-06, mobile-07), which is the right size for them. Measured: no image is drawn above its natural size at 1×. The hero's 720 px file is drawn at 723 px (desktop), which is fine. **Defect:** the porch print img-032 (`img-032-r1.25-840.webp`, desktop-07 / walk-d-porch) has the source's white Instagram border inside the 4:5 crop. The bottom ~70 px of the frame are white, and a white notch shows at the lower left. The rounded corners therefore show only at the top, and the photo looks cut off. The 4:3 phone crop (mobile-08) avoids the border and looks fine. The same photo also carries a heavy orange phone filter (floor and walls), the one off-grade picture on a page that is otherwise naturally graded.
- **Composition and grid:** the 4f fixes landed. The King run is now a sequence with real scale contrast: full-bleed band → 4:5 print + facts → strip. The three garden rooms are one compact section, a slideshow on the left and a list on the right (desktop-06), with no half-screens of empty ground. The roof is 5/7 with a print pair (desktop-03), and the ratings are a centred pair with a " | " facts line (desktop-04). The page is orderly and the pace now changes twice: the King band, and the garden photo at width. Weak spots: the King facts column on desktop-02 floats with about 170 px of empty space above "King Room with Balcony". The two rating cards have unequal widths (about 244 vs 196 px, desktop-04).
- **Typography:** the Parisienne + Hanken Grotesk pair is tasteful and works at both widths. "The King Rooms", "Up on the roof", "In the garden", "Yelum", "Breakfast", "Guests" and "Getting here" are all strong script moments. Problems: the desktop hero widow "Sri / Lanka." (desktop-00). The closing script line runs about 880 px wide over two lines (desktop-10, "Live dates and prices are on Booking.com. If you'd / rather ask us something first, call."), long for a script face, though still readable. The rating meta now sits on two clean lines on the phone (mobile-05), so the 4f fix is done.
- **Colour:** white, a cool stone tint, olive ink, and the brick-red booking colour, which is unmistakable on every frame. The page is still pale throughout and has no deep band. The full-bleed King photo now does the "change of gear" job, which is acceptable for a calm concept.
- **Hierarchy and rhythm:** the eye always knows where to go. The red action appears in the hero, the solid header (desktop-02…10), per section and in the closing, and on the phone as a bar with a round call button (mobile-02 onward). On mobile-02 the bar sits directly under the King block's own red button, so two identical red buttons are stacked on one screen.
- **Polish:** the pill buttons, icons and footer buttons are clean (desktop-10). Defects: (1) the porch crop (above). (2) **Phone, while scrolling out of the hero:** the header is still transparent, so the white "Lotus Surf House" wordmark lies across the hero's red button and Call pill as they pass under it (walk-m-scroll700, mobile-01 top: the wordmark overlaps "Call +94 77 464 7541"). (3) In the amenities line, wrapped rows end in a dangling " | " (desktop-09: "Outdoor shower |", "Room service |", "Luggage storage |"). (4) The hero widow and the unequal rating cards (above).
- **Distinctiveness:** the gate, the net-draped King bed, the roof Buddha and the sign-script titles make it feel like this house. Below the garden it is a well-made hotel page rather than a singular one.
- **Hero and motion:** the hero is interesting on the phone and clean with one CTA at both widths. It follows the calibration: title, one short line, one button, no rating stack, no overlay effects. Motion is micro only (a one-time settle, slideshow dots, header and bar transitions), which is right for calm. No WebGL or video main item is expected for this concept, and the dossier has no usable video.

**Score: 8 / 10.** Clearly professional and calm, and beautiful at the King band, the roof and the gate. Closest to Global Surf `postcard` in method (sign-script titles, one CTA, dot slideshows, a designed footer) and now near it in media scale through the King run. It sits below `the-lavish-haven.html` in boldness: there is no dark or saturated full-bleed moment, and the desktop hero's white half is a split template. Four polish defects, listed below, keep it from scoring higher. The porch crop is the only one a visitor would read as a mistake, and it shows only on desktop.

**Better than the current presence?** **Yes, clearly.** First screen: desktop-00 / mobile-00 against 04-booking-com-fold. The house's own gate and name and one red action, where Booking shows OTA chrome, a search box and a carousel. Whole page: the desktop and mobile sheets against the Booking listing. The King room is sold with a full-bleed band, a print and four details, where Booking has one photo among 42. The floors, the roof, the garden and the people are each given a section.

**Result: pass** (dimension 8 ≥ 8; better than the current presence).

**Fix list (biggest effect first)**
1. Re-cut the porch print img-032 for the desktop 4:5 slot (`.porch-pic`, desktop-07). Crop above the source's white border (the bottom ~7 % of the original and the white sliver at the lower left), so that all four rounded corners sit on photograph. Tame the orange filter (lower the saturation by about 20–25 % and lift the shadows) so it matches the naturally graded photos around it.
2. Phone header over the hero: turn the header solid, or hide the wordmark, as soon as the hero's buttons reach it. Switch at the hero's bottom minus the header height, not after the hero has gone. The wordmark must never overlap the red button or the Call pill (walk-m-scroll700, mobile-01).
3. Amenities line (desktop-09, mobile-10): drop the " | " separator at the end of each wrapped row. Use `::before` separators on all but the first item of each line, or a flex row with `column-gap` and no character separators.
4. Desktop hero: widen the line's measure, or balance it (`text-wrap: balance`), so it does not break "Sri / Lanka." (desktop-00). Give the two rating cards equal widths (desktop-04).
5. Desktop King facts (desktop-02): align the facts block with the top third of the img-025 print, or add the King strip's first photo beside it, so the right column does not float in ~170 px of empty space. On the phone (mobile-02), hide the persistent bar while the King block's own Book button is in view, so two identical red buttons do not stack.

**Keep:** the gate hero (both widths, one-line phone title), the full-bleed King band with the white script title, the King print + facts + strip sequence, the compact garden-rooms section, the roof composition, the dated rating pair with the " | " facts line, the Parisienne / Hanken pair, the brick-red booking colour, the phone bar, the Guests slideshow, and the footer buttons.

## Verification 1

visual-critic 0.2.0 · station 5 (full) · run `2026-10-midigama-01` · 2026-11-06 · live preview https://lotus-surf-house.os1.workers.dev/ · variant calm "The gate" (ledger `mocked -> picked`).

**Score 7/10. FAIL (below 8). Better than the current presence: yes.**

Evidence comes from the shared set `reports/2026-10-midigama-01/verify-1-lotus-surf-house/shots/`, which I did not re-shoot, and from my own live walks. Files named `live/...` were scratch captures and are not kept. Each line says in words what the file shows.

Independence: I did not open this round's `critic` or `experience-critic` reports. While finding the append point and the picked variant I saw the last lines of Round 1 (its fix and keep lists) and the ledger line with its 8/10. I did not read the earlier sections.

### Three-second test

- **Phone (`mobile-00`):** I feel like walking in. The eye goes to the carved gate under the leaf canopy, then the white script name, then the brick-red button. I would keep scrolling. This is the best moment on the page.
- **Desktop (`desktop-00`):** A lovely photograph, but half the screen is white with a small centred stack. Calm and clean, closer to a tidy split template than to an idea. I would keep scrolling because of the picture, not the composition.

### Checklist

- **Media:** No usable video exists: all three clips are third-party with an unknown licence, and the largest photograph is 1600 px, so neither visual hard fail applies. The strongest photographs lead and are big: the gate (`desktop-00`, `mobile-00`), the King room band (`desktop-01`) and the garden (`desktop-05`). The weak one is the Yelum veranda print (`desktop-07`, `mobile-08`): lilac walls, burnt-orange floor, leaning verticals. It clashes with the green and wood of the rest. A section titled "Yelum" shows empty chairs, and no person appears anywhere on the page. No surf or sea photograph exists in the set.
- **Composition and grid:** Strong at the two full-width moments (`desktop-01`, `desktop-05`). The middle repeats one move, a rounded print on the left and text on the right (`desktop-02`, `desktop-03`, `desktop-06`, `desktop-07`). In `desktop-02` the King facts float beside the print with empty space above and below.
- **Typography:** The script and Hanken Grotesk pair suits the place and works for short titles ("Up on the roof", `desktop-03`). It overreaches in the closing line, a 15-word functional sentence in script, with "Booking.com" in script too (`desktop-10`, three lines on `mobile-14`). Desktop subtitle breaks "Sri / Lanka." with an orphan (`desktop-00`). The inspector counts 17 font sizes.
- **Colour:** Brick red is unmistakable as the booking colour, with white text. The cool mauve-grey section ground (`desktop-05`, `desktop-06`, `desktop-08`) reads as an interface panel and does not come from the sunlit garden. The inspector's terracotta FAIL is noted, but the colour works here and I do not count it against the page.
- **Hierarchy and rhythm:** The eye always knows where to go and a booking action is always near. The first third has real pace. From the ground-floor rooms on, alternating white and grey bands flatten it.
- **Polish:**
  - The Yelum print is visibly wrong on desktop. Its bottom corners read square, because the served crop ends in a white band about 40 CSS px tall, with a white tab at the bottom left, on a white page (`desktop-07`, `live/yelum-print.png`). Every other print has four rounded corners.
  - Separators dangle at line ends: five wrapped lines of amenities, four ending in a pipe (`desktop-09`, also `mobile-11`), and "Check-in at any hour |" (`mobile-03`). That list takes five lines, which is not the compact detail line the calibration asks for.
  - On the phone, the fixed logo runs over the fading Call button during scroll (`mobile-01`).
  - Not defects: no horizontal overflow at either width (measured), footer buttons are clean, and the hover state deepens the button colour and lifts it (`live/d-hover-cta.png`).
- **Distinctiveness:** The gate and the script could only be this house for the first two screens. The middle could be many guesthouse templates.
- **Hero and motion:** The hero is clean, with one clear primary action. The only keyframe is the `settle` on load, barely visible when comparing `live/d-cold-300.png` with `live/d-cold-1800.png`, plus button and header transitions. The inspector reports "only 4 elements moved". The main-item rule binds interactive and unique, and this is calm, so I do not fail it for that, but nothing here lifts the score either. Reduced motion is clean (`live/rm-top.png`).
- **Inspector, read against the page:** 9 FAIL, 6 WARN. I count the hairline on `div.fc.live` (1152 px), the 3-line script headline at 390 and the still page. I discount the eyebrow, the terracotta and the button shadows as minor or defensible, and "covered text" as the sticky bar passing over text during scroll.

### The forecast block

**Effect: right content, right place, unfinished form. Net positive for meaning, net negative for polish.**

What it does well:
- It is the first visible proof of the "Surf" in the name, and Rosa's satellite map is the only sea on the page (`live/d-forecast-1.png`).
- The position works: practical facts, then the wave, then the closing Book action (`desktop-10`).
- The left half matches the page: the same grey and radius as the rating cards (`desktop-04`), the same numeral with small unit, the site's own type.
- Rosa's light theme sits comfortably on white and stays recognisable. Both halves share the same top and bottom edge at 500 px.
- It is well behaved. No third-party request before scrolling at either width. The iframe's position did not move between load and arrival (7995.3 desktop, 9374.5 phone). No overflow.
- Slow-phone load is short: headline at about 0.4 s and widget at about 1.3 s at 1.6 Mbps / 150 ms, then about 0.7 s and 2.0 s at 0.75 Mbps / 300 ms, without CPU throttling. Map tiles were still filling in as a dark mosaic when the widget switched on (`live/slow4g-widget-arrival.png`).
- The time is honest. "Friday 6 November, 20:30" is Colombo time (Rosa's `current.t` carries +05:30), and it read the same with the browser set to Asia/Colombo. It can trail the real clock by hours: it read 20:30 at 02:44 Saturday in Colombo. It is labelled as a time, never as "now".

What is wrong:
- **Breaks the written calibration.** `references.md` names this exact case: two-column blocks "without stretched spacing or dividing lines (the forecast section)", and any listed point keeps a page below 8.
  - Dividing line: a full-width hairline sits directly above the block (`desktop-09`, `live/d-forecast-1.png`).
  - Stretched spacing: the left card is pulled to 500 px, with about 115 px of air between the credit and the numeral and about 120 px between the wind line and "updated" (`live/d-forecast-1.png`).
- **Off the page's grid on desktop.** The columns run x 272-692 and 748-1168, while the section text and the hairline start at x 144 and end at 1296. The block aligns with nothing around it and looks parked.
- **Arrives unintroduced.** It is the only block without a script title, and nothing says what Lazy Left is or why it is here. It reads as an appendix under a rule. On the phone it becomes a run of about 860 px after a hairline (`live/m-forecast-1.png`, `live/m-forecast-2.png`).
- **Empty fallback.** With JavaScript off the phone shows a 350 x 500 grey box, mostly empty, with one centred underlined link, and the headline card is gone (`live/nojs-forecast.png`). The same box shows beside the headline while the widget loads, which is what `mobile-12` caught. The widget was live in all six of my JavaScript-on phone-width runs, so `mobile-12` is a loading state, not a failure. **Do not use `mobile-12`, or `mobile-sheet.png` which contains it, as a proposal screenshot.**
- **For the critic, not scored here.** Beside each other the halves can read as disagreeing: "from the north, offshore" next to three rows marked CROSS (`live/d-forecast-1.png`), and "Swell 8.6 s" next to 15s and 16s (`desktop-10`). The hours differ, so this is not shown to be wrong, but a surfer will notice it.

### Score: 7/10

Below 8 on the hard bar. The first two screens are at the level of an 8, on the phone especially. The page loses the point on the forecast block's calibration breach, the broken Yelum print, the dangling separators and a repetitive, still middle. The forecast block is not the only cause: the Yelum print and the separators do not depend on it.

### Better than the current presence? Yes

First screen and whole page. Compared: `mobile-00` and `desktop-00` against `dossier/lotus-surf-house/funnel/walk/04-booking-com-fold.png` (blue Booking chrome, the ping-pong table as lead, a date form) and `01-google-listing-fold.png` (a map with a sheet of small photos). Those captures date from the 3 Nov walk. The page shows the house as a place and offers a phone number, which the Booking.com listing does not. This is clear, and it does not rescue the score.

### Closest reference

Closest in method to Global Surf's readable face + script pairing (`global-surf-notes.md`), and below it: those sections are each "their own moment", with no decorative lines, and they lead on footage. Below `the-lavish-haven`, `ka-surf-hostel` and `layday-surf` on distinctiveness: each of those has an idea on the first screen (the pool window, the leaves, the room), where this one has a very good photograph.

### Fix list, biggest effect first

1. **Forecast block form, desktop.** Remove the top border on `.fc.live`. Put the block on the page grid so its left edge is x 144 like the text above it. Keep the widget untouched at 420 x 500. Drop the grey fill on the left half, or keep it, but gather credit, numeral, date, swell, wind and "updated" into one vertically centred group with no space spread between them.
2. **Introduce the block.** Give it a script title like every other section and one line tying the wave to the house. The dossier has a guest's words for it, for example "The location is perfect to go and surf at lazy left and right" (Booking review). The copywriter must pass it, and it must never call the break theirs (`notes/lotus-surf-house.md`).
3. **Yelum print.** Recrop `img-032` so the white band and bottom-left tab are gone and all four corners round, and pull down the lilac and orange cast. If it still clashes, use `img-005` (ping-pong under thatch) instead.
4. **Dangling separators.** Hide the pipe at each line end in the amenities and check-in lines at both widths, and set the amenities as a compact two-column list on desktop.
5. **Closing line.** Replace the 15-word script sentence with a short script title and put the practical sentence in Hanken beneath it, so the phone stops running three lines of script.

Smaller: with JavaScript off, collapse the fallback to a normal link row instead of a 500 px box (keep the reserved height only while the widget is on its way). Balance the desktop subtitle so "Sri Lanka" stays together. Stop the phone logo running over the hero's Call button in scroll.

If 1 to 4 land, I expect this page can reach 8, but that is a prediction and needs a fresh look.

### Keep

The gate hero at both widths, the full-bleed King band with the white script title, the garden landscape, the rating pair, the guests slideshow, brick red with white text, the phone booking bar, the footer buttons, and in the forecast the big numeral, Rosa's light theme and the placement before the closing action.

### Not looked at

- A real phone: everything was headless Chromium, and throttled runs had no CPU throttle.
- Swiping inside Rosa's widget, or the widget's other days.
- The arrows and dots of the two slideshows beyond their first slide.
- Global Surf's video and photographs: nine assets are missing in this checkout. I saw its layout, a phone video frame and its notes, not the full pages. Its `postcard` and `the-sign` pages were not shot.
- Booking.com and Google live: I used the dossier's 3 Nov captures.
- `/impeccable critique`, `/emil-design-eng` and the motion audit skills were not run.

## Verification 2

visual-critic 0.2.0 · station 5 (full) · run `2026-10-midigama-01` · 2026-11-09 · live preview https://lotus-surf-house.os1.workers.dev/ (redeployed today after the fix round) · variant calm "The gate" (ledger `mocked -> picked`). The section order follows Alon's gate-b words and is not counted as a defect.

**Score 8/10. PASS (just). Better than the current presence: yes.**

Evidence comes from the shared set `reports/2026-10-midigama-01/verify-2-lotus-surf-house/shots/` (shot 14:24Z today, desktop-00…11 for a 9208 px page and mobile-00…14 for a 10922 px page, plus both sheets). I did not re-shoot it. My own Playwright walks of the live page are scratch captures named `live/...` here. They are not kept, so each line says in words what the file shows. The comparison is the business's current presence: the Booking.com listing and the Google listing (`dossier/lotus-surf-house/funnel/walk/04-booking-com-fold.png`, `01-google-listing-fold.png`, `audit.json`). The business has no website.

Independence: I did not open this round's `critic` or `experience-critic` reports. I formed the view below first. Only then did I read Round 1 and Verification 1 to check their points (see "Verification 1 points" at the end).

### Three-second test

- **Phone (`mobile-00`):** warm, green and inviting. The eye goes to the carved gate under the leaf canopy, then to "Lotus Surf House" in white script on one line, then to the full-width brick-red "Check dates on Booking.com" with an outlined Call pill under it. It is legible on the photograph. I would keep scrolling. This is still the best screen on the page.
- **Desktop (`desktop-00`):** calm and well made. The gate photograph fills the right half. On the white left half sit the script name at about 79 px, a two-line description that is now balanced ("A guesthouse in Midigama, on / the south coast of Sri Lanka."), the red pill and a quiet Call link. It is one clear action. It is still a split hero and not an idea, but it is clean. I would scroll, and `desktop-01` rewards it with the full-bleed King room and "The King Rooms" in white script.

### Checklist

- **Media:** no usable video exists (all three clips are third-party, licence unknown, `concepts.md` §2), and the largest photograph is 1600 px. Neither visual hard fail applies. The strongest photographs lead and are big: the gate (`desktop-00`, `mobile-00`), the King room img-002 drawn full-bleed at 1440 from a 1600 px source (`desktop-01`), the balcony print img-025 (`desktop-02`, `mobile-02`), the roof Buddha (`desktop-03`) and the garden at container width (`desktop-05`, `mobile-06`). On the phone the King band crops a 1200 px-tall source to a tall portrait (`mobile-01`), so the soft Booking-grade photo looks a little soft. The Yelum veranda print now has a neutral wall and four rounded corners (`desktop-07`; `live/d-yelum-bottom.png` shows both bottom corners rounded on photograph). The rust floor is still the warmest patch on the page, but it no longer clashes. No person and no sea photograph exist in the set. The Rosa map is the only sea on the page.
- **Composition and grid:** strong at the two full-width moments (`desktop-01`, `desktop-05`). The middle still repeats one move four times, a rounded print on the left and text on the right (`desktop-02` King, `desktop-03` roof, `desktop-06` garden rooms, `desktop-07` Yelum). In `desktop-02` the King facts still float, with about 170 px of empty space above "King Room with Balcony". The two rating cards are still unequal widths, about 244 against 196 px (`desktop-04`). The ratings band is a small pair in a tall white band, which is the sparsest screen on the page. The forecast block now sits on the page grid. Its heading and card start at x 144 like the text above, and the widget's right edge is x 1296 (`desktop-09`, `desktop-10`, measured).
- **Typography:** the Parisienne and Hanken Grotesk pair suits the house. It is used for short titles only: "The King Rooms", "Up on the roof", "In the garden", "Yelum", "Breakfast", "Guests", "Getting here", "Surf at Lazy Left", "Come and stay". The closing is now a short script title with the practical sentence in Hanken beneath it (`desktop-11`, `mobile-14`, two lines of sans on the phone). The desktop subtitle no longer orphans "Lanka." The inspector counts 16 font sizes, which is more than needed but not visible as noise.
- **Colour:** white, the cool stone tint, olive ink and the brick-red booking colour with white text. Red is unmistakable on every frame. The inspector's terracotta FAIL does not count against the page: the colour is drawn from the place and works. The page is still pale throughout, with no deep band, which is acceptable for calm.
- **Hierarchy and rhythm:** the eye always knows where to go. A booking action is always in reach: the hero, the solid desktop header from about 840 px of scroll, each room, the closing, and the phone bar with a round call button. The pace is real in the first third, then it settles into alternating white and grey bands. The new "Surf at Lazy Left" section adds a change of content near the end, though not a change of gear.
- **Polish:**
  - Fixed since Verification 1: amenities are now a two-column list on desktop with no pipes (`desktop-09`). On the phone the pipes sit only between items on a line, never at a line end (`mobile-11`), and the check-in line wraps cleanly (`mobile-03`). The phone header now scrolls away with the page and no longer runs over the Call pill (`mobile-01` top shows the pill alone).
  - **New defect, desktop:** the header stays transparent until about 840 px of scroll, and its "Lotus Surf House" wordmark is drawn over the hero's own content as that content scrolls under it. At scroll 290 the small wordmark sits on top of the big script name (`live/d-y290.png`, text on text). At 470 it sits beside and partly under the red hero pill (`live/d-y470.png`). At 500 the pill and the Call link pass under it (`live/d-scroll-500.png`). Every desktop visitor who scrolls sees this.
  - Phone: on `mobile-02` the persistent bar sits directly under the King block's own red button, so two identical red buttons stack on one screen.
  - Not defects: no horizontal overflow. The footer buttons are clean (`desktop-11`, `mobile-14`). The slideshow slides horizontally with a visible mid-transition (`live/d-slide-mid.png`). Hover tints the outlined buttons.
- **Distinctiveness:** the gate, the net-draped King bed, the roof Buddha and the script titles make the first three screens this house. Below the garden it is a well-made guesthouse page rather than a singular one.
- **Hero and motion:** the hero is clean, with a title, one line and one primary action, with no rating stack and no overlay effects. Motion is micro only. There is a one-time `settle` of the gate photo (scale 1.035 to 1 over 1.4 s, gone under reduced motion, measured), the header turning solid with the nav and "Check dates" fading in, the phone bar sliding up after the hero, the dots and the slide transitions, and quote cross-fades. The inspector reports a still page ("only 4 elements moved"). The main-item rule binds interactive and unique, and this is calm, so it is not a fail. Nothing in the motion lifts the score either.
- **Inspector, read against the page (8 FAIL, 5 WARN):** I count the still page and the 16 sizes as real but minor. I discount the following. The "Upstairs" eyebrow is a small icon label. The forecast date line is a data label, not an eyebrow. The 1–2 px button shadows are barely visible. Terracotta is sourced. "Covered text" is the sticky bar passing over "Up on the roof" during scroll. "Reduced-hidden" is the desktop nav, which is hidden by design until the header turns solid. "Empty-middle" on "In the garden" is a two-column text pair over a full-width photo, and it reads as intended (`desktop-05`).

### The forecast block (live)

**Now a finished section.** It has gone from an appendix under a rule to a section of the page.

- **Introduced:** the script title "Surf at Lazy Left", one bold line ("Lazy Left is the Rosa spot nearest the house."), and Giada's Booking review "The location is perfect to go and surf at lazy left and right" with name, source and date (`desktop-09`, `mobile-11`/`mobile-12`).
- **Form:** there is no dividing line above it. The left half is one compact grey card, 620 × 220 at desktop (measured), on the same tint and radius as the rating cards. From top to bottom it holds the credit, "Forecast for Mon 9 Nov, 14:30", the big numeral "0.4–0.7 m" with the swell, wind and "Rosa, updated" lines beside it, and the "See today's forecast for Lazy Left on Rosa" link. There is no stretched air. The left column (title, line, quote, card) and Rosa's 420 × 500 widget share the top edge. The card's bottom ends about 34 px above the widget's bottom, which reads as balanced (`live/d-fc-late.png`).
- **Rosa's widget:** light theme, untouched and recognisable, with the satellite map, "Lazy Left", the Epic badge and three rows for today (`live/d-fc-late.png`, `mobile-12`).
- **Loading:** no Rosa or other third-party request on first load at either width (measured). The JSON and the iframe are requested only after scrolling to the block. While the widget loads, its 420 × 500 space is held by a plain tint box, and nothing shifts (`live/d-fc-early.png`).
- **JavaScript off (phone):** title, line and quote, then one compact tinted link card, "See today's forecast for Lazy Left on Rosa ›", and no empty 500 px box (`live/m-nojs-fc.png`).
- **Still visible, critic's lane, not scored here:** beside each other the halves can read as disagreeing. The headline says "Swell 7.9 s from the south-east, wind 5.7 km/h from the south, onshore". The widget's rows say 14 s / 12 s SSE with the wind marked OFFSHORE / CROSS (`desktop-10`, `mobile-12`). The models and hours differ, but a surfer will notice.
- The credit "Forecast for Lazy Left by Rosa" is an underlined text link. The calibration dislikes underlined links, but this credit line is required by playbook §4, and it is quiet. Not counted.

### Score: 8/10

Clearly professional and calm. It is beautiful at the gate (especially on the phone), the King band and the garden, and it is clearly better than the Booking.com and Google listings. Every Verification 1 fix that cost the point has landed: the forecast form and its introduction, the Yelum print, the dangling separators, the closing line and the JS-off fallback. No item on the `references.md` calibration list is now broken. It is a low 8. What keeps it from more is the repeated print-left / text-right middle, the floating King facts and the unequal rating cards, a page that barely moves, and the new desktop header collision. If the header collision is not fixed it should be fixed before the pitch, but it alone does not drop the page below the bar: it is in transit only, desktop only, and the phone, the customer's device, is clean.

### Better than the current presence? Yes

First screen: `mobile-00` / `desktop-00` against `04-booking-com-fold.png`, which shows Booking's navy chrome, a search box, a score badge and the ping-pong table as photo 1 of 42 in a carousel, and against `01-google-listing-fold.png`, a map with a sheet of small photos. The house appears as a place, with its own gate, its name and one red action. Whole page: the King rooms are sold with a full-bleed band, a print and four details, and the garden rooms with a slideshow and a plain list. The roof, the garden, the owner, breakfast, guests, directions and the surf each get their own section, and a phone number is given that the Booking listing does not show. Those captures date from the 3 Nov walk. I did not look at the listings live.

### Closest reference

In method it is closest to Global Surf `postcard`: sign-script titles, a readable sans, one CTA, dot slideshows and a designed footer. It is below it because those sections are each their own moment and lead on footage. It is below `the-lavish-haven`, `ka-surf-hostel` and `layday-surf` on distinctiveness: each of those has an idea on the first screen, where this one has a very good photograph and a clean split.

### Fix list, biggest effect first

1. **Desktop header over the hero.** Give the header its solid ground, or fade the wordmark out, from the moment the hero title reaches it (about scroll 230), not at about 840. The small wordmark must never sit on the script name or the red pill (`live/d-y290.png`, `live/d-y470.png`). On the phone the header already scrolls away. Keep that.
2. **Break the repeated middle.** Four sections in a row put a rounded print on the left and text on the right (`desktop-02`, `-03`, `-06`, `-07`). Mirror one of them, the roof or Yelum, to text left and print right. Alternatively, set the roof as a 3-up row of its three photos with the text above, so the page's rhythm changes once between the King band and the garden.
3. **King facts (`desktop-02`).** Align the facts block with the top of the img-025 print, or vertically centre it on the print's middle third and pull the 4-up strip up under both. That removes the ~170 px of empty space above "King Room with Balcony".
4. **Ratings band (`desktop-04`).** Give the two cards equal widths (both about 244 px). Then either cut the band's vertical padding by about a third, or move the pair into the Guests section above the quote, so the sparsest screen on the page goes away.
5. **Phone double button (`mobile-02`).** Hide the persistent bar while a section's own red "Check dates" button is in view, or drop the inline red button in the King block on the phone and keep only the Call pill there, so two identical red buttons never stack.

Smaller: one more micro move would help a page that the inspector measures as still, for example a 300 ms fade-up of each section's script title and print on entry, inside `prefers-reduced-motion: no-preference`. For the critic: check the forecast halves' period and wind wording side by side.

### Keep

The gate hero at both widths (the phone version above all), the full-bleed King band with the white script title, the King print, facts and strip, the garden landscape, the Parisienne / Hanken pair used for short titles only, brick red with white text, the phone bar with the round call button, the guests slideshow, the new "Surf at Lazy Left" section (title, guest quote, compact card, untouched Rosa widget, compact JS-off link), the short "Come and stay" closing, and the footer buttons.

### Verification 1 points (checked after my own view)

| V1 point | Now |
|---|---|
| 1 · Forecast form: hairline, off-grid, stretched card | Fixed. No line, on the x 144 grid, compact 220 px card (`desktop-09`/`-10`, `live/d-fc-late.png`). |
| 2 · Forecast unintroduced | Fixed. "Surf at Lazy Left" title, one line, guest quote. |
| 3 · Yelum print white band / square corners / cast | Fixed. Four rounded corners, neutral wall. The rust floor remains and is acceptable (`desktop-07`, `live/d-yelum-bottom.png`). |
| 4 · Dangling separators, 5-line amenities | Fixed. Two-column list on desktop, no line-end pipes on the phone (`desktop-09`, `mobile-11`, `mobile-03`). |
| 5 · 15-word script closing | Fixed. Short script title + Hanken sentence (`desktop-11`, `mobile-14`). |
| Smaller · JS-off 500 px empty box | Fixed. Compact link card (`live/m-nojs-fc.png`). |
| Smaller · "Sri / Lanka." orphan | Fixed (`desktop-00`). |
| Smaller · phone logo over Call pill | Fixed on the phone. The same kind of collision now shows on desktop (fix 1). |
| Not fixed (Round 1 points) | Unequal rating cards, floating King facts, stacked red buttons on `mobile-02`. |

### Not looked at

- A real phone. Everything was headless Chromium, with no CPU or network throttling this round.
- Swiping inside Rosa's widget or its other days. The forecast with data older than 24 h (only the live state and JS-off were seen).
- Every slide of the two slideshows. I saw the first slide and one transition of the garden-rooms slideshow.
- Booking.com and Google live. I used the dossier's 3 Nov captures.
- The gold pages were not reopened this round. I relied on my Round 1 / Verification 1 notes for `postcard`, `the-lavish-haven`, `ka-surf-hostel` and `layday-surf`.
- `/impeccable critique`, `/emil-design-eng` and the motion-audit skills were not run. The tasteskill inspector was run against the live page.
