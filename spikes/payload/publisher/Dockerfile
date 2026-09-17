# Publisher = Node HTTP service + the Astro template it builds (+ wrangler for the cloudflare adapter).
# Build context: spikes/payload   (needs both ./site and ./publisher)
FROM node:24.21.0-bookworm-slim AS base
ENV ASTRO_TELEMETRY_DISABLED=1 WRANGLER_SEND_METRICS=false NODE_ENV=production

FROM base AS site-deps
WORKDIR /app/site
COPY site/package.json site/package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM base AS publisher-deps
# WITH_WRANGLER=false (self-hosted / local-dir adapter) leaves wrangler out of the image
ARG WITH_WRANGLER=true
WORKDIR /app/publisher
COPY publisher/package.json publisher/package-lock.json ./
RUN if [ "$WITH_WRANGLER" = "true" ]; then npm ci --include=dev --no-audit --no-fund; else mkdir -p node_modules; fi

FROM base AS runner
WORKDIR /app
COPY --from=site-deps /app/site/node_modules ./site/node_modules
COPY --from=publisher-deps /app/publisher/node_modules ./publisher/node_modules
COPY site ./site
COPY publisher ./publisher
# the build writes tenant data + caches inside the site dir, and output under /data
RUN mkdir -p /data/out /data/www /app/site/src/tenant /app/site/node_modules/.astro-cache \
 && chown -R node:node /data /app/site/src /app/site/node_modules/.astro-cache \
 && chown node:node /app/site /app/site/node_modules
USER node
ENV PUBLISHER_HOST=0.0.0.0 PUBLISHER_PORT=4100 SITE_DIR=/app/site OUT_ROOT=/data/out WEB_ROOT=/data/www
EXPOSE 4100
HEALTHCHECK --interval=10s --timeout=3s --retries=6 CMD node -e "fetch('http://127.0.0.1:4100/healthz').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"
CMD ["node", "publisher/src/server.mjs"]
