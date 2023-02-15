import * as constant from '../../../constant'

const initState = {
    email: '',
    username: '',
    password: '',
    errors: null
}

/**
 * 处理同步信息
 * @param state
 * @param action
 * @returns {{password: string, email: string, errors: null, username: string}}
 */
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_REGIST_FIELD:
            const key = action.key;
            const value = action.value;
            // console.log(key,value,'reducer')
            return {...state, [key]: value};
        case constant.USER_REGIST_RESULT:
            return {...state,errors:action.result.message}
        case constant.USER_REGIST_UNLOAD:
            return {...initState}
        default:
            return state;
    }
}



export default userReducer