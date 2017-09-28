import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {

  formControls: Object = {
    name: new FormControl('', [
      Validators.required]),
    orgNumber: new FormControl('', [
      Validators.required]),

    contact: new FormControl('', [
      Validators.required]),

    contactEmail: new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)]),

    adress: new FormControl('', [
      Validators.required]),

    city: new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)]),

    zipCode: new FormControl('', [
      Validators.required]),

    description: new FormControl('', [
      Validators.required]),

    password: new FormControl('', [
      Validators.required]),

    repeatPassword: new FormControl('', [
      Validators.required]),
  };

  constructor() { }

  ngOnInit() {

  }

}
