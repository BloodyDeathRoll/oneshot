# experience-critic / tools.md — what the agent may call, and how.

| Tool | Use |
|---|---|
| `node tools/shoot.mjs <file|dir|url> --out <dir>` | Scrolled per-viewport screenshots + contact sheets at 1440 and 390. Use for the pages and for the business's current site. |
| playwright (root devDependency) | Your own walks: cold load frames at set times, scroll at human pace, hover/tap states, reduced motion, JavaScript off, network throttling (CDP `Network.emulateNetworkConditions`), video playback state (`video.currentTime`, `paused`). Read-only on third-party sites; decline cookie dialogs. |
| ffmpeg | Frames from the business's videos, to judge whether the best footage was used. |
