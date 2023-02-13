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
    article.dataValues.favorite = favorite; //当前用户是否喜欢这篇文章


    return article.dataValues;//将处理结果返回
}

/**
 * 获取文章关注信息
 * @param article 文章
 * @param currentUser 当前用户
 * @returns {Promise<{favorite: boolean, favoriteCount: *}>} 返回一个对象对象{当前用户是否喜欢,喜欢这篇文章人的数量}
 */

const getFavorite = async (article, currentUser) => {
    //有多少人喜欢这篇文章
    const favoriteCount = await article.countUsers();

    //当前登录用户是否喜欢这篇文章
    let favorite = false;
    if (currentUser) {
        const favoriteUsers = await article.getUsers();
        for (let user of favoriteUsers) {
            if (user.email === currentUser.email) {
                favorite = true;
                break;
            }
        }
    }

    return {
        favoriteCount,
        favorite
    }
}

/**
 * 处理文章信息
 * @param article
 * @param favoriteCount
 * @param favorite
 * @returns {TModelAttributes}
 */
function handleArticle2(article, favoriteCount, favorite) {
    const tags = [];
    for (const tag of article.Tags) {
        tags.push(tag.name);
    }
    article.dataValues.tags = tags;

    const author = article.user;
    //删除文章的关键西悉尼
    delete author.dataValues.password;
    delete article.dataValues.userEmail;
    delete article.dataValues.user;

    //补充文章信息
    article.dataValues.author = author;
    article.dataValues.favoriteCount = favoriteCount;
    article.dataValues.favorite = favorite;
    return article.dataValues; //将文章信息返回
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

        const {favoriteCount, favorite} = await getFavorite(article, req.user);
        const data = handleArticle(article, article.user, favoriteCount, favorite);
        return res.status(200).json({
            status: 1,
            message: "获取文章成功",
            // data: article,
            data,
        });
    } catch (err) {
        next(err)
    }
}

//删除文章
module.exports.deleteArticle = async (req, res, next) => {
    const {
        slug
    } = req.params;
    const article = await Article.findByPk(slug);

    if (!article) {
        throw new HttpException(404, "文章不存在", "article not found");
    }

    //验证当前登录用户是否是当前文章的作者
    const loginEmail = req.user.email;
    const authorEmail = article.userEmail;
    if (loginEmail !== authorEmail) {
        throw new HttpException(404, "无权限", "no permission");
    }

    //删除文章
    const data = await article.destroy();

    // 返回响应数据
    // 文章, 图片... 在删除时可以相应的做一个回收站
    //
    return res.status().json({
        status: 1,
        message: "删除成功",
        data,
    });
}

//更新文章

module.exports.updateArticle = async (req, res, next) => {
    try {
        const {
            slug
        } = req.params;

        const {title, description, body, tags} = req.body;

        let article = await Article.findByPk(slug);

        if (!article) {
            throw new HttpException(404, "文章不存在", "article not found");
        }

        //验证当前登录用户是否是当前更新文章的作者
        const loginEmail = req.user.email;
        const authorEmail = article.userEmail;

        if (loginEmail !== authorEmail) {
            throw new HttpException(404, "无权限", "no permission");
        }

        //更新分为两部分
        //1.文章内容更新
        const updateArticle = await article.update({
            title, description, body
        });
        //文章对应标签更新
        if (tags && tags.length > 0) {
            for (const t of tags) {
                let existTag = await Tag.findByPk(t);

                //信标签
                if (!existTag) {
                    let newTag = await Tag.create({name: t})
                    await article.addTag(newTag);//添加新标签
                } else {
                    await article.addTag(existTag)
                }

            }
        }

        article = await Article.findByPk(slug, {include: Tag});

        let author = await User.findByPk(loginEmail);
        article = handleArticle(article, author);

        return res.status(200).json({
            status: 1,
            message: "更新文章成功",
            data: article,
        });

    } catch (err) {
        next(err)
    }
}


/**
 * 获取所有文章
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */

module.exports.getArticles = async (req,res,next)=>{
    try {
        //文章查询的字符串
        const {tag,author,favorite,limit='10',offset='0'} = req.query;

        let result={};
        //如果标签存在,作者不存在
        if (tag && !author){
            result =await  Article.findAndCountAll({
                distinct:true,
                include:[{
                    model:Tag,
                    attributes:['name'],
                    where:{
                        name:tag
                    }
                },{
                    model:User,
                    attributes:['email','username','bio','avatar']
                }],
                limit:parseInt(limit),
                offset:parseInt(offset)
            });
        }
        //如果作者存在,标签不存在
        if(!tag && author){
           result = await Article.findAndCountAll({
                distinct: true,
                include: [{
                    model: Tag,
                    attributes: ["name"]
                },
                    {
                        model: User,
                        attributes: ["email", "username", "bio", "avatar"],
                        where: {
                            username: author
                        },
                    },
                ],
                limit: parseInt(limit),
                offset: parseInt(offset),
            });
        }

        //如果标签和作者都存在
        if (tag && author) {
            result = await Article.findAndCountAll({
                distinct: true,
                include: [{
                    model: Tag,
                    attributes: ["name"],
                    where: {
                        name: tag
                    }
                },
                    {
                        model: User,
                        attributes: ["email", "username", "bio", "avatar"],
                        where: {
                            username: author
                        },
                    },
                ],
                limit: parseInt(limit),
                offset: parseInt(offset),
            });
        }

        //作者喜欢的文章
        if (favorite){
            const author = await User.findOne({
                where: {
                    username: favorite
                }
            });

            const authorEmail = author.email;
            //sql语句,查询到作者喜欢的文章
            const query = `SELECT ArticleSlug FROM favourites WHERE userEmail='${authorEmail}'`
            const queryResult = await sequelize.query(query);
            // console.log(queryResult, 'queryResult');
            //查询结果为空进行处理
            if (queryResult[0].length === 0) {
                return res.status(200).json({
                    status: 1,
                    message: "文章列表为空",
                    data: [],
                });
            }

            //如果不为空的情况则执行以下代码
            const articleSlugs = [];
            for (let item of queryResult[0]){
                articleSlugs.push(item.ArticleSlug);
            }
            result = await Article.findAndCountAll({
                distinct:true,
                where:{
                    slug:articleSlugs
                },
                include:[Tag,User]
            });
            // console.log(result)
        }

        //如果标签,作者,喜欢都为空,则查询所有
        if (!tag && !author && !favorite) {
            result = await Article.findAndCountAll({
                distinct: true,
                include: [{
                    model: Tag,
                    attributes: ["name"]
                },
                    {
                        model: User,
                        attributes: ["email", "username", "bio", "avatar"]
                    },
                ],
                limit: parseInt(limit),
                offset: parseInt(offset),
            });
        }

        const {count,rows} = result;
        //count 总记录 /limit 一页记录数 = 总页数
        //rows 具体的文章内容
        const articles = [];
        console.log(req.user);
        for (let t of rows){
            const {
                favoriteCount,
                favorite
            } =await getFavorite(t,req.user)
            articles.push(handleArticle2(t,favoriteCount,favorite))
        }
        // console.log(articles)
        //响应处理结果
        return res.status(200).json({
            status: 1,
            message: "获取文章成功",
            data: {
                articles,
                count
            },
        });

    }catch (err){
        next(err)
    }
}

//获取关注作者的文章
module.exports.getFollowArticlesController =async (req,res,next)=>{
    try {
        const fansEmail = req.user.email;
        //获取到关注作者的email账号
        const query = `SELECT userEmail FROM followers WHERE followerEmail = '${fansEmail}'`;
        const followerAuthors = await sequelize.query(query); //查询

        //如果没有关注过别人
        if (followerAuthors[0].length === 0) {
            return res.status(200).json({
                status: 1,
                message: "获取关注文章成功",
                data: {
                    count: 0,
                    articles: []
                },
            });
        }

        //如果有关注的作者 将执行以下代码
        const followAuthorEmails = [];
        for(let item of followerAuthors[0]){
            followAuthorEmails.push(item.userEmail);
        }
        let {count,rows} = await Article.findAndCountAll({
            distinct:true,
            where:{
                userEmail: followAuthorEmails
            },
            include: [Tag,User]
        });

        const articles = []; //文章容器
        //将内容进行遍历
        for (let t of rows){
            const {favoriteCount, favorite} = await getFavorite(t, req.user);
            //对文章进行处理
            let handleArticle = handleArticle2(t, favoriteCount, favorite);
            articles.push(handleArticle); //将文章添加到容器中
            return res.status(200).json({ //响应结果
                status: 1,
                message: '获取关注文章成功',
                data: {
                    articles,
                    count
                }
            });

        }

    }catch (err){
        next(err)
    }
}



