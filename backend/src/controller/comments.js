const Article = require("../models/Article");
const User = require("../models/User");
const Comment = require("../models/Comments");
const HttpException = require("../exceptions/http.exception");

/**
 * 创建评论
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.creatComment = async (req,res,next)=>{
    try{
        const {slug} =req.params;
        const {body} =req.body;
        const article =await Article.findByPk(slug);

        if (!article) {
            throw new HttpException(404, "文章不存在", "article not found");
        }

        let newComment = await Comment.create({body});
        const user = await User.findByPk(req.user.email);

        user.addComments(newComment);
        article.addComments(newComment);

        newComment.dataValues.author={
            username:user.username,
            bio:user.bio,
            avatar:user.avatar
        };
        return res.status(200).json({
            status: 1,
            message: "评论成功",
            data: newComment,
        });
    }catch (err){
        next(err)
    }
}

/**
 * 获取评论列表 通过slug
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.getComments =async (req,res,next)=>{
    try {
        const{slug}= req.params;
        const article =await Article.findByPk(slug);

        if (!article){
            throw new HttpException(404, "文章不存在", "article not found");
        }

        const  comments =await Comment.findAll({
            where:{
                ArticleSlug:slug
            },
            include:[{model:User,attributes:['username','bio','avatar']}],
        });

    }catch (err){
        next(err)
    }
}


/**
 * 删除评论
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
module.exports.deleteComment = async (req,res,next)=>{
    try {
        const {slug,id} =req.params;
        const article = await Article.findByPk('slug');

        if (!article) {
            throw new HttpException(404, "文章不存在", "article not found");
        }

        //判断当前登录用户是否是发表评论的人
        if (req.user.email !== comment.userEmail) {
            throw new HttpException(404, "无权限", "no permission");
        }

        await Comment.destroy({ where: { id } });

        return res.status(200).json({
            status: 1,
            message: "删除评论成功",
        });


    }catch (err){
        next('err')
    }
}



