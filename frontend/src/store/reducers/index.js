import {connectRouter} from 'connected-react-router'
import {combineReducers} from 'redux'
import regist from "./user/regist";
import login from "./user/login";

let createRootReducer=(history)=>combineReducers({
    user:combineReducers({
        login,
        regist
    }),
    router:connectRouter(history)
})

export default createRootReducer;