const model = require('../model');

let comment = model.comment;

var insertNewComment = async (msg) => {
    var result = await comment.create(msg).catch((err) => {
        console.log('failed: ' + err);
        return false;
    }); 
    console.log('insert: ' + JSON.stringify(result));
    return true;
};

var getCommentList = async (option) => {
    var result = await comment.findAll({
        offset: option.offest,
        limit: option.size,
        order: ['cid']
    }).catch((err) => {
        console.log('failed: ' + err);
    });
    console.log('found: ' + JSON.stringify(result));
    return result;
}


var fn_addmsg = async (ctx, next) => {
    var
        uid = ctx.request.body.uid || '',
        fcid = ctx.request.body.fcid || '',
        type = ctx.request.body.type || '',
        content = ctx.request.body.content || '';
    console.log(`add msg uid: ${uid}, fcid: ${fcid},type: ${type},content: ${content}`);
    let result = await insertNewComment({
        uid: uid,
        fcid: fcid,
        type: type,
        content: content
    });
    if (result == true) {
        ctx.response.body = {error: 0,info:"success"};
    } else {
        ctx.response.body = {error: 1,info:"some problem"};
    }
};

var fn_getlist = async (ctx, next) => {
    var
        offset = ctx.request.body.offset || '',
        size = ctx.request.body.size || '';
    console.log(`add msg uid: ${uid}, fcid: ${fcid},type: ${type},content: ${content}`);
    let result = await getCommentList({
        offest: offset,
        size: size
    });
    if (result == true) {
        ctx.response.body = {error: 0,info:"success",list:result};
    } else {
        ctx.response.body = {error: 1,info:"some problem"};
    }
}

module.exports = {
    'POST /addmsg': fn_addmsg,
    'POST /getlist': fn_getlist
};