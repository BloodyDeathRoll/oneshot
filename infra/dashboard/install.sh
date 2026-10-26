#!/usr/bin/env bash
# infra/dashboard/install.sh — the online dashboard on the CMS box (infra/dashboard/README.md).
# Run on the box as ubuntu, from anywhere; idempotent. Needs `gh auth login` done once on the box.
#   bash install.sh            first install, or re-apply units and settings
set -euo pipefail
REPO_DIR="${REPO_DIR:-$HOME/oneshot/repo}"
ENV_FILE=/etc/oneshot/dashboard.env

command -v gh >/dev/null || {
  sudo mkdir -p -m 755 /etc/apt/keyrings
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg >/dev/null
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null
  sudo apt-get update -qq && sudo apt-get install -y -qq gh
}
gh auth status >/dev/null 2>&1 || { echo "gh is not logged in: run 'gh auth login' on the box (a token with Contents + Pull requests read/write on the oneshot repo), then run this again"; exit 1; }
gh auth setup-git

[ -d "$REPO_DIR/.git" ] || gh repo clone BloodyDeathRoll/oneshot "$REPO_DIR"
cd "$REPO_DIR"
git config user.name "Oneshot dashboard"      # fallback only: each PR commit carries the operator (dashboard/publish.mjs)
git config user.email "dashboard@oneshot.invalid"
git fetch -q origin

sudo mkdir -p /etc/oneshot
[ -f "$ENV_FILE" ] || sudo tee "$ENV_FILE" >/dev/null <<'ENV'
# The online dashboard (infra/dashboard/README.md). Fill ACCESS_TEAM and ACCESS_AUD from Cloudflare
# Zero Trust, then: sudo systemctl restart oneshot-dashboard
DASHBOARD_ADDRESS=dash.130-61-212-182.sslip.io
ACCESS_TEAM=
ACCESS_AUD=
DASH_REF=origin/main
# The Live strip (docs/heartbeat.md): the bearer key operators' sessions post heartbeats with.
# Generate once (openssl rand -hex 24) and put the same value in each laptop's ~/.oneshot/box.json.
ONESHOT_BOX_KEY=
ENV
sudo chmod 640 "$ENV_FILE"; sudo chown root:ubuntu "$ENV_FILE"
set -a; . "$ENV_FILE"; set +a
git -c advice.detachedHead=false checkout -q --detach "$DASH_REF"

npm ci --silent
npx playwright install --with-deps chromium >/dev/null   # thumbnails of the live previews (dashboard/thumbs.mjs)

NODE="$(command -v node)"
sudo tee /etc/systemd/system/oneshot-dashboard.service >/dev/null <<UNIT
[Unit]
Description=Oneshot dashboard (online, behind Cloudflare Access)
After=network-online.target
Wants=network-online.target
[Service]
User=ubuntu
WorkingDirectory=$REPO_DIR
EnvironmentFile=$ENV_FILE
ExecStart=$NODE dashboard/server.mjs --host 0.0.0.0 --port 8970 --allow-host \${DASHBOARD_ADDRESS} --access-team \${ACCESS_TEAM} --access-aud \${ACCESS_AUD}
Restart=always
RestartSec=10
[Install]
WantedBy=multi-user.target
UNIT
sudo tee /etc/systemd/system/oneshot-dashboard-sync.service >/dev/null <<UNIT
[Unit]
Description=Oneshot dashboard: follow origin/main
[Service]
Type=oneshot
User=ubuntu
WorkingDirectory=$REPO_DIR
EnvironmentFile=$ENV_FILE
ExecStart=$NODE infra/dashboard/sync.mjs
UNIT
sudo tee /etc/systemd/system/oneshot-dashboard-sync.timer >/dev/null <<UNIT
[Unit]
Description=Oneshot dashboard: follow origin/main every 2 minutes
[Timer]
OnBootSec=1min
OnUnitActiveSec=2min
[Install]
WantedBy=timers.target
UNIT
sudo systemctl daemon-reload
sudo systemctl enable --now oneshot-dashboard-sync.timer
# Caddy runs in docker: let the compose networks (172.16/12) reach the server; the internet still can't (ufw + OCI list: 22/80/443 only).
sudo ufw allow from 172.16.0.0/12 to any port 8970 proto tcp >/dev/null
if [ -n "${ACCESS_TEAM:-}" ] && [ -n "${ACCESS_AUD:-}" ]; then
  sudo systemctl enable oneshot-dashboard && sudo systemctl restart oneshot-dashboard
  echo "dashboard running"
else
  echo "installed; fill ACCESS_TEAM and ACCESS_AUD in $ENV_FILE, then: sudo systemctl enable --now oneshot-dashboard"
fi
