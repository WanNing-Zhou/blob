const {DataTypes} = require('sequelize');
const sequelize = require('../db/sequelize')

//评论模型

const Comments = sequelize.define('Comment',{
    body:{ //评论内容
        type: DataTypes.TEXT,

    }
})

module.exports = Comments;