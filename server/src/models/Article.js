const {DataTypes} = require('sequelize')
const sequelize = require('../db/sequelize')

//文章model
const Article = sequelize.define('Article',{
    slug: {//别名
        type:DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    title:{ //标题
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{//描述
        type: DataTypes.TEXT
    },
    body: {//内容
        type: DataTypes.TEXT,
        allowNull:false
    }
})

module.exports = Article