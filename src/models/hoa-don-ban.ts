import { HoaDonBanChiTiet } from './hoa-don-ban-chi-tiet';
export class HoaDonBan{
    hoa_don_ban_id: string = "";
    ngay: string = "";
    doi_tuong_id: number = 0;
    ma_doi_tuong: string = "";
    ten_doi_tuong: string = "";
    dia_chi: string = "";
    dien_thoai: string = "";
    ma_so_thue: string = "";
    tien_chiet_khau: number = 0;
    tong_gia_tri: number = 0;
    tien_thuc_tra: number = 0;
    trang_thai: boolean = false;
    kieu: number = 0;
    ghi_chu: string = "";
    nhan_vien_id: number = 0;
    ma_nhan_vien: string = "";
    ten_nhan_vien: string = "";
    hinh_thuc_ban_hang: number = 0;
    ngay_tao: string = "";
    nguoi_tao: string = "";
    ngay_sua: string = "";
    nguoi_sua: string = "";
    chuyen_khoan: number = 0;
    ban_id: number = 0;
    trang_thai_cho: boolean = false;
    hoaDonBanChiTiets: HoaDonBanChiTiet[] = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}