'use strict';
const db = require('../../database/db.js');
const bcrypt = require('bcrypt');

module.exports = app => {
  const userSchema = require('../schema/user.js')(app);
  const User = db.defineModel(app, 'user', userSchema);

  // 查找用户
  User.getByUserId = async ({ id, attributes }) => {
    return await User.findOne({
      attributes,
      where: { id },
    });
  };

  // 根据用户名查找用户
  User.getByUsername = async ({ username, attributes }) => {
    return await User.findOne({
      attributes,
      where: { username },
    });
  };

  User.register = async (fields) => {
    console.log(fields);
    fields.hashedPassword = hashPassword(fields.password);
    delete fields.password;
    console.log(fields);
    return await User.create(fields);
  };

  User.getUser = async (username, password) => {
    return await User.authenticate(username, password);
  }

  User.authenticate = async (username, password) => {
    const user = await User.findOne({
      where: {
        username,
      },
      attributes: ['id', 'username', 'hashedPassword', 'email', 'nickname', 'position', 'description'],
    });
    if (!user) return;
    return bcrypt.compareSync(password, user.hashedPassword) ? (delete user.dataValues.hashedPassword && user) : null;
  }

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

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
