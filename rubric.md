version: 0.3.1

# rubric.md — critic scoring: dimensions, weights, pass thresholds.

Used by three independent reviewers in both modes (PLAN.md §5): the **critic** (mechanical: facts, performance, booking, accessibility, delivery) and the two visual critics, **visual-critic** (the page as a piece of design) and **experience-critic** (the page as an experience). They never read each other's report before writing their own. Modes: **quick** (the three mockups, before the human pick) and **full** (the final site, up to 3 rounds). Thresholds align with `playbook.md` §4 budgets. Every score carries the evidence that produced it; a score without evidence is invalid.

## Dimensions

| # | Dimension | Weight | What is measured | Source of truth |
|---|---|---|---|---|
| 1 | Facts match dossier | 20 | Every checkable statement on the site (prices, hours, levels, inclusions, location, season, names, ratings, review text) traces to a `dossier.json` entry with the same value. Gaps handled as in `notes.md` (omitted or marked), never invented. | `dossier/<slug>/dossier.json`, `sites/<slug>/…/notes.md` |
| 2 | Mobile + performance | 15 | Home page measured on a throttled phone (playbook §4's assumptions: ~1.6 Mbps, 150 ms RTT, 4x CPU) with no scroll: first-load transfer, JS, fonts, largest image, LCP, CLS against the budget; layout at 390 px with no overflow/overlap/unreadable text in every run language. | `audit.json` from `tools/audit-mockup.mjs`, screenshots |
| 3 | Booking CTA works end to end | 15 | The primary action is a real link (works with JS off) to the dossier's booking path, number/handle/engine URL identical character for character; prefilled message names the business and the visitor's choice; tested by tapping through on a mobile viewport. Full mode also: `tools/funnel.mjs` on the built site meets `audit.json.recommended` — `clicks_to_book` at or under the target, primary action class equal (proposal 007). Over the target: dimension 3 ≤ 6. When `recommended.booking_flow` is set (own booking pages, rubric 0.3.1): `funnel.json.hero_action` replaces `primary_action` / `clicks_to_book` — `class` equal, `clicks_to_flow` at or under its target — and the walked taps from the hero CTA to the engine hand-off are at or under `max_taps_to_engine`. | dossier `booking`, tap-through log, `funnel.json` vs `dossier/<slug>/audit.json` |
| 4 | Brand fit vs playbook | 5 | Content hierarchy of playbook §3 present; the site answers the traveller's questions (level, price, spot, season, what's included, how to book) above the fold and in order; variant matches its brief in `custom.md` (calm / interactive / unique). | playbook §3, custom.md |
| 5 | Copy quality | 10 | Plain, specific, no filler, no generic surf clichés, no claims beyond the dossier; every language in `run.yaml` complete (English only for now). | site text |
| 6 | Accessibility | 8 | WCAG 2.1 AA floor: keyboard-operable everything (drawers trap and return focus, Esc closes), `prefers-reduced-motion` honoured, content as DOM text not only in canvas/video, alt text from the dossier, contrast ≥ 4.5:1, tap targets ≥ 44 px. | `audit.json` keyboard / reduced-motion / alt / tap-target sections, manual keyboard pass |
| 7 | Security + delivery baseline | 7 | Static output only: no server code, no runtime calls to the CMS, no third-party scripts/trackers/embeds on load, assets self-hosted and pinned, relative URLs, lowercase filenames; nothing weakens `server-hardening.md`. | build output, network log |
| 8 | **Visual quality** | 25 | The page as a finished piece of design and experience, judged independently by visual-critic and experience-critic (each 0–10; the dimension score is the **lower** of the two). Composition, typography, use of the business's strongest media (video first), colour, hierarchy, rhythm, polish, motion, first impression on a phone, emotional pull, how the booking flow feels. Compared side by side with the business's current site and with `agents/designer/references.md` + `gold/`. | both visual critics' scorecards, their screenshots, the old-site screenshots |

Total 100. Dimension 8 is scored only by the two visual critics; the critic scores 1–7.

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

- **Visual:** either visual critic scores the page below **8/10**, or says it is not clearly better than the business's current site (when one exists). A page that loses to the site it replaces is never shown to a human.
- **Visual:** the business has video (`dossier.videos[]` with a usable licence) and the page does not use it, or has photographs ≥ 1920 px and the first screen carries none of them — unless the concept gives a reason both visual critics accept.

- A fact on the site contradicts the dossier, or a claim has no dossier entry.
- The booking CTA does not land in the right chat/call/engine, or the number/URL differs from the dossier.
- Full mode: the built site's primary booking action is a different class (WhatsApp / phone / engine) from `audit.json.recommended.primary_action` (with `recommended.booking_flow`: `funnel.json.hero_action.class`).
- A non-business-owned image is presented as the business — captioned, positioned or cropped so a visitor could read it as this business's room, pool, food or people — or an image is used against the run's image policy (PLAN.md §9).
- A freely-licensed atmosphere image is used without the credit string recorded in `dossier/<slug>/stock/index.json`, or under a licence the policy excludes (share-alike, NC, ND).
- Any third-party request on first load, or any runtime dependency on the CMS.
- Keyboard trap, or content that exists only inside canvas/video with no DOM text.
- Home page over the playbook §4 budget by more than 50 % on any line (first-load transfer, JS, LCP).
- Secrets, credentials or internal URLs in the output.

## Pass thresholds

| Mode | Pass |
|---|---|
| **quick** (mockups) | No hard fail; dimensions 1, 3, 7 ≥ 6; **dimension 8 ≥ 8 from both visual critics**. Dimensions 2, 5, 6 are reported but not gating at mockup stage. A mockup that fails goes back to the designer (max 3 rounds) **before** the human sees anything. Output: score per mockup + the one sentence the human needs to pick. |
| **full** (final site) | No hard fail; total ≥ 85; every dimension ≥ 6; dimension 8 ≥ 8 from both visual critics; playbook §4 budget met on every line (not just within 50 %). |

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
- The tap-through log for the booking CTA; in full mode the `tools/funnel.mjs` output for the built site.
- A facts table: each site claim → dossier key → match / mismatch / missing.
- Network log of first load (host list, transfer size).

## Learning loop inputs

The scorecard's "what the designer prompt got wrong" lines, the human's pick + reason (ledger `mocked → picked`), and pitch outcomes feed `proposals/<run-id>/` (PLAN.md §7). Agreement between the quick pre-score and the human pick is the critic's own eval (PLAN.md §5).
