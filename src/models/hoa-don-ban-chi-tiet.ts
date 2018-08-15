export class HoaDonBanChiTiet{
    hoa_don_ban_chi_tiet_id: number = 0;
    hoa_don_ban_id: string = '';
    kho_id: number = 0;
    ma_kho: string = '';
    ten_kho: string = '';
    doi_tuong_id: number = 0;
    ma_doi_tuong : string = '';
    ten_doi_tuong: string = '';
    hang_id: number = 0;
    ma_hang: string = '';
    ten_hang: string = '';
    dvt_id: number = 0;
    ten_dvt: string = '';
    so_luong: number = 0;
    don_gia: number = 0;
    tien_hang: number = 0;
    giam_gia: number = 0;
    tien_giam_gia: number = 0;
    thanh_tien: number = 0;
    diem_thuong: number = 0;
    ghi_chu: string = '';
    ngay_tao: string = '';
    nguoi_tao: string = '';
    ngay_sua: string = '';
    nguoi_sua: string = '';
    so_seri: string = '';
    trang_thai_so_seri: string = '';
    han_su_dung: string = '';
    so_lo: string = '';
    tong_tien_nhap: number = 0;
    tong_so_luong_nhap: number = 0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}