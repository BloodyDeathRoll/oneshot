# talouloren — critic scorecards, run 2026-11-il-brand-02

Critic 0.4.3, rubric 0.3.1. Dimensions 1–7 only; dimension 8 belongs to visual-critic and experience-critic (not read before writing this).

## Round 1 — station 4f, quick mode (2026-11-02)

### Method (same for all three mockups)

- Built pages: `sites/talouloren/mockups/{calm,interactive,unique}/dist/index.html`, served by a plain static server (python http.server, one port each); `tools/audit-mockup.mjs talouloren <variant>` (own static server, throttled 390 px phone, no scroll) rewrote each `audit.json`; `tools/check-design.mjs <page> --no-shots`; `tools/shoot.mjs <dist> --out shots/critic-r1` (1440 × 900 and 390 × 844, scrolled per viewport).
- Playwright walks at 390 × 844 (touch), Hebrew and English: every route of the brief's sitemap (`/`, story, launch, partnership, work, work/amdocs, about, brands, watch, course, check, thanks, snapshot, book, booked, privacy, accessibility, a 404) with `lang`/`dir`, horizontal overflow, h1, visible `{placeholders}`, exclamation marks; the Focused Check end to end (10 questions → contact + consent → thanks); booking (day → slot → details → mock pay → booked); WhatsApp tap with the `wa.me` request intercepted; JavaScript off; keyboard (Tab order at 1440, mobile menu open / Tab ×30 / Esc); `prefers-reduced-motion: reduce` (two screenshots 1.5 s apart compared byte for byte).
- Context: brief (A1–A24 first), `dossier/talouloren/{dossier.json,audit.json,direction.md}`, `sites/talouloren/concepts.md` (not needed for any check below), copy `he.json` / `en.json`, `brief/talouloren/copy-terms.json` (A13: `term.check` en = "Spotlight Check", so the English "Spotlight Check" is the fixed name, not a deviation). Current site talouloren.com shot with `tools/shoot.mjs` (scratch, outside the repo): white ground, a boxed grey slider "TOTAL SUCCESS EXPERIENCE", three thin-gold tiles, a logo strip, no booking path inside the page.
- `audit.json.recommended`: primary action `whatsapp`, `clicks_to_book` 1. The brief makes the Focused Check the site's main action; all three carry both (gold Check button + WhatsApp chip, persistent on mobile).

### Facts table (shared copy; per-mockup differences noted)

| Claim on the page | Dossier key | calm | interactive | unique |
|---|---|---|---|---|
| 27,000 (Amdocs employees) | `proof.stats` | match | match (counter settles at 27,000; mid-count values such as "25,170" are visible while it runs) | match |
| 3 million (Maccabi) | `proof.stats` | match | match | match |
| 1,000+ (course buyers) | `proof.stats` | match | match (counter; "+932" seen mid-run) | match |
| Names wall, 17 brands + 9 people | `proof.names_wall_*` | match, nothing extra | match | match |
| NBC: "Shahar's animation of Pale Force for Late Night with Conan O'Brien" | `proof.nbc_wording` | match, he + en | match | match |
| WhatsApp / phone +972504635536, tal@talouloren.com, no address | `contact.*`, A23 | match | match | match |
| Instagram / YouTube / LinkedIn URLs | `contact.socials` | match | match | match |
| Hebrew session name פגישת ייעוץ (A12), "Clarity Session" en (A15) | brief A12/A15 | match; "פגישת בהירות" absent | match | match |
| Name "Talou L'oren" (A22) | brief A22 | match | match | match |
| Shahar 12 years Kapara, Cronus Media | `team[1].bio` | match | match | match |
| Tal's photo = Tal | `team[0].photos` (img-001), `video_appearances` | frame of vid-036 (in `video_appearances`) | frames of vid-033 (hero + partner card) | frame of vid-033 (partner card), img-001 on /about |
| Shahar's photo | none in dossier | marked placeholder ("צילום בדרך · Portrait coming") | marked placeholder | marked placeholder |
| Prices, session length, capacity, budget ranges, turnaround, consent, case stories | not decided (brief) | visible `{placeholders}` | visible `{placeholders}` | visible `{placeholders}` |
| Banned: multiples, Alvaro/Netflix, Teddy Sagi, Hadad/Harari, Emmy for Shahar, Wella 80 %, "119 countries" | brief "Do not claim", A18 | none found (he + en text grep) | none found | none found |

`audit.json.facts`: the only number not in the passed copy on any mockup is "2026" (footer ©). Identity note for the human: vid-033's face does not visibly match img-001 side by side (img-001 slimmer, curly; vid-033 heavier, stubbled). The dossier lists vid-033 under Tal's `video_appearances` and its `shows` field says "Tal Oren talking to camera", so it is traced, not invented; but the brief rule is "only img-001 is confirmed Tal". Interactive (hero + partner card) and unique (partner card) depend on it; calm uses vid-036, which matches img-001 more closely. One point off dimension 1 for the two that rely on vid-033 until Shahar confirms.

### Budget table (playbook §4, measured, `audit.json` first_load, 390 px throttled, no scroll)

| Line | Target | calm | interactive | unique |
|---|---|---|---|---|
| First-load transfer | ≤ 1.5 MB | 568 KB (HTML 486 KB incl. inline fonts) | 1,206 KB, of which ≈ 581 KB is `video/hero-m.webm` fetched in the no-scroll window; ≈ 625 KB without it | 369 KB |
| JS (external) | ≤ 300 KB | 0 (inline) | 0 (inline) | 0 (inline; whole page rendered by it) |
| Largest image | ≤ 300 KB | 24.6 KB | 75.5 KB | 29.1 KB |
| Fonts | ≤ 150 KB | inline in HTML | 33 KB | inline in HTML |
| LCP | ≤ 2.5 s | 1,224 ms | 800 ms | 1,812 ms |
| CLS / scroll CLS early / settled | < 0.1 / < 0.01 | 0 / 0.008 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| Third-party requests on load | 0 | 0 | 0 | 0 |
| Hero video files (mobile / desktop) | ≤ 2 / 4 MB | 0.99 / 1.66 MB webm | 0.58 / 0.89 MB webm | 0.68 / 1.35 MB webm |

YouTube appears only as `youtube-nocookie.com` iframes built on tap (all three); no request on load.

### Tap-through log (390 × 844, touch; `wa.me` intercepted)

- calm he: persistent bar "לבדיקה הממוקדת" (296×52, `#/check`) + WhatsApp chip (52×52) → `wa.me/972504635536?text=היי, יש לי שאלה על הבדיקה הממוקדת`; en → "…question about the Spotlight Check". Mid-page: both still fixed on screen. `audit.json.booking.tapped` read the hero "הסרט" YouTube link as the first external link; it is the film button, not a booking action.
- interactive he: same bar (298×54) → `wa.me/972504635536?text=היי, הגעתי מהאתר של Talou L'oren ויש לי שאלה`; en equivalent. Mid-page fixed.
- unique he: same bar (300×52) → `wa.me/972504635536?text=היי, הגעתי מהאתר של Talou L'oren ויש לי שאלה` (chip) / "…על הבדיקה הממוקדת" (`audit.json`); en equivalent. Mid-page fixed.
- Focused Check, all three: start screen → 1/10 … 10/10, one question per screen, Back and Next, Next disabled until answered (seen on Q10 and contact), contact (name, email, phone, `{consent_text}` checkbox) → thanks. Shots `flow-check-*.png`.
- Booking, all three: day → slot → name/email/phone → mock card → "לתשלום ולאישור" → booked page with the chosen date and time. calm and unique on one screen; interactive in three steps (day/slot → details → pay). Placeholders `{session_length}`, `{price_session}`, credit line present. unique offers Saturday (שבת 7) as a bookable day (labelled "מועדים לדוגמה"); calm disables it. interactive's booked line reads "נתראה ב־יום רביעי" (grammar). Shots `book-*.png`.
- JavaScript off (shots `nojs-390.png`): calm 17,033 chars of text, 23 WhatsApp links, one in the first screen, the Check bar; interactive 3,474 chars (hero + bar + WhatsApp; the sections below the hero are hidden until script runs); **unique 57 chars, a black page, no h1, no visible booking link** (one `wa.me` link in the DOM, off the first screen, 0 `tel:`).

### Mobile layout

No horizontal overflow (scrollWidth 390) on any route, he and en, all three. `lang`/`dir` switch correctly (he/rtl ↔ en/ltr).

### check-design (facts, not taste)

- calm: `look:` h1 Frank Ruhl Libre · h2/body Assistant · ground rgb(15,15,15); 0 all-caps labels; 0 problems.
- interactive: h1 Karantina · h2/body Heebo · ground rgb(6,6,6); WARN 4 tracked all-caps labels, 3 of 135 headings preceded by one.
- unique: h1/h2 Bellefair · body Plex · ground rgb(6,6,6); 0 warnings.

---

mode: quick        round: 1        variant: calm
total: 68.1 / 75 (dims 1–7)        result: pass on 1–7 (dims 1, 3, 7 ≥ 6, no critic hard fail); final result waits on dimension 8        hard_fails: []

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | facts table: every number, name and contact matches; placeholders visible; Tal = vid-036 frame (traced), Shahar a marked placeholder; no banned claim (he + en grep) |
| 2 | mobile + performance | 9 | 568 KB, LCP 1,224 ms, CLS 0, scroll CLS 0.008 early (under 0.01, closest of the three; sources `div.hero-c`, `nav.seg`); no overflow on 18 routes × 2 languages; `a11y.tapables_under_44px` 5 (desktop nav links 31–42 px wide) |
| 3 | booking CTA | 9 | WhatsApp number identical to dossier, prefill names the Check; fixed bar on every screen; works with JS off (23 links, 1 in first screen); Check and booking flows complete to /thanks and /booked |
| 4 | brand fit | 8 | Home in the brief's 11-section order (hero, mirror, flip with a white light band, doors, how, proof, cases, partners, partnership, FAQ, final call); dark ground, gold only on actions/signature; all 16 routes present |
| 5 | copy | 8 | passed copy, no exclamation marks, plural address; English mode still shows a Hebrew video title ("סדנה למיתוג אישי מנצח ליזמים…") on /thanks and /watch; testimonial cards show `{name_to_confirm}` |
| 6 | accessibility | 6 | 0 images without alt; reduced motion: video paused/hidden, frames identical; Tab order logical with visible focus; but the skip link stays off-screen when focused, the mobile menu does not move focus into itself, Tab ×30 leaves it, Esc closes it without returning focus to the toggle; 5 tap targets < 44 px |
| 7 | security + delivery | 9 | static single file + relative assets, 0 third-party on load, YouTube nocookie only on tap, no secrets/internal URLs, lowercase filenames |

what the designer prompt got wrong: the menu pattern is not specified, so calm (and interactive) shipped an overlay menu with no focus management; the prompt should require the drawer contract (focus in, trap, Esc, focus back) for every overlay, not only `[data-open-drawer]`, and a visible skip link on focus.
fix list: n/a (not failing). Smallest-first improvements: skip link visible on focus; menu focus in/trap/return; English route labels for Hebrew-titled videos; nav tap targets ≥ 44 px wide.

---

mode: quick        round: 1        variant: interactive
total: 65.1 / 75 (dims 1–7)        result: pass on 1–7 (dims 1, 3, 7 ≥ 6, no critic hard fail); final result waits on dimension 8        hard_fails: []

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 8 | facts table all match; counters land on 27,000 / 1,000+ but show non-facts while counting ("25,170", "+932" in `shots/critic-r1/mobile-*.png`); Tal's hero film and partner card are vid-033, which does not visibly match img-001 (confirm with Shahar); Partnership band is img-014 (a 2018 shoot subject at a Mercedes wheel) under the word "שותפות", unlabelled |
| 2 | mobile + performance | 9 | first load ≈ 625 KB + 581 KB mobile hero webm inside the no-scroll window; LCP 800 ms; CLS 0, scroll CLS 0/0; 0 tap targets < 44 px; no overflow on 18 routes × 2 languages |
| 3 | booking CTA | 9 | WhatsApp number identical, prefill names the business; fixed bar; WhatsApp + Check work with JS off (3 links); Check flow and 3-step booking complete; prefill does not carry the visitor's choice from the bar (generic "question") |
| 4 | brand fit | 8 | all 11 Home sections plus the Check's first question answerable on Home (direction hint); dark, one gold; all routes present |
| 5 | copy | 7 | raw `{hero_film_caption}` is the first-screen film button label (he + en); booked page "נתראה ב־יום רביעי"; Hebrew video titles in English mode; `{name_to_confirm}` on 4+ testimonial buttons on /thanks |
| 6 | accessibility | 6 | 0 alt missing, 0 small targets, visible focus, reduced motion static; mobile menu: focus not trapped (Tab ×30 lands on the WhatsApp chip behind it), Esc closes but focus not returned; with JS off the sections below the hero are hidden (3,474 chars of text vs ≈ 17,000 in calm), against playbook §4 "core content in the HTML" |
| 7 | security + delivery | 9 | static, relative, 0 third-party on load, YouTube on tap only |

what the designer prompt got wrong: reveal-on-scroll is allowed to hide content by default, so a JS failure hides most of the page; the prompt should require reveals to start visible and be hidden only by a class the script adds. Count-up stats should render the final value in the HTML and animate only from script.
fix list: n/a (not failing). Smallest-first: label the film button ("הסרט" / "The film") instead of the raw key; fix "ב־יום רביעי"; final values in stat markup; reveals visible without JS; menu focus contract.

---

mode: quick        round: 1        variant: unique
total: 53.9 / 75 (dims 1–7)        result: **fail** (dimension 3 = 4 < 6)        hard_fails: []

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 8 | facts table all match; Tal's partner card is vid-033 (confirm with Shahar), img-001 on /about; Shahar a marked "ש״נ" placeholder; no banned claim |
| 2 | mobile + performance | 7 | 369 KB, LCP 1,812 ms, CLS 0, scroll CLS 0/0, no overflow on 18 routes × 2 languages; 15 tap targets < 44 px (logo link 146×24, footer phone 102×19 and email 132×19, "לסיפור המלא" 143×42, door rows 350×40) |
| 3 | booking CTA | 4 | with JS on: WhatsApp number identical, prefill names the business/Check, fixed bar, Check and booking flows complete. With JS off (`nojs-390.png`): black page, 57 characters, no h1, no booking action on the first screen, 0 `tel:` links; `audit.json.no_js.booking_links_reachable` 0. Rubric: the primary action must be a real link that works with JS off |
| 4 | brand fit | 8 | all 11 Home sections present (partners and the Check appear early inside the pinned set-piece, then again in order); dark, gold metallic on actions; all routes present |
| 5 | copy | 7 | /work and /watch label films with raw YouTube titles ("Talou Testimonial Film 2 HQ", "TESTIMONIALS MAGIC TALOU") next to `{name_to_confirm}`; Hebrew titles in English mode; booking offers Saturday as an example slot |
| 6 | accessibility | 6 | 0 alt missing; skip link; mobile menu traps focus and Esc returns it to "תפריט" (the only one that does); reduced motion: frames identical (shader still, canvas present); but 15 small tap targets and no content without JS |
| 7 | security + delivery | 8 | static, relative, 0 third-party on load, YouTube on tap only; every page is built by script at runtime from inlined data, so the static output is an empty shell for crawlers and no-JS visitors |

what the designer prompt got wrong: it allows a mockup to render its whole DOM from script; the prompt should state that the HTML file carries every route's Home text and the booking links before any script runs (playbook §4 "core content in the HTML, not injected by JS"), and that the WebGL set-piece is an enhancement over that markup.
fix list (smallest first): (1) render Home's markup (hero h1, doors, Check bar, WhatsApp link, sections) server-side in `index.html` and let the script enhance it — this alone lifts dimension 3; (2) tap targets ≥ 44 px (logo, footer phone/email, case and door links); (3) film labels from copy, not raw YouTube titles; (4) disable Saturday in the example slots.

---

### The one sentence the human needs (facts, not preference)

calm and interactive pass the critic's gates (68.1 and 65.1 of 75); unique fails dimension 3 because with JavaScript off it is a blank page with no booking link; interactive and unique show Tal from vid-033, which Shahar should confirm is Tal; all three are measured well inside the performance budget and all three beat talouloren.com on booking path (the old page has none inside the page).

Evidence: `sites/talouloren/mockups/<variant>/audit.json` (re-measured this round), `sites/talouloren/mockups/<variant>/shots/critic-r1/` (`desktop-sheet.png`, `mobile-sheet.png`, `route-*.png`, `flow-check-*.png`, `book*.png`, `nojs-390.png`). Screenshots are deleted after the round by the orchestrator; their content is described above.
