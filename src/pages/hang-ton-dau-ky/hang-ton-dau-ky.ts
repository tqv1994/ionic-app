import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { RestUserProvider } from '../../providers/rest-user/rest-user';
import { HangTonDauKyProvider } from '../../providers/hang-ton-dau-ky/hang-ton-dau-ky';
import { HangTonDauKy } from '../../models/hang-ton-dau-ky';
/**
 * Generated class for the HangTonDauKyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hang-ton-dau-ky',
  templateUrl: 'hang-ton-dau-ky.html',
})
export class HangTonDauKyPage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private hangTonDauKyProvider: HangTonDauKyProvider,
  	private restUserProvider: RestUserProvider,
    public modalCtrl: ModalController) {
  }

  private _hangTonDauKys: HangTonDauKy[];
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
    sort: ''
  }


  ionViewDidLoad() {
    this._customTable.columns = [
      {name:'Mã kho',prop:'ma_kho'},
      {name: 'Loại hàng',prop: 'ten_loai_hang'},
      {name: 'Mã hàng',prop:'ma_hang'},
      {name: 'Đvt',prop:'ten_dvt'},
      {name: 'Giá bán buôn',prop:'gia_ban_buon'},
      {name: 'Giá bán lẻ',prop:'gia_ban_le'}
    ];
    for (let i in this._customTable.columns) {
      let column = this._customTable.columns[i];
      this._customTable.sorts.push({
        prop: column.prop,
        dir: '',
      });
    }
    this.getHangTonDauKys();
  }
  public onEventTable(event){
    
  }

  public onChangePageTable(event){
    this._dataParams.page = event.offset + 1;
    this.getHangTonDauKys();
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
     this.getHangTonDauKys();
  }

  public getHangTonDauKys(){
    this._customTable.rows = [];
  	this._hangTonDauKys = null;
  	this.hangTonDauKyProvider.getAllHangTonDauKys(this._dataParams).subscribe(res=>{
      console.log(res);
  		this._hangTonDauKys = <HangTonDauKy[]>res.data;
      for (let i in this._hangTonDauKys) {
        let hangTonDauKy = this._hangTonDauKys[i];
        this._customTable.rows.push({ma_kho: hangTonDauKy.ma_kho,
            ten_loai_hang: hangTonDauKy.ten_loai_hang,
            ma_hang: hangTonDauKy.ma_hang,
            ten_dvt: hangTonDauKy.ten_dvt,
            gia_ban_buon: (new CurrencyPipe('vi')).transform( hangTonDauKy.gia_ban_buon,'đ'),
            gia_ban_le: (new CurrencyPipe('vi')).transform( hangTonDauKy.gia_ban_le,'đ'),
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

  

}
