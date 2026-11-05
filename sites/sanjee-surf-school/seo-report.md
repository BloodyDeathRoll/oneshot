# Sanjee Surf School: SEO report (station 4h)

seo 0.2.2 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-05 · site: `sites/sanjee-surf-school/final/` (the 4g build, one page)

The 4g build had a title, the tagline as its description, an `og:image`, and nothing else for search: no JSON-LD, no robots.txt, no noindex, and an h1 without the business's name. This station added those. Page text, layout and behaviour are unchanged: full-page captures are identical before and after (see "Look"). No performance fix was needed or made.

**Correction after this report, by the orchestrator session, 2026-11-05: `aggregateRating` was removed from the JSON-LD.** Shahar's decision of 2026-09-22 (below) has been applied to every site since, and the brief that asked to keep the markup did not know about it. The page still shows the rating. Every mention of `aggregateRating` below describes the build before this correction, including the JSON-LD sample, the validation counts and the ledger note. The JSON-LD was not re-submitted to validator.schema.org after the removal.

## Decision for a human first: the rating markup

This is the first final to emit `aggregateRating`. `base.md` §1, `PLAN.md` and this station's brief all allow it when `ratings[]` has a real platform score, attributed to that platform, and the brief says not to drop it. But Shahar told KA on 2026-09-22 "Ratings markup: leave it out, as the agent did" (`ledger.jsonl` line 205), and the seo reports for KA, Layday, The Lavish Haven, Global Surf (both), Cheeky Monkey and Lotus all omit it, most of them citing that decision as holding for every site. KA's report gives the reason: Google's review-snippet guidelines don't allow marking up ratings collected on other sites as the business's own, and self-serving `LocalBusiness` ratings get no rich result. I did not re-check those guidelines today.

I followed the brief and `base.md`. The preview is noindexed, so nothing depends on this until production. If the KA decision holds, delete the line `...(rating ? { aggregateRating: rating } : {}),` in `final/src/lib/site.mjs`. The visible rating on the page is separate and stays.

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/site.mjs` | New SEO section: `IS_PREVIEW`, `metaDescription`, `seoHead`, `businessLd`, `ldJson`, ported from `sites/lotus-surf-house/final` and adapted. Every value is read from `content.json` or `labels.json`. |
| `final/src/pages/index.astro` | Title guard (≤ 60), description from owner fields, robots meta on a preview, the head tags, one JSON-LD block at the end of `<body>`. The h1 moved: `<a class="brand"><h1>Sanjee Surf School</h1></a>`, and the big line is now `<p class="hero-title">`. |
| `final/src/styles/site.css` | The two `h1` rules renamed `.hero-title`, plus `.brand h1{font:inherit;letter-spacing:inherit}`. |
| `final/src/scripts/site.js` | One selector: the header's observers watch `.hero-title` instead of `h1`, because the h1 now sits in the fixed header. |
| `final/src/pages/robots.txt.js` | New. |
| `final/src/pages/[sitemap].xml.js` | New, built on a real domain only. |
| `final/astro.config.mjs` | Comment only. |
| `final/audit.json` | Regenerated (the numbers below). |

`swell.js`, `content.json`, the copy, the dossier and the date field were not touched. Nothing was written outside `sites/sanjee-surf-school/`.

## Head (one page, `en` only)

| | value | length | source |
|---|---|---|---|
| `<title>` | Sanjee Surf School \| Surf lessons in Weligama | 45 | `businessName` + `tagline` up to its comma (unchanged from 4g, guard added) |
| description | Surf lessons in Weligama, on the south coast of Sri Lanka. Coco Beach is our home spot, a beach break. Lessons are in English as standard. | 138 | `tagline` + first sentence of `spot` + `copyBlocks` intro ¶2, all on the page |
| h1 | Sanjee Surf School | | `businessName`, in the header wordmark. One h1. Heading order H1 H2 H2 H3… with no skips |
| og:title, og:description, og:site_name | as title, description, name | | |
| og:image | `<SITE_URL>photos/og-img-018-1200.jpg`, 1200×630, JPEG, alt from the hero photo | | on preview and production. Empty `SITE_URL=` leaves it out |
| twitter:card | `summary_large_image` (`summary` with no image) | | |
| canonical | production only: `https://<domain>/` | | none on a preview |
| hreflang | production only: `en` and `x-default`, both `https://<domain>/` | | none on a preview |
| og:url | production only | | none on a preview |
| robots meta | `noindex, nofollow` on a preview, none on production | | `IS_PREVIEW` |

**The h1 decision.** `base.md` §6 asks for the exact name in the h1, and the brand query is the one that matters most. So the name took the tag and "Surf lessons in Weligama" became a styled paragraph, as on KA, Layday and The Lavish Haven. Category words stay in the title, the description and the JSON-LD. The cost is that "Surf lessons in Weligama" is no longer a heading. If Alon prefers the category line as the h1, it's a two-line revert, but the name would then be in no heading.

## Structured data

**`SportsActivityLocation`**, per `base.md` §1 for a school; it is a `LocalBusiness` subtype. Actual output of the `dist/` build, 16 top-level keys:

```json
{
 "@context": "https://schema.org",
 "@type": "SportsActivityLocation",
 "name": "Sanjee Surf School",
 "alternateName": "Sanjee Surf",
 "description": "Surf lessons in Weligama, on the south coast of Sri Lanka. Coco Beach is our home spot, a beach break. Lessons are in English as standard.",
 "telephone": "+94774004422",
 "email": "sanjee@sanjee-surf.com",
 "address": { "@type": "PostalAddress", "streetAddress": "Kadabaddagama", "postalCode": "81700", "addressLocality": "Weligama", "addressCountry": "LK" },
 "geo": { "@type": "GeoCoordinates", "latitude": 5.9603113, "longitude": 80.4039507 },
 "hasMap": "https://www.google.com/maps/place/Sanjee+Surf+School/data=!4m7!3m6!1s0x3ae1156e4b0b7fab:0x3e8ea0f911f62414!8m2!3d5.9603113!4d80.4039507!16s%2Fg%2F11ybcfd3tx!19sChIJq38LS24V4ToRFCT2Efmgjj4?hl=en",
 "sameAs": [ "<the same Google Maps URL>" ],
 "member": { "@type": "Person", "name": "Sanjee", "jobTitle": "head instructor", "knowsLanguage": [ "en", "si" ] },
 "aggregateRating": {
  "@type": "AggregateRating", "ratingValue": 5, "bestRating": 5, "reviewCount": 13,
  "author": { "@type": "Organization", "name": "Google" },
  "url": "<the same Google Maps URL>",
  "description": "13 Google reviews, as of 5 November 2026"
 },
 "priceRange": "Lessons USD 40–160, as of 5 November 2026",
 "makesOffer": [
  { "@type": "Offer", "name": "Beginner Lesson", "price": 40, "priceCurrency": "USD", "itemOffered": { "@type": "Service", "name": "Beginner Lesson" }, "description": "USD 40 per lesson. All prices are as of 5 November 2026." },
  { "@type": "Offer", "name": "Private Coaching", "price": 50, "priceCurrency": "USD", "itemOffered": { "@type": "Service", "name": "Private Coaching" }, "description": "USD 50 per lesson. All prices are as of 5 November 2026." },
  { "@type": "Offer", "name": "Week Intensive", "price": 160, "priceCurrency": "USD", "itemOffered": { "@type": "Service", "name": "Week Intensive" }, "description": "USD 160. All prices are as of 5 November 2026." }
 ],
 "potentialAction": { "@type": "CommunicateAction", "name": "Ask on WhatsApp", "target": "https://wa.me/94774004422?text=Hello%20Sanjee%20Surf%20School%2C%20I%27d%20like%20to%20ask%20about%20a%20surf%20lesson." }
}
```

A production build adds `@id` (`https://<domain>/#business`), `url` and `image` (7 of the page's photo files, the og crop first), for 19 keys. All 7 exist in the build output (checked with `https://example.com/`).

| property | content field | dossier | on the page |
|---|---|---|---|
| `name` | `businessName` | `business.name` | header, footer, Finding us |
| `alternateName` | "Finding us" sentence (SCHEMA GAP read) | `business.site_brand` | "You may also see us as Sanjee Surf." |
| `telephone` | `contact.phone` | `contact.phone` (Google's `tel:` link) | 3 `tel:` links |
| `email` | `contact.email` | `contact.email`, `contradictions` email ruling | Finding us, footer |
| `address` | `contact.address` | `location.address` (Google) | Finding us, footer |
| `geo` | the pin inside `contact.mapUrl` | `location.lat_lng` (Google, not the old site's 5.9727, 80.4298) | map link |
| `hasMap`, `sameAs` | `contact.mapUrl`, `ratings[0].url` | `location.map_url` | map and rating links |
| `member` | `about` block heading (SCHEMA GAP read) + `languagesSpoken` | `team[0]`, `languages_spoken` | "Sanjee, head instructor"; "Languages: English \| Sinhala" in his section |
| `aggregateRating` | `ratings[0]` | `reviews.google` (5 of 5, 13, read 2026-11-05) | "5/5", "13 Google reviews \| as of 5 November 2026" |
| `priceRange`, `makesOffer` | `lessons[]`, the "as of" sentence | `offers`, `harvested_at` | the three lesson cards; "All prices are as of 5 November 2026." |
| `potentialAction` | `contact.whatsapp`, template label and message | `contact.whatsapp` | the page's generic WhatsApp href, unchanged |

**Validation.**
- **validator.schema.org:** 1 object, 0 errors, 0 warnings, on both the preview and the production block. Only the JSON-LD block was sent.
- **The current schema.org vocabulary file:** every type and property checked for domain and range by a scratch script. 50 properties on preview, 52 on production, 0 problems.
- **Parsing:** one block per page, `JSON.parse` passes, `<` is escaped.
- **Not run:** Google's Rich Results Test. It has no API and the page is noindexed.

**Checked against the page and the dossier by script** (`verify.py`, scratch):
- name, phone, email, map URL and geo equal the dossier values exactly;
- the address parts rejoin to the dossier string exactly;
- each Offer's price equals its card's `data-price` and printed text;
- none of these appear in the JSON-LD: Marcel, Panzer, Berlin, founder, owner, operator, opening, hours, deposit, Stripe, ReserveAction, booking, Book, group, Tropical, Paradise, sanjeesurf.com, instagram, facebook, youtube, 150, 5.9727;
- "private" appears only in the lesson's own name, "Private Coaching", which the page prints.

## Local signals (NAP)

- **Name:** "Sanjee Surf School", Google's, in the wordmark and h1, footer, Finding us, title and JSON-LD. Not the old site's "Sanjee Surf", which is kept as `alternateName` because the page says it.
- **Address:** "Kadabaddagama, Weligama 81700, Sri Lanka" in Finding us and the footer. Google has no street line, so `streetAddress` holds the village. Not the old site's "Tropical Beach, Paradise Coast", which appears nowhere (0 hits in the HTML).
- **Phone:** every `tel:` is `tel:+94774004422`, shown as +94 77 400 4422. All 22 `wa.me` links use 94774004422 and no other number.
- **Email:** `sanjee@sanjee-surf.com` only. The dead `sanjeesurf.com` has 0 hits.
- **Map:** "Open in Google Maps" links the listing. There is no embed, so nothing can block rendering.
- **Primary action:** WhatsApp. `tools/funnel.mjs`: clicks_to_book 1, primary whatsapp, hero whatsapp at 0 taps, CTA above the fold, broken 0. Same as 4g. No `wa.me` link was opened.

## Crawlability and the preview rule

Same rule as the other finals (Shahar, 2026-09-22). All built in scratch outDirs except the last row.

| build | robots meta | robots.txt | sitemap.xml | canonical, hreflang, og:url, JSON-LD url/image | og:image |
|---|---|---|---|---|---|
| `SITE_URL=` (empty) | noindex, nofollow | `Disallow: /` | none | none | none, card `summary` |
| `http://localhost:4321/` | noindex, nofollow | `Disallow: /` | none | none | that host |
| `https://sanjee-surf-school.os1.workers.dev/` | noindex, nofollow | `Disallow: /` | none | none | that host |
| `https://example.com/` | none | `Allow: /`, `Sitemap: https://example.com/sitemap.xml` | 1 URL + hreflang en | all present, absolute | that host |
| **unset (`dist/` now)** | noindex, nofollow | `Disallow: /` | none | none | assumed `https://sanjee-surf-school.os1.workers.dev/` |

A preview keeps `og:image` so the pitch link shows a picture, but it claims no canonical address, because the host is still an assumption. This goes one step further than Lotus's plumbing, which would print a canonical if given a `workers.dev` `SITE_URL`.

**Station 6:** `dist/` is ready as it stands, and `wrangler.jsonc` names the same Worker. If the real host differs, rebuild with `SITE_URL=<host>` so `og:image` is right. **Station 8:** a production build must pass `SITE_URL=https://<domain>/`. Forgetting it fails safe: the site stays noindexed.

One route, one locale, no orphan pages. Internal links are the in-page anchors (Lessons, Boards, Sanjee, Waves, Tuk-tuk, Finding us). `/llms.txt` and the named AI crawlers are station 4i's. The comment in `robots.txt.js` warns that named groups must repeat the refusal on a preview.

## Measured, before and after

Method: a scratch copy of the audit's throttled phone, on my own server (ports 9410 to 9412, stopped after). 390×844, 1.6 Mbps, 150 ms, 4× CPU, no scroll. Hero paint is `elementtiming="hero"`. The "before" is a rebuild of the 4g source, byte-identical to the 4g `dist/`.

**Phone, HTML gzipped on my server** (a stand-in for a host that compresses; Cloudflare itself was not measured):

| | before (5 runs) | after (5 runs) | target |
|---|---|---|---|
| Tool LCP, ms (the text line, not the photo) | 436 / 408 / 396 / 400 / 408 | 420 / 408 / 408 / 416 / 428 | ≤ 2,500 |
| **Real hero paint, ms** | 1696 / 1688 / 1680 / 1672 / 1684 | 1688 / 1680 / 1684 / 1684 / 1688 | ≤ 2,500 |
| CLS on load | 0 in all | 0 in all | < 0.1 |
| Bytes on the wire | 294 KB | 295 KB | ≤ 1,500 KB |

**Phone, no compression** (as `tools/audit-mockup.mjs` serves it, the designer's harness):

| | before (5 runs) | after (5 runs) |
|---|---|---|
| Tool LCP, ms | 760 / 472 / 472 / 472 / 464 | 472 / 484 / 476 / 476 / 484 |
| **Real hero paint, ms** | 2444 / 2196 / 2008 / 2020 / 2024 | 2024 / 2212 / 2036 / 2036 / 2040 |
| CLS on load | 0 in all | 0 in all |
| Bytes on the wire | 371 KB | 374 KB |

**Desktop 1440×900, HTML gzipped:** hero paint 1840 / 1816 / 1808 before, 1828 / 1812 / 1808 after. Tool LCP 428 / 412 / 400 before, 436 / 512 / 408 after. CLS 0. 320 KB, then 321 KB.

**`tools/audit-mockup.mjs`** (scratch copy, only the port and imports changed, port 9414; `final/audit.json`): LCP 504 ms, CLS 0, scroll CLS 0 / 0 (early / settled), first load 382,028 B against 378,944 (+3,084 B, the JSON-LD and head tags; +875 B gzipped), 9 requests, 0 third-party, 0 images without alt, 0 tap targets under 44 px.

**Reading it:** the differences between before and after are within run-to-run noise. The hero is under 2.5 s in every run, about 1.7 s once the HTML is compressed, so I made no performance change. The tool's LCP now names `P.hero-title` rather than `H1`, the same line of text, and it still does not stand for the photograph: quote the hero paint. Image handling already meets `base.md`: width and height on every image, hero eager, `fetchpriority="high"` and preloaded per viewport, others lazy, fonts self-hosted with `swap`.

Not re-measured: the swell's start time, and the font-swap CLS table in `final/notes.md`. Fonts, swell and layout are unchanged.

## Look and behaviour (no visible change)

- **Pixels, Chromium:** full-page captures at 390, 768 and 1440, JS on and off, reduced motion, images forced eager. Byte-identical before vs after in 6 of 6, and the before-vs-before control matched in 6 of 6. Hashed in memory; nothing was written.
- **Pixels, WebKit and Firefox:** first screen and the solid header at 160 px, at 390 and 1440. Byte-identical in all 8 captures. Box, font, colour and page height equal.
- **Elements, Chromium, 390 and 1440:** 658 compared, 0 box differences, 0 computed-style differences, with the old h1 paired with the new `p`.
- **Visible text:** identical with tags removed and whitespace collapsed. `innerText` itself differs, by line breaks only, because `h1` and `p` count differently.
- **Header:** `solid`, `on` and the phone bar are the same at 12 scroll positions.
- **Normal motion:** canvas opacity 1 at both widths, 0 console errors, 0 off-site requests.
- **Interaction:** tile, date and people give the same message and the same 22 hrefs before and after.
- **`check-design`** (scratch copy, port 9413, `--no-shots`): ok, 0 problems, 0 warnings. h1 and body Manrope, h2 Courgette.

## Could not verify

- Google's listing live today. Name, address and phone are compared with the dossier's capture of 2026-11-05, not re-fetched. The dossier holds Google's `tel:` link, not how Google displays the number.
- Google's Rich Results Test, Search Console, or how any engine treats this markup.
- A real phone, Cloudflare's compression and protocol, and the real preview host (no deployment exists).
- A link preview in WhatsApp itself. The `og:image` file exists in the build, but its URL is not live.
- A screen reader's reading of the moved h1.

## Still wrong, and what it would take

1. **The old site competes for the brand query.** `sanjee-surf.com` has 67 pages and is live, with its own structured data claiming 150 reviews, a placeholder address and dead socials. A new site on another domain would be behind it. Taking over that domain or redirecting it is a production decision after a sale.
2. **`sameAs` is the Google listing alone.** Instagram, Facebook and YouTube are all dead (`contact.socials`), and no other listing was found. Nothing to add until the owner has live profiles.
3. **Rentals and tours are not in `makesOffer`.** Only the three lessons are, the school's main offer, to keep the block small. Their prices stay on the page with the date. Station 4i may extend this.
4. **`priceRange` is a sentence, not a bare range.** The date goes with it by the brief's rule, and an engine may ignore that form. A bare "USD 40–160" would be an undated price, so I left it this way.
5. **No favicon.** The dossier has no logo file, and the old favicon is a crop of Sanjee's face.
6. **"Coco Beach" in the description.** It comes from the passed copy, but the dossier records that the location of Coco Beach is not settled (`location.spot`, `contradictions`). The owner should confirm it.

## Left out on purpose

- **`openingHoursSpecification`:** three conflicting sets published, `openingHours[]` empty.
- **Founder, owner, legal operator:** no property names them. `member` carries Sanjee with only the page's own "head instructor". I used `member` rather than `employee` so it says nothing about who employs whom.
- **Credentials:** on the page in his section, but self-reported with no certificate found, so not repeated as machine-readable claims.
- **`review`:** the four quotes stay on the page only. The Panzer review is not among them (`do_not_use`).
- **`ReserveAction`, deposit, payment:** this page has no booking engine.
- **Tamil:** the dossier has "basic Tamil", the page doesn't list it.
- **Business-level `knowsLanguage`:** the page lists the languages under Sanjee, so they sit on him.
- **`foundingDate`, years of experience, student counts:** gaps or contradictions in the dossier.

## For a human

1. **Rating markup:** see the top of this report.
2. **The 13 reviews:** one is by "Dr. Marcel Panzer", the same name as the legal operator in the old site's Terms; not proven to be the same person (`flags_for_operator[0]`). The rating is Google's published figure, so it stays at 5.0 from 13, on the page and in the markup. His quote is not used. If he is the operator, the count includes a review by the operator, and that matters for the pitch as well.
3. **h1:** name, as here, or the category line (see "Head").
4. **Prices:** dated 5 November 2026 from the old site's home page. The owner confirms them before go-live.

## Schema proposals (diffs to `schemas/site-content.md`, not applied)

These fields would replace wording-dependent reads in `site.mjs`. A is the same proposal as on the other finals, B is the same with this site's value, C is new here. `pricesAsOf` is already proposed in `final/notes.md`.

**A. Per-locale SEO head**

```diff
+| `seo.title` | text | no | **yes** | owner | ≤ 60; empty = the template's rule | `"Sanjee Surf School \| Surf lessons in Weligama"` |
+| `seo.description` | text | no | **yes** | owner | ≤ 155; empty = the template's rule | |
```

**B. Other names**

```diff
+| `alternateNames[]` | array (≤ 4) of text ≤ 80 | no | – | deployer (dossier) / owner | JSON-LD `alternateName` only | `["Sanjee Surf"]` |
```

**C. Named people for the teaching types.** v0.11's `team[]` is a brand module. Make `team[].name` and `.role` available to `surf_school` and `surf_camp`, so `member` stops depending on the wording of the `about` heading.

## Ledger note (`built → optimised`)

4h seo 0.2.2: added `SportsActivityLocation` JSON-LD from content (NAP = dossier's Google values, geo = the Google pin, `alternateName` Sanjee Surf, Sanjee as head instructor only, 3 lesson offers carrying the page's date, Google `aggregateRating` 5/5 from 13 with date), no hours, no owner or operator, no booking action; validator.schema.org 0 errors. h1 moved to the business name (big line now `p.hero-title`). Title 45, description 138. Preview rule added (noindex, `Disallow`, no sitemap, `og:image` only); production build verified with canonical, hreflang en + x-default, sitemap. Hero paint 1,680 to 1,688 ms gzipped and 2,024 to 2,212 ms uncompressed (unchanged), tool LCP 408 to 428 and 472 to 484 ms, CLS 0, first load +3,084 B, captures byte-identical. Open for a human: rating markup against Shahar's KA decision; the Panzer namesake among the 13.
