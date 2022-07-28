//导入 koa-router
const Router = require('koa-router');

//导入 校验 中间件
const { userValidator, verifyUser } = require('../middleware/user.middleware');

//导入 接口
const { register, login } = require('../controller/user.controller');

//实例化一个路由对象
const router = new Router({ prefix: '/users' }); //url前缀

//设置register接口路由
router.post('/register', userValidator, verifyUser, register);

//设置login接口路由
router.post('/login', login);

//导出路由对象
module.exports = router;
