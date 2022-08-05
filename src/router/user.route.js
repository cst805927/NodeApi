//导入 koa-router
const Router = require('koa-router');

//导入 中间件
const {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
} = require('../middleware/user.middleware');

//导入 接口
const { register, login } = require('../controller/user.controller');

//实例化一个路由对象
const router = new Router({ prefix: '/users' }); //url前缀

/**
 * 注册 接口
 */
router.post('/register', userValidator, verifyUser, crpytPassword, register);

/**
 * 登录 接口
 */
router.post('/login', userValidator, verifyLogin, login);

//导出路由对象
module.exports = router;
