import { cinemaManagerServices } from "../../services/CinemaManagerServices"
import { STATUS_CODE } from "../../util/settings/config";
import { SET_CINEMA_INFOR, SET_CINEMA_INFOR_FOLLOW_SYSTEM, SET_FILM_CALENDAR, SET_MOVIES_CALENDAR_IN_CINEMA } from "../constants/CinemaManagerConstant";
import { actHideLoading, actVisibleLoading } from "./LoadingActions";

export const actFetchMoviesCalendarInCinema = () => {
    return async (dispatch) => {
        try {
            dispatch(actVisibleLoading())
            const { data, status } = await cinemaManagerServices.fetchMoviesCalendarInCinema();
            if (status === STATUS_CODE.SUCCESS) {
               await dispatch({ type: SET_MOVIES_CALENDAR_IN_CINEMA, data: data.content })
            }
        } catch (err) {

        }
        dispatch(actHideLoading())

    }
}
export const actFetchCinemaInfor = () => {
    return async (dispatch) => {
        dispatch(actVisibleLoading())
        try {
            const { data, status } = await cinemaManagerServices.fetchCinemaInfor();
            if (status === STATUS_CODE.SUCCESS) {
               await dispatch({ type: SET_CINEMA_INFOR, cinemaList: data.content })
            }
        } catch (err) {

        }
        dispatch(actHideLoading())
    }
}
export const actFetchFilmCalendar = (filmId) => {
    return async (dispatch) => {
        dispatch(actVisibleLoading())
        try {
            const { data, status } = await cinemaManagerServices.fetchFilmCalendarDetail(filmId);
            if (status === STATUS_CODE.SUCCESS) {
               await dispatch({ type: SET_FILM_CALENDAR, filmCalendarDetail: data.content })
            }
        } catch (err) {

        }
        dispatch(actHideLoading())
    }
}
export const actFetchCinemaInforFollowSystem = (cinemaSystemId) => {
    return async (dispatch) => {
        dispatch(actVisibleLoading())
        try {
            const { data, status } = await cinemaManagerServices.fetchCinemaInforFollowSystem(cinemaSystemId);
            if (status === STATUS_CODE.SUCCESS) {
                await dispatch({ type: SET_CINEMA_INFOR_FOLLOW_SYSTEM, dataList: data.content })
            }
        } catch (err) {

        }
        dispatch(actHideLoading())
    }
}
