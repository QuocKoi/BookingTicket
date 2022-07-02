import { DISPLAY_DRAWER, HIDE_DRAWER, SET_COMPONENT_DRAWER } from "../constants/DrawerConstant"

const initialState={
    visible:false,
    Component:'',
    title:''
}

const DrawerReducer=(state=initialState,action)=>{
    switch(action.type){
        case DISPLAY_DRAWER:
            return {...state,visible:true,Component:action.data,title:action.title}
        case HIDE_DRAWER:
            return {...state,visible:false}
        default: return {...state}
    }
}
export default DrawerReducer