const Router = require('koa-router');

const router = new Router();

// 测试页面
router.get('/', async (ctx) => {
  await ctx.render('index', {
    title: 'koa-fontend index',
  });
});

module.exports = router;
