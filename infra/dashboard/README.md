# infra/dashboard — the dashboard online

Both operators open one address, log in with their e-mail, and see and decide exactly as on their own
machine. No laptop needs to be on.

```
phone / laptop ──> oneshot-dashboard.os1.workers.dev ──> dash.130-61-212-182.sslip.io ──> dashboard/server.mjs
                   Cloudflare Access: e-mail code         CMS box Caddy (HTTPS)              on the CMS box, port 8970
                   Worker forwards as is                  cms/caddy/Caddyfile                verifies the Access token
```

- **Login.** Cloudflare Access on the Worker's workers.dev address sends a one-time code to the e-mail.
  Only the two operators' e-mails are allowed (the Access policy). Access then signs the e-mail into
  every request. `dashboard/access.mjs` verifies that signature and maps the e-mail to an operator in
  `team.json` (`access_emails`, else `git_emails`). A request without a valid token is refused, also
  when someone goes to the box's address directly.
- **Who decided.** Read per request, so one server serves both operators. Every ledger and activity
  line carries the operator who clicked, and their PR commit is authored as them (`dashboard/publish.mjs`).
- **Shared truth stays `main`.** Each decision, save or handoff opens its own PR, as on a laptop. The box's
  checkout follows `origin/main` every 2 minutes (`sync.mjs`), and moves only once its own saves are on
  main, so nothing is lost while a PR waits. A change to the server's code restarts it.
- **Thumbnails** are shot on the box from the public previews (`dashboard/thumbs.mjs`) and served behind
  the login. Mockup sheets and other local media are not on the box (PLAN.md §1 Media), so those panels
  are empty online.

## Set up (once)

1. **Cloudflare Zero Trust** on the Oneshot account (shaharnaor@outlook.com): Zero Trust → pick a team name
   (free plan). Settings → Authentication: One-time PIN is on by default.
2. **The Worker:** `cd infra/dashboard/worker && CLOUDFLARE_API_TOKEN=$(cat ~/.oneshot/cf-token) npx wrangler deploy`.
3. **Access on it:** Workers & Pages → `oneshot-dashboard` → Settings → Domains & Routes → workers.dev →
   enable Cloudflare Access. Then Zero Trust → Access → Applications → that application → Policies:
   Allow, Emails = Shahar's and Alon's login e-mails. Copy the application's **Audience (AUD) tag**.
4. **The box** (`ssh -i ~/.ssh/oneshot_cms ubuntu@130.61.212.182`):
   - `gh auth login` with a fine-grained token: repo `oneshot`, Contents + Pull requests read/write.
   - Caddy: add `DASHBOARD_ADDRESS=dash.130-61-212-182.sslip.io` to `~/oneshot/cms/.env`, rsync `cms/`
     there, `docker compose up -d --build caddy`.
   - `bash infra/dashboard/install.sh` (from a copy of this folder, or the clone it makes), fill
     `ACCESS_TEAM` (the team name) and `ACCESS_AUD` in `/etc/oneshot/dashboard.env`, run it again.
5. Add each operator's login e-mail to `team.json` `access_emails` if it is not one of their `git_emails`.

## Run

- Logs: `journalctl -u oneshot-dashboard -f`, `journalctl -u oneshot-dashboard-sync`.
- Restart: `sudo systemctl restart oneshot-dashboard`.
- Off: `sudo systemctl disable --now oneshot-dashboard oneshot-dashboard-sync.timer`.
