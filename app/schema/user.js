'use strict';

module.exports = app => {
  const { STRING, DATE, BIGINT } = app.Sequelize;

  return {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    username: {
      type: STRING(64),
      allowNull: false,
    },
    hashed_password: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING(32),
    },
    nickname: {
      type: STRING(32),
    },
    position: {
      type: STRING(32),
    },
    description: {
      type: STRING(128),
    },
    created_time: {
      type: DATE,
    },
    last_modified_time: {
      type: DATE,
    },
  };
};
