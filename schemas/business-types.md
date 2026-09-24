# schemas/business-types.md — the business type registry

**Version 0.1** · 2026-09-19 · companion to `schemas/site-content.md` v0.2.

One schema serves every business. This file says, for each `businessType`, which modules of that schema the harvester must try to fill and which the designer may rely on. It is a checklist, not a second schema — nothing here adds a field.

## Why it exists

The scout selects for the *weakest* web presence, so the businesses that score best publish the least. Before v0.2 that meant a dossier arrived with facts the schema had no home for (room types, check-in times, platform ratings) while the fields it did have stayed empty. The registry closes that gap: the harvester knows what to hunt for per type, and the designer knows what will be there.

## The types

| `businessType` | What it is | Must have to be buildable | Should have | Modules in play |
|---|---|---|---|---|
| `surf_school` | Lessons, usually on one beach | `contact` (a reachable channel), ≥ 1 `lessons[]` **or** `priceList[]` row, ≥ 3 `photos[]` | `credentials[]`, `levels` via `lessons[].level`, `openingHours[]`, `spot`, `testimonials[]` | shared + teaching |
| `surf_camp` | Lessons **and** a bed | everything a `surf_school` needs, plus ≥ 1 `rooms[]` row | `stayInfo`, `amenities[]`, `ratings[]`, `bookingLinks[]` to its OTA listings | shared + teaching + lodging |
| `beach_lodging` | A bed near the wave, no lessons of its own | ≥ 1 `rooms[]` row, ≥ 6 `photos[]`, ≥ 1 `bookingLinks[]` | `stayInfo` check-in/check-out, `amenities[]`, `ratings[]`, `testimonials[]`, `spot` | shared + lodging |
| `board_rental` | Boards by the hour, day or week | ≥ 3 `rentals[]` rows with prices, `openingHours[]`, ≥ 3 `photos[]` | damage and deposit terms in `rentals[].note`, `spot` | shared + kit |
| `surf_shop` | Retail, often with a cafe or rental counter | `openingHours[]`, ≥ 6 `photos[]`, `brands[]` **or** `rentals[]` **or** `priceList[]` | `amenities[]` (cafe, repairs, wax bar), `testimonials[]` | shared + kit |
| `shaper` | Makes boards | `shaping.boardTypes`, `shaping.leadTime`, ≥ 6 `photos[]` of actual boards | `shaping.customOrder`, `priceList[]`, `credentials[]` (years shaping) | shared + kit |
| `other` | Anything the registry does not cover yet | the core fields only | — | shared |

## `mode: test` vs `mode: live` (`run.yaml`)

The "must have" columns above are the **live** bar: on site we can photograph the place, sit with the owner and write copy with them, so a missing price is a conversation.

In `mode: test` there is no conversation. Nobody is on the ground and nobody may be contacted. A business qualifies for a test run **only if its public material alone builds a complete site**:

| In test mode | |
|---|---|
| What must be public | **facts**: what the place is, where it is, what it offers, how to book, and photographs. Enough of them to fill a page. |
| Copy is written, not required | If the owner has already written about the business — a Hostelworld description, an Airbnb listing, an Instagram bio — **use it**, it is their voice. If they have not, the copywriter **writes the copy from the facts**. Missing prose is not a disqualification; that is the copywriter's job. |
| The line that does not move | Never invent a fact to fill space. Add volume from what is there — a sourced detail written well is a paragraph; a detail you do not have is silence. |
| A gap is a disqualification only when it is a **fact** gap | no photos, no booking path, nothing to say about the place. Then drop it and pick another; never carry "ask the owner" into a test run. |
| Where the material lives | Booking.com and Agoda carry property-uploaded photos, room types, amenities and guest quotes. Hostelworld and Airbnb also carry the owner's own long-form copy — a bonus, not a requirement. |
| What fails fast | a bare Google listing with four reviewer photos and no description — nothing to build from in any voice. |

Test picks therefore skew to `beach_lodging` and `surf_camp` on OTAs. That is correct: the point of a test run is to prove the pipeline end to end, not to find the neediest business.

## Cross-type rules

1. **Every type needs the core:** `businessName`, one working contact channel, ≥ 3 `photos[]`, and **enough sourced facts for the copywriter to write a page from** — what it is, where, what it offers. Owner-written prose is a bonus, not a requirement: where it exists the copywriter uses it, where it does not the copywriter writes from the facts. A business that cannot reach *that* bar is not buildable — say so in `gaps[]` with `blocking: true` rather than filling the hole with invention.
2. **A business is one type**, the one it earns its money by. KA Surf Hostel sells beds and is `beach_lodging`, even though its Google listing says "and restaurant".
3. **A type is not a template.** Templates are `calm` / `interactive` / `unique`; any type can be built in any of them. The type decides which modules carry content, not how it looks.
4. **`other` is a flag, not a resting place.** A dossier that lands on `other` must carry the profile written under "New types" below.

## New types — the harvester's rule

When the harvester meets a business that fits no row above, it does **not** bend it into the nearest type and it does not invent a field. It appends a row to the table above and a short profile beneath, in the same shape as an existing one:

- **What it is** — one sentence, what the business sells.
- **Must have to be buildable** — the minimum set of schema fields without which a site would be a brochure for nothing. Be strict: this is the line that stops us building for a business with no material.
- **Should have** — what lifts it from adequate to good.
- **Modules in play** — from `schemas/site-content.md` v0.2. **If and only if** no combination of the existing modules can hold the business's facts, the harvester proposes a new module as a diff to `schemas/site-content.md` and stops for Shahar — it never ships a field the CMS does not have.

The row lands in the same commit as that business's dossier, and the ledger line for the harvest names the new type.

## Open

- Restaurants and cafes attached to a lodging or shop are currently `amenities[]` rows. If one turns up as the *main* business, it needs its own row (menu, service hours, reservations) — and probably a new module, since `priceList[]` is too thin for a menu.
- Yoga, spa and bike rental appear as add-ons in this area. Same call: an add-on is an `amenities[]` row; a standalone business is a new type.
