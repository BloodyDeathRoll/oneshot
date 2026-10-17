# Global Surf Lodge Kabalana v2 — AI SEO report (station 4i)

aiseo 0.2.1 · run `2026-10-globalsurf-03` · 2026-10-17 · operator shahar · site: `sites/global-surf-adventures-v2/final/` (the 4g build after the 4h SEO pass, ledger `built → optimised`)

Nothing visible changed, and no copy was written. Outside the one `application/ld+json` script, the new `dist/index.html` and `dist/book/index.html` are character-identical to the 4h build (head included). Pixel proof under "Look". Mechanics follow v1 of this business (`sites/global-surf-adventures/aiseo-report.md`), adapted to v2's page.

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/site.mjs` | `AI_CRAWLERS`: 15 named AI crawlers, all `allow` (same list as v1, KA, Layday, Lavish). `answerLd()`: 4h's business JSON-LD is **extended, not replaced**, with `makesOffer` and `containsPlace` (below); still one block, one graph, no 4h property changed. `LV_LEDE`, `INCL_LEDE`, `LODGE_P`, `LODGE_LEDE`, `AMEN`: the home page's four composed text lines, moved here from `index.astro` so the page and `llms.txt` use the same code (output unchanged, see "Look"). |
| `final/src/pages/index.astro` | Uses those exports instead of computing the same strings inline. No markup change. |
| `final/src/pages/robots.txt.js` | The named AI-crawler groups. Real domain: `*` allowed, then the 15 bots allowed under "owner to confirm", then `Sitemap:`. Preview: 4h's refusal, then the 15 bots repeat `Disallow: /` (a bot that matches its own group ignores `*`). |
| `final/src/pages/llms.txt.js` | New. `/llms.txt` generated at build time (below). |
| `final/audit.json` | Rewritten by the after measurement. |

`notes.md`, `seo-report.md`, `content.json`, `gaps.json` and `labels.json` were not edited. Nothing written outside `sites/global-surf-adventures-v2/`.

### JSON-LD additions

| property | value | source |
|---|---|---|
| `makesOffer` | 4 × `Offer`. Levels 1–3: `name` ("Level 1 – Fomies"…), `description` = the card's one-liner + `lessons[].includes` ("Your first time on a board. No experience needed. 7 nights, 7 breakfasts, 5 dinners, 5 guided 2-hour surf sessions, …"), `priceCurrency` USD, `priceSpecification` UnitPriceSpecification {`minPrice` 1466, `unitText` "per person, 7 nights"}, `url` = `book/?level=<slug>` (only with `SITE_URL`). Freestylers: name + "For independent travellers who want the lodge's vibe. From 4 nights.", no price, no url. | `lessons[]` → dossier `offers[0–3]` (28 Sep 2026); one-liners `gaps.levels` / `gaps.freestylers` |
| `containsPlace` | 3 × `Room`: "Mixed dorm room – 4 beds" (occupancy 4), "Shared Twin Room – 2 Beds" (2), "Deluxe double room" (2), each with its page description | `gaps.rooms` (label, description, sleeps): the same rows as the room tabs. `rooms[]` is empty by the copy ruling, so the SCHEMA GAP file is the page's source |

`minPrice` + "per person, 7 nights" matches 4h's `priceRange` and the page's "From $1,466 pp \| 7 nights". Room supplements are dated samples for one week, so they stay out. `Room`, not `HotelRoom` (4h's type is `LodgingBusiness`; Booking.com files it as a hostel). Home JSON-LD: 14 → 16 keys on preview, 17 → 19 with `SITE_URL`. Validated by `JSON.parse` and by reading schema.org (`makesOffer` on Organization, `containsPlace` on Place, `occupancy` on Accommodation, `minPrice`/`unitText` on (Unit)PriceSpecification). No network validator was available.

## Questions identified, and where each is answered

Type `surf_camp`. "JS off" = the built page in Chromium with JavaScript disabled. **Name?** = whether the answer sentence carries "Global Surf Lodge Kabalana". The name is visible text on v2 (footer: name line and "© Global Surf Lodge Kabalana"; v1 had it nowhere), but no answer sentence carries it (R1).

| # | Question a traveller asks an assistant | Answer on the page (JS off) | Where | Name? |
|---|---|---|---|---|
| 1 | What is it, and where? | Address "Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka"; "We are surfing obsessed, and we invite you to join us." The tagline ("Surf weeks for all levels on Sri Lanka's south coast…") is **not rendered** (only in meta description, JSON-LD, llms.txt) | footer, levels lede | no (R1). h1 is "Your surf week starts here" (4h open item) |
| 2 | Is it for beginners / for my level? | "Level 1 – Fomies / Your first time on a board. No experience needed." + Level 2 / 3 one-liners | level cards; Level step (book/) | no |
| 3 | What does a week cost? | "From $1,466 pp \| 7 nights" per level; "The three surf weeks cost the same, per person for seven nights."; room supplements with "Sample for 20–27 Feb 2027; prices from the booking engine, 29 Sep 2026"; booking total | level cards, phone bar, rooms, book/ | no; now also `makesOffer` |
| 4 | What's included? | 10 items + "Level 3: 5 coached surf sessions of 2 hours"; "Not included: airport pickup. From $220 pp, add it on the booking page." | "What's included" (home, book/) | no |
| 5 | What are the rooms like? | "There are just twelve rooms…"; 3 room types (line, description, sleeps, bathroom); "Every room: air conditioning \| ceiling fan \| safe box \| private toilet and shower \| board rack" | "The lodge", "Our rooms"; `containsPlace` | no |
| 6 | Pool, food, vegan, Wi-Fi / co-working, parking, yoga, airport shuttle? | All 15 `amenities[]` rows: "Outdoor swimming pool \| Yoga chalet \| … \| Gluten-free and vegan options \| Co-working space, high-speed internet, … \| Free WiFi \| Airport shuttle \| Free private parking on site \| …" | "The lodge" | no. (v1 rendered none of these; v2 answers them) |
| 7 | Kids, pets? | "No pets and no extra beds; cots are free on request for children up to 5." | footer legal line | no |
| 8 | How far is the beach / airport? | "Booking.com puts Kathaluwa West Beach 40 m from the lodge and Kabalana Beach 350 m. Kathaluwa station is 400 m away, Ahangama Beach 4 km and Koggala Airport 3.9 km." | footer "Getting here" | no ("the lodge") |
| 9 | Which wave? | "The lodge overlooks two spots, The Rock and South Point. More waves are a few minutes away by tuk-tuk." + Rosa forecast link | "The waves" | no. Break type, bottom, level fit: dossier gap |
| 10 | When do packages start, how long, check-in? | "Packages start on a Saturday."; nights 7 / 14 / 21 / 28; "Check-in 14:00–20:00 \| check-out by 11:00" | book/ Dates step, footer | no |
| 11 | How many per booking? Deposit? | "Up to 6 guests per booking."; "40% deposit to book, the rest 45 days before arrival…" | book/ | no |
| 12 | Is it any good? | 8.6 on Booking.com, 80 reviews, 28 Sep 2026; Staff 9.5, Facilities 9.2, Cleanliness 9.2; 9 verbatim quotes | levels proof line, "What guests say" | label + number + source |
| 13 | How do I book? | "Book package now" → `book/` (with JS off the GET form hands off to the Bookinglayer product page); WhatsApp, `tel:`, `mailto:` | hero, bar, closing, book/, footer | real links, work with JS off |
| 14 | Are the guides qualified? | silent on v2: v1's "ISA-certified surf guides" detail line is not in v2's design | — | R2 |
| 15 | Best season? Languages spoken? | silent | — | dossier gaps (`season`, `languagesSpoken`) |

**JavaScript off.** 136 content strings (every sentence of the copy blocks, lessons, amenities, quotes and authors, rooms, one-liners, inclusions, address, stay note, contact) were looked for in the visible text of both pages at 390 and 1440 px, JS off and JS on (reduced motion). **0 are JS-only**: everything visible with JS on is visible with JS off. JS off shows more (all three room panels). 0 third-party requests in any of the 8 loads. **Nothing had to be moved.** The hero video, the level clips, the drop's canvas of plates and the Rosa widget are decoration or live data; the drop's one line (`featureLine`) is also in the static view's text.

28 of the 136 are never visible (not fixed, render-level, R2): the tagline; the intro heading "Next set is yours" and the intro's second paragraph; the day block's paragraphs after the first; the whole "Pick your level" block and all of "One price, three levels" except its first sentence (Saturday starts, 7–28 nights, up to six guests, unlimited water/coffee/tea, the engine's 28 Sep 2026 base price); the "Twelve rooms" heading and its every-room sentence (shown instead as the gap line "Every room: …"); the "What guests say" body; `lessons[].includes` (the page shows the same facts as the inclusions list); `contact.email` and `contact.phone` as text (only "Email us" / "Call us" buttons).

**Hidden text.** None added. Everything new is in `/llms.txt`, `robots.txt` and the JSON-LD, which mirrors the visible level cards and room tabs row for row.

## FAQPage: declined

No question is asked on either page: every heading is a statement ("Choose your level", "What's included", "Getting here"); the only question marks are rhetorical lines in copy ("Already carving?", "Not sure which one fits?"). A `FAQPage` would need question text no reader sees (hard constraint 2, and Google's visible-content rule). The route to one is a visible FAQ block (R3). Same decision as v1, KA, Layday and Lavish.

## `/llms.txt` contents

`src/pages/llms.txt.js` generates it at build time from `content.json`, `gaps.json` and `labels.json` through the page's own helpers and the shared text exports (`LV_LEDE`, `INCL_LEDE`, `LODGE_LEDE`, `LODGE_P`, `AMEN`, `INCL`, `LEVELS`, `FREE`, `ROOMS`, `levelPrice`, `stayLine`, `WA_GENERAL`). It cannot be hand-edited into divergence. 7 570 B on the preview build, 7 581 B with `SITE_URL=https://example.test/` (absolute links, no preview line).

**Rule: it says what the pages show, in page order, and nothing more** (v1's rule). One stated exception: the blockquote summary is the `tagline`, the owner's one-line description, which v2's design does not render (it is the meta description and the JSON-LD `description`). Each of its claims is on the page in other words (Sri Lanka in the address, three levels on the cards, Kathaluwa West Beach 40 m).

Contents, in order:
1. `# Global Surf Lodge Kabalana`, the tagline as the blockquote, the preview line on preview builds only, "Global Surf Lodge Kabalana, Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka." (the one self-contained name + place sentence).
2. "Choose your level": the lede, 3 levels with one-liner, "From $1,466 per person, 7 nights" and a link to that level on `book/`; Freestylers with "from 4 nights" and the WhatsApp ask-about-dates link.
3. "What's included": lede, 10 items (Level 3's coached line inline), airport pickup not included.
4. "The lodge": `featureLine`, the lodge lede and details paragraph, the 15 amenities.
5. "Our rooms": 3 rooms (line, description, details, room price), the every-room line, the dated-sample note.
6. "The waves": `spot` + the Rosa forecast link.
7. "What guests say": 8.6/10 Booking.com, 80 reviews, read 28 Sep 2026; category scores; 9 quotes verbatim with author and source. Then the closing line.
8. "Follow the lodge": the Instagram line and link.
9. "How to book": the booking form's approved labels (Saturdays, up to 6 guests, USD, deposit, hand-off), booking page, WhatsApp, phone, email.
10. "Getting here": address, distances, check-in/out, the stay note, map link. "Pages": home, booking.
11. "Last updated: <date>" from `updatedAt` once a tenant exists (null in the seed, so absent today).

**Checked against the built pages (JS off, both pages, 390 + 1440):** 197 fragments; all present verbatim except the tagline and these joins of page fields, each field checked on its own: "per person" for the page's "pp"; "/10" after the score and "read <date>"; ", " / "; " for the page's " \| " (every-room line, amenities, check-in line, Freestylers' "\| from 4 nights"); "(Level 3: …)" for the page's inline "Level 3: …"; quote + "(author, source)"; phone and email (on the page as `tel:` / `mailto:` hrefs); section labels ("How to book", "Pages", "Address", "Phone", "Amenities") and the two page descriptions in "Pages" / "How to book" (template wording). **11 / 11 links** in llms.txt are an `href` or form `action` on the pages.

## Crawler policy (owner decision, must be confirmed)

- **Production build** (`SITE_URL=https://example.test/`, scratch outDir): `User-agent: *` / `Allow: /`; one group of 15 AI crawlers with `Allow: /` under "owner to confirm": GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot, MistralAI-User; then `Sitemap: https://example.test/sitemap.xml`.
- **Preview build** (the `dist/` left in place, and `SITE_URL=…workers.dev`): `Disallow: /` for `*` and repeated for the 15 named bots; no sitemap; pages keep 4h's `noindex, nofollow`.

**Default: allow all.** Being quoted is how this site competes with the OTA listings on "surf camp in Ahangama / Kabalana". **This has not been put to the owner.** For the pitch: "AI assistants may read and quote your site. Keep that, or block the training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) while keeping live answers?" Either answer is a one-value edit per bot in `AI_CRAWLERS`.

## Facts the dossier could not support, left unanswered on purpose

- **Season / best months:** `season: null` (dossier gap).
- **Break type, bottom, level fit, distance of The Rock and South Point:** dossier gap.
- **Languages spoken, team names, founding year, reply time:** dossier gaps.
- **Freestylers price:** the engine gives none without dates. No price in the data.
- **Lodge phone / WhatsApp:** the site uses the approved +97299733943 and the HQ WhatsApp; Google's +94770776747 is not used (4h "Still wrong" 2).
- **`aggregateRating` / `review` markup:** omitted (Shahar's KA decision, applied by 4h).
- **`numberOfRooms` (12), star rating:** 12 is only in copy prose; not added as data, as 4h decided.

## Recommendations (visible changes, so not made)

Each needs copy work (copywriter → humanizer → copyeditor) or a design change. Every fact below is already in the passed copy or the CMS.

- **R1. An answer sentence with the name, in the first screen or the levels lede** (base.md §2, §5). The name is visible only in the footer. Suggested: "Global Surf Lodge Kabalana is a surf lodge in Ahangama, on Sri Lanka's south coast, 350 m from Kabalana Beach." (facts in `contact.address` and `copyBlocks[info]`). Left for Shahar with 4h's h1 question.
- **R2. Render the CMS content the design drops:** the tagline, the "One price, three levels" block (Saturday starts, 7–28 nights, up to six guests, unlimited water / coffee / tea), the rest of the day block, and v1's "12 rooms \| Saturday check-in \| ISA-certified surf guides" detail line (`gaps.details.welcome` is not in v2's gaps, so "ISA-certified" now answers nothing). llms.txt picks each up in the same commit as the design change.
- **R3. A visible FAQ block** (playbook §3 item 8) would allow an honest `FAQPage`. The schema has no `faq` slot; `copyBlocks[].slot` would need one (a proposal, not made).
- **R4. A visible last-updated date** from `updatedAt` (base.md §5). Null until a tenant exists; llms.txt and the sitemap pick it up automatically.
- **R5. Entity clarity**, as 4h "Still wrong" 2 and 4: Google "Global Surf Lodge", site "Global Surf Lodge Kabalana", brand "Global Surf Adventures". `alternateNames[]` → `alternateName` and `socials[]` → `sameAs` would tie them to one entity. Not added: no field exists.

## Measured

| | after 4h | after 4i | target |
|---|---|---|---|
| `dist/index.html` | 100 859 B (gzip -9 27 492) | 103 082 B (gzip -9 28 110) | — |
| `dist/book/index.html` | 70 110 B | unchanged (byte-identical) | — |
| First-load transfer, video excluded | 478 961 B, 18 requests, all local | 481 184 B, 18 requests, all local | ≤ 1.5 MB |
| LCP (ms, 4 runs) | 448–468 (4h, 9 runs) | 452 / 456 / 452 / 452 | ≤ 2 500 |
| CLS (load) | 0.0061 | 0.0061 | < 0.1 |
| Scroll CLS early / settled | 0.0072 / 0 | 0.0072 / 0 in 4 of 4 | < 0.01 |
| JS, compressed | 7.7 KB inline | unchanged (no JS touched) | ≤ 300 KB |
| Third-party on load / tap targets < 44 px | 0 / 0 | 0 / 0 | 0 |
| JSON-LD, home | 1 block, 14 keys (17 with `SITE_URL`) | 1 block, 16 keys (19 with `SITE_URL`) | — |
| `llms.txt` | none | 7 570 B (preview) / 7 581 B (`example.test`) | — |
| `robots.txt` (preview) | `*` Disallow | `*` Disallow + 15 named bots Disallow | — |

The +2 223 B (+618 B gzip) is the JSON-LD block at the end of `<body>`, an inert data script after all content. `llms.txt` and `robots.txt` are not fetched on page load. Headless Chromium on this machine (`tools/audit-mockup.mjs`, 390×844, slow 4G, CPU ×4); no real phone.

### Look (no visible change)

- **Markup:** with the `application/ld+json` block removed, the whole 4h and 4i files are identical strings (home and `book/`; `book/` is byte-identical outright).
- **Pixels:** the same 10 captures as 4h (home, `book/`, home with the drawer open × 390 / 1440 × JS off / on, reduced motion, images eager and decoded): **10 of 10 PNGs byte-identical** to the 4h build's, and to the 4g build's.
- `shoot.mjs` not run: nothing that renders changed. `clean-shots.mjs`: 0 files.

## Checks

| check | result |
|---|---|
| `npm run build` | clean, 2 pages; `dist/` adds `llms.txt`; `index.html` and `robots.txt` differ from 4h, `book/index.html` identical |
| JSON-LD | `JSON.parse` OK, 1 block per page; with `SITE_URL=https://example.test/`: `@id` `https://example.test/#business`, offer urls `https://example.test/book/?level=level-{1-fomies,2-rollers,3-riders}`, Freestylers none |
| No JS (Playwright, 390 + 1440, both pages) | 0 of 136 content strings JS-only; 0 third-party requests |
| llms.txt vs pages | 197 fragments; missing only the tagline and the joins listed above; 11 / 11 links on the pages |
| robots.txt | preview and workers.dev: 2 × `Disallow: /` (`*` + 15 bots), no sitemap; `example.test`: `*` Allow + 15 bots Allow + `Sitemap:` |
| `check-design` home / `book/` | 0 failing each |
| `npm test` (repo) | 40 / 40 pass |
| `ONESHOT_RUN=2026-10-globalsurf-03 node tools/check-wiring.mjs` | 16 agents, 0 failures, 2 warnings (stubs) |

Production / workers.dev builds and every capture stayed in scratch. No deploy.
