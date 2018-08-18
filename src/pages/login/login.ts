import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestUserProvider } from '../../providers/rest-user/rest-user';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HomePage } from '../home/home';
import { HoaDonBanPage } from '../hoa-don-ban/hoa-don-ban';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	private _formErrors:any;
  constructor(public navCtrl: NavController, 
  		private _restUserProvider: RestUserProvider,
  		private _formBuilder:FormBuilder) {
  		this._resetFormErrors();
  		this._loginForm = _formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });
        this._loginForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
  }

  	private _loginForm:FormGroup;
    
    private _submitted:boolean = false;
    private _errorMessage:string = '';

    private _setFormErrors(errorFields:any):void{
        for (let key in errorFields) {
            // skip loop if the property is from prototype
            if (!errorFields.hasOwnProperty(key)) continue;

            let message = typeof errorFields[key] == "object" ? errorFields[key][0] : errorFields[key];
            this._formErrors[key].valid = false;
            this._formErrors[key].message = message;
        }
    }

    private _resetFormErrors():void{
        this._formErrors = {
            username: {valid: true, message: ''},
            password: {valid: true, message: ''},
        };
    }

    private _isValid(field):boolean {
        let isValid:boolean = false;

        // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
        if(this._loginForm.controls[field].touched == false) {
            isValid = true;
        }
        // If the field is touched and valid value, then it is considered as valid.
        else if(this._loginForm.controls[field].touched == true && this._loginForm.controls[field].valid == true) {
            isValid = true;
        }
        return isValid;
    }

    public onValueChanged(data?: any) {
        if (!this._loginForm) { return; }
        const form = this._loginForm;
        for (let field in this._formErrors) {
            // clear previous error message (if any)
            let control = form.get(field);
            if (control && control.dirty) {
                this._formErrors[field].valid = true;
                this._formErrors[field].message = '';
            }
        }
    }

    public onSubmit(elementValues: any) {
        this._submitted = true;
        this._restUserProvider.login(elementValues.username, elementValues.password)
            .subscribe(
                result => {
                    if(result.success) {

                        this.navCtrl.push(HoaDonBanPage);
                    } else {
                        this._errorMessage = 'Username or password is incorrect.';
                        this._submitted = false;
                    }
                },
                error=>{
                    this._submitted = false;
                    console.log(error);
                    // Validation error
                    if(error.status == 422) {
                        this._resetFormErrors();
                        // this._errorMessage = "There was an error on submission. Please check again.";
                        let errorFields = JSON.parse(error.data.message);
                        this._setFormErrors(errorFields);
                    } else {
                        this._errorMessage = error.data;
                    }
                }
                    
            )
                
    }

}
