# 005 — copyeditor passed three unsourced claims on KA (evidence for the learn step)

Filed 2026-09-22 on Shahar's instruction: "Also log for the learn step: the copyeditor passed three
unsourced claims on KA this run." Evidence, not a diff. The learn step (critic, station ∞) turns it
into a proposal for `agents/copyeditor/base.md`; nothing is changed here.

## The three claims

All three were in `sites/ka-surf-hostel-and-restaurant/copy/en.json` when it passed 4c round 1
(`copy/review.md`, copyeditor 0.1.0, 2026-09-19: "`unsourced` **0**", counted in bulk with no line per
sentence).

| # | Sentence | Field | What the dossier says | Found by |
|---|---|---|---|---|
| 1 | "Those are the highest numbers on either listing" (staff 9.9) | `copyBlocks[1]` | Hostelworld Value for Money and Security are 10.0, above Staff 9.9 (`reviews.hostelworld.categories`) | the creative director at 4d round 3 (2026-09-21), confirmed by the orchestrator; fixed via 4a–4c on 2026-09-21 |
| 2 | "It changes daily, which guests mention more often than anything else on the property." | `copyBlocks[2]` | No frequency count; one review mentions the daily change; "family" appears in four quotes | the copywriter at 4a (2026-09-21, out of scope then), then critic full round 1 (hard fail, 2026-09-22) |
| 3 | "…with The Rock reef alongside it when the swell is up." | `spot` | `location.spot`: "The Rock reef A-frame for advanced surfers" — no swell condition, and the "advanced" fact is dropped | critic full round 1 (hard fail, 2026-09-22) |

Also missed by the critic's own quick rounds at 4f (which scored this copy 10/10 on facts).

## What it suggests (for the learn step to turn into a diff)

- The fact audit should be a sentence-by-sentence table with a dossier key per row; a bulk count
  is not an audit (critic, full round 1: "no station traces each sentence to a dossier key").
- Comparatives, superlatives and conditions — "highest", "more often than anything else", "when
  the swell is up" — are claims that need their own source, not framing.
- A dropped qualifier ("for advanced surfers") that changes who a fact is for is a mismatch.

## Cost this run

One extra 4a–4c loop for claim 1 (three copyeditor rounds, one human override), a failed full
critique for claims 2–3, and a second 4a–4c loop plus a rebuild round.
