
const errorMiddleware = (error,req,res,next)=>{
    console.log(error);
    const status = error.status || 500;
    const message = error.message || '服务器端错误';
    const errors = error.errors || '服务器端错误';

    res
        .status(status)
        .json({
            code:0,
            message:message,
            errors:errors
        })
}

module.exports = errorMiddleware
/**
 * 常见状态码分类
 *  1x:通知
 *  2××:请求成功地接收
 *  3××:重定向问题
 *  4××:客户错误
 *  5×:服务器错误
 *
 *状态码
 * 1.请求成功，浏览器会把响应体内容（通常是html)显示在浏览器中；
 * 2.404:(客户端问题)请求的资源没有找到，说明客户端错误的请求了不存在的资源：
 * 3.500:(服务端问题)请求资源找到了，但服务器内部发生了不可预期的错误；
 *
 */