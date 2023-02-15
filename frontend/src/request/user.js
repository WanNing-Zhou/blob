import apiClient from "./apiClient";

export default {
    /**
     * 用户注册
     * @param user 用户对象
     */
    regist:(user)=>{apiClient.post('/users',{user})},
    /**
     * 用户登录
     * @param email 邮箱
     * @param password 密码
     */
    login:(email,password)=>{apiClient.post('/users/login',{user:{email,password}})},
    /**
     * 获取用户
     * @param username 用户名
     */
    get:(username,)=>{apiClient.get('/users/'+username)},
    /**
     * 用户更新
     * @param user 用户对象
     */
    update:(user)=>{apiClient.put('/users',{user})},
}