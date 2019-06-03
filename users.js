'use strict';

module.exports = app => {
  const { STRING, UUIDV1, DATE } = app.Sequelize;

  return {
    id: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    username: {
      type: STRING(32),
    },
    password: {
      type: STRING(32),
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
      type: STRING(32),
    },
    created_time: {
      type: DATE,
    },
  };
};
