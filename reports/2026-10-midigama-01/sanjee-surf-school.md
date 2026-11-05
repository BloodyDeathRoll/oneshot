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
