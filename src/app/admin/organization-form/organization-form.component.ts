import { DataService } from '../../shared/services/data.service';
import { Organization } from '../../interfaces/organization';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NanoValidators } from '../services/nano-validators';

const ORG_REGEX = /^([A-Za-z0-9]{6})+[-]+([A-Za-z0-9]{4})/;
const CITY_REGEX = /^([A-Za-z])/;
const BANK_REGEX = /^([0-9]{4})+[-]+([0-9]{4})+[-]+([0-9]{4})+[-]+([0-9]{4})/;

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})

export class OrganizationFormComponent implements OnInit {
  newOrganization: Organization;
  formControls = {
    orgNumber:    new FormControl('', [NanoValidators.required, Validators.pattern(ORG_REGEX)]),
    name:         new FormControl('', [NanoValidators.required]),
    address:      new FormControl('', [NanoValidators.required]),
    contactName:  new FormControl('', [NanoValidators.required]),
    contactEmail: new FormControl('', [NanoValidators.required, Validators.email]),
    bankAccount:  new FormControl('', [NanoValidators.required, Validators.pattern(BANK_REGEX)]),
    billings:      new FormControl('', [NanoValidators.required]),
    description:  new FormControl('', [NanoValidators.required])
  };
  constructor (private _dataservice: DataService, private ob: FormBuilder) {

  }

  ngOnInit() {
  }


  onSubmit() {
    this.newOrganization = {
      organizationNumber:   this.formControls.orgNumber.value,
      name:                 this.formControls.name.value,
      address:              this.formControls.address.value,
      contactPersonName:    this.formControls.contactName.value,
      contactPersonEmail:   this.formControls.contactEmail.value,
      accountNumber:        this.formControls.bankAccount.value,
      billingInformation:   this.formControls.billings.value,
      description:          this.formControls.description.value
    };

    this._dataservice.postOrganization(JSON.stringify(this.newOrganization)).subscribe(
      response => console.log(response)
   );
  }
  
  hardReset(evt): void {
    const form = this.ob.group(
      this.formControls
    );

    if (form !== undefined) {
      for (const name in form.controls) {
        if (form.controls.hasOwnProperty(name)) {
          form.controls[name].setValue(null);
          form.controls[name].setErrors(null);
        }
      }
    }
  }
}
