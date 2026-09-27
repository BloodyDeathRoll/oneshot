# Price sheet — DRAFT for Shahar, 2026-09-27

Every number below is a first guess by Claude, to be corrected by Shahar. Nothing here is in any
pitch yet: the three drafts under `sites/*/pitch/` say "monthly fee" and "one-time fee" with no
amount (PLAN.md §9 open question). Once decided, the numbers go into the writer's `custom.md`
via a proposal, and the pitch drafts are regenerated.

Currency: USD. Ahangama businesses may prefer LKR; see Decisions.

## 1. What a client pays

| Offer | One-time | Recurring | What it buys |
|---|---|---|---|
| **Managed** (default, PLAN.md §1) | 190 setup | 29 / month, or 290 / year (2 months free) | We host it, they edit it: Cloudflare Worker, SSL, CMS login scoped to their tenant, nightly backups (30-day retention), rebuild on every save, uptime and updates ours. Up to 30 min of our edits a month. Static zip on exit, no lock-in |
| **Self-hosted Docker** | 590 site + 90 install | 0 to us; ~6–12 / month to their VPS host | Single-tenant Payload + Postgres + builder + Caddy on their box; we install, verify, hand over sealed credentials, revoke our access. After handoff: support at 40 / hour |
| **Static only** | 390 | 0 | Static build + source zip, runs on any host. Only if the owner says they will never edit |
| **Domain** (Cloudflare Registrar, billed through) | — | 15 / year flat | Registrar charges us at cost (~10–11 / year for `.com`; the exact figure shows at checkout). Flat 15 covers renewal handling and DNS. **`.lk` is not on Cloudflare Registrar** — needs a local registrar and its own price; check before pitching a `.lk` |

## 2. Upsells (after the site is live)

Everything here is content, domain or a service. Nothing needs a second renderer or CMS
(CLAUDE.md architecture rule).

| Upsell | Price | Note |
|---|---|---|
| Second language | 120 per language | Full copy pipeline in that language (`run.yaml` `languages`), reviewed the same way as English |
| Email on their domain | included with Managed (Cloudflare Email Routing forwards to their Gmail); a real mailbox is pass-through | |
| Google Business Profile tune-up | 60 | Hours, categories, photos, link to the new site, reply templates |
| Review QR cards | 40 | Print-ready PDF that opens their Google review form |
| Photo shoot | 150 half-day | `live` mode only (we are on site) |
| "We do the edits" | +15 / month | Up to 4 content changes a month, same-day |
| SEO + AI-SEO refresh | 60 per quarter, or 200 / year | Re-run stations 4h–4i on the live content, report included |
| Seasonal / campaign page | 80 | One extra page on the same template, e.g. season opening, retreat week |
| Rosa surf forecast widget | included | Already in the template |

## 3. What it costs us (per client, per month)

| Line | Cost | Source |
|---|---|---|
| Hosting (Cloudflare Workers, static assets) | 0 on the free plan | Verify the free-plan request limit against real traffic before promising it |
| CMS server (OCI A1, shared by every tenant) | 0 while inside the Always Free quota; PAYG above it | `infra/oci/README.md` |
| Domain | ~10–11 / year, recharged at 15 | Cloudflare Registrar at cost |
| Build tokens | 2 M-token budget per business ≈ 16 (Opus 5) to 32 (Fable 5.1) at API list rates, assuming ~85 % input; real runs went over budget with the copy and critic rounds | `run.yaml` `budget`; **not tracked** — `docs/expenses.md`. If we run on a Claude subscription this is a flat monthly cost, not per client |
| Our time | the real cost; ~20–40 h per site so far on this run | not tracked |

So at 29 / month the marginal cost per client is close to zero and the price is for the time,
the pipeline and the promise to keep it alive. The setup fee is what covers the build tokens
and the rounds.

## 4. Terms (proposed)

- Month-to-month, cancel any time; on exit they get the static zip and the domain transfer for free.
- Setup fee paid before we attach the domain; monthly by card or bank transfer, in advance.
- Managed price is fixed for 12 months from signing.
- Pass-through charges (domain, mailbox) are itemised at cost + the flat handling above.

## 5. Decisions for Shahar

1. The numbers in §1 and §2 — keep, raise, lower?
2. USD or LKR for the monthly fee? (LKR moves; USD is simpler for us, LKR for them.)
3. How they pay us: Stripe, Wise, bank transfer, cash on site?
4. Setup fee at all, or 0 setup + higher monthly (e.g. 0 + 39)?
5. Do we pitch the self-hosted and static prices in the first message, or only when asked?
6. `.lk` domains: offer them at all in this run?
