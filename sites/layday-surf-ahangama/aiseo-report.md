# Layday Surf Ahangama — AI SEO report (station 4i)

aiseo 0.2.0 · run `2026-09-ahangama-02` · 2026-09-23 · site: `sites/layday-surf-ahangama/final/` (4g round 3 build "Inside", after the 4h re-run)

Nothing visible changed, and no copy was written. `shoot.mjs` before vs after: **0 differing pixels on all 26 captures** (proof under "Look").

## What changed, and where

| file | change |
|---|---|
| `final/src/pages/index.astro` | The 4h `Hostel` JSON-LD is **extended, not replaced**: `containsPlace` lists the `rooms[]` rows as `HotelRoom` {`name` ← `rooms[].label`, `description` ← `rooms[].note`, `bed` ← `rooms[].beds` and `occupancy` ← `rooms[].sleeps` only when set}. KA's mapping, plus `description`, because this site's only room fact is in the note. Today: one room, `{"@type":"HotelRoom","name":"Bed in the dormitory","description":"The only room: one air-conditioned dormitory"}`. There is no bed count and no occupancy: `beds`/`sleeps` are null, and the dossier's bed count is an open contradiction (Booking says a 6-bed dorm, a guest says 4 bunk beds) marked "do not publish". Still one block and one graph, and no property of 4h's was changed. |
| `final/shots/aiseo/` | `shoot.mjs` captures of this build. |

Already in place from the 4g port (KA's files) and **verified, not changed**: `src/pages/llms.txt.js`, `src/pages/robots.txt.js` and `AI_CRAWLERS` / `IS_PREVIEW` in `src/lib/site.mjs`. `notes.md`, `seo-report.md`, content, copy and the dossier were not edited.

## Questions identified, and where each is answered

The type is `beach_lodging`: one small dorm next to the Kabalana break. Every answer below is passed copy or seeded content. Nothing here was written at this station.

| # | Question a traveller asks an assistant | Answered on the page (JS off, visible text) | Where | Self-contained with the name? |
|---|---|---|---|---|
| 1 | What is Layday and where is it? | "Layday Surf Ahangama" + "Surf, chill and feel at home in Ahangama"; "Layday is small and new." | h1, hero tag, intro | yes (the name carries the town) |
| 2 | How far is the beach? | "A two-minute walk from Kabalana" (hero headline, `<title>`, description); Beth: "just a 2-min walk to Kabalana Beach" | hero, Beth's quote | **no**: the name is not in the sentence (R1) |
| 3 | What rooms are there? Is there a private room? | "Just one dorm" / "There is only the one dormitory."; row "Bed in the dormitory · The only room: one air-conditioned dormitory" | "Just one dorm", "The room" | no name (R2); also `containsPlace` (new) and llms.txt |
| 4 | How many beds in the dorm? | not stated by the business. Catherine's verbatim quote says "one dorm room with 4 bunk beds" | guest quote only | contradiction, silent on purpose (below) |
| 5 | What does a night cost? | "Rates change with the dates. The booking links show what is available." | footer berth, drawer, llms.txt | gap, silent on purpose |
| 6 | Check-in / check-out? | "Check-in is between 14:00 and 19:00, and check-out is by 14:00." + `dl.times` + "Reception has limited hours." | Practicalities; JSON-LD `checkinTime`/`checkoutTime` (4h) | no name, but it is a complete sentence |
| 7 | Is there parking? | "WiFi is free, and so is the private parking." + "Free private parking (no reservation needed)" | Practicalities, amenities | no name |
| 8 | Can I bring a pet? | "…pets can come at no extra charge." + "Pets allowed (no extra charge)" | Practicalities, amenities | no name |
| 9 | Airport transfer? | "…bicycles to rent and an airport shuttle…" + "Airport shuttle" | Practicalities, amenities | no name. No distance to any airport is in the content |
| 10 | Kitchen? Air-con? Lockers? Hot showers? | "The dormitory is air-conditioned, with lockers and luggage storage. The shared kitchen has a kettle, a dishwasher and kitchenware… The showers are hot." + 19 amenity rows | "The room", amenities; JSON-LD `amenityFeature` (4h) | no name (R2) |
| 11 | Can I pay by card? | "Credit cards are not accepted." | Practicalities, stay note | no name |
| 12 | Is it safe / clean / quiet? | "It is quiet, too."; "super clean", "absolutely spotless"; "24-hour security, CCTV and key access"; Beth: "As a solo female traveller I felt totally safe" | intro, "Just one dorm", amenities, quote | verbatim quotes with author, platform, month |
| 13 | Is it any good? (ratings) | 9.8/10 Hostelworld (10), 10/10 Booking.com (6), 5.0/5 Google (15), each "read 19 September 2026"; "10 out of 10 in every category… though that is from ten reviews" | guests band, "Just one dorm" | label + number + source |
| 14 | Which wave, and is it for beginners? | "Kabalana: a sandy beach break for beginners and intermediates, with The Rock, a reef A-frame for advanced surfers." | wave h2 | self-contained about the waves |
| 15 | How do I find it? (unmarked gate) | "Follow Google Maps. You will come to a large black gate; open it. Through the gate there is a wooden platform with a door through to the Layday area, to the right of the house." + "Open the map" | "Finding the door" | names Layday |
| 16 | Where exactly? | "Warnagiri Welhengoda, Ahangama 80650, Sri Lanka" + "Open the map" | Practicalities, footer; JSON-LD address/geo (4h) | yes |
| 17 | How do I book? | 3 "Check dates on …" links + "+94 77 855 3343" | hero, room row, footer, dock | real links, all work with JS off |
| 18 | Surf forecast today? | "See today's forecast for Kabalana on Rosa" (JS off); live numbers only with JS | wave section | third-party data, correctly JS-only |

**JavaScript off.** Playwright with `javaScriptEnabled: false`, Rosa blocked, at 1440×900 and 390×844, checking `document.body.innerText` (so this is text a person can actually see, not just markup). **56 answer strings checked, 0 missing, at both widths.** Visible links: 9 Hostelworld, 5 Booking.com, 2 Agoda, 4 `tel:`, 2 Google Maps, 2 rosa.surf. Only the forecast numbers need JS, and the fallback link to them is in the HTML. The `#box` canvas is decoration and holds no facts. **Nothing had to be moved.**

**Hidden text.** I added none. There are 0 visually-hidden classes. The one `hidden` element is the "Check dates" drawer (a dialog), and it repeats the rates line and the links that are visible in the footer. The only new thing is JSON-LD `containsPlace`, which mirrors the visible room row.

## FAQPage: declined, on purpose

I declined it for the same reason as KA. The page has no visible questions: every heading is a statement ("Just one dorm", "Finding the door", "Practicalities"). A `FAQPage` would put question text into markup that no reader sees, and hard constraint 2 forbids that (Google's FAQ rules also require the Q&A to be visible). If Shahar wants one, the honest route is R5.

## `/llms.txt`

It is generated at build by `src/pages/llms.txt.js` from `src/tenant/content.json`, so it cannot drift. **It matches the round-3 copy.** A fresh `npm run build` was byte-identical to the `dist/` on disk. All 50 content strings I checked are present: every `copyBlocks[]` heading and paragraph, tagline, spot, address, map URL, stay note, 19 amenity labels, 3 booking URLs, 5 testimonials verbatim, the room label and note. Size: 5 257 B.

Its order: `# Layday Surf Ahangama`, then a blockquote (tagline + "A two-minute walk from Kabalana"), then the **preview line** ("Preview build, not the published site… Do not index, quote or cite it", present only while `IS_PREVIEW`), then the name + address and the intro. After that come the other five copy blocks under their own headings, then `## Rooms`, `## Amenities`, `## Check-in and check-out`, `## The wave`, `## Ratings` (per platform, never averaged), `## What guests wrote`, `## How to book` (3 links + phone), `## Location` and `## Pages`. With `SITE_URL=https://example.test/`, the preview line is gone and the Pages link is absolute (checked on a throwaway build, since deleted). A "Last updated" line is not possible yet, because `updatedAt` is null.

## Crawler policy (owner decision, must be confirmed)

- **Production** (`SITE_URL` on a real domain): `User-agent: *` / `Allow: /`, plus one explicit group naming 15 AI crawlers with `Allow: /` under the comment "owner to confirm": GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot, MistralAI-User. Then `Sitemap:`.
- **Preview** (`dist/` as it stands: no `SITE_URL`, or a workers.dev one): `Disallow: /` for `*` and for every named AI bot, the page has `noindex, nofollow`, and llms.txt has the do-not-cite line. Checked in the current `dist/`.

**Default: allow all.** For a place with no website and no socials (dossier gap), being quotable in "where to stay near Kabalana" answers is the point. **This is the owner's call and has not been put to them.** For the pitch: "AI assistants may read and quote your site. Keep that, or block the training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) and keep live answers?" Either answer is one edit to `AI_CRAWLERS`.

## Facts the content could not support, left unanswered on purpose

- **Bed count / dorm size.** Contradicted (Booking: 6-bed dorm; a Hostelworld guest: 4 bunk beds). Dossier: "Do not publish a bed count." Catherine's quote carries "4 bunk beds" verbatim. It is a testimonial and stays as written, but no field of ours asserts it.
- **Price per night.** Live OTA inventory (dossier gap).
- **Breakfast, children, distance to airport/station/town.** Not in the content. Hostelworld's "1.4 km from the town centre" is in the dossier but not in the passed copy, so it is not used.
- **Surf lessons / board hire.** The business has none of its own (dossier `businessType_note`). No `lessons[]`/`rentals[]`. Silent.
- **Season, WhatsApp, email, reply time, languages spoken.** Gaps.
- **`aggregateRating` / `review` markup.** Still omitted, for 4h's reasons.

## Recommendations (visible changes, so not made)

All of these need copy work (4a → 4c) or a schema field. The facts are already in the passed copy.

- **R1. Name in the distance sentence.** The most-asked question has no sentence that carries the name, the beach and the distance together. For example, the intro could open "Layday Surf Ahangama is a two-minute walk from Kabalana Beach."
- **R2. Name in the room sentence.** "There is only the one dormitory." could become "Layday has only the one dormitory." The same goes for "The dormitory is air-conditioned…".
- **R3. Map link label.** "Open the map" ×2 (4h item 5). KA's "Open in Google Maps" says where the link goes.
- **R4. Visible last-updated date** from `updatedAt` (null until the tenant exists). This is a design call for Shahar.
- **R5. A visible FAQ block** would make an honest `FAQPage` possible. It needs an `faq` slot in `copyBlocks[].slot` (schema proposal, not made). The candidates the content already answers are questions 2, 3, 6, 7, 8, 11 and 15. Question 15 ("how do I find it?") is this business's real problem (dossier gap `location.finding_it`).
- **R6. Entity clarity.** Hostelworld and guests write "Lay Day" / "LayDay". I back 4h's `alternateNames[]` proposal, because without it a model may not join those mentions to this business.

## Measured

| | after 4h re-run | after 4i |
|---|---|---|
| `index.html` | 62 419 B | 62 550 B (+131 B: `containsPlace`, at the end of `<body>`) |
| JSON-LD | 1 block, 12 keys; 15 with `SITE_URL` | 1 block, 13 keys (+`containsPlace`); 16 with `SITE_URL` |
| `llms.txt` | 5 257 B | 5 257 B (unchanged) |
| JS-off answer strings | — | 56 checked, 0 missing (1440 and 390) |

I did not re-run the LCP audit. The only byte change is 131 B inside the JSON-LD block that 4h already moved behind first paint.

### Look (no visible change)

`tools/shoot.mjs` ran on the after build (`final/shots/aiseo/`) and on the before build (the untouched 4h `dist/`, in scratch), both served locally on 8750/8751. Page heights match (desktop 9 162, mobile 10 341), and so do the capture counts (12 / 14). **An exact RGBA compare gives 0 differing pixels on all 26 captures.** The HTML diff against the before build is the JSON-LD line only.

## Checks, verbatim

```
$ npm run build   (before the edit)      → dist byte-identical to the dist on disk (diff -rq: none)
$ npm run build   (after the edit)       → Complete, 0 warnings; diff vs before: index.html, JSON-LD line only
JSON-LD (dist): 1 block, 13 keys: @context,@type,name,description,telephone,address,geo,hasMap,
  checkinTime,checkoutTime,amenityFeature,containsPlace,sameAs
  containsPlace: [{"@type":"HotelRoom","name":"Bed in the dormitory","description":"The only room: one air-conditioned dormitory"}]
JSON-LD (SITE_URL=https://example.test/, scratch outDir): 1 block, 16 keys, @id https://example.test/#business, no noindex
noJS (Playwright, JS disabled, innerText): 1440 → checked 56 missing [] · 390 → checked 56 missing []
  visible hrefs: hostelworld 9 booking 5 agoda 2 tel 4 gmaps 2 rosa 2 · visually-hidden classes 0
llms.txt: fields checked 50 missing [] · 5257 B
robots.txt dist (preview): Disallow: / for * and 15 AI bots · prod build: Allow: / for * and 15 AI bots + Sitemap
shoot.mjs after vs before: 26/26 captures 0 px differing
servers on 8750–8759: none listening
```
