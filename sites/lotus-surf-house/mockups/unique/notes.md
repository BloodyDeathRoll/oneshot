# Lotus Surf House: unique mockup, "Under the net" (concept 3)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-03.
Page: `dist/index.html`, plus `dist/stay/index.html` (the room chooser as a page of its own, for JS off). CSS and JS are inlined from `src/page.css` / `src/page.js` by `src/build.py`; words come from `copy/en.json` via `../lotus_data.py`. Media: `src/make-media.sh` (`# media: …/unique/dist/img/**`). Fonts: Google Fonts at 4e (Gelasio 400/500, Allura). Rebuild: `bash src/make-media.sh && python3 src/build.py`.

## look-log

Shot with `tools/shoot.mjs` over http (:8964). Rounds 1–4 used `?net=force` so the cloth draws even under headless software GL (see conflicts). The bar is the Booking.com fold (`funnel/walk/04-booking-com-fold.png`) and gold: `the-lavish-haven` notes for the method (a drawn shape of the place over its own photograph on white) and Global Surf for the level. Process note: the page skeleton was assembled before round 1. Rounds 1–4 changed the first screen only.

**Round 1, first screen.** img-025 as a portrait print under a WebGL net. It failed as design:
- the mesh was 7 px squares at 24% that read as a window screen and greyed the photograph;
- a ruled "rail" under the subtitle read as a horizontal rule;
- the hem arched upward like a frown.

Change: a 4 px mesh at 15%; no rail (the net fades in from above); the hem droops between the two tie points, the way a net tied at its lower corners hangs.

**Round 2, first screen.** The photograph now reads clearly through the mesh. Outside the print, though, the net was invisible on white, so all you saw was a photo with a brown swoosh under it. That is the "gimmick around a thumbnail" the concept warns about. Change: seven soft folds carried by the mesh, so they move with the cloth; a finer hem; and the print grown to 79% of the stage (about 480×640 at 1440×900, under native 1200×1600).

**Round 3, first screen.** The folds were still invisible. I sampled pixels beside the print: pure white. The cause was a real bug: the shader mixed straight-alpha layers and then premultiplied the sum, so on white the colour came out above its alpha and clipped to white. Fix: each layer premultiplied, composed back to front. Now the net hangs as soft folded gauze with a blush hem, and the balcony view sits clearly inside it. The photograph is the subject at a glance and the net is barely there over it, which is the concept's own test.

**Round 4, first screen.** Thread alpha down to 12% so the mesh reads as texture, not a grid. Under reduced motion / no WebGL / no JS, the static SVG draws the same drape, folds and hem (checked side by side: the same object). Against the Booking.com fold this is clearly better at a glance. It says what a night here is (under a net, balcony into the trees) in one picture, where the listing needs 42 swipes.

**Round 5, whole page.** The sheet showed:
- the closing panel's net hem ran straight through the closing line;
- on the phone, the "Not sure" tile's quote icon read as "55".

Changes: the closing net is 170 px tall with the text below it; the tile uses the phone icon (it leads to Call).

**Round 6, checks and states.**
- `audit-mockup` early-scroll CLS was **0.55**. The review stack switched from a scroll row to a stacked grid when the JS ran, while the reviews were in view. The stack is now set in CSS from first paint (`.js .quotes`), the control rows reserve their space, and metric-matched fallbacks were added (Allura → Georgia 75.5%, Gelasio → Georgia 101%). Now 0.0008 / 0.
- Inspector `[covered-text]`: the transparent full-screen scrim kept `display:block` while hidden, so it sat over the page. It is now `display:none` until the chooser opens.
- At 390 the 12-dot review control was 376 px wide; the dots are narrower on the phone.
- First load fell from 1.11 MB to 740 KB with off-screen slides held back.
- In Playwright:
  - the phone bar's "Choose a room" opens the slide-down panel, and focus lands on the first tile;
  - "Garden room" shows the three fan rooms and their notes;
  - Esc closes it, and focus returns to the bar button;
  - Tab is trapped while it is open (the trap is in code; this step was not exercised in Playwright).

**Round 7, whole page (final sheets in `shots/`, default URL, so the still net shows in headless).** No overflow, overlap or unreadable text at 1440 / 768 / 390 (scrollWidth = viewport). The sections:
- the net over the balcony;
- a paragraph of facts with dated ratings;
- "From the roof down", photographs stepping down the 12-column grid like stairs (Roof 1–4, Upstairs 4–11, Garden 5–12);
- the King Rooms as a 3:2 + 4:5 slideshow pair;
- the garden rooms as true masonry beside their honest notes, under Yelum's "Old rooms and new";
- Fiona's review set large over Yelum, Breakfast and the Buddha print;
- the offset roof pair;
- guests; the gate print beside "Getting here"; the second, smaller net over the closing panel.

**Clearly better than the Booking.com listing side by side**, and unlike anything else in the run.

Skill notes (tools.md: notes, never gates). From the inspector:
- `shadow` / `button-fx`: the print shadows and the button's hem-sag press are the concept's micro-animations;
- `eyebrow` is a false reading (Fiona's citation above "Yelum");
- `no-footage`: no usable video;
- `name-only-title`: the concept's choice (tagline too long, schema gap);
- `still-page`: headless runs the still net (below);
- `side-scroll`: the slideshows.

`/animate` set the motion system: the chooser arrives on the drawer curve (`.32,.72,0,1`, 460 ms) "with the net's damping", tiles press to 0.98, the answer fades in 320 ms, and masonry photos lift 4 px on fine pointers.

## images

All are Booking.com property uploads, `business-owned`. None upscaled.

| use | asset | crop |
|---|---|---|
| first screen print 3:4 | img-025 | full frame 1200×1600 (600 / 840 / 1200 renditions) |
| house rows | img-021 (4:5), img-002 (3:2), img-020 (3:2) | centre |
| King pair | img-002, 010, 015 (3:2) · img-025, 035, 008 (4:5) | centre |
| garden masonry, own ratios | img-029, 032, 043, 030, 028, 009 | fisheye edges trimmed 6% (029, 032, 030, 043, 028); 009 whole |
| porch mat print | img-022 | 4:5 |
| roof pair 4:5 | img-021, img-004 | centre |
| out the gate print 4:5 | img-019 | fx 0.3 |

## gaps

The same as calm and interactive: no price, no WhatsApp or email, no usable video, no photographs of the beach, breakfast or Yelum, no Instagram, no forecast; the schema gaps in concepts §6.

## conflicts

None blocking. Departures from concepts.md, each a deliberate call:
1. **No rail at the top of the net.** The thin square frame rendered as a horizontal rule under the title ("no decorative lines"). The net fades in from above instead.
2. **No device tilt.** Motion permission takes a tap and a permission prompt; on a phone the net sways once on load (about 1.2 s) and then follows a finger dragged across it. On a fine pointer it parts around the cursor and settles back, then sleeps.
3. **The chooser is one step.** It has the three tiles from the concept, and "Not sure" leads to Yelum's words and Call. The optional date fields were left out: the concept allows them only if a tap-through proves Booking.com honours `checkin`/`checkout` on this listing, and no live booking request was made from here.
4. **The cloth turns itself off on a slow GPU.** If the first frames average over 20 ms, the still SVG net stays (the concept's weak-device rule). Headless Chromium with software GL trips this, so the critics' `shoot.mjs` sheets show the still net. To see the cloth headless, open `dist/index.html?net=force` over http.
5. Interface labels the template owns: "From the roof down", "See the roof / room / garden rooms", "Choose a room", "Garden room: fan, on the ground floor", "King Room: A/C, upstairs", "Not sure: ask Yelum first".

## other businesses in this run

Cheeky Monkey opens on a road photograph, a moving board-rack triptych, or a board-shaped window with a resin shader. Its chooser is a right-hand drawer. This page opens on a drawn mosquito net hanging over a print of a balcony on white, in a soft script and a violet taken from a temple flower. Its chooser slides down from the top with a hemmed edge. Nothing shows a board, a road or a reel.

## hand-off checks (4e)

1. Look loop: 4 first-screen rounds plus 3 whole-page and state rounds, written up. Every `dist/img` file comes from `src/make-media.sh`. **pass**
2. Every "Check dates" action is the dossier's Booking.com URL (asserted at build); "Choose a room" links are a real `stay/` page; the audit tap-through landed on the listing. **pass**
3. `check-design`: ok, 0 problems, 0 warnings. **pass**
4. `check-places`: 0 borrowed images. **pass**
5. Reduced motion / no WebGL: both canvases hidden, still SVG net, photograph visible (audit `reduced_motion`: 2 canvases, both hidden). `scroll.early.cls` 0.0008, `scroll.settled.cls` 0. **pass**
6. Other businesses compared above. **pass**
7. No usable video; the first screen is the strongest own portrait at native size, with the WebGL net as the main item. **pass**

audit-mockup (phone, slow 4G):
- first load 741 KB (images 596 KB, fonts 61 KB; Google Fonts only as third party);
- JS inline ≈ 14 KB;
- largest image 190 KB;
- LCP 1,188–1,452 ms over the last two runs, CLS 0.0006;
- scroll CLS 0.0008 / 0.
