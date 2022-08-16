const Goods = require('../model/goods.model');
// 商品相关service
class GoodsService {
  /**
   * 创建 商品
   * @param {Object} goods
   * @returns
   */
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }
  /**
   * 修改 商品
   * @param {String} id
   * @param {Object} goods
   * @returns
   */
  async updateGoods(id, goods) {
    const res = await Goods.update(goods, { where: { id } });
    return res[0] > 0 ? true : false;
  }
  /**
   * 删除 商品
   * @param {String} id
   */
  async removeGoods(id) {
    const res = await Goods.destroy({ where: { id } });
    return res > 0 ? true : false;
  }
  /**
   * 上架 商品
   * @param {Stirng} id
   */
  async restoreGoods(id) {
    const res = await Goods.restore({ where: { id } });
    return res > 0 ? true : false;
  }
}
module.exports = new GoodsService();
