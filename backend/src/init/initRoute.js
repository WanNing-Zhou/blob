const userRouter = require("../routes/user");
const followRouter = require("../routes/follow");
const favoriteRouter = require("../routes/favorite");
const tagRouter = require("../routes/tags");
const commentRouter = require("../routes/comments");
const articleRouter = require("../routes/articles");
const express = require('express')
const router = express.Router()

const initRoute = (app)=> {
    app.get('/', (req, res) => {
        res.json({status: 'API is running'});
    })

    //使用路由
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/follow", followRouter);
    app.use("/api/v1/favorites", favoriteRouter);
    app.use("/api/v1/tags", tagRouter);
    app.use("/api/v1/comments", commentRouter);
    app.use("/api/v1/articles", articleRouter(router));
};
module.exports = initRoute;