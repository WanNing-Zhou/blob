const bcrypt = require('bcryptjs')
//bcrypt 无法安装,需要python依赖
//bcryptjs是对bcrypt的优化,不需要安装其他依赖就能使用

const SALT_ROUNDS = 10; //加盐
hashPassword = (password, salt = SALT_ROUNDS) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUNDS, (err, encrypted) => {
            if (err) {
                return reject(err)
            }
            resolve(encrypted) //执行成功回调并将加密后的密码返回
        })
    })
}

//新旧密码比较
const matchPassword = (oldHashPwd, password) => {
    return new Promise(async (resolve, reject) => {
        const match = await bcrypt.compare(password, oldHashPwd,(err,match)=>{
            if (err){
                reject(err)
            }
           resolve(match)
        })
    })
}

/*async function test(){
    const pass = 'abc';
    const bcryptPwd = await  hashPassword(pass);
    console.log("bcryptPWD:",bcryptPwd);
    const match = await matchPassword(bcryptPwd,'abc')
    console.log('password matches',match)
}

test()*/

module.exports = {hashPassword, matchPassword}