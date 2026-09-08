# syntax=docker/dockerfile:1

# ---- Build stage: compile the Next.js static export (out/) ----
FROM node:20-alpine AS builder
WORKDIR /app

# NEXT_PUBLIC_* vars are inlined into the static HTML/JS at build time,
# so they must be passed as build args (see docker-compose.yml), not runtime env.
ARG NEXT_PUBLIC_SITE_URL=https://hktikotabatam.org
ARG NEXT_PUBLIC_GA_ID=
ARG NEXT_PUBLIC_GSC_VERIFICATION=
ARG NEXT_PUBLIC_BING_VERIFICATION=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID \
    NEXT_PUBLIC_GSC_VERIFICATION=$NEXT_PUBLIC_GSC_VERIFICATION \
    NEXT_PUBLIC_BING_VERIFICATION=$NEXT_PUBLIC_BING_VERIFICATION

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Runtime stage: serve the static export with nginx on port 3020 ----
FROM nginx:1.27-alpine AS runner

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 3020

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:3020/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
