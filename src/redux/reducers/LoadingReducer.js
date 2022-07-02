import { HIDE_LOADING, VISIBLE_LOADING } from "../constants/LoadingContanst"

const initialState = {
    visible: false
}

const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case VISIBLE_LOADING:
            return { ...state, visible: true }
        case HIDE_LOADING:
            return { ...state, visible: false }
        default: return { ...state }
    }
}
export default LoadingReducer