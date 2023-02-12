const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')

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

router.get('/',UserController.getUser);


module.exports = router;