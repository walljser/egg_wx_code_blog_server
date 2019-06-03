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

/**
 * @Controller user 用户接口
 */
class UserController extends Controller {
  /**
   * @summary 获取用户
   * @description 分页获取用户信息
   * @router get /v1/users
   * @request query integer $offset
   * @request query integer $limit
   * @response 200 queryUserResponse successed
   */
  async index() {
    const { ctx } = this;
    const limit = ctx.helper.toInt(ctx.query.$limit);
    const offset = ctx.helper.toInt(ctx.query.$offset);
    let resData;
    const attributes = [ 'id', 'username', 'nickname', 'email', 'position', 'description', 'created_time', 'last_modified_time' ];
    if (limit >= 0 && offset >= 0) {
      resData = await ctx.model.User.query({
        offset,
        limit,
        attributes,
      });
    } else {
      resData = await ctx.model.User.findAll({
        attributes,
      });
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
      if (err.message === ctx.ERROR_MESSAGE.hasExists) {
        this.failure(ctx.UNIQUE_CODE, '用户名已存在');
      } else {
        throw new Error(err);
      }
    }
  }

  async token() {
    this.ctx.body = this.ctx.state.oauth.token;
  }

  async authenticate() {
    this.ctx.body = {
      message: 'successed!',
    };
  }
}

module.exports = UserController;
