const sequelize = require("../db/sequelize")
const HttpException = require('../exceptions/http.exception')
const Article = require('../models/Article')
const Tag = require('../models/Tag');
const User = require('../models/User')

// 创建文章
module.exports.createArticle = async (req, res, next) => {
    try {
        //01 获取数据
        const {title, description, body, tags} = req.body.article
        //02验证数据
        if (!title){
            throw new HttpException(401, '文章标题不存在', 'title not found')
        }
        // 03 获取作者email: 当前登录用户,创建文章=>登录用户就是作者
        //此处是中间件通过解签得到的user用户信息
        const {email,username} = req.user
        // 04 验证作者信息
        const author = await User.findOne({email});
        if (!author) {
            throw new HttpException(401, '作者账号不存在', 'auhtor not found')
        }
        //05 生成别名slug
        // const slug =




    } catch (err) {
        next(err)
    }
}

//获取文章: 单个文章
module.exports.getArticle = async (req, res, next) => {
    try {

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