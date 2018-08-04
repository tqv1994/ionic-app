import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpNativeProvider {
    constructor(public http: HTTP) {}

    public get(url, params?: any, options: any = {}) {
        let responseData = this.http.get(url, params, {})
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return Observable.fromPromise(responseData);
    }

    public post(url, params?: any, options: any = {}) {
        let responseData = this.http.post(url, this.JSON_to_URLEncoded(params), {})
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return Observable.fromPromise(responseData);
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