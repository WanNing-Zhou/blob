import React from 'react';
import {memo} from "react";
import {Link} from 'react-router-dom'

const ButtonInfo = memo((props)=> {
    const {profile,isCurrentUser,follow,unfollow}=props
    const handleClick=(e)=>{
        e.preventDefault()//阻止默认事件
        if(profile.following){
            unfollow(profile.username)
        }else{
            follow(profile.username)
        }
    }
    if (isCurrentUser) {
        return (
            <Link to={"/setting"} className="btn btn-sm btn-outline-secondary action-btn">
                <i className="iconfont icon-zhuanchezhuanyongbeifen"></i>{" "}编辑设置
            </Link>
        )
    } else {
        return (
            <button className={profile.following ? 'btn-secondary' : 'btn-outline-secondary'}
                    onClick={handleClick}
            >
                <i className="iconfont icon-xihuan"></i>
                {
                    profile.following ? "取消关注" : "添加关注"
                }
            </button>
        )
    }
})


export default ButtonInfo