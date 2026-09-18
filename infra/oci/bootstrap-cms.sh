#!/usr/bin/env bash
# First-boot setup of the Oneshot CMS box (Ubuntu 24.04 ARM64): Docker CE + Compose plugin, Node 24 (for the
# host-side spike scripts), unattended security updates, host firewall matching the VCN rules, repo clone.
# Run ON the box as ubuntu: bash bootstrap-cms.sh <git-url>
set -euo pipefail
REPO="${1:?git url}"
export DEBIAN_FRONTEND=noninteractive
sudo apt-get update -q
sudo apt-get install -y -q ca-certificates curl git ufw unattended-upgrades

# Docker CE (official repo, pinned to the distro channel) — https://docs.docker.com/engine/install/ubuntu/
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
sudo apt-get update -q
sudo apt-get install -y -q docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"

# Node 24 from NodeSource (host-side scripts only; the stack itself runs in containers)
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash - >/dev/null
sudo apt-get install -y -q nodejs

# Host firewall: Oracle's Ubuntu images ship iptables rules that block everything but 22; replace with ufw.
sudo iptables -F; sudo iptables -X; sudo netfilter-persistent save 2>/dev/null || true
sudo systemctl restart docker   # the flush above removed Docker's own NAT/FORWARD rules; restarting recreates them
sudo ufw --force reset >/dev/null
sudo ufw default deny incoming; sudo ufw default allow outgoing
sudo ufw allow 22/tcp; sudo ufw allow 80/tcp; sudo ufw allow 443/tcp
sudo ufw --force enable

sudo dpkg-reconfigure -f noninteractive unattended-upgrades

[ -d "$HOME/oneshot" ] || git clone -q "$REPO" "$HOME/oneshot"
echo "bootstrap done: $(docker --version) · $(node --version) · $(uname -m)"
