import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestUserProvider } from '../providers/rest-user/rest-user';

import { LoginPage } from '../pages/login/login';
import { HoaDonBanPage } from '../pages/hoa-don-ban/hoa-don-ban';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, restUser: RestUserProvider) {
    if(restUser.isLoggedIn){
      this.rootPage = HoaDonBanPage;
    }
    else{
      this.rootPage =LoginPage;
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

