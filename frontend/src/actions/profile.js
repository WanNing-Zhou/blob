import * as constant from "../constant"
import request from '../request'

//profile: 获取信息
export const getProfile = (username) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.get(username) //根据用户名获取用户信息
            dispatch({type: constant.PROFILE_GET_RESULT, result})
        } catch (error) {
            dispatch({
                type: constant.PROFILE_GET_RESULT,
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
 * 添加关注
 * @param username
 * @returns {(function(*, *): Promise<void>)|*}
 */
export const addFollow = (username) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.follow(username)
            console.log('profile', result);
            dispatch({type: constant.PROFILE_FOLLOW_RESULT, result})
        } catch (error) {
            dispatch({
                type: constant.PROFILE_FOLLOW_RESULT,
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
 * 取消关注
 * @param username
 * @returns {(function(*, *): Promise<void>)|*}
 */
export const deleteFollow = (username) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.unfollow(username)
            console.log('profile', result);
            dispatch({type: constant.PROFILE_FOLLOW_RESULT, result})
        } catch (error) {
            dispatch({
                type: constant.PROFILE_FOLLOW_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}