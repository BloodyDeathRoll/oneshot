#!/usr/bin/env node
// tools/fetch-video.mjs — fetch a business-owned video and cut web renditions for a hero loop.
//
// Why: Shahar, 2026-09-28, after rejecting a run that could not use video — "Videos are much more
// engaging than images and whenever you find one you should use it!" The harvester runs this for
// every video a business publishes; the designer builds the hero from what it writes.
//
// Two modes, picked by the URL:
//   a list  (a YouTube/Vimeo channel, playlist or tab)  → prints every video in it and saves the
//           listing to assets/video/listings/; downloads nothing unless --max N.
//   a video (YouTube/Vimeo/Instagram/Facebook page, or a direct .mp4/.webm/.mov file)
//           → downloads the best source (yt-dlp, or a plain fetch for a file), makes a contact
//           sheet to look at, then the web renditions + poster, and records every file in
//           assets/index.json.
//
// Renditions (all muted — no audio track — H.264 high profile, yuv420p, +faststart; never upscaled):
//   <id>-d1920.mp4   desktop, 1920 w, target ≤ 4 MB
//   <id>-m1280.mp4   mobile,  1280 w, target ≤ 2 MB
//   <id>-m720.mp4    mobile,   720 w, target ≤ 2 MB
//   <id>-d1920.webm  AV1 (SVT-AV1) alternatives, same caps — skipped with --no-webm
//   <id>-m1280.webm
//   <id>-poster.jpg  + <id>-poster.avif   one frame at --poster-at, 1920 w
//   <id>-sheet.jpg   contact sheet of the whole source (for choosing the cut; not for the site)
//
// Licence: nothing here can know who owns a video. The caller says so with --license, and only
// "business-owned" is usable. With --channel, a yt-dlp source whose channel/uploader does not
// match is recorded as "unknown" whatever --license said. Never log in, never pass cookies.

import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const USAGE = `usage: node tools/fetch-video.mjs <slug> <url> [options]

  <url>   a business-owned video: a file on their site (.mp4/.webm/.mov), a YouTube or Vimeo
          video, an Instagram/Facebook reel reachable without login — or a channel / playlist,
          which is listed (and downloaded only with --max).

options
  --license business-owned|unknown   default unknown (unusable). business-owned only when the
                                     site/channel/account is the business's own.
  --license-note "<text>"            why, e.g. "YouTube channel linked from globalsurf.com footer"
  --channel <UC… id | @handle | url> expected owner; a yt-dlp source from anyone else is recorded
                                     as license "unknown"
  --start <s>          start of the hero cut, seconds (default 0)
  --length <s>         length of the hero cut, 8–20 s (default 12; shorter source = whole source)
  --poster-at <s>      poster frame, seconds from the SOURCE start (default start + 1)
  --describe "<text>"  what the video shows (goes into the index; fill after looking)
  --no-renditions      download + contact sheet only (look first, cut later: re-run with --start)
  --no-webm            skip the AV1 WebM alternatives
  --max <n>            list mode: also fetch the newest n videos (default 0 = list only)
  --dir <path>         dossier folder (default dossier/<slug>); files go in <dir>/assets/video/
  --help

Re-running on a URL already in the index reuses the downloaded source and replaces its
renditions, so a new cut costs one encode, not a download.`;

// ---------- args

const argv = process.argv.slice(2);
if (!argv.length || argv.includes('--help') || argv.includes('-h')) {
  console.log(USAGE);
  process.exit(argv.length ? 0 : 2);
}
const flags = {};
const pos = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (!a.startsWith('--')) { pos.push(a); continue; }
  const k = a.slice(2);
  if (['no-renditions', 'no-webm'].includes(k)) flags[k] = true;
  else flags[k] = argv[++i];
}
const [slug, url] = pos;
if (!slug || !url) { console.error(USAGE); process.exit(2); }
const LICENSES = ['business-owned', 'unknown'];
const license0 = flags.license ?? 'unknown';
if (!LICENSES.includes(license0)) { console.error(`--license must be one of ${LICENSES.join(', ')}`); process.exit(2); }
const num = (k, d) => (flags[k] === undefined ? d : Number(flags[k]));
for (const k of ['start', 'length', 'poster-at', 'max']) {
  if (flags[k] !== undefined && !Number.isFinite(Number(flags[k]))) { console.error(`--${k} must be a number`); process.exit(2); }
}

const YTDLP = [path.join(os.homedir(), '.local/bin/yt-dlp'), 'yt-dlp'].find((p) => has(p));
const DIR = flags.dir ?? path.join('dossier', slug);
const VDIR = path.join(DIR, 'assets', 'video');
const INDEX = path.join(DIR, 'assets', 'index.json');
fs.mkdirSync(VDIR, { recursive: true });

const RENDITIONS = [
  { tag: 'd1920', width: 1920, cap: 4_000_000, role: 'hero-desktop' },
  { tag: 'm1280', width: 1280, cap: 2_000_000, role: 'hero-mobile' },
  { tag: 'm720', width: 720, cap: 2_000_000, role: 'hero-mobile-small' },
];
const WEBM = ['d1920', 'm1280'];

// ---------- helpers

function has(bin) {
  return spawnSync(bin, ['--version'], { stdio: 'ignore' }).status === 0;
}
function run(bin, args, { quiet = true } = {}) {
  const r = spawnSync(bin, args, { encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 });
  if (r.status !== 0) {
    const err = (r.stderr || '').trim().split('\n').slice(-6).join('\n');
    throw new Error(`${path.basename(bin)} failed (${r.status}):\n${err}`);
  }
  if (!quiet) process.stderr.write(r.stderr || '');
  return r.stdout;
}
const ytdlp = (args) => {
  if (!YTDLP) throw new Error('yt-dlp not found (expected ~/.local/bin/yt-dlp)');
  return run(YTDLP, ['--no-warnings', '--no-playlist', '--no-cookies-from-browser', ...args]);
};
const sha256 = (f) => createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const rel = (f) => path.relative(DIR, f).split(path.sep).join('/');
const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const mb = (b) => `${(b / 1e6).toFixed(2)} MB`; // decimal MB, same unit as the caps
const timings = {};
const timed = async (label, fn) => {
  const t = Date.now();
  try { return await fn(); } finally { timings[label] = (timings[label] ?? 0) + (Date.now() - t); }
};

function probe(file) {
  const j = JSON.parse(run('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', file]));
  const v = j.streams.find((s) => s.codec_type === 'video');
  const a = j.streams.find((s) => s.codec_type === 'audio');
  const [n, d] = (v?.avg_frame_rate || '0/1').split('/').map(Number);
  return {
    width: v?.width ?? null,
    height: v?.height ?? null,
    duration_s: Number(Number(j.format?.duration ?? v?.duration ?? 0).toFixed(2)),
    fps: d ? Number((n / d).toFixed(3)) : null,
    codec: v?.codec_name ?? null,
    has_audio: Boolean(a),
    bytes: Number(j.format?.size ?? fs.statSync(file).size),
  };
}

function loadIndex() {
  if (!fs.existsSync(INDEX)) return [];
  const j = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
  if (!Array.isArray(j)) throw new Error(`${INDEX} is not a JSON array; refusing to rewrite it`);
  return j;
}
const saveIndex = (idx) => fs.writeFileSync(INDEX, JSON.stringify(idx, null, 1) + '\n');

const isFile = (u) => /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(u);

function flatten(info, out = []) {
  for (const e of info.entries ?? []) {
    if (e?._type === 'playlist' || (e?.entries && !e.duration)) flatten(e, out);
    else if (e) out.push({ id: e.id, title: e.title ?? null, duration_s: e.duration ?? null, url: e.url || e.webpage_url || null, view_count: e.view_count ?? null });
  }
  return out;
}

function ownerMatches(meta, expected) {
  if (!expected) return true;
  const want = expected.replace(/^https?:\/\/(www\.)?[^/]+\/(channel\/|user\/|c\/)?/, '').replace(/\/.*$/, '').toLowerCase();
  const got = [meta.channel_id, meta.uploader_id, meta.channel_url, meta.uploader_url, meta.uploader, meta.channel]
    .filter(Boolean).map((s) => String(s).toLowerCase());
  return got.some((g) => g === want || g.endsWith('/' + want) || g.includes(want));
}

// ---------- download

async function download(u, id) {
  const fetched_at = now();
  if (isFile(u)) {
    const res = await fetch(u, { headers: { 'User-Agent': 'oneshot/0.1 (site builder for small surf businesses)' } });
    if (!res.ok) throw new Error(`GET ${u} → ${res.status}`);
    const type = res.headers.get('content-type') || '';
    if (!/^video\//.test(type) && !/octet-stream/.test(type)) throw new Error(`${u} answered ${type}, not a video`);
    const ext = (u.match(/\.(mp4|webm|mov|m4v)/i)?.[1] || 'mp4').toLowerCase();
    const file = path.join(VDIR, `${id}-source.${ext}`);
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    return { file, fetched_at, meta: { webpage_url: u } };
  }
  const meta = JSON.parse(ytdlp(['-J', u]));
  const tmpl = path.join(VDIR, `${id}-source.%(ext)s`);
  // best picture ≤ 2160p; audio is dropped later anyway, so a video-only stream is fine
  ytdlp(['-f', 'bv*[height<=2160]/b[height<=2160]/bv*/b', '--merge-output-format', 'mp4', '-o', tmpl, u]);
  const file = fs.readdirSync(VDIR).map((f) => path.join(VDIR, f)).find((f) => path.basename(f).startsWith(`${id}-source.`) && !f.endsWith('.part'));
  if (!file) throw new Error('yt-dlp finished but wrote no file');
  return { file, fetched_at, meta };
}

// ---------- encode

function encodeMp4(src, out, { start, length, width, cap, fps }) {
  // bitrate budget from the cap, 8% headroom for the container
  let kbps = Math.floor((cap * 8 * 0.92) / length / 1000);
  let crf = 23;
  for (let attempt = 0; attempt < 4; attempt++) {
    const vf = [`scale='min(${width},iw)':-2:flags=lanczos`, ...(fps > 30 ? ['fps=30'] : []), 'format=yuv420p'].join(',');
    run('ffmpeg', ['-y', '-v', 'error', '-ss', String(start), '-t', String(length), '-i', src,
      '-map', '0:v:0', '-an', '-sn', '-dn', '-map_metadata', '-1', '-vf', vf,
      '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-crf', String(crf),
      '-maxrate', `${kbps}k`, '-bufsize', `${kbps * 2}k`, '-movflags', '+faststart', out]);
    if (fs.statSync(out).size <= cap) return;
    kbps = Math.floor(kbps * 0.8); crf += 2;
  }
  console.warn(`  ! ${path.basename(out)} is ${mb(fs.statSync(out).size)}, over its ${mb(cap)} cap after 4 tries`);
}

function encodeWebm(src, out, { start, length, width, cap, fps }) {
  const kbps = Math.floor((cap * 8 * 0.9) / length / 1000);
  const vf = [`scale='min(${width},iw)':-2:flags=lanczos`, ...(fps > 30 ? ['fps=30'] : []), 'format=yuv420p'].join(',');
  run('ffmpeg', ['-y', '-v', 'error', '-ss', String(start), '-t', String(length), '-i', src,
    '-map', '0:v:0', '-an', '-sn', '-dn', '-map_metadata', '-1', '-vf', vf,
    '-c:v', 'libsvtav1', '-preset', '8', '-crf', '38', '-svtav1-params', `mbr=${kbps}`, out]);
  if (fs.statSync(out).size > cap) console.warn(`  ! ${path.basename(out)} is ${mb(fs.statSync(out).size)}, over its ${mb(cap)} cap`);
}

function poster(src, id, at) {
  const jpg = path.join(VDIR, `${id}-poster.jpg`);
  const avif = path.join(VDIR, `${id}-poster.avif`);
  const vf = "scale='min(1920,iw)':-2:flags=lanczos";
  run('ffmpeg', ['-y', '-v', 'error', '-ss', String(at), '-i', src, '-frames:v', '1', '-vf', vf, '-q:v', '3', jpg]);
  try {
    run('ffmpeg', ['-y', '-v', 'error', '-ss', String(at), '-i', src, '-frames:v', '1', '-vf', `${vf},format=yuv420p`,
      '-c:v', 'libaom-av1', '-still-picture', '1', '-crf', '32', '-cpu-used', '6', avif]);
  } catch (e) {
    console.warn(`  ! AVIF poster skipped: ${e.message.split('\n')[0]}`);
    return [jpg];
  }
  return [jpg, avif];
}

function sheet(src, id, duration) {
  const out = path.join(VDIR, `${id}-sheet.jpg`);
  const every = Math.max(0.5, duration / 24);
  run('ffmpeg', ['-y', '-v', 'error', '-i', src, '-vf', `fps=1/${every},scale=320:-2,tile=6x4:padding=4:color=white`, '-frames:v', '1', '-q:v', '4', out]);
  return { file: out, every_s: Number(every.toFixed(2)) };
}

// ---------- one video

async function fetchOne(u, idx) {
  const known = idx.find((e) => e.kind === 'video' && e.role === 'source' && e.source_url === u);
  const nextN = 1 + Math.max(0, ...idx.filter((e) => /^vid-\d+$/.test(e.video_id ?? '')).map((e) => Number(e.video_id.slice(4))));
  const id = known?.video_id ?? `vid-${String(nextN).padStart(3, '0')}`;

  let src, fetched_at, meta = {};
  if (known && fs.existsSync(path.join(DIR, known.file))) {
    src = path.join(DIR, known.file); fetched_at = known.fetched_at; meta = known.origin ?? {};
    console.log(`${id}  reusing source ${known.file}`);
  } else {
    console.log(`${id}  downloading ${u}`);
    ({ file: src, fetched_at, meta } = await timed('download', () => download(u, id)));
  }

  const origin = {
    webpage_url: meta.webpage_url ?? u,
    title: meta.title ?? null,
    channel: meta.channel ?? null,
    channel_id: meta.channel_id ?? null,
    channel_url: meta.channel_url ?? null,
    uploader: meta.uploader ?? null,
    uploader_id: meta.uploader_id ?? null,
    uploader_url: meta.uploader_url ?? null,
    upload_date: meta.upload_date ?? null,
    extractor: meta.extractor_key ?? (isFile(u) ? 'direct' : null),
  };
  let license = license0;
  let license_note = flags['license-note'] ?? null;
  if (license === 'business-owned' && !isFile(u) && !ownerMatches(origin, flags.channel)) {
    license = 'unknown';
    license_note = `downgraded: uploader ${origin.channel_id || origin.uploader_id || origin.uploader} is not ${flags.channel}`;
    console.warn(`  ! ${license_note}`);
  }

  const s = probe(src);
  const sh = await timed('sheet', () => sheet(src, id, s.duration_s));
  const base = { video_id: id, source_url: u, fetched_at, license, license_note };
  const entries = [
    { id, file: rel(src), kind: 'video', role: 'source', ...base, origin, width: s.width, height: s.height,
      duration_s: s.duration_s, fps: s.fps, codec: s.codec, has_audio: s.has_audio, bytes: fs.statSync(src).size,
      sha256: sha256(src), sheet: rel(sh.file), sheet_every_s: sh.every_s, description: flags.describe ?? null,
      usable: license === 'business-owned' },
  ];

  if (!flags['no-renditions']) {
    const start = Math.max(0, Math.min(num('start', 0), Math.max(0, s.duration_s - 1)));
    const avail = s.duration_s - start;
    let length = Math.min(20, Math.max(8, num('length', 12)));
    if (avail < length) length = Number(avail.toFixed(2));
    const posterAt = Math.min(num('poster-at', start + 1), Math.max(0, s.duration_s - 0.1));
    const cut = { start_s: start, length_s: length };

    // a new cut replaces the old one: drop this video's previous renditions and posters first
    for (const f of fs.readdirSync(VDIR)) {
      if (f.startsWith(`${id}-`) && /-(d\d+|m\d+)\.(mp4|webm)$|-poster\.(jpg|avif)$/.test(f)) fs.rmSync(path.join(VDIR, f));
    }
    const posterFiles = await timed('poster', () => poster(src, id, posterAt));
    const posterId = `${id}-poster`;
    for (const f of posterFiles) {
      const p = probe(f);
      entries.push({ id: `${posterId}-${path.extname(f).slice(1)}`, file: rel(f), kind: 'image', role: 'poster', ...base,
        poster_of: id, at_s: posterAt, width: p.width, height: p.height, bytes: fs.statSync(f).size, sha256: sha256(f) });
    }

    const made = new Set();
    for (const r of RENDITIONS) {
      // never upscale: a rendition wider than the source comes out at the source width, so make it once
      const w = Math.min(r.width, s.width || r.width);
      if (made.has(w)) continue;
      made.add(w);
      const out = path.join(VDIR, `${id}-${r.tag}.mp4`);
      await timed(`mp4 ${r.tag}`, () => encodeMp4(src, out, { start, length, width: r.width, cap: r.cap, fps: s.fps }));
      const p = probe(out);
      entries.push({ id: `${id}-${r.tag}-mp4`, file: rel(out), kind: 'video', role: r.role, ...base, mime: 'video/mp4',
        codec: 'h264', width: p.width, height: p.height, duration_s: p.duration_s, bytes: p.bytes, cap_bytes: r.cap,
        has_audio: p.has_audio, cut, poster: `${posterId}-jpg`, sha256: sha256(out) });
    }
    if (!flags['no-webm']) {
      const madeWebm = new Set();
      for (const tag of WEBM) {
        const r = RENDITIONS.find((x) => x.tag === tag);
        const w = Math.min(r.width, s.width || r.width);
        if (madeWebm.has(w)) continue;
        madeWebm.add(w);
        const out = path.join(VDIR, `${id}-${tag}.webm`);
        try {
          await timed(`webm ${tag}`, () => encodeWebm(src, out, { start, length, width: r.width, cap: r.cap, fps: s.fps }));
        } catch (e) { console.warn(`  ! ${tag}.webm skipped: ${e.message.split('\n')[0]}`); continue; }
        const p = probe(out);
        entries.push({ id: `${id}-${tag}-webm`, file: rel(out), kind: 'video', role: r.role, ...base, mime: 'video/webm',
          codec: 'av1', width: p.width, height: p.height, duration_s: p.duration_s, bytes: p.bytes, cap_bytes: r.cap,
          has_audio: p.has_audio, cut, poster: `${posterId}-jpg`, sha256: sha256(out) });
      }
    }
  }

  // replace this video's entries, keep everything else (images included) as it was
  // (--no-renditions leaves an earlier cut, its files and entries in place)
  const keep = idx.filter((e) => e.video_id !== id || (flags['no-renditions'] && e.role !== 'source'));
  idx.length = 0; idx.push(...keep, ...entries);

  for (const e of entries) {
    const dims = e.width ? `${e.width}x${e.height}` : '';
    const dur = e.duration_s ? `${e.duration_s}s` : '';
    console.log(`  ${e.id.padEnd(22)} ${e.role.padEnd(18)} ${dims.padEnd(10)} ${dur.padEnd(7)} ${mb(e.bytes).padStart(9)}  ${e.file}`);
  }
  console.log(`  license: ${license}${license === 'business-owned' ? '' : ' — NOT usable on a site'}; sheet to look at: ${rel(sh.file)}`);
}

// ---------- main

const t0 = Date.now();
const idx = loadIndex();
try {
  if (isFile(url)) {
    await fetchOne(url, idx);
  } else {
    const info = await timed('probe', () => JSON.parse(ytdlp(['-J', '--flat-playlist', '--yes-playlist', url])));
    if (info._type === 'playlist') {
      const list = flatten(info);
      const owner = { channel: info.channel ?? info.uploader ?? null, channel_id: info.channel_id ?? null };
      const ldir = path.join(VDIR, 'listings');
      fs.mkdirSync(ldir, { recursive: true });
      const lfile = path.join(ldir, `${(info.id || 'list').replace(/[^\w-]/g, '_')}.json`);
      fs.writeFileSync(lfile, JSON.stringify({ source_url: url, fetched_at: now(), ...owner, title: info.title ?? null, count: list.length, entries: list }, null, 1) + '\n');
      console.log(`${list.length} video(s) in "${info.title}" (${owner.channel_id ?? owner.channel ?? '?'}) → ${rel(lfile)}`);
      for (const e of list.slice(0, 40)) console.log(`  ${String(e.duration_s ?? '?').padStart(5)}s  ${e.url}  ${e.title ?? ''}`);
      if (list.length > 40) console.log(`  … ${list.length - 40} more in the listing file`);
      for (const e of list.slice(0, num('max', 0))) if (e.url) await fetchOne(e.url, idx);
    } else {
      await fetchOne(url, idx);
    }
  }
} finally {
  saveIndex(idx);
}
const total = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`\ntime: ${total}s total · ${Object.entries(timings).map(([k, v]) => `${k} ${(v / 1000).toFixed(1)}s`).join(' · ')}`);
console.log(`index: ${INDEX}`);
