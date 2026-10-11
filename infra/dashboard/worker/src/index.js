// infra/dashboard/worker — forwards every request to the dashboard server (env.ORIGIN), as is.
// Access runs before this code: a request that reaches it carries the login's signed token, which the
// server verifies itself (dashboard/access.mjs). The token is also copied into x-oneshot-access-jwt,
// in case Cloudflare drops a cf- header on the way out. Streams pass through (live updates over SSE).
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const target = new URL(url.pathname + url.search, env.ORIGIN);
    const headers = new Headers(request.headers);
    const jwt = request.headers.get('cf-access-jwt-assertion');
    if (jwt) headers.set('x-oneshot-access-jwt', jwt);
    headers.delete('host');
    const res = await fetch(target, { method: request.method, headers, body: request.body, redirect: 'manual' });
    const out = new Response(res.body, res);
    out.headers.set('x-robots-tag', 'noindex, nofollow');
    return out;
  },
};
