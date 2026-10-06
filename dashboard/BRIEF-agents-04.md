# BRIEF — Agents view redesign (run `dashboard-04`)

Shahar, 2026-10-05: *"Agents — this needs a serious redesign as well. If we're dealing with the agents
definitions and how they perform, we need to be able to read and edit those definitions. We absolutely
need a more visual way to see all agents on a graph, so ones that are not performing jump out
immediately. Same as the overview — this needs to run through a creative, a designer and a critic and
produce 3 mockups so I can choose a better layout."*

Earlier the same day, about the current Agents screen: *"I don't understand the 'Fails this run' matrix.
… What are we showing here? What's the information for the user?"* and the rule for the whole dashboard:
*"show info we can act on, or that betters our 100,000 foot view. We do NOT need info that contributes
nothing, like which agent ran when."* and *"MAKE THIS READABLE AND USABLE FOR HUMANS."*

`dashboard/BRIEF.md` still holds where this file is silent (§2 real data only, §5 hard rules, the locked
purple palette in its Amendments). `dashboard/BRIEF-overview-03.md` is the sister brief running now for
the Overview; keep the same product language (sidebar, purple, Manrope, popups over a white 80 % veil).

## 1. What the page is for

1. **See every agent at once, on one visual, so the weak ones jump out.** 16 agents
   (`agents/*/`: scout, harvester, auditor, copywriter, humanizer, copyeditor, creative-director,
   designer, seo, aiseo, critic, visual-critic, experience-critic, deployer, writer, orchestrator). They
   form a pipeline (PLAN.md §4: Scout → Harvest → Audit → Copy → Humanise → Copy review → Concept →
   Mockups → Build → SEO → AI SEO → Critique → Preview → Pitch → Deliver). A graph of that pipeline with
   each agent's health on it is the obvious candidate; others are welcome.
2. **"Not performing" must be defined in plain words and drawn from real data.** Available today, per
   agent and per run (`data.json` → `agents.<name>.by_run.<run>`): `lines` (times it ran), `passes`,
   `fails` (its work sent back: copyeditor failing copy, critic failing a build), `rounds_per_pass[]`
   (tries before its work passed), `fails_by_slug`; per agent `third_fail_overrides` (Shahar had to
   overrule a third fail), `version_pinned` / `version_changelog` / `pin_matches_changelog`,
   `changelog_line`. Also `proposals[]` with `agent` and `status: pending` (suggested tweaks waiting for
   this agent) and `businesses[].history` (every ledger line, with `agent`). Where an agent has no
   pass/fail signal (most do not), say so honestly — never invent a score. The creative director should
   propose which measures to show and how to combine them, e.g. "work sent back", "tries needed", "times
   you had to step in", "tweaks waiting", and what counts as red / amber / green.
3. **Read and edit each agent's definition, as a human.** Each agent folder has `base.md` (Claude
   writes: role, inputs, outputs, hard rules), `custom.md` (Shahar writes: taste and house rules — his
   own layer), `references.md`, `tools.md`, `evals.md`, `CHANGELOG.md`. Show them rendered and readable
   (large type, not terminal text). Editing: `custom.md` is Shahar's, so he edits it directly; `base.md`
   is Claude's, so an edit there is saved as a suggested change that Shahar approves (the same "Suggested
   agent tweaks" flow on the Decisions page). The mockups show both clearly: what is editable, what a save
   does, and the version/history of each agent in plain words ("last changed 28 Sep: …").
4. **Act from here:** open the agent's pending tweaks, approve/reject them, and jump to the businesses
   where it failed.
5. Leave out what nobody can act on (raw ledger line counts, version pins as jargon, "by run" matrices).

## 2. Data

Real only: `dashboard/data.json` (run `node dashboard/data.mjs`), the files under `agents/<name>/`
(embed the real text of each `base.md`, `custom.md`, `CHANGELOG.md` for at least the agents the mockup
shows open; all 16 if feasible), `proposals[]`. Use all runs combined unless a run filter is part of the
direction.

## 3. Look, agents, outputs, gate

Exactly as `dashboard/BRIEF-overview-03.md` §4–§6, with these paths:

- Creative director → `dashboard/agents-04/concepts.md` (three directions that differ in structure:
  e.g. a pipeline graph with health on each node, a ranked health board, a matrix/heat view — whatever
  serves the brief best; include how the read/edit experience works in each).
- Designer → `dashboard/agents-04/{a,b,c}/index.html` + `notes.md` (one self-contained file each, real
  data and real agent texts embedded, the editor working in-page without saving anywhere), look loop of
  at least 3 rounds at 1440 / 1024 / 390.
- Critic → `dashboard/agents-04/critique.md` + `side-by-side.png`, scoring Shahar's questions for this
  page: which agent is not performing and why / what can I do about it / what does this agent actually do
  and how do I change it — timed, with where the eye lands first. Hard fails as in the Overview brief, plus
  any health signal that is not traceable to data.

Stop after the critic; Shahar picks.

## Amendment — pick (Shahar, 2026-10-06): B "Board", with these changes

Verbatim: *"For the agents, generally speaking option B works best. I do not understand what "shared
with..." means. Main table: there is TOO MUCH info. The checked work colord graphics is enoth, we do not
need the "Why it's red" line under it. Too much red too. Make the states super opaque light red, and the
texts red. We do not need the initial icons for the agents. Inner view: we absolutely DO NOT need the full
story of interaction with the agent. You can keep your access to the data, but humans DO NOT need to
re-read this. Keep things concise. Suggest a change - is that your suggestion, or where you want me to
write a suggestion? Not clear. To sum things up: Table needs to be cleaner, with less info. Inner page
should be WAY LESS info. We can have an "Advanced" view that shows all this data. Simple view should be way
more concise. What does the agent do, what is wrong, and a CTA for YOU to suggest a correction, that we can
copy and send a claude session as a prompt."*

Read as:
- **Table:** agent name + one-line role, state, the checked-work marks, the sent-back fraction. Nothing
  else: no "Why it's red" line, no initials tiles, no "Shared with …" line (two agents judged together
  can simply show the same marks). States as a very light red fill with red text; red used sparingly.
- **Agent page, simple view (default):** three things only — *What it does* (2–3 plain sentences),
  *What is wrong* (one or two plain sentences, or "Nothing checks its work yet"), and one CTA: Claude's
  suggested correction as a ready prompt with **Copy prompt** (to paste into a Claude session). The
  prompt is built from the data (what is wrong, where, which file to change) and asks the session to
  propose the change — it does not invent the change. Pending tweaks for this agent stay as a small
  Approve / Reject line if any.
- **Advanced view (toggle):** everything else — full record, every send-back, history, the agent's files
  and the editors ("Your rules" saves directly; Claude's file edits become a suggested tweak), with
  labels that say plainly who writes what.
