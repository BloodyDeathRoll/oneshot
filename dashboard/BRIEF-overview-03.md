# BRIEF — Overview redesign (run `dashboard-03`)

Shahar, 2026-10-05: *"run a creative director, a designer and a critic, and give me 3 new mockups for
the overview, currently it just looks bad and is not user friendly."* This brief is the task layer for
those three agents. `dashboard/BRIEF.md` still holds where this file is silent (§2 data honesty, §5 hard
rules, the locked purple palette in its Amendments). It is a PRODUCT UI, not a surf-business site.

## 1. The rule above all (Shahar, verbatim)

> "Generally speaking, we need to show info we can act on, or that betters our 100,000 foot view. We do
> NOT need info that contributes nothing, like which agent ran when."

> "MAKE THIS READABLE AND USABLE FOR HUMANS." — plain words, large readable type, no terminal text, no
> internal jargon (no "proposals", no "merge record", no state names like `packaged` shown raw).

## 2. What the Overview must answer, and hold

Two operators, Shahar and Alon, each running their own runs. The Overview covers **every run**.

1. **Money, first and biggest:** two big $ numbers, **Revenues** and **Expenses** (`data.revenues`,
   `data.expenses`: `accumulated`, `monthly`, `entries`). Recorded by hand after each payment; today both
   are $0, so the empty state must look intentional and say how a payment gets added.
2. **The 100,000-ft view, small:** ready to send · pitched · replies · clients · being built.
3. **Every site ready to pitch, across all runs** (today 4: Global Surf Lodge Kabalana, KA Surf Hostel,
   Layday Surf Ahangama, The Lavish Haven; Alon's will join). Per site: a thumbnail of the live site,
   name, type, run, **who ran it**, pitch status (Ready to send / Pitched <date> via <channel> / Reply /
   Sale), critic score where one exists, and these actions, worded exactly:
   - **Preview website** (opens the live site), **Pitch** (opens the pitch page; *inactive* when it is
     not deployed — Global Surf's is not), **Suggested email**, **Suggested WhatsApp**, **Suggested
     in-person script** (each opens a popup with the message and a copy icon button).
   - **Update status** — records that the pitch was sent / what the owner replied. It never sends
     anything. Opens as a clean popup over a white 80 % veil.
   - **Hand off** — asks the other operator to do something on this site; writes an assignment and gives
     a prompt to copy and send them manually (Slack later).
4. **Handoffs and open work** between the two operators, each with "Copy prompt".
5. **Other things waiting on you**: today "3 suggested agent tweaks — approve or reject" (opens the
   Decisions view). Mockup picks and shortlist approvals appear here when they exist.

Shahar's complaints about the current page, to be solved, not restyled: the CTAs were unclear ("Send the
pitch" did not send anything); actions opened "in a very weird way & location"; raw file links and
markdown were unusable; the page "just looks bad and is not user friendly".

## 3. Data

Real only: `dashboard/data.json` (generate it with `node dashboard/data.mjs`). Fields in use:
`revenues`, `expenses`, `businesses[]` (`slug, name, type, run_id, state, ran_by, pitch_sent,
pitch.{proposal_url, proposal_live, drafts}, preview_url, critic_score, assignments, history`),
`team.{viewer, operators, open_assignments}`, `gates[]`, `runs[]`. `pitch.proposal_live` is set by the
server; in a static mockup treat Global Surf's pitch as not live (it returns 404) and the other three as
live. Thumbnails: `dashboard/mockups/soft-cards/dist/img/<slug>.jpg` (672×420, first screen of each live
preview) — reference them by relative path from the mockup; do not copy them into git.

## 4. Look

- Locked palette (BRIEF.md Amendments): lead `#6A2FE0`, tints `#8859E6 / #A682EC / #C3ACF3 / #E1D5F9 /
  #F3EEFD`, `--acc-sec #EDE6FB`, blue `#1F4BFF` for links only; green/red for status only. Cool light
  ground, white cards. One type family with tabular figures (Manrope is in
  `dashboard/mockups/soft-cards/src/fonts/`). The left sidebar with the five views stays.
- References: `~/Projects/oneshot/dashboard/ref/*.png` (13 product-dashboard screenshots; local only, not
  in git) — open every one. The current page: `http://localhost:8970/` (live server) or
  `dashboard/mockups/soft-cards/dist/index.html`.
- Target 1440 and 1024 px; must not break at 390 px.

## 5. Agents and outputs

- **Creative director** → `dashboard/overview-03/concepts.md`: three genuinely different directions for
  the Overview only (different structure and hierarchy, not three skins), each with the idea in one
  sentence, which references it takes what from, the layout as a grid sketch at 1440 and 1024, how each
  action and popup works, what it leaves out on purpose.
- **Designer** → `dashboard/overview-03/{a,b,c}/index.html` (one self-contained HTML file each, data
  embedded from `data.json`, popups working with the real draft texts from
  `sites/<slug>/pitch/message.*.md` / `in-person.*.md` embedded) + `notes.md` with a look-log. Look loop:
  shoot with Playwright at 1440 and 1024, compare with the references, write what is concretely worse,
  revise; at least 3 rounds per variant; a flaw found is fixed or raised, never handed off.
- **Critic** → `dashboard/overview-03/critique.md`: per variant /100 on BRIEF.md §8's dimensions, with
  "The four questions" replaced by **Shahar's questions**: what makes money / what can I act on now /
  which sites are ready and who ran them / what is waiting on me — timed, with where the eye lands
  first. Hard fails: an invented number; jargon or raw file names shown; an action that is ambiguous
  about what it does; contrast under AA. Top 5 fixes per variant, a side-by-side sheet.

## 6. Gate

Stop after the critic. Show Shahar the three Overviews side by side; he picks one. Only then is it
built into `dashboard/mockups/soft-cards/src/index.html`.
