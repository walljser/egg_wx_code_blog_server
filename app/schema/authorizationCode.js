'use strict';

module.exports = app => {
  const { STRING, DATE, BIGINT } = app.Sequelize;

  return {
    code: {
      type: STRING,
      primaryKey: true,
      unique: true,
    },
    expires_at: {
      type: DATE,
    },
    redirect_uri: {
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
