FROM node:16-alpine3.14

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

WORKDIR /app

RUN apk update && \
  apk upgrade && \
  apk add --no-cache

COPY package.json yarn.lock ./

RUN yarn

ENV HOST 0.0.0.0
EXPOSE 1234
