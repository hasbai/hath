FROM node:lts-slim as builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml /app/
RUN pnpm install
COPY . /app
RUN pnpm build

FROM node:lts-alpine
WORKDIR /app

COPY --from=builder /app/.output /app

EXPOSE 3000
CMD [ "node", "server/index.mjs" ]