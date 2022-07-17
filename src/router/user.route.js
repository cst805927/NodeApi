//导入koa-router
const Router = require('koa-router');

//导入接口
const { register,login } = require('../controller/user.controller');


//实例化一个路由对象
const router = new Router({ prefix: '/users' }); //url前缀

//设置register接口路由
router.post('/register', register);

//设置login接口路由
router.post('/login', login);

//导出路由对象
module.exports = router;
