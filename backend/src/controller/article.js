const sequelize = require("../db/sequelize")
const HttpException = require('../exceptions/http.exception')
const {getSlug} = require('../utils/slug')
const Article = require('../models/Article')
const Tag = require('../models/Tag');
const User = require('../models/User')

/**
 *
 * @param article 文章信息 包含tags
 * @param author 作者的email
 * @param favoriteCount 喜欢这篇文章的人数
 * @param favorite 我是否喜欢这篇文章
 */

function handleArticle(article, author, favoriteCount, favorite) {
    //处理tag
    const tags = [];
    for (const tag of article.Tags) {
        tags.push(tag.name)//将标签添加到tags数组中
    }
    // console.log(tags,"tags")
    article.dataValues.tags = tags
    // console.log(article)
    //处理作者
    delete author.dataValues.password;//删除作者的密码
    delete article.dataValues.userEmail;//删除文章中的用户email
    article.dataValues.author = author.dataValues;

    //处理喜欢favorite
    article.dataValues.favoriteCount = favoriteCount; //喜欢的数量
    if (article.dataValues.favorite) {
        article.dataValues.favorite = favorite; //你是否喜欢
    }

    return article.dataValues;//将处理结果返回
}


// 创建文章
module.exports.createArticle = async (req, res, next) => {
    try {
        //1.验证token
        //2.获取body中的值
        //可能包括标签(系统自带,已经存储过,自定义标签)

        //01 获取数据
        const {title, description, body, tags} = req.body
        //02验证数据
        if (!title) {
            throw new HttpException(401, '文章标题不存在', 'title not found')
        }
        // 03 获取作者email: 当前登录用户,创建文章=>登录用户就是作者
        //此处是中间件通过解签得到的user用户信息
        const {email, username} = req.user
        // 04 验证作者信息
        const author = await User.findByPk(email)
        if (!author) {
            throw new HttpException(401, '作者账号不存在', 'auhtor not found')
        }
        //05 生成别名slug 存储文章
        const slug = getSlug()
        const article = await Article.create({
            slug,
            title,
            description,
            body,// #s ##s ###SSS 1. 2.
            userEmail: email
        })
        // console.log(article)
        //处理标签
        //tags 前端串过来数组
        //存储标签,只存信息/文章标签关联存储
        // console.log(tags)
        if (tags.length) {
            //遍历每个标签
            for (let t of tags) {
                //查询自己存储的标签
                let tag = await Tag.findByPk(t);
                if (!tag) { //如果标签不存在,就新建一个标签类型
                    tag = await Tag.create({name: t});
                }
                //在验证标签类型是否存在之后为文章添加标签
                await article.addTag(tag);
            }
            const articleAndTags = await Article.findByPk(slug, {
                include: Tag
            })
            // console.log()
            const data = handleArticle(articleAndTags, author, 0, false);
            /**
             * return
             * 文章 内容
             * 1. 标题
             * 2.买哦书
             * 3.内容
             * 4.时间
             * 5.作者username
             * 6.标签
             * 7.关注信息
             * 8.我是否关注过这篇文章
             */

            // console.log(data)
            res.status(200).json({
                status: 1,
                message: "文章创建成功",
                // data: article,
                data,
            });
        }

    } catch (err) {
        next(err)
    }
}

//获取文章: 单个文章 获取文章信息可以不用登录
module.exports.getArticle = async (req, res, next) => {
    try {
        const {slug} = req.params;
        const article = await Article.findByPk(slug, {include: [Tag, User]});

    } catch (err) {
        next(err)
    }
}

//获取文章:关注作者的文章
module.exports.getArticle = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}

//获取文章