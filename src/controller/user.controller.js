//创建UserController类
class UserController {
  async register(ctx, next) {
    ctx.body = '用户注册成功';
  }
  async login(ctx, next) {
    ctx.body = '登录成功';
  }
}
//导出UserController对象
module.exports = new UserController();
