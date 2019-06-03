'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const RefreshTokenSchema = require('../schema/refreshToken')(app);
  const RefreshToken = db.defineModel(app, 'refreshToken', RefreshTokenSchema);

  // 创建refresh_token  
  RefreshToken.saveRefreshToken = async (token, client, user) => {
    console.log('11111111');
    console.log(token);
    return await RefreshToken.create({
      refresh_token: token.refreshToken,
      refresh_token_expires_at: token.refreshTokenExpiresAt,
      client_id: client.id,
      user_id: user.id,
      scope: token.scope || '',
    });
  };

  // 删除refresh_token
  RefreshToken.delRefreshToken = async token => {
    return await RefreshToken.destroy({
      where: {
        refresh_token: token,
      },
    });
  };

  // 获取refresh_token
  RefreshToken.getRefreshToken = async refresh_token => {
    return await RefreshToken.findOne({
      where: {
        refresh_token,
      },
    });
  };

  return RefreshToken;
}