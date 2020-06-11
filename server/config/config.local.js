/* eslint valid-jsdoc: "off" */
'use strict';
const path = require('path');
const defaultConfig = require('./config.default');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    // 取消安全校验
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true
      },
      domainWhiteList: ['*']
    },

    logger: {
      consoleLevel: 'DEBUG'
    },

    apiPrefix: '/api'
  };


  return {
    ...defaultConfig(appInfo),
    ...config
  };
};
