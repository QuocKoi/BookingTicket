import Notification from "../../Components/Notification/Notification";
import { userManagerServices } from "../../services/UserManagerServices"
import { STATUS, STATUS_CODE, TOKEN, USER_LOGIN } from "../../util/settings/config";
import { SET_EDIT_USER, SET_USERNAME_INFORMATION, SET_USERS_LIST, SET_USER_INFORMATION } from "../constants/UserConstants";
import history from '../../util/libs/history'
import { actHideLoading, actVisibleLoading } from "./LoadingActions";
export const actLogin = (userData) => {
    return async (dispatch) => {
        try {
            const { data, status } = await userManagerServices.login(userData);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({ type: SET_USER_INFORMATION, user: data.content });
                localStorage.setItem(TOKEN, data.content.accessToken);
                localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
                Notification(STATUS.SUCCESS, <h1 className="text-lime-700 m-0">Đăng nhập thành công!</h1>)
                history.push('/home')
            }
        } catch (err) {
            const { status, data } = err.response;
            if (status === STATUS_CODE.NOT_FOUND) {
                Notification(STATUS.ERROR, <h1 className="text-red-700 m-0">{data.content}</h1>)
            }
        }
    }
}
export const actFetchUsernameDetail = () => {
    return async (dispatch) => {
            dispatch(actVisibleLoading());
        try {
            const { data, status } = await userManagerServices.fetchUserNameDetail()
            if(status===STATUS_CODE.SUCCESS){
                await dispatch({type:SET_USERNAME_INFORMATION,data:data.content})
            }
        } catch (err) {

        }
        dispatch(actHideLoading())
    }
}
export const actRegister=(acount)=>{
    return async (dispatch)=>{
        try{
            const {status}=await userManagerServices.register(acount)
            if(status===STATUS_CODE.SUCCESS){
                Notification(STATUS.SUCCESS,<h1 className="text-lime-700 m-0">Đăng ký thành công!</h1>);
                history.goBack();
            }
        }catch(err){
            const {content}=err.response.data
            Notification(STATUS.WARNING,<h1 className="text-yellow-600 m-0">{content}</h1>)
        }
    }
}
export const actFetchUsersList=(name="")=>{
    return async (dispatch)=>{
        try{
            const {data,status}=await userManagerServices.fetchUsersList(name);
            if(status===STATUS_CODE.SUCCESS){
                dispatch({type:SET_USERS_LIST,data:data.content})
            }
        }catch(err){
           
        }
    }
}
export const actDeleteAccount=(acount)=>{
    return async (dispatch)=>{
        try{
            const {status}=await userManagerServices.deleteAccount(acount)
            if(status===STATUS_CODE.SUCCESS){
                Notification(STATUS.SUCCESS,<h1 className="text-lime-700 m-0">Xóa thành công!</h1>);
                dispatch(actFetchUsersList())
            }
        }catch(err){
            const {content}=err.response.data
            Notification(STATUS.WARNING,<h1 className="text-yellow-600 m-0">{content}</h1>)
        }
    }
}
export const actFetchEditUserInfor=(word)=>{
    return async (dispatch)=>{
        try{
            const {data,status}=await userManagerServices.searchUser(word)
            if(status===STATUS_CODE.SUCCESS){
                dispatch({type:SET_EDIT_USER,data:data.content[0]});
            }
        }catch(err){
          
        }
    }
}
export const actUpdateUserInfor=(userInfor)=>{
    return async (dispatch)=>{
        try{
            const {status}=await userManagerServices.updateUserInfor(userInfor);
            if(status===STATUS_CODE.SUCCESS){
                Notification(STATUS.SUCCESS,<h1 className="text-lime-700 m-0">Cập nhật thành công!</h1>);
            }
        }catch(err){
            console.log(err.response)
        }
    }
}
export const actUpdatePersonalInfor=(personalInfor)=>{
    return async (dispatch)=>{
        try{
            const {status}=await userManagerServices.updataPersonalInfor(personalInfor);
            if(status===STATUS_CODE.SUCCESS){
                Notification(STATUS.SUCCESS,<h1 className="text-lime-700 m-0">Cập nhật thành công!</h1>);
            }
        }catch(err){
        }
    }
}
export const actAddUser=(userInfor)=>{
    return async (dispatch)=>{
        try{
            const {status}=await userManagerServices.addUser(userInfor);
            if(status===STATUS_CODE.SUCCESS){
                Notification(STATUS.SUCCESS,<h1 className="text-lime-700 m-0">Thêm thành công!</h1>);
                history.push('/admin/users')
            }
        }catch(err){
            const {data,status}=err.response;
            if(status==STATUS_CODE.SERVER_ERROR){
                Notification(STATUS.ERROR,<h1 className="text-red-700 m-0">{data.content}</h1>); 
            }
        }
    }
}

