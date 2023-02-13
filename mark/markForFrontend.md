# 前端笔记

## 项目搭建和头部组件

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
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
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


 





        