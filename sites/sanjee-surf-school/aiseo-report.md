# Sanjee Surf School: AI SEO report (station 4i)

aiseo 0.2.2 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-05 · site: `sites/sanjee-surf-school/final/` (the 4g build after the 4h SEO pass and its correction)

Nothing visible changed and no copy was written. The built `index.html` is byte-identical to the one before this station. `FAQPage` was declined, so the JSON-LD is unchanged too. This station adds `/llms.txt` and names the AI crawlers in `robots.txt`.

## What changed, and where

| file | change |
|---|---|
| `final/src/pages/llms.txt.js` | New. Generates `dist/llms.txt` from `content.json` and `labels.json` with the page's own helpers. |
| `final/src/pages/robots.txt.js` | Lotus's shape. On a preview, `*` and the 15 named AI crawlers all get `Disallow: /`. On a real domain, all get `Allow: /`, marked "owner to confirm", plus the Sitemap line. |
| `final/src/lib/site.mjs` | New `AI_CRAWLERS`, the same 15 bots as the other finals. New `lessonDetails()`, moved from `index.astro` so the page and llms.txt print one details line. |
| `final/src/pages/index.astro` | Uses `lessonDetails()`. Output unchanged. |

`swell.js`, `site.js`, the CSS, `content.json`, the copy and the dossier were not touched.

## Decisions that override the prompt

1. **`FAQPage`: declined.** `base.md` step 3 asks for it where answers "genuinely are questions". The page has 0 question marks and every heading is a statement. Marking up questions no reader sees breaks hard constraint 2. Adding visible questions would be new copy, which is out of scope, and it would change the page. KA, Layday, The Lavish Haven, Global Surf (both), Cheeky Monkey and Lotus all declined it for the same reason. No visible Q&A was added.
2. **No ratings markup** (Shahar, 2026-09-22, KA, `ledger.jsonl`). No `aggregateRating` or `review` anywhere. The visible rating stays, and llms.txt prints only what the page prints beside it.
3. **"A heading that matches the question" (`base.md` step 1): not met.** It would need new headings, so it is listed under gaps below.

## Questions identified

Type `surf_school`. "Name?" asks whether the extractable sentence carries the business name (`base.md` step 2). All answers below are in the HTML with JS off.

### Answered, in the passed copy's words

| # | Question | Answer on the page | Where | Name? |
|---|---|---|---|---|
| 1 | What is it, and where? | "Sanjee Surf School"; "Surf lessons in Weligama, on the south coast of Sri Lanka."; "Kadabaddagama, Weligama 81700, Sri Lanka" | h1, lead, footer, Finding us | h1 and footer only (G1) |
| 2 | Do you teach beginners? Is it for my level? | "You can come to us as a total beginner, a beginner who can already stand up, an intermediate or an advanced surfer." Each card lists its levels. | Who we teach, cards | no |
| 3 | What does a lesson cost? How long is it? | USD 40 per lesson, USD 50 per lesson, USD 160, each 2 hours; "All prices are as of 5 November 2026." | cards, Before you book | card labels |
| 4 | What is included? | "Every lesson includes professional instruction and a beach safety briefing. Board and rash guard rental is in the price too." Plus each card's line. | Lessons | no |
| 5 | Age, and do I need to swim? | "You need to be able to swim at least 50 meters unaided."; "We teach kids from age 6 and up. Anyone under 18 must be accompanied by a parent or legal guardian." | Before you book | no |
| 6 | What language are lessons in? | "Lessons are in English as standard."; "Languages: English \| Sinhala" | Who we teach, Sanjee | no |
| 7 | Can I rent a board? What sizes, what price? | Six board types with lengths; the rental table, dated | Board rental | no |
| 8 | Which wave, and when? | "Coco Beach is our home spot, a beach break…"; "Best surf season runs November to April; peak swell and dry weather are December–February."; the other waves as the school rates them | Waves | no |
| 9 | What tours are there? | 12 tours with price, length and note, dated; "A tour's price is for the tour, not per person." | By tuk-tuk | tour names |
| 10 | Who teaches? | "Sanjee, head instructor", and the two first-person sentences | Sanjee | his name, not the school's |
| 11 | Is it any good? | "5/5", "13 Google reviews", "as of 5 November 2026"; 4 verbatim quotes | after the cards, reviews | label + number + source |
| 12 | How do I book? | "Send us the lesson and date you want on WhatsApp, or call the same number." 22 `wa.me` and 3 `tel:` links, plus email | header, cards, closing, footer, phone bar | no |

### Left unanswered on purpose

These are the open points in the dossier's `contradictions` and `gaps`. No side was picked in the page, llms.txt or the JSON-LD.

| Question | What is said | Why |
|---|---|---|
| Opening hours | Nothing. `openingHours` is empty and `hoursNote` is null. | Three published sets (`contradictions`: hours). |
| Cancellation | Nothing. | Two policies (`contradictions`: cancellation). |
| Lesson group size, and whether lessons are private or group | Beginner Lesson says nothing. Private Coaching says "One-on-one". Week Intensive says "5 private sessions". "For group bookings, please leave us a message." | `contradictions`: lesson format. The copy's lines hold on every side. |
| Tour group size | "Ask us how many people can come." | `contradictions`: tuk-tuk price and size. |
| Deposit | For rentals: "a refundable deposit. Ask us how much it is." No amount. For lessons and tours: nothing, no online booking and no deposit are mentioned. | `contradictions`: rental deposit. The old site's booking deposit is not this page's path. |
| How to pay | "Cash on the day can be LKR, USD or EUR." Cards: nothing. | `contradictions`: card on the day. |
| Years of experience, student and lesson counts | Nothing. | `contradictions`: experience, students; `claims_unconfirmed`. |
| Who owns or runs it | Nothing. Sanjee appears as head instructor only. | `flags_for_operator`. |
| Where Coco Beach sits in the bay | Nothing beyond the copy's "Coco Beach, Weligama". | `contradictions`: where Coco Beach is. |
| Reply time | Nothing. | No source. |
| Water temperature, board swaps, multi-day packages beyond the Week Intensive | Nothing. | `contradictions`. |

### Answered only in part

- **How far from the sand.** The only statement is the copy's "Our shop sits 30 seconds from the sand at Coco Beach, Weligama." It is about the shop. It stays in the rental section, on the page and verbatim in llms.txt. It was not lifted into a standalone answer or tied to the Google address. Copy review (R4) passed it as an owner item, because the dossier doesn't say the Google pin marks the shop.
- **Certification.** The page prints "ISA Level 1 Surf Instructor \| International Surfing Association" and "Certified Surf Lifeguard \| Sri Lanka Lifesaving" in Sanjee's section only. Both are passed copy (R2, N5), self-reported with no certificate found. **They are not in llms.txt or the JSON-LD**, following 4h's call not to repeat them as machine-readable claims. Nothing is said about other instructors.

## `FAQPage` data

None. See "Decisions" above.

## `/llms.txt`

8,158 B on a preview, 8,104 B on production. It is generated at build time and follows page order:

1. `# Sanjee Surf School`, the tagline as a blockquote, and the name with the address.
2. Who we teach. Lessons, with the 3 rows and the date. Before you book. Board rental, with the 8 rental rows, the bodyboard, the 2 shop items and the date.
3. Sanjee, head instructor, with the languages line. Google reviews: "5/5, 13 Google reviews | as of 5 November 2026", then the 4 quotes.
4. Waves (`spot`, `season`). Other waves. By tuk-tuk, with the 12 tours and the date.
5. "Ask on WhatsApp": `closing`, the WhatsApp link, phone, email. Finding us: the sentence, the address, the map link. Pages.

Every price section ends with "All prices are as of 5 November 2026." Section labels reuse `labels.json` or the copy's headings; "Pages" is the only new label. `featureLine` is left out as a slogan. A "Last updated" line prints once `updatedAt` exists; the seed has none.

**Preview against production** (the only differences):

```
preview:     Preview build, not the published site. Do not index, quote or cite it.
preview:     - [Sanjee Surf School](./)
production:  (no preview line)
production:  - [Sanjee Surf School](https://example.com/)
```

A `workers.dev` `SITE_URL` gives the same file as the preview. Serving the file on a preview with that line follows KA and the later finals; robots refuses it to crawlers there anyway. I shortened the line by dropping "shown to the owner for review", which this test run couldn't claim.

## Crawler policy (owner decision, must be confirmed)

- **Real domain:** `*` `Allow: /`, then GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot and MistralAI-User, each `Allow: /` with the "owner to confirm" comment, then `Sitemap:`.
- **Preview (`dist/` now, and any workers.dev or localhost `SITE_URL`):** `*` and all 15 `Disallow: /`, no Sitemap line, no `sitemap.xml`, `noindex, nofollow` on the page.

**Allow is the prompt's default, and it has not been put to the owner.** The writer should ask: keep it, or block the training crawlers (GPTBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, ClaudeBot) and keep the live-answer agents. Either way it is one edit to `AI_CRAWLERS`.

## JavaScript off and hidden text

- Chromium with JS disabled, at 390 and 1440: 117 strings from `content.json` checked against visible text, 0 missing. That covers every copy paragraph, every price and note, both credentials, the languages, the rating and the quotes. `wa.me` 22, `tel:` 3.
- Words shown with JS on (with one tile tapped) that aren't in the JS-free HTML: only the WhatsApp message preview ("Hello…", "I'd like…", "I'm… beginner"). The other hits are two words run together by table cells. **No fact lives only in the tiles, chips or swell, and nothing had to be moved.** The tile labels repeat "Who we teach". The swell canvas is `aria-hidden` and holds no text.
- Hidden text: none added. Everything new is in `robots.txt` and `llms.txt`.

## Before and after

Chromium, full-page captures on my own server (ports 9420 and 9421, stopped after), reduced motion, lazy images scrolled in.

| width | JS | before | after | result |
|---|---|---|---|---|
| 390 | on | `cb016f6bb98efa6a` | `cb016f6bb98efa6a` | identical |
| 390 | off | `83da732a69091cc5` | `83da732a69091cc5` | identical |
| 1440 | on | `4fb43fd2dffbd102` | `4fb43fd2dffbd102` | identical |
| 1440 | off | `a035f898cd756906` | `a035f898cd756906` | identical |

A before-against-before control matched in all 4. `diff -rq` on `dist/`: `index.html` and every font and photo are the same, `robots.txt` differs, `llms.txt` is new. With normal motion at 390 and 1440, the swell canvas has opacity 1, the 5 tiles are present, a typed date reaches the send link, and there are 0 console errors and 0 off-site requests.

Performance was not re-measured, because the page is byte-identical to 4h. `llms.txt` and `robots.txt` aren't fetched on load.

## Validation

```
npm run build (no SITE_URL)                    index.html, llms.txt, robots.txt; no sitemap; noindex
SITE_URL=https://…os1.workers.dev/ (scratch)   same llms.txt and robots.txt as above; noindex; no sitemap
SITE_URL=https://example.com/ (scratch)        Allow, Sitemap, sitemap.xml; no robots meta
validator.schema.org, JSON-LD block only       preview 1 object, 0 errors, 0 warnings
                                               production 1 object, 0 errors, 0 warnings
JSON-LD                                        1 block; 15 keys preview, 18 production; no aggregateRating, review or FAQPage
llms.txt against the page, by script           every sentence verbatim, except the rental rows (rebuilt from the
                                               table's row and column headers, read against en.json) and the
                                               template's "Pages" and preview lines
llms.txt word check                            0 hits: Marcel, Panzer, Berlin, founder, owner, operator, cancel,
                                               years, eastern, reply, online, card, ISA, certified, deposit amounts,
                                               the rejected review count, opening hours
```

The validator run also closes the note at the top of `seo-report.md`: the JSON-LD has now been submitted since the rating was removed.

## Gaps: visible changes, so not made

These need copy work or a schema field.

- **G1. The name in the first sentence** (`base.md` step 5). The tagline starts "Surf lessons in Weligama" and the first paragraph "You can come to us". The name sits in the h1 and footer only. Today no sentence on the page says "Sanjee Surf School teaches surf lessons in Weligama".
- **G2. Question headings or a visible FAQ.** It would allow an honest `FAQPage`, and would need a `faq` slot in `schemas/site-content.md`. The proposal hasn't been made. Questions the copy can answer: 2 to 7 and 9 above. Questions it can't are in the unanswered table above.
- **G3. A visible last-updated date** (`base.md` step 5). `updatedAt` doesn't exist until a tenant does, and a footer line would be a design decision.
- **G4. Opening hours** are what a traveller is most likely to ask and can't get. Only the owner can settle this.

## For a human

1. **Crawler policy:** the owner decides, through the writer.
2. **Credentials in llms.txt:** left out, though the page prints them. Say if you'd rather have them there; it is one line.
3. **"30 seconds from the sand":** repeated verbatim in llms.txt, because the page says it. It remains an owner item (R4).
4. **`makesOffer`:** 4h left rentals and tours for this station to extend. I didn't: both are on the page and in llms.txt with their date, and an `Offer` for each would add 29 more prices to the block, each a number an engine could quote without its date.
5. Carried from 4h: the old site competes for the brand query, and the Panzer namesake is among the 13 reviews.

## Could not verify

- How any answer engine or crawler treats this site or `/llms.txt`. Nothing is deployed.
- Google's Rich Results Test (no API), WebKit, Firefox or a real phone for this station's captures. Chromium only; `index.html` is byte-identical, so 4h's other-browser checks still describe it.
- Cloudflare's `Content-Type` for `/llms.txt`. The route sets `text/plain` at build, but a static host decides from the extension.
- The owner's facts: the dossier was used and neither the site nor the Google listing was fetched. No `wa.me` link was opened.

## Ledger note (`optimised → ai_optimised`)

4i aiseo 0.2.2: added generated `/llms.txt` (page's words only, prices dated, no hours, owner, credentials or reply time) and 15 named AI crawlers in robots (preview refused for all, real domain allowed, owner to confirm). `FAQPage` declined (no visible questions), no ratings markup, JSON-LD unchanged, validator.schema.org 0 errors on preview and production. No-JS 117 strings, 0 missing, nothing moved. `index.html` byte-identical, captures identical at 390 and 1440, JS on and off.
