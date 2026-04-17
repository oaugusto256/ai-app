# syntax=docker/dockerfile:1

ARG NODE_VERSION=23.9.0

FROM node:${NODE_VERSION}-slim

WORKDIR /app

COPY front/package.json front/package-lock.json ./

RUN npm ci

COPY front/ .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
