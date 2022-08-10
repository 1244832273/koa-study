const path = require('path');
const Koa = require('koa');
const loggerAsync = require('./middleware/logger-async');
const views = require('koa-views');
const routerCustomer = require('./middleware/router-customer');

const app = new Koa();

const Router = require('koa-router');

let home = new Router();

// 子路由1
// home.get('/', async (ctx) => {
//   let html = `
//     <ul>
//       <li><a href="/page/helloworld">/page/helloworld</a></li>
//       <li><a href="/page/404">/page/404</a></li>
//     </ul>
//   `;
//   ctx.body = html;
// });

app.use(loggerAsync());

// app.use(routerCustomer());

// let router = new Router();
// router.use('/', home.routes(), home.allowedMethods());
// app.use(router.routes()).use(router.allowedMethods());

// 加载模板引擎
app.use(
  views(path.join(__dirname, './view'), {
    extension: 'ejs',
  }),
);

app.use(async (ctx) => {
  let title = 'hello koa2';
  await ctx.render('index', {
    title,
  });
});

app.listen(9000, () => {
  console.log('server is listening in 9000');
});
