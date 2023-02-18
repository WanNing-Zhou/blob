import {connectRouter} from 'connected-react-router'
import {combineReducers} from 'redux'
import regist from "./user/regist";
import login from "./user/login";
import setting from "./user/setting";
import profile from "./profile";
import articlesReducer from "./articles";
import article from "./article";
import comment from "./comment";
import home from "./home";

let createRootReducer=(history)=>combineReducers({
    user:combineReducers({
        login,
        regist,
        setting
    }),
    profile,
    articlesReducer,
    article,
    comment,
    home,
    router:connectRouter(history)
})

export default createRootReducer;