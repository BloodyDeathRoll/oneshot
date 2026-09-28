# 007 — Funnel audit: measure what the old presence costs the owner, build the new site to a funnel

Filed 2026-09-28 on Shahar's instruction ("I want to be able to analyze their funnel and suggest an
optimal one … any advice that might increase the business' bottom line … is something we are
interested in, as value to the customer" → "Sounds good. Write it"). Nothing moves until this file
is approved (gate d). Everything new lives under `proposals/2026-09-ahangama-02/007/` and is applied
by §6.

## 1. What is missing today

The scout scores presence 0–5 and notes "no booking path". The harvester records the booking path
and takes two screenshots of the old site. The writer promises "what was fixed" and can only point
at the playbook. Nobody measures the path a traveller on a phone takes from the old presence to a
booking, so the pitch cannot say "today it takes four taps and lands on a form; the new site is one
tap to your WhatsApp", with a screenshot. That sentence is the value Shahar asked for, and it is
verifiable — unlike "more bookings".

Measured today with the new tool on three run-02 candidates (`007/agents/auditor/references.md`):

| Site | Taps to book | What a visitor meets |
|---|---|---|
| mellowhostel.com | 1 | "Book Now" opens Cloudbeds with check-in **2024-04-21** prefilled; a nav link 404s; the Booking.com link is labelled "REVIEWS" |
| tharangasurfingvilla.hotelonia.com | 2 | "BOOK NOW" leaves the site for Booking.com; 346 characters of text on the page |
| surfing-villa.com | none | the only action is a `mailto:`; no phone, no WhatsApp, no engine |

## 2. Design: a cheap probe at Scout, a real audit after Harvest, one new agent

**Scout (station 2)** gains one measurement, not analysis. When `existing_site.status` is 200 the
scout runs `tools/funnel.mjs --depth 1` and records `existing_site.funnel = { clicks_to_book,
primary_action, cta_above_fold }`. The presence scale is unchanged (not re-litigated); the reason
line cites the number, and two new `criteria` tags exist: `clicks_to_book_gt_2`,
`no_cta_above_fold`. The scout runs on tens of candidates: one tool call per live site, no prose.

**Audit (new station 3b, `harvested → audited`)**, one new agent, the **auditor**. Per business,
after the dossier exists and before copy is written:

- runs `tools/funnel.mjs --depth 3` on the old site and walks the path by hand once (site, Google
  listing, top OTA page → the moment a booking would be sent);
- writes `dossier/<slug>/audit.json` (`schemas/audit.md`) + `audit.md` + `funnel/`: findings with
  severity and evidence (URL, screenshot, click path), each written as what a visitor meets;
- writes the **recommended funnel in site-schema terms only**: primary action (= the dossier's
  booking path), its label, what sits above the fold in the type's order, offer framing, the
  closing line, off-site advice (Google listing, OTA, Instagram bio);
- a business with **no site** is still audited (`scope: no_site`): what it pays for having no direct
  channel, with commission named only from a sourced page.

Why one agent and not "sales + marketing + PM": the examples given are all conversion problems and
need one voice with a rubric, like the critic. Two opinion agents would overlap most of the way and
have no source of truth between them. Marketing's traffic side already exists (seo, aiseo,
harvester's Google/OTA/socials facts); the auditor carries an off-site section instead of a second
agent. The orchestrator is the project manager.

**Consumers**, which is where the audit turns into money for the owner:

| Agent | Reads | Does |
|---|---|---|
| creative-director (4d) | `audit.json.recommended` | the above-fold order and primary action are constraints on every concept; `concepts.md` names them |
| copywriter (4a) | `recommended.primary_label`, `offer_framing`, `closing`, findings with `area: offer\|cta` | CTA wording and how prices/packages are framed. The audit is **not a fact source**: no finding becomes site copy |
| critic (5, full) | `recommended.clicks_to_book`, `primary_action` | runs `tools/funnel.mjs` on the built site; a miss on either is dimension 3 evidence and a hard fail when the primary action class differs |
| writer (7) | `audit.md`, findings with `pitch_point: true` | "what was fixed" = before/after: old taps + screenshot vs new taps; off-site advice as a short "also worth doing" list |

Hard rules carried by the auditor's `base.md`: measure before judging; evidence per finding or the
finding is deleted; no money or conversion numbers anywhere; recommend only what
`schemas/site-content.md` holds; primary action = `dossier.booking.path`; never touch the ledger,
`dossier.json` or `sites/`.

## 3. The tool — `tools/funnel.mjs` (`007/tools/funnel.mjs`, tested)

Mobile viewport (390×844), breadth-first crawl of same-site links to `--depth` taps / `--pages`
pages. Per page: every visible link/button/form classified as `whatsapp` · `tel` · `engine` ·
`dated_form` (terminal) · `book_link` · `contact_link` · `form` · `email` · `review_link` · `offsite`,
with label, position, above-fold flag, tap-target size. `clicks_to_book` = taps to the first
terminal action. A page that redirects off-site is recorded as a hand-off, not inventoried.
White-label engine sites (hotelonia, cloudbeds) are detected so their own navigation is not
counted as "engine". Review links on OTA domains are not booking actions. Never submits, never logs
in. Output: `funnel.json`, `landing-mobile.png`, `landing-fold.png`. Shared by scout (depth 1),
auditor (depth 3) and critic (the built site). Playwright is already a root devDependency.

Known limits, to fix when met: no throttling (speed is the critic's `audit-mockup.mjs` job);
"book" vocabulary is English/German/Spanish/French/Italian/Swedish/Russian — extend per run;
a CTA rendered only inside a canvas or an image is invisible to it (then the auditor's hand walk
catches it).

## 4. Diffs to apply on approval

| File | Change |
|---|---|
| `PLAN.md` §4 | new row **3b Audit** — agent auditor; input: dossier, old site, `candidates.json` entry; output: `dossier/<slug>/audit.json` + `audit.md` + `funnel/` (`schemas/audit.md`); gate: —. Station 2 output gains `existing_site.funnel`. Station 5 evidence gains "funnel.json of the built site vs `audit.json.recommended`". Station 7 input gains `audit.md`. |
| `PLAN.md` §4 ledger states, `docs/ledger.md` | `harvested → audited → copy_drafted`; `agent` enum gains `auditor`; note: "`audited` is written when `dossier/<slug>/audit.json` exists; `scope: no_site` is still `audited`." |
| `PLAN.md` §5 | new **auditor** section (role, measure-first, evidence, no money numbers, schema-only recommendations, evals). Scout bullet: the funnel probe. |
| `PLAN.md` §2 | `schemas/audit.md` in the layout; `auditor/` in `agents/`. |
| `schemas/candidates.md` | `existing_site.funnel: { clicks_to_book, primary_action, cta_above_fold, measured_at }` (null when no live site); criteria tags `clicks_to_book_gt_2`, `no_cta_above_fold`. |
| `schemas/audit.md` | new — `007/schemas/audit.md`. |
| `schemas/dossier.md` | one line: "`dossier/<slug>/audit.json` (schemas/audit.md) sits beside the dossier; it is the auditor's, not the harvester's, and is not a fact source." |
| `agents/auditor/` | new — `007/agents/auditor/{base,tools,evals,references,CHANGELOG}.md`. **`custom.md` is Shahar's:** created empty (header line only) on merge, or with the taste rules he wants; nothing here proposes its content. |
| `agents/wiring.json` | `auditor` → shared `schemas/site-content.md`, `schemas/business-types.md`, `schemas/audit.md`; station `["3b"]`. |
| `agents/scout/base.md` → 0.3.0 | hard constraint 3 gains: "When the site loads, run `tools/funnel.mjs <url> --depth 1 --out reports/<run-id>/funnel/<slug>` and copy `clicks_to_book`, `primary_action.class`, `cta_above_fold` into `existing_site.funnel`; cite them in `reason`." `tools.md` documents the call. |
| `agents/creative-director/base.md` → 0.2.4 | input `dossier/<slug>/audit.json`; hard constraint: every concept places `recommended.above_fold` in order and `recommended.primary_action` as the primary action; `concepts.md` states the target taps. |
| `agents/copywriter/base.md` → 0.3.2 | input `audit.json` (`recommended.primary_label`, `offer_framing`, `closing`, `offer`/`cta` findings); rule: the audit is not a fact source. `agents/copyeditor/base.md` → 0.3.1: a sentence sourced to the audit is `unsourced`. |
| `agents/critic/base.md` → 0.3.3, `rubric.md` → 0.2.0 | dimension 3 evidence gains "`tools/funnel.mjs` on the built site: `clicks_to_book` ≤ `audit.json.recommended.clicks_to_book`, primary action class equal"; hard fail: primary action class differs from the recommendation. Weights unchanged. |
| `agents/writer/base.md` → 0.2.1 | input `dossier/<slug>/audit.md`; "what was fixed" leads with before/after taps and the `pitch_point` screenshots; off-site advice as a short list; constraint 4 (no shaming) now cites the audit's visitor-experience wording. |
| `agents/orchestrator/base.md` → 0.2.2 | station 3b in the order; existence check for `audited` = `audit.json` validates. |
| `run.yaml` | `agents.auditor: 0.1.0`; bumps above. |
| `dashboard/data.mjs`, `DATA.md` | `audited` in the state list; station row "Harvest" → `['harvested', 'audited']`; agent list gains `auditor`. Without this the dashboard will show an `audited` business as an unknown state. |
| `tools/funnel.mjs` | new — `007/tools/funnel.mjs`; documented in scout, auditor and critic `tools.md`. |
| `tools/check-wiring.mjs` | nothing: it reads the agent list and PLAN.md §4 station ids; `3b` must be in the table before it passes. |

Not touched: any `custom.md`, `ledger.jsonl`, `schemas/site-content.md` (the audit adds no field),
the templates, the CMS. Hosting modes are unaffected.

## 5. Cost and risk

- One extra station per business: one tool run (~1–2 min) and one agent pass, budgeted at
  ≤ 10 % of `tokens_per_business` (auditor `evals.md`). Scout: one tool call per live site.
- Risk 1: findings that do not reproduce → the owner disproves the pitch. Mitigation: evidence
  per finding is a hard constraint and Shahar spot-checks 3 per business (eval).
- Risk 2: the audit drifts into taste ("the hero should be…"). Mitigation: recommendations are
  schema fields and playbook §2 order only; taste stays with the creative director and `custom.md`.
- Risk 3: the three parked run-02 sites have **no old site** (Lavish, KA, Layday are OTA-only), so
  the first real audits are `scope: no_site`; the `site` scope gets exercised on the next run's
  shortlist. The tool is tested on three live run-02 candidates (§1) meanwhile.

## 6. Decision needed

Approve 007? If yes, the apply order is: tool + schema → auditor folder (+ your empty `custom.md`)
→ wiring + PLAN.md + ledger doc → scout/CD/copywriter/copyeditor/critic/rubric/writer/orchestrator
bumps → dashboard → `node tools/check-wiring.mjs` → run the auditor once on `the-lavish-haven`
(`no_site`) and once on a live-site candidate from the next shortlist, then Shahar's spot-check.
One commit per step. Option: approve the tool + schema + auditor now and the downstream bumps after
the first two audits are read, if you would rather see one before wiring the consumers.
