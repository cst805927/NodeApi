class GoodsService {
  async createGoods (goods) {
    console.log('发布成功')
    return {
      goods_name: '蓝牙音箱',
    }
  }
}
module.exports = new GoodsService()