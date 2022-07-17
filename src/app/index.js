//引入koa框架
const Koa = require('koa');

//导入编写好的userRouter
const userRouter = require('../router/user.route');

//实例化对象
const app = new Koa();

//注册userRouter路由
app.use(userRouter.routes());

//导出app对象
module.exports = app;
