//user控制器
/**
 * 用户注册
 *  实现思路: 获取客户提交内容,数据验证,业务验证,验证email是否存在,验证username是否唯一,创建用户,密码加密
 *      user model存储数据库
 *      创建成功: 返回,创建token,返回数据,整体异常捕获next(error)
 *
 */

const {Op} = require('sequelize')

const {validateCreateUser, validateLoginUser} = require("../utils/validate/user.validate") //判断用户信息是否正确
const HttpException = require('../exceptions/http.exception') //错误处理
const User = require('../models/User')
const {md5Password, matchPassword} = require('../utils/md5');
const {sign} = require('../utils/jwt');
const sequelize = require("../db/sequelize");

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
        data.token = await sign(data.email, data.username); //获取token
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

//用户登录
module.exports.login = async (req, res, next) => {
    try {
        //获取请求数据
        let {email, password} = req.body
        // console.log(req.body)
        //验证请求数据
        let {error, validate} = validateLoginUser(email, password);
        //验证业务逻辑
        if (!validate) {
            throw new HttpException(401, '用户提交数据校验失败', error)
        }
        //用户是否存在
        const user = await User.findByPk(email)
        // console.log('dbUser+++++++++++',user)
        if (!user) {
            throw new HttpException(401, "用户不存在", "user not found");
        }
        //密码是否匹配
        const oldMd5Pwd = user.dataValues.password;
        const match = matchPassword(oldMd5Pwd, password);
        if (!match) {
            throw new HttpException('401', "用户输入密码错误", "password not match")
        }
        //返回数据
        //  生成token
        delete user.dataValues.password; //删除用户密码
        user.dataValues.token = await sign(
            user.dataValues.email,
            user.dataValues.username
        );
        //返回数据
        return res.status(200).json({
            status: 1,
            data: user.dataValues,
            message: '用户登录成功'
        });
    } catch (err) {
        next(err)
    }
}


//获取用户
module.exports.getUser = async (req, res, next) => {


    /*    res.json({
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
        })*/
    try {
        //获取i请求数据
        const {email} = req.user;
        console.log(req.user)

        //验证请求数据
        //email 验证用户是否存在
        const user = await User.findByPk(email);
        // console.log('userIs',user.dataValues)
        if (!user) {
            throw  new HttpException(401, '用户不存在', 'user not found')
        }
        //返回数据
        //  去除password字段
        delete user.dataValues.password;
        //添加token
        user.dataValues.token = user.token
        //返回用户数据
        return res
            .status(200)
            .json({
                status: 1,
                message: '请求用户信息成功',
                data: user.dataValues
            })
    } catch (err) {
        next(err)
    }
}


//更新关注列表
module.exports.updateUser = async (req, res, next) => {
    try {
        //01获取数据:账号email
        const {email} = req.user
        //02 获取更新数据: body.user
        const userUpdate = req.body
        if (Object.keys(userUpdate).length === 0) {
            throw new HttpException(401, '需要提交更细数据', 'update user info is required')
        }

        //03:更新账号是否存在
        const user = await User.findByPk(email);
        if (!user) {
            throw new HttpException(401, "用户不存在", "user not found")
        }
        const updateData = {};
        //将更新的数据都存放在updateData中
        if (userUpdate.bio) {
            updateData.bio = userUpdate.bio;
        }
        if (userUpdate.avatar) {
            updateData.avatar = userUpdate.avatar;
        }
        if (userUpdate.password) {
            updateData.password = await md5Password(userUpdate.password);
        }
        // console.log(updateData)
        const newUser = await user.update(updateData); //更新用户数据

        //分配新的token认证信息
        newUser.dataValues.token = await sign(newUser.dataValues.email, newUser.dataValues.username)
        return res.status(200).json({
            status: 1,
            data: newUser.dataValues,
            message: '用户信息修改成功'
        })

    } catch (err) {
        next(err)
    }
}

module.exports.getUserList = async (req, res, next) => {
    try {
        const userList = await User.findAll({
            where: {
                email: {[Op.ne]: req.user.email}
            },
        });

        //获取我关注的作者的email : sql串
        const query = `select userEmail from followers where followerEmail='${req.user.email}'`;
        const favouriteUser = (await sequelize.query(query))[0];
        // console.log(favouriteUser)
        const favoriteEmails = [];
        for (let i = 0; i < favouriteUser.length; i++) {
            favoriteEmails.push(favouriteUser[i].userEmail);
        }
        for (let i = 0; i < userList.length; i++) {
            if (favoriteEmails.includes(userList[i].email)) {
                userList[i].dataValues.favorite = true;
            }
        }
        // console.log(userList)
        res.json({
            status: 1,
            message: '获取用户列表成功',
            data: userList
        })
    } catch (err) {
        next(err)
    }
}

//获取用户信息: 用户信息 & 获取分析信息 & 判断是否关注
module.exports.getUserProfile = async (req, res, next) => {
    try {
        // console.log(req.user)
        const userToFollow = await  User.findOne({
            where:{
                email:req.user.email
            },
            include:['followers']
        });
        // console.log(userToFollow)
    } catch (err) {
        next(err)
    }
}

