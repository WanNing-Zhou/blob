import * as constant from '../constant'
import request from '../request'
import {push} from 'connected-react-router'

//注册同步
export const registFiledUpdate = (key, value) => {
    return {type: constant.USER_REGIST_FIELD, key, value}
}

//注册提交
export const registSubmit = (user) => {
    // let {email,username,password } = user;
    console.log(user)
    return async (dispatch, getState) => {
        try {
            let result = await request.user.regist(user)
            // console.log('res',result)
            if (result.status === 1) {
                dispatch(push('/login'))
            }else {
                dispatch({
                    type: constant.USER_REGIST_RESULT,
                    result
                })
            }
        } catch (error) {
            // console.log(error)
            dispatch({
                type: constant.USER_REGIST_RESULT,
                result: {status: 0, message: error.message, errors: error}
            })
        }
    }
}

/**
 * 注册清空
 * @returns {{type: string}}
 */
export const registUnload = () => {
    return { type: constant.USER_REGIST_UNLOAD }
}


/**
 * 登录同步
 * @param key
 * @param value
 * @returns {{type: string, value, key}}
 */
export const loginFiledUpdate = (key, value) => {
    return { type: constant.USER_LOGIN_FIELD, key, value }
}

// 登录  提交
export const loginSubmit = (email, password) => {
    return async (dispatch, getState) => {
        try {
            let result = await request.user.login(email, password)
            console.log(result, "result--action");
            dispatch({
                type: constant.USER_LOGIN_RESULT,
                result
            })
        } catch (error) {
            dispatch({
                type: constant.USER_LOGIN_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

/**
 * 登录清空
 * @returns {{type: string}}
 */
export const loginUnload = () => {
    return { type: constant.USER_LOGIN_UNLOAD }
}

