# auditor / tools.md — what the agent may call, and how.

| Tool | Call | Use |
|---|---|---|
| `tools/funnel.mjs` | `node tools/funnel.mjs <url> --out dossier/<slug>/funnel --depth 3 --pages 30 [--shots]` | Mobile (390×844) crawl of the old site, breadth-first up to 3 taps. Writes `funnel.json` (`clicks_to_book`, `primary_action`, `cta_above_fold`, `terminal_above_fold`, per-page actions with label/position/class, broken pages, off-site hand-offs, `whitelabel_engine`), `landing-mobile.png` (full page), `landing-fold.png` (first screen). Never submits a form, never follows an engine off-site beyond recording the hand-off. Needs `playwright` (root `package.json`). |
| `tools/shoot.mjs` | `node tools/shoot.mjs <url> --out dossier/<slug>/funnel/shots` | Scrolled per-viewport screenshots when a finding needs a screen the funnel tool did not capture (an engine's first screen, a prices page). |
| Headless browser (playwright) | as the harvester | Walking the path by hand: Google listing → site → engine. Read-only. No logins, no form submissions, no bookings. |

Action classes in `funnel.json`: `whatsapp`, `tel`, `engine` (terminal: a booking can be sent from here), `dated_form` (terminal), `form`, `book_link` (a "book"-worded link that stays on the site), `contact_link`, `email`, `review_link`, `offsite`. `clicks_to_book` counts taps from the landing page to the first terminal action (tapping an action on the landing page = 1).
