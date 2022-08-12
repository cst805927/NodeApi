//导入 用户 model对象
const User = require('../model/user.model');
// service对象 用于 操作数据库

/**
 * 用户 service对象
 */
class UserService {
  /**
   * 插入 新用户
   * @param {String} user_name
   * @param {String} password
   * @returns
   */
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password });
    return res.dataValues;
  }
  /**
   * 查询 用户
   * @param {Object} param0
   * @returns
   */
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }
  /**
   * 修改 密码
   * @param {Obect} param0 
   */
  async updateById ({id, user_name, password, is_admin}) {
    const whereOpt = { id };
    const newUser = {}
    user_name && Object.assign(newUser, {user_name})
    password && Object.assign(newUser, {password})
    is_admin && Object.assign(newUser, { is_admin })
    const res = await User.update(newUser, { where: whereOpt })
    return res[0] > 0 ? true : false;
  }
  
}
//导出UserService对象
module.exports = new UserService();
