import { movieManagerServices } from "../../services/MovieManagerServices"
import { STATUS_CODE } from "../../util/settings/config";
import { SET_BANNER_LIST } from "../constants/CarouselConstants";
import { actHideLoading, actVisibleLoading } from "./LoadingActions";
export const actFetchBannerList=()=>{
    return async (dispatch)=>{
        dispatch(actVisibleLoading())
        try{
            const {data,status}= await movieManagerServices.fetchBannerList();
            if(status==STATUS_CODE.SUCCESS){
               await dispatch({type:SET_BANNER_LIST,data:data.content})
            }
        }catch(err){

        }
        dispatch(actHideLoading())
  
    }
}