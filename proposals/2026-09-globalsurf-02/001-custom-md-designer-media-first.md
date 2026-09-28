# 001 — custom.md proposal: designer/custom.md, media first

**custom.md proposal.** `agents/designer/custom.md` is yours; Claude never edits it. This file
suggests text for you to paste, change or ignore. Nothing here is applied.

## Why

On 2026-09-28 every Global Surf mockup was rejected: type-led pages and line drawings while the
business had video and fifty photographs at ≥ 1920 px. The base prompts that caused it are now fixed
(creative-director 0.3.0, designer 0.4.0, playbook 0.6.0, rubric 0.3.0). Three lines in
`designer/custom.md` still point the same way, and a designer reads them as your taste:

1. *"…whenever it fits better than the repetitive hero and card framework"* — read by the agents
   as "avoid the hero". You said the opposite on 2026-09-28: full-bleed is preferable when the
   material is good.
2. *"Minimal, precise, extreme: one bold idea per page, and everything around it quiet."* — read as
   "strip the imagery back"; produced near-empty type pages.
3. *"The first is quiet: the idea carried by type, colour and composition, with almost no motion."*
   — read as "the calm variant has no photograph"; calm scored best on the rubric and was the
   emptiest page.

## Suggested text (replace those three lines)

1. > Use custom canvas/WebGL, editorial layouts, asymmetrical grids and kinetic type where they make
   > the business's own footage and photographs more alive — never instead of them. When the
   > business has video or large photographs, a full-bleed media first screen is the preferred start.
2. > Minimal, precise, extreme: one bold idea per page, carried by the business's strongest media,
   > and everything around it quiet.
3. > The first is quiet: the business's best footage or photograph, big and still, with calm type
   > and composition and almost no motion.

## Decision needed

Paste, edit or reject. Until then the base prompts override these lines where they conflict, and
the designer records the conflict in `notes.md`.
