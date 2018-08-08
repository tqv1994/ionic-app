import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule, XHRBackend, RequestOptions, Http} from '@angular/http';
import {HttpInterceptor} from '../auth/http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthModule } from './auth.module';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {Storage, IonicStorageModule} from '@ionic/storage';
import {HTTP} from '@ionic-native/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { HoaDonBanPage } from '../pages/hoa-don-ban/hoa-don-ban';
import { RestProvider } from '../providers/rest/rest';
import { RestUserProvider } from '../providers/rest-user/rest-user';
import { HttpProvider } from '../providers/http/http';
import { HttpAngularProvider } from '../providers/http-angular/http-angular';
import { HttpNativeProvider } from '../providers/http-native/http-native';
import { HoaDonBanProvider } from '../providers/hoa-don-ban/hoa-don-ban';

// export function httpInterceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, storage: Storage) {
//   return new HttpInterceptor(xhrBackend, requestOptions, storage);
// }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HoaDonBanPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    HoaDonBanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
   /* {
      provide: Http,
      useFactory: httpInterceptorFactory,
      deps: [XHRBackend, RequestOptions, Storage]
    },*/
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
