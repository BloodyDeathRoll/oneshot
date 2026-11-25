# Sea You Surfers Nest: calm mockup, "The board rack" (concept 1)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-22.
Page: `dist/index.html`, one file. `src/build.py` inlines the CSS and JS from `src/page.css` and `src/page.js`. Every word about the business is read from `copy/en.json` (passed 4c, round 2) by `build.py`, and nothing is retyped. The booking URL is asserted equal to `dossier.booking.engine_url`. Media: `src/make-media.sh` (`# media: sites/sea-you-surfers-nest/mockups/calm/dist/img/**`). Fonts load from Google Fonts at 4e: Karla 400/600 and Grand Hotel. To rebuild, run `bash src/make-media.sh`, then `python3 src/build.py`.

## look-log

Each round was shot with `tools/shoot.mjs` into `shots/`, and the sheets were opened at 1440 and 390. There is no own website and no `old-site-*.png`. The bar is the Booking.com phone fold a visitor reaches today (`dossier/sea-you-surfers-nest/assets/walk/03-booking-com-fold.png`), Lotus's picked calm page in this run (`sites/lotus-surf-house/mockups/calm/`), and the gold Global Surf method (`gold/global-surf-notes.md`: only the header, one short centred title, one short CTA). A process note: the page skeleton was assembled in one pass before round 1. Rounds 1–3 looked at and changed only the first screen.

**Round 1, first screen.** On desktop, img-004 holds the screen well: the veranda runs back to the grey carved doors, and the boards stand on the right. The radial veil was too weak, though. "Sea You Surfers Nest" sits over the masks and the plants, and the red extinguisher under "Nest" pulls the eye, so the title looks pasted on a busy picture. The phone (img-034) is strong: three boards, and the title reads on their pale decks. On both, the header wordmark repeats the name a few centimetres above the title, two scripts at two sizes. That read as a mistake, not a hierarchy. Change: a stronger, wider veil behind the title block (centre 78 %), and the header wordmark hidden until the header turns solid after the hero, so the first screen is the photograph, one title, one place line and one button. The header's own "See live dates" was already held back until then, so the first screen keeps one CTA (custom.md). Against the Booking.com fold (a blue bar, a slogan, "8.0 Very good", then the road sign), this already wins at a glance: the house's own veranda with its boards, the name and one button.

**Round 2, first screen.** The first screen is now the photograph, the title, "Midigama, Sri Lanka" and one slate button, with nothing else on it. That is the gold discipline applied to a still. On the phone this is the strongest frame of the three: three boards edge to edge, the name across their decks, and the button below. On desktop, the veil now reads, and the extinguisher under "Nest" is softened. But the title at 64 px looked timid in a 1440 frame this busy, and the veil was taller than the text block, so the haze ran down over the coloured blocks on the table. Change: the title goes to 76 px desktop (44 px phone stays). The veil is tightened to the text block (inset −14 % / −22 %) with a firmer centre (80 %), so less of the photograph is fogged. Still clearly better than the Booking.com fold. Booking.com leads with a road sign in a 1/45 carousel under a blue search bar. This page opens on the house's own veranda.

**Round 3, first screen.** The title now has the presence of the house's sign lettering (Grand Hotel is the closest free relative of "Sea You" on img-001). It sits centred horizontally and vertically, with the place line and the button tight under it. The veil hugs the block. The left plant and the right extinguisher sit at its soft edge, so the photograph stays clear everywhere else: the pendant lamp, the carved doors, the cane chair and all three boards. The phone is unchanged, and it holds. One trade-off is kept on purpose: the centre of img-004 is the busiest part of the frame, so a faint milky haze behind the title is the price of ink-on-photo legibility (concept: a soft white radial veil). A dark scrim would grey the whole bright veranda. Against the Booking.com fold and Lotus's picked gate, this first screen is clearly the better first impression of the three. It shows the house itself, and it is the only one with surfboards in it, which is what "Surfers Nest" promises.

**Round 4, whole page.** The first whole-page sheets showed three problems:
- **The closing line sat in the wrong place.** On desktop it was pinned to the top of the 21:9 band, half under the solid header, over the bed's foot and the green post. The veil did not separate it from the frame.
- **The courtyard band showed only the grey wall.** I had narrowed img-071 to 1600 px to drop the red extinguishers at its right edge, and at 21:9 that cut off the teal cushion. A bench band without its bench reads as a wall.
- **The spot line left an orphan.** "listing." fell alone onto the second line at 1440.

The rest held. The two room rows arrive within one scroll of the glance section, as the concept asks. The 3:2 slideshows are sharp, the "In every room" card reads, and the matted prints are the page's one playful note.

Changes:
- The closing became a white card over the band's lower edge, with the sentence and the three buttons together. The concept had the sentence over the band's white wall under a veil (see conflicts).
- The band is re-cut from y 120, so the white wall and the pillows show.
- img-071 is now 2:1 (1600×800 from x 40, y 175), which keeps the cushion in and the extinguishers out.
- `text-wrap: balance` on titles and statement lines.
- The footer links sit on one row.
- The phone print row snaps from the left edge.

**Round 5, skills, states and checks.**
- `/find-animation-opportunities` kept two of its five candidates:
  - a press on the rating cards (`scale(.98)`, 120 ms);
  - the phone bar's summary panel now leaves the way it came (180 ms, the drawer curve). Before, it vanished instantly after a 240 ms rise.
  It rejected scroll reveals (custom.md: no reveal animations on headings), a scale-in on the incoming room photo (it moves the thing being judged) and hover on the prints (they are not interactive).
- **No-JS state.** The look showed a real flaw: the slideshow arrows and dots were visible and dead (author `display:flex` beat the UA `[hidden]`). They are now hidden without JS, and the rows swipe with the next photo peeking.
- **Reduced motion.** No parallax, instant cross-fades. The photograph and every text block are visible.
- **Phone bar.** Opened at 390, it shows the spot line, the included line, "Live dates on Booking.com", the three dated ratings and the full-label button, with the chevron turned down.
- **`audit-mockup`, first run.** Early-scroll CLS was 0.0316, from the room text recentring when Karla replaced its fallback. The fallbacks are now matched to the measured web-font widths and line boxes:
  - Karla/Arial 1.014, ascent 90.7 %, descent 24.7 %;
  - Grand Hotel/Georgia 0.684, ascent 138.9 %, descent 59.9 %.
  Result: early 0, settled 0.
- **Inspector** (`design-taste-frontend/scripts/inspect.mjs`):
  - Fixed: the closing sentence was an `h2` wrapping 3–4 lines, so it became a `<p>` with a visually hidden `h2`. The resting shadow on the slate buttons is removed. Font sizes went from 15 to 13.
  - Kept, each a note and not a gate (tools.md):
    - `shadow` on the three matted prints: the concept's soft-shadowed prints (references #9).
    - `still-page`: calm has no canvas, and its motion is the micro layer.
    - `reduced-hidden` on the header wordmark and header button: both are held back by design until the header turns solid (round 1). The hero's own title and button are always visible.
    - `card-rows` (the rating blocks are the concept's).
    - `no-footage` (no video exists, concepts §2).
    - `side-scroll` on the phone print row (swipe with peek, references #14).
    - `off-centre` (160/179 px at 1440): this is the headless scrollbar gutter. The `.wrap` is symmetric, and scrollWidth equals the viewport.

**Round 6, whole page (final sheets in `shots/`).** There is no overflow, overlap or unreadable text at 1440 or 390 (scrollWidth = viewport at 1440, 768 and 390).

The page runs in this order:
- the veranda with its boards;
- the at-a-glance block: what and where, the listing's "Hello to waves in a minute walk", what's included, live dates, three dated ratings and the full-label button;
- the seven rooms, with the A/C sentence at body size and five mint icons for what is in every room;
- the Deluxe (6 photographs) and Standard (4) rows, each with its own button;
- the courtyard bench band and the two balconies;
- the carved door, the masks and the board shower as matted prints;
- breakfast in type;
- Ashly, the three ratings, and the five guests in a cross-fading slideshow (Kenza's line break kept);
- the sign beside "Finding the house";
- the closing card over the Deluxe room;
- the footer.

**Clearly better than the Booking.com listing, side by side, on the first screen and on the whole page.** The listing opens on a road sign in a 1/45 carousel under a blue search bar and never tells you which room has the A/C. This page opens on the house's own veranda and reaches live dates in one tap. It sells both rooms with galleries and says plainly that only one room is air-conditioned. Next to Lotus's picked calm (a carved gate in a split, red-oxide button), it is a different object: full-bleed, slate on white, boards instead of a gate.

`/animate` set the motion system: ease-out `cubic-bezier(.23,1,.32,1)` for presses and cross-fades, the drawer curve `cubic-bezier(.32,.72,0,1)` for the phone bar.

| | duration | detail |
|---|---|---|
| button press | 160 ms | 0.97 |
| room and quote cross-fade | 280 ms | the wood pill slides under the active dot |
| header turns solid | 240 ms | |
| phone bar | 240 ms in, 180 ms out | |
| desktop hero parallax | | 0 → −4 rem, off at ≤ 699 px and under reduced motion |

### Revision after 4f round 1 (commit 0ead646: visual 7 FAIL, experience 8 PASS, critic 71.9/80, no hard fail)

All three reports were read in full: `reports/2026-10-midigama-01/sea-you-surfers-nest.visual.md`, `.experience.md` and `sea-you-surfers-nest.md`, each one's calm section. The phone board-rack hero, which all three praised, is kept as it was.

**Round 7, whole page.** I made the fixes the reports asked for in one pass, then shot the page.

First screen:
- **Header.** It is now on the first screen: the wordmark at left and, on desktop, a small "See live dates" pill at right. It is no longer held back until the header turns solid, so nothing in it is hidden under reduced motion or with JS off.
- **Hero line.** It is now the copy's `tagline`, "A bed and breakfast in Midigama, on Sri Lanka's south coast.", so the type is on the first screen at both widths (critic dim 4).
- **Desktop legibility.** The white radial veil (the "grey haze") is gone. The title and line are white over a tight, soft ink shade with a text shadow. The phone keeps its round-1 ink-on-light treatment.
- **The two red extinguishers by the pillar in img-004.** They stand behind the plant, between the room and the boards. No crop of the 2000 px frame drops them and keeps the boards. They are **not painted out**: `make-media.sh` takes only their red down to grey inside one 90×420 px box (`huesaturation`, reds and magentas). They are still in the photograph, but no longer the loudest thing on screen (see conflicts).

The middle of the page:
- **At a glance** is redesigned. The listing's line is one large quote: “Hello to waves in a minute walk,” in Karla at 46 px, with "says the house's own listing." small under it. The copy's words are split at the closing quote mark and asserted to rejoin exactly. Then the included line, one row of three large rating figures with no boxes, "Live dates on Booking.com" and the full-label button. The ratings now appear only here, on the page (plus a compact copy in the phone bar's summary).
- **Rooms** at full container width. Each 3:2 slideshow runs 1120 px wide (1600 / 1080 / 720 renditions, never above source). The name and " | " facts, the note and the button sit in one row under it. The intro is a two-column block beside "Seven rooms". "In every room" is one row of five small mint icons on desktop, and is hidden on phones, where it restated the paragraph above (experience fix 5).
- **Courtyard.** img-071 is now a low strip: a 1600×560 crop (bench, cushion, plants), drawn at 4:1 and capped at 42vh on desktop. It is no longer a screen of grey wall.
- **Breakfast** is folded into the Ashly block as a small script heading and its sentence, so the separate type-only section is gone. The guests slideshow now starts on Kenza ("just steps away from the sea"). The Ashly section is white and "Finding the house" is tinted, so the grounds still alternate.
- **Finding the house.** The address and "Open in Google Maps" now sit directly under the heading, above the two paragraphs.

Phone and accessibility:
- **Phone bar.** The expanded summary is opaque white, and it has one button, the bar's own "See live dates". The bar now also steps aside once the closing's three buttons are on screen, so it never covers the footer. That cleared the inspector's `covered-text` on the footer wordmark.
- **Accessibility (critic):**
  - the phone print row is a keyboard-scrollable region: `role="region"`, `tabindex="0"`, `aria-label`;
  - the slideshow and review dots are 44×44;
  - the full-label button fits on one line at 390 (15 px label, 14 px side padding).

**Round 8, checks and states.**
- **Phone first load.** The rooms now arrive sooner, so the phone first load rose to 716 KB: every hidden slide of the stacked slideshows sat inside the lazy-load margin. With JS, only the shown slide (and, for 280 ms, the one it replaces) is now drawn (`display:none` on the rest, fade-in by keyframe). `page.js` already fetched the next photo ahead. First load is back to 483 KB in 12 requests.
- **Early-scroll CLS 0.0968.** This came from the hero's veil being sized from the text, which the font swap moved. The shade is now `.hero::after`, sized from the hero.
- **A rarer 0.049–0.17**, in 1 run of 3. It came from a streamed first paint re-centring the hero block, and from the sign print's shrink-to-fit width. Fixes: the hero text block has its full box from the first byte (`width: min(1040px, 100%)`, `min-height` 310 / 264 px), and the sign has an explicit width. Three audits in a row then gave early 0 / settled 0.
- **States, looked at:**
  - reduced motion at 1440 and 390: the title, line and button are visible, nothing moves;
  - JS off: the first Tab stops are skip, wordmark, header button and hero button, all visible; there are no dead slideshow controls;
  - the phone bar open, one button, opaque;
  - a slideshow stepped mid-fade at 1440.
- **axe-core 4.10.2** (WCAG 2.0/2.1 A + AA) at 390 and 1440: **0 violations**. 0 tap targets under 44 px. scrollWidth = viewport at both widths. 0 `tel:` links, and "715880052" appears nowhere in the HTML.
- **Inspector**, all kept with a reason:
  - `shadow` on the matted prints (kept: the experience critic named the print row a lift);
  - `text-shadow` (the hero's legibility on a bright photograph);
  - `eyebrow` (a false reading of the included line above the ratings);
  - `still-page` (calm);
  - `no-footage` (none exists);
  - `side-scroll` (the phone print row, now keyboard-reachable);
  - `size-count` 12 (down from 15).

**Round 9, whole page (final sheets in `shots/`).**
- **Desktop.** The page opens on the veranda, clean, with a header, a white title over a soft shade and no red. The second screen is a large quote, one row of ratings and the button. The Deluxe room arrives at full width on the third screen, sharp at 1120 px. The courtyard is a low teal-bench strip, then the text beside the two balcony prints. Then the matted prints, Ashly with breakfast beside Kenza's words, the sign with the address and Maps button first, the closing card over the Deluxe room, and the footer.
- **Phone.** The board-rack hero is unchanged except for the B&B line. The rest is one column, with the bar from screen 2 until the closing.
- No overflow, overlap or unreadable text at 1440 or 390.
- It is still clearly better than the Booking.com fold (a road sign under a blue search bar) and than Airbnb's courtyard fold. The first screen shows the house's own veranda with its boards, says what it is, and has one button. The rooms are now the page's second big moment.

## images

All of these are Booking.com property uploads, licence `business-owned` (dossier `images[]`: "uploaded by the property to its own Booking.com listing … Shahar approved OTA listing photos as usable"). None is upscaled: these are crops and downscales only. The widest drawn image at 1440 is the hero, 1440 css px from a 1920 px crop of a 2000 px source. The room slideshows are drawn at 1120 css px from 1600 px (landscapes) or 1333 px (portrait 3:2 crops). The courtyard strip is 1440 css px from a 1600 px crop of a 1920 px source. The only change beyond crop, scale and the 3 % shadow lift is the hero's local desaturation of the two extinguishers' red (see conflicts). Alt texts were written from each photograph opened (`ALT` in `src/build.py`).

| use | asset | crop |
|---|---|---|
| first screen, desktop | img-004 | 16:9, 2000×1125 from y 104, +3 % shadow lift, the extinguishers' red taken to grey in a 90×420 box at (1155, 500); 1920 / 1280 |
| first screen, phone | img-034 | 1:2, 1000×2000 from x 220 (extinguishers out); 900 / 600 |
| Deluxe slideshow, 3:2 | img-002, 015, 012, 022, 033, 032 | landscapes whole, portraits centre 3:2; 1600 / 1080 / 720 |
| Standard slideshow, 3:2 | img-009, 026, 005, 025 | as above |
| courtyard strip | img-071 | 1600×560 from x 40, y 440; drawn 4:1 (desktop), 2:1 (phone) |
| balconies, 4:5 | img-003, img-045 | centre 1066×1333 |
| matted prints, 2:3 | img-027, img-035, img-036 | native frame, 640 |
| finding the house, 2:3 print | img-001 | native frame, 720 |
| closing band | img-002 | 21:9 2000×857 from y 120 (desktop); 4:3 (phone) |

No stock and no atmosphere images (concepts §2), so `check-places` has nothing to check.

## gaps

- **No price.** Every booking action goes to the live dates on Booking.com. "Live dates on Booking.com" stands where a price would. No rate is copied.
- **The phone number is unconfirmed** (dossier `gaps[0]`, read from the sign in img-001). Every Call button is built but switched off (`PHONE_CONFIRMED = False` in `build.py`, concepts §2/§6). There are 0 `tel:` links, and the number appears nowhere in the HTML. With the flag on, Call buttons appear in the glance section, both room rows, "Finding the house", the closing, the footer and the phone bar.
- **No WhatsApp, email or Instagram.** There is no chat button and no Instagram section, and nothing is faked.
- **No video, and no photograph of the sea, the beach, the street, Ashly or breakfast.** The sea is carried only by the listing's "Hello to waves in a minute walk" and Kenza's words, which now open the guests slideshow. Breakfast and Ashly are type-led.
- **Unknown, never guessed:** which room has the A/C, which rooms have their own bathroom, the check-in time (only check-out is shown), and the break and the season. There is no forecast.
- **Schema** (concepts §6): there is no `rooms[].photos[]`, so the galleries are wired in `build.py`. There is no short hero line: the hero now uses the full `tagline`. There is no short CTA label: "See live dates" is the template label, with the copy's full label in `aria-label`.

## conflicts

None blocking. Three, all small:
1. **The hero's extinguishers are graded, not cropped (4f round 1).** The visual critic asked for the red fire extinguisher to come out of the desktop hero. It sits behind the plant between the room and the boards, so no crop of img-004 drops it and keeps the boards. Painting it out would invent pixels of a business photograph. What I did instead: only its red is taken down to grey in one small box, and the object stays in the picture. **For the human:** if even a local colour grade on a business photograph is unwanted, delete the `EXT` step in `make-media.sh`, and the hero goes back to the untouched frame.
2. **Standard Double Room gallery: four photographs, not six.** The concept lists img-009, 026, 005, 025, 010 and 011. img-011 is a toilet, and img-010 shows a "WC" door beside the bed. Booking.com says this room has 0 bathrooms, and a guest found hers outside the room. Concepts §2 says no concept puts a bathroom on the Standard room. Showing those two would imply an en-suite, so they are left out. The Deluxe keeps its bathroom (img-032), because it has its own.
3. **Departures from the concept's layout, each from a look round or a 4f report:**
   - The courtyard image is a low strip, not a 21:9 band. This came from 4f round 1; before that it was 2:1 (round 4).
   - Breakfast is folded into the Ashly block, and the ratings appear once (4f).
   - The rooms run at full width with one info row, not 7/5 splits (4f).
   - The closing sentence sits in a white card over the band's lower edge, with the buttons (round 4).
   - The phone hero has no separate Kube bar. Its centred button is the bottom-of-hero CTA, the persistent bar slides up once it leaves, and the bar steps aside again at the closing.

The closing copy was updated in 5b022e1 to "Live dates are on Booking.com, and groups can rent the whole house on Airbnb." The old clause pointing to a call is gone, so the earlier conflict about a missing Call button no longer applies. The page renders the new sentence from `copy/en.json`.

## other businesses in this run

- **Cheeky Monkey** (calm "The signboard"): a saturated roadside street through board noses, a white "Catch waves, not worries" in script, a red Booking button and a nav. It is loud and outward, a shop on a main road. This page is a quiet veranda inside a house, with three boards leaning on a wall and a slate button.
- **Lotus Surf House** (calm "The gate", picked): a 6/6 split, with a carved gate on the right and the name on white on the left, a brick-red button, and the house walked floor by floor. Here, one full-bleed photograph is the whole first screen, the colour is slate on white with mint, and the page goes object by object (the four-poster at full width, the bench, the carved door, the board shower, the sign), not floor by floor.
- **Coconut Surf Inn** (calm "The view from the roof"): the sea from the roof, a forecast and a green button. This page never shows the sea and carries no forecast.

A visitor would notice that this is the run's only page that opens on surfboards inside a house, in slate and mint.

## hand-off checks (4e, after 4f round 1)

1. **Look loop: pass.** Rounds 1–3 on the first screen, rounds 4–6 on the whole page and its states, and rounds 7–9 for the 4f revision, all written up above. Every `dist/img` file comes from `src/make-media.sh` (clean rebuild: `rm -f dist/img/*` first).
2. **Booking CTA: pass.** It is `https://www.booking.com/hotel/lk/sea-you-surfers-nest.en-gb.html`, asserted equal to `dossier.booking.engine_url` in `build.py`. The audit's tap-through at 390 landed there. The Airbnb links are `bookingLinks[1–2]`, copied from `copy/en.json`.
3. **`node tools/check-design.mjs sites/sea-you-surfers-nest/mockups/calm/dist/index.html`: pass.** ok, 0 problems, 0 warnings.
4. **`node tools/check-places.mjs sea-you-surfers-nest`: pass.** 0 borrowed images.
5. **Reduced motion and no JS: pass.** The hero title, line and button are visible under reduced motion, and nothing moves. No WebGL in calm. With JS off, the slideshows are swipe rows without dead controls, every action is a link, and there is no invisible tab stop. `audit-mockup`: `scroll.early.cls` 0, `scroll.settled.cls` 0, three runs in a row.
6. **Other businesses: pass.** Compared above.
7. **No video exists: pass.** The first screen is the strongest own photograph at ≥ 1920 px. The last round compares it with the Booking.com and Airbnb folds.

audit-mockup (phone, slow 4G):
- first load 483 KB in 12 requests (fonts 42 KB; Google Fonts are the only third party, allowed at 4e);
- JS 0 KB external (about 5 KB inline);
- largest image 72 KB (`hero-img-034-900.webp`);
- LCP 656–816 ms across runs;
- first-load CLS 0.001; scroll CLS 0 / 0;
- 0 images without alt; 0 tap targets under 44 px.
- axe-core 4.10.2 at 390 and 1440: 0 violations.
