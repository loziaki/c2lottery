const Koa = require('koa')
    , KoaJson = require('koa-json')
    , jwt = require('jsonwebtoken')
    , jwtKoa  = require('koa-jwt');

const app = new Koa()
    , router = require('koa-router')()
    , parser = require('koa-bodyparser')()
    , json = new KoaJson()
    , controller = require('./controller')();

app.use(json);
app.use(parser);
app.use(controller);
app.use(jwtKoa ({ secret: 'shared-secret' }).unless({
    path: ['/^\/login/','/^\/getlist/'] //数组中的路径不需要通过jwt验证
}));

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');