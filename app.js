const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const routerBus = require('./router/index.js'); //加载请求路由
const Sqlquery = require("./mysqlServer.js");   //连接数据库
const nunjucks = require('nunjucks');
const app = new Koa();
app.use(bodyParser());
app.use(router.routes());
/** 挂载模板引擎*/
app.context.render = async (view, model, ctx) => {
    ctx.response.body = new nunjucks.Environment(
        new nunjucks.FileSystemLoader('view', {
            noCache: true,
            watch: true,
        }), {
            autoescape: false,
            throwOnUndefined: true
        }).render(view, model);
}
/**挂载mysql查询引擎 */
app.context.sqlquery = Sqlquery;
/**加载路由监听 */
routerBus.map(v => v(router));
// 在端口3000监听:
app.listen(3000);

console.log('server is running at：3000...');
