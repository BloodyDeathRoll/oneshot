# 002 — copywriter: repeated facts, stale caps, slogan lines

status: applied (copywriter 0.5.0, approved by shahar via dashboard 2026-10-27)

## Evidence
Dashboard: copy review sent copy back 14 of 28 (unsourced 8, machine-written 4, repeated sentences 3, contradicted 2, guest words as fact 1). Examples: mutag-meitiv, run 2026-10-il-brand-01, 18 Oct.
`sites/mutag-meitiv/copy/review.md` (ledger copy_failed lines 10:12, 10:18, 12:21 on 18 Oct):
- Round 1 (F2): content held out "for the 8-row / 1500 cap" after the schema cap became 16. F3/F4: one fact in two blocks; owner sentence kept verbatim and re-tensed. F5: `sources.md` stale.
- Round 4 (H1/H2): list-colon slogan with a stock closing phrase; the same keyword list in tagline, intro and CTA on one screen.

The mutag facts were clean (0 unsourced, 0 contradicted). The other categories in the counts have no local review file, so they are addressed by tightening the existing traceability and guest-quote rules.

## Cause in base.md
Nothing told the copywriter to re-read schema caps each round, to keep each fact in one place, to avoid slogan or keyword-list lines, or to self-check sentence by sentence before handoff. Guest-words-as-fact was only implied by "never paraphrase a review".

## Change
`agents/copywriter/base.md` 0.4.0 -> 0.5.0: hard constraints 10-13 and pre-handoff checks 1 and 5. No custom.md change needed.
