version: 0.3.0

# schemas/dossier.md — `dossier/<slug>/dossier.json`, the harvester's output (PLAN.md §4 station 3)

Everything downstream (designer, deployer seed, critic, writer) takes facts from here and only from here. Every fact carries `source_url` + `fetched_at`; every image and video carries a license note. Gaps are flagged, not filled.

v0.2 (2026-09-28) adds `videos[]`: Shahar rejected a run because video the business had published never reached the site — "Videos are much more engaging than images and whenever you find one you should use it!"

```json
{
  "slug": "example-surf-school",
  "run_id": "2026-09-ahangama-01",
  "harvester_version": "0.1.0",
  "harvested_at": "2026-09-18T07:00:00Z",
  "business": {
    "name":        { "value": "Example Surf School", "source_url": "…", "fetched_at": "…" },
    "type":        { "value": "surf_school", "source_url": "…", "fetched_at": "…" },
    "tagline":     { "value": null, "gap": "no tagline found anywhere" },
    "description": { "value": "…", "source_url": "…", "fetched_at": "…", "language": "en" },
    "since":       { "value": "2015", "source_url": "…", "fetched_at": "…" }
  },
  "location": {
    "address":  { "value": "…", "source_url": "…", "fetched_at": "…" },
    "lat_lng":  { "value": [5.945, 80.46], "source_url": "…", "fetched_at": "…" },
    "map_url":  { "value": "https://maps.google.com/…", "source_url": "…", "fetched_at": "…" },
    "spot":     { "value": "Mirissa main beach, beginner-friendly beach break", "source_url": "…", "fetched_at": "…" }
  },
  "contact": {
    "phone":    { "value": "+94…", "source_url": "…", "fetched_at": "…" },
    "whatsapp": { "value": "+94…", "source_url": "…", "fetched_at": "…", "verified": "number appears on Google Business Profile and Instagram bio" },
    "email":    { "value": null, "gap": "not published" },
    "socials":  { "instagram": "…", "facebook": "…", "tripadvisor": "…", "google_maps": "…" }
  },
  "booking": {
    "path":     { "value": "whatsapp", "source_url": "…", "fetched_at": "…", "note": "reviews say 'message on WhatsApp to book'" },
    "engine_url": { "value": null },
    "reply_time_hint": { "value": "usually within an hour", "source_url": "…", "fetched_at": "…" }
  },
  "hours": [
    { "days": ["mon","tue","wed","thu","fri","sat","sun"], "open": "06:00", "close": "18:00", "source_url": "…", "fetched_at": "…" }
  ],
  "hours_note": { "value": "closed during rough sea", "source_url": "…", "fetched_at": "…" },
  "offers": [
    { "label": "Beginner lesson (2 h, board included)", "price": 35, "currency": "USD", "unit": "per person", "note": null, "source_url": "…", "fetched_at": "…" }
  ],
  "facilities": [{ "value": "board rental", "source_url": "…", "fetched_at": "…" }],
  "levels": [{ "value": "beginner", "source_url": "…", "fetched_at": "…" }],
  "season": { "value": "Nov–Apr best", "source_url": "…", "fetched_at": "…" },
  "reviews": {
    "google":      { "rating": 4.8, "count": 120, "source_url": "…", "fetched_at": "…" },
    "tripadvisor": { "rating": null, "count": null, "gap": "no listing found" },
    "quotes": [{ "text": "…verbatim…", "author": "first name / initial as published", "date": "2026-03", "source_url": "…", "fetched_at": "…" }]
  },
  "images": [
    { "id": "img-001", "file": "assets/img-001.jpg", "source_url": "…", "fetched_at": "…", "license": "business-owned", "license_note": "posted by the business's own Instagram account", "width": 1600, "height": 1200, "description": "instructor and student at the shoreline", "sha256": "…" }
  ],
  "videos": [
    {
      "id": "vid-001",
      "source_url": "https://www.youtube.com/watch?v=…",
      "fetched_at": "2026-09-28T16:47:21Z",
      "license": "business-owned",
      "license_note": "the background video of the business's own homepage, on the YouTube channel its footer links to",
      "found_on": "https://www.example-surf.com/ (homepage hero embed)",
      "shows": "drone over the reef pass, then two surfers on a right-hander, a sunset paddle-out; no faces close up, no text on screen",
      "duration_s": 49.6,
      "resolution": [1920, 800],
      "source_file": "assets/video/vid-001-source.mp4",
      "sheet": "assets/video/vid-001-sheet.jpg",
      "sha256": "…",
      "hero_candidate": { "rank": 1, "why": "the only clip with the actual break in it; frames 4–16 s are all water, no cuts to people" },
      "cut": { "start_s": 4, "length_s": 12 },
      "renditions": [
        { "id": "vid-001-d1920-mp4",  "file": "assets/video/vid-001-d1920.mp4",  "mime": "video/mp4",  "width": 1920, "height": 800, "bytes": 3820000, "role": "hero-desktop" },
        { "id": "vid-001-m1280-mp4",  "file": "assets/video/vid-001-m1280.mp4",  "mime": "video/mp4",  "width": 1280, "height": 534, "bytes": 1910000, "role": "hero-mobile" },
        { "id": "vid-001-m720-mp4",   "file": "assets/video/vid-001-m720.mp4",   "mime": "video/mp4",  "width": 720,  "height": 300, "bytes": 1720000, "role": "hero-mobile-small" },
        { "id": "vid-001-d1920-webm", "file": "assets/video/vid-001-d1920.webm", "mime": "video/webm", "width": 1920, "height": 800, "bytes": 3110000, "role": "hero-desktop" }
      ],
      "poster": { "id": "vid-001-poster-jpg", "file": "assets/video/vid-001-poster.jpg", "avif": "assets/video/vid-001-poster.avif", "at_s": 5, "width": 1920, "height": 800 }
    }
  ],
  "existing_site": { "url": "…", "status": 200, "notes": "no mobile viewport, prices from 2021", "screenshot": "assets/old-site-mobile.png" },
  "languages": { "seen": ["en"], "owner_language_hint": "si" },  // owner_language_hint is context only; the pitch is always in English (2026-10-05)
  "gaps": [
    { "field": "business.tagline", "why": "none published", "pitch_point": true },
    { "field": "contact.email", "why": "not published", "pitch_point": false }
  ]
}
```

## Rules

| Rule | |
|---|---|
| Fact envelope | every leaf fact is `{ value, source_url, fetched_at }`; `value: null` + `gap` when not found. No fact without a source. |
| Client sources (0.3.0, 2026-10-17) | Anything the client handed us — the brief, files, answers to our questions, photos — carries `"origin": "client"` and `source_url: "client:<where>"` (`client:brief/<slug>/brief.md`, `client:<file under dossier/<slug>/client/>`, `client:message <date>`); its `fetched_at` is when we received it. Images and videos the client handed over are `license: "business-owned"` with `license_note: "handed over by the client"`. No `origin` = found on the public web. Client files are kept under `dossier/<slug>/client/` (git-ignored like `assets/`). |
| Images | files under `dossier/<slug>/assets/` (git-ignored), deduped by `sha256`, resized to ≤ 2000 px on the long edge; `license` ∈ `business-owned` \| `review-photo` \| `stock` \| `unknown`. Only `business-owned` is usable until the image policy is decided (PLAN.md §9). |
| Videos | **Harvested whenever the business publishes any** — its own site (a `<video>` file or a YouTube/Vimeo embed), its YouTube/Vimeo channel, and Instagram/Facebook reels reachable without login. Fetched with `tools/fetch-video.mjs`, which writes `assets/video/` and records every file (source, renditions, poster, contact sheet) in `assets/index.json` with `kind: "video"`. Same `license` values and the same rule as images: only `business-owned` is usable, and only when the site/channel/account is the business's own. `shows` is written after looking at the contact sheet, never from the title. Every video found goes in `videos[]` (usable or not); the best 1–3 for a hero/loop carry `hero_candidate` and a cut with renditions and a poster. A business that publishes video and has an empty `videos[]` is an incomplete harvest. No audio is kept in any rendition. |
| Reviews | quotes verbatim, with source; never paraphrased into claims. |
| Prices | number + currency + unit + capture date (`fetched_at`); currency from the source, not converted. |
| Booking | `path` ∈ `whatsapp` \| `phone` \| `engine` \| `none`; `none` is a blocking gap for the designer. |
| Gaps | listed once in `gaps[]` with `pitch_point: true` when the missing thing is a selling point of the new site. |
| Mapping | `schemas/site-content.md` fields map from: `business.*`, `contact.*`, `booking.*`, `hours` → `openingHours`, `hours_note` → `hoursNote`, `offers` → `priceList`, `images` → `photos`, `videos[hero_candidate.rank = 1]` (renditions + poster) → `heroVideo` + `heroVideoPoster`, other usable `videos` with a cut → `videos[]` (`description` ← `shows`), `location.map_url` → `contact.mapUrl`. The deployer's seed uses this mapping; the designer's mockup `content.json` uses the same. |

## Beside the dossier

`dossier/<slug>/audit.json` + `audit.md` + `funnel/` (`schemas/audit.md`) are the auditor's (station 3b), not the harvester's. They are **not a fact source**: nothing in them may appear on the site as content.
