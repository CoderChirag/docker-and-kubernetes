FROM node:18.17-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --immutable
COPY . .
RUN yarn build

FROM node:18.17-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
CMD ["yarn", "start"]