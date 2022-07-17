//创建UserServeice对象
class UserService {
  //创建user
  async createUser(user_name, password) {
    // todo: 写入数据库
    return '写入数据库成功';
  }
}
//导出UserService对象
module.exports = new UserService();
