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
