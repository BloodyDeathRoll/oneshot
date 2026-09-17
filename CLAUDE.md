# Oneshot — instructions for Claude Code sessions

Read `PLAN.md` fully before doing anything. It is the source of truth for decisions, layout, pipeline and phases. Ask Shahar only when a decision isn't already in PLAN.md.

## Rules (every session)

1. **Gates.** Never pass a human gate unattended: shortlist approval, mockup pick, send pitch, approve prompt diffs. Stop, present what the human needs, and wait.
2. **Ledger.** Every business state change is appended to `ledger.jsonl` (schema: `docs/ledger.md`). Append only — never rewrite or delete lines.
3. **Two-layer prompts.** Each agent's prompt is `base.md` (Claude writes) + `custom.md` (Shahar writes). Never edit any `custom.md`; propose changes to it as a separate proposal under `proposals/<run-id>/`, flagged as a custom.md proposal. Runtime prompt = `playbook.md` + `base.md` + `custom.md` + `references.md`.
4. **Small commits.** One commit per step, with a clear message.

## Resuming a session from `ledger.jsonl`

Disk is the memory — no daemon, no DB.

1. Read `run.yaml` for the current `run_id`, budgets and pinned agent versions.
2. Read `ledger.jsonl` and keep only lines with that `run_id`. For each `slug`, the **last** line's `to_state` is the business's current state.
3. Map each state to its next station using PLAN.md §4 (`discovered → scored → shortlisted → approved → harvested → mocked → picked → built → critiqued(n) → passed | failed → packaged → pitched → outcome:*`).
4. If the next transition is a human gate (`shortlisted → approved`, `mocked → picked`, `packaged → pitched`, or merging anything in `proposals/`), stop and ask. Do not infer approval from files on disk.
5. Otherwise, check that the current state's outputs actually exist on disk (e.g. `harvested` → `dossier/<slug>/dossier.json`). If they are missing or partial, redo that station rather than trusting the ledger line.
6. Work one business at a time. Append a ledger line as each transition completes — after the output is written, never before.
7. An empty ledger means nothing has run: start at Scout for the current `run.yaml`.
