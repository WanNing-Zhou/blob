const {Sequelize} = require ('sequelize')

//实例化 Sequelize构造函数接收很多参数
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: false, //禁用日志记录
    port: process.env.DB_PORT
});

module.exports = sequelize;