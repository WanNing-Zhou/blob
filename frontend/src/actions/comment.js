import * as constant from '../constant'
import request from '../request'

//同步
export const commentFiledUpdate = (key,value)=>{
    return {type:constant.COMMENT_CREATE_FILED,key,value}
}

//创造
export const createComment = (slug,body)=>{
    return async (dispatch,getState)=>{
        try {
            const result = await request.comment.create(slug, body)
            // console.log("创建", result);
            dispatch({ type: constant.COMMENT_CREATE_RESULT, result })
        } catch (error) {
            dispatch({
                type: constant.COMMENT_CREATE_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }

    }
}

//删除

