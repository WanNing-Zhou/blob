import * as constant from '../constant';
import request from '../request'
import {push} from "connected-react-router"
import article from "../request/article";

//article(单独的): 清除
export const articleUnload = () => {
    return {type: constant.ARTICLE_UNLOAD}
}

//同步
export const articleFiledUpdate = (key, value) => {
    // console.log('action articleFiledUpdate',key,value)
    return {type: constant.ARTICLE_CREATE_FIELD, key, value}
}

//文章添加标签
export const articleAddTag = () => {
    return {type: constant.ARTICLE_ADD_TAG}
}

//文章移除标签
export const articleRemoveTag = (tag) => {
    return {type: constant.ARTICLE_REMOVE_TAG, tag}
}

// 创建文章
export const createArticle = (article) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.create(article)
            // console.log("创建文章", result);

            if (result.status === 1) {
                const {slug} = result.data
                dispatch(push(`/article/${slug}`))
            } else {
                dispatch({type: constant.ARTICLE_CREATE_RESULT, result})
            }
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

// 通过Slug获取文章
export const getArticleBySlug = (slug) => {
    console.log('方法还未执行')
    return async (dispatch, getState) => {
        try {
            // console.log('request slug',slug)
            const result = await request.article.get(slug)
            // console.log('request result',result)
            //console.log("文章详情",result);
            dispatch({type: constant.ARTICLE_GET_RESULT, result})

        } catch (error) {
            dispatch({
                type: constant.ARTICLE_GET_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

//通过Slug删除文章
export const deleteArticle = (slug) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.delete(slug)
            console.log("文章删除", result);
            if (result.status === 1) {
                dispatch(push('/'))
            } else {
                dispatch({type: constant.ARTICLE_DELETE_RESULT, result})
            }
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_DELETE_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}


//为文章添加喜欢
export const favoriteArticle = (slug) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.favorite(slug)
            // console.log("文章详情",result)
            dispatch({type: constant.ARTICLE_FAVORITE_RESULT, result})
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_FAVORITE_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}


//文章取消喜欢
export const unfavoriteArticle = (slug) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.unfavorite(slug);
            dispatch({type: constant.ARTICLE_UNFAVORITE_RESULT}, result)
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_UNFAVORITE_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}


export const updateArticle = (article) => {
    return async (dispatch, getState) => {
        try {
            //更新文章
            const result = await request.article.update(article)
            dispatch({type:constant.ARTICLE_UPDATE_RESULT,result})
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_UPDATE_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }

}





