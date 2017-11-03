import { DataService } from '../../shared/services/data.service';
import { Organization } from '../../interfaces/organization';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NanoValidators } from '../services/nano-validators';
import { ActivatedRoute, Router } from '@angular/router';

const ORG_REGEX = /^([A-Za-z0-9]{6})+[-]+([A-Za-z0-9]{4})/;
const CITY_REGEX = /^([A-Za-z])/;
const BANK_REGEX = /^([0-9]{4})+[-]+([0-9]{4})+[-]+([0-9]{4})+[-]+([0-9]{4})/;

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})

export class OrganizationFormComponent implements OnInit {
  organizationId: number;
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
  constructor (public route: ActivatedRoute, private router: Router, private _dataservice: DataService, private ob: FormBuilder) {

  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.organizationId = +this.route.snapshot.paramMap.get('id');
      this._dataservice.getOrganizationById(this.organizationId).subscribe(
        org => {
          if (org && org.organizationId && org.organizationId === this.organizationId) {
            this.formControls.orgNumber.setValue(org.organizationNumber);
            this.formControls.name.setValue(org.name);
            this.formControls.address.setValue(org.address);
            this.formControls.contactName.setValue(org.contactPersonName);
            this.formControls.contactEmail.setValue(org.contactPersonEmail);
            this.formControls.bankAccount.setValue(org.accountNumber);
            this.formControls.billings.setValue(org.billingInformation);
            this.formControls.description.setValue(org.description);
          }
        }
      );
    }
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
    if (this.organizationId && this.organizationId > 0) {
      this.newOrganization.organizationId = this.organizationId;
      this._dataservice.putOrganization(this.organizationId, JSON.stringify(this.newOrganization)).subscribe(
        response => console.log(response)
      );
    } else {
      this._dataservice.postOrganization(JSON.stringify(this.newOrganization)).subscribe(
        response => console.log(response)
     );
    }
  }

  hardReset(evt): void {
    const form = this.ob.group(
      this.formControls
    );
    if (this.organizationId && this.organizationId > 0) {
      this.router.navigateByUrl('/admin/organizations/view/' + this.organizationId)
    }
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
