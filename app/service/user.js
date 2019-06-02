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
    console.log(username)
    const findUser = await this.ctx.model.User.getByUsername({ username });
    if (findUser) {
      throw new Error(this.ctx.ERROR_MESSAGE.hasExists);
    }
    console.log(username)
    console.log(password)
    const user = await this.ctx.model.User.register({
      username,
      password,
      email: username,
    });
    return user;
  }
}

module.exports = UserService;
