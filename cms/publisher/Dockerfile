# Publisher = Node HTTP service + the shared site dependencies (astro + sharp) + wrangler.
# Build context: cms/   The site templates are NOT in the image: they are mounted at
# TEMPLATES_ROOT (one dir per tenant, synced from the repo's sites/<slug>/final).
FROM node:24.21.0-bookworm-slim AS base
ENV ASTRO_TELEMETRY_DISABLED=1 WRANGLER_SEND_METRICS=false NODE_ENV=production

FROM base AS site-deps
WORKDIR /app/publisher/site-deps
COPY publisher/site-deps/package.json publisher/site-deps/package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM base AS publisher-deps
# WITH_WRANGLER=false (self-hosted / local-dir adapter) leaves wrangler out of the image
ARG WITH_WRANGLER=true
WORKDIR /app/publisher
COPY publisher/package.json publisher/package-lock.json ./
RUN if [ "$WITH_WRANGLER" = "true" ]; then npm ci --include=dev --no-audit --no-fund; else mkdir -p node_modules; fi

FROM base AS runner
WORKDIR /app
COPY --from=publisher-deps /app/publisher/node_modules ./publisher/node_modules
COPY --from=site-deps /app/publisher/site-deps/node_modules ./publisher/site-deps/node_modules
COPY publisher/src ./publisher/src
COPY publisher/package.json ./publisher/package.json
# builds write under /data; Astro's cache lives in the shared node_modules (builds are serial)
RUN mkdir -p /data/out /data/work /data/www /srv/templates \
 && chown -R node:node /data /app/publisher/site-deps/node_modules
USER node
ENV PUBLISHER_HOST=0.0.0.0 PUBLISHER_PORT=4100 TEMPLATES_ROOT=/srv/templates WORK_ROOT=/data/work \
    OUT_ROOT=/data/out WEB_ROOT=/data/www SITE_DEPS_MODULES=/app/publisher/site-deps/node_modules
EXPOSE 4100
HEALTHCHECK --interval=10s --timeout=3s --retries=6 CMD node -e "fetch('http://127.0.0.1:4100/healthz').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"
CMD ["node", "publisher/src/server.mjs"]
