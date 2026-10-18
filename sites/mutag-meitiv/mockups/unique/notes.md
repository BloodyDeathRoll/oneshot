# notes.md — mutag-meitiv · series 2 · unique «על הבמה» (On stage) · station 4e

Designer 0.5.2 · run 2026-10-il-brand-01 · 2026-10-18 · Hebrew only, `lang="he" dir="rtl"`.

Files: `dist/index.html` (one self-contained page: CSS, JS and the four font subsets inlined) ·
`dist/img/*.webp`, `dist/video/s2u-*.{webm,mp4}`, `dist/fonts/*.woff2`, all written by `src/make-media.sh`
(`# media:` header) · the page is built by `src/build.py` (+ `src/sections.py`, `src/style.css`, `src/app.js`)
from `copy/he.json`; every business word is read from he.json verbatim (the series-2 lines from
`mockup_extras.series2_organisations`). Rebuild: `bash src/make-media.sh && python3 src/build.py`
(`PART=hero` builds the first screen only, as used in the first look rounds).

Interface labels written in the template (no copy field): "כתבו להדס בוואטסאפ" / "כתבו להדס", "לפרטים",
"תוכניות קודמות", "לפוסט באינסטגרם", "גם לבעלי עסקים ולאנשי מקצוע", "סדנאות פתוחות", "מקרה בוחן", "דוגמה",
"קראו את המקרה", "מקרה בוחן לדוגמה, לא פרויקט אמיתי.", "קראו עוד", "באינסטגרם", "מהבלוג", "לבלוג המלא",
"לקביעת שיחה ביומן", "ניווט", "הצהרת נגישות", "טוען את המצגת…", unit/VAT words, the price-capture line
"המחירים כפי שפורסמו באתר הנוכחי, 18.10.2026", the menu label "לארגונים" / "אודות".

## look-log

Old site beside every round: `dossier/mutag-meitiv/assets/old-site-desktop.png` / `old-site-mobile.png`
(a boxed green panel in a 950 px column, a small circle photo, four unexplained badges, 14 px text, a
"פה יוצרים קשר" form link as the only labelled action).

**First screen, round 1** (header + stage only). img-011 full-bleed at 1440 with the title strips at the
true centre. Wrong as design: (1) centred, the strips sat on top of her own slide's words ("BRANDS OF
CHANGE / להיות מותג חברתי…"), so both texts were half-readable and the frame looked accidental; (2) a
centred cover crop cut Hadas off the right edge, so the stage lost its speaker; (3) the header's white nav
and wordmark sat on top of the screen's white m-icon, which touches the top edge of the frame — at 390 too.
Against the old site it already won on scale and drama, but the collisions made it look unfinished.
Change: start the photo under the header, shift the crop toward Hadas, move the title off the slide text.

**First screen, round 2.** The photo now begins under an 88 px header whose ground is the room's own dark
(`#0B1D1F`, sampled from the top row of img-011, so there is no seam); object-position 84 % keeps the whole
slide ("BRANDS OF CHANGE" through "ועסקי") and Hadas at the right edge in frame at 1440 × 900; the title
strips + button sit centred horizontally on the screen's empty lower half (the ghost "CHANGE" area). Phone:
4:5 crop around the icon, strips over the photo's lower edge, the button below on the room dark. Wrong
still: on the phone the Hebrew slide line was clipped at the right; the method's head repeated the big
m-icon right under the hero; the pinned slides' grid pushed title and body far below the label (rows
stretched to the photo's height) and the Latin label aligned left. Better than the old site at a glance:
yes — her talk, her icon and her stage, a heading for nonprofits and organisations, one WhatsApp button.

**First screen, round 3.** Phone crop widened to 818 × 1023 source px so the whole Hebrew line fits; the
stacked tier's method icon down to 72 px; desktop slides rebuilt as two columns (text | 420 px 4:5 photo,
vertically centred) with the label at 72 px Secular One aligned to the start (right); title 30 px, body
19 px; h1 38 px. Mid-scroll shots (zoom, logo slide, THINKING, MAKING, INFLUENCING) looked at 1440.
Wrong: on phone the stage label floated top-right and the title dropped to the bottom of the photo cell,
leaving holes (INFLUENCING). Change: phone grid rows auto/1fr so label and title stack at the top.

**First screen, round 4.** Phone stages now read label → title beside the photo, body below; nothing
else changed above the fold. Kept. Side by side with the old site: the old first screen is a cramped boxed
panel; this one is the Brand Manager Day 2024 stage with her own icon on the screen, the organisations
h1 on solid strips (the device of her Instagram cards) and one green WhatsApp button. Clearly better.

**Whole page, round 1.** Built every section. The sheets showed: the phone page at 14,466 px (over the
13k cap) — the four stage bodies, a 2-column team grid of 4:5 faces and a full-width 3:4 intro photo were
the bulk; the ₪ sign in Secular One read like "ש"; the first-load on phone pulled every stage photo because
the set-piece's arming code forced `loading=eager` on all widths; the two videos' `poster` attributes
fetched both posters on load; the zoom left one frame of empty green between the stage photo and the logo
slide. Fixed: stage bodies show their first paragraph on phone with "קראו עוד" (all text with JS off),
team is a swipe row (founder 62 %, others 46 %) on phone, intro photo 1:1 on phone, phone section padding
60 px → **12,901 px**; ₪ set in Heebo; arming only on the pinned tier; posters only as `<img>` under the
video; screen fade 0.25–0.6 vh and logo slide 0.55–0.8 vh so the green never sits empty.

**Whole page, round 2** (last). Looked at the final sheets at 1440 and 390 for overflow, overlap and
unreadable text: none (scrollWidth = viewport). Gaps between demo case and team trimmed on desktop.
Reduced motion (1440): stacked layout, static hero, all four stages with photos, complete page. JS off:
same stacked page, all links work, posters instead of clips. Against the old site's whole page: the old
page is one 950 px green Wix column of identical boxes; this one goes stage → her talk as four slides →
a programme of what organisations book, each with its own WhatsApp message → the intro on deep green beside
Hadas → three past programmes with their posts → the award in the judges' words → the bodies she is
grateful to → voices → the owners' offers (nothing removed) → the designed demo case → team → podcast and
blog → Instagram → closing. Clearly better on the first screen and the whole page.

**Round after 4f round 1** (visual 7, experience 7, critic 72.6/80; coordinator's fix list + the critic's
five fixes). What the critics' frames showed and what changed, biggest first:
- *Hero: two headlines.* The slide's own Hebrew line sat right above the h1. Now the photo sits in a frame box
  with the photograph's own proportions (2000 × 1023), covering the viewport under the header and anchored
  at its end. The h1's first strip (Secular One at 3.55 cqw, ≈ 56 px at 1440) lies exactly on the slide's
  Hebrew line and covers it, so the screen carries one headline. The icon, "BRANDS OF CHANGE" and Hadas stay
  whole at 1440 × 900. The hero is re-encoded at q90 (2000 px, 169 KB; 1440 px, 61 KB), and the html ground is
  the room dark, so no white shows before the page streams in. Phone: a 4:5 crop of the stage's end
  (x 1182–2000): Hadas on the lit stage, no slide text cut. The strips and the button sit under it, not on it,
  and the alt no longer names Brand Manager Day 2024 (img-011's dossier entry does not record the event).
- *Intro portrait cut through the face.* img-034 is recropped 3:4 around her (fx .46): the whole face, the
  canvas edge beside her. 1:1 on phone.
- *Set-piece: murky and long, slides top-heavy.* The zoom now reaches 1.25× in 0.6 vh, before any green. The
  green comes fast (0.55–0.73 vh), the logo slide at 0.68–0.83, and SENSING arrives at 1.05 vh. Each stage
  takes 0.45 vh; the run is 385 vh (2,565 px of pinned scroll at 900, was 3,150). Each slide is now text
  centred vertically in the start half (title 40 px) with its photo filling the end half edge to edge, full
  height. MAKING is the client's table photo (img-c03) with the vid-004 clip as a 300 px tile on it, so the
  clip is no longer stretched. INFLUENCING is img-ig-01 (Hadas on stage, 4:5), half the viewport and
  full height: the person-led big photo the page lacked. "ובת-קיימא" no longer breaks (nowrap span).
- *Programme rows:* the fading bands are gone, and rows are separated by space. The section button sits under the
  rows at the start, 40 px below, with the capture line.
- *Phone:* no m-icon at the head of the method (one icon on the first screen: the header's).
- *Critic fixes:* the phone-menu WhatsApp label is `#173B34` (was white on `#35C68B`, 2.19:1); the header disc
  has `aria-label="כתבו להדס בוואטסאפ"`; the phone bar is `inert` while hidden (checked: Tab order skip →
  brand → header disc → menu → hero button; bar reachable once shown).
- *Photos moved:* the 2024 past-programme card is now img-033 (Brand Manager Day 2024, 1:1), since ig-01 is
  the INFLUENCING slide. Each photograph still appears once.
Looked at the sheets at 1440 and 390 and the mid-scroll frames at 0.5 / 0.67 / 0.87 / 2.8 vh, reduced motion
and JS off: no overflow, overlap or empty band. Against the old site: the first screen now shows her stage,
her icon, one headline and her face; the old one is a boxed panel with a circle crop. Clearly better.

## the set-piece «into the screen» (zoom-through)

Pinned tier only (`html.pinned`, set by an inline `<head>` script before first paint: ≥ 900 × 560 px,
no reduced motion, no Save-Data). The stage section is `450vh` in CSS from first paint, its viewport
`position: sticky`, so nothing moves when the motion takes over. Native scroll, one rAF-throttled handler
writing `transform` / `opacity` only; no GSAP, Lenis or three.js (the concept rules them out), JS ≈ 7 KB.
(Round 2 timings.) Height 385vh. 0–0.3 vh: the strips and button leave (−40 px, fade). 0–0.6 vh: img-011 scales 1 → 1.25 (cap) around the icon
(36 % / 16 % of its own frame; at 4g from media `focalX/Y`). 0.55–0.73 vh: the `#0A5150` screen fills the room; 0.68–0.83 vh:
the logo slide (m-icon, method name, intro). From 1.05 vh: SENSING, THINKING, MAKING (img-c03 + the vid-004 tile, plays only
while its slide is on), INFLUENCING, 0.45 vh each, text in the start half and the photo filling the end half, 400 ms cross-fades; four dots at the start side (44 px
buttons) jump to each stage. Loading state: "טוען את המצגת…" under the hero until img-011 and every slide
photo have decoded; only then does the handler arm. Phone, reduced motion, Save-Data, JS off: no pin, no
zoom — hero, then the green method section with four stacked stage blocks (4:5 photo beside label + title,
body below). No WebGL anywhere.

## measured

`tools/audit-mockup.mjs` (scratchpad copy reading `he.json`, port 9751 — see conflicts), phone throttled:
round 2: first load 493 KB (HTML 193 KB incl. the inlined fonts; images 312 KB; the largest image 72 KB), JS 0 external
(inline ≈ 7.5 KB), LCP 996 ms, CLS 0, scroll CLS early 0 / settled 0, third-party hosts on load 0,
noJS booking links in `#book` 2, images without alt 0, tap targets under 44 px 0.
Page height: phone 12,957 px, desktop 13,004 px (2,565 px of it the pinned run at 900).
Video after first paint, near the viewport only: `s2u-table-464.webm` 1.03 MB (mp4 1.29 MB),
`s2u-leaves-560.webm` 1.32 MB (mp4 1.42 MB) — both under the 2 MB phone cap.
`check-design` (scratchpad copy, port 9741): **fails by decision only** — 15 "dark ground behind text"
lines (stage, hero, screen, intro, award, demo-case card on phone, closing, footer); brief 6 wins, house
rule 1 is surf-only (run default). No caption, padded-box or upscale problem; 0 default-look warnings
(h1/h2 Secular One, body Heebo, white ground). `check-places`: ok (no borrowed images).

## booking

18 links, all `https://wa.me/972546686808?text=…` (`contact.whatsapp` +972546686808, copied). Header,
hero, phone bar, programme footer, closing and footer carry `path.ctaText` ("היי הדס, אני פונה בשם ארגון…");
each programme row and each owners' offer carries its service's own `ctaText`. Calendly
(`bookingLinks[0]`, `https://calendly.com/hadas/30min`) once, in the closing, labelled "לקביעת שיחה ביומן"
so the free Zoom call is named only once on that screen (N9: by `closing`). `tel:+972546686808`,
`mailto:hadas@kapara.com`. Phone bar appears once the hero button has scrolled away; the header WhatsApp
disc hides while it shows (L9). Tapped through at 390: hero button → `…text=היי הדס, אני פונה בשם ארגון.
אשמח לדבר על מה שיכול להתאים לנו.`; "הדרכות צוות" row → the retreat's own line. Plain links, JS off too.

## images

All business-owned unless stated; every file made by `src/make-media.sh`.

| file | dossier id | use |
|---|---|---|
| hero-2000 / hero-1440 | img-011 (2000×1023), q90 | hero + set-piece, full-bleed at 1440 (source ≥ 1920) |
| hero-m-800 | img-011, 4:5 crop of the stage's end (Hadas) | phone hero |
| st-{sensing,thinking,making,influencing}-{1000,600} | img-003 / img-012 / img-c03 (client photo-03) / img-ig-01 | stage slides, 4:5 |
| s2u-table-464.{webm,mp4} + s2u-table-poster | vid-004 3.4–14.4 s, 464×580 native | tile on the MAKING slide |
| s2u-leaves-560.{webm,mp4} + s2u-leaves-poster | vid-002 44–56 s, 4:5 | owners' block tile (hands only) |
| intro-hadas-900 | img-034, 3:4 around her face (1:1 on phone) | intro beside the text |
| prog-2024 / prog-kfarblum / prog-festival | img-033 (1:1, the BMD 2024 wall) / img-ig-04 / img-ig-05 | past programmes, each linked 1:1 to its post (D3) |
| award-seal, btc-seal | img-040, img-041 — third-party marks, "unknown"; shown as on the client's site (run default) | award block, credential |
| logo-044 … logo-058 | img-044 … 058 — client logos, "unknown"; one white ink on transparent (recipe), never redrawn | logo grid, under "מודה על הזכות להטיב ב:" only (D2) |
| team-hadas / tamar / yael / dana / lior | img-010 / 036 / 037 / 038 / 039 | team row, 4:5 |
| ig-03, ig-08, ig-02, ig-11, ig-12, ig-10 | img-ig-* | Instagram strip, square |
| podcast | `dossier.podcast.cover_image_url` (the show's own artwork, fetched by the recipe) | podcast block |
| icon-white, wordmark-white | logo-icon, logo-wordmark (the client's white PNGs) | header, logo slide, demo cover, closing, footer |

Not used: img-013 and img-c06 (selfies), img-015 (stock), img-022/023/029 (unknown), img-ig-06,
img-ig-07 (prints an older workshop price, 445 ש"ח, beside THE BETTER 4's 480 ₪), img-ig-09 (cover of the
vid-002 clip already on the page), img-001, blog covers (remote Wix URLs; posts shown as text rows).

## gaps

- **Demo case study:** no images. A designed deep-green cover (m-icon, client | sector, title, the four
  stage chips, "דוגמה" badge) opens in place to the full demo, flagged "מקרה בוחן לדוגמה, לא פרויקט אמיתי.".
  No hatched placeholders on the home page; `/work/template` is a 4g page.
- **No organisation testimonial** (all eight are individuals): the judges' quote leads the proof; 3 quotes in
  the slideshow (אנווה רצון, Julia Dojas, יובל אברהם), none labelled as an organisation's.
- **No newsletter form** (`newsletter.url` null) and **no rating** (none exists).
- **Service pages** are 4g: "לפרטים" opens the current site's /process, /סדנאות-והרצאות, /personal101.
- **Prices:** shown only where published (retreat 580 ₪ למשתתף/ת + מע״מ, BTC 5,200 ₪ + מע״מ, the owners'
  offers as in he.json; intro workshop "ללא תשלום"; business-to-brand "ההרשמה נסגרה"), with the capture line.
- **N1:** programme rows show `path.body` (the description) and, for the talk and the retreat only,
  `format` | `audience`; the strategic-planning and BTC `audience` lines (which repeat their body) are left out.
- **D1:** the award line (`proof.award`) appears once, in the award block; Dana Russo's bio (which also names
  it) is behind "קראו עוד" in the team section, four sections away.

## conflicts

None blocking. Deviations from `concepts.md`, each made to avoid a visible weakness:

1. **Hero title not at the vertical centre** (round 2): its first strip lies on the slide's own Hebrew line and
   covers it, so there is one headline; the strips are larger (≈ 56 px at 1440) than the concept's 40 px.
   Phone: the copy sits under the photo, not on it.
2. **The photo starts under the header** (88 px desktop, 78 phone, on the room's own dark): the screen's icon
   touches the frame's top edge. Phone hero is the stage's end with Hadas, not the icon (the critics asked for a person).
3. **Photo moves.** Intro: img-034, not img-033 (img-033 now the 2024 programme card; calm S2's hero is img-033 too).
   INFLUENCING: img-ig-01, not img-033 (the person-led big moment). MAKING: img-c03 + the vid-004 tile, so the
   464-px clip is not stretched to half the screen. Founder card img-010. Each photograph appears once.
4. **Stage bodies on phone** show their first paragraph with "קראו עוד" (phone length cap); all text with JS
   off and on desktop.
5. **Programme row titles** are each `path.body` paragraph's own opening name (text before the colon); the
   fourth paragraph has no colon, so it is split after its opening words "השתלמות מקצועית לאנשי מקצוע" (the
   service title) — same words, same order.
6. **BTC credential added** to the intro (seal + `credentials[0]`, linked): direction must-do 11 lists it as
   proof; the concept's unique structure did not place it.
7. **Dark grounds vs `check-design`:** by decision (brief 6), as series 1.
8. **Tooling, not the page:** `tools/audit-mockup.mjs` hard-codes `copy/en.json` and port 8980, and
   `tools/check-design.mjs` port 8960; both were run as unmodified-logic copies in my scratchpad
   (`he.json`, ports 9751 / 9741). `dist/video` is a real folder here, not yet linked to the asset store:
   `tools/link-assets.sh mutag-meitiv` would link it to `<store>/mutag-meitiv/mockups/unique/video`, the same
   store folder series-1 unique's `dist/video` already points at; the clips are named `s2u-*` so nothing
   collides, but the two "unique" folders would share one store folder.

## other mockups in this run (hard constraint 5)

Series 2 calm opens on **img-033 full-bleed** (Hadas at the yellow Brand Manager Day wall) over a deep-green
title band; series 2 interactive opens on **img-ig-01** with a white booking card of four format chips. This
one opens on the **dark stage itself (img-011)**, her icon on the conference screen, the h1 on solid strips,
and walks *into* that screen as her talk's four slides — the only pinned motion of the six; Secular One +
Heebo, `#35C68B` accent, a programme-schedule list instead of a list of cards or tabs. Series 1 (calm green
split with img-013, interactive four rings with img-001, the dropped heart board) share none of these devices.
Shared on purpose: copy, offers, prices, WhatsApp path. Shared photo: img-033 is calm-S2's hero and here the 2024
past-programme card (a 1:1 thumbnail, mid-page).
