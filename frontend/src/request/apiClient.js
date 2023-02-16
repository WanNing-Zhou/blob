import { getDate } from "../utils/localStorage"

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
    const token = getDate("token");
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


