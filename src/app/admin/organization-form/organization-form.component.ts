import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidatorFn, FormBuilder, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const ORG_REGEX = /^([A-Za-z0-9]{6})+[-]+([A-Za-z0-9]{4})/;
@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {

  formControls = {
    name: new FormControl('', [Validators.required]),
    orgNumber: new FormControl('', [Validators.required,Validators.pattern(ORG_REGEX)]),
    contact: new FormControl('', [Validators.required]),
    contactEmail: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
    adress: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
    description: new FormControl('', [Validators.required])
  };

  ngOnInit() {
  }

}
