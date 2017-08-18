const model = require('../model')
    , jwt = require('jsonwebtoken');
    
let user = model.user;

var canIlogin = async (u, p) => {
    var result = await user.find({
        where: {
            account: u,
            passwd: p
        }
    }).catch((err) => {
        console.log('failed: ' + err);
    });
    console.log('found: ' + JSON.stringify(result));
    return result;
};

var fn_login = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`login with name: ${name}, password: ${password}`);
    let result = await canIlogin(name, password);
    if (result != null) {
        const userToken = {
            name: result.account,
            id: result.uid
        }
        const secret = 'vue-koa-demo'
            , token = jwt.sign(userToken, secret,{expiresIn: '1h'});
        ctx.response.body = {
            error: 0,
            uid: result.uid,
            uname: result.name,
            token: token,
        };
    } else {
        ctx.response.body = {
            error: 1,
            info: "account or passwd has problem"
        };
    }
};

module.exports = {
    'POST /login': fn_login
};