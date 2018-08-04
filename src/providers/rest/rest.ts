import { Injectable } from '@angular/core';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor() {
    
  }

  public apiUrl = "http://bh.absoft.com.vn/backend/web/index.php?r=v1/";

}
