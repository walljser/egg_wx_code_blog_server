'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('/v1/users', controller.user);
  router.resources('/v1/clients', controller.client);
  app.all('/v1/users/token', app.oAuth2Server.token(), 'user.token');
  app.all('/v1/users/authenticate', app.oAuth2Server.authenticate(), 'user.authenticate');
};
