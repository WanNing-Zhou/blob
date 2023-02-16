import * as constant from "../../constant"


//初始化状态
const initState = {
    username:'',
    bio:'',
    avatar:'',
    following:false,
    followers:[],
    errors:null
}

const  profileReducer = (state = initState,action)=>{
    switch (action.type){
        case constant.PROFILE_GET_RESULT:
            const {status,message,data} = action.result
            if (status === 1){
                return {...state,...data}
            }else{
                return {...state,errors:{message}}
            }
        case constant.PROFILE_FOLLOW_RESULT:
            if(action.result.state === 1){
                return {...state,...action.result.data}
            }else{
                return {...state,errors:{message:action.result.message}}
            }
        default:
            return false;
    }
}

export default profileReducer