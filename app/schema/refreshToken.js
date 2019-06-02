'use strict';

module.exports = app => {
  const { STRING, DATE, BIGINT } = app.Sequelize;

  return {
    refreshToken: {
      type: STRING,
      unique: true,
      primaryKey: true,
    },
    refreshTokenExpiresAt: {
      type: DATE,
    },
    scope: {
      type: STRING,
    },
    clientId: {
      type: STRING(38),
    },
    userId: {
      type: BIGINT,
      allowNull: false,
    },
    createdTime: {
      type: DATE,
    },
    lastModifiedTime: {
      type: DATE,
    },
  }
}