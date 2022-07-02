import { SET_CINEMA_INFOR, SET_CINEMA_INFOR_FOLLOW_SYSTEM, SET_FILM_CALENDAR, SET_MOVIES_CALENDAR_IN_CINEMA } from "../constants/CinemaManagerConstant"

const initialState = {
    arrMoviesCalendarList: [],
    arrCinemaInforList: [],
    filmCalendar: {},
    arrCinemaInforFollowSystem:[]
}

const CinemaManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIES_CALENDAR_IN_CINEMA:
            const { data } = action;
            return { ...state, arrMoviesCalendarList: data }
        case SET_CINEMA_INFOR:
            const { cinemaList } = action;
            return { ...state, arrCinemaInforList: cinemaList }
        case SET_FILM_CALENDAR:
            const { filmCalendarDetail } = action;
            return {...state,filmCalendar:filmCalendarDetail}
        case SET_CINEMA_INFOR_FOLLOW_SYSTEM:
            return {...state,arrCinemaInforFollowSystem:action.dataList}
        default: return { ...state }
    }
}
export default CinemaManagerReducer