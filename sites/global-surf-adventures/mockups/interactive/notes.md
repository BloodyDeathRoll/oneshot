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

## images

All `business-owned` (dossier `images[].license` / `videos[].license`).

| use | asset | source px | note |
|---|---|---|---|
| hero video + poster | vid-009 cut (d1920/m1280 webm+mp4), vid-009-poster (avif, jpg fallback) | 1920×1080 | no watermark |
| Level 1 clip | vid-010 cut (m1280 webm+mp4 desktop, m720 mp4 phone) + poster | 1920×1080 | faint corner badge cropped out by the 7/12 and 4:5 frames |
| Level 2 clip | vid-003 (m1280 webm+mp4, m720 mp4) + poster | 1920×1080 | used instead of the still img-125 the concept named (a real cut now exists); corner badge cropped out as above |
| Level 3 clip | vid-002 cut + poster | 1920×1080 | corner badge cropped out as above |
| feature, full-bleed | img-016 | 2000×1333 | only full-bleed photograph; ≥ 1920 |
| the day run (4:5) | img-118, img-104, img-011, img-001, img-111, img-023 | 2000×1333 | surf photos are "unidentified place" — shown as the day, never named as the lodge's wave |
| lodge list (4:5) | img-015, img-063, img-064, img-005, img-075, img-077, img-059 | 2000×1333 (img-059 1125×2000) | |
| guests (3:2) | img-064, img-005, img-011 | 2000×1333 | the three things Fanny names |
| getting here | img-062 | 2000×1123 | drawn ≤ 820 px wide |

No stock, no generated imagery, no captions under photographs.

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

## other businesses in this run

None (run has one business; `concepts.md` divergence table). Against the two sibling variants: this is the only one whose booking section is a pinned stage where the clip changes with the chosen level, the only one with the giant place word over the hero and the pinned horizontal day run.

## checks (run once, at the end)

- `node tools/check-design.mjs sites/global-surf-adventures/mockups/interactive/dist/index.html` → ok, 0 problems, 0 warnings (fonts Barlow / Barlow Condensed, ground hsl(20 100% 99%), all-caps labels 0).
- `node tools/funnel.mjs sites/global-surf-adventures/mockups/interactive/dist/index.html --out …/interactive/funnel` → clicks_to_book 1, primary engine ("See the weekly surf packages and dates"), CTA above the fold true, broken 0.
- Weight (headless Chromium, served over http, no scroll, 8 s): first load without video 260 KB on 390×844 (HTML 53, poster AVIF 41, fonts 86, one level poster 16, img-016 64 fetched by Chrome's lazy threshold), 226 KB on 1440×900. Hero video after first paint: 1.47 MB (m1280 webm) phone, 2.9 MB (d1920 webm) desktop. Level clip, only when the stage is within 200 px: 1.8 MB (m720 mp4) phone, 1.9 MB (m1280 webm) desktop; other levels only on selection. Reduced motion: 0 video requests.
- Booking links copied from `copy/en.json` `bookingLinks[]` character for character; not tapped through to the live engine from a phone.
