const path = require('path');

// 导入 koa框架
const Koa = require('koa');
// 导入 koa-body
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter');

// 导入 错误处理
const errHandler = require('./errHandler');
// 导入 路由
const router = require('../router');

//创建 koa 对象
const app = new Koa();
// 注册 中间件
app.use(
  KoaBody({
    multipart: true, // 支持多文件上传
    formidable: {
      // 在配置选项options里，不推荐使用相对路径
      // 在option里的相对路径，不是相对的当前文件，相对process.cwd()
      uploadDir: path.join(__dirname, '../upload'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
    },
  })
);
app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(parameter(app))
app.use(router.routes()).use(router.allowedMethods());

// 统一 错误处理
app.on('error', errHandler);

// 导出 app 对象
module.exports = app;
