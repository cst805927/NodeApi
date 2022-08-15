const path = require('path');
const {
  fileUploadError,
  unSopportedFileType,
  publishGoodsError,
  invalidGoodsID,
} = require('../constant/err.type');

const {
  createGoods,
  updateGoods,
  removeGoods,
} = require('../service/goods.service');
class GoodsController {
  /**
   * 上传 图片
   * @param {Object} ctx
   * @param {Function} next
   */
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    const fileTypes = ['image/jpeg', 'image/png'];
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
  async create(ctx) {
    // 直接调用service的createGoods方法
    try {
      const { createdAt, updatedAt, ...res } = await createGoods(
        ctx.request.body
      );
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res,
      };
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', publishGoodsError, ctx);
    }
  }
  /**
   * 修改 商品
   */
  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改商品成功',
          result: '',
        };
      } else {
        return ctx.app.emit('error', invalidGoodsID, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * 删除 商品
   * @param {Object} ctx
   */
  async remove(ctx) {
    await removeGoods(ctx.params.id);
    ctx.body = {
      code: 0,
      message: '删除商品成功',
      result: ''
    }
  }
}
module.exports = new GoodsController();
