FROM node:10-alpine

ADD . /web
WORKDIR /web
# 安装依赖
RUN npm install
# 编译
CMD npm run build:test
