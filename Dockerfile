FROM node:lts-alpine as builder
WORKDIR /app

COPY package.json yarn.lock /app/
RUN pnpm install
COPY . /app
RUN pnpm build

FROM node:lts-alpine
WORKDIR /app

COPY --from=builder /app/.output /app/.output

EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]