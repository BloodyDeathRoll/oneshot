# The Sandhya: AI SEO report (station 4i)

aiseo 0.2.2 · run `2026-11-ahangama-01` · 2026-11-09 · operator alon · `mode: test` · site: `sites/the-sandhya/final/` (the calm build after 4h, ledger state `optimised`)

**Nothing visible changed, and no copy was written.** The new `dist/index.html` is identical, character for character, to the 4h build once the one `ld+json` script is removed. The body and head are byte-equal outside it. All the new material is in `/llms.txt`, `robots.txt` and the JSON-LD. The page stays a **noindexed preview**. On a preview build, every crawler is refused, the named AI crawlers included.

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/seo.mjs` | **`AI_CRAWLERS`**, new. It lists 15 named AI crawlers, all `allow`. This is the same list as KA, Layday, the Lavish Haven and Global Surf v2. Only a real-domain build uses it. **`businessLd()`** is extended, not replaced: `containsPlace` now holds the four `rooms[]` rows as `HotelRoom` (`name` ← `label`, `bed` ← `beds`, `description` ← `note`, `occupancy.maxValue` ← `sleeps`). This is the Lavish Haven's shape. There is still one block and one graph, and none of 4h's 14 properties changed. Each edit is marked `4i:`. |
| `final/src/pages/robots.txt.js` | Named AI-crawler groups. **Preview:** 4h's refusal for `*`, then the same 15 bots repeat `Disallow: /`. A bot that matches its own group ignores `*`, so an allow group for it would open the preview to exactly those crawlers. **Real domain:** `*` is allowed. The 15 bots are allowed under "owner to confirm". Then the `Sitemap:` line. |
| `final/src/pages/llms.txt.js` | New. `/llms.txt` is generated at build time from `content.json`, with `gaps.json` only for the testimonial platform name. Its contents are listed below. |

`index.astro` was **not edited**. 4h's existing `businessLd({ description })` call picks up `containsPlace`. I did not touch the designer's files (`site.css`, `site.js`, `layout.mjs`, `scripts/*`), `audit.json`, `content.json` or the copy.

## The questions, and where each is answered

Type `beach_lodging`, a `Hotel` per 4h, positioned as a beachfront boutique hotel. The "JS off" check is Playwright at 390 and 1440 with JavaScript disabled, reading the rendered text.

| # | What a traveller asks an assistant | Answer on the page (JS off) | Where | Name in the sentence? |
|---|---|---|---|---|
| 1 | What is The Sandhya, and where? | "An adults-only beachfront boutique hotel on Kabalana Beach, Ahangama, Sri Lanka." Address "Baranige Wattha Walhengoda, Ahangama 80650, Sri Lanka" | h1, booking card h2, footer; `<title>` "The Sandhya, Ahangama" | **no** (R1). In llms.txt it sits under `# The Sandhya`, followed by "The Sandhya, Baranige Wattha Walhengoda, Ahangama 80650, Sri Lanka." |
| 2 | Is it on the beach? | "beachfront … on Kabalana Beach"; "Our position on Kabalana Beach, in a secluded nook"; "Kabalana is a mile long, white sandy beach on the golden south coast of Sri Lanka." | h1, Exclusive Use, Kabalana | no. No distance in metres is published, so none is given |
| 3 | What rooms are there? | "Our 9 spacious rooms …", plus 4 room rows (Studio King, Studio Twin, Studio+ King, Director's Suite: beds, sleeps 2, size and floor) | "The rooms"; JSON-LD `containsPlace`; llms.txt | no (R1) |
| 4 | What does a night cost? | "Nightly rates are on our booking page, for the dates you choose." There is no room rate, on purpose | rooms, booking card | a deliberate gap |
| 5 | Can we take the whole place? | Exclusive Use: weddings, birthdays, retreats. "Exclusive Use of the whole house, per night: US$3,500", with "from", "++" and "as of 2026-11-06" | Exclusive Use | the price label names the whole house |
| 6 | Is breakfast included? | "A continental breakfast for two adults is included in your stay." | Dining, booking card | no |
| 7 | Check-in and check-out times? | "Check-in from 14:00 \| Check-out by 12:00", plus the note "Other sites give different minimum ages for us, and some say check-in is after 16:00. Ask us before you book." | rooms (stay line) | label + time |
| 8 | Adults only? Children? | "adults-only" (h1) and the minimum-age contradiction note | h1, stay line | the age is not stated, because the sources disagree |
| 9 | Is there a pool? | "Dipping your feet in the azure waters of our swimming pool …"; a guest quote about the pool | arrival, Guests | no |
| 10 | Food, and dietary needs? | Chef Christophe DuBois; dishes; in-house breads; "Dishes catering to vegetarian, vegan, keto and other dietary lifestyles are available." | Dining | no |
| 11 | Parking, airport transfer? | "Free parking"; "Airport transfers \| additional charge" | amenities (native `<details>`, closed by default) | list items |
| 12 | Surf lessons, board hire? | "Yoga and surf lessons \| on our list; ask us who runs them and what they cost"; "Surfboard hire \| on our list; …" | amenities | stated only as amenities, never as a surf stay |
| 13 | Wi-Fi, can I work? | "High speed WiFi", "a desk", universal sockets | "Every room has" list | no |
| 14 | How far are Galle and the train? | "Centuries old Galle Fort, a UNESCO World Heritage Site, is just 25 minutes away." "Ahangama train station is 1.4 km from us." | Kabalana and around | partly |
| 15 | How do I book? | 8 plain links to the Cloudbeds engine (the base link + 4 room links, repeated); `tel:+94765700007`; `mailto:reservations@thesandhya.com`; closing "See live dates on our own booking page. If you have a question first, call or email us." | hero, header, rooms, booking card, phone bar, footer | real links that work with JS off |
| 16 | Front desk hours, phone, email? | "The front desk is open 24 hours a day. \| +94 765 700 007 \| reservations@thesandhya.com" | footer | no |
| 17 | Sustainability? | zero food waste, no single-use plastic, water recycling, turtles | Looking after the place | no |
| 18 | Is it any good? | two verbatim Trip.com guest quotes; the page's rating lines (4g/4h) | Guests | **not restated** in llms.txt or JSON-LD (below) |

**JavaScript off: nothing to move.** All 156 llms.txt fragments were checked against the JS-off text at 390 and 1440. Each one is on the page, apart from the joins listed under llms.txt. 32 of them (the amenities) are inside the closed `<details>`. That is a native disclosure, in the HTML and opened without JS. Every one of the 8 links in llms.txt is an `href` on the page, and there were 0 external requests. Only the date fields need JS (4g, `hidden` without it). They are interface, not facts. The page has no canvas or WebGL, and no fact exists only in an image.

**Hidden text: none added.** The body is byte-identical to 4h. The new JSON-LD `containsPlace` mirrors the visible room rows.

## FAQPage: declined

No question is asked on the page. Every heading is a statement ("The rooms", "Kabalana and around"). A `FAQPage` would need question text that no reader sees, which breaks hard constraint 2 and Google's visible-content rule. This is the same call as KA, the Lavish Haven and Global Surf v2. The honest route is R2.

## `/llms.txt` contents

Generated by `src/pages/llms.txt.js` on every build. It is 9 921 B on the preview `dist/`, 9 955 B with the workers.dev `SITE_URL` and 9 837 B on `example.test`. **The rule: it says what the page shows, in the page's order, and nothing more.** Every sentence is a content field. Only the section labels and the "Phone", "Email" and "Address" prefixes are template wording, taken from `labels.mjs` where the page has a label.

1. `# The Sandhya`. The tagline as the blockquote. **On a preview:** "Preview build, not the published site: shown to the owner for review. Do not index, quote or cite it." Then "The Sandhya, Baranige Wattha Walhengoda, Ahangama 80650, Sri Lanka."
2. The intro block under its heading.
3. "The rooms": all 5 paragraphs, then the 4 room rows (label: beds, sleeps n. note).
4. "Check-in and check-out" (14:00, 12:00 and the contradiction note), "Amenities" (29 rows with notes), "The view" (`featureLine`).
5. "The Dining Room", "Casual Luxe" (with the traced Wallpaper* fragment, dossier `press[0]`, Ali Morris), "Kabalana and around" (`spot` first, as on the page).
6. "Guests": the two quotes verbatim (Guest User, Trip.com, June 2026 / February 2026).
7. "Exclusive Use" with the price row, "Looking after the place", "Why Sandhya".
8. "How to book" (5 engine links + `closing`). "Contact and location" (phone, email, address, the 24-hour desk, Map, Instagram). "Pages" (`./` without `SITE_URL`, absolute with it).
9. "Last updated: <date>" from `updatedAt`, once a tenant exists. The demo has none, so it is absent today.

**Joins that differ from the page in form only** (each field was checked on its own): rooms ¶3 appears as its sentence, where the page shows the same items as the "Every room has" icon list (`gaps.roomKit`, cut from that sentence); "King bed, sleeps 2" where the page has "King bed | Sleeps 2"; "(note)" where the page has "| note"; and the name + address line.

**Left out on purpose:** the ratings, because no score is restated for machines and Kayak's 9.4 is not verified by a person. Also `languagesSpoken` (the page prints no sentence for it) and photo alt texts.

**Flag on the price row.** The Exclusive Use rate (US$3,500, "from", "++", for the whole house) is the one price the page prints, so llms.txt carries it with its label and note. It is not a room rate. If you read "no nightly price" to cover it too, delete the `prices` lines in `llms.txt.js` (one line). The page would still show it.

## Crawler policy (owner decision, not yet put to them)

- **Preview** (`dist/`, no `SITE_URL`, and the `…workers.dev` build): `User-agent: *` `Disallow: /`, then the 15 named AI crawlers `Disallow: /`. Also the page's `noindex, nofollow`, no sitemap and no canonical (4h, unchanged).
- **Real domain** (`SITE_URL=https://example.test/`, scratch build): `*` `Allow: /`. Then GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot and MistralAI-User, all `Allow: /` under "owner to confirm". Then `Sitemap: https://example.test/sitemap.xml`.

**Default after a sale: allow all.** The Sandhya competes with its OTA listings for "boutique hotel in Ahangama / Kabalana", so it needs to be quotable. **This is the owner's call and has not been put to them.** For the pitch: "AI assistants may read and quote your site. Keep that, or block the training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) and keep live answers?" Either answer is a one-value edit per bot in `AI_CRAWLERS`.

## Facts the dossier could not support, left unanswered on purpose

- **A room's price per night:** live engine inventory (`offers.nightly_rates`, `booking.live_rates`). No aggregator rate was used.
- **Season / best months:** `season` is null (dossier gap `season`).
- **Minimum age:** the sources disagree (`contradictions.age_policy`). The page says to ask.
- **Minimum stay, reply time, staff and owner names:** dossier gaps.
- **Who runs surf and yoga lessons, and what they cost:** `offers.surf_lessons` gap. The amenity note says to ask.
- **WhatsApp:** `contact.whatsapp` is empty (unconfirmed). Not used.
- **Michelin:** the dossier holds a MICHELIN Guide listing text with no distinction. Nothing from it is used: no name, no quote, not the shipping-container pool detail.
- **Ratings markup:** no `aggregateRating` or `review`. This follows Shahar's KA decision, 4h, and the hold on Kayak.

## Recommendations (visible or schema changes, so not made)

- **R1. A sentence that names the hotel, the beach and the place.** No sentence on the page carries "The Sandhya" together with "Kabalana Beach" or "hotel". The h1 is the tagline without the name (4h "Still wrong" 1). A copy change, for example the tagline as "The Sandhya is an adults-only beachfront boutique hotel on Kabalana Beach, Ahangama, Sri Lanka.", would make the most-asked answer self-contained. That goes through copywriter → humanizer → copyeditor, since `copy/en.json` is final.
- **R2. A visible FAQ block** (playbook §3 item 8) would make an honest `FAQPage` possible. The schema has no `faq` slot (`copyBlocks[].slot` would need one, a proposal). Questions 4, 6, 7, 8, 11 and 14 can be answered from the dossier.
- **R3. A visible last-updated date** from `updatedAt` (base.md §5). It is null until a tenant exists. llms.txt and the sitemap already pick it up. Showing it is a design call.
- **R4. Entity clarity** (4h items 4 and 5): `alternateNames[]` and the Google / Tripadvisor listings as `sameAs` need fields. 4h's `sameAs` includes the Kayak listing URL. It is an entity link, not a score, but drop it if Kayak stays unverified.
- **R5. Preview headers.** A plain-text `llms.txt` cannot carry a robots meta tag. On a preview it relies on `robots.txt` and on saying so in its own text. The deployer (station 6) could add `X-Robots-Tag: noindex` for the whole preview Worker with a `_headers` file, as an extra guard. Not done: it is deployment, and the effect can't be checked locally.

## Checks

| check | result |
|---|---|
| `npm run build` (no `SITE_URL`) | clean, 1 page. `dist/` gains `llms.txt` |
| before vs after `dist/index.html` | non-LD HTML **identical**. 109 043 → 109 968 B (+925 B, gzip -9 44 553 → 44 804, +251 B), all of it `containsPlace`. It is an inert data script at the end of `<body>`, so LCP and CLS were not re-measured |
| JSON-LD | one block, `JSON.parse` ok. 14 → 15 keys on the preview, 18 with `SITE_URL`. **No 4h key changed.** `containsPlace` holds 4 `HotelRoom`. No `aggregateRating`, `review` or `FAQPage`. No network validator was available. Properties checked against schema.org by reading (`containsPlace` on Place, `bed` and `occupancy` on Accommodation) |
| preview (`dist/`) | noindex meta, no canonical, no sitemap. robots: `*` Disallow + 15 bots Disallow. llms.txt has the preview line and `./` |
| `SITE_URL=https://the-sandhya.os1.workers.dev/` (scratch outDir) | same as the preview. `@id …workers.dev/#business`; llms.txt Pages link absolute, with the preview line |
| `SITE_URL=https://example.test/` (scratch outDir) | no noindex, canonical present, sitemap present. robots: `*` Allow + 15 bots Allow + Sitemap. llms.txt without the preview line |
| llms.txt vs the page, JS off (Playwright, 390 + 1440, file://) | 156 fragments, every one on the page except the joins listed above. 8 / 8 links are hrefs on the page. 0 external requests |
| forbidden terms in llms.txt + robots.txt + JSON-LD | Michelin 0, WhatsApp / wa.me 0, 9.4 / 9.7 0, "rating" 0, Booking.com / Agoda 0, "surf camp" / "surf stay" 0. Kayak 1, the 4h `sameAs` listing URL (R4) |
| `node tools/check-design.mjs sites/the-sandhya/final/dist` | 0 failing, 0 warnings |

No server was started (file:// only). The scratch builds and comparison files stayed in the session scratchpad. Nothing was written outside `sites/the-sandhya/`.

## Not verified

- A network schema validator or Google's Rich Results Test.
- How a real answer engine actually reads `llms.txt`. The format is a convention, not a standard.
- A real phone. I did no pixel diff and no `shoot.mjs`, because the rendered markup is unchanged by string comparison.
- The designer's scroll-shift fix running alongside this session. Their files were unchanged (`git status`) at my last build. If they land later, rebuild before the critic. Nothing of mine depends on them.
- `npm test` and `check-wiring`.
