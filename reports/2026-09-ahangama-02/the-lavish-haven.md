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
| 2 | mobile + performance | 5 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 784 KB of 1536 KB (51%); JS 0 KB of 300 KB (0%); fonts 68 KB of 150 KB (45%); largest image 139 KB of 200 KB (69%); LCP 1812 ms of 2500 ms (72%); CLS 0.0014 of 0.1 (1%). Worst line 72% of budget, mean 39%. Every line inside budget. |
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
| 2 | mobile + performance | 5 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 406 KB of 1536 KB (26%); JS 6 KB of 300 KB (2%); fonts 110 KB of 150 KB (73%); largest image 159 KB of 200 KB (79%); LCP 356 ms of 2500 ms (14%); CLS 0.0005 of 0.1 (0%). Worst line 79% of budget, mean 32%. Every line inside budget. |
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
| 2 | mobile + performance | 4 | measured on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), no scroll — first-load transfer 850 KB of 1536 KB (55%); JS 18 KB of 300 KB (6%); fonts 119 KB of 150 KB (79%); largest image 153 KB of 200 KB (76%); LCP 1780 ms of 2500 ms (71%); CLS 0.0015 of 0.1 (1%). Worst line 79% of budget, mean 48%. Every line inside budget. |
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

The performance figures above are measured in Chromium over CDP with the network and CPU throttled to
playbook §4's assumptions, by `tools/audit-mockup.mjs`; the raw numbers are in each mockup's `audit.json`.

## Next

**Human gate.** Pick one variant, with a reason. The reason is what the learning loop consumes (PLAN.md §7),
so “the board, because it looks like the hostel” is worth more than “the second one”.

# Full round 1 (station 5, 4g gold-page build after 4h + 4i, 2026-09-23)

critic 0.3.2 · station 5 · run `2026-09-ahangama-02` · playbook 0.5.1, rubric 0.1.0. What I reviewed: `sites/the-lavish-haven/final/`, rebuilt by me with `npm run build` at commit `c9fb58c`. The build was clean and gave the same `dist/` as on disk: `index.html` 58 239 B, md5 `b1cc5c79…`, no `SITE_URL`, so this is the preview build and `noindex` is expected. I read it against `dossier/the-lavish-haven/dossier.json`, `copy/en.json` (passed 4c round 4), `seo-report.md`, `aiseo-report.md`, `final/notes.md`, and Shahar's pick, the gold page `agents/designer/gold/the-lavish-haven.html` with its notes. Test setup: every test ran on a plain `python3 -m http.server` over `dist/` (port 8760), with the gold page on 8761. Browser: headless Chromium with software GL, Playwright from the repo's `node_modules`. `audit-mockup.mjs` and `check-design.mjs` ran from scratch copies (ports 8762/8763). They wrote their `audit.json` under `scratchpad/lavish-critic/`, not over `final/audit.json`. No real phone was used.

```
mode: full        round: 1        variant: the gold page (Shahar's pick)
total: 70 / 100           result: fail        hard_fails: [HF-1 alt text of img-073 says "textured stone wall"; the photograph shows a trowelled grey plaster/render wall, and no dossier entry says stone]
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 3 | My facts table is below: 58 rows cover the page (JS on and off), `llms.txt`, the JSON-LD, the meta tags, the 10 alt texts and every interface string that asserts something. **57 match and 1 does not.** HF-1: `alt` of img-073 (gallery strip, 2nd photo) reads "Wooden chairs on a balcony with a textured stone wall, the pool below". The photograph (`shots/critic-1/alt-img-073-wall.png`, top-left 560×500 of the 1024×768 source, enlarged ×2) shows a smooth trowelled render. It has trowel marks and mottled grey-green patches, one continuous surface with no joints and no individual stones. It is the same finish the designer called "plaster walls" in img-007's alt. The dossier's image entry says only "Booking.com listing photo". So the material is a claim with no source, and the photograph contradicts it. Nothing else fails. The 5 testimonials match the dossier's `reviews.quotes[0,4,3,6,7]` **by string equality**, and the authors match too. The other 9 alt texts match their photographs (checked one by one against the sources, sheets in scratch). All 22 hrefs match the dossier character for character. The address follows playbook §6: Google's words, place names capitalised, postcode, street / town postcode / country. The two headline ratings carry their capture date. |
| 2 | mobile + performance | 8 | `audit-mockup.mjs`, 3 runs (390×844 @2, 1.6 Mbps, 150 ms RTT, 4× CPU, no scroll): **586 505 B / 12 requests, all local; LCP 408 / 400 / 408 ms; CLS 0 / 0 / 0**. JS as files 0 B (inline only). 1 font family, 26 576 B. Largest image 122 396 B (the first screen is drawn and has no photo). Budget table below: every line holds. `scrollWidth − innerWidth` = **0 at 390, 768, 1024, 1440, 1525 and 1920**, at every scroll step (6 widths × 12–15 steps). **0 console errors** at all six widths with the live forecast. One deduction, −2. On the static path (JS off, `prefers-reduced-motion`, or no WebGL) at 390, the hero's SVG `.rim` is still drawn with the **desktop** outline points (`55,33 100,27 …`) while the pool uses the mobile clip. So a 4 px dark line strikes through the rating lines ("34 reviews", "read 19 September 2026", "21 reviews", "read 19 September 2026") and past the header's "Check dates" (`static-hero-390-gold-vs-build.png`, `jsoff-390-00.png`). The gold page has the same bug. The port made it worse: the capture-date lines lengthen the proof block from 74 to 122 px, so the line now crosses 4 text lines where it crossed 2. |
| 3 | booking CTA | 9 | At 390 with touch, external navigation blocked and logged: tapping the bar's "Check dates" (144.8 × 48) opens the drawer (`open` true, focus on the dialog). Tapping the Booking.com row there makes **one document navigation to `https://www.booking.com/hotel/lk/the-lavish-haven.html`**. **With JS off**, the same tap navigates straight to that URL. Tapping room row 2 opens the drawer with "You were looking at the Superior King Room." The drawer offers Booking.com (with its rating and date), Agoda, and "Or call" `tel:+94764832988`. Every href is identical to `booking.engine_url`, `booking.other_engines[0]`, `contact.phone` and `location.map_url`: 13 × Booking.com, 2 × Agoda, 2 × tel, 1 × Maps. Deduction (unchanged from 4f): no prefilled message is possible (no WhatsApp in the dossier, and OTAs take none), and no reply time sits beside the action (`reply_time_hint` is a gap). |
| 4 | brand fit | 7 | **The look is the gold page's.** Build vs gold, capture for capture, at 1440 and 390 (`compare-gold-d00…d12.png`, `compare-gold-m00…m12.png`), plus my own passes at 768, 1024, 1525 and 1920 (`w768-sheet.png`, `w1024-sheet.png`, `w1525-sheet.png`, `w1920-sheet.png`). Layout, type, colour, the cut-corner shape, the water, noon to night, the night print, the strip, the wave panel, the closing frame and the footer all match the gold. The differences I saw are the ones `notes.md` names, and they come from copy and dates, not layout (judged below). Page height is 10 273 px (gold 10 531) at 1440 and 11 389 px (gold 11 323) at 390. Playbook §3: the first screen carries what and where, "Check dates", and two ratings with count, source and date. Deductions. (a) **Section order.** The wave and practicalities sit after the reviews and the amenities, and location appears only in the footer, against §3 items 4 and 7 (the gold's order). (b) **Undated ratings in the copy** (§6: "Rating shown with count, source and capture date"). "Guests score the location 9.6 out of 10 on Booking.com", "…9.7 out of 10 for cleanliness and the same for comfort, and 9.4 for staff, across 34 reviews" and "On Google it has 5.0 out of 5 from 21 reviews" appear in the body and in `llms.txt` with no date. Only the hero, the drawer and llms' "Ratings" list carry "read 19 September 2026". (c) The first screen names Kabalana but not Ahangama. The town appears only in `<title>` and in the footer. |
| 5 | copy quality | 8 | The page text is `copy/en.json` verbatim: 6 blocks, spot, closing, 9 rooms, 25 amenities, 2 ratings, 5 quotes, contact, 2 links, and no words from the gold page remain. Template strings are interface labels only (list below). Deductions. (a) **The night line repeats.** "The outdoor pool is in the middle of the hotel and open all year." is set large over the water and then appears again as the first sentence of "Pool, restaurant, spa", five screens later (judged below). (b) The copyeditor's tolerated repeats (24-hour desk ×4, rates by date ×3 including the drawer, Mya and Roie told twice) are visible on the page as the review predicted. |
| 6 | accessibility | 9 | axe-core 4.11.1, run from a local copy with nothing installed, WCAG 2.0/2.1 A+AA, after a full scroll: **0 violations** at 390 and 1440, with and without reduced motion (25–26 passing rule sets). Incomplete: `color-contrast` 11 / 12, text over the drawn hero and one pseudo-element. I checked those by hand: small grey text `rgb(85,97,111)` on `rgb(245,248,250)` = 5.92:1, ink on the wave blue = 7.88:1. **Tap targets at 390, measured on every scroll step and with the drawer open: 18 page targets + 5 drawer targets, 0 under 44 px on either side** (smallest: footer links 123 × 44, "Close" 50 × 48; the Rosa credit link 191 × 48 when live). Keyboard at 1440 and 390: Skip link → name → Check dates → 9 room rows → strip (`tabindex=0`) → Rosa link → closing Check dates → map → phone → Booking.com → Agoda. Every stop has a visible outline, and "Check dates" has a 2 px inset ring (`focus-bar-book-1440.png`). Drawer: Enter opens it; 9 Tabs and 4 Shift+Tabs stay inside (Close → Booking.com → Agoda → phone); Esc closes it and focus returns to "Check dates". Reduced motion: the class `motion` is off, no WebGL context is made, the pool shows its CSS gradient and the night print is visible. No-WebGL (`getContext` stubbed): static layout, **0 page errors**. One heading h1 (the name), with h2/h3 in order. Deduction: **7 amenity rows have no space in the text layer.** `<li>Outdoor swimming pool<span>open all year</span>` gives an accessible name of "Outdoor swimming poolopen all year". The same happens in "Free private parkingreservation needed" and the five "…additional charge" rows. It is spaced visually by CSS only, and the gold markup is the same. |
| 7 | security + delivery | 9 | Static output only: no runtime CMS call, no `<script src>` from any origin, no secrets. Grep for localhost, 127.0.0.1, api key, secret, password and payload finds 0; the one "token" is a CSS comment. Paths are relative, and photo filenames are lowercase (0 with capitals). The font is self-hosted under OFL. The preview rule holds: `<meta name="robots" content="noindex, nofollow">`; `robots.txt` has `Disallow: /` for `*` and repeats it for 15 named AI crawlers; there is no `sitemap.xml`; `llms.txt` carries the preview line. **Third-party embeds: 1** (Rosa's iframe, which carries `data-src` and no `src`). There is no map embed. **0 third-party requests on first load in all 16 instrumented runs** (load + 3 s, no scroll). After the scroll, the JSON request comes first, then `rosa.surf/widget/?spot=kabalana&theme=light&units=metric`, and Rosa's own fonts and tiles load inside its frame. Deduction, −1: **when the widget request fails but the JSON succeeds** (rosa.surf blocked, JSON served fresh), the block goes `fc live`, the frame gets its `src`, the plain link is hidden, and the 420 × 500 box stays **empty**. There is no widget and no "See today's forecast…" link (`forecast-widget-blocked-1440|390.png`, `forecast-states.png` top right). Playbook §4 asks for a plain-link fallback "when the request fails… never an empty box". The designer's 15-run state matrix stubbed the widget, so this path was never exercised. |

`total = 3×2.5 + 8×2 + 9×1.5 + 7 + 8 + 9 + 9 = 70`. A full-mode pass needs no hard fail, a total of at least 80, every dimension at 6 or above, and every §4 budget line met. **This round fails.** It has a hard fail, the total is 70, and dimension 1 scores 3. Every budget line is met. With HF-1 fixed and nothing else changed, dimension 1 would score 9 and the total would be **85**.

## Hard fails, and where each goes back

| # | fail | return station | smallest fix |
|---|---|---|---|
| HF-1 | img-073's alt asserts a **stone** wall. The photo shows a plastered/rendered wall, and no source says stone | **4g (designer)**: the alt lives in `scripts/seed-from-dossier.mjs`'s photo table → `media.alt` | Change it to describe what is visible, e.g. "Wooden chairs and a low table on a balcony with a textured grey wall, the pool below". Re-seed, rebuild. No copy station is involved, because alt texts are not in `copy/en.json` |

No other hard fail: no fact contradicts the dossier, the CTA lands in the right engine, there are no third-party requests on first load, no keyboard trap, no content that exists only in canvas, no budget line over, and no secrets.

## Fix list (fail only), smallest first, with routes

1. **HF-1 alt text img-073** (dimension 1): 4g, one string.
2. **Amenity rows: add a space before the note `<span>`** (dimension 6): 4g, template. This was inherited from the gold page.
3. **Static-path rim at ≤ 760 px** (dimension 2). Give `svg.rim`'s static points the mobile outline (`24,60 100,54 100,100 36,100 4,82`, the same one the pool's clip uses) or hide the rim when `motion` is off. 4g, template. This was inherited from the gold page and made worse by the date lines. It is visible under JS off, reduced motion and no WebGL.
4. **Rosa widget failure path** (dimension 7). If the frame does not load, or does not load within the same timeout the JSON has, go to the link: `fc off`, `src` removed. 4g, script. The loader is "the same mechanics as the KA and Layday builds", so the same path is probably open there. **That is not verified here.**
5. Not a fail item. **Dates on the ratings inside the copy** (dimension 4, playbook §6): the location 9.6, the category 9.7/9.7/9.4 and Google's 5.0/21 in `intro` and `about[0]`. The route is **4a copywriter → 4b → 4c**, or a Shahar ruling that §6 covers only the headline ratings. I did not decide it.
6. Not a fail item. **The night line binding** needs a Shahar decision on the schema (below).

## The night line, judged

The gold page's night line had its own sentence. The build binds it to `sentences(paras(offer[1].body)[0])[0]` (`index.astro` line 28), so it reads "The outdoor pool is in the middle of the hotel and open all year."

- **Fact: it holds.** "outdoor pool… open all year" is `facilities[0]` "year-round outdoor swimming pool". "In the middle of the hotel" is António's verbatim "the swimming pool at the center" (`reviews.quotes[3]`), a guest's observation of a physical fact, and the photographs agree (img-079, img-002). It sits over the night photograph of that pool, which it describes.
- **As copy: it repeats.** The same sentence appears word for word five screens later, as the first words of "Pool, restaurant, spa". The gold's line repeated only in spirit ("where people end up"), not word for word.
- **As a contract: it is fragile and invisible to the owner.** The schema says every value belongs to one field and every field has a place (`site-content.md`). Here, a sentence in one field is silently also the hero's headline. If the owner reorders the two offer blocks, or rewrites that paragraph so it opens with, say, "Breakfast is from 7:00", the words over the night pool change to that sentence, and nothing in Payload tells them. The splitter (`/(?<=[.!?])\s+(?=[A-Z0-9'“"])/`) also cuts on any full stop followed by a capital or a digit.
- **Verdict:** acceptable for this round, because it is true and it reads well. It is not a fail. It should not ship to an owner as it is. Shahar decides between two options. (a) An optional localized `nightLine` field (≤ 140), the same way `closing` was added in schema v0.5, seeded with this sentence, with the pool block keeping its own opening. (b) Accept the binding and have the deployer's owner sheet say so. The designer already flagged it in `notes.md` conflicts 1. I did not choose.

## Deviations from the gold page (`notes.md` 1–9), judged

1. **Text lengths.** Accepted. The passed copy is shorter in "where" and "new", and the layout holds at all six widths with no overflow. The night line wraps into three shorter lines than the gold's (a balanced wrap, same measure, `compare-gold-d00.png` row 3). That is a copy-length effect, not a change of layout.
2. **The wave's walk line** is `fit-content`, 34em max, one line at 1024/1440/1525. Accepted. It sits under the big line, right-aligned, as in the gold (`w1525-sheet`, `compare-gold-d09`).
3. **Capture dates** add +15 px per rating. Accepted, and required by §6. They are the cause of the static-rim collision (fix item 3).
4. **The forecast's reserved box** is 340 × 262 (desktop) / 302 × 252 (390), with the widget at 420 × 500 / 302 × 500. **Measured identical in all 16 runs** (8 modes × 2 widths: live, slow success, JSON abort, slow 404, 3 s hang, stale 30 h, widget blocked, everything blocked). The headline box, the widget box and the next heading (`#h-prac`) keep the same page coordinates, and **CLS is 0 in all 16** (programmatic scroll, `PerformanceObserver`, nothing excluded by input). On failure there is an empty 340 px area left of the link, which is accepted (Layday's behaviour). The widget-failure path is not accepted (dimension 7).
5. **Reduced motion creates no WebGL context.** Accepted, and a real fix of the gold's black pool. The rim bug on the same path was missed (fix item 3).
6. **Context-loss recovery.** Not reproduced. 0 console or page errors in 6 widths × live runs plus 6 static runs.
7. **Tap targets at ≤ 760 px.** Confirmed: 0 under 44 on either side.
8. **`<picture>` with `display:contents`.** Photo boxes are in the gold's positions in every compare. Crops match (strip 4:5, aerial and balcony 4:3).
9. **Skip link and strip label.** Present and correct. The skip link goes to `main#top`, which has `tabindex=-1`.

Not in `notes.md`, and seen in the compares: the footer heading "Front desk, staffed 24 hours" is now "Phone", and the gold's "Ahangama, Sri Lanka" is now the full Google address. Both are correct changes, and the notes list the first under strings.

## Budget table (playbook §4; my `audit-mockup.mjs` runs 2026-09-23T10:19Z: 390×844 @2, 1.6 Mbps, 150 ms RTT, 4× CPU, no scroll)

| Item | Target | Measured (first load) | With the embed loaded |
|---|---|---|---|
| First-load transfer | ≤ 1.5 MB | **586 505 B, 12 requests**, host `localhost:8762` only | unchanged. Nothing from Rosa loads before the wave panel is 400 px from the viewport |
| JS, compressed | ≤ 300 KB | 0 B as files; inline script inside the 58 239 B HTML (4g notes: 15 587 B raw / 6 733 B gzip) | Rosa's scripts run in Rosa's frame |
| Largest above-the-fold image | ≤ 200 KB | none (the first screen is drawn); largest image fetched on first load 122 396 B | unchanged |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family (Jost), 26 576 B, self-hosted | Rosa's Inter loads inside Rosa's frame |
| LCP | ≤ 2.5 s | **408 / 400 / 408 ms** | first-load metric |
| CLS | < 0.1 | **0 / 0 / 0** | **0** over a full programmatic scroll in all 16 forecast runs |
| Third-party requests on load | 0 | **0** | **0** in all 16 runs |

A fact for the human, not a budget line: unthrottled at 390 @1, the page frame had fetched 184 875 B by 2 s and 289 284 B after a full scroll. The Rosa requests visible from the page target added about 90 KB: JSON 9 758 B, widget document 9 964 B, fonts 50 KB, tiles 20 KB. Requests inside Rosa's out-of-process frame are not all counted, so that last figure is a floor.

## Rosa forecast (hard constraint 9) and embeds (playbook §4)

- **Spot:** `data-json …/data/spots/kabalana.json`, widget `spot=kabalana`, credit "Forecast for Kabalana by Rosa" → `https://rosa.surf/spot/kabalana`, fallback "See today's forecast for Kabalana on Rosa". The dossier's `location.spot` is "Kabalana beach break". `concepts.md` names "the live Kabalana forecast" (line 62) but records no explicit spot-id mapping line. The id is the spot's own name, so this is a note, not a defect.
- **Site's half:** headline only, live at test time: "0.4–0.6 m / Wednesday 23 September, 14:30 / Swell 11.1 s from the south / Wind 17.9 km/h from the west, cross-shore / Forecast for Kabalana by Rosa / Updated 23 September, 13:56". No day boxes and no chart.
- **Widget:** `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`, 420 × 500 (1440) / 302 × 500 (390), `border-radius:16px`, `sandbox` and `referrerpolicy` as `agents/designer/tools.md` gives them. Not restyled, cropped or covered (`forecast-live-1440.png`).
- **Paths:** JSON abort, slow 404, 3 s hang and stale (30 h) all end `fc off` with the link visible, `src` null and the headline box kept but hidden. JS off gives the link (`jsoff-1440-wave.png`). **The widget-blocked path shows an empty box** (dimension 7, fix item 4).
- **Embed count:** 1, within the "at most two" rule.

## Facts table (mine, sentence by sentence: rendered page JS on and off, drawer, `llms.txt`, JSON-LD, meta, alts, interface strings → dossier)

| On the page | Dossier key | Verdict |
|---|---|---|
| "The Lavish Haven" (h1, title, og, JSON-LD `name`, llms) | `business.name` (Booking.com; Google's is "…Hotel And Resort", seo "Still wrong" 1) | match |
| "A new hotel, two minutes from Kabalana" (hero, meta, og, llms) | `business.type` "Hotel"; `since` gap note ("guests repeatedly call it 'brand new'"); `location.distance_to_beach` "Kabalana Beach is a 2-minute walk" | match. "two minutes" is qualified "on foot" in the wave section |
| "9.2 of 10 on Booking.com, 34 reviews" · "5.0 of 5 on Google, 21 reviews" (hero, drawer "9.2 of 10 from 34 reviews", llms) | `reviews.booking` 9.2/10/34, `reviews.google` 5.0/21 | match ×2 |
| "read 19 September 2026" (×2 hero, ×1 drawer, ×2 llms) | `reviews.booking.fetched_at` = `reviews.google.fetched_at` = 2026-09-19T18:55:00Z | match |
| night line "The outdoor pool is in the middle of the hotel and open all year." (×2) | `facilities[0]`; `reviews.quotes[3]` "the swimming pool at the center" (verbatim guest observation) | match |
| "Among cafés and restaurants" / "Cafés and restaurants surround the hotel, | `location.setting` "surrounded by cafes and restaurants" (from guest reviews) | match |
| …and there is a fruit stand nearby." | `reviews.quotes[5]` Aleksandra "There are many cafes and a fruit stand nearby" | match |
| "Guests score the location 9.6 out of 10 on Booking.com." | `reviews.booking.categories.Location` 9.6 | match (undated, dimension 4) |
| "Koggala Airport is about 5 km away." | `business.description` "Koggala Airport is 3.1 mi away" (= 4.99 km) | match |
| "Nine kinds of room" | `room_types[]` × 9 (`contradictions[1]`: no room count published, and none is) | match |
| "There are king rooms with a balcony or a garden view, superior kings, and a deluxe king on the ground floor with a private patio and a pool view." | `room_types[0–3]` | match |
| "Family studios and suites sleep four, and the two-bedroom suite sleeps five." | `room_types[4–8]` | match |
| "Each room has a work desk, soundproofing and free WiFi." | `business.description` | match |
| "The family rooms have air conditioning and private bathrooms." | `business.description` "family rooms with air-conditioning, balconies and private bathrooms" | match |
| "There is no published price list. Rates go by date, and the booking links show what is available." | `gaps[offers]`; `booking.path.note` "live inventory" | match |
| 9 room rows: labels, beds, "ground floor", "sleeps 4" ×4, "sleeps 5" (page, JSON-LD `containsPlace`, llms) | `room_types[0–8]` | match ×9 |
| "New, and it shows" / "The hotel is new." | `since` gap note; quotes[2] Diane "a new facility and is clean and well maintained", quotes[5] "The hotel is new" | match |
| "On Booking.com one guest calls it "brand new", another "a new facility"." | quotes[4] Dariusz "brand new hotel", quotes[2] Diane "a new facility" | match |
| "Booking.com guests score it 9.7 out of 10 for cleanliness and the same for comfort, and 9.4 for staff, across 34 reviews." | `reviews.booking.categories` Cleanliness 9.7, Comfort 9.7, Staff 9.4; count 34 | match (undated) |
| "On Google it has 5.0 out of 5 from 21 reviews." | `reviews.google` | match (undated in this sentence) |
| "Staying longer" / "One guest wrote that they moved around many hotels before finding this one, then stayed over a month." | quotes[0] Mya | match |
| "Another extended their stay rather than go on to a different hotel." | quotes[6] Roie | match |
| 5 quotes + "<author>, on Booking.com" (page, llms) | `reviews.quotes[0,4,3,6,7]`, all `source_url` booking.com | **match 5/5 by string equality**; the one marked `lang="de"` is German; the operator-named quote (quotes[1]) is correctly not used |
| "Pool, restaurant, spa" / "The restaurant serves breakfast with local specialities and fresh pastries, plus Chinese, Indian and Italian dishes." | `facilities[1]`; `business.description` | match |
| "There's a coffee house on site too, and a spa and wellness centre." | `facilities[2,3]` | match |
| "For families there are the family rooms and an outdoor play area." | `facilities[5,17]`; description "outdoor play area" | match |
| "Kids' meals and babysitting cost extra." | `facilities[18,19]` (additional charge) | match |
| 25 amenity rows with 7 notes (page, JSON-LD `amenityFeature`, llms) | `facilities[0–24]` (CCTV row 25 omitted) | match ×25 |
| "Kabalana: a sandy beach break for beginners and intermediates, with The Rock reef A-frame for advanced surfers." | `location.spot` (thesurfatlas.com, third-party wave knowledge) | match |
| "The beach is two minutes from the hotel, on foot." | `location.distance_to_beach` | match |
| "The front desk is staffed 24 hours, with private and express check-in." | `hours_note`; `facilities[8,9]` | match |
| "Parking is free and private, but you need to reserve it." | `facilities[10]`; `contradictions[2]` (no promise of easy parking) | match |
| "There's an airport shuttle as well." | `facilities[6]` | match |
| "Housekeeping is daily. There is laundry, dry cleaning and ironing, bicycles to rent, non-smoking rooms, and facilities for guests with disabilities." | `facilities[21,22,20,12,11]` | match |
| llms "Check-in and check-out: The front desk is staffed 24 hours, with private and express check-in and check-out." | `hours_note` "private and express check-in/out" | match (no times, gap respected) |
| closing h2 + drawer "Rates move with the dates. Booking.com and Agoda show what is available." | `booking.path.note` "live inventory on Booking.com and Agoda"; `gaps[offers]` | match |
| "No166/1 Walhengoda Road, Ahangama 80650, Sri Lanka" (footer, llms ×2, JSON-LD `PostalAddress` parts) | `location.address` (Google listing, fetched 2026-09-23) "No166/1 walhengoda road, Ahangama 80650, Sri Lanka" | match: §6 capitalisation only, order street / town postcode / country, postcode present. `contradictions[3]` (166/2) is an owner question |
| "+94 76 483 2988" / `tel:+94764832988` ×2 / JSON-LD `telephone` | `contact.phone` (Google) | match |
| "Open in Google Maps" / JSON-LD `hasMap` / llms Map | `location.map_url` | match, character-identical |
| JSON-LD `geo` 5.97946, 80.35083 | `location.lat_lng` 5.9794565, 80.3508299 (rounded; plus code X9H2+Q8 per 4h) | match |
| JSON-LD `@type` Hotel; `addressCountry` LK; `sameAs` Booking.com, Agoda | `business.type.note` "Hotel"; `booking.engine_url`, `other_engines[0]` | match |
| "Check dates on Booking.com" / "Check dates on Agoda" / "Check dates" ×13 | `booking.engine_url`, `other_engines[0]` | match; both land on the listing, which is where dates are chosen |
| meta/og description "A new hotel, two minutes from Kabalana. Cafés and restaurants surround the hotel, and there is a fruit stand nearby. Nine kinds of room." · title "The Lavish Haven, Ahangama" | as the rows above; town from `location.address` | match |
| alt img-002 "The pool at night, lit from below, with two storeys of lit rooms and balconies behind it" | the photograph: underwater lamps lit, two storeys with balconies | match |
| alt img-079 "The pool and the stone-paved garden seen from above, with palms behind the tiled roofs" | the photograph: crazy-paving stone, elevated view, palms, terracotta roofs | match |
| alt img-069 "A covered balcony with wooden chairs and a low table, looking down through the railing to the pool" | the photograph | match |
| alt img-007 "A bedroom with a wooden staircase up to a loft, warm light on plaster walls" | the photograph | match |
| **alt img-073 "Wooden chairs on a balcony with a textured stone wall, the pool below"** | the photograph: trowelled render, not stone; the dossier has no material | **mismatch: HF-1** |
| alt img-021 "A bed under a pitched white ceiling, grey-green curtains either side of a glass door" | the photograph | match |
| alt img-028 "Two beds under a timber ceiling, a wooden chair at a desk, a glass door at the far end" | the photograph | match |
| alt img-071 "A balcony with wooden chairs under a white timber roof, looking into palms" | the photograph | match |
| alt img-017 "A made bed with folded towels, a tall window on one side and a painting of a wave on the wall" | the photograph | match |
| alt img-008 "A loft bedroom behind a timber balustrade, with purple curtains" | the photograph | match |
| "Photographs of the hotel" (strip group label) | all 10 `license: business-owned`, `check-places.mjs` 0 borrowed; media = dossier assets re-encoded q95 (pixel diff ≤ 22/255, same 1024×768) | match |
| interface strings that assert something: "Scroll, and it gets dark" | JS on: noon→night on scroll. Static 1440: the cue is shown and a night-blue band follows. Hidden at 390 static | true on every path where it shows |
| "You were looking at the <room>." | the row tapped (tested: Superior King Room) | true |
| "Or call" + number; "Where" / "Phone" / "Book" / "Close" / "Skip to content" | — | assert nothing checkable, or true |
| forecast headline and "Updated …" | live Rosa data, never content (schema v0.3) | hard constraint 9, above |
| llms "Preview build, not the published site…"; robots comments | build state | true (no `SITE_URL`) |
| absent, as required: prices, check-in times, season, WhatsApp, email, room count, languages, `aggregateRating` | `gaps[]`, `contradictions[1]`, Shahar's no-ratings-markup decision | absent |

**Totals: 58 rows; 57 match, 1 mismatch (HF-1), 0 claims with no source.**

## Default-look facts and image checks (hard constraint 4)

`check-design.mjs … --no-shots` (scratch copy, port 8763): `ok`, **0 problems, 0 warnings**. Look: fonts h1 / h2 / body all "Jost"; ground `rgb(245,248,250)` = `hsl(204 33% 97%)`; all-caps labels 0; labelled headings 0/12. `check-places.mjs the-lavish-haven`: 0 borrowed image uses. No captions. No photograph is tied to a room type.

## Evidence

`final/shots/critic-1/`: `shoot.mjs` desktop 13 captures / 10 273 px and mobile 15 / 11 389 px, `errors []` (`desktop-*.png`, `mobile-*.png`, `desktop-sheet.png`, `mobile-sheet.png`, `shoot.json`). Per-width captures `w390|768|1024|1440|1525|1920-NN.png` with `w390|768|1024|1525|1920-sheet.png`. Gold vs build `compare-gold-d00|03|06|09|12.png`, `compare-gold-m00|04|08|12.png` (the gold shot fresh by me, in scratch). `static-hero-390-gold-vs-build.png`, `jsoff|reduced|nowebgl-390|1440-00|night|wave.png`, `drawer-390.png`, `drawer-room-390.png`, `drawer-1440.png`, `focus-bar-book-1440.png`, `forecast-<mode>-390|1440.png` (8 modes), `forecast-states.png`, `alt-img-073-wall.png`. My three `audit.json` runs, the harness scripts, the axe runs and the gold shoot are in `scratchpad/lavish-critic/`. `final/audit.json` was not rewritten, so it is still 4h's.

what the designer prompt got wrong: the port itself is good. Nine documented deviations were all measured, and the look survives at six widths. What went wrong is what the build's own checks could not see, in three places, and each is the same failure: **a check that measures the wrong thing passes**. (1) **Alt texts.** `notes.md` says the ten alts were "rewritten from looking at each photograph", and the designer did remove five unsupported words ("king bed", "family room", "at midday"…). Then one material noun ("stone") went in that the photograph does not show, and the build's facts table lists the alts as a block rather than one row per image. `agents/designer/base.md` should require one facts-table row per alt text, with the photograph beside it, and should say that material, time-of-day and room-type words are claims like any other. (2) **Static-path look.** The designer checked JS off, reduced motion and no WebGL at 390 by counting: "0 overflow, 0 errors, night print visible". Nobody looked at the first screen, so the gold's rim line through the ratings survived, and the new date lines made it cross twice as much text. The prompt should require a **picture** of the first screen on each static path, beside the motion path's, not only counters. (3) **Embed failure matrix.** The 15-run forecast matrix varied only the JSON and **stubbed the widget**, so "the JSON succeeds and the frame fails" never ran, and it leaves an empty 420 × 500 box. The playbook §4 fallback rule should be tested per request, not per block: the designer's and the critic's `tools.md` should list the widget's own failure as a required state. KA and Layday share this loader, so the same gap probably exists there (**not verified**). Minor and inherited from the gold: amenity notes are joined to their labels in the text layer. A prompt line should say "every visual separation between two phrases is also a space or punctuation in the markup".

fix list (fail only): 1) HF-1 alt of img-073 → 4g; 2) space before the amenity note spans → 4g; 3) static rim uses the mobile outline at ≤ 760 px → 4g; 4) Rosa widget failure → plain link → 4g. Recommended, not gating: 5) capture dates for the in-copy ratings → 4a→4b→4c (or a Shahar ruling on §6's scope); 6) night-line schema field → Shahar.

# Full round 2 (station 5, after 4g rounds 2–3 and the 4h/4i re-runs, 2026-09-23)

critic 0.3.2 · station 5 · run `2026-09-ahangama-02` · playbook 0.5.2, schema v0.6, rubric 0.1.0. What I reviewed: `sites/the-lavish-haven/final/` at commit `d7960e3`, rebuilt by me with `npm run build`. The build was clean, with 0 warnings, and gave the same `index.html` as on disk: 60 764 B, md5 `77eca119…`. There is no `SITE_URL`, so this is the preview build and `noindex` is expected. I read it against the dossier, `copy/en.json` (4c round 5 PASS, with `featureLine`), `copy/sources.md`, `final/notes.md` (4g rounds 2–3), `seo-report.md`, `aiseo-report.md` and the gold page. This was a full round, not just a check of the fixes. The round-1 harness was gone, so everything below was re-measured with new scripts. Setup: a snapshot of `dist/` served by `python3 -m http.server` on 8760, and the gold page on 8761. `audit-mockup.mjs` ran 3 times from scratch copies on 8761–8763, writing to scratch, so `final/audit.json` was not rewritten. `check-design.mjs` ran on 8763. Browser: headless Chromium (software GL), Playwright from the repo. axe-core 4.13.0 was injected from a local copy. No real phone was used. The servers are stopped and ports 8760–8769 are free. Scripts and raw JSON are in `scratchpad/lavish-critic2/`, outside the repo.

```
mode: full        round: 2        variant: the gold page (Shahar's pick)
total: 91.5 / 100           result: pass        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | My facts table is below: 60 rows, **60 match, 0 mismatch, 0 unsourced**. The rendered text (JS on after a full scroll, JS off, drawer), `llms.txt`, JSON-LD, meta and all 10 alts are unchanged from round 1 except three strings: `featureLine`, and the alts of img-073 and img-071. I checked each of the three against its source. **HF-1 is closed.** The img-073 alt is now "Wooden chairs and a low table on a balcony beside a mottled grey wall, the pool below". I opened `assets/img-073.jpg`: four wooden chairs and a low table, a continuous mottled grey-green trowelled wall, and the pool below through the railing. Every noun is visible, and the 4:5 crop shown on the page keeps all of them (`strip-crops-as-shown.jpg`). The img-071 alt, "…under white-painted rafters, looking into palms", is also visible in the source and in the crop. I opened the other 8 sources again, one by one: all hold. The 5 testimonials equal `reviews.quotes[0,4,3,6,7]` by string equality, and so do their authors (script check). Hrefs: Booking.com ×13, Agoda ×2, `tel:+94764832988` ×2, Maps ×1, rosa.surf ×2. Each is identical to the dossier. |
| 2 | mobile + performance | 9 | `audit-mockup.mjs` ×3 (390×844 @2, 1.6 Mbps, 150 ms, 4× CPU, no scroll): **589 030 B / 12 requests, all local; LCP 424 / 420 / 424 ms; CLS 0 / 0 / 0**. Every budget line holds (table below). **Overflow 0 at 390, 768, 1024, 1440, 1525 and 1920** at every scroll step (6 widths × 12–15 steps). **0 console and page errors** at all six widths with the live forecast. **Round-1 item 3 (static rim) is closed.** At 390 with JS off, reduced motion and no WebGL, only the phone polygon `.m` is drawn, and my rim-vs-text check finds **0 text lines crossed** (`static-paths-390.png`). The first screen reads: tagline, two dated ratings, then the night block. Deduction, −1, new and inherited from the gold: **with JS off, the fixed header never gets its `.solid` background**, so it sits transparent over the page text while you scroll. By measurement, the header's links overlap page text on **62 of 98 scroll positions at 390** and 31 of 91 at 1440, against 2 on the motion path. The gold overlaps the same way (71 / 31). Example: "The Lavish Haven" printed over "…for advanced surfers" in the wave panel (`jsoff-390-wave.png`). Under reduced motion it happens only in the hero (4 of 98). |
| 3 | booking CTA | 9 | At 390 with touch, external navigation blocked and logged. The bar's "Check dates" (144.8 × 48) opens the drawer. Tapping its Booking.com row makes **one navigation, to `https://www.booking.com/hotel/lk/the-lavish-haven.html`**. With JS off, the same tap goes straight to that URL. Room row 2 opens the drawer with "You were looking at the Superior King Room." The drawer offers Booking.com (with its rating, "read 19 September 2026"), Agoda, and "Or call" `tel:+94764832988`. The deduction is unchanged: no prefill is possible (no WhatsApp, OTAs only), and there is no reply time (`reply_time_hint` is a gap). |
| 4 | brand fit | 8 | **The look is still the gold's**, checked capture by capture at all six widths (`compare-gold-w390|768|1024|1440|1525|1920.png`, gold left and build right; `desktop-sheet.png` and `mobile-sheet.png` from `shoot.mjs`). The only visible differences are copy lengths, the dates, the address and the new night line. The night line now sets in 2 lines at every width (gold: 3). Round-1 deduction (b) is **resolved by Shahar's ruling**: playbook 0.5.2 §6 requires the capture date on the headline rating blocks only. The hero's two blocks, the drawer's Booking.com row and llms' "Ratings" list carry it. The in-copy 9.6 / 9.7 / 9.4 / 5.0 need none. Deductions that remain: (a) section order, with the wave and practicalities after reviews and amenities, and location only in the footer (§3 items 4 and 7; the gold's order). (c) The first screen names Kabalana but not Ahangama. |
| 5 | copy quality | 9 | The page is `copy/en.json` verbatim. The **word-for-word repeat is gone**: the line over the water is `featureLine` "A year-round outdoor pool, at the centre of the hotel.", and the pool block still opens "The outdoor pool is in the middle of the hotel and open all year." Deduction: the same fact now appears three ways (feature line, the pool paragraph, and the amenity row "Outdoor swimming pool open all year"). The schema's "No duplication" rule is about fields, and 4c passed it as not a repeat, so this is noted, not a fail. The tolerated repeats stay as the copyeditor predicted (24-hour desk, rates by date, Mya and Roie told twice). |
| 6 | accessibility | 9 | axe-core 4.13.0, WCAG 2.0/2.1 A+AA, after a full scroll: **0 violations** at 390 and 1440, with and without reduced motion (27 passing rule sets). Incomplete: `color-contrast` on 12–13 nodes over the drawn hero. The colours are unchanged since round 1: the CSS diff since `c9fb58c` adds only `.amen li .sp` and the `.rim .m` rules, and round 1 checked these by hand at 5.92:1 and 7.88:1. **Round-1 item 2 (glued words) is closed.** The aria snapshot reads "Outdoor swimming pool open all year", "Free private parking reservation needed", "BBQ facilities additional charge" ×5, the room links as "Superior King Room 1 king bed", and the authors as "Mya, Sri Lanka, on Booking.com". **Tap targets at 390**, on every scroll step: 17 distinct page targets, 0 under 44 px. Drawer: Close 50×48, rows 350×121 and 350×81, phone 169×44. **Keyboard**, 1440 and 390: Skip → name → Check dates → 9 room rows → strip → Rosa link → closing Check dates → Maps → phone → Booking.com → Agoda. Every stop has a visible outline. "Check dates" has a 2 px inset ring (`focus-bar-1440.png`). Enter opens the drawer with focus on the dialog. 9 Tabs and 4 Shift+Tabs all stay inside (Close → Booking.com → Agoda → phone). Esc closes it and focus returns to "Check dates" (`drawer-kbd-390|1440.png`). Reduced motion and no WebGL: static layout, the CSS pool (not black), the night print visible, 0 errors. Deduction, new and minor: **two alts describe things the 4:5 crop on the page cuts out.** img-017's "a tall window on one side" is outside the crop (window at x 0–180 of 1024, crop from ~256). img-028's "a glass door at the far end" is mostly outside (door at ~860–990, crop to ~870). Both are true of the photographs, so this is not a facts issue. A screen-reader user is simply told about something a sighted user cannot see (`strip-crops-as-shown.jpg`). |
| 7 | security + delivery | 9 | Static output only. No `<script src>`, no runtime CMS call. A grep of the HTML for localhost / 127.0.0.1 / api key / secret / password / payload finds 0; the one "token" is a CSS comment. Photo filenames are lowercase (0 with capitals). Jost is self-hosted, 26 576 B. The preview rule holds: `noindex, nofollow` meta, `robots.txt` `Disallow: /` for `*` plus 15 AI crawlers, no sitemap, and the preview line in `llms.txt`. **Embeds: 1** (Rosa's iframe; `data-src`, no `src` in the markup). **0 third-party requests on first load** in all 3 audits and all 28 forecast runs. **Round-1 item 4 (widget failure) is closed for every failure path I could make.** I ran 14 states × 2 widths, with the block **on screen** when each result lands. Widget abort, slow abort (3 s), HTTP 500 and hang all end with `rosa` not `on`, `src` removed and "See today's forecast for Kabalana on Rosa" visible. The headline stays live. JSON 404, abort, hang to 10 s, stale 30 h and all-blocked end `fc off` with the link visible. Live, widget ok and slow ok show the widget. **CLS 0 and identical page boxes for the headline, the widget and `#h-prac` in all 28 runs, and 0 page errors** (`forecast-states-1440|390.png`). Deduction, −1. (i) **The path the designer declared is still open, and I reproduced it**: HEAD answers 200 and then the frame's own GET fails (abort or 500). The block goes `on`, the link is hidden, and the 420 × 500 box is **empty** (`forecast-headok-getabort-390.png`). That is a blocker that filters only sub-frames, or the network dropping between the two requests. The headline's own credit link to Rosa is still on screen beside it. Playbook §4 still says "never an empty box". (ii) The fix adds a request. After the scroll the page makes **JSON GET + widget HEAD + widget GET** (plus Rosa's own requests inside its frame), not the "exactly one request to the JSON plus the widget frame" that hard constraint 9 describes. It carries no credentials and has no effect on first load. I report it as a fact for Shahar, not as a fail. |

`total = 10×2.5 + 9×2 + 9×1.5 + 8 + 9 + 9 + 9 = 91.5`. **This round passes.** There is no hard fail. The total of 91.5 is at least 80. Every dimension is at least 6, the lowest being 8. Every playbook §4 budget line is met, as measured.

## Round-1 items, checked one by one

| # | round-1 item | now | evidence |
|---|---|---|---|
| 1 | HF-1 alt img-073 "stone" | **closed** | source + crop looked at; new alt all visible |
| 2 | glued words in the text layer | **closed** | aria snapshot, innerText JS on/off |
| 3 | static rim through the ratings at ≤ 760 | **closed** | 0 text lines crossed on JS off, reduced motion and no WebGL at 390; picture `static-paths-390.png` |
| 4 | widget failure → empty box | **closed except HEAD-ok/GET-fail**, declared by 4g | 28-run matrix, block on screen; `forecast-headok-getabort-390.png` |
| 5 | dates on in-copy ratings | **resolved by ruling** (playbook 0.5.2 §6) | headline blocks dated: hero ×2, drawer, llms Ratings |
| 6 | night-line binding | **resolved** (schema v0.6 `featureLine`, 4a–4c round 5 PASS) | `index.astro` reads `c.featureLine`; `<p id=nightLine>` rendered only when non-empty (4g notes; I did not rebuild with it empty) |

## Not gating: fix these before handing to the owner, with routes (smallest first)

1. **img-017 and img-028 alts name things the crop hides** (dim 6). Route: **4g**. Change the two strings in `seed-from-dossier.mjs`'s photo table to what the 4:5 crop shows, or move `focalX`.
2. **Transparent header over text with JS off** (dim 2). Inherited from the gold. Route: **4g**. For example, give `.bar` its paper background whenever `motion` is off. Today only JS adds `.solid`.
3. **HEAD-ok/GET-fail still shows an empty widget box, and the HEAD probe adds a third request after the scroll** (dim 7). Route: **Shahar**. Either accept this as the limit of a cross-origin frame, or have Rosa's widget post a "ready" message (Rosa is ours) and let the loader wait for it. That would also remove the HEAD, and it would apply to KA and Layday as well. 4g alone can only narrow the gap, for example by keeping the plain link drawn beneath a transparent frame area.
4. **Section order and Ahangama on the first screen** (dim 4), unchanged since round 1. This is the gold's structure. Route: **Shahar** (it is his pick); otherwise 4d.
5. **The pool fact told three ways** (dim 5). Route: **4a→4c**, optional.

Also seen and inherited from the gold, with no deduction: at 1440 and 1525 on the motion path, the last "a" of "Kabalana" in the h1 almost touches the pool's rim corner. The glyphs are clear, only the line boxes touch, and the gold has the same pixels (`compare-gold-w1525.png` row 1).

## Budget table (playbook §4; my `audit-mockup.mjs` runs 2026-09-23, 390×844 @2, 1.6 Mbps, 150 ms RTT, 4× CPU, no scroll)

| Item | Target | Measured (first load) | With the embed loaded |
|---|---|---|---|
| First-load transfer | ≤ 1.5 MB | **589 030 B, 12 requests**, one local host | unchanged; nothing from Rosa before the wave panel is near |
| JS, compressed | ≤ 300 KB | 0 B as files; inline 16 790 B raw / 7 162 B gzip (inside the 60 764 B HTML, 19 368 B gzip) | Rosa's scripts run in Rosa's frame |
| Largest above-the-fold image | ≤ 200 KB | none (the first screen is drawn); largest image on first load 122 396 B | unchanged |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family (Jost), 26 576 B, self-hosted | Rosa's Inter loads inside its frame |
| LCP | ≤ 2.5 s | **424 / 420 / 424 ms** | first-load metric |
| CLS | < 0.1 | **0 / 0 / 0** | **0** in all 28 forecast runs, block on screen |
| Third-party requests on load | 0 | **0** | **0** before the scroll in all 28 runs |

## Rosa forecast (hard constraint 9) and embeds

Spot: JSON `…/data/spots/kabalana.json`, widget `spot=kabalana`, credit "Forecast for Kabalana by Rosa" → `https://rosa.surf/spot/kabalana`, fallback "See today's forecast for Kabalana on Rosa". Dossier `location.spot` is "Kabalana beach break". The site's half is the headline only, live at test time: "0.4–0.6 m / Wednesday 23 September, 14:30 / Swell 11.1 s from the south / Wind 17.9 km/h from the west, cross-shore / Updated 23 September, 13:56". No day boxes. Widget: `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`, 420×500 at 1440 and 302×500 at 390, `sandbox` and `referrerpolicy` as in `agents/designer/tools.md`, not restyled or covered. JS off: the plain link (`static-paths-1440.png`, wave). Embeds: 1 of at most 2. After the scroll: 1 JSON GET, 1 widget HEAD, 1 widget GET. The HEAD is new since round 1 (dimension 7, item ii).

## Facts table (mine: rendered page JS on and off, drawer, `llms.txt`, JSON-LD, meta, alts, interface strings → dossier)

Everything not listed as changed is **character-identical to round 1**. I compared the extracted text, and I checked each row again against `dossier.json` in this round: quotes by string equality, facilities, room types, ratings, address, phone, links, spot, distance, `business.description`.

| On the page | Dossier key | Verdict |
|---|---|---|
| "The Lavish Haven" (h1, title, og, JSON-LD, llms) | `business.name` | match |
| "A new hotel, two minutes from Kabalana" (hero, meta, og, llms) | `business.type`; `since` gap note ("brand new"); `location.distance_to_beach` | match |
| "9.2 of 10 on Booking.com, 34 reviews" / "5.0 of 5 on Google, 21 reviews" (hero, drawer, llms) | `reviews.booking`, `reviews.google` | match ×2 |
| "read 19 September 2026" (hero ×2, drawer, llms ×2) | `reviews.*.fetched_at` 2026-09-19 | match; required on these headline blocks (playbook 0.5.2 §6) |
| **new**: featureLine "A year-round outdoor pool, at the centre of the hotel." (night block, llms) | `facilities[0]` "year-round outdoor swimming pool"; `reviews.quotes[3]` António "the swimming pool at the center" (guest's observation of a physical fact; photos img-079 and img-002 agree) | match |
| "Among cafés and restaurants" / "Cafés and restaurants surround the hotel, | `location.setting` | match |
| …and there is a fruit stand nearby." | `reviews.quotes[5]` | match |
| "Guests score the location 9.6 out of 10 on Booking.com." | `reviews.booking.categories.Location` | match (body copy, no date needed under 0.5.2) |
| "Koggala Airport is about 5 km away." | `business.description` "3.1 mi" | match |
| "Nine kinds of room" + the 3 rooms sentences | `room_types[0–8]`; `contradictions[1]` (no count published) | match |
| "Each room has a work desk, soundproofing and free WiFi." / "The family rooms have air conditioning and private bathrooms." | `business.description` | match |
| "There is no published price list. Rates go by date…" | `gaps[offers]`; `booking.path.note` | match |
| 9 room rows, beds, "ground floor", sleeps 4 ×4, sleeps 5 (page, JSON-LD, llms) | `room_types[0–8]` | match ×9 |
| "New, and it shows" / "The hotel is new." / "brand new" / "a new facility" | `since` note; quotes[4], quotes[2], quotes[5] | match |
| "…9.7 … cleanliness … comfort, and 9.4 for staff, across 34 reviews." / "On Google it has 5.0 out of 5 from 21 reviews." | `reviews.booking.categories`, `reviews.google` | match |
| "Staying longer" + the two guest sentences | quotes[0] Mya, quotes[6] Roie | match |
| 5 quotes + "<author>, on Booking.com" (page, llms) | `reviews.quotes[0,4,3,6,7]` | **match 5/5, string equality**; the operator-named quotes[1] is not used |
| "Pool, restaurant, spa" paragraph (4 sentences) | `facilities[0–3,5,17–19]`; `business.description` | match |
| 25 amenity rows with 7 notes (page, JSON-LD, llms) | `facilities[0–24]` (CCTV omitted) | match ×25 |
| spot text, "The beach is two minutes from the hotel, on foot." | `location.spot`, `location.distance_to_beach` | match |
| practicalities (2 paragraphs) | `hours_note`; `facilities[6,8–12,20–22]`; `contradictions[2]` | match |
| llms "Check-in and check-out: …" | `hours_note` | match (no times: gap respected) |
| closing h2 + drawer "Rates move with the dates. Booking.com and Agoda show what is available." | `booking.path.note`; `gaps[offers]` | match |
| "No166/1 Walhengoda Road, Ahangama 80650, Sri Lanka" (footer, llms, JSON-LD parts) | `location.address` (Google), §6 capitalisation and order | match |
| "+94 76 483 2988" / `tel:+94764832988` / JSON-LD `telephone` | `contact.phone` | match |
| "Open in Google Maps" / `hasMap` / llms Map | `location.map_url` | match, character-identical |
| JSON-LD `geo` 5.97946, 80.35083; `@type` Hotel; `sameAs` | `location.lat_lng`; `business.type.note`; `booking.engine_url`, `other_engines[0]` | match |
| "Check dates" ×13, "Check dates on Booking.com" / "…on Agoda" | `booking.engine_url`, `other_engines[0]` | match |
| meta/og description; title "The Lavish Haven, Ahangama" | rows above; town from the address | match |
| alt img-002 night pool | photograph | match |
| alt img-079 pool + stone-paved garden from above | photograph (crazy paving with joints) | match |
| alt img-069 covered balcony, chairs, low table, railing, pool | photograph | match |
| alt img-007 staircase to loft, warm light on plaster walls | photograph | match |
| **alt img-073 (changed)** "…beside a mottled grey wall, the pool below" | photograph | **match** (HF-1 closed) |
| alt img-021 pitched white ceiling, grey-green curtains, glass door | photograph | match |
| alt img-028 two beds, timber ceiling, chair at desk, glass door at far end | photograph | match (door mostly outside the crop shown: dim 6) |
| **alt img-071 (changed)** "…under white-painted rafters, looking into palms" | photograph | **match** |
| alt img-017 made bed, folded towels, tall window, wave painting | photograph | match (window outside the crop shown: dim 6) |
| alt img-008 loft bedroom, timber balustrade, purple curtains | photograph | match |
| "Photographs of the hotel" | all 10 `license: business-owned` | match |
| interface strings: "Scroll, and it gets dark"; "You were looking at the <room>." (tested); "Or call", "Where", "Phone", "Book", "Close", "Skip to content" | — | true, or assert nothing |
| forecast headline + "Updated …" | live Rosa data, never content (schema v0.3) | hard constraint 9, above |
| llms preview line; robots comments | build state (no `SITE_URL`) | true |
| absent as required: prices, check-in times, season, WhatsApp, email, room count, languages, `aggregateRating` | `gaps[]`, `contradictions[1]` | absent |

**Totals: 60 rows (round 1's 58, plus the feature line on the page and in llms); 60 match, 0 mismatch, 0 claims with no source.** `audit-mockup` facts: 21 numbers on the page; the only ones not in the copy are "19" and "2026", the capture date.

## Default-look facts (hard constraint 4)

`check-design.mjs … --no-shots` (scratch copy, port 8763): `ok`, **0 problems, 0 warnings**. Look: Jost for h1, h2 and body; ground `rgb(245,248,250)` = `hsl(204 33% 97%)`; all-caps labels 0; labelled headings 0/12.

## Evidence

`final/shots/critic-2/` holds the following. `shoot.mjs` captures: desktop 13 / 10 273 px and mobile 15 / 11 389 px, `errors []` (`desktop-*.png`, `mobile-*.png`, sheets, `shoot.json`). Per-width sheets `w390|768|1024|1440|1525|1920-sheet.png`. Gold-vs-build compares at the same six widths, `compare-gold-w*.png`. `static-paths-390.png` (JS off / reduced / no-WebGL / motion first screens, JS-off wave, reduced night). `static-paths-1440.png`. `jsoff-390-wave.png` (header over text). `reduced-390-night.png`. `drawer-kbd-390|1440.png`. `drawer-room-390.png`. `focus-bar-1440.png`. `forecast-states-1440|390.png` (live, widget abort, slow abort, HEAD-ok/GET-fail, JSON abort, all blocked). `forecast-headok-getabort-390.png`. `strip-crops-as-shown.jpg`. Raw JSON and scripts are in the scratchpad: three `audit.json`, `widths.json`, `checks.json`, `fc-390|1440.json`, the axe results and the text extracts. `final/audit.json` is still 4g round 2's.

what the designer prompt got wrong: little this round. Four fixes were each verified by a measurement of the thing itself, with pictures, and the one gap left open was declared rather than hidden. Two misses remain, and both come from the same habit: **checking the source rather than what the page shows.** (1) The alt texts were checked against the full 1024×768 photographs, but the strip shows a 4:5 crop, and two alts describe parts the crop removes. The designer's facts rule for alts should say to describe **the crop the page shows**, and to check it at the built crop, not the asset. (2) The static paths were checked at the first screen (the rim), not while scrolling. With JS off, the header's background is added only by script, so the bar sits over text for the whole page. It is inherited from the gold, and it was invisible to every check that looked only at the top of the page. The prompt should require the JS-off path to be scrolled top to bottom with `shoot.mjs`, like the motion path. On the embed, the fallback rule is now tested per request, which is what round 1 asked for. What is left is a limit of cross-origin frames that only Rosa's side can close, so it is a decision for Shahar and not a prompt fix.
