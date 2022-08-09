const bcrypt = require('bcryptjs');

const { getUserInfo } = require('../service/user.service');
const {
  userFormateError,
  userAlreadyExited,
  userRegiterError,
  userDoesNotExists,
  userLoginError,
  invalidPassword,
} = require('../constant/err.type');
/**
 * 检验 前端 传参数 合法性
 * @param {Object} ctx 前端传参
 * @param {Function} next 下一步执行的函数
 */
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body); // 错误日志
    ctx.app.emit('error', userFormateError, ctx);
    return;
  }

  await next();
};
/**
 * 检验 用户 是否存在
 * @param {Object} ctx 前端传参
 * @param {Function} next 下一步执行的函数
 */
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      console.error('用户名已经存在', user_name);
      ctx.app.emit('error', userAlreadyExited, ctx);
      return;
    }
  } catch (err) {
    console.error('获取用户信息错误', err);
    ctx.app.emit('error', userRegiterError, ctx);
    return;
  }
  await next();
};
/**
 * 加密 密码
 * @param {Object} ctx 前端传参
 * @param {Function} next 下一步执行的函数
 */
const crpytPassword = async (ctx, next) => {
  // 获取 前端传参 密码
  const { password } = ctx.request.body;
  // 生成 盐
  const salt = bcrypt.genSaltSync(10);
  // 加密
  const hash = bcrypt.hashSync(password, salt);
  // 替换 密码
  ctx.request.body.password = hash;
  await next();
}
/**
 * 验证 登录
 * @param {Object} ctx 前端传参
 * @param {Function} next 下一步执行的函数
 * @returns {Object} 登录错误
 */
const verifyLogin = async (ctx, next) => {
  // 获取 前端 传参
  const { user_name, password } = ctx.request.body;
  try {
    // 查找 数据库 用户
    const res = await getUserInfo({ user_name });
    // 1. 判断用户是否存在（不存在：报错）
    if (!res) {
      console.error('用户名不存在', { user_name });
      ctx.app.emit('error', userDoesNotExists, ctx);
      return;
    }
    // 2. 密码是否匹配（不匹配：报错）
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx);
      return;
    }
  } catch (err) {
    console.error(err);
    return ctx.app.emit('error', userLoginError, ctx);
  }

  await next();
}
module.exports = { userValidator, verifyUser, crpytPassword, verifyLogin };
