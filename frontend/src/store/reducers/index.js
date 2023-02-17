import {connectRouter} from 'connected-react-router'
import {combineReducers} from 'redux'
import regist from "./user/regist";
import login from "./user/login";
import setting from "./user/setting";
import profile from "./profile";
import articles from "./articles";
import article from "./article";
import comment from "./comment";

let createRootReducer=(history)=>combineReducers({
    user:combineReducers({
        login,
        regist,
        setting
    }),
    profile,
    articles,
    article,
    comment,
    router:connectRouter(history)
})

export default createRootReducer;