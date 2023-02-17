import * as constant from "../../constant"
const initState = {
    body: "",
    comments: [],
}

const commentReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.COMMENT_CREATE_FILED: //同步
            const key = action.key
            const value = action.value
            // console.log(key, value);
            return { ...state, [key]: value }
        case constant.COMMENT_CREATE_RESULT:  //创建
            if (action.result.status === 1) {
                const comments = action.result.data
                const newComments = state.comments.concat([comments])
                return { ...state, comments: newComments, body: "" }
            } else {
                return { ...state, errors: { message: action.result.message } }
            }
        case constant.COMMENT_GET_RESULT:  //获取
            if (action.result.status === 1) {
                const comments = action.result.data
                return { ...state, comments, body: "" }
            } else {
                return { ...state, errors: { message: action.result.message } }
            }
        case constant.COMMENT_DELETE_RESULT:  //删除
            if (action.result.status === 1) {
                const deleteId = action.result.id
                const deleteResult = state.comments.filter(item => {
                    return item.id !== deleteId
                })
                return { ...state, comments:deleteResult, body: "" }
            } else {
                return { ...state, errors: { message: action.result.message } }
            }
        default:
            return state
    }
}

export default commentReducer