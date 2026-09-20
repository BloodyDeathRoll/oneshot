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
