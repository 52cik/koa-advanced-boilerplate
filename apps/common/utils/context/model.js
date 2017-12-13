const mongoose = require('mongoose');

/**
 * mongo 模型加载工具
 *
 * @param {koa} app koa 实例
 *
 * @example
 *
 * ````js
 * app.use(async (ctx) => {
 *   const user = await ctx.model('User').find({ name: 'admin' });
 * });
 * ````
 */
module.exports = (app) => {
  app.context.model = name => mongoose.model(name);
};
