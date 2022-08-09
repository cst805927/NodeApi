// 导入 koa框架
const Koa = require('koa');
// 导入 koa-body
const KoaBody = require('koa-body');
// 导入 错误处理 
const errHandler = require('./errHandler')
// 导入 路由
const router = require('../router')

//创建 koa 对象
const app = new Koa();
// 注册 中间件
app.use(KoaBody());
app.use(router.routes()).use(router.allowedMethods())
// 统一 错误处理
app.on('error', errHandler);

// 导出 app 对象
module.exports = app;
