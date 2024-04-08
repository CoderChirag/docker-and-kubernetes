FROM node:18.17-alpine as builder
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn --immutable
COPY . .
RUN yarn build

FROM node:18.17-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/yarn.lock /app/.yarnrc.yml ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["yarn", "start"]
