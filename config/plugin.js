'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
  oAuth2Server: {
    enable: true,
    package: 'egg-oauth2-server',
  },
};
