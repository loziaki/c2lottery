const Sequelize = require('sequelize');

module.exports = (dbObj) => {
    return dbObj.define('user',{
        uid: { 
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type:Sequelize.STRING(45)
        },
        account: {
            type:Sequelize.STRING(45),
            allowNull: false,
            unique: true
        },
        passwd: {
            type:Sequelize.STRING(45),
            allowNull: false,
        }
    },
    {
        // 自定义表名
        'freezeTableName': true,
        'tableName': 'users',

        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': false,
        'paranoid': false
    });
}