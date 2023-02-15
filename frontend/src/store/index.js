import {legacy_createStore,applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import  {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import createRootReducer  from './reducers/index'

export const history = createBrowserHistory()
//暴露store
export const store = legacy_createStore(createRootReducer(history),applyMiddleware(routerMiddleware(history),thunk))