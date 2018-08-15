import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { RestUserProvider } from '../../providers/rest-user/rest-user';
import { HoaDonBanProvider } from '../../providers/hoa-don-ban/hoa-don-ban';
import { HoaDonBan } from '../../models/hoa-don-ban';
/**
 * Generated class for the HoaDonBanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-hoa-don-ban',
  templateUrl: 'view-hoa-don-ban.html',
})
export class ViewHoaDonBanPage {

  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private _hoaDonBanProvider: HoaDonBanProvider) {
    this._hoaDonBanProvider.getHoaDonBan(this.params.data.hoa_don_ban_id,{expand:'hoaDonBanChiTiets'}).subscribe(hoaDonBan=>{
      this._hoaDonBan = hoaDonBan;
      for (let i in this._hoaDonBan.hoaDonBanChiTiets) {
        let hoaDonBanChiTiet = this._hoaDonBan.hoaDonBanChiTiets[i];
        this._rows.push({
          ma_hang: hoaDonBanChiTiet.ma_hang,
          ten_hang: hoaDonBanChiTiet.ten_hang,
          ten_dvt: hoaDonBanChiTiet.ten_dvt,
          so_luong: hoaDonBanChiTiet.so_luong,
          don_gia: (new CurrencyPipe('vi')).transform( hoaDonBanChiTiet.don_gia,'đ'),
          giam_gia: hoaDonBanChiTiet.giam_gia,
          thanh_tien: (new CurrencyPipe('vi')).transform( hoaDonBanChiTiet.thanh_tien,'đ'),
          so_seri: hoaDonBanChiTiet.so_seri
        });
      }
    })
    
  }

  private _columns = [
    {name:'Mã hàng',prop:'ma_hang'},
    {name: 'Tên hàng',prop: 'ten_hang'},
    {name: 'Tên ĐVT',prop: 'ten_dvt'},
    {name: 'Số lượng',prop:'so_luong'},
    {name: 'Đơn giá',prop:'don_gia'},
    {name: 'Giảm giá',prop:'giam_gia'},
    {name: 'Thành tiền',prop:'thanh_tien'},
    {name: 'Số seri',prop:'so_seri'}
  ];
  private _rows = [];

  private _hoaDonBan: HoaDonBan = new HoaDonBan();
  private _errorMessage : string = '';
  


  ionViewDidLoad() {
    console.log('ionViewDidLoad HoaDonBanPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  

}
