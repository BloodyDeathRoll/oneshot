# 004 — designer: a flaw found in a look round is fixed or raised, never handed off

Filed 2026-09-22 for the learn step (station ∞), on Shahar's instruction at the Layday pick gate:
"Adopt the critic's prompt suggestion (a flaw found in a look round is fixed or raised as a blocking
conflict, never handed off) as a proposal in proposals/ for the learn step, not as a live edit."
**Not applied.** Awaiting approval (gate d); on merge, bump `agents/designer/base.md` and add a
CHANGELOG line.

**Target:** `agents/designer/base.md` (0.3.3) — the look loop in "Outputs → 4e" and "Before handing
off → 4e" item 1.

## Evidence

- Critic 4f quick score, Layday round 3 (`reports/2026-09-ahangama-02/layday-surf-ahangama.md`):
  "The designer's look loop found every measurable defect in this round, wrote each one into
  `notes.md` as 'known, not fixed', and handed off anyway: unique's dock over text, interactive's
  reduced-motion bar, and interactive's dropped `stayInfo.note`."
  - `sites/layday-surf-ahangama/mockups/unique/notes.md`, look-log: "**Known, not fixed:** at 1440
    and 1525 the fixed docked berth … covers the ends of text lines in the right-hand column". The
    critic confirmed it at 11 scroll stops at 1440 and 10 at 1525.
  - `sites/layday-surf-ahangama/mockups/interactive/`: the reduced-motion curtain reads as a black
    bar; the designer noticed it "after round 6 and did not change it, because any change needs
    another round".
- The same pattern on KA round 3 (`sites/ka-surf-hostel-and-restaurant/mockups/unique/notes.md`,
  round 7): "Left as it is, and visible: … on the phone the Agoda tile's 'Check dates on' wraps".
- Shahar's pick of Layday unique (ledger, 2026-09-22) had to carry the known flaw into 4g as a
  condition: "the docked booking box never covers text at any width".

## Diff

```diff
--- a/agents/designer/base.md
+++ b/agents/designer/base.md
@@ -80,2 +80,9 @@
 Keep every round's contact sheets in `shots/`. A `look-log` with fewer than three first-screen
 rounds, or whose rounds change nothing visible between sheets, fails the station.
+
+**A flaw you find is never handed off.** Anything a look round shows as wrong — text covered by
+a fixed element at any width you checked, a reduced-motion or no-JS state that reads as a
+different object, a copy field that has no place on the page, overflow, overlap — is either fixed
+in a further round or written under `conflicts` as **blocking**, with why it cannot be fixed at 4e.
+"Known, not fixed" is not an outcome. A blocking conflict is reported to the human before the pick,
+not discovered by the critic.
@@ -166 +173 @@
-1. The look loop is complete: `look-log` has at least three first-screen rounds and one whole-page round, every round's sheets are in `shots/`, and the last sheets were looked at for overflow, overlap and unreadable text as well as for design.
+1. The look loop is complete: `look-log` has at least three first-screen rounds and one whole-page round, every round's sheets are in `shots/`, the last sheets were looked at for overflow, overlap and unreadable text as well as for design, and every flaw the look-log names is fixed or listed under `conflicts` as blocking.
```

## Expected effect

Fewer defects reach the pick gate; the ones that do are named to the human by the designer, with a
reason, instead of being found by the critic or carried into 4g as pick conditions.

## Risk

More look rounds per variant (time and tokens within `run.yaml`'s budget). A designer under budget
pressure may mark real fixes "blocking" to hand off; the critic's quick mode should check that each
blocking conflict names a reason a 4e fix was not possible.

## Related, not in this diff

The same critic report also noted: the prompt never asks for rating capture dates (playbook §6 does),
and never says a Rosa headline drawn from a fixture must not say "Now". Separate proposals if wanted.
