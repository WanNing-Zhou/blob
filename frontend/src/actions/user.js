import * as constant from '../constant'

export const registFiledUpdate = (key,value)=>{
    return {type:constant.USER_REGIST_FIELD,key,value}
}