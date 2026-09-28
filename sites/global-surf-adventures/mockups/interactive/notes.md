# Global Surf Lodge Kabalana — mockup 2 · interactive · "Pick your water"

designer 0.4.1 · station 4e · run `2026-09-globalsurf-02` · 2026-09-28
Page: `dist/index.html` (one file, CSS + JS inline, Barlow + Barlow Condensed from Google Fonts). Photos resized into `dist/img/` (WebP), video renditions and posters copied unchanged into `dist/video/`.

## look-log

Every round was shot with `tools/shoot.mjs` into `shots/round-N/` and looked at beside `dossier/global-surf-adventures/assets/old-site-home-desktop-fold.png` and `old-site-lodge-desktop-fold.png` (the lodge page opens on a dark aerial of a tractor field with a breadcrumb and a centred serif headline; the home page on another destination's wave with "Tailor-Made Surf Trips Like Never Before").

**Round 1 — first screen only.** vid-009 plays full-bleed (the mobile shot caught the drone frame over the white roofs, so attach-after-paint works). What is wrong: the giant "Kabalana" at 23 vw only fills two-thirds of the width, centred, so it reads as a big title, not as a word laid over the picture; the name appears three times (mark, h1, word); on the phone the small type sits loose on the busy green drone frame. Against the old site it already wins at a glance — their lodge page opens on brown earth and a breadcrumb, this opens on their own sunlit pool deck — but the type is not yet doing its job.

**Round 2 — first screen.** Word set in a bottom-anchored band, copy moved into a 12-column row above it with a thin white rule; mark shortened to "Global Surf Lodge"; stronger scrim on the phone only. What is wrong: the fit-to-width script measured a block span (ratio 1), so the word came out *smaller*, a 340 px stub bottom-left; on the phone the proof line indented oddly. Not yet better than round 1.

**Round 3 — first screen.** Word span made inline-block, so it is now fitted to exactly the column width (≈ 34 vw) and cropped at the bottom edge over the pool; phone copy stacked in a flex column. This is the White Desert move done with the lodge's own frame: the word covers the pool and the daybeds read through its counters. Clearly better than the old site side by side: it names the place at picture size, shows what the lodge looks like in sun, gives the rating with count and date and one coral action — the old page shows none of the four.

**Round 4 — whole page.** Built everything below. Found: `featureLine` set in ink over the trees of img-016 was unreadable at both widths; the Rosa widget box painted solid white when the frame was blocked (file://), hiding the plain-link fallback; the lodge photo (6/12 at 4:5) was taller than the viewport; the mobile persistent bar lost its Book button off the bottom; the mobile level clip showed only golden sky (centre crop missed the surfer).

**Round 5 — whole page + a stage probe (`stage-sheet.png`).** Feature line moved onto the white ground above the photograph, large; iframe background transparent so the fallback shows until Rosa paints; lodge photo capped at viewport height; per-level focal points (`--fx`) so each clip's rider stays in frame on a 4:5 phone crop. The stage probe shows what the page is for: Fomies = golden-hour stand-up, Rollers = the reef wave from vid-003, Riders = the barrel/pool-drone cut from vid-002, price, inclusions and the level's own coral link changing with it. Still wrong: the page was 421 px wide on a phone (the 420 px widget box overflowed), which pushed the fixed bar half off-screen.

**Round 6 — whole page.** Forecast grid made `minmax(0,1fr)` and the widget box 100 % wide on phones: no horizontal overflow (scrollWidth 390). Mobile bar made a two-row grid (price + rating / level switch + Book). Still wrong: every section with its own vertical padding shorthand had lost the side gutter — text sat on the left edge at both widths.

**Round 7 — whole page.** Gutters restored (padding-block only). Reduced-motion and JS-off captured (`reduced-*.png`, `nojs-desktop-full.png`, combined in `reduced-nojs-sheet.png`): reduced motion = posters only, no pinning, zero video requests; JS off = the three levels stacked, each with its poster, details and its own link. Mobile swipe rows given `scroll-padding-inline` so the first panel keeps its gutter.

**Round 8 — whole page, served over http** so Rosa's widget renders (it refuses to be framed from file://). Poster `<img>` is the only still requested (the duplicate JPEG `poster=` attribute was dropped after the weight probe showed it double-loading); level clips are attached only 200 px before the stage. Last look for overflow, overlap and unreadable text: none found at 1440 or 390. Side by side with the old site: the first screen is their own film with the place's name as big as the picture, and the booking section is the lodge's own footage of each level with the week's price and a one-tap link to that level's product — the current site states no price anywhere and every book button loses the package (audit F1–F4). Not verified on a real phone or GPU.

**Round 9 — critic round 2 (visual-critic 6/10, experience-critic 8/10; reports/2026-09-globalsurf-02/global-surf-adventures.{visual,experience,}.md).** Rebuilt against their list, biggest first:
- **Hero.** Now vid-009e (the pool deck crossfading into a surfer on a reef wave, 8.7 s), replacing vid-009's seven-shot montage. One name only, "Global Surf Lodge Kabalana", is the h1 in the header at 20 px Barlow 500; the second, thin name block is gone. Tagline and "8.6/10 Booking.com · 80 reviews · 28 Sep 2026" sit on one row above a hairline, with the giant "Kabalana" as the only big type. The word is fitted in pure CSS: (container width − 2 gutters) / 2.93 em, measured from Barlow Condensed Light's ink box. So it no longer depends on JS; with JS off at 390 px its ink runs 16→374 px inside the column, no clipping (`shots/round-10/nojs-mobile-00.png`).
- **Fonts.** Barlow and Barlow Condensed are self-hosted as data URIs (Google Fonts is no longer used). Fallback faces use size-adjust and ascent/descent overrides measured against Liberation Sans and Liberation Sans Narrow (Arial metric clones). Measured CLS is 0.0000 on a throttled phone (1.6 Mbps, 150 ms RTT, 4× CPU) and on desktop; round 1 was 0.026 / 0.052.
- **Contrast.** The scrim is deeper at the foot. Every 0.4 s of the loop was scanned with the text hidden and the 75th-percentile background luminance measured behind each text box. Worst frame, white text: tagline 8.1:1 on phone, 6.4:1 at 1440, 5.6:1 at 1525 and at 1920. Rating line ≥ 14:1, name ≥ 4.8:1. Round 1 measured 2.4:1.
- **Level clips.** I re-cut them into `dist/video/` from the dossier renditions: `lv1` = vid-010, src 20–24.2 s (stand-up into the sun, silhouettes) + src 28–31 s (whitewater ride, the instructor cheering); `lv2` = vid-003, first 7 s of its cut (reef rides only, chalkboard and beach dropped); `lv3` = vid-002e (two barrels). Each clip ships as a desktop 1280 WebM/MP4 (1.2–1.8 MB) and a phone 4:5 crop at 480×600, centred on the rider (0.45–0.61 MB). That is a smaller rendition than the hero (1.9 MB phone / 3.6 MB desktop). Each clip's first frame shows water and a surfer (`shots/round-10/stage-sheet.png`).
- **Photo run.** The aqua half-band is removed. The run sits on the ground with its heading in a fixed left column on desktop; on the phone the heading sits above a swipe row that opens on a photograph.
- **Feature line.** The footwear line is back over the hair-flip photograph, in ink on the white wall (right of the spray on desktop, under the shade sail on phone).
- **Details.** The active level is ink with the aqua underline (the sky blue is gone). Mobile bar: "8.6/10 · 80 reviews / Booking.com, 28 Sep 2026". Every link and button measured ≥ 44 × 44 at both widths. Ground is now cool white `#F5F8FA` (hsl 204 33% 97%, from custom.md; was the concept's warm `#FFFDFC`). `img{height:auto}` fixes the "Getting here" aerial, which had drawn at its HTML height (two phone screens).
Round-9 sheets showed the day heading breaking into four lines in a 30 vw column, and the phone footwear line sitting on the black shade sail.

**Round 10.** The day heading column is widened to 34 vw with a smaller heading; the phone footwear line moved down onto the wall; nav links widened to 44 px. Against the old lodge page (`shots/round-10/vs-old-site.png`, their fold beside ours at both widths): theirs is a dark aerial of earth with a breadcrumb, a stamp over the headline and a Messenger bubble. Ours is their own pool and wave with the place's name at picture size, the rating with count and date, and one coral action. The booking section now plays real surfing on all three levels. It is clearly better at a glance. Not verified on a real phone or GPU.

**Round 11 — critic round 3 (visual 7, experience 9).** The orchestrator replaced vid-009e (pool → sunny reef surf, 6.8 s) and vid-002e (barrels only, 5.2 s, badge cropped).
- **Phone hero.** New portrait rendition `hero-p480` (480×1040, 0.97 MB webm). The crop pans from the pool (x 0.42) to the surfer (x 0.55) across the crossfade, so the pool reads first and then the rider. The poster is the same pool crop. On phones the tagline and rating now sit at the top under the name, and only the CTA and "Kabalana" stay at the foot, so nothing covers the surfer (he rides at ≈ 45–70 % height).
- **Level clips.** `lv3` is re-cut from the new vid-002e. `lv1` first opened on the stand-up but ran into kneeling and legs on sand; round 12 re-cut it to src 19.9–21.1 s (stand-up) + 28–31 s (whitewater ride, instructor cheering).
- **Hair-flip photo, phone.** Cropped on her face (x 47 %). The line is set in white over the pool with a gradient at the foot: 8.5:1 at p75.
- **Hair-flip photo, desktop.** The line stays on the wall, now near-black `#00120E`: 5.0:1 (p25) / 4.6:1 (p5) at 1440, 1525 and 1920 (ink green `#013C31` measured 3.3:1).
- **"Kabalana" edge.** The divisor is now 2.95 em and the band is clipped vertically only (`clip-path`), so the pointer drift can no longer trim the "a". Ink right edge measured inside the column at 390, 768, 1024, 1280, 1440, 1525 and 1920.
- **Fonts.** Subset through Google's `text=` to the page's characters, and the Condensed 400 face dropped: 4 faces at 88 KB → 3 at 45 KB. The HTML is 113 KB (63 KB gzipped).

**Correction to round 9's contrast numbers.** Those scans seeked the video on a server without HTTP range requests, so every "frame" was in fact the poster. Round 12 re-measured on real frames: every frame of the loop, extracted at 2.5 fps from the served renditions, composited behind the page. The first pass found the header name at 4.1–4.3:1 on the desktop surf frames, so the top gradient was deepened. Final worst frames, white text, p75: tagline ≥ 5.2:1, rating ≥ 4.8:1, name ≥ 5.1:1, nav ≥ 5.4:1 at 1024–1920; on the phone ≥ 7.2:1.

**Round 12 — final look.** `shots/round-12/vs-old-site.png` puts the old lodge fold beside ours at both widths, each on the pool poster and on a surf frame. `stage-sheet.png` shows the three levels at both widths: Fomies opens on the stand-up, Rollers on the reef ride, Riders in the barrel. Ours is clearly better at a glance: their own sunny pool, then a surfer, with the place's name as the one big word, the rating with count and date, and one coral action, against a dark earth aerial with a breadcrumb. Not checked on a real phone or GPU.

## images

All `business-owned` (dossier `images[].license`, `assets/index.json` for the edits).

| use | asset | source px | note |
|---|---|---|---|
| hero video + poster | vid-009e (orchestrator edit, round-3 version): d1920/m1280 webm+mp4 and poster copied unchanged; `hero-p480` phone portrait pan-crop (mine) + its poster crop | 1920×1080 | |
| Level 1 clip | `lv1-*`: my re-cut of the vid-010 d1920 rendition (src 19.9–21.1 s + 28–31 s); desktop 1280 WebM/MP4, phone 4:5 crop 480×600 | 1920×1080 | the crop removes the corner badge |
| Level 2 clip | `lv2-*`: vid-003 cut, first 7 s (reef rides) | 1920×1080 | the crop removes the corner badge |
| Level 3 clip | `lv3-*`: from vid-002e (orchestrator edit, barrels only, badge already cropped) | 1920×1080 | |
| feature, full-bleed | img-016 | 2000×1333 | footwear line set over its white wall |
| the day run (4:5) | img-118, img-104, img-011, img-001, img-111, img-023 | 2000×1333 | surf photos from an unidentified place, never named as the lodge's wave |
| lodge list (4:5) | img-015, img-063, img-064, img-005, img-075, img-077, img-059 | 2000×1333 (img-059 1125×2000) | |
| guests (3:2) | img-064, img-005, img-011 | 2000×1333 | |
| getting here | img-062 | 2000×1123 | |

## gaps

- No season (dossier `season` null): no season line on the page.
- No break type / bottom / level fit for The Rock and South Point: the spot block carries only the owner's sentence.
- No staff languages, no reply time: not shown.
- The only WhatsApp is the Israeli HQ mobile (+972 52 359 3240) and the phone is the HQ line: both used exactly as `bookingLinks[5]` / `contact.phone`, labelled as the number only.
- Google 4.7 has no review count: not shown.
- No verified footage of the lodge's own wave: surf clips illustrate a level, never "our wave".
- Rosa headline half is the live response of 2026-09-28 (generated 14:26 UTC) saved as `rosa-south-point.json` next to this file, labelled with its time ("South Point, at 20:30 on 28 Sep 2026") so it is not presented as current; the only checked-in fixture (`agents/designer/fixtures/rosa-kabalana.json`) is a different spot. 4g fetches it live.

## conflicts

- **Concept: Level 2 = still img-125 with a push-in.** Built with the vid-003 clip instead (the orchestrator said a cut now exists). The concept's own failure note asks for exactly this.
- **Concept: the Rosa fixture approach vs the mapped spot.** tools.md's fixture is Kabalana; concepts.md maps the lodge to `south-point`. I did not show Kabalana's numbers as South Point's; I saved one live South Point response inside this mockup folder and inlined it with its timestamp. Alternative (Kabalana fixture) would have been a different spot's data.
- **Mobile persistent bar during the stage.** The bar (fixed bottom) stays on the phone while the stage is in view, so the level switch appears twice there; they are synced. On desktop the bar hides while the stage is pinned.
- **Hero scrim.** custom.md says no decorative gradients; the hero carries a functional scrim at its foot (and a stronger one on phones) so the small white type stays AA-readable over the moving picture. No gradient anywhere else.

- **Ground (round 9).** The concept sampled `#FFFDFC`, a warm white. custom.md asks for cool whites, and the critic flagged it, so the ground is now `#F5F8FA`.
- **Level clips re-cut by the designer (round 9).** The coordinator asked for smaller renditions for the level clips and for phone crops on the rider. I made them in `dist/video/` from the dossier's own renditions (trim + crop + re-encode, no audio); the dossier itself is untouched. At 4g the publisher makes renditions from Payload uploads, so these files exist only in the mockup.
- **Hero scrim (round 9).** The scrim at the foot of the hero is deeper than in round 1. That was needed to hold AA on the brightest frame of the loop; see the look-log for the numbers.

## other businesses in this run

None (run has one business; `concepts.md` divergence table). Against the two sibling variants: this is the only one whose booking section is a pinned stage where the clip changes with the chosen level, the only one with the giant place word over the hero and the pinned horizontal day run.

## checks (run once, at the end of round 12)

- `node tools/check-design.mjs sites/global-surf-adventures/mockups/interactive/dist/index.html` → ok, 0 problems, 0 warnings (Barlow / Barlow Condensed, ground hsl(204 33% 97%), all-caps labels 0).
- `node tools/funnel.mjs sites/global-surf-adventures/mockups/interactive/dist/index.html --out …/interactive/funnel` → clicks_to_book 1, primary engine, CTA above the fold true, broken 0.
- Weight (headless over http, no scroll). First load without video: phone 212 KB (HTML with inline font subsets 113, hero poster 24, Level 1 poster 10, img-016 64 pulled by the lazy-load threshold); desktop 216 KB. Hero video after first paint: 0.92 MB phone (`hero-p480.webm`), 2.53 MB desktop (vid-009e d1920 webm). Level clip only within 200 px of the stage: 0.29 MB phone, 0.73 MB desktop; other levels only when chosen. Reduced motion: 0 video requests. CLS 0.0000 at both widths.
- LCP: 0.77 s on the throttled phone (1.6 Mbps, 150 ms RTT, 4× CPU); round 2 was 1.15 s.
