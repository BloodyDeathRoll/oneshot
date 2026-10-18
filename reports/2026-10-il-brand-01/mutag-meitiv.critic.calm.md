# mutag-meitiv · critic quick scorecard · calm "ירוק בית"

## Round 2

Critic 0.4.3 · rubric 0.3.1 · 2026-10-18 · build 25117ba10d00472e · re-scored fresh: own `audit-mockup` copy (he.json, port 8991) → `critic/calm/r2/audit.json`; tap-through, axe, keyboard, JS-off, reduced-motion + offline → `critic/calm/r2/tests.json`; sheets from the shared `shots/` (shot 11:30, same build).

```
mode: quick        round: 2        variant: calm
total: 76.2 / 80 (dimensions 1–7; dimension 8 = the two visual critics, not read)
result: pass on dimensions 1–7 (gates 1, 3, 7 ≥ 6; no critic-side hard fail) — overall pending dimension 8
hard_fails: []
```

| # | dimension | score | weighted | evidence |
|---|---|---|---|---|
| 1 | facts | 9 | 18.0 | 267 DOM segments; 230 verbatim in `copy/he.json`; the 37 others are the round-1 interface labels and facts (prices 580/480/350/5,200/3,200 ₪ = `offers[].price`, "+ מע״מ" on exactly the four rows whose `price_text` says it, post dates, award line = `award.value`, demo labelled "דוגמה") plus one new label "הצג את כל 6". Links unchanged from round 1 (all 22 external URLs in the dossier; WhatsApp/tel `+972546686808`). New images checked against `dossier.images[]`: img-013, 006, 007, 030, 032, c03, ig-01 all `business-owned`; alt texts match the dossier `shows` lines (e.g. img-013 "Hadas, selfie, in a pine forest, green shirt" → "הדס דרכלי מחייכת אל המצלמה בחולצה ירוקה, ביער אורנים"). −1 (both carried or new, neither a mismatch): Brand & Breakfast still "למשתתף/ת" (sources.md 127: "confirm"); the 2026-05-28 blog cover (`post-2026-05-28.webp`, blue heads, one burning orange) has no licence field in the dossier — it is the post's own cover on the current site's Wix account, used only as that post's cover, not as the business's people or place. |
| 2 | mobile + performance | 10 | 15.0 | `r2/audit.json`: first load 423 KB / 8 requests, all localhost; JS external 0, inline ≈ 4 KB; fonts Heebo self-hosted, 2 woff2 subsets inlined (41 KB decoded); largest image 73 KB; LCP 1,080 ms (was 2,172); CLS 0.0002; scroll early 0.0002 / settled 0. Clip `table-464.webm` 0.99 MB, requested only after scroll. Overflow at 390 px: 0. Sheets (`mobile-sheet.png` 22 captures, `desktop-sheet.png` 17): no overlap, clipping or unreadable text. Note for 4g, not scored: HTML is 183 KB because the fonts are inlined; on a multi-page site they belong in cached files. |
| 3 | booking CTA | 10 | 15.0 | Hero button "כתבו להדס בוואטסאפ" (= `recommended.primary_label`), bottom at y 666 / 844. Tapped at 390 px → `https://wa.me/972546686808?text=היי הדס, הגעתי מהאתר של מותג מיטיב ואשמח לשמוע עוד.` Persistent bar present at 3000 px. 17 WhatsApp links, one number; per-offer messages name the offer. JS off: 16 of 17 visible (the 17th is the bar), hero link visible. Clicks to book 1 (target 1). |
| 4 | brand fit | 8 | 4.0 | Fixed from round 1: entry cards arrow-free (now deep-green blocks, `desktop-01.png`); blog covers on the one post with a usable cover, icon tiles on the other two (`desktop-13.png`); podcast band carries the show artwork. Method is now a scroll-lit list with one photo per stage (`desktop-04/05.png`). −2: first phone screen (`mobile-00.png`) still has no price or "included" line from `recommended.above_fold`; the talks group shows 3 of 6 rows behind "הצג את כל 6", which hides the free intro workshop (`mockup_extras.freeFirstSteps`, a "free first step" the research wanted visible) until a tap; header order still differs from the concept (notes.md conflict 2). Testimonials: 2 beside the lead services, 6 in the slider (יובל, Linda friedrich, איה, רננה, AMBARTIQUE@לינדה, קרן) — Linda's two quotes are not adjacent; איה and קרן are now in the slider, captioned "Brand & Breakfast", no longer beside that offer. |
| 5 | copy quality | 10 | 10.0 | he.json throughout, Hebrew only, RTL; quotes in their own language with `lang`/`dir`. The English slogan is now in sentence case ("We are never too small to make an impact", `mobile-11.png`), words unchanged. Nothing left to fix. |
| 6 | accessibility | 9 | 7.2 | axe WCAG 2 A/AA after a full scroll: 0 violations. 45 images, 0 without alt; 0 of 72 tap targets under 44 px; skip link; one H1, ordered headings; `lang="he"`. Keyboard at 1440 px (34 Tabs): every stop has a 3 px solid outline, including the new "הצג את כל 6" button and the slider. Phone menu (`<details>`): opens with Enter, Tab walks its 4+ links. Reduced motion: no video request; hero photo loaded. −1: Esc does not close the phone menu (`menu_after_esc: true`; Tab still leaves it, so it is not a trap); with JS off the "הצג את כל 6" button is visible but does nothing (it carries `hidden`, overridden by `.btn` display — the same class of bug as round 1's slider dots), while all six rows are already shown. |
| 7 | security + delivery | 10 | 7.0 | Static HTML + `img/` + `video/`, fonts inlined, no server code, no CMS calls. Third-party hosts on load: 0, and still 0 after a full scroll. With every non-localhost request aborted, the page renders with Heebo loaded. Lowercase filenames, relative paths, no secrets. Links to current Wix pages ("לפרטים", accessibility statement) are expected at 4e. |

Total (1–7): 18.0 + 15.0 + 15.0 + 4.0 + 10.0 + 7.2 + 7.0 = **76.2 / 80** (round 1: 72.5).

Budget table (measured): first load 423 KB (≤ 1.5 MB) · clip 0.99 MB lazy (≤ 2 MB) · JS ≈ 4 KB inline (≤ 300 KB) · largest image 73 KB (≤ 300 KB) · fonts 1 family, 41 KB (≤ 2 / 150 KB) · LCP 1.08 s (≤ 2.5 s) · CLS 0.0002 (< 0.1; scroll 0.0002 / 0) · third-party on load 0.

check-design facts: still FAILS "dark ground behind text" — `section.hero` (L 0.07), `section.air` (L 0.04), `footer.ftr` (L 0.04) at 1440 and 390, plus a new one at 390: `details.case-card` (L 0.07, the deep-green demo case tile). Surf house rule; brief 6 greens, not a hard fail here (run note). Default look: Heebo for h1/h2/body, ground #FFFFFF, 0 all-caps labels, 0/46 labelled headings, no warning.

Screenshots cited (deleted after the round): `mobile-00.png` green header, img-013 (Hadas in green shirt among pines) full width with curved corner, title, tagline, mint WhatsApp button, award line at the bottom edge · `desktop-01.png` proof strip and four deep-green entry cards, no arrows · `desktop-04/05.png` method list with stage numbers 1–4 and one photo beside the lit stage · `mobile-11.png` course rows with ₪ prices and the sentence-case slogan · `desktop-13.png` three blog cards: icon tile, cover (heads), icon tile.

what the designer prompt got wrong: the prompt says nothing about progressive-disclosure controls with JS off, so a `hidden` button was again overridden by a display rule and shows dead (round 1: slider dots); and nothing ties a "show all" collapse to the research's must-be-visible rows, so the free intro workshop ended up behind the fold.

fix list (not gating; smallest first):
1. Dim 6: `[data-show-all][hidden]{display:none}` so the button stays hidden with JS off.
2. Dim 6: Esc closes the phone menu and returns focus to its summary.
3. Dim 4: keep the free intro workshop among the visible talks rows (or out of the collapse).
4. Dim 1: confirm Brand & Breakfast's "למשתתף/ת" with the client or drop the unit; record a licence note for the 2026-05-28 blog cover in the dossier.
5. 4g: fonts as cached files, not inlined, once there are several pages.

---

## Round 1

Critic 0.4.3 · rubric 0.3.1 · run 2026-10-il-brand-01 · 2026-10-18 · page `sites/mutag-meitiv/mockups/calm/dist/index.html` (build d5448fc9dd9c8659)

```
mode: quick        round: 1        variant: calm
total: 72.5 / 80 (dimensions 1–7; dimension 8 = visual-critic + experience-critic, not read)
result: pass on dimensions 1–7 (gates 1, 3, 7 ≥ 6; no critic-side hard fail) — overall pending dimension 8
hard_fails: []
```

| # | dimension | score | weighted | evidence |
|---|---|---|---|---|
| 1 | facts | 9 | 18.0 | 260 DOM text segments extracted at 390 px (`critic/calm/` script output, summarised below); 222 match `copy/he.json` (passed 4c) verbatim. The 38 that are not: 21 interface labels (nav, buttons, "האתגר", "התוצאה", "לבלוג המלא"…) and 17 facts, all checked against `dossier.json`: prices 580 / 480 / 350 / 5,200 / 3,200 ₪ = `offers[].price`; "+ מע״מ" exactly on the four `price_text` rows that say "+ מע"מ" (therapists-day, the-better-4, btc-professionals, change-leaders-course) and not on Brand & Breakfast ("350 ש״ח"); post dates 22.8 / 28.5 / 22.4.2026 = `posts[].date`; award line "פרס המיתוג הישראלי 2022 — זהב, קטגוריית עמותות · Brand Academy · 2022 · ברטלי" = `award.value` (place gold, category עמותות, project ברטלי); price capture date 18.10.2026 = `fetched_at`; demo case study labelled "דוגמה" + "זהו מקרה בוחן לדוגמה, לא פרויקט אמיתי" (= `caseStudies[0].demo`). All 22 external URLs found in the dossier; WhatsApp/tel `+972546686808` = `contact.whatsapp` / `contact.phone`; mail `hadas@kapara.com` = `contact.email`. `audit.json.facts` leads (5,200, 3,200, the dates) are reformatting only. −1: Brand & Breakfast shows "למשתתף/ת"; `copy/sources.md` line 127 marks per_person as "the harvester's reading — confirm" (the source text says only "350 ש״ח"). Also one template-written line with a mild claim, Instagram subhead "סדנאות, הרצאות ואנשים, מהשולחן של הדס." (not in he.json). No mismatch. |
| 2 | mobile + performance | 9 | 13.5 | `critic/calm/audit.json` (throttled 390 px, own run): first load 441 KB / 12 requests (budget 1.5 MB); JS 0 KB external, ≈ 4 KB inline (budget 300 KB); fonts 57 KB, 1 family, Heebo (≤ 2 / 150 KB); largest image 85 KB (≤ 300 KB); LCP 2,172 ms (≤ 2.5 s); CLS 0.0006; scroll early 0.0006 / settled 0 (both < 0.01). Clip `table-464.webm` 0.99 MB, requested only after scroll (`tests.json.video_req`). Horizontal overflow at 390 px: 0 px. Sheets `mobile-sheet.png` / `desktop-sheet.png` (25 + 17 captures): no overlap, no clipped or unreadable text in any capture; Hebrew RTL throughout, English quotes LTR. −1: HTML 132 KB uncompressed (all CSS inline + 120 KB page) and fonts from Google (allowed at 4e, a 4g job). |
| 3 | booking CTA | 10 | 15.0 | `dossier/mutag-meitiv/audit.json.recommended.primary_action` = whatsapp, label "כתבו להדס בוואטסאפ"; the hero button carries exactly that label. Tap-through at 390 px (Pixel 5 context): hero button → `https://wa.me/972546686808?text=היי הדס, הגעתי מהאתר של מותג מיטיב ואשמח לשמוע עוד.` (number character-for-character = `contact.whatsapp` without "+"; message names the business). Hero CTA bottom at y = 666 of 844 (first screen). Persistent bottom bar "כתבו להדס בוואטסאפ" present at scroll 3000 px, absent on the first screen (appears when the hero button leaves). 17 WhatsApp links, one host; per-offer messages name the offer (e.g. "…על סדנת החזון THE BETTER 4"). JS off: 16 of 17 visible, hero link visible (the 17th is the bar, by design). Clicks to book = 1 (target 1). Calendly secondary in the closing only. |
| 4 | brand fit | 7 | 3.5 | Order = concepts.md calm structure items 1–17 (header, green split hero, proof strip, 4 entry cards, two lead blocks, motto, method 4 stages, talks/courses with prices, demo case study, testimonials slideshow with dots, logos, team, ON AIR, blog, Instagram, closing, footer) — `desktop-00…16.png`. All 9 secondary offers present in two groups; method 4 stages SENSING/THINKING/MAKING/INFLUENCING (brief 20). −3: `recommended.above_fold` asks for what_where, included, price, trust, primary_action; the first phone screen (`mobile-00.png`) carries what (tagline), trust (award strip at its bottom edge) and the action, but no "included" or price line; three small deviations from the concept: the four entry cards carry an arrow button (concept: "arrow-free whole-card link", `desktop-01.png`), blog cards have no cover images (concept item 14; gap in notes.md — covers not harvested), and the header puts the WhatsApp button at the end side, not the start side (notes.md conflict 2). |
| 5 | copy quality | 9 | 9.0 | All business text is he.json (passed 4c round 3, humanised); Hebrew only, `lang="he" dir="rtl"`; testimonials in their own language with `lang`/`dir` per quote (brief 16). `<title>` and meta description in Hebrew. −1: one all-caps English line inside Hebrew body, "WE ARE NEVER TOO SMALL TO MAKE AN IMPACT" (`mobile-12.png`, courses intro) — it is the client's own line in he.json, but reads as a foreign shout in a Hebrew block. |
| 6 | accessibility | 9 | 7.2 | axe-core WCAG 2 A/AA after a full scroll at 390 px: 0 violations (`tests.json.axe`). `audit.json.a11y`: 33 images, 0 without alt (1 decorative empty), 0 of 67 tap targets under 44 px, skip link present, one H1, heading order H1→H2→H3, `lang="he"`. Keyboard at 1440 px, 30 Tabs: skip link → logo (accessible name "מותג מיטיב, לראש העמוד") → 6 nav items → header and hero WhatsApp → proof → cards → "לקריאת הכל" button → method `<summary>`s; every stop shows a 3 px solid outline. No drawer (no trap possible). Reduced motion: no video request, `<video>` has no source, hero photo loaded. All content is DOM text, no canvas. −1: the phone menu (`<details>`) was not keyboard-tested by me. |
| 7 | security + delivery | 9 | 6.3 | One static HTML + `img/` + `video/`, CSS/JS inline, no server code, no CMS calls. Third-party hosts on load and after a full scroll: only `fonts.googleapis.com`, `fonts.gstatic.com` (expected at 4e, tools.md; a defect at full mode). With every non-localhost request aborted, the page renders (fallback `Heebo Fallback`) and the hero photo loads. Filenames lowercase, relative paths. No secrets or internal URLs. −1: Google Fonts to self-host; "לפרטים" and the accessibility-statement link point at the current Wix pages (expected at 4e, notes.md gaps). |

Total (1–7): 18.0 + 13.5 + 15.0 + 3.5 + 9.0 + 7.2 + 6.3 = **72.5 / 80**.

## Budget table (playbook §4, measured)

| item | target | calm |
|---|---|---|
| first-load transfer | ≤ 1.5 MB | 441 KB |
| clip after first paint | ≤ 2 MB mobile | 0.99 MB (webm), lazy, not a hero video |
| JS compressed | ≤ 300 KB | ≈ 4 KB inline |
| largest above-fold image | ≤ 300 KB | 85 KB |
| fonts | ≤ 2 families, ≤ 150 KB | 1 (Heebo), 57 KB |
| LCP (throttled) | ≤ 2.5 s | 2.17 s |
| CLS | < 0.1 | 0.0006 (scroll 0.0006 / 0) |
| third-party on load | 0 | 2 (Google Fonts; allowed at 4e) |

## check-design facts (for the human, not a verdict)

`node tools/check-design.mjs` FAILS on "dark ground behind text" ×3 at both widths: `section.hero` (L 0.07, `#00574C`), `section.air` (podcast band, L 0.04), `footer.ftr` (L 0.04). That rule is the surf house rule; brief item 6 keeps the client's leading greens, so per the run note it is not a hard fail here. Default look: h1/h2/body all Heebo, page ground #FFFFFF, 0 all-caps labels, 0/46 labelled headings, no default-look warning.

## Screenshots cited (deleted after the round)

- `mobile-00.png`: green header with white wordmark + menu, Hadas in a yellow jacket at full width with the curved corner, "הי, הגעת למקום מיטיב!", tagline, full-width mint WhatsApp button; award line at the bottom edge.
- `desktop-00.png`: full-width green band, photo left, title + tagline + button right, faint icon curve behind.
- `desktop-01.png`: white proof strip (award seal, BTC seal), then four white cards on grey, each with a small round arrow button.
- `mobile-12.png`: courses intro with the all-caps English line, then course cards with ₪ prices and "+ מע״מ".
- `mobile-14.png`: demo case study tile, hatched image placeholder "תמונה לדוגמה", "דוגמה" badge.
- `mobile-24.png`: footer on deep green, phone, e-mail, guide PDF, nav, © 2026; persistent WhatsApp bar.

## Station checks

- look-log: 3 first-screen rounds with a visible change each (mark moved, title size, mark anchoring) + 2 whole-page rounds. Not hollow.
- `tools/audit-mockup.mjs` reads `copy/en.json` and crashes on this Hebrew-only site; it also listens on a fixed port 8980, which collides when the critics run in parallel. I ran an unmodified copy from my scratchpad with `he.json` and port 8987 (repo tool untouched); output in `critic/calm/audit.json`. `audit.json.no_js.booking_links_reachable` = 0 only because the page has no `#book`; my own JS-off pass found 16 visible WhatsApp links.

what the designer prompt got wrong: base.md 4e still says "the real copy from `sites/<slug>/copy/en.json`" and the audit tool hard-codes `en.json`, so a Hebrew-only run has to patch the tool to measure at all; and the prompt has no rule that the first screen carries the auditor's `recommended.above_fold` items, so calm drops "included" and price from the first screen without saying why in notes.md.

fix list (not gating; smallest first):
1. Dim 4: remove the arrow buttons from the four entry cards (concept: arrow-free whole-card link).
2. Dim 1: confirm Brand & Breakfast's "למשתתף/ת" with the client or drop the unit (sources.md line 127).
3. Dim 5: set "WE ARE NEVER TOO SMALL TO MAKE AN IMPACT" in sentence case or as a quoted line, not all-caps in a Hebrew block (wording unchanged).
4. Dim 4: harvest the three blog covers so the cards match the concept (4g).
5. Dim 7 / 2 (4g): self-host Heebo; link "לפרטים" to the new service pages.
