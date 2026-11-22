# Sea You Surfers Nest: visual-critic report

Run `2026-10-midigama-01` · station 4f (quick, the three mockups) · **round 1** · visual-critic 0.2.0 · 2026-11-22.
Pages: `sites/sea-you-surfers-nest/mockups/{calm,interactive,unique}/dist/index.html`. Concepts: `sites/sea-you-surfers-nest/concepts.md` (creative-director 0.6.1).

Shot sets (shared; screenshots are scratch and get deleted after the round, so every line says in words what its file shows):
- The mockups: `sites/sea-you-surfers-nest/mockups/<variant>/shots/` desktop-NN / mobile-NN at 1440 / 390, scrolled. Calm (build `54339bfd`) and interactive (build `3cd9891e`) were re-shot by `tools/shoot.mjs` this round because their dist was newer than the old set. Calm: 11 + 12 captures (pages 8390 / 8934 px). Interactive: 10 + 13 (7727 / 9369 px). Unique (build `e0899fc1`) was unchanged, so the tool reused its set: 17 + 20 (13137 / 14766 px).
- The current presence. **The business has no website.** The comparison is what a visitor reaches today, from the audit walk: `dossier/sea-you-surfers-nest/assets/walk/03-booking-com-fold.png` (Booking.com phone listing) and `01-google-listing-fold.png` (Google Maps), plus `05-airbnb-1-fold.png` (Airbnb). `funnel/walk.json` gives the context (390×844, logged out, no site).
- Gold, shot into my working folder this round: `the-lavish-haven.html` (`reports/2026-10-midigama-01/visual-sea-you-r1/gold-lavish/`). For Global Surf, whose media are not on disk, I used `gold/global-surf-notes.md` for the first-screen discipline.
- My own Playwright walk (working folder `visual-sea-you-r1/`): `int2-palms-1440-a/-b/-gust.png` and `int2-palms-390-*` (interactive served over http with `?palms`, frames 7 s and 10 s after load, and after a pointer sweep), `palms-crop-ab.png` (the top-right palm area of the two 1440 frames side by side), and `unique-1440-a/b/c.png` (the unique hero over 3 s and a pointer sweep). WebGL ran on SwiftShader.
- Tasteskill inspector (`inspect-<variant>.txt`): calm 4 FAIL / 5 WARN, interactive 4 FAIL / 6 WARN, unique 3 FAIL / 10 WARN.

Independence: I did not open the critic's or the experience-critic's output for this business.

Material context, which I accept from `concepts.md` §2 and the brief and do not hold against any variant: there is no video, and no photograph of the sea, the street or people. The Call buttons are off on purpose until the phone number is confirmed. There are 26 own landscapes at 2000 px, so a full-bleed first screen is expected, and all three deliver one.

---

## Current presence: three-second test

- **Booking.com, 390 (03-booking-com-fold):** a royal-blue bar and a yellow-framed search box. Then "Sea You Surfers Nest! Hello to waves in a minute walk" in heavy black type over two lines, and an "8.0 Very good · 8 reviews" badge. Then the lead photo, which is the round road sign against an overcast white sky, slightly soft, in a 1/45 carousel. Then amenity chips and a yellow "Choose dates to see prices" band. It is generic OTA chrome, and its picture sells a sign, not a stay.
- **Google Maps, 390 (01-google-listing-fold):** a map with the pin on the coast road, then "4.9 ★ (11) · Bed & breakfast", a blue Directions button, and a strip whose first photo is the grey street side of the building under an overcast sky.
- **Airbnb, 390 (05-airbnb-1-fold):** the strongest of the three. The courtyard is full-width at the top: carved grey doors with fanlights, a dieffenbachia, the teal-cushioned bench, a wooden stool. Then "Wake up to waves, 2026 rates, Sea You Surfers Nest", "5.0 · Guest favourite · 10 Reviews", and a pink "Check availability" button.

The bar for "better" is an OTA template. Airbnb's courtyard picture is a fair, bright first impression, so beating it takes a hero that is at least as inviting and a page that is clearly designed. Beating Booking.com's road sign is easy.

---

## 1 · calm "The board rack"

**Three-second test**
- **1440 (desktop-00):** the veranda lounge, img-004, full-bleed and sharp: carved grey doors with fanlights, masks, potted plants, a rattan bench and a teak table, an amber pendant, and two surfboards standing on the right. "Sea You Surfers Nest" in Grand Hotel at about 76 px, ink, centred both ways, with "Midigama, Sri Lanka" and one slate "See live dates" pill. It is warm and real, and it says "surfers' house" in one look. I would keep scrolling. Two faults. A soft white veil behind the title reads as a grey haze patch in the middle of the photo. A red fire extinguisher stands just right of the button, the brightest red thing on the screen. There is no header on the first screen: no wordmark at top left and no Book button.
- **390 (mobile-00):** img-034, three boards on the rack (orange, white with a blue rail, mint), sunlit, with a dieffenbachia in the corner. The title is on one line at about 40 px, then the place and a big slate pill. This is the best phone first screen of the three and clearly better than any OTA fold. The washed-out bright background (blown sky behind the boards) makes it a little pale.

**Checklist**
- **Media:** the house's most "surfers' nest" pictures lead at both widths (desktop-00, mobile-00). The courtyard band img-071 runs full-bleed (desktop-04: the teal-cushioned concrete bench under hanging plants), and the closing is img-002 full-bleed with the booking card over it (desktop-09). Those are the page's two big moments after the hero. The rooms are 3:2 slideshows at about 620×410 CSS px (desktop-02: the Deluxe four-poster with the grey doors open to the veranda). The photo is sharp and well chosen, but small on a 1440 screen, with the right half holding four lines and a button. The "Carved doors and a surfboard shower" three-up prints are about 150 px wide on desktop-05/06, the smallest pictures on the page, matted with a drop shadow.
- **Composition and grid:** centred column → 5/7 → two 7/5 room rows → full-bleed band + 5/7 → three-up prints → centred breakfast → 5/7 Ashly → 5/7 sign → full-bleed closing. It is orderly and has two full-bleed changes of pace, which is more than the Lotus calm had at 4f. The sections from "At a glance" to "Finding the house" are the same light grey/white alternation at the same scale (desktop sheet rows 1–3). The "In every room" list sits in a white rounded box (desktop-02). The inspector flags two rows of identical boxed cards (the rating cards and the icon box) and 13 font sizes.
- **Typography:** Karla + Grand Hotel. Grand Hotel is a condensed, upright connected script close to the sign's "Sea You" lettering, tasteful and readable on every title (desktop-03 "Standard Double Room", desktop-04 "Around the courtyard", desktop-07 "Breakfast", desktop-08 "Finding the house"). It is the right kind of pair for the calibration's "readable text face + handwritten titles". Weak spots: the "At a glance" block (desktop-01) is small, grey and centred, with the script quote on two lines at about 30 px and its credit "says the house's own listing" also in script, so the attribution looks like part of the quote. The rating cards' meta is 12–13 px.
- **Colour:** white, a warm off-white tint `#F0F0ED`, ink and the slate `#3C5965` from the sign. It belongs to the house, white on slate passes, and the booking colour is consistent from hero to footer. There is no deep or saturated moment apart from the photographs.
- **Hierarchy and rhythm:** one obvious action on every screen. On the phone, a full-width "See live dates" bar with a chevron that expands it (mobile-01 to -11). The rhythm sags from desktop-01 to desktop-03: a centred stack of small things, then text plus an icon box, before the first room photo arrives at the bottom of the third screen.
- **Polish:** clean pills, consistent radii, real footer buttons with icons (desktop-10). Inspector FAILs: five resting drop shadows on the matted prints (desktop-05/06, desktop-08's sign print). With reduced motion the hero title and button stay invisible ("reduced-hidden"), so a reduced-motion visitor sees a bare photo. At 390 the footer wordmark slides under the phone bar at one scroll position.
- **Distinctiveness:** the hero photographs, the sign-script and the slate make it this house. Below the fold it is a tidy guesthouse template.
- **Hero and motion:** the hero is clean and slick, with one clear CTA and nothing else (it meets the calibration). Motion is micro only (parallax, cross-fades, the bar), which is right for calm. The inspector says "still page" (7 moving elements).

**Score: 7 / 10.** It has the best first screens in the set and a sound, honest structure. Its middle is template level: small room photos beside empty halves, a centred stack of small text, matted mini-prints. It is closest to Global Surf `postcard` in method (script titles, one short CTA, dot slideshows, a real footer). It is below it because postcard's sections are each their own designed moment at large media scale, and here only the hero, the courtyard band and the closing are.
**Better than the current presence?** **Yes.** First screen: desktop-00 / mobile-00 against 03-booking-com-fold (road sign under grey sky) and 05-airbnb-1-fold (courtyard). The veranda with the boards is warmer and more specific than either, and it carries one clean action instead of OTA chrome. Whole page: yes. The rooms, the A/C line and the three ways to book are clearer than any listing.
**Hard fail:** dimension 8 below 8.

**Fix list (biggest effect first)**
1. Make the rooms the page's second big moment. Set the Deluxe slideshow at full container width (1120–1200 px, 3:2, img-002 first at native 2000 px) with the name, the " | " details and the button in one line under it, and the same for Standard. Drop the 7/5 split that leaves the right half to four lines (desktop-02/03).
2. Rebuild "At a glance" (desktop-01) as a designed band, not a centred stack of small grey type. Put the `spot` quote large in Karla at 40–48 px with the attribution in small Karla (not script), the " | " included line under it, and the three ratings as one large-figure row with no card boxes. Then the button. Bring the first room photo inside the second screen.
3. Clean the desktop hero. Crop or retouch the red extinguisher out of img-004 (shift the crop left by about 120 px, or mask it), and replace the white radial veil with a darker, tighter shade, or set the title in white with a soft shadow on a 15–20 % ink gradient, so there is no grey fog patch (desktop-00). Add the header (wordmark left, small "Book" pill right) to the first screen.
4. Give "Carved doors and a surfboard shower" real size. Use img-036 (the board shower) as one 2:3 print at about 480×720 CSS px beside the copy, and img-027 / img-035 at 320 px, with no mats and no drop shadows (desktop-05/06, inspector `shadow`).
5. Tidy: move the hidden starting states into `prefers-reduced-motion: no-preference` so the reduced page shows the title and button. Cut the type scale from 13 sizes to about 6. Keep the footer wordmark clear of the phone bar at 390.

**Keep:** both hero photographs and their crops, the Grand Hotel / Karla pair, the slate booking colour, the full-bleed courtyard band, the full-bleed closing with its three buttons, the expandable phone bar, the footer buttons.

---

## 2 · interactive "In the palms"

**Three-second test**
- **1440 (desktop-00; int2-palms-1440-a):** the upstairs balcony table, img-003: a mint table with a pothos, two pale-green perforated plastic chairs and a parapet, and the palm fronds behind blown out almost to white. The title, "Sea You Surfers Nest" in Kalam 700 at about 52 px, sits **in the top quarter**, not centred vertically, with the place and a bottle-green "See live dates ↗" pill. The nav floats top right with no wordmark at the left. It is bright, fresh and pleasant. It reads as a garden-furniture shot, not a surfers' house: the cheap plastic chairs are the second-biggest thing on the screen, and nothing says surf. I would scroll, mildly.
- **390 (mobile-00):** the hero runs 80 svh. The title sits at the very top over the palms, the button under it, and the table fills the lower half, so the first screen is mostly table. "A bed and breakfast in Midigama…" starts at the bottom edge.

**Checklist**
- **Media, and the main item:** the palm cinemagraph does not run on the default URL in headless capture (canvas 300×150, opacity 0, on `file://`). Served over http with `?palms`, it runs. At 1440 two frames 3 s apart differ at PSNR 25 dB, only inside the fronds (int2-palms-1440-a vs -b; `palms-crop-ab.png` shows a dark frond node shifted a few px). The table, chairs and parapet never move, so the mask is clean. That is a real, gentle sway, but it is on the **weakest part of the photograph**: the fronds are overexposed, hazy and out of focus, so the motion reads as a shimmer in a white blur rather than palms moving. At 390 the difference is PSNR 34–35 dB, barely perceptible. A pointer sweep adds almost nothing (a-gust 26.6 dB vs a-b 25.1 dB). So the main item exists and is subtle. It does not change the first impression.
- **Composition and grid:** desktop-01 is a 4-up icon row of facts, rating pills, then a large mint rounded panel "Who's coming?" with three tile cards and two buttons. The rooms are a pill switch with a 4:5 stage at about 520×650 CSS px (desktop-02: the Deluxe four-poster in white linen, the grey door open behind), which is a good size. The left column holds the title, the pill and two paragraphs, then about 300 px of empty mint ground. The "In every room" list is five white boxed chips (desktop-03). The shelf (desktop-04) is a good row of 4:5 object cards. Then a 7/5 board-shower print, a centred breakfast, Ashly with rating boxes and a quote swipe, the sign print, and the closing band, which repeats the whole "Who's coming?" panel a second time over a white text box on the palms (desktop-08). The inspector flags two rows of identical boxed cards, 1792 px empty middles in "Around the courtyard" and "Ashly", and two side-scrolling rows cut at the edge.
- **Typography:** Kalam is a marker handwriting. On "Seven rooms", "Around the courtyard", "Who's coming?" and "Finding the house" (desktop-02, 03, 07) it reads as a note on a fridge, close to the Patrick Hand verdict on Lotus at 4f ("childish rather than … tasteful"). Plus Jakarta Sans is clean but small: the room text and the "In every room" chips are 13–15 px (inspector: 15 sizes, from 13 to 56).
- **Colour:** white, a mint tint `#E9F2E7`, mint selection outlines and a bottle-green accent `#334825`. It is tonal and fresh, and white on bottle green passes. With mint panels, mint chips, mint tiles and mint pills everywhere, it reads as a wellness-app UI kit more than a house. The buttons carry glow shadows (inspector `button-fx`).
- **Hierarchy and rhythm:** clear actions everywhere. The phone bar carries the wordmark and "See live dates ↗" (mobile-01 to -12). The booking panel appearing twice in full makes the page feel like it repeats itself.
- **Polish:** the hero title is not centred vertically (calibration: centred both ways). "Jan 2026" in the quote row sits 1 px off the right edge (inspector `edge-text`). As on calm, the hero title and button stay invisible under reduced motion. The white text box over the palms in the closing (desktop-08) looks like a placeholder.
- **Distinctiveness:** the tile question ("Two of you / A group / A question first") is a real idea for this house's three listings. Visually, the page is the most generic of the three: rounded mint cards on white.
- **Hero and motion:** one CTA and no rating, which is right. It is not interesting or slick: the title is off-centre over a blown-out background, and the main item is a faint shimmer in that background. Micro-animations exist (pill, tiles, drag shelf), but the inspector reports a still page (6 moving elements).

**Score: 6 / 10.** Competent and fresh, but template level, with the weakest type choice in the set, a page built of rounded mint cards, and a main item that does not register. It is not close to any gold page. Global Surf's heroes are sharp moving footage of the place's best subject, and this moves the blurriest part of the frame.
**Better than the current presence?** **Yes, but only just.** First screen: desktop-00 / mobile-00 against 03-booking-com-fold. A bright balcony with one button beats a road sign under OTA chrome. Against 05-airbnb-1-fold, Airbnb's courtyard (carved doors, teal bench, plants) is the stronger and more characterful picture. Whole page: yes on clarity (the three-ways question, the A/C line), not on beauty.
**Hard fail:** dimension 8 below 8.

**Fix list (biggest effect first)**
1. Replace Kalam. Use a refined connected or brush script for titles only (tested on "Who's coming?" and "Finding the house"), or a characterful display serif. Keep the quote and tile labels in the text face.
2. Re-make the hero. Centre the title block both ways. Recrop img-003 so the table, the pothos and a deeper band of fronds fill the frame and the plastic chairs fall mostly out (on desktop, crop from about x 300 and scale the table up). Lift the palm band's contrast and exposure (−0.5 EV in the fronds, add local contrast) so that what moves can be seen. Then roughly double the displacement amplitude in the fronds, with a visible 6–9 s gust cycle, and check it the way the concept says: if a viewer sees a still at 390, it is not the main item yet.
3. Add one deep, full-bleed change of pace. The page is white and pale mint from top to bottom (desktop sheet). Put the courtyard shelf on the bottle-green `#334825` ground with white text, or run img-071 (the teal-cushioned bench) full-bleed at 2000 px as the "Around the courtyard" opener, so the page has a second gear after the hero.
4. Show the "Who's coming?" panel once. Keep it in section 2 and make the closing a full-bleed img-003 band with the `closing` line set directly on a dark gradient and three plain buttons, with no white text box and no second panel (desktop-08).
5. De-card the page. Remove the boxes around ratings (one large-figure row), close the empty-middle runs in "Around the courtyard" and "Ashly", end the scroll rows inside the grid, and drop the button glow shadows (inspector `button-fx`, `card-rows`, `empty-middle`). Fix the reduced-motion hero.

**Keep:** the tile question as the booking structure, the shelf of 4:5 object close-ups, the board-shower print, the clean cinemagraph mask (the table never moves), the bottle-green accent, the phone bar with the wordmark.

---

## 3 · unique "Every side of the four-poster"

**Three-second test**
- **1440 (desktop-00):** the gabled mint four-poster, img-015, full-bleed: lime sheets, striped pillows, the teal velvet throw, grey doors either side. "Sea You Surfers Nest" in Leckerli One at about 58 px, ink, centred both ways on the white wall between the posts, then the place, a deep-teal "See live dates" button, and a small pill at the bottom, "Scroll, and the bed turns". It is the most colourful first screen of the three and says "the room you'll sleep in" at once. The header's wordmark sits in a white pill and the nav in a white glass pill, which looks pasted on. It reads more like a hotel-room listing photo than a surfers' house. I would scroll, because the line promises something.
- **390 (mobile-00):** img-005 portrait: the mint posts, a timber towel ladder, the teal throw. The title is on two lines, with the button and the scroll pill. It is clean and bright, slightly beige and flat.

**Checklist**
- **Media, and the main item:** the set-piece runs in the shots. desktop-01 to -06 show the drawn mint four-poster (WebGL boxes with a gabled canopy) on white, turning through quarter angles, with a room photograph inside it. The problem is the execution. The photograph is a **flat card about 310×390 CSS px**, floating upright in the middle of the frame. It does not turn with the bed, and the rails pass across it (desktop-04: the front rail cuts through the photo's top third). So it reads as a 3D furniture configurator with a picture pasted in, not as "the bed shown from every side". The model itself is flat-shaded, with visible white seam lines on the posts (desktop-04, left post), and it is a bigger, cruder version of the bed the photographs already show beautifully. The house's best pictures are therefore shown at their smallest across the page's longest run. On the phone (mobile-02), after "At a glance", the hero photograph returns full-bleed under the "More ways to book" button before the pull-back, so a visitor sees the hero twice.
- **Composition and grid:** the inspector counts **6 of 12 desktop screens as almost empty ground** (screens 1–6: the turning bed on white with one sentence at left). It also flags "Seven rooms" pinned for three screens, an 1838-px empty middle in "Deluxe or Standard", a 404-px blank gap, and headings covered at 768 and 390 ("Deluxe or Standard", "Deluxe Double Room" 100 % hidden at one scroll position). After the set-piece the page improves: the 2-up room slideshows are big and sharp at about 505×630 CSS px (desktop-07), the best room presentation in the set. The masonry is honest but ends raggedly, with about 300 px of white under the shorter columns (desktop-10). The offset carved-door / board-shower pair (desktop-11) is good.
- **Typography:** Leckerli One + Instrument Sans. Leckerli is a heavy brush script, legible and characterful on "Seven rooms", "Deluxe or Standard", "Carved doors and a surfboard shower" and "Finding the house" (desktop-02, 07, 11, 14), and closer to the sign than Kalam. It is heavy at 58 px over a photo. The quote "Hello to waves in a minute walk," set in it at about 44 px (desktop-01) works. Instrument Sans body is clean. The inspector counts 18 font sizes.
- **Colour:** white, a warm grey tint `#ECEBE5` (inspector: "yellow-cream"), deep teal `#132B29`-family buttons, mint for the drawn bed only. The booking colour is unmistakable and consistent. The page is mostly white and grey; the mint and teal come only from the photographs and the model.
- **Hierarchy and rhythm:** the action is always reachable (header "Book", phone bar "See live dates" + "More"). The rhythm is lopsided: five near-empty screens at the start, then a dense, good middle, then a closing gable panel on grey (desktop-15: a white pentagon with the `closing` line and three buttons) that is clean but plain.
- **Polish:** the header pills on the hero (desktop-00, mobile-00) look like stickers. The inspector flags the page off-centre at 1440 (65 px left, 148 px right), two backdrop-blur surfaces and grey body text at 390. The WebGL seams on the posts are visible at 1440.
- **Distinctiveness:** the highest of the three. The four-poster as the one object, the gable as the one shape (bed canopy, icons, closing panel) and the brush script make it this house and no other.
- **Hero and motion:** the first screen is clean, with one CTA and the method named in a small line (the Lavish method). The main item is real WebGL, driven by scroll, and the page moves. But the main item looks like a product configurator and empties the page, so it costs more than it gives.

**Score: 6 / 10.** It has the best idea and the best room section, but its signature move is crude in execution and leaves half the desktop page empty. It is closest to `the-lavish-haven.html` in method: a drawn object holding the business's material on white, named by a small scroll line (gold-lavish desktop-00/01). It is well below it, because Lavish's pool window is huge, saturated and fills the screen with live water, while here a small flat photo sits inside a flat-shaded model on a white void.
**Better than the current presence?** **Yes.** First screen: desktop-00 / mobile-00 against 03-booking-com-fold and 05-airbnb-1-fold. The room the guest will sleep in, in full colour, with one button, beats a road sign and matches Airbnb's courtyard. Whole page: yes, more designed and more specific than any listing.
**Hard fail:** dimension 8 below 8.

**Fix list (biggest effect first)**
1. Put the photograph on the bed, not in front of it. Either map each bedroom photo onto a large plane that turns *with* the frame (the photo fills the space between the posts, at least 560×700 CSS px), or reverse the idea: keep the photographs big and full-bleed, cross-fading at each quarter, and draw only a thin mint gable outline that rotates over them. Today the photo is a 310×390 card that the rails cut across (desktop-02 to -06).
2. Shorten and fill the set-piece. Cut the pin from 300 vh to about 150 vh. Scale the bed up to fill 70–80 % of the viewport height. Set the four captions larger (28–32 px) and closer to the object. Fix the screens the inspector counts as empty (desktop screens 1–6) and the covered "Deluxe or Standard" / "Deluxe Double Room" headings at 768 / 390.
3. Give the model material. Use softer shading (painted-wood roughness, a warm key light and an ambient occlusion contact shadow), remove the white seam lines on the posts, and match the mint to the photographs (`#74C29A`), so it reads as the house's bed, not a CAD block (desktop-04).
4. Fix the phone pull-back. Do not show the hero photograph a second time full-bleed after "At a glance" (mobile-02). Start the pull-back from the hero itself, or start section 3 directly on the turning bed.
5. Finish the edges: drop the white sticker pills behind the hero wordmark and nav (use a plain header that turns solid on scroll), re-centre the content at 1440 (65 / 148 px margins), balance the masonry's column ends (desktop-10), and give the closing gable panel a photograph behind it (img-002 or img-015 full-bleed) so the page ends on the house, not on a grey field.

**Keep:** the idea and the gable as the one shape, the img-015 desktop hero, Leckerli One + Instrument Sans, the deep-teal booking colour, the 2-up room slideshows (desktop-07), the offset carved-door / board-shower pair, "Scroll, and the bed turns".

---

## Ranking at 4f (visual quality only)

1. **calm "The board rack" (7/10):** the best first screens in the set (the veranda with the boards on desktop, the board rack on the phone) and the most tasteful type. Its middle is a tidy template with small room photos and mini-prints.
2. **unique "Every side of the four-poster" (6/10):** the only page with a real idea and the best room section. The turning bed reads as a 3D configurator with a small photo pasted inside, and it leaves six desktop screens nearly empty.
3. **interactive "In the palms" (6/10):** a fresh but generic mint card page with a marker-font title off-centre over blown-out palms and a cinemagraph almost nobody will notice. Its room stage is good.

**All three fail dimension 8 (< 8) and go back to the designer before any human sees them.** All three are better than the current presence (OTA listings only). Interactive is better only marginally against Airbnb's courtyard photo.

**What the designer prompt got wrong (for the learn step):** for the second business running (Lotus at 4f, now Sea You), the pages put their effort into the first screen and the signature move, and the middle falls back to boxed cards on pale ground. Calm shows the rooms at 620 px beside half-empty rows, and unique shows its best photographs as a 310 px card inside the model. The signature moves were judged by whether they run, not by whether they help: a cinemagraph on the blurriest region of the frame, and a WebGL object that shrinks the best photographs and empties six screens. The prompt should say: the rooms of a lodging business are shown at least once at full container width; a main item must make the house's photographs bigger or more alive, never smaller; check every pinned or WebGL run for empty screens with the inspector before shooting; and the hero title is centred both ways and visible under reduced motion.

---

# Round 2: quick (station 4f)

Run `2026-10-midigama-01` · station 4f · **round 2** · visual-critic 0.2.0 · 2026-11-22.
Pages: the three mockups as rebuilt in commit `b0cce9b` (designer 0.7.1). What changed, from each variant's `notes.md`: calm, "Revision after 4f round 1" (rounds 7–9); interactive, "4f round 1 → round 2" (rounds R2-1 to R2-3); unique, "4f round 1 → designer round 2" (rounds 6–8), plus each file's `conflicts`.

Shot sets (shared, scratch):
- Calm (build `8ecb518b`, 10:54) and unique (build `6b143501`, 10:48) were unchanged since the designer's last shoot, so `tools/shoot.mjs` reused their sets. Calm: desktop-00…10 and mobile-00…10. Unique: desktop-00…14 and mobile-00…16.
- Interactive: the tool re-shot it this round (desktop-00…10, mobile-00…12, `file://`, so the palm shader is off and the hero is the still).
- My own Playwright walk, in `reports/2026-10-midigama-01/visual-sea-you-r2/`:
  - interactive served over http with `?palms`, at 1440 and 390: `int-palms-<w>-a/b/c.png` (8 s after load, then 1.8 s apart), a 14-frame sequence `seq/1440-NN.png` and `seq/390-NN.png` (0.5 s apart, SwiftShader), with tiles `seq/seq-1440.png` / `seq-390.png`, and `palms-crops-still-05-08.png` (the top-right fronds: the still, then frames 05 and 08);
  - `int-reduced-1440.png` (reduced motion).
- Inspector (`inspect-<variant>.txt`):
  - calm: 4 FAIL / 3 WARN: `eyebrow` (a false reading of the included line over the ratings), `shadow` (the prints, accepted below), `text-shadow` (hero legibility), `still-page`;
  - interactive: 4 FAIL / 5 WARN: `contrast` on "Deluxe Double" (a false reading: the label is white on the dark sliding thumb in desktop-02), `edge-text` "Jan 2026" in the quote scroll row, `still-page` (software GL on `file://`), `eyebrow`; WARN `empty-middle` in "Ashly" (1786 px);
  - unique: 4 FAIL / 6 WARN: `empty-screens` 4 of 12 desktop screens (was 6; the tool does not see the canvas, though desktop-02's left half really is empty), `covered-text` on "Deluxe or Standard" at 390 (the bottom bar passing over the heading), `off-centre` at 1440 (the set-piece), `shadow` (the prints and the quote stack); WARN `empty-middle` in "Deluxe or Standard" (1276 px), `pinned-over-picture`, `palette-cream`, and 17 font sizes.
- The current presence and gold are as in round 1 (the walk folds `03-booking-com-fold`, `01-google-listing-fold`, `05-airbnb-1-fold`; gold Lavish Haven and the Global Surf notes).

Independence: I did not open the critic's or the experience-critic's round-2 output. Round-1 conflicts the coordinator named are judged below on the page as it stands.

---

## 1 · calm "The board rack" (round 2)

**Three-second test**
- **1440 (desktop-00):** the veranda, img-004, sharp and full-bleed. The title is now white Grand Hotel at about 76 px over a soft ink shade with a text shadow. The tagline and one slate button sit under it, and the wordmark and a small "See live dates" pill are in the header. The grey haze patch is gone, and the photograph reads clean from the lamp to the boards. The extinguisher by the pillar is now a grey cylinder behind the plant, just right of the button. It is no longer the loudest colour on the screen, and I had to look for it. Warm, real, specific, one obvious action. I would keep scrolling.
- **390 (mobile-00):** the board rack, unchanged apart from the tagline under the name. It is still the best phone first screen in the run.

**Checklist**
- **Media:** the rooms are now the page's second big moment. The Deluxe slideshow runs at full container width, 1120×about 700 CSS px (desktop-02: img-002, the four-poster with the grey doors open to the veranda, sharp). The name, the " | " facts, the note and the button sit in one row under it (desktop-03). The Standard slideshow is also at full width (desktop-03/04). Its lead, img-009, is the weakest photo drawn large on the page: a wide-angle frame with a blown ceiling and fan, a door marked "WC", and visible softness and noise on the towel at 1120 px (desktop-04 top, desktop-03 bottom). The courtyard is a low full-bleed strip of the teal bench (desktop-04/05), then the intro beside two 4:5 balcony prints at about 300×375 (desktop-05). The closing is img-002 full-bleed under the booking card (desktop-09/10).
- **The matted print row (contested, kept):** on the page it now works. The three prints are about 330×480 CSS px each, slightly turned, white-matted with a soft shadow (desktop-06: the carved door with the cane chair, the masks, the board shower). At that size they read as a deliberate pinned-photo moment and a change of texture, not the 150 px thumbnails of round 1. I withdraw the request. The inspector's `shadow` flag stands as a note only.
- **The extinguisher (contested, graded):** I accept the grade. Only its red is taken to grey in a small box. The object stays, the boards stay, and at normal viewing it reads as part of the porch (desktop-00). This is a colour correction, not invented pixels.
- **Composition and grid:** hero → a centred "At a glance" band (desktop-01: the quote at about 46 px, the included line, three large rating figures with no boxes, one button) → a two-column "Seven rooms" intro → two full-width rooms → the bench strip → courtyard 5/7 → prints → Ashly with breakfast and a quote card (desktop-07) → the sign beside the address (desktop-08) → the full-bleed closing → footer. Scale now changes at least four times. The weak spot is a pale run: from desktop-05 to desktop-08 every section is the same light ground at the same pace.
- **Typography:** the Grand Hotel / Karla pair as before. The quote is now in Karla, large and clean (desktop-01). The "Seven rooms" intro sets two body columns beside the script title, which reads well (desktop-01 bottom).
- **Colour:** unchanged. The slate is consistent from the header to the footer. There is still no deep moment apart from the photographs.
- **Hierarchy and rhythm:** one clear action on every screen. The phone bar steps aside for the closing's three buttons. **One regression:** on the desktop first screen there are now two identical "See live dates" pills, the header's and the hero's (desktop-00). My round-1 fix asked for "a small Book pill" in the header, so this is partly my own note. The gold Lavish notes record two booking buttons on one screen as a round-1 failure.
- **Polish:** clean. The prints, pills and footer buttons are consistent.
- **Distinctiveness:** the boards, the sign-script and the slate make it this house. The middle is still a calm, well-made guesthouse page rather than a signature piece, which is the brief for calm.
- **Hero and motion:** clean, slick, centred, with one CTA in the hero. Micro motion only, which is correct for calm.

**Score: 8 / 10.** Clearly professional and beautiful, and clearly better than any listing a visitor reaches today. The rooms are now sold at size. It is close to Global Surf `postcard` in method and level: script titles, one short CTA, full-width room slideshows, a designed footer. It is below it only in media (no footage, a pale middle).
**Better than the current presence?** **Yes:** first screen (desktop-00 / mobile-00 against 03-booking-com-fold and 05-airbnb-1-fold) and whole page.
**Result: PASS.**

**Fixes before the pick (none blocking)**
1. Keep one booking button on the desktop first screen: hold the header's "See live dates" pill back until the hero button leaves the viewport, and keep the wordmark (desktop-00).
2. Lead the Standard gallery with a sharper bedroom frame (img-026 or img-005, cropped 3:2), and move img-009 (blown ceiling, "WC" door, soft at 1120 px) to the end or out (desktop-03/04).
3. Break the pale run from the courtyard to "Finding the house" once: for example, the Ashly / Kenza quote block on the ink `#141008` with white text, or img-071 at a taller ratio (desktop-05 to -08).

---

## 2 · interactive "In the palms" (round 2)

**Three-second test**
- **1440 (desktop-00 still; int-palms-1440-b and seq/1440-05 live):** img-003 recropped. The title, now in Courgette at about 56 px, is centred both ways. "Bed and breakfast | Midigama, Sri Lanka" is under it, then the bottle-green button, with the pothos on the mint table below. The plastic chairs are nearly gone (one edge at the lower left). It is a calmer, better composition than round 1. But the top two thirds of the screen are still pale, blown-out fronds, close to white, so the picture reads as a bright haze with a plant in front. The live frames show the fronds at about the same brightness as the still (palms-crops-still-05-08), so the "−0.5 EV" palm grade is not visible to me at 1440.
- **390 (mobile-00):** the name over the fronds and the button, then the table. It is pleasant, light and generic.

**Checklist**
- **Media, and the main item:** the palms now visibly sway. Live frames 0.5 s apart differ at PSNR 18–19 dB at 1440 and 22–24 dB at 390 (round 1: 25 and 35). In `palms-crops-still-05-08` the frond strokes clearly change shape between frames. The table, pot and parapet stay still, so the mask holds. **One defect seen once:** in `int-palms-1440-a` (8 s after load, during an automatic gust) the fronds smear into a liquid ripple across the whole upper half, and the right edge, from about x 1290, streaks into horizontal bars of colour (texture clamped at the edge). SwiftShader runs slowly, so the gust may have been integrated over a long frame. The edge streak is a real boundary bug in the displacement, though, and should be checked on a real GPU.
- **Composition and grid:** much improved. "At a glance" is one designed band (desktop-01): the quote large at about 44 px, one " | " line, the address with "Open in Google Maps", and the three ratings as large figures on the right. Then "Who's coming?" once, in a mint panel with three tile cards. The rooms keep the 520×650 stage (desktop-02). img-051 now opens the courtyard full-bleed (desktop-04: the carved-door room, the four-poster and teal throw inside, plants), which is the page's second gear. Then the shelf, the board-shower print, breakfast, Ashly with the quote row, the sign, and a closing on the palms band with a dark shade and three buttons (desktop-09/10).
- **Typography:** Courgette is a clear step up from Kalam. It is a refined connected script, readable on "Seven rooms", "Around the courtyard", "Carved doors and a surfboard shower" and "Finding the house". Plus Jakarta Sans stays clean.
- **Colour:** white and mint with a bottle-green accent. The page still leans on mint panels and mint tiles (desktop-01's "Who's coming?" panel, desktop-02/03's tinted rooms ground), so it reads as a fresh, generic hospitality UI rather than this house.
- **Hierarchy and rhythm:** clear actions. The phone bar carries the wordmark and one button. The rhythm is better, with the full-bleed img-051 band and the dark closing.
- **Polish:** button shadows are gone and the second panel is gone. The closing band (desktop-09) is the palms blurred under a dark gradient, legible but muddy.
- **Distinctiveness:** the tile question is still the page's idea. Visually it is the least specific of the three. The hero could open any garden café.
- **Hero and motion:** one CTA, centred. The main item now moves visibly, but it moves the palest, softest part of the frame, and in one walk frame it glitched.

**Score: 7 / 10.** A clean, competent page with a visible cinemagraph. It is not yet beautiful at the first-screen level: the hero is a white haze over a potted plant. It is below Global Surf's footage heroes (sharp, saturated, the place's best subject) and below calm in this set.
**Better than the current presence?** **Yes:** first screen (desktop-00 / mobile-00 against 03-booking-com-fold) and whole page. Against 05-airbnb-1-fold the first screen is about level.
**Result: FAIL** (dimension 8 below 8).

**Fix list (ordered)**
1. Fix the hero picture, not only the shader. Grade the still and the poster as well as the shader texture, so the no-WebGL, reduced-motion and LCP frames are not white haze: about −0.5 to −0.7 EV in the fronds, more local contrast, and greener mid-tones. Then check that the fronds read as palms in `desktop-00` itself.
2. Cap the gust displacement and clamp it away from the edges (fade the mask to zero over the outer 60 px), so no frame shows the liquid smear or the right-edge streaks seen in `int-palms-1440-a`. Check it on a real GPU and on SwiftShader with a long frame time.
3. Make it this house: open the page's second screen on something only Sea You has. For example, set the img-051 carved-door band, now in the courtyard, directly under the glance, or use img-036 (the board shower) as a full-height 7/5 moment. Drop the mint panel behind "Who's coming?" to a plain white ground with the tiles, so the page sheds the UI-kit feel.

---

## 3 · unique "Every side of the four-poster" (round 2)

**Three-second test**
- **1440 (desktop-00):** img-015 full-bleed, the name in Leckerli One centred on the wall between the posts, the tagline, one teal button and the "Scroll, and the bed turns" pill. The white sticker pills behind the header are gone, and the header is now clean type over a soft scrim. A clean, colourful first screen. The header's "Book" button and the hero's "See live dates" are two booking buttons on one screen.
- **390 (mobile-00):** img-005 portrait, the name on two lines, the tagline, the button and the hint, with no phone header. Clean.

**Checklist**
- **Media, and the main item (contested size, judged as it stands):** the rebuild works. At each rest the photograph now sits inside the bed's own opening, post to post and rail to rail (desktop-01: img-015 inside the front at about 465×440; desktop-03: img-017 over the foot at about 460×340; desktop-04: img-053 on the long side at about 590×470). The front posts frame it, so it reads as **looking into the room through the bed**, which is the concept. I accept the designer's reason for not reaching 560×700: a taller photo would need a bed taller than the screen, and the whole bed in view is the point. The pin is shorter, and four captions at 30 px now carry the text (desktop-03/04). **What still holds it back:**
  - The model still reads as a flat-shaded CAD object. The footboard and headboard are large flat mint slabs that take the lower third of the bed (desktop-01/03), and the edges are hard. It is drawn, not furniture.
  - Between rests the photo floats as a small upright card while the posts sweep past. On the phone this is what a visitor sees mid-scroll: mobile-03 shows the bed cropped off the left edge, a 140×170 px photo floating behind the canopy rail, and the next caption ghosting under the current one.
  - desktop-02 is a near-empty screen: the address and "Open in Google Maps" stranded at the top left, the bed at the right, and the left half empty.
- **Composition and grid:** after the set-piece, the page is the best-made in the set. Two 4:5 room slideshows side by side at about 505×630 (desktop-05), "In every room" and facilities in one block, true masonry (desktop-07/08), the offset carved-door / board-shower pair (desktop-09), breakfast, Ashly with ratings and the quote stack (desktop-11), the sign beside "Finding the house" (desktop-12), and the gabled panel now over img-002 full-bleed (desktop-13). The page ends on the house.
- **Typography:** Leckerli One + Instrument Sans, characterful and consistent. The captions at 30 px read well beside the bed.
- **Colour:** the warm grey ground under the bed now separates the model from the white page. The teal booking colour is consistent.
- **Hierarchy and rhythm:** clearer and shorter (desktop page 11,563 px, down from 13,137). The phone bar is "See live dates" + "More" throughout.
- **Polish:** the stickers are gone and the closing is resolved. The masonry still ends ragged, with the right column short (desktop-08).
- **Distinctiveness:** the highest of the three: the four-poster as the one object, the gable as the one shape.
- **Hero and motion:** a clean first screen and a real scroll-driven WebGL main item that now shows the house's photos inside the object.

**Score: 7 / 10.** The idea now lands at the rests, and the rest of the page is strong. The model's finish and the between-rests and phone states still look like a prototype. Closest to `the-lavish-haven.html` in method (a drawn object holding the material on a plain ground, named by a small scroll line). It is below it because Lavish's water is rendered at a finished level (gold-lavish desktop-00/01), while this bed is flat-shaded boxes.
**Better than the current presence?** **Yes:** first screen (desktop-00 / mobile-00 against 03-booking-com-fold and 05-airbnb-1-fold) and whole page.
**Result: FAIL** (dimension 8 below 8).

**Fix list (ordered)**
1. Finish the model. Make the footboard and headboard panels lower and recessed (rails with a slim inset panel, not slabs), add a slight bevel on every edge, and use painted-wood shading with soft ambient occlusion where the rails meet the posts. The bed should read as the photographed furniture at a glance (desktop-01/03/04).
2. Keep the photo seated between rests. Morph it with the opening, or cross-fade it at full opening size while the bed turns, instead of shrinking it to a floating card. On the phone, keep the whole bed inside the 390 px width (scale it to about 92 % of the width) and fade the outgoing caption fully before the next one appears (mobile-03).
3. Fill desktop-02: keep the glance's address and Maps line with the block it belongs to (or let the first caption arrive as the glance leaves), so no screen holds only a stranded line and the bed. Hold the header's "Book" button back on the first screen, so the hero has one CTA.

---

## Round 2 ranking (visual quality only)

1. **calm "The board rack" (8/10, PASS):** the strongest first screens and now full-width rooms. A calm, beautiful, honest guesthouse page.
2. **unique "Every side of the four-poster" (7/10, FAIL):** the photos now sit in the bed and the idea lands. The model and the between-rests states still look unfinished.
3. **interactive "In the palms" (7/10, FAIL):** much cleaner, with a visible cinemagraph, but the hero is still a white haze, and one gust frame glitched.

**What the designer prompt got wrong (for the learn step):** a grade or effect applied only inside the shader leaves the still, the poster and the LCP frame unchanged. The prompt should say that every look fix to a hero photograph is made to the still first, and that the shader starts from it. Header CTAs added to the first screen must not duplicate the hero CTA (the Lavish round-1 note).

---

# Round 3: quick (station 4f), interactive and unique only

Run `2026-10-midigama-01` · station 4f · **round 3** · visual-critic 0.2.0 · 2026-11-22. Calm passed in round 2, is unchanged, and was not re-scored.
Pages: interactive and unique as rebuilt in commits `8d8d821` and `1b826e9`. What changed is in interactive `notes.md` "4f round 2 → round 3" (rounds R3-1, R3-2) and unique `notes.md` "4f round 2 → designer round 3" (rounds 9–12).

Shot sets (shared, scratch):
- Interactive was re-shot this round by `tools/shoot.mjs` (desktop-00…09, mobile-00…12, `file://`, so the hero is the baked still).
- Unique (build `aa687e9b`, shot by the designer 11:55) was reused unchanged (desktop-00…14, mobile-00…15).
- My own walk, in `reports/2026-10-midigama-01/visual-sea-you-r3/`:
  - interactive served over http with `?palms`: 20 frames 0.5 s apart at 1440 and at 390 (`seq/1440-NN.png`, `seq/390-NN.png`, SwiftShader), the tile `seq-1440-tile.png`, and `palms-right-02-18.png` (the top-right fronds and the right edge, frames 02 and 18).
- Inspector, in `inspect-<variant>.txt`:
  - interactive: 4 FAIL / 5 WARN. The `contrast` "Deluxe Double" is a false reading (white on the dark thumb). Also `edge-text` "Jan 2026", `still-page` (`file://`), `eyebrow`, and `empty-middle` in "Around the courtyard" and "Ashly".
  - unique: 4 FAIL / 6 WARN. `empty-screens` 4 of 12 (the tool does not see the canvas; desktop-01…04 hold the bed). `covered-text` at 390 is the bottom bar passing over headings. Also `off-centre` (the set-piece), `shadow` (the prints), and 17 font sizes.

Independence: I did not open the critic's or the experience-critic's round-3 output.

---

## 2 · interactive "In the palms" (round 3)

**Three-second test**
- **1440 (desktop-00, the still):** the fronds are now green palm leaves with visible ribs, orange stems and darker gaps, not white haze. Their tops are still light, but they read as palms. The Courgette title, "Bed and breakfast | Midigama, Sri Lanka" and the bottle-green button are centred both ways, with the pothos and the mint table below. It is fresh, green and calm. I would scroll.
- **390 (mobile-00):** greener fronds behind the name, "Midigama, Sri Lanka" and the button, then the table. The tagline starts at the foot of the first screen.

**Checklist**
- **Media, and the main item:** the grade is now in the still, so the LCP, no-WebGL and reduced-motion frames all show palms. Live, 20 frames 0.5 s apart: frame-to-frame PSNR is a steady 17.9–20.4 dB at 1440 and 21.6–23.9 dB at 390. That is a visible, even sway with no spike. Across the whole run (`seq-1440-tile`) there is no smear and no flat block. The right edge (`palms-right-02-18`) stays clean, with no streaks. The table, pot and parapet never move. The round-2 glitch is fixed.
- **Make it this house:** the carved-door band now arrives as the second full screen after the glance (desktop-02): the room door under its fanlight, the mint four-poster with the teal throw inside, the masks, the carved shutters and the plants, full-bleed and sharp. That is the most "Sea You" picture on the page, placed where it counts. "Who's coming?" now sits on white with only the tiles tinted (desktop-01). It reads as part of the page, not a widget.
- **Composition and grid:** hero → glance (quote, " | " line, address and Maps, ratings as large figures, then the tiles and the two buttons) → the carved-door band → "Seven rooms" with the 520×650 stage → "In every room" → courtyard heading and shelf → board-shower 7/5 → breakfast → Ashly with the quote row → the sign → the dark palms closing → footer (desktop sheet). Pace changes at least four times. The inspector's 1786 px `empty-middle` in "Around the courtyard" and "Ashly" is visible as wide gutters, but it is not empty-looking at viewing size.
- **Typography:** Courgette + Plus Jakarta Sans, consistent and readable.
- **Colour:** white and pale mint with bottle green. The middle is still all pale mint (desktop-03 to -08), but the carved-door band and the dark closing give it two strong photographic beats.
- **Polish:** clean. The closing buttons now read: solid white Booking.com and two white outlines (desktop-09).
- **Distinctiveness:** better. The carved door, the masks and the board shower now carry the house. The hero subject is still a potted plant on a table, which is a gentle opening for a "surfers' nest".
- **Hero and motion:** centred, one CTA, and a visible palm cinemagraph that holds up frame by frame.

**Score: 8 / 10.** Clean, green, calm, with a working main item and the house's most characterful photograph early. It is close to the Global Surf `postcard` level of finish. It is below gold on the strength of its hero subject.
**Better than the current presence?** **Yes:** first screen (desktop-00 / mobile-00 against 03-booking-com-fold and 05-airbnb-1-fold) and whole page.
**Result: PASS.**

**Fixes before the pick (none blocking)**
1. Pull the light tops of the fronds down a little more at 1440 (the top-right quarter of desktop-00 is still near-white), so the hero has one deep tone above the title.
2. Give the pale-mint middle one deeper beat: for example, Ashly's section on bottle green `#334825` with white type (desktop-07).
3. End the quote row inside the grid so "Jan 2026" is not clipped at the right edge (inspector `edge-text`).

---

## 3 · unique "Every side of the four-poster" (round 3)

**Three-second test**
- **1440 (desktop-00):** img-015 full-bleed, the name, the tagline, one teal "See live dates" and the scroll hint. The header now shows no "Book" until the hero button has scrolled away (desktop-01 shows it fading in), so the first screen has one CTA. Clean and colourful.
- **390 (mobile-00):** unchanged and clean.

**Checklist**
- **The model:** it now reads as furniture. The posts are slimmer. The footboard and headboard are rails and a stile with two recessed panels (desktop-01 to -04), the edges carry a soft bevel, and the canopy tops are lighter than the shaded sides. It is still stylised, but it is no longer a CAD slab. It now looks like a drawing of the bed in the photographs.
- **The photo through the turn:** at the rests it fills the opening (desktop-02: img-015, about 470×440; desktop-03: img-017 over the foot; desktop-04: img-053 on the long side, about 600×470). On the phone the whole bed stays inside 390 px at every capture (mobile-02 to -05), and only one caption shows at a time. **One transient flaw:** mid-turn on the phone (mobile-03) the opening shows three photographs side by side with hard vertical seams (the towel-ladder room, img-017 and a sliver of a third), so for a moment it reads as a collage, not one room.
- **desktop-02:** now carries "Seven rooms" and the first sentence at about 30 px in the left column beside the bed, with the glance's address and Maps line at the top. No stranded screen.
- **Composition:** after the set-piece, as in round 2: 2-up room slideshows at about 505×630, true masonry, the offset carved-door / board-shower pair, breakfast, Ashly with the quote stack, the sign, and the gabled panel over img-002 full-bleed (desktop-05 to -14). The bed's feet are cut by the bottom edge of the viewport at 1440×900 (desktop-02/03: the legs run off the screen), so the "whole bed" framing is just short on a laptop.
- **Typography, colour, polish:** Leckerli One + Instrument Sans, the warm grey ground and teal, consistent. The masonry still ends a little ragged (desktop-08).
- **Distinctiveness:** the highest in the set. The four-poster as the object, the gable as the shape, and the photos as the rooms seen through it.
- **Hero and motion:** one CTA, and a scroll-driven WebGL main item that now looks finished and adds meaning (one bed, seven rooms alike).

**Score: 8 / 10.** The idea now lands and looks made, not prototyped, and the page around it is the most editorial of the three. It is close to `the-lavish-haven.html` in method and now near it in finish. It is below it because Lavish's water is richer and more alive than a turning frame.
**Better than the current presence?** **Yes:** first screen (desktop-00 / mobile-00 against 03-booking-com-fold and 05-airbnb-1-fold) and whole page.
**Result: PASS.**

**Fixes before the pick (none blocking)**
1. Remove the mid-turn seams on the phone. Cross-fade one photo to the next across the whole opening, rather than clipping per face, so the opening never shows three photographs side by side (mobile-03).
2. Frame the whole bed at 1440×900. Scale or lift it by about 6 %, so the feet and the contact shadow stay on screen at every rest (desktop-02/03).
3. Even out the masonry column ends (desktop-08), and keep the bottom bar from covering "Carved doors and a surfboard shower" and the rating figures at 390 as they pass (inspector `covered-text`).

---

## Round 3 ranking (visual quality only, all three)

1. **unique "Every side of the four-poster" (8/10, PASS):** the strongest idea, now finished. The only page no other business could have.
2. **calm "The board rack" (8/10, PASS in round 2):** the best first screens and the most honest, calm page.
3. **interactive "In the palms" (8/10, PASS):** clean and green, with a visible palm cinemagraph and the carved door early. Its hero subject is the gentlest of the three.

All three mockups now pass dimension 8 from this critic and are better than the business's current presence (OTA listings only).
