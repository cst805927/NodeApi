const Goods = require('../model/goods.model')
// 商品相关service
class GoodsService {
  /**
   * 创建 商品
   * @param {Object} goods 
   * @returns 
   */
  async createGoods (goods) {
    const res = await Goods.create(goods)
    return res.dataValues
  }
}
module.exports = new GoodsService()