# experience-critic / tools.md — what the agent may call, and how.

| Tool | Use |
|---|---|
| `node tools/shoot.mjs <file|dir|url> --out <dir>` | Scrolled per-viewport screenshots + contact sheets at 1440 and 390. Use for the pages and for the business's current site. |
| playwright (root devDependency) | Your own walks: cold load frames at set times, scroll at human pace, hover/tap states, reduced motion, JavaScript off, network throttling (CDP `Network.emulateNetworkConditions`), video playback state (`video.currentTime`, `paused`). Read-only on third-party sites; decline cookie dialogs. |
| ffmpeg | Frames from the business's videos, to judge whether the best footage was used. |
| `/design-taste-frontend` inspector: `node .claude/skills/design-taste-frontend/scripts/inspect.mjs <page>` | Measured slop evidence for dimension 8: eyebrow labels, gradients, resting shadows, icon-card rows, headlines past two lines, broken images, a page where nothing moves. Each FAIL is one evidence line; the designer's look-log may name a playbook rule that overrides one (the §1a scrim). |
| `/impeccable critique` (`--target <page>`), `/emil-design-eng` | The design critique and the polish bar, read before the checklist so the fix list is concrete. |
| `/design-motion-principles` (audit mode), `/review-animations` | The anti-slop motion audit and the motion review: default to flagging, approval is earned. Findings are evidence lines, not a second report; the HTML report it writes to `motion-audits/` (git-ignored) is scratch, deleted with the shots; headless, ask for the terminal output instead of the browser. |
| playwright MCP (`.mcp.json`) | A live browser by tool call for the states the sheets cannot show: `browser_hover`, `browser_click` the booking CTA and the drawer, `browser_resize` to 390×844, mid-animation `browser_take_screenshot`. Evidence stays in words and shoot sheets. |
| figma MCP (`.mcp.json`) | `get_screenshot` of the frames an inbound client's brief points at, when the brief is part of what the page must answer, and of any design study in the OneShot file's `Playground` page (PLAN.md). |

Skills are vendored by `tools/vendor-skills.sh` (`.claude/skills/VENDORED.txt`) and invoked with the Skill tool (`/name`). They give you vocabulary and measured evidence; the rubric and this agent's method decide the score. An inspector FAIL or a skill's restraint advice against a concept's WebGL main item or its motion is not a defect (Shahar, 2026-10-20: the skills-led round was safer and duller than the first runs).
