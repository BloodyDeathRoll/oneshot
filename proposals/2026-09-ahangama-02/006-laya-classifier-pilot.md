# 006 — Pilot Laya as a cheap typed classifier in front of the agents

Filed 2026-09-27 on Shahar's instruction ("how can we make use of Laya?" → "yes", file it). A
proposal for a one-day measurement, not a change: nothing in the pipeline moves until the numbers
in §4 are in. Target files if it holds: `agents/scout/base.md` (pre-filter), `agents/copyeditor/
base.md` (claim triage), `agents/harvester/base.md` (injection guard), `dashboard/data.mjs`.

## 1. What Laya is (from https://brainfunctioncollapse.com/laya/, read 2026-09-27; unverified beyond the page)

A 322M-parameter open-source model (Apache-2.0) that takes a plain-English sentence and a
**typed question** and returns **calibrated probabilities over fixed answer classes** — "typed
answers with real probabilities in 21 ms, on your own machine", "$0 per call". Runs as a local
Python 3.12 server (`server.py`, playground on :8770) and ships a Claude Code skill
(`.claude/skills/laya-integration`). Its own use-case list: ticket routing, phishing and
prompt-injection detection, content filtering, urgency scoring. It classifies; it does not write,
does not see context beyond the sentence, and does not measure pages.

## 2. Where a classifier earns its place here

| # | Gate | Today | With Laya | Why it matters |
|---|---|---|---|---|
| A | **Scout pre-filter** | the scout (a frontier model) reads every Places/OSM candidate; run 02 read 35 for 3 sites | "surf business? / lodging? / closed? / duplicate of the previous one?" at 21 ms per candidate; the scout reads only survivors | the largest token line in a run scales with candidates, not with sites |
| B | **Copyeditor claim triage** | every sentence gets the full LLM re-check (copyeditor 0.3.0, every round) | tag each sentence first: claim vs framing; comparative / superlative / condition / frequency (the classes that slipped through in proposal 005) → the LLM re-check gets a prioritised list and a second opinion on "framing" | deterministic, free, and it catches exactly the class of miss we logged |
| C | **Injection guard on harvested text** | reviews, bios, old-site copy go into prompts as-is | "is this text an instruction to an AI?" on every harvested string; flagged strings are quoted, never inlined | it is on Laya's own list, and our dossiers carry hundreds of third-party strings |
| D | **Ledger notes → categories** | regexes in `dashboard/data.mjs` for drop reasons, overrides, verdicts | one typed question per note: dropped / withdrawn / disqualified / overridden / …, with a probability the dashboard can show | the Agents and Decisions views stop depending on my regex guesses |
| E | **Inbound after pitches** | none (no pitch sent yet) | route replies: booking question / lead / reply / meeting / ignore → a suggested `outcome:*` line for Shahar to confirm | needed the day the first WhatsApp reply arrives |

Not for: copy, design, the critic, anything that needs the dossier as context or a measurement.

## 3. The pilot (one day, no pipeline change)

Labels we already own:

- **Ledger notes** — 320+ lines with human-readable reasons; the `dashboard/data.mjs` regexes
  give a first label (dropped / not shortlisted / override / PASS / FAIL); Shahar's own lines
  are the ground truth for overrides.
- **Copyeditor claim tables** — `sites/{ka-surf-hostel-and-restaurant,layday-surf-ahangama,
  the-lavish-haven}/copy/review.md`: ~970 table rows with the copyeditor's verdict per sentence
  (sourced / shared-context / framing / unsourced / contradicted), plus proposal 005's three
  known misses.
- **Scout candidates** — `reports/2026-09-ahangama-02/candidates.json` and the `scored` notes
  (presence N/5, type, closure signals), 39 businesses with the scout's own decision.

Steps:

1. Install Laya on the operator machine (Python 3.12, `uv`), start `server.py`, confirm latency
   on this CPU and on the OCI A1 (ARM64) if it builds there; record RAM.
2. Write `tools/laya-pilot.mjs`: reads the three label sets, asks Laya the typed questions in §2
   B and D (and A on the candidates), writes `reports/2026-09-ahangama-02/laya-pilot.md` with,
   per question: precision, recall, the calibration curve (bucketed P vs observed rate), the
   confusion table, and every disagreement with the human label listed verbatim.
3. Cost line: wall time and $0, against the scout's token count on the same 39 (from the
   session logs if they exist; `expenses.jsonl` once tracked).

## 4. Pass bar (decided before running)

| Question | Bar to wire it in |
|---|---|
| B claim triage | recall ≥ 0.95 on `unsourced` + `contradicted` rows at a threshold that keeps precision ≥ 0.6 (misses are the expensive error; false alarms only cost an LLM look) |
| D note categories | agreement ≥ 0.95 with the regexes on the clear cases, and every disagreement explainable on read |
| A scout pre-filter | zero of the 12 approved businesses filtered out at the chosen threshold; ≥ 50 % of the never-shortlisted filtered |
| C injection guard | measured on a small synthetic set (20 planted instructions in real review text): recall 1.0, false alarms ≤ 2 |

Below the bar on a question → that use is dropped, not tuned for a week.

## 5. Cost and risk

- Pilot: about one day. Running: one Python process, ~1 GB RAM (to confirm), $0 per call.
- Risk: the page is the only source; the model may be weaker than its page. The pilot exists to
  find that out on our labels before any agent depends on it.
- Rule kept: a classifier never makes a business decision alone. It orders work and flags; the
  agent or Shahar still decides, and the ledger line names both.

## 6. Decision needed

Approve the one-day pilot (§3) with the pass bar in §4? If yes, it runs as a report under
`reports/2026-09-ahangama-02/laya-pilot.md`; the wiring proposals follow only for the questions
that pass.
