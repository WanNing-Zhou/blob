//创建用户
module.exports.createUser = async (req,res)=>{
    res.json({
        status:200,
        message: 'success',
        data: {
            code: 1,
            message: '增加数据成功',
            data:{}
        }
    })
}


//获取用户
module.exports.getUser = async (req,res)=>{
    res.json({
        status:200,
        message: 'success',
        data:{
            code:1,
            message:'请求数据成功',
            data: {
                name:'张三',
                age:18
            }
        }
    })
}