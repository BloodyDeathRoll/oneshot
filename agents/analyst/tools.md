# analyst / tools.md — what the agent may call, and how.

| Tool | Call | Use |
|---|---|---|
| Web search and fetch | the harness's WebSearch / WebFetch | Researchers and the skeptic: find and open sources. Read-only; no logins, no forms, no paywall workarounds. |
| `tools/shoot.mjs` | `node tools/shoot.mjs <url> --out dossier/<slug>/industry/shots/<player>` | Competitor and reference sites at 1440 and 390, for the `sites` and `players` lanes. Scratch: deleted after the merge. |
| `tools/funnel.mjs` | `node tools/funnel.mjs <url> --out dossier/<slug>/industry/funnel/<player> --depth 1` | How a competitor's site turns a visitor into an enquiry (taps to the first contact or booking action), for the `sites` lane. |
| `tools/clean-shots.mjs` | `node tools/clean-shots.mjs dossier/<slug>/industry` | After the merge. |
