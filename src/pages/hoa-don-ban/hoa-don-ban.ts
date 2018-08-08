import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  selector: 'page-hoa-don-ban',
  templateUrl: 'hoa-don-ban.html',
})
export class HoaDonBanPage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private hoaDonBanProvider: HoaDonBanProvider,
  	private restUserProvider: RestUserProvider) {
  }

  private _hoaDonBans: HoaDonBan[];
  private _errorMessage : string = '';

  ionViewDidLoad() {
    console.log('ionViewDidLoad HoaDonBanPage');
    this.getHoaDonBans();
  }

  public getHoaDonBans(){
  	this._hoaDonBans = null;
  	this.hoaDonBanProvider.getAllProjects().subscribe(res=>{
  		this._hoaDonBans = res
  	},error=>{
  		// unauthorized access
        if(error.status == 401 || error.status == 403) {
            this.restUserProvider.unauthorizedAccess(error);
        } else {
            this._errorMessage = error.data.message;
        }
  	})
  }

}
