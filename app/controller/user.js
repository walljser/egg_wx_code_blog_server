'use strict';

const _ = require('lodash');
const Controller = require('../common/core/base_controller');

const createRule = {
  username: {
    type: 'email',
    max: 64,
  },
  password: {
    type: 'string',
    max: 32,
  },
};

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    const limit = ctx.helper.toInt(ctx.query.$limit);
    const offset = ctx.helper.toInt(ctx.query.$offset);
    let resData;
    if (limit >= 0 && offset >= 0) {
      resData = await ctx.model.User.query({
        offset,
        limit,
      });
    } else {
      resData = await ctx.model.User.findAll();
    }
    this.success(resData);
  }

  async create() {
    const ctx = this.ctx;
    const requestBody = ctx.request.body;
    ctx.validate(createRule, requestBody);

    try {
      const res = await ctx.service.user.createNew(requestBody);
      this.success({
        id: res.id,
      }, 201);
    } catch (err) {
      if (err.message === ctx.ERROR_MESSAGE.hasExist) {
        this.failure(ctx.UNIQUE_CODE, '用户名已存在');
      } else {
        throw new Error(err);
      }
    }
  }
}

module.exports = UserController;
