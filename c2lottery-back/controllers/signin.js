const model = require('../model');

let user = model.user;

var insertNewUser = async (u,a,p) => {
    var result = await user.create({
        name: u,
        account: a,
        passwd: p,
    }).catch((err) => {
        console.log('failed: ' + err);
        return false;
    }); 
    console.log('insert: ' + JSON.stringify(result));
    return true;
};


var fn_signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        account = ctx.request.body.account || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name},account: ${account}, password: ${password}`);
    let result = await insertNewUser(name,account,password);
    if (result == true) {
        ctx.response.body = {error: 0,msg:"success"};
    } else {
        ctx.response.body = {error: 1,msg:"false"};
    }
};

module.exports = {
    'POST /signin': fn_signin
};