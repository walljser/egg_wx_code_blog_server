'use strict';

const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');

class ClientService extends Service {
  /**
   * 注册用户
   *
   * @param {any} [params={}] 
   *
   * @memberOf ClientService
   */
  async createNew(params = {}) {
    const { client_name, client_secret, grants } = params;
    console.log(client_name);
    console.log(client_secret);
    const findClient = await this.ctx.model.Client.find({ client_name });
    if (findClient) {
      throw new Error(this.ctx.ERROR_MESSAGE.hasExists);
    }
    const client = await this.ctx.model.Client.create({
      // id: uuidv1(),
      client_secret: client_secret,
      client_name: client_name,
      grants,
    });
    return client;
  }
}

module.exports = ClientService;
