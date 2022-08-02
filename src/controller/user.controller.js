//导入userService对象
const { createUser } = require('../service/user.service.js');
const { userRegiterError } = require('../constant/err.type');
//创建UserController类
class UserController {
  //注册register
  async register(ctx, next) {
    //1.获取数据
    const { user_name, password } = ctx.request.body;

    //2.操作数据库
    try {
      const res = await createUser(user_name, password);
      //3.返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      console.error(err)
      ctx.app.emit('error', userRegiterError, ctx);
    }
  }
  //登录login
  async login(ctx, next) {
    ctx.body = '登录成功';
  }
}
//导出UserController对象
module.exports = new UserController();
