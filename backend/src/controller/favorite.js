const HttpException = require('../models/User')
const {User,Article,Tag} = require('../models')
const {handleArticle} = require('../utils/common')

/**
 * 添加喜欢的文章: 当前登录用户
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

const addFavorite =async (req,res,next)=>{
    try {
        const {slug} = req.params;
        const article = await Article.findByPk(slug,{include:[Tag,User]});

        if (!article){
            throw new HttpException(404, "文章不存在", "article not found");
        }

        //文章添加喜欢这篇文章的用户: 当前登录用户
        await article.addUsers(req.user.email);

        //喜欢的人数
        const count = await article.countUsers();

        const data =handleArticle(article,article.user,count,true);

        res.status(200).json({
            status:1,
            message:'成功',
            data
        })
    }catch (err){
        next(err)
    }
}

/**
 * 取消喜欢文章: 当前登录用户
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

const  removeFavorite = async (req,res,next)=>{
    try{
        const {slug} = req.params;

        const article = await Article.findByPk(slug,{include:[Tag,User]});
        if(!article){
            throw new HttpException(404,"文章不存在","article not found");
        }

        //取消当前登录用户对这篇文章的喜欢
        await article.removeUser(req.user.email);

        //喜欢的人数
        const count = await article.countUser();

        //生成文章返回数据
        const data = handleArticle(article,article.user,count,false);
        res.status(200).json({
            status: 1,
            message: '取消成功',
            data
        });

    }catch (err){
        next(err)
    }
}

module.exports = {
    addFavorite,
    removeFavorite
}


