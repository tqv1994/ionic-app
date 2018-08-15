import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import { HttpProvider } from '../http/http';
import {Observable} from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { RestProvider} from './../rest/rest';
import { RestUserProvider } from './../rest-user/rest-user';
import { HoaDonBan } from './../../models/hoa-don-ban';
/*
  Generated class for the HoaDonBanProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HoaDonBanProvider extends RestProvider{

  constructor(public http: HttpProvider, private restUser: RestUserProvider) {
  	super();
    console.log('Hello HoaDonBanProvider Provider');
  }

  private getHeaders():HttpHeaders {
    return new HttpHeaders({
        'Authorization': 'Bearer '+this.restUser.getToken(),
    });
  }

  // GET /v1/hoa-don-ban
    public getAllHoaDonBans(){
        let headers = this.getHeaders();

        return this.http.get(
            this.apiUrl+'hoa-don-ban',null,
            {
                headers: headers
            }
        ).pipe(
        	  map(response => response)
            ,map((response) => {
                return <HoaDonBan[]>response.data;
            })
            ,catchError(this.handleError)
        );
            
    }

    // GET /v1/hoa-don-ban/1
    public getHoaDonBan(id: string,params?:object){
      let headers = this.getHeaders();

        return this.http.get(
            this.apiUrl+'hoa-don-ban/'+id,params,
            {
                headers: headers
            }
        ).pipe(
            map(response => response)
            ,map((response) => {
                return <HoaDonBan>response.data;
            })
            ,catchError(this.handleError)
        );
    }

    private handleError (error: Response | any) {

        let errorMessage:any = {};
        // Connection error
        let errorBody = error.error;
        if(error.status == 0) {
            errorMessage = {
                success: false,
                status: 0,
                data: "Sorry, there was a connection error occurred. Please try again.",
            };
        }
        else {
            errorMessage = errorBody;
        }
        return Observable.throw(errorMessage);
    }

}
