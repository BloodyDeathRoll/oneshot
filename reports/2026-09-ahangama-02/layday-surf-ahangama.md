# Layday Surf Ahangama — mockup pre-score

run `2026-09-ahangama-02` · station 4f · critic 0.2.0 · measured 2026-09-20

archetype: **the printed spec card** (`sites/layday-surf-ahangama/concepts.md`)

mode **quick**: the three mockups, before the human pick. Per `rubric.md`, dimensions 1, 3 and 7 gate at this
stage; 2, 5 and 6 are reported. Every score carries the measurement that produced it; the raw evidence is in
each mockup’s `audit.json`.

## Result

| variant | concept | total | result | hard fails |
|---|---|---|---|---|
| **calm** | “The card” | **94 / 100** | pass | none |
| **interactive** | “The card, at four o’clock” | **94 / 100** | pass | none |
| **unique** | “One room” | **94 / 100** | pass | none |

No hard fail on any of the three. No fact contradicts the dossier; every booking target matches it character
for character; no non-business image is used; there are **0 third-party requests on first load**; no keyboard
trap; no content that exists only inside a canvas; no budget line over; no secrets in the output.

### The numbers do not pick for you, and should not

All three carry the same words, the same facts, the same booking path and the same accessibility result,
because they are three designs of one audited content set. The rubric therefore separates them only on
measured weight and speed, which is a few points. **The pick is a design judgement** — the sentence under each
variant is what the rubric asks the critic to produce for it, and the ranking above should not override it.

## calm — “The card” · 94/100

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts match dossier | 10 | 20 numbers rendered; 1 are not literally in copy/en.json (19:00.), each accounted for as a list index, the harvest date in the legal line, or a trailing full stop on 19:00. 0 unexplained. copy/en.json passed 4c with 0 unsourced and 0 contradicted claims; copy/sources.md maps every paragraph to its dossier fields. |
| 2 | mobile + performance | 8 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 199 KB of 1536 KB (12%); JS 0 KB of 300 KB (0%); fonts 78 KB of 150 KB (51%); largest image 38 KB of 200 KB (18%); LCP 1128 ms of 2500 ms (45%); CLS 0.0193 of 0.1 (19%). Worst line 51% of budget, mean 24%. Every line inside budget. |
| 3 | booking CTA end to end | 10 | 3 booking links and tel:+94778553343 diffed character for character against dossier.booking and dossier.contact: identical. Primary action above the fold at 390 px; first tap resolves to https://www.hostelworld.com/hostels/p/337893/layday-surf-ahangama/. With JavaScript off, 4 booking links stay reachable in the footer block, and every action is already a plain link. |
| 4 | brand fit vs playbook | 9 | playbook §3 order present; the first screen carries what/where, a booking action and a proof point. The variant matches its brief in custom.md and the concept it was built from in concepts.md. No price anywhere, by design: this business publishes none. |
| 5 | copy quality | 9 | the words are copy/en.json unchanged, which passed station 4c (0 unsourced, 0 contradicted, voice audit passed). The template contributes interface labels only. |
| 6 | accessibility | 10 | 9 images, 0 missing alt (0 deliberately empty because decorative); 12 tap targets, 0 under 44 px; lang="en"; skip link first in document order. No drawer; every action is a link. Under prefers-reduced-motion 0 of 0 canvases stay hidden and the photograph shows. |
| 7 | security + delivery baseline | 10 | first load contacted 1 host(s) (localhost:8983), of which 0 third party. Static output, no server code, no runtime call to the CMS, fonts and platform marks vendored, relative URLs, lowercase filenames. The Rosa forecast iframe is the one third-party embed and carries loading="lazy", so it never appears on first load; it is declared as a conflict in notes.md. |

**For the human.** One bordered card on a sand field holding everything above the fold: what it is, the three scores, a centred booking row, and the directions to the unmarked black gate in two ochre cells. The lightest page in the whole run at 199 KB.

**What would make it fail.** A card of cells can become a wall of grey boxes if the grounds stop alternating.

## interactive — “The card, at four o’clock” · 94/100

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts match dossier | 10 | 19 numbers rendered; 1 are not literally in copy/en.json (19:00.), each accounted for as a list index, the harvest date in the legal line, or a trailing full stop on 19:00. 0 unexplained. copy/en.json passed 4c with 0 unsourced and 0 contradicted claims; copy/sources.md maps every paragraph to its dossier fields. |
| 2 | mobile + performance | 8 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 468 KB of 1536 KB (30%); JS 5 KB of 300 KB (1%); fonts 78 KB of 150 KB (51%); largest image 45 KB of 200 KB (22%); LCP 356 ms of 2500 ms (14%); CLS 0.0017 of 0.1 (1%). Worst line 51% of budget, mean 20%. Every line inside budget. |
| 3 | booking CTA end to end | 10 | 3 booking links and tel:+94778553343 diffed character for character against dossier.booking and dossier.contact: identical. Primary action above the fold at 390 px; first tap resolves to #book. With JavaScript off, 5 booking links stay reachable in the footer block, and all 2 drawer triggers are plain links to it. |
| 4 | brand fit vs playbook | 9 | playbook §3 order present; the first screen carries what/where, a booking action and a proof point. The variant matches its brief in custom.md and the concept it was built from in concepts.md. No price anywhere, by design: this business publishes none. |
| 5 | copy quality | 9 | the words are copy/en.json unchanged, which passed station 4c (0 unsourced, 0 contradicted, voice audit passed). The template contributes interface labels only. |
| 6 | accessibility | 10 | 13 images, 0 missing alt (0 deliberately empty because decorative); 14 tap targets, 0 under 44 px; lang="en"; skip link first in document order. Drawer opens, Esc closes it and focus returns to the trigger, verified at 390 px and 1440 px. Under prefers-reduced-motion 1 of 1 canvases stay hidden and the photograph shows. |
| 7 | security + delivery baseline | 10 | first load contacted 1 host(s) (localhost:8984), of which 0 third party. Static output, no server code, no runtime call to the CMS, fonts and platform marks vendored, relative URLs, lowercase filenames. The Rosa forecast iframe is the one third-party embed and carries loading="lazy", so it never appears on first load; it is declared as a conflict in notes.md. |

**For the human.** The same card with its photograph cell pinned full height while the sun crosses the plaster, window louvres and all, and the rest of the card scrolls past it. Fastest LCP of the three.

**What would make it fail.** The light is either too subtle to notice or reads as a lens flare. It is tuned narrowly between the two.

## unique — “One room” · 94/100

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts match dossier | 10 | 19 numbers rendered; 1 are not literally in copy/en.json (19:00.), each accounted for as a list index, the harvest date in the legal line, or a trailing full stop on 19:00. 0 unexplained. copy/en.json passed 4c with 0 unsourced and 0 contradicted claims; copy/sources.md maps every paragraph to its dossier fields. |
| 2 | mobile + performance | 8 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 287 KB of 1536 KB (18%); JS 5 KB of 300 KB (1%); fonts 78 KB of 150 KB (51%); largest image 40 KB of 200 KB (19%); LCP 1152 ms of 2500 ms (46%); CLS 0.0226 of 0.1 (22%). Worst line 51% of budget, mean 26%. Every line inside budget. |
| 3 | booking CTA end to end | 10 | 3 booking links and tel:+94778553343 diffed character for character against dossier.booking and dossier.contact: identical. Primary action above the fold at 390 px; first tap resolves to #book. With JavaScript off, 5 booking links stay reachable in the footer block, and all 3 drawer triggers are plain links to it. |
| 4 | brand fit vs playbook | 9 | playbook §3 order present; the first screen carries what/where, a booking action and a proof point. The variant matches its brief in custom.md and the concept it was built from in concepts.md. No price anywhere, by design: this business publishes none. |
| 5 | copy quality | 9 | the words are copy/en.json unchanged, which passed station 4c (0 unsourced, 0 contradicted, voice audit passed). The template contributes interface labels only. |
| 6 | accessibility | 10 | 11 images, 0 missing alt (0 deliberately empty because decorative); 15 tap targets, 0 under 44 px; lang="en"; skip link first in document order. Drawer opens, Esc closes it and focus returns to the trigger, verified at 390 px and 1440 px. Under prefers-reduced-motion 1 of 1 canvases stay hidden and the photograph shows. |
| 7 | security + delivery baseline | 10 | first load contacted 1 host(s) (localhost:8985), of which 0 third party. Static output, no server code, no runtime call to the CMS, fonts and platform marks vendored, relative URLs, lowercase filenames. The Rosa forecast iframe is the one third-party embed and carries loading="lazy", so it never appears on first load; it is declared as a conflict in notes.md. |

**For the human.** The card at full bleed: the whole page ruled into cells the way the bunks rule the room, ONE / ROOM at 9.5 rem, and the garden’s shadow moving on the wall.

**What would make it fail.** The frames can make it feel like a form to fill in.

## What the designer prompt got wrong

Nothing in this round that the prompt caused. The faults of the previous rounds were structural and are now
answered on disk rather than in conversation: the page archetype is decided at station 4d before any markup
exists (`agents/creative-director/base.md`); a photograph under 1200 px can no longer be used full-bleed,
because `tools/build-mockup.mjs` refuses it; and the three house rules that had to be repeated — light themes,
no padded picture boxes, no captions under photographs — are measured by `tools/check-design.mjs`, which all
nine mockups pass.

The performance figures above are measured in Chromium over CDP with the network and CPU throttled to
playbook §4's assumptions, by `tools/audit-mockup.mjs`; the raw numbers are in each mockup's `audit.json`.

## Next

**Human gate.** Pick one variant, with a reason. The reason is what the learning loop consumes (PLAN.md §7),
so “the board, because it looks like the hostel” is worth more than “the second one”.

---

# Round 3 — berth concepts, designer 0.3.3, 2026-09-22

run `2026-09-ahangama-02` · station 4f · **critic 0.3.1** · measured 2026-09-22 · archetype **the berth**
(`sites/layday-surf-ahangama/concepts.md`, creative-director 0.2.2). Rounds 1–2 above are kept; this round
replaces nothing.

mode **quick**. Gating at this stage (rubric): no hard fail, dimensions 1, 3, 7 ≥ 6. Dimensions 2, 5, 6 are
reported, not gating. Same order and settings for all three: `audit-mockup.mjs` → `shoot.mjs` over
`python3 -m http.server` (ports 8931/8932/8933, stopped after) → 1525 px pass → `check-design.mjs --no-shots` →
`check-places.mjs` → Playwright pass at 390 (touch) for CTA tap, Rosa lazy load and CLS → JavaScript off at 390
and 1440 → keyboard at 1440 → `prefers-reduced-motion` at 1440 and 390 → page text diffed against
`copy/en.json`. Scored from the contact sheets in `shots/critic/`, never from a full-page capture.

## Result

| variant | concept | total | result | hard fails |
|---|---|---|---|---|
| **calm** | "Berth" | **90.5 / 100** | pass | none |
| **interactive** | "Curtain" | **84 / 100** | pass | none |
| **unique** | "Inside" | **85.5 / 100** | pass | none |

Hard-fail list, checked for each of the three, all empty: no page fact contradicts the dossier and none lacks a
dossier entry; every booking href is identical to the dossier character for character; every image is
`business-owned` (no `stock/`, `check-places`: 0 borrowed images); first load has no Rosa, CMS or tracker
request — the only third-party hosts are `fonts.googleapis.com` / `fonts.gstatic.com`, expected at 4e
(`agents/critic/tools.md`) and a defect only at full mode; no keyboard trap; all content is DOM text; no
budget line over; no secrets, internal URLs or `localhost` in `dist/` (grep), all filenames lowercase.

### Budget (playbook §4), measured by `audit-mockup.mjs` (390 × 844, 1.6 Mbps, 150 ms, 4x CPU, no scroll)

| line | target | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer | ≤ 1536 KB | 191 KB (5 req) | 424 KB (9 req) | 328 KB (7 req) |
| JS, compressed | ≤ 300 KB | 0 (no script) | 4.1 KB gz, inline* | 5.2 KB gz, inline* |
| largest image | ≤ 200 KB | 85.5 KB | 89.9 KB | 85.5 KB |
| fonts | ≤ 2 fam, 150 KB | Urbanist, 27.8 KB | Urbanist, 27.8 KB | Urbanist, 27.8 KB |
| LCP | ≤ 2500 ms | 524 ms | 1656 ms | 532 ms |
| CLS | < 0.1 | 0.0013 | 0.0015 | 0.0007 |
| 3rd-party on load | 0 | 2 (Google Fonts, 4e) | 2 (Google Fonts, 4e) | 2 (Google Fonts, 4e) |

\* `audit.json` reports `bytes_js: 0` because the script is inline in the HTML; the gz sizes are measured from
the `<script>` bodies of `dist/index.html`.

### 1525 px (Shahar's viewport), measured

Helper pass (under /tmp, deleted after) at 1525 × 900, one capture per 810 px, saved as
`shots/critic/w1525-NN.png`; for each stop, the left and right gap between the viewport edge and the outermost
non-fixed content box.

- **calm:** 8 stops, left 163 px / right 163 px at every stop; `scrollWidth` 1525. No lopsided band, nothing packed left.
- **interactive:** 10 stops, 163 / 163 at every stop; `scrollWidth` 1525.
- **unique:** 13 stops. Stop 0 is the full-width box (words from x 377). Stop 1 (`w1525-01.png`) has no text at
  all — the mid-climb-out screen, one small yellow rectangle on the ground. Stops 2–12: content column 163 px
  from the left; the right edge is set by the fixed docked berth (72 px from the edge), which covers line ends
  (below).

---

## calm — "Berth" · 90.5 / 100 · pass

```
mode: quick        round: 3        variant: calm
total: 90.5 / 100  result: pass    hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | Facts table below: 22 rows, 22 match, 0 mismatch, 0 missing. `audit.json` `facts`: 1 number not literally in en.json (`5.0`, the Google score, en.json holds it as `5.0` → dossier `reviews.google.rating` 5.0). |
| 2 | mobile + performance | 9 | Budget table: worst line LCP 21 % of budget. 390 sheet (`shots/critic/mobile-sheet.png`, 12 stops): no overflow or overlap; fixed bar "Check dates" / "Call" on every stop. Only open item: Urbanist from Google Fonts (self-host at 4g). |
| 3 | booking CTA | 9 | Tapped at 390: the first-screen "Check dates" is a `<summary>` (no href); the tap opened the `<details>` panel in place, no navigation, revealing Hostelworld / Booking.com / Agoda + `tel:+94778553343`, all identical to `booking.engine_url`, `booking.other_engines`, `contact.phone`. Plain link under it: `https://www.hostelworld.com/hostels/p/337893/layday-surf-ahangama/`. Bar: "Check dates" → `#book` (footer drawer, three listings), "Call" → `tel:+94778553343`. No WhatsApp in the dossier, so no prefill is possible (not a defect). |
| 4 | brand fit | 8 | Playbook §3 first screen present at 390 and 1440 (what + where, booking, three ratings with counts). Quiet brief met: 0 JS, no canvas, no motion. Minus: no rating shows its capture date (playbook §2/§6: "rating shown with count, source and capture date"). |
| 5 | copy | 9 | Page text diffed against en.json: every copy block, heading, the spot line, 19 amenities and all 5 testimonials are on the page verbatim. 18 lines not verbatim are interface labels or formatted fields (rating lines, "or call", "Check in from", "until", review attributions, amenity notes). `rooms[0].note` not shown (internal note, conflict 2 in notes.md); `stayInfo.note` shown and repeats the practicalities body (notes.md conflict 3). |
| 6 | accessibility | 8 | `audit.json`: 8 images, 0 without alt; 17 tap targets, 0 under 44 px; headings H1 H2 H3 H2 H2 H2; `lang="en"`. Keyboard at 1440: 12 Tab stops, each with a 2 px solid violet outline, all on screen; Enter on the summary opens the panel, Tab goes through the three listings; Esc does not close a native `<details>` (not a trap). **No skip link**: `audit.json` says `has_skip_link: true`, but its test is "any `a[href^="#"]`" and the match is the name link `href="#"`. |
| 7 | security + delivery | 9 | First load: `127.0.0.1`, `fonts.googleapis.com`, `fonts.gstatic.com` only. No script, no embed, relative image URLs, lowercase names. Minus the Google Fonts hosts (4e-expected, full-mode defect). |

Total: 25 + 18 + 13.5 + 8 + 9 + 8 + 9 = **90.5**.

**Facts table** (rendered page, 1440 and 390, drawer open)

| on the page | dossier key | result |
|---|---|---|
| Layday Surf Ahangama | `business.name` | match |
| Surf, chill and feel at home in Ahangama | `business.tagline` (case/ampersand normalised by copy 4c) | match |
| a two-minute walk from Kabalana | `location.distance_to_beach` | match |
| one dorm / single dormitory / air-conditioned | `room_types[0]`, `reviews.quotes` (Catherine), `facilities` air conditioning | match |
| no bed count anywhere except Catherine's verbatim "4 bunk beds" | `contradictions[0]` | match (quote verbatim) |
| family who built and run it | `reviews.quotes` (Beth, Jennine) | match |
| every Hostelworld category 10/10, seven named | `reviews.hostelworld.categories` | match |
| 9.8/10 Hostelworld, 10 reviews | `reviews.hostelworld` | match |
| 10/10 Booking.com, 6 reviews | `reviews.booking` | match |
| 5.0/5 Google, 15 reviews | `reviews.google` | match |
| Beth, Jennine, Catherine quotes, "April 2026" | `reviews.quotes[]` text + `date` 2026-04 | match |
| Akshay, Taiya quotes, no date | `reviews.quotes[]`, `date` null | match |
| Warnagiri, Welhengoda; black gate; wooden platform; door right of the house | `location.address`, `location.finding_it` | match |
| check in 14:00–19:00, check out by 14:00 | `stayInfo.*`, `hours_note` | match |
| credit cards not accepted, non-smoking, taxes included, reception limited hours | `stayInfo.note`, `hours_note` | match |
| 19 amenities (incl. "additional charge" on laundry, bicycles; pets no extra charge) | `facilities[]` | match |
| Kabalana sandy beach break, beginners and improvers, The Rock reef | `location.spot` | match |
| +94 77 855 3343 / `tel:+94778553343` | `contact.phone` | match |
| address link → `https://www.google.com/maps/search/Layday%20Surf%20Ahangama/@5.9794134,80.350836,17z?hl=en` | `location.map_url` | match |
| three listing URLs | `booking.engine_url`, `booking.other_engines` | match |
| no price, "rates move with the season" | `gaps[]` offers | match |
| photographs img-002, 012, 013, 003, 017, 019, 021, 020 | `images[]`, all `business-owned` | match; beach alt text never says Kabalana |

Text not in en.json beyond interface labels: none. Copy blocks missing from the page: none (`rooms[0].note`
is a field, withheld by the designer as an internal note).

**Default look (check-design, facts):** h1, h2, body all Urbanist; ground `rgb(232,233,240)` = hsl(233 21 % 93 %),
not in the cream range; 0 all-caps labels; 0 / 6 headings labelled; 0 problems, 0 warnings.

**JS off / reduced motion:** the page has no script and no motion; JS off at 390 and 1440 shows the same page,
`<details>` opens natively, 7 distinct hrefs reachable (`shots/critic/nojs-*.png`); reduced motion identical
(`rm-*.png`). **Rosa:** not carried (concept: "No"), no Rosa markup.

**Look-log:** 6 rounds, rounds 1–3 first screen, 4–6 whole page; every pair of consecutive sheets differs
(md5); each round names a visible change. Meets base.md.

**For the human.** One flat yellow rectangle with the headline in it and an outlined drawer under it, zero
JavaScript, 191 KB first load and 524 ms LCP — the lightest and fastest of the three; nothing on the page moves.

---

## interactive — "Curtain" · 84 / 100 · pass

```
mode: quick        round: 3        variant: interactive
total: 84 / 100    result: pass    hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Dossier facts: the same 22 rows as calm, 22 match. The Rosa headline reads **"Now, Monday 20:30"** from the fixture generated 2026-09-21 14:25 UTC (19:55 local): true of the fixture, not "now" on 2026-09-22 — 4e-sanctioned (headline from a fixture), but it is the "stale numbers shown as current" case playbook §4 forbids once live. "Wind 7 km/h" is the fixture's 6.5 km/h rounded. |
| 2 | mobile + performance | 8 | Budget table: worst line LCP 1656 ms = 66 % of budget; 424 KB. 390 sheet (12 stops): no overflow; fixed bar on every stop; room photos as a swipe row at 390. |
| 3 | booking CTA | 9 | Tapped at 390 the hero "Check dates" (`href` = the Hostelworld listing): JS opened the drawer in place, no navigation, focus on "Check dates on Hostelworld"; three listings + `tel:` visible, all identical to the dossier. Bar: "Check dates" → Hostelworld listing, "Call" → `tel:+94778553343`. JS off: the same `<a>` goes straight to Hostelworld. No prefill possible (no WhatsApp). |
| 4 | brand fit | 7 | §3 first screen present. Brief met: curtain moves, drawer, ladder, lamp, pinned room frame. Minus: the footer drawer is four **yellow** cells (desktop-09, mobile-11) — a second berth-yellow shape, against the concept's "always one berth… the one shape… nowhere else"; the "Finding the door" grey panel ends in a band holding only the address link (desktop-04); reduced-motion curtain is a dense black bar (below); no rating capture date. |
| 5 | copy | 8 | Diffed against en.json: all six copy blocks, spot, 19 amenities, 5 testimonials verbatim. **`stayInfo.note` not on the page**, so "Reception has limited hours" (dossier `hours_note`) appears nowhere — the one fact in that note not said elsewhere (notes.md conflict 6 flags it). `rooms[0].note` withheld. 28 non-verbatim lines = labels, attributions, Rosa headline lines. |
| 6 | accessibility | 8 | `audit.json`: 12 images, 0 without alt; 24 tap targets, 0 under 44 px; `lang="en"`. Keyboard at 1440: 12 stops, 2 px violet outline each; Enter on hero "Check dates" opens the drawer, focus moves to Hostelworld, Esc closes, focus returns to "Check dates"; no trap. Reduced motion: `html.still`, no pin, no parallax, the curtain canvas drawn once. **No skip link** (audit's `true` is the `href="#"` name link). |
| 7 | security + delivery | 9 | First load at 390: `127.0.0.1`, Google Fonts only; **0 Rosa requests**. Inline script, no library. Minus Google Fonts (4e). |

Total: 22.5 + 16 + 13.5 + 7 + 8 + 8 + 9 = **84**.

**Facts table:** identical rows and results to calm's table (same copy, same links), plus:

| on the page | source | result |
|---|---|---|
| photographs img-018, 012, 005, 011, 008, 013, 003, 017, 001, 019, 021, 020 | `images[]`, all `business-owned` | match; none of img-009/015/022 |
| 0.7–1.1 m · Monday 20:30 · swell 12.6 s from the south · wind 7 km/h from the west, cross-shore · updated 21 September 2026, 19:55 | Rosa fixture `current.h` [0.7,1.1], `current.t` 2026-09-21T20:30+05:30, first in-window swell period 12.6 s dir 184°, `current.wind` 6.5 kph 270° cross-shore, `generated_at` 14:25 UTC | match to the fixture (wind rounded); not dossier facts (playbook §4 exception) |

Text not in en.json beyond interface labels: the Rosa headline and credit lines (playbook §4 fixed strings +
data). Copy missing from the page: `stayInfo.note`.

**Default look (check-design, facts):** Urbanist on h1, h2, body; ground hsl(233 21 % 93 %), not cream; 0
all-caps labels; 0 / 7 headings labelled; 0 problems, 0 warnings.

**JS off (390, 1440):** drawer panel open under the berth, every "Check dates" a plain Hostelworld link, 7
distinct hrefs reachable, Rosa box shows "See today's forecast for Kabalana on Rosa", 0 Rosa requests
(`nojs-*.png`). `audit.json` `no_js.booking_links_reachable: 0` is the tool's `#book` assumption; this page has no
`#book`.

**Rosa check (hard constraint 9, 4e level) — met:**
- mapping: widget `spot=kabalana`, credit "Forecast for Kabalana by Rosa" → `https://rosa.surf/spot/kabalana`;
  concepts.md maps dossier `location.spot` "Kabalana beach break" → `kabalana`. Match.
- label: Kabalana only; The Rock is never labelled as forecast.
- headline only: `.fc-now` holds height, time, swell, wind, updated line; 0 day/list/table elements.
- widget URL: `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`; `style`, `sandbox`, `title`,
  `height="500"` exactly as `agents/designer/tools.md`; computed filter none, transform none, opacity 1; no
  cropping ancestor; `elementFromPoint` at 5 points inside the frame returns the iframe (not covered).
- lazy: first load 0 Rosa requests; after scrolling to the block: 1 JSON request
  (`rosa-data-opal.vercel.app/data/spots/kabalana.json`, made by the widget), 1 widget frame, plus
  `rosa.surf/favicon.svg`. The site's own headline makes no JSON request at 4e (inlined fixture), as tools.md says.
- reserved box: 358 × 500 at 390 before and after load; CLS during the scroll and load: 0.
- JS off: plain link visible, `src` empty. Blocked-request path not tested separately (the link sits under the
  frame and is hidden only on the frame's `load` event).
- evidence: `shots/critic/rosa-390.png`, desktop-06/07.

**Known issues from the designer:**
- *Reduced-motion curtain reads as a dense black bar* — **confirmed.** `rm-1440-00.png`: the open curtain is a
  solid-looking black band about 45 px wide at the right edge of the print; `rm-390-00.png`: about 25 px.

**Look-log:** 6 rounds, 1–3 first screen, 4–6 whole page; desktop sheets differ every round; the mobile sheets
of rounds 4, 5 and 6 are byte-identical (md5 `4b453a9e`) — the round 5 and 6 changes were at 1920/1440 only, as
the log says. Meets base.md.

**For the human.** The same yellow box with an ink-line curtain that parts under the pointer and a pinned room
frame, plus Rosa's widget in the wave section; 424 KB and 1656 ms LCP, the heaviest and slowest of the three
but inside budget; under reduced motion the curtain is a black bar.

---

## unique — "Inside" · 85.5 / 100 · pass

```
mode: quick        round: 3        variant: unique
total: 85.5 / 100  result: pass    hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | The same 22 dossier rows as calm, 22 match. Rosa headline dated, not "now": "Monday 21 September, 20:30", wind 6.5 km/h, as the fixture. |
| 2 | mobile + performance | 8 | Budget table: worst line LCP 532 ms (21 %), 328 KB. 390 sheet (15 stops): no overflow; yellow foot bar with "Check dates" / "Call" on every stop. Minus: one full viewport with no content during the climb-out at both widths (desktop-01, mobile-01, `w1525-01.png`). |
| 3 | booking CTA | 9 | Tapped at 390 the hero "Check dates" (`href` = Hostelworld listing): JS opened the dialog, no navigation, focus on "Check dates on Hostelworld"; Hostelworld / Booking.com / Agoda / `tel:+94778553343` identical to the dossier. Foot bar: `<summary>` "Check dates" + the same four links, "Call" → `tel:`. JS off: hero link goes to Hostelworld, dock is a native `<details>`. No prefill possible. |
| 4 | brand fit | 6 | §3 first screen present. Brief met: flat-plane box, niche, lamp, climb-out, docked berth as the booking control. Minus: **the docked berth covers the ends of text lines at 1440 and 1525** (measured below; desktop-03 shows "with a ket…", "and a g…" cut); an empty screen mid-scroll; no rating capture date. |
| 5 | copy | 9 | Diffed: all six copy blocks, spot, 19 amenities, 5 testimonials, `stayInfo.note` on the page. `rooms[0].note` withheld. 23 non-verbatim lines = labels ("Open the map", "Close", "Call +94 77 855 3343"), attributions, Rosa lines. |
| 6 | accessibility | 7 | `audit.json`: 10 images, 0 without alt; 19 tap targets, 0 under 44 px; `lang="en"`; **no skip link** (audit also says false). Keyboard at 1440: 12 stops, 2 px ink outline each; Enter on hero "Check dates" opens a `role="dialog"`, Tab cycles inside it (Close → back to Hostelworld), Esc closes and returns focus to "Check dates" — a modal trap with an exit, not a keyboard trap. Reduced motion: box canvas `display:none`, static CSS box, dock fixed from the start (`rm-*.png`). Minus the text the dock hides at 1440/1525. |
| 7 | security + delivery | 9 | First load at 390: `127.0.0.1`, Google Fonts only; **0 Rosa requests**. Inline hand-written WebGL, no library. Minus Google Fonts (4e). |

Total: 25 + 16 + 13.5 + 6 + 9 + 7 + 9 = **85.5**.

**Facts table:** identical rows and results to calm's table, plus:

| on the page | source | result |
|---|---|---|
| photographs img-018, 012, 002, 008, 013, 003, 017, 019, 021, 020 | `images[]`, all `business-owned` | match; none of img-009/015/022 |
| 0.7–1.1 m · Monday 21 September, 20:30 · swell 12.6 s from the south · wind 6.5 km/h from the west, cross-shore · updated 21 September 2026, 19:55 | Rosa fixture (as interactive) | match to the fixture; not dossier facts |

Text not in en.json beyond interface labels: the Rosa headline and credit lines. Copy missing from the page:
none.

**Default look (check-design, facts):** Urbanist on h1, h2, body; ground hsl(233 21 % 93 %), not cream; 0
all-caps labels; 0 / 7 headings labelled; 0 problems, 0 warnings.

**JS off (390, 1440):** static CSS box with the words on the back wall; 6 distinct hrefs reachable; dock is a
`<details>` with the three listings and the phone; Rosa box shows the plain link; 0 Rosa requests
(`nojs-*.png`).

**Rosa check (hard constraint 9, 4e level) — met,** same results as interactive: `spot=kabalana`, credit →
`rosa.surf/spot/kabalana`, Kabalana only; headline only, 0 day elements; widget URL, style, sandbox, title
unmodified, not covered, not cropped, no filter or transform; 0 Rosa requests on first load, after scrolling 1
widget frame + 1 JSON request (by the widget) + favicon; box 350 × 500 at 390 before and after, CLS 0; JS off
shows the link. Blocked-request path not tested separately.

**Known issues from the designer:**
- *Docked booking box covers the ends of text lines at 1440/1525* — **confirmed.** Scroll pass every 100 px from
  y 1400, text node rects that intersect the dock and where `elementFromPoint` returns the dock: at **1440**, 11
  stops (dock at x 1212–1388, y 770–880): lines of "The room" body (ending up to x 1318), its "check dates" link,
  Catherine's quote (to x 1315), "Newly built" body (to x 1320), "April 2026" attribution. At **1525**, 10 stops
  (dock x 1297–1473): the same blocks plus Taiya's quote. At **1920**: 0 stops. Evidence:
  `shots/critic/desktop-03.png` (1440, lines cut at "with a ket", "and a g"), `dock-overlap-1440.png`,
  `dock-overlap-1525.png`.

**Look-log:** 7 rounds, 1–3 first screen, 4–7 whole page. Rounds 5, 6 and 7 have byte-identical desktop and
mobile sheets (md5 `d6dee603` / `94a4c141`); the round 6 and 7 changes are only in state captures
(`drawer1440.png`, `drawer390.png` differ each round; `rm1440-00.png` differs 5→6, not 6→7). Round 7 is a final
round whose only change is inside a closed drawer — accepted by Shahar on 2026-09-22, not a station failure.
**Round 6 is not a final round and has no visible change between page sheets; by base.md's letter that is a
station failure.** Whether the 2026-09-22 acceptance extends to a non-final round is Shahar's call. It is not a
rubric hard fail.

**For the human.** A drawn yellow box you start inside and scroll out of, which then docks as the booking
control in the corner; 328 KB, 532 ms LCP; at 1440 and 1525 that docked box covers the ends of text lines in the
right-hand column (clear at 1920), and one mid-scroll screen is empty.

---

## What the designer prompt got wrong

The designer checks its own work at 1440, 1525 and 1920 by looking at sheets, and every measurable defect in this
round was seen, written into `notes.md` as "known, not fixed", and shipped: unique's fixed dock over text at
1440/1525, interactive's reduced-motion curtain as a black bar, interactive's `stayInfo.note` dropped. The prompt
lets "known and left" end a look loop; it should require that a defect the designer has itself named in the
look-log — text covered by a fixed element at any of the checked widths, a reduced-motion state that reads as a
different object, or a copy field not placed — is fixed before hand-off or raised as a blocking conflict. Two
smaller gaps the prompt does not name: nothing asks for the rating capture date the playbook requires beside
each score (none of the three shows one), and nothing tells the designer that a Rosa headline from a fixture
must not say "Now" (interactive does; unique does not). Tool note for the critic's own tooling, not the
designer: `audit-mockup.mjs` reports `has_skip_link: true` for any `a[href^="#"]` (here the name link
`href="#"`), and `no_js.booking_links_reachable` assumes `#book`; both read wrong on these pages.

## Next

**Human gate (mocked → picked).** Pick one variant, with a reason. The critic does not pick.

---

# Full round 1 — final site, "Inside" (unique), 2026-09-23

critic 0.3.2 · station 5 · run `2026-09-ahangama-02` · playbook 0.5.1 · rubric 0.1.0. Under review:
`sites/layday-surf-ahangama/final/dist/`, rebuilt by me with `npm run build` (clean, 0 warnings; no `SITE_URL`,
so a preview build: `noindex, nofollow`, `robots.txt` Disallow for `*` and 15 named AI crawlers, no sitemap —
expected). Inputs read: dossier, `copy/en.json` + `review.md` round 3 (PASS, 0 unsourced / 0 contradicted),
`copy/sources.md`, `seo-report.md`, `aiseo-report.md`, `final/notes.md`, the picked mockup
`mockups/unique/` round 7 (= `agents/designer/gold/layday-surf.html`). All tests over a plain
`python3 -m http.server` on `dist/` (port 8750; scratch copies of `audit-mockup.mjs` on 8751 writing to
`shots/critic-1/audit.json`, `check-design.mjs` on 8752; mockup on 8753 for one axe comparison; all servers
stopped). Headless Chromium, software GL. No real phone.

```
mode: full        round: 1        variant: unique ("Inside")
total: 91.5 / 100         result: pass        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | My own sentence-by-sentence table below (rendered page JS on and JS off, alt texts, title/meta, JSON-LD, `llms.txt`): **48 rows = 84 individual claims, 0 mismatch, 0 unsourced**. The 5 testimonials equal `reviews.quotes[7,5,6,4,1]` by string equality (script). Address = Google listing with the one allowed capitalisation. Every alt text checked against the photograph itself (lockers and drawer locks are visible keyholes in img-002/008/013). `audit.json` `numbers_not_in_passed_copy: ["5.0"]` = Google's 5.0/5, the dossier's `reviews.google.rating` 5.0. |
| 2 | mobile + performance | 10 | `critic-1/audit.json` (390×844, 1.6 Mbps, 150 ms, 4× CPU, no scroll): **183 832 B, 6 requests, all local, LCP 388 ms, CLS 0**; my three more throttled runs: LCP 404 / 388 / 396 ms, CLS 0. No horizontal overflow at 390, 768, 1024, 1440, 1525, 1920 in any of JS / reduced motion / JS off (`sweep-*.json`, whole page in 20 px steps). **0 console errors** at all six widths with the network live and the whole page scrolled (Rosa JSON + widget loaded). Budget table below. |
| 3 | booking CTA | 9 | Tap-through at 390 (touch): hero "Check dates" opens the drawer (no navigation), links Hostelworld / Booking.com / Agoda / `tel:+94778553343`; tapping the first issues a document navigation to `https://www.hostelworld.com/hostels/p/337893/layday-surf-ahangama/` (`tap-390-drawer.png`). Foot bar "Check dates" opens the same drawer (`tap-390-dock.png`), bar "Call" = `tel:+94778553343`. JS off: every "Check dates" is the plain Hostelworld link, the dock is a native `<details>` with the three listings + phone. All 30 hrefs character-identical to `booking.engine_url`, `booking.other_engines`, `contact.phone`, `location.map_url`. Deduction: no prefill and no reply time are possible (no WhatsApp, `reply_time_hint` a gap) — dossier gaps, not build faults. |
| 4 | brand fit | 8 | Look = the picked mockup (below). Brief met (flat-plane box, climb-out, docked berth as the booking control). Deductions, inherited from the picked mockup: the first screen says where ("A two-minute walk from Kabalana", "…in Ahangama") but not what — nothing above the fold says hostel / dorm bed (playbook §2 "business type + place in one line"); the spot comes after the reviews and the location block is at the end (playbook §3 order). No prices is a dossier gap, correctly not filled. |
| 5 | copy quality | 8 | Passed 4c round 3; every copy field placed (6 blocks, spot, room, stayInfo, 19 amenities, 3 ratings, 5 quotes, contact, 3 links); nothing on the page outside the copy but interface labels, "read 19 September 2026" and Rosa's lines. Two deductions. (a) **On-page repetition in Practicalities:** the body's "Credit cards are not accepted. Taxes are included, and it is non-smoking." is followed two lines later by `stayInfo.note` "Credit cards are not accepted. Non-smoking. Taxes included. …", and the three times are printed large and then again in the sentence under them (`desktop-09.png`, `w390-10`); "daily housekeeping" appears 4 times on the page. The mockup had the same stacking. (b) **Missing word space in the text layer:** `…10 reviews</a><span class="when">read 19 September 2026` and `…Sri Lanka<a …>Open the map` have no whitespace, so `innerText` / copy-paste / a screen reader get "10 reviewsread 19 September 2026" (hero, all 4 rating lines similarly joined in the markup) and "Sri LankaOpen the map"; visually spaced by CSS only. |
| 6 | accessibility | 8 | axe-core 4.x (local copy, nothing installed), WCAG 2.0/2.1 A+AA, page scrolled first, third-party blocked: **1440: 0 violations** (23 rule sets pass; incomplete `color-contrast` ×7). **390: 1 violation, `scrollable-region-focusable` (serious) ×2** — the `.built .trio` and `.wave .trio` photo rows scroll sideways on a phone; inherited (the mockup gives the same ×2 at 390); Chromium does make them tab stops (seen in my Tab run), Safari does not. Keyboard at 1440 and 390: skip link first (146×52), visible 2 px outline on every stop; hero "Check dates" + Enter opens `role="dialog" aria-modal`, focus on "Check dates on Hostelworld", Tab cycles 5 stops inside (Hostelworld, Booking.com, Agoda, Call, Close) and wraps, Esc closes, focus returns to the opener — no trap. Reduced motion: canvas `display:none`, static box, dock visible from load (`rm-*.png`). No WebGL (`getContext('webgl*')` → null): 2D box, 0 page errors (`nogl-*.png`). Tap targets at 390, whole page, visible controls, either side < 44 px: **0 of 19**. Content is DOM text; the canvas is `aria-hidden`. Deductions: the axe violation and the joined words in (5b). |
| 7 | security + delivery | 9 | Static output only; `<script src>`: 0; one `<link>` (the self-hosted font preload); 0 hits for localhost / 127.0.0.1 / `/api/` / key / token / secret / password in `index.html` and `llms.txt`; test hooks (`no-webgl`, `?open`) 0; filenames lowercase; relative URLs. **0 third-party requests on first load** (audit + 8 instrumented runs). One third-party embed (Rosa's widget) + the Rosa JSON, both after scroll only (table below). Deduction: the map pin is a template constant (`MAP_PIN` in `src/lib/site.mjs`, guarded by the seed) because schema v0.5 has no geo field — a hard-coded business fact outside Payload, against the schema contract; `seo-report.md` records it as a SCHEMA GAP. No favicon; no canonical / `og:url` / `og:image` until the deployer builds with `SITE_URL` (expected for a preview). |

`total = 10×2.5 + 10×2 + 9×1.5 + 8 + 8 + 8 + 9 = 91.5`. Full-mode pass: no hard fail, total ≥ 80, every
dimension ≥ 6, every playbook §4 budget line met. **Result: pass.**

Hard-fail list, each checked: no fact contradicts the dossier, none without a dossier entry; booking targets
identical to the dossier; all 10 images `business-owned` (img-018, 012, 002, 008, 013, 003, 017, 019, 021, 020;
`check-places.mjs`: 0 borrowed); no stock; 0 third-party on load; no CMS call at runtime; no keyboard trap; no
canvas-only content; no budget line over; no secrets. **Empty.**

## Shahar's pick notes, verified independently

1. **The docked box never covers text.** My sweep (`sweep-js|rm|nojs.json`): 6 widths × 3 modes, whole page
   in 20 px steps, every visible text node's line boxes (`Range.getClientRects`) tested against the dock and
   its ladder. **≥ 920 px (1024, 1440, 1525, 1920): 0 overlapping steps in all 12 runs.** **< 920 px
   (390, 768), "reserve space":** at the top of the page and at the end, 0 lines under the bar in all 6 runs;
   lines pass under it only mid-scroll (304 / 283 steps with JS), which is the case Shahar allowed. Short
   phones too (`rest` check, 360×640, 390×667, 414×736, 390×568, 800×600 × JS / reduced / JS off): top and
   end clear in all 15 (with the camera the bar is hidden at the top until the box docks). **Holds.**
2. **No empty screen after the hero.** Longest scroll run with no visible text line and no photo (opacity
   and visibility respected): **40 px at 390, 80 px at 768 / 1024 / 1440 / 1525 / 1920** (≤ 0.09 of a
   screen); 0 with reduced motion or JS off. The mockup's `mobile-01` / `desktop-01` were the box alone; the
   build's carry the lead paragraph (`desktop-01.png`, `mobile-01.png`). **Holds.**
3. **Capture date on each rating.** "read 19 September 2026" after the hero rating and under each of the
   three platform lines (4 in the HTML, all present with JS off), = `reviews.{hostelworld,booking,google}.
   fetched_at` 2026-09-19T18:20:00Z; also in `llms.txt`. **Holds** (see 5b for the missing space).

## Look against the mockup (`critic-1/` vs `mockups/unique/shots/round-7/`)

Same page: same flat-plane first screen, same order (lead → dorm → room + Beth → door + Catherine → newly
built → ratings + quotes → spot + forecast → beach row → practicalities → berth footer), same type (Urbanist
only), ground `hsl(233 21% 93%)`, yellow, violet buttons, ladders. Differences I found, each judged:
- The copy is the round-3 passed copy (headings "Just one dorm", new lead, footer line) — content, not look.
- Date lines under the ratings; the lead on the second screen; shorter climb-out — the pick notes. Accept.
- Right-hand lane at 920–1703 px (right column 132 px narrower at 1440, 90 at 1525; right-column paragraphs
  wrap earlier) and the foot bar at 768–919 — pick note 1. Accept; the cost is visible at 1440/1525 as a
  slightly left-weighted column (`w1525-*`), no overlap.
- 768–1007 px photo rows and the berth pair share their row instead of overrunning — fixes a mockup defect
  (horizontal scroll, text under photos). Accept: my sweep finds 0 text lines on photos at all six widths.
- Skip link, tap-target padding, self-hosted Urbanist — invisible at rest. Accept.
Nothing else differs that I could see at 390, 768, 1024, 1440, 1525 or 1920.

## Budget table (playbook §4, `critic-1/audit.json` first_load, 2026-09-23T09:55Z)

| Item | Target | Measured |
|---|---|---|
| First-load transfer | ≤ 1.5 MB | 183 832 B, 6 requests (HTML 62 550, font 27 752, images 93 530) |
| JS, compressed | ≤ 300 KB | 0 B as files; inline 19 027 B raw / 7 318 B gzip |
| Largest above-the-fold image | ≤ 200 KB | none above the fold (drawn first screen); largest on load 28 408 B |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family, 1 file, 27 752 B |
| LCP (throttled) | ≤ 2.5 s | 388 ms (audit); 404 / 388 / 396 ms (mine) |
| CLS | < 0.1 | 0 on load; ≤ 0.00017 over a full wheel scroll with Rosa live (390–1920) |
| Third-party requests on load | 0 | 0 |

With the Rosa widget loaded the page adds 1 JSON fetch + the widget document and its own assets (Google
Fonts, ArcGIS tiles, inside Rosa's frame) — all after scrolling to the block; every line above still met.

## Third-party embeds (playbook §4) and the Rosa forecast (hard constraint 9)

- **Count: 1 embed** (Rosa's iframe; no map embed — "Open the map" is a link). ≤ 2.
- Mapping `kabalana` / "Kabalana" = `concepts.md` l.267; credit "Forecast for Kabalana by Rosa" →
  `https://rosa.surf/spot/kabalana`; iframe `data-src` only in the HTML, `src` set after the JSON arrives:
  `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`, style = tools.md's, not covered or
  cropped (420×500 at ≥1024; 100 % width, max 420, at 390/768 — Rosa's own responsive width).
- Headline only: "0.7–1.0 m / Wednesday 23 September, 08:30 / Swell 11.5 s from the south / Wind 16.2 km/h
  from the west, cross-shore / Rosa, updated …"; 0 day elements.
- Paths, block on screen via wheel scroll, 390 and 1440 (`rosa-*.png`): fresh → headline + widget; 404 after
  1.5 s, abort after 1.5 s, hang 12 s (10 s timeout), 30 h stale, JS off → the plain link "See today's
  forecast for Kabalana on Rosa", headline hidden, **`.fc-now`, `.fc-rosa`, spot heading and beach row at
  identical page boxes before and after on all 12 runs**; CLS ≤ 0.00016 on every JS path, 0 with JS off.

## Facts table (mine, sentence by sentence; page JS on = JS off except the Rosa headline)

| On the page | Dossier key | Verdict |
|---|---|---|
| "Layday Surf Ahangama" (h1, footer, title, og, JSON-LD, llms) | `business.name` | match |
| "Surf, chill and feel at home in Ahangama" | `business.tagline` "Surf, Chill & Feel at Home in Ahangama" | match (case, "&") |
| "A two-minute walk from Kabalana" (hero, title, description) | `location.distance_to_beach` "guests say a 2-minute walk"; `quotes[7]` "just a 2-min walk to Kabalana Beach" | match |
| "9.8/10 on Hostelworld, 10 reviews" + "read 19 September 2026" | `reviews.hostelworld` 9.8 / 10 / fetched 2026-09-19 | match |
| "Check dates" / "or call +94 77 855 3343"; header phone | `booking.other_engines[0]`; `contact.phone` +94778553343 | match |
| "Layday is small and new." | `quotes[0]` "tiny place", `[1]` "quite small"; `[7]` "Newly built", `[4]` "New and clean", `[3]` "new and comfy" | match (guest-observed physical fact) |
| "There is a shared kitchen, plus a garden and terrace." | `facilities[5]`, `[7]` | match |
| "It is quiet, too." | `quotes[5]` "very quiet" | match (guest-observed) |
| "One guest called it "very quiet which was amazing"." | `quotes[5]` verbatim | match |
| "Just one dorm" | `quotes[5]` "just one dorm room"; `room_types[0]` (one type) | match |
| "There is only the one dormitory." | same | match |
| "One guest wrote "super clean" and another "very clean"." | `quotes[6]` "Super clean" (lower-case in `[0]`), `[5]` "very clean" | match |
| "Someone else went as far as "absolutely spotless"." | `quotes[7]` | match |
| "On Hostelworld it scores 10 out of 10 in every category (value for money, security, atmosphere, cleanliness, staff, location and facilities)" | `reviews.hostelworld.categories`, 7 × 10.0 | match |
| "though that is from ten reviews." | `reviews.hostelworld.count` 10 | match |
| "The room" | heading | asserts nothing |
| "The dormitory is air-conditioned, with lockers and luggage storage." | `facilities[8]`, `[12]`, `[20]`, `[14]`; lockers visible in img-013 | match |
| "The shared kitchen has a kettle, a dishwasher and kitchenware, and there is a dining area." | `facilities[5]`, `[6]` | match |
| "The showers are hot." | `facilities[24]` | match |
| "Bed in the dormitory" / "The only room: one air-conditioned dormitory" (+ JSON-LD `containsPlace`, llms) | `room_types[0]`; `quotes[5]`; `facilities[8]`; no bed count (`contradictions[0]`) | match |
| "check dates" (room row) | Hostelworld listing | match |
| Beth's quote, "Beth, England, on Hostelworld, April 2026" | `quotes[7]` (string-equal), author "Beth, Female, 25-30, England", date 2026-04, hostelworld URL | match |
| "Finding the door" | heading | asserts nothing |
| "One guest found it "a little bit difficult to find", so here is the way in." | `quotes[5]` | match |
| "Follow Google Maps." · "You will come to a large black gate; open it." · "Through the gate there is a wooden platform with a door through to the Layday area, to the right of the house." | `location.finding_it` | match ×3 |
| Catherine's quote, "Catherine, Australia, on Hostelworld, April 2026" | `quotes[5]` string-equal | match |
| "Open the map" ×2 (+ JSON-LD `hasMap`, llms) | `location.map_url` character-identical | match |
| "Newly built, and kept that way" | `quotes[7]` "Newly built"; `facilities[15]` | match |
| "There is housekeeping every day." | `facilities[15]` | match |
| "One guest called the beds "super comfy" and the showers "amazing"." | `quotes[7]` | match |
| "Two wrote that they stayed on longer than they had planned, and one was only supposed to stay a night and "ended up here a week"." | `quotes[7]` Beth, `quotes[0]` Taiya (before the truncation) | match |
| 9.8/10 Hostelworld 10 · 10/10 Booking.com 6 · 5.0/5 Google 15, each "read 19 September 2026" | `reviews.hostelworld / booking / google`, `fetched_at` 2026-09-19 | match ×3; not averaged (`contradictions[1]`) |
| Jennine's, Akshay's, Taiya's quotes + attributions (no date on the Booking two) | `quotes[6]`, `[4]`, `[1]` string-equal; dates only where the dossier has them | match ×3 |
| "Kabalana: a sandy beach break for beginners and intermediates, with The Rock, a reef A-frame for advanced surfers." | `location.spot` (thesurfatlas.com) | match, third-party wave description |
| Rosa headline and credit | live Rosa data, never content (schema v0.3) | hard constraint 9, above |
| "Check in from 14:00 · Check in until 19:00 · Check out by 14:00" (+ JSON-LD `checkinTime`/`checkoutTime`) | `stayInfo.*` | match |
| "Check-in is between 14:00 and 19:00, and check-out is by 14:00." | `stayInfo.*`; `hours_note` | match |
| "Credit cards are not accepted. Taxes are included, and it is non-smoking." | `stayInfo.note`; `facilities[4]` | match |
| "WiFi is free, and so is the private parking." | `facilities[0]`, `[1]` | match |
| "There is laundry, daily housekeeping, bicycles to rent and an airport shuttle, and pets can come at no extra charge." | `facilities[16]`, `[15]`, `[17]`, `[2]`, `[19]` | match (laundry not called free) |
| "Credit cards are not accepted. Non-smoking. Taxes included. Reception has limited hours." | `stayInfo.note`; `hours_note` | match |
| 19 amenity rows + notes (page, JSON-LD `amenityFeature`, llms) | `facilities[0,1,8,5,6,7,24,20,14,15,23,16,17,2,13,21,18,18,19]` | match ×19 |
| "Warnagiri Welhengoda, Ahangama 80650, Sri Lanka" ×2 (+ llms ×2; JSON-LD street "Warnagiri Welhengoda", postalCode 80650, locality Ahangama, LK) | `location.address.value` (Google) "Warnagiri welhengoda, Ahangama 80650, Sri Lanka" | match: Google's words, "Welhengoda" capitalised, postcode, street · town postcode · country (playbook §6) |
| "Rates change with the dates. The booking links show what is available." (footer, drawer, llms) | `booking.path.note`; `gaps[]` offers | match |
| "Check dates on Hostelworld / Booking.com / Agoda"; "Call +94 77 855 3343" | `booking.*`; `contact.phone` | match ×4 |
| 10 alt texts | each photograph looked at: berth niche/lamp/pillow (018), dorm through the door (012), lower berth with ladder and keyed drawers (002), berth end, keyed drawer, palm seedling (008), cane lockers with keyholes + concrete shelving (013), basin + cane mirror (003), bench + cushions + painting (017), surfers in white water (019), blue board in the shallows (021), man on wet sand, palms (020) | match ×10; none names a room or a service the dossier lacks |
| title "Layday Surf Ahangama · A two-minute walk from Kabalana"; meta/og description "Surf, chill and feel at home in Ahangama. A two-minute walk from Kabalana. Layday is small and new." | as above | match |
| JSON-LD `@type` Hostel; `telephone`; `geo` 5.97846, 80.35265; `sameAs` 3 listings | `business.type.note` "Booking category 'Hostel'"; `contact.phone`; `location.lat_lng` [5.9784609, 80.3526536] rounded to 5 dp; `booking.*` | match |
| absent, as required: price, season, bed count, WhatsApp, email, reply time, staff languages, owner/staff names in the business's voice, the promised sign, `aggregateRating`, FAQPage | `gaps[]`, `contradictions[0]`, `run_by.note` "unconfirmed" | absent (Rukshan / family only inside Beth's and Jennine's quotes) |

**Totals: 48 rows = 84 individual claims; 84 match, 0 mismatch, 0 unsourced, 0 missing.**

## Open items (facts, not decided here)

- `contact.whatsapp` is schema-required and a dossier gap: blocks a Payload seed (deployer decision).
- `MAP_PIN` template constant (schema has no geo field); no `SITE_URL` yet (canonical, og:url, og:image,
  sitemap come with the production build); no favicon.
- `audit-mockup.mjs` artefacts on this page: `booking_links_reachable: 0` and `keyboard: null` (it looks for
  `#book` / `data-open-drawer`; the page uses `data-drawer`), `reduced_motion.canvases_hidden: 0` (measured
  before the class applies; my check shows `display:none`). `has_skip_link: true` is correct this time.

## Evidence

`sites/layday-surf-ahangama/final/shots/critic-1/`: `audit.json`; `desktop-00…11.png`, `mobile-00…13.png`,
sheets + `shoot.json` (errors `[]`); `w{390,768,1024,1440,1525,1920}-NN.png` + `w{768,1024,1525,1920}-sheet.png`;
`sweep-js.json`, `sweep-rm.json`, `sweep-nojs.json` (dock overlap, empty runs, text-on-photo, overflow per
width); `rosa-{live}-{390,768,1024,1440,1525,1920}.png`, `rosa-{ok,404-slow,abort,hang,stale,nojs}-{390,1440}.png`;
`kbd-{1440,390}-drawer.png`, `tap-390-drawer.png`, `tap-390-dock.png`; `rm-*`, `nogl-*`, `nojs-390-*.png`.
The Playwright helpers ran from the session scratchpad and are not in the repo. (The `ERR_FAILED` console line
in the sweep JSONs is my own block of the Rosa JSON; with the network live the count is 0.)

what the designer prompt got wrong: the three pick notes came back built and measured, and this port is the
first in the run whose designer proved each "never" with a sweep across widths and modes rather than a few
screenshots — worth keeping. What the prompt still does not make the designer look at is the **text layer**:
two inline elements set side by side with CSS spacing and no whitespace between them ("10 reviewsread 19
September 2026", "Sri LankaOpen the map") read fine in every screenshot and wrong in copy-paste, a screen
reader and any text extractor — exactly the surfaces 4i exists for. The designer's self-check should include
`document.body.innerText` diffed against the copy with JS on and off, not only the sheets. Second, the prompt
lets a schema field be rendered twice when two fields carry the same fact (`copyBlocks[5]` and
`stayInfo.note` stacked two lines apart); "No duplication" is a schema rule the copyeditor notes but the
designer never checks on the rendered page. Third, inherited from the mockup and never raised by any station:
horizontally scrolling photo rows on phones fail axe `scrollable-region-focusable`; a designer-side axe run at
390 would have caught it at 4e.

fix list (fail only): none — the round passes. Non-blocking, smallest first, if Build is reopened for any
reason: (1) a space before `.when` and before the address's map link (`index.astro`) → dimension 5/6;
(2) `tabindex="0"` + an `aria-label` on the two `.trio` scrollers, or no sideways scroll at 390 → dimension 6;
(3) render either the Practicalities sentence or `stayInfo.note`'s repeated items, not both — a
designer/copywriter call → dimension 5.
