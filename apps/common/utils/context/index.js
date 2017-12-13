/**
 * koa 静态绑定上下文工具
 */

const model = require('./model'); // mongo 模型加载工具

module.exports = (app) => {
  model(app);
  // other
};
