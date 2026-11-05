# Coconut Surf Inn — AI SEO report (station 4i)

aiseo 0.2.2 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-05 · site: `sites/coconut-surf-inn-guest-house-and-restaurant/final/` (the 4g build after the 4h SEO pass)

The AI plumbing was already there at 4g, carried over from lotus-surf-house and cheeky-monkey: `AI_CRAWLERS`, the preview-aware `robots.txt.js` and a generated `llms.txt.js`. 4h added `alternateName`, the Tripadvisor `sameAs` and the longer descriptions. At this station I checked each piece against the dossier and the passed copy. I found one hole: `llms.txt` left out the only hours the business publishes, which the page prints three times. I closed it. I wrote no copy and changed nothing visible. Both built pages are byte-identical to 4h.

## What changed, and where

| file | change |
|---|---|
| `final/src/pages/llms.txt.js` | New `## Opening hours` section, after "Check-in and check-out". It prints `openingHours[]` rows first (days, opens to closes), which are empty in the seed, and then `hoursNote`: "The restaurant upstairs is open every day from 7:30 to 22:00." That is dossier `restaurant_hours`. The page shows this sentence in the 13:00 paragraph, in "The restaurant upstairs" and in the footer. Before this change, llms.txt never said when the restaurant was open. |

Nothing was written outside `sites/coconut-surf-inn-guest-house-and-restaurant/`. I did not edit `notes.md`, `seo-report.md`, `copy/`, `content.json`, `gaps.json`, `site.mjs` or `robots.txt.js`. `diff -rq` of the 4h `dist/` against the new one finds only `llms.txt`, which gained 4 lines (8,801 B, now 8,884 B).

## Questions identified, and where each is answered

The type is `beach_lodging`. The inn sells rooms and runs a restaurant upstairs, and it offers no lessons or rentals. "Name?" asks whether the extractable sentence carries the business name (base.md §2).

| # | Question a traveller asks an assistant | Answer on the page (JS off) | Where | Name? |
|---|---|---|---|---|
| 1 | What is Coconut Surf Inn, and where is it? | h1 "Coconut Surf Inn" + "A guesthouse in Gurubebila, between Midigama and Weligama, on the south coast of Sri Lanka." | hero, 13:00 paragraph | in the h1, not in the sentence (R1) |
| 2 | How far is the beach / the surf? | "The guesthouse is tucked away from the busy Galle–Matara road, right next to the beach." "Coconuts, a consistent A-frame reef break, is in front of the guesthouse. Plantations is a more mellow wave, a 100 m walk up the beach." | By the beach; The break; 13:00 paragraph | "the guesthouse" |
| 3 | When is the surf season? | "According to the Sri Lanka Travel Pages surf guide, the season at Coconut Point runs from November to April." | The break | sourced in the sentence |
| 4 | What rooms are there? Is there AC or hot water? | 6 room types, each with beds, sleeps, floor, m² and "Air conditioning, fan and hot water" or "Fan and mosquito net; no air conditioning and no hot water", plus the A/C or Fan chip | room list; `rooms/`; JSON-LD `containsPlace` (with `floorSize`); llms.txt | as labels |
| 5 | Check-in and check-out times? Children, pets? | "Check-in from 13:00 \| Check-out until 11:00". "Children of any age are welcome, but there are no cots or extra beds. Pets are allowed on request, at no charge." | under the rooms; JSON-LD `checkinTime` / `checkoutTime` | as labels |
| 6 | Is there a restaurant? When is it open? | "The restaurant upstairs is open every day from 7:30 to 22:00." Also "A long covered room on the upper floor… All meals, snacks and drinks are available. Breakfast comes with some rates and not with others." | 13:00 paragraph, The restaurant upstairs, footer; **llms.txt (new)** | "the restaurant upstairs" |
| 7 | WiFi, front desk, bikes, laundry, car hire? | "At the house": 10 items, with "(additional charge)" where it applies | At the house; JSON-LD `amenityFeature` | list items |
| 8 | Who runs it? | "Coconut Surf Inn is the Eranga family home… the gracious host Chinthaka and his family." "Chinthaka has been a host on Airbnb for 13 years." | The Eranga family home | **yes** |
| 9 | How do I get there? Train, airport? | "Koggala Airport is 11 km away… The nearest train station is Kumbalgama, about a 13-minute walk. Midigama station is 1.4 km away. Booking.com puts the centre of Weligama 3.3 km from the house." | Getting here | "the house" |
| 10 | Is it the same place as the Google listing? | "On Google Maps, look for Coconut Surf Inn Guest House and Restaurant." | Getting here; JSON-LD `alternateName` (4h) | **yes** |
| 11 | Is it any good? | Booking.com 8.5/10 (142), Google 4.8/5 (88), Airbnb 4.44/5 (54), all read 4 Nov 2026. 12 verbatim quotes, each with author, country, source and month | twice on the page (13:00 and 11:00); guests slideshow; llms.txt | label + number + source |
| 12 | How do I book? What does a night cost? | "Booking.com has the live dates and prices. If you'd rather ask something first, call us." There are 20 Booking.com links and `tel:+94778921396` | everywhere | no price (below) |
| 13 | Where exactly? | "Kadabeddagama Road Gurubebila, Weligama 81700, Sri Lanka" + "Open in Google Maps" | Getting here, footer; JSON-LD address / geo | the footer pairs it with the name |

**The "Coconut Beach" place.** The page and llms.txt use the Google 4.8 from the inn's own listing (88 reviews, place_id ChIJI29CG-cU4ToRQhs8notgauI). The "Coconut Beach" place's 4.8/120 appears nowhere: not as a rating, not in `sameAs`, not as `geo`. The words "coconut beach" appear only inside two verbatim guest quotes (Erin, Mette), as the guests wrote them.

**JavaScript off.** I stripped scripts, styles and SVG from `dist/index.html` and read what was left: 10,559 characters. Every answer in the table is there as server-rendered text, and so are all 12 quotes, the room slides (`<noscript>`) and the "Find your room" fallback to `rooms/`. **Nothing had to be moved.** Only one thing needs JS: the Rosa headline (wave, swell, wind). That is live third-party data, not content. Without JS it is the plain link "See today's forecast for Coconuts on Rosa". The clock set-piece canvas is decoration, and the five moments it shows are text blocks in the DOM.

**Hidden text.** I added none. Everything this station changed is in `llms.txt`.

## FAQPage: declined, on purpose

The home page has no visible questions. Its headings are names, times or statements ("13:00, check-in", "Six kinds of room", "Getting here"). `rooms/` asks "How many are coming?", but that is a picker, not a question with an answer. A `FAQPage` would put question text into markup that no reader sees, which hard constraint 2 and Google's FAQ rules forbid. Lotus, cheeky-monkey and KA declined it for the same reason. The honest route is a visible FAQ block (R3).

## `/llms.txt` contents

`src/pages/llms.txt.js` generates the file at build time from `content.json`, using the same helpers as the page. It is 8,884 B on the preview build.

1. `# Coconut Surf Inn` and a blockquote of the `tagline`. **On a preview build** the next line is "Preview build, not the published site: … Do not index, quote or cite it." Then "Coconut Surf Inn, Kadabeddagama Road Gurubebila, Weligama 81700, Sri Lanka."
2. One section per `copyBlocks[]` row, under its own heading: By the beach, The Eranga family home, The restaurant upstairs, On the roof, Inside the house, Six kinds of room, Getting here.
3. `## Rooms` (6 rows: label, beds, sleeps, note), `## Check-in and check-out` (13:00, by 11:00, `stayInfo.note`), **`## Opening hours` (new: `hoursNote`)**, `## Amenities` (10) and `## The break` (`spot` and `season`).
4. `## Ratings` (linked, with the read date, printed as the page prints them: 8.5, 4.8, 4.44) and `## What guests wrote` (12 quotes, verbatim, with author, country, source and month).
5. `## How to book`: the `closing` line, the Booking.com link and the phone. There is no WhatsApp or email, because none is published. `## Location`: the address and the Google Maps link.
6. `## Pages`: home, `rooms/` and the Rosa forecast for Coconuts (`weligama-west`). These links are relative on a preview and absolute with `SITE_URL`. "Last updated" is printed only when `updatedAt` is set. It is null in the seed, so the line is left out.

The only template wording is the section labels, "sleeps", "Check-in:", "Check-out: by" and the Pages descriptions. Every sentence is a content field.

## Crawler policy (owner decision, must be confirmed)

- **Real domain** (checked with `SITE_URL=https://coconutsurfinn.example.com/` into a scratch outDir): `*` `Allow: /`. Then one group names GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot and MistralAI-User, each `Allow: /`, with the comment "owner to confirm". The `Sitemap:` line follows, and `sitemap.xml` is built. There is no robots meta, and llms.txt has no preview line and gives absolute URLs.
- **Preview** (the `dist/` now, and any workers.dev or localhost `SITE_URL`): everything is refused. `*` gets `Disallow: /`, and so does each of the 15 named bots, because a named bot ignores the `*` group. There is no Sitemap line and no `sitemap.xml`. Both pages carry `<meta name="robots" content="noindex, nofollow">`, and llms.txt says "Do not index, quote or cite it".

**The default is allow.** The point is to be quotable when someone asks "where to stay near Coconuts" or "a guesthouse by the beach in Midigama". **This is the owner's call, and nobody has asked them yet.** Put it in the pitch as a question: keep it as it is, or block the training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) and keep the live-answer agents. Either way, the change is one edit to `AI_CRAWLERS` in `src/lib/site.mjs`.

## Facts the dossier could not support, left unanswered on purpose

- **Price per night.** Rates are live Booking.com inventory ("Live prices are not content"). The page links to the listing. There is no `priceRange` and no `makesOffer`.
- **Which rates include breakfast.** The copy says only "Breakfast comes with some rates and not with others", and the dossier says no more. Nothing more is said.
- **Reception hours.** The dossier records a gap: nothing is published beyond Booking's "24-hour front desk", which is an amenity row. The restaurant hours are not presented as the inn's hours.
- **Languages spoken.** `languagesSpoken` is `["en"]`. The dossier lists a conflict: Booking names six languages and Airbnb names English. The page does not show it, and I did not add it to llms.txt. JSON-LD `knowsLanguage` (4h) stays `en`.
- **Surf lessons or board hire.** None are sold. The board rack ("a rack for your boards") is a copy fact. The guests' surf remarks stay inside their quotes.
- **The restaurant as its own entity.** It has its own Google listing ("Coconut Surf Restaurant (2nd floor)", 4.6 · 39, house number 44), which the copy names. It is not marked up as a `Restaurant`. The schema has no restaurant module, and 4h declined it too.
- **Number of rooms.** `room_count` is not in a content field, so `numberOfRooms` is not emitted.
- **Ratings markup.** `aggregateRating` and `review` stay omitted under Shahar's no-ratings-markup decision (4h).

## Recommendations (visible changes, so not made)

These need copy work (copywriter → humanizer → copyeditor) or a schema field. Every fact below is already in the dossier and on the page.

- **R1. The name in the first sentence.** "Coconut Surf Inn is a guesthouse in Gurubebila, between Midigama and Weligama, on the south coast of Sri Lanka." This is the `tagline`, an owner field. The first-screen line (gap `heroLine`) takes the tagline's first words, so the line would change too: a design question. The meta description would carry the name as well.
- **R2. A visible last-updated date** (base.md §5), from `updatedAt`. It is null until a tenant exists. A footer line would be a design decision.
- **R3. A visible FAQ block** as `copyBlocks[]` rows. This needs a `faq` slot value in `schemas/site-content.md`; I have not made that proposal here. The dossier can answer questions 2, 3, 5, 6 and 9 above.
- **R4. Entity clarity.** I back 4h's proposals B (`alternateNames[]`) and C (`socialLinks[]`), and its pitch point: the owner should claim the restaurant listing and take the inn's phone off the "Coconut Beach" place. A model that finds the inn's phone on a beach place may attribute the beach's 4.8 · 120 to the inn.

## Measured, before and after

Method: the 4h scratch profile (`tools/audit-mockup.mjs`'s first-load settings: 390×844 @2x, 1.6 Mbps / 150 ms / 4× CPU, cache off, no scroll). Before: the 4h `dist/`, copied aside and served on :8982. After: the new `dist/` on :8970.

| | before (4h) | after (4i) | target |
|---|---|---|---|
| `index.html` / `rooms/index.html` | 107,873 B / 63,682 B | the same bytes | — |
| First-load transfer, home | 382,253 B, 8 requests, all local | **382,253 B**, 8 requests, all local | ≤ 1.5 MB |
| **LCP**, home (3 runs, ms) | 644 / 440 / 436 | **572 / 444 / 452** | ≤ 2,500 |
| **CLS**, home | 0.0009 / 0.0012 / 0.0012 | **0.0012 / 0.0012 / 0.0012** | < 0.1 |
| LCP / CLS, `rooms/` | 440 ms / 0.0386 | 448 ms / 0.0386 | — |
| Third-party requests on load | 0 | 0 | 0 |
| `llms.txt` | 8,801 B, no hours | 8,884 B, with the restaurant hours | — |
| `robots.txt` | preview refusal, 15 named bots | the same | — |
| JSON-LD | 1 block per page, 15 keys (preview) / 18 (SITE_URL) | the same | — |

The first run on each side is the cold one. The spread is noise: the page bytes did not change. `llms.txt` and `robots.txt` are not fetched on page load.

**Look.** Playwright full-page captures were taken of `/` and `rooms/` at 390 and 1440, with JS on and off. Each used reduced motion, lazy images forced eager and third parties blocked. All 8 "after" captures are **byte-identical** to the "before" ones (same sha256, mean difference 0). The PNGs were scratch and are deleted. `node tools/check-design.mjs sites/coconut-surf-inn-guest-house-and-restaurant/final/dist/index.html`: **ok**, 0 problems, 0 warnings (h1/h2 Caveat, body Red Hat Text, ground #FFFFFF, 0 all-caps labels, 0/25 labelled headings). Its temp shots are deleted.

## Checks

```
npm run build (no SITE_URL) → dist/: index.html, rooms/, robots.txt, llms.txt, fonts, photos; no sitemap.xml
  diff -rq 4h dist vs new: only llms.txt (+ "## Opening hours" and the hoursNote line)
  index.html, rooms/index.html: <meta name="robots" content="noindex, nofollow">; 1 ld+json each, JSON.parse ok
  robots.txt: preview comment, * Disallow: /, 15 named bots Disallow: /
SITE_URL=https://coconutsurfinn.example.com/ (scratch outDir, deleted)
  robots.txt: * Allow: /, 15 AI bots Allow: / ("owner to confirm"), Sitemap line; sitemap.xml built
  no robots meta; JSON-LD 18 keys, @id https://coconutsurfinn.example.com/#business; llms.txt absolute, no preview line
SITE_URL=https://coconut.example.workers.dev/ (scratch, deleted): noindex, Disallow: /, no sitemap, llms.txt preview line
no-JS text: every answer in the table present; nothing moved
"Coconut Beach" 4.8/120: absent; "coconut beach" only inside two verbatim quotes
check-design (this page only): ok 0/0 · pixels: 8/8 identical
:8970: the scratch serve.mjs on 0.0.0.0 (pid 66473) reads dist/ on every request, so it serves the rebuilt dist
  without a restart: /llms.txt 200 with "## Opening hours", /robots.txt Disallow: /
```

No network schema validator was used. I did not change the JSON-LD.

## Ledger note (`optimised → ai_optimised`)

4i aiseo 0.2.2:
- Verified the ported llms.txt, the AI-crawler robots and the 4h JSON-LD against the dossier.
- llms.txt now carries the restaurant hours (`hoursNote`, dossier `restaurant_hours`) in a new "Opening hours" section. They were on the page but not in the file.
- The preview stays refused: noindex, `Disallow: /` for `*` and the 15 AI bots, no sitemap. A real domain allows them; the owner must confirm.
- FAQPage declined (no visible questions). Every fact is in the DOM with JS off. The "Coconut Beach" place is never used.
- No visible change: both pages are byte-identical and all 8 captures are identical. LCP 572/444/452 ms, CLS 0.0012, first load 382,253 B (unchanged), check-design ok.
