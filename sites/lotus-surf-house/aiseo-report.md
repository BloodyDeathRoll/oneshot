# Lotus Surf House — AI SEO report (station 4i)

aiseo 0.2.2 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-04 · site: `sites/lotus-surf-house/final/` (the 4g build after the 4h SEO pass)

The designer ported the AI plumbing from cheeky-monkey at 4g: `AI_CRAWLERS`, the preview-aware `robots.txt.js` and a generated `llms.txt.js`. 4h added `containsPlace` and `geo` to the JSON-LD. At this station I checked each piece against the dossier and the passed copy, and closed two small holes. I wrote no copy and changed nothing visible. Apart from the JSON-LD block, the built `index.html` is the same as before this station, character for character.

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/site.mjs` | New `floorSize(note)`. `businessLd.containsPlace` now gives each `HotelRoom` a `floorSize` (QuantitativeValue, `MTK` = m²), read from the m² figure that the room's `rooms[].note` prints. "20–25 m²" becomes min 20 / max 25, and "25 m²" becomes value 25. These match dossier `room_types[].size_m2`: [20, 25], [25], [25], [25]. The page already shows each note, so this adds no fact. A note with no m² figure gives no `floorSize`. It is still one block and one graph, and no 4h property changed. |
| `final/src/pages/llms.txt.js` | Ratings now print to one decimal, as the page does: "9.0/10", not "9/10". Before, llms.txt and the page disagreed on how they wrote the same score. |

Nothing was written outside `sites/lotus-surf-house/`. I did not edit `notes.md`, `seo-report.md`, `copy/`, `content.json` or `gaps.json`. `robots.txt.js` and `AI_CRAWLERS` were already complete, so I left them as they were.

## Questions identified, and where each is answered

The type is `beach_lodging`: rooms and breakfast, with no lessons, rentals or shop (dossier `business.type`). "Name?" means: does the extractable sentence carry the business name? (base.md §2)

| # | Question a traveller asks an assistant | Answer on the page (JS off) | Where | Name? |
|---|---|---|---|---|
| 1 | What is Lotus Surf House, and where is it? | h1 "Lotus Surf House" + "A guesthouse in Midigama, on the south coast of Sri Lanka." | hero | in the h1, not in the sentence (R1) |
| 2 | How far is the beach? | "Midigama Beach 250 m (Booking.com)" | at a glance (`gaps.glance`, from `spot`) | no. The full `spot` sentence is in llms.txt only (R2) |
| 3 | How do I get there? Is there a train? | "Midigama railway station is 50 m from the house, so you can come by train." + "Booking.com lists Ahangama Beach at 1.4 km, Weligama Beach at 4.2 km and Koggala Airport at 9 km." | Getting here | "the house" |
| 4 | What rooms are there? Is there AC or hot water? | 4 room types, with beds, sleeps, m² and floor. "Fan and mosquito net; no air conditioning and no hot water" (garden rooms) / "Air conditioning, fan, mosquito net and hot water" (King) | King band, garden list; JSON-LD `containsPlace` (now with `floorSize`); llms.txt | as labels |
| 5 | Is breakfast included, and when? | "Breakfast is included, and you can have it any time from 8 to 10 in the morning." | Breakfast; the glance line | no |
| 6 | Check-in and check-out times? | "Check-out 11:00–12:00 \| Check-in at any hour \| Cash only"; "Check-in at any hour, day or night." | under the King buttons; Good to know; JSON-LD `checkoutTime` (4h) | as labels |
| 7 | Parking, children, pets, payment? | "Cash only. Children welcome; no cots or extra beds. Pets on request, at no charge. No parking." | Good to know | as labels |
| 8 | WiFi, kitchen, airport shuttle, bikes, laundry? | the amenities line (12 items, with "additional charge" where it applies) | Getting here; JSON-LD `amenityFeature` (4h) | list items |
| 9 | Who runs it? | "Yelum owns the house." | Yelum | the owner's name, not the business name |
| 10 | Is it any good? | Booking.com 9.0/10 (125), Google 4.9/5 (78), each read 3 Nov 2026; 12 verbatim quotes with author, country, source and month | at a glance, Guests, footer fine print | label + number + source |
| 11 | How do I book? What does a night cost? | "Live dates and prices are on Booking.com. If you'd rather ask us something first, call." There are 9 Booking.com links and `tel:+94774647541` | header, King band, garden, closing, footer, phone bar | gap: no price (below) |
| 12 | Where exactly? | "Indhana Rd, Midigama 80650, Sri Lanka" + "Open in Google Maps" | Getting here, footer; JSON-LD address / geo (4h) | the footer pairs it with the name |
| 13 | Is it the same place as Yelum Guest House? | "On Google you may also find the house under its old name, Yelum Guest House." | Getting here | "the house" |

**JavaScript off.** I stripped scripts, styles and SVG from `dist/index.html` and read what was left. Every answer in the table is present as server-rendered text, and so are all 12 quotes. `audit-mockup` measures the no-JS text at 7,624 characters, the same as before this station. **Nothing had to be moved.** The slideshows are plain scroll rows without JS, and no fact lives only in an image, a canvas or a script.

**Hidden text.** I added none. The page has no `.sr` text. The `display:none` rules belong to the 4g build and hide no facts. They cover scrollbars, the `[hidden]` slideshow controls, the phone bar on desktop, the header nav and the small button on a phone, and the glance separators. Every one of those items is repeated elsewhere on the page. Everything this station changed is in the JSON-LD and `llms.txt`.

## FAQPage: declined, on purpose

The page has no visible questions. Every heading is a name or a statement ("In the garden", "Getting here", "Good to know"). A `FAQPage` would put question text into markup that no reader sees, which hard constraint 2 and Google's FAQ rules forbid. KA and cheeky-monkey made the same decision. The honest route is a visible FAQ block (R4).

## `/llms.txt` contents

`src/pages/llms.txt.js` generates it at build time from `content.json`, using the same helpers as the page, so it cannot drift from the page. It is 7,862 B on the preview build.

1. `# Lotus Surf House` and a blockquote of the `tagline`. **On a preview build** it then says "Preview build, not the published site: … Do not index, quote or cite it." Then comes "Lotus Surf House, Indhana Rd, Midigama 80650, Sri Lanka."
2. One section per `copyBlocks[]` row, under its own heading: In the garden, Yelum, Breakfast, Old rooms and new, Up on the roof, Getting here.
3. `## Rooms` (4 rows: label, beds, sleeps and the note), `## Check-in and check-out` (check-out 11:00 to 12:00, plus `stayInfo.note`), `## Amenities` (12) and `## The beach` (`spot`: "Booking.com puts Midigama Beach 250 m from the house."). `season` is null, so there is no season line.
4. `## Ratings` (linked, with the read date, now "9.0/10") and `## What guests wrote` (12 quotes, verbatim, with author, country, source and month).
5. `## How to book`: the `closing` line, the Booking.com link and the phone. There is no WhatsApp or email, because none is published. `## Location`: the address and the Google Maps link.
6. `## Pages`: `./` on a preview build, and the absolute URL with `SITE_URL`. "Last updated" is printed only when `updatedAt` is set. It is null in the seed, so the line is omitted.

The only template wording is the section labels and "sleeps". Every sentence is a content field.

## Crawler policy (owner decision, must be confirmed)

- **Real domain:** `*` `Allow: /`, plus one group naming GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot and MistralAI-User, each `Allow: /` with the comment "owner to confirm". Then the `Sitemap:` line.
- **Preview (the `dist/` now, and any workers.dev or localhost SITE_URL):** everything is refused. `*` gets `Disallow: /`, and so do all 15 named bots, because a named bot ignores the `*` group. There is no Sitemap line and no `sitemap.xml`, and the page carries `<meta name="robots" content="noindex, nofollow">`.

**The default is allow.** Being quotable when someone asks "where to stay in Midigama" is the point. **This is the owner's call, and it has not been put to them.** Put it in the pitch as a question: keep it as it is, or block the training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) and keep the live-answer agents. Either way, the change is one edit to `AI_CRAWLERS` in `src/lib/site.mjs`.

## Facts the dossier could not support, left unanswered on purpose

- **Price per night.** Rates are live Booking.com inventory ("Live prices are not content"). The page links to the listing. There is no `priceRange` and no `makesOffer`.
- **The season.** The dossier has a gap: `season` is null, and the business publishes no season. Nothing is said.
- **Surf.** The business publishes no lessons, rentals or named break (dossier `businessType_note`). The guests' "lazy left and right" and "4 surfspots" stay inside their verbatim quotes. The page and llms.txt make no surf claim of their own.
- **The King Room hot tub.** Booking.com's room description mentions one (`private_hot_tub_listed: true`), but the passed copy does not use it and no photo shows it. I left it out.
- **Number of rooms.** `room_count` / `units_listed` are not in a content field, so `numberOfRooms` is not emitted.
- **WhatsApp, email, Instagram, opening hours:** none is published. llms.txt would print WhatsApp or email if those fields were ever set.
- **Ratings markup.** `aggregateRating` / `review` stay omitted under Shahar's no-ratings-markup decision (4h).

## Recommendations (visible changes, so not made)

These need copy work (copywriter → humanizer → copyeditor) or a schema field. Every fact below is already in the dossier and on the page.

- **R1. The name in the first sentence.** "Lotus Surf House is a guesthouse in Midigama, on the south coast of Sri Lanka." This is the `tagline`, an owner field. Today the name sits in the h1 and the sentence starts "A guesthouse…", so the extractable line carries no name. The same edit would improve the meta description (4h).
- **R2. The beach sentence, visible, with the name.** "Lotus Surf House is 250 m from Midigama Beach (Booking.com)." It is the most-asked question, and on the page it appears only as the short glance item. The full `spot` sentence is in llms.txt but not on the page.
- **R3. A visible last-updated date** (base.md §5), from `updatedAt`. It is null until a tenant exists. A footer line would be a design decision.
- **R4. A visible FAQ block** as `copyBlocks[]` rows. This would need a `faq` slot value in `schemas/site-content.md`; I have not made that proposal here. Questions the dossier can answer: 2, 3, 4, 5, 6, 7 and 13 above.
- **R5. Entity clarity.** I back 4h's proposal B (`alternateNames[]`: "Yelum Guest House") and proposal C (`socialLinks[]`). The old Google listing and the Facebook page carry the old name, so a model may split the facts between the two names. The visible "old name" sentence helps, but it does not reach the markup.

## Measured, before and after

Method: `node tools/audit-mockup.mjs lotus-surf-house ../final`, run three times on the 4h `dist/` (copied aside first) and three times on the new preview `dist/`. The profile is a throttled phone, 390×844, 1.6 Mbps / 150 ms / 4× CPU.

| | before (4h) | after (4i) |
|---|---|---|
| `index.html` | 57,915 B | 58,212 B (+297 B, the four `floorSize` objects) |
| First-load transfer, no video | 903,419 B, 13 requests, all local | 903,716 B, 13 requests, all local |
| LCP (3 runs, ms) | 724 / 424 / 428 | 560 / 420 / 424 |
| CLS (load) | 0 / 0 / 0 | 0 / 0 / 0 |
| Scroll CLS early / settled | 0.0018, 0.0018, 0.0016 / 0 | 0.0016 ×3 / 0 |
| Third-party requests | 0 | 0 |
| No-JS text length | 7,624 | 7,624 |
| Numbers on page / not in passed copy | 27 / "9.0", "2026." | 27 / "9.0", "2026." |
| Images without alt; tap targets < 44 px | 0; 20 | 0; 20 |
| `check-design` | ok, 0 problems, 0 warnings | ok, 0 problems, 0 warnings |
| JSON-LD | 1 block; 13 keys (preview) / 16 (SITE_URL) | the same, plus `floorSize` on 4 rooms |
| `llms.txt` | 7,860 B, "9/10" | 7,862 B, "9.0/10" |

The first LCP run on each side is the cold run, and the spread is noise. `llms.txt` and `robots.txt` are not fetched on page load.

## Checks

```
SITE_URL=https://lotussurfhouse.example.com/ npm run build -- --outDir <scratch>   (deleted afterwards)
  robots.txt: * Allow: /, 15 named AI bots Allow: / ("owner to confirm"), Sitemap: https://lotussurfhouse.example.com/sitemap.xml
  sitemap.xml built; no robots meta; canonical absolute; llms.txt has no preview line, Pages → https://lotussurfhouse.example.com/
  JSON-LD: 1 block, 16 keys, @id https://lotussurfhouse.example.com/#business, containsPlace with floorSize
SITE_URL=https://lotus-surf-house.example.workers.dev/ (scratch): robots Disallow: /, noindex, no sitemap
npm run build (no SITE_URL) → dist/: index.html, robots.txt, llms.txt, fonts, photos; no sitemap.xml
  robots.txt: preview comment, * Disallow: /, 15 named bots Disallow: /
  index.html: <meta name="robots" content="noindex, nofollow">; llms.txt carries the preview line
before/after index.html with the ld+json script removed: identical
diff -rq before/after dist: only index.html (JSON-LD) and llms.txt (one line: 9 → 9.0)
noJS text: every answer in the table present; nothing moved
tools/check-design.mjs: ok 0/0 · tools/audit-mockup.mjs: numbers above
preview :8960 restarted on the new dist (astro preview --host 0.0.0.0 --port 8960, pid 89621):
  /llms.txt 200 with "9.0/10", /robots.txt Disallow: /, floorSize (MTK) in the page
```

No network schema validator was used. `HotelRoom.floorSize` is a QuantitativeValue (`unitCode` `MTK` = m², with `minValue` / `maxValue` for a range). `containsPlace` is a Place property, which LodgingBusiness inherits.

## Ledger note (`optimised → ai_optimised`)

4i aiseo 0.2.2: verified the ported llms.txt and AI-crawler robots against the dossier. Added `floorSize` to the four `containsPlace` rooms (from `rooms[].note`, which matches dossier `size_m2`), and llms.txt now prints the Booking score as 9.0 like the page. The preview stays refused (noindex, `Disallow: /` for `*` and the 15 AI bots, no sitemap); a real domain allows them, owner to confirm. FAQPage declined (no visible questions), every fact is in the DOM with JS off, and nothing visible changed. LCP 560/420/424 ms, CLS 0, first load 903,716 B (+297), check-design ok.
