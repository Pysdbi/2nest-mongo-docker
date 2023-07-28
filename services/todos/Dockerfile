FROM node:16-alpine3.18 as installer

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install


FROM node:16-alpine3.18 as builder

WORKDIR /app
COPY . ./
COPY --from=installer /app/node_modules ./node_modules
RUN yarn build


FROM node:16-alpine3.18

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 3000

EXPOSE ${PORT}

WORKDIR /app
COPY --from=builder /app ./

CMD ["yarn", "start"]

