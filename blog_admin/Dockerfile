FROM node:16.13.0

WORKDIR /blog_admin

COPY package*.json ./

COPY . ./
RUN yarn config set registry http://mirrors.cloud.tencent.com/npm/
RUN yarn
RUN yarn build
