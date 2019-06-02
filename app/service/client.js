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
    const { clientName, clientSecret, grants } = params;
    console.log(clientName);
    console.log(clientSecret);
    const findClient = await this.ctx.model.Client.find({ clientName });
    if (findClient) {
      throw new Error(this.ctx.ERROR_MESSAGE.hasExists);
    }
    const client = await this.ctx.model.Client.create({
      // id: uuidv1(),
      clientSecret: clientSecret,
      clientName: clientName,
      grants,
    });
    return client;
  }
}

module.exports = ClientService;
