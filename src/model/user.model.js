//引入DataType数据类型
const { DataTypes } = require('sequelize');
//引入seq对象
const seq = require('../db/seq');

//创建模型(Model cst_user => cst_users)
const User = seq.define('cst_user', {
  //id会被requelize自动创建，管理
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名， 唯一',
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码',
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员， 0:不是管理员(默认),1:是管理员',
  },
});

//强制同步数据库(如果表已存在，则先删除)
// User.sync({force: true});

// 导出User模型
module.exports = User
