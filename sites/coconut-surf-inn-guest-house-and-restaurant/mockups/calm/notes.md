# Coconut Surf Inn: calm mockup, "The view from the roof" (concept 1)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-05.
Page: `dist/index.html`, one file, with CSS and JS inlined from `src/page.css` / `src/page.js` by `src/build.py`. Every word comes from `copy/en.json` via `src/data.py`. That data module (copy, alt texts, room galleries, icons, the Rosa mapping) sits inside `calm/` because the interactive and unique mockups were built in parallel in their own folders. Media: `src/make-media.sh` (`# media: …/calm/dist/img/**`). Rosa fixture: `src/rosa-weligama-west.json`, one unedited response fetched 2026-11-05. Fonts come from Google Fonts at 4e (Onest 400/600, Satisfy).
To rebuild: `bash src/make-media.sh && python3 src/build.py`. `--hero` builds the first screen only, which is how rounds 1–5 were made.

## look-log

Shot with `tools/shoot.mjs` (served on :8921), sheets opened at 1440 and 390. Extra states were captured with Playwright in the scratchpad: the end of the phone pan, reduced motion, no JS, and a pixel-contrast probe behind the hero lines.
**The bar.** There is no own website and no `old-site-*.png`. The comparison is what a visitor reaches today: `funnel/walk/05-booking-com-fold.png` (blue bar, search box, an empty entrance hall 1/45, a yellow date panel) and the Google/Airbnb folds. The gold bar is Global Surf `postcard`. I rendered it locally, but its footage is not on this machine, so I compared its method (one short centred title and one short CTA over the place's best media) and not the clip.

**Round 1, first screen.**
- Desktop: img-009 full-bleed reads at once as sea, reef and palms, and it beats the Booking fold, which never shows the sea. As design it has two flaws. The white script title's "C" collides with the big palm crown at centre-left. The subtitle crosses fronds.
- Phone: the photo is visibly soft and blocky (q66), and the subtitle orphans "Weligama" on its own line.
- Change: phone crop to 1600×1280 at q76, and `text-wrap: balance` on the subtitle.

**Round 2, first screen.**
- The phone pan's end frame (captured after 15 s) lands on the reef but has tuk-tuks in the corner.
- On desktop, a 30ch measure broke the subtitle into two lines.
- Change: the pan ends at x≈1040 of the source (reef and the two walkers, no tuk-tuks). The measure limit applies on the phone only. Desktop `object-position: 78%` moves the palm clear of the title.

**Round 3, first screen.**
- I measured the pixels behind the lines. White text came out at **1.9–3.3:1** in every state, so the concept's "check the pixels" test failed.
- A deeper radial shade lifted it to about 3:1, but its ellipse was clipped by its own box and showed a **hard grey rectangle** on the sky. That is a flaw, not a look.
- Change: a blurred ellipse that cannot clip.

**Round 4, first screen.**
- Contrast now passes for large text (p90 ≥ 3.4 desktop, ≥ 3.4 phone at every pan stage). But on desktop the shade reads as a **grey smudge on a bright sky**: an overlay on the photo, which the calibration forbids.
- Change: the concept's own alternative, "the title is set in the ink on the sky instead". The lines sit on open sky on desktop. On the phone the block moves up into the sky band (20svh), so ink holds through the whole pan. The only help left is a faint sky-white haze (`#EEF2F7` at 42%, blurred), which is invisible on the sky and lifts a stray frond tip.

**Round 5, first screen.** Measured ink at **≥ 5.9:1 at the 10th percentile** in every state (desktop; phone at the start, middle and end of the pan). The first screen is the header, one Satisfy title, one 19 px line and one leaf-green button, over the house's own view to Coconuts. The phone pans once from the left palms to the reef in 14 s and stops.
**Clearly better than what a visitor reaches today, at a glance:** the Booking.com fold opens on an empty entrance hall under a search bar, and this opens on the sea, the green and the break from the roof. It meets the gold method: one short title, one short CTA, the best own media, nothing else.

**Round 6, whole page.**
- The sheet showed `|` separators dangling at line ends wherever a details, meta or amenities line wrapped.
- The rating cards wrapped "4 / Nov 2026".
- At 390 the page was 453 px wide. The check-in button "See rooms and live dates on Booking.com" was nowrap at 394 px, with Call beside it.
- Blank bands appeared under the phone slideshows.
- Changes:
  - Separators are drawn in CSS before each item, and `page.js` hides one that would start a wrapped line.
  - The rating date goes on its own line.
  - The check-in and closing buttons stack on the phone and may wrap.
  - Off-screen slides no longer carry `content-visibility` with a 600 px intrinsic size, which was what padded every track to 600 px.
  - The phone bar's call button is fixed at 72 px.

**Round 7, whole page + inspector.**
- `design-taste-frontend/inspect.mjs` found a real **608 px blank** at the Rosa row while it waited: the headline sat at opacity 0 and the widget box's plain link was hidden. That is an "empty box", which playbook §4 forbids. Fix: the build-time values show at once when they are under 24 h old (a clock check, no request). The plain link stays visible in the reserved box until Rosa's iframe covers it.
- Other changes: `spot` gets an 820 px measure (3 lines, not 4); the closing line is 28 px on the phone; the quotes are centred in their stack; the room rows are tighter.
- Inspector FAILs kept, each against the concept:
  - `eyebrow`: the small "The afternoon / Sunset / Until 22:00" lines are the clock that orders this page (concepts §3), not labels.
  - `shadow` / `button-fx` / `text-shadow`: the 1–2 px lifts and the hero haze are the requested micro-detail and legibility.
  - `still-page`: calm has micro-motion only, by concept.
  - `side-scroll`: the slideshows are scroll-snap rows by design.
  - `covered-text`: the sticky header passing over a heading mid-scroll.
  - `no-footage`: there is no usable own video (concepts §2).
  - `size-count`: 15 sizes. I did not reduce it at 4e, and it is listed for 4g.

**Round 8, states.**
- Reduced motion: no settle and no pan. The phone rests on the reef frame. Nothing moves.
- No JS:
  - Two flaws, both fixed. The slideshow dots and arrows rendered without working (author `display:flex` beat `[hidden]`). The Rosa block showed its plain link twice plus an empty 500 px box; with no JS it is now one plain link only.
  - What remains with no JS: every slideshow is a swipeable row, every link works, and the phone bar is static at the foot.
- Final sheets in `shots/`: no overflow at 390, 768 or 1440 (scrollWidth = viewport), no overlap, no unreadable text. The hero image is wider than the phone by design, clipped by the hero.

**Round 9, final check (whole page).**
- The page tells the stay by the clock, in this order:
  - the view;
  - 13:00 check-in, with both dated ratings and the booking pair;
  - six rooms in two plain groups, A/C first and fan rooms never hidden, each with its gallery, beds, sleeps, m², full note and own button;
  - the courtyard, then the thatched roof band;
  - sunset on the green, then the restaurant until 22:00 with the Eranga family and Meagan's words;
  - 7:30 and the break: `spot` and `season`, the Rosa headline, and Rosa's light widget;
  - 11:00 check-out with three dated ratings and the quotes;
  - getting here, the closing line, the footer.
- Side by side with the Booking.com fold, this wins on the first screen (sea and reef against an entrance hall) and on the question the listings get wrong: which rooms have A/C and hot water.

Motion system (Kowalski ease-out `cubic-bezier(.23,1,.32,1)`):
- buttons press to 0.97 over 120 ms; the booking button lifts 1 px on hover;
- the nav underline grows from the left;
- rating cards lift 2 px;
- slides take 350 ms, and the active dot stretches into a sky-blue bar;
- the phone bar slides up over 240 ms (drawer curve) once the hero has gone;
- quotes cross-fade at 300 ms;
- the Rosa headline fades in at 200 ms;
- the hero settles once (desktop) or pans once (phone).

`/find-animation-opportunities` and `/animate` were **not invoked** as skills this run: the micro-animations above are the concept's own list (§4.1 Motion), implemented by hand.

## images

All are the business's own uploads (Booking.com property / Airbnb host), `business-owned` in `dossier.images[]`. Crops only, never upscaled. The widest drawn photo is the roof band at 1440 CSS px from a 1920 source, and the hero is 1920 wide. No stock.

| use | asset | crop |
|---|---|---|
| first screen, desktop 16:9 | img-009 | 1920×1080 from y 120 (above the shack roof), light shadow lift |
| first screen, phone pan | img-009 | 1600×1280 from the top-left, pan to x≈1040 |
| Deluxe with Balcony slideshow 4:5 | img-076, 073, 079, 068, 077, 074 | centre 4:5, ≤ 960 |
| Superior 4:5 | img-035, 034, 037, 030, 017, 064 | centre 4:5 |
| Deluxe 2 Adults + 1 Child 4:5 | img-040, 036, 038, 053 | centre 4:5 |
| Deluxe Family 4:5 | img-031, 045, 022, 027, 089 | centre 4:5 (img-089 has no room type in the dossier; it is the concept's bathroom slide) |
| Budget Double 4:5 | img-047, 046, 048, 049 | centre 4:5, ≤ native |
| Budget Single 4:5 | img-056, 057, 059, 061 | centre 4:5, ≤ native |
| inside, 3:2 | img-007 | whole frame, 1400 / 800 |
| inside, 3-up 4:5 | img-006, img-030, img-003 | 640 |
| roof band 21:9 / phone 4:5 | img-103 | 1920×822 from y 300 / 4:5 at 42% |
| roof, 4:5 + 3:2 | img-015, img-101 | 720 / 1000 |
| sunset 4:5, turtles 3:2 | img-008, img-095 | 840 / 1280 |
| restaurant slideshow 3:2 | img-105, 106, 107, 104 | 1400 |

The alt texts were written from each photograph on contact sheets and in full-size views (`src/data.py` `ALT`). img-030 appears twice (Superior gallery and the inside row), as the concept lists it.

## gaps

- **No price.** Every booking action goes to the listing; `closing` says Booking.com has the live dates and prices.
- **No WhatsApp, no email.** The secondary action is `tel:+94778921396` only.
- **No usable video** (concepts §2), and no photographs of surfing, the hosts or food. The surf is carried by the hero's whitewater, the host's `spot` line and Rosa; the hosts and breakfast by guests' words.
- **No Instagram, no website**, so there is no feed section. It is omitted, not faked.
- **Schema** (concepts §6): no `heroLine` (the hero uses "Gurubebila, between Midigama and Weligama", a fragment of the tagline, asserted in `data.py`); no `rooms[].photos[]` (galleries are hard-wired in `data.py`); no room group or features (the A/C and fan grouping is hard-wired and asserted against each room's note); restaurant hours only in `hoursNote` prose.
- **Rosa:** the headline is from the fixture (`generated_at` 2026-11-04T20:26Z, current hour 02:30 local). After 24 h the page fetches the live JSON when the block nears the viewport, and falls back to the plain link if that fails. Spot id `weligama-west` ("Coconut", Midigama, checked in the fixture), never `coconut` or `coconut-beach`. The block never names Plantations and never makes a level claim.

## conflicts

None blocking.
- **Hero type in ink, and on the phone set in the upper sky, not at dead vertical centre.** Calibration asks for a title centred horizontally and vertically, and the gold pages use white. Measured, white on this pale sky is 1.9–3.3:1, and any shade strong enough to fix it reads as a grey smudge (rounds 3–4). The concept names ink on the sky as the alternative. On desktop the block is centred; on the phone it sits at about 20svh, in the sky band, so the ink holds while the photo pans. The alternative would cost either contrast or a visible overlay on the photo.
- **custom.md "booking lives inside the site"** (level, rooms, dates, then hand-off) against concept 1's booking pattern (per-room buttons and a persistent bar, 1 tap to Booking.com). Calm builds the concept; the in-page chooser belongs to interactive and unique. Booking.com cannot preselect a room from a URL (concepts §4.1).
- **Meagan's quote** sits with "The Eranga family home" (concept §4.1 item 7), so the guests slideshow carries the other eleven. Every quote appears once and none is dropped.
- **First load 1.05 MB** is under the 1.5 MB budget. About 300 KB of it is the first room's later slides, which Chromium's lazy-load distance fetches early. Holding them back needs JS (it would break the no-JS swipe), so I left it.
- **Phone hero sharpness:** the source is 1280 px tall against about 1688 device px on a 2× phone, so it is slightly soft. That is the material's ceiling (the 1440 px original includes the tin roof that the concept says to crop out).
- **A 4e limit, not a flaw:** with JS off, a wrapped `|` line may start with a separator, because the script that hides it does not run.

## other businesses in this run

- **Lotus Surf House** (picked calm, "The gate"): a 6/6 split on white, with the carved gate photograph in the right half, a Parisienne title, a brick-red button, and a walk up a shaded garden house floor by floor.
- **Cheeky Monkey** (picked unique): a drawn surfboard on a cartoon beach with marker lettering, a blue button and loud surf colour.
- **This page:** full-bleed open sky, sea and reef from a roof, an ink Satisfy title in the sky, a banana-leaf green button, a one-time pan on phones, and a page ordered by the clock (13:00 to 11:00). It is the only site in the run that names its own break and carries its forecast.
- No face, accent or first-screen device is shared. The one shared thing is the copy label "Check dates on Booking.com" (Lotus too), which is the owner's real booking path.

## hand-off checks (4e)

1. Look loop: 5 first-screen rounds, then whole-page and state rounds 6–9, all written up above. Every `dist/img` file comes from `src/make-media.sh` (clean rebuild run). Each flaw named is fixed or listed under conflicts. **pass**
2. Booking CTA = `https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html`, asserted equal to `dossier.booking.engine_url` in `data.py`. The `tel:` is asserted against `dossier.contact.phone`. The audit tap-through at 390 landed on the Booking.com URL. **pass**
3. `node tools/check-design.mjs sites/coconut-surf-inn-guest-house-and-restaurant/mockups/calm/dist/index.html`: ok, 0 problems, 0 warnings. I ran it in single-page mode so it would not write into the sibling variants' folders. **pass**
4. `node tools/check-places.mjs coconut-surf-inn-guest-house-and-restaurant`: 0 borrowed images. **pass**
5. Reduced motion looked at (no settle, no pan, resting on the reef). No WebGL in calm. `audit-mockup`: `scroll.early.cls` 0, `scroll.settled.cls` 0. **pass**
6. Other businesses opened and compared above. **pass**
7. No usable video (concepts §2: third-party or another business's film). The first screen is the strongest own photograph, img-009 at 1920. The last round compares it with the Booking.com fold and the gold postcard. **pass**

`audit-mockup` (phone, slow 4G, 2026-11-04T23:23Z):
- first load 1,078 KB (budget 1.5 MB); fonts 56 KB; Google Fonts are the only third party, which is allowed at 4e;
- JS: inline only, about 7 KB uncompressed;
- largest image 130 KB (budget 300 KB);
- **LCP 600 ms**; CLS 0.0023; scroll CLS 0 / 0;
- 0 images without alt; skip link present.
- Taps under 44 px are the slideshow dots' width (24×44, with 44 px arrows beside each).
- The numbers not in the copy are Rosa's (0.4, 0.6, 02:30) and the year.
