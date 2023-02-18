import * as constant from '../constant'
import request from '../request'

export const getTags = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request.tag.getAll(); //获取全部标签
            dispatch({type: constant.TAGS_GET_RESULT, result})
        } catch (error) {
            dispatch({
                type: constant.TAGS_GET_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

//同步标签
export const syncTag = (tag) => {
    return {
        type: constant.HOME_TAG_SYNC,
        tag
    }
}

export const syncTab = (tab) => {
    return {type: constant.HOME_TAB_SYNC, tab}
}

//同步文章
export const syncPage = (page) => {
    return {type: constant.HOME_PAGE_SYNC, page}
}
//当标签被点击的时候
export const onTabClick = ()=>{
    return async (dispatch,getState)=>{
        try {
            let {tab,tag,currentPage} = getState().home;
            let result = {}
            if (tab){
                if (tab === 'all'){
                    result = await request.article.getAll(currentPage)
                }
            }
            if (tag){
                result = await request.article.byTag(tag,currentPage)
            }

            dispatch({
                type: constant.HOME_ARTICLES_RESULT,
                result
            })
        }catch (error){
            dispatch({
                type: constant.HOME_ARTICLES_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

export const homeUnmount = () => {
    return {
        type: constant.HOME_UNMOUNT
    }
}

