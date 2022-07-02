import { GROUPID } from "../../util/settings/config";
import { USERNAME } from "./USERNAME";

export class REGISTER extends USERNAME{
    constructor(){
        super();
    }
    setValues(_taiKhoan, _matKhau, _email, _soDt, _hoTen) {
        this.taiKhoan = _taiKhoan;
        this.matKhau = _matKhau;
        this.email = _email;
        this.maNhom = GROUPID;
        this.hoTen = _hoTen;
        this.soDT = _soDt;
    }

}