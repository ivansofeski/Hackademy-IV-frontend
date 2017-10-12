import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const ORG_REGEX = /^([A-Za-z0-9]{6})+[-]+([A-Za-z0-9]{4})/;
const CITY_REGEX = /^([A-Za-z])/;
const BANK_REGEX = /^([0-9]{4})+[-]+([0-9]{4})+[-]+([0-9]{4})+[-]+([0-9]{4})/;

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})

export class OrganizationFormComponent implements OnInit {

  formControls = {

    orgNumber: new FormControl('', [Validators.required, Validators.pattern(ORG_REGEX)]),

    name: new FormControl('', [Validators.required]),

    address: new FormControl('', [Validators.required]),

    contactName: new FormControl('', [Validators.required]),

    contactPhone: new FormControl('', [Validators.required]),

    contactEmail: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),

    bankAccount: new FormControl('', [Validators.required, Validators.pattern(BANK_REGEX)]),

    city: new FormControl('', [Validators.required, Validators.pattern(CITY_REGEX)]),

    zipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),

    description: new FormControl('', [Validators.required])
  };

  ngOnInit() {
  }
}
