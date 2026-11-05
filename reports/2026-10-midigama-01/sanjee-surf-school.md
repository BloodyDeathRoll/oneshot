# sanjee-surf-school: critic scorecards (run 2026-10-midigama-01)

## Round 1, quick (station 4f)

critic 0.4.3 · rubric 0.3.1 · 2026-11-05 · mockups `sites/sanjee-surf-school/mockups/{calm,interactive,unique}/dist/` (designer 0.7.1; `index.html` last written 13:35 / 13:33 / 13:30 local). Served on :9340 / :9341 / :9342 from a plain static server (`tools/_serve.mjs`). I did not read any visual-critic or experience-critic report, and I read no designer `notes.md` until my scores were set (then only the look-log headings).

Same checks, same order and same viewports for all three. Evidence is in `reports/2026-10-midigama-01/critic-sanjee-surf-school-r1/`:

- `audit-{calm,interactive,unique}.json`: `tools/audit-mockup.mjs`, re-measured. **Scratch copy:** port 8980 → 9343, and the output goes to my folder so the designers' `audit.json` stays untouched. Nothing else changed.
- `shots/{calm,interactive,unique}/`: `tools/shoot.mjs` at 1440×900 and 390×844 (gitignored scratch; desktop 12 / 13 / 12 captures, mobile 17 / 17 / 16). Zero console errors.
- `a11y.json`: axe-core (WCAG 2.0/2.1 A+AA) after a full scroll at 390 and 1440, a Tab walk, and reduced motion. axe was installed in the session scratchpad.
- `probe.json`: pixel contrast with the text hidden, over photographs; font-size census; a second Tab walk with scroll settled; quote checks.
- `flows.json`: tap-through with off-site navigation aborted and recorded. **No wa.me page was opened and nothing was sent.** Also tiles, message, bottom sheet, menu, pill.
- `facts.json`, `text-*.txt`: rendered text with JS on at 390 and 1440, JS off at 390; every href decoded; every image and alt.
- `funnel-*/funnel.json`: `tools/funnel.mjs --depth 3` as a forward check (full-mode evidence, run early).
- `tools/check-design.mjs --no-shots` on each page path (scratch copy: port 8960 → 9346 only).

**Rubric arithmetic (fact for the human):** dimension weights 1–7 sum to 80, so totals below are out of 80. Dimension 8 belongs to the two visual critics.

### Shared evidence (identical for all three)

**Facts table.** 0 contradicted values and 0 claims without a dossier entry, on any page.

| Claim on page | Dossier key | Result |
|---|---|---|
| 3 lessons: USD 40, 50, 160; 2 hours; levels; includes | `lessons[]`, `includes` | match |
| 16 rental rows (8 durations × soft-top, hardboard), notes; bodyboard USD 5 per day | `rentals[]`, `offers` | match; every row read off the page, interactive's `data-soft`/`data-hard` equal its cells |
| 12 tour rows: label, price, note, in order (DOM script: 0 problems) | `offers` group `tuk_tuk` | match |
| Rashguard USD 12, reef booties USD 15 | `offers` | match (script over all 34 copy rows: 0 unmatched) |
| Board sizes, leash, fins, wax, ID or passport, "refundable deposit", no amount | `rental_terms` | match; amount correctly left out (contradicted in dossier) |
| 5/5, 13 Google reviews, 5 November 2026 | `reviews.google`, `ratings[0]` | match; the rating links to the exact `mapUrl` |
| 4 testimonials, names as published, no dates | `reviews.quotes[]` | byte-identical to dossier, none `do_not_use`; all verbatim on each page (whitespace collapsed only). No added quote marks: no `<q>`, no `::before`/`::after` content, so Rossana's stray `”` is not doubled |
| Sanjee: head instructor, born in Weligama, ISA Level 1, Certified Surf Lifeguard, English and Sinhala | `business.owner_voice`, `credentials[]`, `languages_spoken` | match; sits under his heading only (review N5). No "founder", no years, no counts, no Tamil |
| Spot, season, 11 waves by level | `location.spot`, `season`, `surf_spots[]` | match |
| Swim 50 m, kids from 6, under 18 with guardian; cash LKR, USD, EUR | `requirements`, `booking.payment_on_the_day` | match |
| Address, plus code, phone, WhatsApp, email | `location.*`, `contact.*` | match, character for character |

Every page line outside `en.json` is an interface label or a restatement of a copy value. Not on any visible page: opening hours, a cancellation policy, Marcel, Panzer, founder, 150, 500+, 2,000, 3,000, Channel Islands, 40+, Instagram, Facebook, pool, "up to 2", Rosa (`text-*.txt` searched).

**Booking tap-through (390, touch).** Each hero button, tapped, navigates to `https://wa.me/94774004422?text=…`, and the digits equal `contact.whatsapp` `+94774004422`. Prefill names the business. All 22 wa.me links, plus `tel:+94774004422` and `mailto:sanjee@sanjee-surf.com`, are in the static HTML and work with JS off. After scrolling, a phone bar holds "Ask on WhatsApp" and a Call icon; both are hit-tested on top. Forward check on all three: `primary_action.class` = `hero_action.class` = `whatsapp`, `clicks_to_book` 1, against target whatsapp, 1. There is no phone icon in the phone header, so the fault found on Coconut Surf Inn does not recur here.

**Delivery.** Static `index.html` + `img/` only. No server code, no CMS call. 0 absolute paths, all filenames lowercase, 0 unreferenced image files, no secret, localhost or Supabase string. Third-party hosts on first load: Google Fonts only (`fonts.googleapis.com` + `fonts.gstatic.com` on calm and interactive, `fonts.gstatic.com` on unique). Allowed at 4e (critic `tools.md`), a defect at full mode. Embeds: 0. Forecast: none, per concepts.md §3.

**check-design facts:** all three `ok`, 0 problems, 0 warnings, ground `#FFFFFF`, 0 all-caps labels. Faces: calm Source Sans 3 + Mr Dafoe; interactive Manrope + Covered By Your Grace; unique Atkinson Hyperlegible + Shrikhand.

**Budget, playbook §4 (one throttled headless run, other sessions running; bytes equal the designers' audits, LCP within 148 ms):**

| Line | Target | calm | interactive | unique |
|---|---|---|---|---|
| First-load transfer | ≤ 1,500 KB | 277 | 232 | 307 |
| JS | ≤ 300 KB | 3.5 inline | 22 inline | 19 inline |
| Fonts | ≤ 2 families, ≤ 150 KB | 2, 45 | 2, 39 | 2, 37 |
| Largest image | ≤ 300 KB | 102 | 69 (hero, inline base64 in the HTML, so the tool reads 0) | 56 |
| LCP | ≤ 2,500 ms | 636 | 540 | 1,604 |
| CLS | < 0.1 | 0.0005 | 0.0006 | 0.0053 |
| Scroll CLS, early / settled | < 0.01 | 0.0025 / 0 | 0.0006 / 0 | 0.0067 / 0 |
| Third-party on load, other than fonts | 0 | 0 | 0 | 0 |

Overflow: 0 at 320, 360 and 390, with JS on and off, on all three. Tap targets under 44 px: 0 at both widths, on all three. All images have alt text.

**Rubric's visual hard-fail conditions, as facts for the two visual critics (not mine to rule on):**
- **Video.** `dossier.videos[]` has two `business-owned` clips (vid-001, vid-002), and no page uses video. No file exists (403) and concepts.md §2 records Alon's decision to go on stills.
- **First screen and photographs ≥ 1920 px.**
  - calm: img-002 (2000 px source) full-bleed. Phone uses its 692×1500 crop.
  - interactive: **hero is img-009, 1600×1067. No ≥ 1920 px photograph is on the first screen.** img-002 appears only at the closing band. This passes only if both visual critics accept the concept's reason (the only own frame of a person going out).
  - unique: img-002 is on the first screen. On desktop it is one of the two largest prints, overlapped by img-007 (seen on the sheet; its width was not measured). On a phone it is a 343×172 css strip behind img-007.

**Photographs used, all `business-owned` in the dossier:** calm 002, 005, 006, 008, 009, 013, 019; interactive 002, 006, 007, 009, 014, 018; unique 002, 005, 006, 007, 008, 009, 012, 014, 017, 018, 020. None of the rejected files (pool 015, generated 021–032, watermarked 035/041, review photos) appears. Owner items from concepts.md §6: img-007 may be a beach photographer's (used by interactive and by unique, where it is the phone hero's main print and the OG image); img-005, 008 show identifiable people (consent).

**Look-log (station check):** calm 9 rounds (1–4 first screen), interactive 6 (1–3 first screen), unique 6 (1–3 first screen). All meet three first-screen rounds. Interactive and unique keep only `shots/round-6`, so "visible change between rounds" cannot be checked for them. I did not compare calm's nine.

---

### calm

```
mode: quick    round: 1    variant: calm
total: 70.2 / 80 (dimension 8 pending)    result: passes critic gates; overall pending dimension 8
hard_fails: [] in dimensions 1–7
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 8 | Facts table: 0 mismatches. Week Intensive prints "5 private sessions" and "2 hours" side by side (`dist/index.html:366`), with USD 160 beside them, which can read as 2 hours in total. Dossier: "5 days × 2 hours". Price date only in "Before you book" (:382), far from the rental and tour rows |
| 2 | mobile + performance | 10 | Every budget line met with room to spare (table). No overflow from 320 to 390. Smallest phone text 15 px. Sheets show no overlap |
| 3 | booking CTA | 9 | Tap-through and forward check pass. Per-offer prefills name lesson, rental or tour, grammatical. Number printed in the footer. Not 10 only because the chat itself was not opened, by instruction |
| 4 | brand fit | 8 | First screen: what + where + action on img-002. Booking section order matches the audit's. No canvas, as briefed. No hours block (N10). No OG tags at all (playbook §10). People come before spot, a concept decision that departs from playbook §3's order |
| 5 | copy quality | 9 | Copy passed at 4c and renders whole. Footer shows unspaced "Call +94774004422". Languages line has no label |
| 6 | accessibility | 8 | axe 0 violations at both widths. 39 Tab stops, all visible with a ring, none obscured. Reduced motion: nothing running. Contrast over photo: h1 min 5.14, band line min 5.52. No skip link: 8 header stops before the hero's button (the tool's `has_skip_link: true` is a false positive, any `#` link passes) |
| 7 | delivery | 9 | Delivery evidence above. Google Fonts must be self-hosted by station 5 |

**Gating, quick mode:** no hard fail; dimensions 1, 3, 7 = 8, 9, 9, all ≥ 6. Result rests on dimension 8.

**Fix list, priority order:**
1. `:366` Week Intensive details: "2 hours" → "2 hours each", as interactive already has it.
2. `:379` and `:426` rating blocks: a bare "5 November 2026" can read as a review date. Say it is the capture date, e.g. "as of 5 November 2026".
3. After the rate table and the tour list: repeat "All prices are as of 5 November 2026." as unique does.
4. After `:298` `<body>`: add a skip link to `#lessons`.
5. `<head>` near `:6`: add OG title, description and image.
6. `:420` languages: label it "Languages: English | Sinhala". Footer phone: print "+94 77 400 4422".
7. Before station 5: self-host fonts.

---

### interactive

```
mode: quick    round: 1    variant: interactive
total: 68.2 / 80 (dimension 8 pending)    result: passes critic gates; overall pending dimension 8
hard_fails: [] in dimensions 1–7; see the ≥ 1920 px first-screen fact above
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Facts table: 0 mismatches. Week reads "5 private sessions \| 2 hours each" (`:420`), the clearest of the three. "for you" dots match `lessons[].level` exactly: Total beginner → Beginner only; I can stand up → Beginner + Private; Intermediate, Advanced → Private; Not sure → none; Week never. Board chart is true to scale: drawn at each type's top length, 12 viewBox units per foot, 4.1 px per unit. Price date only in "Before you book" (:450) |
| 2 | mobile + performance | 9 | All budget lines met. Hero is 69 KB of base64 inside a 193 KB HTML file, so it cannot be cached apart. Shader cost on a real phone not measured |
| 3 | booking CTA | 8 | Tap-through and forward check pass. Message builds correctly: "…about the Private Coaching. I'm a total beginner. The date I have in mind is 10 December 2026. There are 3 or more of us." and the send link carries it. **The phone number and email are printed nowhere** (`:599` and footer say only "Call", "Email"), while the closing line says "call the same number" and a desktop visitor gets a `tel:` link with no number to read. Grammar faults below sit in the visible bubble and the sent message |
| 4 | brand fit | 8 | First screen what + where + action. Tile-tap message inside the page, no form, as briefed. Prices stay visible, no card is hidden. Pill shows correct hardboard rates on a phone (capture `shots/interactive-rates-hardboard-phone.png`: USD 7, 12, 18, 20, 50, 95, 170, 310). OG has no image. Same §3 order departure as calm. The chart is hard-wired until the schema has board rows (concepts.md §6) |
| 5 | copy quality | 8 | Copy whole. Prefills: "the Private Coaching" (`:814` and the card link), "the Galle Fort", "the Hiriketiya Bay", "the Secret Beach Mirissa", with no word "tour" on any tour message |
| 6 | accessibility | 8 | axe 0 violations at both widths. 61 Tab stops. `#date` has no outline on focus, only a background change (`.date input:focus{background:#fff}`). `#bubble` `aria-labelledby` on a `<p>` (axe incomplete). Dots and roll cells are correctly `aria-hidden`. Reduced motion: canvas opacity 0, nothing running. Contrast over photo: h1 min 4.9 on phone and 4.49 on desktop (large text, moving water), band line min 5.02 |
| 7 | delivery | 9 | Delivery evidence above. Fonts must be self-hosted by station 5 |

**Gating, quick mode:** no hard fail in my dimensions; dimensions 1, 3, 7 = 9, 8, 9, all ≥ 6. Result rests on dimension 8 and on both visual critics accepting a first screen with no ≥ 1920 px photograph.

**Fix list, priority order:**
1. `:599` closing buttons and the footer: print "+94 77 400 4422" and `sanjee@sanjee-surf.com`, at least in the footer. Playbook §3 item 9.
2. `:814` and the static card and tour hrefs: drop "the" before Private Coaching, and name tours as calm does ("the Galle Fort tour").
3. `.date input:focus`: add a visible focus ring.
4. After the rate table and the tour list: repeat "All prices are as of 5 November 2026."
5. `:431` and `:499` rating blocks: mark the date as the capture date.
6. `#bubble` (`:437`): move `aria-labelledby` to a wrapper with a role, or drop it.
7. `<head>`: add an OG image.
8. Before station 5: self-host fonts. Consider moving the hero out of base64 so it can be cached.

---

### unique

```
mode: quick    round: 1    variant: unique
total: 66.9 / 80 (dimension 8 pending)    result: passes critic gates; overall pending dimension 8
hard_fails: [] in dimensions 1–7
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 8 | Facts table: 0 mismatches. Week reads "5 private sessions \| 2 hours" (`:441`), same ambiguity as calm. Price date repeated beside rentals (:468) and tours (:509), the best of the three. Hero line "5/5, 13 Google reviews, 5 November 2026" matches, date unmarked |
| 2 | mobile + performance | 9 | All budget lines met, LCP 1,604 ms. Scroll early 0.0067 is the nearest to the 0.01 line (`a.rate-line` and font swap). On a phone two hidden back-row prints are still fetched (`set-img-009` 14 KB, `set-img-018` 23 KB). Real-GPU swell cost not measured |
| 3 | booking CTA | 9 | Hero and bar go straight to WhatsApp. Lesson buttons open the sheet with the lesson preselected and need a second tap with JS on, and are plain wa.me links with JS off. Sheet message correct: "…the Beginner Lesson. My level: total beginner. Date: 10 December 2026. People: 3+." Send button in view at 390 (bottom 830 of 844). Not 10 only because the chat itself was not opened, by instruction |
| 4 | brand fit | 8 | First screen what + where + action + rating, a concept decision for the human. Bottom sheet as briefed. `og:image` is a relative path (`:11`), which preview scrapers may not resolve. Same §3 order departure |
| 5 | copy quality | 8 | Copy whole. Last strip card prints "Bodyboard" as heading and again as its row label (`:466`). Languages line has no label (`:483`). "Ask about this lesson" differs from `ctas.primary`, a template label stating no fact |
| 6 | accessibility | 7 | **axe serious on phone:** `#quotes` (`:489`) is a scroll region with no keyboard access (`scrollable-region-focusable`); `#strip` already has `tabindex="0"`. Desktop 0 violations. 39 Tab stops, all visible. Sheet is a native modal: Tab stays inside it and browser chrome, Esc closes, focus returns to the button that opened it. Reduced motion: canvas opacity 0, nothing running. Contrast: band line min 5.43, white on `#C72C60` 5.31 |
| 7 | delivery | 9 | Delivery evidence above. Fonts must be self-hosted by station 5 |

**Gating, quick mode:** no hard fail; dimensions 1, 3, 7 = 8, 9, 9, all ≥ 6. Result rests on dimension 8.

**Fix list, priority order:**
1. `:489` `#quotes`: add `tabindex="0"`, as `#strip` has.
2. `:441` Week Intensive: "2 hours" → "2 hours each".
3. `:399`, `:449`, `:488` rating lines: mark the date as the capture date.
4. `:466` Bodyboard card: remove the repeated label.
5. `:483`: label "Languages: English, Sinhala".
6. `:11`: make `og:image` an absolute URL at build. If img-007 is not cleared by the owner, it needs another image.
7. Phone: stop fetching the hidden back-row prints.
8. Before station 5: self-host fonts.

---

**What the designer prompt got wrong:** concepts.md §3 says "'5 private sessions' and '2 hours' stay together" without giving the words, and two of three builds printed them so a visitor can read two hours in total. The copy has no field for this (`durationMin` 120 sits beside `groupSize` "5 private sessions"), so a concept that combines fields should give the exact rendered string. Separately, "secondary contact as designed buttons" (§3) let interactive drop the printed number and email, although playbook §3 item 9 asks for a contact block; the concept rule should say the label on at least one Call button is the number itself. The designer checklist should also ask for OG tags: all three differ, and none is complete.

**The sentence the human needs:** all three meet every budget line and go to the right WhatsApp number in one tap; calm scores 70.2, interactive 68.2 and unique 66.9 of 80 on dimensions 1–7, interactive's first screen carries no photograph of 1920 px or more, and interactive prints no phone number or email.

**Not checked or not measured:**
- No wa.me page opened and no message sent, so landing in a chat and whether that number is answered are untested.
- No real phone or real GPU: Chromium headless with software GL, so shader frame rate and battery cost are unknown. iOS Safari not tested.
- No screen reader run; axe and DOM inspection only.
- LCP is one throttled run on a machine shared with other sessions, and fonts came from Google rather than self-hosted.
- Old-site comparison not scored: it belongs to dimension 8, so the old-site captures were not opened.
- Image rights and consent are owner items, not verifiable here.
- Contrast over photographs was probed for the hero, header (calm, interactive) and feature or closing lines only, with one still of moving water per element.

---

## Round 2, quick (station 4f)

critic 0.4.3 · rubric 0.3.1 · 2026-11-05 · reworked mockups at commit 73218e5, `sites/sanjee-surf-school/mockups/{calm,interactive,unique}/dist/` (designer 0.7.1; `index.html` last written 17:30 / 17:31 / 14:30 local). Served on :9340 / :9341 / :9342 from a plain static server (`tools/_serve.mjs`), stopped afterwards. Each page was re-scored from scratch. I did not read any visual-critic or experience-critic report for either round, and I read designer `notes.md` only after my scores were set, and then only the look-log.

Same checks, same order and same viewports for all three. Evidence is in `reports/2026-10-midigama-01/critic-sanjee-surf-school-r2/`:

- `audit-{calm,interactive,unique}.json`: `tools/audit-mockup.mjs`. **Scratch copy:** port 8980 → 9343, and the output goes to my folder so the designers' `audit.json` stays untouched. Nothing else changed.
- `tools/check-design.mjs --no-shots` on each page path. **Scratch copy:** port 8960 → 9346, nothing else changed.
- `shots/{calm,interactive,unique}/`: `tools/shoot.mjs` at 1440×900 and 390×844 (gitignored scratch). Zero console errors.
- `lcp.json`: three throttled phone runs each, with every LCP candidate, Element Timing on the images and H1, and CDP bytes before and after a full scroll.
- `flows.json`, `interactive-messages.txt`, `unique-messages.txt`: tap-through and every message combination. Off-site navigation was aborted and recorded. **No wa.me page was opened and nothing was sent.**
- `a11y.json`: axe-core (WCAG 2.0/2.1 A+AA) after a full scroll at 390 and 1440, a Tab walk, and reduced motion.
- `probe.json`: pixel contrast with the text hidden, over photographs; font-size census; a second Tab walk with scroll settled; quote checks.
- `facts.json`, `text-*.txt`, `images.json`, `extra.json`: rendered text with JS on at 390 and 1440, JS off at 390; hrefs; images and alt; DOM rental rows; skip links; small phones.
- `funnel-*/funnel.json`: `tools/funnel.mjs --depth 3` as a forward check (full-mode evidence, run early).

**Rubric arithmetic (fact for the human):** dimension weights 1–7 sum to 80, so totals below are out of 80.

### Shared evidence

**Facts table, re-checked from the rendered pages.** 0 contradicted values and 0 claims without a dossier entry, on any page.

| Claim on page | Dossier key | Result |
|---|---|---|
| 3 lessons: USD 40, 50, 160; levels; includes | `lessons[]`, `includes` | match on all three |
| "2 hours" on Beginner and Private; "**2 hours each**" on Week beside "5 private sessions" | `lessons[].duration_as_written`, `lessons[2].note` "5 private 2-hour sessions" | match. All three now say "each" (calm `:408`, interactive card, unique `:444`) |
| 16 rental rows, read from the DOM by duration and kind; notes; bodyboard USD 5 per day | `rentals[]`, `offers` | match. Interactive's phone pill, both states: all 8 prices right, and the capture shows USD 7, 12, 18, 20, 50, 95, 170, 310 |
| 12 tour rows: label, price, note, in order (DOM script: 0 problems) | `offers` group `tuk_tuk` | match |
| Rashguard USD 12, reef booties USD 15 | `offers` | match (script over all 34 copy rows: 0 unmatched) |
| Board sizes, leash, fins, wax, ID or passport, "refundable deposit", no amount | `rental_terms` | match; amount correctly absent |
| Interactive's chart: 6 types, labels, drawn lengths | `rental_terms.quiver[]` | match. Each board is drawn to its top length at 4.10 css px per inch (6'4 = 320 px, 9'4 = 467 px at 1440), and the pale band at the nose is the size range (5'8–6'4 = 10.53 % of the board) |
| "5/5", "13 Google reviews", "**as of** 5 November 2026" | `reviews.google`, read 2026-11-05 | match. Marked as the capture date everywhere it appears. Every rating links to the exact `mapUrl` |
| "All prices are as of 5 November 2026." at lessons, rentals and tours | `offers_note`, captured 2026-11-05 | match. All three pages now carry it in all three places |
| 4 testimonials, names as published, no dates | `reviews.quotes[]` | byte-identical to dossier, none `do_not_use`; verbatim on each page. No `<q>`, no added quote marks |
| Sanjee: head instructor, born in Weligama, ISA Level 1, Certified Surf Lifeguard | `business.owner_voice`, `credentials[]` | match; under his heading only. No "founder", no years, no counts |
| "Languages: English \| Sinhala" | `languages_spoken` | match; no Tamil |
| Spot, season, 11 waves by level | `location.spot`, `season`, `surf_spots[]` | match |
| Swim 50 m, kids from 6, under 18 with guardian; cash LKR, USD, EUR | `requirements`, `booking.payment_on_the_day` | match |
| Address, plus code, "+94 77 400 4422", `sanjee@sanjee-surf.com` | `location.*`, `contact.*`, `contact.whatsapp.verified` (the printed form) | match, and hrefs are character for character |
| Interactive's "for you" dots and fit chips | `lessons[].level`, prices | match. Total beginner → Beginner; I can stand up → Beginner + Private; Intermediate, Advanced → Private; Not sure → none; Week never |
| Template words: "per lesson", "per hour", "per day", "Soft-top", "Hardboard", "Duration", "Note", "Date", "People", "Your message", "Add to my message", "Open in Google Maps", "Menu", "\| Google" | restate copy or state no fact | no claim added |

The copy is whole on all three: the only `en.json` strings absent from the DOM are machine values and rental labels split into table cells. Visible text on all three has no opening hours, cancellation policy, Marcel, Panzer, founder, 150, 500+, 2,000, 3,000, Channel Islands, 40+, Instagram, Facebook, pool, Tamil, "up to 2" or Rosa (`text-*.txt` searched). Copy review's R2-N2 holds: [4] ¶3 and ¶4 sit directly above the tour rows on phones, directly above on calm's desktop, and sticky beside them on interactive's and unique's desktop.

**Pre-filled messages, read from hrefs.**

- **Static:** all 22 wa.me links on each page, with JS off too, go to `94774004422` and name the business and the offer. Grammar is fixed on interactive ("about Private Coaching", "the Galle Fort tour").
- **Interactive:** I set every combination, 450 states of level × lesson × date × people, and read all 22 links in each. That gave 1,620 distinct messages, 0 wrong numbers, and the send link always equal to the visible bubble. Every sentence is the visitor's own: "I'm a total beginner.", "The date I have in mind is 10 December 2026.", "There are 3 or more of us.", "I'm not sure of my level yet.", "a surf lesson, I'm not sure which one." **No sentence adds a claim about the school.** Buttons about their own subject keep it and add the visitor's details: "…about the Surf Spot Safari tour. I'm a total beginner. The date I have in mind is 10 December 2026. There are 3 or more of us."
- **Unique:** all 270 sheet combinations give 270 messages from 14 sentences: "…the Beginner Lesson. My level: total beginner. Date: 10 December 2026. People: 3+." **No claim added.**
- **Calm:** static only, nothing changes.

**Booking tap-through (390, touch).** On all three the hero button navigates to `https://wa.me/94774004422?text=…`, equal to `contact.whatsapp`. After scrolling, a phone bar holds "Ask on WhatsApp" and a Call icon, both hit-tested on top. Forward check on all three: `primary_action.class` = `hero_action.class` = `whatsapp`, `clicks_to_book` 1, against target whatsapp, 1.

**Delivery.** Static `index.html` + `img/` only. No server code, no CMS call, 0 absolute paths, lowercase filenames, 0 unreferenced image files, no credential, localhost or Supabase string (text search of each `index.html`; its "Secret" hits are "Secret Beach"). Third-party hosts on first load **and after a full scroll and all interactions**: Google Fonts only (`fonts.googleapis.com` + `fonts.gstatic.com` on calm and interactive, `fonts.gstatic.com` on unique). Allowed at 4e (critic `tools.md`), a defect at full mode. Embeds: 0. Forecast: none.

**check-design facts:** all three `ok`, 0 problems, 0 warnings, ground `#FFFFFF`, 0 all-caps labels. Faces: calm Source Sans 3 + Mr Dafoe; interactive Manrope + Courgette; unique Figtree + Shrikhand.

**Budget, playbook §4.** `audit-mockup.mjs`, one throttled run, then three more of my own; other sessions were running.

| Line | Target | calm | interactive | unique |
|---|---|---|---|---|
| First-load transfer | ≤ 1,500 KB | 299 | 402 | 295 |
| Three further runs, CDP bytes | | 296 | 395 | 297 |
| After a full scroll | not a budget line | 823 | 617 | 614 |
| JS | ≤ 300 KB | 4.2 inline | 24.5 inline | 21.4 inline |
| Fonts | ≤ 2 families, ≤ 150 KB | 2, 45 | 2, 42 | 2, 35 |
| Largest image | ≤ 300 KB | 102 | 134 | 80 |
| LCP, tool | ≤ 2,500 ms | 1,656 | **856, the H1** | 1,644 |
| Hero photo paints (Element Timing, 3 runs) | | 1,644–1,648 | **2,120–2,168** | 1,632–1,656 |
| CLS | < 0.1 | 0.0005 | 0.0006 | 0 |
| Scroll CLS, early / settled | < 0.01 | 0.0003 / 0 | 0.0004 / 0 | 0.0048 / 0 |
| Third-party on load, other than fonts | 0 | 0 | 0 | 0 |

HTML is 73 / 106 / 79 KB and counted uncompressed, since the test server does not compress. Overflow: 0 at 320, 360 and 390, with JS on and off, on all three. Tap targets under 44 px: 0 at both widths, on all three, and interactive's fit chips and bar line are 44 px once they appear.

**When the photo really arrives on interactive.** Chromium does name the H1, in every run, and it never reports the photograph at all. The photograph's response ends at 2,094–2,117 ms and it paints at 2,120–2,168 ms. On calm and unique the photograph is the final LCP candidate, so their tool numbers are true. **Cause, tested:** the interactive hero is exactly 390×844, the whole viewport. With its stage forced to 804 px in my test (nothing else changed), Chromium names the IMG at 2,136–2,160 ms. So the honest LCP for interactive is about 2.15 s, under 2.5 s, and the tool's 856 ms should not be quoted as its photo time.

**Rubric's visual hard-fail conditions, as facts for the two visual critics (not mine to rule on):**
- **Video.** `dossier.videos[]` has two `business-owned` clips (vid-001, vid-002), and no page uses video. No file exists (403) and concepts.md §2 records Alon's decision to go on stills.
- **First screen and photographs ≥ 1920 px.**
  - calm: img-002 (2000 px source) full-bleed, served from a 1960 px crop on desktop and 692×1500 on a phone. A print of img-006 (480×271 css on desktop, 342×193 on a phone) now overlaps its lower edge.
  - interactive: **hero is now img-018, 1440×1920.** Its long edge is 1920 and its width is 1440. It is served at 1440×1100 on desktop and 1000×1846 on a phone, so a screen wider than 1440 upscales it. img-002 appears only at the closing band (`:606`). concepts.md §2 counts the long edge of portraits; whether that meets the rule is for the visual critics.
  - unique: img-002 is now the full-bleed ground of the first screen (1440 or 2000 px on desktop, 900×1080 at 390×470 css on a phone), with img-007 and img-006 prints over it.

**Photographs used, all `business-owned` in the dossier:** calm 002, 005, 006, 008, 009, 012, 013, 014, 017, 018, 019, 020 (from `src/make-media.sh`; 005, 006, 008 by alt and sight); interactive 002, 005, 006, 007, 009, 010, 012, 014, 018; unique 002, 005, 006, 007, 008, 009, 012, 014, 017, 018. None of the rejected files appears.

**Owner items.** `provenance_flag` in the dossier: img-007 (interactive `:516`, unique `:411`) and **img-010, new in this round: interactive's Advanced tile (`:412`), which concepts.md §2 held in reserve.** Identifiable people, consent: img-005 on all three; img-008 on calm and unique.

**Departures from concepts.md (not amended since 386f4d9), facts for the human:** interactive's hero (img-009 → img-018), title position and title face (Covered By Your Grace → Courgette); unique's first screen (five prints on white → img-002 ground with two prints) and text face (Atkinson Hyperlegible → Figtree); calm's print over the hero and Sanjee's section placed before boards.

**Look-log (station check):** first-screen rounds: calm 1–4, interactive 1–3, 7, 8, unique 1–3. All meet three. Only the latest shots folders are kept (calm 9–13, interactive 11, unique 9), so "visible change between rounds" cannot be checked for the earlier ones.

---

### calm, round 2

```
mode: quick    round: 2    variant: calm
total: 75.0 / 80 (dimension 8 pending)    result: passes critic gates; overall pending dimension 8
hard_fails: [] in dimensions 1–7
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | Facts table: 0 mismatches. "2 hours each" (`:408`), "as of" on every rating (`:421`, `:452`), price date at lessons, rentals (`:488`) and tours (`:578`) |
| 2 | mobile + performance | 10 | Every budget line met with room to spare. LCP is the photograph at about 1.65 s. No overflow from 320 to 390. Smallest phone text 15 px. No canvas |
| 3 | booking CTA | 9 | Tap-through and forward check pass. 22 links with per-offer prefills. Number and email printed in the footer. Not 10 only because the chat itself was not opened, by instruction |
| 4 | brand fit | 8 | First screen what + where + action on img-002. Calm has no canvas. OG title, description and image added, but `og:image` is relative (`:12`). custom.md allows only header, title and action on the first screen; the img-006 print (`:363`) is a further element over the photograph. Menu says Boards then Sanjee (`:344`), the page runs Sanjee (`:439`) then Boards (`:476`). People come before spot, as in round 1 |
| 5 | copy quality | 9 | Copy whole. Footer number and languages label fixed. The H1 and the next lead repeat "Surf lessons in Weligama", and the closing's three buttons repeat at once in the footer |
| 6 | accessibility | 9 | axe 0 violations at both widths. 40 Tab stops, all with a ring, none obscured. Skip link is first, visible at top 12 px once its transition ends, and lands on Lessons. Reduced motion: nothing running. Contrast over photo: h1 min 5.26, header name 5.33, band line 5.52. Not 10: no screen-reader run |
| 7 | delivery | 9 | Delivery evidence above. Google Fonts must be self-hosted by station 5 |

**Gating, quick mode:** no hard fail; dimensions 1, 3, 7 = 10, 9, 9, all ≥ 6. Result rests on dimension 8.

**Round 1 fix list:** 1 "2 hours each": landed. 2 rating date marked: landed. 3 price date repeated: landed. 4 skip link: landed. 5 OG tags: landed, with a relative image path. 6 languages label and footer number: landed. 7 self-host fonts: not yet, due by station 5.

**Remaining fix list, priority order:**
1. `:12`: make `og:image` absolute at build, so previews can resolve it.
2. `:344`, `:348`: put the menu in page order, Sanjee before Boards.
3. Before station 5: self-host fonts.

---

### interactive, round 2

```
mode: quick    round: 2    variant: interactive
total: 70.4 / 80 (dimension 8 pending)    result: passes critic gates; overall pending dimension 8
hard_fails: [] in dimensions 1–7; see the first-screen fact above
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | Facts table: 0 mismatches. Chart true to scale, dots match `lessons[].level`, phone pill right in both states, 450 message states add no claim |
| 2 | mobile + performance | 8 | All budget lines met, but it is the nearest to the LCP line: photo at about 2.15 s of 2.5 s, and five lazy tiles (118 KB) load with it and finish first. Once anything is chosen, the fixed phone footer grows to 116 px of 844 (`.bar-msg`, top 728). Chart labels are 13 px on a phone (`:322`). The shader now runs at up to 2× DPR on phones; its real-GPU cost is not measured |
| 3 | booking CTA | 9 | Tap-through and forward check pass. All 22 links carry the choices. Number and email now printed. A past date typed in is sent as "1 January 2020" (`:992`; the picker's `min` only stops the picker). Not 10 also because the chat itself was not opened, by instruction |
| 4 | brand fit | 8 | First screen what + where + action. Tile-tap message inside the page, no form, as briefed. Prices stay visible, no card hidden. `og:image` relative (`:11`). Chart still hard-wired until the schema has board rows. On a phone the Week paragraph (`:456`) sits under the swipe row, not on the Week card, a designer's trade-off recorded in the look-log. People before spot, as in round 1 |
| 5 | copy quality | 9 | Copy whole. Prefill grammar fixed. The phone bar line starts in lower case: "the Week Intensive. I'm a total beginner. The date …" (`:903`). Contact buttons repeat at once in "Finding us" and the footer |
| 6 | accessibility | 7 | axe 0 violations at both widths. 62 Tab stops, all with a visible ring, including all four on the date field. **New:** on a phone each rate cell keeps both digits as live text. The computed name is right ("USD 5"), but the AX tree also holds StaticText "5" and "7", and `innerText` reads "USD 5 7" (`:1017`–`:1022`). What a screen reader says was not tested. Reduced motion: canvas opacity 0, nothing running. Contrast over photo: h1 min 9.21 on phone and 5.34 on desktop, band line 8.69, closing line 6.12 |
| 7 | delivery | 9 | Delivery evidence above. Hero is no longer base64. Fonts must be self-hosted by station 5 |

**Gating, quick mode:** no hard fail in my dimensions; dimensions 1, 3, 7 = 10, 9, 9, all ≥ 6. Result rests on dimension 8, and on both visual critics' reading of img-018 against the first-screen rule.

**Round 1 fix list:** 1 number and email printed: landed. 2 prefill grammar: landed. 3 date focus ring: landed. 4 price date repeated: landed. 5 rating date marked: landed. 6 `#bubble` labelling: landed, now on a wrapper with `role="status"`. 7 OG image: landed, with a relative path. 8 fonts: not yet; hero out of base64: landed.

**Remaining fix list, priority order:**
1. `:1017`–`:1022`: put the rolling digits in an `aria-hidden` span and keep the one true price as hidden text, so the unused digit is not page text.
2. `:412`: tile images. The Not sure tile is 58 KB and all five load with the hero. Give them `srcset`, so the photo lands further from the line.
3. `:992`: ignore or clear a date earlier than `min`.
4. `:11`: make `og:image` absolute at build.
5. `:903`: capitalise the bar line's first word.
6. `:412` img-010: owner must clear it, or use another tile picture.
7. Before station 5: self-host fonts.

---

### unique, round 2

```
mode: quick    round: 2    variant: unique
total: 73.5 / 80 (dimension 8 pending)    result: passes critic gates; overall pending dimension 8
hard_fails: [] in dimensions 1–7
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | Facts table: 0 mismatches. "2 hours each" (`:444`), rating marked "as of" on the hero line too (`:405`), price date at rentals (`:471`) and tours (`:513`) |
| 2 | mobile + performance | 9 | All budget lines met, LCP the photograph at about 1.65 s. Scroll early 0.0048 is the nearest to the 0.01 line, from font swap (`#text`). The phone no longer fetches hidden back-row prints. Real-GPU swell cost not measured |
| 3 | booking CTA | 9 | Hero and bar go straight to WhatsApp. Lesson buttons open the sheet with the lesson chosen, and are plain wa.me links with JS off. Send button at bottom 830 of 844; at 320×568 and 360×640 the sheet scrolls and Send stays on top and tappable. `#sheet-date` has no `min`, so a past date can be picked (`:604`). Not 10 also because the chat itself was not opened, by instruction |
| 4 | brand fit | 8 | First screen what + where + action + rating, a concept decision for the human. Bottom sheet as briefed. OG image is now img-002, so it no longer leans on flagged img-007, but its host `sanjee-surf-school.os1.workers.dev` (`:11`) is an assumption until station 6 names the Worker. People before spot, as in round 1 |
| 5 | copy quality | 9 | Copy whole. Repeated Bodyboard label gone, languages labelled. Sheet messages read as a form ("My level: …. Date: …. People: 3+."), usable but terse. "Ask about this lesson" differs from `ctas.primary`, a label stating no fact |
| 6 | accessibility | 9 | axe 0 violations at both widths, `#quotes` fixed. 40 Tab stops, all visible. Sheet is a native modal: Tab stays inside it and browser chrome, Esc closes, focus returns to the opening button; radio focus shows on the tile, the date field's calendar stop has the browser's ring. Reduced motion: canvas opacity 0, nothing running. Contrast: h1 min 6.13, hero rating line 7.14, band line min 4.65 at 34 px and over. `:565` alt says three dogs, as the dossier does; I count four in the picture, and calm's alt says four |
| 7 | delivery | 9 | Delivery evidence above. Fonts must be self-hosted by station 5 |

**Gating, quick mode:** no hard fail; dimensions 1, 3, 7 = 10, 9, 9, all ≥ 6. Result rests on dimension 8.

**Round 1 fix list:** 1 `#quotes` keyboard access: landed. 2 "2 hours each": landed. 3 rating date marked: landed. 4 Bodyboard repeat: landed. 5 languages label: landed. 6 `og:image` absolute: landed, host to be confirmed. 7 hidden prints on phones: landed. 8 fonts: not yet.

**Remaining fix list, priority order:**
1. `:604`: give `#sheet-date` the same `min` as interactive, and ignore earlier dates.
2. `:11`: confirm the `og:image` host at station 6, or set it at build.
3. `:492`: `#quotes` is a Tab stop on desktop, where it does not scroll. Add `tabindex` only when it overflows.
4. `:565`: alt "Three beach dogs" → "Four beach dogs". The dossier's description also says three; a harvester correction, not the designer's.
5. `:411` img-007: owner must clear it; this page and interactive depend on it.
6. Before station 5: self-host fonts.

---

**What the designer prompt got wrong:** nothing asks for one value in the DOM per price, and the concept's "rolling digits" invites keeping both, so interactive's phone table now carries the unused digit as text; a motion pattern for prices should say the digits are decoration and the price stays as one text node. Nothing says how `og:image` is written at mockup stage, since the host is unknown until station 6, and the three builds now do it two ways. The date controls have no stated rule for past dates, so one page has `min`, the other none, and neither blocks a typed date. Separately, `tools/audit-mockup.mjs` cannot see a hero that exactly fills the viewport, because Chromium drops it from LCP, so the rubric's LCP line can pass on the H1 alone; the tool should report the hero's Element Timing as well. That is a tool change for a proposal, and none is written at this stage.

**The sentence the human needs:** all three meet every budget line and go to the right WhatsApp number in one tap with no pre-filled claim added; calm scores 75.0, unique 73.5 and interactive 70.4 of 80 on dimensions 1–7, interactive's hero photo paints at about 2.15 s against about 1.65 s on the others, its first-screen photograph is 1440 px wide with a 1920 px long edge, and it now also uses the provenance-flagged img-010.

**Not checked or not measured:**
- No wa.me page opened and no message sent, so landing in a chat and whether that number is answered are untested. I could not test a real WhatsApp hand-off of the longest messages.
- No real phone or real GPU: Chromium headless with software GL, so shader frame rate and battery cost are unknown on interactive and unique. iOS Safari not tested, including its date field.
- No screen reader run; axe, the Chromium AX tree and DOM inspection only. So how interactive's rate cells are actually read is unknown.
- LCP is four throttled runs per page on a machine shared with other sessions, phone only, with fonts from Google rather than self-hosted, and the HTML uncompressed. A real Worker will compress it.
- Old-site comparison not scored: it belongs to dimension 8, so the old-site captures were not opened.
- Image rights and consent are owner items, not verifiable here.
- Contrast over photographs was probed for the hero, header and feature or closing lines only, with one still of moving water per element. Under SwiftShader, unique's scrolled prints can look cut by a straight line, a known capture artefact, so I did not score it.
- `shots/` in my folder is gitignored scratch and has not been cleaned. `tools/clean-shots.mjs` remains to be run after the round.

---

## Round 3, quick (station 4f), interactive only

critic 0.4.3 · rubric 0.3.1 · 2026-11-05 · reworked mockup at commit 2784af5, `sites/sanjee-surf-school/mockups/interactive/dist/` (designer 0.7.1). Alon limited this round to interactive, so calm and unique were not re-scored and their round 2 scores stand as written. Served on :9347 from a plain static server (`tools/_serve.mjs`), stopped afterwards. Scored from the rendered page, not by adjusting round 2. I did not read a visual-critic or experience-critic report, and I read the designer's look-log only after my scores were set.

Evidence is in `reports/2026-10-midigama-01/critic-sanjee-surf-school-r3/`:

- `audit-interactive.json`: `tools/audit-mockup.mjs`. **Scratch copy:** port 8980 → 9348, output moved to my folder so the designer's `audit.json` stays untouched, imports made absolute. Nothing else changed.
- `tools/check-design.mjs --no-shots` on the page path. **Scratch copy:** port 8960 → 9349, imports made absolute. Nothing else changed.
- `perf.json`: hero Element Timing, LCP candidates, long tasks, swell start, scroll CLS, network by file.
- `contrast.json`: pixel contrast with the text hidden, at seven sizes, two stills of the moving water each, and with the photograph absent.
- `flows.json`: 450 message states, typed dates, rate cells with the AX tree, tile taps, axe, Tab walk, reduced motion, header colour through the first scroll.
- `extra.json`: typed-date control, Android-like fallback, settled Tab walk, hover pill, hosts after all interactions, the mechanical facts check.
- `midpage-font.json`, `midpage-font-causes.json`: fonts landing while the visitor is mid-page.
- `text-interactive-*.txt`: rendered text with JS on at 390 and 1440, JS off at 390.
- `shots/` (gitignored scratch): `tools/shoot.mjs` at 1440×900 and 390×844, 12 and 17 captures, 0 console errors, plus the crops named below.

### interactive, round 3

```
mode: quick    round: 3    variant: interactive
total: 65.9 / 80 (dimension 8 pending)    result: passes critic gates; overall pending dimension 8
hard_fails: [] in dimensions 1–7
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches, 0 unsourced claims. Rendered text is byte-identical to round 2 on desktop and with JS off; on a phone only the rate cells changed. Mechanical re-check against `dossier.json`: 8 rental rows × 2 prices, 12 tours, 3 lessons, 3 extras, 4 quotes byte-identical, address, `tel:`, `mailto:`, maps link. No pre-filled sentence adds a claim |
| 2 | mobile + performance | 8 | Every budget line met. Photo paints at 1,660–1,692 ms (round 2: 2,120–2,168). CLS 0.0009, scroll early 0.0009, settled 0. Not higher: when fonts land while the visitor is below the first screen the phone jumps, up to 0.10 here, and the same-width fallback does not prevent it (below). After a two-lesson tile tap the bottom of the phone is 228 px chips and bar: 27 % at 844, 40 % at 568. Chart labels still 13 px on a phone (`:338`) |
| 3 | booking CTA | 6 | Hero taps through to `wa.me/94774004422`, the bar and Call are on top, 22 links right in all 450 states. **But the round 3 date fix broke typing: any date typed with the keyboard is wiped at the first digit of the year, a future one too, and never reaches the message** (`:1032`, proved by control below). A visitor who types a date notices it. The booking still goes, without the date, so this does not reach a hard fail. The chat itself was not opened, by instruction |
| 4 | brand fit | 8 | First screen what + where + action. Tile-tap message inside the page, no form, as briefed. Menu is in page order. `og:image` now absolute. Unchanged from round 2: chart hard-wired until the schema has board rows, Week paragraph under the swipe row on a phone, people before spot |
| 5 | copy quality | 9 | Copy whole. Bar line capitalised in every state read ("The Week Intensive.", "A surf lesson, I'm not sure which one. I'm a total beginner."). Contact buttons still repeat at once in "Finding us" and the footer |
| 6 | accessibility | 7 | Rate cells fixed: one price in `innerText` and the AX tree. axe 0 violations at both widths, default and with choices made. 62 Tab stops, none off screen or under the header. Reduced motion: canvas opacity 0. Text contrast meets AA over the photograph. Lost: the date field cannot be filled by typing (keyboard route); the new nav hover pill drops white 15 px text to a median of 3.92–4.38; `:531` alt says "two more heads" and the new wide crop has one |
| 7 | delivery | 9 | Static `index.html` + `img/`. Third-party hosts after load, full scroll and every control: `fonts.googleapis.com` + `fonts.gstatic.com` only, allowed at 4e, a defect at station 5. 0 embeds, 0 absolute paths in `src`/`href`, 0 unreferenced files, lowercase names, no credential, localhost or Supabase string. `og:image` is the one absolute URL to our own host, and that Worker is not named until station 6 |

**Gating, quick mode:** no hard fail in my dimensions; dimensions 1, 3, 7 = 10, 6, 9, all ≥ 6. Dimension 3 is on the floor. Result rests on dimension 8.

**Typed date, measured.** Real key presses in Chromium; the field was dd/mm/yyyy in every run, whatever the context's locale.

| Typed | On this page | Same page, only `:1032` removed in my test |
|---|---|---|
| 10 12 2026 | one `change`, value `0002-12-10`, field cleared; shows `dd/mm/0026`; value empty; **no date in the message** | four `change` events ending `2026-12-10`; "The date I have in mind is 10 December 2026." |
| same, 400 ms between keys | same result | not run |
| Year retyped on a good date (2026-12-10 → 2027) | cleared at the first digit, the good date is lost | not run |
| 01 01 2020 | not sent, field empty: the round 2 fault is gone | |

Cause: Chromium fires `change` on each year digit, so the year reads 0002 first, which is earlier than `min`. A whole value set at once behaves correctly: 2020-01-01 is cleared and 0 links carry it, 2026-11-04 is cleared from the field and the bubble, 2026-11-05 and 2026-12-10 are kept. Arrow keys on a segment also work. Native phone pickers should hand over a whole value, but I could not run one, nor a year-first field order.

**Pre-filled messages, read from hrefs.** All 450 states of level × lesson × date × people, all 22 links in each: 945 distinct messages, **0 problems**. Every link goes to `94774004422`, and the send link always equals the bubble.
- **Nine outings** (Weligama Bay, Midigama Reef Breaks, Mirissa, Ahangama & Kabalana, Secret Beach, Turtle Bay, Handunugoda, Galle Fort, Hiriketiya) never carry the level, and do carry date and people.
- **Three surf tours, three cards, the board button and the general links** keep the level in every state where one is set.
- **The 29 sentences** are the subject line or the visitor's own words about level, date and people. **No sentence adds a claim about the school.**
- A fact for the human: three of the nine outings mention surfing, two of them saying it depends on skill or ability (Midigama `:588`, Ahangama `:596`, Hiriketiya `:616`), so the owner gets no level for them. That follows the instruction and misleads nobody.

**Rate cells on a phone, both states and back.** `innerText` reads one true price: USD 5, 8, 12, 15, 36, 70, 120, 220 and USD 7, 12, 18, 20, 50, 95, 170, 310. The AX tree holds `cell "USD 7"` with one StaticText "USD 7", no spare digits, and the column header follows the switch ("Soft-top", "Hardboard"). The digits a sighted visitor sees match in every row, read from their position and on the capture. Desktop keeps the two real columns and no `.roll`. What a screen reader says aloud was not tested.

**Hero paint, phone throttled per playbook §4, 3 runs.** The tool's LCP names the H1 again (`audit` 580 ms, my runs 452–484 ms), so do not quote it as the photo time.

| | Round 2 | Round 3 |
|---|---|---|
| Hero response ends | 2,094–2,117 ms | 1,480–1,508 ms |
| Hero paints (Element Timing) | 2,120–2,168 ms | **1,660–1,692 ms** |
| Swell visible | | 1,676–1,712 ms, about 20 ms after the photo |

The photo paints about 185 ms after it arrives. Two main-thread tasks of about 72 and 100 ms sit in that gap; they are probably the swell's texture upload and first draw on software GL, though I did not attribute them. It paints at about 1,504 ms in the runs that scroll at load. Five lazy tiles (86 KB) still load with it and all finish first. On a 2× phone `srcset` still picks the larger file for four tiles (46vw × 2 = 359 px); the Not sure tile fell from 58 to 32 KB. Desktop throttled: paint 1,676 ms.

**Budget, playbook §4.**

| Line | Target | Round 3 |
|---|---|---|
| First-load transfer | ≤ 1,500 KB | 371 (3 runs, CDP: 365) |
| After a full scroll | not a budget line | 587 |
| JS | ≤ 300 KB | 25.8 inline, uncompressed |
| Fonts | ≤ 2 families, ≤ 150 KB | 2, 42 |
| Largest image | ≤ 300 KB | 134 |
| LCP, tool | ≤ 2,500 ms | 580, the H1; photo as above |
| CLS | < 0.1 | 0.0009 |
| Scroll CLS, early / settled | < 0.01 | 0.0009 / 0 |
| Third-party on load, other than fonts | 0 | 0 |

Overflow: 0 at 320, 360, 390 with JS on and off, and at 1440. Tap targets under 44 px: 0 of 60.

**Text contrast on the hero, white ink on desktop, ink on phone.** Lowest value over two stills, then 5th percentile. The only text with a lowest value below 4.5 is the title, at 1440, 1920 and 2560: single pixels in 56 px bold, where AA large text needs 3:1 and the rubric's flat line says 4.5. Each row takes the worst of each column, so a nav lowest and percentile can come from different links.

| Size | Wordmark | Nav, worst link | Title |
|---|---|---|---|
| 1440×900 | 5.06 / 6.40 | 4.56 / 4.72 (Boards, Sanjee) | **4.22** / 5.38 |
| 1920×1080 | 5.00 / 6.68 | 6.57 / 6.64 | 4.48 / 5.38 |
| 2560×1440 | 6.13 / 6.73 | 6.60 / 6.64 | 4.41 / 5.59 |
| 390×844 | 8.41 / 8.48 | Menu 14.29 | 9.27 / 9.38 |
| Extra: 768×1024 | 6.02 / 6.05 | Menu 11.34 | 4.70 / 5.55 |
| Extra: 1280×620 | 5.47 / 6.46 | 5.17 / 5.75 | 4.70 / 5.44 |
| Extra: 1024×768 | 6.06 / 6.10 | 5.34 / 6.00 | 4.70 / 5.80 |

- **Photo not arrived** (the title paints over a second before it): title 5.79 at 1440, 6.15 at 2560, 8.99 on a phone.
- **Hero button:** 11.05 throughout.
- **Header through the first scroll, 1440:** white only while over the hero, solid by scroll 80 and from then on; solid on an anchored load. White ink never rests on the white ground.
- **Nav hover pill, new (`:83`):** at 1440, Boards min 3.29 / median 3.92, Lessons 3.40 / 4.22, Finding us 4.12 / 4.38. Hover state only, under 4.5.
- **Other lines:** feature line min 8.77 at all desktop sizes; closing line min 6.68; 6.09 on a phone.

**Scroll CLS and the same-width fallback.** The rubric's line passes. The "same-width" claim does not hold across the page.
- **Load, then scroll:** `audit` early 0.0009, settled 0. My runs: phone 0.0009 in all 3, also with Google's font files held 3 s; desktop 0.0008. The 0.0241 was not reproduced, and every run is under 0.01.
- **Android-like (Arial removed, a real Roboto file at the page's `size-adjust`, fonts late):** 0.00076, twice. That run was at the page's end when the fonts arrived. The page changed height 12,985 → 12,906.
- **Page height before and after fonts on a phone, not the same either way:** Arial fallback 12,840 → 12,906, round 2's stack 12,915 → 12,906.
- **Fonts landing while the visitor is mid-page (fresh load, jump to the position, fonts 1.8 s late, one run each):**

| Phone, by scroll position | 1400 | 3200 | 4200 | 7600 | 10500 |
|---|---|---|---|---|---|
| New fallback, Chromium's scroll anchoring on | 0.0122 | 0.034 | 0.0966 | 0.0076 | 0.1003 |
| Round 2's stack, anchoring on | 0.0122 | 0.0611 | 0.031 | 0.0151 | 0.0033 |
| New fallback, anchoring off | 0.0122 | 0.0934 | 0.0966 | 0.1527 | 0.1722 |
| Round 2's stack, anchoring off | 0.0122 | 0.0614 | 0.0632 | 0.0897 | 0.0798 |

So on this machine the new fallback is no better than the stack it replaced in this case, and at some positions worse. Manrope late alone reproduces it; Courgette late alone read 0 at these five stops although page height still moved, which I did not explain. Desktop stays at or under 0.0048. Getting here needs a slow connection or a reload restoring a scroll position: on the throttled profile the fonts finish at about 1.3–1.4 s. Anchoring off stands in for Safari, which I did not run. Self-hosting and preloading Manrope, due by station 5 anyway, is what would close it.

**Images.** `img-010` is gone: 0 mentions in `index.html`, `build.py` and `make-media.sh`, no file. The Advanced tile is now a crop of img-006 showing a breaking wave and no person, the same source as "I can stand up". `img-011` is not used. **One flagged image remains: img-007, Sanjee's print (`:536`)**, provenance not stated, owner to confirm; the dossier records that the site names that surfer as Sanjee, so the alt is sourced. Consent: img-005 on the Total beginner tile. Video remains a matter for the visual critics: `dossier.videos[]` has clips, the page uses none, and concepts.md records Alon's decision to go on stills.

**First screen, as facts for the two visual critics.** img-018 is 1440×1920, served 1440×1100 on desktop and 1000×1846 on a phone. The stage's 1920 px cap has been lifted, so the same 1440 px file now fills a 2560 screen at about 1.78×. At 701 px and over, a multiply gradient covers the top 46 % of the hero and darkens the sky (sky behind the title averages about rgb(134,77,54) at 1440). Phone has no gradient.

**check-design facts:** `ok`, 0 problems, 0 warnings. h1 and body Manrope, h2 Courgette, ground `#FFFFFF`, 0 all-caps labels, 0 of 24 labelled headings.

**Swell:** runs over http, canvas opacity 1, frames differ, 0 console errors, under the new 3.2 MP limit (2560×887 at 2560×1440).

**New sticky chips on a phone (`:317`).** They sit exactly on the message strip (gap 0 at 390, 360 and 320). Two chips stack: fits row 112 + strip 44 + bar 72 = 228 px. After tapping "I can stand up" at 390 the row cuts off the Not sure tile, which needs a scroll to reach; at 320×568 it takes 40 % of the screen. It settles into the page once its own place arrives, so it never covers the cards. Space under the tiles is no longer reserved, so the lessons below move down 46 or 98 px on a tap; that is input-driven and off CLS. Facts for the experience critic.

**Round 2 fix list:**
1. Rate digits out of page text: **landed.**
2. Tile `srcset`: **landed in part.** Tiles 118 → 86 KB and the photo about 450 ms earlier, but 2× phones still fetch the larger four and the tiles still finish first.
3. Past dates: **landed and overshot.** Past dates are not sent, and no date can be typed.
4. `og:image` absolute: **landed**, host to be confirmed at station 6.
5. Bar line capital: **landed.**
6. img-010: **landed**, removed.
7. Self-host fonts: not yet, due by station 5.

**What the rework broke:** typed dates (`:1032`), new; nav hover contrast (`:83`), new; feature alt now one head short after the re-crop (`:531`). Nothing else I re-tested regressed: messages, facts, rate cells, tap-through, axe, Tab walk, reduced motion, overflow and budget all hold.

**Remaining fix list, priority order:**
1. `:1032`, `src/page.js:188`: do not clear on `change`. Set `state.date = dateIn.value >= dateIn.min ? dateIn.value : null`, and clear a past date from the field on `blur` only. Then type 10/12/2026 and expect "10 December 2026"; type 01/01/2020 and expect no date.
2. `:83`, `src/page.css:62`: nav hover pill to about `rgba(255,255,255,.10)`, about 4.6 by my arithmetic on the worst link's average; re-measure.
3. `:531`: alt "Two more heads in the water" → "Another head in the water". I counted the wide crop on the file; the phone crop shares this alt and by the recipe's coordinates also holds one. The dossier's own description does not count them.
4. `:21`, `:33`, `:34`, before station 5: self-host Manrope and Courgette, preload Manrope, and drop or re-measure the "same width" fallback on real page height.
5. `:432`: to stop 2× phones fetching the larger tile, fix `sizes` or drop the unused 240 files. Low value now the photo has room.
6. `:536` img-007: owner must clear it.

**What the designer prompt got wrong:** nothing tells the designer to test a form control with real key presses. `page.fill` and the date picker hand over a whole value, so the past-date fix looked right, and it only fails on a `change` that fires digit by digit. "Same-width fallback" was measured as an average width over the page's text, which says nothing about where lines break, so the proof should be page height before and after the font arrives. Separately, `tools/audit-mockup.mjs` still reports the H1 as LCP on this page, and its scroll pass cannot see fonts landing mid-page. Both are tool changes for a proposal, and none is written at this stage.

**The sentence the human needs:** interactive scores 65.9 of 80 on dimensions 1–7, down from 70.4 because this round's date fix stopped any date being typed on desktop (a one-line fix, the booking link itself still works); its photo now paints at about 1.67 s, every budget line is met, and img-007 is the one flagged image left.

**Not checked or not measured:**
- No wa.me page opened and no message sent: hrefs read, and one hero tap with the navigation aborted and recorded. Landing in a chat and whether the number answers are untested. `tools/funnel.mjs` was not re-run; the hero link is unchanged.
- The native date picker: not on a real phone, and the desktop calendar popup could not be driven headless, so whether a keyboard user can finish a date through the popup is not known. Year-first date formats, Firefox and Safari typing are untested.
- No real phone or real GPU: software GL, so shader frame rate, battery, and the size of the 185 ms gap before the photo are not real-device numbers.
- No screen reader run: axe, the Chromium AX tree and DOM only.
- Safari's behaviour on the font jump is stood in for by `overflow-anchor: none`. The Roboto test used a downloaded Roboto as the fallback, on one scroll-through, not an Android device, and not at the mid-page stops.
- Mid-page font runs are one run per position on a machine shared with other sessions. Contrast is two stills of moving water per element; automated measurement of glyph rectangles, not of anti-aliased edges.
- Old-site comparison belongs to dimension 8, so the old-site captures were not opened.
- Image rights and consent are owner items, not verifiable here.
- `shots/` in my r3 folder holds gitignored PNGs and has not been cleaned, because the other critics are running in the same round. `tools/clean-shots.mjs` remains to be run afterwards.
