# Base images are pinned by tag + digest: the tag stays readable, the digest
# makes the build immutable. `.github/dependabot.yml` bumps both together, so
# a frozen digest never becomes a frozen vulnerability.

# ---- Build stage ----
FROM node:24-alpine@sha256:8a32c8cf649a49915a66e81e7a609223c708d0adabf288ee3f4077d765542f85 AS builder

WORKDIR /app

# --ignore-scripts: installing dependencies must not execute arbitrary
# postinstall code. Nothing in this tree needs it.
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- Production stage ----
FROM nginx:1.31-alpine@sha256:785835ea65db4bba6f021acc0f3be91b0fef76a53fe41f8588c6698d2aed0606 AS runner

# The published image lags Alpine's security advisories by weeks. Pulling the
# patched packages at build time is what keeps HIGH/CRITICAL findings out of
# the shipped artifact; without it the scan gate is only as current as the
# upstream tag.
RUN apk upgrade --no-cache \
 && rm -rf /var/cache/apk/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

# Run as the image's unprivileged nginx user (listens on 3000, so no root
# needed). nginx writes its pid and temp files here.
RUN touch /var/run/nginx.pid \
 && chown -R nginx:nginx /var/cache/nginx /var/run/nginx.pid

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

USER nginx

CMD ["nginx", "-g", "daemon off;"]