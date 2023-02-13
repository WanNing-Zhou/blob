// 文章分类--标签
// let mongoose=require("../db/connection")
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/blog_b0372`);

module.exports = mongoose.model("taglist", {
    articleSlug: {  //标签名称
        type: String,
        required: true
    },
    tagName: {
        type: String,
        required: true
    }
})