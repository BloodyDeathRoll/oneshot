# KA Surf Hostel — mockup pre-score

run `2026-09-ahangama-02` · station 4f · critic 0.2.0 · measured 2026-09-20

archetype: **the kitchen noticeboard** (`sites/ka-surf-hostel-and-restaurant/concepts.md`)

mode **quick**: the three mockups, before the human pick. Per `rubric.md`, dimensions 1, 3 and 7 gate at this
stage; 2, 5 and 6 are reported. Every score carries the measurement that produced it; the raw evidence is in
each mockup’s `audit.json`.

## Result

| variant | concept | total | result | hard fails |
|---|---|---|---|---|
| **calm** | “The board” | **94 / 100** | pass | none |
| **interactive** | “Today” | **92 / 100** | pass | none |
| **unique** | “Fifteen at the table” | **94 / 100** | pass | none |

No hard fail on any of the three. No fact contradicts the dossier; every booking target matches it character
for character; no non-business image is used; there are **0 third-party requests on first load**; no keyboard
trap; no content that exists only inside a canvas; no budget line over; no secrets in the output.

### The numbers do not pick for you, and should not

All three carry the same words, the same facts, the same booking path and the same accessibility result,
because they are three designs of one audited content set. The rubric therefore separates them only on
measured weight and speed, which is a few points. **The pick is a design judgement** — the sentence under each
variant is what the rubric asks the critic to produce for it, and the ranking above should not override it.

## calm — “The board” · 94/100

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts match dossier | 10 | 29 numbers rendered; 5 are not literally in copy/en.json (01, 04, 19, 1024, 576), each accounted for as a list index, the harvest date in the legal line, the pixel sizes quoted in that line. 0 unexplained. copy/en.json passed 4c with 0 unsourced and 0 contradicted claims; copy/sources.md maps every paragraph to its dossier fields. |
| 2 | mobile + performance | 8 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 349 KB of 1536 KB (22%); JS 0 KB of 300 KB (0%); fonts 83 KB of 150 KB (55%); largest image 35 KB of 200 KB (17%); LCP 348 ms of 2500 ms (13%); CLS 0.0021 of 0.1 (2%). Worst line 55% of budget, mean 18%. Every line inside budget. |
| 3 | booking CTA end to end | 10 | 3 booking links and tel:+94773746053 diffed character for character against dossier.booking and dossier.contact: identical. Primary action above the fold at 390 px; first tap resolves to https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/. With JavaScript off, 4 booking links stay reachable in the footer block, and every action is already a plain link. |
| 4 | brand fit vs playbook | 9 | playbook §3 order present; the first screen carries what/where, a booking action and a proof point. The variant matches its brief in custom.md and the concept it was built from in concepts.md. No price anywhere, by design: this business publishes none. |
| 5 | copy quality | 9 | the words are copy/en.json unchanged, which passed station 4c (0 unsourced, 0 contradicted, voice audit passed). The template contributes interface labels only. |
| 6 | accessibility | 10 | 12 images, 0 missing alt (0 deliberately empty because decorative); 17 tap targets, 0 under 44 px; lang="en"; skip link first in document order. No drawer; every action is a link. Under prefers-reduced-motion 0 of 0 canvases stay hidden and the photograph shows. |
| 7 | security + delivery baseline | 10 | first load contacted 1 host(s) (localhost:8980), of which 0 third party. Static output, no server code, no runtime call to the CMS, fonts and platform marks vendored, relative URLs, lowercase filenames. The Rosa forecast iframe is the one third-party embed and carries loading="lazy", so it never appears on first load; it is declared as a conflict in notes.md. |

**For the human.** A cream noticeboard: centred name, three score tags, three booking cards, the daily breakfast as a list, everything else pinned. No photograph above the fold and none wider than a postcard anywhere, which is the only honest answer to a 576 px best picture. Also the lightest first screen KA has.

**What would make it fail.** The tilts and the mats have to stay restrained or it becomes scrapbook kitsch.

## interactive — “Today” · 92/100

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts match dossier | 10 | 27 numbers rendered; 3 are not literally in copy/en.json (01, 04, 19), each accounted for as a list index, the harvest date in the legal line. 0 unexplained. copy/en.json passed 4c with 0 unsourced and 0 contradicted claims; copy/sources.md maps every paragraph to its dossier fields. |
| 2 | mobile + performance | 7 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 507 KB of 1536 KB (32%); JS 6 KB of 300 KB (1%); fonts 83 KB of 150 KB (55%); largest image 77 KB of 200 KB (38%); LCP 1096 ms of 2500 ms (43%); CLS 0.0005 of 0.1 (0%). Worst line 55% of budget, mean 28%. Every line inside budget. |
| 3 | booking CTA end to end | 10 | 3 booking links and tel:+94773746053 diffed character for character against dossier.booking and dossier.contact: identical. Primary action above the fold at 390 px; first tap resolves to #book. With JavaScript off, 5 booking links stay reachable in the footer block, and all 8 drawer triggers are plain links to it. |
| 4 | brand fit vs playbook | 9 | playbook §3 order present; the first screen carries what/where, a booking action and a proof point. The variant matches its brief in custom.md and the concept it was built from in concepts.md. No price anywhere, by design: this business publishes none. |
| 5 | copy quality | 9 | the words are copy/en.json unchanged, which passed station 4c (0 unsourced, 0 contradicted, voice audit passed). The template contributes interface labels only. |
| 6 | accessibility | 10 | 11 images, 0 missing alt (0 deliberately empty because decorative); 19 tap targets, 0 under 44 px; lang="en"; skip link first in document order. Drawer opens, Esc closes it and focus returns to the trigger, verified at 390 px and 1440 px. Under prefers-reduced-motion 1 of 1 canvases stay hidden and the photograph shows. |
| 7 | security + delivery baseline | 10 | first load contacted 1 host(s) (localhost:8981), of which 0 third party. Static output, no server code, no runtime call to the CMS, fonts and platform marks vendored, relative URLs, lowercase filenames. The Rosa forecast iframe is the one third-party embed and carries loading="lazy", so it never appears on first load; it is declared as a conflict in notes.md. |

**For the human.** The same board with today at the top of it: one card whose print turns from breakfast to the beach to sundown to the long table as you scroll, with the air shimmering in it.

**What would make it fail.** The today-card has to feel like an event at postcard size. Too small and the idea is invisible.

## unique — “Fifteen at the table” · 94/100

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts match dossier | 10 | 21 numbers rendered; 1 are not literally in copy/en.json (19), each accounted for as a list index, the harvest date in the legal line. 0 unexplained. copy/en.json passed 4c with 0 unsourced and 0 contradicted claims; copy/sources.md maps every paragraph to its dossier fields. |
| 2 | mobile + performance | 8 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 401 KB of 1536 KB (26%); JS 5 KB of 300 KB (1%); fonts 83 KB of 150 KB (55%); largest image 47 KB of 200 KB (23%); LCP 1028 ms of 2500 ms (41%); CLS 0.0001 of 0.1 (0%). Worst line 55% of budget, mean 24%. Every line inside budget. |
| 3 | booking CTA end to end | 10 | 3 booking links and tel:+94773746053 diffed character for character against dossier.booking and dossier.contact: identical. Primary action above the fold at 390 px; first tap resolves to https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/. With JavaScript off, 5 booking links stay reachable in the footer block, and all 7 drawer triggers are plain links to it. |
| 4 | brand fit vs playbook | 9 | playbook §3 order present; the first screen carries what/where, a booking action and a proof point. The variant matches its brief in custom.md and the concept it was built from in concepts.md. No price anywhere, by design: this business publishes none. |
| 5 | copy quality | 9 | the words are copy/en.json unchanged, which passed station 4c (0 unsourced, 0 contradicted, voice audit passed). The template contributes interface labels only. |
| 6 | accessibility | 10 | 11 images, 0 missing alt (0 deliberately empty because decorative); 21 tap targets, 0 under 44 px; lang="en"; skip link first in document order. Drawer opens, Esc closes it and focus returns to the trigger, verified at 390 px and 1440 px. Under prefers-reduced-motion 1 of 1 canvases stay hidden and the photograph shows. |
| 7 | security + delivery baseline | 10 | first load contacted 1 host(s) (localhost:8982), of which 0 third party. Static output, no server code, no runtime call to the CMS, fonts and platform marks vendored, relative URLs, lowercase filenames. The Rosa forecast iframe is the one third-party embed and carries loading="lazy", so it never appears on first load; it is declared as a conflict in notes.md. |

**For the human.** The whole wall at once. Overlapping type, the three scores as a tally, the prints set along a table edge, the guests’ words as place cards, and the long-table picture run like a home film.

**What would make it fail.** The grain has to read as film, not as a filter.

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

# Round 3 — garden concepts, designer 0.3.2, 2026-09-21

run `2026-09-ahangama-02` · station 4f · mode **quick** · critic 0.3.0 (runtime prompt from `node tools/prompt.mjs critic`) · measured 2026-09-21/22
archetype: **the garden** (`sites/ka-surf-hostel-and-restaurant/concepts.md`, round 3). The round-1 and round-2 sections above describe mockups now in `mockups-rejected-02/`.

Same checks, same order, same settings for all three (hard constraint 5): `tools/audit-mockup.mjs` → `tools/shoot.mjs` (defaults: step 0.9, settle 700, 1440×900 and 390×844) → `tools/check-design.mjs --no-shots` → `tools/check-places.mjs` → facts table → CTA tap-through at 390 px (external navigation blocked, href recorded) → keyboard pass at 1440 → reduced motion → JavaScript off → look-log → Rosa (4e level).

Evidence: each mockup's `audit.json`; `shots/critic/` (`desktop-sheet.png`, `mobile-sheet.png`, per-viewport captures, `shoot.json`, plus `tap-390.png`, `reduced-motion-1440.png`, `nojs-390.png`; calm also `keyboard-open-1440.png`).

## Result

| variant | concept | total | result | hard fails |
|---|---|---|---|---|
| calm | "Field" | **77.5 / 100** | **fail** | HF-1 |
| interactive | "Planks" | **81 / 100** | **fail** | HF-1 |
| unique | "Canopy" | **87.5 / 100** | **fail** | HF-1 |

**HF-1 (identical in all three): the CC BY-SA atmosphere photograph `stock-011` is served as a re-saved file.** `dist/img/stock-011-1600.jpg` (calm, unique; 1600×1200) and `dist/img/stock-011-1400.jpg` (interactive; 1400×1050) are downscaled re-encodes of the 4032×3024 Commons file. PLAN.md §9 (committed in `dd84555`): a CC BY-SA file "is shown whole with its credit and is never cropped, **re-saved** or fed through a shader". Rubric hard fail: "an image is used against the run's image policy (PLAN.md §9)". Read literally, the rubric's other line ("under a licence the policy excludes (share-alike, NC, ND)") fails it too, but that parenthetical predates the §9 amendment that allows BY-SA for display. Either reading fails; neither is a fact or booking problem. The credit string matches `stock/index.json` character for character in all three, the frame is whole 4:3 (not cropped), and `check-places.mjs` passes. The fix is small: serve the original file lazily, or drop the image (concepts.md: "every concept still works if `stock-011` is removed"). Whether downscaling counts as "re-saving" is Shahar's call. I apply the text as written.

Nothing else is a hard fail. 0 fact mismatches. Every booking href is identical to the dossier. No non-business image is presented as the business. No runtime CMS call. No keyboard trap. No canvas-only content. No budget line is more than 50 % over. No secrets. The only third-party hosts on first load are `fonts.googleapis.com` and `fonts.gstatic.com`, which `agents/critic/tools.md` says to expect at 4e (they become a defect in full mode). Quick gate: dimensions 1, 3 and 7 are ≥ 6 on all three, so HF-1 alone decides the result.

### Default-look facts (`check-design.mjs`, hard constraint 4)

All three: `ok`. h1, h2 and body are all Outfit. Ground rgb(240, 241, 242) = hsl(210 7% 95%), a cool white, not in the cream range. 0 all-caps labels. Labelled headings: calm 0/6, interactive 0/7, unique 0/8. No `WARN default look` line. `check-places.mjs`: 3 borrowed-image uses checked, 0 failing.

### Budget table, measured (`audit.json` first_load: 390×844, 1.6 Mbps, 150 ms RTT, 4x CPU, no scroll)

| line | budget | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer | ≤ 1536 KB | 508 KB (33 %) | 578 KB (38 %) | 242 KB (16 %) |
| JS (external) | ≤ 300 KB | 0 (no JS at all) | 0 external; script inline in a 44.6 KB HTML | 0 external; script inline in a 68.4 KB HTML |
| fonts | ≤ 150 KB, ≤ 2 families | 32 KB, 1 family (Google) | 32 KB, 1 family (Google) | 32 KB, 1 family (Google) |
| largest image | ≤ 200 KB | 130 KB | 127 KB | 74 KB |
| LCP | ≤ 2500 ms | **2760 ms (+10 %)** | **3044 ms (+22 %)** | 468 ms |
| CLS | < 0.1 | 0.005 | 0.041 | 0 |
| third-party on load | 0 | 2 hosts (Google Fonts, expected at 4e) | same | same |
| requests after a full scroll (my pass) | — | only Google Fonts; no Rosa | only Google Fonts; no Rosa | only Google Fonts; no Rosa |

### Tap-through, 390×844, touch (external navigation blocked; 0 navigations happened on any tap)

| variant | first-screen primary | what the tap did | booking targets then visible |
|---|---|---|---|
| calm | `<summary>` "Check dates" in the fixed bar. It is **not a link** (details element, no href) | the sheet opened in place (`shots/critic/tap-390.png`) | `https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/`, `https://www.booking.com/hotel/lk/ka-surf-hostel.html`, `https://www.agoda.com/en-in/ka-surf-hostel-h61738910/hotel/ahangama-lk.html`, `tel:+94773746053` |
| interactive | `<a data-book href="https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/">` in the fixed bar | the script opened the overlay sheet; focus moved to "Close" | the same three listings + tel |
| unique | `<a href="https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/">` in the fixed bar | the slide-out opened; focus moved to the Hostelworld tile | the same three listings + tel |

All hrefs match `dossier.booking.engine_url`, `booking.other_engines[]` and `contact.phone` character for character. There is no WhatsApp in the dossier (`contact.whatsapp.gap`), so no prefill is possible. Interactive and unique carry the tapped room row only as text at the head of the panel, with no invented URL parameters.

### Keyboard (1440), reduced motion, JavaScript off

| | calm | interactive | unique |
|---|---|---|---|
| skip link | yes (`audit.json`) | yes | yes |
| focus ring | outline auto 1px | outline solid 2px | outline solid 2px |
| panel opens from keyboard | Enter on `<summary>` opens it; Tab runs through the 3 tiles + tel, then leaves the panel (no trap) | Enter on "Check dates" opens it; Tab cycles inside the dialog (tel → 3 tiles → Close) | Enter on a room's "Check dates" opens it; Tab cycles inside (3 tiles → tel → Close) |
| Esc | **does not close** (details stays open, 1 → 1) | closes; focus returns to the trigger | closes; focus returns to the room row's trigger |
| reduced motion | no canvas, no JS: same static page | 1 canvas visible, slats drawn once and open (`reduced-motion-1440.png`) | both canvases `display:none`; the inline SVG canopy is shown |
| JS off (390) | 4387 chars of text; the sheet still opens (details); 5 booking links in `#book` | 4674 chars; every "Check dates" is a plain Hostelworld link; footer tiles present; Rosa block = "See today's forecast for Kabalana on Rosa". `audit.json` `no_js.booking_links_reachable: 0` only because the page has no `id="book"` (tool assumption, tools.md) | 4937 chars; every "Check dates" is a plain Hostelworld link; `#book` tiles present; **the Rosa block still shows the fixture numbers**, not the plain link |
| `audit.json` alt / tap targets | 15 images, 0 missing alt; 26 tapables, 0 under 44 px | 16 / 0; 18 / 0 | 12 / 0; 21 / 0 |

Not run in quick mode: axe and measured contrast. I claim no contrast result.

### Look-log check (base.md)

| variant | first-screen rounds | rounds whose sheets changed | round with no visible change |
|---|---|---|---|
| calm | 3 (r1–r3; first capture mean pixel diff 34.4, 14.8) | r2–r6 (each changes at least one width) | none |
| interactive | 3 (r1–r3; 25.9, 5.2) | r2–r6 | **r7: max capture diff 0.0 vs r6 at both widths** |
| unique | 3 (r1–r3; 31.4, 5.5) | r2–r6 | **r7: max capture diff 0.0 vs r6 at both widths** |

By base.md's wording ("rounds with no visible change between sheets"), interactive r7 and unique r7 are reportable as a **station failure** of the look loop. Both designer notes call r7 a verification shoot after a fix inside the closed booking panel, so the change could not appear in the scrolled sheets. Each variant still has three first-screen rounds with visible change and five changing rounds in all. Whether that counts as a hollow loop is the orchestrator's call; I report the fact.

### Rosa forecast (hard constraint 9, 4e level: mapping and label only)

| | interactive | unique |
|---|---|---|
| spot id on page | `R = {"id": "kabalana", …}` → credit `https://rosa.surf/spot/kabalana` | static `https://rosa.surf/spot/kabalana` |
| concepts.md mapping | dossier "Kabalana beach break" → Rosa `kabalana` / "Kabalana"; fixture `spot.id` `kabalana`, `spot.name` "Kabalana": **match** | same: **match** |
| label | "Forecast for Kabalana by Rosa": **match** | "Forecast for Kabalana by Rosa": **match** |
| timestamp | "Rosa data from 21 Sep 2026, 19:55, Sri Lanka time" = fixture `generated_at` 14:25 UTC | "Rosa, updated 21 September 2026, 19:55" = same |
| Rosa requests (first load / after full scroll) | 0 / 0 (fixture inlined) | 0 / 0 (fixture inlined) |

For 4g, not scored here: the lazy single request, the 24 h rule and the blocked-request path are not built in either variant. Unique's JS-off path shows fixture numbers instead of the plain link.

## Facts table (mechanical: every checkable item on the rendered page → dossier key)

Shared rows (present on all three pages, same values):

| on page | dossier key | verdict |
|---|---|---|
| "KA Surf Hostel" | `business.name` | match |
| "Surf, chill and feel at home in Ahangama" | `business.tagline` (case adapted in passed copy) | match |
| "Five minutes from Kabalana Beach" / "five-minute walk" | `location.distance_to_beach` "a 5-minute walk" | match |
| 9.8/10 Hostelworld, 66 reviews | `reviews.hostelworld` 9.8 / 10 / 66 | match |
| 9.5/10 Booking.com, 38 reviews | `reviews.booking` 9.5 / 10 / 38 | match |
| 4.8/5 Google, 42 reviews | `reviews.google` 4.8 / 42 | match |
| staff 9.9 Booking.com, highest there | `reviews.booking.categories.Staff` 9.9 (next highest 9.4) | match |
| Hostelworld staff 9.9; value for money and security at 10 | `reviews.hostelworld.categories` | match |
| dengue / Kandy / Ayurvedic paraphrase (copyBlocks[1]) + Mia testimonial | `reviews.quotes[]` Mia, 2026-02 | match. It appears twice by **Shahar's decision** (copy/review.md round 3); recorded as a fact, not a defect |
| 5 testimonials (Clara, Elena, Mia, Wolfgang, Saketh), text | `reviews.quotes[]` | match, verbatim (script diff after normalising quote marks: 0 differences) |
| authors "Elena, Germany", "Mia, USA", "Saketh, England" | `reviews.quotes[].author` (age/sex dropped in the passed copy) | match |
| dates March 2026 / February 2026 / February 2026 | `reviews.quotes[].date` 2026-03 / 2026-02 / 2026-02 | match. Clara and Wolfgang are undated in both page and dossier |
| sources Booking.com / Hostelworld per quote | `reviews.quotes[].source_url` | match |
| 6 room rows (3 dorms, double, 2 deluxe doubles, beds) | `room_types[]` | match |
| A/C + fan, locker, fridge, hot showers, modern bathrooms, some open to the sky | `business.description_long`, `facilities[]` | match |
| breakfast included, Sri Lankan, rotis/hoppers/pancakes/eggs/fruit, vegan option, changes daily | `description_long`, `facilities[]`, `reviews.quotes[]` (Elena) | match |
| 17 amenity lines, "Free WiFi" only (fibre claim not repeated) | `facilities[]`; `contradictions[]` WiFi | match |
| pets on request, no charge; children not accommodated; no cots/extra beds | `facilities[]`, `house_rules[]` | match |
| Koggala Airport about 5 km; station a little over 2 km | `location.nearby` 3.3 mi (5.3 km) / 1.3 mi (2.1 km) | match |
| "The property arranges a shuttle" | `facilities[]` "shuttle service" | match |
| check-in 13:00–23:00, check-out by 13:00, reception 24 h | `hours_note` (Hostelworld window; contradiction left unpublished as recorded) | match |
| address "No 207/A, Welhengoda, 80650 Ahangama, Sri Lanka" | `location.address` | match |
| phone +94 77 374 6053 / `tel:+94773746053` | `contact.phone` | match |
| map link | `location.map_url` | match |
| Kabalana spot sentence, The Rock | `location.spot` | match (shared-context per copy review) |
| three listing URLs | `booking.engine_url`, `booking.other_engines[]` | match |
| "Rates change with the season…" | `gaps[]` offers | match (no number on any page) |
| atmosphere credit "Ahangama view — Sasith Lakshan wickramasinghe, CC BY-SA 4.0, via Wikimedia Commons" + Commons link | `stock/index.json` stock-011 `credit`, `source_url` | match |
| parking, restaurant, fibre, season, WhatsApp, email, reply time | `contradictions[]`, `gaps[]` | absent from all three pages, as required |

Per-variant rows (text that is **not in `copy/en.json`**, beyond interface labels, which the scripted diff lists in full):

| variant | on page | dossier key | verdict |
|---|---|---|---|
| calm | footer link "Instagram" → `https://www.instagram.com/kasurfhostel/` | `contact.socials.instagram` | match; not in passed copy |
| calm | "Photographs of the hostel: KA Surf Hostel, from its Booking.com listing and its Instagram." | `images[].license` business-owned (Booking.com, Instagram) | match. The three beach frames it covers are not "of the hostel" (wording) |
| calm | meta description "A family-run hostel with dorms and private rooms, five minutes from Kabalana Beach." | `business.run_by`, `room_types[]`, `distance_to_beach` | match; not in passed copy |
| calm | copyBlocks[0] body ("A family runs this place…", "Dorms if you want the company…") | — | **missing from the page** (heading used, body omitted) |
| interactive | footer "Ratings as published on Hostelworld, Booking.com and Google in September 2026." | `reviews.hostelworld/booking/google.fetched_at` 2026-09-19 | **match**; not in passed copy (notes.md flags it as the designer's own line). No other added claim found |
| interactive | "Photographs by KA Surf Hostel, except the view of the reef: …" | `images[].license` business-owned | match on ownership. "by" states authorship; the dossier records ownership/upload, not the photographer |
| interactive | meta description, as calm | same | match; not in passed copy |
| interactive | forecast "0.7–1.1 m", "Chest-high, swell 13 s from the S, wind 7 km/h cross-shore from the W", 5 day cells | Rosa fixture (not dossier; schema: forecast values are never content) | 4e: mapping and label checked only (above) |
| interactive | copyBlocks[0] body | — | **missing from the page** |
| unique | "Photographs: KA Surf Hostel's own, from its Booking.com listing and Instagram, except the reef at Ahangama: …" | `images[].license` | match |
| unique | forecast "Now, Monday 20:30", "Swell 12.6 s from the south", "Wind 7 km/h from the west, cross-shore", 5 day cells | Rosa fixture `current.t` 2026-09-21T20:30+05:30 (a Monday) | 4e: mapping and label only |
| unique | all six copy blocks | en.json | all present |

Totals: calm 0 mismatches / 0 unsourced claims; interactive 0 / 0; unique 0 / 0.

---

mode: quick        round: 3        variant: calm ("Field")
total: 77.5 / 100         result: fail        hard_fails: [HF-1 stock-011 (CC BY-SA) served re-saved at 1600×1200, against PLAN.md §9]

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | facts table: 0 mismatch, 0 unsourced. copyBlocks[0] body omitted. Footer Instagram link and photo line not in passed copy (both trace to the dossier) |
| 2 | mobile + performance | 6 | LCP 2760 ms, 10 % over budget. Every other line inside (508 KB, 0 JS, 32 KB fonts, largest image 130 KB, CLS 0.005). Mobile sheet: no overflow or overlap seen in the 12 captures |
| 3 | booking CTA | 8 | 390 tap: `<summary>` opens the sheet with the 3 exact listing URLs + tel. The primary control is not itself a link (rubric: "a real link"), though it works with JS off because the page has no JS. The footer `#book` tiles and per-room links are plain links |
| 4 | brand fit | 8 | desktop-sheet 1: what + where, booking, 9.8/66 proof above the fold. Rooms start on capture 2. Playbook §3 order held (rooms, breakfast, family, amenities, spot, location, contact). Calm brief (type, colour, composition, no motion) met: 0 JS, 0 canvas |
| 5 | copy quality | 8 | words are en.json verbatim except the omitted intro body. Dengue repetition per Shahar's decision |
| 6 | accessibility | 7 | 0 missing alt, 0 targets < 44 px, skip link, headings H1→H2. The `<details>` sheet does not close on Esc (tested; notes.md conflict 2). No trap. Contrast not measured |
| 7 | security + delivery | 8 | static single file, no JS, no CMS call, relative lowercase image paths, 0 Rosa requests. Google Fonts on load (expected at 4e, a defect at full). HF-1 is scored under the hard-fail list, not here |

**For the human:** Zero JavaScript. The first tap opens an in-page sheet, not a link, and it does not close on Esc. LCP measured 2760 ms, 10 % over the 2500 ms budget. The intro paragraph ("A family runs this place…") is not on the page. It fails only on HF-1, which all three share.

---

mode: quick        round: 3        variant: interactive ("Planks")
total: 81 / 100         result: fail        hard_fails: [HF-1 stock-011 (CC BY-SA) served re-saved at 1400×1050, against PLAN.md §9]

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | 0 mismatch. The added footer line on the ratings date matches `fetched_at` 2026-09-19 but did not pass the copyeditor. "Photographs by" asserts authorship where the dossier records ownership. copyBlocks[0] body omitted |
| 2 | mobile + performance | 6 | LCP 3044 ms, 22 % over (the five 576 px JPEG rail prints, notes.md conflict 8). 578 KB, largest image 127 KB, CLS 0.041. Mobile: the forecast day row runs off the right edge as a sideways row (mobile-sheet capture 11), intended per notes |
| 3 | booking CTA | 9 | 390 tap: a real `<a href>` to the Hostelworld listing opens the sheet with the 3 exact URLs + tel. JS off: the same link lands on Hostelworld. The room row is named in the sheet |
| 4 | brand fit | 9 | desktop capture 1: what + where, Check dates, 9.8 set large, prints recognisable through the slats at rest (the concept's fail condition is not hit). The family section comes before rooms by design. Interactive brief met: pointer-driven slats, one opening moment, sheet ease |
| 5 | copy quality | 7 | intro body omitted. The dengue paraphrase sits directly under Mia's own quote (Shahar's decision on the duplication; the placement makes it adjacent). One template sentence added outside the passed copy |
| 6 | accessibility | 9 | the dialog traps focus while open, Esc closes it, focus returns to the trigger. Visible 2 px focus ring, skip link, 0 missing alt, 0 targets < 44 px. Reduced motion: slats static and open, the photographs are DOM `<img>`. Contrast not measured |
| 7 | security + delivery | 8 | static single file, inline script, no CMS call, 0 Rosa requests (fixture inlined). Google Fonts on load (expected at 4e) |

**For the human:** The only variant that adds a sentence the copyeditor never passed (the September 2026 ratings date, which is correct against the dossier). LCP measured 3044 ms, 22 % over budget. The intro paragraph is missing. The keyboard and Esc behaviour of the sheet passed. It fails only on HF-1.

---

mode: quick        round: 3        variant: unique ("Canopy")
total: 87.5 / 100         result: fail        hard_fails: [HF-1 stock-011 (CC BY-SA) served re-saved at 1600×1200, against PLAN.md §9]

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatch, 0 unsourced. All six copy blocks present. The photo credit line matches the dossier licences |
| 2 | mobile + performance | 8 | every budget line inside: 242 KB, LCP 468 ms, CLS 0, largest image 74 KB. At 390 the slide-out's "Hostelworld" and "Booking.com" run to and past their tile edges (`shots/critic/tap-390.png`) |
| 3 | booking CTA | 9 | 390 tap: a real `<a href>` to Hostelworld opens the slide-out with the 3 exact URLs + tel. JS off lands on Hostelworld. The room row is carried as text only |
| 4 | brand fit | 7 | the first screen holds what + where, Check dates and 9.8/66. Desktop captures 2–3 of 16 (and mobile 2–3 of 18) are almost empty (the green spine forming), so rooms first appear on capture 4 (≈ 2400 px down). The page is the longest of the three (12954 px desktop). Unique brief met: WebGL canopy, one orchestrated scroll moment |
| 5 | copy quality | 9 | en.json complete and verbatim. Dengue repetition per Shahar's decision |
| 6 | accessibility | 9 | the slide-out traps focus while open, Esc closes it, focus returns to the room row. 2 px focus ring, 0 missing alt, 0 targets < 44 px. Reduced motion: canvases `display:none`, a static SVG canopy. The skip link is present per `audit.json`, though the first Tab landed on "Call" in my pass. Contrast not measured |
| 7 | security + delivery | 8 | static single file, inline script, no CMS call, 0 Rosa requests. Google Fonts on load (expected at 4e). The `?svg` authoring hook is still in the script (notes.md) |

**For the human:** The only variant inside every budget line (LCP 468 ms) and the only one carrying all six copy blocks. Two near-empty screens sit between the first screen and the first room. At 390 px the booking tile names overflow their tiles. With JS off it shows the fixture forecast numbers instead of the fallback link. It fails only on HF-1.

---

what the designer prompt got wrong: `agents/designer/base.md` says CC BY-SA files get "no re-crop on disk, no shader input", but PLAN.md §9 says such a file is "never cropped, **re-saved** or fed through a shader". The designer followed base.md, and the concepts.md line "`stock-011` lazy … ≤ 180 KB as AVIF at 1600 w", and shipped a re-saved downscale in all three mockups. base.md should quote §9's three verbs and say how a BY-SA file reaches a page without re-saving (the original file, lazy, below the fold), and the creative-director prompt should not specify a re-encode for a BY-SA file. Separately, `rubric.md` 0.1.0 still lists "share-alike" as an excluded licence, which contradicts §9 as amended; that belongs in a learn-mode proposal. Smaller lessons from this round: two of three mockups dropped `copyBlocks[0]`'s body without recording it as a conflict; one added a sentence outside the passed copy; and the "rounds with no visible change" rule needs an exception for a verification round whose change sits in a hidden state, or the designer should shoot that state as the round's sheet.

fix list (fail only, smallest first, identical for all three): 1) HF-1: serve the unmodified `stock-011` file lazily, or remove it (dimension: hard fail / image policy). Then per variant: calm: Esc closes the sheet; restore the copyBlocks[0] body. Interactive: restore the copyBlocks[0] body; send the ratings-date line to the copyeditor. Unique: fit the tile names at 390 px.


---

# full · round 1 (4g build, 2026-09-22)

critic 0.3.1 · station 5 · run `2026-09-ahangama-02` · under review: `sites/ka-surf-hostel-and-restaurant/final/dist/` as built (not rebuilt; files dated 15:25, after 4h and 4i), with `final/notes.md`, `seo-report.md`, `aiseo-report.md`. Picked mockup: `mockups/unique/` ("Canopy"), last round 16. Pick: ledger `mocked → picked`, `agent: "human"`, 2026-09-22T08:14:12Z. All tests ran against `dist/` on a plain `python3 -m http.server` (no rewrites, no compression). Headless Chromium, software GL. No real phone.

```
mode: full        round: 1        variant: unique ("Canopy")
total: 73 / 100           result: fail        hard_fails: [HF-1 two claims with no dossier entry (breakfast "more often than anything else"; spot "when the swell is up")]
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 3 | Facts table below: 34 rows match, 0 contradict, **2 have no dossier entry** (HF-1). The same two sentences are in `llms.txt`. JSON-LD: 14/14 keys match. Both sentences come from the passed copy (`copy/en.json` `copyBlocks[about]` and `spot`), not from the build |
| 2 | mobile + performance | 10 | `final/audit.json`: 208 754 B first load, 0 B JS files (inline only), 1 font family / 32 292 B, largest image 47 428 B, LCP 380 ms, CLS 0, 0 third-party. No horizontal overflow at 390/1440/1525/1920 (`scrollWidth − innerWidth` = 0). Booking tile names fit at 390 (every child inside its tile). Mobile sheet shows no overlap across 18 captures |
| 3 | booking CTA | 9 | 390 tap on the bar's "Check dates" opens the slide-out (URL unchanged). Its 4 links are the 3 listing URLs, character-identical to `booking.engine_url` / `other_engines`, plus `tel:+94773746053` = `contact.phone`. Tapping the first tile navigates to Hostelworld (blocked and logged). JS off: the same link navigates straight to Hostelworld. 17 listing hrefs, 5 tel hrefs, all exact. No prefilled message is possible: there is no WhatsApp (dossier gap) and OTAs take no message. The room row is carried only as text in the slide-out |
| 4 | brand fit | 8 | First screen: what + where, Check dates, 9.8/66 with source. Order: rooms, breakfast, amenities, staff and reviews, getting here, spot + forecast, booking. That puts the spot after location, against playbook §3 (same as round 16). Ratings carry no capture date (playbook §2). Pick notes 1–3 are met (below). **One visible difference beyond the notes:** at 1920 the headline starts at x = 350, not 200 as in round 16 (+150 px; 1440 and 1525 unchanged). Unique brief met: WebGL canopy, one scroll moment |
| 5 | copy quality | 8 | Page text is `en.json` verbatim, and all six copy blocks are present. Shahar's accepted dengue duplication is in `copyBlocks[1]`. The breakfast sentence says guests mention breakfast "more often than anything else", while two sections later the page says "'Family' is the word guests keep using". That is scored under 1, and noted here because a reader sees the two sentences disagree |
| 6 | accessibility | 8 | axe-core 4.11.1 (local copy, nothing installed), WCAG 2.0/2.1 A+AA: **0 violations at 1440. 1 serious at 390: `scrollable-region-focusable` on `.crops`** (the beach-photo row scrolls sideways and no keyboard can reach it). Colour contrast was "incomplete" only because the canopy image is behind the text; sampled pairs are 5.98:1 (ink on coral), 12.69:1 (ink on blue) and 18.01:1 (ink on ground). Keyboard: dialog (`role=dialog`, `aria-modal`, labelled) traps Tab and Shift+Tab, Esc closes it, and focus returns to the trigger (hero and room row). 2 px solid focus ring. Reduced motion: canvas `display:none`, static SVG shown, no heading drift. 14/14 img have alt (3 decorative marks have empty alt). 0 tap targets under 44 px. H1 + 7 H2 in order. No skip link: `audit.json`'s `has_skip_link: true` is a false positive (it matches the `#top` name link); the first Tab lands on "Call" |
| 7 | security + delivery | 8 | Static output only, no CMS call at runtime, no secrets or internal URLs (grep: 0 hits for localhost / API key / `/api/media` / `/home/`). Relative, lowercase paths. Font self-hosted. Offline (every non-local request aborted): font loads, 14/14 images, forecast and map fall back to links. 0 third-party requests on first load, at 390 with JS on and with JS off. After scroll, the OpenStreetMap embed makes 7 more third-party requests: a second third-party embed against playbook §4's "the one third-party embed" (open, Shahar's call). `?no-webgl` and `?open` test hooks are still in the script |

`total = 3×2.5 + 10×2 + 9×1.5 + 8 + 8 + 8 + 8 = 73`. Full-mode pass also needs no hard fail, a total of at least 80 and every dimension at 6 or above. This round has a hard fail, 73, and dimension 1 at 3. Every playbook §4 budget line is met.

## Budget table (playbook §4, `final/audit.json` first_load: 390×844, 1.6 Mbps, 150 ms RTT, 4x CPU, no scroll)

| Item | Target | Measured |
|---|---|---|
| First-load transfer | ≤ 1.5 MB | 208 754 B (HTML 76 333, fonts 32 292, images 100 129), 7 requests, host `localhost` only |
| JS, compressed | ≤ 300 KB | 0 B as files. The script is inline in the HTML |
| Largest above-the-fold image | ≤ 200 KB | none above the fold (the first screen is drawn). Largest image fetched on first load: 47 428 B |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family (Outfit), 1 file, 32 292 B |
| LCP | ≤ 2.5 s | 380 ms |
| CLS | < 0.1 | 0 (also 0 across the full scroll with the forecast arriving, PerformanceObserver) |
| Third-party requests on load | 0 | 0 |

## Default-look facts (`check-design.mjs … --no-shots`, hard constraint 4)

`ok`, 0 problems, 0 warnings. Look: fonts h1/h2/body "Outfit"; ground rgb(240, 241, 242) = hsl(210 7% 95%); all-caps labels 0; labelled headings 0/8. `check-places.mjs ka-surf-hostel-and-restaurant`: 0 borrowed image uses checked, 0 failing. The build uses only `dossier/…/assets` business-owned photographs (img-001…006, 008, 012, 020, 021, 023) and no stock.

## Look against round 16 (`final/shots/critic-1/` vs `mockups/unique/shots/round-16/`)

Sheets opened: `critic-1/desktop-sheet.png` (15 captures, page 11 835 px) and `mobile-sheet.png` (18, 13 656 px), against round 16 (16 / 12 285 px and 19 / 14 078 px). The page is 450 px shorter on desktop and 422 px on the phone. That is the shorter canopy walk (note 1). Capture for capture, the sections, photographs, type, colours, green column, tiles and footer are the same. Differences:

- **Note 1 (expected):** round 16 has two near-empty captures after the hero (01 and 02 on both sheets). The build has one: desktop 01 is the green column with the lead's first line at its foot, and 02 is full. Phone 01 is the same, and 02 is full.
- **Note 2 (expected):** the light blade that nicked "Kabalana" in round 16 (`round-16/w1525-00.png`, `w1920-00.png`, mobile-00) is gone (`critic-1/w1525-00.png`, `w1920-00.png`, mobile-00). Pixel test below.
- **Note 3 (expected):** the forecast headline shows live data ("0.7–1.0 m, Tuesday 22 September, 14:30 at Kabalana"), not the fixture.
- **Not in the notes (regression, small):** at 1920 the headline block moved right, from x = 200 (round 16) to x = 350, to sit on the 1200 px column (`w1920-00.png` vs `round-16/w1920-00.png`; measured with JS off). It is unchanged at 390, 1440 and 1525. `notes.md` §2 records it as part of note 2. Shahar asked only for the leaves to be kept off the headline, not for the headline to move.
- Not counted: the map tiles are still blank in the capture that first reaches "Getting here" (desktop 10, `w1525-10`). They are drawn one capture later. That is load time under a 700–900 ms settle, not layout. The Agoda tile is black in desktop 13 because the shoot's pointer hovers it (as in round 16).

1525 (Shahar's viewport) and 1920: `critic-1/w1525-00…14.png`, `w1920-00…14.png` (captured at 1525×900 and 1920×900 by a /tmp helper, since deleted). `.fc` block and `.tiles` span 163–1363 at 1525 and 360–1560 at 1920, the same as round 16 at both widths (JS off, measured on both builds). No overflow.

## Pick notes, verified

1. **One near-empty screen after the hero:** see above (sheets). Round 16 had two.
2. **No leaf on the headline:** pixel test (/tmp Playwright + sharp). The headline text is made transparent, and every pixel inside its line boxes that differs from the ground is counted. Result: **0 non-ground pixels** at 390 (44 096 px checked), 1440 (325 032), 1525 (363 584) and 1920 (436 118). That holds in each state tested: WebGL live, WebGL after a pointer sweep, reduced motion and JS off. At 390 only JS off completed; the three JS-on runs at 390 also read 0/44 096 in the first attempt, before that run died on the JS-off case. Positive control, green painted into the last 10 % of the headline at 1440: 5 394 px counted, so the test sees green when it is there. The leaves still pass *behind* the headline while it scrolls away, as `notes.md` records. With JS on, the pointer was swept across the headline in 30 steps first ("pointer").
3. **Forecast headline live, widget after it:** with the network open at 390, the page's own request `GET https://rosa-data-opal.vercel.app/data/spots/kabalana.json` (main frame) went out at 13 127 ms, and the widget document `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric` at 13 345 ms, after the JSON. Headline drawn: "0.7–1.0 m / Tuesday 22 September, 14:30 at Kabalana / Swell 12.4 s from the south / Wind 16 km/h from the west, cross-shore / Rosa, updated 22 September 2026, 13:56" (`critic-1/live-fc-390.png`).

## Rosa forecast (hard constraint 9, full mode)

| Check | Result |
|---|---|
| Spot id matches the dossier mapping | `data-json …/kabalana.json`, widget `spot=kabalana`, credit "Forecast for Kabalana by Rosa" → `https://rosa.surf/spot/kabalana`. Matches `concepts.md` l.278 (dossier "Kabalana beach break" → Rosa `kabalana`) |
| Site half is the headline only | height, time, swell, wind, update line. No day boxes, no row of days, no chart |
| Widget unmodified | iframe attributes character-identical to `agents/designer/tools.md` (title, width 100%, height 500, style, lazy, referrerpolicy, sandbox). Rendered 350×500 at 390. Nothing covers it (`elementFromPoint` at its corner and centre returns the IFRAME; lower down, the fixed booking bar overlaps only while it scrolls past) |
| Nothing from Rosa on first load | 0 requests to rosa.surf / rosa-data-opal in 3 s after load with no scroll (network open). `audit.json` has 0 third-party requests |
| After scrolling: one JSON request, then the frame | exactly 1 main-frame request to `kabalana.json`, then 1 widget document. The widget's own requests (its JSON copy, Google Fonts Inter, arcgis tiles, favicon) are inside Rosa's frame |
| Space reserved, CLS unchanged | `.fc-now` 350×232, `.fc-rosa` 350×500, `.fc` 350×780 at the same page offsets before and after arrival. layout-shift sum 0 |
| Blocked JSON | `fc off`, iframe `src` null, headline half hidden, plain link "See today's forecast for Kabalana on Rosa" filling the reserved 350×500 box, CLS 0 (`critic-1/fail-fc-390.png`) |
| Stale data (`generated_at` 30 h old, served through a route) | same as blocked (`critic-1/stale-fc-390.png`) |
| JS off | iframe `src` null, headline half hidden, link shown (`critic-1/nojs-fc-390.png`) |
| Offline (all non-local aborted) | link shown (`critic-1/offline-fc-390.png`) |
| `shoot.mjs` waited for it | the desktop and mobile sheets show the drawn widget (desktop 12, mobile 15–16) |

Notes.md's own caveat stands, and I confirmed its mechanism in code (`site.js` l.22): if the request fails while the block is on screen on a phone, the hidden headline half moves the box up. That is not measured in my runs, because the fetch resolved before the block was in view.

## Delivery baseline

- **First load, network blocked except the local server (390, JS on):** 7 requests, all local (`/`, font, 3 platform marks, 2 photographs). Full scroll: the only attempts off-host were the OpenStreetMap HEAD probe and the Rosa JSON. Both were blocked, and both fell back to links.
- **CTA tap-through at 390 (external navigation blocked):**

| tapped | lands | href |
|---|---|---|
| bar "Check dates" (JS on) | slide-out opens, focus on the first tile, URL unchanged | `https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/` |
| slide-out tile 1 | navigation (blocked, logged) | `https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/` |
| slide-out tiles 2–4 (hrefs read) | — | `https://www.booking.com/hotel/lk/ka-surf-hostel.html` · `https://www.agoda.com/en-in/ka-surf-hostel-h61738910/hotel/ahangama-lk.html` · `tel:+94773746053` |
| bar "Call" | — | `tel:+94773746053` |
| bar "Check dates" (JS off) | navigation to Hostelworld | same Hostelworld URL |

  0 popups. The primary action goes to Hostelworld, the first `bookingLinks[]` row. The dossier's `booking.engine_url` is Booking.com, and Hostelworld is in `other_engines`. The order comes from the passed copy and matches the earlier rounds.
- **JS off:** 0 third-party requests. 4 606 characters of text. All six copy blocks, the rooms, the amenities, the five quotes, the times and the address are present. The map box shows the address + "Open the map". The forecast shows the link.
- **Keyboard (1440):** first Tabs: Call → Check dates (header) → Check dates (hero) → phone → Hostelworld. Enter on the hero "Check dates" opens the dialog, and focus is inside. 8 Tabs cycle Hostelworld → Booking.com → Agoda → phone → Close → Hostelworld, never leaving it. 3 Shift+Tabs stay inside. Esc closes, and focus returns to "Check dates". From room row 4 the dialog's context line reads "Double room, 1 extra-large double bed", and Esc returns focus to that row (`critic-1/kbd-1440-panel.png`).
- **Reduced motion (390):** `canvas.back` `display:none`, static SVG canopy `display:block`, `h2` transform `none` (`critic-1/reduced-390.png`). `audit.json` `reduced_motion.canvases_hidden: 0` disagrees with this. The audit reads the canvas before the page script hides it, so I scored from my own run.
- **axe:** run from a local axe-core 4.11.1 (`~/Projects/Learning/uigen/node_modules/axe-core`, nothing installed), after a full scroll, with third-party requests blocked. Results under dimension 6.

## Facts table (mechanical: rendered page with JS off, `llms.txt`, JSON-LD → dossier)

| On the page | Dossier key | Verdict |
|---|---|---|
| "KA Surf Hostel" (h1, header, title, footer, og, JSON-LD `name`, llms.txt) | `business.name` | match (Google/Hostelworld spellings differ: open item) |
| "Surf, chill and feel at home in Ahangama" | `business.tagline` | match (case changed) |
| "Five minutes from Kabalana Beach", "a five-minute walk" (intro, Getting here, meta, JSON-LD `description`) | `location.distance_to_beach` | match |
| "A family runs this place" | `business.run_by` | match |
| "Dorms if you want the company, private rooms if you don't" | `room_types[]` | match |
| 6 room rows + beds (page, JSON-LD `containsPlace`, llms.txt) | `room_types[0–5]` | match |
| A/C and fan in every room, private locker, personal fridge | `description_long`, `facilities[16,22,23]` | match |
| bathrooms modern, some open to the sky, showers hot | `description_long`, `facilities[24]`, quotes Maximilian/Elena ("outdoor bathroom") | match |
| breakfast included, Sri Lankan: rotis, hoppers, pancakes, eggs, fruit platter, vegan option; changes daily | `description_long`, quote Elena (2026-03) | match (Booking's label "continental, full English/Irish" in `facilities[2]` is not repeated) |
| **"It changes daily, which guests mention more often than anything else on the property"** (page, llms.txt) | none. Of the 10 quotes, breakfast appears in 2 (Elena, Saketh) and "family" in 4 (Clara, Luzzi, Nanet, Elena). No frequency count in the dossier | **missing: claim with no dossier entry (HF-1)** |
| garden and chill zone, filtered water, laundry, minimarket, scooter + surf rack, luggage storage, lockers, 24-hour reception | `facilities[]`, `description_long` | match |
| 17 amenity rows (page, JSON-LD `amenityFeature`, llms.txt) | `facilities[0,2,22,16+23,24,4,21,20,19,12,8,9,10,11,18,17,15]` | match ("Free WiFi" without the contradicted fibre claim) |
| pets on request, no charge; children not accommodated; no cots or extra beds | `facilities[15]`, `house_rules[1]` | match |
| "Family" is the word guests keep using; the dengue story | quotes Clara/Luzzi/Nanet/Elena; Mia (2026-02) | match |
| staff 9.9/10 on Booking.com, the hostel's highest score there | `reviews.booking.categories` Staff 9.9 (next 9.4) | match |
| Hostelworld staff 9.9; only value for money and security higher, at 10 | `reviews.hostelworld.categories` | match |
| Koggala Airport about 5 km; station a little over 2 km | `location.nearby` 3.3 mi (5.3 km), 1.3 mi (2.1 km) | match |
| "The property arranges a shuttle" | `facilities[13]` | match |
| check-in 13:00–23:00, check-out by 13:00 (page, JSON-LD `checkinTime`/`checkoutTime` 13:00, llms.txt) | `hours_note` | match (the Booking.com "24 hours" contradiction is unresolved in the dossier: owner item) |
| reception open 24 hours | `hours_note`, `facilities[10]` | match |
| "No 207/A, Welhengoda, 80650 Ahangama, Sri Lanka" (page ×3, JSON-LD PostalAddress, llms.txt) | `location.address` | match (Google spelling "welahangoda" differs: open item) |
| +94 77 374 6053 / `tel:+94773746053` / JSON-LD `telephone` | `contact.phone` | match |
| "Open the map" href, JSON-LD `hasMap`, llms.txt | `location.map_url` | match, character-identical |
| map pin and JSON-LD `geo` 5.98181, 80.35206 | `location.plus_code` X9J2+PR (decoded by hand as 6MQ2X9J2+PR → 5.981813, 80.352063) | match. `lat_lng` [5.9805, 80.3486] is marked approximate and is not used |
| 9.8/10, 66 reviews, Hostelworld | `reviews.hostelworld` | match (no capture date shown) |
| 9.5/10, 38 reviews, Booking.com | `reviews.booking` | match |
| 4.8/5, 42 reviews, Google | `reviews.google` | match |
| quotes Wolfgang (Booking.com), Elena (Hostelworld, March 2026), Mia (Hostelworld, February 2026), Clara (Booking.com), Saketh (Hostelworld, February 2026), on the page and in llms.txt | `reviews.quotes[3,7,9,1,8]`: text, platform (`source_url`) and date | match: 5/5 strings verbatim (`includes` test). Authors shortened as in `en.json` |
| "Kabalana: a sandy beach break that suits beginners and improvers" | `location.spot` ("for beginners and intermediates") | match |
| **"…with The Rock reef alongside it when the swell is up"** (page h2, llms.txt) | `location.spot` says "The Rock reef A-frame **for advanced surfers**"; no swell condition anywhere in the dossier | **missing: the swell qualifier has no dossier entry, and the "advanced surfers" fact is dropped (HF-1)** |
| 3 listing links (17 hrefs), JSON-LD `sameAs`, llms.txt | `booking.engine_url`, `booking.other_engines[]` | match, character-identical |
| "Rates change with the season and the dates…" | `gaps[]` offers | match (no price anywhere) |
| "Photographs: KA Surf Hostel's own, from its Booking.com listing and Instagram" | `images[].license` business-owned, `license_note` | match |
| 11 photographs + alt text | `images[img-001…006, 008, 012, 020, 021, 023]` business-owned | match. None is captioned or tied to a named room |
| title "KA Surf Hostel, Ahangama"; meta/og description | `business.name`, `tagline`, `distance_to_beach`, `room_types[]` | match |
| JSON-LD `@type` Hostel; `knowsLanguage` en | `business.type` (Booking category "Hostel"); `languages_spoken` English | match |
| forecast numbers | Rosa live data. Not dossier content (schema v0.3: forecast values are never content) | checked under hard constraint 9 |
| absent, as required: parking, restaurant, fibre WiFi, season, WhatsApp, email, reply time, prices | `contradictions[]`, `gaps[]` | absent |

Totals: 34 rows match, 0 contradict, 2 missing (claims with no dossier entry). Both sentences are in `copy/en.json`, and both passed station 4c: `review.md` round 1 counts claims in aggregate and has no line for either. My own quick rounds scored the same text 10/10 on facts. That was wrong, and I did not catch it until this mechanical pass.

## Open items the builder recorded (facts, not decided here)

- **Map embed vs playbook §4.** Shipped as the OpenStreetMap embed, lazy, JS-gated, with the address + link as fallback. Measured: 0 requests on first load. Once "Getting here" is near, 1 HEAD probe + 6 frame requests go to openstreetmap.org / tile.openstreetmap.org. Playbook §4 allows Rosa as "the one third-party embed" and asks for a static map image. **Shahar's decision, pending.**
- **`contact.whatsapp` required by schema v0.3, but KA has none** (`contact.whatsapp.gap`). The seed leaves it `null`, which Payload's validation would reject. It blocks a real tenant seed, not this static build.
- **Name/address spelling vs Google** (`seo-report.md` item 1): Google "KA surf hostel and restaurant" / "207/A welahangoda, Ahangama". The site uses Booking.com's "KA Surf Hostel" / "No 207/A, Welhengoda, 80650 Ahangama". The phone matches. This is an owner item.
- Also recorded and still true: no `SITE_URL`, so no canonical, og:image or sitemap. No favicon. The Hostelworld and Agoda marks carry no licence grant. `robots.txt` allows 15 AI crawlers pending the owner's confirmation.

## Evidence

`final/audit.json` (rewritten by this run, 12:29 UTC) · `final/shots/critic-1/`: `desktop-sheet.png`, `mobile-sheet.png`, `desktop-00…14.png`, `mobile-00…17.png`, `shoot.json`, `w1525-00…14.png`, `w1920-00…14.png`, `live-fc-390.png`, `fail-fc-390.png`, `stale-fc-390.png`, `nojs-fc-390.png`, `offline-fc-390.png`, `tap-390-panel.png`, `kbd-1440-panel.png`, `reduced-390.png`.

what the designer prompt got wrong: Nothing in the build broke the facts. The hard fail sits upstream, and the pipeline has no station that catches it: the designer ports `copy/en.json` as passed, and neither the designer's nor the copyeditor's prompt makes anyone trace each sentence to a dossier key at the sentence level. `review.md` round 1 reports "sourced: all factual claims" as one row, and `sources.md` maps the breakfast paragraph to `description_long` + Elena without covering its last clause, "which guests mention more often than anything else on the property". The copyeditor prompt should demand a per-sentence table like the one round 2 used for `copyBlocks[1]`, with comparative and frequency words ("more often", "most", "highest", "when the swell is up") flagged as claims that need their own dossier key. The designer prompt's own gap is smaller: it let a layout change the pick never asked for (the headline moved 150 px right at 1920) through as part of "keep the leaves off the headline". base.md should say that a pick note is implemented by the smallest change, and that any other visible change is listed as a conflict for the human, not folded into a note.

fix list (fail only, smallest first):
1. (dim 6) Make the sideways-scrolling beach-photo row `.crops` reachable by keyboard (`tabindex="0"` plus an accessible name), so axe's `scrollable-region-focusable` passes at 390.
2. (dim 4) At widths above 1296 px, put the headline back at round 16's left edge (x = 200 at 1920) while keeping the leaves off it, or get Shahar to accept the move.
3. (dim 1, HF-1) Copy, via copywriter → copyeditor: delete "which guests mention more often than anything else on the property" or replace it with something the dossier holds. Then rebuild so the page and `llms.txt` both change.
4. (dim 1, HF-1) Copy, same route: rewrite the spot sentence to match `location.spot`, e.g. "…with The Rock, a reef A-frame for advanced surfers, alongside it", or add a dossier entry that sources "when the swell is up". Then rebuild.

# full · round 2 (4g round 2, 2026-09-22)

critic 0.3.1 · station 5 · run `2026-09-ahangama-02` · under review: `sites/ka-surf-hostel-and-restaurant/final/dist/` as built (not rebuilt; files dated 17:39 local, after the 4g round-2 correction of 14:46Z), with `final/notes.md` (round 2 and round-5 look-log entries), `seo-report.md`, `aiseo-report.md`, `copy/review.md` rounds 4–5, `copy/sources.md`. Picked mockup: `mockups/unique/` round 16 (served from its own `dist/` for the geometry comparisons). Every test ran on a plain `python3 -m http.server` (no rewrites, no compression). Headless Chromium, software GL. No real phone.

```
mode: full        round: 2        variant: unique ("Canopy")
total: 72 / 100           result: fail        hard_fails: [HF-1 (round 2) claims in unchanged copy with no dossier entry: bathrooms "some of them open to the sky" (the one bathroom source says "the outdoor bathroom got a roof"); "you feel it about ten minutes after you drop your bag"; rates change "with the season"]
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 3 | Facts table below, sentence by sentence over the whole page (not only the fields changed since round 1): 41 rows match, 0 contradict outright, **3 have no dossier entry** (HF-1, round 2). The first contradicts a source: Maximilian (`reviews.quotes[0]`) writes "the outdoor bathroom got a roof so its protected", and the page says "some of them open to the sky". The same three sentences are in `llms.txt`. JSON-LD: 14/14 keys match. Round 1's two claims are gone from the page and `llms.txt` (0 hits for "more often", "swell is up", "improvers", "changes daily", "Welhengoda"). All three new findings come from copy that passed 4c round 1 and was never re-opened. I scored the same sentences as matching in round 1. That was wrong |
| 2 | mobile + performance | 8 | `final/audit.json` (rewritten by this run, 14:47Z): 232 395 B first load, 8 requests (HTML 74 068, fonts 32 292, images 126 035), 0 B JS files, 1 font family, largest image 47 428 B, LCP 388 ms, CLS 0, 0 third-party. No horizontal overflow at 390/1440/1525/1920 (`scrollWidth − innerWidth` = 0). Mobile sheet: 18 captures, no overlap. **One defect, newly measured:** when the forecast request fails *slowly* (404 after 1 s, abort after 3 s, or the 10 s timeout), the headline half is removed while the block is on screen, and the widget box jumps up: layout-shift **0.2266 at 390**, 0.0305 at 1440 (user-like wheel scroll, `PerformanceObserver`, `hadRecentInput` false). A fast abort (offline) shifts nothing, because it resolves off screen. Stale data behaves the same way (0.2266 / 0.0305). `notes.md` records this as a conflict. Round 1 did not measure it |
| 3 | booking CTA | 9 | 390 tap on the bar's "Check dates" (JS on): slide-out opens, URL unchanged, focus on the Hostelworld tile. The 4 slide-out hrefs are Hostelworld, Booking.com, Agoda and `tel:+94773746053`. Tapping tile 1 navigates to Hostelworld (blocked and logged). JS off: the same tap navigates straight to Hostelworld. Link counts (JS off): 12 Hostelworld, 3 Booking.com, 2 Agoda, 5 `tel:`, each character-identical to `booking.engine_url` / `other_engines` / `contact.phone`. No prefilled message is possible (no WhatsApp in the dossier; OTAs take none). Unchanged from round 1 |
| 4 | brand fit | 9 | First screen: what + where, Check dates, 9.8/66 with source. **Headline back to round 16:** element box identical to the mockup at 390 (17, 291.4), 1440 (161, 261.1), 1525 and 1920 (200, 231.8), JS on and off. The same holds for the name line and the button (measured on both builds). Sheets match round 16 apart from the allowed differences (below). The spot still sits after location, against playbook §3, as in round 16. Ratings still carry no capture date. Unique brief met |
| 5 | copy quality | 8 | Page text is `copy/en.json`. All six blocks are present, and the round-1 breakfast/"family" disagreement is gone. The new breakfast block is one plain line from the owner's list. Deductions are the three unsourced sentences, which are scored under 1. Also, the footer says "Open the map" while "Getting here" says "Open in Google Maps" for the same URL (`notes.md` conflicts) |
| 6 | accessibility | 9 | axe-core 4.11.1 (local copy, nothing installed; full scroll first, third-party blocked), WCAG 2.0/2.1 A+AA: **0 violations at 1440 and at 390**. Incomplete: `color-contrast` (text over the canopy, 16 / 13 nodes) and `aria-prohibited-attr` (1, `aria-label` on the footer). `.crops` is now a tab stop at both widths (16th at 1440, 12th at 390), and ArrowRight ×5 scrolls it 0 → 200 of 334 px at 390. The 2 px ring shows on three sides (`crops-focus-390.png`). The dialog traps Tab and Shift+Tab, Esc closes it, and focus returns, at 1440 (hero button) and at 390 (bar button). 14/14 img have alt, 0 tap targets under 44 px, H1 + 7 H2 in order. Reduced motion: `canvas.back` `display:none`, static SVG shown, h2 transform `none` throughout the scroll. Still no skip link |
| 7 | security + delivery | 9 | Static output only, no CMS call at runtime. Grep of `dist/` for localhost / 127.0.0.1 / api key / `/api/media` / `/home/` / openstreetmap: 0 hits. All filenames are lowercase and all local URLs relative. Offline (every non-local request aborted), 390 JS on: 7 local requests on load, 14/14 images, Outfit loaded, and over the full scroll exactly one off-host attempt (the Rosa JSON), which falls back to the link. JS off: 0 off-host. **The OpenStreetMap embed is gone:** after a full scroll with the network open, the only main-frame third-party request is `…/kabalana.json`. The only frame is Rosa's widget. `?no-webgl` and `?open` test hooks are still in the inline script (2 hits) |

`total = 3×2.5 + 8×2 + 9×1.5 + 9 + 8 + 9 + 9 = 72`. Full-mode pass needs no hard fail, a total of at least 80 and every dimension at 6 or above. This round has a hard fail, 72, and dimension 1 at 3. Every playbook §4 budget line is met.

## Budget table (playbook §4, `final/audit.json` first_load: 390×844, 1.6 Mbps, 150 ms RTT, 4x CPU, no scroll)

| Item | Target | Measured |
|---|---|---|
| First-load transfer | ≤ 1.5 MB | 232 395 B, 8 requests, host `localhost:8980` only (the audit's own server) |
| JS, compressed | ≤ 300 KB | 0 B as files. The script is inline in the HTML |
| Largest above-the-fold image | ≤ 200 KB | none above the fold (the first screen is drawn). Largest image fetched on first load: 47 428 B |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family (Outfit), 32 292 B |
| LCP | ≤ 2.5 s | 388 ms |
| CLS | < 0.1 | 0 on first load. 0 across a full scroll with the forecast arriving. On the slow-failure path after scrolling: 0.2266 at 390 (dimension 2) |
| Third-party requests on load | 0 | 0 |

## Default-look facts and image checks

`check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist --no-shots`: `ok`, 0 problems, 0 warnings. Look: fonts h1/h2/body "Outfit"; ground rgb(240, 241, 242) = hsl(210 7% 95%); all-caps labels 0; labelled headings 0/8. `check-places.mjs ka-surf-hostel-and-restaurant`: 0 borrowed image uses checked, 0 failing. Images: the 11 business-owned photographs, same as round 1, no stock.

## Round-1 fix list and Shahar's decisions, verified

| Item | Evidence | Result |
|---|---|---|
| Fix 1: `.crops` keyboard-reachable | `tabindex="0" role="region" aria-label="Beach photographs"`. It is a tab stop at 390 and 1440, arrow keys scroll it at 390, and axe `scrollable-region-focusable` no longer fires (0 violations at 390) | done |
| Fix 2 / Shahar 1: headline back to round 16 at 1920 | text box x 199.7 on both builds at 1920, JS on and off. Element boxes identical at 390/1440/1525/1920 (above). Leaves: pixel test (/tmp Playwright + sharp, headline text transparent, non-ground pixels inside its text line boxes, pointer swept 20 steps first, WebGL live, 168–178 k green px on screen as the liveness check): **0** at 390 (45 110 px checked), 1440 (327 600), 1525 (366 115) and 1920 (439 089). Positive control (green in the last 10 %): 585 / 5 425 / 5 920 / 7 105 px. With the element box instead of line boxes, 171 px (1440) and 413 px (1525) differ. They sit right of the text on the short lines (e.g. x 969–999, y 360–534 at 1440), outside the letters | done |
| Fixes 3–4: breakfast frequency claim; spot swell qualifier | page, `llms.txt`: 0 hits for "more often", "swell is up", "improvers". New spot h2 "Kabalana: a sandy beach break for beginners and intermediates, and The Rock, a reef A-frame for advanced surfers." = `location.spot`. Breakfast: heading "Breakfast, every day" = `description_long` "daily free healthy breakfast". Body "Rotis, fruit, pancakes and eggs, with vegan options." = `description_long` "(rotis, fruits, pancakes, eggs — vegan options available)". `amenities[0]` "Free breakfast" = `facilities[2]` / `description_long` | done |
| Shahar 2: address in Google's spelling via the copy stations | page ×2, `llms.txt` ×2, JSON-LD `streetAddress` "207/A Welahangoda", `postalCode` 80650. **Fact, not a mismatch:** `sources.md` records it: "207/A Welahangoda" comes from `location.address.note` ("Google '207/A welahangoda, Ahangama'") and the scout's Google record in `candidates.json` ("207/A welahangoda, Ahangama, Sri Lanka", confirmed there), and "80650 Ahangama, Sri Lanka" comes from `location.address.value`. The dossier's `value` still carries Booking's "No 207/A, Welhengoda". Passed at `review.md` round 4 | done |
| Shahar 1 (map): Google Maps link, Rosa the one embed | OSM iframe, loader and probe are gone (0 "openstreetmap" in `dist/`; 0 OSM requests over a full scroll). "Open in Google Maps" → `https://www.google.com/maps/search/KA%20surf%20hostel%20and%20restaurant/@5.9794134,80.350836,17z?hl=en`, character-identical to `location.map_url`. The footer's link to the same URL still reads "Open the map" | done |
| Shahar 3: no ratings markup | JSON-LD has no `aggregateRating` / `review` | done |
| 4i flag / 4g correction: forecast number under the widget at 1440 | injected values below: 24.9–26.2 px clear of the widget at 1440/1525/1920 | done |

## Look against round 16 (`final/shots/critic-2/` vs `mockups/unique/shots/round-16/`)

Sheets opened: `critic-2/desktop-sheet.png` (15 captures, page 11 729 px) and `mobile-sheet.png` (18, 13 092 px), against round 16 (16 / 12 285 and 19 / 14 078). In this shoot the canopy rendered on the first screen at both widths (desktop-00, mobile-00 show the leaves), so the known blank-canvas flake did not occur. The 1440 pixel test above also found 170 k green pixels on screen. Differences, all allowed:

- Note 1: one near-empty capture after the hero (desktop 01, mobile 01). Round 16 has two.
- Note 2: no blade over "Kabalana" (desktop-00, `w1525-00`, `w1920-00`, mobile-00).
- Note 3: live forecast headline ("0.7–1.0 m / Tuesday 22 September, 14:30 at Kabalana / Swell 12.4 s from the south / Wind 16 km/h from the west, cross-shore"), with Rosa's widget beside it (desktop 11) and below it on the phone (mobile 15–16).
- "Getting here" without the map: the left columns are empty, a 1 px rule runs down the middle, the text is on the right, and "Open in Google Maps" sits under the address (desktop 10–11, mobile 13).
- Copy: "Breakfast, every / day" over one short line (desktop 04–05, mobile 05). That section is shorter, which accounts for part of the height difference. "Free breakfast". Spot h2 on two lines at 1440. New address in three places.

Nothing else differs that I could see. No overlap, overflow or unreadable text. The Agoda tile is black in desktop 13 because the shoot's pointer hovers it, as in round 16. 1525 and 1920: `critic-2/w1525-00…14.png`, `w1920-00…14.png` (captured by a /tmp helper, since deleted). The `.fc` block, `.tiles` and `.crops` span 163–1363 at 1525 and 360–1560 at 1920. No overflow, no console errors.

## Rosa forecast (hard constraint 9, full mode)

| Check | Result |
|---|---|
| Spot id matches the dossier mapping | `data-json …/spots/kabalana.json`, widget `spot=kabalana`, credit "Forecast for Kabalana by Rosa" → `https://rosa.surf/spot/kabalana`. `concepts.md` mapping as in round 1 |
| Site half is the headline only | height, time, swell, wind, update line. No day boxes, row of days or chart |
| Widget unmodified | `data-src` `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`, and title, width, height, style, loading, referrerpolicy and sandbox are character-identical to `agents/designer/tools.md`. Rendered 420×500 at 1440–1920 and 350×500 at 390 |
| **Number never touches the widget** (JSON routed to the live file with `current.h` replaced and `generated_at` 30 min old; widget stubbed) | number box right edge → widget left edge: **"0.7–1.0" 26.2 px (112 px type), "1.8–2.4" 24.9 px (114 px), "10.0–12.5" 25.6 px (88 px)**, identical at 1440, 1525 and 1920. The number box stays inside its 351 px column (right edge 671.3–672.6 against 673.5 at 1440). At 390 the widget is below (number bottom 152.7, widget top 311.7), type 73.6 px for all three, the widest right edge is 311.9 inside a 20–370 column, and there is no horizontal scroll (`rosa-live-*.png`) |
| Nothing from Rosa on first load | 0 requests to rosa.surf / rosa-data-opal in 3 s after load with no scroll (network open, 390); `audit.json` 0 third-party |
| After scrolling: one JSON request, then the frame | network open, 390: exactly 1 main-frame request, `kabalana.json` at 9 658 ms, then the widget document at 9 870 ms. Everything else is inside Rosa's frame (rosa.surf, its own JSON copy, Google Fonts, arcgisonline) |
| Space reserved on arrival | `.fc-now` 351×289 and `.fc-rosa` 420×500 at 1440 (350×232 / 350×500 at 390) are at the same page offsets before and after arrival. Layout-shift sum 0 in every injected run |
| Blocked JSON | `fc off`, iframe `src` null, headline half hidden, "See today's forecast for Kabalana on Rosa" visible, 390 and 1440 (`rosa-blocked-*.png`). **Shift when it fails with the block on screen:** 0.2266 at 390 and 0.0305 at 1440. At 1440 the link box moves from x 698 to 510, and at 390 it moves up 232 px. Also measured with a user-like wheel scroll: a fast abort gives 0, while a 404 after 1 s, an abort after 3 s or the 10 s timeout give 0.2266 / 0.0305. This check fails on the failure path (dimension 2) |
| Stale data (`generated_at` 30 h old) | same as blocked: link, no widget, same shift (`rosa-stale-*.png`) |
| JS off | iframe `src` null, headline half hidden, link visible → `https://rosa.surf/spot/kabalana`, 0 off-host requests (`rosa-jsoff-390.png`) |
| `shoot.mjs` waited for it | desktop 11–12 and mobile 15–16 show the drawn widget |

## Delivery baseline

- **First load, network blocked except local (390, JS on):** 7 requests, all local. Full scroll: the only off-host attempt is the Rosa JSON, which falls back to the link. 14/14 images, `document.fonts.check('200 20px Outfit')` true. JS off: 16 local requests over the full scroll, 0 off-host.
- **CTA tap-through at 390 (external navigation blocked):**

| tapped | lands | href |
|---|---|---|
| bar "Check dates" (JS on) | slide-out opens, focus on the Hostelworld tile, URL unchanged | `https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/` |
| slide-out tile 1 | navigation (blocked, logged) | `https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/` |
| slide-out tiles 2–4 (hrefs read) | — | `https://www.booking.com/hotel/lk/ka-surf-hostel.html` · `https://www.agoda.com/en-in/ka-surf-hostel-h61738910/hotel/ahangama-lk.html` · `tel:+94773746053` |
| bar "Check dates" (JS off) | navigation to Hostelworld | same Hostelworld URL |

- **Keyboard (1440):** Tab order: Call → Check dates (header) → Check dates (hero) → phone → Hostelworld → Booking.com → 6 room rows → Open in Google Maps → Rosa credit → Rosa fallback link → `.crops` → 3 tiles → phone → Open the map. Enter on the hero button opens the dialog (`role=dialog`, `aria-modal=true`, labelled "Check dates"). 8 Tabs cycle Hostelworld → Booking.com → Agoda → phone → Close → Hostelworld without leaving the dialog, and 3 Shift+Tabs stay inside. Esc closes it and focus returns to the hero button. From room row 4, the context line reads "Double room, 1 extra-large double bed", and Esc returns focus to that row (`kbd-1440-panel.png`). **390:** the hero button is not shown (0 px wide), so the bar's "Check dates" is the trigger. The same 8+3 cycle stays inside, and Esc returns focus to the bar button (`kbd-390-panel.png`). Third-party requests were blocked in these keyboard runs, so the forecast block was in its fallback state and its link was a tab stop. I did not run the Tab order with the live widget.
- **Reduced motion (390):** canvas hidden, static SVG shown, no heading drift (`reduced-390.png`). `audit.json` `reduced_motion.canvases_hidden: 0` is the same audit-timing artefact as in round 1.
- **axe:** see dimension 6.

## Facts table (mechanical, sentence by sentence: rendered page with JS off, `llms.txt`, JSON-LD → dossier)

| On the page | Dossier key | Verdict |
|---|---|---|
| "KA Surf Hostel" (h1, header, title, footer, og, JSON-LD `name`, llms.txt) | `business.name` | match (casing: Shahar's decision) |
| "Surf, chill and feel at home in Ahangama" | `business.tagline` ("Surf, Chill & Feel at Home in Ahangama") | match |
| "Five minutes from Kabalana Beach"; "a five-minute walk" ×2; meta/og/JSON-LD description | `location.distance_to_beach` | match |
| "A family runs this place" | `business.run_by` ("a local family") | match |
| **"…and you feel it about ten minutes after you drop your bag"** (page, llms.txt) | none. The owner's text says "making you feel at home from the moment you arrive" (`description_long`); no source gives a time | **missing: a duration with no dossier entry (HF-1, round 2)** |
| "close enough to check the surf before breakfast and come back wet" | derived from `distance_to_beach` | framing, not a separate fact |
| "Dorms if you want the company, private rooms if you don't" | `room_types[]` | match |
| "Mixed, female and male dormitories with bunk beds, plus double rooms and deluxe doubles" | `room_types[0–5]` | match |
| "Every room has air conditioning and a fan, a private locker and a personal fridge" | `description_long`, `facilities[22,23]` | match |
| "The bathrooms are modern… and the showers are hot" | `description_long` ("modern bathrooms with hot showers"), `facilities[24]` | match |
| **"…some of them open to the sky"** (page, llms.txt) | none says open to the sky. Maximilian (`reviews.quotes[0]`, Booking.com): "the outdoor bathroom got a roof so its protected but never humid"; Elena: "the whole outdoor thing". One outdoor bathroom, roofed. `images[img-005]` alt on the page: "An open-air bathroom with a glass roof" | **missing, and against the one source that describes it: "open to the sky" (unroofed) vs "got a roof"; "some of them" (plural) vs "the outdoor bathroom" (HF-1, round 2)** |
| 6 room rows + beds (page, JSON-LD `containsPlace`, llms.txt) | `room_types[0–5]` | match |
| **"Rates change with the season and the dates — the booking links below show what is actually free"** (page, llms.txt) | `gaps[]` offers: "nightly rates are live, dated inventory on the OTAs". Covers "the dates" and the links; nothing about seasons | **missing: "with the season" has no dossier entry (HF-1, round 2)**. The rest matches |
| "Breakfast, every day" | `description_long` "daily free healthy breakfast" | match |
| "Rotis, fruit, pancakes and eggs, with vegan options." | `description_long` | match |
| "A green garden and a chill zone. Free filtered water you can refill any time. Laundry. A minimarket on site." | `description_long`, `facilities[4,21,19,12]` | match |
| "Scooter rental, with a surf rack if you ask" | `description_long` ("also with surf rack possible"), `facilities[20]` | match |
| "Luggage storage, lockers, and a 24-hour reception" | `facilities[8,16,10]`, `description_long` "24/7 reception" | match |
| "Pets are welcome on request at no charge. Children are not accommodated." | `facilities[15]`, `house_rules[1]` | match |
| 17 amenity rows (page, JSON-LD `amenityFeature`, llms.txt), "Free breakfast" first | `facilities[2,0,22,16+23,24,4,21,20,19,12,8,9,10,11,18,17,15]` | match ("Free WiFi" without the contradicted fibre claim) |
| "'Family' is the word guests keep using" | quotes Clara, Luzzi, Nanet, Elena use "family" (4 of 10) | match (`review.md` round 3) |
| dengue story (Kandy, Ayurvedic medicines, on top of the hospital's) | quote Mia (2026-02) | match, told as her account |
| staff 9.9/10 on Booking.com, the highest score there | `reviews.booking.categories` Staff 9.9, next Value for money 9.4 | match |
| Hostelworld staff 9.9; only value for money and security higher, at 10 | `reviews.hostelworld.categories` (10.0, 10.0; others ≤ 9.8) | match |
| "Ahangama, a five-minute walk from Kabalana Beach" | `distance_to_beach`, address | match |
| Koggala Airport about 5 km; station a little over 2 km | `location.nearby` 3.3 mi (5.3 km), 1.3 mi (2.1 km) | match |
| "The property arranges a shuttle" | `facilities[13]` | match |
| check-in 13:00–23:00, check-out by 13:00 (page, JSON-LD, llms.txt) | `hours_note` | match (the Booking.com "24 hours" contradiction stays an owner item) |
| "Reception is open 24 hours. Children are not accommodated, and cots and extra beds are not available." | `hours_note`, `facilities[10]`, `house_rules[1]` | match |
| "207/A Welahangoda, 80650 Ahangama, Sri Lanka" (page ×2, llms.txt ×2, JSON-LD PostalAddress) | `location.address.note` (Google spelling) + `location.address.value` (postcode), recorded in `sources.md`, Shahar's decision | fact as recorded. `value` still reads "No 207/A, Welhengoda" |
| +94 77 374 6053 / `tel:+94773746053` / JSON-LD `telephone` | `contact.phone` | match |
| "Open in Google Maps", "Open the map", JSON-LD `hasMap`, llms.txt Map | `location.map_url` | match, character-identical |
| JSON-LD `geo` 5.98181, 80.35206 | `location.plus_code` X9J2+PR | match (as round 1) |
| "Kabalana: a sandy beach break for beginners and intermediates, and The Rock, a reef A-frame for advanced surfers." (page h2, llms.txt) | `location.spot` | match |
| 9.8/10, 66 reviews, Hostelworld (hero, tile, llms.txt) | `reviews.hostelworld` | match (no capture date shown) |
| 9.5/10, 38 reviews, Booking.com (hero, tile, llms.txt) | `reviews.booking` | match |
| 4.8/5, 42 reviews, Google | `reviews.google` | match |
| quotes Wolfgang, Elena (March 2026), Mia (February 2026), Clara, Saketh (February 2026), on the page and in llms.txt | `reviews.quotes[3,7,9,1,8]` | match: 5/5 verbatim (substring test on page text and llms.txt) |
| listing links (12/3/2), JSON-LD `sameAs`, llms.txt | `booking.engine_url`, `booking.other_engines[]` | match, character-identical |
| "Photographs: KA Surf Hostel's own, from its Booking.com listing and Instagram" + 11 photographs with alt | `images[]` business-owned, `license_note` | match. No photo is captioned or tied to a named room |
| title, meta/og description | `business.name`, `tagline`, `distance_to_beach`, `room_types[]` | match |
| JSON-LD `@type` Hostel; `knowsLanguage` en | `business.type` note (Booking category "Hostel"); `languages_spoken` English | match |
| forecast numbers | Rosa live data, not content (schema v0.3) | hard constraint 9 |
| absent, as required: parking, restaurant, fibre WiFi, season, WhatsApp, email, reply time, prices, ratings markup | `contradictions[]`, `gaps[]`, Shahar 2026-09-22 | absent |

Totals: 41 rows match, 3 missing (one of them also against a source), 0 plain contradictions. All three sentences are in `copy/en.json`: the ten-minute one in `copyBlocks[intro]`, the other two in `copyBlocks[offer]`. They were passed at 4c round 1, whose fact audit is one aggregate row. `sources.md` "offer ¶1" cites `room_types[] · description_long · facilities[]` for the bathrooms, and none of them says "open to the sky". Rounds 4–5 re-passed only the fields changed since round 1. My own round 1 matched the bathroom row to "quotes Maximilian/Elena ('outdoor bathroom')" without reading Maximilian's "got a roof". The ten-minute and season phrases are my reading of "no dossier entry, no claim". If Shahar rules them framing, the bathroom sentence alone still fails the round.

## Open items (facts, not decided here)

- The footer link still says "Open the map" while "Getting here" says "Open in Google Maps" (same URL). The builder offers a one-word change.
- The forecast fallback shift (dimension 2): `notes.md` "Fallback shape" names it. Reserving the headline half's box on failure, rather than removing it, would keep the widget box still.
- Still true from round 1: `contact.whatsapp` is required by schema v0.3 and KA has none (blocks a Payload seed). No `SITE_URL`, so no canonical, og:image URL or sitemap. No favicon. The Hostelworld and Agoda marks carry no licence grant. `robots.txt` allows 15 AI crawlers pending the owner. `?no-webgl` and `?open` hooks are in the script.

## Evidence

`final/audit.json` (rewritten by this run, 2026-09-22T14:47:06Z) · `final/shots/critic-2/`: `desktop-sheet.png`, `mobile-sheet.png`, `desktop-00…14.png`, `mobile-00…17.png`, `shoot.json`, `w1525-00…14.png`, `w1920-00…14.png`, `leaf-390|1440|1525|1920.png`, `live-fc-390.png`, `rosa-live-{1440,1525,1920,390}-{0.7-1,1.8-2.4,10-12.5}.png`, `rosa-blocked-390|1440-0.7-1.png`, `rosa-stale-390|1440-0.7-1.png`, `rosa-jsoff-390.png`, `tap-390-panel.png`, `kbd-1440-panel.png`, `kbd-390-panel.png`, `crops-focus-390.png`, `reduced-390.png`. The Playwright helpers ran from /tmp and are deleted.

what the designer prompt got wrong: The build carried out every round-1 item and every one of Shahar's decisions exactly. The headline box is identical to round 16 at four widths, the map is a link, `.crops` is a tab stop, and axe reports 0 violations. The hard fail sits upstream again, in copy that no station re-read. After the critic's round 1, the copy stations re-audited only the fields the critic had named. The rest of `en.json`, passed in 4c round 1 by one aggregate "sourced" row, kept three sentences no dossier key supports, one of them against a source ("some of them open to the sky" vs Maximilian's "the outdoor bathroom got a roof"). The copyeditor prompt should require the per-sentence fact table over the **whole** file whenever any field is re-reviewed after a critic fail, not only over the changed fields. It should also say that a quote cited as a source must be re-read for what it actually says, since "outdoor" is not "open to the sky". The designer's one gap is the forecast fallback. Playbook §4 says both halves have "their space reserved with fixed dimensions, so nothing shifts when they arrive", and the designer read that as covering arrival only. The failure path removes the reserved headline half while the block is on screen. The prompt should say that the reserved boxes hold on *every* path (success, failure, stale), and that the check must be a slow-failure run, not only an instant abort.

fix list (fail only, smallest first):
1. (dim 5) Optional, one word: make the footer's "Open the map" read "Open in Google Maps" like "Getting here" (same URL). Or leave it, if Shahar prefers.
2. (dim 2, hard constraint 9) Forecast fallback: on failure or stale data, keep the headline half's reserved box (351×289 desktop, 350×232 phone) instead of removing it, so the widget box/link does not move. Re-measure with a delayed 404 and the 10 s timeout while the block is on screen: layout-shift must be 0 at 390 and 1440.
3. (dim 1, HF-1) Copy, via copywriter → copyeditor, sentence-by-sentence: `copyBlocks[offer]` "some of them open to the sky". Replace with what the dossier holds, e.g. "one of them outdoors, under a roof" (Maximilian) or drop the clause. Then rebuild so the page and `llms.txt` change.
4. (dim 1, HF-1) Same route: `copyBlocks[offer]` "Rates change with the season and the dates". Drop "with the season" (the dossier holds "live, dated inventory"). Rebuild.
5. (dim 1, HF-1) Same route: `copyBlocks[intro]` "you feel it about ten minutes after you drop your bag". Drop the time or use the owner's "from the moment you arrive". Otherwise Shahar can rule it framing. Rebuild.
6. (dim 1, process) Before round 3, the copyeditor re-audits every sentence of `en.json`, not only the changed fields, so round 3 does not surface a fourth claim.

# full · round 3 (4g round 3, 2026-09-22)

critic 0.3.1 · station 5 · run `2026-09-ahangama-02` · under review: `sites/ka-surf-hostel-and-restaurant/final/dist/` **as built** (not rebuilt; `index.html` dated 21:29 local), with `final/notes.md` (Round 3), `seo-report.md`, `aiseo-report.md`, `copy/review.md` round 8, `copy/sources.md`. Picked mockup: `mockups/unique/` round 16, served from its own `dist/` for the geometry comparisons. Every test ran against a plain `python3 -m http.server` on `dist/` (no rewrites, no compression). Headless Chromium 1.62.1, software GL. No real phone. This is the last round (base.md hard constraint 8).

```
mode: full        round: 3        variant: unique ("Canopy")
total: 92 / 100           result: pass        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | My own facts table below, sentence by sentence over the whole rendered page (JS on and JS off), `llms.txt` and the JSON-LD, each row keyed to `dossier.json`: **43 rows, expanding to 80 individual claims (6 room rows, 17 amenity rows, 5 quotes, 3 ratings, 11 alt texts counted one by one) — 80 match, 0 contradict, 0 without a dossier entry**. All three round-2 hard-fail sentences are gone from the page and `llms.txt` (0 hits for "ten minutes", "open to the sky", "with the season", and also for "come back wet", "if you ask", "a private locker"). The 5 testimonials are verbatim by string equality against `reviews.quotes[1,3,7,8,9]`, and no quoted block in `llms.txt` is unmatched. JSON-LD: 14 top-level keys + 17 `amenityFeature` + 6 `containsPlace` all trace to the dossier. The 11 photograph alt texts describe the photographs themselves; I opened img-001, img-004, img-005, img-006, img-020, img-023 and each alt is accurate (img-005 "an open-air bathroom with a glass roof" is what the photograph shows, and it agrees with `reviews.quotes[0]` "the outdoor bathroom got a roof"). Deductions, both carried from earlier rounds and neither a mismatch: the three ratings carry no capture date (playbook §6 asks for one; `fetched_at` 2026-09-19), and the check-in window follows Hostelworld while `contradictions[1]` is unresolved — recorded in `sources.md` and `review.md`, not resolved silently |
| 2 | mobile + performance | 10 | `final/audit.json` (rewritten by this run, 18:37:06Z): 232 485 B first load, 8 requests, 0 third-party, HTML 74 158, fonts 32 292, images 126 035, 0 B JS files, largest image 47 428 B, **LCP 392 ms, CLS 0**. `scrollWidth − innerWidth` = 0 at 390, 1440, 1525 and 1920, JS on and off. Sheets: desktop 15 captures / 11 689 px, mobile 18 / 13 032 px, 0 console errors; 15 more captures each at 1525 and 1920, 0 errors, `.fc` / `.tiles` / `.crops` all spanning 162.5–1362.5 and 360–1560. No overlap, overflow or unreadable text anywhere I looked. **Round-2's one defect is fixed and I re-measured it myself** (table below): layout shift 0.0000 on success, 404-after-5 s, abort-after-6 s, the 10 s timeout and stale data, at 390 and 1440, with the block on screen — with a control proving the harness is live |
| 3 | booking CTA | 9 | 390 tap on the bar's "Check dates" (JS on): the slide-out opens, URL unchanged, focus lands on the Hostelworld tile. Tapping tile 1 navigates (blocked and logged) to `https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/`. JS off: the same tap navigates straight to that URL (the aborted navigation replaced the document — proof it is a real link). Link inventory with JS off: 12 Hostelworld, 3 Booking.com, 2 Agoda, 5 `tel:+94773746053`, 2 Google Maps, 2 Rosa — every one character-identical to `booking.other_engines[0]` / `booking.engine_url` / `booking.other_engines[1]` / `contact.phone` / `location.map_url`. Deduction unchanged from rounds 1–2: no prefilled message is possible (no WhatsApp in the dossier, OTAs take none) and no expected reply time sits beside the action (`booking.reply_time_hint` is a gap) |
| 4 | brand fit | 9 | First screen: what + where, "Check dates", 9.8/10 with count and source. Headline text box left edge **identical to round 16 at every width**, JS on and off: 16.9 (390), 160.7 (1440), 167.3 (1525), 199.7 (1920), same font-size (51.2 / 138.24 / 146.4 / 160 px); it sits 8 px lower and ~33 px narrower than round 16 because the final wraps naturally where round 16 used hard `<br>`s. Sheets match round 16 apart from the allowed differences (listed below). Deductions unchanged: the wave/spot section still sits after location, against playbook §3's order, as in round 16; ratings carry no capture date. Unique brief met |
| 5 | copy quality | 9 | Page text is `copy/en.json` as re-seeded. Plain, specific, no cliché, nothing beyond the dossier (dimension 1). The round-2 label mismatch is gone: both Google Maps links now read "Open in Google Maps" (0 occurrences of "Open the map" in `dist/`). Deduction: the copyeditor's own two unfixed voice notes on `copyBlocks[4]` stand, because the humanizer did not run again — three consecutive sentences share the "X, and Y" shape, and "Laundry service is available" is listing register (`review.md` round 8, voice audit 7/8 for that block) |
| 6 | accessibility | 9 | axe-core 4.11.1 (local copy at `~/Projects/Learning/uigen/node_modules`, nothing installed; full wheel scroll first, third-party blocked), WCAG 2.0/2.1 A+AA: **0 violations at 1440 and at 390** (26 / 27 passing rule sets). Incomplete: `aria-prohibited-attr` (1, the footer's `aria-label`) at both widths, `color-contrast` (11 nodes, text over the canopy) at 1440. Keyboard, measured: 1440 tab order Call → Check dates (header) → Check dates (hero) → phone → Hostelworld → Booking.com → 6 room rows → Open in Google Maps → Rosa credit → Rosa fallback link → `.crops` → 3 tiles → phone → Open in Google Maps, then it cycles; at 390 the hero button is not shown and the bar's "Check dates" is stop 18. Dialog: Enter opens it, 8 Tabs and 3 Shift+Tabs all stay inside `#book`, Esc closes it (`hidden` true) and focus returns to the trigger — at both widths. From room row 4 the context line reads "Double room, 1 extra-large double bed" and Esc returns focus to that row. `.crops` is `tabindex="0" role="region" aria-label="Beach photographs"`; at 390 ArrowRight ×5 scrolls it 0 → 197 of 334 px. Reduced motion: `canvas.back` `display:none`, `svg.still.m` shown, `h2` transform `none` before and after scrolling, photographs visible. 14/14 images have alt, 0 tap targets under 44 px, H1 + 7 H2 in order, `lang="en"`. Deduction: **still no skip link** — `audit.json` `has_skip_link: true` is a false positive, the first link is the wordmark `<a class="name" href="#top">` |
| 7 | security + delivery | 9 | Static output only, no CMS call at runtime. Grep of `dist/` for localhost / 127.0.0.1 / api key / `/home/` / openstreetmap / fiber / aggregateRating: 0 hits each. All filenames lowercase, all local URLs relative. Offline (every non-local request aborted), 390 JS on: **7 local requests on load, 0 off-host**; over a full scroll 17 requests, the only off-host attempt being Rosa's JSON, which falls back to the link. JS off: 16 local requests, 0 off-host. 14/14 images loaded, `document.fonts.check('200 20px Outfit')` true. The only frame is Rosa's. Deductions unchanged: `?no-webgl` and `?open` test hooks are still in the inline script; no `SITE_URL`, so no canonical, og:image, og:url or sitemap; `robots.txt` allows 15 AI crawlers pending the owner |

`total = 9×2.5 + 10×2 + 9×1.5 + 9 + 9 + 9 + 9 = 92`. Full-mode pass needs no hard fail, total ≥ 80, every dimension ≥ 6 and every playbook §4 budget line met. All four hold. **Result: pass.**

## Budget table (playbook §4, `final/audit.json` first_load: 390×844, 1.6 Mbps, 150 ms RTT, 4x CPU, no scroll)

| Item | Target | Measured |
|---|---|---|
| First-load transfer | ≤ 1.5 MB | 232 485 B, 8 requests, host `localhost:8980` only (the audit's own server) |
| JS, compressed | ≤ 300 KB | 0 B as files; the script is inline in the 74 158 B HTML |
| Largest above-the-fold image | ≤ 200 KB | none above the fold (the first screen is drawn). Largest image fetched on first load: 47 428 B |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family (Outfit), 32 292 B |
| LCP | ≤ 2.5 s | 392 ms |
| CLS | < 0.1 | 0 on first load; 0 across a full scroll with the forecast arriving; **0 on every forecast failure path** (below) |
| Third-party requests on load | 0 | 0 |

## Default-look facts and image checks

`check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist --no-shots`: `ok`, 0 problems, 0 warnings. Look: fonts h1 / h2 / body all "Outfit"; ground `rgb(240, 241, 242)` = `hsl(210 7% 95%)`; all-caps labels 0; labelled headings 0/8. `check-places.mjs ka-surf-hostel-and-restaurant`: 0 borrowed image uses checked, 0 failing. Images: the same 11 business-owned photographs, no stock, no caption tying a photograph to a named room.

## Round-2 fix list, verified item by item

| Item | Evidence | Result |
|---|---|---|
| Fix 1 (dim 5): footer "Open the map" → "Open in Google Maps" | 0 occurrences of "Open the map" in `dist/`; both links read "Open in Google Maps" and both are `https://www.google.com/maps/search/KA%20surf%20hostel%20and%20restaurant/@5.9794134,80.350836,17z?hl=en`, character-identical to `location.map_url` | done |
| Fix 2 (dim 2, hard constraint 9): the forecast fallback keeps its reserved box | Re-measured by me, not read: see the shift table below. 0.0000 on all five paths at 390 and 1440, with a control that shifts | done |
| Fix 3 (dim 1, HF-1): bathrooms "some of them open to the sky" | Page and `llms.txt` now read "The bathrooms are modern and the showers are hot." = `description_long` "modern bathrooms with hot showers" + `facilities[24]`. 0 hits for "open to the sky" | done |
| Fix 4 (dim 1, HF-1): "Rates change with the season and the dates" | Now "Rates change with the dates, and the booking links below show what is actually free." = `gaps[]` offers + `booking.path.note`. 0 hits for "with the season"; 0 hits for "season" anywhere in `dist/` | done |
| Fix 5 (dim 1, HF-1): "you feel it about ten minutes after you drop your bag" | Now "A family runs this place, and they set out to make you feel at home from the moment you arrive." = `run_by` + `description_long` verbatim. 0 hits for "ten minutes" | done |
| Fix 6 (dim 1, process): whole-file copy re-audit | `copy/review.md` round 8 read in full: every sentence and field of `en.json`, no framing exemptions, 86 claim rows — 81 sourced, 2 shared-context, 3 framing (headings), **0 unsourced, 0 contradicted**, and the two wrong `sources.md` rows corrected. My independent table found the same: nothing unsourced | done |
| Round-1 fixes, unchanged since round 2 | `.crops` is still a tab stop with arrow scrolling (dim 6); headline still at round 16's left edge at four widths (dim 4); breakfast and spot copy still match `description_long` / `location.spot` | hold |

## Rosa forecast (hard constraint 9, full mode)

| Check | Result |
|---|---|
| Spot id matches the dossier mapping | `data-json …/data/spots/kabalana.json`, widget `spot=kabalana`, credit "Forecast for Kabalana by Rosa" → `https://rosa.surf/spot/kabalana` |
| Site half is the headline only | height, time, swell, wind, update line. No day boxes, no row of days, no chart. Live run drew "0.7–1.1 m / Tuesday 22 September, 20:30 at Kabalana / Swell 12.0 s from the south / Wind 11 km/h from the west, cross-shore / Rosa, updated 22 September 2026, 19:56" |
| Widget unmodified | `data-src` `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`; `title`, `width`, `height`, `style`, `loading`, `referrerpolicy` and `sandbox` are character-identical to `agents/designer/tools.md`. Rendered 420×500 at 1440–1920, 350×500 at 390. Not restyled, cropped or covered |
| Nothing from Rosa on first load | network open, 390, 3 s, no scroll: **7 requests, 0 off-host**. `audit.json` `third_party_hosts: []` |
| After scrolling: one JSON request, then the frame | network open, 390: exactly **one** main-frame off-host request, `…/data/spots/kabalana.json`; everything else (8 requests) is inside Rosa's frame (rosa.surf, its own JSON copy, fonts.googleapis.com, fonts.gstatic.com, server.arcgisonline.com). The iframe is given its `src` only after fresh data arrives |
| Number's fit for injected values | JSON routed to the live file with `current.h` replaced and `generated_at` 30 min old. Number box right edge → widget left edge: **"0.7–1.0" 26.2 px (112 px type), "1.8–2.4" 24.9 px (114 px), "10.0–12.5" 25.6 px (88 px)** — identical at 1440, 1525 and 1920. The box stays inside its 351 px column (right edge 671.3–672.6 against 673.5 at 1440). At 390 the widget is 159 px below the number, type 73.6 px for all three, widest right edge 311.9 inside a 20–370 column. `scrollWidth − innerWidth` = 0 in all 12 runs |
| Space reserved on arrival | `.fc-now` 351×289 / 350×232 and `.fc-rosa` 420×500 / 350×500 sit at the same page offsets before and after arrival; shift 0 |
| JS off | `html:not(.js) .fc-now{visibility:hidden}` keeps the box, iframe `src` null, "See today's forecast for Kabalana on Rosa" visible → `https://rosa.surf/spot/kabalana`, **0 off-host requests over a full scroll** |
| Blocked / stale | same plain link, same reserved boxes, no widget (`rosa-404-390|1440.png`, `rosa-stale-390|1440.png`). Staleness threshold in the script is 24 h (`age < 864e5`) |
| `shoot.mjs` waited for it | desktop 11–12 and mobile 14–16 show the drawn headline and the drawn widget |

### Layout shift on every path, measured by me (user-like wheel scroll, `PerformanceObserver`, `hadRecentInput` false, the block on screen, the response armed to land **after** the observer starts)

| path | 390 | 1440 | `.fc-rosa` page offset before → after | `.fc-now` box | state landed at |
|---|---|---|---|---|---|
| success (200, 5 s) | **0.0000** | **0.0000** | 20,11328 → 20,11328 · 697.5,9511.8 → 697.5,9511.8 | 350×232 · 351×289 | +3.6 s |
| 404 after 5 s | **0.0000** | **0.0000** | unchanged | unchanged | +3.6 s |
| abort after 6 s | **0.0000** | **0.0000** | unchanged | unchanged | +4.6 s |
| 10 s timeout (never answered) | **0.0000** | **0.0000** | unchanged | unchanged | +8.6 s |
| stale (`generated_at` 30 h old) | **0.0000** | **0.0000** | unchanged | unchanged | +3.6 s |
| **control** — round-2 CSS patched back into this same build (`.fc.off{grid-template-columns:minmax(0,420px)}` + `.fc.off .fc-now{display:none}`), 404 and stale | **0.2242** | **0.0305** | 20,11328 → 20,**11096** · **697.5**,9511.8 → **510**,9511.8 | collapses to 0×0 | +3.6 s |

The control shifts on the same harness, so the zeros are measurements, not a blind rig. Observation, not a defect: on the failure path the headline half is blank ground inside its reserved box (no frame, no empty-looking widget), and the plain link fills the widget's bordered box — `rosa-404-390.png`.

## Look against round 16 (`final/shots/critic-3/` vs `mockups/unique/shots/round-16/`)

Sheets opened at both ends: `critic-3/desktop-sheet.png` (15 captures, page 11 689 px) and `mobile-sheet.png` (18, 13 032 px) against round 16's `desktop-sheet.png` (16, 12 285) and `mobile-sheet.png` (19, 14 270). **The known blank-canvas flake did not occur:** the canopy renders on the first screen in `desktop-00.png` and `mobile-00.png`, and the pixel test below found 80–297 k green pixels on screen. Differences, all accounted for:

- **Pick note 1** — one near-empty screen after the hero instead of two: desktop 01 and mobile 01 are the only near-empty captures, and the page is 596 px shorter at 1440 and 1238 px shorter at 390.
- **Pick note 2** — leaves off the headline. Pixel test, mine, at four widths: headline text set transparent, every non-ground pixel (tolerance ±6 on `rgb(240,241,242)`) inside its text line boxes counted, after a 20-step pointer sweep across the lines with WebGL live (`html.js.gl`, `canvas.back` display block): **0 of 44 096 px at 390, 0 of 325 032 at 1440, 0 of 363 584 at 1525, 0 of 436 118 at 1920**, against 8 982–33 019 green pixels sampled elsewhere on the same screens (`leaf-390|1440|1525|1920.png`). Round 16 has blades across "Kabalana".
- **Pick note 3** — live forecast headline with Rosa's widget beside it at 1440–1920 (`w1920-11.png`) and below it at 390 (mobile 14–16).
- **No map embed:** "Getting here" has the empty left columns, the 1 px rule down the middle, the text on the right and "Open in Google Maps" under the address (desktop 10–11, mobile 13). Round 16 has the OSM iframe and "Open the map".
- **Copy:** "Breakfast, every day" + one line, where round 16 had "Breakfast changes every morning" + a paragraph (this is most of the height difference); "Rates change with the dates"; the corrected intro; the corrected spot h2; "Free breakfast" and "Private lockers and personal fridge in every room" in the amenity list; the new address in three places; both map links relabelled.
- **Forecast block geometry, a difference not in the pick notes:** round 16's left column is `minmax(0,max-content)` (`.fc-now` 426.6 px, widget at x 735.3 at 1440); the final's is `minmax(0,351px)` (`.fc-now` 351 px, widget at x 697.5). This is the 4i/4g work that keeps the number clear of the widget, and it is what makes the 24.9–26.2 px gaps above hold for every injected value. Reported as a fact.

Nothing else differs that I could see. No overlap, overflow or unreadable text at 390, 1440, 1525 or 1920. The Agoda tile is black in desktop 13 because the shoot's pointer hovers it, as in round 16.

## Delivery baseline

- **First load, network blocked except local (390, JS on):** 7 requests, all local. Full scroll: 17 requests, the only off-host attempt the Rosa JSON, which falls back to the link. 14/14 images loaded, Outfit loaded. **JS off:** 16 local requests over the full scroll, 0 off-host.
- **CTA tap-through at 390 (external navigation blocked and logged):**

| tapped | lands | href |
|---|---|---|
| bar "Check dates" (JS on) | slide-out opens, focus on the Hostelworld tile, URL unchanged | `https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/` |
| slide-out tile 1 | navigation attempted (blocked) | same Hostelworld URL |
| slide-out tiles 2–4 (hrefs read) | — | `https://www.booking.com/hotel/lk/ka-surf-hostel.html` · `https://www.agoda.com/en-in/ka-surf-hostel-h61738910/hotel/ahangama-lk.html` · `tel:+94773746053` |
| bar "Check dates" (JS off) | navigation to Hostelworld (the document is replaced) | same Hostelworld URL |

- **Keyboard, reduced motion, axe:** see dimension 6. Third-party requests were blocked in the keyboard runs, so the forecast block was in its fallback state and its plain link was a tab stop; I did not run the tab order with the live widget.

## Facts table (mine, mechanical, sentence by sentence: rendered page JS on and JS off, `llms.txt`, JSON-LD → dossier)

| On the page | Dossier key | Verdict |
|---|---|---|
| "KA Surf Hostel" (h1, header, title, footer, og, JSON-LD `name`, llms.txt) | `business.name` | match (casing: Shahar's decision) |
| "Surf, chill and feel at home in Ahangama" | `business.tagline` ("Surf, Chill & Feel at Home in Ahangama") | match |
| "Five minutes from Kabalana Beach" (display line, meta/og description, llms.txt) | `location.distance_to_beach` "Kabalana Beach 450 yd / a 5-minute walk" | match |
| "A family runs this place" | `business.run_by` "a local family"; `description_long` "managed by a local family" | match |
| "and they set out to make you feel at home from the moment you arrive" | `description_long` "passionate about making you feel at home from the moment you arrive" | match (round-2 HF-1 gone) |
| "Kabalana Beach is a five-minute walk." | `location.distance_to_beach` | match |
| "Dorms if you want the company, private rooms if you don't." | `room_types[0–5]`; `description_long` "Dorms & Private Rooms", "Mingle when you want, relax when you need" | match |
| "Mixed, female and male dormitories with bunk beds, plus double rooms and deluxe doubles." | `room_types[0–5]` | match |
| "Every room has air conditioning and a fan, private lockers and a personal fridge." | `description_long` "A/C & fan in every room; private lockers & personal fridge in every room"; `facilities[22,16,23]` | match (plural "lockers" is the owner's own) |
| "The bathrooms are modern and the showers are hot." | `description_long` "modern bathrooms with hot showers"; `facilities[24]` | match (round-2 HF-1 gone) |
| 6 room rows + beds (page, JSON-LD `containsPlace`, llms.txt) | `room_types[0,1,2,3,5,4]` | match ×6 |
| "Rates change with the dates, and the booking links below show what is actually free." (offer block, slide-out, footer, llms.txt) | `gaps[]` offers "nightly rates are live, dated inventory on the OTAs"; `booking.path.note` "live inventory" | match (round-2 HF-1 gone) |
| "Breakfast, every day" | `description_long` "daily free healthy breakfast" | match |
| "Rotis, fruit, pancakes and eggs, with vegan options." | `description_long` "(rotis, fruits, pancakes, eggs — vegan options available)" | match |
| "There's a green garden and a chill zone, and free filtered water you can refill any time." | `description_long`; `facilities[4,21]` | match |
| "Laundry service is available, and there's a minimarket on site." | `facilities[19,12]` | match |
| "You can rent a scooter, and it can come with a surf rack." | `description_long` "(also with surf rack possible)"; `facilities[20]` | match |
| "Luggage storage and lockers, too." | `facilities[8,16]` | match |
| "Reception is open 24 hours." (×2 on the page, llms.txt) | `hours_note`; `facilities[10]`; `description_long` "24/7 reception" | match |
| "Pets are welcome on request at no charge. Children are not accommodated." | `facilities[15]`; `house_rules[1]` | match |
| 17 amenity rows (page, JSON-LD `amenityFeature`, llms.txt) | `facilities[2,0,22,16+23,24,4,21,20,19,12,8,9,10,11,18,17,15]` | match ×17 ("Free WiFi" without the contradicted fibre claim; "Bicycle parking" is `facilities[17]`, not the car-parking contradiction) |
| "'Family' is the word guests keep using." | `reviews.quotes[1,2,6,7]` (Clara, Luzzi, Nanet, Elena) — 4 of 10, both platforms; `run_by.note` | match (frequency held by count) |
| dengue in Kandy, Ayurvedic medicines, on top of the hospital's | `reviews.quotes[9]` Mia, re-read word for word; told as her account ("wrote that"), and she is "Female" in the dossier, so "her" holds | match |
| "On Booking.com the staff get 9.9 out of 10, the hostel's highest score there." | `reviews.booking.categories`: Staff 9.9 is the maximum; next Value for money 9.4 | match (superlative re-checked) |
| "Hostelworld guests give them the same 9.9, and only value for money and security do better, both at a full 10." | `reviews.hostelworld.categories`: Staff 9.9; Value for Money 10.0, Security 10.0; nothing else above 9.8 | match (comparison re-checked) |
| 5 quotes (Wolfgang, Elena 2026-03, Mia 2026-02, Clara, Saketh 2026-02) on the page and in llms.txt | `reviews.quotes[3,7,9,1,8]` | match: **5/5 verbatim by string equality**, authors shortened to first name + country, dates present only where the dossier has them, platform from each `source_url` |
| "Ahangama, a five-minute walk from Kabalana Beach." | `location.address.value`, `distance_to_beach` | match |
| "Koggala Airport is about 5 km away; Ahangama railway station is a little over 2 km." | `location.nearby` 3.3 mi = 5.31 km, 1.3 mi = 2.09 km | match |
| "The property arranges a shuttle." | `facilities[13]` "shuttle service" | match |
| check-in 13:00–23:00, check-out by 13:00 (page, JSON-LD `checkinTime`/`checkoutTime`, llms.txt) | `hours_note` (Hostelworld) | match; `contradictions[1]` (Booking's "24 hours") stays an unresolved owner item, recorded, not written either way |
| "Reception is open 24 hours. Children are not accommodated, and cots and extra beds are not available." | `hours_note`; `facilities[10]`; `house_rules[1]` | match |
| "207/A Welahangoda, 80650 Ahangama, Sri Lanka" (page ×2, llms.txt ×2, JSON-LD `PostalAddress`) | `location.address.note` (Google's spelling) + `location.address.value` (postcode), recorded in `sources.md`, Shahar's decision | fact as recorded; `value` still reads "No 207/A, Welhengoda" in the dossier |
| +94 77 374 6053 / `tel:+94773746053` / JSON-LD `telephone` | `contact.phone` | match |
| "Open in Google Maps" ×2, JSON-LD `hasMap`, llms.txt Map | `location.map_url` | match, character-identical |
| JSON-LD `geo` 5.98181, 80.35206 | `location.plus_code` X9J2+PR (the approximate `lat_lng` deliberately not used; SCHEMA GAP recorded in `seo-report.md`) | match |
| "Kabalana: a sandy beach break for beginners and intermediates, and The Rock, a reef A-frame for advanced surfers." (h2, llms.txt) | `location.spot` (thesurfatlas.com) | match, third-party wave knowledge, not the business's claim |
| 9.8/10 · 66 reviews · Hostelworld; 9.5/10 · 38 · Booking.com; 4.8/5 · 42 · Google (hero, tiles, llms.txt) | `reviews.hostelworld`, `reviews.booking`, `reviews.google` | match ×3 (no capture date shown — the one playbook §6 item missing) |
| listing links (12 / 3 / 2), JSON-LD `sameAs`, llms.txt "How to book" | `booking.engine_url`, `booking.other_engines[]` | match, character-identical |
| 11 photograph alt texts | `images[]` business-owned; each alt checked against the photograph itself for img-001, 004, 005, 006, 020, 023 | match — descriptive of the photograph, none tied to a named room, none claiming a service the dossier lacks |
| "Photographs: KA Surf Hostel's own, from its Booking.com listing and Instagram." | `images[].license_note` | match |
| title "KA Surf Hostel, Ahangama"; meta/og description | `business.name`, `tagline`, `distance_to_beach`, `room_types[]` | match |
| JSON-LD `@type` Hostel; `knowsLanguage` en | `business.type.note` (Booking category "Hostel"); `languages_spoken` English | match |
| forecast numbers | Rosa live data, never content (schema v0.3) | hard constraint 9 |
| absent, as required: parking, restaurant, fibre WiFi, season, WhatsApp, email, reply time, prices, ratings markup | `contradictions[0,2,3]`, `gaps[]`, Shahar 2026-09-22 | absent — "restaurant" survives only inside the dossier's own Google Maps URL, "parking" only as "Bicycle parking" |

**Totals: 43 rows = 80 individual claims; 80 match, 0 mismatch, 0 missing.** Round 2's three findings are all gone, and nothing replaced them.

## Open items (facts, not decided here)

- Ratings carry no capture date (`fetched_at` 2026-09-19); playbook §6 asks for one.
- The wave/spot section sits after location, against playbook §3's order — inherited from round 16.
- `contact.whatsapp` is required by schema v0.3 and KA has none: it still blocks a Payload seed. `contradictions[1]` (check-in) and `contradictions[0]` (parking) remain owner questions.
- No `SITE_URL` in this build, so no canonical, `og:url`, `og:image` or sitemap; no favicon. The deployer must build production with `SITE_URL=https://<domain>/` (`seo-report.md`).
- `?no-webgl` and `?open` test hooks are still in the shipped inline script. `robots.txt` allows 15 AI crawlers pending the owner. The Hostelworld and Agoda marks carry no licence grant.
- `audit.json` artefacts, not page defects: `has_skip_link: true` (it matches the wordmark's `#top` link — there is no skip link), `reduced_motion.canvases_hidden: 0` (the canvas is `display:none` under reduced motion when measured after paint), `keyboard: null` and `drawer_triggers: 0` (the triggers are plain `a.book` links, not `data-open-drawer`).
- The humanizer's two voice notes on `copyBlocks[4]` are unfixed by design (`review.md` round 8).

## Evidence

`final/audit.json` (rewritten by this run, 2026-09-22T18:37:06Z) · `final/shots/critic-3/`: `desktop-sheet.png`, `mobile-sheet.png`, `desktop-00…14.png`, `mobile-00…17.png`, `shoot.json`, `w1525-00…14.png`, `w1920-00…14.png`, `leaf-390|1440|1525|1920.png`, `rosa-live-390.png`, `rosa-live-{1440,1525,1920,390}-{0.7-1,1.8-2.4,10-12.5}.png`, `rosa-404-390|1440.png`, `rosa-stale-390|1440.png`, `rosa-jsoff-390.png`, `tap-390-panel.png`, `kbd-1440-panel.png`, `kbd-390-panel.png`, `crops-focus-390.png`, `reduced-390.png`, `reduced-390-first.png`. The Playwright and PIL helpers ran from /tmp and are not part of the repo.

what the designer prompt got wrong: nothing new, and both round-2 items came back fixed in the smallest possible way — two CSS declarations and one link label, with `content.json` re-seeded rather than hand-edited, and the diff confined to four values. The lesson worth keeping is the one the fallback exposed: the designer had read playbook §4's "their space reserved with fixed dimensions, so nothing shifts when they arrive" as a statement about arrival, and built a fallback that deleted the reserved half on failure. That was a fair reading of the sentence, so the prompt is what should change — playbook §4 should say the reserved boxes hold on *every* path (success, failure, stale, JS off), and the designer's self-check should be a **slow** failure with the block on screen (a 404 after a second, the 10 s timeout), because an instant abort resolves off screen and reports a clean zero. The build's own round-3 note now does exactly that, including a control run that proves the harness is live; that pattern — measure the fix, then prove the measurement by re-breaking it — is worth promoting into `agents/designer/base.md` as the standard for any "nothing moves" claim. On the copy side the round-2 conclusion held: the whole-file, no-framing-exemption re-audit (`review.md` rounds 6–8) is what cleared three rounds of leftovers that per-field re-reviews kept missing, and the copyeditor prompt should require it whenever any field is re-reviewed after a critic fail.

fix list (fail only): none — the round passes.

# full · verification (post-pass corrections, 2026-09-22)

critic 0.3.2 · station 5 · run `2026-09-ahangama-02` · playbook 0.4.0, rubric 0.1.0. **Not a fix round:** station 5 passed at round 3 (92/100), and this pass re-verifies the three corrections made after it — the test hooks removed and the rating capture dates added (Correction 1), the preview `noindex` rule (station 4h re-run), and the OpenStreetMap embed restored with the 96 px forecast channel (Correction 2). The 3-round cap does not apply. Under review: `sites/ka-surf-hostel-and-restaurant/final/dist/` **as built** (`index.html` 23:46 local, 80 234 B, `SITE_URL=https://ka-surf-hostel.os1.workers.dev/`) — not rebuilt — with `final/notes.md` (Corrections 1 and 2, rounds 7–8), `seo-report.md` (the preview-build section), `aiseo-report.md`, `copy/review.md` round 8, `copy/sources.md`. Every test ran against a plain `python3 -m http.server` on `dist/` (no rewrites, no compression), headless Chromium, software GL. Comparison baseline: `final/shots/critic-3/`. The live preview at `https://ka-surf-hostel.os1.workers.dev/` was fetched and compared with `dist/`. No real phone.

```
mode: full        round: verification (post-pass corrections)        variant: unique ("Canopy")
total: 92 / 100           result: pass        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | The copy is byte-identical to the round-3 pass: `git diff 4648a94 -- sites/ka-surf-hostel-and-restaurant/copy` and `… final/src/tenant/content.json` are both **empty**, so the round-3 table (43 rows → 80 individual claims, 80 match, 0 contradict, 0 unsourced) stands unchanged; the seven retired phrases are still 0 hits in `dist/`. I re-checked only the new claims and links. **Rating capture dates:** all three `ratings[].capturedAt` are `"2026-09-19"` and all three `dossier.reviews.{hostelworld,booking,google}.fetched_at` are `2026-09-19T17:05:00Z` → the page's "read 19 September 2026" is correct, 7 occurrences, all 7 present with JS off; the scores beside them (9.8/10 66, 9.5/10 38, 4.8/5 42) are the dossier's. `dist/llms.txt` carries **0** "read 19" and the JSON-LD has **0** `aggregateRating`, so no undated copy of the claim exists. `audit.json` `facts.numbers_not_in_passed_copy: ["19"]` is that date and nothing else. **Map claims:** marker `5.98181,80.35206` = `location.plus_code` "X9J2+PR Ahangama" decoded (6MQ2X9J2+PR → 5.9818125, 80.3520625), the same pin as JSON-LD `geo`; the approximate `lat_lng` [5.9805, 80.3486] is still unused. The fallback link inside the map box is `https://www.google.com/maps/search/KA%20surf%20hostel%20and%20restaurant/@5.9794134,80.350836,17z?hl=en`, character-identical to `location.map_url`; the credit reads "Map © OpenStreetMap contributors" → `https://www.openstreetmap.org/copyright`, the attribution ODbL asks for. The deduction is the one carried from round 3: the published check-in window (13:00–23:00, out by 13:00) is Hostelworld's side of `contradictions[1]`, still unresolved, recorded in `sources.md` and not decided here |
| 2 | mobile + performance | 10 | `final/audit.json`, rewritten by this run (2026-09-22T20:51:12Z, 390×844, 1.6 Mbps, 150 ms RTT, 4× CPU, no scroll): **238 561 B first load, 8 requests, 0 third-party, LCP 400 ms, CLS 0**, JS 0 B as files, largest image 47 428 B, 1 font family 32 292 B. The map cost 5 289 B of HTML and nothing else on first load. Budget table below, every line inside with **both embeds loaded**. Layout shift re-measured by me over a user-like wheel scroll with a `PerformanceObserver` (`hadRecentInput` false), 8 runs — 390 and 1440 × {both embeds live, map blocked, Rosa blocked, all third-party blocked}: **0.0000 in all eight**, and `.map-frame`, `.fc-now` and `.fc-rosa` hold the identical page box in every one (1440: 120,8476,384×500 · 287,9512,351×289 · 734,9512,420×500; 390: 80,10568,290×320 · 20,11416,350×232 · 20,11696,350×500). No overflow at 390, 1440, **1525 or 1920** (`scrollWidth − innerWidth` = 0 at all four); at 1525 and 1920 the forecast channel measures exactly 96 px, the map frame 384×500, and `.crops` / `.tiles` span the 1200 px column (163–1363 / 360–1560). Sheets: desktop 15 captures / 11 689 px, mobile 18 / 13 400 px, `shoot.json` errors `[]`, no blank-leaf flake, Rosa's widget fully painted |
| 3 | booking CTA | 9 | 390, external navigation blocked and logged. The bar's "Check dates" is **280 × 63 px**, `href` `https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/`; tapping it opens `#book` (`hidden` false), focus lands on the Hostelworld tile (168 × 108 px); tapping tile 1 issues a **document** navigation to that exact URL and the aborted load replaces the document — proof it is a real link. **With JavaScript off** the same tap navigates straight to the same URL. Esc closes the panel and focus returns to the bar button; from room row 4 the panel's context line reads "Double room, 1 extra-large double bed" and Esc returns focus to that row. `audit.json` link inventory unchanged: Hostelworld / Booking.com / Agoda / `tel:+94773746053` / Google Maps / Rosa, each character-identical to `booking.engine_url`, `booking.other_engines`, `contact.phone`, `location.map_url`. Deduction unchanged from rounds 1–3: no prefilled message is possible (no WhatsApp in the dossier, OTAs take none) and no expected reply time sits beside the action (`booking.reply_time_hint` is a gap) |
| 4 | brand fit | 9 | Playbook §3 hierarchy intact; first screen still what + where, "Check dates", 9.8/10 with count, source **and now its capture date**. Both of Shahar's gate answers are built as asked and nothing else moved: the map is back in "Getting here" in the round-12 composition (left columns, the 1 px rule, the text right), and the forecast channel is 96 px at 1440/1525/1920 against critic-3's 24–26. Rosa's widget is untouched by the change — same 420 × 500 box, same light theme, it only re-centres with the group. Sheets compared capture for capture with `critic-3/`: the only differences are the three capture-date lines on the first screen (which lift the mobile hero block ~24 px), the map in desktop 13 / mobile 13–14 and its credit at the top of desktop 12, the wider channel in desktop 14, and mobile paging one capture later from 13 on (page 13 032 → 13 400 px; desktop page height identical at 11 689). Deduction unchanged: the wave/spot section still sits after location, against playbook §3's order, as in the picked mockup |
| 5 | copy quality | 9 | Page text is round 3's, unchanged (`copy/` and `content.json` identical to commit `4648a94`). The one new string is "read 19 September 2026" — plain, two syllables of verb, spelled-out month so it cannot be read as a US or EU numeric date; it sits one type step down from the line above in the page's own Outfit and `--ink`, and the Agoda tile, which has no score, correctly gets no date. `dist/llms.txt` gains one template line ("Preview build, not the published site…"), which is a statement about the build, not a claim about the business. Deduction unchanged: the copyeditor's two unfixed voice notes on `copyBlocks[4]` (`review.md` round 8, voice 7/8) |
| 6 | accessibility | 8 | axe-core 4.11.1 from a local copy (`~/Projects/Learning/uigen/node_modules`, nothing installed; full wheel scroll first, third-party blocked), WCAG 2.0/2.1 A+AA: **0 violations at 390 and at 1440** (27 / 26 passing rule sets). Incomplete at both: `aria-prohibited-attr` (1, the footer's `aria-label`) and `color-contrast` (3 at 390, 14 at 1440 — text over the canopy), exactly as round 3. Keyboard, measured with the forecast **live** and the map loaded at 1440 (round 3 could not do this): Call → Check dates (header) → Check dates (hero) → phone → Hostelworld → Booking.com → 6 room rows → Open in Google Maps → **6 stops inside the OpenStreetMap frame** → "© OpenStreetMap contributors" → "Forecast for Kabalana by Rosa" → 1 stop inside Rosa's frame → `.crops` → 3 tiles. The Rosa fallback link is correctly **not** a tab stop while the widget is live, and becomes one in the fallback state. Dialog: 8/8 Tabs stay inside `#book`, Esc closes, focus returns. Reduced motion at both widths: `canvas` hidden, the static SVG canopy shown, photographs visible. No-WebGL (real capability check — `getContext` stubbed to return null for `webgl`/`webgl2`, no query hook): `data-canopy="2d"`, **0 page errors** at both widths. Two deductions. (a) Still no skip link; `audit.json` `has_skip_link: true` is the same false positive (the `#top` wordmark). (b) **New, and pre-existing rather than caused by the corrections: 15 of the 21 visible tap targets at 390 are under 44 px on their short side** — the six room-row "Check dates" links are 88 × 25, "Open in Google Maps" 164 × 22, the wordmark 108 × 26, the two OTA name links 80 × 20 and 87 × 19. `audit-mockup.mjs` reports 0 because its rule is `height < 44 **and** width < 44`, which nothing on the page meets; playbook §4 and rubric dimension 6 ask for ≥ 44 px, and by that reading these fail. The primary path is unaffected — the bar CTA is 280 × 63 and the panel tiles 168 × 108 |
| 7 | security + delivery | 10 | Static output only, no CMS call at runtime, no external scripts of any kind (`<script src=…>`: 0). **All three round-3 deductions are gone.** Test hooks: `grep -c "no-webgl"` and `'?open'` in `dist/index.html` → **0 / 0**, and the no-WebGL fallback still works as a capability check (dimension 6). `SITE_URL` is set, so canonical, `hreflang`, `og:url`, `og:image` and JSON-LD `@id` / `url` / `image` are absolute on the preview host. The preview rule holds in the build: `dist/robots.txt` is `Disallow: /` for `*` **and** for all 15 named AI crawlers in their own groups, the head carries `<meta name="robots" content="noindex, nofollow">`, there is **no `sitemap.xml`** in `dist/`, and `llms.txt` opens with the preview line. Third-party requests on first load: **0 in all eight instrumented runs** (7 local requests each). Offline (every non-local request aborted), 390 and 1440, JS on and off: both embeds fall back to their plain links, 0 off-host responses. Exactly two third-party embeds, both `data-src` with no `src` in the HTML — table below |

`total = 9×2.5 + 10×2 + 9×1.5 + 9 + 9 + 8 + 10 = 92`. Full-mode pass needs no hard fail, total ≥ 80, every dimension ≥ 6 and every playbook §4 budget line met. All four hold. **Result: pass — the site still passes.**

## Budget table (playbook §4, `final/audit.json` first_load: 390×844, 1.6 Mbps, 150 ms RTT, 4× CPU, no scroll) — and the same lines with both embeds loaded

| Item | Target | Measured (first load) | With both embeds loaded |
|---|---|---|---|
| First-load transfer | ≤ 1.5 MB | **238 561 B, 8 requests**, host `localhost:8980` only | unchanged — neither embed requests anything before its block scrolls near |
| JS, compressed | ≤ 300 KB | 0 B as files; inline 20 930 B raw / 8 016 B gzip inside the 80 234 B HTML | unchanged (the embeds' own scripts run in their own frames) |
| Largest above-the-fold image | ≤ 200 KB | none above the fold (the first screen is drawn); largest fetched on first load 47 428 B | unchanged |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family (Outfit), 32 292 B, self-hosted | unchanged; the Google Fonts request is Rosa's, inside Rosa's frame |
| LCP | ≤ 2.5 s | **400 ms** | unchanged (first-load metric; nothing third-party is in it) |
| CLS | < 0.1 | **0** | **0.0000** over a full scroll with both embeds arriving, and 0.0000 with either or both blocked — 8 runs, 390 and 1440 |
| Third-party requests on load | 0 | **0** | **0** — measured in all 8 runs |

Fact for the human, not a budget line: once both blocks are scrolled to, the page's own frame has fetched 669 335 B over 17 requests (the photographs) and the two embed frames a further **2 177 322 B over 16 requests** of their own. That weight is Rosa's and OpenStreetMap's, it is outside the first-load budget by playbook §4's rule, and a visitor who never reaches "Getting here" or the forecast never pays it — but it is the real cost of the two embeds on a metered connection.

## Third-party embeds (playbook 0.4.0 §4, hard constraint 9) — count and evidence

**Count: exactly two.** `grep '<iframe'` on `dist/index.html` returns 2 and nothing else; `<script src=…>` from another origin: 0; no tracker, chat widget, cookie wall or pop-up. Neither iframe carries a `src` attribute in the HTML — both hold `data-src`.

| Check (each embed) | OpenStreetMap map, "Getting here" | Rosa forecast widget |
|---|---|---|
| 0 requests on first load | **0** — 7 local requests at load + 2.5 s, no scroll; `src` still `null`, `.map-frame` not `.on` | **0** — same run; `src` `null`, `.fc` unresolved |
| loads only when its block nears the viewport | IntersectionObserver `rootMargin: 400px`, then one opaque `HEAD` probe to the embed URL, then `src` is set. Hosts that appear only after the scroll: `www.openstreetmap.org`, `tile.openstreetmap.org` | the block's own JSON request (`rosa-data-opal.vercel.app/data/spots/kabalana.json`) first, `rosa.surf/widget/…` only after fresh data; `fonts.googleapis.com`, `fonts.gstatic.com`, `server.arcgisonline.com` are requests **inside Rosa's frame** |
| space reserved — nothing shifts on arrival, on failure, when refused | box **384 × 500 at 1440 / 1525 / 1920, 290 × 320 at 390**, identical in all four modes (live, blocked, other embed blocked, everything blocked) at both widths; CLS 0.0000 | `.fc-now` 351 × 289 / 350 × 232 and `.fc-rosa` 420 × 500 / 350 × 500, identical in all four modes at both widths; CLS 0.0000 |
| plain-link fallback, JS off and on failure | JS off: `src` `null`, the reserved box shows "207/A Welahangoda, 80650 Ahangama, Sri Lanka" + **"Open in Google Maps"** (= `location.map_url`) with the credit under it, 0 third-party requests. Blocked: the HEAD probe rejects, `.on` stays false, the same address + link — **no dead frame** (`blocked-map-390|1440.png`, `jsoff-map-390|1440.png`) | JS off and blocked: `fc off`, `src` `null`, "See today's forecast for Kabalana on Rosa" → `https://rosa.surf/spot/kabalana` visible inside the widget's box, the headline half's box kept and its contents hidden (`blocked-forecast-390|1440.png`, `jsoff-forecast-390|1440.png`) |
| every budget line met with both loaded | see the table above — all seven lines hold, CLS 0.0000 with both live | same |

Independence checked both ways: with only OpenStreetMap blocked the widget still goes live and the map shows its address; with only Rosa blocked the map still loads and the forecast shows its link.

## Rosa forecast (hard constraint 9), re-checked

Spot id unchanged and consistent: `data-json …/data/spots/kabalana.json`, widget `spot=kabalana`, credit "Forecast for Kabalana by Rosa" → `https://rosa.surf/spot/kabalana`. The site's half is still the headline only — "0.7–1.1 m / Tuesday 22 September, 20:30 at Kabalana / Swell 12.0 s from the south / Wind 11 km/h from the west, cross-shore / Rosa, updated 22 September 2026, 19:56" — no day boxes, no row of days, no chart. The widget's `data-src`, `title`, `width`, `height`, `style`, `loading`, `referrerpolicy` and `sandbox` are unchanged from round 3 and from `agents/designer/tools.md`; it renders 420 × 500 at 1440/1525/1920 and 350 × 500 at 390, in Rosa's light theme, not restyled, cropped or covered (`w1525-forecast.png`, `w1920-forecast.png`, `critic-4/desktop-14.png`, `mobile-15.png`). The only change is the channel beside it: **96 px at 1440, 1525 and 1920** (critic-3: 24–26 px), the widget box and its left edge relative to the group unchanged.

## Preview rule (station 4h), and the live preview

| Check | `dist/` (under review) | Live `https://ka-surf-hostel.os1.workers.dev/` |
|---|---|---|
| `robots.txt` | `Disallow: /` for `*`, then all **15** named AI crawlers in their own groups, no `Sitemap:` line | **byte-identical** (md5 `e933d45c…`) |
| `<meta name="robots">` | `noindex, nofollow` | present, same |
| `sitemap.xml` | absent from `dist/` | `404` |
| canonical | `https://ka-surf-hostel.os1.workers.dev/`; `hreflang` en + x-default and `og:url` / `og:image` on the same host | same |
| `llms.txt` | preview line present, 0 rating dates | **byte-identical** (md5 `de9520f9…`) |
| `index.html` | 80 234 B, md5 `1952a447…` | **76 443 B, md5 `bec3f8a9…` — NOT the same build** |

**The live preview is one build behind `dist/`.** Fetched twice, the second time with a cache-buster and `Cache-Control: no-cache`: the live page contains **0** occurrences of `openstreetmap.org/export/embed` and its `.fc` rule is `column-gap:var(--g)`, not the `clamp(…,96px)`. In other words the owner's preview is the Correction-1 build and shows **neither** of Shahar's two Correction-2 items — no map, 24 px channel. Everything else about it (robots, llms, noindex, canonical) matches. This is a deploy state, not a defect in the build under review, so it is not scored here and not a hard fail; it needs a redeploy by the deployer before the owner is pointed at the link. I did not deploy.

## Default-look facts and image checks (hard constraint 4)

`check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist --no-shots`: `ok`, **0 problems, 0 warnings**. Look: fonts h1 / h2 / body all "Outfit"; ground `rgb(240, 241, 242)` = `hsl(210 7% 95%)`; all-caps labels 0; labelled headings 0/8. `check-places.mjs ka-surf-hostel-and-restaurant`: **0 borrowed image uses checked, 0 failing**. The same 11 business-owned photographs, no stock, no caption tying a photograph to a named room; 14/14 images have alt (3 decorative marks empty).

## Look against `critic-3/`, capture by capture

Both sheets opened at both ends. Allowed differences, and only these: (1) three "read 19 September 2026" lines on the first screen and four more on the booking tiles — seven in all, none in `llms.txt` or the JSON-LD; (2) the map in "Getting here" (desktop 13, mobile 13–14) with its credit line appearing at the top of desktop 12; (3) the 96 px forecast channel in desktop 14, with Rosa's widget in the same box. Consequences of those, not separate changes: the mobile page is 368 px taller (13 032 → 13 400) so mobile captures from 13 on page one step later, and the mobile hero block sits ~24 px higher because the three date lines make it taller. Desktop page height is identical (11 689 px both). The Agoda tile is black in desktop 14 in **both** sheets — the shoot's pointer hovering it, as in round 16, not a defect. Nothing else differs that I could see, at 390, 1440, 1525 or 1920; no overlap, no overflow, no unreadable text.

## What would fail if this were a scored round

Nothing fails. Two things would cost points, and one is worth the human's attention:

1. **Tap targets (dimension 6, −1).** 15 of 21 visible tap targets at 390 are under 44 px on the short side (88 × 25 room links, 164 × 22 and 108 × 26 text links, 80 × 20 and 87 × 19 OTA names). Pre-existing since the picked mockup; earlier rounds recorded "0 under 44 px" because `audit-mockup.mjs` only counts a target that is under 44 px on **both** sides. The primary booking path is well over. This is a tool-vs-playbook gap more than a build defect, and it belongs in a learn-mode proposal against `tools/audit-mockup.mjs`, not in a fix list here.
2. **Still no skip link (dimension 6).** Unchanged from rounds 1–3; `audit.json` `has_skip_link: true` remains a false positive.

Carried, unchanged, already recorded: the check-in window taken from Hostelworld while `contradictions[1]` is unresolved (dimension 1); no prefilled booking message and no reply-time hint (dimension 3); the spot section after location (dimension 4); the two voice notes on `copyBlocks[4]` (dimension 5). Outside the score: the live preview is a build behind (above).

## Evidence

`final/audit.json` (rewritten by this run, 2026-09-22T20:51:12Z) · `final/shots/critic-4/`: `desktop-sheet.png`, `mobile-sheet.png`, `desktop-00…14.png`, `mobile-00…17.png`, `shoot.json` (0 console errors, desktop 15 / 11 689 px, mobile 18 / 13 400 px), `w1525-forecast.png`, `w1525-map.png`, `w1920-forecast.png`, `w1920-map.png`, `blocked-map-390|1440.png`, `blocked-forecast-390|1440.png`, `jsoff-map-390|1440.png`, `jsoff-forecast-390|1440.png`, `jsoff-390|1440.png`, `reduced-390|1440.png`, `nowebgl-390|1440.png`, `cta-panel-390.png`.

what the designer prompt got wrong: nothing — all three corrections are built the way they were asked for, each confined to what it needed. Correction 2 in particular is the pattern the round-3 note asked to promote: the map came back from the only place it survived (the picked mockup, identical rules), the channel change was made to absorb its own squeeze so Rosa's card holds 420 px to exactly the window width it held before, and both claims were measured across widths and injected values rather than asserted. The one lesson this pass adds is not about the designer at all but about the evidence tools two stations depend on: `tools/audit-mockup.mjs` reports `tapables_under_44px` with the rule `height < 44 **and** width < 44`, which no realistic text link ever satisfies, so three rounds of scorecards recorded "0 tap targets under 44 px" for a page where 15 of 21 are under 44 px on their short side. A check whose passing condition is nearly unreachable is worse than no check, because it is quoted as evidence. That is a learn-mode proposal against `tools/audit-mockup.mjs` (and the line in `agents/critic/tools.md` that describes it), with this scorecard as the evidence. Second, smaller: the preview deploy and the build drifted apart inside one day, and nothing in the pipeline compares the deployed bytes with `dist/` — the deployer's prompt should end with that comparison, because "the preview is live" is exactly the kind of claim a station is meant to verify rather than report.

fix list (fail only): none — the site still passes.

# full · verification 2 (map swap + tap targets, 2026-09-23)

critic 0.3.2 · station 5 · run `2026-09-ahangama-02` · playbook 0.4.0, rubric 0.1.0. **Not a scored fix round:** station 5 passed at round 3 (92/100) and again at the first verification (92/100); this pass re-verifies the three items of Correction 3 — the `tools/audit-mockup.mjs` fix, the padded tap targets, and the map swapped from OpenStreetMap to Google's keyless embed with no border and no credit line of ours. The 3-round cap does not apply. Under review: `sites/ka-surf-hostel-and-restaurant/final/dist/` **as built** (`index.html` 82 653 B, md5 `5451a08c…`, built 06:27 local, `SITE_URL=https://ka-surf-hostel.os1.workers.dev/`) — not rebuilt. Read first: `final/notes.md` "Correction 3" and the round-9 / round-10 look-log entries; the designer's claims were re-measured, not taken on trust. Every test ran against a plain `python3 -m http.server` on `dist/` (no rewrites, no compression), headless Chromium, software GL, Playwright from the repo's own `node_modules`. Comparison baseline: `final/shots/critic-4/`. No real phone.

```
mode: full        round: verification 2 (map swap + tap targets)        variant: unique ("Canopy")
total: 93 / 100           result: pass        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Copy untouched: `git diff 4648a94 -- sites/ka-surf-hostel-and-restaurant/copy` and `… final/src/tenant/content.json` are both **empty**, so the round-3 facts table (43 rows → 80 individual claims, 80 match, 0 mismatch, 0 missing) stands. The whole diff since `985a926` is three files — `src/lib/site.mjs`, `src/pages/index.astro`, `src/styles/site.css` — and it contains the map swap and the tap-target padding and nothing else. **Map claims re-checked:** the embed is `https://www.google.com/maps?q=5.98181,80.35206&z=15&output=embed`; 5.98181/80.35206 is `location.plus_code` "X9J2+PR Ahangama" decoded and the same pin as JSON-LD `geo`. The fallback link inside the reserved box, the "Getting here" link and the footer link are all `https://www.google.com/maps/search/KA%20surf%20hostel%20and%20restaurant/@5.9794134,80.350836,17z?hl=en` — character-identical to `contact.mapUrl` and to dossier `location.map_url` (4 occurrences in `dist/index.html`, all identical). **Nothing OpenStreetMap-related is left:** `grep -ril openstreetmap dist/` → **0 files**; the `.map-cred` markup, its CSS and `MAP_PIN.bbox` are gone from the source. **Rating dates:** "read 19 September 2026" × **7** in `index.html`, 0 in `llms.txt`, 0 `aggregateRating` in the JSON-LD; dossier `reviews.{hostelworld,booking,google}.fetched_at` are all `2026-09-19T17:05:00Z` and `content.json` `ratings[].capturedAt` all `"2026-09-19"`. Deduction unchanged: the published check-in window (13:00–23:00, out by 13:00) is Hostelworld's side of `contradictions[1]`, still unresolved |
| 2 | mobile + performance | 10 | `final/audit.json`, rewritten by this run (`measured_at 2026-09-23T03:38:54Z`, 390 × 844, 1.6 Mbps, 150 ms RTT, 4× CPU, no scroll): **240 980 B first load, 8 requests, 0 third-party, LCP 424 ms, CLS 0**, JS 0 B as files, fonts 32 292 B in 1 family, largest image 47 428 B. (First load is 2 419 B heavier than the last pass — the tap-target CSS; HTML 80 234 → 82 653 B.) Budget table below: every line inside, **with both embeds loaded**. CLS re-measured by me with a `PerformanceObserver` and a **programmatic** scroll, so no shift is excluded as `hadRecentInput` (the previous pass scrolled with the wheel, which suppresses shifts within 500 ms of input): **0.00000 in all 10 runs** — 390 and 1440 × {both live, map blocked instantly, map failing after 1.5 s, Rosa failing after 1.5 s, everything blocked}. Reserved boxes identical in every one of those runs: `.map-frame` 290 × 320 at 390 and 384 × 500 at 1440/1525/1920, `.fc-rosa` 350 × 500 / 420 × 500, page height 13 448 / 11 713 px in every mode. No overflow (`scrollWidth − innerWidth` = 0) at **390, 1440, 1525 and 1920**; the forecast channel is exactly 96 px at all three desktop widths and `.crops` / `.tiles` span the 1200 px column. `shoot.mjs` at `--settle 1400`: desktop 15 captures / 11 713 px, mobile 18 / 13 448 px, `truncated: false`, no blank-leaf flake, Rosa's widget fully painted in both sheets |
| 3 | booking CTA | 9 | 390, external navigation blocked and logged. The bar's "Check dates" is **280 × 63**, `href` `https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/`; tapping it opens `#book` and focus lands on the Hostelworld tile (**108.3 × 168.2**); tapping that tile issues a **document navigation** to that exact URL. **With JavaScript off** the same tap navigates straight to the same URL — one navigation, no panel. From room row 4 the panel's context line reads "Double room, 1 extra-large double bed"; Esc closes and focus returns to the bar button. `audit.json` link inventory unchanged and character-identical to `booking.engine_url`, `booking.other_engines`, `contact.phone`, `location.map_url`. Deduction unchanged from rounds 1–3: no prefilled message is possible (no WhatsApp in the dossier, OTAs take none) and no expected reply time sits beside the action |
| 4 | brand fit | 9 | Playbook §3 hierarchy intact. Both sheets compared capture for capture with `critic-4/` at both ends. **Only three differences, all of them the ones allowed:** (1) the map — OpenStreetMap's tiles and its framed, bordered box replaced by Google's map, with the page's own "Map © OpenStreetMap contributors" line gone from desktop 12 / mobile 13 (Google draws "Map data ©2026 · Terms · Report a map error" and its own mark inside the frame instead); (2) the padded targets — visible only in the footer contact block, where the phone and map links now sit as spaced inline-blocks instead of two tight lines; (3) live forecast values (0.7–1.1 m, 22 Sep 20:30 → 0.6–0.9 m, 23 Sep 02:30). Consequences, not separate changes: mobile page 13 400 → 13 448 px, desktop 11 689 → 11 713 px, capture counts unchanged (15 / 18). At 1440 the map reads better than it did: the borderless frame sits in the same left columns of the round-12 composition, and at z=15 it carries Kabalana beach, Kabalana Rd, Thiththagalla Rd, Jeeva's Garden Restaurant, Black Honey cafe and Wevilihena as well as the pin — the "surrounding places" the swap was asked for (`map-live-1440.png`, `map-live-390.png`). The Agoda tile is black in desktop 14 of **both** sheets, the known pointer-hover artefact. Deduction unchanged: the wave/spot section still sits after location, against playbook §3's order |
| 5 | copy quality | 9 | Page text is round 3's, byte for byte (`copy/` and `content.json` identical to `4648a94`). Correction 3 added no string and removed one: the page's own "Map © OpenStreetMap contributors" credit, which is correct — the attribution it discharged is now drawn by Google inside its own frame. The iframe's accessible name changed from "Map of KA Surf Hostel, Ahangama (OpenStreetMap)" to "Map of KA Surf Hostel, Ahangama", still accurate. Deduction unchanged: the copyeditor's two unfixed voice notes on `copyBlocks[4]` (`review.md` round 8) |
| 6 | accessibility | 9 | **The tap-target deduction of the last pass is gone; this is the one score that moves (8 → 9).** `tools/audit-mockup.mjs` is genuinely fixed — the rule is now `r.height < 44 \|\| r.width < 44` (`git diff tools/audit-mockup.mjs`) — and on this build it reports `tapables: 19, tapables_under_44px: 0, tapables_under_44px_examples: []`. I re-measured every target myself at 390 in three states, including the ones the audit cannot see (table below): **25 real targets, 0 under 44 × 44, 0 overlapping pairs.** axe-core 4.11.1 from a local copy (`~/Projects/Learning/uigen/node_modules`, nothing installed; full scroll first, third-party blocked), WCAG 2.0/2.1 A+AA: **0 violations at 390 and at 1440** (27 / 26 passing rule sets). Keyboard at 1440 with both embeds live: Call → Check dates (header) → Check dates (hero) → phone → Hostelworld → Booking.com → 6 room rows → Open in Google Maps → **1 stop inside the Google frame** (OpenStreetMap took 6) → "Forecast for Kabalana by Rosa" → 1 stop inside Rosa's frame → `.crops` → 3 tiles → phone → map link. Dialog: 9/9 Tabs stay inside `#book`, Esc closes, focus returns to the trigger. Reduced motion at both widths: the canvas is hidden, photographs visible, 0 page errors. No-WebGL (capability check, `getContext` stubbed to return null for `webgl`/`webgl2`): `data-canopy="2d"`, **0 page errors** at both widths. Three deductions, all small. (a) Still no skip link; `audit.json` `has_skip_link: true` is the same false positive (it matches the `#top` wordmark). (b) **At 1440 three pointer targets are still under 44 px high** — the desktop header's "Call" 28 × 26 and "Check dates" 88 × 26, and the hero's "+94 77 374 6053" 125 × 22. All three are `display:none` at 390, which is why the 390 pass is clean and why the correction, scoped to 390 as Shahar asked, did not reach them. (c) axe's `color-contrast` **incomplete** count rose from 3/14 to **26/29**, every one of them "background color could not be determined because element contains an image node" — i.e. the new 1 px gradient underline. I checked the ratios by hand instead: every padded link is `rgb(6,5,4)` on `rgb(240,241,242)` = **18.01:1**, the Rosa credit 12.69:1 on `--sky`, the bar CTA 5.98:1 on melon. Contrast is fine; the fix traded a machine-checkable underline for one axe cannot evaluate |
| 7 | security + delivery | 10 | Static output only, no CMS call at runtime, no external scripts of any kind (`<script src=…>` from any origin: **0**). Exactly **two** iframes, neither carrying `src` in the HTML — both hold `data-src`. Third-party requests on first load: **0** in every one of the 10 instrumented runs (7 local requests each; 16 with JS off, all local). Offline (every non-local request aborted), 390 and 1440, JS on and off: both embeds fall back to their plain links, 0 off-host responses. Test hooks still absent: `grep -c "no-webgl"` and `'?open'` → **0 / 0**. Preview rule in `dist/`: `robots.txt` is `Disallow: /` for `*` **and** for all 15 named AI crawlers in their own groups with no `Sitemap:` line, the head carries `<meta name="robots" content="noindex, nofollow">`, there is **no `sitemap.xml`** in `dist/`, canonical / `hreflang` en + x-default / `og:url` / `og:image` / JSON-LD `@id`·`url`·`image` are all absolute on `https://ka-surf-hostel.os1.workers.dev/`, and `llms.txt` line 5 is the preview line. Google's frame sets **no cookie** on our context and **no cookie, localStorage or sessionStorage inside the frame** — measured, not assumed, in four separate runs |

`total = 9×2.5 + 10×2 + 9×1.5 + 9 + 9 + 9 + 10 = 93`. Full-mode pass needs no hard fail, total ≥ 80, every dimension ≥ 6 and every playbook §4 budget line met. All four hold. **Result: pass — the site still passes, one point better than it did.**

## Tap targets at 390 px, measured by me (the audit's `0` is now true)

`a[href] | button | [role=button]`, three states, box measured with `getBoundingClientRect`, elements filtered on `visibility`, `display` and an ancestor `[hidden]`.

| state | targets rendered | under 44 on either side | overlapping pairs |
|---|---|---|---|
| at load | 19 | **0** | **0** |
| scrolled past the clearing (header name visible) | 20 | **0** | **0** |
| booking sheet open | 25 | **0** | **0** |

| target | measured at 390 | was (critic-4) |
|---|---|---|
| `.score .src a` "Hostelworld" | 80 × 45 | 80 × 20 |
| `.score .rest a` "Booking.com" | 87 × 45 | 87 × 19 |
| `.list a.book` "Check dates" × 6 | 88 × 46 each | 88 × 25 |
| `.addr a` "Open in Google Maps" | 164 × 47 | 164 × 22 |
| `.map-alt a` "Open in Google Maps" | 164 × 50.6 | 164 × 26 |
| `.credit-rosa a` "Forecast for Kabalana by Rosa" | 217 × 46 | 217 × 21 |
| `.contact p a` "+94 77 374 6053" | 117 × 48 | 117 × 21 |
| `.contact p a` "Open in Google Maps" | 150 × 48 | 150 × 21 |
| `.top .name` "KA Surf Hostel" — **hidden at load**, appears on scroll | 107.6 × 49.5 | 107.6 × 21 |
| `.panel .x` "Close" — **inside the sheet** | 60 × 48 | 40 × 21 |
| `.panel .pcall a` "+94 77 374 6053" — **inside the sheet** | 135 × 49 | 135 × 24 |
| `.panel .tile` × 3 — **inside the sheet** | 108.3 × 168.2 | unchanged |
| `.fc-link` Rosa plain link · footer tiles × 3 · bar "Check dates" / "Call" | 350 × 500 · 115/121/98.1 × 161.3 · 280 × 63 / 110 × 63 | unchanged |

Every number in `notes.md`'s before/after table is confirmed. **No target is under 44 × 44, and no two targets overlap** — checked pairwise across all rendered targets in each of the three states, 0 pairs with more than 0.5 px of overlap in both axes. The one place that gained space is the one the notes name: the footer's phone and map links, now spaced inline-blocks, which is the whole of the 48 px the mobile page grew.

Four targets exist in the DOM but render 0 × 0 at 390 because an ancestor is `display:none` — the desktop header's "Call" and "Check dates" and the hero's "Check dates" and phone link. They are desktop targets, and at 1440 three of them are still under 44 px high (dimension 6, deduction b). The underline: on every padded link it still hugs the text — `background-origin:content-box` with `background-position:0 calc(100% + 1px)` on eight of them, and the browser's own `text-decoration:underline` on `.score .rest a`; **no `border-bottom` survives anywhere the padding could have pushed one down** (`hero-underlines-390.png`).

## Budget table (playbook §4, `final/audit.json` `first_load`: 390 × 844, 1.6 Mbps, 150 ms RTT, 4× CPU, no scroll) — and the same lines with both embeds loaded

| Item | Target | Measured (first load) | With both embeds loaded |
|---|---|---|---|
| First-load transfer | ≤ 1.5 MB | **240 980 B, 8 requests**, host `localhost` only | unchanged — neither embed requests anything before its block scrolls near |
| JS, compressed | ≤ 300 KB | 0 B as files; inline script inside the 82 653 B HTML | unchanged (the embeds' scripts run in their own frames) |
| Largest above-the-fold image | ≤ 200 KB | none above the fold (the first screen is drawn); largest fetched on first load 47 428 B | unchanged |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family (Outfit), 32 292 B, self-hosted | unchanged; the font requests the Google frame makes are inside the Google frame |
| LCP | ≤ 2.5 s | **424 ms** | unchanged (first-load metric; nothing third-party is in it) |
| CLS | < 0.1 | **0** | **0.00000** in all 10 runs, programmatic scroll, both widths, five failure modes |
| Third-party requests on load | 0 | **0** | **0** — every run |

## Third-party embeds (playbook 0.4.0 §4, hard constraint 9)

**Count: exactly two.** `grep '<iframe'` on `dist/index.html` returns 2 and nothing else; cross-origin `<script src=…>`: 0; no tracker, chat widget, cookie wall or pop-up.

| Check (each embed) | Google map, "Getting here" | Rosa forecast widget |
|---|---|---|
| 0 requests on first load | **0** — 7 local requests at load + 2.5 s, no scroll; `src` still `null` | **0** — same run; `src` `null` |
| loads only when its block nears the viewport | IntersectionObserver `rootMargin: 400px`, then one opaque `HEAD` probe, then `src` is set. Hosts that appear only after the scroll: `www.google.com`, `maps.gstatic.com`, `maps.googleapis.com` | the block's JSON request (`rosa-data-opal.vercel.app/data/spots/kabalana.json`) first, `rosa.surf/widget/…` only after fresh data; `fonts.googleapis.com`, `fonts.gstatic.com`, `server.arcgisonline.com` are requests **inside Rosa's frame** |
| space reserved — nothing shifts on arrival, on failure, when refused | box **290 × 320 at 390, 384 × 500 at 1440/1525/1920**, identical in all five modes at both widths; CLS 0.00000 including a 1.5 s slow failure with the block on screen | `.fc-rosa` 350 × 500 / 420 × 500 identical in every mode; `.fc-now` 350 × 232 at 390 in every mode, 351 × 289 at 1440 in the fallback and 351 × 294 with live data — a 5 px growth **inside** a 500 px row that moves nothing after it (CLS 0.00000, `.credit-rosa` at the same page y in both) |
| plain-link fallback, JS off and on failure | both paths: `src` `null`, `.on` false, the reserved box shows "207/A Welahangoda, 80650 Ahangama, Sri Lanka" + **"Open in Google Maps"** (= `contact.mapUrl`), visible, 0 third-party requests, no dead frame (`blocked-map-390\|1440.png`, `jsoff-map-390\|1440.png`) | both paths: `fc off` / `fc`, `src` `null`, "See today's forecast for Kabalana on Rosa" → `https://rosa.surf/spot/kabalana` visible inside the widget's box, the headline half's box kept and its contents `visibility:hidden` (`blocked-forecast-390\|1440.png`, `jsoff-forecast-390\|1440.png`) |
| every budget line met with both loaded | see the table above — all seven lines hold | same |

Independence checked both ways: with only Google blocked the widget still goes live and the map shows its address; with only Rosa blocked the map still loads and the forecast shows its link.

## What the Google frame costs, against what OpenStreetMap cost (a fact for the human, not a budget line)

Two measurements, because they answer different questions. Bytes are **over the wire** (CDP `encodedDataLength`), not decompressed.

**(a) Each embed alone, in a bare page at the box size the site gives it, 12 s to settle** — the fair like-for-like:

| | requests | over the wire | hosts | cookies on our context | storage inside the frame |
|---|---|---|---|---|---|
| **Google**, phone box 290 × 320 | **32** | **818 017 B** | **5** (`www.google.com`, `maps.gstatic.com`, `maps.googleapis.com`, `fonts.googleapis.com`, `fonts.gstatic.com`) | **none** | **none** — `document.cookie` empty, 0 localStorage keys, 0 sessionStorage keys |
| **OpenStreetMap**, same box | 7 | 360 686 B | 2 (`www.openstreetmap.org`, `tile.openstreetmap.org`) | none | none |
| **Google**, desktop box 384 × 500 | 32 | 832 805 B | 5 | none | none |
| **OpenStreetMap**, same box | 12 | 401 858 B | 2 | none | none |

So `notes.md`'s claim — "roughly doubles what the map costs… ~800 KB, 32 responses across 5 Google hosts (OSM: ~370 KB, 11–14, one host)" — is **confirmed on bytes and requests** and wrong on one detail: OpenStreetMap used **two** hosts, not one. The ratio is 2.3× the bytes and 4.6× the requests of OSM in the phone's box.

**(b) In the real page, scrolled to the block, 8–9 s to settle** (the map competes with the page's own images and the widget, and stops fetching tiles once it is scrolled past): Google **16 completed responses / 455 104 B** over 3 hosts; Rosa's half **7 / 61 955 B** over 3 hosts; both together **22 / 533 415 B**, against the page's own 16 local responses / 581 839 B. A visitor who never reaches "Getting here" or the forecast pays none of it — nothing third-party is on first load on any path.

**One new side effect, cosmetic:** Google answers the frame's `HEAD` probe with **404** (OpenStreetMap answered 200), so every visit that scrolls to the map now logs one console error, `Failed to load resource: the server responded with a status of 404`, for `https://www.google.com/maps?q=…&output=embed`. `shoot.json` records it as `1 console error` at both widths where `critic-4` recorded `[]`. The map still loads: the probe is `mode: 'no-cors'`, so the promise resolves opaquely whatever the status, and `.map-frame.on` is true in every live run. Worth knowing that the probe therefore proves only that a network exists, not that the embed is reachable — which was already true with OpenStreetMap.

## Default-look facts and image checks (hard constraint 4)

`check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist --no-shots`: `ok`, **0 problems, 0 warnings**. Look: fonts h1 / h2 / body all "Outfit"; ground `rgb(240, 241, 242)` = `hsl(210 7% 95%)`; all-caps labels 0; labelled headings 0/8. `check-places.mjs ka-surf-hostel-and-restaurant`: **0 borrowed image uses checked, 0 failing**. The same 11 business-owned photographs, no stock, no caption tying a photograph to a named room; 14 images, 0 without alt, 3 decorative empty.

## The live preview (outside the score, and it moved since the last pass)

`https://ka-surf-hostel.os1.workers.dev/` fetched with a cache-buster and `Cache-Control: no-cache`: **200, 80 234 B, md5 `1952a447…`** — exactly the build the previous verification reviewed as `dist/`. So the deploy the last pass reported as missing **has happened**: the owner's preview now carries Correction 2 (the OpenStreetMap map, the 96 px channel). It does **not** carry Correction 3: 0 occurrences of `google.com/maps?q=`, 1 line still containing `openstreetmap`, 0 occurrences of the `padding-block:13px` rule. `dist/` is md5 `5451a08c…`, 82 653 B. **The preview is one build behind again** — Google map and padded tap targets are not on it. A deploy state, not a defect in the build under review, and not scored here. I did not deploy.

## What would fail if this were a scored round

**Nothing fails, and nothing would.** No hard fail: no fact contradicts the dossier, the CTA lands in the right place, no third-party request on first load, no keyboard trap, no canvas-only content, no budget line over, no secrets. Four things would still cost points, none of them new and none from Correction 3:

1. **No skip link** (dimension 6). Unchanged since round 1; `audit.json` `has_skip_link: true` remains a false positive.
2. **Three desktop-only pointer targets under 44 px high at 1440** (dimension 6): header "Call" 28 × 26, header "Check dates" 88 × 26, hero phone 125 × 22. Out of scope of a correction Shahar scoped to 390, and each has a ≥ 44 px twin on the phone.
3. **Carried, already recorded:** the check-in window taken from Hostelworld while `contradictions[1]` is unresolved (dimension 1); no prefilled booking message and no reply-time hint (dimension 3); the spot section after location (dimension 4); the two voice notes on `copyBlocks[4]` (dimension 5).

Two more, facts rather than deductions, both consequences of Correction 3 that the human should see:

- **axe can no longer verify contrast on the padded links.** Its `color-contrast` incomplete count went 3/14 → 26/29, all with the same reason: the 1 px gradient underline is a background image, so axe declines to compute a background. The links measure 18.01:1 by hand, so nothing is wrong — but a check that used to pass now abstains, which is the same failure mode the last pass found in `audit-mockup.mjs` and is worth a line in a learn-mode proposal.
- **The fallback map box lost its outline.** With the border gone, the offline / JS-off state shows the address and "Open in Google Maps" floating in blank space about 380 px below the same address and link in the "Getting here" text — a duplication that the framed box used to explain (`blocked-map-390.png` against `critic-4/blocked-map-390.png`). It appears only when the embed cannot load, and only the frame and the credit changed, not the text.

## Evidence

`final/audit.json` (rewritten by this run, `measured_at 2026-09-23T03:38:54Z`) · `final/shots/critic-5/`: `desktop-sheet.png`, `mobile-sheet.png`, `desktop-00…14.png`, `mobile-00…17.png`, `shoot.json` (desktop 15 / 11 713 px, mobile 18 / 13 448 px, 1 console error each — the Google HEAD 404), `map-live-390|1440|1525|1920.png`, `forecast-live-390|1440|1525|1920.png`, `blocked-map-390|1440.png`, `blocked-forecast-390|1440.png`, `jsoff-map-390|1440.png`, `jsoff-forecast-390|1440.png`, `reduced-390|1440.png`, `nowebgl-390|1440.png`, `sheet-390|1440.png`, `sheet-room4-390|1440.png`, `hero-underlines-390.png`. The Playwright harnesses (tap-target census, CLS observer, CDP byte counter, axe runner, CTA tap-through) ran from /tmp and are not part of the repo.

what the designer prompt got wrong: nothing — all three items are built as asked, each confined to what it needed, and for once the designer's own numbers survived re-measurement in full, including the awkward ones (the 5 px the headline half gains with live data, the one-pixel-short negative margins, the 800 KB the Google frame costs). The lesson this pass adds is about *how a fix is verified*, and it is the same lesson as the last one from the other side. Correction 3 fixed a real defect that three scorecards had missed because a tool's passing condition was nearly unreachable; the fix then replaced a `border-bottom` with a gradient background, which made **axe abstain** on 26 nodes that it used to pass. Both are the same shape: a check that stops being able to fail, and a check that stops being able to pass, are both silent. `agents/designer/base.md` should require that any change to a link's decoration, background or box be re-run through the accessibility tools and the *delta in what they can still evaluate* be reported, not just the delta in violations — a rule the critic can then hold them to. Second, smaller, for `agents/designer/tools.md` and the critic's own `tools.md`: the reachability probe in front of a lazy embed is described as answering "whether the embed arrived", and it does not — `mode:'no-cors'` resolves on a 404 as readily as on a 200, which Google's own 404 to `HEAD` now demonstrates on every visit. Either the probe should be described honestly as a network-presence check, or it should be dropped, because the `iframe`'s own `load` plus the reserved box already give the same fallback without a console error.

fix list (fail only): none — the site still passes.
