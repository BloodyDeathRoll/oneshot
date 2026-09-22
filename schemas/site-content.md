# schemas/site-content.md — the fixed content schema: the contract between Payload and the Astro templates.

**Version 0.3** · 2026-09-21 (v0.1 came out of the Payload spike; v0.2 adds `businessType` and the per-type modules below; v0.3 adds the optional `forecast` block; all additive — every v0.1 document is a valid v0.3 document) · source of truth in code: `spikes/payload/cms/src/collections/Sites.ts` + `Media.ts` · reference consumer: `spikes/payload/site/` · proven by `spikes/payload/test/` (both suites green).

Rules of the contract

- Everything in this file comes from Payload at build time and is **never hard-coded** in a template. Everything *not* in this file (layout, motion, interface labels such as "Opening hours" / "Book on WhatsApp", day and unit names) belongs to the template.
- One business = one `sites` document (+ its `media` documents). The schema is identical in both hosting profiles (`ONESHOT_PROFILE=multi-tenant | single-tenant`); see "Profiles" at the end for the one difference.
- Locales: `en` (default, always published) and `si`. Localized fields hold one value per locale; a missing `si` value falls back to `en` when the template asks with `fallback-locale=en`.
- Plain text only. No rich text, no HTML, no Markdown in v0.1. Paragraphs in `body` fields are separated by a blank line.
- Links the owner can type are validated server-side to be `https://` URLs. Templates must still never put an unvalidated value in an `href` (the reference template re-checks).

Who edits: **owner** = the business owner in the Payload admin ("My site" form, tabs in this order: Basics · Text · Opening hours · Prices · Photos · Contact & booking). **deployer** = our pipeline (creates the tenant and seeds the first version from the dossier). **system** = Payload.

## Collection `sites` — one document per business

| Field | Type | Required | Localized | Edited by | Constraints | Example |
|---|---|---|---|---|---|---|
| `id` | number | system | – | system | | `2` |
| `tenant` | relationship → `tenants` | multi-tenant only | – | deployer (owners cannot change it) | absent in single-tenant | `2` |
| `businessName` | text | **yes** | no | owner | ≤ 80 chars | `"Wobbly Pelican Surf School"` |
| `tagline` | text | no | **yes** | owner | ≤ 140 | `"Your first wave, guaranteed wobbly."` |
| `languages` | select, many: `en` (list grows later: de, es, pt, ru…) | **yes** | no | owner | must contain `en`; English only for now (decided 2026-09-18); the spike still carries `si` fixtures | `["en"]` |
| `copyBlocks[]` | array (≤ 8 rows) | no | – | owner | | |
| `copyBlocks[].slot` | select: `intro` \| `about` \| `offer` \| `info` | **yes** | no | owner | where the design places the block; several rows may share a slot | `"intro"` |
| `copyBlocks[].heading` | text | no | **yes** | owner | ≤ 120 | `"Learn to surf"` |
| `copyBlocks[].body` | textarea | **yes** | **yes** | owner | ≤ 1500; blank line = new paragraph | `"Small groups, soft boards…"` |
| `openingHours[]` | array (≤ 7 rows) | no | – | owner | a day that appears in no row is **closed**; a day may appear in two rows (split shifts) | |
| `openingHours[].days` | select, many: `mon` `tue` `wed` `thu` `fri` `sat` `sun` | **yes** | no | owner | | `["mon","tue","wed","thu","fri"]` |
| `openingHours[].opens` | text `HH:MM` (24 h) | **yes** | no | owner | regex `^([01]\d\|2[0-3]):[0-5]\d$` | `"06:30"` |
| `openingHours[].closes` | text `HH:MM` (24 h) | **yes** | no | owner | same | `"18:00"` |
| `hoursNote` | text | no | **yes** | owner | ≤ 200 | `"Closed on Poya days."` |
| `priceList[]` | array (≤ 30 rows) | no | – | owner | repeatable rows | |
| `priceList[].label` | text | **yes** | **yes** | owner | ≤ 80 | `"Beginner lesson (90 min)"` |
| `priceList[].price` | number | **yes** | no | owner | ≥ 0; template formats it | `9500` |
| `priceList[].currency` | select: `LKR` \| `USD` \| `EUR` | **yes** (default `LKR`) | no | owner | ISO 4217 | `"LKR"` |
| `priceList[].unit` | select: `per_hour` \| `per_lesson` \| `per_day` \| `per_week` \| `per_person` \| `flat` | **yes** (default `per_lesson`) | no | owner | template owns the wording per locale | `"per_person"` |
| `priceList[].note` | text | no | **yes** | owner | ≤ 140 | `"Board and rash vest included"` |
| `photos[]` | array (≤ 24 rows) | no | – | owner | **first row is the hero photo**; order is the owner's order | |
| `photos[].image` | upload → `media` | **yes** | no | owner | jpeg / png / webp, ≤ 8 MB | media doc (below) |
| `photos[].caption` | text | no | **yes** | owner | ≤ 140 | `"Sunset at the school"` |
| `contact.phone` | text, E.164 | no | no | owner | `^\+[1-9]\d{6,14}$` | `"+94410000101"` |
| `contact.whatsapp` | text, E.164 | **yes** | no | owner | same; template builds the booking CTA `https://wa.me/<digits>?text=…` from it | `"+94770000101"` |
| `contact.email` | email | no | no | owner | | `"hello@wobbly-pelican.example"` |
| `contact.address` | textarea | no | **yes** | owner | ≤ 300; line breaks are meaningful | `"Beach Road…\nMirissa, Sri Lanka"` |
| `contact.mapUrl` | text, `https://` URL | no | no | owner | | `"https://www.openstreetmap.org/?mlat=5.9466&mlon=80.4580#map=17/5.9466/80.4580"` |
| `bookingLinks[]` | array (≤ 6 rows) | no | – | owner | *additional* booking paths (engine, marketplace…); WhatsApp is always the primary CTA | |
| `bookingLinks[].label` | text | **yes** | **yes** | owner | ≤ 60 | `"Book on SurfBookings"` |
| `bookingLinks[].url` | text, `https://` URL | **yes** | no | owner | | `"https://bookings.example/wobbly-pelican"` |
| `createdAt`, `updatedAt` | ISO date | system | – | system | | `"2026-09-17T23:03:38.651Z"` |

Every array row also carries a system `id` (string). Templates must not depend on it.

## v0.2 — `businessType` and the per-type modules

One schema for every business. `businessType` says which kind of business the document describes; the modules below are **all optional**, and a template renders a module only when it is non-empty. A surf school leaves the lodging modules empty; a hostel leaves the lesson modules empty. No forks, no second schema.

| Field | Type | Required | Localized | Edited by | Constraints | Example |
|---|---|---|---|---|---|---|
| `businessType` | select: `surf_school` \| `surf_camp` \| `beach_lodging` \| `board_rental` \| `surf_shop` \| `shaper` \| `other` | **yes** (default `surf_school`) | no | deployer (seeds it from the dossier); owner may correct it | must match a row in `schemas/business-types.md` | `"beach_lodging"` |

### Shared modules (any type may use them)

| Field | Type | Required | Localized | Edited by | Constraints | Example |
|---|---|---|---|---|---|---|
| `amenities[]` | array (≤ 40 rows) | no | – | owner | a flat list; the template groups and orders them, the owner does not | |
| `amenities[].label` | text | **yes** | **yes** | owner | ≤ 60 | `"Free breakfast"` |
| `amenities[].note` | text | no | **yes** | owner | ≤ 80; use for "additional charge", "on request" | `"additional charge"` |
| `ratings[]` | array (≤ 6 rows) | no | – | deployer (owner may delete a row, not invent one) | one row per platform the business is actually rated on | |
| `ratings[].platform` | select: `google` \| `booking` \| `hostelworld` \| `agoda` \| `tripadvisor` \| `airbnb` \| `other` | **yes** | no | deployer | | `"booking"` |
| `ratings[].score` | number | **yes** | no | deployer | ≥ 0 | `9.5` |
| `ratings[].scale` | select: `5` \| `10` | **yes** | no | deployer | the template prints `9.5/10`, never rescales | `"10"` |
| `ratings[].count` | number | **yes** | no | deployer | ≥ 1 | `38` |
| `ratings[].url` | text, `https://` URL | no | no | deployer | the listing the score comes from | |
| `testimonials[]` | array (≤ 12 rows) | no | – | deployer (owner may delete a row) | **verbatim guest words only**; never paraphrased, never invented, never trimmed into a different meaning | |
| `testimonials[].quote` | textarea | **yes** | no | deployer | ≤ 600; **not localized** — a guest's words are not translated | `"The most amazing family running the business…"` |
| `testimonials[].author` | text | **yes** | no | deployer | as published, e.g. first name + country | `"Clara, United Kingdom"` |
| `testimonials[].source` | select: same list as `ratings[].platform` | **yes** | no | deployer | | `"booking"` |
| `testimonials[].date` | text `YYYY-MM` | no | no | deployer | omit rather than guess | `"2026-03"` |
| `spot` | text | no | **yes** | owner | ≤ 200; the wave this business sits on, in the owner's words | `"Kabalana beach break, 2 minutes from the door"` |
| `season` | text | no | **yes** | owner | ≤ 200 | `"November to April is the clean season"` |
| `languagesSpoken[]` | select, many: `en` `si` `ta` `ru` `de` `fr` `es` `it` `sv` `other` | no | no | owner | who you can be served in — separate from `languages`, which is what the **site** is published in | `["en","ru"]` |

### Lodging modules — `beach_lodging`, `surf_camp`

| Field | Type | Required | Localized | Edited by | Constraints | Example |
|---|---|---|---|---|---|---|
| `rooms[]` | array (≤ 20 rows) | no | – | owner | | |
| `rooms[].label` | text | **yes** | **yes** | owner | ≤ 80 | `"Deluxe Double Room"` |
| `rooms[].beds` | text | no | **yes** | owner | ≤ 80, as the owner describes it | `"1 extra-large double bed"` |
| `rooms[].sleeps` | number | no | no | owner | ≥ 1 | `2` |
| `rooms[].note` | text | no | **yes** | owner | ≤ 140 | `"Private entrance, garden view"` |
| `rooms[].photo` | upload → `media` | no | no | owner | one photo per room; the gallery stays in `photos[]` | |
| `stayInfo.checkInFrom` / `.checkInTo` | text `HH:MM` | no | no | owner | same regex as `openingHours` | `"11:30"` / `"22:00"` |
| `stayInfo.checkOutFrom` / `.checkOutTo` | text `HH:MM` | no | no | owner | | `"08:00"` / `"10:30"` |
| `stayInfo.minNights` | number | no | no | owner | ≥ 1 | `2` |
| `stayInfo.note` | text | no | **yes** | owner | ≤ 200; house rules worth stating up front | `"Children are not accommodated."` |

### Teaching modules — `surf_school`, `surf_camp`

| Field | Type | Required | Localized | Edited by | Constraints | Example |
|---|---|---|---|---|---|---|
| `lessons[]` | array (≤ 20 rows) | no | – | owner | structured lessons; a business that only wants a price row keeps using `priceList[]` | |
| `lessons[].label` | text | **yes** | **yes** | owner | ≤ 80 | `"Beginner group lesson"` |
| `lessons[].durationMin` | number | no | no | owner | minutes | `120` |
| `lessons[].level` | select, many: `first_time` \| `beginner` \| `intermediate` \| `advanced` | no | no | owner | | `["first_time","beginner"]` |
| `lessons[].groupSize` | text | no | **yes** | owner | ≤ 60 | `"max 4 per instructor"` |
| `lessons[].includes` | text | no | **yes** | owner | ≤ 140 | `"Board, rash vest, photos"` |
| `lessons[].price` / `.currency` / `.unit` | same types as `priceList[]` | no | no | owner | omit when the price is negotiated | `35` / `"USD"` / `"per_person"` |
| `credentials[]` | array (≤ 8 rows) | no | – | owner | certifications, rescue training, years teaching | |
| `credentials[].label` | text | **yes** | **yes** | owner | ≤ 100 | `"ISA-certified coaches"` |

### Kit modules — `board_rental`, `surf_shop`, `shaper`

| Field | Type | Required | Localized | Edited by | Constraints | Example |
|---|---|---|---|---|---|---|
| `rentals[]` | array (≤ 30 rows) | no | – | owner | what can be hired, and for how long | |
| `rentals[].label` | text | **yes** | **yes** | owner | ≤ 80 | `"Soft-top 7'6\""` |
| `rentals[].price` / `.currency` / `.unit` | same types as `priceList[]` | no | no | owner | | `1500` / `"LKR"` / `"per_day"` |
| `rentals[].note` | text | no | **yes** | owner | ≤ 140; deposits and damage terms belong here | `"Deposit LKR 10,000; repairable damage charged at cost"` |
| `brands[]` | array (≤ 20 rows) | no | – | owner | what the shop stocks | |
| `brands[].label` | text | **yes** | no | owner | ≤ 60 | `"Torq"` |
| `shaping.boardTypes` | text | no | **yes** | owner | ≤ 200 | `"Shortboards, fish, mid-lengths"` |
| `shaping.leadTime` | text | no | **yes** | owner | ≤ 100 | `"3–4 weeks"` |
| `shaping.customOrder` | textarea | no | **yes** | owner | ≤ 600; how a custom order works | |

### Rules for the modules

| Rule | |
|---|---|
| Optional everywhere | A template must render correctly when every module is empty. An empty module is `[]` or `null`, never a placeholder. |
| No duplication | A fact lives in exactly one field. A room rate goes in `rooms[]`/`priceList[]`, not in a `copyBlocks[]` paragraph as well. |
| `deployer`-edited rows are evidence | `ratings[]` and `testimonials[]` are seeded from the dossier, where every one of them carries a `source_url`. The owner may **delete** a row they dislike; neither the owner nor a template may add or reword one. |
| Live prices are not content | Nightly rates that live on an OTA are dated inventory, not a published price. They belong in `bookingLinks[]` as a link, never copied into `rooms[]` as a number. |
| A new type is a document change, not a code change | See `schemas/business-types.md`. |


## v0.3 — `forecast` (optional)

A surf forecast for the business's own break, drawn by the site from Rosa's per-spot JSON (endpoint, fields and units: `agents/designer/tools.md`; loading rules: playbook §4's exception). Present only when the site's concept carries it (`sites/<slug>/concepts.md`, proposal 003 §3). The group may be absent or `null`; a template renders nothing for it unless `enabled` is true **and** `rosaSpotId` is set.

| Field | Type | Required | Localized | Edited by | Constraints | Example |
|---|---|---|---|---|---|---|
| `forecast.enabled` | checkbox (boolean) | no (default `false`) | no | owner | the owner's on/off switch; off removes the block and its request from the next build | `true` |
| `forecast.rosaSpotId` | text | when `enabled` | no | deployer — **read-only for the owner** | `^[a-z0-9-]+$`; must be an id in Rosa's `data/index.json`; seeded from the dossier-spot → Rosa-spot mapping in `concepts.md`. The nearest other spot is never used as this one, which is why the owner cannot retype it | `"kabalana"` |
| `forecast.spotName` | text | when `enabled` | no | owner | ≤ 60; the name shown in the block and in its credit, "Forecast for <spotName> by Rosa" | `"Kabalana"` |

Forecast values themselves (heights, ratings, wind) are never content: they are not stored in Payload, not seeded from the dossier and not restated in any copy field.

## Collection `media` — photos

| Field | Type | Required | Localized | Edited by | Notes |
|---|---|---|---|---|---|
| `id` | number | system | – | system | |
| `tenant` | relationship → `tenants` | multi-tenant only | – | system (auto-filled with the owner's tenant) | |
| `alt` | text | **yes** | **yes** | owner | describe the photo; used as `<img alt>` |
| `filename` | text | system | – | system | unique per CMS instance — Payload appends `-1`, `-2`… on a name collision |
| `url` | text | system | – | system | **absolute** URL built from the CMS's public `SERVER_URL`; needs auth (nothing is public). Build tools should use only its path against their own CMS origin |
| `mimeType`, `filesize`, `width`, `height` | system | | – | system | only the original is stored (`sizes: {}`); responsive variants (avif/webp/jpeg at several widths) are produced by the Astro build |
| `focalX`, `focalY`, `thumbnailURL` | system | | – | system | unused in v0.1 |

## What the template receives (REST shape)

The build authenticates with a **read-only builder API key** (`Authorization: builders API-Key <key>`; collection `builders`; read access to `sites`, `media`, `tenants`, nothing else, no writes). Nothing in the CMS is publicly readable — anonymous requests to every collection and to media files get 403.

One request per locale, relationships populated one level:

```
GET /api/sites?where[tenant][equals]=<tenantId>&locale=<en|si>&fallback-locale=en&depth=1&limit=1      (multi-tenant)
GET /api/sites?locale=<en|si>&fallback-locale=en&depth=1&limit=1                                        (single-tenant)
→ { "docs": [ <site> ], "totalDocs": 1, … }
```

`<site>` for `locale=si` (real response from the spike, arrays shortened to one row):

```json
{
  "id": 2,
  "tenant": { "id": 2, "name": "Wobbly Pelican Surf School", "slug": "wobbly-pelican", "updatedAt": "…", "createdAt": "…" },
  "businessName": "Wobbly Pelican Surf School",
  "tagline": "ඔබේ පළමු රැල්ල — ටිකක් වැනෙමින්, ගොඩක් විනෝදෙන්.",
  "languages": ["en"],
  "copyBlocks": [
    { "id": "6aac71bd547a530001b106d1", "slot": "intro", "heading": "සර්ෆ් කරන්න ඉගෙන ගන්න", "body": "කුඩා කණ්ඩායම්, මෘදු පුවරු සහ …" }
  ],
  "openingHours": [
    { "id": "6aac71bd547a530001b106d5", "opens": "06:30", "closes": "18:00", "days": ["mon", "tue", "wed", "thu", "fri"] },
    { "id": "6aac71bd547a530001b106d6", "opens": "06:00", "closes": "18:30", "days": ["sat", "sun"] }
  ],
  "hoursNote": "පෝය දිනවල වසා ඇත.",
  "priceList": [
    { "id": "6aac71bd547a530001b106d7", "price": 9750, "currency": "LKR", "unit": "per_person", "label": "ආරම්භක පාඩම (මිනිත්තු 90)", "note": "පුවරුව සහ රෑෂ් වෙස්ට් එක ඇතුළත්" }
  ],
  "photos": [
    {
      "id": "6aac71bd547a530001b106da",
      "image": {
        "id": 3, "tenant": 2,
        "alt": "හිරු බැස යන වෙලාවේ වැල්ලේ සිටුවා ඇති සුදු සර්ෆ් පුවරුවක්",
        "url": "http://localhost:3100/api/media/file/pelican-lineup.jpg",
        "thumbnailURL": "/api/media/file/pelican-lineup.jpg",
        "filename": "pelican-lineup.jpg", "mimeType": "image/jpeg", "filesize": 22131,
        "width": 1600, "height": 1067, "focalX": 50, "focalY": 50, "sizes": {},
        "updatedAt": "…", "createdAt": "…"
      },
      "caption": "පාසලේ හිරු බැසීම"
    }
  ],
  "contact": {
    "phone": "+94410000101",
    "whatsapp": "+94770000101",
    "email": "hello@wobbly-pelican.example",
    "address": "වෙරළ පාර (ලොකු නිල් ගේට්ටුව ළඟ)\nමිරිස්ස, ශ්‍රී ලංකාව",
    "mapUrl": "https://www.openstreetmap.org/?mlat=5.9466&mlon=80.4580#map=17/5.9466/80.4580"
  },
  "bookingLinks": [
    { "id": "6aac71bd547a530001b106dd", "url": "https://bookings.example/wobbly-pelican", "label": "SurfBookings හරහා වෙන් කරන්න" }
  ],
  "updatedAt": "2026-09-17T23:03:38.651Z",
  "createdAt": "2026-09-17T23:03:25.302Z"
}
```

Optional fields that are empty arrive as `null` (text) or `[]` (arrays). With `locale=all` every localized field becomes an object `{ "en": …, "si": … }` — that shape is used by the tenant export/import format, not by templates.

What a template actually works with: the reference site's `scripts/fetch-tenant.mjs` runs before `astro build`, makes the two requests above, downloads each `photos[].image` into `src/tenant/media/<filename>` and writes `src/tenant/content.json`:

```json
{ "tenant": { "id": 2, "slug": "wobbly-pelican", "name": "…" }, "locales": { "en": <site>, "si": <site> } }
```

Templates import that file and the local photos only, so the built site has no runtime dependency on the CMS. TypeScript types for `<site>` live in `spikes/payload/site/src/lib/content.ts`.

## Profiles

| | multi-tenant (our server) | single-tenant (client's own box) |
|---|---|---|
| `tenant` key on `sites` / `media` docs | present (populated object at `depth≥1`, id at `depth=0`) | absent |
| query | must filter `where[tenant][equals]=<id>` (the builder key can read every tenant) | no filter — the one `sites` document is the site |
| `tenants` collection | exists (`name`, `slug`) | does not exist (404) |

Templates never see this difference: it is contained in `resolveScope()` in `spikes/payload/site/scripts/fetch-tenant.mjs` (12 lines). All other fields, types and the template input file are identical — asserted by `spikes/payload/test/e2e-self-hosted.mjs`, including a lossless export (multi-tenant) → import (single-tenant) → re-export round trip.

## Not in v0.1 (candidates for v0.2 — see the spike README's open questions)

Logo / brand colours · social links · reviews/testimonials · services or lessons as structured items (today: copy blocks + price rows) · seasonal hours and one-off closures · per-locale SEO title/description and OG image · geo coordinates (today: `mapUrl` only) · rich text · more locales or currencies (both are one-line enum changes plus a migration).
