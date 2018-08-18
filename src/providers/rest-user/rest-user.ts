import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import {Observable} from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { RestProvider} from './../rest/rest';
import {tokenNotExpired} from 'angular2-jwt';
import { LoginPage } from '../../pages/login/login';
/*
  Generated class for the RestUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestUserProvider extends RestProvider {

	  constructor( public http: HttpProvider) {
	    super();
	    this.loggedIn = this.isLoggedIn();
	  }

  	private loggedIn = false;

  	public redirectURL = '';

  	public login(username, password) {
        return this.http.post(this.apiUrl+'user/login',{"LoginForm":{ "username": username,"password": password}},{}).pipe(
            map(res=>res),map(res=>{
              if (res.success) {
                    localStorage.setItem('backend-token', res.data.access_token);
                    this.loggedIn = true;
                } else {
                    localStorage.removeItem('backend-token');
                    this.loggedIn = false;
                }
                return res;
            }),catchError(this.handleError)
          );
  	}

  	public getToken(): any {
        return localStorage.getItem('backend-token');
    }

    private checkToken(): any {
        return !!localStorage.getItem('backend-token');
    }

  	public isLoggedIn(): boolean {
        return tokenNotExpired('backend-token');
    }

    public logout(): void {
        localStorage.removeItem('backend-token');
        this.loggedIn = false;
    }

    public unauthorizedAccess(error: any): void {
        this.logout();
    }

    

    private handleError(error: Response | any) {
        let errorMessage: any = {};
        // Connection error
        let errorBody = JSON.parse(error._body);
        if (errorBody.status == 0) {
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
