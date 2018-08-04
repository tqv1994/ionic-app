import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
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
        return this.http.post(this.apiUrl+'user/login',{"LoginForm":{ "username": username,"password": password}});
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
        if (error.status == 0) {
            errorMessage = {
                success: false,
                status: 0,
                data: "Sorry, there was a connection error occurred. Please try again.",
            };
        }
        else {
            errorMessage = error;
        }
        return errorMessage;
    }

}
