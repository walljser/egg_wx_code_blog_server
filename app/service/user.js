'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 注册用户
   *
   * @param {any} [params={}] 
   *
   * @memberOf UserService
   */
  async createNew(params = {}) {
    const { username, password } = params;
    const findUser = await this.ctx.model.User.findByUsername({ username });
    if (findUser) {
      throw new Error(this.ctx.ERROR_MESSAGE.hasExist);
    }
    const user = await this.ctx.model.User.create({
      username,
      password,
      email: username,
    });
    return user;
  }
}

module.exports = UserService;
