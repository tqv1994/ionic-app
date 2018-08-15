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

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { HoaDonBanPage } from '../pages/hoa-don-ban/hoa-don-ban';
import { ViewHoaDonBanPage } from '../pages/hoa-don-ban/view-hoa-don-ban';
import { RestProvider } from '../providers/rest/rest';
import { RestUserProvider } from '../providers/rest-user/rest-user';
import { HttpProvider } from '../providers/http/http';
import { HttpAngularProvider } from '../providers/http-angular/http-angular';
import { HttpNativeProvider } from '../providers/http-native/http-native';
import { HoaDonBanProvider } from '../providers/hoa-don-ban/hoa-don-ban';

// đăng locale vi để sử dụng cho CurrencyPipe
registerLocaleData(localeVi);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HoaDonBanPage,
    ViewHoaDonBanPage
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
    HoaDonBanPage,
    ViewHoaDonBanPage
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
    HoaDonBanProvider
  ]
})
export class AppModule {}
