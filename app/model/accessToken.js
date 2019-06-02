'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const accessTokenSchema = require('../schema/accessToken.js')(app);
  const AccessToken = db.defineModel(app, 'accessToken', accessTokenSchema);

  AccessToken.getAccessToken = async (bearerToken) => {
    return await AccessToken.findOne({
      where: {
        accessToken: bearerToken,
      },
    });
  };

  AccessToken.saveAccessToken = async (token, client, user) => {
    return await AccessToken.create({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      clientId: client.id,
      userId: user.id,
      scope: token.scope || '',
    });
  };

  return AccessToken;
}