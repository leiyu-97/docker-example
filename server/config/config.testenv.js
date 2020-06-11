/* eslint valid-jsdoc: "off" */
'use strict';

const defaultConfig = require('./config.default');
const { BRANCH, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    // 数据库配置
    sequelize: {
      username: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      host: MYSQL_HOST,
      dialect: 'mysql',
      define: {
        freezeTableName: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
      pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },

    // 取消安全校验
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
      domainWhiteList: [ '*' ],
    },

    // 允许跨域
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    apiPrefix: BRANCH ? `/${BRANCH}/api` : '/api',
  };

  return {
    ...defaultConfig(appInfo),
    ...config,
  };
};
