//引入 APP_PORT
const { APP_PORT } = require('./config/config.default');
//导入app
const app = require('./app')
app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});
