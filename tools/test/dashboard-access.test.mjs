// dashboard/access.mjs: the Cloudflare Access token is verified and mapped to an operator.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPairSync, createSign } from 'node:crypto';
import { accessGate, operatorForEmail } from '../../dashboard/access.mjs';

const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const jwk = { ...publicKey.export({ format: 'jwk' }), kid: 'k1', alg: 'RS256', use: 'sig' };
const b64 = (o) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o)).toString('base64url');
const token = (claims, kid = 'k1') => {
  const head = b64({ alg: 'RS256', kid }), body = b64(claims);
  const sig = createSign('RSA-SHA256').update(`${head}.${body}`).sign(privateKey).toString('base64url');
  return `${head}.${body}.${sig}`;
};
const now = Math.floor(Date.now() / 1000);
const ops = { shahar: { name: 'Shahar', git_emails: ['s@git.test'], access_emails: ['s@login.test'] }, alon: { name: 'Alon', git_emails: ['a@git.test'] } };
const good = { iss: 'https://oneshot.cloudflareaccess.com', aud: ['aud1'], exp: now + 600, iat: now, email: 'S@login.test' };
let fetches = 0;
const gate = accessGate({ team: 'oneshot', aud: 'aud1', operators: ops, fetchKeys: async () => { fetches++; return { keys: [jwk] }; } });
const req = (t) => ({ headers: t == null ? {} : { 'cf-access-jwt-assertion': t } });
const refused = async (t, status, re) => { await assert.rejects(gate(req(t)), (e) => { assert.equal(e.status, status); assert.match(e.message, re); return true; }); };

test('a valid token names the operator, case-insensitively, and keys are fetched once', async () => {
  assert.equal(operatorForEmail('s@login.test', ops), 'shahar');
  assert.equal(operatorForEmail('a@git.test', ops), 'alon');
  assert.equal(operatorForEmail('x@y.test', ops), null);
  const who = await gate(req(token(good)));
  assert.equal(who.email, 's@login.test');
  await gate(req(token(good)));
  assert.equal(fetches, 1);
});
test('no token, bad signature, wrong audience, wrong issuer, expired → refused', async () => {
  await refused(null, 401, /no Cloudflare Access token/);
  await refused('a.b', 401, /malformed/);
  const t = token(good); await refused(t.slice(0, -4) + 'AAAA', 401, /signature/);
  await refused(token({ ...good, aud: ['other'] }), 401, /another application/);
  await refused(token({ ...good, iss: 'https://evil.cloudflareaccess.com' }), 401, /another team/);
  await refused(token({ ...good, exp: now - 3600 }), 401, /expired/);
  await refused(token(good, 'k9'), 401, /unknown key/);
});
test('an alg other than RS256 is refused before any key is used', async () => {
  const head = b64({ alg: 'none', kid: 'k1' }), body = b64(good);
  await refused(`${head}.${body}.`, 401, /unsupported/);
});
