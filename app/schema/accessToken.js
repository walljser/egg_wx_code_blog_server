'use strict';

module.exports = app => {
  const { STRING, DATE, BIGINT } = app.Sequelize;

  return {
    access_token: {
      type: STRING,
      unique: true,
      primaryKey: true,
    },
    access_token_expires_at: {
      type: DATE,
    },
    scope: {
      type: STRING,
    },
    client_id: {
      type: STRING(38),
    },
    user_id: {
      type: BIGINT,
      allowNull: false,
    },
    created_time: {
      type: DATE,
    },
    last_modified_time: {
      type: DATE,
    },
  };
};
