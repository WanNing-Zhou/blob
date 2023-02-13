const md5 = require('md5');

const SALT = 'salt' //盐

//md5对密码进行加密处理
const md5Password = (password)=>{
    return new Promise((resolve, reject) => {
        const md5PWD = md5(password+SALT)
        resolve(md5PWD)
    })
}

//新旧密码比较
const matchPassword = (oldMd5Pwd,password)=>{
    return new Promise((resolve, reject) => {
        const newMd5Pwd = md5(password+SALT)

        let match = oldMd5Pwd === newMd5Pwd

        resolve(match)
    })
}

/*async function  test(){
    const  pass = "abc"
    const md5Pwd = await md5Password(pass)
    console.log("md5Pwd",md5Pwd);
    const match = await matchPassword(md5Pwd,"abc")
    console.log('password matches:', match)
}

test()*/


module.exports = {md5Password,matchPassword}


