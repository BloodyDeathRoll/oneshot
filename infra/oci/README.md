# infra/oci — the Oneshot CMS server on Oracle Cloud

**Tenancy:** "shibumi" (second OCI account, home region eu-frankfurt-1), Pay As You Go since 2026-09-18 with the quota policy `oneshot-free-tier-cap` (A1 ≤ 2 OCPU / 12 GB, block storage ≤ 200 GB, x86 flex shapes zeroed) so it cannot bill beyond the Always Free allowance.

**Instance:** `oneshot-cms` — VM.Standard.A1.Flex, 2 OCPU / 12 GB, Ubuntu 24.04 aarch64, 50 GB boot, AD-3, public IP `130.61.212.182`. Landed 2026-09-18 19:39 UTC on launch attempt 29 (`create-cms-instance.sh`). SSH: `ssh -i ~/.ssh/oneshot_cms ubuntu@130.61.212.182` (key generated locally, never committed).

**Network:** VCN `oneshot-cms-vcn` 10.0.0.0/16, public subnet `oneshot-cms-public` 10.0.0.0/24, internet gateway; security list + host ufw allow 22/80/443 in only.

**On the box** (`bootstrap-cms.sh`): Docker CE 29 + Compose, Node 24, ufw, unattended security upgrades. The spike source is at `~/oneshot/payload` (copied with rsync; the repo is private so `git clone` needs a token — not set up).

**Proven on this box (2026-09-18):** `spikes/payload` multi-tenant suite 27/27 (+2 skipped: no headless browser), self-hosted suite 13/13 (+1 skipped). Save → built + dry-run 5.6 s; save → live via Caddy 3.6 s; idle ≈ 170 MB. Both stacks were brought down afterwards; nothing is running on the box.

**Not yet on the box:** the production CMS stack itself (`cms/`, `deploy/managed/`), HTTPS/reverse proxy, backups to object storage, the Cloudflare API token, monitoring — see PLAN.md §6 and `spikes/payload/README.md` "Production would need".

**Scripts:** `create-cms-instance.sh` (idempotent create/re-find of network + instance, retries all ADs on "out of capacity"), `bootstrap-cms.sh` (first-boot setup, run on the box).
