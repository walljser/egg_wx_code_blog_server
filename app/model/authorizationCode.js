'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const authorizationCodeSchema = require('../schema/authorizationCode.js')(app);
  const AuthorizationCode = db.defineModel(app, 'authorizationCode', authorizationCodeSchema);

  AuthorizationCode.queryAuthorizationCode = async (params) => {
    return await AuthorizationCode.findOne({
      where: params,
    });
  };

  AuthorizationCode.saveAuthorizationCode = async (code, client, user) => {
    return await AuthorizationCode.create({
      authorization_code: code.authorization_code,
      expiresAt: code.expiresAt,
      redirectUri: code.redirectUri,
      scope: code.scope || '',
      clientId: client.id,
      userId: user.id,
    });
  };

  AuthorizationCode.delAuthorizationCode = async (code) => {
    return await AuthorizationCode.destroy({
      where: {
        code,
      },
    });
  };

  return AuthorizationCode;
}