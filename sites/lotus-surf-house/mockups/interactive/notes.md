# Lotus Surf House: interactive mockup, "Dappled" (concept 2)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-03.
Page: `dist/index.html` (one file; CSS/JS inlined from `src/page.css` / `src/page.js` by `src/build.py`; words from `copy/en.json` via `../lotus_data.py`). Media: `src/make-media.sh` (`# media: …/interactive/dist/img/**`). Fonts from Google Fonts at 4e (Be Vietnam Pro 400/600, Patrick Hand). Rebuild: `bash src/make-media.sh && python3 src/build.py`.

## look-log

Shot with `tools/shoot.mjs` over http (:8964; the shader needs a same-origin texture, so a `file://` URL keeps the still photo). The bar is the Booking.com fold (`funnel/walk/04-booking-com-fold.png`) and gold Global Surf (no own site exists). Process note: the page skeleton was assembled before round 1. Rounds 1–3 changed the first screen only.

**Round 1, first screen.** img-020 full-bleed, with the title, the town and the table-blue button centred. The shader runs on the photograph itself. I checked it in headless Chromium with `?light=force`:
- two frames 3 s apart differ (PSNR 33 dB), so the light really moves;
- a crop of the shader frame beside the still `<img>` reads as the same photograph, with the sun patches on the lawn shifting and nothing added on top.

What was wrong:
- "Getting here" in the header sat on the white sky top right and could not be read;
- on the phone, the 4:5 crop from the centre lost the hammock and the tree trunk and showed mostly canopy.

Change: a top legibility scrim (42% → 0 over 180 px; playbook §1a's scrim, the inspector's "no gradient" yields), and the phone crop moved to fx 0.10. Already clearly better than the Booking.com fold: a living garden in place of a search bar and a 1/42 carousel.

**Round 2, first screen.** The nav reads now. On the phone the trunk rises through the centre under the button, with the hammock and lawn below, which makes a composed frame. The phone button was still heavy (17 px, 30 px padding). Change: the phone button set to 16 px / 24 px padding; on desktop, the title to 84 px and the town line to 19 px.

**Round 3, first screen.** Header, one centred title in Patrick Hand, one line, one button, and the photograph's own light breathing. Nothing is laid on the photograph except the legibility shade. Against gold Global Surf (footage + title + one CTA), this gives a business with no footage a living first screen, and it clearly beats the Booking.com fold.

**Round 4, whole page.** The phone sheet showed:
- the phone bar's third button (the expand toggle) was pushed off-screen, because the nowrap booking label would not shrink;
- "Garden floor" broke onto two lines in the floor switch;
- the 2×2 fact grid left a hole (the last card spanned the full row).

Changes: `minmax(0,1fr)` bar columns and a 15 px bar label; icons dropped from the phone switch, with labels on one line; equal 2×2 facts.

**Round 5, checks and states.**
- `check-design` failed `section.hero` as a dark ground (its fallback colour): moved to the media box, now ok.
- `audit-mockup` early-scroll CLS was 0.0247, from `#garden` being pushed when the JS revealed the floor switch and slideshow controls. Both now keep their space from first paint. Metric-matched fallbacks were added (Be Vietnam Pro → Arial 108%, Patrick Hand → Arial 80.1%). Now 0.0024 / 0.
- First load was 1.42 MB, because the hidden Upstairs and Roof panels' photos loaded. Inactive panels now use `content-visibility:hidden`, and off-screen slides use `content-visibility:auto`. Now 686 KB.
- With JS off, the white wordmark stayed fixed over light sections. It is now `position:absolute` without JS.

States checked in Playwright:
- the pill slides to Upstairs and Roof, and each panel cross-fades in with its photos;
- a garden-room tile opens with its note and button;
- the digits roll on first view;
- the review row drags with momentum on a mouse;
- the phone bar's ˄ opens the audit-ordered summary;
- with JS off, the three floors stack under their own headings and every link works.

**Round 6, whole page (final sheets in `shots/`).** No overflow, overlap or unreadable text at 1440 / 768 / 390 (scrollWidth = viewport). Each section is its own moment:
- the moving garden;
- the four fact cards with dated ratings;
- "Choose your floor", with the plain fan / A/C truth per floor (the thing Booking.com gets wrong);
- the blue table beside "In the garden";
- breakfast told in Fiona's words beside a tilted porch print;
- a draggable row of 12 dated reviews;
- getting here, the closing line and the footer.

**Clearly better than the Booking.com listing side by side**, and the only variant where a visitor answers "which rooms have A/C?" in one tap.

Skill notes (tools.md: notes, never gates). From the inspector:
- `headline-lines` is a false reading of the hidden 0–9 digit columns;
- `shadow` / `button-fx` / `text-shadow` are the legibility ring and shade over the photograph and the requested micro-lift;
- `icon-cards`: the 4-up fact row is the concept's specified device (concepts §4.2);
- `empty-middle` at 1440 is the switch stage's 7/5 split;
- `edge-text` is the review row's peek;
- `no-footage`: no usable video;
- `still-page`: the shader does not count, because headless software GL runs the weak-device fallback (below).

`/animate` set the curves: strong ease-out for presses and panel rises, the pill at 260 ms `(.22,1,.36,1)`, the tile spring at 300 ms with ≤ 4% overshoot, the bar on the drawer curve.

## images

All are Booking.com property uploads, `business-owned`. No upscaling: the hero is 1600×900 from the 1600 px original, drawn 1440 wide.

| use | asset | crop |
|---|---|---|
| first screen + shader texture | img-020 | desktop 16:9 (1600×900); phone 4:5 at fx 0.10 |
| garden floor slideshow 4:5 | img-029, 032, 030, 043, 028 | centre 4:5 |
| upstairs slideshow 3:2 | img-002, 010, 015, 025, 034, 008 | centre 3:2 |
| roof 4:5 | img-021, 022, 004 | centre 4:5 |
| in the garden 3:2 | img-001 | 3:2 |
| porch print 4:5 | img-032 | below the ceiling line |

## gaps

The same as calm: no price (every booking action goes to the Booking.com listing), no WhatsApp or email (`tel:` only), no usable video, no photographs of the beach, breakfast or Yelum, no Instagram, no forecast. Schema gaps per concepts §6: room galleries and floor grouping are hard-wired.

## conflicts

None blocking. Three notes for the critics:
1. **The light shader turns itself off on a slow GPU.** If more than 25 of the first 60 frames take over 40 ms, the canvas fades out and the still photograph stays (the concept's weak-device rule). Headless Chromium with software GL trips this, so the critics' `shoot.mjs` sheets show the still. To see the effect headless, open `dist/index.html?light=force` over http. On a real phone or laptop GPU it runs.
2. **Tint ground `#EDEDF0` instead of the concept's `#E1E1E4`.** The sampled sky-through-canopy value read as a grey band across full-width sections. It is the same cool neutral, lifted. The floor-switch yellow (`#E1B910`, the table frame) appears as a dot on the sliding pill, never under text, as the concept requires.
3. The King panel's text joins the room note with the copy's own "The King Rooms upstairs are new…" sentence (both copy fields, unedited).

## other businesses in this run

Cheeky Monkey opens on a street photograph, a moving triptych of board-rack footage, or a board-shaped window. Its pages are loud surf colour and painted-sign type, walked along a shop. This page opens on a shady garden whose own sunlight moves, with a handwritten title and one table-blue button. Booking is a floor switch, not week tabs or a drawer. Nothing in it shows a board, a road or a reel.

## hand-off checks (4e)

1. Look loop: 3 first-screen rounds plus 3 whole-page and state rounds, written up. Every `dist/img` file comes from `src/make-media.sh`. **pass**
2. Booking CTA equals `dossier.booking.engine_url` (asserted at build); the audit tap-through landed there. **pass**
3. `check-design`: ok, 0 problems, 0 warnings. **pass**
4. `check-places`: 0 borrowed images. **pass**
5. Reduced motion, Save-Data and no WebGL: the canvas is hidden and the photograph stays (audit `reduced_motion`: 1 canvas, hidden, photograph visible). `scroll.early.cls` 0.0024, `scroll.settled.cls` 0. **pass**
6. Other businesses compared above. **pass**
7. No usable video; the first screen is img-020 with the WebGL light as the main item. **pass**

audit-mockup (phone, slow 4G):
- first load 686 KB (images 576 KB, fonts 41 KB; Google Fonts only as third party, allowed at 4e);
- JS inline ≈ 10 KB;
- largest image 181 KB;
- LCP 532–644 ms over the last two runs, CLS 0.004;
- scroll CLS ≤ 0.0024 / 0.
