# 前端笔记

## 一 项目搭建和头部组件

### 1.项目搭建

> 1. 先引入后端服务文件,进入backend目录,使用`npm i`命令下载后端相关依赖
> 2. 回到项目根目录,使用 `create-react-app frontend`命令创建react项目
> 3. 使用`npm uninstall @testing-library/jest-dom @testing-library/react @testing-library/user-event`命令将内部的测试依赖卸载
> 4. 使用`npm i react@17 react-dom@17` 下载react17版本依赖
> 5. src目录内只留下`APP.js` 与`index.js` 删除其他文件,并将这两个文件内容修改成为如下形式

- src/APP.js

```javascript
function App() {
    return (
        <div className="App">
            app...
        </div>
    );
}

export default App;

```

- src/index.js

```javascript

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('root'));

```

> 6. public目录只保留`favicon.ico` 与 `index.html` 其余删除,将`index.html`文件内容保留如下形式

- public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="theme-color" content="#000000"/>
    <meta name="description" content="Web site created using create-react-app"/>
</head>

<div id="root"></div>

</body>
</html>
```

> 7. 使用`npm start`启动前端服务, [如果有yarn环境可以使用`yarn start` 启动也是可以地, 如果是两个环境都有,建议使用npm或yarn的一种进行依赖下载,否则可能会出现找不到依赖的情况]

- 启动服务页面展示  
  ![项目首次启动](1_1.png)

> 8. 新建一个终端使用`npm i react-router-dom@5` 命令下载5版本的路由

> 9. 在src目录下创建以下文件夹 以及 文件  
     ![src下需创建](1_2.png)
> 10. 使用路由

- src/index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path={'/'} component={App}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
```

> 11. 在`components` 与 `pages` 创建如下文件夹以及文件  
      ![img_2.png](img_2.png)

- 新建文件内容如以下形式,记得修改 ***类名***
- src/components/Header/index.jsx

```jsx
import React, {Component} from 'react';

export default class Header extends Component {

    state = {};

    render() {
        return (
            <nav>
                Header
            </nav>
        )
    }
}

```

> 12. 在`src/App.js`中使用这些组件以及路由

- src/App.js

```jsx
import {Switch, Route} from 'react-router-dom'
import Header from "./components/Header"
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
    return (
        <div className="App">
            {/*  公共组件*/}
            <Header/>
            {/*主体 */}
            <Switch>
                <Route path={'/'} component={Home} exact/>{/*exact 表示精确匹配*/}
                <Route path={'/login'} component={Login} exact/>
            </Switch>
        </div>
    );
}

export default App;

```

- 效果展示
    - `http://localhost:3000`  
      ![img_3.png](img_3.png)
    - `http://localhost:3000/login`  
      ![img_4.png](img_4.png)

> 13. 优化: 使用`PureComponent`代替使用`Component`
>   - `PureComponent`的作用
      >

- 当使用`Component`时,使用`setState()`进行更改时会调用`render`函数引发更新; 如果更新后的`state`与更新前的`state`是相同的,那么此次更新是不必要的,使用`PureComponent`
  如果组件状态没有改变就不会引发更新. 这种减少渲染次数的优化可以明显提升应用程序性能和体验。

- 把所有使用Component的文件做如下更改
- 如 `src/components/Header/index.jsx`

```jsx
+
import React, {PureComponent} from 'react';

+
export default class Header extends PureComponent {

    state = {};

    render() {
        return (
            <nav>
                Header
            </nav>
        )
    }
}
```

> 14. 路由懒加载  
      > React路由懒加载的作用  
      > React路由懒勋加载的主要作用是在页面切换时按需加载模块，只有在这个模块真正被用到时才会将其加载进来。这样可以减少2种开销：  
      > 减少JavaScript包体积，即减少应用启动加载所必须加载的JavaScriptAPI或组件文件体积，提高加载速度。  
      > 减少网络流量，增强用户体验，避免在网络初始慢的情况下前端性能低下。

- src/App.js

```jsx
+
import {lazy, Suspense, memo} from 'react';
import {Switch, Route} from 'react-router-dom'
import Header from "./components/Header"
import Home from './pages/Home'

+
const Login = lazy(() => import("./pages/Login"))
    +
const Regist = lazy(() => import("./pages/Regist"))

function App() {
    return (
        <div className="App">
            {/*  公共组件*/}
            <Header/>
            {/*主体 */}
            + <Suspense fallback={<p>loading...</p>}>
            <Switch>
                <Route path={'/'} component={Home} exact/>{/*exact 表示精确匹配*/}
                <Route path={'/login'} component={Login} exact/>
                <Route path={"/regist"} component={Regist} exact/>
            </Switch>
            + </Suspense>
        </div>
    );
}

+
export default memo(App);

```

- 效果展示  
  ![img_5.png](img_5.png)

> 15. 终端进入`backend`目录,使用`npm start`命令运行后端服务,修改前端`public/index.html`,将样式引入到前端index.html文件中

- public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="theme-color" content="#000000"/>
    <meta name="description" content="Web site created using create-react-app"/>
    <title>无趣BLOG</title>
    +
    <link rel="stylesheet" href="http://localhost:8000/main.css">
</head>

<div id="root"></div>

</body>
</html>

```

> 16. 在`src/components/Header`创建Menu组件,并在Header中引用,给整个Header部分添加内容

- src/components/Header/Menu.jsx

```jsx
import {memo} from "react";
import {Link} from "react-router-dom";

const Menu = memo(props => {
    const {currentUser} = props
    if (currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                        主页
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/article/new"} className="nav-link">
                        写作
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/setting"} className="nav-link">
                        设置
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/profile/${currentUser.username}`} className="nav-link">
                        <img src={currentUser.avatar || "http://localhost:8000/default.png"}
                             alt="" className="user-pic"/>
                    </Link>
                </li>
            </ul>
        )
    } else {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                        主页
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                        登录
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/regist"} className="nav-link">
                        注册
                    </Link>
                </li>
            </ul>
        )
    }
})

export default Menu

```

- src/components/Header/index.jsx

```jsx

import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import Menu from "./Menu";

let currentUser = {avatar: null}

export default class Header extends PureComponent {

    state = {};

    render() {
        return (
            <nav className="navbar navbar-light">
                {/*左侧*/}
                <div className="container">
                    <Link to={'/'} className="navbar-brand">
                        BLOG-V1
                    </Link>
                    {/*右侧*/}
                    <Menu currentUser={currentUser}/>
                </div>
            </nav>
        )
    }
}
```

- 效果展示  
  ![img_6.png](img_6.png)

# 使用redux完成注册

> 1. 在`src/pages` 内创建`AritcleNew` `Profile` `Setting` 文件夹,并在这些文件夹内添加如以下内容

- src/pages/Profile/index.jsx

```jsx
import React, {PureComponent} from 'react';

export default class Profile extends PureComponent {

    state = {};

    render() {
        return (
            <div>
                Profile
            </div>
        )
    }
}
```

> 2. 在`App.js`中使用这些路由

- App.js

```jsx

import {lazy, Suspense, memo} from 'react';
import {Switch, Route} from 'react-router-dom'
import Header from "./components/Header"
import Home from './pages/Home'


const Login = lazy(() => import("./pages/Login"))
const Regist = lazy(() => import("./pages/Regist"))
    +
const ArticleNew = lazy(() => import('./pages/AritcleNew'))
    +
const Setting = lazy(() => import('./pages/Setting'))
    +
const Profile = lazy(() => import('./pages/Profile'))

function App() {
    return (
        <div className="App">
            {/*  公共组件*/}
            <Header/>
            {/*主体 */}
            <Suspense fallback={<p>loading...</p>}>
                <Switch>
                    <Route path={'/'} component={Home} exact/>{/*exact 表示精确匹配*/}
                    <Route path={'/login'} component={Login} exact/>
                    <Route path={"/regist"} component={Regist} exact/>

                    + <Route path={'/article/new'} component={ArticleNew} exact/>{/*exact 表示精确匹配*/}
                    + <Route path={'/setting'} component={Setting} exact/>
                    + <Route path={"/profile"} component={Profile} exact/>

                </Switch>
            </Suspense>
        </div>
    );
}

export default memo(App);

```

> 3. 添加Errors组件

- src/components/Errors.js

```jsx
import React, {Component} from 'react';

const Errors = (({errors}) => {
    if (!errors) {
        return null
    }

    return (
        <ul className='error-messages'>
            <li>{errors}</li>
        </ul>
    )

})

export default Errors;
```

> 3. 为注册页面添加内容

```jsx
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom'
import Errors from '../../components/Errors'

export default class Regist extends PureComponent {
    state = {
        email: '你的邮箱',
        username: '你的名称',
        password: '',
        errors: {
            message: '网络错误'
        }
    };

    onSubmit = (e) => {
        e.preventDefault(); //阻止默认行为
    }

    changeEmail = (e) => {
        this.setState({email: e.target.value})
    }

    changeUserName = (e) => {
        this.setState({username: e.target.value})

    }

    changePassword = (e) => {
        this.setState({password: e.target.value})

    }

    render() {
        const {email, username, password, errors} = this.props
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1>注册</h1>
                        <p className='text-xs-center'>
                            <Link to="/login">
                                有账号直接登录？
                            </Link>
                        </p>
                        <Errors errors={this.state.errors.message}/>
                        <form onSubmit={this.onSubmit}>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户邮箱'
                                    value={email}
                                    onChange={this.changeEmail}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户名称'
                                    value={username}
                                    onChange={this.changeUserName}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="password"
                                    placeholder='用户密码'
                                    value={password}
                                    onChange={this.changePassword}
                                />
                            </fieldset>
                            <button
                                className='btn btn-lg btn-primary pull-xs-right'
                                type='submit'
                            >
                                注册
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

```

- 效果显示

![img_7.png](img_7.png)

> 5. 控制台输入命令`npm i redux history redux-thunk connected-react-router react-redux` 下载相关依赖

> 6. 在store下创建如下文件(图片所示),添加constant中的常量,在actions目录下创建user.js文件

![img_8.png](img_8.png)

- src/store/index.js

```js
import {legacy_createStore, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import createRootReducer from './reducers/index'

export const history = createBrowserHistory()
//暴露store
export const store = legacy_createStore(createRootReducer(history), applyMiddleware(routerMiddleware(history), thunk))
```

- src/constant.js

```js
//注册
export const USER_REGIST_FIELD = "USER_REGIST_FIELD"

```

- src/store/reducers/index.js

```js
import {connectRouter} from 'connected-react-router'
import {combineReducers} from 'redux'
import userReducer from "./user";

let createRootReducer = (history) => combineReducers({
    user: userReducer,
    router: connectRouter(history)
})

export default createRootReducer;
```

- src/store/reducers/regist.js

```js
import * as constant from '../../constant'

const initState = {
    email: '',
    username: '',
    password: '',
    errors: null
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_REGIST_FIELD:
            const key = action.key;
            const value = action.value;
            // console.log(key,value,'reducer')
            return {...state, [key]: value};
            break;
        default:
            return state;
    }
}

export default userReducer
```

- src/actions/regist.js

```js
import * as constant from '../constant'

export const registFiledUpdate = (key, value) => {
    return {type: constant.USER_REGIST_FIELD, key, value}
}
```

> 7. 使用redux

- src/index.js

```jsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
+ import {Route, Switch} from 'react-router-dom'
+ import {ConnectedRouter} from 'connected-react-router'
+ import {Provider} from 'react-redux'
+ import {store, history} from "./store";

ReactDOM.render(
+     <Provider store={store}>
+        <ConnectedRouter history={history}>
            <Switch>
                <Route path={'/'} component={App}/>
            </Switch>
+        </ConnectedRouter>
+    </Provider>,
    document.getElementById('root')
);

```

- src/pages/Regist/index.jsx

```jsx
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom'
import Errors from '../../components/Errors'
+ import {connect} from "react-redux";
+ import * as action from '../../actions/user'
+ import {registFiledUpdate} from "../../actions/user";

+ class Regist extends PureComponent {

    onSubmit = (e)=>{
        e.preventDefault(); //阻止默认行为
    }

    changeEmail = (e)=>{
+        this.props.registFiledUpdate("email", e.target.value)
    }

    changeUserName = (e) =>{
+        this.props.registFiledUpdate("username", e.target.value)

    }

    changePassword = (e)=>{
+         this.props.registFiledUpdate("password", e.target.value)

    }

    render() {
+         const {email, username, password, errors} = this.props
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1>注册</h1>
                        <p className='text-xs-center'>
                            <Link to="/login">
                                有账号直接登录？
                            </Link>
                        </p>
                        <Errors errors={errors}/>
                        <form onSubmit={this.onSubmit}>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户邮箱'
                                    value={email}
                                    onChange={this.changeEmail}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户名称'
                                    value={username}
                                    onChange={this.changeUserName}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="password"
                                    placeholder='用户密码'
                                    value={password}
                                    onChange={this.changePassword}
                                />
                            </fieldset>
                            <button
                                className='btn btn-lg btn-primary pull-xs-right'
                                type='submit'
                            >
                                注册
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

+ const mapState = state =>({
+    ...state.user
+ })

+ export default connect(mapState,{registFiledUpdate})(Regist)
```
# 封装请求,模块化reducer

> 1. 封装请求方法: 在`src/request`目录下创建 `apiClien.js` 文件

```js
//地址
const baseURL = "http://localhost:8000/api/v1"
//请求方法
const method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}
//请求头
const contentType = {
    JSON: 'application/json;charset=UTF-8',
    FORM: 'application/x-www-form-urlencoded;charset=UTF-8'
}

const getHeaders = () => {
    const token = '';
    const headers = {
        "Content-Type": contentType.JSON,
        "Authorization": `Token ${token}`
    };
    return headers;
}
/**
 * get请求
 * @param url 请求地址
 * @returns {Promise<any>}
 */
const getRequest = async (url) => {
    const response = await fetch(baseURL+url,{
        method:method.GET,
        headers:getHeaders()
    })
    return response.json();
}

/**
 * post请求
 * @param url 请求地址
 * @param body 请求体
 * @returns {Promise<any>}
 */
const postRequest = async (url,body) => {
    const response = await fetch(baseURL+url,{
        method:method.POST,
        headers:getHeaders(),
        body:JSON.stringify(body)
    })
    return response.json();
}
/**
 * put请求
 * @param url 地址
 * @param body 请求体
 * @returns {Promise<any>}
 */
const putRequest = async (url,body) => {
    const response = await fetch(baseURL+url,{
        method:method.PUT,
        headers:getHeaders(),
        body:JSON.stringify(body)
    })
    return response.json();
}
/**
 * delete请求
 * @param url 请求地址
 * @returns {Promise<any>}
 */
const deleteRequest = async (url) => {
    const response = await fetch(baseURL+url,{
        method:method.DELETE,
        headers:getHeaders(),
    })
    return response.json();
}


export default {
    get:getRequest,
    post:postRequest,
    put:putRequest,
    delete:deleteRequest
}

```

> 2. 封装用户请求 `src/request`目录下创建 `user.js`

- src/request/user.js
```js
import apiClient from "./apiClient";

export default {
    /**
     * 用户注册
     * @param user 用户对象
     */
    regist:(user)=>apiClient.post('/users',{user}),
    /**
     * 用户登录
     * @param email 邮箱
     * @param password 密码
     */
    login:(email,password)=>apiClient.post('/users/login',{user:{email,password}}),
    /**
     * 获取用户
     * @param username 用户名
     */
    get:(username)=>apiClient.get('/users/'+username),
    /**
     * 用户更新
     * @param user 用户对象
     */
    update:(user)=>apiClient.put('/users',{user}),
}
```

> 3. 在 `src/constant.js`中添加新的常量
```js
//用户注册
export const USER_REGIST_FIELD = "USER_REGIST_FIELD";//用户注册信息同步
export const USER_REGIST_RESULT = "USER_REGIST_RESULT"//用户注册结果
export const USER_REGIST_UNLOAD = "USER_REGIST_UNLOAD" //注册组件卸载

// 登录
export const USER_LOGIN_FIELD = "USER_LOGIN_FIELD"  //用户登录状态同步
export const USER_LOGIN_RESULT = "USER_LOGIN_RESULT" //用户登录结果
export const USER_LOGIN_UNLOAD = "USER_LOGIN_UNLOAD" //登录组件卸载

//

```
> 4. 在actions中添加异步注册的action以及删除注册后清空状态的action

```js
import * as constant from '../constant'
import request from '../request'
import {push} from 'connected-react-router'

//注册同步
export const registFiledUpdate = (key, value) => {
    return {type: constant.USER_REGIST_FIELD, key, value}
}

//注册提交
export const registSubmit = (user) => {
    // let {email,username,password } = user;
    console.log(user)
    return async (dispatch, getState) => {
        try {
            let result = await request.user.regist(user)
            // console.log('res',result)
            if (result.status === 1) {
                dispatch(push('/login'))
            }else {
                dispatch({
                    type: constant.USER_REGIST_RESULT,
                    result
                })
            }
        } catch (error) {
            // console.log(error)
            dispatch({
                type: constant.USER_REGIST_RESULT,
                result: {status: 0, message: error.message, errors: error}
            })
        }
    }
}

/**
 * 注册清空
 * @returns {{type: string}}
 */
export const registUnload = () => {
    return { type: constant.USER_REGIST_UNLOAD }
}


/**
 * 登录同步
 * @param key
 * @param value
 * @returns {{type: string, value, key}}
 */
export const loginFiledUpdate = (key, value) => {
    return { type: constant.USER_LOGIN_FIELD, key, value }
}

// 登录  提交
export const loginSubmit = (email, password) => {
    return async (dispatch, getState) => {
        try {
            let result = await request.user.login(email, password)
            console.log(result, "result--action");
            dispatch({
                type: constant.USER_LOGIN_RESULT,
                result
            })
        } catch (error) {
            dispatch({
                type: constant.USER_LOGIN_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

/**
 * 登录清空
 * @returns {{type: string}}
 */
export const loginUnload = () => {
    return { type: constant.USER_LOGIN_UNLOAD }
}


```
> 5. 将用户的reducer重新封装, 并在 `src/store/reducers/index.js`中重新引用

![img_9.png](img_9.png)

- src/store/reducers/user/regist.js

```js
import * as constant from '../../../constant'

const initState = {
    email: '',
    username: '',
    password: '',
    errors: null
}

/**
 * 操作注册时状态的改变
 * @param state
 * @param action
 * @returns {{password: string, email: string, errors: null, username: string}}
 */
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_REGIST_FIELD:
            const key = action.key;
            const value = action.value;
            // console.log(key,value,'reducer')
            return {...state, [key]: value};
        case constant.USER_REGIST_RESULT:
            return {...state,errors:action.result.message}
        case constant.USER_REGIST_UNLOAD:
            return {...initState}
        default:
            return state;
    }
}

export default userReducer
```
- src/store/reducers/user/login.js

```js
import * as constant from "../../../constant"
import { saveDate, getDate } from "../../../utils/localStorage"

const initUser = () => {
    const currentUser = getDate("currentUser")
    // console.log("reducer",currentUser);
    if (currentUser) {
        return currentUser
    }
    return null
}

const initState = {
    email: "",
    username: "",
    password: "",
    errors: null,
    currentUser: initUser(), //当前用户
    token: null,
    avatar: null
}

/**
 * 操作登录时的用户状态
 * @param state
 * @param action
 * @returns {{password: string, currentUser: any, avatar: null, email: string, errors: null, username: string, token: null}|(*&{redirect: string, password: string, currentUser: any, avatar: null, email: string, errors: null, username: string, token: null})|{password: string, currentUser: any, avatar: null, email: string, errors, username: string, token: null}}
 */

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_LOGIN_FIELD:
            const key = action.key
            const value = action.value
            // console.log(key,value,"reducer----");
            return { ...state, [key]: value };
        case constant.USER_LOGIN_UNLOAD:
            return { ...initState, currentUser: initUser() } //登录组件卸载时,清空组件中的内容,并将正在在登陆的用户保存在state中
        case constant.USER_LOGIN_RESULT:
            const { status, message, data } = action.result
            if (status === 1) {
                let currentUser = data
                let token = data.token
                saveDate("currentUser", currentUser) //存储当前用户
                saveDate("token", token) //存储token
                return { ...state, ...data, redirect: "/" } //redirect是要跳转到路由
            } else {
                return { ...state, errors: message }
            }
        default:
            return state;
    }
}

export default loginReducer

```
- src/store/reducers/index.js

```js
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
```

> 6. 在注册组件以及登录组件中使用redux

- src/pages/Regist/index.jsx

```jsx
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom'
import Errors from '../../components/Errors'
import {connect} from "react-redux";
+ import {registFiledUpdate,registSubmit,registUnload} from "../../actions/user";

 class Regist extends PureComponent {

+    onSubmit = (e)=>{
+        e.preventDefault(); //阻止默认行为
+        const {email,username,password} = this.props;
+        this.props.registSubmit({email,username,password})

    }
    //组件将要卸载的时候调用
+    componentWillUnmount() {
+        this.props.registUnload(); //清空用户注册时的表单
+    }

     changeEmail = (e)=>{
        this.props.registFiledUpdate("email", e.target.value)
    }

    changeUserName = (e) =>{
        this.props.registFiledUpdate("username", e.target.value)

    }

    changePassword = (e)=>{
        this.props.registFiledUpdate("password", e.target.value)

    }

    render() {
        const {email, username, password, errors} = this.props
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1>注册</h1>
                        <p className='text-xs-center'>
                            <Link to="/login">
                                有账号直接登录？
                            </Link>
                        </p>
                        <Errors errors={errors}/>
                        <form onSubmit={this.onSubmit}>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户邮箱'
                                    value={email}
                                    onChange={this.changeEmail}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户名称'
                                    value={username}
                                    onChange={this.changeUserName}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="password"
                                    placeholder='用户密码'
                                    value={password}
                                    onChange={this.changePassword}
                                />
                            </fieldset>
                            <button
                                className='btn btn-lg btn-primary pull-xs-right'
                                type='submit'
                            >
                                注册
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = state =>({
    ...state.user
})

+ export default connect(mapState,{registFiledUpdate,registSubmit,registUnload})(Regist)

```

- src/pages/Login/index.jsx
```jsx
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {store} from '../../store'
import {replace} from 'connected-react-router'
import Errors from "../../components/Errors";
import {loginSubmit, loginFiledUpdate, loginUnload} from '../../actions/user'

class Login extends PureComponent {

    state = {};

    //当页面更新的时候
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.redirect && this.props.redirect !== prevProps.redirect) {
            store.dispatch(replace(this.props.redirect))
        }
    }

    componentWillUnmount() {
        this.props.loginUnload()
    }

    changeEmail = (e) => {
        this.props.loginFiledUpdate("email", e.target.value)
    }

    changePassword = (e) => {
        this.props.loginFiledUpdate("password", e.target.value)
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {email, password} = this.props
        this.props.loginSubmit(email, password)
    }


    render() {
        const {email, password, errors} = this.props
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1>登录</h1>
                        <p className='text-xs-center'>
                            <Link to="/regist">
                                没有账号直接注册？
                            </Link>
                        </p>
                        <Errors errors={errors}/>
                        <form onSubmit={this.onSubmit}>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户邮箱'
                                    value={email}
                                    onChange={this.changeEmail}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="password"
                                    placeholder='用户密码'
                                    value={password}
                                    onChange={this.changePassword}
                                />
                            </fieldset>
                            <button
                                className='btn btn-lg btn-primary pull-xs-right'
                                type='submit'
                            >
                                登录
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


const mapState = state => ({
    ...state.user.login
})


export default connect(mapState, {loginFiledUpdate, loginSubmit, loginUnload})(Login)
```

> 7. 如果在路由跳转的时候发生以下错误,请检查`history`的版本
>
> `【React】Could not find router reducer in state tree....`  
> 可能是由于history的最新版不兼容connect-react-router导致。  
> 执行命令`npm i history@4`下载低版本的history进行使用

> 8. 在浏览器中进行对注册功能以及登录功能的测试

