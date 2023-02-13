// 用户关注信息表
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/blog_b0372`);

module.exports = mongoose.model("followers", {
    userEmail: {  //关注者
        type: String,
        required: true
    },
    followerEmail: {//被关注者
        type: String,
        required: true
    }
})