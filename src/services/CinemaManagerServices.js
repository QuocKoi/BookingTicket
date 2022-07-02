import { GROUPID } from "../util/settings/config";
import { BaseServices } from "./BaseServices";

class CinemaManagerServices extends BaseServices{
    fetchMoviesCalendarInCinema(){
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }
    fetchCinemaInfor(){
        return this.get(`api/QuanLyRap/LayThongTinHeThongRap`)
    }
    fetchFilmCalendarDetail(filmId){
        return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${filmId}`)
    }
    fetchCinemaInforFollowSystem(cinemaSystemId){
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinemaSystemId}`)
    }
}

export const cinemaManagerServices=new CinemaManagerServices()