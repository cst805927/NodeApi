const User = require('../model/user.model');
// service对象 用于 操作数据库
//创建UserServeice对象
class UserService {
  // 插入 新用户
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password });
    console.log(res);
    return res.dataValues;
  }
  // 查询 用户
  async getUserInfo ({ id, user_name, password, is_admin }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    })
    return res ? res.dataValues : null;
  }
}
//导出UserService对象
module.exports = new UserService();
