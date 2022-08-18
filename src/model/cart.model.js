// 1. 导入 sequelize
const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
// 2. 定义 模型
const Cart = seq.define('cst_carts', {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品的id',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户的id',
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '商品的数量',
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否选中',
  },
});
// 3. 同步 数据库
// Cart.sync({ force: true });

// 4. 导出 模型
module.exports = Cart;
