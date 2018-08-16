export class HangTonDauKy{
    hang_ton_dau_ky_id: number = 0;
    kho_id: number = 0;
    ma_kho: string = '';
    ten_kho: string = '';
    doi_tuong_id: number = 0;
    ma_doi_tuong: string = '';
    ten_doi_tuong: string = '';
    loai_hang_id: number = 0;
    ten_loai_hang: string = '';
    hang_id: number = 0;
    ma_hang: string = '';
    ten_hang: string = '';
    dvt_id: number = 0;
    ten_dvt: string = '';
    so_luong_dau_ky: number=0;
    so_luong: number=0;
    gia_goc: number=0;
    gia_goc_ck: number=0;
    gia_goc_km_ck: number=0;
    gia_truoc_thue: number=0;
    gia_truoc_thue_ck: number=0;
    gia_thuc_nhap: number=0;
    gia_ban_buon: number=0;
    gia_ban_le: number=0;
    diem_thang: number=0;
    diem_quy: number=0;
    diem_thuong: number=0;
    ten_biet_duoc: string = '';
    hoat_chat: string = '';
    thanh_phan: string = '';
    nha_san_xuat: string = '';
    quy_cach: string = '';
    so_luong_toi_thieu: number=0;
    trang_thai: boolean = false;
    ghi_chu: string = '';
    ngay_tao: string = '';
    nguoi_tao: string = '';
    ngay_sua: string = '';
    nguoi_sua: string = '';
    hsd_toi_thieu: number = 0;
    mau_sac: number = 0;
    hsd_muc_xanh: number = 0;
    hsd_muc_vang: number = 0;
    hsd_muc_do: number = 0;
    tong_tien: number=0;
    tong_so_luong: number=0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}