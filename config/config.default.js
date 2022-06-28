/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1656380466162_8152'

  // add your middleware config here
  config.middleware = []

  // 允许跨域
  config.cors = {
    credentials: true,
    origin: '*',
    allowMethods: 'GET,PUT,POST,DELETE',
  }

  // jwt
  config.jwt = {
    secret: config.keys,
    expiresIn: '24h',
  }

  // 参数

  config.validate = {
    enable: true,
    package: 'egg-validate',
  }

  // 密码加密
  config.bcrypt = {
    saltRounds: 10,
  }

  // sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '175.178.1.83',
    port: 3306,
    database: 'poker_score_record',
    username: 'root',
    password: 'Liao60520',
  }

  // add your user config here
  const userConfig = {
    appid: 'wx8415355e323631f0',
    appSecret: 'a7828f551e2795e43ba6afc7c74eeffe',
  }

  return {
    ...config,
    ...userConfig,
  }
}
