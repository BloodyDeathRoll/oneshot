# Shared by setup/run/teardown. Sourced, not executed.
set -euo pipefail
WS="${SUPERSET_WORKSPACE_PATH:-$(git rev-parse --show-toplevel)}"
ROOT="${SUPERSET_ROOT_PATH:?SUPERSET_ROOT_PATH not set}"
SPIKE="$WS/spikes/payload"
# One reserved CMS port per workspace, recorded outside any worktree so all workspaces see it.
PORTS_FILE="${XDG_STATE_HOME:-$HOME/.local/state}/oneshot-superset/ports"
# Isolates containers + volumes per workspace (overrides `name:` in the compose file).
COMPOSE_NAME="oneshot-$(basename "$WS" | tr -c 'a-z0-9\n' '-')"
