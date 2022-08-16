const Router = require('koa-router');

const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/goods.middleware');

const {
  upload,
  create,
  update,
  remove,
  restore,
} = require('../controller/goods.controller');

const router = new Router({ prefix: '/goods' });

// 商品图片上传 接口
router.post('/upload', auth, hadAdminPermission, upload);

// 发布商品 接口
router.post('/', auth, hadAdminPermission, validator, create);

// 修改商品 接口
router.put('/:id', auth, hadAdminPermission, validator, update);

// 硬删除商品 接口
// router.delete('/:id', auth, hadAdminPermission, remove);

// 下架商品 接口
router.post('/:id/off', auth, hadAdminPermission, remove);

// 上架商品 接口
router.post('/:id/on', auth, hadAdminPermission, restore)

module.exports = router;
