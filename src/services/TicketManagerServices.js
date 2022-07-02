import { BaseServices } from "./BaseServices";

class TICKETMANAGERSERVICES extends BaseServices{
    fetchTicketOfficeList(filmCalendarId){
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${filmCalendarId}`)
    }
    bookTickets(ticket){
        return this.post(`api/QuanLyDatVe/DatVe`,ticket)
    }
    createFilmCalendar(data){
        return this.post(`api/QuanLyDatVe/TaoLichChieu`,data)
    }
}
export const ticketManagerServices=new TICKETMANAGERSERVICES()