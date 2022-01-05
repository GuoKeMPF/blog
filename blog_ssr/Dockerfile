FROM node:16.13.0

WORKDIR /blog_ssr

COPY package*.json ./

COPY . ./
COPY --from=blog_site /blog_site/dist ./app/public
RUN yarn config set registry http://mirrors.cloud.tencent.com/npm/
RUN yarn
EXPOSE 8001
ENTRYPOINT ["npm", "run", "alive"]
