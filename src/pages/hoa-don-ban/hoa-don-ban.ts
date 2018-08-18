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

  private _customTable = {
    columns: <{name: string, prop: string}[]>[],
    rows:[],
    currentPage: <number>0,
    pageCount: <number>0,
    perPage: <number>0,
    totalCount: <number>0,
    offset:<number>0,
    sorts: <{prop:string,dir: string}[]>[]
  }
  private _dataParams = {
    page:1,
    sort: '-ngay'
  }

  ionViewDidLoad() {
    this._customTable.columns = [
      {name:'Số HĐ',prop:'hoa_don_ban_id'},
      {name: 'Ngày',prop: 'ngay'},
      {name: 'Tổng tiền',prop:'tong_gia_tri'},
      {name: 'Tên khách',prop:'ten_doi_tuong'},
      {name: 'Địa chỉ',prop:'dia_chi'},
      {name: 'Điện thoại',prop:'dien_thoai'},
      {name: 'Người bán',prop:'ten_nhan_vien'}
    ];
    for (let i in this._customTable.columns) {
      let column = this._customTable.columns[i];
      this._customTable.sorts.push({
        prop: column.prop,
        dir: '',
      });
    }
    this.getHoaDonBans();
  }
  public onEventTable(event){
    if(event.type == "click"){
      this.viewDetail(event.row);
    }
  }

  public onChangePageTable(event){
    this._dataParams.page = event.offset + 1;
    this.getHoaDonBans();
  }

  public onSortTable(event){
    let columnSorted = this._customTable.sorts.find(item=>{
      return item.prop == event.column.prop;
    });
    if(columnSorted){

      columnSorted.dir = event.newValue;
      console.log(this._customTable.sorts);
    }
     if(event.newValue == 'asc'){
       this._dataParams.sort = event.column.prop;
     }else{
       this._dataParams.sort = '-'+event.column.prop;
     }
     this.getHoaDonBans();
  }

  public getHoaDonBans(){
    this._customTable.rows = [];
  	this._hoaDonBans = null;
  	this.hoaDonBanProvider.getAllHoaDonBans(this._dataParams).subscribe(res=>{
  		this._hoaDonBans = <HoaDonBan[]>res.data;
      console.log(res);
      for (let i in this._hoaDonBans) {
        let hoaDonBan = this._hoaDonBans[i];
        this._customTable.rows.push({hoa_don_ban_id: hoaDonBan.hoa_don_ban_id,
            ngay: hoaDonBan.ngay,
            tong_gia_tri: (new CurrencyPipe('vi')).transform( hoaDonBan.tong_gia_tri,'đ'),
            ten_doi_tuong: hoaDonBan.ten_doi_tuong,
            dia_chi: hoaDonBan.dia_chi,
            dien_thoai: hoaDonBan.dien_thoai,
            ten_nhan_vien: hoaDonBan.ten_nhan_vien
          });
        this._customTable.currentPage = res.currentPage;
        this._customTable.pageCount = res.pageCount;
        this._customTable.perPage = res.perPage;
        this._customTable.totalCount = res.totalCount;
        this._customTable.offset = this._dataParams.page ? this._dataParams.page - 1 :0;
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
