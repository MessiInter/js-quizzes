# **
 # * This Dockerfile ONLY WORK on CodeSandbox.
 # * Build Docker image using this Dockerfile may not work.
# *

FROM node:latest

WORKDIR /workspace

RUN apt-get update

RUN apt-get upgrade -y

RUN npm install -g npm@latest

RUN npm install -g pnpm@latest

ENV PNPM_HOME=/root/.pnpm

ENV PATH=/usr/local/bin:/workspace/node_modules/.bin:/root/.pnpm:/usr/local/sbin:/usr/bin:/usr/sbin:/bin:/sbin

RUN npm config set auth-type legacy

ENV NODE_ENV=development