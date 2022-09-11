FROM node:16.13.0

WORKDIR /blog_ssr

COPY package*.json ./

COPY . ./
RUN yarn config set registry http://mirrors.cloud.tencent.com/npm/
RUN yarn
EXPOSE 8001
RUN chmod +777 start.sh
CMD ["/bin/sh","start.sh"]