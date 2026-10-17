# analyst / references.md — the output contracts (from graph-flow's CONTRACTS.md, adapted), cached notes.

Source: `~/Projects/graph-flow/.claude/skills/graph-flow/CONTRACTS.md` and its four role prompts, read 2026-10-17. Paths are Oneshot's (`dossier/<slug>/industry/`); file names drop graph-flow's number prefixes.

## Frontmatter (every file)

```yaml
---
node: plan | lane | skeptic | industry | direction
role: planner | researcher | skeptic | merger
run: <run_id>
lane: <lane id>        # researcher only
status: complete | blocked
---
```

## Claim IDs

`C-<lane>-<NN>`, zero-padded, unique across the run. Minted once by a researcher, never renumbered; everything downstream refers to it by ID.

## plan.md (planner)

```
## Restated brief
## Missing information       # numbered; BLOCKING marked; any BLOCKING → status: blocked
## Lanes
### lane: <id>
- **Brief:** what this lane must establish
- **Success criteria:** what a good answer proves (not what it covers)
- **Out of scope:**
- **Suggested sources:**
## Not investigating         # deliberate exclusions + why
```
3–6 lanes, independently researchable, not overlapping. Lane ids lowercase, one word, filename-safe.

## lane-<id>.md (researcher)

```
## Summary          # 3 sentences max
## Claims
### C-<lane>-01 — <one-line claim>
- **Evidence:** what specifically supports it
- **Source:** name + URL, or "internal: brief"
- **Date:** YYYY-MM or "undated"
- **Confidence:** high | medium | low
- **Changes my mind:** what evidence would overturn it
## Dead ends
## Handoff notes
```
No claim without concrete evidence; `undated` is treated as stale; speculation only in handoff notes; six well-evidenced claims beat twenty assertions.

## skeptic.md (skeptic)

```
## Verdicts
| Claim | Verdict | Reason |
## Attack passes
### Unsupported
### Stale
### Ignored competitors / alternatives
### Pain vs willingness to pay
### Confident but unproven
## Self-check       # name at least one verdict you are least sure of
## Reopen request   # optional; at most one lane: id + brief + why
```
Every claim ID once. WEAKENED states the narrower claim. A source that does not say what was claimed is KILLED, not weakened. Run all five passes; say a pass is empty rather than skip it.

## industry.md (merger)

```
## The industry and how it makes money
## Sites in this space and what converts
## Key players
## The client's position
## The audience and what it searches for
## What we do not know
---
## Appendix: killed claims
| Claim | Why it was killed |
```
Every factual line ends with its claim IDs. Survivors only; WEAKENED in narrowed form; no new facts. Cut whole claims to fit, never citations or "what we do not know".

## direction.md (merger)

```
## The brief, in our words
## Positioning
## Audience
## What the site must do       # each item: the brief line it answers, claim IDs where research shaped it
## Page-archetype hints        # for the creative-director (station 4d)
## Open questions for the client
```
