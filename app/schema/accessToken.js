'use strict';

module.exports = app => {
  const { STRING, DATE, BIGINT } = app.Sequelize;

  return {
    accessToken: {
      type: STRING,
      unique: true,
      primaryKey: true,
    },
    accessTokenExpiresAt: {
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
  };
};
