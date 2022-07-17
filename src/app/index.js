//引入koa框架
const Koa = require('koa');
//引入 koa-body
const KoaBody = require('koa-body');

//导入路由
const userRouter = require('../router/user.route');

//实例化对象
const app = new Koa();

//注册中间件
app.use(KoaBody());
app.use(userRouter.routes());

//导出app对象
module.exports = app;
