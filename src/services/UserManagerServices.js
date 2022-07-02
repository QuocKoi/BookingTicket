import { GROUPID } from "../util/settings/config";
import { BaseServices } from "./BaseServices";

class USERMANAGERSERVICES extends BaseServices{
    login(userData){
        return this.post('api/QuanLyNguoiDung/DangNhap',userData)
    }
    register(account){
        return this.post('api/QuanLyNguoiDung/DangKy',account)
    }
    fetchUserNameDetail(){
        return this.post('api/QuanLyNguoiDung/ThongTinTaiKhoan')
    }
    fetchUsersList=(name)=>{
        if(name==''){
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
        }
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${name}`)
    }
    deleteAccount(account){
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`)
    }
    searchUser(word){
        return this.get(`api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${word}`)
    }
    updateUserInfor(userInfor){
        return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,userInfor)
    }
    addUser(userInfor){
        return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`,userInfor)
    }
    updataPersonalInfor(personalInfor){
        return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,personalInfor)
    }
}
export const userManagerServices=new USERMANAGERSERVICES()