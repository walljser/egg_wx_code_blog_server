'use strict';

const Controller = require('../common/core/base_controller');

const createRule = {
  client_name: {
    type: 'string',
    max: 32,
  },
  client_secret: {
    type: 'string',
    max: 64,
  },
  grants: {
    type: 'string',
  },
};

/**
 * @Controller client 客户端接口
 */
class ClientController extends Controller {
  /**
   * @summary 获取客户端
   * @description 分页获取客户端信息
   * @router get /v1/clients
   * @request query integer $offset
   * @request query integer $limit
   * @response 200 queryClientResponse successed
   */
  async index() {
    const { ctx } = this;
    const limit = ctx.helper.toInt(ctx.query.$limit);
    const offset = ctx.helper.toInt(ctx.query.$offset);
    let resData;
    if (limit >= 0 && offset >= 0) {
      resData = await ctx.model.Client.query({
        offset,
        limit,
      });
    } else {
      resData = await ctx.model.Client.findAll();
    }
    this.success(resData);
  }

  async create() {
    const ctx = this.ctx;
    const requestBody = ctx.request.body;
    ctx.validate(createRule, requestBody);
    console.log(requestBody);

    try {
      const res = await ctx.service.client.createNew(requestBody);
      this.success({
        id: res.id,
      }, 201);
    } catch (err) {
      if (err.message === ctx.ERROR_MESSAGE.hasExists) {
        this.failure(ctx.UNIQUE_CODE, '客户端名称已存在');
      } else {
        throw new Error(err);
      }
    }
  }
}

module.exports = ClientController;
