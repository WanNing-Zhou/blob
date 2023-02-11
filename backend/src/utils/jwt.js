require('dotenv').config({ path: '../../.env' })


const jwt = require('jsonwebtoken')
const key = process.env.JWT_SECRET


// 加签 ： 根据密钥生成token ;
// token ： 头部(签名算法).负载（携带的数据）.签名（对头和负载进行加密）
const sign = (email, username,) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ email, username, }, key, (error, token) => {
            if (error) {
                return reject(error)
            }
            return resolve(token)
        })
    })
}

// 解签 ：跟据密钥验证token
const decode = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (error, decoded) => {
            if (error) {
                return reject(error)
            }
            return resolve(decoded)
        })
    })
}

//TESTING
/*const test = async () => {
    const data = {
        username: 'admin',
        email: 'admin.qq.com'
    }
    const {username, email} = data;
    const token = await sign(username, email)
    console.log("token is", token);
    const decoded = await decode(token) //iad:发布时间
    console.log('Decoded', decoded)
}

test();*/

module.exports = {
    sign,
    decode
}


