/*const express = require('express')
const router = express.Router()
const { createArticle, getArticle, updateArticle, deleteArticle, getFollowArticles,getArticles } = require('../controller/article')
const {authMiddleware}  = require('../middleware/admin/auth.middleware')

router.post('/', authMiddleware, createArticle)
router.get('/', getArticles) // 不登录 也可以获取全局文章
router.get('/follow', authMiddleware, getFollowArticles)
router.get('/:slug', authMiddleware, getArticle)
router.put('/:slug', authMiddleware, updateArticle)
router.delete('/:slug', authMiddleware, deleteArticle)

module.exports = router*/

const ArticleController = require("../controller/article");
const { authMiddleware } = require("../middleware/admin/auth.middleware");
module.exports = app => {
    // const router = app.Router();
    app.post("/", authMiddleware, ArticleController.createArticle);
    app.put("/:slug", authMiddleware, ArticleController.updateArticle);
    app.delete('/:slug', authMiddleware, ArticleController.deleteArticle);
    // 不需要登录验证
    // 游客也可以浏览文章 文章之显示一半, 登录之后才全部显示
    app.get('/follow', authMiddleware, ArticleController.getFollowArticlesController)
    // 单个文章
    app.get("/:slug", authMiddleware, ArticleController.getArticle);
    // 文章列表
    app.get("/", authMiddleware, ArticleController.getArticles);
    return app;
};
