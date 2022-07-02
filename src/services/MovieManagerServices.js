import { GROUPID } from "../util/settings/config";
import { BaseServices } from "./BaseServices";

class MovieManagerServices extends BaseServices{
    fetchBannerList(){
        return this.get('api/QuanLyPhim/LayDanhSachBanner')
    }
    fetchFilmList(filmName=""){
        if(filmName!=''){
            return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${filmName}`)
        }else{
            return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
        }
        
    }
    fetchFilmInfor(filmId){
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${filmId}`)
    }
    addFilm(data){
        return this.post('api/QuanLyPhim/ThemPhimUploadHinh',data)
    }
    updateFilm(data){
        return this.post('api/QuanLyPhim/CapNhatPhimUpload',data)
    }
    deleteFilm(filmId){
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${filmId}`)
    }
}
export const movieManagerServices=new MovieManagerServices()