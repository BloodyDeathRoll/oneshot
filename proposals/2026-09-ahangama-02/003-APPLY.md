# 003 — what is in this bundle, and what is left

Unzip at the repo root. Paths are repo-relative. Then `git diff` before committing.

## Overwrites (built against the versions you sent on 2026-09-21)

| File | From → to |
|---|---|
| `agents/creative-director/base.md` + `CHANGELOG.md` | 0.1.0 → 0.2.0 |
| `agents/designer/base.md` + `CHANGELOG.md` | 0.2.0 → 0.3.0 |
| `agents/designer/references.md` | four findings appended (#26–#29), nothing removed |
| `agents/critic/base.md` + `CHANGELOG.md` | 0.2.0 → 0.3.0 |
| `playbook.md` | 0.1.0 → 0.2.0 (Rosa exception in §4) |

If any of these has moved on in the repo since then, do not overwrite it: take the change from
`git diff` by hand. The creative director's hard constraints were renumbered 1–15 because the list
had repeated numbers.

## New files

- `tools/shoot.mjs` — tested against the Lavish page (13 desktop and 14 mobile captures + sheets). Needs `playwright`.
- `agents/designer/gold/README.md`, `the-lavish-haven.html`, `the-lavish-haven-notes.md`
- `proposals/2026-09-ahangama-02/003-design-quality.md` — evidence and reasoning
- `proposals/2026-09-ahangama-02/003-custom-md-draft.md` — suggested text for your `custom.md`
- this file

## Not touched

Every `custom.md`, `agents/wiring.json`, `ledger.jsonl`, `rubric.md`, `schemas/`, `cms/`, all
existing tools.

## Still to do — files this bundle could not see

Paste this to the Claude Code session in the repo:

```
Read proposals/2026-09-ahangama-02/003-design-quality.md and 003-APPLY.md, then the new
agents/designer/base.md (0.3.0), agents/critic/base.md (0.3.0) and agents/creative-director/base.md
(0.2.0). They are already merged. Bring the rest of the repo in line. Diagnose before changing
anything, show me a plan first, and do not edit any custom.md or ledger.jsonl.

1. Station 4e now outputs ONE file per variant at sites/<slug>/mockups/<variant>/dist/index.html
   (+ dist/img/, notes.md with look-log, shots/round-N/). Find everything that assumes a 4e mockup
   is an Astro project: the orchestrator's prompt and checks, tools/build-mockup.mjs,
   tools/audit-mockup.mjs, tools/check-design.mjs, tools/check-places.mjs, tools/check-wiring.mjs,
   PLAN.md, CLAUDE.md. List each assumption and propose the smallest change. build-mockup's
   1200 px full-bleed refusal must still apply at 4e: say how.
2. tools/check-design.mjs: add a default-look detector that WARNS and never fails. Report computed
   font families on h1, h2 and body against the list in creative-director hard constraint 15; the
   page ground in HSL, flagged when hue is 30–60, saturation under 40% and lightness over 88%;
   the count of elements with text-transform: uppercase and letter-spacing over 0.05em; the count
   of headings directly preceded by such a label. Make it take its screenshots through
   tools/shoot.mjs. Run it on agents/designer/gold/the-lavish-haven.html and show me the output,
   including whether house rule 1 fails on the night-blue panels (003-design-quality.md §4).
3. Document tools/shoot.mjs in agents/designer/tools.md and agents/critic/tools.md, and confirm
   playwright is a dependency.
4. Rosa forecast. Ask me for the path to the Rosa repo. From it, document in
   agents/designer/tools.md the public URL pattern of the per-spot JSON, its field names and
   units, CORS and cache lifetime; check in one real sample as
   agents/designer/fixtures/rosa-kabalana.json; add the optional block to schemas/site-content.md
   (forecast: enabled boolean, rosaSpotId string read-only for the owner, spotName string) and to
   the Payload collection if the schema file is generated from it. If Rosa does not send CORS
   headers for static JSON, say so and propose the fix on the Rosa side.
5. Run node tools/check-wiring.mjs and node tools/prompt.mjs designer, and show me the assembled
   prompt's size before and after.
6. Then re-run stations 4d to 4f for ka-surf-hostel only, and stop at the pick gate.
```

## Decisions that are yours

1. `agents/designer/custom.md` — colour and type taste, and the three-variant brief (`003-custom-md-draft.md`).
2. House rule 1 against the approved Lavish page (`003-design-quality.md` §4).
