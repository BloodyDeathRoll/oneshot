# KA Surf Hostel — AI SEO report (station 4i)

aiseo 0.2.0 · run `2026-09-ahangama-02` · 2026-09-22 · site: `sites/ka-surf-hostel-and-restaurant/final/` (4g build "Canopy", after the 4h SEO pass)

Nothing visible changed, and no copy was written. Proof is under "Look" below.

## What changed, and where

| file | change |
|---|---|
| `final/src/pages/llms.txt.js` (new) | `dist/llms.txt`, generated at build from `src/tenant/content.json`. Nothing in it is hand-written (contents below). |
| `final/src/pages/robots.txt.js` | This is the SEO agent's file, edited rather than duplicated. `User-agent: *` / `Allow: /` and the `SITE_URL`-gated `Sitemap:` line are unchanged. Added: one explicit group naming 15 AI crawlers, `Allow: /`, with a comment saying the owner must confirm it. The list is built from `AI_CRAWLERS`. |
| `final/src/lib/site.mjs` | `AI_CRAWLERS`: bot name → `'allow'`/`'disallow'`. It is template plumbing, not content (playbook §9: SEO plumbing is not owner-editable). Setting a bot to `'disallow'` is the entire change needed to block it, and it then lands in its own `Disallow: /` group. |
| `final/src/pages/index.astro` | The SEO agent's `Hostel` JSON-LD is **extended, not replaced**: `containsPlace` lists the six `rooms[]` rows as `HotelRoom` {`name` ← `rooms[].label`, `bed` ← `rooms[].beds`, `occupancy` ← `rooms[].sleeps` when set, which is null today}. This is still one block and one graph, with no property duplicated or changed. |
| `final/shots/aiseo/` | shoot.mjs captures of this build. |

`final/notes.md` and `seo-report.md` were not edited.

## Questions identified, and where each is answered

The type is `beach_lodging` next to a surf break. For each question: what the page says, where, and whether the extractable sentence names the business (base.md §2).

| # | Question a traveller asks an assistant | Answered on the page (JS off) | Where | Self-contained with the name? |
|---|---|---|---|---|
| 1 | What is KA Surf Hostel and where is it? | "KA Surf Hostel Surf, chill and feel at home in Ahangama" | h1 (4h) | yes |
| 2 | How far is it from the beach? | "Kabalana Beach is a five-minute walk"; "Ahangama, a five-minute walk from Kabalana Beach." | intro, "Getting here" | **no**: no name in either sentence (recommendation R1) |
| 3 | What rooms are there? Is there a female dorm? | 6 room rows plus "Mixed, female and male dormitories with bunk beds, plus double rooms and deluxe doubles." | "Dorms and private rooms" | no name (R2); also in JSON-LD `containsPlace` and llms.txt |
| 4 | What does a night cost? | No price. "Rates change with the season and the dates — the booking links below show what is actually free." | offer block, footer | this is a gap, left silent on purpose (below) |
| 5 | Is breakfast included? | "Breakfast is included and it is Sri Lankan: rotis, hoppers…" | "Breakfast changes every morning" | no name (R3) |
| 6 | Check-in / check-out times? | Check-in 13:00 to 23:00, check-out by 13:00, "Reception is open 24 hours." | "Getting here" `dl.times` + note | as a label/value pair; also JSON-LD `checkinTime`/`checkoutTime` (4h) |
| 7 | Are children or pets allowed? | "Children are not accommodated, and cots and extra beds are not available."; "Pets are welcome on request at no charge." | stay note, "What is here", amenity list | no name |
| 8 | How do I get there from the airport or station? | "Koggala Airport is about 5 km away; Ahangama railway station is a little over 2 km. The property arranges a shuttle." | "Getting here" | no name (R1) |
| 9 | Which wave, and is it good for beginners? | "Kabalana: a sandy beach break that suits beginners and improvers, with The Rock reef alongside it when the swell is up." | h2 in the wave section | names the spot; self-contained about the wave |
| 10 | Is it any good? (ratings) | 9.8/10 Hostelworld (66), 9.5/10 Booking.com (38), 4.8/5 Google (42); five verbatim quotes with author and source | clearing, tiles, quotes | label + number + source, yes |
| 11 | How do I book? | 3 "Check dates" listings (17 links), phone +94 77 374 6053 | header, clearing, rows, footer, bottom bar | real links, work with JS off |
| 12 | Amenities: Wi-Fi, A/C, laundry, scooter, security? | 17 amenity rows | "What is here" list; JSON-LD `amenityFeature` (4h) | list items |
| 13 | Where exactly? | "No 207/A, Welhengoda, 80650 Ahangama, Sri Lanka" + "Open the map" | "Getting here", map fallback, footer; JSON-LD address/geo (4h) | yes |
| 14 | Surf forecast today? | Link "See today's forecast for Kabalana on Rosa" (JS off). Live numbers only with JS. | wave section | third-party data, not a fact about the business; correctly JS-only |

**JavaScript off.** I checked `dist/index.html` with scripts, styles and SVG stripped. All 34 answer strings above are present in the server HTML, with 0 missing. There are 17 listing hrefs and 5 `tel:+94773746053` links. Only two things need JS: the forecast numbers (Rosa's live data, whose fallback link is in the HTML) and the slide-out's context line (it repeats the room row). **Nothing had to be moved.** The canopy canvas/SVG is decoration and holds no facts.

**Hidden text.** I added none: no visually-hidden classes (0 in the HTML), no `display:none` blocks, no text aimed at models. Everything new is in `robots.txt`, `llms.txt` and the JSON-LD `containsPlace` (standard metadata that mirrors the visible room list).

## FAQPage: declined, on purpose

The page has no questions on it. Every heading is a statement ("Getting here", "What is here"). A `FAQPage` would have to put question text into the markup that no human reader sees. That is what hard constraint 2 forbids ("no text aimed at a model but concealed from a human"), and Google's FAQ guidelines also require the Q&A to be visible on the page. base.md §3 covers only "answers that genuinely are questions", and on this page there are none. **If Shahar wants one**, the honest route is a visible FAQ block (recommendation R5). Its JSON-LD would then be generated from the same fields.

## `/llms.txt` contents

It is generated at build by `src/pages/llms.txt.js` from `content.json`, so it cannot diverge from the page. It is 5 079 B. The sections, in order:

1. `# KA Surf Hostel`, then a blockquote of `tagline` + intro heading, then "KA Surf Hostel, <contact.address>.", then the intro body.
2. `## Dorms and private rooms`: the offer body (including the "Rates change…" line), then the six `rooms[]` rows.
3. One section per remaining `copyBlocks[]` row, under its own heading: breakfast, what is here, staff, getting here.
4. `## Amenities` (17 rows with notes). `## Check-in and check-out` (from `stayInfo`). `## The wave` (`spot`; `season` would appear here but is null).
5. `## Ratings`: platform (linked when the row has a URL), score/scale, count. `## What guests wrote`: the five testimonials verbatim, with author, platform and month where the row has one.
6. `## How to book`: the three `bookingLinks[]` and the phone. `## Location`: address and map link.
7. `## Pages`: the site URL (absolute `https://<domain>/` when built with `SITE_URL`, `./` without it; checked both ways) and the Rosa forecast link. "Last updated: <date>" is added from `updatedAt` once the CMS supplies it (null today, so omitted).

Only the section labels ("Amenities", "How to book"…) are template wording. Every sentence is a content field.

## Crawler policy (owner decision, must be confirmed)

`robots.txt` now names, each with `Allow: /`: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot, MistralAI-User. `*` still allows everything, so any bot not named is also allowed.

**Default: allow all.** Being quotable is the point for a hostel that competes on answers to "where to stay near Kabalana". **This is the owner's call and has not been put to them.** Put it in the pitch as a question: "AI assistants may read and quote your site — keep that, or block training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) while keeping live answers?" Either answer is one edit to `AI_CRAWLERS`.

## Facts the dossier could not support, left unanswered on purpose

- **Price per night.** Rates are live OTA inventory (schema rule "Live prices are not content"). The page points to the listings.
- **Parking.** Booking.com says "No parking available" and Hostelworld says "Free Parking" (dossier `house_rules[0]`, a contradiction). Silent. Only "Bicycle parking" (an amenity row) is shown.
- **Season / best months.** `season: null`, and the dossier has no sourced season. Silent.
- **WhatsApp, email, reply time.** Gaps. Not stated.
- **Check-in window.** The page (passed copy) says 13:00–23:00 from Hostelworld. The dossier records that Booking.com says "available 24 hours" (a `contradictions[]` entry). I repeated the page's figure and did not resolve it. Owner item.
- **Surf lessons / board hire.** No `lessons[]` or `rentals[]`, only "Scooter rental (surf rack available)". Silent.
- **`aggregateRating` / `review` markup.** Still omitted, for 4h's reasons (third-party scores). Not added here.

## Recommendations (visible changes, so not made)

These need new or reworded copy (copywriter → humanizer → copyeditor) or a schema field. All facts are already in the dossier and on the page.

- **R1. Name in the distance sentence.** "Getting here" opens "Ahangama, a five-minute walk from Kabalana Beach." Suggested: "KA Surf Hostel is in Ahangama, a five-minute walk from Kabalana Beach." This is the single most-asked question, and today no sentence on the page carries the name, the beach and the distance together.
- **R2. Rooms paragraph.** "Mixed, female and male dormitories…" could become "KA Surf Hostel has mixed, female and male dormitories…".
- **R3. Breakfast.** "Breakfast at KA Surf Hostel is included and it is Sri Lankan…".
- **R4. Visible last-updated date** (base.md §5), from `updatedAt`. It is null until the tenant exists. It would add a visible line (the footer is the natural place), so it is a design decision for Shahar. JSON-LD/llms.txt get it automatically once `updatedAt` is set (llms.txt already does).
- **R5. A visible FAQ block** (playbook §3 item 8) as `copyBlocks[]` rows, e.g. heading "How far is the beach?" with body R1's sentence. That would make a truthful `FAQPage` possible. The schema has no question/answer slot: `copyBlocks[].slot` would need an `faq` value (a proposal, not made here). The candidates the dossier can answer are questions 2, 3, 5, 6, 7, 8 and 9 above.
- **R6. Entity clarity.** 4h's schema proposals (`alternateNames[]` for "KA surf hostel and restaurant" and "K A Surf Hostel", `socials[]` for Instagram/Google/Tripadvisor in `sameAs`) matter for answer engines too. Without them a model may attribute KA's facts to the OTA listing names. I support them, and I did not add them without a field.

## Measured

| | after 4h | after 4i | target (playbook §4) |
|---|---|---|---|
| HTML | 75 851 B (gzip -9 25 639) | 76 333 B (gzip -9 25 719) | — |
| First-load transfer | 208 272 B (203 KB) | 208 754 B (204 KB) | ≤ 1.5 MB |
| JS files | 0 | 0 | ≤ 300 KB |
| LCP | 388 ms | 384 ms | ≤ 2.5 s |
| CLS | 0 | 0 | < 0.1 |
| Third-party on load | 0 | 0 | 0 |
| JSON-LD | 1 block, 13 keys | 1 block, 14 keys (+`containsPlace`, 6 rooms); 17 with `SITE_URL` | parses |

The 482 B (+80 B gzip) is the `containsPlace` array. `llms.txt` and `robots.txt` are not fetched on page load.

### Look (no visible change)

shoot.mjs `final/shots/aiseo/` vs `final/shots/seo/`: same page heights (desktop 11 835, mobile 13 656) and capture counts (15 / 18). Per-capture pixels differing (channel delta > 8): **0.00% for every capture except desktop-00 (0.03%) and mobile-00 (0.08%)**. Those differences are spread across the live canopy leaves on the first screen (the canopy draws randomly, as 4h saw). I viewed mobile-00 side by side and the text, ratings and bar are identical.

## Checks, verbatim

```
$ npx --no-install astro build        (in final/)
…
  ├─ /llms.txt (+4ms)
  ├─ /robots.txt (+1ms)
  ├─ /index.html (+4ms)
✓ Completed in 15ms.
[build] 1 page(s) built in 178ms
[build] Complete!

$ node tools/check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist --no-shots
ok    sites/ka-surf-hostel-and-restaurant/final/dist
      look: fonts h1 "Outfit" · h2 "Outfit" · body "Outfit"   ground rgb(240, 241, 242) = hsl(210 7% 95%)   all-caps labels 0   labelled headings 0/8
│ 0       │ 'sites/ka-surf-hostel-and-restaurant/final/dist' │ 0        │ 0        │
1 page(s) · 0 failing · default-look warnings never fail

$ node tools/audit-mockup.mjs ka-surf-hostel-and-restaurant ../final
audited ka-surf-hostel-and-restaurant/../final
│ (index) │ slug                     │ variant    │ first KB │ JS KB │ LCP ms │ CLS │ 3rd party │ noJS links │ kbd ok │ alt miss │
│ 0       │ 'ka-surf-hostel-and-res' │ '../final' │ 204      │ 0     │ 384    │ 0   │ 0         │ 4          │ 'n/a'  │ 0        │

$ node tools/shoot.mjs http://127.0.0.1:8952/ --out sites/ka-surf-hostel-and-restaurant/final/shots/aiseo
desktop: 15 captures, page 11835px
mobile: 18 captures, page 13656px

JSON-LD parse (dist/index.html): 1 block, 14 keys — @context,@type,name,description,telephone,address,geo,hasMap,checkinTime,checkoutTime,amenityFeature,containsPlace,knowsLanguage,sameAs
JSON-LD parse (SITE_URL=https://example.test/ build): 1 block, 17 keys, @id https://example.test/#business
noJS text: checked 34 missing []
GET /llms.txt → 200 text/plain
```

`final/audit.json` was rewritten by the audit (bytes_total 208 754, lcp_ms 384, cls 0, third_party_hosts []). The `SITE_URL` check build went to `final/.astro/siteurl-check/` and was deleted afterwards. It emitted `sitemap.xml`, `Sitemap: https://example.test/sitemap.xml` in robots.txt, and an absolute site URL in llms.txt.

No network schema validator was used. `HotelRoom` is a schema.org Place/Accommodation subtype; `bed` accepts Text on HotelRoom; `containsPlace` is a Place property that Hostel inherits. A dorm bed is not strictly a "room", but HotelRoom is the closest type that carries `bed`.

---

## Re-run after 4g round 2 — 2026-09-22

aiseo 0.2.0 · same run, after the 4h re-run (`seo-report.md`, same date). What changed in the build: new `contact.address` ("207/A Welahangoda, 80650 Ahangama, Sri Lanka"), a new breakfast block ("Breakfast, every day" / "Rotis, fruit, pancakes and eggs, with vegan options."), `amenities[0]` "Free breakfast", a new `spot`, and a Google Maps link in place of the OSM embed.

**Result: the rebuild broke nothing in the AI-SEO layer. No file was changed, and no copy was written.**

### Re-verified

- **`/llms.txt`** is regenerated from `content.json` by `src/pages/llms.txt.js`. It is now 4 867 B (was 5 079). New texts present: the address twice (under the H1 and in `## Location`), `## Breakfast, every day` with the new body, "- Free breakfast" first under `## Amenities`, and the new spot sentence under `## The wave`. The map link is `contact.mapUrl`. Old texts: 0 hits for "Welhengoda", "No 207", "Breakfast changes", "changes daily", "more often", "swell is up", "improvers", "openstreetmap". Elena's Hostelworld quote still says "which changes every day". It is a verbatim testimonial, so it stays as written.
- **robots.txt**: `*` allow, plus the named group of 15 AI crawlers with `Allow: /` and the "owner to confirm" comment. Unchanged. The owner decision is still open.
- **Rooms in the JSON-LD**: `containsPlace` = 6 × HotelRoom (3 bunk-bed dorms, Double room, 2 × Deluxe double room), `bed` from `rooms[].beds`, no `occupancy` (`sleeps` null). This matches `rooms[]` and the visible list. One graph, still no FAQPage (declined, reason unchanged).
- **JS-off answer check** on `dist/index.html` with scripts, styles and SVG stripped. 38 strings: name, tagline, distance ×2, rooms paragraph + 5 room labels + bed, rates line, **"Breakfast, every day", "Rotis, fruit, pancakes and eggs, with vegan options.", "Free breakfast"**, 13:00, 23:00, reception / children / pets sentences, airport, station, shuttle, **the new spot sentence**, the six rating numbers, four amenities, **"207/A Welahangoda, 80650 Ahangama, Sri Lanka", "Open in Google Maps"**, the Rosa fallback link text, the phone. **38 present, 0 missing.** On the first pass one string was checked as "Scooter rental (surf rack available)". That fails, because the page renders the note in its own `<i>` ("Scooter rental <i>surf rack available</i>"). Re-checked as rendered: present. Links with JS off: 12 Hostelworld, 3 Booking.com, 2 Agoda, 5 `tel:+94773746053`, 2 Google Maps. Visually-hidden classes: 0.

### Question table: rows that changed

| # | Question | Answer on the page now | Self-contained with the name? |
|---|---|---|---|
| 5 | Is breakfast included? | "Free breakfast" (first amenity row, and JSON-LD `amenityFeature[0]`). Under the heading "Breakfast, every day": "Rotis, fruit, pancakes and eggs, with vegan options." | no. The old "Breakfast is included…" sentence is gone. "Included" is now carried only by the amenity label and the heading's "every day". |
| 9 | Which wave, and is it good for beginners? | "Kabalana: a sandy beach break for beginners and intermediates, and The Rock, a reef A-frame for advanced surfers." (h2, llms.txt "The wave") | Self-contained about the waves. It now also answers "is there anything for advanced surfers?". |
| 13 | Where exactly? | "207/A Welahangoda, 80650 Ahangama, Sri Lanka" + "Open in Google Maps" (Getting here) / "Open the map" (footer), both to the Google Maps listing. JSON-LD PostalAddress split (4h). | yes |

All other rows are unchanged. **R3 updated:** the breakfast sentence that R3 proposed to reword no longer exists. The equivalent now would be a body like "Breakfast at KA Surf Hostel is free: rotis, fruit, pancakes and eggs, with vegan options." That is copy work (copywriter → humanizer → copyeditor), not done here. R1, R2, R4–R6 stand as written.

### Measured

| | first pass (after 4i) | now |
|---|---|---|
| llms.txt | 5 079 B | 4 867 B |
| JSON-LD | 1 block, 14 keys; 17 with `SITE_URL` | same |
| First-load transfer / LCP / CLS / 3rd party | 204 KB / 384 ms / 0 / 0 | 226 KB / 380 ms / 0 / 0 (the +22 KB is the breakfast photo entering the lazy margin, see `seo-report.md` re-run) |

Look: no file changed. The shots in `final/shots/seo-2/` serve both re-runs: 0.00% differing vs `round-4/` except mobile-00 at 0.02% (canopy) and desktop-11 at 8.35% (Rosa widget loaded now, blank then). A flaky blank canopy capture and a widget/headline overlap at 1440 are described in `seo-report.md` re-run → Look.

### Checks, verbatim

See `seo-report.md`, "Re-run after 4g round 2 → Checks, verbatim". It is the same build and the same runs, done after both re-runs. Plus:

```
GET /llms.txt → 200 text/plain, 4867 B · GET /robots.txt → 200 text/plain
noJS text: checked 38 missing [] (scooter row checked as rendered: "Scooter rental surf rack available": true)
hrefs: hostelworld 12 booking 3 agoda 2 tel 5 gmaps 2
old: Welhengoda=0 No 207=0 Breakfast changes=0 changes daily=0 improvers=0 swell is up=0
visually-hidden classes: 0
```

---

## Re-run after 4g round 3 — 2026-09-22

aiseo 0.2.0 · same run, after the 4h re-run (`seo-report.md`, "Re-run after 4g round 3"). What changed in the build: `copy/en.json` re-passed 4c and was re-seeded, moving four values in `content.json` — a new intro body, a new offer body ("private lockers", "The bathrooms are modern and the showers are hot", "Rates change with the dates"), a rewritten "What is here" body ending "Reception is open 24 hours.", and `amenities[3].label` "Private lockers and personal fridge in every room". Plus the forecast fallback keeping its reserved box, and the footer's map link now reading "Open in Google Maps".

**Result: the rebuild broke nothing in the AI-SEO layer. No file was changed, and no copy was written.**

### Re-verified

- **`/llms.txt`** is regenerated from `content.json` by `src/pages/llms.txt.js`, so it cannot diverge. **4 832 B** (was 4 867). The new copy is in, in the right sections: under the H1, "A family runs this place, and they set out to make you feel at home from the moment you arrive. Kabalana Beach is a five-minute walk." and "Dorms if you want the company, private rooms if you don't."; under `## Dorms and private rooms`, "Every room has air conditioning and a fan, private lockers and a personal fridge. The bathrooms are modern and the showers are hot." and "Rates change with the dates, and the booking links below show what is actually free."; `## What is here` now runs as full sentences and ends "Reception is open 24 hours."; `## Amenities` line 4 is "Private lockers and personal fridge in every room"; `## Location` links `contact.mapUrl`. The retired phrases are out: "ten minutes" 0, "come back wet" 0, "open to the sky" 0, "with the season" 0, "if you ask" 0, "a private locker" 0, "Open the map" 0 — and the same 7 are 0 in `dist/index.html` too. Elena's Hostelworld quote still contains "which changes every day"; it is a verbatim testimonial and stays as written. Served: `GET /llms.txt` → 200 `text/plain`, 4 832 B. With `SITE_URL` the `## Pages` link becomes absolute (`https://example.test/`) — re-checked on a throwaway build, then deleted.
- **AI-crawler rules in `robots.txt`** (512 B): `User-agent: *` / `Allow: /`, then the one explicit group naming GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot, MistralAI-User with `Allow: /`, under the comment that says the owner must confirm it. Unchanged, still allow-all, **and the owner decision is still open** — it belongs in the pitch.
- **Rooms in the JSON-LD**: `containsPlace` = 6 × `HotelRoom` (Bunk bed in mixed / female / male dormitory, each `bed` "1 bunk bed"; Double room and Deluxe double room, "1 extra-large double bed"; Deluxe double room, "1 single bed"), matching `rooms[]` and the visible list, with no `occupancy` (`sleeps` still null). One graph, 14 keys, no second block. Still no `FAQPage` — the page has no visible questions, and the reason in the first pass is unchanged. Round 3 did not touch `rooms[]`.
- **JS-off answer strings.** `dist/index.html` with `<script>`, `<style>` and `<svg>` stripped, entities decoded. **45 strings checked, 0 missing.** Updated for round 3: the three new intro sentences, "Every room has air conditioning and a fan, private lockers and a personal fridge.", "The bathrooms are modern and the showers are hot.", "Rates change with the dates, and the booking links below show what is actually free.", the four new "What is here" sentences plus "Reception is open 24 hours.", "Private lockers and personal fridge in every room", and "Open in Google Maps" (replacing "Open the map"). Unchanged and still present: name, tagline, the distance line, the rooms paragraph and the six room labels, the breakfast heading and body, "Free breakfast", 13:00 / 23:00, the children and pets sentences, airport / station / shuttle, the spot sentence, the six rating numbers, the address, the Rosa fallback link text, the phone. Links with JS off: 12 Hostelworld, 3 Booking.com, 2 Agoda, 5 `tel:+94773746053`, 2 Google Maps, 2 rosa.surf. Visually-hidden classes: 0. Nothing had to be moved.

### Question table: rows that changed

| # | Question | Answer on the page now | Self-contained with the name? |
|---|---|---|---|
| 2 | How far is the beach? | intro: "Kabalana Beach is a five-minute walk." (its own sentence now, where round 2 had it inside a longer clause); "Getting here": "Ahangama, a five-minute walk from Kabalana Beach." | still **no** name in either sentence — **R1 stands**, and the shorter intro sentence makes it an easier fix. |
| 3 | What rooms are there? | unchanged paragraph + 6 rows, but the room detail after it is new: "Every room has air conditioning and a fan, private lockers and a personal fridge. The bathrooms are modern and the showers are hot." | no name (R2). Answers "is there a locker?" and "are there hot showers?" more directly than round 2's wording, and the locker fact now matches `amenityFeature[3]` word for word. |
| 4 | What does a night cost? | "Rates change with the dates, and the booking links below show what is actually free." (was "with the season and the dates") | Still a deliberate gap — and the new wording is better for an answer engine: it no longer implies a seasonal rate card the dossier cannot support. |
| 7 | Children / pets? | "Pets are welcome on request at no charge. Children are not accommodated." — both now in the rewritten "What is here", plus the stay note and the amenity row | no name |
| 12 | Amenities | 17 rows; row 4 is now "Private lockers and personal fridge in every room" (was a singular locker). Prose in "What is here" agrees with the list. | list items; `amenityFeature` in the JSON-LD says the same |
| 13 | Where exactly? | "207/A Welahangoda, 80650 Ahangama, Sri Lanka" + **"Open in Google Maps" in both places** (Getting here and footer; "Open the map" is gone) | yes. One label for one URL is one less thing for a model to treat as two links. |
| 14 | Surf forecast today? | unchanged answer, but the fallback is now more robust: with JS off or the request failed, the headline half keeps its reserved box and only its contents are hidden, so the plain link "See today's forecast for Kabalana on Rosa" sits where the widget would be, with no layout jump (CLS 0 on every failure path, `notes.md` round 3). | third-party data, still correctly JS-only, still a real link in the HTML |

All other rows are unchanged. **Recommendations:** R1, R2, R4, R5, R6 stand exactly as written. R3 (breakfast sentence) stands in the form given in the round-2 re-run — round 3 did not touch the breakfast block. No new recommendation: round 3's copy did not remove any answer, and it added none that needs a home.

### Facts left unanswered on purpose

Unchanged: price per night (live OTA inventory), parking (Booking.com and Hostelworld contradict each other), season (`season: null`), WhatsApp / email / reply time (gaps), the check-in window contradiction, surf lessons and board hire (no `lessons[]`/`rentals[]`), and `aggregateRating`/`review` markup. Round 3 wrote no new fact, so nothing moved into or out of this list.

### Measured

| | round-2 re-run | now |
|---|---|---|
| `llms.txt` | 4 867 B | 4 832 B |
| JSON-LD | 1 block, 14 keys; 17 with `SITE_URL` | same |
| First-load transfer / LCP / CLS / 3rd party | 226 KB / 380 ms / 0 / 0 | 227 KB / 396 ms (3 runs 396/388/396) / 0 / 0 |
| JS-off answer strings | 38 checked, 0 missing | 45 checked, 0 missing |

`llms.txt` and `robots.txt` are not fetched on page load, so neither is in the first-load number.

### Look

No file changed. `shoot.mjs` `final/shots/seo-3/` serves both re-runs: vs `final/shots/round-6/`, 0.00 % differing on 30 of 33 captures, desktop-00 0.03 % and mobile-00 0.05 % (the canopy's randomness, leaves present in both), desktop-11 9.65 % confined to Rosa's widget box (x 698…1117 — the widget loaded in this shoot and was blank in round-6). Details in `seo-report.md`, same date, "Look".

### Checks, verbatim

See `seo-report.md`, "Re-run after 4g round 3 → Checks, verbatim" — the same build and the same runs, done after both re-runs. Plus:

```
GET /llms.txt → 200 text/plain; charset=utf-8, 4832 B · GET /robots.txt → 200 text/plain; charset=utf-8
noJS text: checked 45 missing []
hrefs: hostelworld 12 booking 3 agoda 2 tel 5 gmaps 2 rosa 2
visually-hidden classes: 0
retired in dist (index/llms): "ten minutes" 0/0 · "come back wet" 0/0 · "open to the sky" 0/0 ·
  "with the season" 0/0 · "if you ask" 0/0 · "a private locker" 0/0 · "Open the map" 0/0
JSON-LD containsPlace: 6 HotelRoom
robots.txt: 512 B, 1 wildcard group + 15 named AI crawlers, all Allow: /
llms.txt with SITE_URL=https://example.test/ : "## Pages" → https://example.test/ (4851 B); build deleted
```
