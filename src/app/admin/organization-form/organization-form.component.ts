import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Organization } from '../interface/organization';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})

export class OrganizationFormComponent implements OnInit {
  newOrg: Organization = {
    id: 0,
    orgId: '',
    name: '',
    address: '',
    contact: {
      person: '',
      phone: '',
      email: ''
    },
    password: '',
    billing: '',
    description: ''
  };

  email_regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  formControls: Object = {
    name: new FormControl('', [
      Validators.required]),
    orgNumber: new FormControl('', [
      Validators.required]),

    contact: new FormControl('', [
      Validators.required]),

    contactEmail: new FormControl('', [
      Validators.required,
      Validators.pattern(this.email_regex)]),

    adress: new FormControl('', [
      Validators.required]),

    city: new FormControl('', [
      Validators.required,
      Validators.pattern(this.email_regex)]),

    zipCode: new FormControl('', [
      Validators.required]),

    description: new FormControl('', [
      Validators.required]),

    password: new FormControl('', [
      Validators.required]),

    repeatPassword: new FormControl('', [
      Validators.required]),
  };

  submitOrganization(): void {
    const inputs = Array.from(document.querySelectorAll('.organization-form input:not([type="hidden"])'));

    if (inputs !== undefined && inputs.length > 0) {
      for (const input of inputs) {
        const _key = input['name'];

        switch (_key) {
          case 'contactName':
            this.newOrg.contact.person = input['value'];
            break;
          case 'contactEmail':
            this.newOrg.contact.email = input['value'];
            this.newOrg.contact.phone = '014123922';
            break;
          case 'address':
          case 'postalCode':
            this.newOrg.address += input['value'] + ', ';
            break;
          case 'city':
            this.newOrg.address += input['value'];
            break;
          case 'repassword':
            break;
          default:
            this.newOrg[_key] = input['value'];
            break;
        }
      }

      console.log(this.newOrg);
    }
  }

  constructor() { }

  ngOnInit() {

  }

}
