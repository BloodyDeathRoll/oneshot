// dashboard/access.mjs — who is at the door, when the dashboard runs online behind Cloudflare Access
// (docs/team.md, "The dashboard online").
//
// Cloudflare Access checks the login (an e-mail one-time code) and puts a signed JWT on every request
// it lets through, in the `Cf-Access-Jwt-Assertion` header. This module verifies that JWT against the
// team's public keys and maps its e-mail to an operator in team.json (`access_emails`, else
// `git_emails`). Nothing else is trusted: a request without a valid token is refused, whatever host
// it came from. One module, no dependencies: RS256 through WebCrypto.
//
//   const gate = accessGate({ team: 'oneshot', aud: '<application audience tag>' }); // operators: team.json
//   const who = await gate(req);          // { operator, email } or throws { status, message }

import { team } from '../tools/team.mjs';

const b64url = (s) => Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
const refuse = (status, message) => Object.assign(new Error(message), { status });

export function accessGate({ team: teamDomain, aud, fetchKeys = defaultFetchKeys, operators = null }) {
  if (!teamDomain || !aud) throw new Error('access: both the team domain and the application audience are required');
  const certsUrl = `https://${teamDomain}.cloudflareaccess.com/cdn-cgi/access/certs`;
  const issuer = `https://${teamDomain}.cloudflareaccess.com`;
  let keys = new Map(), fetchedAt = 0, refreshing = null;

  // One refresh at a time; the new map replaces the old only once it is complete, so a page's burst of
  // requests at start-up or after a key rotation never sees a half-filled map.
  async function refresh() {
    const jwks = await fetchKeys(certsUrl);
    const next = new Map();
    for (const k of jwks.keys ?? []) next.set(k.kid, await crypto.subtle.importKey('jwk', k, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']));
    keys = next; fetchedAt = Date.now();
  }
  async function keyFor(kid) {
    if (!keys.has(kid) && (refreshing || Date.now() - fetchedAt > 60_000)) { // unknown key: refresh, at most once a minute
      refreshing ??= refresh().finally(() => { refreshing = null; });
      await refreshing;
    }
    return keys.get(kid) ?? null;
  }

  return async function gate(req) {
    // Access sets the first; the dashboard's Worker (infra/dashboard/worker) copies it into the second,
    // in case a cf- header does not survive the hop to the box. Either way only the signature is trusted.
    const token = req.headers['cf-access-jwt-assertion'] ?? req.headers['x-oneshot-access-jwt'];
    if (!token || typeof token !== 'string') throw refuse(401, 'no Cloudflare Access token: open the dashboard through its public address');
    const parts = token.split('.');
    if (parts.length !== 3) throw refuse(401, 'malformed Access token');
    let header, claims;
    try { header = JSON.parse(b64url(parts[0]).toString('utf8')); claims = JSON.parse(b64url(parts[1]).toString('utf8')); }
    catch { throw refuse(401, 'malformed Access token'); }
    if (header.alg !== 'RS256') throw refuse(401, `unsupported Access token algorithm ${header.alg}`);
    const key = await keyFor(header.kid);
    if (!key) throw refuse(401, 'Access token signed by an unknown key');
    const ok = await crypto.subtle.verify({ name: 'RSASSA-PKCS1-v1_5' }, key, b64url(parts[2]), Buffer.from(`${parts[0]}.${parts[1]}`));
    if (!ok) throw refuse(401, 'Access token signature does not verify');
    const now = Math.floor(Date.now() / 1000);
    if (claims.iss !== issuer) throw refuse(401, 'Access token is from another team');
    if (!(Array.isArray(claims.aud) ? claims.aud : [claims.aud]).includes(aud)) throw refuse(401, 'Access token is for another application');
    if (typeof claims.exp !== 'number' || claims.exp < now - 60) throw refuse(401, 'Access token expired: reload the page');
    if (typeof claims.nbf === 'number' && claims.nbf > now + 60) throw refuse(401, 'Access token not yet valid');
    const email = String(claims.email ?? '').toLowerCase();
    const operator = operatorForEmail(email, operators ?? team());
    if (!operator) throw refuse(403, `${email || 'this login'} is not an operator: add the e-mail to team.json (access_emails)`);
    return { operator, email };
  };
}

// team.json: `access_emails` is the list of e-mails an operator may log in with; `git_emails` count too.
export function operatorForEmail(email, ops = team()) {
  if (!email) return null;
  for (const [id, o] of Object.entries(ops)) {
    const all = [...(o.access_emails ?? []), ...(o.git_emails ?? [])].map((e) => String(e).toLowerCase());
    if (all.includes(email)) return id;
  }
  return null;
}

async function defaultFetchKeys(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error(`could not fetch Access keys: ${r.status}`);
  return r.json();
}
