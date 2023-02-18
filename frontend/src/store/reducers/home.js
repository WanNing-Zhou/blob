import * as constant from "../../constant"
const initState = {
    count: 0,
    articles: [],
    tags: [],
    tag: null,
    tab: "all",
    currentPage: 1
}

const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.TAGS_GET_RESULT:
            if (action.result.status === 1) {
                const tags = action.result.data
                return { ...state, tags }
            } else {
                return { ...state, errors: { message: action.result.message } }
            }
        case constant.HOME_PAGE_SYNC:
            return { ...state, currentPage: action.page }
        case constant.HOME_TAG_SYNC:
            return { ...state, tag: action.tag }
        case constant.HOME_TAB_SYNC:
            return { ...state, tab: action.tab }
        case constant.HOME_ARTICLES_RESULT:
            if (action.result.status === 1) {
                const { arr: artcles } = action.result.data
                return { ...state, artcles, ...action.result.data }
            } else {
                return { ...state, errors: { message: action.result.message } }
            }
        case constant.HOME_UNMOUNT:
            return { ...initState }
        default:
            return state
    }
}

export default homeReducer