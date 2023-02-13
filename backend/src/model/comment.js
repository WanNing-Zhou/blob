// 评论
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/blog_b0372`);

module.exports = mongoose.model("comment", {
    body: {  //评论内容
        type: String,
    },
    userEmail: {
        type: String,
        required: true,
    },
    articleSlug: {  //标签名称
        type: String,
        required: true
    }
})