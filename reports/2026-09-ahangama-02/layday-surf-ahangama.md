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
| 2 | mobile + performance | 8 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 199 KB of 1536 KB (12%); JS 0 KB of 300 KB (0%); fonts 78 KB of 150 KB (51%); largest image 38 KB of 200 KB (18%); LCP 1128 ms of 2500 ms (45%); CLS 0.0193 of 0.1 (19%). Worst line 51% of budget, mean 24%. Every line inside budget. Measured values, not a Lighthouse score: there is no Lighthouse runner in tools/. |
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
| 2 | mobile + performance | 8 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 468 KB of 1536 KB (30%); JS 5 KB of 300 KB (1%); fonts 78 KB of 150 KB (51%); largest image 45 KB of 200 KB (22%); LCP 356 ms of 2500 ms (14%); CLS 0.0017 of 0.1 (1%). Worst line 51% of budget, mean 20%. Every line inside budget. Measured values, not a Lighthouse score: there is no Lighthouse runner in tools/. |
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
| 2 | mobile + performance | 8 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 287 KB of 1536 KB (18%); JS 5 KB of 300 KB (1%); fonts 78 KB of 150 KB (51%); largest image 40 KB of 200 KB (19%); LCP 1152 ms of 2500 ms (46%); CLS 0.0226 of 0.1 (22%). Worst line 51% of budget, mean 26%. Every line inside budget. Measured values, not a Lighthouse score: there is no Lighthouse runner in tools/. |
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

What is still missing is not the designer’s: **there is no Lighthouse runner in `tools/`**. The performance
figures above are measured in Chromium over CDP with the network and CPU throttled to playbook §4's
assumptions, which yields the two numbers the budget actually names (LCP and CLS) but not a Lighthouse score.
Dimension 2 is scored on those measured values and is labelled as such.

## Next

**Human gate.** Pick one variant, with a reason. The reason is what the learning loop consumes (PLAN.md §7),
so “the board, because it looks like the hostel” is worth more than “the second one”.
