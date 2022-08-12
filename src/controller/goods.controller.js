const path = require('path');
const {
  fileUploadError,
  unSopportedFileType,
  publishGoodsError,
} = require('../constant/err.type');

const { createGoods } = require('../service/goods.service')
class GoodsController {
  /**
   * 上传 图片
   * @param {Object} ctx
   * @param {Function} next
   */
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    const fileTypes = ['image/jpeg' ,'image/png'];
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit('error', unSopportedFileType, ctx);
      }
      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          goods_img: path.basename(file.filepath),
        },
      };
    } else {
      return ctx.app.emit('error', fileUploadError, ctx);
    }
  }
  /**
   * 发布 商品
   * @param {Object} ctx 
   */
  async create (ctx) {
    // 直接调用service的createGoods方法
    try {
      const res = await createGoods(ctx.request.body);
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res,
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', publishGoodsError, ctx)
    }

  }
}
module.exports = new GoodsController();
