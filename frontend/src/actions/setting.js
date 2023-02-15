import * as constant from "../constant"
import request from "../request"
// import { push } from "connected-react-router"

// 设置  同步
export const settingFiledUpdate = (key, value) => {
    return { type: constant.SETTING_FIELD, key, value }
}

// 设置 清空
export const settingUnload = () => {
    return { type: constant.SETTING_UNLOAD }
}

// 设置 退出
export const settingLogout = () => {
    return { type: constant.SETTING_LOGOUT }
}