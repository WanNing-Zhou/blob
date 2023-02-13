//处理404异常
const HttpException = require('../exceptions/http.exception')

const noMatchMiddleware = (req, res, next) => {
    /*res
        .status(404)
        .json({
            code: 0,
            message: 'Router Url not found'
        })*/

    const noMathError = new HttpException(404,'访问路径不匹配','router url not found')
    next(noMathError)
}

module.exports = noMatchMiddleware