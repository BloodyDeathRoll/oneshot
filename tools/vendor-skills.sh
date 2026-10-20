#!/usr/bin/env bash
# tools/vendor-skills.sh — vendor the third-party design skills into .claude/skills/ (and .claude/agents/).
#
# These are the design-craft skills the designer, creative director and visual critics invoke
# (agents/<agent>/tools.md "Design skills"). They are copied into the repo, pinned to a commit, so
# both operators and every spawned agent get the same version without a network install. Re-run to
# refresh: bump a PIN below, run, review the diff, commit.
#
#   bash tools/vendor-skills.sh            # copy at the pinned commits
#   bash tools/vendor-skills.sh --check    # exit 1 if .claude/skills/ differs from the pins
#
# Source → destination (install names are the SKILL.md frontmatter `name`):
#   emilkowalski/skills                  skills/<n>/                       → .claude/skills/<n>/   (web skills only, see EMIL_SKILLS)
#   Leonxlnx/taste-skill                 skills/taste-skill/               → .claude/skills/design-taste-frontend/
#   pbakaus/impeccable                   .claude/skills/impeccable/        → .claude/skills/impeccable/
#                                        .claude/agents/impeccable-*.md    → .claude/agents/
#   kylezantos/design-motion-principles  skills/design-motion-principles/  → .claude/skills/design-motion-principles/
#
# Not vendored: Emil's animate-expo, write-swift, ask-sonner, pick-ui-library, prototype (React Native,
# Swift, React libraries — the sites are static Astro); impeccable's edit hooks (.claude/settings.json
# upstream: they run a downloaded binary on every Edit/Write; here the skill is invoked explicitly).
# Licences: MIT (emilkowalski, Leonxlnx, kylezantos), Apache 2.0 (impeccable); each LICENSE is copied, impeccable's NOTICE.md too.
set -euo pipefail
cd "$(dirname "$0")/.."

declare -A PIN=(
  [skills]=2d22863
  [taste-skill]=63aba5f
  [impeccable]=374a0e1
  [design-motion-principles]=4a9ca87
)
declare -A REPO=(
  [skills]=https://github.com/emilkowalski/skills
  [taste-skill]=https://github.com/Leonxlnx/taste-skill
  [impeccable]=https://github.com/pbakaus/impeccable
  [design-motion-principles]=https://github.com/kylezantos/design-motion-principles
)
EMIL_SKILLS=(animate review-animations animation-performance find-animation-opportunities improve-animations
             emil-design-eng apple-design mobile-native break-ui animation-vocabulary)

check=0; [[ "${1:-}" == --check ]] && check=1
work=$(mktemp -d); trap 'rm -rf "$work"' EXIT
dest="$work/out"; mkdir -p "$dest/skills" "$dest/agents"

fetch() { # name → checkout at pin into $work/<name>
  local n=$1 d="$work/$1"
  git init -q "$d"
  git -C "$d" remote add origin "${REPO[$n]}"
  git -C "$d" fetch -q --depth 1 origin "${PIN[$n]}" 2>/dev/null || git -C "$d" fetch -q origin
  git -C "$d" checkout -q "${PIN[$n]}"
}
for n in "${!PIN[@]}"; do fetch "$n"; done

# emilkowalski/skills — the web skills
for s in "${EMIL_SKILLS[@]}"; do
  cp -r "$work/skills/skills/$s" "$dest/skills/$s"
  cp "$work/skills/LICENSE" "$dest/skills/$s/LICENSE"
done
# taste-skill
cp -r "$work/taste-skill/skills/taste-skill" "$dest/skills/design-taste-frontend"
cp "$work/taste-skill/LICENSE" "$dest/skills/design-taste-frontend/LICENSE"
# impeccable — the Claude-built skill folder and its sub-agents, no hooks
cp -r "$work/impeccable/.claude/skills/impeccable" "$dest/skills/impeccable"
cp "$work/impeccable/LICENSE" "$dest/skills/impeccable/LICENSE"
cp "$work/impeccable/NOTICE.md" "$dest/skills/impeccable/NOTICE.md"   # Apache 2.0 §4(d)
cp "$work/impeccable"/.claude/agents/impeccable-*.md "$dest/agents/"
# design-motion-principles
cp -r "$work/design-motion-principles/skills/design-motion-principles" "$dest/skills/design-motion-principles"
cp "$work/design-motion-principles/LICENSE" "$dest/skills/design-motion-principles/LICENSE"

# the pin record, read by humans and by --check
{
  echo "# Vendored by tools/vendor-skills.sh — do not edit these folders by hand; bump a pin and re-run."
  for n in skills taste-skill impeccable design-motion-principles; do
    echo "${REPO[$n]} @ ${PIN[$n]} ($(git -C "$work/$n" log -1 --format=%ad --date=short))"
  done
} > "$dest/skills/VENDORED.txt"

managed_skills=("${EMIL_SKILLS[@]}" design-taste-frontend impeccable design-motion-principles)
if (( check )); then
  rc=0
  for s in "${managed_skills[@]}"; do diff -rq "$dest/skills/$s" ".claude/skills/$s" >/dev/null || { echo "differs: .claude/skills/$s"; rc=1; }; done
  for a in "$dest"/agents/*.md; do diff -q "$a" ".claude/agents/$(basename "$a")" >/dev/null || { echo "differs: .claude/agents/$(basename "$a")"; rc=1; }; done
  diff -q "$dest/skills/VENDORED.txt" .claude/skills/VENDORED.txt >/dev/null || { echo "differs: .claude/skills/VENDORED.txt"; rc=1; }
  (( rc == 0 )) && echo "vendored skills match the pins"
  exit $rc
fi

mkdir -p .claude/skills .claude/agents
for s in "${managed_skills[@]}"; do rm -rf ".claude/skills/$s"; cp -r "$dest/skills/$s" ".claude/skills/$s"; done
cp "$dest"/agents/*.md .claude/agents/
cp "$dest/skills/VENDORED.txt" .claude/skills/VENDORED.txt
cat .claude/skills/VENDORED.txt
du -sh .claude/skills | tail -1
