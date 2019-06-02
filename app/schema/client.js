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
    clientSecret: {
      type: STRING(64),
      allowNull: false,
    },
    clientName: {
      type: STRING(32),
    },
    redirectUris: {
      type: STRING(1024),
    },
    grants: {
      type: STRING(1024),
    },
    createdTime: {
      type: DATE,
    },
    lastModifiedTime: {
      type: DATE,
    },
  };
};
