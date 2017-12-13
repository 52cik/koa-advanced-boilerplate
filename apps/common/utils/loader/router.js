const fs = require('fs');
const { join } = require('path');
const Router = require('koa-router');

/**
 * 加载全部 (排除exclude部分)
 */
function loadAll(ctrldir) {
  const routes = [];
  const files = fs.readdirSync(ctrldir);

  files.forEach((name) => {
    const filePath = join(ctrldir, name);
    const stat = fs.statSync(filePath);
    try {
      if (stat.isFile() && /\.js$/.test(filePath)) {
        // load js
        routes.push(require(filePath)); // eslint-disable-line
      } else if (stat.isDirectory() && fs.existsSync(join(filePath, 'index.js'))) {
        // load dir
        routes.push(require(`${filePath}/index.js`)); // eslint-disable-line
      }
    } catch (err) {
      console.error(err);
    }
  });

  return routes;
}

/**
 * 加载路由
 *
 * @param {string} appPath 应用跟目录
 */
function loadRouter(appPath) {
  const router = new Router();
  const ctrldir = join(appPath, 'controllers');
  loadAll(ctrldir).forEach((route) => {
    router.use('', route.routes(), route.allowedMethods());
  });
  return router;
}

module.exports = loadRouter;
