/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.security = {
    csrf: false,
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1559377734469_7245';
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'db_code_blog',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Walljs..123',
    timezone: '+08:00',
  };
  // config.oauth2Server = {
  //   grants: [
  //     'password',
  //     // 'client_credentials',
  //   ],
  // };

  // add your middleware config here
  config.middleware = [
    'errorHandler',
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
