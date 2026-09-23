# The Lavish Haven — AI SEO report (station 4i)

aiseo 0.2.0 · run `2026-09-ahangama-02` · 2026-09-23 · site: `sites/the-lavish-haven/final/` (4g gold-page build, after the 4h SEO pass)

Nothing visible changed, and no copy was written. Outside the one JSON-LD `<script>`, the new `dist/index.html` is byte-identical to the 4h build. Pixel proof is under "Look".

## What changed, and where

| file | change |
|---|---|
| `final/src/pages/index.astro` | The 4h `Hotel` JSON-LD is **extended, not replaced**. `containsPlace` now lists the nine `rooms[]` rows as `HotelRoom` {`name` ← `label`, `bed` ← `beds`, `description` ← `note` (only "ground floor" today), `occupancy.maxValue` ← `sleeps` (4 ×4, 5 ×1)}. This is KA's shape plus `description`. It is still one block and one graph, with no property duplicated or changed. |
| `final/src/pages/llms.txt.js` | The room rows now sit under the rooms block's own heading ("Nine kinds of room", `offer[0]`, the page's binding) instead of a separate `## Rooms` placed after "Practicalities". Added "Last updated: <date>" from `updatedAt`. That field is null in the seed, so the line is omitted today (KA's mechanics). |
| `final/shots/aiseo/` | `shoot.mjs` captures of this build. |

The rest was already in place from 4g/4h, carried over from KA/Layday, and was verified here: `robots.txt.js`, `AI_CRAWLERS` in `src/lib/site.mjs`, and the preview rule. `notes.md`, `seo-report.md`, `audit.json` and `content.json` were not edited.

## Questions identified, and where each is answered

Type `beach_lodging` (a Hotel per 4h), two minutes from Kabalana. The "JS off" column is `dist/index.html` with scripts, styles and SVG stripped.

| # | Question a traveller asks an assistant | Answer on the page (JS off) | Where | Self-contained with the name? |
|---|---|---|---|---|
| 1 | What is The Lavish Haven and where? | h1 "The Lavish Haven"; "A new hotel, two minutes from Kabalana"; title "The Lavish Haven, Ahangama" | bar h1, hero display line, `<title>` | name and "hotel" are never in one sentence (R1). llms.txt has "The Lavish Haven, No166/1 Walhengoda Road, Ahangama 80650, Sri Lanka." |
| 2 | How far is the beach? | "The beach is two minutes from the hotel, on foot." + the tagline | wave section, hero | **no** (R1) |
| 3 | What rooms are there? Anything for a family of 4–5? | 2 paragraphs + 9 rows ("Family studios and suites sleep four, and the two-bedroom suite sleeps five.") | "Nine kinds of room"; JSON-LD `containsPlace`; llms.txt | no name (R2) |
| 4 | What does a night cost? | "There is no published price list. Rates go by date, and the booking links show what is available." + closing | rooms, closing, drawer | a deliberate gap (below) |
| 5 | Is there a pool? | "The outdoor pool is in the middle of the hotel and open all year." | night line, "Pool, restaurant, spa", amenities | no name |
| 6 | Food / is breakfast served? | "The restaurant serves breakfast with local specialities and fresh pastries, plus Chinese, Indian and Italian dishes." | "Pool, restaurant, spa" | no name. *Included* in the rate: not in the dossier, left silent |
| 7 | Check-in / check-out times? | No times. "The front desk is staffed 24 hours, with private and express check-in." | "Practicalities", amenities | gap (dossier `stayInfo`) |
| 8 | Parking? | "Parking is free and private, but you need to reserve it." | "Practicalities", amenity row | no name. It does not promise easy parking (dossier contradiction respected) |
| 9 | From the airport? | "Koggala Airport is about 5 km away." "There's an airport shuttle as well." | "Among cafés and restaurants", "Practicalities" | no name |
| 10 | Kids / families? | "For families there are the family rooms and an outdoor play area. Kids' meals and babysitting cost extra." | "Pool, restaurant, spa" | no name |
| 11 | Wi-Fi, A/C, working remotely? | "Each room has a work desk, soundproofing and free WiFi. The family rooms have air conditioning and private bathrooms." | rooms | no name. A/C is stated for the family rooms only, as the copy has it |
| 12 | Accessibility? | "Facilities for disabled guests"; the deluxe king is on the ground floor | amenities, room row, `containsPlace[0].description` | list items |
| 13 | Which wave, and is it for beginners? | "Kabalana: a sandy beach break for beginners and intermediates, with The Rock reef A-frame for advanced surfers." | wave section; llms "The wave" | self-contained about the wave |
| 14 | Is it any good? | 9.2/10 Booking.com (34), 5.0/5 Google (21), "read 19 September 2026"; category scores 9.6 location, 9.7 cleanliness/comfort, 9.4 staff; five verbatim quotes | hero, "New, and it shows", guests | label + number + source |
| 15 | Is it new? | "The hotel is new. On Booking.com one guest calls it "brand new"…" | "New, and it shows" | no name |
| 16 | How do I book? | 13 Booking.com + 2 Agoda links, `tel:+94764832988` ×2 | bar, rows, drawer, footer | real links, work with JS off |
| 17 | Where exactly? | "No166/1 Walhengoda Road, Ahangama 80650, Sri Lanka" + "Open in Google Maps" | footer; JSON-LD address/geo (4h) | yes |
| 18 | Surf forecast today? | link "See today's forecast for Kabalana on Rosa"; numbers only with JS | wave section | third-party live data, correctly JS-only |

**JavaScript off.** 37 answer strings were checked, and **0 are missing**. With JS off the raw HTML has these links: 13 Booking.com, 2 Agoda, 2 `tel:`, 1 Google Maps, 2 rosa.surf. Only the forecast numbers and the drawer's "You were looking at the <room>" line need JS. Both are interface, not facts. **Nothing had to be moved.** The WebGL pool and the SVG rim are decoration and hold no facts.

**Hidden text.** None added. The HTML has 0 visually-hidden classes, and nothing on the page changed. Everything new is in `llms.txt` and the JSON-LD `containsPlace`, which is standard metadata that mirrors the visible room list row for row.

## FAQPage: declined (same reason as KA)

No question is asked on the page. Every heading is a statement ("Nine kinds of room", "Practicalities"). A `FAQPage` would have to carry question text that no reader sees, which breaks hard constraint 2 and Google's visible-content rule. **If Shahar wants one**, the route is a visible FAQ block (R4).

## `/llms.txt` contents

`src/pages/llms.txt.js` generates the file at build time from `content.json`, so it cannot diverge from the page. It is 5 287 B on the preview build. Contents in order:

1. `# The Lavish Haven`. A blockquote of tagline + intro heading. **On a preview build**, the line "Preview build, not the published site… Do not index, quote or cite it." Then "The Lavish Haven, <address>." and the intro body.
2. One section per remaining copy block under its own heading: "New, and it shows", "Staying longer", **"Nine kinds of room" followed by the nine room rows** (label, beds, note, sleeps), "Pool, restaurant, spa", "Practicalities".
3. `## Amenities` (25 rows with notes). `## Check-in and check-out` (holds only `stayInfo.note`, since there are no times). `## The wave` (`spot`). `## Rates` (`closing`).
4. `## Ratings` (platform, score/scale, count, "read <date>"). `## What guests wrote` (the five quotes verbatim with author and platform).
5. `## How to book` (Booking.com, Agoda, phone). `## Location` (address, map link). `## Pages` (the site URL: absolute with `SITE_URL`, `./` without; the Rosa forecast link). "Last updated" appears once `updatedAt` exists.

Only section labels are template wording. One content field reaches llms.txt but not the page: `stayInfo.note`, "The front desk is staffed 24 hours, with private and express check-in and check-out." The page says the same thing in "Practicalities" plus the amenity row "Private and express check-in / check-out", so the facts agree. The wording differs.

## Crawler policy (owner decision, must be confirmed)

- **Production build** (`SITE_URL=https://example.test/`, throwaway): `User-agent: *` / `Allow: /`, then one group naming 15 AI crawlers with `Allow: /` under the comment "owner to confirm": GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot, MistralAI-User. Then the `Sitemap:` line.
- **Preview build** (the `dist/` left in place): `Disallow: /` for `*` and repeated for every named AI crawler, plus the page's `noindex, nofollow` meta. Unchanged from 4h.

**Default: allow all.** The site competes on answers to "where to stay near Kabalana", so it needs to be readable. **This has not been put to the owner.** For the pitch: "AI assistants may read and quote your site. Keep that, or block the training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) while keeping live answers?" Either answer is a one-line edit to `AI_CRAWLERS`.

## Facts the dossier could not support, left unanswered on purpose

- **Price per night**: live OTA inventory (dossier `gaps[]`, `offers: []`).
- **Check-in / check-out times**: dossier gap. The page says only that the front desk is staffed 24 hours.
- **Breakfast included or not**: the dossier says the restaurant serves breakfast, not that the rate includes it.
- **Season / best months**: `season: null`. **Pets**: nothing in the dossier. **Languages spoken**: `languagesSpoken` is empty. **WhatsApp, email**: gaps.
- **Room count** ("17 rooms"): the dossier marks it unresolved, so it is not published. Nine room *types* are listed.
- **Surf lessons / board hire**: no `lessons[]`/`rentals[]`. Only "Bicycle rental".
- **`aggregateRating` / `review` markup**: still omitted (Shahar's KA decision, applied as 4h did).

## Recommendations (visible changes, so not made)

These need copy work (copywriter → humanizer → copyeditor) or a schema field. Every fact below is already on the page.

- **R1. A sentence that names the hotel, the place and the beach.** Suggested replacement for the wave's small line: "The Lavish Haven is two minutes on foot from Kabalana Beach in Ahangama." Or add it as the intro's first sentence. No sentence on the page today carries name + beach + distance together, and that pairing is the most-asked question.
- **R2. Rooms paragraph with the name**: "The Lavish Haven has king rooms with a balcony or a garden view…".
- **R3. A visible last-updated date** (base.md §5) from `updatedAt`. It is null until a tenant exists and would add a visible footer line, so it is a design call. llms.txt already picks it up automatically.
- **R4. A visible FAQ block** (playbook §3 item 8), which would make an honest `FAQPage` possible. The schema has no `faq` slot, so `copyBlocks[].slot` would need one (a proposal, not made). Questions 2, 3, 5, 8, 9 and 10 above are answerable from the dossier.
- **R5. Entity clarity**, same as 4h "Still wrong" 1 and 4. Google's name is "The Lavish Haven Hotel And Resort", and the site uses "The Lavish Haven". `alternateNames[]` → `alternateName` and `socials[]` → `sameAs` (Tripadvisor and the Google listing are both in the dossier) would stop a model from treating the OTA listing and Google's listing as two businesses. I support both. I added neither, because no field exists.

## Measured

| | after 4h | after 4i |
|---|---|---|
| `dist/index.html` | 57 201 B (gzip -9 18 252) | 58 239 B (gzip -9 18 392) |
| JSON-LD | 1 block, 10 keys; 13 with `SITE_URL` | 1 block, 11 keys (+`containsPlace`, 9 HotelRoom); 14 with `SITE_URL` |
| `llms.txt` | 5 297 B | 5 287 B |

The +1 038 B (+140 B gzip) is the `containsPlace` array, which sits at the end of `<body>` where 4h placed the block. It is an inert data script after all content, so LCP was not re-measured. `llms.txt` and `robots.txt` are not fetched on page load.

### Look (no visible change)

- **Source level:** with the `application/ld+json` block removed, the before and after `index.html` are identical strings.
- **Frozen full-page pixel diff** (Playwright; before and after served on 8760/8761; third parties blocked; images eager and awaited; CSS animation off; full-height viewport). Configurations: 1440×900, 390×844 @2x and 1920×1080, each with JS off and with JS on + reduced motion. Result: **0 differing pixels in all 6** (1440×8787, 780×18890, 1920×9214). A before-vs-before control run with the same method was also 0 in all 6. An earlier attempt that used `fullPage` capture gave random "differences" in the control as well: one photo left unpainted. That is a capture flake, and the method was changed as described.
- **shoot.mjs** `final/shots/aiseo/` vs the before build (scratch): same page heights (desktop 10 273, mobile 11 389) and capture counts (13 / 15), `errors []`. 18 of 28 captures differ by 0.00 %. The 10 that differ are the hero frames (live WebGL pool and swell, 00–03) and the forecast widget (desktop-10, mobile-13). A before-vs-before control shoot differs in the same frames by similar amounts (for example desktop-01 19.0 % vs control 11.0 %, mobile-02 7.5 % vs control 24.6 %). That is animation, as 4h found.

## Checks, verbatim

```
$ npm run build                     (in final/)
[build] 1 page(s) built · Complete!   (0 warnings)
JSON-LD parse (dist): 1 block, keys @context,@type,name,description,telephone,address,geo,hasMap,amenityFeature,containsPlace,sameAs · containsPlace 9 HotelRoom
JSON-LD parse (SITE_URL=https://example.test/, throwaway outDir): 1 block, 14 keys, @id https://example.test/#business, containsPlace 9
non-LD HTML identical to the 4h build: True
noJS text: checked 37 missing []
hrefs: booking 13 agoda 2 tel 2 gmaps 1 rosa 2 · visually-hidden classes: 0
GET /llms.txt → 200 (8761)
robots.txt (dist, preview): "Disallow: /" for * and the 15 named AI crawlers — unchanged byte for byte
robots.txt (example.test): * Allow + 15 AI crawlers Allow + Sitemap line · llms.txt "## Pages" → https://example.test/, no preview line
frozen pixel diff after vs before: 1440-nojs 0 · 1440-rm 0 · 390-nojs 0 · 390-rm 0 · 1920-nojs 0 · 1920-rm 0 (control 0 ×6)
shoot.mjs: desktop 13 captures 10273px · mobile 15 captures 11389px · errors []
```

Servers on 8760–8762 were stopped. The throwaway production build and all comparison captures stayed in scratch. Nothing was written outside `sites/the-lavish-haven/`: no ledger line, no commit, no deploy.
