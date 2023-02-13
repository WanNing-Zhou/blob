// 文章分类--标签
// let mongoose=require("../db/connection")
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/blog_b0372`);

module.exports=mongoose.model("tag",{
    name:{  //标签名称
        type:String,  
        required:true,
        unique:true
        // 应为唯一值
    }
})