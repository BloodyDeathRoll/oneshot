#!/usr/bin/env node
// dashboard/server.mjs — control layer, step 1 (proposals/dashboard-01/001, approved 2026-09-27).
//
// One Node process, no dependencies. It does three things and nothing else:
//   1. serves the dashboard build and a live data.json (buildData() on every request);
//   2. pushes a Server-Sent Event whenever ledger.jsonl / runs/ / deploy.json / proposals change, or
//      origin/main moves (it fetches every --sync seconds, default 60, 0 = never; docs/team.md);
//   3. accepts a human gate decision on POST /decide and appends exactly one ledger line for it,
//      after checking the business is still in the state the page saw (a stale page is rejected);
//      the same line then goes to its own branch and PR, like a save in 5 (dashboard/publish.mjs);
//   5. saves an agent's definition from the Agents view: POST /agent-rules writes the operator's own
//      agents/<name>/custom.md; POST /agent-tweak turns an edit of Claude's base.md into a suggested
//      tweak (proposals/<run>/NNN-<agent>-<title>.md + its plain summary in dashboard/tweaks.json) and
//      never touches base.md itself. Both refuse a file that changed since the page read it. After the
//      local save, the same change is committed on its own branch off origin/main and opened as a PR
//      (dashboard/publish.mjs); if that fails the local save stands, the page says why and can retry
//      the PR (POST /agent-pr).
//   4. handoffs (docs/handoff.md, tools/handoff.mjs): POST /handoff asks the owner for a business
//      (a `requested` line in activity.jsonl), POST /handoff-decide is the owner's approve / reject;
//      the zip, the R2 upload and the take happen on the operators' machines, never here. Also serves
//      /thumb/<slug>.jpg, the first screen of the site's live preview (dashboard/thumbs.mjs).
//   6. the Live strip (docs/heartbeat.md, dashboard/live.mjs): POST /status takes one heartbeat line
//      from an operator's session (tools/heartbeat.mjs, bearer ONESHOT_BOX_KEY, no Access login), GET
//      /live returns the picture, and data.json carries it. A local dashboard with ~/.oneshot/box.json
//      pulls the box's picture instead, so both operators see the same strip.
// It holds no Claude credentials, runs no agent, and can write only the ledger line shapes in DECISIONS
// plus the activity.jsonl handoff shapes (request, approve, reject) and the live file outside the repo.
//
//   node dashboard/server.mjs [--port 8970] [--host 127.0.0.1] [--allow-host a.example,b.example] [--root dashboard/mockups/soft-cards/dist] [--ledger ledger.jsonl] [--operator shahar] [--sync 60]
//                             [--access-team <team> --access-aud <audience>] [--state <dir>]   (ONESHOT_BOX_KEY: the heartbeat bearer key)
//
// Who decides. Local (the default): the operator running the server (team.json; `--operator`, else
// `tools/team.mjs whoami`), one per process. Online: with --access-team and --access-aud the server
// sits behind Cloudflare Access (infra/dashboard/), which checks the login and signs who it is into
// every request; the operator is then read from that token per request (dashboard/access.mjs), so one
// server serves both operators and every line still carries the right `operator` (docs/team.md).
// Requests addressed to a host not in --allow-host are refused (a DNS-rebinding page could otherwise
// reach it); online, a request without a valid Access token is refused too.

import { createServer } from 'node:http';
import { readFileSync, existsSync, appendFileSync, writeFileSync, mkdirSync, readdirSync, mkdtempSync, rmSync, watch, statSync, createReadStream, renameSync } from 'node:fs';
import { createHash, randomUUID } from 'node:crypto';
import { execFileSync, execFile } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname, resolve, extname, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildData } from './data.mjs';
import { whoami, team, ACTIVITY } from '../tools/team.mjs';
import { currentRun } from '../tools/run.mjs';
import { request as handoffRequest, decide as handoffDecide, handoffs as readHandoffs } from '../tools/handoff.mjs';
import { LiveStore, validate as validateLive, bearerOk, pull as pullLive } from './live.mjs';
import { loadConfig as boxConfig } from '../tools/heartbeat.mjs';
import { homedir } from 'node:os';
import { shootThumb, thumbFresh, markPitchLive } from './thumbs.mjs';
import { openPr } from './publish.mjs';
import { accessGate } from './access.mjs';
import { readJsonlMerged, fetch as fetchMain, lsMain } from '../tools/origin.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const PORT = Number(arg('port', 8970));
const HOST = arg('host', '127.0.0.1');
const DIST = resolve(ROOT, arg('root', 'dashboard/mockups/soft-cards/dist'));
const LEDGER = resolve(ROOT, arg('ledger', 'ledger.jsonl'));
const SYNC_S = Number(arg('sync', 60));
const HOSTS = new Set(['localhost', '127.0.0.1', '[::1]', HOST, ...String(arg('allow-host', '')).split(',').map((h) => h.trim().toLowerCase()).filter(Boolean)]);
// The Live strip: heartbeats land here with the box key (online), or are pulled from the box (local).
const BOX_KEY = process.env.ONESHOT_BOX_KEY || null;
const STATE_DIR = resolve(ROOT, arg('state', process.env.DASH_STATE_DIR ?? (BOX_KEY ? join(ROOT, '..', 'dashboard-state') : join(homedir(), '.oneshot', 'dashboard-state'))));
const LIVE = new LiveStore(join(STATE_DIR, 'live.json'));
const BOX = BOX_KEY ? null : boxConfig(); // a laptop with ~/.oneshot/box.json shows the box's picture
// An operator as the handlers see them: id, display name, and the git identity their PR commits carry.
const identity = (op) => { const o = team()[op]; if (!o) throw new Error(`${op} is not in team.json`); return { operator: op, human: o.name, git: { name: o.git_names?.[0] ?? o.name, email: o.git_emails?.[0] ?? '' } }; };
let ACCESS = null, FIXED = null; // online: ACCESS reads the operator from each request; local: FIXED is the one operator
try {
  if (arg('access-team', null) || arg('access-aud', null)) ACCESS = accessGate({ team: arg('access-team', null), aud: arg('access-aud', null) });
  else FIXED = identity(arg('operator', null) ?? whoami());
} catch (e) { console.error(`dashboard server: ${e.message}`); process.exit(2); }

// Repo files the page may read (sheets to pick from, pitch drafts, proposals) — prefixes only, read-only.
const FILE_PREFIXES = ['sites/', 'proposals/', 'reports/', 'agents/', 'dashboard/mockups/', 'dashboard/overview-03/', 'dashboard/agents-04/', 'agents/designer/gold/shots/'];
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.md': 'text/markdown; charset=utf-8', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };

// ---- the only seven things this server can write --------------------------------------------------
// Each decision: which state the business must be in now, and the line it produces.
const DECISIONS = {
  // gate a — one call per business on the shortlist
  shortlist: {
    from: ['shortlisted'],
    choices: ['approve', 'drop'],
    line: ({ human, choice, reason }) => choice === 'approve'
      ? { to_state: 'approved', note: `gate a: approved by ${human} via dashboard. Verbatim: "${reason}"` }
      : { to_state: 'shortlisted', note: `dropped by ${human} via dashboard: ${reason}` },
  },
  // gate b — the mockup pick
  pick: {
    from: ['mocked'],
    choices: ['calm', 'interactive', 'unique'],
    choiceHelp: 'one to three of calm, interactive, unique, joined by + (e.g. calm+unique)',
    // Shahar keeps one to three; each kept mockup becomes its own site (2026-10-17): "calm+unique".
    validChoice: (c) => { if (typeof c !== 'string') return false; const v = c.split('+'); return v.length >= 1 && v.length <= 3 && new Set(v).size === v.length && v.every((x) => ['calm', 'interactive', 'unique'].includes(x)); },
    line: ({ human, choice, reason }) => ({ to_state: 'picked', note: `${human} ${choice.includes('+') ? 'keeps' : 'picks'} ${choice.split('+').map((x) => x.toUpperCase()).join(' + ')} via dashboard${choice.includes('+') ? ' — each becomes its own site' : ''}. Verbatim: "${reason}"` }),
  },
  // gate c — the pitch was sent (by a human, outside this system)
  pitch: {
    from: ['packaged'],
    choices: ['whatsapp', 'in_person', 'email', 'phone'],
    line: ({ human, choice, reason, date }) => ({ to_state: 'pitched', note: `sent by ${human} via ${choice.replace('_', ' ')}${date ? ` on ${date}` : ''}. ${reason}` }),
  },
  // after the pitch — outcomes, repeatable (reply → meeting → sale)
  outcome: {
    from: ['pitched', 'outcome:reply', 'outcome:meeting', 'outcome:ignored'],
    choices: ['reply', 'meeting', 'sale', 'ignored'],
    line: ({ human, choice, reason }) => ({ to_state: `outcome:${choice}`, note: reason }),
  },
  // gate e — after a sale, the product the client chose (2026-10-05: the CMS comes only after this);
  // the line carries hosting_mode, which decides the deployer's station-8 adapter (docs/ledger.md)
  product: {
    from: ['outcome:sale'],
    choices: ['managed', 'self_hosted_docker', 'static_only'],
    line: ({ human, choice, reason }) => ({ to_state: 'product_chosen', hosting_mode: choice, note: `gate e: the client chose ${choice}, recorded by ${human} via dashboard. Verbatim: "${reason}"` }),
  },
  // gate d — a prompt diff under proposals/ (slug "-"); the merge itself stays a code change
  proposal: {
    from: null,
    choices: ['approved', 'rejected'],
    reasonOptional: true, // a yes/no on a suggested agent tweak needs no explanation
    line: ({ human, choice, reason, file }) => ({ to_state: `proposal:${choice}`, note: `${file}: ${choice} by ${human} via dashboard${reason ? `. ${reason}` : ''}` }),
  },
};

// The default ledger is read merged with origin/main's, so a gate the other operator already passed
// and merged is seen here as passed (tools/origin.mjs).
function readLedger() {
  if (LEDGER === join(ROOT, 'ledger.jsonl')) return readJsonlMerged('ledger.jsonl');
  return readFileSync(LEDGER, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
}
function currentState(run_id, slug) {
  const lines = readLedger().filter((l) => l.run_id === run_id && l.slug === slug);
  return lines.at(-1) ?? null; // last line in file order (CLAUDE.md)
}

function decide(body, who) {
  const spec = Object.hasOwn(DECISIONS, body.gate) ? DECISIONS[body.gate] : null;
  if (!spec) return { status: 400, error: `unknown gate "${body.gate}"; one of ${Object.keys(DECISIONS).join(', ')}` };
  if (spec.validChoice ? !spec.validChoice(body.choice) : !spec.choices.includes(body.choice)) return { status: 400, error: `choice must be ${spec.choiceHelp ?? `one of ${spec.choices.join(', ')}`}` };
  const reason = String(body.reason ?? '').trim();
  if (reason.length < 3 && !spec.reasonOptional) return { status: 400, error: 'a reason is required; it becomes the ledger note verbatim' };
  if (!body.run_id) return { status: 400, error: 'run_id is required' };

  let from_state = null, slug;
  if (spec.from) {
    slug = body.slug;
    if (!slug) return { status: 400, error: 'slug is required' };
    const last = currentState(body.run_id, slug);
    if (!last) return { status: 409, error: `${slug} has no line in run ${body.run_id}` };
    if (!spec.from.includes(last.to_state)) return { status: 409, error: `stale: ${slug} is now "${last.to_state}", this decision needs ${spec.from.join(' | ')}`, current: last };
    if (body.expected_state && body.expected_state !== last.to_state) return { status: 409, error: `stale page: expected "${body.expected_state}", ledger says "${last.to_state}"`, current: last };
    from_state = last.to_state;
  } else {
    slug = '-';
    const file = String(body.file ?? '');
    if (!/^proposals\/[\w.-]+\/[\w.-]+\.md$/.test(file) || !existsSync(join(ROOT, file))) return { status: 400, error: 'file must be an existing proposals/<run>/<name>.md' };
    // the ledger line belongs to the run the proposal was filed under: proposals/<run_id>/
    if (body.run_id !== file.split('/')[1]) return { status: 400, error: `run_id must be ${file.split('/')[1]}, the run this proposal was filed under` };
    const prior = [...readLedger()].reverse().find((l) => /^proposal:/.test(l.to_state) && (l.note ?? '').startsWith(file));
    if (prior) return { status: 409, error: `already decided: ${file} was ${prior.to_state.slice(9)} on ${prior.ts}; a change is a CLI decision, not a second click`, current: prior };
    body = { ...body, file };
  }
  const { to_state, note, hosting_mode } = spec.line({ ...body, reason, human: who.human });
  const line = { ts: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'), run_id: body.run_id, slug, agent: 'human', agent_version: null, from_state, to_state, note, operator: who.operator, ...(hosting_mode ? { hosting_mode } : {}) };
  appendFileSync(LEDGER, JSON.stringify(line) + '\n');
  // A test ledger (--ledger) is not the repo's: it stays local.
  if (LEDGER !== join(ROOT, 'ledger.jsonl')) return { status: 201, line };
  const what = slug === '-' ? body.file.replace(/^proposals\//, '').replace(/\.md$/, '') : slug;
  const title = slug === '-' ? `${body.file}: ${to_state.slice(9)}` : `${slug}: ${from_state} → ${to_state}`;
  const pr = {
    root: ROOT,
    author: who.git,
    branch: `${who.operator}/decision-${body.gate}-${what.replace(/[^\w-]+/g, '-').slice(0, 48).replace(/-$/, '')}-${stamp()}`,
    message: `ledger: ${title} (${who.human}, from the dashboard)`,
    title: `Decision: ${title}`,
    body: `${who.human} decided this on the dashboard. Only \`ledger.jsonl\` changes: one line.\n\n\`\`\`json\n${JSON.stringify(line)}\n\`\`\`\n\nMerge it so the other operator sees the decision.\n\nOpened by the dashboard on decision.`,
    files: [{ rel: 'ledger.jsonl', append: JSON.stringify(line) + '\n' }],
  };
  return { status: 201, line, pr };
}

// ---- handoff: ask for a business, answer a request (docs/handoff.md, tools/handoff.mjs) ------------
// Both write one activity.jsonl line locally and open it as its own PR, like a decision. The owner's
// machine ships the media and the receiver's machine takes it (tools/handoff.mjs auto, from the
// session-start hook); nothing heavy runs here.
function handoffPr(line, who, { title, message, body }) {
  return {
    root: ROOT, author: who.git,
    branch: `${who.operator}/handoff-${line.step}-${line.slug.replace(/[^\w-]+/g, '-').slice(0, 40)}-${stamp()}`,
    message, title, body: `${body}\n\nOnly \`activity.jsonl\` changes: one \`handoff\` line (${line.step}).\n\n\`\`\`json\n${JSON.stringify(line)}\n\`\`\`\n\nOpened by the dashboard.`,
    files: [{ rel: 'activity.jsonl', append: JSON.stringify(line) + '\n' }],
  };
}
function handoff(body, who) {
  const slug = String(body.slug ?? ''), note = String(body.task ?? body.note ?? '').trim();
  if (note.length < 3) return { status: 400, error: 'say why you want it (at least 3 characters)' };
  let line;
  try { line = handoffRequest(slug, note, who.operator); } catch (e) { return { status: /already|yours|no ledger/.test(e.message) ? 409 : 400, error: e.message }; }
  const owner = team()[line.from]?.name ?? line.from;
  return { status: 201, line, pr: handoffPr(line, who, { title: `Handoff request: ${slug} (${who.human} asks ${owner})`, message: `handoff: ${who.human} asks ${owner} for ${slug} (from the dashboard)`, body: `${who.human} asked ${owner} for **${slug}** on the dashboard:\n\n> ${note}\n\n${owner} approves or rejects it on the dashboard; on approval ${owner}'s machine ships the media and ${who.human}'s takes it (docs/handoff.md).` }) };
}
function handoffDecision(body, who) {
  const id = String(body.id ?? ''), choice = String(body.choice ?? ''), note = String(body.reason ?? body.note ?? '').trim();
  let line;
  try { line = handoffDecide(id, choice, note, who.operator); } catch (e) { return { status: /already/.test(e.message) ? 409 : /only .* decides/.test(e.message) ? 403 : 400, error: e.message }; }
  const h = readHandoffs().find((x) => x.id === id);
  const other = team()[h?.to]?.name ?? h?.to ?? 'the other operator';
  return { status: 201, line, pr: handoffPr(line, who, { title: `Handoff ${choice}: ${line.slug} → ${other}`, message: `handoff: ${line.slug} ${choice} by ${who.human} (from the dashboard)`, body: `${who.human} ${choice} ${other}'s request for **${line.slug}** on the dashboard${note ? `:\n\n> ${note}` : '.'}\n\n${choice === 'approved' ? `Next: ${who.human}'s machine ships the media to R2 and ${other}'s takes it (tools/handoff.mjs auto, from the session-start hook).` : 'The business stays where it is.'}` }) };
}

// ---- agent definitions (the Agents view) ----------------------------------------------------------
// custom.md is the operator's own layer (CLAUDE.md: Claude never edits it); the operator saves it here.
// base.md is Claude's: an edit from the dashboard only becomes a suggested tweak for gate d.
const shaOf = (t) => createHash('sha256').update(t).digest('hex').slice(0, 16);
const agentDir = (a) => (typeof a === 'string' && /^[a-z][a-z-]*$/.test(a) && existsSync(join(ROOT, 'agents', a, 'base.md')) ? join(ROOT, 'agents', a) : null);
const stamp = () => new Date().toISOString().replace(/\D/g, '').slice(0, 14);
// Returns the line written, so the save's PR carries it too (an append to main's activity.jsonl).
const logWork = (who, slug, note, files) => { const line = JSON.stringify({ ts: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'), operator: who.operator, slug, kind: 'work', note, files }) + '\n'; appendFileSync(ACTIVITY, line); return line; };
function saveRules(body, who) {
  const dir = agentDir(body.agent);
  if (!dir) return { status: 400, error: 'unknown agent' };
  if (typeof body.text !== 'string' || body.text.length > 200_000) return { status: 400, error: 'text is required' };
  const path = join(dir, 'custom.md');
  const cur = existsSync(path) ? readFileSync(path, 'utf8') : '';
  if (typeof body.base_sha !== 'string') return { status: 400, error: 'base_sha is required' };
  if (body.base_sha !== shaOf(cur)) return { status: 409, error: 'This file changed since you opened it. Reload the page, then make your edit again.' };
  // keep the file's own first line ("# <agent> / custom.md — written by …") and a --- rule if it has one
  const m = cur.match(/^(#\s[^\n]*)\n(?:[ \t]*\n)*(---[ \t]*(?:\n|$))?/);
  const header = m ? `${m[1]}\n${m[2] ? '---\n' : '\n'}` : '';
  const next = header + body.text.trim() + '\n';
  writeFileSync(path, next);
  const logged = logWork(who, '-', `${body.agent}: ${who.human} saved their rules (custom.md) from the dashboard`, [`agents/${body.agent}/custom.md`]);
  const rel = `agents/${body.agent}/custom.md`;
  const pr = {
    root: ROOT,
    author: who.git,
    branch: `${who.operator}/agent-rules-${body.agent}-${stamp()}`,
    message: `agents/${body.agent}: ${who.human}'s rules (custom.md), saved from the dashboard`,
    title: `${body.agent}: ${who.human}'s rules, saved from the dashboard`,
    body: `${who.human} saved their rules for the ${body.agent} agent from the dashboard (Agents → Advanced → Your rules). Only \`${rel}\` changes, plus its line in \`activity.jsonl\`.\n\nMerge it so the other operator's runs use these rules too.\n\nOpened by the dashboard on save.`,
    files: [{ rel, before: cur, after: next }, { rel: 'activity.jsonl', append: logged }],
  };
  return { status: 201, sha: shaOf(next), file: rel, pr };
}
function suggestTweak(body, who) {
  const dir = agentDir(body.agent);
  if (!dir) return { status: 400, error: 'unknown agent' };
  const title = String(body.title ?? '').trim(), what = String(body.what ?? '').trim(), why = String(body.why ?? '').trim();
  if (title.length < 3 || what.length < 3 || why.length < 3) return { status: 400, error: 'Give the tweak a title, what it changes and why.' };
  if (typeof body.text !== 'string' || body.text.length > 400_000) return { status: 400, error: 'text is required' };
  const cur = readFileSync(join(dir, 'base.md'), 'utf8');
  if (typeof body.base_sha !== 'string') return { status: 400, error: 'base_sha is required' };
  if (body.base_sha !== shaOf(cur)) return { status: 409, error: "Claude's instructions changed since you opened them. Reload the page, then make your edit again." };
  const next = body.text.endsWith('\n') ? body.text : body.text + '\n';
  if (next === cur) return { status: 400, error: 'Nothing changed.' };
  const tmp = mkdtempSync(join(tmpdir(), 'tweak-'));
  let diff = '';
  try {
    writeFileSync(join(tmp, 'a'), cur); writeFileSync(join(tmp, 'b'), next);
    try { execFileSync('diff', ['-u', '--label', `a/agents/${body.agent}/base.md`, '--label', `b/agents/${body.agent}/base.md`, join(tmp, 'a'), join(tmp, 'b')], { encoding: 'utf8' }); }
    catch (e) { diff = e.stdout ?? ''; }
  } finally { rmSync(tmp, { recursive: true, force: true }); }
  let run; try { run = currentRun({ operator: who.operator }).run_id; } catch { run = 'dashboard'; }
  const pdir = join(ROOT, 'proposals', run);
  mkdirSync(pdir, { recursive: true });
  // number after both this checkout's and origin/main's files, so the other operator's merged tweak keeps its number
  const n = Math.max(0, ...[...readdirSync(pdir), ...lsMain(`proposals/${run}`)].map((f) => Number(f.match(/^(\d{3})-/)?.[1] ?? 0))) + 1;
  const num = String(n).padStart(3, '0');
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').replace(new RegExp(`^${body.agent}-`), '').slice(0, 48);
  const rel = `proposals/${run}/${num}-${body.agent}-${slug}.md`;
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(join(ROOT, rel), `# ${num} — ${body.agent}: ${title}\n\nFiled ${today} by ${who.human} from the dashboard (Agents → Edit as a suggested tweak). **Not applied.** Awaiting approval (gate d); on approval Claude applies the diff to \`agents/${body.agent}/base.md\`, bumps its version and adds a CHANGELOG line.\n\n**Target:** \`agents/${body.agent}/base.md\`\n\n## What changes\n\n${what}\n\n## Why\n\n${why}\n\n## Diff\n\n\`\`\`diff\n${diff.trimEnd()}\n\`\`\`\n`);
  const tw = join(ROOT, 'dashboard', 'tweaks.json');
  const twBefore = existsSync(tw) ? readFileSync(tw, 'utf8') : '';
  const plain = twBefore ? JSON.parse(twBefore) : {};
  const name = body.agent.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
  plain[rel] = { title, agent: name, what, why, status: 'pending' };
  const twAfter = JSON.stringify(plain, null, 2) + '\n';
  writeFileSync(tw, twAfter);
  const logged = logWork(who, '-', `${body.agent}: ${who.human} suggested a tweak to Claude's instructions from the dashboard: ${title}`, [rel, 'dashboard/tweaks.json']);
  const pr = {
    root: ROOT,
    author: who.git,
    branch: `${who.operator}/agent-tweak-${body.agent}-${slug.slice(0, 32).replace(/-$/, '')}-${stamp()}`,
    message: `proposals/${run}: suggested tweak to ${body.agent} — ${title} (from the dashboard)`,
    title: `Suggested tweak to ${body.agent}: ${title}`,
    body: `## What changes\n\n${what}\n\n## Why\n\n${why}\n\nFiled by ${who.human} from the dashboard as a suggested tweak to Claude's instructions for the ${body.agent} agent. This PR adds the suggestion only (\`${rel}\`); \`agents/${body.agent}/base.md\` is unchanged. Approve or reject it on the Decisions page; Claude applies it after approval.\n\nOpened by the dashboard on save.`,
    // tweaks.json is the page's plain summary; left out when main's copy differs (it has none yet)
    files: [{ rel, before: '', after: readFileSync(join(ROOT, rel), 'utf8') }, { rel: 'dashboard/tweaks.json', before: twBefore, after: twAfter, optional: true }, { rel: 'activity.jsonl', append: logged }],
  };
  return { status: 201, file: rel, pr };
}

// A save's PR (dashboard/publish.mjs). A failed one is kept in memory so the page can offer
// "Try the PR again" (POST /agent-pr {retry}); the local save stands either way.
const failedPrs = new Map();
async function tryPr(spec) {
  try { const r = await openPr(spec); return { pr: r.pr, branch: r.branch }; }
  catch (e) { const id = randomUUID(); failedPrs.set(id, { ...spec, pushed: Boolean(e.pushed) }); return { pr_error: String(e.message ?? e), retry: id }; }
}

// ---- agent fix: the dashboard button starts .github/workflows/agent-fix.yml (Claude in Actions applies the
// fix and pushes a branch); this server then opens the PR with its own gh login, so the review runs on it.
// Shahar, 2026-10-27: pressing the button is the approval; no prompt to paste, no second approval.
// branch -> { agent, state: running|pr|done|failed, pr?, error?, at }; kept on disk, so a restart (every merge to
// main) does not forget a fix that is still running
const FIXES_FILE = join(homedir(), '.oneshot', 'agent-fixes.json');
const fixes = new Map((() => { try { return Object.entries(JSON.parse(readFileSync(FIXES_FILE, 'utf8'))); } catch { return []; } })());
const saveFixes = () => { try { mkdirSync(dirname(FIXES_FILE), { recursive: true }); writeFileSync(FIXES_FILE, JSON.stringify(Object.fromEntries(fixes))); } catch {} };
const sh = (cmd, args) => new Promise((ok, no) => execFile(cmd, args, { cwd: ROOT, timeout: 120_000 }, (e, out, err) => (e ? no(new Error(String(err || e.message).trim().split('\n').pop())) : ok(String(out).trim()))));
async function startFix({ agent, brief }, who) {
  if (!/^[a-z0-9-]+$/.test(String(agent ?? '')) || !existsSync(join(ROOT, 'agents', agent, 'base.md'))) return { status: 400, error: 'unknown agent' };
  if (typeof brief !== 'string' || !brief.trim() || brief.length > 20_000) return { status: 400, error: 'brief must be text' };
  const running = [...fixes.entries()].find(([, f]) => f.agent === agent && f.state === 'running');
  if (running) return { status: 409, error: 'a fix for this agent is already running', branch: running[0] };
  const branch = `agent-fix/${agent}-${new Date().toISOString().replace(/\D/g, '').slice(0, 14)}`;
  // repository_dispatch: the box's token has contents: write but not actions: write (workflow_dispatch was a 403)
  const tmp = mkdtempSync(join(tmpdir(), 'agent-fix-')); const payload = join(tmp, 'payload.json');
  writeFileSync(payload, JSON.stringify({ event_type: 'agent-fix', client_payload: { agent, operator: who.operator ?? 'shahar', branch, brief } }));
  try { await sh('gh', ['api', 'repos/{owner}/{repo}/dispatches', '--input', payload]); }
  catch (e) { return { status: 502, error: `GitHub refused to start the fix: ${e.message ?? e}` }; }
  finally { rmSync(tmp, { recursive: true, force: true }); }
  fixes.set(branch, { agent, state: 'running', at: new Date().toISOString() }); saveFixes(); notify('agent-fix');
  return { status: 201, branch };
}

// Every pushed agent-fix branch gets its PR, also one pushed while this server was restarting (a merge
// to main restarts it). The sweep is the only place PRs are opened, so a branch never gets two.
let sweeping = false;
async function sweepFixes() {
  if (sweeping) return; sweeping = true;
  try {
    const heads = (await sh('git', ['ls-remote', '--heads', 'origin', 'agent-fix/*'])).split('\n').map((l) => l.split('refs/heads/')[1]).filter(Boolean);
    for (const branch of heads) {
      const f = fixes.get(branch);
      if (f?.state === 'pr' || f?.state === 'done') continue;
      const open = await sh('gh', ['pr', 'list', '--head', branch, '--state', 'all', '--json', 'url', '-q', '.[0].url']);
      // --fill reads the local branch, which this checkout does not have: title and body come from the commit
      const msg = open ? '' : await sh('gh', ['api', `repos/{owner}/{repo}/commits/${branch}`, '-q', '.commit.message']);
      const pr = open || await sh('gh', ['pr', 'create', '--base', 'main', '--head', branch, '--title', msg.split('\n')[0], '--body', msg.split('\n').slice(2).join('\n') || msg.split('\n')[0]]);
      fixes.set(branch, { ...(f ?? { agent: branch.replace(/^agent-fix\/|-\d{14}$/g, ''), at: null }), state: 'pr', pr });
      if (!open) notify('agent-fix');
    }
    // An open PR means the fix is still applying; merged or closed, it is done (the agent's state takes over)
    for (const [, f] of fixes) if (f.state === 'pr') { const st = await sh('gh', ['pr', 'view', f.pr, '--json', 'state', '-q', '.state']).catch(() => 'OPEN'); if (st !== 'OPEN') { f.state = 'done'; notify('agent-fix'); } }
    for (const [, f] of fixes) if (f.state === 'running' && Date.now() - Date.parse(f.at) > 45 * 60_000) { f.state = 'failed'; f.error = 'no branch after 45 minutes; see the Agent fix workflow in GitHub Actions'; notify('agent-fix'); }
  } catch (e) { console.error(`agent-fix sweep: ${e.message ?? e}`); }
  finally { saveFixes(); sweeping = false; }
}
setInterval(sweepFixes, 30_000).unref(); setTimeout(sweepFixes, 5_000).unref();

// ---- thumbnails -------------------------------------------------------------------------------------
let previewCache = { at: 0, urls: {} };
function previewUrl(slug) {
  if (Date.now() - previewCache.at > 60_000) {
    const urls = {};
    for (const b of buildData({ ledgerPath: LEDGER, operator: FIXED?.operator ?? null }).businesses) if (b.preview_url) urls[b.slug] = b.preview_url;
    previewCache = { at: Date.now(), urls };
  }
  return previewCache.urls[slug] ?? null;
}
// Which URL each cached picture was shot from, so a corrected preview URL doesn't wait out the cache.
// Kept on disk: a restart must not reshoot every picture.
const THUMB_URLS = join(DIST, 'img', '.urls.json');
let thumbUrls = {};
try { thumbUrls = JSON.parse(readFileSync(THUMB_URLS, 'utf8')); } catch { /* none yet */ }
const shooting = new Map(); // slug → the shot in flight
// A preview that is down is not shot again for 5 minutes: each shot can hold the one browser for 30 s.
const SHOT_RETRY_MS = 300_000, shotFailed = new Map(); // slug → { url, at } of the last failed shot
function reshoot(slug, url, out) {
  if (!shooting.has(slug)) {
    const tmp = join(DIST, 'img', `${slug}.tmp.jpg`); // shot beside the picture, swapped in whole: a reader never gets half a file
    shooting.set(slug, shootThumb(url, tmp).then(() => {
      renameSync(tmp, out); thumbUrls[slug] = url; writeFileSync(THUMB_URLS, JSON.stringify(thumbUrls));
    }).catch((e) => {
      shotFailed.set(slug, { url, at: Date.now() }); console.warn(`thumb ${slug}: could not shoot ${url}: ${e.message.split('\n')[0]}`); throw e;
    }).finally(() => shooting.delete(slug)));
  }
  return shooting.get(slug);
}
// A picture on disk is served at once; when it is old or from another URL the new shot runs behind it.
async function serveThumb(res, slug) {
  if (!/^[a-z0-9-]+$/.test(slug)) return send(res, 400, { error: 'bad slug' });
  const out = join(DIST, 'img', `${slug}.jpg`);
  const url = previewUrl(slug);
  if (!thumbFresh(out) || (url && thumbUrls[slug] !== url)) {
    if (!url) return send(res, 404, { error: `${slug} has no preview URL` });
    const f = shotFailed.get(slug), have = existsSync(out);
    if (f && f.url === url && Date.now() - f.at < SHOT_RETRY_MS) { if (!have) return send(res, 502, { error: `could not shoot ${url} a moment ago; trying again in a few minutes` }); }
    else {
      const job = reshoot(slug, url, out);
      if (have) job.catch(() => {}); // already logged in reshoot
      else try { await job; } catch (e) { return send(res, 502, { error: `could not shoot ${url}: ${e.message}` }); }
    }
  }
  serveFile(res, out);
}

// ---- live updates ---------------------------------------------------------------------------------
const clients = new Set();
let timer = null;
function notify(what) {
  clearTimeout(timer);
  timer = setTimeout(() => { for (const res of clients) res.write(`event: data\ndata: ${JSON.stringify({ changed: what, at: new Date().toISOString() })}\n\n`); }, 300);
}
try { watch(DIST, () => notify('build')); } catch { /* the page then reloads on the next data change */ }
for (const rel of ['ledger.jsonl', 'activity.jsonl', 'runs', 'proposals', 'sites', 'expenses.jsonl', 'revenues.jsonl', 'media', 'agents', 'dashboard/tweaks.json']) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) continue;
  try { watch(abs, { recursive: statSync(abs).isDirectory() }, (_e, f) => notify(f ? `${rel}/${f}` : rel)); } catch { /* recursive watch unsupported: ledger still watched */ }
}
if (LEDGER !== join(ROOT, 'ledger.jsonl') && existsSync(LEDGER)) watch(LEDGER, () => notify('ledger'));
// What the other operator merged reaches this page through origin/main.
if (SYNC_S > 0) {
  const sync = async () => { if (await fetchMain()) notify('origin/main'); };
  sync(); setInterval(sync, SYNC_S * 1000).unref();
}

// ---- http -----------------------------------------------------------------------------------------
const send = (res, status, body, type = 'application/json') => { res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' }); res.end(typeof body === 'string' ? body : JSON.stringify(body)); };
const safeUnder = (base, rel) => { const p = normalize(join(base, rel)); return p.startsWith(base + sep) || p === base ? p : null; };
// The page's build: changes with every deploy of dist/index.html, so open tabs know to reload
let buildCache = { mtime: 0, id: null };
function buildId() {
  try { const m = statSync(join(DIST, 'index.html')).mtimeMs; if (m !== buildCache.mtime) buildCache = { mtime: m, id: createHash('sha1').update(readFileSync(join(DIST, 'index.html'))).digest('hex').slice(0, 12) }; return buildCache.id; } catch { return null; }
}
function serveFile(res, abs) {
  if (!abs || !existsSync(abs) || statSync(abs).isDirectory()) return send(res, 404, { error: 'not found' });
  res.writeHead(200, { 'content-type': MIME[extname(abs).toLowerCase()] ?? 'application/octet-stream', 'cache-control': 'no-store' });
  createReadStream(abs).pipe(res);
}

function handle(req, res, who) {
  const hostname = String(req.headers.host ?? '').toLowerCase().replace(/:\d+$/, '');
  if (!HOSTS.has(hostname)) return send(res, 403, { error: `host "${hostname}" not allowed; start the server with --allow-host ${hostname || '<host>'}` });
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = decodeURIComponent(url.pathname);
  if (req.method === 'GET' && (path === '/' || path === '/index.html')) return serveFile(res, join(DIST, 'index.html'));
  if (req.method === 'GET' && path === '/data.json') { markPitchLive(buildData({ ledgerPath: LEDGER, operator: who.operator })).then((d) => send(res, 200, { ...d, live: LIVE.current(), fixes: Object.fromEntries(fixes), build: buildId() }), (e) => send(res, 500, { error: String(e.message ?? e) })); return; }
  if (req.method === 'GET' && path === '/live') return send(res, 200, LIVE.current());
  if (req.method === 'GET' && path === '/events') {
    res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-store', connection: 'keep-alive' });
    res.write(`event: hello\ndata: ${JSON.stringify({ at: new Date().toISOString() })}\n\n`);
    clients.add(res); req.on('close', () => clients.delete(res)); return;
  }
  if (req.method === 'GET' && path.startsWith('/files/')) {
    const rel = path.slice('/files/'.length);
    const abs = safeUnder(ROOT, rel); // test the resolved path: "sites/../x" starts with a prefix and is not under one
    if (!abs || !FILE_PREFIXES.some((p) => abs.startsWith(join(ROOT, p)))) return send(res, 403, { error: 'not a readable prefix' });
    return serveFile(res, abs);
  }
  if (req.method === 'GET' && path.startsWith('/thumb/') && path.endsWith('.jpg')) { serveThumb(res, path.slice(7, -4)).catch((e) => { if (!res.headersSent) send(res, 500, { error: String(e.message ?? e) }); }); return; }
  if (req.method === 'GET' && path === '/gates') return send(res, 200, { gates: buildData({ ledgerPath: LEDGER, operator: who.operator }).gates, decisions: Object.fromEntries(Object.entries(DECISIONS).map(([k, v]) => [k, { from: v.from, choices: v.choices, ...(v.choiceHelp && { help: v.choiceHelp }) }])) });
  if (req.method === 'POST' && (path === '/agent-rules' || path === '/agent-tweak')) {
    if (!/^application\/json\b/i.test(req.headers['content-type'] ?? '')) return send(res, 415, { error: 'content-type must be application/json' });
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 1_000_000) req.destroy(); });
    req.on('end', () => {
      let body; try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'body must be JSON' }); }
      if (!body || typeof body !== 'object' || Array.isArray(body)) return send(res, 400, { error: 'body must be a JSON object' });
      let out; try { out = path === '/agent-rules' ? saveRules(body, who) : suggestTweak(body, who); } catch (e) { return send(res, 500, { error: String(e.message ?? e) }); }
      if (out.status !== 201) return send(res, out.status, out);
      notify(path.slice(1));
      const { pr, ...saved } = out;
      tryPr(pr).then((r) => send(res, 201, { ...saved, ...r }));
    });
    return;
  }
  if (req.method === 'GET' && path === '/agent-fix') return send(res, 200, Object.fromEntries(fixes));
  if (req.method === 'POST' && path === '/agent-fix') {
    if (!/^application\/json\b/i.test(req.headers['content-type'] ?? '')) return send(res, 415, { error: 'content-type must be application/json' });
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 40_000) req.destroy(); });
    req.on('end', () => {
      let body; try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'body must be JSON' }); }
      startFix(body ?? {}, who).then((out) => send(res, out.status, out), (e) => send(res, 500, { error: String(e.message ?? e) }));
    });
    return;
  }
  if (req.method === 'POST' && path === '/agent-pr') {
    if (!/^application\/json\b/i.test(req.headers['content-type'] ?? '')) return send(res, 415, { error: 'content-type must be application/json' });
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 4_000) req.destroy(); });
    req.on('end', () => {
      let body; try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'body must be JSON' }); }
      const spec = failedPrs.get(String(body?.retry ?? ''));
      if (!spec) return send(res, 404, { error: 'Nothing to retry (the server was restarted, or the PR was opened). Save again to open a PR.' });
      failedPrs.delete(String(body.retry));
      tryPr(spec).then((r) => send(res, 201, r));
    });
    return;
  }
  if (req.method === 'POST' && (path === '/handoff' || path === '/handoff-decide')) {
    if (!/^application\/json\b/i.test(req.headers['content-type'] ?? '')) return send(res, 415, { error: 'content-type must be application/json' });
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 64_000) req.destroy(); });
    req.on('end', () => {
      let body; try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'body must be JSON' }); }
      if (!body || typeof body !== 'object' || Array.isArray(body)) return send(res, 400, { error: 'body must be a JSON object' });
      let out; try { out = path === '/handoff' ? handoff(body, who) : handoffDecision(body, who); } catch (e) { return send(res, 500, { error: String(e.message ?? e) }); }
      if (out.status !== 201) return send(res, out.status, out);
      notify('handoff');
      const { pr, ...saved } = out;
      // A test ledger (--ledger) marks a test server: the line stays local.
      if (!pr || LEDGER !== join(ROOT, 'ledger.jsonl')) return send(res, 201, saved);
      tryPr(pr).then((r) => send(res, 201, { ...saved, ...r }));
    });
    return;
  }
  if (req.method === 'POST' && path === '/decide') {
    // A page on another origin can send text/plain or a form without a preflight; JSON it cannot.
    if (!/^application\/json\b/i.test(req.headers['content-type'] ?? '')) return send(res, 415, { error: 'content-type must be application/json' });
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 64_000) req.destroy(); });
    req.on('end', () => {
      let body; try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'body must be JSON' }); }
      if (!body || typeof body !== 'object' || Array.isArray(body)) return send(res, 400, { error: 'body must be a JSON object' });
      let out; try { out = decide(body, who); } catch (e) { return send(res, 500, { error: String(e.message ?? e) }); }
      if (out.status !== 201) return send(res, out.status, out);
      notify('decision');
      const { pr, ...saved } = out;
      if (!pr) return send(res, 201, saved);
      tryPr(pr).then((r) => send(res, 201, { ...saved, ...r }));
    });
    return;
  }
  if (req.method === 'GET') return serveFile(res, safeUnder(DIST, path.slice(1)));
  send(res, 405, { error: 'method not allowed' });
}
// One bad request must not take the control layer down: a throw in a handler is an uncaught exception.
// A heartbeat from an operator's machine: bearer box key, no Access login (tools/heartbeat.mjs).
function status(req, res) {
  if (!bearerOk(req.headers.authorization, BOX_KEY)) return send(res, 401, { error: 'bearer key required' });
  if (req.method === 'GET') return send(res, 200, LIVE.snapshot());
  let raw = '';
  req.on('data', (c) => { raw += c; if (raw.length > 8_000) req.destroy(); });
  req.on('end', () => {
    let body; try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'body must be JSON' }); }
    let line; try { line = validateLive(body, team()); } catch (e) { return send(res, e.status ?? 400, { error: e.message }); }
    const cur = LIVE.add(line);
    notify('live');
    send(res, 201, { ok: true, operator: line.operator, state: cur.station ? 'running' : line.kind });
  });
}
if (BOX) { // a laptop: the strip is the box's picture
  const pullBox = async () => { const s = await pullLive(BOX); if (s) { LIVE.replace(s); notify('live'); } };
  pullBox(); setInterval(pullBox, 30_000).unref();
}

const server = createServer(async (req, res) => {
  const path = (() => { try { return decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { return ''; } })();
  if (BOX_KEY && (path === '/status' || (path === '/live' && req.headers.authorization)) && (req.method === 'POST' || req.method === 'GET')) {
    try { return status(req, res); } catch (e) { return send(res, 500, { error: String(e.message ?? e) }); }
  }
  let who = FIXED;
  if (ACCESS) {
    try { who = identity((await ACCESS(req)).operator); }
    catch (e) { return send(res, e.status ?? 502, { error: e.status ? e.message : `Access check failed: ${e.message}` }); }
  }
  try { handle(req, res, who); } catch (e) {
    if (res.headersSent) return res.end();
    send(res, e instanceof URIError || e.code === 'ERR_INVALID_URL' ? 400 : 500, { error: String(e.message ?? e) });
  }
});

server.listen(PORT, HOST, () => console.log(`dashboard server on http://${HOST}:${PORT}  dist=${DIST}  ledger=${LEDGER}`));
