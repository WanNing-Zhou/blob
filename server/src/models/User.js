//用户模型
//数据库中包含的字段以及字段的信息
const {DataTypes} = require('sequelize');
const sequelize = require('../db/sequelize')

const User = sequelize.define('User', {
    email: { //邮箱
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    username: { //账号
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: { //密码
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar:{ //头像
        type: DataTypes.TEXT,
        allowNull:true
    },
    bio: { //简介
        type:DataTypes.TEXT,
        allowNull: true
    }
})

module.exports = User
