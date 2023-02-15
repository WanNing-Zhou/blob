import {connectRouter} from 'connected-react-router'
import {combineReducers} from 'redux'
import userReducer from "./user";

let createRootReducer=(history)=>combineReducers({
    user:userReducer,
    router:connectRouter(history)
})

export default createRootReducer;