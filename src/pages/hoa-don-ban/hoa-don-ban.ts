import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { RestUserProvider } from '../../providers/rest-user/rest-user';
import { HoaDonBanProvider } from '../../providers/hoa-don-ban/hoa-don-ban';
import { HoaDonBan } from '../../models/hoa-don-ban';
import { ViewHoaDonBanPage } from './view-hoa-don-ban';
/**
 * Generated class for the HoaDonBanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hoa-don-ban',
  templateUrl: 'hoa-don-ban.html',
})
export class HoaDonBanPage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private hoaDonBanProvider: HoaDonBanProvider,
  	private restUserProvider: RestUserProvider,
    public modalCtrl: ModalController) {
  }

  private _hoaDonBans: HoaDonBan[];
  private _errorMessage : string = '';
  private _columns = [
    {name:'Số HĐ',prop:'hoa_don_ban_id'},
    {name: 'Ngày',prop: 'ngay'},
    {name: 'Tổng tiền',prop:'tong_gia_tri'},
    {name: 'Tên khách',prop:'ten_doi_tuong'},
    {name: 'Địa chỉ',prop:'dia_chi'},
    {name: 'Điện thoại',prop:'dien_thoai'},
    {name: 'Người bán',prop:'ten_nhan_vien'}
  ];
  private _rows = [];


  ionViewDidLoad() {
    console.log('ionViewDidLoad HoaDonBanPage');
    this.getHoaDonBans();
  }
  public onEventTable(event){
    console.log(event);
    if(event.type == "click"){
      this.viewDetail(event.row);
    }
  }

  public getHoaDonBans(){
  	this._hoaDonBans = null;
  	this.hoaDonBanProvider.getAllHoaDonBans().subscribe(res=>{
  		this._hoaDonBans = <HoaDonBan[]>res;
      for (let i in this._hoaDonBans) {
        let hoaDonBan = this._hoaDonBans[i];
        this._rows.push({hoa_don_ban_id: hoaDonBan.hoa_don_ban_id,
            ngay: hoaDonBan.ngay,
            tong_gia_tri: (new CurrencyPipe('vi')).transform( hoaDonBan.tong_gia_tri,'đ'),
            ten_doi_tuong: hoaDonBan.ten_doi_tuong,
            dia_chi: hoaDonBan.dia_chi,
            dien_thoai: hoaDonBan.dien_thoai,
            ten_nhan_vien: hoaDonBan.ten_nhan_vien
          });
      }
  	},error=>{
  		// unauthorized access
        if(error.status == 401 || error.status == 403) {
            console.log(error.status);
            this.restUserProvider.unauthorizedAccess(error);
            this.navCtrl.push(LoginPage);
        } else {
            this._errorMessage = error.data.message;
        }
  	})
  }

  public viewDetail(hoaDonBan: HoaDonBan){
    let modal = this.modalCtrl.create(ViewHoaDonBanPage,hoaDonBan);
    modal.present();
  }

}
