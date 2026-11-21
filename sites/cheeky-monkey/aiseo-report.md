# Cheeky Monkey Surf Camp — AI SEO report (station 4i)

aiseo 0.2.2 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-03 · site: `sites/cheeky-monkey/final/` (the 4g build after the 4h SEO pass and the preview rule)

Nothing visible changed and no copy was written. Apart from the JSON-LD block, the built `index.html` is character for character the same as before this station (checked: the before and after files match once the ld+json script is removed). Conventions follow `sites/ka-surf-hostel-and-restaurant/` (4i there).

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/site.mjs` | `AI_CRAWLERS`: bot name → `'allow'` / `'disallow'`, the same 15 bots as KA. This is template plumbing, not content (playbook §9). `businessLd` is **extended, not replaced**: it adds `containsPlace`, the five `rooms[]` rows as `HotelRoom` {`name` ← `label`, `bed` ← `beds`, `occupancy.maxValue` ← `sleeps`, `floorSize` m² ← the number the row's `note` starts with}. There are no room prices, because room rates are live Booking.com inventory. It is still one block and one graph, and no 4h property was changed. |
| `final/src/pages/robots.txt.js` | 4h's file, now the same as KA's `robots.txt.js`. **Preview** (no `SITE_URL`, or a workers.dev / localhost one): `*` `Disallow: /`, then every named AI crawler in its own group, also `Disallow: /`, and no Sitemap line. **Real domain**: `*` `Allow: /`, a named AI group `Allow: /` marked "owner to confirm", an optional disallow group, and the Sitemap line. |
| `final/src/pages/llms.txt.js` (new) | `dist/llms.txt`, generated from `src/tenant/content.json` at build time (contents below). |

Nothing was written outside `sites/cheeky-monkey/`. `notes.md`, `seo-report.md`, `copy/` and `content.json` were not edited.

## Questions identified, and where each is answered

The type is `surf_camp`: rooms plus lessons, with a surf shop. "Name?" asks whether the extractable sentence carries the business name (base.md §2).

| # | Question a traveller asks an assistant | Answer on the page (JS off) | Where | Name? |
|---|---|---|---|---|
| 1 | What is Cheeky Monkey and where is it? | "Cheeky Monkey is a surf and yoga camp on the main road through Midigama, close to the main point breaks." + h1 "Cheeky Monkey Surf Camp \| Midigama, Sri Lanka" | intro, h1 | yes |
| 2 | How far is the beach? | "Cheeky Monkey is on the Galle–Matara main road. Booking.com puts Midigama Beach 350 m away and Midigama train station 800 m, … Koggala Airport at 10 km." | Getting here | partly. The name is in the first sentence and the distances are in the second (R1) |
| 3 | Do they teach beginners? What does a lesson cost? | "USD 20 per person \| 90 min surf lesson", "Beginner \| intermediate \| advanced", "Published 2021, call to confirm"; private and group (max 6) lessons, SUP, surf spot tour | lesson card, drawer | no (R2) |
| 4 | What does a surf week cost, and what is included? | four package cards, USD 250–400 per person for 7 nights by room type, each dated 2021; the inclusions list (7 nights, 7 breakfasts, 5 dinners, yoga, gym, board + transport for the lesson packages) | Surf weeks | the packages are named; the business name is not in the sentence |
| 5 | What does a night cost? | No price. "See the rooms and live dates on Booking.com." | closing, drawer | gap, left silent on purpose (below) |
| 6 | What rooms are there? | 5 rooms with beds, sleeps and m²; A/C, private bathroom and private entrance in every room | The rooms; JSON-LD `containsPlace`; llms.txt | as labels |
| 7 | Check-in and check-out times, house rules? | "Check-in 14:00–19:00 \| check-out 06:00–11:00"; "Adults only. No pets, no smoking, no extra beds. Cash only. …" | Staying here; JSON-LD `checkinTime` / `checkoutTime` (4h) | as labels |
| 8 | Can I rent a board? | "There are 400 boards for rent, in different sizes, tails and colours."; rentals list, brands; board repair | Baba's Surf Shop | no. There is no rental price (gap) |
| 9 | Is there parking / WiFi / a gym? | the amenities line: "Free private parking (reservation needed)", "Free WiFi (57 Mbps)", "Gym" … | Up on the roof; JSON-LD `amenityFeature` (4h) | list items |
| 10 | When is the season? | "The best time is from October till March or April. The waves are nice and the beach is clean." | Down at the water | no name; it is about the place |
| 11 | Which wave? | "Close to the main point breaks, with many more surf breaks a short walk away." | Down at the water | no break is named (dossier gap `location.spot`) |
| 12 | Is it any good? | Google 4.5/5 (467), Booking.com 8.3/10 (45), each read 26 Oct 2026; 11 verbatim quotes with author, source and month | What guests say | label + number + source |
| 13 | How do I book? | "Check dates on Booking.com" (22 links), phone +94 71 924 8686 (11 `tel:`), email (9 `mailto:`), Instagram DM | header, cards, rooms, closing, footer, phone bar | real links, all work with JS off |
| 14 | Airport transfer? | "Airport drop USD 65 \| Airport pick-up USD 65 \| Airport drop and pick-up USD 130 \| published 2021" | Getting here | no |
| 15 | Where exactly? | "Galle - Matara Main Road, Midigama East Midigama, Ahangama 80650, Sri Lanka" + "Open in Google Maps" | Getting here, footer; JSON-LD address / geo (4h) | yes |

**JavaScript off.** I checked `dist/index.html` with scripts, styles and SVG stripped: 54 answer strings, 53 present. The one miss was "Maximum 6", which the page renders as "maximum 6" (lower-cased by the template), so it is present as rendered. **Nothing had to be moved.** The plan drawer is an in-page `#book` section without JS. The WebGL canvas and the drawn beach are decoration (`aria-hidden`) and hold no facts. With JS on, the drawer only adds the computed week total, which repeats the card rows.

**Hidden text.** None added. The three `class="sr"` elements (the load-status note and the "Book" / "Instagram" section headings) are the 4g build's own accessible headings, unchanged. Everything new lives in `robots.txt`, `llms.txt` and the JSON-LD.

## FAQPage: declined, on purpose

The page has no visible questions. Every heading is a statement ("Lessons for your level", "Getting here"). A `FAQPage` would put question text into markup that no reader sees, which hard constraint 2 and Google's FAQ rules forbid. The same decision was made for KA. The honest route is a visible FAQ block (R4).

## `/llms.txt` contents

It is generated by `src/pages/llms.txt.js` from `content.json`, with the same helpers as the page (`site.mjs`), so it cannot diverge from the page. It is 10.3 KB.

1. `# Cheeky Monkey Surf Camp`, a blockquote of the `tagline`, then **on a preview build** "Preview build, not the published site: … Do not index, quote or cite it." (the KA rule). Then "Cheeky Monkey Surf Camp, <contact.address>." and the intro body.
2. One section per `copyBlocks[]` row, under its own heading, with the rows the page shows next to it:
   - "Lessons for your level" + the five `lessons[]` rows (USD 20, 90 min, levels, "price published in 2021").
   - "A week of surf" + the 12 package `priceList[]` rows with their notes.
   - "Baba's Surf Shop" + `rentals[]` and `brands[]`.
   - "Getting here" + the three airport-transfer rows.
   - Also "Three rooms in 2009", "Up on the roof" and "Good to know".
3. `## Rooms` (5 rows), `## Check-in and check-out` (`stayInfo` + the house rules), `## Amenities` (16), `## The wave` (`spot`, `season`).
4. `## Ratings` (linked, with the capture date) and `## What guests wrote` (11 quotes, verbatim, with author, source and month).
5. `## How to book`: the `closing` line, the two `bookingLinks[]`, phone and email. `## Location`: address and map. `## Pages`: `./` on a preview build, the absolute site URL with `SITE_URL`.
6. "Last updated: <date>" comes from `updatedAt` once the CMS supplies it. It is null in the seed, so it is omitted.

Only the section labels and the "levels:" / "sleeps" words are template wording. Every sentence is a content field, or the `gaps.json` lesson-price year that the page already shows.

## Crawler policy (owner decision, must be confirmed)

- **Real domain:** `*` `Allow: /`, plus one group naming GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot and MistralAI-User, each `Allow: /`, with the "owner to confirm" comment.
- **Preview (today):** everything is refused. `*` gets `Disallow: /`, and so do all 15 named bots, because a named bot ignores the `*` group.

**The default is allow.** Being quotable for "where to surf and stay in Midigama" is the point. **This is the owner's call and has not been put to them.** Put it in the pitch as a question: keep it as it is, or block the training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) and keep live answers. Either way it is one edit to `AI_CRAWLERS`.

## Facts the dossier could not support, left unanswered on purpose

- **Price per night.** Room rates are live Booking.com inventory (the schema rule "Live prices are not content"). The page links to the listing. The 2021 B&B rates (USD 20–27) are on an orphan page and are not used.
- **Board rental price, period and deposit** (dossier gap): silent.
- **The name of the break.** The business never names it (gap `location.spot`). Nothing like "Rams" or "Coconuts" was added.
- **Opening hours** (the shop and the café): the sources conflict, `openingHours[]` is empty, and nothing is stated.
- **WhatsApp:** none is published. llms.txt would print it from `contact.whatsapp` if one is ever set.
- **Instructors, ratios, "ISA certified":** the certification claim is on a 2021 orphan page only, and `credentials[]` is empty. Silent.
- **Whether it is open now.** The dossier records a May 2025 banner and a Facebook "closed for low season" note against Booking.com and Instagram activity in Oct 2026 (non-blocking gap). Nothing is claimed either way. The owner must confirm before go-live.
- **`makesOffer` with prices.** Declined. Every price is from 2021, and an `Offer` would carry the number without the date, so an engine would quote it as current. The visible page and llms.txt keep the "published 2021" wording on every row. `aggregateRating` / `review` stay omitted (Shahar's no-ratings-markup decision, 4h).

## Recommendations (visible changes, so not made)

These need copy work (copywriter → humanizer → copyeditor) or a schema field. Every fact is already in the dossier and on the page.

- **R1. Name in the distance sentence.** "Cheeky Monkey is 350 m from Midigama Beach, on the Galle–Matara main road (Booking.com's distances)." This is the most-asked question, and no single sentence today carries the name, the beach and the distance together.
- **R2. Name in the lesson sentence.** "Cheeky Monkey's surf lessons are 90 minutes for beginner, intermediate and advanced surfers, at USD 20 per person (published 2021)."
- **R3. Visible last-updated date** (base.md §5), from `updatedAt`. It is null until a tenant exists. A footer line would be a design decision. llms.txt already prints it when the field is set.
- **R4. A visible FAQ block** (playbook §3 item 8) as `copyBlocks[]` rows. It would need a `faq` slot value in `schemas/site-content.md` (a proposal, not made here). The questions the dossier can answer are 2, 3, 4, 7, 8, 9, 10 and 14 above.
- **R5. Entity clarity.** I back 4h's proposals B (`alternateNames[]`: "Cheeky Monkey" on Google, "Baba's Surf Shop") and C (`socialLinks[]` as a shared module). Without them, a model may split the facts between the Google listing, the shop's own listing and the old site.

## Measured

| | after 4h | after 4i |
|---|---|---|
| `index.html` | 101,471 B | 102,471 B (+1,000 B, the `containsPlace` array) |
| JSON-LD (no `SITE_URL`) | 1 block, 15 keys | 1 block, 16 keys (+`containsPlace`, 5 rooms) |
| JSON-LD (`SITE_URL=https://example.com/`) | 18 keys | 19 keys, `@id` `https://example.com/#business` |
| `llms.txt` / `robots.txt` | — / 3 lines | 10,299 B / preview refusal with 15 named bots |

`llms.txt` and `robots.txt` are not fetched on page load, so first-load transfer, LCP, CLS and third-party requests are unchanged. The HTML is +1 KB, about 0.2 KB gzip.

## Checks

```
npm run build (plain)                → /llms.txt, /robots.txt, /index.html; no sitemap
  robots.txt: preview comment, * Disallow: /, 15 named AI bots Disallow: /
  index.html: <meta name="robots" content="noindex, nofollow">; llms.txt carries the preview line
SITE_URL=https://example.com/ astro build --outDir <scratch>   (deleted afterwards)
  robots.txt: * Allow: /, 15 named bots Allow: /, Sitemap: https://example.com/sitemap.xml
  sitemap.xml built; no robots meta; llms.txt: no preview line, Pages → https://example.com/
  JSON-LD parses, 19 keys
before/after index.html with the ld+json script removed: identical
noJS text: 54 checked, 0 missing as rendered
links: booking.com 22 · tel 11 · mailto 9 · instagram 9
final: plain npm run build; http://localhost:8950/llms.txt → 200 text/plain
```

No network schema validator was used. `HotelRoom` takes `bed` (Text), `occupancy` and `floorSize` (QuantitativeValue, `MTK` = m²). `containsPlace` is a Place property, which LodgingBusiness inherits.
