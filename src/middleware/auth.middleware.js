// 引入 jwt 对象
const jwt = require('jsonwebtoken')
// 引入 JWT配置
const { JWT_SECRET } = require('../config/config.default')
// 引入 错误类型
const { tokenExpiredError, invalidToken } = require('../constant/err.type');
/**
 * token认证
 * @param {Object} ctx 
 * @param {Function} next 
 * @returns 
 */
const auth = async (ctx, next) => {
  // 获取 前端传入的 authorization
  const { authorization} = ctx.request.header;
  // 获取 前端传入的 token
  const token = authorization.replace('Bearer ', '');
  try {
    // 验证 token 是否合法
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) { // token
    switch (err.name) {
      // token 已过期
      case 'TokenExpiredError':
        console.error('token已过期', err);
        return ctx.app.emit('error', tokenExpiredError, ctx);
      // 无效的 token
      case 'JsonWebTokenError':
        console.error('无效的token', err);
        return ctx.app.emit('error', invalidToken, ctx);
    }
  }
  await next();
}
module.exports = {
  auth
}