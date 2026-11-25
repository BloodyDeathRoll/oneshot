# Sea You Surfers Nest — AI SEO report (station 4i)

aiseo 0.2.2 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-25 · site: `sites/sea-you-surfers-nest/final/` (the 4g build after the 4h SEO pass, commit e637dc0)

4h ported the search plumbing from Lotus: `AI_CRAWLERS`, the preview-aware `robots.txt.js`, the JSON-LD and the sitemap route. It left `llms.txt` to this station. At this station I added a generated `/llms.txt`, gave the two JSON-LD rooms a `floorSize`, and checked every answer against the dossier and the passed copy. I wrote no copy and changed nothing visible. Apart from the JSON-LD block, the built `index.html` is the same as before this station, character for character.

## What changed, and where

| file | change |
|---|---|
| `final/src/pages/llms.txt.js` | **New.** Built from Lotus's file, with two changes for this site. (1) **The phone prints only when `TEL` is set**, and `TEL` stays null while `TEL_CONFIRMED = false`. Lotus prints `c.contact.phone` directly, which would leak the unconfirmed number read off the sign (4h's warning). (2) Ratings print through `RATINGS.shown`, as the page prints them: 4.9/5, 8.0/10, 5.0/5. It also adds the page's "Ask Ashly on Airbnb" link, which comes from `gaps.bookingRoles.question` and the `ask` label. It prints no check-in line while `stayInfo.checkInFrom` is null, and in that case the heading becomes "Check-out and house rules". |
| `final/src/lib/site.mjs` | New `floorSize(note)`, the same function as Lotus. `businessLd.containsPlace` gives each `HotelRoom` a `floorSize` (QuantitativeValue, `MTK` = m²) read from the m² figure in its `rooms[].note`. The values are Deluxe 13 and Standard 12. They match dossier `room_types[].size_m2` (13.0, 12.0) and the room notes the page prints. It is still one block and one graph with 13 keys (16 with SITE_URL). No 4h property changed. |
| `final/audit.json` | The last after-run of `audit-mockup`. It is the file the tool writes. |

Nothing was written outside `sites/sea-you-surfers-nest/`. I did not touch `TEL_CONFIRMED`, `robots.txt.js`, `AI_CRAWLERS`, `notes.md`, `seo-report.md`, `copy/`, `content.json`, `gaps.json`, the CSS or the JS. No commit, and no ledger or usage line.

## Questions identified, and where each is answered

The type is `beach_lodging`: double rooms and breakfast, with no lessons, rentals or shop (dossier `businessType_why`). "Name?" asks whether the extractable sentence carries the business name (base.md §2).

| # | Question a traveller asks an assistant | Answer on the page (JS off) | Where | Name? |
|---|---|---|---|---|
| 1 | What is Sea You Surfers Nest, and where is it? | h1 "Sea You Surfers Nest". The line below it reads "Bed and breakfast \| Midigama, Sri Lanka" (4g's CSS hides the type half on phones). The tagline h2 reads "A bed and breakfast in Midigama, on Sri Lanka's south coast." | hero, at a glance | in the h1, not in the sentence (R1) |
| 2 | How far is the beach? | "'Hello to waves in a minute walk,' says the house's own listing." | at a glance (`spot`) | no. No metre figure is given: the sources say anywhere from 91 m to 500 m (dossier `contradictions`) |
| 3 | How do I get there? Is there a train? | "Midigama railway station is 950 m away on foot and Weligama Beach is 3.4 km, both by Booking.com's count." | Finding the house | "the house" |
| 4 | Is the Kumbalgama / Matara listing the same place? | "Booking.com lists the house under Kumbalgama and Airbnb under Matara, but it's one house, in Midigama." | Finding the house | "the house" |
| 5 | How many rooms? Is there air conditioning? | "All seven rooms are doubles, and between them they sleep fourteen. Only one has air conditioning, so ask when you book if you want the one that has it." The glance line reads "7 rooms, all doubles \| sleeps 14". | Seven rooms, at a glance; JSON-LD `numberOfRooms` 7 (4h) | no |
| 6 | What are the rooms like? | Deluxe Double Room: "1 large double bed \| Sleeps 2 \| 13 m², with its own bathroom, a private entrance, a terrace and a balcony." Standard Double Room: "… 12 m², with a private entrance and a wardrobe." The "In every room" list. | Seven rooms (both panels stack with JS off); JSON-LD `containsPlace`, now with `floorSize` | as labels |
| 7 | Can a group take the whole house? | "Live dates are on Booking.com, and groups can rent the whole house on Airbnb." plus the "Book the whole house on Airbnb" link | closing band, "Who's coming?" (all three answers show with JS off), footer | no |
| 8 | Is there breakfast? | "Breakfast here is Asian, with local specialities and warm dishes, and there's juice and fruit too." | Breakfast | no. Whether it is in the rate is a gap (below) |
| 9 | Check-in and check-out times? | "Check-out 06:00–10:00". **No check-in time** (below). | Finding the house; JSON-LD `checkoutTime` (4h) | label |
| 10 | Children, pets, parties? | "Children of any age are welcome; there are no cots or extra beds. Pets on request, and charges may apply. No parties or events." | Finding the house | no |
| 11 | WiFi, kitchen, parking, airport shuttle, laundry? | The glance line has "Free WiFi in public areas", "Kitchen" and "Fan and mosquito net". Parking, the airport shuttle, laundry, toiletries and the outside cameras are **not visible on the page** (R4). | at a glance; JSON-LD `amenityFeature` (4h, all 8); llms.txt (all 8) | list items |
| 12 | Who runs it, and how fast do they reply? | "Your host is Ashly. He's a Superhost on Airbnb and usually replies there within a few hours." | Ashly; the "A question first" note | the host's name |
| 13 | Is it any good? | Google 4.9/5 (11), Booking.com 8.0/10 (8) and Airbnb 5.0/5 (10), each dated 21 Nov 2026, plus 5 verbatim quotes with author, source and month | at a glance, Guests | label, number and source |
| 14 | How do I book? What does a night cost? | "See rooms and live dates on Booking.com", "Book a room on Airbnb", "Book the whole house on Airbnb", "Ask Ashly on Airbnb". All are plain links. | header, hero, Who's coming?, rooms, closing, footer, phone bar | no price (below) |
| 15 | Where exactly? | "151 Weliwaththa Rd, Midigama 80650, Sri Lanka" plus "Open in Google Maps" | at a glance, Finding the house, footer; JSON-LD address and geo (4h) | the footer pairs it with the name |

**JavaScript off.** I served `dist/` and opened it in Chromium with JavaScript disabled, at 390 px and at 1440 px. I checked the page's `innerText` against 39 answer strings, covering every row above and all five quote authors. All 39 are present at 1440 px. At 390 px, 38 are present. The one missing string is the "Bed and breakfast" half of the hero's type line, which 4g's phone CSS hides (`.where .type{display:none}`). That is a design choice, and the same fact is in the tagline h2 directly below. `audit-mockup` measures the no-JS text at 4,860 characters, the same as before this station. **Nothing had to be moved.** With JS off, "Who's coming?" becomes three labelled groups of links, both room panels stack, and the slideshows become scroll rows. The palm canvas is decoration over a real `<img>`. No fact lives only in an image, a canvas or a script.

**Hidden text.** I added none. Every change is in the JSON-LD and `llms.txt`. One rule visually hides text with JS on: `.js .ans-h`, the "Two of you / A group / A question first" headings inside the answers. It came with 4g and is not mine. It duplicates the visible tile labels and hides no fact.

## FAQPage: declined, on purpose

The page asks no question that it then answers. Every heading is a name or a statement: "Seven rooms", "Around the courtyard", "Ashly", "Breakfast", "Finding the house". The one question mark is "Who's coming?", which is a picker (Two of you / A group / A question first), not a question with an answer. A `FAQPage` would put question text into markup that no reader sees, which hard constraint 2 and Google's FAQ rules forbid. Lotus, KA, Cheeky Monkey and the other finals declined it for the same reason. The honest route is a visible FAQ block (R3). Its JSON-LD would then be generated from the same fields.

## `/llms.txt` contents

`src/pages/llms.txt.js` generates the file at build time from `content.json`, through the page's own helpers (`RATINGS`, `CHECKOUT`, `LINKS`, `TEL`), so it cannot drift from the page. It is 5,269 B on the preview build.

1. `# Sea You Surfers Nest` and a blockquote of the `tagline`. **On a preview build** it then says "Preview build, not the published site: … Do not index, quote or cite it." Then comes "Sea You Surfers Nest, 151 Weliwaththa Rd, Midigama 80650, Sri Lanka."
2. One section per `copyBlocks[]` row, under its own heading: Around the courtyard, Ashly, Seven rooms, Breakfast, Carved doors and a surfboard shower, Finding the house.
3. `## Rooms`: 2 rows, each with label, beds, sleeps and note (13 m² and 12 m²). Then `## Check-out and house rules`: "Check-out 06:00–10:00" and `stayInfo.note`. There is **no check-in line**. Then `## Amenities` (8) and `## The beach`: the `spot` line. `season` is null, so there is no season line.
4. `## Ratings`: 3 rows, each linked, with the read date, written as the page writes them. Then `## What guests wrote`: 5 quotes, verbatim, with author, source and month.
5. `## How to book`: the `closing` line, the 3 booking links and "Ask Ashly on Airbnb". **No phone**, because `TEL` is null. There is no WhatsApp or email either, because none is published. Then `## Location`: the address and the Google Maps link.
6. `## Pages`: `./` on a preview build, and the absolute URL when SITE_URL is set. "Last updated" prints only when `updatedAt` is set. It is null in the seed, so the line is omitted.

The only template wording is the section labels, "sleeps", "Check-out {t}" and "Ask {name} on {host}". All of these are already on the page. Every other sentence is a content field.

**Guard tested.** I set `TEL_CONFIRMED = true` temporarily and built into a scratch outDir. llms.txt then printed "- Phone: +94715880052". I restored the flag (`false`), deleted the scratch build, and rebuilt `dist/`. That is the switch working: confirming the number at station 8 puts it in llms.txt, the JSON-LD and the call buttons together.

## Crawler policy (owner decision, must be confirmed)

I left the policy as 4h ported it, with the same list as the other finals:

- **Real domain:** `*` gets `Allow: /`. One group names GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot and MistralAI-User, each with `Allow: /` and the comment "owner to confirm". Then comes the `Sitemap:` line.
- **Preview (the `dist/` now, and any workers.dev or localhost SITE_URL):** everything is refused. `*` and all 15 named bots get `Disallow: /`, because a named bot ignores the `*` group. There is no Sitemap line and no `sitemap.xml`, and the page carries `noindex, nofollow`. llms.txt says that it is a preview.

**The default is allow**, because being quotable when someone asks "where to stay in Midigama" is the point. **This is the owner's call, and it has not been put to them.** It should go in the pitch as a question: keep it as it is, or block the training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) and keep the live-answer agents. Either way, the change is one edit to `AI_CRAWLERS` in `src/lib/site.mjs`.

## Facts the dossier could not support, left unanswered on purpose

- **The phone.** The only number, +94715880052, was read off the sign in a photograph and is published as text nowhere (dossier `gaps[0]`, `human_decision: true`). It has 0 occurrences in `dist/`: not in the HTML, the JSON-LD, llms.txt or robots.txt, and there are 0 `tel:` links.
- **Check-in time.** Booking.com and Agoda say 14:00–18:00, and Airbnb says "after 15:00" (dossier `contradictions`, resolution "none"). The page, the JSON-LD and llms.txt state no check-in time. The only "check in" on the page is inside Niamh's verbatim quote ("Let us check in sooner"), which gives no time.
- **Price per night.** None is published. Rates are live OTA inventory ("Live prices are not content"). There is no `priceRange`, no `makesOffer`, and no currency figure anywhere in `dist/`. Niamh's and Marina's quotes mention price only in their own words, verbatim.
- **Air conditioning.** Only one of the seven rooms has it, in the owner's words. The copy says so. Booking's Deluxe-room "air conditioning" line and its "family rooms with air-conditioning" are not carried into any room, amenity or llms.txt line.
- **Distance to the beach in metres.** The sources give 91 m, 330 m and 500 m. Only the listing's own words are used.
- **Is breakfast included?** No source says. The page describes the breakfast and nothing more.
- **Surf.** No lessons, rental or named break is published. The board rental one guest mentions (dossier `surf.board_rental`, low confidence) is left out. The surfboard shower is a fact about the garden, not a surf service.
- **The season, minimum stay, WhatsApp, email, socials:** none is published.
- **Ratings markup.** `aggregateRating` and `review` stay omitted under Shahar's no-ratings-markup decision (4h).

## Recommendations (visible changes, so not made)

These need copy work (copywriter → humanizer → copyeditor) or a schema field. Every fact below is already in the dossier.

- **R1. The name in the first sentence.** "Sea You Surfers Nest is a bed and breakfast in Midigama, on Sri Lanka's south coast." This would be the `tagline`, an owner field. Today the name sits in the h1, and the sentence starts "A bed and breakfast…", so the extractable line has no name. The same edit would improve the meta description (4h).
- **R2. The beach sentence, with the name.** For example: "Sea You Surfers Nest's listing says the waves are a minute's walk away." It is the most-asked question, and today the extractable line names neither the house nor the beach.
- **R3. A visible FAQ block** as `copyBlocks[]` rows. This needs a `faq` slot value in `schemas/site-content.md`, and I have not made that proposal here. Questions the dossier can answer: 3, 4, 5, 7, 9, 10 and 11 above.
- **R4. The other five amenities, visible.** Free private parking, the airport shuttle and laundry (both at extra charge), free toiletries and the outside security cameras are in `amenities[]`, the JSON-LD (4h) and llms.txt, but not on the page. All are dossier facts from Booking.com, and two are echoed in guest quotes. They are not contradicted. They are simply missing from what a reader sees. Showing them would be a design change, so it belongs to the designer, not to this station.
- **R5. A visible last-updated date** (base.md §5), from `updatedAt`. It is null until a tenant exists.
- **R6. Entity clarity.** I back 4h's proposal B (`alternateNames[]`: "Sea You – The Surfers Nest", "Sea You Surfer's Nest"). The visible Kumbalgama/Matara sentence helps, but the names do not reach the markup.

## Measured, before and after

Method: I copied the 4h `dist/` aside first. Then I ran `tools/audit-mockup.mjs sea-you-surfers-nest` three times on the 4h `dist/` and four times on the new one. I ran it from the scratch copy 4h used, which differs only in the port (random in 8941–8987, since 8960, 8980 and 8901–8940 are in use) and the output path. The profile is a throttled phone, 390×844, 1.6 Mbps / 150 ms / 4× CPU.

| | before (4h) | after (4i) |
|---|---|---|
| `index.html` | 77,776 B | 77,916 B (+140 B, the two `floorSize` objects) |
| First-load transfer, no video | 526,250 B, 15 requests, all local | 526,390 B, 15 requests, all local |
| LCP (ms) | 1364 / 1400 / 1708 (median 1400) | 1308 / 1372 / 1520 / 824 (median 1340) |
| CLS (load) | 0.0026 ×3 | 0.0026 ×4 |
| Scroll CLS, worst per run | 0, 0.0053, 0.0027 | 0.0027, 0.0002, 0.0027, 0.0026 |
| Third-party requests | 0 | 0 |
| No-JS text length | 4,860 | 4,860 |
| Images without alt; tap targets < 44 px | 0; 0 | 0; 0 |
| `check-design` | ok, 0 problems, 0 warnings (4h) | ok, 0 problems, 0 warnings |
| JSON-LD | 1 block, 13 keys (preview) / 16 (SITE_URL) | the same, plus `floorSize` on 2 rooms |
| `llms.txt` | none | 5,269 B |

The machine was loaded, and the spread is noise. `final/audit.json` is the fourth after-run (LCP 824 ms, on a quieter machine). `llms.txt` and `robots.txt` are not fetched on page load.

## Checks

```
npm run build (no SITE_URL) → dist/: index.html, llms.txt (new), robots.txt, fonts, palms, photos; no sitemap.xml
  robots.txt: preview comment, * Disallow: /, 15 named bots Disallow: /
  index.html: <meta name="robots" content="noindex, nofollow">; llms.txt carries the preview line
SITE_URL=https://example.com/ astro build --outDir <scratch>
  robots: * Allow: /, the AI group Allow: /, Sitemap: https://example.com/sitemap.xml; sitemap.xml built
  llms.txt: no preview line, Pages → https://example.com/; JSON-LD 16 keys, BedAndBreakfast, no telephone, floorSize 13 / 12
SITE_URL=https://sea-you.example.workers.dev/ (scratch): noindex, robots Disallow: / (both groups), no sitemap, llms.txt preview line
TEL_CONFIRMED=true (scratch outDir, flag restored to false): llms.txt prints the phone → the guard works
phone: "715880052" 0 and tel: 0 across dist/ (HTML, JSON-LD, llms.txt, robots.txt), and in both scratch builds
prices: no currency figure, priceRange or makesOffer in dist/
check-in: no time anywhere in dist/
air conditioning: only "Only one has air conditioning…" (the copy), in index.html and llms.txt
before/after index.html with the ld+json script removed: identical
diff -rq before/after dist: index.html (JSON-LD only) and llms.txt (new)
no-JS render (Chromium, JS disabled, 390 + 1440): 39/39 answer strings at 1440 and 38/39 at 390 (the type line, which is phone-CSS hidden; the tagline carries it); 27 links, 0 tel:
tools/check-design.mjs dist/index.html --no-shots (port-only scratch copy): ok 0/0
```

No network schema validator was used. `HotelRoom.floorSize` is a QuantitativeValue (`unitCode` `MTK` = m²), as on Lotus. No screenshots were taken. The scratch builds and the before copy are in the session scratchpad, outside the repo.

## Ledger note (`optimised → ai_optimised`)

4i aiseo 0.2.2: added a generated `/llms.txt`. It prints the phone only when TEL is set, so the unconfirmed sign number does not leak. It gives no check-in time, no price, and ratings as the page prints them. Added `floorSize` (13 / 12 m², from `rooms[].note`, which matches dossier `size_m2`) to the two `containsPlace` rooms. The crawler policy is unchanged: the preview refuses everyone; a real domain allows the 15 named AI bots, owner to confirm. FAQPage declined (no visible questions). Every fact renders with JS off, and nothing visible changed. Phone 0 in `dist/`. LCP median 1340 ms (was 1400), CLS 0.0026, first load 526,390 B (+140), check-design ok.
