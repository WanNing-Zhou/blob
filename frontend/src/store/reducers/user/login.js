import * as constant from "../../../constant"
import { saveDate, getDate } from "../../../utils/localStorage"

const initUser = () => {
    const currentUser = getDate("currentUser")
    // console.log("reducer",currentUser);
    if (currentUser) {
        return currentUser
    }
    return null
}

const initState = {
    email: "",
    username: "",
    password: "",
    errors: null,
    currentUser: initUser(),
    token: null,
    avatar: null
}
const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_LOGIN_FIELD:
            const key = action.key
            const value = action.value
            // console.log(key,value,"reducer----");
            return { ...state, [key]: value };
        case constant.USER_LOGIN_UNLOAD:
            return { ...initState, currentUser: initUser() }
        case constant.USER_LOGIN_RESULT:
            const { status, message, data } = action.result
            if (status === 1) {
                let currentUser = data
                let token = data.token
                saveDate("currentUser", currentUser) //存储当前用户
                saveDate("token", token) //存储token
                return { ...state, ...data, redirect: "/" } //redirect是要跳转到路由
            } else {
                return { ...state, errors: message }
            }
        case constant.SETTING_LOGOUT:
            state.currentUser = null
            return { ...state }
        case constant.SETTING_RESULT:
            const avatar = getDate("currentUser").avatar
            console.log(avatar,"11");
            return { ...state,avatar: avatar }
        default:
            return state;
    }
}

export default loginReducer

/*
https://img1.baidu.com/it/u=3093467902,1842433480&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=377

https://img0.baidu.com/it/u=1597795879,1913003854&fm=253&fmt=auto&app=120&f=JPEG?w=1366&h=768
*/