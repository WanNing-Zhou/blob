import {lazy, Suspense, memo} from 'react';
import {Switch, Route} from 'react-router-dom'
import Header from "./components/Header"
import Home from './pages/Home'


const Login = lazy(()=>import("./pages/Login"))
const Regist = lazy(()=>import("./pages/Regist"))
const ArticleNew = lazy(()=>import('./pages/ArticleNew'))
const Setting = lazy(()=>import('./pages/Setting'))
const Profile = lazy(()=>import('./pages/Profile'))
const Article = lazy(() => import("./pages/Article"))
const ArticleEdit = lazy(() => import("./pages/ArticleEdit"))

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

                    <Route path={'/article/new'} component={ArticleNew} />{/*exact 表示精确匹配*/}
                    <Route path={'/setting'} component={Setting} exact/>
                    <Route path={"/article/:slug"} component={Article} exact />
                    <Route path={"/article/edit/:slug"} component={ArticleEdit} exact />
                    <Route path={"/profile/:username"} component={Profile}/>

                </Switch>
            </Suspense>
        </div>
    );
}

export default memo(App);
