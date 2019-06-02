'use strict';

module.exports = app => {
  const { STRING, DATE, BIGINT } = app.Sequelize;

  return {
    code: {
      type: STRING,
      primaryKey: true,
      unique: true,
    },
    expiresAt: {
      type: DATE
    },
    redirectUri: {
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
