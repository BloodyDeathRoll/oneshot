# Handoff: passing a business between operators

Decided 2026-10-26 (Shahar). The old way — an assignment line, a notes rewrite, a zip sent by hand,
three PRs and a rule nobody had written down — is replaced by one request and one answer. Everything
else happens on the two machines, unattended.

## The flow

```
Alon's dashboard          Shahar's dashboard            Shahar's machine            Alon's machine
"Ask for handoff" ──────▶ "Alon asks for XYZ.            session-start hook:         session-start hook:
  why: "…"                 Approve / Reject" ── approve ─▶ zip the media → R2  ───▶  download → unpack →
                                                           + notes block → PR        store → delete R2 copy
                                                                                     → owner = Alon → PR
```

| Step | Who | Line in `activity.jsonl` (`kind: "handoff"`) | What it does |
|---|---|---|---|
| **requested** | the operator who wants the business, on the dashboard (or `node tools/handoff.mjs request <slug> "<why>"`) | `{step: "requested", id, slug, from: <owner>, to: <requester>, note}` | Shows on the owner's dashboard as a decision: *"Alon asks for XYZ. Approve / Reject"*. |
| **approved** / **rejected** | the owner, on the dashboard (or `approve <id>` / `reject <id> "<why>"`) | `{step: "approved" \| "rejected", id, note}` | Rejected ends it. Approved puts it in the owner's machine's queue. |
| **shipped** | the owner's machine, unattended (`tools/handoff.mjs auto`, run by the session-start hook; or `ship`) | `{step: "shipped", id, key, bytes, sha256, files}` | Zips every media file of the business present on that machine, uploads it to R2 as `<slug>/<id>.zip`, appends a handoff block to `notes/<slug>.md`, opens a PR. |
| **received** | the receiver's machine, unattended (same hook; or `take`) | `{step: "received", id, note}` | Downloads the zip, checks its sha256, unpacks into the checkout and the local store, **deletes the R2 copy**, opens a PR. From this line the receiver owns the business. |

Each line is appended locally the moment it happens, so the local dashboard shows it at once, and
goes to `main` as its own PR (dashboard/publish.mjs), like a gate decision. The human still merges
(CLAUDE.md rule 5). `handoff` lines are the only activity lines a machine writes on its own.

Nothing is sent to anyone by hand. There is no assignment to open or close. `tools/team.mjs assign`
stays for other work ("tune the booking steps"), not for handing a business over.

## Owner

A business belongs to one operator: the receiver of its last `received` handoff, else the operator of
the run it was last written under (`runs/<run_id>.yaml`). The dashboard shows the owner on every row
and sends the owner the request. The owner's sessions may advance the business in its run, whoever's
run file it is (`ONESHOT_RUN=<run_id>` when it is not their own active run); the run file itself is
never edited by a handoff.

## What ships

Every file listed in `media/<slug>.tsv` that exists on the shipping machine — not only the `local`
ones — so the receiver's checkout is complete at once, without waiting on recipes, downloads or video
fetches. `take` then runs `node tools/media.mjs save <slug>` (into the receiver's store) and reports
anything the manifest lists that is still missing (`node tools/media.mjs restore <slug>` fixes that).
A business with no media ships an empty zip; the flow is the same.

## R2: the parking lot, and the free tier

One bucket, `oneshot-handoff`, on the Oneshot Cloudflare account. The zip exists there only between
`shipped` and `received`, usually hours. Guards, so a loop or a forgotten handoff can never cost money
(free tier: 10 GB-month stored, 1M writes, 10M reads per month, egress free):

- `take` deletes the object as soon as it is unpacked and verified;
- a bucket lifecycle rule (set by `ship`, idempotent) expires any object older than 7 days;
- `ship` refuses when the bucket already holds more than 2 GB (`tools/r2.mjs` `MAX_BUCKET_BYTES`).

The whole local store today is about 1.2 GB; the largest business 400 MB; one handoff parked for a
day is about 0.013 GB-month.

### R2 setup (once, Shahar, Cloudflare dashboard)

1. Oneshot account → **R2 Object Storage** → enable it (the account already has a pay-as-you-go card;
   the free quotas above apply regardless).
2. **Create bucket** `oneshot-handoff`, location automatic, Standard storage.
3. **Manage R2 API tokens** → Create API token: permission *Object Read & Write*, scoped to the
   `oneshot-handoff` bucket, TTL forever. Copy the Access Key ID and Secret Access Key.
4. On **both** laptops, write `~/.oneshot/r2.json` (never in git):

   ```json
   { "account_id": "e42421b29f42b84081a1e9be362397eb", "bucket": "oneshot-handoff",
     "access_key_id": "<Access Key ID>", "secret_access_key": "<Secret Access Key>" }
   ```

5. `node tools/handoff.mjs check-r2` prints the bucket's object count and size when the credentials work.

Until the file exists, `auto` prints one line saying a handoff is waiting and does nothing else.

## Where things show

- **Dashboard, Overview → "Also waiting on you"** and **Needs you**: the owner's *Approve / Reject*
  for a request; the requester sees *waiting for <owner>*; after approval both see *shipping from
  <owner>'s machine* then *ready for <receiver>'s next session*, then *done*.
- **Every business row**: the owner (*by Shahar*) and, for a business that is not yours, *Ask for
  handoff*.
- `node tools/handoff.mjs status`: every handoff and what this machine still has to do.
- `notes/<slug>.md`: the handoff block `ship` adds — state, run, preview, next gate, who owns it now.

## Failure modes

- The owner's machine has no R2 credentials: `auto` says so at session start; `ship` stops. Nothing
  is lost; the handoff stays `approved`.
- The download's sha256 differs from the shipped line: `take` stops, keeps the R2 copy, prints why.
- The PR cannot be opened (offline, `gh` not logged in): the local line stands and the message says
  so; the next `ship`/`take` run does not redo the work (the line is already there), and the PR can
  be opened by hand from the local `activity.jsonl` diff.
- A handoff nobody takes: the lifecycle rule removes the zip after 7 days; the line stays `shipped`
  and `take` reports the missing object. Approve again to re-ship.
