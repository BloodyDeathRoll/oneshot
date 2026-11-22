# Sea You Surfers Nest: interactive mockup, "In the palms" (concept 2)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-22.

- Page: `dist/index.html`. It is one file. CSS and JS are inlined from `src/page.css` and `src/page.js` by `src/build.py`.
- Words come from `copy/en.json`. The booking URL is asserted against `dossier.json`'s `booking.engine_url`, and the two Airbnb URLs against `other_engines`.
- Media: `src/make-media.sh`, with the header `# media: sites/sea-you-surfers-nest/mockups/interactive/dist/img/**`.
- Fonts: Plus Jakarta Sans 400/600/700 and Kalam 400/700, from Google Fonts at 4e.
- Rebuild: `bash src/make-media.sh && python3 src/build.py`.
- To see the shader headless, serve `dist/` over http and open `?palms`. A `file://` URL cannot upload the texture, and a software renderer is treated as a weak device, so both keep the still.

## look-log

Every round was shot with `tools/shoot.mjs` over http (`127.0.0.1:8973`).
- **The bar:** there is no own site and no earlier picked page. So the bar is the Booking.com phone listing (`dossier/sea-you-surfers-nest/assets/walk/03-booking-com-fold.png`) and gold Global Surf `postcard`. I shot `postcard` at 390 and 1440 this session; its media are not on disk, so its photo and video slots render empty, but its type, sections and bar are visible.
- **Process note:** the page skeleton was assembled before round 1, as on Lotus. Rounds 1–3 changed only the first screen.

**Round 1, first screen.** img-003 is full-bleed, with the WebGL palms running (`?palms`).

I checked the shader in headless Chromium first:
- two frames 1.8 s apart differ only in the frond band above the parapet (PSNR 25.5 dB, from a difference image);
- the parapet edge, the pot plant, the table and the chairs are pixel-identical;
- a crop at the parapet shows no tearing.

What was wrong as design:
- On desktop the title block, centred, straddled the parapet, and the "See live dates" button sat right on top of the potted pothos, the one object the photograph is composed around.
- On the phone, "Sea You Surfers Nest" broke as "Sea You Surfers / Nest".
- On the phone, a red fire-extinguisher label showed at the bottom right of the crop.

Changes:
- The title block now sits in the pale palm band on both widths, as the concept asks ("the title sits in the pale palm band"). It is still centred horizontally, and the table and plant stay unobstructed.
- The phone h1 is 36 px, on one line.
- The phone crop is now 1008×1260 from x 496, so it stops above the label (y 1280+).

Already clearly better than the Booking.com fold: a blue header, a search box, a road sign and "1/45" against the house's own balcony with the palms moving.

**Round 2, first screen.** The composition works now. The palm band carries the name, the town and one button, and the mint table with the pothos is a clean still life below it.

What was wrong: the header's Kalam mark repeated the h1 directly above it, so the first screen carried the name twice. On desktop the header's "See live dates" also repeated the hero button. That is two CTAs where the calibration allows one.

Change:
- The header mark and the header button now fade and slide in (260 ms) only once the hero has left and the header turns solid white.
- On the phone the header is gone; the persistent bar carries the name and the button.
- The title was lifted another 2.5 vh to give the plant air.

**Round 3, first screen.** Header nav only, one handwritten name, one line, one bottle-green button, and the palms moving behind. On the phone the hero is 80 svh, and the tagline starts under it.

What was wrong: on desktop the nav floated left of a blank 170 px, where the hidden button still took its space.

Change: the header button is taken out of flow. When the header turns solid, the nav slides left (320 ms) to make room for it.

Against gold `postcard`, which has footage, a centred title and one CTA: this is the same first-screen discipline, and the motion is the house's own pixels. The business has no video, so this is as close as a house without footage gets. It clearly beats the Booking.com fold.

**Round 4, whole page.** Desktop sheet:
- each section reads as its own moment: the fact row and the "Who's coming?" panel; "Seven rooms" with the pill and the 4:5 stage; the shelf of nine close-ups; the board-shower print with the tilted mask print; type-only Breakfast; Ashly and the guests; the sign; the palms band with the panel overlapping it; the footer;
- **flaw:** the courtyard intro was centred in a 680 px column, while every other section aligns to the grid's left edge;
- **flaw:** the large rating chips wrapped to two rows.

Phone:
- **flaw:** the persistent bar never appeared in the shots. Found with Playwright: the guests grid used `1fr`, so the quote row's min-content (825 px) widened the layout viewport, and the fixed bar sat at y 1718.

Fixes:
- `minmax(0,1fr)` on every phone grid, so the document is 390 wide again;
- the courtyard head is a 5/7 grid, heading left and paragraphs right (this also answers the inspector's "empty middle");
- the large chips became a 3-up grid.

Inspector (`design-taste-frontend/scripts/inspect.mjs`), skill notes and never gates (tools.md):
- `headline-lines` at 768: "Carved doors and a surfboard shower" ran to 3 lines. Fixed with a 6/6 split from 768 to 1100 px.
- `shadow` and `button-fx`: custom.md allows gentle shadows on cards and buttons. Kept.
- `reduced-hidden`: these are the header mark and button, hidden on the first screen by design. The hero h1 and its button are visible, with reduced motion too.
- `edge-text`: the peeking quote card, which the concept specifies.
- `still-page`: headless software GL runs the still, so the shader is not counted.
- `no-footage`: none exists.
- `size-count` (16 sizes): noted.

**Round 5, whole page.**
- The courtyard head now fills its row. The phone bar slides up after the hero button leaves, with the name and "See live dates".
- **Flaw:** the large rating chips were cramped on desktop (the date wrapped) and broken at 390 ("Goog / 11 review" clipped).
- **Flaw:** Kenza's quote card stretched to Marina's height and left a hole on the phone.

Fixes:
- The large chips became small stacked cards: score at 28 px, platform, count, date. Each line is its own span.
- Quote cards keep their own height.
- The dots moved above the quote row, so they no longer hang under the tallest card.

States were checked in Playwright, with no page errors:
- the tiles switch the answer with a cross-fade, and the mint ring draws in (Two of you / A group / A question first);
- the pill slides to Standard and the stage cross-fades;
- slideshow arrows, dots and swipe all work;
- with reduced motion (and `?palms`) the canvas stays off and the photograph shows;
- with JS off: no tiles, the three answers stacked as plain links (Booking.com, Airbnb room, Airbnb whole house, Ask Ashly on Airbnb), both rooms stacked, the slideshows as scroll-snap rows, and the bar static.

**Round 6, whole page (final sheets in `shots/`).**
- `audit-mockup` reported 11 tap targets under 44 px (the 28 px dots). The dots are now 44×44, and on the phone the room slideshow drops its arrows (swipe and dots), so the row fits. Re-audited: 0 under 44.
- No overflow, overlap or unreadable text at 1440 or 390 (`scrollWidth` = viewport).
- Side by side with the Booking.com listing: one name, one button, the house's own balcony moving. Then one question that sends a couple, a group or someone with a question to the right one of the three listings. Booking.com cannot do that.
- Against gold `postcard`: the same anatomy at a comparable finish. Script titles, compact " | " details, rooms sold with 6- and 5-photo slideshows with dots, guests with dated ratings, a real footer with buttons, a persistent bar.
- What holds it below gold is the material: no video, no sea, no people (see conflicts).

Skills: `/animate`, `/find-animation-opportunities`, `/impeccable` and the review skills were not invoked this session; only the inspector script was run.
- Motion follows the concept's own list: the pill at 320 ms on a mild spring (`.34,1.36,.64,1`); tiles lift 2 px with the ring drawn in 500 ms; 280 ms cross-fades on slides, rooms, answers and quotes; buttons press to 0.97; the bar on a 340 ms ease-out; the header fade at 260 ms; the shelf with inertial drag (friction 0.93), edge resistance (0.3) and snap.
- Everything animates transform and opacity only, except the ring's `stroke-dashoffset`.

## images

All are `business-owned` Booking.com and Airbnb property uploads (dossier `images[]`). There is no stock and no atmosphere. Nothing is upscaled: full-bleed images are 1920 w from 2000 px sources, drawn at most 1440 wide.

| use | asset | crop |
|---|---|---|
| first screen + WebGL texture | img-003 | desktop 16:9 2000×1124 from y 0; phone 1008×1260 from x 496 (above the extinguisher) |
| palm mask (WebGL only) | made from img-003's geometry | parapet line y = 550 + 0.014x; pot ellipse (950, 515), r 250×120; ramp 220 px; blur σ 10; the same two crops at half size |
| Deluxe stage, 4:5 | img-002, 015, 012, 022, 013, 033 | all Booking.com-tagged to Deluxe |
| Standard stage, 4:5 | img-005, 026, 009, 025, 010 | all Booking.com-tagged to Standard |
| shelf, 4:5, 640 w | img-071, 006 (fx 0, extinguishers out), 007, 039, 041, 045, 037, 038, 077 | |
| board shower, 2:3 native print | img-036 | 1000 w |
| masks, 4:5 print | img-069 | 1136×1420 from y 290 |
| the sign, 4:5 print | img-001 | 1333×1666 from y 160 |
| closing band, 21:9 | img-003 | 2000×856 from y 0 |

Alt text was written from the crops themselves, not from the dossier's notes.

## gaps

- **No price.** Every booking action goes to the Booking.com listing ("Live dates on Booking.com").
- **No WhatsApp, no email.** The phone number is unconfirmed (dossier `gaps[0]`), so no Call button is shown anywhere. `build.py` has `PHONE_CONFIRMED = False`; flipping it adds "Call Ashly" to the "A question first" tile and the find and footer buttons. Until then "A question first" links to the Airbnb room listing as "Ask Ashly on Airbnb" (dossier `contact.airbnb_messaging`).
- **No video**, and no photographs of the sea, the street, Ashly or breakfast. Breakfast is type-only, and the sea is carried only by the listing's own line and Kenza's quote.
- **No Instagram.** The calibration asks for an Instagram section; it is omitted, not faked.
- **Unknown, never guessed:** which room has the A/C; the bathrooms beyond Booking.com's room rows; the check-in time (only check-out is shown); the break and season (no forecast).
- **Schema gaps, as in concepts §6:** `rooms[].photos[]` (the galleries are hard-wired), a short CTA label (the template's "See live dates", with the full copy label in `aria-label`), and a short hero line.
- **Template rule:** the cinemagraph runs only while the hero `<img>` carries `data-asset="img-003"`. A replaced photo gets no shader.

## conflicts

1. **BLOCKING, for the human before the pick: the closing line promises a call that the page cannot offer.**
   - `closing` (copy, passed 4c) ends "If you want to ask Ashly something first, call."
   - Per the concept and dossier `gaps[0]`, the Call button stays out until a human confirms +94715880052. So the sentence sits over a panel with no call action.
   - It cannot be fixed at 4e. I may not edit audited copy, and confirming the number is a human decision.
   - Either way fixes it: (a) confirm the number, then set `PHONE_CONFIRMED = True` in `src/build.py` and rebuild, and "Call Ashly" appears under "A question first" and in the find and footer rows; or (b) send `closing` back to the copywriter.
2. **The title is set in the palm band, not at the vertical centre.**
   - The calibration says "title centred horizontally and vertically". The concept says "centred … the title sits in the pale palm band".
   - Centred vertically, the button covered the potted plant and the block straddled the parapet (round 1).
   - The block sits about 13 vh from the top on desktop and 84 px on the phone, still centred horizontally. The alternative cost the photograph its subject.
3. **The Standard gallery has 5 photographs, not 6.** The concept listed img-044, but Booking.com does not tag img-044 to either room (dossier `room_types[].note`). Showing it under Standard would be a claim about that room, so it was dropped. Every stage photo is room-tagged.
4. **The phone order in "Seven rooms" is heading, sticky pill, stage, room line and button, then the copy.** The concept says "the stage comes first and the pill sits sticky under the header". Putting the pill above the stage lets it stick while the stage is in view, and there is no header on the phone. The stage still comes before the copy.
5. **The "Who's coming?" panel is wired at load, not on first interaction (references #5).** Its code is about 1 KB inline and fetches nothing. Deferring it would only add a dead first tap.
6. **Ratings on first screen: none,** per concepts §3. **Shadows:** gentle resting shadows on buttons, cards and prints are kept against the inspector (custom.md allows them).
7. **Visual-critic bar, honestly.** I cannot score myself. What holds this page below the gold pages is the material, not the build: no footage, no sea, no people. The concept's §6 shot list is what would lift it. I do not consider it below 8 for anything fixable at 4e.

## other businesses in this run

- **Lotus Surf House interactive ("Dappled")**, the nearest sibling, shot this session. It opens on a shady garden with a white title in Patrick Hand and table-blue buttons, over a centred row of fact cards on cool grey, with a floor switch and room tiles. This page opens on a bright balcony whose palms move, with an ink Kalam title in the palm band and one bottle-green button on white and mint. Its booking device is a "Who's coming?" question, not a floor switch. Its middle is a draggable shelf of the house's objects. Both carry a 4-up fact row and a sliding pill because both concepts specify them, but nothing else is shared.
- **Cheeky Monkey** (by its concepts and its interactive sheet) is a loud surf shop of boards, reels and painted lettering in magenta, red and blue. This page shows no boards or road, and no saturated colour.
- **Coconut Surf Inn** is told by the clock from a roof over the reef, with a forecast and a depth parallax. This page never shows the sea, carries no forecast, and moves only the fronds.
- **The variant this sits beside, in the same business:** calm is the board rack, unique the turning four-poster.

## hand-off checks (4e)

1. **Look loop: pass.** Three first-screen rounds plus three whole-page and state rounds, all written up. Every `dist/img` file comes from `src/make-media.sh`. `media/sea-you-surfers-nest.tsv` lists the 31 files as `local` until the script is tracked by git; the pre-commit `media.mjs save` will mark them `recipe:`.
2. **Booking CTA: pass.** The URL equals `dossier.booking.engine_url` (asserted at build). The audit tapped through to `https://www.booking.com/hotel/lk/sea-you-surfers-nest.en-gb.html`. The hero, header, bar, room buttons and the "Two of you" answer go there in one tap.
3. **`check-design`: pass.** 0 problems, 0 warnings (`node tools/check-design.mjs sites/sea-you-surfers-nest/mockups/interactive/dist`; the fixed port was busy with another designer once, then ran).
4. **`check-places`: pass.** 0 borrowed images.
5. **Reduced motion, Save-Data and no WebGL: pass.** The canvas is never started and the photograph stays (audit `reduced_motion`: 1 canvas, hidden, photograph visible). `scroll.early.cls` 0.0085 and `scroll.settled.cls` 0, both under 0.01.
6. **Other businesses compared: pass** (above).
7. **Video: pass.** None exists. The first screen is img-003 (2000 px), with the WebGL palms as the main item.

audit-mockup (phone, slow 4G, last run):
- first load 785 KB / 767 KiB: images 663 KB, fonts 40 KB (Google Fonts, the only third party, allowed at 4e), HTML 82 KB with all CSS and JS inlined (18 KB gzipped);
- largest image 66 KB;
- LCP 1156 ms, CLS 0.0031;
- tap targets under 44 px: 0; images without alt: 0;
- no-JS: 4 booking links reachable.
