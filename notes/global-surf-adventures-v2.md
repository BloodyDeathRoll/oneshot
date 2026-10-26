# global-surf-adventures-v2 — run 2026-10-globalsurf-03 (test)

State: **packaged** (2026-10-17; preview redeployed 2026-10-20). Waiting at gate c: a human sends the pitch (test run: nothing is sent).

- Picked: unique ("all three super high end; unique wins for the extra movement").
- Station 5: round 1 PASS 92.9/100; after the fix pass, verification 1 PASS 97.7/100 (critic 75.7/80, visual 8.8, experience 9).
- Preview: https://global-surf-lodge-kabalana-v2.os1.workers.dev (Worker global-surf-lodge-kabalana-v2, Oneshot account, version 51c3921e)
- Proposal: https://global-surf-lodge-kabalana-v2-proposal.os1.workers.dev (Worker global-surf-lodge-kabalana-v2-proposal; messages in sites/global-surf-adventures-v2/pitch/)
- The drop lines up on each photo's focal point (schema v0.10), plays in full even when plates arrive late, scroll CLS 0.0069.
- 2026-10-20 (Shahar, PR #32): forecast block carries `data-json` so the Site monitor smoke check finds it; the monitor had failed every run since 2026-10-17. Only that attribute changed; all 133 dist files live and cmp-identical, noindex kept, site-check `--all --smoke` ALL PASS.
- Handoff 2026-10-26: Alon assigned the business to Shahar from the dashboard (a-202610261117-a5jg); both URLs checked live (200), nothing else changed. Both operators may pass gate c.

Open (human decisions):
- Two pitches for the same business are live (v1 and v2). Send at most one. Decide which before `packaged → pitched`.
- No fee amounts in the run; the pitch says "we agree the prices together".
- Non-blocking fixes listed in the verification reports (soft phone hero poster, fog mid-drop on phones, review dots, hero video off-screen, JS-off end vs start, stepper fields 42x32).

Settled since the last note:
- Hero proof point vs the designer's "no rating in the hero" rule: proposal 2026-10-globalsurf-03/002 (2026-10-17), a hero rating is per business, the agents decide and the human judges at the gate. No change to this build.

Do not touch v1 (sites/global-surf-adventures/, run 2026-09-globalsurf-02): its preview and proposal are live and separate.
