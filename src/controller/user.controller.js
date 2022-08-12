// 导入 jwt对象
const jwt = require('jsonwebtoken');
//导入 用户 service类
const {
  createUser,
  getUserInfo,
  updateById,
} = require('../service/user.service.js');
// 导入 错误类型
const { userRegiterError } = require('../constant/err.type');
// 导入 jwt配置
const { JWT_SECRET } = require('../config/config.default');

/**
 * 用户 controller类
 */
class UserController {
  /**
   * 用户 注册
   * @param {Object} ctx
   * @param {Function} next
   */
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
      console.error(err);
      ctx.app.emit('error', userRegiterError, ctx);
    }
  }
  /**
   * 用户 登录
   * @param {Object} ctx
   * @param {Function} next
   */
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    // 1. 获取用户令牌
    try {
      // 从返回结果对象中剔除password属性，将剩下的属性放到res对象
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
        },
      };
    } catch (err) {
      console.error('用户登录失败', err);
    }
  }
  /**
   * 修改 密码
   */
  async changePassword (ctx, next) {
    // 1. 获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    // 2. 操作数据库
    if (await updateById({ id, password })) {
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        result: '',
      };
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码失败',
        result: '',
      }
    }
  }
}
//导出UserController对象
module.exports = new UserController();
