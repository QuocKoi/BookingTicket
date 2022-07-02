import { ticketManagerServices } from "../../services/TicketManagerServices"
import { STATUS, STATUS_CODE } from "../../util/settings/config"
import { actVisibleLoading, actHideLoading } from '../actions/LoadingActions'
import { CHOOSE_SEAT, RESET_CHOOSE_SEAT_LIST, SET_TAB_ACTIVE, SET_TICKET_OFFICE_LIST } from "../constants/TicketManagerConstant";
import Notification from '../../Components/Notification/Notification'
import { actFetchUsernameDetail } from "./UserActions";
import history from "../../util/libs/history";

export const actFetchTicketOfficeList = (filmCalendarId) => {
    return async (dispatch) => {
        dispatch(actVisibleLoading())
        try {
            const { data, status } = await ticketManagerServices.fetchTicketOfficeList(filmCalendarId);
            if (status === STATUS_CODE.SUCCESS) {
                await dispatch({ type: SET_TICKET_OFFICE_LIST, ticketOfficeData: data.content })
            }
        } catch (err) {

        }
        dispatch(actHideLoading())

    }
}
export const actChooseSeat = (seat) => {
    return async (dispatch, getState) => {
        dispatch({
            type: CHOOSE_SEAT,
            seat
        })
        //Phần real-time bị lỗi nên bỏ qua
        // let {listOfSeatsCurrently}=getState().TicketManagerReducer;
        // let {userInfor}=getState().UserReducer;
        // connection.invoke("datGhe",userInfor,JSON.stringify(listOfSeatsCurrently),filmCalendarId)
    }

}
export const actBookTickets = (ticket, filmCalendarId) => {
    return async (dispatch) => {
        dispatch(actVisibleLoading());
        try {
            const { data, status } = await ticketManagerServices.bookTickets(ticket)
            if (status === STATUS_CODE.SUCCESS) {
                Notification(STATUS.SUCCESS, 'Đặt vé thành công!')
                dispatch({ type: SET_TAB_ACTIVE, tabIndex: '2' })
                dispatch(actFetchTicketOfficeList(filmCalendarId))
                dispatch({ type: RESET_CHOOSE_SEAT_LIST })
                await dispatch(actFetchUsernameDetail())
            }
        } catch (err) {

        }
        dispatch(actHideLoading())
    }

}
export const actCreateFilmCalendar=(data)=>{
    return async (dispatch) => {
        dispatch(actVisibleLoading());
        try {
            const {status } = await ticketManagerServices.createFilmCalendar(data)
            if (status === STATUS_CODE.SUCCESS) {
                Notification(STATUS.SUCCESS, <h1 className="m-0 text-green-600">Tạo lịch chiếu thành công</h1>)
               history.push('/admin/films')
            }
        } catch (err) {
            const {status,data}=err.response;
            if(status==STATUS_CODE.BAD_REQUEST){
                Notification(STATUS.WARNING, <h1 className="m-0 text-yellow-600">{data.content}</h1>) 
            }

        }
        dispatch(actHideLoading())
    }

}