const { Op } = require('sequelize');
const Cart = require('../model/cart.model');
class CartService {
  /**
   * 添加商品到数据库
   * @param {*} user_id
   * @param {*} goods_id
   */
  async createOrUpdate(user_id, goods_id) {
    try {
      // 根据 user_id 和 goods_id 同时查找，有没有记录
      let res = await Cart.findOne({
        where: {
          [Op.and]: {
            user_id,
            goods_id,
          },
        },
      });
      if (res) {
        // 已经存在一条记录，将 number + 1
        await res.increment('number');
        return await res.reload();
      } else {
        return Cart.create({
          user_id,
          goods_id,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * 获取 购物车列表
   * @param {*} pageNum
   * @param {*} pageSize
   */
  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Cart.findAndCountAll({
      offset,
      limit: +pageSize,
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
}
module.exports = new CartService();
