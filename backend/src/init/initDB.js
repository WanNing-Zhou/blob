const dbConnection = require('../db/connection');
const sequelize = require('../db/sequelize')

const User = require('../models/User')
const Article = require('../models/Article')
const Tag = require('../models/Tag')
const Comment = require('../models/Comments')


/**
 *  模型关系概要
 * A.hasOne(B) // A有一个B
 * A.belongsTo(B) //A属于B
 * A.hasMany(B) //A有多个B
 * A.belongsToMany(B,{through:'C'});//A属于多个B,通过联结表C
 *
 */

//同步模型关系
const initRelation = () => {
    //用户-文章: 一对多
    User.hasMany(Article, {
        onDelete: 'CASCADE',//CASCADE 小瀑布, 当删除用户的时候,关联的删除文章
    });
    Article.belongsTo(User); //文章属于用户

    //文章-标签: 多对多
    Article.belongsToMany(Tag, {
        through: 'TagList',
        uniqueKey: false,
        timestamps: false,
    });
    Tag.belongsToMany(Article, {
        through: 'TagList',
        uniqueKey: false,
        timestamps: false
    });

    //文章-评论: 一对多
    Article.hasMany(Comment, {onDelete: "CASCADE"});
    Comment.belongsTo(Article);

    //用户-评论:一对多
    //一个用户可以有多个评论
    //一个评论属于某个用户
    User.hasMany(Comment, {onDelete: "CASCADE"});
    Comment.belongsTo(User);

    //用户-用户 关注: 多对多
    //一个用户可以关注多个用户
    //一个用户可以被多个用户关注
    User.belongsToMany(User, {
        through: "Followers",
        as: "followers",
        timestamps: false,
    });

    //用户 - 文章(喜欢): 多对多
    //一个用户可以喜欢多篇文章
    //一篇文章可以被多个用户喜欢
    User.belongsToMany(Article, {
        through: 'Favorites',
        timestamps: false
    })
    Article.belongsToMany(User, {
        through: 'Favorites',
        timestamps: false
    })

}


const initDB = () => {
    return new Promise(async (resolve, reject) => {
        try {
            //数据库连接
            await dbConnection();

            //初始化model关系
            initRelation()

            //自动同步所有模型
            await sequelize.sync({alter: true})
            // sync()-如果表不村子啊,则创建该表(如果已经存在,则不执行任何操作)
            // sync({force:true})-将创建表,如如果表已经存在,则将其首先删除
            //sync({alter:true}) -这将检查数据库中表的当前状态(它具有哪些列,他们呢的数据类型等)然后再表中进行必要的更改以使其与模型匹配

            //初始化数据

            resolve();
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

module.exports = initDB