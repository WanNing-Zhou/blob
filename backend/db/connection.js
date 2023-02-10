const sequelize = require('./sequelize')

//数据库连接
const dbConnection = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await sequelize.authenticate();
            // console.log(`mysql connect success on ${process.env.DB_PORT}`)
            console.log('Connection mysql has been established successfully');
            resolve();
        } catch (error) {
            // console.error(`mysql connect to the database fail:`,error);
            console.error('Unable to connect to the database:', error);
            reject(error);
        }
    })
}

module.exports = dbConnection