import Notification from "../../Components/Notification/Notification";
import { movieManagerServices } from "../../services/MovieManagerServices"
import { STATUS, STATUS_CODE } from "../../util/settings/config";
import { SET_FILMS_LIST, SET_FILM_INFOR_DETAIl } from "../constants/MovieManagerConstant";
import { actHideLoading, actVisibleLoading } from "./LoadingActions";
import history from '../../util/libs/history'
export const actFetchFilmList = (filmName) => {
    console.log(filmName)
    return async (dispatch) => {
        dispatch(actVisibleLoading())
        try {
            const { data, status } = await movieManagerServices.fetchFilmList(filmName);
            if (status === STATUS_CODE.SUCCESS) {
                await dispatch({ type: SET_FILMS_LIST, data: data.content })
            }
        } catch (err) {

        }
        dispatch(actHideLoading())
    }
}
export const actFetchFilmInforDetail = (filmId) => {
    return async (dispatch) => {
        dispatch(actVisibleLoading())
        try {
            const { data, status } = await movieManagerServices.fetchFilmInfor(filmId);
            if (status === STATUS_CODE.SUCCESS) {
                await dispatch({ type: SET_FILM_INFOR_DETAIl, filmInfor: data.content })
            }
        } catch (err) {

        }
        dispatch(actHideLoading())
    }
}
export const actAddFilm = (formData) => {
    return async (dispatch) => {
        dispatch(actVisibleLoading())
        try {
            const { status } = await movieManagerServices.addFilm(formData);
            if (status == STATUS_CODE.SUCCESS) {
                Notification(STATUS.SUCCESS, <h1 className="m-0 text-green-600">Thêm thành công</h1>);
                history.push(`/admin/films`)
            }
        } catch (err) {
            const { status, data } = err.response;
            if (status == STATUS_CODE.SERVER_ERROR) {
                Notification(STATUS.ERROR, <h1 className="m-0 text-red-600">{data.content}</h1>)
            }
        }
        dispatch(actHideLoading())
    }
}
export const actUpdateFilm = (formData, filmId) => {
    return async dispatch => {
        dispatch(actVisibleLoading())
        try {
            const { status } = await movieManagerServices.updateFilm(formData)
            if (status == STATUS_CODE.SUCCESS) {
                dispatch(actFetchFilmInforDetail(filmId))
                Notification(STATUS.SUCCESS, <h1 className="m-0 text-green-600">Cập nhật thành công</h1>)

            }
        } catch (err) {
            console.log(err.response)
        }
        dispatch(actHideLoading())
    }
}
export const actDeleteFilm = (filmId) => {
    return async dispatch => {
        dispatch(actVisibleLoading())
        try {
            const { status } = await movieManagerServices.deleteFilm(filmId);
            if (status == STATUS_CODE.SUCCESS) {
                Notification(STATUS.SUCCESS, <h1 className="m-0 text-green-600">Xóa thành công</h1>)
                dispatch(actFetchFilmList())
            }
        } catch (err) {

        }
        dispatch(actHideLoading())
    }
}