const validator = require('validator')

//验证: 创建用户
const validateCreateUser = (username,password,email)=>{
    let error = {}

    if (validator.isEmpty(username)){
        error.username = '用户名不能为空'
    }
    if(validator.isEmpty(password)){
        error.password = '密码不能为空'
    }
    if(validator.isEmpty(email)){
        error.email = '邮箱不能为空'
    }

    if(validator.isEmpty(email)&&!validator.isEmail(email)){
        error.email = '邮箱格式不对'
    }

    let validate = Object.keys(error).length < 1 //true验证通过 false验证失败

    return {error,validate}

}

//用户登录验证
const validateLoginUser = (email, password) => {
    let error = {}
    if (!email) {
        error.email = "邮箱不能为空"
    }

    if (validator.isEmpty(password)) {
        error.password = "密码不能为空"
    }

    if (email && !validator.isEmail(email)) {
        error.email = "邮箱格式不正确"
    }

    let validate = Object.keys(error).length < 1 // true 验证通过，false 没通过

    return {
        error,
        validate
    }

}

module.exports = {
    validateCreateUser,
    validateLoginUser
}
