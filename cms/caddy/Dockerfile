# Caddy + the rate-limit module (stock Caddy has none; PLAN §6 / server-hardening.md: rate-limited login).
# Plugin pinned by commit: github.com/mholt/caddy-ratelimit master @ 2026-06-12.
FROM caddy:2.11.4-builder-alpine AS builder
RUN xcaddy build v2.11.4 --with github.com/mholt/caddy-ratelimit@5625512f24f6f59d6f64fb3aafe5eecff0b286db

FROM caddy:2.11.4-alpine
COPY --from=builder /usr/bin/caddy /usr/bin/caddy
COPY Caddyfile /etc/caddy/Caddyfile
