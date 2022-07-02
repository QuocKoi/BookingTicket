import { HIDE_LOADING, VISIBLE_LOADING } from "../constants/LoadingContanst"

export const actVisibleLoading=()=>{
    return{
        type:VISIBLE_LOADING
    }
}
export const actHideLoading=()=>{
    return{
        type:HIDE_LOADING
    }
}