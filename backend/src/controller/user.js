//user控制器
/**
 * 用户注册
 *  实现思路: 获取客户提交内容,数据验证,业务验证,验证email是否存在,验证username是否唯一,创建用户,密码加密
 *      user model存储数据库
 *      创建成功: 返回,创建token,返回数据,整体异常捕获next(error)
 *
 */
const {validateCreateUser} = require("../utils/validate/user.validate")
const HttpException = require('../exceptions/http.exception')
const User = require('../models/User')
const {md5Password} = require('../utils/md5');
const {sign} = require('../utils/jwt');


//创建用户
module.exports.createUser = async (req, res, next) => {

    // console.log(req.body)

    try {
        //获取提交内容
        let {username, password, email} = req.body
        // console.log(username, password, email)
        //
        // console.log(validateCreateUser(username, password, email))
        //数据验证
        let {error, validate} = validateCreateUser(username, password, email)
        // console.log('validate', validate)
        // console.log('error', error)
        if (!validate) {
            //验证失败抛出错误
            throw  new HttpException('422', '用户提交数据验证失败', error)
        }

        //业务验证
        //1)验证email是否存在
        let userData = await User.findOne({where: {email}})
        if (userData) {
            throw new HttpException(401, '用户注册邮箱已存在', 'email is exist')
        }

        //2)验证username是否存在
        userData = await User.findOne({where: {username}});
        if (userData) {
            throw new HttpException(401, '用户已存在', 'username is exist')
        }
        console.log('hello')
        //创建用户
        //1)密码加密
        const md5PWD = await md5Password(password)
        //2)User model 存储数据库
        const user = await User.create({
            username,
            password: md5PWD,
            email
        })
        if (!user) {
            throw new HttpException(401, "注册失败, 请重试", "create error");
        }
        // console.log(user);
        // 用户创建成功
        // 1. 让用户登录
        // 2. 用户直接登录完毕状态
        const data = {}
        data.username = user.dataValues.username;
        data.email = user.dataValues.email;
        // console.log(data);
        data.token = await sign(data.username, data.email); //获取token
        data.bio = user.dataValues.bio || '这个人很懒, 啥也没写';
        data.avatar = user.dataValues.avatar || '';
        console.log(data);
        res.json({
            status: 1,
            message: "创建用户成功",
            data,
        });
    } catch (error) {
        //捕获try中抛出的错误
        next(error)
    }
}


//获取用户
module.exports.getUser = async (req, res) => {
    res.json({
        status: 200,
        message: 'success',
        data: {
            code: 1,
            message: '请求数据成功',
            data: {
                name: '张三',
                age: 18
            }
        }
    })
}


