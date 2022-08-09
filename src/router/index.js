// 导入 fs 对象
const fs = require('fs')
// 导入 router 对象
const Router = require('koa-router');
// 创建 router 实例
const router = new Router();
// 读取 fs 文件名
fs.readdirSync(__dirname).forEach(file => {
  // 如果 文件名 不为 index.js
  if (file !== 'index.js') {
    // 动态生成 路由
    let r = require('./' + file);
    // 注册 路由
    router.use(r.routes())
  }
})
// 导出 路由
module.exports = router