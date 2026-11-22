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

## images

All of these are Booking.com property uploads, licence `business-owned` (dossier `images[]`: "uploaded by the property to its own Booking.com listing … Shahar approved OTA listing photos as usable"). None is upscaled: these are crops only, scaled down. The widest drawn image at 1440 is the courtyard band, 1440 css px from a 1600 px crop of a 1920 px source. The hero is drawn at 1440 from a 1920 px crop of a 2000 px source. Alt texts were written from each photograph opened (`ALT` in `src/build.py`).

| use | asset | crop |
|---|---|---|
| first screen, desktop | img-004 | 16:9, 2000×1125 from y 104, +3 % shadow lift; 1920 / 1280 |
| first screen, phone | img-034 | 1:2, 1000×2000 from x 220 (extinguishers out); 900 / 600 |
| Deluxe slideshow, 3:2 | img-002, 015, 012, 022, 033, 032 | landscapes whole, portraits centre 3:2; 1080 / 720 |
| Standard slideshow, 3:2 | img-009, 026, 005, 025 | as above |
| courtyard band, 2:1 | img-071 | 1600×800 from x 40, y 175 |
| balconies, 4:5 | img-003, img-045 | centre 1066×1333 |
| matted prints, 2:3 | img-027, img-035, img-036 | native frame, 640 |
| finding the house, 2:3 print | img-001 | native frame, 720 |
| closing band | img-002 | 21:9 2000×857 from y 120 (desktop); 4:3 (phone) |

No stock and no atmosphere images (concepts §2), so `check-places` has nothing to check.

## gaps

- **No price.** Every booking action goes to the live dates on Booking.com. "Live dates on Booking.com" stands where a price would. No rate is copied.
- **The phone number is unconfirmed** (dossier `gaps[0]`, read from the sign in img-001). Every Call button is built but switched off (`PHONE_CONFIRMED = False` in `build.py`, concepts §2/§6). With the flag on, they appear in the glance section, both room rows, "Finding the house", the closing, the footer and the phone bar.
- **No WhatsApp, email or Instagram.** There is no chat button and no Instagram section, and nothing is faked.
- **No video, and no photograph of the sea, the beach, the street, Ashly or breakfast.** The sea is carried only by the listing's "Hello to waves in a minute walk" and the guests' words. Breakfast and Ashly are type-led.
- **Unknown, never guessed:** which room has the A/C, which rooms have their own bathroom, the check-in time (only check-out is shown), and the break and the season. There is no forecast.
- **Schema** (concepts §6): there is no `rooms[].photos[]`, so the galleries are wired in `build.py`. There is no short hero line ("Midigama, Sri Lanka" is taken from `contact.address`) and no short CTA label ("See live dates" is the template label, with the copy's full label in `aria-label`).

## conflicts

None blocking. Three, all small:
1. **`closing` says "If you want to ask Ashly something first, call", but no Call button is shown.** The copy (passed 4c) assumes the phone. The concept removes every Call button until the number is confirmed. I followed the concept and did not edit the copy. So the sentence now points at a channel the page does not offer. **A human decision before the pick:** confirm the number (flip `PHONE_CONFIRMED`, and the buttons appear) or have the copywriter drop the clause. The alternative, showing the number unconfirmed, is what the dossier forbids.
2. **Standard Double Room gallery: four photographs, not six.** The concept lists img-009, 026, 005, 025, 010 and 011. img-011 is a toilet, and img-010 shows a "WC" door beside the bed. Booking.com says this room has 0 bathrooms, and a guest found hers outside the room. Concepts §2 says no concept puts a bathroom on the Standard room. Showing those two would imply an en-suite, so they are left out. The Deluxe keeps its bathroom (img-032), because it has its own.
3. **Small departures from the concept's layout, each from a look round:**
   - The header's wordmark and its "See live dates" button appear only once the header turns solid, so the first screen has one title and one CTA (round 1).
   - The courtyard band is 2:1 from a 1600 px crop, not 21:9 from 1920. This keeps the bench and drops the extinguishers (round 4).
   - The closing sentence sits in a white card over the band's lower edge, with the buttons, not over the photograph under a veil (round 4).
   - The phone hero has no Kube bottom bar on the hero itself. The centred hero button is the bottom-of-hero CTA, and the persistent bar slides up once it leaves (the concept's own motion line).

## other businesses in this run

- **Cheeky Monkey** (calm "The signboard"): a saturated roadside street through board noses, a white "Catch waves, not worries" in script, a red Booking button and a nav. It is loud and outward, a shop on a main road. This page is a quiet white veranda inside a house, with three boards leaning on a wall, an ink title on a soft veil and a slate button.
- **Lotus Surf House** (calm "The gate", picked): a 6/6 split, with a carved gate on the right and the name on white on the left, a brick-red button, and the house walked floor by floor. Here, one full-bleed photograph is the whole first screen, the colour is slate on white with mint, and the page goes object by object (four-poster, bench, carved door, board shower, sign), not floor by floor.
- **Coconut Surf Inn** (calm "The view from the roof"): the sea from the roof, a forecast and a green button. This page never shows the sea and carries no forecast.

A visitor would notice that this is the run's only page that opens on surfboards inside a house, in slate and mint.

## hand-off checks (4e)

1. **Look loop: pass.** Three first-screen rounds, then three whole-page and state rounds, all written up above. Every `dist/img` file comes from `src/make-media.sh` (clean rebuild run: `rm -f dist/img/*` first).
2. **Booking CTA: pass.** It is `https://www.booking.com/hotel/lk/sea-you-surfers-nest.en-gb.html`, asserted equal to `dossier.booking.engine_url` in `build.py`. The audit's tap-through at 390 landed there. The Airbnb links are `bookingLinks[1–2]`, copied from `copy/en.json`.
3. **`node tools/check-design.mjs sites/sea-you-surfers-nest/mockups/calm/dist/index.html`: pass.** ok, 0 problems, 0 warnings.
4. **`node tools/check-places.mjs sea-you-surfers-nest`: pass.** 0 borrowed images.
5. **Reduced motion and no JS: pass.** Reduced motion is still, with the photograph visible. No WebGL in calm. With JS off, the slideshows are swipe rows without dead controls, and every action is a link. `audit-mockup`: `scroll.early.cls` 0, `scroll.settled.cls` 0.
6. **Other businesses: pass.** Compared above.
7. **No video exists: pass.** The first screen is the strongest own photograph at ≥ 1920 px. The last round compares it with the Booking.com fold and Lotus's picked page.

audit-mockup (phone, slow 4G):
- first load 361 KB (fonts 42 KB; Google Fonts are the only third party, allowed at 4e);
- JS 0 KB external (about 4 KB inline);
- largest image 72 KB (`hero-img-034-900.webp`);
- LCP 620 ms;
- first-load CLS 0.0061; scroll CLS 0 / 0;
- 0 images without alt; skip link present.
- Tap targets under 44 px are only the slideshow dots, 24×44. Each slideshow also has 44 px arrows.

Measured separately (headless, no throttle):
- 1440 at 1×: first screen 512 KB, whole page 823 KB. The hero is 148 KB; the rest is the first room gallery inside the lazy-load margin.
- 390 at 2×: first screen 362 KB, whole page 663 KB.
