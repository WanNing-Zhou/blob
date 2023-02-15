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
    currentUser: initUser(), //当前用户
    token: null,
    avatar: null
}

/**
 * 操作登录时的用户状态
 * @param state
 * @param action
 * @returns {{password: string, currentUser: any, avatar: null, email: string, errors: null, username: string, token: null}|(*&{redirect: string, password: string, currentUser: any, avatar: null, email: string, errors: null, username: string, token: null})|{password: string, currentUser: any, avatar: null, email: string, errors, username: string, token: null}}
 */

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_LOGIN_FIELD:
            const key = action.key
            const value = action.value
            // console.log(key,value,"reducer----");
            return { ...state, [key]: value };
        case constant.USER_LOGIN_UNLOAD:
            return { ...initState, currentUser: initUser() } //登录组件卸载时,清空组件中的内容,并将正在在登陆的用户保存在state中
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
        default:
            return state;
    }
}

export default loginReducer

/*
https://img1.baidu.com/it/u=3093467902,1842433480&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=377

https://img0.baidu.com/it/u=1597795879,1913003854&fm=253&fmt=auto&app=120&f=JPEG?w=1366&h=768
*/