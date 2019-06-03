'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const authorizationCodeSchema = require('../schema/authorizationCode.js')(app);
  const AuthorizationCode = db.defineModel(app, 'authorizationCode', authorizationCodeSchema);

  AuthorizationCode.queryAuthorizationCode = async params => {
    return await AuthorizationCode.findOne({
      where: params,
    });
  };

  AuthorizationCode.saveAuthorizationCode = async (code, client, user) => {
    return await AuthorizationCode.create({
      authorization_code: code.authorization_code,
      expires_at: code.expires_at,
      redirect_uri: code.redirect_uri,
      scope: code.scope || '',
      client_id: client.id,
      user_id: user.id,
    });
  };

  AuthorizationCode.delAuthorizationCode = async code => {
    return await AuthorizationCode.destroy({
      where: {
        code,
      },
    });
  };

  return AuthorizationCode;
}