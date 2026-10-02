#!/usr/bin/env bash
# tools/session-start.sh — SessionStart hook (.claude/settings.json); same steps as the /start skill.
# Fast-forwards main (never resets, stashes or forces), then prints git and team status.
# stdout goes into the new session's context.
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/..}" || exit 0
timeout 20 git fetch -q origin 2>/dev/null || echo "git fetch failed (offline?)"
branch=$(git branch --show-current)
if [ "$branch" = main ]; then
  git pull -q --ff-only 2>/dev/null && echo "main pulled: $(git log --oneline -1)" \
    || echo "main NOT pulled — local changes, or ahead/behind origin/main: $(git rev-list --left-right --count main...origin/main | tr '\t' '/'). Resolve by hand."
elif [ -z "$branch" ]; then
  echo "detached HEAD at $(git log --oneline -1), $(git rev-list --count HEAD..origin/main 2>/dev/null) commits behind origin/main"
else
  echo "on branch $branch, $(git rev-list --count HEAD..origin/main 2>/dev/null) commits behind origin/main"
fi
changes=$(git status --short)
[ -n "$changes" ] && printf 'uncommitted:\n%s\n' "$changes"
node tools/team.mjs whoami 2>&1
node tools/team.mjs status 2>&1
exit 0
