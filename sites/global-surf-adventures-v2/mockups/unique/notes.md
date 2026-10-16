# Global Surf v2 · unique · "From the air" — 4e notes

designer 0.5.0 · run `2026-10-globalsurf-03` · 2026-10-17 · brief: `concepts.md` Concept 3 (scroll set-piece, pattern 9 "the drop").
Page: `dist/index.html` (one file, inline CSS/JS; Literata + Parisienne from Google Fonts, 83 KB latin; **no GSAP since round 2.2**: the drop is a sticky stage driven by ~60 lines of the page's own JS). Media: `src/make-media.sh` (`# media:` headers for `dist/img/**` and `dist/video/**`; `dist/video` is linked into the store by `tools/link-assets.sh`).
Old-site comparison: the live `https://www.globalsurf.com/` shot with `tools/shoot.mjs` into `/tmp/claude-1000/gs-v2-oldsite-unique` (not in the repo; the dossier has no `old-site-*.png`).

## look-log

**First screen, round 1** (file://, 1440 + 390). Wrong as design: the logo was clipped to its lower half (outer `viewBox` double-offset against the symbol's), and the white logo and nav sat on the poster's pale hazy sky, nearly unreadable at 1440. Change: fix the viewBox; give the header a soft local legibility gradient (top 110 px) plus a stronger local text-shadow, nav at 500. Against the old site (agency home: Maldives boat reel under "Tailor-Made Surf Trips Like Never Before", dark brown bar, salmon button, Messenger bubble): ours already wins on subject — the lodge's own roofs and pool in the palms — but not yet on polish while the header is illegible.

**First screen, round 2** (http, video playing). The header now reads on every shot of the edit; title (Literata 500, 50/36 px) and the one button sit centred. Wrong: on phones the hero was the 1728 master centre-cropped to 600 × 972 and upscaled to 780 device px, visibly soft. Change: a separate phone master cut from the native 1080-px source (668 × 1080), vid-010 shot scaled only 1.11×. Old site side by side: ours is clearly better — own coast and lodge, one title, one button, nothing covering it.

**First screen, round 3.** Phone hero is sharper; the poster (lodge roofs + the blue pool in the palms) frames the lodge below the button at 390 and around it at 1440. Remaining: the reef shot's top quarter is grey cloud — it is the business's own footage at real speed, so kept. Verdict next to the old site: clearly better at a glance — the old first screen sells another country, this one shows the lodge and the sea 40 m away.

**Whole page, round 1** (step 0.9, then 0.6). Wrong: (a) the Freestylers thumbnail and other `aspect-ratio` images stretched tall because their `height` attribute won over CSS (no `height:auto`); (b) the guests photo collapsed to ~160 px because the quote track's min-content width blew the 7fr column; (c) on phones the pinned drop sat at the top of the screen with white below (a later `display:block` overrode the column flex); (d) "The lodge" title appeared twice on phones (pin + section). Changes: `img{height:auto}`, `min-width:0` on grid children, mobile pin flex under `html.drop-live`, section h2 visually hidden on phones while the pin shows it.

**Whole page, round 2** (+ drawer, tiers, mid-scroll). The drop reads as one continuous descent at both widths: img-062 from the road → the lodge → img-026's pool and palm take over aligned on the same pool → into the water → img-005 at the water's edge with `featureLine`. Mid-scroll shots at 390 and 1440 looked at. Wrong and fixed: phone plate dots sat on top of the stage (moved to its foot, white); the 026→005 cross-fade lingered as a double exposure (shortened to 0.79–0.86); the drawer's total/continue scrolled away (now docked at the drawer foot); three stacked stepper cards on phones (now one card with three rows); the Freestylers option cramped at 390 (stacks); with JS off the transparent white header vanished on the white page (now absolute over the hero only); under reduced motion on phones the empty pin box showed (mobile flex rule leaked past the tier gate — now gated by `html.drop-live`). Reduced-motion (390, 1440) and no-JS (390, 1440) re-shot: the static two-up of img-062/img-026 + img-005 with `featureLine`. Overflow/overlap/unreadable text: none found in the last sheets. Against the old site: better on every section — prices on the first scroll (old site has none), real rooms with 5–6 photos each, the place explained from the air instead of a tractor and a 360° widget.

Booking tapped through at 390 and 1440: "Choose Level 2" → drawer opens on Level 2, focus on close, URL `#book`; couple +1, twin, Sat 20 Feb 2027 → hand-off `https://globalsurfadventures.bookinglayer.com/en/product/level-2-rollers?start=2027-02-20&end=2027-02-27&female=1&male=0&couple=1`; Esc closes and focus returns to "Choose Level 2". Engine base URL copied from the dossier `booking.engine_products`; WhatsApp `wa.me/972523593240` from `booking.whatsapp`.

**Round 2 (rework after 4f round 1: critic 64/80 d1–7, visual 7, experience 7).** Every unique fix from the three reports, in order of effect:

**Round 2.1, first screen** (poster with the video blocked, 1440 + 390). Wrong (visual + experience): the title sat on the busy palm canopy and the white wall, the pool-blue button vanished into the pool, and the laptop poster looked inland at the road and a truck. Change: poster moved to the end of the rise (edit 1.35 s = vid-009 3.05 s: the surf and the reef line over the lodge roofs) and the loop now starts at that same time, so poster and first frame match; a soft radial shade behind the title only (≤ 40 % ink, fades out by the edge of the title block); the hero button on the deeper pool blue `#084F6A` with a soft shadow (white text 8.9:1). Seen: the title sits on the open sea at both widths and reads at once; the button separates from the water. Next to the old site (Maldives boat reel under a salmon all-caps button, Messenger bubble): clearly better, it is this lodge and its own surf.

**Round 2.2, the drop rebuilt** (CLS probe over a slow wheel scroll, mid-scroll shots at 1440 and 390). Wrong (critic + experience): GSAP from jsdelivr was a second third-party script, the pin logged CLS ≈ 1.0, and on slow 4G the late boot grew the page by 2,220 px above the reader. Change: GSAP removed; `position: sticky` stage with the page's own progress + 90 ms smoothing; the tier is decided in `<head>` before first paint, so the section's height never changes above the reader; plates load on the first scroll / when the levels are in view / 2.5 s after load, and if they are not ready when the section's top reaches the bottom of the screen that view keeps the static composition (the change happens below the reader). Desktop entry: the plate arrives framed in the page margins (rounded inset) and opens to full bleed over the first 7 %, so it no longer starts cut by the tint's edge. Phone: the repeated script title over the plate is gone, the 4:5 stage is centred between header and bottom bar and releases straight into "The lodge" title (the ~300 px gap is closed). Measured: CLS across the full scroll 0.0055 desktop (load only) / 0 phone; hosts contacted: Google Fonts + the one Rosa JSON, no jsdelivr.

**Round 2.3, the hand-off** (frames at 0.36/0.40/0.44/0.48 of the drop, both widths). Wrong (visual: img-062 soft and blocky mid-zoom; experience: a feathered rectangle of img-026 over img-062): img-062 zoomed to 3× cover; the feather reached the image's own edges at ~27 % opacity; img-026's unmasked copy faded in before it covered. Change: img-062 stops at 1.55× cover (≈ 1.1 css px per source px at 1440, sharp); from there img-062 grows in lockstep with img-026 so the two pools never drift, and blurs in proportion to its overscale (reads as depth, never as blockiness); the mask is an ellipse that is transparent before the image edges; the unmasked img-026 fades in only once it covers. Seen: one continuous descent onto the palm, no rectangle, no double exposure. First-round shot at 0.42 still showed a ghost pool; fixed in this round and re-shot.

**Round 2.4, whole page** (shoot.mjs both widths, poster/drawer/menu/reduced-motion probes). Changes: Level 1's washed-out backlit clip replaced by vid-010 32.88–36.44 (a guide pushing a beginner into the whitewater, then a first stand-up; properly exposed); the dead area right of "Choose your level" now holds the proof (8.6 large, Booking.com | 80 reviews | 28 Sep 2026); the room gallery is the full container width with the text in two columns below; the forecast shows a designed fallback card (wave icon, "South Point", the plain link as a button) whenever Rosa is not framed, the headline comes from a fresh fixture with a 24 h gate and one lazy refresh, and the widget is framed only after that request succeeds (on `file:` it is never framed: Rosa's frame-ancestors cannot match a file page); phones get a menu (sheet, focus kept inside, Esc closes, focus returns); the drawer's foot on phones is one line (total + "Continue booking") with the price note moved into the flow and a 150 → 64 px clip band. Mechanical: "globalsurf.com" on the Seagallas and Dana credits; the header "Book now" is `visibility:hidden` until the header turns solid (first Tabs: skip link, logo, nav); steppers named "Add a woman" / "Remove a couple" etc.; slideshow dots and room-name tabs ≥ 44 px; the focusable tracks have a role and a name. Reduced motion (both widths): static two-up + img-005 with the featureLine, no video. Overflow/overlap/unreadable text: none in the last sheets. Against the old site's sheets (`/tmp/claude-1000/gs-v2-oldsite-unique`): better on every screen; the old first screen sells another country, has no price and a chat bubble over it.

## images

| file in dist/img | dossier asset | licence |
|---|---|---|
| plate-img-062-d/m, still-img-062 | img-062 (drone, lodge between road and railway) | business-owned |
| plate-img-026-d/m, still-img-026 | img-026 (pool + palm from above) | business-owned |
| plate-img-005-d/m | img-005 (pool at water level) | business-owned |
| waves-img-099-d/m | img-099 | business-owned |
| breakfast-img-011 | img-011 | business-owned |
| sunset-img-129 | img-129 (1938 px, drawn ≤ 1100) | business-owned |
| dinner-img-093 | img-093 (1536 px, drawn ≤ 1536, not full-bleed) | business-owned |
| lodge-img-036/075/077 | img-036, img-075, img-077 | business-owned |
| room-img-063/078/095/042/050/064 · 080/084/083/069/079 · 081/082/041/043/044/071 | copy `mockup_extras.rooms[].gallery` | business-owned |
| ig-img-024/090/055/087/118/016 | same ids | business-owned |
| hero-poster-d/m | frame of the hero edit at 1.35 s (vid-009 ≈ 3.05 s), round 2.1 | business-owned |
| level1/2/3-poster | frames of vid-010 (32.88 s+, round 2.4) / vid-003 / vid-002 | business-owned |
| plate-img-062-m, plate-img-026-m | now 2000 px at q60 (were 1400): the phone stage at DPR 2 no longer upscales at rest | business-owned |

Video (`dist/video`, store): `hero-d1728` (2.2 MB mp4 / 2.1 MB AV1, 7.0 s: vid-009 1.70–3.20, 3.25–5.25, 13.35–15.15 + vid-010 1.00–2.70 badge-cropped), `hero-p668` (1.1 MB each, native-height phone crop), `level1` (vid-010 32.88–36.44, 4:5, round 2.4), `level2` (vid-003 21.56–24.88, 4:3), `level3` (vid-002 8.86–12.50, 4:3). Centre crops keep the corner badges / watermark outside the frame. No stock, no atmosphere images.

## gaps

- No season, no daily schedule times: the page names neither (concept follows the light, not the clock).
- No verified footage of the lodge's own breaks: level clips illustrate the level, never captioned as "our wave".
- WhatsApp is the Israeli HQ mobile, phone the HQ line (`contact.phone`); the lodge's Google number is not on the business's own site and is not used.
- Freestylers has no engine dates: WhatsApp "Ask about dates" with a prefill naming the package.
- No Instagram posts harvested: six own photographs as tiles linking to `@globalsurf_kabalana`.
- Saturday list = the 29 Sep 2026 engine snapshot (1 female); past dates are dropped at runtime. No live engine call at 4e.
- Twin supplement is known only for one guest ($140.04 pp) and a couple ($80.03 pp); mixed groups are estimated at $140.04 pp and the engine shows the real figure. Labelled "Prices from the booking engine, 28 Sep 2026 (rooms 29 Sep 2026)".
- Rosa headline: own fixture `src/rosa-south-point.json` (Rosa live response, generated 2026-10-16 14:26 UTC), inlined; one lazy request to the same JSON refreshes it when the block nears; older than 24 h → no numbers, only "See today's forecast for South Point on Rosa". So the headline can never contradict the widget beside it.

## conflicts

None blocking.

1. **concepts.md timing vs the footage.** The concept puts vid-009's turquoise reef coast at ≈ 11.40–13.36 s; on the frames that stretch is the Buddha, the flag, the boat prow and the beach walk. The reef aerial is 13.35–15.15 s (frame sheet at 4 fps); that is what the edit uses.
2. **Header legibility vs "a soft local text-shadow is the only legibility aid".** The vid-009 rise and lodge shots carry a pale hazy sky exactly where the white logo and nav sit; text-shadow alone left them unreadable at 1440. A 110-px top gradient (ink at 34 % → 0) sits behind the header only, never behind the title. Alternative: a darker poster frame, which would lose the lodge.
3. **The drop's pixel budget.** img-062's pool is 200 source px wide, img-026's 1510; aligning them literally needs img-062 at 7.5× cover. Since round 2.3: img-062 is shown sharp only up to 1.55× cover; beyond that it is only the blurred surround of img-026 (lockstep, blur ∝ overscale). The upstream 3200 px original of img-026 is not in the dossier, so it is not used.
4. **`/book/` URL.** At 4e (one HTML file) the drawer pushes `#book` (back closes it, the link opens it); 4g gives it a real `/book/` page as the concept says. With JS off `#book` is the same form as an in-page section with per-level submit buttons.
5. **No GSAP (round 2.2), against the concept's "GSAP core + ScrollTrigger".** The critic counted the CDN script as a second third-party embed and measured CLS ≈ 1.0 from the pin; the experience critic measured a 2,220 px jump on slow 4G. A sticky stage with the page's own progress has none of the three and costs ~3 KB instead of ~45 KB at 4g. The motion is the concept's (same plates, same order, same 250 vh), so this is a means, not a different page.
6. **Hero poster vs the concept** ("poster = vid-009 ≈ 4.2 s, the lodge's roofs in the palms"). Both visual critics found the title unreadable on that frame and the laptop frame looking inland at the road. The poster is now vid-009 ≈ 3.05 s (the sea over the lodge roofs) and the loop starts there; the lodge-in-palms shot still plays second. A soft radial shade behind the title is added, beyond the concept's "text-shadow is the only legibility aid", because both critics asked for it.
7. **Hero button colour.** The hero button alone is `#084F6A` (deeper pool blue, as the visual critic proposed); every other booking button stays `#0B6A8E`. Same hue family, white text on both.

## other businesses in the run (hard constraint 5)

The run has one business. Against Global Surf v1 (gold, run 02): a different hero (the lodge from the air, not the pool deck or barrels), Literata + Parisienne (no v1 face), pool blue `#0B6A8E` booking colour instead of the sign's coral, a right-hand drawer instead of v1's three booking presentations, and the only page in either run that drops you from the sky into the pool. Against this run's calm and interactive variants (per `concepts.md`; their folders were not opened while being built): vid-009 aerial hero vs their vid-010 morning / vid-003 tuk-tuk heroes, asymmetric 7/5 level grid vs a portrait still row / snap reel, names-as-control room viewer vs stacked slideshows / mosaics.

## check results

- `tools/check-design.mjs` (round 2.4): **ok**, 0 problems, 0 warnings (h1 Literata, h2 Parisienne, ground #FFFFFF, 0 all-caps labels, 0/22 labelled headings).
- CLS over a full wheel scroll: 0.0055 desktop / 0 phone (was 1.03 / 1.25). Fonts: 83 KB (was 156 KB). Third-party scripts: none (GSAP gone); Rosa = the only embed.
- `tools/check-places.mjs global-surf-adventures-v2`: ok (0 borrowed images).
- First load before video (phone): poster 35 KB (desktop 81 KB), fonts from Google, page JS inline; plates after first scroll / levels in view / 2.5 s after load; Rosa JSON + iframe only near its block; no third-party request on load except Google Fonts (allowed at 4e).
