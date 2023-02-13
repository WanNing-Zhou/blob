const userRoute = require('../routes/user')
const followerRouter = require('../routes/follow');
const articlesRouter = require('../routes/articles');

const initRoute = (app)=>{
    app.get('/',(req,res)=>{
        res.json({status:'API is running'});
    })

    //使用路由
    app.use('/api/v1/users',userRoute);
    app.use('/api/v1/follow',followerRouter);
    app.use('/api/v1/articles',articlesRouter)
}

module.exports = initRoute;