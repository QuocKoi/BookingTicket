import { TICKETOFFICEDETAIL } from "../../_core/Models/TICKETOFFICEDETAIL"
import { SET_TICKET_OFFICE_LIST,CHOOSE_SEAT, SET_TAB_ACTIVE, RESET_CHOOSE_SEAT_LIST } from "../constants/TicketManagerConstant"

const initialState = {
    ticketOfficeDetail: new TICKETOFFICEDETAIL(),
    listOfSeatsCurrently:[],
    listOfOtherCustomersSeat:[{maGhe:48041}],
    tabActive:"1"
}
const TicketManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKET_OFFICE_LIST:
            return { ...state, ticketOfficeDetail: action.ticketOfficeData }
        case CHOOSE_SEAT:
            const {seat}=action;
            const index =state.listOfSeatsCurrently.findIndex(currentSeat=>currentSeat.maGhe===seat.maGhe);
            return {...state,listOfSeatsCurrently:index===-1?[...state.listOfSeatsCurrently,seat]:[...state.listOfSeatsCurrently].filter(currentSeat=>currentSeat.maGhe!==seat.maGhe)}
        case SET_TAB_ACTIVE:
            return {...state,tabActive:action.tabIndex}
        case RESET_CHOOSE_SEAT_LIST:
            return {...state,listOfSeatsCurrently:[]}
        default: return { ...state }
    }
}
export default TicketManagerReducer;