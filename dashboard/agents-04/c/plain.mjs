// Plain words from the ledger's notes, mechanically and without adding facts: the notes are written for Claude
// (file names, station codes, field paths, PASS/FAIL). Each function below either counts what a note states,
// quotes words that are in it (yours, or the site's copy), or swaps a technical token for its plain name.
const NUMW = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
const FILES = {
  'sources.md': 'the source list', 'review.md': 'the review', 'en.json': 'the copy', 'en.draft.json': 'the draft copy',
  'dossier.json': 'the facts', 'concepts.md': 'the concepts', 'references.md': 'the references', 'base.md': 'its instructions',
  'custom.md': 'your rules', 'audit.json': 'the audit', 'audit.md': 'the audit', 'content.json': 'the content', 'notes.md': 'the notes',
  'playbook.md': 'the playbook', 'deploy.json': 'the deploy record',
};
const STATION = { a: 'copywriting', b: 'humanising', c: 'copy review', d: 'concepts', e: 'mockups', f: 'mockup scoring', g: 'the build' };
const words = (id) => id.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_.]+/g, ' ').toLowerCase();
const singular = (w) => w.replace(/ies$/, 'y').replace(/([^s])s$/, '$1');

let NAMES = {};
export const setNames = (m) => { NAMES = m; };
const AGENT_IDS = { 'creative-director': 'creative director', 'visual-critic': 'visual critic', 'experience-critic': 'experience critic' };
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function clean(s) {
  let t = String(s || '');
  t = t.replace(/\b(?:sites|reports|dossier|proposals)\/[^\s,;)]+/g, '');
  t = t.replace(/\s*(?:Reports?|Evidence|Sources?): [^\s]*(?:reports|sites|dossier)\/[^\s]+\.?/g, '');
  t = t.replace(/\bDossier kept on disk\.?/gi, '');
  t = t.replace(/\bmode: test replacement:\s*/gi, 'A replacement pick: ').replace(/\bmode: test\s*[—–:-]?\s*/gi, '');
  t = t.replace(/\b(20\d\d)-(\d\d)-(\d\d)\b/g, (m, y, mo, d) => `${+d} ${MON[+mo - 1]}`);
  t = t.replace(/\b[a-z0-9]+(?:-[a-z0-9]+)+\b/g, (m) => NAMES[m] || AGENT_IDS[m] || Object.entries(NAMES).find(([k]) => k.startsWith(m + '-'))?.[1] || m);
  t = t.replace(/\bstock-\d+\b/g, 'the stock photo').replace(/\bcheck-places\b/g, 'the place check');
  t = t.replace(/\bproposal \d{3}\b/gi, 'a suggested tweak').replace(/\bIG\b/g, 'Instagram');
  t = t.replace(/\bpresence (\d)\b/g, 'web presence $1 of 5');
  t = t.replace(/\bREJECTED\b/g, 'Rejected').replace(/\bpick gate\b/g, 'pick').replace(/\bgate[- ]a\b/gi, 'shortlist')
    .replace(/\bgate (answers?|question)\b/g, '$1').replace(/\bat the gate\b/g, 'at your decision').replace(/\bthe gate\b/g, 'your decision');
  t = t.replace(/^gate a reversed by Shahar:\s*/i, 'You reversed your approval: ');
  t = t.replace(/^gate a:\s*/i, '').replace(/^gate:\s*/i, '');
  t = t.replace(/\bdropped by Shahar:/i, 'You dropped it:');
  // file names and paths
  t = t.replace(/`?(?:[\w-]+\/)*([\w-]+(?:\.[\w-]+)*\.(?:md|json|mjs|js|yaml|yml|html|txt|png|jpg|geojson))`?/g, (m, f) => FILES[f] || FILES[f.toLowerCase()] || '');
  t = t.replace(/\b(?:tools|scripts)\/[\w./-]+/g, '');
  // station codes, versions, section marks
  t = t.replace(/\bstation (\d)([a-g])\b/gi, (m, n, l) => STATION[l]);
  t = t.replace(/\b4([a-g])\b/g, (m, l) => STATION[l]);
  t = t.replace(/\bstation 5\b/gi, 'critique').replace(/\bstation 6\b/gi, 'the preview deploy');
  t = t.replace(/\s*\bv?\d+\.\d+\.\d+\b/g, '').replace(/\s*§\s?\d+(?:\.\d+)?/g, '');
  // verdict words
  t = t.replace(/\bPASS\b/g, 'passed').replace(/\bFAILS\b/g, 'fails').replace(/\bFAIL(?:ED)?\b/g, 'sent back').replace(/\bHF-\d+:\s*/g, '');
  t = t.replace(/\bBLOCK-SCOPED\b/g, 'Block-only');
  // field paths: copyBlocks[1] -> copy block 2, contact.address -> contact address, beach_lodging -> beach lodging
  t = t.replace(/\b([A-Za-z_]+)\[(\d+)\]/g, (m, id, n) => `${singular(words(id))} ${Number(n) + 1}`);
  t = t.replace(/\b([A-Za-z_]+)\[\]/g, (m, id) => words(id));
  t = t.replace(/\b[a-z]+(?:\.[a-zA-Z_]+)+\b/g, (m) => (/^(e\.g|i\.e)$/.test(m) ? m : words(m)));
  t = t.replace(/\b[a-z]+[A-Z][A-Za-z]*\b/g, (m) => words(m));
  t = t.replace(/\b[a-z]+_[a-z_]+\b/g, (m) => words(m));
  t = t.replace(/`([^`]*)`/g, '$1');
  // names: the notes speak of Shahar in the third person; the page speaks to him
  t = t.replace(/\bShahar's\b/g, 'your').replace(/\bShahar\b/g, 'you');
  t = t.replace(/\b([Yy]ou) (approve|allow|pick|order|name|override|ask|say|want|reverse)s\b/g, '$1 $2');
  t = t.replace(/\b[Dd]ossier\b/g, 'facts').replace(/\bpost-gate\b/g, 'new');
  t = t.replace(/\b(\d+) unsourced\b/g, '$1 claims without a source').replace(/\bunsourced\b/g, 'without a source');
  t = t.replace(/\b(round-\d|copyeditor) fail\b/g, '$1 send-back');
  t = t.replace(/^shortlist reversed by you:\s*/i, 'You reversed your approval: ').replace(/^shortlist:\s*/i, '');
  t = t.replace(/\bthe ((?:[\w-]+ ){0,2})the (source list|review|copy|facts|concepts|audit)\b/g, 'the $1$2');
  // tidy
  t = t.replace(/\(\s*[,;+]?\s*\)/g, '').replace(/\s+([,.;:)])/g, '$1').replace(/([(])\s+/g, '$1').replace(/\s{2,}/g, ' ')
    .replace(/(^|[.!?]\s+)([a-z])/g, (m, p, c) => p + c.toUpperCase()).trim();
  t = t.replace(/^You on the (.*?) send-back\b/, 'Your answer to the $1 send-back').replace(/^You on /, 'Your answer on ').replace(/^You, standing rule/, 'Your standing rule');
  return t;
}
const cut = (s, n) => (s.length > n ? s.slice(0, n).replace(/\s+\S*$/, '') + '…' : s);
export const firstSentence = (s, n = 240) => {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  const m = t.match(/^(.{12,}?[.!?])(\s+(?=[A-Z"“'(])|$)/);
  return cut(m ? m[1] : t, n);
};
const num = (note, re) => { const m = note.match(re); if (!m) return 0; return /^\d+$/.test(m[1]) ? +m[1] : NUMW[m[1].toLowerCase()] || 0; };
const N = '(\\d+|one|two|three|four|five|six|seven|eight|nine|ten)';
// lines of the site's copy that a checker quoted, after its verdict
function fragments(note, max = 3) {
  const at = note.search(/\bFAIL\b/); const s = at >= 0 ? note.slice(at) : note;
  const out = []; const re = /(?:^|[\s(:])['"“]([^'"”]{3,90})['"”](?=[\s),.;:]|$)/g; let m;
  while ((m = re.exec(s)) && out.length < max) if (!/\.(md|json)\b|\[|_/.test(m[1])) out.push(m[1]);
  return out;
}
// the copyeditor's verdict, counted from what the note states
export function copySay(note, ok) {
  if (ok) {
    const rows = num(note, /(\d+) (?:claim rows|rows|claims)/);
    return { say: rows ? `${rows} lines checked against the facts, none without a source.` : 'Every claim it checked had a source.' };
  }
  const uns = num(note, new RegExp(N + ' unsourced', 'i')), con = num(note, new RegExp(N + ' contradicted', 'i'));
  const voice = num(note, /(\d+) voice(?: fails?)?(?![\s/]*\d)/);
  const dup = /duplicat|restates/i.test(note);
  const parts = [];
  if (uns) parts.push(`${uns} claim${uns > 1 ? 's' : ''} with no source in the facts`);
  if (con) parts.push(`${con} that contradicted the facts`);
  if (voice) parts.push(`${voice} wording problem${voice > 1 ? 's' : ''}`);
  if (dup) parts.push('a fact said twice');
  const txt = parts.length ? parts.join(', ') + '.' : 'Over the lines quoted below.';
  return { say: txt[0].toUpperCase() + txt.slice(1), quotes: fragments(note), cats: { uns, con, voice, dup } };
}
// the critic's round: verdict, score, and whether its hard fail was the copy (the critic's own words)
export function critSay(note, ok, score) {
  const sc = score != null ? `${score} of 100` : (note.match(/(\d+(?:\.\d+)?)\/(\d+)/) ? note.match(/(\d+(?:\.\d+)?)\/(\d+)/).slice(1).join(' of ') : null);
  if (ok) return { say: sc ? `Scored ${sc}.` : 'Passed.', cause: null };
  const copy = /hard fail from (the passed|unchanged) copy/i.test(note);
  return { say: `${sc ? `Scored ${sc}, with ` : 'With '}${copy ? 'a hard fail on copy facts that had passed copy review' : 'a hard fail in the build'}.`, cause: copy ? 'copy' : 'build' };
}
// your own words in a note: Verbatim "…", else the quoted gate answers
export function yourWords(note, n = 260) {
  const v = note.match(/Verbatim:?\s*"([^"]+)"/i) || note.match(/(?:you|Shahar)[^"]{0,40}:\s*"([^"]+)"/i);
  if (v) return cut(clean(v[1]), n);
  const a = note.match(/answers?[^']{0,48}'([^']{3,60})'/) || note.match(/(?:^|[^A-Za-z])'([^']{3,60})'(?![A-Za-z])/);
  return a ? `“${clean(a[1])}”` : null;
}
export function stepSay(note) {
  const first = firstSentence(clean(note.replace(/\s*Verbatim:?\s*"[^"]*"?.*$/s, '').replace(/:\s*$/, '.')), 200);
  return { say: first, words: yourWords(note) };
}
export function mockSay(note, ok, voided) {
  const w = yourWords(note);
  const first = firstSentence(clean(note.replace(/\s*Verbatim:?.*$/s, '').replace(/[:.]?\s*$/, '.')), 200);
  const bare = note.replace(/\b(?:sites|reports|proposals)\/[^\s,;)]+/g, '');
  return { say: voided ? first : ok ? 'You picked one.' : /["“]/.test(first) ? 'No pick.' : first, words: w, rejected: !ok && /\brejected\b|\bfar off\b/i.test(bare) };
}
export const dropSay = (note) => firstSentence(clean(note), 260);

// what is left after cleaning that still reads as jargon (used by the build as a check)
export const JARGON = /\.(md|json|mjs|js|yaml|yml|html|geojson)\b|\bFAIL\b|\bPASS\b|\w\[\d*\]|\b\d+\.\d+\.\d+\b|`|\b[Ss]tation \d|\b4[a-g]\b|\b[a-z]+_[a-z]+\b|\b[a-z]+[A-Z][a-z]+\b|§|\b[Gg]ate a\b|\b[Dd]ossier\b|\bmode: test\b/;
