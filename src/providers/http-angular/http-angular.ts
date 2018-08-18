import {Injectable} from '@angular/core';
import {Http, RequestOptions, ResponseContentType, URLSearchParams, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpAngularProvider {
    constructor(public http: HttpClient) {}

    public get(url, params?: any, options: any = {}) {
        let requestOptions = options;

        // requestOptions.withCredentials = false;
        if(!requestOptions.headers){
            requestOptions.headers = new HttpHeaders();
        }

        // requestOptions.params = params ? this.createSearchParams(params) : requestOptions.params;
        if(params)
            url = url + '?' + this.JSON_to_URLEncoded(params);
        
        return this.http.get(url,requestOptions).map(resp => <any>resp);
    }

    public post(url, params: any, options: any = {}) {
        let requestOptions = options;
        requestOptions.withCredentials = false;
        if(!requestOptions.headers){
        	requestOptions.headers = new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});
        }
        requestOptions.headers.set("Content-Type","application/x-www-form-urlencoded");
        // console.log(requestOptions.headers.get('Content-Type'));
        // requestOptions.headers.append("Access-Control-Allow-Credentials",'false');
        let body = this.JSON_to_URLEncoded(params);

        return this.http.post(url, body, requestOptions).map(resp => <any>resp);
    }

    private createSearchParams(params: any) {
        let searchParams = new URLSearchParams();
        for (let k in params) {
            if (params.hasOwnProperty(k)) {
                searchParams.set(k, params[k]);
            }
        }

        return searchParams;
    }

    private JSON_to_URLEncoded(element,key = null,list = null){
	  var list = list || [];
	  if(typeof(element)=='object'){
	    for (var idx in element)
	      this.JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
	  } else {
	    list.push(key+'='+encodeURIComponent(element));
	  }
	  return list.join('&');
	}
}