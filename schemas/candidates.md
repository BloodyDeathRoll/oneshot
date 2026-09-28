version: 0.2.0

# schemas/candidates.md — `candidates.json`, the scout's output (PLAN.md §4 station 2)

One file per run: `reports/<run-id>/candidates.json`. The human approves a subset (gate a); approved slugs move to `approved` in the ledger.

```json
{
  "run_id": "2026-09-ahangama-01",
  "generated_at": "2026-09-18T06:00:00Z",
  "scout_version": "0.1.0",
  "area": {
    "mode": "business",
    "anchors": [{ "query": "The Lavish Haven, Ahangama, Sri Lanka", "lat": 5.9730, "lng": 80.3650, "geocoder": "nominatim", "fetched_at": "…" }],
    "radius_m": 100,
    "shore_buffer_m": null,
    "polygon": "<GeoJSON Polygon or path to reports/<run-id>/area.geojson>"
  },
  "candidates": [
    {
      "slug": "example-surf-school",
      "name": "Example Surf School",
      "type": "surf_school",
      "location": { "lat": 5.9450, "lng": 80.4600, "address": "…", "inside_buffer": true, "distance_to_shore_m": 40 },
      "contact": { "phone": "+94…", "whatsapp": "+94…", "email": null },
      "socials": { "instagram": "https://…", "facebook": "https://…", "tripadvisor": "https://…", "google_maps": "https://…" },
      "existing_site": { "url": "https://…", "status": 200, "mobile_friendly": false, "last_updated_hint": "2022", "has_booking": false,
                         "funnel": { "clicks_to_book": 2, "primary_action": "engine", "cta_above_fold": false, "measured_at": "…" } },
      "presence": { "score": 1, "reason": "Facebook page only; no site; booking by phone in reviews", "criteria": ["facebook_only", "no_booking"] },
      "evidence": [{ "source_url": "https://…", "fetched_at": "…", "note": "Google Places listing" }],
      "surf_related_confidence": 0.9,
      "languages_seen": ["en"]
    }
  ]
}
```

## Field rules

| Field | Rule |
|---|---|
| `slug` | lowercase, `a-z0-9-`, unique per run; used for `dossier/<slug>/`, `sites/<slug>/`, the ledger |
| `type` | one of `run.yaml` `types` |
| `location.inside_buffer` | result of point-in-polygon against `area.polygon`; candidates outside are not listed |
| `contact.*` | E.164 numbers; `null` when not found, never guessed |
| `existing_site.funnel` | from `tools/funnel.mjs <url> --depth 1`, copied, never typed: `clicks_to_book` (null = no booking action found within the depth), `primary_action` (the action class), `cta_above_fold`, `measured_at`. `null` when there is no live site. Criteria tags it may add: `clicks_to_book_gt_2`, `no_cta_above_fold` |
| `presence.score` | 0–5: 0 none · 1 Facebook/Instagram only · 2 site exists but dead link or not mobile · 3 mobile but no booking path · 4 booking exists, content stale · 5 fine. `reason` is one sentence; `criteria` are the tags that produced it |
| `evidence` | ≥ 1 entry; every fact above traces to one of them |
| `surf_related_confidence` | 0–1; human spot-checks precision (scout eval) |

Shortlist = candidates with `presence.score ≤ run.yaml.presence_threshold`, at most `max_sites` after the human's approval.
