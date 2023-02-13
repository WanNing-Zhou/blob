require('dotenv').config({path:'.env'});

const express = require ('express')
const cors = require('cors')
const morgan =require('morgan')
// const bodyParser = require('body-parser')
const  noMatchMiddleware = require('./src/middleware/404.middleware')
const errorMiddleware = require('./src/middleware/error.middleware')
const initDB = require('./src/init/initDB')
const initServer = require('./src/init/initServer')
const initRoute = require('./src/init/initRoute')


const app = express() //解析中间件

app.use(cors({ //跨域中间件要使用再路由之前
    credentials: true,
    origin: true
})) //解决跨域中间件
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(morgan('tiny')); //日志中间件 //dev是开发模型,tiny是简写模式

//路由初始化
initRoute(app)
app.use(noMatchMiddleware);
app.use(errorMiddleware)



//服务器启动入口
const main = async ()=>{
    await initDB();
    await initServer(app)
}

main().catch((error)=>{
    console.error('server start error',error)
});

/*
app.get('/api/v1/user',(req,res)=>{
    console.log('get data');
    res.json({
        status:200,
        message:'success',
        data:{
            code:1,
            data:{
                name:'hello'
            },
            message:'请求成功'
        }
    })
})*/
