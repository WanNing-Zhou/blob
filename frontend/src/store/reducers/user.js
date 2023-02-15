import * as constant from '../../constant'

const initState = {
    email: '',
    username: '',
    password: '',
    errors: null
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_REGIST_FIELD:
            const key = action.key;
            const value = action.value;
            // console.log(key,value,'reducer')
            return {...state, [key]: value};
            break;
        default:
            return state;
    }
}

export default userReducer