# Panta Rei Resort — AI SEO report (station 4i)

aiseo 0.2.2 · run `2026-11-lk-surf-01` (test, operator alon) · 2026-11-06 · site: `sites/panta-rei-resort/final/` (the 4g build after the 4h SEO pass, `seo-report.md`)

4h left the site with:
- the preview rule;
- one `Resort` JSON-LD block, which carries the rooms with their beds and notes, the 8 priced offers and 6 `sameAs`;
- a robots.txt with no AI groups.

There was no `llms.txt`.

This station:
- added the named AI-crawler policy;
- added a generated `/llms.txt`;
- checked every answer on the page with JavaScript off against the dossier and the audited copy.

I added no copy to the page and changed nothing visible: `index.html` is **byte-identical** to 4h. I did not touch the 4h JSON-LD, title, description or canonical rule.

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/site.mjs` | New `AI_CRAWLERS`: 15 named bots, each `allow`. This is the same list as the other finals and an owner decision. |
| `final/src/pages/robots.txt.js` | Gains the AI groups. This is now the same file as coconut-surf-inn's. <ul><li>**Preview:** `*` gets `Disallow: /`, and so does each of the 15 bots in its own group, because a named bot ignores the `*` group.</li><li>**Real domain:** `*` gets `Allow: /`, the 15 bots get `Allow: /` with the comment "owner to confirm", and the `Sitemap:` line follows.</li></ul> |
| `final/src/pages/llms.txt.js` | **New.** It generates `/llms.txt` at build time from `content.json`, with the same helpers as the page. Its contents are below. |

Nothing was written outside `sites/panta-rei-resort/`. I did not edit `content.json`, `gaps.json`, `copy/`, the dossier, the CSS, the JS or the page markup. `diff -rq` of the 4h `dist/` against the new one finds two things: `llms.txt` is new (8,710 B), and `robots.txt` gained the AI groups.

## Questions identified, and where each is answered

The type is `beach_lodging`, marked up as `Resort`. The business sells rooms, with a restaurant, a pool day pass, classes and massages. It sells no surf lessons or board hire.

Every answer below is in the server-rendered HTML with **JS off**. I checked this by stripping scripts, styles and SVG from `dist/index.html`, which leaves 7,537 characters of text. "Name?" asks whether the extractable sentence carries the business name (base.md §2).

| # | Question a traveller asks an assistant | Answer on the page (JS off) | Where | Name? |
|---|---|---|---|---|
| 1 | What is Panta Rei Resort, and where is it? | "A boutique resort set around a large pool in Kabalana, Ahangama, on the south coast of Sri Lanka." "Welcome to our boutique resort in Kabalana, Sri Lanka." | Welcome (lead + body), footer; meta description; JSON-LD `description` | no: the h1 is "Panta Rei, Kabalana" and the tagline has no name (R1) |
| 2 | How far is the beach? | "Kabalana Beach is a short walk away and Koggala Lake about 1.5 km." | Getting here and around; "From the resort" list | no, "the resort" |
| 3 | How many rooms, what kinds, how big, for how many? | "The resort features 16 bungalows…"; 4 cards: Double 22 m² · sleeps 3, Triple 30 m² · sleeps 3, Family Villa 50 m² · sleeps 4, Suite with Private Pool 40 m² · sleeps 2 | Welcome; Four ways to stay; JSON-LD `containsPlace`; llms.txt | labels |
| 4 | What does each room have (beds, balcony, bath, private pool)? | **Not as visible text with JS off.** Beds and notes appear only in the booking drawer, which `site.js` fills. In the HTML they sit in the `rooms-data` JSON and, since 4h, in JSON-LD `HotelRoom.bed` / `.description`. **llms.txt (new)** lists them as text. | JSON-LD, llms.txt (R4) | labels |
| 5 | Is breakfast included? AC, wifi, hot water? | "Every room has air conditioning, hot water and wifi, is cleaned daily, and comes with breakfast." | Four ways to stay; drawer | no, "every room" |
| 6 | What does a night cost? | "Prices move with the dates. Pick yours on our booking page and you'll see what's free and what it costs." No number (below) | Four ways to stay | — |
| 7 | Check-in / check-out? Kids, pets, smoking? | "Check-in from 14:00 \| Check-out until 11:00 \| Children of any age are welcome. No pets, and no smoking in the rooms. Quiet hours are 22:00 to 08:00." | under the room cards; JSON-LD `checkinTime` / `checkoutTime` | labels |
| 8 | Is there a restaurant? Open to non-guests? Hours? | "The restaurant serves breakfast, lunch, dinner and cocktails all day, to guests and to anyone who drops in." "Restaurant, every day: breakfast 8:30–12:00 (coffee from 8:00), lunch 13:00–17:00, dinner 18:00–21:30." | Restaurant and bar; amenities | "the restaurant" |
| 9 | Can I use the pool without staying? | "If you're staying nearby, you can come for the day too." "Pool day pass \| 3,500 LKR per person \| Spent at the restaurant" | The pool; JSON-LD `makesOffer` | no |
| 10 | Yoga? When, how much? | "Vinyasa yoga is at 8:30 every morning; Friday is the day off… You don't need to book." Week strip, and "Per class \| Residents 2,500 LKR \| In-house guests 3,000 LKR \| Walk-ins 3,500 LKR" | Panta Fitness Club; JSON-LD `makesOffer` | the club's name |
| 11 | Massage after surfing? | "The Surf Therapy Massage was put together for surfers…"; 60 min 20,000 LKR, 45 min 17,000 LKR, for both massages | After the surf; JSON-LD `makesOffer` | the massage's name |
| 12 | Is it good for surfing? | "…a tropical paradise where surfing, yoga, crystal blue beaches and rainforests come together." The `spot` field ("The waves of Kabalana, a short walk from the resort.") is in the meta description and llms.txt. The design does not print it | Welcome | — |
| 13 | How do I get there? Airport, train, taxi? | "Koggala Airport is 5 km from the resort, Kathaluwa station 1.9 km and Ahangama station 2.1 km. Tuk tuk drivers wait at the door of the hotel… If you'd rather have a private taxi, we'll arrange it." Plus "Airport shuttle" in Good to know | Getting here and around | no |
| 14 | Parking, wifi, laundry, cot, extra bed? | "Good to know": 16 items, with "(additional charge)", "(free, on request)" and "(US$20 per night, on request)" where they apply | Getting here; JSON-LD `amenityFeature` | list items |
| 15 | Is it any good? | Booking.com 9.2/10 (468) and Google 4.7/5 (213), "captured 6 Nov 2026", plus 6 verbatim quotes with author and source | What guests say; drawer; llms.txt | label + number + source |
| 16 | Can I bring a group / a retreat? | "Planning to bring a big group to Sri Lanka? … We'll take care of all the meals and accommodation…" | Groups and retreats | no, "our resort" |
| 17 | How do I book? | "Booking direct gets you our best rate, and if there's anything you'd like to ask first, send us a WhatsApp." Engine links (home + 4 room pages), `wa.me/94728003022`, `tel:+94728003022`, `hello@pantareiresort.com` | everywhere; closing; footer | no |
| 18 | Where exactly? | "Back to Life Road, Kabalana Rd, Ahangama 80650, Sri Lanka" + "Open in Google Maps" | Getting here, footer; JSON-LD address / geo | the footer pairs it with the name |

**JavaScript off.**
- Every fact in the table is in the DOM as text, except the per-room beds and notes (row 4).
- Those are not lost to a machine reader: since 4h they are in the server-rendered JSON-LD, and they are now plain text in llms.txt. Putting them in the page as visible text without JS would change how the page looks (a `<noscript>` block or visible card text), so it was not done (R4).
- The canvas and the videos carry no facts: each clip's `description` is its `aria-label`, and the first screen's words are in the HTML.

**Hidden text.** I added none. Every addition is in `robots.txt` and `llms.txt`.

## FAQPage: declined, on purpose

The page has no visible questions. Its headings are names or statements ("The pool", "Four ways to stay", "Getting here and around"). The only question mark is the first sentence of the groups block, which is a lead-in, not a question with an answer.

A `FAQPage` would put question text into markup that no reader sees. Hard constraint 2 and Google's FAQ rules both forbid that. Adding a visible FAQ block would change the page the human picked. KA, lotus, cheeky-monkey and coconut-surf-inn declined it for the same reason. The honest route is R3.

So the "one JSON-LD graph" rule holds: the page carries only the 4h `Resort` block.

## `/llms.txt` contents

`src/pages/llms.txt.js` builds the file at build time from `content.json`. It is 8,710 B on the preview build.

1. `# Panta Rei Resort` and a blockquote of the `tagline`. **On a preview build** the next line is "Preview build, not the published site: shown to the owner for review. Do not index, quote or cite it."
2. `## In short`: four composed lines (verbatim below). Each joins content fields with the business name, so it survives being lifted out alone (base.md §2).
3. One section per `copyBlocks[]` row, under its own heading, in the admin's order: Welcome to Panta Rei, The pool, Restaurant and bar, Panta Fitness Club, After the surf, Four ways to stay, Groups and retreats, Getting here and around.
4. These sections come from content fields:
   - `## Rooms`: 4 rows of label, beds, "sleeps n" and note.
   - `## Check-in and check-out`.
   - `## Opening hours`: `hoursNote`.
   - `## Prices`: the 8 `priceList[]` rows with currency, unit and note.
   - `## Amenities`: 16 rows.
   - `## The surf`: `spot`.
5. `## Ratings` (linked, with "captured 6 Nov 2026", exactly as the page prints them) and `## What guests wrote` (6 quotes, verbatim, with author and source).
6. `## How to book`: the `closing` line, the engine link, the four room pages, WhatsApp, phone and email. Then `## Location` (address and Google Maps link) and `## Follow` (Instagram, Facebook, YouTube).
7. `## Pages`: the home page, under the 4h `<title>`. The link is relative on a preview build and absolute with `SITE_URL`.
8. "Last updated" is printed only when `updatedAt` is set. It is null in the seed, so the line is left out.

The only template wording is the section labels, "sleeps", "Check-in: from", "Check-out: by", "per person" / "per class", "WhatsApp:", "Phone:", "Email:", "Address:", "captured", "the website", and the composed lines below.

### Every new sentence added for AI SEO (verbatim, all in `/llms.txt` only, none on the page)

| # | sentence (as built today) | built from (content field) | dossier key |
|---|---|---|---|
| 1 | "Panta Rei Resort is at Back to Life Road, Kabalana Rd, Ahangama 80650, Sri Lanka." | `businessName` + `contact.address` | `business.name`, `location.address` (Google's words, place names capitalised) |
| 2 | "Panta Rei Resort has 4 room types: Double Room, Triple Room, Family Villa, Suite with Private Pool." | `businessName` + `rooms[]` (count and labels) | `room_types[]` (4 entries; engine `booking.engine_rooms`) |
| 3 | "Check-in at Panta Rei Resort is from 14:00; check-out is by 11:00." | `businessName` + `stayInfo.checkInFrom` / `.checkOutTo` | `stay_info.check_in` ("2 pm"), `stay_info.check_out` ("11 am"; `contradictions[1]` resolves Google's 11:30 to 11 am) |
| 4 | "Panta Rei Resort takes bookings direct at https://pantareiresort.holidayfuture.com/ and on WhatsApp at +94728003022." | `businessName` + `bookingLinks[0].url` + `contact.whatsapp` | `booking.path` (engine first, "WhatsApp is the second channel"), `booking.engine_url`, `contact.whatsapp` |

Each one is a direct restatement of a dossier fact that the audited copy (`copy/en.json`) already carries. None adds a claim. Every other line in llms.txt is a content field copied verbatim, or a list row joining fields with the labels above.

## Crawler policy (owner decision, must be confirmed)

- **Real domain** (checked with `SITE_URL=https://pantareiresort.example.com/` into a scratch outDir):
  - `*` gets `Allow: /`.
  - One group names GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot and MistralAI-User, each `Allow: /`, with the comment "owner to confirm".
  - Then comes `Sitemap: https://pantareiresort.example.com/sitemap.xml`.
  - llms.txt has no preview line and gives absolute URLs.
- **Preview** (the `dist/` now, and `SITE_URL=https://panta-rei-resort.os1.workers.dev/`, which is where the demo lives):
  - everything is refused: `*` gets `Disallow: /`, and so does each of the 15 named bots;
  - there is no Sitemap line and no `sitemap.xml`;
  - the page carries `noindex, nofollow` (4h);
  - llms.txt says "Do not index, quote or cite it".

**The default is allow.** Being quotable is the point when someone asks "a boutique resort with a pool near Kabalana" or "where can I do yoga in Ahangama". **This is the owner's call, and nobody has asked them yet** (run `mode: test`, no owner contact).

Put it in the pitch as a question: keep it as it is, or block the training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) and keep the live-answer agents. Either way, the change is one edit to `AI_CRAWLERS` in `src/lib/site.mjs`.

## Facts the dossier could not support, left unanswered on purpose

- **Price per night.** Rates are live inventory on the HolidayFuture engine. The page links to it. There is no `priceRange` and no nightly price in llms.txt.
- **Season / closed months.** This is a dossier gap. One guest review mentions an off-season closure of the kitchen, but that is not the business's statement.
- **Surf lessons, board hire, board storage.** None is published (dossier gap, pitch point). Only the copy's "surfing" in Welcome and the `spot` line are used.
- **Exact distance to the beach.** The sources give 300 m (own site), 600 m (Booking.com) and 366 m (OSM) (`contradictions[0]`), so the page says only "a short walk".
- **Staff languages, reception hours, reply time, opening year, owner or staff names.** All are dossier gaps.
- **Cancellation (100% refund up to 14 days before arrival) and payment (cash, 3% card fee).** The dossier has both, but they are not in the audited copy or in any content field. I did not add them, because they would be new claims on the site. They are candidates for the copywriter (R5).
- **Tripadvisor rating and the engine's self-reported scores.** These are a bot wall and stale numbers. Not used.
- **Ratings markup.** `aggregateRating` / `review` stay omitted under Shahar's no-ratings-markup decision (4h).

## Recommendations (visible changes, so not made)

These need copy work (copywriter → humanizer → copyeditor), a design round or a schema field. Every fact below is already in the dossier and the audited copy.

- **R1. The name in the first sentence.** "Panta Rei Resort is a boutique resort set around a large pool in Kabalana, Ahangama, on the south coast of Sri Lanka." This is the `tagline`, an owner field shown in Welcome and the footer. The h1 "Panta Rei, Kabalana" (gap `heroTitle`) could carry the full name too (4h "Still wrong" 1).
- **R2. A visible last-updated date** (base.md §5), from `updatedAt`. It stays null until a tenant exists (station 8). A footer line would be a design decision.
- **R3. A visible FAQ block** as `copyBlocks[]` rows. This needs a `faq` slot value in `schemas/site-content.md`, which I have not proposed here. The dossier can answer questions 2, 5, 7, 8, 9, 13 and 17 above.
- **R4. Room details without JS.** Today the beds and the note (balcony, bathtub, outdoor bath, private pool) appear only in the drawer. A short line on each card, or in a `<noscript>` list, would put them in the readable page. The picked design decides that, so I left it.
- **R5. Booking terms.** Cancellation and payment terms (dossier `booking.cancellation`, `booking.payment`) answer two common questions. They would need copy.

## Measured, before and after

**Method:** the 4h scratch profile (`tools/audit-mockup.mjs`'s first-load settings: 390×844 @2x, 1.6 Mbps / 150 ms / 4× CPU, cache off, no scroll, http). Before: the 4h `dist/`, copied aside. After: the new `dist/`.

| | 4g | before (4h) | after (4i) | target |
|---|---|---|---|---|
| `index.html` | 84,139 B | 89,521 B | **89,521 B, byte-identical to 4h** | — |
| First-load transfer | 639,804 B, 12 req | 645,186 B, 12 req | **645,186 B**, 12 requests, all local | ≤ 1.5 MB |
| **LCP** (3 runs, ms) | 2152 / 2152 / 2144 | 2132 / 2144 / 2128 | **2076 / 2148 / 2140** | ≤ 2,500 |
| **CLS** | 0 | 0 | **0 / 0 / 0** | < 0.1 |
| Third-party requests on load | 0 | 0 | **0** | 0 |
| `llms.txt` | none | none | 8,710 B | — |
| `robots.txt` | none | preview refusal, `*` only | preview refusal, `*` + 15 named bots | — |
| JSON-LD | none | 1 `Resort` block, 15 keys (preview) / 18 (SITE_URL) | the same | — |

The page bytes did not change, so the LCP spread is noise. `llms.txt` and `robots.txt` are not fetched on page load.

**Look.**
- `node tools/shoot.mjs sites/panta-rei-resort/final/dist/index.html --out sites/panta-rei-resort/final/shots --force`: 14 desktop and 16 mobile captures, the same page heights (11,209 / 12,086 px).
  - Against the 4h set, the only differing pixels are inside the hero film, the fitness clip and the parallax photo under it (desktop-00, -06, -07, mobile-00).
  - The `index.html` is byte-identical, so those are film frames and scroll-motion timing, not a change.
- Reduced-motion full-page stills over http (1440 / 390, JS on and off): 1440 JS on, 390 JS on and 1440 JS off are byte-identical to 4h. 390 JS off differs only where `loading=lazy` photos had or had not loaded when the unscrolled capture fired. The same identical file gives both results, so this is capture timing.
- `node tools/check-design.mjs sites/panta-rei-resort/final/dist/index.html`: ok, 0 problems, 0 warnings. Its temporary shots are deleted.

## Checks

```
npm run build (no SITE_URL) → dist/: index.html, robots.txt, llms.txt, fonts, photos, video; no sitemap.xml; clean, no warnings
  diff -rq 4h dist vs new: llms.txt new, robots.txt (+ 15 named bots, Disallow); index.html identical
  index.html: <meta name="robots" content="noindex, nofollow">; 1 ld+json (4h, unchanged)
SITE_URL=https://pantareiresort.example.com/ (scratch outDir)
  robots.txt: * Allow: /, 15 AI bots Allow: / ("owner to confirm"), Sitemap line; sitemap.xml built
  llms.txt: no preview line, absolute page URL
SITE_URL=https://panta-rei-resort.os1.workers.dev/ (scratch): robots Disallow: / for * and the 15 bots, no sitemap,
  llms.txt preview line, noindex
no-JS text (7,537 chars): every answer in the table present except per-room beds/notes (JSON-LD + llms.txt)
llms.txt vs page: every copy block, price, amenity, rating, quote and contact line is the page's own content field
first load 645,186 B / 12 requests / 0 third-party; LCP ≤ 2,148 ms; CLS 0; check-design ok 0/0
```

## Ledger note (`optimised → ai_optimised`)

4i aiseo 0.2.2:
- Added a generated `/llms.txt` (8,710 B, every line from `content.json`, with a preview line on workers.dev builds). It carries four composed name-carrying lines from dossier facts, listed in the report.
- Added an explicit AI-crawler policy to `robots.txt`: 15 bots. The preview refuses all; a real domain allows all, and the owner must confirm.
- FAQPage declined (no visible questions). Every fact is in the DOM with JS off except the per-room beds and notes, which are in the JSON-LD and llms.txt.
- No visible change: `index.html` is byte-identical to 4h. LCP 2076/2148/2140 ms, CLS 0, first load 645,186 B, 0 third-party, check-design ok.
