'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { config, router, controller } = app;
  const { apiPrefix } = config;
  // 设置 baseUrl
  router.prefix(apiPrefix)

  router.get('/', controller.home.index);
  // 健康检查
  router.get('health', '/health', (ctx) => (ctx.body = 'ok'))
};
