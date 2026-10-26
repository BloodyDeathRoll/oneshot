#!/usr/bin/env bash
# tools/session-start.sh — SessionStart hook (.claude/settings.json); same steps as the /start skill.
# Fast-forwards main (never resets, stashes or forces), then prints git and team status.
# stdout goes into the new session's context.
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/..}" || exit 0
T=; command -v timeout >/dev/null && T="timeout 20"   # macOS has no GNU timeout
stale=; $T git fetch -q origin 2>/dev/null || { stale="(stale: fetch failed) "; echo "git fetch failed (offline?)"; }
branch=$(git branch --show-current)
if [ "$branch" = main ]; then
  if err=$(git merge -q --ff-only origin/main 2>&1); then
    echo "${stale}main at origin/main: $(git log --oneline -1)"
  else
    echo "${stale}main NOT fast-forwarded (ahead/behind origin/main: $(git rev-list --left-right --count main...origin/main | tr '\t' '/')): $(echo "$err" | head -1)"
  fi
elif [ -z "$branch" ]; then
  echo "${stale}detached HEAD at $(git log --oneline -1), $(git rev-list --count HEAD..origin/main 2>/dev/null) commits behind origin/main"
else
  echo "${stale}on branch $branch, $(git rev-list --count HEAD..origin/main 2>/dev/null) commits behind origin/main"
fi
changes=$(git status --short)
[ -n "$changes" ] && printf 'uncommitted:\n%s\n' "$changes"
node tools/team.mjs whoami 2>&1
node tools/run.mjs 2>&1 | sed 's/^\(run: \)\{0,1\}/run: /'
node tools/run.mjs list 2>&1 | awk -F'\t' '$3=="active"{print "  active: "$1" ("$2")"}'
node tools/team.mjs status 2>&1
# Handoffs (docs/handoff.md): answer requests on the dashboard; ship / take what is waiting for this
# machine in the background so the session is not held up (zip, R2, PR). The log says what happened.
node tools/handoff.mjs status 2>/dev/null | grep -E '^(waiting for your answer|to ship|to take)' | sed 's/^/handoff: /'
mkdir -p "$HOME/.oneshot" && (nohup node tools/handoff.mjs auto >"$HOME/.oneshot/handoff-auto.log" 2>&1 &)
exit 0
