import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  formControls = {

    orgNumber: new FormControl('', [NanoValidators.required, Validators.pattern(ORG_REGEX)]),

    name: new FormControl('', [NanoValidators.required]),

    address: new FormControl('', [NanoValidators.required]),

    contactName: new FormControl('', [NanoValidators.required]),

    contactPhone: new FormControl('', [NanoValidators.required]),

    contactEmail: new FormControl('', [NanoValidators.required, Validators.email]),

    bankAccount: new FormControl('', [NanoValidators.required, Validators.pattern(BANK_REGEX)]),

    city: new FormControl('', [NanoValidators.required, Validators.pattern(CITY_REGEX)]),

    zipCode: new FormControl('', [NanoValidators.required, Validators.pattern('[0-9]{5}')]),

    description: new FormControl('', [NanoValidators.required])
  };

  ngOnInit() {
  }
}
