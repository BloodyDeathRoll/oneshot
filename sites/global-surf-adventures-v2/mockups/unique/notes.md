# Global Surf v2 · unique · "From the air" — 4e notes

designer 0.5.0 · run `2026-10-globalsurf-03` · 2026-10-17 · brief: `concepts.md` Concept 3 (scroll set-piece, pattern 9 "the drop").
Page: `dist/index.html` (one file, inline CSS/JS; Literata + Parisienne from Google Fonts; GSAP 3.13.0 + ScrollTrigger from jsdelivr, loaded only when the drop is 800 px away). Media: `src/make-media.sh` (`# media:` headers for `dist/img/**` and `dist/video/**`; `dist/video` is linked into the store by `tools/link-assets.sh`).
Old-site comparison: the live `https://www.globalsurf.com/` shot with `tools/shoot.mjs` into `/tmp/claude-1000/gs-v2-oldsite-unique` (not in the repo; the dossier has no `old-site-*.png`).

## look-log

**First screen, round 1** (file://, 1440 + 390). Wrong as design: the logo was clipped to its lower half (outer `viewBox` double-offset against the symbol's), and the white logo and nav sat on the poster's pale hazy sky, nearly unreadable at 1440. Change: fix the viewBox; give the header a soft local legibility gradient (top 110 px) plus a stronger local text-shadow, nav at 500. Against the old site (agency home: Maldives boat reel under "Tailor-Made Surf Trips Like Never Before", dark brown bar, salmon button, Messenger bubble): ours already wins on subject — the lodge's own roofs and pool in the palms — but not yet on polish while the header is illegible.

**First screen, round 2** (http, video playing). The header now reads on every shot of the edit; title (Literata 500, 50/36 px) and the one button sit centred. Wrong: on phones the hero was the 1728 master centre-cropped to 600 × 972 and upscaled to 780 device px, visibly soft. Change: a separate phone master cut from the native 1080-px source (668 × 1080), vid-010 shot scaled only 1.11×. Old site side by side: ours is clearly better — own coast and lodge, one title, one button, nothing covering it.

**First screen, round 3.** Phone hero is sharper; the poster (lodge roofs + the blue pool in the palms) frames the lodge below the button at 390 and around it at 1440. Remaining: the reef shot's top quarter is grey cloud — it is the business's own footage at real speed, so kept. Verdict next to the old site: clearly better at a glance — the old first screen sells another country, this one shows the lodge and the sea 40 m away.

**Whole page, round 1** (step 0.9, then 0.6). Wrong: (a) the Freestylers thumbnail and other `aspect-ratio` images stretched tall because their `height` attribute won over CSS (no `height:auto`); (b) the guests photo collapsed to ~160 px because the quote track's min-content width blew the 7fr column; (c) on phones the pinned drop sat at the top of the screen with white below (a later `display:block` overrode the column flex); (d) "The lodge" title appeared twice on phones (pin + section). Changes: `img{height:auto}`, `min-width:0` on grid children, mobile pin flex under `html.drop-live`, section h2 visually hidden on phones while the pin shows it.

**Whole page, round 2** (+ drawer, tiers, mid-scroll). The drop reads as one continuous descent at both widths: img-062 from the road → the lodge → img-026's pool and palm take over aligned on the same pool → into the water → img-005 at the water's edge with `featureLine`. Mid-scroll shots at 390 and 1440 looked at. Wrong and fixed: phone plate dots sat on top of the stage (moved to its foot, white); the 026→005 cross-fade lingered as a double exposure (shortened to 0.79–0.86); the drawer's total/continue scrolled away (now docked at the drawer foot); three stacked stepper cards on phones (now one card with three rows); the Freestylers option cramped at 390 (stacks); with JS off the transparent white header vanished on the white page (now absolute over the hero only); under reduced motion on phones the empty pin box showed (mobile flex rule leaked past the tier gate — now gated by `html.drop-live`). Reduced-motion (390, 1440) and no-JS (390, 1440) re-shot: the static two-up of img-062/img-026 + img-005 with `featureLine`. Overflow/overlap/unreadable text: none found in the last sheets. Against the old site: better on every section — prices on the first scroll (old site has none), real rooms with 5–6 photos each, the place explained from the air instead of a tractor and a 360° widget.

Booking tapped through at 390 and 1440: "Choose Level 2" → drawer opens on Level 2, focus on close, URL `#book`; couple +1, twin, Sat 20 Feb 2027 → hand-off `https://globalsurfadventures.bookinglayer.com/en/product/level-2-rollers?start=2027-02-20&end=2027-02-27&female=1&male=0&couple=1`; Esc closes and focus returns to "Choose Level 2". Engine base URL copied from the dossier `booking.engine_products`; WhatsApp `wa.me/972523593240` from `booking.whatsapp`.

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
| hero-poster-d/m | frame of the hero edit (vid-009) | business-owned |
| level1/2/3-poster | frames of vid-010 / vid-003 / vid-002 | business-owned |

Video (`dist/video`, store): `hero-d1728` (2.2 MB mp4 / 2.1 MB AV1, 7.0 s: vid-009 1.70–3.20, 3.25–5.25, 13.35–15.15 + vid-010 1.00–2.70 badge-cropped), `hero-p668` (1.1 MB each, native-height phone crop), `level1` (vid-010 19.72–24.16, 4:5), `level2` (vid-003 21.56–24.88, 4:3), `level3` (vid-002 8.86–12.50, 4:3). Centre crops keep the corner badges / watermark outside the frame. No stock, no atmosphere images.

## gaps

- No season, no daily schedule times: the page names neither (concept follows the light, not the clock).
- No verified footage of the lodge's own breaks: level clips illustrate the level, never captioned as "our wave".
- WhatsApp is the Israeli HQ mobile, phone the HQ line (`contact.phone`); the lodge's Google number is not on the business's own site and is not used.
- Freestylers has no engine dates: WhatsApp "Ask about dates" with a prefill naming the package.
- No Instagram posts harvested: six own photographs as tiles linking to `@globalsurf_kabalana`.
- Saturday list = the 29 Sep 2026 engine snapshot (1 female); past dates are dropped at runtime. No live engine call at 4e.
- Twin supplement is known only for one guest ($140.04 pp) and a couple ($80.03 pp); mixed groups are estimated at $140.04 pp and the engine shows the real figure. Labelled "Prices from the booking engine, 28 Sep 2026 (rooms 29 Sep 2026)".
- Rosa headline: the run-02 South Point fixture (`sites/global-surf-adventures/mockups/try-your-week/src/rosa-south-point.json`, generated 2026-09-29), shown with its own time "Tue 29 Sep, 20:30"; the widget beside it is live and lazy. Live headline at 4g.

## conflicts

None blocking.

1. **concepts.md timing vs the footage.** The concept puts vid-009's turquoise reef coast at ≈ 11.40–13.36 s; on the frames that stretch is the Buddha, the flag, the boat prow and the beach walk. The reef aerial is 13.35–15.15 s (frame sheet at 4 fps); that is what the edit uses.
2. **Header legibility vs "a soft local text-shadow is the only legibility aid".** The vid-009 rise and lodge shots carry a pale hazy sky exactly where the white logo and nav sit; text-shadow alone left them unreadable at 1440. A 110-px top gradient (ink at 34 % → 0) sits behind the header only, never behind the title. Alternative: a darker poster frame, which would lose the lodge.
3. **The drop's pixel budget.** img-062's pool is 200 source px wide, img-026's 1510; aligning them literally needs img-062 at 7.5× cover. Built instead: img-062 zooms to 3× cover (≤ 2.4 CSS px per source px at 1440) while img-026, feathered, takes over on the same pool and then grows faster to cover; img-062 is never fully exposed past ~2× native. Every resting frame is at or below native. Concept estimated ≈ 1.6× mid-motion; actual peak is higher for ~0.1 of the pin, only while img-026 covers the centre.
4. **`/book/` URL.** At 4e (one HTML file) the drawer pushes `#book` (back closes it, the link opens it); 4g gives it a real `/book/` page as the concept says. With JS off `#book` is the same form as an in-page section with per-level submit buttons.
5. **GSAP version.** 3.13.0 from jsdelivr (pinned) rather than the playbook's example 3.15.0; ScrollTrigger only, no Lenis, no three.js, as the concept says. At 4g: vendored ≈ 45 KB gz, inside 300 KB.

## other businesses in the run (hard constraint 5)

The run has one business. Against Global Surf v1 (gold, run 02): a different hero (the lodge from the air, not the pool deck or barrels), Literata + Parisienne (no v1 face), pool blue `#0B6A8E` booking colour instead of the sign's coral, a right-hand drawer instead of v1's three booking presentations, and the only page in either run that drops you from the sky into the pool. Against this run's calm and interactive variants (per `concepts.md`; their folders were not opened while being built): vid-009 aerial hero vs their vid-010 morning / vid-003 tuk-tuk heroes, asymmetric 7/5 level grid vs a portrait still row / snap reel, names-as-control room viewer vs stacked slideshows / mosaics.

## check results

- `tools/check-design.mjs` (unique): **ok** — light ground, no captions, no padded boxes, no sub-1200 px bleed; no default-look warnings (h1 Literata, h2 Parisienne, ground #FFFFFF, 0 all-caps labels).
- `tools/check-places.mjs global-surf-adventures-v2`: ok (0 borrowed images).
- First load before video (phone): poster 66 KB (desktop 188 KB), fonts from Google, page JS inline; GSAP and plates load only near the drop; Rosa iframe only near its block; no third-party request on load except Google Fonts (allowed at 4e).
