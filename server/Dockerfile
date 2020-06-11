FROM node:10-alpine

ADD . /server
WORKDIR /server
# 安装依赖
RUN npm install
# 健康检查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:7000/api/health || exit 1
# 暴露 7000 端口
EXPOSE 7000
# 启动服务
CMD npm run start:test