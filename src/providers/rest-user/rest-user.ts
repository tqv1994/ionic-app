import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import {Observable} from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { RestProvider} from './../rest/rest';
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
        return this.http.post(this.apiUrl+'user/login',{"LoginForm":{ "username": username,"password": password}}).pipe(
            map(res=>JSON.parse(res._body)),catchError(this.handleError)
          );
  	}

  	public getToken(): any {
        //return localStorage.getItem('backend-token');
    }

    private checkToken(): any {
        //return !!localStorage.getItem('backend-token');
    }

  	public isLoggedIn(): boolean {
  		return false;
        //return tokenNotExpired('backend-token');
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
