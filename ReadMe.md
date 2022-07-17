# 一、项目的初始化

## 1 npm初始化

```
npm init -y
```

生成 `package.json`文件：

- 记录项目的依赖

## 2 git初始化

```
git init
```

生成.git隐藏文件夹，git的本地仓库

### 3 创建 ReadMe 文件

# 二、搭建项目

## 1 安装Koa框架

```
npm install koa
```

## 2 编写最基础的app

创建`src/main.js`

```
const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
```

# 3 测试

在终端，使用`node src/main.js`

![image-20220715122316813](ReadMe.assets/image-20220715122316813.png)

# 三、项目的基本优化

## 1 自动重启服务

安装nodemon工具

```
npm i nodemon
```

编写`package.json`脚本

```
"scripts": {
    "dev": "nodemon ./src/main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

执行`npm run dev`启动服务

![image-20220715123000084](ReadMe.assets/image-20220715123000084.png)

## 2 读取配置文件

安装`dotenv`，读取根目录中的`.env`文件，将配置写`process.env`中

```
npm i dotenv
```

创建`.env`文件

```
APP_PORT=8000
```

创建`src/config/config.default.js`

```
const dotenv = require('dotenv')

dotenv.config()

// console.log(process.env.APP_PORT)

module.exports = process.env
```

改写`main.js`

```
const Koa = require('koa');

const { APP_PORT } = require('./config/config.default');

const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'hello api';
});

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});

```

# 四、添加路由

路由：根据不同的URL，调用对应处理函数

## 1 安装koa-router

```
npm i koa-router
```

步骤：

1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件

## 2 编写路由

创建`src/router`目录，编写`user.route.js`

```js
//导入koa-router
const Router = require('koa-router');

//实例化一个路由对象
const router = new Router({ prefix: '/users' }); //使用统一的前缀

//编写路由
// GET /users/
router.get('/', (ctx, next) => {
  ctx.body = 'hello users';
});

//导出路由对象
module.exports = router;
```

### 3 改写main.js

```js
const Koa = require('koa');

const { APP_PORT } = require('./config/config.default');

//导入编写好的router
const userRouter = require('./router/user.route')

const app = new Koa();

//注册中间件
app.use(userRouter.routes())

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});

```

# 五、目录结构优化

## 1 将http服务和app业务拆分

创建`src/app/index.js`

```js
//引入koa框架
const Koa = require('koa');

//导入编写好的userRouter
const userRouter = require('../router/user.route');

//实例化koa对象
const app = new Koa();

//注册userRouter路由
app.use(userRouter.routes());

//导出app对象
module.exports = app;
```

## 2 将路由和控制器拆分

路由：解析URL，分发给控制器对应的方法

控制器：处理不同的业务

改写`src/router/user.route.js`

```js
//导入koa-router
const Router = require('koa-router');

//导入接口
const { register,login } = require('../controller/user.controller');

//实例化一个路由对象
const router = new Router({ prefix: '/users' }); //url前缀

//设置register接口路由
router.post('/register', register);

//设置login接口路由
router.post('/login', login);

//导出路由对象
module.exports = router;
```

创建`src/controller/user.controller.js`

```js
//创建UserController类
class UserController {
  async register(ctx, next) {
    ctx.body = '用户注册成功';
  }
  async login(ctx, next) {
    ctx.body = '登录成功';
  }
}
//导出UserController对象
module.exports = new UserController();
```

