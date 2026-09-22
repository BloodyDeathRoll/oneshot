# designer / tools.md — what the agent may call, and how.

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

At 4e, per round of the look loop: `node tools/shoot.mjs sites/<slug>/mockups/<variant>/dist/index.html --out sites/<slug>/mockups/<variant>/shots/round-N`. At 4g, shoot `final/`'s built output and compare its sheets with the picked mockup's last round.

`tools/check-design.mjs` takes its own screenshots through this tool, into `shots/check-design/`.

## The Rosa forecast

Two halves (playbook §4, rule of 2026-09-21): the headline, drawn by the site from the per-spot JSON below, and Rosa's own widget beside it. Use only when `concepts.md` says this concept carries the forecast and gives the dossier-spot → Rosa-spot-id mapping.

### Rosa's widget — embedded as Rosa ships it

Read from the Rosa repo (`web/public/widget/index.html`, the `/rosa-widget` skill) and the live page on 2026-09-22.

```html
<iframe
  src="https://rosa.surf/widget/?spot=<spotId>&theme=<light|dark>&units=<metric|imperial>"
  title="Rosa surf forecast - <spot name>"
  width="100%"
  height="500"
  style="max-width:420px;border:0;border-radius:16px;display:block"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
></iframe>
```

- It is an iframe, not a script: a single static page that reads Rosa's data CDN itself and loads its own satellite tiles and Inter from Google Fonts inside the frame. Swipe changes the day; any click opens the spot on rosa.surf in a new window (hence `allow-popups`).
- `rosa.surf/widget/` sends `content-security-policy: frame-ancestors *` (checked on the live response), so any client domain may frame it.
- The card is at most 420 px wide and sizes its type to the card. Measured heights: 498 px at 420 wide, 453 at 360, 416 at 300 — reserve a 420 × 500 box and `height="500"` fits every width.
- Never restyle, crop, cover or recolour it. Choose `theme=light` or `theme=dark` to fit the page; units metric unless the design shows feet.
- Lazy: `loading="lazy"` alone is not enough to promise "never on first load" in every browser, so leave `src` empty (`data-src` on the element) and set it when the block nears the viewport; with JavaScript off, the reserved box shows the plain link instead.

### The headline — per-spot JSON

Read from the Rosa repo and the live endpoint on 2026-09-21. The site draws only the headline from it: `current.h` (wave height now), `current.t` (the time it is for), the first `current.swells[]` with `in_window` true (period and direction) and `current.wind` (speed and class). No day-by-day boxes: `days[]` and `hours[]` are the widget's job.

| | |
|---|---|
| URL | `https://rosa-data-opal.vercel.app/data/spots/<spotId>.json` — static JSON, no key, no query. `<spotId>` is Rosa's id, e.g. `kabalana`. The list of ids is `…/data/index.json`. |
| CORS | `access-control-allow-origin: *` on everything under `/data/` — a browser on any client domain may fetch it. Measured on the live response. |
| Cache | `cache-control: public, max-age=300, s-maxage=300` — five minutes, browser and CDN. |
| Freshness | Rosa republishes four times a day. `generated_at` (ISO, UTC) is when this file was built; show it, and treat the data as stale and fall back to the plain link when it is more than 24 h old. |
| Size | about 90 KB uncompressed for one spot (16 days, 3-hourly). One lazy request, after the block scrolls near (playbook §4). |
| Human page | `https://rosa.surf/spot/<spotId>` — the plain-link fallback and the target of the credit. |
| Credit | "Forecast for <spot.name> by Rosa", linked to the human page. Rosa's own data credits are in `attribution`; link to Rosa rather than reprinting them. |

Fields (all times are ISO-8601 with the spot's local offset unless noted; all directions are degrees the swell or wind comes **from**):

| Field | Meaning, unit |
|---|---|
| `spot.id` · `spot.name` · `spot.region` · `spot.town` · `spot.lat` · `spot.lon` · `spot.timezone` | the spot; `timezone` is an IANA name |
| `generated_at` · `fetched_at` | when the file was built / when Rosa fetched its inputs, UTC |
| `attribution` | Rosa's data-source credits, one string |
| `current` | the hour that is now: every `hours[]` field, plus `wetsuit` (text or null) and `why` {`size`, `period`, `wind`} — the three parts of the rating |
| `hours[]` | 3-hourly, about 16 days |
| `hours[].t` | the hour |
| `hours[].rating` · `bucket` | 0–100 · `FLAT` `POOR` `FAIR` `GOOD` `FIRING` |
| `hours[].h` · `h_mid` · `phrase` | surf height range `[low, high]` in **metres** · its middle · words ("chest-high") |
| `hours[].energy_kj` | wave energy, kJ per metre of crest |
| `hours[].wind` | {`kph` km/h, `dir` degrees from, `class` `offshore` `cross-shore` `onshore`} |
| `hours[].swells[]` | each {`h` m, `period` s (mean), `peak_period` s or null, `dir` degrees from, `kind` `swell` or `wind`, `in_window` whether the spot receives it, `spread` degrees} |
| `hours[].air` · `sst` · `pressure` · `tide` | °C · °C · mb · metres against mean sea level; any may be null (tide is null past about day 9) |
| `days[]` | {`date` YYYY-MM-DD, `rating_max`, `bucket`, `h_max` `[low, high]` m, `confidence` `high` `medium` `low`} |
| `events[]` (optional) | coming swells: {`start`, `peak`, `end`, `h_peak` m, `dir`, `rating`, `bucket`} |

Everything is metric; convert on the page if the design shows feet. Fields not listed here (`model_run`, `spectral_meta`, `confidence_meta`, `closure`, `spectral`, `tail_from`, `nearshore`) are Rosa's own provenance: do not show them.

**Fixture:** `agents/designer/fixtures/rosa-kabalana.json` is one real, unedited response for Kabalana (fetched 2026-09-21). At 4e inline the headline's values from it, so the site's half does not depend on the network; the widget is live at 4e too, loaded lazily. At 4g fetch the JSON live, under playbook §4's exception.
