version: 0.1.0

# rubric.md — critic scoring: dimensions, weights, pass thresholds.

Used by the critic in both modes (PLAN.md §5): **quick** (the three mockups, before the human pick) and **full** (the final site, up to 3 rounds). Thresholds align with `playbook.md` §4 budgets. Every score carries the evidence that produced it; a score without evidence is invalid.

## Dimensions

| # | Dimension | Weight | What is measured | Source of truth |
|---|---|---|---|---|
| 1 | Facts match dossier | 25 | Every checkable statement on the site (prices, hours, levels, inclusions, location, season, names, ratings, review text) traces to a `dossier.json` entry with the same value. Gaps handled as in `notes.md` (omitted or marked), never invented. | `dossier/<slug>/dossier.json`, `sites/<slug>/…/notes.md` |
| 2 | Mobile + performance | 20 | Home page measured on a throttled phone (playbook §4's assumptions: ~1.6 Mbps, 150 ms RTT, 4x CPU) with no scroll: first-load transfer, JS, fonts, largest image, LCP, CLS against the budget; layout at 390 px with no overflow/overlap/unreadable text in every run language. | `audit.json` from `tools/audit-mockup.mjs`, screenshots |
| 3 | Booking CTA works end to end | 15 | The primary action is a real link (works with JS off) to the dossier's booking path, number/handle/engine URL identical character for character; prefilled message names the business and the visitor's choice; tested by tapping through on a mobile viewport. | dossier `booking`, tap-through log |
| 4 | Brand fit vs playbook | 10 | Content hierarchy of playbook §3 present; the site answers the traveller's questions (level, price, spot, season, what's included, how to book) above the fold and in order; variant matches its brief in `custom.md` (calm / interactive / unique). | playbook §3, custom.md |
| 5 | Copy quality | 10 | Plain, specific, no filler, no generic surf clichés, no claims beyond the dossier; every language in `run.yaml` complete (English only for now). | site text |
| 6 | Accessibility | 10 | WCAG 2.1 AA floor: keyboard-operable everything (drawers trap and return focus, Esc closes), `prefers-reduced-motion` honoured, content as DOM text not only in canvas/video, alt text from the dossier, contrast ≥ 4.5:1, tap targets ≥ 44 px. | `audit.json` keyboard / reduced-motion / alt / tap-target sections, manual keyboard pass |
| 7 | Security + delivery baseline | 10 | Static output only: no server code, no runtime calls to the CMS, no third-party scripts/trackers/embeds on load, assets self-hosted and pinned, relative URLs, lowercase filenames; nothing weakens `server-hardening.md`. | build output, network log |

Total 100.

## Scoring

Each dimension scores 0–10, then × weight ÷ 10.

| Score | Meaning |
|---|---|
| 10 | Nothing to fix. |
| 7–9 | Minor issues, none that would mislead a visitor or block a booking. |
| 4–6 | A visitor would notice, or one budget line is over. |
| 0–3 | Wrong facts, broken CTA, unusable on mobile, or an unmet hard constraint. |

## Hard fails (score is irrelevant)

Any one of these fails the round regardless of total:

- A fact on the site contradicts the dossier, or a claim has no dossier entry.
- The booking CTA does not land in the right chat/call/engine, or the number/URL differs from the dossier.
- A non-business-owned image is presented as the business, or an image is used against the run's image policy.
- Any third-party request on first load, or any runtime dependency on the CMS.
- Keyboard trap, or content that exists only inside canvas/video with no DOM text.
- Home page over the playbook §4 budget by more than 50 % on any line (first-load transfer, JS, LCP).
- Secrets, credentials or internal URLs in the output.

## Pass thresholds

| Mode | Pass |
|---|---|
| **quick** (mockups) | No hard fail; dimensions 1, 3, 7 ≥ 6. Dimensions 2, 5, 6 are reported but not gating at mockup stage. Output: score per mockup + the one sentence the human needs to pick. |
| **full** (final site) | No hard fail; total ≥ 80; every dimension ≥ 6; playbook §4 budget met on every line (not just within 50 %). |

Fail → back to Build with the scorecard; max 3 rounds (PLAN.md §4).

## Scorecard format — `reports/<run-id>/<slug>.md`

```
mode: quick | full        round: n        variant: calm | interactive | unique
total: NN / 100           result: pass | fail        hard_fails: [...]

| # | dimension | score | evidence |
| 1 | facts | 8 | 14/14 facts matched; hours gap marked as placeholder (notes.md) |
...

what the designer prompt got wrong: <one paragraph, concrete, quotable in a proposal>
fix list (fail only): <ordered, smallest first>
```

## Evidence the critic must produce

- `audit.json` from `tools/audit-mockup.mjs`, and the playbook §4 budget table filled with its measured values.
- Screenshots at 390 px and 1440 px, every run language.
- The tap-through log for the booking CTA.
- A facts table: each site claim → dossier key → match / mismatch / missing.
- Network log of first load (host list, transfer size).

## Learning loop inputs

The scorecard's "what the designer prompt got wrong" lines, the human's pick + reason (ledger `mocked → picked`), and pitch outcomes feed `proposals/<run-id>/` (PLAN.md §7). Agreement between the quick pre-score and the human pick is the critic's own eval (PLAN.md §5).
