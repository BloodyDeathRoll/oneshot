# Agents, run `dashboard-04`: three directions

Creative director, 2026-10-05. Task layer: `dashboard/BRIEF-agents-04.md`, which overrides
`agents/creative-director/base.md` where they conflict. `dashboard/BRIEF.md` §2 and §5 and the locked purple palette
(Amendments) still apply. The product language is shared with the Overview run (`dashboard/overview-03/concepts.md`
§1): Manrope, purple for actions, popups over a white 80 % veil, no terminal text. This is a product UI, so base.md's
archetype, photograph and sampled-colour rules do not apply here.

All numbers below come from `dashboard/data.json` as generated at 2026-10-05 20:00 UTC (not regenerated), all runs
combined, and from the files under `agents/<name>/`. Each one names the field it comes from.

## 0. What I looked at, and what is wrong today

**The current page** (`http://localhost:8970/#agents`, shot at 1440×1000, 1024×800 and 390×844). Here is what is
concretely wrong:

1. **"Fails this run, by agent and business" contradicts the run selector.** The selector says "All runs", but the
   matrix shows `globalsurf-02` only: six rows, five of them zero, with one bar ("copyeditor 2"). It is a chart of
   nothing. Shahar asked what it is for, and the honest answer is: nothing he can act on.
2. **"Passes" that nobody judged.** For the designer, scout, harvester and auditor, "passes" counts work they
   *finished*, not work anyone *checked* (`AGENT_PASS` in `data.mjs`: designer = any `mocked` or `built` line, scout =
   any `scored` line). Across all runs, the designer shows 29 "passes" and the scout 41. The critic's 8 passes include
   4 re-checks done *after* the site had already passed. The scout's "rounds needed per pass" is always 2, because it
   counts the `discovered` and `scored` lines.
3. **The copy loop's fails are pinned on the copyeditor.** A copyeditor "fail" is the copyeditor doing its job:
   rejecting the copywriter's and humanizer's work. The page reads as if the copyeditor were the agent that is failing.
4. **Jargon, and nothing to read or edit.** You see "v0.3.1 · pin = changelog", "Ledger lines 4", bar labels cut to
   "Glo", and "CHANGELOG 0.3.1 · 28 Sep — From proposal 007 … `audit.json` …". Nowhere can you see what an agent is
   actually told, or change it.
5. **11 agents are hidden in one grey line**: "10 agents have no pass/fail state in the ledger", in 14 px. This is the
   most important honest fact on the page, and it is the smallest text.
6. **390 px breaks.** The page is 493 px wide, the status chips are clipped, and the sidebar stays a rail.
7. **No actions.** The 3 suggested tweaks waiting for an answer (2 for the designer, 1 for the copyeditor) are not
   shown here at all. Nothing links to the businesses where work was sent back.

**References.** I opened all 13 PNGs in `~/Projects/oneshot/dashboard/ref/`. Only these four carry the Agents view:

| File | Product | What it gives this page |
|---|---|---|
| `…09-25 15-38-36` | 23andMe relationship tree | Solid filled pills where there is something to see, grey outline pills where there is not, joined by lines. Direction A's map. |
| `…09-27 15-46-57` | Models (R.) | "Monitor performance, cost, and health across 18 active models": a table of rows, each with a status pill (Strong / Watch / Degraded), plus a "signal map" side card. Direction B's board. |
| `…09-27 15-36-13` / `15-44-34` | Sypher | A segmented bar of small coloured cells over figures, dense and calm. B's verdict strip, C's shortlist bar. |
| `…09-27 15-43-09` | FinGuard | A statement card in plain words, and "Secure your account further by: [pill] [pill]", meaning actions written as labelled pills under a sentence. Used in the header sentence and the tweak cards. |

Mondly (`15-36-41`) gives one highlighted card in a quiet row. Logip (`15-38-48`) gives the stat strip with
dividers. NexaFlow (`15-41-49`) gives the small "Pending approvals 2" card. Each is cited where it is used.

## 1. The numbers today, and how "not performing" is defined

### 1.1 Who checks whose work

Most agents are not checked by anything. The pipeline has exactly four places where work is judged and can be sent
back (PLAN.md §4). Every health signal on this page comes from one of them:

| Checkpoint | Work | Made by | Judged by | Counted from (`data.json`) |
|---|---|---|---|---|
| Your shortlist | the businesses picked to build | Scout | You approve; then the harvest shows whether there is enough to build | `businesses[]` with a `history` line `to: approved` (14). "Dropped" = its last line goes from `approved` or `harvested` back to `shortlisted` (9). |
| Copy review | the site's words | Copywriter + Humanizer (shared) | Copyeditor | `businesses[].copy_rounds` (verdicts) and `copy_fails` (sent back); the same as `agents.copyeditor.by_run.*.passes / fails` |
| Your mockup pick | the three mockups | Creative director + Designer (shared) | You | `history` lines with `agent: human` and `from: mocked`: `to: picked` is a pick; `to: mocked`, `concepted` or `void` is "no pick" |
| Critique | the built site | Designer | Critic (with the two visual critics) | `businesses[].critic_series` entries with `kind: round`, and their `verdict` |

The copywriter and humanizer share one verdict, because the copyeditor sends the copy back to both. The ledger notes
name the copywriter in 4 of the 11 copy fails and the humanizer in 2, and the rest name neither. The creative
director and designer share the mockup verdict, because your pick judges concept and mockup together. The page says
"shared" wherever this applies. It never splits a verdict that the data does not split.

### 1.2 The measures, in plain words

| Measure (label on the page) | Definition | Source |
|---|---|---|
| **Sent back** | Of the work checked at its checkpoint, how much came back. "11 of 22" is the number shown; percentages appear only in tooltips. | §1.1 |
| **You stepped in** | Times you had to answer a send-back instead of the work moving on: "allow round 3", "accept as is", "drop it, one more round". | `history` lines with `agent: human` and `from` `copy_failed` or `critiqued(n)`. Do not use `agents.*.third_fail_overrides`: its pattern catches only 4 of the 6 copy step-ins (§7). |
| **Since its last change** | The same share, counting only work judged after the agent's current version first appears in the ledger. It answers "did the last tweak help?" | `history[].v` = `agents.<name>.version_changelog`; the first such line is the cut. |
| **Tweaks waiting** | Suggested tweaks for this agent with no answer yet. | `proposals[]` with `status: pending` whose `agent` names it |
| **Last changed** | Date and plain summary of the newest entry in its history. | `agents.<name>.changelog_date`, `changelog_line` |

### 1.3 Red, amber, green and "no signal"

The page shows five states. Each state has a word and an icon as well as a colour, so the colour never carries the
meaning alone.

| State | Plain-word rule (shown in the legend, verbatim) | Look |
|---|---|---|
| **Needs fixing** (red) | "Half or more of its checked work was sent back." At least 4 pieces checked, all runs. | solid `#C0182B`, white text (6.2:1), "!" icon |
| **Watch** (amber) | "Some was sent back: at least 1 in 5, less than half." | `#FFF4E0` fill, 2 px `#9A5B00` border, ink text, "~" icon |
| **Doing fine** (green) | "Less than 1 in 5 sent back." At least 4 pieces checked. | solid `#1A7F37`, white text (5.1:1), check icon |
| **Too early** | "Checked fewer than 4 times, too few to judge." | white, 1.5 px `#8A93A3` outline, a small grey dot |
| **No signal** | "Nothing in the pipeline checks its work yet." | white, 1.5 px `#8A93A3` outline (3.1:1), `#4B5563` text, "–" icon |

These rules also hold:

- An agent with two kinds of checked work takes the worse state, and both are shown. Today this is the designer,
  with mockups and builds.
- **Step-ins and tweaks never change the colour.** Step-ins are printed beside the state. Tweaks waiting are a
  purple count badge: something to do, not a grade.
- The thresholds (half, 1 in 5, 4 pieces) are design choices, stated as such. The plan itself expects some
  send-backs: copy review allows 2 rounds and critique 3. "Half" means the work is as likely to bounce as to pass.
- Checkers (copyeditor, critic) have no checker of their own, so they are "No signal". Their send-backs are drawn as
  *their verdicts on others*, never as their own failure.

### 1.4 Every agent, today (all runs)

| Agent | What it does (plain, from PLAN.md §4–§5) | State | The honest numbers |
|---|---|---|---|
| Scout | Finds surf businesses and scores how weak their web presence is | **Needs fixing** | **9 of the 14 businesses you approved were dropped before any copy was written.** You dropped 4 (Bappa surf school, Briza Surf Kabalana, Good Story Surf School, Sion Surf Shop and Cafe). The harvester dropped 5 (Boardwalk Surf Villa, Kabalana Surf Point Kasuns Place, Nirvana Surf Retreat, Surf Front, Surf Revolution Kabalana). Each one's reason is in `businesses[].why` (thin material, closed, reviews). All 9 are in Ahangama 02, a test run where some approvals were random draws. The page says so in the detail. |
| Harvester | Collects facts, photos and video, each with its source | No signal | 15 harvests of 12 businesses; nothing checks them |
| Auditor | Measures the old site's taps to book and sets the target | No signal | 2 audits; nothing checks them |
| Copywriter | Writes the site's words from the facts only | **Needs fixing** (shared) | **Copy sent back 11 of 22 times.** KA Surf Hostel 5 of 8, The Lavish Haven 2 of 5, Global Surf Lodge Kabalana 2 of 4, Layday Surf Ahangama 1 of 3, Global Surf Adventures 1 of 2. **You stepped in 6 times** (KA 2, Layday 1, Lavish 3). Since its last change (28 Sep): 3 of 6 sent back. |
| Humanizer | Rewrites the copy so it reads as a person wrote it | **Needs fixing** (shared) | The same 11 of 22. Since its last change (20 Sep; first used 21 Sep): 11 of 19. |
| Copyeditor | Checks every claim against the facts; passes or sends back | No signal (checker) | Sent the copy back 11 of 22 times; nobody checks it. **1 tweak waiting:** "Copyeditor must check every sentence against the facts, one by one". Its "why" (`tweaks.json`): "On KA the copyeditor passed three invented or wrong claims." The critic's own notes say 2 of its 3 build fails were copy facts that had passed copy review (KA, 22 Sep). This is shown as the critic's words, not as a score (§7). |
| Creative director | Decides what kind of page each business gets; writes three concepts | **Needs fixing** (shared) | **You picked 5 times in 12 mockup decisions; 7 ended without a pick.** KA Surf Hostel 3 of 4, Global Surf Lodge Kabalana 3 of 4, Global Surf Adventures 1 of 1 (run voided); Layday 0 of 2, Lavish 0 of 1. Since its last change (28 Sep): 3 of 4 without a pick. |
| Designer | Builds three mockups, then the site from your pick | **Needs fixing** | Mockups: the same 7 of 12 (shared). **Builds: the critic sent back 3 of 7 rounds** (KA 2 of 3, Lavish 1 of 2, Layday 0 of 1, Global Surf Lodge 0 of 1). You stepped in 3 times at critique. **2 tweaks waiting**, one of them for your own rules. Not judged since its last change (5 Oct). |
| SEO | Makes the site findable on Google and maps | No signal | Nothing checks it as a pass or fail |
| AI SEO | Makes the site quotable by answer engines | No signal | Nothing checks it |
| Critic | Scores the built site; passes or sends back | No signal (checker) | Sent back 3 of 7 builds. You overruled it 0 times (`agents.critic.third_fail_overrides`: none). |
| Visual critic | Judges the page as design, independently | No signal | **Not in the ledger at all** (0 lines). Its scores are written inside the critic's lines. |
| Experience critic | Walks the page as a traveller, independently | No signal | Not in the ledger at all (0 lines) |
| Deployer | Puts the preview online; delivers after a sale | No signal | Nothing checks it |
| Writer | Writes the pitch page and the message you send | No signal | Your pitch outcomes will judge it once there are some (0 pitched today) |
| Orchestrator | Moves each business along the line and stops at your decisions | No signal | Nothing checks it |

**Today:**
- 5 agents need fixing: scout, copywriter, humanizer, creative director and designer.
- 0 are amber. The designer's builds alone would be amber (3 of 7), but its mockups make it red.
- 0 are green.
- 11 have no signal.
- 3 tweaks are waiting.

A page where nothing is green is the true state of the pipeline, and the page must not soften it.

**Custom files.** 15 of the 16 `custom.md` files hold only their one-line header. Only the designer's has rules
(12 lines). Every direction must make the empty "Your rules" state look intentional.

## 2. Shared by all three directions

### 2.1 Words

- Agent names in title case: "Copyeditor", "Creative director", "AI SEO". Each has a one-line role (§1.4). Station
  numbers, versions, pins, file names and ledger counts never appear on the page.
- Runs are written as names ("Ahangama 02"), as on the Overview.
- **"Last changed"** reads like "Last changed 28 Sep: a sentence backed only by the audit counts as unsourced."
  The CHANGELOG lines are written for Claude, with file names and version numbers. The mockups show the real line's
  first sentence with code spans rendered as soft chips. A plain one-line summary per entry is a data gap (§7).
- **The header sentence** follows FinGuard's statement card and is computed from the data:
  "Work was sent back most at copy review and at your mockup pick. 11 of the 16 agents have nothing checking their
  work yet."

### 2.2 The agent detail: reading

The container differs per direction: A uses a side sheet, B a full page and C a large popup. The contents are the
same in all three.

**Header**
- Name, 28–32 px / 700.
- The role line, 17 px.
- The state pill.
- A shared mark where it applies ("Shares this verdict with Humanizer"). Clicking it switches to that agent.

**"How it's doing"**
- The measures of §1.2 as sentences with numbers, e.g. "Copy sent back 11 of 22 times. You stepped in 6 times.
  Since its last change on 28 Sep: 3 of 6."
- For a no-signal agent: "Nothing checks the harvester's work yet, so there is no score. It has harvested 12
  businesses."

**"Waiting for you"**: its tweak cards (§2.4).

**"Where it was sent back"**: one row per business (§2.5).

**The four tabs**

| Tab | File | Line under the tab, 15 px ink2 |
|---|---|---|
| **What it does** | `base.md` | "Written by Claude. A change you make here is sent to you as a suggested tweak first." |
| **Your rules** | `custom.md` | "Written by you. Saved straight away. Claude never edits this file." |
| **History** | `CHANGELOG.md` | "One entry per approved change, newest first." |
| **More** | a menu: References (`references.md`), Tools (`tools.md`), How it's judged (`evals.md`) | Read-only. |

**Reading type**
- Body Manrope 18 / 1.65, measure 68–72 ch, ink `#1B1530`. Headings 28 / 22 / 19, weight 700.
- Tables at 16 px, with 1 px `#E5E8EF` row rules.
- Code spans as chips: `#F3F4F8` ground, radius 6, the same font at 0.92 em. No monospace blocks.
- Never terminal text.

**Two pieces of plumbing are folded away in reading mode, not deleted**
- The first line, `version: 0.3.1`, is hidden. The version shows only as "Last changed …".
- The "Runtime prompt = …" paragraph folds under a closed "How Claude starts this agent" disclosure.
- Edit mode shows the file exactly as it is.

**History tab**
- A vertical list sorted by date, newest first. The files are not in date order; the designer's, critic's and
  copyeditor's mix up and down.
- Each entry has the date (15 px / 700), the entry text rendered, and the version as a 14 px ink3 tag at the end.

### 2.3 The agent detail: editing (exact labels)

The static mockups run the whole editor in the page and save nowhere. A 14 px line under the editor says "Preview
copy: changes stay on this page."

**Your rules (`custom.md`): Shahar's own file, saved directly**

*When the file is empty (15 agents):*
- An empty-state card: "You haven't written any rules for the copyeditor yet. Your rules are your taste and house
  style. The copyeditor reads them on every run, right after Claude's instructions."
- One filled purple button: **Write your first rule**.

*When it has rules (the designer):* the rendered text, with a filled purple **Edit your rules** at the top right of
the tab.

*The editor* replaces the reading column in place. It has:
- a segmented control **Write | Preview**;
- a textarea in Manrope 17 / 1.6, at least 12 lines high, growing with the text;
- a sticky footer with **Save** (filled purple) and **Cancel** (ghost), and the hint "Saves to your rules right away.
  The designer uses them from its next run."

*What Save does:*
- No popup.
- A 4 s toast: "Saved to your rules." The toast has an **Undo** button for 10 s.
- The tab returns to reading.

*Cancel with unsaved text* opens the popup **"Discard your changes?"**
- Body: "Your edits to the designer's rules are not saved."
- Buttons: **Keep editing** (filled purple) and **Discard** (outline, red text).

**What it does (`base.md`): Claude's file, so an edit becomes a suggested tweak**

- The tab has one outline button, **Suggest a change**. Reading is the main use, so nothing here is filled.
- The editor opens with a soft purple banner (`#F3EEFD`, purple text, 5.96:1): "Claude writes this file. What you
  change becomes a suggested tweak. Nothing changes until you approve it."
- Footer: **Review my suggestion** (filled purple) and **Cancel** (ghost).

**Review my suggestion** opens the popup **"Suggest a change to the copyeditor"**: 720 px, radius 20, over a white
80 % veil.
- **What changes**: the line diff at 16 px. Removed lines are struck through on `#FDECEE` (red text, 5.4:1); added
  lines are on `#EDF7F0` (green text, 4.6:1).
- **Why (optional)**: a textarea with the placeholder "What went wrong? For example, which site and what it missed."
- Buttons: **Add to suggested tweaks** (filled purple) and **Back to editing** (ghost).

*After Add to suggested tweaks:*
- The popup closes.
- A toast: "Added to suggested tweaks. Approve it here or on Decisions."
- The tweak appears at the top of this agent's "Waiting for you", with Approve and Reject.
- Approving it says "Approved. Claude applies it in its next session.", the wording the Decisions view already uses.
  Claude then bumps the version and writes the History entry.

**References, Tools, How it's judged** are read-only here. Changes to them go through Claude.

### 2.4 Tweak cards: the same on the agent detail and on Decisions

**Each card**
- The title, 18 / 700.
- "What changes" and "Why", 16 px, from `tweaks.json`.
- One filled purple **Approve**, one outline **Reject**, and a text link **Read the full suggestion**, which opens the
  proposal file rendered in the reader. No reason is asked for either answer (Shahar's rule, commit 814d77c).

**After answering**
- The card shrinks to one line: "Approved just now · Claude applies it in its next session" or "Rejected".
- There is no undo, because the decision is written to the ledger, which is append-only.

**A tweak to your own rules** (today: "Rewrite your designer taste notes to match your Global Surf feedback")
- Carries a "For your rules" pill.
- Its buttons are **Put it in my rules** (filled purple) and **Reject**.
- *Put it in my rules* opens the Your rules editor with the suggested text already in place, the changed lines
  highlighted. Shahar presses **Save** himself. Claude never writes `custom.md`, and this keeps that true.

### 2.5 Jumping to the businesses where work was sent back

**One row per business**
- Name, 16 / 700, and run name.
- "Sent back 5 of 8".
- The date of the last send-back.
- The checker's first sentence, from the ledger note: 15 px ink2, two lines, the rest in a tooltip. For example:
  "review.md round 6, full-file audit: 5 unsourced + 1 contradicted, all to the copywriter".

**Two actions per row**
- **Open in Pipeline ›**: a ghost text button in ink. It is not blue, because blue means "a website opens". It goes to
  that business in Pipeline.
- **Read the copy review** or **Read the critic's report**: shown only where the file exists (`sites/<slug>/copy/
  review.md`, `reports/<run>/<slug>.md`). It opens in the reader popup; the file name is never shown.

### 2.6 Shared look

- **Type**: Manrope with `tnum` for every number. Nothing under 14 px. Body and buttons 16. Names and buttons 700;
  big numerals 300.
- **Purple `#6A2FE0`** is used only for:
  - actions: Approve, Save, Write your first rule, Put it in my rules, Add to suggested tweaks;
  - the tweaks-waiting badge;
  - the selected item;
  - the focus ring.
- Purple is never a health colour.
- **Red, amber and green** are status only (§1.3). Amber is added for status only, because this brief asks for red /
  amber / green; the locked palette is otherwise unchanged.
- **Ground and cards**: cool light ground `#F5F7FB`, white cards, radius 20, one soft shadow, no borders. Pills and
  badges are radius 999.
- **Spacing**: 4 · 8 · 12 · 16 · 24 · 32 · 48.
- **Sidebar and header**:
  - The sidebar is kept as the Overview run leaves it.
  - The header carries the mode line ("Live · your changes are saved" or "Read-only copy: start the dashboard to make
    changes"), as on the Overview.
  - There is no run selector, because the page covers all runs (§2.7).
- **Below 640 px**: the sidebar becomes a 56 px top bar. The gutter is 16 px. `scrollWidth` must equal 390.

### 2.7 Left out by all three, on purpose

- The "Fails this run" matrix and every "by run" breakdown.
- Ledger line counts. "Passes" for work nobody judged. "Rounds needed per pass" for agents with no checker.
- Version numbers and pins as headlines. A version appears only as a small tag in History.
- When each agent last ran. Shahar: "We do NOT need info that contributes nothing, like which agent ran when."
- A run selector. All runs are combined, and "since its last change" is the time filter that matters.
- Any blended "health score" out of 100. The data cannot support one, and a number like "72" would be invented.

## 3. Direction A: "Line"

**The idea:** the 16 agents are drawn as the line they work on, in five lanes from Find to Ship. Every send-back is
a red arc going backwards, so where work bounces is the first thing you see.

**References**
- **23andMe** (`15-38-36`): pills joined by lines. Filled where there is something to see, grey outlines where there
  is not.
- **NexaFlow** (`15-41-49`): the small "Pending approvals 2" card, for the tweaks under the map.

### What is drawn

**One white card (the map) with five horizontal lanes**, top to bottom in work order. A 120 px label column on the
left names each lane in 15 / 700 ink3. Inside each lane, the nodes run left to right:

| Lane | Nodes, in order |
|---|---|
| Find | Scout → ◇ Your shortlist → Harvester → Auditor |
| Words | Copywriter → Humanizer → Copyeditor |
| Look | Creative director → Designer → ◇ Your pick (a short grey arrow back to Designer, labelled "builds your pick" in 14 px ink3) |
| Check | SEO → AI SEO → Critic · Visual critic · Experience critic (the three critics share one 2 px `#E5E8EF` bracket underneath, labelled "judge independently") |
| Ship | Deployer → Writer → ◇ You send |

**Above the lanes:** one slim full-width pill, "Orchestrator: moves each business along this line and stops at your
decisions". It is in the no-signal style, because it is the frame rather than a step.

**Agent nodes**
- 168 × 56 pills.
- The state icon (16 px) and the name in 16 / 700.
- Fill and outline follow §1.3:
  - red nodes are solid `#C0182B` with white text;
  - no-signal nodes are white with a 1.5 px `#8A93A3` outline and `#4B5563` text.
- Today the five red nodes stand among eleven quiet outlines. That is the "jump out".
- **Checker nodes** (Copyeditor, Critic) carry a small check-mark glyph beside the name and the subtitle "checks the
  copy" / "checks the build". The red arcs leave from them.
- **A purple badge** (22 px circle, `#6A2FE0`, white numeral 13 / 700) sits on the node's top-right corner for tweaks
  waiting: Designer 2, Copyeditor 1.
- **Shared verdicts:** a thin red bracket under Copywriter + Humanizer, and under Creative director + Designer, so the
  arc lands on the pair.

**Your decisions**
- 40 px diamonds with a 2 px `#6A2FE0` outline and a white centre.
- Label under each in 15 / 700: "Your shortlist", "Your pick", "You send".
- They are not health items. They show where you are on the line.

**Lane flow**
- 2 px `#D5D9E2` arrows between the nodes of a lane.
- The last node of a lane joins the first node of the next with an elbow line down the right edge, the way text
  wraps.

**Send-back arcs**
- Each arc curves *above* its lane, from the checker back to the work it judged. The space between lanes is 64 px, and
  the arc and its chip live there.
- **Stroke width** = 2 + (sent back ÷ 2) px, capped at 8.
- **Colour** follows the same rule as the nodes: red if half or more, amber if 1 in 5 or more.
- An arrowhead points back at the maker.
- **The chip** sits at the arc's apex: white, a 1.5 px border in the arc's colour, text "Sent back 11 of 22" in
  14 / 700 in the arc's text colour (red `#C0182B`, amber `#9A5B00`).

**The four arcs today**

| Arc | From → to | Chip | Width | Colour |
|---|---|---|---|---|
| Find | Harvester → ◇ Your shortlist | "Dropped 9 of 14 after you approved" | 6.5 px | red |
| Words | Copyeditor → Copywriter + Humanizer | "Sent back 11 of 22" | 7.5 px | red |
| Look | ◇ Your pick → Creative director + Designer | "No pick 7 of 12" | 5.5 px | red |
| Check → Look | Critic → Designer. The one arc that crosses lanes, curving up the right side between the Check and Look lanes. | "Sent back 3 of 7" | 3.5 px | amber |

**Behaviour**
- **Hover or focus a node:** a 320 px tooltip card with the state word and the §1.4 sentence. For example:
  "Copywriter · Needs fixing. Copy sent back 11 of 22 times, shared with Humanizer. You stepped in 6 times."
- **Hover or focus an arc:** the per-business split, e.g. "KA Surf Hostel 5, The Lavish Haven 2, Global Surf Lodge
  Kabalana 2, Layday Surf Ahangama 1, Global Surf Adventures 1".
- **Tab order:** nodes in work order, then arcs.
- **Click or Enter on a node:** opens the agent sheet. Click on an arc: scrolls to its group in "Where work was sent
  back" and highlights it for 2 s.

**Legend.** One row under the lanes, inside the card, 15 px. It has the five states with the §1.3 sentences, then
"(2) tweaks waiting" with the purple badge, then "↶ work sent back; thicker means more".

### Layout at 1440 (content 1120)

```
┌ sidebar 240 ┬───────────────────────────── content 1120 ─────────────────────────────────┐
│             │ Agents                                          ● Live · your changes are saved│
│             │ Work was sent back most at copy review and at your mockup pick.  (17 px)     │
│             │ 11 of the 16 agents have nothing checking their work yet.                    │
│             │ ┌ map card, padding 24 ────────────────────────────────────────────────────┐ │
│             │ │ ( Orchestrator: moves each business along this line … )      No signal   │ │
│             │ │              ╭──── Dropped 9 of 14 after you approved ────╮              │ │
│             │ │ Find   [■ Scout]──◇ Your shortlist──[○ Harvester]──[○ Auditor]──╮       │ │
│             │ │              ╭──────── Sent back 11 of 22 ────────╮              │       │ │
│             │ │ Words  [■ Copywriter]──[■ Humanizer]──[○✓ Copyeditor ①]  ◄───────╯       │ │
│             │ │        └──── shared ────┘                                                │ │
│             │ │              ╭──────── No pick 7 of 12 ───────╮                          │ │
│             │ │ Look   [■ Creative director]──[■ Designer ②]──◇ Your pick   ╮ Sent back │ │
│             │ │        └─────────── shared ──────────┘  ↖ builds your pick   │ 3 of 7    │ │
│             │ │ Check  [○ SEO]──[○ AI SEO]──[○✓ Critic]─[○ Visual critic]─[○ Experience] │ │
│             │ │                             └──────── judge independently ─────────┘     │ │
│             │ │ Ship   [○ Deployer]──[○ Writer]──◇ You send                              │ │
│             │ │ ■ Needs fixing … ~ Watch … ✓ Doing fine … · Too early … – No signal …    │ │
│             │ └───────────────────────────────────────────────────────────────────────────┘ │
│             │ ┌ Waiting for you (3)  548 ───────┐ ┌ Where work was sent back  548 ──────────┐ │
│             │ │ Designer · Designer must fix the│ │ Copy review · 11 of 22                  │ │
│             │ │ flaws it spots …                │ │ KA Surf Hostel        5 of 8   Open ›   │ │
│             │ │ [Approve] [Reject] Read the full│ │ The Lavish Haven      2 of 5   Open ›   │ │
│             │ │ Copyeditor · check every        │ │ …                                       │ │
│             │ │ sentence … [Approve] [Reject]   │ │ Your mockup pick · 7 of 12              │ │
│             │ │ Designer · For your rules       │ │ Critique · 3 of 7                       │ │
│             │ │ [Put it in my rules] [Reject]   │ │ Your shortlist · 9 of 14 dropped        │ │
│             │ └─────────────────────────────────┘ └─────────────────────────────────────────┘ │
└─────────────┴───────────────────────────────────────────────────────────────────────────────┘
```

**Map card geometry**
- Inner width 1072: the 120 lane-label column plus 5 slots of 168 plus 4 gaps of 20, giving 1060.
- Lane height 56, gap between lanes 64, for an orchestrator pill plus 5 lanes of about 680.
- The card is about 760 tall with the legend.
- At 1440 × 1000 the whole map is on the first screen under the 120 px header.

**The two cards below the map**
- "Waiting for you" is NexaFlow's approvals card grown into the tweak cards of §2.4.
- "Where work was sent back" groups the §2.5 rows by arc, in the arcs' order.
- Each group's title repeats the chip and its colour dot, so the map and the list read as one thing.

### Layout at 1024 (rail 72, content 888)

```
┌72┬──────────────────────────── content 888 ────────────────────────────┐
│  │ Agents                                              ● Live         │
│  │ Work was sent back most at copy review and at your mockup pick.    │
│  │ ┌ map card ─────────────────────────────────────────────────────┐  │
│  │ │ Find                                    (lane label above)    │  │
│  │ │ [■ Scout]─◇ shortlist─[○ Harvester]─[○ Auditor]               │  │
│  │ │ Words      ╭─ Sent back 11 of 22 ─╮                            │  │
│  │ │ [■ Copywriter]─[■ Humanizer]─[○ Copyeditor ①]                 │  │
│  │ │ … same five lanes, slots 152 × 60, names may wrap to 2 lines  │  │
│  │ └───────────────────────────────────────────────────────────────┘  │
│  │ ┌ Waiting for you (3) ──────────────────────────────────────────┐  │  the two cards stack,
│  │ ┌ Where work was sent back ─────────────────────────────────────┐  │  full width
```

- The lane label moves above each lane (14 / 700 ink3), which frees the 120 px.
- Slots are 152 wide with 18 gaps. Names are 15 / 700 and may wrap to two lines ("Experience / critic").
- The state icon stays. The state word moves to the tooltip and the aria-label.

### At 390

- Each lane becomes a section: the lane label, then its nodes as full-width rows (358 × 52), joined by a 2 px grey
  line down the left.
- **Arcs become left-margin brackets.** A red 3 px bracket in a 20 px column runs from the checker's row up to the
  maker rows. Under the checker row, one red line of text in 15 / 700: "↑ Sent back 11 of 22 to Copywriter and
  Humanizer".
- Diamonds become slim rows with the diamond icon.
- The sheet becomes full-screen.

### The agent detail: a side sheet

- **Size and veil:** 720 px wide at 1440, from the right, full height. The map stays behind a white 80 % veil, so the
  line is still felt.
- **Closing:** Esc, a click on the veil, or the 40 px ×. Focus is trapped inside and returns to the node. The URL hash
  is `#agents/<name>`.
- **Order inside**, as §2.2:
  1. the header;
  2. "How it's doing";
  3. "Waiting for you";
  4. "Where it was sent back";
  5. the four tabs, with the document below them.
  The tabs stick to the sheet's top once scrolled to.
- **Reading measure:** 640 px of text at 18 px, about 70 ch.
- **Editing** happens in place, inside the sheet (§2.3). The Save / Cancel footer sticks to the sheet's bottom.
- **At 1024** the sheet is 720 wide over the 888 content.
- **For a no-signal agent** the first block is one sentence, "Nothing checks the auditor's work yet, so there is no
  score", and the tabs come straight after.

### Scales and palette

| | Scale |
|---|---|
| Type (px) | page title 32 / 700 · header sentence 17 · lane labels 15 / 700 · node names 16 / 700 (15 at 1024) · arc chips 14 / 700 · card titles 22 / 700 · body and buttons 16 · meta 15 · reader 18 / 1.65 · smallest 14 |
| Spacing | as §2.6. Map card padding 24, lane gap 64, node gap 20 |
| Radius | cards 20, nodes and chips 999, sheet 20 on the left corners |

**Colour by role**
- **Purple:** the diamonds' outline, tweak badges, Approve / Save, the focus ring.
- **Red and amber:** nodes and arcs only.
- **Everything else** is ink and greys, so the five red nodes and the red arcs are the only saturated shapes on the
  map.

### Left out on purpose

- Numbers on the nodes. A node carries only its state; numbers live on the arcs, where the problem happened.
- A table of agents. The line is the index.
- A "since its last change" view on the map. It is in the sheet and the tooltip only, because two time frames on one
  map would make the arcs ambiguous.
- Run names and dates on the map.

**Risk:** the map is wide and spatial. On a phone it turns into a list with brackets, and the "see it at once" quality
is weaker there than in B.

## 4. Direction B: "Board"

**The idea:** every agent is one row, ranked worst first. Each row draws every piece of its checked work as a small
square, kept or sent back, so the red rows are at the top. The agents nobody checks are parked honestly at the
bottom.

**References**
- **Models (R.)** (`15-46-57`): the page is "monitor health across N models". Rows with a status pill, a value and a
  small chart per row; a page title with a one-line subtitle.
- **Sypher** (`15-36-13`): rows of small coloured cells, read as a pattern before they are read as numbers.
- **Logip** (`15-38-48`): one white card with three figures and dividers, for the summary strip.

### What is drawn

**The summary strip**: one white card, three cells with 1 px dividers.

| Cell | Numeral | Line under it |
|---|---|---|
| **Need fixing** | **5**, 40 / 300 in `#C0182B` | "agents" |
| **Tweaks waiting** | **3**, 40 / 300 in `#6A2FE0` | the link button "Review them ›", which scrolls to and opens the first tweak |
| **Nothing checks them** | **11**, 40 / 300 in ink3 | "agents, listed at the bottom" |

**A segmented control** under the strip: **All work** | **Since each agent's last change**. It is the only filter on
the page. It recomputes the squares, the fractions and the states. The second view is how you see whether a tweak you
approved helped.

**The board**: one white card, a table with these columns at 1440 (inner 1072):

| Column | Width | What it shows |
|---|---|---|
| Agent | 248 | Name 16 / 700, and under it the role in 14 / 500 ink3, one line, ellipsis, full text in the tooltip. Shared verdicts add a link icon and "shared with Humanizer". |
| State | 136 | The §1.3 pill: icon and word, 14 / 700, 32 px tall |
| Checked work | 336 | **The verdict strip.** One 12 × 12 square (radius 3, 3 px gap) per verdict, oldest left. Solid `#1A7F37` = kept; solid `#C0182B` = sent back. Above each sent-back square, a 4 × 4 purple dot marks a send-back where you stepped in. A 2 px purple tick between two squares marks the agent's last change, with the tooltip "Changed 28 Sep". Two kinds of work (the designer) give two strips, each labelled at its left in 14 px ink3 ("Mockups", "Builds"). |
| Sent back | 104 | "11 of 22" in 22 / 700, red when the state is red |
| You stepped in | 96 | "6", in 22 / 300 ink |
| Tweaks | 112 | Purple pill button "1 waiting", or a quiet "–" |
| | 40 | › chevron. The whole row is one link to the detail page. |

**Square hover or focus** (each square is focusable inside its row): a tooltip with the business, the date and the
checker's first sentence. For example: "KA Surf Hostel · 22 Sep · sent back: 5 unsourced + 1 contradicted, all to the
copywriter".

**Ranking**
1. By state: Needs fixing, then Watch, Too early, Doing fine.
2. Then by share sent back, highest first.
3. Ties go to more step-ins.

**The five rows today, top to bottom**

| Row | Strip | Sent back | Stepped in | Tweaks |
|---|---|---|---|---|
| Scout | 14 squares: 9 red (the 4 you dropped yourself carry the purple dot), 5 green | 9 of 14 | – | – |
| Creative director | 12 squares | 7 of 12 | – | – |
| Designer | Mockups 12 squares; Builds 7 squares | 7 of 12 · 3 of 7 | 3 | 2 waiting |
| Copywriter | 22 squares | 11 of 22 | 6 | – |
| Humanizer | 22 squares | 11 of 22 | 6 | – |

For the scout, "Sent back" is labelled "Dropped" in its row.

**"Nothing checks these yet (11)"** sits under the board. It is a quiet section on the ground, not inside a card, with
a 20 / 700 title and the line: "No checkpoint judges their work, so there is no score. Here is when each last
changed."

The eleven sit in a 4-column grid of small white cards (260 × 112), each with:
- the name and the role;
- "Last changed 28 Sep";
- the tweak badge, if any. Copyeditor shows "1 waiting".

Checker cards also carry their verdicts on others:
- Copyeditor: "sent copy back 11 of 22";
- Critic: "sent builds back 3 of 7 · you overruled it 0 times".

The two visual critics read "Not in the ledger yet: their scores are written inside the critic's lines".

### Layout at 1440 (content 1120)

```
┌ sidebar 240 ┬───────────────────────────── content 1120 ─────────────────────────────────┐
│             │ Agents                                          ● Live · your changes are saved│
│             │ Five agents need fixing. Nothing checks eleven of them yet.        (17 px)   │
│             │ ┌ one card, three cells ───────────────────────────────────────────────────┐ │
│             │ │ Need fixing  5 │ Tweaks waiting  3  Review them › │ Nothing checks them 11│ │
│             │ └───────────────────────────────────────────────────────────────────────────┘ │
│             │ [ All work | Since each agent's last change ]                                 │
│             │ ┌ board card ──────────────────────────────────────────────────────────────┐ │
│             │ │ Agent            State           Checked work          Sent  You   Tweaks │ │
│             │ │                                                        back  in           │ │
│             │ │ Scout            ! Needs fixing  ■■■■■■■■■□□□□□        9/14  –     –    › │ │
│             │ │ Creative dir.    ! Needs fixing  ■□■■□■■■□□■□          7/12  –     –    › │ │
│             │ │ Designer         ! Needs fixing  Mockups ■□■■…  Builds ■■□■□□□  3  [2 waiting]│
│             │ │ Copywriter ⛓     ! Needs fixing  □■■□■■■□■■│□■■□…      11/22 6     –    › │ │
│             │ │ Humanizer ⛓      ! Needs fixing  same strip            11/22 6     –    › │ │
│             │ └───────────────────────────────────────────────────────────────────────────┘ │
│             │ Nothing checks these yet (11)                                                 │
│             │ ┌Copyeditor   ┐ ┌Critic       ┐ ┌Harvester    ┐ ┌Auditor      ┐            │
│             │ │sent copy    │ │sent builds  │ │12 businesses│ │Last changed │            │
│             │ │back 11 of 22│ │back 3 of 7  │ │Last changed │ │28 Sep       │            │
│             │ │[1 waiting]  │ │             │ │28 Sep       │ │             │            │
│             │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘  × 3 rows  │
└─────────────┴───────────────────────────────────────────────────────────────────────────────┘
```

In this sketch ■ is a red square, □ a green one and │ the last-change tick. The designer draws the real order
from `history` timestamps.

Rows are 72 px (88 for the designer's two strips), with 1 px `#EEF0F5` rules between them. Hover gives the row a
`#F8F9FC` ground. There is no zebra striping.

### Layout at 1024 (content 888)

```
┌72┬──────────────────────────── content 888 ────────────────────────────┐
│  │ Agents                                              ● Live         │
│  │ ┌ Need fixing 5 │ Tweaks waiting 3 › │ Nothing checks them 11 ┐     │
│  │ [ All work | Since each agent's last change ]                      │
│  │ ┌ board ────────────────────────────────────────────────────────┐  │
│  │ │ Scout             ! Needs fixing     ■■■■■■■■■□□□□□    9 of 14 │  │
│  │ │ Role line, 14 px                     Dropped 9 of 14       ›   │  │  "stepped in" and tweaks
│  │ │ Designer          ! Needs fixing     Mockups ■□■…  7 of 12     │  │  fold under the strip
│  │ │ Builds ■■□■□□□ 3 of 7 · You stepped in 3 · [2 waiting]     ›   │  │
```

- Columns: Agent 232, State 136, strip and fraction 440, chevron 40.
- "You stepped in" and the tweak pill fold into a second line under the strip.
- Squares stay 12 px. The 22-square copy strip is 330 px and still fits.
- The no-signal grid becomes 3 columns.

### At 390

- **Summary strip:** three stacked rows, each with the label on the left and the numeral, 32 px, on the right.
- **The segmented control:** full width.
- **Each board row becomes a card:** name and state pill on line 1; the role; the strip, which wraps at 20 squares;
  "Sent back 11 of 22 · You stepped in 6"; the tweak pill.
- **The no-signal grid:** one column of compact rows (name, last changed, badge).

### The agent detail: a full page

- **Routing:** clicking a row goes to `#agents/<name>`. Under the page title, a "← All agents" ghost link. The board
  keeps its scroll position on return.
- **At 1440:** two columns under the header.
  - **Left, the reading column (720):** the four tabs and the document, with the §2.3 editor in place. The tab row
    sticks under the page header.
  - **Right, a sticky rail (352)** with three cards:
    1. **"How it's doing"**: the measures as sentences, plus the strip enlarged to 16 px squares. On hover each square
       gives the date, the business and the verdict sentence.
    2. **"Waiting for you"**: the tweak cards (§2.4).
    3. **"Where it was sent back"**: the §2.5 rows.
- **At 1024:** reading column 528, rail 312.
- **At 390:** one column: the header, the three rail cards in order, then the tabs and the document.
- **Why a full page:** Shahar will read a 210-line `base.md` (designer) and edit his own rules. A page gives the most
  reading room, and the rail keeps the reason he came, "why is this red?", in view while he reads.

### Scales and palette

| | Scale |
|---|---|
| Type (px) | page title 32 / 700 · header sentence 17 · summary numerals 40 / 300 · row names 16 / 700 · role 14 / 500 · fractions 22 / 700 · stepped-in numeral 22 / 300 · state pills 14 / 700 · detail page name 32 / 700 · reader 18 / 1.65 |
| Spacing | as §2.6. Board card padding 24; row height 72; summary card padding 24; grid gap 16 |
| Radius | cards 20, squares 3, pills 999 |

**Colour by role**
- **Purple:** the "Tweaks waiting" numeral, the tweak pills, the last-change ticks, the step-in dots, the selected
  segment, the focus ring.
- **Red and green:** only in the squares, the pills and the red fractions.
- A full red row is the loudest thing on the page, by design.

### Left out on purpose

- The pipeline order. Rows rank by health, and the role line says where each agent works. Anyone who wants the order
  has Pipeline.
- Per-run breakdowns. "Since each agent's last change" replaces them.
- Charts of rounds. Each square is a round, so the strip already shows them.
- A row for the orchestrator's frame role. It is one of the 11 cards.

**Risk:** a board ranks agents, but the worst rows are shared verdicts. Shahar may read "Copywriter and Humanizer both
red" as two problems when it is one. The link icon and "shared with" must be visible on the row, not only in a
tooltip.

## 5. Direction C: "Checkpoints"

**The idea:** the page is built around the four places where work is judged: your shortlist, copy review, your
mockup pick and the critic. Each one is drawn as the businesses that passed through it, round by round, with its
agents around it. The agents nobody judges are listed honestly underneath.

**References**
- **Mondly** (`15-36-41`): one highlighted card in a quiet row. The worst checkpoint gets the red edge and is first in
  reading order.
- **Sypher** (`15-36-13`): the segmented cells, used for the shortlist bar.
- **FinGuard** (`15-43-09`): a sentence followed by labelled action pills, used for each card's footer.
- **Logip** (`15-38-48`): the task-list rows with status dots, used for the business rows.

### What is drawn

**Four checkpoint cards** in pipeline order. Each card contains, top to bottom:

1. **A 6 px left edge** in the checkpoint's state colour (§1.3, from its share sent back).
2. **The title** (22 / 700) and one plain sentence (15 ink2), e.g. "The copyeditor checks the copywriter's and
   humanizer's words against the facts."
3. **The numeral**: "11 of 22" in 48 / 300, coloured by state, with "sent back" (17 ink2) beside it.
4. **The agents row**: 40 px discs with initials ("CW", "HU", "CE"), each disc in its agent's state (a solid red disc
   with white initials, or a white disc with a grey outline). The name sits under each disc in 14 / 700.
   - The row is split into **"Made by"** (left) and **"Checked by"** (right).
   - A purple tweak badge sits on a disc where tweaks wait.
   - Every disc is a button that opens the agent popup.
5. **The rounds, one row per business** (the dot plot).
   - Each row has the business name (15 / 700, 180 px column).
   - Then one 18 px dot per verdict, in time order, 6 px apart: **red dot** = sent back, **green dot** = kept or
     picked. A **purple outlined diamond** (14 px) sits between dots where you stepped in.
   - The row ends with **Open ›**, which opens the business drill-in.
   - Hovering a dot shows the date and the checker's first sentence.
6. **The footer line**: the step-ins and "since its last change" in one sentence, then up to two action pills in
   FinGuard's way.

**The four cards today**

| Card | Numeral | Agents row | Rounds | Footer |
|---|---|---|---|---|
| **Your shortlist** | "9 of 14 dropped after you approved", red | Made by: Scout. Checked by: you, then the harvest. | 14 businesses are too many for dot rows, so this card draws a Sypher-style segmented bar of 14 cells: 5 green ("went on"), then 9 red ("dropped"). The 9 red cells are split by who dropped them: 4 "by you" and 5 "by the harvester", with a 2 px gap between the groups. The cells' hover gives each name and its `why`. Under the bar, the 9 names as small chips. | "Some approvals in Ahangama 02 were random draws for a test run." |
| **Copy review** | "11 of 22 sent back", red | Made by: Copywriter, Humanizer. Checked by: Copyeditor (badge 1). | KA Surf Hostel ●●●◆●●●●◆●, with KA's 8 dots in time order, 5 red; Lavish ●●◆◆●◆●● (5 dots; two step-in lines at 08:42); Global Surf Lodge Kabalana ●●●● (4); Layday ●●◆● (3); Global Surf Adventures ●● (2) | "You stepped in 6 times. Since the copywriter's last change on 28 Sep: 3 of 6 sent back." Pill: **1 tweak waiting ›**, which opens the copyeditor popup at its tweak. |
| **Your mockup pick** | "7 of 12 without a pick", red | Made by: Creative director, Designer (badge 2). Checked by: you. | KA Surf Hostel ●●●● (3 red, then green); Layday Surf Ahangama ●● (both green); The Lavish Haven ● (green); Global Surf Adventures ● (red, with the plain tag "run voided"); Global Surf Lodge Kabalana ●●●● (3 red, then green) | "Since the creative director's last change on 28 Sep: 3 of 4 without a pick. The designer has not been judged since its change on 5 Oct." Pill: **2 tweaks waiting ›** |
| **Critique** | "3 of 7 sent back", amber | Made by: Designer. Checked by: Critic, Visual critic, Experience critic. | KA Surf Hostel ●◆●◆● (red, red, green, with your two step-ins between); The Lavish Haven ●◆● (red, green); Layday ● (green); Global Surf Lodge Kabalana ● (green) | "You stepped in 3 times. The critic's notes put 2 of the 3 send-backs on copy facts that had passed copy review." The words come from the ledger notes and are linked, so the source is one click away. |

The diamonds' exact places come from `history` timestamps. The sketches above show the order, not the final
positions.

**Under the cards: "Not checked by anyone yet (9)"**, a quiet list on the ground.
- Its line: "No checkpoint judges these agents, so they have no score."
- One row per agent: name, role and "Last changed …". The rows are grouped by lane (Find: Harvester, Auditor ·
  Check: SEO, AI SEO, Visual critic, Experience critic · Ship: Deployer, Writer · Running the line: Orchestrator).
- The copyeditor and critic are not repeated here. They appear in their cards as checkers.
- The count line under the list reads "16 agents: 7 at a checkpoint, 9 not checked", so nothing is silently missing.

### Layout at 1440 (content 1120)

```
┌ sidebar 240 ┬───────────────────────────── content 1120 ─────────────────────────────────┐
│             │ Agents                                          ● Live · your changes are saved│
│             │ Work is judged in four places. Three of them send back half or more.  (17)   │
│             │ ┌ Your shortlist  548 ─────────────┐ ┌ Copy review  548 ──────────────────┐ │
│             │ ▌ 9 of 14  dropped after you       │ ▌ 11 of 22  sent back                │ │
│             │ ▌ approved                         │ ▌ Made by (CW)(HU)  Checked by (CE)① │ │
│             │ ▌ Made by (SC)  Checked by you     │ ▌ KA Surf Hostel   ●●●◆●●●●◆●  Open ›│ │
│             │ ▌ [■■■■■□□□□□□□□□] went on/dropped │ ▌ The Lavish Haven ●●◆◆●◆●●    Open ›│ │
│             │ ▌ chips: Bappa surf school, Briza… │ ▌ Global Surf Lodge ●●●●       Open ›│ │
│             │ ▌ Some approvals were random draws │ ▌ Layday ●●◆●  · GS Adventures ●●    │ │
│             │ └──────────────────────────────────┘ ▌ You stepped in 6 times … [1 tweak ›]│ │
│             │                                      └────────────────────────────────────┘ │
│             │ ┌ Your mockup pick  548 ───────────┐ ┌ Critique  548 ─────────────────────┐ │
│             │ ▌ 7 of 12  without a pick          │ ▌ 3 of 7  sent back        (amber)  │ │
│             │ ▌ Made by (CD)(DE)②  Checked by you│ ▌ Made by (DE)② Checked by (CR)(VC)(EC)│
│             │ ▌ KA Surf Hostel ●●●●      Open ›  │ ▌ KA Surf Hostel ●◆●◆●     Open ›    │ │
│             │ ▌ …                                │ ▌ …                                  │ │
│             │ └──────────────────────────────────┘ └────────────────────────────────────┘ │
│             │ Not checked by anyone yet (9)                                                 │
│             │ Find · Harvester  Last changed 28 Sep  ·  Auditor  Last changed 28 Sep        │
│             │ Check · SEO · AI SEO · Visual critic · Experience critic                      │
│             │ Ship · Deployer · Writer      Running the line · Orchestrator                 │
└─────────────┴───────────────────────────────────────────────────────────────────────────────┘
```

**Card geometry**
- 2 × 2 grid, cards 548 wide, gap 24, padding 28.
- Each pair of cards in a row is equal in height, about 420.
- The rounds rows are 40 px.
- The first screen at 1440 × 1000 holds the header and the top two cards fully, plus the start of the bottom two.

**Order in the grid** is pipeline order, so the eye reads the line left to right, top to bottom. The worst checkpoint
is not moved to the front: on this page, position means "where in the pipeline", and the coloured edges and numerals
do the ranking.

### Layout at 1024 (content 888)

```
┌72┬──────────────────────────── content 888 ────────────────────────────┐
│  │ Agents                                              ● Live         │
│  │ Work is judged in four places. Three of them send back half …      │
│  │ ┌ Your shortlist, full width 888 ─────────────────────────────┐    │  one column; each card
│  │ ▌ 9 of 14 dropped │ Made by (SC) │ bar of 14 cells ……………      │    │  puts numeral + agents
│  │ ┌ Copy review ─────────────────────────────────────────────────┐   │  on one row, rounds below
│  │ ▌ 11 of 22 sent back   Made by (CW)(HU)   Checked by (CE)①    │   │
│  │ ▌ KA Surf Hostel        ●●●◆●●●●◆●                    Open ›  │   │
```

- One column, cards 888 wide.
- The numeral and the agents row share one line; the rounds sit below with more room.

### At 390

- Cards are full width, in the same order.
- The numeral drops to 40 px. The agents row wraps: "Made by" on one line, "Checked by" on the next.
- In the rounds rows, the name sits on its own line above the dots. Dots stay 18 px; KA's 10 marks take about 230 px.
- **Open ›** becomes a full-width 44 px row target.
- The shortlist bar's 14 cells take 22 px each.

### The drill-ins: two popups

**1. A business's story at a checkpoint**
- **Opened by:** a row's Open ›, or a dot.
- **Container:** a 720 px popup over the white 80 % veil. Title: "Copy review: KA Surf Hostel".
- **The timeline**, one block per round, oldest first:
  - the date;
  - a verdict pill ("Sent back" red-soft / "Kept" green-soft);
  - the checker's note rendered in full at 16 px, from `history[].note`;
  - where you stepped in, your words in a purple-soft quote block (`#F3EEFD`), e.g. "Shahar: 'Allow round 3' …".
- **Footer buttons:** **Open in Pipeline ›**, and **Read the copy review** where the file exists.

**2. An agent**
- **Opened by:** a disc, or a row in "Not checked by anyone yet".
- **Container:** a large centred popup, 1040 px wide (max 92 vw), 88 vh tall, radius 20, over the white 80 % veil.
- **Inside, top:** the header and "How it's doing" sit in one band.
- **Below, two panes:**
  - **Left (220):** a vertical tab list: What it does · Your rules · History · References · Tools · How it's judged.
  - **Right (≈ 760):** the reading pane, about 68 ch at 18 px.
- **"Waiting for you" and "Where it was sent back"** sit above the tabs, collapsed to one line each when empty.
- **Editing** (§2.3) happens in the right pane, with the footer pinned to the popup's bottom. The "Suggest a change"
  review popup stacks on top as a second layer, with the same veil.
- **At 390** it is full screen; the vertical tabs become a horizontal scrolling pill row.

### Scales and palette

| | Scale |
|---|---|
| Type (px) | page title 32 / 700 · header sentence 17 · card titles 22 / 700 · card numerals 48 / 300 · "sent back" 17 · business names 15 / 700 · disc initials 15 / 700, names 14 / 700 · footer sentence 15 · popup titles 24 / 700 · reader 18 / 1.65 |
| Spacing | as §2.6. Card padding 28, grid gap 24, rounds rows 40, dots 18 with a 6 px gap |
| Radius | cards 20, the left edge follows the card radius, dots round, diamonds square at 45°, popups 20 |

**Colour by role**
- **Purple:** the step-in diamonds, tweak badges and pills, Approve / Save, the focus ring.
- **Red, amber and green:** card edges, numerals, dots and discs.
- **The shortlist card's dropped cells** are red. The 4 dropped by you get a purple outline to say "you did this".

### Left out on purpose

- A map of all 16 agents. Only the 7 at a checkpoint get a picture; the other 9 get a plain list, because there is
  nothing to draw for them.
- Agent-by-agent ranking. The checkpoint is the unit, which matches how the work actually bounces.
- Percentages anywhere except tooltips.
- A rounds limit line. The plan's limits apply per review cycle, and KA's copy had several cycles. The step-in
  diamonds already show where the limit was hit, because that is when you were asked.

**Risk:** an agent's whole picture is split across cards. The designer is in two cards (mockup pick and critique), so
"is the designer the problem?" needs the agent popup. The disc badges and identical disc styling must make the same
agent easy to recognise in both cards.

## 6. How they differ

| | A · Line | B · Board | C · Checkpoints |
|---|---|---|---|
| Organising idea | the pipeline as five lanes; send-backs as arcs | every agent a row, worst first | the four places where work is judged |
| What jumps out | five solid red nodes among eleven outlines, and thick red arcs | the red rows at the top, and their red squares | red card edges and big red numerals, and rows of red dots |
| Unit of health | the agent (node) and the hand-off (arc) | the agent (row) | the checkpoint (card) |
| How "no signal" is shown | grey outline nodes inside the line, where they work | a separate grid at the bottom, "Nothing checks these yet (11)" | a plain list under the cards, "Not checked by anyone yet (9)" |
| Time | all runs; "since its last change" in the sheet | segmented "All work / Since each agent's last change" | "since its last change" in each card's footer |
| Businesses | in the "Where work was sent back" card, and arc tooltips | in square tooltips and the detail rail | one row per business in every card, with its own story popup |
| Agent detail | a 720 px side sheet over the map | a full page, reader and rail | a 1040 px popup with vertical tabs |
| Fastest for | "where does work bounce?" | "which agent is worst, and did my last tweak help?" | "what happened to this business at this checkpoint?" |

## 7. Data gaps found

None of these blocks a mockup: each concept uses only what exists, as stated above. Each one is a fix for `data.mjs`
or the server, raised for Shahar and not done here.

1. **No field says whose work a send-back belongs to.** Copy fails go "to the copywriter" or "to the humanizer" only
   in free-text notes (named in 4 and 2 of 11). Two of the critic's three fails were copy facts, also only in the
   note. A `sent_back_to` field on fail lines would let the copyeditor (and the critic) get a real "missed" measure.
2. **`agents.*.passes` counts unjudged work.** Designer, scout, harvester and auditor "passes" are just finished
   steps. The critic's 8 passes include 4 post-pass verifications; it has 4 scored passes in 7 rounds. The
   `rounds_per_pass` for the scout is always 2. The current page displays all of these as performance.
3. **`third_fail_overrides` misses step-ins.** Its pattern finds 4 of the 6 human lines that answer a copy fail. It
   misses KA's "One more pass" on 22 Sep and Lavish's standing-rule line of 23 Sep, and it finds nothing for the 3
   critique step-ins. Counting human lines by `from` state is exact.
4. **Mockup-gate verdicts are not in `agents`.** They exist only as human `history` lines (`from: mocked`). They need
   a field.
5. **The visual critic and experience critic never appear in the ledger** (0 lines). Their scores live inside the
   critic's notes, so they cannot have a signal of their own.
6. **"Since its last change" needs version-tagged lines.** `history[].v` exists and works. CHANGELOG dates have no
   time, so dates alone would be ambiguous on change days (28 Sep, 5 Oct).
7. **No plain-language summary of CHANGELOG entries.** `tweaks.json` does this for proposals. Something similar is
   needed for history entries, or "Last changed" stays half-jargon.
8. **CHANGELOG files are not in date order** (designer, critic, copyeditor). The view must sort them.
9. **No server endpoint saves an agent file or creates a tweak.** `server.mjs` has `/handoff` and `/decide` only.
   Saving "Your rules" and "Add to suggested tweaks" both need new endpoints. A `custom.md` save should also be logged
   (`tools/team.mjs log`), since it is not a ledger state change.
10. **`proposals[].agent` is free text** ("Designer (your custom.md)", "Auditor, copywriter, critic"). Matching tweaks
    to agents needs an `agents: []` array.
11. **No `role` per agent and no `custom.md` last-edited date in `data.json`.** The roles above are taken from PLAN.md
    §4–§5 and would be embedded by the designer.
