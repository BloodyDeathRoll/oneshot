# Payload 3 (Next.js standalone output). Build context: cms/app
FROM node:24.21.0-bookworm-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# No database or real secret is needed at build time: the admin and API routes are dynamic.
RUN PAYLOAD_SECRET=build-time-placeholder DATABASE_URL=postgres://build:build@127.0.0.1:1/build \
    npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 MEDIA_DIR=/app/media
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
# created before the volume is mounted so a fresh named volume inherits node:node ownership
RUN mkdir -p /app/media && chown node:node /app/media
USER node
EXPOSE 3000
CMD ["node", "server.js"]
