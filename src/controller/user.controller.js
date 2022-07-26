//导入userService对象
const { createUser, getUserInfo } = require('../service/user.service.js');
//创建UserController类
class UserController {
  //注册register
  async register(ctx, next) {
    //1.获取数据
    const { user_name, password } = ctx.request.body;
    // 合法性（用户名或密码为空）
    if (!user_name || !password) {
      console.error('用户名或密码为空', ctx.request.body); // 错误日志
      ctx.status = 400; // 请求参数出错
      ctx.body = {
        code: '10001',
        message: '用户名或密码为空',
        result: '',
      };
      return;
    }
    // 合理性（用户存在）
    if (getUserInfo({ user_name })) {
      ctx.status = 409; // 冲突
      ctx.body = {
        code: '10002',
        message: '用户已经存在',
        result: ''
      }
      return;
    }

    //2.操作数据库
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
  }
  //登录login
  async login(ctx, next) {
    ctx.body = '登录成功';
  }
}
//导出UserController对象
module.exports = new UserController();
