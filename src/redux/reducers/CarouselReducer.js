import { SET_BANNER_LIST } from "../constants/CarouselConstants"

const initialState ={
    arrBanner:[]
}

const CarouselReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BANNER_LIST:
            const {data}=action;
            return {...state,arrBanner:data}
        default: return {...state}
    }
}
export default CarouselReducer