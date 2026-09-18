#!/usr/bin/env bash
# Creates the Oneshot CMS server on the "shibumi" OCI Always Free tenancy (PLAN.md §1):
# VCN + internet gateway + public subnet (22/80/443 in) + one VM.Standard.A1.Flex instance, 2 OCPU / 12 GB, Ubuntu 24.04 ARM, 50 GB boot.
# Everything stays inside the Always Free limits. Idempotent: re-running reuses what exists (matched by display name).
# Usage: OCI_PROFILE=DEFAULT ./create-cms-instance.sh   (needs ~/.oci/config and ~/.ssh/oneshot_cms.pub)
set -euo pipefail
export SUPPRESS_LABEL_WARNING=True
P="--profile ${OCI_PROFILE:-DEFAULT}"
NAME="${NAME:-oneshot-cms}"
OCPUS="${OCPUS:-2}"; MEM_GB="${MEM_GB:-12}"; BOOT_GB="${BOOT_GB:-50}"
SSH_PUB="${SSH_PUB:-$HOME/.ssh/oneshot_cms.pub}"
IMAGE_ID="${IMAGE_ID:-ocid1.image.oc1.eu-frankfurt-1.aaaaaaaatnudwzlqzctpx5rrxohiionypan5fngceqdbybtw6ve7oyhmnnqq}"  # Canonical-Ubuntu-24.04-aarch64-2026.08.25-0

T=$(grep -A8 "^\[${OCI_PROFILE:-DEFAULT}\]" ~/.oci/config | grep '^tenancy' | cut -d= -f2)
C="$T"  # root compartment
log(){ printf '%s %s\n' "$(date -u +%H:%M:%S)" "$*" >&2; }
# This tenancy answers some calls with an intermittent 404 NotAuthorizedOrNotFound (seen 2026-09-18); retry those.
oci(){ local n=0; while :; do if out=$(command oci "$@" 2>/tmp/oci.err); then printf '%s' "$out"; return 0; fi; n=$((n+1)); grep -q NotAuthorizedOrNotFound /tmp/oci.err && [ $n -lt 5 ] && { log "retry $n: $*" | cut -c1-90; sleep 3; continue; }; cat /tmp/oci.err >&2; return 1; done; }

# --- network --------------------------------------------------------------------------------------
VCN=$(oci $P network vcn list --compartment-id "$C" --display-name "$NAME-vcn" --query 'data[0].id' --raw-output 2>/dev/null || true)
if [ -z "$VCN" ] || [ "$VCN" = "null" ]; then
  log "creating vcn"; VCN=$(oci $P network vcn create --compartment-id "$C" --cidr-block 10.0.0.0/16 --display-name "$NAME-vcn" --dns-label oneshot --wait-for-state AVAILABLE --query data.id --raw-output)
fi
IGW=$(oci $P network internet-gateway list --compartment-id "$C" --vcn-id "$VCN" --query 'data[0].id' --raw-output 2>/dev/null || true)
if [ -z "$IGW" ] || [ "$IGW" = "null" ]; then
  log "creating internet gateway"; IGW=$(oci $P network internet-gateway create --compartment-id "$C" --vcn-id "$VCN" --is-enabled true --display-name "$NAME-igw" --wait-for-state AVAILABLE --query data.id --raw-output)
fi
RT=$(oci $P network vcn get --vcn-id "$VCN" --query 'data."default-route-table-id"' --raw-output)
oci $P network route-table update --rt-id "$RT" --force --route-rules "[{\"destination\":\"0.0.0.0/0\",\"destinationType\":\"CIDR_BLOCK\",\"networkEntityId\":\"$IGW\"}]" >/dev/null
SL=$(oci $P network vcn get --vcn-id "$VCN" --query 'data."default-security-list-id"' --raw-output)
oci $P network security-list update --security-list-id "$SL" --force --ingress-security-rules '[
 {"protocol":"6","source":"0.0.0.0/0","tcpOptions":{"destinationPortRange":{"min":22,"max":22}}},
 {"protocol":"6","source":"0.0.0.0/0","tcpOptions":{"destinationPortRange":{"min":80,"max":80}}},
 {"protocol":"6","source":"0.0.0.0/0","tcpOptions":{"destinationPortRange":{"min":443,"max":443}}},
 {"protocol":"1","source":"0.0.0.0/0","icmpOptions":{"type":3,"code":4}}
]' --egress-security-rules '[{"protocol":"all","destination":"0.0.0.0/0"}]' >/dev/null
SUB=$(oci $P network subnet list --compartment-id "$C" --vcn-id "$VCN" --display-name "$NAME-public" --query 'data[0].id' --raw-output 2>/dev/null || true)
if [ -z "$SUB" ] || [ "$SUB" = "null" ]; then
  log "creating subnet"; SUB=$(oci $P network subnet create --compartment-id "$C" --vcn-id "$VCN" --cidr-block 10.0.0.0/24 --display-name "$NAME-public" --dns-label pub --route-table-id "$RT" --security-list-ids "[\"$SL\"]" --wait-for-state AVAILABLE --query data.id --raw-output)
fi

# --- instance (A1 capacity is per AD and often exhausted on the free tier: try every AD, then retry) ---
INST=$(oci $P compute instance list --compartment-id "$C" --display-name "$NAME" --lifecycle-state RUNNING --query 'data[0].id' --raw-output 2>/dev/null || true)
if [ -z "$INST" ] || [ "$INST" = "null" ]; then
  mapfile -t ADS < <(oci $P iam availability-domain list --compartment-id "$C" --query 'data[].name' --raw-output | tr -d '[]", ' | grep .)
  for attempt in $(seq 1 "${ATTEMPTS:-6}"); do
    for AD in "${ADS[@]}"; do
      log "launch attempt $attempt in $AD"
      if INST=$(oci $P compute instance launch --compartment-id "$C" --availability-domain "$AD" --shape VM.Standard.A1.Flex \
          --shape-config "{\"ocpus\":$OCPUS,\"memoryInGBs\":$MEM_GB}" --image-id "$IMAGE_ID" --subnet-id "$SUB" --assign-public-ip true \
          --display-name "$NAME" --hostname-label "$NAME" --boot-volume-size-in-gbs "$BOOT_GB" \
          --metadata "{\"ssh_authorized_keys\":\"$(cat "$SSH_PUB")\"}" --query data.id --raw-output 2>/tmp/oci-launch.err); then
        break 2
      fi
      grep -q -i 'capacity' /tmp/oci-launch.err && log "no A1 capacity in $AD" || { cat /tmp/oci-launch.err >&2; exit 1; }
    done
    sleep "${RETRY_S:-60}"
  done
  [ -n "${INST:-}" ] || { log "no A1 capacity in any AD after $attempt attempts"; exit 2; }
  log "waiting for RUNNING"
  until [ "$(oci $P compute instance get --instance-id "$INST" --query 'data."lifecycle-state"' --raw-output)" = RUNNING ]; do sleep 10; done
fi
IP=$(oci $P compute instance list-vnics --instance-id "$INST" --query 'data[0]."public-ip"' --raw-output)
log "instance $INST"
echo "$IP"
