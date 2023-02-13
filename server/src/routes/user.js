const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
const {authMiddleware} = require('../middleware/admin/auth.middleware');

/*
router.get('/',(req,res)=>{
    console.log('get data');
    res.json({
        status:200,
        message:'success',
        data:{
            code:1,
            data:{
                name:'hello'
            },
            message:'请求成功'
        }
    })
})


router.post('/',(req,res)=>{
    console.log('控制器处理逻辑')
})
*/
//创建用户
router.post('/',UserController.createUser);
//用户登录
router.post('/login', UserController.login);

//获取用户信息:token
router.get('/',authMiddleware,UserController.getUser); //获取用户时需要进行解签

//获取用户列表
router.get("/list", authMiddleware, UserController.getUserList);

//获取用户信息 : 用户信息 & 获取粉丝信息 & 判断是否关注
router.get("/profile", authMiddleware, UserController.getUserProfile);

//更新用户信息
router.put('/',authMiddleware,UserController.updateUser)




module.exports = router;