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
