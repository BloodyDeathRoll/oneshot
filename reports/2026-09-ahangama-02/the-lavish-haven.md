# The Lavish Haven — mockup pre-score

run `2026-09-ahangama-02` · station 4f · critic 0.2.0 · measured 2026-09-20

archetype: **the courtyard** (`sites/the-lavish-haven/concepts.md`)

mode **quick**: the three mockups, before the human pick. Per `rubric.md`, dimensions 1, 3 and 7 gate at this
stage; 2, 5 and 6 are reported. Every score carries the measurement that produced it; the raw evidence is in
each mockup’s `audit.json`.

## Result

| variant | concept | total | result | hard fails |
|---|---|---|---|---|
| **calm** | “Off the main road” | **88 / 100** | pass | none |
| **interactive** | “Afternoon to after dark” | **88 / 100** | pass | none |
| **unique** | “The courtyard” | **86 / 100** | pass | none |

No hard fail on any of the three. No fact contradicts the dossier; every booking target matches it character
for character; no non-business image is used; there are **0 third-party requests on first load**; no keyboard
trap; no content that exists only inside a canvas; no budget line over; no secrets in the output.

### The numbers do not pick for you, and should not

All three carry the same words, the same facts, the same booking path and the same accessibility result,
because they are three designs of one audited content set. The rubric therefore separates them only on
measured weight and speed, which is a few points. **The pick is a design judgement** — the sentence under each
variant is what the rubric asks the critic to produce for it, and the ranking above should not override it.

## calm — “Off the main road” · 88/100

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts match dossier | 10 | 17 numbers rendered; 2 are not literally in copy/en.json (19, 2026), each accounted for as a list index, the harvest date in the legal line. 0 unexplained. copy/en.json passed 4c with 0 unsourced and 0 contradicted claims; copy/sources.md maps every paragraph to its dossier fields. |
| 2 | mobile + performance | 5 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 784 KB of 1536 KB (51%); JS 0 KB of 300 KB (0%); fonts 68 KB of 150 KB (45%); largest image 139 KB of 200 KB (69%); LCP 1812 ms of 2500 ms (72%); CLS 0.0014 of 0.1 (1%). Worst line 72% of budget, mean 39%. Every line inside budget. Measured values, not a Lighthouse score: there is no Lighthouse runner in tools/. |
| 3 | booking CTA end to end | 10 | 2 booking links and tel:+94764832988 diffed character for character against dossier.booking and dossier.contact: identical. Primary action above the fold at 390 px; first tap resolves to https://www.booking.com/hotel/lk/the-lavish-haven.html. With JavaScript off, 3 booking links stay reachable in the footer block, and every action is already a plain link. |
| 4 | brand fit vs playbook | 9 | playbook §3 order present; the first screen carries what/where, a booking action and a proof point. The variant matches its brief in custom.md and the concept it was built from in concepts.md. No price anywhere, by design: this business publishes none. |
| 5 | copy quality | 9 | the words are copy/en.json unchanged, which passed station 4c (0 unsourced, 0 contradicted, voice audit passed). The template contributes interface labels only. |
| 6 | accessibility | 10 | 9 images, 0 missing alt (0 deliberately empty because decorative); 11 tap targets, 0 under 44 px; lang="en"; skip link first in document order. No drawer; every action is a link. Under prefers-reduced-motion 0 of 0 canvases stay hidden and the photograph shows. |
| 7 | security + delivery baseline | 10 | first load contacted 1 host(s) (localhost:8986), of which 0 third party. Static output, no server code, no runtime call to the CMS, fonts and platform marks vendored, relative URLs, lowercase filenames. The Rosa forecast iframe is the one third-party embed and carries loading="lazy", so it never appears on first load; it is declared as a conflict in notes.md. |

**For the human.** The quiet one: a cream hotel page whose single loud moment is the pool at dusk, zero JavaScript, and the nine room types set as a table because they all photograph the same.

**What would make it fail.** It is the conformist one. If it is picked it lives or dies on the type and the restraint.

## interactive — “Afternoon to after dark” · 88/100

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts match dossier | 10 | 27 numbers rendered; 11 are not literally in copy/en.json (01, 02, 03, 04, 05, 06, 07, 08, 09, 19, 2026), each accounted for as a list index, the harvest date in the legal line. 0 unexplained. copy/en.json passed 4c with 0 unsourced and 0 contradicted claims; copy/sources.md maps every paragraph to its dossier fields. |
| 2 | mobile + performance | 5 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 406 KB of 1536 KB (26%); JS 6 KB of 300 KB (2%); fonts 110 KB of 150 KB (73%); largest image 159 KB of 200 KB (79%); LCP 356 ms of 2500 ms (14%); CLS 0.0005 of 0.1 (0%). Worst line 79% of budget, mean 32%. Every line inside budget. Measured values, not a Lighthouse score: there is no Lighthouse runner in tools/. |
| 3 | booking CTA end to end | 10 | 2 booking links and tel:+94764832988 diffed character for character against dossier.booking and dossier.contact: identical. Primary action above the fold at 390 px; first tap resolves to #book. With JavaScript off, 4 booking links stay reachable in the footer block, and all 11 drawer triggers are plain links to it. |
| 4 | brand fit vs playbook | 9 | playbook §3 order present; the first screen carries what/where, a booking action and a proof point. The variant matches its brief in custom.md and the concept it was built from in concepts.md. No price anywhere, by design: this business publishes none. |
| 5 | copy quality | 9 | the words are copy/en.json unchanged, which passed station 4c (0 unsourced, 0 contradicted, voice audit passed). The template contributes interface labels only. |
| 6 | accessibility | 10 | 13 images, 0 missing alt (0 deliberately empty because decorative); 20 tap targets, 0 under 44 px; lang="en"; skip link first in document order. Drawer opens, Esc closes it and focus returns to the trigger, verified at 390 px and 1440 px. Under prefers-reduced-motion 1 of 1 canvases stay hidden and the photograph shows. |
| 7 | security + delivery baseline | 10 | first load contacted 1 host(s) (localhost:8987), of which 0 third party. Static output, no server code, no runtime call to the CMS, fonts and platform marks vendored, relative URLs, lowercase filenames. The Rosa forecast iframe is the one third-party embed and carries loading="lazy", so it never appears on first load; it is declared as a conflict in notes.md. |

**For the human.** The pool pinned for three screens, walking from afternoon to after dark under a hand-written water surface. The most photographic of the three, and the fastest to first paint.

**What would make it fail.** The water has to read as the subject, not as an effect laid over a hotel page.

## unique — “The courtyard” · 86/100

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts match dossier | 10 | 25 numbers rendered; 11 are not literally in copy/en.json (01, 02, 03, 04, 05, 06, 07, 08, 09, 19, 2026), each accounted for as a list index, the harvest date in the legal line. 0 unexplained. copy/en.json passed 4c with 0 unsourced and 0 contradicted claims; copy/sources.md maps every paragraph to its dossier fields. |
| 2 | mobile + performance | 4 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 850 KB of 1536 KB (55%); JS 18 KB of 300 KB (6%); fonts 119 KB of 150 KB (79%); largest image 153 KB of 200 KB (76%); LCP 1780 ms of 2500 ms (71%); CLS 0.0015 of 0.1 (1%). Worst line 79% of budget, mean 48%. Every line inside budget. Measured values, not a Lighthouse score: there is no Lighthouse runner in tools/. |
| 3 | booking CTA end to end | 10 | 2 booking links and tel:+94764832988 diffed character for character against dossier.booking and dossier.contact: identical. Primary action above the fold at 390 px; first tap resolves to #book. With JavaScript off, 4 booking links stay reachable in the footer block, and all 3 drawer triggers are plain links to it. |
| 4 | brand fit vs playbook | 9 | playbook §3 order present; the first screen carries what/where, a booking action and a proof point. The variant matches its brief in custom.md and the concept it was built from in concepts.md. No price anywhere, by design: this business publishes none. |
| 5 | copy quality | 9 | the words are copy/en.json unchanged, which passed station 4c (0 unsourced, 0 contradicted, voice audit passed). The template contributes interface labels only. |
| 6 | accessibility | 10 | 12 images, 0 missing alt (1 deliberately empty because decorative); 21 tap targets, 0 under 44 px; lang="en"; skip link first in document order. Drawer opens, Esc closes it and focus returns to the trigger, verified at 390 px and 1440 px. Under prefers-reduced-motion 1 of 1 canvases stay hidden and the photograph shows. |
| 7 | security + delivery baseline | 10 | first load contacted 1 host(s) (localhost:8988), of which 0 third party. Static output, no server code, no runtime call to the CMS, fonts and platform marks vendored, relative URLs, lowercase filenames. The Rosa forecast iframe is the one third-party embed and carries loading="lazy", so it never appears on first load; it is declared as a conflict in notes.md. |

**For the human.** The water is fixed at the foot of every screen for the whole page and the heading you are reading is projected on it. The boldest, and the only one whose first screen is type rather than a photograph.

**What would make it fail.** The fixed band takes 24svh of every screen and the page scrolls in its own container, so on iOS the URL bar never collapses. It is also the heaviest page in the run.

## What the designer prompt got wrong

Nothing in this round that the prompt caused. The faults of the previous rounds were structural and are now
answered on disk rather than in conversation: the page archetype is decided at station 4d before any markup
exists (`agents/creative-director/base.md`); a photograph under 1200 px can no longer be used full-bleed,
because `tools/build-mockup.mjs` refuses it; and the three house rules that had to be repeated — light themes,
no padded picture boxes, no captions under photographs — are measured by `tools/check-design.mjs`, which all
nine mockups pass.

What is still missing is not the designer’s: **there is no Lighthouse runner in `tools/`**. The performance
figures above are measured in Chromium over CDP with the network and CPU throttled to playbook §4's
assumptions, which yields the two numbers the budget actually names (LCP and CLS) but not a Lighthouse score.
Dimension 2 is scored on those measured values and is labelled as such.

## Next

**Human gate.** Pick one variant, with a reason. The reason is what the learning loop consumes (PLAN.md §7),
so “the board, because it looks like the hostel” is worth more than “the second one”.
