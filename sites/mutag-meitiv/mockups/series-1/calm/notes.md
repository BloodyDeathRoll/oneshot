# notes.md — mutag-meitiv · calm "ירוק בית" (station 4e)

Designer 0.5.2 · run 2026-10-il-brand-01 · 2026-10-18 · Hebrew only, `lang="he" dir="rtl"`.

Files: `dist/index.html` (one self-contained page, CSS + JS inline, Heebo from Google Fonts),
`dist/img/**` and `dist/video/**` made by `src/make-media.sh` (`# media:` header), the page made by
`src/build.py` from `copy/he.json` + `src/page.css` + `src/page.js`. Rebuild: `src/make-media.sh && python3 src/build.py`.
Every business word on the page is read from `he.json` by the build; only interface labels
(e.g. "לפרטים", "מבנה", "למי", "מקרה בוחן", "מאמרים אחרונים", the Instagram heading and line, the
WhatsApp default line) are written in `build.py`.

## look-log

**First screen, round 1** (1440 + 390). The green split hero worked at once: same green as the
current site, Hadas large in a 4:5 crop with the icon-curve corner, one mint WhatsApp button. Wrong
as design: the faint icon behind the text was so large and low that its "for the Better" letters
read as ghost text under the hero; the tagline broke after "עם" on desktop (a 28ch cap), leaving an
orphan. Against `old-site-desktop.png` (boxed green panel in a 950 px column, small circle photo,
four badges, no labelled action) it already wins at a glance. Change: move and shrink the curve,
widen the tagline.

**First screen, round 2.** Curve moved up and right; tagline on one line; title enlarged to 68 px.
Wrong: the bigger title now broke "מיטיב!" onto its own line, and the bottom edge of the mark still
showed the start of "for". Still clearly better than the old site. Change: title back to 62 px (one
line), anchor the mark lower so only the bowls of the "m" show.

**First screen, round 3.** Title on one line, tagline on one line, button aligned under them; only
the two curves of the heart-m show, faint, behind the text: the current site's device, done
quietly. Phone: wordmark + menu, photo, title, tagline and a full-width button all inside 844 px.
Side by side with the old site: same brand, recognisably hers, but sharper photo at 3× the size,
readable 19–24 px type, one clear action instead of four unexplained seals. Kept.

**Whole page, round 1.** Found: (1) the floating pill header shrank to its content (1003 px on
desktop, 150 px on phone, the menu button jammed against the icon); (2) testimonial cards stretched
to the tallest quote, leaving a big empty white card under Yuval's one-liner; (3) team bios in two
120 px columns on the phone ran ~40 lines each; (4) proof labels wrapped awkwardly. Fixed: pill
width set explicitly; slides sized to their own content; phone team cards became photo + name/role
beside each other with the bio below in one column; proof items widened.

**Whole page, round 2** (after `audit-mockup`). Found: early-scroll CLS 0.43 — the phone painted the
hero text before the photo had streamed in (photo was after the text in the DOM), the hero mark was
anchored to the bottom so it moved with the hero's height, and the Heebo swap re-wrapped the
tagline (its `ch` cap changes with the font). Fixed: photo first in the DOM and placed by grid
column on desktop, the mark anchored to the top and clipped to its upper half, a size-adjusted
`Heebo Fallback` (Noto Sans Hebrew / Arial), tagline cap in px. Early CLS now 0.0009, settled 0.
Also fixed: 10 tap targets under 44 px (quote toggles, header and footer links); dot buttons shown
with JS off (`[hidden]` overridden by `display:flex`). Last sheets checked for overflow, overlap and
unreadable text at 1440 and 390: none found. Compared again with the old site's whole page: the
same sections in the same order (cards, motto, podcast, team, blog, logos, footer), with the
clutter, underlines, salmon excerpts and the purple button gone, and the method, prices, demo case
study, testimonials and Instagram added. Clearly better.

**Round after 4f round 1** (visual 7, experience 7, critic 72.5/80; coordinator's fix list; the
dark-green decision: brief 6 wins, the dark greens stay). What the critics' sheets showed and what changed:
- *Card monotony and length.* The 9 offer cards with 9 full-width mint bars became two compact
  grouped lists (title, format, `audience` clamped to 2 lines, price/status, a round 46 px WhatsApp
  button per row carrying that offer's `ctaText`), workshops 3 rows + "הצג את כל 6" (all 9 rows
  shown with JS off); courses moved into the same column, under it. Team: faces + name + role,
  bios open on tap ("קראו עוד"); founder card bio clamped to 3 lines. Brand & Breakfast quotes
  (איה, קרן) moved into the slider (6 slides: יובל, Linda friedrich, איה, רננה, AMBARTIQUE@לינדה,
  קרן; the two Linda quotes never adjacent).
- *Large media mid-page.* A full-bleed band of img-007 (overhead vision-map table, 1600 px source,
  3:1) between the method and the workshops. vid-004 now sits on a large photo (img-030, 4:5,
  ~440 px) as an overlapping 232 px tile, sticky beside the workshops/courses lists on desktop,
  centred above them on phone.
- *The method as the set-piece.* A sticky 4:5 frame (the icon-curve corner) cross-fades between
  four stage photos (img-006 ring canvas, img-032 the cards, img-c03 the collage table, img-ig-01
  on stage) while a numbered list of the four stages scrolls beside it; the stage in the middle of
  the screen lights (mint number, full opacity, others at 42 %). Native scroll, IntersectionObserver,
  300–450 ms fades. Phone: each stage shows its own photo inline, all lit. Reduced motion / JS off:
  all stages lit, first photo.
- *Fonts.* Heebo (Hebrew + Latin variable subsets, 300–600) self-hosted and inlined in the page;
  no third-party request, no blank first paint (LCP 1.09 s, was 2.15 s).
- *Hero.* img-013 (Hadas looking into the lens, green shirt, 1728 px) replaces img-034; the ghost
  "m" behind the text is gone. img-034 moved to the founder card (img-001 has a baked-in dark band).
- *Lower half.* Blog cards carry covers: 2026-05-28 fetched from her Wix account by the recipe; the
  2026-04-22 (Unsplash via Wix) and 2026-08-22 (a portrait of Marina Abramović, photographer not
  stated, so not business-owned — coordinator) cards are green tiles with the icon. Podcast
  band carries the show's artwork. Case study: a green text tile with the mint "דוגמה" badge, no
  hatched placeholder on the home page (the frames remain only inside the opened example).
- *Small defects.* Slider edge shadows gone (viewport clips, cards flat); quote marks inside the
  card, Hebrew ״; entry cards arrow-free and now deep green (the current site's bolder four blocks);
  motto gap tightened; the all-caps English slogan set in sentence case by CSS (words unchanged);
  stage labels 15 px, light tracking. The pill-header halo did not reproduce in my sheets (no
  background on `.hdr`; the pill shadow is the only effect).
Sheets checked at 1440 and 390: no overlap, overflow or unreadable text; sticky pair and method
frame never cover text. Page length: 13.1k px desktop / 16.1k phone (was 13.6k / 18.8k) — shorter
and far less dense per screen, but **not under the 10k the visual critic aimed for**; the rest is the
content the brief keeps (method, 9 offers, 6 quotes, 15 logos, 5 people, podcast, blog, Instagram).
Against the current site: better at a glance on the first screen and through the whole page; the
two regressions the critics named (blog covers, podcast artwork) are restored.

Reduced motion: no reveals, no clip (poster stays), method fully lit, instant slider. JS off: all
content visible (all 9 offer rows, every bio), testimonials as a swipeable strip, method "קראו עוד"
and the demo case study still open (`<details>`), mobile menu opens (`<details>`), clip shows its
poster. No WebGL.

## images

| file in dist/img | source | license | use |
|---|---|---|---|
| img-013-hero-1000/720 | img-013 (1728×2000) | business-owned | hero, 4:5, icon-curve corner |
| img-003-1200/720, img-012-1200/720 | img-003, img-012 | business-owned | lead service blocks, 4:3 |
| img-006/032/c03/ig-01-stage | img-006, img-032, img-c03 (client), img-ig-01 | business-owned | method frame + phone stage photos, 4:5 |
| img-007-band-1600/900 | img-007 (1600×756) | business-owned | full-bleed band, 3:1 (source ≥ 1200 px) |
| img-030-pair | img-030 (1200×1600) | business-owned | workshops photo under the clip, 4:5 |
| img-c05-1600/800 | img-c05 (client) | business-owned | closing, 3:1 desktop / 4:3 phone |
| img-034-founder | img-034 (2000×1190) | business-owned | founder card, 4:5 |
| img-036/037/038/039-team | img-036…039 | business-owned | team, 4:5 |
| img-ig-03/01/02/09/08/11 | img-ig-* | business-owned | Instagram strip (img-ig-06 skipped) |
| post-2026-05-28 | `dossier.blog.posts[].cover_image_url`, Wix media of the site account 5b80b1, fetched by the recipe | business account's own upload | blog cover, 3:2 |
| podcast-art | `dossier.podcast.cover_image_url` | the show's own artwork | podcast band, 1:1 |
| vid-004-poster | vid-004, first frame of the cut | business-owned | clip poster |
| logo-icon, logo-icon-mask, logo-wordmark | logo-icon, logo-wordmark | business-owned | header, footer, bar, blog tile (white PNG, recoloured only by CSS mask) |
| img-040-award, img-041-btc, img-044…058-logo | third-party marks | unknown | proof strip and client logos, shown as on the current site (run default) |

Fonts: `dist/fonts/heebo-{hebrew,latin}.woff2` (Heebo, OFL, from Google Fonts' own subsets, by the
recipe), inlined into the page by `build.py`. Video: `dist/video/table-464.webm` (0.99 MB) then
`.mp4` (1.41 MB), vid-004 cut 2–14 s, native 464×580, no audio, attached only after load and near
the viewport, never under reduced motion or Save-Data.

Not used: img-015 (stock), img-022/023/029 (unknown), img-ig-06, img-001 (baked-in band), the
2026-04-22 blog cover (Unsplash via Wix), the 2026-08-22 blog cover (Abramović portrait, photographer not stated), vid-001/002/003, the screenshots.

## gaps

- **No service pages in a 4e mockup.** "לפרטים" opens the current site's `/personal101` and `/process`.
- **Demo case study:** no images. Green tile labelled "דוגמה"; opened, it shows the full layout with
  "זהו מקרה בוחן לדוגמה…", challenge, labelled frames "תמונה לדוגמה · לפני / · אחרי", 4 stages,
  outcome, quote, credits.
- **No newsletter form** (`newsletter.url` null; the experience critic asked for it — not added).
  **No rating** (none exists).
- **Prices:** ₪, `+ מע״מ` where `vat: excluded`, "למשתתף/ת" for `per_person` (the critic notes
  Brand & Breakfast's per-person unit is the harvester's reading, `sources.md` line 127 — to confirm
  with the client), capture line 18.10.2026. Intro workshop "ללא תשלום"; `business-to-brand` "ההרשמה
  נסגרה" + "עדכנו אותי בוואטסאפ".
- **N1:** rows show `audience` only. **N9:** the free Zoom call is offered once (closing); the courses
  intro paragraph mentioning it is far up the page.
- Testimonials: 8 of 8, never translated, `lang`/`dir` per quote; long ones clamped with "לקריאת הכל".

## conflicts

1. **Resolved — dark greens.** Coordinator, after 4f round 1: house rule 1 is scoped to surf; brief 6
   wins. `check-design` therefore still reports dark grounds behind text, now four: `section.hero`,
   `section.air`, `footer.ftr` and, at 390 px only, `details.case-card` (the green case-study tile
   asked for in the fix list). No other check-design problem; no default-look warning.
2. **Hero photo shared with unique.** img-013 is also a cut-out piece inside unique's heart board.
   Calm uses it as the large 4:5 hero portrait; the first screens still read as different objects
   (green split band vs white heart collage), but the human may want them to differ in photo too.
   The only other lens-facing, sharp Hadas portraits are img-001 (713 px, baked-in band) and img-010
   (1200×778, a different setting).
3. **Header order** (wordmark right, button left), as before.
4. **`tools/audit-mockup.mjs` reads `copy/en.json`** and uses a fixed port; I ran an unmodified copy
   with `he.json` from my scratchpad. Now: first load 423 KB (8 requests, images 250 KB, fonts 0 extra —
   inlined in the 184 KB HTML), LCP 1.08 s throttled, CLS 0.0002, scroll early 0 / settled 0, 0 images
   without alt, 0 tap targets under 44 px, **0 third-party requests**.

## booking

`https://wa.me/972546686808?text=…` (dossier `contact.whatsapp`, copied). Default line "היי הדס,
הגעתי מהאתר של מותג מיטיב ואשמח לשמוע עוד."; each lead block and each of the 9 offer rows uses its own
`ctaText`. Where: header (desktop), hero, phone bar (after the hero button scrolls away), lead blocks,
offer rows, closing, footer. Calendly only in the closing. Tapped at 390 px: hero → default line;
after "הצג את כל 6", row 5 → "היי הדס, אשמח להירשם לסדנת ההכרות. מתי הסדנה הבאה?". All plain links.

## other mockups in this run (hard constraint 5)

Side by side at 1440: calm opens on a **full-width green band**, Hadas looking into the lens in a
4:5 photo with one corner on the icon curve, mint button, Heebo throughout; interactive on a
**light sage page** with her circle portrait inside thin rings and a video satellite, handwritten
display type; unique on **white** with a **heart outline** holding tilted cut-outs (img-013 among
them) and the award sticker, serif title on green strips, salmon button. Not interchangeable.
