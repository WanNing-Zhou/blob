import * as constant from "../constant"
import request from "../request"

// article : 作者的文章
export const getArtcileByAuthor = (username, page) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.getAuthor(username, page)
            // console.log("profile-自己的", result);
            dispatch({ type: constant.ARTICLE_AUTHOR_RESULT, result })
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_AUTHOR_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}


export const getArtcileByFavorite = (username, page) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.getFavorite(username, page)
            // console.log("profile-喜欢", result);
            dispatch({ type: constant.ARTICLE_AUTHOR_RESULT, result })
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_AUTHOR_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}
