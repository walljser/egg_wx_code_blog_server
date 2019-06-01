'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const userSchema = require('../schema/user.js')(app);
  const User = db.defineModel(app, 'user', userSchema);

  // 查找用户
  User.findByUserId = async ({ id, attributes }) => {
    return await User.findOne({
      attributes,
      where: { id },
    });
  };

  User.findByUsername = async ({ username, attributes }) => {
    return await User.findOne({
      attributes,
      where: { username },
    });
  };

  User.query = async ({ attributes, offset, limit, filter = {}, sort = [] }) => {
    const order = app.getSortInfo(sort);
    const condition = {
      limit,
      offset,
      order,
      attributes,
    };

    return app.getPaginationData(await User.findAndCountAll(condition));
  };

  return User;
};
