FROM node:lts-slim as builder
WORKDIR /app

COPY package.json pnpm-lock.yaml /app/
RUN pnpm install
COPY . /app
RUN pnpm build

FROM node:lts-alpine
WORKDIR /app

COPY --from=builder /app/.output /app/.output

EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]