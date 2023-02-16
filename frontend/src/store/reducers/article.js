import * as constant from '../../constant'

const initState = {
    title: '',
    description: '',
    body: '',
    tags: [],
    tag: null
}

const articleReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.ARTICLE_UNLOAD:
            return {...initState}
        case constant.ARTICLE_CREATE_FIELD:
            const key = action.key
            const value = action.value
            return {...state, [key]: value}
        case constant.ARTICLE_ADD_TAG:
            const tags = state.tags.concat([state.tag])
            return {...state, tags, tag: ''}
        case constant.ARTICLE_REMOVE_TAG:
            const removeTag = action.tag
            const filterTags = state.tags.filter(tag => {
                return tag !== removeTag
            })
            return {...state, tags: filterTags}
        case constant.ARTICLE_CREATE_RESULT:
            return {...state, errors: {message: action.result.message}}
        case constant.ARTICLE_GET_RESULT:
            if (action.result.status === 1) {
                return {...state, ...action.result.data}
            } else {
                return {...state, errors: {message: action.result.message}}
            }
        case constant.ARTICLE_DELETE_RESULT:
            return {...state, errors: {message: action.result.message}}
        case constant.ARTICLE_FAVORITE_RESULT:
            if (action.result.status === 1) {
                return {...state, ...action.result.data}
            } else {
                return {...state, errors: {message: action.result.message}}
            }
        case constant.ARTICLE_UNFAVORITE_RESULT:
            if (action.result.status === 1) {
                return {...state, ...action.result.data}
            } else {
                return {...state, errors: {message: action.result.message}}
            }
        case constant.ARTICLE_UPDATE_RESULT:
            return {...state, errors: {message: action.result.message}}
        default:
            return state
    }
}

export default articleReducer