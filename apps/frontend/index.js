const { join } = require('path');
const Koa = require('koa');
const render = require('koa-ejs');
const serve = require('koa-static');
const logger = require('koa-logger');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');

const cfg = require('./config');
const contextTools = require('../common/utils/context'); // koa ctx 工具
const ctrlLoader = require('../common/utils/loader/router'); // 路由加载器

const app = new Koa();

// 原型工具 ==================
onerror(app); // 错误处理
contextTools(app); // 挂载 koa ctx 工具
render(app, { // 挂载渲染方法
  root: join(__dirname, 'views'),
  layout: 'layout/main',
  viewExt: 'ejs',
  locals: {
    title: cfg.name,
  },
  cache: !cfg.debug,
  debug: false,
});

// 中间件 ==================
app.use(serve(join(__dirname, 'web'))); // 静态文件目录
app.use(logger()); // 日志 (不记录静态文件访问记录)
app.use(bodyparser({ // post 数据解析
  formLimit: '5mb',
  jsonLimit: '5mb',
}));

// 自定义区域 ==================

// 加载路由
const router = ctrlLoader(cfg.appPath);
app.use(router.routes()).use(router.allowedMethods());

// 404
app.use((ctx) => {
  ctx.status = 404;
  ctx.body = 'Not Found';
});

module.exports = app;
