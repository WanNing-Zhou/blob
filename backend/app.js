require('dotenv').config({path:'.env'});

const express = require ('express')
const initDB = require('./init/initDB')
const initServer = require('./init/initServer')
const initRoute = require('./init/initRoute')
const cors = require('cors')
const morgan =require('morgan')

const app = express() //解析中间件

app.use(cors({credentials: true,origin: true})) //解决跨域中间件
app.use(express.json())
app.use(morgan('tiny')); //日志中间件

//路由初始化
initRoute(app)


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
