# mutag-meitiv · series 2 · interactive · "בחרו פורמט" (Pick a format) — station 4e notes

Designer 0.5.2 · run 2026-10-il-brand-01 · 2026-10-18. Hebrew only, `lang="he" dir="rtl"`. Concept 2 of `sites/mutag-meitiv/concepts.md` (series 2, archetype "התוכנייה", organisations lead).

Files: `dist/index.html` (one page, CSS + JS inline; header logo inlined as data URIs) · `dist/img/*.webp`, `dist/fonts/rubik-{hebrew,latin}.woff2`, `dist/video/s2i-making.{webm,mp4}` — all written by `src/make-media.sh` (header `# media:`). `dist/video` is a link into the media store (`~/.oneshot/assets/mutag-meitiv/mockups/interactive/video`, the folder `tools/link-assets.sh` assigns this path; files carry an `s2i-` prefix so series 1's `table-464.*` in the same folder is untouched). `src/build.py` builds the page from `src/page.css` + `src/page.js` and `sites/mutag-meitiv/copy/he.json` (every business word verbatim from he.json; template labels marked `T()` in build.py). Rebuild: `bash src/make-media.sh && python3 src/build.py`.

## look-log

Old site beside every round: `dossier/mutag-meitiv/assets/old-site-desktop.png` / `old-site-mobile.png` — a boxed green panel in a 950 px column, a small circle photo, four unexplained badges, no labelled action, 14 px text; organisations have no way to say what they want.

**First screen, round 1.** Full-bleed img-ig-01 (Hadas on stage, green dress) with a white booking card: h1, the format line, four card-shaped chips, the WhatsApp button and a preview of the WhatsApp message. Wrong: the first shot showed the page scrolled to the tabs (the tab script called `scrollIntoView` on load — fixed); then, with it fixed, the stage photo was soft and blocky (WebP q74 on an Instagram source), the "ההודעה:" label floated beside a cramped bubble, and the card had nothing that names the woman in the photograph. Decided here: the card sits at the **end (left)** side, not the start side — img-ig-01 is portrait and Hadas fills the centre-right of every 1440-wide crop, so a start-side card would cover her (conflict 1). Already clearly better than the old site: one photograph of her on a real stage, one question, one labelled button.

**First screen, round 2.** Hero renditions re-encoded at q86/84 (talk 48 KB desktop, still tiny); eyebrow "הדס דרכלי | מותג מיטיב" above the h1; the message preview became a label line plus a full-width chat bubble; card 520 px. Chip states shot: הרצאה, מיתוג וריברנד, השתלמות, סדנה לצוות. Wrong: on a fast double change the השתלמות chip kept the previous photo (the swap waited for a `load` event that had already fired); the white nav text was unreadable over the bright canvas wall of img-003; on the phone the button moved when a three-line format line replaced a two-line one.

**First screen, round 3.** Photo swap now waits on `img.decode()` (fallback 700 ms), so every chip shows its own picture; the top gradient behind the transparent header deepened (0.62 → 0 over 220 px) so the nav reads over all four photos; phone line height reserved. Phone: photo 4:5, card overlapping by 48 px, title, line, 2×2 chips and the full-width button all inside 844 px; the message bubble sits just under the fold. **Against the old site at a glance:** the old first screen is a dark boxed slab with badges; this one is Hadas on the Brand Manager Day stage, a heading that names nonprofits and organisations, and a step that asks "מה תרצו להזמין?" and changes the picture, the line and the WhatsApp message to the answer. Clearly better, at 1440 and at 390.

**Whole page, round 1.** Built every section (intro, format tabs, method deck, proof, logos, quotes, individuals, demo case study, team, content, Instagram, closing, footer, phone bar). Sheets showed: the fanned method deck collapsed into the bottom-left corner with no stage photo (the deck container had 0 width inside its grid); the demo tile's watermark icon cut "for" at the tile edge; HEARTIVISM nearly invisible in the logo strip; `audit-mockup` (scratch copy, he.json) measured **early-scroll CLS 0.37** — five unsized close-icon SVGs in the team bios made the page 488 px wide before JS ran, so the phone zoomed out and back.

**Whole page, round 2.** Deck sized (`width:100%`): four white cards fanned at the start side, the front one flipped to its title and full body, the stage photo 4:5 beside it, stage buttons + arrows, keys ←/→ and drag; MAKING plays vid-004 while it is front. Close icons sized → scroll width 390, CLS 0.0003. No-JS header is now a solid white pill (it was white text on white); reduced-motion and no-JS deck shown as a 2×2 grid of photo + card with text (looked at). Wrong still: the founder card's crop of img-034 cut Hadas's face at the frame edge; prices rendered as "₪350לאדם" (flex items swallow spaces); the HEARTIVISM file is black letters on a flattened dark-grey ground, so the ink recipe made a faint outline.

**Whole page, round 3 (last).** Founder crop re-centred on her face (fx .45); price tags are inline text ("350 ₪ לאדם", "480 ₪ + מע״מ"); logo recipe handles dark-on-dark files and reads every one of the 15 marks in one crisp `#173B34` ink; demo watermark hidden on the phone, moved inside the tile on desktop. Looked at the last sheets for overflow, overlap and unreadable text at 1440 and 390: none (scroll width = viewport). **Against the old site:** the old page is a column of identical green boxes, a long team text wall and a grey logo grid; this one opens on the stage with a booking step, then an organisation's path in four tabs with their own photo, price and WhatsApp line, the method as her own card deck on deep teal, the award explained in the judges' words beside three dated talks, a moving logo strip under her own heading, one quote at a time, the individuals' offers one tap away, a designed "דוגמה" case study, the team row, podcast and blog, the Instagram strip, a full-bleed workshop photograph and a real footer. It wins on the first screen and on the whole page.

Interaction checked in Playwright (1440 and 390, served on a local port): every chip changes photo, line, button href and bubble, and pre-selects its tab; tabs switch by click and ←/→; the deck moves by arrows, stage buttons, keys and drag, flips the front card, plays the clip only on MAKING and only while the section is in view; phone deck is a scroll-snap row with dots; quotes move one at a time and the track takes the shown quote's height; individuals sub-chips open one list at a time; the demo opens its challenge/outcome and lights the four stages in order; team bios open after the clicked row, focus goes to the close button, Esc closes and focus returns; logo marquee pauses on hover/focus and with its button; phone bar appears once the hero button leaves the screen and hides over the footer; the header WhatsApp pill hides while the hero button is in view.

**Post-4f fixes (coordinator, 2026-10-18; functional only, nothing visual).** (1) Menu (header and footer): "תכנון אסטרטגי למותג" and "הרצאות וסדנאות" now select their tab (`#fmt-brand` / `#fmt-talk`) and then scroll to the tabs; "מיתוג אישי לעסק" and "קורסים" now point to `#acc-pb` / `#acc-cr`, open that list and scroll to the individuals block. One delegated click handler in `page.js` does it for any `#fmt-*` / `#acc-*` link. With JS off the anchors still land, because every panel and list is visible. Before this, strategic planning pointed to a hidden panel and did nothing. (2) "סדנה לצוות" (chip, tab and hero) no longer carries the therapists' day retreat's `ctaText`, format or price. It carries the general `path.ctaText` and no price, and its tab title is the path line's own label, "הדרכות צוות". The retreat's paragraph from `path.body` stays as the example it is. Checked in Playwright at 1440 and 390 (phone via the menu button): each of the four menu items leaves the right tab selected or the right list open, its block at the top under the header, and the menu closed. Choosing "סדנה לצוות" gives `wa.me/972546686808?text=היי הדס, אני פונה בשם ארגון…`, and its panel shows no price.

## measured (scratch copy of `tools/audit-mockup.mjs` reading `copy/he.json`, port 8795; results in `audit.json`)

| line | measured |
|---|---|
| first load, no scroll (phone) | 674 KB (HTML 172 KB incl. inline CSS/JS, fonts 44 KB, images 473 KB), 17 requests |
| largest image | 79 KB |
| hero video | none on the first screen (concept); the MAKING clip webm 0.86 MB / mp4 1.1 MB, attached only when its card is shown, never under reduced motion or Save-Data |
| JS | inline, ≈ 14 KB uncompressed |
| fonts | 1 family (Rubik), 2 subsets, self-hosted, `swap`, Hebrew preloaded |
| LCP (throttled phone) | 1.13 s |
| CLS | 0.0003 · scroll early 0.0003 · settled 0 |
| third-party requests on load | 0 |
| tap targets < 44 px | 0 · images without alt 0 |
| phone page height | 11,431 px (≤ 13,000) · desktop 10,278 px |
| numbers not in he.json | "3,200" (3200 with a thousands comma), "22.8.2026", "28.5.2026" (post dates `2026-08-22`, `2026-05-28` reformatted) |

`tools/check-design.mjs` (single page): **FAIL by decision** — 6 "dark ground behind text" lines (method deck `#0A5150`, demo tile `#173B34`, footer `#173B34`, at both widths). House rule 1 is surf-only and brief 6 wins (run decision, concept L1). No caption, padded-box, upscaled-full-bleed or default-look warning. `tools/check-places.mjs mutag-meitiv`: ok (0 borrowed images).

From `file://` (how `tools/shoot.mjs` loads a file) Chrome logs two CORS errors for the preloaded font; over http there are none.

Booking: every WhatsApp link is `https://wa.me/972546686808?text=…` from `contact.whatsapp` "+972546686808" (one target on the page, checked). General buttons (header, hero before a chip is chosen, format section, closing, footer, phone bar) carry `path.ctaText`; each chip, tab and offer row carries its service's own `ctaText`. Calendly `bookingLinks[0]` only in the closing (N9: the free Zoom call is named once, by `closing`, beside its button). Phone `tel:+972546686808`, mail `hadas@kapara.com`. Tapped through on 390 px: hero button before and after choosing "סדנה לצוות", phone bar.

## images

All business-owned unless stated (dossier `images[].license`).

| file | asset | use |
|---|---|---|
| hero-talk-d/-m, fmt-talk | img-ig-01 (1440×1800) | hero default (הרצאה), lecture tab; 3:2 desktop (1440 wide, drawn ≤ 1440), 4:5 phone, 4:3 tab |
| hero-team-d/-m, fmt-team, closing-d/-m | img-c05 (client, 1600×1200) | hero "סדנה לצוות", team-workshop tab, closing full-bleed (3:1 / 4:3) |
| hero-brand-d/-m, fmt-brand | img-003 (2000²) | hero "מיתוג וריברנד", strategic-planning tab |
| hero-pro-d/-m, fmt-pro | img-032 (2000×1333) | hero "השתלמות", professional-training tab |
| st-sensing / st-thinking / st-influencing | img-006 / img-012 / img-ig-08 | method deck, 4:5 |
| st-making-poster + video/s2i-making | vid-004 (client clip 464×832; cut 2–14 s, 464×580 crop, muted) | MAKING card |
| talk-01 / talk-04 / talk-05 | img-ig-01 / img-ig-04 / img-ig-05 | talk thumbnails, each linked to its post (D3 order) |
| award-seal | img-040 — **"unknown" (third-party mark)**, shown as on the client's site | beside `proof.award` |
| logo-044 … logo-058 | img-044 … 058 — **"unknown" (client logos)**, shown as on the client's site, one `#173B34` ink, never redrawn | strip under "מודה על הזכות להטיב ב:" |
| team-hadas | img-034 (4:5 crop on her face) | founder (concept: img-034; he.json `team[0].photo` is img-001) |
| team-036/037/038/039 | img-036 … 039 | team row, 4:5 |
| ig-01, ig-08, ig-03, ig-02, ig-09, ig-11 | Instagram tiles (business), 1:1; **ig-06 left out** | Instagram strip, linked |
| podcast-art | `dossier.podcast.cover_image_url` (the show's own artwork, fetched by the recipe) | podcast card |
| post-2026-05-28 | `dossier.blog.posts[]` cover of 2026-05-28 (site account's own Wix media, fetched by the recipe) | blog card |
| icon-/word-white/green, icon-white-lg | logo-icon.png, logo-wordmark.png (white originals; green = same alpha filled `#173B34`) | header, deck card fronts, demo tile, footer, the text-only post cover |

Not used: img-013 and img-c06 (selfies, decided), img-001 (series-1 hero), img-011 and img-033 (the unique and calm series-2 heroes; kept out so the three first screens differ), stock, unknown-licence photos, the 2026-08-22 blog cover (photographer of the Abramović portrait not stated) and the 2026-04-22 cover (Wix Unsplash library).

## gaps

- **No real case study.** `caseStudies[0]` is `demo: true`: a designed deep-green cover with a "דוגמה" badge, its four stage labels and its challenge/outcome opened in place; no photograph on it, so no real project is implied.
- **No organisation testimonial** (all eight are individuals). The judges' quote is the organisational third-party voice; three individual quotes follow (אנווה רצון, Julia Dojas, יובל אברהם), never labelled as organisations'.
- No rating anywhere (none exists). No newsletter block (no URL). The PDF guide is a footer link.
- The accessibility statement (`legal`, required in practice for IL) and the service pages are 4g pages; nothing at 4e links to them (no dead links).
- 2026-08-22 post has no usable cover → a deep-teal tile with the white icon above its date, title and excerpt.

## conflicts

None blocking. Deviations, each with why:

1. **Hero card on the end (left) side, not the start side.** img-ig-01 is portrait; in every 1440-wide crop Hadas fills the centre-right, so a start-side (right) card would cover her on the default screen. The card is at the left on desktop; RTL reading still starts at its right edge. Alternative: start-side card with Hadas half covered, or an upscaled shifted photo (forbidden).
2. **Message preview** added under the button ("ההודעה שתיפתח בוואטסאפ:" + the exact `ctaText`) so the first tap visibly changes the message (the concept's own failure risk). The text is he.json's `ctaText` verbatim.
3. **Eyebrow** "הדס דרכלי | מותג מיטיב" (`team[0].name`, `businessName`) and the question "מה תרצו להזמין?" above the chips — template labels.
4. **Hero button before any chip** carries `path.ctaText` (as JS off), while "הרצאה" is shown selected with its photo and line; the lecture's own `ctaText` takes over on the first tap of any chip. The concept asks for both "default הרצאה" and "JS off: path.ctaText"; this keeps one behaviour with and without JS.
5. **Tab panels** show each format's full `path.body` paragraph plus the service `format` / `audience` (N1: the card shows `audience`, not the service `body`); price only where published ("5,200 ₪ + מע״מ" on the training tab; the team-workshop tab is general and shows none, see post-4f fixes). Secondary button "איך זה עובד" goes to the method (no service pages at 4e).
6. **Deck card fronts** show the stage label in lower case (as "change" on her printed cards) with "n / 4"; the back shows the label, `title` and the whole `body`.
7. **Individuals block** sub-line is `services.personal-branding.audience`; "סדנאות פתוחות" lists intro-workshop, the-better-4, brand-and-breakfast, community-meetups; "קורסים" lists change-leaders-course and business-to-brand (status `full` → "ההרשמה מלאה" and its own update message). btc-professionals is in the organisations' tabs, not repeated. איה / קרן (Brand & Breakfast quotes) are not shown.
8. **Section titles** "על הבמות ובארגונים", "הרצאות וסדנאות, 2024–2025", "גם לבעלי עסקים ולאנשי מקצוע", "פודקאסט ומאמרים", "באינסטגרם", "ניווט" and the chip labels are template labels (no copy field; concepts.md report notes the `shortLabel` schema gap). D1: the award line appears once (`proof.award`), the team section with Dana's bio is four sections away. D2: logos only under "מודה על הזכות להטיב ב:". D3: the judges' quote links to brandawards.co.il; talk lines link to their posts 1:1.
9. **Fonts** self-hosted at 4e (allowed to load from Google; self-hosting avoids a late swap). One family; the concept chose Rubik for everything.
10. **Tooling, not the page:** `tools/audit-mockup.mjs` reads `copy/en.json` and a fixed port; it was run from a scratch copy reading he.json on port 8795 (it writes `audit.json` here). `tools/check-design.mjs` was run on the single page to avoid shooting the other designers' folders.

## divergence from the other mockups of this run (hard constraint 5)

Looked at the first screens of series-2 calm and unique (both in `mockups/`), and series 1 (`mockups/series-1/`). **S2 calm** opens on img-033 (Hadas at the yellow Brand Manager Day wall) above a full-width deep-green title band, mint button, Plex. **S2 unique** opens on the dark img-011 stage screen with the title centred on two green strips and a light-green button. **This one** opens on Hadas walking the stage in img-ig-01 with a white booking card whose four card-chips change the photograph, the line and the WhatsApp message; Rubik only; `#00574C` button; the method is a fanned card deck on `#0A5150`. **Series 1** calm is a green split panel with img-013, series 1 interactive the four rings around img-001. A visitor would not mistake any two of them.
