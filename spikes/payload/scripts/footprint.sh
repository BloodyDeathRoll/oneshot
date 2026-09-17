#!/usr/bin/env bash
# Resource footprint of one of the spike's stacks: per-container RAM/CPU (3 idle samples, 5 s
# apart), peak memory since start (cgroup v2 memory.peak), image sizes, volume sizes.
#   ./scripts/footprint.sh <compose-file> <env-file>
set -euo pipefail
cd "$(dirname "$0")/.."
file="${1:?compose file}"; envf="${2:?env file}"
dc() { docker compose -f "$file" --env-file "$envf" "$@"; }
ids=$(dc ps -q)

echo "## idle samples (docker stats --no-stream), $(date -u +%FT%TZ)"
for i in 1 2 3; do
  # shellcheck disable=SC2086
  docker stats --no-stream --format '{{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}' $ids | sort
  echo "--"; sleep 5
done

echo "## peak memory since container start (cgroup memory.peak)"
for svc in $(dc ps --services); do
  peak=$(dc exec -T "$svc" cat /sys/fs/cgroup/memory.peak 2>/dev/null || echo 0)
  printf '%s\t%s MiB\n' "$svc" "$(( peak / 1048576 ))"
done

echo "## images"
for img in $(dc config --images | sort -u); do
  printf '%s\t%s\n' "$img" "$(docker image inspect -f '{{.Size}}' "$img" | awk '{printf "%.0f MB", $1/1000000}')"
done

echo "## volumes"
project=$(dc config --format json | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).name))')
docker system df -v | awk -v p="${project}_" '$1 ~ "^"p {print $1 "\t" $3}' || true
