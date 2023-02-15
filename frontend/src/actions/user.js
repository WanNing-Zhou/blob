import * as constant from '../constant'

//注册同步
export const registFiledUpdate = (key,value)=>{
    return {type:constant.USER_REGIST_FIELD,key,value}
}

//注册提交
export const registSubmit=(user)=>{
    let {email,username,password } = user;
    console.log(user)
}