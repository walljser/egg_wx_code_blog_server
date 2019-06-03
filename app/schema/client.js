'use strict';

module.exports = app => {
  const { STRING, DATE, UUIDV4 } = app.Sequelize;

  return {
    id: {
      type: STRING(38),
      unique: true,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    client_secret: {
      type: STRING(64),
      allowNull: false,
    },
    client_name: {
      type: STRING(32),
    },
    redirect_uris: {
      type: STRING(1024),
    },
    grants: {
      type: STRING(1024),
    },
    created_time: {
      type: DATE,
    },
    last_modified_time: {
      type: DATE,
    },
  };
};
