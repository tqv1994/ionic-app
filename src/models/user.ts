export class User{
   nguoi_dung_id: number = 0;
   nhan_vien_id: number = 0;
   ten_dang_nhap: string = "";
   mat_khau: string = "";
   quyen: string = "";
   danh_sach_quyen: string = "";
   ghi_chu: string = "";
   ngay_tao: string = "";
   nguoi_tao: string = "";
   ngay_sua: string = "";
   nguoi_sua: string = "";
   kho_id: string = "";

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}