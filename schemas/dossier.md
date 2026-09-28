version: 0.1.0

# schemas/dossier.md — `dossier/<slug>/dossier.json`, the harvester's output (PLAN.md §4 station 3)

Everything downstream (designer, deployer seed, critic, writer) takes facts from here and only from here. Every fact carries `source_url` + `fetched_at`; every image carries a license note. Gaps are flagged, not filled.

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
  "existing_site": { "url": "…", "status": 200, "notes": "no mobile viewport, prices from 2021", "screenshot": "assets/old-site-mobile.png" },
  "languages": { "seen": ["en"], "owner_language_hint": "si" },  // owner_language_hint drives the writer's outreach message only
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
| Images | files under `dossier/<slug>/assets/` (git-ignored), deduped by `sha256`, resized to ≤ 2000 px on the long edge; `license` ∈ `business-owned` \| `review-photo` \| `stock` \| `unknown`. Only `business-owned` is usable until the image policy is decided (PLAN.md §9). |
| Reviews | quotes verbatim, with source; never paraphrased into claims. |
| Prices | number + currency + unit + capture date (`fetched_at`); currency from the source, not converted. |
| Booking | `path` ∈ `whatsapp` \| `phone` \| `engine` \| `none`; `none` is a blocking gap for the designer. |
| Gaps | listed once in `gaps[]` with `pitch_point: true` when the missing thing is a selling point of the new site. |
| Mapping | `schemas/site-content.md` fields map from: `business.*`, `contact.*`, `booking.*`, `hours` → `openingHours`, `hours_note` → `hoursNote`, `offers` → `priceList`, `images` → `photos`, `location.map_url` → `contact.mapUrl`. The deployer's seed uses this mapping; the designer's mockup `content.json` uses the same. |

## Beside the dossier

`dossier/<slug>/audit.json` + `audit.md` + `funnel/` (`schemas/audit.md`) are the auditor's (station 3b), not the harvester's. They are **not a fact source**: nothing in them may appear on the site as content.
