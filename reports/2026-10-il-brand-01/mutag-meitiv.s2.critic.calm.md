mode: quick        round: 1 (series 2)        variant: calm — "דף ההזמנה" (The commission sheet)
total: 74.6 / 80 (dimensions 1–7; dimension 8 is scored by visual-critic + experience-critic)
result: pass on the critic's gates (no hard fail from dimensions 1–7; dims 1, 3, 7 ≥ 6). The round result still depends on dimension 8 from both visual critics.
hard_fails: []

Critic 0.4.3 · rubric 0.3.1 · run 2026-10-il-brand-01 (inbound, `he` only, RTL) · 2026-10-18.
Page: `sites/mutag-meitiv/mockups/calm/dist/index.html` (build hash 93363127c5ec8bab in `shots/shoot.json`), served as plain static files on localhost:9642 with no rewrites.
Decided before scoring: house rule 1 "light themes" is surf-only, so dark-green grounds are not a fail (brief 6).

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | 34 claims checked against `dossier.json` with 0 mismatches and 0 missing (facts table below). `audit.json.facts`: 5 numbers are missing from he.json as written, and all 5 are formatting: `5,200` (5200), `18.10.2026` (`harvested_at` 2026-10-18), and the 3 blog dates (ISO in `blog.posts[].published`). |
| 2 | mobile + performance | 15 | 9 | 13.5 | Throttled phone (1.6 Mbps, 150 ms, 4x CPU), no scroll: first load 372 KB in 5 requests (budget 1.5 MB), external JS 0 KB (5 KB inline), fonts 2 weights of one family at 51 KB of woff2 (inlined as 66 KB of base64), largest image 49.5 KB, LCP 1,064 ms, CLS 0. Scroll CLS: early 0.0009, settled 0 (both under 0.01). The workshop clip is webm 1.15 MB / mp4 1.66 MB (mobile budget 2 MB) and loads only near the viewport. At 390 px, scrollWidth is 390 in both JS-on and JS-off, and the phone page is 12,493 px (L7 cap 13k). −1: 2 tap targets are under 44 px (below). |
| 3 | booking CTA | 15 | 10 | 15.0 | `recommended.primary_action` = whatsapp, `clicks_to_book` = 1. On a 390 px touch viewport, tapping the hero button requested `https://wa.me/972546686808?text=…` (`target=_blank`). The digits match `contact.whatsapp` +972546686808 character for character. The prefill is `path.ctaText` "היי הדס, אני פונה בשם ארגון…". All 12 distinct wa.me prefills are verbatim strings from he.json, and each format row carries its own service's text. JS off: 18 wa.me links remain real `<a href>`, plus `tel:+972546686808` and `mailto:` in the footer. Calendly appears once, in the closing (N9). No forms. |
| 4 | brand fit | 5 | 9 | 4.5 | Matches the concept-1 structure, all 15 items in order: hero img-033 full-bleed over a `#173B34` band → intro → "מה ארגונים מזמינים" (4 formats) → award moment with the judges' quote → logos + 3 talk lines → 4 method panels on `#0A5150` → testimonials → individuals block → demo case cover → team → podcast + blog → Instagram → closing img-c05 → footer. Organisations lead (brief 29): the h1 names nonprofits and organisations. Brief items covered: greens, icon, airy blocks, WhatsApp primary. −1: the formats are 2×2 cards on desktop where the concept specifies a list (notes conflict 3, with a reason given). |
| 5 | copy | 10 | 9 | 9.0 | All business text is he.json verbatim, and he.json passed copy round 5. Hebrew only, `lang="he" dir="rtl"`. The one English testimonial (Julia Dojas) stays in its own language (brief 16). D1: the award line appears once. D2: logos appear only under "מודה על הזכות להטיב ב:". D3: the quote links to brandawards.co.il and the talk lines link 1:1 to C5ynxOXNEJF / DMLlsaXNo1u / DILN8yiNoV3. −1: blog row order is 28.5 → 22.8 → 22.4, not newest-first as the current home block does (`blog.home_block` "3 newest"). |
| 6 | accessibility | 8 | 7 | 5.6 | axe-core 4 (wcag2a/aa, 21a/aa): desktop 0 violations, mobile **1 serious** `link-name` on `.hdr-wa`. The phone header WhatsApp is icon-only (`.hdr-wa span{display:none}`, svg `aria-hidden`) with no `aria-label`. Tap targets: 2 of 77 are under 44 px ("תכנון אסטרטגי למותג" 184×27 and "הדרכות צוות" 108×27, the format-title links). Keyboard pass (90 Tabs, 1440): the skip link comes first, and all stops are visible. Focus rings are drawn on the format cards (teal outline, `focus-0.png`) and on the method panels (mint inset ring; the focused panel widens and shows its body, `focus-1.png`). The testimonial scroller takes focus with **no visible ring** (`focus-2.png`). No drawers or dialogs, so no trap. The mobile menu `<details>` closes on Esc and returns focus to its summary (page.js). Reduced motion: 0 video requests, all 11 method bodies shown. Alt text: 0 of 39 images missing it, 3 decorative empties. Heading order: one h1, then h2/h3 only. |
| 7 | security + delivery | 7 | 10 | 7.0 | Static only: one HTML file with inline CSS and JS, assets under `img/`, `video/` and `fonts/`. 0 third-party hosts on first load, and still 0 after scrolling the whole page (37 requests, all localhost). No iframes or embeds. All asset URLs are relative and every filename is lowercase. No CMS calls, secrets or internal URLs. `preload` hints point to relative webp files. |

**Total: 20.0 + 13.5 + 15.0 + 4.5 + 9.0 + 5.6 + 7.0 = 74.6 / 80.**

## Budget table (playbook §4, measured: scratch copy of `tools/audit-mockup.mjs` reading `copy/he.json`)

| item | target | measured | ok |
|---|---|---|---|
| First-load transfer (no scroll, video excluded) | ≤ 1.5 MB | 372 KB (HTML 249 KB incl. inline fonts/CSS/JS; images 123 KB) | ✓ |
| Hero video after first paint | ≤ 2 MB mobile | no hero video; MAKING-panel clip webm 1.15 MB, lazy | ✓ |
| JS, compressed | ≤ 300 KB | 0 external, 5 KB inline | ✓ |
| Largest above-the-fold image | ≤ 300 KB | 49.5 KB (img-033 hero webp) | ✓ |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family (IBM Plex Sans Hebrew 400/600), 51 KB of woff2 | ✓ |
| LCP | ≤ 2.5 s | 1,064 ms | ✓ |
| CLS | < 0.1 (scroll < 0.01) | 0 · scroll early 0.0009 / settled 0 | ✓ |
| Third-party requests on load | 0 | 0 (0 after full scroll too) | ✓ |

## Video and lazy loading (tested)

- Desktop: the clip is not requested on first load. Scrolled to the method section, `table-464x696.webm` loads (200, 1,150,988 B) and plays.
- Phone: the clip sits in the horizontal swiper, off-screen at x = −500. Scrolling the page vertically does not request it, because the observer has a vertical rootMargin only. Swiping the MAKING panel into view requests it and it plays. This is correct lazy behaviour. Without the swipe, a phone visitor never sees the clip move, and that is a fact for the human.
- Reduced motion: 0 video requests and the poster stays.

## Facts table (site claim → dossier key → result)

| claim on page | dossier key | result |
|---|---|---|
| WhatsApp / tel +972546686808, "054-668-6808" | `contact.whatsapp`, `contact.phone` (brief 18) | match |
| hadas@kapara.com | `contact.email` | match |
| Calendly https://calendly.com/hadas/30min, "שיחת הכרות בזום, ללא תשלום" | `contact.scheduler` | match |
| Award: Israel Brand Award 2022, Brand Academy, gold, nonprofits, Bartali | `award.value` | match |
| Judges' quote (full text) | `award.value.judges_text` | match, verbatim |
| Award link brandawards.co.il/זוכים-2022 | `award.source_url` | match |
| Retreat "09:00-14:00", "580 ₪ + מע״מ למשתתף/ת" | `offers[therapists-day].schedule`, `price` 580 `per_person`, `vat` | match |
| BTC professionals "5,200 ₪ + מע״מ" | `offers[btc-professionals].price` 5200 flat + VAT | match |
| Intro workshop "ללא תשלום" | `offers[intro-workshop].price` 0 ("חינם") | match |
| "ההרשמה נסגרה" for מעסק למותג מיטיב | `offers[business-to-brand-course]` | match (in he.json, in dossier) |
| Price capture "נכון ל־18.10.2026" | `harvested_at` 2026-10-18 | match |
| Talks 2024 (Israeli branding conference), 2025 Kfar Blum / Mandel Foundation, 2025 festival "קיימות ואנשים 3" Ma'ayan Tzvi | `instagram.posts[C5ynxOXNEJF, DMLlsaXNo1u, DILN8yiNoV3]` captions | match (Mandel = "#קרןמנדל למנהיגות") |
| 15 logos under "מודה על הזכות להטיב ב:" | `client_logos`, img-044…058 | match (heading verbatim) |
| Method SENSING / THINKING / MAKING / INFLUENCING with titles and bodies | `method` (brief 20: 4 stages) | match |
| "בתהליך המיתוג אנו נשתמש במתודולוגית הקנבסים של BRAND THE CHANGE, מתורגמים לעברית" | `method` | match |
| Testimonials: אנווה רצון, יובל אברהם - בונים לחיים, Julia Dojas - Heart of Hosting (English, kept as given) | `testimonials[]` | match, verbatim (Julia's double space collapsed by HTML) |
| Personal branding summary, "ליווי אישי 1:1" | `services[personal_branding].card_text`, `format` | match |
| Strategic planning "מיתוג חדש או ריברנד…" | `services[strategic_planning].card_text` | match |
| Team: הדס דרכלי (מייסדת גישת ׳מותג מיטיב׳), תמר דרכלי, יעל שחר, דנה רוסו, ליאור ארסיני + roles | `team[]` | match |
| "בשיתוף פעולה עם הטובות בתחום" | `team_section` | match |
| Podcast "ON AIR…", Spotify show 3CO8m8PUlGHePnl3BbcNSb, Apple id1644532520 | `podcast`, `contact.socials` | match |
| Blog posts 28.5.2026 / 22.8.2026 / 22.4.2026 + titles + URLs | `blog.posts[].published`, `title`, `url` | match (order: see dim 5) |
| Instagram @mutagmeitiv + 6 tile links | `contact.socials.instagram`, `instagram.posts` | match |
| LinkedIn /in/hadasdrachli | `contact.socials.linkedin` | match |
| "מדריך הכנה למיתוג" PDF 5b80b1_a6a31b…pdf | `lead_magnet` | match |
| Footer "כאן מפתחים אסטרטגיות מותג עם משמעות.", "צילום: יעל שחר", "תכשיטים מנייר ממוחזר: מינה בן נון" | `footer` | match |
| "הצהרת נגישות" link | `accessibility_statement` | match |
| Demo case "שורשים — בית קפה חברתי (דוגמה)", "דוגמה" badge | brief 28, `brief/mutag-meitiv/demo-case-study.he.md` | labelled demo, as required |
| © 2026 | current year | match |
| Rating | none exists | correctly absent |

The photographs are all `license: business-owned` (img-033, img-ig-01, img-003/032/011, vid-004, img-c05, img-034, img-036…039, img-ig-*). The third-party marks (img-040 seal, img-044…058 logos) are shown as on the client's own site, under the run default. No stock is used. img-013, img-c06, img-ig-06 and img-015 are not on the page.

## Screenshots (`tools/shoot.mjs`, scrolled per viewport, 14 desktop + 17 phone captures; scratch copy deleted after the round)

- `mobile-00`: the floating white pill (icon, wordmark, round WhatsApp, menu) sits over img-033. Hadas is full length in the green dress at the yellow Brand Manager Day wall, and her badge is legible. Below is the `#173B34` band with the two-line h1, the mint line "לעמותות, לארגונים ולצוותים" and a full-width mint "כתבו להדס בוואטסאפ". All of it fits in 844 px.
- `mobile-02/03`: the four format cards, each with a line icon, a title, one sentence and a round WhatsApp button. The labelled bottom bar is visible. Up to 4 wa.me buttons are visible on one screen here.
- `mobile-04`: the award moment on deep green. The seal, the award line, the judges' quote large in white, and the attribution pill.
- `mobile-05`: logos in one deep-ink treatment, 3 per row and crisp. Heartivism reads lighter than the others.
- `mobile-07/08`: the method swiper. One panel with a peek of the next and its body under it.
- `mobile-15/16`: the closing (img-c05 women with boards) and the footer. The bar hides while the closing CTA is on screen.
- `desktop-00`: img-033 at 2.6:1 full-bleed, the band with the h1 at the right and the mint button at the left.
- `desktop-05/06`: the 4 method panels edge to edge on `#0A5150`.
- `desktop-12`: the 6-tile Instagram strip edge to edge.
- No overflow, overlap or clipped text found at 390 or 1440 on any capture.

Visible wa.me buttons per phone screen (17 stops): 2, 1, 3, 4, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 3, 2. Screen 0 shows the header pill and the hero button together. After that, the header pill hides while the bar shows (L9 holds).

## `check-design` (scratch copy, checks unmodified) — facts for the human

- Problems: "dark ground behind text" for `section.hero`, `section.award`, `section.method`, `details.case-card`, `div.close-band` and `footer.ftr`, at 1440 and 390. These are not a fail by decision (house rule 1 is surf-only; brief 6).
- Default look: h1, h2 and body are all IBM Plex Sans Hebrew. Ground `#FFFFFF`. 0 all-caps labels. 0 of 38 headings carry labels. No default-look warning.

## Station checks

- Look-log has 4 first-screen rounds, each with visible changes (crop, title size, phone crop), and 2 whole-page rounds. Not hollow.
- Not present in this 4e mockup (none gate quick mode): no `og:image`, no `canonical`, no `LocalBusiness` JSON-LD. Inner pages link to the current site's URLs (notes "gaps").

## The one sentence the human needs

Calm passes every mechanical gate at 372 KB first load, LCP 1.1 s and 0 third-party requests, with all 34 facts matching. Its three defects are small: the phone header WhatsApp has no accessible name, two format-title links are 27 px tall, and on the phone the workshop clip plays only after the method swiper is swiped to it.

what the designer prompt got wrong: The prompt does not say that an icon-only button needs an accessible name on every breakpoint. The designer hid the header button's text label on phones with `display:none` and left the svg `aria-hidden`, so axe flags `.hdr-wa` as a link with no name. Only the phone header is affected. The same gap covers focusable scroll containers: the testimonial scroller takes keyboard focus with no visible ring. Quotable rule: "Any control that drops its text label at a breakpoint keeps an `aria-label`. Any element made focusable (`tabindex`) gets a visible focus ring."

fix list (not required, result is pass on 1–7; smallest first):
1. Dim 6: add `aria-label="כתבו להדס בוואטסאפ"` to `.hdr-wa`, or hide its span visually instead of `display:none`.
2. Dim 6: give the focusable testimonial scroller a `:focus-visible` ring.
3. Dim 2/6: make the format-title links at least 44 px tall (padding or line box), or let the card link carry the tap.
4. Dim 5: order the blog row newest-first (22.8 → 28.5 → 22.4), or state that the first slot is a featured post with a cover.
