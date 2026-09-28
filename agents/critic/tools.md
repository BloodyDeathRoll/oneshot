# critic / tools.md — what the agent may call, and how.

## `tools/shoot.mjs` — scrolled screenshots and contact sheets

```
node tools/shoot.mjs <file.html | dir-with-index.html | http(s)://url> [--out <dir>] [--step 0.9] [--settle 700] [--max 40]
```

- Scrolls the page top to bottom in viewport steps (`--step`, a fraction of the viewport), waits `--settle` ms for motion, and captures each viewport at **1440 × 900** and **390 × 844** (2x, touch). Stops after `--max` captures per width and says so (`truncated` in `shoot.json`).
- If the window does not scroll but the page has its own scroll area, it scrolls the largest scrollable element instead (`scroller: "inner element"` in `shoot.json`).
- Waits up to 4 s at each stop for anything marked `data-loading="true"` — the Rosa forecast block marks itself that way while it loads.
- Chromium runs with software GL, so WebGL renders. Known artefact: an opaque element over a WebGL canvas can punch a black rectangle in the canvas. It is the headless compositor, not the page (designer `references.md` #29); confirm with `document.elementsFromPoint` before treating it as a defect.
- Output in `--out` (default `./shots`): `desktop-00.png …`, `mobile-00.png …`, `desktop-sheet.png`, `mobile-sheet.png` (the contact sheets: open these), their `.html`, and `shoot.json` (page height, capture count, scroller, console errors).
- Needs `playwright`, a dev dependency in the repo's root `package.json`: run `npm install` once at the repo root. Chromium comes from `npx playwright install chromium` if the machine does not have it.

Quick and full mode both score from these captures, never from a single full-page capture (hard constraint 3). Write them under the mockup's `shots/` (quick) or beside the scorecard's evidence (full), the same widths and options for all three mockups.

At 4e a mockup may load its fonts from Google Fonts (designer 0.3.0), so `fonts.googleapis.com` and `fonts.gstatic.com` in `audit.json`'s `third_party_hosts` are expected in quick mode and are a defect only in full mode. For the Rosa forecast — the widget iframe and the per-spot JSON, their URLs, headers and fields — see `agents/designer/tools.md`. `audit-mockup.mjs` does not scroll, so neither the JSON request nor the widget frame should be in `first_load`; capture both after scrolling to the block yourself.

## Static server

`node tools/serve-mockups.mjs` serves every built mockup from its `dist/`, one localhost port each from 8901, and prints the list. `audit-mockup.mjs` and `check-design.mjs` start their own plain static server on `dist/` per mockup (no rewrites, no compression, 404 for anything missing), so a page that passes them loads from any static host.

## `tools/audit-mockup.mjs` — the measured evidence, including network capture

```
node tools/audit-mockup.mjs <slug> <variant>      writes sites/<slug>/mockups/<variant>/audit.json
node tools/audit-mockup.mjs --all
```

Separate passes in headless Chromium, all written to `audit.json`:

- `first_load` — the network capture. A 390 × 844 phone throttled to playbook §4 (1.6 Mbps down, 150 ms latency, 4x CPU), no scroll: every response logged with host and size; `requests`, `hosts`, `third_party_hosts`, bytes in total and by type (HTML, JS, CSS, fonts, images), `largest_image_bytes`, and measured `lcp_ms`, `cls`, `dcl_ms`.
- `booking` — every external and `tel:` link, whether a booking action is above the fold, and `tapped`: where the first booking action lands. `keyboard` — if the page has a `[data-open-drawer]` drawer: it opens, Esc closes it, focus returns.
- `a11y` — images without alt, tap targets under 44 px, heading order, skip link, `lang`. It is not axe; run axe separately for full mode.
- `no_js` — with JavaScript off: text length, booking links reachable inside `#book`, visible images.
- `reduced_motion` — with `prefers-reduced-motion`: canvases present and hidden, a photograph still visible.
- `facts` — every number on the page that does not appear in `sites/<slug>/copy/en.json`. A lead for your facts table, not a substitute for it.

It assumes the booking block has `id="book"` and drawers use `data-open-drawer` / `data-drawer`; a mockup built otherwise reads as 0 links or no drawer, so check the page before scoring that as a defect. It does not scroll, so a request made only after scrolling (the Rosa forecast) is not in `first_load`: capture that one yourself.

## `tools/check-design.mjs`

`node tools/check-design.mjs <slug | variant | path/to/page.html> [--no-shots]`. Fails on the house rules (dark ground, captions under photographs, padded picture boxes) and on a full-bleed image from a source under 1200 px. Its default-look lines (`look:` and `WARN default look`) never fail; report them to the human as facts (hard constraint 4).


## `tools/funnel.mjs` — taps to book on the built site (proposal 007)

`node tools/funnel.mjs <served site url> --depth 3 --out reports/<run-id>/funnel/<slug>-r<n>` in full mode. Compare `clicks_to_book` and `primary_action.class` with `dossier/<slug>/audit.json` `recommended.clicks_to_book` / `recommended.primary_action` (rubric 0.2.0 dimension 3 and hard fails). Action classes and the counting rule are in `agents/auditor/tools.md`.
