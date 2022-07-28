//引入koa框架
const Koa = require('koa');
//引入 koa-body
const KoaBody = require('koa-body');
// 引入 错误处理 
const errHandler = require('./errHandler')

//导入路由
const userRouter = require('../router/user.route');

//实例化对象
const app = new Koa();

//注册中间件
app.use(KoaBody());
app.use(userRouter.routes());

// 统一的错误处理
app.on('error', errHandler);

//导出app对象
module.exports = app;
