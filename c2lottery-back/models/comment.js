const Sequelize = require('sequelize');

module.exports = (dbObj) => {
    return dbObj.define('comment',{
        cid: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uid: { 
            type:Sequelize.INTEGER,
            allowNull: false,
        },
        fcid: {
            type:Sequelize.INTEGER,
            allowNull: true,
        },
        type: {
            type:Sequelize.INTEGER,
            allowNull: false,
        },
        content: {
            type:Sequelize.STRING(100),
            defaultValue: "oh,that's awesome!"
        },
        like: {
            type:Sequelize.INTEGER,
            defaultValue: 0
        }
    },
    {
        // 自定义表名
        'freezeTableName': true,
        'tableName': 'comments',

        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': false,
        'paranoid': false
    });
}