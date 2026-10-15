# Oneshot: extra session-off steps

Run by the user-level `session-off` skill after handoff.md is written.

1. Refresh the Notion mirror: `node tools/notion.mjs sync`. Report its one-line result. No token or no database (`~/.oneshot/notion-token`, `~/.oneshot/notion-db`) → say so and skip.
