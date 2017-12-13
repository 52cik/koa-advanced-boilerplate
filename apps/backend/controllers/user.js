const Router = require('koa-router');

const router = new Router();

// 测试页面
router.get('/user', async (ctx) => {
  ctx.body = 'user';
});

module.exports = router;
