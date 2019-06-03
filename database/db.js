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
      createdAt: 'created_time',
      updatedAt: 'last_modified_time',
      freezeTableName: true,
      getterMethods: {
        created_time() {
          const created_time = this.getDataValue('created_time');
          // if (created_time) {
          //   return app.formatToDayTime(created_time);
          // }
          return created_time;
        },
        last_modified_time() {
          const last_modified_time = this.getDataValue('last_modified_time');
          // if (last_modified_time) {
          //   return app.formatToDayTime(last_modified_time);
          // }
          return last_modified_time;
        },
      },
      setterMethods: {},
    });
  },
};
