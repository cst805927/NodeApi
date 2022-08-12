const { goodsFormatError } = require('../constant/err.type')
/**
 * 校验 商品参数格式
 * @param {Object} ctx 
 * @param {Function} next 
 * @returns 
 */
const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: {type: 'string', required: true},
      goods_price: { type: 'number', require: true },
      goods_num: { type: 'number', required: true },
      goods_img: { type: 'string', required: true },
    })
  } catch (err) {
    console.error(err)
    goodsFormatError.result = err;
    return ctx.app.emit('error', goodsFormatError, ctx);
  }
  await next();
}

module.exports = {
  validator
}