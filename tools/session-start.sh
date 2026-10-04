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
echo "run: $(node tools/run.mjs 2>&1)"
node tools/run.mjs list 2>&1 | awk -F'\t' '$3=="active"{print "  active: "$1" ("$2")"}'
node tools/team.mjs status 2>&1
exit 0
