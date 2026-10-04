version: 0.1.3

# schemas/audit.md — `audit.json`, the auditor's output (PLAN.md §4 station 3b, proposal 007)

One file per business: `dossier/<slug>/audit.json`, beside `audit.md` (the same findings written for a human) and `funnel/` (the tool's raw output and screenshots). Written after `harvested`, before `copy_drafted`. Read by the creative director (4d), the copywriter (4a), the critic (5) and the writer (7).

```json
{
  "slug": "mellow-hostel",
  "run_id": "2026-09-ahangama-02",
  "auditor_version": "0.1.0",
  "audited_at": "2026-09-28T10:00:00Z",
  "scope": "site",                              // site | no_site — no_site = only off-site presence was audited
  "measured": {                                 // copied from funnel/funnel.json, never typed by hand
    "url": "https://mellowhostel.com/",
    "status": 200,
    "clicks_to_book": 1,
    "primary_action": { "class": "engine", "label": "Book Now", "href": "https://hotels.cloudbeds.com/reservation/0CGfsM" },
    "cta_above_fold": true,
    "terminal_above_fold": true,
    "pages_crawled": 15,
    "broken_pages": ["https://mellowhostel.com/link-given"],
    "funnel_json": "funnel/funnel.json"
  },
  "findings": [
    {
      "id": "F1",
      "area": "funnel",                         // funnel | cta | offer | trust | contact | mobile | content | offsite
      "severity": "high",                       // high = a visitor who wanted to book could not, or would not, complete it; medium = friction; low = polish
      "title": "The booking engine opens with dates from 2024 prefilled",
      "what_a_visitor_meets": "Tapping Book Now opens Cloudbeds with check-in 2024-04-21; the visitor has to notice and change the year before any room shows.",
      "evidence": [
        { "type": "url", "value": "https://hotels.cloudbeds.com/reservation/0CGfsM#checkin=2024-04-21&checkout=2024-04-22" },
        { "type": "screenshot", "value": "funnel/landing-fold.png" },
        { "type": "click_path", "value": ["/", "Book Now"] }       // type ∈ url | screenshot | click_path | dossier (value = a dossier key path, e.g. "dossier.json#booking.path")
      ],
      "playbook_ref": "§5 booking path",
      "fix_in_new_site": "bookingLinks[0].url without a prefilled date; label 'Check rooms and prices'",
      "pitch_point": true
    }
  ],
  "recommended": {                              // the funnel the new site should have, in schemas/site-content.md terms only
    "primary_action": "engine",                 // whatsapp | tel | engine — must equal dossier.booking.path
    "primary_label": "Check rooms and prices",  // working label, ≤ 60 chars, names what happens next; the copywriter owns the final wording
    "secondary_actions": ["whatsapp"],          // only channels the dossier proves the owner answers
    "clicks_to_book": 1,                        // target the critic measures on the new site with tools/funnel.mjs
    "above_fold": ["what_where", "price", "primary_action"],   // fixed terms, in order (table below)
    "offer_framing": "room types and what is included, then the link to live dates",
    "closing_intent": "send the reader to live dates and name the listings",   // what the last line must do; never the line itself
    "off_site": [                               // fixes outside the site; not built by us, offered as advice in the pitch
      { "channel": "google_business_profile", "finding": "F5", "advice": "add the new site URL to the listing" }   // finding = an id in findings[]; the problem is not restated
    ]
  },
  "built_site_gaps": [                          // only when the site already exists (auditor constraint 12); else []
    { "recommended": "primary_label", "built": "Book now", "evidence": "sites/<slug>/final/shots/…" }
  ],
  "not_measurable": ["conversion rate — no analytics access", "reply time — no owner contact in test mode"]
}
```

## Field rules

| Field | Rule |
|---|---|
| `scope` | `site` when `dossier.existing_site.url` is set and loads; `no_site` otherwise. In `no_site` scope `measured` is `null`, `funnel/walk.json` lists the pages walked, `findings[].area` is `offsite` only, and the audit shows what having no direct channel means for a visitor (a platform's cost only in its own quoted words). |
| `recommended` | **Required in both scopes.** A business with no old site still gets its funnel designed here, from the dossier's booking path, the OTA/Google path a visitor takes today, and the type's lead order (playbook §2). The critic measures the built site against it either way. |
| `measured` | Numbers come from `funnel/funnel.json` (`tools/funnel.mjs`). The auditor copies, never edits. If the tool failed, `measured.error` carries the message and no funnel finding is made from memory. |
| `findings[].evidence` | ≥ 1 entry, and for `area: funnel \| cta \| mobile` at least one `screenshot` or `click_path`. A finding a reader cannot reproduce by opening the evidence is deleted, not softened. |
| `findings[].severity` | `high` when the evidence shows a visitor who wants to book or ask **cannot**: the booking is blocked, a price or offer the business publishes is hidden from them, or there is no way to reach the business before paying (on site or off site). `medium` = extra taps, a mislabelled or below-fold action, a dead link on the path, an interstitial in front of the listing. `low` = wording, order, polish. |
| `findings[].fix_in_new_site` | Expressed in `schemas/site-content.md` fields or the playbook's page structure. For an `offsite` finding: what the new site changes for that visitor, or `null` when it cannot help. Never a request for a new template feature. |
| `findings[]` keys | exactly the keys in the example; free-text remarks go in an optional `notes` string, nothing else is added. |
| `findings[].pitch_point` | `true` when the writer may cite it as "what visitors could not do before". Only `high` and `medium` with a screenshot qualify. |
| `recommended.primary_action` | Must equal `dossier.booking.path`. The audit does not introduce a channel the owner does not monitor (playbook §5). |
| `recommended.secondary_actions` | Only channels the business publishes itself for customers, or that reviewers in the dossier say they used (auditor constraint 6). Empty when none qualifies. |
| `recommended.above_fold` | The order of the **booking section and the persistent booking bar** (since 2026-09-28; the key name is historical). The first screen itself needs only what + where, the primary action and one proof point (playbook §3), and is built on the business's strongest media. Ordered, from these terms only (playbook §2 questions): `what_where`, `level`, `price`, `included`, `spot`, `season`, `trust`, `languages`, `primary_action`. For OTA-only lodging `price` means a link to live dates, never a copied nightly rate (site-content "Live prices are not content"). |
| `recommended.off_site[]` | `{ channel, finding, advice }`; `finding` is an id from `findings[]`. |
| `recommended.clicks_to_book` | 1 when the primary action is WhatsApp or tel; ≤ 2 when it is an engine (the tap that leaves the site counts). The critic measures the built site against this. Not used when `booking_flow` is set. |
| `recommended.booking_flow` | Optional (0.1.3, Shahar 2026-10-04). Set only when the site books through its own stepped booking pages that hand off to the engine: `{ "clicks_to_flow": 1, "max_taps_to_engine": 8, "decided": "<who, date>" }`. `primary_action` is then `engine`. The critic measures `funnel.json.hero_action` (`class` = `primary_action`, `clicks_to_flow` ≤ target) with `tools/funnel.mjs` ≥ 0.2.0, and counts the taps from the hero CTA to the engine hand-off on its own walk (≤ `max_taps_to_engine`). |
| Numbers | No revenue, conversion or "X % more bookings" figures anywhere, and no computed commission. A platform's own words about what it charges may be quoted verbatim with URL and screenshot (auditor constraint 4). |
| Not a fact source | Nothing in `audit.json` may appear on the site as content. The copyeditor treats a site sentence sourced to the audit as `unsourced`. |
