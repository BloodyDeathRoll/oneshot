version: 0.1.0

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
        { "type": "click_path", "value": ["/", "Book Now"] }
      ],
      "playbook_ref": "§5 booking path",
      "fix_in_new_site": "bookingLinks[0].url without a prefilled date; label 'Check rooms and prices'",
      "pitch_point": true
    }
  ],
  "recommended": {                              // the funnel the new site should have, in schemas/site-content.md terms only
    "primary_action": "engine",                 // whatsapp | tel | engine — must equal dossier.booking.path
    "primary_label": "Check rooms and prices",  // ≤ 60 chars, one verb, names what happens next
    "secondary_actions": ["whatsapp"],          // only channels the dossier proves the owner answers
    "clicks_to_book": 1,                        // target the critic measures on the new site with tools/funnel.mjs
    "above_fold": ["what and where", "price from", "primary action"],   // playbook §2 items that must be visible before a scroll, in order
    "offer_framing": "rooms with a nightly price and what is included, then the link to live dates",
    "closing": "Rates move with the dates. The listings show what is free.",
    "off_site": [                               // fixes outside the site; not built by us, offered as advice in the pitch
      { "channel": "google_business_profile", "finding": "no website link on the listing", "advice": "add the new site URL" }
    ]
  },
  "not_measurable": ["conversion rate — no analytics access", "reply time — no owner contact in test mode"]
}
```

## Field rules

| Field | Rule |
|---|---|
| `scope` | `site` when `dossier.existing_site.url` is set and loads; `no_site` otherwise. In `no_site` scope `measured` is `null`, `findings[].area` is `offsite` only, and the audit says what the business pays for having no direct channel (commission is quoted only from a sourced page, never a guessed percentage). |
| `recommended` | **Required in both scopes.** A business with no old site still gets its funnel designed here, from the dossier's booking path, the OTA/Google path a visitor takes today, and the type's lead order (playbook §2). The critic measures the built site against it either way. |
| `measured` | Numbers come from `funnel/funnel.json` (`tools/funnel.mjs`). The auditor copies, never edits. If the tool failed, `measured.error` carries the message and no funnel finding is made from memory. |
| `findings[].evidence` | ≥ 1 entry, and for `area: funnel \| cta \| mobile` at least one `screenshot` or `click_path`. A finding a reader cannot reproduce by opening the evidence is deleted, not softened. |
| `findings[].severity` | `high` only when the evidence shows a booking blocked or a price/offer hidden; `medium` = extra taps, mislabelled or below-fold action, dead link on the path; `low` = wording, order, polish. |
| `findings[].fix_in_new_site` | Expressed in `schemas/site-content.md` fields or the playbook's page structure. A fix the schema cannot hold is written under `recommended.off_site` or dropped; it is never a request for a new template feature. |
| `findings[].pitch_point` | `true` when the writer may cite it as "what visitors could not do before". Only `high` and `medium` with a screenshot qualify. |
| `recommended.primary_action` | Must equal `dossier.booking.path`. The audit does not introduce a channel the owner does not monitor (playbook §5). |
| `recommended.clicks_to_book` | 1 when the primary action is WhatsApp or tel; ≤ 2 when it is an engine (the tap that leaves the site counts). The critic measures the built site against this. |
| Numbers | No revenue, conversion or "X % more bookings" figures anywhere. The audit shows what a visitor can and cannot do; money claims need data we do not have. |
| Not a fact source | Nothing in `audit.json` may appear on the site as content. The copyeditor treats a site sentence sourced to the audit as `unsourced`. |
