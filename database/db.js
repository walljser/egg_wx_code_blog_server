'use strict';
const _ = require('lodash');

module.exports = {
  defineModel(app, name, attributes, attributes1) {
    const attrs = {};

    for (const key in attributes) {
      const value = attributes[key];
      if (_.isObject(value) && value.type) {
        value.allowNull = value.allowNull && true;
        attrs[key] = value;
      } else {
        attrs[key] = {
          type: value,
          allowNull: true,
        };
      }
    }

    return app.model.define(name, attrs, attributes1 || {
      createdAt: 'createdTime',
      updatedAt: 'lastModifiedTime',
      freezeTableName: true,
      getterMethods: {
        createdTime() {
          const createdTime = this.getDataValue('create_time')
          // if (createdTime) {
          //   return app.formatToDayTime(createdTime);
          // }
          return createdTime;
        },
        lastModifiedTime() {
          const lastModifiedTime = this.getDataValue('lastModifiedTime');
          // if (lastModifiedTime) {
          //   return app.formatToDayTime(lastModifiedTime);
          // }
          return lastModifiedTime;
        },
      },
      setterMethods: {},
    });
  },
};
