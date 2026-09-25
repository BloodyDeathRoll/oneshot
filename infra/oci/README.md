# infra/oci — the Oneshot CMS server on Oracle Cloud

**Tenancy:** "shibumi" (second OCI account, home region eu-frankfurt-1), Pay As You Go since 2026-09-18 with the quota policy `oneshot-free-tier-cap` (A1 ≤ 2 OCPU / 12 GB, block storage ≤ 200 GB, x86 flex shapes zeroed) so it cannot bill beyond the Always Free allowance.

**Instance:** `oneshot-cms` — VM.Standard.A1.Flex, 2 OCPU / 12 GB, Ubuntu 24.04 aarch64, 50 GB boot, AD-3, public IP `130.61.212.182`. Landed 2026-09-18 19:39 UTC on launch attempt 29 (`create-cms-instance.sh`). SSH: `ssh -i ~/.ssh/oneshot_cms ubuntu@130.61.212.182` (key generated locally, never committed).

**Network:** VCN `oneshot-cms-vcn` 10.0.0.0/16, public subnet `oneshot-cms-public` 10.0.0.0/24, internet gateway; security list + host ufw allow 22/80/443 in only.

**On the box** (`bootstrap-cms.sh`): Docker CE 29 + Compose, Node 24, ufw, unattended security upgrades. The spike source is at `~/oneshot/payload` (copied with rsync; the repo is private so `git clone` needs a token — not set up).

**Proven on this box (2026-09-18):** `spikes/payload` multi-tenant suite 27/27 (+2 skipped: no headless browser), self-hosted suite 13/13 (+1 skipped). Save → built + dry-run 5.6 s; save → live via Caddy 3.6 s; idle ≈ 170 MB. Both spike stacks were brought down afterwards (their code is still at `~/oneshot/payload`, unused).

**Production CMS stack (since 2026-09-25):** `cms/docker-compose.yml` runs from `~/oneshot/cms` (rsynced from the repo; `.env` exists only on the box, mode 600, made by `cms/scripts/init-env.sh`). Site templates are synced to `~/oneshot/sites/<tenant-slug>/` by `deploy/managed/deploy.mjs`.
- Admin: `https://130-61-212-182.sslip.io/admin` — sslip.io resolves to the box's IP, so Caddy gets a real Let's Encrypt certificate without a domain of ours. Only Caddy is published (80 → 308 → 443); Postgres, Payload and the publisher are internal. Per-IP rate limit on login/reset (10/min, then 429).
- Publisher: `DEPLOY_MODE=live`, scoped Cloudflare API token (`oneshot-cms-publisher`: Account · Workers Scripts · Edit, one account) in `.env` only.
- Tenants: `ka-surf-hostel-and-restaurant`, `layday-surf-ahangama`, `the-lavish-haven` (run 2026-09-ahangama-02, test owners `owner+<slug>@oneshot.test`).
- Backups: `cms/scripts/backup.sh` nightly at 02:30 UTC (ubuntu's crontab), `pg_dump` + media → `~/oneshot/cms/backups/` (newest 14 kept) and off the box to Object Storage bucket `oneshot-cms-backups` through a write-only pre-authenticated request (`BACKUP_PAR_URL`, expires 2027-09-25). The bucket's lifecycle rule `expire-backups-30d` deletes objects after 30 days (IAM policy `oneshot-objectstorage-lifecycle` lets Object Storage in Frankfurt do that). Restore drill passed 2026-09-25 (`cms/scripts/restore.sh`, 20 s).

**Not yet:** monitoring/alerts on failed publishes, an e-mail adapter (password resets print to the CMS log), a hostname of our own for the admin, images from a registry instead of built on the box.

**Scripts:** `create-cms-instance.sh` (idempotent create/re-find of network + instance, retries all ADs on "out of capacity"), `bootstrap-cms.sh` (first-boot setup, run on the box).
