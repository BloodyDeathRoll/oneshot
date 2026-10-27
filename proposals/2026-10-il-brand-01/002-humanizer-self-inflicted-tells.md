# 002: humanizer 0.2.1, stop writing the tells the review sends back

Status: **applied** (humanizer 0.2.1, approved by shahar via the dashboard "Fix it" button, 2026-10-27). Agent: humanizer. Touches `agents/humanizer/base.md` only; no `custom.md` change needed.

## Evidence

Ledger, all runs: copy review sent the copy back 14 of 28 (since 0.2.0: 14 of 25). Kinds: unsourced 8, machine-written 4, repeated sentences 3, contradicted 2, a guest's words as fact 1. Examples, run 2026-10-il-brand-01, `mutag-meitiv`, evidence file `sites/mutag-meitiv/copy/review.md`:

- Round 2 (V1): the humanizer's summary read as a keyword label, a colon, then her dash.
- Round 4 (H1): the humanizer wrote a list-colon slogan with a stock closer ("הכל במקום אחד"). (H2): the same three search phrases as a list in the tagline, intro and button text. (H3): a label-colon line beside two first-person sentences.
- Other runs (ahangama-02): "one guest wrote X, another Y, a third Z" (rule of three); a guest's words stated as the business's fact.

The facts were fine in the mutag-meitiv cases; the form failed, in lines the humanizer itself wrote.

## Cause in base.md 0.2.0

- Tell 10 said only "watch your own reflexes", with no examples, so the humanizer did not recognise its own slogan-with-colon pattern.
- The triad rule covered adjectives, clauses and examples, not guests or lists repeated across the lines of one screen.
- "Leave a limit in" and "admits something" invited an unsourced limit.
- No step to re-check rewritten lines against `sources.md` and the tell list.

## Change (patch, 0.2.0 to 0.2.1)

Tell 10 widened with the concrete patterns; new tell 11 (hidden triads, repeated lists); tell 9 and the limit bullet restricted to sourced limits; two new "How to rewrite" bullets (per-line source check, self-check against the tell list).
