export class CREATEFILMCALENDAR{
    constructor(filmId,dateTime,cinemaId,cost){
        this.maPhim= filmId;
        this.ngayChieuGioChieu= dateTime;
        this.maRap= cinemaId;
        this.giaVe= cost;
    }
}