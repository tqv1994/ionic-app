import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule, XHRBackend, RequestOptions, Http} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthModule } from './auth.module';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClientModule } from '@angular/common/http';
import {Storage, IonicStorageModule} from '@ionic/storage';
import {HTTP} from '@ionic-native/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// /import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LogOutPage } from '../pages/log-out/log-out';
import { HoaDonBanPage } from '../pages/hoa-don-ban/hoa-don-ban';
import { ViewHoaDonBanPage } from '../pages/hoa-don-ban/view-hoa-don-ban';
import { HangTonDauKyPage } from '../pages/hang-ton-dau-ky/hang-ton-dau-ky';
import { RestProvider } from '../providers/rest/rest';
import { RestUserProvider } from '../providers/rest-user/rest-user';
import { HttpProvider } from '../providers/http/http';
import { HttpAngularProvider } from '../providers/http-angular/http-angular';
import { HttpNativeProvider } from '../providers/http-native/http-native';
import { HoaDonBanProvider } from '../providers/hoa-don-ban/hoa-don-ban';
import { HangTonDauKyProvider } from '../providers/hang-ton-dau-ky/hang-ton-dau-ky';

// đăng ký locale vi để sử dụng cho CurrencyPipe
registerLocaleData(localeVi);

// class CameraMock extends Camera {
//   getPicture(options) {
//     return new Promise((resolve, reject) => {
//       resolve("BASE_64_ENCODED_DATA_GOES_HERE");
//     })
//   }
// }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LogOutPage,
    HoaDonBanPage,
    ViewHoaDonBanPage,
    HangTonDauKyPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    NgxDatatableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LogOutPage,
    HoaDonBanPage,
    ViewHoaDonBanPage,
    HangTonDauKyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    RestUserProvider,
    HttpProvider,
    HttpAngularProvider,
    HttpNativeProvider,
    HoaDonBanProvider,
    HangTonDauKyProvider,
    // { provide: Camera, useClass: CameraMock }
  ]
})
export class AppModule {}
