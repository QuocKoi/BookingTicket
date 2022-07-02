import { USER_LOGIN } from "../../util/settings/config";
import { USERNAME } from "../../_core/Models/USERNAME.js";
import { SET_EDIT_USER, SET_USERNAME_INFORMATION, SET_USERS_LIST, SET_USER_INFORMATION } from "../constants/UserConstants"
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
    userInfor: user,
    usernameDetail: new USERNAME(),
    usersList:[],
    editUser: new USERNAME(),
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFORMATION:
            return { ...state, userInfor: action.user }
        case SET_USERNAME_INFORMATION:
            return { ...state, usernameDetail: action.data }
        case SET_USERS_LIST:
            return {...state,usersList:action.data}
        case SET_EDIT_USER:
            return {...state,editUser:action.data}
        default: return { ...state }
    }
}
export default UserReducer