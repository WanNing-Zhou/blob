# 博客系统

## 服务器环境

### 依赖 

- nodemon: 自动化检测文件变化,重新启动node.js应用程序
- express: node框架
- dotenv: 是一个零依赖框架,他能将环境变量中的变量从.env文件加载到precess.env中,将环境相关的配置独立于代码之外
- sequelize 基于 promise 的 Node.js ORM

> - 什么是ORM?
> 
> 即Object-Relational Mapping,它的作用是在关系型数据库和对象之间作一个映射，在具体的操作数据库的时候，就不需要再去和复杂的SQL语句打交道，只要像平时操作对象一样

- mysql2: mysql数据库连接驱动

- CORS中间件 : 用来解决跨域
``` 
origin 
Access-Control-Allow-Origin 
字段必选Boolean:set origin to true to reflect the request origin,as defined by req.header('Origin'),or set it to false to disable CORS 

credentials 
Access-Control-Allow-Credentials 
该字段可选。值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在 CORS请求之中。 
CORS请求默认不发送Cookiei和HTTP认证信息。 
如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control--Allow-Credentials: true 
另一方面，开发者必须在AJAX请求中打开withCredentials,属性。 
var xhr new XMLHttpRequest() 
xhr.withCredentials true; 
否则，即使服务器同意发送Cookie,浏览器也不会发送
```

- morgan: 日志中间件
``` 
Morgan是一个node.js:关于htp请求的日志中间件 
在终端打印日志
 每次http请求，express:实例都会输出日志，并且使用一致的格式 
 tiny: The minimal output. 
 :method: url status :res[content-length]-:response-time ms
```
- jsonwebtoken
``` 
在前后分离的项目中，每次请求session都会变化,前端调用后端api接口，因此使用cors = require('cors')来解决了跨域问题，而跨域对于cookie来说，就是两个不同的网站，因此session会不停的变。
在计算机身份认证中是令牌（临时）的意思，在词法分析中是标记的意思。一般我们所说的的token大多是指用于身份验证的token

我们需要每次都知道当前请求的人是谁，但是又不想每次都让他提交用户名和密码，这时就需要有一个等同于用户名密码也能够标识用户身份的东西，即—token

```

- MD5 : 加密,增强数据的安全性

- bcrypt 加密方案
