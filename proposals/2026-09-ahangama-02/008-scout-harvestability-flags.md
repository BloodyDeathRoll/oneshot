# 008 — Scout: flag what the harvester will drop

Status: applied (scout 0.4.0, 2026-10-27). Approved by Shahar via the dashboard "Fix it" button.

## Evidence (ledger.jsonl, run 2026-09-ahangama-02, 19 Sep)

- `nirvana-surf-retreat`: scored 1/5 (Instagram, Booking "surf package", Google). Approved at gate a, then withdrawn by the harvester before harvest: Booking.com says "This property isn't taking reservations on our site right now"; the Agoda link is a generic deals page.
- `boardwalk-surf-villa`: scored 1/5 from Booking/Agoda/Google listings. Harvested, then disqualified: no owner-written copy anywhere, no check-in/out times.
- `surf-front`: scored 1/5 from a Booking listing and Google. Harvested, then disqualified: no owner-written copy anywhere.

Overall 5 of 11 approved businesses were dropped by the harvester (0 of 1 since harvester 0.3.2). The other two in this run: `surf-revolution-kabalana` (no public lesson prices) and `kabalana-surf-point-kasuns-place` (reviews alleging a charge scam).

## Cause

Scout `base.md` 0.3.2 scores presence only and says "everything inside the polygon goes in". For a business with no site, score 0–1 is the best shortlist signal, but it also describes businesses with no material at all. The scout's own notes show it saw the gaps ("says 'Contact this property for rates'", "No website or social page found"), yet nothing told it to check the type's must-have row or to put the gaps in its output. At gate a the human saw only "score ≤ threshold" and picked on photos; the harvester's must-have check then dropped them. In test mode nobody can be asked, so each gap is a drop.

## Change (agents/scout/base.md, 0.3.2 → 0.4.0, new rule)

New hard constraint 7: for candidates without a site, check public material against the `businessType` row in `vertical/business-types.md` and tag `no_owner_text`, `booking_closed`, `no_public_prices`, `too_few_photos` in `presence.criteria` and the reason; open the OTA listing itself. No candidate is removed or re-scored (no selection and the scale are unchanged). Hand-off check 4 and the report list the flagged ones.

## Not changed

`custom.md` (Shahar's; empty). `schemas/candidates.md`: criteria tags are free-form, so no schema change. The kabalana charge allegation is a reputation check the harvester already does.
