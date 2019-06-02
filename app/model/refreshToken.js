'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const refreshTokenSchema = require('../schema/refreshToken')(app);
  const RefreshToken = db.defineModel(app, 'refreshToken', refreshTokenSchema);

  // 创建refreshToken  
  RefreshToken.saveRefreshToken = async (token, client, user) => {
    return await RefreshToken.create({
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      clientId: client.id,
      userId: user.id,
      scope: token.scope || '',
    });
  };

  // 删除refreshToken
  RefreshToken.delRefreshToken = async (token) => {
    return await RefreshToken.destroy({
      where: {
        refreshToken: token,
      },
    });
  };

  // 获取refreshToken
  RefreshToken.getRefreshToken = async (refreshToken) => {
    return await RefreshToken.findOne({
      where: {
        refreshToken: refreshToken,
      },
    });
  };

  return RefreshToken;
}