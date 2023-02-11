require('dotenv').config({path:'.env'});

const express = require ('express')
const initDB = require('./init/initDB')
const initServer = require('./init/initServer')
const initRoute = require('./init/initRoute')

const app = express()

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
})