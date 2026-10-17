# schemas/site-content.md — the fixed content schema: the contract between Payload and the Astro templates.

**Version 0.10** · 2026-10-17 (v0.10 adds no field: media `focalX` / `focalY` become owner-set — the point of interest a template may align motion on, set by clicking the photo in the admin; Shahar, 2026-10-17: a set-piece must always line up when the owner replaces a photo, never on coordinates written for one photograph) · **v0.9** · 2026-09-28 (v0.9 adds no field: the build now makes an owner's video upload into web renditions — desktop + mobile, MP4 + WebM, no audio — and writes `src/tenant/videos.generated.json`; the fetch step downloads videos and posters; see "v0.9 — video renditions". Chosen over a separate `heroVideoMobile` upload field. DB migrations for the v0.8 fields: `cms/app/src/migrations/*/20260928_*_video.ts`) · **v0.8** · 2026-09-28 (v0.8 adds owner-editable video — `heroVideo` + `heroVideoPoster` and `videos[]` — and lets `media` hold MP4/WebM; Shahar, 2026-09-28: "Videos are much more engaging than images and whenever you find one you should use it!"; the admin tab "Photos" is now "Photos & video"; `cms/app/src/collections/Sites.ts` + `Media.ts` implement this version) · **v0.7** · 2026-09-25 (v0.7 makes `contact.whatsapp` optional — Shahar, none of run 2026-09-ahangama-02's three businesses publishes a WhatsApp number; production Payload collection `cms/src/collections/Sites.ts` now implements this version) · **v0.6** · 2026-09-23 (v0.6 adds the optional `featureLine`, a generic short line over a site's feature image — Shahar, first used for The Lavish Haven's night-pool line) · **v0.5** · 2026-09-23 (v0.5 adds the optional `closing` line, Shahar's decision for The Lavish Haven's closing headline) · **v0.4** · 2026-09-22 (v0.4 adds `ratings[].capturedAt`, required by playbook §6; existing documents need the date filled in by the deployer) · **v0.3** · 2026-09-21 (v0.1 came out of the Payload spike; v0.2 adds `businessType` and the per-type modules below; v0.3 adds the optional `forecast` block; all additive — every v0.1 document is a valid v0.3 document) · source of truth in code: `spikes/payload/cms/src/collections/Sites.ts` + `Media.ts` · reference consumer: `spikes/payload/site/` · proven by `spikes/payload/test/` (both suites green).

Rules of the contract

- Everything in this file comes from Payload at build time and is **never hard-coded** in a template. Everything *not* in this file (layout, motion, interface labels such as "Opening hours" / "Book on WhatsApp", day and unit names) belongs to the template.
- One business = one `sites` document (+ its `media` documents). The schema is identical in both hosting profiles (`ONESHOT_PROFILE=multi-tenant | single-tenant`); see "Profiles" at the end for the one difference.
- Locales: `en` (default, always published) and `si`. Localized fields hold one value per locale; a missing `si` value falls back to `en` when the template asks with `fallback-locale=en`.
- Plain text only. No rich text, no HTML, no Markdown in v0.1. Paragraphs in `body` fields are separated by a blank line.
- Links the owner can type are validated server-side to be `https://` URLs. Templates must still never put an unvalidated value in an `href` (the reference template re-checks).

Who edits: **owner** = the business owner in the Payload admin ("My site" form, tabs in this order: Basics · Text · Opening hours · Prices · Photos & video · Rooms & stay · Lessons · Rentals & shop · Amenities · Surf · Reviews · Contact & booking). **deployer** = our pipeline (creates the tenant and seeds the first version from the dossier). **system** = Payload.

## Collection `sites` — one document per business

| Field | Type | Required | Localized | Edited by | Constraints | Example |
|---|---|---|---|---|---|---|
| `id` | number | system | – | system | | `2` |
| `tenant` | relationship → `tenants` | multi-tenant only | – | deployer (owners cannot change it) | absent in single-tenant | `2` |
| `businessName` | text | **yes** | no | owner | ≤ 80 chars | `"Wobbly Pelican Surf School"` |
| `tagline` | text | no | **yes** | owner | ≤ 140 | `"Your first wave, guaranteed wobbly."` |
| `closing` | text | no | **yes** | owner | ≤ 140; the one line the design sets beside the page's last booking action; empty = the template shows no line there | `"Rates move with the dates. The listings show what is free."` |
| `featureLine` | text | no | **yes** | owner | ≤ 140; a short line the design sets over the site's feature image; empty = the template shows no line there | `"The outdoor pool is in the middle of the hotel and open all year."` |
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
| `photos[].image` | upload → `media` | **yes** | no | owner | **image only** (v0.8: enforced, now that `media` also holds video): jpeg / png / webp, ≤ 8 MB | media doc (below) |
| `photos[].caption` | text | no | **yes** | owner | ≤ 140 | `"Sunset at the school"` |
| `heroVideo` | upload → `media` | no | no | owner (deployer seeds it from the dossier) | **video only**: mp4 / webm, ≤ 20 MB, 8–20 s (guidance, not enforced; the build uses at most the first 20 s), audio never played; the one original the build makes every rendition from (v0.9); when set it **replaces the hero photo** (`photos[0]` then becomes the first gallery photo); the template shows it muted, looped, `playsinline`, **poster first**, loaded after first paint, and shows the poster alone under `prefers-reduced-motion: reduce` or `Save-Data` | media doc, `mimeType: "video/mp4"` |
| `heroVideoPoster` | upload → `media` | **when `heroVideo` is set** | no | owner | **image only**: jpeg / png / webp, ≤ 8 MB; the still painted before the video plays and instead of it; a frame of that video, never an unrelated photo | media doc, `mimeType: "image/jpeg"` |
| `videos[]` | array (≤ 6 rows) | no | – | owner (deployer seeds it from the dossier) | further clips; the design decides where they play (same playback rules as `heroVideo`: muted, poster first, never autoplay with sound) | |
| `videos[].video` | upload → `media` | **yes** | no | owner | video only: mp4 / webm, ≤ 20 MB | media doc |
| `videos[].poster` | upload → `media` | **yes** | no | owner | image only: jpeg / png / webp, ≤ 8 MB | media doc |
| `videos[].description` | text | **yes** | **yes** | owner | ≤ 200; what the clip shows, used as its accessible name (`aria-label`) — the video counterpart of `media.alt` | `"Two surfers on the right-hander at dawn, filmed from the reef"` |
| `contact.phone` | text, E.164 | no | no | owner | `^\+[1-9]\d{6,14}$` | `"+94410000101"` |
| `contact.whatsapp` | text, E.164 | no (v0.7; was required) | no | owner | same; when set, the template builds the booking CTA `https://wa.me/<digits>?text=…` from it; when empty, the template's primary booking action is `bookingLinks[]` or `contact.phone` | `"+94770000101"` |
| `contact.email` | email | no | no | owner | | `"hello@wobbly-pelican.example"` |
| `contact.address` | textarea | no | **yes** | owner | ≤ 300; line breaks are meaningful | `"Beach Road…\nMirissa, Sri Lanka"` |
| `contact.mapUrl` | text, `https://` URL | no | no | owner | | `"https://www.openstreetmap.org/?mlat=5.9466&mlon=80.4580#map=17/5.9466/80.4580"` |
| `bookingLinks[]` | array (≤ 6 rows) | no | – | owner | booking paths (engine, marketplace…); *additional* to WhatsApp when `contact.whatsapp` is set, otherwise the primary CTA | |
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
| `ratings[].capturedAt` | date (YYYY-MM-DD) | **yes** | no | deployer | when the score was read from the platform (the harvester's `fetched_at`); playbook §6 requires a rating to be shown with its count, source and capture date | `"2026-09-19"` |
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
| `rooms[].photo` | upload → `media` | no | no | owner | image only; one photo per room; the gallery stays in `photos[]` | |
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
| A new type is a document change, not a code change | See the vertical pack's `business-types.md` (`verticals/surf/business-types.md`). |


## v0.3 — `forecast` (optional)

A surf forecast for the business's own break, drawn by the site from Rosa's per-spot JSON (endpoint, fields and units: `agents/designer/tools.md`; loading rules: playbook §4's exception). Present only when the site's concept carries it (`sites/<slug>/concepts.md`, proposal 003 §3). The group may be absent or `null`; a template renders nothing for it unless `enabled` is true **and** `rosaSpotId` is set.

| Field | Type | Required | Localized | Edited by | Constraints | Example |
|---|---|---|---|---|---|---|
| `forecast.enabled` | checkbox (boolean) | no (default `false`) | no | owner | the owner's on/off switch; off removes the block and its request from the next build | `true` |
| `forecast.rosaSpotId` | text | when `enabled` | no | deployer — **read-only for the owner** | `^[a-z0-9-]+$`; must be an id in Rosa's `data/index.json`; seeded from the dossier-spot → Rosa-spot mapping in `concepts.md`. The nearest other spot is never used as this one, which is why the owner cannot retype it | `"kabalana"` |
| `forecast.spotName` | text | when `enabled` | no | owner | ≤ 60; the name shown in the block and in its credit, "Forecast for <spotName> by Rosa" | `"Kabalana"` |

Forecast values themselves (heights, ratings, wind) are never content: they are not stored in Payload, not seeded from the dossier and not restated in any copy field.

## v0.8 — video

| Rule | |
|---|---|
| Video leads when it exists | A business that published a usable video (`license: business-owned` in the dossier) gets it as `heroVideo`; a template must render correctly with and without one. |
| Seeded from the dossier | `schemas/dossier.md` `videos[]` → the entry with `hero_candidate.rank: 1` → `heroVideo` (its `hero-desktop` MP4 rendition) + `heroVideoPoster` (its poster JPEG); every other usable entry with a cut → a `videos[]` row (`video` ← its `hero-desktop` MP4, `poster` ← its poster, `description` ← `shows`). Renditions and posters come from `tools/fetch-video.mjs`. |
| Never sound | Templates never play audio: `muted` is always set, and no control to unmute is offered. Renditions from `tools/fetch-video.mjs` carry no audio track at all. |
| Poster first | The poster is in the HTML (`<video poster>` or an `<img>` behind it) so the first paint and LCP are the still, not the video. The video source is attached after first paint; under `prefers-reduced-motion: reduce` or `navigator.connection.saveData` it is never attached. |
| Responsive renditions | Payload keeps one original per upload (as for photos); the build makes the renditions from it (v0.9, below). The seed uploads the dossier's `hero-desktop` MP4 as that original. |

## v0.9 — video renditions (the build's job)

**Decision (2026-09-28): a build step, not a `heroVideoMobile` field.** An owner will upload one clip from a phone, not three encodes, and whatever they upload has an audio track, an arbitrary bitrate and no `+faststart`; every served file therefore has to be re-encoded anyway to honour "never sound" and the size caps. A second upload field would only move that work onto the owner, drift out of sync with the desktop clip when they replace it, and still leave WebM, audio stripping and caps undone. The build step keeps the schema at one original per video — the same rule as photos, whose variants `scripts/photos.mjs` makes — and costs no field, no migration and no admin UI. The cost is encode time, paid once per original: encodes are cached by the file's sha256 in the publisher's volume, so only the first publish after a new video waits for it (measured locally with the publisher capped at 1.5 CPU on an x86 dev box: 75 s for two clips, 10 s at 1080p + 8 s at 720p, AV1 being most of it; a cached rebuild adds 0.6 s. The ARM server has not been measured).

| | |
|---|---|
| Where | `cms/publisher/src/video.mjs`, run by the publisher for every site between the template's `scripts/fetch-tenant.mjs` and `scripts/photos.mjs`. A template can run it itself: `node <repo>/cms/publisher/src/video.mjs <site-dir>`. Needs `ffmpeg`/`ffprobe` only when the site has a video (in the publisher image since v0.9). |
| Fetch | `scripts/fetch-tenant.mjs` (reference: `spikes/payload/site/scripts/fetch-tenant.mjs`) downloads `heroVideo`, `heroVideoPoster`, `videos[].video` and `videos[].poster` into `src/tenant/media/` with the photos. For a template whose fetch step predates v0.8, the video step downloads any missing original itself with the builder key. |
| Renditions | per video, from its first ≤ 20 s: `d1920` (1920 w, ≤ 4 MB), `m1280` (1280 w, ≤ 2 MB), `m720` (720 w, ≤ 2 MB) as H.264 MP4 (`+faststart`), `d1920` and `m1280` also as AV1 WebM. No audio track in any of them. Never upscaled: a tier wider than the original points at the same file as the widest tier that fits. Per poster: JPEG at 1920 w and 1280 w (never upscaled). |
| Output | `public/video/<stem>.<tier>.<mp4\|webm>`, `public/video/<poster-stem>.<1920\|1280>.jpg` (`<stem>` = media file name without extension, lowercased, `[a-z0-9-]`), and `src/tenant/videos.generated.json` (below). Nothing is written, and the manifest is removed, when the site has no video. Paths are relative (`video/…`), like `photos/…`. |

`src/tenant/videos.generated.json`, keyed by the media `filename` from content.json:

```json
{
  "recipe": "v1",
  "videos": {
    "example-surf-8c763de6-vid-001-d1920.mp4": {
      "source": { "width": 1920, "height": 1080, "duration_s": 10, "hadAudio": false },
      "length_s": 10,
      "tiers": {
        "d1920": { "webm": { "src": "video/…-vid-001-d1920.d1920.webm", "type": "video/webm; codecs=\"av01.0.08M.08\"", "width": 1920, "height": 1080, "bytes": 3158065 },
                   "mp4":  { "src": "video/…-vid-001-d1920.d1920.mp4",  "type": "video/mp4; codecs=\"avc1.640028\"",   "width": 1920, "height": 1080, "bytes": 3790900 } },
        "m1280": { "webm": { … }, "mp4": { … } },
        "m720":  { "mp4": { … } }
      }
    }
  },
  "posters": {
    "example-surf-8054794f-vid-001-poster.jpg": { "1920": { "src": "video/…-vid-001-poster.1920.jpg", "width": 1920, "height": 1080 }, "1280": { … } }
  }
}
```

### How a template uses the hero video (Astro)

Poster first (an `<img srcset>` that is the LCP, plus `poster` on the video so it never flashes black), sources attached on `load` + one frame, WebM before MP4 in each tier, the phone tier first with `media`, and nothing attached under reduced motion or Save-Data. Checked in headless Chromium against a publisher build: desktop plays `d1920.webm`, a 390 px phone plays `m1280.webm`, reduced motion and Save-Data request no video at all.

```astro
---
// src/components/HeroVideo.astro — renders nothing when the site has no heroVideo
import content from '../tenant/content.json'
const gen = Object.values(import.meta.glob('../tenant/videos.generated.json', { eager: true, import: 'default' }))[0]
const site = content.locales.en
const v = site.heroVideo && gen?.videos[site.heroVideo.filename]
const poster = site.heroVideoPoster && gen?.posters[site.heroVideoPoster.filename]
const PHONE = '(max-width: 767px)'
const sources = v
  ? [[v.tiers.m1280.webm, PHONE], [v.tiers.m1280.mp4, PHONE], [v.tiers.d1920.webm], [v.tiers.d1920.mp4]].filter(([s]) => s)
  : []
---
{v && poster && (
  <div class="hero-media">
    <img class="hero-poster" src={poster[1280].src} srcset={`${poster[1280].src} ${poster[1280].width}w, ${poster[1920].src} ${poster[1920].width}w`}
      sizes="100vw" width={poster[1920].width} height={poster[1920].height} alt={site.heroVideo.alt} fetchpriority="high" />
    <video class="hero-video" muted loop playsinline preload="none" disablepictureinpicture aria-hidden="true"
      poster={poster[1280].src} data-hero-video>
      {sources.map(([s, media]) => <source data-src={s.src} type={s.type} media={media} />)}
    </video>
  </div>
)}

<script>
  const video = document.querySelector<HTMLVideoElement>('video[data-hero-video]')
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true
  const attach = () => {
    if (!video) return
    for (const s of video.querySelectorAll<HTMLSourceElement>('source[data-src]')) {
      if (s.media && !matchMedia(s.media).matches) s.remove() // older engines ignore `media` on <source>
      else s.src = s.dataset.src!
    }
    video.load()
    video.play().catch(() => {}) // autoplay refused (Low Power Mode…): the poster stays
  }
  if (video && !calm && !saveData) {
    const later = () => requestAnimationFrame(() => setTimeout(attach, 0)) // after first paint
    document.readyState === 'complete' ? later() : addEventListener('load', later, { once: true })
  }
</script>

<style>
  .hero-media { position: relative; aspect-ratio: 16 / 9; overflow: hidden; }
  .hero-poster, .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
</style>
```

The `m720` tier is in the manifest for designs that show a clip small (a card, a strip); `videos[]` rows use the same pattern, with the row's `description` as the element's `aria-label` instead of `aria-hidden`.

## Collection `media` — photos and videos

| Field | Type | Required | Localized | Edited by | Notes |
|---|---|---|---|---|---|
| `id` | number | system | – | system | |
| `tenant` | relationship → `tenants` | multi-tenant only | – | system (auto-filled with the owner's tenant) | |
| `alt` | text | **yes** | **yes** | owner | describe the photo or video; used as `<img alt>` (for a video in `videos[]`, the row's `description` is what the template uses) |
| `filename` | text | system | – | system | unique per CMS instance — Payload appends `-1`, `-2`… on a name collision |
| `url` | text | system | – | system | **absolute** URL built from the CMS's public `SERVER_URL`; needs auth (nothing is public). Build tools should use only its path against their own CMS origin |
| `mimeType`, `filesize`, `width`, `height` | system | | – | system | accepted: `image/jpeg` `image/png` `image/webp` (≤ 8 MB) and, since v0.8, `video/mp4` `video/webm` (≤ 20 MB; request limit 20 MB, the 8 MB image cap is enforced by a hook on `media`). `width`/`height` are null for video. Only the original is stored (`sizes: {}`); responsive variants (avif/webp/jpeg at several widths) are produced by the Astro build |
| `focalX`, `focalY` | number (percent, 0–100) | no | – | owner (deployer seeds it) | v0.10: the photo's point of interest, set by clicking it in the admin's image editor (Payload `upload.focalPoint`); default 50 / 50 = the centre. A template that aligns motion on a spot in a photo (a scroll set-piece) reads it here, never from coordinates written for one photograph. |
| `thumbnailURL` | system | | – | system | unused |

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

What a template actually works with: the reference site's `scripts/fetch-tenant.mjs` runs before `astro build`, makes the two requests above, downloads each `photos[].image` (and, since v0.9, `heroVideo`, `heroVideoPoster`, `videos[].video`, `videos[].poster`) into `src/tenant/media/<filename>` and writes `src/tenant/content.json`:

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
