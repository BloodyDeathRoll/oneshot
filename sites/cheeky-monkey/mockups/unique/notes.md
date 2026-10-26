# Cheeky Monkey · unique · "Pick your board" — 4e notes

designer 0.7.0 · run `2026-10-midigama-01` (test, operator alon) · 2026-10-26/27 · brief: `concepts.md` Concept 3.
Page: `dist/index.html` (one file, inline CSS/JS; Rethink Sans + Permanent Marker from Google Fonts, latin files preloaded, `display=optional`). The set-piece uses no library: raw WebGL (~6 KB) and ~80 lines of the page's own scroll JS. Media: `src/make-media.sh` (`# media:` headers for `dist/img/**` and `dist/video/**`; `dist/video` is a link into the store, `~/.oneshot/assets/cheeky-monkey/mockups/unique/video`).
**Look at it over http** (`node tools/serve-mockups.mjs`, or any static server on `dist/`). On `file://` Chromium taints the video for WebGL, so the page falls back to the CSS-masked board without the resin gloss. All look rounds from round 2 on were shot over http.
Old site for comparison: `dossier/cheeky-monkey/assets/old-site-desktop.png`, `old-site-mobile.png`.

## look-log

**First screen, round 1** (file://, 1440 + 390). Wrong as design: on desktop the board was a small pill (≈ 210 × 670) floating in a field of white, and the two-line featureLine sat at the very top, beside the nav. On the phone the stack (line, board, button) was taller than the screen, so the line overprinted the wordmark. The outline read as a capsule, not a surfboard (nose and tail equally round), and the gloss was invisible. Change: split the featureLine either side of the board on desktop ("Come as a stranger," left, "leave as a friend." + the button right), so the board can take 86svh and the white becomes a composition. On the phone, half the line above the board and half below it, with the board's height computed from what is left. A new outline with a finer nose, the widest point just below the middle and a round-pin tail. Next to the old site (PHP warnings over a generic surfer, a black "not bookable" banner, no booking link): ours already wins on clarity, but not yet on presence at 1440.

**First screen, round 2** (now over http). WebGL is live: at one frame the orange board in the reel fills the window exactly, so the window literally reads as a board. The rim light shows on the rail nearer the pointer. The split line gives the desktop screen a centre and two sides; on the phone the board sits between the two halves of the sentence with the button clear of the bottom edge. Wrong: the board still looked flat, a cut-out more than an object. Change: a cubic "roll" darkening toward both rails (max 16 %) and the specular band clamped to the board, so it always shows. Against the old site: clearly better at a glance. Theirs is someone else's surfer with server errors above it; ours is their own new boards, moving, framed as a product, with one blue button to live dates.

**First screen, round 3** (+ mid-scroll stills at p = 0.15 / 0.3 / 0.45 / 0.7, both widths). The board has volume now. Wrong: at the shoot's own mid-scroll stop (p ≈ 0.5) the mask had already fully opened, so the "board opens into the shop" moment was too short. At p ≈ 0.45 on the phone, the board's lower half was cut flat where it outgrew the reel's rectangle. Change: mask growth eased as e^2.2 over p 0.02–0.86, and the reel's rectangle grows to cover whatever part of the board is on screen (capped at its final, never-upscaled size). Seen: a continuous opening at both widths, the rails sweeping outward, the Rockwell logo arriving centre screen, then the 1080-px column (desktop) / the full screen (phone) of the rack. No flat cut.

**Whole page, round 1** (shoot.mjs both widths). Wrong: (a) the board-shaped crops on the four surf-week cards overflowed onto the card text (a percentage height inside a grid cell); (b) "Every week comes with": each note (`USD 5 extra`, `with the three lesson packages`) became a separate flex column; (c) the phone bar's "Check dates on Booking.com" wrapped to two cramped lines; (d) eleven quote dots wrapped onto two rows on the phone, and every dot was under 44 px. Changes: fixed 300 × 94 px board crops; note text wrapped in its line; bar button `nowrap` at 14.5 px with a 2.2 : 1 split; dots 44 × 44, and on the phone the quotes get arrows plus a "1 / 11" counter.

**Whole page, round 2.** Wrong: "Call about this week" and the dated pill wrapped in a 260-px card; in the guests block the dots hung far below a short quote, because the track takes the tallest quote's height; img-112 (the shaper) carries a small avatar badge from its source in the bottom corner. Changes: card button label "Call to book" (an interface label, the drawer still says "Call about this week"); pill 13 px; the quote nav moved under the heading so it never moves; img-112 re-cropped in the recipe (1035:1180, top-anchored) so the badge is gone.

**Whole page, round 3 (hand-off round)** — sheets at 1440 and 390, plus reduced motion, no JS, no WebGL and the drawer at both widths.
- Fixed this round: early-scroll CLS 0.13 on the throttled phone came from the web-font swap reflowing the intro and counter text. The two latin font files are now preloaded with `display=optional`: early 0, settled 0. Review-source links raised to 44 px targets; the wordmark (now the visible h1) to 46 px; the drawer gets a symmetric exit (its visibility flips only after the 420 ms slide) and the room hand-off box enters like the steps (`/find-animation-opportunities`). The closing line is a 32 px statement paragraph, not a three-line 52-px heading; the closing gradient is a flat white.
- Inspector (`design-taste-frontend/scripts/inspect.mjs`, final run 8 FAIL / 6 WARN). Kept, with reasons:
  - "Empty screens 1–3" and "pinned text over a picture" are the concept's set-piece: a transparent full-stage canvas with the board window in it, and the lines fade by p = 0.14, before the board reaches them.
  - "Shadows / button glow": custom.md allows "gentle shadows where they help". They are soft, resting only on the booking buttons and cards.
  - "Emoji 👍" is inside Jimmy's verbatim review.
  - "Eyebrow above heading" is a false positive: the Google Maps button above "Good to know".
  - "Covered text at 390": measured with `elementFromPoint`, it is the persistent phone booking bar at the bottom edge while scrolling.
  - "Reduced-hidden text": the closed drawer.
  - "Small h1": the h1 is the wordmark; the first screen's display type is the featureLine.
  - "Gradient on .shadow": the board's contact shadow on the mat.
  - "Side-scroll rows": the slideshow tracks and the phone's card swipe row with a peek (references #14).
- Overflow, overlap, unreadable text in the last sheets: none found.
- Reduced motion (390, 1440): the poster in the board shape, no pin (the section is exactly 100svh), no video, the page goes straight to "Catch waves, not worries". No JS: identical first screen; the drawer renders as an in-page "Plan a stay" section with every link. No WebGL (`--disable-webgl`): the same zoom-through runs on the CSS board mask over the `<video>`, without the gloss.
- Booking tapped through at 390 and 1440: the hero button lands on `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html` (1 tap). "Plan a stay" opens the drawer with focus on Close. A surf week → Yoga and Surf → Shared double shows USD 280, and the Email link's subject becomes "Cheeky Monkey: Yoga and Surf Lesson Package, shared double room". A room → Classic Triple → the Booking.com hand-off link. Esc closes, and focus returns to "Plan a stay". `audit-mockup`: drawer opens / closes / focus returned = true.
- **Against the old site, the whole page, side by side:** clearly better on every screen. The old first screen has PHP warnings, a stock-looking surfer and a "rooms not bookable" banner, there is no booking link anywhere, and on the phone it runs 470 px wide. This page opens on their own reel in a board window and gives live dates in one tap. It shows four priced surf weeks one scroll down (the old site has no prices), five rooms each sold with 4–6 photos, the shop as a masonry of their boards, Baba, guests' words with dated ratings, and directions.

**Round 4: colour rework (Alon's feedback)** — "i like the unique one, but lets work on the background a bit to make it more colorful with surf and beach vibes." Direction, layout, copy and set-piece kept. First pass, first screen at 1440 + 390: the plain white stage becomes a beach the board stands on. Sky `#CADFFA` top third, a far-sea band `#36A4EC`, the aqua sea `#7DD2F4`, a white foam line and sand `#F2E8D7`. The board's contact shadow is warmed to a sand shadow. The line and the button were moved down onto the sand, so the blue button sits on its strongest ground (4.10:1 against sand; on the aqua it would be only 2.94:1). Seen: it reads at once as a board standing on a beach, it is colourful, and the button stands out at both widths. Wrong: it looked like flat clip-art. The far sea was a hard ruled stripe, and the foam was a white slab with a straight bottom edge.

**Round 5: colour rework (Alon's feedback)** — first screen again. The shore is rebuilt as layered wave shapes, each a flat colour field with a wave-crest top (no gradients): far sea; aqua sea with a crest, drifting 40 s; a foam ribbon, drifting 22 s; wet sand `#E4D0AE`, drifting the other way 30 s; dry sand. Transform-only motion, stopped under reduced motion. Seen at 1440 and 390: the sea has depth, the foam moves like a shorebreak behind the board, and nothing is ruled. Remaining flaw: the wet sand read as a thick even tan stripe, so it was thinned to a narrow wet edge.

**Round 6: colour rework (Alon's feedback)** — whole page (shoot.mjs both widths) plus mid-scroll stills at p = 0.15 / 0.35 / 0.6 at 390 and 1440, then reduced motion and no-WebGL.
- Grounds through the page, sampled, joined by the same shoreline crest (a colour-field edge, not a rule):
  - sand under the intro and the surf weeks (continuing from the hero's beach);
  - aqua `#E4F6FD` under the rooms; white (the shop's walls) under the shop;
  - sunset `#FDE6EE` under the roof; sand under Baba;
  - sky `#EAF3FE` under the guests; white under "Getting here";
  - aqua under the closing and Instagram; sand under the footer.
- The four surf-week cards each put their board crop on a fin colour from the fin wall, img-108: blue `#36A4EC`, yellow `#DBB912`, red `#E53034`, green `#25833D`. The inclusion icons take the blue, red and green fins.
- Fixed this round: the intro fact boxes and the lesson card still used the old pink tint on the new sand, so they are now white.
- Set-piece: the board opens against the beach at both widths, and the beach shows either side of the 1080-px column at the end on desktop. Reduced motion: the poster board stands on a static beach, with no pin and no drift. No WebGL: the same opening over the beach. Overflow, overlap, unreadable text: none.
- Against the old site: still clearly better at a glance, and now as colourful as a beach day rather than a white page.

## images

All business-owned (`dossier/cheeky-monkey/assets/index.json`: Booking.com property uploads, the owner's site, the business's Instagram). No stock, no `stock/` folder, no image of unknown licence.

| file in dist/img | dossier asset | licence |
|---|---|---|
| board-poster-720/1080 | vid-009 frame at 3.0 s (the cut's first frame: white Rockwell beside the magenta board) | business-owned (Instagram reel, 7 Oct 2026) |
| board-rail | vid-009 frame at 12.8 s (the rainbow rail, a hand) | business-owned |
| card-img-100 / 103 / 137 / 096 | img-100, img-103, img-137, img-096 (3:5, board mask in CSS) | business-owned |
| room-img-030 014 021 016 033 026 | Superior Double Room (dossier `images[].room`) | business-owned |
| room-img-035 034 036 037 | Classic Triple Room | business-owned |
| room-img-058 041 045 050 053 | Double Room | business-owned |
| room-img-002 004 009 013 | Small Double Room (013 is the view from the roof, tagged to this room) | business-owned |
| room-img-064 063 065 070 | Small Twin Room | business-owned |
| shop-img-109 146 112 108 131 116 087 | img-109, 146, 112 (badge cropped off), 108, 131, 116, 087 | business-owned |
| roof-img-134-d/m | img-134 (1500 px; desktop band drawn ≤ 1500, phone 4:5) | business-owned |
| roof-img-078 | img-078 | business-owned |
| baba-img-141, baba-img-121 | img-141 (Baba); img-121 (an earlier shop front, shown as a small print, alt says "earlier") | business-owned |
| road-img-082 | img-082 (today's front, red tuk-tuk) | business-owned |
| ig-img-105 085 099 089 013 | same ids | business-owned |

Video (`dist/video`, store): `board-720` (VP9 1.60 MB / H.264 1.81 MB, phones and the board at rest) and `board-1080` (VP9 2.65 MB / H.264 3.45 MB, desktop ≥ 861 px, for the full-column end of the zoom). Both come from vid-009 3.0–13.0 s, the dossier's cut: no audio, 30 fps, never upscaled (1080 source px at ≤ 1080 CSS px). They are attached after the load event plus idle, and never under reduced motion or Save-Data.

## palette after the colour rework (round 4–6)

| role | hex | asset | why |
|---|---|---|---|
| sky (hero) | `#CADFFA` | img-013 sky, area average | the clear sky over the roof; pale enough for the header ink (9.3:1) |
| far sea | `#36A4EC` | img-108 blue fin | the depth band at the horizon |
| sea (hero only) | `#7DD2F4` | img-108 painted fin shelf | the business's own sea photographs are overcast (img-100 `#7299AC`, img-013 `#65787D`); this is the clearest aqua in its own material |
| foam | `#FFFFFF` | — | the shorebreak ribbon |
| wet sand | `#E4D0AE` | img-089 sand (`#C0A17B`) lifted | the narrow wet edge |
| sand | `#F2E8D7` | img-120 sand (`#D7C9B7`) lifted | where the board stands; the ground of the intro, surf weeks, Baba, footer |
| aqua ground | `#E4F6FD` | img-108 shelf lifted | rooms, closing, Instagram |
| sky ground | `#EAF3FE` | img-013 sky lifted | guests |
| sunset ground | `#FDE6EE` | img-134 pink sky (`#FAC7D6`) lifted | the roof |
| fins (card fields, icons) | `#36A4EC` `#DBB912` `#E53034` `#25833D` | img-108 fin wall | the colour of the shop |
| ink / booking | `#143746` / `#0B72C4` | unchanged (img-141 / img-108) | |

Contrast, measured (WCAG relative luminance):
- White on the booking blue: 4.98:1.
- Ink `#143746` on sky 9.28, sand 10.39, aqua ground 11.35, sky ground 11.26, sunset 10.65, white 12.62. On the aqua sea 7.45: only the hero line can sit on it, and on desktop both halves sit on the sand.
- Secondary ink `#3d5865`: ≥ 5.55 on every page ground.
- The booking button against its surroundings: 4.10:1 on sand, 4.48 on aqua ground, 4.44 on sky ground, 4.20 on sunset, 4.98 on white. Buttons are never placed on the aqua sea, where it would be 2.94.
- Every ground's luminance is ≥ 0.72 except the hero's sea band (0.57), which is a picture field behind the board. `check-design`'s light-ground check passes.

## gaps

- No WhatsApp: rooms go to Booking.com (the hero, every room, the bar); weeks, lessons and boards go to `tel:` / prefilled `mailto:` / Instagram. No invented channel.
- Prices are from 2021: every price block carries "Published 2021, call to confirm" as a dated tag, not fine print.
- Booking.com date parameters (`checkin`/`checkout`/`group_adults`) could not be tap-tested in a test run, so the drawer's optional date row is **not built** (concept: "dropped, never faked"). The room step hands off to the listing.
- No break name, so no forecast (concept §3). No shop hours, so the shop has no hours line. No instructor names. Opening status is unclear, so the page states neither open nor closed.
- No Instagram post URLs: the tiles link to the profile.
- No owner water footage: the only clip is indoors (pitch point, concepts.md §2).

## conflicts

None blocking.

0. **custom.md "Grounds are clean whites and light neutrals" vs the operator's request for "more colorful with surf and beach vibes" (round 4).** I followed Alon. The grounds stay light (house rule 1 holds: page grounds have luminance ≥ 0.72, `check-design` passes), but they are tinted from the photographs, not neutral, and the hero carries a drawn beach. The alternative, white with colour only in accents, is what he asked to change.

1. **No GSAP / ScrollTrigger (concept: "GSAP + ScrollTrigger ~45 KB").** The same zoom runs on a `position: sticky` stage with the page's own scroll progress, and the section height is fixed in `<head>` from the tier, before first paint. This follows the Global Surf v2 precedent, where the critic counted a CDN GSAP as a third-party script and measured CLS ≈ 1 from the pin. The means differ; the motion is the concept's (same mask, same 180 vh / 110 vh, same order).
2. **No cross-fade to white at the end of the zoom.** The concept fades the full footage to white and hides it. A fade leaves a blank white screen before section 2, the "empty screen after the hero" the gold notes warn about. So the opened footage holds and then scrolls away with the page as the next section arrives. Nothing is left as a slab: the stage is in the flow, not fixed.
3. **The hero layout.** The concept puts the featureLine above the board and the button below it. At 1440 that left a ~210-px-wide board in a field of white (the concept's own named risk), and at 390 the stack did not fit. Now the line is split either side of the board (desktop) or above and below it (phone), and the button sits under the right half on desktop. The board is 86svh tall on desktop (the concept asks ≥ 84svh).
4. **The board outline.** A finer round-pin outline replaces the even capsule; the 1:3.2 ratio is kept.
5. **Card crops.** The Full Surf card uses img-100 (a surfer walking into the water) instead of img-134. img-134 is the roof band, and one photograph is not shown twice. Moderate = img-103, Yoga = img-137 and Rental = img-096, as written.
6. **Roof side image** = img-078, not img-137, which is already the Yoga card. **Baba's small picture** = img-121 (an earlier shop front, as a print), not img-142: img-142 is a near-duplicate of img-141 and side by side read as a mistake.
7. **Masonry:** img-117 is dropped (Instagram stickers are burnt into the frame); img-087 is kept.
8. **Room slides are 3:2, not 16:9.** Most room photos are 3:4 portraits, and a 16:9 slice kept a strip of floor. One ratio for every slide (house rule 2).
9. **The featureLine appears once** (the hero), not again under the roof band.
10. **The drawer URL is `#book`, not `/plan/`.** At 4e the page is one file. `#book` is also the convention `audit-mockup` measures (drawer open/close/focus). With JS off, `#book` is the same content as an in-page section; 4g gives it a real page.
11. **The phone's gloss is static.** No device-tilt permission prompt (the concept: "only after a tap grants motion permission; otherwise static"); on touch the light rests at 34 %.
12. **Card button label** "Call to book" (fits a 260-px card on one line); the drawer keeps "Call about this week".

## other businesses in the run (hard constraint 5)

This run has one business. Against its other two variants (looked at, not touched): calm opens on img-147 full-bleed (the main road through board noses), with "Catch waves, not worries" in a white script and a red button. Interactive opens on a dark-edged triptych of the reel, with the business name in a fat white brush script and a magenta button. This one opens on white with one board standing on a mat, the reel inside it, a felt-marker line wrapped around it and a blue button. It is the only one of the three where scrolling opens the board into the shop. Different face pair (Rethink Sans + Permanent Marker), different booking colour (blue fin `#0B72C4`), a drawn beach and sampled sand / aqua / sky / sunset grounds (since round 4), a right-hand drawer.

## check results

- `tools/check-design.mjs` (single-page form, final file, after the colour rework): **ok**, 0 problems, 0 warnings. h1 Rethink Sans (the wordmark), h2 Permanent Marker, body Rethink Sans, ground `#FFFFFF`, 0 all-caps labels, 0/25 labelled headings.
- `tools/check-places.mjs cheeky-monkey`: ok (0 borrowed images).
- `tools/audit-mockup.mjs cheeky-monkey unique` (after the colour rework): **scroll.early.cls 0, scroll.settled.cls 0**. First load (phone, slow 4G), re-measured after the colour rework: 382 KB (images 221 KB, fonts 65 KB, the inline HTML/CSS/JS the rest); largest image 89 KB; LCP 1.44 s; CLS 0. The beach is CSS with no image files, and its drift is transform-only. Third-party on load: Google Fonts only (allowed at 4e). Tap targets under 44 px: 0. No JS: 6 booking links reachable in `#book`. Reduced motion: canvas hidden, photograph visible. Drawer: opens, Esc closes, focus returns.
- Booking targets copied from the dossier: `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html`, `tel:+94719248686`, `mailto:cheekymonkeymidi@gmail.com`, `https://www.instagram.com/cheekymonkeysrilanka/`.
