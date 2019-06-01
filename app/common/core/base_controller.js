'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data, status = 200) {
    this.ctx.body = { code: this.ctx.SUCCESS_CODE, data };
    this.ctx.status = status;
  }

  failure(code, message, status = 400) {
    this.ctx.body = { code, message, data: {} };
    this.ctx.status = status;
  }

  notFound(message) {
    message = message || 'not found';
    this.ctx.throw(404, message);
  }
}

module.exports = BaseController;
