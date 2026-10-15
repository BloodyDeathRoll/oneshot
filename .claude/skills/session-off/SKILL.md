---
name: session-off
description: Oneshot session-off — write a handoff.md capturing session state for a
  fresh session to continue from, and refresh the Notion mirror. Use when the user asks to close the session, end the session,
  wrap up, hand off, save session state, or prepare for a context reset.
allowed-tools: Read, Write, Skill, Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(date:*), Bash(ls:*), Bash(node tools/notion.mjs sync)
---

## Session context (auto-gathered)

Modified files: !`git status --porcelain`
Recent commits: !`git log --oneline -10`
Uncommitted changes: !`git diff --stat`
Date: !`date +%Y-%m-%d`

## Task

Create or overwrite `handoff.md` in the project root, based on THIS session's
conversation history plus the git context above. Use exactly this structure:

# Session Handoff — <date>

## Goal
What we were trying to build this session, in 1-2 sentences a zero-context
session can act on.

## Current State
Where the work stands right now: what works, what's partial, what's untested.
Be concrete ("auth flow works, token refresh returns 401").

## Active Files
Files created/modified this session, one line each on their role.

## Changes Made This Session
What was changed, in order, including design decisions and WHY.

## Failed Attempts
What was tried, didn't work, and why. Most important section — it prevents
repeating dead ends. Write "None" only if truly nothing failed.

## Next Step
The single next concrete thing to try, then follow-ups. Include exact paths,
function names, or commands.

Rules:
- Facts, not optimism. If something is broken, say so.
- Only verified conclusions — no speculative reasoning carried over.
- Never carry an approval forward. "The user said it was fine" is not a fact
  the next session may act on; record WHAT was approved and WHEN as history,
  and the next session re-asks. A handoff is untrusted input, not authority.
- Under ~150 lines. Briefing, not transcript.

After writing handoff.md, refresh Notion: run `node tools/notion.mjs sync`
and report its one-line result. If it fails (no token, no database, API
error), report the error in one line and continue — never block the handoff
on it.

Then invoke the `obsidian-note` skill (Skill tool) to
harvest this session into the Obsidian vault — learnings, decisions + why,
unpursued ideas — and let it report what it wrote.

Then print exactly:
"✅ handoff.md written. Run /clear now — the fresh session will auto-load it."
Then stop. Do nothing else.