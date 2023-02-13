const HttpException = require('../exceptions/http.exception')
const User = require('../models/User')
//关注功能
const follow = async (req, res, next) => {
    //1.自己主键的值
    //2.关注的作者的主键的值
    try {
        const {username} = req.params;
        // console.log(username,"follow")
        //获取关注的作者
        const author = await User.findOne({
            where: {
                username
            }
        })
        // console.log(author)

        if (!author) { //如果作者不存在
            throw new HttpException(404, "被关注的用户不存在", "user not found");
        }

        const {email} = req.user;
        const fans = await User.findByPk(email)
        if (!(await author.addFollower(fans))) {
            throw new HttpException(404, "关注失败", "user not found");
        }
        //被关注者信息
        const profile = {
            username: author.username,
            bio: author.bio,
            avatar: author.avatar,
            follow: true,
            favourite: true
        };

        res.status(200).json({
            status: 1,
            message: '关注成功',
            data: profile,
        })
    } catch (err) {
        next(err)
    }
}

//取消关注
const cancelFollow = async (req, res, next) => {
    try {
        const {username} = req.params;
        //获取取消关注对象
        const userToFollow = await User.findOne({
            where: {
                username
            }
        });

        //如果取消关注对象不存在
        if (!userToFollow) {
            throw new HttpException(404, "取消关注失败, 用户不存在", "user not found");
        }

        //获取自己的信息
        const user = await User.findByPk(req.user.email);
        // console.log(userToFollow)
        //取消关注并判断操作是成功
        if (!userToFollow.removeFollower(user)){
            throw new HttpException(404, "取消关注失败, 用户不存在", "user not found");
        }

        const profile = {
            username,
            bio: userToFollow.bio,
            avatar: userToFollow.avatar,
            following: false,
            favourite: false
        };
        res.status(200).json({
            status: 1,
            message: '取消关注成功',
            data: profile
        });

    } catch (err) {
        next(err)
    }
}
//获取当前用户粉丝,获取当前用id下followId
//获取用户信息: 用户信息 & 获取粉丝信息 & 判断是否关注
const getProfile = async (req,res,next)=>{
    try{
        //获取参数: 作者用户名
        const username = req.params.username;
        //根据用户名获取用户信息
        //查询用户所有粉丝
        const userToFollow = await  User.findOne({
            where:{
                username,
            },
            include:['followers']
        });

        if (!userToFollow){
            throw new HttpException(404,"被关注的用户不存在","user not found")
        }
        // console.log(userToFollow);
        //是否关注
        //验证是否关注
        // 当前登录粉丝 email: 通过token
        //   是否关注:判断 当前登录的用户email是否在作者的所有粉丝的emails里面
        const {email} = req.user
        let followingUser = false;
        let followers = []
        if(req.user){ //如果用户身份认证成功
            //遍历
            for (let  t of userToFollow.followers){
                if (t.dataValues.email === email){
                    followingUser = true;
                }

                delete userToFollow.dataValues.password;
                delete userToFollow.dataValues.followers;
                followers.push(userToFollow.dataValues)

            }
        }


        //返回被关注者的信息
        //  基本信息
        // 关注状态
        //粉丝西悉尼
        const profile = {
            username,
            bio:userToFollow.dataValues.bio,
            avatar:userToFollow.dataValues.avatar,
            following: followingUser, //是否关注过这个人
            followers: userToFollow.followers
        }
        return res.status(200).json({
            status: 1,
            message: "获取用户信息成功",
            data: profile,
        });

    }catch (err){
        next(err)
    }

}

module.exports = {
    follow,
    cancelFollow,
    getProfile
}