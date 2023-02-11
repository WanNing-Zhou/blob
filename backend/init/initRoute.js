const userRoute = require('../routes/user')

const initRoute = (app)=>{
    app.get('/',(req,res)=>{
        res.json({status:'API is running'});
    })
    app.use('/api/v1',userRoute())
}

module.exports = initRoute;