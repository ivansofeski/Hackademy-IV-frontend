import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {

  formControls = {
    name:           new FormControl('', [ Validators.required]),
    
    orgNumber:      new FormControl('', [ Validators.required]),

    contact:        new FormControl('',  [Validators.required]),

    contactEmail:   new FormControl('', [ Validators.required, Validators.pattern(EMAIL_REGEX)]),

    adress:         new FormControl('', [ Validators.required]),

    city:           new FormControl('', [Validators.required]),

    zipCode:        new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),

    description:    new FormControl('', [Validators.required]),

    password:       new FormControl('', [ Validators.required]),

    repeatPassword: new FormControl('', [ Validators.required]),
  };

  rePassValid: boolean = false;


  checkPasswordFields(): void {
    if (this.formControls.hasOwnProperty('password') && this.formControls.hasOwnProperty('repeatPassword')) {

      let _password = this.formControls['password'];
      let _repassword = this.formControls['repeatPassword'];

      let _pass = _password.value.trim();
      let _repass = _repassword.value.trim();

      // console.log("Input validated: " + this.rePassValid);
      this.rePassValid = _pass === _repass ? true : false;
      console.log("Input validated: " + this.rePassValid);
    }
  }
  constructor() { }

  ngOnInit() {

  }

}
