//导入userService对象
const { createUser } = require('../service/user.service.js');
//创建UserController类
class UserController {
  //注册register
  async register(ctx, next) {
    //1.获取数据
    const { user_name, password } = ctx.request.body;
    //2.操作数据库
    const res = await createUser(user_name, password);
    //3.返回数据
    ctx.body = res;
  }
  //登录login
  async login(ctx, next) {
    ctx.body = '登录成功';
  }
}
//导出UserController对象
module.exports = new UserController();
