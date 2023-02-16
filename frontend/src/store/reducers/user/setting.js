import * as constant from "../../../constant"
import {saveDate, getDate, deleteDate} from "../../../utils/localStorage"

//初始化用户
const initUser = () => {
    const currentUser = getDate("currentUser")
    // console.log('初始化用户',currentUser)
    if (currentUser) {
        return currentUser
    }
    return null
}

//初始化token,用户更新操作需要验证用户身份
const initToken = () => {
    const token = getDate("token");
    if ("token") {
        return token
    }
    return null
}



const initState = {
    ...initUser(),
    errors: null,
    currentUser: initUser(),
    token: initToken()
}

const settingReducer = (state = initState, action) => {

    switch (action.type) {
        case constant.SETTING_FIELD:
            const key = action.key
            const value = action.value
            console.log('reducer field state',key,value)
            return {...state, [key]: value};
        case constant.SETTING_UNLOAD:
            return {...initState, currentUser: initUser(), token: initToken()}
        case constant.SETTING_RESULT:
            const {status, message, data} = action.result
            if (status === 1) {
                let currentUser = data
                let token = data.token
                saveDate('currentUser', currentUser);
                saveDate('token', token);
                return {...state, errors: message}
            } else {
                return {...state, errors: message}
            }
        case constant.SETTING_LOGOUT:
            state = {}
            deleteDate("currentUser");
            deleteDate("token");
            return {...state, redirect: '/login'} //更改成功回到login页面
        default:
            return {
                ...initUser(), //初始化用户
                errors: null,
                currentUser: initUser(),
                token: initToken()
            }
    }
}

export default  settingReducer;