require('dotenv').config({path:'.env'});

const express = require ('express')
const initDB = require('./init/initDB')
const initServer = require('./init/initServer')


const app = express()


//服务器启动入口
const main = async ()=>{
    await initDB();
    await initServer(app)
}

main().catch((error)=>{
    console.error('server start error',error)
});