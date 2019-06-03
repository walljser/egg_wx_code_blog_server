'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const AccessTokenSchema = require('../schema/accessToken.js')(app);
  const AccessToken = db.defineModel(app, 'accessToken', AccessTokenSchema);

  AccessToken.getAccessToken = async bearerToken => {
    return await AccessToken.findOne({
      where: {
        access_token: bearerToken,
      },
    });
  };

  AccessToken.saveAccessToken = async (token, client, user) => {
    return await AccessToken.create({
      access_token: token.accessToken,
      access_token_expires_at: token.accessTokenExpiresAt,
      client_id: client.id,
      user_id: user.id,
      scope: token.scope || '',
    });
  };

  return AccessToken;
}