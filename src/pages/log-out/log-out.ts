import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestUserProvider } from '../../providers/rest-user/rest-user';
import { LoginPage } from '../login/login';
/**
 * Generated class for the LogOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-log-out',
  template: '<strong>Logging out...</strong>'
})
export class LogOutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private restUser: RestUserProvider) {
  	this.restUser.logout();
  	this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogOutPage');
  }

}
