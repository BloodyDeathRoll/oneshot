// tools/r2.mjs — a small Cloudflare R2 client over the S3 API (SigV4, no dependencies).
//
// Used by tools/handoff.mjs to park one media zip per handoff (docs/handoff.md). Credentials live
// outside git in ~/.oneshot/r2.json (ONESHOT_R2 overrides the path):
//
//   { "account_id": "e42421b2…", "bucket": "oneshot-handoff", "access_key_id": "…", "secret_access_key": "…" }
//
// Free tier (developers.cloudflare.com/r2/pricing): 10 GB-month stored, 1M Class A (writes/lists) and
// 10M Class B (reads) per month, no egress charge. One handoff = one PUT, one GET, one DELETE and a few
// LISTs; `ship` refuses when the bucket already holds more than MAX_BUCKET_BYTES, and the lifecycle
// rule expires anything left behind after EXPIRE_DAYS.

import { createHmac, createHash } from 'node:crypto';
import { createReadStream, createWriteStream, existsSync, readFileSync, statSync } from 'node:fs';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

export const MAX_BUCKET_BYTES = 2 * 1024 ** 3; // 2 GB: far under the 10 GB-month free tier
export const EXPIRE_DAYS = 7;
const CONFIG = process.env.ONESHOT_R2 ?? join(homedir(), '.oneshot', 'r2.json');

export function hasConfig() { return existsSync(CONFIG); }
export function loadConfig() {
  if (!existsSync(CONFIG)) throw new Error(`no R2 credentials at ${CONFIG} (docs/handoff.md "R2 setup")`);
  const c = JSON.parse(readFileSync(CONFIG, 'utf8'));
  for (const k of ['account_id', 'bucket', 'access_key_id', 'secret_access_key']) if (!c[k]) throw new Error(`${CONFIG}: missing ${k}`);
  return c;
}

const hmac = (key, s) => createHmac('sha256', key).update(s).digest();
const hex = (b) => Buffer.from(b).toString('hex');
const sha256hex = (s) => createHash('sha256').update(s).digest('hex');
const enc = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());

// Signs one request (AWS Signature Version 4, region "auto", service "s3"). Payload is unsigned so a
// file can stream; the integrity check is the sha256 the caller stores in the handoff line.
export function sign({ method, host, path, query = {}, headers = {}, payloadHash = 'UNSIGNED-PAYLOAD', now = new Date() }, cfg) {
  const amz = now.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const date = amz.slice(0, 8);
  const h = { host, 'x-amz-content-sha256': payloadHash, 'x-amz-date': amz, ...Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), String(v).trim()])) };
  const signed = Object.keys(h).sort();
  const canonicalQuery = Object.keys(query).sort().map((k) => `${enc(k)}=${enc(String(query[k]))}`).join('&');
  const canonical = [method, path.split('/').map(enc).join('/'), canonicalQuery, ...signed.map((k) => `${k}:${h[k]}`), '', signed.join(';'), payloadHash].join('\n');
  const scope = `${date}/auto/s3/aws4_request`;
  const toSign = ['AWS4-HMAC-SHA256', amz, scope, sha256hex(canonical)].join('\n');
  const kSig = hmac(hmac(hmac(hmac(`AWS4${cfg.secret_access_key}`, date), 'auto'), 's3'), 'aws4_request');
  h.authorization = `AWS4-HMAC-SHA256 Credential=${cfg.access_key_id}/${scope}, SignedHeaders=${signed.join(';')}, Signature=${hex(hmac(kSig, toSign))}`;
  return { url: `https://${host}${path}${canonicalQuery ? '?' + canonicalQuery : ''}`, headers: h };
}

async function call(cfg, method, key, { query, headers, body, payloadHash } = {}) {
  const host = `${cfg.account_id}.r2.cloudflarestorage.com`;
  const path = `/${cfg.bucket}${key ? `/${key}` : ''}`;
  const req = sign({ method, host, path, query, headers, payloadHash }, cfg);
  const res = await fetch(req.url, { method, headers: req.headers, body, ...(body && typeof body !== 'string' && !(body instanceof Uint8Array) ? { duplex: 'half' } : {}) });
  if (!res.ok) throw new Error(`R2 ${method} ${path}: HTTP ${res.status} ${(await res.text()).replace(/\s+/g, ' ').slice(0, 300)}`);
  return res;
}

// Objects in the bucket: [{ key, bytes, modified }]. One Class A call per 1000 objects.
export async function list(cfg, prefix = '') {
  const out = [];
  let token = null;
  do {
    const res = await call(cfg, 'GET', '', { query: { 'list-type': '2', ...(prefix && { prefix }), ...(token && { 'continuation-token': token }) } });
    const xml = await res.text();
    for (const m of xml.matchAll(/<Contents>([\s\S]*?)<\/Contents>/g)) {
      out.push({ key: m[1].match(/<Key>(.*?)<\/Key>/)?.[1], bytes: Number(m[1].match(/<Size>(\d+)<\/Size>/)?.[1] ?? 0), modified: m[1].match(/<LastModified>(.*?)<\/LastModified>/)?.[1] ?? null });
    }
    token = xml.match(/<NextContinuationToken>(.*?)<\/NextContinuationToken>/)?.[1] ?? null;
  } while (token);
  return out;
}

export async function bucketBytes(cfg) { return (await list(cfg)).reduce((s, o) => s + o.bytes, 0); }

// Uploads one local file (single PUT; R2 accepts up to 5 GB this way). Returns its size.
export async function put(cfg, key, file) {
  const bytes = statSync(file).size;
  await call(cfg, 'PUT', key, { headers: { 'content-length': bytes, 'content-type': 'application/zip' }, body: createReadStream(file) });
  return bytes;
}

// Downloads an object to a local file, returning its sha256 so the caller can check it.
export async function get(cfg, key, file) {
  const res = await call(cfg, 'GET', key);
  const hash = createHash('sha256');
  const tap = new Transform({ transform(chunk, _e, cb) { hash.update(chunk); cb(null, chunk); } });
  await pipeline(Readable.fromWeb(res.body), tap, createWriteStream(file));
  return hash.digest('hex');
}

export async function del(cfg, key) { await call(cfg, 'DELETE', key); }

// Expire anything older than EXPIRE_DAYS: the backstop for a handoff nobody takes. Idempotent.
export async function ensureLifecycle(cfg) {
  const xml = `<LifecycleConfiguration><Rule><ID>oneshot-handoff-expire</ID><Filter><Prefix></Prefix></Filter><Status>Enabled</Status><Expiration><Days>${EXPIRE_DAYS}</Days></Expiration><AbortIncompleteMultipartUpload><DaysAfterInitiation>1</DaysAfterInitiation></AbortIncompleteMultipartUpload></Rule></LifecycleConfiguration>`;
  const md5 = createHash('md5').update(xml).digest('base64');
  await call(cfg, 'PUT', '', { query: { lifecycle: '' }, headers: { 'content-md5': md5, 'content-type': 'application/xml' }, body: xml, payloadHash: sha256hex(xml) });
}

// A quick credentials check: lists the bucket (one Class A call).
export async function check(cfg = loadConfig()) {
  const objects = await list(cfg);
  return { bucket: cfg.bucket, objects: objects.length, bytes: objects.reduce((s, o) => s + o.bytes, 0) };
}
