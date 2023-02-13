const {DataTypes} = require('sequelize');
const sequelize = require('../db/sequelize')

//标签模型

const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
},{
    timestamps:false //时间戳
})


module.exports = Tag