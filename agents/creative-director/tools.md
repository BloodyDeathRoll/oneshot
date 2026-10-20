# creative-director / tools.md — what the agent may call, and how.

## Design skills

Vendored into `.claude/skills/` (`tools/vendor-skills.sh`, pinned in `.claude/skills/VENDORED.txt`), invoked with the Skill tool (`/name`). You write words, not code. They are vocabulary and checks, not the source of the concept: the skills-led round of 2026-10-20 came out safer and duller than the first runs (Shahar), so no skill decides a direction, and no skill's restraint removes a concept's hero main item or its motion.

| Skill | Use at 4d |
|---|---|
| `/design-taste-frontend` | Its `references/layout.md`, `imagery.md`, `motion.md` are vocabulary for §2 and §4. Do not deal directions with `draw.mjs`. |
| `/impeccable` | Its Modes (Persuade, Operate, Read, Experience) name what the visitor's success looks like; §3's archetype says which mode this business is and why. `reference/new-work.md` is how a replacement visual world is chosen from the material rather than from category habit. |
| `/design-motion-principles`, `/animation-vocabulary` | Name each concept's motion signature in the right words (one or two moves per concept, with the designer's `/animate` in mind), so the designer builds what you meant. |

Skills inform the concept; `custom.md`, `playbook.md`, `direction.md` and this agent's hard constraints decide it.

## Seeing the material — Playwright and Figma MCP

`.mcp.json` starts both for every session. **playwright**: walk the business's current site and the reference sites live (`browser_navigate`, `browser_resize` to 390×844, `browser_hover`, scroll) when a still is not enough to know what a page does; read-only on third-party sites. **figma**: `get_screenshot` / `get_design_context` of the frames an inbound client's brief points at (`brief/<slug>/`); the client's Figma is an input to §1 and §2, never the archetype. A concept sketch made in Figma goes in the OneShot file's `Playground` page (PLAN.md), its own frame named `<slug>/<concept>`.
