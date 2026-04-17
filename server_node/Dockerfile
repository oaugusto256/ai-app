# syntax=docker/dockerfile:1

ARG NODE_VERSION=23.9.0

FROM node:${NODE_VERSION}

ENV NODE_ENV production

WORKDIR /usr/src/app

RUN --mount=type=bind,source=server_node/package.json,target=package.json \
    --mount=type=bind,source=server_node/package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY server_node/ .

EXPOSE 3000

CMD node index.js
