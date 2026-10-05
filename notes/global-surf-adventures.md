# Global Surf Adventures (run 2026-09-globalsurf-02)

Last updated 2026-10-05 by shahar. Written from the ledger, activity log and git log.

## State
`packaged` (ledger 2026-10-05). Next is gate c, "human sends" — **not before the run leaves test mode**
(Shahar, 2026-10-05: "We are not sending ANYTHING until we are out of testing mode").

Path this session: `picked → built` (4g) → `optimised` (4h) → `ai_optimised` (4i) → `critiqued(1) → passed`
(station 5 round 1: critic 71.4/80 d1–7, visual 8, experience 8) → forecast fix (`passed → passed`) →
`previewed` → `packaged`.

## Where things are
- Site: `sites/global-surf-adventures/final/` (Astro, built from `src/tenant/content.json`; read `final/notes.md`).
- Preview (static, no CMS): https://global-surf-lodge-kabalana.os1.workers.dev — version dce19414.
- Pitch: `sites/global-surf-adventures/pitch/` — `index.html`, `message.en.whatsapp.md`, `message.en.email.md`,
  `notes.md`. English (the rule from 2026-10-05). The email has a `[LINK TO THE PROPOSAL PAGE]` placeholder;
  the proposal page is not published.
- Reports: `reports/2026-09-globalsurf-02/global-surf-adventures.{critic,visual,experience}-final.md`, `seo-report.md`, `aiseo-report.md`.
- Funnel: hero → booking page 1 tap, → Bookinglayer hand-off 8 taps (target ≤ 8).
- Forecast: retries (4 tries), widget independent of the JSON, no collapse; CLS 0 in every probe.

## Open decisions for Shahar
- Phone hero: build-made portrait crop of the one CMS hero video (mockup's phone edit lost the reef pan) — keep, or store the phone edit as a clip?
- Business name is not visible text (h1 "Your surf week starts here") — add it?
- Name/phone differ from Google ("Global Surf Lodge", +94770776747) vs site ("Global Surf Lodge Kabalana", +97299733943) — also an owner question on the pitch page.
- Schema gaps (`final/src/gaps/gaps.json`): room galleries/texts, level one-liners, inclusions, logo, socials — schema proposal?
- Pitch page offers three products (managed / self-hosted / files only); messages name two.
- PR #10 merge (review triggered on 0b9fc9e).

## After a sale only (workflow changed 2026-10-05)
Client picks the product (gate e, `product_chosen`) → station 8 Deliver. For `managed` that needs the shared CMS
upgraded first: the server runs `oneshot-cms` / `oneshot-publisher` 0.7.0 (no video); repo has the video
support (c16bf63). Then `node deploy/managed/deploy.mjs global-surf-adventures` (now ends with the `check`
step = `tools/site-check.mjs --full`). Known: the publisher doesn't run the site's `scripts/video-portrait.mjs`.

## Non-blocking fixes listed by the station-5 reviewers
360×640 "Choose this room" under the bar; nights picker below the fold on the Dates step; hero video keeps
playing off-screen; empty space in the closing section; hero title contrast 2.4:1 on one reef frame;
phone "Not free" notice out of view; Dates Next stays coral when invalid.
