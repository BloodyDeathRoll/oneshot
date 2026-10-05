# Global Surf Lodge Kabalana — AI SEO report (station 4i)

aiseo 0.2.0 · run `2026-09-globalsurf-02` · 2026-10-05 · operator shahar · site: `sites/global-surf-adventures/final/` (the 4g build after the 4h SEO pass, ledger `built → optimised`)

Nothing visible changed, and no copy was written. Outside the one `application/ld+json` script, the new `dist/index.html` and `dist/book/index.html` are character-identical to the 4h build. Pixel proof is under "Look".

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/site.mjs` | `AI_CRAWLERS`: 15 named AI crawlers, all `allow` (same list as KA/Layday/Lavish). `answerLd()`: the 4h business JSON-LD is **extended, not replaced**, with `makesOffer` and `containsPlace` (below). Still one block, one graph, no 4h property changed. |
| `final/src/pages/robots.txt.js` | The named AI-crawler groups. On a real domain: `*` allowed, then the 15 bots allowed under "owner to confirm", then `Sitemap:`. On a preview: the 4h refusal, then the 15 bots repeat `Disallow: /` (a bot that matches its own group ignores `*`). |
| `final/src/pages/llms.txt.js` | New. `/llms.txt` generated at build time from the sources the pages render (below). |

`notes.md`, `seo-report.md`, `audit.json`, `content.json`, `gaps.json` and `labels.json` were not edited. Nothing was written outside `sites/global-surf-adventures/`.

### JSON-LD additions

| property | value | source |
|---|---|---|
| `makesOffer` | 4 × `Offer`. Levels 1–3: `name` (e.g. "Level 1 – Fomies"), `description` = the card's one-liner + `lessons[].includes` ("Your first time on a board. No experience needed. 7 nights, 7 breakfasts, 5 dinners, 5 guided 2-hour surf sessions, …"), `priceCurrency` USD, `priceSpecification` UnitPriceSpecification {`minPrice` 1466, `unitText` "per person, 7 nights"}, `url` = `book/?level=<slug>` (only with `SITE_URL`). Freestylers: name + "For independent travellers who want the lodge's vibe. From 4 nights.", no price, no url. | `lessons[]` (label, price, currency, unit, includes) → dossier `offers[0–3]` (28 Sep 2026); one-liners `gaps.levels` / `gaps.freestylers` |
| `containsPlace` | 3 × `Room`: "Mixed dorm room – 4 beds" (occupancy 4), "Shared twin room – 2 beds" (2), "Deluxe double room" (2), each with its page description | `gaps.rooms` (label, description, sleeps): the same rows as the room viewer. `rooms[]` is empty by the copy ruling, so the SCHEMA GAP file is the page's own source |

`minPrice` + "per person, 7 nights" matches 4h's `priceRange` and the page's "From $1,466 pp \| 7 nights". Room supplements (+$140 / +$80 / +$418 pp) are dated samples for one week, so they stay out of the data. `Room` rather than `HotelRoom`: Booking.com files the lodge as a hostel and the type is 4h's `LodgingBusiness`, not a hotel. Validation is by `JSON.parse` and by reading schema.org (`makesOffer` is on Organization, which LocalBusiness is; `containsPlace` on Place; `occupancy` on Accommodation; `minPrice`/`unitText` on (Unit)PriceSpecification). No network validator was available.

## Questions identified, and where each is answered

Type `surf_camp` (a week of lessons + a bed). "JS off" = the built page in Chromium with JavaScript disabled. **Name** = whether the answer sentence carries "Global Surf Lodge Kabalana": none does, because the name is never visible text on either page (R1).

| # | Question a traveller asks an assistant | Answer on the page (JS off) | Where | Name? |
|---|---|---|---|---|
| 1 | What is it, and where? | "Surf weeks for all levels on Sri Lanka's south coast, a few steps from the ocean." (tagline); "The lodge sits in the green of the jungle. We run surf weeks for three levels…"; address | footer, welcome, footer `<address>` | **no** (R1). h1 is "Your surf week starts here" (4h open item, left for Shahar) |
| 2 | Is it for beginners / for my level? | "Level 1 – Fomies: Your first time on a board. No experience needed." + Level 2 / Level 3 one-liners | level cards (home), Level step (booking) | no |
| 3 | What does a week cost? | "From $1,466 pp \| 7 nights" on each level; room supplements with "Sample for 20–27 Feb 2027; prices from the booking engine, 29 Sep 2026"; booking total | level cards, phone bar, rooms, booking Total | no; now also `makesOffer` |
| 4 | What's included? | 10 items ("7 nights' accommodation", "7 breakfasts", "5 dinners", "5 guided surf sessions of 2 hours", …); "Level 3 – Riders \| 5 coached surf sessions of 2 hours"; "Not included: airport pickup. From $220 pp, add it on the booking page." | "What's included" (home and booking) | no |
| 5 | What are the rooms like? | "There are just twelve rooms…" + 3 room types (beds, sleeps, bathroom) | "Our rooms"; `containsPlace` | no |
| 6 | How far is the beach / airport? | "Booking.com puts Kathaluwa West Beach 40 m from the lodge and Kabalana Beach 350 m. Kathaluwa station is 400 m away, Ahangama Beach 4 km and Koggala Airport 3.9 km." | footer "Getting here" | no ("the lodge") |
| 7 | Which wave? | "The lodge overlooks two spots, The Rock and South Point. More waves are a few minutes away by tuk-tuk." + Rosa forecast link | "The waves" | no. Break type, bottom, level fit: dossier gap |
| 8 | When do packages start, how long? | "12 rooms \| Saturday check-in \| ISA-certified surf guides"; "Packages start on a Saturday."; nights 7 / 14 / 21 / 28; "Check-in 14:00–20:00 \| check-out by 11:00" | welcome detail, booking Dates step, footer | no |
| 9 | How many people per booking? Deposit? | "Up to 6 guests per booking."; "40% deposit to book, the rest 45 days before arrival…" | booking page | no |
| 10 | Are the guides qualified? | "ISA-certified surf guides" | welcome detail | no |
| 11 | Is it any good? | 8.6 Booking.com, 80 reviews, 28 Sep 2026; Staff 9.5, Facilities 9.2, Cleanliness 9.2; 9 verbatim quotes | "What guests say" | label + number + source |
| 12 | How do I book? | "Book package now" → `book/` (4 steps; with JS off the GET form hands off to the Bookinglayer product page); WhatsApp ×3, `tel:`, `mailto:` | hero, bar, closing, booking page, footer | real links, work with JS off |
| 13 | Pool, food, vegan, Wi-Fi/co-working, parking, yoga, airport shuttle, kids, pets? | **Not on the page.** The CMS holds them (`amenities[]` 15 rows, `stayInfo.note`, rooms block ¶2), but the design renders none of those fields. Only the pool shows up, inside guest quotes | — | R2 |
| 14 | What season is best? Which languages? | silent | — | dossier gaps (`season`, `languagesSpoken`) |

**JavaScript off.** 91 content strings (every copy block paragraph, lesson, amenity, quote, author, room, the gap lines) were checked on both pages at 390 and 1440 px, with JS off and with JS on. **Nothing is JS-only**: every string visible with JS on is visible with JS off. JS off shows *more* (all three room panels instead of one tab). With JS off: 0 third-party requests; links WhatsApp 3, `tel:` 1, `mailto:` 1, Google Maps 1, rosa.surf 3 (home); the booking form's `action` is the Bookinglayer product URL. The hero video, the level clips and the Rosa widget are decoration or live data: no fact lives only in them. **Nothing had to be moved.**

What the check also found (not fixed, all render-level):
- 33 strings on home, and more on the booking page, are content fields the design never renders: the two `offer` copy blocks ("Pick your level", "One price, three levels"), the rooms block's second paragraph, the "What guests say" body, all 15 `amenities[]`, `stayInfo.note`, `lessons[].includes` (the page shows the same facts as the gap inclusions list), and `contact.email` as text (only a "Email us" `mailto:` button). See R2.
- `innerText` reads the detail lines as "From $1,466 pp|7 nights" (the `|` separator span has no surrounding space in the markup). Harmless to an extractor, noted only.

**Hidden text.** None added. Everything new is in `/llms.txt`, `robots.txt` and the JSON-LD, which mirrors the visible level cards and room list row for row.

## FAQPage: declined

No question is asked on either page. Every heading is a statement ("Choose your level", "What's included", "Getting here"), and the only question marks are rhetorical lines inside copy ("Already carving?", "Not sure which one fits?"). A `FAQPage` would need question text no reader sees, which breaks hard constraint 2 and Google's visible-content rule. The route to one is a visible FAQ block (R3). Same decision as KA, Layday and Lavish.

## `/llms.txt` contents

`src/pages/llms.txt.js` generates it at build time from `content.json`, `gaps.json` and `labels.json` through the page's own helpers (`block`, `LEVELS`, `ROOMS`, `levelPrice`, `stayLine`, `WA`). It cannot be hand-edited into divergence. 7 222 B on the preview build, 7 233 B with `SITE_URL=https://example.test/` (absolute links, no preview line).

**Rule chosen: it says what the pages show, in page order, and nothing more.** A field the design does not render (amenities, `stayInfo.note`, the offer blocks) stays out, so a model citing the site finds every claim on the page it links to. Assumption, stated: the alternative (llms.txt carrying all CMS content) would answer more questions (parking, Wi-Fi, vegan) but would make llms.txt say things the cited page does not. When R2 renders those fields, add them here in the same commit.

Contents, in order:
1. `# Global Surf Lodge Kabalana`, the tagline as the blockquote, the preview line on preview builds only, "Global Surf Lodge Kabalana, Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka." (the one self-contained name + place sentence anywhere on the site's surface).
2. "Next set is yours" (intro body + "12 rooms / Saturday check-in / ISA-certified surf guides").
3. "Choose your level": 3 levels with one-liner, "From $1,466 per person, 7 nights" and a link to that level on the booking page; Freestylers with "From 4 nights" and the WhatsApp ask-about-dates link.
4. "What's included" (10 items, the Level 3 coached line, airport pickup not included). "Surf, breakfast, surf again".
5. "Our rooms": the lead paragraph, 3 rooms (line, description, details, supplement) and the dated-sample note. Then `featureLine`.
6. "What guests say": 8.6/10 Booking.com, 80 reviews, read 28 Sep 2026; category scores; 9 quotes verbatim with author and platform.
7. "The waves" (`spot` + the Rosa forecast link). The closing line.
8. "How to book": the booking page's approved labels (Saturdays, up to 6 guests, USD, deposit, hand-off), booking page, WhatsApp, phone, email.
9. "Getting here": address, distances, check-in/out, map link. "Pages": home, booking, Instagram.
10. "Last updated: <date>" from `updatedAt` once a tenant exists (null in the seed, so absent today).

**Checked against the built pages (JS off, both pages):** 132 sentence fragments, all present verbatim except 14 that are llms.txt's own joins of page fields, each field checked on its own: name + address (address visible, name see R1), "per person" for the page's "pp", "/10" after the score, "; " between the two twin supplements, ", " for the page's " \| ", phone and email (on the page as `tel:` / `mailto:` hrefs), and the two template descriptions in "Pages" / "How to book". All 11 links in llms.txt are an `href` or form `action` on the pages.

## Crawler policy (owner decision, must be confirmed)

- **Production build** (`SITE_URL=https://example.test/`, scratch outDir): `User-agent: *` / `Allow: /`; one group of 15 AI crawlers with `Allow: /` under "owner to confirm": GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot, MistralAI-User; then `Sitemap: https://example.test/sitemap.xml`.
- **Preview build** (the `dist/` left in place, and `SITE_URL=…workers.dev`): `Disallow: /` for `*` and repeated for the 15 named bots; no sitemap; the pages keep 4h's `noindex, nofollow`.

**Default: allow all.** Being quoted is how this site competes with the OTA listings on "surf camp in Ahangama / Kabalana". **This has not been put to the owner.** For the pitch: "AI assistants may read and quote your site. Keep that, or block the training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) while keeping live answers?" Either answer is a one-value edit per bot in `AI_CRAWLERS`.

## Facts the dossier could not support, left unanswered on purpose

- **Season / best months:** `season: null` (dossier gap; the business only says "year-round" about Sri Lanka as a whole).
- **Break type, bottom, level fit, distance of The Rock and South Point:** dossier gap (`location.spot detail`).
- **Languages spoken, team names, founding year, reply time:** dossier gaps.
- **Freestylers price:** the engine gives none without dates (dossier gap). No price in the data.
- **Lodge phone / WhatsApp:** the site uses the approved +97299733943 and the HQ WhatsApp; Google's +94770776747 is not used (4h open item, Shahar decides).
- **`aggregateRating` / `review` markup:** still omitted (Shahar's KA decision, applied by 4h).
- **`numberOfRooms` (12), star rating:** 12 is only in copy prose and a gap detail line; not added as data, as 4h decided.

## Recommendations (visible changes, so not made)

Each needs copy work (copywriter → humanizer → copyeditor) or a design change. Every fact below is already in the passed copy or the CMS.

- **R1. The business name, visible, in the first sentence of the page** (base.md §2 and §5). "Global Surf Lodge Kabalana" appears in no visible text on either page: only in `<title>`, `og:site_name`, the logo's `aria-label`, JSON-LD and llms.txt. This is 4h's open item 1 (h1) plus more: even a hero title fix leaves no answer sentence with the name. Suggested first sentence for the welcome: "Global Surf Lodge Kabalana is a surf lodge in Ahangama, on Sri Lanka's south coast, 350 m from Kabalana Beach." (all facts in `contact.address` and `copyBlocks[info]`). Left for Shahar with the h1 decision.
- **R2. Render the CMS content the design drops.** `amenities[]` (pool, yoga, restaurant, vegan, co-working, Wi-Fi, airport shuttle, parking…), `stayInfo.note` (no pets, no extra beds, free cots up to 5), the "One price, three levels" block (Saturday starts, 7–28 nights, up to six guests, unlimited water/coffee/tea) and the rooms block's second paragraph. They answer common questions (13 above), the owner can edit them, and today nothing shows them. A short "The lodge" amenities list in the footer or rooms section would be enough. Designer change; llms.txt then picks them up in the same commit.
- **R3. A visible FAQ block** (playbook §3 item 8) would allow an honest `FAQPage`. The schema has no `faq` slot, so `copyBlocks[].slot` would need one (a proposal, not made). Questions 2–9 above are answerable from the dossier.
- **R4. A visible last-updated date** from `updatedAt` (base.md §5). Null until a tenant exists; llms.txt and the sitemap pick it up automatically.
- **R5. Entity clarity**, as 4h "Still wrong" 2 and 4: Google lists "Global Surf Lodge"; the site says "Global Surf Lodge Kabalana"; the operating brand is "Global Surf Adventures" (footer ©). `alternateNames[]` → `alternateName` and `socials[]` → `sameAs` would let a model tie the Google listing, Booking.com and this site to one entity. Supported; not added, because no field exists.

## Measured

| | after 4h | after 4i |
|---|---|---|
| `dist/index.html` | 94 913 B (gzip -9 31 481) | 97 136 B (gzip -9 32 100) |
| `dist/book/index.html` | 98 921 B | unchanged (byte-identical) |
| JSON-LD, home | 1 block, 14 keys (17 with `SITE_URL`) | 1 block, 16 keys (+`makesOffer` 4, +`containsPlace` 3); 19 with `SITE_URL` |
| `llms.txt` | none | 7 222 B (preview) / 7 233 B (`example.test`) |
| `robots.txt` (preview) | `*` Disallow | `*` Disallow + 15 named bots Disallow |

The +2 223 B (+619 B gzip) is the JSON-LD block at the end of `<body>`, where 4h placed it: an inert data script after all content. LCP was not re-measured. `llms.txt` and `robots.txt` are not fetched on page load.

### Look (no visible change)

- **Markup:** with the `application/ld+json` block removed, before and after are identical strings (home and booking).
- **Pixels:** full-height Playwright captures of before (the 4h build, rebuilt and byte-identical to the `dist/` on disk) and after, with JS off, reduced motion, every image eager and decoded, at home and booking × 390 and 1440 px: **4 of 4 PNGs byte-identical** (same SHA-1; heights home 12 111 / 10 457, booking 7 254 / 5 080). Identical hashes need no control run: a non-deterministic capture could not have matched.
- `shoot.mjs` was not run: no markup that renders changed, so there was nothing to shoot and `clean-shots.mjs` had nothing to clean.

## Checks

| check | result |
|---|---|
| `bash scripts/make-media.sh && npm run build` (before) | clean; `dist/` byte-identical to the one on disk (`diff -rq`) |
| `npm run build` (after) | clean, 2 pages; `dist/` adds `llms.txt`; `index.html` and `robots.txt` differ, `book/index.html` identical |
| JSON-LD | `JSON.parse` OK, 1 block per page; with `SITE_URL=https://example.test/`: `@id` `https://example.test/#business`, offer urls `https://example.test/book/?level=level-{1-fomies,2-rollers,3-riders}`, Freestylers none |
| No JS (Playwright, 390 + 1440, both pages) | 0 facts JS-only; 0 third-party requests |
| llms.txt vs pages | 132 fragments, 0 missing except the 14 field joins listed above; 11 / 11 links on the pages |
| robots.txt | preview and workers.dev: 2 × `Disallow: /` (`*` + 15 bots), no sitemap; `example.test`: `*` Allow + 15 bots Allow + `Sitemap:` |
| `npm test` (repo) | 13 / 13 pass |
| `node tools/check-wiring.mjs` | 16 agents, 0 failures, 2 warnings (taxonomy.md and server-hardening.md are stubs) |

Servers on 8770–8790 were stopped (each script closes its own). The production / workers.dev builds and every capture stayed in scratch. No deploy.
