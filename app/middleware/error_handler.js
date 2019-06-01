'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      console.log(err);
      // 记录错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      ctx.body = { error };
      if (status === 422) {
        const fieldError = err.errors[0] || {}
        ctx.body = {
          ...ctx.body,
          ...fieldError,
        };
      }
      ctx.status = status;
    }
  };
};
