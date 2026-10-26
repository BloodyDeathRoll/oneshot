#!/usr/bin/env node
// tools/handoff.mjs — passing a business from one operator to the other (docs/handoff.md).
//
// Four steps, each one line in activity.jsonl (kind "handoff"), nothing for a human to run by hand:
//   requested  the other operator asks for the business (dashboard "Ask for handoff", or `request`)
//   approved | rejected   the owner answers on the dashboard (or `approve` / `reject`)
//   shipped    the owner's machine zips the business's media and parks it in R2 (`ship`, run by the
//              session-start hook whenever an approved handoff of theirs is waiting)
//   received   the new owner's machine downloads it, unpacks it into the checkout and the store,
//              deletes the R2 copy and takes the business (`take`, also run by the session-start hook)
// From `received` on, the business's owner is the receiver: the dashboard shows it as theirs and their
// sessions may advance it in its run (CLAUDE.md rule 5).
//
//   node tools/handoff.mjs status                 # every handoff and where it stands
//   node tools/handoff.mjs request <slug> "<why>" # ask the owner for a business (you are the receiver)
//   node tools/handoff.mjs approve <id> ["<note>"]
//   node tools/handoff.mjs reject  <id> "<why>"
//   node tools/handoff.mjs ship [slug]            # every approved handoff you own (or one), zip → R2
//   node tools/handoff.mjs take [slug]            # every shipped handoff addressed to you (or one)
//   node tools/handoff.mjs auto                   # ship + take whatever is waiting for you; quiet when nothing is
//   node tools/handoff.mjs check-r2               # credentials and bucket size
//
// The lines are appended locally (the local dashboard sees them at once) and each ship/take also opens
// its own PR (dashboard/publish.mjs), like a dashboard decision, so main carries the record.

import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { whoami, team, readActivity, ACTIVITY } from './team.mjs';
import { listRuns } from './run.mjs';
import { readJsonlMerged, showMain } from './origin.mjs';
import { readManifest, save as saveMedia } from './media.mjs';
import * as r2 from './r2.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const STEPS = ['requested', 'approved', 'rejected', 'shipped', 'received'];
const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const append = (line) => { appendFileSync(ACTIVITY, JSON.stringify(line) + '\n'); return line; };

// ---- reading ---------------------------------------------------------------------------------------

// Activity lines: this checkout's plus origin/main's (the other operator's merged lines).
export function activityMerged() { try { return readJsonlMerged('activity.jsonl'); } catch { return readActivity(); } }

// Every handoff with its state, from the lines (merged by default). Steps are matched by id.
export function handoffs(lines = activityMerged()) {
  const by = new Map();
  for (const l of lines) {
    if (l.kind !== 'handoff' || !l.id) continue;
    if (l.step === 'requested') { by.set(l.id, { id: l.id, slug: l.slug, from: l.from, to: l.to, by: l.operator, ts: l.ts, note: l.note ?? '', status: 'requested', steps: { requested: l } }); continue; }
    const h = by.get(l.id); if (!h) continue;
    h.steps[l.step] = l;
    if (l.step === 'approved' && h.status === 'requested') h.status = 'approved';
    else if (l.step === 'rejected' && h.status === 'requested') h.status = 'rejected';
    else if (l.step === 'shipped' && h.status === 'approved') { h.status = 'shipped'; h.shipped = { ts: l.ts, key: l.key, bytes: l.bytes, sha256: l.sha256, files: l.files }; }
    else if (l.step === 'received' && (h.status === 'shipped' || h.status === 'approved')) h.status = 'received';
  }
  return [...by.values()].map((h) => ({ ...h, open: !['rejected', 'received'].includes(h.status), last_ts: Object.values(h.steps).map((s) => s.ts).sort().at(-1) }));
}

// The operator a business belongs to: the receiver of its last completed handoff, else the run's operator.
export function ownerOf(slug, runOperator, lines = activityMerged()) {
  const done = handoffs(lines).filter((h) => h.slug === slug && h.status === 'received').sort((a, b) => a.steps.received.ts.localeCompare(b.steps.received.ts));
  return done.at(-1)?.to ?? runOperator ?? null;
}

const ledger = () => { try { return readJsonlMerged('ledger.jsonl'); } catch { return []; } };
// The run a business was last written under, and that run's operator.
export function businessRun(slug) {
  const lines = ledger().filter((l) => l.slug === slug);
  if (!lines.length) return null;
  const run_id = lines.at(-1).run_id;
  return { run_id, operator: listRuns().find((r) => r.run_id === run_id)?.operator ?? null, state: lines.at(-1).to_state };
}

// ---- the four steps ---------------------------------------------------------------------------------

export function request(slug, note, by = whoami(), lines = activityMerged()) {
  const ops = team();
  if (!ops[by]) throw new Error(`${by} is not in team.json`);
  const run = businessRun(slug);
  if (!run) throw new Error(`${slug} has no ledger line`);
  const from = ownerOf(slug, run.operator, lines);
  if (!from) throw new Error(`${slug}: nobody owns it (run ${run.run_id} has no operator)`);
  if (from === by) throw new Error(`${slug} is already yours`);
  if (handoffs(lines).some((h) => h.slug === slug && h.open)) throw new Error(`${slug} already has an open handoff`);
  const id = `h-${now().replace(/[-:TZ]/g, '').slice(0, 12)}-${Math.random().toString(36).slice(2, 6)}`;
  return append({ ts: now(), operator: by, slug, kind: 'handoff', step: 'requested', id, from, to: by, note: String(note ?? '').trim() });
}

export function decide(id, choice, note, by = whoami(), lines = activityMerged()) {
  if (!['approved', 'rejected'].includes(choice)) throw new Error('choice must be approved or rejected');
  const h = handoffs(lines).find((x) => x.id === id);
  if (!h) throw new Error(`no handoff ${id}`);
  if (h.status !== 'requested') throw new Error(`${id} is already ${h.status}`);
  if (h.from !== by) throw new Error(`${id}: only ${team()[h.from]?.name ?? h.from} (the owner) decides`);
  if (choice === 'rejected' && String(note ?? '').trim().length < 3) throw new Error('a reason is required to reject');
  return append({ ts: now(), operator: by, slug: h.slug, kind: 'handoff', step: choice, id, note: String(note ?? '').trim() });
}

// What is waiting for an operator: approved handoffs they own (to ship), shipped ones addressed to them (to take).
export function pending(op = whoami(), lines = activityMerged()) {
  const all = handoffs(lines);
  return { ship: all.filter((h) => h.status === 'approved' && h.from === op), take: all.filter((h) => h.status === 'shipped' && h.to === op), decide: all.filter((h) => h.status === 'requested' && h.from === op) };
}

const sha256 = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
const mb = (n) => `${(n / 1e6).toFixed(1)} MB`;

async function openPr(spec) {
  const { openPr: open } = await import(pathToFileURL(join(ROOT, 'dashboard/publish.mjs')).href);
  return open(spec);
}

// The block `ship` adds to notes/<slug>.md: where the business stands, for the receiver.
export function handoffNote(h, run, ops = team()) {
  const lines = ledger().filter((l) => l.slug === h.slug && l.run_id === run.run_id);
  const last = lines.at(-1);
  const urlOf = (re) => [...lines].reverse().map((l) => l.note?.match(re)?.[0]).find(Boolean) ?? null;
  const preview = urlOf(/https:\/\/[\w.-]+\.workers\.dev\/?(?![\w-])/);
  const gate = { shortlisted: 'approve the shortlist', planned: 'approve the research lanes', researched: 'confirm the direction with the client', mocked: 'pick a mockup', packaged: 'send the pitch', 'outcome:sale': "record the client's product choice" }[last?.to_state] ?? null;
  return [
    `## Handoff ${h.steps.approved?.ts.slice(0, 10) ?? now().slice(0, 10)}: ${ops[h.from]?.name ?? h.from} → ${ops[h.to]?.name ?? h.to}`,
    '',
    `- Requested by ${ops[h.to]?.name ?? h.to}: "${h.note}"`,
    `- State at handoff: **${last?.to_state ?? 'unknown'}** (${last?.ts.slice(0, 10) ?? ''}, run ${run.run_id}, run operator ${run.operator ?? 'none'})${gate ? `; next: a human ${gate}` : ''}`,
    preview ? `- Preview: ${preview}` : null,
    `- Media: shipped as one zip through R2 (${h.id}); \`node tools/handoff.mjs take ${h.slug}\` restores it and takes ownership.`,
    `- Owner from here: ${ops[h.to]?.name ?? h.to}. The run file is unchanged.`,
    '',
  ].filter((l) => l !== null).join('\n');
}

// Ship every approved handoff this operator owns (or one slug): zip the media present here → R2 → shipped line + PR.
export async function ship({ only = null, op = whoami(), dry = false, log = console.log } = {}) {
  const todo = pending(op).ship.filter((h) => !only || h.slug === only);
  if (!todo.length) { log(only ? `nothing to ship for ${only}` : 'nothing to ship'); return []; }
  const cfg = r2.loadConfig();
  const used = await r2.bucketBytes(cfg);
  if (used > r2.MAX_BUCKET_BYTES) throw new Error(`R2 bucket ${cfg.bucket} holds ${mb(used)}, over the ${mb(r2.MAX_BUCKET_BYTES)} guard; delete old handoff zips first (node tools/handoff.mjs check-r2)`);
  const out = [];
  for (const h of todo) {
    const rows = readManifest(h.slug).filter((r) => existsSync(join(ROOT, r.path)));
    const run = businessRun(h.slug);
    log(`${h.slug}: ${rows.length} media files here (${mb(rows.reduce((s, r) => s + r.bytes, 0))})`);
    if (dry) { out.push({ id: h.id, files: rows.length }); continue; }
    const tmp = mkdtempSync(join(tmpdir(), 'oneshot-handoff-'));
    try {
      const zip = join(tmp, `${h.slug}-${h.id}.zip`);
      if (rows.length) {
        const z = spawnSync('zip', ['-q', '-X', zip, '-@'], { cwd: ROOT, input: rows.map((r) => r.path).join('\n'), encoding: 'utf8' });
        if (z.status !== 0) throw new Error(`zip failed: ${z.stderr}`);
      } else writeFileSync(zip, Buffer.from('504b0506' + '00'.repeat(18), 'hex')); // an empty zip: the business has no media here
      const key = `${h.slug}/${h.id}.zip`;
      await r2.ensureLifecycle(cfg).catch((e) => log(`  lifecycle rule not set (${e.message.slice(0, 120)}); the zip is still deleted on take`));
      const bytes = await r2.put(cfg, key, zip);
      const line = append({ ts: now(), operator: op, slug: h.slug, kind: 'handoff', step: 'shipped', id: h.id, key, bytes, sha256: sha256(zip), files: rows.length });
      log(`  uploaded ${mb(bytes)} to r2://${cfg.bucket}/${key}`);
      // notes/<slug>.md gets the handoff block; the PR writes it only if main still has what we read
      const notesRel = `notes/${h.slug}.md`;
      const before = showMain(notesRel) ?? (existsSync(join(ROOT, notesRel)) ? readFileSync(join(ROOT, notesRel), 'utf8') : '');
      const block = handoffNote(h, run);
      const after = (before ? before.replace(/\s*$/, '\n\n') : `# ${h.slug}\n\n`) + block;
      const to = team()[h.to]?.name ?? h.to, from = team()[op]?.name ?? op;
      const pr = await openPr({
        root: ROOT, author: { name: team()[op]?.git_names?.[0] ?? from, email: team()[op]?.git_emails?.[0] ?? '' },
        branch: `${op}/handoff-ship-${h.slug.replace(/[^\w-]+/g, '-').slice(0, 40)}-${h.id.slice(2, 14)}`,
        message: `handoff: ${h.slug} shipped to ${to} (${from}, media in R2)`,
        title: `Handoff: ${h.slug} shipped to ${to}`,
        body: `${from} approved ${to}'s request and this machine shipped the media: ${rows.length} files, ${mb(bytes)}, parked in R2 as \`${key}\` until ${to} takes it.\n\n- \`activity.jsonl\`: the \`shipped\` line\n- \`${notesRel}\`: a handoff block (state, preview, next gate)\n\nMerge it so ${to}'s next session takes the business.\n\nOpened by tools/handoff.mjs ship.`,
        files: [{ rel: 'activity.jsonl', append: JSON.stringify(line) + '\n' }, { rel: notesRel, before, after, optional: true }],
      }).catch((e) => ({ pr_error: e.message }));
      if (!existsSync(join(ROOT, notesRel)) || readFileSync(join(ROOT, notesRel), 'utf8') === before) writeFileSync(join(ROOT, notesRel), after);
      log(pr.pr ? `  PR ${pr.pr}` : `  PR not opened: ${pr.pr_error}`);
      out.push({ id: h.id, key, bytes, files: rows.length, pr: pr.pr ?? null, pr_error: pr.pr_error ?? null });
    } finally { rmSync(tmp, { recursive: true, force: true }); }
  }
  return out;
}

// Take every shipped handoff addressed to this operator (or one slug): R2 → unzip → store → delete → received line + PR.
export async function take({ only = null, op = whoami(), log = console.log } = {}) {
  const todo = pending(op).take.filter((h) => !only || h.slug === only);
  if (!todo.length) { log(only ? `nothing to take for ${only}` : 'nothing to take'); return []; }
  const cfg = r2.loadConfig();
  const out = [];
  for (const h of todo) {
    const tmp = mkdtempSync(join(tmpdir(), 'oneshot-handoff-'));
    try {
      const zip = join(tmp, 'media.zip');
      log(`${h.slug}: downloading ${mb(h.shipped.bytes)} from r2://${cfg.bucket}/${h.shipped.key}`);
      const got = await r2.get(cfg, h.shipped.key, zip);
      if (got !== h.shipped.sha256) throw new Error(`${h.slug}: the zip's sha256 differs from the shipped line; not unpacked, R2 copy kept`);
      if (statSync(zip).size > 22) {
        const u = spawnSync('unzip', ['-n', '-q', zip, '-d', ROOT], { encoding: 'utf8' });
        if (u.status !== 0) throw new Error(`unzip failed: ${u.stderr}`);
      }
      const saved = saveMedia(h.slug); // into this machine's store; the manifest already lists these files
      const missing = readManifest(h.slug).filter((r) => !existsSync(join(ROOT, r.path))).length;
      log(`  unpacked ${h.shipped.files} files, ${saved.copied} copied to the store${missing ? `, ${missing} manifest files still missing (node tools/media.mjs restore ${h.slug})` : ', media complete'}`);
      await r2.del(cfg, h.shipped.key);
      log('  R2 copy deleted');
      const line = append({ ts: now(), operator: op, slug: h.slug, kind: 'handoff', step: 'received', id: h.id, note: `media unpacked (${h.shipped.files} files); R2 copy deleted; owner is now ${op}` });
      const to = team()[op]?.name ?? op, from = team()[h.from]?.name ?? h.from;
      const pr = await openPr({
        root: ROOT, author: { name: team()[op]?.git_names?.[0] ?? to, email: team()[op]?.git_emails?.[0] ?? '' },
        branch: `${op}/handoff-take-${h.slug.replace(/[^\w-]+/g, '-').slice(0, 40)}-${h.id.slice(2, 14)}`,
        message: `handoff: ${h.slug} taken by ${to} (from ${from})`,
        title: `Handoff: ${h.slug} → ${to}`,
        body: `${to}'s machine unpacked the media ${from} shipped (${h.shipped.files} files) and deleted the R2 copy. ${to} owns ${h.slug} from here (CLAUDE.md rule 5).\n\nOnly \`activity.jsonl\` changes: the \`received\` line.\n\nOpened by tools/handoff.mjs take.`,
        files: [{ rel: 'activity.jsonl', append: JSON.stringify(line) + '\n' }],
      }).catch((e) => ({ pr_error: e.message }));
      log(pr.pr ? `  PR ${pr.pr}` : `  PR not opened: ${pr.pr_error}`);
      const notes = join(ROOT, 'notes', `${h.slug}.md`);
      if (existsSync(notes)) log(`\n${readFileSync(notes, 'utf8').trim()}\n`);
      out.push({ id: h.id, files: h.shipped.files, pr: pr.pr ?? null, pr_error: pr.pr_error ?? null });
    } finally { rmSync(tmp, { recursive: true, force: true }); }
  }
  return out;
}

// ---- CLI --------------------------------------------------------------------------------------------
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [cmd, a, b] = process.argv.slice(2);
  const usage = () => { console.error(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(14, 22).map((l) => l.slice(3)).join('\n')); process.exit(2); };
  try {
    if (cmd === 'status') {
      const ops = team(), all = handoffs();
      if (!all.length) console.log('no handoffs yet');
      for (const h of all.sort((x, y) => y.last_ts.localeCompare(x.last_ts))) console.log(`${h.id}  ${h.slug.padEnd(32)} ${(ops[h.from]?.name ?? h.from)} → ${(ops[h.to]?.name ?? h.to)}  ${h.status.padEnd(9)} ${h.last_ts.slice(0, 16).replace('T', ' ')}${h.status === 'shipped' ? `  (${mb(h.shipped.bytes)} in R2)` : ''}  ${h.note ? '"' + h.note + '"' : ''}`);
      const p = pending();
      if (p.decide.length) console.log(`\nwaiting for your answer: ${p.decide.map((h) => `${h.slug} (${h.id})`).join(', ')}`);
      if (p.ship.length) console.log(`to ship from this machine: ${p.ship.map((h) => h.slug).join(', ')} — node tools/handoff.mjs ship`);
      if (p.take.length) console.log(`to take on this machine: ${p.take.map((h) => h.slug).join(', ')} — node tools/handoff.mjs take`);
    } else if (cmd === 'request' && a && b) console.log(request(a, b).id);
    else if (cmd === 'approve' && a) console.log(decide(a, 'approved', b ?? '').step);
    else if (cmd === 'reject' && a && b) console.log(decide(a, 'rejected', b).step);
    else if (cmd === 'ship') await ship({ only: a ?? null, dry: process.argv.includes('--dry') });
    else if (cmd === 'take') await take({ only: a ?? null });
    else if (cmd === 'auto') {
      const p = pending();
      if (!p.ship.length && !p.take.length) process.exit(0);
      if (!r2.hasConfig()) { console.log(`handoff waiting (${[...p.ship, ...p.take].map((h) => h.slug).join(', ')}) but no R2 credentials: docs/handoff.md "R2 setup"`); process.exit(0); }
      if (p.ship.length) await ship();
      if (p.take.length) await take();
    } else if (cmd === 'check-r2') { const c = await r2.check(); console.log(`${c.bucket}: ${c.objects} objects, ${mb(c.bytes)} (guard ${mb(r2.MAX_BUCKET_BYTES)}, lifecycle ${r2.EXPIRE_DAYS} days)`); }
    else usage();
  } catch (e) { console.error(e.message); process.exit(1); }
}
