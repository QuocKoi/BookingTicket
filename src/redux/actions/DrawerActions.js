import { DISPLAY_DRAWER, HIDE_DRAWER, SET_COMPONENT_DRAWER } from "../constants/DrawerConstant"

export const actDisplayDrawer=(NewComponent,newTitle)=>{
    return{
        type:DISPLAY_DRAWER,
        data:NewComponent,
        title:newTitle
    }
}
export const actHideDrawer=()=>{
    return{
        type:HIDE_DRAWER
    }
}

