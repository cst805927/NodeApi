const { invalidGoodsID } = require('../constant/err.type');
/**
 * 校验 参数
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_id: 'number',
    });
  } catch (err) {
    console.error(err);
    return ctx.app.emit('error', invalidGoodsID, ctx);
  }
  await next();
};
module.exports = { validator };
