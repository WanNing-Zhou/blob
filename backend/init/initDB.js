const dbConnection = require('../db/connection');
const User = require('../models/User')

const  initDB = ()=>{
    return new Promise(async (resolve,reject)=>{
        try {
            //数据库连接
            await dbConnection();
            // User.sync();//如果表不存在则创建表,如果已经存在就什么都不执行
            // const User = new User({email: '1879154660@qq.com',username:'kakxi',password:'123456'})
            // console.log(User)
            //初始化model关系

            //初始化数据

            resolve();
        }catch (error){
            console.log(error);
            reject(error)
        }
    })
}

module.exports = initDB