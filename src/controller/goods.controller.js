class GoodsController {
  async upload (ctx, next) {
    ctx.body = '商品照片上传成功'
  }
}
module.exports = new GoodsController()